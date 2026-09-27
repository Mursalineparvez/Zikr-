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
    'none' | 'edit_profile' | 'feedback' | 'bookmarks' | 'downloads' | 'logout_confirm'
  >('none');

  // Edit Profile Form State
  const [editName, setEditName] = useState(userProfile.name);
  const [editEmailOrPhone, setEditEmailOrPhone] = useState(userProfile.emailOrPhone);
  const [editPhotoUrl, setEditPhotoUrl] = useState(userProfile.photoUrl);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Feedback Form State
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackChannel, setFeedbackChannel] = useState<'whatsapp' | 'email'>('whatsapp');

  useEffect(() => {
    setEditName(userProfile.name);
    setEditEmailOrPhone(userProfile.emailOrPhone);
    setEditPhotoUrl(userProfile.photoUrl);
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

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      name: editName.trim() || 'User',
      emailOrPhone: editEmailOrPhone.trim() || 'mdmursalineparvez@gmail.com',
      photoUrl: editPhotoUrl,
    });
    setActiveSubModal('none');
    if (soundEnabled) soundHaptics.playMilestone();
  };

  // Generate WhatsApp / Email payload formatted exactly as requested
  const buildFeedbackText = (customMsg?: string) => {
    const msg = (customMsg !== undefined ? customMsg : feedbackMessage).trim() || '[আপনার মূল্যবান মতামত বা ফিডব্যাক এখানে লিখুন]';
    const emailValue = userProfile.emailOrPhone || 'mdmursalineparvez@gmail.com';
    const modelValue = userProfile.deviceModel || 'vivo ~~ V2144';
    const osValue = userProfile.osVersion || '35_15';
    const appVerValue = userProfile.appVersion || '411_38.1';
    const langValue = selectedLanguage === 'bn' ? 'Bangla' : selectedLanguage === 'en' ? 'English' : 'Bangla';
    const devLangValue = typeof navigator !== 'undefined' && navigator.language ? navigator.language.slice(0, 2) : 'en';
    const locationValue = userProfile.location || '4C2J 8FX, BD';

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
          {/* USER PROFILE CARD (Matching screenshot with white/dark card, shadow, user photo, name, email) */}
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
              </div>

              {/* Name and Email */}
              <div className="min-w-0">
                <h3 className="font-black text-sm sm:text-base truncate leading-snug">
                  {userProfile.name || 'Md. Mursaline Parvez'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-teal-300/80 truncate font-mono">
                  {userProfile.emailOrPhone || 'mdmursalineparvez@gmail.com'}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
                  <span>Edit Account Profile</span>
                </h3>
                <button
                  onClick={() => setActiveSubModal('none')}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-teal-900/40"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

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
                    Full Name
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
                    Email / Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={editEmailOrPhone}
                    onChange={(e) => setEditEmailOrPhone(e.target.value)}
                    placeholder="e.g. mdmursalineparvez@gmail.com or phone..."
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
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-teal-900/40 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
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

              {/* Feedback Message Input */}
              <div className="space-y-1.5 text-xs">
                <label className="font-bold block text-slate-500 dark:text-teal-200">
                  Your Feedback / Message (আপনার মূল্যবান মতামত বা অভিযোগ):
                </label>
                <textarea
                  rows={4}
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
                      name: 'Muslim Guest',
                      emailOrPhone: 'guest@muslimbangla.org',
                      photoUrl: '',
                    });
                    setActiveSubModal('none');
                    onClose();
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
