import React from 'react';
import type { VerdictType, Assignment, TallyRecord } from '../types';
import { PersonalityEngine } from '../core/personality';

interface AlgorithmRetortProps {
  verdict: VerdictType;
  retortText: string;
  assignment: Assignment;
  localTally: TallyRecord;
  onOpenShare: () => void;
  onReturnHome: () => void;
}

export const AlgorithmRetort: React.FC<AlgorithmRetortProps> = ({
  verdict,
  retortText,
  assignment,
  localTally,
  onOpenShare,
  onReturnHome,
}) => {
  let stampClass = 'algo-win';
  let stampLabel = 'Verdict: Algorithm Proven Right';

  if (verdict === 'HATED_IT') {
    stampClass = 'user-win';
    stampLabel = 'Verdict: Human Stubbornness Retained';
  } else if (verdict === 'FIGHT') {
    stampClass = 'dispute';
    stampLabel = 'Verdict: Mathematical Conflict Logged';
  }

  const streakComment = PersonalityEngine.getStreakComment(localTally.streakDays);

  return (
    <div className="glass-panel retort-view">
      <div className={`outcome-stamp ${stampClass}`}>{stampLabel}</div>

      <div className="algorithm-quip-box">
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
          PROTOCOL: {assignment.title.toUpperCase()}
        </div>
        <p className="quip-quote">&ldquo;{retortText}&rdquo;</p>
        <div className="quip-author">— The Algorithm, Chief Optimization Authority</div>
      </div>

      <div className="streak-card">
        <div>
          <span>{streakComment}</span>
        </div>
        <div className="streak-days">🔥 {localTally.streakDays} Day Streak</div>
      </div>

      <div className="retort-actions">
        <button
          type="button"
          className="btn-share"
          onClick={onOpenShare}
          id="btn-open-share"
        >
          Share Result Card ↗
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={onReturnHome}
          id="btn-return-home"
        >
          Return to Overview
        </button>
      </div>
    </div>
  );
};
