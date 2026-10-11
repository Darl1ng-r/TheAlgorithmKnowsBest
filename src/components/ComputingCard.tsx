import React, { useEffect, useState } from 'react';
import { Crosshair, Starburst, WireframeGlobe, CornerMarks } from './TechGraphics';

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

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 py-6" aria-live="polite">
      <CornerMarks />

      {/* Center Wireframe Globe (Reference 2 style) */}
      <div className="relative flex items-center justify-center">
        <WireframeGlobe size={110} className="text-fg animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Crosshair size={20} className="text-signal-red" />
        </div>
      </div>

      {/* High-Tech Status Header */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2 text-[10px] font-mono tracking-widest text-signal-pink uppercase font-bold">
          <Starburst size={10} />
          <span>REBOOT 2.0 // NEURAL CALCULATION</span>
          <Starburst size={10} />
        </div>

        <h3 className="font-display font-black text-xl uppercase tracking-tight text-fg sm:text-2xl">
          Synthesizing Calculated Friction
        </h3>

        <div className="font-mono text-xs text-fg-muted tracking-wider">
          LOADING COGNITIVE DIVERGENCE...
        </div>
      </div>

      {/* Pixel Progress Loading Bar */}
      <div className="w-full max-w-xs flex flex-col gap-1.5 items-center">
        <div className="w-full grid grid-cols-12 gap-1 h-2.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-full border border-border-strong transition-all duration-150 ${
                i <= (visibleStep + 1) * 4
                  ? 'bg-signal-red'
                  : 'bg-surface-sunken opacity-30'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between w-full text-[9px] font-mono text-fg-muted uppercase tracking-widest">
          <span>SPEC: TASTE.INV</span>
          <span>CALIBRATING: {Math.min(100, (visibleStep + 1) * 35)}%</span>
        </div>
      </div>

      {/* Telemetry Step Checklist */}
      <div className="w-full rounded-[2px] border-2 border-border-strong bg-surface-sunken/80 p-4 font-mono text-xs text-fg space-y-2">
        <div className="text-[10px] tracking-widest uppercase text-fg-muted border-b border-border pb-1">
          EXECUTION LOG // REAL-TIME INVERSION
        </div>
        {reasoningNotes.slice(0, visibleStep + 1).map((note, idx) => (
          <div key={idx} className="flex items-center gap-2 animate-in fade-in duration-150">
            <span className="text-signal-red font-bold font-mono">[{idx + 1}]</span>
            <span className="text-fg font-medium tracking-tight uppercase text-[11px]">
              {note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
