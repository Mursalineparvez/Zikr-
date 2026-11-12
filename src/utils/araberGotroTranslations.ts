// Translations & English Fallbacks for Araber Gotro & Byaktitto View

export interface UIStringDict {
  backToLibrary: string;
  subHeaderBadge: string;
  mainHeaderTitle: string;
  mainHeaderDesc: string;
  metricDomainLabel: string;
  metricDomainValue: string;
  metricKabaLabel: string;
  metricKabaValue: string;
  metricTribeLabel: string;
  metricTribeValue: string;
  metricSourceLabel: string;
  metricSourceValue: string;

  // Nav tabs
  tabTopicToc: string;
  tabDirectory: string;
  tabReader: string;
  tabWhoIsWho: string;
  tabChartsGallery: string;
  tabAppendix40: string;
  tabBookmarks: (count: number) => string;

  // Search
  searchPlaceholderGlobal: string;
  searchPlaceholderToc: string;
  fontSizeNormal: string;
  fontSizeLarge: string;

  // Topic TOC
  tocTitle: string;
  tocSubtitle: string;
  allTopicsBtn: string;
  allChartsBtn: string;
  topicNumLabel: (num: number) => string;
  topicCountBadge: (count: number) => string;
  badgeChart: string;
  badgeRead: string;
  topicChartBtn: string;

  // Directory View
  dirTopic1Title: string;
  dirTopic1Desc: string;
  dirTopic1Footer: string;
  dirTopic2Title: string;
  dirTopic2Desc: string;
  dirTopic2Footer: string;
  dirTopic3Title: string;
  dirTopic3Desc: string;
  dirTopic3Footer: string;
  filterSelected: string;
  filterDefault: string;
  keyChartsStripLabel: string;
  chartBtnQurayshRoles: string;
  chartBtnHashimTree: string;
  chartBtnAnsarTree: string;
  chartBtnStats: string;
  figureCountBadge: (count: number) => string;
  roleLabel: string;
  notableFiguresLabel: string;
  readSeerahBtn: string;
  subClansCount: (count: number) => string;
  mainBranchLabel: string;

  // Reader View
  prevClanBtn: string;
  nextClanBtn: string;
  dignityTitle: string;
  introTitle: string;
  copyBtn: string;
  copiedBtn: string;
  genealogyTitle: string;
  genealogySubtitle: string;
  genealogyFounder: string;
  genealogyChief: string;
  genealogySon: string;
  genealogyLastProphet: string;
  subClansHeader: (count: number) => string;
  notableFiguresHeader: (count: number) => string;
  clickToReadTip: string;
  sahabaCategoryLabel: string;
  historicalCategoryLabel: string;
  negativeCategoryLabel: string;
  referencesTitle: string;
  returnToDirectoryBtn: string;

  // Who is Who
  mappingHeaderTitle: string;
  mappingHeaderDesc: string;
  specCatAll: string;
  specCatAshara: string;
  specCatMothers: string;
  filterChapterLabel: string;
  chapterAll: string;
  chapter1: string;
  chapter2: string;
  chapter3: string;
  asharaSectionTitle: string;
  mothersSectionTitle: string;
  clanTitleLabel: string;
  intersectionLabel: string;
  readClanSeerahBtn: string;

  // Charts Gallery
  galleryTabQurayshRoles: string;
  galleryTabQurayshConvergence: string;
  galleryTabHashimTree: string;
  galleryTabAnsarTree: string;
  galleryTabArabMap: string;
  galleryTabStats: string;

  rolesHeaderTitle: string;
  rolesHeaderDesc: string;
  rolesMakkahHadith: string;
  rolesFilterAll: string;
  rolesFilterService: string;
  rolesFilterMilitary: string;
  rolesFilterJudiciary: string;
  rolesFilterParliament: string;

  preIslamicLeader: string;
  islamicPosition: string;

  convergenceHeaderTitle: string;
  convergenceHeaderDesc: string;
  convergenceHadithNote: string;
  generationLevel: (gen: number) => string;
  connectedBranchesCount: (count: number) => string;

  hashimHeaderTitle: string;
  hashimHeaderDesc: string;
  hashimHadithNote: string;
  hashimBranchAll: string;
  hashimBranchProphet: string;
  hashimBranchMartyrs: string;
  hashimBranchUncles: string;

  ansarHeaderTitle: string;
  ansarHeaderDesc: string;
  ansarSubTabTree: string;
  ansarSubTabComparison: string;
  ansarSubTabVirtues: string;

  arabMapHeaderTitle: string;
  arabMapHeaderDesc: string;
  mapPinInstruction: string;

  statsHeaderTitle: string;
  statsHeaderDesc: string;
  statsSortHighest: string;
  statsSortAlpha: string;
  statsTotalCount: (count: number) => string;

  // Appendix 40
  appendixTitle: string;
  appendixSubtitle: string;
  appendixFilterAll: string;

  // Bookmarks
  bookmarksTitle: (count: number) => string;
  bookmarksDesc: string;
  bookmarksEmptyTitle: string;
  bookmarksEmptySub: string;

  // Modals
  modalBioTitle: string;
  modalRefTitle: string;
  modalDoneReading: string;
  modalOfficeTitle: string;
  modalOfficeSub: string;
  modalClose: string;
  floatingTocBtn: string;
  drawerTitle: string;
  drawerSubtitle: string;
  drawerClose: string;
  drawerCloseBtn: string;
  drawerCategoryTag: string;
  drawerSearchPlaceholder: string;
  drawerCountBadge: (count: number) => string;
  drawerAppendixOption: string;

  voiceTitleAr: string;
  readRegionSeerahBtn: string;
  dominantTribes: string;
  historicalEvents: string;
  prominentSahaba: string;
  readSeerahAndBattleBtn: string;
  statsBadge: string;
  statsTitle: string;
  statsDesc: string;
  statsSortLabel: string;
  appendixFilterQuraysh: string;
  appendixFilterAnsar: string;
  appendixFilterYemen: string;
  appendixFilterBedouin: string;
  appendixFilterChristian: string;
  appendixSahabaTitle: string;
  appendixNegativeTitle: string;
  bookmarksSubtitle: string;
  preIslamicLeadership: string;
}

export const ARABER_GOTRO_TRANSLATIONS: Record<'bn' | 'en', UIStringDict> = {
  bn: {
    backToLibrary: 'লাইব্রেরিতে ফিরুন',
    subHeaderBadge: 'প্রামাণ্য ঐতিহাসিক সীরাত কোষ',
    mainHeaderTitle: 'আরবের গোত্র ও ব্যক্তিত্ব (প্রামাণ্য ঐতিহাসিক সীরাত কোষ)',
    mainHeaderDesc: 'প্রাক-ইসলামী ও সীরাত যুগে মক্কার কাবার প্রশাসনিক দায়িত্ব, মদিনার আনসার ভ্রাতৃত্ব এবং সমগ্র আরব উপদ্বীপের শীর্ষ গোত্র ও ব্যক্তিত্বের প্রামাণ্য ইতিহাস।',
    metricDomainLabel: 'মূল পরিমণ্ডল',
    metricDomainValue: 'মক্কা, মদিনা ও আরব',
    metricKabaLabel: 'কাবার শাসন',
    metricKabaValue: '১০টি কুরাইশ দপ্তর',
    metricTribeLabel: 'গোত্র কোষ',
    metricTribeValue: '৪০টি ঐতিহাসিক গোত্র',
    metricSourceLabel: 'তথ্যসূত্র',
    metricSourceValue: 'ইবনে হিশাম ও সীরাত',

    tabTopicToc: 'বিষয়ভিত্তিক সূচিপত্র',
    tabDirectory: 'গোত্র ডিরেক্টরি',
    tabReader: 'গোত্র পাঠ (সীরাত)',
    tabWhoIsWho: 'কোন গোত্রে কে কে (ম্যাপিং)',
    tabChartsGallery: 'চার্ট ও বংশধারা',
    tabAppendix40: '৪০টি গোত্র কোষ',
    tabBookmarks: (count) => `বুকমার্ক (${count})`,

    searchPlaceholderGlobal: 'গোত্র, সাহাবি, উপাধি বা হাদিস সূত্র অনুসন্ধান...',
    searchPlaceholderToc: 'সূচিপত্রে খুঁজুন (যেমন: হাশিম, উমর, খালিদ, কাবার চাবি, সিকায়া, খাযরাজ, বদর, তায়েফ...)',
    fontSizeNormal: 'স্বাভাবিক',
    fontSizeLarge: 'বড় (ক+)',

    tocTitle: 'সূচিপত্র',
    tocSubtitle: 'যেকোনো গোত্র বা চার্টে স্পর্শ করে সরাসরি সম্পূর্ণ অধ্যায় পড়ুন',
    allTopicsBtn: 'সকল বিষয় ✕',
    allChartsBtn: '📊 সকল চার্ট',
    topicNumLabel: (num) => `বিষয় ${num}`,
    topicCountBadge: (count) => `${count}টি বিষয়`,
    badgeChart: 'চার্ট',
    badgeRead: 'পাঠ',
    topicChartBtn: 'চার্ট',

    dirTopic1Title: 'মক্কার কুরাইশ গোত্রসমূহ',
    dirTopic1Desc: 'পবিত্র কাবার খেদমত, ১০টি প্রধান কুরাইশ দায়িত্ব বণ্টন ও অভিজাত বংশসমূহ',
    dirTopic1Footer: '৮টি মূল শাখা',
    dirTopic2Title: 'মদিনার আনসার ও অন্যান্য',
    dirTopic2Desc: 'ইয়েমেনের আজদ বংশ, খাযরাজ ও আওস ভ্রাতৃত্ব এবং মদিনার ইহুদি গোত্রসমূহ',
    dirTopic2Footer: 'আওস, খাযরাজ ও ইহুদি',
    dirTopic3Title: 'আরবের অন্যান্য গোত্র',
    dirTopic3Desc: 'তায়েফের সাকীফ, নজদের হাওয়াযিন, হুদাইবিয়ার খুযা\'আ, গিফার ও তামিম',
    dirTopic3Footer: '১১টি গোত্র',
    filterSelected: 'নির্বাচিত ✓',
    filterDefault: 'ফিল্টার →',
    keyChartsStripLabel: 'গুরুত্বপূর্ণ চার্টসমূহ:',
    chartBtnQurayshRoles: '🏛️ কুরাইশ দায়িত্ব চার্ট',
    chartBtnHashimTree: '🌳 বনু হাশিম বংশলতিকা',
    chartBtnAnsarTree: '🌿 আনসার গোত্র শাখা',
    chartBtnStats: '📊 ব্যক্তিত্ব বার চার্ট',
    figureCountBadge: (count) => `${count} জন`,
    roleLabel: 'দায়িত্ব ও ভূমিকা:',
    notableFiguresLabel: 'উল্লেখযোগ্য ব্যক্তিত্ব:',
    readSeerahBtn: 'সীরাত বিবরণী পড়ুন',
    subClansCount: (count) => `${count} উপশাখা`,
    mainBranchLabel: 'মূল বংশ',

    prevClanBtn: 'পূর্ববর্তী গোত্র',
    nextClanBtn: 'পরবর্তী গোত্র',
    dignityTitle: 'মক্কার ঐতিহাসিক দায়িত্ব ও মর্যাদা',
    introTitle: 'গোত্র পরিচিতি ও ঐতিহাসিক ইতিবৃত্ত',
    copyBtn: 'কপি করুন',
    copiedBtn: 'কপি হয়েছে',
    genealogyTitle: 'ঐতিহাসিক চিত্র',
    genealogySubtitle: 'বনু হাশিমের সংক্ষিপ্ত বংশধারা (নবীজি, আহলে বাইত ও খুলাফা)',
    genealogyFounder: 'বংশের মূল প্রতিষ্ঠাতা',
    genealogyChief: 'মক্কার অভিভাবক ও সর্দার',
    genealogySon: 'আবদুল মুত্তালিবের পুত্র',
    genealogyLastProphet: 'সর্বশেষ নবী',
    subClansHeader: (count) => `গোত্রের প্রধান উপশাখাসমূহ (${count}টি)`,
    notableFiguresHeader: (count) => `গোত্রের উল্লেখযোগ্য ব্যক্তিত্ব (${count} জন)`,
    clickToReadTip: 'ক্লিক করে সম্পূর্ণ জীবনী পড়ুন',
    sahabaCategoryLabel: 'সাহাবায়ে কেরাম (রা.)',
    historicalCategoryLabel: 'ঐতিহাসিক ও বিশিষ্ট ব্যক্তিত্ব',
    negativeCategoryLabel: 'প্রতিপক্ষ ও চরম বিরুদ্ধাচরণকারী চরিত্র',
    referencesTitle: 'প্রামাণ্য রেফারেন্স ও গ্রন্থসূত্র',
    returnToDirectoryBtn: 'গোত্র ডিরেক্টরিতে ফিরুন',

    mappingHeaderTitle: 'কোন গোত্রে কে কে : গোত্র ও ব্যক্তিত্বের পূর্ণাঙ্গ ম্যাপিং চার্ট',
    mappingHeaderDesc: 'আরবের প্রতিটি প্রধান গোত্র অনুযায়ী কে কোন গোত্রের সন্তান, ইসলাম গ্রহণকারী সাহাবায়ে কেরাম (রা.), উম্মাহাতুল মুমিনীন ও ঐতিহাসিক ব্যক্তিত্বের সুবিন্যস্ত চিত্র।',
    specCatAll: 'সকল গোত্রীয় তালিকা',
    specCatAshara: 'আশারায়ে মুবাশশারা (১০ জান্নাতী)',
    specCatMothers: 'উম্মাহাতুল মুমিনীন (সহধর্মিনী)',
    filterChapterLabel: 'অধ্যায় অনুযায়ী ফিল্টার:',
    chapterAll: 'সকল অধ্যায়',
    chapter1: '১ম অধ্যায়: কুরাইশ (মক্কা)',
    chapter2: '২য় অধ্যায়: আনসার (মদিনা)',
    chapter3: '৩য় অধ্যায়: বৃহত্তর আরব',
    asharaSectionTitle: '১০ জান্নাতী সাহাবি (আশারায়ে মুবাশশারা)-এর গোত্র ও বংশমিলন নির্দেশিকা',
    mothersSectionTitle: 'উম্মাহাতুল মুমিনীন (নবীজি ﷺ-এর সহধর্মিনীগণ)-এর গোত্র ও বংশতালিকা',
    clanTitleLabel: '🏛️ গোত্র:',
    intersectionLabel: 'মিলন:',
    readClanSeerahBtn: 'এই গোত্রের সীরাত বিবরণী পড়ুন',

    galleryTabQurayshRoles: '🏛️ কুরাইশ দায়িত্ব বণ্টন চার্ট',
    galleryTabQurayshConvergence: '🌳 কুরাইশ মিলনরেখা',
    galleryTabHashimTree: '👑 বনু হাশিম বংশলতিকা চিত্র',
    galleryTabAnsarTree: '🌿 আনসার গোত্র উপশাখা চিত্র',
    galleryTabArabMap: '🧭 বৃহত্তর আরব গোত্র চার্ট',
    galleryTabStats: '📊 ব্যক্তিত্বের বার চার্ট',

    rolesHeaderTitle: 'কুরাইশ শাখাগুলোর দায়িত্ব বণ্টন ও ঐতিহাসিক রূপরেখা',
    rolesHeaderDesc: 'হজ পালনকারীদের সেবা, কাবার পবিত্রতা রক্ষা, নগর প্রতিরক্ষা ও আন্তর্জাতিক কূটনীতি পরিচালনার জন্য কুরাইশদের শীর্ষ ১০টি শাখার মাঝে বিশেষ দপ্তর অর্পিত ছিল।',
    rolesMakkahHadith: 'রাসুলুল্লাহ ﷺ ইরশাদ করেন: "অতীতের জাহেলি প্রথা সমাপ্ত, কেবল কাবা শরিফের খিদমত (সিদানাহ) ও হাজিদের পানি পান (সিকায়াহ) ব্যতীত।"',
    rolesFilterAll: 'সকল দায়িত্ব (১০)',
    rolesFilterService: 'কাবার পবিত্র সেবা (৩)',
    rolesFilterMilitary: 'যুদ্ধ ও সেনাপতিত্ব (২)',
    rolesFilterJudiciary: 'বিচার ও সালিশি (২)',
    rolesFilterParliament: 'সংসদ ও অর্থব্যবস্থা (৩)',

    preIslamicLeader: '🏛️ জাহেলিয়াত যুগে নেতৃত্ব',
    islamicPosition: '☪️ ইসলামের যুগে অবস্থান',

    convergenceHeaderTitle: 'সাহাবায়ে কেরাম ও বিশ্বনবী ﷺ-এর কুরাইশি বংশমিলন রেখা',
    convergenceHeaderDesc: 'রাসূলুল্লাহ ﷺ-এর থেকে কততম বংশস্তরে ইসলামের কোন মহান সাহাবি, খলিফা ও উম্মাহাতুল মুমিনীন তাঁর আদি কুরাইশি রক্তধারায় মিলিত হয়েছেন তার নিখুঁত চিত্রপ্রদর্শন।',
    convergenceHadithNote: '💡 বংশবিজ্ঞান দ্রষ্টব্য: কুরাইশ গোত্রের সকল শাখা ফিহর ইবনে মালিকের সন্তান। ১ থেকে ১০ম প্রজন্মের মধ্যে চার খলিফা, আশারায়ে মুবাশশারা এবং উম্মাহাতুল মুমিনীন সকলেই বিশ্বনবী ﷺ-এর পরিবারের সাথে একই পবিত্র শিকড়ে সংযুক্ত।',
    generationLevel: (gen) => `${gen}ম স্তর`,
    connectedBranchesCount: (count) => `${count}টি প্রধান বংশধারা মিলিত`,

    hashimHeaderTitle: 'বনু হাশিমের পবিত্র ঐতিহাসিক বংশলতিকা চিত্র',
    hashimHeaderDesc: 'হাশিম ইবনে আবদে মানাফ থেকে আবদুল মুত্তালিব, বিশ্বনবী হযরত মুহাম্মদ ﷺ এবং আহলে বাইতের গৌরবময় শাখা',
    hashimHadithNote: 'রাসুলুল্লাহ ﷺ বলেন: "আল্লাহ তায়ালা ইবরাহিম (আ.)-এর বংশ থেকে ইসমাইল (আ.)-কে, তাঁর বংশ থেকে কিনানাহকে, কিনানাহ থেকে কুরাইশকে, কুরাইশ থেকে বনু হাশিমকে এবং বনু হাশিম থেকে আমাকে মনোনীত করেছেন।" — (সহিহ মুসলিম)',
    hashimBranchAll: 'সকল শাখা',
    hashimBranchProphet: 'নবীজি ﷺ ও আহলে বাইত',
    hashimBranchMartyrs: 'বীর শহীদ ও খুলাফা',
    hashimBranchUncles: 'অন্যান্য পিতৃব্য',

    ansarHeaderTitle: 'আওস ও খাযরাজ গোত্রের উপশাখা চিত্র',
    ansarHeaderDesc: 'ইয়েমেনের প্রাচীন কাহতানি \'আজদ\' বংশ থেকে হিজরত করে মদিনায় বসতি স্থাপনকারী দুই ভ্রাতৃপ্রতিম গোত্র',
    ansarSubTabTree: 'বংশলতিকা ও উপশাখা চিত্র',
    ansarSubTabComparison: 'খাযরাজ বনাম আওস তুলনা',
    ansarSubTabVirtues: 'আনসারদের মর্যাদা ও হাদিস',

    arabMapHeaderTitle: 'বৃহত্তর আরবের ১০টি প্রধান ভৌগোলিক অঞ্চল ও গোত্র চিত্র',
    arabMapHeaderDesc: 'মক্কা, মদিনা, তায়েফ, নজদ, ইয়ামামাহ, ইয়েমেন ও সিরিয়া সীমান্তের ভূ-রাজনৈতিক রূপরেখা',
    mapPinInstruction: 'মানচিত্রের পিন স্পর্শ করুন',

    statsHeaderTitle: 'তালিকায় উল্লিখিত ব্যক্তিত্বের তুলনামূলক বার চার্ট',
    statsHeaderDesc: '১ থেকে ১৩ নম্বর মূল অধ্যায় অনুযায়ী আরবের শীর্ষ গোত্রগুলোতে বিশিষ্ট সাহাবি ও ব্যক্তিত্বের সংখ্যা',
    statsSortHighest: 'সর্বোচ্চ ব্যক্তিত্ব',
    statsSortAlpha: 'নামানুসারে',
    statsTotalCount: (count) => `মোট ${count} জন`,

    appendixTitle: 'সংযুক্তি : আরবের পূর্ণাঙ্গ ৪০টি গোত্রের এনসাইক্লোপিডিয়া',
    appendixSubtitle: 'আরবের শীর্ষ ৪০টি গোত্রের উৎপত্তি, ভৌগোলিক অবস্থান, ইসলাম গ্রহণকারী সাহাবি ও ঐতিহাসিক চরিত্র',
    appendixFilterAll: 'সকল গোত্র',

    bookmarksTitle: (count) => `আপনার বুকমার্ককৃত ব্যক্তিত্বগণ (${count} জন)`,
    bookmarksDesc: 'যেকোনো সাহাবি বা ঐতিহাসিক চরিত্রের কার্ডে বুকমার্ক আইকনে ক্লিক করে এখানে সহজে সংরক্ষণ করুন।',
    bookmarksEmptyTitle: 'এখনো কোনো ব্যক্তিত্ব বুকমার্ক করা হয়নি',
    bookmarksEmptySub: 'অধ্যায়ভিত্তিক পাঠ থেকে আপনার পছন্দের সাহাবিদের বুকমার্ক করুন',

    modalBioTitle: 'ঐতিহাসিক অবদান ও জীবনী',
    modalRefTitle: 'রেফারেন্স সূত্র:',
    modalDoneReading: 'পড়া সম্পন্ন হয়েছে',
    modalOfficeTitle: 'কুরাইশের ঐতিহাসিক প্রশাসনিক দপ্তর',
    modalOfficeSub: 'মক্কার প্রশাসনিক পোর্টফোলিও',
    modalClose: 'বন্ধ করুন',
    floatingTocBtn: '📑 দ্রুত সূচিপত্র',
    drawerTitle: 'সম্পূর্ণ বিষয়ভিত্তিক সূচিপত্র',
    drawerSubtitle: '৩টি অধ্যায় • ১৩টি সীরাত পরিচ্ছেদ • ৫টি ঐতিহাসিক চার্ট',
    drawerClose: 'সূচিপত্র বন্ধ করুন',
    drawerCloseBtn: 'সূচিপত্র বন্ধ করুন',
    drawerCategoryTag: 'ক্যাটাগরি সূচি',
    drawerSearchPlaceholder: 'সূচিপত্র অনুসন্ধান...',
    drawerCountBadge: (count) => `${count}টি অধ্যায়`,
    drawerAppendixOption: '৪০টি গোত্র এনসাইক্লোপিডিয়া',

    voiceTitleAr: 'আরবি উচ্চারণ শুনুন',
    readRegionSeerahBtn: 'অঞ্চলের সীরাত বিবরণী পড়ুন',
    dominantTribes: 'প্রধান সক্রিয় গোত্রসমূহ:',
    historicalEvents: 'ঐতিহাসিক ভূমিকা ও ঘটনাবলী:',
    prominentSahaba: 'বিশিষ্ট সাহাবি ও ব্যক্তিত্ব:',
    readSeerahAndBattleBtn: 'সীরাত ও যুদ্ধ বিবরণী পড়ুন',
    statsBadge: 'পরিসংখ্যান চার্ট',
    statsTitle: 'আরবের শীর্ষ গোত্রসমূহের ব্যক্তিত্ব বার চার্ট',
    statsDesc: 'সীরাত গ্রন্থে উল্লিখিত স্থান ও অবদান অনুযায়ী ব্যক্তিত্বের রূপরেখা',
    statsSortLabel: 'ক্রমানুসারে সাজান:',
    appendixFilterQuraysh: 'কুরাইশ শাখা (১-১০)',
    appendixFilterAnsar: 'আনসার গোত্র (১১-১৫)',
    appendixFilterYemen: 'ইয়েমেন ও দক্ষিণাঞ্চল (১৬-২৫)',
    appendixFilterBedouin: 'মরুভূমি ও সীমান্তবর্তী (২৬-৪০)',
    appendixFilterChristian: 'সীমান্তবর্তী ও খ্রিস্টান গোত্র',
    appendixSahabaTitle: 'বিশিষ্ট সাহাবি (রা.):',
    appendixNegativeTitle: 'বিরুদ্ধাচরণকারী ব্যক্তিত্ব:',
    bookmarksSubtitle: 'আপনার সংরক্ষিত ব্যক্তিত্বের তালিকা',
    preIslamicLeadership: 'জাহেলিয়াত যুগে নেতৃত্ব:'
  },
  en: {
    backToLibrary: 'Return to Library',
    subHeaderBadge: 'Classical Seerah Chronicle',
    mainHeaderTitle: 'Arab Tribes & Personalities (Classical Seerah Chronicle)',
    mainHeaderDesc: 'Authentic chronicle of Kaaba administrative offices, Madinan Ansar brotherhood, and major Arabian tribes & figures during the pre-Islamic and Seerah era.',
    metricDomainLabel: 'Primary Domain',
    metricDomainValue: 'Makkah, Madinah & Arabia',
    metricKabaLabel: 'Kaaba Administration',
    metricKabaValue: '10 Quraysh Offices',
    metricTribeLabel: 'Tribal Chronicle',
    metricTribeValue: '40 Historical Tribes',
    metricSourceLabel: 'Primary Source',
    metricSourceValue: 'Ibn Hisham & Seerah',

    tabTopicToc: 'Thematic TOC',
    tabDirectory: 'Clan Directory',
    tabReader: 'Clan Reader',
    tabWhoIsWho: 'Tribal Mapping',
    tabChartsGallery: 'Charts & Lineage',
    tabAppendix40: '40 Tribes Index',
    tabBookmarks: (count) => `Bookmarks (${count})`,

    searchPlaceholderGlobal: 'Search tribe, Sahabi, title, or Hadith reference...',
    searchPlaceholderToc: 'Search TOC (e.g., Hashim, Umar, Khalid, Key of Kaaba, Siqayah, Khazraj, Badr, Taif...)',
    fontSizeNormal: 'Normal',
    fontSizeLarge: 'Large (A+)',

    tocTitle: 'Table of Contents (TOC)',
    tocSubtitle: 'Tap any tribe or chart to read full detailed chapter directly',
    allTopicsBtn: 'All Topics ✕',
    allChartsBtn: '📊 All Charts',
    topicNumLabel: (num) => `Topic ${num}`,
    topicCountBadge: (count) => `${count} Topics`,
    badgeChart: 'Chart',
    badgeRead: 'Read',
    topicChartBtn: 'Chart',

    dirTopic1Title: 'Quraysh Tribes of Makkah',
    dirTopic1Desc: 'Service of the Holy Kaaba, 10 primary Quraysh offices, and noble clan branches',
    dirTopic1Footer: '8 Main Branches',
    dirTopic2Title: 'Madinan Ansar & Others',
    dirTopic2Desc: 'Azd lineage of Yemen, Khazraj & Aws brotherhood, and Madinan Jewish tribes',
    dirTopic2Footer: 'Aws, Khazraj & Jewish Tribes',
    dirTopic3Title: 'Other Arabian Tribes',
    dirTopic3Desc: 'Thaqif of Taif, Hawazin of Najd, Khuza\'a of Hudaybiyyah, Ghifar & Tamim',
    dirTopic3Footer: '11 Tribes',
    filterSelected: 'Selected ✓',
    filterDefault: 'Filter →',
    keyChartsStripLabel: 'Key Visual Charts:',
    chartBtnQurayshRoles: '🏛️ Quraysh Roles Chart',
    chartBtnHashimTree: '🌳 Banu Hashim Tree',
    chartBtnAnsarTree: '🌿 Ansar Branches',
    chartBtnStats: '📊 Personalities Chart',
    figureCountBadge: (count) => `${count} Figures`,
    roleLabel: 'Office & Role:',
    notableFiguresLabel: 'Notable Figures:',
    readSeerahBtn: 'Read Seerah Chronicle',
    subClansCount: (count) => `${count} Sub-branches`,
    mainBranchLabel: 'Main Branch',

    prevClanBtn: 'Previous Clan',
    nextClanBtn: 'Next Clan',
    dignityTitle: 'Historical Role & Dignity in Makkah',
    introTitle: 'Tribe Overview & Classical History',
    copyBtn: 'Copy',
    copiedBtn: 'Copied',
    genealogyTitle: 'Historical Chart',
    genealogySubtitle: 'Genealogy of Banu Hashim (Prophet PBUH, Ahl al-Bayt & Caliphs)',
    genealogyFounder: 'Ancestor & Founder',
    genealogyChief: 'Chief & Guardian of Makkah',
    genealogySon: 'Son of Abdul Muttalib',
    genealogyLastProphet: 'Final Prophet',
    subClansHeader: (count) => `Main Sub-clans (${count})`,
    notableFiguresHeader: (count) => `Notable Personalities (${count})`,
    clickToReadTip: 'Click to read full biography',
    sahabaCategoryLabel: 'Sahaba (RA)',
    historicalCategoryLabel: 'Historical Personalities',
    negativeCategoryLabel: 'Opponents & Hostile Figures',
    referencesTitle: 'Primary References & Sources',
    returnToDirectoryBtn: 'Return to Clan Directory',

    mappingHeaderTitle: 'Tribal Mapping: Comprehensive Index of Clans & Figures',
    mappingHeaderDesc: 'Systematic mapping of Sahaba, Mothers of the Believers, and historical figures across Arabian tribes.',
    specCatAll: 'All Tribes Index',
    specCatAshara: 'Ashara Mubashshara (10 Promised Paradise)',
    specCatMothers: 'Mothers of the Believers',
    filterChapterLabel: 'Filter by Chapter:',
    chapterAll: 'All Chapters',
    chapter1: 'Ch 1: Quraysh (Makkah)',
    chapter2: 'Ch 2: Ansar (Madinah)',
    chapter3: 'Ch 3: Greater Arabia',
    asharaSectionTitle: 'Tribal Lineage of the 10 Promised Paradise (Ashara Mubashshara)',
    mothersSectionTitle: 'Tribal Lineage of Mothers of the Believers (Wives of the Prophet PBUH)',
    clanTitleLabel: '🏛️ Tribe:',
    intersectionLabel: 'Lineage Convergence:',
    readClanSeerahBtn: 'Read Seerah Chronicle for this Clan',

    galleryTabQurayshRoles: '🏛️ Quraysh Offices Chart',
    galleryTabQurayshConvergence: '🌳 Quraysh Convergence Line',
    galleryTabHashimTree: '👑 Banu Hashim Tree',
    galleryTabAnsarTree: '🌿 Ansar Branches Tree',
    galleryTabArabMap: '🧭 Greater Arabia Map',
    galleryTabStats: '📊 Personalities Bar Chart',

    rolesHeaderTitle: 'Quraysh Offices & Administrative Structure',
    rolesHeaderDesc: 'Distribution of 10 primary administrative portfolios among Quraysh branches for pilgrim services, Kaaba sanctity, city defense, and international diplomacy.',
    rolesMakkahHadith: 'The Prophet (PBUH) declared: "All pre-Islamic pagan customs are abolished, except the custodianship of Kaaba (Sidanah) and providing water to pilgrims (Siqayah)."',
    rolesFilterAll: 'All Offices (10)',
    rolesFilterService: 'Kaaba Service (3)',
    rolesFilterMilitary: 'Military & Command (2)',
    rolesFilterJudiciary: 'Judiciary & Arbitration (2)',
    rolesFilterParliament: 'Assembly & Treasury (3)',

    preIslamicLeader: '🏛️ Pre-Islamic Leadership',
    islamicPosition: '☪️ Islamic Era Position',

    convergenceHeaderTitle: 'Quraysh Lineage Convergence of Sahaba & Prophet Muhammad (PBUH)',
    convergenceHeaderDesc: 'Meticulous genealogy showing at which ancestor generation key Sahaba, Caliphs, and Wives connect with the Prophet\'s (PBUH) blessed lineage.',
    convergenceHadithNote: '💡 Genealogical Insight: All Quraysh branches stem from Fihr ibn Malik. Within 1 to 10 generations, the 4 Caliphs, Ashara Mubashshara, and Mothers of the Believers all merge into the same ancestral root as the Prophet (PBUH).',
    generationLevel: (gen) => `Gen ${gen}`,
    connectedBranchesCount: (count) => `${count} Main Lineages Converge`,

    hashimHeaderTitle: 'Sacred Genealogy Tree of Banu Hashim',
    hashimHeaderDesc: 'Noble lineage from Hashim ibn Abd Manaf to Abdul Muttalib, Prophet Muhammad (PBUH), and Ahl al-Bayt',
    hashimHadithNote: 'The Prophet (PBUH) said: "Allah chose Ismail from Ishmael, Kinanah from Ismail, Quraysh from Kinanah, Banu Hashim from Quraysh, and chose me from Banu Hashim." — (Sahih Muslim)',
    hashimBranchAll: 'All Branches',
    hashimBranchProphet: 'Prophet (PBUH) & Ahl al-Bayt',
    hashimBranchMartyrs: 'Martyrs & Caliphs',
    hashimBranchUncles: 'Other Uncles',

    ansarHeaderTitle: 'Branch Tree of Aws & Khazraj Tribes',
    ansarHeaderDesc: 'The two brotherly Ansar tribes originating from the ancient Azd Kahlan lineage of Yemen who settled in Yathrib (Madinah)',
    ansarSubTabTree: 'Tree & Sub-branches',
    ansarSubTabComparison: 'Khazraj vs Aws Comparison',
    ansarSubTabVirtues: 'Virtues of Ansar & Hadith',

    arabMapHeaderTitle: 'Geopolitical Region & Tribe Map of Greater Arabia',
    arabMapHeaderDesc: 'Geopolitical map covering Makkah, Madinah, Taif, Najd, Yamamah, Yemen, and Sham borderland',
    mapPinInstruction: 'Tap Map Pins',

    statsHeaderTitle: 'Comparative Bar Chart of Notable Figures by Tribe',
    statsHeaderDesc: 'Number of notable Sahaba and historical figures recorded across major Arabian tribes',
    statsSortHighest: 'Highest Count',
    statsSortAlpha: 'Alphabetical',
    statsTotalCount: (count) => `Total ${count} Figures`,

    appendixTitle: 'Appendix: Encyclopedia of All 40 Arabian Tribes',
    appendixSubtitle: 'Origins, geography, Sahaba, and historical figures across the top 40 Arabian tribes',
    appendixFilterAll: 'All Tribes',

    bookmarksTitle: (count) => `Your Bookmarked Personalities (${count})`,
    bookmarksDesc: 'Bookmark any Sahabi or historical figure card to save them here for quick access.',
    bookmarksEmptyTitle: 'No personalities bookmarked yet',
    bookmarksEmptySub: 'Bookmark your favorite Sahaba from the chapter reader view',

    modalBioTitle: 'Historical Legacy & Biography',
    modalRefTitle: 'Reference Source:',
    modalDoneReading: 'Done Reading',
    modalOfficeTitle: 'Historical Administrative Office of Quraysh',
    modalOfficeSub: 'Makkan Administrative Portfolio',
    modalClose: 'Close',
    floatingTocBtn: '📑 Quick TOC',
    drawerTitle: 'Full Thematic Table of Contents',
    drawerSubtitle: '3 Chapters • 13 Seerah Sections • 5 Historical Charts',
    drawerClose: 'Close TOC',
    drawerCloseBtn: 'Close TOC',
    drawerCategoryTag: 'Category Index',
    drawerSearchPlaceholder: 'Search table of contents...',
    drawerCountBadge: (count) => `${count} Chapters`,
    drawerAppendixOption: '40 Tribes Encyclopedia',

    voiceTitleAr: 'Listen Arabic pronunciation',
    readRegionSeerahBtn: 'Read Region Seerah Chronicle',
    dominantTribes: 'Dominant Active Tribes:',
    historicalEvents: 'Historical Roles & Events:',
    prominentSahaba: 'Prominent Sahaba & Figures:',
    readSeerahAndBattleBtn: 'Read Seerah & Battle Chronicle',
    statsBadge: 'Statistical Bar Chart',
    statsTitle: 'Notable Figures Bar Chart by Arabian Tribe',
    statsDesc: 'Distribution of figures recorded in Seerah sources',
    statsSortLabel: 'Sort by:',
    appendixFilterQuraysh: 'Quraysh Clans (1-10)',
    appendixFilterAnsar: 'Ansar Clans (11-15)',
    appendixFilterYemen: 'Yemen & South (16-25)',
    appendixFilterBedouin: 'Bedouin & Borders (26-40)',
    appendixFilterChristian: 'Border & Christian Tribes',
    appendixSahabaTitle: 'Prominent Sahaba (RA):',
    appendixNegativeTitle: 'Opposing Figures:',
    bookmarksSubtitle: 'Your saved personalities list',
    preIslamicLeadership: 'Pre-Islamic Leadership:'
  }
};

// Data item English Translation Helper Map for TOPIC_WISE_TOC_DATA
export const TOPIC_TOC_ENGLISH_MAP: Record<string, {
  topicTitleEn: string;
  themeBadgeEn: string;
  summaryEn: string;
  subsectionsEn: Record<string, { titleEn: string; subtitleEn: string; badgeEn: string }>;
}> = {
  'topic-kaba-admin': {
    topicTitleEn: 'Service of the Holy Kaaba & Quraysh Offices (10 Portfolios)',
    themeBadgeEn: 'Kaaba Administration & 10 Noble Offices',
    summaryEn: 'The 10 administrative portfolios distributed among Quraysh noble clans during pre-Islamic era for orderly management of Makkah and Kaaba.',
    subsectionsEn: {
      'banu-hashim': { titleEn: 'Banu Hashim', subtitleEn: 'Watering Pilgrims (Siqayah) & Feeding (Rifadah)', badgeEn: 'Portfolio 1' },
      'banu-umayya': { titleEn: 'Banu Umayya / Abd Shams', subtitleEn: 'Carrying War Banner "Al-Uqab" & Supreme Military Command', badgeEn: 'Portfolio 2' },
      'banu-makhzum': { titleEn: 'Banu Makhzum', subtitleEn: 'Cavalry Forces (Al-A\'innah) & Encampment (Al-Qubbah)', badgeEn: 'Portfolio 3' },
      'banu-adi': { titleEn: 'Banu Adi', subtitleEn: 'Diplomacy (As-Sifarah), Envoys & Foreign Arbitration', badgeEn: 'Portfolio 4' },
      'banu-taym': { titleEn: 'Banu Taym', subtitleEn: 'Blood Money (Diyat) & Financial Compensation', badgeEn: 'Portfolio 5' },
      'banu-asad-quraysh': { titleEn: 'Banu Asad (Quraysh)', subtitleEn: 'Assembly House (Dar al-Nadwah) & Trade Caravans', badgeEn: 'Portfolio 6' },
      'banu-zuhrah': { titleEn: 'Banu Zuhrah', subtitleEn: 'Treasury (Al-Amwal) & Maternal Lineage of the Prophet (PBUH)', badgeEn: 'Portfolio 7' },
      'quraysh-other-branches': { titleEn: 'Banu Abd al-Dar, Sahm & Jumah', subtitleEn: 'Kaaba Keys (Sidanah), Standard (Liwa), Divination & Sacrifices', badgeEn: 'Portfolio 8' },
      'chart-quraysh-roles': { titleEn: 'Quraysh 10 Offices Visual Chart', subtitleEn: 'Comparative diagram of pre-Islamic leadership & Islamic era status', badgeEn: 'Chart 1' },
      'chart-quraysh-convergence': { titleEn: 'Quraysh Lineage Convergence Diagram', subtitleEn: 'Generation map showing where Sahaba merge with the Prophet\'s root', badgeEn: 'Chart 2' },
      'chart-hashim-tree': { titleEn: 'Banu Hashim Genealogy Tree', subtitleEn: 'Genealogy of Prophet (PBUH), Ahl al-Bayt, Uncles, and Caliphs', badgeEn: 'Chart 3' }
    }
  },
  'topic-ansar-madinah': {
    topicTitleEn: 'Madinan Ansar Brotherhood & Tribes of Yathrib',
    themeBadgeEn: 'Ansar Brotherhood & Constitution of Madinah',
    summaryEn: 'The Khazraj & Aws brotherly tribes of Madinah and Jewish tribes (Qaynuqa, Nadir, Qurayzah).',
    subsectionsEn: {
      'khazraj-tribe': { titleEn: 'Banu Khazraj', subtitleEn: 'Largest Ansar clan, pledges of Aqabah, Badr heroes & Abu Ayyub', badgeEn: 'Ansar Clan 1' },
      'aws-tribe': { titleEn: 'Banu Aws', subtitleEn: 'Sa\'d ibn Mu\'adh, Badr martyrs, defenders & champions of Ansar', badgeEn: 'Ansar Clan 2' },
      'madinah-jewish-tribes': { titleEn: 'Madinan Jewish Tribes', subtitleEn: 'Banu Qaynuqa, Banu Nadir, Banu Qurayzah & Constitution of Madinah', badgeEn: 'Madinah Fortresses' },
      'chart-ansar-tree': { titleEn: 'Aws & Khazraj Branch Diagram', subtitleEn: 'Sub-clan breakdown, leaders, and virtues of Madinan Ansar', badgeEn: 'Chart 4' }
    }
  },
  'topic-greater-arabia': {
    topicTitleEn: 'Regional Powers & Historical Treaties of Greater Arabia',
    themeBadgeEn: 'Regional Powers & Historical Expeditions',
    summaryEn: 'Major regional tribes across Taif, Najd, Hudaybiyyah, and North/South Arabian borders.',
    subsectionsEn: {
      'banu-thaqif': { titleEn: 'Banu Thaqif', subtitleEn: 'City of Taif, Urwah ibn Mas\'ud, siege of Taif & Hunayn', badgeEn: 'Regional Tribe 1' },
      'banu-hawazin-saad': { titleEn: 'Banu Hawazin & Banu Sa\'d', subtitleEn: 'Foster-mother Halimah, pure Arabic dialect & Battle of Hunayn', badgeEn: 'Regional Tribe 2' },
      'banu-khuzaa-bakr': { titleEn: 'Banu Khuza\'a & Banu Bakr', subtitleEn: 'Treaty of Hudaybiyyah allies & background of Conquest of Makkah', badgeEn: 'Regional Tribe 3' },
      'banu-ghifar-daws': { titleEn: 'Banu Ghifar & Banu Daws', subtitleEn: 'Abu Dharr al-Ghifari, Abu Hurairah & southern trade routes', badgeEn: 'Regional Tribe 4' },
      'banu-tamim-kalb': { titleEn: 'Banu Tamim & Banu Kalb', subtitleEn: 'Fierce warriors of Najd, Khabbab & Zaid ibn Harithah', badgeEn: 'Regional Tribe 5' },
      'banu-ghatfan-hanifa': { titleEn: 'Banu Ghatfan & Banu Hanifa', subtitleEn: 'Confederate cavalry at Battle of Trench & Ridda Wars', badgeEn: 'Regional Tribe 6' },
      'chart-arab-map': { titleEn: 'Greater Arabia Geopolitical Map', subtitleEn: 'Interactive map of 10 strategic regions and regional tribes', badgeEn: 'Chart 5' },
      'chart-statistics': { titleEn: 'Personalities Bar Chart', subtitleEn: 'Comparative statistical chart of Sahaba & figures by tribe', badgeEn: 'Chart 6' }
    }
  },
  'topic-appendix-40': {
    topicTitleEn: 'Appendix: Encyclopedia of 40 Arabian Tribes',
    themeBadgeEn: '40 Tribes Index & Seerah Encyclopedia',
    summaryEn: 'Comprehensive index of origins, geography, and Sahaba across all 40 Arabian tribes.',
    subsectionsEn: {
      'appendix-quresh': { titleEn: 'Quraysh Noble Branches (1-10)', subtitleEn: 'Hashim, Umayya, Makhzum, Adi, Taym, Asad, Zuhrah, Abd al-Dar, Sahm, Jumah', badgeEn: 'Appendix 1' },
      'appendix-ansar': { titleEn: 'Ansar & Madinah (11-15)', subtitleEn: 'Najjar, Salimah, Sa\'idah, Abdul Ashhal, Nabit', badgeEn: 'Appendix 2' },
      'appendix-bedouin': { titleEn: 'Bedouin & Border Tribes (16-30)', subtitleEn: 'Ghifar, Hawazin, Thaqif, Tamim, Ghatfan, Tayy, Abs, Muzainah', badgeEn: 'Appendix 3' },
      'appendix-yemen': { titleEn: 'Yemen & Southern Arabia (31-40)', subtitleEn: 'Azd, Ash\'ar, Bajilah, Himyar, Kindah, Hamdan, Daws', badgeEn: 'Appendix 4' }
    }
  }
};
