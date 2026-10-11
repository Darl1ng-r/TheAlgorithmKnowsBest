import React, { useState } from 'react';
import type { UserRecord, VerdictType } from '../state/daily-store';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet';
import { Button } from './ui/button';
import { Flame, Cpu, Brain, Gavel, Trash2 } from 'lucide-react';

interface RecordDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  record: UserRecord;
  onClearData: () => void;
}

type FilterType = 'ALL' | 'ALGO' | 'HUMAN' | 'DISPUTE';

export const RecordDrawer: React.FC<RecordDrawerProps> = ({
  isOpen,
  onClose,
  record,
  onClearData,
}) => {
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [confirmClear, setConfirmClear] = useState(false);

  const filteredHistory = record.history.filter(item => {
    if (filter === 'ALGO') return item.verdict === 'WAS_WRONG';
    if (filter === 'HUMAN') return item.verdict === 'HATED_IT';
    if (filter === 'DISPUTE') return item.verdict === 'FIGHT';
    return true;
  });

  const getVerdictBadge = (verdict: VerdictType) => {
    if (verdict === 'WAS_WRONG') {
      return (
        <span className="border border-border-strong bg-primary text-on-primary px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-sm">
          Algorithm +1
        </span>
      );
    }
    if (verdict === 'HATED_IT') {
      return (
        <span className="border border-border-strong bg-signal-pink text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-sm">
          Human +1
        </span>
      );
    }
    return (
      <span className="border border-border-strong bg-warning text-fg px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-sm">
        Dispute
      </span>
    );
  };

  const p = record.tasteProfile;
  const tasteAxes = [
    { labelLeft: 'Comfort & Routine', labelRight: 'High Adventure', val: p.adventurousness },
    { labelLeft: 'Subtle & Ambient', labelRight: 'Sensory Overload', val: p.sensoryIntensity },
    { labelLeft: 'Orthodox & Classic', labelRight: 'Avant-Garde', val: p.tradition },
    { labelLeft: 'Low-Effort Casual', labelRight: 'Deep Analytical', val: p.cognitiveEffort },
    { labelLeft: 'Utilitarian Direct', labelRight: 'Absurd & Dadaist', val: p.absurdity },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={open => !open && onClose()}>
      <SheetContent className="border-l-2 border-border-strong bg-surface">
        <SheetHeader>
          <div className="flex items-center justify-between border-b border-border pb-3.5">
            <SheetTitle className="font-display font-bold text-2xl tracking-tight text-fg">
              Your Record
            </SheetTitle>
            <span className="text-xs font-mono text-fg-muted font-bold">
              [ Empirical Log ]
            </span>
          </div>
          <SheetDescription className="font-sans text-sm text-fg-muted">
            Historical accountability record between mortal intuition and algorithmic predictions.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 pb-12 pt-3">
          {/* 3 Telemetry Stat Tiles with High Readability */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-sm border-2 border-border-strong bg-surface-sunken p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono text-fg font-bold">
                <Cpu className="h-3.5 w-3.5 text-signal-red" />
                <span>Algo</span>
              </div>
              <span className="text-3xl font-bold font-mono mt-2 text-fg tabular-nums">
                {record.algoWins}
              </span>
              <span className="text-xs font-sans text-fg-muted mt-0.5">Conceded</span>
            </div>

            <div className="rounded-sm border-2 border-border-strong bg-surface-sunken p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono text-fg font-bold">
                <Brain className="h-3.5 w-3.5 text-signal-pink" />
                <span>Human</span>
              </div>
              <span className="text-3xl font-bold font-mono mt-2 text-fg tabular-nums">
                {record.humanWins}
              </span>
              <span className="text-xs font-sans text-fg-muted mt-0.5">Defended</span>
            </div>

            <div className="rounded-sm border-2 border-border-strong bg-surface-sunken p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono text-fg font-bold">
                <Gavel className="h-3.5 w-3.5 text-warning" />
                <span>Disputes</span>
              </div>
              <span className="text-3xl font-bold font-mono mt-2 text-fg tabular-nums">
                {record.disputed}
              </span>
              <span className="text-xs font-sans text-fg-muted mt-0.5">Active</span>
            </div>
          </div>

          {/* Streak Banner */}
          <div className="flex items-center justify-between rounded-sm border-2 border-border-strong bg-surface p-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-signal-red fill-signal-red" />
              <span className="font-bold text-fg">Consecutive Evaluations:</span>
            </div>
            <span className="font-bold text-signal-red text-sm tabular-nums">
              {record.streakDays} Days
            </span>
          </div>

          {/* 5-Axis Taste Profile Spectrum (Clear, Readable) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-fg font-bold">
              <span>5-Axis Taste Vector Spectrum</span>
              <span className="text-fg-muted text-[11px] font-normal">Perturbation</span>
            </div>

            <div className="space-y-3.5 rounded-sm border-2 border-border-strong bg-surface p-4 sm:p-5">
              {tasteAxes.map((axis, i) => {
                const percent = Math.min(100, Math.max(0, ((axis.val + 1) / 2) * 100));
                return (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-sans font-medium text-fg-muted">
                      <span>{axis.labelLeft}</span>
                      <span>{axis.labelRight}</span>
                    </div>
                    <div className="relative h-2.5 w-full rounded-sm border border-border-strong bg-surface-sunken overflow-hidden">
                      {/* Center zero tick */}
                      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-border-strong z-10" />
                      <div
                        className="absolute top-0 bottom-0 bg-signal-red transition-all duration-300"
                        style={{
                          left: `${Math.min(50, percent)}%`,
                          width: `${Math.abs(percent - 50)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ruling Ledger History Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-fg font-bold">
                Ruling Ledger ({record.history.length})
              </h3>

              {/* Filter chips with clear active states */}
              <div className="flex gap-1 border border-border-strong bg-surface-sunken p-1 rounded-sm">
                {(['ALL', 'ALGO', 'HUMAN'] as FilterType[]).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilter(t)}
                    className={`px-2.5 py-0.5 text-xs font-mono font-bold uppercase transition-colors cursor-pointer rounded-sm ${
                      filter === t ? 'bg-primary text-on-primary' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {filteredHistory.length === 0 ? (
              <div className="rounded-sm border-2 border-dashed border-border p-8 text-center text-xs font-mono text-fg-muted">
                No rulings logged under this filter yet.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {filteredHistory
                  .slice()
                  .reverse()
                  .map(entry => (
                    <div
                      key={entry.id}
                      className="rounded-sm border border-border-strong bg-surface p-3.5 text-xs flex items-center justify-between gap-3 hover:bg-surface-sunken transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-fg-muted font-medium">
                            {entry.date}
                          </span>
                          {entry.isPractice && (
                            <span className="border border-signal-pink bg-signal-pink/10 px-1.5 text-[9px] text-signal-pink font-bold font-mono uppercase rounded-sm">
                              Practice
                            </span>
                          )}
                        </div>
                        <div className="font-sans font-semibold text-sm text-fg truncate mt-1">
                          {entry.title}
                        </div>
                        <div className="text-xs font-mono text-fg-muted mt-0.5">
                          Distance: {entry.distance.toFixed(2)}
                        </div>
                      </div>
                      <div className="shrink-0">{getVerdictBadge(entry.verdict)}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Reset All Data (Two-step confirm) */}
          <div className="pt-4 border-t border-border">
            {!confirmClear ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmClear(true)}
                className="w-full text-xs font-mono font-bold text-danger hover:bg-danger/10 hover:text-danger gap-1.5 border border-dashed border-danger/40 rounded-sm"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Reset All History &amp; Streaks</span>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    onClearData();
                    setConfirmClear(false);
                    onClose();
                  }}
                  className="flex-1 text-xs font-mono font-bold rounded-sm"
                >
                  Confirm Full Reset
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setConfirmClear(false)}
                  className="text-xs font-mono font-bold rounded-sm border-border-strong"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
