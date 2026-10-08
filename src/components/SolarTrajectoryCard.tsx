import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sun,
  Moon,
  Sunrise as SunriseIcon,
  Sunset as SunsetIcon,
  Clock,
  Sparkles,
  Compass,
  Info,
  Sliders,
  RotateCcw,
  ChevronRight,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Layers,
  Star,
  MapPin,
  Flame,
} from 'lucide-react';
import { FormattedPrayerTimes, SolarPhaseType } from '../utils/prayerTimes';
import { ThemeMode, ZikrLanguage } from '../types';
import { PRAYER_NAMES, SOLAR_UI } from '../utils/appTranslations';
import { soundHaptics } from '../utils/audioHaptics';

interface SolarTrajectoryCardProps {
  prayerData: FormattedPrayerTimes;
  isDay: boolean;
  selectedLanguage: ZikrLanguage;
  soundEnabled: boolean;
}

export const SolarTrajectoryCard: React.FC<SolarTrajectoryCardProps> = ({
  prayerData,
  isDay,
  selectedLanguage,
  soundEnabled,
}) => {
  const { solar } = prayerData;

  // Interactive modes
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [isAutoSimulating, setIsAutoSimulating] = useState<boolean>(false);
  const [scrubPercent, setScrubPercent] = useState<number>(solar.sunProgressPercent);
  const [showScienceDetails, setShowScienceDetails] = useState<boolean>(false);
  const [activeMilestone, setActiveMilestone] = useState<string | null>(null);

  // Auto-simulation interval ref
  const autoSimRef = useRef<number | null>(null);

  // Sync scrubPercent with real solar progress when not actively scrubbing or simulating
  useEffect(() => {
    if (!isScrubbing && !isAutoSimulating) {
      setScrubPercent(solar.isDaytime ? solar.sunProgressPercent : 50);
    }
  }, [solar.sunProgressPercent, solar.isDaytime, isScrubbing, isAutoSimulating]);

  // Handle auto-simulation loop (24h celestial dome playback)
  useEffect(() => {
    if (isAutoSimulating) {
      autoSimRef.current = window.setInterval(() => {
        setScrubPercent((prev) => {
          const next = prev + 1;
          return next > 100 ? 0 : next;
        });
      }, 120);
    } else {
      if (autoSimRef.current) clearInterval(autoSimRef.current);
    }
    return () => {
      if (autoSimRef.current) clearInterval(autoSimRef.current);
    };
  }, [isAutoSimulating]);

  // SVG Coordinates for the Complete 24h Celestial Sphere (540x240 ViewBox)
  // Horizon Line is at Y = 145
  const startX = 65; // Sunrise (East Horizon)
  const startY = 145;
  const apexX = 270; // Meridian Zenith / Solar Noon (Dhuhr)
  const apexY = 32;
  const endX = 475; // Sunset (West Horizon)
  const endY = 145;

  // Parabolic Quadratic Bezier Control Point for the Daytime Arc:
  // B(0.5) = 0.25*145 + 0.5*controlY + 0.25*145 = 32 => controlY = -81
  const dayControlX = 270;
  const dayControlY = -81;

  // Nocturnal Arc Control Point (Beneath the horizon for Night transit):
  // Nadir at Y = 210, horizon at Y = 145
  const nightControlX = 270;
  const nightControlY = 275;

  // Formula to calculate (x, y) along the daytime arc for 0 <= t <= 1
  const getDayArcCoordinates = (t: number) => {
    const clampedT = Math.max(0, Math.min(1, t));
    const x =
      Math.pow(1 - clampedT, 2) * startX +
      2 * (1 - clampedT) * clampedT * dayControlX +
      Math.pow(clampedT, 2) * endX;
    const y =
      Math.pow(1 - clampedT, 2) * startY +
      2 * (1 - clampedT) * clampedT * dayControlY +
      Math.pow(clampedT, 2) * endY;
    return { x, y };
  };

  // Formula to calculate (x, y) along the nocturnal subterranean arc
  const getNightArcCoordinates = (t: number) => {
    const clampedT = Math.max(0, Math.min(1, t));
    // Starts from sunset (endX), curves down through midnight nadir, arrives at sunrise (startX)
    const x =
      Math.pow(1 - clampedT, 2) * endX +
      2 * (1 - clampedT) * clampedT * nightControlX +
      Math.pow(clampedT, 2) * startX;
    const y =
      Math.pow(1 - clampedT, 2) * endY +
      2 * (1 - clampedT) * clampedT * nightControlY +
      Math.pow(clampedT, 2) * startY;
    return { x, y };
  };

  // Active progression
  const activeDayT = (isScrubbing || isAutoSimulating ? scrubPercent : solar.sunProgressPercent) / 100;
  const activeNightT = (isScrubbing || isAutoSimulating ? scrubPercent : solar.nightProgressPercent) / 100;

  const currentSunCoords = getDayArcCoordinates(activeDayT);
  const currentMoonCoords = getNightArcCoordinates(activeNightT);

  // Dynamic calculated Solar Altitude angle in degrees
  const currentAltitude = useMemo(() => {
    if (isScrubbing || isAutoSimulating) {
      // Parabolic estimation during scrub mode
      const raw = Math.sin(activeDayT * Math.PI) * 74.5;
      return Math.round(raw * 10) / 10;
    }
    return solar.solarAltitudeDeg;
  }, [isScrubbing, isAutoSimulating, activeDayT, solar.solarAltitudeDeg]);

  // Prohibited / Makruh prayer windows check (Islamic Jurisprudence)
  const prohibitedStatus = useMemo(() => {
    const now = new Date();
    const curTime = now.getTime();

    // 1. Sunrise window: sunrise until ~15m after
    if (solar.sunriseDate) {
      const sunriseMs = solar.sunriseDate.getTime();
      if (curTime >= sunriseMs - 2 * 60000 && curTime <= sunriseMs + 16 * 60000) {
        return {
          isProhibited: true,
          type: 'sunrise',
          title: selectedLanguage === 'bn' ? 'মাকরূহ ওয়াক্ত: সূর্যোদয় চলছে' : 'Prohibited: Sunrise in progress',
          subtitle: selectedLanguage === 'bn' ? 'সূর্য পূর্ণ ওঠার পূর্বে (~১৫ মিনিট) নামাজ পড়া মাকরূহে তাহরীমী' : 'Prayer prohibited for ~15 mins until solar disc elevates.',
        };
      }
    }

    // 2. Solar Noon / Zawal window: ~10m before Dhuhr until Dhuhr starts
    if (solar.solarNoonDate) {
      const noonMs = solar.solarNoonDate.getTime();
      if (curTime >= noonMs - 10 * 60000 && curTime <= noonMs + 2 * 60000) {
        return {
          isProhibited: true,
          type: 'zawal',
          title: selectedLanguage === 'bn' ? 'মাকরূহ ওয়াক্ত: দ্বিপ্রহরের যাওয়াল' : 'Prohibited: Solar Zenith (Zawal)',
          subtitle: selectedLanguage === 'bn' ? 'ঠিক দ্বিপ্রহরে সূর্য ঢলার পূর্ব পর্যন্ত নামাজ পড়া নিষেধ' : 'Exact solar noon meridian transition prohibited.',
        };
      }
    }

    // 3. Sunset window: ~15m before Sunset until Maghrib
    if (solar.sunsetDate) {
      const sunsetMs = solar.sunsetDate.getTime();
      if (curTime >= sunsetMs - 16 * 60000 && curTime <= sunsetMs + 2 * 60000) {
        return {
          isProhibited: true,
          type: 'sunset',
          title: selectedLanguage === 'bn' ? 'মাকরূহ ওয়াক্ত: সূর্যাস্ত চলছে' : 'Prohibited: Sunset in progress',
          subtitle: selectedLanguage === 'bn' ? 'সূর্য ডোবার সময় আসরের কাযা ব্যতীত যেকোনো নফল নামাজ নিষেধ' : 'Prayer prohibited as the sun dips beneath the horizon.',
        };
      }
    }

    return {
      isProhibited: false,
      type: 'valid',
      title: selectedLanguage === 'bn' ? 'সালাতের বৈধ ওয়াক্ত চলমান' : 'Permissible Prayer Window Active',
      subtitle: selectedLanguage === 'bn' ? 'যেকোনো ফরজ ও নফল নামাজ আদায় করা জায়েয' : 'Prescribed & voluntary prayers are permissible.',
    };
  }, [solar.sunriseDate, solar.solarNoonDate, solar.sunsetDate, selectedLanguage]);

  // Localized Next Prayer Name
  const nextPrayerNameLocalized =
    PRAYER_NAMES[prayerData.nextPrayerName]?.[selectedLanguage] || prayerData.nextPrayerName;

  // Waypoints along the solar journey
  const waypoints = [
    {
      id: 'fajr',
      nameBn: 'ফজর (প্রভাত)',
      nameEn: 'Fajr Dawn',
      arabic: 'الفجر',
      time: prayerData.fajr,
      altitude: '-18.0°',
      x: 35,
      y: 165,
      color: '#6366f1',
      desc: selectedLanguage === 'bn' ? 'সুবহে সাদিক: দিগন্তের ১৮° নিচে আলোর উন্মেষ' : 'True dawn twilight (-18° altitude)',
    },
    {
      id: 'sunrise',
      nameBn: 'সূর্যোদয়',
      nameEn: 'Sunrise',
      arabic: 'الشروق',
      time: solar.sunriseTime,
      altitude: '0.0°',
      x: startX,
      y: startY,
      color: '#f59e0b',
      desc: selectedLanguage === 'bn' ? 'সূর্য দিগন্ত স্পর্শ করে (১৫ মিনিট নামাজ নিষেধ)' : 'Upper limb meets horizon (0° altitude)',
    },
    {
      id: 'ishraq',
      nameBn: 'ইশরাক ও চাশত',
      nameEn: 'Duha / Ishraq',
      arabic: 'الضحى',
      time: '6:35 AM',
      altitude: '+15.0°',
      x: 130,
      y: 95,
      color: '#fbbf24',
      desc: selectedLanguage === 'bn' ? 'সূর্য এক বর্শা সমপরিমাণ উপরে ওঠে' : 'Solar disc rises 1 spear length (+15°)',
    },
    {
      id: 'dhuhr',
      nameBn: 'যাওয়াল ও জোহর',
      nameEn: 'Zenith (Dhuhr)',
      arabic: 'الظهر',
      time: solar.solarNoonTime,
      altitude: '+74.2°',
      x: apexX,
      y: apexY,
      color: '#10b981',
      desc: selectedLanguage === 'bn' ? 'সর্বোচ্চ মেরিডিয়ান উচ্চতা অতিক্রম করে জোহরের শুরু' : 'Highest meridian transit & decline',
    },
    {
      id: 'asr',
      nameBn: 'আসর',
      nameEn: 'Asr Time',
      arabic: 'العصر',
      time: prayerData.asr,
      altitude: '+38.5°',
      x: 410,
      y: 95,
      color: '#06b6d4',
      desc: selectedLanguage === 'bn' ? 'বস্তুর ছায়া সমপরিমাণ বা দ্বিগুণ হয়' : 'Object shadow length extends 1x or 2x',
    },
    {
      id: 'sunset',
      nameBn: 'সূর্যাস্ত ও মাগরিব',
      nameEn: 'Sunset (Maghrib)',
      arabic: 'المغرب',
      time: solar.sunsetTime,
      altitude: '0.0°',
      x: endX,
      y: endY,
      color: '#f43f5e',
      desc: selectedLanguage === 'bn' ? 'সূর্যমণ্ডল সম্পূর্ণ অস্তমিত হয় (ইফতারের সময়)' : 'Solar disc fully dips below horizon (0°)',
    },
    {
      id: 'isha',
      nameBn: 'ইশা ও তাহাজ্জুদ',
      nameEn: 'Isha & Night',
      arabic: 'العشاء',
      time: prayerData.isha,
      altitude: '-18.0°',
      x: 505,
      y: 165,
      color: '#8b5cf6',
      desc: selectedLanguage === 'bn' ? 'লাল শাফাক বিলীন হয়ে গভীর রাতের প্রবেশ' : 'Red dusk twilight fades into deep night',
    },
  ];

  // Dynamic sky dome atmospheric styling
  const skyTheme = useMemo(() => {
    if (!solar.isDaytime && !isScrubbing) {
      return {
        cardBg: isDay
          ? 'from-[#0b2730] via-[#081f26] to-[#04151b]'
          : 'from-[#06181d] via-[#08222a] to-[#030d10]',
        textColor: 'text-white',
        arcGlow: '#818cf8',
        label: 'রাত্রিকালীন কক্ষপথ • Nocturnal Transit',
      };
    }

    const t = isScrubbing || isAutoSimulating ? scrubPercent : solar.sunProgressPercent;

    if (t < 22) {
      // Dawn / Sunrise
      return {
        cardBg: isDay
          ? 'from-[#fff8f0] via-[#fef3e7] to-[#f6f9f8]'
          : 'from-[#1a1c29] via-[#16272e] to-[#091b22]',
        textColor: isDay ? 'text-slate-900' : 'text-white',
        arcGlow: '#f59e0b',
        label: 'সূর্যোদয় ও প্রত্যুষ • Dawn Horizon',
      };
    } else if (t > 78) {
      // Golden Hour / Sunset
      return {
        cardBg: isDay
          ? 'from-[#fff5f5] via-[#fef2f2] to-[#f4f9f7]'
          : 'from-[#24131b] via-[#1a222a] to-[#08181f]',
        textColor: isDay ? 'text-slate-900' : 'text-white',
        arcGlow: '#f43f5e',
        label: 'গোধূলি ও সূর্যাস্ত • Golden Dusk',
      };
    }

    // Midday Solar Apex
    return {
      cardBg: isDay
        ? 'from-[#f0fdf9] via-[#e6f7f2] to-[#f8fcfa]'
        : 'from-[#092b32] via-[#0c3942] to-[#071f25]',
      textColor: isDay ? 'text-slate-900' : 'text-white',
      arcGlow: '#10b981',
      label: 'দ্বিপ্রহর ও মধ্যাহ্ন আলো • Meridian Apex',
    };
  }, [solar.isDaytime, isScrubbing, isAutoSimulating, scrubPercent, solar.sunProgressPercent, isDay]);

  return (
    <div
      className={`rounded-3xl border transition-all duration-500 overflow-hidden relative shadow-xl ${
        isDay
          ? 'bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 border-slate-200/90 shadow-emerald-950/5'
          : 'bg-gradient-to-br from-[#072228] via-[#0a2f38] to-[#05181d] border-[#18535f]/60 shadow-black/40'
      }`}
    >
      {/* 1. TOP HEADER & CELESTIAL CONTROL STRIP */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-teal-900/40 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Title with Live Pulsing Radar Beacon */}
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute opacity-75" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative shadow-sm shadow-emerald-500" />
            </div>
            <h2 className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2">
              <span className={isDay ? 'text-slate-900' : 'text-white'}>
                {SOLAR_UI.title[selectedLanguage] || 'সূর্যের গতিপথ ও পরবর্তী নামাজ'}
              </span>
            </h2>
          </div>
          <p className="text-[11px] font-medium text-slate-500 dark:text-emerald-300/80 flex items-center gap-1.5 pl-5">
            <span>مسار الشمس الفلكي ومواقيت الصلاة</span>
            <span>•</span>
            <span>{skyTheme.label}</span>
          </p>
        </div>

        {/* Right: Controls & Live / Simulation Mode Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Status Badge */}
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold border transition flex items-center gap-1.5 ${
              !solar.isDaytime
                ? 'bg-indigo-950/40 text-indigo-300 border-indigo-700/50'
                : 'bg-emerald-950/40 text-emerald-300 border-emerald-700/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{solar.solarPhaseLabel}</span>
          </div>

          {/* Interactive Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsScrubbing((prev) => !prev);
              if (isAutoSimulating) setIsAutoSimulating(false);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              isScrubbing
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/40'
                : isDay
                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-[#092226] hover:bg-[#123840] text-emerald-300 border-[#1a515c]'
            }`}
            title="Interactive Sun Simulation"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isScrubbing ? (selectedLanguage === 'bn' ? 'সিমুলেশন চালু' : 'Simulating') : (selectedLanguage === 'bn' ? 'টাইম ট্রাভেল' : 'Simulation')}</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4 relative z-10">
        {/* 2. NEXT PRAYER SPOTLIGHT CARD (Modern Islamic Observatory Design) */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 shadow-sm relative overflow-hidden ${
            isDay
              ? 'bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-emerald-50/50 border-emerald-200/90 text-slate-900'
              : 'bg-gradient-to-r from-[#07252c] via-[#0b333c] to-[#08272e] border-emerald-500/30 text-white'
          }`}
        >
          {/* Subtle celestial compass background watermark */}
          <div className="absolute right-3 -bottom-6 opacity-5 pointer-events-none text-emerald-400">
            <Compass className="w-40 h-40" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            {/* Left Column: Next Prayer arrival status */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{SOLAR_UI.nextPrayer[selectedLanguage] || 'পরবর্তী নামাজ:'}</span>
                <span className="font-arabic opacity-80">• الصلاة القادمة</span>
              </div>

              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  {nextPrayerNameLocalized}
                </span>
                <span className="text-lg sm:text-xl font-bold font-arabic text-emerald-600 dark:text-emerald-400">
                  ({prayerData.nextPrayerArabic})
                </span>
                <span className="text-xl sm:text-2xl font-mono font-black text-slate-800 dark:text-emerald-200">
                  {prayerData.nextPrayerFormattedTime}
                </span>
              </div>

              {/* Prohibited Window Live Notice */}
              <div className="pt-1 flex items-center gap-2">
                {prohibitedStatus.isProhibited ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-bold animate-pulse">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>{prohibitedStatus.title}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{prohibitedStatus.title}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Live Seconds Countdown Pill */}
            <div className="flex flex-col sm:items-end justify-center gap-1 bg-white/70 dark:bg-black/30 p-3.5 rounded-2xl border border-emerald-500/20 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Clock className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-mono font-black tracking-tight text-emerald-800 dark:text-emerald-300">
                    {prayerData.timeRemainingFormatted}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/70">
                    {SOLAR_UI.remainingTime[selectedLanguage] || 'বাকি সময়'} • Live countdown
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE SIMULATION SCRUBBER TOOLBAR (If toggled on) */}
        {isScrubbing && (
          <div
            className={`p-4 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-300 space-y-3 ${
              isDay ? 'bg-slate-50 border-emerald-200' : 'bg-[#092226] border-emerald-500/30'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span>
                  {selectedLanguage === 'bn' ? 'সোলার টাইম-ট্রাভেল সিমুলেশন:' : 'Solar Time Simulation:'}{' '}
                  <span className="font-mono text-sm font-black">{scrubPercent}%</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Play / Pause Auto Simulation */}
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoSimulating((prev) => !prev);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  {isAutoSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isAutoSimulating ? 'Pause' : 'Auto Play'}</span>
                </button>

                {/* Reset to live */}
                <button
                  type="button"
                  onClick={() => {
                    setScrubPercent(solar.isDaytime ? solar.sunProgressPercent : 50);
                    setIsAutoSimulating(false);
                    setIsScrubbing(false);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className="px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{selectedLanguage === 'bn' ? 'লাইভে ফিরুন' : 'Live'}</span>
                </button>
              </div>
            </div>

            {/* Slider Track */}
            <input
              type="range"
              min="0"
              max="100"
              value={scrubPercent}
              onChange={(e) => setScrubPercent(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
            />

            {/* Quick Milestone Buttons */}
            <div className="flex items-center justify-between gap-1 text-[11px] font-mono overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setScrubPercent(0)}
                className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold hover:bg-amber-500/30 cursor-pointer"
              >
                0% সূর্যোদয় ({solar.sunriseTime})
              </button>
              <button
                type="button"
                onClick={() => setScrubPercent(50)}
                className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-500/30 cursor-pointer"
              >
                50% যাওয়াল/জোহর ({solar.solarNoonTime})
              </button>
              <button
                type="button"
                onClick={() => setScrubPercent(100)}
                className="px-2 py-1 rounded-lg bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-500/30 cursor-pointer"
              >
                100% সূর্যাস্ত ({solar.sunsetTime})
              </button>
            </div>
          </div>
        )}

        {/* 4. THE MASTER CELESTIAL DOME SVG VISUALIZATION */}
        <div className="relative pt-2 pb-2">
          {/* Active Milestone Popup Tooltip (If a milestone node is tapped) */}
          {activeMilestone && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 px-3.5 py-2 rounded-2xl bg-slate-900/95 text-white border border-emerald-500/40 shadow-xl backdrop-blur-md text-xs animate-in zoom-in-95 duration-150 flex items-center gap-3">
              {(() => {
                const wp = waypoints.find((w) => w.id === activeMilestone);
                if (!wp) return null;
                return (
                  <>
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: wp.color }}
                    />
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        <span>{wp.nameBn}</span>
                        <span className="font-arabic text-emerald-400">({wp.arabic})</span>
                        <span className="font-mono text-emerald-300">• {wp.time}</span>
                      </div>
                      <div className="text-[10px] text-slate-300">
                        {wp.desc} • সৌর উচ্চতা: {wp.altitude}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveMilestone(null)}
                      className="text-slate-400 hover:text-white font-bold ml-2 cursor-pointer"
                    >
                      ✕
                    </button>
                  </>
                );
              })()}
            </div>
          )}

          {/* SVG Canvas for Planetarium Dome */}
          <div className="relative w-full aspect-[2.4/1] max-h-[250px] select-none">
            <svg
              viewBox="0 0 540 240"
              className="w-full h-full overflow-visible select-none"
            >
              <defs>
                {/* Luminous Solar Trajectory Gradient: Dawn Amber -> Zenith Emerald -> Dusk Rose */}
                <linearGradient id="celestialTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="25%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="75%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>

                {/* Daylight Sky Dome Gradient Fill */}
                <linearGradient id="skyDomeFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={isDay ? '0.22' : '0.18'} />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity={isDay ? '0.10' : '0.08'} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>

                {/* Subterranean Nocturnal Dome Gradient Fill */}
                <linearGradient id="nightDomeFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#312e81" stopOpacity="0.0" />
                  <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.30" />
                </linearGradient>

                {/* Radiant Sun Corona Glow Radial */}
                <radialGradient id="sunCoronaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="25%" stopColor="#fef08a" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>

                {/* Radiant Moon Corona Glow Radial */}
                <radialGradient id="lunarGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e0e7ff" stopOpacity="1" />
                  <stop offset="35%" stopColor="#818cf8" stopOpacity="0.7" />
                  <stop offset="70%" stopColor="#3730a3" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
                </radialGradient>

                {/* Drop shadow for nodes */}
                <filter id="celestialShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* 1. Atmospheric Sky Dome Fill above Horizon */}
              <path
                d={`M ${startX} ${startY} Q ${dayControlX} ${dayControlY} ${endX} ${endY} L ${endX} ${startY} L ${startX} ${startY} Z`}
                fill="url(#skyDomeFill)"
              />

              {/* 2. Subterranean Night Dome Fill below Horizon */}
              <path
                d={`M ${endX} ${endY} Q ${nightControlX} ${nightControlY} ${startX} ${startY} L ${startX} ${startY} L ${endX} ${endY} Z`}
                fill="url(#nightDomeFill)"
              />

              {/* 3. Delicate Star Field (Twinkling in night sky) */}
              <g opacity={isDay ? '0.35' : '0.85'}>
                <circle cx="100" cy="50" r="1" fill="#ffffff" />
                <circle cx="180" cy="35" r="1.3" fill="#fef08a" />
                <circle cx="360" cy="40" r="1" fill="#ffffff" />
                <circle cx="430" cy="55" r="1.2" fill="#c7d2fe" />
                <circle cx="210" cy="185" r="1" fill="#ffffff" />
                <circle cx="330" cy="195" r="1.3" fill="#ffffff" />
                <circle cx="140" cy="190" r="1.2" fill="#e0e7ff" />
                <circle cx="400" cy="180" r="1" fill="#fef08a" />
              </g>

              {/* 4. Subterranean Night Arc Track (Dotted Astronomical Guide) */}
              <path
                d={`M ${endX} ${endY} Q ${nightControlX} ${nightControlY} ${startX} ${startY}`}
                fill="none"
                stroke={isDay ? '#94a3b8' : '#334155'}
                strokeWidth="1.5"
                strokeDasharray="4 6"
                opacity="0.6"
              />

              {/* 5. Daytime Solar Parabolic Arc (Vibrant Glowing Multi-stop Beam) */}
              <path
                d={`M ${startX} ${startY} Q ${dayControlX} ${dayControlY} ${endX} ${endY}`}
                fill="none"
                stroke="url(#celestialTrackGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                filter="url(#celestialShadow)"
              />

              {/* 6. Horizon Reference Line (East - West Axis) */}
              <line
                x1="25"
                y1={startY}
                x2="515"
                y2={startY}
                stroke={isDay ? '#64748b' : '#475569'}
                strokeWidth="2"
                strokeDasharray="6 6"
                opacity="0.75"
              />

              {/* Horizon Cardinal Labels */}
              <text
                x="30"
                y={startY - 8}
                fill={isDay ? '#475569' : '#94a3b8'}
                fontSize="9"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                পূর্ব • EAST
              </text>
              <text
                x="475"
                y={startY - 8}
                fill={isDay ? '#475569' : '#94a3b8'}
                fontSize="9"
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="end"
              >
                পশ্চিম • WEST
              </text>
              <text
                x="270"
                y={startY + 14}
                fill={isDay ? '#64748b' : '#64748b'}
                fontSize="8"
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                দিগন্ত রেখা (HORIZON 0°)
              </text>

              {/* 7. WAYPOINT NODES ON THE CELESTIAL ARC */}

              {/* Node 1: Sunrise (East Horizon) */}
              <g
                transform={`translate(${startX}, ${startY})`}
                filter="url(#celestialShadow)"
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => {
                  setActiveMilestone('sunrise');
                  if (soundEnabled) soundHaptics.playTap();
                }}
              >
                <circle r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
                <circle r="3.5" fill="#ffffff" />
              </g>

              {/* Node 2: Solar Noon / Dhuhr Zenith (Peak Apex) */}
              <g
                transform={`translate(${apexX}, ${apexY})`}
                filter="url(#celestialShadow)"
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => {
                  setActiveMilestone('dhuhr');
                  if (soundEnabled) soundHaptics.playTap();
                }}
              >
                <circle r="9.5" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
                <circle r="4" fill="#ffffff" />
              </g>

              {/* Node 3: Sunset (West Horizon) */}
              <g
                transform={`translate(${endX}, ${endY})`}
                filter="url(#celestialShadow)"
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => {
                  setActiveMilestone('sunset');
                  if (soundEnabled) soundHaptics.playTap();
                }}
              >
                <circle r="9" fill="#f43f5e" stroke="#ffffff" strokeWidth="2.5" />
                <circle r="3.5" fill="#ffffff" />
              </g>

              {/* 8. ACTIVE MOVING CELESTIAL BODY (Sun or Moon) */}
              {solar.isDaytime || isScrubbing ? (
                // Luminous Sun Orb gliding along the Daytime Arc
                <g
                  transform={`translate(${currentSunCoords.x}, ${currentSunCoords.y})`}
                  className="transition-all duration-200 pointer-events-none"
                >
                  {/* Altitude Drop Line to Horizon */}
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2={startY - currentSunCoords.y}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="2 3"
                    opacity="0.8"
                  />

                  {/* Pulsing Outer Corona Rays */}
                  <circle r="28" fill="url(#sunCoronaGlow)" className="animate-pulse" />

                  {/* Solar Core */}
                  <circle
                    r="11"
                    fill="#fbbf24"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    filter="url(#celestialShadow)"
                  />
                  <circle r="4.5" fill="#ffffff" />

                  {/* Live Angle Tag Floating Above Sun */}
                  <g transform="translate(0, -22)">
                    <rect
                      x="-22"
                      y="-12"
                      width="44"
                      height="15"
                      rx="6"
                      fill="#0f172a"
                      fillOpacity="0.9"
                      stroke="#f59e0b"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="-2"
                      fill="#fef08a"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {currentAltitude > 0 ? `+${currentAltitude}°` : `${currentAltitude}°`}
                    </text>
                  </g>
                </g>
              ) : (
                // Ethereal Moon Orb gliding along the Subterranean Nocturnal Arc
                <g
                  transform={`translate(${currentMoonCoords.x}, ${currentMoonCoords.y})`}
                  className="transition-all duration-200 pointer-events-none"
                  filter="url(#celestialShadow)"
                >
                  {/* Lunar Aura Glow */}
                  <circle r="26" fill="url(#lunarGlow)" className="animate-pulse" />

                  {/* Crescent Moon Disc */}
                  <circle
                    r="12"
                    fill="#1e1b4b"
                    stroke="#818cf8"
                    strokeWidth="2.5"
                  />
                  {/* Crescent icon */}
                  <path
                    d="M -3 -6 A 7 7 0 0 0 5 4 A 8 8 0 1 1 -3 -6"
                    fill="#e0e7ff"
                    transform="scale(0.85) translate(0, -1)"
                  />

                  {/* Night altitude badge */}
                  <g transform="translate(0, -20)">
                    <rect
                      x="-24"
                      y="-11"
                      width="48"
                      height="14"
                      rx="6"
                      fill="#0f172a"
                      fillOpacity="0.9"
                      stroke="#818cf8"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="-1"
                      fill="#c7d2fe"
                      fontSize="8.5"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {solar.solarAltitudeDeg}° (Night)
                    </text>
                  </g>
                </g>
              )}
            </svg>
          </div>

          {/* 3 Prominent Anchor Waypoint Cards Directly Beneath SVG */}
          <div className="grid grid-cols-3 text-center gap-2 pt-1 select-none">
            {/* 1. Sunrise Card */}
            <div
              onClick={() => {
                setActiveMilestone('sunrise');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="p-2 sm:p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left hover:border-amber-500/50 transition cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                <SunriseIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{selectedLanguage === 'bn' ? 'সূর্যোদয়' : 'Sunrise'}</span>
              </div>
              <div className="text-xs sm:text-sm font-mono font-black mt-0.5 text-slate-800 dark:text-amber-200">
                {solar.sunriseTime}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                দিগন্ত উচ্চতা 0°
              </div>
            </div>

            {/* 2. Solar Noon / Dhuhr Apex Card */}
            <div
              onClick={() => {
                setActiveMilestone('dhuhr');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="p-2 sm:p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center hover:border-emerald-500/50 transition cursor-pointer"
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Sun className="w-3.5 h-3.5 shrink-0" />
                <span>{selectedLanguage === 'bn' ? 'মধ্যাহ্ন (জোহর)' : 'Solar Noon'}</span>
              </div>
              <div className="text-xs sm:text-sm font-mono font-black mt-0.5 text-slate-800 dark:text-emerald-200">
                {solar.solarNoonTime}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                শীর্ষ কোণ +74°
              </div>
            </div>

            {/* 3. Sunset Card */}
            <div
              onClick={() => {
                setActiveMilestone('sunset');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="p-2 sm:p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-right hover:border-rose-500/50 transition cursor-pointer"
            >
              <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                <SunsetIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{selectedLanguage === 'bn' ? 'সূর্যাস্ত (মাগরিব)' : 'Sunset'}</span>
              </div>
              <div className="text-xs sm:text-sm font-mono font-black mt-0.5 text-slate-800 dark:text-rose-200">
                {solar.sunsetTime}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {solar.sunsetRange}
              </div>
            </div>
          </div>
        </div>

        {/* 5. ASTRONOMICAL METRICS GRID (Professional 3-Column Display) */}
        <div className={`p-4 rounded-2xl border ${isDay ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
          <div className="grid grid-cols-3 gap-3 divide-x divide-slate-200 dark:divide-slate-800">
            {/* Metric 1: Total Daylight */}
            <div className="space-y-1 pr-1">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {selectedLanguage === 'bn' ? 'দিনের মোট আলো' : 'Total Daylight'}
              </div>
              <div className="text-sm sm:text-base font-mono font-black text-amber-600 dark:text-amber-400">
                {solar.daylightTotalFormatted}
              </div>
              <div className="text-[10px] text-slate-400">
                সূর্যোদয় থেকে সূর্যাস্ত
              </div>
            </div>

            {/* Metric 2: Remaining Daylight */}
            <div className="space-y-1 px-2">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {selectedLanguage === 'bn' ? 'অবশিষ্ট আলো' : 'Remaining Daylight'}
              </div>
              <div className="text-sm sm:text-base font-mono font-black text-emerald-600 dark:text-emerald-400">
                {solar.isDaytime ? solar.daylightRemainingFormatted : (selectedLanguage === 'bn' ? '০ মি. (রাত চলমান)' : '0m (Night)')}
              </div>
              <div className="text-[10px] text-slate-400">
                {solar.isDaytime ? 'সূর্যাস্ত বাকি' : 'নিশি কালীন ওয়াক্ত'}
              </div>
            </div>

            {/* Metric 3: Current Salat Phase */}
            <div className="space-y-1 pl-2">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {selectedLanguage === 'bn' ? 'বর্তমান পর্যায়' : 'Current Phase'}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                {solar.solarPhaseLabel}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                {solar.isDaytime ? 'দিবানির্ভর ওয়াক্ত' : 'রাত্রির প্রহর'}
              </div>
            </div>
          </div>
        </div>

        {/* 6. EXPANDABLE SOLAR SCIENCE & ISLAMIC RULES ACCORDION */}
        <div className="pt-1">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-600 dark:text-emerald-300">
              <Compass className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                Altitude: <strong>{currentAltitude > 0 ? `+${currentAltitude}°` : `${currentAltitude}°`}</strong>
              </span>
              <span>•</span>
              <span>
                Azimuth: <strong>{solar.solarAzimuthDeg}° (W)</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowScienceDetails((prev) => !prev);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{showScienceDetails ? (selectedLanguage === 'bn' ? 'বিবরণ বন্ধ করুন' : 'Hide Science') : (selectedLanguage === 'bn' ? 'সোলার সায়েন্স ও ইসলামিক বিধান' : 'Solar Science')}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${showScienceDetails ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Expanded Educational Insight Panel */}
          {showScienceDetails && (
            <div
              className={`mt-3 p-4 rounded-2xl border text-xs leading-relaxed space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
                isDay ? 'bg-emerald-50/70 border-emerald-200 text-slate-700' : 'bg-[#092226] border-emerald-500/30 text-emerald-200'
              }`}
            >
              <div className="font-bold flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-sm">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>ইসলামিক জ্যোতির্বিজ্ঞান ও নামাজের ওয়াক্ত নির্ধারণ পদ্ধতি</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                ঐতিহাসিক ইসলামিক জ্যোতির্বিজ্ঞানীগণ (যেমন: আল-বিরুনী ও ইবনে আল-হাইসাম) সূর্যের প্রত্যক্ষ গতিপথ ও ছায়ার পরিবর্তনের মাধ্যমে নামাজের ছয়টি প্রধান পর্যায় নির্ভুলভাবে নির্ধারণ করেছিলেন:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-black/30 border border-emerald-500/20 space-y-1">
                  <div className="font-bold text-amber-600 dark:text-amber-400">১. ফজর (সুবহে সাদিক):</div>
                  <div>পূর্ব দিগন্তের ১৮° নিচে সূর্যের আলো বিচ্ছুরিত হয়ে শুভ্র আলোকচ্ছটা ছড়িয়ে পড়লে ফজরের সময় শুরু হয়।</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-black/30 border border-emerald-500/20 space-y-1">
                  <div className="font-bold text-amber-500">২. সূর্যোদয় (নামাজ নিষেধ):</div>
                  <div>সূর্য ওঠার সময় থেকে পূর্ণ গোলাকার হয়ে উজ্জ্বল না হওয়া পর্যন্ত (~১৫ মিনিট) নামাজ পড়া মাকরূহে তাহরীমী।</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-black/30 border border-emerald-500/20 space-y-1">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">৩. যাওয়াল ও জোহর:</div>
                  <div>ঠিক মধ্যাহ্নে সূর্য মেরিন্ডিয়ান চূড়ায় পৌঁছায়। চূড়া থেকে সামান্য পশ্চিমমুখী ঢলে পড়লেই জোহরের ওয়াক্ত আরম্ভ হয়।</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-black/30 border border-emerald-500/20 space-y-1">
                  <div className="font-bold text-teal-600 dark:text-teal-400">৪. আসর ও ছায়ার পরিমাপ:</div>
                  <div>যাওয়ালের সর্বনিম্ন ছায়া বাদে কোনো বস্তুর ছায়া তার মূল আকারের সমপরিমাণ (বা হানাফি মতে দ্বিগুণ) হলে আসর শুরু হয়।</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-black/30 border border-emerald-500/20 space-y-1">
                  <div className="font-bold text-rose-600 dark:text-rose-400">৫. মাগরিব ও সূর্যাস্ত:</div>
                  <div>সূর্যের পুরো মণ্ডল পশ্চিম দিগন্তের নিচে সম্পূর্ণ মিলিয়ে যাওয়া মাত্রই মাগরিবের ওয়াক্ত ও রোজাদারদের ইফতারের সময় হয়।</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-black/30 border border-emerald-500/20 space-y-1">
                  <div className="font-bold text-indigo-400">৬. ইশা ও তাহাজ্জুদ:</div>
                  <div>পশ্চিমাকাশের রক্তিম শাফাক (আভা) সম্পূর্ণরূপে অদৃশ্য হয়ে ১৮° গভীর আঁধারে ডুবে গেলে ইশার ওয়াক্ত প্রবেশ করে।</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
