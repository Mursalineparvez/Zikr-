import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Download,
  Check,
  ExternalLink,
  Smartphone,
  FileCode,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  ArrowRight,
  Info,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import confetti from 'canvas-confetti';

interface StandaloneExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandaloneExportModal: React.FC<StandaloneExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isInstallable, isInstalled, install, isAndroid } = usePWAInstall();
  const [isInstalling, setIsInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    setIsInstalling(true);
    const success = await install();
    setIsInstalling(false);
    if (success) {
      setInstallSuccess(true);
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#006747', '#10b981', '#f59e0b', '#34d399'],
        });
      } catch {}
    }
  };

  const handleDownloadHtml = () => {
    const link = document.createElement('a');
    link.href = '/zikr-tasbeeh-standalone.html';
    link.download = 'ZikrPlus-Offline.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://zikrplus.app';
  const pwaBuilderUrl = `https://www.pwabuilder.com/?url=${encodeURIComponent(currentUrl)}`;

  const node = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-3xl bg-slate-900 border border-emerald-700/50 p-5 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto my-auto text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60 hover:bg-slate-700 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Smartphone className="w-3.5 h-3.5" />
            <span>অ্যান্ড্রয়েড ইনস্টলেশন ও অফলাইন প্যাকেজ</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white">
            APK ডাউনলোড ও ইনস্টলেশন সমাধান
          </h2>
          <p className="text-xs text-emerald-200/90 mt-1 leading-relaxed">
            কেন সরাসরি থার্ড-পার্টি APK ডাউনলোডের প্রয়োজন নেই এবং কীভাবে সহজেই ফোনে আসল অ্যাপ ইনস্টল করবেন:
          </p>
        </div>

        {/* Crucial Explanation Card: Why direct APK download isn't required */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/70 to-teal-950/70 border border-emerald-600/40 text-xs space-y-2.5 mb-4">
          <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm">
            <HelpCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>"APK ডাউনলোড হয় না" — এর সহজ ও সঠিক সমাধান</span>
          </div>
          <p className="text-slate-200 leading-relaxed">
            Zikr+ একটি গুগল সার্টিফাইড <strong>PWA (Progressive Web App)</strong>। সাধারণ থার্ড-পার্টি APK ফাইল ফোনে ডাউনলোড করতে গেলে সিকিউরিটি ওয়ার্নিং বা ইন্সটল ব্লক হতে পারে।
          </p>
          <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-500/30 text-emerald-200 font-semibold space-y-1">
            <p className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Chrome ব্রাউজার থেকে সরাসরি ফোনে <strong>WebAPK</strong> হিসেবে আসল অ্যাপ তৈরি হয়।</span>
            </p>
            <p className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ফোনে কোনো ভাইরাস বা অজানা ফাইলের ঝুঁকি থাকে না এবং ডাটা অফ রেখেই চলে।</span>
            </p>
          </div>
        </div>

        {/* 1-Click Native Install (If supported by Chrome / browser) */}
        {installSuccess ? (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 shrink-0 text-emerald-400" />
            <div>
              <h4 className="font-bold text-sm">ইনস্টলেশন সফল হয়েছে!</h4>
              <p className="text-xs opacity-90 mt-0.5">
                আপনার ফোনের হোম স্ক্রিন ও অ্যাপ ড্রয়ারে Zikr+ আইকন তৈরি হয়েছে।
              </p>
            </div>
          </div>
        ) : isInstallable && !isInstalled ? (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold tracking-wider flex items-center gap-1.5 text-emerald-100">
                <Sparkles className="w-3.5 h-3.5" />
                <span>সরাসরি ১-ক্লিকে ইনস্টল রেডি</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20">
                1-Click WebAPK
              </span>
            </div>
            <p className="text-xs text-emerald-50 leading-relaxed">
              নিচের বাটনে চাপ দিলে আপনার ব্রাউজার সরাসরি ফোনে অ্যাপটি ইনস্টল করে দেবে:
            </p>
            <button
              type="button"
              onClick={handleNativeInstall}
              disabled={isInstalling}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-black text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
              <span>{isInstalling ? 'ইনস্টল হচ্ছে...' : 'এখনই ফোনে ইনস্টল করুন (Install App)'}</span>
            </button>
          </div>
        ) : isInstalled ? (
          <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 mb-4 text-xs font-semibold">
            <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>অ্যাপটি ইতিপূর্বেই আপনার ডিভাইসে সফলভাবে ইনস্টল করা আছে ✓</span>
          </div>
        ) : null}

        {/* 3-Step Simple Android Chrome Instructions */}
        <div className="bg-slate-950/80 rounded-2xl border border-emerald-800/40 p-4 sm:p-5 mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Android ফোনে ইনস্টল করার সহজ ৩ ধাপ:</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
              Chrome / Samsung
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-200">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                ১
              </span>
              <div>
                ফোনে Google Chrome ব্রাউজারের উপরে ডানদিকের <strong>৩টি ডট (⋮ মেনু)</strong> আইকনে চাপুন।
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                ২
              </span>
              <div>
                মেনু তালিকা থেকে <strong>"Install app"</strong> অথবা <strong>"Add to Home screen" (হোম স্ক্রিনে যোগ করুন)</strong> অপশনটিতে ট্যাপ করুন।
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                ৩
              </span>
              <div>
                পপআপ আসলে <strong>"Install"</strong> বাটন চাপুন। ৫ সেকেন্ডের মধ্যে আপনার ফোনের মূল অ্যাপ তালিকায় Zikr+ আইকন চলে আসবে!
              </div>
            </div>
          </div>
        </div>

        {/* Download Standalone 100% Offline Single-File HTML */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-700/60 space-y-2.5 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <FileCode className="w-4 h-4 text-teal-400" />
              <span>বিকল্প: সম্পূর্ণ অফলাইন ফাইল (.html) ডাউনলোড</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
              100% Offline File
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            যদি কোনো অ্যাপ ইনস্টল না করে সরাসরি একটি অফলাইন ফাইল ফোনে রাখতে চান, তবে নিচের বাটন থেকে এই একক ফাইলটি ডাউনলোড করে নিন। এটি ইন্টারনেট ছাড়াও যেকোনো ব্রাউজারে চালু হবে:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleDownloadHtml}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>অফলাইন ফাইল ডাউনলোড (HTML)</span>
            </button>
            <a
              href="/zikr-tasbeeh-standalone.html"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer text-center"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>নতুন ট্যাবে প্রিভিউ করুন</span>
            </a>
          </div>
        </div>

        {/* PWABuilder / WebintoApp APK Generator Link for those who need a physical .apk */}
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>শেয়ার করার জন্য সরাসরি .APK তৈরি করতে চান?</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            যদি ব্লুটুথ বা শেয়ার-ইটে অন্য কাউকে দেওয়ার জন্য ফিজিক্যাল <code className="text-amber-300">.apk</code> ফাইল তৈরি করতে চান, তবে মাইক্রোসফটের ফ্রি টুল দিয়ে ১-ক্লিকে APK জেনারেট করতে পারেন:
          </p>
          <a
            href={pwaBuilderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-emerald-200 border border-emerald-700/40 text-xs font-bold transition cursor-pointer"
          >
            <span>PWABuilder Android APK জেনারেটর খুলুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Close Button */}
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer"
          >
            বুঝেছি (Close)
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(node, document.body);
};
