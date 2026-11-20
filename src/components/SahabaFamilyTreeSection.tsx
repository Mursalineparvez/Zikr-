import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  GitBranch,
  Heart,
  Layers,
  ScrollText,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { SahabaFamily, SahabaItem } from '../data/sahabaData';
import {
  FamilyMemberDetailCard,
  SahabaFamilyChronicle,
} from '../data/khalifaFamilyPdfData';
import {
  FAMILY_MEMBER_BIOGRAPHIES,
  FamilyMemberBio,
} from '../data/familyBiographiesData';
import { soundHaptics } from '../utils/audioHaptics';
import { copyToClipboard } from '../utils/clipboard';
import { useBackLayer } from '../utils/backNavigation';

interface SahabaFamilyTreeSectionProps {
  sahaba: SahabaItem;
  activeName: string;
  isFemaleCompanion: boolean;
  family: SahabaFamily;
  chronicle: SahabaFamilyChronicle;
  hasCompleteFamilyChronicle: boolean;
  themeMode: ThemeMode;
  selectedLanguage: ZikrLanguage;
  soundEnabled: boolean;
  onShowToast: (msg: string) => void;
  onOpenFamilyBioModal: (bio: FamilyMemberBio) => void;
}

type AccentKey = 'emerald' | 'amber' | 'violet' | 'blue' | 'teal' | 'rose' | 'indigo';

interface TreeNodePayload {
  id: string;
  no: number;
  roleBn: string;
  roleEn: string;
  nameBn: string;
  nameEn: string;
  pointsBn: string[];
  pointsEn: string[];
  sourceBn: string;
  sourceEn: string;
  pageBadgeBn?: string;
  accent: AccentKey;
  highlightDirect?: boolean;
  linkedBio?: FamilyMemberBio;
}

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const toBn = (n: number, pad = false): string => {
  const raw = pad ? String(n).padStart(2, '0') : String(n);
  return raw.replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
};

// Strip honorifics like (রা.), বিনতে ..., ইবনে ... to extract core given name for mother-child matching
function extractCoreNameBn(raw: string): string {
  return raw
    .replace(/\(রা\.\)|\(আ\.\)|ﷺ/g, '')
    .replace(/উম্মুল মুমিনীন|হযরত|বিবি/g, '')
    .split(/ও|এবং|,|\(/)[0]
    .trim()
    .split(/\s+/)[0]
    ?.replace(/[,.:;—-]/g, '')
    .trim() || '';
}

function findLinkedBio(nameBn: string): FamilyMemberBio | undefined {
  if (!nameBn) return undefined;
  if (FAMILY_MEMBER_BIOGRAPHIES[nameBn]) return FAMILY_MEMBER_BIOGRAPHIES[nameBn];
  const normalized = nameBn.replace(/\s*\(রা\.\)\s*/g, '').trim();
  return Object.values(FAMILY_MEMBER_BIOGRAPHIES).find((b) => {
    const bioNorm = b.nameBn.replace(/\s*\(রা\.\)\s*/g, '').trim();
    return bioNorm === normalized || normalized.includes(bioNorm) || bioNorm.includes(normalized);
  });
}

function shortCompanionLabel(name: string): string {
  const cleaned = name.replace(/হযরত\s+/g, '').replace(/\s*\(রা\.\)/g, '').trim();
  const words = cleaned.split(/\s+/);
  if (words.length <= 2) return cleaned;
  return `${words[0]} ${words[1]}`;
}

export const SahabaFamilyTreeSection: React.FC<SahabaFamilyTreeSectionProps> = ({
  sahaba,
  activeName,
  isFemaleCompanion,
  family,
  chronicle,
  hasCompleteFamilyChronicle,
  themeMode,
  selectedLanguage,
  soundEnabled,
  onShowToast,
  onOpenFamilyBioModal,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  const [displayMode, setDisplayMode] = useState<'tree' | 'cards'>('tree');
  const [selectedNode, setSelectedNode] = useState<TreeNodePayload | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCardFilter, setActiveCardFilter] = useState<'all' | 'spouses' | 'children' | 'lineage'>('all');

  useBackLayer(Boolean(selectedNode), () => setSelectedNode(null), 'sahaba-tree-node-modal');

  const formatNum = (val: string | number) =>
    isBn ? String(val).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d) : String(val);

  const fatherName = isBn ? family.fatherBn : family.fatherEn;
  const motherName = isBn ? family.motherBn : family.motherEn;
  const tribeName = isBn ? family.tribeOrClanBn : family.tribeOrClanEn;
  const spouses = (isBn ? family.wivesBn : family.wivesEn) || [];
  const sons = (isBn ? family.sonsBn : family.sonsEn) || [];
  const daughters = (isBn ? family.daughtersBn : family.daughtersEn) || [];
  const relatives = (isBn ? family.keyRelativesBn : family.keyRelativesEn) || [];
  const defaultSourceBn = chronicle.overviewSourceBn || 'তাবাকাতে ইবনে সা’দ; আল-ইসাবাহ; উসদুল গাবাহ';
  const defaultSourceEn = chronicle.overviewSourceEn || "Tabaqat Ibn Sa'd; Al-Isabah; Usd al-Ghabah";

  // Build structured genealogy nodes + smart mother-child branches from curated chronicles & family arrays
  const treeModel = useMemo(() => {
    let seq = 1;
    const nextNo = () => seq++;

    const parentsAvailable = Boolean(
      (family.fatherBn && !family.fatherBn.includes('ক্লাসিক্যাল সীরাত ও রিজাল গ্রন্থে নিবন্ধিত')) ||
        (family.motherBn && !family.motherBn.includes('সম্মানিত সাহাবি পরিবার'))
    );

    const safeFatherBn = family.fatherBn || 'সীরাত ও রিজাল গ্রন্থে সংরক্ষিত';
    const safeFatherEn = family.fatherEn || 'Recorded in Classical Sirah Sources';
    const safeMotherBn = family.motherBn || 'সীরাত ও রিজাল গ্রন্থে সংরক্ষিত';
    const safeMotherEn = family.motherEn || 'Recorded in Classical Sirah Sources';

    const fatherNode: TreeNodePayload = {
      id: `${sahaba.id}-father`,
      no: nextNo(),
      roleBn: 'পিতা',
      roleEn: 'Father',
      nameBn: safeFatherBn,
      nameEn: safeFatherEn,
      pointsBn: [
        `পিতা: ${safeFatherBn}`,
        ...(family.tribeOrClanBn ? [`গোত্র ও বংশ: ${family.tribeOrClanBn}`] : []),
      ],
      pointsEn: [
        `Father: ${safeFatherEn}`,
        ...(family.tribeOrClanEn ? [`Tribe & Clan: ${family.tribeOrClanEn}`] : []),
      ],
      sourceBn: defaultSourceBn,
      sourceEn: defaultSourceEn,
      accent: 'amber',
      highlightDirect: true,
      linkedBio: findLinkedBio(safeFatherBn),
    };

    const motherNode: TreeNodePayload = {
      id: `${sahaba.id}-mother`,
      no: nextNo(),
      roleBn: 'মাতা',
      roleEn: 'Mother',
      nameBn: safeMotherBn,
      nameEn: safeMotherEn,
      pointsBn: [
        `মাতা: ${safeMotherBn}`,
        ...(family.tribeOrClanBn ? [`পারিবারিক বংশধারা: ${family.tribeOrClanBn}`] : []),
      ],
      pointsEn: [
        `Mother: ${safeMotherEn}`,
        ...(family.tribeOrClanEn ? [`Family Lineage: ${family.tribeOrClanEn}`] : []),
      ],
      sourceBn: defaultSourceBn,
      sourceEn: defaultSourceEn,
      accent: 'amber',
      highlightDirect: true,
      linkedBio: findLinkedBio(safeMotherBn),
    };

    const overviewNode: TreeNodePayload = {
      id: `${sahaba.id}-overview`,
      no: 0,
      roleBn: 'এক নজরে · পরিবার ও বংশপরিচয়',
      roleEn: 'Family Overview · At a Glance',
      nameBn: chronicle.overviewTitleBn || `${sahaba.nameBn}-এর পরিবার`,
      nameEn: chronicle.overviewTitleEn || `Family of ${activeName}`,
      pointsBn: chronicle.overviewPointsBn,
      pointsEn:
        chronicle.overviewPointsEn && chronicle.overviewPointsEn.length > 0
          ? chronicle.overviewPointsEn
          : chronicle.overviewPointsBn,
      sourceBn: defaultSourceBn,
      sourceEn: defaultSourceEn,
      accent: 'emerald',
      highlightDirect: true,
    };

    // Extract curated member cards (excluding auto-generated summary cards when raw arrays already build cleaner visual nodes)
    const curatedSpouseCards = chronicle.members.filter(
      (m) =>
        (m.group === 'wife' || m.group === 'umm_walad' || m.group === 'husband') &&
        !m.id.endsWith('-auto-spouses') &&
        !m.id.endsWith('-spouses')
    );

    const curatedChildCards = chronicle.members.filter(
      (m) => m.group === 'child'
    );

    const curatedLineageExtraCards = chronicle.members.filter(
      (m) =>
        m.group === 'lineage' &&
        !m.id.endsWith('-auto-lineage') &&
        !m.id.endsWith('-auto-relatives') &&
        !m.id.endsWith('-lineage') &&
        !m.id.endsWith('-verified-lineage')
    );

    // Build Child Nodes (prefer curated detailed child cards, supplemented by documented sonsBn / daughtersBn)
    const childNodes: Array<{ node: TreeNodePayload; kind: 'son' | 'daughter' | 'child'; rawText: string }> = [];
    const coveredChildNames: string[] = [];

    curatedChildCards.forEach((card) => {
      const n = nextNo();
      const rawName = card.nameBn;
      coveredChildNames.push(rawName.toLowerCase());
      const isDaughter =
        card.roleBadgeBn.includes('কন্যা') ||
        card.nameBn.includes('বিনতে') ||
        daughters.some((d) => rawName.includes(extractCoreNameBn(d)));
      childNodes.push({
        kind: isDaughter ? 'daughter' : 'son',
        rawText: `${card.nameBn} ${card.pointsBn.join(' ')}`,
        node: {
          id: card.id,
          no: n,
          roleBn: card.roleBadgeBn,
          roleEn: card.roleBadgeEn || card.roleBadgeBn,
          nameBn: card.nameBn,
          nameEn: card.nameEn || card.nameBn,
          pointsBn: card.pointsBn,
          pointsEn: card.pointsEn && card.pointsEn.length > 0 ? card.pointsEn : card.pointsBn,
          sourceBn: card.sourceBn,
          sourceEn: card.sourceEn || card.sourceBn,
          pageBadgeBn: card.pageBadgeBn,
          accent: isDaughter ? 'blue' : 'teal',
          linkedBio: findLinkedBio(card.nameBn),
        },
      });
    });

    // Add documented sons not already covered by individual child cards
    (chronicle.sonsBn || family.sonsBn || []).forEach((sonName, idx) => {
      const core = extractCoreNameBn(sonName).toLowerCase();
      const alreadyCovered =
        core.length >= 2 &&
        coveredChildNames.some((c) => c.includes(core) || sonName.toLowerCase().includes(c));
      if (alreadyCovered) return;
      const enSon = (chronicle.sonsEn || family.sonsEn || [])[idx] || sonName;
      const matchingBio = findLinkedBio(sonName);
      childNodes.push({
        kind: 'son',
        rawText: sonName,
        node: {
          id: `${sahaba.id}-son-${idx}`,
          no: nextNo(),
          roleBn: 'পুত্র সন্তান',
          roleEn: 'Son',
          nameBn: sonName,
          nameEn: enSon,
          pointsBn: matchingBio
            ? [matchingBio.biographyBn, ...(matchingBio.keyContributionsBn || [])]
            : [`${sahaba.nameBn}-এর পুত্র সন্তান: ${sonName}।`, ...chronicle.overviewPointsBn.slice(0, 1)],
          pointsEn: matchingBio?.biographyEn
            ? [matchingBio.biographyEn]
            : [`Son of ${activeName}: ${enSon}.`],
          sourceBn: matchingBio?.hadithOrSirahRefBn || defaultSourceBn,
          sourceEn: matchingBio?.hadithOrSirahRefEn || defaultSourceEn,
          accent: 'teal',
          linkedBio: matchingBio,
        },
      });
    });

    // Add documented daughters not already covered by individual child cards
    (chronicle.daughtersBn || family.daughtersBn || []).forEach((dName, idx) => {
      const core = extractCoreNameBn(dName).toLowerCase();
      const alreadyCovered =
        core.length >= 2 &&
        coveredChildNames.some((c) => c.includes(core) || dName.toLowerCase().includes(c));
      if (alreadyCovered) return;
      const enD = (chronicle.daughtersEn || family.daughtersEn || [])[idx] || dName;
      const matchingBio = findLinkedBio(dName);
      childNodes.push({
        kind: 'daughter',
        rawText: dName,
        node: {
          id: `${sahaba.id}-daughter-${idx}`,
          no: nextNo(),
          roleBn: 'কন্যা সন্তান',
          roleEn: 'Daughter',
          nameBn: dName,
          nameEn: enD,
          pointsBn: matchingBio
            ? [matchingBio.biographyBn, ...(matchingBio.keyContributionsBn || [])]
            : [`${sahaba.nameBn}-এর কন্যা সন্তান: ${dName}।`, ...chronicle.overviewPointsBn.slice(0, 1)],
          pointsEn: matchingBio?.biographyEn
            ? [matchingBio.biographyEn]
            : [`Daughter of ${activeName}: ${enD}.`],
          sourceBn: matchingBio?.hadithOrSirahRefBn || defaultSourceBn,
          sourceEn: matchingBio?.hadithOrSirahRefEn || defaultSourceEn,
          accent: 'blue',
          linkedBio: matchingBio,
        },
      });
    });

    // Build Spouse Nodes (prefer curated spouse cards, supplement from wivesBn/husbandsBn)
    const spouseListRaw = isFemaleCompanion
      ? chronicle.husbandsBn && chronicle.husbandsBn.length > 0
        ? chronicle.husbandsBn
        : family.wivesBn
      : chronicle.wivesBn && chronicle.wivesBn.length > 0
      ? chronicle.wivesBn
      : family.wivesBn;
    const spouseListEnRaw = isFemaleCompanion
      ? chronicle.husbandsEn && chronicle.husbandsEn.length > 0
        ? chronicle.husbandsEn
        : family.wivesEn
      : chronicle.wivesEn && chronicle.wivesEn.length > 0
      ? chronicle.wivesEn
      : family.wivesEn;

    interface SpouseBranchItem {
      spouseNode: TreeNodePayload;
      children: TreeNodePayload[];
      searchContext: string;
    }

    const spouseNodesRaw: Array<{ node: TreeNodePayload; searchContext: string }> = [];
    const coveredSpouseCores: string[] = [];

    curatedSpouseCards.forEach((card) => {
      const n = nextNo();
      const lowerFull = `${card.nameBn} ${card.pointsBn.join(' ')}`.toLowerCase();
      coveredSpouseCores.push(extractCoreNameBn(card.nameBn).toLowerCase());
      // Handle multi-spouse cards (e.g. "মুলাইকা বিনতে জারওয়াল ও কুরাইবা")
      card.nameBn.split(/\s+ও\s+|\s*,\s*/).forEach((seg) => {
        const c = extractCoreNameBn(seg).toLowerCase();
        if (c.length >= 2) coveredSpouseCores.push(c);
      });

      const isUmmWalad = card.group === 'umm_walad';
      const matchingBio = findLinkedBio(card.nameBn);
      spouseNodesRaw.push({
        searchContext: lowerFull,
        node: {
          id: card.id,
          no: n,
          roleBn: card.roleBadgeBn,
          roleEn: card.roleBadgeEn || card.roleBadgeBn,
          nameBn: card.nameBn,
          nameEn: card.nameEn || card.nameBn,
          pointsBn: card.pointsBn,
          pointsEn: card.pointsEn && card.pointsEn.length > 0 ? card.pointsEn : card.pointsBn,
          sourceBn: card.sourceBn,
          sourceEn: card.sourceEn || card.sourceBn,
          pageBadgeBn: card.pageBadgeBn,
          accent: isUmmWalad ? 'amber' : isFemaleCompanion ? 'amber' : 'violet',
          highlightDirect: n <= 4,
          linkedBio: matchingBio,
        },
      });
    });

    (spouseListRaw || []).forEach((spName, idx) => {
      const core = extractCoreNameBn(spName).toLowerCase();
      const alreadyCovered =
        core.length >= 2 &&
        (coveredSpouseCores.includes(core) ||
          spouseNodesRaw.some((s) => s.node.nameBn.toLowerCase().includes(core)));
      if (alreadyCovered) return;

      const enSp = (spouseListEnRaw || [])[idx] || spName;
      const matchingBio = findLinkedBio(spName);
      const isPluralList = (spouseListRaw || []).length > 1;
      spouseNodesRaw.push({
        searchContext: spName.toLowerCase(),
        node: {
          id: `${sahaba.id}-spouse-${idx}`,
          no: nextNo(),
          roleBn: isFemaleCompanion
            ? isPluralList
              ? `স্বামী ${toBn(idx + 1)}`
              : 'স্বামী ও দাম্পত্য'
            : isPluralList
            ? `স্ত্রী ${toBn(idx + 1)}/${toBn((spouseListRaw || []).length)}`
            : 'সহধর্মিণী (স্ত্রী)',
          roleEn: isFemaleCompanion
            ? isPluralList
              ? `Husband ${idx + 1}`
              : 'Husband'
            : isPluralList
            ? `Wife ${idx + 1}/${(spouseListRaw || []).length}`
            : 'Wife / Spouse',
          nameBn: spName,
          nameEn: enSp,
          pointsBn: matchingBio
            ? [matchingBio.biographyBn, ...(matchingBio.keyContributionsBn || [])]
            : [`${sahaba.nameBn}-এর ${isFemaleCompanion ? 'স্বামী' : 'সহধর্মিণী'}: ${spName}।`],
          pointsEn: matchingBio?.biographyEn
            ? [matchingBio.biographyEn]
            : [`${isFemaleCompanion ? 'Husband' : 'Spouse'} of ${activeName}: ${enSp}.`],
          sourceBn: matchingBio?.hadithOrSirahRefBn || defaultSourceBn,
          sourceEn: matchingBio?.hadithOrSirahRefEn || defaultSourceEn,
          accent: isFemaleCompanion ? 'amber' : 'violet',
          highlightDirect: idx === 0,
          linkedBio: matchingBio,
        },
      });
    });

    // Smart Mother-Child Linking: attach documented children to their mother branch when matched!
    const usedChildIds = new Set<string>();
    const spouseBranches: SpouseBranchItem[] = spouseNodesRaw.map((sp) => ({
      spouseNode: sp.node,
      children: [],
      searchContext: sp.searchContext,
    }));

    if (spouseBranches.length === 1 && childNodes.length > 0 && childNodes.length <= 6) {
      // Single spouse -> all children belong directly under this marriage branch!
      childNodes.forEach((ch) => {
        spouseBranches[0].children.push(ch.node);
        usedChildIds.add(ch.node.id);
      });
    } else if (spouseBranches.length > 1 && childNodes.length > 0) {
      childNodes.forEach((ch) => {
        const chCore = extractCoreNameBn(ch.node.nameBn).toLowerCase();
        const chTextLower = ch.rawText.toLowerCase();

        // Find matching mother branch
        let matchedBranch: SpouseBranchItem | undefined;
        for (const br of spouseBranches) {
          const spCore = extractCoreNameBn(br.spouseNode.nameBn).toLowerCase();
          // 1) Spouse card explicitly mentions child's core name ("তাঁর গর্ভে জন্ম নেন ...")
          if (chCore.length >= 3 && br.searchContext.includes(chCore)) {
            matchedBranch = br;
            break;
          }
          // 2) Child card explicitly mentions "মা <mother>" or mother's core name
          if (
            spCore.length >= 3 &&
            (chTextLower.includes(`মা ${spCore}`) || chTextLower.includes(`মা: ${spCore}`))
          ) {
            matchedBranch = br;
            break;
          }
        }

        if (matchedBranch) {
          matchedBranch.children.push(ch.node);
          usedChildIds.add(ch.node.id);
        }
      });
    }

    const unlinkedChildren = childNodes.filter((ch) => !usedChildIds.has(ch.node.id));
    const unlinkedSons = unlinkedChildren.filter((c) => c.kind === 'son').map((c) => c.node);
    const unlinkedDaughters = unlinkedChildren
      .filter((c) => c.kind === 'daughter')
      .map((c) => c.node);

    // Relatives & Extra Lineage cards
    const relativeNodes: TreeNodePayload[] = [];
    curatedLineageExtraCards.forEach((card) => {
      relativeNodes.push({
        id: card.id,
        no: nextNo(),
        roleBn: card.roleBadgeBn,
        roleEn: card.roleBadgeEn || card.roleBadgeBn,
        nameBn: card.nameBn,
        nameEn: card.nameEn || card.nameBn,
        pointsBn: card.pointsBn,
        pointsEn: card.pointsEn && card.pointsEn.length > 0 ? card.pointsEn : card.pointsBn,
        sourceBn: card.sourceBn,
        sourceEn: card.sourceEn || card.sourceBn,
        pageBadgeBn: card.pageBadgeBn,
        accent: 'indigo',
      });
    });

    const relArr = relatives || [];
    relArr.forEach((relText, idx) => {
      const [relNamePart, relRolePart] = relText.split(/\s*[—–-]\s*/);
      const matchingBio = findLinkedBio(relNamePart || relText);
      relativeNodes.push({
        id: `${sahaba.id}-rel-${idx}`,
        no: nextNo(),
        roleBn: relRolePart ? relRolePart.slice(0, 34) : 'বিশিষ্ট আত্মীয়',
        roleEn: relRolePart ? relRolePart.slice(0, 34) : 'Notable Kin',
        nameBn: relNamePart ? relNamePart.trim() : relText,
        nameEn: relNamePart ? relNamePart.trim() : relText,
        pointsBn: matchingBio
          ? [relText, matchingBio.biographyBn]
          : [relText],
        pointsEn: matchingBio?.biographyEn
          ? [relText, matchingBio.biographyEn]
          : [relText],
        sourceBn: matchingBio?.hadithOrSirahRefBn || defaultSourceBn,
        sourceEn: matchingBio?.hadithOrSirahRefEn || defaultSourceEn,
        accent: 'indigo',
        linkedBio: matchingBio,
      });
    });

    const branchCardsWithChildren = spouseBranches.filter((b) => b.children.length > 0);
    const spouseCardsOnly = spouseBranches.filter((b) => b.children.length === 0);

    return {
      parentsAvailable,
      fatherNode,
      motherNode,
      overviewNode,
      branchCardsWithChildren,
      spouseCardsOnly,
      unlinkedSons,
      unlinkedDaughters,
      relativeNodes,
      totalChildrenCount: childNodes.length,
      totalSpousesCount: spouseBranches.length,
    };
  }, [sahaba, activeName, isFemaleCompanion, family, chronicle, relatives, daughters, defaultSourceBn, defaultSourceEn]);

  // Classic PDF cards list for optional sequential card reading
  const filteredCards = useMemo(() => {
    return chronicle.members.filter((m) => {
      if (activeCardFilter === 'all') return true;
      if (activeCardFilter === 'spouses')
        return m.group === 'wife' || m.group === 'umm_walad' || m.group === 'husband';
      if (activeCardFilter === 'children')
        return m.group === 'child' || m.group === 'children_summary';
      return m.group === 'lineage';
    });
  }, [chronicle.members, activeCardFilter]);

  const handleOpenNode = (node: TreeNodePayload) => {
    if (soundEnabled) soundHaptics.playTap();
    setSelectedNode(node);
  };

  const handleCopyNode = async (node: TreeNodePayload) => {
    if (soundEnabled) soundHaptics.playTap();
    const pts = isBn ? node.pointsBn : node.pointsEn;
    const text = [
      `${isBn ? node.nameBn : node.nameEn} (${isBn ? node.roleBn : node.roleEn})`,
      ...pts.map((p) => `• ${p}`),
      `${isBn ? 'সূত্র' : 'Source'}: ${isBn ? node.sourceBn : node.sourceEn}`,
    ].join('\n');
    await copyToClipboard(text);
    setCopiedId(node.id);
    onShowToast(isBn ? 'তথ্য ও রেফারেন্স কপি হয়েছে' : 'Details & references copied');
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Compact Node Card matching ProphetFamilyTreeView design language
  const renderNodeCard = (
    node: TreeNodePayload,
    compact = false,
    overrideRoleBn?: string,
    overrideRoleEn?: string
  ) => {
    const isSelected = selectedNode?.id === node.id;
    const accentStyles: Record<AccentKey, { border: string; badge: string; bar: string; ring: string }> = {
      emerald: {
        border: isDay ? 'border-emerald-200/95 hover:border-emerald-500' : 'border-emerald-700/65 hover:border-emerald-400',
        badge: isDay ? 'text-emerald-700' : 'text-emerald-300',
        bar: 'bg-emerald-500',
        ring: 'ring-2 ring-emerald-500 border-emerald-500',
      },
      amber: {
        border: isDay ? 'border-amber-200/95 hover:border-amber-500' : 'border-amber-700/65 hover:border-amber-400',
        badge: isDay ? 'text-amber-700' : 'text-amber-300',
        bar: 'bg-amber-500',
        ring: 'ring-2 ring-amber-500 border-amber-500',
      },
      violet: {
        border: isDay ? 'border-violet-200/95 hover:border-violet-500' : 'border-violet-700/60 hover:border-violet-400',
        badge: isDay ? 'text-violet-700' : 'text-violet-300',
        bar: 'bg-violet-500',
        ring: 'ring-2 ring-violet-500 border-violet-500',
      },
      blue: {
        border: isDay ? 'border-sky-200/95 hover:border-sky-500' : 'border-sky-700/65 hover:border-sky-400',
        badge: isDay ? 'text-sky-700' : 'text-sky-300',
        bar: 'bg-sky-500',
        ring: 'ring-2 ring-sky-500 border-sky-500',
      },
      teal: {
        border: isDay ? 'border-teal-200/95 hover:border-teal-500' : 'border-teal-700/65 hover:border-teal-400',
        badge: isDay ? 'text-teal-700' : 'text-teal-300',
        bar: 'bg-teal-500',
        ring: 'ring-2 ring-teal-500 border-teal-500',
      },
      rose: {
        border: isDay ? 'border-rose-200/95 hover:border-rose-400' : 'border-rose-800/65 hover:border-rose-400',
        badge: isDay ? 'text-rose-700' : 'text-rose-300',
        bar: 'bg-rose-500',
        ring: 'ring-2 ring-rose-500 border-rose-500',
      },
      indigo: {
        border: isDay ? 'border-indigo-200/95 hover:border-indigo-400' : 'border-indigo-800/65 hover:border-indigo-400',
        badge: isDay ? 'text-indigo-700' : 'text-indigo-300',
        bar: 'bg-indigo-500',
        ring: 'ring-2 ring-indigo-500 border-indigo-500',
      },
    };

    const st = accentStyles[node.accent];
    const roleLabel = isBn ? overrideRoleBn || node.roleBn : overrideRoleEn || node.roleEn;
    const displayName = isBn ? node.nameBn : node.nameEn;

    return (
      <button
        key={node.id}
        type="button"
        onClick={() => handleOpenNode(node)}
        className={`group/node w-full text-left rounded-xl border transition-all duration-150 cursor-pointer relative overflow-hidden active:scale-[0.98] ${
          compact ? 'px-2.5 py-2' : 'px-3 py-2'
        } ${
          isDay
            ? node.highlightDirect
              ? 'bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/40 shadow-2xs'
              : 'bg-white shadow-2xs hover:shadow-sm'
            : node.highlightDirect
            ? 'bg-gradient-to-br from-[#0b2f27] to-[#08221d]'
            : 'bg-[#07201b] hover:bg-[#0a2b24]'
        } ${isSelected ? st.ring : st.border}`}
      >
        {node.highlightDirect && (
          <span aria-hidden="true" className={`absolute top-0 inset-x-0 h-[2px] ${st.bar} opacity-75`} />
        )}
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span className={`text-[9.5px] sm:text-[10px] font-extrabold tracking-wide truncate ${st.badge}`}>
            {roleLabel}
          </span>
          {node.no > 0 && (
            <span
              className={`text-[9.5px] sm:text-[10px] font-bold tabular-nums shrink-0 ${
                isDay ? 'text-slate-400' : 'text-emerald-400/75'
              }`}
            >
              {isBn ? toBn(node.no, true) : String(node.no).padStart(2, '0')}
            </span>
          )}
        </div>
        <div
          className={`font-extrabold leading-snug ${
            compact ? 'text-[11px] sm:text-[12px]' : 'text-[12px] sm:text-[13px]'
          } ${isDay ? 'text-slate-900' : 'text-white'}`}
        >
          {displayName}
        </div>
        <div
          className={`mt-1 flex items-center justify-between text-[9.5px] font-semibold ${
            isDay
              ? 'text-slate-400 group-hover/node:text-emerald-700'
              : 'text-emerald-400/65 group-hover/node:text-amber-300'
          }`}
        >
          <span className="truncate">{isBn ? 'বিস্তারিত ও রেফারেন্স' : 'Details & Ref'}</span>
          <ChevronRight className="w-3 h-3 shrink-0 transition-transform group-hover/node:translate-x-0.5" />
        </div>
      </button>
    );
  };

  const renderMarriageBond = (tone: 'amber' | 'emerald' = 'amber') => (
    <div className="flex items-center justify-center shrink-0" aria-hidden="true">
      <div
        className={`w-2 sm:w-3 h-[2px] ${
          tone === 'amber'
            ? isDay
              ? 'bg-amber-300'
              : 'bg-amber-600/70'
            : isDay
            ? 'bg-emerald-300'
            : 'bg-emerald-600/70'
        }`}
      />
      <div
        className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border shrink-0 ${
          tone === 'amber'
            ? isDay
              ? 'bg-amber-50 border-amber-300 text-amber-600'
              : 'bg-amber-950/70 border-amber-500/60 text-amber-300'
            : isDay
            ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
            : 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300'
        }`}
      >
        <Heart className="w-2.5 h-2.5 fill-current" />
      </div>
      <div
        className={`w-2 sm:w-3 h-[2px] ${
          tone === 'amber'
            ? isDay
              ? 'bg-amber-300'
              : 'bg-amber-600/70'
            : isDay
            ? 'bg-emerald-300'
            : 'bg-emerald-600/70'
        }`}
      />
    </div>
  );

  const renderVerticalTrunk = (labelBn?: string, labelEn?: string) => (
    <div className="flex flex-col items-center select-none" aria-hidden="true">
      <div
        className={`w-[2px] h-3 ${
          isDay
            ? 'bg-gradient-to-b from-emerald-400 via-amber-400 to-emerald-400'
            : 'bg-gradient-to-b from-emerald-500/80 via-amber-400/80 to-emerald-500/80'
        }`}
      />
      {(labelBn || labelEn) && (
        <>
          <span
            className={`text-[9.5px] font-extrabold tracking-wide px-2.5 py-0.5 rounded-full border text-center ${
              isDay
                ? 'bg-emerald-50 border-emerald-200/90 text-emerald-800'
                : 'bg-[#06221c] border-emerald-700/75 text-amber-300'
            }`}
          >
            {isBn ? labelBn : labelEn}
          </span>
          <div className={`w-[2px] h-2.5 ${isDay ? 'bg-emerald-400' : 'bg-emerald-500/80'}`} />
        </>
      )}
    </div>
  );

  const renderChildForkHeader = (labelBn: string, labelEn: string, multiColumn: boolean) => (
    <div className="flex flex-col items-center select-none mt-1" aria-hidden="true">
      <div className={`w-[2px] h-2.5 ${isDay ? 'bg-teal-400' : 'bg-teal-500/80'}`} />
      <span
        className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-full border ${
          isDay
            ? 'bg-teal-50 border-teal-200 text-teal-800'
            : 'bg-[#05231e] border-teal-700/70 text-teal-300'
        }`}
      >
        {isBn ? labelBn : labelEn}
      </span>
      <div className={`w-[2px] h-2 ${isDay ? 'bg-teal-400' : 'bg-teal-500/80'}`} />
      {multiColumn && (
        <div className="w-[54%] h-2 border-t-2 border-x-2 rounded-t-md border-teal-400/75 dark:border-teal-500/70" />
      )}
    </div>
  );

  const companionShort = shortCompanionLabel(activeName);

  return (
    <div
      className={`rounded-2xl border overflow-hidden shadow-md ${
        isDay
          ? 'bg-gradient-to-b from-emerald-50/55 via-[#FAFBF9] to-white border-emerald-200/90 text-slate-900'
          : 'bg-gradient-to-b from-[#06201b] via-[#051814] to-[#041210] border-emerald-800/50 text-slate-100'
      }`}
    >
      {/* Compact Emerald & Gold Header */}
      <div
        className={`px-3.5 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b ${
          isDay
            ? 'bg-gradient-to-r from-[#064e3b] via-[#065f46] to-[#047857] text-white border-amber-400/50'
            : 'bg-gradient-to-r from-[#052920] via-[#08382c] to-[#0a4435] text-white border-amber-500/35'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-300/40 flex items-center justify-center shrink-0">
            <GitBranch className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <div className="min-w-0">
            <h3 className="font-black text-xs sm:text-sm text-white leading-tight">
              {isBn
                ? isFemaleCompanion
                  ? 'পারিবারিক বংশবৃক্ষ · পিতা-মাতা, স্বামী ও সন্তানসন্ততি'
                  : 'পারিবারিক বংশবৃক্ষ · পিতা-মাতা, স্ত্রী ও সন্তানসন্ততি'
                : 'Family Genealogy Tree · Parents, Spouses & Descendants'}
            </h3>
            <p className="text-[10.5px] text-emerald-100/85 truncate">
              {isBn
                ? chronicle.summaryHeadlineBn
                : chronicle.summaryHeadlineEn || chronicle.summaryHeadlineBn}
              {hasCompleteFamilyChronicle ? (isBn ? ' · রেফারেন্সসহ সংকলন' : ' · Full References') : ''}
            </p>
          </div>
        </div>

        {/* Segmented Mode Switcher: Genealogy Tree | Detailed PDF Cards */}
        <div className="flex items-center gap-1 p-0.5 rounded-xl bg-black/25 border border-white/15 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              setDisplayMode('tree');
            }}
            className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition cursor-pointer flex items-center gap-1 ${
              displayMode === 'tree'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <GitBranch className="w-3 h-3" />
            <span>{isBn ? 'বংশবৃক্ষ' : 'Tree'}</span>
          </button>
          {chronicle.members.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setDisplayMode('cards');
              }}
              className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition cursor-pointer flex items-center gap-1 ${
                displayMode === 'cards'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>
                {isBn
                  ? `কার্ড (${formatNum(chronicle.members.length)})`
                  : `Cards (${chronicle.members.length})`}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* ================================================================= */}
      {/* MODE 1: VISUAL GENEALOGY TREE (MATCHING PROPHET FAMILY TREE STYLE) */}
      {/* ================================================================= */}
      {displayMode === 'tree' ? (
        <div className="p-3 sm:p-4 space-y-2.5">
          {/* Instruction Note + Source */}
          <div className="flex flex-wrap items-center justify-between gap-1 text-[10.5px]">
            <span className={`font-semibold ${isDay ? 'text-emerald-800' : 'text-emerald-300/85'}`}>
              {isBn
                ? 'যেকোনো নামের ওপর ট্যাপ করলে বিস্তারিত বিবরণ ও প্রামাণ্য সূত্র খুলবে'
                : 'Tap any family card to read detailed narrative & classical citations'}
            </span>
            <span className={`font-semibold truncate max-w-full ${isDay ? 'text-amber-700' : 'text-amber-300/80'}`}>
              {isBn ? 'সূত্র:' : 'Source:'} {isBn ? defaultSourceBn : defaultSourceEn}
            </span>
          </div>

          <div className="flex flex-col items-center">
            {/* LEVEL 1: PARENTS (পিতা ♥ মাতা) */}
            {treeModel.parentsAvailable && (
              <>
                <div className="w-full max-w-xl">
                  <div className="text-[10px] font-extrabold tracking-wider uppercase text-center mb-1.5 text-amber-700 dark:text-amber-300">
                    {isBn ? '১ম স্তর · পিতা ও মাতা' : 'Generation I · Parents'}
                  </div>
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                    {renderNodeCard(treeModel.fatherNode, true)}
                    {renderMarriageBond('amber')}
                    {renderNodeCard(treeModel.motherNode, true)}
                  </div>
                </div>
                {renderVerticalTrunk(
                  tribeName ? `${tribeName}` : 'পিতা-মাতার সন্তান',
                  tribeName || 'Offspring'
                )}
              </>
            )}

            {/* LEVEL 2: CENTRAL COMPANION ILLUMINATED CREST */}
            <button
              type="button"
              onClick={() => handleOpenNode(treeModel.overviewNode)}
              className={`group/crest relative overflow-hidden rounded-2xl border-[1.5px] px-4 py-3 text-center max-w-md w-full transition-all duration-200 cursor-pointer active:scale-[0.99] ${
                isDay
                  ? selectedNode?.id === treeModel.overviewNode.id
                    ? 'ring-2 ring-emerald-400/60 border-emerald-400 bg-gradient-to-br from-[#ecf9f2] via-white to-[#fefaf0] shadow-[0_8px_24px_-8px_rgba(5,150,105,0.22)]'
                    : 'border-emerald-300/85 hover:border-amber-400/90 bg-gradient-to-br from-[#edf9f3] via-white to-[#fefaf0] shadow-[0_6px_20px_-8px_rgba(5,150,105,0.16)] hover:shadow-[0_10px_24px_-8px_rgba(5,150,105,0.24)]'
                  : selectedNode?.id === treeModel.overviewNode.id
                  ? 'ring-2 ring-amber-400/70 border-amber-400 bg-gradient-to-br from-[#0d3a2f] via-[#092b23] to-[#12332a] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)]'
                  : 'border-emerald-600/65 hover:border-amber-400/75 bg-gradient-to-br from-[#0b3329] via-[#08261f] to-[#0f2d25] shadow-[0_6px_20px_-6px_rgba(0,0,0,0.38)]'
              }`}
            >
              {/* Soft Top Accent Hairline */}
              <span
                aria-hidden="true"
                className={`absolute top-0 inset-x-10 h-[2.5px] rounded-b-full ${
                  isDay
                    ? 'bg-gradient-to-r from-emerald-400/75 via-amber-400/85 to-emerald-400/75'
                    : 'bg-gradient-to-r from-emerald-400/60 via-amber-300/75 to-emerald-400/60'
                }`}
              />

              {/* Subtle Islamic Star Rosette Watermark */}
              <svg
                aria-hidden="true"
                viewBox="0 0 120 120"
                className={`pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 w-24 h-24 transition-transform duration-500 group-hover/crest:rotate-12 ${
                  isDay ? 'text-emerald-600/[0.07]' : 'text-amber-300/[0.08]'
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <rect x="24" y="24" width="72" height="72" />
                <rect x="24" y="24" width="72" height="72" transform="rotate(45 60 60)" />
                <circle cx="60" cy="60" r="22" />
              </svg>

              <div className="relative z-10 space-y-0.5">
                {sahaba.nameAr && (
                  <p
                    dir="rtl"
                    className={`font-arabic text-base sm:text-lg leading-none ${
                      isDay ? 'text-amber-700/90' : 'text-amber-200/95'
                    }`}
                  >
                    {sahaba.nameAr}
                  </p>
                )}
                <h4
                  className={`text-sm sm:text-base font-black tracking-tight ${
                    isDay ? 'text-[#064e3b]' : 'text-white'
                  }`}
                >
                  {activeName}
                </h4>
                <p
                  className={`text-[10.5px] font-semibold ${
                    isDay ? 'text-emerald-800/80' : 'text-emerald-200/85'
                  }`}
                >
                  {tribeName || (isBn ? sahaba.categoryBn : sahaba.categoryEn)} ·{' '}
                  {isBn
                    ? chronicle.summaryHeadlineBn
                    : chronicle.summaryHeadlineEn || chronicle.summaryHeadlineBn}
                </p>
                <span
                  className={`inline-flex items-center gap-1 pt-0.5 text-[10.5px] font-bold transition-colors ${
                    isDay
                      ? 'text-emerald-700 group-hover/crest:text-amber-700'
                      : 'text-amber-300/95 group-hover/crest:text-amber-200'
                  }`}
                >
                  <span>{isBn ? 'এক নজরে পরিবার ও সূত্র দেখুন' : 'Family Overview & Citations'}</span>
                  <ChevronRight className="w-3 h-3 transition-transform group-hover/crest:translate-x-0.5" />
                </span>
              </div>
            </button>

            {/* TRUNK TO SPOUSES / DESCENDANTS */}
            {(treeModel.branchCardsWithChildren.length > 0 ||
              treeModel.spouseCardsOnly.length > 0 ||
              treeModel.unlinkedSons.length > 0 ||
              treeModel.unlinkedDaughters.length > 0) &&
              renderVerticalTrunk(
                isBn
                  ? `দাম্পত্য ও বংশধারা${treeModel.totalSpousesCount > 0 ? ` · ${toBn(treeModel.totalSpousesCount)} ${isFemaleCompanion ? 'স্বামী' : 'স্ত্রী'}` : ''}${treeModel.totalChildrenCount > 0 ? ` · ${toBn(treeModel.totalChildrenCount)} সন্তান` : ''}`
                  : `Spouses & Descendants`,
                'Spouses & Descendants'
              )}

            {/* LEVEL 3A: SPOUSE -> CHILDREN BRANCH CARDS (MATCHING DAUGHTER BRANCHES IN SCREENSHOT, ZERO EMPTY GAP) */}
            {treeModel.branchCardsWithChildren.length > 0 && (
              <div
                className={`w-full grid grid-cols-1 ${
                  treeModel.branchCardsWithChildren.length === 2
                    ? 'lg:grid-cols-2'
                    : treeModel.branchCardsWithChildren.length >= 3
                    ? 'lg:grid-cols-3'
                    : 'max-w-xl mx-auto'
                } gap-2.5 items-start`}
              >
                {treeModel.branchCardsWithChildren.map((branch, bIdx) => (
                  <div
                    key={branch.spouseNode.id}
                    className={`rounded-2xl border p-2.5 space-y-1.5 ${
                      isDay
                        ? 'bg-white border-emerald-200/90 shadow-2xs'
                        : 'bg-[#061d18] border-emerald-800/60'
                    }`}
                  >
                    <div className="text-[10px] font-extrabold text-emerald-700 dark:text-amber-300 uppercase tracking-wide text-center flex items-center justify-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                      <span className="truncate">
                        {isBn
                          ? `${isFemaleCompanion ? 'স্বামী শাখা' : 'পরিবার শাখা'} ${toBn(bIdx + 1)} · ${extractCoreNameBn(branch.spouseNode.nameBn)}`
                          : `Branch ${bIdx + 1} · ${branch.spouseNode.nameEn}`}
                      </span>
                    </div>

                    {/* Side-by-side Couple Bond (Partner ♥ Companion) */}
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                      <div
                        className={`rounded-xl border px-2 py-1.5 text-left ${
                          isDay
                            ? 'bg-emerald-50/75 border-emerald-200/90 text-emerald-950'
                            : 'bg-[#082922] border-emerald-700/60 text-emerald-100'
                        }`}
                      >
                        <div className="text-[9px] font-extrabold text-emerald-700 dark:text-emerald-300 truncate">
                          {isBn ? (isFemaleCompanion ? 'স্ত্রী' : 'স্বামী') : isFemaleCompanion ? 'Wife' : 'Husband'}
                        </div>
                        <div className="text-[11px] font-black leading-snug truncate">
                          {companionShort}
                        </div>
                      </div>
                      {renderMarriageBond(bIdx === 0 ? 'emerald' : 'amber')}
                      {renderNodeCard(branch.spouseNode, true)}
                    </div>

                    {/* Fork into linked children */}
                    <div>
                      {renderChildForkHeader(
                        `সন্তান (${toBn(branch.children.length)} জন)`,
                        `Children (${branch.children.length})`,
                        branch.children.length > 1
                      )}
                      <div
                        className={`grid ${
                          branch.children.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                        } gap-1.5`}
                      >
                        {branch.children.map((ch) => renderNodeCard(ch, true))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* LEVEL 3B: REMAINING SPOUSES (CLEAN FRAMED GROUP BOX) */}
            {treeModel.spouseCardsOnly.length > 0 && (
              <div
                className={`w-full mt-2.5 rounded-2xl border p-2.5 sm:p-3 space-y-2 ${
                  isDay
                    ? 'bg-white/95 border-violet-200/85 shadow-2xs'
                    : 'bg-[#061c17]/95 border-violet-800/50'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-[11px] font-black text-violet-800 dark:text-violet-300 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-current shrink-0" />
                    <span>
                      {isBn
                        ? treeModel.branchCardsWithChildren.length > 0
                          ? `অন্যান্য ${isFemaleCompanion ? 'স্বামী' : 'সহধর্মিণী'} (${toBn(treeModel.spouseCardsOnly.length)} জন)`
                          : `${isFemaleCompanion ? 'স্বামী' : 'সহধর্মিণীগণ'} (${toBn(treeModel.spouseCardsOnly.length)} জন)`
                        : `${isFemaleCompanion ? 'Husbands' : 'Spouses'} (${treeModel.spouseCardsOnly.length})`}
                    </span>
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-emerald-300/65">
                    {isBn ? 'নামে ট্যাপ করে বিবরণ দেখুন' : 'Tap any card for details'}
                  </span>
                </div>
                <div
                  className={`grid grid-cols-1 ${
                    treeModel.spouseCardsOnly.length === 2
                      ? 'sm:grid-cols-2'
                      : treeModel.spouseCardsOnly.length >= 3
                      ? 'sm:grid-cols-2 lg:grid-cols-3'
                      : ''
                  } gap-1.5 items-start`}
                >
                  {treeModel.spouseCardsOnly.map((sp) => renderNodeCard(sp.spouseNode, true))}
                </div>
              </div>
            )}

            {/* LEVEL 4A: UNLINKED SONS GROUP BOX (MATCHING SKY-BLUE BOX IN SCREENSHOT) */}
            {treeModel.unlinkedSons.length > 0 && (
              <div
                className={`w-full mt-2.5 rounded-2xl border p-2.5 sm:p-3 space-y-2 ${
                  isDay
                    ? 'bg-white/95 border-sky-200/85 shadow-2xs'
                    : 'bg-[#061c17]/95 border-sky-800/50'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-[11px] font-black text-sky-800 dark:text-sky-300">
                    {isBn
                      ? `পুত্র সন্তান (${toBn(treeModel.unlinkedSons.length)} জন)`
                      : `Sons (${treeModel.unlinkedSons.length})`}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-emerald-300/65 truncate max-w-[70%]">
                    {treeModel.unlinkedSons
                      .slice(0, 4)
                      .map((s) => (isBn ? s.nameBn : s.nameEn))
                      .join(' · ')}
                    {treeModel.unlinkedSons.length > 4 ? ' …' : ''}
                  </span>
                </div>
                <div
                  className={`grid grid-cols-1 ${
                    treeModel.unlinkedSons.length === 2
                      ? 'sm:grid-cols-2'
                      : treeModel.unlinkedSons.length >= 3
                      ? 'sm:grid-cols-2 lg:grid-cols-3'
                      : ''
                  } gap-1.5 items-start`}
                >
                  {treeModel.unlinkedSons.map((son) => renderNodeCard(son, true))}
                </div>
              </div>
            )}

            {/* LEVEL 4B: UNLINKED DAUGHTERS GROUP BOX */}
            {treeModel.unlinkedDaughters.length > 0 && (
              <div
                className={`w-full mt-2.5 rounded-2xl border p-2.5 sm:p-3 space-y-2 ${
                  isDay
                    ? 'bg-white/95 border-teal-200/85 shadow-2xs'
                    : 'bg-[#061c17]/95 border-teal-800/50'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-[11px] font-black text-teal-800 dark:text-teal-300">
                    {isBn
                      ? `কন্যা সন্তান (${toBn(treeModel.unlinkedDaughters.length)} জন)`
                      : `Daughters (${treeModel.unlinkedDaughters.length})`}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-emerald-300/65 truncate max-w-[70%]">
                    {treeModel.unlinkedDaughters
                      .slice(0, 4)
                      .map((d) => (isBn ? d.nameBn : d.nameEn))
                      .join(' · ')}
                    {treeModel.unlinkedDaughters.length > 4 ? ' …' : ''}
                  </span>
                </div>
                <div
                  className={`grid grid-cols-1 ${
                    treeModel.unlinkedDaughters.length === 2
                      ? 'sm:grid-cols-2'
                      : treeModel.unlinkedDaughters.length >= 3
                      ? 'sm:grid-cols-2 lg:grid-cols-3'
                      : ''
                  } gap-1.5 items-start`}
                >
                  {treeModel.unlinkedDaughters.map((daughter) => renderNodeCard(daughter, true))}
                </div>
              </div>
            )}

            {/* LEVEL 5: NOTABLE RELATIVES & KINSHIP CONNECTIONS */}
            {treeModel.relativeNodes.length > 0 && (
              <div
                className={`w-full mt-2.5 rounded-2xl border p-2.5 sm:p-3 space-y-2 ${
                  isDay
                    ? 'bg-white/95 border-indigo-200/80 shadow-2xs'
                    : 'bg-[#061c17]/95 border-indigo-800/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-black text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {isBn
                        ? `বিশিষ্ট আত্মীয়স্বজন ও বংশীয় শাখা (${toBn(treeModel.relativeNodes.length)})`
                        : `Notable Relatives & Kinship (${treeModel.relativeNodes.length})`}
                    </span>
                  </span>
                </div>
                <div
                  className={`grid grid-cols-1 ${
                    treeModel.relativeNodes.length === 2
                      ? 'sm:grid-cols-2'
                      : treeModel.relativeNodes.length >= 3
                      ? 'sm:grid-cols-2 lg:grid-cols-3'
                      : ''
                  } gap-1.5 items-start`}
                >
                  {treeModel.relativeNodes.map((rel) => renderNodeCard(rel, true))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ================================================================= */
        /* MODE 2: DETAILED SEQUENTIAL CARDS (PRESERVES ALL PDF CARDS)       */
        /* ================================================================= */
        <div className="p-3 sm:p-4 space-y-3">
          {/* Filter + Slide Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: 'all', bn: `সব (${formatNum(chronicle.members.length)})`, en: `All (${chronicle.members.length})` },
                  { id: 'spouses', bn: isFemaleCompanion ? 'স্বামী' : 'স্ত্রীগণ', en: isFemaleCompanion ? 'Husband' : 'Wives' },
                  { id: 'children', bn: 'সন্তানগণ', en: 'Children' },
                  { id: 'lineage', bn: 'বংশধারা', en: 'Lineage' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveCardFilter(tab.id);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                    activeCardFilter === tab.id
                      ? 'bg-emerald-700 text-white border-emerald-600'
                      : isDay
                      ? 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                      : 'bg-[#092020] text-slate-300 border-emerald-900/60 hover:bg-emerald-950'
                  }`}
                >
                  {isBn ? tab.bn : tab.en}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`grid grid-cols-1 ${
              filteredCards.length > 1 ? 'md:grid-cols-2' : ''
            } gap-3 items-start`}
          >
            {filteredCards.map((card: FamilyMemberDetailCard) => {
              const pts = isBn
                ? card.pointsBn
                : card.pointsEn && card.pointsEn.length > 0
                ? card.pointsEn
                : card.pointsBn;
              const src = isBn ? card.sourceBn : card.sourceEn || card.sourceBn;
              return (
                <div
                  key={card.id}
                  className={`rounded-xl border overflow-hidden shadow-2xs ${
                    isDay
                      ? 'bg-white border-emerald-200/90'
                      : 'bg-[#071c1b] border-emerald-800/50'
                  }`}
                >
                  <div
                    className={`px-3 py-2 flex items-start justify-between gap-2 border-b ${
                      isDay
                        ? 'bg-gradient-to-r from-[#064e3b] to-[#065f46] text-white border-amber-400/60'
                        : 'bg-gradient-to-r from-[#072b24] to-[#0b392e] text-white border-amber-500/40'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-200">
                        <span>{isBn ? card.roleBadgeBn : card.roleBadgeEn || card.roleBadgeBn}</span>
                        {card.pageBadgeBn && isBn && (
                          <span className="text-emerald-100/80 font-semibold">· {card.pageBadgeBn}</span>
                        )}
                      </div>
                      <h5 className="text-xs sm:text-sm font-black text-white leading-snug">
                        {isBn ? card.nameBn : card.nameEn || card.nameBn}
                      </h5>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        void copyToClipboard(
                          `${card.nameBn}\n${pts.join('\n')}\nসূত্র: ${src}`
                        );
                        onShowToast(isBn ? 'পারিবারিক কার্ড কপি হয়েছে' : 'Card copied');
                      }}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <ul className="p-3 space-y-1.5 text-xs leading-relaxed">
                    {pts.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span
                          className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            isDay ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className={isDay ? 'text-slate-700' : 'text-slate-200'}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`px-3 py-1.5 border-t text-[11px] font-semibold flex items-center gap-1.5 ${
                      isDay
                        ? 'bg-amber-50/60 border-amber-200/70 text-amber-900'
                        : 'bg-[#051414] border-amber-500/20 text-amber-300/90'
                    }`}
                  >
                    <BookOpen className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate">
                      {isBn ? 'সূত্র:' : 'Source:'} {src}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* INTERACTIVE NODE DETAIL & REFERENCES SHEET                        */}
      {/* ================================================================= */}
      {selectedNode && (
        <div
          onClick={() => setSelectedNode(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-[2px] animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg rounded-2xl border overflow-hidden shadow-2xl max-h-[88vh] flex flex-col ${
              isDay
                ? 'bg-[#FDFBF7] border-emerald-200 text-slate-900'
                : 'bg-[#061d18] border-emerald-700/70 text-white'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#064e3b] via-[#065f46] to-[#047857] px-4 py-3 text-white flex items-start justify-between gap-3 border-b border-amber-400/50 shrink-0">
              <div className="min-w-0 space-y-0.5">
                <div className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-extrabold text-amber-200">
                  <span>{isBn ? selectedNode.roleBn : selectedNode.roleEn}</span>
                  {selectedNode.pageBadgeBn && isBn && (
                    <span className="text-emerald-100/85">· {selectedNode.pageBadgeBn}</span>
                  )}
                </div>
                <h4 className="text-sm sm:text-base font-black text-white leading-snug">
                  {isBn ? selectedNode.nameBn : selectedNode.nameEn}
                </h4>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyNode(selectedNode)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold cursor-pointer"
                >
                  {copiedId === selectedNode.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === selectedNode.id ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি' : 'Copy')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedNode(null)}
                  className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3 overflow-y-auto text-xs sm:text-sm leading-relaxed">
              <ul className="space-y-2">
                {(isBn ? selectedNode.pointsBn : selectedNode.pointsEn).map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      className={`mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        isDay ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className={isDay ? 'text-slate-700' : 'text-slate-200'}>{pt}</span>
                  </li>
                ))}
              </ul>

              {selectedNode.linkedBio && (
                <div
                  className={`p-3 rounded-xl border space-y-1.5 ${
                    isDay
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-[#08261f] border-emerald-700/50 text-emerald-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold text-emerald-700 dark:text-amber-300">
                      {isBn ? 'সংযুক্ত জীবনচরিত ও অবদান' : 'Extended Biography'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const bio = selectedNode.linkedBio!;
                        setSelectedNode(null);
                        onOpenFamilyBioModal(bio);
                      }}
                      className="text-[11px] font-bold text-amber-700 dark:text-amber-300 underline cursor-pointer"
                    >
                      {isBn ? 'পূর্ণ জীবনী খুলুন →' : 'Full Bio →'}
                    </button>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">
                    {isBn
                      ? selectedNode.linkedBio.biographyBn
                      : selectedNode.linkedBio.biographyEn || selectedNode.linkedBio.biographyBn}
                  </p>
                </div>
              )}

              <div
                className={`pt-2.5 border-t flex items-start gap-1.5 text-[11px] font-semibold ${
                  isDay ? 'border-amber-200/70 text-amber-900' : 'border-amber-500/25 text-amber-300'
                }`}
              >
                <ScrollText className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  {isBn ? 'প্রামাণ্য সূত্র:' : 'Verified Reference:'}{' '}
                  {isBn ? selectedNode.sourceBn : selectedNode.sourceEn}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
