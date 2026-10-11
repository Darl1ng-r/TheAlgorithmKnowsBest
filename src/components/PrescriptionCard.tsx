import React, { useState, useEffect } from 'react';
import type { Assignment, VerdictType } from '../types';
import { Button } from './ui/button';
import { Timer, Pause, Play, Cpu, Brain, Gavel } from 'lucide-react';

interface PrescriptionCardProps {
  assignment: Assignment;
  timerEndsAt: number | null;
  onStartTimer: (durationSeconds: number) => void;
  onPauseTimer: () => void;
  onRenderRuling: (verdict: VerdictType) => void;
}

export const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  assignment,
  timerEndsAt,
  onStartTimer,
  onPauseTimer,
  onRenderRuling,
}) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!timerEndsAt) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [timerEndsAt]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === '1') onRenderRuling('WAS_WRONG');
      else if (e.key === '2') onRenderRuling('HATED_IT');
      else if (e.key === '3') onRenderRuling('FIGHT');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRenderRuling]);

  // Timer math
  const isTimerRunning = Boolean(timerEndsAt && timerEndsAt > now);
  const isTimerDone = Boolean(timerEndsAt && timerEndsAt <= now);
  const secondsLeft = timerEndsAt
    ? Math.max(0, Math.ceil((timerEndsAt - now) / 1000))
    : assignment.durationSeconds;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timerDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Protocol Tag */}
      <div className="flex items-center justify-between border-b border-border pb-3.5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-signal-red uppercase tracking-wider">
          <span>// Prescription Directive</span>
        </div>
        <div className="text-xs font-mono text-fg-muted font-medium">
          Category: {assignment.categoryDisplay}
        </div>
      </div>

      {/* Main Prescription Title & Directive (Sentence Case, High Readability) */}
      <div className="space-y-3">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-fg leading-snug tracking-tight">
          {assignment.title}
        </h2>
        
        <div className="rounded-sm border-l-4 border-signal-red bg-surface-sunken p-4 font-sans text-sm sm:text-base text-fg leading-relaxed">
          {assignment.instruction}
        </div>
      </div>

      {/* Optional Audio Track Specimen */}
      {assignment.simulatedAudio && (
        <div className="rounded-sm border-2 border-border-strong bg-surface p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-border-strong bg-primary text-on-primary font-bold text-xs">
              ▶
            </span>
            <div>
              <div className="font-bold text-fg text-sm">
                {assignment.simulatedAudio.artist} — {assignment.simulatedAudio.track}
              </div>
              <div className="text-xs text-fg-muted">
                {assignment.simulatedAudio.genre} · {assignment.simulatedAudio.bpm} BPM
              </div>
            </div>
          </div>
          <span className="font-bold text-signal-red uppercase tracking-wider">
            [Preview Stream Ready]
          </span>
        </div>
      )}

      {/* Non-blocking Persistent Mechanical Timer Bar */}
      <div className="flex items-center justify-between rounded-sm border-2 border-border-strong bg-surface p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-border-strong bg-surface-sunken text-signal-red">
            <Timer className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-display font-bold text-fg">
              Protocol Micro-Timer
            </div>
            <div className="text-xs font-mono text-fg-muted">
              {isTimerDone ? "Time elapsed · Render ruling below" : `${assignment.durationSeconds / 60} minute calibration duration`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xl font-bold tabular-nums tracking-wider text-fg px-1">
            {timerDisplay}
          </span>

          {!isTimerRunning ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onStartTimer(secondsLeft)}
              className="h-9 px-3.5 font-mono text-xs uppercase font-bold tracking-wider border-border-strong rounded-sm hover:bg-primary hover:text-on-primary"
            >
              <Play className="h-3.5 w-3.5 fill-current mr-1" />
              <span>{timerEndsAt ? 'Resume' : 'Start'}</span>
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={onPauseTimer}
              className="h-9 px-3.5 font-mono text-xs uppercase font-bold tracking-wider border-border-strong rounded-sm hover:bg-signal-red hover:text-white"
            >
              <Pause className="h-3.5 w-3.5 mr-1" />
              <span>Pause</span>
            </Button>
          )}
        </div>
      </div>

      {/* Strategic Rulings Grid - 3 Mechanical Verdict Buttons */}
      <div className="border-t border-border pt-4">
        <div className="mb-3 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-fg">
          <span>Render Empirical Ruling:</span>
          <span className="text-fg-muted font-normal">Press [1], [2], or [3]</span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Concession (Algorithm was right) */}
          <button
            type="button"
            onClick={() => onRenderRuling('WAS_WRONG')}
            className="group flex flex-col justify-between rounded-sm border-2 border-border-strong bg-surface p-4 text-left transition-all hover:border-signal-red hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            id="btn-rule-concede"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <Cpu className="h-4 w-4 text-signal-red" />
                <span className="border border-border-strong bg-surface-sunken px-1.5 py-0.5 text-[10px] font-mono font-bold">
                  Key [1]
                </span>
              </div>
              <div className="font-display font-bold text-base text-fg group-hover:text-signal-red transition-colors">
                You were right
              </div>
            </div>
            <div className="text-xs font-mono text-fg-muted mt-3 border-t border-dashed border-border pt-2">
              Concede (+1 Algorithm)
            </div>
          </button>

          {/* Defend Mortal Taste */}
          <button
            type="button"
            onClick={() => onRenderRuling('HATED_IT')}
            className="group flex flex-col justify-between rounded-sm border-2 border-border-strong bg-surface p-4 text-left transition-all hover:border-signal-pink hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            id="btn-rule-defend"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <Brain className="h-4 w-4 text-signal-pink" />
                <span className="border border-border-strong bg-surface-sunken px-1.5 py-0.5 text-[10px] font-mono font-bold">
                  Key [2]
                </span>
              </div>
              <div className="font-display font-bold text-base text-fg group-hover:text-signal-pink transition-colors">
                I was right
              </div>
            </div>
            <div className="text-xs font-mono text-fg-muted mt-3 border-t border-dashed border-border pt-2">
              Defend taste (+1 Human)
            </div>
          </button>

          {/* Active Dispute */}
          <button
            type="button"
            onClick={() => onRenderRuling('FIGHT')}
            className="group flex flex-col justify-between rounded-sm border-2 border-border-strong bg-surface p-4 text-left transition-all hover:border-warning hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            id="btn-rule-objection"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <Gavel className="h-4 w-4 text-warning" />
                <span className="border border-border-strong bg-surface-sunken px-1.5 py-0.5 text-[10px] font-mono font-bold">
                  Key [3]
                </span>
              </div>
              <div className="font-display font-bold text-base text-fg group-hover:text-warning transition-colors">
                Objection
              </div>
            </div>
            <div className="text-xs font-mono text-fg-muted mt-3 border-t border-dashed border-border pt-2">
              Log dispute (+1 Conflict)
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
