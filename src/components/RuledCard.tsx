import React, { useState, useEffect } from 'react';
import type { Assignment, VerdictType } from '../types';
import { Button } from './ui/button';
import { Share2, BookOpen, Check, Sparkles } from 'lucide-react';
import { CircuitGlyph } from './TechGraphics';

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
        `${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`
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
    if (verdict === 'WAS_WRONG') return 'The Algorithm Won';
    if (verdict === 'HATED_IT') return 'Human Instinct Defended';
    return 'Cognitive Impasse Registered';
  };

  const getVerdictSubtag = () => {
    if (verdict === 'WAS_WRONG') return 'Human Concession · Algorithm +1';
    if (verdict === 'HATED_IT') return 'Mortal Resistance · Human +1';
    return 'Active Conflict Logged';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Protocol Header */}
      <div className="flex items-center justify-between border-b border-border pb-3.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-fg uppercase tracking-wider">
            Ruling Record // Log 2026
          </span>
          {isPractice && (
            <span className="border border-signal-pink bg-signal-pink/10 px-2 py-0.5 text-[10px] text-signal-pink uppercase font-bold tracking-wider font-mono rounded-sm">
              Unranked
            </span>
          )}
        </div>
        <span className="text-xs font-mono text-fg-muted font-medium">
          Category: {assignment.categoryDisplay}
        </span>
      </div>

      {/* ICONIC SIGNAL RED CALLOUT BLOCK (Reference 1 inspired, high readability) */}
      <div className="rounded-sm border-2 border-border-strong bg-signal-red text-white p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs font-mono tracking-wider text-white/90 font-bold uppercase">
              {getVerdictSubtag()}
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
              {getVerdictHeadline()}
            </h2>
          </div>

          {/* Circuit Glyph Illustration */}
          <div className="w-28 h-9 shrink-0 text-white/90">
            <CircuitGlyph className="w-full h-full" />
          </div>
        </div>

        {/* Bottom bar of callout */}
        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-mono text-white/80">
          <span>Anti-Recommendation Evaluated</span>
          <span className="font-bold">System Verified ✓</span>
        </div>
      </div>

      {/* Official Algorithmic Retort Quote (Natural, Highly Legible Sentence Case) */}
      <div className="space-y-2.5 border-l-3 border-border-strong pl-4 py-1">
        <div className="text-xs font-mono uppercase tracking-wider text-signal-red font-bold">
          Algorithmic Verdict:
        </div>
        <blockquote className="font-display font-medium text-xl sm:text-2xl text-fg leading-relaxed">
          &ldquo;{retort}&rdquo;
        </blockquote>
        <div className="font-mono text-xs text-fg-muted">
          Assignment: <span className="font-medium text-fg">{assignment.title}</span>
        </div>
      </div>

      {/* Strategic Actions */}
      <div className="flex flex-wrap gap-3 pt-1">
        <Button
          variant="primary"
          onClick={handleShare}
          className="flex-1 sm:flex-none h-11 px-6 font-mono text-xs uppercase font-bold tracking-wider rounded-sm border-2 border-border-strong shadow-md gap-2 cursor-pointer"
          id="btn-share-result"
        >
          {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          <span>{copied ? 'Result Copied!' : 'Share Verdict'}</span>
        </Button>

        <Button
          variant="secondary"
          onClick={onOpenRecord}
          className="h-11 px-5 font-mono text-xs uppercase font-bold tracking-wider rounded-sm border-2 border-border-strong hover:bg-primary hover:text-on-primary gap-2 cursor-pointer"
          id="btn-view-record"
        >
          <BookOpen className="h-4 w-4" />
          <span>View Record</span>
        </Button>
      </div>

      {/* Next Calibration Countdown & Practice Round */}
      <div className="rounded-sm border-2 border-border-strong bg-surface-sunken p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
        <div>
          <div className="font-bold text-fg uppercase tracking-wider text-xs">
            Next Daily Calibration Drop
          </div>
          <div className="text-signal-red font-bold text-sm tracking-wider tabular-nums mt-0.5">
            Arrives in {timeUntilTomorrow}
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={onStartUnranked}
          className="h-9 px-3.5 font-mono text-xs uppercase font-bold tracking-wider border-border-strong rounded-sm hover:bg-signal-pink hover:text-white hover:border-signal-pink gap-1.5 cursor-pointer"
          id="btn-unranked-round"
        >
          <Sparkles className="h-3.5 w-3.5 text-signal-pink" />
          <span>Play Unranked Round</span>
        </Button>
      </div>
    </div>
  );
};
