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

export const CircularCenterCounter: React.FC<CircularCenterCounterProps> = ({
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
      className={`relative overflow-hidden rounded-[28px] transition-all duration-300 p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl ${
        isDay
          ? 'bg-white border border-[#d6e8e5] shadow-[#135d66]/5'
          : 'bg-[#0e2f36] border border-[#1a515c] shadow-[#082024]/60'
      }`}
    >
      {/* Decorative ambient flares */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 ${
          isPopping ? 'opacity-100 scale-110' : 'opacity-70'
        } ${isDay ? 'bg-teal-500/20' : 'bg-teal-400/25'}`}
      />
      <div
        className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isDay ? 'bg-amber-400/10' : 'bg-amber-400/10'
        }`}
      />

      {/* Top Quranic Bismillah & Subtitle */}
      <div className="relative z-10 mb-2 space-y-1">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1 transition-transform ${
            isPopping ? 'scale-105' : 'scale-100'
          } ${
            isDay
              ? 'bg-[#e6f3f2] text-[#1c6469] border border-[#cbe4e1]'
              : 'bg-[#0a262c] text-[#2dd4bf] border-[#184850]'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isPopping ? 'bg-emerald-400 animate-ping' : isDay ? 'bg-[#1c6469]' : 'bg-[#2dd4bf]'
            }`}
          />
          <span>{ZIKIR_UI.centralMasterCounter[selectedLanguage]}</span>
        </div>

        {/* Arabic remains purely Arabic */}
        <div
          dir="rtl"
          className={`font-arabic text-2xl sm:text-3xl font-bold tracking-wide select-none ${
            isDay ? 'text-[#164e52]' : 'text-[#2dd4bf]'
          }`}
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>
        <p className={`text-xs ${isDay ? 'text-[#4e7478]' : 'text-[#90b8be]'}`}>
          {ZIKIR_UI.realtimeSubtitle[selectedLanguage]}
        </p>
      </div>

      {/* Large Circular Center Dial with Pop-up Animation */}
      <div className="relative z-10 my-3 flex items-center justify-center">
        {/* Floating "+1" Pop Particles */}
        {popParticles.map((particle) => (
          <span
            key={particle.id}
            className="absolute -top-4 font-black text-lg text-emerald-400 dark:text-emerald-300 drop-shadow-md pointer-events-none z-30 animate-out fade-out slide-out-to-top duration-700"
          >
            {particle.text}
          </span>
        ))}

        {/* Outer Halo with Teal/Emerald Gradient with Pop-Up Bounce */}
        <div
          className={`relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2.5 transition-transform duration-200 ease-out shadow-2xl flex items-center justify-center ${
            isPopping
              ? 'scale-105 ring-8 ring-emerald-500/30'
              : 'scale-100 ring-0'
          } ${
            isDay
              ? 'bg-gradient-to-tr from-[#005a3e] via-[#006747] to-[#00875a] shadow-[#006747]/25'
              : 'bg-gradient-to-tr from-[#144d52] via-[#1c6469] to-[#2dd4bf] shadow-[#082024]/80'
          }`}
        >
          {/* Inner Circular Face */}
          <div
            className={`w-full h-full rounded-full flex flex-col items-center justify-center p-4 relative shadow-inner transition-transform duration-200 ${
              isPopping ? 'scale-[1.02]' : 'scale-100'
            } ${
              isDay
                ? 'bg-[#f4faf8] border-2 border-white'
                : 'bg-gradient-to-b from-[#092226] via-[#0d2d33] to-[#092226] border border-[#1a4a52]'
            }`}
          >
            {/* Decorative dashed bead orbit */}
            <div
              className={`absolute inset-2 border border-dashed rounded-full pointer-events-none ${
                isDay ? 'border-emerald-400/50' : 'border-[#2dd4bf]/30'
              }`}
            />

            <span
              className={`text-[11px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1 ${
                isDay ? 'text-[#006747]' : 'text-[#2dd4bf]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{ZIKIR_UI.masterTasbeehCount[selectedLanguage]}</span>
            </span>

            {/* Giant Digits with Pop Spring Effect */}
            <div
              className={`text-5xl sm:text-6xl font-black tracking-tight font-sans drop-shadow-md select-none transition-all duration-150 ${
                isPopping ? 'scale-110 text-emerald-500' : isDay ? 'text-[#0a3328]' : 'text-white'
              }`}
            >
              {totalCount.toLocaleString()}
            </div>

            <span
              className={`text-[11px] font-medium mt-1 ${
                isDay ? 'text-[#4e7478]' : 'text-[#90b8be]'
              }`}
            >
              Master Tasbeeh Count
            </span>

            {/* Inset Sub-metrics pill */}
            <div className="mt-2 flex flex-col items-center gap-1">
              <div
                className={`flex items-center gap-2 text-[10px] px-3 py-1 rounded-full font-semibold border ${
                  isDay
                    ? 'bg-white text-[#006747] border-[#d2ece9] shadow-sm'
                    : 'bg-[#0a262c] text-[#86b5bc] border-[#184850]'
                }`}
              >
                <span>
                  {ZIKIR_UI.todayDhikr[selectedLanguage]}{' '}
                  <strong className="text-[#00875a] font-mono">{effectiveDaily.toLocaleString()}</strong>
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
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md transition active:scale-95 cursor-pointer bg-[#006747] hover:bg-[#005a3e] text-white shadow-[#006747]/20 border border-emerald-400/30"
        >
          <BookmarkPlus className="w-4 h-4 text-emerald-200" />
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
};
