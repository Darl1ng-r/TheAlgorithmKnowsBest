import React, { useEffect } from 'react';
import type { DilemmaQuestion, DilemmaOption } from '../types';
import { Undo2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

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

  const categoryDisplay = question.category
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header & Progress Track */}
      <div className="flex flex-col gap-3.5 border-b border-border pb-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-fg tracking-wide">
              DIAGNOSIS {currentIndex + 1} OF {totalQuestions}
            </span>
            {isPractice && (
              <span className="border border-signal-pink bg-signal-pink/10 px-2 py-0.5 text-[10px] text-signal-pink uppercase font-bold tracking-wider rounded-sm">
                Unranked
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentIndex > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onGoBack}
                className="h-7 px-2.5 text-xs font-mono text-fg-muted hover:text-fg hover:bg-surface-sunken border border-border rounded-sm gap-1.5"
                title="Undo last choice (Backspace)"
              >
                <Undo2 className="h-3 w-3" />
                <span>Back</span>
              </Button>
            )}
          </div>
        </div>

        {/* Crisp Progress Track */}
        <div className="flex items-center gap-2" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={totalQuestions}>
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-sm transition-all duration-200 ${
                i <= currentIndex
                  ? 'bg-primary border border-border-strong'
                  : 'bg-surface-sunken border border-border/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dilemma Header & Prompt (Sentence Case, High Readability) */}
      <div className="space-y-2">
        <div className="text-xs font-mono font-medium text-signal-red flex items-center gap-2">
          <span>//</span>
          <span className="uppercase tracking-wider font-bold">Category: {categoryDisplay}</span>
        </div>
        
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-fg leading-snug tracking-tight">
          {question.prompt}
        </h2>
      </div>

      {/* 2 Decision Tiles with Clear Hierarchy & Readable Body Copy */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Option A */}
        <button
          type="button"
          onClick={() => onSelectOption(question.optionA)}
          className="group relative flex flex-col justify-between rounded-sm border-2 border-border-strong bg-surface p-5 sm:p-6 text-left transition-all duration-150 hover:border-signal-red hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          id="btn-choice-a"
        >
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-border pb-2.5">
              <span className="inline-flex h-6 items-center px-2 font-mono text-xs font-bold bg-surface-sunken text-fg border border-border-strong group-hover:border-signal-red group-hover:text-signal-red rounded-sm">
                Key [1]
              </span>
              <span className="font-mono text-xs text-fg-muted font-medium">
                Option A
              </span>
            </div>

            <h3 className="font-display font-bold text-lg text-fg leading-snug group-hover:text-signal-red transition-colors">
              {question.optionA.label}
            </h3>

            <p className="mt-2 font-sans text-sm text-fg-muted leading-relaxed">
              {question.optionA.tagline}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between pt-2.5 border-t border-dashed border-border text-xs font-mono text-fg-muted group-hover:text-fg font-medium">
            <span>Select this path</span>
            <ArrowRight className="h-3.5 w-3.5 text-signal-red opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>

        {/* Option B */}
        <button
          type="button"
          onClick={() => onSelectOption(question.optionB)}
          className="group relative flex flex-col justify-between rounded-sm border-2 border-border-strong bg-surface p-5 sm:p-6 text-left transition-all duration-150 hover:border-signal-red hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          id="btn-choice-b"
        >
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-border pb-2.5">
              <span className="inline-flex h-6 items-center px-2 font-mono text-xs font-bold bg-surface-sunken text-fg border border-border-strong group-hover:border-signal-red group-hover:text-signal-red rounded-sm">
                Key [2]
              </span>
              <span className="font-mono text-xs text-fg-muted font-medium">
                Option B
              </span>
            </div>

            <h3 className="font-display font-bold text-lg text-fg leading-snug group-hover:text-signal-red transition-colors">
              {question.optionB.label}
            </h3>

            <p className="mt-2 font-sans text-sm text-fg-muted leading-relaxed">
              {question.optionB.tagline}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between pt-2.5 border-t border-dashed border-border text-xs font-mono text-fg-muted group-hover:text-fg font-medium">
            <span>Select this path</span>
            <ArrowRight className="h-3.5 w-3.5 text-signal-red opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
      </div>

      {/* Accessible Keyboard Guidance Bar */}
      <div className="flex items-center justify-between border-t border-border pt-3 text-xs font-mono text-fg-muted">
        <div className="flex items-center gap-1.5">
          <span>Press</span>
          <kbd className="rounded border border-border-strong bg-surface-sunken px-1.5 py-0.5 text-[11px] font-bold text-fg">1</kbd>
          <span>or</span>
          <kbd className="rounded border border-border-strong bg-surface-sunken px-1.5 py-0.5 text-[11px] font-bold text-fg">2</kbd>
          <span className="hidden sm:inline">to choose instantly</span>
        </div>
        <span>Step {currentIndex + 1} of {totalQuestions}</span>
      </div>
    </div>
  );
};
