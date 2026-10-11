import React, { useEffect, useState } from 'react';
import { WireframeGlobe } from './TechGraphics';

interface ComputingCardProps {
  reasoningNotes: string[];
  onComplete: () => void;
}

export const ComputingCard: React.FC<ComputingCardProps> = ({ reasoningNotes, onComplete }) => {
  const [visibleStep, setVisibleStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setVisibleStep(1), 220);
    const timer2 = setTimeout(() => setVisibleStep(2), 480);
    const timer3 = setTimeout(() => {
      onComplete();
    }, 780);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const percent = Math.min(100, (visibleStep + 1) * 35);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-6" aria-live="polite">
      {/* Center Wireframe Globe */}
      <div className="relative flex items-center justify-center">
        <WireframeGlobe size={110} className="text-fg animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="h-3 w-3 rounded-full bg-signal-red animate-ping" />
        </div>
      </div>

      {/* Readable Status Headline */}
      <div className="text-center space-y-1.5 max-w-md">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-signal-pink">
          Neural Taste Vector Inversion
        </div>

        <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-fg">
          Computing Calculated Friction
        </h3>

        <p className="font-sans text-sm text-fg-muted">
          Analyzing choice patterns and synthesizing an anti-recommendation prescription.
        </p>
      </div>

      {/* Progress Bar with Clear Percentage */}
      <div className="w-full max-w-sm flex flex-col gap-1.5">
        <div className="flex justify-between text-xs font-mono text-fg-muted font-medium">
          <span>Inversion Progress</span>
          <span className="font-bold text-fg tabular-nums">{percent}%</span>
        </div>
        <div className="w-full h-2 rounded-sm border border-border-strong bg-surface-sunken overflow-hidden">
          <div
            className="h-full bg-signal-red transition-all duration-200"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Telemetry Step Checklist */}
      <div className="w-full rounded-sm border-2 border-border-strong bg-surface-sunken p-4 font-mono text-xs text-fg space-y-2.5">
        <div className="text-[11px] font-bold tracking-wider uppercase text-fg-muted border-b border-border pb-1.5 flex justify-between">
          <span>Execution Log</span>
          <span>Real-Time</span>
        </div>
        {reasoningNotes.slice(0, visibleStep + 1).map((note, idx) => (
          <div key={idx} className="flex items-start gap-2.5 animate-in fade-in duration-150">
            <span className="text-signal-red font-bold font-mono">✓</span>
            <span className="text-fg font-medium tracking-tight text-xs leading-snug">
              {note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
