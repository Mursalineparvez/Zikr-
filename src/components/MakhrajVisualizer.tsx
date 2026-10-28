import React, { useState } from 'react';
import {
  MakhrajData,
  MAKHRAJ_REGIONS,
  VocalOrgan,
  ARABIC_LETTERS_MAKHRAJ,
  getWordMakhrajInfo,
} from '../utils/tajweedMakhraj';
import { ZikrLanguage } from '../types';
import { Sparkles, X, Volume2, Info, ChevronRight, Layers, Maximize2, Minimize2, Play } from 'lucide-react';

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
      // Tongue tip elevated & touching upper teeth/palate
      return 'M 130,205 C 135,175 160,146 218,144 C 218,152 198,162 150,210 Z';
    case 'tongue_mid':
      // Middle of tongue raised high against hard palate
      return 'M 130,205 C 150,142 178,134 210,150 C 205,158 180,166 150,210 Z';
    case 'tongue_root':
      // Back/root of tongue raised high against soft palate / uvula
      return 'M 130,205 C 142,136 165,146 205,152 C 195,162 160,172 150,210 Z';
    default:
      // Neutral resting tongue
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
  activeArabicWord,
  activeLetter: propActiveLetter,
  isDay = false,
  selectedLanguage = 'bn',
  onClose,
  isCompact = false,
}) => {
  const [manualLetter, setManualLetter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'live' | 'explorer'>('live');

  // Derive active letter info from active word or manual selection
  const wordInfo = activeArabicWord ? getWordMakhrajInfo(activeArabicWord) : null;
  const currentLetterChar = manualLetter || propActiveLetter || wordInfo?.primaryLetter?.letter || 'ر';
  const makhrajData: MakhrajData | undefined = ARABIC_LETTERS_MAKHRAJ[currentLetterChar] || wordInfo?.primaryLetter || ARABIC_LETTERS_MAKHRAJ['ر'];

  const organData = makhrajData ? MAKHRAJ_REGIONS[makhrajData.organ] : null;
  const coords = makhrajData?.coords || { x: 202, y: 146 };

  const tonguePath = getTonguePath(makhrajData?.organ || 'tongue_tip');
  const lipsPath = getLipsPath(makhrajData?.organ || 'tongue_tip');

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
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs">
            🗣️
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs sm:text-sm font-extrabold tracking-tight">
                {selectedLanguage === 'bn' ? 'লাইভ মাখরাজ ও উচ্চারণ স্থান' : 'Live Makhraj Articulator'}
              </h4>
              <span className="px-1.5 py-0.2 rounded-md bg-emerald-500 text-white text-[9px] font-bold font-mono uppercase animate-pulse">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-emerald-400 font-medium">
              {selectedLanguage === 'bn' ? 'মুখ ও কণ্ঠের অ্যানিমেটেড উচ্চারণ স্থান' : 'Real-time vocal tract anatomy'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Tab Switcher */}
          <div className="flex items-center p-0.5 rounded-lg bg-black/10 dark:bg-white/10 text-[10px] font-bold">
            <button
              onClick={() => {
                setActiveTab('live');
                setManualLetter(null);
              }}
              className={`px-2 py-0.5 rounded-md transition ${
                activeTab === 'live' ? 'bg-[#008763] text-white shadow-sm' : 'opacity-70'
              }`}
            >
              {selectedLanguage === 'bn' ? 'লাইভ' : 'Live'}
            </button>
            <button
              onClick={() => setActiveTab('explorer')}
              className={`px-2 py-0.5 rounded-md transition ${
                activeTab === 'explorer' ? 'bg-[#008763] text-white shadow-sm' : 'opacity-70'
              }`}
            >
              {selectedLanguage === 'bn' ? 'সব হরফ' : 'Letters'}
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
        {/* Active Word Bar */}
        {activeArabicWord && (
          <div
            className={`p-2.5 rounded-2xl border flex items-center justify-between gap-3 ${
              isDay ? 'bg-[#f4faf7] border-emerald-200' : 'bg-[#0d222b] border-[#1a3d47]'
            }`}
          >
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block">
                {selectedLanguage === 'bn' ? 'পঠিত শব্দ:' : 'Current Word:'}
              </span>
              <div className="font-arabic text-xl sm:text-2xl font-bold leading-normal text-emerald-700 dark:text-emerald-300 truncate">
                {activeArabicWord}
              </div>
            </div>

            {/* Word's constituent letters pill buttons */}
            {wordInfo && wordInfo.allLetters.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap justify-end">
                {wordInfo.allLetters.map((l, idx) => {
                  const isCur = makhrajData?.letter === l.letter;
                  return (
                    <button
                      key={idx}
                      onClick={() => setManualLetter(l.letter)}
                      className={`w-7 h-7 rounded-xl font-arabic font-bold text-sm transition-all cursor-pointer flex items-center justify-center ${
                        isCur
                          ? 'bg-[#008763] text-white ring-2 ring-emerald-400 scale-110 shadow-md'
                          : isDay
                          ? 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-400'
                          : 'bg-[#07131b] border border-white/10 text-slate-300 hover:border-emerald-500'
                      }`}
                      title={l.nameBn}
                    >
                      {l.letter}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

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
          <svg viewBox="0 0 300 280" className="w-full max-w-[290px] sm:max-w-[330px] h-auto drop-shadow-xl select-none my-1">
            <defs>
              <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
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

            {/* Nasal Cavity (الخيشوم) Dotted Line */}
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

            {/* Hard Palate Arc (Yellow) */}
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

            {/* Throat Division Line (Red) */}
            <path d="M 120,165 L 120,265" stroke="#ef4444" strokeWidth="3" opacity="0.9" />
            <line x1="110" y1="245" x2="130" y2="245" stroke="#ef4444" strokeWidth="3" />

            {/* Throat Labels */}
            <text x="80" y="182" fill="#fef08a" fontSize="8" fontWeight="extrabold">
              আদনা হলক
            </text>
            <text x="80" y="215" fill="#fdba74" fontSize="8" fontWeight="extrabold">
              ওয়াসত হলক
            </text>
            <text x="80" y="248" fill="#fca5a5" fontSize="8" fontWeight="extrabold">
              আকসা হলক
            </text>

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
              <circle cx={coords.x} cy={coords.y} r="14" fill="url(#beaconGlow)" opacity="0.95" />
              <circle cx={coords.x} cy={coords.y} r="6.5" fill="#ffffff" stroke="#008763" strokeWidth="2.5" className="animate-pulse" />

              {/* Jumping active letter badge */}
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

        {/* ALL LETTERS EXPLORER GRID */}
        {activeTab === 'explorer' && (
          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-bold text-slate-500 dark:text-teal-300">
              {selectedLanguage === 'bn' ? 'হরফে ট্যাপ করে মাখরাজ পরীক্ষা করুন:' : 'Tap any letter to test Makhraj:'}
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-8 gap-1.5 max-h-36 overflow-y-auto p-1 scrollbar-none">
              {ARABIC_ALPHABET_ORDER.map((char) => {
                const isSelected = makhrajData?.letter === char;
                return (
                  <button
                    key={char}
                    onClick={() => setManualLetter(char)}
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
/* INLINE AYAH LINE MAKHRAJ DIAGRAM (PRACTICALLY MATCHES image_4ea88337.png 100% ACCURATELY) */
/* ========================================================================================= */
interface AyahMouthCardProps {
  arabicWord?: string;
  isDay?: boolean;
  selectedLanguage?: ZikrLanguage | 'bn' | 'en';
  onClickExpand?: () => void;
}

export const AyahMouthCard: React.FC<AyahMouthCardProps> = ({
  arabicWord = 'ٱلرَّحْمَٰنِ',
  isDay = false,
  selectedLanguage = 'bn',
  onClickExpand,
}) => {
  const wordInfo = getWordMakhrajInfo(arabicWord);
  const makhrajData = wordInfo.primaryLetter || ARABIC_LETTERS_MAKHRAJ['ر'];
  const organData = MAKHRAJ_REGIONS[makhrajData.organ];
  const coords = makhrajData.coords;

  const tonguePath = getTonguePath(makhrajData.organ);
  const lipsPath = getLipsPath(makhrajData.organ);

  return (
    <div
      onClick={onClickExpand}
      className={`rounded-2xl border overflow-hidden shadow-lg transition-all duration-300 my-3 cursor-pointer group ${
        isDay
          ? 'bg-white border-emerald-200 hover:border-emerald-400'
          : 'bg-[#030e12] border-emerald-900/60 hover:border-emerald-500/80 shadow-black/80'
      }`}
      title="ক্লিক করে পূর্ণাঙ্গ মাখরাজ স্টুডিও দেখুন"
    >
      {/* Top Black Container: VOCAL TRACT SAGITTAL VIEW */}
      <div className="relative p-2.5 bg-[#021014] border-b border-emerald-900/50 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between px-2 pt-1 pb-1">
          <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            VOCAL TRACT SAGITTAL VIEW
          </span>
          <span className="px-2 py-0.5 rounded-md bg-black/60 border border-amber-500/40 text-[10px] font-bold text-amber-300 font-arabic">
            مخارج الحروف
          </span>
        </div>

        {/* SVG Diagram Canvas */}
        <svg viewBox="0 0 300 280" className="w-full max-w-[280px] sm:max-w-[320px] h-auto drop-shadow-xl select-none my-1">
          <defs>
            <radialGradient id="miniBeacon" cx="50%" cy="50%" r="50%">
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
            fill={makhrajData.organ === 'nasal' ? 'rgba(139, 92, 246, 0.3)' : 'none'}
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

          {/* Throat Division Line (Red) */}
          <path d="M 120,165 L 120,265" stroke="#ef4444" strokeWidth="3" opacity="0.9" />
          <line x1="110" y1="245" x2="130" y2="245" stroke="#ef4444" strokeWidth="3" />

          {/* Throat Labels */}
          <text x="80" y="182" fill="#fef08a" fontSize="8" fontWeight="extrabold">
            আদনা হলক
          </text>
          <text x="80" y="215" fill="#fdba74" fontSize="8" fontWeight="extrabold">
            ওয়াসত হলক
          </text>
          <text x="80" y="248" fill="#fca5a5" fontSize="8" fontWeight="extrabold">
            আকসা হলক
          </text>

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
            <circle cx={coords.x} cy={coords.y} r="14" fill="url(#miniBeacon)" opacity="0.95" />
            <circle cx={coords.x} cy={coords.y} r="6.5" fill="#ffffff" stroke="#008763" strokeWidth="2.5" className="animate-pulse" />

            {/* Jumping active letter badge */}
            <g transform={`translate(${coords.x + 10}, ${coords.y - 12})`}>
              <rect x="-1" y="-15" width="22" height="22" rx="6" fill="#008763" stroke="#34d399" strokeWidth="1.5" />
              <text x="10" y="1" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="Amiri, serif">
                {makhrajData.letter}
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Bottom Green Info Card (Direct Match to image_4ea88337.png) */}
      <div
        className={`p-3.5 space-y-2.5 text-xs ${
          isDay
            ? 'bg-gradient-to-b from-emerald-50/90 to-emerald-100/60 text-slate-900'
            : 'bg-[#081e26] text-white'
        }`}
      >
        {/* Row 1: Green Badge, Letter, Makhraj # & Organ */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-[#008763] text-white flex items-center justify-center font-arabic text-2xl font-black shadow-md shrink-0">
              {makhrajData.letter}
            </span>
            <div>
              <div className="font-extrabold text-sm text-[#006747] dark:text-emerald-300 flex items-center gap-1.5">
                <span>হরফ: {makhrajData.nameBn}</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">({makhrajData.nameEn})</span>
              </div>
              <div className="text-amber-600 dark:text-amber-400 font-extrabold text-[11px]">
                মাখরাজ নম্বর #{makhrajData.makhrajNumber} • {makhrajData.organNameBn}
              </div>
            </div>
          </div>

          <span className="px-3 py-1.5 rounded-2xl text-xs font-bold font-arabic bg-emerald-500/20 text-[#006747] dark:text-emerald-200 border border-emerald-500/30 shrink-0">
            {organData?.arabicName}
          </span>
        </div>

        <div className="border-t border-emerald-500/20 pt-2 space-y-1.5">
          {/* Row 2: Location */}
          <div className="flex items-start gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">📍 স্থান:</span>
            <span className="font-semibold text-slate-800 dark:text-emerald-100 leading-snug">
              {makhrajData.locationBn}
            </span>
          </div>

          {/* Row 3: Sifat */}
          <div className="flex items-start gap-2 pt-1 border-t border-emerald-500/15">
            <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">✨ সিফাত:</span>
            <span className="font-medium text-slate-700 dark:text-emerald-200 leading-snug text-[11px]">
              {makhrajData.sifatBn}
            </span>
          </div>
        </div>

        {/* Word Info Footer */}
        <div className="pt-1.5 border-t border-emerald-500/20 flex items-center justify-between text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
          <span>পঠিত শব্দ: {arabicWord}</span>
          <span className="flex items-center gap-0.5 group-hover:underline">
            <span>স্টুডিও দেখুন</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
