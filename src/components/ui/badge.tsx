import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors uppercase font-mono',
  {
    variants: {
      tone: {
        neutral: 'bg-surface-sunken text-fg-muted border border-border',
        primary: 'bg-primary-soft text-primary border border-primary/20',
        secondary: 'bg-secondary-soft text-secondary border border-secondary/20',
        success: 'bg-success-soft text-success border border-success/20',
        warning: 'bg-warning-soft text-warning border border-warning/20',
        danger: 'bg-danger-soft text-danger border border-danger/20',
        info: 'bg-info-soft text-info border border-info/20',
      },
    },
    defaultVariants: {
      tone: 'neutral',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
