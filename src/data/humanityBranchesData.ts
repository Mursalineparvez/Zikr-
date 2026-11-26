/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type HumanityEraGroup =
  | 'origin'
  | 'flood_reset'
  | 'three_sons'
  | 'prophetic_ummahs'
  | 'final_ummah'
  | 'modern_world';

export type RootLineFilter = 'all' | 'sam' | 'ham' | 'yafith';

export interface HumanityTreeNode {
  id: string;
  eraGroup: HumanityEraGroup;
  rootLine?: Exclude<RootLineFilter, 'all'>;
  stepBadgeBn: string;
  stepBadgeEn: string;
  titleBn: string;
  titleEn: string;
  titleAr: string;
  subtitleBn: string;
  subtitleEn: string;
  howSplitBn: string;
  howSplitEn: string;
  keyBranchesBn: string;
  keyBranchesEn: string;
  modernLocationBn: string;
  modernLocationEn: string;
  detailBn: string;
  detailEn: string;
  referenceBn: string;
  referenceEn: string;
  x: number;
  y: number;
  width: number;
}

export interface HumanityTreeEdge {
  id: string;
  from: string;
  to: string;
  kind: 'direct' | 'descent' | 'global';
  eraGroup: HumanityEraGroup;
  labelBn?: string;
  labelEn?: string;
}

export interface PersonToNationEntry {
  id: string;
  rootLine: Exclude<RootLineFilter, 'all'>;
  ancestorPersonBn: string;
  ancestorPersonEn: string;
  ancestorAr: string;
  parentLineBn: string;
  parentLineEn: string;
  howDividedBn: string;
  howDividedEn: string;
  nationsFormedBn: string;
  nationsFormedEn: string;
  whereTodayBn: string;
  whereTodayEn: string;
  sourceNoteBn: string;
  sourceNoteEn: string;
}

export interface HumanityEraListItem {
  id: string;
  order: number;
  eraGroup: HumanityEraGroup;
  eraTagBn: string;
  eraTagEn: string;
  titleBn: string;
  titleEn: string;
  titleAr: string;
  rootOrProphetBn: string;
  rootOrProphetEn: string;
  howSplitBn: string;
  howSplitEn: string;
  whereTodayBn: string;
  whereTodayEn: string;
  summaryBn: string;
  summaryEn: string;
  branchesBn: string[];
  branchesEn: string[];
  scholarlyNoteBn: string;
  scholarlyNoteEn: string;
  referenceBn: string;
  referenceEn: string;
}

export interface ClassicalSourceBook {
  id: string;
  titleBn: string;
  titleEn: string;
  titleAr: string;
  authorBn: string;
  authorEn: string;
  eraBn: string;
  eraEn: string;
  contributionBn: string;
  contributionEn: string;
}

export type ArRaheeqCategory =
  | 'all'
  | 'baidah'
  | 'aribah_qahtan'
  | 'mustaribah_adnan'
  | 'governance_kabah'
  | 'religion_world';

export interface ArRaheeqTribeBranch {
  nameBn: string;
  nameEn: string;
  nameAr: string;
  lineageBn: string;
  lineageEn: string;
  settlementBn: string;
  settlementEn: string;
  keyFactsBn: string;
  keyFactsEn: string;
}

export interface ArRaheeqChapterSection {
  id: string;
  order: number;
  category: Exclude<ArRaheeqCategory, 'all'>;
  chapterTagBn: string;
  chapterTagEn: string;
  titleBn: string;
  titleEn: string;
  titleAr: string;
  summaryBn: string;
  summaryEn: string;
  howSplitBn: string;
  howSplitEn: string;
  turningPointBn: string;
  turningPointEn: string;
  subBranches: ArRaheeqTribeBranch[];
  sourceChapterBn: string;
  sourceChapterEn: string;
}

export interface ArRaheeqGenealogyStep {
  nameBn: string;
  nameEn: string;
  nameAr: string;
  noteBn: string;
  noteEn: string;
}

export interface ArRaheeqGenealogyTrack {
  id: string;
  trackType: 'qahtan' | 'adnan';
  titleBn: string;
  titleEn: string;
  titleAr: string;
  subtitleBn: string;
  subtitleEn: string;
  steps: ArRaheeqGenealogyStep[];
}

export const HUMANITY_CANVAS_WIDTH = 1520;
export const HUMANITY_CANVAS_HEIGHT = 1750;

export const HUMANITY_TREE_NODES: HumanityTreeNode[] = [
  // ================= TIER 1 (y=85): ADAM & HAWWA =================
  {
    id: 'hum_adam',
    eraGroup: 'origin',
    stepBadgeBn: 'যুগ ০১ · আদি সূচনা',
    stepBadgeEn: 'Era 01 · Origin',
    titleBn: 'হযরত আদম ও হাওয়া (আ.)',
    titleEn: 'Adam & Hawwa (AS)',
    titleAr: 'آدَمُ وَحَوَّاءُ عَلَيْهِمَا السَّلَام',
    subtitleBn: 'সমগ্র মানবজাতির একমাত্র আদি পিতা-মাতা',
    subtitleEn: 'Parents of All Mankind',
    howSplitBn: 'তাঁদের দুই পুত্র হাবীল (নিহত), কাবীল ও শীস (আ.)-এর মাধ্যমে প্রথম মানবসমাজ গড়ে ওঠে।',
    howSplitEn: 'Humanity began multiplying through Qabil, Habil, and Prophet Shayth (AS).',
    keyBranchesBn: 'শীস (আ.) ও আদম-সন্তানগণ',
    keyBranchesEn: 'Shayth (AS) & Children of Adam',
    modernLocationBn: 'সমগ্র পৃথিবীর সকল মহাদেশ (১৯৫+ দেশ)',
    modernLocationEn: 'All continents worldwide (195+ nations)',
    detailBn:
      'পৃথিবীর প্রতিটি মানুষ—যে কোনো বর্ণ, ভাষা বা দেশের হোক না কেন—হযরত আদম (আ.) ও বিবি হাওয়া (আ.)-এর বংশধর।',
    detailEn:
      'Every human being of any ethnicity, language, or continent traces their origin back to Prophet Adam and Hawwa (AS).',
    referenceBn: 'সূরা আন-নিসা ৪:১ · সূরা আল-হুজুরাত ৪৯:১৩',
    referenceEn: 'Surah An-Nisa 4:1 · Al-Hujurat 49:13',
    x: 760,
    y: 85,
    width: 280,
  },

  // ================= TIER 2 (y=240): PRE-FLOOD =================
  {
    id: 'hum_pre_flood',
    eraGroup: 'origin',
    stepBadgeBn: 'যুগ ০২ · ১০ প্রজন্ম',
    stepBadgeEn: 'Era 02 · 10 Gens',
    titleBn: 'শীস (আ.) → ইদরীস (আ.) · প্লাবন-পূর্ব যুগ',
    titleEn: 'Shayth to Idris (AS) · Pre-Flood Era',
    titleAr: 'شِيثُ وَإِدْرِيسُ عَلَيْهِمَا السَّلَام',
    subtitleBn: 'আদম থেকে নূহ (আ.) পর্যন্ত তাওহীদী যুগ ও প্রথম বিভাজন',
    subtitleEn: 'Ten Generations Before the Flood',
    howSplitBn: 'শীস → আনূশ → কাইনান → মাহলাঈল → ইয়ারাদ → ইদরীস → মাতূশালাখ → লামিক; পরে শিরক দেখা দেয়।',
    howSplitEn: 'Generations branched from Shayth to Idris and Lamick across early settlements.',
    keyBranchesBn: 'আদম থেকে নূহ (আ.) পর্যন্ত ১০ শতাব্দী',
    keyBranchesEn: '10 Centuries on Tawhid Before Idolatry',
    modernLocationBn: 'মেসোপটেমিয়া ও আদি মধ্যপ্রাচ্য (প্রাচীন আবাস)',
    modernLocationEn: 'Ancient Mesopotamia & Near East',
    detailBn:
      'সহীহ বুখারীতে ইবনে আব্বাস (রা.) জানান, আদম ও নূহের মাঝে ১০ প্রজন্ম মানুষ তাওহীদে ছিল; পরে নেককারদের মূর্তি-পূজার মাধ্যমে শিরক ও গোত্রীয় বিভেদ শুরু হয়।',
    detailEn:
      'Between Adam and Nuh (AS), 10 generations held onto Tawhid before idol veneration and moral corruption emerged.',
    referenceBn: 'সহীহ বুখারী · সূরা নূহ ৭১:২৩',
    referenceEn: 'Sahih al-Bukhari · Surah Nuh 71:23',
    x: 760,
    y: 240,
    width: 300,
  },

  // ================= TIER 3 (y=395): FLOOD & ~80 BELIEVERS =================
  {
    id: 'hum_nuh_flood',
    eraGroup: 'flood_reset',
    stepBadgeBn: 'যুগ ০৩ · মহাপ্লাবন',
    stepBadgeEn: 'Era 03 · Great Flood',
    titleBn: 'নূহ (আ.) ও মহাপ্লাবন · সব অবিশ্বাসী ধ্বংস',
    titleEn: 'Nuh (AS) & Great Flood · Disbelievers Perished',
    titleAr: 'نُوحٌ عَلَيْهِ السَّلَام وَالطُّوفَان',
    subtitleBn: 'প্লাবন-পূর্ব অবিশ্বাসী সব শাখা বিলুপ্ত',
    subtitleEn: 'Pre-Flood Corrupt Nations Swept Away',
    howSplitBn: 'ইয়াম (কান‘আন) ও কাফির গোষ্ঠী ধ্বংস হয়; পৃথিবীর পুরনো জনবসতি ভেঙে নতুন সূচনা ঘটে।',
    howSplitEn: 'Yam and all disbelieving tribes perished; humanity reset from Mount Judi.',
    keyBranchesBn: 'প্লাবন-পূর্ব সকল অবিশ্বাসী কওম বিলুপ্ত',
    keyBranchesEn: 'All Disbelieving Pre-Flood Tribes Erased',
    modernLocationBn: 'জুদী পর্বত এলাকা (দক্ষিণ-পূর্ব তুরস্ক / উত্তর ইরাক)',
    modernLocationEn: 'Mount Judi Region (SE Turkey / Upper Mesopotamia)',
    detailBn:
      'সাড়ে নয়শ বছরের দাওয়াতের পর মহাপ্লাবনে কেবল নূহ (আ.)-এর কিস্তির যাত্রীরা রক্ষা পান, বাকিরা সম্পূর্ণরূপে ধ্বংস হয়ে যায়।',
    detailEn:
      'After 950 years of preaching, the Flood ended all disbelieving lineages while preserving Nuh (AS) and his companions.',
    referenceBn: 'সূরা হূদ ১১:৪০-৪৪ · সূরা আল-আনকাবূত ২৯:১৪',
    referenceEn: 'Surah Hud 11:40-44 · Al-Ankabut 29:14',
    x: 530,
    y: 395,
    width: 270,
  },
  {
    id: 'hum_ark_80',
    eraGroup: 'flood_reset',
    stepBadgeBn: 'নতুন সূচনা · ~৮০ মুমিন',
    stepBadgeEn: 'The Ark · ~80 Believers',
    titleBn: 'নূহের কিস্তি (~৮০ মুমিন পরিবার) → নূহী বংশ',
    titleEn: 'Nuh’s Ark (~80 Believers) → Surviving Line',
    titleAr: 'سَفِينَةُ نُوحٍ وَالْبَاقُونَ',
    subtitleBn: 'তাফসীরে ~৮০ জন; কুরআনে নূহ (আ.)-এর বংশধরই টিকে থাকে',
    subtitleEn: '~80 Aboard; Quran 37:77 Confirms Nuh’s Posterity',
    howSplitBn: 'ইবনে আব্বাস (রা.)-এর মতে কিস্তিতে ~৮০ জন ছিলেন, তবে স্থায়ী বংশ চলে কেবল নূহের ৩ পুত্র থেকে।',
    howSplitEn: 'Around 80 believers survived on the Ark; lasting posterity came via Nuh’s 3 sons.',
    keyBranchesBn: 'সাম, হাম ও ইয়াফিস · "ক্বারইয়াতুস সামানীন" (আশিজনের গ্রাম)',
    keyBranchesEn: 'Sam, Ham & Yafith · Qaryat al-Thamanin (Village of 80)',
    modernLocationBn: 'জুদী পর্বতের পাদদেশ (উত্তর মেসোপটেমিয়া) → সমগ্র পৃথিবীতে বিস্তার',
    modernLocationEn: 'Mount Judi Foothills → Dispersed Across the Globe',
    detailBn:
      'তাফসীরে ইবনে কাসীর (১১:৪০ ও ৩৭:৭৭) ও তারীখে তাবারী মতে কিস্তিতে প্রায় ৮০ জন মুমিন (আশিজনের গ্রাম: "সূকুস সামানীন") রক্ষা পান। তবে সূরা আস-সাফফাত (৩৭:৭৭)-এর ঘোষণা "ওয়া জা‘আলনা যুররিয়্যাতাহু হুমুল বাকীন" অনুযায়ী বাকিদের বংশ স্থায়ী হয়নি; ফলে আজকের সমগ্র মানবজাতি নূহ (আ.)-এর তিন পুত্র সাম, হাম ও ইয়াফিস থেকেই বিস্তার লাভ করেছে।',
    detailEn:
      'Tafsir Ibn Kathir & Tarikh al-Tabari record ~80 believers landed near Mount Judi and founded Qaryat al-Thamanin ("Village of the Eighty"), while Quran 37:77 clarifies only Nuh’s three sons left lasting posterity worldwide.',
    referenceBn: 'সূরা আস-সাফফাত ৩৭:৭৭ · তাফসীরে ইবনে কাসীর · তারীখে তাবারী',
    referenceEn: 'Surah As-Saffat 37:77 · Tafsir Ibn Kathir · Tarikh al-Tabari',
    x: 990,
    y: 395,
    width: 300,
  },

  // ================= TIER 4 (y=565): THE 3 ROOT BRANCHES =================
  {
    id: 'hum_sam',
    eraGroup: 'three_sons',
    rootLine: 'sam',
    stepBadgeBn: 'মূল ব্যক্তি ০১ · সাম',
    stepBadgeEn: 'Root Person 01 · Sam',
    titleBn: 'সাম ইবনে নূহ (আ.)',
    titleEn: 'Sam ibn Nuh (Semitic Root)',
    titleAr: 'سَامُ بْنُ نُوحٍ',
    subtitleBn: 'আরব, বনী ইসরাঈল, সিরিয় ও মেসোপটেমীয় জাতির আদি পিতা',
    subtitleEn: 'Ancestor of Arabs, Israelites & Mesopotamians',
    howSplitBn: 'সামের ৫ প্রধান পুত্র: আরফাকশাদ, ইরাম, আশূর, ইলাম ও লাউয—যাঁদের থেকে মধ্যপ্রাচ্যের জাতিগুলো ভাগ হয়।',
    howSplitEn: 'Sam branched via 5 sons: Arfakhshad, Eram, Ashur, Elam, and Lud.',
    keyBranchesBn: 'আরফাকশাদ · ইরাম · আশূর · ইলাম · লাউয',
    keyBranchesEn: 'Arfakhshad · Eram · Ashur · Elam · Lud',
    modernLocationBn: 'মধ্যপ্রাচ্য, আরব উপদ্বীপ, শাম, ইরাক, ইসরায়েল/ফিলিস্তিন ও ইরান-অংশ',
    modernLocationEn: 'Arabian Peninsula, Levant, Iraq, Palestine & SW Iran',
    detailBn:
      'হাদীসে সামকে "আবুল আরব" বলা হয়েছে। হযরত ইবরাহীম, হূদ, ছালেহ, ইসমাঈল, ইসহাক্ব, মূসা, ঈসা ও মুহাম্মাদ (ﷺ) সকলেই সামের বংশধর।',
    detailEn:
      'Sam is called Abu al-Arab in Hadith. Most named Quranic prophets—Hud, Salih, Ibrahim, Ismail, Ishaq, Musa, Isa, and Muhammad (SAW)—descended from him.',
    referenceBn: 'জামে তিরমিযী ৩৯৩১ · তারিখে তাবারী',
    referenceEn: 'Jami at-Tirmidhi 3931 · Tarikh al-Tabari',
    x: 270,
    y: 565,
    width: 250,
  },
  {
    id: 'hum_ham',
    eraGroup: 'three_sons',
    rootLine: 'ham',
    stepBadgeBn: 'মূল ব্যক্তি ০২ · হাম',
    stepBadgeEn: 'Root Person 02 · Ham',
    titleBn: 'হাম ইবনে নূহ (আ.)',
    titleEn: 'Ham ibn Nuh (African Root)',
    titleAr: 'حَامُ بْنُ نُوحٍ',
    subtitleBn: 'হাবশা, মিসর, নুবিয়া ও সমগ্র আফ্রিকার আদি পিতা',
    subtitleEn: 'Ancestor of Abyssinia, Egypt & Africa',
    howSplitBn: 'হামের ৪ পুত্র: কুশ, মিসরাইম, ফূত (পুত) ও কান‘আন—যাঁরা নীল উপত্যকা, উত্তর ও পূর্ব-পশ্চিম আফ্রিকায় ছড়িয়ে পড়েন।',
    howSplitEn: 'Ham branched via 4 sons: Cush, Mizraim, Phut, and Canaan across Africa & Levant.',
    keyBranchesBn: 'কুশ · মিসরাইম · ফূত · কান‘আন',
    keyBranchesEn: 'Cush · Mizraim · Phut · Canaan',
    modernLocationBn: 'মিসর, সুদান, ইথিওপিয়া, সোমালিয়া, লিবিয়া, মরক্কো ও সমগ্র আফ্রিকা (৫৪ দেশ)',
    modernLocationEn: 'Egypt, Sudan, Ethiopia, Horn, North & Sub-Saharan Africa',
    detailBn:
      'হাদীসে হামকে হাবশীদের (আফ্রিকানদের) আদি পিতা বলা হয়েছে। মিসরের কিবতি, ইথিওপিয়ার আকসুম, উত্তর আফ্রিকার আমাজিগ ও সাহারা-দক্ষিণ জাতিসমূহ এ ধারার সাথে যুক্ত।',
    detailEn:
      'Hadith identifies Ham as ancestor of the Abyssinians/Africans. Through Cush, Mizraim, and Phut emerged Nile, Horn, Amazigh, and wider African peoples.',
    referenceBn: 'মুসনাদে আহমাদ ২০১৬৯ · তারিখে ইবনে খালদুন',
    referenceEn: 'Musnad Ahmad 20169 · Ibn Khaldun',
    x: 760,
    y: 565,
    width: 250,
  },
  {
    id: 'hum_yafith',
    eraGroup: 'three_sons',
    rootLine: 'yafith',
    stepBadgeBn: 'মূল ব্যক্তি ০৩ · ইয়াফিস',
    stepBadgeEn: 'Root Person 03 · Yafith',
    titleBn: 'ইয়াফিস ইবনে নূহ (আ.)',
    titleEn: 'Yafith ibn Nuh (Eurasian Root)',
    titleAr: 'يَافِثُ بْنُ نُوحٍ',
    subtitleBn: 'ইউরোপ, রোম, তুর্কি, পারস্য ও এশীয় জাতিসমূহের আদি পিতা',
    subtitleEn: 'Ancestor of Europe, Turks & Wider Asia',
    howSplitBn: 'ইয়াফিসের পুত্র গুমার, মাগূগ, মাদাই, ইয়াওয়ান, তূবাল, মেশেখ ও তীরাস থেকে ইউরোপ ও এশিয়ার বিশাল মানবধারা সৃষ্টি হয়।',
    howSplitEn: 'Yafith branched via Gomer, Magog, Madai, Javan, Tubal, Meshech & Tiras.',
    keyBranchesBn: 'গুমার · মাগূগ · মাদাই · ইয়াওয়ান · তূবাল · মেশেখ · তীরাস',
    keyBranchesEn: 'Gomer · Magog · Madai · Javan · Tubal · Meshech · Tiras',
    modernLocationBn: 'সমগ্র ইউরোপ, তুরস্ক, ইরান, মধ্য এশিয়া, দক্ষিণ এশিয়া ও পূর্ব-দক্ষিণ-পূর্ব এশিয়া',
    modernLocationEn: 'Europe, Turkey, Iran, Central, South & East Asia',
    detailBn:
      'হাদীসে ইয়াফিসকে রোমীয়দের (ইউরেশীয়দের) পিতা বলা হয়েছে। ঐতিহাসিক তাবারী ও ইবনে কাসীরের মতে রোম, জার্মান, স্লাভ, পারসিক, তুর্কি, তাতার, মঙ্গোল ও পূর্ব-দক্ষিণ এশীয় জাতিগুলো এই ধারায় বিস্তৃত।',
    detailEn:
      'Hadith calls Yafith ancestor of the Romans/Eurasians. Classical historians trace European, Turkic, Iranian, Central Asian, and East Asian peoples to his branches.',
    referenceBn: 'জামে তিরমিযী ৩৯৩১ · আল-বিদায়া ওয়ান নিহায়া',
    referenceEn: 'Jami at-Tirmidhi 3931 · Al-Bidayah',
    x: 1250,
    y: 565,
    width: 250,
  },

  // ================= TIER 5 (y=775): SPECIFIC SONS -> SPECIFIC NATIONS =================
  {
    id: 'hum_sam_arfakhshad',
    eraGroup: 'three_sons',
    rootLine: 'sam',
    stepBadgeBn: 'সাম → পুত্র ১',
    stepBadgeEn: 'Sam → Son 1',
    titleBn: 'আরফাকশাদ ও আবির → কাহতান ও ফালিখ',
    titleEn: 'Arfakhshad & Abir → Qahtan & Falikh',
    titleAr: 'أَرْفَخْشَدُ وَقَحْطَانُ وَفَالِغُ',
    subtitleBn: 'দক্ষিণ আরব (কাহতানী) ও ইবরাহীমী ধারার মূল ভাগ',
    subtitleEn: 'Origin of Qahtani Arabs & Ibrahim’s Line',
    howSplitBn: 'আবির (হূদ আ.)-এর দুই পুত্র: কাহতান (দক্ষিণ আরবে চলে যান) ও ফালিখ (যাঁর বংশে ইবরাহীম আ.)।',
    howSplitEn: 'Abir split into two major streams: Qahtan (Yemen) and Falikh (ancestry of Ibrahim AS).',
    keyBranchesBn: 'কাহতান → সাবা, হিমইয়ার, আউস, খাযরাজ, আজদ · ফালিখ → ইবরাহীম (আ.)',
    keyBranchesEn: 'Qahtan (Saba, Himyar, Aws, Khazraj) · Falikh (Ibrahim AS)',
    modernLocationBn: 'ইয়েমেন, ওমান, সৌদি আরব (মদীনা/আসির), সিরিয়া ও জর্ডান',
    modernLocationEn: 'Yemen, Oman, Saudi Arabia, Syria & Jordan',
    detailBn:
      'মদীনার বিখ্যাত আনসার গোত্র আউস ও খাযরাজ এবং ইয়েমেনের প্রাচীন সাবা-হিমইয়ার জাতি কাহতানের বংশ থেকে এসেছে।',
    detailEn:
      'The Ansar tribes of Madinah (Aws and Khazraj) as well as ancient Saba and Himyar descended from Qahtan.',
    referenceBn: 'তারিখে তাবারী · সীরাত ইবনে হিশাম',
    referenceEn: 'Tarikh al-Tabari · Sirah Ibn Hisham',
    x: 140,
    y: 775,
    width: 215,
  },
  {
    id: 'hum_sam_eram_ashur',
    eraGroup: 'three_sons',
    rootLine: 'sam',
    stepBadgeBn: 'সাম → পুত্র ২-৫',
    stepBadgeEn: 'Sam → Sons 2-5',
    titleBn: 'ইরাম, আশূর, ইলাম ও লাউয',
    titleEn: 'Eram, Ashur, Elam & Lud',
    titleAr: 'إِرَمُ وَآشُورُ وَعِيلَامُ وَلَاوُذُ',
    subtitleBn: 'আদ, সামূদ, আরামীয়, আসিরীয় ও ইলামীয় জাতি',
    subtitleEn: 'Ad, Thamud, Aramaeans, Assyrians & Elamites',
    howSplitBn: 'ইরাম → আদ ও সামূদ; আশূর → আসিরীয় (উত্তর ইরাক); ইলাম → খুজেস্তান; লাউয → লিডিয়া।',
    howSplitEn: 'Eram bore Ad & Thamud; Ashur founded Assyria; Elam settled SW Iran.',
    keyBranchesBn: 'আদ (হূদ আ.) · সামূদ (ছালেহ আ.) · আরামীয় (শাম) · আসিরীয় (নিনেভে)',
    keyBranchesEn: 'Ad · Thamud · Syriac/Aramaeans · Assyrians (Nineveh)',
    modernLocationBn: 'ইরাক (মসুল-বাগদাদ), সিরিয়া, লেবানন, ওমান ও দক্ষিণ-পশ্চিম ইরান',
    modernLocationEn: 'Iraq, Syria, Lebanon, Oman & SW Iran',
    detailBn:
      'ইরামের বংশধর প্রাচীন আদ ও সামূদ ধ্বংস হলেও আরামীয়/সিরীয় ও আসিরীয়-ক্যালডীয় ধারা শাম ও ইরাকে থেকে যায়।',
    detailEn:
      'While disbelieving Ad and Thamud perished, Aramaean, Syriac, and Assyrian-Chaldean communities continued in Syria and Iraq.',
    referenceBn: 'সূরা আল-ফাজর ৮৯:৬-৯ · আল-বিদায়া ওয়ান নিহায়া',
    referenceEn: 'Surah Al-Fajr 89:6-9 · Al-Bidayah',
    x: 385,
    y: 775,
    width: 215,
  },
  {
    id: 'hum_ham_kush_misr',
    eraGroup: 'three_sons',
    rootLine: 'ham',
    stepBadgeBn: 'হাম → পুত্র ১ ও ২',
    stepBadgeEn: 'Ham → Sons 1 & 2',
    titleBn: 'কুশ ও মিসরাইম (মিসর)',
    titleEn: 'Cush & Mizraim (Sons of Ham)',
    titleAr: 'كُوشُ وَمِصْرَايِمُ ابْنَا حَامٍ',
    subtitleBn: 'হাবশী, নুবীয়, সোমালি ও কিবতি/মিসরীয় জাতি',
    subtitleEn: 'Abyssinians, Nubians, Somalis & Egyptians',
    howSplitBn: 'কুশ থেকে নীল-উপত্যকার দক্ষিণে হাবশা ও সুদান; মিসরাইম থেকে নিম্ন ও উচ্চ মিসরীয় কিবতি জাতি।',
    howSplitEn: 'Cush populated Nubia & the Horn of Africa; Mizraim founded Egypt’s Nile civilization.',
    keyBranchesBn: 'আকসুম/হাবশা · নুবিয়া · কিবতি মিসরীয় · ওরোমো-সোমালি ধারা',
    keyBranchesEn: 'Abyssinian/Aksum · Nubian · Coptic Egyptian · Cushitic Horn',
    modernLocationBn: 'মিসর, সুদান, ইথিওপিয়া, ইরিত্রিয়া, সোমালিয়া ও জিবুতি',
    modernLocationEn: 'Egypt, Sudan, Ethiopia, Eritrea, Somalia & Djibouti',
    detailBn:
      'মিসর দেশের নামই এসেছে হামের পুত্র মিসরাইম (মিসর) থেকে। ইথিওপিয়া ও সুদানের প্রাচীন কুশীয় রাজ্য ছিল অত্যন্ত শক্তিশালী।',
    detailEn:
      'Egypt (Misr) carries the name of Ham’s son Mizraim, while Cush gave rise to Nubian and Ethiopian kingdoms.',
    referenceBn: 'তাফসীরে তাবারী · তারিখে ইবনে খালদুন',
    referenceEn: 'Tafsir al-Tabari · Tarikh Ibn Khaldun',
    x: 635,
    y: 775,
    width: 215,
  },
  {
    id: 'hum_ham_put_canaan',
    eraGroup: 'three_sons',
    rootLine: 'ham',
    stepBadgeBn: 'হাম → পুত্র ৩ ও ৪',
    stepBadgeEn: 'Ham → Sons 3 & 4',
    titleBn: 'ফূত (পুত) ও কান‘আন',
    titleEn: 'Phut & Canaan (Sons of Ham)',
    titleAr: 'فُوطُ وَكَنْعَانُ ابْنَا حَامٍ',
    subtitleBn: 'উত্তর-পশ্চিম আফ্রিকা (বার্বার), সাহেল ও প্রাচীন কান‘আনী',
    subtitleEn: 'Amazigh/North Africa, Sahel & Canaanites',
    howSplitBn: 'ফূত পশ্চিম দিকে লিবিয়া-মাগরেবে যান; কান‘আন শাম-ফিলিস্তিন উপকূলে ফিনিশীয় ও কার্থেজ গড়েন।',
    howSplitEn: 'Phut expanded across North & West Africa; Canaan formed Canaanites & Phoenicians.',
    keyBranchesBn: 'আমাজিগ/বার্বার · লিবিয়ান · ফিনিশীয় · পশ্চিম-মধ্য আফ্রিকান ধারা',
    keyBranchesEn: 'Amazigh (Berber) · Libyan · Phoenician · West African lines',
    modernLocationBn: 'লিবিয়া, তিউনিসিয়া, আলজেরিয়া, মরক্কো, মৌরিতানিয়া, মালি ও নাইজেরিয়া',
    modernLocationEn: 'Libya, Tunisia, Algeria, Morocco, Mali & West Africa',
    detailBn:
      'ইবনে খালদুনের মতে উত্তর আফ্রিকার আমাজিগ (বার্বার) ও সাহারা-পার্শ্ববর্তী জাতিসমূহ ফূত ও কান‘আনের প্রাচীন অভিবাসনে সমৃদ্ধ হয়।',
    detailEn:
      'Ibn Khaldun records how North Africa’s Amazigh peoples and maritime Carthaginians trace back through Phut and Canaan.',
    referenceBn: 'কিতাবুল ইবার (ইবনে খালদুন)',
    referenceEn: 'Kitab al-Ibar (Ibn Khaldun)',
    x: 880,
    y: 775,
    width: 215,
  },
  {
    id: 'hum_yafith_west',
    eraGroup: 'three_sons',
    rootLine: 'yafith',
    stepBadgeBn: 'ইয়াফিস → পশ্চিম শাখা',
    stepBadgeEn: 'Yafith → West Branch',
    titleBn: 'গুমার, ইয়াওয়ান, তূবাল ও তীরাস',
    titleEn: 'Gomer, Javan, Tubal & Tiras',
    titleAr: 'غُومَرُ وَيَاوَانُ وَتُوبَالُ وَتِيرَاسُ',
    subtitleBn: 'ইউরোপ, রোম-গ্রীক, জার্মানিক, কেল্টিক ও স্লাভ জাতি',
    subtitleEn: 'Greco-Roman, Germanic, Celtic & Slavic Peoples',
    howSplitBn: 'ইয়াওয়ান থেকে গ্রীক ও রোমান; গুমার থেকে কেল্ট-জার্মান; তূবাল-মেশেখ-তীরাস থেকে পূর্ব ইউরোপ ও ককেশাস।',
    howSplitEn: 'Javan populated Greece/Rome; Gomer formed Western Europe; Tubal/Meshech populated Eastern Europe & Caucasus.',
    keyBranchesBn: 'গ্রীক · রোমান/ইতালীয় · জার্মানিক · কেল্টিক · স্লাভ · ককেশীয়',
    keyBranchesEn: 'Greek · Latin/Roman · Germanic · Celtic · Slavic · Caucasian',
    modernLocationBn: 'সমগ্র ইউরোপ (জার্মানি, ফ্রান্স, ব্রিটেন, ইতালি, গ্রীস, রাশিয়া, ইউক্রেন, জর্জিয়া)',
    modernLocationEn: 'All of Europe, Russia, Ukraine, Greece, Italy & Caucasus',
    detailBn:
      'ভূমধ্যসাগরের উত্তর পাড় হয়ে ইউরোপে ছড়িয়ে পড়া সমস্ত প্রাচীন জাতি এই চার শাখা থেকেই গঠিত হয়।',
    detailEn:
      'Ancient Mediterranean and European nations expanded northward and westward from these Japhetic branches.',
    referenceBn: 'আল-বিদায়া ওয়ান নিহায়া · তারিখে তাবারী',
    referenceEn: 'Al-Bidayah wan-Nihayah · Tarikh al-Tabari',
    x: 1130,
    y: 775,
    width: 215,
  },
  {
    id: 'hum_yafith_east',
    eraGroup: 'three_sons',
    rootLine: 'yafith',
    stepBadgeBn: 'ইয়াফিস → পূর্ব ও মধ্য শাখা',
    stepBadgeEn: 'Yafith → East & Central',
    titleBn: 'মাদাই, মাগূগ ও তুর্ক-পূর্ব এশীয় ধারা',
    titleEn: 'Madai, Magog & Turkic-East Asian Line',
    titleAr: 'مَادَايُ وَمَأْجُوجُ وَالتُّرْكُ وَالصِّينُ',
    subtitleBn: 'পারসিক, কুর্দি, তুর্কি, মঙ্গোল, চীন-জাপান ও দক্ষিণ এশিয়া',
    subtitleEn: 'Persians, Kurds, Turks, Mongols, China & India',
    howSplitBn: 'মাদাই থেকে ইরান-কুর্দি-আর্য শাখা; তুগরমা/মাগূগ/তুর্ক থেকে মধ্য ও পূর্ব এশিয়ার জাতিসমূহ বিভক্ত হয়।',
    howSplitEn: 'Madai shaped Iranian/Indo-Aryan lines; Steppe branches shaped Turkic, Mongol, and East Asian nations.',
    keyBranchesBn: 'ইরান-কুর্দি · তুর্কি-উজবেক · মঙ্গোল-চীনা-জাপানি · সিন্ধু-বাংলা উপমহাদেশ',
    keyBranchesEn: 'Iranian-Kurdish · Turkic · Mongol-Sino-Japanese · South Asian',
    modernLocationBn: 'ইরান, তুরস্ক, আফগানিস্তান, মধ্য এশিয়া, বাংলাদেশ-ভারত-পাকিস্তান, চীন ও ইন্দোনেশিয়া',
    modernLocationEn: 'Iran, Turkey, Central Asia, South Asia, China & SE Asia',
    detailBn:
      'ইরানী মালভূমি, মধ্য এশিয়ার স্টেপস, ভারত-বাংলা ও দূরপ্রাচ্যের চীন-জাপান পর্যন্ত বিশাল জনসমুদ্র এ ধারায় বিস্তৃত।',
    detailEn:
      'Spanning from the Iranian plateau and Turkic steppes to Bengal, India, China, Japan, and Maritime Southeast Asia.',
    referenceBn: 'তারিখে তাবারী · মু‘জামুল বুলদান',
    referenceEn: 'Tarikh al-Tabari · Mu‘jam al-Buldan',
    x: 1375,
    y: 775,
    width: 215,
  },

  // ================= TIER 6 (y=995): PROPHETIC BRANCHES & CIVILIZATIONS =================
  {
    id: 'hum_qahtan_adnan',
    eraGroup: 'prophetic_ummahs',
    rootLine: 'sam',
    stepBadgeBn: 'যুগ ০৪ · আর-রাহীকুল মাখতূম',
    stepBadgeEn: 'Era 04 · Ar-Raheeq Arab Branches',
    titleBn: 'আরবের ৩ ধারা: বায়দা, কাহতানী (আরিবা) ও আদনানী (মুসতা‘রিবা)',
    titleEn: '3 Arab Divisions: Ba’idah, Qahtani & Adnani',
    titleAr: 'الْبَائِدَةُ وَالْعَارِبَةُ وَالْمُسْتَعْرِبَةُ',
    subtitleBn: 'আদ-সামূদ-তাসম · কাহতান (হিমইয়ার ও কাহলান) · ইসমাঈল → আদনান → কুরাইশ',
    subtitleEn: 'Ad-Thamud · Qahtan (Himyar & Kahlan) · Ismail → Adnan → Quraysh',
    howSplitBn: 'আর-রাহীকুল মাখতূম অনুযায়ী প্রথম ধারা (আরবে বায়দা) বিলুপ্ত হয়; দ্বিতীয় ধারা (কাহতান) মা‘রিব বাঁধ ধ্বংসের পর আযদ, লাখম, তাই ও কিন্দায় ভাগ হয়; আর তৃতীয় ধারা ইসমাঈল (আ.) ও জুরহুমের মেলবন্ধনে আদনান → রাবী‘আহ ও মুদার → কুরাইশে বিস্তার পায়।',
    howSplitEn: 'Per Ar-Raheeq al-Makhtum: Ba’idah vanished; Qahtan split after Ma’rib Dam into Azd, Lakhm, Tayy & Kindah; Ismail → Adnan branched into Rabiah, Mudhar & Quraysh.',
    keyBranchesBn: 'হিমইয়ার · আযদ (আউস-খাযরাজ, গাসসান, খুযা‘আহ) · লাখম · তাই · রাবী‘আহ · মুদার · কুরাইশ',
    keyBranchesEn: 'Himyar · Azd (Ansar, Ghassan, Khuza‘ah) · Lakhm · Tayy · Rabiah · Mudhar · Quraysh',
    modernLocationBn: 'সৌদি আরব (মক্কা, মদীনা, তায়েফ, নজদ), ইয়েমেন, ওমান, উপসাগর, ইরাক ও শাম',
    modernLocationEn: 'Saudi Arabia (Makkah, Madinah, Ta’if, Najd), Yemen, Oman, Gulf, Iraq & Levant',
    detailBn:
      'সফিউর রহমান মুবারকপুরী (রহ.) আর-রাহীকুল মাখতূমে ব্যাখ্যা করেছেন: ইসমাঈল (আ.) জুরহুম গোত্রের নিকট আরবি শিখে মক্কায় বসতি গড়েন; তাঁর বংশে আদনান → ফিহর (কুরাইশ) → কুসাই ইবনে কিলাব কাবার সেবা ও মক্কার নেতৃত্ব সুসংগঠিত করেন এবং তাঁরই বংশে শেষ নবী (ﷺ) জন্মগ্রহণ করেন।',
    detailEn:
      'Al-Mubarakpuri details how Ismail learned Arabic from Jurhum in Makkah; through Adnan and Qusay ibn Kilab, Quraysh united Makkah’s custodianship leading to Prophet Muhammad (SAW).',
    referenceBn: 'আর-রাহীকুল মাখতূম · অধ্যায়: আরবের ভৌগোলিক অবস্থান ও জাতিসমূহ',
    referenceEn: 'Ar-Raheeq al-Makhtum · Tribes & Nations of Arabia',
    x: 140,
    y: 995,
    width: 215,
  },
  {
    id: 'hum_banu_israil',
    eraGroup: 'prophetic_ummahs',
    rootLine: 'sam',
    stepBadgeBn: 'যুগ ০৫ · তাওরাত ও ইনজীল',
    stepBadgeEn: 'Era 05 · Banu Israil',
    titleBn: 'ইসহাক্ব → ইয়াকূব (১২ গোত্র) ও ঈসু',
    titleEn: 'Ishaq → Yaqub (12 Tribes) & Esu',
    titleAr: 'بَنُو إِسْرَائِيلَ وَعِيسُو',
    subtitleBn: 'মূসা (আ.) ও ঈসা (আ.)-এর পূর্ববর্তী উম্মতগণ',
    subtitleEn: '12 Tribes of Israel · Nations of Tawrah & Injil',
    howSplitBn: 'ইয়াকূবের ১২ পুত্র (লাভী, ইয়াহূদা, ইউসুফ, বিনইয়ামীন প্রমুখ) ১২টি গোত্রে ভাগ হন; ঈসু থেকে আদোমীয়/রূম-ধারা।',
    howSplitEn: 'Yaqub’s 12 sons formed the 12 Tribes; his twin Esu formed Edomites.',
    keyBranchesBn: 'বনী ইসরাঈলের ১২ গোত্র · দাঊদ-সুলায়মানের রাজ্য · ঈসা (আ.)-এর হাওয়ারী উম্মত',
    keyBranchesEn: '12 Tribes of Israel · Kingdoms of Dawud & Sulayman · Disciples of Isa',
    modernLocationBn: 'ফিলিস্তিন, জর্ডান, মিসর ও বিশ্বব্যাপী ছড়িয়ে পড়া ইসরাঈলী-পূর্ব খ্রিষ্টীয় জনগোষ্ঠী',
    modernLocationEn: 'Palestine, Jordan & global Jewish/Eastern Christian diasporas',
    detailBn:
      'শেষ নবী (ﷺ)-এর আগমনের পূর্বে বনী ইসরাঈল ও হযরত ঈসা (আ.)-এর সত্যনিষ্ঠ অনুসারীরাই ছিলেন পূর্ববর্তী আসমানী উম্মত।',
    detailEn:
      'Before the advent of Muhammad (SAW), the faithful among Banu Israil and the disciples of Isa (AS) held the previous scriptures.',
    referenceBn: 'সূরা আল-আ‘রাফ ৭:১৬০ · সূরা আস-সাফ ৬১:৬',
    referenceEn: 'Surah Al-A‘raf 7:160 · As-Saff 61:6',
    x: 385,
    y: 995,
    width: 215,
  },
  {
    id: 'hum_african_realms',
    eraGroup: 'prophetic_ummahs',
    rootLine: 'ham',
    stepBadgeBn: 'আফ্রিকান সভ্যতা',
    stepBadgeEn: 'African Civilizations',
    titleBn: 'আকসুম (হাবশা), নীল-উপত্যকা ও সাহেল',
    titleEn: 'Aksum, Nile Valley & Sahel Kingdoms',
    titleAr: 'الْحَبَشَةُ وَمِصْرُ وَالسَّاحِلُ',
    subtitleBn: 'নাজ্জাশী (রহ.)-এর হাবশা, মিসর ও মালি-সাহেল বিস্তার',
    subtitleEn: 'Abyssinia of Negus, Egypt & Mali-Songhai',
    howSplitBn: 'কুশ ও মিসরাইমের ধারা হাবশা-মিসরে শক্তিশালী হয়; পরে ইসলামের প্রথম হিজরতে তা উম্মতে মুহাম্মাদীর অংশ হয়।',
    howSplitEn: 'Nile & Horn kingdoms flourished; early Hijrah connected Abyssinia & later Sahel directly to Islam.',
    keyBranchesBn: 'হাবশী · নুবীয় · মিসরীয় · ফুলা · হাউসা · মান্ডে · সোয়াহিলি',
    keyBranchesEn: 'Abyssinian · Nubian · Egyptian · Hausa · Fulani · Swahili',
    modernLocationBn: 'মিসর, সুদান, ইথিওপিয়া, সোমালিয়া, কেনিয়া, তাঞ্জানিয়া ও পশ্চিম আফ্রিকা',
    modernLocationEn: 'Egypt, Sudan, Ethiopia, Kenya, Tanzania & West Africa',
    detailBn:
      'মক্কার প্রথম নির্যাতিত মুসলমানদের আশ্রয়দাতা বাদশাহ নাজ্জাশী (রহ.) ছিলেন এই হাবশারই ন্যায়পরায়ণ শাসক।',
    detailEn:
      'Righteous King Ashamah ibn Abjar (Al-Najashi) of Abyssinia sheltered the earliest Muslims during the Makkah persecution.',
    referenceBn: 'সীরাত ইবনে হিশাম · সহীহ বুখারী ৩৮৭৭',
    referenceEn: 'Sirah Ibn Hisham · Sahih al-Bukhari 3877',
    x: 635,
    y: 995,
    width: 215,
  },
  {
    id: 'hum_maghreb_andalus',
    eraGroup: 'prophetic_ummahs',
    rootLine: 'ham',
    stepBadgeBn: 'উত্তর আফ্রিকা ও আন্দালুস',
    stepBadgeEn: 'Maghreb & Iberia',
    titleBn: 'মাগরেব (বার্বার) ও ভূমধ্যসাগরীয় বিস্তার',
    titleEn: 'Maghreb (Amazigh) & Andalusian Bridge',
    titleAr: 'الْمَغْرِبُ وَالْأَنْدَلُسُ',
    subtitleBn: 'উত্তর আফ্রিকা থেকে জিব্রাল্টার পেরিয়ে ইউরোপে মিলন',
    subtitleEn: 'North Africa Bridging to Southern Europe',
    howSplitBn: 'আমাজিগ/বার্বার জাতির সাথে আরব-উম্মতের মেলবন্ধনে মাগরেব ও ৮০০ বছরের আন্দালুস সভ্যতা গড়ে ওঠে।',
    howSplitEn: 'Amazigh tribes of North Africa united with Arab Muslims, founding Andalusia across Gibraltar.',
    keyBranchesBn: 'সানহাজা · যানাতা · আল-মুরাবিতূন · আন্দালুসীয় সমাজ',
    keyBranchesEn: 'Sanhaja · Zanata · Almoravid · Andalusian synthesis',
    modernLocationBn: 'মরক্কো, আলজেরিয়া, তিউনিসিয়া, লিবিয়া ও স্পেন-পর্তুগালের ঐতিহাসিক অঞ্চল',
    modernLocationEn: 'Morocco, Algeria, Tunisia, Libya & Iberian Heritage',
    detailBn:
      'তারিক ইবনে যিয়াদ (রহ.)-এর নেতৃত্বে উত্তর আফ্রিকার আমাজিগ-মুসলিমরা ইউরোপে জ্ঞান-বিজ্ঞান ও ইসলামী সভ্যতার প্রদীপ জ্বালান।',
    detailEn:
      'Under Tariq ibn Ziyad, Amazigh and Arab Muslims built centuries of scientific and cultural brilliance in Spain.',
    referenceBn: 'তারিখে ইবনে খালদুন · ফুতূহুল বুলদান',
    referenceEn: 'Tarikh Ibn Khaldun · Futuh al-Buldan',
    x: 880,
    y: 995,
    width: 215,
  },
  {
    id: 'hum_persia_turk',
    eraGroup: 'prophetic_ummahs',
    rootLine: 'yafith',
    stepBadgeBn: 'ইরান-তুরস্ক-মধ্য এশিয়া',
    stepBadgeEn: 'Persia, Anatolia & Steppe',
    titleBn: 'পারস্য, আনাতোলিয়া ও মধ্য এশিয়ার জাতিবলয়',
    titleEn: 'Persian, Turkic & Central Asian Crescent',
    titleAr: 'فَارِسُ وَالرُّومُ وَمَا وَرَاءَ النَّهْرِ',
    subtitleBn: 'ইয়াফিস-সাম সংমিশ্রণ ও ইসলামী জ্ঞানকেন্দ্রসমূহ',
    subtitleEn: 'Silk Road Nations & Centers of Islamic Scholarship',
    howSplitBn: 'মাদাই (ইরান-কুর্দি) ও তুর্কি শাখা সিল্ক রোড বরাবর ভাগ হয়ে বুখারা, সমরকন্দ ও আনাতোলিয়ায় বসতি গড়ে।',
    howSplitEn: 'Iranian and Turkic tribes branched across Khurasan, Transoxiana, and Anatolia.',
    keyBranchesBn: 'পারসিক · কুর্দি · তাজিক · উজবেক · কাজাখ · তুর্কি · আজারবাইজানি',
    keyBranchesEn: 'Persian · Kurdish · Tajik · Uzbek · Kazakh · Turkish · Azeri',
    modernLocationBn: 'ইরান, তুরস্ক, আজারবাইজান, উজবেকিস্তান, কাজাখস্তান, তুর্কমেনিস্তান ও কিরগিজস্তান',
    modernLocationEn: 'Iran, Turkey, Azerbaijan, Uzbekistan, Kazakhstan & Kyrgyzstan',
    detailBn:
      'ইসলাম গ্রহণের পর এ অঞ্চল থেকেই ইমাম বুখারী, ইমাম মুসলিম, তিরমিযী ও ইবনে সীনাসহ বিশ্ববিখ্যাত মনীষীরা উঠে আসেন।',
    detailEn:
      'After embracing Islam, this region produced Imam Bukhari, Muslim, Tirmidhi, and leading scientists.',
    referenceBn: 'আল-বিদায়া ওয়ান নিহায়া · ওফায়াতুল আ‘য়ান',
    referenceEn: 'Al-Bidayah wan-Nihayah',
    x: 1130,
    y: 995,
    width: 215,
  },
  {
    id: 'hum_indus_east_asia',
    eraGroup: 'prophetic_ummahs',
    rootLine: 'yafith',
    stepBadgeBn: 'দক্ষিণ ও পূর্ব এশিয়া',
    stepBadgeEn: 'South & East Asia',
    titleBn: 'বাংলা-সিন্ধু, চীন ও মালয় দ্বীপপুঞ্জ',
    titleEn: 'Bengal-Indus, China & Malay Archipelago',
    titleAr: 'الْهِنْدُ وَبَنْغَالَا وَالصِّينُ وَالْجَزَائِرُ',
    subtitleBn: 'বিশ্বের অর্ধেকের বেশি মানুষের আবাস ও প্রাচীন অভিবাসন',
    subtitleEn: 'Ancient Asian Migrations & Maritime Trade Belt',
    howSplitBn: 'সিন্ধু-গঙ্গা, হিমালয়-পূর্ব চীন ও প্রশান্ত মহাসাগরীয় দ্বীপে মানবশাখা ভাগ হয়; পরে সুফি-বণিকদের মাধ্যমে ইসলাম আসে।',
    howSplitEn: 'Early migrations populated Indus-Bengal, East Asia & Indonesia; trade and Sufis spread Islam.',
    keyBranchesBn: 'বাঙালি · পাঞ্জাবি-সিন্ধি · দ্রাবিড় · হান চীনা · জাপানি · মালয়-জাভানিজ',
    keyBranchesEn: 'Bengali · Indo-Aryan · Dravidian · Han Chinese · Japanese · Malay-Javanese',
    modernLocationBn: 'বাংলাদেশ, ভারত, পাকিস্তান, ইন্দোনেশিয়া, মালয়েশিয়া, চীন, জাপান ও কোরিয়া',
    modernLocationEn: 'Bangladesh, India, Pakistan, Indonesia, Malaysia, China, Japan & Korea',
    detailBn:
      'সাহাবী-তাবেঈনের যুগ থেকেই আরব বণিকরা চট্টগ্রাম ও দক্ষিণ ভারতের উপকূলে এবং চায়নার ক্যান্টনে পৌঁছান; আজ বিশ্বে সর্বাধিক মুসলমান এ অঞ্চলেই বাস করেন।',
    detailEn:
      'Early Muslim traders reached Bengal’s coast, Malabar, and Canton; today Asia hosts the largest Muslim populations on Earth.',
    referenceBn: 'ফুতূহুল বুলদান · বাংলার ইসলামী ইতিহাস',
    referenceEn: 'Futuh al-Buldan · Bengal Maritime History',
    x: 1375,
    y: 995,
    width: 215,
  },

  // ================= TIER 7 (y=1210): LAST PROPHET & HIS GLOBAL UMMAH =================
  {
    id: 'hum_muhammad_ummah',
    eraGroup: 'final_ummah',
    stepBadgeBn: 'যুগ ০৬ · শেষ নবী ও উম্মত',
    stepBadgeEn: 'Era 06 · Final Prophet',
    titleBn: 'শেষ নবী মুহাম্মাদ (ﷺ) ও সর্বশেষ উম্মত',
    titleEn: 'Last Prophet Muhammad (SAW) & Final Ummah',
    titleAr: 'خَاتَمُ النَّبِيِّينَ ﷺ وَأُمَّتُهُ',
    subtitleBn: 'সমগ্র মানবজাতির জন্য কিয়ামত পর্যন্ত চূড়ান্ত আসমানী উম্মত',
    subtitleEn: 'Universal Final Ummah Open to Every Branch of Adam',
    howSplitBn: 'আরব, হাবশী (বিলাল রা.), পারসিক (সালমান রা.) ও রোমীয় (সুহাইব রা.) একসাথে প্রথম উম্মত গড়ে তোলেন।',
    howSplitEn: 'United Arabs with Bilal (Africa), Salman (Persia), and Suhayb (Rome) as one universal Ummah.',
    keyBranchesBn: 'সাহাবায়ে কিরাম (রা.) · খোলাফায়ে রাশেদীন · আল-কুরআন ও সুন্নাহ',
    keyBranchesEn: 'Sahabah (RA) · Rightly Guided Caliphs · Quran & Sunnah',
    modernLocationBn: 'মক্কা ও মদীনা থেকে যাত্রা শুরু হয়ে আজ পৃথিবীর ১৯৫+ দেশে বিস্তৃত',
    modernLocationEn: 'Originated in Makkah & Madinah; now present in every country',
    detailBn:
      'পূর্ববর্তী নবীগণ নিজ নিজ গোত্র বা জাতির জন্য এসেছিলেন। কিন্তু শেষ নবী (ﷺ) সাম, হাম, ইয়াফিস—সকল মানুষের নবী হিসেবে প্রেরিত হন। তাঁর পর আর কোনো নবী আসবেন না।',
    detailEn:
      'Previous prophets were sent to specific nations, whereas Prophet Muhammad (SAW) was sent to all descendants of Sam, Ham, and Yafith until Qiyamah.',
    referenceBn: 'সূরা আল-আহযাব ৩৩:৪০ · সূরা আল-আম্বিয়া ২১:১০৭',
    referenceEn: 'Surah Al-Ahzab 33:40 · Al-Anbiya 21:107',
    x: 460,
    y: 1210,
    width: 295,
  },
  {
    id: 'hum_ummah_expansion',
    eraGroup: 'final_ummah',
    stepBadgeBn: 'যুগ ০৭ · সর্বজনীন বিস্তার',
    stepBadgeEn: 'Era 07 · Global Spread',
    titleBn: 'শেষ নবীর উম্মত ও আধুনিক বিশ্ববিস্তার (৬৩২ – বর্তমান)',
    titleEn: 'Spread of the Final Ummah Across All Continents',
    titleAr: 'اِنْتِشَارُ الأُمَّةِ فِي الْآفَاقِ',
    subtitleBn: 'ভৌগোলিক সীমানা ভেঙে সকল জাতিতে দাওয়াত, বিজ্ঞান ও ভ্রাতৃত্ব',
    subtitleEn: 'Connecting Every Branch of Mankind Through Faith & Migration',
    howSplitBn: 'খিলাফত, বণিক, সুফি ও আধুনিক অভিবাসনের মাধ্যমে উম্মতে মুহাম্মাদী সকল মহাদেশের মানুষের সাথে যুক্ত হয়।',
    howSplitEn: 'Through early Islamic eras, trade routes, scholars & modern migration, the Ummah reached every continent.',
    keyBranchesBn: 'মধ্যপ্রাচ্য · আফ্রিকা · বাংলা-দক্ষিণ এশিয়া · ইন্দোনেশিয়া · ইউরোপ · আমেরিকা',
    keyBranchesEn: 'MENA · Africa · South Asia · Indonesia · Europe · Americas',
    modernLocationBn: 'বর্তমান বিশ্বে প্রায় ২০০ কোটি মুসলিম উম্মাহ + ৮০০+ কোটি আদম-সন্তান',
    modernLocationEn: '~2 Billion Muslims within 8+ Billion Human Family Today',
    detailBn:
      'আজকে পৃথিবীতে শেষ নবীর উম্মতের প্রায় ২০০ কোটি মানুষ প্রতিটি মহাদেশে বসবাস করছেন এবং মানবজাতির সমগ্র পরিবারের অবিচ্ছেদ্য অংশ হিসেবে শান্তি ও তাওহীদের বার্তা বহন করছেন।',
    detailEn:
      'Today roughly 2 billion Muslims live across every continent as an inseparable part of the 8+ billion human family.',
    referenceBn: 'বিদায় হজ্জের ভাষণ · সহীহ মুসলিম',
    referenceEn: 'Farewell Sermon · Sahih Muslim',
    x: 1040,
    y: 1210,
    width: 315,
  },

  // ================= TIER 8 (y=1445): WHERE NATIONS LIVE TODAY =================
  {
    id: 'hum_now_arab_levant',
    eraGroup: 'modern_world',
    rootLine: 'sam',
    stepBadgeBn: 'বর্তমান বাসস্থান ০১',
    stepBadgeEn: 'Today 01 · Arabia & Sham',
    titleBn: 'আরব বিশ্ব, শাম ও ইরাক (~৪৭ কোটি)',
    titleEn: 'Arabia, Levant & Iraq (~470M)',
    titleAr: 'جَزِيرَةُ الْعَرَبِ وَالشَّامُ وَالْعِرَاقُ',
    subtitleBn: 'সামি (আদনানী, কাহতানী, আরামীয়, আসিরীয়) ধারার আবাস',
    subtitleEn: 'Homeland of Sam’s Descendants Today',
    howSplitBn: 'কাহতানী ও আদনানী আরব, ইরাকী ও শামী জাতিগুলো প্রাচীনকাল থেকে এখানেই স্থায়ীভাবে বসবাস করছে।',
    howSplitEn: 'Qahtani, Adnani, Levantine, and Mesopotamian peoples reside across their historic homelands.',
    keyBranchesBn: 'সৌদি আরব · ইয়েমেন · ওমান · ইরাক · সিরিয়া · জর্ডান · ফিলিস্তিন · লেবানন',
    keyBranchesEn: 'Saudi Arabia · Yemen · Iraq · Syria · Jordan · Palestine · Lebanon',
    modernLocationBn: 'সৌদি আরব, ইয়েমেন, সংযুক্ত আরব আমিরাত, কাতার, কুয়েত, ওমান, ইরাক, সিরিয়া, জর্ডান, ফিলিস্তিন, লেবানন',
    modernLocationEn: 'Saudi Arabia, Yemen, UAE, Qatar, Kuwait, Oman, Iraq, Syria, Jordan, Palestine, Lebanon',
    detailBn:
      'হারামাইন শরীফাইন (মক্কা ও মদীনা) এবং বায়তুল মুকাদ্দাসসহ নবীদের মূল কর্মক্ষেত্রের দেশগুলোতে আজ প্রায় ৪৭ কোটি মানুষ বসবাস করে।',
    detailEn:
      'Encompasses the sacred lands of Makkah, Madinah, and Al-Quds, home to ~470 million people today.',
    referenceBn: 'আধুনিক ভৌগোলিক ও বংশীয় বিবরণ',
    referenceEn: 'Modern Geographical Distribution',
    x: 140,
    y: 1445,
    width: 215,
  },
  {
    id: 'hum_now_egypt_horn',
    eraGroup: 'modern_world',
    rootLine: 'ham',
    stepBadgeBn: 'বর্তমান বাসস্থান ০২',
    stepBadgeEn: 'Today 02 · Nile & Horn',
    titleBn: 'মিসর, সুদান ও হাবশা-হর্ন (~৪২ কোটি)',
    titleEn: 'Egypt, Sudan & Horn of Africa (~420M)',
    titleAr: 'مِصْرُ وَالسُّودَانُ وَالْقَرْنُ الْإِفْرِيقِيّ',
    subtitleBn: 'কুশ ও মিসরাইম ইবনে হামের জাতিসমূহের আবাস',
    subtitleEn: 'Home of Cush & Mizraim Lines Today',
    howSplitBn: 'প্রাচীন মিসরীয়, নুবীয় ও হাবশী জনগোষ্ঠী পরে ইসলাম ও আরবি-আফ্রিকান সংস্কৃতির সাথে যুক্ত হয়।',
    howSplitEn: 'Ancient Egyptian, Nubian, and Abyssinian peoples evolved along the Nile and Red Sea.',
    keyBranchesBn: 'মিসরীয় · সুদানী · ইথিওপীয় · ইরিত্রীয় · সোমালি',
    keyBranchesEn: 'Egyptian · Sudanese · Ethiopian · Eritrean · Somali',
    modernLocationBn: 'মিসর, সুদান, দক্ষিণ সুদান, ইথিওপিয়া, ইরিত্রিয়া, সোমালিয়া, জিবুতি',
    modernLocationEn: 'Egypt, Sudan, South Sudan, Ethiopia, Eritrea, Somalia, Djibouti',
    detailBn:
      'নীল নদের অববাহিকা ও হর্ন অব আফ্রিকায় মিসর ও ইথিওপিয়াসহ বিশাল মুসলিম ও প্রাচীন ঐতিহাসিক জনগোষ্ঠী বসবাস করছে।',
    detailEn:
      'Home to over 420 million people across the Nile basin and the Horn of Africa.',
    referenceBn: 'আফ্রিকান জনতত্ত্ব ও ইসলামী ইতিহাস',
    referenceEn: 'Nile & Horn Demographics',
    x: 385,
    y: 1445,
    width: 215,
  },
  {
    id: 'hum_now_maghreb_africa',
    eraGroup: 'modern_world',
    rootLine: 'ham',
    stepBadgeBn: 'বর্তমান বাসস্থান ০৩',
    stepBadgeEn: 'Today 03 · wider Africa',
    titleBn: 'মাগরেব ও পশ্চিম-দক্ষিণ আফ্রিকা (~১১০ কোটি)',
    titleEn: 'Maghreb & Wider Africa (~1.1B)',
    titleAr: 'الْمَغْرِبُ وَغَرْبُ وَجَنُوبُ إِفْرِيقِيَا',
    subtitleBn: 'ফূত-কান‘আন-বার্বার ও সাব-সাহারান জাতিসমূহ',
    subtitleEn: 'Amazigh, Sahel & Sub-Saharan Nations',
    howSplitBn: 'উত্তর আফ্রিকার আমাজিগ/আরব ও পশ্চিম-মধ্য-দক্ষিণ আফ্রিকার শত শত গোত্র মিলিয়ে বিশাল মহাদেশীয় জনবসতি।',
    howSplitEn: 'Blends North African Amazigh-Arab heritage with West, Central, East, and Southern African peoples.',
    keyBranchesBn: 'মরক্কো-আলজেরিয়া · নাইজেরিয়া · মালি · সেনেগাল · কেনিয়া · দ. আফ্রিকা',
    keyBranchesEn: 'Morocco · Algeria · Nigeria · Mali · Senegal · South Africa',
    modernLocationBn: 'মরক্কো, আলজেরিয়া, তিউনিসিয়া, লিবিয়া, নাইজেরিয়া, মালি, সেনেগাল, ঘানা, কঙ্গো, কেনিয়া, দ. আফ্রিকা',
    modernLocationEn: 'Morocco, Algeria, Tunisia, Libya, Nigeria, Mali, Senegal, Ghana, Kenya, South Africa',
    detailBn:
      'নাইজেরিয়া, মালি ও সেনেগালসহ পশ্চিম ও পূর্ব আফ্রিকায় ইসলাম অত্যন্ত গভীরভাবে শিকড় গেড়েছে।',
    detailEn:
      'Nigeria, Senegal, Mali, and North Africa form major vibrant centers of the global Ummah today.',
    referenceBn: 'আফ্রিকা মহাদেশের ৫০+ রাষ্ট্র',
    referenceEn: 'African Nations Today',
    x: 635,
    y: 1445,
    width: 215,
  },
  {
    id: 'hum_now_south_asia',
    eraGroup: 'modern_world',
    rootLine: 'yafith',
    stepBadgeBn: 'বর্তমান বাসস্থান ০৪',
    stepBadgeEn: 'Today 04 · South Asia',
    titleBn: 'বাংলাদেশ ও দক্ষিণ এশিয়া (~২০০ কোটি)',
    titleEn: 'Bangladesh & South Asia (~2.0B)',
    titleAr: 'بَنْغَالَا وَشِبْهُ الْقَارَّةِ الْهِنْدِيَّةِ',
    subtitleBn: 'বাংলা-সিন্ধু-আর্য-দ্রাবিড় ও আরব-তুর্কি-পারসিক মিশ্রণ',
    subtitleEn: 'Indus-Ganges Heritage & Massive Muslim Population',
    howSplitBn: 'প্রাচীন নূহী-এশীয় অভিবাসনের সাথে পরবর্তীতে আরব-ইরানী-তুর্কি বংশধারা মিশে দক্ষিণ এশিয়ার আজকের মানুষ গড়ে উঠেছে।',
    howSplitEn: 'Ancient Indus-Bengal settlers blended over millennia with Iranian, Turkic, and Arab lineages.',
    keyBranchesBn: 'বাঙালি · পাঞ্জাবি · পশতুন · সিন্ধি · কাশ্মীরি · তামিল · রোহিঙ্গা',
    keyBranchesEn: 'Bengali · Punjabi · Pashtun · Sindhi · Kashmiri · Tamil',
    modernLocationBn: 'বাংলাদেশ, ভারত, পাকিস্তান, আফগানিস্তান, নেপাল, শ্রীলঙ্কা, ভুটান ও মালদ্বীপ',
    modernLocationEn: 'Bangladesh, India, Pakistan, Afghanistan, Nepal, Sri Lanka, Maldives',
    detailBn:
      'বিশ্বের প্রায় ৬০ কোটিরও বেশি মুসলমান (মোট উম্মতের প্রায় এক-তৃতীয়াংশ) আজ বাংলাদেশ, পাকিস্তান ও ভারতেই বসবাস করছেন।',
    detailEn:
      'More than 600 million Muslims—roughly a third of the entire Ummah—live across Bangladesh, Pakistan, and India today.',
    referenceBn: 'দক্ষিণ এশিয়ার জনতত্ত্ব',
    referenceEn: 'South Asian Demographics',
    x: 880,
    y: 1445,
    width: 215,
  },
  {
    id: 'hum_now_eurasia_west',
    eraGroup: 'modern_world',
    rootLine: 'yafith',
    stepBadgeBn: 'বর্তমান বাসস্থান ০৫',
    stepBadgeEn: 'Today 05 · Europe & Central Asia',
    titleBn: 'তুরস্ক, ইরান, মধ্য এশিয়া ও ইউরোপ (~৯৮ কোটি)',
    titleEn: 'Turkey, Iran, Central Asia & Europe (~980M)',
    titleAr: 'تُرْكِيَا وَإِيرَانُ وَأُورُوبَّا',
    subtitleBn: 'গুমার, ইয়াওয়ান, মাদাই ও তুর্কি ধারার আধুনিক দেশসমূহ',
    subtitleEn: 'Modern Japhetic & Silk-Road Nations',
    howSplitBn: 'পশ্চিম ও পূর্ব ইউরোপের দেশসমূহ এবং তুরস্ক-ইরান-উজবেকিস্তান-কাজাখস্তান বলয়ে আজকের মানুষ বসবাস করে।',
    howSplitEn: 'European nations alongside Turkey, Iran, and Central Asian republics trace through these Eurasian lines.',
    keyBranchesBn: 'তুরস্ক · ইরান · উজবেকিস্তান · জার্মানি · ব্রিটেন · ফ্রান্স · ইতালি · রাশিয়া',
    keyBranchesEn: 'Turkey · Iran · Uzbekistan · Germany · UK · France · Italy · Russia',
    modernLocationBn: 'তুরস্ক, ইরান, উজবেকিস্তান, কাজাখস্তান, আজারবাইজান, যুক্তরাজ্য, ফ্রান্স, জার্মানি, স্পেন, ইতালি, রাশিয়া',
    modernLocationEn: 'Turkey, Iran, Uzbekistan, Kazakhstan, UK, France, Germany, Spain, Italy, Russia',
    detailBn:
      'ইরান, তুরস্ক ও মধ্য এশিয়া মুসলিম সংখ্যাগরিষ্ঠ দেশ, আর পশ্চিম ইউরোপেও আজ কয়েক কোটি মুসলিম অভিবাসী বসবাস করছেন।',
    detailEn:
      'Turkey, Iran, and Central Asia remain vibrant Muslim-majority nations while Europe hosts millions of Muslims today.',
    referenceBn: 'ইউরোপ ও মধ্য এশিয়ার রাষ্ট্রতালিকা',
    referenceEn: 'Eurasia & Europe Today',
    x: 1130,
    y: 1445,
    width: 215,
  },
  {
    id: 'hum_now_east_americas',
    eraGroup: 'modern_world',
    rootLine: 'yafith',
    stepBadgeBn: 'বর্তমান বাসস্থান ০৬',
    stepBadgeEn: 'Today 06 · East Asia & Americas',
    titleBn: 'পূর্ব-দ.পূর্ব এশিয়া, আমেরিকা ও ওশেনিয়া (~৩৪০ কোটি)',
    titleEn: 'East/SE Asia, Americas & Oceania (~3.4B)',
    titleAr: 'شَرْقُ آسِيَا وَالْأَمْرِيكَتَانِ',
    subtitleBn: 'ইন্দোনেশিয়া, চীন, জাপান ও উত্তর-দক্ষিণ আমেরিকা-অস্ট্রেলিয়া',
    subtitleEn: 'Indonesia, China, Japan, Americas & Pacific',
    howSplitBn: 'প্রাচীন পূর্ব এশীয় ও বেরিং-পথে আমেরিকার আদিবাসী + আধুনিক যুগে সমগ্র বিশ্বের মানুষের অভিবাসনে নতুন বিশ্ব গড়ে ওঠে।',
    howSplitEn: 'Ancient East Asian & indigenous migrations joined with modern global diaspora across the Americas and Oceania.',
    keyBranchesBn: 'ইন্দোনেশিয়া (বৃহত্তম মুসলিম দেশ) · মালয়েশিয়া · চীন · যুক্তরাষ্ট্র · কানাডা · ব্রাজিল',
    keyBranchesEn: 'Indonesia · Malaysia · China · USA · Canada · Brazil · Australia',
    modernLocationBn: 'ইন্দোনেশিয়া, মালয়েশিয়া, ব্রুনাই, চীন, জাপান, কোরিয়া, যুক্তরাষ্ট্র, কানাডা, ব্রাজিল, আর্জেন্টিনা, অস্ট্রেলিয়া',
    modernLocationEn: 'Indonesia, Malaysia, Brunei, China, Japan, Korea, USA, Canada, Brazil, Australia',
    detailBn:
      'ইন্দোনেশিয়া (প্রায় ২৪ কোটি মুসলিম) বিশ্বের সবচেয়ে বড় মুসলিম দেশ; আর আমেরিকা ও অস্ট্রেলিয়া আজ পৃথিবীর সকল শাখার মানুষের মিলনস্থল।',
    detailEn:
      'Indonesia hosts the largest Muslim population globally, while the Americas and Oceania gather descendants of every branch.',
    referenceBn: 'বৈশ্বিক অভিবাসন ও আধুনিক বিশ্ব',
    referenceEn: 'Global Diaspora & Modern World',
    x: 1375,
    y: 1445,
    width: 215,
  },

  // ================= TIER 9 (y=1650): ONE FAMILY =================
  {
    id: 'hum_today_unity',
    eraGroup: 'modern_world',
    stepBadgeBn: 'সারাংশ · এক পরিবার',
    stepBadgeEn: 'Summary · One Family',
    titleBn: 'আজকের ৮০০+ কোটি মানুষ (১৯৫+ দেশ) = আদম ও নূহ (আ.)-এর এক পরিবার',
    titleEn: 'Today’s 8+ Billion Humans (195+ Nations) = One Family From Adam & Nuh',
    titleAr: 'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ',
    subtitleBn: 'শেষ নবী (ﷺ)-এর উম্মত ও সমগ্র মানবজাতি একই মূল থেকে শাখা-প্রশাখায় ছড়িয়েছে',
    subtitleEn: 'All Languages, Races & Countries Originated From One Root',
    howSplitBn: 'আদম → নূহ (কিস্তি ~৮০ মুমিন) → সাম, হাম ও ইয়াফিস → ২০+ প্রাচীন জাতি → আজকের ১৯৫+ দেশ।',
    howSplitEn: 'Adam → Nuh (~80 Ark Survivors) → Sam, Ham & Yafith → Ancient Peoples → Today’s 195+ Countries.',
    keyBranchesBn: 'সকল জাতির আদি মিলনবিন্দু: হযরত আদম (আ.) ও হযরত নূহ (আ.)',
    keyBranchesEn: 'Shared Human Origin: Adam (AS) & Nuh (AS)',
    modernLocationBn: 'এশিয়া (~৪৭০ কোটি) · আফ্রিকা (~১৫০ কোটি) · ইউরোপ (~৭৫ কোটি) · আমেরিকা (~১০৫ কোটি) · ওশেনিয়া (~৪.৫ কোটি)',
    modernLocationEn: 'Asia (~4.7B) · Africa (~1.5B) · Europe (~750M) · Americas (~1.05B) · Oceania (~45M)',
    detailBn:
      'আল-কুরআন (৪৯:১৩) স্পষ্ট করেছে: তোমাদের বিভিন্ন জাতি ও গোত্রে বিভক্ত করার একমাত্র উদ্দেশ্য হলো পরস্পরকে চেনা; আল্লাহর কাছে শ্রেষ্ঠত্বের একমাত্র মাপকাঠি তাকওয়া।',
    detailEn:
      'Quran 49:13 affirms that nations and tribes exist solely so humanity may know one another, while true honor lies in righteousness (Taqwa).',
    referenceBn: 'সূরা আল-হুজুরাত ৪৯:১৩ · বিদায় হজ্জের ভাষণ',
    referenceEn: 'Surah Al-Hujurat 49:13 · Farewell Sermon',
    x: 760,
    y: 1650,
    width: 560,
  },
];

export const HUMANITY_TREE_EDGES: HumanityTreeEdge[] = [
  { id: 'he_1', from: 'hum_adam', to: 'hum_pre_flood', kind: 'direct', eraGroup: 'origin', labelBn: '১০ প্রজন্ম', labelEn: '10 Gens' },
  { id: 'he_2', from: 'hum_pre_flood', to: 'hum_nuh_flood', kind: 'descent', eraGroup: 'flood_reset', labelBn: 'মহাপ্লাবন', labelEn: 'Great Flood' },
  { id: 'he_3', from: 'hum_nuh_flood', to: 'hum_ark_80', kind: 'direct', eraGroup: 'flood_reset', labelBn: '~৮০ মুমিন', labelEn: '~80 Saved' },

  { id: 'he_4', from: 'hum_ark_80', to: 'hum_sam', kind: 'direct', eraGroup: 'three_sons', labelBn: '১. সাম', labelEn: '1. Sam' },
  { id: 'he_5', from: 'hum_ark_80', to: 'hum_ham', kind: 'direct', eraGroup: 'three_sons', labelBn: '২. হাম', labelEn: '2. Ham' },
  { id: 'he_6', from: 'hum_ark_80', to: 'hum_yafith', kind: 'direct', eraGroup: 'three_sons', labelBn: '৩. ইয়াফিস', labelEn: '3. Yafith' },

  // Sons of Sam, Ham, Yafith
  { id: 'he_7', from: 'hum_sam', to: 'hum_sam_arfakhshad', kind: 'direct', eraGroup: 'three_sons', labelBn: 'আরফাকশাদ', labelEn: 'Arfakhshad' },
  { id: 'he_8', from: 'hum_sam', to: 'hum_sam_eram_ashur', kind: 'direct', eraGroup: 'three_sons', labelBn: 'ইরাম·আশূর·ইলাম', labelEn: 'Eram·Ashur' },
  { id: 'he_9', from: 'hum_ham', to: 'hum_ham_kush_misr', kind: 'direct', eraGroup: 'three_sons', labelBn: 'কুশ·মিসরাইম', labelEn: 'Cush·Mizraim' },
  { id: 'he_10', from: 'hum_ham', to: 'hum_ham_put_canaan', kind: 'direct', eraGroup: 'three_sons', labelBn: 'ফূত·কান‘আন', labelEn: 'Phut·Canaan' },
  { id: 'he_11', from: 'hum_yafith', to: 'hum_yafith_west', kind: 'direct', eraGroup: 'three_sons', labelBn: 'গুমার·ইয়াওয়ান', labelEn: 'Gomer·Javan' },
  { id: 'he_12', from: 'hum_yafith', to: 'hum_yafith_east', kind: 'direct', eraGroup: 'three_sons', labelBn: 'মাদাই·তুর্ক', labelEn: 'Madai·Turk' },

  // To Tier 6 Civilizations & Prophetic Ummahs
  { id: 'he_13', from: 'hum_sam_arfakhshad', to: 'hum_qahtan_adnan', kind: 'descent', eraGroup: 'prophetic_ummahs', labelBn: 'ইসমাঈল·কাহতান', labelEn: 'Ismail·Qahtan' },
  { id: 'he_14', from: 'hum_sam_arfakhshad', to: 'hum_banu_israil', kind: 'descent', eraGroup: 'prophetic_ummahs', labelBn: 'ইসহাক্ব·ইয়াকূব', labelEn: 'Ishaq·Yaqub' },
  { id: 'he_15', from: 'hum_sam_eram_ashur', to: 'hum_banu_israil', kind: 'descent', eraGroup: 'prophetic_ummahs' },
  { id: 'he_16', from: 'hum_ham_kush_misr', to: 'hum_african_realms', kind: 'descent', eraGroup: 'prophetic_ummahs' },
  { id: 'he_17', from: 'hum_ham_put_canaan', to: 'hum_maghreb_andalus', kind: 'descent', eraGroup: 'prophetic_ummahs' },
  { id: 'he_18', from: 'hum_yafith_west', to: 'hum_persia_turk', kind: 'descent', eraGroup: 'prophetic_ummahs' },
  { id: 'he_19', from: 'hum_yafith_east', to: 'hum_persia_turk', kind: 'descent', eraGroup: 'prophetic_ummahs' },
  { id: 'he_20', from: 'hum_yafith_east', to: 'hum_indus_east_asia', kind: 'descent', eraGroup: 'prophetic_ummahs' },

  // To Final Prophet & Global Ummah
  { id: 'he_21', from: 'hum_qahtan_adnan', to: 'hum_muhammad_ummah', kind: 'direct', eraGroup: 'final_ummah', labelBn: 'কুরাইশ → শেষ নবী', labelEn: 'Quraysh → SAW' },
  { id: 'he_22', from: 'hum_banu_israil', to: 'hum_muhammad_ummah', kind: 'descent', eraGroup: 'final_ummah', labelBn: 'পূর্ববর্তী উম্মত', labelEn: 'Earlier Ummah' },
  { id: 'he_23', from: 'hum_muhammad_ummah', to: 'hum_ummah_expansion', kind: 'direct', eraGroup: 'final_ummah', labelBn: 'সকল জাতির জন্য', labelEn: 'Universal Call' },
  { id: 'he_24', from: 'hum_african_realms', to: 'hum_ummah_expansion', kind: 'global', eraGroup: 'final_ummah' },
  { id: 'he_25', from: 'hum_maghreb_andalus', to: 'hum_ummah_expansion', kind: 'global', eraGroup: 'final_ummah' },
  { id: 'he_26', from: 'hum_persia_turk', to: 'hum_ummah_expansion', kind: 'global', eraGroup: 'final_ummah' },

  // To Modern World Countries
  { id: 'he_27', from: 'hum_qahtan_adnan', to: 'hum_now_arab_levant', kind: 'descent', eraGroup: 'modern_world' },
  { id: 'he_28', from: 'hum_african_realms', to: 'hum_now_egypt_horn', kind: 'descent', eraGroup: 'modern_world' },
  { id: 'he_29', from: 'hum_maghreb_andalus', to: 'hum_now_maghreb_africa', kind: 'descent', eraGroup: 'modern_world' },
  { id: 'he_30', from: 'hum_indus_east_asia', to: 'hum_now_south_asia', kind: 'descent', eraGroup: 'modern_world' },
  { id: 'he_31', from: 'hum_persia_turk', to: 'hum_now_eurasia_west', kind: 'descent', eraGroup: 'modern_world' },
  { id: 'he_32', from: 'hum_indus_east_asia', to: 'hum_now_east_americas', kind: 'descent', eraGroup: 'modern_world' },

  // Global Ummah outreach to all 6 modern regions
  { id: 'he_33', from: 'hum_ummah_expansion', to: 'hum_now_arab_levant', kind: 'global', eraGroup: 'final_ummah' },
  { id: 'he_34', from: 'hum_ummah_expansion', to: 'hum_now_egypt_horn', kind: 'global', eraGroup: 'final_ummah' },
  { id: 'he_35', from: 'hum_ummah_expansion', to: 'hum_now_maghreb_africa', kind: 'global', eraGroup: 'final_ummah' },
  { id: 'he_36', from: 'hum_ummah_expansion', to: 'hum_now_south_asia', kind: 'global', eraGroup: 'final_ummah' },
  { id: 'he_37', from: 'hum_ummah_expansion', to: 'hum_now_eurasia_west', kind: 'global', eraGroup: 'final_ummah' },
  { id: 'he_38', from: 'hum_ummah_expansion', to: 'hum_now_east_americas', kind: 'global', eraGroup: 'final_ummah' },

  // Converge into Unified Human Family
  { id: 'he_39', from: 'hum_now_arab_levant', to: 'hum_today_unity', kind: 'direct', eraGroup: 'modern_world' },
  { id: 'he_40', from: 'hum_now_egypt_horn', to: 'hum_today_unity', kind: 'direct', eraGroup: 'modern_world' },
  { id: 'he_41', from: 'hum_now_maghreb_africa', to: 'hum_today_unity', kind: 'direct', eraGroup: 'modern_world' },
  { id: 'he_42', from: 'hum_now_south_asia', to: 'hum_today_unity', kind: 'direct', eraGroup: 'modern_world' },
  { id: 'he_43', from: 'hum_now_eurasia_west', to: 'hum_today_unity', kind: 'direct', eraGroup: 'modern_world' },
  { id: 'he_44', from: 'hum_now_east_americas', to: 'hum_today_unity', kind: 'direct', eraGroup: 'modern_world' },
];

export const HUMANITY_PERSON_TO_NATION_LIST: PersonToNationEntry[] = [
  // ================= SAM IBN NUH LINE (SEMITIC) =================
  {
    id: 'pn-qahtan',
    rootLine: 'sam',
    ancestorPersonBn: 'কাহতান → সাবা → হিমইয়ার (আরবে আরিবা)',
    ancestorPersonEn: 'Qahtan → Saba → Himyar (Al-Arab al-‘Aribah)',
    ancestorAr: 'قَحْطَانُ ← سَبَأٌ ← حِمْيَرُ',
    parentLineBn: 'সাম → আরফাকশাদ → শালেখ → আবির → কাহতান → ইয়া‘রুব → ইয়াশজুব → সাবা → হিমইয়ার',
    parentLineEn: 'Sam → Arfakhshad → Shalikh → Abir → Qahtan → Ya‘rub → Yashjub → Saba → Himyar',
    howDividedBn: 'আর-রাহীকুল মাখতূম মতে খাঁটি বা আরবে ‘আরিবা জাতির মূল কেন্দ্র ছিল ইয়েমেন। কাহতানের প্রপৌত্র সাবার দুই পুত্র হিমইয়ার ও কাহলান থেকে মূল বিভাজন ঘটে। হিমইয়ার থেকে যায়দুল জুমহূর, কুদা‘আহ ও সাকাসিক শাখা বের হয়ে ইয়েমেন ও দক্ষিণ-পশ্চিম আরবে শাসন কায়েম করে।',
    howDividedEn: 'Per Ar-Raheeq al-Makhtum, pure Qahtani Arabs centered in Yemen divided via Saba into Himyar and Kahlan; Himyar branched into Zayd al-Jumhur, Quda‘ah, and Sakasik.',
    nationsFormedBn: '‘আরিবা বা খাঁটি আরব, সাবা ও হিমইয়ার রাজবংশ (তুব্বা শাসকগণ), কুদা‘আহ, কালব, জুহাইনা ও সাকাসিক',
    nationsFormedEn: 'Pure Qahtani Arabs: Saba, Himyarite Kingdom (Tubba‘), Quda‘ah, Kalb, Juhaynah & Sakasik',
    whereTodayBn: 'ইয়েমেন, দক্ষিণ সৌদি আরব (আসির ও নাজরান), ওমান, জর্ডান ও সিরিয়ার দক্ষিণ অংশ',
    whereTodayEn: 'Yemen, Southern Saudi Arabia (Asir/Najran), Oman, Jordan & Southern Syria',
    sourceNoteBn: 'আর-রাহীকুল মাখতূম · তারীখে তাবারী',
    sourceNoteEn: 'Ar-Raheeq al-Makhtum · Tarikh al-Tabari',
  },
  {
    id: 'pn-kahlan-azd',
    rootLine: 'sam',
    ancestorPersonBn: 'কাহলান ইবনে সাবা ও মা‘রিব বাঁধ-পরবর্তী দেশান্তর',
    ancestorPersonEn: 'Kahlan ibn Saba & Post-Ma’rib Migrations',
    ancestorAr: 'كَهْلَانُ بْنُ سَبَأٍ وَالْأَزْدُ',
    parentLineBn: 'কাহতান → সাবা → কাহলান → আযদ, লাখম ও জুযাম, বনু তাই, কিন্দাহ, হামদান ও মাযহিজ',
    parentLineEn: 'Qahtan → Saba → Kahlan → Azd, Lakhm, Tayy, Kindah, Hamdan & Madhhij',
    howDividedBn: 'ইয়েমেনের বিখ্যাত মা‘রিব বাঁধ ভেঙে (সাইলুল আরিম) কৃষিব্যবস্থা বিপর্যস্ত হলে কাহলানের গোত্রগুলো আরব জুড়ে ছড়িয়ে পড়ে: আযদের এক শাখা মদীনায় (আউস ও খাযরাজ/আনসার), এক শাখা মক্কায় (খুযা‘আহ), এক শাখা শামে (গাসসানী), ওমান ও তিহামায় যায়; লাখম ইরাকের হীরাহয়; বনু তাই নজদে এবং কিন্দাহ মধ্য আরবে রাজ্য গড়ে।',
    howDividedEn: 'After the Great Ma’rib Dam collapse (Sayl al-‘Arim), Kahlan dispersed across Arabia: Azd formed Ansar (Aws & Khazraj) in Madinah, Khuza‘ah in Makkah, Ghassanids in Sham, and Azd Oman; Lakhm founded Al-Hirah; Tayy and Kindah settled Najd.',
    nationsFormedBn: 'মদীনার আনসার (আউস ও খাযরাজ), মক্কার খুযা‘আহ, শামের গাসসানী, ইরাকের লাখমী (হীরাহ), বনু তাই, কিন্দাহ, হামদান ও মাযহিজ',
    nationsFormedEn: 'Aws & Khazraj (Ansar), Khuza‘ah, Ghassanids, Lakhmids of Al-Hirah, Banu Tayy, Kindah, Hamdan & Madhhij',
    whereTodayBn: 'মদীনা, মক্কা ও হেজায, ইয়েমেন, ওমান, সংযুক্ত আরব আমিরাত, ইরাক (হীরাহ/কুফা অঞ্চল), জর্ডান ও সিরিয়া',
    whereTodayEn: 'Madinah, Makkah, Yemen, Oman, UAE, Iraq (Al-Hirah/Kufa), Jordan & Syria',
    sourceNoteBn: 'আর-রাহীকুল মাখতূম (কাহতানীদের দেশান্তর) · সূরা সাবা ৩৪:১৫-১৬',
    sourceNoteEn: 'Ar-Raheeq al-Makhtum (Emigration of Kahlan) · Surah Saba 34:15-16',
  },
  {
    id: 'pn-ismail',
    rootLine: 'sam',
    ancestorPersonBn: 'হযরত ইসমাঈল (আ.) → আদনান (আরবে মুসতা‘রিবা)',
    ancestorPersonEn: 'Prophet Ismail (AS) → Adnan (Al-Arab al-Musta‘ribah)',
    ancestorAr: 'إِسْمَاعِيلُ وَعَدْنَانُ عَلَيْهِ السَّلَام',
    parentLineBn: 'সাম → ফালিখ → ইবরাহীম (আ.) → ইসমাঈল (আ.) [১২ পুত্র: নাবিত, কায়দার প্রমুখ] → আদনান → মা‘আদ → নিযার',
    parentLineEn: 'Sam → Falikh → Ibrahim (AS) → Ismail (AS) [12 Sons: Nabit, Qaydar] → Adnan → Ma‘add → Nizar',
    howDividedBn: 'আর-রাহীকুল মাখতূম অনুসারে ইবরাহীম (আ.) ইসমাঈল ও হাজেরাকে মক্কায় রাখলে ইয়েমেনী জুরহুম গোত্র সেখানে বসতি গড়ে। ইসমাঈল (আ.) জুরহুমদের কাছ থেকে বিশুদ্ধ আরবি শেখেন এবং তাঁর ১২ পুত্রের (বিশেষত নাবিত ও কায়দার) বংশে আদনান জন্মগ্রহণ করেন। নবী করীম (ﷺ) বংশলতিকায় আদনান পর্যন্তই গ্রহণ করতেন।',
    howDividedEn: 'Per Ar-Raheeq al-Makhtum, Ismail (AS) learned pure Arabic from Yemen’s Jurhum tribe in Makkah; his 12 sons (chiefly Nabit and Qaydar) spread across Hijaz, leading to Adnan, Ma‘add, and Nizar.',
    nationsFormedBn: 'মুসতা‘রিবা বা আরবায়িত আরব: আদনানী সকল গোত্র (নিযারের দুই প্রধান ধারা: রাবী‘আহ ও মুদার, সাথে আনমার ও ইয়াদ)',
    nationsFormedEn: 'Arabized (Musta‘ribah) Arabs: All Adnanite tribes branching from Nizar into Rabiah and Mudhar',
    whereTodayBn: 'সৌদি আরব (মক্কা, তায়েফ, নজদ ও পূর্বাঞ্চল), বাহরাইন, কুয়েত, ইরাক, জর্ডান, সিরিয়া ও মিসর',
    whereTodayEn: 'Saudi Arabia, Bahrain, Kuwait, Iraq, Jordan, Syria & Egypt',
    sourceNoteBn: 'আর-রাহীকুল মাখতূম · সূরা আল-বাকারাহ ২:১২৭ · সীরাত ইবনে হিশাম',
    sourceNoteEn: 'Ar-Raheeq al-Makhtum · Surah Al-Baqarah 2:127 · Sirah Ibn Hisham',
  },
  {
    id: 'pn-rabiah',
    rootLine: 'sam',
    ancestorPersonBn: 'রাবী‘আহ ইবনে নিযার ইবনে মা‘আদ ইবনে আদনান',
    ancestorPersonEn: 'Rabiah ibn Nizar ibn Ma‘add ibn Adnan',
    ancestorAr: 'رَبِيعَةُ بْنُ نِزَارِ بْنِ مَعَدٍّ',
    parentLineBn: 'ইসমাঈল (আ.) → আদনান → মা‘আদ → নিযার → রাবী‘আহ → আসাদ, আনযাহ, আব্দুল কায়েস ও ওয়াইল',
    parentLineEn: 'Ismail (AS) → Adnan → Ma‘add → Nizar → Rabiah → Asad, Anazah, Abdul Qays & Wa’il',
    howDividedBn: 'নিযার ইবনে মা‘আদের দুই প্রধান শাখার প্রথমটি রাবী‘আহ। রাবী‘আহ থেকে আসাদ, আনযাহ ও আব্দুল কায়েস পূর্ব আরবে যায়; আর ওয়াইল থেকে জন্ম নেওয়া বকর ও তাগলিব গোত্র ফোরাত তীর ও জাযীরাহ অঞ্চলে বিস্তার পায় (প্রসিদ্ধ বাসূস যুদ্ধ এ দুই গোত্রের মধ্যে হয়)। বনু হানীফাহ ইয়ামামায় বসে।',
    howDividedEn: 'Rabiah (brother of Mudhar) split into Abdul Qays (East Arabia/Bahrain), Banu Hanifah (Yamamah), Anazah, and Wa’il → Bakr & Taghlib (Upper Mesopotamia/Euphrates).',
    nationsFormedBn: 'আব্দুল কায়েস (দ্বিতীয় বৃহৎ জামা‘আতে জুমুআহ), বনু বকর ইবনে ওয়াইল, বনু তাগলিব, বনু শায়বান, আনযাহ ও বনু হানীফাহ',
    nationsFormedEn: 'Abdul Qays, Bakr ibn Wa’il, Taghlib, Shayban, Anazah & Banu Hanifah',
    whereTodayBn: 'বাহরাইন, সৌদি আরবের পূর্বাঞ্চল (কাতীফ-আহসা ও রিয়াদ-ইয়ামামা), উত্তর ইরাক ও পূর্বাঞ্চলীয় সিরিয়া (দিয়ার রাবী‘আহ)',
    whereTodayEn: 'Bahrain, Eastern Saudi Arabia & Riyadh (Yamamah), Northern Iraq & Eastern Syria',
    sourceNoteBn: 'আর-রাহীকুল মাখতূম (আদনানী গোত্রের শাখা) · আল-কামিল (ইবনুল আসীর)',
    sourceNoteEn: 'Ar-Raheeq al-Makhtum · Al-Kamil fi al-Tarikh',
  },
  {
    id: 'pn-mudar-quraysh',
    rootLine: 'sam',
    ancestorPersonBn: 'মুদার ইবনে নিযার → কিনানাহ → কুরাইশ (নবী ﷺ-এর বংশ)',
    ancestorPersonEn: 'Mudhar ibn Nizar → Kinanah → Quraysh (Prophet’s Lineage)',
    ancestorAr: 'مُضَرُ ← كِنَانَةُ ← قُرَيْشٌ ← بَنُو هَاشِمٍ',
    parentLineBn: 'আদনান → নিযার → মুদার → (১) কায়েস আয়লান ও (২) ইলইয়াস → কিনানাহ → ফিহর (কুরাইশ) → কুসাই → হাশেম → মুহাম্মাদ (ﷺ)',
    parentLineEn: 'Adnan → Nizar → Mudhar → Qays ‘Aylan & Ilyas → Kinanah → Fihr (Quraysh) → Qusay → Hashim → Muhammad (SAW)',
    howDividedBn: 'মুদার দুটি মহাশাখায় ভাগ হয়: (১) কায়েস আয়লান — যা থেকে হাওয়াযিন (মক্কার পূর্বে আওতাস), সাক্বীফ (তায়েফ), বনু সুলাইম ও গাতাফান (আবস, যুবইয়ান, আশজা‘); (২) ইলইয়াস ইবনে মুদার — যা থেকে বনু তামীম (নজদ-বসরা), হুযাইল (হেজায পর্বত), বনু আসাদ এবং কিনানাহ → ফিহর (কুরাইশ)। কুসাই ইবনে কিলাব বিচ্ছিন্ন কুরাইশদের মক্কায় ঐক্যবদ্ধ করেন।',
    howDividedEn: 'Mudhar divided into Qays ‘Aylan (Hawazin, Thaqif in Ta’if, Sulaym, Ghatafan) and Ilyas (Tamim in Najd, Hudhayl near Makkah, Kinanah → Fihr/Quraysh). Qusay ibn Kilab consolidated Quraysh around the Ka‘bah.',
    nationsFormedBn: 'কুরাইশ (বনু হাশেম, বনু উমাইয়া, বনু তাইম, বনু আদী, বনু মাখযূম, বনু যুহরা), কিনানাহ, তামীম, হুযাইল, হাওয়াযিন, সাক্বীফ ও গাতাফান',
    nationsFormedEn: 'Quraysh (Hashim, Umayyah, Taym, Adi, Makhzum, Zuhrah), Kinanah, Tamim, Hudhayl, Hawazin, Thaqif & Ghatafan',
    whereTodayBn: 'মক্কা, তায়েফ ও হেজায, নজদ-রিয়াদ, কাতার (তামীম), জর্ডান, ফিলিস্তিন, সিরিয়া, ইরাক, মিসর ও সমগ্র মুসলিম বিশ্ব (আহলে বাইত ও আশরাফগণ)',
    whereTodayEn: 'Makkah, Ta’if, Najd, Qatar, Levant, Iraq, Egypt & Ahl al-Bayt descendants worldwide',
    sourceNoteBn: 'আর-রাহীকুল মাখতূম (মুদার শাখা, কুসাই ও কুরাইশের গোত্রসমূহ)',
    sourceNoteEn: 'Ar-Raheeq al-Makhtum (Mudhar, Qusay & Quraysh Clans)',
  },
  {
    id: 'pn-yaqub',
    rootLine: 'sam',
    ancestorPersonBn: 'হযরত ইয়াকূব (আ.) / ইসরাঈল',
    ancestorPersonEn: 'Prophet Yaqub (AS) / Israel',
    ancestorAr: 'يَعْقُوبُ (إِسْرَائِيلُ) عَلَيْهِ السَّلَام',
    parentLineBn: 'সাম → ইবরাহীম (আ.) → ইসহাক্ব (আ.) → ইয়াকূব (আ.) → ১২ পুত্র',
    parentLineEn: 'Sam → Ibrahim (AS) → Ishaq (AS) → Yaqub (AS) → 12 Sons',
    howDividedBn: 'ইয়াকূব (আ.)-এর ১২ পুত্র (লাভী, ইয়াহূদা, ইউসুফ, বিনইয়ামীন প্রমুখ) থেকে ১২টি পৃথক গোত্র (আসবাত) তৈরি হয়; মূসা (আ.) ও ঈসা (আ.)-এর সময় এই গোত্রগুলোই বনী ইসরাঈল নামে পরিচিত ছিল।',
    howDividedEn: 'Yaqub’s 12 sons divided into the Twelve Tribes of Israel (Asbat); prophets Musa, Dawud, Sulayman, and Isa (AS) arose here.',
    nationsFormedBn: 'বনী ইসরাঈলের ১২ গোত্র (ইয়াহূদা/জুদা, লাভী, ইউসুফ/আফ্রাঈম, বিনইয়ামীন প্রমুখ) ও পূর্বের ঈসায়ী/ইহুদী বংশধর',
    nationsFormedEn: 'The 12 Tribes of Banu Israil (Judah, Levi, Joseph, Benjamin, etc.)',
    whereTodayBn: 'ঐতিহাসিকভাবে ফিলিস্তিন ও মিসর; বর্তমানে ফিলিস্তিন/ইসরায়েল, জর্ডান এবং বিশ্বব্যাপী ছড়িয়ে পড়া জনগোষ্ঠী (অনেকে পরে ইসলাম গ্রহণ করে শামে রয়ে যান)',
    whereTodayEn: 'Historically Palestine & Egypt; today Palestine/Israel, Jordan & global diasporas (many early Israelites embraced Islam in Sham)',
    sourceNoteBn: 'সূরা আল-আ‘রাফ ৭:১৬০ · সূরা ইউসুফ ১২',
    sourceNoteEn: 'Surah Al-A‘raf 7:160 · Surah Yusuf 12',
  },
  {
    id: 'pn-esu',
    rootLine: 'sam',
    ancestorPersonBn: 'ঈসু ইবনে ইসহাক্ব (আ.) ও মাদইয়ান',
    ancestorPersonEn: 'Esu ibn Ishaq & Madyan ibn Ibrahim',
    ancestorAr: 'عِيسُو بْنُ إِسْحَاقَ وَمَدْيَنُ',
    parentLineBn: 'সাম → ইবরাহীম (আ.) → ইসহাক্ব → ঈসু এবং ইবরাহীম → মাদইয়ান',
    parentLineEn: 'Sam → Ibrahim → Ishaq → Esu, and Ibrahim → Madyan',
    howDividedBn: 'ইসহাক্ব (আ.)-এর জ্যেষ্ঠ পুত্র ঈসু (ইয়াকূবের যমজ ভাই) পূর্ব-দক্ষিণ শামে আদোমীয় বংশ গড়েন; অন্যদিকে ইবরাহীম (আ.)-এর পুত্র মাদইয়ান লোহিত সাগরের তীরে যান।',
    howDividedEn: 'Esu settled south of the Dead Sea (Edom), while Ibrahim’s son Madyan settled Northwest Arabia.',
    nationsFormedBn: 'আদোমীয় জাতি (Edomites), একটি ঐতিহাসিক বর্ণনামতে প্রাচীন সিরীয়-রোমীয় অংশ, এবং মাদইয়ান ও আসহাবুল আইকা (শো‘আয়েব আ.-এর জাতি)',
    nationsFormedEn: 'Edomites (Esau) and Midianites / People of Al-Aykah (Shu‘ayb AS)',
    whereTodayBn: 'দক্ষিণ জর্ডান (পেত্রা ও মা‘আন অঞ্চল), উত্তর-পশ্চিম সৌদি আরব (তাবুক ও আল-বাদ‘) এবং সিনাই অঞ্চল',
    whereTodayEn: 'Southern Jordan (Petra/Ma‘an), NW Saudi Arabia (Tabuk/Al-Bad) & Sinai',
    sourceNoteBn: 'তাফসীরে ইবনে কাসীর · তারিখে তাবারী',
    sourceNoteEn: 'Tafsir Ibn Kathir · Tarikh al-Tabari',
  },
  {
    id: 'pn-eram',
    rootLine: 'sam',
    ancestorPersonBn: 'ইরাম ও আশূর ইবনে সাম',
    ancestorPersonEn: 'Eram & Ashur (Sons of Sam)',
    ancestorAr: 'إِرَمُ وَآشُورُ بْنَا سَامٍ',
    parentLineBn: 'নূহ (আ.) → সাম → ইরাম, আশূর ও ইলাম',
    parentLineEn: 'Nuh (AS) → Sam → Eram, Ashur & Elam',
    howDividedBn: 'ইরামের পুত্র আওস ও গাসিরের মাধ্যমে আরব অঞ্চলে আদ ও সামূদ এবং শামে আরামীয় জাতি ভাগ হয়; আশূর ফোরাত-দজলা তীরে আসিরীয় ও ইলাম পারস্যের দক্ষিণ-পশ্চিমে যান।',
    howDividedEn: 'Eram divided into Ad, Thamud, and Aramaeans; Ashur settled Upper Tigris (Assyria); Elam settled SW Persia.',
    nationsFormedBn: 'আদ ও সামূদ (বিলুপ্ত), আরামীয়/সিরিয়াক জাতি (Syriacs), আসিরীয়/ক্যালডীয় (Assyrians) এবং ইলামীয়',
    nationsFormedEn: 'Ad & Thamud (perished), Syriac/Aramaeans, Assyrians/Chaldeans & Elamites',
    whereTodayBn: 'সিরিয়া, লেবানন, উত্তর ইরাক (নিনেভে/মসুল ও বাগদাদ), দক্ষিণ-পূর্ব তুরস্ক (মারদিন) ও দক্ষিণ-পশ্চিম ইরান',
    whereTodayEn: 'Syria, Lebanon, Northern Iraq (Nineveh/Mosul), SE Turkey & SW Iran',
    sourceNoteBn: 'সূরা আল-ফাজর ৮৯:৬-৮ · আল-বিদায়া ওয়ান নিহায়া',
    sourceNoteEn: 'Surah Al-Fajr 89:6-8 · Al-Bidayah',
  },
  {
    id: 'pn-lawidh',
    rootLine: 'sam',
    ancestorPersonBn: 'লাউয (লাউইয) ইবনে সাম',
    ancestorPersonEn: 'Lawidh (Lud) ibn Sam',
    ancestorAr: 'لَاوُذُ بْنُ سَامٍ',
    parentLineBn: 'নূহ (আ.) → সাম → লাউয (পুত্র: তাসম, আমলীক/ইমলীক, উমাইম)',
    parentLineEn: 'Nuh (AS) → Sam → Lawidh (Tasm, Imliq, Umaym)',
    howDividedBn: 'তারীখে তাবারী ও আর-রাহীকুল মাখতূম অনুযায়ী লাউয ইবনে সাম থেকে আরবের প্রাচীনতম "আরবে বায়দা" (বিলুপ্ত আরব) গোত্রগুলো—যেমন তাসম, জাদীস ও আমালিকাহ—ইয়ামামা, হেজায, শাম ও মিসরে ছড়িয়ে পড়ে।',
    howDividedEn: 'Per Tarikh al-Tabari and Ar-Raheeq al-Makhtum, Lawidh gave rise to primordial extinct Arab tribes (Al-Arab al-Ba’idah): Tasm, Jadis, and Amaliqah across Najd, Hijaz, Levant & Egypt.',
    nationsFormedBn: 'আরবে বায়দা (العرب البائدة): তাসম, জাদীস (ইয়ামামা/নজদ), আমালিকাহ (শাম, হেজায ও মিসর) এবং লিডিয়ান অংশ',
    nationsFormedEn: 'Al-Arab al-Ba’idah: Tasm, Jadis (Yamamah/Najd), Amaliqah (Amalekites across Levant/Egypt) & Lydians',
    whereTodayBn: 'প্রাচীন আবাস: সৌদি আরবের নজদ-ইয়ামামা, হেজায ও ফিলিস্তিন; ঐতিহাসিক বিবরণ মতে অভ্যন্তরীণ যুদ্ধে অধিকাংশ বিলুপ্ত হয় ও অবশিষ্টরা পরবর্তী আরব গোত্রে মিশে যায়',
    whereTodayEn: 'Ancient Najd/Yamamah (Riyadh region), Hijaz & Levant; mostly perished in antiquity, remnants merged into later Arab tribes',
    sourceNoteBn: 'আর-রাহীকুল মাখতূম · আল-বিদায়া ওয়ান নিহায়া · তারীখে তাবারী',
    sourceNoteEn: 'Ar-Raheeq al-Makhtum · Al-Bidayah · Tarikh al-Tabari',
  },

  // ================= HAM IBN NUH LINE (AFRICAN) =================
  {
    id: 'pn-kush',
    rootLine: 'ham',
    ancestorPersonBn: 'কুশ ইবনে হাম',
    ancestorPersonEn: 'Cush ibn Ham',
    ancestorAr: 'كُوشُ بْنُ حَامٍ',
    parentLineBn: 'নূহ (আ.) → হাম → কুশ',
    parentLineEn: 'Nuh (AS) → Ham → Cush',
    howDividedBn: 'কুশ ও তাঁর সন্তানেরা (হাবিলাহ, সাভতা, রা‘মা, নিমরুদ প্রমুখ) লোহিত সাগর ও নীল নদের দক্ষিণ অংশ হয়ে পূর্ব আফ্রিকা ও আরবের একটি প্রাচীন অংশে ছড়িয়ে পড়েন।',
    howDividedEn: 'Cush’s sons spread south of Egypt along the Nile and across the Red Sea into East Africa.',
    nationsFormedBn: 'হাবশী (Abyssinians / Amhara-Tigray), নুবীয় (Nubians / النوبة), যান্জ (Zanj), সোমালি, ওরোমো ও কুশীয় জাতিসমূহ',
    nationsFormedEn: 'Abyssinians (Ethiopians), Nubians, Zanj (East Africa), Somalis, Oromo & Cushitic peoples',
    whereTodayBn: 'ইথিওপিয়া (হাবশা), সুদান, দক্ষিণ সুদান, ইরিত্রিয়া, সোমালিয়া, জিবুতি, কেনিয়া ও তাঞ্জানিয়া',
    whereTodayEn: 'Ethiopia, Sudan, South Sudan, Eritrea, Somalia, Djibouti, Kenya & Tanzania',
    sourceNoteBn: 'মুসনাদে আহমাদ ২০১৬৯ · তারীখে তাবারী · মুরূজুয যাহাব',
    sourceNoteEn: 'Musnad Ahmad 20169 · Al-Tabari · Muruj adh-Dhahab',
  },
  {
    id: 'pn-misraim',
    rootLine: 'ham',
    ancestorPersonBn: 'মিসরাইম (মিসর) ইবনে হাম',
    ancestorPersonEn: 'Mizraim (Misr) ibn Ham',
    ancestorAr: 'مِصْرَايِمُ بْنُ حَامٍ',
    parentLineBn: 'নূহ (আ.) → হাম → মিসরাইম (বাইসার ইবনে হাম)',
    parentLineEn: 'Nuh (AS) → Ham → Mizraim',
    howDividedBn: 'হামের পুত্র মিসরাইম নীল নদের উর্বর ব-দ্বীপে বসবাস শুরু করেন এবং উচ্চ ও নিম্ন মিসরের প্রাচীন শহরগুলো (মেমফিস, থিবস) প্রতিষ্ঠা করেন।',
    howDividedEn: 'Mizraim settled along the fertile Nile Delta and Upper Nile, founding ancient Egyptian cities.',
    nationsFormedBn: 'প্রাচীন মিসরীয়, কিবতি (Copts / القبط), ও নীল-বদ্বীপের অধিবাসী (সাহাবী আমর ইবনুল আস রা.-এর পর ইসলাম ও আরবি সংস্কৃতির সাথে একীভূত)',
    nationsFormedEn: 'Ancient Egyptians & Copts (integrated with wider Arab/Islamic society after 641 CE)',
    whereTodayBn: 'মিসর (কায়রো, আলেকজান্দ্রিয়া ও নীল উপত্যকা) এবং উত্তর সুদান',
    whereTodayEn: 'Egypt (Cairo, Alexandria & Nile Valley) and Northern Sudan',
    sourceNoteBn: 'ফুতূহ মিসর (ইবনে আব্দুল হাকাম) · তারীখে তাবারী',
    sourceNoteEn: 'Futuh Misr · Tarikh al-Tabari',
  },
  {
    id: 'pn-put',
    rootLine: 'ham',
    ancestorPersonBn: 'ফূত (পুত) ইবনে হাম',
    ancestorPersonEn: 'Phut ibn Ham',
    ancestorAr: 'فُوطُ بْنُ حَامٍ',
    parentLineBn: 'নূহ (আ.) → হাম → ফূত',
    parentLineEn: 'Nuh (AS) → Ham → Phut',
    howDividedBn: 'মিসরের পশ্চিম দিক হয়ে ভূমধ্যসাগরের তীর ও সাহারা মরুভূমির প্রান্ত ধরে উত্তর ও পশ্চিম আফ্রিকার বিশাল অঞ্চলে এই ধারা বিভক্ত হয়।',
    howDividedEn: 'Expanded westward from Egypt along the Mediterranean coast and Saharan trade routes.',
    nationsFormedBn: 'প্রাচীন লিবিয়ান, নুমিডীয়, পশ্চিম আফ্রিকান ও সাহেল-সুদান অঞ্চলের আদি জনগোষ্ঠী',
    nationsFormedEn: 'Ancient Libyans, Numidians & Saharan/West African lineages',
    whereTodayBn: 'লিবিয়া, নাইজেরিয়া, মালি, নাইজার, সেনেগাল, ঘানা, চাদ ও পশ্চিম-মধ্য আফ্রিকা',
    whereTodayEn: 'Libya, Nigeria, Mali, Niger, Senegal, Ghana, Chad & West-Central Africa',
    sourceNoteBn: 'কিতাবুল ইবার (ইবনে খালদুন) · মুরূজুয যাহাব',
    sourceNoteEn: 'Kitab al-Ibar (Ibn Khaldun) · Muruj adh-Dhahab',
  },
  {
    id: 'pn-canaan-mazigh',
    rootLine: 'ham',
    ancestorPersonBn: 'কান‘আন ইবনে হাম ও মাযীগ (আমাজিগ/বার্বার ধারা)',
    ancestorPersonEn: 'Canaan ibn Ham & Mazigh (Amazigh/Phoenician Line)',
    ancestorAr: 'كَنْعَانُ بْنُ حَامٍ وَمَازِيغُ (الْبَرْبَر)',
    parentLineBn: 'নূহ (আ.) → হাম → কান‘আন → সিদোন, হেত ও (ইবনে খালদুনের উদ্ধৃতি মতে) মাযীগ',
    parentLineEn: 'Nuh (AS) → Ham → Canaan → Sidon, Heth & Mazigh (Ibn Khaldun)',
    howDividedBn: 'কান‘আনের পুত্র সিদোন ও হেত শাম-ফিলিস্তিন উপকূলে বসবাস করেন; সমুদ্রপথে ফিনিশীয়রা তিউনিসিয়ার কার্থেজ প্রতিষ্ঠা করে। আল্লামা ইবনে খালদুন তাঁর "কিতাবুল ইবার"-এ উত্তর আফ্রিকার আমাজিগ (বুতর ও সানহাজা) বংশকে মাযীগ ইবনে কান‘আনের সাথে যুক্ত করেছেন।',
    howDividedEn: 'Canaan populated the Levantine coast and maritime Carthage; Ibn Khaldun’s Kitab al-Ibar records Amazigh traditions tracing back to Mazigh ibn Canaan (split into Botr & Sanhaja).',
    nationsFormedBn: 'প্রাচীন কান‘আনী, ফিনিশীয় (Phoenicians), কার্থেজীয় এবং উত্তর আফ্রিকার আমাজিগ/বার্বার (বুতর ও সানহাজা গোত্রসমূহ)',
    nationsFormedEn: 'Ancient Canaanites, Phoenicians, Carthaginians & North African Amazigh (Botr & Sanhaja)',
    whereTodayBn: 'মরক্কো, আলজেরিয়া, তিউনিসিয়া, মৌরিতানিয়া, লিবিয়া, লেবানন ও ফিলিস্তিন',
    whereTodayEn: 'Morocco, Algeria, Tunisia, Mauritania, Libya, Lebanon & Palestine',
    sourceNoteBn: 'কিতাবুল ইবার (ইবনে খালদুন) · তারীখে তাবারী',
    sourceNoteEn: 'Kitab al-Ibar (Ibn Khaldun) · Tarikh al-Tabari',
  },

  // ================= YAFITH IBN NUH LINE (EURASIAN & ASIAN) =================
  {
    id: 'pn-gomer',
    rootLine: 'yafith',
    ancestorPersonBn: 'গুমার ইবনে ইয়াফিস',
    ancestorPersonEn: 'Gomer ibn Yafith',
    ancestorAr: 'غُومَرُ بْنُ يَافِثَ',
    parentLineBn: 'নূহ (আ.) → ইয়াফিস → গুমার (পুত্র: আশকেনায, রিফাথ, তোগারমা)',
    parentLineEn: 'Nuh (AS) → Yafith → Gomer',
    howDividedBn: 'কৃষ্ণ সাগরের উত্তর পাড় হয়ে ইউরোপের কেন্দ্রে ও পশ্চিমে ঢুকে গুমারের সন্তানেরা কেল্টিক, জার্মানিক ও নর্ডিক গোত্রে ভাগ হন; আর তোগারমার ধারা আনাতোলিয়া-ককেশাসে থাকেন।',
    howDividedEn: 'Moved north of the Black Sea into Central and Western Europe, branching into Celtic and Germanic tribes.',
    nationsFormedBn: 'কেল্টিক, গল, জার্মানিক, ফ্রাঙ্ক, অ্যাংলো-স্যাক্সন, স্ক্যান্ডিনেভীয় ও আর্মেনীয়-ককেশীয় অংশ',
    nationsFormedEn: 'Celts, Gauls, Germanic, Franks, Anglo-Saxons, Scandinavians & Armenians',
    whereTodayBn: 'জার্মানি, ফ্রান্স, যুক্তরাজ্য, আয়ারল্যান্ড, স্পেন, নেদারল্যান্ডস, সুইডেন, নরওয়ে ও আধুনিক আমেরিকা-অস্ট্রেলিয়া',
    whereTodayEn: 'Germany, France, UK, Ireland, Spain, Scandinavia, and modern Americas/Australia',
    sourceNoteBn: 'আল-বিদায়া ওয়ান নিহায়া · তারীখে তাবারী',
    sourceNoteEn: 'Al-Bidayah wan-Nihayah · Tarikh al-Tabari',
  },
  {
    id: 'pn-javan',
    rootLine: 'yafith',
    ancestorPersonBn: 'ইয়াওয়ান (ইয়ূনান) ইবনে ইয়াফিস',
    ancestorPersonEn: 'Javan (Yunan) ibn Yafith',
    ancestorAr: 'يَاوَانُ (يُونَانُ) بْنُ يَافِثَ',
    parentLineBn: 'নূহ (আ.) → ইয়াফিস → ইয়াওয়ান (পুত্র: ইলিশা, তারশিশ, কিত্তিম, রোদানিম)',
    parentLineEn: 'Nuh (AS) → Yafith → Javan',
    howDividedBn: 'ভূমধ্যসাগরের উত্তর তীরে ও দ্বীপগুলোতে (সাইপ্রাস, রোডস, এজিয়ান সাগর) বসতি গড়ে গ্রীক ও ইতালীয়-রোমান জাতি গঠিত হয় (তারীখে তাবারী মতে প্রাচীন রোমান/বাইজেন্টাইনদের একাংশও এখানকার)।',
    howDividedEn: 'Settled Aegean islands, Anatolia’s coast, Greece, and the Italian peninsula.',
    nationsFormedBn: 'গ্রীক (ইয়ূনানী), প্রাচীন রোমান/লাতিন (আর-রূম), স্প্যানিশ-আশবান (তারশিশ/আইবেরিয়া) ও ভূমধ্যসাগরীয় জাতিসমূহ',
    nationsFormedEn: 'Greeks (Yunan), Ancient Romans/Latins (Al-Rum), Iberian & Southern European peoples',
    whereTodayBn: 'গ্রীস, ইতালি, সাইপ্রাস, মাল্টা, পর্তুগাল, স্পেন ও দক্ষিণ ফ্রান্স',
    whereTodayEn: 'Greece, Italy, Cyprus, Malta, Portugal & Spain',
    sourceNoteBn: 'জামে তিরমিযী ৩৯৩১ · মুরূজুয যাহাব · আল-বিদায়া',
    sourceNoteEn: 'Jami at-Tirmidhi 3931 · Muruj adh-Dhahab · Al-Bidayah',
  },
  {
    id: 'pn-tubal-meshech',
    rootLine: 'yafith',
    ancestorPersonBn: 'তূবাল, মেশেখ ও তীরাস (সাকালেবা / পূর্ব ইউরোপ)',
    ancestorPersonEn: 'Tubal, Meshech & Tiras (Saqalibah / Slavic & Caucasus)',
    ancestorAr: 'تُوبَالُ وَمَاشِكُ وَالصَّقَالِبَةُ',
    parentLineBn: 'নূহ (আ.) → ইয়াফিস → তূবাল, মেশেখ ও তীরাস',
    parentLineEn: 'Nuh (AS) → Yafith → Tubal, Meshech & Tiras',
    howDividedBn: 'ককেশাস পর্বতমালা, আনাতোলিয়ার পূর্বভাগ ও বলকান হয়ে পূর্ব ইউরোপের বিশাল সমভূমিতে "সাকালেবা" (স্লাভ) ও ককেশীয় জাতিগোষ্ঠী বিভক্ত হয়ে ছড়িয়ে পড়ে।',
    howDividedEn: 'Expanded across the Caucasus, Balkans, and Eastern European plains, forming the Saqalibah (Slavs) and Caucasians.',
    nationsFormedBn: 'সাকালেবা (স্লাভ জাতিসমূহ), জর্জিয়ান, ককেশীয় (চেচেন-দাগেস্তানি), থ্রাসীয় ও বলকান জাতি',
    nationsFormedEn: 'Saqalibah (Slavs), Georgians, Caucasian peoples, Thracians & Balkan nations',
    whereTodayBn: 'জর্জিয়া, রাশিয়া, ইউক্রেন, পোল্যান্ড, বেলোরুশ, চেক-স্লোভাকিয়া, বুলগেরিয়া, রোমানিয়া, বসনিয়া ও আলবেনিয়া',
    whereTodayEn: 'Georgia, Russia, Ukraine, Poland, Romania, Bulgaria, Bosnia & Albania',
    sourceNoteBn: 'মুরূজুয যাহাব (আল-মাস‘ঊদী) · কিতাবুল ইবার',
    sourceNoteEn: 'Muruj adh-Dhahab (Al-Mas‘udi) · Kitab al-Ibar',
  },
  {
    id: 'pn-madai',
    rootLine: 'yafith',
    ancestorPersonBn: 'মাদাই ইবনে ইয়াফিস (মীদ, পারসিক ও ইন্দো-আর্য)',
    ancestorPersonEn: 'Madai ibn Yafith (Medes, Persians & Indo-Aryans)',
    ancestorAr: 'مَادَايُ بْنُ يَافِثَ',
    parentLineBn: 'নূহ (আ.) → ইয়াফিস → মাদাই (এবং সামি-সংযোগ সহ পারস্য অঞ্চল)',
    parentLineEn: 'Nuh (AS) → Yafith → Madai (with regional Semitic links in Elam/Persia)',
    howDividedBn: 'ইরানী মালভূমিতে বসবাস শুরু করে এক শাখা পশ্চিমে (মীদ-পারস্য-কুর্দি) ও আরেক শাখা পূর্বে আফগানিস্তান হয়ে সিন্ধু-গঙ্গা উপত্যকায় প্রবেশ করে। (তারীখে তাবারী মতে কিছু বর্ণনায় পারসিকদের সামের সাথেও সম্পর্কিত করা হয়েছে)।',
    howDividedEn: 'Settled the Iranian plateau; western branches formed Medes/Persians/Kurds while eastern branches entered South Asia.',
    nationsFormedBn: 'পারসিক (ফুরস), মীদ, কুর্দি, বেলুচ, পশতুন, তাজিক এবং দক্ষিণ এশিয়ার ইন্দো-আর্য অংশ',
    nationsFormedEn: 'Persians (Furs), Medes, Kurds, Baloch, Pashtuns, Tajiks & Indo-Aryan South Asians',
    whereTodayBn: 'ইরান, ইরাক-তুরস্ক-সিরিয়ার কুর্দি অঞ্চল, আফগানিস্তান, তাজিকিস্তান, পাকিস্তান, উত্তর ভারত ও বাংলাদেশ',
    whereTodayEn: 'Iran, Kurdistan, Afghanistan, Tajikistan, Pakistan, North India & Bangladesh',
    sourceNoteBn: 'তারীখে তাবারী · মুরূজুয যাহাব (আল-মাস‘ঊদী)',
    sourceNoteEn: 'Tarikh al-Tabari · Muruj adh-Dhahab',
  },
  {
    id: 'pn-magog-turk',
    rootLine: 'yafith',
    ancestorPersonBn: 'মাগূগ ও তুর্ক ইবনে ইয়াফিস (তুর্কি, খাযার ও স্টেপস)',
    ancestorPersonEn: 'Magog & Turk ibn Yafith (Turks, Khazars & Steppe)',
    ancestorAr: 'مَأْجُوجُ وَتُرْكُ بْنُ يَافِثَ وَالْخَزَرُ',
    parentLineBn: 'নূহ (আ.) → ইয়াফিস → মাগূগ / তুর্ক / তোগারমা',
    parentLineEn: 'Nuh (AS) → Yafith → Magog / Turk / Togarmah',
    howDividedBn: 'কাস্পিয়ান সাগরের উত্তর-পূর্ব ও ইউরেশীয় স্টেপসে তুর্কি, খাযার, বুলগার, সেলজুক, তাতার ও মঙ্গোল গোত্র বিভক্ত হয়; আর সর্ব-উত্তর প্রান্তে ইয়াজূজ-মাজূজের আবাস ছিল বলে ঐতিহাসিকরা উল্লেখ করেন।',
    howDividedEn: 'Divided across the Caspian and Eurasian steppes into Turkic, Khazar, Bulgar, Mongol-Tatar peoples, and northern frontiers (Ya’juj wa Ma’juj).',
    nationsFormedBn: 'তুর্কি (ওঘুয, সেলজুক, উসমানী), খাযার, উজবেক, কাজাখ, কিরগিজ, তুর্কমেন, উইঘুর ও মঙ্গোল-তাতার',
    nationsFormedEn: 'Turks (Oghuz, Seljuk, Ottoman), Khazars, Uzbeks, Kazakhs, Kyrgyz, Turkmen, Uyghurs & Mongols',
    whereTodayBn: 'তুরস্ক, আজারবাইজান, উজবেকিস্তান, কাজাখস্তান, কিরগিজস্তান, তুর্কমেনিস্তান, জিনজিয়াং (উইঘুর), তাতারস্তান ও মঙ্গোলিয়া',
    whereTodayEn: 'Turkey, Azerbaijan, Central Asian Republics, Xinjiang (Uyghur), Tatarstan & Mongolia',
    sourceNoteBn: 'তারীখে তাবারী · মুরূজুয যাহাব · কিতাবুল ইবার (ইবনে খালদুন)',
    sourceNoteEn: 'Tarikh al-Tabari · Muruj adh-Dhahab · Kitab al-Ibar',
  },
  {
    id: 'pn-chin-east-asia',
    rootLine: 'yafith',
    ancestorPersonBn: 'সীন / চীন ও পূর্ব-এশীয় শাখা (ইয়াফিসের দূরপ্রাচ্য ধারা)',
    ancestorPersonEn: 'Sin / Chin & Maritime East Asian Line (Yafith)',
    ancestorAr: 'الصِّينُ وَأَهْلُ الشَّرْقِ الْأَقْصَى',
    parentLineBn: 'নূহ (আ.) → ইয়াফিস → পূর্ব ও দূরপ্রাচ্য শাখা (আল-মাস‘ঊদীর "সীন/চীন" বর্ণনা)',
    parentLineEn: 'Nuh (AS) → Yafith → Eastern & Maritime Dispersion (Al-Mas‘udi’s Chin/Sin)',
    howDividedBn: 'আল-মাস‘ঊদী (মুরূজুয যাহাব) ও আল-ইয়াকূবীর বিবরণ অনুযায়ী ইয়াফিসের পূর্বগামী সন্তানেরা তিব্বত-চীন হয়ে পূর্ব এশিয়া এবং সমুদ্রপথে জাভা-সুমাত্রা ও প্রশান্ত মহাসাগরীয় দ্বীপগুলোতে ভাগ হয়ে বসতি গড়েন।',
    howDividedEn: 'Al-Mas‘udi & Al-Ya‘qubi trace eastern branches across China and Tibet, branching by land and sea into Korea, Japan, and the Malay Archipelago.',
    nationsFormedBn: 'হান চীনা (আস-সীন), তিব্বতি, জাপানি, কোরিয়ান, ভিয়েতনামী, থাই এবং মালয়-জাভানিজ (ইন্দোনেশীয়) জাতিসমূহ',
    nationsFormedEn: 'Han Chinese (Al-Sin), Tibetans, Japanese, Koreans, Mainland SE Asians & Malay-Javanese peoples',
    whereTodayBn: 'চীন, জাপান, দক্ষিণ ও উত্তর কোরিয়া, ভিয়েতনাম, থাইল্যান্ড, ইন্দোনেশিয়া (বৃহত্তম মুসলিম দেশ), মালয়েশিয়া, ব্রুনাই ও ফিলিপাইন',
    whereTodayEn: 'China, Japan, Korea, Vietnam, Thailand, Indonesia (largest Muslim country), Malaysia & Brunei',
    sourceNoteBn: 'মুরূজুয যাহাব (আল-মাস‘ঊদী) · তারীখে ইয়াকূবী',
    sourceNoteEn: 'Muruj adh-Dhahab (Al-Mas‘udi) · Tarikh al-Ya‘qubi',
  },
  {
    id: 'pn-south-asia-bengal',
    rootLine: 'yafith',
    ancestorPersonBn: 'আল-হিন্দ ও আস-সিন্ধ (দক্ষিণ এশিয়া ও বাংলা মানবধারা)',
    ancestorPersonEn: 'Al-Hind & Al-Sind (South Asia & Bengal Synthesis)',
    ancestorAr: 'الْهِنْدُ وَالسِّنْدُ وَبَنْغَالَا',
    parentLineBn: 'ক্লাসিক্যাল দুই মত: ১. হাম-ধারার উপকূলীয় অভিবাসন (তাবারী) + ২. ইয়াফিস-মাদাই/আর্য ও আরব-তুর্কি সমন্বয় (মাস‘ঊদী/ইয়াকূবী)',
    parentLineEn: 'Classical Two Views: Coastal Hamitic Migration (Tabari) + Japhetic/Madai Indo-Aryan & Islamic Era Synthesis (Mas‘udi)',
    howDividedBn: 'প্রাচীন মুসলিম ঐতিহাসিকদের কেউ কেউ "হিন্দ ও সিন্ধ"-কে দক্ষিণ সমুদ্রপথের অভিবাসনের কারণে হামের সাথে, আবার আল-মাস‘ঊদী ও ইয়াকূবী প্রমুখ পূর্ব এশীয়-মাদাই বলয়ে উল্লেখ করেছেন। পরবর্তীতে ১ম হিজরি শতাব্দী থেকে আরব (সিন্ধু-চট্টগ্রাম), পারসিক ও তুর্কি মুসলিমদের সাথে মিলে আজকের বাঙালি ও দক্ষিণ এশীয় সমাজ গঠিত হয়।',
    howDividedEn: 'Early Islamic historians noted both early southern coastal roots and northern Indo-Aryan/Madai waves; from the 1st Hijri century onward, Arab traders, Persians, and Turks enriched Bengal and South Asia.',
    nationsFormedBn: 'বাঙালি, সিন্ধি, পাঞ্জাবি, কাশ্মীরি, গুজরাটি, তামিল, মারাঠি ও সমগ্র উপমহাদেশীয় জাতি',
    nationsFormedEn: 'Bengalis, Sindhis, Punjabis, Kashmiris, Gujaratis, Tamils & wider South Asian peoples',
    whereTodayBn: 'বাংলাদেশ (১৮ কোটি+), ভারত (১৪০ কোটি+), পাকিস্তান (২৪ কোটি+), নেপাল, শ্রীলঙ্কা, ভুটান ও মালদ্বীপ',
    whereTodayEn: 'Bangladesh (180M+), India (1.4B+), Pakistan (240M+), Nepal, Sri Lanka & Maldives',
    sourceNoteBn: 'মুরূজুয যাহাব · তারীখে তাবারী · ফুতূহুল বুলদান · রিহলাহ ইবনে বতুতা',
    sourceNoteEn: 'Muruj adh-Dhahab · Tarikh al-Tabari · Futuh al-Buldan · Ibn Battuta',
  },
  {
    id: 'pn-americas-oceania',
    rootLine: 'yafith',
    ancestorPersonBn: 'নতুন বিশ্ব: আমেরিকা ও ওশেনিয়ার আদিবাসী ও বিশ্ব-অভিবাসন',
    ancestorPersonEn: 'New World: Americas & Oceania (Ancient + Modern Convergence)',
    ancestorAr: 'الْأَمْرِيكَتَانِ وَأُوقْيَانُوسِيَا',
    parentLineBn: 'প্রাচীন পূর্ব এশীয়-সাইবেরীয় অভিবাসন (ইয়াফিস-ধারা) + আধুনিক ইউরোপ-আফ্রিকা-এশীয় মিলন',
    parentLineEn: 'Ancient NE Asian/Siberian Migration + Modern European, African & Asian Convergence',
    howDividedBn: 'প্রাচীনকালে উত্তর-পূর্ব এশিয়া থেকে বেরিং প্রণালী হয়ে আদিবাসী জনগোষ্ঠী আমেরিকায় এবং দক্ষিণ-পূর্ব এশিয়া থেকে ওশেনিয়ায় পৌঁছায়। গত ৫০০ বছরে ইউরোপীয় (গুমার/ইয়াওয়ান), আফ্রিকান (হাম) ও এশীয়-আরব অভিবাসনে বর্তমান জনসমাজ গড়ে ওঠে।',
    howDividedEn: 'Ancient Eurasian migrations settled the Americas and Pacific Islands; the last 500 years converged European, African, Middle Eastern, and Asian populations.',
    nationsFormedBn: 'আমেরিকার আদিবাসী (মায়া, ইনকা, আজটেক/নেটিভ), ল্যাটিন-হিস্পানিক, উত্তর আমেরিকান ও ওশেনিয়ান (মাওরি-পলিনেশীয়) জাতি',
    nationsFormedEn: 'Indigenous Americans, Latin Americans, North Americans & Pacific/Maori peoples',
    whereTodayBn: 'যুক্তরাষ্ট্র, কানাডা, মেক্সিকো, ব্রাজিল, আর্জেন্টিনা, কলম্বিয়া, অস্ট্রেলিয়া, নিউজিল্যান্ড ও ফিজি',
    whereTodayEn: 'USA, Canada, Mexico, Brazil, Argentina, Colombia, Australia, New Zealand & Fiji',
    sourceNoteBn: 'আধুনিক নৃতত্ত্ব ও বৈশ্বিক অভিবাসন ইতিহাস · সূরা হুজুরাত ৪৯:১৩',
    sourceNoteEn: 'Modern Anthropology & Global Migration · Surah Al-Hujurat 49:13',
  },
];

export const CLASSICAL_SOURCE_BOOKS: ClassicalSourceBook[] = [
  {
    id: 'book-ibn-kathir-tafsir',
    titleBn: 'তাফসীরে ইবনে কাসীর ও আল-বিদায়া ওয়ান নিহায়া',
    titleEn: 'Tafsir Ibn Kathir & Al-Bidayah wan-Nihayah',
    titleAr: 'تَفْسِيرُ ابْنِ كَثِيرٍ وَالْبِدَايَةُ وَالنِّهَايَةُ',
    authorBn: 'হাফেয ইমাউদ্দীন ইবনে কাসীর (রহ.)',
    authorEn: 'Imam Ibn Kathir',
    eraBn: '৭০১–৭৭৪ হিজরি / ১৪শ শতক',
    eraEn: '14th Century CE (774 AH)',
    contributionBn:
      'সূরা হূদ (১১:৪০) ও সাফফাত (৩৭:৭৭)-এর তাফসীরে কিস্তির ~৮০ জন মুমিন, সুকে সামানীন ও নূহ (আ.)-এর তিন পুত্র থেকে সমগ্র মানবজাতির বিস্তার এবং আদম থেকে নবীগণের ইতিহাস বিস্তারিত বর্ণিত।',
    contributionEn:
      'Documents the ~80 Ark believers (Thamanin), Surah 37:77 confirming humanity’s descent from Nuh (AS), and the comprehensive history of prophets and ancient nations.',
  },
  {
    id: 'book-tabari',
    titleBn: 'তারীখুর রুসুল ওয়াল মুলূক (তারীখে তাবারী)',
    titleEn: 'Tarikh al-Rusul wal-Muluk (History of Al-Tabari)',
    titleAr: 'تَارِيخُ الرُّسُلِ وَالْمُلُوكِ (لِلطَّبَرِيّ)',
    authorBn: 'ইমাম মুহাম্মাদ ইবনে জারীর আত-তাবারী (রহ.)',
    authorEn: 'Imam Muhammad ibn Jarir al-Tabari',
    eraBn: '২২৪–৩১০ হিজরি / ৯ম–১০ম শতক',
    eraEn: '9th–10th Century CE (310 AH)',
    contributionBn:
      'ইসলামী ইতিহাসের আদি বিশ্বকোষ; সাম, হাম ও ইয়াফিসের বংশলতিকা, আদ-সামূদ-তাসম-জাদীস-আমালিকাহ এবং কুরাইশ-আদনান-কাহতান বিভাজনের মৌলিক সূত্র।',
    contributionEn:
      'Foundational Islamic universal history mapping post-Flood human dispersion across Sam, Ham, and Yafith and primordial Arab tribes.',
  },
  {
    id: 'book-ibn-khaldun',
    titleBn: 'কিতাবুল ইবার ও মুকাদ্দিমা (তারীখে ইবনে খালদুন)',
    titleEn: 'Kitab al-Ibar & The Muqaddimah',
    titleAr: 'كِتَابُ الْعِبَرِ وَالْمُقَدِّمَةُ (لِابْنِ خَلْدُون)',
    authorBn: 'আল্লামা আব্দুর রহমান ইবনে খালদুন (রহ.)',
    authorEn: 'Ibn Khaldun',
    eraBn: '৭৩২–৮০৮ হিজরি / ১৪শ শতক',
    eraEn: '14th Century CE (808 AH)',
    contributionBn:
      'আরব, আজম (পারস্য-তুর্কি-রোম) ও উত্তর আফ্রিকার আমাজিগ/বার্বার (মাযীগ ইবনে কান‘আন) জাতিগুলোর বংশধারা, অভিবাসন এবং মানবসমাজের "আসাবিয়্যাহ" ও সভ্যতার উত্থান-পতন বিশ্লেষণ।',
    contributionEn:
      'Analyzes Arab, Eurasian, Turkic, and North African Amazigh origins alongside environmental and sociological forces behind nations.',
  },
  {
    id: 'book-masudi',
    titleBn: 'মুরূজুয যাহাব ওয়া মা‘আদিনুল জাওহার',
    titleEn: 'Muruj adh-Dhahab (The Meadows of Gold)',
    titleAr: 'مُرُوجُ الذَّهَبِ وَمَعَادِنُ الْجَوْهَرِ',
    authorBn: 'আবুল হাসান আলী আল-মাস‘ঊদী (রহ.)',
    authorEn: 'Al-Mas‘udi',
    eraBn: '২৮৩–৩৪৬ হিজরি / ১০ম শতক',
    eraEn: '10th Century CE (346 AH)',
    contributionBn:
      'ভৌগোলিক ও নৃতাত্ত্বিক গ্রন্থ; আল-হিন্দ, আস-সিন্ধ, আস-সীন (চীন), সাকালেবা (স্লাভ), খাযার, তুর্কি, যান্জ (পূর্ব আফ্রিকা) ও রোম জাতির বিস্তৃত বিবরণ।',
    contributionEn:
      'Monumental Islamic world geography detailing Hind, Sind, China, Slavs, Khazars, Turks, Zanj, and European peoples.',
  },
  {
    id: 'book-raheeq',
    titleBn: 'আর-রাহীকুল মাখতূম ও সীরাত ইবনে হিশাম',
    titleEn: 'Ar-Raheeq al-Makhtum & Sirah Ibn Hisham',
    titleAr: 'الرَّحِيقُ الْمَخْتُومُ وَسِيرَةُ ابْنِ هِشَامٍ',
    authorBn: 'সফিউর রহমান মুবারকপুরী ও ইবনে হিশাম (রহ.)',
    authorEn: 'Al-Mubarakpuri & Ibn Hisham',
    eraBn: 'প্রাচীন ও আধুনিক প্রামাণ্য সীরাতগ্রন্থ',
    eraEn: 'Classical & Modern Authoritative Seerah',
    contributionBn:
      'আরব জাতির তিন মূল বিভাজন (আরবে বায়দা, আরিবা/কাহতানী ও মুসতা‘রিবা/আদনানী), ইসমাঈল (আ.) থেকে কুরাইশ বংশ এবং শেষ নবী (ﷺ)-এর বিশ্বজনীন উম্মতের সূচনা।',
    contributionEn:
      'Details the three divisions of Arabs, Adnanite-Quraysh genealogy from Ismail (AS), and the birth of the global Ummah.',
  },
  {
    id: 'book-hadith',
    titleBn: 'সহীহ বুখারী, সহীহ মুসলিম ও জামে তিরমিযী',
    titleEn: 'Sahih al-Bukhari, Sahih Muslim & Jami at-Tirmidhi',
    titleAr: 'الْكُتُبُ السِّتَّةُ الصَّحِيحَةُ',
    authorBn: 'ইমাম বুখারী, মুসলিম ও তিরমিযী (রহ.)',
    authorEn: 'Imams Bukhari, Muslim & Tirmidhi',
    eraBn: '৩য় শতাব্দী হিজরি',
    eraEn: '3rd Century AH',
    contributionBn:
      'আদম থেকে নূহ (আ.)-এর ১০ প্রজন্ম, সাম-হাম-ইয়াফিসের মৌলিক হাদীস (তিরমিযী ৩৯৩১) এবং শেষ নবী (ﷺ)-এর সার্বজনীন রিসালাতের (সকল মানুষ আদমের সন্তান) বিশুদ্ধ প্রমাণ।',
    contributionEn:
      'Authentic Hadith on the 10 pre-Flood generations, Noah’s three sons, and the universal message of Prophet Muhammad (SAW).',
  },
];

export const HUMANITY_ERAS_LIST: HumanityEraListItem[] = [
  {
    id: 'era-1',
    order: 1,
    eraGroup: 'origin',
    eraTagBn: 'যুগ ১ · মানবজাতির সূচনা',
    eraTagEn: 'Era 1 · Dawn of Mankind',
    titleBn: 'হযরত আদম ও বিবি হাওয়া (আ.) থেকে প্রথম মানবসমাজ',
    titleEn: 'Adam & Hawwa (AS) to the Earliest Human Settlements',
    titleAr: 'بِدَايَةُ الْخَلْقِ',
    rootOrProphetBn: 'হযরত আদম (আ.), শীস (আ.) ও ইদরীস (আ.)',
    rootOrProphetEn: 'Adam (AS), Shayth (AS) & Idris (AS)',
    howSplitBn: 'আদম (আ.)-এর সন্তানদের মধ্য থেকে শীস (আ.)-এর বংশধারায় ১০ প্রজন্ম ধরে প্রথম মানববসতি ও ভাষার বিস্তার ঘটে।',
    howSplitEn: 'Multiplied from Shayth (AS) across 10 generations of monotheistic settlements.',
    whereTodayBn: 'আদি আবাস: মেসোপটেমিয়া ও মধ্যপ্রাচ্য অঞ্চল; পরবর্তীতে এঁদের থেকেই বিশ্বমানবতার সূচনা।',
    whereTodayEn: 'Early cradle in Near East; ancestral to every region today.',
    summaryBn:
      'আল্লাহ তাআলা হযরত আদম (আ.) ও হাওয়া (আ.) থেকে মানবজাতির সূচনা করেন। তাঁদের সন্তান শীস (আ.)-এর বংশধারায় ১০ প্রজন্ম ধরে পৃথিবীতে মানুষের সংখ্যা বাড়ে এবং হযরত ইদরীস (আ.) পর্যন্ত তাওহীদ প্রতিষ্ঠিত ছিল।',
    summaryEn:
      'Humanity began with Adam and Hawwa (AS). Across 10 generations through Shayth (AS) up to Idris (AS), people lived by pure monotheism.',
    branchesBn: [
      'আদি পরিবার: কাবীল, হাবীল ও শীস (আ.)',
      '১০ প্রজন্ম: শীস → আনূশ → কাইনান → মাহলাঈল → আল-ইয়ারাদ → ইদরীস (আ.) → মাতূশালাখ → লামিক',
      'প্লাবন-পূর্ব জনপদে প্রথম শিরকের উদ্ভব (ওয়াদ্দ, সুওয়া‘, ইয়াগূস, ইয়া‘ঊক ও নাসর)',
    ],
    branchesEn: [
      'First family: Qabil, Habil & Prophet Shayth (AS)',
      '10 Pre-Flood generations leading to Idris (AS) and Lamick',
      'Later generations fell into idol veneration, prompting Nuh (AS)',
    ],
    scholarlyNoteBn:
      'ইবনে আব্বাস (রা.) বর্ণনা করেন, আদম (আ.) ও নূহ (আ.)-এর মধ্যবর্তী ১০ শতাব্দী মানুষ সত্য দ্বীনের ওপর ছিল (সহীহ বুখারী)।',
    scholarlyNoteEn:
      'Ibn Abbas (RA) narrated that for ten centuries between Adam and Nuh (AS), humanity followed pure monotheism.',
    referenceBn: 'সূরা আন-নিসা ৪:১ · সূরা নূহ ৭১:২৩ · সহীহ বুখারী',
    referenceEn: 'Surah An-Nisa 4:1 · Nuh 71:23 · Sahih al-Bukhari',
  },
  {
    id: 'era-2',
    order: 2,
    eraGroup: 'flood_reset',
    eraTagBn: 'যুগ ২ · মহাপ্লাবন ও ৮০ জন',
    eraTagEn: 'Era 2 · Great Flood & ~80 Survivors',
    titleBn: 'হযরত নূহ (আ.)-এর মহাপ্লাবন, কিস্তি ও ~৮০ মুমিন পরিবার',
    titleEn: 'Prophet Nuh (AS), The Ark & ~80 Saved Believers',
    titleAr: 'الطُّوفَانُ وَالسَّفِينَةُ وَذُرِّيَّةُ نُوحٍ',
    rootOrProphetBn: 'হযরত নূহ (আ.) — মানবজাতির দ্বিতীয় আদি পিতা',
    rootOrProphetEn: 'Prophet Nuh (AS) — Second Father of Mankind',
    howSplitBn: 'মহাপ্লাবনে কাফির সব গোষ্ঠী ধ্বংস হওয়ার পর জুদী পর্বতে কিস্তি থামে। ইবনে আব্বাস (রা.)-এর মতে ~৮০ মুমিন রক্ষা পান, তবে স্থায়ী বংশ চলে কেবল নূহ (আ.)-এর ৩ পুত্র (সাম, হাম, ইয়াফিস) থেকে।',
    howSplitEn: 'Disbelievers perished; ~80 believers landed near Mount Judi, and lasting lineage continued solely via Nuh’s 3 sons.',
    whereTodayBn: 'কিস্তি অবতরণের স্থান: জুদী পর্বত (দক্ষিণ-পূর্ব তুরস্ক / উত্তর ইরাকের কাছাকাছি "সুক সামানীন") → সেখান থেকে পৃথিবীর সর্বত্র বিস্তার।',
    whereTodayEn: 'Ark landed near Mount Judi (Upper Mesopotamia/SE Turkey), then dispersed worldwide.',
    summaryBn:
      'নূহ (আ.)-এর যুগে অবাধ্য ও অবিশ্বাসী সমগ্র জনপদ মহাপ্লাবনে ধ্বংস হয়ে যায়; তাঁর কিস্তিতে কেবল অল্পসংখ্যক মুমিন রক্ষা পান। প্রসিদ্ধ তাফসীরে বর্ণিত প্রায় ৮০ জন (৪০ পুরুষ ও ৪০ নারী/পরিবার) কিস্তিতে ছিলেন। তবে সূরা আস-সাফফাত (৩৭:৭৭) অনুযায়ী পরবর্তী পৃথিবীর সকল মানুষ কেবল নূহ (আ.)-এর বংশধর থেকেই বিস্তার লাভ করে।',
    summaryEn:
      'During the Great Flood, disbelievers perished and only Nuh (AS) and ~80 believers survived in the Ark, while the Quran confirms only Nuh’s posterity remained permanently.',
    branchesBn: [
      'অবিশ্বাসী অংশ (ইয়াম/কান‘আন ও কাফির গোষ্ঠী): মহাপ্লাবনে সম্পূর্ণ বিলুপ্ত',
      'কিস্তির যাত্রী (~৮০ জন মুমিন): ইবনে আব্বাস (রা.)-এর প্রসিদ্ধ বর্ণনা অনুযায়ী ~৮০ জন "সামানীন" গ্রামে বসবাস করেন',
      'স্থায়ী মানববংশ: সূরা সাফফাত (৩৭:৭৭) অনুযায়ী কেবল নূহ (আ.)-এর তিন পুত্র সাম, হাম ও ইয়াফিসের বংশধরই টিকে থাকে',
    ],
    branchesEn: [
      'Disbelievers (including Yam): completely perished in the Great Flood',
      'Ark survivors (~80 believers): classical Tafsir narration of ~80 souls',
      'Sole surviving lineage: Quran 37:77 confirms Nuh’s three sons became the root of all nations',
    ],
    scholarlyNoteBn:
      'তাফসীরে ইবনে কাসীর (হূদ ১১:৪০ ও সাফফাত ৩৭:৭৭) স্পষ্ট করেছেন: কিস্তিতে থাকা ~৮০ জনের মধ্যে নূহ (আ.)-এর পরিবার ছাড়া অন্যদের বংশ দীর্ঘস্থায়ী হয়নি; ফলে বর্তমান বিশ্বের সব মানুষ নূহ (আ.)-এর সন্তান।',
    scholarlyNoteEn:
      'Tafsir Ibn Kathir clarifies on 11:40 and 37:77 that among the ~80 believers on the Ark, only Nuh’s lineage left surviving generations.',
    referenceBn: 'সূরা হূদ ১১:৪০ · সূরা আস-সাফফাত ৩৭:৭৭ · তাফসীরে ইবনে কাসীর',
    referenceEn: 'Surah Hud 11:40 · As-Saffat 37:77 · Tafsir Ibn Kathir',
  },
  {
    id: 'era-3',
    order: 3,
    eraGroup: 'three_sons',
    eraTagBn: 'যুগ ৩ · ৩টি মূল বিশ্বশাখা',
    eraTagEn: 'Era 3 · Three Global Branches',
    titleBn: 'নূহ (আ.)-এর তিন পুত্র (সাম, হাম, ইয়াফিস) ও ব্যাবিলন-পরবর্তী জাতি বিভাজন',
    titleEn: 'Sam, Ham & Yafith — How Languages & Nations Dispersed',
    titleAr: 'أَبْنَاءُ نُوحٍ الثَّلَاثَة: سَامٌ وَحَامٌ وَيَافِثُ',
    rootOrProphetBn: 'সাম, হাম ও ইয়াফিস (মোট ১৬ জন প্রধান পৌত্র)',
    rootOrProphetEn: 'Sam, Ham & Yafith (16 Major Grandsons)',
    howSplitBn: 'ইরাকের বাবেল (ব্যাবিলন) অঞ্চলে মানুষের ভাষা বহুবিধ হয়ে গেলে (সূরা রূম ৩০:২২) তিন ভাইয়ের সন্তানেরা ৩ মহাদিকে ছড়িয়ে পড়েন: সাম মধ্যপ্রাচ্যে, হাম আফ্রিকায়, এবং ইয়াফিস উত্তর ইউরোপ ও এশিয়ায়।',
    howSplitEn: 'As languages diversified around Babylon/Mesopotamia, Sam’s sons stayed in the Near East, Ham’s moved southwest into Africa, and Yafith’s moved north/east into Europe and Asia.',
    whereTodayBn: 'সাম → মধ্যপ্রাচ্য ও আরব বিশ্ব · হাম → সমগ্র আফ্রিকা (৫৪ দেশ) · ইয়াফিস → ইউরোপ, তুরস্ক, ইরান, মধ্য-দক্ষিণ ও পূর্ব এশিয়া।',
    whereTodayEn: 'Sam → Middle East · Ham → Africa · Yafith → Europe & Wider Asia.',
    summaryBn:
      'প্লাবন-পরবর্তী পৃথিবীর মানুষ নূহ (আ.)-এর তিন পুত্রের ১৬ জন প্রধান সন্তানের মাধ্যমে সমগ্র বিশ্বে ভাগ হয়ে যায়। নিচের "কোন ব্যক্তি থেকে কোন জাতি ও বর্তমান বাসস্থান" সারণিতে প্রতিটি নাম বিস্তারিত দেওয়া হয়েছে।',
    summaryEn:
      'Humanity spread through three main branches and their 16 primary sons into every corner of the ancient world.',
    branchesBn: [
      '১. সাম ইবনে নূহ (৫ পুত্র: আরফাকশাদ, ইরাম, আশূর, ইলাম, লাউয): আরব (কাহতানী ও আদনানী), ইবরাহীমী বংশ, বনী ইসরাঈল, সিরীয় ও ইরাকী জাতি',
      '২. হাম ইবনে নূহ (৪ পুত্র: কুশ, মিসরাইম, ফূত, কান‘আন): মিসরীয়, হাবশী, নুবীয়, আমাজিগ/বার্বার ও সমগ্র আফ্রিকার জাতি',
      '৩. ইয়াফিস ইবনে নূহ (৭ পুত্র: গুমার, মাগূগ, মাদাই, ইয়াওয়ান, তূবাল, মেশেখ, তীরাস): ইউরোপীয়, গ্রীক-রোমান, ইরানী-কুর্দি, তুর্কি, স্লাভ ও পূর্ব-দক্ষিণ এশীয় জাতি',
    ],
    branchesEn: [
      '1. Sam (5 sons): Arabs, Israelites, Aramaeans, Assyrians & Elamites',
      '2. Ham (4 sons): Egyptians, Ethiopians, Nubians, Amazigh & wider Africans',
      '3. Yafith (7 sons): Europeans, Greco-Romans, Iranians, Turks, Slavs & East Asians',
    ],
    scholarlyNoteBn:
      'জামে তিরমিযী (৩৯৩১)-এ বর্ণিত: "সাম আরবের পিতা, ইয়াফিস রোমীয়দের পিতা এবং হাম হাবশীদের পিতা।"',
    scholarlyNoteEn:
      'Tirmidhi (3931): Sam is ancestor of the Arabs, Yafith of Romans/Eurasians, and Ham of Abyssinians/Africans.',
    referenceBn: 'জামে তিরমিযী ৩৯৩১ · সূরা আর-রূম ৩০:২২',
    referenceEn: 'Jami at-Tirmidhi 3931 · Surah Ar-Rum 30:22',
  },
  {
    id: 'era-4',
    order: 4,
    eraGroup: 'prophetic_ummahs',
    eraTagBn: 'যুগ ৪ · আর-রাহীকুল মাখতূম ও প্রাচীন আরব',
    eraTagEn: 'Era 4 · Ar-Raheeq & Abrahamic Era',
    titleBn: 'হূদ (আ.), ছালেহ (আ.), ইবরাহীম (আ.) ও আরব জাতির তিন ধারা',
    titleEn: 'Hud, Salih, Ibrahim (AS) & Three Divisions of Arabia',
    titleAr: 'عَصْرُ إِبْرَاهِيمَ وَالْعَرَبِ الثَّلَاثَةِ',
    rootOrProphetBn: 'ইবরাহীম (আ.) → ইসমাঈল (আ.), ইসহাক্ব (আ.) · কাহতান (আরিবা)',
    rootOrProphetEn: 'Ibrahim (AS) → Ismail, Ishaq · Qahtan (‘Aribah)',
    howSplitBn: 'আর-রাহীকুল মাখতূম অনুযায়ী: (১) আদ, সামূদ, তাসম, জাদীস ও আমালিকাহ "আরবে বায়দা" হিসেবে বিলুপ্ত হয়; (২) কাহতানী (আরিবা) আরব ইয়েমেন থেকে মা‘রিব বাঁধ ধ্বংসের পর আযদ, লাখম, তাই ও কিন্দায় ভাগ হয়; (৩) ইসমাঈল (আ.) ও জুরহুম থেকে আদনান → রাবী‘আহ ও মুদার → কুরাইশ বংশ গড়ে ওঠে।',
    howSplitEn: 'Per Ar-Raheeq al-Makhtum: (1) Al-Arab al-Ba’idah perished; (2) Qahtanites dispersed after Ma’rib Dam collapse; (3) Ismail (AS) & Jurhum formed Adnan → Rabiah, Mudhar & Quraysh.',
    whereTodayBn: 'মক্কা, মদীনা, তায়েফ, নজদ, ইয়েমেন, ওমান, বাহরাইন, ফিলিস্তিন, জর্ডান, সিরিয়া ও ইরাক।',
    whereTodayEn: 'Makkah, Madinah, Ta’if, Najd, Yemen, Oman, Bahrain, Levant & Iraq.',
    summaryBn:
      'আবুল আম্বিয়া ইবরাহীম (আ.)-এর মাধ্যমে তাওহীদ মধ্যপ্রাচ্য ও হেজাযে পুনঃপ্রতিষ্ঠিত হয়। পরবর্তীতে খুযা‘আহ নেতা আমর ইবনে লুহাইয়ের মাধ্যমে মূর্তিপূজার বিকৃতি ঘটলেও কুসাই ইবনে কিলাব কাবার সেবা ও কুরাইশের নেতৃত্ব সুসংগঠিত করেন।',
    summaryEn:
      'Ibrahim (AS) anchored monotheism in Makkah and Sham. Later, though ‘Amr ibn Luhayy introduced idols, Qusay ibn Kilab unified Quraysh around the Ka‘bah.',
    branchesBn: [
      'আরবে বায়দা (বিলুপ্ত): আদ, সামূদ, তাসম, জাদীস, আমালিকাহ, জুরহুম-১ ও উমাইম',
      'আরবে আরিবা (কাহতানী): হিমইয়ার ও কাহলান (মদীনার আউস-খাযরাজ, খুযা‘আহ, গাসসান, লাখম, তাই ও কিন্দাহ)',
      'আরবে মুসতা‘রিবা (আদনানী): ইসমাঈল → আদনান → রাবী‘আহ (বকর, তাগলিব, আব্দুল কায়েস) ও মুদার (হাওয়াযিন, সাক্বীফ, তামীম, হুযাইল, কিনানাহ → কুরাইশ)',
    ],
    branchesEn: [
      'Al-Arab al-Ba’idah: Ad, Thamud, Tasm, Jadis, Amaliqah & Jurhum I',
      'Al-Arab al-‘Aribah (Qahtan): Himyar & Kahlan (Ansar, Khuza‘ah, Ghassan, Lakhm, Tayy, Kindah)',
      'Al-Arab al-Musta‘ribah (Adnan): Rabiah (Bakr, Taghlib, Abdul Qays) & Mudhar (Hawazin, Thaqif, Tamim, Quraysh)',
    ],
    scholarlyNoteBn:
      'আর-রাহীকুল মাখতূম: "হিজায স্বাধীন ছিল—বাইজেন্টাইন বা পারস্য কোনো সম্রাটই মক্কা-মদীনাকে করদ রাজ্যে পরিণত করতে পারেনি; কুসাই ইবনে কিলাব কাবার হিজাবাহ, সিক্বায়াহ, রিফাদাহ, নদওয়া ও লিওয়া প্রতিষ্ঠা করেন।"',
    scholarlyNoteEn:
      'Ar-Raheeq al-Makhtum: Hijaz remained independent of Rome and Persia while Qusay ibn Kilab institutionalized Ka‘bah custodianship in Makkah.',
    referenceBn: 'সূরা আল-বাকারাহ ২:১২৪-১২৯ · আর-রাহীকুল মাখতূম',
    referenceEn: 'Surah Al-Baqarah 2:124-129 · Ar-Raheeq al-Makhtum',
  },
  {
    id: 'era-5',
    order: 5,
    eraGroup: 'prophetic_ummahs',
    eraTagBn: 'যুগ ৫ · তাওরাত ও ইনজীলের উম্মত',
    eraTagEn: 'Era 5 · Ummahs of Musa & Isa (AS)',
    titleBn: 'বনী ইসরাঈলের নবীগণ, মূসা (আ.) ও ঈসা (আ.)-এর উম্মত',
    titleEn: 'Musa (AS), Dawud-Sulayman (AS) & Isa (AS)',
    titleAr: 'أُمَّةُ مُوسَى وَعِيسَى عَلَيْهِمَا السَّلَام',
    rootOrProphetBn: 'মূসা, হারূন, দাঊদ, সুলায়মান, যাকারিয়া, ইয়াহইয়া ও ঈসা (আ.)',
    rootOrProphetEn: 'Musa, Dawud, Sulayman, Zakariyya & Isa (AS)',
    howSplitBn: 'ব্যাবিলন ও রোমান নির্বাসনের পর বনী ইসরাঈলের গোত্রগুলো শাম, ইরাক, পারস্য, মিসর ও হেজাযে (মদীনা-খায়বার) ছড়িয়ে পড়ে। ঈসা (আ.)-এর অনুসারীরা রোম, শাম, মিসর ও হাবশায় বিস্তার লাভ করেন।',
    howSplitEn: 'Following Babylonian & Roman dispersions, Israelites spread across Sham, Iraq, Egypt & Hijaz; followers of Isa spread across Rome, Syria, Egypt & Abyssinia.',
    whereTodayBn: 'ফিলিস্তিন, সিরিয়া, লেবানন, ইরাক, মিসর, ইথিওপিয়া ও ইউরোপ-বিশ্বব্যাপী।',
    whereTodayEn: 'Palestine, Levant, Egypt, Ethiopia & worldwide.',
    summaryBn:
      'শেষ নবী মুহাম্মাদ (ﷺ)-এর পূর্বে আসমানী কিতাবপ্রাপ্ত উম্মত ছিলেন মূসা (আ.) ও ঈসা (আ.)-এর সত্যিকারের অনুসারীরা। ঈসা (আ.)-এর পর প্রায় ৬০০ বছর পৃথিবীতে হানীফগণ (সালমান ফারসী রা., ওয়ারাকা ইবনে নওফেল প্রমুখ) শেষ নবীর অপেক্ষায় ছিলেন।',
    summaryEn:
      'Before Muhammad (SAW), sincere followers of Musa and Isa (AS) along with the truth-seeking Hunafa awaited the Final Messenger.',
    branchesBn: [
      'তাওরাত ও যাবূর যুগ: মূসা, দাঊদ ও সুলায়মান (আ.)-এর শাসন (বায়তুল মুকাদ্দাস)',
      'ইনজীলের যুগ: ঈসা (আ.) ও হাওয়ারীদের তাওহীদী দাওয়াত (শাম ও ভূমধ্যসাগর)',
      'ফাতরাত যুগ: ইবরাহীমী হানীফগণ ও শেষনবীর আগমনের অপেক্ষমাণ সমাজ',
    ],
    branchesEn: [
      'Tawrah & Zabur era centered in Al-Quds',
      'Injil era: Isa (AS) and his monotheistic disciples',
      'Period of Fatrah (~600 years before Muhammad SAW)',
    ],
    scholarlyNoteBn:
      'সহীহ বুখারী (৩৪৪২)-এ নবী করীম (ﷺ) বলেন: "আমার ও ঈসা (আ.)-এর মাঝে আর কোনো নবী নেই।"',
    scholarlyNoteEn:
      'Sahih al-Bukhari (3442): "There is no prophet between me and Isa (AS)."',
    referenceBn: 'সূরা আস-সাফ ৬১:৬ · সহীহ বুখারী ৩৪৪২',
    referenceEn: 'Surah As-Saff 61:6 · Sahih al-Bukhari 3442',
  },
  {
    id: 'era-6',
    order: 6,
    eraGroup: 'final_ummah',
    eraTagBn: 'যুগ ৬ · শেষ নবী ও তাঁর উম্মত',
    eraTagEn: 'Era 6 · Final Prophet & His Ummah',
    titleBn: 'শেষ নবী হযরত মুহাম্মাদ (ﷺ) ও উম্মতে মুহাম্মাদীর বিশ্ববিস্তার',
    titleEn: 'Last Prophet Muhammad (SAW) & Global Spread of His Ummah',
    titleAr: 'أُمَّةُ مُحَمَّدٍ ﷺ وَانْتِشَارُهَا',
    rootOrProphetBn: 'হযরত মুহাম্মাদ (ﷺ), সাহাবায়ে কিরাম (রা.) ও খোলাফায়ে রাশেদীন',
    rootOrProphetEn: 'Muhammad (SAW), Sahabah (RA) & Caliphs',
    howSplitBn: 'কোনো নতুন বংশ বা গোত্র নয়—বরং সাম (আরব/শাম), হাম (হাবশা/মিসর/বার্বার) ও ইয়াফিস (পারস্য/তুর্কি/ইউরোপ/বাংলা-ভারত/মালয়) সকল শাখার মানুষকে এক তাওহীদী উম্মাহতে যুক্ত করা হয়।',
    howSplitEn: 'Instead of splitting by tribe, the Final Ummah united descendants of Sam, Ham, and Yafith across continents through faith, trade, and migration.',
    whereTodayBn: 'মক্কা ও মদীনা থেকে ছড়িয়ে আজ সমগ্র এশিয়া, আফ্রিকা, ইউরোপ, আমেরিকা ও অস্ট্রেলিয়ায় (~২০০ কোটি মুসলিম)।',
    whereTodayEn: 'From Makkah & Madinah across all continents (~2 Billion Muslims worldwide today).',
    summaryBn:
      '৬১০ খ্রিষ্টাব্দে আল-কুরআন নাযিলের মাধ্যমে শুরু হয় মানবজাতির সর্বশেষ যুগ। শেষ নবী (ﷺ)-এর সাহাবীরা মক্কা-মদীনা থেকে শাম, মিসর, ইরাক, পারস্য, খোরাসান, হাবশা ও উত্তর আফ্রিকায় ইসলাম নিয়ে যান; আর বণিক ও সুফিরা বাংলা, চীন ও ইন্দোনেশিয়ায় পৌঁছান।',
    summaryEn:
      'Since 610 CE, the Final Ummah has bridged every descendant of Adam across Arabia, Africa, Eurasia, Bengal, Indonesia, and modern Western nations.',
    branchesBn: [
      '১ম শতাব্দী হিজরি: আরব, শাম, মিসর, ইরাক, পারস্য, সিন্ধু, উত্তর আফ্রিকা ও আন্দালুস (স্পেন)',
      'সিল্ক রোড ও মধ্য এশিয়া: বুখারা, সমরকন্দ, তুর্কি জাতি ও পূর্ব ইউরোপ',
      'ভারত মহাসাগর ও বাংলা: চট্টগ্রাম/মালয়/ইন্দোনেশিয়া/চীন এবং পূর্ব আফ্রিকার সোয়াহিলি উপকূল',
    ],
    branchesEn: [
      '1st Century AH: Arabia, Levant, Egypt, Iraq, Persia, Sindh, Maghreb & Andalusia',
      'Silk Road: Central Asia, Turkic peoples & Eastern Europe',
      'Indian Ocean: Bengal, Malabar, China, Indonesia & East African Swahili coast',
    ],
    scholarlyNoteBn:
      'সহীহ মুসলিম: পূর্ববর্তী নবীরা কেবল নিজ কওমের কাছে আসতেন, কিন্তু শেষ নবী (ﷺ) প্রেরিত হয়েছেন সমগ্র মানবজাতির জন্য।',
    scholarlyNoteEn:
      'Sahih Muslim: Muhammad (SAW) was sent universally to all of mankind.',
    referenceBn: 'সূরা আল-আহযাব ৩৩:৪০ · সূরা সাবা ৩৪:২৮',
    referenceEn: 'Surah Al-Ahzab 33:40 · Saba 34:28',
  },
  {
    id: 'era-7',
    order: 7,
    eraGroup: 'modern_world',
    eraTagBn: 'যুগ ৭ · আজকের পৃথিবীর সব মানুষ',
    eraTagEn: 'Era 7 · All Humanity Today',
    titleBn: 'আজকের পৃথিবীর ৮০০+ কোটি মানুষ — মহাদেশভিত্তিক বর্তমান অবস্থান',
    titleEn: 'Today’s 8+ Billion Humans — Global Map of Every Branch',
    titleAr: 'شُعُوبُ الْعَالَمِ الْيَوْمَ فِي الْقَارَّاتِ السَّبْعِ',
    rootOrProphetBn: 'আদম (আ.) → নূহ (আ.) → সাম·হাম·ইয়াফিস → শেষ নবীর উম্মত ও ১৯৫+ দেশ',
    rootOrProphetEn: 'Adam → Nuh → Sam·Ham·Yafith → Today’s 195+ Countries',
    howSplitBn: 'সহস্র বছরের অভিবাসন, নদী-তীরবর্তী সভ্যতা, সমুদ্রপথ ও আধুনিক রাষ্ট্রব্যবস্থার ফলে মানবজাতি আজ ৬টি প্রধান জনবসতি অঞ্চল ও ১৯৫+ রাষ্ট্রে বিভক্ত হয়ে বসবাস করছে।',
    howSplitEn: 'Millennia of migrations and modern nations arranged humanity across 195+ countries in every continent.',
    whereTodayBn: 'এশিয়া (~৪৭০ কোটি) · আফ্রিকা (~১৫০ কোটি) · ইউরোপ (~৭৫ কোটি) · উত্তর ও দক্ষিণ আমেরিকা (~১০৫ কোটি) · ওশেনিয়া (~৪.৫ কোটি)।',
    whereTodayEn: 'Asia (~4.7B) · Africa (~1.5B) · Europe (~750M) · Americas (~1.05B) · Oceania (~45M).',
    summaryBn:
      'ধর্ম-বর্ণ-ভাষা ভিন্ন হলেও আজকের পৃথিবীর সমগ্র মানুষ সেই আদম (আ.) ও নূহ (আ.)-এর কিস্তি থেকে বিস্তার পাওয়া একই মানবপরিবারের সন্তান।',
    summaryEn:
      'Today’s 8+ billion people across every continent remain one united human family descending from Adam and Nuh (AS).',
    branchesBn: [
      'আরব বিশ্ব ও মধ্যপ্রাচ্য (~৪৭ কোটি): সৌদি আরব, ইয়েমেন, ইরাক, সিরিয়া, জর্ডান, ফিলিস্তিন, মিসর (সামি ও মিসরাইম ধারা)',
      'সমগ্র আফ্রিকা (~১৫০ কোটি — ৫৪ দেশ): মিসর, সুদান, ইথিওপিয়া, মরক্কো, আলজেরিয়া, নাইজেরিয়া, মালি, সেনেগাল, দ. আফ্রিকা (হামিটিক ধারা)',
      'দক্ষিণ এশিয়া (~২০০ কোটি): বাংলাদেশ, ভারত, পাকিস্তান, আফগানিস্তান, নেপাল, শ্রীলঙ্কা (সমন্বিত এশীয়-মাদাই-মুসলিম জনপদ)',
      'পূর্ব ও দক্ষিণ-পূর্ব এশিয়া (~২৩০ কোটি): ইন্দোনেশিয়া, মালয়েশিয়া, চীন, জাপান, কোরিয়া (ইয়াফিসের পূর্ব ধারা ও বৃহত্তম মুসলিম দেশ ইন্দোনেশিয়া)',
      'ইউরোপ, তুরস্ক ও মধ্য এশিয়া (~৯৮ কোটি): তুরস্ক, ইরান, উজবেকিস্তান, কাজাখস্তান, যুক্তরাজ্য, জার্মানি, ফ্রান্স, ইতালি, গ্রীস, রাশিয়া',
      'আমেরিকা ও ওশেনিয়া (~১১০ কোটি): যুক্তরাষ্ট্র, কানাডা, ব্রাজিল, মেক্সিকো, অস্ট্রেলিয়া, নিউজিল্যান্ড (আদিবাসী + বিশ্বব্যাপী অভিবাসন)',
    ],
    branchesEn: [
      'Middle East & North Africa (~470M+): Saudi Arabia, Yemen, Iraq, Syria, Palestine, Egypt',
      'Sub-Saharan & Wider Africa (~1.5B across 54 countries): Ethiopia, Sudan, Nigeria, Morocco, Senegal, South Africa',
      'South Asia (~2.0B): Bangladesh, India, Pakistan, Afghanistan, Nepal, Sri Lanka',
      'East & SE Asia (~2.3B): Indonesia (largest Muslim nation), Malaysia, China, Japan, Korea',
      'Europe, Turkey & Central Asia (~980M): Turkey, Iran, Uzbekistan, UK, Germany, France, Italy, Russia',
      'Americas & Oceania (~1.1B): USA, Canada, Brazil, Mexico, Australia & New Zealand',
    ],
    scholarlyNoteBn:
      'বিদায় হজ্জের ভাষণে রাসূলুল্লাহ (ﷺ) ঘোষণা করেন: তোমাদের সকলের রব এক এবং তোমাদের সকলের পিতা (আদম আ.) এক।',
    scholarlyNoteEn:
      'In his Farewell Sermon, Prophet Muhammad (SAW) affirmed: Your Lord is One, and your father Adam is one.',
    referenceBn: 'সূরা আল-হুজুরাত ৪৯:১৩ · মুসনাদে আহমাদ ২৩৪৮৯',
    referenceEn: 'Surah Al-Hujurat 49:13 · Musnad Ahmad 23489',
  },
];

// ============================================================================
// AR-RAHEEQ AL-MAKHTUM (আর-রাহীকুল মাখতূম) DEDICATED HISTORICAL LINEAGE & CONTEXT
// ============================================================================

export const AR_RAHEEQ_GENEALOGY_TRACKS: ArRaheeqGenealogyTrack[] = [
  {
    id: 'track-qahtan',
    trackType: 'qahtan',
    titleBn: 'কাহতানী (আরবে আরিবা) মূল ধারা: ইয়েমেন থেকে আরব জুড়ে বিস্তার',
    titleEn: 'Qahtani (‘Aribah) Line: From Yemen Across Arabia',
    titleAr: 'سِلْسِلَةُ الْعَرَبِ الْعَارِبَةِ (قَحْطَانُ)',
    subtitleBn: 'আর-রাহীকুল মাখতূম অনুযায়ী মা‘রিব বাঁধের বিপর্যয়ের পর দক্ষিণ আরব থেকে উত্তর-পূর্ব ও হেজাযে ছড়িয়ে পড়া ধারা',
    subtitleEn: 'Southern Arab dispersion from Yemen across Hijaz, Sham & Iraq after Ma’rib Dam collapse',
    steps: [
      {
        nameBn: 'সাম → আবির → কাহতান',
        nameEn: 'Sam → Abir → Qahtan',
        nameAr: 'قَحْطَانُ بْنُ عَابِرٍ',
        noteBn: 'দক্ষিণ আরবের ইয়েমেন অঞ্চলে খাঁটি আরবে আরিবা জাতির আদি পিতা।',
        noteEn: 'Patriarch of pure Southern Arabs settled in Yemen.',
      },
      {
        nameBn: 'ইয়া‘রুব → ইয়াশজুব → সাবা',
        nameEn: 'Ya‘rub → Yashjub → Saba',
        nameAr: 'يَعْرُبُ ← يَشْجُبُ ← سَبَأٌ',
        noteBn: 'সাবার নামানুসারে ঐতিহাসিক সাবা সভ্যতা ও মা‘রিব বাঁধ গড়ে ওঠে।',
        noteEn: 'Saba gave name to the Sabaean realm & Ma’rib civilization.',
      },
      {
        nameBn: 'হিমইয়ার ও কাহলান',
        nameEn: 'Himyar & Kahlan',
        nameAr: 'حِمْيَرُ وَكَهْلَانُ',
        noteBn: 'হিমইয়ার ইয়েমেনে থাকে (তুব্বা, কুদা‘আহ); কাহলান মা‘রিব বাঁধ ভাঙার পর দেশান্তর হয়।',
        noteEn: 'Himyar ruled Yemen; Kahlan migrated after Ma’rib Dam broke.',
      },
      {
        nameBn: 'আযদ · লাখম · তাই · কিন্দাহ',
        nameEn: 'Azd · Lakhm · Tayy · Kindah',
        nameAr: 'الْأَزْدُ · لَخْمٌ · طَيِّئٌ · كِنْدَةُ',
        noteBn: 'আযদ → আউস-খাযরাজ (মদীনা), খুযা‘আহ (মক্কা), গাসসান (শাম), ওমান; লাখম → হীরাহ (ইরাক); তাই → নজদ।',
        noteEn: 'Azd formed Ansar, Khuza‘ah & Ghassan; Lakhm formed Al-Hirah; Tayy & Kindah settled Najd.',
      },
    ],
  },
  {
    id: 'track-adnan',
    trackType: 'adnan',
    titleBn: 'আদনানী (আরবে মুসতা‘রিবা) মূল ধারা: ইসমাঈল (আ.) থেকে শেষ নবী (ﷺ)',
    titleEn: 'Adnani (Musta‘ribah) Line: From Ismail (AS) to Prophet Muhammad (SAW)',
    titleAr: 'سِلْسِلَةُ الْعَرَبِ الْمُسْتَعْرِبَةِ (إِسْمَاعِيلُ ← عَدْنَانُ ← مُحَمَّدٌ ﷺ)',
    subtitleBn: 'আর-রাহীকুল মাখতূম: আদনান পর্যন্ত প্রামাণ্য বংশপরম্পরা — কুরাইশের একত্রীকরণ ও পবিত্র রিসালাতের ধারা',
    subtitleEn: 'Verified Prophetic genealogy from Ibrahim & Ismail (AS) via Adnan and Quraysh',
    steps: [
      {
        nameBn: 'ইবরাহীম (আ.) → ইসমাঈল (আ.)',
        nameEn: 'Ibrahim → Ismail (AS)',
        nameAr: 'إِبْرَاهِيمُ ← إِسْمَاعِيلُ',
        noteBn: 'মক্কায় জুরহুম গোত্রের সাথে মিলন ও বিশুদ্ধ আরবি ভাষার সূচনা; ১২ পুত্র (নাবিত ও কায়দার প্রধান)।',
        noteEn: 'Settled Makkah alongside Jurhum; 12 sons led by Nabit and Qaydar.',
      },
      {
        nameBn: 'আদনান → মা‘আদ → নিযার',
        nameEn: 'Adnan → Ma‘add → Nizar',
        nameAr: 'عَدْنَانُ ← مَعَدٌّ ← نِزَارٌ',
        noteBn: 'নবী করীম (ﷺ) আদনান পর্যন্ত বংশলতিকা বিশুদ্ধ বলে ঘোষণা করতেন এবং এর ওপরে যেতেন না।',
        noteEn: 'Prophet (SAW) stopped reciting genealogy at Adnan as the undisputed anchor.',
      },
      {
        nameBn: 'রাবী‘আহ ও মুদার',
        nameEn: 'Rabiah & Mudhar',
        nameAr: 'رَبِيعَةُ وَمُضَرُ',
        noteBn: 'রাবী‘আহ → আব্দুল কায়েস, বকর, তাগলিব, হানীফাহ; মুদার → কায়েস আয়লান (হাওয়াযিন, সাক্বীফ) ও ইলইয়াস (তামীম, হুযাইল, কিনানাহ)।',
        noteEn: 'Rabiah (Abdul Qays, Bakr, Taghlib) & Mudhar (Qays ‘Aylan: Hawazin, Thaqif; Ilyas: Tamim, Kinanah).',
      },
      {
        nameBn: 'ফিহর (কুরাইশ) → কুসাই → হাশেম → মুহাম্মাদ (ﷺ)',
        nameEn: 'Fihr (Quraysh) → Qusay → Hashim → Muhammad (SAW)',
        nameAr: 'فِهْرٌ (قُرَيْشٌ) ← قُصَيٌّ ← هَاشِمٌ ← مُحَمَّدٌ ﷺ',
        noteBn: 'কুসাই ইবনে কিলাব কুরাইশকে মক্কায় ঐক্যবদ্ধ করেন → আব্দ মানাফ → হাশেম → আব্দুল মুত্তালিব → আব্দুল্লাহ → মুহাম্মাদ (ﷺ)।',
        noteEn: 'Qusay united Quraysh in Makkah → Abd Manaf → Hashim → Abd al-Muttalib → Abdullah → Muhammad (SAW).',
      },
    ],
  },
];

export const AR_RAHEEQ_HISTORY_SECTIONS: ArRaheeqChapterSection[] = [
  {
    id: 'raheeq-1-baidah',
    order: 1,
    category: 'baidah',
    chapterTagBn: 'আর-রাহীকুল মাখতূম · ধারা ১',
    chapterTagEn: 'Ar-Raheeq · Arab Category 1',
    titleBn: 'আরবে বায়দা (العرب البائدة) — বিলুপ্ত হয়ে যাওয়া আদি আরব জাতিসমূহ',
    titleEn: 'Al-Arab al-Ba’idah — Primordial & Extinct Arab Tribes',
    titleAr: 'الْعَرَبُ الْبَائِدَةُ: عَادٌ وَثَمُودُ وَطَسْمٌ وَجَدِيسُ',
    summaryBn:
      'আর-রাহীকুল মাখতূমের প্রারম্ভিক অধ্যায়ে আরব জাতিকে বংশগত দিক থেকে তিন ভাগে ভাগ করা হয়েছে। প্রথম ভাগ হলো "আরবে বায়দা"—অর্থাৎ সেসব প্রাচীন আরব জাতি, যাদের অস্তিত্ব ও নিদর্শন কালের প্রবাহে ও আল্লাহর আযাবে সম্পূর্ণ বিলুপ্ত হয়ে গেছে অথবা পরবর্তী গোত্রের মাঝে মিশে গেছে।',
    summaryEn:
      'The opening chapter of Ar-Raheeq al-Makhtum classifies Arabs into three historical branches. First are Al-Arab al-Ba’idah—ancient Arab tribes that vanished completely before the Islamic era.',
    howSplitBn: 'নূহ (আ.)-এর পুত্র সামের সন্তানেরা (বিশেষত ইরাম ও লাউযের ধারা) প্লাবন-পরবর্তী আরব উপদ্বীপের দক্ষিণ, উত্তর ও মধ্যভাগে প্রথম জনপদ গড়ে তোলে।',
    howSplitEn: 'Descendants of Sam ibn Nuh (notably via Eram and Lawidh) established the earliest Arabian settlements across southern, northern, and central deserts.',
    turningPointBn: 'অহংকার, মূর্তিপূজা ও নবীদের অবাধ্যতার কারণে আদ ও সামূদ ধ্বংস হয়; আর তাসম ও জাদীস অভ্যন্তরীণ রক্তক্ষয়ী যুদ্ধে নির্মূল হয়।',
    turningPointEn: '‘Ad and Thamud perished by divine punishment after rejecting Hud & Salih (AS), while Tasm and Jadis destroyed each other in civil war.',
    sourceChapterBn: 'আর-রাহীকুল মাখতূম · অধ্যায় ১: আরবদের বংশপরিচয় ও জাতিসমূহ',
    sourceChapterEn: 'Ar-Raheeq al-Makhtum · Chapter 1: Origin of the Arabs',
    subBranches: [
      {
        nameBn: 'আদ জাতি (হূদ আ.-এর কওম)',
        nameEn: 'Tribe of ‘Ad (Nation of Hud AS)',
        nameAr: 'قَوْمُ عَادٍ',
        lineageBn: 'সাম → ইরাম → আওস → আদ',
        lineageEn: 'Sam → Eram → Aws → ‘Ad',
        settlementBn: 'দক্ষিণ আরবের "আহকাফ" (ইয়েমেন ও ওমানের মধ্যবর্তী বিশাল বালুকাভূমি)',
        settlementEn: 'Al-Ahqaf (sandy dunes between Hadramaut/Yemen and Oman)',
        keyFactsBn: 'সুউচ্চ স্তম্ভবিশিষ্ট ইরাম নগরী নির্মাণ করেছিল; অবাধ্যতায় ৭ রাত ৮ দিন প্রবল ঝড়ে ধ্বংস হয়।',
        keyFactsEn: 'Built towering stone cities; perished in a furious 7-night storm for rejecting Hud (AS).',
      },
      {
        nameBn: 'সামূদ জাতি (ছালেহ আ.-এর কওম)',
        nameEn: 'Tribe of Thamud (Nation of Salih AS)',
        nameAr: 'قَوْمُ ثَمُودَ',
        lineageBn: 'সাম → ইরাম → গাসির → সামূদ',
        lineageEn: 'Sam → Eram → Gathir → Thamud',
        settlementBn: 'উত্তর-পশ্চিম সৌদি আরবের "আল-হিজর" (বর্তমান মাদায়েন ছালেহ, মদীনা-তাবুকের মাঝে)',
        settlementEn: 'Al-Hijr / Mada’in Salih (NW Saudi Arabia between Madinah and Tabuk)',
        keyFactsBn: 'পাহাড় কেটে বিশাল প্রাসাদ তৈরি করত; মুজিযা-স্বরূপ উটনীকে হত্যা করায় বজ্রনিনাদে ধ্বংস হয়।',
        keyFactsEn: 'Carved dwellings in sandstone cliffs; destroyed by a thunderous blast after slaughtering the she-camel.',
      },
      {
        nameBn: 'তাসম ও জাদীস',
        nameEn: 'Tasm & Jadis',
        nameAr: 'طَسْمٌ وَجَدِيسُ',
        lineageBn: 'সাম → লাউয → তাসম ও জাদীস',
        lineageEn: 'Sam → Lawidh → Tasm & Jadis',
        settlementBn: 'মধ্য আরবের "ইয়ামামা" (বর্তমান রিয়াদ ও আল-খারজ অঞ্চল, নজদ)',
        settlementEn: 'Al-Yamamah (Central Najd / modern Riyadh & Al-Kharj region)',
        keyFactsBn: 'তাসমের অত্যাচারী শাসকের বিরুদ্ধে জাদীসের বিদ্রোহ ও ইয়েমেনী হিমইয়ার রাজা হাসসান তুব্বার আক্রমণে উভয় গোত্র নিশ্চিহ্ন হয়।',
        keyFactsEn: 'Decimated through internal tyranny, revolt, and intervention by Himyarite king Hassan.',
      },
      {
        nameBn: 'আমালিকাহ, জুরহুম আল-ঊলা ও উমাইম',
        nameEn: 'Amaliqah, Early Jurhum & Umaym',
        nameAr: 'الْعَمَالِقَةُ وَجُرْهُمُ الْأُولَى وَأُمَيْمٌ',
        lineageBn: 'সাম → লাউয → ইমলীক / উমাইম (এবং ওয়াবার, আবীল)',
        lineageEn: 'Sam → Lawidh → Imliq / Umaym (plus Wabar & Abil)',
        settlementBn: 'হেজায, ফিলিস্তিন-শাম ও মিসর (আমালিকাহ); পূর্ব আরব ও ইয়েমেন',
        settlementEn: 'Hijaz, Palestine-Levant & Egypt (Amaliqah); Oman & Yemen',
        keyFactsBn: 'প্রাচীন জুরহুমের পরবর্তী এক অংশ মক্কায় ইসমাঈল (আ.)-এর সাথে আত্মীয়তায় আবদ্ধ হয়ে টিকে ছিল; বাকিরা বিলীন হয়ে যায়।',
        keyFactsEn: 'Later Jurhumites allied with Ismail (AS) in Makkah; the earlier branch vanished.',
      },
    ],
  },
  {
    id: 'raheeq-2-aribah',
    order: 2,
    category: 'aribah_qahtan',
    chapterTagBn: 'আর-রাহীকুল মাখতূম · ধারা ২',
    chapterTagEn: 'Ar-Raheeq · Arab Category 2',
    titleBn: 'আরবে আরিবা (العرب العاربة) — কাহতান, মা‘রিব বাঁধ ও কাহলানের দেশান্তর',
    titleEn: 'Al-Arab al-‘Aribah — Qahtan & Great Dispersal After Ma’rib Dam',
    titleAr: 'الْعَرَبُ الْعَارِبَةُ: قَحْطَانُ وَحِمْيَرُ وَكَهْلَانُ',
    summaryBn:
      'আরবে ‘আরিবা বা খাঁটি আরব বলতে ইয়াশজুব ইবনে ইয়া‘রুব ইবনে কাহতানের বংশধরদের বোঝায়। এদের আদি আবাস ছিল ইয়েমেন। কাহতানের প্রপৌত্র সাবার দুটি প্রধান শাখা—"হিমইয়ার" ও "কাহলান"—সমগ্র দক্ষিণ, মধ্য ও উত্তর আরবের ইতিহাস বদলে দেয়।',
    summaryEn:
      'Al-Arab al-‘Aribah (pure Arabs) descend from Qahtan in Yemen. Qahtan’s descendant Saba split into two massive branches—Himyar and Kahlan—whose migrations reshaped the entire peninsula.',
    howSplitBn: 'হিমইয়ার ইয়েমেনে থেকে যায় এবং শক্তিশালী রাজত্ব গড়ে তোলে (যায়দুল জুমহূর, কুদা‘আহ, সাকাসিক)। আর কাহলানের সন্তানেরা মা‘রিব বাঁধ ধসের (সাইলুল আরিম) আগে ও পরে ইয়েমেন ছেড়ে আরব-ইরাক-শামে ছড়িয়ে পড়ে।',
    howSplitEn: 'Himyar stayed in Yemen (Zayd al-Jumhur, Quda‘ah, Sakasik), while Kahlan migrated northward across Arabia before and after the collapse of the Great Ma’rib Dam.',
    turningPointBn: 'সাবা নগরীর মা‘রিব বাঁধ ভেঙে (সাইলুল আরিম) প্রলয়ংকরী বন্যা হলে কাহলান বংশের আযদ, লাখম, তাই ও কিন্দাহ চারদিকে ছড়িয়ে পড়ে—যা আজকের মদীনা, মক্কা, ওমান, সিরিয়া ও ইরাকের জনবিন্যাস তৈরি করে।',
    turningPointEn: 'The Great Flood of Ma’rib (Sayl al-‘Arim) drove Azd, Lakhm, Tayy, and Kindah outward—forming Madinah’s Ansar, Makkah’s Khuza‘ah, Oman, Sham’s Ghassanids & Iraq’s Lakhmids.',
    sourceChapterBn: 'আর-রাহীকুল মাখতূম · অধ্যায় ১: আরবে ‘আরিবা ও কাহতানীদের দেশান্তর',
    sourceChapterEn: 'Ar-Raheeq al-Makhtum · Chapter 1: Al-Arab al-‘Aribah & Migrations',
    subBranches: [
      {
        nameBn: 'আযদ (مদীনার আনসার, খুযা‘আহ, গাসসান, ওমান)',
        nameEn: 'Al-Azd (Ansar, Khuza‘ah, Ghassan & Oman)',
        nameAr: 'الْأَزْدُ (الْأَوْسُ وَالْخَزْرَجُ · خُزَاعَةُ · غَسَّانُ)',
        lineageBn: 'কাহলান → নাছর/মাযিন → আযদ (নেতৃত্ব: ইমরান ইবনে আমর মুযাইক্বিয়া)',
        lineageEn: 'Kahlan → Azd (led north by ‘Imran ibn ‘Amr Muzayqiya)',
        settlementBn: 'মদীনা (আউস ও খাযরাজ), মক্কা-মাররুয যাহরান (খুযা‘আহ), শাম/সিরিয়া (গাসসান), আসির-তিহামা (শানূ‘আহ) ও ওমান (আযদ ওমান)',
        settlementEn: 'Madinah (Aws & Khazraj), Makkah (Khuza‘ah), Syria/Jordan (Ghassan), Asir (Shanu’ah) & Oman',
        keyFactsBn: 'রাসূলুল্লাহ (ﷺ)-কে মদীনায় আশ্রয়দাতা "আনসার" সাহাবীরা (আউস ও খাযরাজ) ছিলেন এই কাহতানী-আযদ বংশের এবং শামের গাসসানী রাজারাও এ শাখার।',
        keyFactsEn: 'Madinah’s Ansar (Aws & Khazraj), Makkah’s Khuza‘ah custodians, and Syria’s Ghassanids all branched from Azd.',
      },
      {
        nameBn: 'লাখম ও জুযাম (ইরাকের হীরাহ রাজ্য)',
        nameEn: 'Lakhm & Judham (Kingdom of Al-Hirah)',
        nameAr: 'لَخْمٌ وَجُذَامُ (آلُ الْمُنْذِرِ بِالْحِيرَةِ)',
        lineageBn: 'সাবা → কাহলান → উদাদ → লাখম ও জুযাম',
        lineageEn: 'Saba → Kahlan → Udad → Lakhm & Judham',
        settlementBn: 'দক্ষিণ ইরাকের ফোরাত তীরে "আল-হীরাহ" ও আনবার অঞ্চল (জুযাম উত্তর-পশ্চিম আরবে)',
        settlementEn: 'Al-Hirah along the Euphrates in Iraq (and Judham in NW Arabia)',
        keyFactsBn: 'লাখম গোত্রের "নাসর ইবনে রাবী‘আহ"-র বংশ থেকেই হীরাহ-র বিখ্যাত মুনযিরী রাজবংশের (নু‘মান ইবনুল মুনযির) জন্ম হয়।',
        keyFactsEn: 'Progenitors of the Lakhmid Dynasty (House of Munzir) ruling Al-Hirah under Sassanid Persia.',
      },
      {
        nameBn: 'বনু তাই (حاتم الطائي-এর গোত্র)',
        nameEn: 'Banu Tayy',
        nameAr: 'بَنُو طَيِّئٍ',
        lineageBn: 'সাবা → কাহলান → উদাদ → তাই',
        lineageEn: 'Saba → Kahlan → Udad → Tayy',
        settlementBn: 'উত্তর নজদের "আজা ও সালমা" (জাবাল শাম্মার / হাইল অঞ্চল) এবং তাইমা-কুফার মধ্যবর্তী অঞ্চল',
        settlementEn: 'Jabal Aja & Salma (Ha’il region, North Najd) between Banu Asad and Tayma',
        keyFactsBn: 'দানশীলতায় প্রসিদ্ধ হাতেম তাই ও সাহাবী আদী ইবনে হাতেম (রা.) এই গোত্রের; আজকের হাইল-শাম্মার অঞ্চলে বসতি রয়েছে।',
        keyFactsEn: 'Renowned tribe of Hatim al-Ta’i and Companion ‘Adi ibn Hatim (RA); today centered in Ha’il.',
      },
      {
        nameBn: 'কিন্দাহ, হিমইয়ার, হামদান ও মাযহিজ',
        nameEn: 'Kindah, Himyar, Hamdan & Madhhij',
        nameAr: 'كِنْدَةُ وَحِمْيَرُ وَهَمْدَانُ وَمَذْحِجُ',
        lineageBn: 'কাহতান → সাবা → হিমইয়ার ও কাহলান (কিন্দাহ, হামদান, মাযহিজ)',
        lineageEn: 'Qahtan → Saba → Himyar & Kahlan (Kindah, Hamdan, Madhhij)',
        settlementBn: 'বাহরাইন → হাদরামাউত → মধ্য নজদ (কিন্দাহ); ইয়েমেন ও দক্ষিণ আরব (হামদান ও হিমইয়ার)',
        settlementEn: 'Bahrain → Hadramaut → Central Najd (Kindah); Yemen highlands (Hamdan, Himyar)',
        keyFactsBn: 'কিন্দাহ গোত্র বাহরাইন থেকে হাদরামাউত হয়ে নজদে শক্তিশালী কিন্দাহ রাজত্ব প্রতিষ্ঠা করে; হিমইয়ার ইয়েমেনে "তুব্বা" সাম্রাজ্য গড়ে।',
        keyFactsEn: 'Kindah built a major central Arabian kingdom before returning to Hadramaut; Himyar ruled Yemen.',
      },
    ],
  },
  {
    id: 'raheeq-3-mustaribah',
    order: 3,
    category: 'mustaribah_adnan',
    chapterTagBn: 'আর-রাহীকুল মাখতূম · ধারা ৩',
    chapterTagEn: 'Ar-Raheeq · Arab Category 3',
    titleBn: 'আরবে মুসতা‘রিবা (العرب المستعربة) — ইসমাঈল (আ.), আদনান ও কুরাইশ',
    titleEn: 'Al-Arab al-Musta‘ribah — Ismail (AS), Adnan, Rabiah, Mudhar & Quraysh',
    titleAr: 'الْعَرَبُ الْمُسْتَعْرِبَةُ: عَدْنَانُ ← مُضَرُ وَرَبِيعَةُ ← قُرَيْشٌ',
    summaryBn:
      'ইবরাহীম (আ.) আল্লাহর নির্দেশে মা হাজেরা ও শিশু ইসমাঈল (আ.)-কে জনমানবহীন মক্কায় রেখে আসেন। যমযম কূপের আশেপাশে ইয়েমেনী জুরহুম গোত্র বসতি স্থাপন করলে ইসমাঈল (আ.) তাদের কাছে আরবি ভাষা শেখেন ও বিবাহ করেন। তাঁর বংশেই আদনান ও শেষ নবী মুহাম্মাদ (ﷺ)-এর জন্ম হয়।',
    summaryEn:
      'Ibrahim (AS) settled Hajar and Ismail (AS) by Zamzam in Makkah, where Yemen’s Jurhum tribe arrived. Ismail learned Arabic from them; through his son Qaydar/Nabit came Adnan, leading to Quraysh and Prophet Muhammad (SAW).',
    howSplitBn: 'আদনানের নাতি নিযার ইবনে মা‘আদ থেকে চার পুত্র (রাবী‘আহ, মুদার, আনমার ও ইয়াদ) জন্ম নেয়। তবে মূল আরব জনসংখ্যা রাবী‘আহ ও মুদার এই দুই মহাশাখায় বিভক্ত হয়ে মধ্য, পশ্চিম ও পূর্ব আরবে ছড়িয়ে পড়ে।',
    howSplitEn: 'Nizar ibn Ma‘add divided primarily into two colossal confederations: Rabiah (eastern & northern Arabia) and Mudhar (split into Qays ‘Aylan and Ilyas → Quraysh).',
    turningPointBn: 'মক্কার আশেপাশে বিচ্ছিন্ন থাকা কিনানাহ-কুরাইশ গোত্রগুলোকে কুসাই ইবনে কিলাব একত্রিত করে মক্কা ও কাবা শরীফের একচ্ছত্র নেতৃত্ব প্রতিষ্ঠা করেন।',
    turningPointEn: 'Qusay ibn Kilab united scattered Quraysh clans into Makkah, organizing civic governance and Ka‘bah administration.',
    sourceChapterBn: 'আর-রাহীকুল মাখতূম · অধ্যায় ১: ইবরাহীম ও ইসমাঈল (আ.)-এর বংশধর ও আদনানী শাখা',
    sourceChapterEn: 'Ar-Raheeq al-Makhtum · Chapter 1: Descendants of Ismail & Adnanite Tribes',
    subBranches: [
      {
        nameBn: 'রাবী‘আহ ইবনে নিযার (আব্দুল কায়েস, বকর, তাগলিব, হানীফাহ)',
        nameEn: 'Rabiah ibn Nizar (Abdul Qays, Bakr, Taghlib, Hanifah)',
        nameAr: 'رَبِيعَةُ: عَبْدُ الْقَيْسِ · بَكْرٌ · تَغْلِبُ · بَنُو حَنِيفَةَ',
        lineageBn: 'আদনান → মা‘আদ → নিযার → রাবী‘আহ → আসাদ, ওয়াইল, আব্দুল কায়েস',
        lineageEn: 'Adnan → Ma‘add → Nizar → Rabiah → Asad, Wa’il, Abdul Qays',
        settlementBn: 'বাহরাইন ও পূর্ব আরব (আব্দুল কায়েস), ইয়ামামা/রিয়াদ (বনু হানীফাহ) এবং ফোরাত তীর ও জাযীরাহ (বকর ও তাগলিব)',
        settlementEn: 'Bahrain & Al-Ahsa (Abdul Qays), Yamamah (Hanifah), Euphrates/Jazirah (Bakr & Taghlib)',
        keyFactsBn: 'মদীনার মসজিদে নববীর পর দ্বিতীয় জুমা অনুষ্ঠিত হয়েছিল বাহরাইনের জাওয়াছায় আব্দুল কায়েস গোত্রে; ওয়াইলের বকর-তাগলিবের মধ্যে ৪০ বছরের বাসূস যুদ্ধ হয়।',
        keyFactsEn: 'Abdul Qays held Islam’s second Friday prayer in Bahrain; Bakr & Taghlib fought the famous 40-year Basus War.',
      },
      {
        nameBn: 'মুদার — ১ম ধারা: কায়েস আয়লান (হাওয়াযিন, সাক্বীফ, গাতাফান)',
        nameEn: 'Mudhar Branch 1: Qays ‘Aylan (Hawazin, Thaqif, Ghatafan)',
        nameAr: 'قَيْسُ عَيْلَانَ: هَوَازِنُ · ثَقِيفٌ · غَطَفَانُ · سُلَيْمٌ',
        lineageBn: 'আদনান → নিযার → মুদার → কায়েস আয়লান → খাসাফাহ, সা‘দ (হাওয়াযিন/সাক্বীফ, গাতাফান, সুলাইম)',
        lineageEn: 'Adnan → Nizar → Mudhar → Qays ‘Aylan',
        settlementBn: 'মক্কার পূর্বে আওতাস-হুনাইন (হাওয়াযিন), উর্বর তায়েফ নগরী (সাক্বীফ), নজদ-খায়বার সংলগ্ন অঞ্চল (গাতাফান ও সুলাইম)',
        settlementEn: 'Awtas/Hunayn east of Makkah (Hawazin), Ta’if (Thaqif), Najd (Ghatafan & Sulaym)',
        keyFactsBn: 'সাক্বীফ তায়েফের প্রাচীরঘেরা নগরী ও আল-লাত মূর্তির কেন্দ্র গড়ে তোলে; গাতাফান আবস, যুবইয়ান ও ফাযারাহ শাখায় বিভক্ত ছিল (দাহিস-গাবরা যুদ্ধ)।',
        keyFactsEn: 'Thaqif fortified Ta’if; Ghatafan split into ‘Abs and Dhubyan (famous for the Dahiis-Ghabra war).',
      },
      {
        nameBn: 'মুদার — ২য় ধারা: ইলইয়াস (তামীম, হুযাইল, আসাদ, কিনানাহ)',
        nameEn: 'Mudhar Branch 2: Ilyas ibn Mudhar (Tamim, Hudhayl, Kinanah)',
        nameAr: 'إِلْيَاسُ بْنُ مُضَرَ: تَمِيمٌ · هُذَيْلٌ · أَسَدٌ · كِنَانَةُ',
        lineageBn: 'মুদার → ইলইয়াস → তাবিকাহ (তামীম), মুদরিকাহ (হুযাইল, খুজাইমাহ → আসাদ ও কিনানাহ)',
        lineageEn: 'Mudhar → Ilyas → Tamim, Hudhayl, Asad & Kinanah',
        settlementBn: 'নজদ থেকে বসরা মরুভূমি (বনু তামীম), মক্কার নিকটবর্তী পর্বত-উপত্যকা (হুযাইল), হেজায উপকূল (কিনানাহ)',
        settlementEn: 'Najd to Basra (Tamim), mountains near Makkah (Hudhayl), Hijaz coast (Kinanah)',
        keyFactsBn: 'কুরআনের প্রখ্যাত ক্বারী ও সাহাবী আব্দুল্লাহ ইবনে মাসউদ (রা.) ছিলেন হুযাইল গোত্রের; আর ফিহরের মাধ্যমে কিনানাহ থেকেই কুরাইশের জন্ম।',
        keyFactsEn: 'Sahabi Abdullah ibn Mas‘ud (RA) hailed from Hudhayl; Kinanah directly fathered Fihr (Quraysh).',
      },
      {
        nameBn: 'কুরাইশ বংশ ও তার ১০টি প্রধান গোত্র',
        nameEn: 'Quraysh & Its Leading Clans',
        nameAr: 'قُرَيْشٌ: بَنُو هَاشِمٍ · بَنُو أُمَيَّةَ · بَنُو تَيْمٍ · بَنُو عَدِيٍّ',
        lineageBn: 'কিনানাহ → আন-নদর → মালিক → ফিহর (কুরাইশ) → গালিব → লুআই → কা‘ব → মুররাহ → কিলাব → কুসাই',
        lineageEn: 'Kinanah → Al-Nadr → Malik → Fihr (Quraysh) → Kilab → Qusay → Abd Manaf → Hashim',
        settlementBn: 'মক্কা নগরী (কাবা শরীফের কেন্দ্র: বাতহা ও জাওয়াহির অঞ্চল)',
        settlementEn: 'City of Makkah (central Bat’ha & surrounding quarters)',
        keyFactsBn: 'কুসাই ইবনে কিলাব কুরাইশকে একত্র করেন; প্রধান গোত্র: বনু হাশেম, বনু মুত্তালিব, বনু আব্দ শামস (উমাইয়া), বনু নাওফাল, আসাদ, তাইম (আবু বকর রা.), আদী (উমর রা.), মাখযূম, জুমাহ ও সাহম।',
        keyFactsEn: 'Qusay’s descendants formed Banu Hashim, Abd Shams (Umayyah), Nawfal & Asad; earlier lineages formed Taym (Abu Bakr), Adi (Umar), Makhzum, etc.',
      },
    ],
  },
  {
    id: 'raheeq-4-governance',
    order: 4,
    category: 'governance_kabah',
    chapterTagBn: 'আর-রাহীকুল মাখতূম · ধারা ৪',
    chapterTagEn: 'Ar-Raheeq · Rule & Custodianship',
    titleBn: 'আরবের শাসনব্যবস্থা, সাম্রাজ্যের প্রভাব ও কাবা শরীফের নেতৃত্বের ইতিহাস',
    titleEn: 'Arabian Rulership, Foreign Powers & Custody of the Ka‘bah',
    titleAr: 'الْحُكْمُ وَالْإِمَارَةُ وَسِدَانَةُ الْكَعْبَةِ',
    summaryBn:
      'আর-রাহীকুল মাখতূমে ইসলাম-পূর্ব আরবের রাজনৈতিক চিত্র দুটি স্পষ্ট ভাগে দেখানো হয়েছে: (১) মুকুটধারী রাজা ও পরাশক্তির করদ রাজ্য (ইয়েমেন, হীরাহ ও গাসসান-শাম), এবং (২) বিদেশি শাসনমুক্ত স্বাধীন গোত্রীয় হেজায ও মক্কা।',
    summaryEn:
      'Ar-Raheeq al-Makhtum divides pre-Islamic Arabia politically into two zones: (1) Crowned monarchies entangled with Persia/Byzantium (Yemen, Al-Hirah, Sham), and (2) Independent tribal Hijaz & Makkah.',
    howSplitBn: 'কাবার তত্ত্বাবধান ধারাবাহিকভাবে ৫টি হাতে বদলায়: ইসমাঈল (আ.) → পুত্র নাবিত → শ্বশুরগোষ্ঠী জুরহুম → কাহতানী খুযা‘আহ (হারিসা ইবনে আমর) → কুসাই ইবনে কিলাব (কুরাইশ)।',
    howSplitEn: 'Custodianship of the Ka‘bah passed across five eras: Ismail (AS) → Nabit → Jurhum → Khuza‘ah → Qusay ibn Kilab (Quraysh).',
    turningPointBn: 'ইয়েমেনের খ্রিষ্টান গভর্নর আবরাহা ৫৭০/৫৭১ খ্রিষ্টাব্দে হস্তীবাহিনী নিয়ে কাবা ধ্বংস করতে এলে আল্লাহ আবাবীল পাখির মাধ্যমে মক্কা রক্ষা করেন—সেই বছরই রাসূলুল্লাহ (ﷺ)-এর জন্ম হয়।',
    turningPointEn: 'Abraha’s Elephant expedition (570–571 CE) to destroy the Ka‘bah was miraculously annihilated in the very year Prophet Muhammad (SAW) was born.',
    sourceChapterBn: 'আর-রাহীকুল মাখতূম · অধ্যায় ২: আরবে শাসন ও নেতৃত্ব',
    sourceChapterEn: 'Ar-Raheeq al-Makhtum · Chapter 2: Rulership & Presidency among the Arabs',
    subBranches: [
      {
        nameBn: 'ইয়েমেনের রাজত্ব (সাবা, হিমইয়ার, হাবশা ও পারস্য)',
        nameEn: 'Kingdom of Yemen (Saba, Himyar, Abyssinia & Persia)',
        nameAr: 'مُلْكُ الْيَمَنِ وَسَيْفُ بْنُ ذِي يَزَنَ',
        lineageBn: 'সাবা → হিমইয়ারী "তুব্বা" রাজবংশ → যূ নুওয়াস → আবরাহা (হাবশা) → পারস্য গভর্নর (বাযান)',
        lineageEn: 'Sabaeans → Himyarite Tubba‘ → Dhu Nuwas → Abyssinian Abraha → Persian Governors',
        settlementBn: 'সমগ্র ইয়েমেন, সান‘আ, মা‘রিব ও দক্ষিণ আরব উপকূল',
        settlementEn: 'Yemen, San‘a, Ma’rib & Southern Coast',
        keyFactsBn: 'আসহাবুল উখদূদের ঘটনার পর হাবশা ইয়েমেন দখল করে (৭২ বছর); এরপর সাইফ ইবনে যী ইয়াযানের মাধ্যমে পারস্যের অধীনে যায় এবং শেষ গভর্নর বাযান ইসলাম গ্রহণ করেন।',
        keyFactsEn: 'After Dhu Nuwas persecuted Najran Christians, Abyssinia ruled Yemen for 72 years until Persia intervened; its last governor Badhan embraced Islam.',
      },
      {
        nameBn: 'হীরাহ-র মুনযিরী (লাখমী) ও শামের গাসসানী রাজ্য',
        nameEn: 'Lakhmids of Al-Hirah & Ghassanids of Sham',
        nameAr: 'مُلُوكُ الْحِيرَةِ وَآلُ غَسَّانَ',
        lineageBn: 'কাহলান → লাখম (পারস্য মিত্র) · কাহলান → আযদ → গাসসান (বাইজেন্টাইন মিত্র)',
        lineageEn: 'Kahlan → Lakhm (Persian ally) · Kahlan → Azd → Ghassan (Byzantine ally)',
        settlementBn: 'হীরাহ (ইরাক-কুফা অঞ্চল) ও শাম-বসরা-দামেস্ক-জর্ডান সীমান্ত',
        settlementEn: 'Al-Hirah (Iraq) & Bosra/Damascus/Jordan frontier (Sham)',
        keyFactsBn: 'সাসানী পারস্য হীরাহর লাখমী রাজাদের এবং রোম-বাইজেন্টাইন শামের গাসসানী রাজাদের সীমান্ত-প্রাচীর হিসেবে ব্যবহার করত।',
        keyFactsEn: 'Sassanids used Al-Hirah and Byzantines used Ghassanids as desert buffer kingdoms.',
      },
      {
        nameBn: 'স্বাধীন হেজায, ইয়াসরিব (মদীনা) ও কুসাইয়ের মক্কা',
        nameEn: 'Independent Hijaz, Yathrib & Qusay’s Makkah',
        nameAr: 'الْحِجَازُ الْحُرُّ وَمَكَّةُ (قُصَيُّ بْنُ كِلَابٍ)',
        lineageBn: 'কুরাইশ (কুসাই ইবনে কিলাব) · মদীনায় আউস-খাযরাজ ও বনু কুরাইযা-নাদীর-কাইনুকা',
        lineageEn: 'Quraysh in Makkah · Aws-Khazraj & 3 Jewish tribes in Yathrib',
        settlementBn: 'মক্কা, মদীনা, তায়েফ ও পশ্চিম হেজায উপত্যকা',
        settlementEn: 'Makkah, Madinah (Yathrib) & Ta’if',
        keyFactsBn: 'হেজায কখনো কোনো সম্রাটকে কর দেয়নি। খুযা‘আহকে সরিয়ে কুসাই মক্কায় শাসন কায়েম করেন ও হিজাবাহ, সিক্বায়াহ, রিফাদাহ, নদওয়া এবং লিওয়া পদ প্রবর্তন করেন।',
        keyFactsEn: 'Qusay took Ka‘bah authority from Khuza‘ah and founded Dar an-Nadwah (council), Hijabah, Siqayah, Rifadah & Liwa.',
      },
      {
        nameBn: 'জাহেলী আরবের ৫টি কাবা-দায়িত্ব ও ওকায মেলা',
        nameEn: '5 Ka‘bah Offices & Cultural Markets (Ukaz)',
        nameAr: 'الْحِجَابَةُ وَالسِّقَايَةُ وَالرِّفَادَةُ وَالنَّدْوَةُ وَاللِّوَاءُ',
        lineageBn: 'কুসাই ইবনে কিলাবের পুত্রদের মধ্যে বণ্টন (আব্দুদ্দার ও আব্দ মানাফ → হাশেম)',
        lineageEn: 'Divided among Qusay’s sons (Abd al-Dar & Abd Manaf → Hashim)',
        settlementBn: 'কাবা প্রাঙ্গণ, দারুন নদওয়া এবং মক্কা-তায়েফের মাঝখানে উকায, মাজান্নাহ ও যুল-মাজায বাজার',
        settlementEn: 'Ka‘bah sanctuary, Dar an-Nadwah & seasonal fairs (Ukaz, Majannah, Dhu al-Majaz)',
        keyFactsBn: 'হাশেম ইবনে আব্দ মানাফ হাজীদের আহারের (রিফাদাহ) উন্নত ব্যবস্থা ও গ্রীষ্ম-শীতের বাণিজ্যিক চুক্তি (ইল্লাফ: ইয়েমেন ও শাম) চালু করেন।',
        keyFactsEn: 'Hashim organized annual pilgrimage hospitality and established seasonal winter/summer trade caravans to Yemen and Syria.',
      },
    ],
  },
  {
    id: 'raheeq-5-religion',
    order: 5,
    category: 'religion_world',
    chapterTagBn: 'আর-রাহীকুল মাখতূম · ধারা ৫',
    chapterTagEn: 'Ar-Raheeq · Religion & World',
    titleBn: 'হানীফিয়্যাত থেকে মূর্তিপূজা, তাওহীদপন্থী হানীফগণ ও ৬ষ্ঠ শতাব্দীর বিশ্ব',
    titleEn: 'Origins of Idolatry, Monotheist Hunafa & The World Before Islam',
    titleAr: 'دِيَانَاتُ الْعَرَبِ وَعَمْرُو بْنُ لُحَيٍّ وَالْعَالَمُ',
    summaryBn:
      'ইসমাঈল (আ.)-এর সন্তান ও মক্কাবাসীরা দীর্ঘকাল খাঁটি "হানীফিয়্যাত" (ইবরাহীমী তাওহীদ)-এর ওপর প্রতিষ্ঠিত ছিল। আর-রাহীকুল মাখতূম বিস্তারিত বর্ণনা করে যে কীভাবে সামান্য কিছু লোকের বিকৃতি ও কাবার প্রতি অন্ধ আনুগত্য থেকে সমগ্র আরব মূর্তিপূজায় ডুবে যায় এবং সমকালীন বিশ্বে অন্ধকার নেমে আসে।',
    summaryEn:
      'Makkah long upheld pure Abrahamic monotheism (Hanifiyyah). Ar-Raheeq al-Makhtum traces exactly how idol worship entered Arabia through ‘Amr ibn Luhayy and surveys the moral collapse of surrounding empires.',
    howSplitBn: 'খুযা‘আহ গোত্রের দানশীল নেতা আমর ইবনে লুহাই শামের বালকা অঞ্চল থেকে "হুবাল" মূর্তি এনে কাবায় স্থাপন করে এবং নূহ (আ.)-এর যুগের ৫ মূর্তি (ওয়াদ্দ, সুওয়া‘, ইয়াগূস, ইয়া‘ঊক, নাসর) বিভিন্ন গোত্রে বণ্টন করে।',
    howSplitEn: '‘Amr ibn Luhayy (Khuza‘ah chief) imported Hubal from Sham into the Ka‘bah and revived Nuh-era idols across Arabian tribes.',
    turningPointBn: 'তাওহীদে বিশ্বাসী মুষ্টিমেয় "হানীফ" (ওয়ারাকা ইবনে নওফেল, যায়েদ ইবনে আমর, কুস ইবনে সা‘ইদাহ) সত্যের সন্ধান করছিলেন—ঠিক সেই সংকটময় মুহূর্তে ৫৭১ খ্রিষ্টাব্দে জন্ম ও ৬১০ খ্রিষ্টাব্দে নবুওয়াত লাভ করেন মুহাম্মাদ (ﷺ)।',
    turningPointEn: 'A tiny circle of monotheist Hunafa awaited truth amid global darkness—setting the stage for the birth (571 CE) and revelation (610 CE) of Prophet Muhammad (SAW).',
    sourceChapterBn: 'আর-রাহীকুল মাখতূম · অধ্যায় ৩ ও ৪: আরবের ধর্ম ও সমকালীন বিশ্ব',
    sourceChapterEn: 'Ar-Raheeq al-Makhtum · Chapters 3–4: Religions of the Arabs & World Context',
    subBranches: [
      {
        nameBn: 'আমর ইবনে লুহাই ও ৪ প্রধান মূর্তি (হুবাল, মানাত, লাত, উযযা)',
        nameEn: '‘Amr ibn Luhayy & Major Idols (Hubal, Manat, Lat, ‘Uzza)',
        nameAr: 'عَمْرُو بْنُ لُحَيٍّ: هُبَلُ · مَنَاةُ · اللَّاتُ · الْعُزَّى',
        lineageBn: 'খুযা‘আহ গোত্রের শাসক (কাবার কুরাইশ-পূর্ব তত্ত্বাবধায়ক) → সমগ্র আরবে বিস্তার',
        lineageEn: 'Introduced by ‘Amr ibn Luhayy of Khuza‘ah, adopted across Hijaz & Najd',
        settlementBn: 'হুবাল (কাবায়), মানাত (কুদাইদ-মুশাল্লাল/মদীনা পথ), আল-লাত (তায়েফ/সাক্বীফ), আল-উযযা (নাখলা উপত্যকা)',
        settlementEn: 'Hubal (Ka‘bah), Manat (Red Sea/Qudayd), Al-Lat (Ta’if) & Al-‘Uzza (Nakhlah)',
        keyFactsBn: 'ফাতহে মক্কা (৮ম হিজরি)-তে কাবার ভেতর ও চারপাশে থাকা ৩৬০টি মূর্তিই রাসূলুল্লাহ (ﷺ) চিরতরে ভেঙে ফেলেন।',
        keyFactsEn: 'By the Conquest of Makkah (8 AH), 360 idols stood around the Ka‘bah until Prophet (SAW) cleared them all.',
      },
      {
        nameBn: 'অন্যান্য ধর্ম ও সত্যসন্ধানী হানীফগণ',
        nameEn: 'Judaism, Christianity, Sabians & The Hunafa',
        nameAr: 'الْحُنَفَاءُ: زَيْدُ بْنُ عَمْرٍو · وَرَقَةُ · قُسُّ بْنُ سَاعِدَةَ',
        lineageBn: 'ইয়াসরিব-খায়বারে ইহুদী (কুরাইযা, নাদীর, কাইনুকা), নাজরানে খ্রিষ্টান ও মক্কায় হানীফগণ',
        lineageEn: 'Jews in Yathrib/Khaybar, Christians in Najran & Damascus road, Hunafa in Makkah',
        settlementBn: 'মদীনা, খায়বার, তাইমা, নাজরান এবং মক্কা ও ওকায প্রান্তর',
        settlementEn: 'Madinah, Khaybar, Tayma, Najran & Makkah',
        keyFactsBn: 'যায়েদ ইবনে আমর ইবনে নুফাইল, কুস ইবনে সা‘ইদাহ ও উমাইয়াহ ইবনুস সালত মূর্তি ও কন্যাশিশু হত্যা পরিহার করে এক আল্লাহর ইবাদত করতেন।',
        keyFactsEn: 'Seekers like Zayd ibn ‘Amr rejected idols and female infanticide, praying directly to the Lord of Ibrahim.',
      },
      {
        nameBn: 'সমকালীন পারস্য, রোম ও বিশ্ব সাম্রাজ্যের অবস্থা',
        nameEn: 'Sassanid Persia, Byzantine Rome & Global Empires',
        nameAr: 'فَارِسُ وَالرُّومُ وَالْهِنْدُ قَبْلَ الْإِسْلَامِ',
        lineageBn: 'সাসানী সাম্রাজ্য (ইরান-ইরাক) · বাইজেন্টাইন সাম্রাজ্য (শাম-মিসর-ইউরোপ) · ভারত ও চীন',
        lineageEn: 'Sassanid Empire · Byzantine Empire · South Asia & East Asia',
        settlementBn: 'মাদায়েন (ইরাক-ইরান), কনস্টান্টিনোপল (তুরস্ক-শাম-মিসর) ও সমগ্র পুরাতন বিশ্ব',
        settlementEn: 'Ctesiphon/Persia, Constantinople/Levant-Egypt & Wider Eurasia',
        keyFactsBn: 'অগ্নি-উপাসনা ও শাসকদের বিলাসিতা (পারস্য), ত্রিত্ববাদ ও ধর্মযুদ্ধ (বাইজেন্টাইন) এবং জাতিভেদ-সংকট দূর করতেই সমগ্র মানবতার জন্য ইসলাম আসে।',
        keyFactsEn: 'Moral and spiritual decay across Persia, Byzantium, and Eurasia cried out for the final universal revelation.',
      },
    ],
  },
];

