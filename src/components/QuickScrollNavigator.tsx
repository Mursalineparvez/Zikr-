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
      }, 5000);
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

  const handlePageUp = () => {
    if (soundEnabled) soundHaptics.playTap();
    window.scrollBy({ top: -Math.round(window.innerHeight * 0.75), behavior: 'smooth' });
  };

  const handlePageDown = () => {
    if (soundEnabled) soundHaptics.playTap();
    window.scrollBy({ top: Math.round(window.innerHeight * 0.75), behavior: 'smooth' });
  };

  if (!isVisible) return null;

  // Position cleanly above bottom dock/floating button
  const positionClasses =
    activeModule === 'zikir_counter'
      ? 'bottom-36 right-3 sm:right-6'
      : 'bottom-20 right-3 sm:right-6';

  const circumference = 2 * Math.PI * 20; // r=20
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  const topTooltip = isBn ? 'একদম উপরে যান (Scroll Top)' : 'Scroll to Top';
  const bottomTooltip = isBn ? 'একদম নিচে যান (Scroll Bottom)' : 'Scroll to Bottom';
  const pageUpTooltip = isBn ? 'এক স্ক্রিন উপরে' : 'Page Up';
  const pageDownTooltip = isBn ? 'এক স্ক্রিন নিচে' : 'Page Down';

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        setIsIdle(false);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed ${positionClasses} z-[64] flex flex-col items-center transition-all duration-300 select-none ${
        isIdle && !isHovered ? 'opacity-50 hover:opacity-100 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Sleek, High-Contrast Vertical Controller Pod */}
      <div
        className={`flex flex-col items-center p-1.5 rounded-3xl backdrop-blur-2xl border shadow-2xl transition-all duration-300 gap-1 ${
          isDay
            ? 'bg-white/98 border-emerald-600/40 shadow-emerald-950/20 text-slate-900'
            : 'bg-[#082228]/98 border-emerald-500/50 shadow-black/80 text-emerald-50'
        }`}
      >
        {/* 1. SCROLL TO TOP BUTTON (Large Hit Area min-h-[44px] min-w-[44px]) */}
        <button
          type="button"
          onClick={handleScrollToTop}
          title={topTooltip}
          aria-label={topTooltip}
          className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 group ${
            scrollTop > 50
              ? isDay
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                : 'bg-teal-950/70 hover:bg-teal-900/90 text-emerald-300'
              : isDay
              ? 'bg-slate-50 text-slate-400'
              : 'bg-[#0b1e22] text-slate-600'
          }`}
        >
          {/* SVG Circular Progress Track & Fill */}
          <svg className="absolute inset-0 w-12 h-12 -rotate-90 pointer-events-none" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke={isDay ? 'rgba(0, 103, 71, 0.15)' : 'rgba(16, 185, 129, 0.2)'}
              strokeWidth="3"
            />
            <circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke={isDay ? '#006747' : '#10b981'}
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>

          <ChevronUp className="w-6 h-6 stroke-[3] transition-transform group-hover:-translate-y-0.5" />
        </button>

        {/* 2. PAGE UP BUTTON */}
        <button
          type="button"
          onClick={handlePageUp}
          title={pageUpTooltip}
          aria-label={pageUpTooltip}
          className={`w-11 h-8 rounded-xl flex items-center justify-center transition cursor-pointer active:scale-95 text-xs font-black ${
            scrollTop > 50
              ? isDay
                ? 'hover:bg-slate-100 text-slate-700'
                : 'hover:bg-white/10 text-emerald-200'
              : 'opacity-30 cursor-default text-slate-400'
          }`}
        >
          <span>▲</span>
        </button>

        {/* 3. LIVE CLEAR SCROLL PERCENTAGE BADGE (Clickable to jump down) */}
        <button
          type="button"
          onClick={handlePageDown}
          title={isBn ? `পড়ার অগ্রগতি: ${scrollPercent}% (ক্লিক করে নিচে যান)` : `Progress: ${scrollPercent}%`}
          className={`w-11 py-1 rounded-xl my-0.5 font-mono text-[11px] font-black cursor-pointer transition-all flex items-center justify-center shadow-xs ${
            isDay
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-extrabold'
          }`}
        >
          {scrollPercent}%
        </button>

        {/* 4. PAGE DOWN BUTTON */}
        <button
          type="button"
          onClick={handlePageDown}
          title={pageDownTooltip}
          aria-label={pageDownTooltip}
          className={`w-11 h-8 rounded-xl flex items-center justify-center transition cursor-pointer active:scale-95 text-xs font-black ${
            !isNearBottom
              ? isDay
                ? 'hover:bg-slate-100 text-slate-700'
                : 'hover:bg-white/10 text-emerald-200'
              : 'opacity-30 cursor-default text-slate-400'
          }`}
        >
          <span>▼</span>
        </button>

        {/* 5. SCROLL TO BOTTOM BUTTON */}
        <button
          type="button"
          onClick={handleScrollToBottom}
          title={bottomTooltip}
          aria-label={bottomTooltip}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 group ${
            !isNearBottom
              ? isDay
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                : 'bg-teal-950/70 hover:bg-teal-900/90 text-emerald-300'
              : isDay
              ? 'bg-slate-50 text-slate-400'
              : 'bg-[#0b1e22] text-slate-600'
          }`}
        >
          <ChevronDown className="w-6 h-6 stroke-[3] transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};
