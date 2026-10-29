import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZikrItem, ThemeMode, ZikrLanguage } from '../types';
import {
  Lock,
  Unlock,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Volume2,
  VolumeX,
  Smartphone,
  Sparkles,
  CheckCircle2,
  Minus,
  Plus,
} from 'lucide-react';
import { soundHaptics, playArabicVoice } from '../utils/audioHaptics';

interface ZikrFocusModeProps {
  zikrs: ZikrItem[];
  initialIndex: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onReset: (zikr: ZikrItem) => void;
  onClose: () => void;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
}

export const ZikrFocusMode: React.FC<ZikrFocusModeProps> = ({
  zikrs,
  initialIndex,
  onIncrement,
  onDecrement,
  onReset,
  onClose,
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLocked, setIsLocked] = useState(false);
  const [soundActive, setSoundActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('noor_zikr_focus_sound');
      if (saved !== null) return saved === 'true';
    } catch {}
    return soundEnabled;
  });
  const [vibrationActive, setVibrationActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('noor_zikr_focus_vib');
      if (saved !== null) return saved === 'true';
    } catch {}
    return true;
  });
  const [voicePlaying, setVoicePlaying] = useState<boolean>(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; val: string }[]>([]);
  const [isBumping, setIsBumping] = useState(false);
  const [showLockNotice, setShowLockNotice] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const isDay = themeMode === 'day';
  const zikr = zikrs[currentIndex] || zikrs[0];
  const hasTarget = zikr.target !== undefined && zikr.target > 0;
  const target = zikr.target || 100;
  const isGoalMet = hasTarget && zikr.count >= target;
  const totalCount = zikrs.reduce((acc, z) => acc + (z.count || 0), 0);

  // Swipe gesture tracking
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lockNoticeTimerRef = useRef<any>(null);

  // Target & Circular Progress Calculations
  const progressFraction = hasTarget ? Math.min(1, zikr.count / target) : 0;
  const progressPercent = Math.min(100, Math.round(progressFraction * 100));
  const rounds = hasTarget ? Math.floor(zikr.count / target) : 0;

  // SVG circular gauge geometry
  const radius = 96;
  const strokeWidth = 8;
  const center = 120; // 240x240 box
  const circumference = 2 * Math.PI * radius;
  // Arc calculation: offset based on progress modulo 1 round so multiple rounds cycle beautifully
  const currentRoundProgress = hasTarget ? (zikr.count % target) / target : (zikr.count % 100) / 100;
  const strokeDashoffset = isGoalMet && zikr.count % target === 0
    ? 0
    : circumference - currentRoundProgress * circumference;

  // Knob indicator coordinates
  const knobAngle = currentRoundProgress * 360 - 90;
  const knobRad = (knobAngle * Math.PI) / 180;
  const knobX = center + radius * Math.cos(knobRad);
  const knobY = center + radius * Math.sin(knobRad);

  // Translations
  const transData = zikr.translations?.[selectedLanguage];
  const displayPronunciation =
    (selectedLanguage === 'bn' ? zikr.pronunciationBn : transData?.pronunciation) ||
    transData?.pronunciation ||
    zikr.transliteration ||
    zikr.name;
  const displayMeaning =
    (selectedLanguage === 'bn' ? (zikr.meaningBn || zikr.meaning) : transData?.meaning) ||
    transData?.meaning ||
    zikr.meaningBn ||
    zikr.meaning ||
    '';

  // Persist sound / vib settings
  const toggleSound = () => {
    setSoundActive((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('noor_zikr_focus_sound', String(next));
      } catch {}
      return next;
    });
  };

  const toggleVibration = () => {
    setVibrationActive((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('noor_zikr_focus_vib', String(next));
      } catch {}
      return next;
    });
  };

  // Sound and haptic response on count change
  const triggerIncrement = useCallback(
    (clientX?: number, clientY?: number) => {
      if (soundActive) {
        soundHaptics.playBeadClick();
      }
      if (vibrationActive) {
        soundHaptics.triggerVibration('tap');
      }

      // Check if target is just met
      if (hasTarget && zikr.count + 1 === target) {
        soundHaptics.playTargetChime();
        soundHaptics.triggerVibration('target');
      }

      // Visual particle & bump
      setIsBumping(true);
      setTimeout(() => setIsBumping(false), 180);

      const newId = Date.now() + Math.random();
      if (clientX !== undefined && clientY !== undefined) {
        setParticles((prev) => [
          ...prev.slice(-3),
          { id: newId, x: clientX, y: clientY, val: '+1' },
        ]);
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newId));
        }, 600);
      }

      onIncrement(zikr.id);
    },
    [soundActive, vibrationActive, hasTarget, zikr.count, zikr.id, target, onIncrement]
  );

  const triggerDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zikr.count <= 0) return;
    if (soundActive) soundHaptics.playBeadClick();
    if (vibrationActive) soundHaptics.triggerVibration('decrement');
    onDecrement(zikr.id);
  };

  const triggerReset = () => {
    if (soundActive) soundHaptics.playReset();
    if (vibrationActive) soundHaptics.triggerVibration('reset');
    onReset(zikr);
    setShowResetConfirm(false);
  };

  const playRecitation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (voicePlaying) return;
    setVoicePlaying(true);
    playArabicVoice(zikr.arabic || zikr.name, 'male', () => setVoicePlaying(false));
  };

  const handleNext = () => {
    if (isLocked) {
      flashLockNotice();
      return;
    }
    if (currentIndex < zikrs.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      if (soundActive) soundHaptics.playTap();
    }
  };

  const handlePrev = () => {
    if (isLocked) {
      flashLockNotice();
      return;
    }
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      if (soundActive) soundHaptics.playTap();
    }
  };

  const flashLockNotice = () => {
    setShowLockNotice(true);
    if (lockNoticeTimerRef.current) clearTimeout(lockNoticeTimerRef.current);
    lockNoticeTimerRef.current = setTimeout(() => {
      setShowLockNotice(false);
    }, 2200);
  };

  // Keyboard navigation & space-bar counting
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLocked) {
        onClose();
      } else if (e.key === 'ArrowRight' && !isLocked) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && !isLocked) {
        handlePrev();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        triggerIncrement();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, currentIndex, triggerIncrement]);

  // Touch Swipe Handler
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isLocked) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

    // Horizontal swipe threshold: 45px and more horizontal than vertical
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Handle tap anywhere on container when locked or unlocked
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLocked) {
      // Tap anywhere continues incrementing count safely without leaving the page!
      triggerIncrement(e.clientX, e.clientY);
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none ${
        isDay ? 'bg-slate-900/60 backdrop-blur-md' : 'bg-black/85 backdrop-blur-md'
      }`}
    >
      {/* Floating Micro Particle +1 */}
      {particles.map((p) => (
        <span
          key={p.id}
          style={{ left: p.x - 14, top: p.y - 20 }}
          className="fixed font-black text-xl text-amber-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.8)] pointer-events-none z-[120] animate-out fade-out slide-out-to-top duration-500"
        >
          {p.val}
        </span>
      ))}

      {/* Device-Fitted Phone/Tablet Smart Frame */}
      <div
        onClick={(e) => {
          if (!isLocked) e.stopPropagation();
        }}
        className={`relative w-full h-[100dvh] sm:h-[94dvh] sm:max-h-[820px] sm:max-w-[410px] sm:rounded-[38px] flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 border ${
          isDay
            ? 'bg-gradient-to-b from-[#f9fbfb] via-[#eef6f4] to-[#e4f1ed] text-slate-800 border-emerald-600/30 shadow-emerald-950/20'
            : 'bg-gradient-to-b from-[#061e23] via-[#09292f] to-[#04161a] text-white border-teal-500/20 shadow-black/80'
        }`}
      >
        {/* Glow ambient background aura */}
        <div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none blur-3xl opacity-35 transition-all duration-500 ${
            isGoalMet
              ? 'bg-amber-400'
              : isDay
              ? 'bg-emerald-300'
              : 'bg-teal-500'
          }`}
        />

        {/* ================= 1. SLEEK TOP APP BAR ================= */}
        <div className="relative z-20 px-3.5 pt-3 sm:pt-4 pb-2 flex items-center justify-between gap-1.5 border-b border-white/10 shrink-0">
          {/* Left: Exit button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (isLocked) {
                flashLockNotice();
                return;
              }
              onClose();
            }}
            className={`p-2 rounded-xl active:scale-95 transition-all cursor-pointer border flex items-center justify-center ${
              isLocked
                ? 'opacity-40 cursor-not-allowed bg-black/20 border-white/5 text-slate-400'
                : isDay
                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-xs'
                : 'bg-white/10 hover:bg-white/15 border-white/10 text-white'
            }`}
            title={isLocked ? 'লক করা আছে' : 'Exit Focus Mode'}
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Center: Index pill & quick sound/vib controls */}
          <div className="flex items-center gap-1.5 bg-black/15 px-2.5 py-1 rounded-full border border-white/10">
            <span
              className={`text-[11px] font-black tracking-wider uppercase font-mono ${
                isDay ? 'text-emerald-800' : 'text-emerald-300'
              }`}
            >
              #{String(currentIndex + 1).padStart(2, '0')} / {String(zikrs.length).padStart(2, '0')}
            </span>

            <span className="w-1 h-1 rounded-full bg-white/20" />

            {/* Sound Mute/Unmute */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSound();
              }}
              className={`p-1 rounded-md transition-colors ${
                soundActive ? 'text-emerald-400' : 'text-slate-400 opacity-60'
              }`}
              title={soundActive ? 'শব্দ বন্ধ করুন' : 'শব্দ চালু করুন'}
            >
              {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Vibration Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleVibration();
              }}
              className={`p-1 rounded-md transition-colors ${
                vibrationActive ? 'text-amber-400' : 'text-slate-400 opacity-60'
              }`}
              title={vibrationActive ? 'ভাইব্রেশন বন্ধ করুন' : 'ভাইব্রেশন চালু করুন'}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Reset & Lock buttons */}
          <div className="flex items-center gap-1">
            {/* Quick Reset Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (isLocked) {
                  flashLockNotice();
                  return;
                }
                setShowResetConfirm(true);
              }}
              className={`p-2 rounded-xl active:scale-95 transition-all cursor-pointer border flex items-center justify-center ${
                isLocked
                  ? 'opacity-30 cursor-not-allowed bg-black/20 border-white/5 text-slate-400'
                  : isDay
                  ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-xs'
                  : 'bg-white/10 hover:bg-white/15 border-white/10 text-white'
              }`}
              title="কাউন্টার রিসেট (০ করুন)"
            >
              <RotateCcw className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Lock / Unlock Toggle Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLocked((prev) => {
                  const next = !prev;
                  if (next) {
                    flashLockNotice();
                  }
                  if (soundActive) soundHaptics.playTap();
                  if (vibrationActive) soundHaptics.triggerVibration('tap');
                  return next;
                });
              }}
              className={`px-2.5 py-1.5 rounded-xl active:scale-95 transition-all cursor-pointer flex items-center gap-1 border shadow-xs ${
                isLocked
                  ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-amber-500/40 ring-2 ring-amber-400/40 animate-pulse'
                  : isDay
                  ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                  : 'bg-white/10 hover:bg-white/15 border-white/10 text-white'
              }`}
              title={isLocked ? 'আনলক করুন' : 'স্ক্রিন লক করুন'}
            >
              {isLocked ? (
                <>
                  <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Locked</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5 stroke-[2]" />
                  <span className="text-[10px] font-bold text-slate-300">Lock</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Lock Screen Floating Banner / Notice */}
        {showLockNotice && (
          <div className="absolute top-14 left-4 right-4 z-40 bg-amber-500/95 text-slate-950 font-extrabold text-xs py-2 px-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-2 border border-amber-300 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 shrink-0" />
              <span>
                {selectedLanguage === 'bn'
                  ? '🔒 স্ক্রিন লক করা আছে — যেকোনো স্থানে ট্যাপ করে গণনা করুন!'
                  : '🔒 Screen Locked — Tap anywhere to count!'}
              </span>
            </div>
            <button
              onClick={() => setShowLockNotice(false)}
              className="text-slate-900 hover:text-black p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Reset Confirmation Overlay Modal */}
        {showResetConfirm && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-150"
          >
            <div
              className={`p-5 rounded-3xl max-w-xs w-full text-center border shadow-2xl space-y-3.5 ${
                isDay ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#09292f] border-teal-700/60 text-white'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center bg-red-500/15 text-red-500 border border-red-500/30">
                <RotateCcw className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-extrabold text-base">
                {selectedLanguage === 'bn' ? 'কাউন্টার রিসেট করবেন?' : 'Reset this Counter?'}
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                {selectedLanguage === 'bn'
                  ? `"${displayPronunciation}" এর বর্তমান গণনা (${zikr.count}) শূন্য (০) হবে।`
                  : `Current count (${zikr.count}) will be reset to 0.`}
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs border ${
                    isDay ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-white/10 text-white border-white/10'
                  }`}
                >
                  {selectedLanguage === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={triggerReset}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-900/30"
                >
                  {selectedLanguage === 'bn' ? 'হ্যাঁ, রিসেট' : 'Yes, Reset'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. ZIKR TYPOGRAPHY (Arabic & Meaning) ================= */}
        <div className="relative z-10 px-4 pt-2 pb-1 text-center flex flex-col items-center justify-center shrink-0 space-y-1">
          {/* Arabic Calligraphy with Recitation Speaker button */}
          <div className="flex items-center justify-center gap-2 max-w-full">
            <h2
              dir="rtl"
              className={`font-arabic font-extrabold select-none transition-all duration-300 drop-shadow-sm leading-snug break-words ${
                (zikr.arabic || '').length > 70
                  ? 'text-lg sm:text-xl'
                  : (zikr.arabic || '').length > 35
                  ? 'text-2xl sm:text-3xl'
                  : 'text-3xl sm:text-4xl'
              } ${isDay ? 'text-[#063e32]' : 'text-emerald-100'}`}
            >
              {zikr.arabic || zikr.name}
            </h2>

            {/* Audio Recitation Speaker Icon */}
            <button
              type="button"
              onClick={playRecitation}
              className={`p-1.5 rounded-xl active:scale-95 transition cursor-pointer shrink-0 border ${
                voicePlaying
                  ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                  : isDay
                  ? 'bg-emerald-50 text-[#006747] border-emerald-200'
                  : 'bg-white/10 text-emerald-300 border-white/10'
              }`}
              title="আরবি তিলাওয়াত শুনুন"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pronunciation in Radiant Golden Amber */}
          <div className="font-extrabold text-sm sm:text-base text-amber-500 dark:text-amber-400 tracking-wide drop-shadow-xs line-clamp-1">
            {displayPronunciation}
          </div>

          {/* Meaning (Compact, clear) */}
          {displayMeaning && (
            <p className="text-[11px] sm:text-xs leading-tight opacity-80 line-clamp-2 px-2 max-w-sm">
              <span className="font-bold text-[#007e8a] dark:text-teal-300">
                {selectedLanguage === 'bn' ? 'অর্থ: ' : 'Meaning: '}
              </span>
              <span>{displayMeaning}</span>
            </p>
          )}
        </div>

        {/* ================= 3. CIRCULAR SMART TASBEEH GAUGE (Centerpiece) ================= */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-1 sm:py-2 px-4">
          <div
            onClick={(e) => {
              e.stopPropagation();
              triggerIncrement(e.clientX, e.clientY);
            }}
            className={`relative w-[210px] h-[210px] sm:w-[230px] sm:h-[230px] rounded-full flex flex-col items-center justify-center cursor-pointer transition-transform duration-100 active:scale-[0.97] group ${
              isDay ? 'bg-white shadow-xl shadow-emerald-900/10' : 'bg-[#06242a] shadow-2xl shadow-black/70'
            }`}
          >
            {/* SVG Circular Dial Arc */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 240 240"
            >
              <defs>
                {/* Arc Gradient */}
                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                {/* Knob Glow Filter */}
                <filter id="knobGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Guide Ring */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={isDay ? '#e2ece8' : 'rgba(20, 184, 166, 0.14)'}
                strokeWidth={strokeWidth}
              />

              {/* Dynamic Progress Stroke */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="url(#gaugeGrad)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
              />

              {/* Glowing Bead Knob on Circumference */}
              {zikr.count > 0 && (
                <g filter="url(#knobGlow)">
                  <circle
                    cx={knobX}
                    cy={knobY}
                    r={7}
                    fill="#F59E0B"
                    stroke="#ffffff"
                    strokeWidth={2}
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={knobX}
                    cy={knobY}
                    r={12}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth={1}
                    opacity={0.6}
                  />
                </g>
              )}
            </svg>

            {/* Inner Dial Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center select-none space-y-1">
              {/* Round / Cycle badge */}
              <div className="flex items-center gap-1">
                {isGoalMet ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{selectedLanguage === 'bn' ? 'সম্পন্ন' : 'Completed'}</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-60">
                    {selectedLanguage === 'bn' ? `চক্র: ${rounds + 1}` : `Round: ${rounds + 1}`}
                  </span>
                )}
              </div>

              {/* Giant Digital Count Number */}
              <div
                className={`font-mono font-black tracking-tight leading-none transition-all duration-150 drop-shadow-sm ${
                  isBumping ? 'scale-110 text-amber-400' : isDay ? 'text-slate-900' : 'text-white'
                } ${
                  zikr.count >= 10000
                    ? 'text-4xl sm:text-5xl'
                    : zikr.count >= 1000
                    ? 'text-5xl sm:text-6xl'
                    : 'text-6xl sm:text-7xl'
                }`}
              >
                {zikr.count.toLocaleString()}
              </div>

              {/* Target / Progress Pill */}
              <div
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  isDay
                    ? 'bg-slate-100 text-slate-600 border-slate-200'
                    : 'bg-black/30 text-teal-200 border-teal-800/60'
                }`}
              >
                {hasTarget ? `${zikr.count} / ${target}` : `${progressPercent}%`}
              </div>
            </div>

            {/* Tap Ripple Effect Inside Dial */}
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{ left: ripple.x, top: ripple.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-teal-400/20 pointer-events-none animate-ripple"
              />
            ))}
          </div>

          {/* Micro hint below dial */}
          <p className="text-[10px] tracking-wider uppercase opacity-50 font-bold mt-2 select-none">
            {isLocked
              ? selectedLanguage === 'bn'
                ? '🔒 লক সক্রিয় • স্ক্রিনের যেকোনো স্থানে ট্যাপ করুন'
                : '🔒 Locked • Tap anywhere to count'
              : selectedLanguage === 'bn'
              ? 'চক্রে ট্যাপ করুন বা নিচের বাটনে চাপুন'
              : 'Tap ring or button to count'}
          </p>
        </div>

        {/* ================= 4. CONTROLS, ACTIONS & NAVIGATION ================= */}
        <div className="relative z-20 px-4 pt-2 pb-4 sm:pb-5 space-y-2.5 shrink-0 border-t border-white/10 bg-black/10 backdrop-blur-xs">
          {/* Main Large +1 Count Button & Decrement button */}
          <div className="flex items-center gap-2">
            {/* -1 Decrement button */}
            <button
              type="button"
              onClick={triggerDecrement}
              disabled={zikr.count <= 0 || isLocked}
              className={`p-3.5 rounded-2xl font-bold transition active:scale-95 disabled:opacity-30 cursor-pointer border flex items-center justify-center shrink-0 ${
                isDay
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/10'
              }`}
              title="১ কমান (-1)"
            >
              <Minus className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* +1 Primary Big Tactile Count Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerIncrement(e.clientX, e.clientY);
              }}
              className="flex-1 py-3.5 sm:py-4 rounded-2xl font-black text-sm sm:text-base tracking-wide shadow-lg shadow-emerald-900/30 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-[#006747] via-[#007a52] to-[#008763] hover:from-[#005439] hover:to-[#006e4c] text-white border-none"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
              <span>
                +১ {selectedLanguage === 'bn' ? 'গণনা' : 'Count'} ({displayPronunciation})
              </span>
            </button>
          </div>

          {/* Navigation Bar (Prev < ••• > Next) */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            {/* Previous Zikr button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              disabled={currentIndex === 0 || isLocked}
              className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 transition active:scale-95 disabled:opacity-30 cursor-pointer border ${
                isDay
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/10'
              }`}
              title={currentIndex > 0 ? zikrs[currentIndex - 1]?.pronunciationBn || 'Previous' : ''}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{selectedLanguage === 'bn' ? 'পূর্বের' : 'Prev'}</span>
            </button>

            {/* Horizontal Pagination Dots */}
            <div className="flex items-center justify-center gap-1 overflow-x-auto max-w-[150px] py-1 scrollbar-none">
              {zikrs.map((item, idx) => {
                const isActive = idx === currentIndex;
                const isItemDone = item.target && item.count >= item.target;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isLocked) {
                        flashLockNotice();
                        return;
                      }
                      setCurrentIndex(idx);
                      if (soundActive) soundHaptics.playTap();
                    }}
                    className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'w-5 bg-emerald-400 shadow-sm'
                        : isItemDone
                        ? 'w-2 bg-amber-400'
                        : isDay
                        ? 'w-2 bg-slate-300'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    title={item.pronunciationBn || item.name}
                  />
                );
              })}
            </div>

            {/* Next Zikr button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              disabled={currentIndex === zikrs.length - 1 || isLocked}
              className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 transition active:scale-95 disabled:opacity-30 cursor-pointer border ${
                isDay
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/10'
              }`}
              title={currentIndex < zikrs.length - 1 ? zikrs[currentIndex + 1]?.pronunciationBn || 'Next' : ''}
            >
              <span>{selectedLanguage === 'bn' ? 'পরের' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Grand Cumulative Total Dhikr Status Bar */}
          <div className="flex items-center justify-between text-[11px] font-bold pt-1 px-1 opacity-75 border-t border-white/5">
            <span className={isDay ? 'text-slate-600' : 'text-emerald-200/90'}>
              {selectedLanguage === 'bn' ? '📊 মোট সর্বমোট জিকির:' : '📊 Grand Total Dhikr:'}
            </span>
            <span className="font-mono font-black text-amber-400">
              {totalCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
