import React, { useEffect, useState, useRef } from 'react';
import { RotateCcw, BookmarkPlus, Sparkles } from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { ZIKIR_UI } from '../utils/zikirTranslations';

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
          ? 'bg-[var(--app-surface,#fafdfb)] border-[var(--app-border,#cbe6d8)] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)]'
          : 'bg-[var(--app-dark-surface,#062024)] border-[var(--app-dark-border,#184850)] shadow-black/80'
      }`}
    >
      {/* Ambient background soft glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none animate-nur-breathe ${
          isDay ? 'bg-emerald-500/10' : 'bg-emerald-400/15'
        }`}
      />

      {/* Top Header Pill Badge & Bismillah Calligraphy */}
      <div className="relative z-10 mb-3 space-y-1.5 flex flex-col items-center">
        {/* Badge Pill: CENTRAL MASTER COUNTER / সর্বমোট তাসবীহ */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-transform ${
            isPopping ? 'scale-105' : 'scale-100'
          } ${
            isDay
              ? 'bg-[var(--app-surface-soft,#e9f6ef)] text-[var(--app-primary,#006A4E)] border border-[var(--app-border,#cbe6d8)] shadow-xs'
              : 'bg-[var(--app-dark-surface-soft,#0c3138)] text-[var(--app-primary-light,#6ee7b7)] border border-[var(--app-dark-border,#184850)]'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isPopping
                ? 'bg-[var(--app-primary-mid,#059669)] animate-ping'
                : 'bg-[var(--app-primary,#006A4E)] dark:bg-[var(--app-primary-light,#6ee7b7)]'
            }`}
          />
          <span>● {ZIKIR_UI.centralMasterCounter[selectedLanguage] || 'Central Master Counter'}</span>
        </div>

        {/* Arabic Bismillah Calligraphy */}
        <div
          dir="rtl"
          className={`font-arabic text-2xl sm:text-3xl font-bold tracking-wide select-none ${
            isDay ? 'text-[var(--app-primary,#006A4E)]' : 'text-[var(--app-primary-light,#6ee7b7)]'
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
            className="absolute -top-4 font-black text-lg text-[var(--app-primary,#006A4E)] dark:text-[var(--app-primary-light,#6ee7b7)] drop-shadow-md pointer-events-none z-30 animate-out fade-out slide-out-to-top duration-700"
          >
            {particle.text}
          </span>
        ))}

        {/* Outer Circle Container */}
        <div
          className={`relative w-60 h-60 sm:w-68 sm:h-68 rounded-full p-3 transition-transform duration-200 ease-out flex items-center justify-center ${
            isPopping ? 'scale-105 ring-8 ring-emerald-500/20' : 'scale-100'
          } ${
            isDay
              ? 'bg-gradient-to-tr from-[var(--app-primary,#006A4E)] to-[var(--app-primary-mid,#059669)] shadow-md shadow-emerald-900/15'
              : 'bg-gradient-to-tr from-[var(--app-dark-canvas,#03171b)] via-[var(--app-dark-surface-soft,#0c3138)] to-[var(--app-primary-mid,#059669)] shadow-black/80'
          }`}
        >
          {/* Inner Dial Face */}
          <div
            className={`w-full h-full rounded-full flex flex-col items-center justify-center p-4 relative shadow-inner transition-transform duration-200 ${
              isPopping ? 'scale-[1.02]' : 'scale-100'
            } ${
              isDay
                ? 'bg-white border-2 border-white'
                : 'bg-gradient-to-b from-[var(--app-dark-surface,#062024)] via-[var(--app-dark-surface-soft,#0c3138)] to-[var(--app-dark-surface,#062024)] border border-[var(--app-dark-border,#184850)]'
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
                stroke={isDay ? 'var(--app-primary, #006A4E)' : 'var(--app-primary-light, #6ee7b7)'}
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
                        : isDay
                        ? 'var(--app-primary, #006A4E)'
                        : 'var(--app-primary-light, #6ee7b7)'
                    }
                  />
                );
              })}
            </svg>

            {/* Upper Golden Star Label */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-[var(--app-primary-light,#6ee7b7)] mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>{ZIKIR_UI.masterTasbeehCount[selectedLanguage] || 'Master Tasbeeh Count'}</span>
            </div>

            {/* Giant Bold Counter Digits */}
            <div
              className={`text-4xl sm:text-5xl font-black tracking-tight font-sans drop-shadow-xs select-none transition-all duration-150 ${
                isPopping
                  ? 'scale-110 text-[var(--app-primary,#006A4E)] dark:text-[var(--app-primary-light,#6ee7b7)]'
                  : isDay
                  ? 'text-[var(--app-ink,#004D38)]'
                  : 'text-white'
              }`}
            >
              {totalCount.toLocaleString()}
            </div>

            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-300 mt-0.5">
              {ZIKIR_UI.masterTasbeehCount[selectedLanguage] || 'Total Tasbeeh Count'}
            </span>

            {/* Breakdown Indicators inside circle */}
            <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-bold">
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--app-surface-soft,#e9f6ef)] dark:bg-[var(--app-dark-surface-soft,#0c3138)] border border-[var(--app-border,#cbe6d8)] dark:border-[var(--app-dark-border,#184850)] text-slate-700 dark:text-slate-200">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span>{ZIKIR_UI.todayDhikr[selectedLanguage] || "Today's Dhikr:"}</span>
                <span className="font-mono text-[var(--app-primary,#006A4E)] dark:text-[var(--app-primary-light,#6ee7b7)] font-extrabold">
                  {effectiveDaily.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--app-surface-soft,#e9f6ef)] dark:bg-[var(--app-dark-surface-soft,#0c3138)] border border-[var(--app-border,#cbe6d8)] dark:border-[var(--app-dark-border,#184850)] text-slate-700 dark:text-slate-200">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span>{ZIKIR_UI.goal200k[selectedLanguage] || '200k Goal'}</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls beneath Circular Counter */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-4 w-full max-w-sm">
        {/* Save Button: Save to History */}
        <button
          type="button"
          onClick={onSaveSession}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold shadow-sm transition active:scale-95 cursor-pointer bg-[var(--app-primary,#006A4E)] hover:bg-[var(--app-primary-dark,#00523c)] text-white"
        >
          <BookmarkPlus className="w-4 h-4 text-[var(--app-primary-light,#6ee7b7)]" />
          <span>{ZIKIR_UI.saveSession[selectedLanguage] || 'Save Session to History'}</span>
        </button>

        {/* Right Red Reset Button: Reset All */}
        <button
          type="button"
          onClick={onGlobalReset}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer border ${
            isDay
              ? 'bg-[var(--app-surface,#ffffff)] hover:bg-rose-50 text-rose-600 border-rose-300 shadow-xs'
              : 'bg-[#221215] hover:bg-rose-950/60 text-rose-300 border-rose-900/50'
          }`}
        >
          <RotateCcw className="w-4 h-4 text-rose-500" />
          <span>{ZIKIR_UI.resetAll[selectedLanguage] || 'Reset All'}</span>
        </button>
      </div>
    </section>
  );
});
