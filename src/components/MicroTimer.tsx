import React, { useState, useEffect } from 'react';
import type { Assignment } from '../types';

interface MicroTimerProps {
  assignment: Assignment;
  onTimerFinished: () => void;
}

export const MicroTimer: React.FC<MicroTimerProps> = ({ assignment, onTimerFinished }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(assignment.durationSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && secondsRemaining > 0) {
      interval = window.setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsActive(false);
      onTimerFinished();
    }

    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [isActive, secondsRemaining, onTimerFinished]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="glass-panel timer-view">
      <div className="dilemma-category-badge">{assignment.categoryDisplay}</div>
      <h2 style={{ fontSize: '1.4rem' }}>{assignment.title}</h2>

      <div className="clock-display" aria-live="polite">
        {formattedTime}
      </div>

      <p className="clock-subtext">
        {isActive
          ? 'Immerse yourself completely. Resisting mathematics only prolongs the suffering.'
          : 'Protocol complete. Prepare to face the tribunal.'}
      </p>

      <div className="timer-controls">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setIsActive(!isActive)}
          id="btn-toggle-timer"
        >
          {isActive ? 'Pause Timer' : 'Resume Timer'}
        </button>

        <button
          type="button"
          className="btn-finish-early"
          onClick={onTimerFinished}
          id="btn-finish-early"
        >
          I Finished Early / Render Verdict →
        </button>
      </div>
    </div>
  );
};
