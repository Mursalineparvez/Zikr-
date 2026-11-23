import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Bookmark,
  Pencil,
  FileText,
  Plus,
  Trash2,
  Copy,
  Check,
  Edit3,
  BookOpen,
  X,
  ArrowLeft,
  Search,
  ChevronRight,
  ChevronDown,
  Link2,
  ListChecks,
  Image as ImageIcon,
  Quote,
  Pin,
  PinOff,
  FolderPlus,
  FolderInput,
  ExternalLink,
  Maximize2,
  CheckSquare,
  Square,
  Sparkles,
} from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import { ContentShareModal, ShareDownloadButtons } from './ContentShareModal';
import { ShareableContent } from '../utils/shareDownload';
import {
  SavedTopic,
  TopicAccentColor,
  TOPIC_ACCENT_STYLES,
  VaultItemKind,
  SavedChecklistEntry,
  NormalizedSavedEntry,
  HighlightColor,
  HIGHLIGHT_COLOR_STYLES,
  getAllSavedTopics,
  getCustomTopics,
  createCustomTopic,
  updateCustomTopic,
  deleteCustomTopic,
  getAllSavedNormalizedEntries,
  saveOrUpdateVaultItem,
  removeVaultItem,
  toggleVaultChecklistRow,
  compressImageForStorage,
  saveOrUpdateNote,
  removeSavedNote,
  updateSavedHighlightColor,
  updateSavedHighlightNote,
  removeSavedHighlight,
  removeUnifiedBookmark,
  reassignSavedEntryTopic,
  togglePinSavedEntry,
} from '../utils/savedItems';

type TypeFilter = 'all' | VaultItemKind | 'highlight';

interface SavedViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onNavigateToQuran?: () => void;
  onBackToHub?: () => void;
  initialTab?: 'bookmarks' | 'highlights' | 'notes';
}

const toBnDigits = (num: number | string) =>
  String(num).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

const TOPIC_EMOJI_OPTIONS = ['📁', '📖', '📜', '🤲', '🕌', '🌙', '💎', '📝', '🔖', '⭐', '🎓', '🌿'];

const HIGHLIGHT_COLORS: HighlightColor[] = ['amber', 'emerald', 'rose', 'teal'];
const ACCENT_KEYS: TopicAccentColor[] = ['emerald', 'teal', 'amber', 'rose', 'indigo', 'violet'];

export const SavedView: React.FC<SavedViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onNavigateToQuran,
  onBackToHub,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  const [topics, setTopics] = useState<SavedTopic[]>([]);
  const [entries, setEntries] = useState<NormalizedSavedEntry[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [onlyPinned, setOnlyPinned] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [collapsedTopics, setCollapsedTopics] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [moveTopicEntryId, setMoveTopicEntryId] = useState<string | null>(null);
  const [editingHighlightNoteId, setEditingHighlightNoteId] = useState<string | null>(null);
  const [highlightNoteDraft, setHighlightNoteDraft] = useState('');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; caption?: string } | null>(null);
  const [shareState, setShareState] = useState<{
    content: ShareableContent;
    focus: 'share' | 'download';
  } | null>(null);

  // Universal "Save Anything" Composer Modal state
  const [composerOpen, setComposerOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<NormalizedSavedEntry | null>(null);
  const [formKind, setFormKind] = useState<VaultItemKind>('note');
  const [formTopicId, setFormTopicId] = useState<string>('study_notes');
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formArabic, setFormArabic] = useState('');
  const [formReference, setFormReference] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formImageDataUrl, setFormImageDataUrl] = useState<string | undefined>(undefined);
  const [formChecklist, setFormChecklist] = useState<SavedChecklistEntry[]>([
    { id: 'row_1', text: '', done: false },
  ]);
  const [formAccent, setFormAccent] = useState<TopicAccentColor>('emerald');
  const [formPinned, setFormPinned] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Inline Quick Custom Topic creation inside composer
  const [inlineTopicCreate, setInlineTopicCreate] = useState(false);
  const [inlineTopicName, setInlineTopicName] = useState('');

  // Topic Manager Modal state
  const [topicModalOpen, setTopicModalOpen] = useState(false);
  const [editingCustomTopic, setEditingCustomTopic] = useState<SavedTopic | null>(null);
  const [topicNameDraft, setTopicNameDraft] = useState('');
  const [topicDescDraft, setTopicDescDraft] = useState('');
  const [topicEmojiDraft, setTopicEmojiDraft] = useState('📁');
  const [topicAccentDraft, setTopicAccentDraft] = useState<TopicAccentColor>('emerald');

  const refreshAll = () => {
    setTopics(getAllSavedTopics());
    setEntries(getAllSavedNormalizedEntries());
  };

  useEffect(() => {
    refreshAll();
    const handleSync = () => refreshAll();
    window.addEventListener('zikrplus-saved-updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('zikrplus-saved-updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Topic counts across ALL items (for Topic Bar)
  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    entries.forEach((e) => {
      counts[e.topicId] = (counts[e.topicId] || 0) + 1;
    });
    return counts;
  }, [entries]);

  const pinnedCount = useMemo(() => entries.filter((e) => e.pinned).length, [entries]);
  const activeTopicTotal = useMemo(
    () => topics.filter((t) => (topicCounts[t.id] || 0) > 0).length,
    [topics, topicCounts]
  );

  // Topics shown in navigator (custom topics always visible, built-in topics visible if non-empty or if library has items)
  const visibleNavigatorTopics = useMemo(() => {
    return topics.filter((t) => t.isCustom || (topicCounts[t.id] || 0) > 0);
  }, [topics, topicCounts]);

  // Filtered entries
  const filteredEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return entries.filter((e) => {
      if (selectedTopicId !== 'all' && e.topicId !== selectedTopicId) return false;
      if (typeFilter !== 'all' && e.displayKind !== typeFilter) return false;
      if (onlyPinned && !e.pinned) return false;
      if (!q) return true;
      const checkText = (e.checklist || []).map((c) => c.text).join(' ').toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        (e.body && e.body.toLowerCase().includes(q)) ||
        (e.arabic && e.arabic.includes(q)) ||
        (e.reference && e.reference.toLowerCase().includes(q)) ||
        (e.url && e.url.toLowerCase().includes(q)) ||
        (e.highlightNote && e.highlightNote.toLowerCase().includes(q)) ||
        checkText.includes(q)
      );
    });
  }, [entries, selectedTopicId, typeFilter, onlyPinned, searchQuery]);

  // Grouped by Topic sections
  const groupedByTopic = useMemo(() => {
    const map = new Map<string, NormalizedSavedEntry[]>();
    filteredEntries.forEach((entry) => {
      const list = map.get(entry.topicId) || [];
      list.push(entry);
      map.set(entry.topicId, list);
    });

    const orderedGroups: Array<{ topic: SavedTopic; items: NormalizedSavedEntry[] }> = [];
    topics.forEach((topic) => {
      const items = map.get(topic.id);
      if (items && items.length > 0) {
        orderedGroups.push({ topic, items });
      } else if (selectedTopicId === topic.id) {
        orderedGroups.push({ topic, items: [] });
      }
    });
    return orderedGroups;
  }, [filteredEntries, topics, selectedTopicId]);

  const handleCopy = (id: string, text: string) => {
    try {
      navigator.clipboard?.writeText?.(text)?.catch?.(() => {});
    } catch {}
    setCopiedId(id);
    if (soundEnabled) soundHaptics.playTap();
    setTimeout(() => setCopiedId(null), 1800);
  };

  const formatDate = (ts: number) => {
    if (!ts) return '';
    try {
      return new Date(ts).toLocaleDateString(isBn ? 'bn-BD' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const formatNum = (n: number) => (isBn ? toBnDigits(n) : String(n));

  const kindLabel = (k: NormalizedSavedEntry['displayKind']) => {
    switch (k) {
      case 'note':
        return isBn ? 'নোট' : 'Note';
      case 'quote':
        return isBn ? 'উক্তি ও আয়াত' : 'Quote';
      case 'link':
        return isBn ? 'ওয়েব লিংক' : 'Link';
      case 'checklist':
        return isBn ? 'চেকলিস্ট' : 'Checklist';
      case 'image':
        return isBn ? 'ছবি' : 'Image';
      case 'highlight':
        return isBn ? 'হাইলাইট' : 'Highlight';
      case 'bookmark':
        return isBn ? 'বুকমার্ক' : 'Bookmark';
    }
  };

  const renderKindIcon = (k: NormalizedSavedEntry['displayKind'], className = 'w-3.5 h-3.5') => {
    switch (k) {
      case 'note':
        return <FileText className={className} />;
      case 'quote':
        return <Quote className={className} />;
      case 'link':
        return <Link2 className={className} />;
      case 'checklist':
        return <ListChecks className={className} />;
      case 'image':
        return <ImageIcon className={className} />;
      case 'highlight':
        return <Pencil className={className} />;
      case 'bookmark':
        return <Bookmark className={className} />;
    }
  };

  // ---------- Composer Open / Edit / Submit ----------

  const openComposer = (opts?: {
    presetTopicId?: string;
    presetKind?: VaultItemKind;
    entryToEdit?: NormalizedSavedEntry;
  }) => {
    setFormError(null);
    setInlineTopicCreate(false);
    setInlineTopicName('');

    if (opts?.entryToEdit) {
      const e = opts.entryToEdit;
      setEditingEntry(e);
      if (e.origin === 'note' && e.rawNote) {
        setFormKind('note');
        setFormTopicId(e.topicId);
        setFormTitle(e.rawNote.title);
        setFormContent(e.rawNote.content);
        setFormArabic('');
        setFormReference(e.rawNote.source || '');
        setFormUrl('');
        setFormImageDataUrl(undefined);
        setFormChecklist([{ id: 'row_1', text: '', done: false }]);
        setFormAccent('emerald');
        setFormPinned(e.pinned);
      } else if (e.origin === 'vault' && e.rawVault) {
        const v = e.rawVault;
        setFormKind(v.kind);
        setFormTopicId(v.topicId);
        setFormTitle(v.title);
        setFormContent(v.content || '');
        setFormArabic(v.arabic || '');
        setFormReference(v.reference || '');
        setFormUrl(v.url || '');
        setFormImageDataUrl(v.imageDataUrl);
        setFormChecklist(
          v.checklist && v.checklist.length > 0
            ? v.checklist
            : [{ id: 'row_1', text: '', done: false }]
        );
        setFormAccent(v.accent || 'emerald');
        setFormPinned(Boolean(v.pinned));
      }
    } else {
      setEditingEntry(null);
      setFormKind(opts?.presetKind || 'note');
      setFormTopicId(
        opts?.presetTopicId && opts.presetTopicId !== 'all'
          ? opts.presetTopicId
          : selectedTopicId !== 'all'
          ? selectedTopicId
          : 'study_notes'
      );
      setFormTitle('');
      setFormContent('');
      setFormArabic('');
      setFormReference('');
      setFormUrl('');
      setFormImageDataUrl(undefined);
      setFormChecklist([
        { id: `row_${Date.now()}_1`, text: '', done: false },
        { id: `row_${Date.now()}_2`, text: '', done: false },
      ]);
      setFormAccent('emerald');
      setFormPinned(false);
    }

    setComposerOpen(true);
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleImageFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormError(null);
    setIsProcessingImage(true);
    try {
      const compressed = await compressImageForStorage(file, 720, 0.72);
      setFormImageDataUrl(compressed);
      if (!formTitle.trim()) {
        setFormTitle(file.name.replace(/\.[^.]+$/, '') || (isBn ? 'সংরক্ষিত ছবি' : 'Saved Image'));
      }
    } catch {
      setFormError(isBn ? 'ছবিটি প্রসেস করা যায়নি, অনুগ্রহ করে অন্য ছবি দিন।' : 'Could not process image.');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleComposerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Handle inline custom topic if user entered one
    let targetTopicId = formTopicId;
    if (inlineTopicCreate && inlineTopicName.trim()) {
      const newTopic = createCustomTopic({ name: inlineTopicName.trim(), accent: formAccent });
      targetTopicId = newTopic.id;
    }

    if (formKind === 'link' && !formUrl.trim()) {
      setFormError(isBn ? 'অনুগ্রহ করে একটি ওয়েব লিংক (URL) লিখুন।' : 'Please enter a valid URL.');
      return;
    }
    if (formKind === 'image' && !formImageDataUrl) {
      setFormError(isBn ? 'অনুগ্রহ করে একটি ছবি নির্বাচন করুন।' : 'Please choose an image file.');
      return;
    }
    if (formKind === 'checklist') {
      const nonEmpty = formChecklist.filter((r) => r.text.trim());
      if (nonEmpty.length === 0) {
        setFormError(isBn ? 'চেকলিস্টে অন্তত একটি আইটেম লিখুন।' : 'Add at least one checklist item.');
        return;
      }
    }

    if (editingEntry?.origin === 'note' && editingEntry.rawNote) {
      saveOrUpdateNote(formTitle, formContent, formReference, editingEntry.rawNote.id, targetTopicId);
      setComposerOpen(false);
      setEditingEntry(null);
      refreshAll();
      if (soundEnabled) soundHaptics.playMilestone();
      return;
    }

    let safeUrl = formUrl.trim();
    if (safeUrl && !/^https?:\/\//i.test(safeUrl)) {
      safeUrl = `https://${safeUrl}`;
    }

    const res = saveOrUpdateVaultItem({
      id: editingEntry?.origin === 'vault' ? editingEntry.id : undefined,
      kind: formKind,
      topicId: targetTopicId,
      title:
        formTitle.trim() ||
        (formKind === 'quote'
          ? isBn ? 'সংরক্ষিত উক্তি' : 'Saved Quote'
          : formKind === 'link'
          ? safeUrl
          : formKind === 'checklist'
          ? isBn ? 'আমলের তালিকা' : 'Checklist'
          : isBn ? 'ব্যক্তিগত নোট' : 'Personal Note'),
      content: formContent,
      arabic: formArabic,
      reference: formReference,
      url: formKind === 'link' ? safeUrl : undefined,
      imageDataUrl: formKind === 'image' ? formImageDataUrl : undefined,
      checklist: formKind === 'checklist' ? formChecklist : undefined,
      accent: formAccent,
      pinned: formPinned,
    });

    if (!res.ok) {
      setFormError(
        res.quotaExceeded
          ? isBn
            ? 'স্টোরেজ সীমা পূর্ণ হয়ে গেছে! পুরনো বড় ছবি মুছে আবার চেষ্টা করুন।'
            : 'Browser storage quota reached. Please remove a large image and retry.'
          : isBn
          ? 'সংরক্ষণ করতে সমস্যা হয়েছে।'
          : 'Could not save item.'
      );
      return;
    }

    setComposerOpen(false);
    setEditingEntry(null);
    refreshAll();
    if (soundEnabled) soundHaptics.playMilestone();
  };

  // ---------- Topic Manager Submit ----------

  const openTopicModal = (topicToEdit?: SavedTopic) => {
    if (topicToEdit) {
      setEditingCustomTopic(topicToEdit);
      setTopicNameDraft(isBn ? topicToEdit.nameBn : topicToEdit.nameEn);
      setTopicDescDraft((isBn ? topicToEdit.descBn : topicToEdit.descEn) || '');
      setTopicEmojiDraft(topicToEdit.emoji || '📁');
      setTopicAccentDraft(topicToEdit.accent || 'emerald');
    } else {
      setEditingCustomTopic(null);
      setTopicNameDraft('');
      setTopicDescDraft('');
      setTopicEmojiDraft('📁');
      setTopicAccentDraft('emerald');
    }
    setTopicModalOpen(true);
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleSaveCustomTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicNameDraft.trim()) return;
    if (editingCustomTopic) {
      updateCustomTopic(editingCustomTopic.id, {
        name: topicNameDraft,
        desc: topicDescDraft,
        emoji: topicEmojiDraft,
        accent: topicAccentDraft,
      });
    } else {
      const created = createCustomTopic({
        name: topicNameDraft,
        desc: topicDescDraft,
        emoji: topicEmojiDraft,
        accent: topicAccentDraft,
      });
      setSelectedTopicId(created.id);
    }
    setTopicModalOpen(false);
    refreshAll();
    if (soundEnabled) soundHaptics.playMilestone();
  };

  // ---------- Share Helpers ----------

  const buildEntryShareText = (entry: NormalizedSavedEntry) => {
    const parts: string[] = [];
    if (entry.arabic) parts.push(entry.arabic);
    if (entry.body) parts.push(entry.body);
    if (entry.checklist?.length) {
      parts.push(entry.checklist.map((c) => `${c.done ? '✅' : '⬜'} ${c.text}`).join('\n'));
    }
    if (entry.url) parts.push(`🔗 ${entry.url}`);
    if (entry.highlightNote) parts.push(`📝 ${entry.highlightNote}`);
    if (entry.reference) parts.push(`— ${entry.reference}`);
    return parts.join('\n\n') || entry.title;
  };

  const openTopicShare = (topic: SavedTopic, items: NormalizedSavedEntry[], focus: 'share' | 'download') => {
    const body = items
      .map((item, idx) => `${idx + 1}. ${item.title}\n${buildEntryShareText(item)}`)
      .join('\n\n────────────────────\n\n');
    setShareState({
      focus,
      content: {
        badge: isBn ? topic.nameBn : topic.nameEn,
        title: `${topic.emoji} ${isBn ? topic.nameBn : topic.nameEn}`,
        subtitle: isBn ? `${formatNum(items.length)}টি সংরক্ষিত আইটেম` : `${items.length} Saved Items`,
        body: body || (isBn ? 'এই টপিকে এখনো কোনো আইটেম নেই।' : 'No items in this topic yet.'),
        fullDocumentText: body || undefined,
        fileNamePrefix: `ZikrPlus-Topic-${topic.id}`,
      },
    });
  };

  const openLibraryShare = (focus: 'share' | 'download') => {
    const fullDoc = groupedByTopic
      .map(({ topic, items }) => {
        const header = `=== ${topic.emoji} ${isBn ? topic.nameBn : topic.nameEn} (${items.length}) ===`;
        const body = items
          .map((item, i) => `${i + 1}. ${item.title} [${kindLabel(item.displayKind)}]\n${buildEntryShareText(item)}`)
          .join('\n\n');
        return `${header}\n${body}`;
      })
      .join('\n\n====================================\n\n');

    setShareState({
      focus,
      content: {
        badge: isBn ? 'সংরক্ষিত লাইব্রেরি' : 'Saved Library',
        title: isBn ? 'আমার টপিকভিত্তিক ইসলামিক লাইব্রেরি' : 'My Topic-Organized Saved Library',
        subtitle: isBn
          ? `মোট ${formatNum(entries.length)}টি সংরক্ষিত · ${formatNum(activeTopicTotal)}টি টপিক`
          : `${entries.length} Saved · ${activeTopicTotal} Topics`,
        body: fullDoc || (isBn ? 'এখনো কোনো কিছু সংরক্ষণ করা হয়নি।' : 'Nothing saved yet.'),
        fullDocumentText: fullDoc || undefined,
        fileNamePrefix: 'ZikrPlus-Saved-Library',
      },
    });
  };

  const handleDeleteEntry = (entry: NormalizedSavedEntry) => {
    if (entry.origin === 'vault') removeVaultItem(entry.id);
    else if (entry.origin === 'note') removeSavedNote(entry.id);
    else if (entry.origin === 'highlight') removeSavedHighlight(entry.id);
    else if (entry.origin === 'bookmark' && entry.rawBookmark) removeUnifiedBookmark(entry.rawBookmark);
    refreshAll();
    if (soundEnabled) soundHaptics.playTap();
  };

  const renderEntryCard = (entry: NormalizedSavedEntry) => {
    const topicObj = topics.find((t) => t.id === entry.topicId);
    const hlColorObj =
      entry.origin === 'highlight' && entry.highlightColor
        ? HIGHLIGHT_COLOR_STYLES[entry.highlightColor]
        : null;
    const checkDoneCount = entry.checklist ? entry.checklist.filter((c) => c.done).length : 0;
    const checkTotalCount = entry.checklist ? entry.checklist.length : 0;

    let cardClasses = isDay
      ? 'bg-white border-slate-200/90 hover:border-emerald-300 shadow-2xs'
      : 'bg-[#0b262d] border-[#17444e] hover:border-emerald-700/60';
    if (hlColorObj) {
      cardClasses = isDay ? hlColorObj.cardDayClass : hlColorObj.cardNightClass;
    }

    return (
      <div
        key={entry.id}
        className={`p-4 sm:p-5 rounded-2xl border transition flex flex-col justify-between gap-3 ${cardClasses}`}
      >
        <div className="space-y-2.5">
          {/* Top Metadata & Action Strip */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div
                className={`text-[11px] font-semibold flex flex-wrap items-center gap-1.5 ${
                  isDay ? 'text-[#006A4E]' : 'text-emerald-400'
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  {renderKindIcon(entry.displayKind, 'w-3 h-3')}
                  <span>{kindLabel(entry.displayKind)}</span>
                </span>
                {entry.reference && (
                  <>
                    <span aria-hidden="true" className="opacity-45">·</span>
                    <span className="truncate max-w-[170px] opacity-85">{entry.reference}</span>
                  </>
                )}
                {(entry.updatedAt || entry.createdAt) > 0 && (
                  <>
                    <span aria-hidden="true" className="opacity-45">·</span>
                    <span className="opacity-65 whitespace-nowrap">
                      {formatDate(entry.updatedAt || entry.createdAt)}
                    </span>
                  </>
                )}
              </div>
              <h4 className="font-bold text-sm sm:text-base leading-snug mt-0.5 text-balance">
                {entry.title}
              </h4>
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  togglePinSavedEntry(entry.origin, entry.id);
                  refreshAll();
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`min-w-[34px] min-h-[34px] rounded-xl flex items-center justify-center transition cursor-pointer ${
                  entry.pinned
                    ? 'text-amber-500 bg-amber-500/15'
                    : 'text-slate-400 hover:text-amber-500 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
                title={entry.pinned ? (isBn ? 'আনপিন করুন' : 'Unpin') : isBn ? 'পিন করুন' : 'Pin'}
              >
                {entry.pinned ? <Pin className="w-3.5 h-3.5 fill-current" /> : <PinOff className="w-3.5 h-3.5" />}
              </button>

              <ShareDownloadButtons
                variant="compact"
                selectedLanguage={selectedLanguage}
                themeMode={themeMode}
                onShare={() =>
                  setShareState({
                    focus: 'share',
                    content: {
                      badge: topicObj ? (isBn ? topicObj.nameBn : topicObj.nameEn) : kindLabel(entry.displayKind),
                      title: entry.title,
                      arabic: entry.arabic,
                      body: buildEntryShareText(entry),
                      reference: entry.reference,
                      fileNamePrefix: 'ZikrPlus-Saved-Item',
                    },
                  })
                }
                onDownload={() =>
                  setShareState({
                    focus: 'download',
                    content: {
                      badge: topicObj ? (isBn ? topicObj.nameBn : topicObj.nameEn) : kindLabel(entry.displayKind),
                      title: entry.title,
                      arabic: entry.arabic,
                      body: buildEntryShareText(entry),
                      reference: entry.reference,
                      fileNamePrefix: 'ZikrPlus-Saved-Item',
                    },
                  })
                }
              />

              {(entry.origin === 'vault' || entry.origin === 'note') && (
                <button
                  type="button"
                  onClick={() => openComposer({ entryToEdit: entry })}
                  className="min-w-[34px] min-h-[34px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-emerald-500 cursor-pointer"
                  title={isBn ? 'সম্পাদনা' : 'Edit'}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={() => handleCopy(entry.id, `${entry.title}\n\n${buildEntryShareText(entry)}`)}
                className="min-w-[34px] min-h-[34px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-emerald-500 cursor-pointer"
                title={isBn ? 'কপি' : 'Copy'}
              >
                {copiedId === entry.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => handleDeleteEntry(entry)}
                className="min-w-[34px] min-h-[34px] rounded-xl flex items-center justify-center hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 cursor-pointer"
                title={isBn ? 'মুছে ফেলুন' : 'Delete'}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Image Attachment Preview */}
          {entry.imageDataUrl && (
            <div className="relative rounded-xl overflow-hidden border border-black/10 dark:border-white/10 group">
              <img
                src={entry.imageDataUrl}
                alt={entry.title}
                onClick={() =>
                  setLightboxImage({
                    src: entry.imageDataUrl!,
                    title: entry.title,
                    caption: entry.body,
                  })
                }
                className="w-full max-h-56 object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <button
                type="button"
                onClick={() =>
                  setLightboxImage({
                    src: entry.imageDataUrl!,
                    title: entry.title,
                    caption: entry.body,
                  })
                }
                className="absolute bottom-2 right-2 p-2 rounded-xl bg-black/60 text-white backdrop-blur-xs hover:bg-black/80 cursor-pointer"
                aria-label={isBn ? 'বড় করে দেখুন' : 'Zoom image'}
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Arabic Text Block */}
          {entry.arabic && (
            <p
              dir="rtl"
              className="font-arabic text-lg sm:text-xl leading-loose text-[#006A4E] dark:text-emerald-300 pt-0.5"
            >
              {entry.arabic}
            </p>
          )}

          {/* Body / Translation / Quote */}
          {entry.body && (
            <p
              className={`text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                entry.displayKind === 'quote'
                  ? 'italic font-medium'
                  : isDay
                  ? 'text-slate-700'
                  : 'text-slate-200'
              }`}
            >
              {entry.displayKind === 'quote' ? `“${entry.body}”` : entry.body}
            </p>
          )}

          {/* External Link Action */}
          {entry.url && (
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition ${
                isDay
                  ? 'bg-emerald-50/70 border-emerald-200 text-[#006A4E] hover:bg-emerald-100/70'
                  : 'bg-[#071b20] border-[#194a55] text-emerald-300 hover:bg-[#0e2d35]'
              }`}
            >
              <span className="truncate flex items-center gap-2 min-w-0">
                <Link2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{entry.url.replace(/^https?:\/\//i, '')}</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          )}

          {/* Interactive Checklist */}
          {entry.checklist && entry.checklist.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-semibold opacity-75">
                <span>
                  {isBn
                    ? `${formatNum(checkDoneCount)} / ${formatNum(checkTotalCount)} সম্পন্ন`
                    : `${checkDoneCount} / ${checkTotalCount} completed`}
                </span>
                <span className="font-mono tabular-nums">
                  {Math.round((checkDoneCount / Math.max(1, checkTotalCount)) * 100)}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${Math.round((checkDoneCount / Math.max(1, checkTotalCount)) * 100)}%` }}
                />
              </div>
              <div className="space-y-1 pt-1">
                {entry.checklist.map((row) => (
                  <button
                    key={row.id}
                    type="button"
                    onClick={() => {
                      toggleVaultChecklistRow(entry.id, row.id);
                      refreshAll();
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`w-full min-h-[38px] px-2.5 py-1.5 rounded-xl flex items-center gap-2.5 text-left text-xs sm:text-sm transition cursor-pointer ${
                      row.done
                        ? 'opacity-60 line-through'
                        : isDay
                        ? 'hover:bg-slate-100/80'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    {row.done ? (
                      <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="flex-1">{row.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Highlight Personal Note */}
          {entry.origin === 'highlight' && entry.highlightNote && editingHighlightNoteId !== entry.id && (
            <div className="px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-xs italic opacity-85 border border-black/10 dark:border-white/10">
              📝 {entry.highlightNote}
            </div>
          )}

          {entry.origin === 'highlight' && editingHighlightNoteId === entry.id && (
            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                value={highlightNoteDraft}
                onChange={(e) => setHighlightNoteDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateSavedHighlightNote(entry.id, highlightNoteDraft);
                    setEditingHighlightNoteId(null);
                    refreshAll();
                  }
                }}
                placeholder={isBn ? 'হাইলাইটে নোট লিখুন...' : 'Write a note for this highlight...'}
                className={`flex-1 min-w-0 min-h-[40px] px-3 py-1.5 rounded-xl border text-xs focus:outline-none ${
                  isDay ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#07181d] border-[#1f5563] text-white'
                }`}
              />
              <button
                type="button"
                onClick={() => {
                  updateSavedHighlightNote(entry.id, highlightNoteDraft);
                  setEditingHighlightNoteId(null);
                  refreshAll();
                  if (soundEnabled) soundHaptics.playMilestone();
                }}
                className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#006A4E] text-white text-xs font-bold cursor-pointer"
              >
                {isBn ? 'সেভ' : 'Save'}
              </button>
            </div>
          )}
        </div>

        {/* Footer: Topic Move + Highlight Color Controls + Quran Jump */}
        <div className="pt-2.5 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Move Topic Control */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoveTopicEntryId((prev) => (prev === entry.id ? null : entry.id))}
                className={`min-h-[34px] px-2.5 py-1 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                  isDay
                    ? 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#006A4E]'
                    : 'bg-[#07191e] hover:bg-[#11353e] text-slate-300 hover:text-emerald-300'
                }`}
                title={isBn ? 'অন্য টপিকে সরান' : 'Move to another topic'}
              >
                <FolderInput className="w-3.5 h-3.5" />
                <span>{topicObj ? `${topicObj.emoji} ${isBn ? topicObj.nameBn : topicObj.nameEn}` : isBn ? 'টপিক বদলান' : 'Topic'}</span>
              </button>

              {moveTopicEntryId === entry.id && (
                <div
                  className={`absolute left-0 bottom-full mb-1.5 z-30 w-60 max-h-60 overflow-y-auto rounded-2xl border p-1.5 shadow-xl ${
                    isDay ? 'bg-white border-slate-200' : 'bg-[#092128] border-[#1b505d]'
                  }`}
                >
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider opacity-60">
                    {isBn ? 'টপিক নির্বাচন করুন' : 'Move to Topic'}
                  </div>
                  {topics.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        reassignSavedEntryTopic(entry.origin, entry.id, t.id);
                        setMoveTopicEntryId(null);
                        refreshAll();
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between gap-2 cursor-pointer transition ${
                        entry.topicId === t.id
                          ? isDay
                            ? 'bg-emerald-50 text-[#006A4E]'
                            : 'bg-emerald-950/60 text-emerald-300'
                          : isDay
                          ? 'hover:bg-slate-100 text-slate-700'
                          : 'hover:bg-white/5 text-slate-200'
                      }`}
                    >
                      <span className="truncate flex items-center gap-1.5">
                        <span>{t.emoji}</span>
                        <span className="truncate">{isBn ? t.nameBn : t.nameEn}</span>
                      </span>
                      {entry.topicId === t.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Highlight Color Switcher */}
            {entry.origin === 'highlight' && (
              <div className="flex items-center gap-1">
                {HIGHLIGHT_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      updateSavedHighlightColor(entry.id, c);
                      refreshAll();
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`w-4 h-4 rounded-full ${HIGHLIGHT_COLOR_STYLES[c].dotClass} border transition cursor-pointer ${
                      entry.highlightColor === c
                        ? 'border-slate-900 dark:border-white scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title={isBn ? HIGHLIGHT_COLOR_STYLES[c].labelBn : HIGHLIGHT_COLOR_STYLES[c].labelEn}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {entry.origin === 'highlight' && (
              <button
                type="button"
                onClick={() => {
                  if (editingHighlightNoteId === entry.id) {
                    setEditingHighlightNoteId(null);
                  } else {
                    setEditingHighlightNoteId(entry.id);
                    setHighlightNoteDraft(entry.highlightNote || '');
                  }
                }}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold hover:bg-black/5 dark:hover:bg-white/10 opacity-85 hover:opacity-100 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>{entry.highlightNote ? (isBn ? 'নোট সম্পাদনা' : 'Edit Note') : (isBn ? 'নোট লিখুন' : 'Add Note')}</span>
              </button>
            )}

            {entry.rawBookmark?.kind === 'quran' && onNavigateToQuran && (
              <button
                type="button"
                onClick={onNavigateToQuran}
                className={`text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                  isDay ? 'text-[#006A4E] hover:underline' : 'text-emerald-400 hover:underline'
                }`}
              >
                <span>{isBn ? 'কোরআনে দেখুন' : 'Open Quran'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const quickTemplates: Array<{ kind: VaultItemKind; icon: React.ReactNode; labelBn: string; labelEn: string }> = [
    { kind: 'note', icon: <FileText className="w-4 h-4" />, labelBn: 'নোট / লেখা', labelEn: 'Note' },
    { kind: 'quote', icon: <Quote className="w-4 h-4" />, labelBn: 'আয়াত / হাদীস / উক্তি', labelEn: 'Quote / Ayah' },
    { kind: 'link', icon: <Link2 className="w-4 h-4" />, labelBn: 'গুরুত্বপূর্ণ লিংক', labelEn: 'Web Link' },
    { kind: 'checklist', icon: <ListChecks className="w-4 h-4" />, labelBn: 'আমল চেকলিস্ট', labelEn: 'Checklist' },
    { kind: 'image', icon: <ImageIcon className="w-4 h-4" />, labelBn: 'ছবি / স্ক্রিনশট', labelEn: 'Image' },
    { kind: 'bookmark', icon: <Bookmark className="w-4 h-4" />, labelBn: 'বুকমার্ক', labelEn: 'Bookmark' },
  ];

  const typeFilters: Array<{ id: TypeFilter; labelBn: string; labelEn: string }> = [
    { id: 'all', labelBn: 'সব ধরন', labelEn: 'All Types' },
    { id: 'note', labelBn: 'নোট', labelEn: 'Notes' },
    { id: 'quote', labelBn: 'উক্তি', labelEn: 'Quotes' },
    { id: 'link', labelBn: 'লিংক', labelEn: 'Links' },
    { id: 'checklist', labelBn: 'চেকলিস্ট', labelEn: 'Checklists' },
    { id: 'image', labelBn: 'ছবি', labelEn: 'Images' },
    { id: 'highlight', labelBn: 'হাইলাইট', labelEn: 'Highlights' },
    { id: 'bookmark', labelBn: 'বুকমার্ক', labelEn: 'Bookmarks' },
  ];

  return (
    <div
      className={`rounded-3xl border overflow-hidden flex flex-col min-h-[620px] transition-colors ${
        isDay
          ? 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
          : 'bg-[#071c21] border-[#143b44] text-white shadow-xl'
      }`}
    >
      {/* Clean Centered Sanctuary Header */}
      <div
        className={`px-4 pt-4 pb-4 sm:px-7 sm:pt-5 border-b space-y-3.5 ${
          isDay ? 'border-slate-200/75' : 'border-[#133841]'
        }`}
      >
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
          {/* Left: Back Button */}
          <div className="flex items-center">
            {onBackToHub ? (
              <button
                type="button"
                onClick={onBackToHub}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition active:scale-95 cursor-pointer ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    : 'bg-[#0c2930] border-[#194a55] text-emerald-300 hover:bg-[#123840]'
                }`}
                aria-label={isBn ? 'ফিরে যান' : 'Back'}
                title={isBn ? 'ফিরে যান' : 'Back'}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-10" />
            )}
          </div>

          {/* Center: Centered Title + Concise Metadata */}
          <div className="text-center min-w-0 px-1">
            <h2
              className={`text-lg sm:text-xl font-black tracking-tight truncate ${
                isDay ? 'text-[#006A4E]' : 'text-white'
              }`}
            >
              {isBn ? 'সংরক্ষিত লাইব্রেরি' : 'Saved Library'}
            </h2>
            <p className={`text-[11px] font-semibold mt-0.5 tabular-nums truncate ${isDay ? 'text-emerald-700' : 'text-emerald-300/90'}`}>
              {isBn
                ? `${formatNum(entries.length)}টি সংরক্ষিত · ${formatNum(activeTopicTotal)}টি টপিক`
                : `${entries.length} Saved · ${activeTopicTotal} Topics`}
            </p>
          </div>

          {/* Right: Search Icon + Share/Download */}
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setIsSearchOpen((prev) => {
                  if (prev && searchQuery) setSearchQuery('');
                  return !prev;
                });
              }}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition cursor-pointer active:scale-95 ${
                isSearchOpen || searchQuery
                  ? isDay
                    ? 'bg-[#006A4E] border-[#006A4E] text-white'
                    : 'bg-emerald-600 border-emerald-500 text-white'
                  : isDay
                  ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-[#006A4E]'
                  : 'bg-[#0c2930] border-[#194a55] text-emerald-300 hover:border-emerald-500'
              }`}
              title={isBn ? 'খুঁজুন' : 'Search'}
              aria-label={isBn ? 'খুঁজুন' : 'Search'}
            >
              {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>
            <ShareDownloadButtons
              variant="compact"
              selectedLanguage={selectedLanguage}
              themeMode={themeMode}
              onShare={() => openLibraryShare('share')}
              onDownload={() => openLibraryShare('download')}
            />
          </div>
        </div>

        {/* Centered Essential Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => openComposer()}
            className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer whitespace-nowrap shadow-xs ${
              isDay
                ? 'bg-[#006A4E] hover:bg-[#005740] text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{isBn ? 'সংরক্ষণ করুন' : 'Save Anything'}</span>
          </button>

          <button
            type="button"
            onClick={() => openTopicModal()}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer whitespace-nowrap ${
              isDay
                ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-[#006A4E]'
                : 'bg-[#0b262d] border-[#1a4954] text-slate-200 hover:border-emerald-500'
            }`}
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>{isBn ? 'নতুন টপিক' : 'New Topic'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setOnlyPinned((p) => !p);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
              onlyPinned
                ? isDay
                  ? 'bg-emerald-50 border-emerald-400 text-[#006A4E]'
                  : 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                : isDay
                ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                : 'bg-[#0b262d] border-[#1a4954] text-slate-200 hover:border-emerald-500/60'
            }`}
          >
            <Pin className={`w-3.5 h-3.5 ${onlyPinned ? 'fill-current' : 'opacity-70'}`} />
            <span>{isBn ? `পিন করা (${formatNum(pinnedCount)})` : `Pinned (${pinnedCount})`}</span>
          </button>
        </div>

        {/* Expandable Search Bar */}
        {(isSearchOpen || searchQuery.trim().length > 0) && (
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus={isSearchOpen}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'টপিক বা লেখা খুঁজুন...' : 'Search saved library...'}
              className={`w-full min-h-[40px] pl-10 pr-9 py-2 rounded-full border text-xs font-medium focus:outline-none transition ${
                isDay
                  ? 'bg-white border-slate-200 text-slate-900 focus:border-[#006A4E]'
                  : 'bg-[#092127] border-[#153e47] text-white focus:border-emerald-500'
              }`}
            />
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              aria-label={isBn ? 'বন্ধ করুন' : 'Close search'}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Topic Folder Strip (Separate by Topic Navigation) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => {
              setSelectedTopicId('all');
              if (soundEnabled) soundHaptics.playTap();
            }}
            className={`min-h-[38px] px-4 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 ${
              selectedTopicId === 'all'
                ? isDay
                  ? 'bg-[#006A4E] border-[#006A4E] text-white shadow-2xs'
                  : 'bg-emerald-600 border-emerald-500 text-white shadow-2xs'
                : isDay
                ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                : 'bg-[#0a2329] border-[#18444e] text-slate-300 hover:border-emerald-500/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? 'সব টপিক' : 'All Topics'}</span>
            <span className="font-mono tabular-nums opacity-80">({formatNum(entries.length)})</span>
          </button>

          {visibleNavigatorTopics.map((topic) => {
            const isSelected = selectedTopicId === topic.id;
            const count = topicCounts[topic.id] || 0;
            const accentStyle = TOPIC_ACCENT_STYLES[topic.accent];
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? isDay
                      ? 'bg-[#006A4E] border-[#006A4E] text-white shadow-2xs'
                      : 'bg-emerald-600 border-emerald-500 text-white shadow-2xs'
                    : isDay
                    ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                    : 'bg-[#0a2329] border-[#18444e] text-slate-200 hover:border-emerald-500/50'
                }`}
              >
                {!isSelected && <span className={`w-2 h-2 rounded-full ${accentStyle.dotBg}`} />}
                <span>{topic.emoji}</span>
                <span>{isBn ? topic.nameBn : topic.nameEn}</span>
                <span className="font-mono tabular-nums opacity-80">({formatNum(count)})</span>
              </button>
            );
          })}
        </div>

        {/* Format Filter Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {typeFilters.map((tf) => {
            const active = typeFilter === tf.id;
            return (
              <button
                key={tf.id}
                type="button"
                onClick={() => {
                  setTypeFilter(tf.id);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`min-h-[34px] px-3 py-1 rounded-full text-[11px] font-bold border transition cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? isDay
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-white text-slate-950'
                    : isDay
                    ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    : 'bg-[#081f25] border-[#163f49] text-slate-300 hover:bg-white/5'
                }`}
              >
                {isBn ? tf.labelBn : tf.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Topic-Separated Content Body */}
      <div className="flex-1 p-4 sm:p-7 flex flex-col gap-6">
        {groupedByTopic.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10 px-4">
            <div
              className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-4 ${
                isDay
                  ? 'bg-emerald-50 border border-emerald-200/70 text-[#006A4E]'
                  : 'bg-emerald-950/50 border border-emerald-800/50 text-emerald-400'
              }`}
            >
              <Bookmark className="w-9 h-9 stroke-[1.8]" />
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
              {searchQuery || typeFilter !== 'all' || onlyPinned
                ? isBn ? 'কোনো মিল পাওয়া যায়নি' : 'No Matching Saved Items'
                : isBn ? 'আপনার ব্যক্তিগত সংরক্ষিত লাইব্রেরি' : 'Your Personal Saved Vault'}
            </h3>
            <p className={`text-xs sm:text-sm mt-1.5 max-w-md leading-relaxed ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
              {searchQuery || typeFilter !== 'all' || onlyPinned
                ? isBn ? 'ফিল্টার পরিবর্তন করে বা অন্য শব্দ দিয়ে খুঁজে দেখুন।' : 'Try adjusting your filter or search query.'
                : isBn
                ? 'কুরআনের আয়াত, হাদীস, দোয়া, ব্যক্তিগত নোট, ওয়েব লিংক, আমলের চেকলিস্ট কিংবা ছবি — যেকোনো কিছু সেভ করুন। প্রতিটি জিনিস টপিক অনুযায়ী আলাদা সাজানো থাকবে।'
                : 'Save ayahs, hadiths, personal notes, links, checklists, or images — everything will be neatly organized into separate topics.'}
            </p>

            {/* Quick Start Creation Tiles */}
            {!searchQuery && typeFilter === 'all' && !onlyPinned && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full max-w-xl">
                {quickTemplates.map((tpl) => (
                  <button
                    key={tpl.kind}
                    type="button"
                    onClick={() =>
                      openComposer({
                        presetKind: tpl.kind,
                        presetTopicId: selectedTopicId !== 'all' ? selectedTopicId : undefined,
                      })
                    }
                    className={`min-h-[52px] px-3.5 py-2.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer ${
                      isDay
                        ? 'bg-white border-slate-200 text-slate-800 hover:border-emerald-400 hover:bg-emerald-50/50 hover:text-[#006A4E]'
                        : 'bg-[#0b262d] border-[#18444e] text-slate-200 hover:border-emerald-500/60 hover:text-emerald-300'
                    }`}
                  >
                    <span className="text-[#006A4E] dark:text-emerald-400">{tpl.icon}</span>
                    <span>{isBn ? tpl.labelBn : tpl.labelEn}</span>
                  </button>
                ))}
              </div>
            )}

            {onNavigateToQuran && !searchQuery && typeFilter === 'all' && (
              <button
                type="button"
                onClick={onNavigateToQuran}
                className={`mt-5 min-h-[44px] px-5 py-2 rounded-full text-xs font-bold border flex items-center gap-2 transition active:scale-95 cursor-pointer ${
                  isDay
                    ? 'bg-white border-slate-200 text-[#006A4E] hover:bg-emerald-50'
                    : 'bg-[#0c2930] border-[#194a55] text-emerald-300 hover:bg-[#123840]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{isBn ? 'আল-কোরআন থেকে বুকমার্ক করুন' : 'Browse Al-Quran'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          groupedByTopic.map(({ topic, items }) => {
            const accent = TOPIC_ACCENT_STYLES[topic.accent];
            const isCollapsed = Boolean(collapsedTopics[topic.id]);

            return (
              <section
                key={topic.id}
                className={`rounded-3xl border overflow-hidden transition ${
                  isDay ? 'bg-slate-50/45 border-slate-200/85' : 'bg-[#081f25]/80 border-[#143d47]'
                }`}
              >
                {/* Clean Topic Section Header */}
                <div
                  className={`px-4 py-3.5 sm:px-5 sm:py-4 border-b flex flex-wrap items-center justify-between gap-3 ${
                    isDay
                      ? 'bg-white border-slate-200/80'
                      : 'bg-[#0a2229] border-[#143d47]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setCollapsedTopics((prev) => ({ ...prev, [topic.id]: !prev[topic.id] }))
                    }
                    className="flex items-center gap-3 min-w-0 text-left cursor-pointer flex-1"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                        isDay ? 'bg-[#f0f7f4] text-[#006A4E]' : 'bg-[#123138] text-emerald-300'
                      }`}
                    >
                      {topic.emoji}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`w-2 h-2 rounded-full ${accent.dotBg} shrink-0`} />
                        <h3 className={`text-base sm:text-lg font-black tracking-tight ${isDay ? 'text-slate-900' : 'text-white'}`}>
                          {isBn ? topic.nameBn : topic.nameEn}
                        </h3>
                        <span className={`text-xs font-bold font-mono tabular-nums ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`}>
                          · {formatNum(items.length)} {isBn ? 'টি' : 'items'}
                        </span>
                      </div>
                      {(topic.descBn || topic.arabicLabel) && (
                        <p className={`text-[11px] sm:text-xs truncate mt-0.5 ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                          {isBn ? topic.descBn || topic.arabicLabel : topic.descEn || topic.arabicLabel}
                        </p>
                      )}
                    </div>
                  </button>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => openComposer({ presetTopicId: topic.id })}
                      className={`min-h-[36px] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border transition active:scale-95 cursor-pointer ${
                        isDay
                          ? 'bg-white border-slate-200/90 text-[#006A4E] hover:bg-emerald-50'
                          : 'bg-[#071a1f] border-[#1b4c57] text-emerald-300 hover:bg-[#10323b]'
                      }`}
                      title={isBn ? 'এই টপিকে নতুন কিছু যোগ করুন' : 'Add item to this topic'}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isBn ? 'যোগ করুন' : 'Add'}</span>
                    </button>

                    <ShareDownloadButtons
                      variant="compact"
                      selectedLanguage={selectedLanguage}
                      themeMode={themeMode}
                      onShare={() => openTopicShare(topic, items, 'share')}
                      onDownload={() => openTopicShare(topic, items, 'download')}
                    />

                    {topic.isCustom && (
                      <>
                        <button
                          type="button"
                          onClick={() => openTopicModal(topic)}
                          className="min-w-[34px] min-h-[34px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-emerald-500 cursor-pointer"
                          title={isBn ? 'টপিক সম্পাদনা' : 'Edit topic'}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteCustomTopic(topic.id);
                            if (selectedTopicId === topic.id) setSelectedTopicId('all');
                            refreshAll();
                            if (soundEnabled) soundHaptics.playTap();
                          }}
                          className="min-w-[34px] min-h-[34px] rounded-xl flex items-center justify-center hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 cursor-pointer"
                          title={isBn ? 'কাস্টম টপিক মুছুন' : 'Delete custom topic'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setCollapsedTopics((prev) => ({ ...prev, [topic.id]: !prev[topic.id] }))
                      }
                      className="min-w-[34px] min-h-[34px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 opacity-70 hover:opacity-100 cursor-pointer"
                      aria-label={isCollapsed ? 'Expand' : 'Collapse'}
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${isCollapsed ? '-rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Items inside this Topic */}
                {!isCollapsed && (
                  <div className="p-4 sm:p-5">
                    {items.length === 0 ? (
                      <div className="text-center py-8">
                        <p className={`text-xs sm:text-sm ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                          {isBn ? 'এই টপিকে এখনো কোনো কিছু সংরক্ষণ করা হয়নি।' : 'No items saved in this topic yet.'}
                        </p>
                        <button
                          type="button"
                          onClick={() => openComposer({ presetTopicId: topic.id })}
                          className="mt-3 min-h-[40px] px-4 py-1.5 rounded-full bg-[#006A4E] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer hover:bg-[#005740]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isBn ? 'প্রথম আইটেম যোগ করুন' : 'Add First Item'}</span>
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {items.map((item) => renderEntryCard(item))}
                      </div>
                    )}
                  </div>
                )}
              </section>
            );
          })
        )}
      </div>

      {/* UNIVERSAL "SAVE ANYTHING" COMPOSER MODAL */}
      {composerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in"
          onClick={() => setComposerOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full sm:max-w-xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border shadow-2xl p-5 sm:p-6 space-y-4 ${
              isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#081d22] border-[#184852] text-white'
            }`}
          >
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-black/10 dark:border-white/10">
              <div>
                <h3 className="text-lg font-black tracking-tight text-[#006A4E] dark:text-emerald-400">
                  {editingEntry
                    ? isBn ? 'তথ্য সম্পাদনা করুন' : 'Edit Saved Item'
                    : isBn ? 'যেকোনো কিছু সংরক্ষণ করুন' : 'Save Anything to Library'}
                </h3>
                <p className="text-[11px] opacity-70">
                  {isBn
                    ? 'টপিক নির্বাচন করে নোট, আয়াত, লিংক, চেকলিস্ট বা ছবি সেভ করুন'
                    : 'Choose a topic and save notes, quotes, links, checklists, or images'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                className="min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleComposerSubmit} className="space-y-4">
              {/* Step 1: Choose Content Format (only when creating or editing vault item) */}
              {(!editingEntry || editingEntry.origin === 'vault') && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                    {isBn ? 'কী সংরক্ষণ করতে চান?' : 'Content Format'}
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {quickTemplates.map((tpl) => {
                      const active = formKind === tpl.kind;
                      return (
                        <button
                          key={tpl.kind}
                          type="button"
                          onClick={() => setFormKind(tpl.kind)}
                          className={`min-h-[54px] px-2 py-2 rounded-2xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                            active
                              ? isDay
                                ? 'bg-[#006A4E] border-[#006A4E] text-white'
                                : 'bg-emerald-600 border-emerald-500 text-white'
                              : isDay
                              ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-300'
                              : 'bg-[#0a242b] border-[#174651] text-slate-300 hover:border-emerald-500/50'
                          }`}
                        >
                          {tpl.icon}
                          <span className="truncate max-w-full">{isBn ? tpl.labelBn.split(' ')[0] : tpl.labelEn}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Topic Selection + Inline Custom Topic Creator */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                    {isBn ? 'টপিক (ক্যাটাগরি)' : 'Topic'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setInlineTopicCreate((v) => !v)}
                    className="text-[11px] font-bold text-[#006A4E] dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    {inlineTopicCreate
                      ? isBn ? 'বিদ্যমান টপিক বেছে নিন' : 'Choose existing'
                      : isBn ? '+ নতুন টপিক তৈরি করুন' : '+ Create new topic'}
                  </button>
                </div>

                {inlineTopicCreate ? (
                  <input
                    type="text"
                    value={inlineTopicName}
                    onChange={(e) => setInlineTopicName(e.target.value)}
                    placeholder={isBn ? 'নতুন টপিকের নাম (যেমন: রমজানের আমল, ব্যক্তিগত)...' : 'New topic name...'}
                    className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold focus:outline-none ${
                      isDay ? 'bg-white border-emerald-400 text-slate-900' : 'bg-[#06161a] border-emerald-500 text-white'
                    }`}
                  />
                ) : (
                  <select
                    value={formTopicId}
                    onChange={(e) => setFormTopicId(e.target.value)}
                    className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer ${
                      isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                    }`}
                  >
                    {topics.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.emoji} {isBn ? t.nameBn : t.nameEn}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                  {isBn ? 'শিরোনাম' : 'Title'}
                </label>
                <input
                  type="text"
                  required={formKind !== 'image'}
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder={
                    formKind === 'quote'
                      ? isBn ? 'যেমন: ধৈর্য ও আল্লাহর ওপর তাওয়াক্কুল' : 'e.g. Patience & Reliance on Allah'
                      : formKind === 'link'
                      ? isBn ? 'যেমন: গুরুত্বপূর্ণ তাফসীর লেকচার বা আর্টিকেল' : 'e.g. Useful Article or Video'
                      : formKind === 'checklist'
                      ? isBn ? 'যেমন: দৈনন্দিন ফজর পরবর্তী আমল' : 'e.g. Daily Morning Routine'
                      : isBn ? 'সংরক্ষণের শিরোনাম লিখুন...' : 'Enter a clear title...'
                  }
                  className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold focus:outline-none ${
                    isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                  }`}
                />
              </div>

              {/* Optional Arabic Field for Quote / Note */}
              {(formKind === 'quote' || formKind === 'note') && (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                    {isBn ? 'আরবি পাঠ (ঐচ্ছিক)' : 'Arabic Text (Optional)'}
                  </label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={formArabic}
                    onChange={(e) => setFormArabic(e.target.value)}
                    placeholder="اكتب النص العربي هنا (اختياري)..."
                    className={`w-full px-3.5 py-2 rounded-xl border font-arabic text-base focus:outline-none resize-none ${
                      isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                    }`}
                  />
                </div>
              )}

              {/* Link URL Field */}
              {formKind === 'link' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                    {isBn ? 'ওয়েব লিংক (URL)' : 'Web Link (URL)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://example.com/article"
                    className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-mono focus:outline-none ${
                      isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                    }`}
                  />
                </div>
              )}

              {/* Image Upload Field */}
              {formKind === 'image' && (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                    {isBn ? 'ছবি / স্ক্রিনশট আপলোড' : 'Image / Screenshot'}
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileSelect}
                    className="hidden"
                  />
                  {formImageDataUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-black/15 dark:border-white/15">
                      <img src={formImageDataUrl} alt="Preview" className="w-full max-h-52 object-contain bg-black/5 dark:bg-black/30" />
                      <button
                        type="button"
                        onClick={() => setFormImageDataUrl(undefined)}
                        className="absolute top-2 right-2 px-3 py-1.5 rounded-full bg-rose-600 text-white text-xs font-bold shadow cursor-pointer"
                      >
                        {isBn ? 'ছবি সরান' : 'Remove'}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={isProcessingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full min-h-[110px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 text-xs font-bold transition cursor-pointer ${
                        isDay
                          ? 'border-slate-300 bg-slate-50 hover:border-[#006A4E] text-slate-600'
                          : 'border-[#1d4e5a] bg-[#07191e] hover:border-emerald-500 text-slate-300'
                      }`}
                    >
                      <ImageIcon className="w-6 h-6 text-[#006A4E] dark:text-emerald-400" />
                      <span>
                        {isProcessingImage
                          ? isBn ? 'ছবি প্রসেস হচ্ছে...' : 'Processing image...'
                          : isBn ? 'গ্যালারি বা ডিভাইস থেকে ছবি নির্বাচন করুন' : 'Pick an image from device'}
                      </span>
                    </button>
                  )}
                </div>
              )}

              {/* Checklist Rows Builder */}
              {formKind === 'checklist' && (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                    {isBn ? 'চেকলিস্ট আইটেমসমূহ' : 'Checklist Items'}
                  </label>
                  <div className="space-y-2">
                    {formChecklist.map((row, idx) => (
                      <div key={row.id} className="flex items-center gap-2">
                        <span className="text-xs font-mono opacity-50 w-5 text-center">{idx + 1}.</span>
                        <input
                          type="text"
                          value={row.text}
                          onChange={(e) =>
                            setFormChecklist((prev) =>
                              prev.map((r) => (r.id === row.id ? { ...r, text: e.target.value } : r))
                            )
                          }
                          placeholder={isBn ? `আইটেম ${formatNum(idx + 1)}...` : `Task ${idx + 1}...`}
                          className={`flex-1 min-h-[42px] px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none ${
                            isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                          }`}
                        />
                        {formChecklist.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setFormChecklist((prev) => prev.filter((r) => r.id !== row.id))
                            }
                            className="min-w-[38px] min-h-[38px] rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setFormChecklist((prev) => [
                          ...prev,
                          { id: `row_${Date.now()}_${prev.length}`, text: '', done: false },
                        ])
                      }
                      className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-dashed border-emerald-500/50 text-xs font-bold text-[#006A4E] dark:text-emerald-400 inline-flex items-center gap-1.5 hover:bg-emerald-500/10 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isBn ? 'আরও আইটেম যোগ করুন' : 'Add Checklist Row'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Main Body / Notes / Description */}
              {formKind !== 'checklist' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                    {formKind === 'quote'
                      ? isBn ? 'অর্থ ও মূল উক্তি' : 'Quote / Translation'
                      : formKind === 'image' || formKind === 'link' || formKind === 'bookmark'
                      ? isBn ? 'বিবরণ / নোট (ঐচ্ছিক)' : 'Notes / Description (Optional)'
                      : isBn ? 'বিস্তারিত লেখা' : 'Content'}
                  </label>
                  <textarea
                    required={formKind === 'note' || formKind === 'quote'}
                    rows={formKind === 'image' || formKind === 'link' ? 2 : 4}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder={
                      isBn
                        ? 'আপনার গুরুত্বপূর্ণ কথা, তাফসীর, দোয়া বা যেকোনো তথ্য লিখুন...'
                        : 'Write your notes, quote, or details...'
                    }
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none resize-y ${
                      isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                    }`}
                  />
                </div>
              )}

              {/* Reference & Pin Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <input
                  type="text"
                  value={formReference}
                  onChange={(e) => setFormReference(e.target.value)}
                  placeholder={isBn ? 'সূত্র / রেফারেন্স (ঐচ্ছিক)' : 'Source / Reference (optional)'}
                  className={`w-full min-h-[42px] px-3.5 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
                    isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setFormPinned((p) => !p)}
                  className={`min-h-[42px] px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    formPinned
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-600 dark:text-amber-300'
                      : isDay
                      ? 'bg-white border-slate-200 text-slate-600'
                      : 'bg-[#06161a] border-[#194a55] text-slate-300'
                  }`}
                >
                  <Pin className={`w-4 h-4 ${formPinned ? 'fill-current' : ''}`} />
                  <span>{isBn ? 'উপরে পিন করে রাখুন' : 'Pin to Top'}</span>
                </button>
              </div>

              {formError && (
                <div className="px-3.5 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-semibold text-rose-500">
                  {formError}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setComposerOpen(false)}
                  className={`min-h-[44px] px-4 py-2 rounded-full border text-xs font-bold cursor-pointer ${
                    isDay ? 'border-slate-200 text-slate-600 hover:bg-slate-50' : 'border-[#194a55] text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-6 py-2 rounded-full bg-[#006A4E] hover:bg-[#005740] text-white text-xs sm:text-sm font-bold cursor-pointer transition active:scale-95"
                >
                  {editingEntry ? (isBn ? 'আপডেট করুন' : 'Update') : isBn ? 'সংরক্ষণ করুন' : 'Save Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CUSTOM TOPIC CREATE / EDIT MODAL */}
      {topicModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
          onClick={() => setTopicModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-3xl border shadow-2xl p-5 sm:p-6 space-y-4 ${
              isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#081d22] border-[#184852] text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black tracking-tight text-[#006A4E] dark:text-emerald-400">
                {editingCustomTopic
                  ? isBn ? 'টপিক সম্পাদনা করুন' : 'Edit Topic'
                  : isBn ? 'নতুন কাস্টম টপিক তৈরি করুন' : 'Create Custom Topic'}
              </h3>
              <button
                type="button"
                onClick={() => setTopicModalOpen(false)}
                className="min-w-[38px] min-h-[38px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomTopic} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                  {isBn ? 'আইকন পছন্দ করুন' : 'Choose Icon'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {TOPIC_EMOJI_OPTIONS.map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setTopicEmojiDraft(em)}
                      className={`w-10 h-10 rounded-xl border text-lg flex items-center justify-center transition cursor-pointer ${
                        topicEmojiDraft === em
                          ? 'border-[#006A4E] bg-emerald-500/15 scale-105'
                          : isDay
                          ? 'border-slate-200 bg-slate-50 hover:border-emerald-300'
                          : 'border-[#194a55] bg-[#0a242b] hover:border-emerald-500/50'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                  {isBn ? 'টপিকের নাম' : 'Topic Name'}
                </label>
                <input
                  type="text"
                  required
                  value={topicNameDraft}
                  onChange={(e) => setTopicNameDraft(e.target.value)}
                  placeholder={isBn ? 'যেমন: রমজানের পরিকল্পনা, মাসআলা-মাসায়েল...' : 'e.g. Ramadan Plan, Fiqh Notes...'}
                  className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold focus:outline-none ${
                    isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                  {isBn ? 'সংক্ষিপ্ত বিবরণ (ঐচ্ছিক)' : 'Short Description (Optional)'}
                </label>
                <input
                  type="text"
                  value={topicDescDraft}
                  onChange={(e) => setTopicDescDraft(e.target.value)}
                  placeholder={isBn ? 'এই টপিকে কী ধরনের তথ্য রাখবেন?' : 'What goes in this topic?'}
                  className={`w-full min-h-[42px] px-3.5 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
                    isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                  {isBn ? 'থিম রঙ' : 'Accent Color'}
                </label>
                <div className="flex items-center gap-2.5">
                  {ACCENT_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTopicAccentDraft(key)}
                      className={`w-8 h-8 rounded-full ${TOPIC_ACCENT_STYLES[key].dotBg} transition cursor-pointer ${
                        topicAccentDraft === key ? 'ring-2 ring-offset-2 ring-[#006A4E] scale-110' : 'opacity-70 hover:opacity-100'
                      }`}
                      title={isBn ? TOPIC_ACCENT_STYLES[key].labelBn : TOPIC_ACCENT_STYLES[key].labelEn}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTopicModalOpen(false)}
                  className={`min-h-[42px] px-4 py-2 rounded-full border text-xs font-bold cursor-pointer ${
                    isDay ? 'border-slate-200 text-slate-600' : 'border-[#194a55] text-slate-300'
                  }`}
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="min-h-[42px] px-5 py-2 rounded-full bg-[#006A4E] hover:bg-[#005740] text-white text-xs font-bold cursor-pointer"
                >
                  {editingCustomTopic ? (isBn ? 'আপডেট' : 'Update') : isBn ? 'টপিক তৈরি করুন' : 'Create Topic'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IMAGE LIGHTBOX PREVIEW */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full flex flex-col items-center gap-3"
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="self-end w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <div className="text-center text-white space-y-1">
              <div className="font-bold text-sm sm:text-base">{lightboxImage.title}</div>
              {lightboxImage.caption && <p className="text-xs text-slate-300">{lightboxImage.caption}</p>}
            </div>
          </div>
        </div>
      )}

      <ContentShareModal
        isOpen={!!shareState}
        onClose={() => setShareState(null)}
        content={shareState?.content || null}
        selectedLanguage={selectedLanguage}
        soundEnabled={soundEnabled}
        initialFocus={shareState?.focus}
      />
    </div>
  );
};
