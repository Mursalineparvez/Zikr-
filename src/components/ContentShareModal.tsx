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
  FileText,
  Printer,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { sanitizeClonedDocForHtml2Canvas } from '../utils/html2canvasSanitizer';
import { ZikrLanguage, ThemeMode } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import {
  ShareableContent,
  formatShareablePlainText,
  downloadTextDocument,
  printDocumentViaHiddenIframe,
  sanitizeFileName,
} from '../utils/shareDownload';

type CardTheme = 'emerald' | 'midnight' | 'pearl' | 'amber';

interface ContentShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ShareableContent | null;
  selectedLanguage: ZikrLanguage;
  soundEnabled?: boolean;
  initialFocus?: 'share' | 'download';
}

export const ContentShareModal: React.FC<ContentShareModalProps> = ({
  isOpen,
  onClose,
  content,
  selectedLanguage,
  soundEnabled = true,
  initialFocus = 'share',
}) => {
  const [cardTheme, setCardTheme] = useState<CardTheme>(() => {
    try {
      const saved = localStorage.getItem('noor_content_share_theme');
      if (saved && ['emerald', 'midnight', 'pearl', 'amber'].includes(saved)) {
        return saved as CardTheme;
      }
    } catch {}
    return 'emerald';
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('noor_content_share_theme', cardTheme);
    } catch {}
  }, [cardTheme]);

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

  if (!isOpen || !content) return null;

  const isBn = selectedLanguage === 'bn';
  const isAr = selectedLanguage === 'ar';

  const notifyStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3200);
  };

  const getFileBase = () => {
    const prefix = content.fileNamePrefix ? `${content.fileNamePrefix}-` : '';
    return sanitizeFileName(prefix + content.title);
  };

  const handleDownloadPng = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    if (soundEnabled) soundHaptics.playTap();
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        onclone: (clonedDoc) => {
          sanitizeClonedDocForHtml2Canvas(clonedDoc);
        },
      });
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${getFileBase()}-ZikrPlus.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (soundEnabled) soundHaptics.playMilestone();
      notifyStatus(
        isBn
          ? 'হাই-রেস কার্ড (PNG) ডাউনলোড হয়েছে!'
          : isAr
            ? 'تم تحميل البطاقة (PNG) بنجاح!'
            : 'High-Res PNG Card downloaded!'
      );
    } catch (err) {
      console.error('PNG generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = async () => {
    const fullText = formatShareablePlainText(content, selectedLanguage);
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      if (soundEnabled) soundHaptics.playMilestone();
      notifyStatus(
        isBn
          ? 'সম্পূর্ণ লেখা ক্লিপবোর্ডে কপি হয়েছে!'
          : isAr
            ? 'تم نسخ النص بالكامل!'
            : 'Full text copied to clipboard!'
      );
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadTxt = () => {
    if (soundEnabled) soundHaptics.playMilestone();
    downloadTextDocument(content, selectedLanguage);
    notifyStatus(
      isBn
        ? 'সম্পূর্ণ ডকুমেন্ট (TXT) ডাউনলোড হয়েছে!'
        : isAr
          ? 'تم تحميل المستند (TXT) بنجاح!'
          : 'Full document (TXT) downloaded!'
    );
  };

  const handlePrintPdf = () => {
    if (soundEnabled) soundHaptics.playTap();
    printDocumentViaHiddenIframe(content, selectedLanguage);
    notifyStatus(
      isBn
        ? 'প্রিন্ট / Save as PDF উইন্ডো চালু হয়েছে'
        : isAr
          ? 'تم فتح نافذة الطباعة / PDF'
          : 'Print / Save as PDF dialog opened'
    );
  };

  const handleNativeShare = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    if (soundEnabled) soundHaptics.playTap();

    const shareText = formatShareablePlainText(content, selectedLanguage);
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

      if (navigator.share) {
        if (blob) {
          const file = new File([blob], `${getFileBase()}-ZikrPlus.png`, {
            type: 'image/png',
          });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                title: content.title,
                text: shareText,
                files: [file],
              });
              setIsGenerating(false);
              return;
            } catch (err: unknown) {
              if ((err as { name?: string })?.name === 'AbortError') {
                setIsGenerating(false);
                return;
              }
            }
          }
        }

        try {
          await navigator.share({
            title: content.title,
            text: shareText,
            url: window.location.href || 'https://zikrplus.app',
          });
          setIsGenerating(false);
          return;
        } catch (err: unknown) {
          if ((err as { name?: string })?.name === 'AbortError') {
            setIsGenerating(false);
            return;
          }
        }
      }

      // Desktop fallback: download PNG + copy full text
      await handleDownloadPng();
      await handleCopyText();
    } catch (err) {
      console.error('Native share fallback error:', err);
      await handleCopyText();
    } finally {
      setIsGenerating(false);
    }
  };

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
      bodyText: '#f0fdf4',
      cardSurface: 'rgba(255, 255, 255, 0.07)',
      cardBorder: 'rgba(255, 255, 255, 0.14)',
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
      bodyText: '#f1f5f9',
      cardSurface: 'rgba(255, 255, 255, 0.06)',
      cardBorder: 'rgba(148, 163, 184, 0.2)',
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
      bodyText: '#1e293b',
      cardSurface: 'rgba(4, 120, 87, 0.06)',
      cardBorder: 'rgba(4, 120, 87, 0.18)',
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
      bodyText: '#fef3c7',
      cardSurface: 'rgba(251, 191, 36, 0.08)',
      cardBorder: 'rgba(217, 119, 6, 0.3)',
      watermark: '#fbbf24',
    },
  }[cardTheme];

  const isLongContent = (content.fullDocumentText?.length || content.body.length) > 650;
  const cardBodyPreview =
    content.body.length > 620 ? `${content.body.slice(0, 620).trim()}...` : content.body;

  const modalNode = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-[28px] bg-slate-900 border border-emerald-600/40 p-4 sm:p-6 shadow-2xl relative max-h-[95vh] overflow-y-auto my-auto text-slate-100 flex flex-col gap-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              {initialFocus === 'download' ? (
                <Download className="w-5 h-5" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white">
                {isBn
                  ? initialFocus === 'download'
                    ? 'ডাউনলোড ও সেভ সেন্টার'
                    : 'শেয়ার ও ডাউনলোড স্টুডিও'
                  : isAr
                    ? 'مشاركة وتحميل المحتوى'
                    : initialFocus === 'download'
                      ? 'Download & Save Center'
                      : 'Share & Download Studio'}
              </h3>
              <p className="text-[11px] text-emerald-400 font-bold">
                {isBn
                  ? 'যেকোনো মাধ্যমে শেয়ার করুন অথবা PNG কার্ড, TXT ডকুমেন্ট ও PDF সেভ করুন'
                  : isAr
                    ? 'شارك عبر التطبيقات أو احفظ كصورة PNG أو ملف TXT أو PDF'
                    : 'Share directly or export as HD PNG card, full TXT document, or PDF'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Theme Toolbar */}
        <div className="bg-slate-950/80 rounded-2xl p-2.5 sm:p-3 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-bold flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isBn ? 'কার্ড থিম:' : isAr ? 'المظهر:' : 'Theme:'}</span>
            </span>
            {[
              { id: 'emerald', label: isBn ? 'ইমেরাল্ড' : isAr ? 'زمردي' : 'Emerald' },
              { id: 'midnight', label: isBn ? 'মিডনাইট' : isAr ? 'ليلي' : 'Midnight' },
              { id: 'pearl', label: isBn ? 'পার্ল' : isAr ? 'لؤلؤي' : 'Pearl' },
              { id: 'amber', label: isBn ? 'অ্যাম্বার' : isAr ? 'كهرماني' : 'Amber' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
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

          {isLongContent && (
            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg">
              {isBn
                ? 'সম্পূর্ণ বিবরণ TXT ও PDF-এ সেভ হবে'
                : isAr
                  ? 'النص الكامل يُحفظ في TXT و PDF'
                  : 'Full text saved in TXT & PDF'}
            </span>
          )}
        </div>

        {/* High-Res Exportable Card */}
        <div className="flex justify-center py-1 overflow-x-auto">
          <div
            ref={cardRef}
            className="w-full max-w-[560px] p-5 sm:p-7 rounded-[28px] relative overflow-hidden flex flex-col justify-between gap-4"
            style={{
              ...themeStyles.style,
              minHeight: '300px',
            }}
          >
            {/* Card Header */}
            <div
              className="flex items-start justify-between gap-3 pb-3.5"
              style={{ borderBottom: `1px solid ${themeStyles.cardBorder}` }}
            >
              <div className="space-y-1 min-w-0">
                {content.badge && (
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide"
                    style={{
                      backgroundColor: themeStyles.badgeBg,
                      border: `1px solid ${themeStyles.badgeBorder}`,
                      color: themeStyles.badgeText,
                    }}
                  >
                    {content.badge}
                  </span>
                )}
                <h4 className="font-black text-lg sm:text-xl leading-snug tracking-tight">
                  {content.title}
                </h4>
                {content.subtitle && (
                  <p
                    className="text-xs font-bold leading-snug"
                    style={{ color: themeStyles.accentColor }}
                  >
                    {content.subtitle}
                  </p>
                )}
              </div>

              <div
                className="shrink-0 w-8 h-8 rounded-xl font-black flex items-center justify-center text-xs"
                style={{
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                }}
              >
                Z+
              </div>
            </div>

            {/* Meta Grid */}
            {content.meta && content.meta.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {content.meta.slice(0, 4).map((m, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl px-3 py-2 text-xs"
                    style={{
                      backgroundColor: themeStyles.cardSurface,
                      border: `1px solid ${themeStyles.cardBorder}`,
                    }}
                  >
                    <span
                      className="block text-[9px] font-black uppercase tracking-wider opacity-80"
                      style={{ color: themeStyles.accentColor }}
                    >
                      {m.label}
                    </span>
                    <span
                      className="font-bold text-[11px] leading-snug block mt-0.5"
                      style={{ color: themeStyles.bodyText }}
                    >
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Arabic Block */}
            {content.arabic && (
              <div
                dir="rtl"
                className="rounded-2xl p-4 text-center font-arabic text-2xl sm:text-3xl font-bold leading-[2.2]"
                style={{
                  backgroundColor: themeStyles.cardSurface,
                  border: `1px solid ${themeStyles.cardBorder}`,
                  color: themeStyles.arabicText,
                }}
              >
                {content.arabic}
              </div>
            )}

            {/* Transliteration */}
            {content.transliteration && (
              <p
                className="text-xs italic font-medium leading-relaxed px-1"
                style={{ color: themeStyles.accentColor }}
              >
                {content.transliteration}
              </p>
            )}

            {/* Main Body */}
            <div
              className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line"
              style={{ color: themeStyles.bodyText }}
            >
              {cardBodyPreview}
            </div>

            {/* Highlights */}
            {content.highlights && content.highlights.length > 0 && (
              <div
                className="rounded-2xl p-3 space-y-1.5"
                style={{
                  backgroundColor: themeStyles.cardSurface,
                  border: `1px solid ${themeStyles.cardBorder}`,
                }}
              >
                {content.highlights.slice(0, 3).map((h, i) => (
                  <p
                    key={i}
                    className="text-[11px] font-semibold leading-snug flex items-start gap-1.5"
                    style={{ color: themeStyles.bodyText }}
                  >
                    <span style={{ color: themeStyles.accentColor }}>•</span>
                    <span>{h}</span>
                  </p>
                ))}
              </div>
            )}

            {/* Reference */}
            {content.reference && (
              <div
                className="text-[10px] font-bold px-3 py-1.5 rounded-xl"
                style={{
                  backgroundColor: themeStyles.cardSurface,
                  color: themeStyles.accentColor,
                }}
              >
                {isBn ? 'সূত্র:' : isAr ? 'المصدر:' : 'Ref:'} {content.reference}
              </div>
            )}

            {/* Card Footer */}
            <div
              className="pt-3 flex items-center justify-between text-[11px]"
              style={{ borderTop: `1px solid ${themeStyles.cardBorder}` }}
            >
              <span className="font-extrabold tracking-wide">
                Zikr+ Islamic Knowledge Hub
              </span>
              <span
                className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: themeStyles.cardSurface,
                  color: themeStyles.watermark,
                }}
              >
                zikrplus.app
              </span>
            </div>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/60 text-emerald-300 flex items-center gap-2 text-xs font-bold animate-in fade-in">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Action Grid: Share + Downloads + Print/PDF + Copy */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {/* 1. Native Share */}
          <button
            type="button"
            onClick={handleNativeShare}
            disabled={isGenerating}
            className={`py-2.5 px-3 rounded-2xl font-black text-xs shadow-lg flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer disabled:opacity-50 ${
              initialFocus === 'share'
                ? 'bg-gradient-to-r from-[#006747] to-[#10b981] text-white col-span-2 sm:col-span-1'
                : 'bg-slate-800 hover:bg-slate-700 border border-emerald-500/40 text-emerald-300'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>
              {isGenerating
                ? isBn
                  ? 'প্রস্তুত হচ্ছে...'
                  : 'Preparing...'
                : isBn
                  ? 'শেয়ার করুন'
                  : isAr
                    ? 'مشاركة'
                    : 'Share Now'}
            </span>
          </button>

          {/* 2. Download PNG Card */}
          <button
            type="button"
            onClick={handleDownloadPng}
            disabled={isGenerating}
            className={`py-2.5 px-3 rounded-2xl font-black text-xs shadow-lg flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer disabled:opacity-50 ${
              initialFocus === 'download'
                ? 'bg-gradient-to-r from-[#006747] to-[#10b981] text-white'
                : 'bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>
              {isBn ? 'কার্ড (PNG)' : isAr ? 'صورة PNG' : 'Card (PNG)'}
            </span>
          </button>

          {/* 3. Download Full TXT Document */}
          <button
            type="button"
            onClick={handleDownloadTxt}
            className="py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 text-cyan-300 font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>
              {isBn ? 'ডকুমেন্ট (TXT)' : isAr ? 'ملف نصي TXT' : 'Full (TXT)'}
            </span>
          </button>

          {/* 4. Print / Save as PDF */}
          <button
            type="button"
            onClick={handlePrintPdf}
            className="py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-amber-500/30 text-amber-300 font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>
              {isBn ? 'PDF / প্রিন্ট' : isAr ? 'طباعة / PDF' : 'Save PDF'}
            </span>
          </button>

          {/* 5. Copy Full Text */}
          <button
            type="button"
            onClick={handleCopyText}
            className="py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer col-span-2 sm:col-span-2"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
            <span>
              {copied
                ? isBn
                  ? 'সম্পূর্ণ লেখা কপি হয়েছে!'
                  : isAr
                    ? 'تم النسخ!'
                    : 'Copied Full Text!'
                : isBn
                  ? 'সম্পূর্ণ লেখা কপি করুন'
                  : isAr
                    ? 'نسخ النص بالكامل'
                    : 'Copy Full Text'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalNode, document.body);
};

interface ShareDownloadButtonsProps {
  onShare: () => void;
  onDownload: () => void;
  selectedLanguage: ZikrLanguage;
  themeMode?: ThemeMode;
  variant?: 'hero' | 'card' | 'compact';
  shareLabel?: string;
  downloadLabel?: string;
  className?: string;
}

export const ShareDownloadButtons: React.FC<ShareDownloadButtonsProps> = ({
  onShare,
  onDownload,
  selectedLanguage,
  themeMode = 'day',
  variant = 'card',
  shareLabel,
  downloadLabel,
  className = '',
}) => {
  const isBn = selectedLanguage === 'bn';
  const isAr = selectedLanguage === 'ar';

  const sLabel =
    shareLabel || (isBn ? 'শেয়ার' : isAr ? 'مشاركة' : 'Share');
  const dLabel =
    downloadLabel || (isBn ? 'ডাউনলোড' : isAr ? 'تحميل' : 'Download');

  if (variant === 'hero') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onShare();
          }}
          title={sLabel}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white text-[11px] font-bold backdrop-blur-sm transition active:scale-95 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{sLabel}</span>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDownload();
          }}
          title={dLabel}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/30 text-amber-100 text-[11px] font-bold backdrop-blur-sm transition active:scale-95 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{dLabel}</span>
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    const btnClass =
      themeMode === 'night'
        ? 'bg-slate-800/80 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border-slate-700'
        : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border-slate-200';
    return (
      <div className={`inline-flex items-center gap-1 ${className}`}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onShare();
          }}
          title={sLabel}
          aria-label={sLabel}
          className={`p-1.5 rounded-xl border transition active:scale-95 cursor-pointer ${btnClass}`}
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDownload();
          }}
          title={dLabel}
          aria-label={dLabel}
          className={`p-1.5 rounded-xl border transition active:scale-95 cursor-pointer ${btnClass}`}
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  const cardBtnShare =
    themeMode === 'night'
      ? 'bg-slate-800/90 hover:bg-emerald-500/20 border-slate-700 text-emerald-300'
      : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800';
  const cardBtnDownload =
    themeMode === 'night'
      ? 'bg-slate-800/90 hover:bg-amber-500/20 border-slate-700 text-amber-300'
      : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800';

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onShare();
        }}
        title={sLabel}
        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition active:scale-95 cursor-pointer ${cardBtnShare}`}
      >
        <Share2 className="w-3.5 h-3.5" />
        <span>{sLabel}</span>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
        title={dLabel}
        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition active:scale-95 cursor-pointer ${cardBtnDownload}`}
      >
        <Download className="w-3.5 h-3.5" />
        <span>{dLabel}</span>
      </button>
    </div>
  );
};
