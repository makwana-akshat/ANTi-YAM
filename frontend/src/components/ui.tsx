import type { HTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Card
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-[var(--color-bg-card)] rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)]", className)}
      {...props}
    />
  );
}

// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus:ring-[var(--color-primary)]",
    outline: "border border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-slate-50 focus:ring-slate-200",
    ghost: "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-slate-50",
  };
  
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props} />
  );
}

// Badge
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
}
export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
  
  const variants = {
    default: "bg-slate-100 text-slate-800",
    success: "bg-[var(--color-status-good-bg)] text-[var(--color-status-good)]",
    warning: "bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning)]",
    error: "bg-red-100 text-red-800",
  };

  return <span className={cn(baseStyles, variants[variant], className)} {...props} />;
}

// Skeleton
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200", className)}
      {...props}
    />
  );
}

// StatusPill
interface StatusPillProps {
  status: 'Good' | 'Normal' | 'On Track' | 'Warning' | 'Upcoming';
}
export function StatusPill({ status }: StatusPillProps) {
  let colorClass = '';
  
  switch (status) {
    case 'Good':
    case 'Normal':
    case 'On Track':
    case 'Upcoming':
      colorClass = 'text-[var(--color-status-good)]';
      break;
    case 'Warning':
      colorClass = 'text-[var(--color-status-warning)]';
      break;
    default:
      colorClass = 'text-[var(--color-text-muted)]';
  }

  return (
    <div className={cn("flex items-center text-sm font-medium", colorClass)}>
      <div className={cn("w-2 h-2 rounded-full mr-2", status === 'Warning' ? 'bg-[var(--color-status-warning)]' : 'bg-[var(--color-status-good)]')} />
      {status}
    </div>
  );
}
