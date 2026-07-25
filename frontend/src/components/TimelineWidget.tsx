
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function TimelineWidget() {
  // Mock data for dots: array of status (green, red, blue, orange, gray) and spacing
  const dots = Array.from({ length: 40 }).map((_, i) => {
    const isDivider = i % 10 === 0;
    const statusRand = Math.random();
    let colorClass = 'bg-border-hairline'; // default gray
    
    if (!isDivider) {
      if (statusRand > 0.9) colorClass = 'bg-status-red';
      else if (statusRand > 0.8) colorClass = 'bg-status-orange';
      else if (statusRand > 0.7) colorClass = 'bg-status-blue';
      else if (statusRand > 0.4) colorClass = 'bg-status-green';
    }

    return {
      id: i,
      isDivider,
      colorClass,
      yOffset: isDivider ? 0 : (Math.random() - 0.5) * 16, // random scatter vertical offset
      size: isDivider ? 0 : Math.random() > 0.5 ? 6 : 4,
    };
  });

  return (
    <div className="relative w-full h-32 flex items-center justify-center my-6">
      
      {/* Track Base */}
      <div className="absolute inset-x-0 h-16 bg-surface-muted/50 rounded-full flex items-center justify-between px-8 border border-border-hairline/50">
        <span className="text-xs text-text-tertiary font-medium">April</span>
        <span className="text-xs text-text-tertiary font-medium">June</span>
      </div>

      {/* Dots Scatter */}
      <div className="absolute inset-x-16 h-full flex items-center justify-between px-4">
        {dots.map((dot) => (
          <div key={dot.id} className="relative flex flex-col items-center justify-center h-full w-2">
            {dot.isDivider ? (
              <div className="h-4 w-px bg-text-tertiary/30" />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: dot.id * 0.02, duration: 0.3 }}
                className={clsx('rounded-full shadow-sm', dot.colorClass)}
                style={{
                  width: dot.size,
                  height: dot.size,
                  transform: `translateY(${dot.yOffset}px)`,
                  opacity: dot.colorClass === 'bg-border-hairline' ? 0.4 : 0.8
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Floating Trend Pill */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
        className="absolute z-10 bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-full px-5 py-3 flex items-center gap-4"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-text-primary font-semibold text-sm">
            <TrendingUp className="w-4 h-4" />
            Health Improving
          </div>
          <div className="text-[10px] text-text-tertiary font-medium ml-5.5">+3.2 last 30 days</div>
        </div>
        
        {/* Tiny decorative bar chart */}
        <div className="flex items-end gap-0.5 h-6">
          <div className="w-1 h-2 bg-gradient-to-t from-status-orange to-status-red rounded-full opacity-60"></div>
          <div className="w-1 h-3 bg-gradient-to-t from-status-orange to-status-red rounded-full opacity-80"></div>
          <div className="w-1 h-4 bg-gradient-to-t from-gradient-heat-start to-status-orange rounded-full"></div>
          <div className="w-1 h-6 bg-gradient-to-t from-gradient-green-end to-gradient-green-start rounded-full"></div>
        </div>
      </motion.div>

    </div>
  );
}
