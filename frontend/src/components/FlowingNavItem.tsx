import React from 'react';
import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export const FlowingNavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, onClick }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        relative flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
        ${isActive 
          ? 'bg-blue-50 text-[var(--color-primary)]' 
          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-slate-50'}
      `}
      onClick={onClick}
    >
      <Icon size={20} className="mr-3" />
      <span>{label}</span>
    </NavLink>
  );
};
