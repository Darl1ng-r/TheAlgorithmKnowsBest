import React, { useEffect } from 'react';
import type { DilemmaQuestion, DilemmaOption } from '../types';
import { Undo2 } from 'lucide-react';
import { Button } from './ui/button';
import { Crosshair, Starburst, CornerMarks } from './TechGraphics';

interface DiagnoseCardProps {
  question: DilemmaQuestion;
  currentIndex: number;
  totalQuestions: number;
  isPractice: boolean;
  onSelectOption: (option: DilemmaOption) => void;
  onGoBack: () => void;
}

export const DiagnoseCard: React.FC<DiagnoseCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  isPractice,
  onSelectOption,
  onGoBack,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if focus is in an input or dialog
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === '1' || e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        onSelectOption(question.optionA);
      } else if (e.key === '2' || e.key === 'b' || e.key === 'B' || e.key === 'ArrowRight') {
        onSelectOption(question.optionB);
      } else if (e.key === 'Backspace' && currentIndex > 0) {
        onGoBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, currentIndex, onSelectOption, onGoBack]);

  return (
    <div className="relative flex flex-col gap-6">
      <CornerMarks />

      {/* Technical Header & Telemetry Track */}
      <div className="flex flex-col gap-3 border-b border-border-strong pb-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <Crosshair size={12} className="text-signal-red" />
            <span className="font-bold tracking-wider text-fg uppercase">
              DIAGNOSIS [{currentIndex + 1} / {totalQuestions}]
            </span>
            {isPractice && (
              <span className="border border-signal-pink bg-signal-pink/10 px-1.5 py-0.5 text-[9px] text-signal-pink uppercase font-bold tracking-widest">
                UNRANKED
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[10px] text-fg-muted uppercase tracking-widest">
              CALIBRATION CYCLE 2026
            </span>
            {currentIndex > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onGoBack}
                className="h-6 px-2 text-[10px] font-mono uppercase text-fg-muted hover:text-fg hover:bg-surface-sunken border border-border gap-1"
                title="Undo last choice (Backspace)"
              >
                <Undo2 className="h-3 w-3" />
                <span>Undo</span>
              </Button>
            )}
          </div>
        </div>

        {/* High-Tech Segmented Battery Track */}
        <div className="flex items-center gap-1.5" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={totalQuestions}>
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 transition-all duration-150 ${
                i <= currentIndex
                  ? 'bg-primary border border-border-strong'
                  : 'bg-surface-sunken border border-border/50 opacity-40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dilemma Micro-Notation & Headline (Reference 1 & 2 inspired) */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-signal-red font-bold">
          <Starburst size={10} />
          <span>SYNTHETIC + {question.category.replace('_', ' ')} // PROTOCOL</span>
        </div>
        
        <h2 className="font-display font-black text-2xl uppercase tracking-tight text-fg leading-tight sm:text-3xl">
          {question.prompt}
        </h2>
        
        <div className="text-[11px] font-mono text-fg-muted italic">
          /a calculated cognitive divergence test/
        </div>
      </div>

      {/* 2 Decision Tiles with Chamfered Tech Brutalist Styling */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {/* Option A */}
        <button
          type="button"
          onClick={() => onSelectOption(question.optionA)}
          className="group relative flex flex-col justify-between rounded-[2px] border-2 border-border-strong bg-surface p-5 text-left transition-all duration-150 hover:bg-primary hover:text-on-primary hover:shadow-lg active:translate-y-0.5 cursor-pointer"
          id="btn-choice-a"
        >
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-border group-hover:border-on-primary/30 pb-2.5">
              <span className="inline-flex h-6 items-center px-2 font-mono text-xs font-black uppercase tracking-wider bg-surface-sunken text-fg border border-border-strong group-hover:bg-on-primary group-hover:text-primary">
                [ KEY 1 ]
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-fg-muted group-hover:text-on-primary/80">
                OPTION.01
              </span>
            </div>

            <h3 className="font-display font-extrabold text-base uppercase leading-snug tracking-tight text-fg group-hover:text-on-primary transition-colors sm:text-lg">
              {question.optionA.label}
            </h3>

            <p className="mt-2 font-mono text-xs text-fg-muted leading-relaxed group-hover:text-on-primary/80">
              {question.optionA.tagline}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between pt-2 border-t border-dashed border-border/60 group-hover:border-on-primary/30 text-[10px] font-mono text-fg-muted group-hover:text-on-primary">
            <span>DISPOSITION A</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity font-bold">
              ENGAGE →
            </span>
          </div>
        </button>

        {/* Option B */}
        <button
          type="button"
          onClick={() => onSelectOption(question.optionB)}
          className="group relative flex flex-col justify-between rounded-[2px] border-2 border-border-strong bg-surface p-5 text-left transition-all duration-150 hover:bg-primary hover:text-on-primary hover:shadow-lg active:translate-y-0.5 cursor-pointer"
          id="btn-choice-b"
        >
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-border group-hover:border-on-primary/30 pb-2.5">
              <span className="inline-flex h-6 items-center px-2 font-mono text-xs font-black uppercase tracking-wider bg-surface-sunken text-fg border border-border-strong group-hover:bg-on-primary group-hover:text-primary">
                [ KEY 2 ]
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-fg-muted group-hover:text-on-primary/80">
                OPTION.02
              </span>
            </div>

            <h3 className="font-display font-extrabold text-base uppercase leading-snug tracking-tight text-fg group-hover:text-on-primary transition-colors sm:text-lg">
              {question.optionB.label}
            </h3>

            <p className="mt-2 font-mono text-xs text-fg-muted leading-relaxed group-hover:text-on-primary/80">
              {question.optionB.tagline}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between pt-2 border-t border-dashed border-border/60 group-hover:border-on-primary/30 text-[10px] font-mono text-fg-muted group-hover:text-on-primary">
            <span>DISPOSITION B</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity font-bold">
              ENGAGE →
            </span>
          </div>
        </button>
      </div>

      {/* Keyboard Guidance Footer */}
      <div className="flex items-center justify-between border-t border-border pt-3 text-[10px] font-mono text-fg-muted uppercase">
        <div className="flex items-center gap-1.5">
          <Crosshair size={10} />
          <span>KEYBOARD: [1] OR [2] TO EXECUTE</span>
        </div>
        <span>STEP {currentIndex + 1} OF {totalQuestions}</span>
      </div>
    </div>
  );
};
