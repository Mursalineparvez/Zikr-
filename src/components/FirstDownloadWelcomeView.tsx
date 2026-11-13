import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Globe,
  Loader2,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, ZikrLanguage, ZikrItem, HistorySession } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import {
  signInWithGoogleAuth,
  loadUserDataFromCloud,
  checkUserExistsInCloud,
  verifyUserCloudPassword,
  saveUserDataToCloud,
  CloudZikrState,
} from '../services/firebase';
import { findSavedAccount, saveAccountToRegistry } from '../utils/accountRegistry';
import { getDetectedDeviceInfo } from '../utils/deviceInfo';

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

interface FirstDownloadWelcomeViewProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: ZikrLanguage;
  onSelectLanguage: (lang: ZikrLanguage) => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onCloudDataLoaded?: (data: CloudZikrState, emailKey: string) => void;
  zikrs: ZikrItem[];
  historySessions: HistorySession[];
  lifetimeTotalCount: number;
  soundEnabled: boolean;
}

export const FirstDownloadWelcomeView: React.FC<FirstDownloadWelcomeViewProps> = ({
  isOpen,
  onClose,
  selectedLanguage = 'bn',
  onSelectLanguage,
  userProfile,
  onUpdateProfile,
  onCloudDataLoaded,
  zikrs,
  historySessions,
  lifetimeTotalCount,
  soundEnabled,
}) => {
  const isBn = selectedLanguage === 'bn';
  const isAr = selectedLanguage === 'ar';

  // Carousel Slide State (3 slides)
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Authentication Flow Modals inside Onboarding
  const [authMode, setAuthMode] = useState<'welcome' | 'email-signin' | 'email-signup'>('welcome');
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const SLIDES = [
    {
      id: 0,
      title: 'Al-Quran Al-Kareem',
      titleBn: 'আল-কুরআনুল কারীম',
      titleAr: 'القرآن الكريم',
      subtitleEn: 'Understand the Quran, verse by verse with tafsir',
      subtitleBn: 'পবিত্র কুরআন ও সহীহ হাদিস, আয়াত ও শব্দের গভীর আলোকবর্তিকা',
      subtitleAr: 'فهم القرآن الكريم آية بآية مع التفسير والترجمة',
      badge: 'Al-Quran & Tafsir',
    },
    {
      id: 1,
      title: 'Zikr & Digital Tasbeeh',
      titleBn: 'যিকির ও ডিজিটাল তাসবীহ',
      titleAr: 'الذكر والتسبيح الرقمي',
      subtitleEn: 'Find pure peace & tranquility in daily remembrance',
      subtitleBn: 'প্রশান্তিময় প্রাত্যহিক যিকির, নূরানি তাসবীহ ও আত্মশুদ্ধি',
      subtitleAr: 'أوجد السكينة والاطمئنان في ذكر الله اليومي والتسبيح',
      badge: 'Daily Dhikr & Tasbeeh',
    },
    {
      id: 2,
      title: 'Sunnah Life & Routine',
      titleBn: 'নবীজির ২৪ ঘণ্টা ও সুন্নাহ',
      titleAr: 'السنة النبوية والروتين',
      subtitleEn: '24-Hour Prophetic routines, Salah & authentic duas',
      subtitleBn: 'নবীজির ২৪ ঘণ্টার আমল, সালাত ও নির্ভরযোগ্য মাসনূন দুআ',
      subtitleAr: 'روتين النبي صلى الله عليه وسلم والأدعية الصحيحة',
      badge: 'Prophetic Routine',
    },
  ];

  // Auto-advance slides every 5 seconds when in welcome mode
  useEffect(() => {
    if (!isOpen || authMode !== 'welcome') {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
      return;
    }

    slideTimerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isOpen, authMode]);

  if (!isOpen) return null;

  const completeOnboardingAndDismiss = () => {
    try {
      localStorage.setItem('zikrmate_onboarding_completed', 'true');
    } catch {}
    if (soundEnabled) soundHaptics.playTap();
    onClose();
  };

  const handleGoogleSignIn = async () => {
    setIsLoadingGoogle(true);
    setErrorMessage(null);
    if (soundEnabled) soundHaptics.playTap();

    try {
      const result = await signInWithGoogleAuth();
      if (result.success && result.user && result.user.email) {
        const targetEmail = result.user.email.toLowerCase().trim();
        const cloudData = await loadUserDataFromCloud(targetEmail);
        const existing = findSavedAccount(targetEmail);
        const detected = getDetectedDeviceInfo();

        const updated: UserProfile = {
          name: result.user.name || cloudData?.profile?.name || existing?.name || targetEmail.split('@')[0],
          emailOrPhone: targetEmail,
          photoUrl: result.user.photoUrl || cloudData?.profile?.photoUrl || existing?.photoUrl || '',
          location: existing?.location || userProfile.location || 'Bangladesh',
          deviceModel: detected.model,
          osVersion: detected.osVersion,
          isSignedIn: true,
          isVerified: true,
          verificationMethod: 'google',
          verificationDate: new Date().toISOString(),
          authProvider: 'google',
          lastSyncedAt: Date.now(),
        };

        saveAccountToRegistry(updated);
        onUpdateProfile(updated);

        if (cloudData && cloudData.foundInCloud && onCloudDataLoaded) {
          onCloudDataLoaded(cloudData, targetEmail);
        } else {
          const localSum = zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
          if (localSum > 0 || lifetimeTotalCount > 0) {
            saveUserDataToCloud(targetEmail, updated, zikrs, historySessions, lifetimeTotalCount, undefined, {}).catch(() => {});
          } else if (onCloudDataLoaded) {
            onCloudDataLoaded({ foundInCloud: false }, targetEmail);
          }
        }

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#34d399', '#f59e0b', '#38bdf8'],
          });
        } catch {}

        if (soundEnabled) soundHaptics.playMilestone();
        completeOnboardingAndDismiss();
      } else if (result.isRedirecting) {
        return;
      } else {
        setErrorMessage(
          isBn
            ? result.error || 'গুগল সাইন-ইন সম্পন্ন হয়নি। দয়া করে আবার চেষ্টা করুন।'
            : isAr
              ? result.error || 'فشل تسجيل الدخول بواسطة جوجل. يجيب المحاولة مرة أخرى.'
              : result.error || 'Google Sign-in was cancelled. Please try again.'
        );
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error. Please try again.');
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim()) {
      setErrorMessage(
        isBn
          ? 'অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড প্রদান করুন।'
          : isAr
            ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور.'
            : 'Please enter your email and password.'
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const targetEmail = emailInput.trim().toLowerCase();

    try {
      const cloudCheck = await verifyUserCloudPassword(targetEmail, passwordInput);
      const existing = findSavedAccount(targetEmail);

      let isSuccess = false;
      let matchedName = targetEmail.split('@')[0];

      if (cloudCheck.passwordMatches) {
        isSuccess = true;
        if (cloudCheck.userProfile?.name) matchedName = cloudCheck.userProfile.name;
        else if (cloudCheck.cloudData?.profile?.name) matchedName = cloudCheck.cloudData.profile.name;
      } else if (existing?.password && existing.password === passwordInput) {
        isSuccess = true;
        matchedName = existing.name || matchedName;
      }

      if (!isSuccess) {
        setErrorMessage(
          isBn
            ? 'ইমেইল বা পাসওয়ার্ড সঠিক নয়। দয়া করে সঠিক পাসওয়ার্ড দিন।'
            : isAr
              ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.'
              : 'Incorrect email or password. Please verify your credentials.'
        );
        setIsSubmitting(false);
        return;
      }

      const detected = getDetectedDeviceInfo();
      const cloudData = await loadUserDataFromCloud(targetEmail);

      const updated: UserProfile = {
        name: matchedName,
        emailOrPhone: targetEmail,
        photoUrl: existing?.photoUrl || cloudData?.profile?.photoUrl || '',
        location: existing?.location || userProfile.location || 'Bangladesh',
        deviceModel: detected.model,
        osVersion: detected.osVersion,
        isSignedIn: true,
        isVerified: true,
        verificationMethod: 'email',
        verificationDate: new Date().toISOString(),
        authProvider: 'email',
        lastSyncedAt: Date.now(),
      };

      saveAccountToRegistry(updated);
      onUpdateProfile(updated);

      if (cloudData && cloudData.foundInCloud && onCloudDataLoaded) {
        onCloudDataLoaded(cloudData, targetEmail);
      }

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#006A4E', '#10b981', '#f59e0b'],
        });
      } catch {}

      if (soundEnabled) soundHaptics.playMilestone();
      completeOnboardingAndDismiss();
    } catch (err: any) {
      setErrorMessage(err.message || 'Login error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim() || !nameInput.trim()) {
      setErrorMessage(
        isBn
          ? 'সকল তথ্য পূরণ করা আবশ্যক।'
          : isAr
            ? 'جميع الحقول مطلوبة.'
            : 'All fields are required.'
      );
      return;
    }

    if (passwordInput.length < 6) {
      setErrorMessage(
        isBn
          ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।'
          : isAr
            ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.'
            : 'Password must be at least 6 characters.'
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const targetEmail = emailInput.trim().toLowerCase();

    try {
      const exists = await checkUserExistsInCloud(targetEmail);
      if (exists) {
        setErrorMessage(
          isBn
            ? 'এই ইমেইল দিয়ে ইতিপূর্বেই একটি একাউন্ট খোলা আছে। অনুগ্রহ করে সাইন-ইন করুন।'
            : isAr
              ? 'هذا البريد مسجل مسبقاً. يرجى تسجيل الدخول.'
              : 'An account with this email already exists. Please sign in.'
        );
        setIsSubmitting(false);
        return;
      }

      const detected = getDetectedDeviceInfo();
      const updated: UserProfile = {
        name: nameInput.trim(),
        emailOrPhone: targetEmail,
        password: passwordInput,
        photoUrl: '',
        location: userProfile.location || 'Bangladesh',
        deviceModel: detected.model,
        osVersion: detected.osVersion,
        isSignedIn: true,
        isVerified: true,
        verificationMethod: 'email',
        verificationDate: new Date().toISOString(),
        authProvider: 'email',
        lastSyncedAt: Date.now(),
      };

      saveAccountToRegistry(updated);
      onUpdateProfile(updated);

      saveUserDataToCloud(targetEmail, updated, zikrs, historySessions, lifetimeTotalCount, undefined, {}).catch(() => {});

      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#006A4E', '#f59e0b', '#38bdf8'],
        });
      } catch {}

      if (soundEnabled) soundHaptics.playMilestone();
      completeOnboardingAndDismiss();
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const curSlide = SLIDES[activeSlide];

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden select-none bg-[#011014]"
    >
      {/* 1. Stunning Atmospheric Background with Multi-layer Glow & Islamic Motif */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(1, 16, 20, 0.45) 0%, rgba(1, 14, 18, 0.75) 50%, rgba(1, 10, 13, 0.96) 80%, #01080a 100%), url('/assets/onboarding_bg.jpg')`,
        }}
      />

      {/* Radiant Glowing Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-emerald-500/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-500/15 blur-[90px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-teal-500/15 blur-[90px] pointer-events-none" />

      {/* 2. Top Header Bar: Language Switcher & Skip/Close Button */}
      <div className="relative z-10 px-5 sm:px-8 pt-safe pt-5 pb-2 flex items-center justify-between">
        {/* Language Switcher Pill */}
        <button
          type="button"
          onClick={() => {
            const nextLang: ZikrLanguage = selectedLanguage === 'bn' ? 'ar' : selectedLanguage === 'ar' ? 'en' : 'bn';
            onSelectLanguage(nextLang);
            if (soundEnabled) soundHaptics.playTap();
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/50 hover:bg-black/70 border border-emerald-500/30 text-white text-xs font-bold backdrop-blur-md transition active:scale-95 cursor-pointer shadow-lg"
        >
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>{selectedLanguage === 'bn' ? 'বাংলা (BN)' : selectedLanguage === 'ar' ? 'العربية (AR)' : 'English (EN)'}</span>
        </button>

        {/* Skip / Close Button */}
        <button
          type="button"
          onClick={completeOnboardingAndDismiss}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/50 hover:bg-black/70 border border-emerald-500/30 text-emerald-200 hover:text-white text-xs font-bold backdrop-blur-md transition active:scale-95 cursor-pointer shadow-lg"
          title={isBn ? 'স্কিপ করুন' : isAr ? 'تخطي' : 'Skip'}
        >
          <span>{isBn ? 'স্কিপ করুন' : isAr ? 'تخطي' : 'Skip'}</span>
          <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* 3. Middle Section: Carousel Content or Inline Sign In Panels */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-8 max-w-lg mx-auto w-full">
        {authMode === 'welcome' && (
          <div className="text-center space-y-6 animate-in fade-in duration-300 py-6">
            {/* Ornate Islamic Star / Crescent Badge */}
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500/30 via-emerald-600/20 to-amber-500/20 border border-emerald-400/40 backdrop-blur-xl flex items-center justify-center shadow-2xl ring-4 ring-emerald-500/10">
              <span className="text-3xl filter drop-shadow-[0_2px_8px_rgba(16,185,129,0.5)]">☪</span>
            </div>

            {/* Interactive Carousel Pagination Dots */}
            <div className="flex items-center justify-center gap-2">
              {SLIDES.map((slide, idx) => {
                const isActive = activeSlide === idx;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => {
                      setActiveSlide(idx);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`h-2 transition-all rounded-full cursor-pointer ${
                      isActive ? 'w-8 bg-emerald-400 shadow-[0_0_12px_#34d399]' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                );
              })}
            </div>

            {/* Slide Title - Magnisicent Serif Typography */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-white tracking-tight drop-shadow-lg transition-all duration-300 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, Cambria, serif" }}
            >
              {isBn ? curSlide.titleBn : isAr ? curSlide.titleAr : curSlide.title}
            </h1>

            {/* Subtitle Tagline */}
            <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 font-medium leading-relaxed max-w-md mx-auto drop-shadow-sm px-2">
              {isBn ? curSlide.subtitleBn : isAr ? curSlide.subtitleAr : curSlide.subtitleEn}
            </p>
          </div>
        )}

        {/* Inline Email Sign-In Form */}
        {authMode === 'email-signin' && (
          <div className="bg-[#041a1f]/90 backdrop-blur-2xl border border-emerald-500/40 rounded-[32px] p-6 text-white space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔐</span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {isBn ? 'ইমেইল দিয়ে সাইন ইন' : isAr ? 'تسجيل الدخول بالبريد' : 'Sign in with Email'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('welcome');
                  setErrorMessage(null);
                }}
                className="p-2 rounded-2xl text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMessage && (
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleEmailSignIn} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">
                  {isBn ? 'ইমেইল এড্রেস' : isAr ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-emerald-400/70 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full bg-black/40 border border-emerald-500/30 focus:border-emerald-400 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">
                  {isBn ? 'পাসওয়ার্ড' : isAr ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-emerald-400/70 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-emerald-500/30 focus:border-emerald-400 rounded-2xl pl-11 pr-11 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{isBn ? 'যাচাই করা হচ্ছে...' : isAr ? 'جاري التحقق...' : 'Signing in...'}</span>
                  </>
                ) : (
                  <span>{isBn ? 'লগইন করুন' : isAr ? 'تسجيل الدخول' : 'Sign In'}</span>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between text-xs text-emerald-200/90 pt-2 border-t border-emerald-500/20">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('email-signup');
                  setErrorMessage(null);
                }}
                className="hover:text-white underline font-bold cursor-pointer"
              >
                {isBn ? 'নতুন একাউন্ট খুলুন' : isAr ? 'إنشاء حساب جديد' : 'Create new account'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('welcome');
                  setErrorMessage(null);
                }}
                className="hover:text-white font-semibold cursor-pointer"
              >
                {isBn ? 'অন্যান্য উপায়' : isAr ? 'خيارات أخرى' : 'Other options'}
              </button>
            </div>
          </div>
        )}

        {/* Inline Email Sign-Up Form */}
        {authMode === 'email-signup' && (
          <div className="bg-[#041a1f]/90 backdrop-blur-2xl border border-emerald-500/40 rounded-[32px] p-6 text-white space-y-3.5 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {isBn ? 'নতুন একাউন্ট নিবন্ধন' : isAr ? 'إنشاء حساب جديد' : 'Create an Account'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('welcome');
                  setErrorMessage(null);
                }}
                className="p-2 rounded-2xl text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMessage && (
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleEmailSignUp} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">
                  {isBn ? 'আপনার পূর্ণ নাম' : isAr ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-emerald-400/70 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder={isBn ? 'মুহাম্মদ' : isAr ? 'محمد' : 'Muhammad'}
                    className="w-full bg-black/40 border border-emerald-500/30 focus:border-emerald-400 rounded-2xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">
                  {isBn ? 'ইমেইল এড্রেস' : isAr ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-emerald-400/70 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full bg-black/40 border border-emerald-500/30 focus:border-emerald-400 rounded-2xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">
                  {isBn ? 'পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)' : isAr ? 'كلمة المرور (6 أحرف على الأقل)' : 'Password (min 6 chars)'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-emerald-400/70 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-emerald-500/30 focus:border-emerald-400 rounded-2xl pl-11 pr-11 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{isBn ? 'নিবন্ধন করা হচ্ছে...' : isAr ? 'جاري التسجيل...' : 'Registering...'}</span>
                  </>
                ) : (
                  <span>{isBn ? 'একাউন্ট তৈরি করুন' : isAr ? 'إنشاء الحساب' : 'Create Account'}</span>
                )}
              </button>
            </form>

            <div className="text-center text-xs text-emerald-200/90 pt-2 border-t border-emerald-500/20">
              <span>{isBn ? 'ইতিমধ্যে একাউন্ট আছে?' : isAr ? 'لديك حساب بالفعل؟' : 'Already have an account?'} </span>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('email-signin');
                  setErrorMessage(null);
                }}
                className="hover:text-white underline font-bold cursor-pointer"
              >
                {isBn ? 'সাইন ইন করুন' : isAr ? 'تسجيل الدخول' : 'Sign in'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Action Buttons: Perfectly localized to selectedLanguage */}
      {authMode === 'welcome' && (
        <div className="relative z-10 px-6 sm:px-8 pb-safe pb-8 pt-4 max-w-md mx-auto w-full space-y-3.5">
          {errorMessage && (
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-500/25 border border-rose-400/40 text-rose-200 text-xs font-semibold shadow-xl backdrop-blur-md">
              <AlertCircle className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Primary Action Button: [Google Icon] Sign in with Google */}
          <button
            type="button"
            disabled={isLoadingGoogle}
            onClick={handleGoogleSignIn}
            className="w-full py-4 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-60 ring-2 ring-white/50"
          >
            {isLoadingGoogle ? (
              <>
                <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                <span>{isBn ? 'গুগল সাইন-ইন হচ্ছে...' : isAr ? 'جاري تسجيل الدخول...' : 'Signing in with Google...'}</span>
              </>
            ) : (
              <>
                <GoogleIcon />
                <span>
                  {isBn
                    ? 'গুগল দিয়ে সাইন ইন'
                    : isAr
                      ? 'التسجيل بواسطة جوجل'
                      : 'Sign in with Google'}
                </span>
              </>
            )}
          </button>

          {/* Divider with 'or' */}
          <div className="flex items-center gap-3 text-xs text-white/50 select-none px-4">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="font-bold tracking-wider uppercase text-[11px] text-emerald-200/80">
              {isBn ? 'অথবা' : isAr ? 'أو' : 'or'}
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          {/* Secondary Action Button: Sign in with Email (Glass Outline Pill) */}
          <button
            type="button"
            onClick={() => {
              setAuthMode('email-signin');
              setErrorMessage(null);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className="w-full py-4 px-6 rounded-full bg-black/40 hover:bg-black/60 border-2 border-emerald-400/60 text-emerald-100 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-xl shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Mail className="w-5 h-5 text-emerald-400" />
            <span>
              {isBn
                ? 'ইমেইল দিয়ে সাইন ইন'
                : isAr
                  ? 'تسجيل الدخول بالبريد'
                  : 'Sign in with Email'}
            </span>
          </button>

          {/* Create Account Link */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => {
                setAuthMode('email-signup');
                setErrorMessage(null);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="text-white/80 hover:text-white font-bold text-xs tracking-wide transition underline-offset-4 hover:underline cursor-pointer"
            >
              {isBn
                ? 'নতুন একাউন্ট তৈরি করুন'
                : isAr
                  ? 'إنشاء حساب جديد'
                  : 'Create Account'}
            </button>
          </div>

          {/* Bottom Guest / Direct Access Link */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={completeOnboardingAndDismiss}
              className="text-emerald-300 hover:text-emerald-200 text-xs font-bold tracking-wide transition cursor-pointer flex items-center justify-center gap-1.5 mx-auto py-1 px-3 rounded-full hover:bg-emerald-500/10"
            >
              <span>
                {isBn
                  ? 'গেস্ট হিসেবে প্রবেশ করুন (Continue as Guest)'
                  : isAr
                    ? 'المتابعة كضيف (Continue as Guest)'
                    : 'Continue as Guest'}
              </span>
              <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
