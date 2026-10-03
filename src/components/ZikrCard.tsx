import React from 'react';
import { RotateCcw, Trash2, Edit3, CheckCircle2, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import { ZikrItem, ThemeMode, ZikrLanguage } from '../types';

interface ZikrCardProps {
  zikr: ZikrItem;
  index: number;
  totalCards: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onReset: (zikr: ZikrItem) => void;
  onDelete: (zikr: ZikrItem) => void;
  onEdit: (zikr: ZikrItem) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

export const ZikrCard: React.FC<ZikrCardProps> = ({
  zikr,
  index,
  totalCards,
  onIncrement,
  onDecrement,
  onReset,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  themeMode = 'night',
  selectedLanguage = 'bn',
}) => {
  const currentLang = selectedLanguage;
  const hasTarget = zikr.target !== undefined && zikr.target > 0;
  const target = zikr.target || 0;
  const isGoalMet = hasTarget && zikr.count >= target;
  const progressPercent = hasTarget ? Math.min(100, Math.round((zikr.count / target) * 100)) : 100;

  const isDay = themeMode === 'day';
  const displayArabic = zikr.arabic || '';

  // Get pronunciation and meaning according to selected language
  const translationData = zikr.translations?.[currentLang];
  const displayPronunciation =
    (currentLang === 'bn' ? zikr.pronunciationBn : translationData?.pronunciation) ||
    translationData?.pronunciation ||
    zikr.transliteration ||
    zikr.name;

  const displayMeaning =
    (currentLang === 'bn' ? (zikr.meaningBn || zikr.meaning) : translationData?.meaning) ||
    translationData?.meaning ||
    zikr.meaningBn ||
    zikr.meaning ||
    '';

  const isUrdu = currentLang === 'ur';

  const getMeaningLabel = (lang: ZikrLanguage) => {
    switch (lang) {
      case 'bn':
        return 'অর্থ: ';
      case 'ur':
        return 'ترجمہ: ';
      case 'ar':
        return 'المعنى: ';
      case 'hi':
        return 'अर्थ: ';
      case 'id':
        return 'Arti: ';
      case 'tr':
        return 'Anlamı: ';
      case 'ms':
        return 'Maksud: ';
      case 'fr':
        return 'Signification: ';
      case 'es':
        return 'Significado: ';
      case 'ru':
        return 'Значение: ';
      case 'fa':
        return 'معنی: ';
      case 'de':
        return 'Bedeutung: ';
      case 'sw':
        return 'Maana: ';
      case 'en':
      default:
        return 'Meaning: ';
    }
  };

  const getTargetLabel = (lang: ZikrLanguage) => {
    switch (lang) {
      case 'bn': return 'লক্ষ্য: ';
      case 'ur': return 'ہدف: ';
      case 'ar': return 'الهدف: ';
      case 'hi': return 'लक्ष्य: ';
      case 'id': return 'Target: ';
      case 'tr': return 'Hedef: ';
      case 'ms': return 'Sasaran: ';
      case 'fr': return 'Objectif: ';
      case 'es': return 'Meta: ';
      case 'ru': return 'Цель: ';
      case 'fa': return 'هدف: ';
      case 'de': return 'Ziel: ';
      case 'sw': return 'Lengo: ';
      case 'en':
      default: return 'Target: ';
    }
  };

  const getCompletedLabel = (lang: ZikrLanguage) => {
    switch (lang) {
      case 'bn': return 'সম্পন্ন';
      case 'ur': return 'مکمل';
      case 'ar': return 'مكتمل';
      case 'hi': return 'पूर्ण';
      case 'id': return 'Selesai';
      case 'tr': return 'Tamamlandı';
      case 'ms': return 'Selesai';
      case 'fr': return 'Terminé';
      case 'es': return 'Completado';
      case 'ru': return 'Завершено';
      case 'fa': return 'تکمیل شد';
      case 'de': return 'Abgeschlossen';
      case 'sw': return 'Imekamilika';
      case 'en':
      default: return 'Completed';
    }
  };

  const getResetLabel = (lang: ZikrLanguage) => {
    switch (lang) {
      case 'bn': return 'রিসেট';
      case 'ur': return 'ری سیٹ';
      case 'ar': return 'إعادة ضبط';
      case 'hi': return 'रीसेट';
      case 'id': return 'Reset';
      case 'tr': return 'Sıfırla';
      case 'ms': return 'Set Semula';
      case 'fr': return 'Réinit.';
      case 'es': return 'Reiniciar';
      case 'ru': return 'Сброс';
      case 'fa': return 'بازنشانی';
      case 'de': return 'Reset';
      case 'sw': return 'Weka Upya';
      case 'en':
      default: return 'Reset';
    }
  };

  const getCountLabel = (lang: ZikrLanguage) => {
    switch (lang) {
      case 'bn': return 'গণনা';
      case 'ur': return 'شمار';
      case 'ar': return 'العدد';
      case 'hi': return 'गणना';
      case 'id': return 'Hitungan';
      case 'tr': return 'Sayı';
      case 'ms': return 'Kiraan';
      case 'fr': return 'Compte';
      case 'es': return 'Conteo';
      case 'ru': return 'Счёт';
      case 'fa': return 'شمارش';
      case 'de': return 'Zählung';
      case 'sw': return 'Hesabu';
      case 'en':
      default: return 'Count';
    }
  };

  return (
    <div
      onClick={() => onIncrement(zikr.id)}
      className={`relative rounded-[26px] border transition-all duration-200 p-4 sm:p-5 shadow-md flex flex-col justify-between overflow-hidden cursor-pointer select-none active:scale-[0.99] group ${
        isDay
          ? isGoalMet
            ? 'bg-white border-amber-400/80 shadow-amber-500/10'
            : 'bg-white border-[#dcebe8] hover:border-[#b5dcd6] shadow-[#135d66]/5'
          : isGoalMet
          ? 'bg-[#0e2f36] border-amber-500/80 shadow-amber-950/20'
          : 'bg-[#0e2f36] border-[#1a515c] hover:border-[#266e7c] shadow-[#082024]/60'
      }`}
    >
      {/* Top Header Row: Index & Completed status / quick reset */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
              isDay
                ? 'bg-[#e6f7f2] text-[#00875a] border-[#c3edd9]'
                : 'bg-[#061f24] text-emerald-300 border-[#144349]'
            }`}
          >
            #{String(index + 1).padStart(2, '0')}
          </span>

          {hasTarget && (
            <span
              className={`text-[11px] font-semibold ${
                isDay ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {getTargetLabel(currentLang)} <span className="font-bold text-amber-600 dark:text-amber-400">{target}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {isGoalMet && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40 shrink-0 animate-pulse">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{getCompletedLabel(currentLang)}</span>
            </span>
          )}

          {/* Quick Reset icon button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReset(zikr);
            }}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition active:scale-95 cursor-pointer border ${
              isDay
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-emerald-800 border-slate-300'
                : 'bg-[#061f24] hover:bg-[#0a2e36] text-emerald-300 hover:text-white border-[#144349]'
            }`}
            title={`${getResetLabel(currentLang)} (0)`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>{getResetLabel(currentLang)}</span>
          </button>
        </div>
      </div>

      {/* Main Content:
          1. Arabic Zikir (Centered, RTL, compact font for long texts like Ayatul Kursi)
          2. Pronunciation (Gold / Yellow accent color)
          3. Meaning (Full text, clearly readable, compact font)
      */}
      <div className="py-2 text-center space-y-1.5">
        {/* 1. Arabic Zikir */}
        {displayArabic && (
          <div
            dir="rtl"
            style={{ direction: 'rtl', textAlign: 'center' }}
            className={`font-arabic font-bold leading-relaxed select-none transition-colors break-words ${
              displayArabic.length > 150
                ? 'text-xs sm:text-sm py-1'
                : displayArabic.length > 70
                ? 'text-sm sm:text-base'
                : displayArabic.length > 35
                ? 'text-lg sm:text-xl'
                : 'text-xl sm:text-2xl'
            } ${
              isDay ? 'text-[#0a382c]' : 'text-emerald-300'
            }`}
          >
            {displayArabic}
          </div>
        )}

        {/* 2. Pronunciation in selected language */}
        <div
          dir={isUrdu ? 'rtl' : 'ltr'}
          className={`text-center font-bold text-sm sm:text-base text-amber-500 dark:text-amber-400 tracking-wide ${
            isUrdu ? 'font-arabic' : ''
          }`}
        >
          {displayPronunciation}
        </div>

        {/* 3. Meaning in selected language */}
        {displayMeaning && (
          <div
            dir={isUrdu ? 'rtl' : 'ltr'}
            className={`text-xs leading-relaxed px-1 break-words whitespace-normal opacity-90 ${
              isDay ? 'text-slate-800 font-medium' : 'text-slate-200'
            }`}
          >
            <span className="font-bold text-emerald-700 dark:text-emerald-400">
              {getMeaningLabel(currentLang)}
            </span>
            <span>{displayMeaning}</span>
          </div>
        )}
      </div>

      {/* Counter Inset Box: */}
      <div
        className={`my-2 p-3 sm:p-4 rounded-2xl border transition-colors ${
          isDay
            ? 'bg-[#f0f7f6] border-[#d2ece9]'
            : 'bg-[#061f24] border-[#144349]'
        }`}
      >
        <div className="flex items-center justify-between mb-1.5 text-xs font-bold">
          <span className={`uppercase tracking-wider ${isDay ? 'text-slate-700 font-extrabold' : 'text-slate-300'}`}>
            {getCountLabel(currentLang)}
          </span>
          {hasTarget && (
            <span className={isGoalMet ? 'text-amber-500 font-bold' : isDay ? 'text-[#005a3e] font-extrabold' : 'text-emerald-300'}>
              {isGoalMet ? `${getCompletedLabel(currentLang)} (100%)` : `${progressPercent}%`}
            </span>
          )}
        </div>

        {/* Big Count Display */}
        <div className="flex items-baseline justify-between gap-2">
          <div
            className={`text-3xl sm:text-4xl font-black tracking-tight font-sans select-none drop-shadow-sm ${
              isDay ? 'text-[#0a382c]' : 'text-white'
            }`}
          >
            {zikr.count.toLocaleString()}
          </div>

          <div
            className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${
              isDay
                ? 'bg-white border-[#cde5e2] text-[#006747]'
                : 'bg-[#092226] border-[#144349] text-emerald-300'
            }`}
          >
            {hasTarget ? `${zikr.count} / ${target}` : `${zikr.count}`}
          </div>
        </div>

        {/* Progress Bar */}
        {hasTarget && (
          <div
            className={`w-full h-2 rounded-full overflow-hidden mt-2.5 ${
              isDay ? 'bg-[#d8ece9]' : 'bg-[#092226]'
            }`}
          >
            <div
              className={`h-full transition-all duration-300 ${
                isGoalMet
                  ? 'bg-gradient-to-r from-amber-500 to-amber-300'
                  : 'bg-emerald-600'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Primary Tap Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onIncrement(zikr.id);
        }}
        className="w-full py-3 sm:py-3.5 mt-1 rounded-2xl text-sm sm:text-base font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 bg-[#006747] hover:bg-[#005a3e] text-white shadow-[#006747]/20 border border-emerald-400/30"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>+1 {getCountLabel(currentLang)} ({displayPronunciation})</span>
      </button>

      {/* Secondary Controls Bar */}
      <div
        className={`flex items-center justify-between gap-1.5 mt-3 pt-2.5 border-t border-dashed ${
          isDay ? 'border-[#dcebe8]' : 'border-[#17434b]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1">
          {/* Decrement Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDecrement(zikr.id);
            }}
            disabled={zikr.count <= 0}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition active:scale-95 disabled:opacity-40 cursor-pointer border ${
              isDay
                ? 'bg-[#eef7f6] hover:bg-[#e2f1f0] text-[#1c6469] border-[#d0e6e3]'
                : 'bg-[#0a262c] hover:bg-[#10343c] text-[#8ebac0] border-[#184850]'
            }`}
            title="১ কমান (-1)"
          >
            -1
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReset(zikr);
            }}
            className={`p-1.5 rounded-xl transition active:scale-95 cursor-pointer border ${
              isDay
                ? 'bg-[#eef7f6] hover:bg-[#e2f1f0] text-[#507579] hover:text-[#1c6469] border-[#d0e6e3]'
                : 'bg-[#0a262c] hover:bg-[#10343c] text-[#8ebac0] hover:text-white border-[#184850]'
            }`}
            title="রিসেট (Reset to 0)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          {/* Reorder Up */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp(index);
            }}
            disabled={index === 0}
            className={`p-1.5 rounded-xl transition active:scale-95 disabled:opacity-30 cursor-pointer border ${
              isDay
                ? 'bg-[#eef7f6] hover:bg-[#e2f1f0] text-[#507579] border-[#d0e6e3]'
                : 'bg-[#0a262c] text-[#8ebac0] border-[#184850]'
            }`}
            title="উপরে নিন (Move Up)"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

          {/* Reorder Down */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown(index);
            }}
            disabled={index === totalCards - 1}
            className={`p-1.5 rounded-xl transition active:scale-95 disabled:opacity-30 cursor-pointer border ${
              isDay
                ? 'bg-[#eef7f6] hover:bg-[#e2f1f0] text-[#507579] border-[#d0e6e3]'
                : 'bg-[#0a262c] text-[#8ebac0] border-[#184850]'
            }`}
            title="নিচে নিন (Move Down)"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          {/* Edit */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(zikr);
            }}
            className={`p-1.5 rounded-xl transition active:scale-95 cursor-pointer border ${
              isDay
                ? 'bg-[#eef7f6] hover:bg-[#e2f1f0] text-[#507579] hover:text-[#1c6469] border-[#d0e6e3]'
                : 'bg-[#0a262c] hover:bg-[#10343c] text-[#8ebac0] hover:text-white border-[#184850]'
            }`}
            title="সম্পাদনা (Edit)"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(zikr);
            }}
            className={`p-1.5 rounded-xl transition active:scale-95 cursor-pointer border ${
              isDay
                ? 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200'
                : 'bg-red-950/30 hover:bg-red-900/50 text-red-300 border-red-900/40'
            }`}
            title="মুছুন (Delete)"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
