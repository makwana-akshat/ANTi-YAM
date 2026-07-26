import React from 'react';
import { Link } from 'react-router-dom';

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

export const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  textColor = '#ffffff',
  bgColor = '#111111',
  borderColor = '#333333',
}) => {
  return (
    <div className="w-full h-full overflow-y-auto" style={{ backgroundColor: bgColor }}>
      <nav className="flex flex-col m-0 p-0 h-full relative z-10 w-full max-w-4xl mx-auto px-4 py-8">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="w-full flex items-center justify-between py-6 md:py-8 group transition-colors duration-300 hover:bg-white/5 px-6 rounded-2xl"
            style={{ borderBottom: `1px solid ${borderColor}` }}
          >
            <Link
              className="flex items-center gap-6 font-semibold text-2xl md:text-4xl no-underline uppercase"
              to={item.link.replace('#', '/')}
              style={{ color: textColor }}
            >
              <div 
                className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-cover bg-center shrink-0 shadow-lg"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              {item.text}
            </Link>
            
            <div className="hidden md:flex text-white/30 group-hover:text-white/80 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};
