import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import FrostedAnnotationPill from './ui/FrostedAnnotationPill';
import RangeRuler from './ui/RangeRuler';

interface DataPoint {
  label: string;
  value: number;
}

interface InteractiveSVGChartProps {
  dataSets: Record<string, DataPoint[]>; // e.g. { '7d': [...], '30d': [...] }
  activeRange: string;
  color?: string;
}

export default function InteractiveSVGChart({ dataSets, activeRange, color = 'var(--color-accent-lime)' }: InteractiveSVGChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  const controls = useAnimation();
  
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [hoverData, setHoverData] = useState<DataPoint | null>(null);

  const [width, setWidth] = useState(1000);
  const height = 300;
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Handle resize loosely
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(entries => {
      setWidth(entries[0].contentRect.width);
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const activeData = dataSets[activeRange] || [];
  
  // Scales
  const xScale = useMemo(() => {
    return d3Scale.scaleLinear()
      .domain([0, Math.max(1, activeData.length - 1)])
      .range([0, width]);
  }, [activeData, width]);

  const yScale = useMemo(() => {
    const minVal = Math.min(...activeData.map(d => d.value));
    const maxVal = Math.max(...activeData.map(d => d.value));
    // add padding
    const padding = (maxVal - minVal) * 0.2 || 10;
    return d3Scale.scaleLinear()
      .domain([minVal - padding, maxVal + padding])
      .range([height, 0]);
  }, [activeData]);

  // Path generators
  const lineGen = d3Shape.line<DataPoint>()
    .x((_: any, i: number) => xScale(i))
    .y((d: DataPoint) => yScale(d.value))
    .curve(d3Shape.curveMonotoneX);

  const areaGen = d3Shape.area<DataPoint>()
    .x((_: any, i: number) => xScale(i))
    .y0(height)
    .y1((d: DataPoint) => yScale(d.value))
    .curve(d3Shape.curveMonotoneX);

  const currentLinePath = lineGen(activeData) || "";
  const currentAreaPath = areaGen(activeData) || "";

  // For flubber morphing, we ideally want to transition paths.
  // We'll use a simplified framer-motion path interpolation which works decent for simple lines.
  // Flubber is better for complex shapes, but framer-motion handles same-length or generic svg paths natively quite well now.
  // Actually, we imported flubber, let's use it for the area if needed, but framer-motion's native `d` animation is often enough.
  // Let's use Framer Motion's built-in path tweening for simplicity unless it breaks.

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    
    // Find closest data point
    const i = Math.round(xScale.invert(xPos));
    const clampedI = Math.max(0, Math.min(activeData.length - 1, i));
    
    setHoverX(xScale(clampedI));
    setHoverData(activeData[clampedI]);
  };

  const handlePointerLeave = () => {
    setHoverX(null);
    setHoverData(null);
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-64 relative touch-none select-none"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
        {/* Grid lines */}
        <path d={`M0 ${height*0.25} h${width} M0 ${height*0.5} h${width} M0 ${height*0.75} h${width}`} stroke="currentColor" className="text-border-hairline/30" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        
        {/* Gradient Def */}
        <defs>
          <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area */}
        <motion.path 
          animate={{ d: currentAreaPath }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          fill="url(#area-gradient)" 
          className="opacity-50"
        />
        
        {/* Line */}
        <motion.path 
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { 
              pathLength: 1, 
              opacity: 1, 
              transition: { duration: 1.5, ease: "easeOut" } 
            }
          }}
          style={{ d: currentLinePath }} // Use style for framer-motion pathLength to work nicely with d changes? No, let's just animate d
          stroke={color} 
          strokeWidth="4" 
          fill="none" 
          strokeLinecap="round" 
        />
        <motion.path 
          animate={{ d: currentLinePath }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          stroke={color} 
          strokeWidth="4" 
          fill="none" 
          strokeLinecap="round" 
        />

        {/* Hover Guide Line */}
        {hoverX !== null && (
          <motion.line
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x1: hoverX, x2: hoverX }}
            y1={0}
            y2={height}
            stroke="var(--color-text-tertiary)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="pointer-events-none"
          />
        )}
        
        {/* Hover Point */}
        {hoverX !== null && hoverData && (
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1, cx: hoverX, cy: yScale(hoverData.value) }}
            r={6}
            fill={color}
            stroke="var(--color-surface)"
            strokeWidth={3}
            className="pointer-events-none"
          />
        )}
      </svg>

      {/* Scrub Tooltip */}
      {hoverX !== null && hoverData && (
        <motion.div
          className="absolute top-0 pointer-events-none z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, x: hoverX - 50, y: -40 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
        >
          <FrostedAnnotationPill dotColor={`bg-[${color}]`}>
            {hoverData.label}: {hoverData.value}
          </FrostedAnnotationPill>
        </motion.div>
      )}
      
      {/* X Axis Labels (simple overlay below) */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-sm font-medium text-text-tertiary px-2">
        <span>{activeData[0]?.label}</span>
        <span>{activeData[activeData.length - 1]?.label}</span>
      </div>
      
      {/* Range Ruler below */}
      <div className="absolute -bottom-16 left-0 right-0">
        <RangeRuler 
          position={hoverX !== null ? hoverX / width : 1} 
          barsCount={40} 
          activeHeight={12}
          inactiveHeight={6}
        />
      </div>
    </div>
  );
}
