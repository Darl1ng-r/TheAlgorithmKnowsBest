import React, { useEffect } from 'react';
import type { DilemmaQuestion, DilemmaOption } from '../types';

interface DilemmaCardProps {
  question: DilemmaQuestion;
  currentIndex: number;
  totalQuestions: number;
  onSelectOption: (option: DilemmaOption) => void;
}

export const DilemmaCard: React.FC<DilemmaCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onSelectOption,
}) => {
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1' || e.key === 'ArrowLeft') {
        onSelectOption(question.optionA);
      } else if (e.key === '2' || e.key === 'ArrowRight') {
        onSelectOption(question.optionB);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, onSelectOption]);

  return (
    <div className="glass-panel dilemma-view">
      <div className="dilemma-header">
        <span className="dilemma-progress-label">
          CALIBRATION STAGE {currentIndex + 1} OF {totalQuestions}
        </span>
        <span className="dilemma-category-badge">{question.category.replace('_', ' ')}</span>
      </div>

      <div className="progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <h2 className="dilemma-prompt">{question.prompt}</h2>

      <div className="options-stack">
        <button
          type="button"
          className="dilemma-btn"
          onClick={() => onSelectOption(question.optionA)}
          id="btn-option-a"
        >
          <span className="key-tag">[1] / [←]</span>
          <span className="option-label">{question.optionA.label}</span>
          <span className="option-desc">{question.optionA.tagline}</span>
        </button>

        <button
          type="button"
          className="dilemma-btn"
          onClick={() => onSelectOption(question.optionB)}
          id="btn-option-b"
        >
          <span className="key-tag">[2] / [→]</span>
          <span className="option-label">{question.optionB.label}</span>
          <span className="option-desc">{question.optionB.tagline}</span>
        </button>
      </div>

      <div className="keyboard-hint">
        <span>Tip: Press [1] or [2] on your keyboard to navigate rapidly.</span>
      </div>
    </div>
  );
};
