
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface RangeRulerProps {
  position: number; // 0 to 1, where the marker should be on the ruler
  barsCount?: number;
  activeColor?: string;
  inactiveColor?: string;
  activeHeight?: number;
  inactiveHeight?: number;
  className?: string;
}

export default function RangeRuler({ 
  position, 
  barsCount = 20, 
  activeColor = 'bg-text-primary', 
  inactiveColor = 'bg-border-hairline',
  activeHeight = 16,
  inactiveHeight = 6,
  className = '' 
}: RangeRulerProps) {
  const activeIndex = Math.floor(Math.max(0, Math.min(position, 1)) * (barsCount - 1));

  return (
    <div className={clsx("flex items-end justify-between pointer-events-none w-full", className)}>
      {Array.from({ length: barsCount }).map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <motion.div
            key={i}
            initial={false}
            animate={{ 
              height: isActive ? activeHeight : inactiveHeight,
              opacity: isActive ? 1 : 0.5
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={clsx(
              "w-[2px] rounded-full",
              isActive ? activeColor : inactiveColor
            )}
          />
        );
      })}
    </div>
  );
}
