import { useState, useEffect, useCallback } from 'react';
import type {
  GamePhase,
  DilemmaOption,
  Assignment,
  VerdictType,
  TasteVector,
  TallyRecord,
  GlobalScore,
} from './types';
import { DILEMMA_POOL, ASSIGNMENT_POOL } from './core/seed-data';
import { AntiRecommendationEngine } from './core/engine';
import { SecurityService } from './core/security';
import { PersonalityEngine } from './core/personality';
import { SessionStore } from './storage/session-store';

import { MatrixBackground } from './components/MatrixBackground';
import { Header } from './components/Header';
import { HeroIntro } from './components/HeroIntro';
import { DilemmaCard } from './components/DilemmaCard';
import { CalculatingState } from './components/CalculatingState';
import { AssignmentReveal } from './components/AssignmentReveal';
import { MicroTimer } from './components/MicroTimer';
import { VerdictTribunal } from './components/VerdictTribunal';
import { AlgorithmRetort } from './components/AlgorithmRetort';
import { ShareModal } from './components/ShareModal';

import './styles/index.css';
import './styles/app.css';

// Sound effects synthesizer using Web Audio API (Zero external assets needed)
const playSoundEffect = (type: 'click' | 'concede' | 'fight' | 'reveal') => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'reveal') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(587, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'concede') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'fight') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch {
    // Ignore audio context errors if browser blocks autoplay
  }
};

export function App() {
  const [phase, setPhase] = useState<GamePhase>('HERO');
  const [dilemmaIndex, setDilemmaIndex] = useState(0);
  const [selectedDeltas, setSelectedDeltas] = useState<TasteVector[]>([]);
  const [activeAssignment, setActiveAssignment] = useState<Assignment | null>(null);
  const [matchScoreDisplay, setMatchScoreDisplay] = useState('3.4%');
  const [activeToken, setActiveToken] = useState<string | null>(null);
  const [lastVerdict, setLastVerdict] = useState<VerdictType>('WAS_WRONG');
  const [retortText, setRetortText] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Persistence State
  const [localTally, setLocalTally] = useState<TallyRecord>(SessionStore.getLocalTally());
  const [globalScore, setGlobalScore] = useState<GlobalScore>(SessionStore.getGlobalScore());
  const [isTodayDone, setIsTodayDone] = useState(SessionStore.isTodayCompleted());
  const [statusPhrase, setStatusPhrase] = useState(PersonalityEngine.SMUG_STATUSES[0]);

  // Rotate status phrases periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * PersonalityEngine.SMUG_STATUSES.length);
      setStatusPhrase(PersonalityEngine.SMUG_STATUSES[randomIdx]);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Today's 5 questions
  const activeQuestions = DILEMMA_POOL.slice(0, 5);

  // Handler: Start Game
  const handleStartGame = () => {
    playSoundEffect('click');
    setDilemmaIndex(0);
    setSelectedDeltas([]);
    setPhase('DILEMMAS');
  };

  // Handler: Reset Today for Practice Mode
  const handleResetForPractice = () => {
    SessionStore.resetTodayForTesting();
    setIsTodayDone(false);
    handleStartGame();
  };

  // Handler: Select Dilemma Option
  const handleSelectOption = (option: DilemmaOption) => {
    playSoundEffect('click');
    const updatedDeltas = [...selectedDeltas, option.vectorDelta];
    setSelectedDeltas(updatedDeltas);

    if (dilemmaIndex + 1 < activeQuestions.length) {
      setDilemmaIndex(prev => prev + 1);
    } else {
      // 5 choices complete -> Trigger Math Engine
      setPhase('CALCULATING');
    }
  };

  // Handler: Calculation Complete (Generate Anti-Recommendation & Security Token)
  const handleCalculationComplete = useCallback(async () => {
    playSoundEffect('reveal');

    // 1. Synthesize User Taste Profile
    const userProfile = AntiRecommendationEngine.synthesizeTasteVector(selectedDeltas);
    const lastCategory = SessionStore.getLastCategory();
    const seed = `${SessionStore.getTodayUTCString()}_${SecurityService.getOrCreateClientUUID()}`;

    // 2. Select Uncomfortable Middle Band Candidate
    const { assignment, matchPercentageDisplay } =
      AntiRecommendationEngine.selectAntiRecommendation(
        userProfile,
        ASSIGNMENT_POOL,
        lastCategory,
        seed
      );

    // 3. Issue HMAC Signed Verdict Token
    const claim = await SecurityService.issueVerdictClaim(assignment.id);

    setActiveAssignment(assignment);
    setMatchScoreDisplay(matchPercentageDisplay);
    setActiveToken(claim.token);
    setPhase('ASSIGNMENT');
  }, [selectedDeltas]);

  // Handler: Proceed to Timer
  const handleProceedToExecution = () => {
    playSoundEffect('click');
    setPhase('EXECUTION');
  };

  // Handler: Timer Finished / Early Finish
  const handleTimerFinished = () => {
    playSoundEffect('click');
    setPhase('VERDICT');
  };

  // Handler: Render Verdict
  const handleSelectVerdict = async (verdict: VerdictType) => {
    if (!activeAssignment) return;

    if (verdict === 'WAS_WRONG') playSoundEffect('concede');
    else if (verdict === 'FIGHT') playSoundEffect('fight');
    else playSoundEffect('click');

    // Verify cryptographic claim
    if (activeToken) {
      const verification = await SecurityService.verifyVerdictClaim(
        activeToken,
        activeAssignment.id
      );
      if (!verification.valid) {
        console.warn('Cryptographic token failure:', verification.reason);
      }
    }

    // 1. Perturb taste profile
    const currentTaste = SessionStore.getPersistedTasteVector();
    const updatedTaste = AntiRecommendationEngine.perturbVectorOnVerdict(
      currentTaste,
      activeAssignment.vector,
      verdict
    );

    // 2. Commit tallies
    const { local, global } = SessionStore.recordVerdict(
      verdict,
      activeAssignment.category,
      updatedTaste
    );

    setLocalTally(local);
    setGlobalScore(global);
    setIsTodayDone(true);
    setLastVerdict(verdict);

    // 3. Synthesize sarcastic reaction
    const reaction = PersonalityEngine.getReaction(verdict, activeAssignment.reactions);
    setRetortText(reaction);

    setPhase('RETORT');
  };

  // Handler: Return Home
  const handleReturnHome = () => {
    playSoundEffect('click');
    setPhase('HERO');
  };

  return (
    <>
      <MatrixBackground />
      <div className="scanline-overlay" aria-hidden="true" />

      <div className="app-container">
        <Header
          statusText={statusPhrase}
          globalScore={globalScore}
          localTally={localTally}
        />

        <main className="main-stage">
          {phase === 'HERO' && (
            <HeroIntro
              isTodayDone={isTodayDone}
              localTally={localTally}
              onStartGame={handleStartGame}
              onResetForPractice={handleResetForPractice}
            />
          )}

          {phase === 'DILEMMAS' && (
            <DilemmaCard
              question={activeQuestions[dilemmaIndex]}
              currentIndex={dilemmaIndex}
              totalQuestions={activeQuestions.length}
              onSelectOption={handleSelectOption}
            />
          )}

          {phase === 'CALCULATING' && (
            <CalculatingState onComplete={handleCalculationComplete} />
          )}

          {phase === 'ASSIGNMENT' && activeAssignment && (
            <AssignmentReveal
              assignment={activeAssignment}
              matchScoreDisplay={matchScoreDisplay}
              onProceedToExecution={handleProceedToExecution}
            />
          )}

          {phase === 'EXECUTION' && activeAssignment && (
            <MicroTimer
              assignment={activeAssignment}
              onTimerFinished={handleTimerFinished}
            />
          )}

          {phase === 'VERDICT' && (
            <VerdictTribunal onSelectVerdict={handleSelectVerdict} />
          )}

          {phase === 'RETORT' && activeAssignment && (
            <AlgorithmRetort
              verdict={lastVerdict}
              retortText={retortText}
              assignment={activeAssignment}
              localTally={localTally}
              onOpenShare={() => setIsShareModalOpen(true)}
              onReturnHome={handleReturnHome}
            />
          )}
        </main>

        <footer className="app-footer">
          <div className="footer-links">
            <button type="button" className="footer-link" onClick={() => setPhase('HERO')}>
              Overview
            </button>
            <button
              type="button"
              className="footer-link"
              onClick={handleResetForPractice}
            >
              Practice Mode
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Docs &amp; Architecture
            </a>
          </div>
          <p>© 2026 The Algorithm Knows Best. Mathematics remains undefeated.</p>
        </footer>
      </div>

      {isShareModalOpen && activeAssignment && (
        <ShareModal
          assignment={activeAssignment}
          verdict={lastVerdict}
          retortText={retortText}
          localTally={localTally}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;
