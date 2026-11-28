/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Check,
  Phone,
  Camera,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, ZikrLanguage, ZikrItem, HistorySession } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import {
  signInWithGoogleAuth,
  loadUserDataFromCloud,
  saveUserDataToCloud,
  mergeCloudZikrStates,
  CloudZikrState,
} from '../services/firebase';
import {
  signupWithEmailSession,
  loginWithEmailSession,
  loginWithGoogleTokenSession,
} from '../services/authClient';
import { mergeSavedHighlights } from '../utils/savedItems';
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

const COUNTRY_CODES = [
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+1', flag: '🇺🇸', name: 'USA / Canada' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
];

interface FirstDownloadWelcomeViewProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: ZikrLanguage;
  onSelectLanguage: (lang: ZikrLanguage) => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile, preloadedCloudData?: CloudZikrState) => void | Promise<void>;
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

  const [authMode, setAuthMode] = useState<'welcome' | 'signin' | 'signup' | 'profile_setup'>('welcome');
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [googlePopupBlockedInIframe, setGooglePopupBlockedInIframe] = useState(false);
  const [googleUnauthorizedHost, setGoogleUnauthorizedHost] = useState<string | null>(null);

  // Form Fields
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+880');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [profileSetupStep, setProfileSetupStep] = useState<1 | 2 | 3>(1);
  const [profileGender, setProfileGender] = useState('Male');
  const [profileDob, setProfileDob] = useState('1995-01-01');
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    setGooglePopupBlockedInIframe(false);
    setGoogleUnauthorizedHost(null);
    if (soundEnabled) soundHaptics.playTap();

    try {
      const result = await signInWithGoogleAuth();
      if (result.success && result.user && result.user.email) {
        const targetEmail = result.user.email.toLowerCase().trim();
        const detected = getDetectedDeviceInfo();
        let serverAuth: Awaited<ReturnType<typeof loginWithGoogleTokenSession>> | null = null;
        if (result.user.idToken) {
          serverAuth = await loginWithGoogleTokenSession({
            idToken: result.user.idToken,
            device: detected.model,
            location: userProfile.location || detected.location,
          });
        }
        const cloudData = await loadUserDataFromCloud(targetEmail);
        const existing = findSavedAccount(targetEmail);

        const srvUser = serverAuth?.data?.user;
        const srvProfile = serverAuth?.data?.profile;
        const srvData = serverAuth?.data?.userData;

        const updated: UserProfile = {
          name: srvUser?.name || result.user.name || cloudData?.profile?.name || existing?.name || targetEmail.split('@')[0],
          emailOrPhone: targetEmail,
          photoUrl: srvProfile?.photo || result.user.photoUrl || cloudData?.profile?.photoUrl || existing?.photoUrl || '',
          location: srvProfile?.preferences?.location || existing?.location || userProfile.location || detected.location || 'Bangladesh',
          deviceModel: detected.model,
          osVersion: detected.osVersion,
          isSignedIn: true,
          isVerified: true,
          verificationMethod: 'google',
          verificationDate: srvUser?.created_at || new Date().toISOString(),
          authProvider: 'google',
          lastSyncedAt: Date.now(),
        };

        if (srvData?.saved_items?.libraryHighlights?.length) {
          mergeSavedHighlights(srvData.saved_items.libraryHighlights);
        }

        const serverState: CloudZikrState | null = srvData
          ? {
              profile: updated,
              zikrs: srvData.saved_items?.zikrs || [],
              history: srvData.saved_items?.historySessions || [],
              settings: srvData.settings as any,
              lifetimeTotalCount: srvData.activity?.lifetimeTotalCount || 0,
              aamalLogs: srvData.activity?.aamalLogs || {},
              lastSyncedAt: srvData.activity?.lastSyncedAt || Date.now(),
              foundInCloud: true,
              hasZikrData: Array.isArray(srvData.saved_items?.zikrs) && srvData.saved_items.zikrs.length > 0,
            }
          : null;

        let mergedState: CloudZikrState | undefined = serverState || undefined;
        if (cloudData?.foundInCloud && serverState) {
          mergedState = mergeCloudZikrStates(cloudData, serverState);
        } else if (cloudData?.foundInCloud) {
          mergedState = cloudData;
        }

        if (!mergedState?.foundInCloud) {
          const localSum = zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
          if (localSum > 0 || lifetimeTotalCount > 0) {
            mergedState = {
              profile: updated,
              zikrs,
              history: historySessions,
              lifetimeTotalCount,
              foundInCloud: true,
              hasZikrData: zikrs.length > 0,
            };
          }
        }

        saveAccountToRegistry(updated);
        await onUpdateProfile(updated, mergedState);

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0284c7', '#0369a1', '#f59e0b', '#38bdf8'],
          });
        } catch {}

        if (soundEnabled) soundHaptics.playMilestone();
        completeOnboardingAndDismiss();
        return;
      } else if (result.isRedirecting) {
        return;
      } else if (result.cancelled) {
        setErrorMessage(
          isBn
            ? 'গুগল অ্যাকাউন্ট নির্বাচন বাতিল হয়েছে। পছন্দের Gmail বেছে নিতে আবার চেষ্টা করুন।'
            : 'Google account selection was cancelled. Please try again.'
        );
      } else {
        const isUnauthorizedDomain = Boolean(result.unauthorizedDomain || result.errorCode === 'auth/unauthorized-domain');
        const hostLabel = result.currentHostname || (typeof window !== 'undefined' ? window.location.hostname || window.location.protocol : '');
        setGooglePopupBlockedInIframe(Boolean(result.inIframe && !isUnauthorizedDomain));
        setGoogleUnauthorizedHost(isUnauthorizedDomain ? hostLabel : null);
        setErrorMessage(
          isUnauthorizedDomain
            ? isBn
              ? `এই ডোমেইন (${hostLabel}) Firebase-এ অনুমোদিত নয়। অনুমোদিত ওয়েব লিংকে গুগল লগইন করুন অথবা নিচে ইমেইল ও পাসওয়ার্ড ব্যবহার করুন।`
              : `Domain "${hostLabel}" is not authorized in Firebase. Open the authorized app URL for Google Sign-In or use Email & Password.`
            : result.inIframe
            ? isBn
              ? 'প্রিভিউ উইন্ডোতে গুগল পপআপ ব্লক হয়েছে। ফোনের/ল্যাপটপের সব Gmail দেখতে নিচের বাটনে ট্যাপ করে নতুন ট্যাবে খুলুন।'
              : 'Google popup was blocked inside the preview frame. Open in a browser tab below to view all your Gmail accounts.'
            : result.error || (isBn ? 'গুগল লগইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।' : 'Google Sign-in could not be completed.')
        );
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication error.');
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim()) {
      setErrorMessage(isBn ? 'দয়া করে ইমেইল ও পাসওয়ার্ড দিন।' : 'Please enter email and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const targetEmail = emailInput.trim().toLowerCase();
    const detected = getDetectedDeviceInfo();

    try {
      const loginRes = await loginWithEmailSession({
        email: targetEmail,
        password: passwordInput.trim(),
        device: detected.model,
      });

      if (!loginRes.ok || !loginRes.data?.authenticated || !loginRes.data?.user) {
        setErrorMessage(
          loginRes.data?.error ||
            (isBn ? 'ইমেইল বা পাসওয়ার্ড সঠিক নয়।' : 'Incorrect email or password.')
        );
        setIsSubmitting(false);
        return;
      }

      const srvUser = loginRes.data.user;
      const srvProfile = loginRes.data.profile;
      const srvData = loginRes.data.userData;
      const existing = findSavedAccount(targetEmail);

      const updated: UserProfile = {
        name: srvUser.name || existing?.name || targetEmail.split('@')[0],
        emailOrPhone: targetEmail,
        photoUrl: srvProfile?.photo || existing?.photoUrl || '',
        location: srvProfile?.preferences?.location || existing?.location || userProfile.location || detected.location || 'Bangladesh',
        deviceModel: detected.model,
        osVersion: detected.osVersion,
        isSignedIn: true,
        isVerified: true,
        verificationMethod: 'email',
        verificationDate: srvUser.created_at || new Date().toISOString(),
        authProvider: 'email',
        lastSyncedAt: Date.now(),
      };

      if (srvData?.saved_items?.libraryHighlights?.length) {
        mergeSavedHighlights(srvData.saved_items.libraryHighlights);
      }

      const preloadedState: CloudZikrState | undefined = srvData
        ? {
            profile: updated,
            zikrs: srvData.saved_items?.zikrs || [],
            history: srvData.saved_items?.historySessions || [],
            settings: srvData.settings as any,
            lifetimeTotalCount: srvData.activity?.lifetimeTotalCount || 0,
            aamalLogs: srvData.activity?.aamalLogs || {},
            lastSyncedAt: srvData.activity?.lastSyncedAt || Date.now(),
            foundInCloud: true,
            hasZikrData: Array.isArray(srvData.saved_items?.zikrs) && srvData.saved_items.zikrs.length > 0,
          }
        : undefined;

      saveAccountToRegistry(updated);
      await onUpdateProfile(updated, preloadedState);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#0369a1', '#f59e0b'],
        });
      } catch {}

      if (soundEnabled) soundHaptics.playMilestone();
      completeOnboardingAndDismiss();
    } catch (err: any) {
      setErrorMessage(err.message || 'Login error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSignUp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPassword = passwordInput.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage(isBn ? 'অনুগ্রহ করে সঠিক ইমেইল অ্যাড্রেস দিন।' : 'Please enter a valid email address.');
      return;
    }
    if (cleanPassword.length < 4) {
      setErrorMessage(isBn ? 'কমপক্ষে ৪ অক্ষরের পাসওয়ার্ড দিন।' : 'Password must be at least 4 characters.');
      return;
    }

    if (cleanPassword !== confirmPasswordInput.trim()) {
      setErrorMessage(isBn ? 'পাসওয়ার্ড দুটি মিলছে না।' : 'Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const targetEmail = emailInput.trim().toLowerCase();
    const detected = getDetectedDeviceInfo();
    const fullPhone = phoneInput.trim()
      ? `${selectedCountryCode}${phoneInput.trim().replace(/^0+/, '')}`
      : '';

    try {
      const signupRes = await signupWithEmailSession({
        name: nameInput.trim() || targetEmail.split('@')[0],
        email: targetEmail,
        password: passwordInput.trim(),
        phone: fullPhone,
        photo: photoUrlInput,
        preferences: {
          location: userProfile.location || detected.location || 'Bangladesh',
          gender: profileGender,
          dob: profileDob,
        },
        device: detected.model,
      });

      if (!signupRes.ok || !signupRes.data?.authenticated || !signupRes.data?.user) {
        setErrorMessage(
          signupRes.data?.error ||
            (isBn ? 'অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।' : 'Could not create account.')
        );
        setIsSubmitting(false);
        return;
      }

      const srvUser = signupRes.data.user;
      const srvProfile = signupRes.data.profile;

      const updated: UserProfile = {
        name: srvUser.name || nameInput.trim(),
        emailOrPhone: targetEmail,
        photoUrl: srvProfile?.photo || photoUrlInput,
        location: srvProfile?.preferences?.location || userProfile.location || 'Bangladesh',
        deviceModel: detected.model,
        osVersion: detected.osVersion,
        isSignedIn: true,
        isVerified: true,
        verificationMethod: 'email',
        verificationDate: srvUser.created_at || new Date().toISOString(),
        authProvider: 'email',
        lastSyncedAt: Date.now(),
      };

      const localSum = zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
      const preloadedState: CloudZikrState | undefined =
        localSum > 0 || lifetimeTotalCount > 0
          ? {
              profile: updated,
              zikrs,
              history: historySessions,
              lifetimeTotalCount,
              foundInCloud: true,
              hasZikrData: zikrs.length > 0,
            }
          : undefined;

      saveAccountToRegistry(updated);
      await onUpdateProfile(updated, preloadedState);

      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#0369a1', '#f59e0b', '#38bdf8'],
        });
      } catch {}

      if (soundEnabled) soundHaptics.playMilestone();
      completeOnboardingAndDismiss();
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-br from-sky-100 via-teal-50 to-blue-100 dark:from-[#041014] dark:via-[#07252c] dark:to-[#051417] text-slate-800 dark:text-white"
    >
      {/* Top Bar */}
      <div className="relative z-10 px-5 sm:px-8 pt-safe pt-5 pb-2 flex items-center justify-between">
        {authMode !== 'welcome' ? (
          <button
            type="button"
            onClick={() => {
              if (authMode === 'profile_setup' && profileSetupStep > 1) {
                setProfileSetupStep((s) => (s - 1) as any);
              } else {
                setAuthMode('welcome');
                setErrorMessage(null);
              }
            }}
            className="w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white shadow-sm flex items-center justify-center text-slate-700 dark:text-white transition active:scale-95 cursor-pointer"
          >
            <ChevronRight className={`w-5 h-5 ${isAr ? '' : 'rotate-180'}`} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              const nextLang: ZikrLanguage = selectedLanguage === 'bn' ? 'ar' : selectedLanguage === 'ar' ? 'en' : 'bn';
              onSelectLanguage(nextLang);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 dark:bg-black/50 border border-sky-200 dark:border-teal-800 text-xs font-bold shadow-sm cursor-pointer"
          >
            <Globe className="w-4 h-4 text-sky-600 dark:text-emerald-400" />
            <span>{selectedLanguage === 'bn' ? 'বাংলা (BN)' : selectedLanguage === 'ar' ? 'العربية (AR)' : 'English (EN)'}</span>
          </button>
        )}

        {authMode === 'profile_setup' && (
          <div className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-300">
            {isBn ? `০${profileSetupStep} অব ০৩` : `0${profileSetupStep} of 03`}
          </div>
        )}

        <button
          type="button"
          onClick={completeOnboardingAndDismiss}
          className="px-4 py-2 rounded-full bg-white/80 dark:bg-black/50 border border-sky-200 dark:border-teal-800 text-xs font-bold shadow-sm cursor-pointer"
        >
          {isBn ? 'স্কিপ' : 'Skip'}
        </button>
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-8 max-w-md mx-auto w-full py-4 overflow-y-auto">
        {authMode === 'welcome' && (
          <div className="text-center space-y-6 animate-in fade-in duration-300 py-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-sky-500 to-blue-600 shadow-2xl flex items-center justify-center text-white text-4xl font-black">
              📿
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                {isBn ? 'Zikr+ পবিত্র আসরে স্বাগতম' : 'Welcome to Zikr+'}
              </h1>
              <p className="text-sm text-slate-600 dark:text-teal-200 font-medium max-w-xs mx-auto">
                {isBn
                  ? 'আপনার দৈনিক ইবাদত, যিকির, কুরআন ও সীরাত ট্র্যাকিং নিরাপদ ক্লাউড সিঙ্কের সাথে রাখুন।'
                  : 'Keep your daily worship, dhikr, Quran and seerah tracking secured with cloud sync.'}
              </p>
            </div>

            {errorMessage && authMode === 'welcome' && (
              <div className="p-3 rounded-2xl bg-sky-50 dark:bg-[#082229] border border-sky-200 dark:border-teal-700 text-slate-800 dark:text-sky-100 text-xs font-bold space-y-2 text-left">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-sky-600 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
                {googleUnauthorizedHost &&
                  typeof window !== 'undefined' &&
                  ![
                    'ais-dev-kyejffxgvcxgaczth75fiz-14069114036.asia-southeast1.run.app',
                    'ais-pre-kyejffxgvcxgaczth75fiz-14069114036.asia-southeast1.run.app',
                    'tablig.vercel.app',
                  ].includes(window.location.hostname) && (
                    <a
                      href={
                        window.location.hostname.endsWith('.vercel.app')
                          ? 'https://tablig.vercel.app/?open_auth=1'
                          : 'https://ais-pre-kyejffxgvcxgaczth75fiz-14069114036.asia-southeast1.run.app/?open_auth=1'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs flex items-center justify-center gap-2 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{isBn ? 'অনুমোদিত অ্যাপ লিংকে গুগল লগইন করুন' : 'Open Authorized App URL for Google Sign-In'}</span>
                    </a>
                  )}
                {googlePopupBlockedInIframe && typeof window !== 'undefined' && (
                  <a
                    href={(() => {
                      try {
                        const u = new URL(window.location.href);
                        u.searchParams.set('open_auth', '1');
                        return u.toString();
                      } catch {
                        return window.location.href;
                      }
                    })()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs flex items-center justify-center gap-2 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{isBn ? 'নতুন ট্যাবে খুলুন (সব Gmail দেখাবে)' : 'Open in Browser Tab'}</span>
                  </a>
                )}
              </div>
            )}

            <div className="space-y-3 pt-6">
              <button
                type="button"
                disabled={isLoadingGoogle}
                onClick={handleGoogleSignIn}
                className="w-full py-4 px-6 rounded-2xl bg-white dark:bg-[#06191f] hover:bg-slate-50 text-slate-900 dark:text-white font-black text-sm flex items-center justify-center gap-3 shadow-xl transition active:scale-95 cursor-pointer border border-sky-200 dark:border-teal-800"
              >
                {isLoadingGoogle ? <Loader2 className="w-5 h-5 animate-spin text-sky-600" /> : <GoogleIcon />}
                <span>{isBn ? 'গুগল দিয়ে চালিয়ে যান' : 'Continue with Google'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setErrorMessage(null);
                }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl transition active:scale-95 cursor-pointer"
              >
                <Mail className="w-5 h-5" />
                <span>{isBn ? 'ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন' : 'Sign in with Email'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMessage(null);
                }}
                className="w-full py-3 px-6 rounded-2xl bg-transparent hover:bg-sky-500/10 text-sky-600 dark:text-sky-400 font-extrabold text-xs transition cursor-pointer"
              >
                {isBn ? 'নতুন অ্যাকাউন্ট তৈরি করুন (Sign Up)' : 'Create New Account'}
              </button>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={completeOnboardingAndDismiss}
                  className="text-xs font-bold text-slate-500 dark:text-teal-400/80 hover:underline cursor-pointer"
                >
                  {isBn ? 'গেস্ট হিসেবে প্রবেশ করুন →' : 'Continue as Guest →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SIGN IN VIEW */}
        {authMode === 'signin' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <span>Hello there</span>
                <span className="animate-bounce">👋</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-200">
                {isBn ? 'আপনার অ্যাকাউন্টে প্রবেশ করতে ইমেইল ও পাসওয়ার্ড দিন' : 'Please enter your email & password to access your account'}
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-teal-200">
                  {isBn ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full rounded-2xl bg-white/90 dark:bg-[#06191f] pl-10 pr-4 py-3.5 border border-sky-200 dark:border-teal-800 text-xs font-bold text-slate-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-teal-200">
                  {isBn ? 'পাসওয়ার্ড' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••"
                    className="w-full rounded-2xl bg-white/90 dark:bg-[#06191f] pl-10 pr-10 py-3.5 border border-sky-200 dark:border-teal-800 text-xs font-bold text-slate-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                  <span className="font-bold text-slate-700 dark:text-teal-200">{isBn ? 'রিমেম্বার মি' : 'Remember Me'}</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-amber-300" />}
                <span>{isBn ? 'এগিয়ে চলুন (Continue)' : 'Continue'}</span>
              </button>
            </form>

            <div className="text-center pt-3 text-xs font-bold text-slate-600 dark:text-teal-200">
              <span>{isBn ? 'নতুন অ্যাকাউন্ট?' : 'New here?'} </span>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMessage(null);
                }}
                className="text-sky-600 dark:text-sky-400 font-black hover:underline cursor-pointer"
              >
                {isBn ? 'সাইন আপ করুন (Sign up)' : 'Create an account. Sign up'}
              </button>
            </div>
          </div>
        )}

        {/* SIGN UP VIEW */}
        {authMode === 'signup' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <span>Hello there</span>
                <span className="animate-bounce">👋</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-200">
                {isBn ? 'নতুন অ্যাকাউন্ট খুলতে ইমেইল ও পাসওয়ার্ড দিন' : 'Please enter your email & password to register your account'}
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form
              onSubmit={handleEmailSignUp}
              className="space-y-3.5"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-teal-200">{isBn ? 'পূর্ণ নাম (ঐচ্ছিক)' : 'Full Name (Optional)'}</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Mursaline Parvez"
                    className="w-full rounded-2xl bg-white/90 dark:bg-[#06191f] pl-10 pr-4 py-3 border border-sky-200 dark:border-teal-800 text-xs font-bold text-slate-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-teal-200">{isBn ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full rounded-2xl bg-white/90 dark:bg-[#06191f] pl-10 pr-4 py-3 border border-sky-200 dark:border-teal-800 text-xs font-bold text-slate-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-teal-200">{isBn ? 'পাসওয়ার্ড' : 'Password'}</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••"
                    className="w-full rounded-2xl bg-white/90 dark:bg-[#06191f] pl-10 pr-10 py-3 border border-sky-200 dark:border-teal-800 text-xs font-bold text-slate-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-teal-200">{isBn ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm Password'}</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    placeholder="••••••"
                    className="w-full rounded-2xl bg-white/90 dark:bg-[#06191f] pl-10 pr-10 py-3 border border-sky-200 dark:border-teal-800 text-xs font-bold text-slate-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none pt-1 text-[11px]">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span className="font-bold text-slate-700 dark:text-teal-200">
                  {isBn ? 'আমি Zikr+ এর শর্তাবলি ও প্রাইভেসি পলিসিতে সম্মত আছি' : 'I agree to Zikr+ Terms & Privacy Policy'}
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer mt-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                <span>{isBn ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account'}</span>
              </button>
            </form>

            <div className="text-center pt-2 text-xs font-bold text-slate-600 dark:text-teal-200">
              <span>{isBn ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already have an account?'} </span>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setErrorMessage(null);
                }}
                className="text-sky-600 dark:text-sky-400 font-black hover:underline cursor-pointer"
              >
                {isBn ? 'লগইন করুন (Login)' : 'Login'}
              </button>
            </div>
          </div>
        )}

        {/* PROFILE SETUP VIEW (01 of 03) */}
        {authMode === 'profile_setup' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {isBn ? 'প্রোফাইল সেটআপ ✨' : 'Profile Setup ✨'}
              </h2>
              <p className="text-xs text-slate-600 dark:text-teal-200">
                {isBn ? 'আপনার ব্যক্তিগত বিবরণ দিয়ে প্রোফাইল সাজান' : 'Add your details to customize profile'}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-sky-500 to-blue-600 shadow-lg">
                <img
                  src={photoUrlInput || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-sky-600 text-white shadow-md hover:bg-sky-500 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                      if (evt.target?.result) setPhotoUrlInput(evt.target.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-teal-200">{isBn ? 'মোবাইল নম্বর' : 'Phone Number'}</label>
              <div className="flex gap-2">
                <select
                  value={selectedCountryCode}
                  onChange={(e) => setSelectedCountryCode(e.target.value)}
                  className="rounded-2xl bg-white/90 dark:bg-[#06191f] px-3 py-3 border border-sky-200 dark:border-teal-800 text-xs font-bold text-slate-900 dark:text-white shadow-sm focus:outline-none"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <div className="relative flex-1">
                  <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="01712345678"
                    className="w-full rounded-2xl bg-white/90 dark:bg-[#06191f] pl-10 pr-4 py-3 border border-sky-200 dark:border-teal-800 text-xs font-bold text-slate-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-teal-200">{isBn ? 'লিঙ্গ' : 'Gender'}</label>
                <select
                  value={profileGender}
                  onChange={(e) => setProfileGender(e.target.value)}
                  className="w-full rounded-2xl bg-white/90 dark:bg-[#06191f] px-3.5 py-3 border border-sky-200 dark:border-teal-800 text-xs font-bold text-slate-900 dark:text-white shadow-sm focus:outline-none cursor-pointer"
                >
                  <option value="Male">{isBn ? 'পুরুষ' : 'Male'}</option>
                  <option value="Female">{isBn ? 'মহিলা' : 'Female'}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-teal-200">{isBn ? 'জন্ম তারিখ' : 'Date of Birth'}</label>
                <input
                  type="date"
                  value={profileDob}
                  onChange={(e) => setProfileDob(e.target.value)}
                  className="w-full rounded-2xl bg-white/90 dark:bg-[#06191f] px-3.5 py-3 border border-sky-200 dark:border-teal-800 text-xs font-bold text-slate-900 dark:text-white shadow-sm focus:outline-none"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleEmailSignUp()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer mt-4 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              <span>{isBn ? 'সম্পন্ন করুন (Complete)' : 'Complete Setup'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
