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
      className={`relative overflow-hidden rounded-[32px] transition-all duration-300 p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl ${
        isDay
          ? 'bg-white border border-blue-100/90 shadow-[0_8px_30px_rgb(0,102,255,0.06)]'
          : 'bg-[#0f1a30] border border-blue-900/40 shadow-black/80'
      }`}
    >
      {/* Decorative ambient breathing Noor flares */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none animate-nur-breathe ${
          isDay ? 'bg-blue-500/10' : 'bg-blue-400/15'
        }`}
      />
      <div
        className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 ${
          isPopping ? 'opacity-100 scale-110' : 'opacity-70'
        } ${isDay ? 'bg-sky-500/10' : 'bg-sky-400/15'}`}
      />
      <div
        className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isDay ? 'bg-amber-400/10' : 'bg-amber-400/10'
        }`}
      />

      {/* Top Quranic Bismillah & Subtitle */}
      <div className="relative z-10 mb-2 space-y-1">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1 transition-transform ${
            isPopping ? 'scale-105' : 'scale-100'
          } ${
            isDay
              ? 'bg-blue-50 text-[#0066FF] border border-blue-200/80 shadow-xs'
              : 'bg-blue-950/80 text-sky-300 border-blue-800/80'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isPopping ? 'bg-sky-400 animate-ping' : 'bg-[#0066FF]'
            }`}
          />
          <span>{ZIKIR_UI.centralMasterCounter[selectedLanguage]}</span>
        </div>

        {/* Arabic remains purely Arabic */}
        <div
          dir="rtl"
          className={`font-arabic text-2xl sm:text-3xl font-bold tracking-wide select-none ${
            isDay ? 'text-[#0052cc]' : 'text-sky-300'
          }`}
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>
        <p className={`text-xs ${isDay ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
          {ZIKIR_UI.realtimeSubtitle[selectedLanguage]}
        </p>
      </div>

      {/* Large Circular Center Dial with Pop-up Animation */}
      <div className="relative z-10 my-3 flex items-center justify-center">
        {/* Floating "+1" Pop Particles */}
        {popParticles.map((particle) => (
          <span
            key={particle.id}
            className="absolute -top-4 font-black text-lg text-[#0066FF] dark:text-sky-300 drop-shadow-md pointer-events-none z-30 animate-out fade-out slide-out-to-top duration-700"
          >
            {particle.text}
          </span>
        ))}

        {/* Outer Halo with Royal Blue & Sky Gradient with Pop-Up Bounce */}
        <div
          className={`relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2.5 transition-transform duration-200 ease-out shadow-2xl flex items-center justify-center ${
            isPopping
              ? 'scale-105 ring-8 ring-blue-500/25'
              : 'scale-100 ring-0'
          } ${
            isDay
              ? 'bg-gradient-to-tr from-[#0052cc] via-[#0066FF] to-[#38bdf8] shadow-blue-500/20'
              : 'bg-gradient-to-tr from-[#08152e] via-[#0052cc] to-[#0066FF] shadow-black/80'
          }`}
        >
          {/* Inner Circular Face */}
          <div
            className={`w-full h-full rounded-full flex flex-col items-center justify-center p-4 relative shadow-inner transition-transform duration-200 ${
              isPopping ? 'scale-[1.02]' : 'scale-100'
            } ${
              isDay
                ? 'bg-[#f8fafd] border-2 border-white'
                : 'bg-gradient-to-b from-[#091326] via-[#0c1a36] to-[#091326] border border-blue-900/50'
            }`}
          >
            {/* 33 Animated Dynamic Tasbeeh Beads around Orbit */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 200 200"
            >
              {/* Outer track circle */}
              <circle
                cx="100"
                cy="100"
                r="86"
                fill="none"
                stroke={isDay ? 'rgba(0, 102, 255, 0.12)' : 'rgba(56, 189, 248, 0.15)'}
                strokeWidth="1.5"
                strokeDasharray="2 3"
              />
              {/* 33 Individual Beads */}
              {Array.from({ length: 33 }).map((_, i) => {
                const angle = (i * 360) / 33 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 86;
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
                    r={isCurrent ? 4.5 : isPassed ? 2.8 : 2}
                    className="transition-all duration-200"
                    fill={
                      isCurrent
                        ? '#f59e0b'
                        : isPassed
                        ? isDay ? '#0066FF' : '#38bdf8'
                        : isDay ? 'rgba(0, 102, 255, 0.22)' : 'rgba(56, 189, 248, 0.2)'
                    }
                    stroke={isCurrent ? '#ffffff' : 'none'}
                    strokeWidth={isCurrent ? '1.5' : '0'}
                  />
                );
              })}
            </svg>

            <span
              className={`text-[11px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1 ${
                isDay ? 'text-[#0066FF]' : 'text-sky-300'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{ZIKIR_UI.masterTasbeehCount[selectedLanguage]}</span>
            </span>

            {/* Giant Digits with Pop Spring Effect */}
            <div
              className={`text-5xl sm:text-6xl font-black tracking-tight font-sans drop-shadow-md select-none transition-all duration-150 ${
                isPopping ? 'scale-110 text-[#0066FF]' : isDay ? 'text-[#0f172a]' : 'text-white'
              }`}
            >
              {totalCount.toLocaleString()}
            </div>

            <span
              className={`text-[11px] font-medium mt-1 ${
                isDay ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              {ZIKIR_UI.masterTasbeehCount[selectedLanguage] || 'Master Tasbeeh Count'}
            </span>

            {/* Inset Sub-metrics pill */}
            <div className="mt-2 flex flex-col items-center gap-1">
              <div
                className={`flex items-center gap-2 text-[10px] px-3 py-1 rounded-full font-semibold border ${
                  isDay
                    ? 'bg-white text-slate-700 border-blue-100 shadow-sm'
                    : 'bg-[#09152b] text-sky-200 border-blue-900/60'
                }`}
              >
                <span>
                  {ZIKIR_UI.todayDhikr[selectedLanguage]}{' '}
                  <strong className="text-[#0066FF] dark:text-sky-400 font-mono">{effectiveDaily.toLocaleString()}</strong>
                </span>
                <span>•</span>
                <span className={isDay ? 'text-amber-600 font-bold' : 'text-amber-300 font-bold'}>
                  {completedGoals} {ZIKIR_UI.goalsMet[selectedLanguage]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls beneath Circular Counter */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-3">
        {/* Save Current Session to History */}
        <button
          type="button"
          onClick={onSaveSession}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-blue-500/25 transition active:scale-95 cursor-pointer bg-[#0066FF] hover:bg-[#0052CC] text-white border border-blue-400/40"
        >
          <BookmarkPlus className="w-4 h-4 text-sky-200" />
          <span>{ZIKIR_UI.saveSession[selectedLanguage]}</span>
        </button>

        {/* Global Reset */}
        <button
          type="button"
          onClick={onGlobalReset}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-semibold transition active:scale-95 cursor-pointer border ${
            isDay
              ? 'bg-white hover:bg-red-50 text-red-600 border-red-200 shadow-sm'
              : 'bg-[#221215] hover:bg-red-950/60 text-red-300 border-red-900/50'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{ZIKIR_UI.resetAll[selectedLanguage]}</span>
        </button>
      </div>
    </section>
  );
});
