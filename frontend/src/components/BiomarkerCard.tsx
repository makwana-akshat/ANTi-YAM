
import DotMatrixNumber from './ui/DotMatrixNumber';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Heart, Activity, Apple, Droplets } from 'lucide-react';

export type BiomarkerType = 'heart' | 'nutrients' | 'blood' | 'activity';

interface BiomarkerCardProps {
  type: BiomarkerType;
  category: string;
  value: number | string;
  unit: string;
  label: string;
  position: number; // 0 to 1, where the marker should be on the ruler
}

function getIcon(type: BiomarkerType) {
  switch (type) {
    case 'heart': return <Heart className="w-4 h-4 text-text-primary" />;
    case 'nutrients': return <Apple className="w-4 h-4 text-text-primary" />;
    case 'blood': return <Droplets className="w-4 h-4 text-text-primary" />;
    case 'activity': return <Activity className="w-4 h-4 text-text-primary" />;
    default: return <Activity className="w-4 h-4 text-text-primary" />;
  }
}

function MiniTickRuler({ position }: { position: number }) {
  const barsCount = 20;
  const activeIndex = Math.floor(position * barsCount);

  return (
    <div className="absolute bottom-6 left-0 right-0 flex items-end justify-between px-6 pointer-events-none">
      {Array.from({ length: barsCount }).map((_, i) => {
        const isActive = i === activeIndex;
        // make it wave-like or just straight
        const height = isActive ? 16 : 6;
        return (
          <div
            key={i}
            className={clsx(
              "w-[2px] rounded-full",
              isActive ? "bg-text-primary h-4" : "bg-border-hairline"
            )}
            style={{ height }}
          />
        );
      })}
    </div>
  );
}

export default function BiomarkerCard({ type, category, value, unit, label, position }: BiomarkerCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative w-[200px] shrink-0 h-[260px] bg-surface rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col cursor-pointer border border-border-hairline/30 snap-start"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-surface-muted flex items-center justify-center">
          {getIcon(type)}
        </div>
        <span className="text-text-secondary text-sm font-medium">{category}</span>
      </div>

      <div className="flex flex-col mt-auto mb-10">
        <div className="flex items-baseline gap-1.5 mb-1">
          <DotMatrixNumber 
            value={value} 
            dotSize={2.5} 
            gap={1.5} 
            color="#16171A" 
            inactiveColor="#F1F1EF"
          />
          <span className="text-text-secondary text-xs font-medium">{unit}</span>
        </div>
        <div className="text-text-tertiary text-xs">{label}</div>
      </div>

      <MiniTickRuler position={position} />
    </motion.div>
  );
}
