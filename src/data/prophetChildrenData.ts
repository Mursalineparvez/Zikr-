/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HadithReferenceItem } from './prophet40HoursExtended';

export interface ChildrenPartMeta {
  partNo: number;
  childNameBn: string;
  childNameEn: string;
  titleBn: string;
  titleEn: string;
  arabicTitle: string;
  subtitleBn: string;
  subtitleEn: string;
  accentHex: string;
  eventCount: number;
}

export interface ChildrenEvent {
  no: number; // 1 to 12
  partNo: number; // 1 to 7 corresponding to children/chapters
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

export const CHILDREN_PARTS: ChildrenPartMeta[] = [
  {
    partNo: 1,
    childNameBn: 'কাসিম',
    childNameEn: 'Qasim',
    titleBn: 'পর্ব ১ · কাসিম (প্রথম সন্তান)',
    titleEn: 'Part 1 · Qasim (Firstborn Son)',
    arabicTitle: 'القاسم بن محمد ﷺ',
    subtitleBn: 'নবুওয়তের আগে মক্কায় জন্ম, শৈশবে ইন্তেকাল ও ‘আবুল কাসিম’ কুনিয়াত',
    subtitleEn: 'Birth in Makkah before prophethood, infant passing & the Kunyah “Abul Qasim”',
    accentHex: '#059669',
    eventCount: 1,
  },
  {
    partNo: 2,
    childNameBn: 'যায়নাব (রা.)',
    childNameEn: 'Zaynab (RA)',
    titleBn: 'পর্ব ২ · যায়নাব (রা.) (বড় মেয়ে)',
    titleEn: 'Part 2 · Zaynab (RA) (Eldest Daughter)',
    arabicTitle: 'زينب بنت محمد ﷺ',
    subtitleBn: 'আবু আল-আসের সঙ্গে বিবাহ, বদর যুদ্ধে মায়ের হার দিয়ে মুক্তিপণ ও ৮ হিজরিতে ইন্তেকাল',
    subtitleEn: 'Marriage to Abu al-As, ransom necklace at Badr & passing in 8 AH',
    accentHex: '#0d9488',
    eventCount: 3,
  },
  {
    partNo: 3,
    childNameBn: 'রুকাইয়া (রা.)',
    childNameEn: 'Ruqayyah (RA)',
    titleBn: 'পর্ব ৩ · রুকাইয়া (রা.) (দ্বিতীয় মেয়ে)',
    titleEn: 'Part 3 · Ruqayyah (RA) (Second Daughter)',
    arabicTitle: 'رقية بنت محمد ﷺ',
    subtitleBn: 'উসমান (রা.)-এর সঙ্গে বিবাহ, হাবশায় হিজরত ও বদরের দিনে ইন্তেকাল',
    subtitleEn: 'Marriage to Uthman (RA), Abyssinian migration & passing on the day of Badr',
    accentHex: '#d97706',
    eventCount: 2,
  },
  {
    partNo: 4,
    childNameBn: 'উম্মে কুলসুম (রা.)',
    childNameEn: 'Umm Kulthum (RA)',
    titleBn: 'পর্ব ৪ · উম্মে কুলসুম (রা.) (তৃতীয় মেয়ে)',
    titleEn: 'Part 4 · Umm Kulthum (RA) (Third Daughter)',
    arabicTitle: 'أم كلثوم بنت محمد ﷺ',
    subtitleBn: 'উসমান (را.)-এর সঙ্গে বিবাহ, ‘যুন-নুরাইন’ উপাধি লাভ ও ৯ হিজরিতে ইন্তেকাল',
    subtitleEn: 'Marriage to Uthman (RA), title “Dhun-Nurayn” & passing in 9 AH',
    accentHex: '#2563eb',
    eventCount: 2,
  },
  {
    partNo: 5,
    childNameBn: 'ফাতিমা (রা.)',
    childNameEn: 'Fatimah (RA)',
    titleBn: 'পর্ব ৫ · ফাতিমা (را.) (ছোট মেয়ে)',
    titleEn: 'Part 5 · Fatimah (RA) (Youngest Daughter)',
    arabicTitle: 'فاطمة الزهراء بنت محمد ﷺ',
    subtitleBn: 'আলী (রা.)-এর সঙ্গে সংসার, তাসবীতে ফাতেমি ও জান্নাতের নারীদের নেত্রী',
    subtitleEn: 'Marriage to Ali (RA), Tasbih Fatimah & Leader of the Women of Paradise',
    accentHex: '#0f766e',
    eventCount: 3,
  },
  {
    partNo: 6,
    childNameBn: 'আব্দুল্লাহ',
    childNameEn: 'Abdullah',
    titleBn: 'পর্ব ৬ · আব্দুল্লাহ (ছেলে)',
    titleEn: 'Part 6 · Abdullah (Son)',
    arabicTitle: 'عبد الله بن محمد ﷺ',
    subtitleBn: 'তৈয়্যব ও তাহির উপাধি, শৈশবে ইন্তেকাল ও সূরা আল-কাউসার নাযিল',
    subtitleEn: 'Titles At-Tayyib & At-Tahir, infant passing & revelation of Surah Al-Kawthar',
    accentHex: '#4f46e5',
    eventCount: 1,
  },
  {
    partNo: 7,
    childNameBn: 'ইবরাহীম',
    childNameEn: 'Ibrahim',
    titleBn: 'পর্ব ৭ · ইবরাহীম (সর্বশেষ সন্তান)',
    titleEn: 'Part 7 · Ibrahim (Youngest Son)',
    arabicTitle: 'إبراهيم بن محمد ﷺ',
    subtitleBn: 'মারিয়া কিবতিয়া (রা.)-এর গর্ভে জন্ম, দেড় বছর বয়সে ইন্তেকাল ও সূর্যগ্রহণ',
    subtitleEn: 'Birth to Maria al-Qibtiyyah (RA), passing at 18 months & solar eclipse',
    accentHex: '#b45309',
    eventCount: 2,
  },
];

export const CHILDREN_EVENTS: ChildrenEvent[] = [
  // PART 1: Qasim (1)
  {
    no: 1,
    partNo: 1,
    timeContextBn: 'নবুওয়তের পূর্বে · মক্কা মুকাররমা',
    timeContextEn: 'Before Prophethood · Makkah',
    titleBn: 'কাসিম: রাসূলের প্রথম সন্তান',
    titleEn: 'Qasim: The Firstborn Son',
    pointsBn: [
      'রাসূল ﷺ ও খাদিজা (রা.)-এর প্রথম সন্তান; নবুওয়তের আগে মক্কায় জন্ম।',
      'তাঁর নামেই রাসূল ﷺ-এর কুনিয়াত বা উপনাম হয় ‘আবুল কাসিম’। শৈশবেই মক্কায় ইন্তেকাল করেন।',
    ],
    pointsEn: [
      'First child of Prophet Muhammad ﷺ and Khadijah (RA), born in Makkah before prophethood.',
      'His name gave the Prophet ﷺ the revered Kunyah “Abul Qasim”; he passed away in infancy.',
    ],
    detailedNarrativeBn:
      'রাসূলুল্লাহ ﷺ ও উম্মুল মুমিনীন হযরত খাদিজা বিনতে খুওয়াইলিদ (রা.)-এর ঔরসে নবুওয়ত লাভের বহু পূর্বে মক্কা মুকাররমায় জন্মগ্রহণ করেন কাসিম। তিনি ছিলেন নবীজির জ্যেষ্ঠ সন্তান। তাঁর নামানুসারেই নবীজি ﷺ-এর কুনিয়াত বা সম্মানসূচক উপনাম হয়েছিল ‘আবুল কাসিম’ (কাসিমের পিতা)। ইসলাম ও জাহেলিয়াত উভয় যুগে এই কুনিয়াত অত্যন্ত মর্যাদার ছিল।',
    detailedNarrativeEn:
      'Born in Makkah to Prophet Muhammad ﷺ and Khadijah (RA) long before prophethood, Qasim was their eldest child. It was from his name that the Prophet ﷺ derived his beloved Kunyah, “Abul Qasim” (Father of Qasim).',
    extendedContextBn:
      'কাসিম অত্যন্ত অল্প বয়সে (শৈশবেই) মক্কায় ইন্তেকাল করেন। তিনি ছিলেন রাসূলুল্লাহ ﷺ-এর প্রথম সন্তান যিনি মৃত্যুর স্বাদ গ্রহণ করেন। তাঁর এই অকাল প্রয়াণ মাতা খাদিজা (را.) ও পিতা রাসূলুল্লাহ ﷺ-এর হৃদয়ে গভীর শোকের সৃষ্টি করেছিল।',
    extendedContextEn:
      'Qasim passed away in Makkah during infancy, becoming the very first of the Prophet’s children to return to Allah, leaving a deep maternal and paternal sorrow in the household of Khadijah and Muhammad ﷺ.',
    locationBn: 'মক্কা মুকাররমা',
    locationEn: 'Makkah al-Mukarramah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত খাদিজা (را.), কাসিম ইবনে মুহাম্মদ',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Khadijah (RA), Qasim ibn Muhammad',
    reflectionBn:
      'সন্তান হারানোর বেদনা পৃথিবীর শ্রেষ্ট মানুষটিও সহ্য করেছেন—যা শোকার্ত পিতা-মাতার জন্য চিরকালের সান্ত্বনা।',
    reflectionEn:
      'The pain of losing a child was tasted by the noblest of mankind, offering enduring solace to grieving parents.',
    sourceBn: 'ইবনে সা‘দ, আত-তাবাকাতুল কুবরা, খণ্ড ১, পৃষ্ঠা ১৩৩',
    sourceEn: 'Ibn Sa‘d, At-Tabaqat al-Kubra, Vol. 1, p. 133',
    references: [
      {
        bookBn: 'আত-তাবাকাতুল কুবরা (ইবনে সা‘দ)',
        bookEn: 'At-Tabaqat al-Kubra (Ibn Sa‘d)',
        chapterBn: 'ذكر أولاد رسول الله ﷺ',
        chapterEn: 'Chapter on the Children of the Messenger of Allah ﷺ',
        citationBn: 'খণ্ড ১, পৃষ্ঠা ১৩৩',
        citationEn: 'Vol. 1, p. 133',
        gradeBn: 'প্রামাণ্য সীরাত ও ইতিহাস সূত্র',
        gradeEn: 'Verified Seerah & History Source',
      },
    ],
  },

  // PART 2: Zaynab (2-4)
  {
    no: 2,
    partNo: 2,
    timeContextBn: 'নবুওয়তের প্রায় ১০ বছর আগে · মক্কা',
    timeContextEn: '~10 Years Before Prophethood · Makkah',
    titleBn: 'যায়নাব (রা.): পরিচয় ও বিয়ে',
    titleEn: 'Zaynab (RA): Identity & Marriage',
    pointsBn: [
      'রাসূল ﷺ-এর সবচেয়ে বড় মেয়ে; নবুওয়তের প্রায় দশ বছর আগে জন্ম।',
      'খালাতো ভাই আবুল আস ইবনে রাবি’-এর সঙ্গে তাঁর বিয়ে হয়। মা খাদিজা (را.)-এর সঙ্গে শুরুতেই ইসলাম গ্রহণ করেন।',
    ],
    pointsEn: [
      'The eldest daughter of the Prophet ﷺ, born about ten years before prophethood.',
      'Married her maternal cousin Abu al-As ibn Rabi‘; she embraced Islam early alongside her mother Khadijah (RA).',
    ],
    detailedNarrativeBn:
      'হযরত যায়নাব (را.) ছিলেন রাসূলুল্লাহ ﷺ-এর জ্যেষ্ঠ কন্যা। নবুওয়ত লাভের প্রায় দশ বছর পূর্বে তিনি মক্কায় জন্মগ্রহণ করেন। প্রাপ্তবয়স্ক হওয়ার পর তাঁর খালা হালা বিনতে হুওয়াইলিদের পুত্র আবুল আস ইবনে রাবি’র সাথে তাঁর বিবাহ সম্পন্ন হয়। আবুল আস ছিলেন মক্কার অন্যতম বিশ্বস্তর ও সম্মানিত বণিক।',
    detailedNarrativeEn:
      'Zaynab (RA) was the eldest daughter of the Prophet ﷺ, born around ten years before prophethood. She married her maternal cousin Abu al-As ibn Rabi‘, a respected and trustworthy merchant of Makkah.',
    extendedContextBn:
      'যখন মহান আল্লাহ রাসূলুল্লাহ ﷺ-কে নবুওয়ত দান করেন, তখন যায়নাব (را.) মাতা খাদিজা (را.) ও বোনদের সাথে সকালেই ইসলাম গ্রহণ করেন। তবে তাঁর স্বামী আবুল আস মক্কায় কুরাইশদের সাথে কুফরির ওপর অবিচল থাকেন, যার ফলে হিজরতের আগে দম্পতির মাঝে সাময়িক ভৌগোলিক দূরত্ব তৈরি হয়েছিল।',
    extendedContextEn:
      'When revelation descended, Zaynab (RA) embraced Islam eagerly alongside her mother, while her husband Abu al-As remained upon polytheism in Makkah for years—creating a poignant trial of faith and marriage.',
    locationBn: 'মক্কা মুকাররমা',
    locationEn: 'Makkah al-Mukarramah',
    keyFiguresBn: 'হযরত যায়নাব (را.), আবুল আস ইবনে রাবি’, রাসূলুল্লাহ ﷺ',
    keyFiguresEn: 'Zaynab (RA), Abu al-As ibn Rabi‘, Prophet Muhammad ﷺ',
    reflectionBn:
      'ঈমান ও দাম্পত্য সম্পর্কের এই ঐতিহাসিক পরীক্ষা ইসলামের প্রারম্ভিক যুগের এক অনন্য অধ্যায়।',
    reflectionEn:
      'Balancing loyalty to faith amidst marital separation proved the deep sincerity of the early believers.',
    sourceBn: 'ইবনে হিশাম, আস-সীরাতুন নাবাবিয়্যাহ, খণ্ড ২, পৃষ্ঠা ৬৫০',
    sourceEn: 'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 2, p. 650',
    references: [
      {
        bookBn: 'আস-সীরাতুন নাবাবিয়্যাহ (ইবনে হিশাম)',
        bookEn: 'As-Sirah an-Nabawiyyah (Ibn Hisham)',
        chapterBn: 'ذكر بنات رسول الله ﷺ',
        chapterEn: 'Chapter on the Daughters of the Prophet ﷺ',
        citationBn: 'খণ্ড ২, পৃষ্ঠা ৬৫০',
        citationEn: 'Vol. 2, p. 650',
        gradeBn: 'প্রামাণ্য সীরাত সূত্র',
        gradeEn: 'Verified Seerah Source',
      },
    ],
  },
  {
    no: 3,
    partNo: 2,
    timeContextBn: '২ হিজরি · বদর যুদ্ধ ও মদিনা',
    timeContextEn: '2 AH · Battle of Badr & Madinah',
    titleBn: 'বদর যুদ্ধ ও মায়ের দেওয়া হার',
    titleEn: 'The Battle of Badr & Khadijah’s Necklace',
    pointsBn: [
      'বদরে স্বামী আবুল আস মুসলমানদের হাতে বন্দি হন। মুক্তিপণ হিসেবে যায়নাব (را.) পাঠান মা খাদিজা (را.)-এর দেওয়া বিয়ের হার।',
      'হার দেখে রাসূল ﷺ আবেগাপ্লুত হন; সাহাবিদের সম্মতিতে হার ফেরত দিয়ে আবুল আসকে মুক্তি দেওয়া হয়।',
    ],
    pointsEn: [
      'Abu al-As was captured by Muslims at Badr; Zaynab (RA) sent her mother Khadijah’s wedding necklace as ransom.',
      'Seeing the necklace deeply moved the Prophet ﷺ; with the Companions’ consent, he returned it and freed Abu al-As.',
    ],
    detailedNarrativeBn:
      '২ হিজরিতে বদর যুদ্ধে কাফিরদের পক্ষে অংশ নিয়ে আবুল আস ইবনে রাবি’ মুসলিমদের বন্দি হন। মক্কার বন্দিদের মুক্তির নির্দেশ এলে যায়নাব (را.) মক্কা থেকে স্বামীর মুক্তিপণ হিসেবে কিছু সম্পদ ও একটি কণ্ঠহার পাঠালেন—যে হারটি বিয়ের সময় মাতা খাদিজা (را.) তাঁকে উপহার দিয়েছিলেন।',
    detailedNarrativeEn:
      'Fighting on the Quraysh side at Badr, Abu al-As was captured. To ransom him, Zaynab (RA) sent material goods along with a precious necklace given to her by her mother Khadijah (RA) on her wedding day.',
    extendedContextBn:
      'নবীজি ﷺ বন্দিমহলে খাদিজা (را.)-এর সেই হারটি দেখতে পেয়ে ভীষণ আবেগাপ্লুত হয়ে পড়েন এবং সাহাবিদের বললেন—“তোমরা যদি যায়নাবের বন্দিকে ছেড়ে দাও এবং তাঁর সমস্ত সম্পদ তাঁকে ফিরিয়ে দাও, তবে তা হবে অত্যন্ত সুন্দর।” সাহাবিরা তৎক্ষণাৎ সানন্দে রাজি হন এবং আবুল আসকে কোনো মুক্তিপণ ছাড়াই মক্কায় ফিরিয়ে দেওয়া হয়, শর্ত ছিল তিনি যেন যায়নাবকে মদিনায় পাঠিয়ে দেন।',
    extendedContextEn:
      'Recognizing Khadijah’s necklace, the Prophet ﷺ was moved to tears and asked the Companions to free Abu al-As and return the ransom out of love for Zaynab—upon condition that Abu al-As send Zaynab safely to Madinah.',
    locationBn: 'মদিনা মুনাওয়ারা ও মক্কা',
    locationEn: 'Madinah & Makkah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত যায়নাব (را.), আবুল আস ইবনে রাবি’',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Zaynab (RA), Abu al-As ibn Rabi‘',
    reflectionBn:
      'মায়ের স্মৃতিচিহ্ন কোরবানি করেও দ্বীনের টানে আত্মত্যাগের এক অনন্য নজির স্থাপন করেছিলেন যায়নাব (را.).',
    reflectionEn:
      'Parting with a cherished maternal keepsake for the sake of faith demonstrated Zaynab’s remarkable devotion.',
    sourceBn: 'সুনান আবু দাউদ, হাদিস নং ২৬৯২',
    sourceEn: 'Sunan Abi Dawud, Hadith 2692',
    references: [
      {
        bookBn: 'সুনান আবু দাউদ',
        bookEn: 'Sunan Abi Dawud',
        chapterBn: 'কিতাবুল জিহাদ (মুক্তিপণ ও বন্দি অধ্যায়)',
        chapterEn: 'Book of Jihad (Ransom of Captives)',
        citationBn: 'হাদিস নং ২৬৯২',
        citationEn: 'Hadith 2692',
        gradeBn: 'সহীহ / হাসান',
        gradeEn: 'Sahih / Hasan',
      },
    ],
  },
  {
    no: 4,
    partNo: 2,
    timeContextBn: '৮ হিজরি · মদিনা মুনাওয়ারা',
    timeContextEn: '8 AH · Madinah',
    titleBn: 'হিজরত, পুনর্মিলন ও ইন্তেকাল',
    titleEn: 'Hijrah, Reunion & Passing',
    pointsBn: [
      'মদিনায় হিজরতের পথে কুরাইশদের আক্রমণে তিনি উট থেকে পড়ে গুরুতর আহত হন।',
      'পরে আবুল আস ইসলাম গ্রহণ করে মদিনায় এলে রাসূল ﷺ যায়নাবকে আবার তাঁর কাছে ফিরিয়ে দেন। ৮ হিজরিতে ইন্তেকাল করেন।',
    ],
    pointsEn: [
      'During her migration to Madinah, Quraysh attackers struck her camel, causing her to fall and suffer severe injury.',
      'When Abu al-As later embraced Islam and arrived in Madinah, the Prophet ﷺ reunited them. She passed away in 8 AH.',
    ],
    detailedNarrativeBn:
      'চুক্তিমতো আবুল আস যায়নাব (را.)-কে মদিনায় পাঠানোর ব্যবস্থা করলে কিনানা ইবনে রবীলার সাথে তিনি উটে রওনা হন। কিন্তু মক্কার উপকণ্ঠে হাব্বার ইবনুল আসওয়াদ ও একদল কুরাইশ বর্শা দিয়ে উট আক্রমণ করলে যায়নাব (را.) গর্ভবতী অবস্থায় উট থেকে পড়ে গিয়ে গুরুতর আহত হন এবং সন্তান হারান। পরে আবুল আস ইসলাম গ্রহণ করে মদিনায় এলে নবীজি ﷺ নতুন মোহর ছাড়াই তাঁদের পুনরায় স্বামী-স্ত্রীরূপে ফিরিয়ে দেন।',
    detailedNarrativeEn:
      'As Zaynab set out for Madinah, Quraysh thugs attacked her camel, causing her to fall while pregnant and suffer severe trauma from which she never fully recovered. Years later, when Abu al-As accepted Islam and migrated to Madinah, the Prophet ﷺ restored her to him.',
    extendedContextBn:
      'হিজরতের সেই আঘাতের অসুস্থতা ও ক্ষোভের রেশ বয়েই হযরত যায়নাব (را.) ৮ হিজরির প্রথমার্ধে মদিনায় ইন্তেকাল করেন। নবীজি ﷺ নিজের বিশেষ চাদর তাঁর কাফনের জন্য দান করেন এবং উম্মুল মুমিনীন উম্মে আতিয়া (را.)-এর নেতৃত্বে সাহাবি নারীরা তাঁকে গোসল করান।',
    extendedContextEn:
      'Zaynab (RA) passed away in Madinah in 8 AH from lingering complications of those injuries. The Prophet ﷺ provided his own cloak for her shroud, and female Companions led by Umm Atiyyah (RA) bathed her.',
    locationBn: 'মদিনা মুনাওয়ারা',
    locationEn: 'Madinah',
    keyFiguresBn: 'হযরত যায়নাব (را.), আবুল আস ইবনে রাবি’, রাসূলুল্লাহ ﷺ',
    keyFiguresEn: 'Zaynab (RA), Abu al-As ibn Rabi‘, Prophet Muhammad ﷺ',
    reflectionBn:
      'দ্বীনের পথে হিজরত করতে গিয়ে সাহাবিদের ত্যাগ ও রক্ত ঝরার ইতিহাস মুসলিম উম্মাহর জন্য চিরস্মরণীয়।',
    reflectionEn:
      'The sacrifices and suffering endured by the Prophet’s family during Hijrah remain etched in our history.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১২৫৩; সুনান আত-তিরমিযী, হাদিস নং ১১৪৩',
    sourceEn: 'Sahih al-Bukhari, Hadith 1253; Jami‘ at-Tirmidhi, Hadith 1143',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয (মৃতের কাফনে চাদর দেওয়া)',
        chapterEn: 'Book of Funerals',
        citationBn: 'হাদিস নং ১২৫৩',
        citationEn: 'Hadith 1253',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'জামে আত-তিরমিযী',
        bookEn: 'Jami‘ at-Tirmidhi',
        chapterBn: 'কিতাবুন নিকাহ',
        chapterEn: 'Book of Marriage',
        citationBn: 'হাদিস নং ১১৪৩',
        citationEn: 'Hadith 1143',
        gradeBn: 'হাসান',
        gradeEn: 'Hasan',
      },
    ],
  },

  // PART 3: Ruqayyah (5-6)
  {
    no: 5,
    partNo: 3,
    timeContextBn: 'মাক্কী জীবন ও প্রথম হিজরত',
    timeContextEn: 'Makkan Period & First Abyssinian Migration',
    titleBn: 'রুকাইয়া (را.): বিয়ে ও হাবশায় হিজরত',
    titleEn: 'Ruqayyah (RA): Marriage & Migration to Abyssinia',
    pointsBn: [
      'প্রথমে আবু লাহাবের ছেলে উতবার সঙ্গে বিয়ে ঠিক হয়েছিল; সূরা লাহাব নাযিলের পর আবু লাহাব ছেলেকে সম্পর্ক ছিন্ন করতে বাধ্য করে।',
      'এরপর উসমান (را.)-এর সঙ্গে তাঁর বিয়ে হয়। স্বামীর সঙ্গে হাবশায় হিজরত করেন; সেখানেই ছেলে আব্দুল্লাহর জন্ম।',
    ],
    pointsEn: [
      'Initially betrothed to Utbah ibn Abi Lahab; after Surah Al-Lahab, Abu Lahab forced him to break the marriage.',
      'She then married Uthman (RA) and migrated with him to Abyssinia, giving birth to their son Abdullah there.',
    ],
    detailedNarrativeBn:
      'হযরত রুকাইয়া (را.) ছিলেন রাসূলুল্লাহ ﷺ-ria দ্বিতীয় কন্যা। নবুওয়তের পূর্বে আবু লাহাবের পুত্র উতবার সাথে তাঁর আকদ হয়েছিল। কিন্তু মক্কায় যখন সূরা লাহাব (‘তব্বাত ইদা আবু লাহাবিন’) নাযিল হলো, তখন ক্ষিপ্ত হয়ে আবু লাহাব তার ছেলেকে জোর করে রুকাইয়াকে তালাক দিতে বাধ্য করে। এরপর সৌভাগ্যবান সাহাবি হযরত উসমান ইবনে আফফান (را.)-এর সাথে তাঁর বিবাহ সম্পন্ন হয়।',
    detailedNarrativeEn:
      'Ruqayyah (RA) was the second daughter of the Prophet ﷺ. Betrothed before prophethood to Utbah ibn Abi Lahab, Abu Lahab forced his son to divorce her in fury after Surah Al-Lahab was revealed. Soon after, she was married to the noble Uthman ibn Affan (RA).',
    extendedContextBn:
      'মক্কার নির্যাতনে অতিষ্ঠ হয়ে উসমান (ra.) ও রুকাইয়া (را.) ইসলামের প্রথম কাফেলা হিসেবে হাবশায় (আফ্রিকার ইথিওপিয়া) হিজরত করেন। হাবশার মাটিতেই তাঁদের ঔরসে জন্ম নেয় একটি পুত্রসন্তান, যার নাম রাখা হয়েছিল আব্দুল্লাহ। পরে তিনি ‘আবুল আব্দুল্লাহ’ কুনিয়াতে পরিচিত হন।',
    extendedContextEn:
      'Fleeing Makkan persecution, Uthman and Ruqayyah joined the first migration to Abyssinia, where she gave birth to their son Abdullah, earning Uthman the Kunyah “Abul Abdullah.”',
    locationBn: 'মক্কা মুকাররমা ও হাবশা (ইথিওপিয়া)',
    locationEn: 'Makkah & Abyssinia (Ethiopia)',
    keyFiguresBn: 'হযরত রুকাইয়া (را.), হযরত উসমান ইবনে আফফান (را.)',
    keyFiguresEn: 'Ruqayyah (RA), Uthman ibn Affan (RA)',
    reflectionBn:
      'দ্বীনের জন্য ঘরবাড়ি ও দেশত্যাগ করে হাবশায় হিজরত ছিল উসমান ও রুকাইয়ার অবিস্মরণীয় কুরবানি।',
    reflectionEn:
      'Leaving homeland and comfort for the sake of faith defined the historic migration of Uthman and Ruqayyah.',
    sourceBn: 'ইবনে হিশাম, আস-সীরাতুন নাবাবিয়্যাহ, খণ্ড ১, পৃষ্ঠা ৩৫০',
    sourceEn: 'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, p. 350',
    references: [
      {
        bookBn: 'আত-তাবাকাতুল কুবরা (ইবনে সা‘দ)',
        bookEn: 'At-Tabaqat al-Kubra (Ibn Sa‘d)',
        chapterBn: 'ذكر رقية بنت رسول الله ﷺ',
        chapterEn: 'Chapter on Ruqayyah bint Rasulullah ﷺ',
        citationBn: 'খণ্ড ৮, পৃষ্ঠা ৩৬',
        citationEn: 'Vol. 8, p. 36',
        gradeBn: 'প্রামাণ্য ইতিহাস সূত্র',
        gradeEn: 'Verified History Source',
      },
    ],
  },
  {
    no: 6,
    partNo: 3,
    timeContextBn: '২ হিজরি · বদর যুদ্ধ',
    timeContextEn: '2 AH · Battle of Badr',
    titleBn: 'বদরের দিনে বিদায়',
    titleEn: 'Farewell on the Day of Badr',
    pointsBn: [
      'হাবশা থেকে ফিরে স্বামীর সঙ্গে মদিনায় হিজরত করেন।',
      'বদর যুদ্ধের সময় তিনি গুরুতর অসুস্থ হলে রাসূল ﷺ উসমান (را.)-কে তাঁর সেবায় থাকতে বলেন এবং বদরের যোদ্ধাদের সমান সোয়াব ও অংশ দেন।',
    ],
    pointsEn: [
      'Returning from Abyssinia, she migrated with her husband to Madinah.',
      'Falling severely ill during Badr, the Prophet ﷺ ordered Uthman (RA) to stay behind to nurse her, granting him the reward and share of a Badr veteran.',
    ],
    detailedNarrativeBn:
      'হাবশা থেকে ফিরে আসার পর উসমান ও রুকাইয়া মদিনায় হিজরত করেন। কিন্তু ২ হিজরিতে যখন মুসলিমরা বদর যুদ্ধের প্রস্তুতি নিচ্ছিলেন, ঠিক তখনই রুকাইয়া (را.) হামজিল বা গুটিবসন্ত ও তীব্র জ্বরে আক্রান্ত হয়ে গুরুতর অসুস্থ হয়ে পড়েন।',
    detailedNarrativeEn:
      'After returning from Abyssinia, Ruqayyah migrated to Madinah. However, as the Muslims prepared for the Battle of Badr in 2 AH, Ruqayyah fell gravely ill with severe fever and smallpox.',
    extendedContextBn:
      'নবীজি ﷺ জামাতা উসমান (را.)-কে ময়দানে যাওয়ার পরিবর্তে হুজরায় রুকাইয়ার সেবায় নিয়োজিত থাকার নির্দেশ দেন। বদর যুদ্ধের ঠিক সমসাময়িক সময়েই (বডরের বিজয়ের সুসংবাদ মদিনায় পৌঁছানোর দিনই) রুকাইয়া (را.) ইন্তেকাল করেন। নবীজি বদর থেকে ফিরে সরাসরি তাঁর কবরের পাশে গিয়ে দাঁড়িয়েছিলেন।',
    extendedContextEn:
      'The Prophet ﷺ instructed Uthman to remain behind to nurse his ailing wife. She passed away precisely on the day victory at Badr reached Madinah; upon returning, the Prophet went straight to her fresh grave.',
    locationBn: 'মদিনা মুনাওয়ারা',
    locationEn: 'Madinah',
    keyFiguresBn: 'হযরত রুকাইয়া (را.), হযরত উসমান (را.), রাসূলুল্লাহ ﷺ',
    keyFiguresEn: 'Ruqayyah (RA), Uthman (RA), Prophet Muhammad ﷺ',
    reflectionBn:
      'রোগীর সেবা ও শুশ্রূষা জিহাদের সমতুল্য সওয়াবের কাজ—উসমান (را.)-এর এই ঘটনা তারই অনন্য প্রমাণ।',
    reflectionEn:
      'Nursing the sick carries reward akin to striving in Allah’s path, as Uthman’s exemption at Badr proved.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩১৩০০',
    sourceEn: 'Sahih al-Bukhari, Hadith 3130',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মাগাযী (বদর যুদ্ধ ও উসমানের দায়িত্ব)',
        chapterEn: 'Book of Military Expeditions',
        citationBn: 'হাদিস নং ৩১৩০০, ৩৬৯৮, ৩৭০৫',
        citationEn: 'Hadith 3130, 3698, 3705',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },

  // PART 4: Umm Kulthum (7-8)
  {
    no: 7,
    partNo: 4,
    timeContextBn: 'মাক্কী জীবন ও মদিনা হিজরত',
    timeContextEn: 'Makkan Period & Madinan Hijrah',
    titleBn: 'উম্মে কুলসুম (را.): মক্কার জীবন',
    titleEn: 'Umm Kulthum (RA): Makkan Life & Hijrah',
    pointsBn: [
      'প্রথমে আবু লাহাবের আরেক ছেলে উতাইবার সঙ্গে বিয়ে ঠিক হয়েছিল; একই কারণে সেই সম্পর্কও ছিন্ন হয়।',
      'মক্কার কঠিন দিনগুলোতে তিনি পরিবারের সঙ্গেই ছিলেন, শি’বে আবু তালিবের অবরোধও সহ্য করেন। পরে পরিবারের সঙ্গে মদিনায় হিজরত করেন।',
    ],
    pointsEn: [
      'Initially betrothed to Utaybah ibn Abi Lahab; that engagement was similarly dissolved.',
      'Endured the harsh Makkan boycott in Shi‘b Abi Talib before migrating safely to Madinah.',
    ],
    detailedNarrativeBn:
      'হযরত উম্মে কুলসুম (را.) ছিলেন রাসূলুল্লাহ ﷺ-এর তৃতীয় কন্যা। রুকাইয়ার মতো তাঁরও আকদ হয়েছিল আবু লাহাবের ছোট ছেলে উতাইবার সাথে। কিন্তু সূরা লাহাব নাযিলের পর আবু লাহাবের নির্দেশে সেই সম্পর্কও ভেঙে দেওয়া হয়। তিনি মক্কার চরম নির্যাতনের দিনগুলোতে ও শি’বে আবু তালিবের তিন বছরের অবরোধে পরিবারের সাথে চরম কষ্ট সহ্য করেন।',
    detailedNarrativeEn:
      'Umm Kulthum (RA) was the third daughter of the Prophet ﷺ, initially betrothed to Utaybah ibn Abi Lahab before being severed like Ruqayyah’s engagement. She endured the agonizing three-year boycott in Shi‘b Abi Talib alongside her family.',
    extendedContextBn:
      'মদিনায় হিজরতের পর তিনি অন্যান্য উম্মাহাতুল মুমিনীন ও বোনদের সাথে মদিনায় নিরাপদ আশ্রয় লাভ করেন এবং ইসলামের প্রাথমিক সমাজ গঠনে অবিচল ভূমিকা পালন করেন।',
    extendedContextEn:
      'Following the migration to Madinah, she lived safely in the prophetic household and contributed steadfastly to the early Madinan community.',
    locationBn: 'মক্কা ও মদিনা মুনাওয়ারা',
    locationEn: 'Makkah & Madinah',
    keyFiguresBn: 'হযরত উম্মে কুলসুম (را.), রাসূলুল্লাহ ﷺ',
    keyFiguresEn: 'Umm Kulthum (RA), Prophet Muhammad ﷺ',
    reflectionBn:
      'পরিবারের সাথে কুরাইশদের নির্যাতন ও অবরোধ সহ্য করার মাধ্যমে তিনি ঈমানের অটল দৃঢ়তার পরিচয় দিয়েছিলেন।',
    reflectionEn:
      'Enduring severe persecution alongside her family molded her unshakeable resilience in faith.',
    sourceBn: 'ইবনে সা‘দ, আত-তাবাকাতুল কুবরা, খণ্ড ৮, পৃষ্ঠা ৩৮',
    sourceEn: 'Ibn Sa‘d, At-Tabaqat al-Kubra, Vol. 8, p. 38',
    references: [
      {
        bookBn: 'আত-তাবাকাতুল কুবরা (ইবনে সা‘দ)',
        bookEn: 'At-Tabaqat al-Kubra (Ibn Sa‘d)',
        chapterBn: 'ذكر أم كلثوم بنت رسول الله ﷺ',
        chapterEn: 'Chapter on Umm Kulthum bint Rasulullah ﷺ',
        citationBn: 'খণ্ড ৮, পৃষ্ঠা ৩৮',
        citationEn: 'Vol. 8, p. 38',
        gradeBn: 'প্রামাণ্য ইতিহাস সূত্র',
        gradeEn: 'Verified History Source',
      },
    ],
  },
  {
    no: 8,
    partNo: 4,
    timeContextBn: '৩ হিজরি · মদিনা মুনাওয়ারা',
    timeContextEn: '3 AH · Madinah',
    titleBn: '‘যুন-নুরাইন’-এর দ্বিতীয় আলো',
    titleEn: 'The Second Light of “Dhun-Nurayn”',
    pointsBn: [
      'বোন রুকাইয়া (را.)-এর ইন্তেকালের পর ৩ হিজরিতে রাসূল ﷺ তাঁকে উসমান (را.)-এর সঙ্গে বিয়ে দেন।',
      'নবীর দুই কন্যাকে বিয়ে করায় উসমান (را.) হন ‘যুন-নুরাইন’ (দুই আলোর অধিকারী)। ৯ হিজরিতে নিঃসন্তান অবস্থায় ইন্তেকাল করেন।',
    ],
    pointsEn: [
      'Following Ruqayyah’s passing, the Prophet ﷺ married her in 3 AH to Uthman (RA).',
      'Marrying two daughters of the Prophet earned Uthman the title “Dhun-Nurayn” (Possessor of Two Lights). Passed away childless in 9 AH.',
    ],
    detailedNarrativeBn:
      'প্রিয় কন্যা রুকাইয়া (را.)-এর ইন্তেকালের পর ৩ হিজরির রবিউল আউয়াল মাসে রাসূলুল্লাহ ﷺ তাঁর অপর কন্যা উম্মে কুলসুম (را.)-কে হযরত উসমান ইবনে আফফান (را.)-এর সাথে বিবাহ দেন। ইতিহাসের পাতায় এটি ছিল এক অনন্য ঘটনা—কোনো নবী ভিন্ন সময়ে পরপর দুই কন্যাকে একই ব্যক্তির সাথে বিবাহ দিয়েছিলেন।',
    detailedNarrativeEn:
      'In Rabi al-Awwal of 3 AH, following Ruqayyah’s passing, the Prophet ﷺ married his third daughter Umm Kulthum (RA) to Uthman ibn Affan (RA)—earning Uthman the unique title “Dhun-Nurayn” (The Possessor of Two Lights) as no other person in history married two daughters of a prophet successively.',
    extendedContextBn:
      'উম্মে কুলসুম (را.) ৯ হিজরির শাবান মাসে নিঃসন্তান অবস্থায় মদিনায় ইন্তেকাল করেন। নবীজি ﷺ তাঁর দাফনের সময় কবরের পাশে বসে দুচোখে অশ্রু ঝরাচ্ছিলেন। উসমান (را.)-এর হাতে দুই কন্যার অর্পণ নবীজির অন্তরের অগাধ আস্থার প্রতীক ছিল।',
    extendedContextEn:
      'Umm Kulthum (RA) passed away childless in Shaban of 9 AH. The Prophet ﷺ sat by her grave shedding tears during her burial, reflecting his profound paternal love and trust in Uthman.',
    locationBn: 'মদিনা মুনাওয়ারা',
    locationEn: 'Madinah',
    keyFiguresBn: 'হযরত উম্মে কুলসুম (را.), হযরত উসমান (را.), রাসূলুল্লাহ ﷺ',
    keyFiguresEn: 'Umm Kulthum (RA), Uthman (RA), Prophet Muhammad ﷺ',
    reflectionBn:
      'উসমান (রা.)-এর এই সৌভাগ্য প্রমাণ করে তিনি রাসূলুল্লাহ ﷺ-এর পরিবারে কতটা উচ্চ ও বিশ্বস্ত মর্যাদার অধিকারী ছিলেন।',
    reflectionEn:
      'Uthman’s marriage to two prophetic daughters highlights his extraordinary station and trust before the Prophet ﷺ.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১২৮৫',
    sourceEn: 'Sahih al-Bukhari, Hadith 1285',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল জানায়েয (কবরের পাশে বসা ও কান্না)',
        chapterEn: 'Book of Funerals',
        citationBn: 'হাদিস নং ১২৮৫, ৩৭০৫',
        citationEn: 'Hadith 1285, 3705',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },

  // PART 5: Fatimah (9-11)
  {
    no: 9,
    partNo: 5,
    timeContextBn: 'মাক্কী জীবন ও মদিনা',
    timeContextEn: 'Makkan Period & Madinah',
    titleBn: 'ফাতিমা (را.): বাবার সবচেয়ে প্রিয়',
    titleEn: 'Fatimah (RA): The Dearest to Her Father',
    pointsBn: [
      'চলাফেরা, কথা ও আচরণে তিনি ছিলেন রাসূল ﷺ-এর সবচেয়ে বেশি সদৃশ।',
      'তিনি এলে রাসূল ﷺ দাঁড়িয়ে যেতেন, চুমু খেতেন এবং নিজের জায়গায় বসাতেন। মক্কায় নামাজরত বাবার পিঠে কাফিররা ময়লা চাপালে ছোট ফাতিমাটাই তা সরিয়ে দেন।',
    ],
    pointsEn: [
      'In gait, speech, and mannerisms, she resembled the Prophet ﷺ more than anyone else.',
      'Whenever she entered, he would stand, kiss her, and seat her in his place. When disbelievers placed camel filth on the praying Prophet in Makkah, young Fatimah removed it.',
    ],
    detailedNarrativeBn:
      'হযরত ফাতিমা আয-যাহরা (را.) ছিলেন রাসূলুল্লাহ ﷺ-এর কনিষ্ঠা ও সবচেয়ে প্রিয় কন্যা। তাঁর হাঁটাচলা, কথা বলার ভঙ্গি ও শালীন আচরণে খোদ রাসূলুল্লাহ ﷺ-এর সুষমা প্রতিফলিত হতো। হযরত আয়েশা (را.) সাক্ষ্য দিয়েছেন—‘চলাফেরা ও শান্ত স্বভাবের দিক দিয়ে ফাতিমার চেয়ে রাসূলের সাথে সাদৃশ্যপূর্ণ আর কাউকে আমি দেখিনি।’',
    detailedNarrativeEn:
      'Fatimah az-Zahra (RA) was the youngest and dearest daughter of the Prophet ﷺ. In her walk, speech, and noble bearing, she bore an uncanny resemblance to the Prophet ﷺ himself, as Aisha (RA) readily testified.',
    extendedContextBn:
      'ফাতিমা (را.) যখনই নবীজির হুজরায় প্রবেশ করতেন, রাসূলুল্লাহ ﷺ পরম স্নেহে নিজ আসন ছেড়ে দাঁড়িয়ে যেতেন, তাঁর কপালে চুম্বন করতেন এবং নিজের জায়গায় বসাতেন। মক্কার প্রাথমিক দিনে কাফিরদের ন্যাক্কারজনক উৎপীড়নের সময়ও কচি হাতে তিনি বাবার পিঠ থেকে উটের নাড়িভুঁড়ি পরিষ্কার করেছিলেন।',
    extendedContextEn:
      'Whenever Fatimah entered, the Prophet ﷺ would stand up to greet her, kiss her forehead, and seat her in his own place. During the brutal days in Makkah, it was young Fatimah who bravely rushed to remove filth thrown upon her praying father.',
    locationBn: 'মক্কা ও মদিনা মুনাওয়ারা',
    locationEn: 'Makkah & Madinah',
    keyFiguresBn: 'হযরত ফাতিমা আয-যাহরা (را.), রাসূলুল্লাহ ﷺ, হযরত আয়েশা (را.)',
    keyFiguresEn: 'Fatimah az-Zahra (RA), Prophet Muhammad ﷺ, Aisha (RA)',
    reflectionBn:
      'পিতার প্রতি সন্তানের ভক্তি ও আদব এবং সন্তানের প্রতি পিতার অমলিন ভালোবাসা ও সম্মানের সর্বোচ্চ রূপ ছিল তাঁদের এই সম্পর্ক।',
    reflectionEn:
      'Their bond exemplified the purest height of filial devotion and paternal tenderness.',
    sourceBn: 'সুনান আবু দাউদ, হাদিস নং ৫২১৭; সহীহ আল-বুখারী, হাদিস নং ২৪০',
    sourceEn: 'Sunan Abi Dawud, Hadith 5217; Sahih al-Bukhari, Hadith 240',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল ওজু ও কিতাবুল মানাকিব',
        chapterEn: 'Book of Ablution & Book of Virtues',
        citationBn: 'হাদিস নং ২৪০, ৩৬২৩, ৬২৮৫',
        citationEn: 'Hadith 240, 3623, 6285',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'সুনান আবু দাউদ',
        bookEn: 'Sunan Abi Dawud',
        chapterBn: 'কিতাবুল আদব',
        chapterEn: 'Book of General Behavior',
        citationBn: 'হাদিস নং ৫২১৭',
        citationEn: 'Abi Dawud 5217',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 10,
    partNo: 5,
    timeContextBn: '২ হিজরি · মদিনা মুনাওয়ারা',
    timeContextEn: '2 AH · Madinah',
    titleBn: 'আলী (রা.)-এর সঙ্গে সংসার',
    titleEn: 'Marriage to Ali (RA) & Simple Household',
    pointsBn: [
      '২ হিজরিতে আলী (را.)-এর সঙ্গে বিয়ে হয়; মোহর ছিল আলীর একটি বর্ম।',
      'জাঁতা ঘুরিয়ে হাতে দাগ পড়ায় একজন খাদেম চাইলে রাসূল ﷺ শেখান ঘুমের আগে ৩৩ বার সুবহানাল্লাহ, ৩৩ বার আলহামদুলিল্লাহ, ৩৪ বার আল্লাহু আকবারের তাসবীহ।',
    ],
    pointsEn: [
      'Married Ali (RA) in 2 AH with an iron shield as her entire dower.',
      'When manual grinding left her hands calloused, the Prophet ﷺ taught them the Tasbih Fatimah before sleep: 33 Subhanallah, 33 Alhamdulillah, 34 Allahu Akbar.',
    ],
    detailedNarrativeBn:
      '২ হিজরির জিলহজ মাসে রাসূলুল্লাহ ﷺ তাঁর আদরের কন্যা ফাতিমা (را.)-কে আসাদুল্লাহ হযরত আলী ইবনে আবী তালিব (را.)-এর সাথে বিবাহ দেন। আলী (را.) অত্যন্ত দরিদ্র থাকায় তাঁর কাছে মোহরানা দেওয়ার মতো নগদ অর্থ ছিল না; নবীজির পরামর্শে তিনি নিজের একটি লোহার বর্ম মোহর হিসেবে প্রদান করেন।',
    detailedNarrativeEn:
      'In Dhu al-Hijjah of 2 AH, the Prophet ﷺ married Fatimah (RA) to Ali ibn Abi Talib (RA). With Ali having little material wealth, he offered his iron shield as her dower upon the Prophet’s suggestion.',
    extendedContextBn:
      'তাঁদের সংসার জীবন ছিল অত্যন্ত অনাড়ম্বর। পাথরের জাঁতা ঘুরিয়ে ময়দা পেষতে পেষতে ফাতিমা (را.)-এর হাতে কড়া পড়ে গিয়েছিল। একবার তিনি খাদেম চাইতে এলে নবীজি ﷺ খাদেম না দিয়ে শিখিয়ে দেন—“প্রতি রাতে ঘুমানোর আগে ৩৩ বার সুবহানাল্লাহ, ৩৩ বার আলহামদুলিল্লাহ এবং ৩৪ বার আল্লাহু আকবারের তাসবীহ পড়ো—এটি যেকোনো খাদেমের চেয়েও তোমার জন্য বহুগুণ কল্যাণকর।”',
    extendedContextEn:
      'Their household was a model of austere simplicity. When Fatimah once asked for a servant to help with grinding grain, the Prophet ﷺ gifted her instead the spiritual litany known as “Tasbih Fatimah” to recite before sleep.',
    locationBn: 'মদিনা মুনাওয়ারা',
    locationEn: 'Madinah',
    keyFiguresBn: 'হযরত ফাতিমা (را.), হযরত আলী ইবনে আবী তালিব (را.), রাসূলুল্লাহ ﷺ',
    keyFiguresEn: 'Fatimah (RA), Ali ibn Abi Talib (RA), Prophet Muhammad ﷺ',
    reflectionBn:
      'দুনিয়ার চাকচিক্য নয়, বরং জিকির ও ধৈর্যের ওপর প্রতিষ্ঠিত জীবনই জান্নাতি জীবনের প্রকৃত প্রস্তুতি।',
    reflectionEn:
      'A life anchored in remembrance of Allah and patience surpasses worldly luxury.',
    sourceBn: 'সুনান আবু দাউদ, হাদিস নং ২১২৫; সহীহ আল-বুখারী, হাদিস নং ৩৭০৫',
    sourceEn: 'Sunan Abi Dawud, Hadith 2125; Sahih al-Bukhari, Hadith 3705',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মানাকিব ও কিতাবুদ দাওয়াত',
        chapterEn: 'Book of Virtues & Book of Supplications',
        citationBn: 'হাদিস নং ৩৭০৫, ৫৩৬১, ৬৩১৮',
        citationEn: 'Hadith 3705, 5361, 6318',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        bookBn: 'সুনান আবু দাউদ',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুন নিকাহ',
        chapterEn: 'Book of Marriage',
        citationBn: 'হাদিস নং ২১২৫',
        citationEn: 'Hadith 2125',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 11,
    partNo: 5,
    timeContextBn: '১১ হিজরি · মদিনা মুনাওয়ারা',
    timeContextEn: '11 AH · Madinah',
    titleBn: 'জান্নাতের নারীদের নেত্রী',
    titleEn: 'Leader of the Women of Paradise',
    pointsBn: [
      'রাসূল ﷺ বলেছেন, ‘ফাতিমা আমার অংশ’; যে তাঁকে কষ্ট দেয়, সে রাসূলকেই কষ্ট দেয়।',
      'শেষ অসুস্থতায় রাসূল ﷺ চুপিচুপি তাঁকে জানান, তিনিই হবেন জান্নাতের নারীদের নেত্রী এবং পরিবারের মধ্যে সবার আগে বাবার সঙ্গে মিলিত হবেন।',
    ],
    pointsEn: [
      'The Prophet ﷺ declared: “Fatimah is a part of me; whoever angers her angers me.”',
      'In his final illness, he whispered that she would be the leader of the women of Paradise and the first of his household to join him.',
    ],
    detailedNarrativeBn:
      'রাসূলুল্লাহ ﷺ ফাতিমা (را.)-এর মর্যাদা প্রকাশ করে অত্যন্ত জোরালো ভাষায় বলেছেন—“ফাতিমা আমার দেহের একটি অংশ; যা তাঁকে কষ্ট দেয়, তা আমাকেও কষ্ট দেয়; আর যা তাঁকে রাগান্বিত করে, তা আমাকেও রাগান্বিত করে।” তাঁর এই অমর বাণী ফাতিমা (را.)-এর অসীম সম্মানের সাক্ষ্য বহন করে।',
    detailedNarrativeEn:
      'Highlighting her sublime station, the Prophet ﷺ proclaimed: “Fatimah is a piece of me; whatever disturbs her disturbs me, and whatever harms her harms me.”',
    extendedContextBn:
      'ইন্তেকালের আগের সেই শেষ অসুস্থতায় নবীজি ﷺ যখন ফাতিমা (را.)-কে ফিসফিস করে জানান যে তিনি দুনিয়া ছেড়ে চলে যাচ্ছেন, তখন তিনি কেঁদেছিলেন; কিন্তু যখন নবীজি সুসংবাদ দিলেন যে আহলে বাইতের মধ্যে তিনিই সবার আগে বাবার সাথে জান্নাতে মিলিত হবেন এবং তিনি হবেন ‘সায়্যিদাতু নিসাইল জান্নাহ’ (জান্নাতের নারীদের নেত্রী), তখন তিনি মুচকি হেসেছিলেন। রাসূলের ইন্তেকালের ঠিক ছয় মাস পরেই তিনি মদিনায় ইন্তেকাল করেন।',
    extendedContextEn:
      'When the Prophet shared his impending departure with her, she wept; but his assurance that she would be chief of the women of Paradise and join him first brought her profound joy. She passed away exactly six months after her father.',
    locationBn: 'হুজরায়ে আয়েশা (را.) ও ফাতিমার গৃহ, মদিনা',
    locationEn: 'Madinah',
    keyFiguresBn: 'হযরত ফাতিমা (را.), রাসূলুল্লাহ ﷺ, হযরত আয়েশা (را.)',
    keyFiguresEn: 'Fatimah (RA), Prophet Muhammad ﷺ, Aisha (RA)',
    reflectionBn:
      'পিতার প্রতি অগাধ ভালোবাসা ও পরকালের সুসংবাদই ছিল ফাতিমা (را.)-এর জীবনের শ্রেষ্ঠ সান্ত্বনা।',
    reflectionEn:
      'Deep filial love and the prophetic promise of Paradise sustained Fatimah (RA) through her profound grief.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৭১৪, ৩৬২৪, ৪২৮০',
    sourceEn: 'Sahih al-Bukhari, Hadith 3714, 3624, 4280',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল মানাকিব (ফাতিমা রা.-এর মর্যাদা)',
        chapterEn: 'Book of Virtues',
        citationBn: 'হাদিস নং ৩৭১৪, ৩৬২৪, ৪২৮০',
        citationEn: 'Hadith 3714, 3624, 4280',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },

  // PART 6: Abdullah (12)
  {
    no: 12,
    partNo: 6,
    timeContextBn: 'নবুওয়তের প্রাক্কাল · মক্কা মুকাররমা',
    timeContextEn: 'Early Prophethood · Makkah',
    titleBn: 'আব্দুল্লাহ: তৈয়্যব ও তাহির',
    titleEn: 'Abdullah: At-Tayyib & At-Tahir',
    pointsBn: [
      'রাসূল ﷺ ও খাদিজা (را.)-এর সন্তান; উপাধি ছিল ‘তৈয়্যব’ ও ‘তাহির’ (পবিত্র)।',
      'শৈশবেই মক্কায় ইন্তেকাল করেন। ছেলেদের মৃত্যুর পর কাফিররা রাসূল ﷺ-কে ‘আবতার’ (নির্বংশ) বলে উপহাস করলে আল্লাহ নাযিল করেন সূরা কাউসার।',
    ],
    pointsEn: [
      'Son of the Prophet ﷺ and Khadijah (RA), honored with the titles “At-Tayyib” and “At-Tahir” (The Pure).',
      'Passed away in infancy in Makkah. When Quraysh mocked the Prophet as “Abtar” (childless), Allah revealed Surah Al-Kawthar.',
    ],
    detailedNarrativeBn:
      'হযরত আব্দুল্লাহ ছিলেন রাসূলুল্লাহ ﷺ ও হযরত খাদিজা (را.)-এর ঔরসে জন্ম নেওয়া অন্যতম পুত্রসন্তান। তাঁকে ‘তৈয়্যব’ ও ‘তাহির’ (পবিত্র ও পরিচ্ছন্ন) উপাধিতে ভূষিত করা হয়েছিল, কারণ তিনি নবুওয়ত লাভের পর জন্মগ্রহণ করেছিলেন। দুর্ভাগ্যের বিষয়, কাসিমের মতো তিনিও শৈশবেই মক্কায় ইন্তেকাল করেন।',
    detailedNarrativeEn:
      'Abdullah was a beloved son of the Prophet ﷺ and Khadijah (RA), born after prophethood and thus given the honorable titles “At-Tayyib” and “At-Tahir” (The Pure). Like Qasim, he passed away in infancy.',
    extendedContextBn:
      'পুত্রসন্তানদের ইন্তেকালের পর মক্কার অভাগা কাফির ও মুশরিকরা (যেমন আস ইবনে ওয়ায়েল) রাসূলুল্লাহ ﷺ-কে ‘আবতার’ বা নির্বংশ বলে ব্যঙ্গ ও উপহাস করত। তখন মহান আল্লাহ সান্ত্বনা দিয়ে পবিত্র সূরা আল-কাউসার নাযিল করেন—“নিশ্চয়ই আমি আপনাকে কাউসার দান করেছি... আপনার শত্রুই তো নির্বংশ।”',
    extendedContextEn:
      'Cruel disbelievers mocked the Prophet ﷺ as “Abtar” (severed of progeny) upon Abdullah’s passing. In response, Allah revealed Surah Al-Kawthar, assuring him that his legacy and spiritual lineage would endure eternally.',
    locationBn: 'মক্কা মুকাররমা',
    locationEn: 'Makkah al-Mukarramah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, হযরত খাদিজা (را.), আব্দুল্লাহ',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Khadijah (RA), Abdullah',
    reflectionBn:
      'শত্রুর উপহাস ও আঘাতের জবাবে আল্লাহর পক্ষ থেকে অবতীর্ণ সান্ত্বনা ও রহমতই মুমিনের সর্বশ্রেষ্ঠ শক্তি।',
    reflectionEn:
      'Divine solace and the promise of eternal abundance silence every mockery of disbelievers.',
    arabicQuote: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
    sourceBn: 'সূরা আল-কাউসার: ৩; ইবনে সা‘দ, খণ্ড ১, পৃষ্ঠা ১৩৩',
    sourceEn: 'Surah Al-Kawthar: 3; At-Tabaqat al-Kubra, Vol. 1, p. 133',
    references: [
      {
        bookBn: 'আল-কুরআনুল কারীম',
        bookEn: 'The Noble Quran',
        chapterBn: 'সূরা আল-কাউসার',
        chapterEn: 'Surah Al-Kawthar',
        citationBn: 'সূরা ১০৮ (কাউসার): ১–৩',
        citationEn: 'Quran 108:1–3',
        gradeBn: 'কুরআন মাজীদি আয়াত',
        gradeEn: 'Quranic Text',
      },
      {
        bookBn: 'আত-তাবাকাতুল কুবরা (ইবনে সা‘দ)',
        bookEn: 'At-Tabaqat al-Kubra (Ibn Sa‘d)',
        chapterBn: 'ذكر أولاد رسول الله ﷺ',
        chapterEn: 'Chapter on the Children of the Prophet ﷺ',
        citationBn: 'খণ্ড ১, পৃষ্ঠা ১৩৩',
        citationEn: 'Vol. 1, p. 133',
        gradeBn: 'প্রামাণ্য ইতিহাস সূত্র',
        gradeEn: 'Verified History Source',
      },
    ],
  },

  // PART 7: Ibrahim (13-14) -> we mapped 12 total events across 7 parts in 12 events
  {
    no: 13,
    partNo: 7,
    timeContextBn: '৮ হিজরি · মদিনা মুনাওয়ারা',
    timeContextEn: '8 AH · Madinah',
    titleBn: 'ইবরাহীম: মদিনার আনন্দ',
    titleEn: 'Ibrahim: The Joy of Madinah',
    pointsBn: [
      'মা মারিয়া কিবতিয়া (را.)-এর গর্ভে ৮ হিজরিতে মদিনায় জন্ম।',
      'রাসূল ﷺ বলেন, ‘আজ রাতে আমার একটি ছেলে হয়েছে, তার নাম রেখেছি আমার পিতা ইবরাহীমের নামে।’ দুগ্ধমায়ের ঘরে গিয়ে রাসূল ﷺ তাঁকে কোলে নিয়ে চুমু খেতেন।',
    ],
    pointsEn: [
      'Born in Madinah in 8 AH to Maria al-Qibtiyyah (RA).',
      'The Prophet ﷺ rejoiced: “Tonight a son was born to me, and I have named him after my forefather Ibrahim.” He would visit his wet nurse to hold and kiss him.',
    ],
    detailedNarrativeBn:
      '৮ হিজরির জিলহজ মাসে মিসরের রাজপ্রাসাদ থেকে প্রেরিত উম্মুল মুমিনীন মারিয়া কিবতিয়া (را.)-এর ঔরসে মদিনায় জন্মগ্রহণ করেন রাসূলুল্লাহ ﷺ-এর কনিষ্ঠ পুত্র হযরত ইবরাহীম (را.). তাঁর জন্ম সংবাদ পৌঁছালে নবীজি ﷺ আনন্দে আত্মহারা হয়ে সাহাবিদের মাঝে ঘোষণা করেন—‘আজ রাতে আমার একটি পুত্রসন্তান জন্ম নিয়েছে, আর আমি তার নাম রেখেছি আমার পিতা ইবরাহীম (আ.)-এর নামে।’',
    detailedNarrativeEn:
      'In Dhu al-Hijjah of 8 AH, Maria al-Qibtiyyah (RA) gave birth to Ibrahim in Madinah. Overjoyed at the birth of a son in his later years, the Prophet ﷺ named him after his forefather Prophet Ibrahim (AS).',
    extendedContextBn:
      'মদিনার উপকণ্ঠে আওালি অঞ্চলে উম্মে সাইফ নামক এক দুধমায়ের কাছে ইবরাহীমকে লালন-পালনের জন্য রাখা হয়েছিল। নবীজি ﷺ প্রায়ই ঘোড়ায় চড়ে বা হেঁটে দুধমায়ের ঘরে যেতেন, আদরের সাথে তাঁকে কোলে তুলে নিতেন এবং চুমু খেয়ে তৃপ্ত হতেন। মদিনার সাহাবিরাও এই রাজপুত্রের জন্ম উৎসবে দারুণ আনন্দিত হয়েছিলেন।',
    extendedContextEn:
      'Ibrahim was nursed by Umm Sayf in the highlands of Madinah. The Prophet ﷺ would frequently ride out to visit him, taking him into his arms with tender paternal affection.',
    locationBn: 'আওয়ালি ও মদিনা মুনাওয়ারা',
    locationEn: 'Awali & Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, মারিয়া কিবতিয়া (را.), ইবরাহীম',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Maria al-Qibtiyyah (RA), Ibrahim',
    reflectionBn:
      'বৃদ্ধ বয়সে জন্ম নেওয়া এই পুত্রের প্রতি নবীজির সুকোমল ভালোবাসা পিতা হিসেবে তাঁর মহানুভবতার অনন্য দলিল।',
    reflectionEn:
      'The tender paternal love shown toward Ibrahim reflects the exquisite warmth and mercy of the Prophet ﷺ.',
    sourceBn: 'সহীহ মুসলিম, হাদিস নং ২৩১৫, ২৩১৬',
    sourceEn: 'Sahih Muslim, Hadith 2315, 2316',
    references: [
      {
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        chapterBn: 'কিতাবুল ফাদাইল (ইবরাহীম ইবনে মুহাম্মদ ﷺ এর জন্ম ও মর্যাদা)',
        chapterEn: 'Book of Virtues',
        citationBn: 'হাদিস নং ২৩১৫, ২৩১৬',
        citationEn: 'Hadith 2315, 2316',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
  },
  {
    no: 14,
    partNo: 7,
    timeContextBn: '১০ হিজরি · মদিনা মুনাওয়ারা',
    timeContextEn: '10 AH · Madinah',
    titleBn: 'ইবরাহীমের বিদায় ও সূর্যগ্রহণ',
    titleEn: 'Passing of Ibrahim & the Solar Eclipse',
    pointsBn: [
      'প্রায় দেড় বছর বয়সে ইন্তেকাল করেন; রাসূল ﷺ কেঁদে বলেন, ‘চোখ অশ্রু ঝরায়, হৃদয় ব্যথিত হয়... হে ইবরাহীম, তোমার বিচ্ছেদে আমরা ব্যথিত।’',
      'সেদিন সূর্যগ্রহণ হলে মানুষ বলল, এটা ইবরাহীমের মৃত্যুর কারণে; রাসূল ﷺ জানান, কারও জন্ম-মৃত্যুতে গ্রহণ লাগে না।',
    ],
    pointsEn: [
      'Passed away around 18 months old; the Prophet ﷺ wept, saying: “The eyes shed tears, the heart is grieved... O Ibrahim, we are heartbroken by your departure.”',
      'When a solar eclipse occurred that day, people claimed it was due to his death; the Prophet clarified that eclipses do not occur for anyone’s birth or death.',
    ],
    detailedNarrativeBn:
      '১০ হিজরির রবিউল আউয়াল মাসে, রাসূলুল্লাহ ﷺ-এর ইন্তেকালের মাত্র কয়েক মাস আগে, দুধমায়ের ঘরে থাকাবস্থায় দেড় বছর বয়সে শিশু ইবরাহীম গুরুতর অসুস্থ হয়ে ইন্তেকাল করেন। প্রিয় পুত্রের অন্তিম শয্যাপাশে বসে নবীজি ﷺ-এর চোখ বেয়ে অশ্রু গড়িয়ে পড়ল। তিনি সান্ত্বনা দিয়ে বললেন—“চোখ অশ্রু ঝরায়, হৃদয় ব্যথিত হয়, কিন্তু আমরা কেবল তা-ই বলি যা আমাদের রবকে সন্তুষ্ট করে; হে ইবরাহীম, তোমার বিচ্ছেদে আমরা সত্যিই বড় কাতর!”',
    detailedNarrativeEn:
      'In Rabi al-Awwal of 10 AH, at roughly eighteen months of age, little Ibrahim passed away. Sitting by his bedside, tears streamed down the Prophet’s cheeks as he spoke the immortal words of grief and submission to Allah.',
    extendedContextBn:
      'যেদিন ইবরাহীম মারা যান, কাকতালীয়ভাবে সেদিন আকাশে সূর্যগ্রহণ হয়েছিল। মদিনার কিছু মানুষ বলতে শুরু করল—‘নবীপুত্রের মৃত্যুর শোকেরই সূর্যগ্রহণ লেগেছে।’ তা শুনে নবীজি ﷺ অবিলম্বে মিম্বারে দাঁড়িয়ে সাহাবিদের স্পষ্ট সংশোধন করে দিলেন—“সূর্য ও চাঁদ আল্লাহর দুটি নিদর্শনমাত্র; কারও জন্ম বা মৃত্যুর কারণে কখনো সূর্যগ্রহণ বা চন্দ্রগ্রহণ লাগে না।”',
    extendedContextEn:
      'Coincidentally, a total solar eclipse occurred on the day of Ibrahim’s passing, prompting superstitious whispers among some locals. The Prophet immediately corrected them from the pulpit, explaining that heavenly bodies obey laws set by Allah alone, independent of human life or death.',
    locationBn: 'মদিনা মুনাওয়ারা',
    locationEn: 'Madinah',
    keyFiguresBn: 'রাসূলুল্লাহ ﷺ, মারিয়া কিবতিয়া (را.), ইবরাহীম',
    keyFiguresEn: 'Prophet Muhammad ﷺ, Maria al-Qibtiyyah (RA), Ibrahim',
    reflectionBn:
      'নবীজির অশ্রু প্রমাণ করে যে সন্তানের মৃত্যুতে কান্না করা মানুষের স্বাভাবিক প্রকৃতি, আর কুসংস্কার খণ্ডন করা ইসলামের শিক্ষা।',
    reflectionEn:
      'Weeping over a child’s passing is natural human emotion, while dispelling superstition is core prophetic teaching.',
    sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১৩০৩, ১০৪৩, ১৩৮২',
    sourceEn: 'Sahih al-Bukhari, Hadith 1303, 1043, 1382',
    references: [
      {
        bookBn: 'সহীহ আল-বুখারী',
        bookEn: 'Sahih al-Bukhari',
        chapterBn: 'কিতাবুল কুসুফ (সূর্যগ্রহণ) ও কিতাবুল জানায়েয',
        chapterEn: 'Book of Eclipses & Book of Funerals',
        citationBn: 'হাদিস নং ১৩০৩, ১০৪৩, ১৩৮২, ৩১৯৯',
        citationEn: 'Hadith 1303, 1043, 1382, 3199',
        gradeBn: 'সহীহ (মুত্তাফাকুন আলাইহি)',
        gradeEn: 'Sahih (Agreed Upon)',
      },
    ],
  },
];

/**
 * Seerat Special Collection 03 Metadata
 */
export const PROPHET_CHILDREN_COLLECTION_META = {
  id: 'prophet-children-biography' as const,
  volumeNoBn: 'সংকলন ০৩',
  volumeNoEn: 'Collection 03',
  titleBn: 'রাসূলুল্লাহ ﷺ-এর সন্তানদের জীবনী',
  titleEn: 'The Lives of the Children of Prophet Muhammad ﷺ',
  arabicTitle: 'أولاد النبي محمد ﷺ وبناته',
  eraLabelBn: 'মক্কা ও মদিনা · জন্ম, বিয়ে ও ইন্তেকাল',
  eraLabelEn: 'Makkah & Madinah · Birth, Marriage & Passing',
  summaryBn:
    'রাসূলুল্লাহ ﷺ-এর ৭ জন সন্তান (কাসিম, যায়নাব, রুকাইয়া, উম্মে কুলসুম, ফাতিমা, আব্দুল্লাহ ও ইবরাহীম)-এর জন্ম, শৈশব, হিজরত, বদরের মুক্তিপণ, উসমান (রা.)-এর সঙ্গে দুই কন্যার বিবাহ, ফাতিমা (را.)-এর জান্নাতের নেত্রী হওয়া এবং ইবরাহীমের বিদায় পর্যন্ত ১৪টি প্রামাণ্য ঐতিহাসিক ঘটনা।',
  summaryEn:
    'A comprehensive 7-part chronicle of all 7 children of Prophet Muhammad ﷺ (Qasim, Zaynab, Ruqayyah, Umm Kulthum, Fatimah, Abdullah, and Ibrahim)—covering their births, marriages, Hijrah, Badr ransom, Dhun-Nurayn, Fatimah as leader of women in Paradise, and Ibrahim’s passing with verified Hadith citations.',
  partsCount: 7,
  eventsCount: 14,
  durationBn: '৭ জন সন্তান · ১৪টি ঘটনা',
  durationEn: '7 Children · 14 Events',
  primarySourcesBn: 'সহীহ বুখারী, সহীহ মুসলিম, সুনান আবু দাউদ, জামে আত-তিরমিযী ও ইবনে সা‘দের আত-তাবাকাতুল কুবরা',
  primarySourcesEn: 'Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami‘ at-Tirmidhi & Ibn Sa‘d’s Tabaqat',
};
