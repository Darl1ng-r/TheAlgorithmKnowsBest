import React, { useEffect, useState } from 'react';
import { PersonalityEngine } from '../core/personality';

interface CalculatingStateProps {
  onComplete: () => void;
}

export const CalculatingState: React.FC<CalculatingStateProps> = ({ onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const lines = PersonalityEngine.CALCULATING_PHRASES;

  useEffect(() => {
    const stepDuration = 350;
    const interval = setInterval(() => {
      setCurrentLineIndex(prev => {
        if (prev < lines.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration);

    const totalTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(totalTimer);
    };
  }, [lines, onComplete]);

  return (
    <div className="glass-panel calculating-view">
      <div className="math-spinner" aria-hidden="true" />

      <h2 className="calculating-title">Optimizing Cognitive Flaws</h2>

      <div className="terminal-box" aria-live="polite">
        {lines.slice(0, currentLineIndex + 1).map((line, idx) => (
          <div
            key={idx}
            className={`terminal-line ${idx === currentLineIndex ? 'active' : ''}`}
          >
            <span>&gt; {line}</span>
            {idx === currentLineIndex && <span className="terminal-cursor" />}
          </div>
        ))}
      </div>
    </div>
  );
};
