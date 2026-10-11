import React from 'react';
import type { GlobalScore, TallyRecord } from '../types';

interface HeaderProps {
  statusText: string;
  globalScore: GlobalScore;
  localTally: TallyRecord;
}

export const Header: React.FC<HeaderProps> = ({ statusText, globalScore, localTally }) => {
  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="header-monolith">
      <div className="status-ticker-bar">
        <div className="status-indicator">
          <span className="pulse-dot" aria-hidden="true" />
          <span className="system-status-text">{statusText}</span>
        </div>
        <span className="date-badge">{todayStr} · v1.0.0</span>
      </div>

      <div className="scoreboard-strip" aria-label="Scoreboard">
        <div className="score-box algo" title="Times the Algorithm was proven right">
          <span className="score-label">Algorithm Right</span>
          <span className="score-number">{globalScore.algoRight.toLocaleString()}</span>
          <span className="score-subtext">You: {localTally.algorithmRight}</span>
        </div>

        <div className="score-box human" title="Times human intuition prevailed">
          <span className="score-label">Human Taste Right</span>
          <span className="score-number">{globalScore.userRight.toLocaleString()}</span>
          <span className="score-subtext">You: {localTally.userRight}</span>
        </div>

        <div className="score-box dispute" title="Active disputes against mathematical verdict">
          <span className="score-label">Active Disputes</span>
          <span className="score-number">{globalScore.disputed.toLocaleString()}</span>
          <span className="score-subtext">You: {localTally.disputed}</span>
        </div>
      </div>
    </header>
  );
};
