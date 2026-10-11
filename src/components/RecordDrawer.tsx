import React, { useState } from 'react';
import type { UserRecord, VerdictType } from '../state/daily-store';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet';
import { Badge } from './ui/badge';
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
    if (verdict === 'WAS_WRONG') return <Badge tone="primary">Algorithm</Badge>;
    if (verdict === 'HATED_IT') return <Badge tone="secondary">Human</Badge>;
    return <Badge tone="warning">Dispute</Badge>;
  };

  const p = record.tasteProfile;
  const tasteAxes = [
    { labelLeft: 'Comfort / Routine', labelRight: 'Adventurous', val: p.adventurousness },
    { labelLeft: 'Mild / Subtle', labelRight: 'High Stimulus', val: p.sensoryIntensity },
    { labelLeft: 'Canon / Traditional', labelRight: 'Avant-Garde', val: p.tradition },
    { labelLeft: 'Low-Effort', labelRight: 'Deep Analytical', val: p.cognitiveEffort },
    { labelLeft: 'Utilitarian', labelRight: 'Absurd / Dadaist', val: p.absurdity },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={open => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Empirical Record</SheetTitle>
          <SheetDescription>
            Historical accountability between your mortal instincts and the Algorithm.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-8 pb-10">
          {/* Stat Tiles */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-[12px] border border-border bg-surface-sunken/60 p-3 flex flex-col">
              <div className="flex items-center gap-1.5 text-xs font-mono text-primary font-semibold">
                <Cpu className="h-3.5 w-3.5" />
                <span>Algorithm</span>
              </div>
              <span className="text-2xl font-bold font-mono mt-1 text-fg">
                {record.algoWins}
              </span>
              <span className="text-[10px] text-fg-muted">Right</span>
            </div>

            <div className="rounded-[12px] border border-border bg-surface-sunken/60 p-3 flex flex-col">
              <div className="flex items-center gap-1.5 text-xs font-mono text-secondary font-semibold">
                <Brain className="h-3.5 w-3.5" />
                <span>Human</span>
              </div>
              <span className="text-2xl font-bold font-mono mt-1 text-fg">
                {record.humanWins}
              </span>
              <span className="text-[10px] text-fg-muted">Right</span>
            </div>

            <div className="rounded-[12px] border border-border bg-surface-sunken/60 p-3 flex flex-col">
              <div className="flex items-center gap-1.5 text-xs font-mono text-warning font-semibold">
                <Gavel className="h-3.5 w-3.5" />
                <span>Disputes</span>
              </div>
              <span className="text-2xl font-bold font-mono mt-1 text-fg">
                {record.disputed}
              </span>
              <span className="text-[10px] text-fg-muted">Active</span>
            </div>
          </div>

          {/* Streak Banner */}
          <div className="flex items-center justify-between rounded-[10px] border border-border bg-surface p-3.5">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-warning fill-current" />
              <span className="text-xs font-medium text-fg">Consecutive Calibrations</span>
            </div>
            <span className="font-mono text-sm font-bold text-warning">
              {record.streakDays} Days
            </span>
          </div>

          {/* 5-Axis Taste Profile */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-fg-muted mb-3">
              5-Axis Taste Profile (Perturbed)
            </h3>
            <div className="space-y-3.5 rounded-[12px] border border-border bg-surface p-4">
              {tasteAxes.map((axis, i) => {
                // val is [-1, 1]. Map to percent [0, 100]
                const percent = Math.min(100, Math.max(0, ((axis.val + 1) / 2) * 100));
                return (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between text-[11px] text-fg-muted mb-1 font-mono">
                      <span>{axis.labelLeft}</span>
                      <span>{axis.labelRight}</span>
                    </div>
                    <div className="relative h-2 w-full rounded-full bg-surface-sunken overflow-hidden">
                      <div
                        className="absolute top-0 bottom-0 bg-primary transition-all duration-300"
                        style={{
                          left: `${Math.min(50, percent)}%`,
                          width: `${Math.abs(percent - 50)}%`,
                        }}
                      />
                      {/* Center zero line */}
                      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-border-strong" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* History Ledger Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-fg-muted">
                Ruling Ledger ({record.history.length})
              </h3>

              {/* Filter chips */}
              <div className="flex gap-1 rounded-full bg-surface-sunken p-1 border border-border">
                {(['ALL', 'ALGO', 'HUMAN'] as FilterType[]).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilter(t)}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                      filter === t ? 'bg-surface text-fg shadow-sm' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {filteredHistory.length === 0 ? (
              <div className="rounded-[12px] border border-dashed border-border p-6 text-center text-xs text-fg-muted">
                No rulings logged in this view yet.
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {filteredHistory
                  .slice()
                  .reverse()
                  .map(entry => (
                    <div
                      key={entry.id}
                      className="rounded-[10px] border border-border bg-surface p-3 text-xs flex items-center justify-between gap-2 hover:bg-surface-sunken/40 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-fg-muted">
                            {entry.date}
                          </span>
                          {entry.isPractice && (
                            <span className="rounded bg-info-soft px-1 text-[9px] text-info font-bold">
                              PRACTICE
                            </span>
                          )}
                        </div>
                        <div className="font-medium text-fg truncate mt-0.5">
                          {entry.title}
                        </div>
                        <div className="text-[10px] text-fg-muted">
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
                className="w-full text-xs text-danger hover:bg-danger-soft hover:text-danger gap-1.5"
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
                  className="flex-1 text-xs"
                >
                  Confirm Full Reset
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setConfirmClear(false)}
                  className="text-xs"
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
