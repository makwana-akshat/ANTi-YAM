import DotMatrixNumber from './ui/DotMatrixNumber';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export interface HeroGradientCardProps {
  colorRamp: 'green' | 'orange' | 'pink' | 'red' | 'amber' | 'blue';
  title?: string;
  value?: number | string;
  subtext?: string;
  decoration?: 'chart' | 'ruler' | 'none';
  className?: string;
  children?: React.ReactNode;
}

const COLOR_RAMPS: Record<HeroGradientCardProps['colorRamp'], string> = {
  green: 'radial-gradient(circle at 10% 10%, #EAB887 0%, transparent 40%), radial-gradient(circle at 90% 90%, #297B34 0%, transparent 50%), linear-gradient(145deg, #8FC753 0%, #4EA942 50%, #308F3C 100%)',
  orange: 'radial-gradient(circle at 10% 10%, #AEC0CE 0%, transparent 35%), radial-gradient(circle at 90% 10%, #E3ACAC 0%, transparent 35%), radial-gradient(circle at 80% 90%, #CC572A 0%, transparent 50%), linear-gradient(160deg, #F5A65E 0%, #E77A38 50%, #D8612A 100%)',
  pink: 'radial-gradient(circle at 10% 10%, #FDE4EC 0%, transparent 35%), radial-gradient(circle at 90% 10%, #F06292 0%, transparent 35%), radial-gradient(circle at 80% 90%, #C2185B 0%, transparent 50%), linear-gradient(160deg, #FF80AB 0%, #F50057 50%, #880E4F 100%)',
  red: 'radial-gradient(circle at 10% 10%, #FFCDD2 0%, transparent 35%), radial-gradient(circle at 90% 10%, #E57373 0%, transparent 35%), radial-gradient(circle at 80% 90%, #D32F2F 0%, transparent 50%), linear-gradient(160deg, #FF5252 0%, #F44336 50%, #B71C1C 100%)',
  amber: 'radial-gradient(circle at 10% 10%, #FFF3E0 0%, transparent 35%), radial-gradient(circle at 90% 10%, #FFB74D 0%, transparent 35%), radial-gradient(circle at 80% 90%, #F57C00 0%, transparent 50%), linear-gradient(160deg, #FFD740 0%, #FF9800 50%, #E65100 100%)',
  blue: 'radial-gradient(circle at 10% 10%, #E3F2FD 0%, transparent 35%), radial-gradient(circle at 90% 10%, #64B5F6 0%, transparent 35%), radial-gradient(circle at 80% 90%, #1976D2 0%, transparent 50%), linear-gradient(160deg, #448AFF 0%, #2196F3 50%, #0D47A1 100%)',
};

function DotMatrixChart() {
  const columns = [
    2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2,
    4, 5, 3, 3, 2, 3, 2, 2,
    1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1
  ];

  return (
    <div className="absolute bottom-10 left-8 right-8 flex items-end justify-start gap-1.5 pointer-events-none opacity-80 z-0">
      {columns.map((count, i) => (
        <div key={i} className="flex flex-col-reverse gap-1">
          {Array.from({ length: count }).map((_, j) => (
            <div 
              key={j} 
              className={clsx(
                "w-1 h-1 rounded-full",
                j === count - 1 ? "bg-white opacity-100" : "bg-white opacity-40"
              )} 
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function TickRuler() {
  return (
    <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between pointer-events-none opacity-80 z-0">
      {Array.from({ length: 45 }).map((_, i) => {
        const isCenter = i === 15;
        return (
          <div
            key={i}
            className={clsx(
              "rounded-full",
              isCenter ? "bg-white opacity-100 w-[2px] h-8" : "bg-white/30 w-px h-4"
            )}
          />
        );
      })}
    </div>
  );
}

export default function HeroGradientCard({ colorRamp, title, value, subtext, decoration = 'none', className = '', children }: HeroGradientCardProps) {
  
  return (
    <motion.div 
      whileHover={{ scale: 1.01, rotateX: 2, rotateY: -2 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 150 }}
      className={clsx("relative rounded-[36px] overflow-hidden flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] transform-gpu perspective-[1000px]", className)}
      style={{ background: COLOR_RAMPS[colorRamp], minHeight: '340px' }}
    >
      {/* Soft blurred radial glow overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent scale-150 -translate-x-1/4 translate-y-1/4 blur-3xl opacity-60 pointer-events-none mix-blend-overlay" />

      {/* Title positioned absolutely to the card itself */}
      {title && (
        <div className="absolute top-8 left-0 right-0 text-center text-white/90 font-medium text-[16px] tracking-wide z-20">
          {title}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center p-8">
        {value !== undefined && (
          <div className="flex flex-col items-center justify-center w-full">
            <DotMatrixNumber 
              value={value} 
              dotSize={10} 
              gap={6} 
              color="#FFFFFF" 
              inactiveColor="rgba(255,255,255,0.15)"
              className="mb-6"
            />
            {subtext && (
              <div className="text-white/95 font-medium text-[18px] tracking-wide">
                {subtext}
              </div>
            )}
          </div>
        )}

        {children}
      </div>

      {/* Decorations */}
      {decoration === 'chart' && <DotMatrixChart />}
      {decoration === 'ruler' && <TickRuler />}
    </motion.div>
  );
}
