import React, { useState, useEffect } from 'react';
import type { Assignment, VerdictType } from '../types';
import { Button } from './ui/button';
import { Timer, Pause, Play, Cpu, Brain, Gavel } from 'lucide-react';
import { Crosshair, Starburst, Barcode, CornerMarks } from './TechGraphics';

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

  // Timer calculations
  const isTimerRunning = Boolean(timerEndsAt && timerEndsAt > now);
  const isTimerDone = Boolean(timerEndsAt && timerEndsAt <= now);
  const secondsLeft = timerEndsAt
    ? Math.max(0, Math.ceil((timerEndsAt - now) / 1000))
    : assignment.durationSeconds;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timerDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="relative flex flex-col gap-6">
      <CornerMarks />

      {/* Top Protocol Tag */}
      <div className="flex items-center justify-between border-b border-border-strong pb-3">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-signal-red uppercase font-bold">
          <Starburst size={10} />
          <span>PRESCRIPTION DIRECTIVE // SPEC.2026</span>
        </div>
        <div className="text-[10px] font-mono text-fg-muted uppercase tracking-wider">
          CATEGORY: {assignment.categoryDisplay}
        </div>
      </div>

      {/* Main Prescription Title & Directive (Brutalist Specimen Style) */}
      <div className="space-y-3">
        <h2 className="font-display font-black text-2xl uppercase tracking-tight text-fg leading-tight sm:text-3xl md:text-4xl">
          {assignment.title}
        </h2>
        
        <div className="rounded-[2px] border-l-3 border-signal-red bg-surface-sunken/60 p-3.5 font-mono text-xs sm:text-sm text-fg leading-relaxed">
          {assignment.instruction}
        </div>
      </div>

      {/* Optional Audio Track Specimen */}
      {assignment.simulatedAudio && (
        <div className="rounded-[2px] border-2 border-border-strong bg-surface p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-border-strong bg-primary text-on-primary font-bold">
              ▶
            </span>
            <div>
              <div className="font-bold text-fg uppercase">
                {assignment.simulatedAudio.artist} — {assignment.simulatedAudio.track}
              </div>
              <div className="text-[10px] text-fg-muted uppercase tracking-wider">
                {assignment.simulatedAudio.genre} · {assignment.simulatedAudio.bpm} BPM
              </div>
            </div>
          </div>
          <Barcode code="AUDIO-WAVE-01" showCode={false} className="hidden sm:inline-flex opacity-60" />
        </div>
      )}

      {/* Non-blocking Persistent Mechanical Timer Bar */}
      <div className="flex items-center justify-between rounded-[2px] border-2 border-border-strong bg-surface p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-border-strong bg-surface-sunken text-signal-red">
            <Timer className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold uppercase text-fg">
              Micro-Protocol Timer
            </div>
            <div className="text-[10px] font-mono text-fg-muted uppercase tracking-wider">
              {isTimerDone ? "Protocol Elapsed · Submit Ruling" : `${assignment.durationSeconds / 60} MINUTE CALIBRATION`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-lg font-black tabular-nums tracking-widest text-fg">
            [{timerDisplay}]
          </span>

          {!isTimerRunning ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onStartTimer(secondsLeft)}
              className="h-8 px-3 font-mono text-xs uppercase font-bold tracking-wider border-border-strong rounded-[2px] hover:bg-primary hover:text-on-primary"
            >
              <Play className="h-3 w-3 fill-current mr-1" />
              <span>{timerEndsAt ? 'Resume' : 'Start'}</span>
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={onPauseTimer}
              className="h-8 px-3 font-mono text-xs uppercase font-bold tracking-wider border-border-strong rounded-[2px] hover:bg-signal-red hover:text-white"
            >
              <Pause className="h-3 w-3 mr-1" />
              <span>Pause</span>
            </Button>
          )}
        </div>
      </div>

      {/* Strategic Rulings Grid - 3 Mechanical Verdict Buttons */}
      <div className="border-t border-border-strong pt-3">
        <div className="mb-3 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-fg">
          <span className="flex items-center gap-1.5">
            <Crosshair size={12} className="text-signal-red" />
            <span>RENDER EMPIRICAL RULING:</span>
          </span>
          <span className="text-[10px] text-fg-muted font-normal">PRESS [1], [2], OR [3]</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {/* Concession (Algorithm was right) */}
          <button
            type="button"
            onClick={() => onRenderRuling('WAS_WRONG')}
            className="group flex flex-col justify-between rounded-[2px] border-2 border-border-strong bg-surface p-4 text-left transition-all hover:bg-primary hover:text-on-primary hover:shadow-md active:translate-y-0.5 cursor-pointer"
            id="btn-rule-concede"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <Cpu className="h-4 w-4 text-signal-red group-hover:text-on-primary" />
                <span className="border border-border group-hover:border-on-primary/40 px-1.5 py-0.5 text-[9px] font-mono font-bold">
                  [1]
                </span>
              </div>
              <div className="font-display font-extrabold text-sm uppercase tracking-tight text-fg group-hover:text-on-primary">
                You Were Right
              </div>
            </div>
            <div className="text-[10px] font-mono text-fg-muted mt-2 border-t border-dashed border-border/50 group-hover:border-on-primary/30 pt-1.5 group-hover:text-on-primary/80 uppercase">
              Concede (+1 Algo)
            </div>
          </button>

          {/* Defend Mortal Taste */}
          <button
            type="button"
            onClick={() => onRenderRuling('HATED_IT')}
            className="group flex flex-col justify-between rounded-[2px] border-2 border-border-strong bg-surface p-4 text-left transition-all hover:bg-primary hover:text-on-primary hover:shadow-md active:translate-y-0.5 cursor-pointer"
            id="btn-rule-defend"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <Brain className="h-4 w-4 text-signal-pink group-hover:text-on-primary" />
                <span className="border border-border group-hover:border-on-primary/40 px-1.5 py-0.5 text-[9px] font-mono font-bold">
                  [2]
                </span>
              </div>
              <div className="font-display font-extrabold text-sm uppercase tracking-tight text-fg group-hover:text-on-primary">
                I Was Right
              </div>
            </div>
            <div className="text-[10px] font-mono text-fg-muted mt-2 border-t border-dashed border-border/50 group-hover:border-on-primary/30 pt-1.5 group-hover:text-on-primary/80 uppercase">
              Defend (+1 Human)
            </div>
          </button>

          {/* Active Dispute */}
          <button
            type="button"
            onClick={() => onRenderRuling('FIGHT')}
            className="group flex flex-col justify-between rounded-[2px] border-2 border-border-strong bg-surface p-4 text-left transition-all hover:bg-signal-red hover:text-white hover:border-signal-red hover:shadow-md active:translate-y-0.5 cursor-pointer"
            id="btn-rule-objection"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <Gavel className="h-4 w-4 text-warning group-hover:text-white" />
                <span className="border border-border group-hover:border-white/40 px-1.5 py-0.5 text-[9px] font-mono font-bold">
                  [3]
                </span>
              </div>
              <div className="font-display font-extrabold text-sm uppercase tracking-tight text-fg group-hover:text-white">
                Objection
              </div>
            </div>
            <div className="text-[10px] font-mono text-fg-muted mt-2 border-t border-dashed border-border/50 group-hover:border-white/30 pt-1.5 group-hover:text-white/80 uppercase">
              Dispute (+1 Conflict)
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
