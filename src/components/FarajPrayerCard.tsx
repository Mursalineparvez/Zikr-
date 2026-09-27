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
  Sparkles,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  CloudSun,
  Flame,
  Layers,
  Award,
} from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { PRAYER_NAMES, SALAT_UI } from '../utils/appTranslations';
import { soundHaptics } from '../utils/audioHaptics';

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
        isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
      }`}
    >
      {/* 1. HEADER BAR: Green accent bar + Faraj Prayer Time + Completion counter + With Caution dropdown */}
      <div className="p-4 sm:p-5 pb-3 border-b border-slate-100 dark:border-teal-900/40">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Left: Indicator Bar & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-6 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/40" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-base sm:text-lg font-black tracking-tight ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
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
              <p className="text-[11px] text-slate-400 dark:text-teal-300/70 font-medium">
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
                    ? 'bg-[#e8f5f3] hover:bg-[#d8efe9] text-[#165a60] border-[#c0e4de]'
                    : 'bg-[#092226] hover:bg-[#123e47] text-teal-300 border-[#184850]'
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
                  <div className="p-2 text-[10px] text-slate-400 dark:text-teal-300/70 border-t border-slate-100 dark:border-teal-900/40 mt-1">
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

                {/* 3. EXPANDABLE PRAYER DETAILS DRAWER */}
                {isExpanded && (
                  <div
                    className={`mt-2 p-3 rounded-2xl border text-xs leading-relaxed space-y-2 animate-in fade-in zoom-in-95 duration-200 ${
                      isDay
                        ? 'bg-gradient-to-b from-[#f4faf9] to-[#edf7f5] border-[#cbe6e2] text-slate-700'
                        : 'bg-gradient-to-b from-[#092226] to-[#071d21] border-[#184850] text-teal-200'
                    }`}
                  >
                    {/* Rak'ats Breakdown Badge */}
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 font-black text-xs">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{prayer.name} Rak’ats: {meta.rakats}</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono">
                        {meta.rakatsDetail}
                      </span>
                    </div>

                    {/* Sun Position Rule */}
                    <div className="text-[11px] text-slate-600 dark:text-teal-200/90 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>Waqt Condition:</strong> {meta.sunCondition}</span>
                    </div>

                    {/* Hadith Quote */}
                    <div
                      className={`p-2.5 rounded-xl border text-[11px] italic leading-relaxed ${
                        isDay ? 'bg-white/80 border-slate-200 text-slate-600' : 'bg-[#0a282f]/80 border-teal-900/60 text-teal-100'
                      }`}
                    >
                      “{meta.hadithQuote}”
                      <div className="text-right font-mono not-italic font-bold text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">
                        — {meta.hadithRef}
                      </div>
                    </div>

                    {/* Action Bar inside Drawer */}
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <button
                        type="button"
                        onClick={(e) => toggleCompleted(prayer.id, e)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold border transition cursor-pointer active:scale-95 ${
                          isPrayed
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isPrayed ? 'Prayed ✓' : 'Mark as Prayed'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlayAdhan(`${prayer.name} Adhan`);
                        }}
                        className="inline-flex items-center gap-1 text-emerald-600 dark:text-teal-300 font-bold hover:underline cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Play Adhan</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
