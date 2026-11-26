import React, { useState } from 'react';
import {
  Smartphone,
  Palette,
  ShieldAlert,
  FileText,
  Download,
  Upload,
  Globe,
  Check,
  Volume2,
  Play,
  Square,
} from 'lucide-react';
import { AppSettings, ZikrLanguage } from '../types';
import { APP_LIGHT_THEMES } from '../utils/appThemes';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { SETTINGS_UI } from '../utils/appTranslations';
import { playArabicVoice, soundHaptics } from '../utils/audioHaptics';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { InstallAppModal } from './InstallAppModal';

interface SettingsViewProps {
  settings: AppSettings;
  selectedLanguage?: ZikrLanguage;
  onSelectLanguage?: (lang: ZikrLanguage) => void;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onGlobalReset: () => void;
  onRestoreDefaults: () => void;
  onExportPdf?: () => void;
  onExportBackupJson?: () => void;
  onImportBackupJson?: (file: File) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  selectedLanguage = 'bn',
  onSelectLanguage,
  onUpdateSettings,
  onGlobalReset,
  onRestoreDefaults,
  onExportPdf,
  onExportBackupJson,
  onImportBackupJson,
}) => {
  const [isPlayingSample, setIsPlayingSample] = useState(false);
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [showInstallModal, setShowInstallModal] = useState(false);
  const isDay = settings.themeMode === 'day';

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
      settings.voiceGender || 'male',
      () => {
        setIsPlayingSample(false);
      }
    );
  };

  const handleDefaultExportBackup = () => {
    try {
      const backupData = {
        settings,
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
        if (parsed.settings) onUpdateSettings(parsed.settings);
      } catch (err) {
        console.error('Failed to import backup JSON', err);
      }
    };
    reader.readAsText(file);
  };

  const cardShellClass = isDay
    ? 'bg-[var(--app-surface,#fafdfb)] border-[var(--app-border,#cbe6d8)] text-slate-900 shadow-sm'
    : 'bg-[var(--app-dark-surface,#062024)] border-[var(--app-dark-border,#184850)] text-white shadow-lg';

  const sectionTitleClass = `flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
    isDay ? 'text-[var(--app-primary,#006A4E)]' : 'text-[var(--app-primary-light,#6ee7b7)]'
  }`;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className={`pb-3 border-b ${isDay ? 'border-[var(--app-border,#cbe6d8)]' : 'border-[var(--app-dark-border,#184850)]'}`}>
        <h2 className={`text-xl font-bold flex items-center gap-2 ${isDay ? 'text-slate-900' : 'text-white'}`}>
          <span>{SETTINGS_UI.title[selectedLanguage] || 'App Settings & Preferences'}</span>
        </h2>
        <p className={`text-xs mt-1 ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
          {SETTINGS_UI.subtitle[selectedLanguage] ||
            'Customize language, themes, haptics, audio, and data backups.'}
        </p>
      </div>

      {/* App Install & Offline Card */}
      <div
        className={`p-5 rounded-3xl border space-y-3 ${
          isDay
            ? 'bg-gradient-to-r from-[var(--app-surface-soft,#e9f6ef)] via-[var(--app-canvas,#f3faf6)] to-[var(--app-surface,#fafdfb)] border-[var(--app-border,#cbe6d8)] text-slate-900 shadow-sm'
            : 'bg-gradient-to-r from-[var(--app-dark-surface,#062024)] via-[var(--app-dark-surface-soft,#0c3138)] to-[var(--app-dark-canvas,#03171b)] border-[var(--app-dark-border,#184850)] text-white shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--app-primary,#006A4E)] text-white flex items-center justify-center shrink-0 shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-extrabold text-sm ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {selectedLanguage === 'bn' ? 'হোম স্ক্রিনে Zikr+ অ্যাপ ইনস্টল' : 'Install Zikr+ App on Device'}
              </h3>
              <p className={`text-xs font-medium ${isDay ? 'text-[var(--app-primary,#006A4E)]' : 'text-[var(--app-primary-light,#6ee7b7)]'}`}>
                {selectedLanguage === 'bn' ? 'সম্পূর্ণ অফলাইনে নেট ছাড়া দ্রুততম স্পিডে রান করুন' : 'Run 100% offline at ultra-fast speeds'}
              </p>
            </div>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border hidden sm:inline ${
              isDay
                ? 'bg-[var(--app-surface,#fafdfb)] text-[var(--app-primary,#006A4E)] border-[var(--app-border,#cbe6d8)]'
                : 'bg-[var(--app-dark-surface-soft,#0c3138)] text-[var(--app-primary-light,#6ee7b7)] border-[var(--app-dark-border,#184850)]'
            }`}
          >
            PWA
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (isInstallable) {
              install().then((ok) => {
                if (!ok) setShowInstallModal(true);
              });
            } else {
              setShowInstallModal(true);
            }
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-[var(--app-primary,#006A4E)] hover:bg-[var(--app-primary-dark,#00523c)] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>
            {isInstalled
              ? (selectedLanguage === 'bn' ? 'অ্যাপটি ইতিমধ্যে ইনস্টল আছে ✓' : 'App Installed ✓ (View Guide)')
              : (selectedLanguage === 'bn' ? 'ফোনে ইনস্টল করুন' : 'Install App on Device')}
          </span>
        </button>
      </div>

      {/* 0. Language Configuration (14 Supported World Languages) */}
      <div className={`p-5 rounded-3xl border space-y-4 ${cardShellClass}`}>
        <div className="flex items-center justify-between">
          <div className={sectionTitleClass}>
            <Globe className="w-4 h-4" />
            <span>{SETTINGS_UI.appLanguage[selectedLanguage] || 'App Language'}</span>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              isDay
                ? 'bg-[var(--app-surface-soft,#e9f6ef)] text-[var(--app-primary,#006A4E)] border-[var(--app-border,#cbe6d8)]'
                : 'bg-[var(--app-dark-surface-soft,#0c3138)] text-[var(--app-primary-light,#6ee7b7)] border-[var(--app-dark-border,#184850)]'
            }`}
          >
            {SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage)?.nativeName || selectedLanguage}
          </span>
        </div>
        <p className={`text-xs font-bold ${isDay ? 'text-[var(--app-primary,#006A4E)]' : 'text-[var(--app-primary-light,#6ee7b7)]'}`}>
          {SETTINGS_UI.languageDesc[selectedLanguage] ||
            'All menus, translations, and guides will update instantly (Sacred Arabic remains intact)'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
          {SUPPORTED_LANGUAGES.map((langItem) => {
            const isSelected = selectedLanguage === langItem.code;
            return (
              <button
                key={langItem.code}
                type="button"
                onClick={() => onSelectLanguage && onSelectLanguage(langItem.code)}
                className={`p-3 rounded-2xl border text-left transition active:scale-95 cursor-pointer flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-[var(--app-primary,#006A4E)] text-white border-[var(--app-primary,#006A4E)] shadow-md font-bold'
                    : isDay
                    ? 'bg-[var(--app-surface-soft,#e9f6ef)] hover:bg-[var(--app-surface-tray,#dff2e8)] border-[var(--app-border,#cbe6d8)] text-slate-800'
                    : 'bg-[var(--app-dark-canvas,#03171b)] hover:bg-[var(--app-dark-surface-soft,#0c3138)] border-[var(--app-dark-border,#184850)] text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xl shrink-0">{langItem.flag}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate leading-tight">
                      {langItem.nativeName}
                    </div>
                    <div className="text-[10px] opacity-75 truncate">{langItem.label}</div>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-white text-[var(--app-primary,#006A4E)] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Appearance Theme Configuration (All 6 Unified App Themes) */}
      <div className={`p-5 rounded-3xl border space-y-4 ${cardShellClass}`}>
        <div className={sectionTitleClass}>
          <Palette className="w-4 h-4" />
          <span>{SETTINGS_UI.themeTitle[selectedLanguage] || 'Appearance Theme'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {APP_LIGHT_THEMES.map((th) => {
            const isSelected = (settings.theme || 'emerald') === th.id;
            return (
              <button
                key={th.id}
                type="button"
                onClick={() => onUpdateSettings({ theme: th.id })}
                className="p-3.5 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer active:scale-[0.98]"
                style={{
                  backgroundColor: isDay
                    ? isSelected
                      ? th.softBg
                      : th.cardBg
                    : isSelected
                    ? th.darkSurfaceSoft
                    : th.darkCanvas,
                  borderColor: isSelected ? th.primary : isDay ? th.border : th.darkBorder,
                  boxShadow: isSelected ? `0 0 0 2px ${th.primary}35` : undefined,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl shrink-0 border flex items-center justify-center"
                  style={{
                    backgroundColor: th.primary,
                    borderColor: th.primaryDark,
                  }}
                >
                  {isSelected && <Check className="w-4 h-4 text-white stroke-[2.8]" />}
                </div>
                <div className="min-w-0">
                  <div
                    className="text-sm font-extrabold truncate"
                    style={{ color: isDay ? th.ink : '#ffffff' }}
                  >
                    {selectedLanguage === 'bn' ? th.nameBn : th.nameEn}
                  </div>
                  <div
                    className={`text-[11px] leading-tight line-clamp-1 ${
                      isDay ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {selectedLanguage === 'bn' ? th.descBn : th.descEn}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Audio Reciter Voice Selection */}
      <div className={`p-5 rounded-3xl border space-y-4 ${cardShellClass}`}>
        <div className="flex items-center justify-between">
          <div className={sectionTitleClass}>
            <Volume2 className="w-4 h-4" />
            <span>{selectedLanguage === 'bn' ? 'অডিও তেলাওয়াত কণ্ঠ সেটিংস' : 'Voice Recitation Settings'}</span>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              isDay
                ? 'bg-[var(--app-surface-soft,#e9f6ef)] text-[var(--app-primary,#006A4E)] border-[var(--app-border,#cbe6d8)]'
                : 'bg-[var(--app-dark-surface-soft,#0c3138)] text-[var(--app-primary-light,#6ee7b7)] border-[var(--app-dark-border,#184850)]'
            }`}
          >
            {settings.voiceGender === 'female'
              ? selectedLanguage === 'bn'
                ? '👩 নারী কণ্ঠ'
                : selectedLanguage === 'ar'
                ? '👩 صوت نسائي'
                : '👩 Female Voice'
              : selectedLanguage === 'bn'
              ? '👨 পুরুষ কণ্ঠ'
              : selectedLanguage === 'ar'
              ? '👨 صوت رجالي'
              : '👨 Male Voice'}
          </span>
        </div>

        <div
          className={`p-4 sm:p-5 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isDay
              ? 'bg-[var(--app-surface-soft,#e9f6ef)] border-[var(--app-border,#cbe6d8)] text-slate-900'
              : 'bg-[var(--app-dark-canvas,#03171b)] border-[var(--app-dark-border,#184850)] text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                isDay
                  ? 'bg-[var(--app-surface,#fafdfb)] text-[var(--app-primary,#006A4E)] border-[var(--app-border,#cbe6d8)]'
                  : 'bg-[var(--app-dark-surface-soft,#0c3138)] text-[var(--app-primary-light,#6ee7b7)] border-[var(--app-dark-border,#184850)]'
              }`}
            >
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-sm font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {selectedLanguage === 'bn' ? 'অডিও তেলাওয়াত কণ্ঠ নির্বাচন' : 'Voice Recitation Gender'}
              </h3>
              <p className={`text-xs ${isDay ? 'text-[var(--app-primary,#006A4E)]' : 'text-[var(--app-primary-light,#6ee7b7)]'}`}>
                {selectedLanguage === 'bn' ? 'পুরুষ কণ্ঠ (গভীর) বা নারী কণ্ঠ (সুমধুর) তেলাওয়াত নির্বাচন করুন' : 'Choose Male baritone or Female melodious voice'}
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 p-1.5 rounded-2xl border shrink-0 ${
              isDay
                ? 'bg-[var(--app-surface,#fafdfb)] border-[var(--app-border,#cbe6d8)]'
                : 'bg-[var(--app-dark-surface,#062024)] border-[var(--app-dark-border,#184850)]'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                onUpdateSettings({ voiceGender: 'male' });
                if (settings.soundEnabled) soundHaptics.playTap();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                (settings?.voiceGender || 'male') === 'male'
                  ? 'bg-[var(--app-primary,#006A4E)] text-white shadow'
                  : isDay
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>👨</span>
              <span>{selectedLanguage === 'bn' ? 'পুরুষ কণ্ঠ' : 'Male'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onUpdateSettings({ voiceGender: 'female' });
                if (settings.soundEnabled) soundHaptics.playTap();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                settings?.voiceGender === 'female'
                  ? 'bg-[var(--app-primary,#006A4E)] text-white shadow'
                  : isDay
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>👩</span>
              <span>{selectedLanguage === 'bn' ? 'নারী কণ্ঠ' : 'Female'}</span>
            </button>
          </div>
        </div>

        {/* Audio Test Sample Button */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 p-3.5 rounded-2xl border ${
            isDay
              ? 'bg-[var(--app-canvas,#f3faf6)] border-[var(--app-border,#cbe6d8)]'
              : 'bg-[var(--app-dark-canvas,#03171b)] border-[var(--app-dark-border,#184850)]'
          }`}
        >
          <div>
            <div className={`text-xs font-bold ${isDay ? 'text-slate-800' : 'text-slate-200'}`}>
              {selectedLanguage === 'bn' ? 'কণ্ঠের নমুনা অডিও পরীক্ষা করুন' : 'Listen to Voice Sample'}
            </div>
            <div className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
              {selectedLanguage === 'bn' ? 'দোআ ও আজকার তেলাওয়াতের অডিও উচ্চারণ যাচাই করুন' : 'Preview how the selected voice sounds during recitation'}
            </div>
          </div>

          <button
            type="button"
            onClick={handlePlayVoiceSample}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md ${
              isPlayingSample
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-[var(--app-primary,#006A4E)] hover:bg-[var(--app-primary-dark,#00523c)] text-white'
            }`}
          >
            {isPlayingSample ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>{selectedLanguage === 'bn' ? 'থামুন' : 'Stop Sample'}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{selectedLanguage === 'bn' ? 'কণ্ঠ শুনুন' : 'Play Sample Voice'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Audio & Haptics Toggles */}
      <div className={`p-5 rounded-3xl border space-y-4 ${cardShellClass}`}>
        <div className={sectionTitleClass}>
          <Smartphone className="w-4 h-4" />
          <span>{SETTINGS_UI.audioHaptics[selectedLanguage] || 'Feedback & Sensory Controls'}</span>
        </div>

        <div className={`divide-y text-sm ${isDay ? 'divide-[var(--app-border,#cbe6d8)]' : 'divide-[var(--app-dark-border,#184850)]'}`}>
          {/* Sound Toggle */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <div className={`font-semibold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {SETTINGS_UI.soundLabel[selectedLanguage] || 'Bead Click Audio'}
              </div>
              <div className={`text-xs ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {SETTINGS_UI.soundDesc[selectedLanguage] || 'Synthesized acoustic wooden bead click on every count'}
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                settings.soundEnabled ? 'bg-[var(--app-primary,#006A4E)]' : 'bg-slate-400 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                  settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Vibration Toggle */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <div className={`font-semibold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {SETTINGS_UI.vibrationLabel[selectedLanguage] || 'Tactile Vibration Haptics'}
              </div>
              <div className={`text-xs ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {SETTINGS_UI.vibrationDesc[selectedLanguage] || 'Soft pulse feedback on tap, milestone chords for targets'}
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ vibrationEnabled: !settings.vibrationEnabled })}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                settings.vibrationEnabled ? 'bg-[var(--app-primary,#006A4E)]' : 'bg-slate-400 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                  settings.vibrationEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Screen Wake Lock */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <div className={`font-semibold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {SETTINGS_UI.wakeLockLabel[selectedLanguage] || 'Keep Screen Awake (Wake Lock)'}
              </div>
              <div className={`text-xs ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {SETTINGS_UI.wakeLockDesc[selectedLanguage] || 'Prevents phone display from sleeping while reciting'}
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ screenAwake: !settings.screenAwake })}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                settings.screenAwake ? 'bg-[var(--app-primary,#006A4E)]' : 'bg-slate-400 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                  settings.screenAwake ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Data Backup & PDF Report */}
      <div className={`p-5 rounded-3xl border space-y-4 ${cardShellClass}`}>
        <div className={sectionTitleClass}>
          <FileText className="w-4 h-4" />
          <span>{SETTINGS_UI.dataBackup[selectedLanguage] || 'Export & Data Backup'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={onExportPdf}
            className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition active:scale-95 cursor-pointer ${
              isDay
                ? 'bg-[var(--app-surface-soft,#e9f6ef)] hover:bg-[var(--app-surface-tray,#dff2e8)] border-[var(--app-border,#cbe6d8)] text-[var(--app-primary,#006A4E)]'
                : 'bg-[var(--app-dark-surface-soft,#0c3138)] hover:bg-[var(--app-dark-border,#184850)] border-[var(--app-dark-border,#184850)] text-[var(--app-primary-light,#6ee7b7)]'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-500" />
            <span>{SETTINGS_UI.exportPdf[selectedLanguage] || 'Export PDF Report'}</span>
          </button>

          <button
            onClick={onExportBackupJson || handleDefaultExportBackup}
            className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition active:scale-95 cursor-pointer ${
              isDay
                ? 'bg-[var(--app-canvas,#f3faf6)] hover:bg-[var(--app-surface-soft,#e9f6ef)] border-[var(--app-border,#cbe6d8)] text-slate-800'
                : 'bg-[var(--app-dark-canvas,#03171b)] hover:bg-[var(--app-dark-surface-soft,#0c3138)] border-[var(--app-dark-border,#184850)] text-slate-200'
            }`}
          >
            <Download className="w-4 h-4 text-[var(--app-primary,#006A4E)] dark:text-[var(--app-primary-light,#6ee7b7)]" />
            <span>{SETTINGS_UI.backupJson[selectedLanguage] || 'Backup JSON'}</span>
          </button>

          <label
            className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition active:scale-95 cursor-pointer ${
              isDay
                ? 'bg-[var(--app-canvas,#f3faf6)] hover:bg-[var(--app-surface-soft,#e9f6ef)] border-[var(--app-border,#cbe6d8)] text-slate-800'
                : 'bg-[var(--app-dark-canvas,#03171b)] hover:bg-[var(--app-dark-surface-soft,#0c3138)] border-[var(--app-dark-border,#184850)] text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4 text-[var(--app-primary,#006A4E)] dark:text-[var(--app-primary-light,#6ee7b7)]" />
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

      {/* 5. Danger Zone */}
      <div
        className={`p-5 rounded-3xl border space-y-3 ${
          isDay
            ? 'bg-rose-50/70 border-rose-200 text-slate-900'
            : 'bg-[var(--app-dark-surface,#062024)] border-red-900/50 text-white'
        }`}
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-red-400">
          <ShieldAlert className="w-4 h-4" />
          <span>{SETTINGS_UI.dangerZone[selectedLanguage] || 'Data Reset Controls'}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onGlobalReset}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition active:scale-95 cursor-pointer"
          >
            {SETTINGS_UI.resetCounters[selectedLanguage] || 'Reset All Counters to 0'}
          </button>

          <button
            onClick={onRestoreDefaults}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition active:scale-95 cursor-pointer ${
              isDay
                ? 'bg-[var(--app-surface,#fafdfb)] hover:bg-[var(--app-surface-soft,#e9f6ef)] border-[var(--app-border,#cbe6d8)] text-slate-700'
                : 'bg-[var(--app-dark-canvas,#03171b)] hover:bg-[var(--app-dark-surface-soft,#0c3138)] border-[var(--app-dark-border,#184850)] text-slate-300'
            }`}
          >
            {SETTINGS_UI.restoreAzkar[selectedLanguage] || 'Restore Default Azkar'}
          </button>
        </div>
      </div>

      <InstallAppModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        isDay={settings.themeMode === 'day'}
        selectedLanguage={selectedLanguage}
      />
    </div>
  );
};
