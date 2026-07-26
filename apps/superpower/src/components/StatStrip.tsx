
import DotMatrixNumber from './ui/DotMatrixNumber';
import clsx from 'clsx';

interface StatItemProps {
  value: number;
  label: string;
  badgeType: 'lime' | 'neutral';
}

function StatItem({ value, label, badgeType }: StatItemProps) {
  return (
    <div className="flex items-start gap-2">
      <DotMatrixNumber value={value} dotSize={3.5} gap={2} className="text-text-primary mt-1" />
      <div 
        className={clsx(
          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
          badgeType === 'lime' 
            ? "bg-accent-lime text-accent-lime-text" 
            : "bg-surface text-text-secondary border border-border-hairline"
        )}
      >
        {label}
      </div>
    </div>
  );
}

export default function StatStrip() {
  return (
    <div className="flex flex-wrap items-center gap-12 lg:gap-16">
      <StatItem value={106} label="Total" badgeType="lime" />
      <StatItem value={80} label="Optimal" badgeType="neutral" />
      <StatItem value={21} label="In range" badgeType="neutral" />
      <StatItem value={5} label="Out of range" badgeType="neutral" />
    </div>
  );
}
