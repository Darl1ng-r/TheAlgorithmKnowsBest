import React, { useState, useEffect } from 'react';
import type { Assignment, VerdictType } from '../types';
import { Button } from './ui/button';
import { Share2, BookOpen, Check, Sparkles } from 'lucide-react';
import { Crosshair, Starburst, Barcode, CircuitGlyph, CornerMarks } from './TechGraphics';

interface RuledCardProps {
  assignment: Assignment;
  verdict: VerdictType;
  retort: string;
  isPractice: boolean;
  onStartUnranked: () => void;
  onOpenRecord: () => void;
}

export const RuledCard: React.FC<RuledCardProps> = ({
  assignment,
  verdict,
  retort,
  isPractice,
  onStartUnranked,
  onOpenRecord,
}) => {
  const [copied, setCopied] = useState(false);
  const [timeUntilTomorrow, setTimeUntilTomorrow] = useState('');

  // Countdown to next UTC midnight
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextMidnight = new Date();
      nextMidnight.setUTCHours(24, 0, 0, 0);
      const diffMs = nextMidnight.getTime() - now.getTime();

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
      setTimeUntilTomorrow(
        `${String(hours).padStart(2, '0')}H ${String(mins).padStart(2, '0')}M ${String(secs).padStart(2, '0')}S`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    const verdictName =
      verdict === 'WAS_WRONG'
        ? 'Algorithm +1 (I conceded)'
        : verdict === 'HATED_IT'
        ? 'Human +1 (I defended my taste)'
        : 'Active Conflict (Objection logged)';

    const shareData = {
      title: 'The Algorithm Knows Best // Specimen Ruling',
      text: `[CALIBRATION COMPLETE]\nDirective: "${assignment.title}"\nVerdict: ${verdictName}\n"${retort}"\n\nExperience Calculated Friction:`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback
      }
    }
  };

  const getVerdictHeadline = () => {
    if (verdict === 'WAS_WRONG') return 'ALGORITHM REMAINS UNDEFEATED';
    if (verdict === 'HATED_IT') return 'MORTAL INSTINCT PRESERVED';
    return 'COGNITIVE IMPASSE REGISTERED';
  };

  const getVerdictSubtag = () => {
    if (verdict === 'WAS_WRONG') return 'HUMAN / CONCESSION / INTEGRATION';
    if (verdict === 'HATED_IT') return 'HUMAN / EXPRESSION / RESISTANCE';
    return 'HUMAN / ALGORITHM / CONFLICT';
  };

  return (
    <div className="relative flex flex-col gap-6">
      <CornerMarks />

      {/* Top Protocol Header */}
      <div className="flex items-center justify-between border-b border-border-strong pb-3">
        <div className="flex items-center gap-2">
          <Crosshair size={12} className="text-signal-red" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-fg">
            RULING DOSSIER // LOG.2026
          </span>
          {isPractice && (
            <span className="border border-signal-pink bg-signal-pink/10 px-1.5 py-0.5 text-[9px] text-signal-pink uppercase font-bold tracking-widest font-mono">
              UNRANKED
            </span>
          )}
        </div>
        <span className="text-[10px] font-mono text-fg-muted uppercase tracking-wider">
          {assignment.categoryDisplay}
        </span>
      </div>

      {/* ICONIC SIGNAL RED CALLOUT BLOCK (Directly inspired by Reference 1 "Synthopsis") */}
      <div className="rounded-[2px] border-2 border-border-strong bg-signal-red text-white p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/90 font-bold">
              <Starburst size={10} className="text-white" />
              <span>{getVerdictSubtag()}</span>
            </div>
            <h2 className="font-display font-black text-xl uppercase tracking-tight sm:text-2xl text-white leading-none">
              {getVerdictHeadline()}
            </h2>
          </div>

          {/* Circuit Glyph Illustration */}
          <div className="w-32 h-10 shrink-0 text-white/90">
            <CircuitGlyph className="w-full h-full" />
          </div>
        </div>

        {/* Bottom bar of callout */}
        <div className="mt-4 pt-2.5 border-t border-white/20 flex items-center justify-between text-[9px] font-mono tracking-widest text-white/80 uppercase">
          <span>SPECIMEN VERDICT // 0.65 DISTANCE</span>
          <span>SYSTEM VERIFIED ✓</span>
        </div>
      </div>

      {/* Official Algorithmic Retort Quote */}
      <div className="space-y-2 border-l-2 border-border-strong pl-4">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-signal-red font-bold">
          <Crosshair size={10} />
          <span>ALGORITHMIC COMMENTARY:</span>
        </div>
        <blockquote className="font-display font-bold text-xl sm:text-2xl text-fg uppercase leading-snug tracking-tight">
          &ldquo;{retort}&rdquo;
        </blockquote>
        <div className="font-mono text-[11px] text-fg-muted uppercase">
          ASSIGNMENT: {assignment.title}
        </div>
      </div>

      {/* Barcode & Telemetry */}
      <div className="flex items-center justify-between py-1 border-y border-border">
        <Barcode code={`VERDICT-${verdict}-2026`} />
        <span className="text-[10px] font-mono text-fg-muted uppercase">
          CALIBRATED UTC 2026
        </span>
      </div>

      {/* Strategic Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="primary"
          onClick={handleShare}
          className="flex-1 sm:flex-none h-10 px-5 font-mono text-xs uppercase font-bold tracking-wider rounded-[2px] border-2 border-border-strong shadow-md gap-2 cursor-pointer"
          id="btn-share-result"
        >
          {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          <span>{copied ? 'Dossier Copied!' : 'Share Ruling'}</span>
        </Button>

        <Button
          variant="secondary"
          onClick={onOpenRecord}
          className="h-10 px-4 font-mono text-xs uppercase font-bold tracking-wider rounded-[2px] border-2 border-border-strong hover:bg-primary hover:text-on-primary gap-2 cursor-pointer"
          id="btn-view-record"
        >
          <BookOpen className="h-4 w-4" />
          <span>Full Dossier</span>
        </Button>
      </div>

      {/* Next Calibration Countdown & Practice Round */}
      <div className="rounded-[2px] border-2 border-border-strong bg-surface-sunken/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        <div>
          <div className="font-bold text-fg uppercase tracking-wider text-[11px]">
            NEXT DAILY CALIBRATION DROP
          </div>
          <div className="text-signal-red font-black text-sm tracking-widest tabular-nums mt-0.5">
            ARRIVES IN [{timeUntilTomorrow}]
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={onStartUnranked}
          className="h-8 px-3 font-mono text-xs uppercase font-bold tracking-wider border-border-strong rounded-[2px] hover:bg-signal-pink hover:text-white hover:border-signal-pink gap-1.5 cursor-pointer"
          id="btn-unranked-round"
        >
          <Sparkles className="h-3.5 w-3.5 text-signal-pink" />
          <span>Play Unranked</span>
        </Button>
      </div>
    </div>
  );
};
