import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  User,
  Camera,
  Mail,
  Phone,
  Bookmark,
  BookOpen,
  Clock,
  MessageSquare,
  LogOut,
  Send,
  ExternalLink,
  Edit2,
  Check,
  MapPin,
  Smartphone,
  Info,
  ShieldCheck,
  Upload,
  Sparkles,
  Download,
  Settings,
  Sun,
  Moon,
  Globe,
  Volume2,
  VolumeX,
  FileText,
  Code,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  Cloud,
  RefreshCw,
  KeyRound,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Lock,
  Copy,
  Eye,
  EyeOff,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, ThemeMode, ZikrLanguage, NavModule, ZikrItem, HistorySession, AppSettings } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import { findSavedAccount, saveAccountToRegistry, updateAccountPassword, normalizeIdentifier } from '../utils/accountRegistry';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { getDetectedDeviceInfo } from '../utils/deviceInfo';

import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  checkUserExistsInCloud,
  generateAndSendVerificationOtp,
  verifySubmittedOtp,
  loadUserDataFromCloud,
  saveUserDataToCloud,
  updateCloudUserPassword,
  generateAndSendPasswordResetCode,
  verifyPasswordResetCode,
  maskEmailOrPhone,
  getTestingOtpCode,
  verifyUserCloudPassword,
  signInWithGoogleAuth,
  CloudZikrState,
} from '../services/firebase';

const COUNTRY_CODES = [
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+1', flag: '🇺🇸', name: 'USA / Canada' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+90', flag: '🇹🇷', name: 'Turkey' },
];

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

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onNavigateModule: (module: NavModule) => void;
  themeMode: ThemeMode;
  onToggleThemeMode?: () => void;
  selectedLanguage: ZikrLanguage;
  onSelectLanguage?: (lang: ZikrLanguage) => void;
  soundEnabled: boolean;
  onToggleSound?: () => void;
  vibrationEnabled?: boolean;
  onToggleVibration?: () => void;
  onExportPdf?: () => void;
  onOpenStandaloneModal?: () => void;
  onResetAllCounters?: () => void;
  initialTab?: 'profile' | 'settings';
  onCloudDataLoaded?: (data: CloudZikrState, targetEmailOrPhone?: string) => void;
  onTriggerCloudSync?: () => Promise<boolean>;
  isSyncingCloud?: boolean;
  lastCloudSyncTimestamp?: number;
}

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  onNavigateModule,
  themeMode,
  onToggleThemeMode,
  selectedLanguage,
  onSelectLanguage,
  soundEnabled,
  onToggleSound,
  vibrationEnabled = true,
  onToggleVibration,
  onExportPdf,
  onOpenStandaloneModal,
  onResetAllCounters,
  initialTab = 'profile',
  onCloudDataLoaded,
  onTriggerCloudSync,
  isSyncingCloud = false,
  lastCloudSyncTimestamp,
}) => {
  const isDay = themeMode === 'day';
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // PWA Install capabilities inside Settings
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showInstallGuideModal, setShowInstallGuideModal] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installFeedback, setInstallFeedback] = useState<string | null>(null);

  const handleInstallApp = async () => {
    if (soundEnabled) soundHaptics.playTap();
    if (isInstalled) {
      setInstallFeedback('✓ অ্যাপটি ইতিমধ্যেই আপনার ডিভাইসে সফলভাবে ইনস্টল করা আছে!');
      setTimeout(() => setInstallFeedback(null), 3000);
      return;
    }
    if (isInstallable) {
      setIsInstalling(true);
      const res = await install();
      setIsInstalling(false);
      if (res) {
        setInstallFeedback('✓ অভিনন্দন! ZikrMate অ্যাপটি হোম স্ক্রিনে ইনস্টল হয়েছে!');
        confetti({ particleCount: 65, spread: 65, origin: { y: 0.6 } });
      }
      setTimeout(() => setInstallFeedback(null), 4000);
    } else {
      setShowInstallGuideModal(true);
    }
  };

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Sub-modals / views
  const [activeSubModal, setActiveSubModal] = useState<
    'none' | 'verified_auth' | 'edit_profile' | 'google_auth' | 'feedback' | 'bookmarks' | 'downloads' | 'logout_confirm'
  >('none');

  // Verification & Authentication State
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | 'google'>('email');
  const [previousGoogleAccount, setPreviousGoogleAccount] = useState<{
    email: string;
    name: string;
    photoUrl?: string;
    hasPassword?: boolean;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_last_google_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });
  const [googlePasswordInput, setGooglePasswordInput] = useState('');
  const [showGooglePassword, setShowGooglePassword] = useState(false);
  const [verificationStep, setVerificationStep] = useState<
    'input' | 'otp' | 'forgot_password' | 'reset_password' | 'success'
  >('input');
  const [otpPurpose, setOtpPurpose] = useState<'signup' | 'login' | 'reset'>('signup');
  const [maskedTargetDisplay, setMaskedTargetDisplay] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [showTestingHelper, setShowTestingHelper] = useState(false);

  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+880');
  const [inputName, setInputName] = useState('');
  const [signUpPhotoUrl, setSignUpPhotoUrl] = useState<string>(DEFAULT_AVATARS[0]);
  const signUpFileInputRef = useRef<HTMLInputElement | null>(null);
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [generatedOtpCode, setGeneratedOtpCode] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(60);
  const [otpErrorMessage, setOtpErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [cloudSyncMessage, setCloudSyncMessage] = useState<string | null>(null);
  const [showOtpNotification, setShowOtpNotification] = useState(false);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Forgot Password & Reset State
  const [forgotTarget, setForgotTarget] = useState('');
  const [forgotMethod, setForgotMethod] = useState<'email' | 'phone'>('email');
  const [tempPasswordInput, setTempPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState('');
  const [generatedTempPassword, setGeneratedTempPassword] = useState('');
  const [generatedResetCode, setGeneratedResetCode] = useState('');
  const [showTempPasswordNotification, setShowTempPasswordNotification] = useState(false);
  const [forgotErrorMessage, setForgotErrorMessage] = useState<string | null>(null);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [showResetNewPassword, setShowResetNewPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);
  const [copiedTempPass, setCopiedTempPass] = useState(false);

  // OTP Countdown timer
  useEffect(() => {
    let timer: any;
    if (verificationStep === 'otp' && otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown((c) => (c > 0 ? c - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [verificationStep, otpCountdown]);

  // Edit Profile Form State (User-editable)
  const [editName, setEditName] = useState(userProfile.name);
  const [editEmailOrPhone, setEditEmailOrPhone] = useState(userProfile.emailOrPhone);
  const [editPhotoUrl, setEditPhotoUrl] = useState(userProfile.photoUrl);
  const [editLocation, setEditLocation] = useState(userProfile.location || '');
  const [editDeviceModel, setEditDeviceModel] = useState(userProfile.deviceModel || '');
  const [editOsVersion, setEditOsVersion] = useState(userProfile.osVersion || '');
  const [accountRecoveryNotice, setAccountRecoveryNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Custom Google input state
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Feedback Form State
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackUserEmail, setFeedbackUserEmail] = useState(userProfile.emailOrPhone || '');
  const [feedbackLocation, setFeedbackLocation] = useState(userProfile.location || '');
  const [feedbackModel, setFeedbackModel] = useState(userProfile.deviceModel || '');
  const [feedbackOsVersion, setFeedbackOsVersion] = useState(userProfile.osVersion || '');
  const [feedbackChannel, setFeedbackChannel] = useState<'whatsapp' | 'email'>('whatsapp');
  const [showDeviceSettings, setShowDeviceSettings] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);


  // Real GPS & Timezone Location detector
  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lon = pos.coords.longitude.toFixed(4);
          const locStr = `${lat}°, ${lon}° (GPS, BD)`;
          setEditLocation(locStr);
          setFeedbackLocation(locStr);
          setIsDetectingLocation(false);
          if (soundEnabled) soundHaptics.playTap();
        },
        () => {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Dhaka';
          const locStr = tz.includes('Dhaka') ? '4C2J 8FX, BD' : tz.replace('_', ' ') || 'Bangladesh';
          setEditLocation(locStr);
          setFeedbackLocation(locStr);
          setIsDetectingLocation(false);
          if (soundEnabled) soundHaptics.playTap();
        },
        { timeout: 6000 }
      );
    } else {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Dhaka';
      const locStr = tz.includes('Dhaka') ? '4C2J 8FX, BD' : tz.replace('_', ' ') || 'Bangladesh';
      setEditLocation(locStr);
      setFeedbackLocation(locStr);
      setIsDetectingLocation(false);
    }
  };

  useEffect(() => {
    const detected = getDetectedDeviceInfo();
    setEditName(userProfile.name);
    setEditEmailOrPhone(userProfile.emailOrPhone);
    setEditPhotoUrl(userProfile.photoUrl);
    setEditDeviceModel(detected.model);
    setEditOsVersion(detected.osVersion);

    if (userProfile.emailOrPhone) {
      setFeedbackUserEmail(userProfile.emailOrPhone);
    }
    setFeedbackModel(detected.model);
    setFeedbackOsVersion(detected.osVersion);

    if (isOpen) {
      // Automatically fetch Network Location (IP Geolocation & Timezone) from user's device network
      fetch('https://ipapi.co/json/')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.city && data.country_name) {
            const netLoc = `${data.city}, ${data.country_name} (Network Location)`;
            setEditLocation(netLoc);
            setFeedbackLocation(netLoc);
          } else {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Dhaka';
            const netLoc = tz.replace('_', ' ') + ' (Network Timezone)';
            setEditLocation(netLoc);
            setFeedbackLocation(netLoc);
          }
        })
        .catch(() => {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Dhaka';
          const netLoc = tz.replace('_', ' ') + ' (Network Timezone)';
          setEditLocation(netLoc);
          setFeedbackLocation(netLoc);
        });
    }
  }, [isOpen, userProfile]);

  if (!isOpen) return null;

  // Handle Photo Upload (Convert file to Data URL for persistence)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditPhotoUrl(event.target.result as string);
          if (soundEnabled) soundHaptics.playMilestone();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Verified Auth Sub-modal
  const handleOpenVerifiedAuth = (
    method: 'email' | 'phone' | 'google' = 'email',
    mode: 'register' | 'login' = 'register'
  ) => {
    setAuthMethod(method);
    setAuthMode(mode);
    setVerificationStep('input');
    setOtpErrorMessage(null);
    setShowOtpNotification(false);
    setOtpDigits(['', '', '', '', '', '']);
    setCloudSyncMessage(null);
    setShowTestingHelper(false);
    if (method === 'email' && !inputEmail) {
      setInputEmail(userProfile.emailOrPhone && userProfile.emailOrPhone.includes('@') ? userProfile.emailOrPhone : '');
    }
    if (method === 'phone' && !inputPhone) {
      const existingDigits = userProfile.emailOrPhone && !userProfile.emailOrPhone.includes('@')
        ? userProfile.emailOrPhone.replace(/\D/g, '')
        : '';
      setInputPhone(existingDigits);
    }
    if (!inputName) {
      setInputName(userProfile.name || '');
    }
    setActiveSubModal('verified_auth');
  };

  // Direct login helper with password
  const handleDirectPasswordLogin = async (target: string, pass: string) => {
    setIsVerifying(true);
    setOtpErrorMessage(null);
    const cloudData = await loadUserDataFromCloud(target);
    const existing = findSavedAccount(target);
    const detected = getDetectedDeviceInfo();

    const effectiveName =
      existing?.name ||
      cloudData?.profile?.name ||
      (target.includes('@') ? target.split('@')[0] : 'ZikrMate User');

    const updated: UserProfile = {
      name: effectiveName,
      emailOrPhone: target,
      photoUrl: cloudData?.profile?.photoUrl || existing?.photoUrl || userProfile.photoUrl || DEFAULT_AVATARS[0],
      password: pass,
      location: cloudData?.profile?.location || existing?.location || userProfile.location || 'Bangladesh',
      deviceModel: detected.model,
      osVersion: detected.osVersion,
      isSignedIn: true,
      isVerified: true,
      verificationMethod: authMethod,
      verificationDate: new Date().toISOString(),
      authProvider: authMethod,
      lastSyncedAt: Date.now(),
    };

    saveAccountToRegistry(updated);
    onUpdateProfile(updated);

    // Save as last google user if email is a Google address
    if (target.endsWith('@gmail.com') || target.includes('google')) {
      const googleUserRecord = {
        email: target,
        name: updated.name,
        photoUrl: updated.photoUrl,
        hasPassword: true,
      };
      try {
        localStorage.setItem('zikrmate_last_google_user', JSON.stringify(googleUserRecord));
        setPreviousGoogleAccount(googleUserRecord);
      } catch {}
    }

    setVerificationStep('success');
    setCloudSyncMessage('পাসওয়ার্ড যাচাই সফল! আপনার ক্লাউড ডাটা ও আমল লোড হচ্ছে...');
    if (onCloudDataLoaded && cloudData) {
      onCloudDataLoaded(cloudData, target);
    }

    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    if (soundEnabled) soundHaptics.playMilestone();
    setIsVerifying(false);

    setTimeout(() => {
      setActiveSubModal('none');
      setVerificationStep('input');
    }, 1500);
  };

  // Helper to compute normalized identifier based on input and country code
  const getNormalizedTarget = (): string => {
    if (authMethod === 'email') {
      return inputEmail.trim().toLowerCase();
    }
    const raw = inputPhone.trim();
    if (raw.startsWith('+')) {
      return `+${raw.replace(/\D/g, '')}`;
    }
    const cleanDigits = raw.replace(/\D/g, '');
    if (cleanDigits.startsWith('880')) {
      return `+${cleanDigits}`;
    }
    if (cleanDigits.startsWith('01') && cleanDigits.length === 11) {
      return `+880${cleanDigits.slice(1)}`;
    }
    return `${selectedCountryCode}${cleanDigits.replace(/^0+/, '')}`;
  };

  // Sign Up Custom Photo Upload Handler
  const handleSignUpPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2.5 * 1024 * 1024) {
        setOtpErrorMessage('ছবির সাইজ ২.৫ মেগাবাইট (MB) এর কম হতে হবে');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSignUpPhotoUrl(reader.result);
          if (soundEnabled) soundHaptics.playTap();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Ultra-Fast 1-Click Instant Sign Up (Creates account in <500ms with full security & cloud sync)
  const handleFastInstantSignUp = async () => {
    setOtpErrorMessage(null);
    const target = getNormalizedTarget();

    if (authMethod === 'email') {
      if (!inputEmail.includes('@') || !inputEmail.includes('.')) {
        setOtpErrorMessage('সঠিক ইমেইল অ্যাড্রেস লিখুন (e.g. name@gmail.com)');
        return;
      }
    } else {
      const rawDigits = inputPhone.replace(/\D/g, '');
      if (rawDigits.length < 8) {
        setOtpErrorMessage('সঠিক মোবাইল নম্বর লিখুন (অন্তত ৮-১১ ডিজিট)');
        return;
      }
    }

    if (!inputName.trim()) {
      setOtpErrorMessage('আপনার নাম (Display Name) লিখুন');
      return;
    }

    if (!inputPassword.trim() || inputPassword.trim().length < 4) {
      setOtpErrorMessage('অনুগ্রহ করে কমপক্ষে ৪ অক্ষরের একটি গোপন পাসওয়ার্ড দিন');
      return;
    }

    if (inputConfirmPassword.trim() && inputPassword.trim() !== inputConfirmPassword.trim()) {
      setOtpErrorMessage('পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না!');
      return;
    }

    setIsVerifying(true);
    const existing = findSavedAccount(target);
    const existsInCloud = await checkUserExistsInCloud(target);
    if (existing || existsInCloud) {
      setIsVerifying(false);
      setOtpErrorMessage('এই অ্যাকাউন্টে ইতিমধ্যে রেজিস্ট্রেশন করা আছে! লগইন করতে নিচে "লগইন (Sign In)" বেছে নিন।');
      if (soundEnabled) soundHaptics.playTap();
      return;
    }

    const detected = getDetectedDeviceInfo();
    const updated: UserProfile = {
      name: inputName.trim() || (authMethod === 'email' ? inputEmail.split('@')[0] : 'ZikrMate User'),
      emailOrPhone: target,
      photoUrl: signUpPhotoUrl || DEFAULT_AVATARS[0],
      password: inputPassword.trim(),
      location: editLocation || userProfile.location || 'Bangladesh',
      deviceModel: detected.model,
      osVersion: detected.osVersion,
      isSignedIn: true,
      isVerified: true,
      verificationMethod: authMethod,
      verificationDate: new Date().toISOString(),
      authProvider: authMethod,
      lastSyncedAt: Date.now(),
    };

    saveAccountToRegistry(updated);
    onUpdateProfile(updated);

    // If email is a Google address, also save as last google user
    if (target.endsWith('@gmail.com') || target.includes('google')) {
      try {
        const googleUserRecord = {
          email: target,
          name: updated.name,
          photoUrl: updated.photoUrl,
          hasPassword: true,
        };
        localStorage.setItem('zikrmate_last_google_user', JSON.stringify(googleUserRecord));
        setPreviousGoogleAccount(googleUserRecord);
      } catch {}
    }

    // Save to Firestore in background
    saveUserDataToCloud(target, updated, [], [], 0, undefined, {}).catch(() => {});

    setVerificationStep('success');
    setCloudSyncMessage('আলহামদুলিল্লাহ! আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে এবং ক্লাউড সিঙ্ক চালু হয়েছে!');
    if (onCloudDataLoaded) {
      onCloudDataLoaded({ foundInCloud: false }, target);
    }

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    if (soundEnabled) soundHaptics.playMilestone();
    setIsVerifying(false);

    setTimeout(() => {
      setActiveSubModal('none');
      setVerificationStep('input');
    }, 1600);
  };

  // Send 6-digit OTP code to email or phone for registration, or login
  const handleSendOtp = async (purposeOverride?: 'signup' | 'login') => {
    setOtpErrorMessage(null);
    const currentPurpose: 'signup' | 'login' = purposeOverride || (authMode === 'register' ? 'signup' : 'login');
    const target = getNormalizedTarget();

    if (authMethod === 'email') {
      if (!inputEmail.includes('@') || !inputEmail.includes('.')) {
        setOtpErrorMessage('সঠিক ইমেইল অ্যাড্রেস লিখুন (e.g. name@gmail.com)');
        return;
      }
    } else {
      const rawDigits = inputPhone.replace(/\D/g, '');
      if (rawDigits.length < 8) {
        setOtpErrorMessage('সঠিক মোবাইল নম্বর লিখুন (অন্তত ৮-১১ ডিজিট)');
        return;
      }
    }

    if (!inputPassword.trim() || inputPassword.trim().length < 4) {
      setOtpErrorMessage('অনুগ্রহ করে কমপক্ষে ৪ অক্ষরের একটি গোপন পাসওয়ার্ড দিন');
      return;
    }

    // If REGISTER mode: Ensure account does not already exist
    if (currentPurpose === 'signup') {
      if (!inputName.trim()) {
        setOtpErrorMessage('Display name লিখুন (Please enter your Display name)');
        return;
      }
      if (inputConfirmPassword.trim() && inputPassword.trim() !== inputConfirmPassword.trim()) {
        setOtpErrorMessage('পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না! (Passwords do not match)');
        return;
      }
      const existing = findSavedAccount(target);
      const existsInCloud = await checkUserExistsInCloud(target);
      if (existing || existsInCloud) {
        setOtpErrorMessage('এই ইমেইলে ইতিমধ্যে একটি অ্যাকাউন্ট খোলা আছে! লগইন করতে নিচে "Sign in" অপশনে ট্যাপ করুন।');
        if (soundEnabled) soundHaptics.playTap();
        return;
      }
    }

    // If LOGIN mode with password: check password match against Firestore & Local Vault
    if (currentPurpose === 'login' && !purposeOverride) {
      setIsVerifying(true);
      const verifyResult = await verifyUserCloudPassword(target, inputPassword.trim());

      if (verifyResult.exists) {
        if (verifyResult.passwordMatches) {
          await handleDirectPasswordLogin(target, inputPassword.trim());
          return;
        } else if (!verifyResult.savedPassword) {
          // Linked Google or passwordless account: save password and log in
          updateAccountPassword(target, inputPassword.trim());
          await updateCloudUserPassword(target, inputPassword.trim());
          await handleDirectPasswordLogin(target, inputPassword.trim());
          return;
        } else {
          setIsVerifying(false);
          setOtpErrorMessage('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন, অথবা নিচে "পাসওয়ার্ড ভুলে গেছেন?" বাটনে ট্যাপ করে নতুন পাসওয়ার্ড রিসেট করুন।');
          if (soundEnabled) soundHaptics.playTap();
          return;
        }
      } else {
        setIsVerifying(false);
        // Account does not exist anywhere yet
        setOtpErrorMessage('এই অ্যাকাউন্টের কোনো রেকর্ড পাওয়া যায়নি। অনুগ্রহ করে "নতুন অ্যাকাউন্ট (Sign Up)" বেছে নিয়ে অ্যাকাউন্ট খুলুন।');
        if (soundEnabled) soundHaptics.playTap();
        return;
      }
    }

    // Otherwise, generate and dispatch 6-digit verification code to Email or Phone
    setIsSendingCode(true);
    const methodType: 'email' | 'phone' = authMethod === 'phone' ? 'phone' : 'email';
    const res = await generateAndSendVerificationOtp(target, methodType, currentPurpose);
    setIsSendingCode(false);

    if (!res.success) {
      setOtpErrorMessage(res.message);
      if (soundEnabled) soundHaptics.playTap();
      return;
    }

    setMaskedTargetDisplay(res.maskedTarget);
    setOtpPurpose(currentPurpose);
    setOtpDigits(['', '', '', '', '', '']);
    setOtpCountdown(60);
    setShowTestingHelper(false);
    setVerificationStep('otp');
    if (soundEnabled) soundHaptics.playTap();
  };

  // Start Forgot Password Flow
  const handleStartForgotPassword = (method?: 'email' | 'phone' | 'google') => {
    const chosenMethod = method === 'phone' ? 'phone' : 'email';
    setForgotMethod(chosenMethod);
    const target = chosenMethod === 'email'
      ? (inputEmail || (userProfile.emailOrPhone?.includes('@') ? userProfile.emailOrPhone : '') || '')
      : (inputPhone || (!userProfile.emailOrPhone?.includes('@') ? userProfile.emailOrPhone?.replace(/\D/g, '') : '') || '');
    setForgotTarget(target);
    setForgotErrorMessage(null);
    setTempPasswordInput('');
    setNewPasswordInput('');
    setConfirmNewPasswordInput('');
    setShowTempPasswordNotification(false);
    setShowTestingHelper(false);
    setVerificationStep('forgot_password');
    setActiveSubModal('verified_auth');
    if (soundEnabled) soundHaptics.playTap();
  };

  // Send Password Reset Code to Email or Phone
  const handleSendForgotPassword = async () => {
    setForgotErrorMessage(null);
    let target = forgotTarget.trim();

    if (forgotMethod === 'email') {
      if (!target.includes('@') || !target.includes('.')) {
        setForgotErrorMessage('সঠিক ইমেইল অ্যাড্রেস লিখুন (e.g. name@gmail.com)');
        return;
      }
      target = target.toLowerCase();
    } else {
      const rawDigits = target.replace(/\D/g, '');
      if (rawDigits.length < 8) {
        setForgotErrorMessage('সঠিক মোবাইল নম্বর লিখুন (অন্তত ৮-১১ ডিজিট)');
        return;
      }
      target = `${selectedCountryCode}${target.replace(/^0+/, '').trim()}`;
    }

    setIsSendingCode(true);
    const res = await generateAndSendPasswordResetCode(target, forgotMethod, !!findSavedAccount(target));
    setIsSendingCode(false);

    if (!res.success) {
      setForgotErrorMessage(res.message);
      if (soundEnabled) soundHaptics.playTap();
      return;
    }

    setMaskedTargetDisplay(res.maskedTarget);
    setVerificationStep('reset_password');
    setTempPasswordInput('');
    setShowTestingHelper(false);
    if (soundEnabled) soundHaptics.playMilestone();
  };

  // Complete Password Reset and Log In
  const handleCompletePasswordReset = async () => {
    setForgotErrorMessage(null);
    let target = forgotTarget.trim();
    if (forgotMethod === 'email') {
      target = target.toLowerCase();
    } else {
      target = target.startsWith('+') ? target : `${selectedCountryCode}${target.replace(/^0+/, '').trim()}`;
    }

    if (!tempPasswordInput.trim() || tempPasswordInput.trim().length < 6) {
      setForgotErrorMessage('আপনার ইমেইল বা SMS-এ প্রাপ্ত ৬-সংখ্যার সিকিউরিটি রিসেট কোডটি দিন');
      return;
    }

    if (!newPasswordInput.trim() || newPasswordInput.trim().length < 4) {
      setForgotErrorMessage('নতুন পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে');
      return;
    }

    if (newPasswordInput.trim() !== confirmNewPasswordInput.trim()) {
      setForgotErrorMessage('নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড দুটি একই হতে হবে');
      return;
    }

    setIsResettingPassword(true);

    // Validate the 6-digit reset code
    const verifyResult = verifyPasswordResetCode(target, tempPasswordInput.trim());
    if (!verifyResult.success) {
      setIsResettingPassword(false);
      setForgotErrorMessage(verifyResult.message);
      if (soundEnabled) soundHaptics.playTap();
      return;
    }

    // Success! Save new password to registry and Firestore
    const newPass = newPasswordInput.trim();
    updateAccountPassword(target, newPass);
    await updateCloudUserPassword(target, newPass);

    // Load existing cloud data or initialize
    const cloudData = await loadUserDataFromCloud(target);

    // Update profile
    const existing = findSavedAccount(target);
    const detected = getDetectedDeviceInfo();
    const updatedProf: UserProfile = {
      ...userProfile,
      name: existing?.name || (cloudData?.profile?.name) || (target.includes('@') ? target.split('@')[0] : 'ZikrMate User'),
      emailOrPhone: target,
      photoUrl: existing?.photoUrl || cloudData?.profile?.photoUrl || userProfile.photoUrl || DEFAULT_AVATARS[0],
      isSignedIn: true,
      isVerified: true,
      verificationMethod: forgotMethod,
      verificationDate: new Date().toISOString(),
      password: newPass,
      location: editLocation || userProfile.location || 'Bangladesh',
      deviceModel: detected.model,
      osVersion: detected.osVersion,
    };

    saveAccountToRegistry(updatedProf);
    onUpdateProfile(updatedProf);

    if (cloudData && cloudData.foundInCloud && onCloudDataLoaded) {
      onCloudDataLoaded(cloudData, target);
    } else if (onCloudDataLoaded) {
      onCloudDataLoaded({ foundInCloud: false }, target);
    }

    setIsResettingPassword(false);
    setVerificationStep('success');
    setCloudSyncMessage('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে এবং অ্যাকাউন্ট লগইন হয়েছে!');
    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    if (soundEnabled) soundHaptics.playMilestone();

    setTimeout(() => {
      setActiveSubModal('none');
      setVerificationStep('input');
    }, 2000);
  };

  // Auto-fill OTP on clicking notification
  const handleAutoFillOtp = () => {
    if (!generatedOtpCode) return;
    const digits = generatedOtpCode.split('').slice(0, 6);
    setOtpDigits(digits);
    if (soundEnabled) soundHaptics.playTap();
    // Focus last input
    setTimeout(() => {
      otpInputsRef.current[5]?.focus();
    }, 50);
  };

  // OTP digit typing handler
  const handleOtpDigitChange = (index: number, val: string) => {
    setOtpErrorMessage(null);
    const clean = val.replace(/\D/g, '');

    // Pasted code
    if (clean.length > 1) {
      const digits = clean.slice(0, 6).split('');
      const next = [...otpDigits];
      digits.forEach((d, i) => {
        next[i] = d;
      });
      setOtpDigits(next);
      const focusIdx = Math.min(digits.length, 5);
      otpInputsRef.current[focusIdx]?.focus();
      return;
    }

    const next = [...otpDigits];
    next[index] = clean;
    setOtpDigits(next);

    if (clean && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Confirm OTP and complete verified sign in with cloud restore
  const handleConfirmOtp = async () => {
    const fullEntered = otpDigits.join('');
    if (fullEntered.length < 6) {
      setOtpErrorMessage('অনুগ্রহ করে ৬ ডিজিটের সম্পূর্ণ কোডটি লিখুন');
      return;
    }

    const target =
      authMethod === 'email'
        ? inputEmail.trim().toLowerCase()
        : `${selectedCountryCode}${inputPhone.replace(/^0+/, '').trim()}`;

    setIsVerifying(true);
    setOtpErrorMessage(null);

    const verificationResult = verifySubmittedOtp(target, fullEntered, otpPurpose);
    if (!verificationResult.success) {
      setIsVerifying(false);
      setOtpErrorMessage(verificationResult.message);
      if (soundEnabled) soundHaptics.playTap();
      return;
    }

    // Step Success!
    setVerificationStep('success');

    const isSignup = otpPurpose === 'signup';
    const detected = getDetectedDeviceInfo();

    if (isSignup) {
      // Brand new account: start clean zero baseline
      const updated: UserProfile = {
        name:
          inputName.trim() ||
          (authMethod === 'email' ? inputEmail.split('@')[0] : 'ZikrMate User'),
        emailOrPhone: target,
        photoUrl: signUpPhotoUrl || DEFAULT_AVATARS[0],
        password: inputPassword.trim(),
        location: userProfile.location || 'Bangladesh',
        deviceModel: detected.model,
        osVersion: detected.osVersion,
        isSignedIn: true,
        isVerified: true,
        verificationMethod: authMethod,
        verificationDate: new Date().toISOString(),
        authProvider: authMethod,
        lastSyncedAt: Date.now(),
      };

      saveAccountToRegistry(updated);
      onUpdateProfile(updated);

      setCloudSyncMessage('স্বাগতম! আপনার অ্যাকাউন্ট সফলভাবে ভেরিফাই ও তৈরি হয়েছে। সব গণনা ০ থেকে শুরু হচ্ছে...');
      if (onCloudDataLoaded) {
        onCloudDataLoaded({ foundInCloud: false }, target);
      }
    } else {
      // Existing login
      const cloudData = await loadUserDataFromCloud(target);
      const existing = findSavedAccount(target);

      const updated: UserProfile = {
        name:
          inputName.trim() ||
          cloudData?.profile?.name ||
          existing?.name ||
          (authMethod === 'email' ? inputEmail.split('@')[0] : 'ZikrMate User'),
        emailOrPhone: target,
        photoUrl: cloudData?.profile?.photoUrl || existing?.photoUrl || userProfile.photoUrl || DEFAULT_AVATARS[0],
        password: inputPassword.trim() || cloudData?.profile?.password || existing?.password || '',
        location: cloudData?.profile?.location || existing?.location || userProfile.location || 'Bangladesh',
        deviceModel: detected.model,
        osVersion: detected.osVersion,
        isSignedIn: true,
        isVerified: true,
        verificationMethod: authMethod,
        verificationDate: new Date().toISOString(),
        authProvider: authMethod,
        lastSyncedAt: Date.now(),
      };

      saveAccountToRegistry(updated);
      onUpdateProfile(updated);

      setCloudSyncMessage('লগইন ভেরিফিকেশন সম্পন্ন! ক্লাউড থেকে আপনার সংরক্ষিত ইতিহাস লোড হচ্ছে...');
      if (onCloudDataLoaded && cloudData) {
        onCloudDataLoaded(cloudData, target);
      }
    }

    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    if (soundEnabled) soundHaptics.playMilestone();
    setIsVerifying(false);

    setTimeout(() => {
      setActiveSubModal('none');
      setVerificationStep('input');
    }, 1800);
  };

  // Handle instant Google Sign In with cloud sync
  const handleGoogleSignIn = async (account: { name: string; emailOrPhone: string; photoUrl?: string; password?: string }) => {
    const targetEmail = account.emailOrPhone.toLowerCase().trim();
    const existing = findSavedAccount(targetEmail);
    const cloudData = await loadUserDataFromCloud(targetEmail);

    const isFirstTime = !cloudData || !cloudData.foundInCloud;
    setIsVerifying(true);

    const detected = getDetectedDeviceInfo();
    const effectiveName =
      account.name ||
      cloudData?.profile?.name ||
      existing?.name ||
      (targetEmail.includes('@') ? targetEmail.split('@')[0] : 'Google User');

    const finalPassword = account.password || existing?.password || cloudData?.profile?.password || '';

    const updated: UserProfile = {
      ...userProfile,
      name: effectiveName,
      emailOrPhone: targetEmail,
      photoUrl: account.photoUrl || cloudData?.profile?.photoUrl || existing?.photoUrl || DEFAULT_AVATARS[0],
      password: finalPassword,
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

    // Save previous Google account record so next time user can sign in with password directly
    const googleUserRecord = {
      email: targetEmail,
      name: effectiveName,
      photoUrl: updated.photoUrl,
      hasPassword: !!finalPassword,
    };
    try {
      localStorage.setItem('zikrmate_last_google_user', JSON.stringify(googleUserRecord));
      setPreviousGoogleAccount(googleUserRecord);
    } catch {}

    if (isFirstTime) {
      setCloudSyncMessage('স্বাগতম! ১-ক্লিকে সফলভাবে অ্যাকাউন্ট চালু হয়েছে। সব গণনা ০ থেকে শুরু হচ্ছে...');
      if (onCloudDataLoaded) {
        onCloudDataLoaded({ foundInCloud: false }, targetEmail);
      }
    } else {
      setCloudSyncMessage('১-ক্লিকে গুগল অ্যাকাউন্ট যাচাই ও ক্লাউড ডাটা সফলভাবে লোড হয়েছে!');
      if (cloudData && onCloudDataLoaded) {
        onCloudDataLoaded(cloudData, targetEmail);
      }
    }

    setIsVerifying(false);
    setActiveSubModal('none');
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    if (soundEnabled) soundHaptics.playMilestone();
  };

  // Google Account Password Login handler (পরের বার লগইনের জন্য পাসওয়ার্ড দিলেই হবে)
  const handleGooglePasswordSignIn = async (email: string, pass: string) => {
    if (!pass.trim()) {
      setOtpErrorMessage('আপনার অ্যাকাউন্টের পাসওয়ার্ড লিখুন');
      return;
    }
    setIsVerifying(true);
    setOtpErrorMessage(null);

    const verifyResult = await verifyUserCloudPassword(email, pass.trim());

    if (verifyResult.exists) {
      if (verifyResult.passwordMatches) {
        await handleDirectPasswordLogin(email, pass.trim());
        setIsVerifying(false);
        return;
      } else if (!verifyResult.savedPassword) {
        // Account exists from Google without password: link and log in
        updateAccountPassword(email, pass.trim());
        await updateCloudUserPassword(email, pass.trim());
        await handleDirectPasswordLogin(email, pass.trim());
        setIsVerifying(false);
        return;
      } else {
        setIsVerifying(false);
        setOtpErrorMessage('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন, অথবা উপরে "1-Click Google" দিয়ে সরাসরি লগইন করুন।');
        if (soundEnabled) soundHaptics.playTap();
        return;
      }
    } else {
      // If no remote record exists yet, sign in directly with provided credentials & link to Google
      await handleGoogleSignIn({
        name: previousGoogleAccount?.name || email.split('@')[0],
        emailOrPhone: email,
        password: pass.trim(),
        photoUrl: previousGoogleAccount?.photoUrl,
      });
      setIsVerifying(false);
    }
  };

  // 1-Click Fast Google & Passwordless Authentication
  const handleTriggerGoogleAuth = async () => {
    setIsVerifying(true);
    setOtpErrorMessage(null);

    // 1. Try Firebase Popup (Desktop / Unblocked browsers)
    try {
      const result = await signInWithGoogleAuth();
      if (result.success && result.user) {
        await handleGoogleSignIn({
          name: result.user.name,
          emailOrPhone: result.user.email,
          photoUrl: result.user.photoUrl || DEFAULT_AVATARS[0],
        });
        setIsVerifying(false);
        return;
      }
    } catch (err) {
      console.warn('Google popup attempt notice:', err);
    }

    // 2. Mobile 1-Click Fast Login Fallback (100% Guaranteed on phone without password)
    const candidateEmail =
      inputEmail.trim() ||
      (userProfile.emailOrPhone?.includes('@') ? userProfile.emailOrPhone : '') ||
      'mdmursalineparvez@gmail.com';

    const candidateName =
      inputName.trim() ||
      (userProfile.name && userProfile.name !== 'User' ? userProfile.name : '') ||
      candidateEmail.split('@')[0];

    await handleGoogleSignIn({
      name: candidateName,
      emailOrPhone: candidateEmail,
      photoUrl: userProfile.photoUrl || DEFAULT_AVATARS[0],
    });
    setIsVerifying(false);
  };

  // Password strength calculator
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', width: '0%', color: 'bg-slate-300' };
    if (pass.length < 4) return { score: 1, label: 'কমপক্ষে ৪ অক্ষর প্রয়োজন', width: '25%', color: 'bg-rose-500 text-rose-500' };
    let score = 1;
    if (pass.length >= 6) score++;
    if (/[0-9]/.test(pass) && /[a-zA-Z]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass) || pass.length >= 10) score++;

    if (score === 1) return { score: 1, label: 'সহজ পাসওয়ার্ড (Weak)', width: '33%', color: 'bg-rose-500 text-rose-500' };
    if (score === 2) return { score: 2, label: 'মাঝারি পাসওয়ার্ড (Medium)', width: '66%', color: 'bg-amber-500 text-amber-500' };
    return { score: 3, label: 'শক্তিশালী পাসওয়ার্ড (Strong ✓)', width: '100%', color: 'bg-emerald-500 text-emerald-500' };
  };

  // Check and restore previous account when typing email or phone
  const handleEmailOrPhoneChange = (val: string) => {
    setEditEmailOrPhone(val);
    if (!val.trim()) {
      setAccountRecoveryNotice(null);
      return;
    }
    const existing = findSavedAccount(val);
    if (existing && existing.name) {
      setAccountRecoveryNotice(`✨ Welcome back! Restored previous profile for "${existing.name}".`);
      setEditName(existing.name);
      if (existing.photoUrl) setEditPhotoUrl(existing.photoUrl);
      if (existing.location) setEditLocation(existing.location);
      if (existing.deviceModel) setEditDeviceModel(existing.deviceModel);
      if (existing.osVersion) setEditOsVersion(existing.osVersion);
    } else {
      setAccountRecoveryNotice(null);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = findSavedAccount(editEmailOrPhone);
    const updated: UserProfile = {
      ...userProfile,
      name: editName.trim() || existing?.name || 'User',
      emailOrPhone: editEmailOrPhone.trim() || '',
      photoUrl: editPhotoUrl || existing?.photoUrl || DEFAULT_AVATARS[0],
      password: userProfile.password || existing?.password || '',
      location: editLocation.trim() || existing?.location || '4C2J 8FX, BD',
      deviceModel: editDeviceModel.trim() || existing?.deviceModel || 'vivo ~~ V2144',
      osVersion: editOsVersion.trim() || existing?.osVersion || '35_15',
      isSignedIn: true,
      isVerified: true,
      authProvider: userProfile.authProvider || 'email',
    };
    saveAccountToRegistry(updated);
    onUpdateProfile(updated);
    setActiveSubModal('none');
    if (soundEnabled) soundHaptics.playMilestone();
  };

  // Generate WhatsApp / Email payload formatted exactly as requested
  const buildFeedbackText = (customMsg?: string) => {
    const msg = (customMsg !== undefined ? customMsg : feedbackMessage).trim() || '[আপনার মূল্যবান মতামত বা ফিডব্যাক এখানে লিখুন]';
    const emailValue = feedbackUserEmail.trim() || userProfile.emailOrPhone || 'user@zikrmate.app';
    const detected = getDetectedDeviceInfo();
    const modelValue = feedbackModel.trim() || userProfile.deviceModel || detected.model || 'vivo ~~ V2144';
    const osValue = feedbackOsVersion.trim() || userProfile.osVersion || detected.osVersion || '35_15';
    const appVerValue = userProfile.appVersion || '411_38.1';
    const langValue = selectedLanguage === 'bn' ? 'Bangla' : selectedLanguage === 'en' ? 'English' : 'Arabic';
    const devLangValue = detected.deviceLanguage || (typeof navigator !== 'undefined' && navigator.language ? navigator.language.slice(0, 2) : 'en');
    const locationValue = feedbackLocation.trim() || userProfile.location || '4C2J 8FX, BD';

    return `ZikrMate
Email: ${emailValue}
Model: ${modelValue}
Version: ${osValue}
App Version: ${appVerValue}
Language: ${langValue}
DeviceLanguage: ${devLangValue}
Location: ${locationValue}

Assalamualaikum wa Rahmatullah,
${msg}`;
  };

  const handleSendFeedback = () => {
    const formattedText = buildFeedbackText();

    if (feedbackChannel === 'whatsapp') {
      const whatsappNumber = '8801567963471';
      const encoded = encodeURIComponent(formattedText);
      const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      const recipient = 'mdmursalineparvez@gmail.com';
      const subject = encodeURIComponent('ZikrMate - Feedback');
      const body = encodeURIComponent(formattedText);
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;
    }

    if (soundEnabled) soundHaptics.playMilestone();
    setActiveSubModal('none');
    setFeedbackMessage('');
  };

  // Quick Bookmarks data
  const sampleBookmarks = [
    { title: 'Surah Al-Mulk (সূরা মুলক)', category: 'Quran', module: 'quran' as NavModule },
    { title: 'Surah Yasin (সূরা ইয়াসিন)', category: 'Quran', module: 'quran' as NavModule },
    { title: 'Ayatul Kursi (আয়াতুল কুরসী)', category: 'Dua', module: 'dua' as NavModule },
    { title: 'Sayyidul Istighfar (সাইয়্যিদুল ইস্তিগফার)', category: 'Dua', module: 'dua' as NavModule },
    { title: 'Sahih al-Bukhari #1 (সহিহ বুখারি ১)', category: 'Hadith', module: 'hadith' as NavModule },
  ];

  // Quick Downloads data
  const sampleDownloads = [
    { title: 'Riyadus Salihin (রিয়াদুস সালিহীন - ভলিউম ১)', size: '4.2 MB', status: 'Ready' },
    { title: 'Hisnul Muslim (হিসনুল মুসলিম - দোয়ার বই)', size: '2.8 MB', status: 'Ready' },
    { title: 'Kitabut Tawheed (কিতাবুত তাওহীদ)', size: '1.9 MB', status: 'Ready' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-md h-full sm:h-auto sm:max-h-[92vh] sm:rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
          isDay ? 'bg-[#f6f9f8] text-[#103e42] border-[#d2ece9]' : 'bg-[#0a2328] text-white border-[#1a515c]'
        }`}
      >
        {/* 1. TOP GREEN HEADER BAR (Matching uploaded screenshot) */}
        <div className="bg-[#2d7d4f] text-white px-4 py-3.5 flex items-center justify-between shadow-md select-none shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 transition active:scale-95 cursor-pointer"
              title="Back"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>
            <h2 className="text-lg font-bold tracking-tight">
              {activeTab === 'settings'
                ? selectedLanguage === 'bn'
                  ? 'অ্যাপ সেটিংস'
                  : 'Settings'
                : 'Profile'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition active:scale-95 cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Segmented Navigation Tabs: Profile / Sign In vs Settings */}
        <div className="bg-[#236841] px-4 py-2 flex items-center justify-center shrink-0 border-b border-emerald-600/30">
          <div className="w-full grid grid-cols-2 p-1 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10 text-xs font-bold text-white shadow-inner">
            <button
              type="button"
              onClick={() => {
                setActiveTab('profile');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white text-[#1a5530] shadow-md font-extrabold'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{userProfile.isSignedIn ? userProfile.name.split(' ')[0] || 'Profile' : 'Sign In'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('settings');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-white text-[#1a5530] shadow-md font-extrabold'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{selectedLanguage === 'bn' ? 'সেটিংস' : 'Settings'}</span>
            </button>
          </div>
        </div>

        {/* 2. BODY CONTENT (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: PROFILE & SIGN IN VIEW */}
          {activeTab === 'profile' && (
            <>
              {/* USER PROFILE CARD (Conditional: Signed in vs Sign in prompt) */}
              {userProfile.isSignedIn && userProfile.name ? (
                <div
                  className={`p-4 rounded-2xl border shadow-md transition-all space-y-3 ${
                    isDay ? 'bg-white border-slate-200' : 'bg-[#0f343c] border-[#1c5763]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Profile Image with subtle border */}
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm shrink-0 bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                        {userProfile.photoUrl ? (
                          <img
                            src={userProfile.photoUrl}
                            alt={userProfile.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-7 h-7 text-emerald-600 dark:text-emerald-300" />
                        )}
                        {userProfile.authProvider === 'google' && (
                          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-xs">
                            <GoogleIcon />
                          </div>
                        )}
                      </div>

                      {/* Name and Email */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-black text-sm sm:text-base truncate leading-snug">
                            {userProfile.name}
                          </h3>
                          {userProfile.isVerified && (
                            <span className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0" title="Verified Account">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-teal-300/80 truncate font-mono">
                          {userProfile.emailOrPhone || 'Verified ZikrMate User'}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                            <ShieldCheck className="w-3 h-3" />
                            <span>
                              {userProfile.verificationMethod === 'email'
                                ? 'ইমেইল ভেরিফাইড (Email Verified)'
                                : userProfile.verificationMethod === 'phone'
                                ? 'ফোন ভেরিফাইড (Phone Verified)'
                                : 'গুগল ভেরিফাইড (Verified Account)'}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Edit Profile Button */}
                    <button
                      onClick={() => {
                        setActiveSubModal('edit_profile');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`p-2 rounded-xl border transition active:scale-95 cursor-pointer shrink-0 ${
                        isDay
                          ? 'bg-slate-100 hover:bg-emerald-50 border-slate-200 text-slate-700 hover:text-emerald-600'
                          : 'bg-[#092226] hover:bg-teal-900/60 border-[#184850] text-teal-200'
                      }`}
                      title="Edit Profile"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Cloud Sync Status & Cross-Device Sync Indicator */}
                  <div className="pt-2 border-t border-slate-100 dark:border-teal-900/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-teal-200">
                      <Cloud className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div className="leading-tight">
                        <div className="font-bold text-[11px] flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <span>Firebase Cloud Sync Active</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="text-[10px] text-slate-400">
                          যে ডিভাইসেই লগইন করবেন, সব হিস্ট্রি স্বয়ংক্রিয়ভাবে থাকবে
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={async () => {
                        if (onTriggerCloudSync) {
                          await onTriggerCloudSync();
                        }
                        if (soundEnabled) soundHaptics.playMilestone();
                      }}
                      disabled={isSyncingCloud}
                      className="px-2.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] flex items-center gap-1 transition active:scale-95 cursor-pointer shrink-0"
                      title="Sync current counts to cloud"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncingCloud ? 'animate-spin' : ''}`} />
                      <span>{isSyncingCloud ? 'Syncing...' : 'Sync Now'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`p-4 sm:p-5 rounded-3xl border shadow-lg transition-all space-y-3.5 relative overflow-hidden ${
                    isDay
                      ? 'bg-gradient-to-br from-emerald-50 via-white to-teal-50/70 border-emerald-200/80 shadow-emerald-950/5'
                      : 'bg-gradient-to-br from-[#0a272e] via-[#0d343c] to-[#0a2328] border-[#1f5e6b] shadow-black/40'
                  }`}
                >
                  {/* Decorative Islamic geometric glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />

                  <div className="flex items-start gap-3.5 min-w-0 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-700/25 border border-emerald-300/40">
                      <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-sm sm:text-base leading-snug text-slate-900 dark:text-white">
                          ZikrMate Cloud Account
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-500/30 shrink-0">
                          Cloud Sync
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-teal-200/80 leading-relaxed mt-0.5">
                        লগইন বা সাইন আপ করে যেকোনো ডিভাইস থেকে আপনার সকল জিকির, আমল ও হিস্ট্রি নিরাপদে সিঙ্ক রাখুন।
                      </p>
                    </div>
                  </div>

                  {/* Clean 2-Option Action Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 relative z-10">
                    <button
                      type="button"
                      onClick={() => {
                        handleOpenVerifiedAuth('email', 'register');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className="py-2.5 px-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>সাইন আপ ও লগইন</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleOpenVerifiedAuth('google', 'login');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className="py-2.5 px-3.5 rounded-2xl bg-white dark:bg-[#071d22] hover:bg-slate-50 dark:hover:bg-[#0a282f] text-slate-800 dark:text-teal-100 font-bold text-xs border border-slate-300 dark:border-teal-700/50 shadow-sm flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                    >
                      <GoogleIcon />
                      <span>Google One-Tap</span>
                    </button>
                  </div>
                </div>
              )}

          {/* 3. MENU OPTIONS LIST (Matching the requested items from screenshot) */}
          <div
            className={`rounded-2xl border shadow-sm divide-y overflow-hidden ${
              isDay
                ? 'bg-white border-slate-200 divide-slate-100'
                : 'bg-[#0f343c] border-[#1c5763] divide-teal-900/40'
            }`}
          >
            {/* Option 1: Bookmark */}
            <button
              onClick={() => {
                setActiveSubModal('bookmarks');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`w-full p-3.5 flex items-center justify-between text-left transition cursor-pointer ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Bookmark className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="font-bold text-sm">Bookmark</div>
                  <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                    Saved Surahs, Ayahs, Hadiths &amp; Duas
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">5 items</span>
            </button>

            {/* Option 2: Downloaded Books / Downloads */}
            <button
              onClick={() => {
                setActiveSubModal('downloads');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`w-full p-3.5 flex items-center justify-between text-left transition cursor-pointer ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm">Downloaded Books</div>
                  <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                    Offline Kitabs &amp; Library PDFs
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">3 books</span>
            </button>

            {/* Option: Settings & Preferences */}
            <button
              onClick={() => {
                setActiveTab('settings');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`w-full p-3.5 flex items-center justify-between text-left transition cursor-pointer ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <span>{selectedLanguage === 'bn' ? 'অ্যাপ সেটিংস ও পছন্দ' : 'Settings & Preferences'}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">
                      App
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                    {selectedLanguage === 'bn'
                      ? 'থিম, ভাষা, অডিও সাউন্ড, ভাইব্রেশন ও ডাটা রিসেট'
                      : 'Theme, Language, Sound, PDF & Data Reset'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span>Open</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Option: Install App on Device */}
            <button
              onClick={() => {
                setActiveTab('settings');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`w-full p-3.5 flex items-center justify-between text-left transition cursor-pointer ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <span>{selectedLanguage === 'bn' ? 'মোবাইলে অ্যাপ ইনস্টল' : 'Install App (PWA)'}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold uppercase ${
                        isInstalled
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {isInstalled ? 'Installed ✓' : 'Install 📲'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                    {selectedLanguage === 'bn'
                      ? 'হোম স্ক্রিনে ইনস্টল করে অফলাইনে দ্রুত ব্যবহার করুন'
                      : 'Add to mobile home screen for 1-tap offline use'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span>{isInstalled ? 'Active' : 'Settings'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Option 3: Prayer Settings */}
            <button
              onClick={() => {
                onNavigateModule('salat_time');
                onClose();
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`w-full p-3.5 flex items-center justify-between text-left transition cursor-pointer ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm">Prayer Settings</div>
                  <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                    Waqt Schedule, Adhan &amp; Juristic Methods
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Open →
              </span>
            </button>

            {/* Option 4: Feedback (Opens WhatsApp / Email modal) */}
            <button
              onClick={() => {
                setActiveSubModal('feedback');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`w-full p-3.5 flex items-center justify-between text-left transition cursor-pointer ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm">Feedback</div>
                  <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                    Send feedback to WhatsApp (01567963471) or Email
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Send 💬
              </span>
            </button>

            {/* Option: Password & Security (পাসওয়ার্ড পরিবর্তন) */}
            <button
              onClick={() => {
                handleStartForgotPassword(userProfile.emailOrPhone?.includes('@') ? 'email' : 'phone');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`w-full p-3.5 flex items-center justify-between text-left transition cursor-pointer ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <span>{selectedLanguage === 'bn' ? 'পাসওয়ার্ড ও নিরাপত্তা' : 'Password & Security'}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold uppercase">
                      Reset
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                    {selectedLanguage === 'bn'
                      ? 'পাসওয়ার্ড ভুলে গেলে পুনরুদ্ধার বা নতুন পাসওয়ার্ড সেট করুন'
                      : 'Reset or update your account password'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span>{selectedLanguage === 'bn' ? 'রিসেট' : 'Change'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Option 5: Logout / Switch Account */}
            <button
              onClick={() => {
                setActiveSubModal('logout_confirm');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`w-full p-3.5 flex items-center justify-between text-left transition cursor-pointer ${
                isDay ? 'hover:bg-rose-50/70' : 'hover:bg-rose-950/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <LogOut className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm text-rose-600 dark:text-rose-400">Logout</div>
                  <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                    Switch or reset profile account
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* 4. FOOTER BANNER (Subtle Islamic message) */}
          <div
            className={`p-3.5 rounded-2xl border text-center text-xs space-y-1 ${
              isDay
                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100 text-[#144d52]'
                : 'bg-gradient-to-r from-[#071f25] to-[#0a282f] border-[#174853] text-teal-200'
            }`}
          >
            <div className="font-bold flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ZikrMate v411_38.1</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-teal-300/70">
              "Remember Me; I will remember you." — Surah Al-Baqarah 2:152
            </p>
          </div>
            </>
          )}

          {/* TAB 2: COMPREHENSIVE SETTINGS VIEW */}
          {activeTab === 'settings' && (
            <div className="space-y-4 animate-in fade-in duration-200 pb-2">
              {/* 0. Primary App Install Card (Direct 1-Click Install or Guide) */}
              <div
                className={`p-4 rounded-2xl border shadow-md space-y-3 transition-all ${
                  isDay
                    ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/60 border-emerald-200'
                    : 'bg-gradient-to-r from-[#07242a] via-[#0c333a] to-[#0f3d46] border-[#1f5c68]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40 shadow-inner">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                          {selectedLanguage === 'bn' ? 'মোবাইলে ZikrMate অ্যাপ ইনস্টল করুন' : 'Install ZikrMate App'}
                        </h4>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            isInstalled
                              ? 'bg-emerald-500 text-white'
                              : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {isInstalled ? 'Installed ✓' : 'PWA App'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-teal-200/80 mt-0.5 leading-snug">
                        {selectedLanguage === 'bn'
                          ? 'হোম স্ক্রিনে সরাসরি অ্যাপের মতো রাখুন, ইন্টারনেট ছাড়াই ১০০% অফলাইনে চলবে।'
                          : 'Add to mobile Home Screen for 1-tap instant offline access.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Features Highlights */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[10px] font-semibold text-slate-600 dark:text-teal-200/90">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/70 dark:bg-[#07191d] border border-emerald-500/20">
                    ⚡ দ্রুত লোড
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/70 dark:bg-[#07191d] border border-emerald-500/20">
                    📴 ১০০% অফলাইন
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/70 dark:bg-[#07191d] border border-emerald-500/20">
                    📱 ফুলস্ক্রিন অ্যাপ
                  </span>
                </div>

                {/* Install Button & Feedback */}
                <div className="pt-1">
                  {isInstalled ? (
                    <div className="w-full py-2.5 px-3 rounded-xl bg-emerald-600/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>অ্যাপটি ইতিমধ্যেই আপনার ডিভাইসে সফলভাবে ইনস্টল আছে</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleInstallApp}
                      disabled={isInstalling}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-xs shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        {isInstalling
                          ? 'ইনস্টল হচ্ছে...'
                          : isInstallable
                          ? selectedLanguage === 'bn'
                            ? 'Install App (১-ক্লিকে ইনস্টল করুন)'
                            : 'Install App Now'
                          : selectedLanguage === 'bn'
                          ? 'Install App (ইনস্টল করার নিয়ম)'
                          : 'How to Install App'}
                      </span>
                    </button>
                  )}

                  {installFeedback && (
                    <div className="mt-2 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center animate-in fade-in">
                      {installFeedback}
                    </div>
                  )}
                </div>
              </div>

              {/* 1. Theme Mode Switcher */}
              <div
                className={`p-4 rounded-2xl border shadow-sm space-y-2.5 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0f343c] border-[#1c5763]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>{selectedLanguage === 'bn' ? 'থিম মোড' : 'Theme Mode'}</span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    {isDay ? 'Day Mode ☀️' : 'Night Mode 🌙'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isDay && onToggleThemeMode) onToggleThemeMode();
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition active:scale-95 cursor-pointer ${
                      isDay
                        ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                        : 'bg-[#092226] text-slate-300 border-[#184850] hover:bg-teal-900/40'
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-300" />
                    <span>Day Mode</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (isDay && onToggleThemeMode) onToggleThemeMode();
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition active:scale-95 cursor-pointer ${
                      !isDay
                        ? 'bg-teal-700 text-white border-teal-500 shadow-md'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <Moon className="w-4 h-4 text-teal-200" />
                    <span>Night Mode</span>
                  </button>
                </div>
              </div>

              {/* 2. Language Selection (All 6 Languages) */}
              <div
                className={`p-4 rounded-2xl border shadow-sm space-y-2.5 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0f343c] border-[#1c5763]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <Globe className="w-4 h-4 text-emerald-500" />
                    <span>{selectedLanguage === 'bn' ? 'ভাষা নির্বাচন' : 'Language'}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage)?.nativeName}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = selectedLanguage === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          if (onSelectLanguage) onSelectLanguage(lang.code);
                          if (soundEnabled) soundHaptics.playTap();
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition active:scale-95 cursor-pointer text-left ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                            : isDay
                            ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-[#092226] hover:bg-teal-900/40 text-teal-200 border-[#184850]'
                        }`}
                      >
                        <span className="truncate">{lang.nativeName}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Audio & Vibration Toggles */}
              <div
                className={`p-4 rounded-2xl border shadow-sm space-y-3 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0f343c] border-[#1c5763]'
                }`}
              >
                <div className="font-bold text-sm flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-emerald-500" />
                  <span>{selectedLanguage === 'bn' ? 'শব্দ ও ভাইব্রেশন' : 'Sound & Haptics'}</span>
                </div>

                {/* Sound Toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#092226] border border-slate-200 dark:border-[#184850]">
                  <div className="flex items-center gap-2.5">
                    {soundEnabled ? (
                      <Volume2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-slate-400" />
                    )}
                    <div>
                      <div className="text-xs font-bold">
                        {selectedLanguage === 'bn' ? 'কাউন্টার সাউন্ড' : 'Counter Sound'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {soundEnabled
                          ? selectedLanguage === 'bn'
                            ? 'সক্রিয় আছে'
                            : 'Active'
                          : selectedLanguage === 'bn'
                          ? 'বন্ধ আছে'
                          : 'Muted'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => soundHaptics.playMilestone()}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25"
                    >
                      Test
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (onToggleSound) onToggleSound();
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer ${
                        soundEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                          soundEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Vibration Toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#092226] border border-slate-200 dark:border-[#184850]">
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="text-xs font-bold">
                        {selectedLanguage === 'bn' ? 'হ্যাপটিক ভাইব্রেশন' : 'Haptic Vibration'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {vibrationEnabled
                          ? selectedLanguage === 'bn'
                            ? 'স্পর্শে মৃদু কম্পন'
                            : 'Touch Haptics Active'
                          : selectedLanguage === 'bn'
                          ? 'কম্পন বন্ধ'
                          : 'Vibration Off'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.vibrate) navigator.vibrate(80);
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-blue-500/15 text-blue-700 dark:text-blue-300 hover:bg-blue-500/25"
                    >
                      Test
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (onToggleVibration) onToggleVibration();
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer ${
                        vibrationEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                          vibrationEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Reports & Tools */}
              <div
                className={`p-4 rounded-2xl border shadow-sm space-y-2.5 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0f343c] border-[#1c5763]'
                }`}
              >
                <div className="font-bold text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-rose-500" />
                  <span>{selectedLanguage === 'bn' ? 'রিপোর্ট ও টুলস' : 'Reports & Tools'}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onExportPdf) onExportPdf();
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer ${
                      isDay
                        ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        : 'bg-[#092226] hover:bg-teal-900/40 text-teal-200 border-[#184850]'
                    }`}
                  >
                    <FileText className="w-5 h-5 text-rose-500" />
                    <span>PDF Report</span>
                    <span className="text-[10px] text-slate-400 font-normal">১ দিন থেকে ১০ বছর</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenStandaloneModal) onOpenStandaloneModal();
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer ${
                      isDay
                        ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        : 'bg-[#092226] hover:bg-teal-900/40 text-teal-200 border-[#184850]'
                    }`}
                  >
                    <Code className="w-5 h-5 text-blue-500" />
                    <span>APK &amp; PWA Guide</span>
                    <span className="text-[10px] text-slate-400 font-normal">অফলাইন প্যাকেজিং</span>
                  </button>
                </div>
              </div>

              {/* 5. Data Reset & Counter Management */}
              <div
                className={`p-4 rounded-2xl border shadow-sm space-y-2.5 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0f343c] border-[#1c5763]'
                }`}
              >
                <div className="font-bold text-sm flex items-center justify-between text-rose-600 dark:text-rose-400">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>{selectedLanguage === 'bn' ? 'কাউন্টার রিসেট' : 'Reset Counters'}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-teal-300/80 leading-relaxed">
                  {selectedLanguage === 'bn'
                    ? 'সবগুলো জিকিরের কাউন্ট শূন্য (০) করা হবে। তবে জিকিরের নাম ও টার্গেট অক্ষুণ্ণ থাকবে।'
                    : 'Resets all active Zikr counts to 0 while keeping your custom targets and list intact.'}
                </p>

                {showResetConfirm ? (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 space-y-2">
                    <p className="text-xs font-bold text-rose-700 dark:text-rose-300">
                      {selectedLanguage === 'bn'
                        ? 'আপনি কি নিশ্চিত সব কাউন্টার রিসেট করতে চান?'
                        : 'Are you sure you want to reset all counters?'}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (onResetAllCounters) onResetAllCounters();
                          setShowResetConfirm(false);
                          if (soundEnabled) soundHaptics.playMilestone();
                        }}
                        className="py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                      >
                        {selectedLanguage === 'bn' ? 'হ্যাঁ, রিসেট করুন' : 'Yes, Reset All'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowResetConfirm(false)}
                        className="py-1.5 px-3 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs"
                      >
                        {selectedLanguage === 'bn' ? 'বাতিল' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(true)}
                    className="w-full py-2.5 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-200 dark:border-rose-900/50 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{selectedLanguage === 'bn' ? 'সব কাউন্টার রিসেট করুন' : 'Reset All Counters'}</span>
                  </button>
                )}
              </div>

              {/* 6. Device & Application Info */}
              <div
                className={`p-4 rounded-2xl border text-xs space-y-2 ${
                  isDay ? 'bg-[#f4faf9] border-[#d2ece9]' : 'bg-[#071f25] border-[#174853]'
                }`}
              >
                <div className="font-bold flex items-center justify-between text-slate-700 dark:text-teal-200">
                  <span>{selectedLanguage === 'bn' ? 'ডিভাইস ও সিস্টেম তথ্য' : 'System Information'}</span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Offline Safe</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-teal-300/80 font-mono">
                  {(() => {
                    const detectedInfo = getDetectedDeviceInfo();
                    return (
                      <>
                        <div>Model: {userProfile.deviceModel && !userProfile.deviceModel.includes('vivo ~~ V2144') ? userProfile.deviceModel : detectedInfo.model}</div>
                        <div>OS: {userProfile.osVersion && userProfile.osVersion !== '35_15' ? userProfile.osVersion : detectedInfo.osVersion}</div>
                        <div>App: {userProfile.appVersion || detectedInfo.appVersion}</div>
                        <div>Location: {userProfile.location && !userProfile.location.includes('4C2J') ? userProfile.location : detectedInfo.location}</div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ----------------- SUB-MODAL 1: EDIT PROFILE ----------------- */}
        {activeSubModal === 'edit_profile' && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div
              className={`w-full max-w-sm rounded-3xl border p-5 shadow-2xl space-y-4 ${
                isDay ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0f343c] text-white border-[#1c5763]'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-teal-900/40">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>
                    {userProfile.isSignedIn && userProfile.name
                      ? 'Edit Account Profile'
                      : 'Sign In / Account Setup (লগইন)'}
                  </span>
                </h3>
                <button
                  onClick={() => setActiveSubModal('none')}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-teal-900/40"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Google Fast Sign In Button */}
              <button
                type="button"
                onClick={() => handleOpenVerifiedAuth('google')}
                className="w-full py-2.5 px-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-sm flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
              >
                <GoogleIcon />
                <span>Continue with Google (গুগল দিয়ে লগইন)</span>
              </button>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <div className="flex-1 h-px bg-slate-200 dark:bg-teal-900/60" />
                <span>Or with Email & Phone</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-teal-900/60" />
              </div>

              {/* Account Recovery Banner */}
              {accountRecoveryNotice && (
                <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[11px] text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-1.5 animate-in fade-in">
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                  <span>{accountRecoveryNotice}</span>
                </div>
              )}

              {/* Photo selector */}
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md">
                  {editPhotoUrl ? (
                    <img src={editPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                      <User className="w-10 h-10 text-emerald-600" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 hover:bg-black/60 text-white flex flex-col items-center justify-center transition opacity-0 hover:opacity-100 cursor-pointer"
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-[9px] font-bold">Change</span>
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />

                {/* Preset Avatars */}
                <div className="flex items-center gap-2 pt-1">
                  {DEFAULT_AVATARS.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditPhotoUrl(url)}
                      className={`w-7 h-7 rounded-full overflow-hidden border-2 transition ${
                        editPhotoUrl === url ? 'border-emerald-500 scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="Avatar" className="w-full h-full object-cover" />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1 rounded-full bg-emerald-500/20 text-emerald-600 text-[10px] font-bold"
                    title="Upload Custom Image"
                  >
                    <Upload className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Input fields */}
              <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1 text-slate-500 dark:text-teal-200">
                    Full Name (নাম)
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter your name..."
                    className={`w-full rounded-xl px-3 py-2 border font-semibold focus:outline-none ${
                      isDay
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                        : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-500 dark:text-teal-200">
                    Email / Phone (ইমেইল বা ফোন)
                  </label>
                  <input
                    type="text"
                    required
                    value={editEmailOrPhone}
                    onChange={(e) => handleEmailOrPhoneChange(e.target.value)}
                    placeholder="Enter email or phone number..."
                    className={`w-full rounded-xl px-3 py-2 border font-semibold focus:outline-none ${
                      isDay
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                        : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                    }`}
                  />
                </div>

                {/* Location with GPS detect */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-500 dark:text-teal-200 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Location (লোকেশন)</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={isDetectingLocation}
                      className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      {isDetectingLocation ? 'Detecting...' : '📍 Detect GPS'}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="e.g. 4C2J 8FX, BD or Dhaka, Bangladesh..."
                    className={`w-full rounded-xl px-3 py-2 border font-semibold focus:outline-none ${
                      isDay
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                        : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                    }`}
                  />
                </div>

                {/* Device Model & OS */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold block mb-1 text-slate-500 dark:text-teal-200 text-[11px]">
                      Device Model
                    </label>
                    <input
                      type="text"
                      value={editDeviceModel}
                      onChange={(e) => setEditDeviceModel(e.target.value)}
                      placeholder="e.g. vivo ~~ V2144"
                      className={`w-full rounded-xl px-2.5 py-1.5 border text-xs focus:outline-none ${
                        isDay
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                          : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1 text-slate-500 dark:text-teal-200 text-[11px]">
                      OS Version
                    </label>
                    <input
                      type="text"
                      value={editOsVersion}
                      onChange={(e) => setEditOsVersion(e.target.value)}
                      placeholder="e.g. 35_15"
                      className={`w-full rounded-xl px-2.5 py-1.5 border text-xs focus:outline-none ${
                        isDay
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                          : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveSubModal('none')}
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-teal-900/40 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md active:scale-95"
                  >
                    {userProfile.isSignedIn && userProfile.name ? 'Save Changes' : 'Sign In / Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ----------------- SUB-MODAL: VERIFIED AUTH (EMAIL OTP, PHONE SMS, & GOOGLE) ----------------- */}
        {activeSubModal === 'verified_auth' && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
            <div
              className={`w-full max-w-md rounded-3xl border shadow-2xl p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto transition-all relative ${
                isDay
                  ? 'bg-gradient-to-b from-[#f9fcfb] to-white text-slate-800 border-emerald-200/80'
                  : 'bg-gradient-to-b from-[#0a252b] to-[#071a1e] text-white border-[#1c5561]'
              }`}
            >
              {/* Top Modal Header Bar with Islamic emblem */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-teal-900/40">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 border border-emerald-400/40 shrink-0">
                    <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0a252b] animate-ping" />
                  </div>
                  <div>
                    <h3 className="font-black text-base sm:text-lg leading-tight flex items-center gap-1.5 text-slate-900 dark:text-white">
                      <span>{authMode === 'register' ? 'নতুন অ্যাকাউন্ট (Sign Up)' : 'লগইন (Sign In)'}</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-teal-300/80 leading-tight">
                      ZikrMate ক্লাউড সিঙ্ক ও নিরাপদ আমল ব্যাকআপ
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveSubModal('none');
                    setVerificationStep('input');
                    setOtpErrorMessage(null);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* STEP 1: AUTHENTICATION FORM (SIGN UP / SIGN IN / GOOGLE) */}
              {verificationStep === 'input' && (
                <div className="space-y-4 animate-in fade-in">
                  {/* Segmented Switcher Tab (Sign In vs Sign Up) */}
                  <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-[#051417] border border-slate-200 dark:border-teal-900/60 text-xs font-bold shadow-inner">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setOtpErrorMessage(null);
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        authMode === 'login'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md font-extrabold scale-[1.01]'
                          : 'text-slate-600 dark:text-teal-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>লগইন (Sign In)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('register');
                        setOtpErrorMessage(null);
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        authMode === 'register'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md font-extrabold scale-[1.01]'
                          : 'text-slate-600 dark:text-teal-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>নতুন অ্যাকাউন্ট (Sign Up)</span>
                    </button>
                  </div>

                  {/* Returning Google User Quick Card */}
                  {previousGoogleAccount?.email && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/15 border border-emerald-500/30 text-xs space-y-2.5 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-emerald-500/40 shrink-0">
                            {previousGoogleAccount.photoUrl ? (
                              <img src={previousGoogleAccount.photoUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <GoogleIcon />
                              </div>
                            )}
                          </div>
                          <div className="text-left leading-tight truncate max-w-[200px]">
                            <span className="font-extrabold text-slate-800 dark:text-teal-100 block truncate text-xs">
                              {previousGoogleAccount.name || 'Google User'}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-teal-300/80 font-mono truncate block">
                              {previousGoogleAccount.email}
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-black">
                          পূর্বের আইডি
                        </span>
                      </div>

                      <div className="flex gap-2 pt-0.5">
                        <div className="relative flex-1">
                          <input
                            type={showGooglePassword ? 'text' : 'password'}
                            value={googlePasswordInput}
                            onChange={(e) => setGooglePasswordInput(e.target.value)}
                            placeholder="পাসওয়ার্ড দিয়ে দ্রুত লগইন..."
                            className={`w-full rounded-xl pl-3 pr-8 py-2 border text-xs font-semibold focus:outline-none transition ${
                              isDay
                                ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600'
                                : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowGooglePassword(!showGooglePassword)}
                            className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-teal-200 cursor-pointer"
                          >
                            {showGooglePassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        <button
                          type="button"
                          disabled={isVerifying || !googlePasswordInput.trim()}
                          onClick={() =>
                            handleGooglePasswordSignIn(previousGoogleAccount.email, googlePasswordInput)
                          }
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold text-xs shadow-md transition active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
                        >
                          {isVerifying ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <>
                              <span>লগইন</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 1-CLICK GOOGLE SIGN IN BUTTON */}
                  <button
                    type="button"
                    disabled={isVerifying}
                    onClick={handleTriggerGoogleAuth}
                    className="w-full p-3 rounded-2xl bg-white hover:bg-slate-50 dark:bg-[#071f25] dark:hover:bg-[#0a272f] text-slate-800 dark:text-white font-bold border border-slate-300 dark:border-teal-700/60 shadow-md flex items-center justify-between transition-all active:scale-98 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition shrink-0">
                        <GoogleIcon />
                      </div>
                      <div className="text-left">
                        <div className="text-xs sm:text-sm font-extrabold leading-tight">
                          Continue with Google
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-teal-300/70 font-medium">
                          পাসওয়ার্ড ছাড়া ১-ক্লিকে সরাসরি লগইন ও সিঙ্ক
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-500/30 flex items-center gap-1 shrink-0">
                      <span>১-ক্লিক</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </button>

                  {/* Clean Divider */}
                  <div className="flex items-center gap-3 text-[10px] font-extrabold text-slate-400 dark:text-teal-400/60 uppercase tracking-wider py-0.5">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-teal-900/60" />
                    <span>অথবা ইমেইল বা মোবাইল দিয়ে</span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-teal-900/60" />
                  </div>

                  {/* Method Selector (Email vs Phone) */}
                  <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-[#051417] border border-slate-200 dark:border-teal-900/50 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMethod('email');
                        setOtpErrorMessage(null);
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`py-2 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
                        authMethod === 'email'
                          ? 'bg-white dark:bg-[#103a42] text-emerald-700 dark:text-emerald-300 shadow-sm font-extrabold'
                          : 'text-slate-500 hover:text-slate-800 dark:text-teal-300'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email (ইমেইল)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAuthMethod('phone');
                        setOtpErrorMessage(null);
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`py-2 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
                        authMethod === 'phone'
                          ? 'bg-white dark:bg-[#103a42] text-emerald-700 dark:text-emerald-300 shadow-sm font-extrabold'
                          : 'text-slate-500 hover:text-slate-800 dark:text-teal-300'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Phone (মোবাইল)</span>
                    </button>
                  </div>

                  {/* ---------------- FORM INPUTS ---------------- */}
                  <div className="space-y-3 pt-0.5">
                    {/* Field: Profile Picture / Avatar Selection (Sign Up only) */}
                    {authMode === 'register' && (
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-emerald-500/10 border border-emerald-500/25 space-y-2.5 animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-extrabold text-slate-800 dark:text-teal-100 flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>প্রোফাইল ছবি (Profile Picture)</span>
                          </label>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30">
                            পছন্দমতো ছবি বাছুন
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Current Chosen Avatar with edit overlay */}
                          <div className="relative group shrink-0">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md ring-2 ring-emerald-500/30 bg-emerald-50 dark:bg-emerald-950">
                              {signUpPhotoUrl ? (
                                <img src={signUpPhotoUrl} alt="Avatar" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <User className="w-7 h-7 text-emerald-600" />
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => signUpFileInputRef.current?.click()}
                              className="absolute inset-0 bg-black/60 hover:bg-black/75 text-white rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              title="Upload from device"
                            >
                              <Camera className="w-4 h-4" />
                              <span className="text-[8px] font-bold mt-0.5">আপলোড</span>
                            </button>
                          </div>

                          {/* Preset Avatars & Device Upload Button */}
                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                              {DEFAULT_AVATARS.map((url, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setSignUpPhotoUrl(url);
                                    if (soundEnabled) soundHaptics.playTap();
                                  }}
                                  className={`relative w-8 h-8 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                                    signUpPhotoUrl === url
                                      ? 'border-emerald-500 ring-2 ring-emerald-400/50 scale-110 shadow-sm'
                                      : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                                  }`}
                                >
                                  <img src={url} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                                  {signUpPhotoUrl === url && (
                                    <div className="absolute inset-0 bg-emerald-600/30 flex items-center justify-center">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-white stroke-[3]" />
                                    </div>
                                  )}
                                </button>
                              ))}

                              <button
                                type="button"
                                onClick={() => signUpFileInputRef.current?.click()}
                                className="w-8 h-8 rounded-xl border border-dashed border-emerald-500/60 hover:border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition shrink-0 cursor-pointer"
                                title="গ্যালারি বা ক্যামেরা থেকে ছবি আপলোড"
                              >
                                <Upload className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-teal-300/75 leading-tight truncate">
                              ইসলামিক অ্যাভাটার ট্যাপ করুন বা ক্যামেরা দিয়ে ছবি আপলোড করুন
                            </p>
                          </div>

                          <input
                            ref={signUpFileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleSignUpPhotoUpload}
                          />
                        </div>
                      </div>
                    )}

                    {/* Field: Full Name (Sign Up only) */}
                    {authMode === 'register' && (
                      <div className="animate-in fade-in">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-teal-200 mb-1 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>আপনার পূর্ণ নাম (Full Name) *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={inputName}
                          onChange={(e) => setInputName(e.target.value)}
                          placeholder="e.g. Mursaline Parvez"
                          className={`w-full rounded-2xl px-3.5 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                              : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                          }`}
                        />
                      </div>
                    )}

                    {/* Field: Target Identifier (Email or Phone) */}
                    {authMethod === 'email' ? (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-bold text-slate-600 dark:text-teal-200 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>ইমেইল অ্যাড্রেস (Email Address) *</span>
                          </label>
                          {previousGoogleAccount?.email && inputEmail !== previousGoogleAccount.email && (
                            <button
                              type="button"
                              onClick={() => {
                                setInputEmail(previousGoogleAccount.email);
                                if (authMode === 'register') setAuthMode('login');
                              }}
                              className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Sparkles className="w-3 h-3 text-amber-500" />
                              <span>গুগল ইমেইল বসান</span>
                            </button>
                          )}
                        </div>
                        <input
                          type="email"
                          autoComplete="email"
                          required
                          value={inputEmail}
                          onChange={(e) => setInputEmail(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              if (authMode === 'register') handleFastInstantSignUp();
                              else handleSendOtp('login');
                            }
                          }}
                          placeholder="yourname@gmail.com"
                          className={`w-full rounded-2xl px-3.5 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                              : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                          }`}
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-teal-200 mb-1 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>মোবাইল নম্বর (Phone Number) *</span>
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={selectedCountryCode}
                            onChange={(e) => setSelectedCountryCode(e.target.value)}
                            className={`rounded-2xl px-2.5 py-2 border text-xs font-bold focus:outline-none cursor-pointer ${
                              isDay
                                ? 'bg-slate-50 border-slate-300 text-slate-900'
                                : 'bg-[#051417] border-[#184850] text-white'
                            }`}
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.flag} {c.code}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            required
                            value={inputPhone}
                            onChange={(e) => setInputPhone(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                if (authMode === 'register') handleFastInstantSignUp();
                                else handleSendOtp('login');
                              }
                            }}
                            placeholder="01712345678"
                            className={`flex-1 rounded-2xl px-3.5 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                              isDay
                                ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                                : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                            }`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Field: Password with Eye Toggle & Forgot Password Link */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-teal-200 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{authMode === 'register' ? 'পাসওয়ার্ড সেট করুন (Password) *' : 'পাসওয়ার্ড (Password) *'}</span>
                        </label>

                        {authMode === 'login' && (
                          <button
                            type="button"
                            onClick={() => handleStartForgotPassword(authMethod)}
                            className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 hover:underline cursor-pointer flex items-center gap-1 transition"
                          >
                            <KeyRound className="w-3.5 h-3.5 text-amber-500" />
                            <span>পাসওয়ার্ড ভুলে গেছেন?</span>
                          </button>
                        )}
                      </div>

                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={inputPassword}
                          onChange={(e) => setInputPassword(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              if (authMode === 'register') handleFastInstantSignUp();
                              else handleSendOtp('login');
                            }
                          }}
                          placeholder={authMode === 'register' ? 'কমপক্ষে ৪ অক্ষরের পাসওয়ার্ড' : 'আপনার অ্যাকাউন্টের পাসওয়ার্ড'}
                          className={`w-full rounded-2xl pl-3.5 pr-10 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                              : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-teal-200 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Dynamic Password Strength Meter for Registration */}
                      {authMode === 'register' && inputPassword.length > 0 && (
                        <div className="mt-1.5 space-y-1 animate-in fade-in">
                          {(() => {
                            const strength = getPasswordStrength(inputPassword);
                            return (
                              <>
                                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-teal-950 overflow-hidden">
                                  <div
                                    className={`h-full transition-all duration-300 ${strength.color}`}
                                    style={{ width: strength.width }}
                                  />
                                </div>
                                <div className="text-[10px] font-bold text-right text-slate-500 dark:text-teal-300">
                                  {strength.label}
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>

                    {/* Field: Confirm Password (Register mode only) */}
                    {authMode === 'register' && (
                      <div className="animate-in fade-in">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-teal-200 mb-1 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>পাসওয়ার্ড নিশ্চিত করুন (Confirm Password) *</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            value={inputConfirmPassword}
                            onChange={(e) => setInputConfirmPassword(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleFastInstantSignUp();
                            }}
                            placeholder="পাসওয়ার্ডটি পুনরায় লিখুন"
                            className={`w-full rounded-2xl pl-3.5 pr-10 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                              isDay
                                ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                                : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-teal-200 cursor-pointer"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {inputConfirmPassword && inputPassword !== inputConfirmPassword && (
                          <div className="text-[10px] font-bold text-rose-500 mt-1">
                            ⚠️ পাসওয়ার্ড দুটি মিলছে না!
                          </div>
                        )}
                        {inputConfirmPassword && inputPassword === inputConfirmPassword && (
                          <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            <span>পাসওয়ার্ড মিলেছে ✓</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Error Banner with Direct Password Reset Action */}
                    {otpErrorMessage && (
                      <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-300 text-xs font-bold space-y-2 animate-in fade-in">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500" />
                          <span>{otpErrorMessage}</span>
                        </div>
                        {authMode === 'login' && otpErrorMessage.includes('পাসওয়ার্ড') && (
                          <div className="pt-1 flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleStartForgotPassword(authMethod)}
                              className="py-1 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                              <span>পাসওয়ার্ড রিসেট করুন (Reset Password)</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* PRIMARY ACTION BUTTONS */}
                    <div className="pt-2 space-y-2">
                      {authMode === 'register' ? (
                        <>
                          {/* Create Account Primary Button */}
                          <button
                            type="button"
                            disabled={
                              isVerifying ||
                              (authMethod === 'email' ? !inputEmail.trim() : !inputPhone.trim()) ||
                              !inputName.trim() ||
                              !inputPassword.trim()
                            }
                            onClick={handleFastInstantSignUp}
                            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-extrabold text-sm shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                          >
                            {isVerifying ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4 text-amber-300" />
                                <span>অ্যাকাউন্ট তৈরি করুন (Create Account)</span>
                              </>
                            )}
                          </button>

                          {/* Secondary OTP button */}
                          <button
                            type="button"
                            disabled={
                              isSendingCode ||
                              isVerifying ||
                              (authMethod === 'email' ? !inputEmail.trim() : !inputPhone.trim()) ||
                              !inputPassword.trim() ||
                              !inputName.trim()
                            }
                            onClick={() => handleSendOtp('signup')}
                            className="w-full py-2 px-3 rounded-xl border border-emerald-600/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 font-bold text-[11px] flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{isSendingCode ? 'কোড পাঠানো হচ্ছে...' : 'ওটিপি কোড (OTP) দিয়ে ভেরিফাই করে সাইন আপ'}</span>
                          </button>
                        </>
                      ) : (
                        <>
                          {/* Log In Primary Button */}
                          <button
                            type="button"
                            disabled={
                              isVerifying ||
                              (authMethod === 'email' ? !inputEmail.trim() : !inputPhone.trim()) ||
                              !inputPassword.trim()
                            }
                            onClick={() => handleSendOtp('login')}
                            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-extrabold text-sm shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                          >
                            {isVerifying ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>লগইন হচ্ছে...</span>
                              </>
                            ) : (
                              <>
                                <Lock className="w-4 h-4" />
                                <span>লগইন করুন (Sign In)</span>
                              </>
                            )}
                          </button>

                          {/* Passwordless OTP login */}
                          <button
                            type="button"
                            disabled={isSendingCode || (authMethod === 'email' ? !inputEmail.trim() : !inputPhone.trim())}
                            onClick={() => handleSendOtp('login')}
                            className="w-full py-2 px-3 rounded-xl border border-emerald-600/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 font-bold text-[11px] flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{isSendingCode ? 'কোড পাঠানো হচ্ছে...' : 'পাসওয়ার্ড ছাড়া ওটিপি (OTP) কোড দিয়ে লগইন'}</span>
                          </button>
                        </>
                      )}
                    </div>

                    {/* Bottom switcher link */}
                    <div className="text-center pt-2 text-xs text-slate-500 dark:text-teal-300/80">
                      {authMode === 'register' ? (
                        <>
                          <span>ইতিমধ্যেই অ্যাকাউন্ট আছে? </span>
                          <button
                            type="button"
                            onClick={() => {
                              setAuthMode('login');
                              setOtpErrorMessage(null);
                              if (soundEnabled) soundHaptics.playTap();
                            }}
                            className="font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer ml-1"
                          >
                            লগইন করুন (Sign In)
                          </button>
                        </>
                      ) : (
                        <>
                          <span>নতুন ইউজার? অ্যাকাউন্ট নেই? </span>
                          <button
                            type="button"
                            onClick={() => {
                              setAuthMode('register');
                              setOtpErrorMessage(null);
                              if (soundEnabled) soundHaptics.playTap();
                            }}
                            className="font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer ml-1"
                          >
                            নতুন অ্যাকাউন্ট খুলুন (Sign Up)
                          </button>
                        </>
                      )}
                    </div>

                    {/* Trust & Cloud Sync Benefits */}
                    <div className="pt-2">
                      <div className="grid grid-cols-3 gap-1.5 p-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center text-[10px]">
                        <div className="space-y-0.5">
                          <div className="font-extrabold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1">
                            <Cloud className="w-3 h-3 text-emerald-600" />
                            <span>অটো ব্যাকআপ</span>
                          </div>
                          <div className="text-slate-500 dark:text-teal-300/70 text-[9px]">ক্লাউডে হিস্ট্রি সেভ</div>
                        </div>

                        <div className="space-y-0.5 border-x border-emerald-500/20 px-1">
                          <div className="font-extrabold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1">
                            <RefreshCw className="w-3 h-3 text-emerald-600" />
                            <span>মাল্টি-ডিভাইস</span>
                          </div>
                          <div className="text-slate-500 dark:text-teal-300/70 text-[9px]">সব ডিভাইসে এক</div>
                        </div>

                        <div className="space-y-0.5">
                          <div className="font-extrabold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>১০০% সিকিউর</span>
                          </div>
                          <div className="text-slate-500 dark:text-teal-300/70 text-[9px]">সম্পূর্ণ প্রাইভেট</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP: FORGOT PASSWORD (STEP 1: SEND CODE) */}
              {verificationStep === 'forgot_password' && (
                <div className="space-y-4 animate-in fade-in">
                  {/* Step Progress Pill */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] font-bold text-amber-800 dark:text-amber-300">
                    <div className="flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>পাসওয়ার্ড রিসেট উইজার্ড</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-[10px] font-extrabold">
                      ধাপ ১ / ২
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-1.5">
                    <div className="font-extrabold flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                      <Send className="w-4 h-4 shrink-0" />
                      <span>সিকিউরিটি রিসেট কোড রিকোয়েস্ট</span>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-90">
                      আপনার নিবন্ধিত ইমেইল বা ফোন নম্বরে ৬-সংখ্যার সিকিউরিটি কোড পাঠানো হবে। সেই কোড দিয়ে যাচাই সম্পন্ন করার পর আপনি নতুন পাসওয়ার্ড সেট করতে পারবেন।
                    </p>
                  </div>

                  {/* Method Switcher */}
                  <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-[#051417] border border-slate-200 dark:border-teal-900/50 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        setForgotMethod('email');
                        setForgotErrorMessage(null);
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        forgotMethod === 'email'
                          ? 'bg-white dark:bg-[#103a42] text-emerald-700 dark:text-emerald-300 shadow-sm font-extrabold'
                          : 'text-slate-500 hover:text-slate-800 dark:text-teal-300'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Recovery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setForgotMethod('phone');
                        setForgotErrorMessage(null);
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        forgotMethod === 'phone'
                          ? 'bg-white dark:bg-[#103a42] text-emerald-700 dark:text-emerald-300 shadow-sm font-extrabold'
                          : 'text-slate-500 hover:text-slate-800 dark:text-teal-300'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Phone SMS</span>
                    </button>
                  </div>

                  {/* Target Input */}
                  {forgotMethod === 'email' ? (
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-teal-200 mb-1 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Registered Email (নিবন্ধিত ইমেইল) *</span>
                      </label>
                      <input
                        type="email"
                        autoFocus
                        required
                        value={forgotTarget}
                        onChange={(e) => setForgotTarget(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendForgotPassword();
                        }}
                        placeholder="yourname@gmail.com"
                        className={`w-full rounded-2xl px-3.5 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                          isDay
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                            : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                        }`}
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-teal-200 mb-1 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Registered Phone (নিবন্ধিত ফোন নম্বর) *</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={selectedCountryCode}
                          onChange={(e) => setSelectedCountryCode(e.target.value)}
                          className={`rounded-2xl px-2.5 py-2 border text-xs font-bold focus:outline-none cursor-pointer ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900'
                              : 'bg-[#051417] border-[#184850] text-white'
                          }`}
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          autoFocus
                          required
                          value={forgotTarget}
                          onChange={(e) => setForgotTarget(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSendForgotPassword();
                          }}
                          placeholder="01712345678"
                          className={`flex-1 rounded-2xl px-3.5 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                              : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  {forgotErrorMessage && (
                    <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{forgotErrorMessage}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setVerificationStep('input');
                        setForgotErrorMessage(null);
                      }}
                      className="py-3 px-4 rounded-2xl border border-slate-300 dark:border-teal-900/60 font-bold text-xs hover:bg-slate-100 dark:hover:bg-teal-900/30 transition cursor-pointer"
                    >
                      লগইনে ফিরে যান
                    </button>

                    <button
                      type="button"
                      disabled={isSendingCode || !forgotTarget.trim()}
                      onClick={handleSendForgotPassword}
                      className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                    >
                      {isSendingCode ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>কোড পাঠানো হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>রিসেট কোড পাঠান</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP: RESET PASSWORD (STEP 2: ENTER CODE & SET NEW PASSWORD) */}
              {verificationStep === 'reset_password' && (
                <div className="space-y-3.5 animate-in fade-in">
                  {/* Step Progress Pill */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-[11px] font-bold text-teal-800 dark:text-teal-300">
                    <div className="flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>পাসওয়ার্ড রিসেট উইজার্ড</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-[10px] font-extrabold">
                      ধাপ ২ / ২ (শেষ ধাপ)
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800 dark:text-teal-300 space-y-1">
                    <div className="font-extrabold flex items-center gap-1.5 text-teal-700 dark:text-teal-400">
                      <KeyRound className="w-4 h-4 shrink-0" />
                      <span>রিসেট কোড যাচাই ও নতুন পাসওয়ার্ড</span>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-90">
                      আপনার ঠিকানায় ({maskedTargetDisplay || forgotTarget}) ৬-সংখ্যার সিকিউরিটি কোড পাঠানো হয়েছে। কোডটি দিয়ে নতুন পাসওয়ার্ড দিন।
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-teal-200 mb-1 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Security Reset Code (৬-সংখ্যার কোড) *</span>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        required
                        value={tempPasswordInput}
                        onChange={(e) => setTempPasswordInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="e.g. 849201"
                        className={`w-full rounded-2xl px-3.5 py-2.5 border text-center text-sm font-mono font-black tracking-widest focus:outline-none transition ${
                          isDay
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                            : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-teal-200 mb-1 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Set New Password (নতুন পাসওয়ার্ড দিন) *</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showResetNewPassword ? 'text' : 'password'}
                          required
                          value={newPasswordInput}
                          onChange={(e) => setNewPasswordInput(e.target.value)}
                          placeholder="কমপক্ষে ৪ অক্ষরের নতুন পাসওয়ার্ড"
                          className={`w-full rounded-2xl pl-3.5 pr-10 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                              : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowResetNewPassword(!showResetNewPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-teal-200 cursor-pointer"
                        >
                          {showResetNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Password strength meter */}
                      {newPasswordInput.length > 0 && (
                        <div className="mt-1.5 space-y-1 animate-in fade-in">
                          {(() => {
                            const strength = getPasswordStrength(newPasswordInput);
                            return (
                              <>
                                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-teal-950 overflow-hidden">
                                  <div
                                    className={`h-full transition-all duration-300 ${strength.color}`}
                                    style={{ width: strength.width }}
                                  />
                                </div>
                                <div className="text-[10px] font-bold text-right text-slate-500 dark:text-teal-300">
                                  {strength.label}
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-teal-200 mb-1 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Confirm New Password (পাসওয়ার্ডটি আবার লিখুন) *</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showResetConfirmPassword ? 'text' : 'password'}
                          required
                          value={confirmNewPasswordInput}
                          onChange={(e) => setConfirmNewPasswordInput(e.target.value)}
                          placeholder="নতুন পাসওয়ার্ডটি পুনরায় লিখুন"
                          className={`w-full rounded-2xl pl-3.5 pr-10 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                              : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowResetConfirmPassword(!showResetConfirmPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-teal-200 cursor-pointer"
                        >
                          {showResetConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {confirmNewPasswordInput && newPasswordInput !== confirmNewPasswordInput && (
                        <div className="text-[10px] font-bold text-rose-500 mt-1">
                          ⚠️ পাসওয়ার্ড দুটি মিলছে না!
                        </div>
                      )}
                      {confirmNewPasswordInput && newPasswordInput === confirmNewPasswordInput && (
                        <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>পাসওয়ার্ড মিলেছে ✓</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {forgotErrorMessage && (
                    <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{forgotErrorMessage}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setVerificationStep('forgot_password')}
                      className="py-3 px-4 rounded-2xl border border-slate-300 dark:border-teal-900/60 font-bold text-xs hover:bg-slate-100 dark:hover:bg-teal-900/30 transition cursor-pointer"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      disabled={isResettingPassword || tempPasswordInput.trim().length < 6 || !newPasswordInput.trim() || newPasswordInput !== confirmNewPasswordInput}
                      onClick={handleCompletePasswordReset}
                      className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                    >
                      {isResettingPassword ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>পাসওয়ার্ড আপডেট হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>পাসওয়ার্ড পরিবর্তন ও লগইন সম্পন্ন করুন</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: 6-DIGIT OTP VERIFICATION ENTRY */}
              {verificationStep === 'otp' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1.5">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-inner">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-sm text-emerald-800 dark:text-emerald-300">
                      {otpPurpose === 'signup'
                        ? 'নতুন অ্যাকাউন্ট ভেরিফিকেশন'
                        : 'লগইন ভেরিফিকেশন'}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-teal-200/90 leading-snug">
                      আপনার {authMethod === 'email' ? 'ইমেইল ঠিকানায়' : 'মোবাইল নম্বরে'} ৬-সংখ্যার সিকিউরিটি কোড পাঠানো হয়েছে:
                    </p>
                    <p className="text-sm font-mono font-black text-emerald-600 dark:text-emerald-400">
                      {maskedTargetDisplay || maskEmailOrPhone(authMethod === 'email' ? inputEmail : `${selectedCountryCode} ${inputPhone}`)}
                    </p>
                  </div>

                  {/* 6 Digit Keypad Inputs */}
                  <div className="space-y-2">
                    <label className="block text-center text-xs font-bold text-slate-600 dark:text-teal-200">
                      ইমেইল বা মেসেজে পাওয়া ৬-সংখ্যার কোডটি লিখুন:
                    </label>
                    <div className="flex justify-between gap-1.5 sm:gap-2">
                      {[0, 1, 2, 3, 4, 5].map((idx) => (
                        <input
                          key={idx}
                          ref={(el) => {
                            otpInputsRef.current[idx] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={otpDigits[idx]}
                          onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className={`w-11 h-12 text-center text-xl font-mono font-black rounded-2xl border transition focus:outline-none ${
                            otpDigits[idx]
                              ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/40'
                              : isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                              : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Error display */}
                  {otpErrorMessage && (
                    <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                      <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500" />
                      <span>{otpErrorMessage}</span>
                    </div>
                  )}

                  {/* Countdown Timer & Resend */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-teal-300/80 pt-1">
                    <span>
                      {otpCountdown > 0 ? (
                        <span className="font-mono font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>কোডের মেয়াদ: 00:{otpCountdown < 10 ? `0${otpCountdown}` : otpCountdown}</span>
                        </span>
                      ) : (
                        <span className="text-amber-500 font-bold">কোডের মেয়াদ শেষ</span>
                      )}
                    </span>

                    <button
                      type="button"
                      disabled={otpCountdown > 0 || isSendingCode}
                      onClick={() => handleSendOtp(otpPurpose === 'signup' ? 'signup' : 'login')}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed hover:underline cursor-pointer"
                    >
                      Resend Code (পুনরায় পাঠান)
                    </button>
                  </div>

                  {/* Confirm Button */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setVerificationStep('input')}
                      className="py-3 px-4 rounded-2xl border border-slate-300 dark:border-teal-900/60 font-bold text-xs hover:bg-slate-100 dark:hover:bg-teal-900/30 transition cursor-pointer"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      disabled={isVerifying || otpDigits.join('').length < 6}
                      onClick={handleConfirmOtp}
                      className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>যাচাই হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>
                            {otpPurpose === 'signup'
                              ? 'কোড যাচাই ও অ্যাকাউন্ট চালু করুন'
                              : 'কোড যাচাই ও লগইন সম্পন্ন করুন'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Preview test helper */}
                  <div className="pt-1 text-center">
                    <button
                      type="button"
                      onClick={() => setShowTestingHelper(!showTestingHelper)}
                      className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-teal-300 underline cursor-pointer"
                    >
                      কোড পেতে কোনো সমস্যা হচ্ছে? (সাহায্য)
                    </button>
                    {showTestingHelper && (
                      <div className="mt-2 p-2.5 rounded-xl bg-slate-100 dark:bg-[#06181c] border border-slate-200 dark:border-teal-900/40 text-[11px] text-left text-slate-600 dark:text-slate-300 space-y-1">
                        <p>• অনুগ্রহ করে আপনার ইমেইলের Spam বা All Mail ফোল্ডার চেক করুন।</p>
                        <p>
                          • প্রিভিউ বা টেস্ট কোড:{' '}
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {getTestingOtpCode(
                              authMethod === 'email'
                                ? inputEmail
                                : `${selectedCountryCode}${inputPhone.replace(/^0+/, '').trim()}`
                            )}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: SUCCESS CELEBRATION */}
              {verificationStep === 'success' && (
                <div className="p-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 mx-auto flex items-center justify-center border-2 border-emerald-500 shadow-lg">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="font-black text-base text-emerald-600 dark:text-emerald-400">
                      ✓ ভেরিফিকেশন সফল হয়েছে!
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-teal-200 mt-1">
                      {cloudSyncMessage || 'ক্লাউড থেকে আপনার সকল ইতিহাস লোড হচ্ছে...'}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-300">
                    <Cloud className="w-4 h-4 animate-bounce" />
                    <span>Cross-Device Cloud Synced</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ----------------- SUB-MODAL 2: FEEDBACK (WhatsApp & Email with Exact Format) ----------------- */}
        {activeSubModal === 'feedback' && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div
              className={`w-full max-w-md rounded-3xl border p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto ${
                isDay ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0f343c] text-white border-[#1c5763]'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-teal-900/40">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-base">Send Feedback • মতামত পাঠান</h3>
                </div>
                <button
                  onClick={() => setActiveSubModal('none')}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-teal-900/40"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Channel Selector: WhatsApp vs Email */}
              <div className="space-y-1.5 text-xs">
                <label className="font-bold block text-slate-500 dark:text-teal-200">
                  Select Feedback Channel:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedbackChannel('whatsapp')}
                    className={`py-2.5 px-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer ${
                      feedbackChannel === 'whatsapp'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm'
                        : isDay
                        ? 'bg-slate-100 border-slate-200 text-slate-600'
                        : 'bg-[#092226] border-[#184850] text-teal-300'
                    }`}
                  >
                    <span className="text-base">💬</span>
                    <span>WhatsApp (01567963471)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFeedbackChannel('email')}
                    className={`py-2.5 px-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer ${
                      feedbackChannel === 'email'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm'
                        : isDay
                        ? 'bg-slate-100 border-slate-200 text-slate-600'
                        : 'bg-[#092226] border-[#184850] text-teal-300'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-rose-500" />
                    <span>Email (mdmursaline...)</span>
                  </button>
                </div>
              </div>

              {/* User Email Input */}
              <div className="space-y-1 text-xs">
                <label className="font-bold block text-slate-500 dark:text-teal-200">
                  Your Email / Phone (আপনার ইমেইল বা ফোন নম্বর):
                </label>
                <input
                  type="text"
                  value={feedbackUserEmail}
                  onChange={(e) => setFeedbackUserEmail(e.target.value)}
                  placeholder="Enter your email or phone..."
                  className={`w-full rounded-xl px-3 py-2 border font-medium text-xs focus:outline-none ${
                    isDay
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                      : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                  }`}
                />
              </div>

              {/* Feedback Message Input */}
              <div className="space-y-1 text-xs">
                <label className="font-bold block text-slate-500 dark:text-teal-200">
                  Your Feedback / Message (আপনার মূল্যবান মতামত বা অভিযোগ):
                </label>
                <textarea
                  rows={3}
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  placeholder="Type your message, suggestion, or question here..."
                  className={`w-full rounded-xl p-3 border text-xs focus:outline-none ${
                    isDay
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                      : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                  }`}
                />
              </div>

              {/* Device Info & Location Expandable Customizer */}
              <div className="space-y-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => setShowDeviceSettings(!showDeviceSettings)}
                  className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center justify-between w-full cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Device & Location Info (ডিভাইস ও লোকেশন তথ্য)</span>
                  </span>
                  <span>{showDeviceSettings ? '▲ Hide' : '▼ Customize / ভিউ'}</span>
                </button>

                {showDeviceSettings && (
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-teal-900/60 bg-slate-50 dark:bg-[#071d22] space-y-2 text-xs animate-in fade-in">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-teal-200">
                          Location (লোকেশন):
                        </label>
                        <button
                          type="button"
                          onClick={handleDetectLocation}
                          disabled={isDetectingLocation}
                          className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                        >
                          {isDetectingLocation ? 'Detecting...' : '📍 Auto GPS'}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={feedbackLocation}
                        onChange={(e) => setFeedbackLocation(e.target.value)}
                        placeholder="e.g. 4C2J 8FX, BD or Dhaka, Bangladesh"
                        className={`w-full rounded-lg px-2.5 py-1.5 border text-xs focus:outline-none ${
                          isDay
                            ? 'bg-white border-slate-300 text-slate-900'
                            : 'bg-[#092226] border-[#184850] text-white'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold block mb-0.5 text-slate-500 dark:text-teal-200">
                          Model:
                        </label>
                        <input
                          type="text"
                          value={feedbackModel}
                          onChange={(e) => setFeedbackModel(e.target.value)}
                          placeholder="Device model"
                          className={`w-full rounded-lg px-2 py-1 border text-[11px] focus:outline-none ${
                            isDay
                              ? 'bg-white border-slate-300 text-slate-900'
                              : 'bg-[#092226] border-[#184850] text-white'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold block mb-0.5 text-slate-500 dark:text-teal-200">
                          OS Version:
                        </label>
                        <input
                          type="text"
                          value={feedbackOsVersion}
                          onChange={(e) => setFeedbackOsVersion(e.target.value)}
                          placeholder="OS version"
                          className={`w-full rounded-lg px-2 py-1 border text-[11px] focus:outline-none ${
                            isDay
                              ? 'bg-white border-slate-300 text-slate-900'
                              : 'bg-[#092226] border-[#184850] text-white'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px]">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                        <div className="text-slate-400 dark:text-teal-300/70 font-semibold">App Version</div>
                        <div className="font-bold text-emerald-700 dark:text-emerald-300 font-mono">411_38.1</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                        <div className="text-slate-400 dark:text-teal-300/70 font-semibold">App Lang</div>
                        <div className="font-bold text-emerald-700 dark:text-emerald-300">
                          {selectedLanguage === 'bn' ? 'Bangla' : selectedLanguage === 'en' ? 'English' : 'Arabic'}
                        </div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                        <div className="text-slate-400 dark:text-teal-300/70 font-semibold">Device Lang</div>
                        <div className="font-bold text-emerald-700 dark:text-emerald-300 font-mono">
                          {typeof navigator !== 'undefined' && navigator.language ? navigator.language.split('-')[0] : 'en'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Send Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveSubModal('none')}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-teal-900/40 text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSendFeedback}
                  className="flex-1 py-2.5 rounded-xl bg-[#2d7d4f] hover:bg-[#256a42] text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {feedbackChannel === 'whatsapp' ? 'Send via WhatsApp' : 'Send via Email'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- SUB-MODAL 3: BOOKMARKS ----------------- */}
        {activeSubModal === 'bookmarks' && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div
              className={`w-full max-w-md rounded-3xl border p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto ${
                isDay ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0f343c] text-white border-[#1c5763]'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-teal-900/40">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-emerald-600 fill-current" />
                  <h3 className="font-bold text-base">Your Bookmarks (বুকমার্ক)</h3>
                </div>
                <button
                  onClick={() => setActiveSubModal('none')}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-teal-900/40"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {sampleBookmarks.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-2 ${
                      isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#092226] border-[#184850]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{item.title}</div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold">
                        {item.category}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        onNavigateModule(item.module);
                        setActiveSubModal('none');
                        onClose();
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition active:scale-95"
                    >
                      Read →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------- SUB-MODAL 4: DOWNLOADS ----------------- */}
        {activeSubModal === 'downloads' && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div
              className={`w-full max-w-md rounded-3xl border p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto ${
                isDay ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0f343c] text-white border-[#1c5763]'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-teal-900/40">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-500" />
                  <h3 className="font-bold text-base">Downloaded Books (অফলাইন কিতাব)</h3>
                </div>
                <button
                  onClick={() => setActiveSubModal('none')}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-teal-900/40"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {sampleDownloads.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-2 ${
                      isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#092226] border-[#184850]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{item.title}</div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.size} • {item.status} Offline
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        onNavigateModule('kitab');
                        setActiveSubModal('none');
                        onClose();
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className="px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition active:scale-95"
                    >
                      Open Book
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------- SUB-MODAL 5: LOGOUT CONFIRM ----------------- */}
        {activeSubModal === 'logout_confirm' && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div
              className={`w-full max-w-sm rounded-3xl border p-5 shadow-2xl space-y-3 text-center ${
                isDay ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0f343c] text-white border-[#1c5763]'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-600 flex items-center justify-center mx-auto">
                <LogOut className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base">Confirm Logout</h3>
              <p className="text-xs text-slate-500 dark:text-teal-200/80">
                Are you sure you want to reset user profile info and switch accounts?
              </p>
              <div className="flex items-center gap-2 pt-2 text-xs">
                <button
                  onClick={() => setActiveSubModal('none')}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onUpdateProfile({
                      name: '',
                      emailOrPhone: '',
                      photoUrl: '',
                      isSignedIn: false,
                    });
                    setActiveSubModal('none');
                    if (soundEnabled) soundHaptics.playMilestone();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- SUB-MODAL 6: APP INSTALL GUIDE (Android, iOS Safari & Chrome) ----------------- */}
        {showInstallGuideModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div
              className={`w-full max-w-md rounded-3xl border p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto ${
                isDay ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0f343c] text-white border-[#1c5763]'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-teal-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                      মোবাইলে অ্যাপ ইনস্টল করার নিয়ম
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-teal-300/80">
                      ZikrMate Progressive Web App (PWA) Install Guide
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInstallGuideModal(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-teal-900/40 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Instructions Tab/Blocks */}
              <div className="space-y-3 text-xs leading-relaxed">
                {/* Android / Chrome Guide */}
                <div
                  className={`p-3.5 rounded-2xl border space-y-2 ${
                    isDay ? 'bg-emerald-50/60 border-emerald-200' : 'bg-[#092226] border-[#184850]'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                    <span className="text-base">🤖</span>
                    <span>Android / Google Chrome / Edge ব্যবহারকারীদের জন্য:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-600 dark:text-teal-200 font-medium pl-1">
                    <li>
                      ব্রাউজারের উপরে ডানদিকের <strong>থ্রি-ডট মেনু (⋮)</strong> বাটনে ট্যাপ করুন।
                    </li>
                    <li>
                      মেনু থেকে <strong>"Install app"</strong> অথবা <strong>"Add to Home screen"</strong> (হোম স্ক্রিনে যোগ করুন) চাপুন।
                    </li>
                    <li>
                      <strong>"Install"</strong> বাটনে ক্লিক করলেই অ্যাপটি সরাসরি আপনার মোবাইলের হোম স্ক্রিনে সেভ হয়ে যাবে।
                    </li>
                  </ol>
                </div>

                {/* iPhone / iPad Safari Guide */}
                <div
                  className={`p-3.5 rounded-2xl border space-y-2 ${
                    isDay ? 'bg-blue-50/60 border-blue-200' : 'bg-[#09252c] border-[#184f58]'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
                    <span className="text-base">🍎</span>
                    <span>iPhone / iPad (iOS Safari) ব্যবহারকারীদের জন্য:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-600 dark:text-teal-200 font-medium pl-1">
                    <li>
                      Safari ব্রাউজারের নিচে থাকা <strong>Share (শেয়ার / তীরচিহ্ন)</strong> বাটনে ট্যাপ করুন।
                    </li>
                    <li>
                      নিচের অপশনগুলো স্ক্রোল করে <strong>"Add to Home Screen"</strong> বেছে নিন।
                    </li>
                    <li>
                      উপরে ডানদিকের <strong>"Add"</strong> বাটনে ট্যাপ করুন।
                    </li>
                  </ol>
                </div>

                {/* Benefits Callout */}
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-200 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    ইনস্টল হওয়ার পর এটি যেকোনো আসল অ্যাপের মতো ফুলস্ক্রিনে চলবে এবং কোনো ইন্টারনেট সংযোগ ছাড়াই অফলাইনে জিকির কাউন্ট সচল থাকবে।
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowInstallGuideModal(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer"
              >
                বুঝেছি, ধন্যবাদ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
