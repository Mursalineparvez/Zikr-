export interface JourneyDua {
  titleBn: string;
  titleEn: string;
  arabic: string;
  transliteration: string;
  meaningBn: string;
  meaningEn: string;
}

export interface JourneyStep {
  id: string;
  stepNumber: number;
  phaseBn: string;
  phaseEn: string;
  titleBn: string;
  titleEn: string;
  arabicTitle?: string;
  descriptionBn: string;
  descriptionEn: string;
  actionChecklistBn: string[];
  actionChecklistEn: string[];
  essentialDuas?: JourneyDua[];
  referenceAyat?: {
    surahAyatBn: string;
    surahAyatEn: string;
    arabic: string;
    translationBn: string;
    translationEn: string;
  };
  referenceHadith?: {
    sourceBn: string;
    sourceEn: string;
    arabic?: string;
    textBn: string;
    textEn: string;
  };
}

export const UMRAH_HOME_JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'u_step_1',
    stepNumber: 1,
    phaseBn: '১ম পর্যায়: বাসা থেকে ওমরাহ রওয়ানা',
    phaseEn: 'Phase 1: Leaving Home for Umrah',
    titleBn: 'বাসা থেকে বের হওয়ার প্রস্তুতি ও প্রস্থান দোয়া',
    titleEn: 'Preparation & Leaving Home for Umrah',
    arabicTitle: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ',
    descriptionBn: 'ওমরাহ সফরের উদ্দেশ্যে ঘর থেকে বের হওয়ার পূর্বে গোসল, ২ রাকাত নফল সালাত আদায় এবং আল্লাহর ওপর তাওয়াক্কুল করা।',
    descriptionEn: 'Take bath, pray 2 rak\'ahs nafl prayer, and leave home for Umrah trusting in Allah.',
    actionChecklistBn: [
      'পাসপোর্ট, ভিসা, ডলার বা সৌদি রিয়াল এবং টিকিট গুছিয়ে নিন।',
      'সফরের নিয়ত খাঁটি করুন (শুধুমাত্র আল্লাহ তাআলার সন্তুষ্টির জন্য)।',
      'ঘর থেকে বের হওয়ার সময় ২ রাকাত নফল সালাত আদায় করুন।',
      'প্রস্থানকালীন দোয়া পাঠ করুন: "বিসমিল্লাহি তাওয়াক্কালতু আলাল্লাহ..."'
    ],
    actionChecklistEn: [
      'Organize passport, visa, currency and flight tickets.',
      'Purify intention solely for Allah.',
      'Pray 2 rak\'ahs nafl prayer before leaving.',
      'Recite leaving home supplication.'
    ],
    essentialDuas: [
      {
        titleBn: 'ঘর থেকে বের হওয়ার দোয়া',
        titleEn: 'Dua for Leaving Home',
        arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
        transliteration: 'Bismillahi tawakkaltu \'alallahi, wa la hawla wa la quwwata illa billah',
        meaningBn: 'আল্লাহর নামে (বের হচ্ছি), আল্লাহর ওপর ভরসা করলাম। আর আল্লাহর সাহায্য ছাড়া কোনো উপায় বা শক্তি নেই।',
        meaningEn: 'In the name of Allah, I place my trust in Allah, and there is no power nor might except with Allah.',
      },
      {
        titleBn: 'যানবাহনে আরোহণের দোয়া',
        titleEn: 'Dua for Boarding Vehicle / Flight',
        arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
        transliteration: 'Subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrineen, wa inna ila Rabbina lamunqaliboon',
        meaningBn: 'পবিত্র সেই সত্তা যিনি এটিকে আমাদের বশীভূত করে দিয়েছেন, নতুবা আমরা একে বশীভূত করতে সক্ষম ছিলাম না। আর নিশ্চয়ই আমরা আমাদের রবের দিকেই ফিরে যাবো।',
        meaningEn: 'Glory to Him Who has subjected this to us, and we could never have accomplished it ourselves. And surely, to our Lord we shall return.',
      },
    ],
    referenceAyat: {
      surahAyatBn: 'সুরা আল-আনফাল: ০২',
      surahAyatEn: 'Surah Al-Anfal: 02',
      arabic: 'وَعَلَى اللَّهِ فَتَوَكَّلُوا إِنْ كُنتُمْ مُؤْمِنِينَ',
      translationBn: 'আর আল্লাহর ওপরই তোমরা ভরসা করো, যদি তোমরা মুমিন হয়ে থাকো।',
      translationEn: 'And upon Allah let them rely if you should be believers.',
    },
    referenceHadith: {
      sourceBn: 'সুনান আবু দাউদ ও তিরমিজি',
      sourceEn: 'Sunan Abu Dawud & Tirmidhi',
      arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ',
      textBn: 'রাসুলুল্লাহ ﷺ বলেছেন: যে ব্যক্তি ঘর থেকে বের হওয়ার সময় আল্লাহর ওপর ভরসা করে বের হয়, তাকে হেদায়েত করা হয় ও রক্ষা করা হয়।',
      textEn: 'The Prophet ﷺ said: Whoever leaves his house placing trust in Allah is guided and protected.',
    },
  },
  {
    id: 'u_step_2',
    stepNumber: 2,
    phaseBn: '২য় পর্যায়: বিমান ও মিকাত অতিক্রম',
    phaseEn: 'Phase 2: Flight & Miqat',
    titleBn: 'বিমানে মিকাত অতিক্রম এবং ইহরাম বাঁধা',
    titleEn: 'Miqat & Ihram on Flight',
    arabicTitle: 'إِحْرَامٌ وَمِيقَاتٌ',
    descriptionBn: 'বিমানে মিকাত (যেমন ইয়ালামলাম বা জুহফা) অতিক্রম করার আগেই ইহরামের কাপড় পরে নিয়ত করা ও তালবিয়াহ পড়া।',
    descriptionEn: 'Wear Ihram and make Niyyah before flight crosses the Miqat boundary.',
    actionChecklistBn: [
      'বিমানে ওঠার আগেই বা বিমান মিকাতে পৌঁছানোর পূর্বে গোসল বা ওজু সেরে নিন।',
      'পুরুষরা সেলাইবিহীন দুটি সাদা কাপড় এবং নারীরা শালীন পোশাক পরিধান করুন।',
      'ওমরাহর নিয়ত করুন এবং উচ্চস্বরে তালবিয়াহ পড়ুন।'
    ],
    actionChecklistEn: [
      'Perform ghusl or wudu before flight reaches Miqat.',
      'Men wear two seamless white sheets; women modest clothing.',
      'Make Niyyah for Umrah and recite Talbiyah.'
    ],
    essentialDuas: [
      {
        titleBn: 'ওমরাহর নিয়তের দোয়া',
        titleEn: 'Niyyah (Intention) for Umrah',
        arabic: 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً',
        transliteration: 'Labbayk Allahumma \'Umratan',
        meaningBn: 'হে আল্লাহ, আমি ওমরাহর উদ্দেশ্যে আপনার দরবারে হাজির হয়েছি।',
        meaningEn: 'Here I am O Allah, making Umrah.',
      },
      {
        titleBn: 'পবিত্র তালবিয়াহ',
        titleEn: 'The Sacred Talbiyah',
        arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
        transliteration: 'Labbayk Allahumma labbayk, labbayka la shareeka laka labbayk. Innal-hamda wan-ni\'mata laka wal-mulk, la shareeka lak.',
        meaningBn: 'আমি হাজির হে আল্লাহ, আমি হাজির। আপনার কোনো শরিক নেই, আমি হাজির। নিশ্চয়ই সমস্ত প্রশংসা, নেয়ামত এবং রাজত্ব আপনারই, আপনার কোনো শরিক নেই।',
        meaningEn: 'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise and blessings are Yours, and all sovereignty, You have no partner.',
      },
    ],
    referenceAyat: {
      surahAyatBn: 'সুরা আল-বাকারা: ১৯৬',
      surahAyatEn: 'Surah Al-Baqarah: 196',
      arabic: 'وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ',
      translationBn: 'আর তোমরা আল্লাহর উদ্দেশ্যে হজ ও ওমরাহ পরিপূর্ণ করো।',
      translationEn: 'And complete the Hajj and Umrah for Allah.',
    },
    referenceHadith: {
      sourceBn: 'সহিহ বুখারি ও মুসলিম',
      sourceEn: 'Sahih Bukhari & Muslim',
      textBn: 'রাসুলুল্লাহ ﷺ নির্ধারিত মিকাত স্থানগুলো থেকে ইহরাম বেঁধে ওমরাহ ও হজের সূচনা করতেন।',
      textEn: 'The Prophet ﷺ initiated Umrah and Hajj by donning Ihram from the designated Miqat stations.',
    },
  },
  {
    id: 'u_step_3',
    stepNumber: 3,
    phaseBn: '৩য় পর্যায়: মক্কায় প্রবেশ ও ওমরাহ সম্পাদন',
    phaseEn: 'Phase 3: Entering Makkah & Umrah Rituals',
    titleBn: 'কাবা তাওয়াফ, সাঈ ও চুল কাটা (হলক)',
    titleEn: 'Tawaf, Sa\'i & Halq',
    arabicTitle: 'الطَّوَافُ وَالسَّعْيُ وَالحَلْقُ',
    descriptionBn: 'মসজিদুল হারামে প্রবেশ করে ৭ চক্কর তাওয়াফ, ২ রাকাত নামাজ, যমযমের পানি পান, সাফা-মারওয়া সাঈ এবং মাথা মুণ্ডন করা।',
    descriptionEn: 'Perform 7 Tawaf circuits, 2 rak\'ahs prayer, drink Zamzam, Safa-Marwah Sa\'i, and Halq/Taqseer.',
    actionChecklistBn: [
      'ডান পা দিয়ে মসজিদুল হারামে প্রবেশ করুন এবং প্রবেশের দোয়া পড়ুন।',
      'কাবা শরিফ প্রথম দেখে দোয়া করুন এবং হাজরে আসওয়াদ থেকে ৭ চক্কর তাওয়াফ শুরু করুন।',
      'মাকামে ইবরাহিমের পেছনে ২ রাকাত সালাত আদায় করুন ও জমজমের পানি পান করুন।',
      'সাফা ও মারওয়ার মাঝে ৭টি ট্রিপ সাঈ সম্পন্ন করুন।',
      'মাথা মুণ্ডন (হলক) বা চুল ছেঁটে (তাকসির) ইহরাম থেকে মুক্ত হন।'
    ],
    actionChecklistEn: [
      'Enter Masjid al-Haram with right foot and recite entering dua.',
      'Begin 7 Tawaf circuits aligning with Hajar al-Aswad.',
      'Pray 2 rak\'ahs behind Maqam Ibrahim and drink Zamzam.',
      'Complete 7 trips of Sa\'i between Safa and Marwah.',
      'Shave or trim hair to exit Ihram.'
    ],
    essentialDuas: [
      {
        titleBn: 'মসজিদুল হারামে প্রবেশের দোয়া',
        titleEn: 'Dua Upon Entering Masjid al-Haram',
        arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
        transliteration: 'Allahumma-ftah li abwaba rahmatik',
        meaningBn: 'হে আল্লাহ, আমার জন্য আপনার রহমতের দরজাগুলো খুলে দিন।',
        meaningEn: 'O Allah, open for me the doors of Your mercy.',
      },
      {
        titleBn: 'কাবা শরিফ প্রথম দেখে দোয়া',
        titleEn: 'Dua Upon First Sighting the Kaaba',
        arabic: 'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً',
        transliteration: 'Allahumma zid hadhal-Bayta tashreefan wa ta\'deeman wa takreeman wa mahabah',
        meaningBn: 'হে আল্লাহ, আপনি এই ঘর (কাবা শরিফ)-এর মর্যাদা, সম্মান, বড়ত্ব ও গাম্ভীর্য আরও বাড়িয়ে দিন।',
        meaningEn: 'O Allah, increase this House in honor, esteem, respect, and awe.',
      },
      {
        titleBn: 'রুকনে ইয়ামানি থেকে হাজরে আসওয়াদ মাঝের দোয়া',
        titleEn: 'Dua Between Rukn Yamani & Hajar al-Aswad',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar',
        meaningBn: 'হে আমাদের রব, আমাদের দুনিয়াতে কল্যাণ দান করুন, আখেরাতেও কল্যাণ দান করুন এবং আমাদের জাহান্নামের আজাব থেকে রক্ষা করুন।',
        meaningEn: 'Our Lord, give us in this world that which is good and in the Hereafter that which is good, and save us from the punishment of the Fire.',
      },
      {
        titleBn: 'জমজমের পানি পানের দোয়া',
        titleEn: 'Dua Upon Drinking Zamzam Water',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ',
        transliteration: 'Allahumma inni as\'aluka \'ilman nafi\'an wa rizqan wasi\'an wa shifa\'an min kulli da\'',
        meaningBn: 'হে আল্লাহ, আমি আপনার কাছে উপকারী ইলম, প্রশস্ত রিজিক এবং সমস্ত রোগ থেকে শেফা প্রার্থনা করছি।',
        meaningEn: 'O Allah, I ask You for beneficial knowledge, abundant sustenance, and cure from every ailment.',
      },
      {
        titleBn: 'সাফা পাহাড়ে ওঠার দোয়া',
        titleEn: 'Dua Upon Ascending Mount Safa',
        arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ',
        transliteration: 'Innas-Safa wal-Marwata min sha\'a\'irillah, abda\'u bima bada\'allahu bih',
        meaningBn: 'নিশ্চয়ই সাফা ও মারওয়া আল্লাহর নিদর্শনসমূহের অন্তর্ভুক্ত। আল্লাহ যা দিয়ে শুরু করেছেন, আমিও তা দিয়ে শুরু করছি।',
        meaningEn: 'Verily Safa and Marwah are among the symbols of Allah. I begin with that with which Allah began.',
      },
    ],
    referenceAyat: {
      surahAyatBn: 'সুরা আল-হাজ্ব: ২৯',
      surahAyatEn: 'Surah Al-Hajj: 29',
      arabic: 'ثُمَّ لْيَقْضُوا تَفَثَهُمْ وَلْيُوفُوا نُذُورَهُمْ وَلْيَطَّوَّفُوا بِالْبَيْتِ الْعَتِيقِ',
      translationBn: 'অতঃপর তারা যেন তাদের ময়লা দূর করে, তাদের মানত পূর্ণ করে এবং প্রাচীন ঘরের তাওয়াফ করে।',
      translationEn: 'Then let them end their untidiness and fulfill their vows and perform Tawaf around the ancient House.',
    },
  },
  {
    id: 'u_step_4',
    stepNumber: 4,
    phaseBn: '৪র্থ পর্যায়: মদিনা যিয়ারত ও বাসায় ফেরা',
    phaseEn: 'Phase 4: Madinah Ziyarah & Return',
    titleBn: 'মদিনা যিয়ারত এবং বিদায়ী তাওয়াফ শেষে গৃহে প্রত্যাবর্তন',
    titleEn: 'Madinah Ziyarah & Return Home',
    arabicTitle: 'زِيَارَةُ المَدِينَةِ وَالرُّجُوعُ',
    descriptionBn: 'মদিনা মুনাওয়ারায় মসজিদে নববী ও রওজা মোবারক যিয়ারত এবং মক্কায় ফিরে বিদায়ী তাওয়াফ সম্পন্ন করে নিরাপদে নিজ বাসায় ফেরা।',
    descriptionEn: 'Visit Masjid an-Nabawi in Madinah, perform Farewell Tawaf in Makkah, and return safely home.',
    actionChecklistBn: [
      'মদিনায় গিয়ে মসজিদে নববীতে ৪০ ওয়াক্ত নামাজ আদায় ও রওজা মোবারকে সালাম দিন।',
      'মক্কায় ফিরে আসার পর মক্কা ত্যাগের পূর্বে ৭ চক্কর বিদায়ী তাওয়াফ (তাওয়াফে ওয়াদা) করুন।',
      'নিরাপদে নিজ বাসায় ফিরে আল্লাহর শুকরিয়া আদায় করুন।'
    ],
    actionChecklistEn: [
      'Visit Masjid an-Nabawi and present Salam at the Prophet\'s Rawdah.',
      'Perform 7 circuits of Farewell Tawaf before leaving Makkah.',
      'Return safely home and praise Almighty Allah.'
    ],
    essentialDuas: [
      {
        titleBn: 'রওজা মোবারকে রাসুলুল্লাহ ﷺ-কে সালামের বাক্য',
        titleEn: 'Salam to Prophet Muhammad ﷺ at Rawdah',
        arabic: 'السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
        transliteration: 'As-salamu \'alayka ya Rasoolallahi wa rahmatullahi wa barakatuh',
        meaningBn: 'আপনার ওপর শান্তি বর্ষিত হোক হে আল্লাহর রাসুল, এবং আল্লাহর রহমত ও বরকত নাজিল হোক।',
        meaningEn: 'Peace be upon you, O Messenger of Allah, and the mercy of Allah and His blessings.',
      },
      {
        titleBn: 'সফর থেকে বাসায় ফেরার দোয়া',
        titleEn: 'Dua Upon Returning Home From Journey',
        arabic: 'آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ',
        transliteration: 'A\'ibona ta\'ibona \'abidona li-Rabbina hamidon',
        meaningBn: 'আমরা প্রত্যাবর্তনকারী, তওবাকারী, ইবাদতকারী এবং আমাদের রবের প্রশংসাকারী।',
        meaningEn: 'We are those who return, repent, worship, and praise our Lord.',
      },
    ],
    referenceHadith: {
      sourceBn: 'সহিহ বুখারি ও মুসলিম',
      sourceEn: 'Sahih Bukhari & Muslim',
      textBn: 'রাসুলুল্লাহ ﷺ বলেছেন: কবুল ওমরাহর প্রতিদান জান্নাত ব্যতিরেকে অন্য কিছু নয়।',
      textEn: 'The Prophet ﷺ said: The reward for an accepted Umrah is nothing less than Paradise.',
    },
  },
];

export const HAJJ_HOME_JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'h_step_1',
    stepNumber: 1,
    phaseBn: '১ম পর্যায়: হজ প্রস্তুতি ও বাসা থেকে রওয়ানা',
    phaseEn: 'Phase 1: Hajj Preparation & Leaving Home',
    titleBn: 'হজের নিয়ত, গোসল ও ঘর থেকে প্রস্থান',
    titleEn: 'Hajj Niyyah & Leaving Home',
    arabicTitle: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ',
    descriptionBn: 'হজ সফরের উদ্দেশ্যে ঘর থেকে বের হওয়া, ২ রাকাত নফল নামাজ আদায় এবং তামাত্তু, ইফরাদ বা কিরান হজের নিয়ত করা।',
    descriptionEn: 'Prepare for Hajj journey, pray 2 rak\'ahs nafl, and make Niyyah for Hajj (Tamattu, Ifrad or Qiran).',
    actionChecklistBn: [
      'হজের ধরন (তামাত্তু ওমরাহসহ সবচেয়ে সহজ) নির্ধারণ করুন ও প্রস্তুতি নিন।',
      'পাসপোর্ট, মোয়াল্লেম পারমিট, তাঁবুর কোড এবং জরুরি ওষুধপত্র গুছিয়ে নিন।',
      'ঘর থেকে বের হওয়ার সময় ২ রাকাত নফল সালাত আদায় করে দোয়া করুন।'
    ],
    actionChecklistEn: [
      'Choose Hajj type (Tamattu is most common).',
      'Organize passport, permits, tent codes and medications.',
      'Pray 2 rak\'ahs nafl prayer before leaving home.'
    ],
    essentialDuas: [
      {
        titleBn: 'হজের নিয়তের দোয়া',
        titleEn: 'Intention (Niyyah) for Hajj',
        arabic: 'لَبَّيْكَ اللَّهُمَّ حَجًّا',
        transliteration: 'Labbayk Allahumma Hajjan',
        meaningBn: 'হে আল্লাহ, আমি হজের উদ্দেশ্যে আপনার দরবারে হাজির হয়েছি।',
        meaningEn: 'Here I am O Allah, making Hajj.',
      },
      {
        titleBn: 'পবিত্র তালবিয়াহ',
        titleEn: 'The Sacred Talbiyah for Hajj',
        arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ',
        transliteration: 'Labbayk Allahumma labbayk, labbayka la shareeka laka labbayk',
        meaningBn: 'আমি হাজির হে আল্লাহ, আমি হাজির। আপনার কোনো শরিক নেই, আমি হাজির।',
        meaningEn: 'Here I am, O Allah, here I am. You have no partner, here I am.',
      },
    ],
    referenceAyat: {
      surahAyatBn: 'সুরা আল-বাকারা: ১৯৭',
      surahAyatEn: 'Surah Al-Baqarah: 197',
      arabic: 'الْحَجُّ أَشْهُرٌ مَّعْلُومَاتٌ',
      translationBn: 'হজের মাসসমূহ নির্ধারিত।',
      translationEn: 'Hajj is [during] well-known months.',
    },
    referenceHadith: {
      sourceBn: 'সহিহ বুখারি',
      sourceEn: 'Sahih Bukhari',
      textBn: 'রাসুলুল্লাহ ﷺ বলেছেন: যে ব্যক্তি আল্লাহর উদ্দেশ্যে হজ করল এবং অশ্লীল ও গুনাহের কাজ থেকে বিরত থাকল, সে নবজাতক শিশুর মতো নিষ্পাপ হয়ে ফিরে এল।',
      textEn: 'The Prophet ﷺ said: Whoever performs Hajj for Allah and does not commit obscenity or transgression will return free from sins.',
    },
  },
  {
    id: 'h_step_2',
    stepNumber: 2,
    phaseBn: '২য় পর্যায়: ৮ই জিলহজ - মিনা তাঁবু',
    phaseEn: 'Phase 2: 8th Dhul Hijjah - Mina',
    titleBn: 'মিনা তাঁবুতে অবস্থান ও ৫ ওয়াক্ত সালাত',
    titleEn: 'Stay in Mina Tents',
    arabicTitle: 'يَوْمُ التَّرْوِيَةِ بِمِنَى',
    descriptionBn: '৮ই জিলহজ সকালে মক্কায় ইহরাম বেঁধে মিনার উদ্দেশ্যে রওয়ানা হওয়া এবং জোহর থেকে ফজর পর্যন্ত মিনার তাঁবুতে ৫ ওয়াক্ত সালাত কসর করে আদায় করা।',
    descriptionEn: 'On 8th Dhul Hijjah morning, enter Ihram and proceed to Mina tents. Pray 5 daily prayers (kasr).',
    actionChecklistBn: [
      'মক্কায় বা হোটেল থেকে ৮ই জিলহজ সকালেই মিনার তাঁবুতে চলে যান।',
      'মিনার তাঁবুতে জোহর, আসর, মাগরিব, এশা ও পরের দিন ফজর নামাজ আদায় করুন (কসর)।',
      'বেশি বেশি তালবিয়াহ, জিকির ও কুরআন তিলাওয়াত করুন।'
    ],
    actionChecklistEn: [
      'Move to Mina tents on the morning of 8th Dhul Hijjah.',
      'Pray Zuhr, Asr, Maghrib, Isha, and Fajr (shortened as Kasr).',
      'Engage in continuous Talbiyah and Quran recitation.'
    ],
    essentialDuas: [
      {
        titleBn: 'মিনায় অবস্থানকালের জিকির',
        titleEn: 'Dhikr While Staying in Mina',
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'La ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer',
        meaningBn: 'আল্লাহ ছাড়া কোনো উপাস্য নেই, তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব ও সমস্ত প্রশংসা একমাত্র তাঁরই এবং তিনি সবকিছুর ওপর সর্বশক্তিমান।',
        meaningEn: 'There is no god but Allah alone, Who has no partner. To Him belongs the sovereignty and praise, and He is over all things Omnipotent.',
      },
    ],
  },
  {
    id: 'h_step_3',
    stepNumber: 3,
    phaseBn: '৩য় পর্যায়: ৯ই জিলহজ - আরাফাত ও মুজদালিফা',
    phaseEn: 'Phase 3: 9th Dhul Hijjah - Arafah & Muzdalifah',
    titleBn: 'আরাফাতের ময়দানে অবস্থান ও মুজদালিফায় রাত্রিযাপন',
    titleEn: 'Wuquf in Arafah & Muzdalifah Night',
    arabicTitle: 'وُقُوفُ عَرَفَةَ وَالمُزْدَلِفَةُ',
    descriptionBn: '৯ই জিলহজ ফজর পড়ে আরাফাতের ময়দানে গমন, খুতবা শোনা, জোহর-আসর কসর করে পড়া এবং সূর্যাস্ত পর্যন্ত কান্নাকাটি করে দোয়া করা। এরপর মুজদালিফায় রাত কাটানো।',
    descriptionEn: 'Proceed to Arafah on 9th Dhul Hijjah, listen to Khutbah, pray Zuhr & Asr, supplicate until sunset, then stay overnight in Muzdalifah.',
    actionChecklistBn: [
      '৯ই জিলহজ জোহর থেকে সূর্যাস্ত পর্যন্ত আরাফাতের ময়দানে অবস্থান করুন (হজের মূল রোকন)।',
      'সূর্যাস্তের পর মুজদালিফার উদ্দেশ্যে রওয়ানা হোন এবং মাগরিব-এশা একসাথে আদায় করুন।',
      'মুজদালিফায় মুক্ত আকাশের নিচে রাত্রিযাপন করুন এবং জামারাতের কঙ্কর (৭০টি) সংগ্রহ করুন।'
    ],
    actionChecklistEn: [
      'Stand in Arafah from Zuhr until sunset (Core pillar of Hajj).',
      'Proceed to Muzdalifah after sunset and combine Maghrib & Isha.',
      'Spend night under open sky and collect 70 pebbles for Jamarat.'
    ],
    essentialDuas: [
      {
        titleBn: 'আরাফাতের দিনের সর্বশ্রেষ্ঠ দোয়া',
        titleEn: 'The Best Supplication on Day of Arafah',
        arabic: 'أَفْضَلُ الدُّعَاءِ دُعَاءُ يَوْمِ عَرَفَةَ: لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'La ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer',
        meaningBn: 'আরাফাতের দিনের সর্বশ্রেষ্ঠ দোয়া হলো: আল্লাহ ছাড়া কোনো উপাস্য নেই, তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব ও প্রশংসা একমাত্র তাঁরই এবং তিনি সবকিছুর ওপর ক্ষমতাশীল।',
        meaningEn: 'The best supplication is that on the Day of Arafah: There is no god but Allah alone, without partner.',
      },
    ],
    referenceHadith: {
      sourceBn: 'সুনান তিরমিজি',
      sourceEn: 'Sunan Tirmidhi',
      textBn: 'রাসুলুল্লাহ ﷺ বলেছেন: "আরাফাই হলো হজ।" (অর্থাৎ আরাফাতে উপস্থিতি ছাড়া হজ হয় না)।',
      textEn: 'The Prophet ﷺ said: "Hajj is Arafah."',
    },
  },
  {
    id: 'h_step_4',
    stepNumber: 4,
    phaseBn: '৪র্থ পর্যায়: ১০ই জিলহজ - বড় জামারাত ও কোরবানি',
    phaseEn: 'Phase 4: 10th Dhul Hijjah - Jamarat & Qurbani',
    titleBn: 'বড় শয়তানকে কংকর নিক্ষেপ, কোরবানি ও মাথা মুণ্ডন',
    titleEn: 'Rami, Qurbani & Halq',
    arabicTitle: 'رَمْيُ الجَمْرَةِ وَالهَدْيُ وَالحَلْقُ',
    descriptionBn: '১০ই জিলহজ সকালে বড় জামারাতে ৭টি কংকর মারা, কোরবানি সম্পন্ন করা, মাথা মুণ্ডন করে সাধারণ পোশাক পরা এবং মক্কায় গিয়ে তাওয়াফে ইফাদা করা।',
    descriptionEn: 'On 10th Dhul Hijjah, stone Jamrat al-Aqaba with 7 pebbles, perform Qurbani, shave head, and perform Tawaf al-Ifadah.',
    actionChecklistBn: [
      'বড় জামারাতে (জামরাতুল আকাবা) ৭টি কংকর নিক্ষেপ করুন।',
      'হাদি বা কোরবানি সম্পন্ন করুন (বর্তমানে ব্যাংকের মাধ্যমে কোরবানি নিশ্চিত করা হয়)।',
      'মাথা মুণ্ডন (হলক) বা চুল ছেঁটে সাধারণ পোশাক (হালাল হোন) পরে নিন।',
      'মক্কায় গিয়ে ৭ চক্কর তাওয়াফে ইফাদা ও সাফা-মারওয়া সাঈ সম্পন্ন করুন।'
    ],
    actionChecklistEn: [
      'Throw 7 pebbles at Jamrat al-Aqaba.',
      'Perform Qurbani (animal sacrifice).',
      'Shave or trim hair to exit partial Ihram.',
      'Go to Makkah to perform Tawaf al-Ifadah and Sa\'i.'
    ],
    essentialDuas: [
      {
        titleBn: 'জামারাতে কংকর নিক্ষেপের দোয়া',
        titleEn: 'Dua When Throwing Each Pebble at Jamarat',
        arabic: 'بِسْمِ اللَّهِ، اللَّهُ أَكْبَرُ',
        transliteration: 'Bismillahi, Allahu Akbar',
        meaningBn: 'আল্লাহর নামে, আল্লাহ সর্বশ্রেষ্ঠ।',
        meaningEn: 'In the name of Allah, Allah is the Greatest.',
      },
    ],
  },
  {
    id: 'h_step_5',
    stepNumber: 5,
    phaseBn: '৫ম পর্যায়: ১১-১৩ই জিলহজ - আইয়ামে তাশরিক ও বাসায় ফেরা',
    phaseEn: 'Phase 5: 11-13th Tashreeq & Return Home',
    titleBn: 'তিন জামারাতে কংকর নিক্ষেপ ও বিদায়ী তাওয়াফ শেষে ফেরা',
    titleEn: 'Tashreeq Days & Farewell Return',
    arabicTitle: 'أَيَّامُ التَّشْرِيقِ وَالرُّجُوعُ',
    descriptionBn: '১১, ১২ ও ১৩ই জিলহজ মিনায় অবস্থান করে প্রতিদিন দুপুর বা আসরের পর তিনটি জামারাতেই ৭টি করে ২১টি কংকর মারা, অতঃপর বিদায়ী তাওয়াফ করে নিরাপদে নিজ দেশে ফেরা।',
    descriptionEn: 'Stay in Mina on 11-13th Dhul Hijjah, stone all 3 Jamarat pillars daily, perform Farewell Tawaf, and return home.',
    actionChecklistBn: [
      '১১ ও ১২ই জিলহজ (বা ১৩ই পর্যন্ত) মিনায় তাঁবুতে অবস্থান করুন।',
      'প্রতিদিন ছোট, মধ্যম ও বড় জামারাতে ৭টি করে মোট ২১টি কংকর নিক্ষেপ করুন।',
      'মক্কা ত্যাগের পূর্বে ৭ চক্কর তাওয়াফে ওয়াদা (বিদায়ী তাওয়াফ) সম্পন্ন করুন।',
      'আল্লাহর শুকরিয়া আদায় করে নিরাপদে নিজ পরিবার ও বাসায় ফিরে আসুন।'
    ],
    actionChecklistEn: [
      'Stay in Mina tents on 11th and 12th (or 13th) Dhul Hijjah.',
      'Stone all three Jamarat pillars daily with 21 pebbles.',
      'Perform Farewell Tawaf before departing Makkah.',
      'Return safely home with immense gratitude to Allah.'
    ],
    essentialDuas: [
      {
        titleBn: 'বিদায়ী দোয়া ও শুকরিয়া',
        titleEn: 'Farewell Supplication & Gratitude',
        arabic: 'اللَّهُمَّ لَا تَجْعَلْ هَذَا آخِرَ العَهْدِ مِنْ بَيْتِكَ الحَرَامِ',
        transliteration: 'Allahumma la taj\'al hadha akhiral-\'ahdi min Baytikal-Haram',
        meaningBn: 'হে আল্লাহ, আপনি এই সফরকে আমার আপনার পবিত্র ঘরের (কাবা শরিফ) শেষ সাক্ষাত বা সফর বানাবেন না।',
        meaningEn: 'O Allah, do not make this the last visit to Your Sacred House.',
      },
    ],
    referenceHadith: {
      sourceBn: 'সহিহ বুখারি ও মুসলিম',
      sourceEn: 'Sahih Bukhari & Muslim',
      textBn: 'রাসুলুল্লাহ ﷺ বলেছেন: কবুল হজের একমাত্র প্রতিদান হলো জান্নাত।',
      textEn: 'The Prophet ﷺ said: There is no reward for an accepted Hajj except Paradise.',
    },
  },
];
