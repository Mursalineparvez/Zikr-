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
} from 'lucide-react';
import { UserProfile, ThemeMode, ZikrLanguage, NavModule } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import { findSavedAccount, saveAccountToRegistry, GOOGLE_DEMO_ACCOUNTS } from '../utils/accountRegistry';

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
  selectedLanguage: ZikrLanguage;
  soundEnabled: boolean;
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
  selectedLanguage,
  soundEnabled,
}) => {
  const isDay = themeMode === 'day';

  // Sub-modals / views
  const [activeSubModal, setActiveSubModal] = useState<
    'none' | 'edit_profile' | 'google_auth' | 'feedback' | 'bookmarks' | 'downloads' | 'logout_confirm'
  >('none');

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
    setEditLocation(userProfile.location || '4C2J 8FX, BD');
    setEditDeviceModel(userProfile.deviceModel || detected.model);
    setEditOsVersion(userProfile.osVersion || detected.osVersion);

    if (userProfile.emailOrPhone) {
      setFeedbackUserEmail(userProfile.emailOrPhone);
    }
    setFeedbackLocation(userProfile.location || '4C2J 8FX, BD');
    setFeedbackModel(userProfile.deviceModel || detected.model);
    setFeedbackOsVersion(userProfile.osVersion || detected.osVersion);
  }, [userProfile]);

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

  // Handle instant Google Sign In
  const handleGoogleSignIn = (account: { name: string; emailOrPhone: string; photoUrl: string }) => {
    const existing = findSavedAccount(account.emailOrPhone);
    const updated: UserProfile = {
      ...userProfile,
      name: account.name,
      emailOrPhone: account.emailOrPhone,
      photoUrl: account.photoUrl || (existing?.photoUrl ?? DEFAULT_AVATARS[0]),
      location: existing?.location || userProfile.location || '4C2J 8FX, BD',
      deviceModel: existing?.deviceModel || userProfile.deviceModel || 'vivo ~~ V2144',
      osVersion: existing?.osVersion || userProfile.osVersion || '35_15',
      isSignedIn: true,
      isVerified: true,
      authProvider: 'google',
    };
    saveAccountToRegistry(updated);
    onUpdateProfile(updated);
    setActiveSubModal('none');
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
            <h2 className="text-lg font-bold tracking-tight">Profile</h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition active:scale-95 cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. BODY CONTENT (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* USER PROFILE CARD (Conditional: Signed in vs Sign in prompt) */}
          {userProfile.isSignedIn && userProfile.name ? (
            <div
              className={`p-4 rounded-2xl border shadow-md transition-all flex items-center justify-between gap-3 ${
                isDay ? 'bg-white border-slate-200' : 'bg-[#0f343c] border-[#1c5763]'
              }`}
            >
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
                  </div>
                  <p className="text-xs text-slate-500 dark:text-teal-300/80 truncate font-mono">
                    {userProfile.emailOrPhone || 'Verified ZikrMate User'}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 fill-emerald-500/20" />
                    <span>ZikrMate Verified</span>
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
          ) : (
            <div
              className={`p-4 rounded-2xl border shadow-md transition-all space-y-3 ${
                isDay
                  ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'
                  : 'bg-gradient-to-r from-[#09282f] to-[#0e3b45] border-[#1f5e6b]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
                  <User className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm leading-snug text-slate-900 dark:text-white">
                    Sign In to ZikrMate (অ্যাকাউন্ট লগইন)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-teal-200/80">
                    ডাটা সেভ ও ভেরিফায়েড প্রোফাইল পেতে লগইন করুন
                  </p>
                </div>
              </div>

              {/* Action Buttons: Google vs Email/Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSubModal('google_auth');
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-sm flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                >
                  <GoogleIcon />
                  <span>Sign In with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveSubModal('edit_profile');
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Email / Phone Sign In</span>
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

        {/* ----------------- SUB-MODAL: GOOGLE AUTH CHOOSER ----------------- */}
        {activeSubModal === 'google_auth' && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div
              className={`w-full max-w-sm rounded-3xl border p-5 shadow-2xl space-y-4 ${
                isDay ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0f343c] text-white border-[#1c5763]'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-teal-900/40">
                <div className="flex items-center gap-2">
                  <GoogleIcon />
                  <h3 className="font-bold text-sm">Sign In with Google</h3>
                </div>
                <button
                  onClick={() => setActiveSubModal('none')}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-teal-900/40"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-500 dark:text-teal-200">
                Choose an account to continue to <strong>ZikrMate</strong>:
              </div>

              {/* Demo / Saved Google Accounts */}
              <div className="space-y-2">
                {GOOGLE_DEMO_ACCOUNTS.map((acc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleGoogleSignIn(acc)}
                    className={`w-full p-2.5 rounded-2xl border flex items-center gap-3 transition active:scale-95 text-left cursor-pointer ${
                      isDay
                        ? 'bg-slate-50 hover:bg-emerald-50/70 border-slate-200'
                        : 'bg-[#092226] hover:bg-teal-900/60 border-[#184850]'
                    }`}
                  >
                    <img
                      src={acc.photoUrl}
                      alt={acc.name}
                      className="w-9 h-9 rounded-full object-cover border border-emerald-400 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs truncate">{acc.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono truncate">{acc.emailOrPhone}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Google Account Input */}
              <div className="pt-2 border-t border-slate-100 dark:border-teal-900/40 space-y-2">
                <div className="text-[11px] font-bold text-slate-500 dark:text-teal-300">
                  Or enter your Google Account:
                </div>
                <input
                  type="text"
                  placeholder="Your Full Name..."
                  value={customGoogleName}
                  onChange={(e) => setCustomGoogleName(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 border text-xs focus:outline-none ${
                    isDay
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-[#092226] border-[#184850] text-white'
                  }`}
                />
                <input
                  type="email"
                  placeholder="yourname@gmail.com..."
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 border text-xs focus:outline-none ${
                    isDay
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-[#092226] border-[#184850] text-white'
                  }`}
                />
                <button
                  type="button"
                  disabled={!customGoogleEmail.trim() || !customGoogleName.trim()}
                  onClick={() => {
                    handleGoogleSignIn({
                      name: customGoogleName.trim(),
                      emailOrPhone: customGoogleEmail.trim(),
                      photoUrl: DEFAULT_AVATARS[0],
                    });
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer"
                >
                  Confirm Google Sign In
                </button>
              </div>
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
      </div>
    </div>
  );
};
