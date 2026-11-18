/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SeeratVerifiedEvent } from './seeratPdfEvents';
import { HadithReferenceItem } from './prophet40HoursExtended';

export interface Last10PartMeta {
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

export interface Last10Event {
  no: number; // 1 to 35
  partNo: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  timeContextBn: string;
  timeContextEn: string;
  titleBn: string;
  titleEn: string;
  pointsBn: string[];
  pointsEn: string[];
  detailedNarrativeBn: string;
  detailedNarrativeEn: string;
  extendedContextBn: string;
  extendedContextEn: string;
  locationBn: string;
  locationEn: string;
  keyFiguresBn: string;
  keyFiguresEn: string;
  reflectionBn: string;
  reflectionEn: string;
  arabicQuote?: string;
  sourceBn: string;
  sourceEn: string;
  references: HadithReferenceItem[];
}

export const LAST_10_DAYS_PARTS: Last10PartMeta[] = [
  {
    partNo: 1,
    dayTagBn: 'বিদায়ের ইঙ্গিত',
    dayTagEn: 'Signs of Farewell',
    titleBn: 'পর্ব ১ · বিদায়ের ইঙ্গিত',
    titleEn: 'Part 1 · Signs of Farewell',
    arabicTitle: 'إشارات الوداع',
    subtitleBn: 'সূরা আন-নাসর, শেষ রমজানে দুবার কুরআন, উহুদের শহীদদের দোয়া ও উসামা (রা.)-এর বাহিনী',
    subtitleEn: 'Surah An-Nasr, double Quran review, farewell to Uhud martyrs & Usamah’s army',
    accentHex: '#059669',
    eventCount: 4,
  },
  {
    partNo: 2,
    dayTagBn: 'অসুস্থতার শুরু',
    dayTagEn: 'Onset of Illness',
    titleBn: 'পর্ব ২ · অসুস্থতার শুরু',
    titleEn: 'Part 2 · Onset of Final Illness',
    arabicTitle: 'بداية المرض',
    subtitleBn: 'মাথাব্যথায় শেষ অসুস্থতার সূচনা ও আয়েশা (রা.)-এর হুজরায় স্থানান্তর',
    subtitleEn: 'Beginning of the final headache and moving into Aisha’s (RA) chamber',
    accentHex: '#0d9488',
    eventCount: 2,
  },
  {
    partNo: 3,
    dayTagBn: '৫ দিন আগে',
    dayTagEn: '5 Days Before',
    titleBn: 'পর্ব ৩ · ইন্তেকালের ৫ দিন আগে',
    titleEn: 'Part 3 · Five Days Before Passing',
    arabicTitle: 'قبل الوفاة بخمسة أيام',
    subtitleBn: 'সাত মশক পানি, এক বান্দাকে এখতিয়ার দান ও আবু বকর (রা.)-এর অনন্য মর্যাদা',
    subtitleEn: 'Seven skins of water, the servant’s choice & the singular rank of Abu Bakr (RA)',
    accentHex: '#d97706',
    eventCount: 3,
  },
  {
    partNo: 4,
    dayTagBn: '৪ দিন আগে',
    dayTagEn: '4 Days Before',
    titleBn: 'পর্ব ৪ · ইন্তেকালের ৪ দিন আগে',
    titleEn: 'Part 4 · Four Days Before Passing',
    arabicTitle: 'قبل الوفاة بأربعة أيام',
    subtitleBn: 'বৃহস্পতিবারের অসিয়ত, মাগরিবে শেষ ইমামতি, ইশায় অজ্ঞান ও আবু বকর (রা.)-এর ইমামতি',
    subtitleEn: 'Thursday’s counsels, last Maghrib prayer led, fainting at Isha & appointing Abu Bakr',
    accentHex: '#2563eb',
    eventCount: 5,
  },
  {
    partNo: 5,
    dayTagBn: '১–২ দিন আগে',
    dayTagEn: '1–2 Days Before',
    titleBn: 'পর্ব ৫ · ইন্তেকালের ১–২ দিন আগে',
    titleEn: 'Part 5 · One to Two Days Before Passing',
    arabicTitle: 'قبل الوفاة بيوم أو يومين',
    subtitleBn: 'জোহরের জামাতে উপস্থিতি, শেষ স্বর্ণমুদ্রা দান ও বন্ধক রাখা লোহার বর্ম',
    subtitleEn: 'Joining Zuhr congregation, giving away the final gold coins & the pawned armor',
    accentHex: '#0f766e',
    eventCount: 3,
  },
  {
    partNo: 6,
    dayTagBn: 'শেষ দিন · সোমবার',
    dayTagEn: 'Final Day · Monday',
    titleBn: 'পর্ব ৬ · শেষ দিন · সোমবার',
    titleEn: 'Part 6 · The Final Day · Monday',
    arabicTitle: 'اليوم الأخير · يوم الإثنين',
    subtitleBn: 'ফজরের হাসি, ফাতিমা (রা.)-কে সান্ত্বনা, শেষ নসিহত, শেষ মিসওয়াক ও রফীকুল আ‘লার ডাকে সাড়া',
    subtitleEn: 'The Fajr smile, comforting Fatimah (RA), final counsel, last Siwak & Ar-Rafiq al-A‘la',
    accentHex: '#4f46e5',
    eventCount: 9,
  },
  {
    partNo: 7,
    dayTagBn: 'ইন্তেকালের পর',
    dayTagEn: 'After Passing',
    titleBn: 'পর্ব ৭ · ইন্তেকালের পর',
    titleEn: 'Part 7 · After the Passing',
    arabicTitle: 'ما بعد الوفاة الشريفة',
    subtitleBn: 'আবু বকর (রা.)-এর ভাষণ, সাকিফা, গোসল-কাফন, জানাজা, দাফন ও সাহাবিদের অশ্রু',
    subtitleEn: 'Abu Bakr’s address, Saqifah, Ghusl, shrouding, prayers, burial & tears of the Companions',
    accentHex: '#b45309',
    eventCount: 9,
  },
];

export const LAST_10_DAYS_EVENTS: Last10Event[] = [
  // =========================================================================
  // পর্ব ১ · বিদায়ের ইঙ্গিত (০১ - ০৪)
  // =========================================================================
  {
    no: 1,
    partNo: 1,
    timeContextBn: '১০ হিজরি · বিদায়ের প্রথম ইঙ্গিত',
    timeContextEn: '10 AH · First Sign of Farewell',
    titleBn: 'সূরা নাসরে বিদায়ের ইঙ্গিত',
    titleEn: 'Sign of Farewell in Surah An-Nasr',
    pointsBn: [
      'সূরা আন-নাসর নাযিল হলে ইবনে আব্বাস (রা.) বুঝেছিলেন, এটি নবীজি ﷺ-এর বিদায় নিকটবর্তী হওয়ার ইঙ্গিত।',
      'উমর (রা.)-ও বলেন, ‘তুমি যা বুঝেছ, আমিও তা-ই বুঝি।’',
    ],
    pointsEn: [
      'When Surah An-Nasr was revealed, Ibn Abbas (RA) realized it signaled the approaching departure of the Prophet ﷺ.',
      'Umar (RA) affirmed: “I know of it nothing other than what you have understood.”',
    ],
    detailedNarrativeBn:
      'হযরত উমর (রা.) তাঁর খিলাফতকালে তরুণ সাহাবি ইবনে আব্বাস (রা.)-কে বদরী প্রবীণ সাহাবিদের মজলিসে বসাতেন। একদিন প্রবীণদের সামনে উমর (রা.) সূরা আন-নাসর (‘ইযা জাআ নাসরুল্লাহি ওয়াল ফাতহ’) এর তাফসির জানতে চাইলে অনেকেই বললেন—এতে বিজয় এলে আল্লাহর প্রশংসা ও ক্ষমা প্রার্থনার আদেশ রয়েছে। তখন ইবনে আব্বাস (রা.) বললেন, এর অর্থ তা নয়; বরং এর মাধ্যমে আল্লাহ নবীজি ﷺ-কে জানিয়ে দিয়েছেন যে তাঁর নবুওয়তি মিশন পূর্ণ হয়েছে এবং বিদায়ের সময় ঘনিয়ে এসেছে।',
    detailedNarrativeEn:
      'During his caliphate, Umar (RA) asked senior veterans of Badr about the deeper meaning of Surah An-Nasr. After they noted its command to praise Allah upon victory, the young Ibn Abbas (RA) explained that it was Allah’s subtle announcement that the Prophet’s mission was complete and his departure was near—an insight Umar (RA) immediately confirmed.',
    extendedContextBn:
      'আয়েশা (রা.) বর্ণনা করেন, সূরা আন-নাসর নাযিল হওয়ার পর থেকে নবীজি ﷺ রুকু ও সিজদায় অত্যধিক পরিমাণে ‘সুবহানাকাল্লাহুম্মা রাব্বানা ওয়া বিহামদিকা, আল্লাহুম্মাগফিরলী’ পাঠ করতেন—কুরআনের সেই নির্দেশের বাস্তবায়ন হিসেবে। এতে স্পষ্ট বোঝা যায় যে মহান রবের ডাকে সাড়া দেওয়ার প্রস্তুতি তাঁর হৃদয়ে আগেই শুরু হয়ে গিয়েছিল।',
    extendedContextEn:
      'Aisha (RA) narrated that following the revelation of Surah An-Nasr, the Prophet ﷺ frequently recited “Subhanakallahumma Rabbana wa bihamdika, Allahummaghfir li” in bowing and prostration, embodying its guidance as he prepared to meet his Lord.',
    locationBn: 'মক্কা/মিনা (নাযিলের স্থান) ও মদিনা মুনাওয়ারা',
    locationEn: 'Mina / Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত ইবনে আব্বাস (রা.), হযরত উমর (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Ibn Abbas (RA), Umar (RA)',
    reflectionBn:
      'জীবনের সাফল্য ও পূর্ণতার মুহূর্তে অহংকার নয়, বরং আল্লাহর প্রশংসা ও ইস্তিগফারই মুমিনের প্রকৃত প্রস্তুতি।',
    reflectionEn:
      'True completion of life’s mission is met not with pride, but with humble praise of Allah and seeking forgiveness.',
    arabicQuote: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ۝ فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৯৭০',
    sourceEn: 'Sahih al-Bukhari, Hadith 4970',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুত তাফসীর (সূরা আন-নাসর)',
        chapterEn: 'Book of Tafsir (Surah An-Nasr)',
        citationBn: 'হাদিস নং ৪৯৭০, ৪৯৬৯',
        citationEn: 'Hadith 4970, 4969',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 2,
    partNo: 1,
    timeContextBn: 'রমজান ১০ হিজরি · জীবনের শেষ রমজান',
    timeContextEn: 'Ramadan 10 AH · The Final Ramadan',
    titleBn: 'শেষ রমজানে দুবার কুরআন',
    titleEn: 'Reviewing the Quran Twice in His Final Ramadan',
    pointsBn: [
      'প্রতি রমজানে জিবরীল (আ.) একবার কুরআন শোনাতেন; জীবনের শেষ বছরে শোনালেন দুবার।',
      'নবীজি ﷺ ফাতিমা (রা.)-কে বলেন, ‘আমার মনে হয়, আমার সময় ঘনিয়ে এসেছে।’',
    ],
    pointsEn: [
      'Every Ramadan, Jibril (AS) reviewed the Quran with him once; in his final year, he reviewed it twice.',
      'The Prophet ﷺ confided to Fatimah (RA): “I see nothing in this except that my appointed time has drawn near.”',
    ],
    detailedNarrativeBn:
      'প্রতি বছর রমজান মাসে হযরত জিবরীল (আ.) এসে রাসূলুল্লাহ ﷺ-এর সাথে একবার পূর্ণ কুরআন মাজীদ দাওর (পুনরাবৃত্তি) করতেন। কিন্তু ১০ হিজরির রমজানে—যা ছিল তাঁর জীবনের শেষ রমজান—জিবরীল (আ.) নবীজির সাথে পরপর দুবার পূর্ণ কুরআন দাওর করেন এবং নবীজি ﷺ প্রতি বছর ১০ দিনের পরিবর্তে সে বছর ২০ দিন ইতিকাফ করেন।',
    detailedNarrativeEn:
      'Each Ramadan, Archangel Jibril (AS) reviewed the entire Quran once with the Prophet ﷺ. In Ramadan of 10 AH, however, Jibril reviewed the complete revelation with him twice, and the Prophet observed twenty days of I‘tikaf instead of his usual ten.',
    extendedContextBn:
      'নবীজি ﷺ এই গভীর ইঙ্গিতটি প্রিয় কন্যা ফাতিমা (রা.)-কে গোপনে জানিয়ে বলেছিলেন—“জিবরীল প্রতি বছর আমাকে একবার কুরআন শোনাতেন, এ বছর দুবার শুনিয়েছেন; আমি মনে করি আমার বিদায়ের সময় নিকটবর্তী।” এর মধ্য দিয়েই কুরআনের চূড়ান্ত বিন্যাস ও সংরক্ষণ পূর্ণতা লাভ করে।',
    extendedContextEn:
      'Quietly sharing this realization with Fatimah (RA), the Prophet ﷺ noted that this double recitation signaled his nearing return to Allah—while also finalizing the preserved sequence of the entire Quran for all generations.',
    locationBn: 'মসজিদে নববী, মদিনা মুনাওয়ারা',
    locationEn: 'Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত জিবরীল (আ.), হযরত ফাতিমা (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Archangel Jibril (AS), Fatimah (RA)',
    reflectionBn:
      'কুরআনের সান্নিধ্য ও ইতিকাফের মধ্য দিয়েই নবীজি ﷺ তাঁর আখিরাতের যাত্রার সর্বোত্তম প্রস্তুতি নিয়েছিলেন।',
    reflectionEn:
      'Deep immersion in the Quran and devotion marked the Prophet’s preparation for meeting his Lord.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬২৩–৩৬২৪',
    sourceEn: 'Sahih al-Bukhari, Hadith 3623–3624',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মানাকিব (নবুওয়তের নিদর্শনাবলি)',
        chapterEn: 'Book of Virtues (Signs of Prophethood)',
        citationBn: 'হাদিস নং ৩৬২৩, ৩৬২৪, ৪৯৯৮',
        citationEn: 'Hadith 3623, 3624, 4998',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 3,
    partNo: 1,
    timeContextBn: 'সফর ১১ হিজরি · উহুদ প্রান্তর ও মসজিদে নববী',
    timeContextEn: 'Safar 11 AH · Uhud & Masjid an-Nabawi',
    titleBn: 'উহুদের শহীদদের বিদায়ী দোয়া',
    titleEn: 'Farewell Prayer for the Martyrs of Uhud',
    pointsBn: [
      'উহুদের আট বছর পর তিনি শহীদদের জন্য এমনভাবে দোয়া করেন, যেন জীবিত ও মৃত সবার কাছ থেকে বিদায় নিচ্ছেন।',
      'মিম্বারে বলেন, আমি তোমাদের আগে যাচ্ছি; ভয় করি তোমরা দুনিয়া নিয়ে প্রতিযোগিতায় মেতে উঠবে।',
    ],
    pointsEn: [
      'Eight years after Uhud, he prayed over its martyrs like one bidding farewell to both the living and the dead.',
      'From the pulpit he said: “I am going ahead of you; what I fear for you is that you will compete over this world.”',
    ],
    detailedNarrativeBn:
      'উহুদ যুদ্ধের প্রায় আট বছর পর—অর্থাৎ ১১ হিজরির সফর মাসে—একদিন রাসূলুল্লাহ ﷺ উহুদের শহীদদের কবরের পাশে গেলেন এবং তাঁদের জন্য এমন আবেগঘন জানাজার দোয়া করলেন যেন তিনি জীবিত ও মৃত সবার কাছ থেকে চিরবিদায় নিচ্ছেন। এরপর মসজিদে নববীতে ফিরে মিম্বারে উঠে সাহাবিদের উদ্দেশে এক গভীর সতর্কবার্তা উচ্চারণ করলেন।',
    detailedNarrativeEn:
      'Eight years after the Battle of Uhud, the Prophet ﷺ went to the graves of its martyrs and prayed for them as a traveler bidding final farewell to the living and the departed alike. Returning to the pulpit of Masjid an-Nabawi, he delivered a deeply moving counsel.',
    extendedContextBn:
      'তিনি বললেন—“আমি তোমাদের অগ্রগামী হয়ে হাউজে কাওসারে অপেক্ষা করব এবং তোমাদের পক্ষে সাক্ষ্য দেব। আল্লাহর কসম! আমি আমার পর তোমাদের শিরকে লিপ্ত হওয়ার আশঙ্কা করি না; তবে আমি ভয় করি যে তোমরা দুনিয়ার ধন-সম্পদ ও মোহ নিয়ে পরস্পর প্রতিযোগিতায় মেতে উঠবে।” হযরত উকবা ইবনে আমির (রা.) বলেন, সেটিই ছিল মিম্বারে রাসূলুল্লাহ ﷺ-এর ওপর আমার শেষ দৃষ্টি।',
    extendedContextEn:
      'He declared: “I am your forerunner and witness over you; by Allah, I do not fear that you will fall into shirk after me, but I fear you will rival one another for the splendors of this world.” Uqbah ibn Amir (RA) recalled that this was the last time he ever saw the Prophet ﷺ on the pulpit.',
    locationBn: 'উহুদ প্রান্তর ও মসজিদে নববী, মদিনা',
    locationEn: 'Mount Uhud & Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত উকবা ইবনে আমির (রা.), উহুদের শহীদগণ',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Uqbah ibn Amir (RA), Martyrs of Uhud',
    reflectionBn:
      'দুনিয়ার ভোগবিলাস ও পার্থিব প্রতিযোগিতা উম্মতের ঈমানি ঐক্যের জন্য সবচেয়ে বড় পরীক্ষা।',
    reflectionEn:
      'Material rivalry for worldly gain remains one of the greatest spiritual trials warned against by the Prophet ﷺ.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪০৪২',
    sourceEn: 'Sahih al-Bukhari, Hadith 4042',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী (উহুদ যুদ্ধ অধ্যায়)',
        chapterEn: 'Book of Military Expeditions (Battle of Uhud)',
        citationBn: 'হাদিস নং ৪০৪২, ১৩৪৪',
        citationEn: 'Hadith 4042, 1344',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 4,
    partNo: 1,
    timeContextBn: 'সফর ১১ হিজরির শেষ ভাগ · মদিনা',
    timeContextEn: 'Late Safar 11 AH · Madinah',
    titleBn: 'উসামা (রা.)-এর বাহিনী প্রস্তুত',
    titleEn: 'Preparing the Expedition of Usamah (RA)',
    pointsBn: [
      'জীবনের শেষ দিকে তরুণ উসামা ইবনে যায়েদ (রা.)-কে রোমান সীমান্তের অভিযানে সেনাপতি করেন।',
      'কেউ আপত্তি তুললে বলেন, সে নেতৃত্বের যোগ্য, আর সে আমার প্রিয় মানুষদের একজন।',
    ],
    pointsEn: [
      'Toward the end of his life, he appointed the young Usamah ibn Zayd (RA) to command an expedition to the Byzantine frontier.',
      'When some questioned his youth, he affirmed: “He is worthy of leadership and among the dearest of people to me.”',
    ],
    detailedNarrativeBn:
      'রোমান সীমান্তের নিরাপত্তা সুদৃঢ় করতে এবং মুতার শহীদদের মর্যাদা রক্ষায় নবীজি ﷺ একটি শক্তিশালী বাহিনী প্রস্তুত করেন এবং মাত্র আঠারো-উনিশ বছর বয়সী তরুণ হযরত উসামা ইবনে যায়েদ (রা.)-কে এর সেনাপতি নিযুক্ত করেন—যাঁর অধীনে আবু বকর, উমরসহ প্রবীণ সাহাবিরাও ছিলেন। কিছু মানুষ তাঁর কম বয়স নিয়ে প্রশ্ন তুললে অসুস্থ অবস্থাতেই মাথায় পট্টি বেঁধে নবীজি ﷺ মিম্বারে উঠে উসামার নেতৃত্বের দৃঢ় সমর্থন ঘোষণা করেন।',
    detailedNarrativeEn:
      'To secure the northern frontier, the Prophet ﷺ assembled an expeditionary force under the command of young Usamah ibn Zayd (RA), placing senior Companions under his banner. When whispers questioned Usamah’s youth, the Prophet ﷺ stepped onto the pulpit despite his fever to defend his appointment decisively.',
    extendedContextBn:
      'তিনি বললেন—“তোমরা যদি আজ উসামার নেতৃত্ব নিয়ে প্রশ্ন তোলো, তবে এর আগে তোমরা তার পিতা যায়েদের নেতৃত্ব নিয়েও প্রশ্ন তুলেছিলে। আল্লাহর কসম! সে (যায়েদ) নেতৃত্বের যোগ্য ছিল এবং আমার কাছে সবচেয়ে প্রিয় মানুষদের একজন ছিল; আর তার পর এই উসামাও আমার কাছে সবচেয়ে প্রিয় মানুষদের একজন।” পরবর্তীকালে খলিফা আবু বকর (রা.) নবীজির এই শেষ নির্দেশ অক্ষরে অক্ষরে বাস্তবায়ন করে উসামার বাহিনী প্রেরণ করেন।',
    extendedContextEn:
      'He declared that just as Zayd ibn Harithah had been worthy of leadership and beloved to him, so too was his son Usamah. Honoring this final prophetic directive became one of Caliph Abu Bakr’s very first acts of leadership.',
    locationBn: 'মসজিদে নববী ও জুরুফ শিবির, মদিনা',
    locationEn: 'Masjid an-Nabawi & Jurf Camp, Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত উসামা ইবনে যায়েদ (রা.), হযরত আবদুল্লাহ ইবনে উমর (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Usamah ibn Zayd (RA), Abdullah ibn Umar (RA)',
    reflectionBn:
      'ইসলামে নেতৃত্বের মাপকাঠি বংশ বা বয়স নয়, বরং যোগ্যতা, আমানতদারিতা ও আল্লাহভীতি।',
    reflectionEn:
      'In Islam, leadership rests on merit, trustworthiness, and devotion—not age or social status.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৬৯',
    sourceEn: 'Sahih al-Bukhari, Hadith 4469',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী (উসামা ইবনে যায়েদ রা.-এর অভিযান)',
        chapterEn: 'Book of Military Expeditions (Expedition of Usamah)',
        citationBn: 'হাদিস নং ৪৪৬৯, ৩৭৩০',
        citationEn: 'Hadith 4469, 3730',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },

  // =========================================================================
  // পর্ব ২ · অসুস্থতার শুরু (০৫ - ০৬)
  // =========================================================================
  {
    no: 5,
    partNo: 2,
    timeContextBn: 'সফর ১১ হিজরির শেষ ভাগ · মদিনা',
    timeContextEn: 'Late Safar 11 AH · Madinah',
    titleBn: 'মাথাব্যথা দিয়ে অসুস্থতার শুরু',
    titleEn: 'Final Illness Begins with a Headache',
    pointsBn: [
      'আয়েশা (রা.) মাথাব্যথার কথা বললে নবীজি ﷺ বলেন, ‘বরং আমার মাথা ব্যথা করছে’।',
      'প্রসিদ্ধ বর্ণনামতে এভাবেই শুরু হয় শেষ অসুস্থতা, যা চলেছিল প্রায় ১০–১৪ দিন।',
    ],
    pointsEn: [
      'When Aisha (RA) complained of a headache, the Prophet ﷺ said: “Rather, O Aisha, it is my head that aches!”',
      'According to well-known narrations, this marked the start of his final illness, lasting roughly 10–14 days.',
    ],
    detailedNarrativeBn:
      'জান্নাতুল বাকীতে মধ্যরাতে কবর জিয়ারত ও মাগফিরাতের দোয়া করে ফেরার পরই রাসূলুল্লাহ ﷺ-এর তীব্র মাথাব্যথা ও জ্বর শুরু হয়। ঘরে ফিরে দেখেন হযরত আয়েশা (রা.) মাথাব্যথায় কাতর হয়ে বলছেন—‘ওয়া রা’সাহ!’ (হায় আমার মাথা!)। তখন স্নেহমাখা কণ্ঠে নবীজি ﷺ বললেন—‘বরং হে আয়েশা, আমারই মাথা প্রচণ্ড ব্যথা করছে!’ প্রসিদ্ধ সীরাত বর্ণনামতে এখান থেকেই তাঁর শেষ অসুস্থতার সূচনা হয়, যা প্রায় ১০ থেকে ১৪ দিন স্থায়ী হয়েছিল।',
    detailedNarrativeEn:
      'Shortly after returning from praying for the deceased at Al-Baqi, the Prophet ﷺ experienced the onset of a severe headache and fever. Finding Aisha (RA) exclaiming over her own headache, he gently replied, “Rather, O Aisha, my own head aches!”—marking the opening of his final 10–14 day illness.',
    extendedContextBn:
      'অসুস্থতার প্রথম কয়েক দিন নবীজি ﷺ তীব্র জ্বর নিয়েও স্ত্রীদের পালা অনুযায়ী প্রত্যেক স্ত্রীর হুজরায় গমন করতেন এবং মসজিদে নববীতে গিয়ে নামাজের ইমামতি করতেন। প্রচণ্ড শারীরিক কষ্টের মাঝেও তিনি ন্যায়পরায়ণতা ও ইবাদতের এক অটল দৃষ্টান্ত স্থাপন করে গেছেন।',
    extendedContextEn:
      'Even during the opening days of his fever, the Prophet ﷺ maintained complete fairness by rotating among his wives’ chambers and continuing to lead prayers in the mosque until his strength gave way.',
    locationBn: 'হযরত আয়েশা (রা.) ও মাইমূনা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chambers of Aisha (RA) & Maymunah (RA), Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আয়েশা (রা.), উম্মাহাতুল মুমিনীন',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Aisha (RA), Mothers of the Believers',
    reflectionBn:
      'নবী-রাসূলগণও শারীরিক কষ্ট ও পরীক্ষার ঊর্ধ্বে নন; বরং ধৈর্যের মাধ্যমেই আল্লাহর নিকট মর্যাদা আরও উন্নত হয়।',
    reflectionEn:
      'Even the noblest of creation faced physical pain with patience, elevating his rank before Allah.',
    arabicQuote: 'بَلْ أَنَا وَاللَّهِ يَا عَائِشَةُ وَارَأْسَاهُ',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৫৬৬৬',
    sourceEn: 'Sahih al-Bukhari, Hadith 5666',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মারদা (রোগীদের অধ্যায়)',
        chapterEn: 'Book of Patients',
        citationBn: 'হাদিস নং ৫৬৬৬',
        citationEn: 'Hadith 5666',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 6,
    partNo: 2,
    timeContextBn: 'অসুস্থতার তীব্রতা বৃদ্ধি · মদিনা',
    timeContextEn: 'Intensifying Illness · Madinah',
    titleBn: 'আয়েশা (রা.)-এর ঘরে থাকার অনুমতি',
    titleEn: 'Permission to Stay in Aisha’s (RA) Chamber',
    pointsBn: [
      'অসুস্থতা বাড়লে তিনি স্ত্রীদের কাছে আয়েশা (রা.)-এর ঘরে থাকার অনুমতি চান; সবাই সানন্দে অনুমতি দেন।',
      'আব্বাস (রা.) ও আরেকজনের কাঁধে ভর দিয়ে যান, পা দুটি মাটিতে ঘষে ঘষে যাচ্ছিল।',
    ],
    pointsEn: [
      'As his illness worsened, he asked his wives for permission to be nursed in Aisha’s (RA) room, and they gladly agreed.',
      'He walked there supported between Al-Abbas (RA) and another man, his blessed feet tracing the ground.',
    ],
    detailedNarrativeBn:
      'হযরত মাইমূনা (রা.)-এর ঘরে অবস্থানকালে নবীজি ﷺ-এর জ্বর ও দুর্বলতা তীব্রতর হয়ে উঠল। তিনি মাঝে মাঝেই জিজ্ঞেস করতেন—‘আগামীকাল আমি কোথায় থাকব?’ স্ত্রীগণ তাঁর আন্তরিক ইচ্ছা বুঝতে পারলেন। তিনি বিনয়ের সাথে সব স্ত্রীর কাছ থেকে আয়েশা (রা.)-এর ঘরে চিকিৎসা ও সেবার জন্য থাকার অনুমতি চাইলে সবাই সানন্দে ও ভালোবাসার সাথে সম্মতি প্রদান করেন।',
    detailedNarrativeEn:
      'While staying in Maymunah’s (RA) room, his fever intensified and he kept asking whose turn would come next. Sensing his wish, his wives wholeheartedly granted permission for him to be cared for in Aisha’s (RA) room.',
    extendedContextBn:
      'তিনি এতটাই দুর্বল হয়ে পড়েছিলেন যে একা হাঁটার শক্তি ছিল না। চাচা হযরত আব্বাস (রা.) এবং অপর একজন সাহাবি—হযরত ইবনে আব্বাস (রা.)-এর বর্ণনায় হযরত আলী (রা.)—দুপাশ থেকে তাঁকে ধরে নিয়ে গেলেন; তাঁর পবিত্র পা দুটি মাটির ওপর দিয়ে ঘষে ঘষে এগোচ্ছিল। জীবনের শেষ দিন পর্যন্ত তিনি আয়েশা (রা.)-এর সেই কক্ষেই অবস্থান করেন।',
    extendedContextEn:
      'Too weakened to walk unaided, he leaned upon his uncle Al-Abbas (RA) and another companion—identified by Ibn Abbas (RA) as Ali (RA)—as his feet dragged gently along the ground into Aisha’s chamber, where he remained until his final breath.',
    locationBn: 'মাইমূনা (রা.)-এর ঘর থেকে আয়েশা (রা.)-এর হুজরা',
    locationEn: 'From Maymunah’s (RA) to Aisha’s (RA) Chamber',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আব্বাস (রা.), হযরত আলী (রা.), হযরত আয়েশা (রা.) ও উম্মাহাতুল মুমিনীন',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Al-Abbas (RA), Ali (RA), Aisha (RA) & Wives of the Prophet',
    reflectionBn:
      'চরম অসুস্থতার মুহূর্তেও স্ত্রীদের অনুমতি চাওয়ার মাধ্যমে নবীজি ﷺ দাম্পত্য ন্যায়বিচার ও আদবের সর্বোচ্চ শিক্ষা দিয়ে গেছেন।',
    reflectionEn:
      'Even in severe illness, seeking his wives’ consent showcased the Prophet’s unwavering fairness and courtesy.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৪২',
    sourceEn: 'Sahih al-Bukhari, Hadith 4442',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী (নবী ﷺ-এর অসুস্থতা ও ওফাত)',
        chapterEn: 'Book of Military Expeditions (Illness & Passing)',
        citationBn: 'হাদিস নং ৪৪৪২, ১৯৮, ২৫৮৮',
        citationEn: 'Hadith 4442, 198, 2588',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },

  // =========================================================================
  // পর্ব ৩ · ইন্তেকালের ৫ দিন আগে (০৭ - ০৯)
  // =========================================================================
  {
    no: 7,
    partNo: 3,
    timeContextBn: 'ইন্তেকালের ৫ দিন আগে · বুধবার',
    timeContextEn: '5 Days Before Passing · Wednesday',
    titleBn: 'সাত মশক পানি',
    titleEn: 'Pouring Seven Skins of Cool Water',
    pointsBn: [
      'জ্বর তীব্র হলে বলেন, মুখ খোলা হয়নি এমন সাত মশক পানি আমার ওপর ঢালো, যেন মানুষকে উপদেশ দিতে পারি।',
      'পানি ঢালার পর একটু হালকা বোধ করে তিনি মসজিদে গিয়ে সাহাবিদের উদ্দেশে কথা বলেন।',
    ],
    pointsEn: [
      'When his fever raged, he instructed: “Pour over me seven skins of water whose ties have not been untied, so I may advise the people.”',
      'Feeling slight relief afterward, he walked out to the mosque to address the Companions.',
    ],
    detailedNarrativeBn:
      'ইন্তেকালের পাঁচ দিন আগে (বুধবার) রাসূলুল্লাহ ﷺ-এর জ্বরের উত্তাপ এতটাই বেড়ে গেল যে তা সাধারণ মানুষের দুজনের জ্বরের সমান অনুভূত হচ্ছিল। তিনি উম্মতকে গুরুত্বপূর্ণ কিছু শেষ উপদেশ দেওয়ার তীব্র তাগিদ অনুভব করে বললেন—“বিভিন্ন কূপের মুখ না-খোলা সাত মশক ঠাণ্ডা পানি আমার ওপর ঢেলে দাও, যেন আমি একটু স্বস্তি পেয়ে মানুষের কাছে গিয়ে ওসিয়ত করতে পারি।”',
    detailedNarrativeEn:
      'Five days before his passing, his fever burned intensely—equal to the fever of two men. Longing to deliver vital final advice to his community, he requested that seven sealed skins of cool water from different wells be poured over him so he might gather strength to step into the mosque.',
    extendedContextBn:
      'তখন তাঁকে হযরত হাফসা (রা.)-এর একটি পাথরের পাত্রে (মিখদাব) বসিয়ে সাত মশক পানি ঢালা হলো, যতক্ষণ না তিনি হাতের ইশারায় বললেন—‘যথেষ্ট হয়েছে, যথেষ্ট হয়েছে।’ এরপর মাথায় একটি পট্টি বেঁধে তিনি মসজিদে নববীতে প্রবেশ করেন এবং মিম্বারে বসে ইতিহাসের অন্যতম আবেগঘন খুতবা প্রদান করেন।',
    extendedContextEn:
      'Seated inside a stone basin belonging to Hafsah (RA), cool water was poured over him until he signaled, “Enough, enough.” With a cloth bound around his aching head, he walked to the pulpit to speak to his beloved Companions.',
    locationBn: 'হুজরায়ে আয়েশা (রা.) ও মসজিদে নববী',
    locationEn: 'Aisha’s (RA) Chamber & Masjid an-Nabawi',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আয়েশা (রা.), হযরত হাফসা (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Aisha (RA), Hafsah (RA)',
    reflectionBn:
      'প্রচণ্ড জ্বর ও যন্ত্রণার মাঝেও উম্মতের হেদায়েত ও কল্যাণচিন্তাই ছিল প্রিয় নবীর সর্বোচ্চ অগ্রাধিকার।',
    reflectionEn:
      'Even amid burning fever, the guidance and well-being of his Ummah remained his foremost concern.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৪২',
    sourceEn: 'Sahih al-Bukhari, Hadith 4442',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী ও কিতাবুল ওজু',
        chapterEn: 'Book of Military Expeditions & Book of Ablution',
        citationBn: 'হাদিস নং ৪৪৪২, ১৯৮',
        citationEn: 'Hadith 4442, 198',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 8,
    partNo: 3,
    timeContextBn: 'ইন্তেকালের ৫ দিন আগে · মসজিদে নববী',
    timeContextEn: '5 Days Before Passing · Masjid an-Nabawi',
    titleBn: '‘এক বান্দাকে এখতিয়ার দেওয়া হয়েছে’',
    titleEn: '“A Servant Was Given a Choice”',
    pointsBn: [
      'মিম্বারে বলেন, আল্লাহ এক বান্দাকে দুনিয়া ও আল্লাহর কাছে যা আছে, তার মধ্যে বেছে নিতে বলেছেন; সে আল্লাহর কাছে থাকাই বেছে নিয়েছে।',
      'একমাত্র আবু বকর (রা.) বুঝলেন, সেই বান্দা নবীজি ﷺ নিজেই; তিনি কেঁদে ফেললেন।',
    ],
    pointsEn: [
      'On the pulpit he said: “Allah gave a servant the choice between the splendor of this world and what is with Allah, and he chose what is with Allah.”',
      'Only Abu Bakr (RA) immediately understood that servant was the Prophet ﷺ himself, and he burst into tears.',
    ],
    detailedNarrativeBn:
      'মসজিদে নববীর মিম্বারে বসে নবীজি ﷺ অত্যন্ত গম্ভীর ও মর্মস্পর্শী ভাষায় বললেন—“নিশ্চয়ই আল্লাহ তাঁর এক বান্দাকে এখতিয়ার দিয়েছেন—সে চাইলে দুনিয়ার সৌন্দর্য ও স্থায়িত্ব বেছে নিতে পারে, অথবা আল্লাহর কাছে যা আছে তা বেছে নিতে পারে। সেই বান্দা আল্লাহর কাছে যা আছে, তা-ই বেছে নিয়েছে।” উপস্থিত অধিকাংশ সাহাবি বিস্ময় নিয়ে ভাবছিলেন—কোন সেই বান্দা? কিন্তু অন্তর্দৃষ্টিসম্পন্ন হযরত আবু বকর সিদ্দীক (রা.) এক মুহূর্তেই মর্ম বুঝে ফুঁপিয়ে কেঁদে উঠলেন।',
    detailedNarrativeEn:
      'Seated upon the pulpit, the Prophet ﷺ spoke tenderly of a servant offered a choice between earthly adornment and nearness to Allah—who chose nearness to Allah. While most listeners marveled at who this servant might be, Abu Bakr (RA) immediately grasped the meaning and wept openly.',
    extendedContextBn:
      'কান্নাজড়িত কণ্ঠে আবু বকর (রা.) বললেন—“আমাদের পিতা-মাতা আপনার জন্য কুরবান হোক, হে আল্লাহর রাসূল!” আবু সাঈদ খুদরী (রা.) বলেন, তখন আমরা মনে মনে বিস্মিত হচ্ছিলাম যে একজন নেককার বান্দার কথা শুনে এই বৃদ্ধ সাহাবি কেন এত কাঁদছেন! কয়েক দিন পর যখন নবীজি ইন্তেকাল করলেন, তখনই আমরা বুঝলাম—সেই বান্দা ছিলেন স্বয়ং রাসূলুল্লাহ ﷺ, আর আমাদের মধ্যে আবু বকরই ছিলেন সবচেয়ে প্রাজ্ঞ ও জ্ঞানী।',
    extendedContextEn:
      'Abu Bakr cried out, “May our fathers and mothers be ransomed for you!” Abu Sa‘id al-Khudri (RA) recalled how puzzled everyone felt at Abu Bakr’s tears—until days later when they realized the servant was the Prophet ﷺ himself, and that Abu Bakr possessed the deepest insight among them all.',
    locationBn: 'মসজিদে নববী, মদিনা',
    locationEn: 'Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আবু বকর (রা.), হযরত আবু সাঈদ খুদরী (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Abu Bakr (RA), Abu Sa‘id al-Khudri (RA)',
    reflectionBn:
      'গভীর ভালোবাসা ও অন্তর্দৃষ্টি থাকলে না-বলা ইঙ্গিতও হৃদয়ে ধরা পড়ে—আবু বকর (রা.)-এর কান্না তারই উজ্জ্বল দৃষ্টান্ত।',
    reflectionEn:
      'Deep love and spiritual insight perceive truths hidden between words, as Abu Bakr’s tears vividly demonstrated.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৫৪',
    sourceEn: 'Sahih al-Bukhari, Hadith 3654',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবু ফাদায়িলি আসহাবিন নবী ﷺ',
        chapterEn: 'Book of Virtues of the Companions',
        citationBn: 'হাদিস নং ৩৬৫৪, ৩৯০৪, ৪৬৬',
        citationEn: 'Hadith 3654, 3904, 466',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 9,
    partNo: 3,
    timeContextBn: 'ইন্তেকালের ৫ দিন আগে · মসজিদে নববী',
    timeContextEn: '5 Days Before Passing · Masjid an-Nabawi',
    titleBn: 'আবু বকর (রা.)-এর মর্যাদা',
    titleEn: 'The Singular Honor of Abu Bakr (RA)',
    pointsBn: [
      'তিনি বলেন, সঙ্গ ও সম্পদ দিয়ে আমার প্রতি সবচেয়ে বেশি অনুগ্রহ করেছেন আবু বকর (রা.)।',
      'নির্দেশ দেন, মসজিদের দিকে খোলা সব দরজা বন্ধ হবে, শুধু আবু বকরের দরজা খোলা থাকবে।',
    ],
    pointsEn: [
      'He declared: “The person who has favored me most with his companionship and wealth is Abu Bakr (RA).”',
      'He commanded that every doorway opening into the mosque be closed except the doorway of Abu Bakr (RA).',
    ],
    detailedNarrativeBn:
      'আবু বকর (রা.)-কে কাঁদতে দেখে নবীজি ﷺ স্নেহভরে তাঁকে সান্ত্বনা দিলেন এবং সমগ্র উম্মতের সামনে তাঁর অনন্য মর্যাদা ঘোষণা করলেন। তিনি বললেন—“মানুষের মধ্যে সাহচর্য ও সম্পদ ব্যয়ের মাধ্যমে আমার প্রতি সর্বাধিক অনুগ্রহকারী হলেন আবু বকর। আমি যদি আমার রব ব্যতীত অন্য কাউকে একান্ত অন্তরঙ্গ বন্ধু (খলীল) হিসেবে গ্রহণ করতাম, তবে আবু বকরকেই করতাম; তবে ইসলামের ভ্রাতৃত্ব ও ভালোবাসাই যথেষ্ট।”',
    detailedNarrativeEn:
      'Comforting the weeping Abu Bakr (RA), the Prophet ﷺ honored him before the entire congregation: “Of all people, the most generous to me in companionship and wealth is Abu Bakr. Were I to take an intimate bosom friend (Khalil) besides my Lord, I would take Abu Bakr—yet Islamic brotherhood and love suffice.”',
    extendedContextBn:
      'এরপর তিনি এক সুদূরপ্রসারী ঐতিহাসিক নির্দেশ দিলেন—“মসজিদে নববীর দিকে উন্মুক্ত কোনো ছোট দরজাই আর খোলা থাকবে না, কেবল আবু বকরের দরজা ব্যতীত।” উলামায়ে কিরাম উল্লেখ করেন, এটি ছিল নবীজি ﷺ-এর পর আবু বকর (রা.)-এর খিলাফত ও মসজিদে নেতৃত্বের প্রতি এক সুস্পষ্ট ও মর্যাদাপূর্ণ ইঙ্গিত।',
    extendedContextEn:
      'He then issued a striking command: “Leave no doorway opening into the mosque unclosed except the doorway of Abu Bakr.” Scholars unanimously recognize this directive as a profound indication of Abu Bakr’s impending leadership of the Ummah.',
    locationBn: 'মসজিদে নববী, মদিনা',
    locationEn: 'Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আবু বকর সিদ্দীক (রা.), সাহাবায়ে কিরাম',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Abu Bakr as-Siddiq (RA), Companions',
    reflectionBn:
      'নিঃস্বার্থ ত্যাগ, বিশ্বস্ততা ও দ্বীনের পথে অকাতর দানের প্রতিদান আল্লাহ ও তাঁর রাসূলের কাছে চিরঅম্লান।',
    reflectionEn:
      'Selfless loyalty and generosity in the path of faith earn eternal honor before Allah and His Messenger.',
    arabicQuote: 'لَا يَبْقَيَنَّ فِي المَسْجِدِ بَابٌ إِلَّا سُدَّ، إِلَّا بَابُ أَبِي بَكْرٍ',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৫৪',
    sourceEn: 'Sahih al-Bukhari, Hadith 3654',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবু ফাদায়িলিস সাহাবাহ ও কিতাবুস সালাত',
        chapterEn: 'Book of Virtues of the Companions & Book of Prayer',
        citationBn: 'হাদিস নং ৩৬৫৪, ৪৬৬, ৩৯০৪',
        citationEn: 'Hadith 3654, 466, 3904',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        chapterBn: 'কিতাবু ফাদায়িলিস সাহাবাহ',
        chapterEn: 'Book of Virtues of the Companions',
        citationBn: 'হাদিস নং ২৩৮২',
        citationEn: 'Hadith 2382',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },

  // =========================================================================
  // পর্ব ৪ · ইন্তেকালের ৪ দিন আগে (১০ - ১৪)
  // =========================================================================
  {
    no: 10,
    partNo: 4,
    timeContextBn: 'ইন্তেকালের ৪ দিন আগে · বৃহস্পতিবার',
    timeContextEn: '4 Days Before Passing · Thursday',
    titleBn: 'বৃহস্পতিবার: লেখার উপকরণ চাওয়া',
    titleEn: 'Thursday: Requesting Writing Materials',
    pointsBn: [
      'এক বৃহস্পতিবারে কষ্ট বেড়ে গেলে বলেন, লেখার কিছু আনো, এমন কিছু লিখে দেব যাতে তোমরা পথভ্রষ্ট না হও।',
      'উপস্থিতদের মধ্যে মতভেদ হলে তিনি তাদের উঠে যেতে বলেন।',
    ],
    pointsEn: [
      'On Thursday, as his pain intensified, he said: “Bring me writing materials so I may write for you something after which you will never go astray.”',
      'When disagreement broke out among those present, he asked them to leave.',
    ],
    detailedNarrativeBn:
      'ইন্তেকালের চার দিন আগে বৃহস্পতিবার নবীজি ﷺ-এর শারীরিক যন্ত্রণা প্রবল হয়ে ওঠে। হুজরায় তখন বহু সাহাবি উপস্থিত ছিলেন। তিনি বললেন—“তোমরা এসো, আমি তোমাদের জন্য এমন একটি লিপি লিখে দেব যার পর তোমরা কখনো পথভ্রষ্ট হবে না।” উপস্থিত সাহাবিদের কেউ বললেন, দ্রুত কাগজ-কলম নিয়ে আসো; আর কেউ তাঁর তীব্র কষ্ট দেখে ভাবলেন—নবীজি এখন অত্যন্ত ব্যথিত, আমাদের কাছে তো আল্লাহর কিতাব (কুরআন) রয়েছেই, তাই তাঁকে আর কষ্ট দেওয়া ঠিক হবে না।',
    detailedNarrativeEn:
      'Four days before his passing on Thursday, as his pain intensified inside the crowded room, the Prophet ﷺ asked for writing materials to dictate a guiding document. Some urged bringing paper immediately while others feared burdening him in severe agony since they already possessed the Book of Allah.',
    extendedContextBn:
      'এই নিয়ে ঘরের ভেতর সাহাবিদের মধ্যে কণ্ঠস্বর উঁচু হয়ে মতভেদ দেখা দিলে নবীজি ﷺ অসন্তুষ্ট হয়ে বললেন—“তোমরা আমার কাছ থেকে উঠে যাও; একজন নবীর সামনে বিতর্ক করা সমীচীন নয়।” এরপরও তিনি আরও চার দিন জীবিত ছিলেন—তাঁর যদি কোনো ফরজ বিধান নতুন করে লিখে দেওয়া অপরিহার্য হতো, তবে অবশ্যই লিখে দিতেন; বরং মৌখিকভাবে তিনি প্রয়োজনীয় তিনটি অসিয়ত জানিয়ে দেন।',
    extendedContextEn:
      'As voices rose in debate inside the chamber, the Prophet ﷺ asked them to step outside, reminding them that quarreling in a prophet’s presence was unbefitting. Living four more days thereafter, he conveyed his essential counsels verbally rather than in writing.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত ইবনে আব্বাস (রা.), উপস্থিত সাহাবিগণ',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Ibn Abbas (RA), gathered Companions',
    reflectionBn:
      'নবীর দরবারে আদব ও নীরবতা রক্ষা করা এবং কুরআন-সুন্নাহকে আঁকড়ে ধরাই উম্মতের হেদায়েতের মূল চাবিকাঠি।',
    reflectionEn:
      'Reverence, restraint from discord, and adherence to Quran and Sunnah protect the Ummah from straying.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩০৫৩',
    sourceEn: 'Sahih al-Bukhari, Hadith 3053',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জিহাদ ও কিতাবুল মাগাযী',
        chapterEn: 'Book of Jihad & Book of Military Expeditions',
        citationBn: 'হাদিস নং ৩০৫৩, ৪৪৩১, ৪৪৩২',
        citationEn: 'Hadith 3053, 4431, 4432',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 11,
    partNo: 4,
    timeContextBn: 'ইন্তেকালের ৪ দিন আগে · বৃহস্পতিবার',
    timeContextEn: '4 Days Before Passing · Thursday',
    titleBn: 'তিনটি অসিয়ত',
    titleEn: 'Three Final Counsels',
    pointsBn: [
      'এরপর তিনি অসিয়ত করেন: আরব উপদ্বীপ থেকে মুশরিকদের বের করে দিও।',
      'প্রতিনিধিদলকে আমি যেভাবে সম্মান করতাম, তোমরাও সেভাবে করো। তৃতীয় অসিয়তটি বর্ণনাকারী ভুলে গেছেন।',
    ],
    pointsEn: [
      'He then left three counsels: “Expel the polytheists from the Arabian Peninsula.”',
      '“Honor visiting delegations just as I used to honor them.” The narrator forgot the third counsel.',
    ],
    detailedNarrativeBn:
      'বৃহস্পতিবারের সেই ঘটনার পর নবীজি ﷺ উম্মতের উদ্দেশে তিনটি গুরুত্বপূর্ণ রাষ্ট্রীয় ও সামাজিক অসিয়ত করেন। প্রথমত, ইসলামের পবিত্র প্রাণকেন্দ্র আরব উপদ্বীপে তাওহীদের পবিত্রতা ও নিরাপত্তা রক্ষার স্বার্থে মুশরিকদের সেখান থেকে অপসারণ করা। দ্বিতীয়ত, দূর-দূরান্ত থেকে আগত বিভিন্ন গোত্র ও রাষ্ট্রের প্রতিনিধিদলকে (ওয়াফদ) তিনি যেভাবে সম্মান, আতিথেয়তা ও উপহার দিতেন, ভবিষ্যৎ শাসকরাও যেন সেই সুন্দর কূটনৈতিক আদব বজায় রাখেন।',
    detailedNarrativeEn:
      'Following that moment on Thursday, the Prophet ﷺ gave three strategic counsels: safeguarding the Arabian Peninsula as a sanctuary of pure Tawhid, and continuing his noble tradition of welcoming and honoring visiting delegations with hospitality and dignity.',
    extendedContextBn:
      'হাদিসের বর্ণনাকারী সুলাইমান আল-আহওয়াল (রহ.) তৃতীয় অসিয়তটির কথা ভুলে যান (বা ইচ্ছাকৃতভাবে নীরব থাকেন)। হাদিস বিশারদগণ অন্যান্য বর্ণনার আলোকে উল্লেখ করেছেন যে তৃতীয় অসিয়তটি ছিল—উসামা (রা.)-এর বাহিনী প্রেরণ কার্যকর করা, অথবা সালাত ও কুরআনকে দৃঢ়ভাবে আঁকড়ে ধরা।',
    extendedContextEn:
      'The sub-narrator forgot the exact wording of the third bequest; classical scholars of Hadith note from parallel narrations that it likely concerned dispatching Usamah’s expedition, holding fast to the Quran, or safeguarding prayer.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত ইবনে আব্বাস (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Ibn Abbas (RA)',
    reflectionBn:
      'দ্বীনের কেন্দ্রের পবিত্রতা রক্ষা এবং অতিথি ও দূতদের প্রতি উত্তম আচরণ ইসলামী রাষ্ট্রের চিরন্তন নীতি।',
    reflectionEn:
      'Preserving sacred integrity alongside gracious hospitality toward guests reflects prophetic statesmanship.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩০৫৩',
    sourceEn: 'Sahih al-Bukhari, Hadith 3053',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জিহাদ ও কিতাবুল মাগাযী',
        chapterEn: 'Book of Jihad & Military Expeditions',
        citationBn: 'হাদিস নং ৩০৫৩, ৪৪৩১',
        citationEn: 'Hadith 3053, 4431',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        chapterBn: 'কিতাবুল ওসিয়্যাহ',
        chapterEn: 'Book of Bequests',
        citationBn: 'হাদিস নং ১৬৩৭',
        citationEn: 'Hadith 1637',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 12,
    partNo: 4,
    timeContextBn: 'ইন্তেকালের ৪ দিন আগে · বৃহস্পতিবার মাগরিব',
    timeContextEn: '4 Days Before Passing · Thursday Maghrib',
    titleBn: 'শেষ ইমামতি: মাগরিবে সূরা মুরসালাত',
    titleEn: 'Final Prayer Led: Surah Al-Mursalat at Maghrib',
    pointsBn: [
      'জীবনের শেষ যে নামাজে তিনি ইমামতি করেন, তা ছিল মাগরিব।',
      'সেই নামাজে তিনি তিলাওয়াত করেন সূরা আল-মুরসালাত; এরপর আর কোনো নামাজে ইমামতি করেননি।',
    ],
    pointsEn: [
      'The very last congregational prayer the Prophet ﷺ led in his life was Maghrib.',
      'In it he recited Surah Al-Mursalat; after that evening, he never led another prayer as Imam.',
    ],
    detailedNarrativeBn:
      'বৃহস্পতিবার সন্ধ্যায় প্রচণ্ড জ্বর ও দুর্বলতা সত্ত্বেও রাসূলুল্লাহ ﷺ মসজিদে নববীতে গিয়ে মাগরিবের নামাজে ইমামতি করেন। সেই নামাজে তিনি সুরেলা ও গম্ভীর কণ্ঠে তিলাওয়াত করেন পবিত্র কুরআনের ৭৭তম সূরা ‘আল-মুরসালাত’। হযরত উম্মুল ফজল বিনতে হারিস (রা.) বর্ণনা করেন—‘আল্লাহর কসম! রাসূলুল্লাহ ﷺ এরপর আর কোনো নামাজেই ইমামতি করে আমাদের সূরা মুরসালাত শোনাননি, যতক্ষণ না আল্লাহ তাঁকে নিজের কাছে উঠিয়ে নিলেন।’',
    detailedNarrativeEn:
      'On Thursday evening despite intense fever, the Prophet ﷺ entered Masjid an-Nabawi to lead Maghrib prayer, reciting Surah Al-Mursalat. Umm al-Fadl bint al-Harith (RA) testified that this was the final prayer he ever led before Allah took his noble soul.',
    extendedContextBn:
      'হযরত উম্মুল ফজল (রা.) একবার তাঁর পুত্র ইবনে আব্বাস (রা.)-কে সূরা মুরসালাত পড়তে শুনে আবেগে কেঁদে ফেলে বলেছিলেন—“হে বৎস, তোমার এই তিলাওয়াত আমাকে স্মরণ করিয়ে দিল—এটিই ছিল সর্বশেষ সূরা যা আমি রাসূলুল্লাহ ﷺ-এর মুখ থেকে মাগরিবের নামাজে শুনেছিলাম।” দীর্ঘ ২৩ বছরের নবুওয়তি জীবনে মসজিদে নববীর মিম্বার ও মিহরাবে সেটিই ছিল তাঁর শেষ ইমামতি।',
    extendedContextEn:
      'Years later, hearing her son Ibn Abbas (RA) recite Surah Al-Mursalat moved Umm al-Fadl (RA) deeply, reminding her that those very verses were the last she ever heard recited by the Prophet ﷺ in prayer.',
    locationBn: 'মসজিদে নববীর মিহরাব, মদিনা',
    locationEn: 'Mihrab of Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত উম্মুল ফজল (রা.), হযরত ইবনে আব্বাস (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Umm al-Fadl (RA), Ibn Abbas (RA)',
    reflectionBn:
      'শারীরিক শক্তি নিঃশেষ হওয়ার আগ মুহূর্ত পর্যন্ত জামাতে নামাজ আদায় করা ছিল নবীজি ﷺ-এর প্রাণস্পন্দন।',
    reflectionEn:
      'Congregational prayer remained the heartbeat of the Prophet’s life until his physical strength utterly gave way.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪২৯',
    sourceEn: 'Sahih al-Bukhari, Hadith 4429',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী ও কিতাবুল আযান',
        chapterEn: 'Book of Military Expeditions & Book of Call to Prayer',
        citationBn: 'হাদিস নং ৪৪২৯, ৭৬৩',
        citationEn: 'Hadith 4429, 763',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        chapterBn: 'কিতাবুস সালাত',
        chapterEn: 'Book of Prayer',
        citationBn: 'হাদিস নং ৪৬২',
        citationEn: 'Hadith 462',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 13,
    partNo: 4,
    timeContextBn: 'ইন্তেকালের ৪ দিন আগে · বৃহস্পতিবার ইশা',
    timeContextEn: '4 Days Before Passing · Thursday Isha',
    titleBn: 'ইশার সময় বারবার অজ্ঞান',
    titleEn: 'Repeatedly Fainting at Isha Time',
    pointsBn: [
      'ইশার সময় জিজ্ঞেস করেন, ‘লোকেরা কি নামাজ পড়েছে?’ তারা আপনার অপেক্ষায় আছে।',
      'গোসল করে উঠতে গিয়ে অজ্ঞান হয়ে যান; এভাবে কয়েকবার ঘটে।',
    ],
    pointsEn: [
      'At Isha he asked: “Have the people prayed?” They replied: “No, they are waiting for you, O Messenger of Allah.”',
      'He washed to rise for prayer but fainted—and this happened three times in succession.',
    ],
    detailedNarrativeBn:
      'বৃহস্পতিবার ইশার ওয়াক্ত হলে নবীজি ﷺ-এর অসুস্থতা আরও বেড়ে যায়। তিনি বারবার জিজ্ঞেস করলেন—“লোকেরা কি নামাজ পড়েছে?” আয়েশা (রা.) বললেন—“না, হে আল্লাহর রাসূল, তারা আপনার অপেক্ষায় মসজিদে বসে আছে।” নবীজি ﷺ পাত্রে পানি আনতে বলে গোসল করলেন এবং মসজিদে যাওয়ার জন্য উঠতে গিয়েই অজ্ঞান হয়ে পড়ে গেলেন।',
    detailedNarrativeEn:
      'When Isha arrived on Thursday night, his illness grew far heavier. Asking if the congregation had prayed and hearing they were waiting for him, he called for water to wash and stand—only to lose consciousness from sheer exhaustion.',
    extendedContextBn:
      'কিছুক্ষণ পর জ্ঞান ফিরতেই আবার প্রথম প্রশ্ন করলেন—“লোকেরা কি নামাজ পড়েছে?” উত্তর এলো—তারা এখনো আপনার অপেক্ষায়। তিনি আবারও গোসল করলেন, আবারও উঠতে গিয়ে বেহুঁশ হয়ে গেলেন। এভাবে পরপর তিনবার চেষ্টা করেও যখন মসজিদে যেতে পারলেন না, তখনই তিনি বুঝতে পারলেন আর মসজিদে যাওয়া সম্ভব নয়—আর তখনই আবু বকর (রা.)-কে ইমামতির নির্দেশ পাঠালেন।',
    extendedContextEn:
      'Each time he regained consciousness, his very first thought was the waiting congregation. Washing and attempting to rise a second and a third time, he fainted again each time—only then conceding that he could not walk to the mosque and sending word for Abu Bakr (RA) to lead.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আয়েশা (রা.), অপেক্ষমাণ সাহাবায়ে কিরাম',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Aisha (RA), waiting Companions',
    reflectionBn:
      'বারবার অজ্ঞান হয়েও জামাতে নামাজের জন্য ব্যাকুলতা—উম্মতের জন্য সালাতের গুরুত্বের অবিস্মরণীয় শিক্ষা।',
    reflectionEn:
      'Fainting three times while striving to join congregational prayer shows how deeply the Prophet ﷺ cherished Salah.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৬৮৭',
    sourceEn: 'Sahih al-Bukhari, Hadith 687',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল আযান (অসুস্থ ব্যক্তির জামাত ও ইমামতি)',
        chapterEn: 'Book of Call to Prayer',
        citationBn: 'হাদিস নং ৬৮৭',
        citationEn: 'Hadith 687',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        chapterBn: 'কিতাবুস সালাত',
        chapterEn: 'Book of Prayer',
        citationBn: 'হাদিস নং ৪১৮',
        citationEn: 'Hadith 418',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 14,
    partNo: 4,
    timeContextBn: 'ইন্তেকালের ৪ দিন আগে · বৃহস্পতিবার ইশা',
    timeContextEn: '4 Days Before Passing · Thursday Isha',
    titleBn: 'আবু বকর (রা.)-কে ইমামের দায়িত্ব',
    titleEn: 'Appointing Abu Bakr (RA) to Lead the Prayer',
    pointsBn: [
      'তিনি বলেন, আবু বকরকে বলো, যেন লোকদের নিয়ে নামাজ পড়ায়।',
      'আয়েশা (রা.) বলেন, তিনি কোমল হৃদয়ের, কেঁদে ফেলবেন; নবীজি ﷺ আবারও একই নির্দেশ দেন।',
    ],
    pointsEn: [
      'He commanded: “Tell Abu Bakr to lead the people in prayer.”',
      'Aisha (RA) pleaded that he was tender-hearted and would weep; the Prophet ﷺ insisted again with the exact same order.',
    ],
    detailedNarrativeBn:
      'তিনবার অজ্ঞান হয়ে যাওয়ার পর রাসূলুল্লাহ ﷺ স্পষ্ট নির্দেশ দিলেন—“আবু বকরকে বলে দাও, সে যেন লোকদের নিয়ে নামাজ পড়ায়।” হযরত আয়েশা (রা.) পিতার কোমল হৃদয়ের কথা ভেবে বললেন—‘হে আল্লাহর রাসূল! আবু বকর অত্যন্ত নরম মনের মানুষ; আপনার স্থানে দাঁড়ালে কান্নার কারণে তিনি কুরআন পড়তে পারবেন না, মানুষ তাঁর আওয়াজ শুনতে পারবে না; বরং উমরকে আদেশ দিন।’ কিন্তু নবীজি ﷺ তা মানলেন না এবং দৃঢ়ভাবে পুনরায় আবু বকর (রা.)-কেই ইমামতির নির্দেশ দিলেন।',
    detailedNarrativeEn:
      'Unable to walk out, the Prophet ﷺ sent word for Abu Bakr (RA) to lead the congregation. Worried that her gentle-hearted father would break down weeping at the Prophet’s prayer spot, Aisha (RA) suggested Umar instead—but the Prophet firmly repeated his command for Abu Bakr alone.',
    extendedContextBn:
      'একবার আবু বকর (রা.) অনুপস্থিত থাকায় উমর (রা.) তাকবীর দিলে নবীজি ﷺ তাঁর কণ্ঠ শুনে বললেন—“আল্লাহ ও মুমিনগণ আবু বকর ছাড়া আর কাউকে মানবেন না।” পরবর্তী চার দিনে ইন্তেকালের আগ পর্যন্ত হযরত আবু বকর (রা.) মোট সতেরো ওয়াক্ত নামাজে ইমামতি করেন। সাহাবিরা পরে বলেছিলেন—“রাসূলুল্লাহ ﷺ আমাদের দ্বীনের (নামাজের) জন্য যাঁকে পছন্দ করেছেন, আমরা কি আমাদের দুনিয়ার (খিলাফতের) জন্য তাঁকে পছন্দ করব না?”',
    extendedContextEn:
      'When Umar stepped forward once in Abu Bakr’s brief absence, the Prophet ﷺ said, “Allah and the believers refuse anyone except Abu Bakr.” Over the final days, Abu Bakr led seventeen prayers—becoming a decisive consensus proof for his leadership afterward.',
    locationBn: 'হুজরায়ে আয়েশা (রা.) ও মসজিদে নববী',
    locationEn: 'Aisha’s (RA) Chamber & Masjid an-Nabawi',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আবু বকর (রা.), হযরত আয়েশা (রা.), হযরত হাফসা (রা.), হযরত উমর (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Abu Bakr (RA), Aisha (RA), Hafsah (RA), Umar (RA)',
    reflectionBn:
      'দ্বীনের সবচেয়ে গুরুত্বপূর্ণ আমল সালাতের ইমামতির জন্য যোগ্যতম ব্যক্তিকে নির্বাচন ছিল নবীজির প্রজ্ঞাপূর্ণ দিকনির্দেশনা।',
    reflectionEn:
      'Entrusting the prayer niche to Abu Bakr (RA) reflected prophetic foresight for the Ummah’s unity.',
    arabicQuote: 'مُرُوا أَبَا بَكْرٍ فَلْيُصَلِّ بِالنَّاسِ',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৩৮৪, ৬৮৭',
    sourceEn: 'Sahih al-Bukhari, Hadith 3384, 687',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল আযান ও কিতাবুল আম্বিয়া',
        chapterEn: 'Book of Call to Prayer & Book of Prophets',
        citationBn: 'হাদিস নং ৬৮৭, ৩৩৮৪, ৭১২',
        citationEn: 'Hadith 687, 3384, 712',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },

  // =========================================================================
  // পর্ব ৫ · ইন্তেকালের ১–২ দিন আগে (১৫ - ১৭)
  // =========================================================================
  {
    no: 15,
    partNo: 5,
    timeContextBn: 'ইন্তেকালের ১–২ দিন আগে · শনিবার বা রবিবার জোহর',
    timeContextEn: '1–2 Days Before Passing · Saturday or Sunday Zuhr',
    titleBn: 'একটু সুস্থ হয়ে জামাতে',
    titleEn: 'Joining the Zuhr Congregation Amid Relief',
    pointsBn: [
      'একদিন কিছুটা হালকা বোধ করলে দুজনের কাঁধে ভর দিয়ে জোহরের নামাজে আসেন।',
      'আবু বকর (রা.) পিছিয়ে যেতে চাইলে ইশারায় থামান, তারপর তাঁর পাশে বসে নামাজ পড়েন।',
    ],
    pointsEn: [
      'Feeling brief relief one day, he came out for Zuhr prayer supported between two men.',
      'When Abu Bakr (RA) tried to step back, he gestured for him to stay and prayed seated beside him.',
    ],
    detailedNarrativeBn:
      'ইন্তেকালের এক-দুই দিন আগে (শনিবার বা রবিবার) জোহরের সময় নবীজি ﷺ নিজেকে কিছুটা হালকা অনুভব করলেন। তখন তিনি দুজন সাহাবির (আব্বাস রা. ও আলী রা.) কাঁধে ভর দিয়ে মসজিদে নববীতে এলেন; তাঁর পা দুটি মাটিতে টেনে টেনে চলছিল। আবু বকর (রা.) তখন জামাতের ইমামতি করছিলেন। নবীজির উপস্থিতি টের পেয়ে আদববশত তিনি পেছনে সরে আসতে চাইলেন, কিন্তু নবীজি ﷺ হাতের ইশারায় তাঁকে নিজের জায়গায় স্থির থাকতে বললেন।',
    detailedNarrativeEn:
      'Experiencing a brief easing of fever around Zuhr a day or two before his passing, the Prophet ﷺ walked into the mosque leaning on Al-Abbas and Ali (RA). Sensing his arrival, Abu Bakr moved to step back out of respect, but the Prophet ﷺ signaled him to remain in place.',
    extendedContextBn:
      'নবীজি ﷺ-কে আবু বকর (রা.)-এর বাম পাশে বসিয়ে দেওয়া হলো। নবীজি ﷺ বসে বসে ইমামতি করলেন, আবু বকর (রা.) দাঁড়িয়ে নবীজি ﷺ-এর অনুসরণ করে উচ্চস্বরে তাকবীর বলছিলেন, আর সমগ্র সাহাবি আবু বকর (রা.)-এর তাকবীর শুনে নামাজ আদায় করছিলেন। জামাতের প্রতি প্রিয় নবীর ভালোবাসার এক হৃদয়স্পর্শী দৃশ্য ছিল সেটি।',
    extendedContextEn:
      'Seated at Abu Bakr’s left, the Prophet ﷺ led the prayer sitting while Abu Bakr stood beside him, following the Prophet’s movements and relaying the Takbir aloud so the entire congregation could follow.',
    locationBn: 'মসজিদে নববী, মদিনা',
    locationEn: 'Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আবু বকর (রা.), হযরত আব্বাস (রা.), হযরত আলী (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Abu Bakr (RA), Al-Abbas (RA), Ali (RA)',
    reflectionBn:
      'সামান্য সুস্থতা পেলেই মসজিদে ছুটে যাওয়ার এই দৃশ্য মুমিনের হৃদয়ে জামাতের প্রতি গভীর প্রেম জাগিয়ে তোলে।',
    reflectionEn:
      'Rushing back to the mosque at the slightest relief reveals the Prophet’s profound love for praying with his community.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৬৮৭',
    sourceEn: 'Sahih al-Bukhari, Hadith 687',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল আযান (জামাতে বসে নামাজ)',
        chapterEn: 'Book of Call to Prayer',
        citationBn: 'হাদিস নং ৬৮৭, ৬৬৪, ৭১২',
        citationEn: 'Hadith 687, 664, 712',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 16,
    partNo: 5,
    timeContextBn: 'ইন্তেকালের ১–২ দিন আগে · রবিবার',
    timeContextEn: '1–2 Days Before Passing · Sunday',
    titleBn: 'শেষ দিনারগুলোও দান',
    titleEn: 'Giving Away His Last Gold Coins in Charity',
    pointsBn: [
      'অসুস্থ অবস্থায় জিজ্ঞেস করেন, আয়েশা, সেই স্বর্ণমুদ্রাগুলো কী করেছ? সেগুলো আনা হলো, পাঁচ থেকে সাতটি দিনার।',
      'হাতে নিয়ে বলেন, এগুলো রেখে আল্লাহর সাথে সাক্ষাৎ করলে মুহাম্মাদের কী ধারণা হবে? দান করে দাও।',
    ],
    pointsEn: [
      'During his illness he asked: “Aisha, what did you do with those gold coins?” Five to seven dinars were brought to him.',
      'Holding them, he said: “What would Muhammad think if he met Allah while still holding these? Give them in charity.”',
    ],
    detailedNarrativeBn:
      'ইন্তেকালের মাত্র একদিন আগে অসুস্থ শয্যায় শুয়ে নবীজি ﷺ-এর মনে পড়ে গেল—তাঁর ঘরে আয়েশা (রা.)-এর কাছে সামান্য কয়েকটি স্বর্ণমুদ্রা (দিনার) রাখা আছে। তিনি জানতে চাইলেন, সেগুলো দান করা হয়েছে কি না। আয়েশা (রা.) জানালেন, নবীজির সেবায় ব্যস্ত থাকায় এখনো দান করা হয়নি। নবীজি ﷺ সেগুলো হাতে নিয়ে দেখলেন—মাত্র পাঁচ থেকে সাতটি দিনার।',
    detailedNarrativeEn:
      'Just before his passing, the Prophet ﷺ remembered a handful of gold dinars kept in Aisha’s (RA) care. Learning she had been too occupied nursing him to distribute them, he asked for the five to seven coins to be placed in his palm.',
    extendedContextBn:
      'অন্তরে এক অপূর্ব তাকওয়া ও নিরাসক্তি নিয়ে তিনি বলে উঠলেন—“এগুলো নিজের কাছে রেখে আল্লাহর সাথে সাক্ষাৎ করলে মুহাম্মাদ কী জবাব দেবে? এখনই এগুলো গরিবদের মাঝে দান করে দাও!” সেই দিনেই তিনি তাঁর গোলামদেরও মুক্ত করে দেন এবং তাঁর অস্ত্রশস্ত্র মুসলিমদের দান করে যান।',
    extendedContextEn:
      'With utter detachment from the world, he asked how he could meet Allah while hoarding even those few coins, commanding they be given to the poor immediately—alongside freeing his servants and leaving his weapons to the community.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আয়েশা (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Aisha (RA)',
    reflectionBn:
      'দুনিয়ার সামান্যতম সঞ্চয়ের মোহ ছাড়াই সম্পূর্ণ নিঃস্ব ও পবিত্র হৃদয়ে তিনি মহান আল্লাহর দরবারে উপস্থিত হয়েছিলেন।',
    reflectionEn:
      'He met his Lord with empty hands and a pure heart, free of any attachment to worldly wealth.',
    sourceBn: 'মুসনাদে আহমাদ, হাদিস নং ২৪২২২',
    sourceEn: 'Musnad Ahmad, Hadith 24222',
    references: [
      {
        bookBn: 'মুসনাদে আহমাদ',
        bookEn: 'Musnad Ahmad',
        chapterBn: 'মুসনাদে আয়েশা (রা.)',
        chapterEn: 'Musnad of Aisha (RA)',
        citationBn: 'হাদিস নং ২৪২২২, ২৪৮৪৪',
        citationEn: 'Hadith 24222, 24844',
        gradeBn: 'হাসান / সহীহ',
        gradeEn: 'Hasan / Sahih',
      },
      {
        bookBn: 'সহীহ ইবনে হিব্বান',
        bookEn: 'Sahih Ibn Hibban',
        chapterBn: 'যুহদ ও দান-সদকা অধ্যায়',
        chapterEn: 'Book of Asceticism & Charity',
        citationBn: 'হাদিস নং ৬৬০৫',
        citationEn: 'Hadith 6605',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 17,
    partNo: 5,
    timeContextBn: 'ইন্তেকালের প্রাক্কালে · ১১ হিজরি',
    timeContextEn: 'On the Eve of Passing · 11 AH',
    titleBn: 'বন্ধক রাখা বর্ম',
    titleEn: 'His Iron Armor Left Pawned',
    pointsBn: [
      'যখন তিনি ইন্তেকাল করেন, তখনও তাঁর লোহার বর্ম এক ইহুদির কাছে বন্ধক ছিল।',
      'পরিবারের জন্য ৩০ সা‘ যব ধার নিতে বর্মটি বন্ধক রেখেছিলেন। দুনিয়ার কোনো সম্পদ রেখে যাননি।',
    ],
    pointsEn: [
      'When the Prophet ﷺ passed away, his iron coat of mail was still pawned with a Jewish merchant.',
      'He had mortgaged it for thirty Sa‘ of barley to feed his household, leaving behind no worldly riches.',
    ],
    detailedNarrativeBn:
      'সমগ্র আরব উপদ্বীপের শাসক এবং কোটি কোটি মানুষের হৃদয়ের সম্রাট হয়েও রাসূলুল্লাহ ﷺ দুনিয়া থেকে বিদায় নিলেন চরম অনাড়ম্বরতা ও দারিদ্র্যের মাঝে। হযরত আয়েশা (রা.) বর্ণনা করেন—নবীজি ﷺ যখন ইন্তেকাল করেন, তখন তাঁর ব্যক্তিগত লোহার বর্মটি মদিনার এক ইহুদি ব্যক্তির কাছে মাত্র ত্রিশ সা‘ যবের বিনিময়ে বন্ধক রাখা ছিল।',
    detailedNarrativeEn:
      'Although sovereign over the Arabian Peninsula, the Prophet ﷺ departed this world in breathtaking simplicity. Aisha (RA) narrated that at the hour of his passing, his iron armor remained pawned to a Jewish neighbor in exchange for thirty Sa‘ of barley for his family’s food.',
    extendedContextBn:
      'হযরত আমর ইবনুল হারিস (রা.) সাক্ষ্য দিয়েছেন যে নবীজি ﷺ ইন্তেকালের সময় কোনো দিনার, দিরহাম, দাস-দাসী বা প্রাসাদ রেখে যাননি; রেখে গিয়েছিলেন শুধু তাঁর সাদা খচ্চর, কিছু অস্ত্র এবং একখণ্ড জমি যা তিনি উম্মতের জন্য সদকা করে গিয়েছিলেন। সেই রাতে আয়েশা (রা.)-এর ঘরের বাতি জ্বালানোর তেলও ছিল না—প্রতিবেশীর কাছ থেকে ধার করে প্রদীপ জ্বালাতে হয়েছিল।',
    extendedContextEn:
      'Amr ibn al-Harith (RA) testified that he left neither dinar nor dirham, neither palace nor estate—only his mule, his arms, and a plot of land dedicated to charity. Even the oil for the lamp on that night had to be borrowed from a neighbor.',
    locationBn: 'মদিনা মুনাওয়ারা',
    locationEn: 'Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আয়েশা (রা.), হযরত আমর ইবনুল হারিস (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Aisha (RA), Amr ibn al-Harith (RA)',
    reflectionBn:
      'নবীজির এই দারিদ্র্য ও নিরাসক্তি প্রমাণ করে—প্রকৃত নেতৃত্ব ভোগের জন্য নয়, বরং উম্মতের সেবার জন্য।',
    reflectionEn:
      'His pawned armor stands as eternal proof that prophetic leadership sought service and the Hereafter, never luxury.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৬৭',
    sourceEn: 'Sahih al-Bukhari, Hadith 4467',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী ও কিতাবুর রাহন (বন্ধক অধ্যায়)',
        chapterEn: 'Book of Military Expeditions & Book of Mortgaging',
        citationBn: 'হাদিস নং ৪৪৬৭, ২৯১৬, ২০৬৮',
        citationEn: 'Hadith 4467, 2916, 2068',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },

  // =========================================================================
  // পর্ব ৬ · শেষ দিন · সোমবার (১৮ - ২৬)
  // =========================================================================
  {
    no: 18,
    partNo: 6,
    timeContextBn: 'শেষ দিন · সোমবার ফজর · ১১ হিজরি',
    timeContextEn: 'Final Day · Monday Fajr · 11 AH',
    titleBn: 'ফজরে পর্দা সরিয়ে শেষ দেখা',
    titleEn: 'Lifting the Curtain at Fajr for One Last Smile',
    pointsBn: [
      'সোমবার ফজরে আবু বকর (রা.)-এর ইমামতিতে সবাই নামাজ পড়ছিলেন।',
      'নবীজি ﷺ হুজরার পর্দা সরিয়ে সাহাবিদের কাতারবন্দি দেখে হাসলেন; সাহাবিরা আনন্দে প্রায় নামাজ ভেঙে ফেলছিলেন।',
    ],
    pointsEn: [
      'At Monday Fajr, the Companions stood in rows praying behind Abu Bakr (RA).',
      'The Prophet ﷺ lifted his chamber curtain and smiled upon their rows; overcome with joy, they nearly broke their prayer.',
    ],
    detailedNarrativeBn:
      'সোমবার ফজরের ওয়াক্তে হযরত আবু বকর (রা.)-এর ইমামতিতে সাহাবিরা সারিবদ্ধ হয়ে নামাজ আদায় করছিলেন। হঠাৎ হযরত আয়েশা (রা.)-এর হুজরার পর্দা সরে গেল—আর নবীজি ﷺ দাঁড়িয়ে পরম তৃপ্তি ও ভালোবাসায় সাহাবিদের সুশৃঙ্খল কাতারগুলোর দিকে তাকালেন। তাঁর চেহারা মোবারক তখন যেন পবিত্র কুরআনের উজ্জ্বল পৃষ্ঠার মতো ঝলমল করছিল, আর মুখে ফুটে উঠল অপূর্ব প্রশান্তির হাসি।',
    detailedNarrativeEn:
      'During Monday Fajr prayer behind Abu Bakr (RA), the curtain of Aisha’s chamber parted. The Prophet ﷺ looked out at the orderly rows of believers, his blessed face shining like a leaf of the Quran, and broke into a radiant smile of deep contentment.',
    extendedContextBn:
      'প্রিয় নবীকে দেখে সাহাবিরা এতটাই আনন্দিত হলেন যে অনেকেই ভাবলেন তিনি সুস্থ হয়ে গেছেন, এমনকি আনন্দে নামাজ ভেঙে যাওয়ার উপক্রম হলো। আবু বকর (রা.) ভেবেছিলেন নবীজি ইমামতি করতে আসছেন, তাই পিছিয়ে কাতারে ঢুকতে চাইলেন; কিন্তু নবীজি ﷺ হাতের ইশারায় সবাইকে নামাজ পূর্ণ করার নির্দেশ দিয়ে ধীরে ধীরে পর্দা ফেলে দিলেন। সেটিই ছিল সমগ্র উম্মতের প্রতি তাঁর শেষ জীবন্ত দৃষ্টি।',
    extendedContextEn:
      'Overjoyed at thinking he had recovered, the congregation almost broke rank and Abu Bakr began stepping back to make room. Gently gesturing for them to complete their prayer, the Prophet ﷺ lowered the curtain—his final living gaze upon his praying Ummah.',
    locationBn: 'হুজরায়ে আয়েশা (রা.) ও মসজিদে নববী',
    locationEn: 'Aisha’s (RA) Chamber & Masjid an-Nabawi',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আনাস (রা.), হযরত আবু বকর (রা.), ফজরের মুসল্লিগণ',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Anas (RA), Abu Bakr (RA), Fajr Congregation',
    reflectionBn:
      'ফজরের জামাতে উম্মতের ঐক্যবদ্ধ ইবাদত দেখেই নবীজি ﷺ জীবনের শেষ প্রশান্তির হাসি হেসেছিলেন।',
    reflectionEn:
      'Seeing his Ummah united in Fajr prayer gave the Prophet ﷺ his final serene smile in this world.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৬৮০; সহীহ মুসলিম, হাদিস নং ৪১৯',
    sourceEn: 'Sahih al-Bukhari, Hadith 680; Sahih Muslim, Hadith 419',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল আযান ও কিতাবুল মাগাযী',
        chapterEn: 'Book of Call to Prayer & Military Expeditions',
        citationBn: 'হাদিস নং ৬৮০, ৬৮১, ৪৪৪৮',
        citationEn: 'Hadith 680, 681, 4448',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        chapterBn: 'কিতাবুস সালাত',
        chapterEn: 'Book of Prayer',
        citationBn: 'হাদিস নং ৪১৯',
        citationEn: 'Hadith 419',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 19,
    partNo: 6,
    timeContextBn: 'শেষ দিন · সোমবার সকাল · হুজরায়ে আয়েশা (রা.)',
    timeContextEn: 'Final Day · Monday Morning · Aisha’s Chamber',
    titleBn: 'ফাতিমা (রা.)-এর কানে কানে',
    titleEn: 'Whispering Two Secrets to Fatimah (RA)',
    pointsBn: [
      'ফাতিমা (রা.)-কে কাছে ডেকে কানে কানে কিছু বললেন; তিনি কেঁদে ফেললেন।',
      'আবার কিছু বললে তিনি হাসলেন। পরে জানা যায়: প্রথমবার বিদায়ের সংবাদ, দ্বিতীয়বার, পরিবারের মধ্যে তিনিই সবার আগে তাঁর কাছে যাবেন।',
    ],
    pointsEn: [
      'He called Fatimah (RA) close and whispered to her, and she wept bitterly.',
      'He whispered a second time and she smiled—for first he foretold his passing, and second that she would be the first of his family to join him.',
    ],
    detailedNarrativeBn:
      'সোমবার সকালে প্রিয় কন্যা হযরত ফাতিমা আয-যাহরা (রা.) পিতাকে দেখতে এলেন। নবীজি ﷺ তাঁকে স্নেহভরে স্বাগত জানিয়ে নিজের ডান বা বাম পাশে বসালেন এবং তাঁর কানে কানে গোপনে একটি কথা বললেন—তা শুনেই ফাতিমা (রা.) কান্নায় ভেঙে পড়লেন। কন্যার গভীর বেদনা দেখে নবীজি ﷺ আবারও কানে কানে আরেকটি কথা বললেন; সাথে সাথেই অশ্রুভেজা মুখে ফাতিমা (রা.) মুচকি হেসে উঠলেন।',
    detailedNarrativeEn:
      'When his beloved daughter Fatimah (RA) came to visit, the Prophet ﷺ welcomed her warmly, seated her beside him, and whispered in her ear—causing her to weep. Seeing her grief, he whispered a second time, and a gentle smile lit her tearful face.',
    extendedContextBn:
      'হযরত আয়েশা (রা.) বিস্মিত হয়ে জিজ্ঞেস করেছিলেন—এত অল্প সময়ের মধ্যে কান্না আর হাসির রহস্য কী? ফাতিমা (রা.) তখন গোপন কথা প্রকাশ করেননি। নবীজি ﷺ-এর ইন্তেকালের পর আয়েশা (রা.) আবার জিজ্ঞেস করলে তিনি জানান: “প্রথমবার বাবা বলেছিলেন এই অসুস্থতাতেই তিনি ইন্তেকাল করবেন, তাই কেঁদেছিলাম। দ্বিতীয়বার বলেছিলেন, আমার আহলে বাইতের মধ্যে তুমিই সর্বপ্রথম আমার সাথে মিলিত হবে এবং তুমি জান্নাতি নারীদের সর্দার—তা শুনে আমি খুশি হয়ে হেসেছিলাম।”',
    extendedContextEn:
      'Only after the Prophet’s passing did Fatimah (RA) disclose the secret to Aisha (RA): first her father informed her that he would depart in this illness, and second he comforted her that she would be the very first of his household to reunite with him and chief of the women of Paradise.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত ফাতিমা (রা.), হযরত আয়েশা (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Fatimah (RA), Aisha (RA)',
    reflectionBn:
      'পিতা-কন্যার অপার স্নেহ, আমানতদারিতা ও জান্নাতে পুনর্মিলনের আশ্বাস এই ঘটনাকে ইতিহাসের অন্যতম কোমল অধ্যায় করেছে।',
    reflectionEn:
      'Tender love, loyalty to a secret, and the promise of reunion in Paradise make this moment unforgettable.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬২৩–৩৬২৪',
    sourceEn: 'Sahih al-Bukhari, Hadith 3623–3624',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মানাকিব (নবুওয়তের নিদর্শনাবলি)',
        chapterEn: 'Book of Virtues',
        citationBn: 'হাদিস নং ৩৬২৩, ৩৬২৪, ৬২৮৫',
        citationEn: 'Hadith 3623, 3624, 6285',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        chapterBn: 'কিতাবু ফাদায়িলিস সাহাবাহ (ফাতিমা রা.-এর মর্যাদা)',
        chapterEn: 'Book of Virtues of the Companions',
        citationBn: 'হাদিস নং ২৪৫০',
        citationEn: 'Hadith 2450',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 20,
    partNo: 6,
    timeContextBn: 'শেষ দিন · সোমবার বেলা · হুজরায়ে আয়েশা (রা.)',
    timeContextEn: 'Final Day · Monday Mid-Morning · Aisha’s Chamber',
    titleBn: '‘আজকের পর আর কষ্ট নেই’',
    titleEn: '“After Today, Your Father Will Suffer No More”',
    pointsBn: [
      'মৃত্যুযন্ত্রণায় বারবার জ্ঞান হারাচ্ছিলেন; ফাতিমা (রা.) বললেন, ‘হায়, আমার বাবার কত কষ্ট!’',
      'নবীজি ﷺ বললেন, ‘আজকের পর তোমার বাবার আর কোনো কষ্ট নেই।’',
    ],
    pointsEn: [
      'As the pangs of death overcame him repeatedly, Fatimah (RA) cried: “Oh, the distress of my father!”',
      'The Prophet ﷺ comforted her: “Your father will have no more distress after this day.”',
    ],
    detailedNarrativeBn:
      'বেলা বাড়ার সাথে সাথে মৃত্যুযন্ত্রণা তীব্রতর হয়ে নবীজি ﷺ-কে আচ্ছন্ন করে ফেলছিল; তিনি বারবার অজ্ঞান হয়ে পড়ছিলেন। প্রিয় পিতার এই অসহনীয় কষ্ট দেখে কন্যা ফাতিমা (রা.) আর নিজেকে সামলাতে পারলেন না; হৃদয়বিদারক কণ্ঠে কেঁদে উঠলেন—‘ওয়া কারবা আবাহ!’ (হায়, আমার পিতার কী ভীষণ কষ্ট!)। তখন পরম মমতায় নবীজি ﷺ কন্যাকে সান্ত্বনা দিয়ে বললেন—“আজকের দিনের পর তোমার পিতার আর কোনো কষ্ট থাকবে না।”',
    detailedNarrativeEn:
      'As the severity of his final hours deepened, Fatimah (RA) watched her father endure waves of agony and cried out in grief over his suffering. Gently reassuring her, the Prophet ﷺ said that after this very day, no pain or hardship would ever touch him again.',
    extendedContextBn:
      'মুমিনের জন্য মৃত্যু হলো দুনিয়ার সমস্ত ক্লান্তি, রোগ-শোক ও পরীক্ষার চির-অবসান এবং আল্লাহর চিরন্তন রহমত ও প্রশান্তির জগতে প্রবেশ। নবীজি ﷺ-এর এই শান্ত সান্ত্বনাবাণী প্রতিটি মুমিন পরিবারকে বিদায়ের মুহূর্তে ধৈর্য ও আখিরাতের আশায় উজ্জীবিত করে।',
    extendedContextEn:
      'For the believer, passing away ends all earthly toil and opens the gate to eternal peace with Allah—a timeless comfort offered by the Prophet ﷺ even in his own final agony.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত ফাতিমা (রা.), হযরত আনাস (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Fatimah (RA), Anas (RA)',
    reflectionBn:
      'দুনিয়ার কষ্ট ক্ষণস্থায়ী; ঈমান ও আমলের সাথে বিদায় নিতে পারলে এর পর শুরু হয় চিরস্থায়ী শান্তি।',
    reflectionEn:
      'Earthly hardship is fleeting; departing in faith opens the door to everlasting tranquility.',
    arabicQuote: 'لَيْسَ عَلَى أَبِيكِ كَرْبٌ بَعْدَ اليَوْمِ',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৬২',
    sourceEn: 'Sahih al-Bukhari, Hadith 4462',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী (নবী ﷺ-এর অসুস্থতা ও ওফাত)',
        chapterEn: 'Book of Military Expeditions',
        citationBn: 'হাদিস নং ৪৪৬২',
        citationEn: 'Hadith 4462',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 21,
    partNo: 6,
    timeContextBn: 'শেষ দিন · সোমবার · শেষ অসিয়ত',
    timeContextEn: 'Final Day · Monday · Last Testament',
    titleBn: 'শেষ নসিহত: সালাত ও অধীনস্থরা',
    titleEn: 'Final Counsel: Prayer & Those Under Your Care',
    pointsBn: [
      'জীবনের শেষ মুহূর্তেও তিনি বারবার বলছিলেন—',
      '‘সালাত, সালাত! আর তোমাদের অধীনস্থদের ব্যাপারে আল্লাহকে ভয় করো।’',
    ],
    pointsEn: [
      'Even in his final moments, he repeated again and again:',
      '“The prayer, the prayer! And fear Allah concerning those under your care.”',
    ],
    detailedNarrativeBn:
      'যখন রাসূলুল্লাহ ﷺ-এর কণ্ঠস্বর ক্ষীণ হয়ে আসছিল এবং শ্বাস নিতে কষ্ট হচ্ছিল, সেই চূড়ান্ত বিদায়ের মুহূর্তেও তিনি সমগ্র উম্মতের উদ্দেশে দুটি মৌলিক হক বারবার স্মরণ করিয়ে দিচ্ছিলেন—“আস-সালাত, আস-সালাত! ওয়া মা মালাকাত আইমানুকুম” অর্থাৎ সালাতের হেফাজত করো, সালাতের হেফাজত করো; আর তোমাদের অধীনস্থ (দাস-দাসী, কর্মচারী ও দুর্বল মানুষদের) অধিকারের ব্যাপারে আল্লাহকে ভয় করো।',
    detailedNarrativeEn:
      'As his breath weakened in his final hours, the Prophet ﷺ kept repeating two essential pillars for his Ummah: guarding the daily prayers (Salah) and fearing Allah regarding the rights and gentle treatment of subordinates and dependents.',
    extendedContextBn:
      'উম্মে সালামা (রা.) ও আলী (রা.) বর্ণনা করেন—তাঁর জিহ্বা যখন আর স্পষ্টভাবে উচ্চারণ করতে পারছিল না, তখনো বুকের ভেতর থেকে এই অসিয়তই গুঞ্জরিত হচ্ছিল। এই দুটি উপদেশ ইসলামের সম্পূর্ণ সারমর্ম বহন করে: প্রথমটি আল্লাহর হক (হাক্কুল্লাহ—সালাত), আর দ্বিতীয়টি বান্দার হক (হাক্কুল ইবাদ—দুর্বল ও অধীনস্থদের প্রতি দয়া ও ন্যায়বিচার)।',
    extendedContextEn:
      'Ali (RA) and Umm Salamah (RA) recalled that these words echoed in his chest even as his voice faded—capturing the complete balance of Islam: devotion to Allah through prayer and mercy toward the vulnerable among humanity.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আলী (রা.), হযরত উম্মে সালামা (রা.), হযরত আনাস (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Ali (RA), Umm Salamah (RA), Anas (RA)',
    reflectionBn:
      'প্রিয় নবীর শেষ নিঃশ্বাসের দুটি অসিয়ত—নিয়মিত সালাত ও দুর্বলদের প্রতি ন্যায়বিচার—প্রতিটি মুমিনের জীবনব্রত হওয়া উচিত।',
    reflectionEn:
      'Honoring prayer and treating those in our care with justice are the Prophet’s parting trust to every believer.',
    arabicQuote: 'الصَّلَاةَ الصَّلَاةَ، وَمَا مَلَكَتْ أَيْمَانُكُمْ',
    sourceBn: 'সুনান ইবনে মাজাহ, হাদিস নং ২৬৯৮',
    sourceEn: 'Sunan Ibn Majah, Hadith 2698',
    references: [
      {
        bookBn: 'সুনান ইবনে মাজাহ',
        bookEn: 'Sunan Ibn Majah',
        chapterBn: 'কিতাবুল ওসায়া (অসিয়ত অধ্যায়)',
        chapterEn: 'Book of Bequests',
        citationBn: 'হাদিস নং ২৬৯৮, ১৬২৫',
        citationEn: 'Hadith 2698, 1625',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'সুনান আবু দাউদ ও মুসনাদে আহমাদ',
        bookEn: 'Sunan Abi Dawud & Musnad Ahmad',
        chapterBn: 'কিতাবুল আদব',
        chapterEn: 'Book of General Behavior',
        citationBn: 'আবু দাউদ: ৫১৫৬; আহমাদ: ২৬৭০৪',
        citationEn: 'Abi Dawud 5156; Ahmad 26704',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 22,
    partNo: 6,
    timeContextBn: 'শেষ দিন · সোমবার · তাওহীদ রক্ষার চূড়ান্ত সতর্কতা',
    timeContextEn: 'Final Day · Monday · Final Safeguard of Tawhid',
    titleBn: 'কবরকে সিজদার স্থান বানানো নিয়ে সতর্কতা',
    titleEn: 'Warning Against Turning Graves into Places of Worship',
    pointsBn: [
      'শেষ সময়ে কষ্টের মাঝেও তিনি উম্মতকে সতর্ক করেন।',
      'বলেন, ইহুদি-খ্রিষ্টানদের ওপর আল্লাহর লানত, তারা নবীদের কবরকে ইবাদতের স্থান বানিয়েছে।',
    ],
    pointsEn: [
      'Even amid intense agony at the end, he strongly warned his Ummah to safeguard pure monotheism.',
      'He said: “May Allah’s curse be upon the Jews and Christians, for they took the graves of their prophets as places of worship.”',
    ],
    detailedNarrativeBn:
      'মৃত্যুশয্যায় প্রচণ্ড কষ্টে রাসূলুল্লাহ ﷺ নিজের মুখমণ্ডলের ওপর একটি নকশাদার চাদর টেনে দিচ্ছিলেন, আবার শ্বাসকষ্ট হলে মুখ থেকে সেটি সরিয়ে দিচ্ছিলেন। এই চরম অবস্থার মধ্যেও উম্মতের তাওহীদ ও আকিদার বিশুদ্ধতা রক্ষায় তিনি দৃঢ় সতর্কতা উচ্চারণ করে বললেন—“ইহুদি ও খ্রিষ্টানদের ওপর আল্লাহর অভিসম্পাত—তারা তাদের নবীদের কবরগুলোকে সিজদা ও ইবাদতের স্থানে পরিণত করেছে।”',
    detailedNarrativeEn:
      'Drawing a patterned cloak over his face and removing it whenever breathing grew difficult, the Prophet ﷺ issued a stark warning to protect pure Tawhid: condemning the past practice of turning prophets’ graves into sanctuaries of worship.',
    extendedContextBn:
      'হযরত আয়েশা (রা.) ও ইবনে আব্বাস (রা.) স্পষ্টভাবে ব্যাখ্যা করেছেন—তিনি এই সতর্কতা উচ্চারণ করে নিজের উম্মতকে সতর্ক করছিলেন যেন তারাও তাঁর কবরকে সিজদা বা পূজার স্থানে পরিণত না করে। আয়েশা (রা.) বলেন, এ আশঙ্কা না থাকলে তাঁর কবর উন্মুক্ত রাখা হতো, কিন্তু তা যেন সিজদার স্থানে পরিণত না হয় সেজন্যই কবরটি ঘেরাও করে সংরক্ষণ করা হয়েছে।',
    extendedContextEn:
      'Aisha (RA) and Ibn Abbas (RA) explained that he was warning his own followers against repeating that deviation at his grave—which is precisely why his burial spot was kept enclosed rather than open as a prayer shrine.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আয়েশা (রা.), হযরত ইবনে আব্বাস (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Aisha (RA), Ibn Abbas (RA)',
    reflectionBn:
      'ইবাদত ও সিজদা একমাত্র মহান আল্লাহর জন্য—নবীজির ভালোবাসা প্রকাশের প্রকৃত পথ হলো তাঁর সুন্নাহর অনুসরণ, কবরপূজা নয়।',
    reflectionEn:
      'Worship belongs to Allah alone; true love for the Prophet ﷺ lives through following his Sunnah, never venerating graves.',
    arabicQuote: 'لَعْنَةُ اللَّهِ عَلَى اليَهُودِ وَالنَّصَارَى، اتَّخَذُوا قُبُورَ أَنْبِيَائِهِمْ مَسَاجِدَ',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৩৫–৪৩৬',
    sourceEn: 'Sahih al-Bukhari, Hadith 435–436',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুস সালাত ও কিতাবুল জানায়েয',
        chapterEn: 'Book of Prayer & Book of Funerals',
        citationBn: 'হাদিস নং ৪৩৫, ৪৩৬, ১৩৩০, ৪৪৪৩',
        citationEn: 'Hadith 435, 436, 1330, 4443',
        gradeBn: 'সহীহ (মুত্তাফাকুন আলাইহি)',
        gradeEn: 'Sahih (Agreed Upon)',
      },
      {
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        chapterBn: 'কিতাবুল মাসাজিদ',
        chapterEn: 'Book of Mosques',
        citationBn: 'হাদিস নং ৫৩১',
        citationEn: 'Hadith 531',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 23,
    partNo: 6,
    timeContextBn: 'শেষ দিন · সোমবার দুপুরের প্রাক্কালে',
    timeContextEn: 'Final Day · Monday Just Before Midday',
    titleBn: 'শেষ মিসওয়াক',
    titleEn: 'The Final Siwak',
    pointsBn: [
      'আয়েশা (রা.)-এর ভাই আবদুর রহমান (রা.) হাতে মিসওয়াক নিয়ে ঢুকলেন; নবীজি ﷺ সেদিকে তাকালেন।',
      'আয়েশা (রা.) সেটি চিবিয়ে নরম করে দিলেন, আর তিনি সুন্দরভাবে দাঁত মাজলেন।',
    ],
    pointsEn: [
      'Aisha’s brother Abdur-Rahman (RA) entered holding a green Siwak, and the Prophet ﷺ gazed intently at it.',
      'Aisha (RA) softened its tip with her teeth and handed it to him, and he cleansed his teeth thoroughly.',
    ],
    detailedNarrativeBn:
      'ইন্তেকালের মাত্র কিছু মুহূর্ত আগে হযরত আয়েশা (রা.)-এর ভাই আবদুর রহমান ইবনে আবু বকর (রা.) হাতে একটি তাজা সবুজ মিসওয়াক নিয়ে হুজরায় প্রবেশ করেন। নবীজি ﷺ তখন আয়েশা (রা.)-এর বুকে হেলান দিয়ে ছিলেন। তিনি গভীর আগ্রহ নিয়ে মিসওয়াকটির দিকে তাকালেন। আয়েশা (রা.) তাঁর প্রিয় স্বামীর ইচ্ছা মুহূর্তেই বুঝে জিজ্ঞেস করলেন—“আমি কি এটি আপনার জন্য নেব?” নবীজি ﷺ মাথা নেড়ে সম্মতি দিলেন।',
    detailedNarrativeEn:
      'Moments before his departure, Abdur-Rahman ibn Abi Bakr (RA) walked in carrying a fresh Siwak while the Prophet ﷺ rested against Aisha (RA). Seeing his intent gaze upon it, Aisha asked if he wished for it, and he nodded gently in assent.',
    extendedContextBn:
      'মিসওয়াকটি কিছুটা শক্ত ছিল দেখে আয়েশা (রা.) জিজ্ঞেস করলেন—“আমি কি এটি আপনার জন্য নরম করে দেব?” তিনি আবারও মাথা নেড়ে সায় দিলেন। আয়েশা (রা.) নিজের দাঁত দিয়ে সেটি চিবিয়ে নরম করে নবীজির হাতে তুলে দিলেন; আর নবীজি ﷺ এত সুন্দরভাবে মিসওয়াক করলেন যেন এর আগে কখনো এতটা যত্নে করেননি। আয়েশা (রা.) গর্বের সাথে বলতেন—এটি ছিল আল্লাহর বিশেষ অনুগ্রহ যে নবীজির দুনিয়ার শেষ দিনে তাঁর ও আমার লালা একত্রিত হয়েছিল।',
    extendedContextEn:
      'Softening the twig for him, Aisha (RA) marveled at how thoroughly he cleansed his teeth—later counting it among Allah’s greatest blessings upon her that her saliva mingled with his through that final Siwak as he prepared to meet his Lord in spotless purity.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আয়েশা (রা.), হযরত আবদুর রহমান ইবনে আবু বকর (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Aisha (RA), Abdur-Rahman ibn Abi Bakr (RA)',
    reflectionBn:
      'মহান আল্লাহর সাথে সাক্ষাতের মুহূর্তেও পরিচ্ছন্নতা ও মিসওয়াকের প্রতি এই যত্ন পবিত্রতার চূড়ান্ত আদর্শ।',
    reflectionEn:
      'Maintaining purity with the Siwak even in his final breath sets the supreme standard of cleanliness and dignity.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৪৯',
    sourceEn: 'Sahih al-Bukhari, Hadith 4449',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী (নবী ﷺ-এর অসুস্থতা ও ওফাত)',
        chapterEn: 'Book of Military Expeditions',
        citationBn: 'হাদিস নং ৪৪৪৯, ৪৪৩৮, ৮৯০',
        citationEn: 'Hadith 4449, 4438, 890',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 24,
    partNo: 6,
    timeContextBn: 'শেষ দিন · সোমবার দুপুর · অন্তিম মুহূর্ত',
    timeContextEn: 'Final Day · Monday Midday · Final Moments',
    titleBn: '‘মৃত্যুর যন্ত্রণা আছে’',
    titleEn: '“Indeed, Death Has Its Agonies”',
    pointsBn: [
      'পাশে রাখা পানির পাত্রে হাত ডুবিয়ে বারবার মুখমণ্ডল মুছছিলেন।',
      'আর বলছিলেন, ‘লা ইলাহা ইল্লাল্লাহ, নিশ্চয়ই মৃত্যুর যন্ত্রণা আছে।’',
    ],
    pointsEn: [
      'He dipped his blessed hand repeatedly into a vessel of water beside him and wiped his face.',
      'And he kept saying: “La ilaha illallah; indeed, death has its agonies.”',
    ],
    detailedNarrativeBn:
      'নবীজি ﷺ-এর সামনে চামড়া বা কাঠের একটি পাত্রে ঠাণ্ডা পানি রাখা ছিল। মৃত্যুযন্ত্রণা যখন চূড়ান্ত পর্যায়ে পৌঁছাল, তিনি বারবার সেই পানিতে নিজের হাত মোবারক ডুবিয়ে মুখমণ্ডল মুছছিলেন আর তাওহীদের কালিমা উচ্চারণ করে বলছিলেন—“লা ইলাহা ইল্লাল্লাহ! নিশ্চয়ই মৃত্যুর রয়েছে তীব্র যন্ত্রণা (সাকারাত)।”',
    detailedNarrativeEn:
      'A container of cool water sat beside him. As the final pangs of departure intensified, he kept dipping his hands into the water to cool his face while testifying: “There is no deity worthy of worship except Allah; indeed death has its agonies.”',
    extendedContextBn:
      'হযরত আয়েশা (রা.) পরবর্তীতে বলতেন—রাসূলুল্লাহ ﷺ-এর এই তীব্র মৃত্যুযন্ত্রণা স্বচক্ষে দেখার পর আমি আর কারও সহজ মৃত্যু দেখে হিংসা করি না। আলেমগণ ব্যাখ্যা করেন, নেককার ও নবীগণের মৃত্যুযন্ত্রণা কোনো শাস্তি নয়; বরং তা তাঁদের মর্যাদা আরও বহুগুণ বৃদ্ধি করার মাধ্যম।',
    extendedContextEn:
      'Aisha (RA) later remarked that after witnessing the intensity of the Prophet’s passing, she never envied anyone an easy death—for scholars explain that the pangs of death for the righteous serve solely to elevate their spiritual rank before Allah.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আয়েশা (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Aisha (RA)',
    reflectionBn:
      'অন্তিম মুহূর্তেও কালিমায়ে তাওহীদ ‘লা ইলাহা ইল্লাল্লাহ’ আঁকড়ে ধরাই মুমিনের পরম সৌভাগ্য।',
    reflectionEn:
      'Holding fast to “La ilaha illallah” in life’s final breath is the believer’s ultimate triumph.',
    arabicQuote: 'لَا إِلَهَ إِلَّا اللَّهُ، إِنَّ لِلْمَوْتِ سَكَرَاتٍ',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৪৯',
    sourceEn: 'Sahih al-Bukhari, Hadith 4449',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী ও কিতাবুর রিকাক',
        chapterEn: 'Book of Military Expeditions & Book of Heart-Softening Narrations',
        citationBn: 'হাদিস নং ৪৪৪৯, ৬৫১০',
        citationEn: 'Hadith 4449, 6510',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 25,
    partNo: 6,
    timeContextBn: 'শেষ দিন · সোমবার দুপুর · শেষ নিঃশ্বাস',
    timeContextEn: 'Final Day · Monday Midday · Final Breath',
    titleBn: 'শেষ কথা: আর-রাফীকুল আ‘লা',
    titleEn: 'Final Words: “Ar-Rafiq al-A‘la”',
    pointsBn: [
      'আয়েশা (রা.)-এর বুকে হেলান দিয়ে ছিলেন; দৃষ্টি ওপরের দিকে উঠল, হাত তুললেন।',
      'বললেন, ‘ফির-রাফীকিল আ‘লা’, সর্বোচ্চ বন্ধুর সান্নিধ্যে। এরপর তাঁর হাত নেমে এলো।',
    ],
    pointsEn: [
      'Resting against Aisha’s (RA) chest, his gaze rose upward and he lifted his hand.',
      'He whispered “Fir-Rafiqil A‘la” (With the Highest Companion)—and then his hand lowered gently.',
    ],
    detailedNarrativeBn:
      'মিসওয়াক করার পরপরই নবীজি ﷺ-এর পবিত্র দৃষ্টি ছাদের দিকে স্থির হয়ে উঠল। তিনি শাহাদাত আঙুল উঁচু করে দোয়া করলেন—“হে আল্লাহ, আমাকে ক্ষমা করুন, আমার প্রতি দয়া করুন এবং আমাকে সর্বোচ্চ বন্ধুর (আর-রাফীকুল আ‘লা) সাথে মিলিত করুন।” আয়েশা (রা.) শুনলেন তিনি ফিসফিস করে বলছেন—“নবী, সিদ্দীক, শহীদ ও সালিহীনদের সাথে... ফির-রাফীকিল আ‘লা।” এই শব্দগুলো উচ্চারণ করতেই তাঁর হাত মোবারক ধীরে ধীরে নুয়ে পড়ল এবং রূহ মোবারক পরম স্রষ্টার সান্নিধ্যে চলে গেল।',
    detailedNarrativeEn:
      'Immediately after the Siwak, the Prophet’s gaze fixed upward and he raised his hand, supplicating: “O Allah, forgive me, have mercy on me, and join me with the Highest Companion (Ar-Rafiq al-A‘la)—among the prophets, the truthful, the martyrs, and the righteous.” Then his hand came to rest gently.',
    extendedContextBn:
      'হযরত আয়েশা (রা.) স্মরণ করতেন—নবীজি ﷺ সুস্থ অবস্থায় বলেছিলেন যে কোনো নবীকেই জান্নাতে তাঁর অবস্থান দেখিয়ে দুনিয়া ও আখিরাতের এখতিয়ার না দিয়ে ইন্তেকাল করানো হয় না। তাই ‘আর-রাফীকুল আ‘লা’ শব্দটি শুনেই আয়েশা (রা.) বুঝে ফেলেন যে এবার নবীজি ﷺ আমাদের (দুনিয়া) নয়, বরং মহান আল্লাহকেই বেছে নিয়েছেন।',
    extendedContextEn:
      'Remembering the Prophet’s words that every prophet is shown his place in Paradise and given a choice before departing, Aisha (RA) knew the instant she heard “Ar-Rafiq al-A‘la” that he had chosen Allah over remaining in this world.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আয়েশা (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Aisha (RA)',
    reflectionBn:
      'মুমিনের সর্বোচ্চ কামনা দুনিয়ার দীর্ঘায়ু নয়, বরং আল্লাহর ক্ষমা, রহমত ও সর্বোচ্চ বন্ধুর সান্নিধ্য।',
    reflectionEn:
      'The believer’s highest longing is not worldly longevity, but Allah’s mercy and eternal nearness.',
    arabicQuote: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَأَلْحِقْنِي بِالرَّفِيقِ الأَعْلَى',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৪৯, ৪৪৩৮',
    sourceEn: 'Sahih al-Bukhari, Hadith 4449, 4438',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী (নবী ﷺ-এর ওফাত অধ্যায়)',
        chapterEn: 'Book of Military Expeditions',
        citationBn: 'হাদিস নং ৪৪৪৯, ৪৪৩৮, ৪৪৪০, ৪৪৬৩',
        citationEn: 'Hadith 4449, 4438, 4440, 4463',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 26,
    partNo: 6,
    timeContextBn: 'সোমবার · রবিউল আউয়াল ১১ হিজরি · বয়স ৬৩ বছর',
    timeContextEn: 'Monday · Rabi al-Awwal 11 AH · Age 63',
    titleBn: 'সোমবার, ৬৩ বছর বয়সে ইন্তেকাল',
    titleEn: 'Passing on Monday at the Age of Sixty-Three',
    pointsBn: [
      'নবীজি ﷺ ইন্তেকাল করেন সোমবার, ১১ হিজরির রবিউল আউয়াল মাসে।',
      'তখন তাঁর বয়স ছিল ৬৩ বছর। ইন্না লিল্লাহি ওয়া ইন্না ইলাইহি রাজিউন।',
    ],
    pointsEn: [
      'The Prophet ﷺ passed away on Monday in the month of Rabi al-Awwal, 11 AH.',
      'He was sixty-three years old. Inna lillahi wa inna ilayhi raji‘un.',
    ],
    detailedNarrativeBn:
      '১১ হিজরির রবিউল আউয়াল মাসের এক সোমবার দুপুরের দিকে (প্রসিদ্ধ মতে ১২ রবিউল আউয়াল) তেষট্টি বছর বয়সে রাহমাতুল্লিল আলামীন হযরত মুহাম্মাদ ﷺ দুনিয়া থেকে চিরবিদায় নেন। তাঁর নবুওয়তি জীবনের ২৩ বছরের মধ্যে ১৩ বছর কেটেছে মক্কায় দাওয়াত ও ধৈর্যের সংগ্রামে, আর ১০ বছর কেটেছে মদিনায় আদর্শ সমাজ ও উম্মাহ নির্মাণে।',
    detailedNarrativeEn:
      'On Monday in Rabi al-Awwal, 11 AH (widely dated to 12 Rabi al-Awwal), Prophet Muhammad ﷺ returned to his Lord at the age of sixty-three—completing forty years before revelation, thirteen years of patient calling in Makkah, and ten transformative years building the community of Madinah.',
    extendedContextBn:
      'সহীহ বুখারীর বর্ণনায় হযরত আবু বকর (রা.) ইন্তেকালের আগে কন্যা আয়েশা (রা.)-কে জিজ্ঞেস করেছিলেন—‘রাসূলুল্লাহ ﷺ কোন দিনে ইন্তেকাল করেছিলেন?’ আয়েশা (রা.) বলেছিলেন—‘সোমবার’। উল্লেখযোগ্য যে নবীজি ﷺ-এর জন্ম, প্রথম ওহি নাযিল, মদিনায় হিজরত এবং ইন্তেকাল—ইতিহাসের এই চারটি মহাঘটনাই সংঘটিত হয়েছিল সোমবার দিনে।',
    extendedContextEn:
      'In Sahih al-Bukhari, Abu Bakr (RA) asked Aisha (RA) on his own deathbed which day the Prophet ﷺ had passed away, and she confirmed it was Monday—the very same day of the week marking his birth, first revelation, and arrival in Madinah.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা মুনাওয়ারা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আয়েশা (রা.), হযরত আবু বকর (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Aisha (RA), Abu Bakr (RA)',
    reflectionBn:
      'তেষট্টি বছরের এক সংক্ষিপ্ত মানবজীবনে তিনি সমগ্র মানবজাতির জন্য কিয়ামত পর্যন্ত অক্ষয় হেদায়েতের আলো রেখে গেছেন।',
    reflectionEn:
      'In sixty-three blessed years, he left behind an inextinguishable beacon of guidance for humanity until the end of time.',
    arabicQuote: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১৩৮৭, ৩৫৩৬',
    sourceEn: 'Sahih al-Bukhari, Hadith 1387, 3536',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয ও কিতাবুল মানাকিব',
        chapterEn: 'Book of Funerals & Book of Virtues',
        citationBn: 'হাদিস নং ১৩৮৭ (সোমবার), ৩৫৩৬ ও ৪৪৬৬ (৬৩ বছর)',
        citationEn: 'Hadith 1387 (Monday), 3536 & 4466 (Age 63)',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },

  // =========================================================================
  // পর্ব ৭ · ইন্তেকালের পর (২৭ - ৩৫)
  // =========================================================================
  {
    no: 27,
    partNo: 7,
    timeContextBn: 'সোমবার দুপুর · মসজিদে নববী',
    timeContextEn: 'Monday Midday · Masjid an-Nabawi',
    titleBn: 'উমর (রা.)-এর শোক, আবু বকর (রা.)-এর ভাষণ',
    titleEn: 'Umar’s (RA) Grief & Abu Bakr’s (RA) Historic Address',
    pointsBn: [
      'শোকে বিহ্বল উমর (রা.) মেনে নিতে পারছিলেন না যে নবীজি ﷺ ইন্তেকাল করেছেন।',
      'আবু বকর (রা.) বললেন, যে মুহাম্মাদের ইবাদত করত, তিনি ইন্তেকাল করেছেন; আর আল্লাহ চিরঞ্জীব। তারপর পড়লেন আলে ইমরান: ১৪৪।',
    ],
    pointsEn: [
      'Overcome with grief, Umar (RA) could not accept that the Prophet ﷺ had passed away.',
      'Abu Bakr (RA) declared: “Whoever worshipped Muhammad, he has passed away; whoever worships Allah, Allah is Ever-Living”—and recited Surah Al-Imran 3:144.',
    ],
    detailedNarrativeBn:
      'ইন্তেকালের সংবাদ ছড়িয়ে পড়তেই শোকে দিশেহারা হযরত উমর (রা.) দাঁড়িয়ে ঘোষণা দিলেন—নবীজি ﷺ মারা যাননি, বরং মূসা (আ.)-এর মতো আবার ফিরে আসবেন। তখন আস-সুনহ থেকে ঘোড়া ছুটিয়ে এসে হযরত আবু বকর (রা.) হুজরায় ঢুকে নবীজির কপালে চুম্বন করলেন, এরপর মসজিদে বের হয়ে ইতিহাসের সবচেয়ে দৃঢ় ভাষণ দিলেন: “যে মুহাম্মাদ ﷺ-এর ইবাদত করত, সে জেনে রাখুক মুহাম্মাদ ﷺ ইন্তেকাল করেছেন; আর যে আল্লাহর ইবাদত করে, নিশ্চয়ই আল্লাহ চিরঞ্জীব, তিনি কখনো মরবেন না।”',
    detailedNarrativeEn:
      'When Umar (RA) insisted in heartbreak that the Prophet ﷺ had not died, Abu Bakr (RA) rode in from As-Sunh, kissed the Prophet’s forehead inside Aisha’s chamber, and stepped out to steady the entire Ummah with his immortal declaration of pure Tawhid.',
    extendedContextBn:
      'এরপর তিনি সূরা আলে ইমরানের ১৪৪ নং আয়াত তিলাওয়াত করলেন। আয়াতটি শোনামাত্রই উমর (রা.)-এর পা কাঁপতে শুরু করল এবং তিনি মাটিতে বসে পড়ে বাস্তবতা মেনে নিলেন। ইবনে আব্বাস (রা.) বলেন, যেন আবু বকর (রা.) তিলাওয়াত করার আগে মানুষ এই আয়াত জানতই না—পুরো মদিনার মানুষের মুখে মুখে তখন সেই আয়াত ধ্বনিত হচ্ছিল।',
    extendedContextEn:
      'Reciting Surah Al-Imran 3:144 immediately steadied the city; Umar’s knees gave way as reality settled in, and Ibn Abbas recalled that every soul in the streets of Madinah echoed the verse on their lips.',
    locationBn: 'মসজিদে নববী, মদিনা',
    locationEn: 'Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'হযরত আবু বকর (রা.), হযরত উমর (রা.), হযরত ইবনে আব্বাস (রা.)',
    keyFiguresEn: 'Abu Bakr (RA), Umar (RA), Ibn Abbas (RA)',
    reflectionBn:
      'চরম সংকটের মুহূর্তে কুরআনের আলো ও চিরঞ্জীব আল্লাহর ওপর অবিচল ঈমানই উম্মাহকে রক্ষা করে।',
    reflectionEn:
      'In moments of devastating loss, anchoring the heart in the Quran and the Ever-Living God preserves the Ummah.',
    arabicQuote: 'مَنْ كَانَ يَعْبُدُ مُحَمَّدًا فَإِنَّ مُحَمَّدًا قَدْ مَاتَ، وَمَنْ كَانَ يَعْبُدُ اللَّهَ فَإِنَّ اللَّهَ حَيٌّ لَا يَمُوتُ',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৬৭–৩৬৬৮',
    sourceEn: 'Sahih al-Bukhari, Hadith 3667–3668',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবু ফাদায়িলিস সাহাবাহ ও কিতাবুল মাগাযী',
        chapterEn: 'Book of Virtues of the Companions & Military Expeditions',
        citationBn: 'হাদিস নং ৩৬৬৭, ৩৬৬৮, ১২৪১, ৪৪৫৪',
        citationEn: 'Hadith 3667, 3668, 1241, 4454',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 28,
    partNo: 7,
    timeContextBn: 'সোমবার বিকেল ও মঙ্গলবার সকাল · সাকিফা ও মসজিদে নববী',
    timeContextEn: 'Monday Afternoon & Tuesday Morning · Saqifah & Mosque',
    titleBn: 'সাকিফায় খলিফা নির্বাচন',
    titleEn: 'Election of the First Caliph at Saqifah',
    pointsBn: [
      'আনসাররা সাকিফা বনু সাইদায় একত্র হলে আবু বকর, উমর ও আবু উবাইদা (রা.) সেখানে যান।',
      'আলোচনার পর সবাই আবু বকর (রা.)-এর হাতে বাইয়াত করেন; তিনি হন প্রথম খলিফা।',
    ],
    pointsEn: [
      'When the Ansar gathered at Saqifah Bani Sa‘idah, Abu Bakr, Umar, and Abu Ubaydah (RA) hastened there.',
      'Following sincere consultation, all pledged allegiance to Abu Bakr (RA), making him the first Caliph.',
    ],
    detailedNarrativeBn:
      'নেতৃত্বশূন্যতা ও বিভক্তি এড়াতে সোমবার বিকেলেই আনসার সাহাবিরা সাকিফা বনু সাইদায় সমবেত হন। খবর পেয়ে আবু বকর, উমর ও আবু উবাইদা (রা.) দ্রুত সেখানে পৌঁছান। প্রাজ্ঞ আবু বকর (রা.) আনসারদের অনন্য অবদানের প্রশংসা করে উম্মাহকে এক নেতৃত্বের অধীনে থাকার আহ্বান জানান—“আমরা আমির, আর তোমরা উজির (পরামর্শদাতা)।”',
    detailedNarrativeEn:
      'To prevent a dangerous leadership vacuum, the Ansar convened at Saqifah Bani Sa‘idah, joined quickly by Abu Bakr, Umar, and Abu Ubaydah (RA). Honoring the Ansar’s immense sacrifices, Abu Bakr appealed for one unified leadership supported by shared counsel.',
    extendedContextBn:
      'আবু বকর (রা.) নিজে পদ না চেয়ে উমর ও আবু উবাইদার নাম প্রস্তাব করলে উমর (রা.) দৃঢ়ভাবে বলেন—“আপনিই আমাদের নেতা, শ্রেষ্ঠ ও রাসূলুল্লাহ ﷺ-এর সর্বাধিক প্রিয়।” উমর (রা.) সর্বপ্রথম তাঁর হাতে বাইয়াত দেন, অতঃপর উপস্থিত সবাই এবং পরদিন মঙ্গলবার মসজিদে নববীতে সমগ্র মুসলিম জনতা সাধারণ বাইয়াত সম্পন্ন করে।',
    extendedContextEn:
      'When Abu Bakr modestly offered Umar or Abu Ubaydah instead, Umar insisted that Abu Bakr was the best among them and pledged first—followed by those at Saqifah and ratified publicly by the entire community in Masjid an-Nabawi on Tuesday morning.',
    locationBn: 'সাকিফা বনু সাইদা ও মসজিদে নববী, মদিনা',
    locationEn: 'Saqifah Bani Sa‘idah & Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'হযরত আবু বকর (রা.), হযরত উমর (রা.), হযরত আবু উবাইদা (রা.), আনসার ও মুহাজিরগণ',
    keyFiguresEn: 'Abu Bakr (RA), Umar (RA), Abu Ubaydah (RA), Ansar & Muhajirun',
    reflectionBn:
      'পরামর্শ (শূরা), পারস্পরিক সম্মান ও যোগ্যতমকে অগ্রাধিকার দেওয়ার মধ্য দিয়েই সাহাবিরা উম্মাহর ঐক্য রক্ষা করেছিলেন।',
    reflectionEn:
      'Through Shura, mutual honor, and selfless preference for the most qualified leader, the Companions preserved unity.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৬৬৮',
    sourceEn: 'Sahih al-Bukhari, Hadith 3668',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবু ফাদায়িলিস সাহাবাহ ও কিতাবুল আহকাম',
        chapterEn: 'Book of Virtues of the Companions & Book of Judgments',
        citationBn: 'হাদিস নং ৩৬৬৮, ৬৮৩০, ৭২১৯',
        citationEn: 'Hadith 3668, 6830, 7219',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 29,
    partNo: 7,
    timeContextBn: 'মঙ্গলবার · হুজরায়ে আয়েশা (রা.)',
    timeContextEn: 'Tuesday · Aisha’s (RA) Chamber',
    titleBn: 'জামাসহ গোসল',
    titleEn: 'Bathing the Prophet ﷺ in His Garment',
    pointsBn: [
      'সাহাবিরা ভাবছিলেন, অন্যদের মতো কাপড় খুলে গোসল দেবেন কি না।',
      'তখন ঘরের ভেতর থেকে এক আওয়াজ এলো: কাপড়সহ গোসল দাও। তাঁরা জামার ওপর দিয়েই পানি ঢেলে গোসল দেন।',
    ],
    pointsEn: [
      'The Companions wondered whether to remove his clothes as customary when washing the deceased.',
      'A voice spoke from inside the chamber: “Wash him with his shirt on.” So they poured water over his garment.',
    ],
    detailedNarrativeBn:
      'মঙ্গলবার গোসলের প্রস্তুতির সময় সাহাবিদের মধ্যে গভীর দ্বিধা দেখা দিল—অন্যান্য মৃত ব্যক্তির মতো কি নবীজি ﷺ-এর জামা খুলে গোসল দেওয়া হবে, নাকি জামা পরা অবস্থায়? ঠিক তখনই আল্লাহ উপস্থিত সবার ওপর প্রশান্ত তন্দ্রা নামিয়ে দেন এবং ঘরের এক কোণ থেকে অদৃশ্য আওয়াজ আসে: “তোমরা নবী ﷺ-কে তাঁর জামাসহই গোসল দাও।”',
    detailedNarrativeEn:
      'Uncertain whether to unclothe the Prophet ﷺ for his ritual bath, his family was overtaken by a sudden gentle slumber as an unseen voice from the corner of the room instructed them to wash him in his shirt.',
    extendedContextBn:
      'অতঃপর হযরত আলী (রা.), আব্বাস (রা.), ফজল ও কুসাম ইবনে আব্বাস (রা.), উসামা ইবনে যায়েদ (রা.) এবং শুকরান (রা.) জামার ওপর দিয়েই পবিত্র পানি ঢেলে ও হাত বুলিয়ে পরম আদবে গোসল সম্পন্ন করেন। আলী (রা.) আবেগে বলেছিলেন—‘আপনি জীবনেও পবিত্র, মরণেও পবিত্র ও সুবাসিত!’',
    extendedContextEn:
      'Ali, Al-Abbas, Al-Fadl, Qutham, Usamah, and Shuqran (RA) lovingly washed him through his shirt, marveling at the immaculate purity and fragrance of his blessed body.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'হযরত আলী (রা.), হযরত আব্বাস (রা.), ফজল ও কুসাম ইবনে আব্বাস (রা.), উসামা ইবনে যায়েদ (রা.)',
    keyFiguresEn: 'Ali (RA), Al-Abbas (RA), Al-Fadl & Qutham ibn Abbas (RA), Usamah ibn Zayd (RA)',
    reflectionBn:
      'ইন্তেকালের পরও মহান আল্লাহ তাঁর প্রিয় হাবীবের সম্ভ্রম ও মর্যাদা অলৌকিকভাবে রক্ষা করেছেন।',
    reflectionEn:
      'Even after passing, Allah miraculously honored and protected the modesty of His beloved Messenger ﷺ.',
    sourceBn: 'সুনান আবু দাউদ, হাদিস নং ৩১৪১',
    sourceEn: 'Sunan Abi Dawud, Hadith 3141',
    references: [
      {
        bookBn: 'সুনান আবু দাউদ',
        bookEn: 'Sunan Abi Dawud',
        chapterBn: 'কিতাবুল জানায়েয (নবী ﷺ-এর গোসল)',
        chapterEn: 'Book of Funerals',
        citationBn: 'হাদিস নং ৩১৪১, ৩২০৯',
        citationEn: 'Hadith 3141, 3209',
        gradeBn: 'হাসান / সহীহ',
        gradeEn: 'Hasan / Sahih',
      },
    ],
  },
  {
    no: 30,
    partNo: 7,
    timeContextBn: 'মঙ্গলবার · কাফন পরিধান',
    timeContextEn: 'Tuesday · Shrouding',
    titleBn: 'তিনটি সাদা কাপড়ে কাফন',
    titleEn: 'Shrouded in Three White Yemeni Cloths',
    pointsBn: [
      'তাঁকে কাফন দেওয়া হয় ইয়ামানের তিনটি সাদা সুতি কাপড়ে।',
      'তাতে কোনো জামা বা পাগড়ি ছিল না।',
    ],
    pointsEn: [
      'He was shrouded in three white cotton Yemeni cloths (Sahuli).',
      'There was neither a shirt nor a turban included.',
    ],
    detailedNarrativeBn:
      'গোসল সম্পন্ন হওয়ার পর রাসূলুল্লাহ ﷺ-কে ইয়ামানের ‘সাহুল’ অঞ্চলের তৈরি তিনটি সাদা সুতি কাপড়ে কাফন পরানো হয়। উম্মুল মুমিনীন আয়েশা (রা.) স্পষ্টভাবে বর্ণনা করেছেন যে এতে কোনো সেলাই করা জামা বা পাগড়ি ছিল না—সম্পূর্ণ সাদামাটা তিনটি সাদা চাদরেই তাঁকে আবৃত করা হয়।',
    detailedNarrativeEn:
      'Following his Ghusl, the Prophet ﷺ was wrapped in three plain white cotton sheets woven in Sahul, Yemen, with neither shirt nor turban—reflecting utter humility.',
    extendedContextBn:
      'সারা জীবন যিনি অনাড়ম্বরতা ও বিনয়ের শিক্ষা দিয়েছেন, তাঁর শেষ পোশাকও ছিল সেই সুন্নাহর মূর্ত প্রতীক। আজও সমগ্র বিশ্বের মুসলিম পুরুষদের কাফনের ক্ষেত্রে তিনটি সাদা কাপড়ের বিধান সরাসরি এই সহীহ হাদিসের অনুসরণ।',
    extendedContextEn:
      'This authentic narration established the timeless Sunnah of three plain white shrouds for Muslim men across the world.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'হযরত আয়েশা (রা.), আহলে বাইত',
    keyFiguresEn: 'Aisha (RA), Ahl al-Bayt',
    reflectionBn:
      'তিনটি সাদা কাপড়ের সাদামাটা কাফন আমাদের স্মরণ করিয়ে দেয়—আল্লাহর দরবারে সবার পরিচয় সমান।',
    reflectionEn:
      'Three simple white cloths remind us that every soul returns to Allah in complete humility and equality.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১২৬৪',
    sourceEn: 'Sahih al-Bukhari, Hadith 1264',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয (তিন কাপড়ে কাফন)',
        chapterEn: 'Book of Funerals',
        citationBn: 'হাদিস নং ১২৬৪, ১২৭১',
        citationEn: 'Hadith 1264, 1271',
        gradeBn: 'সহীহ (মুত্তাফাকুন আলাইহি)',
        gradeEn: 'Sahih (Agreed Upon)',
      },
      {
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        chapterBn: 'কিতাবুল জানায়েয',
        chapterEn: 'Book of Funerals',
        citationBn: 'হাদিস নং ৯৪১',
        citationEn: 'Hadith 941',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 31,
    partNo: 7,
    timeContextBn: 'মঙ্গলবার দুপুর থেকে রাত · হুজরায়ে আয়েশা (রা.)',
    timeContextEn: 'Tuesday Midday Through Night · Aisha’s Chamber',
    titleBn: 'দলে দলে জানাজা',
    titleEn: 'Funeral Prayers in Groups Without an Imam',
    pointsBn: [
      'বর্ণিত আছে, তাঁকে ঘরেই খাটে রাখা হয়; সাহাবিরা দলে দলে ঢুকে আলাদাভাবে জানাজা পড়েন।',
      'প্রথমে পুরুষ, তারপর নারী, তারপর শিশুরা; কেউ ইমামতি করেননি।',
    ],
    pointsEn: [
      'It is narrated that he lay on his bier inside the chamber while Companions entered in groups to pray individually.',
      'First came men, then women, then children—with no one leading as Imam.',
    ],
    detailedNarrativeBn:
      'কাফন শেষে নবীজি ﷺ-এর পবিত্র দেহ মোবারক হুজরাতেই খাটের ওপর রাখা হয়। মদিনার হাজার হাজার মানুষ যেন প্রত্যেকে সরাসরি প্রিয় নবীর সামনে দাঁড়িয়ে শেষ বিদায় ও জানাজা আদায় করতে পারেন, সেজন্য সাহাবিরা ছোট ছোট দলে প্রবেশ করতেন এবং কোনো ইমাম ছাড়াই প্রত্যেকে আলাদাভাবে জানাজার দোয়া ও সালাম পড়ে বের হয়ে যেতেন।',
    detailedNarrativeEn:
      'Remaining on his bier inside Aisha’s room, the Prophet ﷺ received unbroken groups of mourners from Tuesday afternoon into the night—men, then women, then children—each offering funeral prayers individually without a single Imam.',
    extendedContextBn:
      'সীরাত ও হাদিস গবেষকগণ উল্লেখ করেছেন যে ইবনে মাজাহর এই নির্দিষ্ট বর্ণনাটির সনদ দুর্বল হলেও ইমাম ছাড়া দলে দলে জানাজা আদায়ের বিষয়টি মুয়াত্তা ইমাম মালিক ও প্রসিদ্ধ সীরাত গ্রন্থসমূহে সর্বজনবিদিতভাবে বর্ণিত রয়েছে। এই দীর্ঘ জানাজার কারণেই দাফন মঙ্গলবার রাত তথা বুধবারের রাতে সম্পন্ন হয়।',
    extendedContextEn:
      'Scholars transparently note that while the specific chain in Sunan Ibn Majah (1628) is graded weak, the historical fact of group prayers without an Imam is widely attested in Imam Malik’s Muwatta and classical Seerah books, explaining why the burial took place late that night.',
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'মদিনার সমগ্র পুরুষ, নারী ও শিশু সাহাবায়ে কিরাম',
    keyFiguresEn: 'All men, women, and children of Madinah',
    reflectionBn:
      'সমগ্র উম্মতের হৃদয়ে প্রিয় নবীর প্রতি ভালোবাসা ছিল ব্যক্তিগত, গভীর ও অনন্য।',
    reflectionEn:
      'Every believer—man, woman, and child—stood face to face in personal devotion to bid their beloved Prophet ﷺ farewell.',
    sourceBn: 'সুনান ইবনে মাজাহ, হাদিস নং ১৬২৮ (সনদ দুর্বল)',
    sourceEn: 'Sunan Ibn Majah, Hadith 1628 (weak chain)',
    references: [
      {
        bookBn: 'সুনান ইবনে মাজাহ',
        bookEn: 'Sunan Ibn Majah',
        chapterBn: 'কিতাবুল জানায়েয (নবী ﷺ-এর জানাজা)',
        chapterEn: 'Book of Funerals',
        citationBn: 'হাদিস নং ১৬২৮',
        citationEn: 'Hadith 1628',
        gradeBn: 'সনদ দুর্বল — তানবীহ (মূল ঘটনা মুয়াত্তা ও সীরাতে প্রসিদ্ধ)',
        gradeEn: 'Weak chain (core account corroborated in Muwatta & Seerah)',
        isWeakNote: true,
      },
      {
        bookBn: 'মুয়াত্তা ইমাম মালিক ও ইবনে হিশাম',
        bookEn: 'Muwatta Imam Malik & Ibn Hisham',
        chapterBn: 'কিতাবুল জানায়েয',
        chapterEn: 'Book of Funerals',
        citationBn: 'মুয়াত্তা: ৫৫৫; ইবনে হিশাম: খণ্ড ২, পৃষ্ঠা ৬৬৩',
        citationEn: 'Muwatta 555; Ibn Hisham Vol. 2, p. 663',
        gradeBn: 'প্রসিদ্ধ সীরাত সূত্র',
        gradeEn: 'Classical Seerah Source',
      },
    ],
  },
  {
    no: 32,
    partNo: 7,
    timeContextBn: 'মঙ্গলবার ও বুধবারের রাত · হুজরায়ে আয়েশা (রা.)',
    timeContextEn: 'Tuesday & Wednesday Night · Aisha’s Chamber',
    titleBn: 'যেখানে ইন্তেকাল, সেখানেই দাফন',
    titleEn: 'Buried in the Exact Spot Where He Passed Away',
    pointsBn: [
      'কোথায় দাফন হবে, এ নিয়ে মতভেদ দেখা দিলে আবু বকর (রা.) একটি হাদিস শোনান।',
      'আল্লাহ প্রত্যেক নবীর রূহ সেখানেই কবজ করেন, যেখানে তাঁকে দাফন করা পছন্দ করেন। তাই তাঁর বিছানার জায়গাতেই কবর দেওয়া হয়।',
    ],
    pointsEn: [
      'When differing views arose over his burial site, Abu Bakr (RA) shared a Hadith from the Prophet ﷺ.',
      '“Allah takes every prophet’s soul in the very spot He loves for him to be buried.” So his grave was dug beneath his bed.',
    ],
    detailedNarrativeBn:
      'দাফনের স্থান নির্ধারণ নিয়ে সাহাবিদের মধ্যে কেউ মসজিদে নববীতে, কেউ জান্নাতুল বাকীতে দাফনের প্রস্তাব করেন। তখন হযরত আবু বকর (রা.) রাসূলুল্লাহ ﷺ থেকে সরাসরি শোনা হাদিস বর্ণনা করলেন—“কোনো নবী ইন্তেকাল করলে তাঁকে ঠিক সেই স্থানেই দাফন করা হয়, যেখানে তাঁর রূহ কবজ করা হয়েছে।”',
    detailedNarrativeEn:
      'As Companions debated between Masjid an-Nabawi and Al-Baqi cemetery, Abu Bakr (RA) resolved all uncertainty by citing the Prophet’s words that every prophet is buried in the precise place where his soul departs.',
    extendedContextBn:
      'এই হাদিস শোনামাত্রই সব মতভেদ দূর হয়ে যায়। হযরত আবু তালহা আনসারী (রা.) আয়েশা (রা.)-এর হুজরায় নবীজির বিছানা সরিয়ে ‘লাহাদ’ পদ্ধতিতে কবর খনন করেন এবং বুধবারের রাতে (মঙ্গলবার দিবাগত রাত) পরম শ্রদ্ধার সাথে তাঁকে সেখানে দাফন করা হয়—যা আজ সমগ্র মুসলিম উম্মাহর প্রাণকেন্দ্র ‘রওজায়ে আতহার’।',
    extendedContextEn:
      'Immediately, Abu Talhah al-Ansari (RA) prepared a Lahd grave directly beneath the Prophet’s bed inside Aisha’s room, where he was laid to rest in the quiet of Wednesday night—today revered as Al-Rawdah Ash-Sharifah.',
    locationBn: 'হুজরায়ে আয়েশা (রা.) / রওজায়ে আতহার, মদিনা',
    locationEn: 'Aisha’s (RA) Chamber / Al-Rawdah Ash-Sharifah, Madinah',
    keyFiguresBn: 'হযরত আবু বকর (রা.), হযরত আবু তালহা (রা.), হযরত আলী (রা.) ও আহলে বাইত',
    keyFiguresEn: 'Abu Bakr (RA), Abu Talhah (RA), Ali (RA) & Ahl al-Bayt',
    reflectionBn:
      'সহীহ হাদিসের অনুসরণই সব মতভেদ নিরসনের সর্বোত্তম ও শান্তিপূর্ণ পথ।',
    reflectionEn:
      'Authentic prophetic guidance instantly replaces confusion with peace and consensus.',
    sourceBn: 'জামে আত-তিরমিযী, হাদিস নং ১০১৮',
    sourceEn: 'Jami‘ at-Tirmidhi, Hadith 1018',
    references: [
      {
        bookBn: 'জামে আত-তিরমিযী',
        bookEn: 'Jami‘ at-Tirmidhi',
        chapterBn: 'কিতাবুল জানায়েয (নবী ﷺ-এর দাফন স্থান)',
        chapterEn: 'Book of Funerals',
        citationBn: 'হাদিস নং ১০১৮',
        citationEn: 'Hadith 1018',
        gradeBn: 'সহীহ (সমর্থিত সনদে)',
        gradeEn: 'Sahih (Corroborated)',
      },
      {
        bookBn: 'মুসনাদে আহমাদ',
        bookEn: 'Musnad Ahmad',
        chapterBn: 'মুসনাদে আয়েশা (রা.) — বুধবার রাতে দাফন',
        chapterEn: 'Musnad of Aisha (RA)',
        citationBn: 'হাদিস নং ২৪৭৯০',
        citationEn: 'Hadith 24790',
        gradeBn: 'হাসান / সহীহ',
        gradeEn: 'Hasan / Sahih',
      },
    ],
  },
  {
    no: 33,
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
      'After the burial, Fatimah (RA) asked Anas ibn Malik (RA):',
      '“O Anas! How could your hearts bear to pour soil over the Messenger of Allah ﷺ?”',
    ],
    detailedNarrativeBn:
      'দাফন শেষে ভারী পায়ে সাহাবিরা যখন ফিরে এলেন, তখন পিতৃশোকে কাতর হযরত ফাতিমা (রা.) নবীজির দীর্ঘদিনের খাদেম হযরত আনাস (রা.)-এর দিকে তাকিয়ে অশ্রুভেজা কণ্ঠে প্রশ্ন করলেন—“হে আনাস! রাসূলুল্লাহ ﷺ-এর পবিত্র দেহ মোবারকের ওপর মাটি ঢালতে তোমাদের মন কীভাবে সায় দিল?”',
    detailedNarrativeEn:
      'When the Companions returned from the burial, the heartbroken Fatimah (RA) turned to Anas ibn Malik (RA) and asked through tears how their souls could ever bear to cast earth over the Messenger of Allah ﷺ.',
    extendedContextBn:
      'আনাস (রা.) কোনো জবাব দিতে পারলেন না—সবার বুক তখন নীরব কান্নায় ভারী। ফাতিমা (রা.) পিতার বিচ্ছেদে আবৃত্তি করেছিলেন হৃদয়বিদারক শোকগাথা, আর মাত্র ছয় মাস পরেই রমজান মাসে তিনিও প্রিয় পিতার সান্নিধ্যে চলে যান।',
    extendedContextEn:
      'Anas stood speechless in tears. Fatimah’s poignant question captured the grief of an entire nation, and just six months later she reunited with her beloved father.',
    locationBn: 'মদিনা মুনাওয়ারা',
    locationEn: 'Madinah',
    keyFiguresBn: 'হযরত ফাতিমা আয-যাহরা (রা.), হযরত আনাস ইবনে মালিক (রা.)',
    keyFiguresEn: 'Fatimah az-Zahra (RA), Anas ibn Malik (RA)',
    reflectionBn:
      'পিতা-কন্যার এই অশ্রুভেজা বিচ্ছেদ নবীজি ﷺ-এর প্রতি ভালোবাসার গভীরতম প্রকাশ।',
    reflectionEn:
      'Fatimah’s sorrow reflects the profound bond of love that bound the Prophet’s family and Companions to him.',
    arabicQuote: 'يَا أَنَسُ أَطَابَتْ أَنْفُسُكُمْ أَنْ تَحْثُوا عَلَى رَسُولِ اللَّهِ ﷺ التُّرَابَ؟',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪৬২',
    sourceEn: 'Sahih al-Bukhari, Hadith 4462',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী (নবী ﷺ-এর ওফাত)',
        chapterEn: 'Book of Military Expeditions',
        citationBn: 'হাদিস নং ৪৪৬২',
        citationEn: 'Hadith 4462',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 34,
    partNo: 7,
    timeContextBn: 'দাফনের পর · আনাস (রা.)-এর স্মৃতিচারণ',
    timeContextEn: 'After Burial · Testimony of Anas (RA)',
    titleBn: 'মদিনা যেন অন্ধকার',
    titleEn: 'Madinah Grew Dark Without Him',
    pointsBn: [
      'আনাস (রা.) বলেন, যেদিন নবীজি ﷺ মদিনায় এসেছিলেন, সেদিন সবকিছু আলোকিত হয়েছিল।',
      'আর যেদিন তিনি ইন্তেকাল করেন, সেদিন সবকিছু অন্ধকার হয়ে গিয়েছিল।',
    ],
    pointsEn: [
      'Anas (RA) said: “On the day the Prophet ﷺ entered Madinah, everything in it illuminated.”',
      '“And on the day he passed away, everything in it darkened.”',
    ],
    detailedNarrativeBn:
      'দশ বছর ধরে নবীজি ﷺ-এর ছায়াসঙ্গী হয়ে থাকা হযরত আনাস ইবনে মালিক (রা.) বলেন—“যেদিন রাসূলুল্লাহ ﷺ হিজরত করে মদিনায় প্রবেশ করেছিলেন, সেদিন মদিনার প্রতিটি জিনিস আলোয় উদ্ভাসিত হয়ে উঠেছিল। আর যেদিন তিনি ইন্তেকাল করলেন, সেদিন মদিনার প্রতিটি জিনিস যেন আঁধারে ঢেকে গেল।”',
    detailedNarrativeEn:
      'Anas ibn Malik (RA), who served the Prophet ﷺ for a decade, contrasted the two defining days of Madinah: the radiance of his arrival at Hijrah and the sudden darkness that fell across every corner of the city on the day of his passing.',
    extendedContextBn:
      'তিনি আরও যোগ করেন—“তাঁকে দাফন করে আমাদের হাত থেকে কবরের মাটি ঝাড়ার আগেই আমরা নিজেদের অন্তরের অবস্থায় এক গভীর শূন্যতা ও পরিবর্তন অনুভব করেছিলাম।” প্রিয় নবীর সান্নিধ্য ছিল সাহাবিদের হৃদয়ের বসন্ত।',
    extendedContextEn:
      'He added that before they had even brushed the burial soil from their hands, they sensed an unmistakable change and void within their own hearts.',
    locationBn: 'মদিনা মুনাওয়ারা',
    locationEn: 'Al-Madinah al-Munawwarah',
    keyFiguresBn: 'হযরত আনাস ইবনে মালিক (রা.)',
    keyFiguresEn: 'Anas ibn Malik (RA)',
    reflectionBn:
      'রাসূলুল্লাহ ﷺ-এর সীরাত ও সুন্নাহকে জীবনে ধারণ করাই আজ আমাদের হৃদয়কে আলোকিত রাখার একমাত্র পথ।',
    reflectionEn:
      'Reviving the Prophet’s Sunnah and character keeps his spiritual light shining in our hearts today.',
    sourceBn: 'জামে আত-তিরমিযী, হাদিস নং ৩৬১৮',
    sourceEn: 'Jami‘ at-Tirmidhi, Hadith 3618',
    references: [
      {
        bookBn: 'জামে আত-তিরমিযী',
        bookEn: 'Jami‘ at-Tirmidhi',
        chapterBn: 'কিতাবুল মানাকিব (নবী ﷺ-এর মর্যাদা)',
        chapterEn: 'Book of Virtues',
        citationBn: 'হাদিস নং ৩৬১৮',
        citationEn: 'Hadith 3618',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'সুনান ইবনে মাজাহ ও মুসনাদে আহমাদ',
        bookEn: 'Sunan Ibn Majah & Musnad Ahmad',
        chapterBn: 'কিতাবুল জানায়েয',
        chapterEn: 'Book of Funerals',
        citationBn: 'ইবনে মাজাহ: ১৬৩১; আহমাদ: ১৩৩৮৭',
        citationEn: 'Ibn Majah 1631; Ahmad 13387',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 35,
    partNo: 7,
    timeContextBn: 'দাফনের পর · উম্মে আইমান (রা.)-এর গৃহ',
    timeContextEn: 'After Burial · Home of Umm Ayman (RA)',
    titleBn: 'উম্মে আইমান (রা.)-এর কান্না',
    titleEn: 'The Tears of Umm Ayman (RA)',
    pointsBn: [
      'ইন্তেকালের পর আবু বকর ও উমর (রা.) উম্মে আইমান (রা.)-কে দেখতে গেলে তিনি কাঁদছিলেন।',
      'বললেন, আমি জানি আল্লাহর কাছে যা আছে তা তাঁর জন্য উত্তম; আমি কাঁদছি কারণ আসমান থেকে ওহি আসা বন্ধ হয়ে গেল। শুনে দুজনও কেঁদে ফেললেন।',
    ],
    pointsEn: [
      'After the passing, Abu Bakr and Umar (RA) visited Umm Ayman (RA) and found her weeping.',
      'She said: “I know what is with Allah is better for him; I weep because revelation from heaven has ceased.” Hearing this, both of them wept with her.',
    ],
    detailedNarrativeBn:
      'নবীজি ﷺ-এর ইন্তেকালের পর তাঁর সুন্নাহ জীবিত রাখতে খলিফা আবু বকর (রা.) ও উমর (রা.) নবীজির শৈশবের স্নেহময়ী পালিকা উম্মে আইমান (রা.)-কে দেখতে যান। তাঁদের দেখেই তিনি অশ্রুতে ভেঙে পড়েন। তাঁরা সান্ত্বনা দিয়ে বললেন—আল্লাহর কাছে যা আছে তা তো রাসূলুল্লাহ ﷺ-এর জন্য অনেক উত্তম! তখন তিনি বললেন—“আমি এজন্য কাঁদছি না; বরং আমি কাঁদছি কারণ আজ থেকে আসমান থেকে ওহি আসা চিরতরে বন্ধ হয়ে গেল।”',
    detailedNarrativeEn:
      'Following the Prophet’s custom of visiting his beloved childhood caretaker Umm Ayman (RA), Abu Bakr and Umar (RA) found her weeping. When they reminded her that what awaits the Prophet with Allah is far better, she replied that she wept because divine revelation from heaven had ceased forever.',
    extendedContextBn:
      'উম্মে আইমান (রা.)-এর এই গভীর ঈমানি উপলব্ধি শুনে আবু বকর ও উমর (রা.)-এর হৃদয়েও শোক উথলে উঠল এবং তাঁরা দুজনও তাঁর সাথে অঝোরে কাঁদতে লাগলেন। ওহির প্রত্যক্ষ অবতরণ থেমে গেলেও মহান আল্লাহ কুরআন ও সুন্নাহকে কিয়ামত পর্যন্ত অবিকৃত হেদায়েত হিসেবে সংরক্ষণ করেছেন।',
    extendedContextEn:
      'Her profound words unlocked deep tears in both Abu Bakr and Umar (RA). Though new revelation ended, the completed Quran and preserved Sunnah endure as living guidance until the Day of Judgment.',
    locationBn: 'হযরত উম্মে আইমান (রা.)-এর গৃহ, মদিনা',
    locationEn: 'Home of Umm Ayman (RA), Madinah',
    keyFiguresBn: 'হযরত উম্মে আইমান (রা.), হযরত আবু বকর (রা.), হযরত উমর (রা.)',
    keyFiguresEn: 'Umm Ayman (RA), Abu Bakr (RA), Umar (RA)',
    reflectionBn:
      'ওহির মর্ম অনুধাবন ও কুরআন-সুন্নাহর সাথে জীবন্ত সম্পর্কই উম্মতের সবচেয়ে বড় সম্পদ।',
    reflectionEn:
      'Cherishing the preserved revelation of Quran and Sunnah remains the Ummah’s greatest spiritual treasure.',
    sourceBn: 'সহীহ মুসলিম, হাদিস নং ২৪৫৪',
    sourceEn: 'Sahih Muslim, Hadith 2454',
    references: [
      {
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        chapterBn: 'কিতাবু ফাদায়িলিস সাহাবাহ (উম্মে আইমান রা.-এর মর্যাদা)',
        chapterEn: 'Book of Virtues of the Companions',
        citationBn: 'হাদিস নং ২৪৫৪',
        citationEn: 'Hadith 2454',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
];

/**
 * Age-wise verified events (Age 63 — Final Year & Last 10 Days)
 * Ready to merge seamlessly into Seerat-un-Nabi Age 63 chapter alongside existing events.
 */
export const LAST_10_DAYS_AGE_VERIFIED_EVENTS: SeeratVerifiedEvent[] = LAST_10_DAYS_EVENTS.map(
  (ev) => {
    const part = LAST_10_DAYS_PARTS.find((p) => p.partNo === ev.partNo)!;
    return {
      slideNo: 100 + ev.no, // 101..135 — distinct from existing 1..50
      age: 63,
      partNo: 4,
      partLabelBn: `শেষ ১০ দিন · ${part.titleBn}`,
      partLabelEn: `Last 10 Days · ${part.titleEn}`,
      titleBn: ev.titleBn,
      titleEn: ev.titleEn,
      pointsBn: ev.pointsBn,
      pointsEn: ev.pointsEn,
      sourceBn: ev.sourceBn,
      sourceEn: ev.sourceEn,
    };
  }
);
