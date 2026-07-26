
import { Card, StatusPill } from './ui';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import type { MetricSummary } from '../api/types';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  data: MetricSummary;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  sparklineColor: string;
}

export function StatCard({ data, icon: Icon, iconColor, iconBg, sparklineColor }: StatCardProps) {
  return (
    <Card className="flex flex-col relative overflow-hidden">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: iconBg, color: iconColor }}>
          <Icon size={20} />
        </div>
        <div className="font-semibold text-sm">{data.label}</div>
      </div>
      
      <div className="flex items-baseline space-x-1 mb-4">
        <span className="text-3xl font-bold">{data.value}</span>
        <span className="text-sm text-[var(--color-text-muted)]">{data.unit}</span>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <StatusPill status={data.status} />
        
        {data.trend && data.trend.length > 0 && (
          <div className="w-20 h-8 opacity-70">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trend}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={sparklineColor} 
                  strokeWidth={2} 
                  dot={false} 
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Card>
  );
}
