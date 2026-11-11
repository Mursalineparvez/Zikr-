import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  CloudSun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  RefreshCw,
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

// Atmospheric Mosque Skyline Backdrop Silhouette
export const MosqueSkylineBackdrop: React.FC = () => (
  <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none select-none z-0">
    <svg
      viewBox="0 0 800 220"
      preserveAspectRatio="none"
      className="w-full h-full opacity-20 dark:opacity-10 text-emerald-700 dark:text-emerald-400"
      fill="currentColor"
    >
      {/* Distant domes & minarets silhouette */}
      <path d="M 0,220 L 0,175 Q 25,150 50,175 L 65,175 L 65,115 Q 70,100 75,115 L 75,175 L 120,175 Q 150,130 180,175 L 230,175 L 230,75 Q 235,55 240,75 L 240,175 L 330,175 Q 400,45 470,175 L 560,175 L 560,75 Q 565,55 570,75 L 570,175 L 620,175 Q 650,130 680,175 L 725,175 L 725,115 Q 730,100 735,115 L 735,175 L 800,175 L 800,220 Z" />
      {/* Central Grand Dome crescent finial */}
      <circle cx="400" cy="38" r="3.5" fill="currentColor" />
      <path d="M 397,30 Q 400,26 403,30 Q 401,33 397,30 Z" fill="currentColor" />
    </svg>
    {/* Ambient radial sky glow */}
    <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/40 via-transparent to-transparent dark:from-emerald-950/30" />
  </div>
);

// Miniature 3D Isometric Kaaba Cube Icon with Golden Kiswa, Shadirwan, and Bab ar-Rahman
export const Kaaba3DIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 54 54" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="topRoofGrad" x1="27" y1="5" x2="27" y2="23" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4b5563" />
        <stop offset="100%" stopColor="#374151" />
      </linearGradient>
      <linearGradient id="leftWallGrad" x1="7" y1="14" x2="27" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1f2937" />
        <stop offset="100%" stopColor="#090d14" />
      </linearGradient>
      <linearGradient id="rightWallGrad" x1="27" y1="14" x2="47" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#374151" />
        <stop offset="100%" stopColor="#111827" />
      </linearGradient>
      <linearGradient id="goldBandGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="50%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    {/* Ground shadow */}
    <ellipse cx="27" cy="48" rx="19" ry="5" fill="#000000" opacity="0.3" />
    {/* Top Face */}
    <polygon points="27,6 47,15 27,24 7,15" fill="url(#topRoofGrad)" stroke="#6b7280" strokeWidth="0.8" />
    {/* Left Face */}
    <polygon points="7,15 27,24 27,47 7,38" fill="url(#leftWallGrad)" />
    {/* Left Face Gold Kiswa Band */}
    <polygon points="7,20 27,29 27,32 7,23" fill="url(#goldBandGrad)" />
    {/* Right Face */}
    <polygon points="27,24 47,15 47,38 27,47" fill="url(#rightWallGrad)" />
    {/* Right Face Gold Kiswa Band */}
    <polygon points="27,29 47,20 47,23 27,32" fill="url(#goldBandGrad)" />
    {/* Bab ar-Rahman Golden Door on Right Face */}
    <polygon points="33,33 40,29.5 40,41 33,44.5" fill="#f59e0b" stroke="#fef08a" strokeWidth="0.8" />
    {/* Door interior details */}
    <line x1="36.5" y1="31.2" x2="36.5" y2="42.8" stroke="#78350f" strokeWidth="0.6" />
    {/* Shadirwan marble base rim */}
    <polygon points="6,38 27,47.5 48,38 48,40 27,49.5 6,40" fill="#e2e8f0" opacity="0.7" />
  </svg>
);

export const toBengaliNumber = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

export interface LiveWeatherData {
  temp: number;
  tempFormattedBn: string;
  tempFormattedEn: string;
  conditionBn: string;
  conditionEn: string;
  code: number;
  icon: 'sun' | 'cloud-sun' | 'cloud' | 'cloud-drizzle' | 'cloud-rain' | 'cloud-lightning' | 'cloud-snow';
  lastUpdated: number;
  locationName: string;
}

export function parseWmoWeatherCode(code: number): {
  bn: string;
  en: string;
  icon: 'sun' | 'cloud-sun' | 'cloud' | 'cloud-drizzle' | 'cloud-rain' | 'cloud-lightning' | 'cloud-snow';
} {
  switch (code) {
    case 0:
      return { bn: 'পরিষ্কার', en: 'Clear Sky', icon: 'sun' };
    case 1:
      return { bn: 'নির্মল আবহাওয়া', en: 'Mainly Clear', icon: 'sun' };
    case 2:
      return { bn: 'আংশিক মেঘলা', en: 'Partly Cloudy', icon: 'cloud-sun' };
    case 3:
      return { bn: 'মেঘলা আকাশ', en: 'Overcast', icon: 'cloud' };
    case 45:
    case 48:
      return { bn: 'কুয়াশাচ্ছন্ন', en: 'Foggy', icon: 'cloud' };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return { bn: 'গুঁড়ি গুঁড়ি বৃষ্টি', en: 'Light Drizzle', icon: 'cloud-drizzle' };
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return { bn: 'বৃষ্টিপাত', en: 'Rainy', icon: 'cloud-rain' };
    case 71:
    case 73:
    case 75:
    case 77:
      return { bn: 'তুষারপাত', en: 'Snowing', icon: 'cloud-snow' };
    case 80:
    case 81:
    case 82:
      return { bn: 'মৌসুমি বৃষ্টি', en: 'Rain Showers', icon: 'cloud-rain' };
    case 85:
    case 86:
      return { bn: 'তুষার ঝড়', en: 'Snow Showers', icon: 'cloud-snow' };
    case 95:
    case 96:
    case 99:
      return { bn: 'বজ্রবৃষ্টি', en: 'Thunderstorm', icon: 'cloud-lightning' };
    default:
      return { bn: 'পরিষ্কার', en: 'Clear', icon: 'sun' };
  }
}

export const getDetailedHijriBengaliString = (date: Date, offset: number = 0): {
  greeting: string;
  hijriAndGregorian: string;
  weatherTemp: string;
  weatherCondition: string;
} => {
  const adjusted = new Date(date);
  adjusted.setDate(adjusted.getDate() + offset);

  const bnDays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const bnMonths = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

  const dayName = bnDays[date.getDay()];
  const dayNum = toBengaliNumber(date.getDate());
  const monthName = bnMonths[date.getMonth()];
  const yearNum = toBengaliNumber(date.getFullYear());

  let hijriDay = 23;
  let hijriMonthBn = 'জুমাদাল উলা';
  let hijriMonthAr = 'جمادى الأولى';
  let hijriYear = 1448;

  try {
    const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).formatToParts(adjusted);

    const dPart = parts.find((p) => p.type === 'day');
    const mPart = parts.find((p) => p.type === 'month');
    const yPart = parts.find((p) => p.type === 'year');

    if (dPart) hijriDay = parseInt(dPart.value, 10) || 23;
    if (yPart) hijriYear = parseInt(yPart.value, 10) || 1448;
    const mNum = parseInt(mPart?.value || '5', 10);

    const HIJRI_MONTHS: Record<number, { bn: string; ar: string }> = {
      1: { bn: 'মুহররম', ar: 'المحرم' },
      2: { bn: 'সফর', ar: 'صفر' },
      3: { bn: 'রবিউল আউয়াল', ar: 'ربيع الأول' },
      4: { bn: 'রবিউস সানি', ar: 'ربيع الثاني' },
      5: { bn: 'জুমাদাল উলা', ar: 'جمادى الأولى' },
      6: { bn: 'জুমাদাস সানি', ar: 'جمادى الآخرة' },
      7: { bn: 'রজব', ar: 'رجب' },
      8: { bn: 'শাবান', ar: 'شعبان' },
      9: { bn: 'রমজান', ar: 'رمضان' },
      10: { bn: 'শাওয়াল', ar: 'شوال' },
      11: { bn: 'জিলকদ', ar: 'ذو القعدة' },
      12: { bn: 'জিলহজ্জ', ar: 'ذو الحجة' },
    };
    if (HIJRI_MONTHS[mNum]) {
      hijriMonthBn = HIJRI_MONTHS[mNum].bn;
      hijriMonthAr = HIJRI_MONTHS[mNum].ar;
    }
  } catch {}

  const hijriStr = `${toBengaliNumber(hijriDay)} ${hijriMonthBn} (${hijriMonthAr}) ${toBengaliNumber(hijriYear)} AH`;
  const gregorianStr = `${dayName}, ${dayNum} ${monthName}, ${yearNum}`;

  return {
    greeting: 'আসসালামু আলাইকুম',
    hijriAndGregorian: `${hijriStr} • ${gregorianStr}`,
    weatherTemp: '27°C',
    weatherCondition: 'পরিষ্কার',
  };
};

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

  // Navigation Subtabs matching user screenshot: নামাজ | রোজা | ক্যালেন্ডার ও আমল
  const [salatSubTab, setSalatSubTab] = useState<'namaj' | 'roza' | 'calendar'>('namaj');
  const [liveTick, setLiveTick] = useState<number>(0);
  const [showDetailedFaraj, setShowDetailedFaraj] = useState<boolean>(false);
  const [showDetailedTrajectory, setShowDetailedTrajectory] = useState<boolean>(false);

  // Live 1-second interval ticker for live countdown and compass
  useEffect(() => {
    const t = setInterval(() => setLiveTick((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, []);

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
  const [selectedQuickPrayer, setSelectedQuickPrayer] = useState<any | null>(null);
  const [showSunnahFastDrawer, setShowSunnahFastDrawer] = useState<boolean>(false);

  // Live Weather State with LocalStorage caching & 30-min auto-interval
  const [liveWeather, setLiveWeather] = useState<LiveWeatherData>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_live_weather');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.temp === 'number') {
          return parsed;
        }
      }
    } catch {}
    return {
      temp: 27,
      tempFormattedBn: '২৭°C',
      tempFormattedEn: '27°C',
      conditionBn: 'পরিষ্কার',
      conditionEn: 'Clear',
      code: 0,
      icon: 'sun',
      lastUpdated: 0,
      locationName: 'Dhaka',
    };
  });
  const [isWeatherFetching, setIsWeatherFetching] = useState<boolean>(false);

  // Helper to fetch live weather from Open-Meteo for a given lat, lng
  const updateWeatherForLocation = async (lat: number, lng: number, locName: string) => {
    setIsWeatherFetching(true);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
      );
      if (res.ok) {
        const data = await res.json();
        if (data && data.current_weather) {
          const temp = Math.round(data.current_weather.temperature);
          const code = data.current_weather.weathercode ?? 0;
          const parsed = parseWmoWeatherCode(code);
          const updated: LiveWeatherData = {
            temp,
            tempFormattedBn: `${toBengaliNumber(temp)}°C`,
            tempFormattedEn: `${temp}°C`,
            conditionBn: parsed.bn,
            conditionEn: parsed.en,
            code,
            icon: parsed.icon,
            lastUpdated: Date.now(),
            locationName: locName,
          };
          setLiveWeather(updated);
          try {
            localStorage.setItem('zikrmate_live_weather', JSON.stringify(updated));
          } catch {}
        }
      }
    } catch (err) {
      console.error('Weather update error:', err);
    } finally {
      setIsWeatherFetching(false);
    }
  };

  // Weather Manager: Location + 30-Minute Auto-Interval
  useEffect(() => {
    const refreshWeather = () => {
      if (typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            updateWeatherForLocation(latitude, longitude, selectedLanguage === 'bn' ? 'বর্তমান জিপিএস অবস্থান' : 'GPS Location');
          },
          () => {
            updateWeatherForLocation(selectedCity.lat, selectedCity.lng, selectedCity.name);
          },
          { timeout: 8000 }
        );
      } else {
        updateWeatherForLocation(selectedCity.lat, selectedCity.lng, selectedCity.name);
      }
    };

    // Initial check: If cache is older than 30 mins, update immediately
    const cacheAge = Date.now() - liveWeather.lastUpdated;
    if (cacheAge > 30 * 60 * 1000 || liveWeather.lastUpdated === 0) {
      refreshWeather();
    }

    // Set up strict 30-minute interval (1,800,000 ms)
    const THIRTY_MIN_MS = 30 * 60 * 1000;
    const weatherTimer = setInterval(() => {
      refreshWeather();
    }, THIRTY_MIN_MS);

    return () => clearInterval(weatherTimer);
  }, [selectedCity.lat, selectedCity.lng, selectedLanguage]);

  const renderWeatherIcon = () => {
    if (isWeatherFetching) {
      return <RefreshCw className="w-4 h-4 text-emerald-500 animate-spin" />;
    }
    switch (liveWeather.icon) {
      case 'cloud-sun':
        return <CloudSun className="w-4 h-4 text-amber-400" />;
      case 'cloud':
        return <Cloud className="w-4 h-4 text-slate-400" />;
      case 'cloud-drizzle':
        return <CloudDrizzle className="w-4 h-4 text-teal-400" />;
      case 'cloud-rain':
        return <CloudRain className="w-4 h-4 text-sky-400" />;
      case 'cloud-lightning':
        return <CloudLightning className="w-4 h-4 text-amber-400 animate-pulse" />;
      case 'cloud-snow':
        return <CloudSnow className="w-4 h-4 text-blue-300" />;
      case 'sun':
      default:
        return <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />;
    }
  };

  // Daily 5-prayer completion tracker with localStorage persistence
  const [completedPrayers, setCompletedPrayers] = useState<Record<string, boolean>>(() => {
    try {
      const todayKey = `zikrmate_prayers_${new Date().toISOString().slice(0, 10)}`;
      const saved = localStorage.getItem(todayKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const togglePrayerCompleted = (id: string) => {
    setCompletedPrayers((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        const todayKey = `zikrmate_prayers_${new Date().toISOString().slice(0, 10)}`;
        localStorage.setItem(todayKey, JSON.stringify(updated));
      } catch {}
      if (soundEnabled) soundHaptics.playMilestone();
      return updated;
    });
  };

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

  // Localized Hijri, Gregorian & Weather data
  const hijriWeather = useMemo(() => {
    return getDetailedHijriBengaliString(currentDate, hijriOffset);
  }, [currentDate, hijriOffset]);

  // Prayer Names in Bengali
  const PRAYER_NAMES_BN: Record<string, string> = {
    Fajr: 'ফজর',
    Sunrise: 'সূর্যোদয়',
    Dhuhr: 'যোহর',
    Asr: 'আসর',
    Maghrib: 'মাগরিব',
    Isha: 'এশা',
    Midnight: 'মধ্যরাত',
    Tahajjud: 'তাহাজ্জুদ',
  };

  // Active Fard Waqt calculation
  const activeFard = useMemo(() => {
    return (
      prayerData.fardPrayers.find((p) => p.isActive) ||
      prayerData.fardPrayers[prayerData.fardPrayers.length - 1]
    );
  }, [prayerData]);

  // Real-time ticking countdown string: "HH:MM:SS" (e.g. "06:32:40")
  const liveCountdownStr = useMemo(() => {
    const target = prayerData.nextPrayerDate;
    if (!target) return '00:00:00';
    const now = new Date();
    const diff = Math.max(0, target.getTime() - now.getTime());
    const totalSecs = Math.floor(diff / 1000);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [prayerData.nextPrayerDate, liveTick]);

  // Active waqt progress (0 to 100%)
  const activeWaqtProgress = useMemo(() => {
    if (!activeFard) return 50;
    const start = activeFard.startDate.getTime();
    const end = activeFard.endDate.getTime();
    const now = new Date().getTime();
    if (now <= start) return 0;
    if (now >= end) return 100;
    return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
  }, [activeFard, liveTick]);

  // Qibla bearing calculation
  const qiblaDeg = Math.round(prayerData.qiblaBearing || 278);
  const qiblaAngleRad = ((qiblaDeg - 90) * Math.PI) / 180;
  const kaabaDialX = 80 + 52 * Math.cos(qiblaAngleRad);
  const kaabaDialY = 80 + 52 * Math.sin(qiblaAngleRad);

  // 5 Daily Prayers list with accurate status (✓ শেষ, Active Waqt, Upcoming) and full metadata
  const fiveDailyPrayers = useMemo(() => {
    const now = new Date();
    const prayerConfigs = [
      {
        id: 'Fajr',
        name: 'ফজর',
        icon: SunriseIcon,
        time: prayerData.fajr,
        iconColor: 'text-amber-500',
        rakatsSummary: '২ রাকাত সুন্নত, ২ রাকাত ফরজ',
        totalRakats: '৪',
        virtue: 'ফজরের দুই রাকাত সুন্নাত দুনিয়া ও তার মধ্যে যা কিছু আছে তার চেয়ে উত্তম। (সহিহ মুসলিম ৭২৫)',
      },
      {
        id: 'Dhuhr',
        name: 'যোহর',
        icon: Sun,
        time: prayerData.dhuhr,
        iconColor: 'text-emerald-500',
        rakatsSummary: '৪ সুন্নত, ৪ ফরজ, ২ সুন্নত, ২ নফল',
        totalRakats: '১২',
        virtue: 'সূর্য ঢলে পড়ার পর আসমানের দরজাসমূহ উন্মুক্ত করা হয় এবং সৎ আমল গৃহীত হয়। (তিরমিজি ৪৭৮)',
      },
      {
        id: 'Asr',
        name: 'আসর',
        icon: CloudSun,
        time: prayerData.asr,
        iconColor: 'text-orange-500',
        rakatsSummary: '৪ রাকাত সুন্নত (মুস্তাহাব), ৪ রাকাত ফরজ',
        totalRakats: '৮',
        virtue: 'যে ব্যক্তি আসরের নামাজ পরিত্যাগ করল, তার আমল বিনষ্ট হয়ে গেল। (সহিহ বুখারি ৫৫৩)',
      },
      {
        id: 'Maghrib',
        name: 'মাগরিব',
        icon: SunsetIcon,
        time: prayerData.maghrib,
        iconColor: 'text-amber-600',
        rakatsSummary: '৩ ফরজ, ২ সুন্নত, ২ নফল (আওয়াবীন)',
        totalRakats: '৭',
        virtue: 'সূর্যাস্তের পর বিলম্ব না করে সময়মতো মাগরিব সালাত আদায় করা অত্যন্ত কল্যাণকর। (আবু দাউদ ৪১৮)',
      },
      {
        id: 'Isha',
        name: 'এশা',
        icon: Moon,
        time: prayerData.isha,
        iconColor: 'text-indigo-400',
        rakatsSummary: '৪ ফরজ, ২ সুন্নত, ২ নফল, ৩ বিতর',
        totalRakats: '১৭',
        virtue: 'যে ব্যক্তি জামাতের সাথে এশা ও ফজরের সালাত পড়ল, সে যেন সারা রাত নফল নামাজ পড়ল। (মুসলিম ৬৫৬)',
      },
    ];

    return prayerConfigs.map((cfg) => {
      const fard = prayerData.fardPrayers.find((f) => f.id === cfg.id);
      const isActive = !!fard?.isActive;
      const isPast = fard ? now > fard.endDate && !isActive : false;
      return {
        ...cfg,
        fard,
        isActive,
        isPast,
      };
    });
  }, [prayerData, liveTick]);

  // Roza / Fasting calculations
  const rozaTimes = useMemo(() => {
    const now = new Date();
    const sehriEnd = prayerData.fajrDate;
    const iftarStart = prayerData.maghribDate;

    const iftarDiff = Math.max(0, iftarStart.getTime() - now.getTime());
    const iftarSecs = Math.floor(iftarDiff / 1000);
    const iftarH = Math.floor(iftarSecs / 3600);
    const iftarM = Math.floor((iftarSecs % 3600) / 60);
    const iftarS = iftarSecs % 60;
    const iftarCountdown = `${String(iftarH).padStart(2, '0')}:${String(iftarM).padStart(2, '0')}:${String(iftarS).padStart(2, '0')}`;

    const isFastingNow = now >= sehriEnd && now < iftarStart;

    return {
      sehriTime: prayerData.fajr,
      iftarTime: prayerData.maghrib,
      iftarCountdown,
      isFastingNow,
    };
  }, [prayerData, liveTick]);

  return (
    <div className="relative space-y-4 animate-in fade-in duration-300 max-w-xl mx-auto pb-20 px-1 select-none sm:select-auto">
      {/* ========================================================================= */}
      {/* 0. ATMOSPHERIC MOSQUE SILHOUETTE SKYLINE BACKDROP                         */}
      {/* ========================================================================= */}
      <MosqueSkylineBackdrop />

      {/* ========================================================================= */}
      {/* 1. TOP GREETING & HIJRI DATE & WEATHER (Exact layout to user screenshot)  */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex items-start justify-between gap-3 pt-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-500 text-sm">✦</span>
            <h1 className="text-xl sm:text-2xl font-black text-[#09352c] dark:text-emerald-100 tracking-tight leading-tight">
              {hijriWeather.greeting}
            </h1>
          </div>
          <p className="text-xs sm:text-[13px] font-semibold text-slate-600 dark:text-emerald-300/80 leading-relaxed mt-0.5">
            {hijriWeather.hijriAndGregorian}
          </p>
        </div>

        {/* Weather Badge (Location-based, auto-updates every 30 mins) */}
        <button
          type="button"
          onClick={() => {
            soundHaptics.playTap();
            if (typeof navigator !== 'undefined' && navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (pos) => updateWeatherForLocation(pos.coords.latitude, pos.coords.longitude, selectedLanguage === 'bn' ? 'বর্তমান জিপিএস অবস্থান' : 'GPS Location'),
                () => updateWeatherForLocation(selectedCity.lat, selectedCity.lng, selectedCity.name)
              );
            } else {
              updateWeatherForLocation(selectedCity.lat, selectedCity.lng, selectedCity.name);
            }
          }}
          className="shrink-0 flex items-center gap-2 p-2 px-3 rounded-2xl bg-white/90 dark:bg-[#0a2822]/90 border border-slate-200/90 dark:border-emerald-800/60 shadow-xs backdrop-blur-md transition hover:border-emerald-500 active:scale-95 cursor-pointer relative group"
          title={
            selectedLanguage === 'bn'
              ? `আবহাওয়া (${liveWeather.locationName})\nপ্রতি ৩০ মিনিট পর পর স্বয়ংক্রিয়ভাবে আপডেট হয়\nট্যাপ করে এখনই রিফ্রেশ করুন`
              : `Weather (${liveWeather.locationName})\nAuto-updates every 30 mins\nTap to refresh now`
          }
        >
          <div className="relative flex items-center justify-center">
            {renderWeatherIcon()}
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse border border-white dark:border-[#0a2822]" />
          </div>
          <div className="text-right">
            <div className="text-xs font-black text-slate-800 dark:text-white leading-none">
              {selectedLanguage === 'bn' ? liveWeather.tempFormattedBn : liveWeather.tempFormattedEn}
            </div>
            <div className="text-[10px] font-bold text-slate-500 dark:text-emerald-300/70 leading-none mt-0.5">
              {selectedLanguage === 'bn' ? liveWeather.conditionBn : liveWeather.conditionEn}
            </div>
          </div>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. THREE NAVIGATION TABS: নামাজ | রোজা | ক্যালেন্ডার ও আমল                */}
      {/* ========================================================================= */}
      <div className="relative z-10 p-1.5 rounded-2xl bg-[#e3eae6] dark:bg-[#08201b] border border-slate-200/90 dark:border-emerald-900/50 grid grid-cols-3 gap-1 shadow-inner">
        <button
          onClick={() => {
            setSalatSubTab('namaj');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            salatSubTab === 'namaj'
              ? 'bg-[#004d35] text-white shadow-md shadow-emerald-950/20 scale-[1.01]'
              : 'text-slate-700 dark:text-emerald-200/70 hover:text-emerald-900 dark:hover:text-white'
          }`}
        >
          <span>🌙</span>
          <span>নামাজ</span>
        </button>

        <button
          onClick={() => {
            setSalatSubTab('roza');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            salatSubTab === 'roza'
              ? 'bg-[#004d35] text-white shadow-md shadow-emerald-950/20 scale-[1.01]'
              : 'text-slate-700 dark:text-emerald-200/70 hover:text-emerald-900 dark:hover:text-white'
          }`}
        >
          <span>☀️</span>
          <span>রোজা</span>
        </button>

        <button
          onClick={() => {
            setSalatSubTab('calendar');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            salatSubTab === 'calendar'
              ? 'bg-[#004d35] text-white shadow-md shadow-emerald-950/20 scale-[1.01]'
              : 'text-slate-700 dark:text-emerald-200/70 hover:text-emerald-900 dark:hover:text-white'
          }`}
        >
          <span>📅</span>
          <span>ক্যালেন্ডার ও আমল</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. TAB CONTENT 1: NAMAJ (Hero Waqt Countdown + 3D Qibla Compass + 5 Cards)*/}
      {/* ========================================================================= */}
      {salatSubTab === 'namaj' && (
        <div className="relative z-10 space-y-3.5 animate-in fade-in duration-200">
          {/* Dual Hero Row: Left Waqt Countdown Card | Right 3D Kaaba Qibla Dial */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch">
            {/* Left Hero Card: Current Waqt & Live Monospace Countdown */}
            <div className="sm:col-span-7 bg-gradient-to-br from-[#05382e] via-[#042e26] to-[#021f19] text-white rounded-[26px] p-5 shadow-xl border border-emerald-400/30 relative overflow-hidden flex flex-col justify-between">
              {/* Subtle background dome silhouette & geometric rosette watermark */}
              <div className="absolute right-2 -bottom-6 text-emerald-400/10 pointer-events-none select-none text-9xl">
                🕌
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

              {/* Upper row: Label & Audio Adhan Toggle Button */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                  <span className="text-xs font-bold text-emerald-200/90 tracking-wide">
                    বর্তমান ওয়াক্ত
                  </span>
                </div>

                {/* Direct Azan Audio Button */}
                <button
                  type="button"
                  onClick={() => togglePlayAdhan(`${PRAYER_NAMES_BN[activeFard.id] || activeFard.name} Azan`)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                    isPlayingAdhan
                      ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-md animate-pulse'
                      : 'bg-white/10 hover:bg-white/20 text-emerald-100 border-white/15 backdrop-blur-xs'
                  }`}
                  title={isPlayingAdhan ? 'আজান থামান' : 'আজান শুনুন'}
                >
                  {isPlayingAdhan ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                      <span>আজান চলছে</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>আজান শুনুন</span>
                    </>
                  )}
                </button>
              </div>

              {/* Center row: Large Prayer Name & Live Monospace Digital Clock */}
              <div className="my-2.5 z-10">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-amber-200 via-white to-emerald-200 bg-clip-text text-transparent">
                  {PRAYER_NAMES_BN[activeFard.id] || activeFard.name}
                </h2>
                <div className="text-3xl sm:text-4xl font-mono font-black tracking-wider text-white mt-1 drop-shadow-[0_2px_12px_rgba(16,185,129,0.35)] flex items-center gap-2">
                  <span>{toBengaliNumber(liveCountdownStr)}</span>
                  <span className="text-xs font-medium text-emerald-300/80 font-sans tracking-normal bg-black/25 px-2 py-0.5 rounded-md">
                    বাকি
                  </span>
                </div>

                {/* Progress bar of current waqt with glowing cursor pip */}
                <div className="relative w-full h-2 rounded-full bg-black/30 mt-3 overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 rounded-full transition-all duration-1000 shadow-sm"
                    style={{ width: `${activeWaqtProgress}%` }}
                  />
                </div>
              </div>

              {/* Lower row: Start/End time & Next prayer info */}
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-100/90 pt-1.5 border-t border-white/10 z-10 gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 font-mono bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-white/5">
                  <Clock className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span>{toBengaliNumber(activeFard.timeRange)}</span>
                </div>
                <div className="text-amber-300 font-bold flex items-center gap-1">
                  <span>পরবর্তী {PRAYER_NAMES_BN[prayerData.nextPrayerName] || prayerData.nextPrayerName} {toBengaliNumber(prayerData.nextPrayerFormattedTime)}</span>
                </div>
              </div>
            </div>

            {/* Right Hero Widget: Precision Watch Dial Qibla Compass */}
            <div
              onClick={() => {
                setShowQiblaModal(true);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="sm:col-span-5 bg-white dark:bg-[#0a2721] rounded-[26px] p-4 border border-slate-200/90 dark:border-emerald-800/60 shadow-md flex flex-col items-center justify-center relative cursor-pointer hover:border-emerald-500 transition group hover:shadow-lg"
              title="সম্পূর্ণ কিবলা কম্পাস খুলতে ক্লিক করুন"
            >
              {/* Circular Precision Watch Dial (160x160 SVG) */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-sm select-none">
                  {/* Outer bezel shadow and track */}
                  <circle cx="80" cy="80" r="75" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
                  <circle cx="80" cy="80" r="69" className="fill-[#f8faf9] dark:fill-[#061d18] stroke-[#e2e8f0] dark:stroke-emerald-800/50" strokeWidth="2.5" />

                  {/* 360-Degree Dial Ticks (Every 30 degrees major, every 5 degrees minor) */}
                  {Array.from({ length: 24 }).map((_, i) => {
                    const angle = i * 15;
                    const isMajor = angle % 30 === 0;
                    return (
                      <line
                        key={angle}
                        x1="80"
                        y1={isMajor ? '13' : '16'}
                        x2="80"
                        y2="20"
                        stroke={isMajor ? '#64748b' : '#cbd5e1'}
                        strokeWidth={isMajor ? '1.5' : '0.8'}
                        transform={`rotate(${angle} 80 80)`}
                      />
                    );
                  })}

                  {/* Center Islamic 8-Point Rosette Watermark */}
                  <g opacity="0.15" className="fill-emerald-800 dark:fill-emerald-400">
                    <polygon points="80,68 83,77 92,80 83,83 80,92 77,83 68,80 77,77" />
                    <polygon points="80,68 83,77 92,80 83,83 80,92 77,83 68,80 77,77" transform="rotate(45 80 80)" />
                  </g>

                  {/* Cardinal Points: North (Green Wedge + N) */}
                  <polygon points="80,10 76,16 84,16" fill="#00875a" />
                  <text x="80" y="27" textAnchor="middle" className="text-[11px] font-black fill-[#00875a] font-mono">N</text>
                  <text x="144" y="84" textAnchor="middle" className="text-[10px] font-bold fill-slate-400 dark:fill-emerald-300/60 font-mono">E</text>
                  <text x="80" y="145" textAnchor="middle" className="text-[10px] font-bold fill-slate-400 dark:fill-emerald-300/60 font-mono">S</text>
                  <text x="16" y="84" textAnchor="middle" className="text-[10px] font-bold fill-slate-400 dark:fill-emerald-300/60 font-mono">W</text>

                  {/* Dual-tone Compass Needle pointing toward Qibla (qiblaDeg) */}
                  <g transform={`rotate(${qiblaDeg} 80 80)`} className="transition-transform duration-700 ease-out">
                    {/* North/Qibla pointer (Beveled Teal Arrow with Highlight) */}
                    <polygon points="80,24 86,76 80,71 74,76" fill="#00a36c" className="drop-shadow-xs" />
                    <polygon points="80,24 86,76 80,71" fill="#059669" />
                    <polygon points="80,24 74,76 80,71" fill="#10b981" />
                    {/* South pointer (Slate) */}
                    <polygon points="80,136 86,84 80,89 74,84" fill="#94a3b8" opacity="0.8" />
                  </g>

                  {/* Center Brass Pivot Rivet */}
                  <circle cx="80" cy="80" r="7" fill="#004d35" />
                  <circle cx="80" cy="80" r="4.5" fill="#f59e0b" />
                  <circle cx="80" cy="80" r="2" fill="#fbbf24" />

                  {/* 3D Kaaba Icon positioned precisely at the Qibla angle with golden glow */}
                  <foreignObject x={kaabaDialX - 14} y={kaabaDialY - 14} width="28" height="28" className="overflow-visible pointer-events-none">
                    <div className="w-7 h-7 transform transition-transform group-hover:scale-120 drop-shadow-md">
                      <Kaaba3DIcon className="w-7 h-7" />
                    </div>
                  </foreignObject>
                </svg>
              </div>

              {/* Below dial: Qibla Title and Degrees with chevron */}
              <div className="mt-2 text-center">
                <div className="text-xs font-black text-slate-800 dark:text-emerald-100">
                  কিবলা দিক
                </div>
                <div className="text-[11px] font-extrabold text-[#00875a] dark:text-emerald-400 flex items-center justify-center gap-0.5 mt-0.5 group-hover:underline">
                  <span>{toBengaliNumber(qiblaDeg)}° মক্কার দিকে</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Location Bar with City, Country & GPS Auto Detect */}
          <div className="flex items-center justify-between p-3 px-4 rounded-2xl bg-white dark:bg-[#0a2721] border border-slate-200/90 dark:border-emerald-800/50 shadow-xs transition group">
            <div
              onClick={() => {
                setShowSettingsDrawer(true);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="flex items-center gap-2 min-w-0 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-emerald-100 truncate">
                {selectedCity.name}, {selectedCity.country}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Quick GPS auto detect */}
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isLocating}
                className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 transition cursor-pointer active:scale-95"
                title="জিপিএস দিয়ে বর্তমান অবস্থান খুঁজুন"
              >
                <Radio className={`w-3 h-3 ${isLocating ? 'animate-spin' : 'animate-pulse'}`} />
                <span>{isLocating ? 'খোঁজা হচ্ছে...' : 'অটো জিপিএস'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowSettingsDrawer(true);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className="flex items-center gap-0.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition text-[11px] font-bold cursor-pointer"
              >
                <span className="hidden xs:inline">শহর পরিবর্তন</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5 Daily Prayers Cards Row (ফজর, যোহর, আসর, মাগরিব, এশা) */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
            {fiveDailyPrayers.map((prayer) => {
              const IconComp = prayer.icon;

              return (
                <div
                  key={prayer.id}
                  onClick={() => {
                    setSelectedQuickPrayer(prayer);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`p-2 sm:p-3 rounded-2xl border transition-all text-center flex flex-col items-center justify-between cursor-pointer active:scale-95 ${
                    prayer.isActive
                      ? 'bg-[#05362e] text-white border-2 border-emerald-400 ring-4 ring-emerald-400/20 shadow-xl scale-[1.03] z-10'
                      : prayer.isPast
                      ? 'bg-[#f4f7f5] dark:bg-[#071f19] border-slate-200/90 dark:border-emerald-900/40 text-slate-700 dark:text-emerald-200 hover:border-emerald-400'
                      : 'bg-white dark:bg-[#0a2922] border-slate-200/90 dark:border-emerald-900/40 text-slate-800 dark:text-white hover:border-emerald-400 shadow-xs'
                  }`}
                  title={`${prayer.name} নামাজের রাকাত ও বিস্তারিত দেখুন`}
                >
                  {/* Top Icon */}
                  <div className="mb-1">
                    <IconComp className={`w-5 h-5 ${prayer.isActive ? 'text-amber-300 animate-bounce-subtle' : prayer.iconColor}`} />
                  </div>

                  {/* Prayer Name */}
                  <div className="text-xs sm:text-sm font-black mb-0.5 truncate w-full">
                    {prayer.name}
                  </div>

                  {/* Prayer Start Time */}
                  <div className={`text-[11px] sm:text-xs font-mono font-bold mb-1.5 ${prayer.isActive ? 'text-white' : 'text-slate-600 dark:text-emerald-300'}`}>
                    {toBengaliNumber(prayer.time)}
                  </div>

                  {/* Status Badge */}
                  <div className="w-full">
                    {prayer.isActive ? (
                      <span className="inline-block w-full text-[9px] sm:text-[10px] font-black py-0.5 rounded-md bg-emerald-500 text-white animate-pulse">
                        চলমান
                      </span>
                    ) : prayer.isPast ? (
                      <span className="inline-block w-full text-[9px] sm:text-[10px] font-extrabold py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-slate-500 dark:text-emerald-400">
                        ✓ শেষ
                      </span>
                    ) : (
                      <span className="inline-block w-full text-[9px] sm:text-[10px] font-medium py-0.5 rounded-md bg-slate-100 dark:bg-black/30 text-slate-400">
                        অপেক্ষমান
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sunnah Fasting Teaser Card */}
          <div
            onClick={() => {
              setShowSunnahFastDrawer(true);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className="p-3.5 sm:p-4 rounded-2xl border bg-white dark:bg-[#0a2721] border-slate-200/90 dark:border-emerald-800/50 shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:border-emerald-500 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-lg shrink-0 group-hover:scale-105 transition-transform">
                🌙
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  সোমবার ও বৃহস্পতিবারের সুন্নত রোজা
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-emerald-300/70 font-medium mt-0.5">
                  অগ্রিম প্রস্তুতি ও আমল বিস্তারিত দেখুন ›
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition shrink-0" />
          </div>

          {/* Toggle for Comprehensive Solar Arc & Detailed Fard Hadith Guides */}
          <div className="pt-1 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setShowDetailedFaraj(!showDetailedFaraj);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{showDetailedFaraj ? '▲ ৫ ওয়াক্তের রাকাত ও হাদিস লুকান' : '▼ ৫ ওয়াক্তের রাকাত ও বিস্তারিত হাদিস দেখুন'}</span>
            </button>

            <button
              onClick={() => {
                setShowDetailedTrajectory(!showDetailedTrajectory);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{showDetailedTrajectory ? '▲ সূর্যের কক্ষপথ লুকান' : '▼ সূর্যের সার্বিক গতিপথ (Solar Arc)'}</span>
            </button>
          </div>

          {/* Comprehensive 5 Faraj Prayer Details with Rakats, Virtues, and Hadiths */}
          {showDetailedFaraj && (
            <div className="animate-in fade-in duration-200">
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
            </div>
          )}

          {/* Solar Trajectory Arc Card */}
          {showDetailedTrajectory && (
            <div className="animate-in fade-in duration-200">
              <SolarTrajectoryCard
                prayerData={prayerData}
                isDay={isDay}
                selectedLanguage={selectedLanguage}
                soundEnabled={soundEnabled}
              />
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB CONTENT 2: ROZA (Fasting, Sehri, Iftar, Niyyah, Dua & Sunnah Days) */}
      {/* ========================================================================= */}
      {salatSubTab === 'roza' && (
        <div className="space-y-3.5 animate-in fade-in duration-200">
          {/* Dual Sehri & Iftar Banner */}
          <div className="grid grid-cols-2 gap-3">
            {/* Sehri Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-indigo-950/60 border border-indigo-500/30 text-white shadow-md">
              <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-bold mb-1">
                <SunriseIcon className="w-3.5 h-3.5" />
                <span>আজকের সেহরি শেষ</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-black text-white">
                {rozaTimes.sehriTime}
              </div>
              <div className="text-[10px] text-indigo-200/70 mt-1">
                ফজরের ওয়াক্ত শুরুর সাথে সাথে সেহরি শেষ হয়
              </div>
            </div>

            {/* Iftar Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-900/40 to-amber-950/60 border border-amber-500/30 text-white shadow-md">
              <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold mb-1">
                <SunsetIcon className="w-3.5 h-3.5" />
                <span>আজকের ইফতার</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-black text-amber-300">
                {rozaTimes.iftarTime}
              </div>
              <div className="text-[10px] text-amber-200/70 mt-1 font-mono">
                ইফতারের বাকি: {rozaTimes.iftarCountdown}
              </div>
            </div>
          </div>

          {/* Fasting Niyyah (রোজার নিয়ত) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0a2721] border border-slate-200 dark:border-emerald-800/40 shadow-sm space-y-2">
            <h3 className="text-sm font-extrabold text-[#006747] dark:text-emerald-300 flex items-center gap-1.5">
              <span>📜</span>
              <span>রোজার নিয়ত (Fasting Intention)</span>
            </h3>
            <div dir="rtl" className="font-quran text-lg sm:text-xl font-bold text-right text-emerald-950 dark:text-emerald-100 leading-relaxed bg-emerald-50/50 dark:bg-black/20 p-3 rounded-xl border border-emerald-500/20">
              نَوَيْتُ اَنْ اُصُوْمَ غَدًا مِّنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ فَرْضًا لَكَ يَا اللهُ فَتَقَبَّلْ مِنِّى اِنَّكَ اَنْتَ السَّمِيْعُ الْعَلِيْمُ
            </div>
            <p className="text-xs text-slate-700 dark:text-emerald-200/90 leading-relaxed">
              <strong>উচ্চারণ:</strong> নাওয়াইতু আন আছুমা গাদাম মিন শাহরি রামাদ্বানাল মুবারাকি ফারদ্বাল্লাকা ইয়া আল্লাহু ফাতাক্বাব্বাল মিন্নি ইন্নাকা আনতাস সামিউল আলিম।
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>অর্থ:</strong> হে আল্লাহ! আপনার সন্তুষ্টির উদ্দেশ্যে আমি আগামীকালকের রোজা রাখার নিয়ত করছি। অতএব আপনি আমার রোজা কবুল করুন, নিশ্চয়ই আপনি সর্বশ্রোতা ও সর্বজ্ঞাত।
            </p>
          </div>

          {/* Iftar Dua (ইফতারের দোয়া) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0a2721] border border-slate-200 dark:border-emerald-800/40 shadow-sm space-y-2">
            <h3 className="text-sm font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <span>🤲</span>
              <span>ইফতারের দোয়া (Iftar Dua)</span>
            </h3>
            <div dir="rtl" className="font-quran text-lg sm:text-xl font-bold text-right text-amber-950 dark:text-amber-200 leading-relaxed bg-amber-50/50 dark:bg-black/20 p-3 rounded-xl border border-amber-500/20">
              اَللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ اَفْطَرْتُ
            </div>
            <p className="text-xs text-slate-700 dark:text-emerald-200/90 leading-relaxed">
              <strong>উচ্চারণ:</strong> আল্লাহুম্মা লাকা ছুমতু ওয়া আলা রিযক্বিকা আফতারতু।
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>অর্থ:</strong> হে আল্লাহ! আমি আপনারই জন্য রোজা রেখেছি এবং আপনারই দেওয়া রিজিক দ্বারা ইফতার করছি। (আবু দাউদ ২৩৫৮)
            </p>
          </div>

          {/* Sunnah Fasting Days Information */}
          <div className="p-4 rounded-2xl bg-[#f7faf8] dark:bg-[#081e1a] border border-slate-200 dark:border-emerald-800/40 text-xs space-y-2">
            <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>🌟</span>
              <span>রাসূলুল্লাহ (ﷺ)-এর প্রিয় সুন্নত রোজা সমূহ</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              <li>• <strong>প্রতি সোমবার ও বৃহস্পতিবার:</strong> এ দিনগুলোতে বান্দার আমল আল্লাহর দরবারে পেশ করা হয়। (তিরমিযী ৭৪৭)</li>
              <li>• <strong>আইয়ামে বীজ:</strong> প্রতি হিজরি মাসের ১৩, ১৪ ও ১৫ তারিখের ৩টি রোজা সারাবছর রোজা রাখার সমতুল্য সওয়াব।</li>
              <li>• <strong>আশুরা ও আরাফাত:</strong> বিগত ও পরবর্তী বছরের পাপমোচনের বিশেষ ফজিলতপূর্ণ রোজা।</li>
            </ul>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TAB CONTENT 3: CALENDAR & AAMAL (Tracker + Nafal + Prohibited Times)    */}
      {/* ========================================================================= */}
      {salatSubTab === 'calendar' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Daily 5-Prayer Tracker with Checkboxes and Progress Bar */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0a2721] border border-slate-200/90 dark:border-emerald-800/50 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-5 rounded-full bg-emerald-500" />
                <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-white">
                  আজকের ৫ ওয়াক্ত সালাত ট্র্যাকার
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                {toBengaliNumber(Object.values(completedPrayers).filter(Boolean).length)}/৫ আদায়কৃত
              </span>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-1">
              {fiveDailyPrayers.map((prayer) => {
                const isDone = !!completedPrayers[prayer.id];
                return (
                  <button
                    key={prayer.id}
                    type="button"
                    onClick={() => togglePrayerCompleted(prayer.id)}
                    className={`py-2 px-1 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                      isDone
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-[#071f1a] text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-emerald-900/40 hover:border-emerald-400'
                    }`}
                  >
                    <span className="text-xs font-black">{prayer.name}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone ? 'bg-white text-emerald-700 shadow-xs' : 'border border-slate-300 dark:border-slate-600 text-transparent'
                    }`}>
                      ✓
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Prayer Times Card with caution toggle */}
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

          {/* Nafal Prayers Card */}
          <div
            className={`rounded-3xl border shadow-sm p-4 sm:p-5 transition-colors ${
              isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
            }`}
          >
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

            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {prayerData.nafalPrayers.map((nafal) => (
                <div
                  key={nafal.id}
                  onClick={() => {
                    setSelectedNafalId(nafal.id === 'tahajjud' ? 'Tahajjud' : nafal.id === 'ishraq' ? 'Ishraq' : 'Chast');
                    setShowNafalModal(true);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`min-w-[130px] sm:min-w-[145px] p-3 rounded-2xl border transition-all shadow-sm flex flex-col justify-between shrink-0 cursor-pointer active:scale-95 ${
                    isDay
                      ? 'bg-[#fcfdfd] border-[#dcebe8] hover:border-emerald-400'
                      : 'bg-[#092226] border-[#184850] hover:border-emerald-500'
                  }`}
                >
                  <div className="text-center font-bold text-xs sm:text-sm text-slate-800 dark:text-white mb-1">
                    {nafal.name}
                  </div>
                  <div className="space-y-1 text-[11px] font-mono font-semibold text-slate-700 dark:text-emerald-300 text-center">
                    <div>{nafal.startTime}</div>
                    <div className="text-slate-400 text-[10px]">পর্যন্ত {nafal.endTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

      {/* F. Quick Prayer Details & Rakats Modal */}
      {selectedQuickPrayer && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div
            className={`w-full max-w-sm border rounded-3xl p-5 shadow-2xl space-y-4 ${
              isDay ? 'bg-white border-[#dcebe8] text-[#103e42]' : 'bg-[#08231d] border-emerald-800/60 text-white'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  {React.createElement(selectedQuickPrayer.icon, { className: 'w-5 h-5' })}
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-emerald-800 dark:text-emerald-100">
                    {selectedQuickPrayer.name} সালাত
                  </h3>
                  <p className="text-[11px] font-mono font-bold text-slate-500 dark:text-emerald-300/80">
                    শুরু: {toBengaliNumber(selectedQuickPrayer.time)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuickPrayer(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Rakats Breakdown */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-500 dark:text-emerald-300">
                রাকাত বিন্যাস (মোট {toBengaliNumber(selectedQuickPrayer.totalRakats)} রাকাত):
              </div>
              <div className="p-3 rounded-2xl bg-[#f4f8f6] dark:bg-black/30 border border-slate-200/80 dark:border-emerald-900/40 text-xs font-bold text-slate-800 dark:text-emerald-100 leading-relaxed">
                {selectedQuickPrayer.rakatsSummary}
              </div>
            </div>

            {/* Hadith / Virtue */}
            {selectedQuickPrayer.virtue && (
              <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                <span className="font-bold">ফজিলত: </span>
                {selectedQuickPrayer.virtue}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => togglePlayAdhan(`${selectedQuickPrayer.name} Azan`)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingAdhan ? 'আজান থামান' : 'আজান শুনুন'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedQuickPrayer(null);
                  setShowDetailedFaraj(true);
                }}
                className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-emerald-800 text-xs font-bold text-slate-700 dark:text-emerald-200 hover:border-emerald-400 transition cursor-pointer"
              >
                হাদিস ও নিয়ম
              </button>
            </div>
          </div>
        </div>
      )}

      {/* G. Sunnah Fasting Information Modal */}
      {showSunnahFastDrawer && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div
            className={`w-full max-w-sm border rounded-3xl p-5 shadow-2xl space-y-4 ${
              isDay ? 'bg-white border-[#dcebe8] text-[#103e42]' : 'bg-[#08231d] border-emerald-800/60 text-white'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-emerald-900/40">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌙</span>
                <h3 className="font-black text-base text-slate-900 dark:text-white">
                  সোম ও বৃহস্পতিবারের সুন্নত রোজা
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSunnahFastDrawer(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700 dark:text-emerald-100">
              হযরত আবু হুরায়রা (রা.) থেকে বর্ণিত, রাসূলুল্লাহ (ﷺ) বলেছেন:
            </p>
            <blockquote className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-500/30 text-xs font-medium text-emerald-950 dark:text-emerald-200 italic leading-relaxed">
              "প্রতি সোমবার ও বৃহস্পতিবার আল্লাহর দরবারে বান্দার আমলসমূহ পেশ করা হয়। অতএব আমি পছন্দ করি যে, রোজা রাখা অবস্থায় যেন আমার আমল আল্লাহর সমীপে পেশ করা হয়।"
              <span className="block not-italic text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mt-1">— জামে আত-তিরমিজি ৭৪৭</span>
            </blockquote>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-emerald-900/40">
                <div className="text-[10px] text-slate-500 dark:text-emerald-300 font-bold">সেহরি শেষ</div>
                <div className="font-mono font-black text-slate-900 dark:text-white mt-0.5">{toBengaliNumber(prayerData.fajr)}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-emerald-900/40">
                <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">ইফতার সময়</div>
                <div className="font-mono font-black text-amber-600 dark:text-amber-300 mt-0.5">{toBengaliNumber(prayerData.maghrib)}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowSunnahFastDrawer(false);
                setSalatSubTab('roza');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition active:scale-95 cursor-pointer shadow-md"
            >
              রোজার নিয়ত ও দোয়ার পাতায় যান ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
