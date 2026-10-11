import React, { useEffect, useRef, useState } from 'react';
import type { Assignment, VerdictType, TallyRecord } from '../types';

interface ShareModalProps {
  assignment: Assignment;
  verdict: VerdictType;
  retortText: string;
  localTally: TallyRecord;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  assignment,
  verdict,
  retortText,
  localTally,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  let verdictLabel = 'I Was Wrong (Algorithm +1)';
  let accentColor = '#00ff88';

  if (verdict === 'HATED_IT') {
    verdictLabel = 'I Hated It (Human Taste +1)';
    accentColor = '#a855f7';
  } else if (verdict === 'FIGHT') {
    verdictLabel = 'I Want to Fight the Algorithm';
    accentColor = '#ff3366';
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Render 1200x630 Card
    canvas.width = 1200;
    canvas.height = 630;

    // 1. Background
    ctx.fillStyle = '#07080c';
    ctx.fillRect(0, 0, 1200, 630);

    // 2. Subtle Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1200; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 630);
      ctx.stroke();
    }
    for (let y = 0; y < 630; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1200, y);
      ctx.stroke();
    }

    // 3. Neon Accent Top Border
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 0, 1200, 8);

    // 4. Brand Eyebrow
    ctx.fillStyle = '#00ff88';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText('THE ALGORITHM KNOWS BEST // DAILY CALIBRATION', 70, 85);

    // 5. Assignment Title
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 52px "Outfit", sans-serif';
    ctx.fillText(assignment.title, 70, 160);

    // 6. Category Subtitle
    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px "JetBrains Mono", monospace';
    ctx.fillText(`CATEGORY: ${assignment.categoryDisplay.toUpperCase()}`, 70, 205);

    // 7. Divider Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.moveTo(70, 235);
    ctx.lineTo(1130, 235);
    ctx.stroke();

    // 8. Verdict Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.roundRect ? ctx.roundRect(70, 265, 520, 60, 8) : ctx.fillRect(70, 265, 520, 60);
    ctx.fill();

    ctx.fillStyle = accentColor;
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.fillText(`VERDICT: ${verdictLabel}`, 95, 303);

    // 9. Algorithm's Retort Quote
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'italic 28px "Outfit", sans-serif';

    // Simple wrap
    const words = `"${retortText}"`.split(' ');
    let line = '';
    let y = 390;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 1020 && n > 0) {
        ctx.fillText(line, 70, y);
        line = words[n] + ' ';
        y += 42;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 70, y);

    // 10. Watermark & Local Score
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillText(
      `ALGORITHM: ${localTally.algorithmRight}  |  YOU: ${localTally.userRight}  |  DISPUTED: ${localTally.disputed}  |  STREAK: ${localTally.streakDays}D`,
      70,
      570
    );

    ctx.fillStyle = '#00ff88';
    ctx.fillText('thealgorithmknowsbest.com', 880, 570);
  }, [assignment, verdict, retortText, localTally, verdictLabel, accentColor]);

  const handleCopyText = async () => {
    const text = `The Algorithm Knows Best gave me "${assignment.title}" (${assignment.categoryDisplay}).\nMy Verdict: ${verdictLabel}.\nScore: Algorithm ${localTally.algorithmRight} - You ${localTally.userRight}.\n\nTry to beat math: https://thealgorithmknowsbest.com`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `the-algorithm-knows-best-${assignment.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content">
        <div className="modal-header">
          <h3 id="modal-title" className="modal-title">
            Calibration Result Card
          </h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <canvas
          ref={canvasRef}
          className="share-card-preview"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        <div className="share-buttons-row">
          <button
            type="button"
            className="btn-copy"
            onClick={handleCopyText}
            id="btn-copy-share-text"
          >
            {copied ? '✓ Copied to Clipboard!' : 'Copy Result Text'}
          </button>

          <button
            type="button"
            className="btn-copy"
            onClick={handleDownloadImage}
            id="btn-download-image"
          >
            Download Card (PNG)
          </button>
        </div>
      </div>
    </div>
  );
};
