import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Send,
  Sparkles,
  Search,
  ArrowUpRight,
  Copy,
  Check,
  MessageSquarePlus,
  AlertCircle,
  WifiOff,
  BookOpen,
  Mail,
  MessageCircle,
  Trash2,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { NavModule, ThemeMode, UserProfile, ZikrLanguage } from '../types';
import {
  ActivePageContext,
  KnowledgeMatch,
  extractActivePageContext,
  getModuleDisplayLabel,
  searchAppKnowledge,
  warmupKnowledgeIndex,
} from '../utils/appKnowledgeSearch';
import { submitMissingInfoRequest } from '../services/firebaseLazy';
import { soundHaptics } from '../utils/audioHaptics';

interface MatchedSourceItem {
  title: string;
  moduleId: string;
  snippet: string;
}

interface WebSourceItem {
  title: string;
  uri: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  foundInApp?: boolean;
  foundOnWeb?: boolean;
  matchedSources?: MatchedSourceItem[];
  webSources?: WebSourceItem[];
  missingInfoTopic?: string;
  localFallbackMatches?: KnowledgeMatch[];
  isError?: boolean;
  askedQuestion?: string;
  requestSent?: boolean;
}

interface AppAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeModule: NavModule;
  selectedLanguage: ZikrLanguage;
  themeMode: ThemeMode;
  soundEnabled: boolean;
  userProfile: UserProfile;
  onNavigateModule: (moduleId: string) => void;
  onToast?: (msg: string) => void;
}

const ADMIN_WHATSAPP_NUMBER = '8801567963471';
const ADMIN_EMAIL = 'mdmursalineparvez@gmail.com';

export const AppAssistantModal: React.FC<AppAssistantModalProps> = ({
  isOpen,
  onClose,
  activeModule,
  selectedLanguage,
  themeMode,
  soundEnabled,
  userProfile,
  onNavigateModule,
  onToast,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  const [pageContext, setPageContext] = useState<ActivePageContext>(() => ({
    moduleId: activeModule,
    pageTitle: getModuleDisplayLabel(activeModule, selectedLanguage),
    visibleText: '',
  }));

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Missing info request composer state (can be opened from a missing-info reply or manually anytime)
  const [activeRequestMsgId, setActiveRequestMsgId] = useState<string | null>(null);
  const [isManualRequestOpen, setIsManualRequestOpen] = useState(false);
  const [reqQuestion, setReqQuestion] = useState('');
  const [reqNote, setReqNote] = useState('');
  const [reqName, setReqName] = useState('');
  const [reqContact, setReqContact] = useState('');
  const [isSubmittingReq, setIsSubmittingReq] = useState(false);
  const [reqSubmitError, setReqSubmitError] = useState<string | null>(null);
  const [manualReqSentRecord, setManualReqSentRecord] = useState<{ question: string; pageTitle: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const clientResponseCacheRef = useRef<Map<string, Omit<ChatMessage, 'id'>>>(new Map());

  // Refresh active page context & pre-warm knowledge index when modal opens
  useEffect(() => {
    if (!isOpen) return;
    const ctx = extractActivePageContext(activeModule, selectedLanguage);
    setPageContext(ctx);
    warmupKnowledgeIndex();
    if (userProfile?.isSignedIn) {
      setReqName((prev) => prev || userProfile.name || '');
      setReqContact((prev) => prev || userProfile.emailOrPhone || '');
    }
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
    return () => clearTimeout(focusTimer);
  }, [isOpen, activeModule, selectedLanguage, userProfile?.isSignedIn, userProfile?.name, userProfile?.emailOrPhone]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isQuerying, activeRequestMsgId, isManualRequestOpen]);

  const starterPrompts = useMemo(() => {
    if (isBn) {
      const moduleSpecific: Partial<Record<NavModule, string[]>> = {
        prophets_25: [
          'উলুল আযম ৫ জন নবী কারা?',
          'হযরত মুসা (আ.)-এর মুজিযা কী ছিল?',
          'কোন নবীদের নাম কুরআনে বেশি এসেছে?',
        ],
        seerat_un_nabi: [
          'এই পেজের মূল ঘটনা ও শিক্ষা সংক্ষেপে বলো',
          'হযরত আবু বকর (রা.) ইন্তেকালের পর কী ভাষণ দিয়েছিলেন?',
          'মিরাজের ঘটনা কোন বয়সে ঘটে?',
        ],
        dua: [
          'ঘুম থেকে ওঠার ও ঘুমানোর দোয়া কী?',
          'বিপদ ও দুশ্চিন্তা থেকে মুক্তির দোয়া খুঁজে দাও',
          'রিজিক বৃদ্ধির মাসনুন দোয়া আছে কি?',
        ],
        tablig: [
          'দাওয়াতের ৬ সিফত কী কী?',
          'তাশকিল ও গাশতের নিয়ম এই পেজ থেকে বলো',
          'সাহাবাদের ত্যাগ ও মেহনতের ফজিলত দেখাও',
        ],
        hayatus_sahaba: [
          'হযরত বিলাল (রা.)-এর ইসলাম গ্রহণের ঘটনা বলো',
          'আশারায়ে মুবাশশারা সাহাবি কারা?',
          'হযরত উমর (রা.) সম্পর্কে বিস্তারিত খুঁজে দাও',
        ],
        namaj: [
          '৫ ওয়াক্ত নামাজের রাকাত সংখ্যা কত?',
          'নামাজ নিষিদ্ধ বা মাকরূহ সময় কোনগুলো?',
          'তাহাজ্জুদ নামাজের নিয়ম ও ফজিলত বলো',
        ],
        hajj_checklist: [
          'ওমরাহ করার ফরজ ও ধারাবাহিক ধাপ কী কী?',
          'বাংলাদেশীদের মিকাত কোনটি?',
          'তাওয়াফ ও সাঈ করার নিয়ম দেখাও',
        ],
        quran: [
          'সূরা ফাতিহার ফজিলত ও শানে নুযূল কী?',
          'সবর ও ধৈর্য সম্পর্কে কুরআনের আয়াত দেখাও',
          'সূরা ইয়াসিন বা মুলক সম্পর্কে অ্যাপে কী আছে?',
        ],
      };

      return (
        moduleSpecific[activeModule] || [
          'এই পেজে কী কী তথ্য আছে সংক্ষেপে বলো',
          'উলুল আযম নবী কারা এবং কুরআনে কতজন নবীর নাম আছে?',
          'দুশ্চিন্তা দূর করার সহিহ দোয়া খুঁজে দাও',
          'নামাজের নিষিদ্ধ সময় কোনগুলো?',
        ]
      );
    }

    return [
      'Summarize what is on this current page',
      'Who are the 5 Ulul Azm Prophets?',
      'Find an authentic dua for anxiety and relief',
      'What are the 6 Sifat of Dawah & Tablig?',
    ];
  }, [activeModule, isBn]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleCopyText = async (msgId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(msgId);
      if (soundEnabled) soundHaptics.playTap();
      setTimeout(() => setCopiedId((prev) => (prev === msgId ? null : prev)), 2000);
    } catch {}
  };

  const openRequestComposerForMessage = (msg: ChatMessage) => {
    setIsManualRequestOpen(false);
    setReqSubmitError(null);
    setActiveRequestMsgId(msg.id);
    setReqQuestion(msg.missingInfoTopic || msg.askedQuestion || '');
    setReqNote('');
  };

  const handleOpenManualRequest = () => {
    setActiveRequestMsgId(null);
    setReqSubmitError(null);
    setManualReqSentRecord(null);
    setReqQuestion(inputText.trim());
    setReqNote('');
    setIsManualRequestOpen(true);
  };

  const handleSendQuery = async (customQuery?: string, forceWebSearch = false) => {
    const query = (customQuery ?? inputText).trim();
    if (!query || isQuerying) return;

    if (soundEnabled) soundHaptics.playTap();
    if (!customQuery) setInputText('');

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setActiveRequestMsgId(null);
    setIsManualRequestOpen(false);

    // 0ms Instant Client-Side Fast-Path for Greetings/Help
    const cleanedGreeting = query.toLowerCase().replace(/[?!.,।~]/g, '').trim();
    if (
      !forceWebSearch &&
      cleanedGreeting.length <= 48 &&
      /^(assalamu\s*alaikum|as\s*salamu\s*alaikum|salam|salaam|hi|hello|hey|help|আসসালামু\s*আলাইকুম|সালাম|হ্যালো|হাই|কেমন\s*আছো?|কেমন\s*আছেন|তুমি\s*কি\s*করতে\s*পারো|তুমি\s*কে)$/i.test(
        cleanedGreeting
      )
    ) {
      const userFirst = userProfile?.isSignedIn && userProfile?.name ? ` ${userProfile.name.trim()}` : '';
      const instantText = isBn
        ? `ওয়ালাইকুমুস সালাম${userFirst}! আমি **Zikr+** সহকারী। কুরআন, হাদিস, ২৫ নবী, সীরাতুন নবী, ২৬৬+ সাহাবি, দোয়া, তাবলিগ, নামাজ বা যেকোনো নৈতিক প্রশ্ন করুন—মুহূর্তেই উত্তর পাবেন, আর অ্যাপে না থাকলে বিশ্বস্ত ওয়েবসাইট থেকেও তথ্য এনে দেবো।`
        : `Wa Alaikum Assalam${userFirst}! I'm **Zikr+**. Ask any Islamic or ethical question from our library or trusted web sources—you'll get an instant answer.`;
      setMessages((prev) => [
        ...prev,
        {
          id: `m_${Date.now()}`,
          role: 'model',
          foundInApp: true,
          foundOnWeb: false,
          text: instantText,
          askedQuestion: query,
        },
      ]);
      return;
    }

    // 0ms Instant Client-Side Cache Hit
    const clientCacheKey = `${selectedLanguage}::${activeModule}::${forceWebSearch ? 'web' : 'fast'}::${query.toLowerCase().replace(/\s+/g, ' ')}`;
    const cachedHit = clientResponseCacheRef.current.get(clientCacheKey);
    if (cachedHit) {
      setMessages((prev) => [
        ...prev,
        {
          ...cachedHit,
          id: `m_${Date.now()}`,
          askedQuestion: query,
        },
      ]);
      return;
    }

    setIsQuerying(true);
    let matchedEntries: KnowledgeMatch[] = [];

    try {
      // 1. Non-blocking fast context extraction (<1ms) + 80ms-capped local knowledge lookup
      const currentCtx = extractActivePageContext(activeModule, selectedLanguage);
      setPageContext(currentCtx);

      matchedEntries = await Promise.race<KnowledgeMatch[]>([
        searchAppKnowledge(query, activeModule, selectedLanguage, 5),
        new Promise<KnowledgeMatch[]>((resolve) => setTimeout(() => resolve([]), 80)),
      ]);

      // Offline handling: show local matched entries cleanly without faking an AI response
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        const offlineMsg: ChatMessage = {
          id: `m_${Date.now()}`,
          role: 'model',
          foundInApp: matchedEntries.length > 0,
          text: isBn
            ? matchedEntries.length > 0
              ? `আপনি বর্তমানে অফলাইনে আছেন। তবে অ্যাপের অফলাইন ডাটাবেস থেকে "${query}" বিষয়ে নিচের তথ্যগুলো পাওয়া গেছে:`
              : `আপনি বর্তমানে অফলাইনে আছেন এবং "${query}" বিষয়ে অফলাইন ডাটাবেসে সরাসরি মিল পাওয়া যায়নি। ইন্টারনেট চালু করে পুনরায় জিজ্ঞাসা করুন অথবা অনলাইনে এলে অ্যাডমিনকে মেসেজ পাঠান।`
            : matchedEntries.length > 0
            ? `You are currently offline. Here are direct local matches from the Zikr+ offline library for "${query}":`
            : `You are offline and no local keyword matches were found for "${query}". Connect to the internet to ask AI or send a request.`,
          localFallbackMatches: matchedEntries.slice(0, 4),
          matchedSources: matchedEntries.slice(0, 3).map((m) => ({
            title: m.title,
            moduleId: m.moduleId,
            snippet: m.snippet.slice(0, 140),
          })),
          missingInfoTopic: matchedEntries.length === 0 ? query : '',
          askedQuestion: query,
        };
        setMessages((prev) => [...prev, offlineMsg]);
        setIsQuerying(false);
        return;
      }

      // 2. Call ultra-fast SSE streaming Gemini Assistant API
      const recentHistory = messages.slice(-2).map((m) => ({
        role: m.role,
        text: m.text.slice(0, 180),
      }));

      const payload = JSON.stringify({
        question: query,
        language: selectedLanguage,
        forceWebSearch,
        userName: userProfile?.isSignedIn && userProfile?.name ? userProfile.name.trim() : '',
        activePage: {
          moduleId: currentCtx.moduleId,
          pageTitle: currentCtx.pageTitle,
          visibleText: currentCtx.visibleText.slice(0, 1600),
        },
        matchedEntries: matchedEntries.slice(0, 4).map((m) => ({
          moduleId: m.moduleId,
          moduleLabel: m.moduleLabel,
          title: m.title,
          reference: m.reference || '',
          snippet: m.snippet.slice(0, 420),
          score: m.score,
        })),
        history: recentHistory,
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      let res: Response;
      try {
        res = await fetch('/api/ai-assistant-stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          signal: controller.signal,
        });
      } catch (fetchErr: any) {
        clearTimeout(timeoutId);
        if (fetchErr?.name === 'AbortError') {
          throw new Error(
            isBn
              ? 'AI সার্ভার থেকে উত্তর আসতে দেরি হচ্ছে (সময়সীমা অতিক্রম)।'
              : 'Request to AI server timed out.'
          );
        }
        throw fetchErr;
      }

      if (!res.ok) {
        clearTimeout(timeoutId);
        throw new Error(
          isBn
            ? `AI সার্ভার থেকে উত্তর পাওয়া যায়নি (HTTP ${res.status})`
            : `Failed to reach AI Assistant service (HTTP ${res.status})`
        );
      }

      const modelMsgId = `m_${Date.now()}`;
      let streamedText = '';
      let streamCreated = false;
      let streamDoneMeta: any = null;
      let streamErrorMsg: string | null = null;

      const reader = res.body?.getReader();
      if (reader) {
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        const handleSseBlock = (block: string) => {
          const lines = block.split('\n');
          let eventName = 'message';
          const dataLines: string[] = [];
          for (const line of lines) {
            if (line.startsWith('event:')) {
              eventName = line.slice(6).trim();
            } else if (line.startsWith('data:')) {
              dataLines.push(line.slice(5).trim());
            }
          }
          if (dataLines.length === 0) return;
          const rawData = dataLines.join('\n');
          let parsed: any = null;
          try {
            parsed = JSON.parse(rawData);
          } catch {
            return;
          }

          if (eventName === 'chunk' && typeof parsed?.text === 'string') {
            streamedText += parsed.text;
            if (!streamCreated) {
              streamCreated = true;
              setIsQuerying(false);
              setMessages((prev) => [
                ...prev,
                {
                  id: modelMsgId,
                  role: 'model',
                  foundInApp: true,
                  foundOnWeb: false,
                  text: streamedText,
                  askedQuestion: query,
                },
              ]);
            } else {
              const snapshotText = streamedText;
              setMessages((prev) =>
                prev.map((m) => (m.id === modelMsgId ? { ...m, text: snapshotText } : m))
              );
            }
          } else if (eventName === 'done') {
            streamDoneMeta = parsed;
          } else if (eventName === 'error') {
            streamErrorMsg = parsed?.error || 'AI stream error.';
          }
        };

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const blocks = buffer.split('\n\n');
            buffer = blocks.pop() || '';
            for (const block of blocks) {
              if (block.trim()) handleSseBlock(block);
            }
          }
          if (buffer.trim()) handleSseBlock(buffer);
        } finally {
          clearTimeout(timeoutId);
        }
      } else {
        clearTimeout(timeoutId);
      }

      if (streamErrorMsg && !streamedText) {
        throw new Error(streamErrorMsg);
      }

      if (streamDoneMeta) {
        const foundInApp = Boolean(streamDoneMeta.foundInApp);
        const foundOnWeb = Boolean(streamDoneMeta.foundOnWeb);
        const matchedSources = Array.isArray(streamDoneMeta.matchedSources) ? streamDoneMeta.matchedSources : [];
        const webSources = Array.isArray(streamDoneMeta.webSources) ? streamDoneMeta.webSources : [];
        const missingInfoTopic =
          typeof streamDoneMeta.missingInfoTopic === 'string' && streamDoneMeta.missingInfoTopic
            ? streamDoneMeta.missingInfoTopic
            : !foundInApp
            ? query
            : '';

        if (!streamCreated) {
          setMessages((prev) => [
            ...prev,
            {
              id: modelMsgId,
              role: 'model',
              foundInApp,
              foundOnWeb,
              text: streamedText || (isBn ? 'তথ্য পাওয়া যায়নি।' : 'No response generated.'),
              matchedSources,
              webSources,
              missingInfoTopic,
              askedQuestion: query,
            },
          ]);
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === modelMsgId
                ? {
                    ...m,
                    foundInApp,
                    foundOnWeb,
                    matchedSources,
                    webSources,
                    missingInfoTopic,
                  }
                : m
            )
          );
        }

        if (!foundInApp && !foundOnWeb) {
          setActiveRequestMsgId(modelMsgId);
          setReqQuestion(missingInfoTopic || query);
          setReqNote('');
          setReqSubmitError(null);
        }

        // Save in client session cache for 0ms instant repeat answers
        if (streamedText.trim()) {
          clientResponseCacheRef.current.set(clientCacheKey, {
            role: 'model',
            foundInApp,
            foundOnWeb,
            text: streamedText,
            matchedSources,
            webSources,
            missingInfoTopic,
          });
        }
      } else if (!streamCreated) {
        throw new Error(isBn ? 'AI সার্ভার থেকে কোনো উত্তর পাওয়া যায়নি।' : 'Empty AI response.');
      }

      if (soundEnabled) soundHaptics.playMilestone();
    } catch (err: any) {
      const errorDetail =
        err?.name === 'AbortError'
          ? isBn
            ? 'AI সার্ভার সময়সীমা অতিক্রম করেছে'
            : 'AI server request timed out'
          : err?.message || (isBn ? 'নেটওয়ার্ক ত্রুটি' : 'Network error');

      const hasLocalMatches = matchedEntries.length > 0;
      const errMsg: ChatMessage = {
        id: `e_${Date.now()}`,
        role: 'model',
        isError: true,
        foundInApp: false,
        text: isBn
          ? `দুঃখিত, AI সহায়কের সাথে সংযোগে সমস্যা হয়েছে (${errorDetail})।${
              hasLocalMatches
                ? ' তবে অ্যাপের লোকাল লাইব্রেরি থেকে নিচের প্রাসঙ্গিক তথ্যগুলো পাওয়া গেছে। চাইলে নিচে অ্যাডমিনকে মেসেজও পাঠাতে পারেন।'
                : ' আপনি চাইলে নিচের ফর্ম থেকে এই তথ্যটির জন্য অ্যাডমিনকে মেসেজ পাঠাতে পারেন।'
            }`
          : `Unable to reach the AI assistant (${errorDetail}).${
              hasLocalMatches
                ? ' However, relevant entries were found in the local Zikr+ library below, or you can message the admin.'
                : ' You can still send a missing-info request to the admin below.'
            }`,
        localFallbackMatches: hasLocalMatches ? matchedEntries.slice(0, 4) : undefined,
        matchedSources: hasLocalMatches
          ? matchedEntries.slice(0, 3).map((m) => ({
              title: m.title,
              moduleId: m.moduleId,
              snippet: m.snippet.slice(0, 140),
            }))
          : undefined,
        missingInfoTopic: query,
        askedQuestion: query,
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsQuerying(false);
    }
  };

  const handleSubmitMissingRequest = async (e: React.FormEvent, targetMsgId?: string) => {
    e.preventDefault();
    const cleanQ = reqQuestion.trim();
    if (!cleanQ) {
      setReqSubmitError(isBn ? 'অনুগ্রহ করে আপনি কোন তথ্যটি খুঁজছেন তা লিখুন।' : 'Please enter the topic or question you are looking for.');
      return;
    }

    setIsSubmittingReq(true);
    setReqSubmitError(null);

    try {
      const senderKey = userProfile?.userId || userProfile?.emailOrPhone || 'guest';
      const result = await submitMissingInfoRequest({
        question: cleanQ,
        pageModule: pageContext.moduleId,
        pageTitle: pageContext.pageTitle,
        userNote: reqNote.trim(),
        senderName: reqName.trim() || userProfile?.name || 'Zikr+ User',
        senderContact: reqContact.trim() || userProfile?.emailOrPhone || '',
        senderKey,
        language: selectedLanguage,
      });

      if (!result.success) {
        throw new Error(isBn ? 'মেসেজ সংরক্ষণ করা যায়নি।' : 'Could not save message.');
      }

      if (soundEnabled) soundHaptics.playMilestone();
      onToast?.(
        isBn
          ? 'আপনার তথ্যের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে!'
          : 'Your request has been sent to the admin!'
      );

      if (targetMsgId) {
        setMessages((prev) =>
          prev.map((m) => (m.id === targetMsgId ? { ...m, requestSent: true } : m))
        );
        setActiveRequestMsgId(null);
      } else {
        setManualReqSentRecord({ question: cleanQ, pageTitle: pageContext.pageTitle });
      }
    } catch (err: any) {
      setReqSubmitError(
        err?.message ||
          (isBn
            ? 'মেসেজ পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে ইন্টারনেট সংযোগ পরীক্ষা করুন অথবা নিচের WhatsApp/Email বাটন ব্যবহার করুন।'
            : 'Failed to submit request. Check your connection or use WhatsApp/Email below.')
      );
    } finally {
      setIsSubmittingReq(false);
    }
  };

  const buildExternalShareLinks = (topic: string, note: string) => {
    const bodyText = isBn
      ? `আসসালামু আলাইকুম, Zikr+ অ্যাপে নিচের তথ্যটি যোগ করার অনুরোধ করছি:\n\nপেজ: ${pageContext.pageTitle}\nপ্রশ্ন/বিষয়: ${topic}${note ? `\nনোট: ${note}` : ''}${reqName ? `\nনাম: ${reqName}` : ''}`
      : `Assalamu Alaikum, requesting new info in Zikr+ App:\n\nPage: ${pageContext.pageTitle}\nTopic: ${topic}${note ? `\nNote: ${note}` : ''}`;

    return {
      whatsappUrl: `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(bodyText)}`,
      mailtoUrl: `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(`[Zikr+ তথ্য অনুরোধ] ${topic.slice(0, 60)}`)}&body=${encodeURIComponent(bodyText)}`,
    };
  };

  const handleNavigateSource = (moduleId: string) => {
    if (soundEnabled) soundHaptics.playTap();
    onClose();
    onNavigateModule(moduleId);
  };

  const renderRequestForm = (targetMsgId?: string) => {
    const links = buildExternalShareLinks(reqQuestion || 'তথ্য যোগ করার অনুরোধ', reqNote);

    return (
      <form
        onSubmit={(e) => handleSubmitMissingRequest(e, targetMsgId)}
        className={`mt-2.5 p-3.5 rounded-2xl border space-y-2.5 ${
          isDay
            ? 'bg-amber-50/90 border-amber-200 text-slate-800'
            : 'bg-[#0a2328] border-amber-500/35 text-slate-100'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0">
              <MessageSquarePlus className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black">
                {isBn ? 'অ্যাডমিনকে তথ্য যোগ করার অনুরোধ পাঠান' : 'Send Missing Info Request to Admin'}
              </h4>
              <p className={`text-[10px] ${isDay ? 'text-slate-600' : 'text-teal-200/75'}`}>
                {isBn
                  ? `পেজ: ${pageContext.pageTitle}`
                  : `Page: ${pageContext.pageTitle}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveRequestMsgId(null);
              setIsManualRequestOpen(false);
            }}
            className={`p-1.5 rounded-lg cursor-pointer ${
              isDay ? 'hover:bg-amber-100 text-slate-500' : 'hover:bg-white/10 text-slate-300'
            }`}
            aria-label={isBn ? 'ফর্ম বন্ধ করুন' : 'Close form'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <div>
            <label className="block text-[11px] font-bold mb-1">
              {isBn ? 'কোন তথ্যটি খুঁজছেন বা যোগ করতে চান? *' : 'What information are you looking for? *'}
            </label>
            <input
              type="text"
              value={reqQuestion}
              onChange={(e) => setReqQuestion(e.target.value)}
              placeholder={isBn ? 'যেমন: হযরত ইদরীস (আ.)-এর বিস্তারিত ঘটনা বা নির্দিষ্ট কোনো দোয়া...' : 'Describe the missing topic or question...'}
              className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none ${
                isDay
                  ? 'bg-white border-amber-200 text-slate-900 focus:border-emerald-600'
                  : 'bg-[#041418] border-[#1c4b55] text-white focus:border-emerald-400'
              }`}
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold mb-1">
              {isBn ? 'বিস্তারিত নোট / রেফারেন্স (ঐচ্ছিক)' : 'Additional Note / Details (Optional)'}
            </label>
            <textarea
              rows={2}
              value={reqNote}
              onChange={(e) => setReqNote(e.target.value)}
              placeholder={isBn ? 'কোন কিতাব, হাদিস বা পেজে এটি থাকলে ভালো হয়...' : 'Mention any preferred reference or section...'}
              className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none resize-none ${
                isDay
                  ? 'bg-white border-amber-200 text-slate-900 focus:border-emerald-600'
                  : 'bg-[#041418] border-[#1c4b55] text-white focus:border-emerald-400'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={reqName}
              onChange={(e) => setReqName(e.target.value)}
              placeholder={isBn ? 'আপনার নাম (ঐচ্ছিক)' : 'Your name (optional)'}
              className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none ${
                isDay
                  ? 'bg-white border-amber-200 text-slate-900 focus:border-emerald-600'
                  : 'bg-[#041418] border-[#1c4b55] text-white focus:border-emerald-400'
              }`}
            />
            <input
              type="text"
              value={reqContact}
              onChange={(e) => setReqContact(e.target.value)}
              placeholder={isBn ? 'ইমেইল বা মোবাইল (ঐচ্ছিক)' : 'Email or phone (optional)'}
              className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none ${
                isDay
                  ? 'bg-white border-amber-200 text-slate-900 focus:border-emerald-600'
                  : 'bg-[#041418] border-[#1c4b55] text-white focus:border-emerald-400'
              }`}
            />
          </div>
        </div>

        {reqSubmitError && (
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-2 rounded-xl border border-rose-500/20">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{reqSubmitError}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          <button
            type="submit"
            disabled={isSubmittingReq}
            className="min-h-[40px] flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-[#006A4E] to-emerald-600 hover:from-[#005740] hover:to-emerald-500 text-white font-extrabold text-xs shadow-sm transition active:scale-95 disabled:opacity-60 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>
              {isSubmittingReq
                ? isBn
                  ? 'পাঠানো হচ্ছে...'
                  : 'Sending...'
                : isBn
                ? 'অ্যাডমিনের কাছে মেসেজ পাঠান'
                : 'Send Request to Admin'}
            </span>
          </button>

          <a
            href={links.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`min-h-[40px] px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
              isDay
                ? 'bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                : 'bg-[#062226] border-emerald-500/35 text-emerald-300 hover:bg-emerald-950/60'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href={links.mailtoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`min-h-[40px] px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
              isDay
                ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                : 'bg-[#062226] border-[#1d4e58] text-slate-200 hover:bg-[#0b2f36]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
        </div>
      </form>
    );
  };

  const assistantTitle =
    userProfile?.isSignedIn && userProfile?.name?.trim()
      ? `Zikr+ • ${userProfile.name.trim()}`
      : 'Zikr+ Assistant';

  return createPortal(
    <div
      data-assistant-modal="true"
      className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-[2px] flex items-end justify-end p-2.5 sm:p-5 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full sm:w-[410px] max-w-[96vw] h-[84dvh] sm:h-[600px] max-h-[88dvh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all animate-in slide-in-from-right-4 duration-200 ${
          isDay
            ? 'bg-[#f7fbf9] border-emerald-200 text-slate-900'
            : 'bg-[#04171c] border-[#15454f] text-white'
        }`}
      >
        {/* HEADER */}
        <div className="bg-[var(--app-primary,#006A4E)] text-white px-4 py-3 flex items-center justify-between gap-2 shrink-0 shadow-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shrink-0 shadow-inner overflow-hidden p-0.5">
              <img
                src="/pwa-192x192.png"
                alt="Zikr+"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/icon.svg';
                }}
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-black leading-tight truncate">
                {assistantTitle}
              </h2>
              <p className="text-[11px] text-emerald-100/95 truncate flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 shrink-0" />
                <span>
                  {isBn
                    ? `অনলাইন • পেজ: ${pageContext.pageTitle}`
                    : `Online & Ready • ${pageContext.pageTitle}`}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMessages([]);
                  setActiveRequestMsgId(null);
                  setIsManualRequestOpen(false);
                }}
                className="min-h-[40px] min-w-[40px] p-2 rounded-xl hover:bg-white/15 text-emerald-100 hover:text-white transition cursor-pointer flex items-center justify-center"
                title={isBn ? 'চ্যাট পরিষ্কার করুন' : 'Clear chat'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] min-w-[40px] p-2 rounded-xl hover:bg-white/15 text-white transition cursor-pointer flex items-center justify-center"
              aria-label={isBn ? 'বন্ধ করুন' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CHAT SCROLL BODY */}
        <div className="flex-1 min-h-0 overflow-y-auto px-3.5 sm:px-5 py-4 space-y-4">
          {messages.length === 0 ? (
            <div className="space-y-4 py-2">
              {/* Contextual Starter Prompts */}
              <div className="space-y-2">
                <div className={`text-[11px] font-extrabold uppercase tracking-wider ${isDay ? 'text-slate-500' : 'text-emerald-300/80'}`}>
                  {isBn ? 'দ্রুত জিজ্ঞাসা করুন:' : 'Quick Suggestions:'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {starterPrompts.map((promptText, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendQuery(promptText)}
                      className={`min-h-[44px] text-left px-3.5 py-2.5 rounded-2xl border text-xs font-bold transition active:scale-[0.98] cursor-pointer flex items-center justify-between gap-2 ${
                        isDay
                          ? 'bg-white border-emerald-200/80 hover:border-emerald-500 hover:bg-emerald-50/60 text-slate-800'
                          : 'bg-[#072228] border-[#15454f] hover:border-emerald-400/60 hover:bg-[#0b2d34] text-slate-100'
                      }`}
                    >
                      <span className="leading-snug">{promptText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[92%] sm:max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-[var(--app-primary,#006A4E)] text-white rounded-br-md font-semibold'
                      : msg.isError
                      ? isDay
                        ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-bl-md'
                        : 'bg-rose-950/40 border border-rose-500/30 text-rose-100 rounded-bl-md'
                      : isDay
                      ? 'bg-white border border-slate-200 text-slate-800 rounded-bl-md'
                      : 'bg-[#072228] border border-[#164752] text-slate-100 rounded-bl-md'
                  }`}
                >
                  {typeof navigator !== 'undefined' && !navigator.onLine && msg.role === 'model' && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-300 mb-1.5 pb-1.5 border-b border-amber-500/20">
                      <WifiOff className="w-3.5 h-3.5 shrink-0" />
                      <span>{isBn ? 'অফলাইন সার্চ ফলাফল' : 'Offline Search Result'}</span>
                    </div>
                  )}

                  {msg.role === 'model' && msg.foundOnWeb && (
                    <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-sky-700 dark:text-sky-300 mb-1.5 pb-1.5 border-b border-sky-500/20">
                      <Globe className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        {isBn
                          ? 'বিশ্বস্ত ওয়েব উৎস থেকে সংগৃহীত তথ্য'
                          : 'Verified from Trusted Web Sources'}
                      </span>
                    </div>
                  )}

                  <div>{msg.text}</div>

                  {/* Direct Local Library Details (Shown on offline OR when AI server fails with local matches) */}
                  {msg.localFallbackMatches && msg.localFallbackMatches.length > 0 && (
                    <div className="mt-2.5 space-y-2">
                      {msg.isError && (
                        <div className={`text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 ${isDay ? 'text-emerald-800' : 'text-emerald-300'}`}>
                          <Search className="w-3 h-3 shrink-0" />
                          <span>
                            {isBn
                              ? 'লোকাল লাইব্রেরি থেকে সরাসরি প্রাপ্ত তথ্য:'
                              : 'Direct Local Zikr+ Library Matches:'}
                          </span>
                        </div>
                      )}
                      {msg.localFallbackMatches.map((m) => (
                        <div
                          key={m.id}
                          className={`p-2.5 rounded-xl border text-[11px] space-y-1 ${
                            isDay ? 'bg-white border-emerald-200 text-slate-800' : 'bg-[#04171b] border-[#194c57] text-slate-100'
                          }`}
                        >
                          <div className="font-extrabold text-[var(--app-primary,#006A4E)] dark:text-emerald-300">
                            {m.title}
                          </div>
                          <div className={isDay ? 'text-slate-700' : 'text-slate-300'}>{m.snippet}</div>
                          {m.reference && (
                            <div className={`text-[10px] font-semibold ${isDay ? 'text-slate-500' : 'text-teal-300/75'}`}>
                              {isBn ? 'সূত্র: ' : 'Ref: '}
                              {m.reference}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Clickable Matched Page Sources */}
                  {msg.role === 'model' && msg.matchedSources && msg.matchedSources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-black/10 dark:border-white/10 space-y-1.5">
                      <div className={`text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 ${isDay ? 'text-slate-500' : 'text-emerald-300/80'}`}>
                        <BookOpen className="w-3 h-3" />
                        <span>{isBn ? 'অ্যাপের সংশ্লিষ্ট পেজে যান:' : 'Related Sections in Zikr+:'}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.matchedSources.map((src, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleNavigateSource(src.moduleId)}
                            className={`text-left px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition active:scale-95 cursor-pointer flex items-center gap-1 ${
                              isDay
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                                : 'bg-[#0a2d35] border-emerald-500/30 text-emerald-200 hover:bg-[#103b45]'
                            }`}
                          >
                            <span className="truncate max-w-[200px]">{src.title}</span>
                            <ArrowUpRight className="w-3 h-3 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Clickable Trusted Web Sources (when fetched from external trusted sites) */}
                  {msg.role === 'model' && msg.webSources && msg.webSources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-black/10 dark:border-white/10 space-y-1.5">
                      <div className={`text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 ${isDay ? 'text-sky-700' : 'text-sky-300/90'}`}>
                        <Globe className="w-3 h-3" />
                        <span>{isBn ? 'বিশ্বস্ত ওয়েব সূত্রসমূহ:' : 'Trusted Web Sources:'}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.webSources.map((src, idx) => (
                          <a
                            key={idx}
                            href={src.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-left px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition active:scale-95 flex items-center gap-1 ${
                              isDay
                                ? 'bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100'
                                : 'bg-[#082936] border-sky-500/30 text-sky-200 hover:bg-[#0d394a]'
                            }`}
                          >
                            <span className="truncate max-w-[200px]">{src.title}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Model Footer Actions: Copy + Verify on Web + Missing Info Request Trigger */}
                  {msg.role === 'model' && (
                    <div className="mt-2 pt-1.5 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          className={`text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded-lg transition cursor-pointer ${
                            isDay
                              ? 'text-slate-500 hover:bg-slate-100'
                              : 'text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span>{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{isBn ? 'কপি করুন' : 'Copy'}</span>
                            </>
                          )}
                        </button>

                        {!msg.foundOnWeb && !msg.isError && msg.askedQuestion && (
                          <button
                            type="button"
                            disabled={isQuerying}
                            onClick={() => void handleSendQuery(msg.askedQuestion, true)}
                            className={`text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded-lg transition cursor-pointer disabled:opacity-40 ${
                              isDay
                                ? 'text-sky-700 hover:bg-sky-50'
                                : 'text-sky-300 hover:bg-sky-500/15'
                            }`}
                          >
                            <Globe className="w-3 h-3" />
                            <span>{isBn ? 'ওয়েব সূত্র দেখুন' : 'Web Sources'}</span>
                          </button>
                        )}
                      </div>

                      {msg.requestSent ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                          <Check className="w-3 h-3" />
                          {isBn ? 'অ্যাডমিনের কাছে মেসেজ পাঠানো হয়েছে' : 'Request sent to Admin'}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openRequestComposerForMessage(msg)}
                          className={`text-[10px] font-extrabold flex items-center gap-1 px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                            msg.foundInApp === false && !msg.foundOnWeb
                              ? 'bg-amber-500 text-slate-950 border-amber-400 hover:bg-amber-400'
                              : isDay
                              ? 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100'
                              : 'border-amber-500/35 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25'
                          }`}
                        >
                          <MessageSquarePlus className="w-3 h-3" />
                          <span>
                            {msg.foundOnWeb
                              ? isBn
                                ? 'অ্যাপে স্থায়ীভাবে যোগ করার অনুরোধ'
                                : 'Request Adding to App'
                              : msg.foundInApp === false
                              ? isBn
                                ? 'তথ্য যোগ করার মেসেজ পাঠান'
                                : 'Request Missing Info'
                              : isBn
                              ? 'তথ্যটি যথেষ্ট না হলে মেসেজ দিন'
                              : 'Request More Info'}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Inline Missing Info Request Form */}
                {msg.role === 'model' && activeRequestMsgId === msg.id && !msg.requestSent && (
                  <div className="w-full max-w-[95%] sm:max-w-[90%]">
                    {renderRequestForm(msg.id)}
                  </div>
                )}
              </div>
            ))
          )}

          {/* Typing / Searching Loading State */}
          {isQuerying && (
            <div className="flex items-start">
              <div
                className={`px-4 py-3 rounded-2xl rounded-bl-md border flex items-center gap-2.5 text-xs font-bold ${
                  isDay
                    ? 'bg-white border-emerald-200 text-emerald-800'
                    : 'bg-[#072228] border-[#164752] text-emerald-300'
                }`}
              >
                <div className="w-4 h-4 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin shrink-0" />
                <span>
                  {isBn
                    ? 'অ্যাপের তথ্যভাণ্ডার ও বিশ্বস্ত ওয়েব উৎস থেকে খোঁজা হচ্ছে...'
                    : 'Searching Zikr+ library & trusted web sources...'}
                </span>
              </div>
            </div>
          )}

          {/* Manual Missing Info Request Form */}
          {isManualRequestOpen && (
            <div className="w-full">{renderRequestForm()}</div>
          )}

          {manualReqSentRecord && (
            <div
              className={`p-3 rounded-2xl border flex items-center gap-2 text-xs font-bold ${
                isDay
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
              }`}
            >
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                {isBn
                  ? `"${manualReqSentRecord.question}" — আপনার অনুরোধটি অ্যাডমিনের কাছে সফলভাবে পৌঁছেছে।`
                  : `Request "${manualReqSentRecord.question}" sent successfully to Admin.`}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* BOTTOM INPUT COMPOSER + MANUAL REQUEST LINK */}
        <div
          className={`px-3.5 sm:px-5 py-3 border-t shrink-0 space-y-2 ${
            isDay ? 'bg-white border-emerald-100' : 'bg-[#031317] border-[#113942]'
          }`}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSendQuery();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isBn
                  ? 'এই পেজ বা ইসলামের যেকোনো বিষয়ে প্রশ্ন লিখুন...'
                  : 'Ask anything about this page or Zikr+ library...'
              }
              className={`flex-1 min-h-[44px] rounded-2xl px-4 py-2.5 text-xs sm:text-sm border focus:outline-none transition ${
                isDay
                  ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-600 focus:bg-white'
                  : 'bg-[#072026] border-[#184b56] text-white focus:border-emerald-400'
              }`}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isQuerying}
              className="min-h-[44px] min-w-[44px] px-4 rounded-2xl bg-[var(--app-primary,#006A4E)] hover:bg-[var(--app-primary-dark,#005740)] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 disabled:opacity-45 cursor-pointer shrink-0"
              aria-label={isBn ? 'প্রশ্ন পাঠান' : 'Send question'}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{isBn ? 'খুঁজুন' : 'Ask'}</span>
            </button>
          </form>

          <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className={`truncate ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
              {isBn
                ? 'তথ্য পেজে না থাকলে সাথে সাথে মেসেজ করে জানানোর সুযোগ রয়েছে'
                : 'Can request missing info directly if not in the app'}
            </span>
            <button
              type="button"
              onClick={handleOpenManualRequest}
              className={`font-extrabold whitespace-nowrap shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg transition cursor-pointer ${
                isDay
                  ? 'text-amber-700 hover:bg-amber-50'
                  : 'text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>{isBn ? 'তথ্য না পেলে মেসেজ করুন' : 'Request Info'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
