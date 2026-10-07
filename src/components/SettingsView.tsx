import React from 'react';
import {
  Smartphone,
  Palette,
  ShieldAlert,
  FileText,
  Download,
  Upload,
  Globe,
  Check,
} from 'lucide-react';
import { AppTheme, AppSettings, ZikrLanguage } from '../types';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { SETTINGS_UI } from '../utils/appTranslations';

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

  const themes: Array<{ id: AppTheme; name: string; desc: string; previewClass: string }> = [
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

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900/80 p-5 rounded-3xl border border-emerald-900/40">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>{SETTINGS_UI.title[selectedLanguage] || 'App Settings & Preferences'}</span>
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          {SETTINGS_UI.subtitle[selectedLanguage] ||
            'Customize language, themes, haptics, audio, and data backups.'}
        </p>
      </div>

      {/* 0. Language Configuration (14 Supported World Languages) */}
      <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Globe className="w-4 h-4" />
            <span>{SETTINGS_UI.appLanguage[selectedLanguage] || 'App Language'}</span>
          </div>
          <span className="text-xs font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
            {SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage)?.nativeName || selectedLanguage}
          </span>
        </div>
        <p className="text-xs font-bold text-[#005e3f] dark:text-emerald-300">
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
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/50 font-bold'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
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
                  <div className="w-4 h-4 rounded-full bg-white text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Theme Configuration */}
      <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <Palette className="w-4 h-4" />
          <span>{SETTINGS_UI.themeTitle[selectedLanguage] || 'Appearance Theme'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {themes.map((th) => {
            const isSelected = settings.theme === th.id;
            return (
              <button
                key={th.id}
                onClick={() => onUpdateSettings({ theme: th.id })}
                className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 bg-gradient-to-br ${th.previewClass} ${
                  isSelected
                    ? 'ring-2 ring-emerald-400 shadow-lg shadow-emerald-950/60'
                    : 'opacity-75 hover:opacity-100 border-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-emerald-300 bg-emerald-500' : 'border-slate-500'}`}>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{th.name}</div>
                  <div className="text-[11px] text-slate-300 leading-tight">{th.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Audio & Haptics Toggles */}
      <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <Smartphone className="w-4 h-4" />
          <span>{SETTINGS_UI.audioHaptics[selectedLanguage] || 'Feedback & Sensory Controls'}</span>
        </div>

        <div className="divide-y divide-slate-800/80 text-sm">
          {/* Sound Toggle */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">
                {SETTINGS_UI.soundLabel[selectedLanguage] || 'Bead Click Audio'}
              </div>
              <div className="text-xs text-slate-400">
                {SETTINGS_UI.soundDesc[selectedLanguage] || 'Synthesized acoustic wooden bead click on every count'}
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                settings.soundEnabled ? 'bg-emerald-600' : 'bg-slate-700'
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
              <div className="font-semibold text-white">
                {SETTINGS_UI.vibrationLabel[selectedLanguage] || 'Tactile Vibration Haptics'}
              </div>
              <div className="text-xs text-slate-400">
                {SETTINGS_UI.vibrationDesc[selectedLanguage] || 'Soft pulse feedback on tap, milestone chords for targets'}
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ vibrationEnabled: !settings.vibrationEnabled })}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                settings.vibrationEnabled ? 'bg-emerald-600' : 'bg-slate-700'
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
              <div className="font-semibold text-white">
                {SETTINGS_UI.wakeLockLabel[selectedLanguage] || 'Keep Screen Awake (Wake Lock)'}
              </div>
              <div className="text-xs text-slate-400">
                {SETTINGS_UI.wakeLockDesc[selectedLanguage] || 'Prevents phone display from sleeping while reciting'}
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ screenAwake: !settings.screenAwake })}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                settings.screenAwake ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                  settings.screenAwake ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Voice Recitation Gender Selection (নারী / পুরুষ কণ্ঠ) */}
          <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800">
            <div>
              <div className="font-semibold text-white flex items-center gap-1.5">
                <span>{selectedLanguage === 'bn' ? 'অডিও তেলাওয়াত কণ্ঠ নির্বাচন' : 'Voice Recitation Gender'}</span>
              </div>
              <div className="text-xs text-slate-400">
                {selectedLanguage === 'bn' ? 'পুরুষ কণ্ঠ (গভীর ও গম্ভীর) বা নারী কণ্ঠ (সুমধুর) নির্বাচন করুন' : 'Choose between Male (baritone) and Female (melodious) voice'}
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-2xl border border-slate-700 shrink-0">
              <button
                type="button"
                onClick={() => onUpdateSettings({ voiceGender: 'male' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  settings.voiceGender !== 'female'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>👨</span>
                <span>{selectedLanguage === 'bn' ? 'পুরুষ কণ্ঠ' : 'Male'}</span>
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings({ voiceGender: 'female' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  settings.voiceGender === 'female'
                    ? 'bg-teal-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>👩</span>
                <span>{selectedLanguage === 'bn' ? 'নারী কণ্ঠ' : 'Female'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Data Backup & PDF Report */}
      <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <FileText className="w-4 h-4" />
          <span>{SETTINGS_UI.dataBackup[selectedLanguage] || 'Export & Data Backup'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={onExportPdf}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/50 text-emerald-200 text-xs font-bold transition active:scale-95 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>{SETTINGS_UI.exportPdf[selectedLanguage] || 'Export PDF Report'}</span>
          </button>

          <button
            onClick={onExportBackupJson || handleDefaultExportBackup}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4 text-teal-400" />
            <span>{SETTINGS_UI.backupJson[selectedLanguage] || 'Backup JSON'}</span>
          </button>

          <label className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition active:scale-95 cursor-pointer">
            <Upload className="w-4 h-4 text-emerald-400" />
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

      {/* 4. Danger Zone */}
      <div className="bg-slate-900/80 p-5 rounded-3xl border border-red-900/40 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
          <ShieldAlert className="w-4 h-4" />
          <span>{SETTINGS_UI.dangerZone[selectedLanguage] || 'Data Reset Controls'}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onGlobalReset}
            className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-200 text-xs font-bold transition active:scale-95 cursor-pointer"
          >
            {SETTINGS_UI.resetCounters[selectedLanguage] || 'Reset All Counters to 0'}
          </button>

          <button
            onClick={onRestoreDefaults}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition active:scale-95 cursor-pointer"
          >
            {SETTINGS_UI.restoreAzkar[selectedLanguage] || 'Restore Default Azkar'}
          </button>
        </div>
      </div>
    </div>
  );
};
