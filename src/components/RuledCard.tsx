import React, { useState, useEffect } from 'react';
import type { Assignment, VerdictType } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Share2, BookOpen, Check, Sparkles } from 'lucide-react';

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
        ? 'Algorithm +1 (I was wrong)'
        : verdict === 'HATED_IT'
        ? 'Human +1 (I was right)'
        : 'Active Conflict (Objection logged)';

    const shareData = {
      title: 'The Algorithm Knows Best',
      text: `Today's assignment: "${assignment.title}".\nRuling: ${verdictName}.\n"${retort}"\n\nExperience calculated friction:`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share
      }
    } else {
      // Clipboard fallback
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Ignore clipboard errors
      }
    }
  };

  const getTone = () => {
    if (verdict === 'WAS_WRONG') return 'primary';
    if (verdict === 'HATED_IT') return 'secondary';
    return 'warning';
  };

  const getVerdictLabel = () => {
    if (verdict === 'WAS_WRONG') return 'Algorithm Won';
    if (verdict === 'HATED_IT') return 'Human Won';
    return 'Objection Logged';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stamp & Category */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <Badge tone={getTone() as any}>
            {getVerdictLabel()}
          </Badge>
          {isPractice && (
            <span className="rounded bg-info-soft px-1.5 py-0.5 text-[10px] text-info uppercase font-bold font-mono">
              Unranked
            </span>
          )}
        </div>
        <span className="text-xs font-mono text-fg-muted">
          {assignment.categoryDisplay}
        </span>
      </div>

      {/* Sarcastic Quip */}
      <div>
        <div className="text-[11px] font-mono uppercase tracking-wider text-fg-muted mb-2">
          Official Algorithmic Verdict:
        </div>
        <blockquote className="font-serif italic text-2xl font-normal leading-snug sm:text-3xl text-fg">
          &ldquo;{retort}&rdquo;
        </blockquote>
        <div className="mt-3 text-xs font-mono text-fg-muted">
          Task: {assignment.title}
        </div>
      </div>

      {/* Share & Record Actions */}
      <div className="flex flex-wrap gap-2.5 pt-2">
        <Button
          variant="primary"
          onClick={handleShare}
          className="flex-1 sm:flex-none gap-2"
          id="btn-share-result"
        >
          {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Share Ruling'}</span>
        </Button>

        <Button
          variant="secondary"
          onClick={onOpenRecord}
          className="gap-2"
          id="btn-view-record"
        >
          <BookOpen className="h-4 w-4" />
          <span>View Record</span>
        </Button>
      </div>

      {/* Next drop countdown & Extra practice mode */}
      <div className="rounded-[12px] border border-border bg-surface-sunken/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <div className="font-medium text-fg">Next Daily Drop</div>
          <div className="font-mono text-fg-muted tabular-nums mt-0.5">
            Arrives in <span className="font-semibold text-fg">{timeUntilTomorrow}</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onStartUnranked}
          className="h-8 text-xs gap-1.5"
          id="btn-unranked-round"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Play Unranked Round</span>
        </Button>
      </div>
    </div>
  );
};
