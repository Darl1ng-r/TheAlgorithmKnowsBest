import React, { useEffect } from 'react';
import type { DilemmaQuestion, DilemmaOption } from '../types';
import { Undo2 } from 'lucide-react';
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
    <div className="flex flex-col gap-6">
      {/* Card Header & Segmented Track */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono text-fg-muted">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-fg">
              DIAGNOSIS {currentIndex + 1} OF {totalQuestions}
            </span>
            {isPractice && (
              <span className="rounded bg-info-soft px-1.5 py-0.5 text-[10px] text-info uppercase font-bold">
                Unranked
              </span>
            )}
          </div>

          {currentIndex > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onGoBack}
              className="h-6 px-2 text-xs text-fg-muted hover:text-fg gap-1"
              title="Undo last choice (Backspace)"
            >
              <Undo2 className="h-3 w-3" />
              <span>Back</span>
            </Button>
          )}
        </div>

        {/* 5-segment track */}
        <div className="grid grid-cols-5 gap-1.5" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={totalQuestions}>
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-colors duration-200 ${
                i <= currentIndex ? 'bg-primary' : 'bg-surface-sunken'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dilemma Prompt */}
      <div className="text-center sm:text-left">
        <span className="text-[11px] font-mono tracking-wider uppercase text-fg-muted">
          Category: {question.category.replace('_', ' ')}
        </span>
        <h2 className="mt-1 font-serif text-2xl font-normal leading-snug sm:text-3xl text-fg">
          {question.prompt}
        </h2>
      </div>

      {/* 2 Decision Tiles */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Option A */}
        <button
          type="button"
          onClick={() => onSelectOption(question.optionA)}
          className="group relative flex flex-col justify-between rounded-[14px] border border-border-strong bg-surface p-5 text-left transition-all duration-150 hover:border-primary hover:bg-surface-sunken/60 hover:shadow-sm active:scale-[0.985] cursor-pointer"
          id="btn-choice-a"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex h-6 items-center rounded-[6px] border border-border bg-surface-sunken px-2 text-xs font-mono font-bold text-fg-muted group-hover:border-primary/40 group-hover:text-primary">
                A
              </span>
              <span className="text-[10px] font-mono text-fg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                Key [1]
              </span>
            </div>
            <h3 className="text-base font-semibold text-fg leading-snug group-hover:text-primary transition-colors">
              {question.optionA.label}
            </h3>
            <p className="mt-1.5 text-xs text-fg-muted leading-relaxed">
              {question.optionA.tagline}
            </p>
          </div>
        </button>

        {/* Option B */}
        <button
          type="button"
          onClick={() => onSelectOption(question.optionB)}
          className="group relative flex flex-col justify-between rounded-[14px] border border-border-strong bg-surface p-5 text-left transition-all duration-150 hover:border-primary hover:bg-surface-sunken/60 hover:shadow-sm active:scale-[0.985] cursor-pointer"
          id="btn-choice-b"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex h-6 items-center rounded-[6px] border border-border bg-surface-sunken px-2 text-xs font-mono font-bold text-fg-muted group-hover:border-primary/40 group-hover:text-primary">
                B
              </span>
              <span className="text-[10px] font-mono text-fg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                Key [2]
              </span>
            </div>
            <h3 className="text-base font-semibold text-fg leading-snug group-hover:text-primary transition-colors">
              {question.optionB.label}
            </h3>
            <p className="mt-1.5 text-xs text-fg-muted leading-relaxed">
              {question.optionB.tagline}
            </p>
          </div>
        </button>
      </div>

      <div className="text-center text-[11px] font-mono text-fg-muted">
        Press <kbd className="rounded border border-border bg-surface-sunken px-1.5 py-0.5 text-[10px]">1</kbd> or{' '}
        <kbd className="rounded border border-border bg-surface-sunken px-1.5 py-0.5 text-[10px]">2</kbd> on your keyboard
      </div>
    </div>
  );
};
