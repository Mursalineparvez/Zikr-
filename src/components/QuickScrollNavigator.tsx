import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, Compass } from 'lucide-react';
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

  const [scrollTop, setScrollTop] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const maxScroll = Math.max(1, fullHeight - windowHeight);

      const percent = Math.min(100, Math.max(0, Math.round((currentScroll / maxScroll) * 100)));
      setScrollTop(currentScroll);
      setScrollPercent(percent);

      // Show floating controller if page is scrollable or user scrolled
      const isScrollable = fullHeight > windowHeight + 40;
      const shouldShow = isScrollable || currentScroll > 30;
      setIsVisible(shouldShow);
      setIsNearBottom(currentScroll + windowHeight >= fullHeight - 120);

      // Reset idle timer
      setIsIdle(false);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 4500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  // Scroll to absolute top
  const handleScrollToTop = () => {
    if (soundEnabled) soundHaptics.playTap();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Scroll to absolute bottom
  const handleScrollToBottom = () => {
    if (soundEnabled) soundHaptics.playTap();
    const fullHeight = document.documentElement.scrollHeight;
    window.scrollTo({
      top: fullHeight,
      behavior: 'smooth',
    });
  };

  // Scroll one viewport page up
  const handlePageUp = () => {
    if (soundEnabled) soundHaptics.playTap();
    window.scrollBy({
      top: -Math.round(window.innerHeight * 0.75),
      behavior: 'smooth',
    });
  };

  // Scroll one viewport page down
  const handlePageDown = () => {
    if (soundEnabled) soundHaptics.playTap();
    window.scrollBy({
      top: Math.round(window.innerHeight * 0.75),
      behavior: 'smooth',
    });
  };

  // Don't render if page is completely non-scrollable
  if (!isVisible) return null;

  // On zikir_counter page, floating Add button is at bottom-20 sm:bottom-6 right-5 sm:right-8
  // Position QuickScrollNavigator slightly above it on zikir_counter so there is zero overlap
  const positionClasses =
    activeModule === 'zikir_counter'
      ? 'bottom-38 sm:bottom-24 right-3.5 sm:right-8'
      : 'bottom-20 sm:bottom-6 right-3.5 sm:right-8';

  const circumference = 2 * Math.PI * 18; // r=18
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  const topTooltip = selectedLanguage === 'bn' ? 'একদম উপরে যান (Top)' : 'Scroll to Top';
  const bottomTooltip = selectedLanguage === 'bn' ? 'একদম নিচে যান (Bottom)' : 'Scroll to Bottom';

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        setIsIdle(false);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed ${positionClasses} z-40 flex flex-col items-center gap-1.5 transition-all duration-300 select-none ${
        isIdle && !isHovered ? 'opacity-40 hover:opacity-100 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Expanded Controls: Both Top & Bottom scroll buttons */}
      {isExpanded ? (
        <div
          className={`flex flex-col items-center p-1 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all duration-300 ${
            isDay
              ? 'bg-white/95 border-emerald-600/30 shadow-emerald-900/15 text-slate-800'
              : 'bg-[#0a2327]/95 border-teal-500/40 shadow-black/80 text-emerald-100'
          }`}
        >
          {/* 1. SCROLL TO TOP BUTTON (With Circular Reading Progress Ring) */}
          <button
            onClick={handleScrollToTop}
            title={topTooltip}
            aria-label={topTooltip}
            className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 group ${
              scrollTop > 80
                ? isDay
                  ? 'text-emerald-700 hover:bg-emerald-50'
                  : 'text-emerald-300 hover:bg-teal-900/50'
                : 'opacity-40 cursor-default'
            }`}
          >
            {/* SVG Circular Progress Track & Fill */}
            <svg className="absolute inset-0 w-11 h-11 -rotate-90 pointer-events-none" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke={isDay ? 'rgba(0, 103, 71, 0.12)' : 'rgba(16, 185, 129, 0.15)'}
                strokeWidth="2.5"
              />
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke={isDay ? '#006747' : '#10b981'}
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-150"
              />
            </svg>

            <ChevronUp className="w-5 h-5 stroke-[2.8] transition-transform group-hover:-translate-y-0.5" />
          </button>

          {/* 2. LIVE SCROLL PERCENTAGE INDICATOR */}
          <div
            onClick={handlePageDown}
            title={selectedLanguage === 'bn' ? `পৃষ্ঠার ${scrollPercent}% দেখা হয়েছে` : `${scrollPercent}% scrolled`}
            className={`px-1.5 py-0.5 rounded-md my-0.5 font-mono text-[9px] font-black cursor-pointer transition-colors ${
              isDay
                ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                : 'bg-teal-950/70 text-emerald-300 hover:bg-teal-900/90'
            }`}
          >
            {scrollPercent}%
          </div>

          {/* 3. SCROLL TO BOTTOM BUTTON */}
          <button
            onClick={handleScrollToBottom}
            title={bottomTooltip}
            aria-label={bottomTooltip}
            className={`w-11 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 group ${
              !isNearBottom
                ? isDay
                  ? 'text-emerald-700 hover:bg-emerald-50'
                  : 'text-emerald-300 hover:bg-teal-900/50'
                : 'opacity-40 cursor-default'
            }`}
          >
            <ChevronDown className="w-5 h-5 stroke-[2.8] transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      ) : (
        /* Collapsed Minimal Circle FAB (Shows Top Arrow + Percentage) */
        <button
          onClick={handleScrollToTop}
          title={topTooltip}
          aria-label={topTooltip}
          className={`relative w-12 h-12 rounded-2xl flex flex-col items-center justify-center shadow-xl border cursor-pointer active:scale-90 transition-all ${
            isDay
              ? 'bg-white/95 text-emerald-800 border-emerald-500/40 shadow-emerald-950/20'
              : 'bg-[#0a2327]/95 text-emerald-300 border-teal-500/40 shadow-black/80'
          }`}
        >
          <ChevronUp className="w-5 h-5 stroke-[3]" />
          <span className="text-[8px] font-mono font-black -mt-0.5">{scrollPercent}%</span>
        </button>
      )}

      {/* Tiny toggle button to switch between Full Scroll controls & Minimal pill */}
      <button
        onClick={() => {
          setIsExpanded((prev) => !prev);
          if (soundEnabled) soundHaptics.playTap();
        }}
        title={isExpanded ? 'মিনিমাইজ করুন' : 'বিস্তারিত স্ক্রলবার'}
        className={`w-5 h-4 rounded-full flex items-center justify-center opacity-40 hover:opacity-90 transition-opacity cursor-pointer ${
          isDay ? 'text-slate-600 bg-slate-200/80' : 'text-slate-400 bg-teal-950/80'
        }`}
      >
        <span className="text-[8px] leading-none">{isExpanded ? '−' : '+'}</span>
      </button>
    </div>
  );
};
