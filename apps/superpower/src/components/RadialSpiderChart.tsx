import { useState } from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  val: number; // 0 to 100
}

interface RadialSpiderChartProps {
  data: DataPoint[];
  size?: number;
  color?: string;
  onHover?: (point: DataPoint | null) => void;
}

export default function RadialSpiderChart({ data, size = 300, color = 'var(--color-accent-lime)', onHover }: RadialSpiderChartProps) {
  const center = size / 2;
  const radius = (size / 2) - 40; // leaving room for labels
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Generate points for the radar shape
  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI / 2) + (2 * Math.PI * index) / data.length; // Start from top
    const r = (value / 100) * radius;
    // Note: SVG y-axis is inverted
    return {
      x: center + r * Math.cos(angle),
      y: center - r * Math.sin(angle)
    };
  };

  const points = data.map((d, i) => getCoordinates(d.val, i));
  const pathData = points.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ') + ' Z';

  // Base background web rings
  const webRings = [0.25, 0.5, 0.75, 1];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Background web */}
        {webRings.map((ring, idx) => (
          <circle 
            key={idx}
            cx={center} 
            cy={center} 
            r={radius * ring} 
            fill="none" 
            stroke="var(--color-border-hairline)" 
            strokeWidth="1" 
            opacity={0.3}
          />
        ))}

        {/* Axes */}
        {data.map((_, i) => {
          const end = getCoordinates(100, i);
          return (
            <line 
              key={`axis-${i}`}
              x1={center} 
              y1={center} 
              x2={end.x} 
              y2={end.y} 
              stroke="var(--color-border-hairline)" 
              strokeWidth="1" 
              opacity={0.3}
            />
          );
        })}

        {/* Radar Area */}
        <motion.path
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          d={pathData}
          fill={color}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />
        
        {/* Radar Line */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Points and Labels */}
        {data.map((d, i) => {
          const p = getCoordinates(d.val, i);
          const isHovered = hoveredIdx === i;
          
          return (
            <g 
              key={`point-${i}`}
              onMouseEnter={() => { setHoveredIdx(i); onHover?.(d); }}
              onMouseLeave={() => { setHoveredIdx(null); onHover?.(null); }}
              className="cursor-pointer"
            >
              {/* Invisible larger hover target */}
              <circle cx={p.x} cy={p.y} r={20} fill="transparent" />
              
              <motion.circle 
                cx={p.x} 
                cy={p.y} 
                r={5} 
                fill={isHovered ? 'var(--color-surface)' : color}
                stroke={color}
                strokeWidth={isHovered ? 3 : 0}
                animate={{ scale: isHovered ? 1.5 : 1 }}
              />
            </g>
          );
        })}
      </svg>

      {/* HTML Labels positioned around */}
      {data.map((d, i) => {
        const labelPos = getCoordinates(115, i); // push labels out further
        const isHovered = hoveredIdx === i;
        
        return (
          <motion.div
            key={`label-${i}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center"
            style={{ left: labelPos.x, top: labelPos.y }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
          >
            <span className={`text-xs font-semibold whitespace-nowrap transition-colors ${isHovered ? 'text-text-primary' : 'text-text-tertiary'}`}>
              {d.label}
            </span>
            {isHovered && (
              <motion.span 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] font-bold bg-surface border border-border-hairline shadow-sm px-2 py-0.5 rounded-full mt-1"
                style={{ color }}
              >
                {d.val}%
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
