// Complete English translation maps for araberGotroData.ts
// Preserves Bengali data verbatim while providing full English UI & Seerah content when selectedLanguage !== 'bn'

export interface ResponsibilityEnEntry {
  clanEn: string;
  responsibilityEn: string;
  detailsEn: string;
  preIslamicHolderEn: string;
  islamicHolderEn: string;
}

export const MAKKAH_RESPONSIBILITIES_EN: Record<string, ResponsibilityEnEntry> = {
  'বনু হাশিম': {
    clanEn: 'Banu Hashim',
    responsibilityEn: 'Watering Pilgrims (Siqayah) & Providing Food (Rifadah)',
    detailsEn: 'Sacred stewardship of providing Zamzam drinking water and meals to pilgrims arriving at the Holy Kaaba. The Prophet (PBUH) preserved this honor after the Conquest of Makkah.',
    preIslamicHolderEn: 'Hashim & Abdul Muttalib',
    islamicHolderEn: 'Al-Abbas ibn Abdul Muttalib (RA) & his descendants'
  },
  'বনু আবদে শামস / বনু উমাইয়া': {
    clanEn: 'Banu Abd Shams / Banu Umayyah',
    responsibilityEn: 'Carrying the War Banner "Al-Uqab" & Supreme Military Command',
    detailsEn: 'Stewardship of Quraysh\'s primary black war banner Al-Uqab (العقاب) and supreme command of military campaigns.',
    preIslamicHolderEn: 'Harb ibn Umayyah & Abu Sufyan',
    islamicHolderEn: 'Uthman (RA), Mu\'awiyah (RA) & Companion commanders'
  },
  'বনু মাখযুম': {
    clanEn: 'Banu Makhzum',
    responsibilityEn: 'Cavalry Corps (Al-A\'innah) & War Encampment (Al-Qubbah)',
    detailsEn: 'Management of the cavalry reins, warhorses, military encampment tents, and armory logistics.',
    preIslamicHolderEn: 'Al-Walid ibn al-Mughirah & Abu Jahl',
    islamicHolderEn: 'Sayfullah Khalid ibn al-Walid (RA)'
  },
  'বনু আদি': {
    clanEn: 'Banu Adi',
    responsibilityEn: 'Diplomacy, Foreign Envoys & Arbitration (As-Sifarah)',
    detailsEn: 'Exclusive authority over peace treaties, truces with external tribes, and diplomatic envoys. Umar al-Faruq (RA) served as chief envoy even in pre-Islamic times.',
    preIslamicHolderEn: 'Nufayl ibn Abd al-Uzza & Umar (pre-Islamic era)',
    islamicHolderEn: 'Amir al-Mu\'minin Umar ibn al-Khattab (RA)'
  },
  'বনু তাইম': {
    clanEn: 'Banu Taym',
    responsibilityEn: 'Blood Money (Diyat) & Criminal Compensation Arbitration (Al-Ashnaq)',
    detailsEn: 'Final judicial authority in assessing blood money and compensation for homicides or disputes. What Abu Bakr ruled in pre-Islamic Makkah was universally accepted.',
    preIslamicHolderEn: 'Abu Bakr as-Siddiq (RA) (pre-Islamic era)',
    islamicHolderEn: 'Khalifat Rasulillah Abu Bakr as-Siddiq (RA)'
  },
  'বনু আসাদ': {
    clanEn: 'Banu Asad',
    responsibilityEn: 'Policy Counsel in Dar al-Nadwah & Trade Caravan Oversight (Al-Mashwarah)',
    detailsEn: 'Key consultative seat in Makkah\'s parliament Dar al-Nadwah and senior coordination of international Syria–Yemen trade caravans.',
    preIslamicHolderEn: 'Asad ibn Abd al-Uzza & Khuwaylid ibn Asad',
    islamicHolderEn: 'Hawari Rasulillah Az-Zubayr ibn al-Awwam (RA)'
  },
  'বনু যাহরা': {
    clanEn: 'Banu Zuhrah',
    responsibilityEn: 'Treasury & Wealth Oversight (Al-Amwal); Maternal Lineage of the Prophet (PBUH)',
    detailsEn: 'Honored clan of Aminah bint Wahb. Custodians of Makkan sacred funds and renowned across Arabia for expert archery.',
    preIslamicHolderEn: 'Wahb ibn Abd Manaf',
    islamicHolderEn: 'Sa\'d ibn Abi Waqqas (RA) & Abdur Rahman ibn Awf (RA)'
  },
  'বনু আবদুদ দার': {
    clanEn: 'Banu Abd al-Dar',
    responsibilityEn: 'Custodianship of Kaaba Keys (Al-Hijabah / Sidanah) & General Standard (Al-Liwa)',
    detailsEn: 'Guardianship of the Sacred House, holding the Kaaba key, and bearing the general standard Al-Liwa. The Prophet (PBUH) confirmed the key forever in their lineage.',
    preIslamicHolderEn: 'Qusayy ibn Kilab & Talhah ibn Abi Talhah',
    islamicHolderEn: 'Uthman ibn Talhah (RA) [Permanent Key Custodians until the Last Day]'
  },
  'বনু জুমাহ': {
    clanEn: 'Banu Jumah',
    responsibilityEn: 'Divination Arrows (Al-Azlam) & Oracle Consultation',
    detailsEn: 'Pre-Islamic practice of casting divination arrows kept inside the Kaaba before wars or marriages. Completely abolished upon the advent of Islamic Tawhid.',
    preIslamicHolderEn: 'Umayyah ibn Khalaf & Safwan ibn Umayyah',
    islamicHolderEn: 'Uthman ibn Maz\'un (RA); pagan practice abolished by Islam'
  },
  'বনু সাহম': {
    clanEn: 'Banu Sahm',
    responsibilityEn: 'Dispute Resolution & Sacred Votive Offerings Custody (Hadiyyah)',
    detailsEn: 'Mediating internal Makkan disputes and safeguarding votive wealth and offerings dedicated to the Kaaba.',
    preIslamicHolderEn: 'Al-As ibn Wa\'il & Qays ibn Adi',
    islamicHolderEn: 'Amr ibn al-As (RA) & Abdullah ibn Amr (RA)'
  }
};

export interface Chapter3OverviewEnEntry {
  clanEn: string;
  locationEn: string;
  noteEn: string;
}

export const CHAPTER3_OVERVIEW_EN: Record<string, Chapter3OverviewEnEntry> = {
  'বনু সাকীফ': {
    clanEn: 'Banu Thaqif',
    locationEn: 'At-Ta\'if; mountain-ringed highland city near Makkah',
    noteEn: 'Battles of Hunayn & Siege of Ta\'if; tribe of Urwah ibn Mas\'ud & Al-Mughirah ibn Shu\'bah'
  },
  'বনু হাওয়াযিন': {
    clanEn: 'Banu Hawazin',
    locationEn: 'Najd & Hijaz highlands east of Makkah',
    noteEn: 'Principal opponent at the Battle of Hunayn; subsequently embraced Islam wholeheartedly'
  },
  'বনু সা’দ': {
    clanEn: 'Banu Sa\'d',
    locationEn: 'Sub-branch of Hawazin (Banu Sa\'d ibn Bakr)',
    noteEn: 'Tribe of the Prophet\'s foster-mother Halimah as-Sa\'diyyah; famed for purest classical Arabic'
  },
  'বনু খুযাআ': {
    clanEn: 'Banu Khuza\'ah',
    locationEn: 'Former ruling custodians of Makkah prior to Quraysh',
    noteEn: 'Allies of the Prophet (PBUH) under the Treaty of Hudaybiyyah; backdrop to Conquest of Makkah'
  },
  'বনু বকর': {
    clanEn: 'Banu Bakr',
    locationEn: 'Sub-branch of the Banu Kinanah confederation',
    noteEn: 'Allies of Quraysh; violated the Hudaybiyyah treaty by ambushing Khuza\'ah at night'
  },
  'বনু গিফার': {
    clanEn: 'Banu Ghifar',
    locationEn: 'Waddan along the Makkah–Syria caravan trade corridor',
    noteEn: 'Tribe of Abu Dharr al-Ghifari (RA); collectively accepted Islam during the Madinan period'
  },
  'বনু দাওস': {
    clanEn: 'Banu Daws',
    locationEn: 'Southern Arabia (Yemen & Tihamah borderlands)',
    noteEn: 'Tribe of Tufayl ibn Amr ad-Dawsi & top Hadith narrator Abu Hurayrah (RA)'
  },
  'বনু তামিম': {
    clanEn: 'Banu Tamim',
    locationEn: 'Primarily the Najd plateau',
    noteEn: 'Most populous & fierce warrior tribe of Arabia; tribe of Khabbab & al-Aqra ibn Habis'
  },
  'বনু কালব': {
    clanEn: 'Banu Kalb',
    locationEn: 'Northern Syrian frontier & Dumat al-Jandal',
    noteEn: 'Tribe of Zayd ibn Harithah & Dihyah al-Kalbi (RA); bordered Byzantine territories'
  },
  'বনু গাতফান': {
    clanEn: 'Banu Ghatafan',
    locationEn: 'Central Najd region',
    noteEn: 'Joined Quraysh at the Battle of the Trench with 1,000 cavalrymen against Madinah'
  },
  'বনু হানিফা': {
    clanEn: 'Banu Hanifah',
    locationEn: 'Al-Yamamah agricultural region in Central Arabia',
    noteEn: 'Tribe of false prophet Musaylimah al-Kadhdhab; site of the historic Battle of Yamamah'
  }
};

export interface SubClanEnEntry {
  nameEn: string;
  descriptionEn: string;
  notableFiguresEn?: string[];
}

export interface PersonalityEnEntry {
  nameEn: string;
  roleEn: string;
  bioEn: string;
  referenceEn: string;
}

export interface TribeSectionEnEntry {
  tribeNameEn: string;
  locationOrContextEn: string;
  responsibilityOrRoleEn: string;
  introductionEn: string;
  subClansEn?: SubClanEnEntry[];
  personalitiesEn: Record<string, PersonalityEnEntry>;
  referencesEn: string[];
}

export const ARABER_GOTRO_DATABASE_EN: Record<string, TribeSectionEnEntry> = {
  'banu-hashim': {
    tribeNameEn: 'Banu Hashim',
    locationOrContextEn: 'Makkah al-Mukarramah (Most Honored & Sacred Branch of Quraysh)',
    responsibilityOrRoleEn: 'Watering Pilgrims (Siqayah) and Providing Food (Rifadah)',
    introductionEn: 'Banu Hashim is the noblest, most honored, and most distinguished branch of Quraysh, named after Hashim ibn Abd Manaf, great-grandfather of Prophet Muhammad (PBUH). Their primary Makkan duty was watering pilgrims (Siqayah) and feeding them (Rifadah) around the Sacred Kaaba. Known across the Arabian Peninsula for leadership, generosity, and hospitality, Banu Hashim stood at the pinnacle of spiritual, social, and genealogical nobility even when later branches such as Banu Umayyah grew wealthier in commerce.',
    personalitiesEn: {
      'prophet-muhammad': {
        nameEn: 'Rasulullah (PBUH)',
        roleEn: 'Mercy to Mankind & Seal of the Prophets',
        bioEn: 'Foremost scion of Banu Hashim and Messenger to all humanity. Born in 570 CE into this noble lineage, Prophet Muhammad (PBUH) eternally elevated the honor of Banu Hashim.',
        referenceEn: 'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, pp. 137–140'
      },
      'abdul-muttalib': {
        nameEn: 'Abdul Muttalib',
        roleEn: 'Grandfather of the Prophet (PBUH) & Chief of Makkah',
        bioEn: 'Paternal grandfather of the Prophet (PBUH) and undisputed chieftain of Banu Hashim. He rediscovered and re-excavated the Well of Zamzam and led Quraysh during Abrahah\'s Year of the Elephant invasion.',
        referenceEn: 'Ibn Hisham, Vol. 1, pp. 142–147'
      },
      'abdullah-ibn-abdul-muttalib': {
        nameEn: 'Abdullah ibn Abdul Muttalib',
        roleEn: 'Father of Prophet Muhammad (PBUH)',
        bioEn: 'Blessed father of the Prophet (PBUH). Returning from a trade journey to Syria, he passed away in Yathrib (Madinah) at the young age of twenty-five.',
        referenceEn: 'Ar-Rahiq al-Makhtum, p. 42'
      },
      'abu-talib': {
        nameEn: 'Abu Talib',
        roleEn: 'Paternal Uncle of the Prophet (PBUH) & Chief of Banu Hashim',
        bioEn: 'Became leader of Banu Hashim after Abdul Muttalib. With paternal devotion he shielded the Prophet (PBUH) throughout his life from the fierce hostility of Makkan disbelievers, though he never accepted Islam.',
        referenceEn: 'Ibn Hisham, Vol. 1, p. 264'
      },
      'hamza-ibn-abdul-muttalib': {
        nameEn: 'Hamzah ibn Abdul Muttalib (RA)',
        roleEn: 'Prophet\'s Uncle & "Asadullah" (Lion of Allah)',
        bioEn: 'Paternal uncle and foster-brother of the Prophet (PBUH). Renowned for matchless courage, earning the title "Lion of Allah", he fought valiantly and attained martyrdom at the Battle of Uhud.',
        referenceEn: 'Al-Isabah fi Tamyiz as-Sahabah, Vol. 2, p. 105'
      },
      'abbas-ibn-abdul-muttalib': {
        nameEn: 'Al-Abbas ibn Abdul Muttalib (RA)',
        roleEn: 'Prophet\'s Uncle & Custodian of Siqayah',
        bioEn: 'Wealthy Makkan merchant who held the office of providing drinking water (Siqayah) to pilgrims. Shortly before the Conquest of Makkah he migrated to Madinah and declared Islam.',
        referenceEn: 'Usd al-Ghabah, Vol. 3, p. 109'
      },
      'ali-ibn-abi-talib': {
        nameEn: 'Ali ibn Abi Talib (RA)',
        roleEn: 'Cousin, Son-in-Law of the Prophet (PBUH) & 4th Caliph',
        bioEn: 'First among youths to embrace Islam. Remembered throughout Islamic history for justice, deep wisdom, eloquence, and unmatched bravery.',
        referenceEn: 'Usd al-Ghabah, Vol. 4, p. 16'
      },
      'jafar-ibn-abi-talib': {
        nameEn: 'Ja\'far ibn Abi Talib (RA)',
        roleEn: 'Emigrant to Abyssinia & Martyr of Mu\'tah ("At-Tayyar")',
        bioEn: 'Elder brother of Ali (RA). Migrated to Abyssinia where he delivered an eloquent defense of Islam before the Negus. After losing both arms holding the banner at Mu\'tah, he was honored with the title "The Flying Bird in Paradise" (At-Tayyar).',
        referenceEn: 'Al-Isabah, Vol. 1, p. 592'
      },
      'fatima-bint-muhammad': {
        nameEn: 'Fatimah bint Muhammad (RA)',
        roleEn: 'Beloved Daughter of the Prophet (PBUH) & Leader of Women of Paradise',
        bioEn: 'Precious daughter of the Messenger of Allah (PBUH) and wife of Ali (RA). Proclaimed Sayyidat Nisa Ahl al-Jannah (Leader of the Women of Paradise).',
        referenceEn: 'Siyar A\'lam an-Nubala, Vol. 2, p. 118'
      },
      'hasan-husayn': {
        nameEn: 'Al-Hasan & Al-Husayn (RA)',
        roleEn: 'Beloved Grandsons of the Prophet & Leaders of the Youth of Paradise',
        bioEn: 'Sons of Ali (RA) and Fatimah (RA), deeply cherished by Prophet Muhammad (PBUH), who proclaimed them Chiefs of the Youth of Paradise.',
        referenceEn: 'Authentic Hadith Collections'
      },
      'abdullah-ibn-abbas': {
        nameEn: 'Abdullah ibn Abbas (RA)',
        roleEn: 'Ra\'is al-Mufassirin (Chief Exegete of the Quran)',
        bioEn: 'Cousin of the Prophet (PBUH). Blessed with extraordinary intellect and mastery of Quranic exegesis, earning the titles Chief of Exegetes and Scholar of the Ummah.',
        referenceEn: 'Al-Isabah, Vol. 4, p. 122'
      },
      'umme-hani': {
        nameEn: 'Umm Hani (RA)',
        roleEn: 'Fakhitah bint Abi Talib',
        bioEn: 'Born Fakhitah, daughter of Abu Talib. On the Day of Conquest of Makkah she granted asylum to several relatives, and classical accounts note the Night Journey (Isra) began near her home.',
        referenceEn: 'Ibn Hisham & Classical Seerah'
      },
      'abu-lahab': {
        nameEn: 'Abu Lahab (Hostile Figure)',
        roleEn: 'Arch-Enemy & Condemned Opponent',
        bioEn: 'Born Abd al-Uzza. Despite being the Prophet\'s own paternal uncle, he was among Islam\'s fiercest enemies, earning explicit condemnation in Surah al-Masad (al-Lahab).',
        referenceEn: 'Tafsir & Seerah Sources'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, pp. 137–140',
      'Safiur Rahman Mubarakpuri, Ar-Rahiq al-Makhtum, pp. 42–43',
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, pp. 142–147 & p. 264',
      'Ibn Hajar al-Asqalani, Al-Isabah fi Tamyiz as-Sahabah',
      'Ibn al-Athir, Usd al-Ghabah fi Ma\'rifat as-Sahabah',
      'Imam adh-Dhahabi, Siyar A\'lam an-Nubala'
    ]
  },

  'banu-umayya': {
    tribeNameEn: 'Banu Abd Shams / Banu Umayyah',
    locationOrContextEn: 'Makkah al-Mukarramah (Controllers of Economy & International Trade)',
    responsibilityOrRoleEn: 'Bearing the War Banner "Al-Uqab" (العقاب) & Military Command',
    introductionEn: 'Banu Abd Shams and its principal branch Banu Umayyah constituted one of the wealthiest, most influential, and politically dominant clans of Makkan Quraysh, named after Abd Shams ibn Abd Manaf and his son Umayyah. They largely controlled Makkah\'s international trade caravans to Syria and Yemen, and held stewardship of Quraysh\'s black military standard Al-Uqab and wartime command. While Banu Hashim led in religious and pilgrim services, Banu Umayyah excelled in wealth and political statecraft.',
    personalitiesEn: {
      'uthman-ibn-affan': {
        nameEn: 'Uthman ibn Affan (RA)',
        roleEn: 'Third Caliph & "Dhun-Nurayn" (Possessor of Two Lights)',
        bioEn: 'Though from wealthy Banu Umayyah, he embraced Islam in its very earliest days. Known for deep modesty and immense generosity, he married two daughters of the Prophet (Ruqayyah and Umm Kulthum RA) successively, earning the title Dhun-Nurayn.',
        referenceEn: 'Al-Isabah, Vol. 4, p. 377'
      },
      'abu-sufyan': {
        nameEn: 'Abu Sufyan (Sakhr ibn Harb)',
        roleEn: 'Supreme Commander of Makkah, Later Noble Companion',
        bioEn: 'Chief leader of Banu Umayyah who commanded Quraysh after Badr at the Battles of Uhud and Trench. Embraced Islam on the Conquest of Makkah and later lost an eye fighting at Ta\'if and Yarmouk.',
        referenceEn: 'Usd al-Ghabah, Vol. 3, pp. 12–13'
      },
      'muawiyah-ibn-abi-sufyan': {
        nameEn: 'Mu\'awiyah ibn Abi Sufyan (RA)',
        roleEn: 'Scribe of Revelation & Founder of the Umayyad Caliphate',
        bioEn: 'Accepted Islam at the Conquest of Makkah and served among the Prophet\'s scribes of revelation (Katib al-Wahy). Later governed Syria and established the Umayyad dynasty.',
        referenceEn: 'Al-Isabah, Vol. 6, p. 113'
      },
      'umme-habiba': {
        nameEn: 'Umm al-Mu\'minin Umm Habibah (RA)',
        roleEn: 'Mother of the Believers (Ramlah bint Abi Sufyan)',
        bioEn: 'Daughter of Abu Sufyan who emigrated to Abyssinia in the earliest days of Islam. After her first husband\'s death, the Prophet (PBUH) married her through the Negus, embodying steadfast faith despite her father\'s hostility.',
        referenceEn: 'Siyar A\'lam an-Nubala, Vol. 2, pp. 218–219'
      },
      'hinda-bint-utbah': {
        nameEn: 'Hind bint Utbah (RA)',
        roleEn: 'Wife of Abu Sufyan, Later Muslim',
        bioEn: 'Consumed by grief over family losses at Badr, she committed grievous acts against Hamzah (RA) at Uhud. On the Conquest of Makkah she accepted Islam and received the Prophet\'s pardon.',
        referenceEn: 'Ibn Hisham, Vol. 2, p. 73 & Vol. 4, p. 52'
      },
      'khalid-ibn-saeed': {
        nameEn: 'Khalid ibn Sa\'id ibn al-As (RA)',
        roleEn: 'Early Companion (4th or 5th Convert to Islam)',
        bioEn: 'Proof that not all of Banu Umayyah opposed Islam. Endured harsh persecution for his early conversion and emigrated to Abyssinia.',
        referenceEn: 'Usd al-Ghabah, Vol. 1, p. 576'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, pp. 136–137',
      'Safiur Rahman Mubarakpuri, Ar-Rahiq al-Makhtum, p. 42',
      'Ibn Hajar al-Asqalani, Al-Isabah fi Tamyiz as-Sahabah, Vols. 4 & 6',
      'Ibn al-Athir, Usd al-Ghabah, Vols. 3 & 1',
      'Imam adh-Dhahabi, Siyar A\'lam an-Nubala, Vol. 2'
    ]
  },

  'banu-makhzum': {
    tribeNameEn: 'Banu Makhzum',
    locationOrContextEn: 'Makkah al-Mukarramah (Military Powerhouse & Equestrian Elite)',
    responsibilityOrRoleEn: 'Cavalry Corps (Al-A\'innah) & War Encampment (Al-Qubbah)',
    introductionEn: 'Banu Makhzum ranked among the most militarily formidable and affluent clans of Quraysh, managing Makkah\'s warhorses (Al-A\'innah) and campaign armory tents (Al-Qubbah). A fierce psychological and political rivalry existed between Banu Makhzum and Banu Hashim; out of tribal pride—fearing subordination to a prophet from Banu Hashim—many Makhzumi chiefs resisted Islam despite recognizing the Quran\'s truth.',
    personalitiesEn: {
      'khalid-ibn-al-walid': {
        nameEn: 'Khalid ibn al-Walid (RA)',
        roleEn: 'Sayfullah (Sword of Allah) & Undefeated Commander',
        bioEn: 'Greatest military strategist of Banu Makhzum. Led Quraysh cavalry at Uhud, then embraced Islam in 8 AH, becoming supreme field commander honored by the Prophet (PBUH) with the title "Sayfullah" (Sword of Allah).',
        referenceEn: 'Al-Isabah, Vol. 2, p. 251'
      },
      'abu-salama': {
        nameEn: 'Abu Salamah (RA)',
        roleEn: 'Paternal Aunt\'s Son & Foster-Brother of the Prophet (PBUH), Badr Veteran',
        bioEn: 'Born Abdullah ibn Abd al-Asad. Emigrated to both Abyssinia and Madinah, fighting at Badr and passing away from wounds sustained at Uhud.',
        referenceEn: 'Usd al-Ghabah, Vol. 3, p. 295'
      },
      'umme-salama': {
        nameEn: 'Umm al-Mu\'minin Umm Salamah (RA)',
        roleEn: 'Mother of the Believers (Hind bint Abi Umayyah)',
        bioEn: 'Daughter of generous Makkan chief Abu Umayyah. Her wise counsel to the Prophet (PBUH) at Hudaybiyyah resolved a critical deadlock among the Companions.',
        referenceEn: 'Siyar A\'lam an-Nubala, Vol. 2, p. 202'
      },
      'abu-jahl': {
        nameEn: 'Abu Jahl (Hostile Figure)',
        roleEn: 'Pharaoh of this Ummah & Chief Opponent of Quraysh',
        bioEn: 'Amr ibn Hisham, mastermind of brutal persecution and plots against Muslims. Described by the Prophet (PBUH) as "the Pharaoh of this Ummah", he was slain at the Battle of Badr.',
        referenceEn: 'Ibn Hisham, Vol. 2, p. 71; Majma az-Zawa\'id 6/79'
      },
      'al-walid-ibn-mughira': {
        nameEn: 'Al-Walid ibn al-Mughirah (Hostile Figure)',
        roleEn: 'Uncle of Abu Jahl & Father of Khalid (RA)',
        bioEn: 'Privately marveled at the Quran\'s eloquence yet out of arrogance called it "ancient magic". His downfall is addressed in Surah al-Muddaththir (74:11–25).',
        referenceEn: 'Tafsir Ibn Kathir, Vol. 8, pp. 268–270'
      },
      'sumayyah-yasir-ammar': {
        nameEn: 'Sumayyah, Yasir & Ammar (RA)',
        roleEn: 'Allies (Mawali) of Banu Makhzum & First Martyr Family of Islam',
        bioEn: 'Subjected to savage torture by Abu Jahl and Banu Makhzum upon embracing Islam; Sumayyah (RA) became the very first martyr in Islamic history alongside her husband Yasir (RA).',
        referenceEn: 'Al-Isabah, Vol. 8, p. 190'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, p. 315 & Vol. 2, p. 71',
      'Safiur Rahman Mubarakpuri, Ar-Rahiq al-Makhtum, p. 42',
      'Ibn Hajar al-Asqalani, Al-Isabah, Vols. 2 & 8',
      'Ibn al-Athir, Usd al-Ghabah, Vol. 3',
      'Ibn Kathir, Tafsir al-Quran al-Azim, Vol. 8'
    ]
  },

  'banu-adi': {
    tribeNameEn: 'Banu Adi',
    locationOrContextEn: 'Makkah al-Mukarramah (Symbol of Diplomacy & Eloquence)',
    responsibilityOrRoleEn: 'Diplomacy, Envoys & Arbitration (As-Sifarah - السفارة)',
    introductionEn: 'Banu Adi held the vital office of Makkan diplomacy and inter-tribal arbitration (As-Sifarah). Whenever warfare erupted or treaties were negotiated with outside tribes, Banu Adi dispatched Quraysh\'s official envoys—a role executed in pre-Islamic times by Umar ibn al-Khattab. Though fewer in number than Banu Hashim or Makhzum, Banu Adi wielded immense social authority through intellect, courage, and eloquence.',
    personalitiesEn: {
      'umar-ibn-al-khattab': {
        nameEn: 'Umar ibn al-Khattab (RA)',
        roleEn: 'Second Caliph & "Al-Faruq" (Distinguisher of Truth from Falsehood)',
        bioEn: 'Second Caliph of Islam and greatest scion of Banu Adi. Following his conversion, Muslims gained the strength to pray openly at the Kaaba; his caliphate became a timeless hallmark of justice and expansion.',
        referenceEn: 'Al-Isabah, Vol. 4, p. 590'
      },
      'zayd-ibn-khattab': {
        nameEn: 'Zayd ibn al-Khattab (RA)',
        roleEn: 'Elder Brother of Umar (RA) & Martyr of Yamamah',
        bioEn: 'Accepted Islam earlier than Umar (RA). Fought heroically carrying the banner and achieved martyrdom at the Battle of Yamamah during Abu Bakr\'s caliphate.',
        referenceEn: 'Usd al-Ghabah, Vol. 2, p. 226'
      },
      'saeed-ibn-zayd': {
        nameEn: 'Sa\'id ibn Zayd (RA)',
        roleEn: 'Ashara Mubashshara (Promised Paradise)',
        bioEn: 'Early Makkan Companion who, together with his wife Fatimah bint al-Khattab, played a pivotal role in Umar\'s conversion. Served valiantly at Yarmouk and the conquest of Damascus.',
        referenceEn: 'Siyar A\'lam an-Nubala, Vol. 1, p. 124'
      },
      'fatima-bint-khattab': {
        nameEn: 'Fatimah bint al-Khattab (RA)',
        roleEn: 'Full Sister of Umar (RA)',
        bioEn: 'Her unwavering resolve and the recitation of Surah Ta-Ha in her home softened Umar\'s heart and guided him to embrace Islam.',
        referenceEn: 'Ibn Hisham, Vol. 1, pp. 343–346'
      },
      'zayd-ibn-amr': {
        nameEn: 'Zayd ibn Amr ibn Nufayl',
        roleEn: 'Pre-Islamic Hanif (Monotheist)',
        bioEn: 'Rejected idolatry, worshipped the One God of Abraham, and fiercely opposed female infanticide. The Prophet (PBUH) foretold that he would be resurrected as a single nation unto himself.',
        referenceEn: 'Sahih al-Bukhari, Hadith 3827 & 3828'
      },
      'khattab-ibn-nufayl': {
        nameEn: 'Khattab ibn Nufayl (Hostile Figure)',
        roleEn: 'Father of Umar (RA) & Harsh Polytheist',
        bioEn: 'Stern polytheist who relentlessly persecuted his own nephew Zayd ibn Amr for abandoning idols and drove him out of Makkah.',
        referenceEn: 'Classical Seerah Accounts'
      },
      'nuaym-ibn-abdullah': {
        nameEn: 'Nu\'aym ibn Abdullah (RA)',
        roleEn: 'Companion Who Redirected Umar\'s Course',
        bioEn: 'When Umar set out sword in hand to kill the Prophet (PBUH), Nu\'aym shrewdly informed him of his own sister\'s conversion, diverting Umar to her home where his heart turned to Islam.',
        referenceEn: 'Al-Isabah, Vol. 6, p. 465'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, pp. 137 & 343–346',
      'Ibn Hajar al-Asqalani, Al-Isabah, Vols. 4 & 6',
      'Ibn al-Athir, Usd al-Ghabah, Vol. 2',
      'Sahih al-Bukhari, Hadith 3827 & 3828'
    ]
  },

  'banu-taym': {
    tribeNameEn: 'Banu Taym',
    locationOrContextEn: 'Makkah al-Mukarramah (Justice, Integrity & Blood-Money Arbitration)',
    responsibilityOrRoleEn: 'Blood Money (Diyat) & Financial Fines Arbitration (Al-Ashnaq)',
    introductionEn: 'Banu Taym was an honored, refined, and upright Quraysh clan entrusted with Al-Ashnaq—assessing blood money (Diyat) and criminal compensation across Makkah. Whenever bloodshed or disputes required financial settlement, Quraysh bowed without objection to the verdict of Banu Taym. In pre-Islamic Makkah, this judicial trust rested with Abu Bakr (RA).',
    personalitiesEn: {
      'abu-bakr-siddiq': {
        nameEn: 'Abu Bakr as-Siddiq (RA)',
        roleEn: 'First Caliph of Islam & "As-Siddiq" (The Truthful)',
        bioEn: 'Born Abdullah ibn Uthman (son of Abu Quhafah). First free adult male to accept Islam, loyal companion of the Prophet in the Cave of Thawr, and first Caliph of the Ummah.',
        referenceEn: 'Al-Isabah, Vol. 4, p. 144'
      },
      'aisha-bint-abi-bakr': {
        nameEn: 'Umm al-Mu\'minin Aishah (RA)',
        roleEn: 'Mother of the Believers, Preeminent Jurist & Scholar',
        bioEn: 'One of the greatest scholars, jurists, and Hadith narrators in Islamic history, teaching Companions and Successors for decades after the Prophet\'s passing.',
        referenceEn: 'Siyar A\'lam an-Nubala, Vol. 2, p. 135'
      },
      'talha-ibn-ubaydillah': {
        nameEn: 'Talhah ibn Ubaydullah (RA)',
        roleEn: 'Ashara Mubashshara & "The Living Martyr"',
        bioEn: 'Used his own body as a human shield at Uhud to save the Prophet (PBUH), receiving scores of wounds and losing the use of one hand; honored by the Prophet as "a living martyr walking on earth".',
        referenceEn: 'Usd al-Ghabah, Vol. 3, p. 85'
      },
      'asma-bint-abi-bakr': {
        nameEn: 'Asma bint Abi Bakr (RA)',
        roleEn: '"Dhat an-Nitaqayn" (She of the Two Waistbands)',
        bioEn: 'Carried food secretly to the Cave of Thawr during the Hijrah, tearing her waistband in two to tie the provisions and earning the Prophet\'s lasting title.',
        referenceEn: 'Al-Isabah, Vol. 8, p. 14'
      },
      'abdullah-ibn-abi-bakr': {
        nameEn: 'Abdullah ibn Abi Bakr (RA)',
        roleEn: 'Intelligence Gatherer at the Cave of Thawr',
        bioEn: 'Listened to Quraysh plots in Makkah by day and delivered nightly intelligence updates to the Prophet (PBUH) and Abu Bakr in the Cave of Thawr; later martyred from wounds at Ta\'if.',
        referenceEn: 'Ibn Hisham, Vol. 2, p. 129'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, p. 137 & Vol. 2, p. 129',
      'Ibn Hajar al-Asqalani, Al-Isabah, Vols. 4 & 8',
      'Ibn al-Athir, Usd al-Ghabah, Vol. 3',
      'Imam adh-Dhahabi, Siyar A\'lam an-Nubala, Vol. 2'
    ]
  },

  'banu-asad-quraysh': {
    tribeNameEn: 'Banu Asad (Quraysh)',
    locationOrContextEn: 'Makkah al-Mukarramah (Wealthy & Influential Voice in Dar al-Nadwah)',
    responsibilityOrRoleEn: 'Prestigious Role in Dar al-Nadwah & Dominant Commercial Influence',
    introductionEn: 'Banu Asad ibn Abd al-Uzza was among the wisest, wealthiest, and most prominent clans of Quraysh, exerting vast influence in Makkan commerce and holding a strong consultative voice inside Dar al-Nadwah. Members of this clan were pioneers both among pre-Islamic monotheists (Hanifs) seeking truth and among the earliest pillars supporting the Prophet\'s mission.',
    personalitiesEn: {
      'khadija-bint-khuwaylid': {
        nameEn: 'Umm al-Mu\'minin Khadijah bint Khuwaylid (RA)',
        roleEn: 'First Believer, Leading Merchant & First Wife of the Prophet (PBUH)',
        bioEn: 'Honored as the very first person in all humanity to accept Islam, dedicating her entire fortune, wisdom, and unwavering emotional support at the dawn of revelation.',
        referenceEn: 'Al-Isabah, Vol. 8, p. 99'
      },
      'zubayr-ibn-al-awwam': {
        nameEn: 'Az-Zubayr ibn al-Awwam (RA)',
        roleEn: 'Ashara Mubashshara & Hawari (Discipleship) of the Prophet (PBUH)',
        bioEn: 'Son of the Prophet\'s aunt Safiyyah (RA). First to draw his sword in defense of Islam, earning the unique title "Hawari" (Devoted Helper) of the Messenger of Allah.',
        referenceEn: 'Usd al-Ghabah, Vol. 2, p. 307'
      },
      'waraqa-ibn-nawfal': {
        nameEn: 'Waraqah ibn Nawfal',
        roleEn: 'Pre-Islamic Hanif Scholar & Expert in Christian Scriptures',
        bioEn: 'Cousin of Khadijah (RA) who embraced monotheism and mastered Hebrew and Syriac scriptures; immediately affirmed Muhammad\'s (PBUH) prophethood after the first revelation in Cave Hira.',
        referenceEn: 'Sahih al-Bukhari, Hadith 3'
      },
      'hakim-ibn-hizam': {
        nameEn: 'Hakim ibn Hizam (RA)',
        roleEn: 'Born Inside the Kaaba & Generous Senior Companion',
        bioEn: 'Nephew of Khadijah (RA), famously born inside the Kaaba. On the Conquest of Makkah, the Prophet declared his house a sanctuary of safety before he embraced Islam.',
        referenceEn: 'Al-Isabah, Vol. 2, p. 112; Ibn Hisham 4/46'
      },
      'abul-as-ibn-al-rabi': {
        nameEn: 'Abul-As ibn ar-Rabi (RA)',
        roleEn: 'Nephew of Khadijah (RA) & Husband of Zaynab (RA)',
        bioEn: 'Husband of the Prophet\'s eldest daughter Zaynab (RA). Renowned Makkan merchant of spotless honesty who later embraced Islam in Madinah and was praised by the Prophet (PBUH).',
        referenceEn: 'Usd al-Ghabah, Vol. 6, p. 176'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, pp. 187–189 & Vol. 4, p. 46',
      'Ibn Hajar al-Asqalani, Al-Isabah, Vols. 2 & 8',
      'Ibn al-Athir, Usd al-Ghabah, Vols. 2 & 6',
      'Sahih al-Bukhari, Hadith 3'
    ]
  },

  'banu-zuhrah': {
    tribeNameEn: 'Banu Zuhrah',
    locationOrContextEn: 'Makkah al-Mukarramah (Maternal Clan of the Prophet PBUH)',
    responsibilityOrRoleEn: 'Maternal Lineage of the Prophet (PBUH); Famed for Nobility & Wisdom',
    introductionEn: 'Banu Zuhrah, descendants of Zuhrah ibn Kilab (brother of Qusayy), was one of Makkah\'s most distinguished clans, renowned for nobility, wisdom, and political foresight. As the maternal lineage of Prophet Muhammad (PBUH) through his mother Aminah bint Wahb, Banu Zuhrah held a cherished place in Islamic history—famously withdrawing from the Makkan army before the Battle of Badr.',
    personalitiesEn: {
      'amina-bint-wahb': {
        nameEn: 'Aminah bint Wahb',
        roleEn: 'Honored Mother of Prophet Muhammad (PBUH)',
        bioEn: 'Daughter of Banu Zuhrah chief Wahb ibn Abd Manaf. Passed away at al-Abwa when the Prophet (PBUH) was six years old during their return journey from Madinah.',
        referenceEn: 'Ibn Hisham, Vol. 1, pp. 155–156'
      },
      'saad-ibn-abi-waqqas': {
        nameEn: 'Sa\'d ibn Abi Waqqas (RA)',
        roleEn: 'Ashara Mubashshara & Victorious Commander of al-Qadisiyyah',
        bioEn: 'First to shoot an arrow in the path of Allah. Later commanded the Muslim army under Umar (RA) to historic victory over Sassanid Persia at al-Qadisiyyah; maternally related as an uncle to the Prophet.',
        referenceEn: 'Al-Isabah, Vol. 3, p. 72'
      },
      'abdur-rahman-ibn-awf': {
        nameEn: 'Abdur Rahman ibn Awf (RA)',
        roleEn: 'Ashara Mubashshara & Foremost Generous Merchant',
        bioEn: 'Converted early through Abu Bakr\'s invitation and played a vital role in building the economic strength of the Muslim community after migrating to Madinah.',
        referenceEn: 'Usd al-Ghabah, Vol. 3, p. 475'
      },
      'wahb-ibn-abd-manaf': {
        nameEn: 'Wahb ibn Abd Manaf',
        roleEn: 'Father of Aminah & Maternal Grandfather of the Prophet (PBUH)',
        bioEn: 'Respected chief of Banu Zuhrah and a prominent Makkan elder of noble standing.',
        referenceEn: 'Classical Seerah Works'
      },
      'al-miqdad-ibn-amr': {
        nameEn: 'Al-Miqdad ibn Amr (RA)',
        roleEn: 'Ally of Banu Zuhrah & Heroic Muslim Cavalryman',
        bioEn: 'Also known as al-Miqdad ibn al-Aswad. Among the earliest seven believers in Makkah and the foremost Muslim cavalry warrior at Badr and subsequent battles.',
        referenceEn: 'Al-Isabah, Vol. 6, p. 160'
      },
      'akhnas-ibn-shariq': {
        nameEn: 'Al-Akhnas ibn Shariq',
        roleEn: 'Allied Leader of Banu Zuhrah',
        bioEn: 'Shrewdly persuaded Banu Zuhrah to turn back before Badr once the Makkan caravan was safe, sparing the clan from destruction; later embraced Islam.',
        referenceEn: 'Usd al-Ghabah, Vol. 1, p. 57'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, pp. 155–156 & Vol. 2, p. 316',
      'Ibn Hajar al-Asqalani, Al-Isabah, Vols. 3 & 6',
      'Ibn al-Athir, Usd al-Ghabah, Vols. 3 & 1'
    ]
  },

  'quraysh-other-branches': {
    tribeNameEn: 'Other Key Branches of Quraysh',
    locationOrContextEn: 'Makkah al-Mukarramah (Abd al-Dar, Jumah, Sahm, Muttalib & Nawfal)',
    responsibilityOrRoleEn: 'Hijabah (Kaaba Keys), Liwa (War Standard), Azlam & Dispute Arbitration',
    introductionEn: 'Beyond the largest clans, several vital Quraysh branches upheld Makkah\'s religious, political, and social framework: Banu Abd al-Dar (Kaaba keys and war standard), Banu Jumah (divination arrows and shrines), Banu Sahm (litigation and sacred offerings), and Banu al-Muttalib & Nawfal (loyal kinsmen who stood with Banu Hashim in Shi\'b Abi Talib).',
    subClansEn: [
      {
        nameEn: 'Banu Abd al-Dar',
        descriptionEn: 'Exclusive custodianship of the Kaaba keys (Hijabah / Sidanah), bearing the main battle standard (Liwa), and stewardship of Dar al-Nadwah.',
        notableFiguresEn: ['Mus\'ab ibn Umayr (RA)', 'Uthman ibn Talhah (RA)']
      },
      {
        nameEn: 'Banu Jumah',
        descriptionEn: 'Administering divination arrows (Azlam) and Makkan idol shrines during the pre-Islamic era.',
        notableFiguresEn: ['Uthman ibn Maz\'un (RA)', 'Umayyah ibn Khalaf (Opponent)']
      },
      {
        nameEn: 'Banu Sahm',
        descriptionEn: 'Arbitrating inter-clan disputes and safeguarding votive property and offerings dedicated to the Kaaba (Hadiyyah).',
        notableFiguresEn: ['Amr ibn al-As (RA)', 'Khabbab ibn al-Aratt (RA)']
      },
      {
        nameEn: 'Banu al-Muttalib & Banu Nawfal',
        descriptionEn: 'Descendants of two sons of Abd Manaf. Banu al-Muttalib chose to endure the three-year Shi\'b Abi Talib boycott alongside Banu Hashim.',
        notableFiguresEn: ['Ubaydah ibn al-Harith (RA)', 'Mut\'im ibn Adi']
      }
    ],
    personalitiesEn: {
      'musab-ibn-umayr': {
        nameEn: 'Mus\'ab ibn Umayr (RA) [Banu Abd al-Dar]',
        roleEn: 'First Ambassador of Islam & Martyred Flagbearer at Uhud',
        bioEn: 'Wealthy Makkan youth who gave up every luxury for Islam. Sent after Aqabah as the first teacher to Madinah, he died holding the banner at the Battle of Uhud.',
        referenceEn: 'Al-Isabah, Vol. 6, p. 98'
      },
      'uthman-bin-talha': {
        nameEn: 'Uthman ibn Talhah (RA) [Banu Abd al-Dar]',
        roleEn: 'Custodian of the Keys of the Kaaba',
        bioEn: 'Upon conquering Makkah, the Prophet (PBUH) cleansed the Kaaba and returned its key permanently to Uthman and his family until the Day of Resurrection.',
        referenceEn: 'Seerah & Hadith Compilations'
      },
      'uthman-bin-mazun': {
        nameEn: 'Uthman ibn Maz\'un (RA) [Banu Jumah]',
        roleEn: 'Ascetic Companion & First Muhajir Buried in al-Baqi\'',
        bioEn: 'Deeply pious and ascetic Companion; after Hijrah he became the first Muhajir buried in Jannat al-Baqi\' cemetery.',
        referenceEn: 'Usd al-Ghabah, Vol. 3, p. 587'
      },
      'umayya-bin-khalaf': {
        nameEn: 'Umayyah ibn Khalaf (Hostile Figure) [Banu Jumah]',
        roleEn: 'Cruel Master of Bilal (RA)',
        bioEn: 'Head of Banu Jumah and fierce enemy who tortured Bilal (RA) on scorching desert sands; slain at the Battle of Badr.',
        referenceEn: 'Ibn Hisham'
      },
      'amr-ibn-al-as': {
        nameEn: 'Amr ibn al-As (RA) [Banu Sahm]',
        roleEn: 'Master Diplomat & Conqueror of Egypt',
        bioEn: 'One of Arabia\'s shrewdest strategists. Once led the Makkan delegation to Abyssinia; embraced Islam in 8 AH and later commanded the conquest of Egypt.',
        referenceEn: 'Al-Isabah, Vol. 4, p. 628'
      },
      'khabbab-ibn-al-aratt': {
        nameEn: 'Khabbab ibn al-Aratt (RA) [Banu Sahm]',
        roleEn: 'Steadfast Martyr of Torture Over Glowing Coals',
        bioEn: 'Enslaved by Umm Anmar of Banu Sahm, he endured burning iron and glowing coals under his bare back without ever wavering in his faith.',
        referenceEn: 'Sahih al-Bukhari & Seerah'
      },
      'ubaydah-ibn-al-harith': {
        nameEn: 'Ubaydah ibn al-Harith (RA) [Banu al-Muttalib]',
        roleEn: 'Martyr of the First Single Combat at Badr',
        bioEn: 'One of the three Muslim champions in the opening duel at Badr, fatally wounded in defense of faith. Imam al-Shafi\'i later descended from this clan.',
        referenceEn: 'Seerah Chronicles'
      },
      'mutim-ibn-adi': {
        nameEn: 'Mut\'im ibn Adi [Banu Nawfal]',
        roleEn: 'Protector Who Escorted the Prophet Returning from Ta\'if',
        bioEn: 'When the Prophet (PBUH) returned wounded from Ta\'if, Mut\'im armed his sons and escorted him safely back into Makkah; he died prior to Badr.',
        referenceEn: 'Ibn Hisham, Vol. 2, p. 20'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, p. 137 & Vol. 2, p. 20',
      'Ibn Hajar al-Asqalani, Al-Isabah, Vols. 4 & 6',
      'Ibn al-Athir, Usd al-Ghabah, Vols. 1 & 3'
    ]
  },

  'khazraj-tribe': {
    tribeNameEn: 'Banu Khazraj & Its Sub-Clans',
    locationOrContextEn: 'al-Madinah al-Munawwarah (Majority Ansar Tribe of Yathrib)',
    responsibilityOrRoleEn: 'Defense of Madinah, Ansar Brotherhood, Masjid an-Nabawi Land & Pledges of Aqabah',
    introductionEn: 'Banu Khazraj was the largest Arab tribe of Yathrib (Madinah), originally descending from the Azd of Yemen who migrated north after the collapse of the Ma\'rib Dam. Following a century-long feud with their brother tribe Aws culminating in the Battle of Bu\'ath, Khazraj leaders met the Prophet (PBUH) at Aqabah, embraced Islam, forged the Ansar brotherhood, and anchored the Madinan state.',
    subClansEn: [
      {
        nameEn: '1. Banu Salamah',
        descriptionEn: 'Courageous Madinan sub-clan whose quarter houses the historic Masjid al-Qiblatayn, where the Qiblah direction was revealed to shift toward Makkah.',
        notableFiguresEn: ['Al-Bara ibn Ma\'rur (RA)', 'Jabir ibn Abdullah (RA)']
      },
      {
        nameEn: '2. Banu an-Najjar',
        descriptionEn: 'Maternal clan of Hashim\'s wife Salma bint Amr. Upon arrival in Madinah the Prophet (PBUH) stayed in their quarter and built Al-Masjid an-Nabawi on their land.',
        notableFiguresEn: ['Abu Ayyub al-Ansari (RA)', 'Anas ibn Malik (RA)']
      },
      {
        nameEn: '3. Banu Sa\'idah',
        descriptionEn: 'Politically influential sub-clan whose roofed hall, Saqifah Bani Sa\'idah, hosted the historic consultation electing Abu Bakr (RA) as First Caliph.',
        notableFiguresEn: ['Sa\'d ibn Ubadah (RA)']
      },
      {
        nameEn: '4. Banu Awf',
        descriptionEn: 'Another Khazraj branch, infamously marked in history by the hypocrite chieftain who undermined Madinah.',
        notableFiguresEn: ['Abdullah ibn Ubayy (Chief of Hypocrites)']
      }
    ],
    personalitiesEn: {
      'al-bara-ibn-marur': {
        nameEn: 'Al-Bara ibn Ma\'rur (RA) [Banu Salamah]',
        roleEn: 'First to Pledge at the Second Pledge of Aqabah',
        bioEn: 'First leader to clasp the Prophet\'s hand at the Second Pledge of Aqabah. Passing away a month before Hijrah, he received the Prophet\'s funeral prayer at his grave upon arrival.',
        referenceEn: 'Al-Isabah, Vol. 1, p. 279'
      },
      'jabir-ibn-abdullah': {
        nameEn: 'Jabir ibn Abdullah (RA) [Banu Salamah]',
        roleEn: 'Among the Top Narrators (Mukthirin) of Hadith',
        bioEn: 'Participated in nineteen expeditions alongside the Prophet (PBUH) and preserved hundreds of Hadith and rulings of Prophetic Sunnah.',
        referenceEn: 'Siyar A\'lam an-Nubala, Vol. 3, p. 189'
      },
      'abu-ayyub-al-ansari': {
        nameEn: 'Abu Ayyub al-Ansari (RA) [Banu an-Najjar]',
        roleEn: 'Host of the Prophet in Madinah & Veteran of Constantinople',
        bioEn: 'Khalid ibn Zayd hosted the Prophet (PBUH) for seven months after the Hijrah. In old age he marched to Constantinople (Istanbul), passing away by its walls.',
        referenceEn: 'Usd al-Ghabah, Vol. 2, p. 95'
      },
      'anas-ibn-malik': {
        nameEn: 'Anas ibn Malik (RA) [Banu an-Najjar]',
        roleEn: 'Khadim ar-Rasul — Faithful Attendant for 10 Years',
        bioEn: 'Entrusted at age ten by his mother Umm Sulaym to serve the Prophet (PBUH), remaining faithfully at his side for ten full years.',
        referenceEn: 'Al-Isabah, Vol. 1, p. 126'
      },
      'saad-ibn-ubadah': {
        nameEn: 'Sa\'d ibn Ubadah (RA) [Banu Sa\'idah]',
        roleEn: 'Supreme Chieftain of Khazraj & Paragons of Generosity',
        bioEn: 'Famed for open-handed hospitality and military leadership, carrying the Khazraj standard in the Prophet\'s campaigns.',
        referenceEn: 'Usd al-Ghabah, Vol. 2, p. 283'
      },
      'abdullah-ibn-ubayy': {
        nameEn: 'Abdullah ibn Ubayy (Hostile Figure) [Banu Awf]',
        roleEn: 'Ra\'is al-Munafiqin (Chief of the Hypocrites)',
        bioEn: 'On the verge of being crowned king of Yathrib before the Hijrah, he outwardly professed Islam while covertly conspiring against the Muslim community throughout his life.',
        referenceEn: 'Ibn Hisham, Vol. 2, pp. 234–237'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, p. 428 & Vol. 2, pp. 234–237',
      'Ibn Hajar al-Asqalani, Al-Isabah, Vol. 1',
      'Ibn al-Athir, Usd al-Ghabah, Vol. 2',
      'Imam adh-Dhahabi, Siyar A\'lam an-Nubala, Vol. 3'
    ]
  },

  'aus-tribe': {
    tribeNameEn: 'Banu Aws & Its Sub-Clans',
    locationOrContextEn: 'al-Madinah al-Munawwarah (Pillar of the Ansar)',
    responsibilityOrRoleEn: 'Defense of Madinah, Digging the Trench & Shield of Islam',
    introductionEn: 'Alongside Khazraj, Banu Aws stood as one of the two mighty Arab brother-tribes of Yathrib descending from Yemen\'s Azd lineage. Through Mus\'ab ibn Umayr\'s mission, their leadership embraced Islam ahead of the Hijrah, and their unwavering loyalty and sacrifice at Badr, Uhud, and the Trench are enshrined in golden letters.',
    subClansEn: [
      {
        nameEn: '1. Banu Abd al-Ashhal',
        descriptionEn: 'Aristocratic clan of Aws. Remarkably, every man and woman of this clan embraced Islam on the very day their chief Sa\'d ibn Mu\'adh accepted faith.',
        notableFiguresEn: ['Sa\'d ibn Mu\'adh (RA)', 'Usayd ibn Hudayr (RA)', 'Salamah ibn Salamah (RA)']
      },
      {
        nameEn: '2. Banu Harithah',
        descriptionEn: 'Resided along the exposed perimeter of Madinah during the Battle of the Trench, rendering crucial intelligence and frontier defense.',
        notableFiguresEn: ['Muhammad ibn Maslamah (RA)']
      },
      {
        nameEn: '3. Banu Zafar & Banu Mu\'awiyah',
        descriptionEn: 'Smaller sub-clans celebrated for extraordinary bravery at Badr and Uhud.',
        notableFiguresEn: ['Qatadah ibn an-Nu\'man (RA)']
      }
    ],
    personalitiesEn: {
      'saad-ibn-muadh': {
        nameEn: 'Sa\'d ibn Mu\'adh (RA) [Banu Abd al-Ashhal]',
        roleEn: 'Chieftain of Aws Whose Death Shook the Throne of Allah',
        bioEn: 'Pledged before Badr that the Ansar would plunge into the sea if commanded. Martyrs from Trench wounds, the Prophet (PBUH) declared the Throne of the Most Merciful shook at his passing and 70,000 angels attended his funeral.',
        referenceEn: 'Al-Isabah, Vol. 3, p. 70; Ibn Hisham 1/436'
      },
      'usayid-ibn-hudayr': {
        nameEn: 'Usayd ibn Hudayr (RA) [Banu Abd al-Ashhal]',
        roleEn: 'Melodious Reciter to Whom Angels Descended to Listen',
        bioEn: 'Charmed by Mus\'ab\'s recitation into embracing Islam. While reciting the Quran at night, angels descended like a luminous cloud over his courtyard to listen.',
        referenceEn: 'Sahih al-Bukhari, Hadith 5018'
      },
      'salama-ibn-salama': {
        nameEn: 'Salamah ibn Salamah ibn Waqsh (RA)',
        roleEn: 'Participant in Both Pledges of Aqabah & Badr Veteran',
        bioEn: 'Frontline hero who took part in both the first and second Pledges of Aqabah and fought valiantly at Badr.',
        referenceEn: 'Usd al-Ghabah'
      },
      'muhammad-ibn-maslamah': {
        nameEn: 'Muhammad ibn Maslamah (RA) [Banu Harithah]',
        roleEn: 'Master Scout & Special Enforcer Against Ka\'b ibn al-Ashraf',
        bioEn: 'Carried out the daring mission neutralizing the seditious poet Ka\'b ibn al-Ashraf, and later fashioned a wooden sword to remain strictly neutral during civil strife.',
        referenceEn: 'Al-Isabah, Vol. 6, p. 33'
      },
      'qatadah-ibn-numan': {
        nameEn: 'Qatadah ibn an-Nu\'man (RA) [Banu Zafar]',
        roleEn: 'Companion Whose Eye Was Miraculously Restored at Uhud',
        bioEn: 'Struck in the eye at Uhud until it fell onto his cheek, the Prophet (PBUH) gently restored it with his blessed hand—making it sharper and fairer than the other.',
        referenceEn: 'Usd al-Ghabah, Vol. 4, p. 381'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, pp. 428 & 436–437',
      'Ibn Hajar al-Asqalani, Al-Isabah, Vols. 3 & 6',
      'Ibn al-Athir, Usd al-Ghabah, Vols. 1 & 4',
      'Sahih al-Bukhari, Hadith 5018'
    ]
  },

  'madinah-jewish-tribes': {
    tribeNameEn: 'Madinan Jewish Tribes (Qaynuqa, Nadir & Qurayzah)',
    locationOrContextEn: 'Fortified Strongholds (Utum) & Palm Oases of Madinah',
    responsibilityOrRoleEn: 'Finance, Moneylending, Fortress Building & Weaponry',
    introductionEn: 'Three major Jewish tribes settled in Madinah long before Islam, dominating local finance, moneylending, weapon smithing, and date palm agriculture from heavily fortified stone keeps while playing Aws and Khazraj against one another. Upon arrival, Prophet Muhammad (PBUH) concluded the historic Constitution of Madinah granting shared civic protection, which each tribe successively betrayed through sedition and wartime treachery.',
    subClansEn: [
      {
        nameEn: '1. Banu Qaynuqa',
        descriptionEn: 'Goldsmiths, armorers, and controllers of the Madinan marketplace. After sparking conflict by assaulting a Muslim woman\'s modesty post-Badr, they surrendered after a 15-day siege and were exiled.',
        notableFiguresEn: ['Abdullah ibn Salam (RA) — converted', 'Backed by hypocrite Abdullah ibn Ubayy']
      },
      {
        nameEn: '2. Banu an-Nadir',
        descriptionEn: 'Wealthy agricultural clan who plotted to drop a boulder upon the Prophet (PBUH) from a wall; later relocated to Khaybar where they orchestrated the Trench coalition.',
        notableFiguresEn: ['Huyayy ibn Akhtab (Master conspirator)', 'Ka\'b ibn al-Ashraf (Hostile poet)']
      },
      {
        nameEn: '3. Banu Qurayzah',
        descriptionEn: 'Southeastern Madinan fortress clan who broke their covenant at the height of the 10,000-strong Trench siege to attack Muslim families from the rear; judged by Sa\'d ibn Mu\'adh\'s verdict.',
        notableFiguresEn: ['Ka\'b ibn Asad (Chieftain)']
      }
    ],
    personalitiesEn: {
      'abdullah-ibn-salam': {
        nameEn: 'Abdullah ibn Salam (RA) [Banu Qaynuqa]',
        roleEn: 'Chief Jewish Rabbi Who Embraced Islam',
        bioEn: 'Recognized the signs in the Torah immediately upon the Prophet\'s arrival in Madinah, accepted Islam wholeheartedly, and received glad tidings of Paradise.',
        referenceEn: 'Sahih al-Bukhari & Siyar A\'lam an-Nubala'
      },
      'safiyyah-bint-huyayy': {
        nameEn: 'Umm al-Mu\'minin Safiyyah bint Huyayy (RA)',
        roleEn: 'Mother of the Believers (Daughter of Huyayy ibn Akhtab)',
        bioEn: 'Though daughter of a fierce adversary, she embraced Islam sincerely and became an honored Mother of the Believers.',
        referenceEn: 'Seerah & Hadith Sources'
      },
      'huyayy-ibn-akhtab': {
        nameEn: 'Huyayy ibn Akhtab (Hostile Figure)',
        roleEn: 'Chief of Banu an-Nadir & Architect of the Trench Coalition',
        bioEn: 'Mobilized Quraysh and regional Bedouin tribes to besiege Madinah and instigated Banu Qurayzah to tear up their treaty.',
        referenceEn: 'Ibn Hisham, Vol. 2, pp. 213–214'
      },
      'kab-ibn-ashraf': {
        nameEn: 'Ka\'b ibn al-Ashraf (Hostile Figure)',
        roleEn: 'Hostile Poet of Banu an-Nadir & Seditionist',
        bioEn: 'Incited Quraysh after Badr and composed insulting verses against Muslim women, leading to his execution under orders of the Prophet (PBUH).',
        referenceEn: 'Sahih al-Bukhari, Hadith 4037'
      },
      'kab-ibn-asad': {
        nameEn: 'Ka\'b ibn Asad (Hostile Figure)',
        roleEn: 'Chief of Banu Qurayzah & Covenant Breaker',
        bioEn: 'Initially hesitant, he yielded to Huyayy\'s persuasion and tore up the covenant during the Trench siege, resulting in the tribe\'s judgment.',
        referenceEn: 'Ibn Hisham, Vol. 2, p. 220'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, pp. 501–504 & Vol. 2, pp. 47–49, 213–235',
      'Safiur Rahman Mubarakpuri, Ar-Rahiq al-Makhtum, pp. 312–314',
      'Sahih al-Bukhari, Hadith 4037'
    ]
  },

  'banu-thaqif': {
    tribeNameEn: 'Banu Thaqif (Tribe of At-Ta\'if)',
    locationOrContextEn: 'At-Ta\'if; cool mountain-rimmed orchard city near Makkah',
    responsibilityOrRoleEn: 'Agriculture, Vineyards & Siege Engineering (Catapults & Mantlets)',
    introductionEn: 'Banu Thaqif was among Arabia\'s best-organized and prosperous tribes inhabiting the cool highland valley of Ta\'if, renowned for vineyards and advanced siege machinery (Manjaniq catapults and Dabbabah mantlets). Though their leaders pelted the Prophet (PBUH) during his Year of Sorrow visit and guarded the idol al-Lat, they sent a delegation in 9 AH to embrace Islam.',
    personalitiesEn: {
      'urwah-ibn-masud': {
        nameEn: 'Urwah ibn Mas\'ud (RA)',
        roleEn: 'Chief of Ta\'if (Honored with the Rank of Martyr of Surah Ya-Sin)',
        bioEn: 'Quraysh\'s envoy at Hudaybiyyah. Embraced Islam in 9 AH and called his people to faith, attaining martyrdom when struck by arrows from his own clansmen.',
        referenceEn: 'Al-Isabah, Vol. 4, p. 478'
      },
      'mughira-ibn-shubah': {
        nameEn: 'Al-Mughirah ibn Shu\'bah (RA)',
        roleEn: 'One of the Four Master Strategists & Diplomats of Arabia',
        bioEn: 'Converted before Hudaybiyyah and stood armed beside the Prophet (PBUH). Later dismantled Ta\'if\'s idol al-Lat upon the Prophet\'s command.',
        referenceEn: 'Usd al-Ghabah, Vol. 5, p. 253'
      },
      'uthman-ibn-abi-al-as': {
        nameEn: 'Uthman ibn Abi al-As (RA)',
        roleEn: 'Governor of Ta\'if Who Preserved His People During Riddah',
        bioEn: 'Appointed young governor of Ta\'if due to his keen devotion to the Quran; his decisive address prevented Ta\'if from apostatizing during the Riddah crisis.',
        referenceEn: 'Siyar A\'lam an-Nubala, Vol. 2, p. 375'
      },
      'abu-mihjan-al-thaqafi': {
        nameEn: 'Abu Mihjan ath-Thaqafi (RA)',
        roleEn: 'Celebrated Poet & Hero of al-Qadisiyyah',
        bioEn: 'Detained for drinking wine during al-Qadisiyyah, he pleaded for release to fight disguised on horseback, breaking Persian ranks before returning to his chains—winning pardon and lifelong repentance.',
        referenceEn: 'Al-Isabah, Vol. 7, p. 363'
      },
      'kinana-ibn-abd-yalil': {
        nameEn: 'Kinanah ibn Abd Yalil',
        roleEn: 'Ta\'if Chief Who Later Headed the Submission Delegation',
        bioEn: 'Had orchestrated the expulsion of the Prophet from Ta\'if in the 10th year of prophethood, yet later led Banu Thaqif\'s delegation to Madinah in 9 AH to accept Islam.',
        referenceEn: 'Ar-Rahiq al-Makhtum, pp. 430–432'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 2, pp. 26–30 & Vol. 4, pp. 123–125',
      'Ibn Hajar al-Asqalani, Al-Isabah, Vols. 4 & 7',
      'Ibn al-Athir, Usd al-Ghabah, Vol. 5',
      'Safiur Rahman Mubarakpuri, Ar-Rahiq al-Makhtum, pp. 430–432'
    ]
  },

  'hawazin-saad': {
    tribeNameEn: 'Banu Hawazin & Banu Sa\'d',
    locationOrContextEn: 'Highlands of Najd & Hijaz east of Makkah',
    responsibilityOrRoleEn: 'Purest Classical Arabic, Wet-Nursing Custom & Battle of Hunayn',
    introductionEn: 'Banu Hawazin was a vast nomadic confederation east of Makkah that allied with Thaqif to fight the Muslims at the Battle of Hunayn. Its celebrated sub-clan Banu Sa\'d ibn Bakr was famed across Arabia for purest classical Arabic and for nurturing the young Prophet Muhammad (PBUH) under his foster-mother Halimah as-Sa\'diyyah.',
    personalitiesEn: {
      'halima-al-sadiyah': {
        nameEn: 'Halimah as-Sa\'diyyah (RA)',
        roleEn: 'Blessed Foster-Mother of Prophet Muhammad (PBUH)',
        bioEn: 'Taking the infant Muhammad (PBUH) into her care brought abundant blessing to her drought-stricken home; years later the Prophet spread his own cloak for her saying, "My mother, my mother!"',
        referenceEn: 'Al-Isabah, Vol. 8, p. 87'
      },
      'al-shayma': {
        nameEn: 'Ash-Shayma (RA)',
        roleEn: 'Foster-Sister of the Prophet (Hudhafah bint al-Harith)',
        bioEn: 'Captured after Hunayn, she revealed a childhood scar on her shoulder; the Prophet (PBUH) wept with joy, honored her with gifts, and set her free to embrace Islam.',
        referenceEn: 'Usd al-Ghabah, Vol. 7, p. 169'
      },
      'al-harith-ibn-abd-al-uzza': {
        nameEn: 'Al-Harith ibn Abd al-Uzza (RA)',
        roleEn: 'Husband of Halimah & Foster-Father of the Prophet (PBUH)',
        bioEn: 'Historical sources record that he too later embraced Islam and joined the ranks of the Companions.',
        referenceEn: 'Classical Seerah Works'
      },
      'malik-ibn-awf': {
        nameEn: 'Malik ibn Awf an-Nasri (RA)',
        roleEn: 'Hawazin Commander at Hunayn, Later Muslim Chieftain',
        bioEn: 'Ambitious 30-year-old commander who brought families and livestock to Hunayn; subsequently came to Madinah, accepted Islam, and led the converted Hawazin.',
        referenceEn: 'Ar-Rahiq al-Makhtum, pp. 414–417 & 427'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, pp. 162–167 & Vol. 4, p. 69',
      'Ibn Hajar al-Asqalani, Al-Isabah, Vol. 8, p. 87',
      'Ibn al-Athir, Usd al-Ghabah, Vol. 7, p. 169',
      'Safiur Rahman Mubarakpuri, Ar-Rahiq al-Makhtum, pp. 414–417'
    ]
  },

  'khuzaa-bakr': {
    tribeNameEn: 'Banu Khuza\'ah & Banu Bakr (Allies of Hudaybiyyah)',
    locationOrContextEn: 'Former Custodians of Makkah (Khuza\'ah) & Branch of Kinanah (Bakr)',
    responsibilityOrRoleEn: 'Treaty of Hudaybiyyah Alliances & Catalyst for Conquest of Makkah',
    introductionEn: 'The ancient rivalry between Banu Khuza\'ah—earlier guardians of Makkah—and Banu Bakr directly precipitated the Conquest of Makkah. Under the Treaty of Hudaybiyyah, Khuza\'ah allied with the Prophet (PBUH) and Bakr with Quraysh. When Banu Bakr ambushed Khuza\'ah at al-Watir with covert Makkan arms support in 8 AH, Quraysh broke the treaty, prompting the peaceful liberation of Makkah.',
    personalitiesEn: {
      'budayl-ibn-waraqa': {
        nameEn: 'Budayl ibn Waraqah (RA) [Banu Khuza\'ah]',
        roleEn: 'Chief Leader & Well-Wisher of Khuza\'ah',
        bioEn: 'Consistent friend and informer to the Prophet (PBUH) from the time of Hudaybiyyah; formally embraced Islam just ahead of the Conquest of Makkah.',
        referenceEn: 'Al-Isabah, Vol. 1, p. 274'
      },
      'amr-ibn-salim': {
        nameEn: 'Amr ibn Salim al-Khuza\'i (RA) [Banu Khuza\'ah]',
        roleEn: 'Recited Urgent Appeal in Poetry at Al-Masjid an-Nabawi',
        bioEn: 'Led a forty-man delegation to Madinah after the massacre; moved by his poignant verses, the Prophet (PBUH) vowed, "O Amr ibn Salim, you shall be aided!" initiating preparations for Makkah.',
        referenceEn: 'Ibn Hisham, Vol. 4, pp. 39–40'
      },
      'nawfal-ibn-muawiyah': {
        nameEn: 'Nawfal ibn Mu\'awiyah ad-Dili (RA) [Banu Bakr]',
        roleEn: 'Leader of Banu Bakr, Later Righteous Companion',
        bioEn: 'Led Banu Bakr\'s night raid against Khuza\'ah, yet embraced Islam after the Conquest of Makkah and lived as an upright Companion.',
        referenceEn: 'Al-Isabah, Vol. 6, p. 480'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 3, p. 322 & Vol. 4, pp. 39–40',
      'Safiur Rahman Mubarakpuri, Ar-Rahiq al-Makhtum, pp. 391–393',
      'Ibn Hajar al-Asqalani, Al-Isabah, Vols. 1 & 6'
    ]
  },

  'ghifar-daws': {
    tribeNameEn: 'Banu Ghifar & Banu Daws',
    locationOrContextEn: 'Waddan Trade Corridor & Southern Tihamah/Yemen Borderlands',
    responsibilityOrRoleEn: 'From Highway Raiders to Pillars of Faith & Foremost Hadith Preservation',
    introductionEn: 'Banu Ghifar originally raided caravans along the Makkah–Syria trade route, yet transformed into early devotees earning the Prophet\'s prayer: "May Allah forgive Ghifar!" Banu Daws of southern Arabia earned the Prophet\'s supplication: "O Allah, guide Daws and bring them here!"—producing Islam\'s most prolific Hadith narrator, Abu Hurayrah (RA).',
    personalitiesEn: {
      'abu-dharr-al-ghifari': {
        nameEn: 'Abu Dharr al-Ghifari (RA) [Banu Ghifar]',
        roleEn: '4th or 5th Muslim, Symbol of Truthfulness & Asceticism',
        bioEn: 'Jundub ibn Junadah journeyed to Makkah, embraced Islam, and proclaimed Tawhid openly inside the Kaaba courtyard, enduring severe beatings with unshakeable faith.',
        referenceEn: 'Al-Isabah, Vol. 7, p. 107'
      },
      'tufayl-ibn-amr': {
        nameEn: 'At-Tufayl ibn Amr ad-Dawsi (RA) [Banu Daws]',
        roleEn: 'Chieftain of Daws & "Dhun-Nur" (Possessor of Light)',
        bioEn: 'Initially stuffed cotton in his ears to avoid hearing the Prophet, he heard Quranic verses by Allah\'s will and embraced Islam, later dying as a martyr at Yamamah.',
        referenceEn: 'Ibn Hisham 1/382–384; Al-Isabah 3/420'
      },
      'abu-hurairah': {
        nameEn: 'Abu Hurayrah (RA) [Banu Daws]',
        roleEn: 'Top Hadith Narrator of Islam (5,374 Hadiths)',
        bioEn: 'Abdur Rahman ibn Sakhr converted via Tufayl (RA), joined the People of Suffah in 7 AH, and endured hunger to stay beside the Prophet (PBUH) memorizing Hadith.',
        referenceEn: 'Usd al-Ghabah, Vol. 7, p. 327'
      },
      'anis-ibn-junadah': {
        nameEn: 'Anis ibn Junadah (RA) [Banu Ghifar]',
        roleEn: 'Brother of Abu Dharr (RA) & Noted Arabian Poet',
        bioEn: 'First brought news of the Prophet\'s message from Makkah to his brother Abu Dharr and encouraged him to investigate in person.',
        referenceEn: 'Seerah & Hadith Sources'
      }
    },
    referencesEn: [
      'Sahih al-Bukhari, Hadith 3524 (Ghifar) & 4392 (Daws)',
      'Ibn Hajar al-Asqalani, Al-Isabah, Vols. 7 & 3',
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 1, pp. 382–384',
      'Ibn al-Athir, Usd al-Ghabah, Vol. 7'
    ]
  },

  'tamim-kalb': {
    tribeNameEn: 'Banu Tamim & Banu Kalb',
    locationOrContextEn: 'Najd Plateau (Tamim) & Syrian Frontier / Dumat al-Jandal (Kalb)',
    responsibilityOrRoleEn: 'Courage, Eloquence & the Only Companion Named in the Quran',
    introductionEn: 'Banu Tamim was among the largest and fiercest tribes of Najd, famed for martial vigor and poetry; their delegation calling from outside the Prophet\'s chambers in 9 AH occasioned Surah al-Hujurat. Banu Kalb guarded the northern Syrian frontier, producing Zayd ibn Harithah (RA), the only Companion mentioned explicitly by name in the Holy Quran.',
    personalitiesEn: {
      'harith-bin-abi-halah': {
        nameEn: 'Al-Harith ibn Abi Halah (RA) [Banu Tamim]',
        roleEn: 'Stepson of the Prophet & First Martyr Defending Him at the Kaaba',
        bioEn: 'Son of Khadijah (RA) from her previous marriage. When polytheists mobbed the Prophet (PBUH) upon his public call at the Kaaba, he rushed to defend him and fell as the first martyr in Makkah.',
        referenceEn: 'Al-Isabah, Vol. 1, p. 610'
      },
      'hind-bin-abi-halah': {
        nameEn: 'Hind ibn Abi Halah (RA) [Banu Tamim]',
        roleEn: 'Preeminent Narrator of the Prophet\'s Physical Features (Shama\'il)',
        bioEn: 'Brother of al-Harith (RA). Gifted with classic Arabic eloquence, he transmitted the famous comprehensive description of the Prophet\'s noble character and appearance.',
        referenceEn: 'Shama\'il at-Tirmidhi, Hadith 7'
      },
      'al-aqra-ibn-habis': {
        nameEn: 'Al-Aqra ibn Habis (RA) [Banu Tamim]',
        roleEn: 'Chieftain of Tamim & Renowned Arabian Arbitrator',
        bioEn: 'Seeing the Prophet kiss al-Hasan (RA), he remarked he never kissed his ten sons—prompting the famous teaching: "He who shows no mercy will not be shown mercy." Later embraced Islam.',
        referenceEn: 'Sahih al-Bukhari, Hadith 5997'
      },
      'zayd-bin-harithah': {
        nameEn: 'Zayd ibn Harithah (RA) [Banu Kalb]',
        roleEn: 'Only Companion Named in the Quran (Surah al-Ahzab 33:37)',
        bioEn: 'Kidnapped as a child and gifted to Khadijah (RA), he chose staying with the Prophet (PBUH) over returning to his parents. Martyred commanding the Muslim army at Mu\'tah.',
        referenceEn: 'Usd al-Ghabah, Vol. 2, pp. 226–229'
      },
      'usamah-ibn-zayd': {
        nameEn: 'Usamah ibn Zayd (RA) [Banu Kalb]',
        roleEn: '"Beloved of the Messenger" & Commander Against Rome at Age 18',
        bioEn: 'Son of Zayd (RA), deeply cherished by the Prophet (PBUH), who appointed him at eighteen to command an expedition to Syria including senior Companions.',
        referenceEn: 'Al-Isabah, Vol. 1, p. 201'
      },
      'dihyah-al-kalbi': {
        nameEn: 'Dihyah al-Kalbi (RA) [Banu Kalb]',
        roleEn: 'Handsome Companion Whose Form Jibril (AS) Often Assumed',
        bioEn: 'Angel Jibril (AS) frequently appeared in his dignified human likeness when delivering revelation; served as the Prophet\'s envoy carrying Islam\'s letter to Emperor Heraclius.',
        referenceEn: 'Sahih al-Bukhari, Hadith 7 & 3635'
      }
    },
    referencesEn: [
      'Tafsir Ibn Kathir, Vol. 7, pp. 367–369 (Surah al-Hujurat)',
      'Al-Isabah fi Tamyiz as-Sahabah, Vol. 1, pp. 610 & 201',
      'Shama\'il at-Tirmidhi, Hadith 7',
      'Sahih al-Bukhari, Hadith 5997, 7, 3635',
      'Usd al-Ghabah, Vol. 2, pp. 226–229'
    ]
  },

  'ghatafan-hanifa': {
    tribeNameEn: 'Banu Ghatafan & Banu Hanifah',
    locationOrContextEn: 'Najd Plateau (Ghatafan) & Fertile al-Yamamah (Hanifah)',
    responsibilityOrRoleEn: 'Psychological Strategy at Trench, First Economic Embargo & Battle of Yamamah',
    introductionEn: 'Banu Ghatafan was a powerful Bedouin confederation of Najd induced by promises of half of Khaybar\'s harvest to join the Trench siege. Banu Hanifah controlled fertile al-Yamamah, primary wheat supplier to Makkah; following the false claim of prophethood by Musaylimah al-Kadhdhab, Abu Bakr (RA) fought the decisive Battle of Yamamah here.',
    personalitiesEn: {
      'nuaym-ibn-masud': {
        nameEn: 'Nu\'aym ibn Mas\'ud (RA) [Banu Ghatafan]',
        roleEn: 'Mastermind of Psychological Diplomacy Shattering the Trench Coalition',
        bioEn: 'Quietly embraced Islam at the height of the Trench siege and, with the Prophet\'s permission, sowed mutual distrust among Quraysh, Ghatafan, and Banu Qurayzah, breaking the siege.',
        referenceEn: 'Usd al-Ghabah, Vol. 5, p. 334'
      },
      'uyaynah-ibn-hisn': {
        nameEn: 'Uyaynah ibn Hisn [Banu Ghatafan]',
        roleEn: 'Supreme Commander of Ghatafan Forces at the Trench',
        bioEn: 'Blunt Bedouin chief once called by the Prophet "al-Ahmaq al-Muta\'" (the obeyed hothead). Temporarily joined the apostate Tulayhah, then repented back into Islam upon capture.',
        referenceEn: 'Al-Isabah, Vol. 5, p. 33'
      },
      'thumamah-ibn-uthal': {
        nameEn: 'Thumamah ibn Uthal (RA) [Banu Hanifah]',
        roleEn: 'Leader Who Enacted Islam\'s First Economic Embargo on Makkah',
        bioEn: 'Chieftain of al-Yamamah. Tied for three days to a pillar of Masjid an-Nabawi, he was freed unconditionally, immediately embraced Islam, and cut off all wheat shipments to hostile Makkah.',
        referenceEn: 'Sahih al-Bukhari, Hadith 4372'
      },
      'musaylimah': {
        nameEn: 'Musaylimah al-Kadhdhab (Hostile Figure) [Banu Hanifah]',
        roleEn: 'Notorious False Prophet of al-Yamamah',
        bioEn: 'Claimed co-prophethood in 10 AH demanding half the Arabian Peninsula. Branded "the Arch-Liar" (al-Kadhdhab), he was slain by Wahshi\'s spear at the Battle of Yamamah.',
        referenceEn: 'Ibn Hisham 4/246–247; Al-Bidayah wan-Nihayah 6/326'
      }
    },
    referencesEn: [
      'Ibn Hisham, As-Sirah an-Nabawiyyah, Vol. 2, p. 214 & Vol. 4, pp. 246–247',
      'Al-Bidayah wan-Nihayah, Vol. 6, pp. 318–326',
      'Ibn al-Athir, Usd al-Ghabah, Vol. 5, p. 334',
      'Sahih al-Bukhari, Hadith 4372'
    ]
  }
};

export interface AppendixTribeEnEntry {
  nameEn: string;
  categoryEn: string;
  regionEn: string;
  historicalSignificanceEn: string;
  sahabaListEn: string[];
  historicalFiguresEn?: string[];
  negativeFiguresEn?: string[];
  referenceEn: string;
}

export const ALL_40_APPENDIX_TRIBES_EN: Record<string, AppendixTribeEnEntry> = {
  'app-1': {
    nameEn: 'Banu Hashim & Banu al-Muttalib (Quraysh)',
    categoryEn: 'Quraysh Lineage',
    regionEn: 'Makkah al-Mukarramah',
    historicalSignificanceEn: 'Sacred lineage of Prophet Muhammad (PBUH), entrusted with feeding (Rifadah) and watering (Siqayah) Kaaba pilgrims. Banu al-Muttalib endured the 3-year boycott in Shi\'b Abi Talib alongside them.',
    sahabaListEn: [
      'Rasulullah (PBUH)', 'Hamzah ibn Abdul Muttalib (RA)', 'Al-Abbas ibn Abdul Muttalib (RA)',
      'Ali ibn Abi Talib (RA)', 'Ja\'far ibn Abi Talib (RA)', 'Aqil ibn Abi Talib (RA)',
      'Abdullah ibn Abbas (RA)', 'Al-Fadl ibn al-Abbas (RA)', 'Ubaydah ibn al-Harith (RA) [Muttalib]',
      'Abu Sufyan ibn al-Harith (RA)', 'Rabi\'ah ibn al-Harith (RA)', 'Umm Hani (RA)',
      'Fatimah (RA)', 'Al-Hasan (RA)', 'Al-Husayn (RA)'
    ],
    historicalFiguresEn: ['Abdul Muttalib (Grandfather)', 'Abu Talib (Uncle)', 'Abdullah (Father)', 'Al-Harith ibn Abdul Muttalib'],
    negativeFiguresEn: ['Abu Lahab (Uncle — Arch-Opponent)'],
    referenceEn: 'Ibn Hisham Vol. 1, pp. 117–120; Al-Isabah Vol. 1, p. 354'
  },
  'app-2': {
    nameEn: 'Banu Abd Shams / Banu Umayyah (Quraysh)',
    categoryEn: 'Quraysh Lineage',
    regionEn: 'Makkah al-Mukarramah',
    historicalSignificanceEn: 'Bearers of the war standard "Al-Uqab" and controllers of Makkan international commerce; later founders of the Umayyad Caliphate.',
    sahabaListEn: [
      'Uthman ibn Affan (RA)', 'Abu Sufyan ibn Harb (RA)', 'Mu\'awiyah ibn Abi Sufyan (RA)',
      'Umm Habibah (RA)', 'Hind bint Utbah (RA)', 'Khalid ibn Sa\'id (RA)',
      'Amr ibn Sa\'id (RA)', 'Aban ibn Sa\'id (RA)', 'Sa\'id ibn al-As (RA)',
      'Yazid ibn Abi Sufyan (RA)', 'Abul-As ibn ar-Rabi (RA)'
    ],
    historicalFiguresEn: ['Umayyah ibn Abd Shams (Clan Patriarch)'],
    negativeFiguresEn: [
      'Utbah ibn Rabi\'ah (slain at Badr)', 'Shaybah ibn Rabi\'ah (slain)', 'Al-Walid ibn Utbah (slain)',
      'Uqbah ibn Abi Mu\'ayt (executed post-Badr)', 'Marwan ibn al-Hakam', 'Al-Walid ibn Uqbah'
    ],
    referenceEn: 'Ibn Hisham Vol. 2, p. 295; Usd al-Ghabah Vol. 3, p. 376'
  },
  'app-3': {
    nameEn: 'Banu Makhzum (Quraysh)',
    categoryEn: 'Quraysh Lineage',
    regionEn: 'Makkah al-Mukarramah',
    historicalSignificanceEn: 'Custodians of the cavalry corps (Al-A\'innah) and war armory tents (Al-Qubbah); lineage of celebrated military commanders.',
    sahabaListEn: [
      'Khalid ibn al-Walid (RA)', 'Abu Salamah (RA)', 'Umm Salamah (RA)',
      'Ikrimah ibn Abi Jahl (RA)', 'Ayyash ibn Abi Rabi\'ah (RA)', 'Al-Harith ibn Hisham (RA)',
      'Salamah ibn Hisham (RA)', 'Al-Walid ibn al-Walid (RA)', 'Al-Arqam ibn Abil-Arqam (RA)',
      'Sumayyah (RA) [Ally]', 'Yasir (RA) [Ally]', 'Ammar ibn Yasir (RA) [Ally]'
    ],
    negativeFiguresEn: ['Abu Jahl (Amr ibn Hisham — slain at Badr)', 'Al-Walid ibn al-Mughirah', 'Hisham ibn al-Walid'],
    referenceEn: 'Ibn Hisham Vol. 1, pp. 270–272; Al-Isabah Vol. 2, p. 254'
  },
  'app-4': {
    nameEn: 'Banu Adi & Banu Taym (Quraysh)',
    categoryEn: 'Quraysh Lineage',
    regionEn: 'Makkah al-Mukarramah',
    historicalSignificanceEn: 'Banu Adi oversaw foreign diplomacy (As-Sifarah) and Banu Taym held blood-money arbitration (Al-Ashnaq); birthplace of Islam\'s first two Caliphs.',
    sahabaListEn: [
      'Umar ibn al-Khattab (RA) [Adi]', 'Zayd ibn al-Khattab (RA) [Adi]', 'Sa\'id ibn Zayd (RA) [Adi]',
      'Fatimah bint al-Khattab (RA) [Adi]', 'Abdullah ibn Umar (RA) [Adi]', 'Hafsah bint Umar (RA) [Adi]',
      'Nu\'aym ibn Abdullah (RA) [Adi]', 'Muti\' ibn al-Aswad (RA) [Adi]',
      'Abu Bakr as-Siddiq (RA) [Taym]', 'Aishah (RA) [Taym]', 'Talhah ibn Ubaydullah (RA) [Taym]',
      'Asma bint Abi Bakr (RA) [Taym]', 'Abdullah ibn Abi Bakr (RA) [Taym]', 'Abdur Rahman ibn Abi Bakr (RA) [Taym]',
      'Abu Quhafah (RA) [Taym]', 'Umm Ruman (RA) [Ally]', 'Suhayb ar-Rumi (RA) [Ally]', 'Bilal ibn Rabah (RA) [Protected by Abu Bakr]'
    ],
    historicalFiguresEn: ['Zayd ibn Amr ibn Nufayl (Hanif)', 'Abdullah ibn Jud\'an (Elder)'],
    negativeFiguresEn: ['Al-Khattab ibn Nufayl'],
    referenceEn: 'Ibn Hisham Vol. 1, pp. 343–344; Usd al-Ghabah Vol. 4, p. 137'
  },
  'app-5': {
    nameEn: 'Banu Asad & Banu Zuhrah (Quraysh)',
    categoryEn: 'Quraysh Lineage',
    regionEn: 'Makkah al-Mukarramah',
    historicalSignificanceEn: 'Banu Asad formed a pillar of Dar al-Nadwah and Makkan commerce, while Banu Zuhrah is the maternal clan of Prophet Muhammad (PBUH).',
    sahabaListEn: [
      'Khadijah bint Khuwaylid (RA) [Asad]', 'Az-Zubayr ibn al-Awwam (RA) [Asad]', 'Hakim ibn Hizam (RA) [Asad]',
      'Sa\'d ibn Abi Waqqas (RA) [Zuhrah]', 'Abdur Rahman ibn Awf (RA) [Zuhrah]',
      'Al-Miqdad ibn Amr (RA) [Ally]', 'Abdullah ibn Mas\'ud (RA) [Ally]',
      'Al-Akhnas ibn Shariq (RA)', 'Al-Miswar ibn Makhramah (RA)'
    ],
    historicalFiguresEn: ['Waraqah ibn Nawfal (Hanif)', 'Aminah bint Wahb (Prophet\'s Mother)', 'Wahb ibn Abd Manaf (Grandfather)'],
    negativeFiguresEn: ['Al-Awwam ibn Khuwaylid', 'Nawfal ibn Khuwaylid'],
    referenceEn: 'Al-Isabah Vol. 1, p. 415; Ar-Rahiq al-Makhtum, p. 65'
  },
  'app-6': {
    nameEn: 'Banu Khazraj (Ansar of Madinah)',
    categoryEn: 'Ansar (Madinah)',
    regionEn: 'al-Madinah al-Munawwarah',
    historicalSignificanceEn: 'Majority Ansar tribe of Yathrib; leaders of the Second Pledge of Aqabah, hosts of Al-Masjid an-Nabawi, and bedrock of Madinan military strength.',
    sahabaListEn: [
      'Sa\'d ibn Ubadah (RA)', 'Al-Bara ibn Ma\'rur (RA)', 'Jabir ibn Abdullah (RA)',
      'Abu Ayyub al-Ansari (RA)', 'Anas ibn Malik (RA)', 'Hassan ibn Thabit (RA)',
      'Ubayy ibn Ka\'b (RA)', 'Mu\'adh ibn Jabal (RA)', 'Zayd ibn Thabit (RA)',
      'Abdullah ibn Rawahah (RA)', 'As\'ad ibn Zurarah (RA)', 'Al-Hubab ibn al-Mundhir (RA)',
      'Ubadah ibn as-Samit (RA)', 'Rafi\' ibn Malik (RA)'
    ],
    negativeFiguresEn: ['Abdullah ibn Ubayy (Chief of Hypocrites)'],
    referenceEn: 'Ibn Hisham Vol. 1, pp. 428–434; Usd al-Ghabah Vol. 2, p. 283'
  },
  'app-7': {
    nameEn: 'Banu Aws (Ansar of Madinah)',
    categoryEn: 'Ansar (Madinah)',
    regionEn: 'al-Madinah al-Munawwarah',
    historicalSignificanceEn: 'Paragon of Madinan defense and devotion; following Sa\'d ibn Mu\'adh\'s conversion, his entire clan entered Islam in a single day.',
    sahabaListEn: [
      'Sa\'d ibn Mu\'adh (RA)', 'Usayd ibn Hudayr (RA)', 'Muhammad ibn Maslamah (RA)',
      'Qatadah ibn an-Nu\'man (RA)', 'Salamah ibn Salamah (RA)', 'Sa\'d ibn Khaythamah (RA)',
      'Asim ibn Thabit (RA)', 'Khubayb ibn Adi (RA)', 'Abu Lubabah (RA)',
      'Abbad ibn Bishr (RA)', 'Khuzaymah ibn Thabit (RA)', 'Al-Bara ibn Azib (RA)'
    ],
    referenceEn: 'Ibn Hisham Vol. 1, pp. 436–437; Al-Isabah Vol. 3, p. 70'
  },
  'app-8': {
    nameEn: 'Ta\'if, Hawazin & Regional Arabian Tribes',
    categoryEn: 'Other Arabian Tribes',
    regionEn: 'Ta\'if, Najd & Dumat al-Jandal',
    historicalSignificanceEn: 'Comprises Banu Thaqif of Ta\'if, foster-mother Halimah\'s tribe Banu Sa\'d, pure-tongued Tamim, and northern Kalb.',
    sahabaListEn: [
      'Urwah ibn Mas\'ud (RA) [Thaqif]', 'Al-Mughirah ibn Shu\'bah (RA) [Thaqif]', 'Uthman ibn Abi al-As (RA) [Thaqif]',
      'Abu Mihjan ath-Thaqafi (RA) [Thaqif]', 'Ghaylan ibn Salamah (RA) [Thaqif]',
      'Halimah as-Sa\'diyyah (RA) [Sa\'d]', 'Ash-Shayma (RA) [Sa\'d]', 'Al-Harith ibn Abd al-Uzza (RA) [Sa\'d]',
      'Malik ibn Awf an-Nasri (RA) [Hawazin]',
      'Al-Harith ibn Abi Halah (RA) [Tamim]', 'Hind ibn Abi Halah (RA) [Tamim]', 'Al-Aqra ibn Habis (RA) [Tamim]',
      'Zayd ibn Harithah (RA) [Kalb]', 'Usamah ibn Zayd (RA) [Kalb]', 'Dihyah al-Kalbi (RA) [Kalb]'
    ],
    historicalFiguresEn: ['Al-Harith ibn Kaladah (Renowned Physician)'],
    negativeFiguresEn: ['Kinanah ibn Abd Yalil [Thaqif]', 'Durayd ibn as-Simmah (Slain commander at Hunayn)'],
    referenceEn: 'Ibn Hisham Vol. 4, pp. 123–125; Sahih al-Bukhari Hadith 4323'
  },
  'app-9': {
    nameEn: 'Jewish Tribes of Madinah & Khaybar',
    categoryEn: 'Jewish Tribes',
    regionEn: 'Madinah & Khaybar',
    historicalSignificanceEn: 'Banu Qaynuqa, Banu Nadir, Banu Qurayzah, and Khaybar fortresses whose repeated violations of the Madinan covenant ended in conflict.',
    sahabaListEn: [
      'Abdullah ibn Salam (RA) [Qaynuqa]', 'Mukhayriq (RA) [Nadir]', 'Umm al-Mu\'minin Safiyyah bint Huyayy (RA)'
    ],
    negativeFiguresEn: [
      'Huyayy ibn Akhtab [Nadir]', 'Ka\'b ibn al-Ashraf [Nadir]', 'Ka\'b ibn Asad [Qurayzah]',
      'Sallam ibn Abil-Huqayq [Khaybar]', 'Kinanah ibn ar-Rabi [Khaybar]', 'Marhab [Khaybar Champion]'
    ],
    referenceEn: 'Ibn Hisham Vol. 2, p. 220; Ar-Rahiq al-Makhtum, pp. 312–314'
  },
  'app-10': {
    nameEn: 'Other Quraysh Branches (Abd al-Dar, Jumah, Sahm & Amir)',
    categoryEn: 'Quraysh Lineage',
    regionEn: 'Makkah al-Mukarramah',
    historicalSignificanceEn: 'Quraysh branches entrusted with the Kaaba keys (Hijabah), main war standard (Liwa), divination arrows (Azlam), and litigation.',
    sahabaListEn: [
      'Mus\'ab ibn Umayr (RA) [Abd al-Dar]', 'Uthman ibn Talhah (RA) [Abd al-Dar]',
      'Uthman ibn Maz\'un (RA) [Jumah]', 'Qudamah ibn Maz\'un (RA) [Jumah]',
      'Amr ibn al-As (RA) [Sahm]', 'Khabbab ibn al-Aratt (RA) [Sahm]',
      'Abu Ubaydah ibn al-Jarrah (RA) [Harith]', 'Suhayl ibn Amr (RA) [Amir]',
      'Abu Jandal (RA) [Amir]', 'Abdullah ibn Suhayl (RA) [Amir]'
    ],
    negativeFiguresEn: ['Umayyah ibn Khalaf (slain at Badr)', 'Ubayy ibn Khalaf (slain at Uhud)', 'An-Nadr ibn al-Harith'],
    referenceEn: 'Al-Isabah Vol. 4, p. 351; Usd al-Ghabah Vol. 1, p. 396'
  },
  'app-11': {
    nameEn: 'Banu Khuza\'ah & Banu Bakr (Hudaybiyyah & Conquest of Makkah)',
    categoryEn: 'Allied Tribes',
    regionEn: 'Makkah & Hudaybiyyah Region',
    historicalSignificanceEn: 'Khuza\'ah allied with the Prophet (PBUH) and Bakr with Quraysh at Hudaybiyyah; Bakr\'s night raid at al-Watir triggered the Conquest of Makkah.',
    sahabaListEn: [
      'Budayl ibn Waraqah (RA)', 'Amr ibn Salim al-Khuza\'i (RA)', 'Imran ibn Husayn (RA) [Khuza\'ah]',
      'Nawfal ibn Mu\'awiyah (RA) [Bakr]', 'Shuja\' ibn Wahb (RA)'
    ],
    historicalFiguresEn: ['Treaty-breaking leaders of Banu Bakr prior to Makkah Conquest'],
    referenceEn: 'Ar-Rahiq al-Makhtum, pp. 391–393; Ibn Hisham Vol. 3, p. 322'
  },
  'app-12': {
    nameEn: 'Banu Ghifar, Aslam & Banu Daws',
    categoryEn: 'Bedouin & South Arabia',
    regionEn: 'Waddan & South Arabia (Tihamah/Yemen)',
    historicalSignificanceEn: 'Left caravan raiding behind to become exemplary servants of Islam; Daws produced Islam\'s top Hadith narrator, Abu Hurayrah (RA).',
    sahabaListEn: [
      'Abu Dharr al-Ghifari (RA) [Ghifar]', 'Anis ibn Junadah (RA) [Ghifar]',
      'Abu Hurayrah (RA) [Daws]', 'At-Tufayl ibn Amr ad-Dawsi (RA) [Daws]',
      'Buraydah al-Aslami (RA) [Aslam]', 'Salamah ibn al-Akwa\' (RA) [Aslam]'
    ],
    referenceEn: 'Sahih al-Bukhari Hadith 3524 & 4392; Al-Isabah Vol. 7, p. 107'
  },
  'app-13': {
    nameEn: 'Banu Ghatafan & Banu Hanifah (Trench & Riddah Wars)',
    categoryEn: 'Najd & Central Arabia',
    regionEn: 'Najd & Al-Yamamah',
    historicalSignificanceEn: 'Site of psychological diplomacy at the Battle of the Trench, Makkah\'s first wheat embargo, and confrontation with false prophet Musaylimah.',
    sahabaListEn: [
      'Nu\'aym ibn Mas\'ud (RA) [Ghatafan]', 'Thumamah ibn Uthal (RA) [Hanifah]', 'Adi ibn Hatim at-Ta\'i (RA) [Tayy]'
    ],
    historicalFiguresEn: ['Uyaynah ibn Hisn [Ghatafan]', 'Al-Harith ibn Awf [Ghatafan]'],
    negativeFiguresEn: ['Musaylimah al-Kadhdhab [Hanifah]'],
    referenceEn: 'Ibn Hisham Vol. 2, p. 214; Al-Bidayah wan-Nihayah Vol. 6, pp. 318–326'
  },
  'app-14': {
    nameEn: 'Other Yemeni Tribes (Ash\'ar, Bajilah & Allies)',
    categoryEn: 'Yemeni Tribes',
    regionEn: 'Yemen & Southern Arabia',
    historicalSignificanceEn: 'Tender-hearted tribesmen of Yemen of whom the Prophet (PBUH) testified: "Faith is Yemeni and wisdom is Yemeni."',
    sahabaListEn: [
      'Abu Musa al-Ash\'ari (RA) [Ash\'ar]', 'Jarir ibn Abdullah al-Bajali (RA) [Bajilah]',
      'At-Tufayl ibn al-Harith (RA)', 'Al-Abbas ibn Mirdas (RA)'
    ],
    referenceEn: 'Usd al-Ghabah Vol. 3, p. 457'
  },
  'app-15': {
    nameEn: 'Banu Asad ibn Khuzaymah (Non-Quraysh Asad)',
    categoryEn: 'Najd / Northern Arabia',
    regionEn: 'Najd Plateau',
    historicalSignificanceEn: 'Tribe of Abdullah ibn Jahsh (commander of the first military expedition) and Mother of the Believers Zaynab bint Jahsh (RA).',
    sahabaListEn: [
      'Abdullah ibn Jahsh (RA) [First Sariyyah Commander]',
      'Umm al-Mu\'minin Zaynab bint Jahsh (RA)',
      'Ukkashah ibn Mihsan (RA) [Promised Paradise without reckoning]'
    ],
    historicalFiguresEn: ['Tulayhah ibn Khuwaylid al-Asadi (repented after Riddah & fought heroically at al-Qadisiyyah)'],
    referenceEn: 'Al-Isabah Vol. 4, p. 317'
  },
  'app-16': {
    nameEn: 'Banu Muzaynah & Banu Juhaynah (Madinan Allied Tribes)',
    categoryEn: 'Frontier Allied Tribes',
    regionEn: 'Outskirts of Madinah & Caravan Routes',
    historicalSignificanceEn: 'Loyal coastal & caravan-route allies who aided the Hijrah and produced famed commanders of the Persian conquests.',
    sahabaListEn: [
      'Ka\'b ibn Zuhayr (RA) [Poet of "Banat Su\'ad" gifted the Prophet\'s cloak]',
      'An-Nu\'man ibn Muqarrin (RA) [Heroic Commander at Nihawand]',
      'Uqbah ibn Amir al-Juhani (RA)'
    ],
    referenceEn: 'Ibn Hisham Vol. 4, p. 153; Al-Isabah Vol. 5, p. 322'
  },
  'app-17': {
    nameEn: 'Banu Ghassan (Christian Arab Vassals of Syria)',
    categoryEn: 'Roman Allied Tribe',
    regionEn: 'Syria & Sham Frontier',
    historicalSignificanceEn: 'Byzantine Arab client rulers; their murder of the Prophet\'s envoy al-Harith ibn Umayr sparked the historic Battle of Mu\'tah.',
    sahabaListEn: [],
    negativeFiguresEn: [
      'Shurahbil ibn Amr al-Ghassani (Executed the Prophet\'s envoy)',
      'Al-Harith ibn Abi Shimr al-Ghassani (Christian ruler of Damascus)'
    ],
    referenceEn: 'Ar-Rahiq al-Makhtum, pp. 354–355'
  },
  'app-18': {
    nameEn: 'Banu Tayy (Proverbial Tribe of Arabian Generosity)',
    categoryEn: 'Northern Arabia',
    regionEn: 'Shammar Mountains & Najd Border',
    historicalSignificanceEn: 'Clan of legendary philanthropist Hatim at-Ta\'i; both his son Adi and daughter Safanah later embraced Islam as honored Companions.',
    sahabaListEn: ['Adi ibn Hatim (RA)', 'Safanah bint Hatim (RA)'],
    historicalFiguresEn: ['Hatim at-Ta\'i (Legend of pre-Islamic Arabian hospitality)'],
    referenceEn: 'Al-Isabah Vol. 4, p. 57'
  },
  'app-19': {
    nameEn: 'Banu Kindah (Royal Dynasty of Yemen & Hadhramaut)',
    categoryEn: 'Yemeni Dynasty',
    regionEn: 'Hadhramaut & Southern Arabia',
    historicalSignificanceEn: 'Princely kingdom of pre-Islamic Arabia and homeland of the famed pre-Islamic poet Imru\' al-Qays.',
    sahabaListEn: [
      'Al-Ash\'ath ibn Qays (RA) [Yemeni Chieftain]', 'Wa\'il ibn Hujr (RA) [Prince of Hadhramaut]'
    ],
    historicalFiguresEn: ['Imru\' al-Qays (Foremost pre-Islamic poet)'],
    referenceEn: 'Usd al-Ghabah Vol. 1, p. 117'
  },
  'app-20': {
    nameEn: 'Banu Abd al-Qays (Eastern Arabia / Bahrain)',
    categoryEn: 'Eastern Arabian Tribe',
    regionEn: 'Bahrain & Arabian Gulf Coast',
    historicalSignificanceEn: 'Early voluntary converts praised by the Prophet (PBUH) for possessing two beloved qualities: forbearance and sound deliberation.',
    sahabaListEn: ['Al-Ashajj al-Asari (RA) [Tribal Chieftain]', 'Munqidh ibn Hayyan (RA)'],
    referenceEn: 'Sahih Muslim, Kitab al-Iman 18; Al-Isabah Vol. 1, p. 350'
  },
  'app-21': {
    nameEn: 'Christian Tribe of Najran (Banu al-Harith ibn Ka\'b)',
    categoryEn: 'Christian Arab Tribe',
    regionEn: 'Najran (Southern Arabia)',
    historicalSignificanceEn: 'Visited Al-Masjid an-Nabawi for interfaith dialogue culminating in the Quranic Mubahalah challenge before entering a peaceful pact.',
    sahabaListEn: [],
    historicalFiguresEn: ['Abdul Masih (al-Aqib)', 'Al-Ayham (as-Sayyid) [Najran Delegation Leaders]'],
    referenceEn: 'Ibn Hisham Vol. 2, pp. 216–217'
  },
  'app-22': {
    nameEn: 'Banu al-Mustaliq (Branch of Khuza\'ah)',
    categoryEn: 'Coastal Arab Tribe',
    regionEn: 'By the Well of al-Muraysi\'',
    historicalSignificanceEn: 'Site of the Expedition of al-Muraysi\' and the Prophet\'s marriage to Juwayriyyah (RA), freeing over 100 captive families.',
    sahabaListEn: [
      'Umm al-Mu\'minin Juwayriyyah bint al-Harith (RA)', 'Al-Harith ibn Abi Dirar (RA) [Chief & Father]'
    ],
    referenceEn: 'Sahih al-Bukhari Hadith 4141; Ar-Rahiq al-Makhtum, p. 320'
  },
  'app-23': {
    nameEn: 'Banu Mudlij (Branch of Kinanah)',
    categoryEn: 'Kinanah Branch',
    regionEn: 'Coastal Hijaz Desert',
    historicalSignificanceEn: 'Renowned across Arabia as master trackers (Qiyafah) able to read footprints across desert sands.',
    sahabaListEn: [
      'Suraqah ibn Malik (RA) [Tracked the Prophet during Hijrah, repented after his horse sank & later wore Khosrow\'s bracelets]'
    ],
    referenceEn: 'Sahih al-Bukhari, Kitab al-Manaqib Hadith 3906'
  },
  'app-24': {
    nameEn: 'Banu Lakhm & Banu Judham (Syrian Frontier Allies)',
    categoryEn: 'Roman Frontier Tribes',
    regionEn: 'Syria & Ma\'an Borderland',
    historicalSignificanceEn: 'Arab tribes on the Byzantine frontier serving as Roman auxiliaries during Mu\'tah and Tabuk.',
    sahabaListEn: [
      'Farwah ibn Amr al-Judhami (RA) [Byzantine Arab governor of Ma\'an crucified for embracing Islam]'
    ],
    referenceEn: 'Al-Isabah Vol. 5, p. 362'
  },
  'app-25': {
    nameEn: 'Banu Sulaym (Fierce Warrior Tribe Near Madinah)',
    categoryEn: 'Bedouin Warrior Tribe',
    regionEn: 'Between Najd & Hijaz',
    historicalSignificanceEn: 'Initially joined the Trench coalition yet later embraced Islam wholeheartedly, marching 1,000 strong at the Conquest of Makkah and Hunayn.',
    sahabaListEn: [
      'Al-Khansa (RA) [Foremost elegiac poetess whose four sons were martyred at al-Qadisiyyah]',
      'Mu\'awiyah ibn al-Hakam as-Sulami (RA)'
    ],
    referenceEn: 'Usd al-Ghabah Vol. 5, p. 445'
  },
  'app-26': {
    nameEn: 'Banu Abs & Banu Dhubyan (Branches of Ghatafan)',
    categoryEn: 'Ghatafan Branch',
    regionEn: 'Najd Plateau',
    historicalSignificanceEn: 'Waged the famous 40-year War of Dahis and al-Ghabra in pre-Islamic Arabia before accepting Islam in 9 AH.',
    sahabaListEn: ['Hudhayfah ibn al-Yaman (RA) [Confidant of the Prophet\'s Secrets]'],
    historicalFiguresEn: ['Antarah ibn Shaddad (Legendary pre-Islamic warrior & poet)'],
    referenceEn: 'Al-Isabah Vol. 2, p. 174; Al-Bidayah wan-Nihayah 5/115'
  },
  'app-27': {
    nameEn: 'Banu Hamdan (Influential Yemeni Tribe)',
    categoryEn: 'Yemeni Tribes',
    regionEn: 'Yemen Region',
    historicalSignificanceEn: 'After hearing a single sermon from Ali ibn Abi Talib (RA), the entire tribe accepted Islam in one day—causing the Prophet (PBUH) to prostrate in gratitude.',
    sahabaListEn: ['Malik ibn Namat al-Hamdani (RA) [Tribal Leader]'],
    referenceEn: 'Al-Bidayah wan-Nihayah Vol. 5, p. 103; Al-Isabah 6/232'
  },
  'app-28': {
    nameEn: 'Banu Khath\'am (Warrior Tribe Between Hijaz & Yemen)',
    categoryEn: 'Southern Arabian Tribe',
    regionEn: 'Borderlands of Hijaz & Yemen',
    historicalSignificanceEn: 'Resisted Abrahah\'s march before Islam and linked to a famous Hadith during the Farewell Pilgrimage.',
    sahabaListEn: [
      'Asma bint Umays (RA) [Rarely honored as wife of Ja\'far ibn Abi Talib, Abu Bakr & Ali (RA) successively]'
    ],
    referenceEn: 'Sahih al-Bukhari Hadith 1513; Ibn Hisham Vol. 1, p. 46'
  },
  'app-29': {
    nameEn: 'Banu Hudhayl (Eloquent Highland Poets Near Makkah)',
    categoryEn: 'Hijazi Tribe',
    regionEn: 'Mountain Valleys Near Makkah',
    historicalSignificanceEn: 'Celebrated for unmatched Arabic poetry; their Lihyan sub-clan committed the treacherous tragedy of ar-Raji\', though Hudhayl also gave Islam one of its greatest jurists.',
    sahabaListEn: [
      'Abdullah ibn Mas\'ud (RA) [Supreme jurist, exegete & master reciter of the Quran]'
    ],
    referenceEn: 'Sahih al-Bukhari Hadith 3989; Al-Isabah Vol. 4, p. 188'
  },
  'app-30': {
    nameEn: 'Banu Amir ibn Sa\'sa\'ah (Powerful Najdi Tribe)',
    categoryEn: 'Najdi Tribe',
    regionEn: 'Najd Plateau',
    historicalSignificanceEn: 'Site of the tragic Bi\'r Ma\'unah betrayal slaying 70 Quranic scholars (Qurra\'), yet also the tribe of the Prophet\'s final wife.',
    sahabaListEn: ['Umm al-Mu\'minin Maymunah bint al-Harith (RA) [Final Wife of the Prophet PBUH]'],
    negativeFiguresEn: ['Amir ibn at-Tufayl (Plotted against the Prophet & perished by plague)'],
    referenceEn: 'Sahih al-Bukhari Hadith 4090; Al-Isabah Vol. 8, p. 176'
  },
  'app-31': {
    nameEn: 'Banu Jurhum (Ancient Yemeni Settlers of Makkah)',
    categoryEn: 'Ancient Arabian Tribe',
    regionEn: 'Ancient Makkah',
    historicalSignificanceEn: 'First settled by the spring of Zamzam; taught Prophet Ismail (AS) classical Arabic and forged marriage ties with him.',
    sahabaListEn: [],
    historicalFiguresEn: ['Mudad ibn Amr al-Jurhumi (Father-in-law of Ismail AS & Jurhum chief)'],
    referenceEn: 'Sahih al-Bukhari Hadith 3364; Ibn Hisham Vol. 1, p. 111'
  },
  'app-32': {
    nameEn: 'Banu Quda\'ah (Great Northern Tribal Confederation)',
    categoryEn: 'Northern Tribal Confederation',
    regionEn: 'Syria & Sham Frontier',
    historicalSignificanceEn: 'Byzantine-allied northern confederation confronted during Amr ibn al-As\'s Dhat as-Salasil expedition in 8 AH.',
    sahabaListEn: ['Usamah ibn Zayd (RA) [Led the Prophet\'s final military dispatch toward their frontier]'],
    referenceEn: 'Ar-Rahiq al-Makhtum, pp. 378–379; Usd al-Ghabah Vol. 4, p. 233'
  },
  'app-33': {
    nameEn: 'Banu Ashja\' (Allies of Trench & Conquest of Makkah)',
    categoryEn: 'Ghatafan Branch',
    regionEn: 'Between Najd & Madinah',
    historicalSignificanceEn: 'Initially joined the Trench confederates, then came 100-strong to Madinah accepting Islam voluntarily and carrying a banner at Makkah\'s conquest.',
    sahabaListEn: [
      'Awf ibn Malik al-Ashja\'i (RA) [Standard-bearer at Makkah Conquest]', 'Ma\'qil ibn Yasar al-Ashja\'i (RA)'
    ],
    referenceEn: 'Al-Isabah Vol. 5, p. 39'
  },
  'app-34': {
    nameEn: 'Banu Shayban (Branch of Bakr ibn Wa\'il)',
    categoryEn: 'Iraqi Frontier Tribe',
    regionEn: 'Iraq & Persian Borderland',
    historicalSignificanceEn: 'Defeated the Sassanid Persian army at pre-Islamic Dhu Qar and initiated the Islamic conquest of Iraq under Abu Bakr (RA).',
    sahabaListEn: [
      'Al-Muthanna ibn Harithah ash-Shaybani (RA) [Chieftain & pioneer conqueror of Iraq]'
    ],
    referenceEn: 'Al-Bidayah wan-Nihayah Vol. 6, p. 344; Al-Isabah 6/265'
  },
  'app-35': {
    nameEn: 'Himyar (Ancient Royal Dynasty of Yemen)',
    categoryEn: 'Yemeni Dynasty',
    regionEn: 'Southern Arabia & Yemen',
    historicalSignificanceEn: 'Heirs to Yemen\'s ancient Tubba\' kings; upon receiving their letter of submission in 9 AH, the Prophet (PBUH) dispatched Mu\'adh ibn Jabal (RA) as teacher.',
    sahabaListEn: [
      'Dhul-Kala\' al-Himyari (RA) [Influential Yemeni king who renounced royal luxury for Islam]'
    ],
    referenceEn: 'Ibn Hisham Vol. 4, p. 239; Usd al-Ghabah 2/143'
  },
  'app-36': {
    nameEn: 'Banu Taghlib (Mighty Christian Tribe on Iraqi Frontier)',
    categoryEn: 'Christian Arab Tribe',
    regionEn: 'Iraq & Mesopotamia Frontier',
    historicalSignificanceEn: 'Fought the 40-year Basus War; under Umar (RA), incorporated into the Islamic state paying double charity rather than Jizyah.',
    sahabaListEn: [],
    negativeFiguresEn: ['Sajah bint al-Harith (False claimant to prophethood who later married Musaylimah)'],
    referenceEn: 'Al-Bidayah wan-Nihayah Vol. 6, pp. 320–322'
  },
  'app-37': {
    nameEn: 'Banu Ukl & Banu Uraynah (Bedouin Tribes Noted in Hadith)',
    categoryEn: 'Bedouin Tribes',
    regionEn: 'Desert of Najd',
    historicalSignificanceEn: 'Recorded in Sahih al-Bukhari (Kitab al-Maghazi): treated kindly in Madinah, they regained health then betrayed and murdered the herdsman.',
    sahabaListEn: [],
    referenceEn: 'Sahih al-Bukhari, Kitab al-Maghazi Hadith 4610'
  },
  'app-38': {
    nameEn: 'Al-Ahabish (Military Coalition Allied to Quraysh)',
    categoryEn: 'Military Coalition',
    regionEn: 'Valleys Surrounding Makkah',
    historicalSignificanceEn: 'Pact of desert clans (Banu al-Harith, al-Hun, etc.) surrounding Makkah who fought as key allies of Quraysh at Uhud and the Trench.',
    sahabaListEn: [],
    historicalFiguresEn: ['Al-Hulays ibn Alqamah (Coalition chief who rebuked Quraysh at Hudaybiyyah upon seeing sacrificial animals)'],
    referenceEn: 'Ibn Hisham Vol. 3, pp. 322–324 (Treaty of Hudaybiyyah)'
  },
  'app-39': {
    nameEn: 'Banu Bajilah (Warrior Tribe of Yemen)',
    categoryEn: 'Yemeni Warrior Tribe',
    regionEn: 'Yemen Region',
    historicalSignificanceEn: 'Housed the pagan sanctuary Dhul-Khalasah ("the Yemeni Kaaba"), which members of this very tribe demolished upon accepting Islam in 10 AH.',
    sahabaListEn: [
      'Jarir ibn Abdullah al-Bajali (RA) [Called by Umar "the Yusuf of this Ummah", who led the demolition of Dhul-Khalasah]'
    ],
    referenceEn: 'Sahih al-Bukhari Hadith 3020'
  },
  'app-40': {
    nameEn: 'Banu Azd (Ancestral Stem of the Ansar)',
    categoryEn: 'Ancestral Tribe of Ansar',
    regionEn: 'Ancient Yemen & Oman',
    historicalSignificanceEn: 'One of Arabia\'s oldest mega-tribes; after the Ma\'rib Dam collapse, their Aws and Khazraj branches settled Madinah while Omani Azd also embraced Islam early.',
    sahabaListEn: ['Mazin ibn Ghadubah (RA) [First person from Oman to embrace Islam]'],
    referenceEn: 'Al-Isabah Vol. 6, p. 41'
  }
};
