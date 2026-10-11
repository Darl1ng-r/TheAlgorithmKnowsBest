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
import { Crosshair, Starburst, Barcode, CornerMarks } from './TechGraphics';

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
        <span className="border border-border-strong bg-primary text-on-primary px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase">
          ALGORITHM +1
        </span>
      );
    }
    if (verdict === 'HATED_IT') {
      return (
        <span className="border border-border-strong bg-signal-pink text-white px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase">
          HUMAN +1
        </span>
      );
    }
    return (
      <span className="border border-border-strong bg-warning text-fg px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase">
        DISPUTE
      </span>
    );
  };

  const p = record.tasteProfile;
  const tasteAxes = [
    { labelLeft: 'Comfort / Routine', labelRight: 'Adventurous', val: p.adventurousness },
    { labelLeft: 'Subtle / Ambient', labelRight: 'Sensory Overload', val: p.sensoryIntensity },
    { labelLeft: 'Orthodox / Classic', labelRight: 'Avant-Garde', val: p.tradition },
    { labelLeft: 'Low-Effort Passive', labelRight: 'Deep Analytical', val: p.cognitiveEffort },
    { labelLeft: 'Utilitarian Functional', labelRight: 'Absurd / Dadaist', val: p.absurdity },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={open => !open && onClose()}>
      <SheetContent className="border-l-2 border-border-strong bg-surface">
        <SheetHeader>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Crosshair size={14} className="text-signal-red" />
              <SheetTitle className="font-display font-black text-xl uppercase tracking-tight text-fg">
                Specimen Dossier
              </SheetTitle>
            </div>
            <Barcode code="REC-2026.LEDGER" showCode={false} className="opacity-80" />
          </div>
          <SheetDescription className="font-mono text-xs text-fg-muted uppercase">
            EMPIRICAL ACCOUNTABILITY LOG // HUMAN VS THE ALGORITHM
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 pb-12 pt-2">
          {/* 3 Telemetry Stat Tiles */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="relative rounded-[2px] border-2 border-border-strong bg-surface-sunken p-3 flex flex-col justify-between">
              <CornerMarks />
              <div className="flex items-center gap-1 text-[10px] font-mono text-fg font-bold uppercase">
                <Cpu className="h-3 w-3 text-signal-red" />
                <span>ALGO</span>
              </div>
              <span className="text-2xl font-black font-mono mt-1 text-fg tabular-nums">
                {record.algoWins}
              </span>
              <span className="text-[9px] font-mono text-fg-muted uppercase">Conceded</span>
            </div>

            <div className="relative rounded-[2px] border-2 border-border-strong bg-surface-sunken p-3 flex flex-col justify-between">
              <CornerMarks />
              <div className="flex items-center gap-1 text-[10px] font-mono text-fg font-bold uppercase">
                <Brain className="h-3 w-3 text-signal-pink" />
                <span>HUMAN</span>
              </div>
              <span className="text-2xl font-black font-mono mt-1 text-fg tabular-nums">
                {record.humanWins}
              </span>
              <span className="text-[9px] font-mono text-fg-muted uppercase">Defended</span>
            </div>

            <div className="relative rounded-[2px] border-2 border-border-strong bg-surface-sunken p-3 flex flex-col justify-between">
              <CornerMarks />
              <div className="flex items-center gap-1 text-[10px] font-mono text-fg font-bold uppercase">
                <Gavel className="h-3 w-3 text-warning" />
                <span>DISPUTE</span>
              </div>
              <span className="text-2xl font-black font-mono mt-1 text-fg tabular-nums">
                {record.disputed}
              </span>
              <span className="text-[9px] font-mono text-fg-muted uppercase">Active</span>
            </div>
          </div>

          {/* Streak Banner */}
          <div className="flex items-center justify-between rounded-[2px] border-2 border-border-strong bg-surface p-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-signal-red fill-current" />
              <span className="font-bold text-fg uppercase">Consecutive Calibrations:</span>
            </div>
            <span className="font-black text-signal-red text-sm">
              [{record.streakDays} DAYS]
            </span>
          </div>

          {/* 5-Axis Taste Profile (Perturbed) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-fg-muted font-bold">
              <div className="flex items-center gap-1">
                <Starburst size={10} className="text-signal-red" />
                <span>5-AXIS TASTE VECTOR SPECTRUM</span>
              </div>
              <span>DELTA SCALE</span>
            </div>

            <div className="space-y-3 rounded-[2px] border-2 border-border-strong bg-surface p-4">
              {tasteAxes.map((axis, i) => {
                const percent = Math.min(100, Math.max(0, ((axis.val + 1) / 2) * 100));
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-fg-muted uppercase">
                      <span>{axis.labelLeft}</span>
                      <span>{axis.labelRight}</span>
                    </div>
                    <div className="relative h-2 w-full border border-border-strong bg-surface-sunken overflow-hidden">
                      {/* Center tick */}
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
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-fg font-bold">
                CALIBRATION LEDGER ({record.history.length})
              </h3>

              {/* Filter chips */}
              <div className="flex gap-1 border border-border-strong bg-surface-sunken p-0.5">
                {(['ALL', 'ALGO', 'HUMAN'] as FilterType[]).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilter(t)}
                    className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                      filter === t ? 'bg-primary text-on-primary' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {filteredHistory.length === 0 ? (
              <div className="rounded-[2px] border-2 border-dashed border-border p-6 text-center text-xs font-mono text-fg-muted uppercase">
                NO RULINGS ARCHIVED UNDER THIS FILTER
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {filteredHistory
                  .slice()
                  .reverse()
                  .map(entry => (
                    <div
                      key={entry.id}
                      className="rounded-[2px] border-2 border-border-strong bg-surface p-3 text-xs flex items-center justify-between gap-2 hover:bg-surface-sunken transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] text-fg-muted">
                            [{entry.date}]
                          </span>
                          {entry.isPractice && (
                            <span className="border border-signal-pink bg-signal-pink/10 px-1 text-[8px] text-signal-pink font-bold font-mono uppercase">
                              PRACTICE
                            </span>
                          )}
                        </div>
                        <div className="font-display font-bold text-fg uppercase truncate mt-0.5">
                          {entry.title}
                        </div>
                        <div className="text-[9px] font-mono text-fg-muted uppercase">
                          DISTANCE COEFFICIENT: {entry.distance.toFixed(2)}
                        </div>
                      </div>
                      <div className="shrink-0">{getVerdictBadge(entry.verdict)}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Reset All Data (Two-step confirm) */}
          <div className="pt-4 border-t border-border-strong">
            {!confirmClear ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmClear(true)}
                className="w-full text-xs font-mono uppercase font-bold text-danger hover:bg-danger/10 hover:text-danger gap-1.5 border border-dashed border-danger/40 rounded-[2px]"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>PURGE ALL SPECIMEN RECORDS</span>
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
                  className="flex-1 text-xs font-mono uppercase font-bold rounded-[2px]"
                >
                  CONFIRM PURGE
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setConfirmClear(false)}
                  className="text-xs font-mono uppercase font-bold rounded-[2px] border-border-strong"
                >
                  CANCEL
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
