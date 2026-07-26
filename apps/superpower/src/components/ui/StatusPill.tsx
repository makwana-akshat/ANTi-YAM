import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export type StatusPillColor = 'green' | 'amber' | 'red' | 'gray' | 'blue';

interface StatusPillProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  color?: StatusPillColor;
  className?: string;
}

const COLOR_MAP: Record<StatusPillColor, string> = {
  green: 'bg-green-500/10 text-green-700 border-green-500/20',
  amber: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
  red: 'bg-red-500/10 text-red-700 border-red-500/20',
  gray: 'bg-surface-muted text-text-tertiary border-border-hairline/50',
  blue: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
};

export default function StatusPill({ 
  children, 
  color = 'gray', 
  className = '',
  ...props
}: StatusPillProps) {
  return (
    <motion.div 
      {...props}
      className={clsx(
        "px-3 py-1 rounded-full text-xs font-bold border flex items-center justify-center w-fit whitespace-nowrap",
        COLOR_MAP[color],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
