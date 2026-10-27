import React, { useEffect, useState, useRef } from 'react';
import { RotateCcw, BookmarkPlus, Sparkles } from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { ZIKIR_UI } from '../utils/appTranslations';

interface CircularCenterCounterProps {
  totalCount: number;
  dailyCount?: number;
  totalZikrs: number;
  completedGoals: number;
  onGlobalReset: () => void;
  onSaveSession: () => void;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

export const CircularCenterCounter: React.FC<CircularCenterCounterProps> = React.memo(({
  totalCount,
  dailyCount,
  totalZikrs,
  completedGoals,
  onGlobalReset,
  onSaveSession,
  themeMode = 'day',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const effectiveDaily = typeof dailyCount === 'number' ? dailyCount : totalCount;

  const [isPopping, setIsPopping] = useState(false);
  const [popParticles, setPopParticles] = useState<{ id: number; text: string }[]>([]);
  const prevCountRef = useRef(totalCount);

  // Pop-up trigger when totalCount increments
  useEffect(() => {
    if (totalCount > prevCountRef.current) {
      setIsPopping(true);
      const newId = Date.now();
      setPopParticles((prev) => [...prev.slice(-4), { id: newId, text: '+1' }]);

      const timeout = setTimeout(() => {
        setIsPopping(false);
      }, 350);

      const particleTimeout = setTimeout(() => {
        setPopParticles((prev) => prev.filter((p) => p.id !== newId));
      }, 700);

      prevCountRef.current = totalCount;
      return () => {
        clearTimeout(timeout);
        clearTimeout(particleTimeout);
      };
    }
    prevCountRef.current = totalCount;
  }, [totalCount]);

  return (
    <section
      id="main-circular-center-counter"
      className={`relative overflow-hidden rounded-[28px] transition-all duration-300 p-5 sm:p-7 flex flex-col items-center justify-center text-center border shadow-sm ${
        isDay
          ? 'bg-[#F0FDF8] border-[#CDECE0] shadow-[0_4px_20px_-2px_rgba(0,106,78,0.06)]'
          : 'bg-[#042026] border-teal-800/40 shadow-black/80'
      }`}
    >
      {/* Ambient background soft glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none animate-nur-breathe ${
          isDay ? 'bg-emerald-500/10' : 'bg-teal-400/15'
        }`}
      />

      {/* Top Header Pill Badge & Bismillah Calligraphy */}
      <div className="relative z-10 mb-3 space-y-1.5 flex flex-col items-center">
        {/* Badge Pill: CENTRAL MASTER COUNTER • সর্বমোট তাসবীহ */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-transform ${
            isPopping ? 'scale-105' : 'scale-100'
          } ${
            isDay
              ? 'bg-[#D0F2E3] text-[#006A4E] border border-[#B5E9D2] shadow-xs'
              : 'bg-teal-950/80 text-teal-300 border border-teal-800/80'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isPopping ? 'bg-emerald-500 animate-ping' : 'bg-[#006A4E]'
            }`}
          />
          <span>● CENTRAL MASTER COUNTER • সর্বমোট তাসবীহ</span>
        </div>

        {/* Arabic Bismillah Calligraphy */}
        <div
          dir="rtl"
          className={`font-arabic text-2xl sm:text-3xl font-bold tracking-wide select-none ${
            isDay ? 'text-[#006A4E]' : 'text-teal-300'
          }`}
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>

        {/* Subtitle */}
        <p className={`text-xs ${isDay ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
          {selectedLanguage === 'bn' ? 'সকল সক্রিয় যিকিরের তাৎক্ষণিক সর্বমোট সমষ্টি' : ZIKIR_UI.realtimeSubtitle[selectedLanguage]}
        </p>
      </div>

      {/* Large Circular Center Counter Gauge */}
      <div className="relative z-10 my-2 flex items-center justify-center">
        {/* Floating "+1" Pop Particles */}
        {popParticles.map((particle) => (
          <span
            key={particle.id}
            className="absolute -top-4 font-black text-lg text-emerald-600 dark:text-emerald-300 drop-shadow-md pointer-events-none z-30 animate-out fade-out slide-out-to-top duration-700"
          >
            {particle.text}
          </span>
        ))}

        {/* Outer Circle Container matching exact green border ring from screenshot */}
        <div
          className={`relative w-60 h-60 sm:w-68 sm:h-68 rounded-full p-3 transition-transform duration-200 ease-out flex items-center justify-center ${
            isPopping ? 'scale-105 ring-8 ring-emerald-500/20' : 'scale-100'
          } ${
            isDay
              ? 'bg-gradient-to-tr from-[#006A4E] to-[#008763] shadow-md shadow-emerald-900/15'
              : 'bg-gradient-to-tr from-[#031d22] via-[#0d3b42] to-[#007e8a] shadow-black/80'
          }`}
        >
          {/* Inner White Face */}
          <div
            className={`w-full h-full rounded-full flex flex-col items-center justify-center p-4 relative shadow-inner transition-transform duration-200 ${
              isPopping ? 'scale-[1.02]' : 'scale-100'
            } ${
              isDay
                ? 'bg-white border-2 border-white'
                : 'bg-gradient-to-b from-[#062024] via-[#08292e] to-[#062024] border border-teal-800/50'
            }`}
          >
            {/* Dotted Orbit Path Around Ring */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={isDay ? '#006A4E' : '#14b8a6'}
                strokeWidth="2.5"
                strokeDasharray="3 4"
              />
              {/* Individual Dotted Beads */}
              {Array.from({ length: 33 }).map((_, i) => {
                const angle = (i * 360) / 33 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 90;
                const cx = 100 + r * Math.cos(rad);
                const cy = 100 + r * Math.sin(rad);
                const currentBead = totalCount > 0 ? (totalCount - 1) % 33 : -1;
                const isCurrent = i === currentBead;
                const isPassed = totalCount > 0 && i <= currentBead;
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={isCurrent ? 4 : isPassed ? 2.5 : 1.8}
                    className="transition-all duration-200"
                    fill={
                      isCurrent
                        ? '#f59e0b'
                        : isPassed
                        ? isDay ? '#006A4E' : '#14b8a6'
                        : isDay ? '#006A4E' : '#14b8a6'
                    }
                  />
                );
              })}
            </svg>

            {/* Upper Golden Star Label */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-emerald-300 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>সর্বমোট তাসবীহ গণনা</span>
            </div>

            {/* Giant Bold Counter Digits matching reference screenshot (e.g., 11,573) */}
            <div
              className={`text-4xl sm:text-5xl font-black tracking-tight font-sans drop-shadow-xs select-none transition-all duration-150 ${
                isPopping ? 'scale-110 text-[#006A4E]' : isDay ? 'text-[#004D38]' : 'text-white'
              }`}
            >
              {totalCount.toLocaleString()}
            </div>

            <span className={`text-[11px] font-medium text-slate-500 mt-0.5`}>
              সর্বমোট তাসবীহ গণনা
            </span>

            {/* Breakdown Indicators inside circle matching orange dots from image */}
            <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-bold">
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span>আজকের জিকির:</span>
                <span className="font-mono text-[#006A4E] font-extrabold">{effectiveDaily.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span>২ লক্ষ পূরণ</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls beneath Circular Counter: Left Solid Emerald, Right Red Border Outline */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-4 w-full max-w-sm">
        {/* Left Green Save Button: [ 💾 হিস্ট্রিতে সংরক্ষণ করুন ] */}
        <button
          type="button"
          onClick={onSaveSession}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold shadow-sm transition active:scale-95 cursor-pointer bg-[#006A4E] hover:bg-[#005439] text-white"
        >
          <BookmarkPlus className="w-4 h-4 text-emerald-200" />
          <span>হিস্ট্রিতে সংরক্ষণ করুন</span>
        </button>

        {/* Right Red Reset Button: [ 🔄 সব রিসেট ] */}
        <button
          type="button"
          onClick={onGlobalReset}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer border ${
            isDay
              ? 'bg-white hover:bg-rose-50 text-rose-600 border-rose-300 shadow-xs'
              : 'bg-[#221215] hover:bg-rose-950/60 text-rose-300 border-rose-900/50'
          }`}
        >
          <RotateCcw className="w-4 h-4 text-rose-500" />
          <span>সব রিসেট</span>
        </button>
      </div>
    </section>
  );
});
