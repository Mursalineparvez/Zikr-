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
  Palette,
  Play,
  Square,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, ThemeMode, ZikrLanguage, NavModule, ZikrItem, HistorySession, AppSettings, AppTheme } from '../types';
import { soundHaptics, playArabicVoice, VoiceGender } from '../utils/audioHaptics';
import { findSavedAccount, saveAccountToRegistry, updateAccountPassword, normalizeIdentifier } from '../utils/accountRegistry';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { SETTINGS_UI } from '../utils/appTranslations';
import { getDetectedDeviceInfo } from '../utils/deviceInfo';

import { usePWAInstall } from '../hooks/usePWAInstall';
import { InstallAppModal } from './InstallAppModal';
import {
  checkUserExistsInCloud,
  generateAndSendVerificationOtp,
  verifySubmittedOtp,
  getPendingOtp,
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
  getDeviceId,
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
  onOpenAdminPanel?: () => void;
  zikrs?: ZikrItem[];
  historySessions?: HistorySession[];
  lifetimeTotalCount?: number;
  dailyTotal?: number;
  completedGoals?: number;
  voiceGender?: VoiceGender;
  onUpdateVoiceGender?: (gender: VoiceGender) => void;
  onOpenWelcomeScreen?: () => void;
  appSettings?: AppSettings;
  onUpdateSettings?: (newSettings: Partial<AppSettings>) => void;
  onRestoreDefaults?: () => void;
  onExportBackupJson?: () => void;
  onImportBackupJson?: (file: File) => void;
  embedded?: boolean;
  onBackToHub?: () => void;
  onOpenSaved?: () => void;
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
  onOpenAdminPanel,
  zikrs = [],
  historySessions = [],
  lifetimeTotalCount = 0,
  dailyTotal = 0,
  completedGoals = 0,
  voiceGender = 'male',
  onUpdateVoiceGender,
  onOpenWelcomeScreen,
  appSettings,
  onUpdateSettings,
  onRestoreDefaults,
  onExportBackupJson,
  onImportBackupJson,
  embedded = false,
  onBackToHub,
  onOpenSaved,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const isAr = selectedLanguage === 'ar';
  const toBnDigits = (v: number | string) => String(v).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);
  const toArDigits = (v: number | string) => String(v).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
  const formatNum = (n: number) => {
    const s = n.toLocaleString('en-US');
    return isBn ? toBnDigits(s) : isAr ? toArDigits(s) : s;
  };
  const t = (bn: string, ar: string, en: string) => (isBn ? bn : isAr ? ar : en);

  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>(initialTab || 'profile');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isPlayingSample, setIsPlayingSample] = useState(false);

  const handlePlayVoiceSample = () => {
    if (isPlayingSample) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingSample(false);
      return;
    }
    setIsPlayingSample(true);
    playArabicVoice(
      'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',
      voiceGender || 'male',
      () => {
        setIsPlayingSample(false);
      }
    );
  };

  const handleDefaultExportBackup = () => {
    try {
      const backupData = {
        settings: appSettings || {
          theme: 'emerald',
          themeMode,
          soundEnabled,
          vibrationEnabled,
          screenAwake: false,
          voiceGender,
        },
        savedAt: new Date().toISOString(),
        version: 'v411_38.1',
      };
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `zikrmate_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDefaultImportBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed.settings && onUpdateSettings) {
          onUpdateSettings(parsed.settings);
        }
      } catch (err) {
        console.error('Failed to import backup JSON', err);
      }
    };
    reader.readAsText(file);
  };

  const appearanceThemes: Array<{ id: AppTheme; name: string; desc: string; previewClass: string }> = [
    {
      id: 'emerald',
      name: SETTINGS_UI.themeEmeraldName[selectedLanguage] || 'Serene Emerald',
      desc: SETTINGS_UI.themeEmeraldDesc[selectedLanguage] || 'Classic Islamic Emerald Green with Gold accents',
      previewClass: 'from-emerald-900 to-emerald-950 border-emerald-500',
    },
    {
      id: 'midnight',
      name: SETTINGS_UI.themeMidnightName[selectedLanguage] || 'Midnight Slate',
      desc: SETTINGS_UI.themeMidnightDesc[selectedLanguage] || 'Deep obsidian night with cool slate accents',
      previewClass: 'from-slate-900 to-black border-slate-600',
    },
    {
      id: 'teal',
      name: SETTINGS_UI.themeTealName[selectedLanguage] || 'Ocean Teal',
      desc: SETTINGS_UI.themeTealDesc[selectedLanguage] || 'Calming Mediterranean deep teal and turquoise',
      previewClass: 'from-teal-900 to-cyan-950 border-teal-500',
    },
    {
      id: 'gold',
      name: SETTINGS_UI.themeGoldName[selectedLanguage] || 'Medina Gold',
      desc: SETTINGS_UI.themeGoldDesc[selectedLanguage] || 'Warm sacred desert gold and amber tones',
      previewClass: 'from-amber-950 to-yellow-950 border-amber-500',
    },
  ];

  // PWA Install capabilities inside Settings
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showInstallGuideModal, setShowInstallGuideModal] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installFeedback, setInstallFeedback] = useState<string | null>(null);

  const handleInstallApp = async () => {
    if (soundEnabled) soundHaptics.playTap();
    if (isInstalled) {
      setShowInstallGuideModal(true);
      return;
    }
    if (isInstallable) {
      setIsInstalling(true);
      const res = await install();
      setIsInstalling(false);
      if (res) {
        setInstallFeedback(
          t(
            '✓ অভিনন্দন! Zikr+ অ্যাপটি হোম স্ক্রিনে ইনস্টল হয়েছে!',
            '✓ مبروك! تم تثبيت تطبيق Zikr+ على الشاشة الرئيسية!',
            '✓ Congratulations! Zikr+ has been installed on your home screen!'
          )
        );
        try { confetti({ particleCount: 65, spread: 65, origin: { y: 0.6 } }); } catch {}
        setTimeout(() => setInstallFeedback(null), 4000);
      } else {
        setShowInstallGuideModal(true);
      }
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
    'none' | 'verified_auth' | 'edit_profile' | 'feedback' | 'bookmarks' | 'downloads' | 'logout_confirm'
  >('none');

  // Unified Ultra-Simple Auth Form State
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+880');
  const [inputName, setInputName] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [verificationStep, setVerificationStep] = useState<
    'input' | 'otp' | 'forgot_password' | 'reset_password' | 'success'
  >('input');
  const [maskedTargetDisplay, setMaskedTargetDisplay] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpCountdown, setOtpCountdown] = useState(60);
  const [otpErrorMessage, setOtpErrorMessage] = useState<string | null>(null);
  const [cloudSyncMessage, setCloudSyncMessage] = useState<string | null>(null);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Forgot Password & Reset State
  const [forgotTarget, setForgotTarget] = useState('');
  const [forgotMethod, setForgotMethod] = useState<'email' | 'phone'>('email');
  const [tempPasswordInput, setTempPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState('');
  const [forgotErrorMessage, setForgotErrorMessage] = useState<string | null>(null);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [showResetNewPassword, setShowResetNewPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
          const locStr = tz.includes('Dhaka') ? 'Dhaka, Bangladesh' : tz.replace('_', ' ');
          setEditLocation(locStr);
          setFeedbackLocation(locStr);
          setIsDetectingLocation(false);
          if (soundEnabled) soundHaptics.playTap();
        },
        { timeout: 6000 }
      );
    } else {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Dhaka';
      const locStr = tz.includes('Dhaka') ? 'Dhaka, Bangladesh' : tz.replace('_', ' ');
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
      const ipTimer = setTimeout(() => {
        fetch('https://ipapi.co/json/')
          .then((res) => res.json())
          .then((data) => {
            if (data && data.city && data.country_name) {
              const netLoc = `${data.city}, ${data.country_name}`;
              setEditLocation(netLoc);
              setFeedbackLocation(netLoc);
            }
          })
          .catch(() => {});
      }, 500);
      return () => clearTimeout(ipTimer);
    }
  }, [isOpen, userProfile]);

  if (!isOpen) return null;

  // Open Verified Auth Sub-modal
  const handleOpenVerifiedAuth = () => {
    setVerificationStep('input');
    setOtpErrorMessage(null);
    setOtpDigits(['', '', '', '', '', '']);
    setCloudSyncMessage(null);

    if (userProfile.emailOrPhone) {
      if (userProfile.emailOrPhone.includes('@')) {
        setInputEmail(userProfile.emailOrPhone);
      } else {
        setInputPhone(userProfile.emailOrPhone.replace(/\D/g, ''));
      }
    }
    if (userProfile.name) {
      setInputName(userProfile.name);
    }

    setActiveSubModal('verified_auth');
  };

  // Process Instant Password Sign-In / Registration
  const handleInstantPasswordAuth = async () => {
    setOtpErrorMessage(null);
    const emailClean = inputEmail.trim().toLowerCase();
    const phoneClean = inputPhone.trim().replace(/\D/g, '');

    if (!emailClean || !emailClean.includes('@') || !emailClean.includes('.')) {
      setOtpErrorMessage(
        t(
          'অনুগ্রহ করে সঠিক জিমেইল বা ইমেইল লিখুন (যেমন: name@gmail.com)',
          'يرجى إدخال بريد إلكتروني صحيح (مثل: name@gmail.com)',
          'Please enter a valid email address (e.g. name@gmail.com)'
        )
      );
      return;
    }

    if (!inputPassword.trim() || inputPassword.trim().length < 4) {
      setOtpErrorMessage(
        t(
          'কমপক্ষে ৪ অক্ষরের পাসওয়ার্ড দিন',
          'يرجى إدخال كلمة مرور لا تقل عن ٤ أحرف',
          'Please enter a password of at least 4 characters'
        )
      );
      return;
    }

    setIsVerifying(true);
    const targetKey = emailClean;
    const pass = inputPassword.trim();
    const detected = getDetectedDeviceInfo();

    // Check cloud & local vault
    const verifyResult = await verifyUserCloudPassword(targetKey, pass);
    const cloudData = await loadUserDataFromCloud(targetKey);
    const existing = findSavedAccount(targetKey);

    const isSuperAdminEmail = targetKey.toLowerCase() === 'mdmursalineparvez@gmail.com';

    // Strictly enforce password check:
    if (verifyResult.exists && verifyResult.savedPassword && !verifyResult.passwordMatches) {
      setIsVerifying(false);
      setOtpErrorMessage(
        isSuperAdminEmail
          ? t(
              'ভুল পাসওয়ার্ড! mdmursalineparvez@gmail.com এর সঠিক পাসওয়ার্ড দিন।',
              'كلمة مرور خاطئة! أدخل كلمة المرور الصحيحة لحساب mdmursalineparvez@gmail.com.',
              'Incorrect password! Enter the correct password for mdmursalineparvez@gmail.com.'
            )
          : t(
              'ভুল পাসওয়ার্ড! আপনার অ্যাকাউন্টের সঠিক পাসওয়ার্ড দিন।',
              'كلمة مرور خاطئة! أدخل كلمة المرور الصحيحة لحسابك.',
              'Incorrect password! Please enter the correct password for your account.'
            )
      );
      if (soundEnabled) soundHaptics.playTap();
      return;
    }

    if (isSuperAdminEmail && !verifyResult.passwordMatches) {
      setIsVerifying(false);
      setOtpErrorMessage(
        t(
          'ভুল পাসওয়ার্ড! mdmursalineparvez@gmail.com এর সঠিক পাসওয়ার্ড দিন।',
          'كلمة مرور خاطئة! أدخل كلمة المرور الصحيحة لحساب mdmursalineparvez@gmail.com.',
          'Incorrect password! Enter the correct password for mdmursalineparvez@gmail.com.'
        )
      );
      if (soundEnabled) soundHaptics.playTap();
      return;
    }

    const displayName =
      inputName.trim() ||
      cloudData?.profile?.name ||
      existing?.name ||
      emailClean.split('@')[0];

    const fullPhone = phoneClean ? `${selectedCountryCode}${phoneClean.replace(/^0+/, '')}` : undefined;

    const updated: UserProfile = {
      name: displayName,
      emailOrPhone: targetKey,
      photoUrl: cloudData?.profile?.photoUrl || existing?.photoUrl || userProfile.photoUrl || DEFAULT_AVATARS[0],
      password: pass,
      location: cloudData?.profile?.location || existing?.location || userProfile.location || 'Bangladesh',
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

    if (isSuperAdminEmail) {
      try {
        localStorage.setItem('zikrmate_admin_session_auth', 'true');
      } catch {}
    }

    if (verifyResult.exists) {
      setCloudSyncMessage(
        t(
          'লগইন সফল! ক্লাউড থেকে আপনার আমল ও হিস্ট্রি লোড হচ্ছে...',
          'تم تسجيل الدخول بنجاح! جارٍ تحميل أذكارك وسجلك من السحابة...',
          'Sign-in successful! Loading your Zikr & history from the cloud...'
        )
      );
    } else {
      setCloudSyncMessage(
        t(
          'নতুন অ্যাকাউন্ট তৈরি হয়েছে! ক্লাউড সিঙ্ক চালু করা হয়েছে।',
          'تم إنشاء حساب جديد! تم تفعيل المزامنة السحابية.',
          'New account created! Cloud sync is now active.'
        )
      );
    }

    if (cloudData && cloudData.foundInCloud) {
      if (onCloudDataLoaded) {
        onCloudDataLoaded(cloudData, targetKey);
      }
    } else {
      const localSum = zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
      if (localSum > 0 || lifetimeTotalCount > 0) {
        saveUserDataToCloud(targetKey, updated, zikrs, historySessions, lifetimeTotalCount, undefined, {}).catch(() => {});
      } else if (onCloudDataLoaded) {
        onCloudDataLoaded({ foundInCloud: false }, targetKey);
      }
    }

    setVerificationStep('success');
    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    if (soundEnabled) soundHaptics.playMilestone();
    setIsVerifying(false);

    setTimeout(() => {
      setActiveSubModal('none');
      setVerificationStep('input');
    }, 1500);
  };

  // Send Verification OTP to Gmail / Phone
  const handleSendOtp = async () => {
    setOtpErrorMessage(null);
    const emailClean = inputEmail.trim().toLowerCase();

    if (!emailClean || !emailClean.includes('@') || !emailClean.includes('.')) {
      setOtpErrorMessage(
        t(
          'অনুগ্রহ করে সঠিক জিমেইল বা ইমেইল লিখুন (যেমন: name@gmail.com)',
          'يرجى إدخال بريد إلكتروني صحيح (مثل: name@gmail.com)',
          'Please enter a valid email address (e.g. name@gmail.com)'
        )
      );
      return;
    }

    setIsSendingCode(true);
    const res = await generateAndSendVerificationOtp(emailClean, 'email', 'login');
    setIsSendingCode(false);

    if (!res.success) {
      setOtpErrorMessage(res.message);
      if (soundEnabled) soundHaptics.playTap();
      return;
    }

    setMaskedTargetDisplay(res.maskedTarget);
    setOtpDigits(['', '', '', '', '', '']);
    setOtpCountdown(60);
    setVerificationStep('otp');
    if (soundEnabled) soundHaptics.playTap();
  };

  // Confirm OTP code
  const handleConfirmOtp = async () => {
    const fullEntered = otpDigits.join('');
    if (fullEntered.length < 6) {
      setOtpErrorMessage(
        t(
          '৬ ডিজিটের সম্পূর্ণ কোডটি লিখুন',
          'يرجى إدخال الرمز المكون من ٦ أرقام كاملاً',
          'Please enter the complete 6-digit code'
        )
      );
      return;
    }

    const emailClean = inputEmail.trim().toLowerCase();
    setIsVerifying(true);
    setOtpErrorMessage(null);

    const verificationResult = verifySubmittedOtp(emailClean, fullEntered, 'login');
    if (!verificationResult.success) {
      setIsVerifying(false);
      setOtpErrorMessage(verificationResult.message);
      if (soundEnabled) soundHaptics.playTap();
      return;
    }

    const cloudData = await loadUserDataFromCloud(emailClean);
    const existing = findSavedAccount(emailClean);
    const detected = getDetectedDeviceInfo();

    const displayName =
      inputName.trim() ||
      cloudData?.profile?.name ||
      existing?.name ||
      emailClean.split('@')[0];

    const updated: UserProfile = {
      name: displayName,
      emailOrPhone: emailClean,
      photoUrl: cloudData?.profile?.photoUrl || existing?.photoUrl || userProfile.photoUrl || DEFAULT_AVATARS[0],
      password: inputPassword.trim() || existing?.password || '',
      location: cloudData?.profile?.location || existing?.location || userProfile.location || 'Bangladesh',
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

    if (cloudData && cloudData.foundInCloud) {
      if (onCloudDataLoaded) {
        onCloudDataLoaded(cloudData, emailClean);
      }
    } else {
      const localSum = zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
      if (localSum > 0 || lifetimeTotalCount > 0) {
        saveUserDataToCloud(emailClean, updated, zikrs, historySessions, lifetimeTotalCount, undefined, {}).catch(() => {});
      } else if (onCloudDataLoaded) {
        onCloudDataLoaded({ foundInCloud: false }, emailClean);
      }
    }

    setVerificationStep('success');
    setCloudSyncMessage(
      t(
        'ভেরিফিকেশন সফল! ক্লাউড থেকে আপনার ডাটা সিঙ্ক হয়েছে।',
        'تم التحقق بنجاح! تمت مزامنة بياناتك من السحابة.',
        'Verification successful! Your data has synced from the cloud.'
      )
    );
    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    if (soundEnabled) soundHaptics.playMilestone();
    setIsVerifying(false);

    setTimeout(() => {
      setActiveSubModal('none');
      setVerificationStep('input');
    }, 1500);
  };

  // Google One-Tap Trigger
  const handleTriggerGoogleAuth = async () => {
    setIsVerifying(true);
    setOtpErrorMessage(null);

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
          photoUrl: result.user.photoUrl || cloudData?.profile?.photoUrl || DEFAULT_AVATARS[0],
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

        setIsVerifying(false);
        setActiveSubModal('none');
        confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
        if (soundEnabled) soundHaptics.playMilestone();
        return;
      } else {
        setIsVerifying(false);
        setOtpErrorMessage(
          t(
            'পপআপ খোলা না গেলে নিচে জিমেইল ও পাসওয়ার্ড দিয়ে খুব সহজেই ১-ক্লিকে সাইন-ইন করতে পারেন।',
            'إذا لم تفتح النافذة المنبثقة، يمكنك تسجيل الدخول بنقرة واحدة عبر البريد وكلمة المرور أدناه.',
            'If the popup did not open, you can easily sign in below with your email and password.'
          )
        );
      }
    } catch (err) {
      setIsVerifying(false);
      setOtpErrorMessage(
        t(
          'নিচে জিমেইল ও পাসওয়ার্ড দিয়ে খুব সহজেই ১-ক্লিকে লগইন করতে পারেন।',
          'يمكنك تسجيل الدخول بنقرة واحدة عبر البريد وكلمة المرور أدناه.',
          'You can easily sign in below with your email and password.'
        )
      );
    }
  };

  // OTP digit keyboard handler
  const handleOtpDigitChange = (index: number, val: string) => {
    setOtpErrorMessage(null);
    const clean = val.replace(/\D/g, '');

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

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = findSavedAccount(editEmailOrPhone);
    const updated: UserProfile = {
      ...userProfile,
      name: editName.trim() || existing?.name || 'User',
      emailOrPhone: editEmailOrPhone.trim() || '',
      photoUrl: editPhotoUrl || existing?.photoUrl || DEFAULT_AVATARS[0],
      location: editLocation.trim() || existing?.location || 'Dhaka, Bangladesh',
      deviceModel: editDeviceModel.trim() || existing?.deviceModel || 'Mobile Device',
      osVersion: editOsVersion.trim() || existing?.osVersion || 'Android',
      isSignedIn: true,
      isVerified: true,
    };
    saveAccountToRegistry(updated);
    onUpdateProfile(updated);
    setActiveSubModal('none');
    if (soundEnabled) soundHaptics.playMilestone();
  };

  const handleSendFeedback = () => {
    const msg = feedbackMessage.trim() || t('[আপনার ফিডব্যাক বা প্রশ্ন]', '[ملاحظاتك أو سؤالك]', '[Your feedback or question]');
    const emailVal = feedbackUserEmail.trim() || userProfile.emailOrPhone || 'user@zikrplus.app';
    const formattedText = `Zikr+ Feedback\nEmail: ${emailVal}\nLocation: ${feedbackLocation}\nModel: ${feedbackModel}\n\n${msg}`;

    if (feedbackChannel === 'whatsapp') {
      const url = `https://wa.me/8801567963471?text=${encodeURIComponent(formattedText)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = `mailto:mdmursalineparvez@gmail.com?subject=Zikr+ Feedback&body=${encodeURIComponent(formattedText)}`;
    }

    if (soundEnabled) soundHaptics.playMilestone();
    setActiveSubModal('none');
    setFeedbackMessage('');
  };

  const sampleBookmarks = [
    { title: t('সূরা মুলক', 'سورة الملك', 'Surah Al-Mulk'), category: t('কুরআন', 'القرآن', 'Quran'), module: 'quran' as NavModule },
    { title: t('সূরা ইয়াসিন', 'سورة يس', 'Surah Yasin'), category: t('কুরআন', 'القرآن', 'Quran'), module: 'quran' as NavModule },
    { title: t('আয়াতুল কুরসী', 'آية الكرسي', 'Ayatul Kursi'), category: t('দোয়া', 'الدعاء', 'Dua'), module: 'dua' as NavModule },
    { title: t('সাইয়্যিদুল ইস্তিগফার', 'سيد الاستغفار', 'Sayyidul Istighfar'), category: t('দোয়া', 'الدعاء', 'Dua'), module: 'dua' as NavModule },
    { title: t('সহিহ আল-বুখারী #১', 'صحيح البخاري ١', 'Sahih al-Bukhari #1'), category: t('হাদিস', 'الحديث', 'Hadith'), module: 'hadith' as NavModule },
  ];

  const sampleDownloads = [
    { title: t('রিয়াদুস সালিহীন', 'رياض الصالحين', 'Riyadus Salihin'), size: isBn ? toBnDigits('4.2 MB') : '4.2 MB', status: t('প্রস্তুত', 'جاهز', 'Ready') },
    { title: t('হিসনুল মুসলিম', 'حصن المسلم', 'Hisnul Muslim'), size: isBn ? toBnDigits('2.8 MB') : '2.8 MB', status: t('প্রস্তুত', 'جاهز', 'Ready') },
    { title: t('কিতাবুত তাওহীদ', 'كتاب التوحيد', 'Kitabut Tawheed'), size: isBn ? toBnDigits('1.9 MB') : '1.9 MB', status: t('প্রস্তুত', 'جاهز', 'Ready') },
  ];

  return (
    <div
      className={
        embedded
          ? 'w-full animate-in fade-in duration-200'
          : 'fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200'
      }
    >
      <div
        className={
          embedded
            ? `w-full rounded-3xl border shadow-sm flex flex-col overflow-hidden ${
                isDay ? 'bg-[#fcfaf5] text-[#103e42] border-stone-200/90' : 'bg-[#071c21] text-white border-[#143b44]'
              }`
            : `w-full max-w-md h-full sm:h-auto sm:max-h-[92vh] sm:rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
                isDay ? 'bg-[#f6f9f8] text-[#103e42] border-[#d2ece9]' : 'bg-[#0a2328] text-white border-[#1a515c]'
              }`
        }
      >
        {/* HEADER BAR */}
        <div
          className={`px-4 py-3.5 flex items-center justify-between select-none shrink-0 ${
            embedded
              ? isDay
                ? 'bg-white border-b border-stone-200/80 text-slate-900'
                : 'bg-[#0a262c] border-b border-[#143b44] text-white'
              : 'bg-[#2d7d4f] text-white shadow-md'
          }`}
        >
          <div className="flex items-center gap-3">
            {(embedded ? onBackToHub : true) && (
              <button
                type="button"
                onClick={embedded ? onBackToHub : onClose}
                className={`min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center transition active:scale-95 cursor-pointer ${
                  embedded
                    ? isDay
                      ? 'hover:bg-slate-100 text-slate-700'
                      : 'hover:bg-white/10 text-emerald-300'
                    : 'hover:bg-white/20 text-white'
                }`}
                title={t('পিছনে যান', 'رجوع', 'Back')}
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
            )}
            <div>
              <h2 className="text-lg font-black tracking-tight leading-tight">
                {embedded
                  ? t('আমার অ্যাকাউন্ট', 'حسابي', 'My Account')
                  : activeTab === 'settings'
                  ? t('অ্যাপ সেটিংস', 'إعدادات التطبيق', 'Settings')
                  : t('আমার অ্যাকাউন্ট', 'حسابي', 'My Account')}
              </h2>
            </div>
          </div>

          {!embedded && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 transition active:scale-95 cursor-pointer"
              title={t('বন্ধ করুন', 'إغلاق', 'Close')}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* TOP NAVIGATION TABS */}
        <div
          className={`px-4 py-2.5 flex items-center justify-center shrink-0 border-b ${
            embedded
              ? isDay
                ? 'bg-stone-50/70 border-stone-200/70'
                : 'bg-[#06181c] border-[#133841]'
              : 'bg-[#236841] border-emerald-600/30'
          }`}
        >
          <div
            className={`w-full max-w-md grid grid-cols-2 p-1 rounded-full border text-xs font-bold ${
              embedded
                ? isDay
                  ? 'bg-stone-200/70 border-stone-200 text-stone-700'
                  : 'bg-[#0b262d] border-[#17444e] text-slate-300'
                : 'bg-black/25 backdrop-blur-md border-white/10 text-white shadow-inner'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setActiveTab('profile');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`min-h-[40px] py-2 px-3 rounded-full flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === 'profile'
                  ? embedded
                    ? 'bg-[#006A4E] text-white shadow-sm font-extrabold'
                    : 'bg-white text-[#1a5530] shadow-md font-extrabold'
                  : embedded
                  ? isDay
                    ? 'text-stone-700 hover:text-stone-900'
                    : 'text-slate-300 hover:text-white'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('প্রোফাইল ও অ্যাকাউন্ট', 'الملف الشخصي', 'Profile')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('settings');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`min-h-[40px] py-2 px-3 rounded-full flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === 'settings'
                  ? embedded
                    ? 'bg-[#006A4E] text-white shadow-sm font-extrabold'
                    : 'bg-white text-[#1a5530] shadow-md font-extrabold'
                  : embedded
                  ? isDay
                    ? 'text-stone-700 hover:text-stone-900'
                    : 'text-slate-300 hover:text-white'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{t('সেটিংস', 'الإعدادات', 'Settings')}</span>
            </button>
          </div>
        </div>

        {/* BODY CONTENT */}
        <div className={embedded ? 'p-4 sm:p-6 space-y-5' : 'flex-1 overflow-y-auto p-4 space-y-4'}>
          {/* TAB 1: PROFILE / AUTH */}
          {activeTab === 'profile' && (
            <>
              {/* CENTERED UPPER-PIC PROFILE HERO (Matching User Reference Screenshot) */}
              <div
                className={`p-6 sm:p-7 rounded-3xl border text-center flex flex-col items-center space-y-3 transition-all ${
                  isDay
                    ? 'bg-gradient-to-b from-[#faf6ef] to-white border-stone-200/80 text-slate-900 shadow-2xs'
                    : 'bg-gradient-to-b from-[#0b272e] to-[#081f25] border-[#1a4b56] text-white shadow-md'
                }`}
              >
                {/* Centered Avatar with Floating Edit Pencil Badge */}
                <div className="relative inline-block">
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 shadow-lg flex items-center justify-center ${
                      isDay
                        ? 'border-white bg-emerald-100 ring-1 ring-stone-200'
                        : 'border-[#154550] bg-emerald-950 ring-1 ring-emerald-500/30'
                    }`}
                  >
                    {userProfile.isSignedIn && userProfile.photoUrl ? (
                      <img
                        src={userProfile.photoUrl}
                        alt={userProfile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : userProfile.photoUrl ? (
                      <img
                        src={userProfile.photoUrl}
                        alt={userProfile.name || 'User'}
                        className="w-full h-full object-cover opacity-90"
                      />
                    ) : (
                      <User className="w-11 h-11 text-[#006A4E] dark:text-emerald-300" />
                    )}
                  </div>

                  {/* Overlapping Bottom-Right Pencil Edit Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (userProfile.isSignedIn) {
                        setActiveSubModal('edit_profile');
                      } else {
                        handleOpenVerifiedAuth();
                      }
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className="absolute -bottom-0.5 -right-0.5 w-9 h-9 rounded-full bg-[#006A4E] hover:bg-[#005740] text-white border-2 border-white dark:border-[#0a2328] shadow-md flex items-center justify-center transition active:scale-95 cursor-pointer"
                    title={
                      userProfile.isSignedIn
                        ? t('প্রোফাইল ও ছবি সম্পাদনা করুন', 'تعديل الملف الشخصي والصورة', 'Edit Profile & Photo')
                        : t('সাইন ইন করুন', 'تسجيل الدخول', 'Sign In')
                    }
                    aria-label={t('প্রোফাইল সম্পাদনা', 'تعديل الملف الشخصي', 'Edit Profile')}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Centered Name & Email */}
                <div className="space-y-1 max-w-sm">
                  <div className="flex items-center justify-center gap-1.5">
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                      {userProfile.isSignedIn && userProfile.name
                        ? userProfile.name
                        : userProfile.name || t('গেস্ট অ্যাকাউন্ট', 'حساب زائر', 'Guest Account')}
                    </h3>
                    {userProfile.isSignedIn && (
                      <span
                        className="w-5 h-5 rounded-full bg-[#006A4E] text-white inline-flex items-center justify-center shrink-0"
                        title={t('ভেরিফায়েড অ্যাকাউন্ট', 'حساب موثق', 'Verified Account')}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <p className={`text-xs sm:text-sm font-medium break-all ${isDay ? 'text-stone-600' : 'text-emerald-200/80'}`}>
                    {userProfile.isSignedIn && userProfile.emailOrPhone
                      ? userProfile.emailOrPhone
                      : t(
                          'সাইন ইন করে আপনার জিকির ও সেটিংস সিঙ্ক করুন',
                          'سجّل الدخول لمزامنة أذكارك وإعداداتك',
                          'Sign in to sync your Zikr, Saved & Profile'
                        )}
                  </p>
                </div>

                {/* Primary Centered Pill Action Button (Matching Reference Screenshot CTA) */}
                {userProfile.isSignedIn ? (
                  <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={async () => {
                        if (onTriggerCloudSync) {
                          await onTriggerCloudSync();
                        }
                        setCloudSyncMessage(
                          t(
                            '✓ অ্যাপের সকল কাউন্ট ক্লাউডে সফলভাবে আপলোড হয়েছে!',
                            '✓ تم رفع جميع العدادات إلى السحابة بنجاح!',
                            '✓ All counts uploaded to cloud successfully!'
                          )
                        );
                        setTimeout(() => setCloudSyncMessage(null), 4000);
                        if (soundEnabled) soundHaptics.playMilestone();
                      }}
                      disabled={isSyncingCloud}
                      className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#006A4E] hover:bg-[#005740] text-white font-bold text-xs sm:text-sm shadow-md inline-flex items-center gap-2 transition active:scale-95 cursor-pointer"
                    >
                      <RefreshCw className={`w-4 h-4 ${isSyncingCloud ? 'animate-spin' : ''}`} />
                      <span>
                        {isSyncingCloud
                          ? t('সিঙ্ক হচ্ছে...', 'جارٍ المزامنة...', 'Syncing...')
                          : t('ক্লাউড সিঙ্ক করুন', 'المزامنة السحابية نشطة', 'Cloud Sync Active')}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={handleOpenVerifiedAuth}
                      className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#006A4E] hover:bg-[#005740] text-white font-bold text-xs sm:text-sm shadow-md inline-flex items-center gap-2 transition active:scale-95 cursor-pointer"
                    >
                      <span>
                        {t('সাইন ইন / পূর্ণ অ্যাক্সেস নিন', 'تسجيل الدخول / وصول كامل', 'Get Full Access · Sign In')}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {cloudSyncMessage && (
                  <div className="w-full p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-bold animate-in fade-in">
                    {cloudSyncMessage}
                  </div>
                )}
              </div>

              {/* ZIKR STATS & CLOUD OVERVIEW CARD FOR THIS ACCOUNT (When Signed In) */}
              {userProfile.isSignedIn && userProfile.name && (
                <div
                  className={`p-4 rounded-2xl border shadow-sm space-y-3 ${
                    isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0f343c] border-[#1c5763] text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-xs flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        {t(
                          'এই অ্যাকাউন্টের সর্বমোট জিকির পরিসংখ্যান',
                          'إحصائيات الذكر لهذا الحساب',
                          'Account Zikr Statistics'
                        )}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                      <Cloud className="w-3.5 h-3.5" />
                      <span>{t('সিঙ্কড', 'تمت المزامنة', 'Synced')}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className={`p-3 rounded-xl border ${isDay ? 'bg-emerald-50/60 border-emerald-200' : 'bg-[#05161a] border-emerald-900/40'}`}>
                      <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {t('সর্বমোট পুঞ্জীভূত জিকির', 'إجمالي الأذكار المتراكمة', 'Total Cumulative Zikr')}
                      </div>
                      <div className="text-xl font-black font-mono tabular-nums text-[#006A4E] dark:text-amber-300 mt-0.5">
                        {formatNum(lifetimeTotalCount)}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-teal-400/80 mt-0.5">
                        {t('সকল দিন ও ডিভাইসের মোট যোগফল', 'المجموع الكلي لجميع الأيام والأجهزة', 'Total across all days & devices')}
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border ${isDay ? 'bg-emerald-50/60 border-emerald-200' : 'bg-[#05161a] border-emerald-900/40'}`}>
                      <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {t('আজকের দৈনন্দিন গণনা', 'إجمالي الذكر اليومي', "Today's Daily Count")}
                      </div>
                      <div className="text-xl font-black font-mono tabular-nums text-teal-600 dark:text-emerald-400 mt-0.5">
                        {formatNum(dailyTotal || 0)}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-teal-400/80 mt-0.5">
                        {t('আজকের পাঠ করা জিকির', 'الأذكار المقروءة اليوم', 'Zikr recited today')}
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 p-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-black/5 dark:border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between font-semibold">
                      <span>{t('সক্রিয় দানার মোট গণনা:', 'مجموع الحبات النشطة:', 'Active Beads Total:')}</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {formatNum(zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0))}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-semibold">
                      <span>{t('সংরক্ষিত সেশন ইতিহাস:', 'سجل الجلسات المحفوظة:', 'Saved History Sessions:')}</span>
                      <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                        {isBn
                          ? `${formatNum(historySessions.length)}টি সেশন`
                          : isAr
                          ? `${formatNum(historySessions.length)} جلسات`
                          : `${historySessions.length} ${historySessions.length === 1 ? 'session' : 'sessions'}`}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MENU OPTIONS LIST */}
              <div
                className={`rounded-2xl border shadow-sm divide-y overflow-hidden ${
                  isDay
                    ? 'bg-white border-slate-200 divide-slate-100 text-slate-900'
                    : 'bg-[#0f343c] border-[#1c5763] divide-teal-900/40 text-white'
                }`}
              >
                {/* App Settings Quick Entry inside Profile List */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('settings');
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`w-full p-3.5 flex items-center justify-between text-left transition cursor-pointer ${
                    isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-[#006A4E] dark:text-emerald-400 flex items-center justify-center">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">
                        {t('অ্যাপ সেটিংস ও ভাষা', 'إعدادات التطبيق واللغة', 'App Settings & Language')}
                      </div>
                      <div className={`text-[11px] ${isDay ? 'text-slate-600' : 'text-emerald-200/80'}`}>
                        {t(
                          'ভাষা, থিম, অডিও ভয়েস, ব্যাকআপ ও রিসেট',
                          'اللغة، المظهر، الصوت، النسخ الاحتياطي وإعادة الضبط',
                          'Language, themes, voice reciter, backup & reset'
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                {/* Bookmark */}
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenSaved) {
                      onOpenSaved();
                    } else {
                      setActiveSubModal('bookmarks');
                    }
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
                      <div className="font-bold text-sm">{t('বুকমার্ক', 'العلامات المرجعية', 'Bookmarks')}</div>
                      <div className={`text-[11px] ${isDay ? 'text-slate-700 font-semibold' : 'text-emerald-200/80'}`}>
                        {t(
                          'সংরক্ষিত সূরা, আয়াত, হাদিস ও দোয়া',
                          'السور والآيات والأحاديث والأدعية المحفوظة',
                          'Saved Surahs, Ayahs, Hadith & Duas'
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs font-mono font-black ${isDay ? 'text-slate-800' : 'text-slate-300'}`}>
                    {t('৫টি', '٥ عناصر', '5 items')}
                  </span>
                </button>

                {/* Downloaded Books */}
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
                      <div className="font-bold text-sm">{t('ডাউনলোডকৃত কিতাব', 'الكتب المحملة', 'Downloaded Books')}</div>
                      <div className={`text-[11px] ${isDay ? 'text-slate-700 font-semibold' : 'text-emerald-200/80'}`}>
                        {t(
                          'অফলাইন কিতাব ও লাইব্রেরি পিডিএফ',
                          'كتب القراءة دون اتصال ومكتبة PDF',
                          'Offline books & library PDF'
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs font-mono font-black ${isDay ? 'text-slate-800' : 'text-slate-300'}`}>
                    {t('৩টি কিতাব', '٣ كتب', '3 books')}
                  </span>
                </button>

                {/* Feedback */}
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
                      <div className="font-bold text-sm">{t('মতামত ও ফিডব্যাক', 'الملاحظات والتواصل', 'Feedback')}</div>
                      <div className={`text-[11px] ${isDay ? 'text-slate-700 font-semibold' : 'text-emerald-200/80'}`}>
                        {t(
                          'হোয়াটসঅ্যাপ (০১৫৬৭৯৬৩৪৭১) বা ইমেইলে মতামত জানান',
                          'أرسل ملاحظاتك عبر واتساب (01567963471) أو البريد الإلكتروني',
                          'Share feedback via WhatsApp (01567963471) or Email'
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">💬</span>
                </button>

                {/* Admin Dashboard (Exclusively visible ONLY to mdmursalineparvez@gmail.com WHEN SIGNED IN) */}
                {onOpenAdminPanel &&
                  Boolean(
                    userProfile.isSignedIn &&
                    (userProfile.emailOrPhone || '').toLowerCase().trim() === 'mdmursalineparvez@gmail.com'
                  ) && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenAdminPanel();
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`w-full p-3.5 flex items-center justify-between text-left transition cursor-pointer ${
                      isDay ? 'hover:bg-amber-50/70' : 'hover:bg-amber-950/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-amber-600 dark:text-amber-300 flex items-center gap-1.5">
                          <span>{t('অ্যাডমিন ড্যাশবোর্ড', 'لوحة تحكم المشرف', 'Admin Dashboard')}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-900 uppercase font-black">
                            {t('সুপার অ্যাডমিন', 'المشرف العام', 'Super Admin')}
                          </span>
                        </div>
                        <div className={`text-[11px] ${isDay ? 'text-slate-700 font-semibold' : 'text-emerald-200/80'}`}>
                          {t(
                            'লাইভ ডিভাইস, ইউজার ও জিকির রিপোর্ট',
                            'تقارير الأجهزة والمستخدمين والأذكار المباشرة',
                            'Live devices, users & Zikr reports'
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-amber-500" />
                  </button>
                )}

                {/* Logout */}
                {userProfile.isSignedIn && (
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
                        <div className="font-bold text-sm text-rose-600 dark:text-rose-400">
                          {t('লগআউট', 'تسجيل الخروج', 'Logout')}
                        </div>
                        <div className={`text-[11px] ${isDay ? 'text-slate-700 font-semibold' : 'text-emerald-200/80'}`}>
                          {t('অ্যাকাউন্ট থেকে লগআউট করুন', 'تسجيل الخروج من الحساب', 'Sign out of your account')}
                        </div>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </>
          )}

          {/* TAB 2: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* 0. Profile & Account Summary Card (Moved inside Settings) */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('profile');
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`w-full p-4 rounded-2xl border shadow-sm flex items-center justify-between gap-3 text-left transition active:scale-[0.99] cursor-pointer ${
                  isDay
                    ? 'bg-white hover:bg-emerald-50/60 border-slate-200 text-slate-900'
                    : 'bg-[#0f343c] hover:bg-[#13404a] border-[#1c5763] text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500 shadow-xs shrink-0 bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                    {userProfile?.isSignedIn && userProfile?.photoUrl ? (
                      <img src={userProfile.photoUrl} alt={userProfile.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm truncate">
                        {userProfile?.isSignedIn ? (userProfile.name || t('ব্যবহারকারী', 'مستخدم', 'User')) : t('প্রোফাইল ও অ্যাকাউন্ট', 'الملف الشخصي والحساب', 'Profile & Account')}
                      </span>
                      {userProfile?.isSignedIn && (
                        <span className="p-0.5 rounded-full bg-emerald-600 text-white shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className={`text-xs truncate ${isDay ? 'text-slate-600' : 'text-emerald-200/80'}`}>
                      {userProfile?.isSignedIn
                        ? (userProfile.emailOrPhone || t('ভেরিফায়েড জিকির+ অ্যাকাউন্ট', 'حساب Zikr+ موثق', 'Verified Zikr+ Account'))
                        : t('সাইন-ইন, ক্লাউড সিঙ্ক ও বুকমার্ক', 'تسجيل الدخول والمزامنة السحابية والعلامات', 'Sign in, Cloud Sync & Bookmarks')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                  <span>{userProfile?.isSignedIn ? t('প্রোফাইল', 'الملف الشخصي', 'Profile') : t('সাইন ইন', 'تسجيل الدخول', 'Sign In')}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>

              {/* 1. Language Selection (14 World Languages) */}
              <div
                className={`p-4 rounded-2xl border shadow-sm space-y-3 ${
                  isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0f343c] border-[#1c5763] text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{SETTINGS_UI.appLanguage[selectedLanguage] || 'App Language'}</span>
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    isDay 
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-extrabold'
                      : 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30'
                  }`}>
                    {SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage)?.nativeName || selectedLanguage}
                  </span>
                </div>
                <p className={`text-xs font-bold leading-relaxed ${
                  isDay ? 'text-[#005e3f]' : 'text-emerald-200/90'
                }`}>
                  {SETTINGS_UI.languageDesc[selectedLanguage] ||
                    'আরবি হরফ ব্যতীত সকল মেনু, অনুবাদ ও নির্দেশিকা স্বয়ংক্রিয়ভাবে পরিবর্তিত হবে'}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                  {SUPPORTED_LANGUAGES.map((langItem) => {
                    const isSelected = selectedLanguage === langItem.code;
                    return (
                      <button
                        key={langItem.code}
                        type="button"
                        onClick={() => {
                          if (onSelectLanguage) onSelectLanguage(langItem.code);
                          if (soundEnabled) soundHaptics.playTap();
                        }}
                        className={`p-2.5 rounded-xl border text-left transition active:scale-95 cursor-pointer flex items-center justify-between gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/50 font-bold'
                            : isDay
                            ? 'bg-slate-50 hover:bg-emerald-50/90 border-slate-300 text-slate-900 font-bold'
                            : 'bg-[#092226] hover:bg-[#133941] border-[#184850] text-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xl shrink-0">{langItem.flag}</span>
                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate leading-tight">
                              {langItem.nativeName}
                            </div>
                            <div className={`text-[10px] truncate ${isDay ? 'text-slate-600 font-semibold' : 'opacity-75'}`}>
                              {langItem.label}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-white text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* App Install */}
              <div
                className={`p-4 rounded-2xl border shadow-md space-y-3 ${
                  isDay
                    ? 'bg-emerald-50/90 border-emerald-300 text-slate-900'
                    : 'bg-gradient-to-r from-[#07242a] via-[#0c333a] to-[#0f3d46] border-[#1f5c68] text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`font-extrabold text-sm ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {t('মোবাইলে Zikr+ অ্যাপ ইনস্টল', 'تثبيت تطبيق Zikr+ على الهاتف', 'Install Zikr+ App on Mobile')}
                    </h4>
                    <p className={`text-[11px] font-semibold ${isDay ? 'text-emerald-950' : 'text-emerald-200/90'}`}>
                      {t(
                        'আলাদা কোনো APK ডাউনলোড ছাড়াই Chrome থেকে ১-ক্লিকে ইনস্টল হয়।',
                        'ثبّته بنقرة واحدة من Chrome دون تنزيل APK خارجي.',
                        'Install in 1 click directly from Chrome without any separate APK download.'
                      )}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleInstallApp}
                  disabled={isInstalling}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  <span>{isInstalled
                    ? t('অ্যাপটি ইনস্টল আছে ✓ (নির্দেশিকা দেখুন)', 'التطبيق مثبّت ✓ (عرض الدليل)', 'App Installed ✓ (View Guide)')
                    : t('অ্যাপ ইনস্টল করুন', 'تثبيت التطبيق', 'Install App')}</span>
                </button>

                {onOpenStandaloneModal && (
                  <button
                    type="button"
                    onClick={onOpenStandaloneModal}
                    className={`w-full py-2 px-3 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      isDay
                        ? 'border-emerald-300 text-emerald-800 hover:bg-emerald-100/50'
                        : 'border-[#1f5c68] text-emerald-300 hover:bg-white/5'
                    }`}
                  >
                    <span>
                      {t(
                        '📱 অ্যাপ ও অফলাইন প্যাকেজ তথ্য',
                        '📱 معلومات التطبيق والحزمة دون اتصال',
                        '📱 App & Offline Package Info'
                      )}
                    </span>
                  </button>
                )}

                {installFeedback && (
                  <div className="p-2 rounded-xl text-center text-xs font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    {installFeedback}
                  </div>
                )}
              </div>

              {/* Theme Switcher */}
              <div
                className={`p-4 rounded-2xl border shadow-sm space-y-2.5 ${
                  isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0f343c] border-[#1c5763] text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>{t('থিম মোড', 'وضع المظهر', 'Theme Mode')}</span>
                  </span>
                  <span className={`text-xs font-bold ${isDay ? 'text-amber-700 font-black' : 'text-emerald-400'}`}>
                    {isDay ? t('দিন ☀️', 'نهار ☀️', 'Day ☀️') : t('রাত 🌙', 'ليل 🌙', 'Night 🌙')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isDay && onToggleThemeMode) onToggleThemeMode();
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      isDay ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm font-black' : 'bg-[#092226] text-slate-300 border-[#184850]'
                    }`}
                  >
                    {SETTINGS_UI.dayMode[selectedLanguage] || '☀️ Day Mode'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (isDay && onToggleThemeMode) onToggleThemeMode();
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      !isDay ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm font-black' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    }`}
                  >
                    {SETTINGS_UI.nightMode[selectedLanguage] || '🌙 Night Mode'}
                  </button>
                </div>
              </div>

              {/* Voice Reciter Selection */}
              <div
                className={`p-4 rounded-2xl border shadow-sm space-y-3 ${
                  isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0f343c] border-[#1c5763] text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{t('অডিও তেলাওয়াত কণ্ঠ নির্বাচন', 'اختيار صوت التلاوة', 'Voice Recitation Gender')}</span>
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    isDay
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30'
                  }`}>
                    {voiceGender === 'female' ? t('👩 নারী কণ্ঠ', '👩 صوت نسائي', '👩 Female') : t('👨 পুরুষ কণ্ঠ', '👨 صوت رجالي', '👨 Male')}
                  </span>
                </div>
                <p className={`text-xs ${isDay ? 'text-slate-600' : 'text-emerald-200/80'}`}>
                  {t(
                    'দোআ, হজ ও ওমরাহ তেলাওয়াতের জন্য পুরুষ কণ্ঠ (গভীর) বা নারী কণ্ঠ (সুমধুর) নির্বাচন করুন',
                    'اختر الصوت الرجالي أو النسائي لتلاوة الأدعية ومناسك الحج والعمرة',
                    'Choose Male baritone or Female melodious voice for prayer recitation'
                  )}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-700 w-full sm:w-auto justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (onUpdateVoiceGender) onUpdateVoiceGender('male');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        voiceGender !== 'female'
                          ? 'bg-emerald-600 text-white shadow ring-1 ring-emerald-400'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>👨</span>
                      <span>{t('পুরুষ কণ্ঠ', 'رجالي', 'Male')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (onUpdateVoiceGender) onUpdateVoiceGender('female');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        voiceGender === 'female'
                          ? 'bg-teal-600 text-white shadow ring-1 ring-teal-400'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>👩</span>
                      <span>{t('নারী কণ্ঠ', 'نسائي', 'Female')}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handlePlayVoiceSample}
                    className={`w-full sm:w-auto px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 transition active:scale-95 cursor-pointer ${
                      isPlayingSample
                        ? 'bg-amber-600 text-white border-amber-500 animate-pulse'
                        : isDay
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                        : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
                    }`}
                  >
                    {isPlayingSample ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>{t('থামুন', 'إيقاف', 'Stop Sample')}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{t('কণ্ঠ শুনুন', 'استمع للصوت', 'Test Voice')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Appearance Theme Selection (Moved from Other Hub Settings) */}
              {onUpdateSettings && (
                <div
                  className={`p-4 rounded-2xl border shadow-sm space-y-3 ${
                    isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0f343c] border-[#1c5763] text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <Palette className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{SETTINGS_UI.themeTitle[selectedLanguage] || 'Appearance Theme'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {appearanceThemes.map((th) => {
                      const isSelected = (appSettings?.theme || 'emerald') === th.id;
                      return (
                        <button
                          key={th.id}
                          type="button"
                          onClick={() => {
                            onUpdateSettings({ theme: th.id });
                            if (soundEnabled) soundHaptics.playTap();
                          }}
                          className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 bg-gradient-to-br cursor-pointer ${th.previewClass} ${
                            isSelected
                              ? 'ring-2 ring-emerald-400 shadow-md'
                              : 'opacity-80 hover:opacity-100 border-slate-700'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-emerald-300 bg-emerald-500' : 'border-slate-400'}`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white truncate">{th.name}</div>
                            <div className="text-[10px] text-slate-300 leading-tight line-clamp-1">{th.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Feedback & Sensory Controls (Audio, Haptics, Screen Wake Lock) */}
              <div
                className={`p-4 rounded-2xl border shadow-sm space-y-3 ${
                  isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0f343c] border-[#1c5763] text-white'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{SETTINGS_UI.audioHaptics[selectedLanguage] || 'Feedback & Sensory Controls'}</span>
                </div>

                <div className={`divide-y text-xs ${isDay ? 'divide-slate-100' : 'divide-teal-900/40'}`}>
                  {/* Bead Click Audio Toggle */}
                  {onToggleSound && (
                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-sm">
                          {SETTINGS_UI.soundLabel[selectedLanguage] || 'Bead Click Audio'}
                        </div>
                        <div className={`text-[11px] ${isDay ? 'text-slate-600' : 'text-emerald-200/75'}`}>
                          {SETTINGS_UI.soundDesc[selectedLanguage] || 'Synthesized acoustic wooden bead click on every count'}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={onToggleSound}
                        className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer shrink-0 ${
                          soundEnabled ? 'bg-emerald-600' : 'bg-slate-400 dark:bg-slate-700'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                            soundEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  )}

                  {/* Tactile Vibration Toggle */}
                  {onToggleVibration && (
                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-sm">
                          {SETTINGS_UI.vibrationLabel[selectedLanguage] || 'Tactile Vibration Haptics'}
                        </div>
                        <div className={`text-[11px] ${isDay ? 'text-slate-600' : 'text-emerald-200/75'}`}>
                          {SETTINGS_UI.vibrationDesc[selectedLanguage] || 'Soft pulse feedback on tap, milestone chords for targets'}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={onToggleVibration}
                        className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer shrink-0 ${
                          vibrationEnabled ? 'bg-emerald-600' : 'bg-slate-400 dark:bg-slate-700'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                            vibrationEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  )}

                  {/* Keep Screen Awake (Wake Lock) */}
                  {onUpdateSettings && (
                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-sm">
                          {SETTINGS_UI.wakeLockLabel[selectedLanguage] || 'Keep Screen Awake (Wake Lock)'}
                        </div>
                        <div className={`text-[11px] ${isDay ? 'text-slate-600' : 'text-emerald-200/75'}`}>
                          {SETTINGS_UI.wakeLockDesc[selectedLanguage] || 'Prevents phone display from sleeping while reciting'}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onUpdateSettings({ screenAwake: !(appSettings?.screenAwake) })}
                        className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer shrink-0 ${
                          appSettings?.screenAwake ? 'bg-emerald-600' : 'bg-slate-400 dark:bg-slate-700'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                            appSettings?.screenAwake ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Export & Data Backup (PDF Report, Backup JSON, Restore JSON) */}
              <div
                className={`p-4 rounded-2xl border shadow-sm space-y-3 ${
                  isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0f343c] border-[#1c5763] text-white'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{SETTINGS_UI.dataBackup[selectedLanguage] || 'Export & Data Backup'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {onExportPdf && (
                    <button
                      type="button"
                      onClick={onExportPdf}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition active:scale-95 cursor-pointer ${
                        isDay
                          ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900'
                          : 'bg-emerald-950/70 hover:bg-emerald-900 border-emerald-600/50 text-emerald-200'
                      }`}
                    >
                      <FileText className="w-4 h-4 text-amber-500" />
                      <span>{SETTINGS_UI.exportPdf[selectedLanguage] || 'Export PDF'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onExportBackupJson || handleDefaultExportBackup}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition active:scale-95 cursor-pointer ${
                      isDay
                        ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800'
                        : 'bg-[#092226] hover:bg-[#123840] border-[#184850] text-slate-200'
                    }`}
                  >
                    <Download className="w-4 h-4 text-teal-500" />
                    <span>{SETTINGS_UI.backupJson[selectedLanguage] || 'Backup JSON'}</span>
                  </button>

                  <label
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition active:scale-95 cursor-pointer ${
                      isDay
                        ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800'
                        : 'bg-[#092226] hover:bg-[#123840] border-[#184850] text-slate-200'
                    }`}
                  >
                    <Upload className="w-4 h-4 text-emerald-500" />
                    <span>{SETTINGS_UI.restoreJson[selectedLanguage] || 'Restore JSON'}</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (onImportBackupJson) onImportBackupJson(file);
                          else handleDefaultImportBackup(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Data Reset Controls (Danger Zone) */}
              {(onResetAllCounters || onRestoreDefaults) && (
                <div
                  className={`p-4 rounded-2xl border shadow-sm space-y-3 ${
                    isDay ? 'bg-rose-50/60 border-rose-200 text-slate-900' : 'bg-[#1a1114] border-red-900/50 text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-600 dark:text-red-400">
                    <ShieldAlert className="w-4 h-4" />
                    <span>{SETTINGS_UI.dangerZone[selectedLanguage] || 'Data Reset Controls'}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {onResetAllCounters && (
                      <button
                        type="button"
                        onClick={onResetAllCounters}
                        className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                          isDay
                            ? 'bg-rose-600 hover:bg-rose-700 border-rose-700 text-white'
                            : 'bg-red-950/70 hover:bg-red-900 border-red-800/60 text-red-200'
                        }`}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{SETTINGS_UI.resetCounters[selectedLanguage] || 'Reset All Counters to 0'}</span>
                      </button>
                    )}

                    {onRestoreDefaults && (
                      <button
                        type="button"
                        onClick={onRestoreDefaults}
                        className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition active:scale-95 cursor-pointer ${
                          isDay
                            ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                            : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                        }`}
                      >
                        {SETTINGS_UI.restoreAzkar[selectedLanguage] || 'Restore Default Azkar'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* System Info */}
              <div
                className={`p-4 rounded-2xl border text-xs space-y-2 ${
                  isDay ? 'bg-slate-100/90 border-slate-300 text-slate-900' : 'bg-[#071f25] border-[#174853] text-white'
                }`}
              >
                <div className={`font-black text-xs ${isDay ? 'text-slate-900' : 'text-emerald-300'}`}>
                  {t('সিস্টেম তথ্য', 'معلومات النظام', 'System Information')}
                </div>
                <div className={`grid grid-cols-2 gap-1.5 text-[11px] font-mono ${
                  isDay ? 'text-slate-800 font-medium' : 'text-emerald-200/90'
                }`}>
                  <div>{t('মডেল:', 'الطراز:', 'Model:')} <span className={isDay ? 'text-emerald-950 font-bold' : 'text-emerald-300 font-bold'}>{userProfile.deviceModel || 'Android Phone'}</span></div>
                  <div>{t('ওএস:', 'النظام:', 'OS:')} <span className={isDay ? 'text-emerald-950 font-bold' : 'text-emerald-300 font-bold'}>{userProfile.osVersion || 'Android 10'}</span></div>
                  <div>{t('অ্যাপ:', 'التطبيق:', 'App:')} <span className={isDay ? 'text-emerald-950 font-bold' : 'text-emerald-300 font-bold'}>v411_38.1</span></div>
                  <div>{t('অবস্থান:', 'الموقع:', 'Location:')} <span className={isDay ? 'text-emerald-950 font-bold' : 'text-emerald-300 font-bold'}>{userProfile.location || 'Asia/Dhaka'}</span></div>
                </div>
              </div>

              {/* Onboarding Welcome Screen Preview Trigger */}
              {onOpenWelcomeScreen && (
                <div
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    isDay ? 'bg-emerald-50/70 border-emerald-200 text-slate-900' : 'bg-[#082830] border-emerald-700/40 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-extrabold text-xs text-emerald-600 dark:text-emerald-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{t('প্রথম ডাউনলোড ওয়েলকাম স্ক্রিন', 'شاشة الترحيب الأولى', 'First Download Welcome Screen')}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-emerald-200/70 mt-0.5">
                        {t(
                          'অ্যাপ ইন্সটলের পর প্রদর্শিত নান্দনিক পূর্ণাঙ্গ সাইন-ইন ইন্টারফেস',
                          'شاشة الترحيب وتسجيل الدخول المعروضة عند أول تشغيل للتطبيق',
                          'Show the initial onboarding & sign-in screen'
                        )}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenWelcomeScreen();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer shrink-0"
                    >
                      {t('স্ক্রিন দেখুন', 'معاينة', 'Preview')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ----------------- SUB-MODAL: UNIFIED AUTHENTICATION FORM ----------------- */}
        {activeSubModal === 'verified_auth' && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
            <div
              className={`w-full max-w-md rounded-3xl border shadow-2xl p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto relative ${
                isDay
                  ? 'bg-gradient-to-b from-[#f9fcfb] to-white text-slate-800 border-emerald-200/80'
                  : 'bg-gradient-to-b from-[#0a252b] to-[#071a1e] text-white border-[#1c5561]'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-teal-900/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900 dark:text-white">
                      {t('Zikr+ লগইন / সাইন আপ', 'تسجيل الدخول / إنشاء حساب Zikr+', 'Zikr+ Login / Sign Up')}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-emerald-300/80">
                      {t('সহজ ও নিরাপদ ১-ক্লিক অ্যাকাউন্ট সাইন-ইন', 'تسجيل دخول آمن وسهل بنقرة واحدة', 'Easy & secure 1-click account sign-in')}
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
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* STEP 1: INPUT FORM */}
              {verificationStep === 'input' && (
                <div className="space-y-3.5 animate-in fade-in">
                  {/* Google One-Tap */}
                  <button
                    type="button"
                    disabled={isVerifying}
                    onClick={handleTriggerGoogleAuth}
                    className="w-full p-3 rounded-2xl bg-white dark:bg-[#071f25] hover:bg-slate-50 dark:hover:bg-[#0a272f] text-slate-800 dark:text-white font-bold border border-slate-300 dark:border-teal-700/60 shadow-sm flex items-center justify-between transition active:scale-98 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <GoogleIcon />
                      <div className="text-left">
                        <div className="text-xs sm:text-sm font-extrabold">
                          {t('গুগল দিয়ে চালিয়ে যান', 'المتابعة باستخدام Google', 'Continue with Google')}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-emerald-300/70">
                          {t('১-ক্লিকে সরাসরি গুগল সাইন-ইন', 'تسجيل دخول مباشر عبر Google بنقرة واحدة', 'Direct 1-click Google Sign-In')}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-500/30">
                      {t('১-ক্লিক গুগল', 'نقرة واحدة', 'Google One-Tap')}
                    </span>
                  </button>

                  <div className="flex items-center gap-3 text-[10px] font-extrabold text-slate-400 dark:text-teal-400/60 uppercase tracking-wider py-0.5">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-teal-900/60" />
                    <span>{t('অথবা জিমেইল ও ফোন দিয়ে', 'أو عبر البريد والهاتف', 'Or with Email & Phone')}</span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-teal-900/60" />
                  </div>

                  {/* Gmail Input (Required) */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t('জিমেইল / ইমেইল অ্যাড্রেস *', 'البريد الإلكتروني *', 'Email Address *')}</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                      placeholder={t('যেমন: name@gmail.com', 'مثال: name@gmail.com', 'e.g. name@gmail.com')}
                      className={`w-full rounded-2xl px-3.5 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                        isDay
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                          : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                      }`}
                    />
                  </div>

                  {/* Optional Phone Number */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-emerald-300 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{t('মোবাইল নম্বর', 'رقم الهاتف', 'Phone Number')}</span>
                      </label>
                      <span className="text-[9px] text-slate-400 font-mono">{t('ঐচ্ছিক', 'اختياري', 'Optional')}</span>
                    </div>
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
                        value={inputPhone}
                        onChange={(e) => setInputPhone(e.target.value)}
                        placeholder={t('০১৭১২৩৪৫৬৭৮ (ঐচ্ছিক)', '01712345678 (اختياري)', '01712345678 (Optional)')}
                        className={`flex-1 rounded-2xl px-3.5 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                          isDay
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                            : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Full Name (Optional) */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t('আপনার নাম (ঐচ্ছিক)', 'الاسم الكامل (اختياري)', 'Your Name (Optional)')}</span>
                    </label>
                    <input
                      type="text"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      placeholder={t('আপনার পূর্ণ নাম লিখুন', 'اكتب اسمك الكامل', 'e.g. Mursaline Parvez')}
                      className={`w-full rounded-2xl px-3.5 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                        isDay
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                          : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                      }`}
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t('পাসওয়ার্ড *', 'كلمة المرور *', 'Password *')}</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleInstantPasswordAuth();
                        }}
                        placeholder={t('কমপক্ষে ৪ অক্ষরের পাসওয়ার্ড', '٤ أحرف على الأقل', 'At least 4 characters')}
                        className={`w-full rounded-2xl pl-3.5 pr-10 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                          isDay
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white'
                            : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-emerald-300 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Error display */}
                  {otpErrorMessage && (
                    <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                      <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500" />
                      <span>{otpErrorMessage}</span>
                    </div>
                  )}

                  {/* 2 ACTION BUTTONS */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      disabled={isVerifying}
                      onClick={handleInstantPasswordAuth}
                      className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                    >
                      {isVerifying ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-amber-300" />
                      )}
                      <span>
                        {t(
                          '⚡ ১-ক্লিকে সাইন-ইন / রেজিস্ট্রেশন করুন',
                          '⚡ تسجيل الدخول / التسجيل بنقرة واحدة',
                          '⚡ 1-Click Sign In / Register'
                        )}
                      </span>
                    </button>

                    <button
                      type="button"
                      disabled={isSendingCode}
                      onClick={handleSendOtp}
                      className="w-full py-2.5 px-4 rounded-2xl bg-white dark:bg-[#092226] hover:bg-slate-50 text-slate-700 dark:text-emerald-300 font-bold text-xs border border-slate-300 dark:border-teal-800 shadow-sm flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                    >
                      {isSendingCode ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      <span>
                        {t(
                          '📩 জিমেইলে ভেরিফিকেশন কোড পাঠান',
                          '📩 إرسال رمز التحقق إلى البريد',
                          '📩 Send Verification Code to Email'
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: OTP ENTRY WITH INSTANT AUTO-FILL CODE BANNER */}
              {verificationStep === 'otp' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
                    <h4 className="font-extrabold text-sm text-emerald-800 dark:text-emerald-300">
                      {t('ভেরিফিকেশন কোড পাঠানো হয়েছে', 'تم إرسال رمز التحقق', 'Verification Code Sent')}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-emerald-200/90">
                      {t(
                        `আপনার ইমেইলে (${maskedTargetDisplay || inputEmail}) ৬-সংখ্যার সিকিউরিটি কোড পাঠানো হয়েছে।`,
                        `تم إرسال رمز أمان مكون من ٦ أرقام إلى بريدك (${maskedTargetDisplay || inputEmail}).`,
                        `A 6-digit security code has been sent to your email (${maskedTargetDisplay || inputEmail}).`
                      )}
                    </p>
                  </div>

                  {/* INSTANT CODE HELPER BANNER */}
                  {(() => {
                    const pending = getPendingOtp();
                    if (!pending || !pending.code) return null;
                    return (
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-amber-500/20 border-2 border-amber-500/40 text-amber-950 dark:text-amber-100 text-xs font-bold space-y-2.5 shadow-md animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-amber-900 dark:text-amber-200 font-black">
                            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                            <span>{t('ইমেইলে কোড আসতে দেরি হলে:', 'إذا تأخر وصول الرمز للبريد:', 'If email delivery is delayed:')}</span>
                          </span>
                          <span className="font-mono bg-amber-500 text-slate-950 px-3 py-1 rounded-xl font-black text-sm tracking-wider shadow-xs">
                            {pending.code}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const digits = pending.code.split('');
                            setOtpDigits(digits);
                            if (soundEnabled) soundHaptics.playMilestone();
                            setTimeout(() => {
                              handleConfirmOtp();
                            }, 50);
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>
                            {t(
                              `⚡ ১-ক্লিকে কোড বসান ও ভেরিফাই করুন (${pending.code})`,
                              `⚡ تعبئة الرمز والتحقق بنقرة واحدة (${pending.code})`,
                              `⚡ 1-Click Auto-Fill & Verify (${pending.code})`
                            )}
                          </span>
                        </button>
                      </div>
                    );
                  })()}

                  {/* 6-DIGIT OTP BOXES */}
                  <div className="space-y-2">
                    <label className="block text-center text-xs font-bold text-slate-600 dark:text-emerald-300">
                      {t('৬-সংখ্যার সিকিউরিটি কোড দিন:', 'أدخل رمز الأمان المكون من ٦ أرقام:', 'Enter 6-digit security code:')}
                    </label>
                    <div className="flex justify-between gap-1.5">
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

                  {/* Error message */}
                  {otpErrorMessage && (
                    <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                      <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500" />
                      <span>{otpErrorMessage}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setVerificationStep('input')}
                      className="py-3 px-4 rounded-2xl border border-slate-300 dark:border-teal-900/60 font-bold text-xs hover:bg-slate-100 dark:hover:bg-teal-900/30 transition cursor-pointer"
                    >
                      {t('পিছনে', 'رجوع', 'Back')}
                    </button>

                    <button
                      type="button"
                      disabled={isVerifying || otpDigits.join('').length < 6}
                      onClick={handleConfirmOtp}
                      className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                    >
                      {isVerifying ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      <span>{t('কোড সাবমিট করুন', 'تأكيد الرمز', 'Verify Code')}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SUCCESS */}
              {verificationStep === 'success' && (
                <div className="p-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 mx-auto flex items-center justify-center border-2 border-emerald-500 shadow-lg">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="font-black text-base text-emerald-600 dark:text-emerald-400">
                      {t('✓ সফলভাবে লগইন হয়েছে!', '✓ تم تسجيل الدخول بنجاح!', '✓ Signed In Successfully!')}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-emerald-300 mt-1">
                      {cloudSyncMessage || t('ক্লাউড সিঙ্ক চালু হয়েছে...', 'المزامنة السحابية مفعلة...', 'Cloud sync is active...')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SUB-MODAL: EDIT PROFILE */}
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
                  <span>{t('প্রোফাইল সম্পাদনা করুন', 'تعديل الملف الشخصي', 'Edit Account Profile')}</span>
                </h3>
                <button
                  onClick={() => setActiveSubModal('none')}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-teal-900/40"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1 text-slate-500 dark:text-emerald-300">
                    {t('পূর্ণ নাম', 'الاسم الكامل', 'Full Name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className={`w-full rounded-xl px-3 py-2 border font-semibold focus:outline-none ${
                      isDay
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                        : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-500 dark:text-emerald-300">
                    {t('ইমেইল / মোবাইল', 'البريد الإلكتروني / الهاتف', 'Email / Phone')}
                  </label>
                  <input
                    type="text"
                    required
                    value={editEmailOrPhone}
                    onChange={(e) => setEditEmailOrPhone(e.target.value)}
                    className={`w-full rounded-xl px-3 py-2 border font-semibold focus:outline-none ${
                      isDay
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                        : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveSubModal('none')}
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 font-bold hover:bg-slate-100 transition"
                  >
                    {t('বাতিল', 'إلغاء', 'Cancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md active:scale-95"
                  >
                    {t('পরিবর্তন সংরক্ষণ করুন', 'حفظ التغييرات', 'Save Changes')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SUB-MODAL: FEEDBACK */}
        {activeSubModal === 'feedback' && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div
              className={`w-full max-w-md rounded-3xl border p-5 shadow-2xl space-y-4 ${
                isDay ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0f343c] text-white border-[#1c5763]'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-teal-900/40">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-base">{t('মতামত পাঠান', 'إرسال الملاحظات', 'Send Feedback')}</h3>
                </div>
                <button
                  onClick={() => setActiveSubModal('none')}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-teal-900/40"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block text-slate-500 dark:text-emerald-300 mb-1">
                    {t('মাধ্যম নির্বাচন করুন:', 'الوسيلة:', 'Channel:')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFeedbackChannel('whatsapp')}
                      className={`py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 ${
                        feedbackChannel === 'whatsapp' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700' : 'bg-slate-100'
                      }`}
                    >
                      <span>{t('💬 হোয়াটসঅ্যাপ', '💬 واتساب', '💬 WhatsApp')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackChannel('email')}
                      className={`py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 ${
                        feedbackChannel === 'email' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700' : 'bg-slate-100'
                      }`}
                    >
                      <Mail className="w-4 h-4 text-rose-500" />
                      <span>{t('ইমেইল', 'البريد الإلكتروني', 'Email')}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-bold block text-slate-500 dark:text-emerald-300 mb-1">
                    {t('আপনার ইমেইল / মোবাইল:', 'بريدك الإلكتروني / رقم هاتفك:', 'Your Email / Phone:')}
                  </label>
                  <input
                    type="text"
                    value={feedbackUserEmail}
                    onChange={(e) => setFeedbackUserEmail(e.target.value)}
                    className={`w-full rounded-xl px-3 py-2 border font-medium ${
                      isDay ? 'bg-slate-50 border-slate-300' : 'bg-[#092226] border-[#184850] text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold block text-slate-500 dark:text-emerald-300 mb-1">
                    {t('আপনার মতামত:', 'رسالتك:', 'Your Message:')}
                  </label>
                  <textarea
                    rows={3}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder={t('এখানে আপনার মতামত বা পরামর্শ লিখুন...', 'اكتب رسالتك هنا...', 'Type your message here...')}
                    className={`w-full rounded-xl p-3 border ${
                      isDay ? 'bg-slate-50 border-slate-300' : 'bg-[#092226] border-[#184850] text-white'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveSubModal('none')}
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 font-bold hover:bg-slate-100"
                  >
                    {t('বাতিল', 'إلغاء', 'Cancel')}
                  </button>
                  <button
                    type="button"
                    onClick={handleSendFeedback}
                    className="flex-1 py-2.5 rounded-xl bg-[#2d7d4f] hover:bg-[#256a42] text-white font-bold flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t('বার্তা পাঠান', 'إرسال', 'Send Message')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MODAL: BOOKMARKS */}
        {activeSubModal === 'bookmarks' && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div
              className={`w-full max-w-md rounded-3xl border p-5 shadow-2xl space-y-4 ${
                isDay ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0f343c] text-white border-[#1c5763]'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-teal-900/40">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-emerald-600 fill-current" />
                  <h3 className="font-bold text-base">{t('আপনার বুকমার্কসমূহ', 'علاماتك المرجعية', 'Your Bookmarks')}</h3>
                </div>
                <button onClick={() => setActiveSubModal('none')} className="p-1 rounded-lg hover:bg-slate-100">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {sampleBookmarks.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-2 ${
                      isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#092226] border-[#184850]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{item.title}</div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 font-semibold">
                        {item.category}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        onNavigateModule(item.module);
                        setActiveSubModal('none');
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-[10px] font-bold"
                    >
                      {t('খুলুন →', 'فتح ←', 'Open →')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUB-MODAL: DOWNLOADS */}
        {activeSubModal === 'downloads' && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div
              className={`w-full max-w-md rounded-3xl border p-5 shadow-2xl space-y-4 ${
                isDay ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0f343c] text-white border-[#1c5763]'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-teal-900/40">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-base">{t('ডাউনলোডকৃত কিতাব', 'الكتب المحملة', 'Downloaded Books')}</h3>
                </div>
                <button onClick={() => setActiveSubModal('none')} className="p-1 rounded-lg hover:bg-slate-100">
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
                      <span className="text-[10px] text-slate-400 font-mono">{item.size}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 font-bold">
                      {item.status} ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUB-MODAL: LOGOUT CONFIRMATION */}
        {activeSubModal === 'logout_confirm' && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div
              className={`w-full max-w-xs rounded-3xl border p-5 shadow-2xl text-center space-y-3 ${
                isDay ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0f343c] text-white border-[#1c5763]'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-600 mx-auto flex items-center justify-center border border-rose-500/30">
                <LogOut className="w-6 h-6" />
              </div>
              <h4 className="font-black text-base">{t('লগআউট নিশ্চিত করুন', 'تأكيد تسجيل الخروج', 'Confirm Logout')}</h4>
              <p className="text-xs text-slate-500 dark:text-emerald-200/80">
                {t(
                  'লগআউট করলে আপনার ক্লাউড একাউন্ট থেকে ডিসকানেক্ট হবেন। পুনরায় একই জিমেইল দিয়ে সাইন-ইন করলেই সব ডাটা ফিরে আসবে।',
                  'سيتم فصلك عن حسابك السحابي عند تسجيل الخروج. عند تسجيل الدخول مرة أخرى بنفس البريد ستعود جميع بياناتك.',
                  'Signing out disconnects your cloud account. Sign back in with the same email anytime to restore all your data.'
                )}
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveSubModal('none')}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-bold text-xs"
                >
                  {t('বাতিল', 'إلغاء', 'Cancel')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const devId = getDeviceId();
                    const shortDevId = devId.replace(/[^a-z0-9]/g, '').slice(-6).toUpperCase();
                    const loggedOutProf: UserProfile = {
                      name: `User #${shortDevId}`,
                      emailOrPhone: `guest_${shortDevId}`,
                      photoUrl: '',
                      isSignedIn: false,
                      isVerified: false,
                      userId: `USR-${shortDevId}`,
                      userSerial: 0,
                      location: userProfile.location || 'Bangladesh',
                      deviceModel: userProfile.deviceModel || 'Mobile Device',
                      osVersion: userProfile.osVersion || 'Android',
                      appVersion: userProfile.appVersion,
                    };
                    try {
                      sessionStorage.removeItem('zikrmate_admin_session_auth');
                      localStorage.removeItem('zikrmate_admin_session_auth');
                      localStorage.removeItem('zikrmate_guest_zero_initialized_v3');
                      localStorage.setItem('zikrmate_user_profile', JSON.stringify(loggedOutProf));
                    } catch {}
                    onUpdateProfile(loggedOutProf);
                    setActiveSubModal('none');
                    if (soundEnabled) soundHaptics.playMilestone();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  {t('হ্যাঁ, লগআউট করুন', 'نعم، تسجيل الخروج', 'Yes, Logout')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Universal PWA Install Guide Modal */}
        <InstallAppModal
          isOpen={showInstallGuideModal}
          onClose={() => setShowInstallGuideModal(false)}
          isDay={isDay}
        />
      </div>
    </div>
  );
};
