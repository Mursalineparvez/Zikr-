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
  essentialDuas?: Array<{
    titleBn: string;
    titleEn: string;
    arabic: string;
    transliteration: string;
    meaningBn: string;
    meaningEn: string;
  }>;
}

export const UMRAH_STEPS: HajjStepItem[] = [
  {
    id: 'umrah_1_ihram',
    dayOrStageBn: 'ধাপ ১',
    dayOrStageEn: 'Step 1',
    titleBn: 'ইহরাম পরিধান ও নিয়ত',
    titleEn: 'Wearing Ihram & Making Niyyah',
    arabicTitle: 'الإحرام والنية',
    summaryBn: 'মিকাত অতিক্রম করার পূর্বেই গোসল/ওজু করে ইহরামের কাপড় পরিধান ও ওমরাহর নিয়ত করতে হবে।',
    summaryEn: 'Perform purification bath (Ghusl/Wudu), put on the Ihram garments, and make intention for Umrah before crossing the designated Miqat boundary.',
    actionItems: [
      'নখ কাটা, গোঁফ ছাঁটা ও শরীরের পরিচ্ছন্নতা সম্পন্ন করে উত্তমরূপে গোসল করা',
      'পুরুষদের জন্য সেলাইবিহীন দুটি সাদা কাপড় পরিধান করা (চাদর ও লুঙ্গি); নারীদের জন্য সাধারণ শালীন পোশাক',
      '২ রাকাত ইহরামের নফল নামাজ আদায় করা (প্রথম রাকাতে কাফিরুন ও ২য় রাকাতে ইখলাস)',
      'ওমরাহর নিয়ত করা: "আল্লাহুম্মা ইন্নি উরিদুল ওমরাতা ফা-ইয়াসসিরহা লি ওয়া তাক্বাব্বালহা মিন্নি"',
      'উচ্চৈঃস্বরে তালবিয়াহ পাঠ শুরু করা',
    ],
    actionItemsEn: [
      'Clip nails, trim mustache, perform personal grooming, and take a full Sunnah bath (Ghusl).',
      'Men wear two unstitched white sheets (Izar & Rida); women wear modest, regular Islamic clothing without facial veil touching the face.',
      'Pray 2 Rak\'ahs Sunnah prayer for Ihram (reciting Surah Al-Kafirun and Surah Al-Ikhlas).',
      'Make intention: "Allahumma innee ureedul-\'Umrata fa-yassirhaa lee wa taqabbalhaa minnee" (O Allah, I intend to perform Umrah, make it easy for me and accept it).',
      'Begin reciting the Talbiyah aloud (men aloud, women softly).',
    ],
    essentialDuas: [
      {
        titleBn: 'তালবিয়াহ (Talbiyah)',
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
    titleBn: 'কাবা শরিফ তাওয়াফ (৭ চক্কর)',
    titleEn: 'Tawaf of the Ka\'bah (7 Circuits)',
    arabicTitle: 'طواف الكعبة المشرفة',
    summaryBn: 'পবিত্র কাবা গৃহকে বামে রেখে হাজরে আসওয়াদ থেকে শুরু করে ৭ চক্কর প্রদক্ষিণ করা।',
    summaryEn: 'Circumambulate the Holy Ka\'bah 7 complete circuits counter-clockwise, starting and ending at the Black Stone (Hajar al-Aswad).',
    actionItems: [
      'মসজিদুল হারামে ডান পা দিয়ে প্রবেশ করে দোয়া পাঠ করা',
      'পুরুষদের জন্য ইজতিবা করা (ডান কাঁধ খোলা রাখা)',
      'হাজরে আসওয়াদ বরাবর দাঁড়িয়ে "বিসমিল্লাহি আল্লাহু আকবার" বলে ইস্তিলাম করা (চুম্বন/হাত দিয়ে ইশারা)',
      'প্রথম ৩ চক্করে রমল করা (পুরুষদের বীরদর্পে দ্রুত পদক্ষেপে চলা) ও বাকি ৪ চক্কর স্বাভাবিক হাঁটা',
      'রুকনে ইয়ামানি অতিক্রমের সময় "রাব্বানা আতিনা ফিদ্দুনিয়া হাসানাহ..." পাঠ করা',
      '৭ চক্কর শেষে মাকামে ইবরাহিমে ২ রাকাত তাওয়াফের ওয়াজিব নামাজ আদায় করা',
      'মনভরে জমজম পানি পান করা ও মাথায় দেওয়া',
    ],
    actionItemsEn: [
      'Enter Masjid al-Haram with the right foot reciting the mosque entrance supplication.',
      'Men perform Idtiba (uncovering the right shoulder by placing the upper sheet under the right armpit).',
      'Align with the Black Stone line, say "Bismillahi Allahu Akbar" and perform Istilam (touch/kiss or raise right hand in its direction).',
      'Men perform Raml (brisk walking with short, energetic steps) during the first 3 circuits, walking normally for the remaining 4.',
      'Between the Yemeni Corner (Rukn al-Yamani) and the Black Stone, recite "Rabbana atina fid-dunya hasanatan..."',
      'After completing 7 circuits, cover right shoulder and pray 2 Rak\'ahs behind Maqam Ibrahim (or anywhere in the Haram).',
      'Drink Zamzam water abundantly to full satisfaction and make heartfelt dua.',
    ],
    essentialDuas: [
      {
        titleBn: 'রুকনে ইয়ামানি ও হাজরে আসওয়াদের মধ্যবর্তী দোয়া',
        titleEn: 'Dua between Rukn Yamani and Hajar al-Aswad',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina \'adhaban-nar',
        meaningBn: 'হে আমাদের পালনকর্তা! আমাদের দুনিয়াতে কল্যাণ দান করো, আখেরাতেও কল্যাণ দান করো এবং জাহান্নামের আগুন থেকে রক্ষা করো।',
        meaningEn: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
      },
    ],
  },
  {
    id: 'umrah_3_sai',
    dayOrStageBn: 'ধাপ ৩',
    dayOrStageEn: 'Step 3',
    titleBn: 'সাফা ও মারওয়া পাহাড়ে সাঈ (৭ বার)',
    titleEn: 'Sa\'i between Safa & Marwah (7 Laps)',
    arabicTitle: 'السعي بين الصفا والمروة',
    summaryBn: 'সাফা পাহাড় থেকে শুরু করে মারওয়া পাহাড়ে গিয়ে শেষ—এভাবে মোট ৭ বার আসা-যাওয়া করা।',
    summaryEn: 'Walk briskly between the hills of Mount Safa and Mount Marwah for 7 laps in emulation of Hajar (RA), starting at Safa and ending at Marwah.',
    actionItems: [
      'সাফা পাহাড়ে উঠে কাবার দিকে মুখ করে হাত তুলে তকবির ও দোয়া করা',
      'সাফা থেকে মারওয়ার দিকে রওনা হওয়া (সবুজ বাতি চিহ্নিত স্থানে পুরুষদের একটু দ্রুত দৌড়ানো)',
      'মারওয়ায় পৌঁছালে ১ চক্কর সম্পন্ন হয়; সেখানে দাঁড়িয়ে দোয়া করা',
      'মারওয়া থেকে সাফায় ফিরে আসলে ২য় চক্কর; এভাবে সাফা থেকে মারওয়ায় গিয়ে ৭ম চক্করে সাঈ সমাপ্ত করা',
    ],
    actionItemsEn: [
      'Ascend Mount Safa, face the Qiblah, raise hands, recite Takbir, Tahleel, and supplicate with sincere invocations.',
      'Walk toward Mount Marwah. Men run moderately between the two green light markers.',
      'Reaching Marwah completes lap 1; face the Ka\'bah and make personal supplications.',
      'Walking from Marwah back to Safa completes lap 2; complete 7 laps ending at Marwah.',
    ],
  },
  {
    id: 'umrah_4_halq',
    dayOrStageBn: 'ধাপ ৪',
    dayOrStageEn: 'Step 4',
    titleBn: 'হলক বা কসর (মাথা মুণ্ডন / চুল ছাঁটা)',
    titleEn: 'Halq or Taqsir (Shaving / Trimming Hair)',
    arabicTitle: 'الحلق أو التقصير',
    summaryBn: 'পুরুষদের জন্য মাথা মুণ্ডন করা (উত্তম) অথবা সমানভাবে চুল ছোট করা। নারীরা চুলের অগ্রভাগ থেকে ১ আঙুল পরিমাণ কাটবেন।',
    summaryEn: 'Men shave their head completely (Halq - highly recommended) or clip hair evenly (Taqsir). Women trim one fingertip-length from the ends of their hair.',
    actionItems: [
      'চুল কাটার মাধ্যমে ওমরাহ সম্পূর্ণ হবে এবং ইহরামের যাবতীয় নিষেধাজ্ঞা শেষ হবে।',
      'শোকরানা হিসেবে আল্লাহর দরবারে দোয়া ও শুকরিয়া আদায় করা।',
    ],
    actionItemsEn: [
      'Shaving or clipping the hair formally concludes Umrah and releases all Ihram prohibitions.',
      'Offer praise and heartfelt thanksgiving to Allah for granting the completion of the pilgrimage.',
    ],
  },
];

export const HAJJ_DAYS_GUIDE: HajjStepItem[] = [
  {
    id: 'hajj_day_1',
    dayOrStageBn: '৮ই জিলহজ',
    dayOrStageEn: '8th Dhul Hijjah',
    titleBn: 'তারবিয়া দিবস (মিনায় যাত্রা)',
    titleEn: 'Day of Tarwiyah (Departure to Mina)',
    arabicTitle: 'يوم التروية - منى',
    summaryBn: 'মক্কা থেকে ইহরাম বেঁধে মিনায় রওয়ানা হওয়া এবং সেখানে জোহর, আসর, মাগরিব, এশা ও পরের দিনের ফজর আদায় করা।',
    summaryEn: 'Put on Ihram from Makkah, depart for the tent city of Mina before Dhuhr, and perform Dhuhr, Asr, Maghrib, Isha, and Fajr of next morning shortened (Qasr).',
    actionItems: [
      'গোসল করে ইহরাম পরিধান ও হজের নিয়ত করা',
      '৮ই জিলহজ জোহরের পূর্বেই মিনায় পৌঁছানো সুন্নত',
      'মিনায় ৫ ওয়াক্ত নামাজ স্ব-স্ব ওয়াক্তে কসর করে আদায় করা',
      'রাত মিনায় অবস্থান করা সুন্নত',
    ],
    actionItemsEn: [
      'Perform Ghusl, put on Ihram, and make intention (Niyyah) for Hajj.',
      'Arrive in Mina before Dhuhr prayer according to the Sunnah.',
      'Offer Dhuhr, Asr, Maghrib, Isha, and Fajr prayers at their designated times shortened to 2 rak\'ahs for 4-rak\'ah prayers.',
      'Spend the entire night in Mina in worship, repentance, and remembrance.',
    ],
  },
  {
    id: 'hajj_day_2_arafat',
    dayOrStageBn: '৯ই জিলহজ',
    dayOrStageEn: '9th Dhul Hijjah',
    titleBn: 'আরাফাহ দিবস ও মুজদালিফায় রাত্রিযাপন (হজের মূল স্তম্ভ)',
    titleEn: 'Day of Arafah & Night at Muzdalifah (Core Pillar)',
    arabicTitle: 'يوم عرفة ومزدلفة',
    summaryBn: '৯ই জিলহজ সূর্যোদয়ের পর আরাফাতের ময়দানে গমন। জোহর ও আসর এক আজানে একসাথে আদায় করা এবং সূর্যাস্ত পর্যন্ত কান্নাকাটি করে দোয়া করা।',
    summaryEn: 'Stand on the plains of Arafah from midday until sunset in deep supplication, combining Dhuhr and Asr, then proceed after sunset to Muzdalifah for the night.',
    actionItems: [
      'আরাফাতের ময়দানে অবস্থান হজের প্রধান ফরজ (আল-হাজ্জু আরাফাহ)',
      'সূর্যাস্তের পর নামাজ না পড়ে মুজদালিফার উদ্দেশ্যে রওয়ানা হওয়া',
      'মুজদালিফায় পৌঁছে এক সাথে মাগরিব ও এশার নামাজ আদায় করা',
      'মুজদালিফার খোলা ময়দানে রাত কাটানো ওয়াজিব',
      'পরবর্তী দিনগুলোর জন্য মুজদালিফা থেকে ৭০টি ছোট কঙ্কর সংগ্রহ করা',
    ],
    actionItemsEn: [
      'Standing at Arafah (Wuquf) is the absolute supreme pillar of Hajj ("Al-Hajju Arafah").',
      'Combine and shorten Dhuhr and Asr prayers behind the Imam at Masjid Namirah or in tents.',
      'Dedicate the afternoon until sunset entirely to earnest repentance and supplication.',
      'After sunset, leave for Muzdalifah without praying Maghrib in Arafah.',
      'Combine Maghrib (3 rak\'ahs) and Isha (2 rak\'ahs) together upon reaching Muzdalifah.',
      'Spend the night resting under the open sky and collect 49-70 small pebbles for stoning.',
    ],
    essentialDuas: [
      {
        titleBn: 'আরাফাহ দিবসের সর্বশ্রেষ্ঠ দোয়া',
        titleEn: 'The Best Supplication for Day of Arafah',
        arabic: 'لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'La ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu, wa huwa \'ala kulli shay\'in qadeer',
        meaningBn: 'একমাত্র আল্লাহ ছাড়া কোনো মাবুদ নেই, তাঁর কোনো শরিক নেই। রাজত্ব এবং সকল প্রশংসা একমাত্র তাঁরই এবং তিনি সবকিছুর ওপর ক্ষমতাবান।',
        meaningEn: 'There is no true deity worthy of worship except Allah alone without partner; to Him belongs sovereignty and praise, and He has power over all things.',
      },
    ],
  },
  {
    id: 'hajj_day_3_nahr',
    dayOrStageBn: '১০ই জিলহজ',
    dayOrStageEn: '10th Dhul Hijjah',
    titleBn: 'কুরবানির দিন (রমি, দবিহ, হলক ও তাওয়াফে জিয়ারত)',
    titleEn: 'Day of Nahr (Stoning, Sacrifice, Shaving & Tawaf Ziyarah)',
    arabicTitle: 'يوم النحر - جمرة العقبة',
    summaryBn: 'হজের সবচেয়ে ব্যস্ততম ও বরকতময় দিন—ধারাবাহিকভাবে ৪টি প্রধান আমল সম্পন্ন করা।',
    summaryEn: 'The busiest day of Hajj: Stone the Great Jamarah (Jamarah al-Aqabah), sacrifice an animal, shave/cut hair (first release), and perform Tawaf al-Ifadah in Makkah.',
    actionItems: [
      '১. মুজদালিফা থেকে মিনায় এসে বড় জামারায় (জমরাতুল আক্বাবাহ) ৭টি কঙ্কর নিক্ষেপ করা',
      '২. দমে শোকর বা হজের পশু কুরবানি সম্পন্ন করা',
      '৩. মাথা মুণ্ডন (হলক) বা চুল ছোট করা (এর মাধ্যমে ইহরামের প্রথম তাহাল্লুল হবে)',
      '৪. মক্কায় গিয়ে কাবার তাওয়াফে জিয়ারত (ফরজ) ও হজের সাঈ সম্পন্ন করা',
    ],
    actionItemsEn: [
      '1. Return to Mina from Muzdalifah after Fajr and stone the Big Pillar (Jamarat al-Aqabah) with 7 pebbles saying "Allahu Akbar" with each throw.',
      '2. Slaughter the sacrificial animal (Hady) for pilgrims performing Tamattu or Qiran.',
      '3. Shave or trim the hair (Halq/Taqsir) granting Tahallul al-Asghar (all prohibitions lifted except marital intimacy).',
      '4. Travel to Makkah to perform Tawaf al-Ifadah (Obligatory) and Sa\'i of Hajj.',
    ],
  },
  {
    id: 'hajj_day_4_5_tashreeq',
    dayOrStageBn: '১১, ১২ ও ১৩ই জিলহজ',
    dayOrStageEn: '11th - 13th Dhul Hijjah',
    titleBn: 'আইয়ামে তাশরিক (কঙ্কর নিক্ষেপ ও বিদায়ী তাওয়াফ)',
    titleEn: 'Days of Tashreeq (Stoning 3 Jamarat & Farewell Tawaf)',
    arabicTitle: 'أيام التشريق وطواف الوداع',
    summaryBn: 'মিনায় অবস্থান এবং প্রতিদিন দুপুরে ছোট, মধ্যম ও বড় জামারায় ৭টি করে মোট ২১টি কঙ্কর নিক্ষেপ করা।',
    summaryEn: 'Stay in Mina and stone all 3 Jamarat (Small, Middle, Big with 7 pebbles each = 21 daily) after midday (Zawal), followed by Farewell Tawaf before departure.',
    actionItems: [
      '১১ই জিলহজ জোহরের পর ছোট, মেজ ও বড় জামারায় ৭+৭+৭ = ২১টি পাথর মারা',
      '১২ই জিলহজ একইভাবে ২১টি পাথর মারা (এরপর চাইলে মক্কায় ফেরা যায়)',
      '১৩ই জিলহজ থাকলে একইভাবে পাথর নিক্ষেপ করা উত্তম',
      'মক্কা ত্যাগ করার পূর্বে বিদায়ী তাওয়াফ (তাওয়াফে বিদা) সম্পন্ন করা (ওয়াজিব)',
    ],
    actionItemsEn: [
      'On 11th Dhul Hijjah after midday (Zawal), stone all 3 pillars sequentially: Small (7), Middle (7), and Big (7) = 21 pebbles total.',
      'On 12th Dhul Hijjah, stone all 3 pillars with 21 pebbles in the same sequence (pilgrims may depart Mina before sunset).',
      'If remaining for 13th Dhul Hijjah, perform the same 21-pebble stoning after Zawal.',
      'Perform Tawaf al-Wada (Farewell Tawaf) as the very final act before departing Makkah.',
    ],
  },
];

export const IHRAM_PROHIBITIONS_BN = [
  'পুরুষদের জন্য সেলাইযুক্ত পোশাক (প্যান্ট, শার্ট, গেঞ্জি ইত্যাদি) ও জুতা পরিধান করা যা গোড়ালি ঢেকে ফেলে',
  'মাথা বা মুখমণ্ডল কাপড় দিয়ে ঢাকা (পুরুষদের মাথা ও নারীদের মুখ)',
  'সুগন্ধি, আতর, সুবাসিত সাবান বা তেল ব্যবহার করা',
  'নখ কাটা, চুল বা শরীরের কোনো পশম উপড়ানো বা কাটা',
  'স্থলচর প্রাণী শিকার করা বা শিকারে সহযোগিতা করা',
  'স্ত্রী সহবাস, চুম্বন বা কামোদ্দীপক কথাবার্তা ও আচরণ',
  'ঝগড়া-বিবাদ, গালিগালাজ বা কোনো পাপ কাজে লিপ্ত হওয়া',
];

export const IHRAM_PROHIBITIONS_EN = [
  'Wearing stitched tailored clothing (pants, shirts, underwear, socks) or footwear covering the ankles (for men)',
  'Covering the head (for men) or covering the face with direct touching veil (for women)',
  'Using perfumes, scented soaps, scented oils, or colognes on body or clothes',
  'Cutting nails, shaving, trimming, or plucking hair from any part of the body',
  'Hunting wild land animals or assisting in hunting',
  'Sexual intercourse, kissing, or provocative speech/intimacy',
  'Arguing, cursing, quarreling, or engaging in abusive behavior',
];

export const IHRAM_PROHIBITIONS = IHRAM_PROHIBITIONS_BN;
