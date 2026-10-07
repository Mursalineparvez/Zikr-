import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles } from 'lucide-react';
import { ZikrItem } from '../types';
import { PRESET_ZIKR_SUGGESTIONS } from '../utils/constants';

interface ZikrModalProps {
  isOpen: boolean;
  zikrToEdit: ZikrItem | null;
  onSave: (data: Omit<ZikrItem, 'id' | 'createdAt' | 'count' | 'updatedAt'>, id?: string) => void;
  onClose: () => void;
}

export const ZikrModal: React.FC<ZikrModalProps> = ({
  isOpen,
  zikrToEdit,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [arabic, setArabic] = useState('');
  const [transliteration, setTransliteration] = useState('');
  const [meaning, setMeaning] = useState('');
  const [target, setTarget] = useState(33);

  useEffect(() => {
    if (zikrToEdit) {
      setName(zikrToEdit.name);
      setArabic(zikrToEdit.arabic || '');
      setTransliteration(zikrToEdit.transliteration || '');
      setMeaning(zikrToEdit.meaning || '');
      setTarget(zikrToEdit.target || 33);
    } else {
      setName('');
      setArabic('');
      setTransliteration('');
      setMeaning('');
      setTarget(33);
    }
  }, [zikrToEdit, isOpen]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave(
      {
        name: name.trim(),
        arabic: arabic.trim() || undefined,
        transliteration: transliteration.trim() || undefined,
        meaning: meaning.trim() || undefined,
        target: Number(target) || 33,
      },
      zikrToEdit ? zikrToEdit.id : undefined
    );
    onClose();
  };

  const handleApplyPreset = (preset: typeof PRESET_ZIKR_SUGGESTIONS[0]) => {
    setName(preset.name);
    setArabic(preset.arabic);
    setTransliteration(preset.transliteration);
    setMeaning(preset.meaning);
    setTarget(preset.target);
  };

  const node = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-[#0a2528] border border-[#1e6065] p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-950 border border-emerald-600/40 text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </span>
            {zikrToEdit ? 'Edit Zikr Counter' : 'Add Custom Zikr'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure individual counter parameters, Arabic calligraphy, and target goal.
          </p>
        </div>

        {/* Quick Authentic Azkar Presets */}
        {!zikrToEdit && (
          <div className="mb-5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
            <label className="block text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Select Instant Authentic Preset
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
              {PRESET_ZIKR_SUGGESTIONS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="text-xs px-2.5 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/90 text-emerald-200 border border-emerald-800/40 transition active:scale-95 text-left cursor-pointer"
                >
                  <span className="font-semibold">{preset.name}</span>
                  <span className="text-[10px] text-amber-300 ml-1.5 font-bold">({preset.target})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Zikr Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. SubhanAllah, Istighfar, HasbunAllah..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Arabic Script (Optional)
            </label>
            <input
              type="text"
              dir="rtl"
              value={arabic}
              onChange={(e) => setArabic(e.target.value)}
              placeholder="سُبْحَانَ ٱللَّٰهِ"
              className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 font-arabic text-lg text-emerald-300 placeholder-slate-600 focus:outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Transliteration
              </label>
              <input
                type="text"
                value={transliteration}
                onChange={(e) => setTransliteration(e.target.value)}
                placeholder="e.g. Subḥān Allāh"
                className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Invocations
              </label>
              <input
                type="number"
                min="1"
                max="1000000"
                value={target}
                onChange={(e) => setTarget(parseInt(e.target.value, 10) || 1)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              English Meaning / Reflection
            </label>
            <input
              type="text"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="e.g. Glory be to Allah, Lord of the Worlds"
              className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none transition"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#006747] hover:bg-[#154f53] text-white font-bold text-sm shadow-lg shadow-[#135d66]/40 transition active:scale-95 cursor-pointer"
            >
              {zikrToEdit ? 'Update Zikr' : 'Add Zikr'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(node, document.body);
};
