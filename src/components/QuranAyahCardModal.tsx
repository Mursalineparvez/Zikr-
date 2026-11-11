import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Download,
  Share2,
  Copy,
  Check,
  Sparkles,
  Palette,
  Eye,
  ShieldCheck,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { sanitizeClonedDocForHtml2Canvas } from '../utils/html2canvasSanitizer';
import { QuranAyah } from '../utils/quranService';
import { ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';

interface QuranAyahCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  ayah: QuranAyah | null;
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  selectedLanguage: ZikrLanguage;
  soundEnabled: boolean;
}

type CardTheme = 'emerald' | 'midnight' | 'pearl' | 'amber';

export const QuranAyahCardModal: React.FC<QuranAyahCardModalProps> = ({
  isOpen,
  onClose,
  ayah,
  surahNumber,
  surahName,
  surahEnglishName,
  selectedLanguage,
  soundEnabled,
}) => {
  const [cardTheme, setCardTheme] = useState<CardTheme>(() => {
    try {
      const saved = localStorage.getItem('noor_quran_card_theme');
      if (saved && ['emerald', 'midnight', 'royal', 'parchment', 'gold'].includes(saved)) {
        return saved as CardTheme;
      }
    } catch {}
    return 'emerald';
  });

  const [showTransliteration, setShowTransliteration] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('noor_quran_show_transliteration');
      if (saved !== null) return saved === 'true';
    } catch {}
    return true;
  });

  useEffect(() => {
    try {
      localStorage.setItem('noor_quran_card_theme', cardTheme);
    } catch {}
  }, [cardTheme]);

  useEffect(() => {
    try {
      localStorage.setItem('noor_quran_show_transliteration', String(showTransliteration));
    } catch {}
  }, [showTransliteration]);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !ayah) return null;

  // High-Res PNG Download using html2canvas with scale 3 for ultra-crisp premium quality
  const handleDownloadHighResPng = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    if (soundEnabled) soundHaptics.playTap();

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // 3x high resolution for premium crispness
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        onclone: (clonedDoc) => {
          sanitizeClonedDocForHtml2Canvas(clonedDoc);
        },
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `Quran-Surah-${surahEnglishName}-Ayah-${ayah.number}-ZikrPlus.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      if (soundEnabled) soundHaptics.playMilestone();
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate high-res PNG card:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Web Share API: Launches device's native share modal showing all installed apps (WhatsApp, Messenger, Facebook, IMO, Telegram, etc.)
  const handleShareCard = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    if (soundEnabled) soundHaptics.playTap();

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        onclone: (clonedDoc) => {
          sanitizeClonedDocForHtml2Canvas(clonedDoc);
        },
      });

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/png', 1.0)
      );

      const shareTitle = `সূরা ${surahName} (${surahEnglishName}) - আয়াত ${ayah.number}`;
      const shareText = `${ayah.arabic}\n\n"${ayah.translation}"\n\n[সূরা ${surahName} (${surahEnglishName}) : আয়াত ${ayah.number}]\n- Zikr+ App (zikrplus.app)`;

      if (navigator.share) {
        if (blob) {
          const file = new File([blob], `Quran-Ayah-${surahEnglishName}-${ayah.number}.png`, {
            type: 'image/png',
          });

          // 1. Try native share with PNG image file
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                title: shareTitle,
                text: shareText,
                files: [file],
              });
              setIsGenerating(false);
              return;
            } catch (err: any) {
              if (err?.name === 'AbortError') {
                setIsGenerating(false);
                return;
              }
            }
          }
        }

        // 2. Fallback to native share with text & link
        try {
          await navigator.share({
            title: shareTitle,
            text: shareText,
            url: window.location.href || 'https://zikrplus.app',
          });
          setIsGenerating(false);
          return;
        } catch (err: any) {
          if (err?.name === 'AbortError') {
            setIsGenerating(false);
            return;
          }
        }
      }

      // 3. Fallback for desktop browsers without Web Share API
      handleDownloadHighResPng();
      handleCopyCardText();
    } catch (err) {
      console.error('Error sharing card:', err);
      handleDownloadHighResPng();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCardText = () => {
    const text = `${ayah.arabic}\n\n"${ayah.translation}"\n\n[সূরা ${surahEnglishName} (${surahName}) : আয়াত ${ayah.number}]\n- Zikr+ App (zikrplus.app)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (soundEnabled) soundHaptics.playMilestone();
    setTimeout(() => setCopied(false), 2500);
  };

  // Theme styling configurations with explicit standard HEX colors for 100% html2canvas compatibility
  const themeStyles = {
    emerald: {
      style: {
        background: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #022c22 100%)',
        color: '#ffffff',
        border: '2px solid #059669',
        boxShadow: '0 25px 50px -12px rgba(2, 44, 34, 0.8)',
      },
      accentColor: '#fde047',
      badgeBg: '#064e3b',
      badgeBorder: '#047857',
      badgeText: '#a7f3d0',
      arabicText: '#ecfdf5',
      translationText: '#f0fdf4',
      watermark: '#fde047',
    },
    midnight: {
      style: {
        background: 'linear-gradient(135deg, #090d16 0%, #101b2d 50%, #070b14 100%)',
        color: '#ffffff',
        border: '2px solid #3b82f6',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
      },
      accentColor: '#22d3ee',
      badgeBg: '#0f172a',
      badgeBorder: '#1e40af',
      badgeText: '#67e8f9',
      arabicText: '#ecfeff',
      translationText: '#f1f5f9',
      watermark: '#22d3ee',
    },
    pearl: {
      style: {
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ecfdf5 100%)',
        color: '#0f172a',
        border: '2px solid #a7f3d0',
        boxShadow: '0 25px 50px -12px rgba(4, 120, 87, 0.15)',
      },
      accentColor: '#047857',
      badgeBg: '#d1fae5',
      badgeBorder: '#34d399',
      badgeText: '#065f46',
      arabicText: '#064e3b',
      translationText: '#1e293b',
      watermark: '#047857',
    },
    amber: {
      style: {
        background: 'linear-gradient(135deg, #1c1408 0%, #2c1d0a 50%, #150f06 100%)',
        color: '#fef3c7',
        border: '2px solid #d97706',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
      },
      accentColor: '#fbbf24',
      badgeBg: '#451a03',
      badgeBorder: '#b45309',
      badgeText: '#fde68a',
      arabicText: '#fffbeb',
      translationText: '#fef3c7',
      watermark: '#fbbf24',
    },
  }[cardTheme];

  const modalNode = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-[32px] bg-slate-900 border border-emerald-600/40 p-4 sm:p-6 shadow-2xl relative max-h-[95vh] overflow-y-auto my-auto text-slate-100 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white">
                {selectedLanguage === 'bn' ? 'প্রিমিয়াম আয়াত কার্ড ও হাই-রেস ডাউনলোড' : 'Premium Ayah Card & High-Res Download'}
              </h3>
              <p className="text-[11px] text-emerald-400 font-bold">
                {selectedLanguage === 'bn' ? 'সুন্দর ডিজাইনে শেয়ার বা এইচডি পিএনজি ডাউনলোড করুন' : 'Export pristine HD PNG card with Zikr+ branding'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customization Toolbar */}
        <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Theme Selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-bold flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-emerald-400" />
              <span>থিম:</span>
            </span>
            {[
              { id: 'emerald', label: '🌿 ইমেরাড' },
              { id: 'midnight', label: '🌌 মিডনাইট' },
              { id: 'pearl', label: '🤍 পার্ল হোয়াইট' },
              { id: 'amber', label: '✨ সুফি অ্যাম্বার' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setCardTheme(t.id as CardTheme);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`px-2.5 py-1 rounded-xl font-bold transition cursor-pointer text-[11px] ${
                  cardTheme === t.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Transliteration Toggle */}
          <button
            onClick={() => {
              setShowTransliteration(!showTransliteration);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className={`px-3 py-1 rounded-xl font-bold transition cursor-pointer flex items-center gap-1 text-[11px] ${
              showTransliteration
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>উচ্চারণ: {showTransliteration ? 'চালু' : 'বন্ধ'}</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* RENDERABLE PREVIEW CARD FOR HTML2CANVAS HIGH-RES EXPORT   */}
        {/* ======================================================== */}
        <div className="flex justify-center py-2 overflow-x-auto">
          <div
            ref={cardRef}
            className="w-full max-w-[560px] p-6 sm:p-8 rounded-[32px] relative overflow-hidden flex flex-col justify-between"
            style={{
              ...themeStyles.style,
              minHeight: '380px',
            }}
          >
            {/* Background Decorative Islamic Watermark Pattern */}
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white opacity-5 pointer-events-none blur-xl" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white opacity-5 pointer-events-none blur-xl" />

            {/* Card Header: Surah Name & Ayah Number */}
            <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div className="flex items-center gap-2">
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs"
                  style={{
                    backgroundColor: themeStyles.badgeBg,
                    border: `1px solid ${themeStyles.badgeBorder}`,
                    color: themeStyles.badgeText,
                  }}
                >
                  {surahNumber}
                </span>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base tracking-wide">
                    সূরা {surahName} ({surahEnglishName})
                  </h4>
                  <p className="text-[10px] font-semibold opacity-90" style={{ color: themeStyles.accentColor }}>
                    {selectedLanguage === 'bn' ? `আয়াত নম্বর: ${ayah.number}` : `Ayah ${ayah.number}`}
                  </p>
                </div>
              </div>

              {/* Ornate Bismillah / Star Badge */}
              <div
                className="px-3 py-1 rounded-full text-[11px] font-black"
                style={{
                  backgroundColor: themeStyles.badgeBg,
                  border: `1px solid ${themeStyles.badgeBorder}`,
                  color: themeStyles.badgeText,
                }}
              >
                ✨ QURAN CARD
              </div>
            </div>

            {/* Card Body: Arabic Ayah Text */}
            <div className="py-6 text-center space-y-4">
              <div
                dir="rtl"
                className="font-arabic text-3xl sm:text-4xl md:text-[42px] font-bold leading-[2.5] tracking-wide"
                style={{
                  color: themeStyles.arabicText,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
                }}
              >
                {ayah.arabic}
              </div>

              {/* Transliteration */}
              {showTransliteration && ayah.transliteration && (
                <p className="text-xs sm:text-sm italic font-medium opacity-95 px-4" style={{ color: themeStyles.accentColor }}>
                  "{ayah.transliteration}"
                </p>
              )}

              {/* Translation */}
              <div
                className="text-sm sm:text-base font-semibold leading-relaxed px-2"
                style={{ color: themeStyles.translationText }}
              >
                "{ayah.translation}"
              </div>
            </div>

            {/* Card Footer: Zikr+ App Watermark & Link */}
            <div
              className="pt-4 flex items-center justify-between text-xs"
              style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-lg text-white font-black flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: '#10b981',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  Z+
                </div>
                <div className="leading-tight">
                  <span className="font-black tracking-wide">Zikr+ App</span>
                  <span className="block text-[9px] opacity-75">Quran, Zikr & Islamic Hub</span>
                </div>
              </div>

              <div
                className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-lg"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: themeStyles.watermark,
                }}
              >
                zikrplus.app
              </div>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        {downloadSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 flex items-center gap-2 text-xs font-bold animate-in fade-in">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>হাই-রেস প্রিমিয়াম পিএনজি সফলভাবে ডাউনলোড হয়েছে! (High-Res PNG Downloaded)</span>
          </div>
        )}

        {/* Action Buttons Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          {/* 1. Download High-Res PNG Button */}
          <button
            onClick={handleDownloadHighResPng}
            disabled={isGenerating}
            className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#006747] to-[#10b981] hover:from-[#005a3e] hover:to-[#059669] text-white font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-emerald-200 stroke-[2.5]" />
            <span>{isGenerating ? 'জেনারেট হচ্ছে...' : 'এইচডি পিএনজি ডাউনলোড'}</span>
          </button>

          {/* 2. Share Image Button */}
          <button
            onClick={handleShareCard}
            disabled={isGenerating}
            className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-emerald-500/30 text-emerald-300 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span>কার্ড শেয়ার করুন</span>
          </button>

          {/* 3. Copy Text Button */}
          <button
            onClick={handleCopyCardText}
            className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copied ? 'কপি হয়েছে!' : 'টেক্সট কপি'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalNode, document.body);
};
