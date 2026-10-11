import React from 'react';
import { BookOpen, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Crosshair, Barcode, Starburst } from './TechGraphics';

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
    <header className="sticky top-0 z-40 w-full border-b border-border-strong bg-surface/90 backdrop-blur-md">
      {/* Top micro metadata strip (Reference 1 style) */}
      <div className="hidden sm:flex border-b border-border text-[9px] font-mono tracking-widest text-fg-muted uppercase justify-between px-6 py-1 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Crosshair size={10} className="text-signal-red" />
            <span>SYS.ALGO // REV.2026.04</span>
          </span>
          <span className="text-border-strong">|</span>
          <span>HUMAN COGNITIVE PERTURBATION PROTOCOL</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-signal-pink flex items-center gap-1">
            <Starburst size={10} />
            <span>CALCULATED FRICTION ENGINE</span>
          </span>
          <span className="text-border-strong">|</span>
          <span className="font-semibold text-fg">STATUS: OPERATIONAL</span>
        </div>
      </div>

      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand Wordmark (Reference 1 & 2 inspired) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-[2px] border border-border-strong bg-primary text-on-primary font-mono text-xs font-black">
              stölç
            </span>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-tight leading-none text-fg uppercase sm:text-lg">
                The Algorithm
              </span>
              <span className="font-mono text-[9px] tracking-wider text-fg-muted uppercase mt-0.5">
                Knows Best <span className="text-signal-red font-bold">/ v2.0</span>
              </span>
            </div>
          </div>

          {/* Barcode Accent (Hidden on mobile) */}
          <div className="hidden md:flex items-center pl-4 border-l border-border">
            <Barcode code="ALGO.99-SPECIMEN" showCode={false} className="opacity-75" />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak indicator (Technical Counter) */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-flex items-center gap-1.5 rounded-[2px] border border-border-strong bg-surface-sunken px-2.5 py-1 text-xs font-mono font-bold text-fg select-none hover:border-signal-red transition-colors">
                  <span className="text-signal-red text-xs">▲</span>
                  <span className="text-[10px] tracking-wider text-fg-muted">STREAK:</span>
                  <span className="text-fg tabular-nums">{streakDays}D</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="font-mono text-xs">
                <span>{streakDays} consecutive evaluation cycles completed</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Record Drawer trigger */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenRecord}
            className="text-xs font-mono font-bold tracking-wider uppercase gap-1.5 h-8 px-3 border-border-strong rounded-[2px] hover:bg-primary hover:text-on-primary"
            id="btn-open-record"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Dossier</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="secondary"
            size="icon"
            onClick={onToggleTheme}
            className="h-8 w-8 rounded-[2px] border-border-strong text-fg hover:bg-primary hover:text-on-primary"
            aria-label="Toggle color theme"
            id="btn-toggle-theme"
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};
