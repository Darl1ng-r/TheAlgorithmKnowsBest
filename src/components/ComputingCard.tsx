import React, { useEffect, useState } from 'react';

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
    }, 750);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col gap-6 py-4" aria-live="polite">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
          Formulating Calculated Friction
        </span>
      </div>

      <div className="space-y-3">
        {/* Shimmer headline skeleton */}
        <div className="h-8 w-3/4 rounded-md bg-surface-sunken animate-pulse" />
        <div className="h-4 w-full rounded bg-surface-sunken/70 animate-pulse" />
      </div>

      <div className="rounded-[10px] border border-border bg-surface-sunken/50 p-4 font-mono text-xs text-fg-muted space-y-2">
        {reasoningNotes.slice(0, visibleStep + 1).map((note, idx) => (
          <div key={idx} className="flex items-center gap-2 animate-in fade-in duration-150">
            <span className="text-primary font-bold">✓</span>
            <span className="text-fg">{note}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
