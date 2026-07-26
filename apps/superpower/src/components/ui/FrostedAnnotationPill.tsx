import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface FrostedAnnotationPillProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  dotColor?: string;
  showDot?: boolean;
  className?: string;
}

export default function FrostedAnnotationPill({ 
  children, 
  dotColor = 'bg-accent-lime', 
  showDot = true,
  className = '',
  ...props
}: FrostedAnnotationPillProps) {
  return (
    <motion.div 
      {...props}
      className={clsx(
        "bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-full px-4 py-2 flex items-center gap-2 w-fit",
        className
      )}
    >
      {showDot && <div className={clsx("w-2 h-2 rounded-full shrink-0", dotColor)}></div>}
      <span className="text-text-primary text-sm font-semibold whitespace-nowrap">{children}</span>
    </motion.div>
  );
}
