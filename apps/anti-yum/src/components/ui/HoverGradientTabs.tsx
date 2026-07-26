'use client'
import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export interface HoverGradientTabItem {
  icon: React.ReactNode;
  label: string;
  gradient: string;
  iconColor: string;
}

interface HoverGradientTabsProps {
  tabs: HoverGradientTabItem[];
  activeTab: string;
  onTabChange: (tabLabel: string) => void;
}

// Animation variants
const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export function HoverGradientTabs({ tabs, activeTab, onTabChange }: HoverGradientTabsProps): React.JSX.Element {
  return (
    <div className="w-full pb-4">
      <motion.nav
        className="w-full md:w-fit px-2 md:px-4 py-2 md:py-3 rounded-xl md:rounded-2xl 
        bg-white/90 dark:bg-black/80 backdrop-blur-lg 
        border border-gray-200/80 dark:border-gray-800/80 
        shadow-sm relative"
        initial="initial"
        whileHover="hover"
      >
        <ul className="flex items-center justify-around md:justify-center gap-1 md:gap-3 relative z-10">
          {tabs.map((item) => {
            const isActive = activeTab === item.label;
            
            return (
              <motion.li key={item.label} className="relative flex-1 md:flex-none">
                <motion.div
                  className="block rounded-xl md:rounded-2xl overflow-visible group relative cursor-pointer"
                  style={{ perspective: "600px" }}
                  whileHover="hover"
                  initial="initial"
                  onClick={() => onTabChange(item.label)}
                >
                  {/* Per-item glow */}
                  <motion.div
                    className="absolute inset-0 z-0 pointer-events-none rounded-xl md:rounded-2xl"
                    variants={glowVariants}
                    style={{
                      background: item.gradient,
                      opacity: 0,
                    }}
                  />
                  {/* Front-facing */}
                  <motion.div
                    className={`flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 
                    px-2 py-1.5 md:px-4 md:py-2 relative z-10 transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm
                    ${isActive 
                      ? 'bg-slate-100 dark:bg-slate-800 text-gray-900 dark:text-white font-semibold' 
                      : 'bg-transparent text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                    }`}
                    variants={itemVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center bottom"
                    }}
                  >
                    <span className={`transition-colors duration-300 ${isActive ? item.iconColor.replace('group-hover:', '') : item.iconColor}`}>
                      {item.icon}
                    </span>
                    <span className="hidden md:inline">{item.label}</span>
                  </motion.div>
                  {/* Back-facing */}
                  <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 
                    px-2 py-1.5 md:px-4 md:py-2 absolute inset-0 z-10 
                    bg-transparent text-gray-900 dark:text-white 
                    transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm"
                    variants={backVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top",
                      transform: "rotateX(90deg)"
                    }}
                  >
                    <span className={`transition-colors duration-300 ${item.iconColor.replace('group-hover:', '')}`}>
                      {item.icon}
                    </span>
                    <span className="hidden md:inline font-medium">{item.label}</span>
                  </motion.div>
                </motion.div>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>
    </div>
  );
}
