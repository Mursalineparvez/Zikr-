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
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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

  // Carousel Slide State (3 slides matching reference design)
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
      title: 'Revealed',
      titleBn: 'আল-কুরআনুল কারীম',
      subtitleEn: 'Understand the Quran, verse by verse',
      subtitleBn: 'পবিত্র কুরআন ও সহীহ হাদিস, আয়াত ও শব্দের গভীর আলোকবর্তিকা',
      badge: 'Al-Quran & Tafsir',
    },
    {
      id: 1,
      title: 'Zikr+',
      titleBn: 'যিকির ও ডিজিটাল তাসবীহ',
      subtitleEn: 'Find pure peace & tranquility in daily remembrance',
      subtitleBn: 'প্রশান্তিময় প্রাত্যহিক যিকির, নূরানি তাসবীহ ও আত্মশুদ্ধি',
      badge: 'Daily Dhikr & Tasbeeh',
    },
    {
      id: 2,
      title: 'Sunnah Life',
      titleBn: 'সুন্নাহ ও প্রাত্যহিক রুটিন',
      subtitleEn: '24-Hour Prophetic routines, Salah & authentic duas',
      subtitleBn: 'নবীজির ২৪ ঘণ্টার আমল, সালাত ও নির্ভরযোগ্য মাসনূন দুআ',
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

  // Complete onboarding and enter app
  const completeOnboardingAndDismiss = () => {
    try {
      localStorage.setItem('zikrmate_onboarding_completed', 'true');
    } catch {}
    if (soundEnabled) soundHaptics.playTap();
    onClose();
  };

  // 1. Google 1-Tap Sign In
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

        if (cloudData && cloudData.foundInCloud) {
          if (onCloudDataLoaded) {
            onCloudDataLoaded(cloudData, targetEmail);
          }
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
        // Redirecting to Google OAuth
        return;
      } else {
        setErrorMessage(
          isBn
            ? result.error || 'গুগল সাইন-ইন সম্পন্ন হয়নি। দয়া করে আবার চেষ্টা করুন বা ইমেইল দিয়ে লগইন করুন।'
            : result.error || 'Google Sign-in was cancelled. Please try again or sign in with Email.'
        );
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error. Please try again.');
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  // 2. Email Sign In
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim()) {
      setErrorMessage(isBn ? 'অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড প্রদান করুন।' : 'Please enter your email and password.');
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
            ? 'ইমেইল বা পাসওয়ার্ড সঠিক নয়। দয়া করে সঠিক পাসওয়ার্ড দিন অথবা নতুন একাউন্ট তৈরি করুন।'
            : 'Incorrect email or password. Please verify your credentials or create a new account.'
        );
        setIsSubmitting(false);
        return;
      }

      // Successful sign in
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

  // 3. Email Sign Up
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim() || !nameInput.trim()) {
      setErrorMessage(isBn ? 'সকল তথ্য পূরণ করা আবশ্যক।' : 'All fields are required.');
      return;
    }

    if (passwordInput.length < 6) {
      setErrorMessage(isBn ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' : 'Password must be at least 6 characters.');
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

      // Save initial state to cloud
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
    <div className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden select-none bg-[#02161a]">
      {/* 1. Atmospheric Photographic Background matching user's image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat transition-transform duration-1000 scale-100"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(2, 22, 26, 0.45) 40%, rgba(1, 14, 17, 0.94) 72%, #010e11 100%), url('/assets/onboarding_bg.jpg')`,
        }}
      />

      {/* Subtle Warm Amber & Emerald Light Overlay */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* 2. Top Header Bar: Language Switcher & Skip/Close Button */}
      <div className="relative z-10 px-4 sm:px-6 pt-safe pt-4 pb-2 flex items-center justify-between">
        {/* Language Switcher Pill */}
        <button
          type="button"
          onClick={() => {
            const nextLang: ZikrLanguage = selectedLanguage === 'bn' ? 'en' : 'bn';
            onSelectLanguage(nextLang);
            if (soundEnabled) soundHaptics.playTap();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white text-xs font-bold backdrop-blur-md transition active:scale-95 cursor-pointer shadow-md"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-300" />
          <span>{selectedLanguage === 'bn' ? 'বাংলা (BN)' : 'English (EN)'}</span>
        </button>

        {/* Skip / Close Button */}
        <button
          type="button"
          onClick={completeOnboardingAndDismiss}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white/90 hover:text-white text-xs font-semibold backdrop-blur-md transition active:scale-95 cursor-pointer shadow-md"
          title={isBn ? 'স্কিপ করুন' : 'Skip for now'}
        >
          <span>{isBn ? 'স্কিপ করুন' : 'Skip'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3. Middle Section: Carousel Content or Inline Sign In Panels */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 sm:px-8 pb-3 max-w-md mx-auto w-full">
        {authMode === 'welcome' && (
          <div className="text-center space-y-4 animate-in fade-in duration-300">
            {/* Interactive Carousel Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mb-2">
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
                      isActive ? 'w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                );
              })}
            </div>

            {/* Slide Title - Exact Serif Typography from User's Reference Screenshot */}
            <h1
              className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight drop-shadow-md transition-all duration-300"
              style={{ fontFamily: "'Playfair Display', Georgia, Cambria, serif" }}
            >
              {isBn ? curSlide.titleBn : curSlide.title}
            </h1>

            {/* Subtitle Tagline */}
            <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed max-w-xs mx-auto drop-shadow-xs">
              {isBn ? curSlide.subtitleBn : curSlide.subtitleEn}
            </p>
          </div>
        )}

        {/* Inline Email Sign-In Form */}
        {authMode === 'email-signin' && (
          <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-5 text-white space-y-3.5 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <h3 className="text-lg font-bold text-white">
                {isBn ? 'ইমেইল দিয়ে সাইন ইন' : 'Sign in with Email'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('welcome');
                  setErrorMessage(null);
                }}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMessage && (
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleEmailSignIn} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-emerald-200/90 mb-1">
                  {isBn ? 'ইমেইল এড্রেস' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full bg-white/10 border border-white/20 focus:border-emerald-400 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-emerald-200/90 mb-1">
                  {isBn ? 'পাসওয়ার্ড' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/10 border border-white/20 focus:border-emerald-400 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{isBn ? 'যাচাই করা হচ্ছে...' : 'Signing in...'}</span>
                  </>
                ) : (
                  <span>{isBn ? 'লগইন করুন' : 'Sign In'}</span>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between text-xs text-white/80 pt-1">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('email-signup');
                  setErrorMessage(null);
                }}
                className="hover:text-emerald-300 underline font-medium cursor-pointer"
              >
                {isBn ? 'নতুন একাউন্ট খুলুন' : 'Create new account'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('welcome');
                  setErrorMessage(null);
                }}
                className="hover:text-white cursor-pointer"
              >
                {isBn ? 'অন্যান্য উপায়' : 'Other options'}
              </button>
            </div>
          </div>
        )}

        {/* Inline Email Sign-Up Form */}
        {authMode === 'email-signup' && (
          <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-5 text-white space-y-3 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <h3 className="text-lg font-bold text-white">
                {isBn ? 'নতুন একাউন্ট নিবন্ধন' : 'Create an Account'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('welcome');
                  setErrorMessage(null);
                }}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMessage && (
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleEmailSignUp} className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-emerald-200/90 mb-1">
                  {isBn ? 'আপনার পূর্ণ নাম' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder={isBn ? 'মুহাম্মদ' : 'Muhammad'}
                    className="w-full bg-white/10 border border-white/20 focus:border-emerald-400 rounded-xl pl-10 pr-3.5 py-2 text-sm text-white placeholder-white/40 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-emerald-200/90 mb-1">
                  {isBn ? 'ইমেইল এড্রেস' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full bg-white/10 border border-white/20 focus:border-emerald-400 rounded-xl pl-10 pr-3.5 py-2 text-sm text-white placeholder-white/40 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-emerald-200/90 mb-1">
                  {isBn ? 'পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)' : 'Password (min 6 chars)'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/10 border border-white/20 focus:border-emerald-400 rounded-xl pl-10 pr-10 py-2 text-sm text-white placeholder-white/40 focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{isBn ? 'নিবন্ধন করা হচ্ছে...' : 'Registering...'}</span>
                  </>
                ) : (
                  <span>{isBn ? 'একাউন্ট তৈরি করুন' : 'Create Account'}</span>
                )}
              </button>
            </form>

            <div className="text-center text-xs text-white/80 pt-1">
              <span>{isBn ? 'ইতিমধ্যে একাউন্ট আছে?' : 'Already have an account?'} </span>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('email-signin');
                  setErrorMessage(null);
                }}
                className="hover:text-emerald-300 underline font-semibold cursor-pointer"
              >
                {isBn ? 'সাইন ইন করুন' : 'Sign in'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Action Buttons: Pixel-Perfect to Reference Screenshot */}
      {authMode === 'welcome' && (
        <div className="relative z-10 px-6 sm:px-8 pb-safe pb-6 pt-2 max-w-md mx-auto w-full space-y-3.5">
          {errorMessage && (
            <div className="flex items-start gap-2 p-2.5 rounded-2xl bg-rose-500/25 border border-rose-400/40 text-rose-200 text-xs shadow-lg backdrop-blur-md">
              <AlertCircle className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Primary Action Button: [Google Icon] Sign in with Google */}
          <button
            type="button"
            disabled={isLoadingGoogle}
            onClick={handleGoogleSignIn}
            className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-60"
          >
            {isLoadingGoogle ? (
              <>
                <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                <span>{isBn ? 'গুগল সাইন-ইন হচ্ছে...' : 'Signing in with Google...'}</span>
              </>
            ) : (
              <>
                <GoogleIcon />
                <span>{isBn ? 'Sign in with Google' : 'Sign in with Google'}</span>
              </>
            )}
          </button>

          {/* Divider with 'or' */}
          <div className="flex items-center gap-3 text-xs text-white/50 select-none">
            <div className="flex-1 h-[1px] bg-white/20" />
            <span className="font-medium tracking-wider lowercase">or</span>
            <div className="flex-1 h-[1px] bg-white/20" />
          </div>

          {/* Secondary Action Button: Sign in with Email (Glass Outline Pill) */}
          <button
            type="button"
            onClick={() => {
              setAuthMode('email-signin');
              setErrorMessage(null);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className="w-full py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/60 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-md shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>{isBn ? 'Sign in with Email' : 'Sign in with Email'}</span>
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
              className="text-white/80 hover:text-white font-semibold text-xs tracking-wide transition underline-offset-4 hover:underline cursor-pointer"
            >
              {isBn ? 'Create Account' : 'Create Account'}
            </button>
          </div>

          {/* Bottom Guest / Direct Access Link (like Bayyinah account in screenshot) */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={completeOnboardingAndDismiss}
              className="text-emerald-300/80 hover:text-emerald-200 text-xs font-semibold tracking-wide transition cursor-pointer flex items-center justify-center gap-1 mx-auto"
            >
              <span>{isBn ? 'গেস্ট হিসেবে প্রবেশ করুন (Continue as Guest)' : 'Continue as Guest'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
