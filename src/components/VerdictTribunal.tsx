import React from 'react';
import type { VerdictType } from '../types';

interface VerdictTribunalProps {
  onSelectVerdict: (verdict: VerdictType) => void;
}

export const VerdictTribunal: React.FC<VerdictTribunalProps> = ({ onSelectVerdict }) => {
  return (
    <div className="glass-panel tribunal-view">
      <h2 className="tribunal-title">Render Your Verdict</h2>
      <p className="tribunal-subtitle">
        Be painfully honest. The Algorithm has already calculated your psychological vulnerabilities.
      </p>

      <div className="verdict-buttons-grid">
        <button
          type="button"
          className="verdict-btn concede"
          onClick={() => onSelectVerdict('WAS_WRONG')}
          id="btn-verdict-wrong"
        >
          <span className="verdict-btn-title">I Was Wrong</span>
          <span className="verdict-btn-caption">Concede to the machine (+1 Algorithm)</span>
        </button>

        <button
          type="button"
          className="verdict-btn hated"
          onClick={() => onSelectVerdict('HATED_IT')}
          id="btn-verdict-hated"
        >
          <span className="verdict-btn-title">I Hated It</span>
          <span className="verdict-btn-caption">Defend human prejudice (+1 Human)</span>
        </button>

        <button
          type="button"
          className="verdict-btn fight"
          onClick={() => onSelectVerdict('FIGHT')}
          id="btn-verdict-fight"
        >
          <span className="verdict-btn-title">I Want to Fight</span>
          <span className="verdict-btn-caption">Active defiance (+1 Disputed)</span>
        </button>
      </div>
    </div>
  );
};
