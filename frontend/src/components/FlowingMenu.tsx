import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { gsap } from 'gsap';

export interface MenuItemData {
  link: string;
  text: string;
  image: string;
}

export interface FlowingMenuProps {
  items?: MenuItemData[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

const animationDefaults = {
  duration: 0.6,
  ease: 'expo',
};

export const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  speed = 15,
  textColor = '#ffffff',
  bgColor = '#111111',
  marqueeBgColor = '#ffffff',
  marqueeTextColor = '#111111',
  borderColor = '#ffffff',
}) => {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const marqueeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [repetitions, setRepetitions] = useState<number[]>([]);
  const animations = useRef<(gsap.core.Tween | null)[]>([]);

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const setupMarquees = useCallback(() => {
    items.forEach((_, idx) => {
      const marqueeInner = marqueeInnerRefs.current[idx];
      if (!marqueeInner) return;

      const marqueeContent = marqueeInner.querySelector('.marquee-part') as HTMLElement;
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      animations.current[idx]?.kill();
      gsap.set(marqueeInner, { x: 0 });

      animations.current[idx] = gsap.to(marqueeInner, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    });
  }, [items, speed]);

  const calculateRepetitions = useCallback(() => {
    const newRepetitions = items.map((_, idx) => {
      const marqueeInner = marqueeInnerRefs.current[idx];
      if (!marqueeInner) return 4;
      const marqueeContent = marqueeInner.querySelector('.marquee-part') as HTMLElement;
      if (!marqueeContent) return 4;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / (contentWidth || 1)) + 2;
      return Math.max(4, needed);
    });
    setRepetitions(newRepetitions);
  }, [items]);

  useLayoutEffect(() => {
    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => {
      window.removeEventListener('resize', calculateRepetitions);
      animations.current.forEach((animation) => animation?.kill());
    };
  }, [calculateRepetitions]);

  useEffect(() => {
    // Only setup marquees after repetitions state has been applied and rendered
    if (repetitions.length > 0) {
      setupMarquees();
    }
  }, [repetitions, setupMarquees]);

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>, idx: number) => {
    const itemRef = itemRefs.current[idx];
    const marqueeRef = marqueeRefs.current[idx];
    const marqueeInnerRef = marqueeInnerRefs.current[idx];

    if (!itemRef || !marqueeRef || !marqueeInnerRef) return;

    const rect = itemRef.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef, marqueeInnerRef], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>, idx: number) => {
    const itemRef = itemRefs.current[idx];
    const marqueeRef = marqueeRefs.current[idx];
    const marqueeInnerRef = marqueeInnerRefs.current[idx];

    if (!itemRef || !marqueeRef || !marqueeInnerRef) return;

    const rect = itemRef.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <div className="w-full h-full overflow-hidden" style={{ backgroundColor: bgColor }}>
      <nav className="flex flex-col m-0 p-0 h-full relative z-10">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative flex-1 overflow-hidden text-center"
            style={{ borderTop: idx === 0 ? 'none' : `1px solid ${borderColor}` }}
          >
            <a
              ref={(el) => {
                if (el) itemRefs.current[idx] = el;
              }}
              className="relative flex justify-center items-center h-full font-semibold text-[4vh] no-underline uppercase cursor-pointer"
              href={item.link}
              style={{ color: textColor }}
              onMouseEnter={(ev) => handleMouseEnter(ev, idx)}
              onMouseLeave={(ev) => handleMouseLeave(ev, idx)}
            >
              {item.text}
            </a>

            <div
              ref={(el) => {
                if (el) marqueeRefs.current[idx] = el;
              }}
              className="absolute top-0 left-0 w-full h-full overflow-hidden translate-y-[101%] pointer-events-none"
              style={{ backgroundColor: marqueeBgColor }}
            >
              <div
                ref={(el) => {
                  if (el) marqueeInnerRefs.current[idx] = el;
                }}
                className="flex w-fit h-full"
              >
                {Array.from({ length: repetitions[idx] || 4 }).map((_, i) => (
                  <div
                    key={`${idx}-${i}`}
                    className="flex items-center marquee-part shrink-0"
                  >
                    <span
                      className="px-[1vw] font-normal text-[4vh] uppercase leading-[1] whitespace-nowrap"
                      style={{ color: marqueeTextColor }}
                    >
                      {item.text}
                    </span>
                    <div
                      className="bg-cover bg-center mx-[2vw] my-[2em] py-[1em] rounded-[50px] w-[200px] h-[7vh]"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};
