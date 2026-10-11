import React from 'react';
import { BookOpen, Sun, Moon, Flame } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Barcode } from './TechGraphics';

interface TopBarProps {
  streakDays: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenRecord: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  streakDays,
  isDark,
  onToggleTheme,
  onOpenRecord,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-strong bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand Wordmark (Clean, Bold, High Readability) */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong bg-primary text-on-primary font-mono text-xs font-black tracking-tighter">
              stölç
            </span>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight leading-none text-fg sm:text-xl">
                The Algorithm
              </span>
              <span className="font-mono text-xs tracking-normal text-fg-muted mt-0.5">
                Knows Best <span className="text-signal-red font-bold">/ 2026</span>
              </span>
            </div>
          </div>

          {/* Barcode Graphic (Decorative, subtle) */}
          <div className="hidden lg:flex items-center pl-4 border-l border-border">
            <Barcode code="ALGO.99-SPEC" showCode={false} className="opacity-40" />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Streak Indicator (High-Contrast, Clear Readability) */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-flex items-center gap-1.5 rounded-sm border border-border-strong bg-surface-sunken px-3 py-1.5 text-xs font-mono font-bold text-fg select-none hover:border-signal-red transition-colors">
                  <Flame className="h-3.5 w-3.5 text-signal-red fill-signal-red" />
                  <span className="text-fg-muted font-normal text-[11px]">Streak:</span>
                  <span className="text-fg font-black tabular-nums">{streakDays}d</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="font-mono text-xs">
                <span>{streakDays} consecutive evaluation cycles completed</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Record Trigger Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenRecord}
            className="text-xs font-mono font-bold tracking-tight gap-1.5 h-9 px-3.5 border-border-strong rounded-sm hover:bg-primary hover:text-on-primary"
            id="btn-open-record"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Record</span>
          </Button>

          {/* Theme Toggle Button */}
          <Button
            variant="secondary"
            size="icon"
            onClick={onToggleTheme}
            className="h-9 w-9 rounded-sm border-border-strong text-fg hover:bg-primary hover:text-on-primary"
            aria-label="Toggle color theme"
            id="btn-toggle-theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
};
