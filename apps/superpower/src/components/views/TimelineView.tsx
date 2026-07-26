import { useRef } from 'react';
import type { CategoryType } from '../../App';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Shield, Sparkles } from 'lucide-react';
import FrostedAnnotationPill from '../ui/FrostedAnnotationPill';

function TimelineItem({ evt, isLatest }: { evt: any, isLatest: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll position of this specific item relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // When item is in center of viewport (0.3 to 0.7), it is sharp and full size.
  // When it moves towards edges, it scales down, fades slightly, and blurs.
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.85]);
  const filter = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, scale, filter }}
      className="relative z-10"
    >
      {/* Rotated Diamond Dot */}
      <div className="absolute top-6 -left-[45px] md:-left-[61px] w-10 h-10 flex items-center justify-center z-20">
         {/* Background diamond */}
         <div className="absolute inset-0 bg-surface border border-border-hairline/40 rounded-[10px] rotate-45 shadow-sm"></div>
         {/* Icon */}
         <div className="relative z-10">{evt.icon}</div>
      </div>
      
      {/* Content */}
      <div className="bg-surface/80 backdrop-blur-md rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-border-hairline/30 hover:border-text-tertiary transition-colors group">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-bold tracking-wider uppercase text-text-tertiary group-hover:text-text-primary transition-colors">{evt.date}</span>
          {isLatest && (
            <div className="-mt-2 -mr-2">
              <FrostedAnnotationPill dotColor="bg-accent-lime">
                Latest Update
              </FrostedAnnotationPill>
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-3 leading-tight">{evt.title}</h3>
        <p className="text-text-secondary leading-relaxed text-lg">{evt.desc}</p>
      </div>
    </motion.div>
  );
}

export default function TimelineView({ category }: { category: CategoryType }) {
  
  // Generating a long list of mock events so the scrolling effect is visible
  const events = [
    { date: 'Today, 9:00 AM', title: 'New biomarker data synced', desc: 'Oura ring reported improved HRV overnight.', icon: <Activity className="w-5 h-5 text-blue-500" /> },
    { date: 'Yesterday', title: 'Immune protocol completed', desc: 'You logged 100% adherence to your weekly supplement stack.', icon: <Shield className="w-5 h-5 text-green-500" /> },
    { date: 'Oct 12', title: 'Longevity milestone', desc: 'Biological age reduced by 0.2 years based on new blood panel.', icon: <Sparkles className="w-5 h-5 text-purple-500" /> },
    { date: 'Oct 05', title: 'Sleep debt recovered', desc: 'Consistent 8+ hours of sleep for 7 consecutive days.', icon: <Activity className="w-5 h-5 text-indigo-500" /> },
    { date: 'Sep 28', title: 'Cardio fitness peak', desc: 'VO2 Max increased to optimal levels for your age bracket.', icon: <Activity className="w-5 h-5 text-red-500" /> },
    { date: 'Sep 15', title: 'Microbiome diversity up', desc: 'Gut health analysis shows a 15% increase in beneficial flora.', icon: <Sparkles className="w-5 h-5 text-green-600" /> },
    { date: 'Sep 02', title: 'Stress markers down', desc: 'Cortisol levels normalized after completing the restorative protocol.', icon: <Shield className="w-5 h-5 text-orange-500" /> },
  ];

  return (
    <div className="flex flex-col gap-16 max-w-3xl mx-auto w-full pt-4 pb-32">
      <header className="text-center">
        <h1 className="text-[48px] font-medium tracking-tight text-text-primary capitalize mb-2">{category} History</h1>
        <p className="text-text-secondary text-lg">Chronological events and systemic changes over time.</p>
      </header>

      <div className="relative ml-4 md:ml-12 pl-8 md:pl-12 flex flex-col gap-16">
        {/* Continuous Line with gradient fade at bottom */}
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-border-hairline/50 via-border-hairline to-transparent" />

        {events.map((evt, i) => (
          <TimelineItem key={i} evt={evt} isLatest={i === 0} />
        ))}
      </div>
    </div>
  );
}
