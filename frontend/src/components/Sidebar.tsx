import { Sparkles, Heart, Activity, Droplet, Apple, FolderOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import type { TabType, CategoryType } from '../App';

const TAB_URLS: Record<string, string> = {
  Data: '/',
  Records: '/records',
  Triage: '/triage'
};

const CATEGORIES: { id: CategoryType; label: string; icon: any; badge: string | null; badgeType: string }[] = [
  { id: 'longevity', label: 'Longevity Markers', icon: Sparkles, badge: '25 yrs', badgeType: 'neutral' },
  { id: 'heart', label: 'Heart Health', icon: Heart, badge: '72/100', badgeType: 'neutral' },
  { id: 'thyroid', label: 'Thyroid Health', icon: Activity, badge: null, badgeType: 'neutral' },
  { id: 'immune', label: 'Immune Regulation', icon: Activity, badge: null, badgeType: 'neutral' },
  { id: 'hormone', label: 'Hormone Health', icon: Activity, badge: 'Balanced', badgeType: 'neutral' },
  { id: 'metabolic', label: 'Metabolic Health', icon: Droplet, badge: '78/100', badgeType: 'neutral' },
  { id: 'nutrients', label: 'Nutrients', icon: Apple, badge: null, badgeType: 'neutral' },
  { id: 'blood', label: 'Blood', icon: Droplet, badge: 'Normal', badgeType: 'neutral' },
];

export default function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  let activeTab: string;
  if (path.startsWith('/records')) activeTab = 'Records';
  else if (path.startsWith('/triage')) activeTab = 'Triage';
  else activeTab = 'Data';

  const activeCategory = path === '/' ? 'overview' : (path.startsWith('/category/') ? path.split('/')[2] : null);
  return (
    <aside className="w-[320px] shrink-0 p-8 flex flex-col gap-8 sticky top-0 h-screen overflow-y-auto hidden lg:flex border-r border-border-hairline/20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Brand */}
      <div className="text-xl tracking-[0.1em] mb-2 font-medium flex items-center">
        Anti<span className="text-accent-lime opacity-80 mx-[2px] text-lg leading-none">•</span>YAM
      </div>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-[32px] font-medium tracking-tight">
        {(['Data', 'Records', 'Triage'] as TabType[]).map((tab) => (
          <Link 
            key={tab}
            to={TAB_URLS[tab]}
            className={clsx(
              "transition-all duration-300 focus:outline-none outline-none", 
              activeTab === tab 
                ? 'text-text-primary' 
                : 'text-transparent [-webkit-text-stroke:1px_var(--color-text-tertiary)] hover:text-text-tertiary/10 hover:[-webkit-text-stroke:1px_var(--color-text-primary)]'
            )}
          >
            {tab}
          </Link>
        ))}
      </div>
      
      {/* Categories */}
      <div className="flex flex-col gap-2 flex-1">
        {/* All Data Overview */}
        <Link 
          to="/"
          className={clsx(
            "w-full flex items-center gap-3 px-5 py-4 rounded-full transition-all text-left group shrink-0 relative mb-4",
            activeCategory === 'overview' && activeTab === 'Data'
              ? "text-text-primary"
              : "hover:bg-surface/60 text-text-tertiary"
          )}
        >
          {activeCategory === 'overview' && activeTab === 'Data' && (
            <motion.div
              layoutId="sidebar-active-pill"
              className="absolute inset-0 bg-surface shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border-hairline/30 rounded-full z-0"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <FolderOpen className={clsx("w-5 h-5 relative z-10", activeCategory === 'overview' && activeTab === 'Data' ? "text-text-primary" : "text-text-tertiary group-hover:text-text-primary")} />
          <span className={clsx("text-sm font-medium flex-1 relative z-10", activeCategory === 'overview' && activeTab === 'Data' ? "text-text-primary" : "text-text-tertiary group-hover:text-text-primary")}>
            All Data Overview
          </span>
        </Link>

        <div className="h-px bg-border-hairline/30 w-full mb-4" />

        {CATEGORIES.map(cat => (
          <Link 
            key={cat.id}
            to={`/category/${cat.id}`}
            className={clsx(
              "w-full flex items-center gap-3 px-5 py-4 rounded-full transition-all text-left group shrink-0 relative",
              activeCategory === cat.id && activeTab === 'Data'
                ? "text-text-primary"
                : "hover:bg-surface/60 text-text-tertiary"
            )}
          >
            {activeCategory === cat.id && activeTab === 'Data' && (
              <motion.div
                layoutId="sidebar-active-pill"
                className="absolute inset-0 bg-surface shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border-hairline/30 rounded-full z-0"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <cat.icon className={clsx("w-5 h-5 relative z-10", activeCategory === cat.id && activeTab === 'Data' ? "text-text-primary" : "text-text-tertiary group-hover:text-text-primary")} />
            <span className={clsx("text-sm font-medium flex-1 relative z-10", activeCategory === cat.id && activeTab === 'Data' ? "text-text-primary" : "text-text-tertiary group-hover:text-text-primary")}>
              {cat.label}
            </span>
            {cat.badge && (
              <span className={clsx(
                "px-3 py-1 rounded-full text-xs font-semibold transition-colors relative z-10",
                activeCategory === cat.id && activeTab === 'Data' 
                  ? "bg-surface-muted text-text-primary" 
                  : "bg-transparent text-text-tertiary group-hover:bg-surface-muted"
              )}>
                {cat.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </aside>
  );
}
