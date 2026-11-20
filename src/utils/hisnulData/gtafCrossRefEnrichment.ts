import type { DuaCategory } from '../../types';

export interface GtafCrossRefEnrichment {
  secondaryCategories?: DuaCategory[];
  extraVirtueBn?: string;
  extraVirtueEn?: string;
  extraBenefitsBn?: string[];
  extraBenefitsEn?: string[];
  enrichedRefBn?: string;
  enrichedRefEn?: string;
}

export const GTAF_CROSS_REF_ENRICHMENT: Record<string, GtafCrossRefEnrichment> = {
  "hisnul_intro_3": {
    "secondaryCategories": [
      "quranic"
    ],
    "enrichedRefBn": "সূরা আল-বাকারাহ্‌ - ২:১৫২ সূরা আল-আহযাব - ৩৩:৪১ সূরা আল-আহযাব - ৩৩:৩৫। [১] বুখারী, ফাতহুল বারীসহ ১১/২০৮, নং ৬৪০৭; মুসলিম, ১/৫৩৯, নং ৭৭৯, আর তার শব্দ হচ্ছে, «مَثَلُ الْبَيْتِ الَّذِي يُذْكَرُ اللّٰهُ فِيهِ، وَالْبَيْتِ الَّذِي لَا يُذْكَرُ اللّٰهُ فِيهِ، مَثَلُ الْحَيِّ وَالْمَيِّتِ» “যে ঘরে আল্লাহ্‌র যিক্‌র হয়, আর যে ঘরে আল্লাহ্‌র যিক্‌র হয় না— তার দৃষ্টান্ত যেন জীবিত আর মৃত।” [২] তিরমিযী ৫/৪৫৯, নং ৩৩৭৭; ইবন মাজাহ্‌ ২/১৬৪৫, নং ৩৭৯০; আরও দেখুন, সহীহ ইবন মাজাহ্‌ ২/৩১৬; সহীহ তিরমিযী ৩/১৩৯। [৩] বুখারী ৮/১৭১, নং ৭৪০৫; মুসলিম ৪/২০৬১, নং ২৬৭৫। তবে শব্দটি বুখারীর। [৪] তিরমিযী ৫/৪৫৮, নং ৩৩৭৫; ইবন মাজাহ্‌ ২/১২৪৬, নং ৩৭৯[৩] আর শাইখ আলবানী একে সহীহ বলেছেন। দেখুন, সহীহ আত-তিরমিযী, ৩/১৩৯; সহীহ ইবন মাজাহ্ ২/৩১৭। [৫] তিরমিযী ৫/১৭৫, নং ২৯১০। শাইখ আলবানী একে সহীহ বলেছেন; দেখুন, সহীহুত তিরমিযী, ৩/৯; সহীহ জামে সগীর-৫/৩৪০। [৬] মুসলিম, ১/৫৫৩; নং ৮০৩ [৭] আবূ দাউদ ৪/২৬৪, নং ৪৮৫৬ ও অন্যান্য। দেখুন, সহীহুল জামে‘ ৫/৩৪২ [৮] তিরমিযী, ৫/৪৬১, নং ৩৩৮০। আরও দেখুন, সহীহুত তিরমিযী, ৩/১৪০। [৯] আবূ দাউদ ৪/২৬৪, নং ৪৮৫৫; আহমদ ২/৩৮৯ নং ১০৬৮০। আরও দেখুন, সহীহুল জামে‘ ৫/১৭৬।",
    "enrichedRefEn": "al-Bukhaaree with al-Fat.h 11/208 and Muslim 1/539 at-Tirmidhee 5/459 and Ibn Maajah 2/1245, see: Saheeh Ibn Maajah 2/316 and Saheeh at-Tirmidhee 3/139 al-Bukhaaree 8/171 and Muslim 4/2061, this specific wording is related by al-Bukhaaree at-Tirmidhee 5/458 and Ibn Maajah 2/1246, see: Saheeh at-Tirmidhee 3/139 and Saheeh Ibn Maajah 2/317 at-Tirmidhee 5/175, see: Saheeh at-Tirmidhee 3/9 and Saheeh al-Jaami' as-Sagheer 5/340 Muslim 1/553 Abu Daawood 4/264 and others, see: Saheeh al-Jaami' 5/342. at-Tirmidhee, see: Saheeh at-Tirmidhee 3/140. Abu Daawood 4/264 and Ahmad 2/389, see: Saheeh al-Jaami' 5/176"
  },
  "hisnul_1": {
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 11/113; Muslim 4/2083"
  },
  "hisnul_2": {
    "enrichedRefBn": "বুখারী: ফাতহুল বারী, ৩/৩৯, নং ১১৫৪ হাদীসের ভাষ্য ইবন মাজাহ এর অনুরূপ। দেখুন, সহীহ ইবন মাজাহ্‌: ২/৩৩৫। • হিসনুল মুসলিম #২",
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 3/39, among others. The wording here is from Ibn Majah 2/335."
  },
  "hisnul_3": {
    "enrichedRefEn": "At-Tirmithi 5/473. See Al-Albani's Sahih Tirmiihi 3/144."
  },
  "hisnul_4": {
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 8/237; Muslim 1/530"
  },
  "hisnul_5": {
    "enrichedRefBn": "হাদীসটি নাসাঈ ব্যতীত সুনান গ্রন্থকারদের সবাই সংকলন করেছেন। আবূ দাউদ, নং ৪০২৩; তিরমিযী, নং ৩৪৫৮; ইবন মাজাহ্‌, নং ৩২৮৫। আর শাইখ আলবানী একে হাসান বলেছেন। দেখুন, ইরওয়াউল গালীল, ৭/৪৭। • হিসনুল মুসলিম #৫",
    "enrichedRefEn": "Al-Bukhari, Muslim, Abu Dawud 4023, Ibn Majah 3285, At-Tirmithi 3458. Graded hasan By Al- Albani. See also 'Irwa'ul-Ghalil 7/47"
  },
  "hisnul_6": {
    "enrichedRefBn": "আবূ দাউদ, নং ৪০২০; তিরমিযী, নং ১৭৬৭; বাগভী, ১২/৪০; দেখুন, মুখতাসারুশ শামাইল লিল আলবানী, পৃ. ৪৭। • হিসনুল মুসলিম #৬",
    "enrichedRefEn": "Abu Dawud 4020 and At-Tirmithi 1767. See also Al-Albani, Mukhtasar Shamd'il At-Tirmithi, p. 47"
  },
  "hisnul_7": {
    "enrichedRefEn": "Abu Dawud 4/41. See also Al-Albani Sahih Abu Dawud 2/760."
  },
  "hisnul_8": {
    "enrichedRefBn": "সুনান ইবন মাজাহ ২/১১৭৮, নং ৩৫৫৮; বাগাওয়ী, ১২/৪১ দেখুন, সহীহ ইবন মাজাহ ২/২৭৫। • হিসনুল মুসলিম #৮",
    "enrichedRefEn": "Ibn Majah 2/1178, Al-Baghawi 12/41. See also Al-Albani, Sahih Ibn Majah 2/275"
  },
  "hisnul_9": {
    "enrichedRefEn": "At-Tirmithi 2/505, among others. See 'Irwa'ul Ghalil no. 49 and Sahihul-Jami' 3/203"
  },
  "hisnul_10": {
    "enrichedRefBn": "বুখারী ১/৪৫, নং ১৪২; মুসলিম ১/২৮৩, নং ৩৭৫। শুরুতে অতিরিক্ত ‘বিসমিল্লাহ্‌’ উদ্ধৃত করেছেন সা‘ঈদ ইবন মানসূর। দেখুন, ফাতহুল বারী, ১/২৪৪ • হিসনুল মুসলিম #১০",
    "enrichedRefEn": "Al-Bukhari 1/45, Muslim 1/283. The addition of Bismillah at its beginning was reported by Said bin Mansur. See Fathul-Bari 1/244"
  },
  "hisnul_11": {
    "enrichedRefBn": "হাদীসটি নাসাঈ ব্যতীত সকল সুনান গ্রন্থকারই উদ্ধৃত করেছেন; তবে নাসাঈ তার ‘আমালুল ইয়াওমি ওয়াললাইলাহ’ গ্রন্থে (নং ৭৯) তা উদ্ধৃত করেছেন। আবূ দাউদ, নং ৩০; তিরমিযী, নং ৭; ইবন মাজাহ্‌, নং ৩০০। আর শাইখ আলবানী সহীহ সুনান আবি দাউদে ১/১৯ একে সহীহ বলেছেন। • হিসনুল মুসলিম #১১",
    "enrichedRefEn": "Abu Dawud 30, Ibn Majah 300 and At-Tirmithi 7. An-Nasa'i recorded it in 'Amalul-Yawm wal-Laylah No 79. Graded Sahih by Al-Albani in Sunan Abi Dawud 1/19. Also see the checking of Ibn Al-Qayyim's Zadul-Ma'ad, 2/387."
  },
  "hisnul_12": {
    "enrichedRefBn": "আবূ দাউদ, নং ১০১; ইবন মাজাহ্‌, নং ৩৯৭; আহমাদ নং ৯৪১৮। আরও দেখুন, ইরওয়াউল গালীল ১/১২২ [১] হাদিসটি কয়েকটি দূর্বল সনদে বর্ণিত; ভিন্ন ভিন্ন যয়ীফ সনদের সমন্বয়ে গ্রহণযোগ্যতা পেয়েছে। তিরমিযী (আবওয়াবুত তাহারাহ ,২০- বাব ফিত তাসমিয়াতি...) ১/৩৭-৩৯ (ভারতীয় ১/১৩); যাইলায়ী, নাসবুর রাইয়াহ ১/৩-৬, ইবনু হাজার, তালখীসুল হাবীর ১/৭২, আলবানী, সহীহুল জামি ২/১২৫৬, নং ৭৫৭০; রাহে বেলায়াত - যিকর নং ৩৬ • হিসনুল মুসলিম #১২",
    "enrichedRefEn": "Abu Dawud 101, Ibn Majah 337, and Ahmad. 9418 See also Al-Albani, 'Irwa'ul-Ghain 1/122; Rahe Belayat (Dhikr # 36)"
  },
  "hisnul_13": {
    "enrichedRefEn": "Muslim 1/209"
  },
  "hisnul_14": {
    "enrichedRefEn": "At-Tirmithi 1/78. See also Al-Albani, Sahih At- Tirmithi 1/18"
  },
  "hisnul_15": {
    "extraVirtueBn": "আবূ সাঈদ আল-খুদরী (রা.) বর্ণনা করেন, রাসূলুল্লাহ ﷺ বলেছেন: যে ব্যক্তি ওযু শেষে এই দোয়া পড়বে, তা একটি পত্রে লিখে মোহরাঙ্কিত করে রাখা হবে এবং কিয়ামত পর্যন্ত তা ভাঙা হবে না। (মুস্তাদরাক হাকিম ও নাসাঈ — সহীহ)।",
    "extraVirtueEn": "Abu Sa‘id al-Khudri (RA) reported that the Prophet ﷺ said: Whoever recites this after completing wudu, it will be written upon a parchment and sealed so that it will not be broken until the Day of Resurrection. (Al-Mustadrak & An-Nasa’i — Sahih).",
    "extraBenefitsBn": [
      "ওযু শেষে কালেমা শাহাদাত, তওবা ও এই দোয়া আমলনামায় কিয়ামত পর্যন্ত মোহরাঙ্কিত হয়ে সুরক্ষিত থাকে।"
    ],
    "extraBenefitsEn": [
      "Reciting this supplication after wudu is sealed and preserved on a scroll until the Day of Judgment."
    ],
    "enrichedRefBn": "নাসাঈ, আমালুল ইয়াওমি ওয়াল লাইলাহ, পৃ. ১৭৩ আরও দেখুন, ইরওয়াউল গালীল, ১/১৩৫, ৩/৯৪ • হিসনুল মুসলিম #১৫",
    "enrichedRefEn": "An-Nasa'i, 'Amalul-Yawm wal-Laylah, p. 173. See also Al-Albani, 'Irwa'ul-Ghalil 1/135 and 2/94."
  },
  "hisnul_16": {
    "extraVirtueBn": "আনাস ইবনু মালিক (রা.) বর্ণনা করেন, রাসূলুল্লাহ ﷺ বলেছেন: যে ব্যক্তি ঘর থেকে বের হওয়ার সময় এ কথাগুলো বলবে, তাকে বলা হয়—তোমার যথেষ্ট ব্যবস্থা করা হলো, তোমাকে রক্ষা করা হলো এবং হেদায়াত দেওয়া হলো; শয়তান তার থেকে দূরে সরে যায়। তখন এক শয়তান আরেক শয়তানকে বলে: যাকে হেদায়াত দেওয়া হয়েছে, যথেষ্টতা দেওয়া হয়েছে ও নিরাপত্তা দেওয়া হয়েছে, তার ওপর আমরা কীভাবে প্রভাব বিস্তার করব? (আবু দাউদ ও তিরমিযী — হাসান সহীহ)।",
    "extraVirtueEn": "Anas (RA) reported that the Prophet ﷺ said: Whoever says this when leaving home is told: \"You have been sufficed, protected, and guided,\" and the devil steps aside from him, saying to another devil: \"How can you touch a man who has been guided, sufficed, and protected?\" (Abu Dawud & Tirmidhi — Hasan Sahih).",
    "extraBenefitsBn": [
      "বাড়ি থেকে বের হলে আল্লাহর পক্ষ থেকে হেদায়াত, যথেষ্টতা ও পূর্ণ নিরাপত্তা লাভের ঘোষণা হয়।"
    ],
    "extraBenefitsEn": [
      "Grants divine guidance, sufficiency, and protection from Shaytan upon leaving one’s home."
    ],
    "enrichedRefBn": "[১] আবূ দাউদ ৪/৩২৫, নং ৫০৯৫; তিরমিযী ৫/৪৯০, ৩৪২৬। আরও দেখুন, সহীহুত তিরমিযী, ৩/১৫১ [২] তিরমিযী (৩৯-কিতাবুদ্দাওয়াত,৩৪-বাব ইয়াকুলু ইযা খরাজা) ৫/৪৫৬, নং ৩৪২৬ (ভা ২/১৮০-১৮১)। • হিসনুল মুসলিম #১৬",
    "enrichedRefEn": "Abu Dawud 4/325, At-Tirmithi 5/490. See also Al-Albani, Sahih At-Tirmithi 3/151"
  },
  "hisnul_17": {
    "enrichedRefBn": "সুনান গ্রন্থকারগণ: আবূ দাউদ, নং ৫০৯৪; তিরমিযী, নং ৩৪২৭; নাসাঈ, নং ৫৫০১; ইবন মাজাহ, নং ৩৮৮৪ আরও দেখুন, সহীহুত তিরমিযী ৩/১৫২; সহীহ ইবন মাজাহ্‌ ২/৩৩৬। • হিসনুল মুসলিম #১৭",
    "enrichedRefEn": "Abu Dawud 5094, Ibn Majah 3884, An-Nasa'I 5501, At-Tirmithi 3427. See also Al-Albani, Sahih At-Tirmithi 3/152 and Sahih Ibn Majah 2/336"
  },
  "hisnul_18": {
    "extraVirtueBn": "সহীহ মুসলিমে বর্ণিত: ঘরে প্রবেশের সময় এবং খাবারের শুরুতে যে ব্যক্তি আল্লাহর নাম (বিসমিল্লাহ) স্মরণ করে, শয়তান তার সঙ্গীদের বলে—আজ রাতে তোমাদের এখানে কোনো থাকার জায়গাও নেই এবং রাতের খাবারও নেই।",
    "extraVirtueEn": "Sahih Muslim narrates that when a person remembers Allah upon entering his home and before eating, Shaytan tells his companions: \"You have no shelter here tonight and no dinner.\"",
    "extraBenefitsBn": [
      "ঘরে প্রবেশে বিসমিল্লাহ ও সালামের মাধ্যমে শয়তানের প্রবেশ রুদ্ধ হয় এবং ঘরে বরকত নাযিল হয়।"
    ],
    "extraBenefitsEn": [
      "Blocks Shaytan from lodging or dining inside the home and brings barakah to the household."
    ],
    "enrichedRefBn": "[১] আবূ দাউদ ৪/৩২৫, ৫০৯৬। আর আল্লামা ইবন বায রহ. তার তুহফাতুল আখইয়ার গ্রন্থে পৃ. ২৮ এটার সনদকে হাসান বলেছেন। [২] মুসলিম, নং ২০১৮। • হিসনুল মুসলিম #১৮",
    "enrichedRefEn": "Abu Dawud 4/325. Muslim 2018 states that one should mention the Name of Allah when entering the home and when beginning to eat; and that the devil, hearing this, says: 'There is no shelter for us here tonight and no food."
  },
  "hisnul_19": {
    "enrichedRefBn": "[১] এ শব্দগুলোর জন্য দেখুন, বুখারী, (ফাতহুল বারীসহ) ১১/১১৬, নং ৬৩১৬; মুসলিম ১/৫২৬, ৫২৯, ৫৩০, নং ৭৬৩ [২] তিরমিযী ৫/৪৮৩, নং ৩৪১৯। [৩] ইমাম বুখারী, আল-আদাবুল মুফরাদ, নং ৬৯৫; পৃ. ২৫৮; আর আলবানী সেটার সনদকে সহীহ আদাবিল মুফরাদে সহীহ বলেছেন, নং ৫৩৬। [৪] হাফেয ইবন হাজার এটাকে তার ফতহুল বারীতে উল্লেখ করেছেন এবং ইবন আবী আসেমের ‘কিতাবুদ দো‘আ’ এর দিকে সম্পর্কিত করেছেন। দেখুন ফাতহুল বারী, ১১/১১৮। আরও বলেছেন, বিভিন্ন বর্ণনা থেকে মোট ২৫ (পঁচিশটি) বিষয় পাওয়া গেল। • হিসনুল মুসলিম #১৯",
    "enrichedRefEn": "Up to this point was reported by Al-Bukhari 11 / 116 (Hadith no. 6316) and by Muslim 1/526, 529-530 (Hadithno. 763). At-Tirmithi 5/483 (Hadith no. 3419). Al-Bukhari in Al-'Adab Al-Mufrad (Hadith no. 695), p. 258. See also Al-Albani, Sahih Al-'Adab Al-Mufrad(no. 536). Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 11/118."
  },
  "hisnul_20": {
    "extraVirtueBn": "আবদুল্লাহ ইবনু আমর (রা.) বর্ণনা করেন, রাসূলুল্লাহ ﷺ মসজিদে প্রবেশকালে এই দোয়া পড়তেন এবং বলেছেন: কেউ এটি বললে শয়তান আক্ষেপ করে বলে—সারা দিনের জন্য এ ব্যক্তি আমার খপ্পর থেকে রক্ষা পেয়ে গেল। (আবু দাউদ — সহীহ)।",
    "extraVirtueEn": "‘Abdullah ibn ‘Amr (RA) reported that the Prophet ﷺ used to say this upon entering the mosque and said: Whoever recites it, Shaytan says: \"He has been protected from me for the rest of the day.\" (Abu Dawud — Sahih).",
    "extraBenefitsBn": [
      "মসজিদে প্রবেশের সময় পড়লে সারা দিনের জন্য শয়তানের কুমন্ত্রণা ও অনিষ্ট থেকে সুরক্ষা পাওয়া যায়।"
    ],
    "extraBenefitsEn": [
      "Provides day-long protection from Shaytan’s whispers upon entering the mosque."
    ],
    "enrichedRefBn": "[১] হাদীসটি উদ্ধৃত করেছেন, হাকিম ১/২১৮; এবং একে মুসলিমের শর্ত অনুযায়ী সহীহ বলেছেন, আর ইমাম যাহাবী সেটার সমর্থন করেছেন। আরও উদ্ধৃত করেছেন বাইহাকী, ২/৪৪২; আর শাইখ আলবানী তার সিলসিলাতুল আহাদীসিস সহীহা গ্রন্থে এটাকে হাসান বলেছেন, ৫/৬২৪; নং ২৪৭৮। [২] আবূ দাউদ, নং ৪৬৬; আরও দেখুন, সহীহুল জামে‘ ৪৫৯১ [৩] ইবনুসসুন্নি কর্তৃক উদ্ধৃত, নং ৮। আর শাইখ আলবানী তার আস-সামারুল মুস্তাতাব গ্রন্থে একে হাসান বলেছেন, পৃ. ৬০৭। [৪] আবূ দাউদ ১/১২৬; নং ৪৬৫; আরও দেখুন, সহীহুল জামে‘ ১/৫২৮। [৫] মুসলিম ১/৪৯৪, নং ৭১৩; আর সুনান ইবন মাজায় ফাতিমা রাদিয়াল্লাহু আনহার হাদীসে এসেছে, “হে আল্লাহ, আমার গুনাহ ক্ষমা করে দিন এবং আমার জন্য আপনার রহমতের দ্বারসমূহ অবারিত করে দিন”। আর শাইখ আলবানী অন্যান্য শাহেদ বা সম অর্থের বর্ণনার কারণে একে সহীহ বলেছেন। দেখুন, সহীহ ইবন মাজাহ্ ১/১২৮-১২৯। [৬] আবু দাঊদ(কিতাবুস সালাত,বাব ফীমা ইয়াকুলুর রজুলু ইনদা দুখুলিহিল মাসজিদ) ১/১২৪,নং ৪৬৬ (ভা ১/৬৭); আলবানী,সহীহুল জামিয়িস সাগীর ২/৮৬০,নং ৪৭১৫। • হিসনুল মুসলিম #২০",
    "enrichedRefEn": "Abu Dawud and Al-Albani, Sahihul-Jdmi' As-Saghir (Hadithno. 4591). Ibn As-Sunni (Hadith no. 88), graded good by Al-Albani. Abu Dawud 1/126, see also Al-Albani, Sahihul-Jami'As-Saghir 1/528. Muslim 1/494. There is also a report in Sunan Ibn Majah on the authority of Fatimah (RA), : 'O Allah, forgive me my sins and open for me the doors of Your mercy.' It was graded authentic by Al-Albani due to supporting Ahadith. See Sahih Ibn Majah 1/128-9."
  },
  "hisnul_21": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefBn": "[১] আল-হাকিম, ১/২১৮; বাইহাকী, ২/৪৪২, আর শাইখ আলবানী তার সিলসিলাতুস সহীহায় একে হাসান হাদীস বলেছেন, ৫/৬২৪, নং ২৪৭৮। আর সেটার তাখরীজ পূর্বে গত হয়েছে। [২] মসজিদে প্রবেশের দো‘আয় পূর্বে বর্ণিত হাদীসের রেওয়ায়েতসমূহের তাখরীজ দেখুন, (২০ নং) আর “হে আল্লাহ, আমাকে বিতাড়িত শয়তান থেকে হেফাযত করুন” এ বাড়তি অংশের তাখরীজ দেখুন, ইবন মাজাহ্‌ ১/১২৯। • হিসনুল মুসলিম #২১",
    "enrichedRefEn": "Al-Hakim, Baihaqi 2/442 Albani graded it Sahih in silsilah as Sahih 5/624. Reference same as previous dua. The last sentence is related by Ibn Maajah, see Saheeh Ibn Maajah 1/129"
  },
  "hisnul_25": {
    "enrichedRefBn": "[১] বুখারী, ১/১৫২, নং ৬১১, ৬১৩; মুসলিম, ১/২৮৮, নং ৩৮৩ [২] মুসলিম ৩/১৫৫৭, নং ১৯৬৭; বায়হাকী ৯/২৮৭, দু ব্রাকেটের মাঝখানের অংশ বাইহাকী থেকে, ৯/২৮৭, ইত্যাদি। তবে সর্বশেষ বাক্যটি ইমাম মুসলিমের বর্ণনা থেকে অর্থ হিসেবে গৃহীত। [৩] আহমাদ ৩/৪১৯, নং ১৫৪৬১, সহীহ সনদে। আর ইবনুস সুন্নী, নং ৬৩৭; আরনাঊত তার ত্বাহাভীয়ার তাখরীজে এর সনদকে বিশুদ্ধ বলেছেন, পৃ.১৩৩ আরও দেখুন, মাজমা‘উয যাওয়ায়েদ ১০/১২৭। [৪] মুসলিম (৪-কিতাবুস সালাত,৭-বাব ইসতিহবাবিল কাওলি মিসল...) ১/২৮৮, নং ৩৮৪(ভা ১/১৬৬) [৫] বুখারী(১৪-কিতাবুল আযান, ৮-বাবুদ দাআ ইনদান নিদা) ১/২২২ নং ৫৮৯ (ভারতীয় ১/৮৬)। [৬] সহীহ ইবন হিব্বান ৪/৫৫৩, মুসতাদরাক হাকিম ১/৩২১; আলবানী সহীহুত তারগীব ১/১৭৭। • হিসনুল মুসলিম #২৫",
    "enrichedRefEn": "Al-Bukhari 1/152, Muslim 1/288. Muslim 1/290. Ibn Khuzaymah 1/220. Muslim 1/288. Al-Bukhari 1/152, and the addition between brackets is from Al-Bayhaqi 1/410 with a good (Hasan) chain of narration. See 'Abdul-Azlz bin Baz's Tuhfatul-'Akhyar, pg. 38. At-Tirmidhi, Abu Dawud, Ahmad, See also Al-Albani, Irwa ul-Ghalil 1/262"
  },
  "hisnul_27": {
    "enrichedRefEn": "Al-Bukhari 1/181, Muslim 1/419"
  },
  "hisnul_28": {
    "enrichedRefBn": "মুসলিম, নং ৩৯৯; আর সুনান গ্রন্থকার চারজন। আবু দাউদ, নং ৭৭৫; তিরমিযী, নং ২৪৩; ইবন মাজাহ্‌, নং ৮০৬; নাসাঈ, নং ৮৯৯। আরও দেখুন, সহীহুত তিরমিযী, ১/৭৭; সহীহ ইবন মাজাহ্ ১/১৩৫। • হিসনুল মুসলিম #২৮",
    "enrichedRefEn": "Abu Dawud 775, Ibn Majah 806, An-Nasa'I 899, At-Tirmithi 283. See Al-Albani, Sahih At-Tirmithi 1/77 and Sahih Ibn Majah 1/135."
  },
  "hisnul_29": {
    "enrichedRefBn": "সহিহ মুসলিম, ৭৭১। বইঃ ৬ মুসাফিরের সালাত ও কসর। অধ্যায়ঃ ২৬। রাত্রিকালীন সালাত ও কিয়ামের দুআ মুসলিম ১/৫৩৪, নং ৭৭১ • হিসনুল মুসলিম #২৯",
    "enrichedRefEn": "Muslim 1/534"
  },
  "hisnul_30": {
    "enrichedRefEn": "Muslim 1/534"
  },
  "hisnul_31": {
    "enrichedRefBn": "আবূ দাউদ ১/২০৩, নং ৭৬৪; ইবন মাজাহ্‌ ১/২৬৫, ৮০৭; আহমাদ, আহমাদ ৪/৮৫, নং ১৬৭৩৯। শাইখ শু‘আইব আল-আরনাউত তার মুসনাদের তাহকীকে এ হাদীসের সনদকে হাসান লি-গাইরিহি বলেছেন। আর আব্দুল কাদের আরনাউত ইবন তাইমিয়্যার ‘আল-কালেমুত তাইয়্যেব’ গ্রন্থের নং ৭৮, এর তাহকীক বলেন, এটি তার শাওয়াহেদ বা সমার্থবোধক হাদীসের দ্বারা সহীহ লি-গাইরিহী প্রমাণিত হয়। আর আলবানী তার সহীহুল কালেমিত তাইয়্যেব এর ৬২ নং এ হাদিসটি উল্লেখ করেছেন। তাছাড়া ইমাম মুসলিম ইবন উমর থেকে অনুরূপ হাদীস উদ্ধৃত করেছেন, তবে সেখানে একটি ঘটনা বর্ণিত হয়েছে। ১/৪২০, নং ৬০১ • হিসনুল মুসলিম #৩১",
    "enrichedRefEn": "Abu Dawud 1/203, Ibn Majah 1/265, ai Ahmad 4/85. Muslim recorded a similar Hadith 1/420"
  },
  "hisnul_32": {
    "enrichedRefBn": "বুখারী, (ফাতহুল বারীসহ) ৩/৩, ১১/১১৬, ১৩/৩৭১, ৪২৩, ৪৬৫, নং ১১২০, ৬৩১৭, ৭৩৮৫, ৭৪৪২, ৭৪৯৯; ও মুসলিম সংক্ষিপ্তাকারে ১/৫৩২, নং ৭৬৯। • হিসনুল মুসলিম #৩২",
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 3/3, 11/ 116, 13/371, 423, 465. See also Muslim for a shorter account, 1/532."
  },
  "hisnul_33": {
    "enrichedRefBn": "সুনানের গ্রন্থাকারগণ ও আহমাদ হাদীসটি উদ্ধৃত করেছেন। আবূ দাউদ, নং ৮৭০; তিরমিযী, নং ২৬২; নাসাঈ, নং ১০০৭; ইবন মাজাহ্‌, নং ৮৯৭; আহমাদ, নং ৩৫১৪ আরও দেখুন, সহীহুত তিরমিযী, ১/৮৩ • হিসনুল মুসলিম #৩৩",
    "enrichedRefEn": "Abu Dawud 870, Ibn Majah 897, An-Nasa'I 1107, At-Tirmithi 262, and Ahmad 3514. See Al-Albani's Sahih At-Tirmithi 1/83."
  },
  "hisnul_34": {
    "enrichedRefEn": "Al-Bukhari 1/99, Muslim 1/350"
  },
  "hisnul_35": {
    "enrichedRefEn": "Muslim 1/353, Abu Dawud 1/230"
  },
  "hisnul_36": {
    "enrichedRefBn": "মুসলিম ১/৫৩৪, নং ৭৭১; তাছাড়া চার সুনান গ্রন্থকারগণের মধ্যে ইবন মাজাহ ব্যতীত সবাই তা উদ্ধৃত করেছেন। আবূ দাউদ, নং ৭৬০, ৭৬১; তিরমিযী, নং ৩৪২১; নাসাঈ, নং ১০৪৯; তবে দুই ব্রাকেটের অংশ ইবন খুযাইমার শব্দ, নং ৬০৭; ইবন হিব্বান, নং ১৯০১ • হিসনুল মুসলিম #৩৬",
    "enrichedRefEn": "Muslim 1/534, Abu Dawud 760-1, An-Nasa'i 1049 and At- Tirmithi 3421. The last line is from ibn Kuzaimah 907"
  },
  "hisnul_37": {
    "enrichedRefEn": "Abu Dawud 1/230, An-Nasa'i and Ahmad. Its chain of narration is good (Hasan)"
  },
  "hisnul_38": {
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 2/282"
  },
  "hisnul_39": {
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 2/284"
  },
  "hisnul_40": {
    "enrichedRefEn": "Muslim 1/346"
  },
  "hisnul_41": {
    "enrichedRefBn": "হাদীসটি সুনানগ্রন্থকারগণ ও ইমাম আহমাদ সংকলন করেছেন। আবূ দাউদ, হাদীস নং ৮৭০; তিরমিযী, হাদীস নং ২৬২; নাসাঈ, হাদীস নং ১০০৭; ইবন মাজাহ, হাদীস নং ৮৯৭; আহমাদ, হাদীস নং ৩৫১৪ আরও দেখুন, সহীহুত তিরমিযী, ১/৮৩ • হিসনুল মুসলিম #৪১",
    "enrichedRefEn": "Abu Dawud, Ibn Majah, An-Nasa'i, At-Tirmithi, and Ahmad. See also Al-Albani, Sahih At-Tirmithi 1/83."
  },
  "hisnul_42": {
    "enrichedRefEn": "Al-Bukhari 794 and Muslim 868, see invocation no. 19.3 next."
  },
  "hisnul_43": {
    "enrichedRefEn": "Muslim 1/533, see invocation no. 19.4 next."
  },
  "hisnul_44": {
    "enrichedRefEn": "Muslim 1/534 and others."
  },
  "hisnul_45": {
    "enrichedRefBn": "আবু দাঊদ ১/২৩০, নং ৮৭৩; নাসাঈ, নং ১১৩১; আহমাদ, নং ২৩৯৮০। আর শাইখ আলবানী একে সহীহ আবু দাউদে ১/১৬৬ সহীহ বলেছেন। যার তাখরীজ ৩৭ নং এ চলে গেছে। • হিসনুল মুসলিম #৪৫",
    "enrichedRefEn": "Abu Dawud 1/230, An-Nasa'i, Ahmad. See also Al-Albani, Sahih Abu Dawud 1/166"
  },
  "hisnul_46": {
    "enrichedRefEn": "Muslim 1/350"
  },
  "hisnul_47": {
    "enrichedRefEn": "Muslim 1/352"
  },
  "hisnul_48": {
    "enrichedRefBn": "আবূ দাউদ ১/২৩১, নং ৮৭৪; ইবন মাজাহ্‌ নং ৮৯৭। আরও দেখুন, সহীহ ইবন মাজাহ, ১/১৪৮। • হিসনুল মুসলিম #৪৮",
    "enrichedRefEn": "Abu Dawud 1/231. See also Al-Albani, Sahihibn Mdjah 1/148"
  },
  "hisnul_49": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefBn": "হাদীসটি নাসাঈ ব্যতীত সুনান গ্রন্থগারগণ সবাই সংকলন করেছেন। আবূ দাউদ, ১/২৩১, নং ৮৫০; তিরমিযী, নং ২৮৪, ২৮৫; ইবন মাজাহ, নং ৮৯৮। আরও দেখুন, সহীহুত তিরমিযী, ১/৯০; সহীহ ইবন মাজাহ ১/১৪৮। • হিসনুল মুসলিম #৪৯",
    "enrichedRefEn": "Abu Dawud 1/231, Ibn Majah 898, At-Tirmithi 284-5. See also Al-Albani, Sahih At-Tirmithi 1/90 and Sahih Ibn Majah 1/148."
  },
  "hisnul_50": {
    "enrichedRefBn": "তিরমিযী, ২/৪৭৪, নং ৩৪২৫; আহমাদ ৬/৩০; নং ২৪০২২; হাকিম ও সহীহ বলেছেন এবং যাহাবী সেটা সমর্থন করেছেন, ১/২২০; আর বাড়তি অংশটুকু তাঁরই। আয়াতটুকু সূরা আল-মুমিনূন এর ১৪ নং আয়াত। • হিসনুল মুসলিম #৫০",
    "enrichedRefEn": "At-Tirmithi 2/474, Ahmad 6/30, and Al-Hakim"
  },
  "hisnul_51": {
    "enrichedRefEn": "At-Tirmithi 2/473, and Al-Hakim who graded it authentic and Ath-Thahabi agreed 1/219."
  },
  "hisnul_52": {
    "enrichedRefEn": "Al-Bukhari, from Al-Asqalani,Fathul-Bal 1/13, Muslim 1/301."
  },
  "hisnul_53": {
    "enrichedRefEn": "Al-Bukhari, from Al-Asqalani, Fathul-Bari 6/408"
  },
  "hisnul_54": {
    "enrichedRefEn": "Al-Bukhari, from Al-Asqalani, Fathul-Bari 6/ 407, Muslim 1/306"
  },
  "hisnul_55": {
    "enrichedRefEn": "Al-Bukhari 2/102, Muslim 1/412, and this is Muslim's wording."
  },
  "hisnul_56": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefEn": "Al-Bukhari 1/202, Muslim 1/412"
  },
  "hisnul_57": {
    "enrichedRefEn": "Al-Bukhari 8/168, Muslim 4/2078."
  },
  "hisnul_58": {
    "enrichedRefEn": "Muslim 1/534."
  },
  "hisnul_59": {
    "enrichedRefBn": "আবূ দাউদ ২/৮৬, নং ১৫২২; নাসাঈ ৩/৫৩, নং ২৩০২ আর শাইখ আলবানী সহীহ আবি দাঊদ ১/২৮৪ এটাকে সহীহ বলেছেন। • হিসনুল মুসলিম #৫৯",
    "enrichedRefEn": "Abu Dawud 2/86, An-Nasa'i 3/53. See also Al-Albani Sahih Abu Dawud 1 /284"
  },
  "hisnul_60": {
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 6/35"
  },
  "hisnul_61": {
    "enrichedRefBn": "আবূ দাউদ, নং ৭৯২; ইবন মাজাহ্‌ নং ৯১০। আরও দেখুন, সহীহ ইবন মাজাহ, ২/৩২৮। • হিসনুল মুসলিম #৬১",
    "enrichedRefEn": "Abu Dawud 792. See also Al-Albani, Sahih Ibn Majah 2/328"
  },
  "hisnul_62": {
    "enrichedRefBn": "নাসাঈ ৩/৫৪, ৫৫, নং ১৩০৪; আহমাদ ৪/৩৬৪, নং ২১৬৬৬। আর শাইখ আলবানী সহীহুন নাসাঈ ১/২৮১ তে একে সহীহ বলেছেন। • হিসনুল মুসলিম #৬২",
    "enrichedRefEn": "An-Nasa'i 3/54, 55, Ahmad 4/364. See also Al-Albani, Sahih An-Nasa'i 1/281."
  },
  "hisnul_63": {
    "extraVirtueBn": "বুরাইদাহ (রা.) বর্ণনা করেন, রাসূলুল্লাহ ﷺ এক ব্যক্তিকে তাশাহহুদে এভাবে দোয়া করতে শুনে বললেন: যার হাতে আমার প্রাণ তাঁর শপথ! এ ব্যক্তি আল্লাহর ‘ইসমে আযম’ (মহান নাম) ধরে প্রার্থনা করেছে, যে নামে ডাকলে তিনি সাড়া দেন এবং যে নামে চাইলে তিনি দান করেন।",
    "extraVirtueEn": "Buraydah (RA) reported that the Prophet ﷺ heard a man reciting this in Tashahhud and said: \"By Him in Whose hand is my soul, he has supplicated Allah by His Greatest Name (Ismul A‘zam), by which when He is called He responds, and when asked He gives.\"",
    "extraBenefitsBn": [
      "তাওহীদের সাক্ষ্যসহ আল্লাহর ‘ইসমে আযম’ ধরে দোয়া করায় আল্লাহ তাআলা দ্রুত দোয়া কবুল করেন।"
    ],
    "extraBenefitsEn": [
      "Invokes Allah by His Greatest Name (Ismul A‘zam), bringing swift acceptance of supplication."
    ],
    "enrichedRefBn": "নাসাঈ ৩/৫২, নং ১৩০০; শব্দ তাঁরই, আহমাদ ৪/৩৩৮, নং ১৮৯৭। আর আলবানী সহীহুন নাসাঈ ১/২৮০ তে একে সহীহ বলেছেন। | আবূ দাউদ ২/৬২, নং ১৪৯৩; তিরমিযী ৫/৫১৫, নং ৩৪৭৫; ইবন মাজাহ, ২/১২৬৭, নং ৩৮৫৭; নাসাঈ, নং ১৩০০, আর শব্দ তাঁরই; আহমাদ নং ১৮৯৭৪ আর শাইখ আলবানী সহীহ নাসাঈ ১/২৮০ তে একে সহীহ বলেছেন। তাছাড়া আরও দেখুন, সহীহ ইবন মাজাহ ২/৩২৯; সহীহ আত-তিরমিযী, ৩/১৬৩ • হিসনুল মুসলিম #৬৩",
    "enrichedRefEn": "An-Nasa'i 3/52, Ahmad 4/338. See also Al-Albani, Sahih An-Nasa'i 1/280 and Sifat Salatun-Nabi, pg. 204 | Abu Dawud 2/62, Ibn Majah 2/1267, At-Tirmithi 5/515, Ahmad 5/360. See also Al-Albani, Sahih Ibn Majah 2/329 and Sahih At-Tirmithi 3/163"
  },
  "hisnul_64": {
    "extraVirtueBn": "আনাস (রা.) বলেন: এক ব্যক্তি সালাতের তাশাহহুদের পর এই দোয়া করলে রাসূলুল্লাহ ﷺ বললেন—নিশ্চয়ই সে আল্লাহর ইসমে আযম দ্বারা দোয়া করেছে। আলী (রা.)-এর অপর বর্ণনায় সালামের পূর্বে ও পরে উভয় অবস্থাতেই পাঠের প্রমাণ পাওয়া যায়।",
    "extraVirtueEn": "Anas (RA) narrated that a man recited this after Tashahhud and the Prophet ﷺ remarked: \"He has asked Allah by His Greatest Name.\" Narrations from ‘Ali (RA) also show the Prophet ﷺ recited similar phrases both before and after Salam.",
    "extraBenefitsBn": [
      "হাদীসে ইসমে আযম সম্বলিত অন্যতম শ্রেষ্ঠ দোয়া; সালামের পূর্বে ও পরে পাঠের সহীহ বর্ণনা রয়েছে।"
    ],
    "extraBenefitsEn": [
      "Contains the Greatest Name of Allah; authentically reported in narrations around the end of prayer."
    ],
    "enrichedRefBn": "হাদীসটি সুনানগ্রন্থকারগণ সকলে সংকলন করেছেন। আবূ দাউদ, নং ১৪৯৫; তিরমিযী, নং ৩৫৪৪; ইবন মাজাহ, নং ৩৮৫৮; নাসাঈ, নং ১২৯৯। আরও দেখুন, সহীহ ইবন মাজাহ, ২/৩২৯। | [১]মুসলিম(৬-কিতাব সালাতিল মুসাফিরীন,২৬-বাবুদ্দুআ...) ১/৫৩৪-৫৩৫ (ভা ১/২৬৩);আবু দাঊদ(কিতাবুস সালাত,বাব মা ইউসতাফতাহু...) ১/১৯৯,নং ৭৬০ (ভা ১/১১১)সহীহ ইবনু খুযাইমা ১/৩৬৬,সহীহ ইবনু হিব্বান ৫/৩৭২,ইবনুল আসীর,জামিউল উসূল ৪/২২৪;বাইহাকী,আস-সুনানুল কুবরা ২/৩২,১৮৫।আল্লামা আহমদ শাকিরের আলোচনা দেখুন,মুসনাদে আহমাদ (শাকির সম্পাদিত) ২/১০০ও ১৩৪,যাকারিয়্যা,আল-ইখবার পৃ. ৬০; রাহে বেলায়াত - যিকর নং ১০৮ • হিসনুল মুসলিম #৬৪",
    "enrichedRefEn": "Abu Dawud 1495, An-Nasa'I 1299, Ibn Majah 3858, At-Tirmithi 1344. See also Al-Albani, Sahih Ibn Majah 2/329; Rahe Belayat (Dhikr # 108)"
  },
  "hisnul_66": {
    "enrichedRefEn": "Muslim 1/414."
  },
  "hisnul_67": {
    "enrichedRefBn": "বুখারী ১/২২৫, নং ৮৪৪; মুসলিম ১/৪১৪, নং ৫৯৩ আর দু ব্রাকেটের মাঝের অংশ বুখারীতে বর্ধিত এসেছে, নং ৬৪৭৩ • হিসনুল মুসলিম #৬৭",
    "enrichedRefEn": "Al-Bukhari 1/255, Muslim 1/414"
  },
  "hisnul_68": {
    "enrichedRefEn": "Muslim 1/415."
  },
  "hisnul_69": {
    "enrichedRefEn": "Muslim 1/418"
  },
  "hisnul_70": {
    "enrichedRefBn": "আবু দাঊদ ২/৮৬, নং ১৫২৩; তিরমিযী, নং ২৯০৩; নাসাঈ ৩/৬৮, নং ১৩৩৫। আরও দেখুন, সহীহুত তিরমিযী, ২/৮। আর উপর্যুক্ত তিনটি সূরাকে ‘আল-মু‘আওয়াযাত’ বলা হয়। দেখুন, ফাতহুল বারী, ৯/৬২ • হিসনুল মুসলিম #৭০",
    "enrichedRefEn": "Abu Dawud 2/86, An-Nasa'i 3/68. See also Al-Albani, SahihAt-Tirmithi 2/8."
  },
  "hisnul_71": {
    "secondaryCategories": [
      "quranic"
    ],
    "enrichedRefBn": "নাসাঈ, আমালুল ইয়াওমি ওয়াল্লাইলাহ, নং ১০০; ইবনুস সুন্নী, নং ১২১ আর শাইখ আলবানী হাদীসটিকে সহীহুল জামে‘ ৫/৩৩৯ তে এবং সিলসিলাতুল আহাদীসিস সহীহা ২/৬৯৭, নং ৯৭২ তে সহীহ বলেছেন। আর আয়াতটি দেখুন, সূরা আল-বাকারাহ্‌-২৫৫। • হিসনুল মুসলিম #৭১",
    "enrichedRefEn": "An-Nasa'i, 'Amalul-Yawm wal-Laylah (Hadith no. 100), also Ibn As-Sunni (no. 121). See also Al-Albani, Sahihul-Jami' As-Saghir 5/339 and Silsilatul-Ahadith As-Sahihah 2/697 (no. 972)."
  },
  "hisnul_72": {
    "enrichedRefBn": "তিরমিযী ৫/৫১৫, নং ৩৪৭৪; আহমাদ ৪/২২৭, নং ১৭৯৯০। হাদীসটির তাখরীজের জন্য আরও দেখুন, যাদুল মা‘আদ ১/৩০০। • হিসনুল মুসলিম #৭২",
    "enrichedRefEn": "At-Tirmithi 5/515, Ahmad 4/227. See its checking in Ibn Al-Qayyim Al-Jawziyyah's Zddul-Ma'ad 1/300"
  },
  "hisnul_73": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefBn": "ইবন মাজাহ্‌, নং ৯২৫; নাসাঈ, তাঁর আমালুল ইয়াওমি ওয়াল্লাইলাহ গ্রন্থে, হাদীস নং ১০২ আরও দেখুন, সহীহ ইবন মাজাহ, ১/১৫২; মাজমাউয যাওয়াইদ, ১০/১১১ তাছাড়া অচিরেই ৯৫ নং হাদীসেও আসবে। • হিসনুল মুসলিম #৭৩",
    "enrichedRefEn": "Ibn Majah and others. See Al-Albani, Sahih Ibn Majah 1/152 and Majma'uz-Zawd'id 10/111."
  },
  "hisnul_74": {
    "enrichedRefEn": "Al-Bukhari 7/162"
  },
  "hisnul_75": {
    "enrichedRefBn": "আবূ দাউদ, নং ৩৬৬৭। আর শাইখ আলবানী, সহীহ আবি দাউদ ২/৬৯৮ তে হাদীসটিকে হাসান বলেছেন। হাদীসটি হাকিম সংকলন করেছেন, ১/৫৬[২] আর শাইখ আলবানী একে সহীহুত তারগীব ওয়াত-তারহীবে সহীহ বলেছেন ১/২৭[৩] আর তিনি একে নাসাঈ, তাবারানীর দিকে সম্পর্কযুক্ত করেছেন এবং বলেছেন, তাবারানীর সনদ ‘জাইয়্যেদ’ বা ভালো। | হাদীসটি হাকিম সংকলন করেছেন, ১/৫৬২ আর শাইখ আলবানী একে সহীহুত তারগীব ওয়াত-তারহীবে সহীহ বলেছেন ১/২৭৩ আর তিনি একে নাসাঈ, তাবারানীর দিকে সম্পর্কযুক্ত করেছেন এবং বলেছেন, তাবারানীর সনদ ‘জাইয়্যেদ’ বা ভালো। • হিসনুল মুসলিম #৭৫",
    "enrichedRefEn": "This was reported by Abu Dawud (no. 3667). Al-Albani graded it good in Sahih Abu Dawud 2/698. | Al-Hakim 1 / 562, Sahih at-Targhib wa at-Tarhib 1/273, at-Tabarani."
  },
  "hisnul_76": {
    "secondaryCategories": [
      "quranic"
    ],
    "enrichedRefEn": "Al-Ikhlas:1-4. Al-Falaq:1-5. An-Nas:1-6, Abu Dawud 4/322, At-Tirmizi 5/567, Sahih At-Tirmizi 3/182."
  },
  "hisnul_77": {
    "enrichedRefEn": "Muslim 4/2088."
  },
  "hisnul_78": {
    "enrichedRefEn": "Sahih At-Tirmizi 3/142."
  },
  "hisnul_79": {
    "enrichedRefEn": "Al-Bukhari 7/150, An-Nasa'i, At-Tirmizi."
  },
  "hisnul_80": {
    "enrichedRefBn": "আবূ দাউদ ৪/৩১৭, নং ৫০৭১; বুখারী, আল-আদাবুল মুফরাদ, নং ১২০১; নাসাঈ, ‘আমালুল ইয়াওমি ওয়াল লাইলাহ, নং ৯; ইবনুস সুন্নী, নং ৭০। সম্মানিত শাইখ আবদুল আযীয ইবন বায রাহেমাহুল্লাহ তাঁর তুহফাতুল আখইয়ার গ্রন্থের পৃ. ২৩ এ নাসাঈ ও আবূ দাউদের সনদকে হাসান বলেছেন। • হিসনুল মুসলিম #৮০",
    "enrichedRefEn": "Abu Dawud 4/317, An-Nasa'i, Ibn As-Sunni.; "
  },
  "hisnul_81": {
    "enrichedRefBn": "হাদীসটি সংকলন করেছেন, আবূ দাউদ ৪/৩১৮, নং ৫০৭৫; নাসাঈ, আমালুল ইয়াওমি ওয়াল লাইলাহ, নং ৭; ইবনুস সুন্নী, নং ৪১; ইবন হিব্বান, (মাওয়ারিদ) নং ২৩৬১ আর শাইখ ইবন বায তাঁর তুহফাতুল আখইয়ার পৃ. ২৪ এ এর সনদকে হাসান বলেছেন। • হিসনুল মুসলিম #৮১",
    "enrichedRefEn": "Abu Dawud 4/318, Ibn As-Sunni (Hadith no. 41), Ibn Hibban (Hadith no. 2361)."
  },
  "hisnul_82": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefBn": "আবূ দাউদ ৪/৩২৪, নং ৫০৯২; আহমাদ ৫/৪২, নং ২০৪৩০; নাসাঈ, আমালুল ইয়াওমি ওয়াল্লাইলাহ, নং ২২; ইবনুস সুন্নী, নং ৬৯; বুখারী, আল-আদাবুল মুফরাদ, নং ৭০১ আর শাইখ আল্লামা ইবন বায রাহিমাহুল্লাহ ‘তুহফাতুল আখইয়ার’ গ্রন্থের পৃ. ২৬ এ এর সনদকে হাসান বলেছেন। • হিসনুল মুসলিম #৮২",
    "enrichedRefEn": "Abu Dawud 4/324, Ahmad 5/42, An-Nasa'i, Ibn As-Sunni (Hadith no. 69), Ibn Hibban (Hadith no. 2361)."
  },
  "hisnul_83": {
    "enrichedRefBn": "ইবনুস সুন্নী, নং ৭১, মারফূ‘ সনদে; আবূ দাউদ ৪/৩২১; মাওকূফ সনদে, নং ৫০৮১ আর শাইখ শু‘আইব ও আব্দুল কাদের আরনাঊত এর সনদকে সহীহ বলেছেন। দেখুন, যাদুল মা‘আদ ২/৩৭৬। • হিসনুল মুসলিম #৮৩",
    "enrichedRefEn": "Ibn As-Sunni (no. 71), Abu Dawud 4/321, Ibn As-Sunni. Quran 9:129"
  },
  "hisnul_84": {
    "enrichedRefBn": "আবূ দাউদ, নং ৫০৭৪; ইবন মাজাহ্‌, নং ৩৮৭১ আরও দেখুন, সহীহ ইবন মাজাহ্‌ ২/৩৩২ • হিসনুল মুসলিম #৮৪",
    "enrichedRefEn": "Sahih Ibn Majah 2/332, Abu Dawud."
  },
  "hisnul_85": {
    "enrichedRefEn": "Sahih At-Tirmizi 3/142, Abu Dawud."
  },
  "hisnul_86": {
    "enrichedRefBn": "আবূ দাউদ, ৪/৩২৩, নং ৫০৮৮; তিরমিযী, ৫/৪৬৫, নং ৩৩৮৮; ইবন মাজাহ, নং ৩৮৬৯; আহমাদ, নং ৪৪৬। আরও দেখুন, সহীহ ইবন মাজাহ, ২/৩৩২ আর আল্লামা ইবন বায রাহিমাহুল্লাহ তাঁর ‘তুহফাতুল আখইয়ার’ গ্রন্থের ৩৯ পৃষ্ঠায় এটার সনদকে হাসান বলেছেন। • হিসনুল মুসলিম #৮৬",
    "enrichedRefEn": "Abu Dawud 4/323, At-Tirmizi 5/465, Ibn Majah 2/332, Ahmad."
  },
  "hisnul_87": {
    "enrichedRefBn": "[১] আহমাদ ৪/৩৩৭; নং ১৮৯৬৭; নাসাঈ, আমালুল ইয়াওমি ওয়াল-লাইলাহ, নং ৪; ইবনুস সুন্নী, নং ৬৮; আবু দাউদ, ৪/৩১৮, নং ১৫৩১; তিরমিযী ৫/৪৬৫, নং ৩৩৮৯। আর ইবন বায রাহিমাহুল্লাহ ‘তুহফাতুল আখইয়ার’ এর ৩৯ পৃষ্ঠায় একে হাসান বলেছেন। [২] হাইসামী, মাজমাউয যাওয়াইদ ১০/১১৬; আলবানী, সাহীহাহ ?/৪২১; সহীহুত তারগীব ১/১৬০। • হিসনুল মুসলিম #৮৭",
    "enrichedRefEn": "Ahmad 4/ 337, An-Nasa'i, Ibn As-Sunni (no. 68), At-Tirmizi 5/465."
  },
  "hisnul_88": {
    "enrichedRefEn": "Al-Hakim 1/545. He said it is Sahih, and Dhahabi supported it. Also see, Sahih At-targhib wat tarhib 1/273"
  },
  "hisnul_89": {
    "enrichedRefBn": "আবূ দাউদ ৪/৩২২, নং ৫০৮৪; আর শু‘আইব ও আবদুল কাদের আরনাঊত যাদুল মা‘আদের সম্পাদনায় ২/৩৭৩ এর সনদকে হাসান বলেছেন। • হিসনুল মুসলিম #৮৯",
    "enrichedRefEn": "Abu Dawud 4/32."
  },
  "hisnul_90": {
    "enrichedRefBn": "আহমাদ ৩/৪০৬, ৪০৭, নং ১৫৩৬০ ও নং ১৫৫৬৩; ইবনুস সুন্নী, আমালুল ইয়াওমি ওয়াল-লাইলাহ, নং ৩৪ আরও দেখুন, সহীহুল জামে‘উ ৪/২০৯। • হিসনুল মুসলিম #৯০",
    "enrichedRefEn": "Ahmad 3/406-7, 5/123, An-Nasa'i, At-Tirmizi 4/209."
  },
  "hisnul_91": {
    "enrichedRefEn": "Muslim 4/2071."
  },
  "hisnul_92": {
    "enrichedRefBn": "[১]ইমাম আবু ইউসুফ,কিতাবুল আসার ১/৪১-৪২;আলবানী,সহীহুত তারগীব ১/২৬২-২৬৪ [২]আলবানী।সহীহুত তারগীব ১/২৬৩ [৩]আব্দুর রাজ্জাক সান'আনী,আল-মুসান্নাফ ২/২৩৫। [৪]বুখারী(৬৩-কিতাব বাদইয়িল খালক,১১-বাব সিফাত ইব্লিস...) ৩/১১৯৮ (ভা ২/৯৪৭); মুসলিম(৪৮-কিতাবুয যিকর,১০-বাব ফাদলিত তাহলীল...)৪/২০৭১ (ভা ২/৩৪৪)। • হিসনুল মুসলিম #৯২",
    "enrichedRefEn": "An-Nasa'i, Abu Dawud 4/319, Ibn Majah, Ahmad 4/60. Al-Bukhari 4/95, Muslim 4/2071."
  },
  "hisnul_94": {
    "enrichedRefEn": "Muslim 4/2090."
  },
  "hisnul_95": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefBn": "হাদীসটি সংকলন করেছেন, ইবনুস সুন্নী, নং ৫৪; ইবন মাজাহ, নং ৯২৫। আর আব্দুল কাদের ও শু‘আইব আল-আরনাঊত যাদুল মা‘আদের সম্পাদনায় ২/৩৭৫; এর সনদকে হাসান বলেছেন। আর পূর্ব ৭৩ নং এ ও তা গত হয়েছে। • হিসনুল মুসলিম #৯৫",
    "enrichedRefEn": "Ibn As-Sunni (Hadith no. 54), Ibn Majah (Hadith no. 925)."
  },
  "hisnul_96": {
    "enrichedRefEn": "Al-Bukhari,Fathul Bari 11/101, Muslim 4/2075."
  },
  "hisnul_97": {
    "enrichedRefBn": "আহমাদ ২/২৯০, নং ৭৮৯৮; নাসাঈ, আমালুল ইয়াওমি ওয়াল লাইলাহ, নং ৫৯০; ইবনুস সুন্নী, নং ৬৮; আরও দেখুন, সহীহুত তিরমিযী ৩/১৮৭; সহীহ ইবন মাজাহ ২/২৬৬; তুহফাতুল আখইয়ার লি ইবন বায, পৃ. ৪৫। • হিসনুল মুসলিম #৯৭",
    "enrichedRefEn": "Ahmad 2/ 290, An-Nasa'i, At-Tirmizi 3/187, Ibn As-Sunni (Hadith no. 68), Ibn Majah 2/266."
  },
  "hisnul_98": {
    "enrichedRefBn": "তাবরানী হাদীসটি দু’ সনদে সংকলন করেন, যার একটি উত্তম। দেখুন, মাজমা‘উয যাওয়ায়েদ ১০/১২০; সহীহুত তারগীব ওয়াত তারহীব ১/২৭৩ • হিসনুল মুসলিম #৯৮",
    "enrichedRefEn": "At-Tabrani, Sahih at-Targhib wa at-Tarhib 1/273."
  },
  "hisnul_99": {
    "extraVirtueBn": "সহীহ বুখারী ও মুসলিম অনুযায়ী, ঘুমের আগে সূরা ইখলাস, ফালাক ও নাস পড়ে দুই হাতে ফুঁ দিয়ে মাথা, মুখমণ্ডল ও দেহের সামনের দিক থেকে যথাসম্ভব শরীর মাসেহ করবে—এভাবে মোট ৩ বার করবে।",
    "extraVirtueEn": "As reported in Bukhari and Muslim, join the palms, recite Surah Al-Ikhlas, Al-Falaq, and An-Nas, blow gently into them, and wipe over the head, face, and as much of the body as possible — repeating this 3 times before sleep.",
    "extraBenefitsBn": [
      "তিনবার হাতের তালুতে ফুঁ দিয়ে মাথা, মুখ ও শরীর মাসেহ করার সুন্নাহ পদ্ধতি অনুসরণ করলে যাদু, বদনজর ও শয়তানের ক্ষতি থেকে নিরাপত্তা মেলে।"
    ],
    "extraBenefitsEn": [
      "Wiping the head, face, and body three times after reciting the three Quls shields the sleeper from harm and evil."
    ],
    "enrichedRefBn": "বুখারী, (ফাতহুল বারীসহ) ৯/৬২, নং ৫০১৭; মুসলিম ৪/১৭২৩, নং ২১৯২ | তিরমিযী, নং ৩৪০৪; নাসাঈ, আমালুল ইয়াওমি ওয়াল লাইলাহ, নং ৭০৭। আরও দেখুন, সহীহুল জামে‘ ৪/২৫৫। • হিসনুল মুসলিম #৯৯",
    "enrichedRefEn": "Al-Bukhari,Fathul Bari 9/62, Muslim 4/ 1723. | At-Tirmizi, An-Nasa'i, Sahih al-Jami' as-Saghir 4/255."
  },
  "hisnul_100": {
    "enrichedRefEn": "Al-Baqarah 2:255, Al-Bukhari, Fathul Bari 4/487, No 2311 An-Nasa'i, 'Amalul-Yawm wal-Laylah (Hadith no. 100), also Ibn As-Sunni (no. 121). See also Al-Albani, Sahihul-Jami' As-Saghir 5/339 and Silsilatul-Ahadith As-Sahihah 2/697 (no. 972)."
  },
  "hisnul_101": {
    "secondaryCategories": [
      "quranic"
    ],
    "enrichedRefEn": "Al-Baqarah 2:285-6, Al-Bukhari, Fathul Bari 9/94, Muslim 1/554."
  },
  "hisnul_102": {
    "enrichedRefBn": "বুখারী, ফাতহুল বারীসহ ১১/১২৬, নং ৬৩২০; মুসলিম ৪/২০৮৪, নং ২৭১[৪] হাদীসে বর্ণিত صنفة إزاره শব্দের অর্থ হচ্ছে, চাদরের পার্শ্বদিকস্থ অংশ। এর জন্য দেখুন, নিহায়া ফী গারিবিল হাদীস ওয়াল আসার’ ‘صنف’ • হিসনুল মুসলিম #১০২",
    "enrichedRefEn": "Al-Bukhari 11/126, Muslim 4/2084."
  },
  "hisnul_103": {
    "enrichedRefEn": "Muslim 4/2083, Ahmad 2/79."
  },
  "hisnul_104": {
    "enrichedRefBn": "আবূ দাউদ, শব্দ তাঁরই, ৪/৩১১, নং ৫০৪৫; তিরমিযী, নং ৩৩৯৮; আরও দেখুন, সহীহুত তিরমিযী, ৩/১৪৩; সহীহ আবী দাঊদ, ৩/২৪০। • হিসনুল মুসলিম #১০৪",
    "enrichedRefEn": "Abu Dawud 4/311, Sahih At-Tirmizi 3/143."
  },
  "hisnul_105": {
    "enrichedRefEn": "Al-Bukhari, Fathul Bari 11/113, Muslim 4/2083."
  },
  "hisnul_106": {
    "enrichedRefEn": "Al-Bukhari, Fathul Bari 7/71, Muslim 4/2091."
  },
  "hisnul_107": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefEn": "Muslim 4/2084."
  },
  "hisnul_108": {
    "enrichedRefEn": "Muslim 4/2085."
  },
  "hisnul_109": {
    "enrichedRefEn": "Abu Dawud 4/317, Sahih At-Tirmizi 3/142."
  },
  "hisnul_111": {
    "enrichedRefBn": "[১] বুখারী, (ফাতহুল বারীসহ) ১১/১১৩, নং ৬৩১৩; মুসলিম ৪/২০৮১, নং ২৭১০। [২] বুখারী (১০০-কিতাবুত তাওহীদ, ৩৪-বাব...আনযালাহু বিইলমিহি...) ৬/২৭২২ (ভা ২/১১১৫); মুসলিম (৪৮-কিতাবুদ্দাআওয়াত, ১৭-বাব মা ইয়াকূল ইনদান নাওম) ৪/২০৮১ (ভারতীয় ২/৩৪৮)। • হিসনুল মুসলিম #১১১",
    "enrichedRefEn": "Al-Bukhari, Fathul Bari 11/113, Muslim 4/2081."
  },
  "hisnul_112": {
    "enrichedRefBn": "হাদীসটি সংকলন করেছেন, হাকেম এবং তিনি তা সহীহ বলেছেন, আর ইমাম যাহাবী তাকে সমর্থন করেছেন, ১/৫৪০; নাসাঈ, আমালুল ইয়াওমি ওয়াল্লাইলা, নং ২০২; ইবনুস সুন্নী, নং ৭৫৭। আরও দেখুন, সহীহুল জামে‘ ৪/২১৩ • হিসনুল মুসলিম #১১২",
    "enrichedRefEn": "Sahih by Hakim. Imam Dhahabi 1/540; Nasai, Amalul Yaomi Wallayla No. 202, Ibnus sunni No. 757. Also see, Sahih Jame 4:213"
  },
  "hisnul_113": {
    "enrichedRefEn": "Abu Dawud 4/12. See also Al-Albani, Sahih At- Tirmithi 3/171"
  },
  "hisnul_114": {
    "enrichedRefEn": "Muslim 4/1 772, 3."
  },
  "hisnul_116": {
    "enrichedRefBn": "সুনান গ্রন্থকারগণ, আহমাদ, দারামী ও বাইহাকী এ হাদীসটি সংকলন করেছেন। আবূ দাউদ, নং ১৪২৫; তিরমিযী, নং ৪৬৪; নাসাঈ, নং ১৭৪৪; ইবন মাজাহ, নং ১১৭৮; আহমাদ, নং ১৭১৮; দারামী, নং ১৫৯২; হাকিম, ৩/১৭২; বাইহাকী, ২/২০৯। আর দু’ ব্রাকেটের মাঝখানের অংশ বাইহাকীর। আরও দেখুন, সহীহুত তিরমিযী ১/১৪৪, সহীহ ইবন মাজাহ্‌, ১/১৯৪; ইরওয়াউল গালীল, লিল আলবানী, ২/১৭২ • হিসনুল মুসলিম #১১৬",
    "enrichedRefEn": "Abu Dawud, Ibn Majah, An-Nasa'i, At-Tirmithi, Ahmad, Ad-Darimi, Al-Hakim, and Al-Bayhaqi. See also Al-Albani, Sahih At-Tirmithi 1/144, Sahih Ibn Majah 1/194, and 'Irwa'ul-GhaW. 2/ 172."
  },
  "hisnul_117": {
    "enrichedRefBn": "সুনান গ্রন্থকারগণ ও আহমাদ হাদীসটি সংকলন করেছেন। আবূ দাউদ, নং ১৪২৭; তিরমিযী, নং ৩৫৬৬; নাসাঈ, নং ১৭৪৬; ইবন মাজাহ্‌, নং ১১৭৯; আহমাদ, নং ৭৫১ আরও দেখুন, সহীহুত তিরমিযী, ৩/১৮০; সহীহ ইবন মাজাহ্‌, ১/১৯৪, আল-ইরওয়া, ২/১৭৫। • হিসনুল মুসলিম #১১৭",
    "enrichedRefEn": "Abu Dawud, Ibn Majah, An-Nasa'i, At-Tirmithi, Ahmad. See Al-Albani, Sahih At-Tirmithi 3/180, Sahih Ibn Majah 1/194, and 'Irwa'ul-Ghalil. 2/ 175."
  },
  "hisnul_118": {
    "enrichedRefBn": "হাদীসটি বায়হাকী তাঁর ‘আস-সুনানুল কবরা’ গ্রন্থে সংকলন করেছেন এবং তার সনদ বিশুদ্ধ বলেছেন, ২/২১১ আর শাইখ আলবানী ইরওয়াউল গালীল এর ২/১৭০ এ বলেন, ‘এর সনদ বিশুদ্ধ। আর তা উমর রা. থেকে মওকূফ হাদীসে বর্ণিত। • হিসনুল মুসলিম #১১৮",
    "enrichedRefEn": "Al-Bayhaqi graded its chain authentic in As-Sunan Al-Kubra. Al-Albani said in 'Irwa'ul-GhaliL 2/170 that its chain is authentic as a statement of 'Umar."
  },
  "hisnul_119": {
    "enrichedRefBn": "নাসাঈ, ৩/২৪৪, নং ১৭৩৪; দারা কুতনী, ২/৩১ ও অন্যান্যগণ। আর দুই ব্রাকেটের মাঝখানের অংশ দারা কুতনীতে ২/৩১, নং ২ বেশি বর্ণিত। যার সনদ বিশুদ্ধ। আরও দেখুন, শু‘আইব আল-আরনাঊত ও আবদুল কাদের আল-আরনাঊত এর ‘যাদুল মা‘আদ’ গ্রন্থের সম্পাদনা ১/৩৩৭। • হিসনুল মুসলিম #১১৯",
    "enrichedRefEn": "An-Nasa'i 3/244, Ad-Daraqutni and others. The final addition is from Ad-Daraqutni's version 2/ 31 and its chain of narration is authentic. See the checking of Zadul-Ma'ad by Shu'aib Al-Arna'ut and 'Abdul-Qadir Al-Arna'ut 1/337. Abu Dawud 2/87. See also Al-Albani, Sahih Ibn Mdjah 2/335"
  },
  "hisnul_120": {
    "extraVirtueBn": "আবদুল্লাহ ইবনু মাসউদ (রা.) থেকে বর্ণিত: যে ব্যক্তি কোনো দুশ্চিন্তা বা শোকে আক্রান্ত হয়ে এই দোয়া পড়বে, আল্লাহ তার দুঃখ-উৎকণ্ঠা দূর করে দেবেন এবং বেদনাকে আনন্দে রূপান্তরিত করবেন। বি. দ্র.: মহিলারা পাঠ করলে শুরুতে \"আল্লা-হুম্মা ইন্নী আমাতুকা, ওয়া বিনতু আবদিকা ওয়া বিনতু আমাতিকা...\" (অর্থাৎ: হে আল্লাহ, আমি আপনার বান্দী, আপনার এক বান্দার কন্যা ও আপনার এক বান্দীর কন্যা...) বলবেন।",
    "extraVirtueEn": "Ibn Mas‘ud (RA) reported that whoever recites this when afflicted by anxiety or sorrow, Allah will remove their grief and replace it with joy. Note: Women reciting this may say \"Allahumma inni amatuka, wa bintu ‘abdika wa bintu amatika...\" (\"O Allah, I am Your female servant, daughter of Your male servant and daughter of Your female servant...\").",
    "extraBenefitsBn": [
      "দুশ্চিন্তা ও শোক দূর হয়ে মনে প্রশান্তি ও আনন্দ ফিরে আসার পরীক্ষিত নবী-শেখানো দোয়া।",
      "নারীদের জন্য উপযুক্ত সর্বনাম (\"ইন্নী আমাতুকা ওয়া বিনতু আবদিকা...\") ব্যবহারের ফিকহী দিকনির্দেশনা রয়েছে।"
    ],
    "extraBenefitsEn": [
      "Prophetic remedy that removes grief and anxiety and replaces them with relief and joy.",
      "Includes the appropriate feminine wording (\"inni amatuka wa bintu ‘abdika...\") for women."
    ],
    "enrichedRefBn": "আহমাদ ১/৩৯১, নং ৩৭১২ আর শাইখ আলবানী তাঁর সিলসিলাতুল আহাদীসিস সহীহাহ গ্রন্থে ১/৩৩৭ একে সহীহ বলেছেন। • হিসনুল মুসলিম #১২০",
    "enrichedRefEn": "Ahmad 1/391, and Al-Albani graded it authentic."
  },
  "hisnul_121": {
    "secondaryCategories": [
      "rizq"
    ],
    "extraVirtueBn": "সহীহ বুখারীর বর্ণনায়, রাসূলুল্লাহ ﷺ দুশ্চিন্তা, অলসতা, ঋণের চাপ ও মানুষের আধিপত্য থেকে আশ্রয় চেয়ে এই দোয়াটি অত্যন্ত বেশি পরিমাণে পাঠ করতেন।",
    "extraVirtueEn": "Sahih al-Bukhari notes that the Prophet ﷺ used to recite this supplication frequently to seek refuge from anxiety, laziness, overwhelming debt, and overpowering of people.",
    "extraBenefitsBn": [
      "রাসূলুল্লাহ ﷺ-এর নিয়মিত পঠিত দোয়া; ঋণের বোঝা, অলসতা ও মানসিক অবসাদ থেকে মুক্ত হতে সহায়ক।"
    ],
    "extraBenefitsEn": [
      "Frequently recited by the Prophet ﷺ for relief from debt, laziness, and emotional distress."
    ],
    "enrichedRefBn": "বুখারী, ৭/১৫৮, নং ২৮৯৩; আরও দেখুন, বুখারী, (ফাতহুল বারীসহ) ১১/১৭৩; আরও দেখুন যা ৪১.২ নং দুআ এ বর্ণিত হবে। • হিসনুল মুসলিম #১২১",
    "enrichedRefEn": "Al-Bukhari 7/158. See also Al-Asqalani, Fathul-Bari 11/173"
  },
  "hisnul_122": {
    "extraVirtueBn": "ইবনু আব্বাস ও আলী (রা.) উভয়ের বর্ণনায় রাসূলুল্লাহ ﷺ চরম বিপদ ও কষ্টের সময় এই যিকির পড়তেন। লক্ষ্যণীয়, এতে সরাসরি কোনো কিছু চাওয়ার শব্দ নেই; বরং আল্লাহর মহত্ত্ব ও তাওহীদের যিকিরের মাধ্যমেই তাঁর কাছে পরিপূর্ণ আত্মসমর্পণ করা হয়েছে।",
    "extraVirtueEn": "Both Ibn ‘Abbas and ‘Ali (RA) reported that the Prophet ﷺ recited these words during severe distress. Notably, this supplication consists purely of glorifying Allah’s Oneness and Majesty—expressing complete surrender to Him in times of hardship.",
    "extraBenefitsBn": [
      "আল্লাহর একত্ববাদ ও আরশের মহত্ত্ব ঘোষণার মাধ্যমে কঠিন বিপদ থেকে তাৎক্ষণিক সাহায্য মেলে।"
    ],
    "extraBenefitsEn": [
      "Declaring Allah’s Oneness and Majesty brings immediate divine relief during moments of severe calamity."
    ],
    "enrichedRefBn": "[১] বুখারী ৫/২৩৩৬ (ভা ২/৯৩৯); মুসলিম ৪/২০৯২, নং ২৭৩০ (ভা ২/৩৫১) [২] সহীহ। সহীহ ইবনু হিব্বান ৩/১৪৭, মুসনাদ আহমদ ১/৯৪, মাওয়ারিদুয যামআন ৭/৪০৩-৪০৪ • হিসনুল মুসলিম #১২২",
    "enrichedRefEn": "Al-Bukhari 8/154, Muslim 4/2092"
  },
  "hisnul_123": {
    "enrichedRefBn": "আবূ দাউদ, ৪/৩২৪, নং ৫০৯০; আহমাদ ৫/৪২, নং ২০৪৩০। আর শাইখ আলবানী সহীহ আবি দাউদ গ্রন্থে ৩/৯৫৯ এটাকে হাসান হাদীস বলেছেন। • হিসনুল মুসলিম #১২৩",
    "enrichedRefEn": "Abu Dawud 4/324, Ahmad 5/42. Al-Albani graded it as good in Sahih Abu Dawud 3/959"
  },
  "hisnul_124": {
    "enrichedRefEn": "Surah Al-Anbiya - 21:87"
  },
  "hisnul_125": {
    "extraVirtueBn": "আয়েশা (রা.) বর্ণনা করেন, রাসূলুল্লাহ ﷺ পরিবারের সবাইকে একত্র করে বিপদের সময় এই বাক্য পড়তে বলতেন। সনদের একটি পথে সামান্য দুর্বলতা থাকলেও একাধিক সনদের সমন্বয়ে হাদীসটি ‘হাসান’ (গ্রহণযোগ্য)। এটি সম্পূর্ণ তাওহীদনির্ভর আত্মসমর্পণের দোয়া।",
    "extraVirtueEn": "‘Aishah (RA) narrated that the Prophet ﷺ gathered his family and taught them to recite these words in distress. Though one chain has minor weakness, multiple corroborating chains elevate it to Hasan (sound).",
    "extraBenefitsBn": [
      "আল্লাহই আমাদের রব এবং তাঁর কোনো শরীক নেই—এই তাওহীদী ঘোষণায় বিপদাপদ দূর হয়।"
    ],
    "extraBenefitsEn": [
      "Affirming Allah as our sole Lord without any partner brings relief during hardship (Hasan by corroborating chains)."
    ],
    "enrichedRefBn": "[১] হাইসামী, মাওয়ারিদুয যামআন ৭/৪০০-৪০১ [২] ইবনু হাজার আসকালানী, ফাতহুল বারী ১১/১৪৬-১৪৭ • হিসনুল মুসলিম #১২৫",
    "enrichedRefEn": "Abu Dawud 2/87 No. 1525,Ibn Maah No. 3882, Also see Sahih Ibn Majah 2/335"
  },
  "hisnul_126": {
    "enrichedRefEn": "Abu Dawud 2/89, and Al-Hakim graded it authentic and Ath-Thahabi agreed 2/142"
  },
  "hisnul_127": {
    "enrichedRefEn": "Abu Dawud 3/42, At-Tirmithi 5/572. See also Al-Albani, Sahih At-Tirmithi 3/183."
  },
  "hisnul_128": {
    "enrichedRefEn": "Surah Al-Imran - 3:173"
  },
  "hisnul_129": {
    "secondaryCategories": [
      "quranic"
    ],
    "enrichedRefBn": "বুখারী, আল-আদাব আল-মুফরাদ, নং ৭১২ আর শাইখ আলবানী সহীহ আল-আদাবুল মুফরাদ গ্রন্থে, নং ৫৪৫, একে সহীহ বলেছেন। • হিসনুল মুসলিম #১২৯",
    "enrichedRefEn": "Bukhari, Al Adab Al Mufrad No. 712 . Al-Albani graded it as sahih in Sahih Adab Al Mufrad No. 585"
  },
  "hisnul_130": {
    "enrichedRefBn": "বুখারী, আল-আদাব আল-মুফরাদ, নং ৭০৮। আর শাইখ আলবানী সহীহ আল-আদাবুল মুফরাদ গ্রন্থে, নং ৫৪৬, একে সহীহ বলেছেন। • হিসনুল মুসলিম #১৩০",
    "enrichedRefEn": "Bukhari, Al Adab Al Mufrad No. 708 . Al-Albani graded it as sahih in Sahih Adab Al Mufrad No. 586"
  },
  "hisnul_131": {
    "enrichedRefEn": "Muslim 3/1362."
  },
  "hisnul_132": {
    "enrichedRefEn": "Muslim 4/2300."
  },
  "hisnul_133": {
    "enrichedRefEn": "Al Bukhaaree with al-Fath 6/336 and Muslim 1/120 Muslim 1/119,120."
  },
  "hisnul_135": {
    "enrichedRefBn": "সূরা হাদীদ-৩, আবূ দাউদ ৪/৩২৯, নং ৫১১০। আর শাইখ আলবানী সহীহ আবি দাউদ ৩/৯৬২ একে হাসান বলেছেন। • হিসনুল মুসলিম #১৩৫",
    "enrichedRefEn": "Al Hadid 57:3; Abu Dawud 4/329. Declared hasan by Al-Albaanee and al-Arna'uut"
  },
  "hisnul_136": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefEn": "At-Tirmithi 5/560. See also Al-Albani, Sahih At-Tirmithi 3/180"
  },
  "hisnul_137": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefEn": "Al-Bukhaaree 7/157"
  },
  "hisnul_138": {
    "extraVirtueBn": "উসমান ইবনুল আস (রা.) আরজ করলেন: হে আল্লাহর রাসূল! শয়তান আমার সালাত ও কিরাআতে বিভ্রান্তি সৃষ্টি করে। তখন নবীজি ﷺ তাঁকে ‘আউযুবিল্লাহ’ পড়ে বাম দিকে তিনবার হালকা থুতু ফেলতে নির্দেশ দেন; তিনি আমল করার পর আল্লাহ তাঁকে তা থেকে সম্পূর্ণ মুক্ত করেন।",
    "extraVirtueEn": "‘Uthman ibn Abi al-‘As (RA) complained that Shaytan interfered with his prayer and recitation. The Prophet ﷺ instructed him to seek refuge in Allah and spit lightly to his left three times; upon doing so, Allah relieved him completely.",
    "extraBenefitsBn": [
      "সালাতে একাগ্রতা নষ্টকারী শয়তানী ওয়াসওয়াসা দূর করার পরীক্ষিত ও সহীহ সুন্নাহ আমল।"
    ],
    "extraBenefitsEn": [
      "Proven Prophetic remedy for dispelling Shaytan’s distractions during prayer and Quran recitation."
    ],
    "enrichedRefEn": "Muslim 4/1729"
  },
  "hisnul_139": {
    "enrichedRefBn": "সহীহ ইবন হিব্বান ২৪২৭, (মাওয়ারিদ); ইবনুস সুন্নী, নং ৩৫১ আর হাফেয (ইবন হাজার) বলেন, এটি সহীহ হাদীস। তাছাড়া আবদুল কাদের আরনাউত ইমাম নওয়াবীর আযকার গ্রন্থের তাখরীজে পৃ. ১০৬, একে সহীহ বলে মত প্রকাশ করেছেন। • হিসনুল মুসলিম #১৩৯",
    "enrichedRefEn": "Ibn Hibban in his Sahih (no. 2427), and Ibn As- Sunni (no. 351). Al-Hafidh (Ibn Hajar) said that this Hadith is authentic. It was also declared authentic by 'Abdul-Qadir Al-Arna'ut in his checking of An-Nawawi's Kitabul-Athkarp. p106"
  },
  "hisnul_140": {
    "enrichedRefBn": "আবূ দাউদ ২/৮৬, ১৫২১; তিরমিযী ২/২৫৭, নং ৪০৬; আর শাইখ আলবানী সহীহ আবি দাউদে ১/২৮৩ একে সহীহ বলে মত প্রকাশ করেছেন। • হিসনুল মুসলিম #১৪০",
    "enrichedRefEn": "Abu Dawud 2/86, At-Tirmithi 2/257. Al-Albani graded it authentic in Sahih Abu Dawud 1/283."
  },
  "hisnul_141": {
    "extraVirtueBn": "আলেমগণ উল্লেখ করেছেন: শয়তানকে তাড়াতে আযান দেওয়া, যিকির ও কুরআন তিলাওয়াত করা এবং সকাল-সন্ধ্যার যিকির, ঘুম-জাগরণের যিকির ও ঘরে প্রবেশ-বের হওয়ার দোয়াসমূহ নিয়মিত পড়া অত্যন্ত কার্যকর।",
    "extraVirtueEn": "Scholars highlight that Shaytan is repelled through calling the Adhan, remembering Allah, reciting the Qur’an, and consistently maintaining the morning, evening, sleep, waking, and home entry/exit supplications.",
    "extraBenefitsBn": [
      "সকাল-সন্ধ্যার যিকির, আযান ও কুরআন তিলাওয়াত শয়তানের ওয়াসওয়াসা স্থায়ীভাবে প্রতিহত করে।"
    ],
    "extraBenefitsEn": [
      "Consistency in Adhan, Quran recitation, and daily adhkar keeps Shaytan’s whispers away."
    ],
    "enrichedRefBn": "[১] আবূ দাউদ ১/২০৩, ইবন মাজাহ্‌ ১/২৬৫, নং ৮০৭। আর পূর্বে ৩১ নং হাদীসে এর তাখরীজ চলে গেছে। আরও দেখুন, সূরা আল-মুমিনূন এর ৯৭-৯৮ [২] মুসলিম ১/২৯১; নং ৩৮৯; বুখারী, ১/১৫১, নং ৬০৮। [৩] নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেন, “তোমরা তোমাদের ঘরসমূহ কবরে পরিণত করুন না। নিশ্চয় শয়তান ঐ ঘর থেকে পলায়ন করে যেখানে সূরা বাকারাহ্‌ পাঠ করা হয়।” মুসলিম ১/৫৩৯, হাদীস নং ৭৮০। • হিসনুল মুসলিম #১৪১",
    "enrichedRefEn": "Abu Dawud 1/206, At-Tirmithi. See also Al-Albani, Sahih At-Tirmithi 1/77, and Surat Al-Mu'minun, 23:98-9. Muslim 1/291, Al-Bukhari 1/151. 'Do not turn your homes into graveyards, surely the Devil flees from the house in which Surat Al-Baqarah is read,' Muslim 1/539."
  },
  "hisnul_144": {
    "extraVirtueBn": "রাসূলুল্লাহ ﷺ সতর্ক করেছেন: \"যদি আমি এমন করতাম তবে এমন হতো\" বলো না; কেননা ‘যদি’ কথাটি শয়তানের কাজের দরজা খুলে দেয়। বরং ‘কাদারুল্লাহি ওয়া মা শাআ ফাআলা’ বলে তাকদীরে সন্তুষ্ট থাকো।",
    "extraVirtueEn": "The Prophet ﷺ cautioned against saying \"If only I had done such and such,\" because \"if only\" opens the door to Shaytan’s whispers; instead, accept Allah’s decree with contentment.",
    "extraBenefitsBn": [
      "‘যদি এমন হতো’ ধরনের হতাশাজনক কথা পরিহার করে আল্লাহর তাকদীরে সন্তুষ্ট থাকার সুন্নাহ শিক্ষা।"
    ],
    "extraBenefitsEn": [
      "Guards the heart against regretful \"if only\" thoughts that open the door to Shaytan."
    ],
    "enrichedRefEn": "Muslim 4/2052 Abu Daawud and see: checking of Zaad Al-Ma'aad, Pg. 106"
  },
  "hisnul_145": {
    "enrichedRefBn": "[১] এটি হাসান বসরী রাহিমাহুল্লাহর বাণী হিসেবে উল্লেখিত হয়েছে। দেখুন, তুহফাতুল মাওদূদ লি ইবনিল কাইয়্যেম, পৃ. ২০; তিনি একে ইবনুল মুনযির এর আল-আওসাত্ব গ্রন্থের দিকে সম্পর্কযুক্ত করেছেন। [২] এটি ইমাম নাওয়াবী তার আল-আযকার গ্রন্থে পৃ. ৩৪৯ উল্লেখ করেছেন। আরও দেখুন, সহীহুল আযকার লিন নাওয়াবী, সলীম আল-হিলালী, ২/৭১[৩] আর এর বিস্তারিত তাখরীজ দেখার জন্য গ্রন্থকারের ‘আয-যিকর ওয়াদ দো‘আ ওয়াল ‘ইলাজ বির রুকা’ গ্রন্থটি দেখুন, পৃ. ১/৪১৬। • হিসনুল মুসলিম #১৪৫",
    "enrichedRefEn": "This is menioned as a saying of Hasan Al basri Rahimullah. See tuhfatul maodud fi Ibn Qaiiyum, Page. 20, he connected this with Ibn Munzir's Al-Awsat An-Nawawi Al-Azkar Page. 349. Also see Sahih Azkar fil Nawawi, Salim al Hilali 2/713. For more details, read Az Zikr wa dua Wal Ilaj bir Ruqwa Page. 1/416"
  },
  "hisnul_146": {
    "enrichedRefBn": "বুখারী ৪/১১৯, নং ৩৩৭১; ইবন আব্বাস রাদিয়াল্লাহু আনহুমার হাদীস থেকে। • হিসনুল মুসলিম #১৪৬",
    "enrichedRefEn": "Al-Bukhari 4/119."
  },
  "hisnul_147": {
    "enrichedRefBn": "তিরমিযী, নং ৯৬৯; ইবন মাজাহ্‌, নং ১৪৪২; আহমাদ, নং ৯৭৫। আরও দেখুন, সহীহ ইবন মাজাহ্ ১/২৪৪; সহীহুত তিরমিযী, ১/২৮৬। তাছাড়া শাইখ আহমাদ শাকেরও হাদীসটি বিশুদ্ধ বলেছেন। • হিসনুল মুসলিম #১৪৭",
    "enrichedRefEn": "At-Tirmithi, Ibn Majah, Ahmad. See, Al-Albani, Sahih Ibn Majah 1/244, and Sahih At-Tirmithi 1/286. It was also graded authentic by Ahmad Shakir."
  },
  "hisnul_149": {
    "enrichedRefBn": "বুখারী (ফাতহুল বারীসহ) ১০/১১৮, নং ৩৬১৬। | [১] তিরমিযী, নং ২০৮৩; আবূ দাউদ, নং ৩১০৬। আরও দেখুন, ২/২১০; সহীহুল জামে‘ ৫/১৮০। [২] তিরমিযী (৮-কিতাবুল জানাইয, ২-ইয়াদাতিল মারীদ) ৩/৩০০ (ভারতীয় ১/১৯১); ইবন মাজাহ (৬-কিতাবুল জানাইয, ২-মান আদা মারীদান) ১/৪৬৩ (ভারতীয় ২/১৫১); মুসতাদরাক হাকিম ১/৫০১ • হিসনুল মুসলিম #১৪৯",
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani Fathul-Bari 10/118 | At-Tirmithi, Abu Dawud. See also Al-Albani, Sahih At-Tirmithi 2/210 and Sahihul-Jami' As-Saghir 5/180."
  },
  "hisnul_150": {
    "enrichedRefEn": "Al-Bukhari7/10, Muslim 4/1893"
  },
  "hisnul_151": {
    "enrichedRefBn": "বুখারী, (ফাতহুল বারীসহ), ৮/১৪৪, নং ৪৪৪৯; তবে হাদীসে মিসওয়াকের উল্লেখও এসেছে। • হিসনুল মুসলিম #১৫১",
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 8/144. The Hadith also mention him using the Siwak (tooth stick)."
  },
  "hisnul_152": {
    "extraVirtueBn": "আবূ সাঈদ খুদরী ও আবূ হুরাইরা (রা.) থেকে বর্ণিত: কোনো বান্দা অসুস্থ অবস্থায় তাওহীদের এ বাক্যগুলো বললে আল্লাহ তার কথার সত্যায়ন করেন এবং সেই অবস্থায় তার মৃত্যু হলে জাহান্নামের আগুন তাকে স্পর্শ করবে না। (তিরমিযী ও ইবনু মাজাহ — হাসান)।",
    "extraVirtueEn": "Abu Sa‘id al-Khudri and Abu Hurairah (RA) narrated that when a sick servant affirms these words of Tawhid, Allah testifies to their truth, and if they pass away in that illness, the Hellfire will not touch them. (Tirmidhi & Ibn Majah — Hasan).",
    "extraBenefitsBn": [
      "অসুস্থ ব্যক্তির মুখে এই তাওহীদী যিকির উচ্চারিত অবস্থায় ইন্তেকাল হলে জাহান্নামের আগুন থেকে নাজাত লাভ হয় (হাসান হাদীস)।"
    ],
    "extraBenefitsEn": [
      "Protects the sick believer from the Fire if they pass away affirming these words of Tawhid (Hasan)."
    ],
    "enrichedRefBn": "হাদীসটি ইমাম তিরমিযী সংকলন করেছেন, নং ৩৪৩০; ইবন মাজাহ্‌, নং ৩৭৯৪; আর শাইখ আলবানী একে সহীহ বলেছেন। দেখুন, সহীহুত তিরমিযী ৩/১৫২; সহীহ ইবন মাজাহ ২/৩১৭। | তিরমিযী (৪৯-কিতাবুদ্দাআওয়াত, ৩৭-মা ইয়াকূলু..ইযা মারিদা) ৫/৪৫৮ (ভারতীয় ২/১৮১); রাহে বেলায়াত - যিকর নং ২২৬ • হিসনুল মুসলিম #১৫২",
    "enrichedRefEn": "At-Tirmithi and Ibn Majah. See also Al-Albani, Sahih At-Tirmithi 3/152 and Sahih Ibn Majah 2/317.; Rahe Belayat (Dhikr # 226)"
  },
  "hisnul_153": {
    "enrichedRefEn": "Abu Dawud 3/190. See also Al-Albani, Sahihul-Jami' As-Saghir 5/432."
  },
  "hisnul_154": {
    "enrichedRefEn": "Muslim 2/632."
  },
  "hisnul_155": {
    "enrichedRefEn": "Muslim 2/634"
  },
  "hisnul_156": {
    "enrichedRefEn": "Muslim 2/663."
  },
  "hisnul_157": {
    "enrichedRefBn": "আবূ দাঊদ, নং ৩২০১; তিরমিযী, নং ১০২৪; নাসাঈ, নং ১৯৮৫; ইবন মাজাহ, ১/৪৮০, নং ১৪৯৮; আহমাদ ২/৩৬৮, নং ৮৮০৯। আরও দেখুন, সহীহ ইবন মাজাহ্‌ ১/২৫১ • হিসনুল মুসলিম #১৫৭",
    "enrichedRefEn": "Ibn Majah 1/480, Ahmad 2/368. See also Al-Albani, Sahih Ibn Majah 1/251"
  },
  "hisnul_158": {
    "enrichedRefBn": "ইবন মাজাহ্‌, নং ১৪৯৯। দেখুন, সহীহ ইবন মাজাহ ১/২৫১ তাছাড়া হাদীসটি আবূ দাউদও বর্ণনা করেছেন, ৩/২১১, নং ৩২০২ • হিসনুল মুসলিম #১৫৮",
    "enrichedRefEn": "Ibn Majah, Abu Dawud 3/211. See also Al Albani, Sahih Ibn Majah 1/251"
  },
  "hisnul_159": {
    "enrichedRefBn": "হাদীসটি সংকলণ করেন, হাকেম তাঁর মুস্তাদরাকে এবং সহীহ বলেছেন, ১/৩৫৯; আর যাহাবী সেটা সমর্থন করেছেন। আরও দেখুন, আলবানী, আহকামুল জানায়েয, পৃ. ১২৫। • হিসনুল মুসলিম #১৫৯",
    "enrichedRefEn": "Al-Hakim 1/359 who graded it authentic and Ath-Thahabi agreed with him. See also Al-Albani, Ahkamul-Jana'iz, p. 125"
  },
  "hisnul_160": {
    "enrichedRefBn": "সা‘ঈদ ইবনুল মুসাইয়্যেব বলেন, আমি আবু হুরাইরা রাদিয়াল্লাহু আনহুর পিছনে একটি শিশুর জানাযার সালাত আদায় করেছি, যে শিশু কখনও কোনো গুনাহ করে নি, তখন আমি তাকে (উপরোক্ত দো‘আটি) বলতে শুনলাম....। হাদীসটি ইমাম মালেক তার মুওয়াত্তা গ্রন্থে সংকলন করেন, ১/২৮৮; ইবন আবী শাইবাহ তার মুসান্নাফ গ্রন্থে, ৩/২১৭; বাইহাকী, ৪/৯। আর শাইখ শু‘আইব আল-আরনাউত শারহুস সুন্নাহ লিল বাগভীর তাহকীকে ৫/৩৫৭, এটার সনদকে সহীহ বলেছেন। | দেখুন, আল-মুগনী, লি ইবন কুদামা, ৩/৪১৬; আরও দেখুন, আদ-দুরুসুল মুহিম্মাহ লি ‘আম্মাতিল উম্মাহ, লিশ শাইখ আবদিল আযীয ইবন আব্দিল্লাহ ইবন বায, রাহেমাহুল্লাহ, পৃ. ১৫। • হিসনুল মুসলিম #১৬০",
    "enrichedRefEn": "Malik al Muatta 1/288 ; Ibn Abi Saibah 3/217; Baihaqi 4/9; | Ibn Qudamah, Al-Mughni 3/416 and Ad-Duroosul-Muhimmah li-Aammatil-'Ummah, pg. 15, by Shaikh 'Abdul-'Aziz bin Baz.; "
  },
  "hisnul_161": {
    "enrichedRefBn": "হাসান বসরী রাহেমাহুল্লাহ যখন ছোট শিশুদের জানাযা পড়তেন তখন তার উপর সূরা ফাতেহা পড়তেন এবং উপরোক্ত দো‘আ বলতেন। হাদীসটি ইমাম বাগভী তার শারহুস সুন্নাহ ৫/৩৫৭ এ বর্ণনা করেছেন। আরও বর্ণনা করেছেন, আব্দুর রায্‌যাক তার মুসান্নাফে, নং ৬৫ ৮৮। তাছাড়া ইমাম বুখারী, কিতাবুল জানায়েয এর, ৬৫, বাবু কিরাআতি ফাতিহাতিল কিতাব আলাল জানাযাত ২/১১৩; ১৩৩৫ নং হাদীসের পূর্বে এটাকে তা‘লীক বা সনদ ব্যতীত বর্ণনা করেছেন। • হিসনুল মুসলিম #১৬১",
    "enrichedRefEn": "Al-Hasan (Al-Basri) used to recite Al-Fatihah for a child's funeral and then say this. Al-Bukhari, Kitabul-Jana'iz, p. 65.; "
  },
  "hisnul_162": {
    "extraVirtueBn": "উসামা ইবনু যাইদ (রা.) বর্ণনা করেন: নবীজি ﷺ তাঁর কন্যাকে সন্তানের মৃত্যুকালে ধৈর্য ও সাওয়াবের প্রত্যাশা করার এই বাক্যগুলো পাঠিয়েছিলেন। শোকসন্তপ্তকে যেকোনো বৈধ ভাষায় সান্ত্বনা দেওয়া যায়, তবে সুন্নাহ বাক্য অনুসরণে সর্বাধিক বরকত নিহিত।",
    "extraVirtueEn": "Usamah ibn Zayd (RA) narrated that the Prophet ﷺ sent these words of consolation to his daughter during her child’s passing, urging patience and hope for Allah’s reward. Comforting words in any language are valid, though following the Prophetic wording carries the greatest blessing.",
    "extraBenefitsBn": [
      "মৃত্যুশোকে কাতর পরিবারকে তাওহীদ ও তাকদীরের প্রতি সন্তুষ্টির মাধ্যমে সর্বোচ্চ সান্ত্বনা প্রদান করে।"
    ],
    "extraBenefitsEn": [
      "Consoles grieving families by anchoring the heart in Allah’s ownership and decree."
    ],
    "enrichedRefBn": "বুখারী, ২/৮০, নং ১২৮৪; মুসলিম, ২/৬৩৬, নং ৯২৩ | আল-আযকার লিন নাওয়াওয়ী, পৃ. ১২৬। • হিসনুল মুসলিম #১৬২",
    "enrichedRefEn": "Al-Bukhari 2/80, Muslim 2/636. | An-Nawawi, Kitabul-'Athkar, p. 126."
  },
  "hisnul_163": {
    "enrichedRefBn": "আবূ দাউদ ৩/৩১৪, নং ৩২১৫ সহীহ সনদে; অনুরূপভাবে আহমাদ, নং ৫২৩৪; আর ৪৮১২ এর শব্দ হচ্ছে, ‘বিসমিল্লাহ ওয়া আলা মিল্লাতি রাসূলিল্লাহ’ অর্থাৎ ‘আল্লাহর নামে এবং রাসূলুল্লাহর মিল্লাতের উপর।’ তার সনদও বিশুদ্ধ। • হিসনুল মুসলিম #১৬৩",
    "enrichedRefEn": "Abu Dawud 3/314 with an authentic chain. Ahmad also recorded it with the wording: With the Name of Allah, and according to the religion of the Messenger of Allah. Its chain is also authentic."
  },
  "hisnul_164": {
    "extraVirtueBn": "উসমান ইবনু আফফান (রা.) বলেন: নবী ﷺ দাফন শেষে কবরের পাশে দাঁড়িয়ে বলতেন—\"তোমাদের ভাইয়ের জন্য ক্ষমা চাও এবং তার অটল থাকার দোয়া কর; কেননা এখনই তাকে জিজ্ঞাসাবাদ করা হবে।\"",
    "extraVirtueEn": "‘Uthman ibn ‘Affan (RA) narrated that after burial, the Prophet ﷺ stood by the grave and instructed: \"Ask forgiveness for your brother and pray for his steadfastness, for he is now being questioned.\"",
    "extraBenefitsBn": [
      "দাফনের পর কবরের পাশে দাঁড়িয়ে মৃতের ক্ষমা ও মুনকার-নাকীরের প্রশ্নে অবিচলতার দোয়া করা সুন্নাহ।"
    ],
    "extraBenefitsEn": [
      "Sunnah practice at the graveside to pray for the deceased’s forgiveness and firmness during questioning."
    ],
    "enrichedRefBn": "আবু দাউদ ৩/৩১৫, নং ৩২২৩; হাকেম এবং তিনি একে সহীহ বলেছেন, আর যাহাবী সমর্থন করেছেন, ১/৩৭০। | [১] মুসলিম (১-কিতাবুল ইমান, ৫৪-ইসলাম ইযাহদিমু মা কাবলাহু...) ১/১১২-১১৩ (ভারতীয় ১/৭৬)। [২] আবূ দাউদ (কিতাবুল জানাইয, বাবুল ইসতিগফার ইন্দাল কাবর) ৩/২১৩ (ভারতীয় ২/২৪৫৯); আলবানী, আহকামুল জানাইয, পৃষ্ঠা ১৫৫। [৩] ইরাকী, তাখরীজু আহাদীসিল ইহইয়া ৯/৪০৮; হাইসামী, মাজমাউয যাওয়ায়িদ ৩/১৬৩; সাখাবী, আল-মাকাসিদুল হাসানা, পৃষ্ঠা ২৬৫। • হিসনুল মুসলিম #১৬৪",
    "enrichedRefEn": "Abu Dawud 3/315, and Al-Hakim 1/370 who graded it authentic and Ath-Thahabi agreed."
  },
  "hisnul_165": {
    "enrichedRefBn": "মুসলিম ২/৬৭১, নং ৯৭৫; ইবন মাজাহ্‌, ১/৪৯৪, আর শব্দ তাঁরই, নং ১৫৪৭; বুরাইদা রাদিয়াল্লাহু ‘আনহু থেকে। আর দু ব্রাকেটের মাঝখানের অংশ আয়েশা রাদিয়াল্লাহু আনহার হাদীস থেকে, যা সংকলন করেছেন, মুসলিম, ২/৬৭১, নং ৯৭৫। • হিসনুল মুসলিম #১৬৫",
    "enrichedRefEn": "Muslim 2/671, Ibn Majah 1/494, the portion brackets is from Muslim 2/671."
  },
  "hisnul_166": {
    "enrichedRefBn": "আবূ দাউদ ৪/৩২৬, নং ৫০৯৯; ইবন মাজাহ্‌ ২/১২২৮, নং ৩৭২৭। আরও দেখুন, সহীহ ইবন মাজাহ্‌ ২/৩০৫। • হিসনুল মুসলিম #১৬৬",
    "enrichedRefEn": "Abu Dawud 4/326, Ibn Majah 2/1228. See also Al-Albani, Sahih Ibn Mjjah 2/305"
  },
  "hisnul_167": {
    "enrichedRefEn": "Muslim 2/616, Al-Bukhari 4/76."
  },
  "hisnul_168": {
    "enrichedRefBn": "মুওয়াত্তা ইমাম মালেক ২/৯৯২ আর আলবানী তাঁর সহীহুল কালেমিত তাইয়্যেব গ্রন্থে পৃ. ১৫৭, বলেন, “এর সনদটি মওকূফ সহীহ”। • হিসনুল মুসলিম #১৬৮",
    "enrichedRefEn": "See Al-Muwatta' 2/992. It was graded authentic by Al-Albani as a statement of Abdullah bin Zubayr only."
  },
  "hisnul_169": {
    "enrichedRefBn": "আবূ দাউদ, ১/৩০৩, নং ১১৭১ আর শাইখ আলবানী সহীহ আবি দাউদে একে সহীহ বলেছেন, ১/২১৬। • হিসনুল মুসলিম #১৬৯",
    "enrichedRefEn": "Abu Dawud 1/303. See also Al-Albani SahihAbu Dawud 1/216."
  },
  "hisnul_170": {
    "enrichedRefEn": "Al-Bukhari 1/224, Muslim 2/613."
  },
  "hisnul_171": {
    "enrichedRefBn": "আবূ দাউদ ১/৩০৫, নং ১১৭৮। আর শাইখ আলবানী তাঁর সহীহ আবি দাউদে একে হাসান বলেছেন, ১/২১৮। • হিসনুল মুসলিম #১৭১",
    "enrichedRefEn": "Abu Dawud 1/305. Al-Albani graded it good in Sahih Abu Dawud 1/218."
  },
  "hisnul_172": {
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 2/518"
  },
  "hisnul_173": {
    "enrichedRefEn": "Al-Bukhari 1/205, Muslim 1/83."
  },
  "hisnul_174": {
    "enrichedRefEn": "Al-Bukhari 1/224, Muslim 1/614"
  },
  "hisnul_175": {
    "enrichedRefEn": "At-Tirmithi 5/504, Ad-Darimi 1/336. See also Al-Albani, Sahih At-Tirmithi 3/157."
  },
  "hisnul_176": {
    "enrichedRefEn": "Abu Dawud 2/306 and others. See also Al- Albani, Sahihul-Jami' As-Saghir 4/209."
  },
  "hisnul_177": {
    "enrichedRefBn": "হাদীসটি সংকলন করেছেন, ইবন মাজাহ্‌ ১/৫৫৭, নং ১৭৫৩; যা মূলত আবদুল্লাহ ইবন আমর রাদিয়াল্লাহু আনহুমার দো‘আ। আর হাফেয ইবন হাজার তাঁর তাখরীজুল আযকারে এটার সনদকে হাসান বলেছেন। শরহুল আযকার, ৪/৩৪২ • হিসনুল মুসলিম #১৭৭",
    "enrichedRefEn": "Ibn Majah 1/557 from a supplication of Abdullah bin 'Amr. Al-Hafidh graded it as good in his checking of An-Nawawi's Kitabul-'Athkdr. See Sharhul- Athkar 4/342."
  },
  "hisnul_178": {
    "enrichedRefEn": "Abu Dawud 3/347, At-Tirmithi 4/288. See Al- Albani's Sahih At-Tirmithi 2/167."
  },
  "hisnul_179": {
    "enrichedRefEn": "At-Tirmithi 5/506. See also Al-Albani, Sahih At-Tirmithi 3/158."
  },
  "hisnul_180": {
    "enrichedRefBn": "হাদীসটি নাসাঈ ব্যতীত সকল সুনান গ্রন্থকারগণ সংকলন করেছেন। আবূ দাউদ, নং ৪০২৫; তিরমিযী, নং ৩৪৫৮; ইবন মাজাহ, নং ৩২৮৫। আরও দেখুন, সহীহুত তিরমিযী ৩/১৫৯। • হিসনুল মুসলিম #১৮০",
    "enrichedRefEn": "At-Tirmithi, Abu Dawud, and Ibn Majah. See also Al-Albani, Sahih At-Tirmithi 3/159."
  },
  "hisnul_181": {
    "enrichedRefEn": "Al-Bukhari 6/214, At-Tirmithi 5/507."
  },
  "hisnul_182": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefEn": "Muslim 3/1615."
  },
  "hisnul_183": {
    "enrichedRefEn": "Muslim 3/126."
  },
  "hisnul_184": {
    "enrichedRefBn": "সুনান আবি দাউদ ৩/৩৬৭, নং ৩৮৫৬; ইবন মাজাহ ১/৫৫৬, নং ১৭৪৭; নাসাঈ, আমালুল ইয়াওমি ওয়াল লাইলাহ, নং ২৯৬-২৯৮। আর সেখানে স্পষ্টভাবে বর্ণিত আছে যে রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম যখন তার পরিবারের কাছে ইফতার করতেন তখন তা বলতেন। আর শাইখ আলবানী তাঁর সহীহ আবি দাউদে একে সহীহ বলেছেন, ২/৭৩০। • হিসনুল মুসলিম #১৮৪",
    "enrichedRefEn": "Abu Dawud 3/367, Ibn Majah 1/556, An-Nasa'i, 'Amalul-Yawm wal-Laylah 296-8. Al-Albani graded it authentic in Sahih Abu Dawud 2/730."
  },
  "hisnul_185": {
    "enrichedRefEn": "Muslim 2/1054"
  },
  "hisnul_186": {
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 6/181, Muslim 4/2208."
  },
  "hisnul_187": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefEn": "Muslim 2/1000"
  },
  "hisnul_188": {
    "enrichedRefEn": "Al-Bukhari 7/125."
  },
  "hisnul_189": {
    "enrichedRefEn": "Al-Bukhaaree with Al-Fath 10/88 and Muslim 3/1595"
  },
  "hisnul_190": {
    "enrichedRefBn": "হাদীসটি নাসাঈ ব্যতীত সকল সুনানগ্রন্থকারগণই সংকলন করেছেন। আবু দাঊদ, নং ২১৩০; তিরমিযী, নং ১০৯১; ইবন মাজাহ, নং ১৯০৫; নাসাঈ, আমালুল ইয়াওমি ওয়াল-লাইলাহ, নং ২৫৯। আরও দেখুন, সহীহুত তিরমিযী ১/৩১৬। • হিসনুল মুসলিম #১৯০",
    "enrichedRefEn": "Abu Dawud, Ibn Majah and At-Tirmithi. See also Al-Albani, Sahih At-Tirmithi 1/316."
  },
  "hisnul_191": {
    "extraVirtueBn": "বিবাহের পর স্ত্রীর কপালের অগ্রভাগে হাত রেখে অথবা নতুন বাহন-প্রাণীর ঝুঁটিতে হাত রেখে এই দোয়া পড়া সুন্নাহ। আলেমগণ উল্লেখ করেছেন: স্ত্রীও নতুন স্বামীর কল্যাণের জন্য অনুরূপ দোয়া করতে পারেন।",
    "extraVirtueEn": "It is Sunnah to place one’s hand on the bride’s forehead—or on a newly acquired mount—and recite this supplication. Scholars note that a bride may likewise supplicate for goodness and blessing in her new husband.",
    "extraBenefitsBn": [
      "দাম্পত্য জীবনের শুরুতে বরকত, ভালোবাসা ও পারস্পরিক কল্যাণ লাভ এবং অকল্যাণ থেকে আশ্রয় লাভ হয়।"
    ],
    "extraBenefitsEn": [
      "Invokes divine blessing at the start of marriage and protection from unforeseen harm."
    ],
    "enrichedRefBn": "আবু দাঊদ-২/২৪৮, নং ২১৬০; ইবন মাজাহ্‌ ১/৬১৭, নং ১৯১৮। আরও দেখুন, সহীহ ইবন মাজাহ, ১/৩২৪ • হিসনুল মুসলিম #১৯১",
    "enrichedRefEn": "Abu Dawud 2/248 and Ibn Majah 1/617. See also Al-Albani, Sahih Ibn Majah 1/324"
  },
  "hisnul_192": {
    "extraVirtueBn": "রাসূলুল্লাহ ﷺ বলেছেন: দাম্পত্য মিলনের পূর্বে কেউ এই দোয়া পড়লে এবং তাদের মিলনে কোনো সন্তান জন্মগ্রহণ করলে শয়তান কখনোই সেই সন্তানের ক্ষতি করতে পারবে না। (সহীহ বুখারী ও মুসলিম)।",
    "extraVirtueEn": "The Prophet ﷺ promised that if a couple recites this before intimacy and a child is conceived thereby, Shaytan will never be able to harm that child. (Sahih al-Bukhari & Muslim).",
    "extraBenefitsBn": [
      "এই দোয়ার বরকতে জন্ম নেওয়া নেক সন্তান আজীবন শয়তানের ক্ষতি থেকে নিরাপদ থাকে (মুত্তাফাকুন আলাইহি)।"
    ],
    "extraBenefitsEn": [
      "Safeguards any child conceived thereby from Shaytan’s harm (Agreed upon by Bukhari & Muslim)."
    ],
    "enrichedRefBn": "বুখা্রী (৪-কিতাবুল ওয়াদূ, ৮-বাবুত তাসমিয়াতি..) ১/৬৫ (ভারতীয় ২/৭৭৬); মুসলিম (১৬-কিতাবুন নিকাহ, ১৮-বাব মা ইউসতাহাব্বু আন ইয়াকূলাহু) ২/১০৫৮ (ভারতীয় ১/৪৬৩)। • হিসনুল মুসলিম #১৯২",
    "enrichedRefEn": "Al-Bukhari 6/141, Muslim 2/1028."
  },
  "hisnul_193": {
    "enrichedRefEn": "Al-Bukhari 7/99, Muslim 4/2015."
  },
  "hisnul_194": {
    "enrichedRefEn": "At-Tirmithi 5/493,4. See also Al-Albani, Sahih At-Tirmithi 3/153."
  },
  "hisnul_195": {
    "enrichedRefBn": "তিরমিযী, নং ৩৪৩৪; ইবন মাজাহ, নং ৩৮১৪ আরও দেখুন, সহীহুত তিরমিযী, ৩/১৫৩; সহীহু ইবনি মাজাহ, ২/৩২১ আর শব্দটি তিরমিযীর। • হিসনুল মুসলিম #১৯৫",
    "enrichedRefEn": "Sahih Ibn Majah 2/321. See also Al-Albani, Sahih At-Tirmithi 3/153."
  },
  "hisnul_196": {
    "extraVirtueBn": "আবদুল্লাহ ইবনু আমর, আবূ বারযা আসলামী ও আবূ হুরাইরা (রা.) থেকে পৃথক সহীহ সনদে বর্ণিত: কেউ কোনো বৈঠক বা মজলিস থেকে ওঠার সময় এটি পড়লে তা বৈঠকের অসার কথা ও ত্রুটিগুলোর কাফফারা হয়ে যায় এবং আল্লাহ তা ক্ষমা করে দেন।",
    "extraVirtueEn": "Narrated through multiple authentic chains from ‘Abdullah ibn ‘Amr, Abu Barzah, and Abu Hurairah (RA): reciting this upon leaving any gathering serves as expiation (kaffarah) for idle speech or slips committed during it.",
    "extraBenefitsBn": [
      "মজলিস শেষে পাঠ করলে বৈঠকের অনর্থক কথাবার্তা ও ছোট গুনাহসমূহের কাফফারা আদায় হয় (সহীহ)।"
    ],
    "extraBenefitsEn": [
      "Serves as expiation for errors or idle talk occurring during a gathering (Sahih)."
    ],
    "enrichedRefBn": "[১] হাদীসটি নাসাঈ তাঁর আমালুল ইয়াওমি ওয়াল-লাইলাহ গ্রন্থে নং ৩০৮ এ বর্ণনা করেছেন। অনুরূপভাবে আহমাদ, ৬/৭৭, নং ২৪৪৮৬। আর ড. ফারূক হাম্মাদাহ, ইমাম নাসাঈ এর আমালুল ইয়াওমি ওয়াল-লাইলাহ গ্রন্থের তাহকীকের সময় এ হাদীসটিকে সহীহ বলেছেন। পৃ. ২৭৩ [২] হাদীসটি সুনান গ্রন্থকারগণ সবাই সংকলন করেছেন। আবু দাঊদ, নং ৪৮৫৮; তিরমিযী, নং ৩৪৩৩; নাসাঈ, নং ১৩৪[৪] আরও দেখুন, সহীহুত তিরমিযী ৩/১৫৩ [৩] আবূ দাউদ (কিতাবুুল আদাব, বাব ফি কাফ্‌ফারাতিল মাজলিস) ৪/২৬৬ (ভারতীয় ২/৬৬৭); হাকিম, আল-মুসতাদরাক ১/৭২০-৭২১; আলবানী, সহীহুত তারগীব ২/১০১-১০২ • হিসনুল মুসলিম #১৯৬",
    "enrichedRefEn": "Abu Dawud, Ibn Majah, At-Tirmithi and An-Nasa'i. See also Al-Albani, Sahih At-Tirmithi 3/ 153. This was reported by An-Nasa'i in 'Amalul-Yawm wal-Laylah (no.308), and Dr. Farooq Hamadah graded it authentic in his checking of the same book, p. 273. See also Ahmad 6/77"
  },
  "hisnul_197": {
    "enrichedRefBn": "আহমাদ ৫/৮২, নং ২০৭৭৮; আন-নাসাঈ, আমালুল ইয়াওমি ওয়াল লাইলাহ, পৃ. ২১৮, নং ৪২১ তাহকীক, ড. ফারূক হাম্মাদাহ। • হিসনুল মুসলিম #১৯৭",
    "enrichedRefEn": "Ahmad 5/82, and An-Nasa'i in 'Amalul-Yawm wal-Laylah p. 218, with checking by Dr. Farooq Hamadah."
  },
  "hisnul_198": {
    "enrichedRefEn": "At-Tirmithi (no. 2035). See also Al-Albani, Sahih At-Tirmithi 2/200 and Sahihul-Jami' (no. 6244)."
  },
  "hisnul_199": {
    "enrichedRefBn": "[১] মুসলিম ১/৫৫৫, নং ৮০৯; অন্য বর্ণনায় এসেছে, সূরা কাহাফের শেষাংশ, ১/৫৫৬, নং ৮০৯। [২] দেখুন, দো‘আ ২৪.১ এবং ২৪.[২] • হিসনুল মুসলিম #১৯৯",
    "enrichedRefEn": "Muslim 1/555, another version mentions the last ten 'Ayat, Muslim 1/556. See dua 24.1 and 24.2"
  },
  "hisnul_200": {
    "enrichedRefBn": "হাদীসটি সংকলন করেছেন, আবু দাঊদ ৪/৩৩৩, নং ৫১২৫। আর শাইখ আলবানী একে সহীহ আবি দাউদে হাসান বলেছেন, ৩/৯৬৫। • হিসনুল মুসলিম #২০০",
    "enrichedRefEn": "Abu Dawud 4/333. Al-Albani graded it good in Sahih Abu Dawud 3/965."
  },
  "hisnul_201": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-BAri 4/88."
  },
  "hisnul_202": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefBn": "হাদীসটি সংকলন করেছেন, নাসাঈ, তাঁর আমালুল ইয়াওমি ওয়াল-লাইলাহ গ্রন্থে, পৃ. ৩০০; ইবন মাজাহ, ২/৮০৯, নং ২৪২৪ আরও দেখুন, সহীহ ইবন মাজাহ, ২/৫৫। • হিসনুল মুসলিম #২০২",
    "enrichedRefEn": "An-Nasa'i, 'Amalul-Yawm wal-Laylahp. 300, Ibn Majah 2/809. See also Al-Albani, Sahih Ibn Majah2/55."
  },
  "hisnul_203": {
    "extraVirtueBn": "আবূ বাকর সিদ্দীক (রা.) বর্ণনা করেন, নবী ﷺ বলেছেন: \"তোমাদের মাঝে শিরক পিঁপড়ার পদচারণার চেয়েও সূক্ষ্ম।\" অতঃপর তিনি তাঁকে এ দোয়াটি শিখিয়ে বললেন: এটি পড়লে ছোট ও বড় সব ধরনের শিরক তোমার থেকে দূরীভূত হবে। (আদাবুল মুফরাদ ও আহমাদ — সহীহ)।",
    "extraVirtueEn": "Abu Bakr as-Siddiq (RA) narrated that the Prophet ﷺ said: \"Shirk among you is subtler than the crawling of an ant,\" and then taught him this supplication to remove both minor and major shirk. (Al-Adab al-Mufrad & Ahmad — Sahih).",
    "extraBenefitsBn": [
      "অজান্তে হয়ে যাওয়া সূক্ষ্ম রিয়া ও ছোট শিরক এবং জ্ঞাত-অজ্ঞাত সকল শিরক থেকে অন্তরকে পবিত্র রাখে।"
    ],
    "extraBenefitsEn": [
      "Purifies the heart from hidden ostentation (riya) and both known and unknown forms of shirk."
    ],
    "enrichedRefBn": "বুখা্রী, আল-আদাবুল মুফরাদ, পৃষ্ঠা ২৫০; আলবানী, সহীহুল আদাবিল মুফরাদ ১/২৫৯। • হিসনুল মুসলিম #২০৩",
    "enrichedRefEn": "Ahmad 4/403. See also Al-Albani, Sahihul-Jami' As-Saghir 3/233 and Sahihut-Targhib wat- Tarhib 1/19."
  },
  "hisnul_204": {
    "enrichedRefBn": "হাদীসটি ইবনুস সুন্নী সংকলন করেছেন, পৃ. ১৩৮, নং ২৭৮। আরও দেখুন, ইবনুল কাইয়্যেমের আল-ওয়াবিলুস সাইয়্যেব, পৃ. ৩০৪ তাহকীক, বশীর মুহাম্মাদ উয়ূন। • হিসনুল মুসলিম #২০৪",
    "enrichedRefEn": "Ibn As-Sunni (Page 138 , Hadith no. 278).Also see, Ibnul Qaiyyum's Al Wabilus Sayyer Page 308. Tahkeek, Bashir Mamud Uyyun."
  },
  "hisnul_205": {
    "extraVirtueBn": "কুসংস্কার ও অশুভ লক্ষণে বিশ্বাস নিষিদ্ধ; তবে নবী ﷺ ভালো ও আশাব্যঞ্জক কথা (ফাল/সুলক্ষণ) পছন্দ করতেন এবং কারও মুখে উত্তম বাক্য শুনলে আনন্দিত হয়ে আল্লাহর ওপর ভরসা করতেন।",
    "extraVirtueEn": "Superstitions and evil omens are rejected in Islam, whereas the Prophet ﷺ loved optimistic good words (fa’l) while placing complete reliance solely upon Allah.",
    "extraBenefitsBn": [
      "সকল ধরনের কুলক্ষণ ও কুসংস্কার থেকে ঈমান রক্ষা করে এবং একমাত্র আল্লাহর ওপর তাওয়াক্কুল দৃঢ় করে।"
    ],
    "extraBenefitsEn": [
      "Protects faith from superstition and reinforces reliance solely upon Allah."
    ],
    "enrichedRefBn": "[১] আহমাদ ২/২২০, নং ৭০৪৫; ইবনুস সুন্নী, হাদীস নং ২৯২ আর শাইখ আলবানী তাঁর সিলসিলাতুল আহাদীসিস সহীহায় ৩/৫৪, নং ১০৬৫, একে সহীহ বলেছেন। [২] আবু দাউদ, নং ৩৭১৯; আহমাদ, নং ৯০৪০। আর শাইখ আলবানী তাঁর সিলসিলাতুস সহীহায় একে সহীহ বলেছেন, ২/৩৬৩; আবুশ শাইখ, আখলাকুন নবী সাল্লাল্লাহু ‘আলাইহি ওয়াসাল্লাম, পৃ. ২৭০। • হিসনুল মুসলিম #২০৫",
    "enrichedRefEn": "Ahmad 2/220, Ibn As-Sunni (no. 292). See also Al-Albani, Silsilatul-'Ahadlth As-Sahihah 3/54, (no. 1065). As for bodings of good, these used to please the Prophet (SAW) and so when he heard good words from someone, he used to say: ''We have taken from you a good portent from your mouth,'' Abu Dawud, Ahmad. See also Al-Albani, Silsilatul-'Ahadith As-Sahihah 2/363, and it is with Abu Ash-Shaikh Al-Asfahani in 'Akhlaqun-Nabiyy, pg. 270."
  },
  "hisnul_206": {
    "enrichedRefBn": "আবু দাঊদ ৩/৩৪, ২৬০২; তিরমিযী ৫/৫০১, নং ৩৪৪৬। আরও দেখুন, সহীহুত তিরমিযী ৩/১৫৬। আর আয়াত দু’টি হচ্ছে, সূরা আয-যুখরুফের ১৩-১৪ • হিসনুল মুসলিম #২০৬",
    "enrichedRefEn": "Abu Dawud 3/34, At-Tirmithi 5/501. See also Al-Albani, Sahih At-Tirmithi 3/156."
  },
  "hisnul_207": {
    "enrichedRefEn": "Muslim 2/978."
  },
  "hisnul_208": {
    "enrichedRefBn": "হাকেম, আর তিনি একে সহীহ বলেছেন এবং ইমাম যাহাবী সেটা সমর্থন করেছেন ২/১০০; ইবনুস সুন্নী, নং ৫২৪ তাছাড়া হাফেয ইবন হাজার তাঁর তাখরীজুল আযকার ৫/১৫৪, একে হাসান বলেছেন। আল্লামা ইবন বায রাহেমাহুল্লাহ বলেন, ‘হাদীসটি নাসাঈ হাসান সনদে বর্ণনা করেছেন।’ দেখুন, তুহফাতুল আখইয়ার, পৃ. ৩৭। • হিসনুল মুসলিম #২০৮",
    "enrichedRefEn": "Al-Hakim who graded it authentic and Ath-Tfaahabi agreed 2/100, and Ibn As-Sunni (no. 524). Al-Hafidh graded it good in his checking of Al-'Athkdr 5/154. Ibn Baz said in Tuhfatul-'Akhydr p. 37, that An-Nasa'i recorded it with a good chain of narration.; "
  },
  "hisnul_209": {
    "extraVirtueBn": "উমার ইবনুল খাত্তাব (রা.) থেকে বর্ণিত: বাজারে, বন্দরে বা ব্যস্ত কর্মস্থলে প্রবেশকালে এটি পড়লে ১০ লক্ষ নেকী, ১০ লক্ষ গুনাহ মাফ, ১০ লক্ষ মর্যাদা বৃদ্ধি এবং জান্নাতে একটি গৃহ নির্মাণের সুসংবাদ রয়েছে। তাহকীক: সনদে দুর্বলতা থাকায় ইমাম বুখারী একে মুনকার বলেছেন, তবে একাধিক সনদের সমন্বয়ে শাইখ আলবানী একে ‘হাসান’ বলেছেন। হিকমত: যেখানে মানুষ আল্লাহকে ভুলে যায় (বাজার-কর্মক্ষেত্র), সেখানে আল্লাহর যিকিরের মর্যাদা বহুগুণ বেড়ে যায়।",
    "extraVirtueEn": "Narrated from ‘Umar ibn al-Khattab (RA) regarding entering the marketplace with the promise of immense reward (a million good deeds, forgiveness, elevation, and a house in Paradise). Tahqeeq note: While individual chains have weakness (Imam Bukhari termed it munkar), Al-Albani graded it Hasan due to corroborating chains. Wisdom: Remembering Allah in places of heedlessness carries immense merit.",
    "extraBenefitsBn": [
      "বাজার ও ব্যস্ত কর্মক্ষেত্রে—যেখানে আল্লাহর স্মরণ ভুলে যাওয়ার আশঙ্কা বেশি—সেখানে যিকির করার বিরাট ফযীলত।",
      "হাদীস-তাহকীক: ইমাম বুখারীর পর্যবেক্ষণের পাশাপাশি শাইখ আলবানী একাধিক সনদে হাদীসটিকে ‘হাসান’ সাব্যস্ত করেছেন।"
    ],
    "extraBenefitsEn": [
      "Highlights the immense reward of remembering Allah in busy marketplaces where people easily become heedless.",
      "Transparent scholarly grading: individual chains contain weakness, graded Hasan through corroboration by Al-Albani."
    ],
    "enrichedRefBn": "তিরমিযী, নং ৩৪২৮; ইবন মাজাহ, ৫/২৯১, নং ৩৮৬০; হাকেম ১/৫৩৮। আর শাইখ আলবানী হাদীসটিকে সহীহ ইবন মাজাহ্‌ ২/২১; সহীহুত তিরমিযী, ৩/১৫২ হাসান হাদীস বলেছেন। • হিসনুল মুসলিম #২০৯",
    "enrichedRefEn": "At-Tirmithi 5/291, and Al-Hakim 1/538. Al-Albani graded it good in Sahih Ibn Majah 2/21 and Sahih At-Tirmithi 3/152.</p></div>"
  },
  "hisnul_210": {
    "enrichedRefBn": "আবূ দাউদ, ৪/২৯৬, নং ৪৯৮২ আর শাইখ আলবানী একে সহীহ বলেছেন, সহীহ আবি দাউদে, ৩/৯৪১ • হিসনুল মুসলিম #২১০",
    "enrichedRefEn": "Abu Dawud 4/296. Al-Albani graded it authentic in Sahih Abu Dawud 3/941."
  },
  "hisnul_211": {
    "enrichedRefBn": "আহমাদ ২/৪০৩, নং ৯২৩০; ইবন মাজাহ্‌, ২/৯৪৩, নং ২৮২৫। আরও দেখুন, সহীহ ইবন মাজাহ্‌ ২/১৩৩ • হিসনুল মুসলিম #২১১",
    "enrichedRefEn": "Ahmad 2/403, Ibn Majah 2/943. See also Al-Albani, Sahih Ibn Majah 2/133."
  },
  "hisnul_212": {
    "enrichedRefBn": "আহমাদ ২/৭, ৪৫২৪, তিরমিযী ৫/৪৯৯, নং ৩৪৪৩ আর শাইখ আলবানী একে সহীহু সুনানিত তিরমিযীতে ৩/৪১৯ সহীহ হাদীস বলেছেন। • হিসনুল মুসলিম #২১২",
    "enrichedRefEn": "Ahmad 2/7, At-Tirmithi 5/499. See also Al-Albani, Sahih At-Tirmithi 2/155."
  },
  "hisnul_213": {
    "enrichedRefEn": "At-Tirmithi. See Al-Albani, Sahih At-Tirmithi, 3/155."
  },
  "hisnul_214": {
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 6/135."
  },
  "hisnul_215": {
    "enrichedRefBn": "মুসলিম, ৪/২০৮৬, নং ২৭১৮। আর হাদীসে ব্যবহৃত سَمِعَ سامِعٌ শব্দের অর্থ, ‘একজন সাক্ষ্যদাতা সাক্ষ্য প্রদান করুন যে, আমরা আল্লাহর প্রশংসা করেছি তার যাবতীয় নেয়ামতের উপর, তাঁর উত্তম দান-দয়ার উপর।’ আর যদি হাদীসে ব্যবহৃত শব্দটিকে سَمَّعَ سامِعٌ ধরা হয়, তখন অর্থ হবে, ‘একজন শ্রোতা আমার এ কথা শুনে তা অন্যের কাছে পৌঁছে দিক।’ আর এ-কথাটি তিনি বলেছেন শেষ রাত্রির দো‘আ ও যিকর সম্পর্কে সচেতন করার জন্য। শারহুন নাওয়াওয়ী ‘আলা সহীহ মুসলিম, ১৭/৩৯। • হিসনুল মুসলিম #২১৫",
    "enrichedRefEn": "Muslim 4/2086, the meaning of sami'a saami'un (who listens has heard) is that 'a witness has witnessed our praise of Allah due to His blessings and favor upon us.' It could also be read samma'a saami'un, in which case it means 'one who has heard this statement of mine will convey it to another and he will say it as well.' This is due to the attention given to the Thikr (remembrance of Allah) and supplications made during the early morning hours. The meaning of his saying 'Our Lord, be with us and bestow Your favor upon us' is: 'Our Lord, protect us and guard us. Bless us with Your numerous bounties, and avert from us every evil.' See An-Nawawi, Sharh Sahih Muslim 17/39."
  },
  "hisnul_216": {
    "extraVirtueBn": "খাওলা বিনতে হাকীম (রা.) বর্ণনা করেন, রাসূলুল্লাহ ﷺ বলেছেন: যে ব্যক্তি সফরে কোনো মনযিলে অবতরণ করে এ দোয়া পড়বে, সেখান থেকে প্রস্থান করা পর্যন্ত কোনো সৃষ্টি তার কোনো ক্ষতি করতে পারবে না। (সহীহ মুসলিম)।",
    "extraVirtueEn": "Khawlah bint Hakim (RA) narrated that the Prophet ﷺ said: Whoever halts at any resting place during travel and recites this prayer will not be harmed by anything until they depart from it. (Sahih Muslim).",
    "extraBenefitsBn": [
      "নতুন জায়গা, হোটেল বা সফরকালীন অবস্থানস্থলে বিষাক্ত প্রাণী, জিন ও সকল ক্ষতিকর বস্তু থেকে নিরাপত্তা দেয়।"
    ],
    "extraBenefitsEn": [
      "Guarantees divine protection from venomous creatures and all harm at any temporary stop or lodging."
    ],
    "enrichedRefEn": "Muslim 4/2080."
  },
  "hisnul_217": {
    "enrichedRefEn": "Bukhari 7/163, Muslim 2/980."
  },
  "hisnul_218": {
    "enrichedRefBn": "হাদীসটি সংকলন করেছেন, ইবনুস সুন্নী, আমালুল ইয়াওমি ওয়াল-লাইলাহ, নং ৩৭৭; হাকেম এবং তিনি একে সহীহ বলেছেন, ১/৪৯৯। আর শাইখ আলবানী তাঁর সহীহুল জামে‘ ৪/২০১ • হিসনুল মুসলিম #২১৮",
    "enrichedRefEn": "Ibn As-Sunni, 'Amalul-Yawm wal-Laylah, and Al-Hakim who graded it authentic 1/499. See also Al-Albani, Sahihul-Jami' As-Saghir 4/201."
  },
  "hisnul_219": {
    "enrichedRefBn": "[১] হাদীসটি সংকলন করেছেন, মুসলিম ১/২৮৮, নং ৩৮[৪] [২] আবূ দাউদ ২/২১৮, নং ২০৪৪; আহমাদ ২/৩৬৭, নং ৮৮০[৪] আর শাইখ আলবানী একে সহীহ আবি দাঊদে ২/৩৮৩, সহীহ বলেছেন। [৩] তিরমিযী, ৫/৫৫১, নং ৩৫৪৬, ইত্যাদি। আরও দেখুন, সহীহুল জামে‘ ৩/২৫; সহীহুত তিরমিযী, ৩/১৭৭। [৪] নাসাঈ, ৩/৪৩, নং ১২৮২; হাকেম, ২/৪২[১] আর শাইখ আলবানী একে সহীহুন নাসাঈ ১/২৭৪, সহীহ বলেছেন। [৫] আবূ দাউদ, নং ২০৪[১] আর শাইখ আলবানী সহীহ আবি দাউদে ১/৩৮৩, একে হাসান হাদীস বলেছেন। • হিসনুল মুসলিম #২১৯",
    "enrichedRefEn": "Muslim 1/288 No. 384. Abu Dawud 2/218 No. 2044; Ahmed 2/367 No. 8804. Albani graded it as Sahih in Sahih Abu Dawud 2/363 At-Tirmithi 5/551 and others. See also Al-Albani, Sahih At-Tirmithi 3/177 and Sahihul-Jarai' As-Saghir 3/25. An-Nasa'i, Al-Hakim 2/421. Al-Albani graded it authentic in Sahih An-Nasa'i 1/274. Abu Dawud (no. 2041). Al-Albani graded it good in Sahih Abu Dawud 1/383."
  },
  "hisnul_224": {
    "enrichedRefBn": "[১] মুসলিম ১/৭৪, নং ৫৪; আহমাদ, নং ১৪৩০; আর শব্দ তাঁরই। মুসলিমের শব্দ হচ্ছে, “লা তাদখুলূনা...” ‘তোমরা প্রবেশ করবে না...’। [২] বুখারী, (ফাতহুল বারীসহ) ১/৮২, নং ২৮; আম্মার রাদিয়াল্লাহু আনহু থেকে মাওকূফ ও মু‘আল্লাক হিসেবে। [৩] বুখারী, (ফাতহুল বারীসহ)১/৫৫, নং ১২; মুসলিম ১/৬৫, নং ৩৯। • হিসনুল মুসলিম #২২৪",
    "enrichedRefEn": "Muslim 1/74 No. 54 It used the wording, ''la Tadkhuluna…\" ''You will not enter''; Ahmed 1430; Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 1/82 as a statement of the Companion 'Ammar (RA) Fathul-Bari 1/55, Muslim 1/65"
  },
  "hisnul_227": {
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 3/408, Muslim 2/841."
  },
  "hisnul_228": {
    "enrichedRefBn": "[১] বুখারী (ফাতহুল বারীসহ), ৬/৩৫০, নং ৩৩০৩; মুসলিম, ৪/২০৯২, নং ২৭২৯। [২] আবূ দাঊদ ৪/৩২৭, নং ৫১০৫; আহমাদ ৩/৩০৬, নং ১৪২৮৩ আর শাইখ আলবানী একে সহীহ আবি দাউদে ৩/৯৬১, সহীহ বলেছেন। • হিসনুল মুসলিম #২২৮",
    "enrichedRefEn": "Al-Bukhari, Muslim 4/2092. Abu Dawud 4/327, Ahmed 3/306"
  },
  "hisnul_229": {
    "enrichedRefEn": "Al-Bukhari, Muslim 3/1595."
  },
  "hisnul_230": {
    "enrichedRefBn": "বুখারী (ফাতহুল বারীসহ) ১১/১৭১, নং ৬৩৬১; মুসলিম ৪/২০০৭, নং ৩৯৬, আর তার শব্দ হচ্ছে, “ফাজ‘আলহা লাহূ যাকাতান ও রাহমাতান”। অর্থাৎ ‘সেটা তার জন্য পবিত্রতা ও রহমত বানিয়ে দিন’। • হিসনুল মুসলিম #২৩০",
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 6/350, Muslim 4/2092."
  },
  "hisnul_231": {
    "enrichedRefBn": "বুখারী (৫৬-কিতাবুশ শাহাদাত, ১৬-বাব ইযা যাক্কা) ২/৯৪৬ (ভারতীয় ১/৩৬৬); মুসলিম (৫৩-কিতাবুয যুহদ, ১৪-বাবুন নাহয়ি আনিল মাদহি) ৪/২২৯৬ (২/৪১৪) । • হিসনুল মুসলিম #২৩১",
    "enrichedRefEn": "Muslim 4/2296."
  },
  "hisnul_232": {
    "enrichedRefBn": "বুখারী, আল-আদাবুল মুফরাদ, নং ৭৬১ আর শাইখ আলবানী তাঁর সহীহুল আদাবিল মুফরাদ গ্রন্থে নং ৫৮৫, সেটার সনদকে সহীহ বলেছেন। আর দু’ ব্রাকেটের মাঝখানের অংশ বাইহাকীর শু‘আবুল ঈমান গ্রন্থ থেকে নেওয়া হয়েছে, ৪/২২৮, যা অন্য পদ্ধতিতে এসেছে। | বুুখারী, আল-আদাবুল মুফরাদ ১/২৬৭, বাইহাকী, শুআবুল ইমান ৪/২২৭,২২৮; আলবানী, সহীহুল আদাব ১/২৮[২] হাদীসটি সহীহ, তবে শেষ বাক্যটি পৃথক দূর্বল সনদে বর্ণিত; রাহে বেলায়াত - যিকর নং ২০২ • হিসনুল মুসলিম #২৩২",
    "enrichedRefEn": "Al-Bukhari, Al Adab Al Mufrad No. 761. Al-Albani graded it sahih in Sahih Adabil Mufrad. Words between the brackets are from Baihaqi, 4/228; Rahe Belayat (Dhikr # 202)"
  },
  "hisnul_233": {
    "enrichedRefEn": "Al-Bukhari, Muslim 2/841."
  },
  "hisnul_234": {
    "enrichedRefBn": "বুখারী, (ফাতহুল বারীসহ) ৩/৪৭৬, নং ১৬১৩ আর ‘কোনো কিছু’ বলে এখানে বাঁকা লাঠি বোঝানো হয়েছে। দেখুন, বুখারী, (ফাতহুল বারীসহ), ৩/৪৭২ • হিসনুল মুসলিম #২৩৪",
    "enrichedRefEn": "Al-Bukhari,,cf. Al-Asqalani, Fathul-Bari 3/476. See also 472. The 'something' that was referred to in this Hadith was a cane."
  },
  "hisnul_235": {
    "enrichedRefBn": "আবূ দাউদ ২/১৭৯, নং ১৮৯৪; মুসনাদে আহমাদ ৩/৪১১, নং ১৫৩৯৮; আল-বাগভী ফী শারহিস সুন্নাহ, ৭/১২৮। আর শাইখ আলবানী সহীহ আবি দাউদে ১/৩৫৪ একে সহীহ বলেছেন। আয়াতটি সূরা আল-বাকারাহ্‌র আয়াত নং ২০১ • হিসনুল মুসলিম #২৩৫",
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 11/171, Muslim 4/2007. The wording in Muslim's report is: 'make it a purification for him and a source of mercy."
  },
  "hisnul_236": {
    "enrichedRefBn": "মুসলিম ২/৮৮৮, নং ১২১৮; আর আয়াতটি সূরা আল-বাকারার আয়াত নং ১৫৮। • হিসনুল মুসলিম #২৩৬",
    "enrichedRefEn": "Muslim 2/888."
  },
  "hisnul_237": {
    "enrichedRefBn": "তিরমিযী নং ৩৫৮৫; আর শাইখুল আলবানী সহীহুত তিরমিযীতে হাদীসটিকে হাসান বলেছেন, ৩/১৮৪; অনুরূপভাবে সিলসিলা সহীহায় ৪/৬। • হিসনুল মুসলিম #২৩৭",
    "enrichedRefEn": "At-Tirmithi. Al-Albani graded it good in Sahih At-Tirmithi 3/184, and also Silsilatul-'Ahadith As-Sahihah 4/6."
  },
  "hisnul_238": {
    "enrichedRefEn": "Muslim 2/891 No. 1218"
  },
  "hisnul_239": {
    "enrichedRefBn": "বুখারী, (ফাতহুল বারীসহ) ৩/৫৮৩, নং ১৭৫১; সেখানে তার শব্দ দেখুন, আরও দেখুন, বুখারী, (ফাতহুল বারীসহ) ৩/৫৮৩, ৩/৫৮৪, ৩/৫৮১ নং ১৭৫৩; অনুরূপ মুসলিম নং ১২১৮। • হিসনুল মুসলিম #২৩৯",
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 3/581, 3, 4, and Muslim"
  },
  "hisnul_240": {
    "enrichedRefBn": "[১] বুখারী, (ফাতহুল বারীসহ) ১/২১০, ৩৯০, ৪১৪, নং ১১৫, ৩৫৯৯, ৬২১৮; মুসলিম ৪/১৮৫৭, নং ১৬৭৪ [২] বুখারী, (ফাতহুল বারীসহ) ৮/৪৪১, নং ৪৭৪১; তিরমিযী নং ২১৮০; আন- নাসাঈ ফিল কুবরা, নং ১১১৮৫। আরও দেখুন, সহীহুত তিরমিযী ২/১০৩, ২/২৩৫, আহমাদ-৫/২১৮, নং ২১৯০০। • হিসনুল মুসলিম #২৪০",
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 1/210, 390, 414 and Muslim 4/1857. Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 8/441. See also Al-Albani, Sahih At-Tirmithi 2/103, 235, Ahmad 5/218."
  },
  "hisnul_242": {
    "enrichedRefBn": "হাদীসটি নাসাঈ ব্যতীত অপরাপর সুনান গ্রন্থকারগণ উদ্ধৃত করেছেন। আবূ দাউদ নং ২৭৭৪; তিরমিযী নং ১৫৭৮; ইবন মাজাহ্‌ ১৩৯[৪] আরও দেখুন, সহীহ ইবন মাজাহ ১/২৩৩; ইরওয়াউল গালীল, ২/২২৬। • হিসনুল মুসলিম #২৪২",
    "enrichedRefEn": "Abu Dawud, Ibn Majah, At-Tirmithi. See also Al-Albani, Sahih Ibn Majah 1/233, and 'Irwa'ul-Ghalil 2/226."
  },
  "hisnul_243": {
    "enrichedRefEn": "Muslim 4/1728."
  },
  "hisnul_244": {
    "extraVirtueBn": "হাদীসে এসেছে: বদনজর (চোখ লাগা) বাস্তব সত্য। তাই নিজের সন্তান, সম্পদ বা কারও মাঝে পছন্দনীয় কিছু দেখলে \"মাশাআল্লাহ, লা কুওয়াতা ইল্লা বিল্লাহ\" এবং বরকতের দোয়া করা উচিত যাতে নিজের নজর না লাগে।",
    "extraVirtueEn": "The Prophet ﷺ affirmed that the evil eye is real. Thus, when admiring one’s own blessing, family, or property—or that of others—one should say \"Masha’Allah\" and pray for Allah’s blessing upon it.",
    "extraBenefitsBn": [
      "পছন্দনীয় বিষয়ের ওপর নিজের বা অন্যের বদনজর লাগা প্রতিহত করে এবং তাতে বরকত স্থায়ী হয়।"
    ],
    "extraBenefitsEn": [
      "Prevents harm from the evil eye and preserves Allah’s blessing in whatever one admires."
    ],
    "enrichedRefBn": "মুসনাদে আহমাদ ৪/৪৪৭, নং ১৫৭০০; ইবন মাজাহ্, নং ৩৫০৮; মালেক ৩/১১৮-১১৯। আর শাইখুল আলবানী, সহীহুল জামে‘ গ্রন্থে সহীহ বলেছেন, ১/২১২; আরও দেখুন, আরনাঊতের এর যাদুল মা‘আদ এর তাহকীক ৪/১৭০। • হিসনুল মুসলিম #২৪৪",
    "enrichedRefEn": "Ahmad 4/447, Ibn Majah, Malik. Al-Albani graded it authentic in Sahihul-Jami' As-Saghir 1/212. Also see Al-Arna'ut's checking of Ibn Al-Qayyim's Zadul-Ma'ad 4/170."
  },
  "hisnul_245": {
    "enrichedRefEn": "Bukhari 6/361 No. 3346; Muslim 4/2208 No. 2880."
  },
  "hisnul_246": {
    "enrichedRefBn": "তিরমিযী ৫/৮২, নং ২৭৪১; আহমাদ ৪/৪০০, নং ১৯৫৮৬; আবু দাউদ, ৪/৩০৮, নং ৫০৪০। আরও দেখুন, সহীহুত তিরমিযী, ২/৩৫৪ • হিসনুল মুসলিম #২৪৬",
    "enrichedRefEn": "At-Tirmithi 5/82, Ahmad 4/400, Abu Dawud 4/ 308. See also Al-Albani, Sahih At-Tirmithi 2/354."
  },
  "hisnul_247": {
    "enrichedRefBn": "আহমাদ ৩/৪১৯, নং ১৫৪৬১, সহীহ সনদে। আর ইবনুস সুন্নী, নং ৬৩৭; আরনাঊত তার ত্বাহাভীয়ার তাখরীজে এর সনদকে বিশুদ্ধ বলেছেন, পৃ.১৩৩ আরও দেখুন, মাজমা‘উয যাওয়ায়েদ ১০/১২৭। • হিসনুল মুসলিম #২৪৭",
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 11/42, Muslim 4/1705."
  },
  "hisnul_250": {
    "extraVirtueBn": "নবী ﷺ বলেছেন: এ ইস্তিগফার পড়লে আল্লাহ ক্ষমা করেন, এমনকি সে যুদ্ধক্ষেত্র থেকে পলায়নকারী হলেও। আরও বলেছেন: রাতের শেষ প্রহরে ও সিজদায় বান্দা রবের সবচেয়ে নিকটবর্তী হয়—এবং আমি নিজেই দিনে ১০০ বার আল্লাহর কাছে ক্ষমা প্রার্থনা করি।",
    "extraVirtueEn": "The Prophet ﷺ said whoever recites this istighfar is forgiven even if they fled from battle; and added that the Lord is closest in the last part of the night and during sujood, and that he himself sought Allah’s forgiveness 100 times daily.",
    "extraBenefitsBn": [
      "যুদ্ধক্ষেত্র থেকে পলায়নের মতো বড় গুনাহও এ ইস্তিগফারের মাধ্যমে ক্ষমা হওয়ার সুসংবাদ রয়েছে।",
      "রাতের শেষ প্রহরে ও সিজদায় অধিক দোয়া ও দৈনিক ১০০ বার ইস্তিগফার নবীজির নিয়মিত সুন্নাহ।"
    ],
    "extraBenefitsEn": [
      "Even major sins are forgiven through sincere istighfar with these Prophetic words.",
      "Encourages abundant istighfar in the last third of the night, in sujood, and 100 times daily."
    ],
    "enrichedRefBn": "[১] বুখারী, ফাতহুল বারীসহ, ১১/১০১, নং ৬৩০৭। [২] মুসলিম, ৪/২০৭৬, নং ২৭০২ [৩] আবূ দাউদ ২/৮৫, নং ১৫১৭; তিরমিযী ৫/৫৬৯, নং ৩৫৭৭; আল-হাকিম এবং সহীহ বলেছেন, তার সাথে ইমাম যাহাবী ঐকমত্য পোষণ করেছেন, ১/৫১১, আর শাইখুল আলবানীও সহীহ বলেছেন। দেখুন, সহীহুত তিরমিযী ৩/১৮২, জামেউল উসূল লি আহাদীসির রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম ৪/৩৮৯-৩৯০, আরনাঊত এর সম্পাদনাসহ। [৪] তিরমিযী নং ৩৫৭৯, নাসায়ী, ১/২৭৯ নং ৫৭২; হাকেম ১/৩০৯। আরও দেখুন, সহীহুত তিরমিযী, ৩/১৮৩; জামে‘উল উসূল, আরনাউতের তাহকীকসহ ৪/১৪৪ [৫] মুসলিম, ১/৩৫০; নং ৪৮২ [৬] মুসলিম, ৪/২০৭৫, নং ২৭০২ ইবনুল আসীর বলেন, «ليُغان على قلبي»এর অর্থ হচ্ছে, ঢাকা পড়ে যায়, পর্দাবৃত হয়ে যায়। উদ্দেশ্য ভুলে যাওয়া; কারণ রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম সর্বদা যিক্‌র, নৈকট্য ও সার্বিক তত্ত্বাবধানে থাকতেন। তাই যখন কোনো সময় এ ব্যাপারে সামান্যতম ব্যাঘাত ঘটত অথবা ভুলে যেতেন, তখনি তিনি এটাকে নিজের জন্য গুনাহ মনে করতেন, সাথে সাথে তিনি ইস্তেগফার বা ক্ষমাপ্রার্থনার দিকে দ্রুত ধাবিত হতেন। দেখুন, জামে‘উল উসূল ৪/৩৮৬। [৭] বুখারি ৭/১৫০ • হিসনুল মুসলিম #২৫০",
    "enrichedRefEn": "Al-Bukhari, cf. Al-Asqalani, Fathul-BAri 11/101 No. 6307 Muslim 4/2076 No. 2702 Abu Dawud 2/85, At-Tirmithi 5/569, and Al-Hakim who declared it authentic and Ath-Thahabi agreed with him 1/511. Al-Albani graded it authentic in Sahih At-Tirmithi 3/182. See also Jami'ul-'Usool li-'Ahdaith Ar-Rasool 4/ 389-90 checked by Al-Arna'ut. At-Tirmithi, An-Nasa'i 1/279 and Al-Hakim. See also Al-Albani, Sahih At-Tirmithi 3/183, and Jdmi'ul-'Usool with Al-Arna'ut's checking 4/144. Muslim 1/350. Muslim 4/2075 No. 2702 Al-Bukhari 7/150"
  },
  "hisnul_254": {
    "extraVirtueBn": "জাবির (রা.) বর্ণনা করেন, রাসূলুল্লাহ ﷺ বলেছেন: সর্বোত্তম যিকির হলো ‘লা ইলাহা ইল্লাল্লাহ’ এবং সর্বোত্তম দোয়া ‘আলহামদুলিল্লাহ’ (সহীহ)। উমার ও মুআয (রা.)-এর সহীহ হাদীসে রয়েছে: আন্তরিক বিশ্বাসে ‘লা ইলাহা ইল্লাল্লাহ’ পাঠকারী এবং শেষ কথা এ কালিমা হলে সে জান্নাতে প্রবেশ করবে। (সতর্কতা: \"বেশি বেশি লা ইলাহা ইল্লাল্লাহ বলে ঈমান নবায়ন কর\"—এই বিশেষ বর্ণনাটির সনদে দুর্বলতা রয়েছে)।",
    "extraVirtueEn": "Jabir (RA) reported: \"The best dhikr is La ilaha illallah and the best supplication is Alhamdulillah\" (Sahih). Authentic narrations from ‘Umar and Mu‘adh (RA) affirm Paradise and protection from Fire for one who sincerely affirms it as their final words. (Tahqeeq note: the specific report \"Renew your faith by saying La ilaha illallah frequently\" has weakness in its chain).",
    "extraBenefitsBn": [
      "দিনে ১০০ বার সুবহানাল্লাহি ওয়া বিহামদিহি পাঠে সমুদ্রের ফেনা সমতুল্য সগীরা গুনাহও মাফ হয়ে যায়।",
      "হাদীসের মান: শ্রেষ্ঠ যিকির ‘লা ইলাহা ইল্লাল্লাহ’ বিষয়ক হাদীসগুলো সহীহ, তবে ‘ঈমান নবায়ন’ সংক্রান্ত একটি বর্ণনার সনদ দুর্বল।"
    ],
    "extraBenefitsEn": [
      "Saying SubhanAllahi wa bihamdihi 100 times daily erases minor sins even if like the foam of the sea.",
      "Scholarly precision: the virtues of La ilaha illallah are Sahih, while the specific \"renew faith\" chain is weak."
    ],
    "enrichedRefBn": "বুখারী ৭/১৬৮, নং ৬৪০৫; মুসলিম ৪/২০৭১, নং ২৬৯১; তাছাড়া এ কিতাবের ### পৃষ্ঠায় যে ব্যক্তি সকাল ও সন্ধায় একশতবার পড়বে, তার যে ফযিলত বর্ণিত হয়েছে তা দেখুন। | মুসলিম ৪/২০৭৩, নং ২৬৯৮। | [১] তিরমিযী ৫/৪৩১,(ভা ২/১৭৬) ইবন মাজাহ ২/১২৪৯ (ভা ২/২৬৯) সহিহ ইবন হিব্বান ৩/১২৬, মাওয়ারিদুয যামআন ৭/৩২৬-৩২৯, মুসতাদরাক হাকিম ১/৬৭৬, ৬৮১ [২] বুখারি ১/৪৯ (ভা ১/২০) [৩] মুসতাদরাক হাকিম ১/১৪৩, ৫০২ [৪] মুসতাদরাক হাকিম ৪/২৮৫, মাজমাউয যাওয়াইদ ১/৫২, ২/২১১, ১০/৮২, আত-তারগীব ২/৩৯৪; ইতহাফুল খিয়ারাহ ২/৩৪৬; আলবানী, যায়ীফাহ ২/৩০০ [৫] মুসতাদরাক হাকিম ১/৬৭৮ রাহে বেলায়াত - যিকর নং ১ • হিসনুল মুসলিম #২৫৪",
    "enrichedRefEn": "Al-Bukhari 7/168, Muslim 4/2071 | Muslim 4/2073; Rahe Belayat (Dhikr # 1)"
  },
  "hisnul_255": {
    "enrichedRefBn": "বুখারী ৭/৬৭ নং ৬৪০৪; মুসলিম, তার শব্দে ৪/২০৭১ নং ২৬৯৩; অনুরূপভাবে একশবার বলার ফযীলত দেখুন ২৭.১৯ নং দো‘আর হাদীসে। • হিসনুল মুসলিম #২৫৫",
    "enrichedRefEn": "Al-Bukhari 7/67, Muslim 4/2071"
  },
  "hisnul_256": {
    "enrichedRefEn": "Al-Bukhari 7/168, Muslim 4/2072"
  },
  "hisnul_257": {
    "enrichedRefBn": "[১] মুসলিম ৩/১৬৮৫, নং ২১৩৭। [২] মুসলিম, ৪/২০৭২, নং ২৬৯৫। | তিরমিযী ৫/৪৬২, নং ৩৩৮৩; ইবন মাজাহ্‌ ২/১২৪৯, নং ৩৮০০; আল-হাকিম, ১/৫০৩ এবং সহীহ বলেছেন, আর ইমাম যাহাবী তা সমর্থন করেছেন। আরও দেখুন, সহীহুল জামে‘ ১/৩৬২ • হিসনুল মুসলিম #২৫৭",
    "enrichedRefEn": "Muslim 3/1685. Muslim 4/2072 | At-Tirmizi 5/462, Ibn Majah 2/1249, Al-Hakim"
  },
  "hisnul_259": {
    "enrichedRefBn": "তিরমিযী ৫/১১, নং ৩৪৬৪; হাকেম-১/৫০১ এবং এটাকে সহীহ বলেছেন। আর ইমাম যাহাবী তার সাথে একমত হয়েছেন। দেখুন, সহীহুল জামে‘ ৫/৫৩১; সহীহুত তিরমিযী ৩/১৬০। | রাহে বেলায়াত - যিকর নং ৯ • হিসনুল মুসলিম #২৫৯",
    "enrichedRefEn": "At-Tirmizi 5/511, Al-Hakim; Rahe Belayat (Dhikr # 9)"
  },
  "hisnul_260": {
    "enrichedRefEn": "Al-Bukhari , Muslim 4/2076"
  },
  "hisnul_262": {
    "secondaryCategories": [
      "rizq"
    ],
    "extraVirtueBn": "এক বেদুঈন দোয়ার শব্দাবলি ভুলে যাওয়ায় নবী ﷺ তাকে আল্লাহর মহিমা বর্ণনার পর চারটি শ্রেষ্ঠ বাক্য (ক্ষমা, রহমত, হেদায়াত ও রিযিক) শিখিয়ে দেন। যখন সে ফিরে গেল, নবীজি ﷺ বললেন: \"লোকটি তার হাত কল্যাণে পূর্ণ করে নিল।\"",
    "extraVirtueEn": "When a Bedouin asked for concise words of supplication, the Prophet ﷺ taught him to glorify Allah and ask for these four essentials (forgiveness, mercy, guidance, and provision), remarking as he left: \"He has filled his hands with goodness.\"",
    "extraBenefitsBn": [
      "চারটি সংক্ষিপ্ত প্রার্থনায় দুনিয়া ও আখিরাতের পরিপূর্ণ কল্যাণ—ক্ষমা, রহমত, হেদায়াত ও রিযিক—সম্মিলিত রয়েছে।"
    ],
    "extraBenefitsEn": [
      "Encompasses all essential worldly and hereafter needs in four concise prophetic requests."
    ],
    "enrichedRefBn": "মুসলিম ৪/২০৭২, নং ২৬৯৬। আর আবূ দাউদ বর্ধিত বর্ণনা করেন, ১/২২০, নং ৮৩২: • হিসনুল মুসলিম #২৬২",
    "enrichedRefEn": "Muslim 4/2072"
  },
  "hisnul_263": {
    "secondaryCategories": [
      "rizq"
    ],
    "enrichedRefBn": "মুসলিম ৪/২০৭৩; নং ৩৬৯৭। মুসলিমের অপর বর্ণনায় এসেছে, “এগুলো তোমার জন্য দুনিয়া ও আখেরাত সবকিছুর সমন্বয় ঘটাবে।” • হিসনুল মুসলিম #২৬৩",
    "enrichedRefEn": "Muslim 4/2073"
  },
  "hisnul_265": {
    "enrichedRefBn": "মুসনাদে আহমাদ নং ৫১৩; আহমাদ শাকের এর তারতীব অনুসারে, আর তার সনদ বিশুদ্ধ। দেখুন, মাজমাউয যাওয়ায়িদ, ১/২৯৭; ইবন হাজার বুলুগুল মারাম গ্রন্থে এটাকে আবু সা‘ঈদ রাদিয়াল্লাহু ‘আনহু এর বর্ণনায় ইমাম নাসাঈ (আস-সুনানুল কুবরা, নং ১০৬১৭) নিয়ে এসেছেন বলে ইঙ্গিত করেছেন এবং বলেছেন যে, হাদীসটিকে ইবন হিব্বান (নং ৮৪০) ও হাকেম (১/৫৪১) সহীহ বলেছেন। • হিসনুল মুসলিম #২৬৫",
    "enrichedRefEn": "Ahmad (no. 513) (Ahmad Shakir, ed.) and its chain of narration is authentic. See Majma'uz-Zawa'id 1/297. Ibn Hajar mentions it in Bulughul-Maram saying that Ibn Hibban and Al-Hakim considered it authentic."
  },
  "hisnul_266": {
    "enrichedRefBn": "আবূ দাউদ ২/৮১, নং ১৫০২; তিরমিযী ৫/৫২১, নং ৩৪৮৬। আরও দেখুন, সহীহুল জামে‘ ৪/২৭১, নং ৪৮৬৫, আর শাইখ আলবানী সহীহ সুনান আবি দাউদে (১/৪১১) এটাকে সহীহ বলেছেন। • হিসনুল মুসলিম #২৬৬",
    "enrichedRefEn": "Abu Dawud, At-Tirmizi 5/521"
  },
  "hisnul_intro_1": {
    "secondaryCategories": [
      "quranic"
    ]
  },
  "hisnul_intro_2": {
    "secondaryCategories": [
      "quranic"
    ]
  }
};
