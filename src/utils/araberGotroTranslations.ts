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

export interface TocSubsectionEnEntry {
  titleEn: string;
  subtitleEn: string;
  badgeEn: string;
  figuresPreviewEn?: string[];
}

export interface TocTopicEnEntry {
  topicTitleEn: string;
  themeBadgeEn: string;
  summaryEn: string;
  relatedChartTitleEn?: string;
  subsectionsEn: Record<string, TocSubsectionEnEntry>;
  subsectionsByTitleEn?: Record<string, TocSubsectionEnEntry>;
}

// Data item English Translation Helper Map for TOPIC_WISE_TOC_DATA
export const TOPIC_TOC_ENGLISH_MAP: Record<string, TocTopicEnEntry> = {
  'topic-kaba-admin': {
    topicTitleEn: 'Service of the Holy Kaaba & Quraysh Offices (10 Portfolios)',
    themeBadgeEn: 'Kaaba Administration & 10 Noble Offices',
    summaryEn: 'The 10 administrative portfolios distributed among Quraysh noble clans during pre-Islamic era for orderly management of Makkah and Kaaba.',
    relatedChartTitleEn: 'Quraysh Offices Chart',
    subsectionsEn: {
      'banu-hashim': {
        titleEn: 'Banu Hashim',
        subtitleEn: 'Watering Pilgrims (Siqayah) & Feeding (Rifadah)',
        badgeEn: 'Portfolio 1',
        figuresPreviewEn: ['Prophet Muhammad (PBUH)', 'Ali (RA)', 'Hamzah (RA)', 'Al-Abbas (RA)']
      },
      'banu-umayya': {
        titleEn: 'Banu Abd Shams / Banu Umayyah',
        subtitleEn: 'Carrying War Banner "Al-Uqab" & Supreme Military Command',
        badgeEn: 'Portfolio 2',
        figuresPreviewEn: ['Uthman ibn Affan (RA)', 'Abu Sufyan (RA)', 'Mu\'awiyah (RA)']
      },
      'banu-makhzum': {
        titleEn: 'Banu Makhzum',
        subtitleEn: 'Cavalry Forces (Al-A\'innah) & Encampment (Al-Qubbah)',
        badgeEn: 'Portfolio 3',
        figuresPreviewEn: ['Khalid ibn al-Walid (RA)', 'Umm Salamah (RA)', 'Abu Jahl']
      },
      'banu-adi': {
        titleEn: 'Banu Adi',
        subtitleEn: 'Diplomacy (As-Sifarah), Envoys & Foreign Arbitration',
        badgeEn: 'Portfolio 4',
        figuresPreviewEn: ['Umar ibn al-Khattab (RA)', 'Sa\'id ibn Zayd (RA)', 'Hafsah (RA)']
      },
      'banu-taym': {
        titleEn: 'Banu Taym',
        subtitleEn: 'Blood Money (Diyat) & Financial Compensation',
        badgeEn: 'Portfolio 5',
        figuresPreviewEn: ['Abu Bakr as-Siddiq (RA)', 'Talhah ibn Ubaydullah (RA)', 'Aishah (RA)']
      },
      'banu-asad-quraysh': {
        titleEn: 'Banu Asad (Quraysh)',
        subtitleEn: 'Assembly House (Dar al-Nadwah) & Trade Caravans',
        badgeEn: 'Portfolio 6',
        figuresPreviewEn: ['Khadijah bint Khuwaylid (RA)', 'Az-Zubayr ibn al-Awwam (RA)']
      },
      'banu-zuhrah': {
        titleEn: 'Banu Zuhrah',
        subtitleEn: 'Treasury (Al-Amwal) & Maternal Lineage of the Prophet (PBUH)',
        badgeEn: 'Portfolio 7',
        figuresPreviewEn: ['Aminah bint Wahb', 'Sa\'d ibn Abi Waqqas (RA)', 'Abdur Rahman ibn Awf (RA)']
      },
      'quraysh-other-branches': {
        titleEn: 'Banu Abd al-Dar, Jumah & Sahm',
        subtitleEn: 'Kaaba Keys (Sidanah), Standard (Liwa), Divination (Azlam) & Offerings',
        badgeEn: 'Portfolios 8, 9 & 10',
        figuresPreviewEn: ['Mus\'ab ibn Umayr (RA)', 'Uthman ibn Talhah (RA)', 'Amr ibn al-As (RA)']
      },
      'chart-quraysh-roles': {
        titleEn: 'Quraysh 10 Offices Visual Chart',
        subtitleEn: 'Overview of the 10 Quraysh branches, roles & administrative portfolios',
        badgeEn: 'Visual Chart'
      }
    }
  },
  'topic-prophetic-lineage': {
    topicTitleEn: 'Blessed Lineage of the Prophet (PBUH) & Ahl al-Bayt',
    themeBadgeEn: 'Prophethood, Ahl al-Bayt & Sacred Lineage',
    summaryEn: 'Sacred genealogy from Hashim ibn Abd Manaf to Prophet Muhammad (PBUH), the Rightly-Guided Caliphs, and the sacrifices of Ahl al-Bayt.',
    relatedChartTitleEn: 'Banu Hashim Lineage Tree',
    subsectionsEn: {
      'chart-hashim-tree': {
        titleEn: 'Banu Hashim Genealogy Tree Diagram',
        subtitleEn: 'Visual family tree from Hashim to Abdul Muttalib and Prophet Muhammad (PBUH)',
        badgeEn: 'Visual Lineage'
      }
    },
    subsectionsByTitleEn: {
      'সাইয়্যিদুল মুরসালীন হযরত মুহাম্মাদ মুস্তফা ﷺ': {
        titleEn: 'Sayyid al-Mursalin Prophet Muhammad al-Mustafa (PBUH)',
        subtitleEn: 'Final Messenger, Mercy to the Worlds & Rebuilder of the Kaaba',
        badgeEn: 'Prophetic Lineage',
        figuresPreviewEn: ['Prophet Muhammad (PBUH)']
      },
      'সাইয়্যিদুনা হযরত আলী ও ফাতিমাতুয যাহরা (রা.)': {
        titleEn: 'Sayyiduna Ali & Fatimah az-Zahra (RA)',
        subtitleEn: 'Asadullah al-Ghalib, 4th Caliph & Leader of the Women of Paradise',
        badgeEn: 'Ahl al-Bayt',
        figuresPreviewEn: ['Ali (RA)', 'Fatimah (RA)']
      },
      'ইমাম হাসান ও ইমাম হুসাইন (রা.)': {
        titleEn: 'Imam al-Hasan & Imam al-Husayn (RA)',
        subtitleEn: 'Chiefs of the Youth of Paradise & beloved grandsons of the Prophet (PBUH)',
        badgeEn: 'Ahl al-Bayt',
        figuresPreviewEn: ['Imam Hasan (RA)', 'Imam Husayn (RA)']
      },
      'সাইয়্যিদুশ শুহাদা হযরত হামযা ও জাফর ইবনে আবি তালিব (রা.)': {
        titleEn: 'Chief of Martyrs Hamzah & Ja\'far ibn Abi Talib (RA)',
        subtitleEn: 'Lion of Allah at Badr & Dhul-Janahayn Martyr of Mu\'tah',
        badgeEn: 'Noble Martyrs',
        figuresPreviewEn: ['Hamzah (RA)', 'Ja\'far ibn Abi Talib (RA)']
      },
      'হযরত আব্বাস ইবনে আব্দুল মুত্তালিব ও আব্দুল্লাহ ইবনে আব্বাস (রা.)': {
        titleEn: 'Al-Abbas ibn Abdul Muttalib & Abdullah ibn Abbas (RA)',
        subtitleEn: 'The Prophet\'s uncle & Chief Exegete (Ra\'is al-Mufassirin)',
        badgeEn: 'Knowledge & Stewardship',
        figuresPreviewEn: ['Al-Abbas (RA)', 'Ibn Abbas (RA)']
      }
    }
  },
  'topic-ansar-madinah': {
    topicTitleEn: 'Madinan Ansar Brotherhood & Tribes of Yathrib',
    themeBadgeEn: 'Ansar Brotherhood & Constitution of Madinah',
    summaryEn: 'The Khazraj & Aws brotherly tribes of Madinah from Yemen\'s Azd lineage and Jewish tribes (Qaynuqa, Nadir, Qurayzah).',
    relatedChartTitleEn: 'Ansar Branch Diagram',
    subsectionsEn: {
      'khazraj-tribe': {
        titleEn: 'Banu Khazraj (Largest Ansar Clan)',
        subtitleEn: 'History & valor of Banu Najjar, Salamah, Sa\'idah & Zurayq',
        badgeEn: 'Ansar Khazraj',
        figuresPreviewEn: ['Abu Ayyub al-Ansari (RA)', 'Jabir ibn Abdullah (RA)', 'Sa\'d ibn Ubadah (RA)']
      },
      'aws-tribe': {
        titleEn: 'Banu Aws (Steadfast Ansar Clan)',
        subtitleEn: 'Banu Abd al-Ashhal, Zafar, Awf & Heroes of Badr',
        badgeEn: 'Ansar Aws',
        figuresPreviewEn: ['Sa\'d ibn Mu\'adh (RA)', 'Usayd ibn Hudayr (RA)', 'Hanzalah (RA)']
      },
      'madinah-jewish-tribes': {
        titleEn: 'Madinan Jewish Tribes (Qaynuqa, Nadir & Qurayzah)',
        subtitleEn: 'Constitution of Madinah, fortresses, treaty violations & historical battles',
        badgeEn: 'Treaties & Fortresses',
        figuresPreviewEn: ['Huyayy ibn Akhtab', 'Ka\'b ibn al-Ashraf', 'Safiyyah bint Huyayy (RA)']
      },
      'chart-ansar-tree': {
        titleEn: 'Aws & Khazraj Branch Diagram',
        subtitleEn: 'Genealogy chart of the 7 main branches of Khazraj & Aws from Azd',
        badgeEn: 'Visual Chart'
      }
    }
  },
  'topic-regional-arab': {
    topicTitleEn: 'Regional Powers, Battles & Treaties of Greater Arabia',
    themeBadgeEn: 'Taif, Najd, Hudaybiyyah & Frontiers',
    summaryEn: 'Powerful tribes across Taif, Najd, Tihamah & the Syrian frontier; their battles, treaties, and entry into Islam.',
    relatedChartTitleEn: 'Greater Arabia Tribes Chart',
    subsectionsEn: {
      'banu-thaqif': {
        titleEn: 'Banu Thaqif (City of Ta\'if)',
        subtitleEn: 'Idol of al-Lat, Battle of Hunayn, Siege of Ta\'if & acceptance of Islam',
        badgeEn: 'Ta\'if Region',
        figuresPreviewEn: ['Urwah ibn Mas\'ud (RA)', 'Al-Mughirah ibn Shu\'bah (RA)']
      },
      'banu-hawazin-saad': {
        titleEn: 'Banu Hawazin & Banu Sa\'d',
        subtitleEn: 'Foster-mother Halimah as-Sa\'diyyah, pure Arabic & Battle of Hunayn',
        badgeEn: 'Foster-Mother\'s Tribe',
        figuresPreviewEn: ['Halimah as-Sa\'diyyah (RA)', 'Malik ibn Awf (RA)', 'Ash-Shayma']
      },
      'banu-khuzaa-bakr': {
        titleEn: 'Banu Khuza\'ah & Banu Bakr',
        subtitleEn: 'Treaty of Hudaybiyyah allies & immediate backdrop to the Conquest of Makkah',
        badgeEn: 'Hudaybiyyah Allies',
        figuresPreviewEn: ['Amr ibn Salim (RA)', 'Budayl ibn Waraqah (RA)']
      },
      'banu-ghifar-daws': {
        titleEn: 'Banu Ghifar & Banu Daws',
        subtitleEn: 'Trade-route pioneer Abu Dharr & foremost Hadith narrator Abu Hurayrah (RA)',
        badgeEn: 'Trade Route & South Arabia',
        figuresPreviewEn: ['Abu Dharr al-Ghifari (RA)', 'Abu Hurayrah (RA)', 'Tufayl ibn Amr (RA)']
      },
      'banu-tamim-kalb': {
        titleEn: 'Banu Tamim & Banu Kalb',
        subtitleEn: 'Najd\'s steadfast hero Khabbab, Zayd ibn Harithah & Dihyah al-Kalbi (RA)',
        badgeEn: 'Najd & Sham Border',
        figuresPreviewEn: ['Khabbab ibn al-Aratt (RA)', 'Zayd ibn Harithah (RA)', 'Dihyah al-Kalbi (RA)']
      },
      'banu-ghatfan-hanifa': {
        titleEn: 'Banu Ghatafan & Banu Hanifah',
        subtitleEn: '1,000 confederate cavalry at Trench & fall of Musaylimah at Yamamah',
        badgeEn: 'Trench & Yamamah',
        figuresPreviewEn: ['Nu\'aym ibn Mas\'ud (RA)', 'Thumamah ibn Uthal (RA)', 'Musaylimah al-Kadhdhab']
      },
      'chart-arab-map': {
        titleEn: 'Greater Arabia Tribes Overview Chart',
        subtitleEn: 'Geopolitical locations, context & history of 11 major regional tribes',
        badgeEn: 'Visual Overview'
      }
    }
  },
  'topic-appendix40': {
    topicTitleEn: 'Historical Encyclopedia of 40 Arabian Tribes (Appendix 1–40)',
    themeBadgeEn: '40 Tribes Comprehensive Encyclopedia',
    summaryEn: 'Complete encyclopedia of 40 major Arabian tribes, regions, Sahaba & historical figures based on al-Isabah, Usd al-Ghabah & Ibn Hisham.',
    relatedChartTitleEn: 'Personalities Bar Chart',
    subsectionsEn: {
      'appendix-quraysh-hijaz': {
        titleEn: 'Quraysh & Hijazi Tribes of Makkah',
        subtitleEn: 'Hashim, Umayyah, Makhzum, Adi, Taym, Asad, Zuhrah, Jumah, Sahm & Abd al-Dar',
        badgeEn: '10 Quraysh Clans',
        figuresPreviewEn: ['Rightly-Guided Caliphs', 'Ashara Mubashshara', 'Mothers of the Believers']
      },
      'appendix-madinah-ansar': {
        titleEn: 'Madinan Ansar & Allied Border Tribes',
        subtitleEn: 'Khazraj, Aws, Juhaynah, Muzaynah, Ashja & allied clans',
        badgeEn: 'Ansar & Allies',
        figuresPreviewEn: ['Sa\'d ibn Mu\'adh', 'Abu Ayyub', 'Abdullah ibn Amr']
      },
      'appendix-najd-central': {
        titleEn: 'Central Arabia & Najd Tribes',
        subtitleEn: 'Tamim, Hawazin, Ghatafan, Banu Sa\'d, Sulaym, Bahilah & central Bedouin tribes',
        badgeEn: 'Najd & Tihamah',
        figuresPreviewEn: ['Khabbab ibn al-Aratt', 'Al-Aqra ibn Habis', 'Abbas ibn Mirdas']
      },
      'appendix-south-yemen': {
        titleEn: 'Southern Arabia & Yemeni Tribes',
        subtitleEn: 'Daws, Aslam, Ash\'ari, Hamdan, Bajilah, Khath\'am, Kindah & southern peninsula',
        badgeEn: 'Yemen & South Arabia',
        figuresPreviewEn: ['Abu Hurayrah', 'Abu Musa al-Ash\'ari', 'Jarir ibn Abdullah']
      },
      'appendix-north-sham': {
        titleEn: 'Northern Arabia & Sham Border Tribes',
        subtitleEn: 'Kalb, Khuza\'ah, Judham, Bali, Quda\'ah, Tayy & Syrian frontier clans',
        badgeEn: 'North Arabia & Sham',
        figuresPreviewEn: ['Zayd ibn Harithah', 'Dihyah al-Kalbi', 'Adi ibn Hatim at-Ta\'i']
      },
      'chart-statistics': {
        titleEn: 'Comparative Personalities Bar Chart',
        subtitleEn: 'Statistical chart comparing prominent Sahaba & figures across 40 tribes',
        badgeEn: 'Statistical Chart'
      }
    }
  }
};

export function getTocTopicEn(topicId: string): TocTopicEnEntry | undefined {
  return TOPIC_TOC_ENGLISH_MAP[topicId];
}

export function getTocSubsectionEn(
  topicId: string,
  subId: string,
  titleBn: string
): TocSubsectionEnEntry | undefined {
  const topicEn = TOPIC_TOC_ENGLISH_MAP[topicId];
  if (!topicEn) return undefined;
  if (topicEn.subsectionsByTitleEn && topicEn.subsectionsByTitleEn[titleBn]) {
    return topicEn.subsectionsByTitleEn[titleBn];
  }
  return topicEn.subsectionsEn[subId];
}

export const SPECIAL_CROSS_INDEX_EN: Record<string, {
  nameEn: string;
  clanEn: string;
  ancestorIntersectionEn: string;
  significanceEn: string;
}> = {
  'ash-1': {
    nameEn: 'Abu Bakr as-Siddiq (RA)',
    clanEn: 'Banu Taym ibn Murrah',
    ancestorIntersectionEn: 'Murrah ibn Ka\'b (6th Gen)',
    significanceEn: 'Greatest human of the Ummah after the Prophets, first Caliph of Islam, and faithful companion in the Cave.'
  },
  'ash-2': {
    nameEn: 'Umar ibn al-Khattab (RA)',
    clanEn: 'Banu Adi ibn Ka\'b',
    ancestorIntersectionEn: 'Ka\'b ibn Lu\'ayy (7th Gen)',
    significanceEn: 'Amir al-Mu\'minin al-Faruq, before whose footsteps even Satan altered his path.'
  },
  'ash-3': {
    nameEn: 'Uthman ibn Affan (RA)',
    clanEn: 'Banu Umayyah / Abd Shams',
    ancestorIntersectionEn: 'Abd Manaf (2nd Gen)',
    significanceEn: 'Dhun-Nurayn (Possessor of Two Lights), compiler of the Uthmanic Mushaf, and famously generous Caliph.'
  },
  'ash-4': {
    nameEn: 'Ali ibn Abi Talib (RA)',
    clanEn: 'Banu Hashim (Ahl al-Bayt)',
    ancestorIntersectionEn: 'Abdul Muttalib (1st Gen)',
    significanceEn: 'Asadullah al-Ghalib (Invincible Lion of Allah), Gate of Knowledge, and fourth rightly-guided Caliph.'
  },
  'ash-5': {
    nameEn: 'Talhah ibn Ubaydullah (RA)',
    clanEn: 'Banu Taym ibn Murrah',
    ancestorIntersectionEn: 'Murrah ibn Ka\'b (6th Gen)',
    significanceEn: 'The "Living Martyr" who shielded the Prophet (PBUH) at Uhud until his hand was paralyzed.'
  },
  'ash-6': {
    nameEn: 'Az-Zubayr ibn al-Awwam (RA)',
    clanEn: 'Banu Asad ibn Abd al-Uzza',
    ancestorIntersectionEn: 'Qusayy ibn Kilab (4th Gen)',
    significanceEn: 'Devoted disciple (Hawari) of the Messenger of Allah (PBUH) and valiant son of Safiyyah (RA).'
  },
  'ash-7': {
    nameEn: 'Abdur Rahman ibn Awf (RA)',
    clanEn: 'Banu Zuhrah ibn Kilab',
    ancestorIntersectionEn: 'Kilab ibn Murrah (5th Gen)',
    significanceEn: 'Foremost philanthropist and righteous merchant of Islamic history who spent his wealth freely in Allah\'s path.'
  },
  'ash-8': {
    nameEn: 'Sa\'d ibn Abi Waqqas (RA)',
    clanEn: 'Banu Zuhrah ibn Kilab',
    ancestorIntersectionEn: 'Kilab ibn Murrah (5th Gen)',
    significanceEn: 'First archer in the path of Allah, one whose supplications were answered, and victor at al-Qadisiyyah.'
  },
  'ash-9': {
    nameEn: 'Sa\'id ibn Zayd (RA)',
    clanEn: 'Banu Adi ibn Ka\'b',
    ancestorIntersectionEn: 'Ka\'b ibn Lu\'ayy (7th Gen)',
    significanceEn: 'Son of the hanif Zayd ibn Amr and key commander during the conquest of Damascus.'
  },
  'ash-10': {
    nameEn: 'Abu Ubaydah ibn al-Jarrah (RA)',
    clanEn: 'Banu al-Harith ibn Fihr',
    ancestorIntersectionEn: 'Fihr ibn Malik (10th Gen)',
    significanceEn: 'Honored by the Prophet (PBUH) as "Amin al-Ummah" (the most trustworthy custodian of this Ummah).'
  },
  'umm-1': {
    nameEn: 'Khadijah al-Kubra (RA)',
    clanEn: 'Banu Asad ibn Abd al-Uzza',
    ancestorIntersectionEn: 'Qusayy ibn Kilab (4th Gen)',
    significanceEn: 'First wife of the Prophet (PBUH), first believer in Islam, and Chief of the Women of the Worlds.'
  },
  'umm-2': {
    nameEn: 'Sawdah bint Zam\'ah (RA)',
    clanEn: 'Banu Amir ibn Lu\'ayy',
    ancestorIntersectionEn: 'Lu\'ayy ibn Ghalib (8th Gen)',
    significanceEn: 'Devoted Mother of the Believers who joined the Prophet\'s household in Makkah prior to Hijrah.'
  },
  'umm-3': {
    nameEn: 'Aishah as-Siddiqah (RA)',
    clanEn: 'Banu Taym ibn Murrah',
    ancestorIntersectionEn: 'Murrah ibn Ka\'b (6th Gen)',
    significanceEn: 'Foremost female jurist and scholar of the Ummah through whom a quarter of Islamic rulings were transmitted.'
  },
  'umm-4': {
    nameEn: 'Hafsah bint Umar (RA)',
    clanEn: 'Banu Adi ibn Ka\'b',
    ancestorIntersectionEn: 'Ka\'b ibn Lu\'ayy (7th Gen)',
    significanceEn: 'Honored custodian of the original compiled handwritten manuscript of the Holy Quran (Mushaf Hafsah).'
  },
  'umm-5': {
    nameEn: 'Umm Salamah Hind (RA)',
    clanEn: 'Banu Makhzum ibn Yaqazah',
    ancestorIntersectionEn: 'Murrah ibn Ka\'b (6th Gen)',
    significanceEn: 'Wise Mother of the Believers whose decisive counsel guided the Prophet (PBUH) during the crisis at Hudaybiyyah.'
  },
  'umm-6': {
    nameEn: 'Umm Habibah Ramlah (RA)',
    clanEn: 'Banu Umayyah / Abd Shams',
    ancestorIntersectionEn: 'Abd Manaf (2nd Gen)',
    significanceEn: 'Steadfast believer who migrated to Abyssinia and upheld the banner of Islam inside Abu Sufyan\'s household.'
  },
  'umm-7': {
    nameEn: 'Juwayriyyah bint al-Harith (RA)',
    clanEn: 'Banu al-Mustaliq (Khuza\'ah Branch)',
    ancestorIntersectionEn: 'Khuza\'ah Tribe',
    significanceEn: 'Through the blessing of her marriage, hundreds of captives from her entire tribe were freed in an instant.'
  },
  'umm-8': {
    nameEn: 'Safiyyah bint Huyayy (RA)',
    clanEn: 'Banu Nadir & Descendant of Prophet Harun (AS)',
    ancestorIntersectionEn: 'Banu Israel (Prophet Harun AS)',
    significanceEn: 'Joined the noble household of the Prophet (PBUH) after the victory of Khaybar and became a Mother of the Believers.'
  },
  'umm-9': {
    nameEn: 'Maymunah bint al-Harith (RA)',
    clanEn: 'Banu Hilal ibn Amir',
    ancestorIntersectionEn: 'Banu Hilal',
    significanceEn: 'The final Mother of the Believers, wed at Sarif during the journey of Umrat al-Qada.'
  }
};

export const QURAYSH_CONVERGENCE_EN: Record<number, {
  ancestorNameEn: string;
  significanceEn: string;
  hadithOrHistoryNoteEn?: string;
  branches: { clanNameEn: string; roleTitleEn: string; prominentSahabaEn: string[] }[];
}> = {
  1: {
    ancestorNameEn: 'Abdul Muttalib (Shaybat al-Hamd)',
    significanceEn: 'Re-excavator of the Sacred Zamzam Well and guardian of the Kaaba during the Year of the Elephant',
    hadithOrHistoryNoteEn: 'Through Abdul Muttalib\'s son Abdullah came Prophet Muhammad (PBUH), and through Abu Talib came Ali and Ja\'far (RA).',
    branches: [
      {
        clanNameEn: 'Banu Hashim (Sacred Ahl al-Bayt)',
        roleTitleEn: 'Prophethood, Ahl al-Bayt & Siqayah (Watering Pilgrims)',
        prominentSahabaEn: [
          'Prophet Muhammad (PBUH) [Seal of the Prophets]',
          'Ali ibn Abi Talib (RA) [4th Caliph]',
          'Hamzah ibn Abdul Muttalib (RA) [Chief of Martyrs]',
          'Ja\'far ibn Abi Talib (RA) [Martyr of Mu\'tah]',
          'Al-Abbas ibn Abdul Muttalib (RA) [Prophet\'s Uncle]'
        ]
      }
    ]
  },
  2: {
    ancestorNameEn: 'Abd Manaf ibn Qusayy',
    significanceEn: 'Foremost noble and generous chief of Quraysh (given name: al-Mughirah)',
    hadithOrHistoryNoteEn: 'Uthman ibn Affan\'s (RA) lineage connects with the Prophet (PBUH) at the 2nd generation via Abd Shams ibn Abd Manaf.',
    branches: [
      {
        clanNameEn: 'Banu Umayyah / Banu Abd Shams',
        roleTitleEn: 'Carrying the War Banner "Al-Uqab" & Supreme Command',
        prominentSahabaEn: [
          'Uthman ibn Affan (RA) [3rd Caliph & Dhun-Nurayn]',
          'Umm al-Mu\'minin Umm Habibah (RA)',
          'Abu Sufyan ibn Harb (RA)',
          'Mu\'awiyah ibn Abi Sufyan (RA)'
        ]
      },
      {
        clanNameEn: 'Banu al-Muttalib ibn Abd Manaf',
        roleTitleEn: 'Steadfast Allies of Banu Hashim at Shi\'b Abi Talib',
        prominentSahabaEn: [
          'Ubaydah ibn al-Harith (RA) [First Martyr at Badr]',
          'Paternal clan of Imam al-Shafi\'i (RH)'
        ]
      },
      {
        clanNameEn: 'Banu Nawfal ibn Abd Manaf',
        roleTitleEn: 'Diplomatic Envoys & International Trade Pacts',
        prominentSahabaEn: [
          'Jubayr ibn Mut\'im (RA) [Renowned Sahabi & Genealogist]',
          'Mut\'im ibn Adi [Granted protection to the Prophet returning from Ta\'if]'
        ]
      }
    ]
  },
  4: {
    ancestorNameEn: 'Qusayy ibn Kilab (Zayd)',
    significanceEn: 'Unifier of Quraysh in Makkah (al-Mujammi\') and founder of Dar al-Nadwah',
    hadithOrHistoryNoteEn: 'Umm al-Mu\'minin Khadijah (RA) and heroic champion az-Zubayr (RA) connect to the Prophet\'s lineage at the 4th generation via Qusayy ibn Kilab.',
    branches: [
      {
        clanNameEn: 'Banu Asad ibn Abd al-Uzza',
        roleTitleEn: 'Dar al-Nadwah Counsel & Noble Leadership',
        prominentSahabaEn: [
          'Umm al-Mu\'minin Khadijah al-Kubra (RA) [First Believer]',
          'Az-Zubayr ibn al-Awwam (RA) [Hawari of the Prophet & Ashara]',
          'Waraqah ibn Nawfal [Hanif & Scholar of Scripture]'
        ]
      },
      {
        clanNameEn: 'Banu Abd al-Dar ibn Qusayy',
        roleTitleEn: 'Kaaba Keys (Sidanah) & War Standard (Liwa)',
        prominentSahabaEn: [
          'Mus\'ab ibn Umayr (RA) [First Ambassador to Madinah & Badr Flagbearer]',
          'Uthman ibn Talhah (RA) [Custodian of the Keys of the Kaaba]'
        ]
      }
    ]
  },
  5: {
    ancestorNameEn: 'Kilab ibn Murrah (Hakim)',
    significanceEn: 'Courageous chieftain and central trunk of Makkan nobility',
    hadithOrHistoryNoteEn: 'The Prophet (PBUH) said: "Sa\'d is my maternal uncle; let anyone show me an uncle like mine!" — (Jami\' at-Tirmidhi)',
    branches: [
      {
        clanNameEn: 'Banu Zuhrah ibn Kilab',
        roleTitleEn: 'Maternal Clan of the Prophet (PBUH)',
        prominentSahabaEn: [
          'Sa\'d ibn Abi Waqqas (RA) [First Archer & Ashara]',
          'Abdur Rahman ibn Awf (RA) [Great Philanthropist & Ashara]',
          'Sayyidah Aminah bint Wahb [Blessed Mother of the Prophet PBUH]'
        ]
      }
    ]
  },
  6: {
    ancestorNameEn: 'Murrah ibn Ka\'b',
    significanceEn: 'Convergence root for vast Quraysh branches producing two mighty pillars of Islam',
    hadithOrHistoryNoteEn: 'Abu Bakr (RA), Talhah (RA), and Khalid ibn al-Walid (RA) merge with the Prophet\'s root at the 6th generation in Murrah ibn Ka\'b.',
    branches: [
      {
        clanNameEn: 'Banu Taym ibn Murrah',
        roleTitleEn: 'Blood Money (Diyat) & Financial Arbitration',
        prominentSahabaEn: [
          'Abu Bakr as-Siddiq (RA) [1st Caliph & Greatest Human after Prophets]',
          'Talhah ibn Ubaydullah (RA) [Living Martyr & Ashara]',
          'Umm al-Mu\'minin Aishah as-Siddiqah (RA)'
        ]
      },
      {
        clanNameEn: 'Banu Makhzum ibn Yaqazah ibn Murrah',
        roleTitleEn: 'Cavalry Command (Al-A\'innah) & Encampment (Al-Qubbah)',
        prominentSahabaEn: [
          'Khalid ibn al-Walid (RA) [Sayfullah - Drawn Sword of Allah]',
          'Umm al-Mu\'minin Umm Salamah (RA)',
          'Ikrimah ibn Abi Jahl (RA) [Hero of Yarmouk]'
        ]
      }
    ]
  },
  7: {
    ancestorNameEn: 'Ka\'b ibn Lu\'ayy',
    significanceEn: 'First among Quraysh to convene Friday gatherings (Yawm al-Arubah) and foretell the Prophet\'s coming',
    hadithOrHistoryNoteEn: 'Umar al-Faruq (RA) and Sa\'id ibn Zayd (RA) of Ashara Mubashshara merge at the 7th generation via Ka\'b ibn Lu\'ayy.',
    branches: [
      {
        clanNameEn: 'Banu Adi ibn Ka\'b',
        roleTitleEn: 'Diplomacy (As-Sifarah), Envoys & Arbitration',
        prominentSahabaEn: [
          'Umar ibn al-Khattab (RA) [2nd Caliph & al-Faruq]',
          'Sa\'id ibn Zayd (RA) [Ashara Mubashshara]',
          'Umm al-Mu\'minin Hafsah bint Umar (RA)',
          'Abdullah ibn Umar (RA) [Leading Jurist]'
        ]
      }
    ]
  },
  8: {
    ancestorNameEn: 'Lu\'ayy ibn Ghalib',
    significanceEn: 'Ancient guardian of Makkah; progenitor of the Sahm, Jumah, and Amir clans',
    branches: [
      {
        clanNameEn: 'Banu Sahm ibn Amr',
        roleTitleEn: 'Treasury Management & Sacred Offerings (Muqawah / Amwal)',
        prominentSahabaEn: [
          'Amr ibn al-As (RA) [Conqueror of Egypt]',
          'Abdullah ibn Amr ibn al-As (RA) [Author of Sahifah as-Sadiqah]'
        ]
      },
      {
        clanNameEn: 'Banu Jumah ibn Amr',
        roleTitleEn: 'Divination Arrows Office (Al-Azlam / Aysar)',
        prominentSahabaEn: [
          'Uthman ibn Maz\'un (RA) [First Muhajir buried in Jannat al-Baqi\']',
          'Khubayb ibn Adi (RA)'
        ]
      },
      {
        clanNameEn: 'Banu Amir ibn Lu\'ayy',
        roleTitleEn: 'Foremost Orators & Political Spokesmen of Makkah',
        prominentSahabaEn: [
          'Suhayl ibn Amr (RA) [Negotiator at Hudaybiyyah & Noble Companion]',
          'Umm al-Mu\'minin Sawdah bint Zam\'ah (RA)'
        ]
      }
    ]
  },
  10: {
    ancestorNameEn: 'Fihr ibn Malik (Titled "Quraysh")',
    significanceEn: 'Patriarch of the Quraysh tribe whose descendants bear the historical title of Quraysh',
    hadithOrHistoryNoteEn: 'Abu Ubaydah ibn al-Jarrah (RA) of Ashara Mubashshara converges directly at the 10th generation with "Fihr" (Quraysh) himself.',
    branches: [
      {
        clanNameEn: 'Banu al-Harith ibn Fihr',
        roleTitleEn: 'Military Command & Trustworthiness of the Ummah',
        prominentSahabaEn: [
          'Abu Ubaydah ibn al-Jarrah (RA) [Amin al-Ummah & Ashara]',
          'Iyad ibn Ghanm (RA) [Conqueror of Syria & Mesopotamia]'
        ]
      }
    ]
  }
};

export const BANU_HASHIM_GENEALOGY_EN = {
  rootName: 'Hashim ibn Abd Manaf',
  son: {
    name: 'Abdul Muttalib',
    title: 'Chief of Quraysh & Banu Hashim (Restorer of Zamzam Well)',
    sons: [
      {
        name: 'Abdullah',
        desc: 'Honored Father of the Messenger of Allah (PBUH)',
        badge: 'Noble Forefather',
        children: [
          {
            name: 'Muhammad Messenger of Allah (PBUH)',
            title: 'Sayyid al-Mursalin & Mercy to the Worlds',
            badge: 'Seal of the Prophets',
            children: [
              {
                name: 'Fatimah az-Zahra (RA)',
                title: 'Leader of the Women of Paradise',
                marriageTo: 'Ali ibn Abi Talib (RA)',
                sons: ['Al-Hasan (RA)', 'Al-Husayn (RA)'],
                badge: 'Ahl al-Bayt'
              }
            ]
          }
        ]
      },
      {
        name: 'Abu Talib',
        desc: 'Guardian and lifelong protector of the Prophet (PBUH)',
        badge: 'Protector',
        children: [
          { name: 'Ali ibn Abi Talib (RA)', title: '4th Caliph & Gate of Knowledge', badge: 'Asadullah' },
          { name: 'Ja\'far ibn Abi Talib (RA)', title: 'Martyr of Mu\'tah & Dhul-Janahayn', badge: 'Martyr of Mu\'tah' },
          { name: 'Aqil ibn Abi Talib (RA)', title: 'Companion & Master Genealogist', badge: 'Sahabi' },
          { name: 'Umm Hani (RA)', title: 'Fakhitah bint Abi Talib (Night of Isra)', badge: 'Sahabiyyah' }
        ]
      },
      {
        name: 'Hamzah (RA)',
        desc: 'Asadullah (Lion of Allah) & Great Martyr of Uhud',
        badge: 'Chief of Martyrs',
        children: []
      },
      {
        name: 'Al-Abbas (RA)',
        desc: 'Noble Custodian of Pilgrim Watering (Siqayah)',
        badge: 'Prophet\'s Uncle',
        children: [
          { name: 'Abdullah ibn Abbas (RA)', title: 'Chief of Exegetes & Scholar of the Ummah', badge: 'Mufassir' },
          { name: 'Al-Fadl ibn al-Abbas (RA)', title: 'Mount companion of the Prophet at Farewell Hajj', badge: 'Sahabi' }
        ]
      },
      {
        name: 'Abu Lahab',
        desc: 'Abd al-Uzza (Open opponent rebuked in Surah al-Masad)',
        badge: 'Arch-Opponent',
        children: []
      }
    ]
  }
};

export const ANSAR_GENEALOGY_EN = {
  ancestor: 'Azd Tribe (الأزد - Ancient Yemen & Dam of Ma\'rib)',
  branches: [
    {
      name: 'Banu Khazraj (الخزرج)',
      subClans: [
        { name: 'Banu an-Najjar (بنو النجار)', leader: 'Abu Ayyub al-Ansari (RA)', note: 'Maternal clan of the Prophet (PBUH) & site of Al-Masjid an-Nabawi' },
        { name: 'Banu Salamah (بنو سلمة)', leader: 'Jabir ibn Abdullah (RA)', note: 'Quarter of Masjid al-Qiblatayn & clan of Jabir (RA)' },
        { name: 'Banu Sa\'idah (بنو ساعدة)', leader: 'Sa\'d ibn Ubadah (RA)', note: 'Saqifah Bani Sa\'idah & foremost generous chieftains of the Ansar' },
        { name: 'Banu Zurayq (بنو زريق)', leader: 'Rafi\' ibn Malik (RA)', note: 'Honorably the first clan to recite the Quran in Madinah' }
      ]
    },
    {
      name: 'Banu Aws (الأوس)',
      subClans: [
        { name: 'Banu Abd al-Ashhal (بنو عبد الأشهل)', leader: 'Sa\'d ibn Mu\'adh (RA)', note: 'Leader of the Ansar whose passing shook the Throne of Allah' },
        { name: 'Banu Zafar & Mu\'awiyah (بنو ظفر)', leader: 'Qatadah ibn an-Nu\'man (RA)', note: 'Miracle of the restored eye at Uhud & warrior of Badr' },
        { name: 'Banu Awf & Banu Harithah (بنو عوف)', leader: 'Hanzalah (RA) & Muhammad ibn Maslamah (RA)', note: 'Ghasil al-Mala\'ikah Hanzalah & frontier defender Muhammad ibn Maslamah' }
      ]
    }
  ]
};

export const ARABIAN_GEO_REGIONS_EN: Record<string, {
  shortNameEn: string;
  nameEn: string;
  detailsEn: string;
  dominantTribesEn: string[];
  historicalEventsEn: string[];
  prominentSahabaEn: string[];
}> = {
  'geo-makkah': {
    shortNameEn: 'Makkah',
    nameEn: 'Makkah al-Mukarramah & Sacred Haram',
    detailsEn: 'Spiritual and commercial heart of the Arabian Peninsula. Ten Quraysh branches administered the sanctuaries around the Holy Kaaba.',
    dominantTribesEn: ['Quraysh (Banu Hashim, Umayyah, Makhzum, Adi, Taym, Zuhrah, Asad)'],
    historicalEventsEn: ['Building of the Kaaba', 'Birth & Prophethood of Muhammad (PBUH)', 'Hilf al-Fudul', 'Conquest of Makkah (8 AH)'],
    prominentSahabaEn: ['Prophet Muhammad (PBUH)', 'Abu Bakr (RA)', 'Umar (RA)', 'Uthman (RA)', 'Ali (RA)', 'Khadijah (RA)']
  },
  'geo-madinah': {
    shortNameEn: 'Madinah',
    nameEn: 'al-Madinah al-Munawwarah (Yathrib)',
    detailsEn: 'Fertile oasis city surrounded by date groves. The Aws and Khazraj of Yemen\'s Azd lineage embraced Islam and earned the title "Ansar" (The Helpers).',
    dominantTribesEn: ['Banu Khazraj', 'Banu Aws (Ansar)', 'Banu Qaynuqa', 'Banu Nadir', 'Banu Qurayzah'],
    historicalEventsEn: ['The Hijrah (622 CE)', 'Constitution of Madinah', 'Construction of Masjid an-Nabawi', 'Defense at Badr, Uhud & Trench'],
    prominentSahabaEn: ['Sa\'d ibn Mu\'adh (RA)', 'Sa\'d ibn Ubadah (RA)', 'Abu Ayyub al-Ansari (RA)', 'Jabir (RA)']
  },
  'geo-taif': {
    shortNameEn: 'Ta\'if',
    nameEn: 'At-Ta\'if (Wadi Wajj)',
    detailsEn: 'Cool highland city famed for orchards near Makkah; summer retreat of Quraysh and fortified stronghold of Banu Thaqif.',
    dominantTribesEn: ['Banu Thaqif (Ahlaf & Banu Malik)'],
    historicalEventsEn: ['Prophet\'s Journey to Ta\'if', 'Idol Sanctuary of al-Lat', 'Siege of Ta\'if (8 AH)', 'Call of Urwah ibn Mas\'ud'],
    prominentSahabaEn: ['Urwah ibn Mas\'ud (RA)', 'Al-Mughirah ibn Shu\'bah (RA)', 'Uthman ibn Abi al-As (RA)']
  },
  'geo-hawazin': {
    shortNameEn: 'Hawazin',
    nameEn: 'Hawazin & Valley of Hunayn',
    detailsEn: 'Guardian tribe of the purest classical Arabic tongue. Initially confronted the Muslim army at Hunayn, then embraced Islam wholeheartedly.',
    dominantTribesEn: ['Banu Hawazin', 'Banu Sa\'d ibn Bakr', 'Banu Nasr'],
    historicalEventsEn: ['Prophet\'s Infancy among Banu Sa\'d', 'Historic Battle of Hunayn (8 AH)'],
    prominentSahabaEn: ['Halimah as-Sa\'diyyah (RA) [Foster-Mother]', 'Shayma bint al-Harith (RA)', 'Malik ibn Awf (RA)']
  },
  'geo-najd': {
    shortNameEn: 'Najd',
    nameEn: 'Najd & Central Arabian Plateau',
    detailsEn: 'Most populous warrior plateau of Arabia; homeland of famed Arabian poets and skilled archers.',
    dominantTribesEn: ['Banu Tamim', 'Banu Ghatafan', 'Banu Asad ibn Khuzaymah', 'Banu Abs & Dhubyan'],
    historicalEventsEn: ['Confederate Coalition at Battle of Trench', 'Ridda Campaigns & Pacification'],
    prominentSahabaEn: ['Khabbab ibn al-Aratt (RA)', 'Al-Aqra ibn Habis (RA)', 'Hudhayfah ibn al-Yaman (RA)']
  },
  'geo-yamama': {
    shortNameEn: 'Yamamah',
    nameEn: 'Al-Yamamah Region',
    detailsEn: 'Fertile grain storehouse of east-central Arabia. Abu Bakr (RA) dispatched Khalid ibn al-Walid to crush Musaylimah\'s rebellion here.',
    dominantTribesEn: ['Banu Hanifah'],
    historicalEventsEn: ['Rise of False Prophet Musaylimah', 'Fierce Battle of Yamamah (12 AH)', 'Martyrdom of Hundreds of Huffaz'],
    prominentSahabaEn: ['Thumamah ibn Uthal (RA) [Converted Chieftain]']
  },
  'geo-tihamah': {
    shortNameEn: 'Tihamah',
    nameEn: 'Tihamah & Red Sea Coast',
    detailsEn: 'Coastal mountain passes along the Red Sea. Banu Ghifar controlled caravan corridors and collectively migrated to Madinah to accept Islam.',
    dominantTribesEn: ['Banu Ghifar', 'Banu Kinanah', 'Banu Khuza\'ah', 'Banu Ashja'],
    historicalEventsEn: ['Syrian Caravan Route Interdiction', 'Alliance with Khuza\'ah at Hudaybiyyah', 'Preparation for Conquest of Makkah'],
    prominentSahabaEn: ['Abu Dharr al-Ghifari (RA) [Ascetic Companion]', 'Buraydah al-Aslami (RA)']
  },
  'geo-yemen': {
    shortNameEn: 'Yemen',
    nameEn: 'Yemen & Southern Arabia (Hadhramaut)',
    detailsEn: 'Blessed cradle of ancient wisdom and learning. The Prophet (PBUH) said: "Faith is Yemeni and wisdom is Yemeni!" — (Sahih Bukhari)',
    dominantTribesEn: ['Banu Daws', 'Himyar', 'Banu Bajilah', 'Madhhij', 'Kindah', 'Al-Ash\'ariyyun'],
    historicalEventsEn: ['Missions of Mu\'adh ibn Jabal & Ali (RA)', 'Destruction of Dhul-Khalasah Idol', 'Prophet\'s Supplication for Yemen'],
    prominentSahabaEn: ['Abu Hurayrah (RA) [Top Hadith Narrator]', 'Tufayl ibn Amr ad-Dawsi (RA)', 'Jarir ibn Abdullah (RA)', 'Abu Musa al-Ash\'ari (RA)']
  },
  'geo-north-sham': {
    shortNameEn: 'Sham Border',
    nameEn: 'Northern Frontier & Dumat al-Jandal',
    detailsEn: 'Strategic northern frontier bordering the Byzantine Empire; primary gateway for the global spread of Islam.',
    dominantTribesEn: ['Banu Kalb', 'Ghassanids', 'Lakhmids'],
    historicalEventsEn: ['Expedition of Dumat al-Jandal', 'Tabuk Expedition (9 AH)', 'Battles of Mu\'tah & Yarmouk'],
    prominentSahabaEn: ['Zayd ibn Harithah (RA)', 'Usamah ibn Zayd (RA)', 'Dihyah al-Kalbi (RA)']
  },
  'geo-khaybar': {
    shortNameEn: 'Khaybar',
    nameEn: 'Khaybar & Fadak Oases',
    detailsEn: 'Heavily fortified stone strongholds and lush palm oasis settlement brought under Muslim authority in 7 AH.',
    dominantTribesEn: ['Jewish Tribes of Khaybar', 'Remnants of Banu Nadir'],
    historicalEventsEn: ['Battle of Khaybar (7 AH)', 'Conquest of Qamus Fortress', 'Heroism of Ali ibn Abi Talib (RA)'],
    prominentSahabaEn: ['Ali ibn Abi Talib (RA)', 'Umm al-Mu\'minin Safiyyah bint Huyayy (RA)']
  }
};

export const TRIBE_STATISTICS_EN: { nameEn: string; chapterEn: string }[] = [
  { nameEn: '1. Banu Hashim & Banu al-Muttalib', chapterEn: 'Quraysh of Makkah' },
  { nameEn: '2. Banu Abd Shams / Banu Umayyah', chapterEn: 'Quraysh of Makkah' },
  { nameEn: '3. Banu Makhzum', chapterEn: 'Quraysh of Makkah' },
  { nameEn: '4. Banu Adi & Banu Taym', chapterEn: 'Quraysh of Makkah' },
  { nameEn: '5. Banu Asad & Banu Zuhrah', chapterEn: 'Quraysh of Makkah' },
  { nameEn: '6. Banu Khazraj Tribe', chapterEn: 'Ansar of Madinah' },
  { nameEn: '7. Banu Aws Tribe', chapterEn: 'Ansar of Madinah' },
  { nameEn: '8. Ta\'if, Hawazin & Regional', chapterEn: 'Other Arabian Tribes' },
  { nameEn: '9. Jewish Tribes of Madinah & Khaybar', chapterEn: 'Madinah & Khaybar' },
  { nameEn: '10. Other Quraysh Branches', chapterEn: 'Quraysh of Makkah' },
  { nameEn: '11. Banu Khuza\'ah & Banu Bakr', chapterEn: 'Hudaybiyyah & Makkah' },
  { nameEn: '12. Banu Ghifar, Aslam & Banu Daws', chapterEn: 'Bedouin & South Arabia' },
  { nameEn: '13. Banu Ghatafan & Banu Hanifah', chapterEn: 'Trench & Ridda Wars' }
];

