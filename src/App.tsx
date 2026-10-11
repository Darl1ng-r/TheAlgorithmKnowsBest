import { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import type { DilemmaOption, VerdictType } from './types';
import { DailyStore, type DailyState, type UserRecord } from './state/daily-store';
import { AntiRecommendationEngine } from './core/engine';
import { ASSIGNMENT_POOL } from './core/seed-data';

import { TopBar } from './components/TopBar';
import { DiagnoseCard } from './components/DiagnoseCard';
import { ComputingCard } from './components/ComputingCard';
import { PrescriptionCard } from './components/PrescriptionCard';
import { RuledCard } from './components/RuledCard';
import { RecordDrawer } from './components/RecordDrawer';
import { Barcode } from './components/TechGraphics';

export function App() {
  const [dailyState, setDailyState] = useState<DailyState>(DailyStore.getDailyState());
  const [userRecord, setUserRecord] = useState<UserRecord>(DailyStore.getUserRecord());
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark');
  });

  // Today's rotated questions (5 dilemmas based on date string)
  const todaySeed = DailyStore.getTodayUTCString();
  const dailyQuestions = DailyStore.getDailyQuestions(todaySeed);

  // Sync theme
  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('the_algo_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('the_algo_theme', 'light');
    }
  };

  // Handler: Select Dilemma Option
  const handleSelectOption = (option: DilemmaOption) => {
    const currentQ = dailyQuestions[dailyState.currentDilemmaIndex];
    const updatedChoices = [
      ...dailyState.selectedChoices,
      { questionId: currentQ.id, choice: option },
    ];

    if (dailyState.currentDilemmaIndex + 1 < dailyQuestions.length) {
      const nextState: DailyState = {
        ...dailyState,
        currentDilemmaIndex: dailyState.currentDilemmaIndex + 1,
        selectedChoices: updatedChoices,
      };
      setDailyState(nextState);
      DailyStore.saveDailyState(nextState);
    } else {
      // All 5 answered -> Trigger Computing Stage
      const reasoningNotes = DailyStore.generateReasoning(updatedChoices);
      const computingState: DailyState = {
        ...dailyState,
        stage: 'computing',
        selectedChoices: updatedChoices,
        reasoningNotes,
      };
      setDailyState(computingState);
      DailyStore.saveDailyState(computingState);
    }
  };

  // Handler: Undo / Go Back in Diagnose Stage
  const handleGoBack = () => {
    if (dailyState.currentDilemmaIndex <= 0) return;
    const nextState: DailyState = {
      ...dailyState,
      currentDilemmaIndex: dailyState.currentDilemmaIndex - 1,
      selectedChoices: dailyState.selectedChoices.slice(0, -1),
    };
    setDailyState(nextState);
    DailyStore.saveDailyState(nextState);
  };

  // Handler: Computing Complete -> Formulate Prescription
  const handleComputingComplete = () => {
    const vectorDeltas = dailyState.selectedChoices.map(c => c.choice.vectorDelta);
    const synthesizedProfile = AntiRecommendationEngine.synthesizeTasteVector(vectorDeltas);
    const seed = `${todaySeed}_${userRecord.history.length}`;

    const { assignment, distance } = AntiRecommendationEngine.selectAntiRecommendation(
      synthesizedProfile,
      ASSIGNMENT_POOL,
      null,
      seed
    );

    const prescriptionState: DailyState = {
      ...dailyState,
      stage: 'prescription',
      activeAssignment: assignment,
      distanceScore: distance,
      timerEndsAt: null,
      timerDurationSeconds: assignment.durationSeconds,
    };

    setDailyState(prescriptionState);
    DailyStore.saveDailyState(prescriptionState);
  };

  // Handler: Start Timer
  const handleStartTimer = (durationSeconds: number) => {
    const endsAt = Date.now() + durationSeconds * 1000;
    const updatedState: DailyState = {
      ...dailyState,
      timerEndsAt: endsAt,
    };
    setDailyState(updatedState);
    DailyStore.saveDailyState(updatedState);
  };

  // Handler: Pause Timer
  const handlePauseTimer = () => {
    const updatedState: DailyState = {
      ...dailyState,
      timerEndsAt: null,
    };
    setDailyState(updatedState);
    DailyStore.saveDailyState(updatedState);
  };

  // Handler: Render Ruling (optimistic update & store commit)
  const handleRenderRuling = (verdict: VerdictType) => {
    const { updatedState, updatedRecord } = DailyStore.commitRuling(
      verdict,
      dailyState,
      userRecord
    );
    setDailyState(updatedState);
    setUserRecord(updatedRecord);
  };

  // Handler: Start Unranked Practice Round
  const handleStartUnranked = () => {
    const practiceState = DailyStore.startUnrankedRound();
    setDailyState(practiceState);
  };

  // Handler: Clear All Data
  const handleClearData = () => {
    const { clearedState, clearedRecord } = DailyStore.clearAllData();
    setDailyState(clearedState);
    setUserRecord(clearedRecord);
  };

  const currentQ = dailyQuestions[dailyState.currentDilemmaIndex] || dailyQuestions[0];

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-canvas tech-grid text-fg flex flex-col justify-between selection:bg-signal-red selection:text-white">
        {/* Sticky Y2K Top Bar */}
        <TopBar
          streakDays={userRecord.streakDays}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onOpenRecord={() => setIsRecordOpen(true)}
        />

        {/* Central Morphing Workspace with Comfortable Margins */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:px-6 md:py-12">
          <div className="w-full max-w-2xl">
            {/* Morphing Surface Card with Crisp Contrast and Comfortable Padding */}
            <div className="relative rounded-sm border-2 border-border-strong bg-surface p-6 sm:p-9 md:p-10 shadow-[6px_6px_0px_0px_var(--border-strong)] transition-all">
              <AnimatePresence mode="wait">
                {dailyState.stage === 'diagnose' && (
                  <motion.div
                    key={`diagnose-${dailyState.currentDilemmaIndex}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <DiagnoseCard
                      question={currentQ}
                      currentIndex={dailyState.currentDilemmaIndex}
                      totalQuestions={dailyQuestions.length}
                      isPractice={dailyState.isPracticeRound}
                      onSelectOption={handleSelectOption}
                      onGoBack={handleGoBack}
                    />
                  </motion.div>
                )}

                {dailyState.stage === 'computing' && (
                  <motion.div
                    key="computing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ComputingCard
                      reasoningNotes={dailyState.reasoningNotes}
                      onComplete={handleComputingComplete}
                    />
                  </motion.div>
                )}

                {dailyState.stage === 'prescription' && dailyState.activeAssignment && (
                  <motion.div
                    key="prescription"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <PrescriptionCard
                      assignment={dailyState.activeAssignment}
                      timerEndsAt={dailyState.timerEndsAt}
                      onStartTimer={handleStartTimer}
                      onPauseTimer={handlePauseTimer}
                      onRenderRuling={handleRenderRuling}
                    />
                  </motion.div>
                )}

                {dailyState.stage === 'ruled' && dailyState.activeAssignment && dailyState.verdict && (
                  <motion.div
                    key="ruled"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <RuledCard
                      assignment={dailyState.activeAssignment}
                      verdict={dailyState.verdict}
                      retort={dailyState.retort || 'The Algorithm remains undefeated.'}
                      isPractice={dailyState.isPracticeRound}
                      onStartUnranked={handleStartUnranked}
                      onOpenRecord={() => setIsRecordOpen(true)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Clear, Accessible Monospace Subtitle */}
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-fg-muted px-1 select-none">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 bg-signal-red" />
                <span>Zero accounts · Client persisted</span>
              </span>
              <span className="hidden sm:inline">Calculated Anti-Recommendation Engine</span>
            </div>
          </div>
        </main>

        {/* Minimal High-Tech Footer with Accessible Typography */}
        <footer className="w-full border-t border-border bg-surface/90 py-4 text-xs font-mono text-fg-muted select-none">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-fg">© 2026 The Algorithm Knows Best</span>
              <span className="hidden sm:inline text-border-strong">/</span>
              <span className="hidden sm:inline text-fg-muted">Specimen Diagnostic Experiment</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Barcode code="ALGO-2026" showCode={false} className="hidden md:inline-flex opacity-40" />
              <button
                type="button"
                onClick={() => setIsRecordOpen(true)}
                className="font-bold text-fg hover:text-signal-red underline-offset-4 hover:underline transition-colors cursor-pointer"
              >
                [ View Record ]
              </button>
            </div>
          </div>
        </footer>

        {/* Record Sheet Drawer */}
        <RecordDrawer
          isOpen={isRecordOpen}
          onClose={() => setIsRecordOpen(false)}
          record={userRecord}
          onClearData={handleClearData}
        />
      </div>
    </MotionConfig>
  );
}

export default App;
