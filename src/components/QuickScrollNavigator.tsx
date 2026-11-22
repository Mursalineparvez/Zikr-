import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { ThemeMode, ZikrLanguage, NavModule } from '../types';
import { soundHaptics } from '../utils/audioHaptics';

interface QuickScrollNavigatorProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  activeModule?: NavModule;
}

export const QuickScrollNavigator: React.FC<QuickScrollNavigatorProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  activeModule = 'zikir_counter',
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  const [scrollTop, setScrollTop] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const maxScroll = Math.max(1, fullHeight - windowHeight);

      const percent = Math.min(100, Math.max(0, Math.round((currentScroll / maxScroll) * 100)));
      setScrollTop(currentScroll);
      setScrollPercent(percent);

      const isScrollable = fullHeight > windowHeight + 40;
      const shouldShow = isScrollable || currentScroll > 30;
      setIsVisible(shouldShow);
      setIsNearBottom(currentScroll + windowHeight >= fullHeight - 120);

      setIsIdle(false);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 4000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  const handleScrollToTop = () => {
    if (soundEnabled) soundHaptics.playTap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToBottom = () => {
    if (soundEnabled) soundHaptics.playTap();
    const fullHeight = document.documentElement.scrollHeight;
    window.scrollTo({ top: fullHeight, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  // Position cleanly above bottom dock/floating button
  const positionClasses =
    activeModule === 'zikir_counter'
      ? 'bottom-32 right-2.5 sm:right-5'
      : 'bottom-20 right-2.5 sm:right-5';

  const circumference = 2 * Math.PI * 14; // r=14 for compact circle
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  const topTooltip = isBn ? 'একদম উপরে যান' : 'Scroll to Top';
  const bottomTooltip = isBn ? 'একদম নিচে যান' : 'Scroll to Bottom';

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        setIsIdle(false);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed ${positionClasses} z-[64] flex flex-col items-center transition-all duration-300 select-none ${
        isIdle && !isHovered ? 'opacity-40 hover:opacity-100 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ultra-Slim, Compact Vertical Pod */}
      <div
        className={`flex flex-col items-center p-1 rounded-2xl backdrop-blur-xl border shadow-xl transition-all duration-300 gap-1 ${
          isDay
            ? 'bg-white/95 border-emerald-600/30 shadow-emerald-950/15 text-slate-900'
            : 'bg-[#082228]/95 border-emerald-500/40 shadow-black/70 text-emerald-50'
        }`}
      >
        {/* 1. SCROLL TO TOP BUTTON (Compact w-8 h-8) */}
        <button
          type="button"
          onClick={handleScrollToTop}
          title={topTooltip}
          aria-label={topTooltip}
          className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 group ${
            scrollTop > 30
              ? isDay
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                : 'bg-teal-950/70 hover:bg-teal-900/90 text-emerald-300'
              : isDay
              ? 'bg-slate-50 text-slate-300'
              : 'bg-[#0b1e22] text-slate-600'
          }`}
        >
          {/* SVG Circular Progress Track & Fill */}
          <svg className="absolute inset-0 w-8 h-8 -rotate-90 pointer-events-none" viewBox="0 0 32 32">
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke={isDay ? 'rgba(0, 103, 71, 0.15)' : 'rgba(16, 185, 129, 0.2)'}
              strokeWidth="2.5"
            />
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke={isDay ? '#006747' : '#10b981'}
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>

          <ChevronUp className="w-4 h-4 stroke-[3] transition-transform group-hover:-translate-y-0.5" />
        </button>

        {/* 2. LIVE SLIM SCROLL PERCENTAGE BADGE */}
        <div
          title={isBn ? `পড়ার অগ্রগতি: ${scrollPercent}%` : `Progress: ${scrollPercent}%`}
          className={`w-8 py-0.5 rounded-lg text-[9px] font-mono font-black transition-all flex items-center justify-center shadow-2xs ${
            isDay
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-500 text-slate-950 font-extrabold'
          }`}
        >
          {scrollPercent}%
        </div>

        {/* 3. SCROLL TO BOTTOM BUTTON (Compact w-8 h-8) */}
        <button
          type="button"
          onClick={handleScrollToBottom}
          title={bottomTooltip}
          aria-label={bottomTooltip}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 group ${
            !isNearBottom
              ? isDay
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                : 'bg-teal-950/70 hover:bg-teal-900/90 text-emerald-300'
              : isDay
              ? 'bg-slate-50 text-slate-300'
              : 'bg-[#0b1e22] text-slate-600'
          }`}
        >
          <ChevronDown className="w-4 h-4 stroke-[3] transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};
