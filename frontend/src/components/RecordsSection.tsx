
import { useState, useEffect } from 'react';
import { Plus, X, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DotMatrixNumber from './ui/DotMatrixNumber';

export function DocumentCard() {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processed'>('idle');
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-advance upload to processed
  useEffect(() => {
    if (uploadState === 'uploading') {
      const timer = setTimeout(() => {
        setUploadState('processed');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [uploadState]);

  const handleCardClick = () => {
    if (uploadState === 'idle') setUploadState('uploading');
    if (uploadState === 'processed') setIsExpanded(true);
  };

  return (
    <>
      <motion.div 
        layoutId="document-card-container"
        onClick={handleCardClick}
        whileHover={{ scale: uploadState === 'idle' ? 1.01 : 1 }}
        className="bg-surface rounded-[40px] p-8 h-full min-h-[300px] flex flex-col relative shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden cursor-pointer z-10"
      >
        <div className="flex justify-between items-start z-20">
          <h3 className="text-text-primary text-[22px] font-semibold leading-[1.2]">
            {uploadState === 'idle' && <>Upload<br/>Health<br/>Records</>}
            {uploadState === 'uploading' && <>Processing<br/>Document...</>}
            {uploadState === 'processed' && <>Recent<br/>Upload</>}
          </h3>
          <div className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center text-text-primary shrink-0 transition-colors hover:bg-border-hairline">
            {uploadState === 'processed' ? <FileText className="w-5 h-5" /> : <Plus className="w-5 h-5" strokeWidth={1.5} />}
          </div>
        </div>
        
        {/* State Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-12">
          <AnimatePresence mode="wait">
            {uploadState === 'idle' && (
              <motion.div 
                key="idle"
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                className="relative w-full h-[220px]"
              >
                {/* Back document */}
                <div className="absolute top-10 left-10 w-32 h-48 bg-white border border-border-hairline rounded-[20px] shadow-sm -rotate-6 flex flex-col p-4 opacity-80">
                   <div className="h-1 bg-border-hairline w-12 mb-3 rounded-full"></div>
                   <div className="h-1 bg-border-hairline w-full mb-2 rounded-full"></div>
                   <div className="h-1 bg-border-hairline w-5/6 rounded-full"></div>
                </div>
                {/* Front document */}
                <div className="absolute top-4 left-24 w-36 h-56 bg-white border border-border-hairline rounded-[20px] shadow-md rotate-3 flex flex-col p-5">
                   <div className="h-2.5 w-16 bg-text-tertiary/40 rounded-full mx-auto mb-5"></div>
                   <div className="h-1 bg-border-hairline w-full mb-3 rounded-full"></div>
                   <div className="h-1 bg-border-hairline w-11/12 mb-3 rounded-full"></div>
                   <div className="h-1 bg-border-hairline w-4/5 mb-3 rounded-full"></div>
                   <div className="h-1 bg-border-hairline w-full mb-3 rounded-full"></div>
                </div>
              </motion.div>
            )}

            {uploadState === 'uploading' && (
              <motion.div key="uploading" className="relative w-full h-[220px]">
                {/* Particles */}
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: 100 + Math.random() * 40 - 20, 
                      y: 100 + Math.random() * 40 - 20, 
                      opacity: 1, 
                      scale: 1 
                    }}
                    animate={{ 
                      x: 100 + (Math.random() - 0.5) * 300, 
                      y: 100 + (Math.random() - 0.5) * 300, 
                      opacity: [1, 1, 0], 
                      scale: [1, 1.5, 0] 
                    }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: Math.random() * 0.2 }}
                    className="absolute w-3 h-3 bg-text-tertiary rounded-sm"
                  />
                ))}
              </motion.div>
            )}

            {uploadState === 'processed' && (
              <motion.div 
                key="processed"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full h-[220px] flex items-center justify-center"
              >
                <div className="w-48 h-64 bg-white border border-border-hairline rounded-[20px] shadow-lg flex flex-col p-5">
                  <div className="flex items-center gap-2 mb-4 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase tracking-wide">Processed</span>
                  </div>
                  <div className="text-text-primary font-medium text-sm mb-1">Blood_Panel_2026.pdf</div>
                  <div className="text-text-tertiary text-xs mb-4">Extracted 24 biomarkers</div>
                  <div className="space-y-2 mt-auto">
                    <div className="h-1 bg-border-hairline w-full rounded-full"></div>
                    <div className="h-1 bg-border-hairline w-5/6 rounded-full"></div>
                    <div className="h-1 bg-border-hairline w-4/5 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Expanded Detail Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-auto"
          >
            <motion.div 
              className="absolute inset-0 bg-canvas/80 backdrop-blur-sm -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />
            
            <motion.div 
              layoutId="document-card-container"
              className="bg-surface w-full max-w-4xl h-[80vh] rounded-[40px] shadow-2xl p-10 flex flex-col relative overflow-hidden"
            >
              <button 
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-surface-muted flex items-center justify-center hover:bg-border-hairline transition-colors"
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-[32px] font-bold text-text-primary leading-tight">Blood_Panel_2026.pdf</h2>
                  <p className="text-text-secondary text-lg">Successfully processed and integrated.</p>
                </div>
              </div>

              <div className="flex-1 bg-surface-muted rounded-[24px] p-8 overflow-y-auto">
                <h3 className="font-bold text-text-tertiary uppercase tracking-wider mb-6">Extracted Data</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Total Cholesterol', val: '185 mg/dL', stat: 'Optimal' },
                    { label: 'HDL', val: '65 mg/dL', stat: 'Optimal' },
                    { label: 'LDL', val: '100 mg/dL', stat: 'In Range' },
                    { label: 'Triglycerides', val: '98 mg/dL', stat: 'Optimal' },
                    { label: 'Vitamin D', val: '42 ng/mL', stat: 'Optimal' },
                    { label: 'B12', val: '520 pg/mL', stat: 'In Range' },
                  ].map((d, i) => (
                    <div key={i} className="bg-surface p-4 rounded-[16px] border border-border-hairline shadow-sm flex justify-between items-center">
                      <div>
                        <div className="text-text-tertiary text-xs font-semibold uppercase">{d.label}</div>
                        <div className="text-text-primary font-bold text-lg">{d.val}</div>
                      </div>
                      <span className="text-xs font-bold text-green-700 bg-green-500/10 px-3 py-1 rounded-full">{d.stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function DeviceConnectionCard() {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="bg-gradient-to-br from-gradient-pink-start to-gradient-pink-end rounded-[40px] p-8 h-full min-h-[300px] flex flex-col relative shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent scale-150 -translate-x-1/4 translate-y-1/4 blur-3xl opacity-60" />
      
      <div className="flex justify-between items-start z-10 gap-4 flex-wrap">
        <h3 className="text-white text-[22px] font-semibold leading-tight min-w-[120px]">Oura Ring<br/>Connected</h3>
        <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-sm font-bold gap-2 shrink-0">
          <div className="w-2 h-2 rounded-full bg-accent-lime shadow-[0_0_8px_var(--color-accent-lime)] animate-pulse" />
          Live Sync
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-8">
        <div className="relative flex items-center justify-center">
          {/* Concentric rings */}
          <div className="absolute w-40 h-40 rounded-full border border-white/20" />
          <div className="absolute w-32 h-32 rounded-full border border-white/30" />
          <div className="absolute w-24 h-24 rounded-full border border-white/40" />
          <div className="absolute w-16 h-16 rounded-full bg-gradient-pink-end/80 flex items-center justify-center shadow-lg border border-white/50">
            <div className="w-4 h-4 rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* Decorative Signal arcs bottom left */}
      <div className="absolute bottom-6 left-8 flex flex-col gap-2 opacity-50 pointer-events-none">
        <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
          <path d="M10 10 Q 30 -5 50 10" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <path d="M15 15 Q 30 5 45 15" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M25 18 Q 30 14 35 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="mt-auto relative z-10 text-white/90">
        <div className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">Last Synced</div>
        <div className="flex items-baseline gap-2">
          <DotMatrixNumber value="14:32" dotSize={3} gap={2} color="#FFFFFF" inactiveColor="rgba(255,255,255,0.2)" />
        </div>
      </div>
    </motion.div>
  );
}

export function PendingResultsCard() {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="bg-surface rounded-[40px] p-8 h-full min-h-[300px] flex flex-col relative shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden cursor-pointer border border-border-hairline/30"
    >
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-status-orange/20 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="flex justify-between items-start z-10 mb-6">
        <h3 className="text-text-primary text-xl font-medium">Your results are pending</h3>
        <button className="w-8 h-8 rounded-full bg-surface shadow-sm border border-border-hairline/50 flex items-center justify-center text-text-tertiary hover:bg-surface-muted transition-colors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      
      <div className="flex justify-between items-end z-10 h-full">
        <div className="flex flex-col justify-end h-full">
          <div className="flex items-baseline gap-2 mb-8">
             <div className="text-[56px] leading-none font-light tracking-tighter text-text-primary">7-10</div>
             <span className="text-text-tertiary text-sm font-medium">Days</span>
          </div>

          <div className="flex items-center mb-6">
            <div className="w-4 h-4 rounded-full bg-accent-lime z-10" />
            <div className="h-px bg-border-hairline w-24" />
            <div className="w-5 h-5 rounded-full border-2 border-border-hairline flex items-center justify-center z-10 bg-surface">
              <div className="w-1.5 h-1.5 rounded-full bg-border-hairline" />
            </div>
            <div className="flex gap-1 ml-2">
              <div className="w-1 h-1 rounded-full bg-border-hairline" />
              <div className="w-1.5 h-1.5 rounded-full bg-border-hairline" />
            </div>
          </div>
          
          <p className="text-text-tertiary text-sm max-w-[200px] leading-snug">
            Until then your lab draw data is processed.
          </p>
        </div>

        {/* Small vial illustration placeholder */}
        <div className="w-32 h-32 bg-surface-muted rounded-full flex items-center justify-center shadow-inner relative -mr-4 -mb-4 shrink-0">
           <div className="w-6 h-20 bg-white rounded-full shadow-sm border border-border-hairline rotate-12 relative overflow-hidden flex flex-col">
             <div className="h-4 bg-status-orange w-full"></div>
             <div className="flex-1 w-full flex items-center justify-center text-[6px] font-bold text-text-tertiary -rotate-90">Anti•YAM</div>
           </div>
        </div>
      </div>

    </motion.div>
  );
}

export default function RecordsSection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[340px]">
        <DocumentCard />
        <DeviceConnectionCard />
      </div>
      <PendingResultsCard />
    </div>
  );
}
