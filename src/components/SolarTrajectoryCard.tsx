import React, { useState, useEffect, useMemo } from 'react';
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
  Eye,
  ChevronRight,
  Flame,
  CloudSun,
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

  // Interactive scrubber mode (allows user to drag and see sun position across the day)
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [scrubPercent, setScrubPercent] = useState<number>(solar.sunProgressPercent);
  const [showAngleInfo, setShowAngleInfo] = useState<boolean>(false);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  // Sync scrubPercent with real solar progress when not manually dragging
  useEffect(() => {
    if (!isScrubbing) {
      setScrubPercent(solar.isDaytime ? solar.sunProgressPercent : 50);
    }
  }, [solar.sunProgressPercent, solar.isDaytime, isScrubbing]);

  // Coordinates for the Solar Arc in SVG ViewBox (0 0 520 210)
  // Horizon Y is at 145. Arc starts at X: 55, Y: 145. Arc peak at X: 260, Y: 35. Arc ends at X: 465, Y: 145.
  const startX = 60;
  const startY = 145;
  const apexX = 260;
  const apexY = 32;
  const endX = 460;
  const endY = 145;

  // Parabolic Quadratic Curve Path: M startX startY Q apexX (apexY - 80) endX endY
  // Using quadratic bezier formula: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
  // For apex at (260, 32), with P0=(60,145), P2=(460,145):
  // At t=0.5: 0.25*145 + 0.5*P1_y + 0.25*145 = 32 => 72.5 + 0.5*P1_y = 32 => P1_y = -81
  const controlX = 260;
  const controlY = -81;

  const getArcCoordinates = (t: number) => {
    const clampedT = Math.max(0, Math.min(1, t));
    const x =
      Math.pow(1 - clampedT, 2) * startX +
      2 * (1 - clampedT) * clampedT * controlX +
      Math.pow(clampedT, 2) * endX;
    const y =
      Math.pow(1 - clampedT, 2) * startY +
      2 * (1 - clampedT) * clampedT * controlY +
      Math.pow(clampedT, 2) * endY;
    return { x, y };
  };

  // Active Celestial Position
  const activeT = (isScrubbing ? scrubPercent : (solar.isDaytime ? solar.sunProgressPercent : 50)) / 100;
  const currentCoords = getArcCoordinates(activeT);

  // Solar Altitude for current active scrubber or real-time
  const calculatedAltitude = useMemo(() => {
    if (isScrubbing) {
      return Math.round(Math.sin(activeT * Math.PI) * 72 * 10) / 10;
    }
    return solar.solarAltitudeDeg;
  }, [isScrubbing, activeT, solar.solarAltitudeDeg]);

  // Next prayer localized name
  const nextPrayerNameLocalized =
    PRAYER_NAMES[prayerData.nextPrayerName]?.[selectedLanguage] || prayerData.nextPrayerName;

  // Sky backdrop gradient based on phase
  const skyAtmosphere = useMemo(() => {
    if (!solar.isDaytime) {
      return isDay
        ? 'from-slate-900/10 via-teal-900/5 to-transparent'
        : 'from-[#071d23]/80 via-[#0a272e]/40 to-transparent';
    }
    if (solar.sunProgressPercent < 20) {
      return 'from-amber-500/15 via-orange-500/5 to-transparent'; // Dawn / Sunrise
    }
    if (solar.sunProgressPercent > 80) {
      return 'from-rose-500/15 via-orange-500/10 to-transparent'; // Golden hour / Sunset
    }
    return 'from-emerald-500/15 via-emerald-500/5 to-transparent'; // Midday
  }, [solar.isDaytime, solar.sunProgressPercent, isDay]);

  return (
    <div
      className={`rounded-3xl border shadow-sm transition-all duration-300 overflow-hidden relative ${
        isDay ? 'bg-white border-[#dcebe8] shadow-md shadow-[#006747]/5' : 'bg-[#0e2f36] border-[#1a515c]'
      }`}
    >
      {/* Dynamic ambient backdrop light */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${skyAtmosphere} pointer-events-none transition-all duration-700`}
      />

      <div className="p-4 sm:p-5 relative z-10 space-y-4">
        {/* 1. TOP TITLE BAR (SOLAR TRAJECTORY & NEXT PRAYER + STATUS) */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00875a] shadow-sm shadow-[#00875a]/80 animate-pulse shrink-0" />
            <h2
              className={`text-xs sm:text-sm font-black tracking-wider uppercase ${
                isDay ? 'text-[#0a3328]' : 'text-teal-100'
              }`}
            >
              {SOLAR_UI.title[selectedLanguage] || 'Solar Trajectory & Next Prayer'}
            </h2>
          </div>

          {/* Current Solar Phase Badge (e.g. After Sunset, Golden Hour, Solar Noon) */}
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                !solar.isDaytime
                  ? isDay
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : 'bg-indigo-950/60 text-indigo-300 border-indigo-800/60'
                  : solar.sunProgressPercent > 80
                  ? isDay
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                  : isDay
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
              }`}
            >
              {solar.solarPhaseLabel}
            </span>

            {/* Scrubber Mode Toggle */}
            <button
              onClick={() => {
                setIsScrubbing((prev) => !prev);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`p-1.5 rounded-xl border text-xs transition cursor-pointer active:scale-95 ${
                isScrubbing
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : isDay
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                  : 'bg-[#092226] hover:bg-[#133c44] text-emerald-300 border-[#184850]'
              }`}
              title={isScrubbing ? 'Exit Solar Scrubbing' : 'Explore Sun Path'}
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. NEXT PRAYER IN BANNER (Matching the exact photo layout) */}
        <div
          className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 shadow-sm relative overflow-hidden ${
            isDay
              ? 'bg-gradient-to-r from-[#eef9f7] via-[#f4faf9] to-[#edf7f5] border-[#d2ece9]'
              : 'bg-gradient-to-r from-[#09272d] via-[#0e353d] to-[#0a2a30] border-[#184850]'
          }`}
        >
          {/* Subtle geometric islamic accent in background */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            {/* Left: Next Prayer Label & Big Prayer Name */}
            <div className="space-y-1">
              <div className={`flex items-center gap-1.5 text-[11px] sm:text-xs font-extrabold tracking-wide uppercase ${
                isDay ? 'text-[#005a3e]' : 'text-emerald-400'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{SOLAR_UI.nextPrayer[selectedLanguage] || 'Next Prayer:'} • الصلاة القادمة</span>
              </div>

              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className={`text-xl sm:text-2xl font-black tracking-tight ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
                  {nextPrayerNameLocalized}
                </span>
                <span className={`text-base sm:text-lg font-bold font-arabic ${
                  isDay ? 'text-[#005a3e]' : 'text-emerald-300'
                }`}>
                  ({prayerData.nextPrayerArabic})
                </span>
                <span className={`font-mono text-base sm:text-lg font-black ${
                  isDay ? 'text-[#005a3e]' : 'text-emerald-300'
                }`}>
                  {prayerData.nextPrayerFormattedTime}
                </span>
              </div>
            </div>

            {/* Right: Remaining Live Countdown Pill */}
            <div className="flex flex-col sm:items-end gap-1">
              <div
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border shadow-sm font-mono font-black text-xs sm:text-sm tracking-tight ${
                  isDay
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-black'
                    : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                }`}
              >
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span>{prayerData.timeRemainingFormatted} {SOLAR_UI.remainingTime[selectedLanguage] || 'remaining'}</span>
              </div>
              <span className={`text-[10px] font-bold ${isDay ? 'text-slate-700' : 'text-emerald-300/60'} sm:text-right`}>
                Live second countdown
              </span>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE SOLAR SCRUBBER SLIDER (If Active) */}
        {isScrubbing && (
          <div
            className={`p-3 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-200 ${
              isDay ? 'bg-[#f4faf9] border-[#d2ece9]' : 'bg-[#092226] border-[#184850]'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
              <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>Simulating Sun Position: {scrubPercent}%</span>
              </span>
              <button
                onClick={() => {
                  setScrubPercent(solar.isDaytime ? solar.sunProgressPercent : 50);
                  setIsScrubbing(false);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className="text-[11px] text-slate-500 hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Live</span>
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={scrubPercent}
              onChange={(e) => setScrubPercent(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono font-semibold">
              <span>0% (Sunrise {solar.sunriseTime})</span>
              <span>50% (Solar Noon {solar.solarNoonTime})</span>
              <span>100% (Sunset {solar.sunsetTime})</span>
            </div>
          </div>
        )}

        {/* 4. VISUAL SOLAR TRAJECTORY ARC SVG (As seen in the screenshot) */}
        <div className="relative pt-2 pb-2">
          {/* SVG Canvas for Trajectory Arc & Horizon */}
          <div className="relative w-full aspect-[2.5/1] max-h-[220px]">
            <svg
              viewBox="0 0 520 210"
              className="w-full h-full overflow-visible select-none"
            >
              <defs>
                {/* Arc stroke gradient: Sunrise Gold -> Solar Noon Emerald -> Sunset Rose */}
                <linearGradient id="solarArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>

                {/* Daylight Sky fill glow underneath arc */}
                <linearGradient id="daylightAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
                  <stop offset="60%" stopColor="#10b981" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>

                {/* Sun Glow Radial Gradient */}
                <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
                  <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#ea580c" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
                </radialGradient>

                {/* Moon Glow Radial Gradient */}
                <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#312e81" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
                </radialGradient>

                {/* Shadow filter for nodes */}
                <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Sky Fill under the arc */}
              <path
                d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY} L ${endX} ${startY} L ${startX} ${startY} Z`}
                fill="url(#daylightAreaGrad)"
              />

              {/* Horizon Dotted Line across the base */}
              <line
                x1="20"
                y1={startY}
                x2="500"
                y2={startY}
                stroke={isDay ? '#94a3b8' : '#334155'}
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />

              {/* Solar Parabolic Arc (Background Track) */}
              <path
                d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
                fill="none"
                stroke="url(#solarArcGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                className="opacity-80"
              />

              {/* 3 WAYPOINT NODES */}

              {/* A. Sunrise Node (Left) */}
              <g
                transform={`translate(${startX}, ${startY})`}
                filter="url(#nodeShadow)"
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => {
                  setSelectedMilestone('sunrise');
                  if (soundEnabled) soundHaptics.playTap();
                }}
              >
                <circle r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
              </g>

              {/* B. Solar Noon (Dhuhr Apex Node - Top Center) */}
              <g
                transform={`translate(${apexX}, ${apexY})`}
                filter="url(#nodeShadow)"
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => {
                  setSelectedMilestone('noon');
                  if (soundEnabled) soundHaptics.playTap();
                }}
              >
                <circle r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
              </g>

              {/* C. Sunset Node (Right) */}
              <g
                transform={`translate(${endX}, ${endY})`}
                filter="url(#nodeShadow)"
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => {
                  setSelectedMilestone('sunset');
                  if (soundEnabled) soundHaptics.playTap();
                }}
              >
                <circle r="8" fill="#f43f5e" stroke="#ffffff" strokeWidth="2.5" />
              </g>

              {/* REAL-TIME OR SCRUBBED CELESTIAL BODY (Sun or Moon) */}
              {solar.isDaytime || isScrubbing ? (
                // Glowing Sun Orb moving along the arc
                <g
                  transform={`translate(${currentCoords.x}, ${currentCoords.y})`}
                  className="transition-all duration-300 pointer-events-none"
                >
                  {/* Radiant outer halo pulse */}
                  <circle r="24" fill="url(#sunGlow)" className="animate-pulse" />
                  {/* Sun core disk */}
                  <circle
                    r="10"
                    fill="#fbbf24"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="shadow-md"
                  />
                  {/* Center glowing core */}
                  <circle r="4" fill="#ffffff" />
                </g>
              ) : (
                // Moon Orb on the Horizon (as shown in the user's uploaded image!)
                <g
                  transform={`translate(260, ${startY})`}
                  className="transition-all duration-300 pointer-events-none"
                  filter="url(#nodeShadow)"
                >
                  {/* Glowing Lunar aura */}
                  <circle r="22" fill="url(#moonGlow)" className="animate-pulse" />
                  {/* Dark Night Orb with luminous border */}
                  <circle
                    r="12"
                    fill="#1e1b4b"
                    stroke="#818cf8"
                    strokeWidth="2.5"
                    className="shadow-xl"
                  />
                  {/* Crescent Moon icon inside */}
                  <path
                    d="M -3 -6 A 7 7 0 0 0 5 4 A 8 8 0 1 1 -3 -6"
                    fill="#e0e7ff"
                    transform="scale(0.8) translate(0, -1)"
                  />
                </g>
              )}
            </svg>
          </div>

          {/* 3 Node Labels directly underneath the SVG anchor points */}
          <div className="grid grid-cols-3 text-center gap-1 -mt-3 sm:-mt-2 relative z-10 select-none">
            {/* 1. Sunrise Info */}
            <div className="text-left pl-2 sm:pl-4">
              <div className="flex items-center gap-1 text-xs sm:text-sm font-extrabold text-amber-600 dark:text-amber-500">
                <SunriseIcon className="w-3.5 h-3.5 shrink-0" />
                <span>Sunrise</span>
              </div>
              <div className={`text-[11px] sm:text-xs font-mono font-extrabold mt-0.5 ${
                isDay ? 'text-slate-800' : 'text-emerald-200/80'
              }`}>
                {solar.sunriseTime}
              </div>
            </div>

            {/* 2. Solar Noon Info (Apex) */}
            <div className="text-center">
              <div className={`flex items-center justify-center gap-1 text-xs sm:text-sm font-extrabold ${
                isDay ? 'text-[#005a3e]' : 'text-emerald-400'
              }`}>
                <Sun className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                <span>Solar Noon (Dhuhr)</span>
              </div>
              <div className={`text-[11px] sm:text-xs font-mono font-extrabold mt-0.5 ${
                isDay ? 'text-slate-800' : 'text-emerald-200/80'
              }`}>
                {solar.solarNoonTime}
              </div>
            </div>

            {/* 3. Sunset Info */}
            <div className="text-right pr-2 sm:pr-4">
              <div className="flex items-center justify-end gap-1 text-xs sm:text-sm font-extrabold text-rose-600 dark:text-rose-500">
                <SunsetIcon className="w-3.5 h-3.5 shrink-0" />
                <span>Sunset</span>
              </div>
              <div className={`text-[10px] sm:text-xs font-mono font-extrabold mt-0.5 ${
                isDay ? 'text-slate-800' : 'text-emerald-200/80'
              }`}>
                {solar.sunsetRange}
              </div>
            </div>
          </div>
        </div>

        {/* 5. BOTTOM METRICS BAR (Total Daylight, Remaining Daylight, Current Salat Phase) */}
        <div className={`pt-3 border-t ${isDay ? 'border-slate-200' : 'border-teal-900/40'}`}>
          <div className={`grid grid-cols-3 gap-2 text-center divide-x ${isDay ? 'divide-slate-200' : 'divide-teal-900/40'}`}>
            {/* Metric 1: Total Daylight */}
            <div className="space-y-1">
              <div className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider ${
                isDay ? 'text-slate-700' : 'text-emerald-300/70'
              }`}>
                Total Daylight
              </div>
              <div className="text-sm sm:text-base font-mono font-black text-amber-600 dark:text-amber-400">
                {solar.daylightTotalFormatted}
              </div>
            </div>

            {/* Metric 2: Remaining Daylight */}
            <div className="space-y-1">
              <div className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider ${
                isDay ? 'text-slate-700' : 'text-emerald-300/70'
              }`}>
                Remaining Daylight
              </div>
              <div className={`text-sm sm:text-base font-mono font-black ${
                isDay ? 'text-[#005a3e]' : 'text-emerald-400'
              }`}>
                {solar.isDaytime ? solar.daylightRemainingFormatted : '0m (Night)'}
              </div>
            </div>

            {/* Metric 3: Current Salat Phase */}
            <div className="space-y-1">
              <div className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider ${
                isDay ? 'text-slate-700' : 'text-emerald-300/70'
              }`}>
                Current Salat Phase
              </div>
              <div className={`text-xs sm:text-sm font-extrabold truncate px-1 ${
                isDay ? 'text-slate-900' : 'text-teal-100'
              }`}>
                {solar.solarPhaseLabel}
              </div>
            </div>
          </div>
        </div>

        {/* 6. EXPANDABLE SOLAR ANGLE & PRAYER WINDOWS STRIP */}
        <div className={`flex items-center justify-between pt-1 text-[11px] ${
          isDay ? 'text-slate-800 font-bold' : 'text-emerald-300/70'
        }`}>
          <div className="flex items-center gap-1.5 font-mono">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              Altitude: <strong className={isDay ? 'text-[#005a3e] font-extrabold' : 'text-emerald-300'}>{calculatedAltitude > 0 ? `+${calculatedAltitude}°` : `${calculatedAltitude}°`}</strong>
            </span>
            <span>•</span>
            <span>
              Azimuth: <strong className={isDay ? 'text-[#005a3e] font-extrabold' : 'text-emerald-300'}>{solar.solarAzimuthDeg}°</strong>
            </span>
          </div>

          <button
            onClick={() => {
              setShowAngleInfo((prev) => !prev);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className={`font-bold hover:underline flex items-center gap-1 cursor-pointer ${
              isDay ? 'text-[#005a3e] font-black' : 'text-emerald-400'
            }`}
          >
            <span>{showAngleInfo ? 'Hide Details' : 'Solar Science'}</span>
            <ChevronRight className={`w-3 h-3 transition-transform ${showAngleInfo ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Expandable Explanation of Islamic Sun Trajectory */}
        {showAngleInfo && (
          <div
            className={`p-3 rounded-2xl border text-xs leading-relaxed space-y-2 animate-in fade-in duration-200 ${
              isDay ? 'bg-[#f4faf9] border-[#d2ece9] text-slate-700' : 'bg-[#092226] border-[#184850] text-emerald-300'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Solar Trajectory &amp; Islamic Prayer Times</span>
            </div>
            <p className="text-[11px]">
              Every Islamic prayer corresponds to a distinct phase of the sun’s journey across the celestial dome:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-emerald-200/90 pl-1 font-sans">
              <li><strong className="text-amber-600 dark:text-amber-400">Fajr:</strong> True dawn twilight when the sun is 18° below the eastern horizon.</li>
              <li><strong className="text-amber-500">Sunrise:</strong> Upper limb of the sun touches the horizon (prayer prohibited for ~15m).</li>
              <li><strong className="text-emerald-600 dark:text-emerald-400">Solar Noon (Zawal / Dhuhr):</strong> The sun reaches its highest meridian altitude and starts declining.</li>
              <li><strong className="text-teal-600 dark:text-emerald-300">Asr:</strong> When object shadows equal 1x or 2x (Hanafi) of their height plus midday shadow.</li>
              <li><strong className="text-rose-500">Sunset / Maghrib:</strong> The solar disc completely dips beneath the horizon.</li>
              <li><strong className="text-indigo-400">Isha &amp; Tahajjud:</strong> Red twilight disappears into deep celestial night.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
