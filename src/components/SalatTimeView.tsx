import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  calculatePrayerTimes,
  FormattedPrayerTimes,
  POPULAR_CITIES,
  CityOption,
} from '../utils/prayerTimes';
import { useBackLayer } from '../utils/backNavigation';
import {
  Clock,
  Compass,
  MapPin,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Navigation,
  Sun,
  Moon,
  Sunrise as SunriseIcon,
  Sunset as SunsetIcon,
  Bell,
  BellOff,
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
  Layers,
  Check,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { ThemeMode, ZikrLanguage } from '../types';
import { SalatAmalArcCard, WaqtNodeKey } from './SalatAmalArcCard';
import { ALL_PRAYER_DETAILS } from '../data/prayerDetailsData';
import {
  formatLocalizedNumber,
  getLocalizedHijriAndGregorian,
  SALAT_TEXTS,
} from '../utils/salatTranslations';

// Atmospheric Mosque Skyline Backdrop Silhouette
export const MosqueSkylineBackdrop: React.FC = () => (
  <div className="absolute top-0 left-0 right-0 h-44 overflow-hidden pointer-events-none select-none z-0">
    <svg
      viewBox="0 0 800 220"
      preserveAspectRatio="none"
      className="w-full h-full opacity-20 dark:opacity-10 text-emerald-700 dark:text-emerald-400"
      fill="currentColor"
    >
      <path d="M 0,220 L 0,175 Q 25,150 50,175 L 65,175 L 65,115 Q 70,100 75,115 L 75,175 L 120,175 Q 150,130 180,175 L 230,175 L 230,75 Q 235,55 240,75 L 240,175 L 330,175 Q 400,45 470,175 L 560,175 L 560,75 Q 565,55 570,75 L 570,175 L 620,175 Q 650,130 680,175 L 725,175 L 725,115 Q 730,100 735,115 L 735,175 L 800,175 L 800,220 Z" />
      <circle cx="400" cy="38" r="3.5" fill="currentColor" />
      <path d="M 397,30 Q 400,26 403,30 Q 401,33 397,30 Z" fill="currentColor" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/40 via-transparent to-transparent dark:from-emerald-950/30" />
  </div>
);

// Miniature 3D Isometric Kaaba Cube Icon with Golden Kiswa and Bab ar-Rahman
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
    <ellipse cx="27" cy="48" rx="19" ry="5" fill="#000000" opacity="0.3" />
    <polygon points="27,6 47,15 27,24 7,15" fill="url(#topRoofGrad)" stroke="#6b7280" strokeWidth="0.8" />
    <polygon points="7,15 27,24 27,47 7,38" fill="url(#leftWallGrad)" />
    <polygon points="7,20 27,29 27,32 7,23" fill="url(#goldBandGrad)" />
    <polygon points="27,24 47,15 47,38 27,47" fill="url(#rightWallGrad)" />
    <polygon points="27,29 47,20 47,23 27,32" fill="url(#goldBandGrad)" />
    <polygon points="33,33 40,29.5 40,41 33,44.5" fill="#f59e0b" stroke="#fef08a" strokeWidth="0.8" />
    <line x1="36.5" y1="31.2" x2="36.5" y2="42.8" stroke="#78350f" strokeWidth="0.6" />
    <polygon points="6,38 27,47.5 48,38 48,40 27,49.5 6,40" fill="#e2e8f0" opacity="0.7" />
  </svg>
);

export interface LiveWeatherData {
  temp: number;
  condition: string;
  code: number;
  icon: 'sun' | 'cloud-sun' | 'cloud' | 'cloud-drizzle' | 'cloud-rain' | 'cloud-lightning' | 'cloud-snow';
  lastUpdated: number;
  locationName: string;
}

export function parseWmoWeatherCode(code: number, lang: ZikrLanguage): {
  condition: string;
  icon: 'sun' | 'cloud-sun' | 'cloud' | 'cloud-drizzle' | 'cloud-rain' | 'cloud-lightning' | 'cloud-snow';
} {
  const isBn = lang === 'bn';
  const isAr = lang === 'ar';
  const isUr = lang === 'ur';

  switch (code) {
    case 0:
      return {
        condition: isBn ? 'পরিষ্কার আকাশ' : isAr ? 'سماء صافية' : isUr ? 'صاف آسمان' : 'Clear Sky',
        icon: 'sun',
      };
    case 1:
    case 2:
      return {
        condition: isBn ? 'আংশিক মেঘলা' : isAr ? 'غائم جزئياً' : isUr ? 'جزوی ابر آلود' : 'Partly Cloudy',
        icon: 'cloud-sun',
      };
    case 3:
    case 45:
    case 48:
      return {
        condition: isBn ? 'মেঘলা আকাশ' : isAr ? 'غائم' : isUr ? 'ابر آلود' : 'Overcast / Foggy',
        icon: 'cloud',
      };
    case 51:
    case 53:
    case 55:
      return {
        condition: isBn ? 'গুঁড়ি গুঁড়ি বৃষ্টি' : isAr ? 'رذاذ خفيف' : isUr ? 'ہلکی بوندا باندی' : 'Light Drizzle',
        icon: 'cloud-drizzle',
      };
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return {
        condition: isBn ? 'বৃষ্টিপাত' : isAr ? 'ماطر' : isUr ? 'بارش' : 'Rainy',
        icon: 'cloud-rain',
      };
    case 71:
    case 73:
    case 75:
      return {
        condition: isBn ? 'তুষারপাত' : isAr ? 'تساقط الثلوج' : isUr ? 'برف باری' : 'Snowing',
        icon: 'cloud-snow',
      };
    case 95:
    case 96:
    case 99:
      return {
        condition: isBn ? 'বজ্রবৃষ্টি' : isAr ? 'عاصفة رعدية' : isUr ? 'گرج چمک' : 'Thunderstorm',
        icon: 'cloud-lightning',
      };
    default:
      return {
        condition: isBn ? 'পরিষ্কার' : isAr ? 'صحو' : isUr ? 'خوشگوار' : 'Clear',
        icon: 'sun',
      };
  }
}

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
  const lang = selectedLanguage || 'bn';

  // Navigation Subtabs: prayers | qibla
  const [salatSubTab, setSalatSubTab] = useState<'prayers' | 'qibla'>('prayers');
  const [liveTick, setLiveTick] = useState<number>(0);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState<boolean>(false);
  const [selectedQuickPrayer, setSelectedQuickPrayer] = useState<any | null>(null);
  const [locationNotice, setLocationNotice] = useState<string | null>(null);

  // Register Salat overlays for step-by-step reverse back navigation
  useBackLayer(showSettingsDrawer, () => setShowSettingsDrawer(false), 'salat-settings');
  useBackLayer(Boolean(selectedQuickPrayer), () => setSelectedQuickPrayer(null), 'salat-quick-prayer');

  // 1-Second live ticker for live clock & countdowns
  useEffect(() => {
    const t = setInterval(() => setLiveTick((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // City and calculation parameters with localStorage persistence
  const [selectedCity, setSelectedCity] = useState<CityOption>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_salat_city');
      if (saved) return JSON.parse(saved);
    } catch {}
    return POPULAR_CITIES[3]; // Default: Dhaka, Bangladesh
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

  const [withCaution, setWithCaution] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_salat_caution');
      if (saved !== null) return JSON.parse(saved);
    } catch {}
    return true;
  });

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Daily Completed Prayers Tracker
  const [completedPrayers, setCompletedPrayers] = useState<Record<string, boolean>>(() => {
    try {
      const todayKey = `zikrmate_prayers_${new Date().toISOString().slice(0, 10)}`;
      const saved = localStorage.getItem(todayKey);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { Fajr: false, Dhuhr: false, Asr: false, Maghrib: false, Isha: false };
  });

  const syncPrayerCompletedFromArc = (prayerKey: WaqtNodeKey, completed: boolean) => {
    setCompletedPrayers((prev) => {
      if (Boolean(prev[prayerKey]) === completed) return prev;
      const updated = { ...prev, [prayerKey]: completed };
      try {
        const todayKey = `zikrmate_prayers_${new Date().toISOString().slice(0, 10)}`;
        localStorage.setItem(todayKey, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // City Search & GPS Location state
  const [citySearchQuery, setCitySearchQuery] = useState<string>('');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [isPlayingAdhan, setIsPlayingAdhan] = useState<boolean>(false);

  // Qibla Compass state
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [hasCompassSensor, setHasCompassSensor] = useState<boolean>(false);
  const [manualCompassRotation, setManualCompassRotation] = useState<number>(0);

  // Live Weather State
  const [liveWeather, setLiveWeather] = useState<LiveWeatherData>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_live_weather');
      if (saved) {
        const p = JSON.parse(saved);
        if (p && typeof p.temp === 'number') return p;
      }
    } catch {}
    return {
      temp: 27,
      condition: 'Clear Sky',
      code: 0,
      icon: 'sun',
      lastUpdated: 0,
      locationName: 'Dhaka',
    };
  });
  const [isWeatherFetching, setIsWeatherFetching] = useState<boolean>(false);

  const updateWeatherForLocation = async (lat: number, lng: number, locName: string) => {
    setIsWeatherFetching(true);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
      );
      if (res.ok) {
        const data = await res.json();
        const cw = data.current_weather;
        if (cw) {
          const parsed = parseWmoWeatherCode(cw.weathercode, lang);
          const wObj: LiveWeatherData = {
            temp: Math.round(cw.temperature),
            condition: parsed.condition,
            code: cw.weathercode,
            icon: parsed.icon,
            lastUpdated: Date.now(),
            locationName: locName,
          };
          setLiveWeather(wObj);
          localStorage.setItem('zikrmate_live_weather', JSON.stringify(wObj));
        }
      }
    } catch {} finally {
      setIsWeatherFetching(false);
    }
  };

  useEffect(() => {
    if (Date.now() - liveWeather.lastUpdated > 30 * 60 * 1000) {
      updateWeatherForLocation(selectedCity.lat, selectedCity.lng, selectedCity.name);
    }
  }, [selectedCity.lat, selectedCity.lng]);

  // Prayer times computation
  const prayerData: FormattedPrayerTimes = useMemo(() => {
    return calculatePrayerTimes(
      selectedCity.lat,
      selectedCity.lng,
      selectedCity.name,
      method,
      isHanafi,
      hijriOffset,
      withCaution,
      currentDate
    );
  }, [selectedCity, method, isHanafi, hijriOffset, withCaution, currentDate, liveTick]);

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
      adhanAudioRef.current.play().catch(() => {});
      setIsPlayingAdhan(true);
      if (soundEnabled) soundHaptics.playMilestone();
    }
  };

  // GPS Auto-detector
  const handleDetectLocation = () => {
    const showLocationNotice = (msg: string) => {
      setLocationNotice(msg);
      setTimeout(() => setLocationNotice(null), 4500);
    };

    if (!navigator.geolocation) {
      showLocationNotice(
        lang === 'bn'
          ? 'আপনার ব্রাউজারে লোকেশন সার্ভিস সাপোর্ট করে না। তালিকা থেকে শহর বেছে নিন।'
          : 'Geolocation is not supported by your browser. Please pick your city manually.'
      );
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        const newCity: CityOption = {
          name: lang === 'bn' ? 'বর্তমান অবস্থান' : lang === 'ar' ? 'الموقع الحالي' : 'Current Location',
          country: 'GPS Detected',
          lat: latitude,
          lng: longitude,
        };
        setSelectedCity(newCity);
        updateWeatherForLocation(latitude, longitude, newCity.name);
        if (soundEnabled) soundHaptics.playMilestone();
      },
      (err) => {
        setIsLocating(false);
        showLocationNotice(
          lang === 'bn'
            ? `লোকেশন পাওয়া যায়নি (${err.message})। নিচে থেকে শহর বেছে নিতে পারেন।`
            : `Location detection: ${err.message}`
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Device Compass orientation handler
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading = 0;
      if ((e as any).webkitCompassHeading !== undefined) {
        heading = (e as any).webkitCompassHeading;
      } else if (e.alpha !== null) {
        heading = 360 - e.alpha;
      }
      setDeviceHeading(Math.round(heading));
      setHasCompassSensor(true);
    };

    if (salatSubTab === 'qibla') {
      if (typeof window !== 'undefined' && 'ondeviceorientation' in window) {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
          (DeviceOrientationEvent as any)
            .requestPermission()
            .then((res: string) => {
              if (res === 'granted') {
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
  }, [salatSubTab]);

  // Localized Hijri & Gregorian strings
  const hijriGregorian = useMemo(() => {
    return getLocalizedHijriAndGregorian(currentDate, hijriOffset, lang);
  }, [currentDate, hijriOffset, lang]);

  // Active Fard prayer calculation
  const activeFard = useMemo(() => {
    return (
      prayerData.fardPrayers.find((p) => p.isActive) ||
      prayerData.fardPrayers[prayerData.fardPrayers.length - 1]
    );
  }, [prayerData]);

  // Live Monospace countdown string (HH:MM:SS)
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

  // Active waqt progress bar (0 to 100%)
  const activeWaqtProgress = useMemo(() => {
    if (!activeFard) return 50;
    const start = activeFard.startDate.getTime();
    const end = activeFard.endDate.getTime();
    const now = new Date().getTime();
    if (now <= start) return 0;
    if (now >= end) return 100;
    return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
  }, [activeFard, liveTick]);

  // Qibla angles & alignment
  const qiblaDeg = Math.round(prayerData.qiblaBearing || 278);
  const compassHeading = hasCompassSensor ? deviceHeading : manualCompassRotation;
  const effectiveCompassAngle = (360 - compassHeading + qiblaDeg) % 360;
  const isFacingKaaba = Math.abs(effectiveCompassAngle) < 7 || Math.abs(effectiveCompassAngle - 360) < 7;

  // 3D Kaaba dial coordinates on 160px SVG
  const qiblaAngleRad = ((qiblaDeg - 90) * Math.PI) / 180;
  const kaabaDialX = 80 + 52 * Math.cos(qiblaAngleRad);
  const kaabaDialY = 80 + 52 * Math.sin(qiblaAngleRad);

  // 5 Daily Prayers with comprehensive metadata and localized text
  const fiveDailyPrayers = useMemo(() => {
    const now = new Date();
    const configs = [
      {
        id: 'Fajr',
        name: (SALAT_TEXTS.prayerNames.Fajr as any)[lang] || 'Fajr',
        icon: SunriseIcon,
        time: prayerData.fajr,
        iconColor: 'text-amber-500',
        rakatsSummary: lang === 'bn' ? '২ সুন্নাত, ২ ফরজ' : lang === 'ar' ? '٢ سنة، ٢ فرض' : '2 Sunnah, 2 Fard',
        totalRakats: '4',
        virtue: lang === 'bn'
          ? 'ফজরের দুই রাকাত সুন্নাত দুনিয়া ও তার মধ্যে যা কিছু আছে তার চেয়ে উত্তম। (সহিহ মুসলিম ৭২৫)'
          : lang === 'ar'
          ? 'ركعتا الفجر خير من الدنيا وما فيها. (صحيح مسلم ٧٢٥)'
          : 'The two rak’ahs before Fajr are better than the entire world and all that is within it. (Sahih Muslim 725)',
      },
      {
        id: 'Dhuhr',
        name: (SALAT_TEXTS.prayerNames.Dhuhr as any)[lang] || 'Dhuhr',
        icon: Sun,
        time: prayerData.dhuhr,
        iconColor: 'text-emerald-500',
        rakatsSummary: lang === 'bn' ? '৪ সুন্নাত, ৪ ফরজ, ২ সুন্নাত, ২ নফল' : lang === 'ar' ? '٤ سنة، ٤ فرض، ٢ سنة، ٢ نفل' : '4 Sunnah, 4 Fard, 2 Sunnah, 2 Nafl',
        totalRakats: '12',
        virtue: lang === 'bn'
          ? 'সূর্য ঢলে পড়ার পর আসমানের দরজাসমূহ উন্মুক্ত করা হয় এবং সৎ আমল গৃহীত হয়। (তিরমিজি ৪৭৮)'
          : lang === 'ar'
          ? 'إنها ساعة تفتح فيها أبواب السماء، فأحب أن يصعد لي فيها عمل صالح. (الترمذي ٤٧٨)'
          : 'This is an hour when the gates of heaven are opened, and I love for righteous deeds to ascend. (Tirmidhi 478)',
      },
      {
        id: 'Asr',
        name: (SALAT_TEXTS.prayerNames.Asr as any)[lang] || 'Asr',
        icon: CloudSun,
        time: prayerData.asr,
        iconColor: 'text-orange-500',
        rakatsSummary: lang === 'bn' ? '৪ সুন্নাত (মুস্তাহাব), ৪ ফরজ' : lang === 'ar' ? '٤ سنة، ٤ فرض' : '4 Sunnah, 4 Fard',
        totalRakats: '8',
        virtue: lang === 'bn'
          ? 'যে ব্যক্তি আসরের নামাজ পরিত্যাগ করল, তার আমল বিনষ্ট হয়ে গেল। (সহিহ বুখারি ৫৫৩)'
          : lang === 'ar'
          ? 'من ترك صلاة العصر حبط عمله. (صحيح البخاري ٥٥٣)'
          : 'Whoever abandons the Asr prayer, his deeds are wiped out. (Sahih Bukhari 553)',
      },
      {
        id: 'Maghrib',
        name: (SALAT_TEXTS.prayerNames.Maghrib as any)[lang] || 'Maghrib',
        icon: SunsetIcon,
        time: prayerData.maghrib,
        iconColor: 'text-amber-600',
        rakatsSummary: lang === 'bn' ? '৩ ফরজ, ২ সুন্নাত, ২ নফল' : lang === 'ar' ? '٣ فرض، ٢ سنة، ٢ نفل' : '3 Fard, 2 Sunnah, 2 Nafl',
        totalRakats: '7',
        virtue: lang === 'bn'
          ? 'সূর্যাস্তের পর বিলম্ব না করে সময়মতো মাগরিব সালাত আদায় করা অত্যন্ত কল্যাণকর। (আবু দাউদ ৪১৮)'
          : lang === 'ar'
          ? 'بادروا بصلاة المغرب قبل اشتباك النجوم. (أبو داود ٤١٨)'
          : 'Hasten to perform the Maghrib prayer upon sunset. (Abu Dawud 418)',
      },
      {
        id: 'Isha',
        name: (SALAT_TEXTS.prayerNames.Isha as any)[lang] || 'Isha',
        icon: Moon,
        time: prayerData.isha,
        iconColor: 'text-indigo-400',
        rakatsSummary: lang === 'bn' ? '৪ ফরজ, ২ সুন্নাত, ২ নফল, ৩ বিতর' : lang === 'ar' ? '٤ فرض، ٢ سنة، ٢ نفل، ٣ وتر' : '4 Fard, 2 Sunnah, 2 Nafl, 3 Witr',
        totalRakats: '17',
        virtue: lang === 'bn'
          ? 'যে ব্যক্তি জামাতের সাথে এশা ও ফজর পড়ল, সে যেন সারা রাত সালাত আদায় করল। (মুসলিম ৬৫৬)'
          : lang === 'ar'
          ? 'من صلى العشاء في جماعة فكأنما قام نصف الليل، ومن صلى الصبح في جماعة فكأنما صلى الليل كله. (مسلم ٦٥٦)'
          : 'Whoever prays Isha in congregation, it is as if he prayed for half the night; and whoever prays Fajr in congregation, as if he prayed all night. (Muslim 656)',
      },
    ];

    return configs.map((cfg) => {
      const fard = prayerData.fardPrayers.find((f) => f.id === cfg.id);
      const isActive = !!fard?.isActive;
      const isPast = fard ? now > fard.endDate && !isActive : false;
      return { ...cfg, fard, isActive, isPast };
    });
  }, [prayerData, lang, liveTick]);

  // Weather icon renderer
  const renderWeatherIcon = () => {
    const iconClass = 'w-4 h-4 text-amber-500';
    switch (liveWeather.icon) {
      case 'cloud-sun':
        return <CloudSun className={iconClass} />;
      case 'cloud':
        return <Cloud className={iconClass} />;
      case 'cloud-drizzle':
        return <CloudDrizzle className={iconClass} />;
      case 'cloud-rain':
        return <CloudRain className={iconClass} />;
      case 'cloud-lightning':
        return <CloudLightning className={iconClass} />;
      case 'cloud-snow':
        return <CloudSnow className={iconClass} />;
      default:
        return <Sun className={iconClass} />;
    }
  };

  const activePrayerNameLocalized = (SALAT_TEXTS.prayerNames as any)[activeFard.id]?.[lang] || activeFard.name;
  const nextPrayerNameLocalized = (SALAT_TEXTS.prayerNames as any)[prayerData.nextPrayerName]?.[lang] || prayerData.nextPrayerName;

  return (
    <div className="relative space-y-4 animate-in fade-in duration-300 max-w-xl mx-auto pb-24 px-2 select-none sm:select-auto">
      {/* 0. Serene Mosque Skyline Backdrop Silhouette */}
      <MosqueSkylineBackdrop />

      {locationNotice && (
        <div
          className={`relative z-20 px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-2 ${
            isDay
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-amber-500/15 border-amber-400/30 text-amber-200'
          }`}
        >
          <span>{locationNotice}</span>
          <button
            type="button"
            onClick={() => setLocationNotice(null)}
            className="text-xs font-bold opacity-70 hover:opacity-100 cursor-pointer shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. Top Bar: Greeting, Hijri & Gregorian Dates, Weather Badge */}
      <div className="relative z-10 flex items-start justify-between gap-3 pt-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-500 text-sm">✦</span>
            <h1 className="text-xl sm:text-2xl font-black text-[#004d35] dark:text-emerald-100 tracking-tight leading-tight">
              {hijriGregorian.greeting}
            </h1>
          </div>
          <p className="text-xs sm:text-[13px] font-semibold text-slate-600 dark:text-emerald-300/80 leading-relaxed mt-0.5">
            {hijriGregorian.hijri}
          </p>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {hijriGregorian.gregorian}
          </p>
        </div>

        {/* Live Weather Widget */}
        <button
          type="button"
          onClick={() => {
            soundHaptics.playTap();
            updateWeatherForLocation(selectedCity.lat, selectedCity.lng, selectedCity.name);
          }}
          className="shrink-0 flex items-center gap-2 p-2 px-3 rounded-2xl bg-white/90 dark:bg-[#0a2822]/90 border border-slate-200/90 dark:border-emerald-800/60 shadow-xs backdrop-blur-md transition hover:border-emerald-500 active:scale-95 cursor-pointer"
          title={`${liveWeather.locationName} Weather • Tap to refresh`}
        >
          <div className="relative flex items-center justify-center">
            {renderWeatherIcon()}
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse border border-white dark:border-[#0a2822]" />
          </div>
          <div className="text-right">
            <div className="text-xs font-black text-slate-800 dark:text-white leading-none font-mono">
              {formatLocalizedNumber(liveWeather.temp, lang)}°C
            </div>
            <div className="text-[10px] font-bold text-slate-500 dark:text-emerald-300/70 leading-none mt-0.5 truncate max-w-[85px]">
              {liveWeather.condition}
            </div>
          </div>
        </button>
      </div>

      {/* 2. Location Bar with City & GPS Auto Detect */}
      <div className="relative z-10 flex items-center justify-between p-2.5 px-3.5 rounded-2xl bg-white dark:bg-[#0a2721] border border-slate-200/90 dark:border-emerald-800/50 shadow-xs">
        <button
          type="button"
          onClick={() => {
            setShowSettingsDrawer(true);
            if (soundEnabled) soundHaptics.playTap();
          }}
          className="flex items-center gap-2 min-w-0 cursor-pointer text-left hover:text-emerald-600 transition"
        >
          <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-emerald-100 truncate">
            {selectedCity.name}, {selectedCity.country}
          </span>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 hidden xs:inline">
            ({(SALAT_TEXTS.tracker.changeCity as any)[lang] || 'Change'})
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isLocating}
            className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 transition cursor-pointer active:scale-95"
            title="Auto detect location via GPS"
          >
            <Radio className={`w-3 h-3 ${isLocating ? 'animate-spin' : 'animate-pulse'}`} />
            <span>{isLocating ? '...' : (SALAT_TEXTS.qibla.autoGps as any)[lang] || 'GPS'}</span>
          </button>
        </div>
      </div>

      {/* 3. 2 Modern Segmented Tabs: Prayers | Qibla */}
      <div className="relative z-10 p-1.5 rounded-2xl bg-[#e3eae6] dark:bg-[#08201b] border border-slate-200/90 dark:border-emerald-900/50 grid grid-cols-2 gap-1 shadow-inner">
        <button
          onClick={() => {
            setSalatSubTab('prayers');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-extrabold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer ${
            salatSubTab === 'prayers'
              ? 'bg-[#004d35] text-white shadow-md shadow-emerald-950/20 scale-[1.01]'
              : 'text-slate-700 dark:text-emerald-200/70 hover:text-emerald-900 dark:hover:text-white'
          }`}
        >
          <span>🕌</span>
          <span className="truncate">{(SALAT_TEXTS.tabs.prayers as any)[lang] || 'Prayers'}</span>
        </button>

        <button
          onClick={() => {
            setSalatSubTab('qibla');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-extrabold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer ${
            salatSubTab === 'qibla'
              ? 'bg-[#004d35] text-white shadow-md shadow-emerald-950/20 scale-[1.01]'
              : 'text-slate-700 dark:text-emerald-200/70 hover:text-emerald-900 dark:hover:text-white'
          }`}
        >
          <span>🧭</span>
          <span className="truncate">{(SALAT_TEXTS.tabs.qibla as any)[lang] || 'Qibla'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PRAYERS (Unified Arc & Active Waqt Card + 5 Prayer Cards + Prohibited Times) */}
      {/* ========================================================================= */}
      {salatSubTab === 'prayers' && (
        <div className="relative z-10 space-y-3.5 animate-in fade-in duration-200">
          {/* Unified Curved Salat Time, Active Waqt & Daily Amal Horizon Arc Card */}
          <SalatAmalArcCard
            prayerData={prayerData}
            themeMode={themeMode}
            selectedLanguage={lang}
            soundEnabled={soundEnabled}
            liveTick={liveTick}
            completedPrayers={completedPrayers}
            onSyncPrayerCompleted={syncPrayerCompletedFromArc}
            onOpenPrayerDetails={(waqtKey) => {
              const found = fiveDailyPrayers.find((p) => p.id === waqtKey);
              if (found) setSelectedQuickPrayer(found);
            }}
            activePrayerName={activePrayerNameLocalized}
            liveCountdownStr={liveCountdownStr}
            activeWaqtProgress={activeWaqtProgress}
            activeTimeRange={activeFard.timeRange}
            nextPrayerLabel={`${(SALAT_TEXTS.hero.nextPrayerPrefix as any)[lang] || 'Next'}: ${nextPrayerNameLocalized} ${formatLocalizedNumber(prayerData.nextPrayerFormattedTime, lang)}`}
            remainingLabel={(SALAT_TEXTS.hero.remaining as any)[lang] || 'remaining'}
            isPlayingAdhan={isPlayingAdhan}
            playAdhanLabel={(SALAT_TEXTS.hero.playAdhan as any)[lang] || 'Play Adhan'}
            playingAdhanLabel={(SALAT_TEXTS.hero.playingAdhan as any)[lang] || 'Playing Adhan'}
            onTogglePlayAdhan={() => togglePlayAdhan(`${activePrayerNameLocalized} Adhan`)}
          />

          {/* 5 Daily Prayers Cards Row */}
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
                      ? 'bg-[#004d35] text-white border-2 border-emerald-400 ring-4 ring-emerald-400/20 shadow-xl scale-[1.03] z-10'
                      : prayer.isPast
                      ? 'bg-[#f4f7f5] dark:bg-[#071f19] border-slate-200/90 dark:border-emerald-900/40 text-slate-700 dark:text-emerald-200 hover:border-emerald-400'
                      : 'bg-white dark:bg-[#0a2922] border-slate-200/90 dark:border-emerald-900/40 text-slate-800 dark:text-white hover:border-emerald-400 shadow-xs'
                  }`}
                  title={`${prayer.name} details & rakats`}
                >
                  <div className="mb-1">
                    <IconComp className={`w-5 h-5 ${prayer.isActive ? 'text-amber-300 animate-bounce-subtle' : prayer.iconColor}`} />
                  </div>

                  <div className="text-xs sm:text-sm font-black mb-0.5 truncate w-full">
                    {prayer.name}
                  </div>

                  <div className={`text-[11px] sm:text-xs font-mono font-bold mb-1.5 ${prayer.isActive ? 'text-white' : 'text-slate-600 dark:text-emerald-300'}`}>
                    {formatLocalizedNumber(prayer.time, lang)}
                  </div>

                  <div className="w-full">
                    {prayer.isActive ? (
                      <span className="inline-block w-full text-[9px] sm:text-[10px] font-black py-0.5 rounded-md bg-emerald-500 text-white animate-pulse">
                        {(SALAT_TEXTS.status.active as any)[lang] || 'Active'}
                      </span>
                    ) : prayer.isPast ? (
                      <span className="inline-block w-full text-[9px] sm:text-[10px] font-extrabold py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-slate-500 dark:text-emerald-400">
                        {(SALAT_TEXTS.status.completed as any)[lang] || '✓ Done'}
                      </span>
                    ) : (
                      <span className="inline-block w-full text-[9px] sm:text-[10px] font-medium py-0.5 rounded-md bg-slate-100 dark:bg-black/30 text-slate-400">
                        {(SALAT_TEXTS.status.upcoming as any)[lang] || 'Upcoming'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prohibited / Makruh Prayer Times Section */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0a2721] border border-slate-200/90 dark:border-emerald-800/50 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 rounded-full bg-rose-500" />
              <h3 className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-400">
                {(SALAT_TEXTS.prohibited.sectionTitle as any)[lang] || 'Prohibited Prayer Times'}
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {(SALAT_TEXTS.prohibited.explanation as any)[lang] || 'No prayer is permitted during sunrise, exact solar noon, or sunset.'}
            </p>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {prayerData.prohibitedPrayers.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/30 text-center flex flex-col justify-between"
                >
                  <div className="flex items-center justify-center text-rose-500 mb-1">
                    {item.iconType === 'sunrise' && <SunriseIcon className="w-4 h-4 text-amber-500" />}
                    {item.iconType === 'noon' && <Sun className="w-4 h-4 text-orange-500" />}
                    {item.iconType === 'sunset' && <SunsetIcon className="w-4 h-4 text-rose-500" />}
                  </div>
                  <div className="font-bold text-xs text-slate-800 dark:text-rose-200 my-1 truncate">
                    {(SALAT_TEXTS.prayerNames as any)[item.name]?.[lang] || item.name}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-rose-600 dark:text-rose-300">
                    {formatLocalizedNumber(item.timeRange, lang)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: QIBLA COMPASS (Interactive 360 Watch Dial, Bearing & Distance)     */}
      {/* ========================================================================= */}
      {salatSubTab === 'qibla' && (
        <div className="relative z-10 space-y-4 animate-in fade-in duration-200">
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0a2721] border border-slate-200/90 dark:border-emerald-800/50 shadow-md text-center flex flex-col items-center justify-center space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {(SALAT_TEXTS.qibla.title as any)[lang] || 'Holy Kaaba Direction'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-emerald-300/70 mt-0.5">
                {(SALAT_TEXTS.qibla.turnDevice as any)[lang] || 'Rotate device to align with Holy Kaaba'}
              </p>
            </div>

            {/* Circular 360-Degree Watch Dial Compass */}
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center my-2 select-none">
              <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
                <circle cx="80" cy="80" r="76" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
                <circle cx="80" cy="80" r="70" className="fill-[#f8faf9] dark:fill-[#061d18] stroke-[#e2e8f0] dark:stroke-emerald-800/50" strokeWidth="3" />

                {/* 24 Angle ticks */}
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

                {/* Center Rosette */}
                <g opacity="0.15" className="fill-emerald-800 dark:fill-emerald-400">
                  <polygon points="80,68 83,77 92,80 83,83 80,92 77,83 68,80 77,77" />
                  <polygon points="80,68 83,77 92,80 83,83 80,92 77,83 68,80 77,77" transform="rotate(45 80 80)" />
                </g>

                {/* Cardinal Points */}
                <polygon points="80,10 76,16 84,16" fill="#00875a" />
                <text x="80" y="27" textAnchor="middle" className="text-[11px] font-black fill-[#00875a] font-mono">N</text>
                <text x="144" y="84" textAnchor="middle" className="text-[10px] font-bold fill-slate-400 dark:fill-emerald-300/60 font-mono">E</text>
                <text x="80" y="145" textAnchor="middle" className="text-[10px] font-bold fill-slate-400 dark:fill-emerald-300/60 font-mono">S</text>
                <text x="16" y="84" textAnchor="middle" className="text-[10px] font-bold fill-slate-400 dark:fill-emerald-300/60 font-mono">W</text>

                {/* Rotating Compass Needle pointing toward Qibla */}
                <g transform={`rotate(${effectiveCompassAngle} 80 80)`} className="transition-transform duration-500 ease-out">
                  <polygon points="80,24 86,76 80,71 74,76" fill={isFacingKaaba ? '#eab308' : '#00a36c'} />
                  <polygon points="80,24 86,76 80,71" fill={isFacingKaaba ? '#ca8a04' : '#059669'} />
                  <polygon points="80,24 74,76 80,71" fill={isFacingKaaba ? '#facc15' : '#10b981'} />
                  <polygon points="80,136 86,84 80,89 74,84" fill="#94a3b8" opacity="0.8" />
                </g>

                {/* Brass Pivot */}
                <circle cx="80" cy="80" r="7" fill="#004d35" />
                <circle cx="80" cy="80" r="4.5" fill={isFacingKaaba ? '#facc15' : '#f59e0b'} />
                <circle cx="80" cy="80" r="2" fill="#ffffff" />

                {/* Kaaba marker on the dial */}
                <foreignObject x={kaabaDialX - 14} y={kaabaDialY - 14} width="28" height="28" className="overflow-visible pointer-events-none">
                  <div className={`w-7 h-7 transform transition-transform ${isFacingKaaba ? 'scale-125 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' : ''}`}>
                    <Kaaba3DIcon className="w-7 h-7" />
                  </div>
                </foreignObject>
              </svg>
            </div>

            {/* Alignment Banner */}
            <div className={`px-4 py-2 rounded-2xl border text-xs font-bold transition-all ${
              isFacingKaaba
                ? 'bg-amber-400/20 text-amber-800 dark:text-amber-200 border-amber-400/60 shadow-sm scale-105 animate-pulse'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-500/30'
            }`}>
              {isFacingKaaba
                ? (SALAT_TEXTS.qibla.facingKaaba as any)[lang] || '✨ Facing directly towards the Holy Kaaba!'
                : (SALAT_TEXTS.qibla.turnDevice as any)[lang] || 'Rotate device until arrow aligns with Kaaba'}
            </div>

            {/* Kaaba Bearing & Distance Stat Row */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#071f1a] border border-slate-200/80 dark:border-emerald-900/40 text-center">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {(SALAT_TEXTS.qibla.degreeFromNorth as any)[lang] || 'Degrees from North'}
                </div>
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {formatLocalizedNumber(qiblaDeg, lang)}°
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {prayerData.qiblaCardinal}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#071f1a] border border-slate-200/80 dark:border-emerald-900/40 text-center">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {(SALAT_TEXTS.qibla.distanceKm as any)[lang] || 'Distance to Holy Makkah'}
                </div>
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {formatLocalizedNumber(prayerData.kaabaDistanceKm, lang)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  KM (Kilometers)
                </div>
              </div>
            </div>

            {/* Device Gyro Calibration Notice */}
            <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5 pt-1">
              <Radio className="w-3.5 h-3.5 text-emerald-500" />
              <span>{hasCompassSensor ? (SALAT_TEXTS.qibla.sensorCalibrated as any)[lang] || 'Gyro sensor calibrated' : 'Sensor simulation active'}</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* QUICK PRAYER DETAILS MODAL (Rakats, Hadiths, Virtues)                     */}
      {/* ========================================================================= */}
      {selectedQuickPrayer && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#092226] border border-slate-200 dark:border-emerald-800/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-100 dark:border-emerald-900/40 flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    {selectedQuickPrayer.name} • {(SALAT_TEXTS.modal.detailsTitle as any)[lang] || 'Prayer Details'}
                  </h3>
                  <p className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatLocalizedNumber(selectedQuickPrayer.time, lang)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedQuickPrayer(null)}
                className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-emerald-900/60 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* Rakats Breakdown */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#071f1a] border border-slate-200/80 dark:border-emerald-900/40 space-y-1">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {(SALAT_TEXTS.modal.totalRakats as any)[lang] || 'Total Rak’ats'}: {formatLocalizedNumber(selectedQuickPrayer.totalRakats, lang)}
                </div>
                <div className="text-sm font-black text-emerald-700 dark:text-emerald-300">
                  {selectedQuickPrayer.rakatsSummary}
                </div>
              </div>

              {/* Hadith & Virtue */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>{(SALAT_TEXTS.modal.virtueTitle as any)[lang] || 'Spiritual Virtue & Reward'}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed italic">
                  "{selectedQuickPrayer.virtue}"
                </p>
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 dark:border-emerald-900/40 text-center">
              <button
                onClick={() => setSelectedQuickPrayer(null)}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-sm transition"
              >
                {(SALAT_TEXTS.modal.close as any)[lang] || 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CITY SELECTION DRAWER                                                     */}
      {/* ========================================================================= */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#092226] border border-slate-200 dark:border-emerald-800/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-100 dark:border-emerald-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                  {(SALAT_TEXTS.tracker.changeCity as any)[lang] || 'Select City'}
                </h3>
              </div>
              <button
                onClick={() => setShowSettingsDrawer(false)}
                className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-emerald-900/60 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* City Search Bar */}
            <div className="p-3 border-b border-slate-100 dark:border-emerald-900/40">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder={lang === 'bn' ? 'শহরের নাম লিখুন...' : 'Search city or country...'}
                  value={citySearchQuery}
                  onChange={(e) => setCitySearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-emerald-900/60 bg-slate-50 dark:bg-[#071f1a] text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Popular Cities List */}
            <div className="overflow-y-auto p-2 space-y-1">
              {POPULAR_CITIES.filter((c) =>
                c.name.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
                c.country.toLowerCase().includes(citySearchQuery.toLowerCase())
              ).map((city) => {
                const isSelected = selectedCity.name === city.name;
                return (
                  <button
                    key={`${city.name}-${city.country}`}
                    onClick={() => {
                      setSelectedCity(city);
                      updateWeatherForLocation(city.lat, city.lng, city.name);
                      setShowSettingsDrawer(false);
                      if (soundEnabled) soundHaptics.playMilestone();
                    }}
                    className={`w-full p-3 rounded-xl text-left flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-emerald-950/40 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{city.name}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {city.country}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
