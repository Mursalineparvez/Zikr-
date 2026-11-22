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
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef<number>(
    typeof window !== 'undefined' ? window.scrollY || document.documentElement.scrollTop : 0
  );
  const isHoveredRef = useRef<boolean>(false);

  const scheduleHide = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        setIsVisible(false);
      }
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const maxScroll = Math.max(1, fullHeight - windowHeight);

      const percent = Math.min(100, Math.max(0, Math.round((currentScroll / maxScroll) * 100)));
      setScrollTop(currentScroll);
      setScrollPercent(percent);
      setIsNearBottom(currentScroll + windowHeight >= fullHeight - 120);

      const delta = Math.abs(currentScroll - lastScrollYRef.current);
      lastScrollYRef.current = currentScroll;

      const isScrollable = fullHeight > windowHeight + 40;
      if ((isScrollable || currentScroll > 20) && delta > 0) {
        setIsVisible(true);
        scheduleHide();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Reset visibility when switching modules/pages
  useEffect(() => {
    setIsVisible(false);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    lastScrollYRef.current = window.scrollY || document.documentElement.scrollTop;
  }, [activeModule]);

  const handleScrollToTop = () => {
    if (soundEnabled) soundHaptics.playTap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    scheduleHide();
  };

  const handleScrollToBottom = () => {
    if (soundEnabled) soundHaptics.playTap();
    const fullHeight = document.documentElement.scrollHeight;
    window.scrollTo({ top: fullHeight, behavior: 'smooth' });
    scheduleHide();
  };

  if (!isVisible) return null;

  // Position cleanly above bottom dock and floating right-side chatbot button
  const positionClasses =
    activeModule === 'zikir_counter'
      ? 'bottom-[206px] right-2.5 sm:right-5'
      : 'bottom-[142px] right-2.5 sm:right-5';

  const circumference = 2 * Math.PI * 14; // r=14 for compact circle
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  const topTooltip = isBn ? 'একদম উপরে যান' : 'Scroll to Top';
  const bottomTooltip = isBn ? 'একদম নিচে যান' : 'Scroll to Bottom';

  return (
    <div
      onMouseEnter={() => {
        isHoveredRef.current = true;
        setIsHovered(true);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        setIsHovered(false);
        scheduleHide();
      }}
      onTouchStart={() => {
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      }}
      onTouchEnd={() => {
        scheduleHide();
      }}
      className={`fixed ${positionClasses} z-[64] flex flex-col items-center transition-all duration-200 select-none animate-in fade-in zoom-in-95 ${
        isHovered ? 'scale-105' : 'scale-100'
      }`}
    >
      {/* Ultra-Slim, Compact Vertical Pod */}
      <div
        className={`flex flex-col items-center p-1 rounded-2xl backdrop-blur-xl border shadow-xl transition-all duration-200 gap-1 ${
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
