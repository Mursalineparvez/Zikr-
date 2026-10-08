import React, { useState, useEffect, useMemo } from 'react';
import {
  FormattedPrayerTimes,
  FardPrayerItem,
} from '../utils/prayerTimes';
import {
  ShieldCheck,
  Shield,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  CheckCircle2,
  Check,
  Info,
  Clock,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  CloudSun,
  Flame,
  Layers,
  Award,
  BookOpen,
  Scroll,
  Copy,
  Share2,
  Heart,
} from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { PRAYER_NAMES, SALAT_UI } from '../utils/appTranslations';
import { soundHaptics } from '../utils/audioHaptics';
import { ALL_PRAYER_DETAILS } from '../data/prayerDetailsData';
import { PrayerAnimatedHeader } from './PrayerAnimatedHeader';

interface FarajPrayerCardProps {
  prayerData: FormattedPrayerTimes;
  isDay: boolean;
  selectedLanguage: ZikrLanguage;
  soundEnabled: boolean;
  withCaution: boolean;
  setWithCaution: (val: boolean) => void;
  activeAlerts: Record<string, boolean>;
  toggleAlert: (prayerId: string) => void;
  isPlayingAdhan: boolean;
  togglePlayAdhan: (name: string) => void;
  isHanafi: boolean;
  currentDate: Date;
}

// Prayer specific spiritual and theological metadata
const PRAYER_META: Record<
  string,
  {
    rakats: string;
    rakatsDetail: string;
    icon: (className?: string) => React.ReactNode;
    colorLight: string;
    colorDark: string;
    accentBorder: string;
    glow: string;
    hadithQuote: string;
    hadithRef: string;
    sunCondition: string;
  }
> = {
  Fajr: {
    rakats: '2 Fard',
    rakatsDetail: '2 Sunnah Mu’akkadah + 2 Fard',
    icon: (cls = 'w-4 h-4') => <Sunrise className={`${cls} text-amber-500`} />,
    colorLight: 'from-amber-500/10 via-indigo-500/5 to-transparent',
    colorDark: 'from-amber-500/20 via-indigo-950/40 to-transparent',
    accentBorder: 'border-amber-500/40',
    glow: 'shadow-amber-500/20',
    hadithQuote: 'The two rak’ahs before Fajr are better than the entire world and all that is within it.',
    hadithRef: 'Sahih Muslim 725',
    sunCondition: 'From true dawn (Subh Sadiq) until the top edge of the sun rises above horizon.',
  },
  Dhuhr: {
    rakats: '4 Fard',
    rakatsDetail: '4 Sunnah Mu’akkadah + 4 Fard + 2 Sunnah + 2 Nafl',
    icon: (cls = 'w-4 h-4') => <Sun className={`${cls} text-emerald-500`} />,
    colorLight: 'from-emerald-500/10 via-cyan-500/5 to-transparent',
    colorDark: 'from-emerald-500/20 via-cyan-950/40 to-transparent',
    accentBorder: 'border-emerald-500/40',
    glow: 'shadow-emerald-500/20',
    hadithQuote: 'This is an hour when the gates of heaven are opened, and I love for righteous deeds to ascend.',
    hadithRef: 'Jami` at-Tirmidhi 478',
    sunCondition: 'From the moment the sun passes the meridian (Zawal) until an object’s shadow equals its length.',
  },
  Asr: {
    rakats: '4 Fard',
    rakatsDetail: '4 Sunnah Ghair Mu’akkadah + 4 Fard',
    icon: (cls = 'w-4 h-4') => <CloudSun className={`${cls} text-orange-500`} />,
    colorLight: 'from-orange-500/10 via-amber-500/5 to-transparent',
    colorDark: 'from-orange-500/20 via-amber-950/40 to-transparent',
    accentBorder: 'border-orange-500/40',
    glow: 'shadow-orange-500/20',
    hadithQuote: 'Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise.',
    hadithRef: 'Sahih al-Bukhari 574',
    sunCondition: 'When the shadow of an object reaches twice its length (Hanafi) until the sun begins to set.',
  },
  Maghrib: {
    rakats: '3 Fard',
    rakatsDetail: '3 Fard + 2 Sunnah Mu’akkadah + 2 Awwabin (Optional)',
    icon: (cls = 'w-4 h-4') => <Sunset className={`${cls} text-rose-500`} />,
    colorLight: 'from-rose-500/10 via-purple-500/5 to-transparent',
    colorDark: 'from-rose-500/20 via-purple-950/40 to-transparent',
    accentBorder: 'border-rose-500/40',
    glow: 'shadow-rose-500/20',
    hadithQuote: 'My Ummah will continue upon good as long as they do not delay Maghrib until the stars intertwine.',
    hadithRef: 'Sunan Abi Dawud 418',
    sunCondition: 'Immediately after the disc of the sun dips completely beneath the horizon until red twilight fades.',
  },
  Isha: {
    rakats: '4 Fard',
    rakatsDetail: '4 Fard + 2 Sunnah Mu’akkadah + 3 Witr Wajib + 2 Nafl',
    icon: (cls = 'w-4 h-4') => <Moon className={`${cls} text-indigo-400`} />,
    colorLight: 'from-indigo-500/10 via-slate-500/5 to-transparent',
    colorDark: 'from-indigo-500/20 via-slate-950/40 to-transparent',
    accentBorder: 'border-indigo-500/40',
    glow: 'shadow-indigo-500/20',
    hadithQuote: 'Whoever prays Isha in congregation, it is as if he spent half the night in continuous prayer.',
    hadithRef: 'Sahih Muslim 656',
    sunCondition: 'When the evening red twilight completely disappears until the onset of true dawn (Fajr).',
  },
};

export const FarajPrayerCard: React.FC<FarajPrayerCardProps> = ({
  prayerData,
  isDay,
  selectedLanguage,
  soundEnabled,
  withCaution,
  setWithCaution,
  activeAlerts,
  toggleAlert,
  isPlayingAdhan,
  togglePlayAdhan,
  isHanafi,
  currentDate,
}) => {
  const [showCautionDropdown, setShowCautionDropdown] = useState<boolean>(false);
  const [expandedPrayerId, setExpandedPrayerId] = useState<string | null>(null);

  // Daily prayer tracker state (localStorage persistence)
  const todayKey = useMemo(() => {
    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, '0');
    const d = String(currentDate.getDate()).padStart(2, '0');
    return `zikrmate_prayed_${y}-${m}-${d}`;
  }, [currentDate]);

  const [completedPrayers, setCompletedPrayers] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(todayKey);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  // Track active tab for each expanded prayer (ayat, hadith, virtues, rules, duas)
  const [activeDetailsTab, setActiveDetailsTab] = useState<Record<string, 'ayat' | 'hadith' | 'virtues' | 'rules' | 'duas'>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      if (soundEnabled) soundHaptics.playTap();
    } catch {}
  };

  // Sync completed prayers when date changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(todayKey);
      if (saved) {
        setCompletedPrayers(JSON.parse(saved));
      } else {
        setCompletedPrayers({});
      }
    } catch {}
  }, [todayKey]);

  const toggleCompleted = (prayerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedPrayers((prev) => {
      const next = { ...prev, [prayerId]: !prev[prayerId] };
      try {
        localStorage.setItem(todayKey, JSON.stringify(next));
      } catch {}
      if (soundEnabled) soundHaptics.playMilestone();
      return next;
    });
  };

  const completedCount = Object.values(completedPrayers).filter(Boolean).length;

  return (
    <div
      className={`rounded-3xl border shadow-sm transition-colors overflow-hidden ${
        isDay ? 'bg-white border-[#dcebe8] shadow-md shadow-[#006747]/5' : 'bg-[#0e2f36] border-[#1a515c]'
      }`}
    >
      {/* 1. HEADER BAR: Green accent bar + Faraj Prayer Time + Completion counter + With Caution dropdown */}
      <div className="p-4 sm:p-5 pb-3 border-b border-slate-100 dark:border-teal-900/40">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Left: Indicator Bar & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-6 rounded-full bg-[#00875a] shadow-md shadow-[#00875a]/40" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-base sm:text-lg font-black tracking-tight ${isDay ? 'text-[#0a3328]' : 'text-white'}`}>
                  {SALAT_UI.farajPrayerTime[selectedLanguage]}
                </h2>
                {/* Completed daily counter pill */}
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full border flex items-center gap-1 transition-all ${
                    completedCount === 5
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/30'
                      : completedCount > 0
                      ? isDay
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                      : isDay
                      ? 'bg-slate-100 text-slate-500 border-slate-200'
                      : 'bg-slate-800/60 text-slate-400 border-slate-700'
                  }`}
                  title={`${completedCount} of 5 daily prayers completed`}
                >
                  <Award className="w-3 h-3" />
                  <span>{completedCount}/5 Prayed</span>
                </span>
              </div>
              <p className={`text-[11px] font-bold ${isDay ? 'text-slate-800' : 'text-emerald-300/70'}`}>
                5 Prescribed Daily Prayers • الصلوات الخمس المفروضة
              </p>
            </div>
          </div>

          {/* Right: With Caution Dropdown Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCautionDropdown((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer active:scale-95 shadow-sm ${
                withCaution
                  ? isDay
                    ? 'bg-[#e8f5f3] hover:bg-[#d8efe9] text-[#006747] border-[#c0e4de]'
                    : 'bg-[#092226] hover:bg-[#123e47] text-emerald-300 border-[#184850]'
                  : isDay
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{withCaution ? SALAT_UI.withCaution[selectedLanguage] : SALAT_UI.standard[selectedLanguage]}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {/* Caution Dropdown Menu */}
            {showCautionDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCautionDropdown(false)} />
                <div
                  className={`absolute right-0 top-full mt-1.5 z-50 w-52 rounded-2xl p-1.5 border shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 ${
                    isDay
                      ? 'bg-white/95 text-slate-800 border-[#cce5e2]'
                      : 'bg-[#092226]/95 text-white border-[#1a515c]'
                  }`}
                >
                  <button
                    onClick={() => {
                      setWithCaution(true);
                      setShowCautionDropdown(false);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer ${
                      withCaution
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-teal-900/40'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{SALAT_UI.withCaution[selectedLanguage]}</span>
                    </span>
                    {withCaution && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => {
                      setWithCaution(false);
                      setShowCautionDropdown(false);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer ${
                      !withCaution
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-teal-900/40'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-slate-400" />
                      <span>{SALAT_UI.standard[selectedLanguage]}</span>
                    </span>
                    {!withCaution && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                  <div className="p-2 text-[10px] text-slate-400 dark:text-emerald-300/70 border-t border-slate-100 dark:border-teal-900/40 mt-1">
                    Adds safety buffer (+/- 2 min) around prayer boundaries.
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. FIVE PRAYER ROWS */}
      <div className="divide-y divide-slate-100 dark:divide-teal-900/40">
        {prayerData.fardPrayers.map((prayer) => {
          const isAlertOn = !!activeAlerts[prayer.id];
          const isCurrent = prayer.isActive;
          const isPrayed = !!completedPrayers[prayer.id];
          const isExpanded = expandedPrayerId === prayer.id;
          const meta = PRAYER_META[prayer.id] || PRAYER_META.Fajr;
          const localizedName =
            PRAYER_NAMES[prayer.id]?.[selectedLanguage] || (prayer.id === 'Maghrib' ? 'Magrib' : prayer.name);

          // Calculate progress percentage inside current prayer window
          let windowProgress = 0;
          let remainingInWindowStr = '';
          if (isCurrent) {
            const startMs = prayer.startDate.getTime();
            const endMs = prayer.endDate.getTime();
            const nowMs = new Date().getTime();
            const totalMs = Math.max(1, endMs - startMs);
            windowProgress = Math.min(100, Math.max(0, ((nowMs - startMs) / totalMs) * 100));

            const remMs = Math.max(0, endMs - nowMs);
            const remH = Math.floor(remMs / 3600000);
            const remM = Math.floor((remMs % 3600000) / 60000);
            remainingInWindowStr = remH > 0 ? `${remH}h ${remM}m left` : `${remM}m left`;
          }

          return (
            <div
              key={prayer.id}
              className={`transition-all duration-300 relative ${
                isCurrent
                  ? isDay
                    ? 'bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-emerald-500/10'
                    : 'bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-emerald-950/40'
                  : isDay
                  ? 'hover:bg-slate-50/80'
                  : 'hover:bg-teal-950/20'
              }`}
            >
              {/* Active prayer glowing vertical accent indicator */}
              {isCurrent && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 shadow-sm shadow-emerald-500" />
              )}

              <div
                onClick={() => {
                  setExpandedPrayerId(isExpanded ? null : prayer.id);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className="p-3.5 sm:p-4 cursor-pointer select-none space-y-2"
              >
                {/* Top Row: Prayer Identity & Time & Actions */}
                <div className="flex items-center justify-between gap-2">
                  {/* Left: Checkmark Toggle + Icon + Prayer Name + Arabic */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Mark as Prayed Check Circle Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleCompleted(prayer.id, e)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 shrink-0 ${
                        isPrayed
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : isDay
                          ? 'border-slate-300 hover:border-emerald-500 text-transparent hover:text-emerald-400 bg-white'
                          : 'border-teal-700/80 hover:border-teal-400 text-transparent hover:text-teal-400 bg-[#092226]'
                      }`}
                      title={isPrayed ? 'Marked as prayed (Click to undo)' : 'Click to mark as prayed'}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    {/* Prayer Phase Icon Badge */}
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                        isCurrent
                          ? 'bg-emerald-500/20 border-emerald-500/40 shadow-sm'
                          : isDay
                          ? 'bg-slate-100 border-slate-200'
                          : 'bg-[#0a262c] border-[#184850]'
                      }`}
                    >
                      {meta.icon('w-4 h-4')}
                    </div>

                    {/* Names and Status */}
                    <div className="flex items-baseline gap-1.5 truncate">
                      <span
                        className={`text-sm sm:text-base font-black tracking-tight ${
                          isPrayed
                            ? 'line-through opacity-70'
                            : isCurrent
                            ? 'text-emerald-700 dark:text-emerald-300'
                            : isDay
                            ? 'text-slate-800'
                            : 'text-white'
                        }`}
                      >
                        {localizedName}
                      </span>

                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400/90 font-arabic hidden xs:inline">
                        ({prayer.arabic})
                      </span>

                      {/* Active Tag */}
                      {isCurrent && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs animate-pulse">
                          ACTIVE
                        </span>
                      )}

                      {/* Info & Caution Icons */}
                      {prayer.hasInfo && (
                        <span
                          className="text-amber-500"
                          title={isHanafi ? 'Hanafi Asr Calculation' : 'Standard Shafi Asr'}
                        >
                          <Info className="w-3.5 h-3.5" />
                        </span>
                      )}

                      {prayer.hasCaution && prayer.id === 'Maghrib' && (
                        <span className="text-emerald-600 dark:text-emerald-400" title="2-Min Sunset Caution">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Time Range & Action Buttons */}
                  <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                    {/* Time Window (e.g. 4:33 - 5:47) */}
                    <div className="text-right">
                      <span
                        className={`font-mono text-sm sm:text-base font-black tracking-tight ${
                          isCurrent
                            ? 'text-emerald-700 dark:text-emerald-300'
                            : isDay
                            ? 'text-slate-800'
                            : 'text-teal-100'
                        }`}
                      >
                        {prayer.timeRange}
                      </span>
                    </div>

                    {/* Action Icon: Active Mosque Adhan Player OR Alert Bell Toggle */}
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {isCurrent ? (
                        <button
                          onClick={() => togglePlayAdhan(`${prayer.name} Adhan`)}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition active:scale-95 cursor-pointer shadow-sm ${
                            isPlayingAdhan
                              ? 'bg-rose-500 text-white animate-pulse'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                          title={isPlayingAdhan ? 'Stop Adhan' : `Play ${prayer.name} Adhan`}
                        >
                          {isPlayingAdhan ? (
                            <VolumeX className="w-3.5 h-3.5" />
                          ) : (
                            <span className="text-xs">🕌</span>
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleAlert(prayer.id)}
                          className={`p-1.5 rounded-xl border transition active:scale-95 cursor-pointer ${
                            isAlertOn
                              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                              : isDay
                              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-400'
                              : 'bg-[#092226] hover:bg-[#133c44] border-[#184850] text-slate-400'
                          }`}
                          title={isAlertOn ? 'Alert is On (Click to Mute)' : 'Alert is Off (Click to Turn On)'}
                        >
                          {isAlertOn ? (
                            <Bell className="w-3.5 h-3.5 fill-current" />
                          ) : (
                            <BellOff className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}

                      {/* Expand/Collapse Chevron Indicator */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedPrayerId(isExpanded ? null : prayer.id);
                          if (soundEnabled) soundHaptics.playTap();
                        }}
                        className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                          isExpanded
                            ? 'bg-emerald-600 text-white border-emerald-600 rotate-180 shadow-xs'
                            : isDay
                            ? 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
                            : 'bg-[#0a262c] hover:bg-[#123e47] text-emerald-300 border-[#184850]'
                        }`}
                        title={isExpanded ? 'সংক্ষেপ করুন' : 'বিস্তারিত, হাদিস ও এনিমেশন দেখুন'}
                      >
                        <ChevronDown className="w-3.5 h-3.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Prayer Live Progress Bar */}
                {isCurrent && (
                  <div className="pt-1 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between text-[10px] font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-500 animate-spin" />
                        <span>Waqt Remaining: <strong>{remainingInWindowStr}</strong></span>
                      </span>
                      <span>{Math.round(windowProgress)}% Elapsed</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-[#071f24] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000 shadow-sm"
                        style={{ width: `${windowProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* 3. EXPANDABLE PRAYER DETAILS DRAWER WITH ANIMATED HEADER & RICH INFORMATION */}
                {isExpanded && (() => {
                  const detailed = ALL_PRAYER_DETAILS[prayer.id] || ALL_PRAYER_DETAILS.Fajr;
                  const currentTab = activeDetailsTab[prayer.id] || 'ayat';

                  return (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={`mt-3 rounded-3xl border overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 ${
                        isDay
                          ? 'bg-[#fcfdfd] border-[#cbe6e2] shadow-xl shadow-emerald-950/5'
                          : 'bg-[#092226] border-[#1b505a] shadow-2xl'
                      }`}
                    >
                      {/* UPPER ANIMATED PICTURE: Atmospheric Celestial Mosque Scene */}
                      <PrayerAnimatedHeader
                        prayerId={prayer.id}
                        nameBn={detailed.nameBn}
                        nameEn={prayer.name}
                        nameAr={detailed.nameAr}
                        timeRange={prayer.timeRange}
                        celestialSignBn={detailed.celestialSignBn}
                        isActive={isCurrent}
                        isPrayed={isPrayed}
                        isPlayingAdhan={isPlayingAdhan && isCurrent}
                        onToggleAdhan={() => togglePlayAdhan(`${prayer.name} Adhan`)}
                        isDay={isDay}
                      />

                      {/* SEGMENTED TAB NAVIGATION BAR */}
                      <div className="p-3 sm:p-4 pb-0">
                        <div
                          className={`flex items-center gap-1.5 p-1 rounded-2xl border overflow-x-auto scrollbar-none text-xs font-bold ${
                            isDay ? 'bg-slate-100/90 border-slate-200' : 'bg-[#05171a] border-teal-900/50'
                          }`}
                        >
                          {/* Tab 1: Ayat */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveDetailsTab((prev) => ({ ...prev, [prayer.id]: 'ayat' }));
                              if (soundEnabled) soundHaptics.playTap();
                            }}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                              currentTab === 'ayat'
                                ? 'bg-emerald-600 text-white shadow-md font-black scale-102'
                                : isDay
                                ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                                : 'text-emerald-200/80 hover:text-white hover:bg-teal-900/30'
                            }`}
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>কুরআনের আয়াত ({detailed.ayats.length})</span>
                          </button>

                          {/* Tab 2: Hadith */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveDetailsTab((prev) => ({ ...prev, [prayer.id]: 'hadith' }));
                              if (soundEnabled) soundHaptics.playTap();
                            }}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                              currentTab === 'hadith'
                                ? 'bg-emerald-600 text-white shadow-md font-black scale-102'
                                : isDay
                                ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                                : 'text-emerald-200/80 hover:text-white hover:bg-teal-900/30'
                            }`}
                          >
                            <Scroll className="w-3.5 h-3.5" />
                            <span>সহীহ হাদিস ({detailed.hadiths.length})</span>
                          </button>

                          {/* Tab 3: Virtues */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveDetailsTab((prev) => ({ ...prev, [prayer.id]: 'virtues' }));
                              if (soundEnabled) soundHaptics.playTap();
                            }}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                              currentTab === 'virtues'
                                ? 'bg-emerald-600 text-white shadow-md font-black scale-102'
                                : isDay
                                ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                                : 'text-emerald-200/80 hover:text-white hover:bg-teal-900/30'
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>ফযিলত ও মর্যাদা</span>
                          </button>

                          {/* Tab 4: Rules & Rakats */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveDetailsTab((prev) => ({ ...prev, [prayer.id]: 'rules' }));
                              if (soundEnabled) soundHaptics.playTap();
                            }}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                              currentTab === 'rules'
                                ? 'bg-emerald-600 text-white shadow-md font-black scale-102'
                                : isDay
                                ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                                : 'text-emerald-200/80 hover:text-white hover:bg-teal-900/30'
                            }`}
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>ওয়াক্ত ও রাকাত</span>
                          </button>

                          {/* Tab 5: Post-prayer Duas */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveDetailsTab((prev) => ({ ...prev, [prayer.id]: 'duas' }));
                              if (soundEnabled) soundHaptics.playTap();
                            }}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                              currentTab === 'duas'
                                ? 'bg-emerald-600 text-white shadow-md font-black scale-102'
                                : isDay
                                ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                                : 'text-emerald-200/80 hover:text-white hover:bg-teal-900/30'
                            }`}
                          >
                            <Heart className="w-3.5 h-3.5" />
                            <span>মাসনূন দোয়া</span>
                          </button>
                        </div>
                      </div>

                      {/* TAB CONTENT PANELS */}
                      <div className="p-3 sm:p-5 pt-3 space-y-3.5">
                        {/* 1. AYAT TAB */}
                        {currentTab === 'ayat' && (
                          <div className="space-y-3 animate-in fade-in duration-200">
                            {detailed.ayats.map((ayat, idx) => (
                              <div
                                key={idx}
                                className={`p-4 rounded-2xl border transition-all ${
                                  isDay
                                    ? 'bg-gradient-to-b from-[#f9fdfc] to-white border-[#d2ece8] shadow-xs'
                                    : 'bg-[#071d21] border-[#174852]'
                                }`}
                              >
                                {/* Surah Badge & Copy Button */}
                                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-teal-900/40">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-xs font-black text-emerald-700 dark:text-emerald-300">
                                      {ayat.surahNameBn} ({ayat.surahNameEn}) • আয়াত: {ayat.ayatNumber}
                                    </span>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={(e) =>
                                      handleCopy(
                                        `${ayat.arabic}\n${ayat.translationBn}\n— [${ayat.surahNameBn}: ${ayat.ayatNumber}]`,
                                        `ayat-${prayer.id}-${idx}`,
                                        e
                                      )
                                    }
                                    className={`p-1.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition active:scale-95 cursor-pointer ${
                                      copiedId === `ayat-${prayer.id}-${idx}`
                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                        : isDay
                                        ? 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200'
                                        : 'bg-[#0a262c] text-teal-200 hover:bg-[#123e47] border-[#184850]'
                                    }`}
                                  >
                                    {copiedId === `ayat-${prayer.id}-${idx}` ? (
                                      <>
                                        <Check className="w-3 h-3" />
                                        <span>কপি হয়েছে</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span>কপি</span>
                                      </>
                                    )}
                                  </button>
                                </div>

                                {/* Arabic Quranic Text */}
                                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 mb-3">
                                  <p className="font-arabic text-right text-lg sm:text-xl leading-loose font-bold text-emerald-950 dark:text-emerald-200 selection:bg-emerald-500 selection:text-white">
                                    {ayat.arabic}
                                  </p>
                                </div>

                                {/* Bengali Translation */}
                                <p className={`text-xs sm:text-sm font-medium leading-relaxed mb-1.5 ${isDay ? 'text-slate-800' : 'text-emerald-100'}`}>
                                  <span className="font-bold text-emerald-700 dark:text-emerald-300">অনুবাদ: </span>
                                  {ayat.translationBn}
                                </p>

                                {/* English Translation */}
                                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-emerald-200/70 italic leading-relaxed">
                                  {ayat.translationEn}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 2. HADITH TAB */}
                        {currentTab === 'hadith' && (
                          <div className="space-y-3 animate-in fade-in duration-200">
                            {detailed.hadiths.map((h, idx) => (
                              <div
                                key={idx}
                                className={`p-4 rounded-2xl border transition-all ${
                                  isDay
                                    ? 'bg-gradient-to-b from-[#f9fdfc] to-white border-[#d2ece8] shadow-xs'
                                    : 'bg-[#071d21] border-[#174852]'
                                }`}
                              >
                                {/* Header: Narrator & Grade Badge */}
                                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-teal-900/40">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                                      বর্ণনাকারী: {h.narratorBn}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                                      {h.gradeBn}
                                    </span>

                                    <button
                                      type="button"
                                      onClick={(e) =>
                                        handleCopy(
                                          `"${h.textBn}"\n— [${h.bookBn}: ${h.hadithNumber}, বর্ণনাকারী: ${h.narratorBn}]`,
                                          `hadith-${prayer.id}-${idx}`,
                                          e
                                        )
                                      }
                                      className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition active:scale-95 cursor-pointer ${
                                        copiedId === `hadith-${prayer.id}-${idx}`
                                          ? 'bg-emerald-600 text-white border-emerald-600'
                                          : isDay
                                          ? 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200'
                                          : 'bg-[#0a262c] text-teal-200 hover:bg-[#123e47] border-[#184850]'
                                      }`}
                                    >
                                      {copiedId === `hadith-${prayer.id}-${idx}` ? (
                                        <Check className="w-3 h-3" />
                                      ) : (
                                        <Copy className="w-3 h-3" />
                                      )}
                                    </button>
                                  </div>
                                </div>

                                {/* Arabic text if available */}
                                {h.arabicText && (
                                  <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-2.5">
                                    <p className="font-arabic text-right text-base leading-relaxed font-bold text-amber-950 dark:text-amber-200">
                                      {h.arabicText}
                                    </p>
                                  </div>
                                )}

                                {/* Hadith Matn / Bengali translation */}
                                <div className={`text-xs sm:text-sm leading-relaxed mb-2 ${isDay ? 'text-slate-800' : 'text-teal-100'}`}>
                                  “{h.textBn}”
                                </div>

                                {/* Reference Citation */}
                                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-teal-900/30">
                                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                                    সূত্র: {h.bookBn} (হাদিস নং: {h.hadithNumber})
                                  </span>
                                  <span className="text-[10px] text-slate-400 italic">
                                    {h.bookEn} #{h.hadithNumber}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 3. VIRTUES TAB */}
                        {currentTab === 'virtues' && (
                          <div className="space-y-3 animate-in fade-in duration-200">
                            <div
                              className={`p-4 rounded-2xl border ${
                                isDay
                                  ? 'bg-gradient-to-b from-[#f4faf9] to-white border-[#d2ece8]'
                                  : 'bg-[#071d21] border-[#174852]'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                <h4 className="text-sm font-black text-emerald-800 dark:text-emerald-200">
                                  {detailed.virtues.titleBn}
                                </h4>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-emerald-300/80 mb-3 leading-relaxed">
                                {detailed.virtues.descriptionBn}
                              </p>

                              {/* Bullet points */}
                              <div className="space-y-2">
                                {detailed.virtues.pointsBn.map((point, idx) => (
                                  <div
                                    key={idx}
                                    className={`p-2.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                                      isDay
                                        ? 'bg-white border-slate-200 text-slate-700'
                                        : 'bg-[#0a272e] border-teal-900/60 text-teal-100'
                                    }`}
                                  >
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="leading-relaxed font-medium">{point}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 4. RULES & RAKATS TAB */}
                        {currentTab === 'rules' && (
                          <div className="space-y-3.5 animate-in fade-in duration-200">
                            {/* Timing & Astronomical Conditions Card */}
                            <div
                              className={`p-4 rounded-2xl border space-y-2.5 ${
                                isDay ? 'bg-white border-[#d2ece8]' : 'bg-[#071d21] border-[#174852]'
                              }`}
                            >
                              <div className="flex items-center gap-2 text-xs font-black text-emerald-700 dark:text-emerald-300 border-b pb-2 border-slate-100 dark:border-teal-900/40">
                                <Clock className="w-4 h-4 text-emerald-500" />
                                <span>ওয়াক্ত শুরু ও শেষের জ্যোতির্বৈজ্ঞানিক শর্তাবলী</span>
                              </div>

                              <div className="space-y-2 text-xs leading-relaxed">
                                <div className="flex items-start gap-2">
                                  <span className="font-bold text-emerald-700 dark:text-emerald-400 shrink-0">ওয়াক্ত শুরু:</span>
                                  <span className="text-slate-700 dark:text-emerald-100">{detailed.timingConditions.startConditionBn}</span>
                                </div>

                                <div className="flex items-start gap-2">
                                  <span className="font-bold text-rose-600 dark:text-rose-400 shrink-0">ওয়াক্ত শেষ:</span>
                                  <span className="text-slate-700 dark:text-emerald-100">{detailed.timingConditions.endConditionBn}</span>
                                </div>

                                <div className="flex items-start gap-2">
                                  <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">মুস্তাহাব সময়:</span>
                                  <span className="text-slate-700 dark:text-emerald-100">{detailed.timingConditions.mustahabTimeBn}</span>
                                </div>

                                <div className="flex items-start gap-2">
                                  <span className="font-bold text-purple-600 dark:text-purple-400 shrink-0">সতর্কতা ও হুকুম:</span>
                                  <span className="text-slate-700 dark:text-emerald-100">{detailed.timingConditions.fiqhDetailsBn}</span>
                                </div>
                              </div>
                            </div>

                            {/* Detailed Rak'at Breakdown Table */}
                            <div
                              className={`p-4 rounded-2xl border space-y-3 ${
                                isDay ? 'bg-white border-[#d2ece8]' : 'bg-[#071d21] border-[#174852]'
                              }`}
                            >
                              <div className="flex items-center justify-between border-b pb-2 border-slate-100 dark:border-teal-900/40">
                                <div className="flex items-center gap-2 text-xs font-black text-emerald-700 dark:text-emerald-300">
                                  <Layers className="w-4 h-4 text-emerald-500" />
                                  <span>রাকাতের পূর্ণ বিবরণ ({detailed.summaryRakatsBn})</span>
                                </div>
                                <span className="font-mono text-xs font-bold text-slate-500">
                                  মোট {detailed.totalRakatsCount} রাকাত
                                </span>
                              </div>

                              <div className="space-y-2">
                                {detailed.rakatsBreakdown.map((r, idx) => (
                                  <div
                                    key={idx}
                                    className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs ${
                                      r.type.includes('Fard')
                                        ? isDay
                                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                                          : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                                        : isDay
                                        ? 'bg-slate-50/80 border-slate-200 text-slate-700'
                                        : 'bg-[#092226] border-teal-900/40 text-teal-100'
                                    }`}
                                  >
                                    <div>
                                      <div className="font-black flex items-center gap-1.5">
                                        <span>{r.typeBn}</span>
                                        <span className="font-normal opacity-80 text-[11px]">({r.rulingBn})</span>
                                      </div>
                                      <div className="text-[11px] opacity-75 mt-0.5">{r.descriptionBn}</div>
                                    </div>

                                    <div className="px-2.5 py-1 rounded-lg font-mono font-black text-sm bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 shrink-0">
                                      {r.rakats} রাকাত
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 5. POST-PRAYER DUAS TAB */}
                        {currentTab === 'duas' && (
                          <div className="space-y-3 animate-in fade-in duration-200">
                            {detailed.postPrayerDuas.map((dua, idx) => (
                              <div
                                key={idx}
                                className={`p-4 rounded-2xl border transition-all ${
                                  isDay
                                    ? 'bg-gradient-to-b from-[#f9fdfc] to-white border-[#d2ece8]'
                                    : 'bg-[#071d21] border-[#174852]'
                                }`}
                              >
                                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-teal-900/40">
                                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                                    সালাম ফেরানোর পর মাসনূন আমল #{idx + 1}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={(e) =>
                                      handleCopy(
                                        `${dua.arabic}\n${dua.meaningBn}\n[${dua.reference}]`,
                                        `dua-${prayer.id}-${idx}`,
                                        e
                                      )
                                    }
                                    className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition active:scale-95 cursor-pointer ${
                                      copiedId === `dua-${prayer.id}-${idx}`
                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                        : isDay
                                        ? 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200'
                                        : 'bg-[#0a262c] text-teal-200 hover:bg-[#123e47] border-[#184850]'
                                    }`}
                                  >
                                    {copiedId === `dua-${prayer.id}-${idx}` ? (
                                      <Check className="w-3 h-3" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </button>
                                </div>

                                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 mb-2.5">
                                  <p className="font-arabic text-right text-lg leading-loose font-bold text-emerald-950 dark:text-emerald-200">
                                    {dua.arabic}
                                  </p>
                                </div>

                                <p className="text-xs font-medium text-slate-700 dark:text-emerald-200/90 italic mb-1.5">
                                  {dua.transliteration}
                                </p>

                                <p className="text-xs font-bold text-slate-800 dark:text-white leading-relaxed mb-2">
                                  <span className="text-emerald-700 dark:text-emerald-400">অর্থ: </span>
                                  {dua.meaningBn}
                                </p>

                                <div className="text-right font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                                  সূত্র: {dua.reference}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* BOTTOM ACTION BAR */}
                      <div
                        className={`p-3 sm:p-4 border-t flex items-center justify-between gap-2 flex-wrap ${
                          isDay ? 'bg-slate-50/90 border-[#cbe6e2]' : 'bg-[#071c20] border-[#184850]'
                        }`}
                      >
                        {/* Left: Mark as prayed button */}
                        <button
                          type="button"
                          onClick={(e) => toggleCompleted(prayer.id, e)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs border transition cursor-pointer active:scale-95 shadow-sm ${
                            isPrayed
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-600/30'
                              : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>{isPrayed ? 'নামাজ আদায় সম্পন্ন ✓' : 'নামাজ পড়েছি (চিহ্নিত করুন)'}</span>
                        </button>

                        {/* Right: Adhan & Close buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePlayAdhan(`${prayer.name} Adhan`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition active:scale-95 cursor-pointer shadow-sm"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>আযান শুনুন</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setExpandedPrayerId(null)}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border transition active:scale-95 cursor-pointer bg-slate-200/60 dark:bg-teal-900/40 hover:bg-slate-200 text-slate-700 dark:text-teal-200 border-slate-300 dark:border-teal-800"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                            <span>গুটিয়ে নিন</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
