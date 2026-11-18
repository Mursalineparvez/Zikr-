/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HadithReferenceItem {
  bookBn: string;
  bookEn: string;
  chapterBn: string;
  chapterEn: string;
  citationBn: string;
  citationEn: string;
  gradeBn: string;
  gradeEn: string;
  isWeakNote?: boolean;
}

export interface Passing40ExtendedDetail {
  locationBn: string;
  locationEn: string;
  keyFiguresBn: string;
  keyFiguresEn: string;
  extendedContextBn: string;
  extendedContextEn: string;
  references: HadithReferenceItem[];
}

export interface SeeratSpecialCollectionMeta {
  id: 'prophet-40-hours';
  volumeNoBn: string;
  volumeNoEn: string;
  titleBn: string;
  titleEn: string;
  arabicTitle: string;
  eraLabelBn: string;
  eraLabelEn: string;
  summaryBn: string;
  summaryEn: string;
  partsCount: number;
  eventsCount: number;
  durationBn: string;
  durationEn: string;
  primarySourcesBn: string;
  primarySourcesEn: string;
}

/**
 * Scalable Registry for Special Seerah Historical Collections.
 * New themed collections with different titles can be appended here effortlessly.
 */
export const SEERAT_SPECIAL_COLLECTIONS: SeeratSpecialCollectionMeta[] = [
  {
    id: 'prophet-40-hours',
    volumeNoBn: 'সংকলন ০১',
    volumeNoEn: 'Collection 01',
    titleBn: 'রাসূলুল্লাহ ﷺ-এর ইন্তেকালের পরের ৪০ ঘণ্টা',
    titleEn: '40 Hours After the Passing of Prophet Muhammad ﷺ',
    arabicTitle: 'الأربعون ساعة بعد وفاة النبي ﷺ',
    eraLabelBn: '১১ হিজরি · ১২–১৪ রবিউল আউয়াল',
    eraLabelEn: '11 AH · 12–14 Rabi al-Awwal',
    summaryBn:
      'সোমবার দুপুরে আয়েশা (রা.)-এর হুজরায় প্রিয় নবীর শেষ বিদায় থেকে শুরু করে আবু বকর (রা.)-এর অবিচল ভাষণ, সাকিফা বনু সাইদায় খিলাফত পরামর্শ, সাধারণ বাইয়াত, জামাসহ গোসল, দলে দলে জানাজা ও বুধবার রাতে রওজা শরিফে পবিত্র দাফন পর্যন্ত ৭টি পর্বে ৩২টি প্রামাণ্য ঘটনার পূর্ণাঙ্গ ঐতিহাসিক দলিল।',
    summaryEn:
      'A complete chronological chronicle of 32 verified events across 7 parts—from the Prophet’s ﷺ final moments in Aisha’s (RA) chamber on Monday midday through Abu Bakr’s historic address, Saqifah, the general pledge, his Ghusl, funeral prayers, and sacred burial on Wednesday night.',
    partsCount: 7,
    eventsCount: 32,
    durationBn: 'প্রায় ৩৬–৪০ ঘণ্টা',
    durationEn: '~36–40 Hours',
    primarySourcesBn: 'সহীহ বুখারী, সহীহ মুসলিম, সুনান আবু দাউদ, তিরমিযী, ইবনে মাজাহ, মুসনাদে আহমাদ ও ইবনে হিশাম',
    primarySourcesEn: 'Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, at-Tirmidhi, Ibn Majah, Musnad Ahmad & Ibn Hisham',
  },
];

export const PASSING_40_EXTENDED: Record<number, Passing40ExtendedDetail> = {
  1: {
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মসজিদে নববী সংলগ্ন, মদিনা',
    locationEn: 'Chamber of Aisha (RA), adjacent to Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত আয়েশা (রা.), হযরত আবদুর রহমান ইবনে আবু বকর (রা.)',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Aisha (RA), Abdur-Rahman ibn Abi Bakr (RA)',
    extendedContextBn:
      'ইন্তেকালের সামান্য আগে হযরত আবদুর রহমান ইবনে আবু বকর (রা.) হাতে একটি তাজা মিসওয়াক নিয়ে হুজরায় প্রবেশ করেন। নবীজি ﷺ অপলক দৃষ্টিতে সেটির দিকে তাকালে আয়েশা (রা.) বুঝতে পারলেন তিনি মিসওয়াক করতে চান। আয়েশা (রা.) নিজে দাঁত দিয়ে তা চিবিয়ে নরম করে নবীজির হাতে তুলে দিলেন এবং নবীজি ﷺ অত্যন্ত সুন্দরভাবে মিসওয়াক করলেন। এরপর পাশে রাখা পানির পাত্রে হাত ডুবিয়ে মুখমণ্ডল মুছতে মুছতে বললেন—‘লা ইলাহা ইল্লাল্লাহ, নিশ্চয়ই মৃত্যুর রয়েছে তীব্র যন্ত্রণা।’ অতঃপর শাহাদাত আঙুল উঁচু করে ‘ফির-রাফীকিল আ‘লা’ উচ্চারণ করতে করতেই তাঁর রূহ মোবারক পরম স্রষ্টার সান্নিধ্যে চলে যায়।',
    extendedContextEn:
      'Moments before his passing, Abdur-Rahman ibn Abi Bakr (RA) entered holding a fresh Siwak. Noticing the Prophet’s gaze upon it, Aisha (RA) softened it for him and he cleansed his teeth with remarkable care. Dipping his hand in a nearby vessel of water and wiping his face, he said, “La ilaha illallah; indeed death has its agonies,” then lifted his finger toward the heavens saying “Ar-Rafiq al-A‘la” until his hand rested gently.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী (নবী ﷺ-এর অসুস্থতা ও ওফাত)',
        chapterEn: 'Book of Military Expeditions (Illness & Passing of the Prophet)',
        citationBn: 'হাদিস নং ৪৪৪৯, ৪৪৪০, ৪৪৫০',
        citationEn: 'Hadith 4449, 4440, 4450',
        gradeBn: 'সহীহ (সর্বোচ্চ বিশুদ্ধ)',
        gradeEn: 'Sahih (Authentic)',
      },
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয ও কিতাবুল মানাকিব',
        chapterEn: 'Book of Funerals & Book of Virtues',
        citationBn: 'হাদিস নং ১৩৮৭ (সোমবার ইন্তেকাল), ৩৫৩৬ (বয়স ৬৩ বছর)',
        citationEn: 'Hadith 1387 (Monday passing), 3536 (Age 63)',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  2: {
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা মুনাওয়ারা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'হযরত আয়েশা (রা.), আহলে বাইত ও নিকটবর্তী সাহাবিগণ',
    keyFiguresEn: 'Aisha (RA), Ahl al-Bayt & close Companions',
    extendedContextBn:
      'হুজরাটি ছিল খেজুরের পাতা ও কাঁচা মাটির দেয়ালে নির্মিত অতি সাধারণ একটি কক্ষ, যার দরজা সরাসরি মসজিদে নববীর প্রাঙ্গণের দিকে উন্মুক্ত ছিল। ইয়েমেনের তৈরি ‘বুরদ হিবারা’ নামক ডোরাকাটা চাদর দিয়ে নবীজি ﷺ-এর পবিত্র দেহ সম্পূর্ণ ঢেকে রাখা হয়। এই চাদরের নিচেই নবীজি ﷺ শান্ত হয়ে শায়িত ছিলেন, আর বাইরে মসজিদে নববীতে মুহূর্তের মধ্যে শোকের ঢেউ আছড়ে পড়ছিল।',
    extendedContextEn:
      'The chamber was a humble mud-brick room whose doorway opened directly onto the courtyard of Al-Masjid an-Nabawi. Covering him entirely with the striped Yemeni Burd Hibarah preserved utmost reverence and serenity inside the room while shock swept through the mosque outside.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয (মৃত ব্যক্তির ওপর চাদর ঢেকে দেওয়া)',
        chapterEn: 'Book of Funerals (Covering the Deceased)',
        citationBn: 'হাদিস নং ১২৪১, ৫৮১৪',
        citationEn: 'Hadith 1241, 5814',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  3: {
    locationBn: 'মসজিদে নববী, মদিনা মুনাওয়ারা',
    locationEn: 'Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'হযরত উমর ইবনুল খাত্তাব (রা.), উপস্থিত সাহাবায়ে কিরাম',
    keyFiguresEn: 'Umar ibn al-Khattab (RA) & gathered Companions',
    extendedContextBn:
      'হযরত উমর (রা.) ছিলেন অসীম সাহসী ও দৃঢ়চেতা মানুষ, কিন্তু নবীজি ﷺ-এর বিচ্ছেদবেদনা তাঁকে সম্পূর্ণ বিহ্বল করে তুলেছিল। তিনি ভাবছিলেন যে নবীজি ﷺ যেমন উম্মতের শেষ পর্যন্ত পথপ্রদর্শক, তেমনি আল্লাহ হয়তো তাঁকে কিছু সময়ের জন্য রবের সান্নিধ্যে নিয়ে গেছেন এবং আবার ফিরিয়ে দেবেন, যেমন মূসা (আ.) তূর পর্বতে চল্লিশ রাত কাটিয়ে ফিরে এসেছিলেন। পরে উমর (রা.) নিজেই স্বীকার করেছেন যে প্রবল শোকে তাঁর অন্তরে তখন অন্য কোনো ভাবনাই আসছিল না।',
    extendedContextEn:
      'Normally unmatched in resolve, Umar (RA) was shaken to his core by grief. He persuaded himself that the Prophet ﷺ had been called to his Lord temporarily like Prophet Musa (AS) at Mount Sinai and would return to address the hypocrites—a testimony he later candidly recounted as a moment of overwhelming sorrow.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবু ফাদায়িলি আসহাবিন নবী ﷺ',
        chapterEn: 'Book of the Virtues of the Companions',
        citationBn: 'হাদিস নং ৩৬৬৭, ৩৬৬৮',
        citationEn: 'Hadith 3667, 3668',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  4: {
    locationBn: 'আস-সুনহ (মদিনার পূর্ব-দক্ষিণ উঁচু বসতি এলাকা)',
    locationEn: 'As-Sunh (Upper eastern outskirts of Madinah)',
    keyFiguresBn: 'হযরত আবু বকর সিদ্দীক (রা.), হযরত হাবীবা বিনতে খারিজা (রা.)',
    keyFiguresEn: 'Abu Bakr as-Siddiq (RA), Habibah bint Kharijah (RA)',
    extendedContextBn:
      'আস-সুনহ ছিল মসজিদে নববী থেকে প্রায় এক মাইল দূরে বনী হারিস ইবনে খাযরাজের এলাকায়, যেখানে আবু বকর (রা.)-এর স্ত্রী হাবীবা বিনতে খারিজা (রা.) বসবাস করতেন। সোমবার ফজরের সময় নবীজি ﷺ পর্দা সরিয়ে হাসিমুখে সাহাবিদের কাতার দেখেছিলেন—তা দেখে আবু বকর (রা.) ভেবেছিলেন নবীজি সুস্থ হয়ে উঠছেন। সেই প্রশান্তি নিয়েই তিনি অনুমতি চেয়ে পরিবার দেখতে গিয়েছিলেন; কিন্তু দুপুরের আগেই শোকের সংবাদবাহক সেখানে পৌঁছে যায়।',
    extendedContextEn:
      'Located about a mile from Al-Masjid an-Nabawi in the quarter of Banu Harith, As-Sunh was where Abu Bakr’s wife Habibah bint Kharijah lived. Heartened by the Prophet’s radiant smile during Fajr prayer earlier that morning, Abu Bakr had sought permission to visit his family—only for urgent riders to summon him back before midday had passed.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয ও কিতাবু ফাদায়িলিস সাহাবাহ',
        chapterEn: 'Book of Funerals & Virtues of the Companions',
        citationBn: 'হাদিস নং ১২৪১, ৩৬৬৭, ৪৪৫৪',
        citationEn: 'Hadith 1241, 3667, 4454',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  5: {
    locationBn: 'আস-সুনহ থেকে মসজিদে নববী হয়ে হুজরায়ে আয়েশা (রা.)',
    locationEn: 'From As-Sunh to Al-Masjid an-Nabawi & Aisha’s (RA) Chamber',
    keyFiguresBn: 'হযরত আবু বকর সিদ্দীক (রা.), হযরত আয়েশা (রা.)',
    keyFiguresEn: 'Abu Bakr as-Siddiq (RA), Aisha (RA)',
    extendedContextBn:
      'সংবাদ শোনামাত্রই আবু বকর (রা.) কোনো দ্বিধা না করে ঘোড়ায় আরোহণ করে মদিনার পথে রওনা হন। মসজিদে নেমে তিনি দেখেন মানুষ বিভ্রান্ত ও ক্রন্দনরত, আর উমর (রা.) উত্তেজিত হয়ে কথা বলছেন। আবু বকর (রা.) কোনো আবেগী মন্তব্য না করে সম্পূর্ণ নীরবতায় সোজা হুজরার ভেতরে চলে যান—কারণ সত্য যাচাই না করে জনসম্মুখে কথা বলা তাঁর সুদৃঢ় ব্যক্তিত্বের পরিপন্থী ছিল।',
    extendedContextEn:
      'Without pausing for a moment, Abu Bakr (RA) saddled his horse and galloped toward the mosque. Amid wailing crowds and Umar’s intense words, he did not exchange a single word with anyone until he personally entered Aisha’s room to witness the reality with his own eyes.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয (ইন্তেকালের পর মৃতের কক্ষে প্রবেশ)',
        chapterEn: 'Book of Funerals (Entering Upon the Deceased)',
        citationBn: 'হাদিস নং ১২৪১, ৪৪৫২–৪৪৫৪',
        citationEn: 'Hadith 1241, 4452–4454',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  6: {
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'হযরত আবু বকর সিদ্দীক (রা.), রাসূলুল্লাহ ﷺ',
    keyFiguresEn: 'Abu Bakr as-Siddiq (RA), Prophet Muhammad ﷺ',
    extendedContextBn:
      'নবুওয়তের প্রথম দিন থেকে হিজরতের গারে সওর পর্যন্ত তেইশ বছরের অবিচ্ছেদ্য সাথী যখন চাদর সরিয়ে প্রিয় বন্ধুর শান্ত চেহারা দেখলেন, তখন নিজের অশ্রু ধরে রাখতে পারলেন না। তিনি দুই চোখের মাঝখানে পবিত্র কপালে চুম্বন করলেন এবং বললেন—‘আমার মা-বাবা আপনার জন্য কুরবান! আপনি জীবদ্দশায় যেমন সুবাসিত ও পবিত্র ছিলেন, মৃত্যুর পরও তেমনি পবিত্র ও সুরভিত।’ ফিকহের আলেমগণ এই হাদিস থেকে প্রিয় মৃত ব্যক্তির কপালে চুম্বন করা ও নীরবে অশ্রু ফেলার বৈধতা প্রমাণ করেছেন।',
    extendedContextEn:
      'For twenty-three years—from the first call of Islam to the darkness of Cave Thawr—Abu Bakr had never left his friend’s side. Kissing between the Prophet’s eyes as tears fell, his words (“Pure in life and pure in death”) also became a foundational legal proof in Islamic jurisprudence permitting affectionate farewell kisses and quiet weeping over the deceased.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয ও কিতাবুল মাগাযী',
        chapterEn: 'Book of Funerals & Book of Military Expeditions',
        citationBn: 'হাদিস নং ১২৪১, ৩৬৬৭, ৪৪৫৫',
        citationEn: 'Hadith 1241, 3667, 4455',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  7: {
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'হযরত আবু বকর সিদ্দীক (রা.)',
    keyFiguresEn: 'Abu Bakr as-Siddiq (RA)',
    extendedContextBn:
      'আবু বকর (রা.)-এর এই বাক্যটি ছিল গভীর কুরআনী প্রজ্ঞার প্রতিফলন—পবিত্র কুরআনে (সূরা আদ-দুখান: ৫৬) জান্নাতবাসীদের সম্পর্কে বলা হয়েছে যে তাঁরা প্রথম মৃত্যুর পর আর কোনো মৃত্যুর স্বাদ আস্বাদন করবেন না। তাই তিনি বুঝিয়ে দিলেন, নবীজি ﷺ-এর এই মৃত্যুই তাঁর নির্ধারিত একমাত্র মৃত্যু; তিনি আর দুনিয়ায় ফিরে আসবেন না, বরং চিরস্থায়ী জান্নাতি মর্যাদায় আসীন হয়েছেন।',
    extendedContextEn:
      'Abu Bakr’s statement echoed Quranic certainty (Surah Ad-Dukhan 44:56) that the righteous taste death only once. Gently drawing the striped Yemeni cloth back over his beloved friend’s face, he stepped out prepared to steady an entire reeling nation.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয',
        chapterEn: 'Book of Funerals',
        citationBn: 'হাদিস নং ১২৪১, ৪৪৫৪',
        citationEn: 'Hadith 1241, 4454',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  8: {
    locationBn: 'মসজিদে নববীর প্রাঙ্গণ, মদিনা',
    locationEn: 'Courtyard of Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'হযরত আবু বকর (রা.), হযরত উমর (রা.), সাহাবায়ে কিরাম',
    keyFiguresEn: 'Abu Bakr (RA), Umar (RA), Companions',
    extendedContextBn:
      'বাইরে বেরিয়ে এসে আবু বকর (রা.) উমর (রা.)-কে দুবার অত্যন্ত নম্র ও মর্যাদাপূর্ণ স্বরে বললেন—‘ইজলিস ইয়া উমর’ (হে উমর, বসো)। কিন্তু উমর (রা.) তখনো প্রবল আবেগের ঘোরে দাঁড়িয়ে কথা বলে যাচ্ছিলেন। আবু বকর (রা.) তাঁর সাথে বিতর্কে না জড়িয়ে কয়েক কদম এগিয়ে দাঁড়িয়ে মহান আল্লাহর হামদ ও তাশাহহুদ শুরু করলেন। তাঁর গম্ভীর আওয়াজ কানে পৌঁছাতেই সমবেত সাহাবায়ে কিরাম নীরব হয়ে তাঁর চারপাশে এসে দাঁড়ালেন।',
    extendedContextEn:
      'Refusing to escalate emotions with argument, Abu Bakr (RA) twice asked Umar gently to sit. When Umar remained caught in shock, Abu Bakr simply stepped aside and began praising Allah; instantly, the moral gravity of his voice drew the entire assembly calmly to his side.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয ও কিতাবুল মাগাযী',
        chapterEn: 'Book of Funerals & Military Expeditions',
        citationBn: 'হাদিস নং ১২৪২, ৪৪৫৪',
        citationEn: 'Hadith 1242, 4454',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  9: {
    locationBn: 'মসজিদে নববী, মদিনা',
    locationEn: 'Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'হযরত আবু বকর সিদ্দীক (রা.), সমগ্র সাহাবায়ে কিরাম',
    keyFiguresEn: 'Abu Bakr as-Siddiq (RA) & the Companions',
    extendedContextBn:
      'ইসলামের ইতিহাসবিদগণ একমত যে নবীজি ﷺ-এর ইন্তেকালের পর মুহূর্তের বিভ্রান্তি ও সম্ভাব্য ধর্মত্যাগের ঝড় থামাতে আবু বকর (রা.)-এর এই দুই বাক্যের ঘোষণা ছিল সর্বশ্রেষ্ঠ ঈমানি ঢাল। তিনি স্পষ্টভাবে ঘোষণা করলেন—আমাদের ইবাদত ও আনুগত্য কোনো ব্যক্তির অমরত্বের ওপর নির্ভরশীল নয়, বরং চিরঞ্জীব মহান আল্লাহর ওপর প্রতিষ্ঠিত, যাঁর কখনো মৃত্যু নেই।',
    extendedContextEn:
      'Historians regard this two-sentence declaration as one of the most decisive theological anchors in human history. In seconds, Abu Bakr redirected grief away from despair and fixed the community’s devotion firmly upon the Ever-Living God.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয ও কিতাবু ফাদায়িলিস সাহাবাহ',
        chapterEn: 'Book of Funerals & Virtues of the Companions',
        citationBn: 'হাদিস নং ১২৪২, ৩৬৬৮, ৪৪৫৪',
        citationEn: 'Hadith 1242, 3668, 4454',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  10: {
    locationBn: 'মসজিদে নববী, মদিনা',
    locationEn: 'Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'হযরত আবু বকর সিদ্দীক (রা.)',
    keyFiguresEn: 'Abu Bakr as-Siddiq (RA)',
    extendedContextBn:
      'সূরা আলে ইমরানের ১৪৪ নং আয়াতটি উহুদের যুদ্ধের সময় নাযিল হয়েছিল, যখন রটে গিয়েছিল যে নবীজি ﷺ শহীদ হয়েছেন। কিন্তু সেই আয়াত যে একদিন এই মহাপ্রয়াণের দিনে সমগ্র উম্মাহর সান্ত্বনা ও চূড়ান্ত প্রমাণ হয়ে উঠবে, তা সেদিন আবু বকর (রা.)-এর তিলাওয়াতের মাধ্যমেই সবার হৃদয়ে নতুনভাবে আলোকিত হয়ে উঠল।',
    extendedContextEn:
      'Surah Al-Imran 3:144 had originally been revealed at the Battle of Uhud when rumors of the Prophet’s death spread. Recited alongside Surah Az-Zumar 39:30 on this solemn afternoon, its timeless wisdom pierced every grieving heart with unmistakable clarity.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবু ফাদায়িলি আসহাবিন নবী ﷺ',
        chapterEn: 'Book of Virtues of the Companions',
        citationBn: 'হাদিস নং ৩৬৬৮, ৪৪৫৪',
        citationEn: 'Hadith 3668, 4454',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'আল-কুরআনুল কারীম',
        bookEn: 'The Noble Quran',
        chapterBn: 'সূরা আয-যুমার ও সূরা আলে ইমরান',
        chapterEn: 'Surah Az-Zumar & Surah Al-Imran',
        citationBn: 'সূরা ৩৯:৩০ এবং সূরা ৩:১৪৪',
        citationEn: 'Quran 39:30 & 3:144',
        gradeBn: 'কুরআনের অকাট্য দলিল',
        gradeEn: 'Quranic Proof',
      },
    ],
  },
  11: {
    locationBn: 'মসজিদে নববী ও মদিনার সমগ্র অলিগলি',
    locationEn: 'Al-Masjid an-Nabawi & Streets of Madinah',
    keyFiguresBn: 'হযরত ইবনে আব্বাস (রা.), সাঈদ ইবনুল মুসাইয়্যিব (রহ.), মদিনাবাসী',
    keyFiguresEn: 'Ibn Abbas (RA), Sa‘id ibn al-Musayyib, citizens of Madinah',
    extendedContextBn:
      'হযরত ইবনে আব্বাস (রা.) বিস্ময় প্রকাশ করে বলেন—যদিও সাহাবিরা বহু বছর ধরে নামাজে ও কুরআন পাঠে আয়াতটি পড়ে আসছিলেন, তবু প্রিয় নবীর বিদায়ের আকস্মিক আঘাতে সবার স্মৃতি যেন স্তব্ধ হয়ে গিয়েছিল। আবু বকর (রা.) পড়ার পরই যেন মানুষের হুঁশ ফিরল এবং মদিনার পথে-প্রান্তরে প্রতিটি মুমিনের মুখে সেই আয়াতের গুঞ্জন ছড়িয়ে পড়ল।',
    extendedContextEn:
      'Though the Companions had recited this verse for years in prayer, the sheer shock of parting had momentarily clouded every mind. The moment Abu Bakr voiced it, the verse passed from lip to lip across every lane of Madinah, restoring collective composure.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয ও কিতাবুল মাগাযী',
        chapterEn: 'Book of Funerals & Military Expeditions',
        citationBn: 'হাদিস নং ১২৪২, ৪৪৫৪',
        citationEn: 'Hadith 1242, 4454',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  12: {
    locationBn: 'মসজিদে নববী, মদিনা',
    locationEn: 'Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'হযরত উমর ইবনুল খাত্তাব (রা.), হযরত আবু বকর (রা.)',
    keyFiguresEn: 'Umar ibn al-Khattab (RA), Abu Bakr (RA)',
    extendedContextBn:
      'উমর (রা.)-এর মতো বজ্রকঠিন বীরের হাঁটু ভেঙে মাটিতে বসে পড়ার এই দৃশ্যটি ছিল শোক ও সত্যোপলব্ধির চরম শিখর। কুরআনের আয়াত শোনার সাথে সাথেই তাঁর সমস্ত দ্বিধা গলে অশ্রু হয়ে ঝরে পড়ে এবং সেই মুহূর্ত থেকেই তিনি আবু বকর (রা.)-এর পাশে দাঁড়িয়ে উম্মাহর ঐক্য রক্ষার গুরুদায়িত্ব কাঁধে তুলে নেন।',
    extendedContextEn:
      'The sight of the mighty Umar ibn al-Khattab sinking to the earth upon hearing Allah’s verse marked the emotional turning point of that afternoon. From that instant onward, Umar stood shoulder to shoulder with Abu Bakr to protect the unity of Islam.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী (নবী ﷺ-এর ওফাত অধ্যায়)',
        chapterEn: 'Book of Military Expeditions (Passing of the Prophet)',
        citationBn: 'হাদিস নং ৪৪৫৪',
        citationEn: 'Hadith 4454',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  13: {
    locationBn: 'সাকিফা বনু সাইদা (মসজিদে নববীর উত্তর-পশ্চিমে আনসারদের ছাউনি)',
    locationEn: 'Saqifah Bani Sa‘idah (Northwest of Masjid an-Nabawi)',
    keyFiguresBn: 'হযরত সা‘দ ইবনে উবাদা (রা.), আনসার নেতৃবৃন্দ (আউস ও খাযরাজ)',
    keyFiguresEn: 'Sa‘d ibn Ubadah (RA), leaders of the Ansar (Aws & Khazraj)',
    extendedContextBn:
      'নবীজি ﷺ-এর ইন্তেকালের ফলে আরব উপদ্বীপের নতুন ইসলাম গ্রহণকারী গোত্রগুলোতে বিদ্রোহ ও বিশৃঙ্খলা ছড়িয়ে পড়ার গভীর আশঙ্কা তৈরি হয়েছিল। সেই উদ্বেগ থেকেই আনসার সাহাবিরা দ্রুত সাকিফা বনু সাইদায় একত্রিত হয়ে মদিনার নেতৃত্ব ও ভবিষ্যৎ নিরাপত্তা নিয়ে পরামর্শে বসেন। সা‘দ ইবনে উবাদা (রা.) তখন অসুস্থ ছিলেন; কম্বল গায়ে জড়িয়ে তিনি আলোচনায় নেতৃত্ব দিচ্ছিলেন।',
    extendedContextEn:
      'Fearing unrest across newly Muslim tribes in Arabia if Madinah remained without a leader, the Ansar convened urgently at the shaded courtyard of Banu Sa‘idah around the ailing Khazraj chief Sa‘d ibn Ubadah (RA) to deliberate on securing the community.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবু ফাদায়িলিস সাহাবাহ ও কিতাবুল হুদুদ',
        chapterEn: 'Book of Virtues of the Companions & Book of Limits',
        citationBn: 'হাদিস নং ৩৬৬৮, ৬৮৩০',
        citationEn: 'Hadith 3668, 6830',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  14: {
    locationBn: 'সাকিফা বনু সাইদা, মদিনা',
    locationEn: 'Saqifah Bani Sa‘idah, Madinah',
    keyFiguresBn: 'হযরত আবু বকর (রা.), হযরত উমর (রা.), হযরত আবু উবাইদা ইবনুল জাররাহ (রা.)',
    keyFiguresEn: 'Abu Bakr (RA), Umar (RA), Abu Ubaydah ibn al-Jarrah (RA)',
    extendedContextBn:
      'হযরত আলী (রা.) ও আহলে বাইতের সদস্যরা তখন হুজরায় নবীজি ﷺ-এর পবিত্র দেহ মোবারকের তত্ত্বাবধানে নিয়োজিত ছিলেন। এদিকে দুইজন নিষ্ঠাবান আনসার সাহাবি—উওয়াইম ইবনে সায়িদা (রা.) ও মা‘ন ইবনে আদী (রা.)—পথে এসে আবু বকর ও উমর (রা.)-কে সাকিফার পরিস্থিতির কথা জানান। আবু বকর (রা.)-এর ধীরস্থিরতা ও প্রজ্ঞাময় বক্তব্যে মুহূর্তেই উত্তপ্ত পরিবেশ শান্ত ও সৌহার্দ্যপূর্ণ হয়ে ওঠে।',
    extendedContextEn:
      'While Ali (RA) and the Prophet’s household remained attending the blessed body inside the chamber, two loyal Ansar alerted Abu Bakr and Umar along the way. Arriving with Abu Ubaydah (RA), Abu Bakr’s gentle restraint cooled rising tensions immediately.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবু ফাদায়িলিস সাহাবাহ ও কিতাবুল হুদুদ',
        chapterEn: 'Book of Virtues of the Companions & Book of Limits',
        citationBn: 'হাদিস নং ৩৬৬৮, ৬৮৩০',
        citationEn: 'Hadith 3668, 6830',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  15: {
    locationBn: 'সাকিফা বনু সাইদা, মদিনা',
    locationEn: 'Saqifah Bani Sa‘idah, Madinah',
    keyFiguresBn: 'হযরত আবু বকর (রা.), হযরত উমর (রা.), হযরত আবু উবাইদা (রা.), হযরত বাশীর ইবনে সা‘দ (রা.)',
    keyFiguresEn: 'Abu Bakr (RA), Umar (RA), Abu Ubaydah (RA), Bashir ibn Sa‘d (RA)',
    extendedContextBn:
      'আবু বকর (রা.) আনসারদের সম্পর্কে কুরআনের প্রশংসা ও নবীজি ﷺ-এর ওসিয়ত স্মরণ করিয়ে বলেন—“তোমরা যেসব মর্যাদার কথা উল্লেখ করেছ, তোমরা তার প্রতিটি অক্ষরেরই যোগ্য।” অতঃপর উম্মাহর ঐক্যের স্বার্থে তিনি ‘নাহনুল উমারা ওয়া আনতুমুল উযারা’ (আমরা আমির, তোমরা উজির) প্রস্তাব তুলে ধরেন। খাযরাজ নেতা বাশীর ইবনে সা‘দ (রা.) এবং আউস নেতা উসাইদ ইবনে হুদাইর (রা.) আবু বকর (রা.)-এর ন্যায়সঙ্গত যুক্তি সর্বান্তকরণে সমর্থন করেন।',
    extendedContextEn:
      'Abu Bakr (RA) affirmed every honor the Ansar held in Islam before appealing to communal unity under one leadership with shared counsel. Key Ansar chiefs—including Bashir ibn Sa‘d and Usayd ibn Hudayr (RA)—warmly endorsed his wisdom and sincerity.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবু ফাদায়িলিস সাহাবাহ ও কিতাবুল হুদুদ',
        chapterEn: 'Book of Virtues of the Companions & Book of Limits',
        citationBn: 'হাদিস নং ৩৬৬৮, ৬৮৩০',
        citationEn: 'Hadith 3668, 6830',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  16: {
    locationBn: 'সাকিফা বনু সাইদা, মদিনা',
    locationEn: 'Saqifah Bani Sa‘idah, Madinah',
    keyFiguresBn: 'হযরত উমর (রা.), হযরত আবু বকর (রা.), হযরত আবু উবাইদা (রা.), আনসার ও মুহাজিরগণ',
    keyFiguresEn: 'Umar (RA), Abu Bakr (RA), Abu Ubaydah (RA), Ansar & Muhajirun',
    extendedContextBn:
      'আবু বকর (রা.) যখন বিনয়বশত উমর (রা.) ও আবু উবাইদা (রা.)-এর হাত তুলে তাঁদের মধ্য থেকে কাউকে বেছে নিতে বললেন, তখন উমর (রা.) বললেন—“যেখানে আবু বকর উপস্থিত, সেখানে আমার নেতৃত্ব গ্রহণ করার চেয়ে আমার গর্দান উড়ে যাওয়াও শ্রেয়।” এরপর তিনি হাত বাড়িয়ে সর্বপ্রথম বাইয়াত দিলেন; আর আনসারদের পক্ষ থেকে বাশীর ইবনে সা‘দ (রা.) ও উসাইদ ইবনে হুদাইর (রা.)-সহ প্রায় সকল উপস্থিত সাহাবি একে একে বাইয়াত গ্রহণ করলেন।',
    extendedContextEn:
      'When Abu Bakr modestly put forward Umar and Abu Ubaydah instead of himself, Umar immediately refused to step before the Prophet’s dearest friend and clasped Abu Bakr’s hand first, triggering a wave of heartfelt pledges from Muhajirun and Ansar alike.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবু ফাদায়িলিস সাহাবাহ ও কিতাবুল হুদুদ',
        chapterEn: 'Book of Virtues of the Companions & Book of Limits',
        citationBn: 'হাদিস নং ৩৬৬৮, ৬৮৩০',
        citationEn: 'Hadith 3668, 6830',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  17: {
    locationBn: 'মসজিদে নববী (মিম্বারে নববী), মদিনা',
    locationEn: 'Al-Masjid an-Nabawi (Prophet’s Pulpit), Madinah',
    keyFiguresBn: 'হযরত উমর (রা.), হযরত আবু বকর (রা.), সমগ্র মদিনাবাসী',
    keyFiguresEn: 'Umar (RA), Abu Bakr (RA), citizens of Madinah',
    extendedContextBn:
      'মঙ্গলবার সকালে মদিনার সর্বস্তরের মুসলিম মসজিদে নববীতে সমবেত হন। আবু বকর (রা.) নবীজি ﷺ-এর প্রতি অসীম আদববশত মিম্বারের সর্বোচ্চ ধাপে না বসে এক ধাপ নিচে নীরবে বসেছিলেন। উমর (রা.) আগে দাঁড়িয়ে বললেন—“গতকাল আমি তোমাদের যা বলেছিলাম তা আল্লাহর কিতাবে ছিল না এবং রাসূলুল্লাহ ﷺ-ও আমাকে তেমন কিছু বলেননি; বরং আমার ধারণা হয়েছিল তিনি আমাদের সবার শেষে থাকবেন। কিন্তু আল্লাহ তাঁর কিতাব আমাদের মাঝে রেখে গেছেন—যার দ্বারা তিনি রাসূলকে হেদায়েত দিয়েছিলেন। আর তোমাদের বিষয়টি তিনি তোমাদের শ্রেষ্ঠ ব্যক্তি আবু বকরের হাতে একত্র করেছেন।”',
    extendedContextEn:
      'Out of deep reverence for the Prophet ﷺ, Abu Bakr sat one step lower on the pulpit in silence while Umar rose first to humbly retract his grief-stricken words from Monday and present Abu Bakr—the companion of Cave Thawr—for the public pledge of all Madinah.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল আহকাম (ইসতিখলাফ / খলিফার বাইয়াত)',
        chapterEn: 'Book of Judgments (Bay‘ah / Succession)',
        citationBn: 'হাদিস নং ৭২১৯',
        citationEn: 'Hadith 7219',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  18: {
    locationBn: 'মসজিদে নববী, মদিনা',
    locationEn: 'Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'হযরত আবু বকর সিদ্দীক (রা.), সমগ্র মুহাজির ও আনসার সাহাবিগণ',
    keyFiguresEn: 'Abu Bakr as-Siddiq (RA), Muhajirun & Ansar',
    extendedContextBn:
      'সাকিফার বাইয়াত ছিল ‘বাইয়াতে খাসসাহ’ (বিশেষ পরামর্শমূলক বাইয়াত), আর মঙ্গলবার সকালে মসজিদে নববীতে সমগ্র জনগণের উপস্থিতিতে অনুষ্ঠিত হলো ‘বাইয়াতে আম্মাহ’ (সর্বজনীন বাইয়াত)। কোনো রক্তপাত, জবরদস্তি বা ক্ষমতা দখল ছাড়াই শোকাতুর উম্মাহ শান্তিপূর্ণ পরামর্শের মাধ্যমে ইসলামের প্রথম খলিফা ‘খলিফাতু রাসূলিল্লাহ’ নির্বাচন করল।',
    extendedContextEn:
      'While Saqifah served as an emergency consultation (Bay‘ah Khassah), Tuesday morning’s open gathering in Masjid an-Nabawi completed the universal public ratification (Bay‘ah ‘Ammah), establishing the first rightly guided Caliphate peacefully without coercion or bloodshed.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল আহকাম',
        chapterEn: 'Book of Judgments',
        citationBn: 'হাদিস নং ৭২১৯',
        citationEn: 'Hadith 7219',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'আল-বিদায়া ওয়ান নিহায়া (ইবনে কাসীর)',
        bookEn: 'Al-Bidayah wan-Nihayah (Ibn Kathir)',
        chapterBn: 'খিলাফতে আবু বকর (রা.) ও বাইয়াতে আম্মাহ অধ্যায়',
        chapterEn: 'Chapter on the Caliphate & Public Pledge of Abu Bakr',
        citationBn: 'খণ্ড ৫, সাধারণ বাইয়াত বিবরণ',
        citationEn: 'Vol. 5, Account of the Public Pledge',
        gradeBn: 'প্রামাণ্য ইতিহাস গ্রন্থ',
        gradeEn: 'Classical History',
      },
    ],
  },
  19: {
    locationBn: 'মসজিদে নববীর মিম্বার, মদিনা',
    locationEn: 'Pulpit of Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'খলিফাতু রাসূলিল্লাহ হযরত আবু বকর সিদ্দীক (রা.)',
    keyFiguresEn: 'Caliph Abu Bakr as-Siddiq (RA)',
    extendedContextBn:
      'বিশ্বের রাজনৈতিক ইতিহাসে শাসকের জবাবদিহিতা ও জনগণের সমালোচনার অধিকার এত স্পষ্টভাবে এর আগে কখনো ঘোষিত হয়নি। আবু বকর (রা.) নিজেকে সাধারণ একজন দায়িত্বশীল সেবক হিসেবে উপস্থাপন করলেন এবং রাষ্ট্রপরিচালনার মূলনীতি হিসেবে ‘সত্যবাদিতা (আমানত)’ ও ‘মিথ্যা পরিহার (খেয়ানত বর্জন)’-কে সর্বোচ্চ আসনে অধিষ্ঠিত করলেন।',
    extendedContextEn:
      'Few inaugural speeches in world history match the moral power of these few lines. Abu Bakr rejected personal superiority, invited public correction whenever he erred, and anchored governance in truthfulness as a sacred trust.',
    references: [
      {
        bookBn: 'আস-সীরাতুন নাবাবিয়্যাহ (ইবনে হিশাম)',
        bookEn: 'As-Sirah an-Nabawiyyah (Ibn Hisham)',
        chapterBn: 'খলিফা আবু বকর (রা.)-এর প্রথম খুতবা',
        chapterEn: 'First Address of Caliph Abu Bakr (RA)',
        citationBn: 'খণ্ড ২, পৃষ্ঠা ৬৬১',
        citationEn: 'Vol. 2, p. 661',
        gradeBn: 'প্রামাণ্য সীরাত গ্রন্থ (মুস্তাদরাক ও বায়হাকীতে সমর্থিত)',
        gradeEn: 'Authoritative Seerah Source',
      },
    ],
  },
  20: {
    locationBn: 'মসজিদে নববীর মিম্বার, মদিনা',
    locationEn: 'Pulpit of Al-Masjid an-Nabawi, Madinah',
    keyFiguresBn: 'হযরত আবু বকর সিদ্দীক (রা.), সমগ্র উম্মাহ',
    keyFiguresEn: 'Abu Bakr as-Siddiq (RA) & the Muslim Community',
    extendedContextBn:
      'ভাষণের এই অংশে আবু বকর (রা.) ইসলামী রাষ্ট্রের তিনটি অমর স্তম্ভ ঘোষণা করেন: (১) সামাজিক ন্যায়বিচার ও দুর্বলের অধিকার নিশ্চিত করা, (২) ক্ষমতাবান অত্যাচারীর হাত থেকে ন্যায্য পাওনা আদায় করা, এবং (৩) শাসকের আনুগত্যকে শর্তহীন না রেখে আল্লাহ ও তাঁর রাসূলের বিধানের অধীন রাখা। এই নীতিই খুলাফায়ে রাশেদীনের সোনালি যুগের ভিত্তি রচনা করেছিল।',
    extendedContextEn:
      'In closing, Abu Bakr articulated three enduring pillars of Islamic justice: empowering the vulnerable until their rights are restored, holding the powerful accountable before the law, and conditioning obedience to the ruler strictly upon obedience to Allah and His Messenger.',
    references: [
      {
        bookBn: 'আস-সীরাতুন নাবাবিয়্যাহ (ইবনে হিশাম)',
        bookEn: 'As-Sirah an-Nabawiyyah (Ibn Hisham)',
        chapterBn: 'খলিফা আবু বকর (রা.)-এর প্রথম খুতবা',
        chapterEn: 'First Address of Caliph Abu Bakr (RA)',
        citationBn: 'খণ্ড ২, পৃষ্ঠা ৬৬১',
        citationEn: 'Vol. 2, p. 661',
        gradeBn: 'প্রামাণ্য সীরাত গ্রন্থ',
        gradeEn: 'Authoritative Seerah Source',
      },
      {
        bookBn: 'তারীখুত তাবারী',
        bookEn: 'Tarikh at-Tabari',
        chapterBn: '১১ হিজরির ঘটনাবলি',
        chapterEn: 'Events of 11 AH',
        citationBn: 'খণ্ড ৩, সাকিফা ও খুতবা অধ্যায়',
        citationEn: 'Vol. 3, Saqifah & Inaugural Speech',
        gradeBn: 'ক্লাসিক্যাল ইতিহাস সূত্র',
        gradeEn: 'Classical Historical Reference',
      },
    ],
  },
  21: {
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'হযরত আয়েশা (রা.), হযরত আলী (রা.), হযরত আব্বাস (রা.) ও আহলে বাইত',
    keyFiguresEn: 'Aisha (RA), Ali (RA), Al-Abbas (RA) & Ahl al-Bayt',
    extendedContextBn:
      'হযরত আয়েশা (রা.) বর্ণনা করেন—যখন সাহাবিরা নবীজি ﷺ-কে গোসল দেওয়ার ইচ্ছা করলেন, তখন তাঁরা পরস্পর বললেন, “আল্লাহর কসম! আমরা জানি না—অন্যান্য মৃত ব্যক্তিদের মতো কি আমরা রাসূলুল্লাহ ﷺ-এর কাপড় খুলব, নাকি কাপড় পরা অবস্থাতেই গোসল দেব?” এই গভীর দ্বিধার মুহূর্তে মহান আল্লাহ সবার ওপর প্রশান্ত তন্দ্রা ঢেলে দেন এবং অদৃশ্য গায়েবী আওয়াজে স্পষ্ট নির্দেশ আসে: “তোমরা নবী ﷺ-কে তাঁর জামাসহই গোসল দাও।” অতঃপর ঘুম ভাঙতেই সবাই নিশ্চিন্ত মনে জামার ওপর দিয়েই গোসল শুরু করেন।',
    extendedContextEn:
      'Aisha (RA) narrated how the family hesitated deeply over whether to remove the Prophet’s shirt as customary for others. Allah answered their reverence miraculously with a brief, tranquil slumber and an unseen voice from the corner of the chamber commanding them to wash him in his garment—resolving all uncertainty instantly.',
    references: [
      {
        bookBn: 'সুনান আবু দাউদ',
        bookEn: 'Sunan Abi Dawud',
        chapterBn: 'কিতাবুল জানায়েয (নবী ﷺ-এর গোসল অধ্যায়)',
        chapterEn: 'Book of Funerals (Bathing of the Prophet)',
        citationBn: 'হাদিস নং ৩১৪১',
        citationEn: 'Hadith 3141',
        gradeBn: 'হাসান / সহীহ (শায়খ আলবানী সহীহ বলেছেন)',
        gradeEn: 'Hasan / Sahih',
      },
    ],
  },
  22: {
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'হযরত আলী (রা.), হযরত আব্বাস (রা.), ফজল ও কুসাম ইবনে আব্বাস (রা.), উসামা ইবনে যায়েদ (রা.), শুকরান (রা.) ও আওস ইবনে খাওলী (রা.)',
    keyFiguresEn: 'Ali (RA), Al-Abbas (RA), Al-Fadl & Qutham ibn Abbas (RA), Usamah ibn Zayd (RA), Shuqran (RA) & Aws ibn Khawli (RA)',
    extendedContextBn:
      'গোসলের সময় আনসারদের পক্ষ থেকে একজন বদরী সাহাবি হযরত আওস ইবনে খাওলী (রা.) আল্লাহর দোহাই দিয়ে শরিক হওয়ার অনুমতি চাইলে আলী (রা.) তাঁকে ভেতরে ডেকে নেন এবং তিনি পানির পাত্র এনে দেওয়ার খেদমত করেন। আলী (রা.) নবীজির পবিত্র দেহ নিজের বুকে হেলান দিয়ে ধরে রাখেন, ফজল ও উসামা (রা.) পর্দার আড়াল থেকে ও পাশ থেকে পানি ঢেলে দেন, আর আলী (রা.) জামার ওপর দিয়ে হাত বুলিয়ে পরম যত্নে তিনবার গোসল সম্পন্ন করেন। কুবা অঞ্চলের ‘গিরস’ কূপের পবিত্র পানি দিয়ে তাঁকে গোসল করানো হয়েছিল।',
    extendedContextEn:
      'Ali (RA) supported the Prophet’s blessed body against his chest while Al-Fadl, Qutham, and Usamah poured clean water (drawn from the well of Ghirs) over his shirt, and the Badri Ansari companion Aws ibn Khawli (RA) was also honored to assist with water vessels. Ali repeatedly exclaimed in awe at the Prophet’s purity and fragrance.',
    references: [
      {
        bookBn: 'সুনান আবু দাউদ',
        bookEn: 'Sunan Abi Dawud',
        chapterBn: 'কিতাবুল জানায়েয',
        chapterEn: 'Book of Funerals',
        citationBn: 'হাদিস নং ৩১৪১, ৩২০৯',
        citationEn: 'Hadith 3141, 3209',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'সুনান ইবনে মাজাহ',
        bookEn: 'Sunan Ibn Majah',
        chapterBn: 'কিতাবুল জানায়েয (নবী ﷺ-এর গোসল)',
        chapterEn: 'Book of Funerals',
        citationBn: 'হাদিস নং ১৪৬৭',
        citationEn: 'Hadith 1467',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  23: {
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'হযরত আয়েশা (রা.), হযরত আলী (রা.), হযরত আব্বাস (রা.) ও আহলে বাইত',
    keyFiguresEn: 'Aisha (RA), Ali (RA), Al-Abbas (RA) & Ahl al-Bayt',
    extendedContextBn:
      'গোসল শেষে নবীজি ﷺ-এর পবিত্র শরীর শুকনো কাপড়ে আলতোভাবে মুছে ফেলা হয় এবং ইয়ামানের ‘সাহুল’ গ্রামের তৈরি তিনটি ধবধবে সাদা সুতি কাপড়ে (সাহুলি কাপড়) তাঁকে কাফন পরানো হয়। এতে কোনো সেলাই করা জামা বা মাথার পাগড়ি দেওয়া হয়নি। ফিকহে ইসলামীতে পুরুষের কাফনের জন্য তিনটি সাদা চাদরের সুন্নাহ সরাসরি এই সহীহ হাদিস থেকেই গৃহীত।',
    extendedContextEn:
      'After being gently dried, the Prophet ﷺ was wrapped in three plain white cotton sheets woven in the Yemeni village of Sahul, without any stitched shirt or turban. This authentic narration established the universal Sunnah of three simple white shrouds for Muslim men.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয (তিন কাপড়ে কাফন দেওয়া)',
        chapterEn: 'Book of Funerals (Shrouding in Three Cloths)',
        citationBn: 'হাদিস নং ১২৬৪, ১২৭১, ১২৭২',
        citationEn: 'Hadith 1264, 1271, 1272',
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
  24: {
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'হযরত আবু বকর (রা.), হযরত আলী (রা.), হযরত আব্বাস (রা.) ও সাহাবায়ে কিরাম',
    keyFiguresEn: 'Abu Bakr (RA), Ali (RA), Al-Abbas (RA) & Companions',
    extendedContextBn:
      'একজন বলেছিলেন মক্কায় তাঁর জন্মভূমিতে, কেউ বললেন মসজিদে নববীর মিম্বারের পাশে, আবার কেউ বললেন জান্নাতুল বাকীতে তাঁর প্রিয় সাহাবিদের মাঝে। কিন্তু হযরত আবু বকর সিদ্দীক (রা.) যখন রাসূলুল্লাহ ﷺ-এর স্পষ্ট হাদিস শোনালেন—“কোনো নবী ইন্তেকাল করলে তাঁকে ঠিক সেই স্থানেই দাফন করা হয়, যেখানে তাঁর রূহ কবজ করা হয়েছে”—তখন আর কোনো দ্বিমত থাকল না। তাৎক্ষণিকভাবে আয়েশা (রা.)-এর কক্ষে নবীজির বিছানা সরিয়ে সেই পবিত্র মাটিতেই কবর খনন শুরু হলো, যা আজ সমগ্র মুসলিম বিশ্বের হৃদয়ের স্পন্দন ‘রওজায়ে আতহার’।',
    extendedContextEn:
      'Proposals ranged from Masjid an-Nabawi to Al-Baqi cemetery until Abu Bakr (RA) recalled the Prophet’s exact instruction that every prophet is buried in the precise spot where his soul is taken. Immediately, his bed inside Aisha’s room was lifted to prepare what is today the blessed Rawdah Ash-Sharifah.',
    references: [
      {
        bookBn: 'জামে আত-তিরমিযী',
        bookEn: 'Jami‘ at-Tirmidhi',
        chapterBn: 'কিতাবুল জানায়েয (নবী ﷺ-এর দাফন স্থান)',
        chapterEn: 'Book of Funerals (Burial Place of the Prophet)',
        citationBn: 'হাদিস নং ১০১৮',
        citationEn: 'Hadith 1018',
        gradeBn: 'সহীহ (অন্যান্য সনদে শক্তিশালী)',
        gradeEn: 'Sahih (Corroborated)',
      },
      {
        bookBn: 'সুনান ইবনে মাজাহ ও মুয়াত্তা ইমাম মালিক',
        bookEn: 'Sunan Ibn Majah & Muwatta Malik',
        chapterBn: 'কিতাবুল জানায়েয',
        chapterEn: 'Book of Funerals',
        citationBn: 'ইবনে মাজাহ: ১৬২৮; মুয়াত্তা: ৫৫৬',
        citationEn: 'Ibn Majah 1628; Muwatta 556',
        gradeBn: 'সমর্থিত সূত্র',
        gradeEn: 'Corroborating Sources',
      },
    ],
  },
  25: {
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'হযরত আবু তালহা আনসারী (রা.), হযরত আবু উবাইদা (রা.), হযরত আব্বাস (রা.)',
    keyFiguresEn: 'Abu Talhah al-Ansari (RA), Abu Ubaydah (RA), Al-Abbas (RA)',
    extendedContextBn:
      'মক্কার প্রচলিত ‘শাক্ক’ পদ্ধতি (কবরের মাঝখানে সোজা খাত কাটা) করতেন আবু উবাইদা ইবনুল জাররাহ (রা.), আর মদিনার ‘লাহাদ’ পদ্ধতি (কবরের কিবলামুখী দেয়ালে পার্শ্বখোপ তৈরি করা) করতেন আবু তালহা যায়েদ ইবনে সাহল আনসারী (রা.)। হযরত আব্বাস (রা.) দুজনকে ডেকে আনতে দুজন দূত পাঠালেন এবং আল্লাহর কাছে ফয়সালা ছেড়ে দিলেন। আবু উবাইদাকে পাওয়া গেল না, কিন্তু আবু তালহা (রা.) তৎক্ষণাৎ চলে এলেন এবং পরম ভালোবাসায় নবীজি ﷺ-এর জন্য ‘লাহাদ’ কবর খনন করলেন।',
    extendedContextEn:
      'Al-Abbas (RA) dispatched messengers simultaneously to Abu Ubaydah (who dug Makkan Shaqq graves) and Abu Talhah (who dug Madinan Lahd graves), praying that Allah send whichever He preferred for His Messenger. Abu Talhah arrived first and carefully sculpted the blessed Lahd niche.',
    references: [
      {
        bookBn: 'সুনান ইবনে মাজাহ',
        bookEn: 'Sunan Ibn Majah',
        chapterBn: 'কিতাবুল জানায়েয (লাহাদ কবর প্রসঙ্গ)',
        chapterEn: 'Book of Funerals (The Lahd Grave)',
        citationBn: 'হাদিস নং ১৫৫৭',
        citationEn: 'Hadith 1557',
        gradeBn: 'হাসান / সহীহ',
        gradeEn: 'Hasan / Sahih',
      },
      {
        bookBn: 'মুসনাদে আহমাদ',
        bookEn: 'Musnad Ahmad',
        chapterBn: 'মুসনাদে আনাস ও ইবনে আব্বাস (রা.)',
        chapterEn: 'Musnad of Anas & Ibn Abbas (RA)',
        citationBn: 'হাদিস নং ১২৩০৪',
        citationEn: 'Hadith 12304',
        gradeBn: 'হাসান',
        gradeEn: 'Hasan',
      },
    ],
  },
  26: {
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা, মদিনা',
    locationEn: 'Chamber of Aisha (RA), Madinah',
    keyFiguresBn: 'মদিনার সমগ্র পুরুষ, নারী ও শিশু সাহাবায়ে কিরাম',
    keyFiguresEn: 'All men, women, and children of Madinah',
    extendedContextBn:
      'কাফনের পর নবীজি ﷺ-এর পবিত্র দেহ মোবারক কবরের কিনারে খাটের ওপর রাখা ছিল। ছোট্ট হুজরার ভেতর একসাথে সবার জায়গা হচ্ছিল না এবং রাসূলুল্লাহ ﷺ-এর জানাজায় কোনো মানুষের ইমামতি না করে সবাই যেন সরাসরি দরূদ ও দোয়া পাঠ করতে পারেন—সেজন্য ১০–১২ জনের ছোট ছোট দল ভেতরে প্রবেশ করত, ইমাম ছাড়া আলাদাভাবে জানাজা ও সালাম নিবেদন করে অশ্রুসজল চোখে বেরিয়ে আসত। এভাবে মঙ্গলবার দুপুর থেকে গভীর রাত পর্যন্ত হাজারো সাহাবি, নারী ও শিশু প্রিয় নবীকে শেষ বিদায় জানান।',
    extendedContextEn:
      'Placed on his bier at the edge of the grave inside the compact chamber, the Prophet ﷺ received unbroken waves of mourners from Tuesday midday into the night. Entering in small groups—men first, then women, then children—each believer prayed individually without an Imam so every heart could offer its own direct farewell.',
    references: [
      {
        bookBn: 'সুনান ইবনে মাজাহ',
        bookEn: 'Sunan Ibn Majah',
        chapterBn: 'কিতাবুল জানায়েয (নবী ﷺ-এর জানাজার বিবরণ)',
        chapterEn: 'Book of Funerals (Funeral Prayer for the Prophet)',
        citationBn: 'হাদিস নং ১৬২৮',
        citationEn: 'Hadith 1628',
        gradeBn: 'সনদ দুর্বল — তানবীহ (তবে মূল ঘটনা সীরাতগ্রন্থ ও মুয়াত্তায় প্রসিদ্ধ)',
        gradeEn: 'Weak chain (core practice corroborated in Muwatta & Seerah)',
        isWeakNote: true,
      },
      {
        bookBn: 'মুয়াত্তা ইমাম মালিক ও সীরাতে ইবনে হিশাম',
        bookEn: 'Muwatta Imam Malik & Sirat Ibn Hisham',
        chapterBn: 'কিতাবুল জানায়েয (ইমাম ছাড়া দলে দলে জানাজা)',
        chapterEn: 'Book of Funerals (Group Prayers Without an Imam)',
        citationBn: 'মুয়াত্তা: ৫৫৫; ইবনে হিশাম: খণ্ড ২, পৃষ্ঠা ৬৬৩',
        citationEn: 'Muwatta 555; Ibn Hisham Vol. 2, p. 663',
        gradeBn: 'প্রসিদ্ধ সীরাত ও ফিকহ সূত্র',
        gradeEn: 'Well-Known Seerah & Fiqh Source',
      },
    ],
  },
  27: {
    locationBn: 'হযরত আয়েশা (রা.)-এর হুজরা (রওজায়ে আতহার), মদিনা',
    locationEn: 'Chamber of Aisha (RA) — Al-Rawdah Ash-Sharifah, Madinah',
    keyFiguresBn: 'হযরত আয়েশা (রা.), হযরত আলী (রা.), ফজল ও কুসাম ইবনে আব্বাস (রা.), শুকরান (রা.)',
    keyFiguresEn: 'Aisha (RA), Ali (RA), Al-Fadl & Qutham ibn Abbas (RA), Shuqran (RA)',
    extendedContextBn:
      'ইসলামী চান্দ্রবর্ষে মাগরিবের পর থেকেই নতুন দিন গণনা করা হয়; ফলে মঙ্গলবার সূর্যাস্তের পরের রাতই ছিল বুধবারের রাত। সারাদিন ও সন্ধ্যায় অসংখ্য মানুষের জানাজা শেষ হলে রাতের নির্জন প্রহরে কাঁচা ইট (৯টি ইট) সাজিয়ে ও মাটি দিয়ে পবিত্র দাফন সম্পন্ন করা হয়। হযরত আয়েশা (রা.) ও অন্য উম্মাহাতুল মুমিনীন পাশের অংশে অবস্থান করছিলেন; মধ্যরাতে কোদালের মৃদু শব্দ কানে ভেসে এলে তাঁদের বুক ভেঙে কান্না উথলে ওঠে।',
    extendedContextEn:
      'Because the Islamic day begins at sunset, the night following Tuesday is counted as Wednesday night. Once the endless streams of mourners finished praying, his closest family laid him to rest in the stillness of midnight, sealing the Lahd with nine sun-dried bricks—while Aisha (RA) realized the final parting had arrived only upon hearing the quiet sound of spades.',
    references: [
      {
        bookBn: 'মুসনাদে আহমাদ',
        bookEn: 'Musnad Ahmad',
        chapterBn: 'মুসনাদে আয়েশা (রা.)',
        chapterEn: 'Musnad of Aisha (RA)',
        citationBn: 'হাদিস নং ২৪৭৯০, ২৬৩৪৯',
        citationEn: 'Hadith 24790, 26349',
        gradeBn: 'হাসান / সহীহ লি-গাইরিহি',
        gradeEn: 'Hasan / Sahih (Corroborated)',
      },
      {
        bookBn: 'আস-সীরাতুন নাবাবিয়্যাহ (ইবনে হিশাম)',
        bookEn: 'As-Sirah an-Nabawiyyah (Ibn Hisham)',
        chapterBn: 'নবী ﷺ-এর দাফন অধ্যায়',
        chapterEn: 'Chapter on the Burial of the Prophet',
        citationBn: 'খণ্ড ২, পৃষ্ঠা ৬৬৩–৬৬৪',
        citationEn: 'Vol. 2, pp. 663–664',
        gradeBn: 'প্রামাণ্য সীরাত গ্রন্থ',
        gradeEn: 'Authoritative Seerah Source',
      },
    ],
  },
  28: {
    locationBn: 'পবিত্র কবর মোবারক, হুজরায়ে আয়েশা (রা.), মদিনা',
    locationEn: 'The Blessed Grave inside Aisha’s (RA) Chamber, Madinah',
    keyFiguresBn: 'হযরত শুকরান (রা.), হযরত আলী (রা.), হযরত ফজল ও কুসাম ইবনে আব্বাস (রা.)',
    keyFiguresEn: 'Shuqran (RA), Ali (RA), Al-Fadl & Qutham ibn Abbas (RA)',
    extendedContextBn:
      'শুকরান (রা.)-এর প্রকৃত নাম ছিল সালিহ ইবনে আদী, তিনি ছিলেন রাসূলুল্লাহ ﷺ-এর প্রিয় আজাদকৃত গোলাম। নবীজি ﷺ জীবদ্দশায় যে লাল মখমলি চাদরটি গায়ে জড়াতেন ও বিছাতেন, দাফনের মুহূর্তে শুকরান (রা.) আবেগাপ্লুত হয়ে সেটি কবরের তলদেশে বিছিয়ে দেন যাতে নবীজির ব্যবহৃত সেই স্মৃতিচিহ্ন আর কারও ব্যবহারে না আসে। হযরত ইবনে আব্বাস (রা.) সহীহ মুসলিমে এই ঘটনাটি স্পষ্টভাবে বর্ণনা করেছেন।',
    extendedContextEn:
      'Shuqran (Salih ibn Adi, RA), the Prophet’s devoted freedman, acted out of overwhelming reverence so that the red velvety Qatifah the Prophet ﷺ wore in life would never be worn by another. Ibn Abbas (RA) preserved this touching historical detail in Sahih Muslim.',
    references: [
      {
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        chapterBn: 'কিতাবুল জানায়েয (কবরে চাদর বিছানো প্রসঙ্গ)',
        chapterEn: 'Book of Funerals (Spreading the Mantle in the Grave)',
        citationBn: 'হাদিস নং ৯৬৭',
        citationEn: 'Hadith 967',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  29: {
    locationBn: 'মদিনা মুনাওয়ারা (মসজিদে নববী, সাকিফা ও হুজরায়ে আয়েশা রা.)',
    locationEn: 'Madinah (Masjid an-Nabawi, Saqifah & Aisha’s Chamber)',
    keyFiguresBn: 'আহলে বাইত, হযরত আবু বকর (রা.), হযরত উমর (রা.) ও সমগ্র সাহাবায়ে কিরাম',
    keyFiguresEn: 'Ahl al-Bayt, Abu Bakr (RA), Umar (RA) & the Companions',
    extendedContextBn:
      'সোমবার দুপুরের (চাশতের শেষভাগ বা যোহরের আগে) ইন্তেকাল থেকে মঙ্গলবার সারাদিন পেরিয়ে বুধবারের মধ্যরাতে দাফন পর্যন্ত সময়টি ছিল প্রায় ৩৬ থেকে ৪০ ঘণ্টা। সীরাত বিশেষজ্ঞগণ এই সময়সীমাকে চারটি স্পষ্ট পর্বে চিহ্নিত করেছেন: সোমবার দুপুর (ইন্তেকাল ও আবু বকরের ভাষণ), সোমবার বিকেল (সাকিফায় ঐকমত্য), মঙ্গলবার সকাল (মসজিদে নববীতে সাধারণ বাইয়াত), এবং মঙ্গলবার দুপুর থেকে বুধবার রাত (গোসল, কাফন, দলে দলে জানাজা ও দাফন)। এই সুশৃঙ্খল ধারাবাহিকতাই ইসলামের অস্তিত্ব ও ঐক্যকে চিরস্থায়ী ভিত্তি দিয়েছিল।',
    extendedContextEn:
      'Scholars map these ~36–40 hours across four unmistakable milestones: Monday midday (passing and Abu Bakr’s steadying address), Monday afternoon (Saqifah consensus), Tuesday morning (public Bay‘ah in the mosque), and Tuesday midday through Wednesday midnight (Ghusl, shrouding, continuous group prayers, and burial)—preserving both the Prophet’s rights and the survival of the Ummah.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয (সোমবার ইন্তেকাল প্রমাণ)',
        chapterEn: 'Book of Funerals (Monday Passing)',
        citationBn: 'হাদিস নং ১৩৮৭',
        citationEn: 'Hadith 1387',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'মুসনাদে আহমাদ',
        bookEn: 'Musnad Ahmad',
        chapterBn: 'মুসনাদে আয়েশা (রা.) — বুধবার রাতে দাফন',
        chapterEn: 'Musnad of Aisha (RA) — Wednesday Night Burial',
        citationBn: 'হাদিস নং ২৪৭৯০',
        citationEn: 'Hadith 24790',
        gradeBn: 'হাসান / সহীহ লি-গাইরিহি',
        gradeEn: 'Hasan / Sahih',
      },
    ],
  },
  30: {
    locationBn: 'মদিনা মুনাওয়ারা (হুজরায়ে আয়েশা রা. সংলগ্ন)',
    locationEn: 'Madinah (Near Aisha’s Chamber)',
    keyFiguresBn: 'হযরত ফাতিমা আয-যাহরা (রা.), হযরত আনাস ইবনে মালিক (রা.)',
    keyFiguresEn: 'Fatimah az-Zahra (RA), Anas ibn Malik (RA)',
    extendedContextBn:
      'ইন্তেকালের আগে নবীজি ﷺ কন্যা ফাতিমা (রা.)-কে কানে কানে দুটি কথা বলেছিলেন: প্রথমটিতে তিনি কেঁদেছিলেন (নবীজির আসন্ন বিদায়ের সংবাদে), আর দ্বিতীয়টিতে মুচকি হেসেছিলেন (কারণ নবীজি সুসংবাদ দিয়েছিলেন যে আহলে বাইতের মধ্যে ফাতিমাই সর্বপ্রথম তাঁর সাথে জান্নাতে মিলিত হবেন)। দাফনের পর সেই স্নেহময়ী কন্যা আর কখনো প্রকাশ্যে প্রাণ খুলে হাসেননি, এবং ছয় মাস পরেই রমজান মাসে তিনিও রবের সান্নিধ্যে চলে যান।',
    extendedContextEn:
      'Before passing, the Prophet ﷺ had whispered to Fatimah (RA) that she would be the very first of his household to reunite with him in Paradise. After his burial, her heartbroken question to Anas (“How could your souls bear to pour earth over the Messenger of Allah?”) echoed the grief of the entire Ummah; six months later, she joined her beloved father.',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী (নবী ﷺ-এর অসুস্থতা ও ওফাত)',
        chapterEn: 'Book of Military Expeditions (Illness & Passing of the Prophet)',
        citationBn: 'হাদিস নং ৪৪৬২',
        citationEn: 'Hadith 4462',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  31: {
    locationBn: 'মদিনা মুনাওয়ারা',
    locationEn: 'Al-Madinah al-Munawwarah',
    keyFiguresBn: 'হযরত আনাস ইবনে মালিক (রা.)',
    keyFiguresEn: 'Anas ibn Malik (RA)',
    extendedContextBn:
      'হযরত আনাস (রা.) মাত্র দশ বছর বয়স থেকে দীর্ঘ দশটি বছর রাসূলুল্লাহ ﷺ-এর ছায়াসঙ্গী হয়ে খেদমত করেছেন। তিনি বর্ণনা করেন—হিজরতের দিন যেমন মদিনার প্রতিটি বাড়িঘর, গাছপালা ও মানুষের মুখমণ্ডল ঈমানি নূরে উদ্ভাসিত হয়ে উঠেছিল, নবীজির প্রয়াণের দিন ঠিক তার উল্টো এক গহীন আঁধার যেন সবকিছু গ্রাস করে নিল। তাঁর সান্নিধ্যে সাহাবিদের অন্তরে যে কোমলতা ও স্বর্গীয় প্রশান্তি ছিল, কবরের মাটি ঝাড়ার আগেই তাঁরা তার গভীর শূন্যতা অনুভব করলেন।',
    extendedContextEn:
      'Having served the Prophet ﷺ daily for ten years from childhood, Anas ibn Malik (RA) felt the contrast more vividly than almost anyone alive: the day the Prophet entered Madinah illuminated every corner of the city, and the day he departed left an immediate void felt before the burial dust even left their palms.',
    references: [
      {
        bookBn: 'জামে আত-তিরমিযী',
        bookEn: 'Jami‘ at-Tirmidhi',
        chapterBn: 'কিতাবুল মানাকিব (নবী ﷺ-এর মর্যাদা ও ওফাত)',
        chapterEn: 'Book of Virtues',
        citationBn: 'হাদিস নং ৩৬১৮',
        citationEn: 'Hadith 3618',
        gradeBn: 'সহীহ (ইমাম তিরমিযী হাসান সহীহ গারীব বলেছেন)',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'মুসনাদে আহমাদ ও সুনান ইবনে মাজাহ',
        bookEn: 'Musnad Ahmad & Sunan Ibn Majah',
        chapterBn: 'কিতাবুল জানায়েয',
        chapterEn: 'Book of Funerals',
        citationBn: 'ইবনে মাজাহ: ১৬৩১; আহমাদ: ১৩৩৮৭',
        citationEn: 'Ibn Majah 1631; Ahmad 13387',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  32: {
    locationBn: 'হযরত উম্মে আইমান (রা.)-এর গৃহ, মদিনা',
    locationEn: 'Home of Umm Ayman (RA), Madinah',
    keyFiguresBn: 'হযরত উম্মে আইমান বারাকাহ (রা.), হযরত আবু বকর (রা.), হযরত উমর (রা.)',
    keyFiguresEn: 'Umm Ayman Barakah (RA), Abu Bakr (RA), Umar (RA)',
    extendedContextBn:
      'উম্মে আইমান (রা.)-এর প্রকৃত নাম ছিল বারাকাহ; নবীজি ﷺ তাঁকে ‘মায়ের পরে আমার মা’ বলে সম্মান করতেন এবং প্রায়ই তাঁর খোঁজখবর নিতে বাসায় যেতেন। তাঁর সুন্নাহ জীবিত রাখতে খলিফা আবু বকর (রা.) ও উমর (রা.) তাঁর বাসায় যান। উম্মে আইমান (রা.)-এর কান্নার কারণ—‘আসমান থেকে ওহি আসা চিরতরে বন্ধ হয়ে গেল’—শোনার পর দুই মহাবীর খলিফাও শিশুর মতো অঝোরে কেঁদে উঠলেন। এটি ছিল নবীপ্রেম ও ওহির প্রতি ভালোবাসার এক অমর উপাখ্যান।',
    extendedContextEn:
      'Honoring the Prophet’s habit of visiting his cherished childhood caretaker Barakah (Umm Ayman, RA), Abu Bakr and Umar went to comfort her. Her profound reply—that she wept because direct revelation from heaven to earth had ended forever—unlocked tears in both leaders, closing the chronicle of the Prophet’s departure with timeless spiritual awe.',
    references: [
      {
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        chapterBn: 'কিতাবু ফাদায়িলিস সাহাবাহ (উম্মে আইমান রা.-এর মর্যাদা)',
        chapterEn: 'Book of Virtues of the Companions (Merits of Umm Ayman)',
        citationBn: 'হাদিস নং ২৪৫৪',
        citationEn: 'Hadith 2454',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
};
