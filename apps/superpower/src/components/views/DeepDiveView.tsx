import { useState } from 'react';
import type { CategoryType } from '../../App';
import { mockHeartData, mockMetabolicData } from '../../data/mockData';
import HeroGradientCard from '../HeroGradientCard';
import InteractiveSVGChart from '../InteractiveSVGChart';
import BiomarkerCard from '../BiomarkerCard';

export default function DeepDiveView({ category }: { category: CategoryType }) {
  const isHeart = category === 'heart';
  const nudge = isHeart ? mockHeartData.nudge : mockMetabolicData.nudge;
  
  // Transform mock data into datasets format
  const rawData = isHeart ? mockHeartData.bloodPressure : mockMetabolicData.glucoseLevels;
  const dataSets = {
    '7d': rawData.map((d: any, _i: number) => ({ label: d.day || d.time, value: 80 + Math.random() * 20 })),
    '30d': Array.from({length: 30}).map((_, _i) => ({ label: `Day ${_i+1}`, value: 70 + Math.random() * 30 })),
    '90d': Array.from({length: 90}).map((_, _i) => ({ label: `Day ${_i+1}`, value: 65 + Math.random() * 40 })),
  };

  const [activeRange, setActiveRange] = useState('7d');

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pt-4 pb-32">
      {/* Hero */}
      <HeroGradientCard 
        colorRamp={isHeart ? 'red' : 'blue'} 
        decoration="chart"
        title={`${category.charAt(0).toUpperCase() + category.slice(1)} Deep Dive`}
        value={isHeart ? 72 : 85}
        subtext={isHeart ? 'Heart Health Score' : 'Metabolic Score'}
      />

      {/* AI Nudge Card */}
      <div className={`p-6 rounded-[24px] border border-border-hairline/40 flex gap-4 items-start ${
        nudge.type === 'warning' ? 'bg-orange-500/5' : 'bg-surface'
      }`}>
        <div className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center shrink-0">
          🤖
        </div>
        <div>
          <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-1">AI Observation</h3>
          <p className="text-text-primary font-medium leading-relaxed">{nudge.message}</p>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="bg-surface rounded-[32px] p-8 pb-16 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-border-hairline/20">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-xl font-bold">{isHeart ? 'Blood Pressure Trends' : 'Glucose Response'}</h2>
          
          <div className="flex bg-surface-muted p-1 rounded-full border border-border-hairline/30">
            {['7d', '30d', '90d'].map(range => (
              <button 
                key={range}
                onClick={() => setActiveRange(range)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  activeRange === range ? 'bg-surface text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        <InteractiveSVGChart 
          dataSets={dataSets} 
          activeRange={activeRange} 
          color={isHeart ? 'var(--color-status-red)' : 'var(--color-status-blue)'}
        />
      </div>

      {/* Related Biomarkers */}
      <div>
        <h3 className="text-lg font-bold mb-4 ml-2">Related Biomarkers</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden">
          <BiomarkerCard type={isHeart ? 'heart' : 'blood'} category="Resting HR" value={62} unit="bpm" label="Optimal" position={0.2} />
          <BiomarkerCard type={isHeart ? 'blood' : 'nutrients'} category="Triglycerides" value={110} unit="mg/dL" label="In Range" position={0.4} />
          <BiomarkerCard type="activity" category="Activity" value={45} unit="min" label="Daily Avg" position={0.8} />
        </div>
      </div>
    </div>
  );
}
