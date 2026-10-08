import React, { useState, useEffect, useRef } from 'react';
import {
  calculatePrayerTimes,
  FormattedPrayerTimes,
  POPULAR_CITIES,
  CityOption,
  FardPrayerItem,
  NafalPrayerItem,
  ProhibitedPrayerItem,
} from '../utils/prayerTimes';
import {
  Clock,
  Compass,
  MapPin,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Navigation,
  Sun,
  Moon,
  Sunrise as SunriseIcon,
  Sunset as SunsetIcon,
  Bell,
  BellOff,
  SlidersHorizontal,
  RotateCw,
  CheckCircle2,
  Calendar,
  Search,
  Share2,
  Info,
  ShieldCheck,
  Shield,
  CloudSun,
  X,
  Radio,
  BookOpen,
  Scroll,
  Copy,
  Check,
  Layers,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { ThemeMode, ZikrLanguage } from '../types';
import { PRAYER_NAMES, SALAT_UI } from '../utils/appTranslations';
import { SolarTrajectoryCard } from './SolarTrajectoryCard';
import { FarajPrayerCard } from './FarajPrayerCard';
import { ALL_PRAYER_DETAILS } from '../data/prayerDetailsData';
import { PrayerAnimatedHeader } from './PrayerAnimatedHeader';

interface SalatTimeViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

export const SalatTimeView: React.FC<SalatTimeViewProps> = ({
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';

  // 1. City and calculation parameters
  const [selectedCity, setSelectedCity] = useState<CityOption>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_salat_city');
      if (saved) return JSON.parse(saved);
    } catch {}
    return POPULAR_CITIES[3]; // Default to Dhaka, Bangladesh (5192 KM, 278°)
  });

  const [method, setMethod] = useState<'MuslimWorldLeague' | 'ISNA' | 'UmmAlQura' | 'Karachi' | 'Egyptian'>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_salat_method');
      if (saved) return JSON.parse(saved);
    } catch {}
    return 'Karachi';
  });

  const [isHanafi, setIsHanafi] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_salat_hanafi');
      if (saved !== null) return JSON.parse(saved);
    } catch {}
    return true;
  });

  const [hijriOffset, setHijriOffset] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_hijri_offset');
      if (saved) return Number(saved);
    } catch {}
    return 0;
  });

  // With Caution mode (Safety margin +/- 2m, common in subcontinent)
  const [withCaution, setWithCaution] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_salat_caution');
      if (saved !== null) return JSON.parse(saved);
    } catch {}
    return true;
  });

  // Selected Date for prayer time view (defaults to today)
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Notifications per prayer
  const [activeAlerts, setActiveAlerts] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_salat_alerts');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      Fajr: true,
      Dhuhr: true,
      Asr: true,
      Maghrib: true,
      Isha: false,
      Tahajjud: false,
      Ishraq: false,
      Chast: false,
      Jawwal: false,
      Sunrise: false,
      Noon: false,
      Sunset: false,
    };
  });

  // UI Drawers & Modals
  const [showCautionDropdown, setShowCautionDropdown] = useState<boolean>(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState<boolean>(false);
  const [showNafalModal, setShowNafalModal] = useState<boolean>(false);
  const [selectedNafalId, setSelectedNafalId] = useState<string>('Tahajjud');
  const [nafalTab, setNafalTab] = useState<'ayat' | 'hadith' | 'virtues' | 'rules'>('ayat');
  const [copiedNafalText, setCopiedNafalText] = useState<string | null>(null);
  const [showProhibitedModal, setShowProhibitedModal] = useState<boolean>(false);
  const [showQiblaModal, setShowQiblaModal] = useState<boolean>(false);
  const [infoModalItem, setInfoModalItem] = useState<{ title: string; content: string; reference?: string } | null>(null);

  const [citySearchQuery, setCitySearchQuery] = useState<string>('');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [isPlayingAdhan, setIsPlayingAdhan] = useState<boolean>(false);
  const [activeAdhanName, setActiveAdhanName] = useState<string>('Makkah Adhan');

  // Device orientation / Qibla state for live compass
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [isCompassActive, setIsCompassActive] = useState<boolean>(false);
  const [hasCompassSensor, setHasCompassSensor] = useState<boolean>(false);
  const [manualCompassRotation, setManualCompassRotation] = useState<number>(0);

  // Calculate prayer times
  const [prayerData, setPrayerData] = useState<FormattedPrayerTimes>(() =>
    calculatePrayerTimes(
      selectedCity.lat,
      selectedCity.lng,
      selectedCity.name,
      method,
      isHanafi,
      hijriOffset,
      withCaution,
      currentDate
    )
  );

  // Save preferences
  useEffect(() => {
    try {
      localStorage.setItem('zikrmate_salat_city', JSON.stringify(selectedCity));
      localStorage.setItem('zikrmate_salat_method', JSON.stringify(method));
      localStorage.setItem('zikrmate_salat_hanafi', JSON.stringify(isHanafi));
      localStorage.setItem('zikrmate_hijri_offset', String(hijriOffset));
      localStorage.setItem('zikrmate_salat_alerts', JSON.stringify(activeAlerts));
      localStorage.setItem('zikrmate_salat_caution', JSON.stringify(withCaution));
    } catch {}
  }, [selectedCity, method, isHanafi, hijriOffset, activeAlerts, withCaution]);

  // Recalculate prayer data every second or when parameters change
  useEffect(() => {
    const updateTimes = () => {
      setPrayerData(
        calculatePrayerTimes(
          selectedCity.lat,
          selectedCity.lng,
          selectedCity.name,
          method,
          isHanafi,
          hijriOffset,
          withCaution,
          currentDate
        )
      );
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [selectedCity, method, isHanafi, hijriOffset, withCaution, currentDate]);

  // Compass handling (Device orientation or Touch Drag simulation)
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading = 0;
      if ((e as any).webkitCompassHeading !== undefined) {
        // iOS
        heading = (e as any).webkitCompassHeading;
      } else if (e.alpha !== null) {
        // Android (relative to magnetic north)
        heading = 360 - e.alpha;
      }
      setDeviceHeading(Math.round(heading));
      setHasCompassSensor(true);
    };

    if (isCompassActive) {
      if (typeof window !== 'undefined' && 'ondeviceorientation' in window) {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
          (DeviceOrientationEvent as any)
            .requestPermission()
            .then((permissionState: string) => {
              if (permissionState === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation);
              }
            })
            .catch(() => {});
        } else {
          window.addEventListener('deviceorientation', handleOrientation);
        }
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isCompassActive]);

  // Audio for Adhan
  const adhanAudioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayAdhan = (title: string = 'Adhan') => {
    if (!adhanAudioRef.current) {
      adhanAudioRef.current = new Audio('https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3');
      adhanAudioRef.current.onended = () => setIsPlayingAdhan(false);
    }

    if (isPlayingAdhan) {
      adhanAudioRef.current.pause();
      setIsPlayingAdhan(false);
    } else {
      setActiveAdhanName(title);
      adhanAudioRef.current.play().catch(() => {});
      setIsPlayingAdhan(true);
      if (soundEnabled) soundHaptics.playMilestone();
    }
  };

  // Toggle alert for individual prayers
  const toggleAlert = (prayerKey: string) => {
    setActiveAlerts((prev) => {
      const updated = { ...prev, [prayerKey]: !prev[prayerKey] };
      if (soundEnabled) soundHaptics.playTap();
      return updated;
    });
  };

  // GPS Location detector
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        setSelectedCity({
          name: 'Current Location',
          country: 'GPS Detected',
          lat: latitude,
          lng: longitude,
        });
        if (soundEnabled) soundHaptics.playMilestone();
      },
      (err) => {
        setIsLocating(false);
        alert(`Location detection failed: ${err.message}. Using default city.`);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Date formatted as "Sep-26" as seen in screenshot
  const datePillFormatted = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  });

  // Count active alerts for badge
  const activeAlertsCount = Object.values(activeAlerts).filter(Boolean).length;

  // Filter cities for search
  const filteredCities = POPULAR_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(citySearchQuery.toLowerCase())
  );

  // Compass calculation
  const compassHeading = hasCompassSensor ? deviceHeading : manualCompassRotation;
  const effectiveCompassAngle = (360 - compassHeading + prayerData.qiblaBearing) % 360;
  const isFacingKaaba = Math.abs(effectiveCompassAngle) < 6 || Math.abs(effectiveCompassAngle - 360) < 6;

  // Change date (previous / next day)
  const shiftDate = (days: number) => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + days);
    setCurrentDate(next);
    if (soundEnabled) soundHaptics.playTap();
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300 max-w-xl mx-auto pb-16 px-1">
      {/* 1. TOP BAR (Date pill, Location pill, Notification bell with count badge, settings) */}
      <div
        className={`flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-2xl border transition-colors shadow-sm ${
          isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
        }`}
      >
        {/* Left: Avatar / Islamic icon */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#005a3e] to-[#257277] flex items-center justify-center text-white text-xs font-bold shadow-sm border border-teal-300/40 shrink-0">
            <span>🕌</span>
          </div>

          {/* Date Picker Pill (e.g. Sep-26) */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => shiftDate(-1)}
              title="Previous Day"
              className={`p-1 rounded-lg text-xs transition active:scale-95 cursor-pointer ${
                isDay ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-teal-900/40 text-emerald-300'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setCurrentDate(new Date())}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border transition active:scale-95 cursor-pointer ${
                isDay
                  ? 'bg-[#eefbf6] hover:bg-[#e2f7ef] text-[#006747] border-[#c3edd9]'
                  : 'bg-[#0a262c] hover:bg-[#123e47] text-emerald-300 border-[#184850]'
              }`}
              title="Click to reset to Today"
            >
              <Calendar className="w-3.5 h-3.5 text-[#00875a] dark:text-emerald-400" />
              <span>{datePillFormatted}</span>
            </button>

            <button
              onClick={() => shiftDate(1)}
              title="Next Day"
              className={`p-1 rounded-lg text-xs transition active:scale-95 cursor-pointer ${
                isDay ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-teal-900/40 text-emerald-300'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center/Right: Location Pill & Notification Bell */}
        <div className="flex items-center gap-2">
          {/* Location Selector Pill (e.g. Dhaka or 4C2J+8FX) */}
          <button
            onClick={() => setShowSettingsDrawer(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition cursor-pointer active:scale-95 max-w-[130px] sm:max-w-[170px] truncate ${
              isDay
                ? 'bg-[#eefbf6] hover:bg-[#e2f7ef] text-[#006747] border-[#c3edd9]'
                : 'bg-[#0a262c] hover:bg-[#123e47] text-emerald-300 border-[#184850]'
            }`}
            title="Change City or Detect GPS"
          >
            <MapPin className="w-3.5 h-3.5 text-[#00875a] dark:text-emerald-400 shrink-0" />
            <span className="truncate">{selectedCity.name}</span>
            <ChevronDown className="w-3 h-3 opacity-70 shrink-0" />
          </button>

          {/* Notification Bell with Badge (e.g. 3) */}
          <button
            onClick={() => {
              // Quick toggle or open settings
              setShowSettingsDrawer(true);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className={`relative p-2 rounded-xl border transition active:scale-95 cursor-pointer ${
              isDay
                ? 'bg-[#eefbf6] hover:bg-[#e2f7ef] text-[#006747] border-[#c3edd9]'
                : 'bg-[#0a262c] hover:bg-[#123e47] text-emerald-300 border-[#184850]'
            }`}
            title={`${activeAlertsCount} active prayer alerts`}
          >
            <Bell className="w-4 h-4 text-[#00875a] dark:text-emerald-400" />
            {activeAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00875a] text-white text-[9px] font-black flex items-center justify-center shadow-sm">
                {activeAlertsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Solar Trajectory Arc & Next Prayer Hero Section */}
      <SolarTrajectoryCard
        prayerData={prayerData}
        isDay={isDay}
        selectedLanguage={selectedLanguage}
        soundEnabled={soundEnabled}
      />

      {/* 2. FARAJ PRAYER TIME (5 Prescribed Prayers with Start - End times) */}
      <FarajPrayerCard
        prayerData={prayerData}
        isDay={isDay}
        selectedLanguage={selectedLanguage}
        soundEnabled={soundEnabled}
        withCaution={withCaution}
        setWithCaution={setWithCaution}
        activeAlerts={activeAlerts}
        toggleAlert={toggleAlert}
        isPlayingAdhan={isPlayingAdhan}
        togglePlayAdhan={togglePlayAdhan}
        isHanafi={isHanafi}
        currentDate={currentDate}
      />

      {/* 3. NAFAL PRAYERS (Sunnah & Voluntary Prayers) */}
      <div
        className={`rounded-3xl border shadow-sm p-4 sm:p-5 transition-colors ${
          isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
        }`}
      >
        {/* Header: Blue accent bar + NAFAL PRAYERS + See More > */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-teal-900/40">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/30" />
            <h2 className={`text-base sm:text-lg font-bold tracking-tight uppercase ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
              {SALAT_UI.nafalPrayers[selectedLanguage]}
            </h2>
          </div>

          <button
            onClick={() => setShowNafalModal(true)}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-emerald-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition cursor-pointer"
          >
            <span>{SALAT_UI.seeMore[selectedLanguage]}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal scroll cards matching the photo */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {prayerData.nafalPrayers.map((nafal) => {
            const isAlertOn = !!activeAlerts[nafal.id];
            const targetDetailId =
              nafal.id === 'tahajjud'
                ? 'Tahajjud'
                : nafal.id === 'ishraq'
                ? 'Ishraq'
                : nafal.id === 'chast'
                ? 'Chast'
                : 'Tahajjud';

            return (
              <div
                key={nafal.id}
                onClick={() => {
                  setSelectedNafalId(targetDetailId);
                  setShowNafalModal(true);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`min-w-[130px] sm:min-w-[145px] p-3 rounded-2xl border transition-all shadow-sm flex flex-col justify-between shrink-0 cursor-pointer active:scale-95 ${
                  isDay
                    ? 'bg-[#fcfdfd] border-[#dcebe8] hover:border-emerald-400 hover:shadow-md'
                    : 'bg-[#092226] border-[#184850] hover:border-emerald-500 hover:shadow-md'
                }`}
              >
                {/* Top card utility icons */}
                <div className="flex items-center justify-between text-slate-400 mb-1" onClick={(e) => e.stopPropagation()}>
                  {nafal.id === 'tahajjud' ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedNafalId(targetDetailId);
                        setShowNafalModal(true);
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className="text-amber-500 hover:text-amber-600 cursor-pointer"
                      title="বিস্তারিত ও হাদিস দেখুন"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => toggleAlert(nafal.id)}
                    className={isAlertOn ? 'text-emerald-500' : 'text-slate-400 hover:text-slate-600'}
                  >
                    <Bell className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Center Icon */}
                <div className="flex items-center justify-center my-2 text-emerald-600 dark:text-emerald-300">
                  {nafal.iconType === 'tahajjud' && <Moon className="w-6 h-6 text-indigo-400" />}
                  {nafal.iconType === 'ishraq' && <SunriseIcon className="w-6 h-6 text-amber-500" />}
                  {nafal.iconType === 'chast' && <CloudSun className="w-6 h-6 text-orange-400" />}
                  {nafal.iconType === 'jawwal' && <Sun className="w-6 h-6 text-yellow-500" />}
                  {nafal.iconType === 'awwabin' && <Sparkles className="w-6 h-6 text-purple-400" />}
                </div>

                {/* Title */}
                <div className="text-center font-bold text-xs sm:text-sm text-slate-800 dark:text-white mb-2">
                  {nafal.name}
                </div>

                {/* Times Row with Green Dots */}
                <div className="space-y-1 text-[11px] font-mono font-semibold text-slate-700 dark:text-emerald-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{nafal.startTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{nafal.endTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. PROHIBITED PRAYER TIME (Makruh / Forbidden Times) */}
      <div
        className={`rounded-3xl border shadow-sm p-4 sm:p-5 transition-colors ${
          isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
        }`}
      >
        {/* Header: Red accent bar + Prohibited Prayer Time + See More > */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-teal-900/40">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/30" />
            <h2 className={`text-base sm:text-lg font-bold tracking-tight text-rose-600 dark:text-rose-400`}>
              {SALAT_UI.prohibitedPrayerTime[selectedLanguage]}
            </h2>
          </div>

          <button
            onClick={() => setShowProhibitedModal(true)}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-emerald-300 hover:text-rose-600 transition cursor-pointer"
          >
            <span>{SALAT_UI.seeMore[selectedLanguage]}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Side-by-Side Cards (Sunrise, Noon, Sunset) matching photo */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {prayerData.prohibitedPrayers.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setShowProhibitedModal(true);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`p-3 rounded-2xl border transition-all text-center flex flex-col justify-between cursor-pointer active:scale-95 shadow-xs ${
                isDay
                  ? 'bg-[#fffbfb] border-rose-100 hover:border-rose-300 hover:shadow-md'
                  : 'bg-[#1e141a]/60 border-rose-900/40 hover:border-rose-700 hover:shadow-md'
              }`}
            >
              {/* Top Icons */}
              <div className="flex items-center justify-between text-rose-400 mb-1">
                {item.iconType === 'sunrise' && <SunriseIcon className="w-4 h-4 text-amber-500" />}
                {item.iconType === 'noon' && <Sun className="w-4 h-4 text-orange-500" />}
                {item.iconType === 'sunset' && <SunsetIcon className="w-4 h-4 text-rose-500" />}
                <Bell className="w-3 h-3 opacity-60" />
              </div>

              {/* Title */}
              <div className="font-bold text-xs text-slate-800 dark:text-rose-200 my-1">
                {item.name}
              </div>

              {/* Time Range */}
              <div className="text-[10px] sm:text-xs font-mono font-bold text-rose-600 dark:text-rose-300 whitespace-nowrap">
                {item.timeRange}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. QIBLA COMPASS & DIRECTION SECTION (As seen in screenshot) */}
      <div
        className={`rounded-3xl border shadow-sm p-4 sm:p-5 transition-colors space-y-4 ${
          isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          {/* Left: Circular Visual Compass Dial matching screenshot */}
          <div className="flex justify-center">
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full border-4 border-emerald-500/30 flex items-center justify-center p-3 select-none shadow-inner bg-gradient-to-b from-emerald-500/5 to-transparent">
              {/* Cardinal Labels */}
              <span className="absolute top-2 text-[10px] font-black text-emerald-700 dark:text-emerald-300">
                North
              </span>
              <span className="absolute right-2 text-[10px] font-bold text-slate-400">East</span>
              <span className="absolute bottom-2 text-[10px] font-bold text-slate-400">South</span>
              <span className="absolute left-2 text-[10px] font-bold text-slate-400">West</span>

              {/* Inner ring */}
              <div className="w-32 h-32 rounded-full border border-dashed border-emerald-500/40 flex items-center justify-center relative">
                {/* Pointer Arrow to Qibla bearing */}
                <div
                  className="absolute inset-0 flex items-start justify-center transition-transform duration-500"
                  style={{ transform: `rotate(${prayerData.qiblaBearing}deg)` }}
                >
                  <div className="flex flex-col items-center -mt-2">
                    <div className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black shadow-md flex items-center gap-1">
                      <span>🕋</span>
                      <span>Qibla</span>
                    </div>
                    <div className="w-1.5 h-12 bg-emerald-500 rounded-full shadow-md mt-1" />
                  </div>
                </div>

                {/* Center Bearing Badge */}
                <div className="w-12 h-12 rounded-full bg-white dark:bg-[#0a262c] border-2 border-emerald-500 shadow-md flex flex-col items-center justify-center text-center z-10">
                  <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 leading-none">
                    {prayerData.qiblaBearing}°
                  </span>
                  <span className="text-[9px] font-bold text-slate-500 dark:text-emerald-300 leading-none mt-0.5">
                    {prayerData.qiblaCardinal}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Distance & Direction Info Cards */}
          <div className="space-y-3">
            {/* Kaaba Distance Card */}
            <div
              className={`p-3.5 rounded-2xl border transition-colors flex items-center gap-3 ${
                isDay ? 'bg-[#f4faf9] border-[#d2ece9]' : 'bg-[#092226] border-[#184850]'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-emerald-200/80">
                  {SALAT_UI.kaabaDistance[selectedLanguage]}
                </div>
                <div className="text-lg font-black text-emerald-700 dark:text-emerald-300">
                  {prayerData.kaabaDistanceKm} K.M.
                </div>
              </div>
            </div>

            {/* Qibla Direction from North Card */}
            <div
              className={`p-3.5 rounded-2xl border transition-colors flex items-center gap-3 ${
                isDay ? 'bg-[#f4faf9] border-[#d2ece9]' : 'bg-[#092226] border-[#184850]'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Navigation
                  className="w-5 h-5"
                  style={{ transform: `rotate(${prayerData.qiblaBearing}deg)` }}
                />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-emerald-200/80">
                  {SALAT_UI.qiblaDirection[selectedLanguage]}
                </div>
                <div className="text-lg font-black text-emerald-700 dark:text-emerald-300">
                  {prayerData.qiblaBearing}°
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Green Button: Qibla Compass Details > */}
        <button
          onClick={() => {
            setShowQiblaModal(true);
            setIsCompassActive(true);
            if (soundEnabled) soundHaptics.playMilestone();
          }}
          className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-98 cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4" />
            <span>{SALAT_UI.qiblaCompassDetails[selectedLanguage]}</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6. MODALS & DRAWERS */}

      {/* A. Nafal Prayers "See More" Modal with Animated Header & Full References */}
      {showNafalModal && (() => {
        const currentDetail =
          ALL_PRAYER_DETAILS[selectedNafalId] || ALL_PRAYER_DETAILS.Tahajjud;
        const matchingNafal = prayerData.nafalPrayers.find(
          (p) => p.id.toLowerCase() === selectedNafalId.toLowerCase()
        ) || prayerData.nafalPrayers[0];

        return (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
            <div
              className={`w-full max-w-xl border rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col ${
                isDay ? 'bg-white border-[#dcebe8] text-slate-800' : 'bg-[#092226] border-[#1a515c] text-white'
              }`}
            >
              {/* Modal Top Close Bar */}
              <div className="p-3.5 pb-2 border-b border-slate-100 dark:border-teal-900/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-5 rounded-full bg-blue-500 shadow-sm" />
                  <h3 className="font-black text-sm sm:text-base">
                    নফল সালাত গাইড • Nafal Prayers Guide
                  </h3>
                </div>
                <button
                  onClick={() => setShowNafalModal(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-teal-900/40 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div className="overflow-y-auto p-4 space-y-4">
                {/* 1. Selector Chips for Nafal Prayers */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {['Tahajjud', 'Ishraq', 'Chast'].map((nId) => {
                    const d = ALL_PRAYER_DETAILS[nId];
                    if (!d) return null;
                    const isSelected = selectedNafalId === nId;
                    return (
                      <button
                        key={nId}
                        onClick={() => {
                          setSelectedNafalId(nId);
                          if (soundEnabled) soundHaptics.playTap();
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shrink-0 border ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md font-black'
                            : isDay
                            ? 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                            : 'bg-[#06181b] text-emerald-300 border-teal-900/60 hover:bg-teal-900/40'
                        }`}
                      >
                        {d.nameBn} ({d.nameAr})
                      </button>
                    );
                  })}
                </div>

                {/* 2. UPPER ANIMATED PICTURE HEADER */}
                <PrayerAnimatedHeader
                  prayerId={selectedNafalId}
                  nameBn={currentDetail.nameBn}
                  nameEn={currentDetail.nameEn}
                  nameAr={currentDetail.nameAr}
                  timeRange={matchingNafal ? `${matchingNafal.startTime} - ${matchingNafal.endTime}` : currentDetail.celestialSignEn}
                  celestialSignBn={currentDetail.celestialSignBn}
                  isActive={false}
                  isPrayed={false}
                  isDay={isDay}
                />

                {/* 3. Sub-tabs (Ayat, Hadith, Virtues, Rules) */}
                <div
                  className={`flex items-center gap-1.5 p-1 rounded-2xl border overflow-x-auto scrollbar-none text-xs font-bold ${
                    isDay ? 'bg-slate-100/90 border-slate-200' : 'bg-[#05171a] border-teal-900/50'
                  }`}
                >
                  <button
                    onClick={() => setNafalTab('ayat')}
                    className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 shrink-0 ${
                      nafalTab === 'ayat'
                        ? 'bg-emerald-600 text-white shadow-xs font-black'
                        : 'text-slate-600 dark:text-emerald-200/80'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>কুরআনের আয়াত ({currentDetail.ayats.length})</span>
                  </button>

                  <button
                    onClick={() => setNafalTab('hadith')}
                    className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 shrink-0 ${
                      nafalTab === 'hadith'
                        ? 'bg-emerald-600 text-white shadow-xs font-black'
                        : 'text-slate-600 dark:text-emerald-200/80'
                    }`}
                  >
                    <Scroll className="w-3.5 h-3.5" />
                    <span>সহীহ হাদিস ({currentDetail.hadiths.length})</span>
                  </button>

                  <button
                    onClick={() => setNafalTab('virtues')}
                    className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 shrink-0 ${
                      nafalTab === 'virtues'
                        ? 'bg-emerald-600 text-white shadow-xs font-black'
                        : 'text-slate-600 dark:text-emerald-200/80'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>ফযিলত</span>
                  </button>

                  <button
                    onClick={() => setNafalTab('rules')}
                    className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 shrink-0 ${
                      nafalTab === 'rules'
                        ? 'bg-emerald-600 text-white shadow-xs font-black'
                        : 'text-slate-600 dark:text-emerald-200/80'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>ওয়াক্ত ও নিয়ম</span>
                  </button>
                </div>

                {/* 4. Tab Panels */}
                {nafalTab === 'ayat' && (
                  <div className="space-y-3">
                    {currentDetail.ayats.map((ayat, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border ${
                          isDay ? 'bg-slate-50/80 border-slate-200' : 'bg-[#071c20] border-[#184850]'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-200/60 dark:border-teal-900/40 text-xs">
                          <span className="font-black text-emerald-700 dark:text-emerald-300">
                            {ayat.surahNameBn} ({ayat.surahNameEn}) • আয়াত: {ayat.ayatNumber}
                          </span>
                        </div>
                        <p className="font-arabic text-right text-lg font-bold leading-loose text-emerald-950 dark:text-emerald-200 mb-2">
                          {ayat.arabic}
                        </p>
                        <p className="text-xs font-medium leading-relaxed text-slate-800 dark:text-emerald-100 mb-1">
                          <strong className="text-emerald-700 dark:text-emerald-400">অনুবাদ: </strong>
                          {ayat.translationBn}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-emerald-300/70 italic">
                          {ayat.translationEn}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {nafalTab === 'hadith' && (
                  <div className="space-y-3">
                    {currentDetail.hadiths.map((h, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border ${
                          isDay ? 'bg-slate-50/80 border-slate-200' : 'bg-[#071c20] border-[#184850]'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-200/60 dark:border-teal-900/40 text-xs">
                          <span className="font-bold text-emerald-700 dark:text-emerald-300">
                            বর্ণনাকারী: {h.narratorBn}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                            {h.gradeBn}
                          </span>
                        </div>
                        {h.arabicText && (
                          <p className="font-arabic text-right text-base font-bold leading-relaxed text-amber-950 dark:text-amber-200 mb-2">
                            {h.arabicText}
                          </p>
                        )}
                        <p className="text-xs leading-relaxed text-slate-800 dark:text-teal-100 mb-2">
                          “{h.textBn}”
                        </p>
                        <div className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 pt-1 border-t border-slate-200/40 dark:border-teal-900/30">
                          সূত্র: {h.bookBn} (হাদিস নং: {h.hadithNumber})
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {nafalTab === 'virtues' && (
                  <div className="space-y-2.5">
                    <div
                      className={`p-4 rounded-2xl border ${
                        isDay ? 'bg-emerald-50/50 border-emerald-200' : 'bg-[#071c20] border-[#184850]'
                      }`}
                    >
                      <h4 className="text-sm font-black text-emerald-800 dark:text-emerald-200 mb-1">
                        {currentDetail.virtues.titleBn}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-emerald-300/80 mb-3">
                        {currentDetail.virtues.descriptionBn}
                      </p>
                      <div className="space-y-2">
                        {currentDetail.virtues.pointsBn.map((point, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl border bg-white dark:bg-[#0a272e] border-slate-200 dark:border-teal-900/60 flex items-start gap-2 text-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {nafalTab === 'rules' && (
                  <div className="space-y-3 text-xs leading-relaxed">
                    <div
                      className={`p-4 rounded-2xl border space-y-2 ${
                        isDay ? 'bg-white border-slate-200' : 'bg-[#071c20] border-[#184850]'
                      }`}
                    >
                      <div>
                        <strong className="text-emerald-700 dark:text-emerald-400">শুরুর শর্ত: </strong>
                        <span>{currentDetail.timingConditions.startConditionBn}</span>
                      </div>
                      <div>
                        <strong className="text-rose-600 dark:text-rose-400">শেষের শর্ত: </strong>
                        <span>{currentDetail.timingConditions.endConditionBn}</span>
                      </div>
                      <div>
                        <strong className="text-amber-600 dark:text-amber-400">মুস্তাহাব সময়: </strong>
                        <span>{currentDetail.timingConditions.mustahabTimeBn}</span>
                      </div>
                      <div>
                        <strong className="text-purple-600 dark:text-purple-400">রাকাত ও নিয়ম: </strong>
                        <span>{currentDetail.timingConditions.fiqhDetailsBn}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* B. Prohibited Prayers "See More" Modal with Animated Caution Scene & Hadith References */}
      {showProhibitedModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div
            className={`w-full max-w-lg border rounded-3xl overflow-hidden shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto ${
              isDay ? 'bg-white border-rose-200 text-slate-800' : 'bg-[#180e14] border-rose-900/60 text-white'
            }`}
          >
            {/* Header Top Bar */}
            <div className="p-4 pb-0 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-5 rounded-full bg-rose-500 shadow-sm" />
                <h3 className="font-black text-base text-rose-600 dark:text-rose-400">
                  নিষিদ্ধ ও মাকরূহ নামাজের সময় • Prohibited Times
                </h3>
              </div>
              <button
                onClick={() => setShowProhibitedModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* UPPER ANIMATED CAUTION PICTURE */}
            <div className="px-4">
              <PrayerAnimatedHeader
                prayerId="Maghrib"
                nameBn="নিষিদ্ধ ও মাকরূহ সালাত"
                nameEn="Prohibited Waqt"
                nameAr="الأوقات المكروهة"
                timeRange="৩টি নিষিদ্ধ সময়"
                celestialSignBn="সূর্যোদয়, দ্বিপ্রহর ও সূর্যাস্তের নির্দিষ্ট নিষিদ্ধ ক্ষণ"
                isActive={false}
                isPrayed={false}
                isDay={isDay}
              />
            </div>

            <div className="px-4 pb-4 space-y-3.5 text-xs sm:text-sm">
              {/* Authentic Hadith Banner */}
              <div
                className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                  isDay ? 'bg-rose-50 border-rose-200 text-rose-950' : 'bg-rose-950/40 border-rose-800 text-rose-100'
                }`}
              >
                <div className="flex items-center justify-between font-bold border-b pb-1.5 border-rose-200 dark:border-rose-800">
                  <span className="flex items-center gap-1.5 text-rose-700 dark:text-rose-300 font-black">
                    <Scroll className="w-3.5 h-3.5" />
                    <span>সহীহ হাদিস শরিফের অলঙ্ঘনীয় নির্দেশ</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 text-[10px] font-black">
                    সহীহ মুসলিম: ৮৩১
                  </span>
                </div>
                <p className="italic">
                  উকবা ইবনে আমির (রা.) বর্ণনা করেছেন: "রাসূলুল্লাহ ﷺ আমাদের ৩টি সময়ে নামাজ পড়তে এবং মৃত ব্যক্তিদের দাফন
                  করতে কঠোরভাবে নিষেধ করেছেন:
                </p>
                <ol className="list-decimal list-inside space-y-1 font-medium pl-1">
                  <li>সূর্যোদয়ের সময় যতক্ষণ না তা কিছুটা উপরে ওঠে (১৫-২০ মিনিট)।</li>
                  <li>ঠিক দুপুরবেলা সূর্য ঠিক মাথার ওপর মধ্যাকাশে থাকার সময় (যাওয়ালের পূর্বে)।</li>
                  <li>সূর্যাস্তের উপক্রমকালে যতক্ষণ না তা সম্পূর্ণ অস্তমিত হয়।</li>
                </ol>
                <div className="text-right font-mono text-[10px] opacity-75 font-bold">
                  — সহীহ মুসলিম (হাদিস নং ৮৩১), সুনান আবু দাউদ (৩১৯২)
                </div>
              </div>

              {/* Prohibited Times List Cards */}
              <div className="space-y-2.5">
                {prayerData.prohibitedPrayers.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border ${
                      isDay ? 'bg-[#fffbfb] border-rose-200/80 shadow-xs' : 'bg-[#221017] border-rose-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span className="text-sm font-black text-rose-600 dark:text-rose-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                        {item.name}
                      </span>
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-300 font-black">
                        {item.timeRange}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">{item.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* C. Live Interactive Qibla Compass Modal */}
      {showQiblaModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div
            className={`w-full max-w-md border rounded-3xl p-6 shadow-2xl space-y-4 ${
              isDay ? 'bg-white border-[#dcebe8] text-[#103e42]' : 'bg-[#0e2f36] border-[#1a515c] text-white'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-teal-900/40">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-lg">Interactive Qibla Compass</h3>
              </div>
              <button
                onClick={() => {
                  setShowQiblaModal(false);
                  setIsCompassActive(false);
                }}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-teal-900/40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sensor Status Indicator */}
            <div className="flex items-center justify-between text-xs px-2">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    hasCompassSensor ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`}
                />
                <span className="font-semibold">
                  {hasCompassSensor ? 'Device Gyroscope Active' : 'Manual Simulation Mode'}
                </span>
              </div>

              {!hasCompassSensor && (
                <button
                  onClick={() => {
                    setManualCompassRotation((prev) => (prev + 30) % 360);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-600 font-bold hover:bg-emerald-500/30 flex items-center gap-1"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Rotate (+30°)</span>
                </button>
              )}
            </div>

            {/* Big Rotating Compass Dial */}
            <div className="flex justify-center my-4">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-emerald-500/30 flex items-center justify-center p-3 select-none shadow-2xl bg-gradient-to-b from-emerald-500/5 to-transparent">
                {/* Cardinal Points */}
                <span className="absolute top-3 text-xs font-black text-rose-500">N</span>
                <span className="absolute right-3 text-xs font-bold text-slate-400">E</span>
                <span className="absolute bottom-3 text-xs font-bold text-slate-400">S</span>
                <span className="absolute left-3 text-xs font-bold text-slate-400">W</span>

                {/* Rotating Needle Pointer */}
                <div
                  className="w-2 h-44 sm:h-52 rounded-full transition-transform duration-300 ease-out flex flex-col justify-between items-center z-10"
                  style={{ transform: `rotate(${effectiveCompassAngle}deg)` }}
                >
                  {/* North / Kaaba emerald pointer */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-0 h-0 border-l-[8px] border-r-[8px] border-b-[20px] border-transparent transition-colors ${
                        isFacingKaaba ? 'border-b-amber-400 scale-125' : 'border-b-emerald-500'
                      }`}
                    />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 -mt-1 shadow-md shadow-emerald-500/80" />
                  </div>

                  {/* South tail pointer */}
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-10 rounded-full bg-slate-400" />
                  </div>
                </div>

                {/* Center Hub */}
                <div className="absolute w-16 h-16 rounded-full bg-white dark:bg-[#0a262c] border-2 border-emerald-500 shadow-xl flex flex-col items-center justify-center text-center z-20">
                  <span className="text-sm font-black text-emerald-700 dark:text-emerald-300 leading-none">
                    {prayerData.qiblaBearing}°
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-emerald-300 leading-none mt-0.5">
                    {prayerData.qiblaCardinal}
                  </span>
                </div>
              </div>
            </div>

            {/* Facing Kaaba status banner */}
            <div
              className={`p-3 rounded-2xl text-center text-xs font-bold transition-all ${
                isFacingKaaba
                  ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40 animate-pulse'
                  : isDay
                  ? 'bg-[#f4faf9] text-slate-600 border border-[#d2ece9]'
                  : 'bg-[#092226] text-emerald-300 border border-[#184850]'
              }`}
            >
              {isFacingKaaba
                ? '🕋 Aligned with Holy Kaaba! You are facing Qibla.'
                : 'Turn your device until the needle points towards Kaaba.'}
            </div>
          </div>
        </div>
      )}

      {/* D. Settings Drawer (Location Search, Methods, Madhab, Hijri) */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div
            className={`w-full max-w-md border rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto ${
              isDay ? 'bg-white border-[#dcebe8] text-[#103e42]' : 'bg-[#0e2f36] border-[#1a515c] text-white'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-teal-900/40">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-lg">Location &amp; Settings</h3>
              </div>
              <button
                onClick={() => setShowSettingsDrawer(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-teal-900/40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Detect GPS Location Button */}
            <button
              onClick={handleDetectLocation}
              disabled={isLocating}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Detecting GPS...' : 'Detect Current GPS Location'}</span>
            </button>

            {/* Search City */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-emerald-300">
                Choose Location
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search city (e.g. Dhaka, London, Makkah)..."
                  value={citySearchQuery}
                  onChange={(e) => setCitySearchQuery(e.target.value)}
                  className={`w-full rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none transition border ${
                    isDay
                      ? 'bg-[#f0f7f6] border-[#d2ece9] text-[#103e42]'
                      : 'bg-[#092226] border-[#133c44] text-white'
                  }`}
                />
              </div>

              <div className="max-h-36 overflow-y-auto space-y-1 pr-1 mt-2">
                {filteredCities.map((city) => (
                  <button
                    key={`${city.name}-${city.country}`}
                    onClick={() => {
                      setSelectedCity(city);
                      setCitySearchQuery('');
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                      selectedCity.name === city.name
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-teal-900/40'
                    }`}
                  >
                    <span>{city.name}</span>
                    <span className="text-[10px] text-slate-400">{city.country}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Asr Juristic Method */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-emerald-300">
                Asr Juristic Calculation
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsHanafi(true)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    isHanafi
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-[#092226] text-slate-500'
                  }`}
                >
                  Hanafi (Shadow x2)
                </button>
                <button
                  type="button"
                  onClick={() => setIsHanafi(false)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    !isHanafi
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-[#092226] text-slate-500'
                  }`}
                >
                  Standard (Shafi/Maliki)
                </button>
              </div>
            </div>

            {/* Calculation Method */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-emerald-300">
                Calculation Method
              </label>
              <select
                value={method}
                onChange={(e: any) => setMethod(e.target.value)}
                className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none ${
                  isDay
                    ? 'bg-[#f0f7f6] border-[#d2ece9] text-[#103e42]'
                    : 'bg-[#092226] border-[#133c44] text-white'
                }`}
              >
                <option value="Karachi">Univ. of Islamic Sciences Karachi</option>
                <option value="MuslimWorldLeague">Muslim World League (MWL)</option>
                <option value="UmmAlQura">Umm Al-Qura (Makkah al-Mukarramah)</option>
                <option value="ISNA">ISNA (North America)</option>
                <option value="Egyptian">Egyptian General Authority</option>
              </select>
            </div>

            <button
              onClick={() => setShowSettingsDrawer(false)}
              className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer mt-2"
            >
              Done &amp; Apply
            </button>
          </div>
        </div>
      )}

      {/* E. Generic Info Modal */}
      {infoModalItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div
            className={`w-full max-w-sm border rounded-3xl p-5 shadow-2xl space-y-3 ${
              isDay ? 'bg-white border-[#dcebe8] text-[#103e42]' : 'bg-[#0e2f36] border-[#1a515c] text-white'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-teal-900/40">
              <h4 className="font-bold text-base text-emerald-700 dark:text-emerald-300">{infoModalItem.title}</h4>
              <button onClick={() => setInfoModalItem(null)} className="p-1 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-emerald-200/90">
              {infoModalItem.content}
            </p>
            {infoModalItem.reference && (
              <p className="text-[11px] font-semibold text-slate-400 italic">
                Ref: {infoModalItem.reference}
              </p>
            )}
            <button
              onClick={() => setInfoModalItem(null)}
              className="w-full py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold transition active:scale-95 cursor-pointer mt-2"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
