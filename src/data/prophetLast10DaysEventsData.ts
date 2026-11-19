export interface ProphetLast10DaysPhase {
  phaseNo: number;
  labelBn: string;
  labelEn: string;
  titleBn: string;
  titleEn: string;
  eventCount: number;
}

export interface ProphetLast10DaysEvent {
  eventNo: number;
  codeBn: string;
  phaseNo: number;
  phaseTagBn: string;
  phaseTagEn: string;
  titleBn: string;
  titleEn: string;
  pointsBn: string[];
  pointsEn: string[];
  sourceBn: string;
  sourceEn: string;
  /** হায়াতুস সাহাবা ডাটাবেজের সংশ্লিষ্ট সাহাবি আইডি সমূহ */
  sahabaIds: string[];
  /** এই ঘটনায় উল্লেখিত সাহাবিদের সংক্ষিপ্ত বাংলা নাম */
  sahabaLabelsBn: { id: string; nameBn: string; nameEn: string }[];
}

export const PROPHET_LAST_10_DAYS_PHASES: ProphetLast10DaysPhase[] = [
  {
    phaseNo: 1,
    labelBn: 'পর্ব ১',
    labelEn: 'Phase 1',
    titleBn: 'বিদায়ের ইঙ্গিত',
    titleEn: 'Signs of Farewell',
    eventCount: 4,
  },
  {
    phaseNo: 2,
    labelBn: 'পর্ব ২',
    labelEn: 'Phase 2',
    titleBn: 'অসুস্থতার শুরু',
    titleEn: 'Onset of Illness',
    eventCount: 2,
  },
  {
    phaseNo: 3,
    labelBn: 'পর্ব ৩',
    labelEn: 'Phase 3',
    titleBn: 'ইন্তেকালের ৫ দিন আগে',
    titleEn: '5 Days Before Passing',
    eventCount: 3,
  },
  {
    phaseNo: 4,
    labelBn: 'পর্ব ৪',
    labelEn: 'Phase 4',
    titleBn: 'ইন্তেকালের ৪ দিন আগে',
    titleEn: '4 Days Before Passing',
    eventCount: 5,
  },
  {
    phaseNo: 5,
    labelBn: 'পর্ব ৫',
    labelEn: 'Phase 5',
    titleBn: 'ইন্তেকালের ১–২ দিন আগে',
    titleEn: '1–2 Days Before Passing',
    eventCount: 3,
  },
  {
    phaseNo: 6,
    labelBn: 'পর্ব ৬',
    labelEn: 'Phase 6',
    titleBn: 'শেষ দিন · সোমবার',
    titleEn: 'The Final Day · Monday',
    eventCount: 9,
  },
  {
    phaseNo: 7,
    labelBn: 'পর্ব ৭',
    labelEn: 'Phase 7',
    titleBn: 'ইন্তেকালের পর',
    titleEn: 'After His Passing',
    eventCount: 9,
  },
];

/**
 * রাসূলুল্লাহ (সা.)-এর ইন্তেকালের আগের শেষ ১০ দিন — সম্পূর্ণ ৩৫টি ঘটনা
 * (বিদায়ের ইঙ্গিত থেকে দাফন পর্যন্ত, ধারাবাহিক টাইমলাইন ও সহীহ হাদিসের সূত্রসহ)
 */
export const PROPHET_LAST_10_DAYS_EVENTS: ProphetLast10DaysEvent[] = [
  // =========================================================================
  // পর্ব ১ · বিদায়ের ইঙ্গিত (৪টি ঘটনা — ০১–০৪/৩৫)
  // =========================================================================
  {
    eventNo: 1,
    codeBn: '০১ / ৩৫',
    phaseNo: 1,
    phaseTagBn: 'পর্ব ১ · বিদায়ের ইঙ্গিত',
    phaseTagEn: 'Phase 1 · Signs of Farewell',
    titleBn: 'সূরা নাসরে বিদায়ের ইঙ্গিত',
    titleEn: 'Sign of Farewell in Surah an-Nasr',
    pointsBn: [
      'সূরা আন-নাসর নাযিল হলে ইবনে আব্বাস (রা.) বুঝেছিলেন, এটি নবীজি (সা.)-এর বিদায় নিকটবর্তী হওয়ার ইঙ্গিত।',
      'উমর (রা.)-ও বলেন, ‘তুমি যা বুঝেছ, আমিও তা-ই বুঝি।’',
    ],
    pointsEn: [
      'When Surah an-Nasr was revealed, Ibn Abbas (RA) understood it signaled the approaching passing of the Prophet (PBUH).',
      'Umar (RA) affirmed, “I know of it only what you know.”',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৯৭০',
    sourceEn: 'Sahih al-Bukhari, Hadith 4970',
    sahabaIds: ['abdullah-ibn-abbas', 'umar-ibn-khattab'],
    sahabaLabelsBn: [
      { id: 'abdullah-ibn-abbas', nameBn: 'আব্দুল্লাহ ইবনে আব্বাস (রা.)', nameEn: 'Ibn Abbas (RA)' },
      { id: 'umar-ibn-khattab', nameBn: 'উমর ইবনুল খাত্তাব (রা.)', nameEn: 'Umar (RA)' },
    ],
  },
  {
    eventNo: 2,
    codeBn: '০২ / ৩৫',
    phaseNo: 1,
    phaseTagBn: 'পর্ব ১ · বিদায়ের ইঙ্গিত',
    phaseTagEn: 'Phase 1 · Signs of Farewell',
    titleBn: 'শেষ রমজানে দুবার কুরআন',
    titleEn: 'Quran Reviewed Twice in Final Ramadan',
    pointsBn: [
      'প্রতি রমজানে জিবরীল (আ.) একবার কুরআন শোনাতেন; জীবনের শেষ বছরে শোনালেন দুবার।',
      'নবীজি (সা.) ফাতিমা (রা.)-কে বলেন, ‘আমার মনে হয়, আমার সময় ঘনিয়ে এসেছে।’',
    ],
    pointsEn: [
      'Every Ramadan Jibril (AS) reviewed the Quran with him once; in his final year he reviewed it twice.',
      'The Prophet (PBUH) told Fatimah (RA), “I see nothing in this except that my time has drawn near.”',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬২৩–৩৬২৪',
    sourceEn: 'Sahih al-Bukhari, Hadith 3623–3624',
    sahabaIds: ['fatima-az-zahra', 'aisha-siddiqah'],
    sahabaLabelsBn: [
      { id: 'fatima-az-zahra', nameBn: 'ফাতিমা আয-যাহরা (রা.)', nameEn: 'Fatimah (RA)' },
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা সিদ্দিকাহ (রা.)', nameEn: 'Aishah (RA)' },
    ],
  },
  {
    eventNo: 3,
    codeBn: '০৩ / ৩৫',
    phaseNo: 1,
    phaseTagBn: 'পর্ব ১ · বিদায়ের ইঙ্গিত',
    phaseTagEn: 'Phase 1 · Signs of Farewell',
    titleBn: 'উহুদের শহীদদের বিদায়ী দোয়া',
    titleEn: 'Farewell Prayer for the Martyrs of Uhud',
    pointsBn: [
      'উহুদের আট বছর পর তিনি শহীদদের জন্য এমনভাবে দোয়া করেন, যেন জীবিত ও মৃত সবার কাছ থেকে বিদায় নিচ্ছেন।',
      'মিম্বারে বলেন, আমি তোমাদের আগে যাচ্ছি; ভয় করি তোমরা দুনিয়া নিয়ে প্রতিযোগিতায় মেতে উঠবে।',
    ],
    pointsEn: [
      'Eight years after Uhud, he prayed for its martyrs as one bidding farewell to both the living and the dead.',
      'On the pulpit he said: “I am going ahead of you; I fear that you will compete with one another over worldly wealth.”',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪০৪২',
    sourceEn: 'Sahih al-Bukhari, Hadith 4042',
    sahabaIds: [
      'hamza-ibn-abdul-muttalib',
      'musab-ibn-umair',
      'abdullah-ibn-jahsh',
      'hanjala-ibn-abi-amir',
      'hanzala-ibn-abi-amir',
      'anas-ibn-al-nadr',
    ],
    sahabaLabelsBn: [
      { id: 'hamza-ibn-abdul-muttalib', nameBn: 'হামযাহ (রা.)', nameEn: 'Hamzah (RA)' },
      { id: 'musab-ibn-umair', nameBn: 'মুসআব ইবনে উমাইর (রা.)', nameEn: 'Mus‘ab (RA)' },
      { id: 'abdullah-ibn-jahsh', nameBn: 'আব্দুল্লাহ ইবনে জাহ্‌শ (রা.)', nameEn: 'Abdullah ibn Jahsh (RA)' },
      { id: 'hanjala-ibn-abi-amir', nameBn: 'হানযালাহ (রা.)', nameEn: 'Hanzalah (RA)' },
      { id: 'anas-ibn-al-nadr', nameBn: 'আনাস ইবনুন নাদর (রা.)', nameEn: 'Anas ibn al-Nadr (RA)' },
    ],
  },
  {
    eventNo: 4,
    codeBn: '০৪ / ৩৫',
    phaseNo: 1,
    phaseTagBn: 'পর্ব ১ · বিদায়ের ইঙ্গিত',
    phaseTagEn: 'Phase 1 · Signs of Farewell',
    titleBn: 'উসামা (রা.)-এর বাহিনী প্রস্তুত',
    titleEn: 'Preparing the Expedition of Usamah (RA)',
    pointsBn: [
      'জীবনের শেষ দিকে তরুণ উসামা ইবনে যায়েদ (রা.)-কে রোমান সীমান্তের অভিযানে সেনাপতি করেন।',
      'কেউ আপত্তি তুললে বলেন, সে নেতৃত্বের যোগ্য, আর সে আমার প্রিয় মানুষদের একজন।',
    ],
    pointsEn: [
      'Near the end of his life, he appointed young Usamah ibn Zayd (RA) to command the expedition to the Roman frontier.',
      'When some questioned his youth, he affirmed that Usamah was worthy of leadership and among the dearest of people to him.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৬৯',
    sourceEn: 'Sahih al-Bukhari, Hadith 4469',
    sahabaIds: ['usama-ibn-zayd', 'zayd-and-usama', 'zayd-ibn-harithah'],
    sahabaLabelsBn: [
      { id: 'usama-ibn-zayd', nameBn: 'উসামা ইবনে যায়েদ (রা.)', nameEn: 'Usamah ibn Zayd (RA)' },
      { id: 'zayd-and-usama', nameBn: 'যায়েদ ও উসামা (রা.)', nameEn: 'Zayd & Usamah (RA)' },
    ],
  },

  // =========================================================================
  // পর্ব ২ · অসুস্থতার শুরু (২টি ঘটনা — ০৫–০৬/৩৫)
  // =========================================================================
  {
    eventNo: 5,
    codeBn: '০৫ / ৩৫',
    phaseNo: 2,
    phaseTagBn: 'পর্ব ২ · অসুস্থতার শুরু',
    phaseTagEn: 'Phase 2 · Onset of Illness',
    titleBn: 'মাথাব্যথা দিয়ে অসুস্থতার শুরু',
    titleEn: 'Illness Begins with Severe Headache',
    pointsBn: [
      'আয়েশা (রা.) মাথাব্যথার কথা বললে নবীজি (সা.) বলেন, ‘বরং আমার মাথা ব্যথা করছে’।',
      'প্রসিদ্ধ বর্ণনামতে এভাবেই শুরু হয় শেষ অসুস্থতা, যা চলেছিল প্রায় ১০–১৪ দিন।',
    ],
    pointsEn: [
      'When Aishah (RA) complained of a headache, the Prophet (PBUH) replied, “Rather, oh my head!”',
      'According to well-known reports, this marked the start of his final illness lasting about 10–14 days.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৫৬৬৬',
    sourceEn: 'Sahih al-Bukhari, Hadith 5666',
    sahabaIds: ['aisha-siddiqah'],
    sahabaLabelsBn: [
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা সিদ্দিকাহ (রা.)', nameEn: 'Aishah (RA)' },
    ],
  },
  {
    eventNo: 6,
    codeBn: '০৬ / ৩৫',
    phaseNo: 2,
    phaseTagBn: 'পর্ব ২ · অসুস্থতার শুরু',
    phaseTagEn: 'Phase 2 · Onset of Illness',
    titleBn: 'আয়েশা (রা.)-এর ঘরে থাকার অনুমতি',
    titleEn: 'Permission to Stay in Aishah’s (RA) Chamber',
    pointsBn: [
      'অসুস্থতা বাড়লে তিনি স্ত্রীদের কাছে আয়েশা (রা.)-এর ঘরে থাকার অনুমতি চান; সবাই সানন্দে অনুমতি দেন।',
      'আব্বাস (রা.) ও আরেকজনের কাঁধে ভর দিয়ে যান, পা দুটি মাটিতে ঘষে ঘষে যাচ্ছিল।',
    ],
    pointsEn: [
      'As his illness intensified, he asked his wives’ permission to be nursed in Aishah’s (RA) room, and they gladly agreed.',
      'He walked leaning on al-Abbas (RA) and another companion (Ali / al-Fadl RA), his feet trailing along the ground.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৪২',
    sourceEn: 'Sahih al-Bukhari, Hadith 4442',
    sahabaIds: [
      'aisha-siddiqah',
      'abbas-ibn-abdul-muttalib',
      'ali-ibn-abi-talib',
      'al-fadl-ibn-al-abbas',
      'hafsa-bint-umar',
      'umm-salama-hind',
      'sawda-bint-zamah',
      'zaynab-bint-jahsh',
      'umm-habiba-ramlah',
      'juwayriyah-bint-al-harith',
      'safiyyah-bint-huyayy',
      'maymunah-bint-al-harith',
    ],
    sahabaLabelsBn: [
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা (রা.)', nameEn: 'Aishah (RA)' },
      { id: 'abbas-ibn-abdul-muttalib', nameBn: 'আব্বাস (রা.)', nameEn: 'Al-Abbas (RA)' },
      { id: 'ali-ibn-abi-talib', nameBn: 'আলী (রা.)', nameEn: 'Ali (RA)' },
      { id: 'al-fadl-ibn-al-abbas', nameBn: 'আল-ফাদ্‌ল (রা.)', nameEn: 'Al-Fadl (RA)' },
    ],
  },

  // =========================================================================
  // পর্ব ৩ · ইন্তেকালের ৫ দিন আগে (৩টি ঘটনা — ০৭–০৯/৩৫)
  // =========================================================================
  {
    eventNo: 7,
    codeBn: '০৭ / ৩৫',
    phaseNo: 3,
    phaseTagBn: 'পর্ব ৩ · ইন্তেকালের ৫ দিন আগে',
    phaseTagEn: 'Phase 3 · 5 Days Before Passing',
    titleBn: 'সাত মশক পানি',
    titleEn: 'Seven Skins of Cool Water',
    pointsBn: [
      'জ্বর তীব্র হলে বলেন, মুখ খোলা হয়নি এমন সাত মশক পানি আমার ওপর ঢালো, যেন মানুষকে উপদেশ দিতে পারি।',
      'পানি ঢালার পর একটু হালকা বোধ করে তিনি মসজিদে গিয়ে সাহাবিদের উদ্দেশে কথা বলেন।',
    ],
    pointsEn: [
      'When his fever rose sharply, he asked that seven unsealed skins of cool water be poured over him so he could address the people.',
      'Feeling slight relief afterward, he went out to the mosque and spoke to the Companions.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৪২',
    sourceEn: 'Sahih al-Bukhari, Hadith 4442',
    sahabaIds: ['aisha-siddiqah', 'hafsa-bint-umar'],
    sahabaLabelsBn: [
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা (রা.)', nameEn: 'Aishah (RA)' },
      { id: 'hafsa-bint-umar', nameBn: 'হাফসাহ (রা.)', nameEn: 'Hafsah (RA)' },
    ],
  },
  {
    eventNo: 8,
    codeBn: '০৮ / ৩৫',
    phaseNo: 3,
    phaseTagBn: 'পর্ব ৩ · ইন্তেকালের ৫ দিন আগে',
    phaseTagEn: 'Phase 3 · 5 Days Before Passing',
    titleBn: '‘এক বান্দাকে এখতিয়ার দেওয়া হয়েছে’',
    titleEn: '“A Servant Was Given a Choice”',
    pointsBn: [
      'মিম্বারে বলেন, আল্লাহ এক বান্দাকে দুনিয়া ও আল্লাহর কাছে যা আছে, তার মধ্যে বেছে নিতে বলেছেন; সে আল্লাহর কাছে থাকাই বেছে নিয়েছে।',
      'একমাত্র আবু বকর (রা.) বুঝলেন, সেই বান্দা নবীজি (সা.) নিজেই; তিনি কেঁদে ফেললেন।',
    ],
    pointsEn: [
      'From the pulpit he said Allah gave a servant the choice between this world and what is with Him, and the servant chose what is with Allah.',
      'Only Abu Bakr (RA) realized the Prophet meant himself and wept deeply.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৫৪',
    sourceEn: 'Sahih al-Bukhari, Hadith 3654',
    sahabaIds: ['abu-bakr-siddiq'],
    sahabaLabelsBn: [
      { id: 'abu-bakr-siddiq', nameBn: 'আবু বকর সিদ্দিক (রা.)', nameEn: 'Abu Bakr (RA)' },
    ],
  },
  {
    eventNo: 9,
    codeBn: '০৯ / ৩৫',
    phaseNo: 3,
    phaseTagBn: 'পর্ব ৩ · ইন্তেকালের ৫ দিন আগে',
    phaseTagEn: 'Phase 3 · 5 Days Before Passing',
    titleBn: 'আবু বকর (রা.)-এর মর্যাদা',
    titleEn: 'The High Status of Abu Bakr (RA)',
    pointsBn: [
      'তিনি বলেন, সঙ্গ ও সম্পদ দিয়ে আমার প্রতি সবচেয়ে বেশি অনুগ্রহ করেছেন আবু বকর (রা.)।',
      'নির্দেশ দেন, মসজিদের দিকে খোলা সব দরজা বন্ধ হবে, শুধু আবু বকরের দরজা খোলা থাকবে।',
    ],
    pointsEn: [
      'He declared: “The person who has favored me most with his companionship and wealth is Abu Bakr (RA).”',
      'He ordered all doors opening into the mosque to be closed except the door of Abu Bakr (RA).',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৫৪',
    sourceEn: 'Sahih al-Bukhari, Hadith 3654',
    sahabaIds: ['abu-bakr-siddiq'],
    sahabaLabelsBn: [
      { id: 'abu-bakr-siddiq', nameBn: 'আবু বকর সিদ্দিক (রা.)', nameEn: 'Abu Bakr (RA)' },
    ],
  },

  // =========================================================================
  // পর্ব ৪ · ইন্তেকালের ৪ দিন আগে (৫টি ঘটনা — ১০–১৪/৩৫)
  // =========================================================================
  {
    eventNo: 10,
    codeBn: '১০ / ৩৫',
    phaseNo: 4,
    phaseTagBn: 'পর্ব ৪ · ইন্তেকালের ৪ দিন আগে',
    phaseTagEn: 'Phase 4 · 4 Days Before Passing',
    titleBn: 'বৃহস্পতিবার: লেখার উপকরণ চাওয়া',
    titleEn: 'Thursday: Asking for Writing Materials',
    pointsBn: [
      'এক বৃহস্পতিবারে কষ্ট বেড়ে গেলে বলেন, লেখার কিছু আনো, এমন কিছু লিখে দেব যাতে তোমরা পথভ্রষ্ট না হও।',
      'উপস্থিতদের মধ্যে মতভেদ হলে তিনি তাদের উঠে যেতে বলেন।',
    ],
    pointsEn: [
      'On Thursday when his pain worsened, he asked for writing materials to write a document so they would never go astray.',
      'When differing views arose among those present, he asked them to leave him to rest.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩০৫৩',
    sourceEn: 'Sahih al-Bukhari, Hadith 3053',
    sahabaIds: ['abdullah-ibn-abbas', 'umar-ibn-khattab'],
    sahabaLabelsBn: [
      { id: 'abdullah-ibn-abbas', nameBn: 'আব্দুল্লাহ ইবনে আব্বাস (রা.)', nameEn: 'Ibn Abbas (RA)' },
      { id: 'umar-ibn-khattab', nameBn: 'উমর ইবনুল খাত্তাব (রা.)', nameEn: 'Umar (RA)' },
    ],
  },
  {
    eventNo: 11,
    codeBn: '১১ / ৩৫',
    phaseNo: 4,
    phaseTagBn: 'পর্ব ৪ · ইন্তেকালের ৪ দিন আগে',
    phaseTagEn: 'Phase 4 · 4 Days Before Passing',
    titleBn: 'তিনটি অসিয়ত',
    titleEn: 'Three Final Directives',
    pointsBn: [
      'এরপর তিনি অসিয়ত করেন: আরব উপদ্বীপ থেকে মুশরিকদের বের করে দিও।',
      'প্রতিনিধিদলকে আমি যেভাবে সম্মান করতাম, তোমরাও সেভাবে করো। তৃতীয় অসিয়তটি বর্ণনাকারী ভুলে গেছেন।',
    ],
    pointsEn: [
      'He then gave three directives: expel polytheists from the Arabian Peninsula,',
      'and honor visiting delegations as he used to honor them; the narrator forgot the third directive.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩০৫৩',
    sourceEn: 'Sahih al-Bukhari, Hadith 3053',
    sahabaIds: ['abdullah-ibn-abbas'],
    sahabaLabelsBn: [
      { id: 'abdullah-ibn-abbas', nameBn: 'আব্দুল্লাহ ইবনে আব্বাস (রা.)', nameEn: 'Ibn Abbas (RA)' },
    ],
  },
  {
    eventNo: 12,
    codeBn: '১২ / ৩৫',
    phaseNo: 4,
    phaseTagBn: 'পর্ব ৪ · ইন্তেকালের ৪ দিন আগে',
    phaseTagEn: 'Phase 4 · 4 Days Before Passing',
    titleBn: 'শেষ ইমামতি: মাগরিবে সূরা মুরসালাত',
    titleEn: 'Final Prayer Led: Surah al-Mursalat at Maghrib',
    pointsBn: [
      'জীবনের শেষ যে নামাজে তিনি ইমামতি করেন, তা ছিল মাগরিব।',
      'সেই নামাজে তিনি তিলাওয়াত করেন সূরা আল-মুরসালাত; এরপর আর কোনো নামাজে ইমামতি করেননি।',
    ],
    pointsEn: [
      'The last congregational prayer the Prophet (PBUH) led was Maghrib.',
      'He recited Surah al-Mursalat in it, and never led another prayer thereafter.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪২৯',
    sourceEn: 'Sahih al-Bukhari, Hadith 4429',
    sahabaIds: ['lubabah-al-kubra-umm-al-fadl', 'abdullah-ibn-abbas'],
    sahabaLabelsBn: [
      { id: 'lubabah-al-kubra-umm-al-fadl', nameBn: 'উম্মুল ফাদ্‌ল (রা.)', nameEn: 'Umm al-Fadl (RA)' },
      { id: 'abdullah-ibn-abbas', nameBn: 'ইবনে আব্বাস (রা.)', nameEn: 'Ibn Abbas (RA)' },
    ],
  },
  {
    eventNo: 13,
    codeBn: '১৩ / ৩৫',
    phaseNo: 4,
    phaseTagBn: 'পর্ব ৪ · ইন্তেকালের ৪ দিন আগে',
    phaseTagEn: 'Phase 4 · 4 Days Before Passing',
    titleBn: 'ইশার সময় বারবার অজ্ঞান',
    titleEn: 'Repeated Fainting at Isha Time',
    pointsBn: [
      'ইশার সময় জিজ্ঞেস করেন, ‘লোকেরা কি নামাজ পড়েছে?’ তারা আপনার অপেক্ষায় আছে।',
      'গোসল করে উঠতে গিয়ে অজ্ঞান হয়ে যান; এভাবে কয়েকবার ঘটে।',
    ],
    pointsEn: [
      'At Isha time he asked, “Have the people prayed?” They replied, “No, they are waiting for you.”',
      'He bathed and tried to rise, but fainted—and this happened several times.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৬৮৭',
    sourceEn: 'Sahih al-Bukhari, Hadith 687',
    sahabaIds: ['aisha-siddiqah', 'abu-bakr-siddiq'],
    sahabaLabelsBn: [
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা (রা.)', nameEn: 'Aishah (RA)' },
      { id: 'abu-bakr-siddiq', nameBn: 'আবু বকর (রা.)', nameEn: 'Abu Bakr (RA)' },
    ],
  },
  {
    eventNo: 14,
    codeBn: '১৪ / ৩৫',
    phaseNo: 4,
    phaseTagBn: 'পর্ব ৪ · ইন্তেকালের ৪ দিন আগে',
    phaseTagEn: 'Phase 4 · 4 Days Before Passing',
    titleBn: 'আবু বকর (রা.)-কে ইমামের দায়িত্ব',
    titleEn: 'Appointing Abu Bakr (RA) to Lead Prayer',
    pointsBn: [
      'তিনি বলেন, আবু বকরকে বলো, যেন লোকদের নিয়ে নামাজ পড়ায়।',
      'আয়েশা (রা.) বলেন, তিনি কোমল হৃদয়ের, কেঁদে ফেলবেন; নবীজি (সা.) আবারও একই নির্দেশ দেন।',
    ],
    pointsEn: [
      'He instructed: “Tell Abu Bakr to lead the people in prayer.”',
      'When Aishah (RA) remarked that Abu Bakr was soft-hearted and would weep, the Prophet repeated his command.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৩৮৪, ৬৮৭',
    sourceEn: 'Sahih al-Bukhari, Hadith 3384, 687',
    sahabaIds: ['abu-bakr-siddiq', 'aisha-siddiqah', 'hafsa-bint-umar'],
    sahabaLabelsBn: [
      { id: 'abu-bakr-siddiq', nameBn: 'আবু বকর (রা.)', nameEn: 'Abu Bakr (RA)' },
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা (রা.)', nameEn: 'Aishah (RA)' },
      { id: 'hafsa-bint-umar', nameBn: 'হাফসাহ (রা.)', nameEn: 'Hafsah (RA)' },
    ],
  },

  // =========================================================================
  // পর্ব ৫ · ইন্তেকালের ১–২ দিন আগে (৩টি ঘটনা — ১৫–১৭/৩৫)
  // =========================================================================
  {
    eventNo: 15,
    codeBn: '১৫ / ৩৫',
    phaseNo: 5,
    phaseTagBn: 'পর্ব ৫ · ইন্তেকালের ১–২ দিন আগে',
    phaseTagEn: 'Phase 5 · 1–2 Days Before Passing',
    titleBn: 'একটু সুস্থ হয়ে জামাতে',
    titleEn: 'Attending Zuhr Congregation Briefly',
    pointsBn: [
      'একদিন কিছুটা হালকা বোধ করলে দুজনের কাঁধে ভর দিয়ে জোহরের নামাজে আসেন।',
      'আবু বকর (রা.) পিছিয়ে যেতে চাইলে ইশারায় থামান, তারপর তাঁর পাশে বসে নামাজ পড়েন।',
    ],
    pointsEn: [
      'Feeling slight relief, he came out to Zuhr prayer supported between two men.',
      'When Abu Bakr (RA) tried to step back, he gestured for him to stay and sat beside him to pray.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৬৮৭',
    sourceEn: 'Sahih al-Bukhari, Hadith 687',
    sahabaIds: ['abu-bakr-siddiq', 'abbas-ibn-abdul-muttalib', 'ali-ibn-abi-talib', 'aisha-siddiqah'],
    sahabaLabelsBn: [
      { id: 'abu-bakr-siddiq', nameBn: 'আবু বকর (রা.)', nameEn: 'Abu Bakr (RA)' },
      { id: 'abbas-ibn-abdul-muttalib', nameBn: 'আব্বাস (রা.)', nameEn: 'Al-Abbas (RA)' },
      { id: 'ali-ibn-abi-talib', nameBn: 'আলী (রা.)', nameEn: 'Ali (RA)' },
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা (রা.)', nameEn: 'Aishah (RA)' },
    ],
  },
  {
    eventNo: 16,
    codeBn: '১৬ / ৩৫',
    phaseNo: 5,
    phaseTagBn: 'পর্ব ৫ · ইন্তেকালের ১–২ দিন আগে',
    phaseTagEn: 'Phase 5 · 1–2 Days Before Passing',
    titleBn: 'শেষ দিনারগুলোও দান',
    titleEn: 'Giving Away His Final Gold Coins',
    pointsBn: [
      'অসুস্থ অবস্থায় জিজ্ঞেস করেন, আয়েশা, সেই স্বর্ণমুদ্রাগুলো কী করেছ? সেগুলো আনা হলো, পাঁচ থেকে সাতটি দিনার।',
      'হাতে নিয়ে বলেন, এগুলো রেখে আল্লাহর সাথে সাক্ষাৎ করলে মুহাম্মাদের কী ধারণা হবে? দান করে দাও।',
    ],
    pointsEn: [
      'During his illness he asked Aishah (RA) about five to seven gold dinars left in the house.',
      'Holding them, he said: “What would Muhammad think if he met Allah while still possessing these? Give them in charity.”',
    ],
    sourceBn: 'মুসনাদে আহমাদ, হাদিস নং ২৪২২২',
    sourceEn: 'Musnad Ahmad, Hadith 24222',
    sahabaIds: ['aisha-siddiqah'],
    sahabaLabelsBn: [
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা সিদ্দিকাহ (রা.)', nameEn: 'Aishah (RA)' },
    ],
  },
  {
    eventNo: 17,
    codeBn: '১৭ / ৩৫',
    phaseNo: 5,
    phaseTagBn: 'পর্ব ৫ · ইন্তেকালের ১–২ দিন আগে',
    phaseTagEn: 'Phase 5 · 1–2 Days Before Passing',
    titleBn: 'বন্ধক রাখা বর্ম',
    titleEn: 'His Armor Mortgaged for Barley',
    pointsBn: [
      'যখন তিনি ইন্তেকাল করেন, তখনও তাঁর লোহার বর্ম এক ইহুদির কাছে বন্ধক ছিল।',
      'পরিবারের জন্য ৩০ সা‘ যব ধার নিতে বর্মটি বন্ধক রেখেছিলেন। দুনিয়ার কোনো সম্পদ রেখে যাননি।',
    ],
    pointsEn: [
      'When he passed away, his iron coat of mail was still mortgaged to a Jewish merchant.',
      'He had mortgaged it for thirty sa‘ of barley for his household, leaving behind no worldly wealth.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৬৭',
    sourceEn: 'Sahih al-Bukhari, Hadith 4467',
    sahabaIds: ['aisha-siddiqah'],
    sahabaLabelsBn: [
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা সিদ্দিকাহ (রা.)', nameEn: 'Aishah (RA)' },
    ],
  },

  // =========================================================================
  // পর্ব ৬ · শেষ দিন · সোমবার (৯টি ঘটনা — ১৮–২৬/৩৫)
  // =========================================================================
  {
    eventNo: 18,
    codeBn: '১৮ / ৩৫',
    phaseNo: 6,
    phaseTagBn: 'পর্ব ৬ · শেষ দিন · সোমবার',
    phaseTagEn: 'Phase 6 · The Final Day · Monday',
    titleBn: 'ফজরে পর্দা সরিয়ে শেষ দেখা',
    titleEn: 'Final Smile Through the Curtain at Fajr',
    pointsBn: [
      'সোমবার ফজরে আবু বকর (রা.)-এর ইমামতিতে সবাই নামাজ পড়ছিলেন।',
      'নবীজি (সা.) হুজরার পর্দা সরিয়ে সাহাবিদের কাতারবন্দি দেখে হাসলেন; সাহাবিরা আনন্দে প্রায় নামাজ ভেঙে ফেলছিলেন।',
    ],
    pointsEn: [
      'On Monday at Fajr, the Companions were praying in neat rows behind Abu Bakr (RA).',
      'The Prophet lifted the curtain of his room and smiled warmly at them; the Companions nearly broke prayer out of sheer joy.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৬৮০; সহীহ মুসলিম, হাদিস নং ৪১৯',
    sourceEn: 'Sahih al-Bukhari 680; Sahih Muslim 419',
    sahabaIds: ['abu-bakr-siddiq', 'anas-ibn-malik'],
    sahabaLabelsBn: [
      { id: 'abu-bakr-siddiq', nameBn: 'আবু বকর (রা.)', nameEn: 'Abu Bakr (RA)' },
      { id: 'anas-ibn-malik', nameBn: 'আনাস ইবনে মালিক (রা.)', nameEn: 'Anas (RA)' },
    ],
  },
  {
    eventNo: 19,
    codeBn: '১৯ / ৩৫',
    phaseNo: 6,
    phaseTagBn: 'পর্ব ৬ · শেষ দিন · সোমবার',
    phaseTagEn: 'Phase 6 · The Final Day · Monday',
    titleBn: 'ফাতিমা (রা.)-এর কানে কানে',
    titleEn: 'Whispering to Fatimah (RA)',
    pointsBn: [
      'ফাতিমা (রা.)-কে কাছে ডেকে কানে কানে কিছু বললেন; তিনি কেঁদে ফেললেন।',
      'আবার কিছু বললে তিনি হাসলেন। পরে জানা যায়: প্রথমবার বিদায়ের সংবাদ, দ্বিতীয়বার, পরিবারের মধ্যে তিনিই সবার আগে তাঁর কাছে যাবেন।',
    ],
    pointsEn: [
      'He called Fatimah (RA) close and whispered to her, and she wept.',
      'Then he whispered again, and she smiled: first he told her of his imminent passing, then that she would be the first of his family to join him.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬২৩–৩৬২৪',
    sourceEn: 'Sahih al-Bukhari, Hadith 3623–3624',
    sahabaIds: ['fatima-az-zahra', 'aisha-siddiqah'],
    sahabaLabelsBn: [
      { id: 'fatima-az-zahra', nameBn: 'ফাতিমা (রা.)', nameEn: 'Fatimah (RA)' },
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা (রা.)', nameEn: 'Aishah (RA)' },
    ],
  },
  {
    eventNo: 20,
    codeBn: '২০ / ৩৫',
    phaseNo: 6,
    phaseTagBn: 'পর্ব ৬ · শেষ দিন · সোমবার',
    phaseTagEn: 'Phase 6 · The Final Day · Monday',
    titleBn: '‘আজকের পর আর কষ্ট নেই’',
    titleEn: '“No More Suffering After Today”',
    pointsBn: [
      'মৃত্যুযন্ত্রণায় বারবার জ্ঞান হারাচ্ছিলেন; ফাতিমা (রা.) বললেন, ‘হায়, আমার বাবার কত কষ্ট!’',
      'নবীজি (সা.) বললেন, ‘আজকের পর তোমার বাবার আর কোনো কষ্ট নেই।’',
    ],
    pointsEn: [
      'As he repeatedly lost consciousness in intense distress, Fatimah (RA) cried, “Oh, the suffering of my father!”',
      'He comforted her: “Your father will have no more suffering after today.”',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৬২',
    sourceEn: 'Sahih al-Bukhari, Hadith 4462',
    sahabaIds: ['fatima-az-zahra', 'anas-ibn-malik'],
    sahabaLabelsBn: [
      { id: 'fatima-az-zahra', nameBn: 'ফাতিমা (রা.)', nameEn: 'Fatimah (RA)' },
      { id: 'anas-ibn-malik', nameBn: 'আনাস ইবনে মালিক (রা.)', nameEn: 'Anas (RA)' },
    ],
  },
  {
    eventNo: 21,
    codeBn: '২১ / ৩৫',
    phaseNo: 6,
    phaseTagBn: 'পর্ব ৬ · শেষ দিন · সোমবার',
    phaseTagEn: 'Phase 6 · The Final Day · Monday',
    titleBn: 'শেষ নসিহত: সালাত ও অধীনস্থরা',
    titleEn: 'Final Counsel: Prayer & Those Under Your Care',
    pointsBn: [
      'জীবনের শেষ মুহূর্তেও তিনি বারবার বলছিলেন—',
      '‘সালাত, সালাত! আর তোমাদের অধীনস্থদের ব্যাপারে আল্লাহকে ভয় করো।’',
    ],
    pointsEn: [
      'Even in his final breaths, he repeated his heartfelt counsel:',
      '“The prayer, the prayer! And fear Allah regarding those under your care.”',
    ],
    sourceBn: 'সুনান ইবনে মাজাহ, হাদিস নং ২৬৯৮',
    sourceEn: 'Sunan Ibn Majah, Hadith 2698',
    sahabaIds: ['ali-ibn-abi-talib', 'anas-ibn-malik', 'umm-salama-hind'],
    sahabaLabelsBn: [
      { id: 'ali-ibn-abi-talib', nameBn: 'আলী (রা.)', nameEn: 'Ali (RA)' },
      { id: 'anas-ibn-malik', nameBn: 'আনাস (রা.)', nameEn: 'Anas (RA)' },
      { id: 'umm-salama-hind', nameBn: 'উম্মে সালামাহ (রা.)', nameEn: 'Umm Salamah (RA)' },
    ],
  },
  {
    eventNo: 22,
    codeBn: '২২ / ৩৫',
    phaseNo: 6,
    phaseTagBn: 'পর্ব ৬ · শেষ দিন · সোমবার',
    phaseTagEn: 'Phase 6 · The Final Day · Monday',
    titleBn: 'কবরকে সিজদার স্থান বানানো নিয়ে সতর্কতা',
    titleEn: 'Warning Against Taking Graves as Places of Worship',
    pointsBn: [
      'শেষ সময়ে কষ্টের মাঝেও তিনি উম্মতকে সতর্ক করেন।',
      'বলেন, ইহুদি-খ্রিস্টানদের ওপর আল্লাহর লানত, তারা নবীদের কবরকে ইবাদতের স্থান বানিয়েছে।',
    ],
    pointsEn: [
      'Even amid intense pain at the end of his life, he cautioned the Ummah:',
      'warning against turning the graves of prophets into places of worship.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৩৫–৪৩৬',
    sourceEn: 'Sahih al-Bukhari, Hadith 435–436',
    sahabaIds: ['aisha-siddiqah', 'abdullah-ibn-abbas'],
    sahabaLabelsBn: [
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা (রা.)', nameEn: 'Aishah (RA)' },
      { id: 'abdullah-ibn-abbas', nameBn: 'ইবনে আব্বাস (রা.)', nameEn: 'Ibn Abbas (RA)' },
    ],
  },
  {
    eventNo: 23,
    codeBn: '২৩ / ৩৫',
    phaseNo: 6,
    phaseTagBn: 'পর্ব ৬ · শেষ দিন · সোমবার',
    phaseTagEn: 'Phase 6 · The Final Day · Monday',
    titleBn: 'শেষ মিসওয়াক',
    titleEn: 'The Final Miswak',
    pointsBn: [
      'আয়েশা (রা.)-এর ভাই আবদুর রহমান (রা.) হাতে মিসওয়াক নিয়ে ঢুকলেন; নবীজি (সা.) সেদিকে তাকালেন।',
      'আয়েশা (রা.) সেটি চিবিয়ে নরম করে দিলেন, আর তিনি সুন্দরভাবে দাঁত মাজলেন।',
    ],
    pointsEn: [
      'Aishah’s brother Abd al-Rahman ibn Abi Bakr (RA) entered holding a fresh miswak, and the Prophet looked intently at it.',
      'Aishah (RA) softened its tip for him, and he brushed his teeth thoroughly.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৪৯',
    sourceEn: 'Sahih al-Bukhari, Hadith 4449',
    sahabaIds: ['abdur-rahman-ibn-abi-bakr', 'aisha-siddiqah'],
    sahabaLabelsBn: [
      { id: 'abdur-rahman-ibn-abi-bakr', nameBn: 'আব্দুর রহমান ইবনে আবি বকর (রা.)', nameEn: 'Abd al-Rahman ibn Abi Bakr (RA)' },
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা (রা.)', nameEn: 'Aishah (RA)' },
    ],
  },
  {
    eventNo: 24,
    codeBn: '২৪ / ৩৫',
    phaseNo: 6,
    phaseTagBn: 'পর্ব ৬ · শেষ দিন · সোমবার',
    phaseTagEn: 'Phase 6 · The Final Day · Monday',
    titleBn: '‘মৃত্যুর যন্ত্রণা আছে’',
    titleEn: '“Indeed, Death Has Its Agonies”',
    pointsBn: [
      'পাশে রাখা পানির পাত্রে হাত ডুবিয়ে বারবার মুখমণ্ডল মুছছিলেন।',
      'আর বলছিলেন, ‘লা ইলাহা ইল্লাল্লাহ, নিশ্চয়ই মৃত্যুর যন্ত্রণা আছে।’',
    ],
    pointsEn: [
      'He dipped his hand into a vessel of cool water beside him and wiped his face repeatedly,',
      'saying: “La ilaha illallah—indeed, death has its agonies.”',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৪৯',
    sourceEn: 'Sahih al-Bukhari, Hadith 4449',
    sahabaIds: ['aisha-siddiqah'],
    sahabaLabelsBn: [
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা সিদ্দিকাহ (রা.)', nameEn: 'Aishah (RA)' },
    ],
  },
  {
    eventNo: 25,
    codeBn: '২৫ / ৩৫',
    phaseNo: 6,
    phaseTagBn: 'পর্ব ৬ · শেষ দিন · সোমবার',
    phaseTagEn: 'Phase 6 · The Final Day · Monday',
    titleBn: 'শেষ কথা: আর-রাফীকুল আ‘লা',
    titleEn: 'Final Words: Al-Rafiq al-A‘la',
    pointsBn: [
      'আয়েশা (রা.)-এর বুকে হেলান দিয়ে ছিলেন; দৃষ্টি ওপরের দিকে উঠল, হাত তুললেন।',
      'বললেন, ‘ফির-রাফীকিল আ‘লা’, সর্বোচ্চ বন্ধুর সান্নিধ্যে। এরপর তাঁর হাত নেমে এলো।',
    ],
    pointsEn: [
      'Resting against Aishah’s (RA) chest, his gaze rose upward and he lifted his hand,',
      'whispering: “Fir-Rafiqil A‘la” (With the Highest Companion)—and then his hand gently fell.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৪৯, ৪৪৩৮',
    sourceEn: 'Sahih al-Bukhari, Hadith 4449, 4438',
    sahabaIds: ['aisha-siddiqah'],
    sahabaLabelsBn: [
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা সিদ্দিকাহ (রা.)', nameEn: 'Aishah (RA)' },
    ],
  },
  {
    eventNo: 26,
    codeBn: '২৬ / ৩৫',
    phaseNo: 6,
    phaseTagBn: 'পর্ব ৬ · শেষ দিন · সোমবার',
    phaseTagEn: 'Phase 6 · The Final Day · Monday',
    titleBn: 'সোমবার, ৬৩ বছর বয়সে ইন্তেকাল',
    titleEn: 'Passing on Monday at Age 63',
    pointsBn: [
      'নবীজি (সা.) ইন্তেকাল করেন সোমবার, ১১ হিজরির রবিউল আউয়াল মাসে।',
      'তখন তাঁর বয়স ছিল ৬৩ বছর। ইন্না লিল্লাহি ওয়া ইন্না ইলাইহি রাজিউন।',
    ],
    pointsEn: [
      'Prophet Muhammad (PBUH) passed away on Monday in Rabi‘ al-Awwal, 11 AH,',
      'at the age of 63. To Allah we belong and to Him we return.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১৩৮৭, ৩৫৩৬',
    sourceEn: 'Sahih al-Bukhari, Hadith 1387, 3536',
    sahabaIds: ['aisha-siddiqah', 'abu-bakr-siddiq', 'abdullah-ibn-abbas'],
    sahabaLabelsBn: [
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা (রা.)', nameEn: 'Aishah (RA)' },
      { id: 'abu-bakr-siddiq', nameBn: 'আবু বকর (রা.)', nameEn: 'Abu Bakr (RA)' },
      { id: 'abdullah-ibn-abbas', nameBn: 'ইবনে আব্বাস (রা.)', nameEn: 'Ibn Abbas (RA)' },
    ],
  },

  // =========================================================================
  // পর্ব ৭ · ইন্তেকালের পর (৯টি ঘটনা — ২৭–৩৫/৩৫)
  // =========================================================================
  {
    eventNo: 27,
    codeBn: '২৭ / ৩৫',
    phaseNo: 7,
    phaseTagBn: 'পর্ব ৭ · ইন্তেকালের পর',
    phaseTagEn: 'Phase 7 · After His Passing',
    titleBn: 'উমর (রা.)-এর শোক, আবু বকর (রা.)-এর ভাষণ',
    titleEn: 'Umar’s Grief & Abu Bakr’s Historic Address',
    pointsBn: [
      'শোকে বিহ্বল উমর (রা.) মেনে নিতে পারছিলেন না যে নবীজি (সা.) ইন্তেকাল করেছেন।',
      'আবু বকর (রা.) বললেন, যে মুহাম্মাদের ইবাদত করত, তিনি ইন্তেকাল করেছেন; আর আল্লাহ চিরঞ্জীব। তারপর পড়লেন আলে ইমরান: ১৪৪।',
    ],
    pointsEn: [
      'Overwhelmed by grief, Umar (RA) could not accept that the Prophet (PBUH) had passed away.',
      'Abu Bakr (RA) steadied the Ummah: “Whoever worshipped Muhammad, Muhammad has died; whoever worships Allah, Allah is Ever-Living,” and recited Al-Imran 3:144.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৬৭–৩৬৬৮',
    sourceEn: 'Sahih al-Bukhari, Hadith 3667–3668',
    sahabaIds: ['umar-ibn-khattab', 'abu-bakr-siddiq', 'aisha-siddiqah'],
    sahabaLabelsBn: [
      { id: 'umar-ibn-khattab', nameBn: 'উমর ইবনুল খাত্তাব (রা.)', nameEn: 'Umar (RA)' },
      { id: 'abu-bakr-siddiq', nameBn: 'আবু বকর সিদ্দিক (রা.)', nameEn: 'Abu Bakr (RA)' },
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা (রা.)', nameEn: 'Aishah (RA)' },
    ],
  },
  {
    eventNo: 28,
    codeBn: '২৮ / ৩৫',
    phaseNo: 7,
    phaseTagBn: 'পর্ব ৭ · ইন্তেকালের পর',
    phaseTagEn: 'Phase 7 · After His Passing',
    titleBn: 'সাকিফায় খলিফা নির্বাচন',
    titleEn: 'Election of the First Caliph at Saqifah',
    pointsBn: [
      'আনসাররা সাকিফা বনু সাইদায় একত্র হলে আবু বকর, উমর ও আবু উবাইদা (রা.) সেখানে যান।',
      'আলোচনার পর সবাই আবু বকর (রা.)-এর হাতে বাইয়াত করেন; তিনি হন প্রথম খলিফা।',
    ],
    pointsEn: [
      'When the Ansar gathered at Saqifah Bani Sa‘idah, Abu Bakr, Umar, and Abu Ubaydah (RA) went to meet them.',
      'After consultation, everyone pledged allegiance to Abu Bakr (RA) as the first Caliph of Islam.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৬৮',
    sourceEn: 'Sahih al-Bukhari, Hadith 3668',
    sahabaIds: ['abu-bakr-siddiq', 'umar-ibn-khattab', 'abu-ubaidah-ibn-jarrah', 'sad-ibn-ubadah', 'bashir-ibn-sad'],
    sahabaLabelsBn: [
      { id: 'abu-bakr-siddiq', nameBn: 'আবু বকর (রা.)', nameEn: 'Abu Bakr (RA)' },
      { id: 'umar-ibn-khattab', nameBn: 'উমর (রা.)', nameEn: 'Umar (RA)' },
      { id: 'abu-ubaidah-ibn-jarrah', nameBn: 'আবু উবাইদাহ (রা.)', nameEn: 'Abu Ubaydah (RA)' },
      { id: 'sad-ibn-ubadah', nameBn: 'সা’দ ইবনে উবাদাহ (রা.)', nameEn: 'Sa‘d ibn Ubadah (RA)' },
    ],
  },
  {
    eventNo: 29,
    codeBn: '২৯ / ৩৫',
    phaseNo: 7,
    phaseTagBn: 'পর্ব ৭ · ইন্তেকালের পর',
    phaseTagEn: 'Phase 7 · After His Passing',
    titleBn: 'জামাসহ গোসল',
    titleEn: 'Washing the Prophet in His Shirt',
    pointsBn: [
      'সাহাবিরা ভাবছিলেন, অন্যদের মতো কাপড় খুলে গোসল দেবেন কি না।',
      'তখন ঘরের ভেতর থেকে এক আওয়াজ এলো: কাপড়সহ গোসল দাও। তাঁরা জামার ওপর দিয়েই পানি ঢেলে গোসল দেন।',
    ],
    pointsEn: [
      'The Companions wondered whether to remove his garment for washing as done with others.',
      'A voice from within the room instructed them to wash him with his shirt on, so they poured water over his garment.',
    ],
    sourceBn: 'সুনান আবু দাউদ, হাদিস নং ৩১৪১',
    sourceEn: 'Sunan Abu Dawud, Hadith 3141',
    sahabaIds: ['ali-ibn-abi-talib', 'abbas-ibn-abdul-muttalib', 'al-fadl-ibn-al-abbas', 'usama-ibn-zayd', 'zayd-and-usama', 'aisha-siddiqah'],
    sahabaLabelsBn: [
      { id: 'ali-ibn-abi-talib', nameBn: 'আলী (রা.)', nameEn: 'Ali (RA)' },
      { id: 'abbas-ibn-abdul-muttalib', nameBn: 'আব্বাস (রা.)', nameEn: 'Al-Abbas (RA)' },
      { id: 'al-fadl-ibn-al-abbas', nameBn: 'আল-ফাদ্‌ল (রা.)', nameEn: 'Al-Fadl (RA)' },
      { id: 'usama-ibn-zayd', nameBn: 'উসামা (রা.)', nameEn: 'Usamah (RA)' },
    ],
  },
  {
    eventNo: 30,
    codeBn: '৩০ / ৩৫',
    phaseNo: 7,
    phaseTagBn: 'পর্ব ৭ · ইন্তেকালের পর',
    phaseTagEn: 'Phase 7 · After His Passing',
    titleBn: 'তিনটি সাদা কাপড়ে কাফন',
    titleEn: 'Shrouded in Three White Yemeni Cloths',
    pointsBn: [
      'তাঁকে কাফন দেওয়া হয় ইয়ামানের তিনটি সাদা সুতি কাপড়ে।',
      'তাতে কোনো জামা বা পাগড়ি ছিল না।',
    ],
    pointsEn: [
      'He was shrouded in three plain white Yemeni cotton garments,',
      'with neither a shirt nor a turban.',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১২৬৪',
    sourceEn: 'Sahih al-Bukhari, Hadith 1264',
    sahabaIds: ['aisha-siddiqah', 'ali-ibn-abi-talib', 'abbas-ibn-abdul-muttalib'],
    sahabaLabelsBn: [
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা (রা.)', nameEn: 'Aishah (RA)' },
      { id: 'ali-ibn-abi-talib', nameBn: 'আলী (রা.)', nameEn: 'Ali (RA)' },
      { id: 'abbas-ibn-abdul-muttalib', nameBn: 'আব্বাস (রা.)', nameEn: 'Al-Abbas (RA)' },
    ],
  },
  {
    eventNo: 31,
    codeBn: '৩১ / ৩৫',
    phaseNo: 7,
    phaseTagBn: 'পর্ব ৭ · ইন্তেকালের পর',
    phaseTagEn: 'Phase 7 · After His Passing',
    titleBn: 'দলে দলে জানাজা',
    titleEn: 'Funeral Prayers in Successive Groups',
    pointsBn: [
      'বর্ণিত আছে, তাঁকে ঘরেই খাটে রাখা হয়; সাহাবিরা দলে দলে ঢুকে আলাদাভাবে জানাজা পড়েন।',
      'প্রথমে পুরুষ, তারপর নারী, তারপর শিশুরা; কেউ ইমামতি করেননি।',
    ],
    pointsEn: [
      'He was placed upon his bed in the chamber while the Companions entered in successive groups to offer Janazah prayers individually—',
      'first the men, then the women, then the children, with no single Imam leading.',
    ],
    sourceBn: 'সুনান ইবনে মাজাহ, হাদিস নং ১৬২৮ (সনদ দুর্বল)',
    sourceEn: 'Sunan Ibn Majah, Hadith 1628 (weak chain)',
    sahabaIds: ['abdullah-ibn-abbas', 'abu-bakr-siddiq', 'umar-ibn-khattab', 'ali-ibn-abi-talib'],
    sahabaLabelsBn: [
      { id: 'abdullah-ibn-abbas', nameBn: 'ইবনে আব্বাস (রা.)', nameEn: 'Ibn Abbas (RA)' },
      { id: 'abu-bakr-siddiq', nameBn: 'আবু বকর (রা.)', nameEn: 'Abu Bakr (RA)' },
      { id: 'umar-ibn-khattab', nameBn: 'উমর (রা.)', nameEn: 'Umar (RA)' },
      { id: 'ali-ibn-abi-talib', nameBn: 'আলী (রা.)', nameEn: 'Ali (RA)' },
    ],
  },
  {
    eventNo: 32,
    codeBn: '৩২ / ৩৫',
    phaseNo: 7,
    phaseTagBn: 'পর্ব ৭ · ইন্তেকালের পর',
    phaseTagEn: 'Phase 7 · After His Passing',
    titleBn: 'যেখানে ইন্তেকাল, সেখানেই দাফন',
    titleEn: 'Buried Where He Passed Away',
    pointsBn: [
      'কোথায় দাফন হবে, এ নিয়ে মতভেদ দেখা দিলে আবু বকর (রা.) একটি হাদিস শোনান।',
      'আল্লাহ প্রত্যেক নবীর রুহ সেখানেই কবজ করেন, যেখানে তাঁকে দাফন করা পছন্দ করেন। তাই তাঁর বিছানার জায়গাতেই কবর দেওয়া হয়।',
    ],
    pointsEn: [
      'When differing views arose on his burial site, Abu Bakr (RA) shared a Hadith:',
      'Allah takes the soul of every prophet only in the spot where He loves for him to be buried—so his grave was dug beneath his bed.',
    ],
    sourceBn: 'জামে আত-তিরমিযী, হাদিস নং ১০১৮',
    sourceEn: 'Jami at-Tirmidhi, Hadith 1018',
    sahabaIds: ['abu-bakr-siddiq', 'aisha-siddiqah', 'abu-talha-al-ansari'],
    sahabaLabelsBn: [
      { id: 'abu-bakr-siddiq', nameBn: 'আবু বকর (রা.)', nameEn: 'Abu Bakr (RA)' },
      { id: 'aisha-siddiqah', nameBn: 'আয়েশা (রা.)', nameEn: 'Aishah (RA)' },
      { id: 'abu-talha-al-ansari', nameBn: 'আবু তালহা (রা.)', nameEn: 'Abu Talhah (RA)' },
    ],
  },
  {
    eventNo: 33,
    codeBn: '৩৩ / ৩৫',
    phaseNo: 7,
    phaseTagBn: 'পর্ব ৭ · ইন্তেকালের পর',
    phaseTagEn: 'Phase 7 · After His Passing',
    titleBn: 'ফাতিমা (রা.)-এর বেদনা',
    titleEn: 'The Sorrow of Fatimah (RA)',
    pointsBn: [
      'দাফনের পর ফাতিমা (রা.) আনাস (রা.)-কে বললেন:',
      '‘রাসূলুল্লাহ (সা.)-এর ওপর মাটি ঢালতে তোমাদের মন কীভাবে রাজি হলো?’',
    ],
    pointsEn: [
      'After the burial, Fatimah (RA) asked Anas ibn Malik (RA):',
      '“O Anas, how could your hearts bear to cast earth over the Messenger of Allah (PBUH)?”',
    ],
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৬২',
    sourceEn: 'Sahih al-Bukhari, Hadith 4462',
    sahabaIds: ['fatima-az-zahra', 'anas-ibn-malik'],
    sahabaLabelsBn: [
      { id: 'fatima-az-zahra', nameBn: 'ফাতিমা (রা.)', nameEn: 'Fatimah (RA)' },
      { id: 'anas-ibn-malik', nameBn: 'আনাস ইবনে মালিক (রা.)', nameEn: 'Anas (RA)' },
    ],
  },
  {
    eventNo: 34,
    codeBn: '৩৪ / ৩৫',
    phaseNo: 7,
    phaseTagBn: 'পর্ব ৭ · ইন্তেকালের পর',
    phaseTagEn: 'Phase 7 · After His Passing',
    titleBn: 'মদিনা যেন অন্ধকার',
    titleEn: 'Madinah Grew Dark',
    pointsBn: [
      'আনাস (রা.) বলেন, যেদিন নবীজি (সা.) মদিনায় এসেছিলেন, সেদিন সবকিছু আলোকিত হয়েছিল।',
      'আর যেদিন তিনি ইন্তেকাল করেন, সেদিন সবকিছু অন্ধকার হয়ে গিয়েছিল।',
    ],
    pointsEn: [
      'Anas (RA) said: “On the day the Messenger of Allah entered Madinah, everything in it was illuminated.',
      'And on the day he passed away, everything in it grew dark.”',
    ],
    sourceBn: 'জামে আত-তিরমিযী, হাদিস নং ৩৬১৮',
    sourceEn: 'Jami at-Tirmidhi, Hadith 3618',
    sahabaIds: ['anas-ibn-malik'],
    sahabaLabelsBn: [
      { id: 'anas-ibn-malik', nameBn: 'আনাস ইবনে মালিক (রা.)', nameEn: 'Anas (RA)' },
    ],
  },
  {
    eventNo: 35,
    codeBn: '৩৫ / ৩৫',
    phaseNo: 7,
    phaseTagBn: 'পর্ব ৭ · ইন্তেকালের পর',
    phaseTagEn: 'Phase 7 · After His Passing',
    titleBn: 'উম্মে আইমান (রা.)-এর কান্না',
    titleEn: 'The Tears of Umm Ayman (RA)',
    pointsBn: [
      'ইন্তেকালের পর আবু বকর ও উমর (রা.) উম্মে আইমান (রা.)-কে দেখতে গেলে তিনি কাঁদছিলেন।',
      'বললেন, আমি জানি আল্লাহর কাছে যা আছে তা তাঁর জন্য উত্তম; আমি কাঁদছি কারণ আসমান থেকে ওহি আসা বন্ধ হয়ে গেল। শুনে দুজনও কেঁদে ফেললেন।',
    ],
    pointsEn: [
      'After the Prophet’s passing, Abu Bakr and Umar (RA) visited Umm Ayman (RA) and found her weeping.',
      'She said, “I know what is with Allah is better for him; I weep because revelation from heaven has ceased.” Hearing this, both wept with her.',
    ],
    sourceBn: 'সহীহ মুসলিম, হাদিস নং ২৪৫৪',
    sourceEn: 'Sahih Muslim, Hadith 2454',
    sahabaIds: ['umm-ayman-barakah', 'abu-bakr-siddiq', 'umar-ibn-khattab'],
    sahabaLabelsBn: [
      { id: 'umm-ayman-barakah', nameBn: 'উম্মে আইমান (রা.)', nameEn: 'Umm Ayman (RA)' },
      { id: 'abu-bakr-siddiq', nameBn: 'আবু বকর (রা.)', nameEn: 'Abu Bakr (RA)' },
      { id: 'umar-ibn-khattab', nameBn: 'উমর (রা.)', nameEn: 'Umar (RA)' },
    ],
  },
];

/** নির্দিষ্ট কোনো সাহাবির সঙ্গে সংশ্লিষ্ট শেষ ১০ দিনের ঘটনাগুলো রিটার্ন করে */
export function getLast10DaysEventsForSahaba(sahabaId: string): ProphetLast10DaysEvent[] {
  return PROPHET_LAST_10_DAYS_EVENTS.filter((ev) => ev.sahabaIds.includes(sahabaId));
}

export interface SahabaLast10DaysGroup {
  sahabaId: string;
  nameBn: string;
  nameEn: string;
  events: ProphetLast10DaysEvent[];
}

/** সাহাবিদের নাম অনুযায়ী সাজানো (সর্বাধিক ঘটনা আগে) সম্পূর্ণ গ্রুপিং */
export function getSahabaLast10DaysGroups(): SahabaLast10DaysGroup[] {
  const map = new Map<string, SahabaLast10DaysGroup>();

  for (const ev of PROPHET_LAST_10_DAYS_EVENTS) {
    for (const label of ev.sahabaLabelsBn) {
      const existing = map.get(label.id);
      if (existing) {
        if (!existing.events.some((e) => e.eventNo === ev.eventNo)) {
          existing.events.push(ev);
        }
      } else {
        map.set(label.id, {
          sahabaId: label.id,
          nameBn: label.nameBn,
          nameEn: label.nameEn,
          events: [ev],
        });
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => b.events.length - a.events.length);
}
