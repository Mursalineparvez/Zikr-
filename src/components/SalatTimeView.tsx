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

// Atmospheric Serene Top Backdrop Wash (the detailed Mosque Skyline now lives inside the Hero Arc Card)
export const MosqueSkylineBackdrop: React.FC = () => (
  <div className="absolute top-0 left-0 right-0 h-36 overflow-hidden pointer-events-none select-none z-0">
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[115%] h-40 rounded-full bg-gradient-to-b from-emerald-400/15 via-emerald-200/8 to-transparent dark:from-emerald-500/12 dark:via-emerald-900/10 blur-2xl" />
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

  // Interactive Qibla Compass Modal state
  const [showQiblaModal, setShowQiblaModal] = useState<boolean>(false);
  const [liveTick, setLiveTick] = useState<number>(0);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState<boolean>(false);
  const [selectedQuickPrayer, setSelectedQuickPrayer] = useState<any | null>(null);
  const [locationNotice, setLocationNotice] = useState<string | null>(null);

  // Register Salat overlays for step-by-step reverse back navigation
  useBackLayer(showQiblaModal, () => setShowQiblaModal(false), 'salat-qibla');
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

    if (showQiblaModal) {
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
  }, [showQiblaModal]);

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

  const getProhibitedMeta = (iconType: string, fallbackName: string) => {
    if (iconType === 'sunrise') {
      return {
        title: lang === 'bn' ? 'সূর্যোদয়' : lang === 'ar' ? 'الشروق' : 'Sunrise',
        subtitle: lang === 'bn' ? 'ইশরাকের পূর্বে' : lang === 'ar' ? 'قبل الإشراق' : 'Before Ishraq',
      };
    }
    if (iconType === 'noon') {
      return {
        title: lang === 'bn' ? 'দ্বিপ্রহর' : lang === 'ar' ? 'الزوال' : 'Solar Noon',
        subtitle: lang === 'bn' ? 'ঠিক যাওয়াল' : lang === 'ar' ? 'وقت الاستواء' : 'Exact Zawal',
      };
    }
    if (iconType === 'sunset') {
      return {
        title: lang === 'bn' ? 'সূর্যাস্ত' : lang === 'ar' ? 'الغروب' : 'Sunset',
        subtitle: lang === 'bn' ? 'মাগরিবের পূর্বে' : lang === 'ar' ? 'قبل المغرب' : 'Before Maghrib',
      };
    }
    return {
      title: (SALAT_TEXTS.prayerNames as any)[fallbackName]?.[lang] || fallbackName,
      subtitle: '',
    };
  };

  const localizedQiblaCardinal = useMemo(() => {
    const code = (prayerData.qiblaCardinal || '').toUpperCase().trim();
    if (lang === 'bn') {
      const bnMap: Record<string, string> = {
        N: 'উত্তর',
        NNE: 'উত্তর-উত্তর-পূর্ব',
        NE: 'উত্তর-পূর্ব',
        ENE: 'পূর্ব-উত্তর-পূর্ব',
        E: 'পূর্ব',
        ESE: 'পূর্ব-দক্ষিণ-পূর্ব',
        SE: 'দক্ষিণ-পূর্ব',
        SSE: 'দক্ষিণ-দক্ষিণ-পূর্ব',
        S: 'দক্ষিণ',
        SSW: 'দক্ষিণ-দক্ষিণ-পশ্চিম',
        SW: 'দক্ষিণ-পশ্চিম',
        WSW: 'পশ্চিম-দক্ষিণ-পশ্চিম',
        W: 'পশ্চিম',
        WNW: 'পশ্চিম-উত্তর-পশ্চিম',
        NW: 'উত্তর-পশ্চিম',
        NNW: 'উত্তর-উত্তর-পশ্চিম',
      };
      return bnMap[code] || code;
    }
    if (lang === 'ar') {
      const arMap: Record<string, string> = {
        N: 'شمال',
        NE: 'شمال شرق',
        E: 'شرق',
        SE: 'جنوب شرق',
        S: 'جنوب',
        SW: 'جنوب غرب',
        W: 'غرب',
        NW: 'شمال غرب',
      };
      return arMap[code] || code;
    }
    return code;
  }, [prayerData.qiblaCardinal, lang]);

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

      {/* ========================================================================= */}
      {/* MAIN PRAYERS CONTENT (Arc Card + Location/Qibla Dock + 5 Prayer Cards)    */}
      {/* ========================================================================= */}
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

          {/* Location, Auto GPS & Qibla Compass Control Dock (directly below Hero Arc Card) */}
          <div className="relative overflow-hidden rounded-[22px] bg-white/95 dark:bg-[#08221c] border border-emerald-900/10 dark:border-emerald-700/40 shadow-[0_6px_22px_-10px_rgba(4,59,44,0.16)] dark:shadow-[0_10px_28px_-12px_rgba(0,0,0,0.45)] p-2.5 sm:p-3">
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 dark:via-amber-300/35 to-transparent" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              {/* Left: Tappable Current Location Selector */}
              <button
                type="button"
                onClick={() => {
                  setShowSettingsDrawer(true);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className="min-h-[44px] flex items-center gap-2.5 min-w-0 flex-1 text-left rounded-xl px-1.5 py-1 hover:bg-emerald-50/75 dark:hover:bg-emerald-900/30 transition-colors cursor-pointer group"
                title={lang === 'bn' ? 'শহর পরিবর্তন করুন' : 'Change city'}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/90 dark:from-emerald-900/60 dark:to-emerald-950/90 border border-emerald-200/75 dark:border-emerald-700/45 flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 dark:text-emerald-300/70 leading-none">
                    <span>
                      {lang === 'bn' ? 'বর্তমান অবস্থান' : lang === 'ar' ? 'الموقع الحالي' : 'Current Location'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 dark:text-amber-300/90">
                      {lang === 'bn' ? 'পরিবর্তন' : lang === 'ar' ? 'تغيير' : 'Change'}
                    </span>
                  </div>
                  <div className="text-xs sm:text-[13.5px] font-black text-slate-900 dark:text-emerald-50 truncate mt-1 leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-200 transition-colors">
                    {selectedCity.name}, {selectedCity.country}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-emerald-400/70 shrink-0 sm:hidden" />
              </button>

              {/* Right: Auto GPS & Qibla Compass Action Buttons */}
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isLocating}
                  className="min-h-[44px] sm:min-h-[40px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50/90 hover:bg-emerald-100/90 dark:bg-emerald-900/40 dark:hover:bg-emerald-800/55 border border-emerald-200/80 dark:border-emerald-700/45 text-emerald-800 dark:text-emerald-200 text-xs font-bold whitespace-nowrap transition-all active:scale-95 cursor-pointer disabled:opacity-60"
                  title="Auto detect location via GPS"
                >
                  <Radio className={`w-3.5 h-3.5 shrink-0 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>
                    {isLocating
                      ? lang === 'bn'
                        ? 'খুঁজছে...'
                        : '...'
                      : (SALAT_TEXTS.qibla.autoGps as any)[lang] || 'GPS'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowQiblaModal(true);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className="min-h-[44px] sm:min-h-[40px] flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-br from-[#064e3b] via-[#055f47] to-[#047857] hover:brightness-105 text-white border border-amber-400/35 shadow-sm shadow-emerald-950/20 text-xs font-extrabold whitespace-nowrap transition-all active:scale-95 cursor-pointer tabular-nums"
                  title={(SALAT_TEXTS.qibla.title as any)[lang] || 'Qibla Compass'}
                >
                  <Compass className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{lang === 'bn' ? 'কিবলা' : lang === 'ar' ? 'القبلة' : 'Qibla'}</span>
                  <span className="font-mono text-[11px] font-black text-amber-200 border-l border-white/20 pl-1.5 leading-none">
                    {formatLocalizedNumber(qiblaDeg, lang)}°
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 5 Daily Prayers Cards Row — Elevated Atmospheric Waqt Strip */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
            {fiveDailyPrayers.map((prayer) => {
              const IconComp = prayer.icon;
              const isPrayed = !!completedPrayers[prayer.id];

              const iconHaloClass = prayer.isActive
                ? 'bg-white/12 border border-amber-300/35 text-amber-300 shadow-inner'
                : prayer.id === 'Fajr'
                ? 'bg-amber-50 dark:bg-amber-500/10 border border-amber-200/70 dark:border-amber-400/20'
                : prayer.id === 'Dhuhr'
                ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/70 dark:border-emerald-400/20'
                : prayer.id === 'Asr'
                ? 'bg-orange-50 dark:bg-orange-500/10 border border-orange-200/70 dark:border-orange-400/20'
                : prayer.id === 'Maghrib'
                ? 'bg-rose-50 dark:bg-rose-500/10 border border-rose-200/70 dark:border-rose-400/20'
                : 'bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/70 dark:border-indigo-400/20';

              return (
                <button
                  type="button"
                  key={prayer.id}
                  onClick={() => {
                    setSelectedQuickPrayer(prayer);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`group relative overflow-hidden p-2 sm:p-3 rounded-[20px] transition-all duration-200 text-center flex flex-col items-center justify-between cursor-pointer active:scale-[0.97] ${
                    prayer.isActive
                      ? 'bg-gradient-to-b from-[#044b36] via-[#065f45] to-[#043b2a] text-white border border-amber-300/45 shadow-[0_12px_26px_-10px_rgba(4,75,54,0.65)] z-10'
                      : prayer.isPast
                      ? 'bg-white/85 dark:bg-[#08211b]/90 border border-emerald-900/10 dark:border-emerald-800/40 text-slate-800 dark:text-emerald-100 hover:border-emerald-400/70 hover:bg-white dark:hover:bg-[#0b2b23] shadow-[0_2px_10px_-6px_rgba(4,59,44,0.12)]'
                      : 'bg-white dark:bg-[#0a2922] border border-emerald-900/10 dark:border-emerald-800/50 text-slate-900 dark:text-white hover:border-emerald-400 shadow-[0_3px_12px_-6px_rgba(4,59,44,0.14)]'
                  }`}
                  title={`${prayer.name} details & rakats`}
                >
                  {/* Active Waqt Golden Crown Highlight & Subtle Top Glow */}
                  {prayer.isActive && (
                    <>
                      <span className="pointer-events-none absolute top-0 inset-x-3 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                      <span className="pointer-events-none absolute -top-5 inset-x-0 h-12 bg-amber-300/20 blur-xl" />
                    </>
                  )}

                  {/* Icon in Soft Atmospheric Halo */}
                  <div
                    className={`relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mb-1.5 transition-transform duration-200 group-hover:scale-105 ${iconHaloClass}`}
                  >
                    <IconComp
                      className={`w-4 h-4 sm:w-[18px] sm:h-[18px] ${
                        prayer.isActive ? 'text-amber-300' : prayer.iconColor
                      }`}
                    />
                  </div>

                  {/* Prayer Name */}
                  <div
                    className={`relative z-10 text-xs sm:text-[13.5px] font-black tracking-tight leading-tight truncate w-full ${
                      prayer.isActive ? 'text-white' : 'text-slate-800 dark:text-emerald-50'
                    }`}
                  >
                    {prayer.name}
                  </div>

                  {/* Tabular Start Time */}
                  <div
                    className={`relative z-10 text-[10.5px] sm:text-[11.5px] font-mono tabular-nums font-bold mt-0.5 mb-2 ${
                      prayer.isActive
                        ? 'text-amber-200'
                        : prayer.isPast
                        ? 'text-slate-500 dark:text-emerald-300/75'
                        : 'text-emerald-800 dark:text-emerald-300'
                    }`}
                  >
                    {formatLocalizedNumber(prayer.time, lang)}
                  </div>

                  {/* Refined Status Footer (Clean, Uncluttered) */}
                  <div className="relative z-10 w-full flex items-center justify-center pt-1.5 border-t border-black/5 dark:border-white/10">
                    {prayer.isActive ? (
                      <span className="text-[9.5px] sm:text-[10px] font-black tracking-wide text-amber-300 leading-none">
                        {(SALAT_TEXTS.status.active as any)[lang] || 'Active'}
                      </span>
                    ) : isPrayed ? (
                      <span className="inline-flex items-center gap-0.5 text-[9.5px] sm:text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 leading-none">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                        <span>{lang === 'bn' ? 'আদায়' : lang === 'ar' ? 'تم' : 'Prayed'}</span>
                      </span>
                    ) : prayer.isPast ? (
                      <span className="text-[9.5px] sm:text-[10px] font-bold text-slate-400 dark:text-emerald-400/65 leading-none">
                        {(SALAT_TEXTS.status.completed as any)[lang] || '✓ Done'}
                      </span>
                    ) : (
                      <span className="text-[9.5px] sm:text-[10px] font-semibold text-emerald-700/75 dark:text-emerald-300/70 leading-none">
                        {(SALAT_TEXTS.status.upcoming as any)[lang] || 'Upcoming'}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Prohibited / Makruh Prayer Times Section — Clean Architectural Strip */}
          <div className="relative overflow-hidden rounded-[24px] bg-white/95 dark:bg-[#08221c] border border-rose-200/75 dark:border-rose-900/45 shadow-[0_6px_22px_-12px_rgba(190,18,60,0.14)] dark:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.5)]">
            {/* Delicate Solar-Warning Top Hairline Gradient */}
            <div className="h-[2.5px] w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 opacity-85" />

            {/* Header */}
            <div className="px-4 pt-3.5 pb-3 sm:px-5 sm:pt-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-50 to-amber-50 dark:from-rose-950/60 dark:to-amber-950/40 border border-rose-200/75 dark:border-rose-800/45 flex items-center justify-center shrink-0 mt-0.5">
                <Sun className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-[15px] font-black text-rose-700 dark:text-rose-300 leading-snug">
                  {(SALAT_TEXTS.prohibited.sectionTitle as any)[lang] || 'Prohibited Prayer Times'}
                </h3>
                <p className="text-[11px] font-medium text-slate-500 dark:text-emerald-200/65 leading-relaxed mt-0.5">
                  {(SALAT_TEXTS.prohibited.explanation as any)[lang] || 'No prayer is permitted during sunrise, exact solar noon, or sunset.'}
                </p>
              </div>
            </div>

            {/* Unified 3-Column Tonal Strip (Zero nested-box clutter) */}
            <div className="grid grid-cols-3 divide-x divide-rose-200/60 dark:divide-rose-900/40 border-t border-rose-100/90 dark:border-rose-900/35 bg-gradient-to-b from-rose-50/45 via-amber-50/20 to-transparent dark:from-rose-950/25 dark:via-transparent dark:to-transparent">
              {prayerData.prohibitedPrayers.map((item) => {
                const meta = getProhibitedMeta(item.iconType, item.name);
                const haloTone =
                  item.iconType === 'sunrise'
                    ? 'bg-amber-100/80 dark:bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-200/80 dark:border-amber-400/25'
                    : item.iconType === 'noon'
                    ? 'bg-orange-100/80 dark:bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-200/80 dark:border-orange-400/25'
                    : 'bg-rose-100/80 dark:bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-200/80 dark:border-rose-400/25';

                return (
                  <div
                    key={item.id}
                    className="py-3.5 px-2 sm:px-3 text-center flex flex-col items-center justify-center"
                  >
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center mb-1.5 ${haloTone}`}
                    >
                      {item.iconType === 'sunrise' && <SunriseIcon className="w-4 h-4" />}
                      {item.iconType === 'noon' && <Sun className="w-4 h-4" />}
                      {item.iconType === 'sunset' && <SunsetIcon className="w-4 h-4" />}
                    </div>

                    <div className="font-black text-xs sm:text-[13px] text-slate-800 dark:text-rose-100 leading-tight truncate w-full">
                      {meta.title}
                    </div>

                    {meta.subtitle && (
                      <div className="text-[10px] font-medium text-slate-500 dark:text-rose-300/65 leading-tight mt-0.5 truncate w-full">
                        {meta.subtitle}
                      </div>
                    )}

                    <div className="text-[11px] sm:text-xs font-mono tabular-nums font-extrabold text-rose-600 dark:text-rose-300 mt-1.5 tracking-tight">
                      {formatLocalizedNumber(item.timeRange, lang)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Signature Interactive Qibla Compass Card */}
          <button
            type="button"
            onClick={() => {
              setShowQiblaModal(true);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className="w-full text-left group relative overflow-hidden p-4 sm:p-4.5 rounded-[24px] bg-gradient-to-br from-[#042d22] via-[#064635] to-[#085c45] border border-amber-400/30 text-white shadow-[0_14px_30px_-14px_rgba(4,45,34,0.65)] hover:shadow-[0_18px_36px_-14px_rgba(4,45,34,0.75)] transition-all duration-200 active:scale-[0.99] cursor-pointer flex items-center justify-between gap-3.5 sm:gap-4"
          >
            {/* Top Golden Hairline Highlight */}
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />

            {/* Subtle Islamic Geometric Star Ornament (Right Background) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 160 160"
              className="pointer-events-none absolute -right-6 -top-8 w-40 h-40 text-amber-300 opacity-[0.08]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <circle cx="80" cy="80" r="64" strokeDasharray="3 4" />
              <polygon points="80,14 98,62 146,80 98,98 80,146 62,98 14,80 62,62" />
              <polygon points="80,26 118,42 134,80 118,118 80,134 42,118 26,80 42,42" />
              <circle cx="80" cy="80" r="26" />
            </svg>

            {/* Warm Radial Ambient Glow */}
            <div className="pointer-events-none absolute -left-8 -bottom-10 w-36 h-36 rounded-full bg-emerald-400/15 blur-2xl" />

            {/* Left: Precision Brass-Gold Mini Compass Dial */}
            <div className="relative w-16 h-16 sm:w-[70px] sm:h-[70px] shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 88 88" className="w-full h-full drop-shadow-md">
                <defs>
                  <linearGradient id="qiblaGoldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fde68a" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Outer Brushed Gold Bezel */}
                <circle cx="44" cy="44" r="40" fill="rgba(3,23,18,0.88)" stroke="url(#qiblaGoldRing)" strokeWidth="2" />
                {/* Inner Precision Track */}
                <circle cx="44" cy="44" r="33" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeDasharray="1.5 3.5" />
                {/* Cardinal Micro-Markers */}
                <text x="44" y="16" textAnchor="middle" className="text-[7px] font-black fill-amber-300 font-mono">N</text>
                <text x="73" y="46.5" textAnchor="middle" className="text-[6px] font-bold fill-emerald-200/55 font-mono">E</text>
                <text x="44" y="76" textAnchor="middle" className="text-[6px] font-bold fill-emerald-200/55 font-mono">S</text>
                <text x="15" y="46.5" textAnchor="middle" className="text-[6px] font-bold fill-emerald-200/55 font-mono">W</text>
                {/* Live Qibla Needle */}
                <g transform={`rotate(${qiblaDeg} 44 44)`}>
                  <polygon points="44,16 48.5,44 44,39 39.5,44" fill="#fbbf24" />
                  <polygon points="44,70 47.5,44 44,48 40.5,44" fill="rgba(255,255,255,0.28)" />
                </g>
                {/* Center Brass Pivot */}
                <circle cx="44" cy="44" r="4.5" fill="#042d22" stroke="#fde68a" strokeWidth="1.75" />
                <circle cx="44" cy="44" r="1.5" fill="#fbbf24" />
              </svg>
            </div>

            {/* Center: Localized Bearing, Cardinal & Makkah Distance */}
            <div className="flex-1 min-w-0 relative z-10">
              <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-amber-300/95 leading-none">
                <span>{(SALAT_TEXTS.tabs.qibla as any)[lang] || 'Qibla Compass'}</span>
                <span aria-hidden="true" className="opacity-45">·</span>
                <span className="text-emerald-200/80 font-semibold">
                  {lang === 'bn' ? '৩৬০° লাইভ' : lang === 'ar' ? '٣٦٠° مباشر' : '360° Live'}
                </span>
              </div>

              <div className="text-[15px] sm:text-base font-black text-white leading-snug mt-1 truncate">
                {(SALAT_TEXTS.qibla.title as any)[lang] || 'Holy Kaaba Direction'}
              </div>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1.5 text-[11.5px] font-bold text-emerald-100/90 tabular-nums">
                <span className="font-mono text-amber-300 font-black">
                  {formatLocalizedNumber(qiblaDeg, lang)}° {localizedQiblaCardinal}
                </span>
                <span aria-hidden="true" className="opacity-35">·</span>
                <span className="font-mono text-emerald-100/90">
                  {formatLocalizedNumber(prayerData.kaabaDistanceKm, lang)}{' '}
                  {lang === 'bn' ? 'কিমি (মক্কা)' : lang === 'ar' ? 'كم إلى مكة' : 'km to Makkah'}
                </span>
              </div>
            </div>

            {/* Right: Tactile Gold Disclosure Cue */}
            <div className="relative z-10 shrink-0 w-10 h-10 rounded-full bg-amber-400/15 border border-amber-300/35 group-hover:bg-amber-400 group-hover:text-emerald-950 text-amber-300 flex items-center justify-center transition-all duration-200">
              <ChevronRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </div>
          </button>
        </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE 360° QIBLA COMPASS MODAL                                      */}
      {/* ========================================================================= */}
      {showQiblaModal && (
        <div
          className="fixed inset-0 z-50 w-full h-[100dvh] bg-white dark:bg-[#0a2721] flex flex-col overflow-hidden animate-in fade-in"
        >
          <div className="w-full h-full flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-4 py-3.5 sm:px-6 border-b border-slate-100 dark:border-emerald-900/50 flex items-center justify-between bg-emerald-50/60 dark:bg-emerald-950/40 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate">
                    {(SALAT_TEXTS.qibla.title as any)[lang] || 'Holy Kaaba Direction'}
                  </h2>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-emerald-300/75 truncate">
                    {selectedCity.name}, {selectedCity.country}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowQiblaModal(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-200/80 dark:hover:bg-emerald-900/60 text-slate-500 dark:text-emerald-200 cursor-pointer transition shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-center flex flex-col items-center justify-center space-y-5">
              {/* Circular 360-Degree Watch Dial Compass */}
              <div className="relative w-52 h-52 sm:w-56 sm:h-56 flex items-center justify-center select-none">
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
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#071f1a] border border-slate-200/80 dark:border-emerald-900/40 text-center tabular-nums">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    {(SALAT_TEXTS.qibla.degreeFromNorth as any)[lang] || 'Degrees from North'}
                  </div>
                  <div className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {formatLocalizedNumber(qiblaDeg, lang)}°
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {prayerData.qiblaCardinal}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#071f1a] border border-slate-200/80 dark:border-emerald-900/40 text-center tabular-nums">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    {(SALAT_TEXTS.qibla.distanceKm as any)[lang] || 'Distance to Holy Makkah'}
                  </div>
                  <div className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {formatLocalizedNumber(prayerData.kaabaDistanceKm, lang)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    KM
                  </div>
                </div>
              </div>

              {/* Device Gyro Calibration Notice */}
              <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-500" />
                <span>{hasCompassSensor ? (SALAT_TEXTS.qibla.sensorCalibrated as any)[lang] || 'Gyro sensor calibrated' : 'Sensor simulation active'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* QUICK PRAYER DETAILS MODAL (Rakats, Hadiths, Virtues)                     */}
      {/* ========================================================================= */}
      {selectedQuickPrayer && (
        <div className="fixed inset-0 z-50 w-full h-[100dvh] bg-white dark:bg-[#092226] flex flex-col overflow-hidden animate-in fade-in">
          <div className="w-full h-full flex flex-col overflow-hidden">
            <div className="px-4 py-3.5 sm:px-6 border-b border-slate-100 dark:border-emerald-900/40 flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/40 shrink-0">
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
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-200 dark:hover:bg-emerald-900/60 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Rakats Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#071f1a] border border-slate-200/80 dark:border-emerald-900/40 space-y-1">
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
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
                  "{selectedQuickPrayer.virtue}"
                </p>
              </div>
            </div>

            <div className="px-4 py-3 sm:px-6 border-t border-slate-100 dark:border-emerald-900/40 text-center shrink-0">
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
        <div className="fixed inset-0 z-50 w-full h-[100dvh] bg-white dark:bg-[#092226] flex flex-col overflow-hidden animate-in fade-in">
          <div className="w-full h-full flex flex-col overflow-hidden">
            <div className="px-4 py-3.5 sm:px-6 border-b border-slate-100 dark:border-emerald-900/40 flex items-center justify-between shrink-0 bg-emerald-50/40 dark:bg-emerald-950/30">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                  {(SALAT_TEXTS.tracker.changeCity as any)[lang] || 'Select City'}
                </h3>
              </div>
              <button
                onClick={() => setShowSettingsDrawer(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-200 dark:hover:bg-emerald-900/60 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* City Search Bar */}
            <div className="px-4 py-3 sm:px-6 border-b border-slate-100 dark:border-emerald-900/40 shrink-0">
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
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-2 content-start">
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
