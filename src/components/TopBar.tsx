import React from 'react';
import { Flame, BookOpen, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

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
    <header className="sticky top-0 z-40 w-full border-b border-border bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4 sm:px-6">
        {/* Brand Wordmark */}
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-primary text-on-primary text-xs font-mono font-bold">
            ◆
          </span>
          <span className="font-serif text-lg tracking-tight font-medium sm:text-xl text-fg">
            The Algorithm <span className="text-fg-muted font-sans text-xs italic tracking-normal ml-1">Knows Best</span>
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak indicator */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-warning-soft px-2.5 py-1 text-xs font-mono font-bold text-warning border border-warning/20 select-none">
                  <Flame className="h-3.5 w-3.5 fill-current" />
                  <span>{streakDays}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <span>{streakDays} consecutive days evaluated</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Record Drawer trigger */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenRecord}
            className="text-xs font-medium gap-1.5 h-8 px-2.5"
            id="btn-open-record"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Record</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="h-8 w-8 text-fg-muted hover:text-fg"
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
