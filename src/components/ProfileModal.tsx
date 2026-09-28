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
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, ThemeMode, ZikrLanguage, NavModule, ZikrItem, HistorySession, AppSettings } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import { findSavedAccount, saveAccountToRegistry } from '../utils/accountRegistry';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  generateVerificationOtp,
  verifySubmittedOtp,
  loadUserDataFromCloud,
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
  onCloudDataLoaded?: (data: CloudZikrState) => void;
  onTriggerCloudSync?: () => Promise<boolean>;
  isSyncingCloud?: boolean;
  lastCloudSyncTimestamp?: number;
}

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80',
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
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | 'google'>('email');
  const [verificationStep, setVerificationStep] = useState<'input' | 'otp' | 'success'>('input');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+880');
  const [inputName, setInputName] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [generatedOtpCode, setGeneratedOtpCode] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(60);
  const [otpErrorMessage, setOtpErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [cloudSyncMessage, setCloudSyncMessage] = useState<string | null>(null);
  const [showOtpNotification, setShowOtpNotification] = useState(false);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

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

  // Auto-detect user's real device info from browser/hardware environment
  const getDetectedDeviceInfo = () => {
    if (typeof window === 'undefined') {
      return {
        model: 'vivo ~~ V2144',
        osVersion: '35_15',
        deviceLanguage: 'en',
      };
    }

    const ua = navigator.userAgent || '';
    let model = 'vivo ~~ V2144';
    let osVersion = '35_15';
    const deviceLanguage = (navigator.language || 'en').split('-')[0];

    if (/Android/i.test(ua)) {
      const androidMatch = ua.match(/Android\s+([0-9\._]+)/i);
      if (androidMatch) {
        osVersion = `${androidMatch[1]}_15`;
      }
      const modelMatch = ua.match(/;\s*([^;]+?)\s*Build/i);
      if (modelMatch && modelMatch[1]) {
        model = modelMatch[1].trim();
      } else if (/vivo/i.test(ua)) {
        model = 'vivo ~~ V2144';
      } else if (/Samsung|SM-/i.test(ua)) {
        const smMatch = ua.match(/(SM-[A-Z0-9]+)/i);
        model = smMatch ? `Samsung ~~ ${smMatch[1]}` : 'Samsung Galaxy';
      } else if (/Xiaomi|Redmi/i.test(ua)) {
        model = 'Xiaomi Redmi';
      } else {
        model = 'Android Device';
      }
    } else if (/iPhone/i.test(ua)) {
      model = 'Apple iPhone';
      const iosMatch = ua.match(/OS\s+([0-9_]+)/i);
      if (iosMatch) osVersion = iosMatch[1].replace(/_/g, '.');
    } else if (/Windows/i.test(ua)) {
      model = 'Windows PC';
      osVersion = '11_64';
    } else if (/Macintosh/i.test(ua)) {
      model = 'Apple Mac';
      osVersion = '14_1';
    }

    return { model, osVersion, deviceLanguage };
  };

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
    setEditDeviceModel(userProfile.deviceModel || detected.model);
    setEditOsVersion(userProfile.osVersion || detected.osVersion);

    if (userProfile.emailOrPhone) {
      setFeedbackUserEmail(userProfile.emailOrPhone);
    }
    setFeedbackModel(userProfile.deviceModel || detected.model);
    setFeedbackOsVersion(userProfile.osVersion || detected.osVersion);

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
  const handleOpenVerifiedAuth = (method: 'email' | 'phone' | 'google' = 'email') => {
    setAuthMethod(method);
    setVerificationStep('input');
    setOtpErrorMessage(null);
    setShowOtpNotification(false);
    setOtpDigits(['', '', '', '', '', '']);
    setCloudSyncMessage(null);
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

  // Send 6-digit OTP code to email or phone
  const handleSendOtp = () => {
    setOtpErrorMessage(null);
    const target =
      authMethod === 'email'
        ? inputEmail.trim().toLowerCase()
        : `${selectedCountryCode}${inputPhone.replace(/^0+/, '').trim()}`;

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

    // Check existing account password protection
    const existing = findSavedAccount(target);
    if (existing && existing.password && existing.password !== inputPassword.trim()) {
      setOtpErrorMessage('ভুল পাসওয়ার্ড! এই অ্যাকাউন্টের সঠিক পাসওয়ার্ড দিন। অন্য কেউ আপনার অ্যাকাউন্টে প্রবেশ করতে পারবে না।');
      if (soundEnabled) soundHaptics.playTap();
      return;
    }

    const methodType: 'email' | 'phone' = authMethod === 'phone' ? 'phone' : 'email';
    const code = generateVerificationOtp(target, methodType);
    setGeneratedOtpCode(code);
    setOtpDigits(['', '', '', '', '', '']);
    setOtpCountdown(60);
    setShowOtpNotification(true);
    setVerificationStep('otp');
    if (soundEnabled) soundHaptics.playTap();
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

    const verificationResult = verifySubmittedOtp(target, fullEntered);
    if (!verificationResult.success) {
      setIsVerifying(false);
      setOtpErrorMessage(verificationResult.message);
      if (soundEnabled) soundHaptics.playTap();
      return;
    }

    // Step Success!
    setVerificationStep('success');
    setCloudSyncMessage('যাচাই সম্পন্ন! ক্লাউড থেকে আপনার সকল ইতিহাস লোড হচ্ছে...');
    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    if (soundEnabled) soundHaptics.playMilestone();

    // Cross-device cloud history load
    const cloudData = await loadUserDataFromCloud(target);
    if (cloudData && onCloudDataLoaded) {
      onCloudDataLoaded(cloudData);
    }

    const existing = findSavedAccount(target);
    const detected = getDetectedDeviceInfo();
    const updated: UserProfile = {
      name:
        inputName.trim() ||
        cloudData?.profile?.name ||
        existing?.name ||
        (authMethod === 'email' ? inputEmail.split('@')[0] : 'ZikrMate User'),
      emailOrPhone: target,
      photoUrl: cloudData?.profile?.photoUrl || existing?.photoUrl || userProfile.photoUrl || DEFAULT_AVATARS[0],
      password: inputPassword.trim() || cloudData?.profile?.password || existing?.password || '',
      location: cloudData?.profile?.location || existing?.location || userProfile.location || '4C2J 8FX, BD',
      deviceModel: cloudData?.profile?.deviceModel || existing?.deviceModel || userProfile.deviceModel || detected.model,
      osVersion: cloudData?.profile?.osVersion || existing?.osVersion || userProfile.osVersion || detected.osVersion,
      isSignedIn: true,
      isVerified: true,
      verificationMethod: authMethod,
      verificationDate: new Date().toISOString(),
      authProvider: authMethod,
      lastSyncedAt: Date.now(),
    };

    saveAccountToRegistry(updated);
    onUpdateProfile(updated);
    setIsVerifying(false);

    setTimeout(() => {
      setActiveSubModal('none');
      setVerificationStep('input');
    }, 1500);
  };

  // Handle instant Google Sign In with cloud sync
  const handleGoogleSignIn = async (account: { name: string; emailOrPhone: string; photoUrl: string; password?: string }) => {
    const existing = findSavedAccount(account.emailOrPhone);
    const cloudData = await loadUserDataFromCloud(account.emailOrPhone);

    const savedPassword = existing?.password || cloudData?.profile?.password;
    if (savedPassword && account.password && savedPassword !== account.password) {
      setOtpErrorMessage('ভুল পাসওয়ার্ড! এই অ্যাকাউন্টের সঠিক পাসওয়ার্ড দিন।');
      if (soundEnabled) soundHaptics.playTap();
      return;
    }

    setIsVerifying(true);
    setCloudSyncMessage('গুগল অ্যাকাউন্ট যাচাই ও ক্লাউড ডাটা লোড হচ্ছে...');

    if (cloudData && onCloudDataLoaded) {
      onCloudDataLoaded(cloudData);
    }

    const detected = getDetectedDeviceInfo();
    const updated: UserProfile = {
      ...userProfile,
      name: account.name || cloudData?.profile?.name || existing?.name || 'Google User',
      emailOrPhone: account.emailOrPhone.toLowerCase().trim(),
      photoUrl: account.photoUrl || cloudData?.profile?.photoUrl || existing?.photoUrl || DEFAULT_AVATARS[0],
      password: account.password || savedPassword || '',
      location: existing?.location || userProfile.location || '4C2J 8FX, BD',
      deviceModel: existing?.deviceModel || userProfile.deviceModel || detected.model,
      osVersion: existing?.osVersion || userProfile.osVersion || detected.osVersion,
      isSignedIn: true,
      isVerified: true,
      verificationMethod: 'google',
      verificationDate: new Date().toISOString(),
      authProvider: 'google',
      lastSyncedAt: Date.now(),
    };
    saveAccountToRegistry(updated);
    onUpdateProfile(updated);
    setIsVerifying(false);
    setActiveSubModal('none');
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    if (soundEnabled) soundHaptics.playMilestone();
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
                  className={`p-4 rounded-2xl border shadow-md transition-all space-y-3 ${
                    isDay
                      ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/40 border-emerald-200'
                      : 'bg-gradient-to-r from-[#09282f] via-[#0d343c] to-[#0e3b45] border-[#1f5e6b]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40 shadow-inner">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm leading-snug text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>Verified Sign In</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                          Cloud History
                        </span>
                      </h3>
                      <p className="text-[11px] text-slate-600 dark:text-teal-200/80 leading-relaxed">
                        ইমেইল বা ফোন নম্বর ভেরিফাই করে লগইন করুন। যেকোনো ডিভাইস থেকে লগইন করলে আপনার সকল জিকির ও হিস্ট্রি অক্ষুণ্ণ থাকবে।
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons: Email Verification vs Phone Verification vs Google */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        handleOpenVerifiedAuth('email');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Verification (ইমেইল)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleOpenVerifiedAuth('phone');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className="py-2.5 px-3 rounded-xl bg-[#0e4b52] hover:bg-[#135d66] text-white font-bold text-xs border border-teal-500/40 shadow-sm flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-teal-300" />
                      <span>Phone SMS (মোবাইল নম্বর)</span>
                    </button>
                  </div>

                  <div className="text-center pt-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        handleOpenVerifiedAuth('google');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-teal-200 hover:text-emerald-600 dark:hover:text-emerald-300 transition cursor-pointer"
                    >
                      <GoogleIcon />
                      <span>Or Continue with Google One-Tap</span>
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
                  <div>Model: {userProfile.deviceModel || 'vivo ~~ V2144'}</div>
                  <div>OS: {userProfile.osVersion || '35_15'}</div>
                  <div>App: ZikrMate v411_38.1</div>
                  <div>Location: {userProfile.location || '4C2J 8FX, BD'}</div>
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
                onClick={() => setActiveSubModal('google_auth')}
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
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div
              className={`w-full max-w-sm rounded-3xl border p-5 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto ${
                isDay ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0f343c] text-white border-[#1c5763]'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-teal-900/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base leading-tight">
                      Verified Sign In &amp; Cloud Sync
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-teal-300/80">
                      যেকোনো ডিভাইসে ইতিহাস অক্ষুণ্ণ রাখার নিরাপদ ব্যবস্থা
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSubModal('none');
                    setVerificationStep('input');
                  }}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-teal-900/40 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* STEP 1: METHOD SELECTION & CREDENTIALS INPUT */}
              {verificationStep === 'input' && (
                <div className="space-y-3.5 animate-in fade-in">
                  {/* Method Switcher Tabs: Email vs Phone vs Google */}
                  <div className="grid grid-cols-3 p-1 rounded-2xl bg-slate-100 dark:bg-[#071f25] border border-slate-200 dark:border-teal-900/50 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMethod('email');
                        setOtpErrorMessage(null);
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`py-2 rounded-xl flex items-center justify-center gap-1 transition cursor-pointer ${
                        authMethod === 'email'
                          ? 'bg-white dark:bg-[#134952] text-emerald-700 dark:text-emerald-300 shadow-sm font-extrabold'
                          : 'text-slate-500 hover:text-slate-800 dark:text-teal-300'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAuthMethod('phone');
                        setOtpErrorMessage(null);
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`py-2 rounded-xl flex items-center justify-center gap-1 transition cursor-pointer ${
                        authMethod === 'phone'
                          ? 'bg-white dark:bg-[#134952] text-emerald-700 dark:text-emerald-300 shadow-sm font-extrabold'
                          : 'text-slate-500 hover:text-slate-800 dark:text-teal-300'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Phone SMS</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAuthMethod('google');
                        setOtpErrorMessage(null);
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`py-2 rounded-xl flex items-center justify-center gap-1 transition cursor-pointer ${
                        authMethod === 'google'
                          ? 'bg-white dark:bg-[#134952] text-emerald-700 dark:text-emerald-300 shadow-sm font-extrabold'
                          : 'text-slate-500 hover:text-slate-800 dark:text-teal-300'
                      }`}
                    >
                      <GoogleIcon />
                      <span>Google</span>
                    </button>
                  </div>

                  {/* 1. EMAIL AUTH FORM */}
                  {authMethod === 'email' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-teal-200 mb-1">
                          Full Name (আপনার নাম)
                        </label>
                        <input
                          type="text"
                          value={inputName}
                          onChange={(e) => setInputName(e.target.value)}
                          placeholder="e.g. Md. Mursaline Parvez"
                          className={`w-full rounded-xl px-3 py-2 border text-xs font-semibold focus:outline-none ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                              : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-teal-200 mb-1">
                          Email Address (ইমেইল ঠিকানা) *
                        </label>
                        <input
                          type="email"
                          autoComplete="email"
                          required
                          value={inputEmail}
                          onChange={(e) => setInputEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className={`w-full rounded-xl px-3 py-2 border text-xs font-semibold focus:outline-none ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                              : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-teal-200 mb-1">
                          Account Password / PIN (গোপন পাসওয়ার্ড) *
                        </label>
                        <input
                          type="password"
                          required
                          value={inputPassword}
                          onChange={(e) => setInputPassword(e.target.value)}
                          placeholder="••••••••"
                          className={`w-full rounded-xl px-3 py-2 border text-xs font-semibold focus:outline-none ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                              : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                          }`}
                        />
                        <p className="text-[10px] text-slate-400 mt-1">
                          শুধুমাত্র আপনি এই পাসওয়ার্ড দিয়ে আপনার অ্যাকাউন্টে ঢুকতে পারবেন। অন্য কেউ প্রবেশ করতে পারবে না।
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                        <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          লগইনের আগে আপনার ইমেইলে একটি ৬ ডিজিটের ভেরিফিকেশন ওটিপি কোড পাঠানো হবে।
                        </span>
                      </div>

                      {otpErrorMessage && (
                        <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                          <ShieldAlert className="w-4 h-4 shrink-0" />
                          <span>{otpErrorMessage}</span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send 6-Digit OTP Code (কোড পাঠান)</span>
                      </button>
                    </div>
                  )}

                  {/* 2. PHONE NUMBER SMS AUTH FORM */}
                  {authMethod === 'phone' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-teal-200 mb-1">
                          Full Name (আপনার নাম)
                        </label>
                        <input
                          type="text"
                          value={inputName}
                          onChange={(e) => setInputName(e.target.value)}
                          placeholder="e.g. Abdullah Al-Mamun"
                          className={`w-full rounded-xl px-3 py-2 border text-xs font-semibold focus:outline-none ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                              : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-teal-200 mb-1">
                          Mobile Number (মোবাইল নম্বর) *
                        </label>
                        <div className="flex gap-1.5">
                          <select
                            value={selectedCountryCode}
                            onChange={(e) => setSelectedCountryCode(e.target.value)}
                            className={`rounded-xl px-2 py-2 border text-xs font-bold focus:outline-none ${
                              isDay
                                ? 'bg-slate-50 border-slate-300 text-slate-900'
                                : 'bg-[#092226] border-[#184850] text-white'
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
                            placeholder="01712345678"
                            className={`flex-1 rounded-xl px-3 py-2 border text-xs font-semibold focus:outline-none ${
                              isDay
                                ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                                : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-teal-200 mb-1">
                          Account Password / PIN (গোপন পাসওয়ার্ড) *
                        </label>
                        <input
                          type="password"
                          required
                          value={inputPassword}
                          onChange={(e) => setInputPassword(e.target.value)}
                          placeholder="••••••••"
                          className={`w-full rounded-xl px-3 py-2 border text-xs font-semibold focus:outline-none ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                              : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                          }`}
                        />
                        <p className="text-[10px] text-slate-400 mt-1">
                          এই পাসওয়ার্ড দিয়ে আপনার অ্যাকাউন্ট সুরক্ষিত থাকবে।
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-[11px] text-teal-800 dark:text-teal-300 flex items-start gap-2">
                        <Smartphone className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                        <span>
                          নম্বর ভেরিফিকেশনের জন্য ইনস্ট্যান্ট SMS ওটিপি কোড পাঠানো হবে।
                        </span>
                      </div>

                      {otpErrorMessage && (
                        <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                          <ShieldAlert className="w-4 h-4 shrink-0" />
                          <span>{otpErrorMessage}</span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send SMS OTP (এসএমএস কোড পাঠান)</span>
                      </button>
                    </div>
                  )}

                  {/* 3. GOOGLE SIGN-IN (CLEAN & PROFESSIONAL - NO MOCK PRESETS) */}
                  {authMethod === 'google' && (
                    <div className="space-y-3">
                      <div className="text-xs text-slate-500 dark:text-teal-200">
                        আপনার গুগল অ্যাকাউন্ট ও জিমেইল দিয়ে সাইন-ইন করুন:
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-teal-200 mb-1">
                          Full Name (আপনার নাম) *
                        </label>
                        <input
                          type="text"
                          value={customGoogleName}
                          onChange={(e) => setCustomGoogleName(e.target.value)}
                          placeholder="Your Full Name..."
                          className={`w-full rounded-xl px-3 py-2 border text-xs font-semibold focus:outline-none ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900'
                              : 'bg-[#092226] border-[#184850] text-white'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-teal-200 mb-1">
                          Google Gmail Address (জিমেইল ঠিকানা) *
                        </label>
                        <input
                          type="email"
                          autoComplete="email"
                          value={customGoogleEmail}
                          onChange={(e) => setCustomGoogleEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className={`w-full rounded-xl px-3 py-2 border text-xs font-semibold focus:outline-none ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900'
                              : 'bg-[#092226] border-[#184850] text-white'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-teal-200 mb-1">
                          Account Password / PIN (গোপন পাসওয়ার্ড) *
                        </label>
                        <input
                          type="password"
                          value={inputPassword}
                          onChange={(e) => setInputPassword(e.target.value)}
                          placeholder="••••••••"
                          className={`w-full rounded-xl px-3 py-2 border text-xs font-semibold focus:outline-none ${
                            isDay
                              ? 'bg-slate-50 border-slate-300 text-slate-900'
                              : 'bg-[#092226] border-[#184850] text-white'
                          }`}
                        />
                        <p className="text-[10px] text-slate-400 mt-1">
                          শুধুমাত্র আপনি এই পাসওয়ার্ড দিয়ে আপনার অ্যাকাউন্টে প্রবেশ করতে পারবেন।
                        </p>
                      </div>

                      {otpErrorMessage && (
                        <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                          <ShieldAlert className="w-4 h-4 shrink-0" />
                          <span>{otpErrorMessage}</span>
                        </div>
                      )}

                      <button
                        type="button"
                        disabled={!customGoogleEmail.trim() || !customGoogleName.trim() || !inputPassword.trim()}
                        onClick={() => {
                          handleGoogleSignIn({
                            name: customGoogleName.trim(),
                            emailOrPhone: customGoogleEmail.trim().toLowerCase(),
                            photoUrl: DEFAULT_AVATARS[0],
                            password: inputPassword.trim(),
                          });
                        }}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                      >
                        <GoogleIcon />
                        <span>Continue with Google &amp; Cloud Sync</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: 6-DIGIT OTP VERIFICATION ENTRY */}
              {verificationStep === 'otp' && (
                <div className="space-y-4 animate-in fade-in">
                  {/* Interactive Push Banner for effortless code viewing and auto-fill */}
                  {showOtpNotification && generatedOtpCode && (
                    <div
                      onClick={handleAutoFillOtp}
                      className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg border border-emerald-400/50 cursor-pointer active:scale-95 transition space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold opacity-90">
                        <span className="flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5" />
                          <span>{authMethod === 'email' ? 'Security Email OTP' : 'Security SMS OTP'}</span>
                        </span>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Tap to Auto-fill</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-mono font-black tracking-widest bg-black/20 px-2.5 py-1 rounded-xl">
                          {generatedOtpCode}
                        </span>
                        <span className="text-[11px] underline font-bold">Auto Fill (স্বয়ংক্রিয় পূরণ) →</span>
                      </div>
                    </div>
                  )}

                  {/* Target announcement */}
                  <div className="text-center space-y-1">
                    <p className="text-xs text-slate-500 dark:text-teal-200">
                      নিচের ঠিকানায় প্রেরিত ৬-সংখ্যার কোডটি প্রবেশ করান:
                    </p>
                    <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {authMethod === 'email'
                        ? inputEmail
                        : `${selectedCountryCode} ${inputPhone}`}
                    </p>
                  </div>

                  {/* 6 Digit Inputs */}
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
                        className={`w-11 h-12 text-center text-lg font-mono font-black rounded-2xl border transition focus:outline-none ${
                          otpDigits[idx]
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                            : isDay
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                            : 'bg-[#092226] border-[#184850] text-white focus:border-emerald-500'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Error display */}
                  {otpErrorMessage && (
                    <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{otpErrorMessage}</span>
                    </div>
                  )}

                  {/* Countdown Timer & Resend */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-teal-300/80 pt-1">
                    <span>
                      {otpCountdown > 0 ? (
                        <span className="font-mono font-semibold">
                          কোডের মেয়াদ: 00:{otpCountdown < 10 ? `0${otpCountdown}` : otpCountdown}
                        </span>
                      ) : (
                        <span className="text-amber-500 font-bold">কোডের মেয়াদ শেষ</span>
                      )}
                    </span>

                    <button
                      type="button"
                      disabled={otpCountdown > 0}
                      onClick={handleSendOtp}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed hover:underline cursor-pointer"
                    >
                      Resend Code (পুনরায় পাঠান)
                    </button>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setVerificationStep('input')}
                      className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-teal-900/60 font-bold text-xs hover:bg-slate-100 dark:hover:bg-teal-900/30 transition cursor-pointer"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      disabled={isVerifying || otpDigits.join('').length < 6}
                      onClick={handleConfirmOtp}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Verify &amp; Restore History (যাচাই করুন)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SUCCESS CELEBRATION & CLOUD RESTORE */}
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
