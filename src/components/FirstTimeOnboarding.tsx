/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  Sparkles,
  Languages,
  Globe,
  User,
  Palette,
  MapPin,
  Bell,
  BellOff,
  CheckCircle2,
  Check,
  ArrowRight,
  Compass,
  Map,
  MapPinOff,
  Info,
  X,
  RotateCcw,
  BookOpen,
  Clock,
  ShieldCheck,
  ListChecks,
  Infinity as InfinityIcon,
  PenLine,
  Search,
} from 'lucide-react';
import { AppTheme, ThemeMode, ZikrLanguage, ZikrItem } from '../types';
import { CityOption, POPULAR_CITIES } from '../utils/prayerTimes';
import { DEFAULT_ZIKRS } from '../utils/constants';
import { DEFAULT_AAMAL_ITEMS } from '../utils/aamalTrackerData';
import { AUTHENTIC_DUAS } from '../utils/duasData';
import { APP_LIGHT_THEMES, getLightThemePalette } from '../utils/appThemes';
import { soundHaptics } from '../utils/audioHaptics';
import { stepBackOr, useBackLayer } from '../utils/backNavigation';

export const ONBOARDING_STORAGE_KEY = 'zikr_onboarding_v1_completed';
export const TOUR_STORAGE_KEY = 'zikr_tour_v1_completed';

const EXTRA_BD_CITIES: CityOption[] = [
  { name: 'Rajshahi', country: 'Bangladesh', lat: 24.3745, lng: 88.6042 },
  { name: 'Khulna', country: 'Bangladesh', lat: 22.8456, lng: 89.5403 },
  { name: 'Barishal', country: 'Bangladesh', lat: 22.701, lng: 90.3535 },
  { name: 'Rangpur', country: 'Bangladesh', lat: 25.7439, lng: 89.2752 },
  { name: 'Mymensingh', country: 'Bangladesh', lat: 24.7471, lng: 90.4203 },
  { name: 'Cumilla', country: 'Bangladesh', lat: 23.4607, lng: 91.1809 },
  { name: "Cox's Bazar", country: 'Bangladesh', lat: 21.4272, lng: 92.0058 },
  { name: 'Gazipur', country: 'Bangladesh', lat: 23.9999, lng: 90.4203 },
  { name: 'Narayanganj', country: 'Bangladesh', lat: 23.6238, lng: 90.5 },
  { name: 'Bogura', country: 'Bangladesh', lat: 24.8465, lng: 89.3773 },
];

const ALL_ONBOARDING_CITIES: CityOption[] = (() => {
  const seen = new Set<string>();
  const combined = [...POPULAR_CITIES, ...EXTRA_BD_CITIES];
  return combined.filter((c) => {
    const key = `${c.name}-${c.country}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
})();

const findNearestCity = (lat: number, lng: number): CityOption => {
  let best = ALL_ONBOARDING_CITIES[0];
  let bestDist = Number.POSITIVE_INFINITY;
  for (const city of ALL_ONBOARDING_CITIES) {
    const dLat = city.lat - lat;
    const dLng = city.lng - lng;
    const dist = dLat * dLat + dLng * dLng;
    if (dist < bestDist) {
      bestDist = dist;
      best = city;
    }
  }
  return best;
};

const toBnDigits = (val: string | number) =>
  String(val).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

interface FirstTimeOnboardingProps {
  selectedLanguage: ZikrLanguage;
  onSelectLanguage: (lang: ZikrLanguage) => void;
  currentThemeMode: ThemeMode;
  currentAppTheme: AppTheme;
  onApplyTheme: (themeMode: ThemeMode, appTheme: AppTheme) => void;
  soundEnabled?: boolean;
  onComplete: (options: {
    startPreset: 'preset' | 'custom' | 'custom_270';
    gender: 'brother' | 'sister';
    notificationsEnabled: boolean;
    selectedCity: CityOption | null;
    customSelectedZikrs?: ZikrItem[];
  }) => void;
  onSignIn: () => void;
}

export const FirstTimeOnboarding: React.FC<FirstTimeOnboardingProps> = ({
  selectedLanguage,
  onSelectLanguage,
  currentThemeMode,
  currentAppTheme,
  onApplyTheme,
  soundEnabled = true,
  onComplete,
  onSignIn,
}) => {
  const [step, setStep] = useState<number>(0); // 0..6 (7 steps)
  const [gender, setGender] = useState<'brother' | 'sister'>('brother');
  const [selectedThemeId, setSelectedThemeId] = useState<AppTheme>(() =>
    getLightThemePalette(currentAppTheme).id
  );
  const [locationMode, setLocationMode] = useState<'gps' | 'manual' | 'skip'>('skip');
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsNotice, setGpsNotice] = useState<string | null>(null);
  const [citySearch, setCitySearch] = useState('');
  const [notificationsMode, setNotificationsMode] = useState<'enable' | 'later'>('later');
  const [startPreset, setStartPreset] = useState<'preset' | 'custom' | 'custom_270'>('preset');
  const [selectedCustomZikrs, setSelectedCustomZikrs] = useState<ZikrItem[]>(DEFAULT_ZIKRS);
  const [isDuaPickerOpen, setIsDuaPickerOpen] = useState(false);
  const [duaSearchQuery, setDuaSearchQuery] = useState('');

  const handleToggleDuaSelection = (dua: (typeof AUTHENTIC_DUAS)[0]) => {
    if (soundEnabled) soundHaptics.playTap();
    const exists = selectedCustomZikrs.some((z) => z.id === dua.id || z.name === dua.title);
    if (exists) {
      setSelectedCustomZikrs((prev) => prev.filter((z) => z.id !== dua.id && z.name !== dua.title));
    } else {
      const newZikr: ZikrItem = {
        id: dua.id || `dua_${Date.now()}_${Math.random()}`,
        name: dua.title,
        arabic: dua.arabic,
        pronunciationBn: dua.translations?.bn?.title || dua.title,
        meaningBn: dua.translations?.bn?.translation || dua.translation,
        meaning: dua.translation,
        transliteration: dua.transliteration,
        count: 0,
        target: dua.suggestedCount || 100,
        fardTarget: dua.suggestedCount || 100,
        maghribTarget: (dua.suggestedCount || 100) * 5,
        manualTarget: (dua.suggestedCount || 100) * 10,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        color: 'emerald',
      };
      setSelectedCustomZikrs((prev) => [...prev, newZikr]);
    }
  };

  const isBn = selectedLanguage === 'bn';
  // Always keep onboarding in crisp light theme tinted by the user's selected light palette
  const isDarkCanvas = false;

  // Step-by-step hardware/browser Back support across steps 1..6
  useBackLayer(step >= 1, () => setStep(0), 'onboarding-s1');
  useBackLayer(step >= 2, () => setStep(1), 'onboarding-s2');
  useBackLayer(step >= 3, () => setStep(2), 'onboarding-s3');
  useBackLayer(step >= 4, () => setStep(3), 'onboarding-s4');
  useBackLayer(step >= 5, () => setStep(4), 'onboarding-s5');
  useBackLayer(step >= 6, () => setStep(5), 'onboarding-s6');

  const filteredCities = useMemo(() => {
    const q = citySearch.trim().toLowerCase();
    if (!q) return ALL_ONBOARDING_CITIES.slice(0, 14);
    return ALL_ONBOARDING_CITIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
    );
  }, [citySearch]);

  const activeThemeObj = useMemo(
    () => getLightThemePalette(selectedThemeId),
    [selectedThemeId]
  );

  const stepHeaders = [
    { icon: Sparkles, label: isBn ? 'স্বাগতম' : 'Welcome' },
    { icon: Languages, label: isBn ? 'ভাষা' : 'Language' },
    { icon: User, label: isBn ? 'আপনার পরিচয়' : 'You' },
    { icon: Palette, label: isBn ? 'থিম' : 'Theme' },
    { icon: MapPin, label: isBn ? 'অবস্থান' : 'Location' },
    { icon: Bell, label: isBn ? 'নোটিফিকেশন' : 'Notifications' },
    { icon: CheckCircle2, label: isBn ? 'সম্পন্ন' : 'Finish' },
  ];

  const CurrentHeaderIcon = stepHeaders[step].icon;
  const isFinishStep = step === 6;

  const handleNext = () => {
    if (soundEnabled) soundHaptics.playTap();
    if (step < 6) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Save preferences cleanly
      try {
        localStorage.setItem('zikr_user_gender', gender);
        localStorage.setItem('zikr_reminders_enabled', notificationsMode === 'enable' ? 'true' : 'false');
        if (selectedCity) {
          localStorage.setItem('zikrmate_salat_city', JSON.stringify(selectedCity));
        }
      } catch {}
      onComplete({
        startPreset,
        gender,
        notificationsEnabled: notificationsMode === 'enable',
        selectedCity,
        customSelectedZikrs: startPreset === 'custom_270' ? selectedCustomZikrs : undefined,
      });
    }
  };

  const handleBack = () => {
    if (soundEnabled) soundHaptics.playTap();
    if (step > 0) {
      stepBackOr(() => setStep((prev) => Math.max(0, prev - 1)));
    }
  };

  const handleDetectGps = () => {
    if (soundEnabled) soundHaptics.playTap();
    setLocationMode('gps');
    setGpsNotice(null);

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      const fallback = ALL_ONBOARDING_CITIES.find((c) => c.name === 'Dhaka') || ALL_ONBOARDING_CITIES[0];
      setSelectedCity(fallback);
      setGpsNotice(isBn ? 'ডিফল্ট হিসেবে ঢাকা নির্বাচিত হয়েছে।' : 'Defaulted to Dhaka.');
      return;
    }

    setIsDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearest = findNearestCity(pos.coords.latitude, pos.coords.longitude);
        setSelectedCity(nearest);
        setIsDetectingGps(false);
        setGpsNotice(
          isBn
            ? `শনাক্ত করা হয়েছে: ${nearest.name}, ${nearest.country}`
            : `Detected: ${nearest.name}, ${nearest.country}`
        );
      },
      () => {
        const fallback = ALL_ONBOARDING_CITIES.find((c) => c.name === 'Dhaka') || ALL_ONBOARDING_CITIES[0];
        setSelectedCity(fallback);
        setIsDetectingGps(false);
        setGpsNotice(
          isBn
            ? 'লোকেশন অনুমতি মেলেনি — ঢাকা সেট করা হয়েছে (চাইলে ম্যানুয়ালি বদলান)।'
            : 'Location permission declined — set to Dhaka (or choose manually).'
        );
      },
      { timeout: 6000, enableHighAccuracy: false }
    );
  };

  const handleEnableNotifications = async () => {
    if (soundEnabled) soundHaptics.playTap();
    setNotificationsMode('enable');
    try {
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
      }
    } catch {}
  };

  const cardBaseClass = 'bg-white border-[var(--app-border,#e2e8f0)] text-slate-900';

  const cardActiveClass =
    'bg-[var(--app-surface-soft,#e9f6ef)] border-[var(--app-primary,#006A4E)] ring-1 ring-[var(--app-primary,#006A4E)]/30 text-slate-900';

  const subtleTextClass = 'text-slate-600';

  return (
    <div
      className="fixed inset-0 z-[120] overflow-y-auto transition-colors duration-300 text-slate-900"
      style={{ backgroundColor: activeThemeObj.canvasBg }}
    >
      <div className="min-h-[100dvh] max-w-lg mx-auto px-5 pt-5 pb-7 flex flex-col justify-between">
        {/* TOP HEADER & 7-SEGMENT PROGRESS BAR */}
        <div className="space-y-3 shrink-0">
          <div className="flex items-center gap-2">
            <CurrentHeaderIcon
              className="w-4 h-4 transition-colors duration-300"
              style={{ color: activeThemeObj.primary }}
            />
            <span className="text-xs font-extrabold tracking-tight">{stepHeaders[step].label}</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 7 }).map((_, idx) => {
              const filled = idx <= step;
              return (
                <div
                  key={idx}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: filled ? activeThemeObj.primary : activeThemeObj.border,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* MAIN STEP CONTENT */}
        <div className="flex-1 flex flex-col justify-center py-6">
          {/* STEP 0: WELCOME */}
          {step === 0 && (
            <div className="my-auto">
              <div
                className={`rounded-3xl border px-6 py-10 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-4 ${cardBaseClass}`}
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[var(--app-surface-soft,#e9f6ef)] border border-[var(--app-border,#cbe6d8)] flex items-center justify-center shadow-md overflow-hidden p-1 shrink-0">
                  <img
                    src="/pwa-192x192.png"
                    alt="Zikr+ Logo"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/icon.svg';
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                    Zikr<span style={{ color: activeThemeObj.primary }}>+</span>
                  </h1>
                  <p className={`text-xs sm:text-sm leading-relaxed max-w-xs mx-auto font-medium ${subtleTextClass}`}>
                    {isBn
                      ? 'প্রতিদিনের জিকির, সালাত, দোয়া, সীরাত ও হায়াতুস সাহাবার অনন্য সংগ্রহ নিয়ে সাজান আপনার প্রশান্ত রুটিন।'
                      : 'Build your serene routine with daily Zikr, prayer, Dua, Seerat and Hayatus Sahaba.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: LANGUAGE */}
          {step === 1 && (
            <div className="space-y-5 mb-auto pt-2">
              <div className="space-y-1">
                <h2 className="text-xl font-black tracking-tight">
                  {isBn ? 'আপনার ভাষা বেছে নিন' : 'Choose your language'}
                </h2>
                <p className={`text-xs sm:text-sm font-medium ${subtleTextClass}`}>
                  {isBn
                    ? 'আপনি পরে সেটিংস থেকে এটি পরিবর্তন করতে পারবেন।'
                    : 'You can change this later from Settings.'}
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    code: 'bn' as ZikrLanguage,
                    title: 'বাংলা',
                    subtitle: 'অ্যাপের ইন্টারফেস বাংলায় ব্যবহার করুন।',
                    icon: Globe,
                  },
                  {
                    code: 'en' as ZikrLanguage,
                    title: 'English',
                    subtitle: 'Use English for the app interface.',
                    icon: Languages,
                  },
                  {
                    code: 'ar' as ZikrLanguage,
                    title: 'العربية',
                    subtitle: 'استخدم العربية لواجهة التطبيق.',
                    icon: Globe,
                  },
                ].map((opt) => {
                  const active = selectedLanguage === opt.code;
                  const IconComp = opt.icon;
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        onSelectLanguage(opt.code);
                      }}
                      className={`w-full text-left rounded-2xl border p-4 flex items-center gap-3.5 transition-all cursor-pointer active:scale-[0.99] ${
                        active ? cardActiveClass : cardBaseClass
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border ${
                          active
                            ? 'bg-[var(--app-surface-soft,#e9f6ef)] border-[var(--app-border,#cbe6d8)] text-[var(--app-primary,#006A4E)]'
                            : isDarkCanvas
                            ? 'bg-white/10 border-white/15 text-amber-300'
                            : 'bg-[var(--app-surface-soft,#e9f6ef)] border-[var(--app-border,#cbe6d8)] text-[var(--app-primary,#006A4E)]'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm sm:text-base font-extrabold">{opt.title}</div>
                        <div className={`text-xs mt-0.5 ${subtleTextClass}`}>{opt.subtitle}</div>
                      </div>
                      {active && (
                        <div className="w-7 h-7 rounded-full bg-[var(--app-primary,#006A4E)] border-[var(--app-primary,#006A4E)] text-white flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: BROTHER OR SISTER */}
          {step === 2 && (
            <div className="space-y-5 mb-auto pt-2">
              <div className="space-y-1">
                <h2 className="text-xl font-black tracking-tight">
                  {isBn ? 'ভাই নাকি বোন?' : 'Brother or sister?'}
                </h2>
                <p className={`text-xs sm:text-sm font-medium leading-relaxed ${subtleTextClass}`}>
                  {isBn
                    ? 'সালাত পেজ ও আমল ট্র্যাকার আপনার উত্তর অনুযায়ী সাজানো হবে। পরে প্রোফাইল থেকে পরিবর্তন করতে পারবেন।'
                    : 'The prayer page and the widgets fit your answer. You can change it later in Profile.'}
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'brother' as const,
                    title: isBn ? 'ভাই (Brother)' : 'Brother',
                    desc: isBn
                      ? 'জামাতে নামাজের জন্য পূর্ণ পয়েন্ট, একা পড়লে অর্ধেক। ওজর (Excused) অপশন থাকবে না।'
                      : 'Full points in congregation, half alone. No "excused".',
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                        <circle cx="12" cy="5.5" r="2.3" />
                        <path d="M9.2 9.5h5.6a1.5 1.5 0 0 1 1.5 1.5v4.3a1 1 0 0 1-1.9.3V12h-.6v8.2a1.1 1.1 0 0 1-2.2 0V15h-.4v5.2a1.1 1.1 0 0 1-2.2 0V12h-.6v3.6a1 1 0 0 1-1.9-.3V11a1.5 1.5 0 0 1 1.5-1.5z" />
                      </svg>
                    ),
                  },
                  {
                    id: 'sister' as const,
                    title: isBn ? 'বোন (Sister)' : 'Sister',
                    desc: isBn
                      ? 'আওয়াল ওয়াক্তে নামাজের জন্য পূর্ণ পয়েন্ট। জামাত বা জুমআর বাধ্যবাধকতা ছাড়াই "ওজর" (Excused) অপশন থাকবে।'
                      : 'Full points for praying at the start of the time. No congregation or Jumu\'ah; "excused" is there.',
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                        <circle cx="12" cy="5.5" r="2.3" />
                        <path d="M10 9.5h4c.8 0 1.5.5 1.7 1.3l1.3 4.8a1 1 0 0 1-1.9.5l-.8-2.6 1.1 3.7H13.5v3a1.1 1.1 0 0 1-2.2 0v-3h-.6v3a1.1 1.1 0 0 1-2.2 0v-3H7.6l1.1-3.7-.8 2.6a1 1 0 0 1-1.9-.5l1.3-4.8c.2-.8.9-1.3 1.7-1.3z" />
                      </svg>
                    ),
                  },
                ].map((opt) => {
                  const active = gender === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setGender(opt.id);
                      }}
                      className={`w-full text-left rounded-2xl border p-4 flex items-center gap-3.5 transition-all cursor-pointer active:scale-[0.99] ${
                        active ? cardActiveClass : cardBaseClass
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border ${
                          active
                            ? 'bg-[var(--app-surface-soft,#e9f6ef)] border-[var(--app-border,#cbe6d8)] text-[var(--app-primary,#006A4E)]'
                            : isDarkCanvas
                            ? 'bg-white/10 border-white/15 text-amber-300'
                            : 'bg-[var(--app-surface-soft,#e9f6ef)] border-[var(--app-border,#cbe6d8)] text-[var(--app-primary,#006A4E)]'
                        }`}
                      >
                        {opt.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm sm:text-base font-extrabold">{opt.title}</div>
                        <div className={`text-xs mt-0.5 leading-relaxed ${subtleTextClass}`}>
                          {opt.desc}
                        </div>
                      </div>
                      {active && (
                        <div className="w-7 h-7 rounded-full bg-[var(--app-primary,#006A4E)] border-[var(--app-primary,#006A4E)] text-white flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: LIGHT COLOR THEME PICKER (All distinct soothing light palettes) */}
          {step === 3 && (
            <div className="space-y-4 mb-auto pt-2">
              <div className="space-y-1">
                <h2 className="text-xl font-black tracking-tight text-slate-900">
                  {isBn ? 'আপনার পছন্দের হালকা কালার বেছে নিন' : 'Choose your light color theme'}
                </h2>
                <p className={`text-xs sm:text-sm font-medium ${subtleTextClass}`}>
                  {isBn
                    ? 'যে কালারটি সিলেক্ট করবেন, পুরো অ্যাপের ভেতরের সবকিছু সেই কালারে সেজে যাবে।'
                    : 'Whichever light color you pick, the entire app will adapt to that palette.'}
                </p>
              </div>

              <div className="space-y-2.5">
                {APP_LIGHT_THEMES.map((t) => {
                  const active = selectedThemeId === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setSelectedThemeId(t.id);
                        onApplyTheme('day', t.id);
                      }}
                      className="w-full text-left rounded-2xl border px-4 py-3.5 flex items-center gap-3.5 transition-all cursor-pointer active:scale-[0.99] shadow-2xs"
                      style={{
                        backgroundColor: active ? t.softBg : '#ffffff',
                        borderColor: active ? t.primary : t.border,
                        boxShadow: active ? `0 0 0 1px ${t.primary}40` : undefined,
                      }}
                    >
                      {/* Light Surface Preview Swatch */}
                      <div
                        className="w-16 h-10 rounded-xl border shrink-0 shadow-2xs flex items-center justify-center relative overflow-hidden"
                        style={{
                          backgroundColor: t.canvasBg,
                          borderColor: t.border,
                        }}
                      >
                        <div
                          className="w-full h-2.5 absolute top-0 left-0 right-0"
                          style={{ backgroundColor: t.primary }}
                        />
                        <div
                          className="w-7 h-2 rounded-full mt-2.5"
                          style={{ backgroundColor: t.softBg, border: `1px solid ${t.border}` }}
                        />
                      </div>

                      {/* Vertical Theme Color Accent Bar */}
                      <div
                        className="w-1.5 h-10 rounded-full shrink-0"
                        style={{ backgroundColor: t.primary }}
                      />

                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm font-extrabold truncate"
                          style={{ color: t.ink }}
                        >
                          {isBn ? t.nameBn : t.nameEn}
                        </div>
                        <div className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                          {isBn ? t.descBn : t.descEn}
                        </div>
                      </div>

                      {active && (
                        <div
                          className="w-7 h-7 rounded-full text-white flex items-center justify-center shrink-0 shadow-xs"
                          style={{ backgroundColor: t.primary }}
                        >
                          <Check className="w-4 h-4 stroke-[2.8]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: LOCATION */}
          {step === 4 && (
            <div className="space-y-4 mb-auto pt-2">
              <div className="space-y-1">
                <h2 className="text-xl font-black tracking-tight">
                  {isBn ? 'সালাতের সময়ের জন্য অবস্থান দিন' : 'Set your prayer time location'}
                </h2>
                <p className={`text-xs sm:text-sm font-medium ${subtleTextClass}`}>
                  {isBn
                    ? 'সঠিক স্থানীয় নামাজের সময় নির্ণয়ের জন্যই শুধু আপনার অবস্থান প্রয়োজন।'
                    : 'Your location is needed only to calculate accurate local prayer times.'}
                </p>
              </div>

              {/* Soft Privacy Info Cards */}
              <div className="space-y-2.5">
                <div
                  className={`rounded-2xl border p-3.5 flex items-start gap-3 text-xs leading-relaxed ${
                    isDarkCanvas
                      ? 'bg-sky-950/40 border-sky-700/40 text-sky-100'
                      : 'bg-[#eef4fa] border-[#d3e2f0] text-slate-800'
                  }`}
                >
                  <Info className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <p className="font-medium">
                    {isBn
                      ? 'প্রতিদিনের জিকির, কুরআন তিলাওয়াত, দোয়া বা আমল ট্র্যাকিংয়ের জন্য Zikr+-এ লোকেশনের প্রয়োজন নেই। এগুলো লোকেশন ছাড়াই সম্পূর্ণ কাজ করে।'
                      : 'Zikr+ does not need your location for daily amal, dhikr, reading, dua or reflection tracking. These features work fully without location.'}
                  </p>
                </div>

                <div
                  className={`rounded-2xl border p-3.5 flex items-start gap-3 text-xs leading-relaxed ${
                    isDarkCanvas
                      ? 'bg-amber-950/35 border-amber-700/40 text-amber-100'
                      : 'bg-[#fbf4df] border-[#eedba3] text-slate-800'
                  }`}
                >
                  <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="font-medium">
                    {isBn
                      ? 'লোকেশন সেট না করলে আপনি পরে সালাত টাইম পেজ থেকে যেকোনো সময় আপনার জেলা বা শহর বেছে নিতে পারবেন।'
                      : 'If location is not turned on, prayer times can be configured anytime later from the Prayer Times page.'}
                  </p>
                </div>
              </div>

              {/* 3 Interactive Location Cards */}
              <div className="space-y-2.5">
                {/* 1. GPS Auto */}
                <button
                  type="button"
                  onClick={handleDetectGps}
                  className={`w-full text-left rounded-2xl border p-4 flex items-center gap-3.5 transition-all cursor-pointer active:scale-[0.99] ${
                    locationMode === 'gps' ? cardActiveClass : cardBaseClass
                  }`}
                >
                  <div className="w-11 h-11 rounded-full bg-[#f6f1db] border border-[#eae2bf] text-[#c78d00] flex items-center justify-center shrink-0">
                    <Compass className={`w-5 h-5 ${isDetectingGps ? 'animate-spin' : ''}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-extrabold">
                      {isBn ? 'জিপিএস দিয়ে স্বয়ংক্রিয়ভাবে শনাক্ত করুন' : 'Detect via GPS (Auto)'}
                    </div>
                    <div className={`text-xs mt-0.5 ${subtleTextClass}`}>
                      {isDetectingGps
                        ? isBn ? 'আপনার শহর খোঁজা হচ্ছে...' : 'Finding your current city...'
                        : gpsNotice && locationMode === 'gps'
                        ? gpsNotice
                        : isBn ? 'স্বয়ংক্রিয়ভাবে আপনার বর্তমান শহর খুঁজুন' : 'Automatically find your current city'}
                    </div>
                  </div>
                  {locationMode === 'gps' && !isDetectingGps && (
                    <div className="w-7 h-7 rounded-full bg-[var(--app-primary,#006A4E)] border-[var(--app-primary,#006A4E)] text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </button>

                {/* 2. Manual District Picker */}
                <div
                  className={`rounded-2xl border transition-all ${
                    locationMode === 'manual' ? cardActiveClass : cardBaseClass
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      setLocationMode('manual');
                    }}
                    className="w-full text-left p-4 flex items-center gap-3.5 cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#f6f1db] border border-[#eae2bf] text-[#c78d00] flex items-center justify-center shrink-0">
                      <Map className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-extrabold">
                        {isBn ? 'ম্যানুয়ালি বেছে নিন' : 'Select Manually'}
                      </div>
                      <div className={`text-xs mt-0.5 ${subtleTextClass}`}>
                        {locationMode === 'manual' && selectedCity
                          ? `${selectedCity.name}, ${selectedCity.country}`
                          : isBn
                          ? 'তালিকা থেকে আপনার জেলা বা শহর নির্বাচন করুন'
                          : 'Choose your district or city from a list'}
                      </div>
                    </div>
                    {locationMode === 'manual' && selectedCity && (
                      <div className="w-7 h-7 rounded-full bg-[var(--app-primary,#006A4E)] border-[var(--app-primary,#006A4E)] text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    )}
                  </button>

                  {locationMode === 'manual' && (
                    <div className="px-4 pb-4 space-y-2.5 border-t border-black/5 dark:border-white/10 pt-3">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={citySearch}
                          onChange={(e) => setCitySearch(e.target.value)}
                          placeholder={isBn ? 'শহর বা জেলা খুঁজুন (যেমন: Dhaka, Sylhet)...' : 'Search city or district...'}
                          className={`w-full pl-8 pr-3 py-2 rounded-xl border text-xs outline-none ${
                            isDarkCanvas
                              ? 'bg-black/25 border-white/15 text-white placeholder:text-slate-400'
                              : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
                          }`}
                        />
                      </div>
                      <div className="max-h-36 overflow-y-auto grid grid-cols-2 gap-1.5 pr-0.5">
                        {filteredCities.map((city) => {
                          const isChosen =
                            selectedCity?.name === city.name && selectedCity?.country === city.country;
                          return (
                            <button
                              key={`${city.name}-${city.country}`}
                              type="button"
                              onClick={() => {
                                if (soundEnabled) soundHaptics.playTap();
                                setSelectedCity(city);
                              }}
                              className={`px-2.5 py-1.5 rounded-xl text-left text-xs font-bold border transition cursor-pointer truncate ${
                                isChosen
                                  ? 'bg-[#006A4E] text-white border-[#006A4E]'
                                  : isDarkCanvas
                                  ? 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-amber-50'
                              }`}
                            >
                              {city.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Skip Location */}
                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setLocationMode('skip');
                    setSelectedCity(null);
                  }}
                  className={`w-full text-left rounded-2xl border p-4 flex items-center gap-3.5 transition-all cursor-pointer active:scale-[0.99] ${
                    locationMode === 'skip'
                      ? isDarkCanvas
                        ? 'bg-[#0f2f36] border-slate-400 text-white'
                        : 'bg-[#eef1f3] border-slate-600 text-slate-900'
                      : cardBaseClass
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border ${
                      isDarkCanvas
                        ? 'bg-white/10 border-white/15 text-slate-300'
                        : 'bg-slate-200/80 border-slate-300 text-slate-600'
                    }`}
                  >
                    <MapPinOff className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-extrabold">
                      {isBn ? 'এখন এড়িয়ে যান' : 'Skip location'}
                    </div>
                    <div className={`text-xs mt-0.5 ${subtleTextClass}`}>
                      {isBn
                        ? 'কোনো অবস্থান সংরক্ষণ করা হবে না। পরে সালাতের সময় সেট করতে পারবেন।'
                        : 'No location will be saved. Prayer times can be configured later.'}
                    </div>
                  </div>
                  {locationMode === 'skip' && (
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                        isDarkCanvas
                          ? 'bg-white/15 border-white/25 text-white'
                          : 'bg-slate-200 border-slate-400 text-slate-700'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: NOTIFICATIONS */}
          {step === 5 && (
            <div className="space-y-4 mb-auto pt-2">
              <div className="space-y-1">
                <h2 className="text-xl font-black tracking-tight">
                  {isBn ? 'মৃদু রিমাইন্ডার চালু করবেন?' : 'Enable gentle reminders?'}
                </h2>
                <p className={`text-xs sm:text-sm font-medium ${subtleTextClass}`}>
                  {isBn
                    ? 'কোনো চাপ ছাড়াই নিয়মিত আমল ধরে রাখতে রিমাইন্ডার আপনাকে সাহায্য করবে।'
                    : 'Reminders can help you stay consistent without pressure.'}
                </p>
              </div>

              <div
                className={`rounded-2xl border p-3.5 flex items-start gap-3 text-xs leading-relaxed ${
                  isDarkCanvas
                    ? 'bg-sky-950/40 border-sky-700/40 text-sky-100'
                    : 'bg-[#eef4fa] border-[#d3e2f0] text-slate-800'
                }`}
              >
                <Info className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <p className="font-medium">
                  {isBn
                    ? 'নোটিফিকেশন সম্পূর্ণ ঐচ্ছিক। এটি ছাড়াও আপনি Zikr+ পুরোপুরি ব্যবহার করতে পারবেন।'
                    : 'Notifications are optional. You can use Zikr+ fully without them.'}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => void handleEnableNotifications()}
                  className={`w-full text-left rounded-2xl border p-4 flex items-center gap-3.5 transition-all cursor-pointer active:scale-[0.99] ${
                    notificationsMode === 'enable' ? cardActiveClass : cardBaseClass
                  }`}
                >
                  <div className="w-11 h-11 rounded-full bg-[#f6f1db] border border-[#eae2bf] text-[#c78d00] flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-extrabold">
                      {isBn ? 'রিমাইন্ডার চালু করুন' : 'Enable reminders'}
                    </div>
                    <div className={`text-xs mt-0.5 ${subtleTextClass}`}>
                      {isBn
                        ? 'আপনার সেটআপ অনুযায়ী নামাজ ও আমলের রিমাইন্ডার প্রস্তুত করুন।'
                        : 'Ask permission and prepare eligible reminders for your setup.'}
                    </div>
                  </div>
                  {notificationsMode === 'enable' && (
                    <div className="w-7 h-7 rounded-full bg-[var(--app-primary,#006A4E)] border-[var(--app-primary,#006A4E)] text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setNotificationsMode('later');
                  }}
                  className={`w-full text-left rounded-2xl border p-4 flex items-center gap-3.5 transition-all cursor-pointer active:scale-[0.99] ${
                    notificationsMode === 'later'
                      ? isDarkCanvas
                        ? 'bg-[#0f2f36] border-slate-400 text-white'
                        : 'bg-[#eef1f3] border-slate-600 text-slate-900'
                      : cardBaseClass
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border ${
                      isDarkCanvas
                        ? 'bg-white/10 border-white/15 text-slate-300'
                        : 'bg-slate-200/80 border-slate-300 text-slate-600'
                    }`}
                  >
                    <BellOff className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-extrabold">
                      {isBn ? 'এখন নয়' : 'Not now'}
                    </div>
                    <div className={`text-xs mt-0.5 ${subtleTextClass}`}>
                      {isBn
                        ? 'কোনো অনুমতি চাওয়া হবে না। পরে যেকোনো সময় চালু করতে পারবেন।'
                        : 'No permission will be requested. You can enable reminders later.'}
                    </div>
                  </div>
                  {notificationsMode === 'later' && (
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                        isDarkCanvas
                          ? 'bg-white/15 border-white/25 text-white'
                          : 'bg-slate-200 border-slate-400 text-slate-700'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: FINISH & PRESET SUMMARY */}
          {step === 6 && (
            <div className="space-y-4 mb-auto pt-1">
              <div className="space-y-1">
                <h2 className="text-xl font-black tracking-tight">
                  {isBn ? 'আপনি শুরু করার জন্য প্রস্তুত' : 'You are ready to begin'}
                </h2>
                <p className={`text-xs sm:text-sm font-medium ${subtleTextClass}`}>
                  {isBn
                    ? 'ছোট থেকে শুরু করুন। পূর্ণতার চেয়ে ধারাবাহিকতাই বেশি গুরুত্বপূর্ণ।'
                    : 'Start small. Consistency matters more than perfection.'}
                </p>
              </div>

              {/* 5 Summary Rows matching Screenshot 8 */}
              <div className="space-y-2">
                {[
                  {
                    icon: Languages,
                    label: isBn ? 'ভাষা' : 'Language',
                    value:
                      selectedLanguage === 'bn'
                        ? 'বাংলা'
                        : selectedLanguage === 'ar'
                        ? 'العربية'
                        : 'English',
                    tint: isDarkCanvas
                      ? 'bg-sky-950/35 border-sky-800/40 text-sky-300'
                      : 'bg-[#eef4fa] border-[#d3e2f0] text-blue-600',
                  },
                  {
                    icon: Palette,
                    label: isBn ? 'থিম' : 'Theme',
                    value: isBn ? activeThemeObj.nameBn : activeThemeObj.nameEn,
                    tint: isDarkCanvas
                      ? 'bg-white/[0.06] border-white/15 text-slate-300'
                      : 'bg-[#f1f2ee] border-[#e2e3dc] text-slate-600',
                  },
                  {
                    icon: MapPin,
                    label: isBn ? 'অবস্থান' : 'Location',
                    value: selectedCity
                      ? `${selectedCity.name}, ${selectedCity.country}`
                      : isBn
                      ? 'এখনো সেট করা হয়নি'
                      : 'Not set yet',
                    tint: isDarkCanvas
                      ? 'bg-amber-950/25 border-amber-800/35 text-amber-300'
                      : 'bg-[var(--app-surface-soft,#e9f6ef)] border-[var(--app-border,#cbe6d8)] text-[var(--app-primary,#006A4E)]',
                  },
                  {
                    icon: ShieldCheck,
                    label: isBn ? 'সালাতের নিয়ম' : 'Prayer rules',
                    value: isBn
                      ? 'হানাফি · ইউনিভার্সিটি অফ ইসলামিক সায়েন্সেস, করাচি'
                      : 'Hanafi · University of Islamic Sciences, Karachi',
                    tint: isDarkCanvas
                      ? 'bg-amber-950/25 border-amber-800/35 text-amber-300'
                      : 'bg-[var(--app-surface-soft,#e9f6ef)] border-[var(--app-border,#cbe6d8)] text-[var(--app-primary,#006A4E)]',
                  },
                  {
                    icon: Bell,
                    label: isBn ? 'নোটিফিকেশন' : 'Notifications',
                    value:
                      notificationsMode === 'enable'
                        ? isBn ? 'চালু আছে' : 'Enabled'
                        : isBn ? 'এখন নয়' : 'Not now',
                    tint: isDarkCanvas
                      ? 'bg-amber-950/25 border-amber-800/35 text-amber-300'
                      : 'bg-[var(--app-surface-soft,#e9f6ef)] border-[var(--app-border,#cbe6d8)] text-[var(--app-primary,#006A4E)]',
                  },
                ].map((row, idx) => {
                  const IconComp = row.icon;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/85 bg-[#f6f7f9] dark:bg-slate-900/50 dark:border-slate-800 px-4 py-3 flex items-center gap-3.5 shadow-2xs transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#eef1f6] border border-[#dce2ec] text-[#006A4E] dark:bg-slate-800 dark:border-slate-700 dark:text-emerald-300 flex items-center justify-center shrink-0 shadow-2xs">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-tight">
                          {row.label}
                        </div>
                        <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate mt-0.5">
                          {row.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* How do you want to start? */}
              <div className="space-y-2.5 pt-1">
                <h3 className="text-sm font-extrabold">
                  {isBn ? 'আপনি কীভাবে শুরু করতে চান?' : 'How do you want to start?'}
                </h3>

                {/* Option 1: Zikr+ Complete App System Preset */}
                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setStartPreset('preset');
                  }}
                  className={`w-full text-left rounded-2xl border p-3.5 flex items-center gap-3 transition-all cursor-pointer ${
                    startPreset === 'preset' ? cardActiveClass : cardBaseClass
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#f8efc8] border border-[#e7cf72] text-[#c78d00] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-extrabold">
                      {isBn ? 'Zikr+ সম্পূর্ণ আমল ও জিকির সিস্টেম' : 'Zikr+ Complete System'}
                    </div>
                    <div className={`text-xs mt-0.5 leading-snug ${subtleTextClass}`}>
                      {isBn
                        ? `${toBnDigits(DEFAULT_ZIKRS.length)}টি মাসনুন জিকির, ৫ ওয়াক্ত সালাত ও ${toBnDigits(DEFAULT_AAMAL_ITEMS.length)}+ দৈনিক আমল, আল-কুরআন, হাদীস, দোয়া ও সীরাত নিয়ে শুরু করুন।`
                        : `Start with ${DEFAULT_ZIKRS.length} daily Zikrs, 5-Waqt Salah & ${DEFAULT_AAMAL_ITEMS.length}+ Amal Tracker items, Holy Quran, Hadith, Dua & Seerat.`}
                    </div>
                  </div>
                  {startPreset === 'preset' && (
                    <div className="w-7 h-7 rounded-full bg-[var(--app-primary,#006A4E)] border-[var(--app-primary,#006A4E)] text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </button>

                {/* Real Zikr+ System Details Card */}
                {startPreset === 'preset' && (
                  <div className={`rounded-2xl border p-4 space-y-3.5 text-xs ${cardBaseClass}`}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-extrabold text-sm">
                        {isBn ? 'এই অ্যাপের সিস্টেমে যা যুক্ত থাকবে' : 'Included in Zikr+ system'}
                      </div>
                      <span className={`text-[11px] font-bold tabular-nums ${subtleTextClass}`}>
                        {isBn ? `${toBnDigits(DEFAULT_ZIKRS.length)} জিকির · ${toBnDigits(DEFAULT_AAMAL_ITEMS.length)} আমল` : `${DEFAULT_ZIKRS.length} Zikrs · ${DEFAULT_AAMAL_ITEMS.length} Amals`}
                      </span>
                    </div>

                    {/* 1. Real 12 Default Zikrs from DEFAULT_ZIKRS */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] font-bold ${subtleTextClass}`}>
                          {isBn ? `মাসনুন জিকির কাউন্টার (${toBnDigits(DEFAULT_ZIKRS.length)}টি)` : `Daily Zikr Counter (${DEFAULT_ZIKRS.length})`}
                        </span>
                        <span className={`text-[10.5px] font-semibold tabular-nums ${subtleTextClass}`}>
                          {isBn ? 'ফরজ ওয়াক্ত লক্ষ্য' : 'Per-Waqt target'}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {DEFAULT_ZIKRS.map((zikr) => {
                          const shortBn =
                            zikr.id === 'dua_yunus'
                              ? 'দোয়া ইউনুস (লা ইলাহা ইল্লা আনতা...)'
                              : zikr.id === 'lailaha_illallahu_wahdahu'
                              ? 'লা-ইলাহা ইল্লাল্লাহু ওয়াহদাহু...'
                              : zikr.pronunciationBn || zikr.name;
                          const shortEn =
                            zikr.id === 'dua_yunus'
                              ? 'Dua Yunus (La Ilaha Illa Anta...)'
                              : zikr.id === 'lailaha_illallahu_wahdahu'
                              ? 'La Ilaha Illallahu Wahdahu...'
                              : zikr.name;
                          const targetVal = zikr.fardTarget ?? zikr.target ?? 100;
                          return (
                            <div key={zikr.id} className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 font-bold min-w-0">
                                <span className="w-4 h-4 rounded-full bg-[var(--app-primary,#006A4E)] text-white flex items-center justify-center shrink-0">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </span>
                                <span className="truncate">{isBn ? shortBn : shortEn}</span>
                              </div>
                              <span className={`font-semibold tabular-nums shrink-0 ${subtleTextClass}`}>
                                {isBn ? `${toBnDigits(targetVal)} বার` : `${targetVal}x`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className={`text-[10.5px] font-medium pt-0.5 tabular-nums ${subtleTextClass}`}>
                        {isBn
                          ? 'রিসেট মোড: প্রতি ফরজ ওয়াক্তে (১০০/২০) · মাগরিবে (৫০০/১০০) · ম্যানুয়াল (১০০০/২০০)'
                          : 'Reset modes: Per Waqt (100/20) · Maghrib (500/100) · Manual (1000/200)'}
                      </div>
                    </div>

                    {/* 2. Real 5-Waqt Salah & Daily Amal Tracker System */}
                    <div className="space-y-1.5 pt-2 border-t border-black/5 dark:border-white/10">
                      <div className={`text-[11px] font-bold ${subtleTextClass}`}>
                        {isBn ? 'সালাত টাইম ও দৈনিক আমল ট্র্যাকার' : 'Salah Times & Daily Amal Tracker'}
                      </div>
                      {[
                        {
                          name: isBn ? '৫ ওয়াক্ত সালাত ও জুমুআহ (ফরজ, সুন্নত, বিতর)' : '5-Waqt Salah & Jumu\'ah (Fardh, Sunnah, Witr)',
                          meta: isBn ? 'ফজর – ইশা' : 'Fajr – Isha',
                        },
                        {
                          name: isBn ? 'অতিরিক্ত নফল (তাহাজ্জুদ, ইশরাক, চাশত, আওয়াবিন)' : 'Extra Nafl (Tahajjud, Ishraq, Duha, Awwabin)',
                          meta: isBn ? '৬টি নফল' : '6 Nafl',
                        },
                        {
                          name: isBn ? 'সকাল-সন্ধ্যার মাসনুন আজকার ও ৩ কুল' : 'Morning & Evening Adhkar & 3 Quls',
                          meta: isBn ? 'সকাল ও সন্ধ্যা' : 'AM & PM',
                        },
                        {
                          name: isBn ? 'ঘুমানোর আমল (সূরা মুলক, আয়াতুল কুরসি, বাকারার শেষ ২ আয়াত)' : 'Bedtime Sunnah (Surah Mulk, Ayatul Kursi, Baqarah)',
                          meta: isBn ? 'ঘুমানোর আগে' : 'Bedtime',
                        },
                        {
                          name: isBn ? 'আখলাক, ইলম, দাওয়াহ ও পারিবারিক আমল' : 'Character, Knowledge, Dawah & Family Duties',
                          meta: isBn ? 'দৈনিক স্কোর' : 'Daily Score',
                        },
                      ].map((item) => (
                        <div key={item.name} className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 font-bold min-w-0">
                            <span className="w-4 h-4 rounded-full bg-[var(--app-primary,#006A4E)] text-white flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                            <span className="leading-snug">{item.name}</span>
                          </div>
                          <span className={`font-semibold shrink-0 tabular-nums ${subtleTextClass}`}>
                            {item.meta}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* 3. Real Quran, Hadith, Dua & Islamic Knowledge Modules */}
                    <div className="space-y-1.5 pt-2 border-t border-black/5 dark:border-white/10">
                      <div className={`text-[11px] font-bold ${subtleTextClass}`}>
                        {isBn ? 'আল-কুরআন ও ইসলামিক লাইব্রেরি' : 'Holy Quran & Islamic Library'}
                      </div>
                      {[
                        {
                          name: isBn ? 'আল-কুরআন (তাজবীদ, শব্দার্থ, তাফসীর ও অডিও)' : 'Holy Quran (Tajweed, Tafsir & Audio)',
                          meta: isBn ? '১১৪ সূরা' : '114 Surahs',
                        },
                        {
                          name: isBn ? 'হাদীস ভান্ডার, হিসনুল মুসলিম দোয়া ও ৯৯ নাম' : 'Hadith, Hisnul Muslim Duas & 99 Names',
                          meta: isBn ? 'রেফারেন্সসহ' : 'Authentic',
                        },
                        {
                          name: isBn ? 'সীরাতুন নবী ﷺ, ফ্যামিলি ট্রি ও নবীজির ২৪ ঘণ্টা' : "Seerat-un-Nabi ﷺ, Family Tree & Prophet's 24h",
                          meta: isBn ? '৬৩ বছর' : '63 Years',
                        },
                        {
                          name: isBn ? 'হায়াতুস সাহাবা, ইসলামের ইতিহাস ও কিতাব' : 'Hayatus Sahaba, Islamic History & Books',
                          meta: isBn ? 'অফলাইন রেডি' : 'Offline Ready',
                        },
                      ].map((m) => (
                        <div key={m.name} className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 font-bold min-w-0">
                            <span className="w-4 h-4 rounded-full bg-[var(--app-primary,#006A4E)] text-white flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                            <span className="leading-snug">{m.name}</span>
                          </div>
                          <span className={`font-semibold shrink-0 tabular-nums ${subtleTextClass}`}>
                            {m.meta}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className={`text-[11px] pt-1 leading-relaxed ${subtleTextClass}`}>
                      {isBn
                        ? 'অতিরিক্ত কোনো রিমাইন্ডার যোগ করা হবে না। পরে জিকিরের লক্ষ্য, নামাজের হিসাব ও যেকোনো আমল নিজের মতো পরিবর্তন করতে পারবেন।'
                        : 'No extra reminders are added. You can customize Zikr targets, prayer rules, and any amal anytime later.'}
                    </p>
                  </div>
                )}

                {/* Option 2: Set up myself */}
                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setStartPreset('custom');
                  }}
                  className={`w-full text-left rounded-2xl border p-3.5 flex items-center gap-3 transition-all cursor-pointer ${
                    startPreset === 'custom' ? cardActiveClass : cardBaseClass
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                      isDarkCanvas
                        ? 'bg-white/10 border-white/15 text-slate-300'
                        : 'bg-slate-200/70 border-slate-300 text-slate-600'
                    }`}
                  >
                    <PenLine className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-extrabold">
                      {isBn ? 'আমি নিজে সাজিয়ে নেব' : "I'll set it up myself"}
                    </div>
                    <div className={`text-xs mt-0.5 ${subtleTextClass}`}>
                      {isBn
                        ? 'সরাসরি অ্যাপে প্রবেশ করুন এবং পছন্দমতো নিজের জিকির, লক্ষ্য ও আমল সাজিয়ে নিন।'
                        : 'Enter the app directly and customize your own Zikr targets & amal items.'}
                    </div>
                  </div>
                  {startPreset === 'custom' && (
                    <div className="w-7 h-7 rounded-full bg-[var(--app-primary,#006A4E)] border-[var(--app-primary,#006A4E)] text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </button>

                {/* Option 3: 270+ Zikr / Dua Custom Selection */}
                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setStartPreset('custom_270');
                    setIsDuaPickerOpen(true);
                  }}
                  className={`w-full text-left rounded-2xl border p-3.5 flex items-center gap-3 transition-all cursor-pointer ${
                    startPreset === 'custom_270' ? cardActiveClass : cardBaseClass
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-extrabold">
                      {isBn ? '২৭০+ জিকির/দোয়া থেকে পছন্দ অনুযায়ী জিকির বাছাই করুন' : 'Choose Zikr from 270+ Zikrs & Duas'}
                    </div>
                    <div className={`text-xs mt-0.5 ${subtleTextClass}`}>
                      {isBn
                        ? selectedCustomZikrs.length > 0
                          ? `(${toBnDigits(selectedCustomZikrs.length)}টি জিকির নির্বাচিত হয়েছে) — পরিবর্তন করতে ক্লিক করুন`
                          : '২৭০+ প্রামাণিক জিকির ও দোয়া থেকে আপনার পছন্দমতো জিকির ও তাসবিহ বেছে নিন।'
                        : selectedCustomZikrs.length > 0
                          ? `(${selectedCustomZikrs.length} Zikrs selected) — Click to modify`
                          : 'Select your preferred Zikrs and Duas from 270+ authentic invocations.'}
                    </div>
                  </div>
                  {startPreset === 'custom_270' && (
                    <div className="w-7 h-7 rounded-full bg-[var(--app-primary,#006A4E)] border-[var(--app-primary,#006A4E)] text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 270+ Zikr / Dua Custom Picker Modal */}
        {isDuaPickerOpen && (
          <div className="fixed inset-0 z-[150] w-full h-[100dvh] bg-white text-slate-900 flex flex-col overflow-hidden animate-in fade-in duration-200">
            <div className="w-full h-full flex flex-col overflow-hidden">
              {/* Modal Header */}
              <div className="px-4 py-3.5 sm:px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {isBn ? '২৭০+ জিকির ও দোয়া থেকে বাছাই করুন' : 'Choose from 270+ Zikrs & Duas'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {isBn
                      ? `${toBnDigits(selectedCustomZikrs.length)}টি জিকির নির্বাচিত হয়েছে (প্রয়োজনমতো সিলেক্ট/আনসিলেক্ট করুন)`
                      : `${selectedCustomZikrs.length} Zikrs selected (select or deselect as needed)`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDuaPickerOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-200/70 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer shrink-0"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Input */}
              <div className="px-4 py-3 sm:px-6 border-b border-slate-100 bg-white shrink-0">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={duaSearchQuery}
                    onChange={(e) => setDuaSearchQuery(e.target.value)}
                    placeholder={isBn ? 'নাম বা অর্থ দিয়ে খুঁজুন (যেমন: সুবহানাল্লাহ, ইস্তিগফার)...' : 'Search by name or translation...'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs outline-none bg-slate-50 text-slate-900 focus:bg-white focus:border-[#006A4E]"
                  />
                </div>
              </div>

              {/* Duas List (270+ Items) */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-2.5 content-start">
                {AUTHENTIC_DUAS.filter((d) => {
                  const q = duaSearchQuery.trim().toLowerCase();
                  if (!q) return true;
                  return (
                    d.title.toLowerCase().includes(q) ||
                    d.translation.toLowerCase().includes(q) ||
                    d.arabic.includes(q) ||
                    (d.translations?.bn?.title || '').toLowerCase().includes(q) ||
                    (d.translations?.bn?.translation || '').toLowerCase().includes(q)
                  );
                }).map((dua) => {
                  const isSelected = selectedCustomZikrs.some((z) => z.id === dua.id || z.name === dua.title);
                  return (
                    <button
                      key={dua.id}
                      type="button"
                      onClick={() => handleToggleDuaSelection(dua)}
                      className={`w-full text-left rounded-2xl border p-3.5 flex items-start gap-3.5 transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#e9f6ef] border-[#006A4E] ring-1 ring-[#006A4E]/30 shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition ${
                          isSelected ? 'bg-[#006A4E] border-[#006A4E] text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm font-black text-slate-900">
                            {isBn ? dua.translations?.bn?.title || dua.title : dua.title}
                          </span>
                          <span className="font-arabic text-sm text-[#006A4E] shrink-0 font-bold" dir="rtl">
                            {dua.arabic}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-1 mt-1 font-medium">
                          {isBn ? dua.translations?.bn?.translation || dua.translation : dua.translation}
                        </p>
                        {dua.reference && (
                          <span className="inline-block text-[10px] text-slate-400 font-semibold mt-1">
                            {dua.reference}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="px-4 py-3 sm:px-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
                <span className="text-xs font-bold text-slate-600">
                  {isBn ? `${toBnDigits(selectedCustomZikrs.length)}টি জিকির নির্বাচিত` : `${selectedCustomZikrs.length} Zikrs selected`}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setIsDuaPickerOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#006A4E] text-white text-xs font-extrabold shadow-md hover:bg-[#005840] transition cursor-pointer"
                >
                  {isBn ? 'নিশ্চিত করুন' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM STICKY ACTION AREA */}
        <div className="space-y-3 pt-3 shrink-0">
          <button
            type="button"
            onClick={handleNext}
            className="w-full h-12 rounded-full font-extrabold text-sm text-white flex items-center justify-center gap-2 shadow-md transition active:scale-[0.98] cursor-pointer hover:opacity-95"
            style={{ backgroundColor: activeThemeObj.primary }}
          >
            {step === 0 ? (
              <>
                <span>{isBn ? 'শুরু করুন' : 'Get started'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : isFinishStep ? (
              <>
                <span>{isBn ? 'Zikr+ ব্যবহার শুরু করুন' : 'Start using Zikr+'}</span>
                <Check className="w-4 h-4 stroke-[2.5]" />
              </>
            ) : (
              <>
                <span>{isBn ? 'পরবর্তী' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {step === 0 ? (
            <div className="text-center text-xs font-semibold flex items-center justify-center gap-1.5">
              <span className={subtleTextClass}>
                {isBn ? 'আগে থেকেই অ্যাকাউন্ট আছে?' : 'Already have an account?'}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  onSignIn();
                }}
                className="hover:underline font-extrabold cursor-pointer"
                style={{ color: activeThemeObj.primary }}
              >
                {isBn ? 'সাইন ইন' : 'Sign In'}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleBack}
              className="w-full py-1.5 text-center text-xs font-extrabold hover:opacity-80 transition cursor-pointer"
              style={{ color: activeThemeObj.primary }}
            >
              {isBn ? 'পেছনে যান' : 'Back'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * POST-ONBOARDING INTERACTIVE SPOTLIGHT GUIDED TOUR (Matches Screenshots 10-11)
 * ========================================================================== */

interface GuidedAppTourProps {
  selectedLanguage: ZikrLanguage;
  soundEnabled?: boolean;
  onClose: () => void;
}

export const GuidedAppTour: React.FC<GuidedAppTourProps> = ({
  selectedLanguage,
  soundEnabled = true,
  onClose,
}) => {
  const [tourIndex, setTourIndex] = useState(0);
  const isBn = selectedLanguage === 'bn';

  // Step-by-step hardware Back support inside tour
  useBackLayer(true, onClose, 'guided-tour-root');
  useBackLayer(tourIndex >= 1, () => setTourIndex((i) => Math.max(0, i - 1)), 'guided-tour-step');

  const steps = useMemo(
    () => [
      {
        id: 'amal',
        title: isBn ? 'আমল ও সালাত অগ্রগতি' : 'Amal Progress',
        desc: isBn
          ? 'প্রতিদিনের পাঁচ ওয়াক্ত সালাত ও ইসলামিক আমল সহজে ট্র্যাক করুন এবং অগ্রগতি দেখুন।'
          : 'Track your daily Islamic habits, prayer times, and see your completion rate.',
      },
      {
        id: 'tasbih',
        title: isBn ? 'ডিজিটাল তাসবিহ কাউন্টার' : 'Tasbih Counter',
        desc: isBn
          ? 'স্মার্ট তাসবিহ কাউন্টার, লক্ষ্যমাত্রা ও ভাইব্রেশন ফিডব্যাক দিয়ে সহজে জিকির গণনা করুন।'
          : 'Use the built-in counter to easily track your daily recitations and targets.',
      },
      {
        id: 'quran',
        title: isBn ? 'আল-কুরআন ও তাফসীর' : 'Holy Quran & Tafsir',
        desc: isBn
          ? '১১৪টি সূরা, তাজবীদ কালার, শব্দার্থ, অনুবাদ, তাফসীর ও ক্বারী তিলাওয়াত একসাথে।'
          : 'Read all 114 Surahs with Tajweed highlights, translations, Tafsir, and audio recitation.',
      },
      {
        id: 'seerat',
        title: isBn ? 'সীরাতুন নবী ও নবীজির ২৪ ঘণ্টা' : "Seerat & Prophet's 24 Hours",
        desc: isBn
          ? '৬৩ বছরের সীরাত, বংশতালিকা (ফ্যামিলি ট্রি), হায়াতুস সাহাবা এবং নবীজির ২৪ ঘণ্টার রুটিন।'
          : 'Explore 63-year Seerat-un-Nabi, interactive Family Tree, Hayatus Sahaba & daily Sunnah.',
      },
      {
        id: 'ready',
        title: isBn ? 'অফলাইন ও ক্লাউড সিঙ্ক' : 'Offline Ready & Sync',
        desc: isBn
          ? 'আপনার সব আমল ও বুকমার্ক ডিভাইসে সেভ থাকবে। চাইলে প্রোফাইল থেকে সাইন ইন করে ব্যাকআপ রাখুন।'
          : 'Your progress saves automatically on your device, with optional Profile cloud backup.',
      },
    ],
    [isBn]
  );

  const totalSteps = steps.length;
  const current = steps[tourIndex];
  const progressPct = Math.round(((tourIndex + 1) / totalSteps) * 100);

  const handleNext = () => {
    if (soundEnabled) soundHaptics.playTap();
    if (tourIndex < totalSteps - 1) {
      setTourIndex((i) => i + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (soundEnabled) soundHaptics.playTap();
    if (tourIndex > 0) {
      setTourIndex((i) => i - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[115] bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm space-y-3.5">
        {/* SPOTLIGHT PREVIEW CARD (Mirrors Screenshots 10 & 11) */}
        <div className="rounded-3xl bg-[#fafaf4] border border-[#e7e2cc] p-4 shadow-2xl text-slate-900 overflow-hidden">
          {current.id === 'amal' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold tabular-nums">
                <span>
                  {isBn
                    ? `০/${toBnDigits(DEFAULT_AAMAL_ITEMS.length)} আমল সম্পন্ন`
                    : `0/${DEFAULT_AAMAL_ITEMS.length} amal done`}
                </span>
                <span className="text-slate-500 font-semibold">{isBn ? 'এখন · ১০:৪২ AM' : 'Now · 10:42 AM'}</span>
              </div>
              {/* Curved 5-Prayer Solar Arc Visual */}
              <div className="relative pt-2 pb-1">
                <svg viewBox="0 0 320 110" className="w-full h-24 overflow-visible">
                  <path
                    d="M 28 84 Q 150 -8 292 84"
                    fill="none"
                    stroke="#e2dfd0"
                    strokeWidth="2.5"
                    strokeDasharray="5 5"
                  />
                  <path
                    d="M 28 84 Q 90 36 135 28"
                    fill="none"
                    stroke="#d9a20b"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="135" cy="28" r="10" fill="#fef3c7" />
                  <circle cx="135" cy="28" r="5.5" fill="#d9a20b" />
                  {[
                    { x: 28, y: 84, label: isBn ? 'ফজর' : 'Fajr', val: isBn ? '০/৪' : '0/4' },
                    { x: 158, y: 24, label: isBn ? 'যোহর' : 'Dhuhr', val: isBn ? '০/৬' : '0/6' },
                    { x: 214, y: 38, label: isBn ? 'আসর' : 'Asr', val: isBn ? '০/৪' : '0/4' },
                    { x: 256, y: 60, label: isBn ? 'মাগরিব' : 'Maghrib', val: isBn ? '০/৫' : '0/5' },
                    { x: 292, y: 84, label: isBn ? 'ইশা' : 'Isha', val: isBn ? '০/৮' : '0/8' },
                  ].map((p) => (
                    <g key={p.label}>
                      <circle cx={p.x} cy={p.y} r="17" fill="#ffffff" stroke="#e5e1d2" strokeWidth="2.5" />
                      <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1e293b">
                        {p.val}
                      </text>
                      <text x={p.x} y={p.y + 28} textAnchor="middle" fontSize="9" fontWeight="600" fill="#475569">
                        {p.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d9a20b] text-white text-[11px] font-bold">
                  <ListChecks className="w-3.5 h-3.5" />
                  <span>{isBn ? 'সব আমল' : 'All amal'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-bold">
                  <InfinityIcon className="w-3.5 h-3.5" />
                  <span>{isBn ? 'যেকোনো সময় · ০/৩২' : 'Any time · 0/32'}</span>
                </span>
              </div>
            </div>
          )}

          {current.id === 'tasbih' && (
            <div className="space-y-4 py-1 text-center">
              <div className="inline-block px-5 py-2 rounded-2xl bg-white border border-[#ece6d2] shadow-2xs">
                <div className="text-xs font-extrabold">{isBn ? 'সুবহানাল্লাহ' : 'SubhanAllah'}</div>
                <div className="text-[10px] text-slate-500 font-semibold">{isBn ? '১২টি মাসনুন জিকির' : '12 Daily Zikrs'}</div>
              </div>
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                <svg viewBox="0 0 180 180" className="w-full h-full">
                  <circle cx="90" cy="90" r="82" fill="none" stroke="#f0ebd8" strokeWidth="2" />
                  <circle
                    cx="90"
                    cy="90"
                    r="72"
                    fill="none"
                    stroke="#e3c05e"
                    strokeWidth="2.5"
                    strokeDasharray="2 9.5"
                    strokeLinecap="round"
                  />
                  <circle cx="90" cy="90" r="56" fill="#ffffff" stroke="#ede7d3" strokeWidth="1.5" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black tabular-nums text-[#d9a20b]">
                    {isBn ? '০' : '0'}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    {isBn ? '১০০ এর মধ্যে' : 'of 100'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 px-3 py-2 rounded-full bg-white border border-[#e7e2cc] text-[11px] text-slate-500 text-left font-semibold">
                  {isBn ? 'লক্ষ্য: ১০০ · ৫০০ · ১০০০' : 'Targets: 100 · 500 · 1000'}
                </div>
                <div className="px-3 py-2 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-slate-700 inline-flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  <span>{isBn ? 'রিসেট' : 'Reset'}</span>
                </div>
              </div>
            </div>
          )}

          {current.id === 'quran' && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 text-[#006A4E] flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="font-arabic text-xl font-bold text-[#006A4E]">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </div>
              <p className="text-xs text-slate-600 font-semibold">
                {isBn
                  ? 'পরম করুণাময় অসীম দয়ালু আল্লাহর নামে শুরু করছি'
                  : 'In the name of Allah, the Entirely Merciful, the Especially Merciful'}
              </p>
              <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-emerald-700">
                <span>{isBn ? '১১৪ সূরা' : '114 Surahs'}</span>
                <span>·</span>
                <span>{isBn ? 'তাজবীদ' : 'Tajweed'}</span>
                <span>·</span>
                <span>{isBn ? 'তাফসীর ও অডিও' : 'Tafsir & Audio'}</span>
              </div>
            </div>
          )}

          {current.id === 'seerat' && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-sm font-black text-slate-900">
                {isBn ? 'সীরাতুন নবী ﷺ · ফ্যামিলি ট্রি · ২৪ ঘণ্টা' : "Seerat-un-Nabi ﷺ · Family Tree · 24 Hours"}
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {isBn
                  ? 'নবীজির ৬৩ বছরের জীবনী, ৪৭ জন নিকটজনের বংশতালিকা, সাহাবায়ে কেরাম ও সুন্নাহ রুটিন।'
                  : 'Authentic 63-year Seerah, 47-member interactive Family Tree, Sahaba & daily Sunnah.'}
              </p>
            </div>
          )}

          {current.id === 'ready' && (
            <div className="space-y-3 py-2 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-sm font-black text-slate-900">
                {isBn ? 'সবকিছু প্রস্তুত!' : 'Everything is ready!'}
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {isBn
                  ? 'অফলাইনেও নিরবচ্ছিন্ন ব্যবহার করুন এবং প্রতিটি পেজ থেকে ধাপে ধাপে ব্যাক করুন।'
                  : 'Works seamlessly offline with automatic saving and step-by-step back navigation.'}
              </p>
            </div>
          )}
        </div>

        {/* BOTTOM TOOLTIP DIALOG (Mirrors Screenshots 10 & 11) */}
        <div className="rounded-3xl bg-white p-5 shadow-2xl text-slate-900 space-y-3.5 border border-[var(--app-border,#e2e8f0)]">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm sm:text-base font-extrabold text-[var(--app-primary,#006A4E)]">
              {current.title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1 -mr-1 -mt-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label={isBn ? 'বন্ধ করুন' : 'Close'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
            {current.desc}
          </p>

          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-slate-500 tabular-nums">
              {isBn
                ? `${toBnDigits(tourIndex + 1)} / ${toBnDigits(totalSteps)}`
                : `${tourIndex + 1} of ${totalSteps}`}
            </div>
            <div className="h-1 w-full rounded-full bg-[var(--app-surface-soft,#e9f6ef)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--app-primary,#006A4E)] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1.5 text-xs font-extrabold text-[var(--app-primary,#006A4E)] hover:opacity-80 transition cursor-pointer"
            >
              {isBn ? 'এড়িয়ে যান' : 'Skip'}
            </button>

            <div className="flex items-center gap-2">
              {tourIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-3 py-2 text-xs font-extrabold text-[var(--app-primary,#006A4E)] hover:bg-[var(--app-surface-soft,#e9f6ef)] rounded-full transition cursor-pointer"
                >
                  {isBn ? 'আগেরটি' : 'Previous'}
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 rounded-full text-xs font-extrabold text-white transition active:scale-95 cursor-pointer shadow-sm bg-[var(--app-primary,#006A4E)] hover:bg-[var(--app-primary-dark,#00523c)]"
              >
                {tourIndex === totalSteps - 1
                  ? isBn ? 'শুরু করুন' : 'Done'
                  : isBn ? 'পরবর্তী' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
