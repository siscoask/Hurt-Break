import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
  onClick
}) => {
  const iconDimensions = {
    sm: { w: 26, h: 26 },
    md: { w: 34, h: 34 },
    lg: { w: 44, h: 44 }
  }[size];

  const textClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={e => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label="HurtBreak Home"
    >
      {/* Broken-heart icon subtly incorporating 'H' in the central negative split */}
      <svg
        width={iconDimensions.w}
        height={iconDimensions.h}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Left Heart Lobe & Stem of H */}
        <path
          d="M 16 32 C 12 28 4 21 4 13 C 4 7 8 3 13 3 C 15 3 16.5 4 17 5.2 V 32 Z"
          fill="currentColor"
          className="text-[#FF4F70] dark:text-[#FF4F70] opacity-90"
        />
        {/* Right Heart Lobe & Stem of H with subtle geometric fracture */}
        <path
          d="M 20 32 C 24 28 32 21 32 13 C 32 7 28 3 23 3 C 21 3 19.5 4 19 5.2 V 32 Z"
          fill="currentColor"
          className="text-[#FF7890] dark:text-[#E03B60] opacity-95"
        />
        {/* Fracture cut line creating the central crossbar and 'H' negative space */}
        <line
          x1="18"
          y1="2"
          x2="18"
          y2="33"
          stroke="var(--bg-main, #0B090B)"
          strokeWidth="2.4"
        />
        {/* The 'H' crossbar bridging the fracture */}
        <rect
          x="12.5"
          y="15.5"
          width="11"
          height="3"
          rx="1"
          fill="var(--bg-main, #0B090B)"
        />
        <line
          x1="13.5"
          y1="17"
          x2="22.5"
          y2="17"
          stroke="#FF4F70"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>

      {showWordmark && (
        <div className="flex flex-col tracking-tight">
          <span className={`font-serif font-medium tracking-tight leading-none text-[#F7E9ED] dark:text-[#F7E9ED] light:text-[#2B0D16] ${textClasses}`} style={{ color: 'var(--text-primary)' }}>
            Hurt<span className="text-[#FF4F70]">Break</span>
          </span>
        </div>
      )}
    </div>
  );
};
