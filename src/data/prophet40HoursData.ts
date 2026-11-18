/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Passing40PartMeta {
  partNo: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  dayTagBn: string;
  dayTagEn: string;
  titleBn: string;
  titleEn: string;
  arabicTitle: string;
  subtitleBn: string;
  subtitleEn: string;
  accentHex: string;
  eventCount: number;
}

export interface Passing40Event {
  no: number; // 1 to 32
  partNo: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  timeContextBn: string;
  timeContextEn: string;
  titleBn: string;
  titleEn: string;
  pointsBn: string[];
  pointsEn: string[];
  detailedNarrativeBn: string;
  detailedNarrativeEn: string;
  reflectionBn: string;
  reflectionEn: string;
  arabicQuote?: string;
  sourceBn: string;
  sourceEn: string;
}

export const PASSING_40_PARTS: Passing40PartMeta[] = [
  {
    partNo: 1,
    dayTagBn: 'সোমবার',
    dayTagEn: 'Monday',
    titleBn: 'সোমবার · ইন্তেকালের মুহূর্ত',
    titleEn: 'Monday · The Moment of Passing',
    arabicTitle: 'الإثنين · لحظة الوفاة',
    subtitleBn: 'আয়েশা (রা.)-এর হুজরায় শেষ বিদায় ও মদিনায় শোকের প্রথম প্রহর',
    subtitleEn: 'Final breath in Aisha’s (RA) chamber and the first wave of shock in Madinah',
    accentHex: '#059669',
    eventCount: 4,
  },
  {
    partNo: 2,
    dayTagBn: 'সোমবার',
    dayTagEn: 'Monday',
    titleBn: 'সোমবার · আবু বকর (রা.)-এর আগমন',
    titleEn: 'Monday · Arrival of Abu Bakr (RA)',
    arabicTitle: 'الإثنين · قدوم أبي بكر رضي الله عنه',
    subtitleBn: 'আস-সুনহ থেকে ছুটে আসা, শেষ চুম্বন ও ইতিহাসের সবচেয়ে দৃঢ় ভাষণ',
    subtitleEn: 'Rushing from As-Sunh, the final kiss, and the most resolute speech in history',
    accentHex: '#0d9488',
    eventCount: 8,
  },
  {
    partNo: 3,
    dayTagBn: 'সোমবার',
    dayTagEn: 'Monday',
    titleBn: 'সোমবার · সাকিফা বনু সাইদা',
    titleEn: 'Monday · Saqifah Bani Sa‘idah',
    arabicTitle: 'الإثنين · سقيفة بني ساعدة',
    subtitleBn: 'আনসার ও মুহাজিরদের ঐতিহাসিক পরামর্শ ও প্রথম বাইয়াত',
    subtitleEn: 'Historic consultation of Ansar & Muhajirun and the initial pledge of allegiance',
    accentHex: '#d97706',
    eventCount: 4,
  },
  {
    partNo: 4,
    dayTagBn: 'মঙ্গলবার',
    dayTagEn: 'Tuesday',
    titleBn: 'মঙ্গলবার · সাধারণ বাইয়াত',
    titleEn: 'Tuesday · General Pledge of Allegiance',
    arabicTitle: 'الثلاثاء · البيعة العامة',
    subtitleBn: 'মসজিদে নববীতে খলিফা নির্বাচন ও ন্যায়বিচারের অমর নীতিভাষণ',
    subtitleEn: 'Public pledge in Masjid an-Nabawi and Abu Bakr’s timeless inaugural address',
    accentHex: '#2563eb',
    eventCount: 4,
  },
  {
    partNo: 5,
    dayTagBn: 'মঙ্গলবার',
    dayTagEn: 'Tuesday',
    titleBn: 'মঙ্গলবার · গোসল, কাফন ও জানাজা',
    titleEn: 'Tuesday · Ghusl, Shrouding & Funeral Prayers',
    arabicTitle: 'الثلاثاء · الغسل والكفن والصلاة',
    subtitleBn: 'জামাসহ গোসল, তিনটি সাদা সাহুলি কাপড়ে কাফন ও দলে দলে জানাজা',
    subtitleEn: 'Bathing in his garment, shrouding in three white Sahuli cloths, and group prayers',
    accentHex: '#0f766e',
    eventCount: 6,
  },
  {
    partNo: 6,
    dayTagBn: 'বুধবারের রাত',
    dayTagEn: 'Wednesday Night',
    titleBn: 'বুধবারের রাত · দাফন',
    titleEn: 'Wednesday Night · The Sacred Burial',
    arabicTitle: 'ليلة الأربعاء · الدفن الشريف',
    subtitleBn: 'রাতের নীরবতায় আয়েশা (রা.)-এর হুজরায় দাফন ও ৪০ ঘণ্টার সমাপ্তি',
    subtitleEn: 'Burial in the quiet of night inside Aisha’s (RA) chamber, completing the 40 hours',
    accentHex: '#4f46e5',
    eventCount: 3,
  },
  {
    partNo: 7,
    dayTagBn: 'দাফনের পর',
    dayTagEn: 'After Burial',
    titleBn: 'দাফনের পর · উম্মতের অশ্রু ও শূন্যতা',
    titleEn: 'After Burial · Tears & Longing of the Ummah',
    arabicTitle: 'بعد الدفن · حزن الصحابة',
    subtitleBn: 'ফাতিমা (রা.), আনাস (রা.) ও উম্মে আইমান (রা.)-এর হৃদয়বিদারক অনুভূতি',
    subtitleEn: 'Poignant grief of Fatimah (RA), Anas (RA), and Umm Ayman (RA)',
    accentHex: '#b45309',
    eventCount: 3,
  },
];

export const PASSING_40_EVENTS: Passing40Event[] = [
  // =========================================================================
  // পর্ব ১ · সোমবার · ইন্তেকালের মুহূর্ত (০১ - ০৪)
  // =========================================================================
  {
    no: 1,
    partNo: 1,
    timeContextBn: 'সোমবার দুপুর · ১১ হিজরি',
    timeContextEn: 'Monday Midday · 11 AH',
    titleBn: 'সোমবার: প্রিয় নবীর বিদায়',
    titleEn: 'Monday: Farewell of the Beloved Prophet (PBUH)',
    pointsBn: [
      'আয়েশা (রা.)-এর বুকে হেলান দিয়ে ‘আর-রাফীকুল আ‘লা’ বলতে বলতে নবীজি ﷺ দুনিয়া ছেড়ে গেলেন।',
      'দিনটি ছিল সোমবার, বয়স ৬৩ বছর। ইন্না লিল্লাহি ওয়া ইন্না ইলাইহি রাজিউন।',
    ],
    pointsEn: [
      'Resting against the chest of Aisha (RA), the Prophet (PBUH) departed this world while repeating “Ar-Rafiq al-A‘la”.',
      'It was Monday at the age of 63. Inna lillahi wa inna ilayhi raji‘un.',
    ],
    detailedNarrativeBn:
      '১১ হিজরির রবিউল আউয়াল মাসের সোমবার দুপুরের দিকে রাসূলুল্লাহ ﷺ-এর অসুস্থতা চূড়ান্ত পর্যায়ে পৌঁছে। তিনি উম্মুল মুমিনীন আয়েশা (রা.)-এর বুকে হেলান দিয়ে ছিলেন। পাশে রাখা পাত্র থেকে হাত ভিজিয়ে মুখমণ্ডল মুছছিলেন আর বলছিলেন—মৃত্যুর রয়েছে তীব্র যন্ত্রণা। এরপর আকাশের দিকে দৃষ্টি তুলে আঙুল উঁচিয়ে বারবার দোয়া করলেন: “হে আল্লাহ, আমাকে ক্ষমা করুন, আমার প্রতি রহম করুন এবং আমাকে সর্বোচ্চ বন্ধুর (আর-রাফীকুল আ‘লা) সান্নিধ্যে মিলিত করুন।” এই পবিত্র বাক্য উচ্চারণ করতে করতেই তাঁর হাত মোবারক ধীরে ধীরে নুয়ে পড়ে এবং ৬৩ বছর বয়সে মানবজাতির শ্রেষ্ঠ পথপ্রদর্শক মহান রবের ডাকে সাড়া দেন।',
    detailedNarrativeEn:
      'Around midday on Monday in Rabi al-Awwal, 11 AH, the Prophet’s (PBUH) illness reached its final hour while resting against Aisha (RA). Dipping his hand into a vessel of water and wiping his blessed face, he lifted his gaze and supplicated: “O Allah, forgive me, have mercy on me, and join me with the Highest Companion (Ar-Rafiq al-A‘la).” With those words, his hand lowered gently and his noble soul returned to Allah at the age of sixty-three.',
    reflectionBn:
      'সর্বোচ্চ সম্মানিত নবী হয়েও তিনি দুনিয়ার স্থায়িত্ব নয়, বরং মহান আল্লাহর সান্নিধ্যকেই বেছে নিয়েছিলেন।',
    reflectionEn:
      'Even when given the choice to remain in this world, he chose nearness to Allah above all else.',
    arabicQuote: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَأَلْحِقْنِي بِالرَّفِيقِ الأَعْلَى',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৪৯, ১৩৮৭, ৩৫৩৬',
    sourceEn: 'Sahih al-Bukhari, Hadith 4449, 1387, 3536',
  },
  {
    no: 2,
    partNo: 1,
    timeContextBn: 'সোমবার দুপুর · হুজরায়ে আয়েশা (রা.)',
    timeContextEn: 'Monday Midday · Aisha’s (RA) Chamber',
    titleBn: 'চাদরে ঢাকা দেহ মোবারক',
    titleEn: 'The Blessed Body Covered with a Yemeni Cloak',
    pointsBn: [
      'ইন্তেকালের পর দেহ মোবারক ঢেকে দেওয়া হয় একটি ডোরাকাটা ইয়েমেনি চাদরে (হিবারা)।',
      'রাখা ছিল আয়েশা (রা.)-এর হুজরায়, মসজিদে নববীর একদম পাশে।',
    ],
    pointsEn: [
      'After his passing, his blessed body was gently covered with a striped Yemeni cloak (Hibarah).',
      'He lay inside Aisha’s (RA) chamber directly adjacent to Al-Masjid an-Nabawi.',
    ],
    detailedNarrativeBn:
      'নবীজি ﷺ-এর পবিত্র রূহ পরলোকে পাড়ি জমানোর পরপরই হুজরায় এক গম্ভীর নীরবতা নেমে আসে। আয়েশা (রা.) পরম আদব ও মমতায় তাঁর মাথা মোবারক বালিশের ওপর আলতো করে নামিয়ে রাখেন। এরপর তাঁর দেহ মোবারককে একটি ডোরাকাটা ইয়েমেনি চাদর—যাকে আরবিতে ‘বুরদ হিবারা’ বলা হয়—দিয়ে সম্পূর্ণ ঢেকে দেওয়া হয়। তাঁর এই সাদামাটা হুজরাটি ছিল মসজিদে নববীর প্রাঙ্গণ ঘেঁষে, যেখান থেকে অল্প আগেই ফজরের সময় তিনি পর্দা সরিয়ে সাহাবিদের নামাজ দেখে তৃপ্তির হাসি হেসেছিলেন।',
    detailedNarrativeEn:
      'As soon as the Prophet’s (PBUH) soul departed, a profound stillness enveloped the chamber. Aisha (RA) gently lowered his blessed head onto a pillow, and his body was covered completely with a striped Yemeni garment known as a Burd Hibarah inside her modest room right beside Al-Masjid an-Nabawi.',
    reflectionBn:
      'দুনিয়ার সমগ্র নেতৃত্ব হাতে থাকা সত্ত্বেও নবীজি ﷺ বিদায় নিলেন এক অনাড়ম্বর মাটির হুজরায় ও সাধারণ চাদরের আবরণে।',
    reflectionEn:
      'Despite leading the entire Arabian Peninsula, he departed in utter simplicity inside a humble room.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১২৪১',
    sourceEn: 'Sahih al-Bukhari, Hadith 1241',
  },
  {
    no: 3,
    partNo: 1,
    timeContextBn: 'সোমবার দুপুর · মসজিদে নববী',
    timeContextEn: 'Monday Midday · Masjid an-Nabawi',
    titleBn: 'উমর (রা.) মানতে পারছিলেন না',
    titleEn: 'Umar (RA) Could Not Accept the News',
    pointsBn: [
      'সংবাদ ছড়াতেই উমর (রা.) দাঁড়িয়ে বললেন, ‘আল্লাহর কসম, রাসূলুল্লাহ ﷺ মারা যাননি।’',
      'তিনি বলছিলেন, আল্লাহ তাঁকে আবার পাঠাবেন; প্রচণ্ড শোকে তাঁর মনে আর কিছুই আসছিল না।',
    ],
    pointsEn: [
      'As the news spread, Umar (RA) stood up declaring: “By Allah, the Messenger of Allah (PBUH) has not died!”',
      'Overwhelmed with grief, he insisted Allah would return him to them just as Musa (AS) returned to his people.',
    ],
    detailedNarrativeBn:
      'প্রিয় নবীর ইন্তেকালের বজ্রপাতসম সংবাদ মুহূর্তের মধ্যে মদিনার অলিগলিতে ছড়িয়ে পড়ল। সাহাবিদের অনেকেই বাকরুদ্ধ হয়ে বসে পড়লেন, কেউ কেউ দিকবিদিক জ্ঞানশূন্য হয়ে গেলেন। দৃঢ়চেতা বীর হযরত উমর ইবনুল খাত্তাব (রা.)-এর হৃদয়েও এই শোক এতটাই তীব্রভাবে আঘাত করল যে তিনি তা বিশ্বাসই করতে পারলেন না। মসজিদে দাঁড়িয়ে আবেগাপ্লুত কণ্ঠে ঘোষণা দিলেন—রাসূলুল্লাহ ﷺ মারা যাননি, বরং মূসা (আ.) যেমন চল্লিশ রাতের জন্য আল্লাহর সান্নিধ্যে গিয়ে আবার ফিরে এসেছিলেন, তিনিও তেমনি ফিরে আসবেন। প্রচণ্ড ভালোবাসা ও বিরহের বেদনায় তাঁর চেতনা আচ্ছন্ন হয়ে গিয়েছিল।',
    detailedNarrativeEn:
      'When the devastating news swept across Madinah, Companions collapsed in stunned silence. Even the steadfast Umar ibn al-Khattab (RA) was so overcome by grief and love that he stood in the mosque insisting the Prophet (PBUH) had merely gone to his Lord like Prophet Musa (AS) and would surely return.',
    reflectionBn:
      'সাহাবিদের হৃদয়ে রাসূলুল্লাহ ﷺ-এর ভালোবাসা কতটা গভীর ছিল, উমর (রা.)-এর এই অস্থিরতা তার জীবন্ত প্রমাণ।',
    reflectionEn:
      'Umar’s (RA) reaction reveals the boundless depth of love the Companions held in their hearts for the Prophet (PBUH).',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৬৭',
    sourceEn: 'Sahih al-Bukhari, Hadith 3667',
  },
  {
    no: 4,
    partNo: 1,
    timeContextBn: 'সোমবার দুপুর · আস-সুনহ (মদিনার উপকণ্ঠ)',
    timeContextEn: 'Monday Midday · As-Sunh',
    titleBn: 'আবু বকর (রা.) তখন দূরে',
    titleEn: 'Abu Bakr (RA) Was Away at As-Sunh',
    pointsBn: [
      'ইন্তেকালের সময় আবু বকর (রা.) মদিনায় ছিলেন না; ছিলেন উঁচু এলাকার আস-সুনহ নামক জায়গায় নিজের বাড়িতে।',
      'সকালে নবীজি ﷺ-কে কিছুটা ভালো দেখে তিনি সেখানে গিয়েছিলেন।',
    ],
    pointsEn: [
      'At the moment of passing, Abu Bakr (RA) was not in central Madinah; he was at his residence in As-Sunh in the upper outskirts.',
      'Having seen the Prophet (PBUH) seemingly improving that morning, he had asked permission to visit his family there.',
    ],
    detailedNarrativeBn:
      'সোমবার ফজরের সময় নবীজি ﷺ যখন পর্দা সরিয়ে হাসিমুখে সাহাবিদের নামাজ দেখলেন, তখন সবার মনে আশার আলো জেগে উঠল—হয়তো আল্লাহ তাঁকে আরোগ্য দান করেছেন। এই স্বস্তি নিয়েই হযরত আবু বকর সিদ্দীক (রা.) নবীজি ﷺ-এর অনুমতি নিয়ে মদিনার পূর্ব-দক্ষিণ উঁচু এলাকা ‘আস-সুনহ’-এ তাঁর স্ত্রীর বাড়িতে গিয়েছিলেন। তাই ঠিক যে মুহূর্তে প্রিয় বন্ধু ইন্তেকাল করলেন, সে মুহূর্তে তিনি মসজিদে উপস্থিত ছিলেন না; দ্রুত সংবাদ বাহক ছুটে গেল তাঁর কাছে।',
    detailedNarrativeEn:
      'Earlier that Monday morning at Fajr, seeing the Prophet (PBUH) smile warmly at the congregation gave everyone hope that he was recovering. Reassured by that sign, Abu Bakr (RA) had gone to his home in As-Sunh, an upper district outside central Madinah, before messengers raced to inform him.',
    reflectionBn:
      'সকালের সেই প্রশান্ত হাসি ছিল উম্মতের জন্য নবীজি ﷺ-এর শেষ আশীর্বাদ ও বিদায়ী চাহনি।',
    reflectionEn:
      'That serene morning smile was the Prophet’s final comforting glance upon his praying Ummah.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৬৭, ১২৪১',
    sourceEn: 'Sahih al-Bukhari, Hadith 3667, 1241',
  },

  // =========================================================================
  // পর্ব ২ · সোমবার · আবু বকর (রা.)-এর আগমন (০৫ - ১২)
  // =========================================================================
  {
    no: 5,
    partNo: 2,
    timeContextBn: 'সোমবার দুপুর · আস-সুনহ থেকে মসজিদে নববী',
    timeContextEn: 'Monday Midday · As-Sunh to Masjid an-Nabawi',
    titleBn: 'ঘোড়া ছুটিয়ে আবু বকর (রা.)',
    titleEn: 'Abu Bakr (RA) Rushes Back on Horseback',
    pointsBn: [
      'খবর পেয়ে আবু বকর (রা.) ঘোড়ায় চড়ে সুনহ থেকে ছুটে এলেন।',
      'মসজিদে নেমে কারও সাথে কথা না বলে সোজা আয়েশা (রা.)-এর ঘরে ঢুকলেন।',
    ],
    pointsEn: [
      'Upon hearing the news, Abu Bakr (RA) mounted his horse and rode swiftly from As-Sunh.',
      'Dismounting at the mosque, he spoke to no one and walked straight into Aisha’s (RA) chamber.',
    ],
    detailedNarrativeBn:
      'আস-সুনহে বসেই যখন আবু বকর সিদ্দীক (রা.) সেই মর্মান্তিক সংবাদ পেলেন, এক মুহূর্তও বিলম্ব না করে ঘোড়ায় সওয়ার হয়ে মদিনার দিকে ছুটে এলেন। মসজিদে নববীর প্রাঙ্গণে তখন শোকের মাতম, মানুষের হাহাকার এবং উমর (রা.)-এর বজ্রকণ্ঠ চলছে। কিন্তু স্থির, ধীর ও অবিচল আবু বকর (রা.) ঘোড়া থেকে নেমে কারও সাথে একটিও কথা না বলে গভীর গাম্ভীর্যের সাথে সোজা কন্যা আয়েশা (রা.)-এর হুজরায় প্রবেশ করলেন—নিজ চোখে প্রিয় বন্ধুকে দেখার জন্য।',
    detailedNarrativeEn:
      'The instant word reached Abu Bakr (RA) in As-Sunh, he rode back in haste. Entering the courtyard of Masjid an-Nabawi amid weeping crowds and Umar’s impassioned words, he remained completely composed, speaking to no one as he went straight into Aisha’s (RA) room.',
    reflectionBn:
      'সংকটের মুহূর্তে অস্থির না হয়ে সত্য যাচাই করা ও ধৈর্য ধারণ করা প্রকৃত নেতৃত্বের প্রথম গুণ।',
    reflectionEn:
      'Remaining calm, verifying the truth first, and keeping composure in crisis defines true leadership.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১২৪১',
    sourceEn: 'Sahih al-Bukhari, Hadith 1241',
  },
  {
    no: 6,
    partNo: 2,
    timeContextBn: 'সোমবার দুপুর · হুজরায়ে আয়েশা (রা.)',
    timeContextEn: 'Monday Midday · Aisha’s (RA) Chamber',
    titleBn: 'চেহারা খুলে চুম্বন ও কান্না',
    titleEn: 'Uncovering the Blessed Face, Kissing & Weeping',
    pointsBn: [
      'চাদর সরিয়ে প্রিয় বন্ধুর চেহারা মোবারক দেখলেন, ঝুঁকে চুমু খেলেন, তারপর কেঁদে ফেললেন।',
      'বললেন, ‘আমার মা-বাবা আপনার জন্য কুরবান! আপনি জীবনে ও মরণে পবিত্র।’',
    ],
    pointsEn: [
      'He uncovered the Prophet’s blessed face, leaned down to kiss his forehead, and wept.',
      'He said: “May my father and mother be sacrificed for you! How pure you are in life and in death.”',
    ],
    detailedNarrativeBn:
      'হুজরায় প্রবেশ করে আবু বকর (রা.) ইয়েমেনি চাদরের কোণা আলতো করে সরিয়ে নবীজি ﷺ-এর নূরানী চেহারা মোবারকের দিকে তাকালেন। মৃত্যুর পরও সেই পবিত্র মুখমণ্ডলে ছিল অপার্থিব স্নিগ্ধতা ও সুবাস। গারে সওরের সেই আজীবন সাথী নুয়ে পড়ে প্রিয় বন্ধুর কপালে গভীর ভালোবাসায় চুম্বন এঁকে দিলেন এবং তাঁর চোখ বেয়ে অশ্রু গড়িয়ে পড়ল। আবেগঘন কণ্ঠে তিনি বললেন—“আমার পিতা-মাতা আপনার জন্য কুরবান হোক! আপনি জীবদ্দশায় যেমন পবিত্র ও সুবাসিত ছিলেন, মৃত্যুর পরও তেমনি পবিত্র।”',
    detailedNarrativeEn:
      'Stepping beside the Prophet (PBUH), Abu Bakr (RA) lifted the Yemeni cloak from his radiant face. Bending down, his lifelong companion of Cave Thawr kissed his forehead between the eyes as tears streamed down, saying: “May my father and mother be ransomed for you; fragrant and pure were you in life, and fragrant and pure are you in death.”',
    reflectionBn:
      'সত্যিকারের বন্ধুত্ব ও ঈমানি ভালোবাসা মৃত্যুর পরও পবিত্র আদব ও সম্মানে উজ্জ্বল হয়ে থাকে।',
    reflectionEn:
      'True companionship rooted in faith shines with reverence and tenderness even in the moment of parting.',
    arabicQuote: 'بِأَبِي أَنْتَ وَأُمِّي، طِبْتَ حَيًّا وَمَيِّتًا',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১২৪১, ৩৬৬৭',
    sourceEn: 'Sahih al-Bukhari, Hadith 1241, 3667',
  },
  {
    no: 7,
    partNo: 2,
    timeContextBn: 'সোমবার দুপুর · হুজরায়ে আয়েশা (রা.)',
    timeContextEn: 'Monday Midday · Aisha’s (RA) Chamber',
    titleBn: '‘দুবার মৃত্যু দেবেন না’',
    titleEn: '“Allah Will Never Make You Taste Two Deaths”',
    pointsBn: [
      'আবু বকর (রা.) বললেন, আল্লাহ আপনাকে দুবার মৃত্যুর স্বাদ দেবেন না।',
      'আপনার জন্য যে মৃত্যু লিখে রাখা ছিল, তা আপনি বরণ করে নিয়েছেন।',
    ],
    pointsEn: [
      'Abu Bakr (RA) said: “By Allah, Allah will never combine two deaths upon you.”',
      '“The death decreed for you—you have now tasted and fulfilled it.”',
    ],
    detailedNarrativeBn:
      'চুম্বন ও অশ্রু বিসর্জনের পর আবু বকর (রা.) প্রগাঢ় ঈমানি প্রজ্ঞা থেকে একটি অসাধারণ সত্য উচ্চারণ করলেন। তিনি বললেন, “আল্লাহর কসম! আল্লাহ আপনার ওপর কখনোই দুটি মৃত্যু একত্র করবেন না। যে একটি মৃত্যু আপনার জন্য নির্ধারিত ছিল, তা আপনি ইতোমধ্যেই বরণ করে নিয়েছেন।” এর মাধ্যমে তিনি স্পষ্ট বুঝিয়ে দিলেন যে নবীজি ﷺ-এর ইন্তেকাল সত্য ও বাস্তব—তাঁর আবার দুনিয়ায় ফিরে এসে দ্বিতীয়বার মৃত্যুবরণ করার কোনো অবকাশ নেই। এরপর তিনি পরম যত্নে চাদরটি আবার ঢেকে দিলেন।',
    detailedNarrativeEn:
      'With crystal clarity of creed, Abu Bakr (RA) spoke directly to the reality of the moment: “By Allah, Allah will never combine two deaths upon you. As for the single death decreed for you, you have already tasted it.” He then gently replaced the cloak over the Prophet’s blessed face.',
    reflectionBn:
      'তীব্র ব্যক্তিগত শোকের মধ্যেও আকিদা ও বাস্তবতায় অটল থাকা ছিল সিদ্দীকে আকবরের অনন্য বৈশিষ্ট্য।',
    reflectionEn:
      'Even in personal heartbreak, Abu Bakr (RA) held firmly to pure creed and clarity of truth.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১২৪১',
    sourceEn: 'Sahih al-Bukhari, Hadith 1241',
  },
  {
    no: 8,
    partNo: 2,
    timeContextBn: 'সোমবার দুপুর · মসজিদে নববী প্রাঙ্গণ',
    timeContextEn: 'Monday Midday · Masjid an-Nabawi Courtyard',
    titleBn: '‘উমর, বসো’',
    titleEn: '“Sit Down, O Umar”',
    pointsBn: [
      'বেরিয়ে এসে দেখলেন উমর (রা.) লোকদের উদ্দেশে কথা বলছেন। বললেন, ‘উমর, বসো।’',
      'উমর (রা.) বসলেন না; তখন লোকেরা উমরকে ছেড়ে আবু বকর (রা.)-এর দিকে এগিয়ে এলো।',
    ],
    pointsEn: [
      'Stepping back out, he saw Umar (RA) still addressing the crowd and gently said: “Sit down, Umar.”',
      'When Umar (RA) did not sit, the people turned from Umar and gathered around Abu Bakr (RA).',
    ],
    detailedNarrativeBn:
      'হুজরা থেকে বের হয়ে মসজিদে নববীতে আসতেই আবু বকর (রা.) দেখলেন, হযরত উমর (রা.) তখনো শোকে বিহ্বল হয়ে দাঁড়িয়ে মানুষকে বলছেন যে নবীজি ﷺ মারা যাননি। আবু বকর (রা.) অত্যন্ত শান্ত কিন্তু দৃঢ় কণ্ঠে বললেন: “হে উমর, বসে পড়ো।” কিন্তু শোকের আবেশে উমর (রা.) তখনো থামতে পারলেন না। তখন আবু বকর (রা.) কোনো তর্কে না জড়িয়ে নিজেই আল্লাহর প্রশংসা (তাশাহহুদ) শুরু করলেন। তাঁর গম্ভীর ও প্রশান্ত কণ্ঠস্বর শুনে উপস্থিত সাহাবিরা তৎক্ষণাৎ উমর (রা.)-কে ছেড়ে আবু বকর (রা.)-এর চারপাশে সমবেত হলেন।',
    detailedNarrativeEn:
      'Emerging into the mosque, Abu Bakr (RA) found Umar (RA) still speaking passionately to the shaken crowd. Calmly, Abu Bakr urged twice, “Sit down, Umar.” When Umar remained standing in grief, Abu Bakr simply stepped forward and began praising Allah; instantly, the entire gathering turned their attention to him.',
    reflectionBn:
      'প্রজ্ঞাপূর্ণ নীরবতা ও দৃঢ় অবস্থান যেকোনো উত্তেজনাকর পরিস্থিতিকে সহজেই শান্ত করতে পারে।',
    reflectionEn:
      'Calm wisdom and dignified firmness soothe even the most turbulent emotional crisis.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১২৪২',
    sourceEn: 'Sahih al-Bukhari, Hadith 1242',
  },
  {
    no: 9,
    partNo: 2,
    timeContextBn: 'সোমবার দুপুর · মসজিদে নববী',
    timeContextEn: 'Monday Midday · Masjid an-Nabawi',
    titleBn: 'ইতিহাসের সবচেয়ে দৃঢ় ভাষণ',
    titleEn: 'The Most Resolute Speech in History',
    pointsBn: [
      'তাশাহহুদ পড়ে বললেন, যে মুহাম্মাদ ﷺ-এর ইবাদত করত, সে জেনে রাখুক, তিনি ইন্তেকাল করেছেন।',
      'আর যে আল্লাহর ইবাদত করে, নিশ্চয়ই আল্লাহ চিরঞ্জীব, তিনি কখনো মরবেন না।',
    ],
    pointsEn: [
      'After reciting the Tashahhud, he declared: “Whoever used to worship Muhammad (PBUH), know that Muhammad has passed away.”',
      '“And whoever worships Allah, indeed Allah is Ever-Living and never dies.”',
    ],
    detailedNarrativeBn:
      'ইসলামের ইতিহাসের অন্যতম চরম ক্রান্তিলগ্নে আবু বকর সিদ্দীক (রা.) এমন একটি অমর ঘোষণা দিলেন যা গোটা উম্মতের ঈমানকে রক্ষা করল। আল্লাহর হামদ ও সানা পাঠ করে তিনি বজ্রদৃঢ় কণ্ঠে বললেন: “অতঃপর, তোমাদের মধ্যে যে ব্যক্তি মুহাম্মাদ ﷺ-এর ইবাদত করত, সে জেনে রাখুক যে মুহাম্মাদ ﷺ ইন্তেকাল করেছেন। আর যে ব্যক্তি মহান আল্লাহর ইবাদত করে, সে জেনে রাখুক—নিশ্চয়ই আল্লাহ চিরঞ্জীব, তাঁর কখনো মৃত্যু নেই।” এই দুটি বাক্য মুহূর্তেই উম্মাহকে ব্যক্তিপূজার মোহ থেকে মুক্ত করে চিরঞ্জীব আল্লাহর তাওহীদের ওপর অবিচল করে দিল।',
    detailedNarrativeEn:
      'At the most fragile turning point in Islamic history, Abu Bakr (RA) delivered words that anchored the Ummah forever: “Whoever among you worshipped Muhammad, know that Muhammad has died. And whoever worships Allah—verily Allah is Ever-Living and will never die.” In two sentences, he steadied every heart upon pure Tawhid.',
    reflectionBn:
      'ইসলামের কেন্দ্রবিন্দু চিরঞ্জীব মহান আল্লাহ—তাঁর দ্বীন কিয়ামত পর্যন্ত অটুট ও অক্ষয়।',
    reflectionEn:
      'Islam’s eternal anchor is Allah the Ever-Living; His message endures for all time.',
    arabicQuote: 'مَنْ كَانَ يَعْبُدُ مُحَمَّدًا فَإِنَّ مُحَمَّدًا قَدْ مَاتَ، وَمَنْ كَانَ يَعْبُدُ اللَّهَ فَإِنَّ اللَّهَ حَيٌّ لَا يَمُوتُ',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১২৪২, ৩৬৬৮',
    sourceEn: 'Sahih al-Bukhari, Hadith 1242, 3668',
  },
  {
    no: 10,
    partNo: 2,
    timeContextBn: 'সোমবার দুপুর · মসজিদে নববী',
    timeContextEn: 'Monday Midday · Masjid an-Nabawi',
    titleBn: 'কুরআনের দুটি আয়াত',
    titleEn: 'Reciting Two Decisive Verses of the Quran',
    pointsBn: [
      'তিনি পড়লেন সূরা যুমার: ৩০, ‘নিশ্চয়ই আপনিও মরণশীল, আর তারাও মরণশীল।’',
      'এরপর সূরা আলে ইমরান: ১৪৪, ‘মুহাম্মাদ একজন রাসূল মাত্র; তাঁর আগেও বহু রাসূল গত হয়েছেন...’',
    ],
    pointsEn: [
      'He recited Surah Az-Zumar (39:30): “Indeed, you are to die, and indeed, they are to die.”',
      'Then Surah Al-Imran (3:144): “Muhammad is not but a messenger. Other messengers have passed on before him...”',
    ],
    detailedNarrativeBn:
      'নিজের বক্তব্যকে পবিত্র কুরআনের অকাট্য দলিল দিয়ে প্রতিষ্ঠিত করতে আবু বকর (রা.) দুটি সুস্পষ্ট আয়াত তিলাওয়াত করলেন। প্রথমে সূরা আয-যুমারের ৩০ নং আয়াত: “নিশ্চয়ই আপনিও মৃত্যুবরণ করবেন এবং তারাও মৃত্যুবরণ করবে।” এরপর সূরা আলে ইমরানের ১৪৪ নং আয়াত: “মুহাম্মাদ একজন রাসূল ছাড়া আর কিছু নন; তাঁর পূর্বে বহু রাসূল গত হয়ে গেছেন। তবে কি তিনি যদি মৃত্যুবরণ করেন বা নিহত হন, তবে তোমরা পেছনের দিকে ফিরে যাবে?” এই ঐশী বাণী শুনে সাহাবিদের হৃদয়ের সব ধোঁয়াশা কেটে গেল।',
    detailedNarrativeEn:
      'Sealing his message with divine scripture, Abu Bakr (RA) recited Surah Az-Zumar 39:30 (“Indeed you will die, and indeed they will die”) followed by Surah Al-Imran 3:144 (“Muhammad is only a messenger; messengers have passed away before him. So if he dies or is killed, will you turn back on your heels?”).',
    reflectionBn:
      'জীবনের সবচেয়ে বড় সংকটে সঠিক দিশা পাওয়ার সর্বোত্তম আশ্রয় হলো পবিত্র কুরআন।',
    reflectionEn:
      'In moments of overwhelming crisis, the Quran provides the clearest guidance and healing.',
    arabicQuote: 'وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৬৮',
    sourceEn: 'Sahih al-Bukhari, Hadith 3668',
  },
  {
    no: 11,
    partNo: 2,
    timeContextBn: 'সোমবার দুপুর · সমগ্র মদিনা',
    timeContextEn: 'Monday Midday · Across Madinah',
    titleBn: 'সবার মুখে মুখে সেই আয়াত',
    titleEn: 'The Verse Echoed on Every Tongue in Madinah',
    pointsBn: [
      'মনে হচ্ছিল, আবু বকর (রা.) পড়ার আগে কেউ যেন এই আয়াত জানতই না।',
      'এরপর যে-ই শুনল, সে-ই আয়াতটি তিলাওয়াত করতে লাগল; পুরো মদিনা যেন বাস্তবতা মেনে নিল।',
    ],
    pointsEn: [
      'It felt as if no one had ever realized this verse was revealed until Abu Bakr (RA) recited it.',
      'Everyone who heard it began reciting it aloud, and all of Madinah came to terms with the painful reality.',
    ],
    detailedNarrativeBn:
      'হযরত ইবনে আব্বাস (রা.) বর্ণনা করেন—আল্লাহর কসম! মনে হচ্ছিল যেন আবু বকর (রা.) তিলাওয়াত করার আগে মানুষ জানতই না যে আল্লাহ এই আয়াতটি নাযিল করেছেন। আবু বকর (রা.)-এর মুখ থেকে শোনামাত্রই সব মানুষ তাঁর কাছ থেকে আয়াতটি গ্রহণ করে নিল। মদিনার রাস্তায়, ঘরে, মসজিদে—যেখানেই কোনো মানুষকে দেখা যেত, তাঁর মুখেই ধ্বনিত হচ্ছিল সূরা আলে ইমরানের সেই আয়াত। শোক তখনো ছিল অসীম, কিন্তু বিভ্রান্তি দূর হয়ে পুরো মদিনা ধৈর্য ও বাস্তবতায় ফিরে এলো।',
    detailedNarrativeEn:
      'Ibn Abbas (RA) narrated: “By Allah, it was as though people did not know Allah had revealed this verse until Abu Bakr recited it! Everyone took it from him, and I heard no one in the streets of Madinah except that they were reciting it.” Confusion lifted, and the entire city accepted Allah’s decree with patience.',
    reflectionBn:
      'সঠিক সময়ে বলা একটি কুরআনের আয়াত গোটা জাতির হৃদয়ে প্রশান্তি ও ভারসাম্য ফিরিয়ে আনতে পারে।',
    reflectionEn:
      'A single verse of truth spoken at the right moment can steady an entire nation.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১২৪২, ৪৪৫৪',
    sourceEn: 'Sahih al-Bukhari, Hadith 1242, 4454',
  },
  {
    no: 12,
    partNo: 2,
    timeContextBn: 'সোমবার দুপুর · মসজিদে নববী',
    timeContextEn: 'Monday Midday · Masjid an-Nabawi',
    titleBn: 'উমর (রা.)-এর পা কাঁপছিল',
    titleEn: 'Umar’s (RA) Knees Gave Way',
    pointsBn: [
      'উমর (রা.) পরে বলেন, আবু বকরকে আয়াতটি পড়তে শুনে আমার পা আর আমাকে ধরে রাখতে পারল না।',
      'আমি মাটিতে পড়ে গেলাম, আর বুঝলাম নবীজি ﷺ সত্যিই ইন্তেকাল করেছেন।',
    ],
    pointsEn: [
      'Umar (RA) later recounted: “When I heard Abu Bakr recite that verse, my legs could no longer hold me up.”',
      '“I collapsed to the ground, finally realizing that the Prophet (PBUH) had truly passed away.”',
    ],
    detailedNarrativeBn:
      'যে উমর ইবনুল খাত্তাব (রা.) কিছুক্ষণ আগেই দাঁড়িয়ে দৃঢ় কণ্ঠে নবীজির মৃত্যুর কথা অস্বীকার করছিলেন, আবু বকর (রা.)-এর কণ্ঠে কুরআনের সেই আয়াত শোনামাত্রই তাঁর সমস্ত শরীর থরথর করে কেঁপে উঠল। তিনি নিজেই পরে সেই মুহূর্তের বর্ণনা দিয়ে বলেছেন—“আল্লাহর কসম! আবু বকরকে আয়াতটি পড়তে শোনামাত্রই আমি হতভম্ব হয়ে পড়লাম, আমার দুটো পা আর শরীরের ভার ধরে রাখতে পারল না। আমি মাটিতে লুটিয়ে পড়লাম এবং তখনই আমার হৃদয়ে স্থির বিশ্বাস জন্মাল যে রাসূলুল্লাহ ﷺ সত্যিই আমাদের ছেড়ে চলে গেছেন।”',
    detailedNarrativeEn:
      'Umar (RA) himself later recalled that overwhelming moment: “By Allah, no sooner did I hear Abu Bakr recite it than I was struck motionless—my legs could not support me, and I fell to the ground knowing with certainty that the Messenger of Allah (PBUH) had truly died.”',
    reflectionBn:
      'কুরআনের বাণীর সামনে মুমিনের হৃদয় যতই আবেগাপ্লুত হোক, বিনয়ের সাথে সত্যকে মেনে নেয়।',
    reflectionEn:
      'Before the word of Allah, a believer’s heart surrenders humbly to the truth.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৫৪',
    sourceEn: 'Sahih al-Bukhari, Hadith 4454',
  },

  // =========================================================================
  // পর্ব ৩ · সোমবার · সাকিফা বনু সাইদা (১৩ - ১৬)
  // =========================================================================
  {
    no: 13,
    partNo: 3,
    timeContextBn: 'সোমবার বিকাল · সাকিফা বনু সাইদা',
    timeContextEn: 'Monday Afternoon · Saqifah Bani Sa‘idah',
    titleBn: 'সাকিফায় আনসারদের জমায়েত',
    titleEn: 'Gathering of the Ansar at Saqifah Bani Sa‘idah',
    pointsBn: [
      'সেদিনই আনসাররা জড়ো হলেন সাকিফা বনু সাইদায়, সা‘দ ইবনে উবাদা (রা.)-এর কাছে।',
      'তাঁরা বললেন, ‘আমাদের মধ্য থেকে একজন আমির, আর তোমাদের মধ্য থেকে একজন।’',
    ],
    pointsEn: [
      'That same day, the Ansar gathered at the hall of Saqifah Bani Sa‘idah around Sa‘d ibn Ubadah (RA).',
      'During the discussion, a proposal arose: “Let there be one leader from among us and one from among you.”',
    ],
    detailedNarrativeBn:
      'নবীজি ﷺ-এর ইন্তেকালের দিনেই মুসলিম উম্মাহর নেতৃত্বশূন্যতা এড়াতে মদিনার আনসার সাহাবিরা বনু সাইদা গোত্রের ছাউনিঘরে (‘সাকিফা বনু সাইদা’) সমবেত হলেন। তাঁদের মধ্যে ছিলেন খাযরাজ গোত্রের নেতা সা‘দ ইবনে উবাদা (রা.)। মুসলিম সমাজের ভবিষ্যৎ নিরাপত্তা ও ঐক্য নিয়ে আলোচনার একপর্যায়ে প্রস্তাব ওঠে—মুহাজির ও আনসারদের মধ্য থেকে দুজন আলাদা আমির নিযুক্ত করা হোক। কিন্তু একই রাষ্ট্রে দুটি নেতৃত্ব তৈরি হলে উম্মাহ বিভক্ত হয়ে পড়ার আশঙ্কা দেখা দিল।',
    detailedNarrativeEn:
      'On that very afternoon, concerned about preventing a leadership vacuum, the Ansar convened at the sheltered hall of Banu Sa‘idah around Sa‘d ibn Ubadah (RA). In the intense discussion over who should lead the Ummah next, the idea was raised of having one leader from the Ansar and one from the Muhajirun—a proposal that risked dividing the fledgling community.',
    reflectionBn:
      'ইসলামী উম্মাহর ঐক্য রক্ষার জন্য নেতৃত্বের প্রশ্নে দ্রুত ও দায়িত্বশীল সিদ্ধান্ত গ্রহণ ছিল সময়ের দাবি।',
    reflectionEn:
      'Preserving the unity of the Ummah demanded swift, responsible consensus on leadership.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৬৮',
    sourceEn: 'Sahih al-Bukhari, Hadith 3668',
  },
  {
    no: 14,
    partNo: 3,
    timeContextBn: 'সোমবার বিকাল · সাকিফা বনু সাইদা',
    timeContextEn: 'Monday Afternoon · Saqifah Bani Sa‘idah',
    titleBn: 'আবু বকর, উমর ও আবু উবাইদা (রা.)',
    titleEn: 'Arrival of Abu Bakr, Umar & Abu Ubaydah (RA)',
    pointsBn: [
      'খবর পেয়ে আবু বকর, উমর ও আবু উবাইদা (রা.) সাকিফায় গেলেন।',
      'উমর (রা.) কথা বলতে চাইলেন, কিন্তু আবু বকর (রা.) থামালেন; পরে উমর (রা.) বলেন, তিনি ছিলেন সবচেয়ে বাগ্মী।',
    ],
    pointsEn: [
      'Upon receiving word, Abu Bakr, Umar, and Abu Ubaydah ibn al-Jarrah (RA) hastened to Saqifah.',
      'Umar (RA) wanted to speak first, but Abu Bakr gently signaled him to wait; Umar later admitted Abu Bakr was the wisest and most eloquent of all.',
    ],
    detailedNarrativeBn:
      'সাকিফায় আনসারদের জমায়েতের খবর পেয়ে আবু বকর (রা.), উমর (রা.) এবং আমীনুল উম্মাহ আবু উবাইদা ইবনুল জাররাহ (রা.) দ্রুত সেখানে উপস্থিত হলেন। পথেই উমর (রা.) মনে মনে একটি সুন্দর বক্তব্য সাজিয়ে রেখেছিলেন যাতে পরিবেশ শান্ত থাকে। সেখানে পৌঁছেই তিনি কথা বলতে উদ্যত হলেন, কিন্তু প্রাজ্ঞ আবু বকর (রা.) তাঁকে শান্তভাবে থামিয়ে নিজে কথা বললেন। পরে উমর (রা.) অকপটে স্বীকার করেছেন—“আমি যেসব ভালো কথা মনে মনে গুছিয়ে এনেছিলাম, আবু বকর তার সবই আরও সুন্দর, হৃদয়গ্রাহী ও প্রজ্ঞাপূর্ণ ভাষায় বলে দিয়েছিলেন; তিনি ছিলেন মানুষের মধ্যে সবচেয়ে ধীরস্থির ও বাগ্মী।”',
    detailedNarrativeEn:
      'Informed of the gathering, Abu Bakr, Umar, and Abu Ubaydah (RA) hurried to Saqifah. Umar (RA) had carefully prepared a speech in his mind and moved to speak first, fearing tempers might flare, but Abu Bakr gently asked him to wait. Umar later marveled that Abu Bakr expressed every wise point he had intended—and even better—with unmatched grace and eloquence.',
    reflectionBn:
      'সংবেদনশীল মুহূর্তে ক্রোধ নয়, বরং বিনয়ী ও প্রজ্ঞাময় বচনই মানুষের হৃদয় জয় করে।',
    reflectionEn:
      'In delicate moments, gentle wisdom wins hearts far more effectively than heated debate.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৬৮',
    sourceEn: 'Sahih al-Bukhari, Hadith 3668',
  },
  {
    no: 15,
    partNo: 3,
    timeContextBn: 'সোমবার বিকাল · সাকিফা বনু সাইদা',
    timeContextEn: 'Monday Afternoon · Saqifah Bani Sa‘idah',
    titleBn: '‘আমরা আমির, তোমরা উজির’',
    titleEn: '“We Shall Be the Leaders, and You the Advisors”',
    pointsBn: [
      'আবু বকর (রা.) বললেন, ‘আমরা হব আমির, আর তোমরা উজির (পরামর্শদাতা)।’',
      'আনসারদের মর্যাদা স্বীকার করেই তিনি উম্মাহকে এক নেতৃত্বের দিকে আহ্বান জানালেন।',
    ],
    pointsEn: [
      'Abu Bakr (RA) addressed them warmly: “We shall be the leaders (Umara), and you shall be the ministers and advisors (Wuzara).”',
      'Honoring the immense merit of the Ansar, he called the Ummah to remain united under one leadership.',
    ],
    detailedNarrativeBn:
      'সাকিফায় আবু বকর (রা.) প্রথমেই আনসারদের অসামান্য ত্যাগ, মদিনায় আশ্রয় দান এবং ইসলামের জন্য তাঁদের অনন্য মর্যাদার অকুণ্ঠ প্রশংসা করলেন। এরপর বাস্তবতা তুলে ধরে বললেন—সমগ্র আরবের গোত্রগুলো কুরাইশ বংশের নেতৃত্ব ছাড়া অন্য কারও নেতৃত্ব সহজে মেনে নেবে না, ফলে ইসলামী রাষ্ট্রের ঐক্য বিনষ্ট হতে পারে। তাই তিনি পরম শ্রদ্ধার সাথে বললেন: “আমির হব আমরা (মুহাজিররা), আর তোমরা (আনসাররা) হবে আমাদের উজির ও ঘনিষ্ঠ পরামর্শদাতা—তোমাদের পরামর্শ ছাড়া কোনো সিদ্ধান্তই নেওয়া হবে না।” এরপর তিনি উমর (রা.) ও আবু উবাইদা (রা.)-এর হাত ধরে বললেন, এঁদের যেকোনো একজনকে তোমরা বাইয়াত দাও।',
    detailedNarrativeEn:
      'Abu Bakr (RA) began by wholeheartedly honoring the Ansar’s sacrifices and exalted rank in Islam. He then explained that Arab tribes across the peninsula would unite cohesively only under Quraysh leadership, saying: “We shall be the leaders, and you the advisors—no affair will be decided without consulting you.” Displaying utter selflessness, he then held the hands of Umar and Abu Ubaydah and proposed pledging to either of them.',
    reflectionBn:
      'অন্যের অবদান ও মর্যাদাকে সম্মান জানিয়ে ঐক্যের ডাক দিলে মতভেদ দূর হয়ে ভ্রাতৃত্ব সুদৃঢ় হয়।',
    reflectionEn:
      'Acknowledging others’ sacrifices with sincerity turns potential division into enduring brotherhood.',
    arabicQuote: 'نَحْنُ الأُمَرَاءُ وَأَنْتُمُ الوُزَرَاءُ',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৬৮',
    sourceEn: 'Sahih al-Bukhari, Hadith 3668',
  },
  {
    no: 16,
    partNo: 3,
    timeContextBn: 'সোমবার বিকাল · সাকিফা বনু সাইদা',
    timeContextEn: 'Monday Afternoon · Saqifah Bani Sa‘idah',
    titleBn: 'উমর (রা.)-এর হাতে প্রথম বাইয়াত',
    titleEn: 'Umar (RA) Gives the First Pledge to Abu Bakr (RA)',
    pointsBn: [
      'উমর (রা.) বললেন, আপনি আমাদের নেতা, আমাদের মধ্যে শ্রেষ্ঠ, রাসূলুল্লাহ ﷺ-এর সবচেয়ে প্রিয়।',
      'তিনি আবু বকর (রা.)-এর হাত ধরে বাইয়াত দিলেন, এরপর উপস্থিত সবাই বাইয়াত দিলেন।',
    ],
    pointsEn: [
      'Umar (RA) exclaimed: “No! You are our leader, the best among us, and the dearest of us to the Messenger of Allah (PBUH).”',
      'He clasped Abu Bakr’s (RA) hand and pledged allegiance, followed immediately by all those present.',
    ],
    detailedNarrativeBn:
      'আবু বকর (রা.) যখন নিজে পদ না চেয়ে উমর (রা.) ও আবু উবাইদা (রা.)-এর নাম প্রস্তাব করলেন, তখন উমর (রা.) দৃঢ়ভাবে বলে উঠলেন: “কখনোই না! বরং আমরা আপনার হাতেই বাইয়াত দেব। কারণ আপনিই আমাদের নেতা, আমাদের মধ্যে সর্বশ্রেষ্ঠ এবং রাসূলুল্লাহ ﷺ-এর সবচেয়ে প্রিয়পাত্র—যাঁকে তিনি অসুস্থ অবস্থায় সালাতের ইমামতি করার নির্দেশ দিয়েছিলেন।” এই বলে উমর (রা.) এগিয়ে গিয়ে সর্বপ্রথম আবু বকর (রা.)-এর হাতে বাইয়াত গ্রহণ করলেন। তাঁর পরপরই আবু উবাইদা (রা.) ও উপস্থিত আনসার-মুহাজির সবাই একযোগে বাইয়াত দিলেন—ফলে এক ভয়াবহ বিভক্তির হাত থেকে উম্মাহ রক্ষা পেল।',
    detailedNarrativeEn:
      'Refusing to step ahead of his elder, Umar (RA) declared: “No, we pledge allegiance to you! You are our chief, the best among us, and the most beloved to the Messenger of Allah (PBUH).” Clasping Abu Bakr’s hand first, Umar gave the initial Bay‘ah, immediately followed by Abu Ubaydah and the Ansar and Muhajirun assembled there.',
    reflectionBn:
      'নিজ স্বার্থ নয়, বরং যোগ্যতম ব্যক্তিকে অগ্রাধিকার দেওয়ার মধ্য দিয়েই সাহাবিরা উম্মতের ঐক্য রক্ষা করেছিলেন।',
    reflectionEn:
      'By selflessly putting the most qualified leader forward, the Companions safeguarded the Ummah’s unity.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৬৮',
    sourceEn: 'Sahih al-Bukhari, Hadith 3668',
  },

  // =========================================================================
  // পর্ব ৪ · মঙ্গলবার · সাধারণ বাইয়াত (১৭ - ২০)
  // =========================================================================
  {
    no: 17,
    partNo: 4,
    timeContextBn: 'মঙ্গলবার সকাল · মসজিদে নববী',
    timeContextEn: 'Tuesday Morning · Masjid an-Nabawi',
    titleBn: 'মঙ্গলবার: মিম্বারে উমর (রা.)',
    titleEn: 'Tuesday: Umar (RA) Addresses the Congregation',
    pointsBn: [
      'ইন্তেকালের পরের দিন উমর (রা.) মিম্বারে বসে ভাষণ দিলেন; আবু বকর (রা.) তখন চুপ ছিলেন।',
      'তিনি সবাইকে আবু বকর (রা.)-এর হাতে বাইয়াতের আহ্বান জানালেন।',
    ],
    pointsEn: [
      'The following day, Umar (RA) addressed the people before Abu Bakr spoke while Abu Bakr sat silently on the pulpit.',
      'He apologized for his emotional words the previous day and urged everyone to pledge allegiance to Abu Bakr (RA).',
    ],
    detailedNarrativeBn:
      'পরদিন মঙ্গলবার সকালে মসজিদে নববীতে সমগ্র মদিনাবাসী সমবেত হলেন। নবীজি ﷺ-এর মিম্বারে আবু বকর (রা.) নীরবে বসে ছিলেন, আর তাঁর পূর্বে দাঁড়িয়ে ভাষণ দিলেন হযরত উমর (রা.)। তিনি আগের দিনের আবেগতাড়িত কথার জন্য বিনয়ের সাথে আল্লাহর কাছে ক্ষমা প্রার্থনা করলেন এবং বললেন—“আল্লাহ তোমাদের বিষয়টি তোমাদের মধ্যে সর্বোত্তম ব্যক্তির হাতে ন্যস্ত করেছেন, যিনি ছিলেন রাসূলুল্লাহ ﷺ-এর সাথী এবং গুহায় দুজনের দ্বিতীয়জন। অতএব, তোমরা উঠে দাঁড়াও এবং তাঁর হাতে বাইয়াত দাও।”',
    detailedNarrativeEn:
      'The next morning in Masjid an-Nabawi, Abu Bakr (RA) sat quietly while Umar (RA) stood to address the general public. Humbly acknowledging his emotional reaction the day before, Umar reminded everyone that Abu Bakr was the Prophet’s closest companion and the second of the two in Cave Thawr, calling the entire community to pledge allegiance to him.',
    reflectionBn:
      'নিজের পূর্বের আবেগতাড়িত ভুল প্রকাশ্যে স্বীকার করা উমর (রা.)-এর অসাধারণ বিনয় ও সততার পরিচায়ক।',
    reflectionEn:
      'Publicly acknowledging an emotional misjudgment reflects Umar’s (RA) extraordinary humility and integrity.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৭২১৯',
    sourceEn: 'Sahih al-Bukhari, Hadith 7219',
  },
  {
    no: 18,
    partNo: 4,
    timeContextBn: 'মঙ্গলবার সকাল · মসজিদে নববী',
    timeContextEn: 'Tuesday Morning · Masjid an-Nabawi',
    titleBn: 'মসজিদে নববীতে সাধারণ বাইয়াত',
    titleEn: 'The General Pledge (Bay‘ah al-‘Ammah)',
    pointsBn: [
      'সাকিফায় অল্প কয়েকজন আগেই বাইয়াত দিয়েছিলেন; এবার মসজিদে নববীতে সবার সামনে সাধারণ বাইয়াত হলো।',
      'এভাবে আবু বকর (রা.) হলেন ইসলামের প্রথম খলিফা।',
    ],
    pointsEn: [
      'Following the smaller pledge at Saqifah, the general public pledge took place openly in Masjid an-Nabawi.',
      'Thus, Abu Bakr as-Siddiq (RA) officially became the first Caliph of Islam.',
    ],
    detailedNarrativeBn:
      'উমর (রা.)-এর আহ্বানের পর মসজিদে নববীতে উপস্থিত সমগ্র মুহাজির, আনসার ও সাধারণ মুসলিমরা সারি বেঁধে এগিয়ে এসে হযরত আবু বকর সিদ্দীক (রা.)-এর হাতে ‘বাইয়াতে আম্মাহ’ বা সাধারণ বাইয়াত প্রদান করলেন। সাকিফায় যে খিলাফতের সূচনা হয়েছিল, মসজিদে নববীর এই সর্বজনীন সম্মতির মাধ্যমে তা পূর্ণতা পেল। রাসূলুল্লাহ ﷺ-এর দাফনের আগেই উম্মাহ একজন সর্বজনমান্য খলিফা ও অভিভাবক লাভ করল।',
    detailedNarrativeEn:
      'Responding to Umar’s call, the Muhajirun, Ansar, and citizens of Madinah came forward in Masjid an-Nabawi to offer the public pledge of allegiance (Bay‘ah al-‘Ammah). Through open communal consensus, Abu Bakr (RA) became the first Caliph (Khalifat Rasulillah) before the Prophet’s burial.',
    reflectionBn:
      'সর্বজনীন পরামর্শ ও জনসম্মতির ভিত্তিতে নেতৃত্ব নির্বাচন ইসলামের রাজনৈতিক প্রজ্ঞার উজ্জ্বল দৃষ্টান্ত।',
    reflectionEn:
      'Selecting leadership through consultation and open public consent is a cornerstone of Islamic governance.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৭২১৯',
    sourceEn: 'Sahih al-Bukhari, Hadith 7219',
  },
  {
    no: 19,
    partNo: 4,
    timeContextBn: 'মঙ্গলবার সকাল · খলিফার প্রথম ভাষণ',
    timeContextEn: 'Tuesday Morning · First Caliphal Address',
    titleBn: '‘আমি তোমাদের শ্রেষ্ঠ নই’',
    titleEn: '“I Have Been Given Authority, Yet I Am Not the Best of You”',
    pointsBn: [
      'প্রথম ভাষণে খলিফা বললেন, আমাকে দায়িত্ব দেওয়া হয়েছে, অথচ আমি তোমাদের মধ্যে শ্রেষ্ঠ নই।',
      'ভালো করলে সাহায্য করো, আর ভুল করলে শুধরে দিও। সত্য হলো আমানত, মিথ্যা হলো খেয়ানত।',
    ],
    pointsEn: [
      'In his inaugural address, the Caliph said: “I have been given authority over you, though I am not the best among you.”',
      '“If I do well, help me; if I err, correct me. Truthfulness is a sacred trust, and falsehood is betrayal.”',
    ],
    detailedNarrativeBn:
      'সাধারণ বাইয়াত সম্পন্ন হওয়ার পর ইসলামের প্রথম খলিফা আবু বকর সিদ্দীক (রা.) মিম্বারে দাঁড়িয়ে ইতিহাসের সবচেয়ে সংক্ষিপ্ত অথচ যুগান্তকারী নীতিভাষণ প্রদান করলেন। ক্ষমতার দম্ভ নয়, বরং চরম বিনয় নিয়ে তিনি ঘোষণা করলেন: “হে জনগণ! আমাকে তোমাদের দায়িত্বশীল নিযুক্ত করা হয়েছে, অথচ আমি তোমাদের মধ্যে সর্বোত্তম নই। আমি যদি সঠিকভাবে কাজ করি তবে আমাকে সহযোগিতা করো, আর যদি ভুল করি তবে আমাকে সোজা করে দিও। সত্যবাদিতা হলো আমানত, আর মিথ্যা হলো খেয়ানত।”',
    detailedNarrativeEn:
      'Rising to deliver his inaugural address as Caliph, Abu Bakr (RA) set an eternal standard of humble accountability: “O people, I have been placed in charge of you, though I am not the best of you. If I act rightly, assist me; if I go wrong, set me straight. Truth is a trust, and lying is treachery.”',
    reflectionBn:
      'প্রকৃত শাসক সমালোচনাকে ভয় পান না, বরং জনগণের সৎ সংশোধনকে আল্লাহর রহমত মনে করেন।',
    reflectionEn:
      'A righteous leader welcomes honest counsel and accountability rather than flattery.',
    sourceBn: 'ইবনে হিশাম, আস-সীরাতুন নাবাবিয়্যাহ, খণ্ড ২, পৃষ্ঠা ৬৬১',
    sourceEn: 'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 2, p. 661',
  },
  {
    no: 20,
    partNo: 4,
    timeContextBn: 'মঙ্গলবার সকাল · খলিফার প্রথম ভাষণ',
    timeContextEn: 'Tuesday Morning · First Caliphal Address',
    titleBn: '‘আল্লাহর আনুগত্য করলে আমার আনুগত্য করো’',
    titleEn: '“Obey Me So Long As I Obey Allah and His Messenger”',
    pointsBn: [
      'তিনি বলেন, তোমাদের দুর্বলেরা আমার কাছে শক্তিশালী, যতক্ষণ না তার হক আদায় করে দিই।',
      'আল্লাহ ও তাঁর রাসূলের আনুগত্য করলে আমার আনুগত্য করো; অবাধ্য হলে আমার আনুগত্য তোমাদের ওপর নেই।',
    ],
    pointsEn: [
      'He declared: “The weak among you is strong in my sight until I restore their rightful due, Allah willing.”',
      '“Obey me as long as I obey Allah and His Messenger; if I disobey them, you owe me no obedience.”',
    ],
    detailedNarrativeBn:
      'ভাষণের দ্বিতীয় অংশে আবু বকর (রা.) ইসলামী রাষ্ট্রের ন্যায়বিচার ও জবাবদিহিতার মানদণ্ড ঘোষণা করলেন। তিনি বললেন: “তোমাদের মধ্যে যে দুর্বল, সে আমার কাছে শক্তিশালী—যতক্ষণ না আমি তার প্রাপ্য হক আদায় করে দিই। আর যে শক্তিশালী, সে আমার কাছে দুর্বল—যতক্ষণ না তার কাছ থেকে অন্যের হক আদায় করি। যতক্ষণ আমি আল্লাহ ও তাঁর রাসূলের আনুগত্য করব, ততক্ষণ আমার আনুগত্য করো; আর আমি যদি আল্লাহ ও তাঁর রাসূলের অবাধ্য হই, তবে আমার প্রতি তোমাদের কোনো আনুগত্য নেই। এবার সালাতের জন্য দাঁড়াও, আল্লাহ তোমাদের ওপর রহম করুন।”',
    detailedNarrativeEn:
      'Continuing his charter of justice, Abu Bakr (RA) pledged: “The weak among you is strong before me until I secure his right, and the strong among you is weak before me until I take from him what is due. Obey me as long as I obey Allah and His Messenger; should I disobey them, you have no obligation to obey me.”',
    reflectionBn:
      'আইনের শাসন, দুর্বলের অধিকার রক্ষা ও শাসকের শর্তসাপেক্ষ আনুগত্য—ইসলামী শাসনব্যবস্থার চিরন্তন ভিত্তি।',
    reflectionEn:
      'Rule of law, protection of the vulnerable, and conditional obedience define just Islamic governance.',
    sourceBn: 'ইবনে হিশাম, আস-সীরাতুন নাবাবিয়্যাহ, খণ্ড ২, পৃষ্ঠা ৬৬১',
    sourceEn: 'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 2, p. 661',
  },

  // =========================================================================
  // পর্ব ৫ · মঙ্গলবার · গোসল, কাফন ও জানাজা (২১ - ২৬)
  // =========================================================================
  {
    no: 21,
    partNo: 5,
    timeContextBn: 'মঙ্গলবার · হুজরায়ে আয়েশা (রা.)',
    timeContextEn: 'Tuesday · Aisha’s (RA) Chamber',
    titleBn: 'জামা খুলবেন কি না?',
    titleEn: 'Whether to Remove His Garment for Ghusl',
    pointsBn: [
      'গোসলের সময় সাহাবিরা ভাবছিলেন, অন্যদের মতো কাপড় খুলে গোসল দেবেন কি না।',
      'তখন সবার ওপর তন্দ্রা নেমে এলো, আর ঘরের কোণ থেকে আওয়াজ এলো: জামাসহ গোসল দাও।',
    ],
    pointsEn: [
      'Preparing for his ritual bath, the Companions wondered whether to remove his clothes as done for others.',
      'Allah cast a gentle slumber over them, and a voice spoke from the corner of the house: “Wash the Prophet with his garment on.”',
    ],
    detailedNarrativeBn:
      'সাধারণ বাইয়াত সম্পন্ন হওয়ার পর মঙ্গলবার রাসূলুল্লাহ ﷺ-এর গোসল ও কাফনের প্রস্তুতি শুরু হলো। সাহাবিদের মনে গভীর দ্বিধা দেখা দিল—সাধারণ মৃত ব্যক্তির মতো কি তাঁর দেহ মোবারক থেকে জামা খুলে গোসল দেওয়া হবে, নাকি জামাসহ গোসল দেওয়া হবে? ঠিক সেই মুহূর্তে আল্লাহ তাআলা উপস্থিত সবার ওপর এক অদ্ভুত তন্দ্রাচ্ছন্নতা ঢেলে দিলেন, এমনকি প্রত্যেকের থুতনি বুকের ওপর ঝুঁকে পড়ল। তখন ঘরের এক কোণ থেকে অদৃশ্য কণ্ঠে আওয়াজ এলো—কেউ জানত না কে বলছেন—“তোমরা নবী ﷺ-কে তাঁর জামা পরা অবস্থাতেই গোসল দাও।”',
    detailedNarrativeEn:
      'As his family prepared for the sacred Ghusl on Tuesday, they felt deep hesitation over whether to unclothe the Prophet (PBUH) as customary. Allah then sent a sudden slumber upon all of them until their chins dropped to their chests, and a voice resounded from the corner of the chamber instructing: “Wash the Prophet with his shirt still on.”',
    reflectionBn:
      'ইন্তেকালের পরও মহান আল্লাহ তাঁর প্রিয় হাবীবের পবিত্র সম্ভ্রম ও মর্যাদাকে অলৌকিকভাবে রক্ষা করেছেন।',
    reflectionEn:
      'Even after passing, Allah miraculously safeguarded the modesty and dignity of His beloved Messenger (PBUH).',
    sourceBn: 'সুনান আবু দাউদ, হাদিস নং ৩১৪১',
    sourceEn: 'Sunan Abi Dawud, Hadith 3141',
  },
  {
    no: 22,
    partNo: 5,
    timeContextBn: 'মঙ্গলবার · হুজরায়ে আয়েশা (রা.)',
    timeContextEn: 'Tuesday · Aisha’s (RA) Chamber',
    titleBn: 'যাঁরা গোসল দিলেন',
    titleEn: 'Those Honored to Perform His Ghusl',
    pointsBn: [
      'নবীজি ﷺ-কে গোসল দেন আলী (রা.), ফজল ইবনে আব্বাস (রা.) ও উসামা ইবনে যায়েদ (রা.)।',
      'তাঁরা জামার ওপর দিয়েই পানি ঢেলে হাত বুলিয়ে গোসল সম্পন্ন করেন।',
    ],
    pointsEn: [
      'The Prophet (PBUH) was bathed by Ali (RA), Al-Fadl ibn Abbas (RA), and Usamah ibn Zayd (RA), aided by Al-Abbas, Qutham, and Shuqran (RA).',
      'They poured water over his shirt and gently rubbed his body through the fabric.',
    ],
    detailedNarrativeBn:
      'ঘরের সেই অদৃশ্য নির্দেশনার পর নবীজি ﷺ-এর নিকটাত্মীয় ও ঘনিষ্ঠজনরাই গোসলের সৌভাগ্য লাভ করেন। হযরত আলী (রা.) নবীজিকে নিজের বুকে হেলান দিয়ে ধরে রাখেন, ফজল ইবনে আব্বাস (রা.) ও উসামা ইবনে যায়েদ (রা.) (সাথে চাচা আব্বাস, কুসাম ও আজাদকৃত গোলাম শুকরান রা.) পানি ঢেলে দেন এবং পর্দা টেনে সহযোগিতা করেন। আলী (রা.) নবীজির জামার ওপর দিয়েই হাত বুলিয়ে পরম মমতায় গোসল করান এবং বলতে থাকেন—“আমার পিতা-মাতা আপনার জন্য কুরবান! সাধারণ মৃত ব্যক্তির শরীরে যা দেখা যায়, আপনার পবিত্র দেহে তার কিছুই নেই; আপনি জীবনে ও মরণে পবিত্র ও সুবাসিত।”',
    detailedNarrativeEn:
      'Honored with this sacred duty were his closest kin: Ali (RA) supported him while Al-Fadl ibn Abbas (RA) and Usamah ibn Zayd (RA) poured water over his garment as Ali gently washed him through the cloth, marveling at his extraordinary purity and fragrance even in death.',
    reflectionBn:
      'গোসলের সময়ও নবীজি ﷺ-এর দেহ মোবারক থেকে অপার্থিব পবিত্রতা ও সুরভী অনুভূত হচ্ছিল।',
    reflectionEn:
      'Even during his final washing, his blessed body radiated an extraordinary purity.',
    sourceBn: 'সুনান আবু দাউদ, হাদিস নং ৩২০৯, ৩১৪১',
    sourceEn: 'Sunan Abi Dawud, Hadith 3209, 3141',
  },
  {
    no: 23,
    partNo: 5,
    timeContextBn: 'মঙ্গলবার · কাফন পরিধান',
    timeContextEn: 'Tuesday · Shrouding',
    titleBn: 'তিনটি সাদা কাপড়ে কাফন',
    titleEn: 'Shrouded in Three White Yemeni Cloths',
    pointsBn: [
      'কাফন দেওয়া হয় ইয়ামানের তিনটি সাদা সুতি কাপড়ে (সাহুলি)।',
      'তাতে কোনো জামা বা পাগড়ি ছিল না; একেবারে সাদামাটা কাফন।',
    ],
    pointsEn: [
      'He was shrouded in three white cotton Yemeni garments known as Sahuli.',
      'There was neither a shirt nor a turban among them—an utterly simple shroud.',
    ],
    detailedNarrativeBn:
      'গোসল শেষে রাসূলুল্লাহ ﷺ-কে কাফন পরানো হলো ইয়ামানের ‘সাহুল’ নামক অঞ্চলের তৈরি তিনটি ধবধবে সাদা সুতি কাপড়ে। উম্মুল মুমিনীন আয়েশা (রা.) স্পষ্টভাবে বর্ণনা করেছেন যে তাঁর কাফনে কোনো কামিস (জামা) বা আমামা (পাগড়ি) ছিল না—স্রেফ তিনটি সাদা কাপড়েই তাঁকে জড়িয়ে দেওয়া হয়েছিল। যিনি সমগ্র বিশ্বের সর্দার ছিলেন, তাঁর শেষ যাত্রার পোশাকও ছিল ইসলামের অনুপম অনাড়ম্বরতা ও বিনয়ের প্রতীক।',
    detailedNarrativeEn:
      'After the Ghusl, the Prophet (PBUH) was wrapped in three plain white cotton sheets woven in Sahul, Yemen. Aisha (RA) specifically noted that neither a shirt nor a turban was included—embodying the humility and simplicity he taught throughout his life.',
    reflectionBn:
      'তিনটি সাদা কাপড়ের সাদামাটা কাফন প্রতিটি মুসলমানের জন্য সুন্নাহসম্মত ও বিনয়ের শিক্ষা।',
    reflectionEn:
      'Three simple white shrouds stand as the timeless Sunnah of humility in our return to Allah.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১২৬৪',
    sourceEn: 'Sahih al-Bukhari, Hadith 1264',
  },
  {
    no: 24,
    partNo: 5,
    timeContextBn: 'মঙ্গলবার · দাফনের স্থান নির্ধারণ',
    timeContextEn: 'Tuesday · Determining the Burial Place',
    titleBn: 'কোথায় দাফন হবে?',
    titleEn: 'Where Should the Prophet (PBUH) Be Buried?',
    pointsBn: [
      'কেউ বললেন মসজিদে, কেউ বললেন সাহাবিদের পাশে। তখন আবু বকর (রা.) একটি হাদিস শোনালেন:',
      '‘আল্লাহ প্রত্যেক নবীর রূহ সেখানেই কবজ করেন, যেখানে তাঁকে দাফন করা পছন্দ করেন।’ তাই বিছানার জায়গাতেই কবর।',
    ],
    pointsEn: [
      'Some suggested burying him in the mosque and others beside the Companions in Baqi. Then Abu Bakr (RA) shared a Hadith:',
      '“Allah does not take the soul of any prophet except in the very spot where He loves for him to be buried.” Thus his grave was dug beneath his bed.',
    ],
    detailedNarrativeBn:
      'দাফনের স্থান নিয়ে সাহাবিদের মধ্যে কিছুক্ষণ মতভেদ দেখা দিল। কেউ বললেন—মসজিদে নববীর মিম্বারের পাশে দাফন করা হোক; আবার কেউ প্রস্তাব করলেন—জান্নাতুল বাকীতে তাঁর প্রিয় সাহাবিদের পাশেই দাফন করা হোক। তখন আবারও প্রজ্ঞা ও ইলমের আলো নিয়ে এগিয়ে এলেন আবু বকর সিদ্দীক (রা.)। তিনি বললেন—“আমি রাসূলুল্লাহ ﷺ-কে নিজে বলতে শুনেছি: আল্লাহ তাআলা প্রত্যেক নবীর রূহ ঠিক সেই স্থানেই কবজ করেন, যেখানে তাঁকে দাফন করা তিনি পছন্দ করেন।” এই হাদিস শোনামাত্রই সব মতভেদের অবসান হলো এবং আয়েশা (রা.)-এর হুজরায় নবীজির বিছানা সরিয়ে ঠিক সেই জায়গাতেই কবর খননের সিদ্ধান্ত চূড়ান্ত হলো।',
    detailedNarrativeEn:
      'When differing views arose over whether to bury him in the mosque or in Al-Baqi cemetery, Abu Bakr (RA) resolved the matter immediately by narrating what he had heard directly from the Prophet (PBUH): “Allah never takes the soul of a prophet except in the exact place He loves for him to be buried.” Immediately, his bed in Aisha’s (RA) room was lifted so his grave could be prepared right beneath it.',
    reflectionBn:
      'সকল মতভেদের চূড়ান্ত ও শান্তিপূর্ণ সমাধান নিহিত রয়েছে রাসূলুল্লাহ ﷺ-এর সহীহ হাদিসে।',
    reflectionEn:
      'Authentic prophetic guidance brings immediate unity and clarity whenever differences arise.',
    sourceBn: 'জামে আত-তিরমিযী, হাদিস নং ১০১৮',
    sourceEn: 'Jami‘ at-Tirmidhi, Hadith 1018',
  },
  {
    no: 25,
    partNo: 5,
    timeContextBn: 'মঙ্গলবার · কবর খনন',
    timeContextEn: 'Tuesday · Digging the Grave',
    titleBn: '‘লাহাদ’ পদ্ধতিতে কবর',
    titleEn: 'Preparing a “Lahd” Grave',
    pointsBn: [
      'মদিনায় দুজন কবর খুঁড়তেন: একজন লাহাদ (পাশে খোপ) আর একজন শাক্ক (মাঝে নালা) পদ্ধতিতে।',
      'দুজনকেই ডাকা হলো, যিনি আগে আসবেন তিনিই খুঁড়বেন; লাহাদ খোঁড়েন যিনি, তিনিই আগে এলেন।',
    ],
    pointsEn: [
      'In Madinah, two men dug graves: one made a Lahd (side niche) and the other a Shaqq (center trench).',
      'Messengers were sent for both so whoever arrived first would dig; Abu Talhah (RA), who dug the Lahd, arrived first.',
    ],
    detailedNarrativeBn:
      'মদিনায় তখন কবর খননে পারদর্শী দুজন প্রসিদ্ধ সাহাবি ছিলেন—মক্কার প্রথা অনুযায়ী ‘শাক্ক’ (কবরের তলদেশের মাঝখানে নালা) খুঁড়তেন আবু উবাইদা ইবনুল জাররাহ (রা.), আর মদিনার প্রথা অনুযায়ী ‘লাহাদ’ (কবরের কিবলার দিকে পাশে খোপ বা বগলি কবর) খুঁড়তেন আবু তালহা আনসারী (রা.)। সাহাবিরা দুজনের কাছেই লোক পাঠিয়ে দোয়া করলেন—হে আল্লাহ, আপনার রাসূলের জন্য যেটি উত্তম, তাঁকেই আগে পাঠিয়ে দিন। আল্লাহর ফয়সালায় আবু তালহা (রা.) আগে এসে পৌঁছালেন এবং তিনি নবীজি ﷺ-এর জন্য ‘লাহাদ’ পদ্ধতিতে কবর খনন করলেন।',
    detailedNarrativeEn:
      'Two Companions were known for digging graves in Madinah: Abu Ubaydah (RA), who used the Makkan Shaqq (central trench) method, and Abu Talhah al-Ansari (RA), who used the Madinan Lahd (side-niche) style. Messengers were sent to both, leaving the choice to Allah’s decree; Abu Talhah arrived first and dug a Lahd grave.',
    reflectionBn:
      'রাসূলুল্লাহ ﷺ-এর কবর ‘লাহাদ’ পদ্ধতিতে হওয়ায় মাটি উপযোগী হলে মুসলিমদের জন্য লাহাদ কবরই সর্বাধিক উত্তম সুন্নাহ।',
    reflectionEn:
      'Because Allah chose the Lahd for His Prophet (PBUH), it remains the preferred Sunnah grave form wherever soil permits.',
    sourceBn: 'সুনান ইবনে মাজাহ, হাদিস নং ১৫৫৭',
    sourceEn: 'Sunan Ibn Majah, Hadith 1557',
  },
  {
    no: 26,
    partNo: 5,
    timeContextBn: 'মঙ্গলবার দুপুর থেকে রাত · হুজরায়ে আয়েশা (রা.)',
    timeContextEn: 'Tuesday Day & Night · Aisha’s (RA) Chamber',
    titleBn: 'দলে দলে জানাজা, ইমাম ছাড়া',
    titleEn: 'Funeral Prayers in Groups Without an Imam',
    pointsBn: [
      'বর্ণিত আছে, তাঁকে হুজরাতেই রাখা হয়; সাহাবিরা দলে দলে ঢুকে আলাদাভাবে জানাজা পড়েন।',
      'প্রথমে পুরুষ, তারপর নারী, তারপর শিশুরা; কেউ ইমামতি করেননি।',
    ],
    pointsEn: [
      'It is narrated that he remained inside the chamber as Companions entered in small groups to pray individually.',
      'First came the men, then the women, and then the children—with no single Imam leading them.',
    ],
    detailedNarrativeBn:
      'কাফন সম্পন্ন হওয়ার পর রাসূলুল্লাহ ﷺ-এর পবিত্র দেহ মোবারক আয়েশা (রা.)-এর হুজরাতেই বিছানার ওপর রাখা ছিল। মসজিদে নববীর সমস্ত মানুষ যেন প্রিয় নবীর জানাজায় শরিক হতে পারেন, সেজন্য সাহাবিরা ছোট ছোট দলে বিভক্ত হয়ে হুজরায় প্রবেশ করতেন এবং কোনো ইমাম ছাড়াই প্রত্যেকে স্বতন্ত্রভাবে দরূদ ও জানাজার দোয়া পড়ে বের হয়ে আসতেন। বর্ণনা অনুযায়ী প্রথমে পুরুষরা, এরপর নারীরা এবং শেষে শিশুরা দলে দলে প্রবেশ করে জানাজা আদায় করেন—যা মঙ্গলবার দুপুর থেকে শুরু হয়ে রাত পর্যন্ত দীর্ঘ সময় ধরে চলেছিল। (বি.দ্র.: ইবনে মাজাহর এই নির্দিষ্ট বর্ণনাটির সনদ দুর্বল, তবে ইমাম ছাড়া দলে দলে জানাজার বিষয়টি সীরাতগ্রন্থগুলোতে প্রসিদ্ধভাবে বর্ণিত আছে।)',
    detailedNarrativeEn:
      'Once shrouded inside Aisha’s (RA) chamber, groups of believers filed in steadily from Tuesday midday through the night to offer funeral prayers individually without an Imam—first men, then women, then children—so every heart in Madinah could bid farewell. (Note: This specific chain in Ibn Majah is graded weak, though group prayers without an Imam are widely recorded in classical Seerah works.)',
    reflectionBn:
      'প্রত্যেক মুমিন যেন সরাসরি প্রিয় নবীর সামনে দাঁড়িয়ে শেষ বিদায় ও সালাম জানাতে পারেন—এজন্যই জানাজায় দীর্ঘ সময় লেগেছিল।',
    reflectionEn:
      'The prayers continued for hours so every man, woman, and child in Madinah could offer a personal farewell.',
    sourceBn: 'সুনান ইবনে মাজাহ, হাদিস নং ১৬২৮ (সনদ দুর্বল)',
    sourceEn: 'Sunan Ibn Majah, Hadith 1628 (weak chain)',
  },

  // =========================================================================
  // পর্ব ৬ · বুধবারের রাত · দাফন (২৭ - ২৯)
  // =========================================================================
  {
    no: 27,
    partNo: 6,
    timeContextBn: 'বুধবারের রাত (মঙ্গলবার দিবাগত রাত)',
    timeContextEn: 'Wednesday Night (Night Following Tuesday)',
    titleBn: 'বুধবারের রাতে দাফন',
    titleEn: 'Burial in the Quiet of Wednesday Night',
    pointsBn: [
      'আয়েশা (রা.) বলেন, নবীজি ﷺ ইন্তেকাল করেন সোমবার, আর দাফন হয় বুধবারের রাতে (মঙ্গলবার দিবাগত রাত)।',
      'তিনি বলেন, রাতের গভীরে কোদালের শব্দ শুনেই আমরা দাফনের কথা জানতে পারি।',
    ],
    pointsEn: [
      'Aisha (RA) narrated that the Prophet (PBUH) passed away on Monday and was buried on the night of Wednesday (the night following Tuesday).',
      'She said: “We did not even realize the burial was underway until we heard the sound of spades in the depths of the night.”',
    ],
    detailedNarrativeBn:
      'মঙ্গলবার দিনভর ও রাতের প্রথমাংশ জুড়ে অসংখ্য মানুষের জানাজা সম্পন্ন হওয়ার পর অবশেষে এলো সেই চূড়ান্ত বিদায়ের ক্ষণ। ইসলামী ক্যালেন্ডার অনুযায়ী সূর্যাস্তের পর নতুন দিন শুরু হয়—তাই মঙ্গলবার দিবাগত রাত তথা বুধবারের মধ্যরাতে গভীর নীরবতার মধ্যে রাসূলুল্লাহ ﷺ-এর দাফন সম্পন্ন হয়। হযরত আয়েশা (রা.) বেদনাভরা কণ্ঠে স্মরণ করেছেন—“আমরা টেরও পাইনি যে দাফন শুরু হয়ে গেছে, যতক্ষণ না বুধবারের গভীর রাতে কোদাল দিয়ে মাটি দেওয়ার শব্দ আমাদের কানে পৌঁছাল।”',
    detailedNarrativeEn:
      'After hours of uninterrupted farewell prayers throughout Tuesday, the burial finally took place in the stillness of the night following Tuesday (Wednesday night in the Islamic calendar). Aisha (RA) recalled with heartbreak that they only realized the burial had begun when they heard the muffled sound of spades in the middle of the night.',
    reflectionBn:
      'রাতের সেই নীরব কোদালের শব্দ ছিল মানব ইতিহাসের সবচেয়ে ভারী ও অশ্রুসিক্ত মুহূর্ত।',
    reflectionEn:
      'The quiet sound of spades in that midnight hour marked the heaviest parting in human history.',
    sourceBn: 'মুসনাদে আহমাদ, হাদিস নং ২৪৭৯০, ২৬৩৪৯',
    sourceEn: 'Musnad Ahmad, Hadith 24790, 26349',
  },
  {
    no: 28,
    partNo: 6,
    timeContextBn: 'বুধবারের রাত · পবিত্র কবরে অবতরণ',
    timeContextEn: 'Wednesday Night · Laying to Rest',
    titleBn: 'কবরে লাল চাদর',
    titleEn: 'The Red Mantle Placed Inside the Grave',
    pointsBn: [
      'দাফনের সময় নবীজি ﷺ-এর কবরে, তাঁর নিচে একটি লাল চাদর (কাতিফা) বিছিয়ে দেওয়া হয়।',
      'বর্ণিত আছে, তাঁর আজাদকৃত গোলাম শুকরান (রা.) বলেছিলেন, এ চাদর তাঁর পরে আর কেউ পরবে না।',
    ],
    pointsEn: [
      'During the burial, a red velvety mantle (Qatifah) that the Prophet (PBUH) used to wear was spread beneath him in the grave.',
      'His freed servant Shuqran (RA) placed it there, declaring: “By Allah, no one else shall ever wear this after you.”',
    ],
    detailedNarrativeBn:
      'রাসূলুল্লাহ ﷺ-এর পবিত্র দেহ মোবারককে কবরে নামানোর সৌভাগ্য লাভ করেন আলী (রা.), ফজল ইবনে আব্বাস (রা.), কুসাম ইবনে আব্বাস (রা.) এবং নবীজির আজাদকৃত গোলাম শুকরান (রা.)। ঠিক যখন নবীজিকে কবরে শোয়ানো হচ্ছিল, শুকরান (রা.) নবীজির ব্যবহৃত একটি লাল রঙের মখমলি চাদর (‘কাতিফা’) কবরের নিচে বিছিয়ে দেন। ভালোবাসায় আপ্লুত হয়ে তিনি বলেছিলেন—“আল্লাহর কসম! আপনার পর এই চাদর আর কেউ কখনো পরিধান করবে না।” (এটি ছিল শুধু রাসূলুল্লাহ ﷺ-এর প্রতি ভালোবাসাজনিত এক ব্যতিক্রমী ঘটনা, সাধারণ সুন্নাহ নয়।)',
    detailedNarrativeEn:
      'As Ali, Al-Fadl, Qutham, and Shuqran (RA) lowered the Prophet (PBUH) into his grave, Shuqran—his devoted freed servant—spread beneath him a red mantle (Qatifah) that the Prophet used to wear, saying out of sheer devotion that no one else should ever wear it after him.',
    reflectionBn:
      'একজন মুক্ত গোলামের হৃদয়ে প্রিয় নবীর প্রতি কতটা গভীর মমতা ও শ্রদ্ধা ছিল, এই ঘটনা তা চিরস্মরণীয় করে রেখেছে।',
    reflectionEn:
      'This tender gesture preserves forever the boundless devotion even a freed servant felt for the Prophet (PBUH).',
    sourceBn: 'সহীহ মুসলিম, হাদিস নং ৯৬৭',
    sourceEn: 'Sahih Muslim, Hadith 967',
  },
  {
    no: 29,
    partNo: 6,
    timeContextBn: 'সোমবার দুপুর থেকে বুধবার রাত',
    timeContextEn: 'Monday Midday to Wednesday Night',
    titleBn: 'প্রায় ৪০ ঘণ্টা',
    titleEn: 'Nearly 40 Historic Hours',
    pointsBn: [
      'সোমবার ইন্তেকাল থেকে বুধবারের রাতে দাফন পর্যন্ত সময় ছিল প্রায় ৩৬–৪০ ঘণ্টা।',
      'এই সময়েই খলিফা নির্বাচন, গোসল-কাফন, জানাজা আর দাফন, সব সম্পন্ন হয়।',
    ],
    pointsEn: [
      'From his passing on Monday midday to his burial on Wednesday night spanned approximately 36 to 40 hours.',
      'Within this decisive window, the Caliph was chosen, and the Ghusl, shrouding, funeral prayers, and burial were all completed.',
    ],
    detailedNarrativeBn:
      'সোমবার দুপুরের পর রাসূলুল্লাহ ﷺ-এর ইন্তেকাল থেকে শুরু করে বুধবারের মধ্যরাতে দাফন সম্পন্ন হওয়া পর্যন্ত মোট সময়কাল ছিল প্রায় ৩৬ থেকে ৪০ ঘণ্টা। অনেকের মনে প্রশ্ন জাগে—দাফনে এতটা সময় কেন লেগেছিল? এর পেছনে ছিল গভীর প্রজ্ঞা ও ইতিহাস: প্রথমত, উম্মাহর ঐক্য রক্ষায় খলিফা নির্বাচন ও সাধারণ বাইয়াত সম্পন্ন করা; দ্বিতীয়ত, গোসল ও কবরের স্থান নির্ধারণে হাদিস যাচাই করা; এবং তৃতীয়ত, মদিনার হাজার হাজার পুরুষ, নারী ও শিশুর প্রত্যেকের জন্য ইমাম ছাড়া দলে দলে জানাজা আদায়ের সুযোগ করে দেওয়া। এই ৪০ ঘণ্টা ছিল ইসলামের ইতিহাসের সবচেয়ে সংবেদনশীল ও গুরুত্বপূর্ণ অধ্যায়।',
    detailedNarrativeEn:
      'Spanning roughly 36 to 40 hours from Monday afternoon until Wednesday midnight, these hours encompassed the most critical transition in Islamic history: stabilizing the heartbroken Ummah, reaching public consensus on the first Caliph, confirming prophetic rulings on his Ghusl and burial site, allowing thousands to offer funeral prayers in groups, and laying the Prophet (PBUH) to rest.',
    reflectionBn:
      'শোকের সাগরে ডুবে থেকেও সাহাবিরা উম্মাহর ভবিষ্যৎ ও রাসূলের প্রতিটি হক নিখুঁতভাবে আদায় করেছিলেন।',
    reflectionEn:
      'Even while drowning in grief, the Companions fulfilled every duty to both the Prophet (PBUH) and the future of the Ummah.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১৩৮৭; মুসনাদে আহমাদ, হাদিস নং ২৪৭৯০',
    sourceEn: 'Sahih al-Bukhari, Hadith 1387; Musnad Ahmad, Hadith 24790',
  },

  // =========================================================================
  // পর্ব ৭ · দাফনের পর (৩০ - ৩২)
  // =========================================================================
  {
    no: 30,
    partNo: 7,
    timeContextBn: 'দাফনের পর · মদিনা মুনাওয়ারা',
    timeContextEn: 'After Burial · Madinah',
    titleBn: 'ফাতিমা (রা.)-এর বেদনা',
    titleEn: 'The Heartbreak of Fatimah (RA)',
    pointsBn: [
      'দাফনের পর ফাতিমা (রা.) আনাস (রা.)-কে বললেন:',
      '‘রাসূলুল্লাহ ﷺ-এর ওপর মাটি ঢালতে তোমাদের মন কীভাবে রাজি হলো?’',
    ],
    pointsEn: [
      'After the burial was completed, Fatimah (RA) turned to Anas ibn Malik (RA) and asked:',
      '“O Anas! How could your hearts bear to pour earth over the Messenger of Allah (PBUH)?”',
    ],
    detailedNarrativeBn:
      'দাফন শেষে সাহাবিরা যখন ভারী হৃদয় নিয়ে ফিরে এলেন, তখন নবীজির কলিজার টুকরো কন্যা হযরত ফাতিমা আয-যাহরা (রা.) পিতৃশোকে ভেঙে পড়লেন। তিনি নবীজির খাদেম হযরত আনাস ইবনে মালিক (রা.)-এর দিকে তাকিয়ে অশ্রুভেজা কণ্ঠে প্রশ্ন করলেন: “হে আনাস! রাসূলুল্লাহ ﷺ-এর পবিত্র দেহের ওপর মাটি ঢালতে তোমাদের অন্তর কীভাবে সায় দিল?” আনাস (রা.) কোনো উত্তর দিতে পারলেন না—সবার চোখ তখন অশ্রুতে ঝাপসা। এই একটি প্রশ্নই পিতা-কন্যার অমর ভালোবাসা ও বিচ্ছেদের গভীরতা ইতিহাসে চিরস্থায়ী করে দিয়েছে।',
    detailedNarrativeEn:
      'When the Companions returned from laying the Prophet (PBUH) to rest, his beloved daughter Fatimah (RA) looked at his longtime attendant Anas ibn Malik (RA) and asked in unbearable sorrow: “O Anas, how did your souls feel at ease pouring soil over the Messenger of Allah (PBUH)?” Anas fell silent, unable to answer through tears.',
    reflectionBn:
      'হযরত ফাতিমা (রা.) পিতার বিরহে মাত্র ছয় মাস পরেই মহান আল্লাহর সান্নিধ্যে মিলিত হন।',
    reflectionEn:
      'Bound by deep love, Fatimah (RA) reunited with her beloved father in the Hereafter just six months later.',
    arabicQuote: 'يَا أَنَسُ أَطَابَتْ أَنْفُسُكُمْ أَنْ تَحْثُوا عَلَى رَسُولِ اللَّهِ ﷺ التُّرَابَ؟',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৬২',
    sourceEn: 'Sahih al-Bukhari, Hadith 4462',
  },
  {
    no: 31,
    partNo: 7,
    timeContextBn: 'দাফনের পর · আনাস (রা.)-এর স্মৃতিচারণ',
    timeContextEn: 'After Burial · Testimony of Anas (RA)',
    titleBn: 'মদিনা যেন অন্ধকার',
    titleEn: 'Madinah Grew Dark Without His Presence',
    pointsBn: [
      'আনাস (রা.) বলেন, যেদিন তিনি মদিনায় এসেছিলেন, সেদিন সব আলোকিত হয়েছিল; আর যেদিন ইন্তেকাল করেন, সব অন্ধকার হয়ে গেল।',
      'দাফনের মাটি হাত থেকে ঝাড়ার আগেই আমরা নিজেদের অন্তরে পরিবর্তন টের পেলাম।',
    ],
    pointsEn: [
      'Anas (RA) said: “The day the Messenger of Allah (PBUH) entered Madinah, everything in it illuminated; and the day he passed away, everything in it darkened.”',
      '“We had not even dusted the soil of his grave off our hands before we felt a change within our own hearts.”',
    ],
    detailedNarrativeBn:
      'রাসূলুল্লাহ ﷺ-এর দশ বছরের ঘনিষ্ঠ খাদেম হযরত আনাস ইবনে মালিক (রা.) মদিনার দুটি চরম বিপরীত দিনের তুলনা করে বলেছেন—“যেদিন রাসূলুল্লাহ ﷺ হিজরত করে মদিনায় পা রেখেছিলেন, সেদিন মদিনার প্রতিটি অণু-পরমাণু যেন নূরে আলোকিত হয়ে উঠেছিল। আর যেদিন তিনি ইন্তেকাল করলেন, সেদিন গোটা মদিনা যেন অন্ধকারে ঢেকে গেল। এমনকি তাঁকে দাফন করে আমাদের হাত থেকে কবরের মাটি ঝাড়ার আগেই আমরা নিজেদের অন্তরে এক অদ্ভুত শূন্যতা ও পরিবর্তন অনুভব করলাম।”',
    detailedNarrativeEn:
      'Having served the Prophet (PBUH) for ten years, Anas ibn Malik (RA) contrasted the two unforgettable days of Madinah: “On the day the Prophet arrived, every single thing in Madinah lit up; on the day he died, every single thing grew dark. We had scarcely shaken the dust of his burial from our hands before we felt a profound void in our hearts.”',
    reflectionBn:
      'প্রিয় নবীর সান্নিধ্য ছিল সাহাবিদের ঈমানি প্রশান্তির মূল উৎস; তাঁর সুন্নাহর অনুসরণই আজ আমাদের হৃদয়ের আলো।',
    reflectionEn:
      'His presence was the spiritual light of Madinah; living by his Sunnah keeps that light alive in our hearts today.',
    sourceBn: 'জামে আত-তিরমিযী, হাদিস নং ৩৬১৮',
    sourceEn: 'Jami‘ at-Tirmidhi, Hadith 3618',
  },
  {
    no: 32,
    partNo: 7,
    timeContextBn: 'দাফনের পর · উম্মে আইমান (রা.)-এর গৃহে',
    timeContextEn: 'After Burial · Visiting Umm Ayman (RA)',
    titleBn: 'উম্মে আইমান (রা.)-এর কান্না',
    titleEn: 'The Tears of Umm Ayman (RA)',
    pointsBn: [
      'পরে আবু বকর ও উমর (রা.) উম্মে আইমান (রা.)-কে দেখতে গেলে তিনি কাঁদছিলেন।',
      'বললেন, আমি কাঁদছি কারণ আসমান থেকে ওহি আসা বন্ধ হয়ে গেল। শুনে দুজনও কেঁদে ফেললেন।',
    ],
    pointsEn: [
      'Later, when Abu Bakr and Umar (RA) visited Umm Ayman (RA), they found her weeping deeply.',
      'She said: “I weep because revelation from the heavens has now ceased.” Hearing this, both of them wept alongside her.',
    ],
    detailedNarrativeBn:
      'নবীজি ﷺ-এর ইন্তেকালের পর একদিন আবু বকর (রা.) উমর (রা.)-কে বললেন—“চলো, উম্মে আইমান (রা.)-কে দেখতে যাই, যেমনটি রাসূলুল্লাহ ﷺ জীবদ্দশায় তাঁকে দেখতে যেতেন।” তাঁরা সেখানে পৌঁছালে নবীজির শৈশবের স্নেহময়ী পালিকা উম্মে আইমান (রা.) কান্নায় ভেঙে পড়লেন। তাঁরা তাঁকে সান্ত্বনা দিয়ে বললেন—আল্লাহর কাছে যা আছে তা তো রাসূলুল্লাহ ﷺ-এর জন্য অনেক উত্তম! তখন তিনি বললেন: “আমি এই কারণে কাঁদছি না যে আল্লাহর কাছে তাঁর জন্য উত্তম প্রতিদান আছে তা আমি জানি না; বরং আমি কাঁদছি এই ভেবে যে আজ থেকে আসমান ও জমিনের মাঝে ওহির ধারা চিরতরে বন্ধ হয়ে গেল!” তাঁর এই গভীর উপলব্ধি শুনে আবু বকর ও উমর (রা.)-ও অঝোরে কেঁদে ফেললেন।',
    detailedNarrativeEn:
      'Some days after the passing, Abu Bakr (RA) suggested to Umar (RA) that they visit Umm Ayman (RA)—the Prophet’s cherished childhood caretaker—just as the Prophet himself used to do. Finding her weeping, they gently reminded her that what is with Allah is far better for His Messenger. She replied: “I do not weep because I doubt that; I weep because divine revelation from the heavens has ceased forever.” Moved to the core, both Abu Bakr and Umar wept alongside her.',
    reflectionBn:
      'ওহি বন্ধ হয়ে গেলেও কুরআন ও সহীহ সুন্নাহর নূর কিয়ামত পর্যন্ত মানবজাতির জন্য জীবন্ত ওহির হেদায়েত হয়ে থাকবে।',
    reflectionEn:
      'Though new revelation ceased, the preserved Quran and Sunnah remain our eternal link to heavenly guidance.',
    sourceBn: 'সহীহ মুসলিম, হাদিস নং ২৪৫৪',
    sourceEn: 'Sahih Muslim, Hadith 2454',
  },
];
