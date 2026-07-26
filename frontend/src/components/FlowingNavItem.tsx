import React, { useRef, useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

const animationDefaults = {
  duration: 0.4,
  ease: 'power3.out',
};

export const FlowingNavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, onClick }) => {
  const itemRef = useRef<HTMLAnchorElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  
  const [repetitions, setRepetitions] = useState<number>(4);
  const animation = useRef<gsap.core.Tween | null>(null);

  const calculateRepetitions = useCallback(() => {
    if (!marqueeInnerRef.current) return;
    const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
    if (!marqueeContent) return;
    
    const contentWidth = marqueeContent.offsetWidth || 1;
    // Sidebar width is 256px (w-64)
    const needed = Math.ceil(300 / contentWidth) + 2; 
    setRepetitions(Math.max(4, needed));
  }, []);

  useLayoutEffect(() => {
    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => {
      window.removeEventListener('resize', calculateRepetitions);
      animation.current?.kill();
    };
  }, [calculateRepetitions]);

  useEffect(() => {
    if (repetitions > 0 && marqueeInnerRef.current) {
      const marqueeInner = marqueeInnerRef.current;
      const marqueeContent = marqueeInner.querySelector('.marquee-part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      animation.current?.kill();
      gsap.set(marqueeInner, { x: 0 });
      animation.current = gsap.to(marqueeInner, {
        x: -contentWidth,
        duration: 4,
        ease: 'none',
        repeat: -1,
      });
    }
  }, [repetitions]);

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <NavLink 
      to={to} 
      ref={itemRef}
      className={({ isActive }) => `
        relative flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors overflow-hidden group
        ${isActive 
          ? 'bg-blue-50 text-[var(--color-primary)]' 
          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'}
      `}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon size={20} className="mr-3 relative z-10 transition-opacity duration-200 group-hover:opacity-0" />
      <span className="relative z-10 transition-opacity duration-200 group-hover:opacity-0">{label}</span>

      {/* Marquee Overlay */}
      <div 
        ref={marqueeRef}
        className="absolute top-0 left-0 w-full h-full bg-[var(--color-primary)] text-white pointer-events-none translate-y-[101%] flex items-center z-20 rounded-lg overflow-hidden"
      >
        <div ref={marqueeInnerRef} className="flex h-full w-fit items-center">
          {Array.from({ length: repetitions }).map((_, i) => (
            <div key={i} className="flex items-center shrink-0 h-full marquee-part">
              <span className="font-bold uppercase whitespace-nowrap tracking-wider px-1 text-sm">
                {label}
              </span>
              <span className="px-2 opacity-60">•</span>
            </div>
          ))}
        </div>
      </div>
    </NavLink>
  );
};
