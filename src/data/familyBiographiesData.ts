export interface FamilyMemberBio {
  nameBn: string;
  nameEn?: string;
  nameAr?: string;
  relationTitleBn: string; // e.g. "পিতা (হযরত আবু বকর সিদ্দিক রা.)"
  relationTitleEn?: string;
  roleTitleBn: string; // e.g. "সাহাবি / সাহাবিয়া / তাবেয়ী"
  roleTitleEn?: string;
  birthAndDeathBn?: string;
  birthAndDeathEn?: string;
  biographyBn: string;
  biographyEn?: string;
  keyContributionsBn: string[];
  keyContributionsEn?: string[];
  hadithOrSirahRefBn?: string;
  hadithOrSirahRefEn?: string;
}

export const FAMILY_MEMBER_BIOGRAPHIES: Record<string, FamilyMemberBio> = {
  // ১. আবু বকর সিদ্দিক (রা.)-এর পরিবার
  "আবু কুহাফা": {
    nameBn: "হযরত আবু কুহাফা (উসমান ইবনে আমীর)",
    nameEn: "Hadrat Abu Quhafah (Uthman ibn Amir)",
    nameAr: "أبو قحافة عثمان بن عامر",
    relationTitleBn: "পিতা: হযরত আবু বকর সিদ্দিক (রা.)",
    relationTitleEn: "Father of Hadrat Abu Bakr As-Siddiq (RA)",
    roleTitleBn: "প্রবীণ সাহাবি (রা.)",
    roleTitleEn: "Senior Companion (Sahabi RA)",
    birthAndDeathBn: "ওফাত: ১৪ হিজরি (৯৭ বছর বয়সে, মক্কা)",
    birthAndDeathEn: "Passed away: 14 AH (at age 97, Makkah)",
    biographyBn: "হযরত আবু কুহাফা (রা.) ছিলেন ইসলামের প্রথম খলিফা হযরত আবু বকর সিদ্দিক (রা.)-এর পিতা। মক্কা বিজয়ের ঐতিহাসিক দিনে ৮ হিজরিতে অতি বৃদ্ধ বয়সে রাসুলুল্লাহ (সা.)-এর দরবারে উপস্থিত হয়ে সানন্দে ইসলাম গ্রহণ করেন। তাঁর চুল ও দাড়ি ছিল সম্পূর্ণ শুভ্র। রাসুল (সা.) তাঁর প্রতি গভীর শ্রদ্ধা জ্ঞাপন করেন এবং তাঁর দাড়ি সুগন্ধি ও রঙ দ্বারা রঞ্জিত করার নির্দেশ দেন। ইতিহাসে তিনিই প্রথম পিতা যিনি নিজ পুত্রের খিলাফতকাল প্রত্যক্ষ করেন।",
    biographyEn: "Hadrat Abu Quhafah (RA) was the father of the first Caliph of Islam, Hadrat Abu Bakr As-Siddiq (RA). On the historic day of the Conquest of Makkah in 8 AH, he embraced Islam in his advanced old age before Rasulullah (SAW). His hair and beard had turned completely white; the Prophet (SAW) showed him deep honor and advised dyeing his beard. In Islamic history, he was the first father to witness his own son's Caliphate.",
    keyContributionsBn: [
      "মক্কা বিজয়ের দিন রাসুলুল্লাহ (সা.)-এর হাতে বায়আত গ্রহণ করে বায়আতে ইসলামের মর্যাদা লাভ।",
      "হযরত আবু বকর সিদ্দিক (রা.)-এর ওফাতের খবর শুনে ধৈর্য ধারণ ও বায়তুল মালের অবশিষ্ট সম্পদ সুচারুভাবে হস্তান্তরে সমর্থন।",
      "ইসলামি ইতিহাসে প্রথম পিতাসাহাবি যিনি খলিফা পুত্রের খিলাফত প্রত্যক্ষ করেছিলেন।"
    ],
    keyContributionsEn: [
      "Pledged allegiance to Rasulullah (SAW) on the Day of the Conquest of Makkah.",
      "Demonstrated steadfast patience upon Hadrat Abu Bakr's passing and oversaw the rightful return of Bayt al-Mal trusts.",
      "First Companion father in Islamic history to witness his son serving as Caliph."
    ],
    hadithOrSirahRefBn: "সহিহ মুসলিম (হাদিস: ২১৫৮), আল-ইসাবাহ ফি তাময়ীযিস সাহাবাহ (ইবনে হাজার আসকালানী)",
    hadithOrSirahRefEn: "Sahih Muslim (Hadith 2158), Al-Isabah fi Tamyiz al-Sahabah (Ibn Hajar al-Asqalani)"
  },

  "উম্মুল খায়ের সালমা": {
    nameBn: "উম্মুল খায়ের সালমা বিনতে সাখর",
    nameEn: "Umm al-Khayr Salma bint Sakhr",
    nameAr: "أم الخير سلمى بنت صخر",
    relationTitleBn: "মাতা: হযরত আবু বকর সিদ্দিক (রা.)",
    relationTitleEn: "Mother of Hadrat Abu Bakr As-Siddiq (RA)",
    roleTitleBn: "প্রাথমিক যুগের মহীয়সী নারী সাহাবিয়া (রা.)",
    roleTitleEn: "Noble Early Female Companion (Sahabiyah RA)",
    birthAndDeathBn: "ওফাত: মদিনা মানাওয়ারা",
    birthAndDeathEn: "Passed away: Madinah al-Munawwarah",
    biographyBn: "উম্মুল খায়ের সালমা বিনতে সাখর (রা.) ছিলেন ইসলামের সূচনা পর্বের প্রথম সারির নারী সাহাবিয়া। মক্কায় কাফেরদের নির্যাতনের সূচনা পর্বে হযরত আবু বকর (রা.) কাফেরদের হাতে নির্মম আঘাতপ্রাপ্ত হওয়ার পর সুস্থ হয়েই প্রথম বায়না ধরেন যে তাঁর মাতাকে নিয়ে রাসুল (সা.)-এর কাছে যাবেন। আরকাম (রা.)-এর ঘরে উপস্থিত হলে রাসুলুল্লাহ (সা.)-এর দোয়ার বরকতে তিনি সানন্দে কালিমা পাঠ করে ইসলাম গ্রহণ করেন।",
    biographyEn: "Umm al-Khayr Salma bint Sakhr (RA) was among the earliest female Companions of Islam. During the early Makkan persecutions, when Hadrat Abu Bakr (RA) recovered from severe assault by the Quraysh, his very first wish was to bring his mother to Rasulullah (SAW) at Dar al-Arqam, where through the Prophet's du'a she joyfully recited the Shahadah and accepted Islam.",
    keyContributionsBn: [
      "দারুল আরকামে রাসুলুল্লাহ (সা.)-এর কদমে উপস্থিত হয়ে প্রারম্ভিক মক্কী যুগে ইসলাম গ্রহণ।",
      "হযরত আবু বকর (রা.)-এর দ্বীনি দাওয়াতে সর্বাত্মক সমর্থন ও মদিনায় হিজরত।"
    ],
    keyContributionsEn: [
      "Embraced Islam early in Makkah at Dar al-Arqam before Rasulullah (SAW).",
      "Supported Hadrat Abu Bakr's mission steadfastly and migrated to Madinah."
    ],
    hadithOrSirahRefBn: "সীরাতে ইবনে হিশাম, হায়াতুস সাহাবাহ (মাওলানা ইউসুফ কান্ধলবী রহ.)",
    hadithOrSirahRefEn: "Sirat Ibn Hisham, Hayatus Sahabah (Maulana Yusuf Kandhlawi)"
  },

  "উম্মে রুমান": {
    nameBn: "উম্মে রুমান বিনতে আমীর",
    nameEn: "Umm Ruman bint Amir",
    nameAr: "أم رومان بنت عامر",
    relationTitleBn: "সহধর্মিণী: হযরত আবু বকর (রা.) | মাতা: হযরত আয়িশা (রা.) ও আবদুর রহমান (রা.)",
    relationTitleEn: "Wife of Hadrat Abu Bakr (RA) | Mother of Aishah (RA) & Abdur Rahman (RA)",
    roleTitleBn: "মহীয়সী সাহাবিয়া ও রাসুল (সা.)-এর শাশুড়ি (রা.)",
    roleTitleEn: "Noble Companion & Mother-in-law of the Prophet (SAW)",
    birthAndDeathBn: "ওফাত: ৬ হিজরি (মদিনা মানাওয়ারা)",
    birthAndDeathEn: "Passed away: 6 AH (Madinah al-Munawwarah)",
    biographyBn: "উম্মে রুমান বিনতে আমীর (রা.) ছিলেন হযরত আবু বকর সিদ্দিক (রা.)-এর প্রখ্যাত স্ত্রী এবং উম্মুল মুমিনীন হযরত আয়িশা সিদ্দিকা (রা.) ও হযরত আবদুর রহমান (রা.)-এর সম্মানিত মাতা। মক্কায় ইসলামের সূচনা লগ্নেই তিনি স্বামীর সাথে ইসলাম গ্রহণ করেন এবং মদিনায় হিজরত করেন। ইফকের (অপবাদের) কঠিন পরীক্ষার দিনে তিনি কন্যা আয়িশা (রা.)-কে বুকে জড়িয়ে ধৈর্যের এক অভূতপূর্ব দৃষ্টান্ত স্থাপন করেন। তাঁর ওফাতের পর স্বয়ং রাসুলুল্লাহ (সা.) কবরে নেমে তাঁর দাফন সম্পন্ন করেন।",
    biographyEn: "Umm Ruman bint Amir (RA) was the esteemed wife of Hadrat Abu Bakr As-Siddiq (RA) and mother of Umm al-Mu'minin Aishah (RA) and Abdur Rahman (RA). She embraced Islam early in Makkah alongside her husband and migrated to Madinah. During the difficult trial of Ifk, she comforted her daughter with extraordinary patience. Upon her passing, Rasulullah (SAW) personally descended into her grave for her burial.",
    keyContributionsBn: [
      "মক্কার ভয়াবহ নির্যাতনের দিনে রাসুল (সা.) ও আবু বকরের দ্বীনি কার্যক্রমে আশ্রয় ও সহায়তা।",
      "উম্মুল মুমিনীন হযরত আয়িশা সিদ্দিকা (রা.)-কে উত্তম শিষ্টাচার ও দ্বীনি শিক্ষা দান।",
      "রাসুলুল্লাহ (সা.) স্বহস্তে তাঁর দাফন কার্যে অংশগ্রহণ করে জান্নাতী নারী হিসেবে আখ্যায়িত করেন।"
    ],
    keyContributionsEn: [
      "Provided refuge and support to the Prophet's mission during harsh Makkan trials.",
      "Raised Umm al-Mu'minin Aishah (RA) with exemplary Islamic etiquette and learning.",
      "Honored by Rasulullah (SAW) personally participating in her burial."
    ],
    hadithOrSirahRefBn: "সহিহ বুখারি (হাদিস: ৩৮৯৪), সহিহ মুসলিম",
    hadithOrSirahRefEn: "Sahih al-Bukhari (Hadith 3894), Sahih Muslim"
  },

  "আসমা বিনতে উমাইস": {
    nameBn: "হযরত আসমা বিনতে উমাইস (রা.)",
    nameEn: "Hadrat Asma bint Umays (RA)",
    nameAr: "أسماء بنت عميس",
    relationTitleBn: "সহধর্মিণী: হযরত জাফর তাইয়ার (রা.), হযরত আবু বকর (রা.) ও পরবর্তীতে হযরত আলী (রা.)",
    relationTitleEn: "Wife of Ja'far at-Tayyar (RA), Abu Bakr (RA), & later Ali (RA)",
    roleTitleBn: "দুই হিজরতের অধিকারিনী প্রজ্ঞাবান সাহাবিয়া (রা.)",
    roleTitleEn: "Wise Companion of the Two Migrations (RA)",
    birthAndDeathBn: "ওফাত: ৪০ হিজরি (মদিনা)",
    birthAndDeathEn: "Passed away: 40 AH (Madinah)",
    biographyBn: "হযরত আসমা বিনতে উমাইস (রা.) ছিলেন সীরাতের ইতিহাসের অন্যতম মহীয়সী ও প্রজ্ঞাবান নারী সাহাবিয়া। তিনি হাবশায় প্রথম হিজরতকারীদের অন্তর্ভুক্ত ছিলেন এবং পরবর্তীতে মদিনায় হিজরত করেন, যার কারণে তাঁকে 'ছাহিবাতুল হিজরাতাইনি' (দুই হিজরতের অধিকারিনী) বলা হয়। হযরত জাফর ইবনে আবি তালিবের শাহাদাতের পর আবু বকর সিদ্দিক (রা.)-কে বিবাহ করেন এবং আবু বকরের ওফাতের পর হযরত আলী (রা.)-কে বিবাহ করেন। হযরত আবু বকর (রা.)-এর গোসল ও দাফনের অসিয়ত তিনিই সুসম্পন্ন করেছিলেন।",
    biographyEn: "Hadrat Asma bint Umays (RA) was one of the wisest female Companions in Islamic history. She participated in both the migration to Abyssinia and later to Madinah, earning the honorific 'Sahibat al-Hijratayn' (Companion of Two Migrations). After Ja'far's martyrdom, she married Abu Bakr (RA), and following his passing—where she fulfilled his will by performing his ghusl—she married Ali (RA).",
    keyContributionsBn: [
      "হাবশা ও মদিনায় জোড়া হিজরতের দুর্লভ গৌরব অর্জন।",
      "হযরত আবু বকর (রা.)-এর ওফাতকালে তাঁর ওসিয়ত মোতাবেক গোসল সম্পাদন।",
      "সাহাবি ও তাবেয়ীদের মধ্যে হাদিস ও ফিকহের প্রামাণিক শিক্ষক।"
    ],
    keyContributionsEn: [
      "Achieved the rare honor of migrating to both Abyssinia and Madinah.",
      "Fulfilled Hadrat Abu Bakr's final testament by performing his funeral washing.",
      "Authentic teacher of Hadith and Fiqh among Companions and Tabi'un."
    ],
    hadithOrSirahRefBn: "সহিহ বুখারি, সিযারু আ'লামিন নুবালা (ইমাম যাহাবী)",
    hadithOrSirahRefEn: "Sahih al-Bukhari, Siyar A'lam al-Nubala (Imam adh-Dhahabi)"
  },

  "কুতাইলা বিনতে আবদ": {
    nameBn: "কুতাইলা বিনতে আবদ আল-উজ্জা",
    nameEn: "Qutaylah bint Abd al-Uzza",
    nameAr: "قتيلة بنت عبد العزى",
    relationTitleBn: "সহধর্মিণী: হযরত আবু বকর (রা.) | মাতা: হযরত আসমা (রা.) ও আবদুল্লাহ (রা.)",
    relationTitleEn: "Former Wife of Abu Bakr (RA) | Mother of Asma (RA) & Abdullah (RA)",
    roleTitleBn: "হযরত আসমা যাতুন নিতাকাইনের সম্মানিত মাতা",
    roleTitleEn: "Mother of Hadrat Asma Dhat an-Nitaqayn (RA)",
    biographyBn: "কুতাইলা বিনতে আবদ আল-উজ্জা ছিলেন হযরত আবু বকর সিদ্দিক (রা.)-এর মক্কী জীবনের প্রথমাংশের স্ত্রী এবং হযরত আসমা বিনতে আবি বকর (রা.) ও হযরত আবদুল্লাহ ইবনে আবি বকর (রা.)-এর মাতা। ইসলাম গ্রহণের পর মক্কায় পৃথক হয়ে গেলেও তিনি কন্যা আসমার প্রতি স্নেহশীল ছিলেন। মদিনায় তিনি কন্যা আসমার নিকট উপহার নিয়ে এলে রাসুলুল্লাহ (সা.) আসমা (রা.)-কে মাতার সেবা করার অনুমতি দেন।",
    biographyEn: "Qutaylah bint Abd al-Uzza was Hadrat Abu Bakr's wife during his pre-Islamic Makkan period and mother of Asma bint Abi Bakr (RA) and Abdullah ibn Abi Bakr (RA). When she visited her daughter in Madinah bringing gifts, Rasulullah (SAW) instructed Asma (RA) to maintain family ties and treat her mother kindly.",
    keyContributionsBn: [
      "যাতুন নিতাকাইন হযরত আসমা (রা.) ও বীর সাহাবি আবদুল্লাহ (রা.)-এর জন্মদাত্রী মাতা।"
    ],
    keyContributionsEn: [
      "Mother of Dhat an-Nitaqayn Hadrat Asma (RA) and the brave Companion Abdullah (RA)."
    ],
    hadithOrSirahRefBn: "সহিহ বুখারি (হাদিস: ৩১৮৩)",
    hadithOrSirahRefEn: "Sahih al-Bukhari (Hadith 3183)"
  },

  "হাবিবাহ বিনতে খারেজাহ": {
    nameBn: "হাবিবাহ বিনতে খারেজাতুল আনসারিয়া",
    nameEn: "Habibah bint Kharijah al-Ansariyyah",
    nameAr: "حبيبة بنت خارجة الأنصارية",
    relationTitleBn: "সহধর্মিণী: হযরত আবু বকর (রা.) | মাতা: উম্মে কুলসুম বিনতে আবি বকর",
    relationTitleEn: "Wife of Hadrat Abu Bakr (RA) | Mother of Umm Kulthum bint Abi Bakr",
    roleTitleBn: "আনসার বংশীয় সাহাবিয়া (রা.)",
    roleTitleEn: "Ansari Companion (Sahabiyah RA)",
    biographyBn: "হাবিবাহ বিনতে খারেজাহ (রা.) ছিলেন মদিনার বিখ্যাত আনসার সাহাবি খারেজা ইবনে যায়িদ (রা.)-এর কন্যা। হযরত আবু বকর সিদ্দিক (রা.) মদিনায় আসার পর সানন্দে তাঁকে বিবাহ করেন। আবু বকর (রা.)-এর ওফাতকালে তিনি অন্তর্বর্তী গর্ভবতী ছিলেন এবং পরবর্তীতে তাঁর গর্ভে উম্মে কুলসুম বিনতে আবি বকর জন্মগ্রহণ করেন।",
    biographyEn: "Habibah bint Kharijah (RA) was the daughter of the prominent Madinan Ansari Companion Kharijah ibn Zayd (RA). Hadrat Abu Bakr As-Siddiq (RA) married her after migrating to Madinah. She was expecting at the time of Abu Bakr's passing, giving birth posthumously to Umm Kulthum bint Abi Bakr.",
    keyContributionsBn: [
      "মদিনায় মুহাজির ও আনসার সম্পর্কের এক আত্মিক মেলবন্ধন রচনা।",
      "হযরত আবু বকর সিদ্দিক (রা.)-এর শেষ জীবনের বিশ্বস্ত সঙ্গিনী।"
    ],
    keyContributionsEn: [
      "Embodied the spiritual bond between the Muhajirun and Ansar in Madinah.",
      "Devoted companion to Hadrat Abu Bakr As-Siddiq (RA) in his final years."
    ],
    hadithOrSirahRefBn: "মুয়াত্তা ইমাম মালিক, তারিখে তাবারী",
    hadithOrSirahRefEn: "Muwatta Imam Malik, Tarikh al-Tabari"
  },

  "আবদুল্লাহ ইবনে আবি বকর": {
    nameBn: "হযরত আবদুল্লাহ ইবনে আবি বকর (রা.)",
    nameEn: "Hadrat Abdullah ibn Abi Bakr (RA)",
    nameAr: "عبد الله بن أبي بكر",
    relationTitleBn: "পুত্র: হযরত আবু বকর সিদ্দিক (রা.) | ভাই: উম্মুল মুমিনীন আয়িশা (রা.)",
    relationTitleEn: "Son of Abu Bakr (RA) | Brother of Umm al-Mu'minin Aishah (RA)",
    roleTitleBn: "হিজরতের বীর গোয়েন্দা ও শহীদ সাহাবি (রা.)",
    roleTitleEn: "Heroic Scout of the Hijrah & Martyr Companion (RA)",
    birthAndDeathBn: "শাহাদাত: ১১ হিজরি (তায়েফ যুদ্ধে পাওয়া তিরের আঘাতে)",
    birthAndDeathEn: "Martyrdom: 11 AH (from arrow wounds sustained at Ta'if)",
    biographyBn: "হযরত আবদুল্লাহ ইবনে আবি বকর (রা.) ছিলেন অত্যন্ত চটপটে, প্রজ্ঞাবান ও সাহসী সাহাবি। রাসুলুল্লাহ (সা.) ও আবু বকর (রা.) যখন সাওর গুহায় আত্মগোপন করেছিলেন, আবদুল্লাহ সারা দিন মক্কায় ঘুরে কাফেরদের সমস্ত ষড়যন্ত্র ও গোপন খবরাখবর রাতে গুহায় গিয়ে পৌঁছে দিতেন। পরবর্তীতে তায়েফ যুদ্ধে কাফেরদের বিষাক্ত তিরে মারাত্মক আহত হন এবং রাসুল (সা.)-এর ওফাতের পরপরই শাহাদাত বরণ করেন।",
    biographyEn: "Hadrat Abdullah ibn Abi Bakr (RA) was a perceptive and courageous Companion. During the Hijrah when Rasulullah (SAW) and Abu Bakr (RA) sheltered in Cave Thawr, Abdullah spent his days in Makkah gathering intelligence on Quraysh plots and delivered nightly updates to the cave. Later gravely wounded by a poisoned arrow at the Siege of Ta'if, he attained martyrdom shortly after the Prophet's passing.",
    keyContributionsBn: [
      "গার-এ সাওর-এ রাসুল (সা.) ও আবু বকরের জন্য জীবনের ঝুঁকি নিয়ে রাতের আঁধারে তথ্য সরবরাহ।",
      "হুনাইন ও তায়েফ যুদ্ধে অসামান্য বীরত্ব প্রদর্শন ও শাহাদাত বরণ।"
    ],
    keyContributionsEn: [
      "Risked his life nightly delivering crucial Quraysh intelligence to Cave Thawr during the Hijrah.",
      "Demonstrated extraordinary valor at Hunayn and Ta'if, attaining martyrdom."
    ],
    hadithOrSirahRefBn: "সহিহ বুখারি (হাদিস: ৩৯০৫), সীরাতে ইবনে হিশাম",
    hadithOrSirahRefEn: "Sahih al-Bukhari (Hadith 3905), Sirat Ibn Hisham"
  },

  "মুহাম্মদ ইবনে আবি বকর": {
    nameBn: "মুহাম্মদ ইবনে আবি বকর (রহ.)",
    nameEn: "Muhammad ibn Abi Bakr (RH)",
    nameAr: "محمد بن أبي بكر",
    relationTitleBn: "কনিষ্ঠ পুত্র: হযরত আবু বকর (রা.) ও আসমা বিনতে উমাইস",
    relationTitleEn: "Youngest Son of Abu Bakr (RA) & Asma bint Umays",
    roleTitleBn: "বিশিষ্ট সাহাবি/তাবেয়ী ও মিশরের গভর্নর",
    roleTitleEn: "Prominent Figure & Governor of Egypt",
    birthAndDeathBn: "জন্ম: ১০ হিজরি (বিদায় হজ্জের সময়) | ওফাত: ৩৮ হিজরি (মিশর)",
    birthAndDeathEn: "Born: 10 AH (during Farewell Hajj) | Passed away: 38 AH (Egypt)",
    biographyBn: "মুহাম্মদ ইবনে আবি বকর বিদায় হজ্জের সফরে জন্ম গ্রহণ করেন। আবু বকর (রা.)-এর ওফাতের পর হযরত আলী (রা.) আসমা বিনতে উমাইসকে বিবাহ করলে আলী (রা.)-এর ঘরেই স্নেহে লালিত-পালিত হন। আলী (রা.) তাঁকে অত্যন্ত ভালোবাসতেন এবং পরবর্তীতে মিশরের গভর্নর নিযুক্ত করেন। তিনি বীরত্ব ও প্রজ্ঞার জন্য সীরাতে প্রসিদ্ধ।",
    biographyEn: "Muhammad ibn Abi Bakr was born during the Farewell Pilgrimage in 10 AH. Following Abu Bakr's passing, he was raised in the household of Hadrat Ali (RA), who loved him deeply and later appointed him Governor of Egypt.",
    keyContributionsBn: [
      "হযরত আলী (রা.)-এর সুযোগ্য গভর্নর হিসেবে মিশরের শাসনভার পরিচালনা।"
    ],
    keyContributionsEn: [
      "Served as Governor of Egypt under Caliph Hadrat Ali (RA)."
    ],
    hadithOrSirahRefBn: "তারিখে তাবারী, আল-বিদায়া ওয়ান নিহায়া",
    hadithOrSirahRefEn: "Tarikh al-Tabari, Al-Bidayah wan-Nihayah"
  },

  "উম্মে কুলসুম বিনতে আবি বকর": {
    nameBn: "উম্মে কুলসুম বিনতে আবি বকর",
    nameEn: "Umm Kulthum bint Abi Bakr",
    nameAr: "أم كلثوم بنت أبي بكر",
    relationTitleBn: "কন্যা: হযরত আবু বকর (রা.) | স্ত্রী: হযরত তালহা ইবনে উবাইদুল্লাহ (রা.)",
    relationTitleEn: "Daughter of Abu Bakr (RA) | Wife of Talhah ibn Ubaydillah (RA)",
    roleTitleBn: "বিশিষ্ট তাবেয়ী ও মদিনার ইলমি ব্যক্তিত্ব",
    roleTitleEn: "Eminent Tabi'iyyah & Scholar of Madinah",
    biographyBn: "উম্মে কুলসুম ছিলেন হযরত আবু বকর সিদ্দিক (রা.)-এর ওফাতের পর জন্মগ্রহণকারী কনিষ্ঠা কন্যা। বোন হযরত আয়িশা সিদ্দিকা (রা.)-এর তত্ত্বাবধানে মদিনায় ইলম ও ফিকহ শিক্ষায় বড় হন। তিনি প্রখ্যাত আশারায়ে মুবাশশারাহ সাহাবি হযরত তালহা ইবনে উবাইদুল্লাহ (রা.)-কে বিবাহ করেন।",
    biographyEn: "Umm Kulthum was born after the passing of her father Hadrat Abu Bakr As-Siddiq (RA). Raised under the loving tutelage of her sister Umm al-Mu'minin Aishah (RA) in Madinah, she grew in knowledge and married the renowned Asharah Mubashsharah Companion Talhah ibn Ubaydillah (RA).",
    keyContributionsBn: [
      "উম্মুল মুমিনীন আয়িশা (রা.)-এর কাছ থেকে হাদিস ও সীরাতের শিক্ষা লাভ করে মহিলাদের মধ্যে প্রচার।"
    ],
    keyContributionsEn: [
      "Transmitted Hadith and sacred knowledge learned from Aishah (RA) among women of Madinah."
    ],
    hadithOrSirahRefBn: "মুয়াত্তা ইমাম মালিক, কিতাবুত তাবাকাত আল-কুবরা",
    hadithOrSirahRefEn: "Muwatta Imam Malik, Kitab al-Tabaqat al-Kubra"
  },

  "ইমাম আল-কাসিম": {
    nameBn: "ইমাম আল-কাসিম ইবনে মুহাম্মদ ইবনে আবি বকর (রহ.)",
    nameEn: "Imam al-Qasim ibn Muhammad ibn Abi Bakr (RH)",
    nameAr: "القاسم بن محمد بن أبي بكر",
    relationTitleBn: "পৌত্র: হযরত আবু বকর সিদ্দিক (রা.)",
    relationTitleEn: "Grandson of Hadrat Abu Bakr As-Siddiq (RA)",
    roleTitleBn: "মদিনার বিখ্যাত সাত ফকিহের (ফুকারায়ে সাবআ) অন্যতম প্রধান ইমাম",
    roleTitleEn: "One of the Seven Great Jurists (Fuqaha al-Sab'ah) of Madinah",
    birthAndDeathBn: "ওফাত: ১০৭ হিজরি",
    birthAndDeathEn: "Passed away: 107 AH",
    biographyBn: "ইমাম আল-কাসিম ছিলেন হযরত আবু বকর সিদ্দিক (রা.)-এর আপন নাতি এবং উম্মুল মুমিনীন হযরত আয়িশা (রা.)-এর প্রিয় ভাতিজা ও ছাত্র। মদিনায়ে মনোওয়ারার সচ্ছল ফকিহগণের মধ্যে তিনি ছিলেন সর্বোচ্চ স্তরের তাবেয়ী ও মুহাদ্দিস। ইমাম মালিক (রহ.) তাঁর ইলম ও তাকওয়ার ভূয়সী প্রশংসা করতেন।",
    biographyEn: "Imam al-Qasim was the grandson of Hadrat Abu Bakr As-Siddiq (RA) and a devoted nephew and student of Umm al-Mu'minin Aishah (RA). He stood among the foremost Tabi'un scholars of Madinah, praised highly by Imam Malik (RH) for his deep learning and piety.",
    keyContributionsBn: [
      "মদিনার 'সাত ফকিহ'-এর অন্যতম শীর্ষ ইমাম হিসেবে ইসলামি ফিকহ ও হাদিস প্রবর্তন।",
      "উম্মুল মুমিনীন আয়িশা (রা.)-এর বিশুদ্ধ হাদিসসমূহ উম্মাহর কাছে পৌঁছানো।"
    ],
    keyContributionsEn: [
      "Foremost among the Seven Jurists of Madinah in preserving Fiqh and Sunnah.",
      "Transmitted authentic narrations of Umm al-Mu'minin Aishah (RA) to the Ummah."
    ],
    hadithOrSirahRefBn: "সিয়ারু আ'লামিন নুবালা (ইমাম যাহাবী)",
    hadithOrSirahRefEn: "Siyar A'lam al-Nubala (Imam adh-Dhahabi)"
  },

  // ২. উসমান ও আলীর পরিবার
  "আফফান ইবনে আবিল আস": {
    nameBn: "আফফান ইবনে আবিল আস",
    nameEn: "Affan ibn Abi al-As",
    nameAr: "عفان بن أبي العاص",
    relationTitleBn: "পিতা: হযরত উসমান ইবনে আফফান (রা.)",
    relationTitleEn: "Father of Hadrat Uthman ibn Affan (RA)",
    roleTitleBn: "কুরাইশ বংশীয় অভিজাত ব্যক্তিত্ব",
    roleTitleEn: "Noble Quraysh Notable",
    biographyBn: "আফফান ইবনে আবিল আস ছিলেন কুরাইশ বংশের বনু উমাইয়া শাখার সম্মানিত ধনকুবের ব্যবসায়ী এবং হযরত উসমান ইবনে আফফান (রা.)-এর পিতা। তিনি প্রাক-ইসলামি যুগে কুরাইশ সদ্বংশে ব্যবসায়ে প্রসিদ্ধি লাভ করেন।",
    biographyEn: "Affan ibn Abi al-As was a respected merchant of Banu Umayyah of Quraysh and the father of the third Caliph, Hadrat Uthman ibn Affan (RA).",
    keyContributionsBn: [
      "হযরত উসমান ইবনে আফফান (রা.)-এর মতো মহান দানবীর খলিফার পিতা।"
    ],
    keyContributionsEn: [
      "Father of the famously generous third Caliph, Hadrat Uthman ibn Affan (RA)."
    ],
    hadithOrSirahRefBn: "আল-ইসাবাহ, সীরাতে ইবনে হিশাম",
    hadithOrSirahRefEn: "Al-Isabah, Sirat Ibn Hisham"
  },

  "আরওয়া বিনতে কুরাইয": {
    nameBn: "আরওয়া বিনতে কুরাইয (রা.)",
    nameEn: "Arwa bint Kurayz (RA)",
    nameAr: "أروى بنت كريب",
    relationTitleBn: "মাতা: হযরত উসমান ইবনে আফফান (রা.) | ভাগিনী: রাসুলুল্লাহ (সা.)",
    relationTitleEn: "Mother of Hadrat Uthman (RA) | Cousin of Rasulullah (SAW)",
    roleTitleBn: "ইসলাম গ্রহণকারী মহীয়সী সাহাবিয়া (রা.)",
    roleTitleEn: "Noble Female Companion (Sahabiyah RA)",
    biographyBn: "আরওয়া বিনতে কুরাইয (রা.) ছিলেন রাসুলুল্লাহ (সা.)-এর আপন ফুফু উমাইমা বিনতে আব্দুল মুত্তালিবের কন্যা এবং হযরত উসমান (রা.)-এর সম্মানিত মাতা। তিনি পুত্র উসমানের অসিলায় মদিনায় হিজরত করেন এবং প্রবীণ বয়সে সানন্দে ইসলাম গ্রহণ করেন। হযরত উসমানের খেলাফতকালে তিনি মদিনায় ইন্তেকাল করেন।",
    biographyEn: "Arwa bint Kurayz (RA) was the daughter of Rasulullah's paternal aunt Umaymah bint Abd al-Muttalib and the mother of Hadrat Uthman ibn Affan (RA). She embraced Islam and migrated to Madinah, passing away there during Hadrat Uthman's caliphate.",
    keyContributionsBn: [
      "রাসুলুল্লাহ (সা.)-এর ফুফাতো বোন এবং তৃতীয় খলিফা উসমান (রা.)-এর জন্মদাত্রী মাতা হিসেবে ইসলাম গ্রহণ।"
    ],
    keyContributionsEn: [
      "Maternal cousin of Rasulullah (SAW) and honored mother of Caliph Uthman (RA)."
    ],
    hadithOrSirahRefBn: "আল-ইসাবাহ ফি তাময়ীযিস সাহাবাহ",
    hadithOrSirahRefEn: "Al-Isabah fi Tamyiz al-Sahabah"
  },

  "আবু তালিব": {
    nameBn: "আবু তালিব (আব্দ মানাফ ইবনে আব্দুল মুত্তালিব)",
    nameEn: "Abu Talib (Abd Manaf ibn Abd al-Muttalib)",
    nameAr: "أبو طالب بن عبد المطلب",
    relationTitleBn: "পিতা: হযরত আলী ইবনে আবি তালিব (রা.) | চাচা: রাসুলুল্লাহ (সা.)",
    relationTitleEn: "Father of Ali ibn Abi Talib (RA) | Uncle of Rasulullah (SAW)",
    roleTitleBn: "কুরাইশ সর্দার ও রাসুলুল্লাহ (সা.)-এর অভিভাবক",
    roleTitleEn: "Chieftain of Quraysh & Guardian of Rasulullah (SAW)",
    birthAndDeathBn: "ওফাত: নবুওয়াতের ১০ম বর্ষ (আমুল হুজুন / শোকের বছর)",
    birthAndDeathEn: "Passed away: 10th Year of Prophethood (Year of Sorrow)",
    biographyBn: "আবু তালিব ছিলেন রাসুলুল্লাহ (সা.)-এর পিতৃতুল্য আপন চাচা এবং কুরাইশ বংশের প্রধান সর্দার। আব্দুল মুত্তালিবের ওফাতের পর ৮ বছর বয়স থেকে মুহাম্মদ (সা.)-কে তিনি নিজ সন্তানের চেয়ে বেশি পরম স্নেহে লালন-পালন করেন। নবুওয়াতের পর মক্কার সমস্ত কাফের একজোট হলেও আবু তালিব শিয়াবে আবি তালিবে ৩ বছর বন্দি থেকে জীবন বাজি রেখে রাসুল (সা.)-কে পাহারা দেন।",
    biographyEn: "Abu Talib was the paternal uncle of Rasulullah (SAW) and leader of Banu Hashim. Following Abd al-Muttalib's death when Muhammad (SAW) was eight, Abu Talib raised and cherished him above his own children. After Prophethood began, he stood firmly by the Prophet, enduring three years of siege in Shi'b Abi Talib to protect him from the hostility of Quraysh.",
    keyContributionsBn: [
      "মক্কায় রাসুলুল্লাহ (সা.)-এর ওপর কাফেরদের অত্যাচার প্রতিহত করতে নিজের প্রভাব ও জীবন বাজি রেখে অবিচল সুরক্ষা প্রদান।"
    ],
    keyContributionsEn: [
      "Used his tribal standing and risked everything in Makkah to shield Rasulullah (SAW) from Quraysh persecution."
    ],
    hadithOrSirahRefBn: "সহিহ বুখারি (হাদিস: ৩৮৮৩), সীরাতে ইবনে হিশাম",
    hadithOrSirahRefEn: "Sahih al-Bukhari (Hadith 3883), Sirat Ibn Hisham"
  },

  "ফাতিমা বিনতে আসাদ": {
    nameBn: "হযরত ফাতিমা বিনতে আসাদ (রা.)",
    nameEn: "Hadrat Fatimah bint Asad (RA)",
    nameAr: "فاطمة بنت أسد",
    relationTitleBn: "মাতা: হযরত আলী (রা.) ও হযরত জাফর (রা.) | চাচি: রাসুলুল্লাহ (সা.)",
    relationTitleEn: "Mother of Ali (RA) & Ja'far (RA) | Aunt of Rasulullah (SAW)",
    roleTitleBn: "মক্কার সূচনা যুগের সর্বজনশ্রদ্ধেয় প্রবীণ সাহাবিয়া (রা.)",
    roleTitleEn: "Revered Early Companion (Sahabiyah RA)",
    birthAndDeathBn: "ওফাত: ৪ হিজরি (মদিনা মানাওয়ারা)",
    birthAndDeathEn: "Passed away: 4 AH (Madinah al-Munawwarah)",
    biographyBn: "হযরত ফাতিমা বিনতে আসাদ (রা.) ছিলেন হযরত আলী (রা.) ও জাফর তাইয়ার (রা.)-এর সম্মানিত মাতা। শৈশবে এতিম রাসুলুল্লাহ (সা.)-কে নিজ সন্তানের মতো কোলে-পিঠে আগলে রেখে খাবার খাইয়েছেন। রাসুল (সা.) বলতেন: \"আবু তালিবের পর এই মহিলার চেয়ে বেশি আমার প্রতি কেউ দয়া করেনি!\" তাঁর ইন্তেকালে রাসুলুল্লাহ (সা.) নিজের জামা মোবারক দিয়ে তাঁর কাফন পরান এবং কবরে শুয়ে জান্নাতের প্রসারতার জন্য আকুল দোয়া করেন।",
    biographyEn: "Hadrat Fatimah bint Asad (RA) was the mother of Hadrat Ali (RA) and Ja'far at-Tayyar (RA). She raised the young orphan Muhammad (SAW) with a mother's love, and the Prophet (SAW) remarked that after Abu Talib, no one had shown him greater kindness. When she passed away, the Prophet (SAW) shrouded her in his own shirt and laid down in her grave praying for Allah's mercy upon her.",
    keyContributionsBn: [
      "রাসুলুল্লাহ (সা.)-কে মাতৃস্নেহে লালন-পালন ও প্রাথমিক যুগে ইসলাম গ্রহণ করে মদিনায় হিজরত।",
      "রাসুলুল্লাহ (সা.) স্বহস্তে কাফন পরিয়ে ও কবরে নেমে সুসংবাদ দান করেন।"
    ],
    keyContributionsEn: [
      "Nurtured Rasulullah (SAW) with maternal devotion, embraced Islam early, and migrated to Madinah.",
      "Honored by the Prophet (SAW) shrouding her in his shirt and praying inside her grave."
    ],
    hadithOrSirahRefBn: "আল-ইসাবাহ, কিতাবুত তাবাকাত আল-কুবরা",
    hadithOrSirahRefEn: "Al-Isabah, Kitab al-Tabaqat al-Kubra"
  },

  // ৩. অন্যান্য বিশিষ্ট সাহাবি পরিবারবর্গ
  "সাফিয়্যা বিনতে আব্দুল মুত্তালিব": {
    nameBn: "হযরত সাফিয়্যা বিনতে আব্দুল মুত্তালিব (রা.)",
    nameEn: "Hadrat Safiyyah bint Abd al-Muttalib (RA)",
    nameAr: "صفية بنت عبد المطلب",
    relationTitleBn: "ফুফু: রাসুলুল্লাহ (সা.) | মাতা: হযরত জুবায়ের ইবনুল আওয়াম (রা.)",
    relationTitleEn: "Aunt of Rasulullah (SAW) | Mother of Zubayr ibn al-Awwam (RA)",
    roleTitleBn: "শহীদ হামজার আপন বোন ও বীর নারী সাহাবিয়া (রা.)",
    roleTitleEn: "Sister of Hamzah (RA) & Courageous Companion (RA)",
    birthAndDeathBn: "ওফাত: ২০ হিজরি (মদিনা)",
    birthAndDeathEn: "Passed away: 20 AH (Madinah)",
    biographyBn: "হযরত সাফিয়্যা (রা.) ছিলেন রাসুলুল্লাহ (সা.)-এর শূরবীর ফুফু এবং প্রখ্যাত আশারায়ে মুবাশশারাহ সাহাবি হযরত জুবায়ের ইবনুল আওয়াম (রা.)-এর মাতা। খন্দকের যুদ্ধে যখন দুর্গের নিচে ইহুদি শয়তান আক্রমণ করতে আসে, তখন তিনি লাঠি হাতে নেমে ইহুদিকে কুপোকাত করেন—যা ইসলামের ইতিহাসে দুর্গে শত্রুকে বধকারী প্রথম নারী সাহাবিয়ার কীর্তি।",
    biographyEn: "Hadrat Safiyyah bint Abd al-Muttalib (RA) was the brave paternal aunt of Rasulullah (SAW) and mother of Asharah Mubashsharah Companion Zubayr ibn al-Awwam (RA). During the Battle of the Trench, she courageously defended the women's fortress and neutralized an enemy infiltrator.",
    keyContributionsBn: [
      "উহুদ ও খন্দকের যুদ্ধে অতুলনীয় ঈমানি সাহসিকতা ও ভাই হামজা (রা.)-এর শাহাদাতে অনন্য ধৈর্য।"
    ],
    keyContributionsEn: [
      "Remarkable courage at Uhud and Khandaq, and exemplary patience at the martyrdom of her brother Hamzah (RA)."
    ],
    hadithOrSirahRefBn: "সীরাতে ইবনে হিশাম, আল-ইসাবাহ",
    hadithOrSirahRefEn: "Sirat Ibn Hisham, Al-Isabah"
  },

  "সুমাইয়া বিনতে খাইয়াত": {
    nameBn: "হযরত সুমাইয়া বিনতে খাইয়াত (রা.)",
    nameEn: "Hadrat Sumayyah bint Khayyat (RA)",
    nameAr: "سمية بنت خياط",
    relationTitleBn: "মাতা: হযরত আম্মার ইবনে ইয়াসির (রা.)",
    relationTitleEn: "Mother of Ammar ibn Yasir (RA)",
    roleTitleBn: "ইসলামের ইতিহাসে 'প্রথম নারী শহীদ' (রা.)",
    roleTitleEn: "First Martyr (Shahidah) in Islamic History (RA)",
    birthAndDeathBn: "শাহাদাত: নবুওয়াতের প্রারম্ভিক মক্কী যুগ",
    birthAndDeathEn: "Martyrdom: Early Makkan Period",
    biographyBn: "হযরত সুমাইয়া (রা.) ছিলেন ইসলামের ইতিহাসে সর্বপ্রথম শাহাদাতের রক্তে রঞ্জিত হওয়া মহা-পবিত্রা নারী সাহাবিয়া। আবু জাহেল ও মক্কার কাফেররা তাঁহাকে রোদে পুড়িয়ে, লোহার বর্ম পরিয়ে চাবুক মারত যেন ইসলাম ত্যাগ করেন। কিন্তু তিনি অটল থাকেন। শেষে পাপিষ্ঠ আবু জাহেল বর্শা হেনে তাঁকে নির্মমভাবে শহীদ করে। রাসুল (সা.) ইয়াসির পরিবারকে দেখে বলতেন: \"ধৈর্য ধরো হে ইয়াসিরের পরিবার! তোমাদের ঠিকানা জান্নাত!\"",
    biographyEn: "Hadrat Sumayyah bint Khayyat (RA) holds the immortal distinction of being the first martyr in Islamic history. Despite brutal torture under the scorching Makkan sun by Abu Jahl to force her to renounce faith, she remained unyielding until Abu Jahl fatally struck her with a spear. Passing by her family's ordeal, Rasulullah (SAW) comforted them: 'Patience, O family of Yasir! Your promised abode is Paradise.'",
    keyContributionsBn: [
      "ইসলামের জন্য প্রথম রক্ত ঢেলে দিয়ে 'প্রথম শহীদ' (শহীদা)-এর ঐতিহাসিক সম্মান অর্জন।"
    ],
    keyContributionsEn: [
      "Honored as the very first martyr of Islam for her unbreakable devotion to Tawhid."
    ],
    hadithOrSirahRefBn: "সহিহ বুখারি, হায়াতুস সাহাবাহ",
    hadithOrSirahRefEn: "Sahih al-Bukhari, Hayatus Sahabah"
  },

  "ইয়াসির ইবনে আমীর": {
    nameBn: "হযরত ইয়াসির ইবনে আমীর (রা.)",
    nameEn: "Hadrat Yasir ibn Amir (RA)",
    nameAr: "ياسر بن عامر",
    relationTitleBn: "পিতা: হযরত আম্মার ইবনে ইয়াসির (রা.)",
    relationTitleEn: "Father of Ammar ibn Yasir (RA)",
    roleTitleBn: "ইসলামের ইতিহাসে 'প্রথম পুরুষ শহীদ' (রা.)",
    roleTitleEn: "First Male Martyr in Islamic History (RA)",
    birthAndDeathBn: "শাহাদাত: নবুওয়াতের প্রারম্ভিক মক্কী যুগ",
    birthAndDeathEn: "Martyrdom: Early Makkan Period",
    biographyBn: "হযরত ইয়াসির ইবনে আমীর (রা.) ছিলেন ইয়ামানি বংশোদ্ভূত মক্কার প্রারম্ভিক ঈমানদার সাহাবি। স্ত্রী সুমাইয়া ও পুত্র আম্মারকে নিয়ে তিনি ইসলাম গ্রহণ করেন। মক্কার তপ্ত বালুতে কাফেররা তাঁকে পাথরচাপা দিয়ে নির্যাতন করে শহীদ করে।",
    biographyEn: "Hadrat Yasir ibn Amir (RA) was an early Makkan believer originally from Yemen who embraced Islam with his wife Sumayyah and son Ammar. He endured relentless persecution upon Makkah's burning sands and attained martyrdom for his steadfast faith.",
    keyContributionsBn: [
      "ইসলামের সূচনা যুগে ঈমানের দাবিতে অবিচল থেকে শাহাদাত বরণ।"
    ],
    keyContributionsEn: [
      "Attained martyrdom remaining unshakeable in faith during the earliest days of Islam."
    ],
    hadithOrSirahRefBn: "সীরাতে ইবনে হিশাম, তারিখে তাবারী",
    hadithOrSirahRefEn: "Sirat Ibn Hisham, Tarikh al-Tabari"
  },

  "উম্মুল ফাদল লুবাবা": {
    nameBn: "হযরত উম্মুল ফাদল লুবাবা বিনতে আল-হারিস (রা.)",
    nameEn: "Hadrat Umm al-Fadl Lubabah bint al-Harith (RA)",
    nameAr: "أم الفضل لبابة بنت الحارث",
    relationTitleBn: "চাচি: রাসুলুল্লাহ (সা.) | মাতা: হযরত আবদুল্লাহ ইবনে আব্বাস (রা.)",
    relationTitleEn: "Aunt of Rasulullah (SAW) | Mother of Abdullah ibn Abbas (RA)",
    roleTitleBn: "আম্মাজান খাদিজা (রা.)-এর পর মক্কায় ২য় ইসলাম গ্রহণকারী নারী সাহাবিয়া",
    roleTitleEn: "Second Woman to Embrace Islam in Makkah after Khadijah (RA)",
    biographyBn: "হযরত উম্মুল ফাদল (রা.) ছিলেন হযরত আব্বাস (রা.)-এর স্ত্রী এবং প্রখ্যাত সাহাবি রাইসুল মুফাসসিরীন আবদুল্লাহ ইবনে আব্বাস (রা.)-এর মাতা। আম্মাজান খাদিজা (রা.)-এর পরেই তিনি মক্কায় দ্বিতীয় নারী হিসেবে ইসলাম গ্রহণ করেন। বদর যুদ্ধের পর পাপিষ্ঠ আবু লাহাব যখন মুসলমানদের বিজয়ে ক্ষুব্ধ হয়ে আবু রাফিকে মারছিল, উম্মুল ফাদল তাঁবুর খুঁটি দিয়ে আঘাত করে আবু লাহাবের মাথা ফাটিয়ে দেন।",
    biographyEn: "Hadrat Umm al-Fadl Lubabah bint al-Harith (RA) was the wife of al-Abbas ibn Abd al-Muttalib (RA) and mother of the great Qur'anic exegete Abdullah ibn Abbas (RA). She was the second woman in Makkah to accept Islam after Khadijah (RA), and famously stood up against Abu Lahab when he assaulted Abu Rafi after the Battle of Badr.",
    keyContributionsBn: [
      "দ্বিতীয় নারী সাহাবিয়া হিসেবে সততার সাথে ঈমান গ্রহণ এবং হযরত ইবনে আব্বাসের মতো উম্মতের শ্রেষ্ঠ আলেমের অভিভাবকত্ব।"
    ],
    keyContributionsEn: [
      "Second female Companion to embrace Islam in Makkah and mother of the Ummah's great scholar Ibn Abbas (RA)."
    ],
    hadithOrSirahRefBn: "সহিহ বুখারি, কিতাবুত তাবাকাত আল-কুবরা",
    hadithOrSirahRefEn: "Sahih al-Bukhari, Kitab al-Tabaqat al-Kubra"
  },

  "উম্মে সেলিম": {
    nameBn: "হযরত উম্মে সেলিম মহীয়সী রমলা বিনতে মিলহান (রা.)",
    nameEn: "Hadrat Umm Sulaym Rumaylah bint Milhan (RA)",
    nameAr: "أم سليم رميلة بنت ملحان",
    relationTitleBn: "মাতা: হযরত আনাস ইবনে মালিক (রা.)",
    relationTitleEn: "Mother of Anas ibn Malik (RA)",
    roleTitleBn: "মদিনার শ্রেষ্ঠ ঈমানদার প্রজ্ঞাবান আনসারিয়া সাহাবিয়া (রা.)",
    roleTitleEn: "Wise & Devout Ansari Companion of Madinah (RA)",
    biographyBn: "হযরত উম্মে সেলিম (রা.) ছিলেন আনাস ইবনে মালিক (রা.)-এর জননী। আবু তালহা (রা.) যখন অমুসলিম অবস্থায় তাঁকে বিবাহের প্রস্তাব দেন, উম্মে সেলিম বলেন: \"আমার মোহরানা কোনো স্বর্ণ-রুপা নয়; আপনার ইসলাম গ্রহণই আমার একমাত্র মোহরানা!\" এতে প্রভাবিত হয়ে আবু তালহা ইসলাম গ্রহণ করেন। সন্তান আনাসকে ১০ বছর বয়সে রাসুলুল্লাহ (সা.)-এর খিদমতের জন্য সমর্পণ করেছিলেন।",
    biographyEn: "Hadrat Umm Sulaym (RA) was the mother of Anas ibn Malik (RA). When Abu Talhah proposed to her before accepting Islam, she famously declared that his conversion to Islam alone would be her mahr—no gold or silver—inspiring his immediate faith. She also dedicated her ten-year-old son Anas to serve Rasulullah (SAW).",
    keyContributionsBn: [
      "ইসলাম গ্রহণকে বিয়ের মোহরানা বানিয়ে ইতিহাস সৃষ্টি এবং হযরত আনাসকে রাসুল (সা.)-এর খাদেম বানিয়ে গড়ে তোলা।"
    ],
    keyContributionsEn: [
      "Made her suitor's acceptance of Islam her marriage dowry and dedicated Anas (RA) to serve Rasulullah (SAW)."
    ],
    hadithOrSirahRefBn: "সহিহ বুখারি (হাদিস: ৩৮৫৮), সহিহ মুসলিম",
    hadithOrSirahRefEn: "Sahih al-Bukhari (Hadith 3858), Sahih Muslim"
  },

  "রাসূলুল্লাহ (সা.)": {
    nameBn: "সাইয়্যিদুল মুরসালীন খাতামুন্নাবিয়্যীন হযরত মুহাম্মদ (সা.)",
    nameEn: "Sayyid al-Mursalin Khatam an-Nabiyyin Muhammad (SAW)",
    nameAr: "محمد رسول الله صلى الله عليه وسلم",
    relationTitleBn: "আল্লাহর সর্বশ্রেষ্ঠ ও সর্বশেষ প্রেরিত রাসুল",
    relationTitleEn: "The Final & Greatest Messenger of Allah",
    roleTitleBn: "সাইয়্যিদুল আম্বিয়া ওয়াল মুরসালীন (মানবজাতির সর্বশ্রেষ্ঠ শিক্ষক ও হেদায়েতকর্তা)",
    roleTitleEn: "Leader of the Prophets & Guide for All Humanity",
    birthAndDeathBn: "জন্ম: ১২ রবিউল আউয়াল (৫৭০/৫৭১ খ্রি., মক্কা) | ওফাত: ১২ রবিউল আউয়াল, ১১ হিজরি (৬৩২ খ্রি., মদিনা)",
    birthAndDeathEn: "Born: 12 Rabi al-Awwal (570/571 CE, Makkah) | Passed away: 12 Rabi al-Awwal 11 AH (632 CE, Madinah)",
    biographyBn: "বিশ্বনবি হযরত মুহাম্মদ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম হলেন কুল কায়েনাত ও সমগ্র বিশ্বজগতের জন্য রহমতস্বরূপ (রহমাতুল্লিল আলামীন)। নবুওয়াত প্রাপ্তির পর দীর্ঘ ২৩ বছর অবিশ্রান্ত ত্যাগের মাধ্যমে সমগ্র আরব উপদ্বীপে শিরক ও জাহিলিয়াতের অন্ধকার দূর করে তাওহীদ, সততা, সাম্য ও ইনসাফের চিরন্তন দ্বীন ইসলাম প্রতিষ্ঠা করেন। সাহাবায়ে কেরাম (রা.) তাঁর প্রতিটি কদম ও সুন্নাহর অনুসরণে নিজেদের জীবন বিলিয়ে দিয়েছিলেন।",
    biographyEn: "Prophet Muhammad (SAW) is a Mercy to all the worlds (Rahmatan lil-Alamin). Over 23 years of tireless devotion after Prophethood, he dispelled polytheism and ignorance, establishing Islam upon Tawhid, integrity, equality, and justice. The noble Companions devoted their lives to following his blessed footsteps and Sunnah.",
    keyContributionsBn: [
      "আল্লাহ তাআলার চূড়ান্ত আসমানী গ্রন্থ পবিত্র কুরআনুল কারীম মানবজাতির কাছে পৌঁছানো।",
      "সাহাবায়ে কেরামকে পৃথিবীর সর্বকালের শ্রেষ্ঠ আদর্শ মানুষ ও ন্যায়পরায়ণ বিচারে গড়ে তোলা।",
      "বিদায় হজ্জে মানবজাতির সার্বজনীন মানবাধিকারের সর্বকালের শ্রেষ্ঠ সনদ ঘোষণা।"
    ],
    keyContributionsEn: [
      "Delivered the Final Divine Revelation, the Noble Qur'an, to all of humanity.",
      "Nurtured the Companions into the finest generation of faith, justice, and character.",
      "Proclaimed the universal charter of human dignity and brotherhood at the Farewell Pilgrimage."
    ],
    hadithOrSirahRefBn: "পবিত্র কুরআন (সূরা আল-আহজাব: ২১, সূরা আল-আনবিয়া: ১০৭), সহিহ বুখারি ও সহিহ মুসলিম",
    hadithOrSirahRefEn: "Noble Qur'an (Al-Ahzab 33:21, Al-Anbiya 21:107), Sahih al-Bukhari & Sahih Muslim"
  }
};
