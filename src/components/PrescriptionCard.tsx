import React, { useState, useEffect } from 'react';
import type { Assignment, VerdictType } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Timer, Pause, Play, Cpu, Brain, Gavel } from 'lucide-react';

interface PrescriptionCardProps {
  assignment: Assignment;
  distanceScore: number;
  timerEndsAt: number | null;
  onStartTimer: (durationSeconds: number) => void;
  onPauseTimer: () => void;
  onRenderRuling: (verdict: VerdictType) => void;
}

export const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  assignment,
  distanceScore,
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
  const timerDisplay = `${minutes}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Eyebrow & Distance Meter */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <Badge tone="primary">{assignment.categoryDisplay}</Badge>
          <span className="text-[11px] font-mono text-fg-muted">100% Solo &amp; Safe</span>
        </div>

        {/* Real Math Distance */}
        <div className="text-right">
          <div className="text-[11px] font-mono text-fg font-medium">
            Distance: <span className="text-primary font-bold">{distanceScore.toFixed(2)}</span>
          </div>
          <div className="text-[10px] font-mono text-fg-muted">
            Inside target band [0.40 – 0.75]
          </div>
        </div>
      </div>

      {/* Main Prescription Title & Directive */}
      <div>
        <h2 className="font-serif text-2xl font-normal leading-tight sm:text-3xl text-fg">
          {assignment.title}
        </h2>
        <p className="mt-3 text-base text-fg leading-relaxed sm:text-lg">
          {assignment.instruction}
        </p>
      </div>

      {/* Optional Audio or Checklist Snippet */}
      {assignment.simulatedAudio && (
        <div className="rounded-[10px] border border-border bg-surface-sunken/60 p-3 flex items-center justify-between text-xs font-mono">
          <div>
            <div className="font-semibold text-fg">
              ▶ {assignment.simulatedAudio.artist} — {assignment.simulatedAudio.track}
            </div>
            <div className="text-fg-muted">{assignment.simulatedAudio.genre} · {assignment.simulatedAudio.bpm} BPM</div>
          </div>
          <span className="text-primary font-bold">[Preview ready]</span>
        </div>
      )}

      {/* Non-blocking Persistent Timer Bar */}
      <div className="flex items-center justify-between rounded-[10px] border border-border-strong bg-surface p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-sunken text-primary">
            <Timer className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-medium text-fg">Optional Micro-Timer</div>
            <div className="text-[11px] font-mono text-fg-muted">
              {isTimerDone ? "Time's up · Ready to rule" : `${assignment.durationSeconds / 60} minute protocol`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-base font-bold tabular-nums text-fg px-1">
            {timerDisplay}
          </span>

          {!isTimerRunning ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onStartTimer(secondsLeft)}
              className="h-8 px-2.5 text-xs gap-1"
            >
              <Play className="h-3 w-3 fill-current" />
              <span>{timerEndsAt ? 'Resume' : 'Start'}</span>
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={onPauseTimer}
              className="h-8 px-2.5 text-xs gap-1"
            >
              <Pause className="h-3 w-3" />
              <span>Pause</span>
            </Button>
          )}
        </div>
      </div>

      {/* Ruling Row - 3 Clear Strategic Options */}
      <div className="pt-2">
        <div className="mb-2.5 text-xs font-mono font-medium uppercase tracking-wider text-fg-muted">
          Render Your Ruling:
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {/* Concession */}
          <button
            type="button"
            onClick={() => onRenderRuling('WAS_WRONG')}
            className="group flex flex-col justify-between rounded-[12px] border border-border-strong bg-surface p-3.5 text-left transition-all hover:border-primary hover:bg-primary-soft/30 hover:shadow-sm active:scale-[0.98] cursor-pointer"
            id="btn-rule-concede"
          >
            <div className="flex items-center justify-between mb-2">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-mono text-fg-muted">Key [1]</span>
            </div>
            <div className="text-sm font-bold text-fg group-hover:text-primary transition-colors">
              You were right
            </div>
            <div className="text-[11px] text-fg-muted mt-0.5">
              Concede (+1 Algorithm)
            </div>
          </button>

          {/* Defend taste */}
          <button
            type="button"
            onClick={() => onRenderRuling('HATED_IT')}
            className="group flex flex-col justify-between rounded-[12px] border border-border-strong bg-surface p-3.5 text-left transition-all hover:border-secondary hover:bg-secondary-soft/30 hover:shadow-sm active:scale-[0.98] cursor-pointer"
            id="btn-rule-defend"
          >
            <div className="flex items-center justify-between mb-2">
              <Brain className="h-4 w-4 text-secondary" />
              <span className="text-[10px] font-mono text-fg-muted">Key [2]</span>
            </div>
            <div className="text-sm font-bold text-fg group-hover:text-secondary transition-colors">
              I was right
            </div>
            <div className="text-[11px] text-fg-muted mt-0.5">
              Defend taste (+1 Human)
            </div>
          </button>

          {/* Active dispute */}
          <button
            type="button"
            onClick={() => onRenderRuling('FIGHT')}
            className="group flex flex-col justify-between rounded-[12px] border border-border-strong bg-surface p-3.5 text-left transition-all hover:border-warning hover:bg-warning-soft/30 hover:shadow-sm active:scale-[0.98] cursor-pointer"
            id="btn-rule-objection"
          >
            <div className="flex items-center justify-between mb-2">
              <Gavel className="h-4 w-4 text-warning" />
              <span className="text-[10px] font-mono text-fg-muted">Key [3]</span>
            </div>
            <div className="text-sm font-bold text-fg group-hover:text-warning transition-colors">
              Objection
            </div>
            <div className="text-[11px] text-fg-muted mt-0.5">
              Log dispute (+1 Conflict)
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
