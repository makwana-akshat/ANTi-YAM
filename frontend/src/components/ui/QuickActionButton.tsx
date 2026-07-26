import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
  iconColor?: string;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({ 
  icon: Icon, 
  label, 
  onClick,
  className = '',
  iconColor = 'currentColor'
}) => {
  return (
    <>
      <style>{`
        .qa-button {
          all: unset;
          cursor: pointer;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          position: relative;
          border-radius: 100em;
          background-color: rgba(240, 245, 250, 1);
          box-shadow:
            -0.15em -0.15em 0.15em -0.075em rgba(255, 255, 255, 0.9),
            0.0375em 0.0375em 0.0675em 0 rgba(0, 0, 0, 0.05);
          display: inline-block;
        }

        .qa-button::after {
          content: "";
          position: absolute;
          z-index: 0;
          width: calc(100% + 0.3em);
          height: calc(100% + 0.3em);
          top: -0.15em;
          left: -0.15em;
          border-radius: inherit;
          background: linear-gradient(
            -135deg,
            rgba(0, 0, 0, 0.05),
            transparent 20%,
            transparent 100%
          );
          filter: blur(0.0125em);
          opacity: 0.5;
        }

        .qa-button .qa-button-outer {
          position: relative;
          z-index: 1;
          border-radius: inherit;
          transition: box-shadow 300ms ease;
          will-change: box-shadow;
          box-shadow:
            0 0.05em 0.05em -0.01em rgba(0, 0, 0, 0.1),
            0 0.01em 0.01em -0.01em rgba(0, 0, 0, 0.05),
            0.15em 0.3em 0.1em -0.01em rgba(0, 0, 0, 0.05);
        }

        .qa-button:hover .qa-button-outer {
          box-shadow:
            0 0 0 0 rgba(0, 0, 0, 0.1),
            0 0 0 0 rgba(0, 0, 0, 0.05),
            0 0 0 0 rgba(0, 0, 0, 0.05);
        }

        .qa-button .qa-button-inner {
          --inset: 0.035em;
          position: relative;
          z-index: 1;
          border-radius: inherit;
          padding: 0.6em 1.2em;
          display: flex;
          align-items: center;
          gap: 0.5em;
          background-image: linear-gradient(
            135deg,
            rgba(255, 255, 255, 1),
            rgba(240, 240, 240, 1)
          );
          transition:
            box-shadow 300ms ease,
            clip-path 250ms ease,
            background-image 250ms ease,
            transform 250ms ease;
          will-change: box-shadow, clip-path, background-image, transform;
          overflow: clip;
          clip-path: inset(0 0 0 0 round 100em);
          box-shadow:
            0 0 0 0 inset rgba(0, 0, 0, 0.05),
            -0.05em -0.05em 0.05em 0 inset rgba(0, 0, 0, 0.05),
            0 0 0 0 inset rgba(0, 0, 0, 0.05),
            0 0 0.05em 0.2em inset rgba(255, 255, 255, 1),
            0.025em 0.05em 0.1em 0 inset rgba(255, 255, 255, 1),
            0.12em 0.12em 0.12em inset rgba(255, 255, 255, 1),
            -0.075em -0.25em 0.25em 0.1em inset rgba(0, 0, 0, 0.05);
        }

        .qa-button:hover .qa-button-inner {
          clip-path: inset(
            clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px)
              clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px) round 100em
          );
          box-shadow:
            0.1em 0.15em 0.05em 0 inset rgba(0, 0, 0, 0.05),
            -0.025em -0.03em 0.05em 0.025em inset rgba(0, 0, 0, 0.05),
            0.25em 0.25em 0.2em 0 inset rgba(0, 0, 0, 0.05),
            0 0 0.05em 0.5em inset rgba(255, 255, 255, 1),
            0 0 0 0 inset rgba(255, 255, 255, 1),
            0.12em 0.12em 0.12em inset rgba(255, 255, 255, 1),
            -0.075em -0.12em 0.2em 0.1em inset rgba(0, 0, 0, 0.05);
        }

        .qa-button .qa-button-inner span, .qa-button .qa-button-inner svg {
          position: relative;
          z-index: 4;
          font-weight: 600;
          color: rgba(71, 85, 105, 1); /* text-slate-600 */
          transition: transform 250ms ease;
          display: block;
          will-change: transform;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .qa-button:hover .qa-button-inner span, .qa-button:hover .qa-button-inner svg {
          transform: scale(0.975);
        }

        .qa-button:active .qa-button-inner {
          transform: scale(0.975);
        }
      `}</style>
      <button className={`qa-button ${className}`} onClick={onClick}>
        <div className="qa-button-outer">
          <div className="qa-button-inner">
            <Icon size={16} color={iconColor !== 'currentColor' ? iconColor : undefined} className={iconColor === 'currentColor' ? 'text-slate-600' : ''} />
            <span style={iconColor !== 'currentColor' ? { color: iconColor } : {}}>{label}</span>
          </div>
        </div>
      </button>
    </>
  );
};
