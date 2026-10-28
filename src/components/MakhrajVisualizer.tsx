import React, { useState, useEffect } from 'react';
import {
  MakhrajData,
  MAKHRAJ_REGIONS,
  VocalOrgan,
  ARABIC_LETTERS_MAKHRAJ,
  getWordMakhrajInfo,
  getMaddInfo,
  getMultiLetterCallouts,
  MultiLetterCallout,
  MaddRuleInfo,
} from '../utils/tajweedMakhraj';
import { ZikrLanguage } from '../types';
import { Sparkles, X, Volume2, Info, ChevronRight, Layers, Play, RefreshCw, Zap } from 'lucide-react';

interface MakhrajVisualizerProps {
  activeArabicWord?: string;
  activeLetter?: string;
  isDay?: boolean;
  selectedLanguage?: ZikrLanguage | 'bn' | 'en';
  onClose?: () => void;
  isCompact?: boolean;
}

// Canonical letter list for interactive explorer
const ARABIC_ALPHABET_ORDER = [
  'ء', 'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ',
  'د', 'ذ', 'ر', 'ز', 'س', 'শ', 'ص', 'ض',
  'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل',
  'م', 'ن', 'ه', 'و', 'ي',
];

// Dynamic morphing tongue path generator
const getTonguePath = (organ: VocalOrgan) => {
  switch (organ) {
    case 'tongue_tip':
      return 'M 130,205 C 135,175 160,146 218,144 C 218,152 198,162 150,210 Z';
    case 'tongue_mid':
      return 'M 130,205 C 150,142 178,134 210,150 C 205,158 180,166 150,210 Z';
    case 'tongue_root':
      return 'M 130,205 C 142,136 165,146 205,152 C 195,162 160,172 150,210 Z';
    default:
      return 'M 130,205 C 135,175 145,155 170,152 C 185,150 200,148 215,148 C 215,154 205,162 195,166 C 175,174 160,188 150,210 Z';
  }
};

// Dynamic lips morphing
const getLipsPath = (organ: VocalOrgan) => {
  if (organ === 'lips') {
    return {
      top: 'M 228,150 C 238,152 242,156 236,158',
      bottom: 'M 228,164 C 238,162 242,158 236,158',
    };
  }
  return {
    top: 'M 230,148 C 242,148 248,154 238,158',
    bottom: 'M 230,166 C 242,166 248,162 238,158',
  };
};

export const MakhrajVisualizer: React.FC<MakhrajVisualizerProps> = ({
  activeArabicWord = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
  activeLetter: propActiveLetter,
  isDay = false,
  selectedLanguage = 'bn',
  onClose,
  isCompact = false,
}) => {
  const [manualLetter, setManualLetter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'callouts' | 'madd' | 'single' | 'explorer'>('callouts');
  const [isStretchingAudio, setIsStretchingAudio] = useState<boolean>(false);
  const [activeAlifCount, setActiveAlifCount] = useState<number>(0);

  // Derive active letter info from active word or manual selection
  const wordInfo = activeArabicWord ? getWordMakhrajInfo(activeArabicWord) : null;
  const maddInfo = getMaddInfo(activeArabicWord);
  const multiCallouts = getMultiLetterCallouts(activeArabicWord);

  const currentLetterChar = manualLetter || propActiveLetter || wordInfo?.primaryLetter?.letter || 'ر';
  const makhrajData: MakhrajData | undefined = ARABIC_LETTERS_MAKHRAJ[currentLetterChar] || wordInfo?.primaryLetter || ARABIC_LETTERS_MAKHRAJ['ر'];

  const organData = makhrajData ? MAKHRAJ_REGIONS[makhrajData.organ] : null;
  const coords = makhrajData?.coords || { x: 202, y: 146 };

  const tonguePath = getTonguePath(makhrajData?.organ || 'tongue_tip');
  const lipsPath = getLipsPath(makhrajData?.organ || 'tongue_tip');

  // Madd stretch count simulation timer
  useEffect(() => {
    let interval: any;
    if (isStretchingAudio) {
      setActiveAlifCount(1);
      const totalCounts = maddInfo.countMetrics || 2;
      interval = setInterval(() => {
        setActiveAlifCount((prev) => {
          if (prev >= totalCounts) {
            setIsStretchingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 450);
    } else {
      setActiveAlifCount(0);
    }
    return () => clearInterval(interval);
  }, [isStretchingAudio, maddInfo.countMetrics]);

  return (
    <div
      className={`rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 flex flex-col ${
        isDay
          ? 'bg-white/95 border-emerald-200 text-slate-900 shadow-emerald-950/15'
          : 'bg-[#091820]/95 border-emerald-500/30 text-white shadow-black/80'
      } ${isCompact ? 'w-full max-w-sm' : 'w-full max-w-xl'}`}
    >
      {/* Visualizer Top Bar */}
      <div
        className={`px-4 py-3 border-b flex items-center justify-between shrink-0 ${
          isDay ? 'bg-emerald-50/70 border-emerald-100' : 'bg-[#061218] border-emerald-900/40'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm shadow-inner">
            🗣️
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs sm:text-sm font-extrabold tracking-tight">
                {selectedLanguage === 'bn' ? 'লাইভ মাখরাজ ও তান অ্যানিমেশন' : 'Live Makhraj & Madd Stretch'}
              </h4>
              <span className="px-1.5 py-0.2 rounded-md bg-emerald-500 text-white text-[9px] font-bold font-mono uppercase animate-pulse">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-emerald-400 font-medium">
              {selectedLanguage === 'bn' ? 'কণ্ঠ ও মুখের স্থানভিত্তিক ৩ডি পয়েন্টার ও দীর্ঘ টানা ধ্বনি' : '3D anatomical callouts & vowel stretch flow'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Tab Switcher */}
          <div className="flex items-center p-0.5 rounded-xl bg-black/10 dark:bg-white/10 text-[10px] font-bold gap-0.5">
            <button
              onClick={() => setActiveTab('callouts')}
              className={`px-2 py-1 rounded-lg transition-all ${
                activeTab === 'callouts' ? 'bg-[#008763] text-white shadow-md scale-105' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {selectedLanguage === 'bn' ? 'পয়েন্টার' : 'Callouts'}
            </button>
            <button
              onClick={() => setActiveTab('madd')}
              className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
                activeTab === 'madd' ? 'bg-pink-600 text-white shadow-md scale-105' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <span>{selectedLanguage === 'bn' ? 'টান' : 'Madd'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping inline-block" />
            </button>
            <button
              onClick={() => setActiveTab('single')}
              className={`px-2 py-1 rounded-lg transition-all ${
                activeTab === 'single' ? 'bg-[#008763] text-white shadow-md scale-105' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {selectedLanguage === 'bn' ? 'একক' : 'Single'}
            </button>
            <button
              onClick={() => setActiveTab('explorer')}
              className={`px-2 py-1 rounded-lg transition-all ${
                activeTab === 'explorer' ? 'bg-[#008763] text-white shadow-md scale-105' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {selectedLanguage === 'bn' ? 'সব' : 'All'}
            </button>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 space-y-3">
        {/* Active Phrase Calligraphy Display Header (Matches image_2f033692.png) */}
        <div
          className={`p-3 rounded-2xl border text-center relative overflow-hidden ${
            isDay
              ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-emerald-200'
              : 'bg-gradient-to-r from-[#061820] via-[#09222c] to-[#061820] border-emerald-900/60'
          }`}
        >
          <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block mb-0.5 tracking-wider">
            {selectedLanguage === 'bn' ? 'পঠিত শব্দ/আয়াত তিলাওয়াত:' : 'Active Recited Phrase:'}
          </span>
          <div className="font-arabic text-2xl sm:text-3xl font-bold leading-relaxed text-emerald-700 dark:text-emerald-200 drop-shadow-sm dir-rtl">
            {activeArabicWord}
          </div>

          {/* Madd rule badge summary */}
          {maddInfo.isMadd && (
            <div className="mt-1.5 flex items-center justify-center gap-2">
              <span
                style={{ backgroundColor: `${maddInfo.color}25`, borderColor: maddInfo.color, color: maddInfo.color }}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 shadow-sm"
              >
                <Zap className="w-3 h-3 animate-pulse" />
                <span>{maddInfo.typeBn}</span>
                <span className="font-mono">({maddInfo.countMetrics} মাত্রা / {maddInfo.countAlif} আলিফ)</span>
              </span>
            </div>
          )}
        </div>

        {/* ======================================================================= */}
        {/* TAB 1: MULTI-LETTER ANATOMICAL CALLOUT POINTER DIAGRAM (image_2f033692.png) */}
        {/* ======================================================================= */}
        {activeTab === 'callouts' && (
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden p-2 bg-[#020e12] border border-emerald-900/60 shadow-2xl flex flex-col items-center">
              <div className="w-full flex items-center justify-between px-2 pt-1 pb-1">
                <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  VOCAL TRACT SAGITTAL VIEW (ANATOMY)
                </span>
                <span className="px-2 py-0.5 rounded-md bg-black/60 border border-amber-500/40 text-[10px] font-bold text-amber-300 font-arabic">
                  مخارج الحروف
                </span>
              </div>

              {/* Main SVG Container with Side Callout Overlay */}
              <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-2 items-center my-1">
                {/* SVG Anatomy Canvas */}
                <div className="md:col-span-7 flex justify-center relative">
                  <svg viewBox="0 0 300 280" className="w-full max-w-[280px] sm:max-w-[310px] h-auto drop-shadow-2xl select-none">
                    <defs>
                      <radialGradient id="multiBeacon" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
                        <stop offset="100%" stopColor="#047857" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Silhouette Outline */}
                    <path
                      d="M 60,30 C 140,15 220,25 240,65 C 255,90 270,115 260,135 C 255,145 248,150 248,154 C 246,160 236,160 236,164 C 236,168 248,168 244,175 C 238,185 220,195 210,205 C 195,215 180,240 175,270 L 85,270 C 80,240 85,180 85,140 C 85,90 70,60 60,30 Z"
                      fill="#061c22"
                      stroke="#0d4a46"
                      strokeWidth="2.5"
                    />

                    {/* Nasal Cavity Dotted Line */}
                    <path
                      d="M 180,75 C 220,70 235,100 220,115 C 200,125 170,120 160,105 Z"
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                    />
                    <text x="175" y="98" fill="#5eead4" fontSize="8" fontWeight="bold">
                      الخيشوم (নাসিকা)
                    </text>

                    {/* Hard Palate Arc (Yellow) */}
                    <path d="M 140,140 C 170,125 205,128 220,140" fill="none" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />

                    {/* Teeth */}
                    <rect x="220" y="140" width="6" height="10" rx="2" fill="#f8fafc" />
                    <rect x="218" y="156" width="6" height="10" rx="2" fill="#f8fafc" />

                    {/* Tongue Outline */}
                    <path
                      d="M 130,205 C 135,175 145,155 170,152 C 185,150 200,148 215,148 C 215,154 205,162 195,166 C 175,174 160,188 150,210 Z"
                      fill="rgba(16, 185, 129, 0.75)"
                      stroke="#34d399"
                      strokeWidth="2.5"
                    />
                    <text x="165" y="180" fill="#a7f3d0" fontSize="9" fontWeight="bold">
                      اللسان (জিহ্বা)
                    </text>

                    {/* Throat Line */}
                    <path d="M 120,165 L 120,265" stroke="#ef4444" strokeWidth="3" opacity="0.9" />

                    {/* Lips */}
                    <path d={lipsPath.top} fill="none" stroke="#f43f5e" strokeWidth="4.5" strokeLinecap="round" />
                    <path d={lipsPath.bottom} fill="none" stroke="#f43f5e" strokeWidth="4.5" strokeLinecap="round" />

                    {/* MULTI-LETTER CALLOUT BADGES & POINTER ARROWS (Matching image_2f033692.png) */}
                    {multiCallouts.map((c, idx) => (
                      <g key={idx}>
                        {/* Articulation point glowing halo */}
                        <circle
                          cx={c.coords.x}
                          cy={c.coords.y}
                          r="15"
                          fill={c.color}
                          opacity="0.35"
                          className="animate-ping"
                          style={{ animationDuration: `${1.5 + idx * 0.3}s` }}
                        />
                        <circle cx={c.coords.x} cy={c.coords.y} r="11" fill={c.color} stroke="#ffffff" strokeWidth="2" />
                        <text
                          x={c.coords.x}
                          y={c.coords.y + 4}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="extrabold"
                          fontFamily="Amiri, serif"
                        >
                          {c.letter}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Right Side HUD Cards & Pointing Arrows List (Exact match to image_2f033692.png) */}
                <div className="md:col-span-5 space-y-1.5 p-1">
                  {multiCallouts.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => setManualLetter(c.letter)}
                      className="p-2 rounded-xl bg-[#061820]/90 border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer flex items-start gap-2 shadow-md group"
                    >
                      <div
                        style={{ backgroundColor: c.color }}
                        className="w-6 h-6 rounded-full text-white flex items-center justify-center font-arabic font-bold text-xs shrink-0 shadow-sm mt-0.5"
                      >
                        {c.letter}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-extrabold text-white flex items-center gap-1">
                          <span>{c.nameBn} ({c.nameEn})</span>
                        </div>
                        <p className="text-[10px] text-slate-300 font-medium leading-tight">
                          {c.actionBn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 2: MADD & VOWEL STRETCH FLOW ANIMATION (টান অ্যানিমেশন - 1 to 6 Counts) */}
        {/* ======================================================================= */}
        {activeTab === 'madd' && (
          <div className="space-y-3">
            <div
              className={`p-4 rounded-2xl border ${
                isDay
                  ? 'bg-gradient-to-b from-pink-50 to-emerald-50 border-pink-200 text-slate-900'
                  : 'bg-gradient-to-b from-[#1a0814] to-[#061820] border-pink-500/40 text-white'
              }`}
            >
              <div className="flex items-center justify-between border-b border-pink-500/20 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-sm">
                    🔊
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-pink-600 dark:text-pink-300">
                      {maddInfo.typeBn}
                    </h4>
                    <p className="text-[10px] opacity-80">
                      {selectedLanguage === 'bn' ? 'টানার নিয়ম: স্বরধ্বনি প্রসারিত করার সঠিক পরিমাপ' : 'Vowel Elongation Stretch Metric'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsStretchingAudio(!isStretchingAudio)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer ${
                    isStretchingAudio
                      ? 'bg-pink-600 text-white ring-2 ring-pink-400 scale-105 animate-pulse'
                      : 'bg-[#008763] text-white hover:bg-emerald-600'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isStretchingAudio ? 'টানা হচ্ছে...' : 'টান প্লে করুন'}</span>
                </button>
              </div>

              {/* Breath Airflow & Sound Wave Graphic */}
              <div className="relative h-24 rounded-2xl bg-[#020b0e] border border-pink-500/30 overflow-hidden flex items-center justify-center p-2 mb-3 shadow-inner">
                {/* Airflow Column Expansion */}
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500/30 via-emerald-500/40 to-amber-500/50 transition-all duration-300 ${
                    isStretchingAudio ? 'w-full opacity-100' : 'w-1/3 opacity-30'
                  }`}
                />

                {/* Pulsing Ripple Rings */}
                <div className="relative z-10 flex items-center gap-2">
                  {[1, 2, 3, 4, 5, 6].slice(0, maddInfo.countMetrics || 2).map((num) => {
                    const isActive = activeAlifCount >= num || !isStretchingAudio;
                    return (
                      <div
                        key={num}
                        className={`w-9 h-9 rounded-2xl flex flex-col items-center justify-center font-bold text-xs transition-all duration-300 ${
                          activeAlifCount === num
                            ? 'bg-pink-500 text-white scale-125 ring-4 ring-pink-300 shadow-xl'
                            : isActive
                            ? 'bg-[#008763] text-white opacity-90'
                            : 'bg-white/10 text-slate-400 opacity-40'
                        }`}
                      >
                        <span className="text-[10px] font-mono">{num}</span>
                        <span className="text-[8px] opacity-90">মাত্রা</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation Note */}
              <div className="p-3 rounded-xl bg-black/20 text-xs leading-relaxed space-y-1">
                <p className="font-semibold opacity-95">
                  📌 {maddInfo.descriptionBn}
                </p>
                <p className="text-[11px] opacity-80 text-pink-400 font-mono">
                  সময়সীমা: {maddInfo.countMetrics} মাত্রা ({maddInfo.countAlif} আলিফ টেনে পড়ার সময়)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 3: SINGLE FOCUS LETTER DETAILS */}
        {/* ======================================================================= */}
        {activeTab === 'single' && (
          <div className="space-y-3">
            {/* ANATOMICAL VOCAL TRACT CROSS-SECTION SVG */}
            <div className="relative flex flex-col items-center justify-center rounded-2xl overflow-hidden p-2 bg-[#021014] border border-emerald-900/50 shadow-inner">
              <div className="w-full flex items-center justify-between px-2 pt-1">
                <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  VOCAL TRACT SAGITTAL VIEW
                </span>
                <span className="px-2 py-0.5 rounded-md bg-black/60 border border-amber-500/40 text-[10px] font-bold text-amber-300 font-arabic">
                  مخارج الحروف
                </span>
              </div>

              {/* SVG Canvas */}
              <svg viewBox="0 0 300 280" className="w-full max-w-[280px] sm:max-w-[320px] h-auto drop-shadow-xl select-none my-1">
                <defs>
                  <radialGradient id="singleBeacon" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
                    <stop offset="40%" stopColor="#059669" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Silhouette Outline */}
                <path
                  d="M 60,30 C 140,15 220,25 240,65 C 255,90 270,115 260,135 C 255,145 248,150 248,154 C 246,160 236,160 236,164 C 236,168 248,168 244,175 C 238,185 220,195 210,205 C 195,215 180,240 175,270 L 85,270 C 80,240 85,180 85,140 C 85,90 70,60 60,30 Z"
                  fill="#061c22"
                  stroke="#0d4a46"
                  strokeWidth="2.5"
                />

                {/* Nasal Cavity Dotted Line */}
                <path
                  d="M 180,75 C 220,70 235,100 220,115 C 200,125 170,120 160,105 Z"
                  fill={makhrajData?.organ === 'nasal' ? 'rgba(139, 92, 246, 0.3)' : 'none'}
                  stroke="#2dd4bf"
                  strokeWidth="1.5"
                  strokeDasharray="3,3"
                />
                <text x="175" y="98" fill="#5eead4" fontSize="8" fontWeight="bold">
                  الخيشوم (নাসিকা)
                </text>

                {/* Hard Palate Arc */}
                <path d="M 140,140 C 170,125 205,128 220,140" fill="none" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />

                {/* Teeth */}
                <rect x="220" y="140" width="6" height="10" rx="2" fill="#f8fafc" />
                <rect x="218" y="156" width="6" height="10" rx="2" fill="#f8fafc" />

                {/* DYNAMIC MORPHING TONGUE */}
                <path
                  d={tonguePath}
                  fill="rgba(16, 185, 129, 0.85)"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  style={{ transition: 'd 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                />
                <text x="165" y="180" fill="#a7f3d0" fontSize="9" fontWeight="bold">
                  اللسان (জিহ্বা)
                </text>

                {/* Throat Line */}
                <path d="M 120,165 L 120,265" stroke="#ef4444" strokeWidth="3" opacity="0.9" />

                {/* LIPS */}
                <path d={lipsPath.top} fill="none" stroke="#f43f5e" strokeWidth="4.5" strokeLinecap="round" />
                <path d={lipsPath.bottom} fill="none" stroke="#f43f5e" strokeWidth="4.5" strokeLinecap="round" />

                {/* ACTIVE ARTICULATION BEACON */}
                <g>
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="24"
                    fill="none"
                    stroke={organData?.color || '#34d399'}
                    strokeWidth="2.5"
                    className="animate-ping"
                    style={{ transformOrigin: `${coords.x}px ${coords.y}px`, animationDuration: '1.2s' }}
                  />
                  <circle cx={coords.x} cy={coords.y} r="14" fill="url(#singleBeacon)" opacity="0.95" />
                  <circle cx={coords.x} cy={coords.y} r="6.5" fill="#ffffff" stroke="#008763" strokeWidth="2.5" className="animate-pulse" />

                  {/* Active letter badge */}
                  <g transform={`translate(${coords.x + 10}, ${coords.y - 12})`}>
                    <rect x="-1" y="-15" width="22" height="22" rx="6" fill="#008763" stroke="#34d399" strokeWidth="1.5" />
                    <text x="10" y="1" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="Amiri, serif">
                      {makhrajData?.letter}
                    </text>
                  </g>
                </g>
              </svg>
            </div>

            {/* MAKHRAJ DETAILS HUD CARD */}
            {makhrajData && (
              <div
                className={`p-3.5 rounded-2xl border space-y-2.5 transition-all ${
                  isDay
                    ? 'bg-emerald-50/80 border-emerald-200 text-slate-800'
                    : 'bg-[#081f26] border-teal-800/50 text-white'
                }`}
              >
                <div className="flex items-center justify-between border-b pb-2 border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl bg-[#008763] text-white flex items-center justify-center font-arabic text-2xl font-black shadow-md">
                      {makhrajData.letter}
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold flex items-center gap-1.5">
                        <span>হরফ: {makhrajData.nameBn}</span>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                          ({makhrajData.nameEn})
                        </span>
                      </h4>
                      <p className="text-[10px] text-amber-500 font-extrabold uppercase tracking-wider">
                        মাখরাজ নম্বর #{makhrajData.makhrajNumber} • {makhrajData.organNameBn}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-xl text-xs font-bold font-arabic bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                    {organData?.arabicName}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">📍 স্থান:</span>
                    <p className="leading-snug font-medium opacity-95">
                      {selectedLanguage === 'bn' ? makhrajData.locationBn : makhrajData.locationEn}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 pt-1 border-t border-emerald-500/15">
                    <span className="text-amber-500 font-bold shrink-0">✨ সিফাত:</span>
                    <p className="leading-snug font-medium opacity-90 text-[11px]">
                      {selectedLanguage === 'bn' ? makhrajData.sifatBn : makhrajData.sifatEn}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 4: ALL LETTERS EXPLORER GRID */}
        {/* ======================================================================= */}
        {activeTab === 'explorer' && (
          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-bold text-slate-500 dark:text-teal-300">
              {selectedLanguage === 'bn' ? 'হরফে ট্যাপ করে মাখরাজ পরীক্ষা করুন:' : 'Tap any letter to test Makhraj:'}
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-8 gap-1.5 max-h-40 overflow-y-auto p-1 scrollbar-none">
              {ARABIC_ALPHABET_ORDER.map((char) => {
                const isSelected = makhrajData?.letter === char;
                return (
                  <button
                    key={char}
                    onClick={() => {
                      setManualLetter(char);
                      setActiveTab('single');
                    }}
                    className={`h-9 rounded-xl font-arabic font-bold text-base transition-all active:scale-95 cursor-pointer flex items-center justify-center border ${
                      isSelected
                        ? 'bg-[#008763] text-white border-emerald-400 ring-2 ring-emerald-400 shadow-md scale-105'
                        : isDay
                        ? 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300 hover:bg-emerald-50'
                        : 'bg-[#06141a] border-white/10 text-slate-200 hover:border-emerald-500 hover:bg-[#0a232e]'
                    }`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ========================================================================================= */
/* INLINE AYAH LINE MAKHRAJ & MADD DIAGRAM (DIRECT MATCH TO image_2f033692.png)               */
/* ========================================================================================= */
interface AyahMouthCardProps {
  arabicWord?: string;
  isDay?: boolean;
  selectedLanguage?: ZikrLanguage | 'bn' | 'en';
  onClickExpand?: () => void;
}

export const AyahMouthCard: React.FC<AyahMouthCardProps> = ({
  arabicWord = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
  isDay = false,
  selectedLanguage = 'bn',
  onClickExpand,
}) => {
  const [activeInlineView, setActiveInlineView] = useState<'callouts' | 'madd'>('callouts');
  const multiCallouts = getMultiLetterCallouts(arabicWord);
  const maddInfo = getMaddInfo(arabicWord);
  const wordInfo = getWordMakhrajInfo(arabicWord);
  const makhrajData = wordInfo.primaryLetter || ARABIC_LETTERS_MAKHRAJ['ر'];
  const organData = MAKHRAJ_REGIONS[makhrajData.organ];

  return (
    <div
      className={`rounded-2xl border overflow-hidden shadow-xl transition-all duration-300 my-3 group ${
        isDay
          ? 'bg-white border-emerald-200 hover:border-emerald-400'
          : 'bg-[#030e12] border-emerald-900/60 hover:border-emerald-500/80 shadow-black/80'
      }`}
    >
      {/* Top Header & Toggle Switch */}
      <div className="p-2.5 bg-[#021014] border-b border-emerald-900/50 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
            VOCAL TRACT & MADD STRETCH
          </span>
        </div>

        {/* View Switcher Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveInlineView('callouts')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              activeInlineView === 'callouts'
                ? 'bg-[#008763] text-white shadow-sm'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            {selectedLanguage === 'bn' ? 'পয়েন্টার' : 'Callouts'}
          </button>
          <button
            onClick={() => setActiveInlineView('madd')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              activeInlineView === 'madd'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            {selectedLanguage === 'bn' ? 'টান অ্যানিমেশন' : 'Madd Flow'}
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      {activeInlineView === 'callouts' ? (
        <div className="p-3 bg-[#020e12] grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
          {/* Anatomical SVG with Multi-Letter Badges */}
          <div className="md:col-span-7 flex justify-center">
            <svg viewBox="0 0 300 280" className="w-full max-w-[260px] sm:max-w-[290px] h-auto drop-shadow-xl select-none">
              <path
                d="M 60,30 C 140,15 220,25 240,65 C 255,90 270,115 260,135 C 255,145 248,150 248,154 C 246,160 236,160 236,164 C 236,168 248,168 244,175 C 238,185 220,195 210,205 C 195,215 180,240 175,270 L 85,270 C 80,240 85,180 85,140 C 85,90 70,60 60,30 Z"
                fill="#061c22"
                stroke="#0d4a46"
                strokeWidth="2.5"
              />
              <path d="M 180,75 C 220,70 235,100 220,115 C 200,125 170,120 160,105 Z" fill="none" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="175" y="98" fill="#5eead4" fontSize="8" fontWeight="bold">الخيشوم (নাসিকা)</text>
              <path d="M 140,140 C 170,125 205,128 220,140" fill="none" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
              <rect x="220" y="140" width="6" height="10" rx="2" fill="#f8fafc" />
              <rect x="218" y="156" width="6" height="10" rx="2" fill="#f8fafc" />
              <path d="M 130,205 C 135,175 145,155 170,152 C 185,150 200,148 215,148 C 215,154 205,162 195,166 C 175,174 160,188 150,210 Z" fill="rgba(16, 185, 129, 0.75)" stroke="#34d399" strokeWidth="2.5" />
              <text x="165" y="180" fill="#a7f3d0" fontSize="9" fontWeight="bold">اللسان (জিহ্বা)</text>
              <path d="M 120,165 L 120,265" stroke="#ef4444" strokeWidth="3" opacity="0.9" />

              {/* Multi-letter callout badges (image_2f033692.png style) */}
              {multiCallouts.map((c, idx) => (
                <g key={idx}>
                  <circle cx={c.coords.x} cy={c.coords.y} r="14" fill={c.color} opacity="0.4" className="animate-ping" />
                  <circle cx={c.coords.x} cy={c.coords.y} r="10" fill={c.color} stroke="#ffffff" strokeWidth="2" />
                  <text x={c.coords.x} y={c.coords.y + 4} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="extrabold" fontFamily="Amiri, serif">
                    {c.letter}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Right Callouts Text Items */}
          <div className="md:col-span-5 space-y-1.5">
            {multiCallouts.map((c, idx) => (
              <div key={idx} className="p-1.5 rounded-lg bg-[#061820] border border-emerald-500/20 flex items-center gap-2">
                <span style={{ backgroundColor: c.color }} className="w-5 h-5 rounded-full text-white flex items-center justify-center font-arabic font-bold text-[10px] shrink-0">
                  {c.letter}
                </span>
                <div className="text-[10px] leading-tight text-emerald-100">
                  <span className="font-extrabold text-white">{c.nameBn} ({c.nameEn}):</span> {c.actionBn}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Madd Flow Mode */
        <div className="p-3 bg-[#11050d] space-y-2">
          <div className="flex items-center justify-between text-xs text-pink-300 font-extrabold">
            <span>✨ {maddInfo.typeBn}</span>
            <span className="text-[10px] bg-pink-500/20 px-2 py-0.5 rounded-full border border-pink-500/30">
              {maddInfo.countMetrics} মাত্রা ({maddInfo.countAlif} আলিফ)
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 py-3 bg-[#050104] rounded-xl border border-pink-500/20">
            {[1, 2, 3, 4, 5, 6].slice(0, maddInfo.countMetrics || 2).map((num) => (
              <div key={num} className="w-8 h-8 rounded-xl bg-pink-600/80 text-white font-bold text-xs flex flex-col items-center justify-center shadow-md animate-pulse">
                <span>{num}</span>
                <span className="text-[7px]">মাত্রা</span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-pink-200/90 leading-snug">
            {maddInfo.descriptionBn}
          </p>
        </div>
      )}

      {/* Bottom Info Card Footer */}
      <div
        onClick={onClickExpand}
        className={`p-3 space-y-2 text-xs cursor-pointer ${
          isDay
            ? 'bg-gradient-to-b from-emerald-50/90 to-emerald-100/60 text-slate-900'
            : 'bg-[#081e26] text-white'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#008763] text-white flex items-center justify-center font-arabic text-xl font-bold shadow-sm shrink-0">
              {makhrajData.letter}
            </span>
            <div>
              <div className="font-extrabold text-xs text-[#006747] dark:text-emerald-300">
                হরফ: {makhrajData.nameBn} • মাখরাজ #{makhrajData.makhrajNumber}
              </div>
              <div className="text-[10px] text-slate-600 dark:text-emerald-200 truncate max-w-[220px]">
                {makhrajData.locationBn}
              </div>
            </div>
          </div>

          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 group-hover:underline shrink-0">
            <span>স্টুডিও দেখুন</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
