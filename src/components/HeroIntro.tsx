import React from 'react';
import type { TallyRecord } from '../types';

interface HeroIntroProps {
  isTodayDone: boolean;
  localTally: TallyRecord;
  onStartGame: () => void;
  onResetForPractice: () => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  isTodayDone,
  localTally,
  onStartGame,
  onResetForPractice,
}) => {
  return (
    <div className="glass-panel hero-view">
      <div className="brand-eyebrow">
        <span>Asymmetrical Human Optimization</span>
      </div>

      <h1 className="hero-title">
        The Algorithm <span className="highlight">Knows Best</span>
      </h1>

      <p className="hero-description">
        A 5-minute daily micro-experience. Answer five binary dilemmas. Receive a mathematically calibrated anti-recommendation. Rate whether you survived.
      </p>

      <div className="hero-features">
        <span className="feature-pill">⚡ Zero Sign-Up</span>
        <span className="feature-pill">📐 5D Vector Distance</span>
        <span className="feature-pill">🛡️ 100% Solo &amp; Safe</span>
        <span className="feature-pill">🔥 Streak: {localTally.streakDays} Days</span>
      </div>

      {isTodayDone ? (
        <div className="daily-locked-box">
          <h3>Daily Protocol Already Completed</h3>
          <p>
            Your verdict for today has been permanently recorded in the central matrix. The Algorithm is resting its neural weights.
          </p>
          <button
            type="button"
            className="btn-practice"
            onClick={onResetForPractice}
            id="btn-practice-mode"
          >
            Launch Extra Practice Round (Free Play) →
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn-primary-launch"
          onClick={onStartGame}
          id="btn-initiate-calibration"
        >
          <span>Initiate Daily Calibration</span>
          <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  );
};
