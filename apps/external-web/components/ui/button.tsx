import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90',
      secondary: 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-slate-300',
      outline: 'border border-[var(--border)] bg-white hover:bg-slate-50',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex min-h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60',
          variants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
