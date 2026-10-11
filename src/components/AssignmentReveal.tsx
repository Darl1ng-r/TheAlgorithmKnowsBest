import React from 'react';
import type { Assignment } from '../types';

interface AssignmentRevealProps {
  assignment: Assignment;
  matchScoreDisplay: string;
  onProceedToExecution: () => void;
}

export const AssignmentReveal: React.FC<AssignmentRevealProps> = ({
  assignment,
  matchScoreDisplay,
  onProceedToExecution,
}) => {
  return (
    <div className="glass-panel reveal-view">
      <div className="reveal-header">
        <span className="match-badge">
          INCOMPATIBILITY SCORE: {matchScoreDisplay} (OPTIMAL)
        </span>
        <span className="assignment-category-tag">{assignment.categoryDisplay}</span>
      </div>

      <h2 className="assignment-title">{assignment.title}</h2>

      <div className="smug-notice">
        &ldquo;Based on your tragic choices, mathematics has determined that your comfort zone is obsolete.&rdquo;
      </div>

      <div className="instruction-card">
        <p className="instruction-text">{assignment.instruction}</p>

        {assignment.simulatedAudio && (
          <div className="audio-preview-snippet">
            <div>
              <div className="audio-meta-title">
                ▶ {assignment.simulatedAudio.artist} — {assignment.simulatedAudio.track}
              </div>
              <div className="audio-meta-genre">
                {assignment.simulatedAudio.genre} · {assignment.simulatedAudio.bpm} BPM
              </div>
            </div>
            <span style={{ color: 'var(--accent-algorithm)' }}>[Ready]</span>
          </div>
        )}

        {assignment.checklist && (
          <div className="checklist-items">
            {assignment.checklist.map((item, idx) => (
              <label key={idx} className="checklist-item">
                <input type="checkbox" className="checklist-checkbox" defaultChecked={false} />
                <span>{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="reveal-actions">
        <button
          type="button"
          className="btn-primary-launch"
          onClick={onProceedToExecution}
          id="btn-start-protocol"
        >
          <span>Begin {Math.round(assignment.durationSeconds / 60)}-Minute Protocol</span>
          <span aria-hidden="true">⏱</span>
        </button>
      </div>
    </div>
  );
};
