import React from 'react';

export interface ShuffleProps {
  text: string;
  className?: string;
  tag?: string;
  style?: React.CSSProperties;
  // All other animation props are ignored but kept in type signature so existing usages don't break
  duration?: number;
  maxDelay?: number;
  ease?: string;
  triggerOnce?: boolean;
  scrollTriggerStart?: string;
  shuffleDirection?: 'up' | 'down' | 'left' | 'right';
  shuffleTimes?: number;
  animationMode?: 'random' | 'evenodd';
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
  onShuffleComplete?: () => void;
}

export const Shuffle: React.FC<ShuffleProps> = ({
  text,
  className = '',
  tag = 'h1',
  style = {}
}) => {
  const Tag = tag as keyof JSX.IntrinsicElements;
  return (
    <Tag 
      className={`font-['Press_Start_2P'] uppercase text-3xl md:text-4xl font-bold leading-tight tracking-tight ${className}`} 
      style={style}
    >
      {text}
    </Tag>
  );
};
