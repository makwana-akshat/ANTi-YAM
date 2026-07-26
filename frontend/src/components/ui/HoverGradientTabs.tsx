import React from 'react';

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

export function HoverGradientTabs({ tabs, activeTab, onTabChange }: HoverGradientTabsProps): React.JSX.Element {
  return (
    <div className="w-full pb-6 border-b border-gray-200">
      <nav className="flex space-x-8">
        {tabs.map((item) => {
          const isActive = activeTab === item.label;
          
          return (
            <button
              key={item.label}
              onClick={() => onTabChange(item.label)}
              className={`flex items-center gap-2 pb-4 -mb-[25px] border-b-2 transition-colors text-base font-medium ${
                isActive 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className={isActive ? 'text-blue-500' : 'text-gray-400'}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
