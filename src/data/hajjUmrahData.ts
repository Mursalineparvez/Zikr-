export interface HajjStepItem {
  id: string;
  dayOrStageBn: string;
  dayOrStageEn: string;
  titleBn: string;
  titleEn: string;
  arabicTitle?: string;
  summaryBn: string;
  summaryEn: string;
  actionItems: string[];
  actionItemsEn: string[];
  mistakesToAvoidBn?: string[];
  mistakesToAvoidEn?: string[];
  essentialDuas?: Array<{
    titleBn: string;
    titleEn: string;
    arabic: string;
    transliteration: string;
    meaningBn: string;
    meaningEn: string;
  }>;
}

export interface MiqatItem {
  id: string;
  name: string;
  arabic: string;
  distanceFromMakkah: string;
  designatedFor: string;
  designatedForBn: string;
  airTravelNote: string;
  airTravelNoteBn: string;
}

export interface ZiyarahPlaceItem {
  id: string;
  name: string;
  arabic: string;
  location: string;
  virtue: string;
  virtueBn: string;
  etiquettes: string[];
  etiquettesBn: string[];
  recommendedDua?: {
    arabic: string;
    transliteration: string;
    meaningEn: string;
    meaningBn: string;
  };
}

export interface PackingCategory {
  categoryNameEn: string;
  categoryNameBn: string;
  items: Array<{ id: string; nameEn: string; nameBn: string; noteEn?: string; noteBn?: string }>;
}

export const UMRAH_STEPS: HajjStepItem[] = [
  {
    id: 'umrah_1_ihram',
    dayOrStageBn: 'ধাপ ১',
    dayOrStageEn: 'Step 1',
    titleBn: 'ইহরাম পরিধান, নিয়ত ও তালবিয়াহ',
    titleEn: 'Entering Ihram, Niyyah & Talbiyah',
    arabicTitle: 'الإحرام والنية والتلبية',
    summaryBn: 'মিকাত অতিক্রম করার পূর্বেই শারীরিক পরিচ্ছন্নতা ও গোসল করে ইহরামের কাপড় পরিধান, ২ রাকাত নফল এবং ওমরাহর নিয়ত করতে হবে।',
    summaryEn: 'Perform personal grooming, Sunnah Ghusl/Wudu, put on the Ihram garments, pray 2 Rakats, make the formal Niyyah for Umrah, and begin reciting the Talbiyah before crossing the Miqat boundary.',
    actionItems: [
      'নখ কাটা, গোঁফ ছাঁটা ও শরীরের পরিচ্ছন্নতা সম্পন্ন করে উত্তমরূপে সুন্নাহ গোসল করা।',
      'পুরুষদের জন্য সেলাইবিহীন দুটি সাদা চাদর (ইযার ও রিদা) পরিধান করা; নারীদের জন্য মুখ ও কবজি খোলা রেখে সাধারণ শালীন পোশাক।',
      '২ রাকাত ইহরামের নফল নামাজ আদায় করা (১ম রাকাতে সূরা আল-কাফিরুন ও ২য় রাকাতে সূরা আল-ইখলাস)।',
      'ওমরাহর নিয়ত করা: "আল্লাহুম্মা ইন্নি উরিদুল ওমরাতা ফা-ইয়াসসিরহা লি ওয়া তাক্বাব্বালহা মিন্নি"।',
      'উচ্চৈঃস্বরে তালবিয়াহ পাঠ শুরু করা (পুরুষরা স্পষ্ট স্বরে, মহিলারা অনুচ্চ স্বরে)।',
    ],
    actionItemsEn: [
      'Clip nails, trim mustache, groom personal hygiene, and perform a full Sunnah bath (Ghusl).',
      'Men wear two seamless white sheets (Izar for lower body, Rida for upper body); women wear modest Islamic attire leaving face and hands exposed.',
      'Pray 2 Rak\'ahs Sunnah prayer for Ihram (reciting Surah Al-Kafirun and Surah Al-Ikhlas).',
      'Make the oral Niyyah: "Allahumma innee ureedul-\'Umrata fa-yassirhaa lee wa taqabbalhaa minnee" (O Allah, I intend to perform Umrah, make it easy for me and accept it).',
      'Chant the Talbiyah continuously (men aloud, women in a soft voice) until reaching the Kaaba.',
    ],
    mistakesToAvoidBn: [
      'মিকাত অতিক্রম করার পর নিয়ত করা (মিকাতের আগেই নিয়ত করতে হবে)।',
      'পুরুষদের ইহরাম পরিধানের পর অন্তর্বাস বা সেলাইযুক্ত কোনো কাপড় পরে থাকা।',
      'সুগন্ধিযুক্ত সাবান বা তেল ব্যবহার করা।',
    ],
    mistakesToAvoidEn: [
      'Crossing the Miqat boundary on airplane or road without having entered Ihram and made Niyyah.',
      'Men wearing stitched underwear, socks, or head coverings.',
      'Using scented soap, cologne, or perfume after making the Niyyah.',
    ],
    essentialDuas: [
      {
        titleBn: 'তালবিয়াহ (The Talbiyah)',
        titleEn: 'The Talbiyah Supplication',
        arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
        transliteration: 'Labbayka Allahumma Labbayk, Labbayka La Shareeka Laka Labbayk, Innal-Hamda Wan-Ni’mata Laka Wal-Mulk, La Shareeka Lak',
        meaningBn: 'আমি হাজির হে আল্লাহ, আমি হাজির! তোমার কোনো শরিক নেই, আমি হাজির! নিশ্চয়ই সমস্ত প্রশংসা, নেয়ামত এবং রাজত্ব একমাত্র তোমারই; তোমার কোনো শরিক নেই।',
        meaningEn: 'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace, and sovereignty belong to You alone. You have no partner.',
      },
    ],
  },
  {
    id: 'umrah_2_tawaf',
    dayOrStageBn: 'ধাপ ২',
    dayOrStageEn: 'Step 2',
    titleBn: 'কাবা শরিফ তাওয়াফ ও জমজম পান (৭ চক্কর)',
    titleEn: 'Tawaf of the Kaaba (7 Circuits) & Zamzam',
    arabicTitle: 'طواف الكعبة المشرفة ومقام إبراهيم',
    summaryBn: 'পবিত্র কাবা গৃহকে বামে রেখে হাজরে আসওয়াদ থেকে শুরু করে ৭ চক্কর প্রদক্ষিণ করা, মাকামে ইবরাহিমে ২ রাকাত নামাজ এবং জমজম পানি পান করা।',
    summaryEn: 'Circumambulate the Holy Kaaba 7 complete circuits counter-clockwise starting from the Black Stone, pray 2 Rakats at Maqam Ibrahim, and drink Zamzam water.',
    actionItems: [
      'মসজিদুল হারামে ডান পা দিয়ে প্রবেশ করে মসজিদের দোয়া পাঠ করা ও প্রথম দর্শনে আকুল দোয়া করা।',
      'পুরুষদের জন্য ইজতিবা করা (ডান কাঁধ উন্মুক্ত রেখে চাদরটি বাম কাঁধের ওপর ফেলা)।',
      'হাজরে আসওয়াদ বরাবর দাঁড়িয়ে "বিসমিল্লাহি আল্লাহু আকবার" বলে হাত তুলে ইস্তিলাম করা।',
      'পুরুষরা প্রথম ৩ চক্করে রমল (বীরদর্পে দ্রুত পদক্ষেপে চলা) এবং বাকি ৪ চক্কর স্বাভাবিকভাবে হাঁটা।',
      'রুকনে ইয়ামানি অতিক্রমকালে "রাব্বানা আতিনা ফিদ্দুনিয়া..." পাঠ করা।',
      '৭ চক্কর শেষে ডান কাঁধ ঢেকে মাকামে ইবরাহিমের পেছনে ২ রাকাত নামাজ আদায় করা।',
      'কিবলামুখী হয়ে দাঁড়িয়ে প্রাণভরে জমজম পানি পান করা এবং মাথায় বরকতের জন্য পানি মাখানো।',
    ],
    actionItemsEn: [
      'Enter Masjid al-Haram with your right foot, recite the mosque entrance dua, and make heartfelt dua upon the first sight of the Holy Kaaba.',
      'Men perform Idtiba (uncovering the right shoulder by tucking the upper sheet under the right armpit).',
      'Face the Black Stone (Hajar al-Aswad) line, raise the right hand and say "Bismillahi Allahu Akbar" to perform Istilam.',
      'Men perform Raml (brisk, energetic pace) during the first 3 rounds, walking normally for rounds 4 to 7.',
      'Between the Yemeni Corner (Rukn al-Yamani) and the Black Stone, recite "Rabbana atina fid-dunya hasanah...".',
      'After completing 7 rounds, cover both shoulders and pray 2 Rak\'ahs behind Maqam Ibrahim (or anywhere in the Haram).',
      'Drink Zamzam water abundantly while standing facing the Qiblah, making sincere supplication.',
    ],
    mistakesToAvoidBn: [
      'হাজরে আসওয়াদে চুমু দিতে গিয়ে অন্য হাজীদের ধাক্কাধাক্কি করা বা কষ্ট দেওয়া।',
      'তাওয়াফের চক্কর ভুলে যাওয়া (৭ চক্কর নিশ্চিত করতে হবে)।',
      'পুরুষদের সালাত আদায়ের সময়ও ডান কাঁধ খোলা রাখা (নামাজের আগে ঢেকে নিতে হবে)।',
    ],
    mistakesToAvoidEn: [
      'Pushing or causing harm to other pilgrims to reach the Black Stone (raising the hand from afar is the full Sunnah).',
      'Losing count of circuits (always count carefully from 1 to 7).',
      'Leaving the right shoulder uncovered during the 2 Rakats of prayer (cover both shoulders before praying).',
    ],
    essentialDuas: [
      {
        titleBn: 'রুকনে ইয়ামানি ও হাজরে আসওয়াদের মধ্যবর্তী দোয়া',
        titleEn: 'Dua between Rukn Yamani and Black Stone',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina \'adhaban-nar',
        meaningBn: 'হে আমাদের রব! আমাদের দুনিয়াতে কল্যাণ দান করুন, পরকালেও কল্যাণ দান করুন এবং জাহান্নামের আগুন থেকে রক্ষা করুন।',
        meaningEn: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
      },
      {
        titleBn: 'জমজম পানি পানের দোয়া',
        titleEn: 'Dua When Drinking Zamzam Water',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ',
        transliteration: 'Allahumma inni as-aluka \'ilman nafi\'an, wa rizqan wasi\'an, wa shifa-an min kulli da-in',
        meaningBn: 'হে আল্লাহ! আমি তোমার কাছে উপকারী জ্ঞান, প্রশস্ত রিজিক এবং সকল রোগের শেফা ও আরোগ্য প্রার্থনা করছি।',
        meaningEn: 'O Allah, I ask You for beneficial knowledge, abundant provision, and a cure for every illness.',
      },
    ],
  },
  {
    id: 'umrah_3_sai',
    dayOrStageBn: 'ধাপ ৩',
    dayOrStageEn: 'Step 3',
    titleBn: 'সাফা ও মারওয়া পাহাড়ে সাঈ (৭ চক্কর)',
    titleEn: 'Sa\'i between Safa & Marwah (7 Trips)',
    arabicTitle: 'السعي بين الصفا والمروة',
    summaryBn: 'সাফা পাহাড় থেকে শুরু করে মারওয়া পাহাড়ে মোট ৭টি চক্কর সম্পন্ন করা (সাফা থেকে মারওয়া = ১, মারওয়া থেকে সাফা = ২)।',
    summaryEn: 'Walk 7 trips between the hills of Safa and Marwah, beginning at Mount Safa and concluding the 7th trip at Mount Marwah.',
    actionItems: [
      'সাফা পাহাড়ে উঠে কাবার দিকে মুখ করে হাত তুলে ৩ বার "আল্লাহু আকবার, লা ইলাহা ইল্লাল্লাহ" বলে দোয়া করা।',
      'সাফা থেকে মারওয়ার দিকে যাত্রা শুরু করা (সাফা ➔ মারওয়া = ১ম চক্কর)।',
      'পুরুষরা সবুজ বাতির চিহ্নিত এলাকা (মাইলানে আখদারাইন)-তে দ্রুতগতিতে দৌড়ানো / জগিং করা।',
      'মারওয়া পাহাড়ে পৌঁছে কাবার দিকে মুখ করে একইভাবে তাহলীল ও দোয়া পাঠ করা।',
      'মারওয়া থেকে সাফায় ফিরে আসা (মারওয়া ➔ সাফা = ২য় চক্কর)।',
      'এভাবে ৭ম চক্কর সম্পন্ন হয়ে মারওয়া পাহাড়ে সাঈ সমাপ্ত করা।',
    ],
    actionItemsEn: [
      'Climb Mount Safa, face the Kaaba, raise both hands, and proclaim Takbeer and Tahleel 3 times with sincere dua.',
      'Walk toward Marwah (Safa to Marwah counts as Trip 1).',
      'Men jog briskly between the two green light markers (Milayn al-Akhdarayn); women walk normally.',
      'Upon reaching Marwah, face the Kaaba and repeat the supplication (Marwah to Safa counts as Trip 2).',
      'Repeat until completing 7 trips, concluding the 7th trip at Mount Marwah.',
    ],
    mistakesToAvoidBn: [
      'সাফা থেকে মারওয়া গিয়ে আবার সাফায় ফিরে আসাকে ১ চক্কর মনে করা (সাফা থেকে মারওয়া নিজেই ১ চক্কর)।',
      'মহিলাদের সবুজ বাতির অংশে দৌড়াদৌড়ি করা (এটি কেবল পুরুষদের জন্য সুন্নাত)।',
    ],
    mistakesToAvoidEn: [
      'Thinking a round trip equals 1 lap (Safa to Marwah is 1 lap; Marwah to Safa is lap 2; total is 7 laps ending at Marwah).',
      'Women running in the green light section (brisk walk is only prescribed for men).',
    ],
    essentialDuas: [
      {
        titleBn: 'সাফা ও মারওয়ায় ওঠার কোরআনিক আয়াত ও দোয়া',
        titleEn: 'Dua upon Ascending Mount Safa & Marwah',
        arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ ۖ أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Innas-Safa wal-Marwata min sha\'a\'irillah. Abda\'u bima bada\'Allahu bih. La ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer.',
        meaningBn: 'নিশ্চয়ই সাফা ও মারওয়া আল্লাহর নিদর্শনসমূহের অন্তর্ভুক্ত। আল্লাহ যা দিয়ে শুরু করেছেন আমিও তা দিয়ে শুরু করছি। আল্লাহ ছাড়া কোনো মাবুদ নেই, তাঁর কোনো শরিক নেই, রাজত্ব ও প্রশংসা একমাত্র তাঁরই।',
        meaningEn: 'Indeed, as-Safa and al-Marwah are among the symbols of Allah. I begin with that which Allah began. There is no deity except Allah alone, having no partner. To Him belongs sovereignty and to Him belongs praise, and He is over all things omnipotent.',
      },
    ],
  },
  {
    id: 'umrah_4_halq',
    dayOrStageBn: 'ধাপ ৪',
    dayOrStageEn: 'Step 4',
    titleBn: 'হলক বা কসর (মাথা মুণ্ডন বা চুল ছাঁটা) ও ইহরাম সমাপ্তি',
    titleEn: 'Halq (Shaving) or Taqseer (Trimming) & Completion',
    arabicTitle: 'الحلق أو التقصير والتحلل',
    summaryBn: 'পুরুষরা মাথা পুরোপুরি মুণ্ডন করবেন (হলক—উত্তম) অথবা সমানভাবে চুল ছাঁটবেন (কসর); নারীরা আঙুলের এক কর পরিমাণ চুল কাটবেন। এর মাধ্যমে ওমরাহ সম্পন্ন হয়।',
    summaryEn: 'Men completely shave the head (Halq - most rewarded) or trim hair evenly all around (Taqseer); women cut a fingertip length from their hair braid. This completes the Umrah and lifts all Ihram restrictions.',
    actionItems: [
      'পুরুষদের জন্য পুরো মাথা ব্লেড বা ট্রিমার দিয়ে কামিয়ে ফেলা (হলক—রাসুল ﷺ ৩ বার রহমতের দোয়া করেছেন)।',
      'অথবা পুরো মাথার চুল চারপাশ থেকে সমানভাবে কমপক্ষে ১ ইঞ্চি ছোট করা (কসর)।',
      'নারীরা তাঁদের চুলের শেষ প্রান্ত থেকে আঙুলের এক কর (প্রায় ১ ইঞ্চি) পরিমাণ নিজে বা মাহরামের মাধ্যমে কেটে নেবেন।',
      'চুল কাটার সাথে সাথেই ওমরাহ পূর্ণ হলো এবং ইহরামের যাবতীয় বিধিনিষেধ উঠে গেল (তাহাল্লুল)।',
      'আল্লাহ তায়ালার দরবারে শোকর আদায় করে মোনাজাত করা।',
    ],
    actionItemsEn: [
      'Men shave the entire head (Halq - highly recommended, the Prophet ﷺ prayed for them thrice).',
      'Alternatively, men trim hair evenly from all parts of the head by at least 1 inch (Taqseer).',
      'Women cut approximately one fingertip length (1 inch) from the ends of their hair in private.',
      'Upon hair cutting, all Ihram restrictions are immediately lifted (Tahallul al-Asghar).',
      'Express profound gratitude to Allah Almighty for enabling the completion of Umrah.',
    ],
    mistakesToAvoidBn: [
      'মাথার মাত্র ২/৩টি চুল কেটে ইহরাম খুলে ফেলা (পুরো মাথার চুল সমানভাবে কাটা ওয়াজিব)।',
      'চুল কাটার আগেই ইহরামের কাপড় বা বিধিনিষেধ ভঙ্গ করা।',
    ],
    mistakesToAvoidEn: [
      'Cutting only a few strands from one side of the head (trimming must be comprehensive from the entire head).',
      'Violating Ihram prohibitions before the hair is actually cut.',
    ],
  },
];

export const HAJJ_DAYS_GUIDE: HajjStepItem[] = [
  {
    id: 'hajj_day_1',
    dayOrStageBn: '৮ই জিলহজ',
    dayOrStageEn: '8th Dhul Hijjah',
    titleBn: 'তারবিয়াহ দিবস: মিনায় গমন ও অবস্থান',
    titleEn: 'Day of Tarwiyah: Journey to Mina',
    arabicTitle: 'يوم التروية والمبيت بمنى',
    summaryBn: 'মক্কার হোটেল থেকে হজের ইহরাম বেঁধে তালবিয়াহ পাঠ করতে করতে মিনায় পৌঁছানো এবং ৫ ওয়াক্ত নামাজ আদায় করা।',
    summaryEn: 'Enter Ihram for Hajj from your hotel in Makkah, recite Talbiyah, proceed to the tent city of Mina, and pray 5 daily prayers (Dhuhr to Fajr).',
    actionItems: [
      'হোটেল রুমে গোসল করে হজের ইহরাম পরিধান ও নিয়ত করা: "লাব্বাইকা হাজ্জান"।',
      'তালবিয়াহ পাঠ করতে করতে সকালের মধ্যে তাঁবুর শহর মিনায় পৌঁছানো।',
      'মিনায় জোহর, আসর, মাগরিব, এশা এবং ৯ই জিলহজের ফজর—মোট ৫ ওয়াক্ত নামাজ স্ব স্ব সময়ে কসর (৪ রাকাত নামাজ ২ রাকাত) আদায় করা (জমা নয়)।',
      'মিনায় অপ্রয়োজনীয় কথাবার্তা পরিহার করে জিকির, কুরআন তিলাওয়াত ও দোয়ায় রত থাকা।',
    ],
    actionItemsEn: [
      'Take a Sunnah bath in Makkah, put on Ihram garments, and make oral intention: "Labbayk Allahumma Hajjan".',
      'Recite the Talbiyah abundantly and travel to Mina during the morning.',
      'Pray Dhuhr, Asr, Maghrib, Isha, and Fajr of 9th Dhul Hijjah in Mina, shortening 4-raka\'ah prayers to 2 raka\'ahs at their respective times (Qasr without combining).',
      'Engage in continuous Dhikr, Quran recitation, and spiritual preparation for Arafah.',
    ],
  },
  {
    id: 'hajj_day_2_arafah',
    dayOrStageBn: '৯ই জিলহজ (দিন)',
    dayOrStageEn: '9th Dhul Hijjah (Day)',
    titleBn: 'আরাফাহ দিবস: হজের মূল রুকন ও উকুফ',
    titleEn: 'Day of Arafah: The Core Pillar of Hajj (Wukuf)',
    arabicTitle: 'يوم عرفة والوقوف بعرفات',
    summaryBn: 'আরাফাতের ময়দানে অবস্থান করা হজের সবচেয়ে বড় ফরজ। জোহর ও আসর এক আজানে দুই ইকামতে একসঙ্গে আদায় করে সূর্যাস্ত পর্যন্ত কান্নাকাটি করে দোয়া করা।',
    summaryEn: 'Standing in Arafah is the supreme pillar of Hajj ("Al-Hajju Arafah"). Listen to the Khutbah, combine Dhuhr & Asr prayers, and beseech Allah in tears until sunset.',
    actionItems: [
      '৯ই জিলহজ সূর্যোদয়ের পর মিনা থেকে আরাফাতের ময়দানে রওয়ানা হওয়া।',
      'মসজিদে নামিরাহ থেকে হজের খুতবা শোনা।',
      'জোহরের ওয়াক্তে জোহর ও আসর নামাজ একসঙ্গে ২ রাকাত + ২ রাকাত (জমে তাকদীম) আদায় করা।',
      'জাবালে রহমতের আশপাশে বা তাঁবুতে দাঁড়িয়ে কিবলামুখী হয়ে সূর্যাস্ত পর্যন্ত দু’হাত তুলে দোয়ায় নিমগ্ন থাকা।',
      'সূর্যাস্তের পূর্ব পর্যন্ত আরাফাতের সীমানার ভেতরেই অবস্থান নিশ্চিত করা।',
    ],
    actionItemsEn: [
      'Depart Mina after sunrise and proceed to the plains of Arafah.',
      'Listen to the Hajj sermon (Khutbah) delivered at Masjid Namirah.',
      'Pray Dhuhr and Asr combined and shortened (2 + 2 Rak\'ahs) at Dhuhr time with one Adhan and two Iqamahs.',
      'Engage in continuous standing (Wukuf), sincere repentance, and heartfelt dua facing the Qiblah until the sun sets completely.',
      'Ensure you remain within the designated boundaries of Arafat until sunset.',
    ],
    essentialDuas: [
      {
        titleBn: 'আরাফার দিনের সর্বশ্রেষ্ঠ দোয়া',
        titleEn: 'The Greatest Dua on the Day of Arafah',
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'La ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer',
        meaningBn: 'একমাত্র আল্লাহ ছাড়া কোনো মাবুদ নেই, তাঁর কোনো শরিক নেই। রাজত্ব ও সমস্ত প্রশংসা একমাত্র তাঁরই এবং তিনি সবকিছুর ওপর ক্ষমতাবান।',
        meaningEn: 'There is no deity except Allah alone, with no partner. Unto Him belongs dominion and all praise, and He is over all things competent.',
      },
    ],
  },
  {
    id: 'hajj_day_2_muzdalifah',
    dayOrStageBn: '৯ই জিলহজ (রাত)',
    dayOrStageEn: '9th Dhul Hijjah (Night)',
    titleBn: 'মুজদালিফায় রাতযাপন ও কঙ্কর সংগ্রহ',
    titleEn: 'Night in Muzdalifah & Gathering Pebbles',
    arabicTitle: 'المبيت بمزدلفة وجمع الجمار',
    summaryBn: 'সূর্যাস্তের পর মাগরিব না পড়ে মুজদালিফায় গিয়ে মাগরিব ও এশা একসঙ্গে পড়া, খোলা আকাশের নিচে রাতযাপন এবং জামারাতের জন্য কঙ্কর সংগ্রহ করা।',
    summaryEn: 'Depart Arafah after sunset without praying Maghrib, reach Muzdalifah to combine Maghrib & Isha, rest under the open sky, and collect 49/70 pebbles for Jamarat.',
    actionItems: [
      'সূর্যাস্তের পর আরাফাহ থেকে শান্তভাবে মুজদালিফার উদ্দেশ্যে রওয়ানা হওয়া।',
      'মুজদালিফায় পৌঁছে এক আজানে মাগরিব (৩ রাকাত) ও এশা (২ রাকাত কসর) একসঙ্গে আদায় করা (জমে তাখীর)।',
      'খোলা আকাশের নিচে বিশ্রাম ও ঘুমিয়ে রাতযাপন করা (সুন্নাত)।',
      'জামারাতে নিক্ষেপের জন্য চনাবুট আকৃতির ৪৯টি (বা ৭০টি) ছোট পাথর/কঙ্কর কুড়িয়ে নেওয়া ও ধৌত করা।',
      '১০ই জিলহজের ফজর পড়ে মাশয়ারুল হারামের নিকট দাঁড়িয়ে সূর্যোদয়ের পূর্ব পর্যন্ত উকুফ ও দোয়া করা।',
    ],
    actionItemsEn: [
      'Leave Arafat after sunset calmly and proceed to Muzdalifah.',
      'Upon reaching Muzdalifah, combine Maghrib (3 Rakats) and Isha (2 Rakats) at Isha time with one Adhan and two Iqamahs.',
      'Rest and sleep under the open starlit sky until Fajr.',
      'Collect 49 (or 70) small pea-sized pebbles for stoning the Jamarat.',
      'Pray Fajr at early dawn and stand facing the Qiblah at Mash\'ar al-Haram, making dua until just before sunrise.',
    ],
  },
  {
    id: 'hajj_day_3_eid',
    dayOrStageBn: '১০ই জিলহজ (ঈদের দিন)',
    dayOrStageEn: '10th Dhul Hijjah (Eid Day)',
    titleBn: 'কুরবানির দিন: রমি, দমে শোকর, হলক ও তাওয়াফে যিয়ারত',
    titleEn: 'Yawm an-Nahr: Ramy, Sacrifice, Halq & Tawaf al-Ifadah',
    arabicTitle: 'يوم النحر: الرمي والذبح والحلق وطواف الإفاضة',
    summaryBn: 'হজের সবচেয়ে ব্যস্ততম দিন। ৪টি প্রধান কাজ ক্রমানুসারে সম্পন্ন করা: বড় শয়তানকে ৭টি কঙ্কর মারা, কুরবানি করা, মাথা মুণ্ডন করা এবং কাবার তাওয়াফে যিয়ারত ও সাঈ।',
    summaryEn: 'The most momentous day of Hajj with 4 sequential rites: Stoning the Big Jamarah (Aqaba), offering animal sacrifice (Hady), shaving head (Halq), and performing Tawaf al-Ifadah with Sa\'i.',
    actionItems: [
      '১. সূর্যোদয়ের পর মুজদালিফা থেকে মিনায় গিয়ে শুধুমাত্র বড় শয়তানকে (জামারাতুল আকাবা) ৭টি কঙ্কর নিক্ষেপ করা (প্রতি কঙ্করে "আল্লাহু আকবার" বলা)।',
      '২. তামাত্তু ও ক্বেরান হজের হাজীদের জন্য দমে শোকর (কুরবানি) সম্পন্ন করা।',
      '৩. পুরুষদের মাথা মুণ্ডন (হলক) বা চুল ছোট (কসর) করা; নারীদের এক কর চুল কাটা। এর মাধ্যমে ১ম তাহাল্লুল সম্পন্ন হয়।',
      '৪. স্বাভাবিক পোশাক পরে মক্কায় গিয়ে কাবার তাওয়াফে যিয়ারত (হজের ফরজ তাওয়াফ) ও হজের সাঈ সম্পন্ন করা। এর মাধ্যমে ২য় তাহাল্লুল পূর্ণ হয়।',
    ],
    actionItemsEn: [
      '1. After sunrise, walk to Mina and stone ONLY the Big Pillar (Jamarat al-Aqaba) with 7 pebbles, chanting "Allahu Akbar" with each throw.',
      '2. Slaughter the sacrificial animal (Hady) for pilgrims performing Hajj Tamattu\' or Qiran.',
      '3. Men shave or trim their hair; women cut a fingertip length. This completes the First Tahallul (all restrictions lifted except intimacy).',
      '4. Change into regular clothes, travel to Makkah, and perform Tawaf al-Ifadah (obligatory Hajj Tawaf) followed by the Sa\'i of Hajj. This completes the Final Tahallul.',
    ],
  },
  {
    id: 'hajj_day_4_5_tashreeq',
    dayOrStageBn: '১১, ১২ ও ১৩ই জিলহজ',
    dayOrStageEn: '11th, 12th & 13th Dhul Hijjah',
    titleBn: 'আইয়ামুত তাশরিক: তিন শয়তানে কঙ্কর নিক্ষেপ ও বিদায়ী তাওয়াফ',
    titleEn: 'Ayyam at-Tashreeq: Stoning All 3 Pillars & Farewell Tawaf',
    arabicTitle: 'أيام التشريق وطواف الوداع',
    summaryBn: 'মিনায় রাতযাপন এবং প্রতিদিন জোহরের পর ছোট, মধ্যম ও বড় তিন শয়তানকে ৭টি করে মোট ২১টি কঙ্কর মারা। মক্কা ত্যাগের আগে বিদায়ী তাওয়াফ করা।',
    summaryEn: 'Spend nights in Mina, stone all 3 Jamarat (Small, Medium, Big - 21 pebbles daily) after Zawal, and conclude with the Farewell Tawaf (Tawaf al-Wada) before departing Makkah.',
    actionItems: [
      '১১ ও ১২ই জিলহজ মিনায় রাতযাপন করা ওয়াজিব।',
      'প্রতিদিন জোহরের পর ক্রমানুসারে তিন জামারাতে ৭টি করে কঙ্কর মারা: ছোট জামারাত (৭টি) ➔ মধ্যম জামারাত (৭টি) ➔ বড় জামারাত (৭টি)।',
      'ছোট ও মধ্যম জামারাতে কঙ্কর মারার পর পাশে সরে কিবলামুখী হয়ে দীর্ঘক্ষণ হাত তুলে দোয়া করা সুন্নাত।',
      '১২ই জিলহজ সূর্যাস্তের পূর্বে মিনা ত্যাগ করা জায়েজ (নাফার আউয়াল), অথবা ১৩ই জিলহজ পাথর মেরে মিনা ত্যাগ করা।',
      'মক্কা ত্যাগ করে নিজ দেশে ফেরার পূর্ব মুহূর্তে কাবা শরিফের বিদায়ী তাওয়াফ (তাওয়াফে বিদা) সম্পন্ন করা।',
    ],
    actionItemsEn: [
      'Spending the nights of 11th and 12th Dhul Hijjah in Mina is obligatory (Wajib).',
      'Every day after Zawal (midday), stone all 3 Jamarat in order: Small (7) -> Medium (7) -> Big/Aqaba (7), totaling 21 pebbles per day.',
      'After stoning the Small and Medium pillars, step aside facing the Qiblah and make long, heartfelt supplication.',
      'You may depart Mina on the 12th before sunset (Nafar Awwal) or stay until the 13th for extra reward.',
      'Before departing Makkah for your home country, perform the Farewell Circumambulation (Tawaf al-Wada\').',
    ],
  },
];

export const MIQAT_LOCATIONS: MiqatItem[] = [
  {
    id: 'dhul_hulayfah',
    name: 'Dhul Hulayfah (Abyar Ali)',
    arabic: 'ذو الحليفة (أبيار علي)',
    distanceFromMakkah: '410 km North of Makkah',
    designatedFor: 'Pilgrims originating from or passing through Madinah al-Munawwarah.',
    designatedForBn: 'মদিনা মুনাওয়ারা থেকে আগমনকারী বা মদিনা হয়ে মক্কায় গমনকারী হাজীদের মিকাত।',
    airTravelNote: 'If visiting Madinah first, you will enter Ihram at Masjid Dhul Hulayfah before boarding the Haramain Train or bus to Makkah.',
    airTravelNoteBn: 'প্রথমে মদিনায় গেলে মদিনার এই মসজিদে গোসল ও ইহরামের কাপড় পরে মক্কার উদ্দেশ্যে যাত্রা করতে হয়।',
  },
  {
    id: 'al_juhfah',
    name: 'Al-Juhfah (Rabigh)',
    arabic: 'الجحفة (رابغ)',
    distanceFromMakkah: '182 km Northwest of Makkah',
    designatedFor: 'Pilgrims arriving from the Levant (Syria, Jordan, Lebanon), Palestine, Egypt, North Africa, Europe, and the Americas.',
    designatedForBn: 'সিরিয়া, জর্ডান, লেবানন, মিশর, উত্তর আফ্রিকা, ইউরোপ ও আমেরিকা থেকে আগত হাজীদের মিকাত।',
    airTravelNote: 'Flights passing over Egypt or the Red Sea will announce Ihram alignment 20-30 minutes before Juhfah.',
    airTravelNoteBn: 'লোহিত সাগর বা মিশর হয়ে আসা ফ্লাইটে বিমান ক্রুরা মিকাত অতিক্রমের ২০-৩০ মিনিট আগে ঘোষণা দেন।',
  },
  {
    id: 'qarn_al_manazil',
    name: 'Qarn al-Manazil (As-Sail Al-Kabeer)',
    arabic: 'قرن المنازل (السيل الكبير)',
    distanceFromMakkah: '75 km East of Makkah',
    designatedFor: 'Pilgrims from Najd, Riyadh, UAE, Qatar, Oman, Gulf countries, and flight routes from Bangladesh, India, Pakistan, and Southeast Asia.',
    designatedForBn: 'বাংলাদেশ, ভারত, পাকিস্তান, মালয়েশিয়া, রিয়াদ ও উপসাগরীয় দেশসমূহ থেকে আসা হাজীদের প্রধান মিকাত।',
    airTravelNote: 'Crucial: When flying directly to Jeddah from Dhaka/Asia, wear your Ihram clothes before boarding, and make your oral Niyyah & Talbiyah when the pilot announces 30 minutes before Qarn al-Manazil.',
    airTravelNoteBn: 'বিশেষ জরুরি: ঢাকা থেকে সরাসরি জেদ্দা ফ্লাইটে বিমানে ওঠার আগেই ইহরামের কাপড় পরে নেওয়া উচিত এবং বিমান ল্যান্ড করার প্রায় ৩০ মিনিট আগে পাইলট ঘোষণা দিলে নিয়ত ও তালবিয়াহ পাঠ করতে হবে।',
  },
  {
    id: 'yalamlam',
    name: 'Yalamlam (Al-Sadiah)',
    arabic: 'يلملم (السعدية)',
    distanceFromMakkah: '100 km South of Makkah',
    designatedFor: 'Pilgrims from Yemen and southern maritime routes.',
    designatedForBn: 'ইয়েমেন ও দক্ষিণাঞ্চলীয় সমুদ্রপথ থেকে আগমনকারী হাজীদের মিকাত।',
    airTravelNote: 'Historically used by southern sea vessels and flyers across the Arabian Sea.',
    airTravelNoteBn: 'দক্ষিণ দিক দিয়ে আসা জাহাজ ও ফ্লাইটের যাত্রীদের জন্য নির্ধারিত মিকাত।',
  },
  {
    id: 'dhat_irq',
    name: 'Dhat \'Irq',
    arabic: 'ذات عرق',
    distanceFromMakkah: '100 km Northeast of Makkah',
    designatedFor: 'Pilgrims from Iraq, Iran, and Central Asia.',
    designatedForBn: 'ইরাক, ইরান ও মধ্য এশিয়া থেকে স্থল বা আকাশপথে আগতদের মিকাত।',
    airTravelNote: 'Designated by Sayyiduna Umar ibn al-Khattab (RA) for eastern pilgrims.',
    airTravelNoteBn: 'হজরত ওমর (রা.) কর্তৃক প্রাচ্যের হাজীদের জন্য নির্ধারিত মিকাত।',
  },
  {
    id: 'taneem_masjid_aisha',
    name: 'Masjid Aisha (Tan\'eem)',
    arabic: 'مسجد عائشة (التنعيم)',
    distanceFromMakkah: '7.5 km from the Kaaba (Hil boundary)',
    designatedFor: 'Residents of Makkah and pilgrims already in Makkah wishing to perform an additional Umrah.',
    designatedForBn: 'মক্কায় অবস্থানরত হাজী ও বাসিন্দাদের দ্বিতীয়বার বা অতিরিক্ত ওমরাহর জন্য মিকাত।',
    airTravelNote: 'Easily reachable by local taxi or bus from the Clock Tower / Haram in 15 minutes.',
    airTravelNoteBn: 'হারাম শরিফ থেকে মাত্র ১৫ মিনিটের ট্যাক্সি বা বাসে পৌঁছানো যায়।',
  },
];

export const MADINAH_ZIYARAH_PLACES: ZiyarahPlaceItem[] = [
  {
    id: 'masjid_an_nabawi',
    name: 'Al-Masjid an-Nabawi',
    arabic: 'المسجد النبوي الشريف',
    location: 'Madinah City Center',
    virtue: '1,000 times greater reward for every prayer compared to regular mosques. Houses the resting place of Prophet Muhammad ﷺ.',
    virtueBn: 'এখানে এক রাকাত নামাজের সওয়াব সাধারণ মসজিদের চেয়ে ১,০০০ গুণ বেশি। এখানে রয়েছে নবীজি ﷺ এবং খলিফাদ্বয়ের পবিত্র রওজা।',
    etiquettes: [
      'Enter with solemn reverence, humility, and lowered voice.',
      'Avoid raising voice near the golden chamber.',
      'Send abundant Salawat upon Prophet Muhammad ﷺ.',
    ],
    etiquettesBn: [
      'অত্যন্ত আদব, বিনয় ও নিম্নস্বরে প্রবেশ করা।',
      'পবিত্র রওজা শরিফের সামনে উচ্চৈঃস্বরে কথা না বলা।',
      'নবীজি ﷺ-এর প্রতি বেশি বেশি দরুদ ও সালাম পেশ করা।',
    ],
    recommendedDua: {
      arabic: 'السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْكَ يَا نَبِيَّ اللَّهِ، السَّلَامُ عَلَيْكَ يَا خِيَرَةَ خَلْقِ اللَّهِ',
      transliteration: 'As-salamu \'alayka ya Rasool Allah wa rahmatullahi wa barakatuh. As-salamu \'alayka ya Nabiyy Allah, As-salamu \'alayka ya khiyarata khalqillah.',
      meaningEn: 'Peace be upon you, O Messenger of Allah, and the mercy of Allah and His blessings. Peace be upon you, O Prophet of Allah, peace be upon you, O best of Allah\'s creation.',
      meaningBn: 'হে আল্লাহর রাসুল! আপনার ওপর শান্তি, আল্লাহর রহমত ও বরকত বর্ষিত হোক। হে আল্লাহর নবী, হে আল্লাহর সৃষ্টির সেরা ব্যক্তিত্ব! আপনার ওপর সালাম।',
    },
  },
  {
    id: 'rawdah_ash_sharifah',
    name: 'Ar-Rawdah ash-Sharifah',
    arabic: 'الروضة الشريفة',
    location: 'Between the Prophet\'s Chamber & the Minbar',
    virtue: 'The Prophet ﷺ said: "Between my house and my pulpit is a garden from the gardens of Paradise (Riyad al-Jannah)." [Sahih Bukhari]',
    virtueBn: 'রাসুলুল্লাহ ﷺ বলেছেন: "আমার ঘর এবং আমার মিম্বরের মধ্যবর্তী স্থানটি জান্নাতের বাগানসমূহের একটি বাগান।" [সহিহ বুখারি]',
    etiquettes: [
      'Must book Nusuk App appointment permit in advance.',
      'Pray 2 Rak\'ahs Tahiyyatul Masjid and engage in earnest repentance and supplication.',
      'Do not push other worshippers or exceed the permitted time slot.',
    ],
    etiquettesBn: [
      'নুসুক (Nusuk) অ্যাপে অগ্রিম স্লট বুকিং নিশ্চিত করতে হবে।',
      '২ রাকাত তাহিয়্যাতুল মসজিদ আদায় এবং একান্তে চোখের পানিতে দোয়া করা।',
      'অন্য হাজীদের ধাক্কা না দিয়ে শান্তভাবে নির্ধারিত সময় ব্যবহার করা।',
    ],
  },
  {
    id: 'masjid_quba',
    name: 'Masjid Quba',
    arabic: 'مسجد قباء',
    location: '3.5 km South of Masjid an-Nabawi',
    virtue: 'The first mosque built in Islam. The Prophet ﷺ said: "Whoever purifies himself in his house, then comes to Masjid Quba and prays in it, will have a reward like that of Umrah." [Sunan Ibn Majah]',
    virtueBn: 'ইসলামের প্রথম মসজিদ। রাসুল ﷺ বলেছেন: "যে ব্যক্তি ঘরে পবিত্রতা অর্জন করে কুবা মসজিদে এসে দুই রাকাত নামাজ আদায় করবে, সে একটি ওমরাহর সমপরিমাণ সওয়াব পাবে।" [ইবনে মাজাহ]',
    etiquettes: [
      'Take Wudu/Ghusl at your hotel in Madinah before departing.',
      'Sunnah to visit on Saturday morning (or any day).',
      'Pray at least 2 Rak\'ahs Sunnah or Nafl inside.',
    ],
    etiquettesBn: [
      'হোটেল থেকে অজু করে কুবা মসজিদে যাওয়া সুন্নাত।',
      'শনিবার সকালে যাওয়া বিশেষ সুন্নাত (অন্যান্য দিনেও যাওয়া যায়)।',
      'মসজিদে প্রবেশ করে ২ রাকাত নফল সালাত আদায় করা।',
    ],
  },
  {
    id: 'jannat_al_baqi',
    name: 'Jannat al-Baqi Cemetery',
    arabic: 'مقبرة بقيع الغرقد',
    location: 'Adjacent East of Masjid an-Nabawi',
    virtue: 'Resting place of over 10,000 noble Companions (Sahabah), wives of the Prophet (Ummahatul Mu\'mineen), and his beloved family members.',
    virtueBn: 'এখানে ১০ হাজারেরও বেশি সাহাবায়ে কেরাম, উম্মাহাতুল মুমিনিন এবং আহলে বাইতের সদস্যগণ শায়িত আছেন।',
    etiquettes: [
      'Open after Fajr and Asr prayers for men.',
      'Recite the greeting for the graves and make sincere Dua for forgiveness.',
      'Do not touch or circumambulate graves.',
    ],
    etiquettesBn: [
      'ফজর ও আসরের নামাজের পর পুরুষদের জন্য উন্মুক্ত থাকে।',
      'কবরবাসীদের জন্য সালাম ও মাগফিরাতের দোয়া করা।',
      'কবরে হাত ছোঁয়ানো বা সিজদা করা থেকে কঠোরভাবে বিরত থাকা।',
    ],
  },
  {
    id: 'mount_uhud_martyrs',
    name: 'Mount Uhud & Martyrs Cemetery',
    arabic: 'جبل أحد ومقبرة الشهداء',
    location: '5 km North of Madinah',
    virtue: 'Site of the historic Battle of Uhud. Resting place of Sayyiduna Hamzah (RA) and 70 valiant martyr companions. The Prophet ﷺ said: "Uhud is a mountain that loves us and we love it."',
    virtueBn: 'ঐতিহাসিক ওহুদ যুদ্ধের ময়দান। এখানে সাইয়্যিদুশ শুহাদা হজরত হামজাহ (রা.)-সহ ৭০ জন শহীদ সাহাবী শায়িত আছেন। নবীজি ﷺ বলেছেন: "ওহুদ এমন এক পাহাড় যা আমাদের ভালোবাসে, আমরাও তাকে ভালোবাসি।"',
    etiquettes: [
      'Send Salam upon Hamzah (RA) and the martyrs of Uhud.',
      'Climb the Archers\' Hill (Jabal ar-Rumat) with reflection upon the importance of obedience to the Prophet ﷺ.',
    ],
    etiquettesBn: [
      'হজরত হামজাহ (রা.) ও শহীদদের জন্য মাগফিরাতের দোয়া করা।',
      'তীরন্দাজদের পাহাড়ে (জাবালে রুমাত) উঠে নবীজি ﷺ-এর নির্দেশ মানার গুরুত্ব উপলব্ধি করা।',
    ],
  },
];

export const PILGRIM_PACKING_LIST: PackingCategory[] = [
  {
    categoryNameEn: 'Essential Worship & Ihram Gear',
    categoryNameBn: 'ইহরাম ও ইবাদতের প্রয়োজনীয় সামগ্রী',
    items: [
      { id: 'p1', nameEn: '2 sets of unstitched Ihram towels (for men)', nameBn: '২ সেট সেলাইবিহীন সুতি ইহরামের চাদর ও লুঙ্গি (পুরুষদের)', noteEn: '100% breathable cotton is ideal', noteBn: '১০০% সুতি আরামদায়ক কাপড়' },
      { id: 'p2', nameEn: 'Ihram waist belt or security money pouch', nameBn: 'ইহরামের বেল্ট বা মানিব্যাগ বেল্ট', noteEn: 'To secure passport, cash, phone', noteBn: 'টাকা ও পাসপোর্ট নিরাপদে রাখার জন্য' },
      { id: 'p3', nameEn: 'Safety pins / clips for Ihram', nameBn: 'ইহরাম আটকানোর সেফটি পিন বা ক্লিপ', noteEn: 'Keeps upper sheet secure', noteBn: 'চাদর স্থির রাখার জন্য' },
      { id: 'p4', nameEn: 'Flip-flops / Slippers exposing top ankle bone', nameBn: 'গোড়ালি ও ওপরের পাতা খোলা স্যান্ডেল', noteEn: 'Required for men under Ihram rules', noteBn: 'পুরুষদের পায়ের পাতা খোলা স্যান্ডেল আবশ্যক' },
      { id: 'p5', nameEn: 'Pocket Prayer Mat & Digital Tasbeeh', nameBn: 'পকেট জায়নামাজ ও ডিজিটাল তাসবীহ', noteEn: 'Convenient during transit', noteBn: 'মুজদালিফা ও মিনায় ব্যবহারের জন্য' },
    ],
  },
  {
    categoryNameEn: 'Toiletries & Hygiene (Unscented Only)',
    categoryNameBn: 'সুগন্ধিহীন প্রসাধন ও স্বাস্থ্য সুরক্ষা',
    items: [
      { id: 'p6', nameEn: 'Unscented soap & shampoo', nameBn: 'সুগন্ধিহীন সাবান ও শ্যাম্পু', noteEn: 'Must be completely fragrance-free during Ihram', noteBn: 'ইহরাম অবস্থায় সুগন্ধি ব্যবহার নিষিদ্ধ' },
      { id: 'p7', nameEn: 'Petroleum Jelly / Vaseline', nameBn: 'ভেসলিন বা পেট্রোলিয়াম জেলি', noteEn: 'Crucial to prevent inner thigh chafing during Tawaf & Sa\'i', noteBn: 'হাঁটাহাঁটিতে রানের ঘষাঘষি ও জ্বালাপোড়া রোধে অত্যন্ত জরুরি' },
      { id: 'p8', nameEn: 'Unscented wet wipes & sanitizer', nameBn: 'সুগন্ধিহীন ওয়েট টিস্যু ও হ্যান্ড স্যানিটাইজার', noteEn: 'Fragrance-free formula', noteBn: 'সুগন্ধিমুক্ত টিস্যু' },
      { id: 'p9', nameEn: 'Miswak & toothbrush', nameBn: 'মেসওয়াক ও টুথব্রাশ', noteEn: 'Sunnah oral hygiene', noteBn: 'সুন্নতি মেসওয়াক' },
      { id: 'p10', nameEn: 'Small scissor / nail clipper (pack in check-in luggage!)', nameBn: 'ছোট কাঁচি ও নেইল কাটার (অবশ্যই ব্যাগেজে রাখবেন)', noteEn: 'For hair cutting after Sa\'i', noteBn: 'ওমরাহ শেষে চুল কাটার জন্য' },
    ],
  },
  {
    categoryNameEn: 'Health, Medical & Protection',
    categoryNameBn: 'ওষুধ ও ব্যক্তিগত সুরক্ষা',
    items: [
      { id: 'p11', nameEn: 'Oral Rehydration Salts (ORS saline)', nameBn: 'খাওয়ার স্যালাইন (ORS)', noteEn: 'Replenishes electrolytes in heat', noteBn: 'ডিহাইড্রেশন রোধে প্রতিদিন ১-২ প্যাকেট' },
      { id: 'p12', nameEn: 'Paracetamol, pain relievers & muscle spray', nameBn: 'প্যারাসিটামল ও ব্যথানাশক স্প্রে', noteEn: 'For foot and muscle aches', noteBn: 'পা ব্যথায় আরামের জন্য' },
      { id: 'p13', nameEn: 'Cold, cough & throat lozenges', nameBn: 'কাশি ও গলার ড্রপ / লজেন্স', noteEn: 'Common due to AC and crowds', noteBn: 'এসির ঠাণ্ডা ও ভিড়ে গলার খুসখুসের জন্য' },
      { id: 'p14', nameEn: 'Sun umbrella & sunglasses', nameBn: 'রোদ চশমা ও ছোট ছাতা', noteEn: 'Protection during midday heat', noteBn: 'তীব্র রোদ থেকে সুরক্ষায়' },
      { id: 'p15', nameEn: 'Prescribed personal medications with doctor\'s prescription', nameBn: 'ব্যক্তিগত নিয়মিত ওষুধ ও প্রেসক্রিপশন', noteEn: 'Keep 1-2 weeks extra supply', noteBn: 'ডায়াবেটিস বা প্রেশারের ওষুধ পর্যাপ্ত পরিমাণে' },
    ],
  },
  {
    categoryNameEn: 'Documents & Electronics',
    categoryNameBn: 'ডকুমেন্টস ও ইলেকট্রনিক্স',
    items: [
      { id: 'p16', nameEn: 'Passport, Saudi Visa & Vaccination Card photocopies', nameBn: 'পাসপোর্ট, ভিসা ও ভ্যাকসিনের ফটোকপি', noteEn: 'Keep physical & digital copies', noteBn: 'মোবাইলে ছবি ও প্রিন্ট কপি সঙ্গে রাখুন' },
      { id: 'p17', nameEn: 'Saudi SIM card / E-SIM & Nusuk App installed', nameBn: 'সৌদি সিমকার্ড ও নুসুক (Nusuk) অ্যাপ', noteEn: 'Required for Rawdah permits', noteBn: 'রওজা শরিফের পারমিটের জন্য নুসুক অ্যাপ আবশ্যক' },
      { id: 'p18', nameEn: 'Power Bank (10,000–20,000 mAh)', nameBn: 'পাওয়ার ব্যাংক', noteEn: 'For long days in Mina & Arafat', noteBn: 'মিনা ও আরাফাতের দিনে চার্জের জন্য' },
      { id: 'p19', nameEn: 'Hotel business card & wristband', nameBn: 'হোটেলের কার্ড ও হাত ব্যান্ড', noteEn: 'Never take off wristband', noteBn: 'পথ হারিয়ে গেলে হোটেলে ফেরার জন্য' },
    ],
  },
];

export const IHRAM_PROHIBITIONS: string[] = [
  'পুরুষদের জন্য কোনো ধরনের সেলাইযুক্ত কাপড় পরিধান করা (যেমন: শার্ট, প্যান্ট, আন্ডারওয়্যার, গেঞ্জি)।',
  'পুরুষদের জন্য মাথা ও চেহারা কোনো টুপি, পাগড়ি বা কাপড় দিয়ে ঢেকে রাখা।',
  'মহিলাদের জন্য নেকাব বা সরাসরি মুখের চামড়ায় স্পর্শ করা কাপড় দিয়ে মুখ ঢাকা এবং হাতমোজা (গ্লাভস) পরা।',
  'শরীরে, পোশাকে, চুলে বা দাড়িতে যেকোনো প্রকার সুবাস, আতর, সেন্ট বা সুগন্ধিযুক্ত সাবান ব্যবহার করা।',
  'নখ কাটা, চুল ছাঁটা বা শরীরের কোনো অংশের পশম উপড়ানো বা কাটা।',
  'স্ত্রী সহবাস করা, সহবাসের আলোচনা করা বা কোনো প্রকার অশ্লীল কাজ করা।',
  'কারও সাথে ঝগড়া-বিবাদ, গালিগালাজ বা অনর্থক তর্কবিতর্ক করা।',
  'কোনো বন্য প্রাণী শিকার করা, শিকারে সহায়তা করা বা গাছের তাজা ডালপালা ভাঙা।',
];

export const IHRAM_PROHIBITIONS_EN: string[] = [
  'For men: Wearing any form of tailored or stitched garments (such as shirts, trousers, underwear, stitched belts).',
  'For men: Covering the head or face with caps, turbans, hats, or fabric resting directly on the head.',
  'For women: Covering the face with a direct-touch niqab or wearing stitched gloves (can veil loosely without fabric touching the face).',
  'Applying any perfume, scented oil, scented soap, cologne, or scented lotion to the body or garments.',
  'Clipping nails, cutting or shaving hair from the head, beard, or any part of the body.',
  'Engaging in marital intimacy, erotic talk, or any indecent behavior.',
  'Quarreling, shouting, arguing, or committing any sinful misconduct.',
  'Hunting wild game, disturbing wildlife, or uprooting green trees in the sacred Haram sanctuary.',
];
