import { useState } from 'react';
import type { CategoryType } from '../../App';
import { motion, AnimatePresence } from 'framer-motion';
import RadialSpiderChart from '../RadialSpiderChart';

export default function RadialBalanceView({ category }: { category: CategoryType }) {
  const [viewMode, setViewMode] = useState<'standard' | 'detailed'>('standard');
  const [hoveredPoint, setHoveredPoint] = useState<{label: string, val: number} | null>(null);
  
  // Base factors
  const standardFactors = [
    { label: 'Vitamin D', val: 85 },
    { label: 'Magnesium', val: 92 },
    { label: 'Zinc', val: 78 },
    { label: 'Omega-3', val: 65 },
    { label: 'B12', val: 95 }
  ];

  // Detailed factors (split into more granularity)
  const detailedFactors = [
    { label: 'Vitamin D3', val: 85 },
    { label: 'Calcium', val: 90 },
    { label: 'Magnesium', val: 92 },
    { label: 'Potassium', val: 75 },
    { label: 'Zinc', val: 78 },
    { label: 'Iron', val: 82 },
    { label: 'Omega-3', val: 65 },
    { label: 'Omega-6', val: 55 },
    { label: 'B12', val: 95 },
    { label: 'Folate', val: 88 }
  ];

  const factors = viewMode === 'standard' ? standardFactors : detailedFactors;

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pt-4 pb-20">
      <header className="text-center mb-8 flex flex-col items-center">
        <h1 className="text-[40px] font-medium tracking-tight text-text-primary capitalize">{category} Balance</h1>
        <p className="text-text-secondary text-lg mt-2 mb-6">A holistic view of your body's equilibrium.</p>
        
        {/* Toggle standard vs detailed */}
        <div className="flex bg-surface-muted p-1 rounded-full border border-border-hairline/30 w-fit">
          <button 
            onClick={() => setViewMode('standard')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              viewMode === 'standard' ? 'bg-surface text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-primary'
            }`}
          >
            Core Vectors
          </button>
          <button 
            onClick={() => setViewMode('detailed')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              viewMode === 'detailed' ? 'bg-surface text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-primary'
            }`}
          >
            Detailed Matrix
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row items-center justify-center gap-16 bg-surface rounded-[40px] p-12 border border-border-hairline/20 shadow-sm relative overflow-hidden">
        
        {/* Decorative background glow based on hover */}
        <motion.div 
          className="absolute inset-0 bg-accent-lime/5 blur-[100px] pointer-events-none"
          animate={{ opacity: hoveredPoint ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Radial Spider Chart */}
        <div className="relative shrink-0 z-10 flex items-center justify-center min-w-[340px] min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ rotate: -90, opacity: 0, scale: 0.9 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <RadialSpiderChart 
                data={factors} 
                size={340} 
                onHover={setHoveredPoint} 
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Center Score Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <motion.div 
               className="w-20 h-20 rounded-full bg-canvas/80 backdrop-blur-md shadow-lg flex items-center justify-center border border-border-hairline/20 z-10"
               animate={{ scale: hoveredPoint ? 1.1 : 1 }}
             >
               <AnimatePresence mode="wait">
                 <motion.span 
                   key={hoveredPoint ? hoveredPoint.val : '83'}
                   initial={{ opacity: 0, y: 5 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -5 }}
                   className="text-xl font-bold tracking-tighter"
                 >
                   {hoveredPoint ? `${hoveredPoint.val}%` : '83%'}
                 </motion.span>
               </AnimatePresence>
             </motion.div>
          </div>
        </div>

        {/* Legend / Metrics List */}
        <div className="flex flex-col gap-4 w-full max-w-[280px] z-10">
          <AnimatePresence mode="popLayout">
            {factors.map((f, i) => {
              const isHovered = hoveredPoint?.label === f.label;
              return (
                <motion.div 
                  layout
                  key={f.label} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex justify-between items-center group cursor-default p-2 rounded-xl transition-colors ${isHovered ? 'bg-surface-muted/50' : ''}`}
                  onMouseEnter={() => setHoveredPoint(f)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <span className={`font-medium transition-colors ${isHovered ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {f.label}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-surface-muted rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-accent-lime" 
                        initial={{ width: 0 }}
                        animate={{ width: `${f.val}%` }}
                        transition={{ duration: 1, delay: i * 0.05 }}
                      />
                    </div>
                    <span className={`text-xs font-bold w-6 text-right ${isHovered ? 'text-text-primary' : 'text-text-tertiary'}`}>
                      {f.val}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
