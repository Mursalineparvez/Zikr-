import React, { useState } from 'react';
import {
  Smartphone,
  Download,
  Share2,
  CheckCircle2,
  X,
  ExternalLink,
  Laptop,
  Check,
  Sparkles,
  ShieldCheck,
  FileCode,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { ZikrLanguage } from '../types';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDay?: boolean;
  selectedLanguage?: ZikrLanguage;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  isDay = false,
  selectedLanguage = 'bn',
}) => {
  const isBn = selectedLanguage === 'bn';
  const { isInstallable, isInstalled, isIOS, isAndroid, isDesktop, install } = usePWAInstall();
  const [isInstalling, setIsInstalling] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    setIsInstalling(true);
    const success = await install();
    setIsInstalling(false);
    if (success) {
      setSuccessMessage(
        isBn
          ? 'অভিনন্দন! Zikr+ অ্যাপটি আপনার ডিভাইসে সফলভাবে ইনস্টল হয়েছে!'
          : 'Congratulations! Zikr+ has been successfully installed on your device!'
      );
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#006747', '#10b981', '#f59e0b', '#34d399'],
        });
      } catch {}
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-all ${
          isDay
            ? 'bg-gradient-to-b from-white via-emerald-50/40 to-slate-50 text-slate-900 border-emerald-300 shadow-emerald-950/20'
            : 'bg-gradient-to-b from-[#0a252b] via-[#081f24] to-[#041216] text-white border-[#1c5561] shadow-black/80'
        }`}
      >
        {/* Header Bar */}
        <div
          className={`px-5 py-4 flex items-center justify-between border-b ${
            isDay ? 'border-emerald-200 bg-emerald-100/50' : 'border-[#174650] bg-[#0c2f37]'
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src="/pwa-192x192.png"
              alt="Zikr+ Logo"
              className="w-10 h-10 rounded-2xl shadow-md border border-white/20 object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/icon.svg';
              }}
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-extrabold tracking-tight">
                  {isBn ? 'Zikr+ অ্যাপ ইনস্টল' : 'Install Zikr+ App'}
                </h3>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                  PWA App
                </span>
              </div>
              <p className={`text-[11px] ${isDay ? 'text-slate-600' : 'text-teal-200/80'}`}>
                {isBn ? 'ইন্টারনেট ছাড়া দ্রুততম ফুল-স্ক্রিন মোড' : 'Fastest full-screen mode even offline'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition cursor-pointer ${
              isDay
                ? 'hover:bg-slate-200 text-slate-700'
                : 'hover:bg-white/10 text-slate-300'
            }`}
            title={isBn ? 'বন্ধ করুন' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 space-y-4 overflow-y-auto scrollbar-thin">
          {/* Status Banner */}
          {successMessage ? (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-600 dark:text-emerald-300 flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5 text-emerald-500" />
              <div>
                <h4 className="text-sm font-bold">{isBn ? 'ইনস্টলেশন সফল!' : 'Installation Complete!'}</h4>
                <p className="text-xs mt-0.5 opacity-90">{successMessage}</p>
                <p className="text-[11px] mt-1 text-emerald-700 dark:text-emerald-200">
                  {isBn
                    ? 'এখন আপনার ফোনের হোম স্ক্রিনে Zikr+ অ্যাপ আইকন দেখতে পাবেন। ডাটা অফ রেখেই চালাতে পারবেন।'
                    : 'You will now find the Zikr+ app icon on your home screen. It works seamlessly offline.'}
                </p>
              </div>
            </div>
          ) : isInstalled ? (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 shrink-0 text-emerald-500" />
              <div>
                <h4 className="text-sm font-bold">
                  {isBn ? 'অ্যাপটি ইতিপূর্বেই ইনস্টল করা আছে ✓' : 'App Already Installed ✓'}
                </h4>
                <p className="text-xs opacity-90">
                  {isBn
                    ? 'হোম স্ক্রিন থেকে ওপেন করলে এটি ফুলস্ক্রিনে সম্পূর্ণ অফলাইনে চলবে।'
                    : 'Opening from your home screen launches full-screen offline mode.'}
                </p>
              </div>
            </div>
          ) : null}

          {/* 1-Click Native Install Button (if browser fired prompt) */}
          {isInstallable && !isInstalled && !successMessage && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-100 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isBn ? 'সরাসরি ইনস্টল প্রস্তুত' : 'Ready for Direct Install'}</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20">
                  1-Click
                </span>
              </div>
              <p className="text-xs text-emerald-50 leading-relaxed">
                {isBn
                  ? 'আপনার ব্রাউজার সরাসরি ইনস্টল সাপোর্ট করছে। নিচের বাটনে চাপ দিন:'
                  : 'Your browser supports direct one-click installation. Tap below:'}
              </p>
              <button
                type="button"
                onClick={handleNativeInstall}
                disabled={isInstalling}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-black text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                <span>
                  {isInstalling
                    ? (isBn ? 'ইনস্টল হচ্ছে...' : 'Installing...')
                    : (isBn ? 'এখনই ফোনে ইনস্টল করুন (Install Now)' : 'Install App Now')}
                </span>
              </button>
            </div>
          )}

          {/* Device-Specific Visual Installation Instructions */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDay ? 'text-slate-700' : 'text-emerald-300'}`}>
              {isBn ? 'সহজ ইনস্টলেশন নির্দেশিকা (Device Instructions):' : 'Device Installation Instructions:'}
            </h4>

            {/* Android Chrome / Brave / Edge */}
            {(isAndroid || (!isIOS && !isDesktop) || isInstallable === false) && (
              <div
                className={`p-3.5 rounded-2xl border transition space-y-2.5 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0f343c]/80 border-[#1c5763]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-600 dark:text-emerald-400">
                    <Smartphone className="w-4 h-4" />
                    <span>{isBn ? 'Android (Chrome / Samsung / Brave ব্রাউজার):' : 'Android (Chrome / Samsung / Brave Browser):'}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
                    {isBn ? 'আসল WebAPK অ্যাপ' : 'Native WebAPK'}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-[11px] leading-relaxed text-emerald-800 dark:text-emerald-200">
                  {isBn ? (
                    <>💡 <strong>APK ডাউনলোড সংক্রান্ত তথ্য:</strong> আলাদা কোনো APK ফাইল খোঁজার প্রয়োজন নেই। Chrome থেকে সরাসরি ইনস্টল করলেই এটি ফোনে আসল ফুলস্ক্রিন অ্যাপ তৈরি করে দেয়:</>
                  ) : (
                    <>💡 <strong>About APK downloads:</strong> No separate APK file is needed. Installing directly from Chrome creates a full native-style app on your device:</>
                  )}
                </div>

                <ol className="text-xs space-y-1.5 pl-4 list-decimal marker:text-emerald-500 leading-relaxed text-slate-700 dark:text-slate-200">
                  {isBn ? (
                    <>
                      <li>ব্রাউজারের উপরে বা নিচে ডানদিকের <strong>৩টি ডট (⋮ মেনু)</strong> বাটনে ট্যাপ করুন।</li>
                      <li>মেনু তালিকা থেকে <strong>"Install app"</strong> অথবা <strong>"Add to Home screen" (হোম স্ক্রিনে যোগ করুন)</strong> চাপুন।</li>
                      <li><strong>"Install"</strong> নিশ্চিত করুন। কয়েক সেকেন্ডে ফোনের মূল অ্যাপ লিস্টে ও হোম স্ক্রিনে Zikr+ অ্যাপ তৈরি হয়ে যাবে!</li>
                    </>
                  ) : (
                    <>
                      <li>Tap the <strong>3-dot menu (⋮)</strong> at the top-right or bottom-right of your browser.</li>
                      <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong> from the menu.</li>
                      <li>Confirm <strong>"Install"</strong>. Within seconds Zikr+ will appear in your app drawer and home screen!</li>
                    </>
                  )}
                </ol>
              </div>
            )}

            {/* iOS Safari (iPhone / iPad) */}
            {isIOS && (
              <div
                className={`p-3.5 rounded-2xl border transition ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0f343c]/80 border-[#1c5763]'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-600 dark:text-emerald-400 mb-2">
                  <Share2 className="w-4 h-4" />
                  <span>{isBn ? 'iPhone / iPad (Safari ব্রাউজার):' : 'iPhone / iPad (Safari Browser):'}</span>
                </div>
                <ol className="text-xs space-y-1.5 pl-4 list-decimal marker:text-emerald-500 leading-relaxed text-slate-700 dark:text-slate-200">
                  {isBn ? (
                    <>
                      <li>সাফারি ব্রাউজারের নিচে থাকা <strong>Share (শেয়ার 📤)</strong> আইকনে চাপুন।</li>
                      <li>নিচে স্ক্রল করে <strong>"Add to Home Screen" (হোম স্ক্রিনে যোগ করুন ➕)</strong> অপশনে ট্যাপ করুন।</li>
                      <li>উপরে ডানদিকের <strong>"Add"</strong> বাটনে ক্লিক করলেই হোম স্ক্রিনে অ্যাপ যুক্ত হবে।</li>
                    </>
                  ) : (
                    <>
                      <li>Tap the <strong>Share (📤)</strong> button in Safari&apos;s bottom toolbar.</li>
                      <li>Scroll down and tap <strong>&quot;Add to Home Screen&quot; (➕)</strong>.</li>
                      <li>Tap <strong>&quot;Add&quot;</strong> in the top-right corner to place the app on your home screen.</li>
                    </>
                  )}
                </ol>
              </div>
            )}

            {/* Desktop / Laptop */}
            {isDesktop && (
              <div
                className={`p-3.5 rounded-2xl border transition ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0f343c]/80 border-[#1c5763]'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-600 dark:text-emerald-400 mb-2">
                  <Laptop className="w-4 h-4" />
                  <span>{isBn ? 'কম্পিউটার বা ল্যাপটপ (Chrome / Edge):' : 'Desktop / Laptop (Chrome / Edge):'}</span>
                </div>
                <ol className="text-xs space-y-1.5 pl-4 list-decimal marker:text-emerald-500 leading-relaxed text-slate-700 dark:text-slate-200">
                  {isBn ? (
                    <>
                      <li>ব্রাউজারের অ্যাড্রেস বারের (URL bar) একদম ডানপাশে থাকা <strong>ইনস্টল আইকন (⊕ বা মনিটর)</strong> ক্লিক করুন।</li>
                      <li>অথবা ব্রাউজারের ৩টি ডট (⋮) মেনু থেকে <strong>"Save and share" → "Install Zikr+"</strong> সিলেক্ট করুন।</li>
                    </>
                  ) : (
                    <>
                      <li>Click the <strong>Install icon (⊕)</strong> on the right side of your browser&apos;s address bar.</li>
                      <li>Or open the 3-dot (⋮) menu and choose <strong>&quot;Save and share&quot; → &quot;Install Zikr+&quot;</strong>.</li>
                    </>
                  )}
                </ol>
              </div>
            )}
          </div>

          {/* In-App Browser Fallback & URL Copy */}
          <div
            className={`p-3 rounded-2xl border text-xs space-y-2 ${
              isDay ? 'bg-amber-50/80 border-amber-200 text-amber-900' : 'bg-amber-950/20 border-amber-800/40 text-amber-200'
            }`}
          >
            <p className="leading-relaxed">
              {isBn ? (
                <>💡 আপনি যদি ফেসবুক, মেসেঞ্জার বা হোয়াটসঅ্যাপের ইন-অ্যাপ ব্রাউজারে থাকেন, তবে মূল <strong>Chrome বা Safari</strong> ব্রাউজারে লিংকটি ওপেন করুন:</>
              ) : (
                <>💡 If you opened this inside Facebook, Messenger, or WhatsApp&apos;s in-app browser, copy the link and open it in <strong>Chrome or Safari</strong>:</>
              )}
            </p>
            <button
              type="button"
              onClick={handleCopyLink}
              className={`w-full py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                isDay
                  ? 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-950'
                  : 'bg-amber-900/40 hover:bg-amber-800/50 border-amber-700 text-amber-100'
              }`}
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                  <span>{isBn ? 'লিংক কপি হয়েছে! এবার Chrome এ পেস্ট করুন' : 'Link copied! Paste in Chrome or Safari'}</span>
                </>
              ) : (
                <>
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{isBn ? 'ওয়েবসাইট লিংক কপি করুন (Copy App Link)' : 'Copy App Link'}</span>
                </>
              )}
            </button>
          </div>

          {/* 100% Offline Standalone File Alternative */}
          <div
            className={`p-3.5 rounded-2xl border space-y-2 ${
              isDay ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-[#06181d] border-[#16414a] text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <FileCode className="w-4 h-4" />
                <span>{isBn ? 'সম্পূর্ণ অফলাইন স্ট্যান্ডঅ্যালোন ফাইল (.html)' : '100% Offline Standalone File (.html)'}</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500">
                100% Offline
              </span>
            </div>
            <p className="text-[11px] opacity-80 leading-relaxed">
              {isBn
                ? 'কোনো ব্রাউজার বা ইন্টারনেট ঝামেলা ছাড়াই সরাসরি ফোনে অফলাইন ফাইল সংরক্ষণ করতে চান? নিচের বাটনে চাপ দিন:'
                : 'Want to save an offline HTML file directly on your phone without relying on browser cache?'}
            </p>
            <a
              href="/zikr-tasbeeh-standalone.html"
              download="ZikrPlus-Offline.html"
              className={`w-full py-2.5 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer text-center ${
                isDay
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-800 shadow-sm'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-sm'
              }`}
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{isBn ? 'অফলাইন HTML ফাইল ডাউনলোড করুন (Download HTML)' : 'Download Offline HTML File'}</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-5 py-3 border-t flex items-center justify-end ${
            isDay ? 'border-slate-200 bg-slate-50' : 'border-[#15414a] bg-[#072127]'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer"
          >
            {isBn ? 'ঠিক আছে (Close)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
