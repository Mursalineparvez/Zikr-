import { SahabaFamily, EmotionalStory, HadithPraise } from './sahabaData';
import { SAHABA_EN_ALL_107 } from './sahabaEnglishAll107Data';

export interface SahabaEnglishProfile {
  name: string;
  title: string;
  category: string;
  birthAndDeath: string;
  summary: string;
  islamAcceptance: string;
  keyVirtues: string[];
  detailedBiography?: string;
  emotionalStories?: EmotionalStory[];
  deathOrMartyrdom?: string;
  lessons?: string[];
  references?: string[];
  family?: SahabaFamily;
}

export const SAHABA_EN_DATABASE: Record<string, SahabaEnglishProfile> = {
  // =========================================================================
  // 1. RASHIDUN CALIPHS (#1 - #4)
  // =========================================================================
  'abu-bakr-siddiq': {
    name: 'Hazrat Abu Bakr As-Siddiq (RA)',
    title: 'As-Siddiq (The Truthful), Atiq (Freed from Hellfire), Khalifatur Rasulullah',
    category: '1. The Righteous Caliphs (#1)',
    birthAndDeath: 'Born: 573 CE, Makkah | Passed: 22 Jumada al-Thani, 13 AH (634 CE)',
    summary: 'The greatest human being after the Prophets, the first Caliph of Islam, and the lifelong closest companion and migration partner of Prophet Muhammad (PBUH). He sacrificed his entire wealth, family, and life for the establishment of Islam.',
    islamAcceptance: 'When Prophet Muhammad (PBUH) invited him to Tawheed, Abu Bakr embraced Islam immediately without a moment\'s doubt or hesitation. The Prophet (PBUH) testified: "I never called anyone to Islam without them showing hesitation, except Abu Bakr who accepted without delay." He subsequently used his vast trading wealth to purchase and free persecuted slaves including Bilal and Khabbab.',
    keyVirtues: [
      'The greatest human after the Prophets and the first among this Ummah to enter Paradise.',
      'The sole companion chosen by Allah to accompany the Prophet (PBUH) in the Cave of Thawr.',
      'Donated his entire household wealth for the expedition of Tabuk, leaving only Allah and His Messenger.',
      'Saved the Ummah through unwavering resolve against false prophets (Riddah wars) and Zakat deniers.',
      'Commissioned the first unified official compilation of the Holy Quran.',
      'Appointed directly by the Prophet (PBUH) to lead the daily prayers during his final illness.'
    ],
    detailedBiography: 'Abu Bakr Abdullah ibn Abi Quhafa was born into the noble Banu Taym clan of Quraysh. Renowned for integrity, generosity, and genealogy even in pre-Islamic times, he never worshipped idols nor drank alcohol. Following his conversion, he brought stalwarts like Uthman, Talha, Zubayr, and Sa\'d into the fold.\n\nThroughout every major battle—Badr, Uhud, Khandaq, Khaybar, and Hunayn—Abu Bakr stood as the Prophet\'s immovable sentinel. When the Prophet passed away and companions were stricken with grief, Abu Bakr delivered the monumental sermon: "Whoever worshipped Muhammad, Muhammad has died; but whoever worships Allah, Allah is Ever-Living and does not die."\n\nIn his brief two-year and three-month Caliphate, he stabilized the entire Arabian Peninsula, sent Usama\'s army northward, initiated campaigns that broke both the Sassanid Persian and Byzantine empires, and established the institutional bedrock of the Islamic state.',
    emotionalStories: [
      {
        title: 'Donating Everything at Tabuk',
        story: 'When Prophet Muhammad (PBUH) asked for contributions for the Tabuk expedition, Umar brought half his wealth. Then Abu Bakr arrived with everything he possessed down to needles and thread. The Prophet asked: "O Abu Bakr, what have you left for your family?" He calmly replied: "I left for them Allah and His Messenger!" Umar wept and declared: "By Allah, I can never surpass you in any righteous deed."'
      },
      {
        title: 'Sacrifice in the Cave of Thawr',
        story: 'During the Hijrah, Abu Bakr entered the Cave of Thawr first, tearing his cloak to seal every hole against serpents. Finding one hole unsealed, he placed his bare heel over it. As the Prophet slept on his lap, a venomous snake bit Abu Bakr\'s heel. He endured the excruciating pain without moving so as not to wake the Prophet, until his tears fell on the Prophet\'s blessed face. The Prophet applied his saliva, miraculously curing the poison instantly.'
      }
    ],
    deathOrMartyrdom: 'In Jumada al-Thani 13 AH, Abu Bakr developed a severe fever lasting 15 days. He passed away at the age of 63, having willed that all state stipends be returned to the treasury. He was laid to rest beside the blessed shoulder of Prophet Muhammad (PBUH) in Madinah.',
    lessons: [
      'Absolute submission and trust in Allah and His Messenger is the pinnacle of faith.',
      'True leadership means serving the public with humbleness and zero worldly attachment.',
      'Spiritual courage and clarity in moments of existential crisis preserves an entire civilization.'
    ],
    references: ['Hayatus Sahaba (Maulana Yusuf Kandhlawi)', 'Siyar A\'lam al-Nubala (Imam Adh-Dhahabi)', 'Tarikh al-Tabari', 'Sahih al-Bukhari'],
    family: {
      fatherEn: 'Abu Quhafa (Uthman ibn Amir)',
      motherEn: 'Umm al-Khayr Salma bint Sakhr',
      tribeOrClanEn: 'Banu Taym clan of Quraysh',
      wivesEn: ['Qutaylah bint Abd al-Uzza', 'Umm Ruman bint Amir (Mother of Aisha)', 'Asma bint Umays', 'Habibah bint Kharijah'],
      sonsEn: ['Abdullah ibn Abi Bakr', 'Abdur Rahman ibn Abi Bakr', 'Muhammad ibn Abi Bakr'],
      daughtersEn: ['Asma bint Abi Bakr (Dhat an-Nitaqayn)', 'Umm al-Mu\'minin Aisha Siddiqah (RA)', 'Umm Kulthum bint Abi Bakr'],
      keyRelativesEn: ['Prophet Muhammad (PBUH) — Honored Son-in-law (Husband of Aisha)', 'Zubayr ibn al-Awwam — Son-in-law (Husband of Asma)', 'Al-Qasim ibn Muhammad — Grandson & Top Jurist of Madinah'],
      overviewEn: 'The family of Abu Bakr holds the unique historical honor where four generations—parents, children, and grandchildren—were all honored companions of the Prophet (PBUH).'
    }
  },

  'umar-ibn-khattab': {
    name: 'Hazrat Umar Al-Faruq (RA)',
    title: 'Al-Faruq (The Distinguisher of Truth and Falsehood), Amir al-Mu\'minin',
    category: '1. The Righteous Caliphs (#2)',
    birthAndDeath: 'Born: 583 CE, Makkah | Martyred: 26 Dhu al-Hijjah, 23 AH (644 CE)',
    summary: 'The second Caliph of Islam, renowned for peerless justice, statecraft, and courage. His administration established the Hijri calendar, judiciary, and public welfare system, while liberating Jerusalem, Persia, and the Levant from tyranny.',
    islamAcceptance: 'Converted in the 6th year of Prophethood as an answered prayer of the Prophet (PBUH): "O Allah, strengthen Islam through whichever of these two men is more beloved to You: Abu Jahl or Umar." Having set out with a drawn sword to kill the Prophet, his heart was melted upon hearing Surah Ta-Ha recited in the home of his sister Fatimah. He marched to Dar al-Arqam, testified faith before the Prophet, and immediately led the Muslims to pray publicly before the Ka\'bah.',
    keyVirtues: [
      'The first leader to be titled "Amir al-Mu\'minin" (Commander of the Faithful).',
      'Prophet (PBUH) stated: "If there were to be a prophet after me, it would be Umar."',
      'Over 20 Quranic verses were revealed confirming Umar\'s personal counsel (Muwafaqat Umar).',
      'Instituted the Islamic calendar (Hijri era), public treasury (Bayt al-Mal), courts, and police patrols.',
      'Satan fled from any path or valley upon which Umar walked.',
      'Liberated Jerusalem without shedding a drop of blood, guaranteeing protection to all Christians and Jews.'
    ],
    detailedBiography: 'Umar belonged to the Banu Adi clan of Quraysh, serving as the chief diplomat and mediator of Makkah before Islam. After embracing Islam, his conversion broke the barrier of fear, allowing Muslims to worship openly.\n\nDuring his 10-year Caliphate (13–23 AH), Islamic civilization expanded rapidly, crushing the Persian Sassanid empire at Qadisiyyah and Nahavand, and liberating Syria, Palestine, and Egypt from Byzantine hegemony. Yet he lived in utmost austerity—wearing garments with 14 patches, sleeping under palm trees, and carrying sacks of flour on his own back at night to feed destitute orphans and widows.',
    emotionalStories: [
      {
        title: 'Night Patrol and the Weeping Children',
        story: 'While patrolling Madinah at night with Aslam, Umar spotted a fire in the desert. He found a destitute mother boiling pebbles in water to console her starving children until they fell asleep. Umar wept bitterly, hurried back to the state treasury, loaded a sack of flour, fat, and dates onto his own back. When Aslam offered to carry it, Umar insisted: "Will you carry my burden of sins on the Day of Judgment?" Umar cooked porridge himself, blew the fire until smoke filled his beard, and fed the children until they giggled.'
      },
      {
        title: 'Entering Jerusalem on Foot',
        story: 'When Jerusalem surrendered, Patriarch Sophronius requested that Caliph Umar receive the keys in person. Umar rode with a single servant, alternating riding and walking with the servant. Upon reaching Jerusalem, it was the servant\'s turn to ride and Umar walked holding the reins in dusty, patched clothing. The Byzantine dignitaries bowed in awe, realizing this was a prophetically just ruler.'
      }
    ],
    deathOrMartyrdom: 'While leading the Fajr prayer in Masjid an-Nabawi in Dhu al-Hijjah 23 AH, he was fatally stabbed with a poisoned double-bladed dagger by Abu Lu\'lu\'ah al-Majusi. He passed away three days later and was buried beside Prophet Muhammad (PBUH) and Abu Bakr.',
    lessons: [
      'True power is accountable to divine justice; leaders are public servants, not monarchs.',
      'Fearing Allah in private guarantees righteousness in public administration.',
      'A ruler must personally inspect the welfare of the weakest citizen under his care.'
    ],
    references: ['Al-Faruq (Shibli Nomani)', 'Siyar A\'lam al-Nubala', 'Tarikh al-Tabari', 'Sahih al-Bukhari & Muslim'],
    family: {
      fatherEn: 'Khattab ibn Nufayl',
      motherEn: 'Hantamah bint Hisham',
      tribeOrClanEn: 'Banu Adi clan of Quraysh',
      wivesEn: ['Zaynab bint Maz\'un', 'Umm Kulthum bint Ali (Granddaughter of the Prophet)', 'Jamilah bint Thabit', 'Atikah bint Zayd'],
      sonsEn: ['Abdullah ibn Umar (Top Jurist & Hadith Narrator)', 'Ubaydullah ibn Umar', 'Asim ibn Umar (Grandfather of Caliph Umar ibn Abd al-Aziz)', 'Zayd ibn Umar'],
      daughtersEn: ['Umm al-Mu\'minin Hafsah bint Umar (RA)', 'Fatimah bint Umar', 'Ruqayyah bint Umar'],
      keyRelativesEn: ['Zayd ibn al-Khattab — Heroic older brother martyred at Yamama', 'Fatimah bint al-Khattab — Sister whose Quran recitation caused his conversion', 'Sa\'id ibn Zayd — Brother-in-law & Ashara companion'],
      overviewEn: 'The lineage of Umar produced towering personalities, including his daughter Hafsah who guarded the original Quran, his son Abdullah the premier jurist, and his great-grandson Umar ibn Abd al-Aziz.'
    }
  },

  'uthman-bin-affan': {
    name: 'Hazrat Uthman Ibn Affan (RA)',
    title: 'Dhun-Nurain (Possessor of Two Lights), Jami al-Quran, Al-Ghani (The Generous)',
    category: '1. The Righteous Caliphs (#3)',
    birthAndDeath: 'Born: 576 CE, Ta\'if | Martyred: 18 Dhu al-Hijjah, 35 AH (656 CE)',
    summary: 'The third Caliph of Islam, renowned for modesty, immense generosity, and compiling the unified Mushaf of the Holy Quran. He financed naval fleets and public wells for the Muslim community.',
    islamAcceptance: 'Accepted Islam in the very earliest days through his close friend Abu Bakr. His uncle Hakam tied him with ropes and smothered him with palm-leaf smoke demanding he renounce Islam, but Uthman proclaimed: "By Allah, I will never abandon this true faith!" He subsequently led the first migration to Abyssinia with the Prophet\'s daughter Ruqayyah.',
    keyVirtues: [
      'The only man in human history to marry two daughters of a Prophet (Ruqayyah & Umm Kulthum).',
      'The angels themselves felt bashful in the presence of Uthman\'s supreme modesty.',
      'Purchased the Well of Rumah and gifted it to all Muslims, and funded the expansion of Masjid an-Nabawi.',
      'Equipped one-third of the entire Tabuk army (Army of Hardship) with 300 camels, 50 horses, and 1,000 gold dinars.',
      'Unified the entire Muslim world upon a single standard text of the Quran (Mushaf Uthmani).',
      'Commissioned the first organized Islamic naval fleet, conquering Cyprus and the Mediterranean coastlines.'
    ],
    detailedBiography: 'Uthman belonged to the wealthy and aristocratic Banu Umayyah clan. Renowned for beauty, cleanliness, and modesty, he devoted his enormous commercial fortune entirely to Islam. When water was scarce in Madinah, he bought the Jewish-owned well of Rumah for 35,000 dirhams and made it free forever.\n\nDuring his 12-year Caliphate (23–35 AH), Islamic borders expanded into North Africa, Armenia, and Khurasan. Recognizing varying dialects might cause division, he appointed Zayd ibn Thabit to produce master copies of the Quran from Hafsah\'s original, sending copies to every provincial capital.',
    emotionalStories: [
      {
        title: 'Siege of His House and Fasting on Martyrdom',
        story: 'When rebels besieged his home for 40 days cutting off water, young companions drew swords to fight, but Uthman forbade bloodshed: "I will never shed a drop of Muslim blood in the city of the Prophet." On his final night, he dreamt of the Prophet (PBUH) asking: "O Uthman, are you thirsty? You shall break your fast with us tomorrow." Fasting and reciting Surah Al-Baqarah, rebels stormed his room. As sword strikes landed, his blood spilled across verse 137: "So Allah will suffice you against them, and He is the Hearing, the Knowing."'
      }
    ],
    deathOrMartyrdom: 'Martyred on Friday, 18 Dhu al-Hijjah 35 AH at age 82 while fasting and reciting the Quran. Buried in Jannat al-Baqi in Madinah.',
    lessons: [
      'Modesty, gentleness, and forbearance are divine ornaments of righteous character.',
      'Wealth used for public welfare and divine cause creates eternal continuous charity (Sadaqah Jariyah).',
      'Protecting the unity and sacred text of the Quran safeguards generations of the Ummah.'
    ],
    references: ['Siyar A\'lam al-Nubala', 'Al-Bidayah wan-Nihayah', 'Tarikh al-Tabari', 'Sahih al-Bukhari'],
    family: {
      fatherEn: 'Affan ibn Abi al-As',
      motherEn: 'Arwa bint Kurayz (Cousin of Prophet Muhammad)',
      tribeOrClanEn: 'Banu Umayyah clan of Quraysh',
      wivesEn: ['Ruqayyah bint Muhammad', 'Umm Kulthum bint Muhammad', 'Na\'ilah bint al-Farafisah', 'Fatimah bint al-Walid'],
      sonsEn: ['Abdullah ibn Uthman (from Ruqayyah)', 'Amr ibn Uthman', 'Aban ibn Uthman (Prominent Jurist & Governor)', 'Walid ibn Uthman'],
      daughtersEn: ['Maryam bint Uthman', 'Umm Aban bint Uthman', 'Umm Amr bint Uthman', 'Aisha bint Uthman'],
      keyRelativesEn: ['Prophet Muhammad (PBUH) — Father-in-law (Father of Ruqayyah and Umm Kulthum)', 'Ali ibn Abi Talib — Cousin-in-law & 4th Caliph', 'Marwan ibn al-Hakam — Cousin'],
      overviewEn: 'Uthman\'s marital union with two of the Prophet\'s daughters earned him the immortal title Dhun-Nurain, cementing an inseparable bond with the Prophet\'s household.'
    }
  },

  'ali-bin-abi-talib': {
    name: 'Hazrat Ali Ibn Abi Talib (RA)',
    title: 'Asadullah (Lion of Allah), Haydar, Abu Turab, Amir al-Mu\'minin',
    category: '1. The Righteous Caliphs (#4)',
    birthAndDeath: 'Born: 600 CE inside Ka\'bah, Makkah | Martyred: 21 Ramadan, 40 AH (661 CE)',
    summary: 'The fourth Caliph of Islam, first child to embrace Islam, cousin and son-in-law of Prophet Muhammad (PBUH), renowned for peerless physical bravery, eloquence, and profound spiritual knowledge.',
    islamAcceptance: 'Raised from early childhood in the household of Prophet Muhammad (PBUH), Ali was only 10 years old when revelation began. Witnessing the Prophet and Khadijah praying, he accepted Islam immediately, becoming the very first youth to believe. On the night of Hijrah, Ali risked his life sleeping in the Prophet\'s bed to fool the assassins and returned all trusts left with the Prophet before migrating on foot to Madinah.',
    keyVirtues: [
      'Prophet (PBUH) stated at Ghadir Khumm: "Whomever I am his patron, Ali is his patron."',
      'Prophet (PBUH) declared: "I am the city of knowledge, and Ali is its gate."',
      'Conquered the impregnable Jewish fortress of Qamus at Khaybar, tearing down the heavy gate with his bare hands.',
      'Slew legendary Arab champions in single combat at Badr, Uhud, and Khandaq (including Amr ibn Abd Wudd).',
      'Husband of the Master of Women of Paradise, Sayyidah Fatimah az-Zahra (RA).',
      'Father of the leaders of youth in Paradise, Imam Hasan and Imam Husayn (RA).'
    ],
    detailedBiography: 'Ali was the son of the Prophet\'s uncle Abu Talib. He grew up under the direct tutelage of the Messenger of Allah. At the Battle of the Trench, when the formidable champion Amr ibn Abd Wudd leaped over the ditch challenging the Muslims, Ali stepped forward and defeated him in decisive combat. At Khaybar, the Prophet handed him the banner saying: "Tomorrow I will give the banner to a man who loves Allah and His Messenger, and whom Allah and His Messenger love." Ali slew Marhab and hoisted the Muslim standard over the citadel.\n\nHis Caliphate (35–40 AH) was marked by austere justice, anti-corruption reforms, and preservation of Quranic principles amidst civil strife. His sermons, letters, and sayings compiled in Nahj al-Balaghah represent the pinnacle of Arabic eloquence.',
    emotionalStories: [
      {
        title: 'Sleeping in the Prophet\'s Bed on Hijrah Night',
        story: 'Surrounded by swordsmen from every clan of Quraysh ready to strike simultaneously, Ali willingly lay in the Prophet\'s bed covered in his green mantle. He placed his life on the line without a tremor of fear, trusting the Prophet\'s promise: "Sleep in my bed; no harm shall touch you."'
      },
      {
        title: 'Mercy on the Battlefield for Allah\'s Sake',
        story: 'In battle, Ali knocked down an enemy warrior. The warrior spat in Ali\'s face in defiance. Ali stepped back, sheathed his sword, and walked away. Astonished, the warrior asked: "Why did you spare me when you could have killed me?" Ali replied: "Before you spat, I fought you purely for Allah; after you spat, I felt personal anger, and I refuse to kill any soul for my own ego." Shaken by such sublime sincerity, the warrior embraced Islam.'
      }
    ],
    deathOrMartyrdom: 'While entering the Kufa mosque for Fajr prayer on 19 Ramadan 40 AH, he was struck on the forehead with a poisoned sword by the Kharijite Abdur Rahman ibn Muljam. He succumbed to his wounds two days later at age 61. He instructed his sons to treat his assassin with justice and food, and forbid mutilation.',
    lessons: [
      'Courage without pure intention is mere violence; true valor is exercised purely for Allah.',
      'Knowledge coupled with humility and deep justice is the supreme mark of leadership.',
      'Generosity and kindness must extend even toward those who wrong or harm you.'
    ],
    references: ['Nahj al-Balaghah', 'Siyar A\'lam al-Nubala', 'Al-Isti\'ab', 'Sahih al-Bukhari & Muslim'],
    family: {
      fatherEn: 'Abu Talib ibn Abd al-Muttalib (Uncle of Prophet Muhammad)',
      motherEn: 'Fatimah bint Asad (Honored mother who raised the Prophet)',
      tribeOrClanEn: 'Banu Hashim clan of Quraysh',
      wivesEn: ['Fatimah az-Zahra (RA) (Daughter of the Prophet)', 'Umm al-Banin Fatimah bint Hizam', 'Asma bint Umays', 'Umamah bint Abi al-As (Granddaughter of the Prophet)'],
      sonsEn: ['Imam Hasan (RA)', 'Imam Husayn (RA)', 'Muhammad ibn al-Hanafiyyah', 'Abbas ibn Ali (Hero of Karbala)', 'Umar ibn Ali', 'Uthman ibn Ali'],
      daughtersEn: ['Sayyidah Zaynab bint Ali (Heroine of Karbala)', 'Umm Kulthum bint Ali (Wife of Caliph Umar)', 'Ruqayyah bint Ali'],
      keyRelativesEn: ['Prophet Muhammad (PBUH) — Beloved Cousin & Father-in-law', 'Ja\'far ibn Abi Talib (Dhu al-Janahayen) — Older Brother', 'Hamza ibn Abd al-Muttalib — Uncle & Chief of Martyrs'],
      overviewEn: 'Through Ali and Fatimah, the blessed noble household (Ahl al-Bayt) and prophetic progeny was preserved and continued for all future generations.'
    }
  },

  // =========================================================================
  // 2. THE TEN PROMISED PARADISE (#5 - #10)
  // =========================================================================
  'talha-ibn-ubaydullah': {
    name: 'Hazrat Talha ibn Ubaydullah (RA)',
    title: 'Ash-Shahid al-Hayy (The Living Martyr), Talhat al-Khayr (Talha of Goodness)',
    category: '2. The Ten Promised Paradise (#5)',
    birthAndDeath: 'Born: 594 CE, Makkah | Martyred: 36 AH (Battle of the Camel)',
    summary: 'One of the ten promised Paradise, legendary savior of Prophet Muhammad (PBUH) at Uhud who deflected arrows with his bare hands until his fingers were paralyzed.',
    islamAcceptance: 'Embraced Islam in early youth through the dawah of Abu Bakr. While trading in Busra (Syria), a Christian monk asked if Ahmad had appeared in Makkah. Upon returning, Talha inquired and immediately accepted Islam before the Prophet.',
    keyVirtues: [
      'Prophet (PBUH) called him "The Living Martyr walking on earth".',
      'Shielded the Prophet at Uhud receiving over 70 wounds from swords, spears, and arrows.',
      'Paralyzed his right hand deflecting arrows aimed at the Prophet\'s face.',
      'Immense generosity—donated 700,000 dirhams in a single day.'
    ],
    family: {
      fatherEn: 'Ubaydullah ibn Uthman',
      motherEn: 'Al-Sa\'bah bint al-Hadrami',
      tribeOrClanEn: 'Banu Taym clan of Quraysh',
      wivesEn: ['Umm Kulthum bint Abi Bakr', 'Hamnah bint Jahsh', 'Al-Fari\'ah bint Abi Sufyan', 'Su\'da bint Awf'],
      sonsEn: ['Muhammad ibn Talha (Al-Sajjad)', 'Imran ibn Talha', 'Musa ibn Talha', 'Zakariyya ibn Talha'],
      daughtersEn: ['Aisha bint Talha (Renowned scholar & narrator)', 'Umm Ishaq bint Talha', 'Al-Sa\'bah bint Talha'],
      keyRelativesEn: ['Abu Bakr As-Siddiq — Cousin & Father-in-law', 'Aisha Siddiqah — Sister-in-law'],
      overviewEn: 'The lineage of Talha was characterized by profound scholarship, generosity, and martyrdom in the service of early Islam.'
    }
  },

  'zubayr-ibn-al-awwam': {
    name: 'Hazrat Zubayr ibn al-Awwam (RA)',
    title: 'Hawariyy Rasulillah (The Disciple of the Messenger of Allah), Faris al-Islam',
    category: '2. The Ten Promised Paradise (#6)',
    birthAndDeath: 'Born: 594 CE, Makkah | Martyred: 36 AH (Wadi al-Siba\')',
    summary: 'The disciple of the Prophet (PBUH), first person in Islam to draw a sword in defense of the Messenger, nephew of Khadijah, and son of the Prophet\'s aunt Safiyyah.',
    islamAcceptance: 'Accepted Islam at age 15 through Abu Bakr. When rumors spread in Makkah that the Prophet had been killed, Zubayr marched with a drawn sword into the streets ready to fight all Quraysh, prompting the Prophet to make dua for him.',
    keyVirtues: [
      'Prophet (PBUH) stated: "Every prophet has a disciple, and my disciple is Zubayr."',
      'Fought with two swords simultaneously on horseback in every campaign.',
      'Single-handedly breached the impenetrable Byzantine fortress of Babylon in Egypt.',
      'Prophet (PBUH) sacrificed his parents for him at Khandaq: "May my father and mother be ransomed for you."'
    ],
    family: {
      fatherEn: 'Al-Awwam ibn Khuwaylid (Brother of Sayyidah Khadijah)',
      motherEn: 'Safiyyah bint Abd al-Muttalib (Aunt of Prophet Muhammad)',
      tribeOrClanEn: 'Banu Asad clan of Quraysh',
      wivesEn: ['Asma bint Abi Bakr (Dhat an-Nitaqayn)', 'Umm Kulthum bint Uqbah', 'Al-Halal bint Qays', 'Atikah bint Zayd'],
      sonsEn: ['Abdullah ibn al-Zubayr (Caliph & Great Warrior)', 'Urwah ibn al-Zubayr (Top Jurist & Historian of Madinah)', 'Mus\'ab ibn al-Zubayr (Fierce Commander)', 'Ja\'far ibn al-Zubayr'],
      daughtersEn: ['Khadijah bint al-Zubayr', 'Umm al-Hasan bint al-Zubayr', 'Aisha bint al-Zubayr'],
      keyRelativesEn: ['Prophet Muhammad (PBUH) — First Cousin & Uncle-in-law', 'Khadijah bint Khuwaylid — Paternal Aunt', 'Abu Bakr — Father-in-law'],
      overviewEn: 'Zubayr\'s family was one of the most distinguished in Islam; his sons Abdullah and Urwah became legendary statesmen and scholars.'
    }
  },

  'sad-ibn-abi-waqqas': {
    name: 'Hazrat Sa\'d ibn Abi Waqqas (RA)',
    title: 'Faris al-Islam (Knight of Islam), Conqueror of Persia, Answered Supplication',
    category: '2. The Ten Promised Paradise (#7)',
    birthAndDeath: 'Born: 595 CE, Makkah | Passed: 55 AH (Al-Aqiq, Madinah)',
    summary: 'Supreme commander who conquered the Persian Sassanid Empire at the epic Battle of Qadisiyyah, first person to shoot an arrow in the path of Allah, and maternal uncle of the Prophet (PBUH).',
    islamAcceptance: 'Accepted Islam at age 17 as the seventh person to embrace faith. His mother went on an absolute hunger strike demanding he renounce Islam, but Sa\'d firmly responded: "O mother! Even if you possessed one hundred souls and each left one by one, I would never leave Islam!"',
    keyVirtues: [
      'First warrior to shoot an arrow in the defense of Islam.',
      'Prophet (PBUH) said to him at Uhud: "Shoot, Sa\'d! May my father and mother be ransomed for you!"',
      'The Prophet prayed for him: "O Allah, answer Sa\'d whenever he calls upon You."',
      'Conquered Ctesiphon (Madain), capital of the Persian empire, and founded Kufa.'
    ],
    family: {
      fatherEn: 'Malik Abu Waqqas ibn Wuhayb',
      motherEn: 'Hamnah bint Sufyan',
      tribeOrClanEn: 'Banu Zuhrah clan of Quraysh (Maternal clan of Prophet)',
      wivesEn: ['Salma bint Khasfah', 'Mawiyyah bint Qays', 'Umm Hilal bint Rabi\'ah'],
      sonsEn: ['Umar ibn Sa\'d', 'Amir ibn Sa\'d', 'Ibrahim ibn Sa\'d', 'Mus\'ab ibn Sa\'d'],
      daughtersEn: ['Aisha bint Sa\'d (Prominent scholar who taught Imam Malik)', 'Umm al-Qasim bint Sa\'d', 'Hamdah bint Sa\'d'],
      keyRelativesEn: ['Aminah bint Wahb (Mother of the Prophet) — Paternal Cousin', 'Prophet Muhammad (PBUH) — Nephew by tribal kinship'],
      overviewEn: 'The Banu Zuhrah lineage of Sa\'d was universally revered by the Prophet, who would proudly introduce Sa\'d saying: "This is my maternal uncle; let anyone show me his uncle!"'
    }
  },

  'said-ibn-zayd': {
    name: 'Hazrat Sa\'id ibn Zayd (RA)',
    title: 'Ashara Mubashshara Companion, Hero of Yarmouk & Damascus',
    category: '2. The Ten Promised Paradise (#8)',
    birthAndDeath: 'Born: 593 CE, Makkah | Passed: 51 AH (Al-Aqiq, Madinah)',
    summary: 'One of the ten promised Paradise, son of Zayd ibn Amr who rejected idol worship before Islam, brother-in-law of Umar whose household Quran reading led to Umar\'s conversion.',
    islamAcceptance: 'Embraced Islam at the outset alongside his wife Fatimah bint al-Khattab. In pre-Islamic days, his father Zayd searched for the religion of Abraham, rejecting idolatry. Sa\'d immediately recognized the Prophet\'s divine mission.',
    keyVirtues: [
      'Promised Paradise directly by Prophet Muhammad (PBUH).',
      'Commanded the cavalry charge at the decisive Battle of Yarmouk.',
      'First appointed governor of Damascus following its conquest by Muslim forces.',
      'Renowned for unanswered worldly ambition, living an intensely ascetic life.'
    ],
    family: {
      fatherEn: 'Zayd ibn Amr ibn Nufayl (Monotheist before Islam)',
      motherEn: 'Fatimah bint Ba\'jah',
      tribeOrClanEn: 'Banu Adi clan of Quraysh',
      wivesEn: ['Fatimah bint al-Khattab (Sister of Caliph Umar)', 'Jamilah bint Qays', 'Al-Aliyah bint Anbasah'],
      sonsEn: ['Abdullah ibn Sa\'id', 'Abdur Rahman ibn Sa\'id', 'Zayd ibn Sa\'id'],
      daughtersEn: ['Atikah bint Sa\'id', 'Umm al-Hasan bint Sa\'id', 'Hamdah bint Sa\'id'],
      keyRelativesEn: ['Umar ibn al-Khattab — Brother-in-law & First Cousin', 'Atikah bint Zayd — Sister'],
      overviewEn: 'Sa\'id\'s home in Makkah was the blessed crucible where Surah Ta-Ha was read, leading directly to Umar\'s world-altering conversion.'
    }
  },

  'abdur-rahman-ibn-awf': {
    name: 'Hazrat Abdur Rahman ibn Awf (RA)',
    title: 'Tajir al-Rahman (The Merchant of the Most Merciful), Wealthiest Philanthropist',
    category: '2. The Ten Promised Paradise (#9)',
    birthAndDeath: 'Born: 580 CE, Makkah | Passed: 32 AH (Madinah)',
    summary: 'Master merchant and legendary philanthropist whose commercial genius financed entire armies, and the chief elector who arbitrated the election of Caliph Uthman.',
    islamAcceptance: 'Converted on the very second day of Islam through Abu Bakr. When he migrated to Madinah penniless, his Ansar brother Sa\'d ibn al-Rabi offered him half his fortune, but Abdur Rahman replied: "May Allah bless your wealth; just show me the way to the marketplace!"',
    keyVirtues: [
      'Prophet Muhammad (PBUH) prayed behind him in Salah during the expedition of Tabuk.',
      'Donated 40,000 gold dinars in a single day, followed by 500 horses and 1,500 camels.',
      'Willed 400 gold dinars to every surviving veteran of the Battle of Badr.',
      'His caravan entering Madinah with 700 loaded camels made the entire city shake with joy.'
    ],
    family: {
      fatherEn: 'Awf ibn Abd Awf',
      motherEn: 'Al-Shifa bint Awf (Midwife who delivered Prophet Muhammad)',
      tribeOrClanEn: 'Banu Zuhrah clan of Quraysh',
      wivesEn: ['Umm Kulthum bint Uqbah', 'Sahla bint Asim', 'Tumadir bint al-Asbagh'],
      sonsEn: ['Ibrahim ibn Abdur Rahman', 'Humayd ibn Abdur Rahman', 'Abu Salamah ibn Abdur Rahman (Top Jurist of Madinah)'],
      daughtersEn: ['Umm al-Qasim bint Abdur Rahman', 'Juwayriyah bint Abdur Rahman'],
      keyRelativesEn: ['Al-Shifa bint Awf — Mother who delivered the Prophet', 'Sa\'d ibn Abi Waqqas — Tribal Cousin'],
      overviewEn: 'Abdur Rahman\'s sons became preeminent jurists in Madinah, carrying forward their father\'s piety and intellectual heritage.'
    }
  },

  'abu-ubaidah-ibn-al-jarrah': {
    name: 'Hazrat Abu Ubaidah ibn al-Jarrah (RA)',
    title: 'Amin al-Ummah (The Trustworthy Trustee of this Nation), Supreme Commander of Sham',
    category: '2. The Ten Promised Paradise (#10)',
    birthAndDeath: 'Born: 583 CE, Makkah | Martyred: 18 AH (Plague of Amwas, Jordan)',
    summary: 'The Trustee of the Ummah, commander-in-chief who liberated Syria and Palestine, and whose humility made him treat his subordinates with tears of love.',
    islamAcceptance: 'Accepted Islam through Abu Bakr on the second day of dawah alongside Uthman and Abdur Rahman. During the Battle of Badr, his pagan father repeatedly blocked his path intending to kill him; Abu Ubaidah avoided him until forced to slay him, prompting Surah Al-Mujadilah verse 22.',
    keyVirtues: [
      'Prophet (PBUH) stated: "Every nation has a trustworthy guardian, and the trustee of this Ummah is Abu Ubaidah."',
      'Pulled two iron links of armor out of the Prophet\'s wounded cheek at Uhud with his teeth, breaking his incisors.',
      'Supreme commander who led the Muslim forces at Yarmouk and received the surrender of Damascus and Jerusalem.',
      'When Caliph Umar visited his commander\'s tent in Syria, he found only a sword, a shield, and a water skin.'
    ],
    family: {
      fatherEn: 'Amir ibn al-Jarrah',
      motherEn: 'Umaymah bint Ghanam',
      tribeOrClanEn: 'Banu al-Harith clan of Quraysh',
      wivesEn: ['Hind bint Jabir', 'Warqa bint Uthman'],
      sonsEn: ['Yazid ibn Abi Ubaidah', 'Umar ibn Abi Ubaidah'],
      daughtersEn: ['Fatimah bint Abi Ubaidah'],
      keyRelativesEn: ['Suhayl ibn Amr — Tribal Cousin', 'Utbah ibn Ghazwan — Close Military Comrade'],
      overviewEn: 'Abu Ubaidah\'s family line was marked by asceticism and profound dedication to the early Syrian frontier.'
    }
  },

  // =========================================================================
  // 3. EARLY PIONEERS & NOBLE MARTYRS (#11 - #26, #62, #63, #68, #75, #79)
  // =========================================================================
  'bilal-ibn-rabah': {
    name: 'Hazrat Bilal ibn Rabah (RA)',
    title: 'Muazzin al-Islam (Caller of Islam), Sayyiduna (Our Master), Sayyid al-Muazzinin',
    category: '3. Early Pioneers & Noble Martyrs (#11)',
    birthAndDeath: 'Born: 580 CE, Makkah | Passed: 20 AH (Damascus, Syria)',
    summary: 'The iconic caller to prayer whose golden voice proclaimed Tawheed over the Ka\'bah, who endured burning stones on his chest shouting "Ahad! Ahad!"',
    islamAcceptance: 'Enslaved by Umayyah ibn Khalaf, Bilal heard the message of Tawheed and immediately believed. Bound in iron chains and pinned under scorching boulders in the desert midday heat, he refused to utter words of disbelief, repeating "Ahad! Ahad!" (Allah is One!). Abu Bakr purchased and freed him.',
    keyVirtues: [
      'First Muazzin in Islamic history appointed personally by Prophet Muhammad (PBUH).',
      'Prophet (PBUH) heard his footsteps ahead of him in Paradise during the Miraj.',
      'Climbed atop the Ka\'bah on the Day of the Conquest of Makkah to proclaim the Azan.',
      'Umar ibn al-Khattab would say: "Abu Bakr is our master who freed our master (Bilal)."'
    ],
    family: {
      fatherEn: 'Rabah (Abyssinian freedman)',
      motherEn: 'Hamamah (Pious Abyssinian woman)',
      tribeOrClanEn: 'Banu Jumah (Allied / Freedman)',
      wivesEn: ['Hind al-Khawlaniyyah (Noble woman of Yemen)', 'Daughter of Abu al-Darda (Tribe)'],
      sonsEn: ['Ali ibn Bilal'],
      daughtersEn: ['Umm Kulthum bint Bilal'],
      keyRelativesEn: ['Khalid ibn Rabah — Brother who was also a devoted companion'],
      overviewEn: 'Bilal\'s legacy shattered racial barriers in Arabia, elevating a former Abyssinian slave to an eternal master of the Muslim Ummah.'
    }
  },

  'hamza-ibn-abdul-muttalib': {
    name: 'Hazrat Hamza ibn Abdul Muttalib (RA)',
    title: 'Asadullah wa Asadu Rasulihi (Lion of Allah and His Messenger), Sayyid ash-Shuhada',
    category: '3. Early Pioneers & Noble Martyrs (#12)',
    birthAndDeath: 'Born: 568 CE, Makkah | Martyred: 3 AH (Battle of Uhud)',
    summary: 'Chief of all martyrs in Paradise, paternal uncle and foster brother of Prophet Muhammad (PBUH), whose conversion electrified Makkah with invincible courage.',
    islamAcceptance: 'Returning from a hunting expedition, he learned that Abu Jahl had verbally abused and cursed the Prophet. Furiously marching to the Ka\'bah, Hamza struck Abu Jahl across the face with his bow, proclaiming: "Will you insult him when I follow his religion?!"',
    keyVirtues: [
      'Titled "Chief of All Martyrs" (Sayyid ash-Shuhada) in Paradise.',
      'Slew key pagan commanders in single duel at Badr (Utbah ibn Rabi\'ah, Shaybah).',
      'The Prophet wept bitterly over his martyred body at Uhud, praying 70 funeral prayers over him.',
      'Known as the invincible champion hunter and warrior of Quraysh.'
    ],
    family: {
      fatherEn: 'Abdul Muttalib ibn Hashim',
      motherEn: 'Halah bint Wuhayb',
      tribeOrClanEn: 'Banu Hashim clan of Quraysh',
      wivesEn: ['Salma bint Umays', 'Khawlah bint Qays', 'Bint al-Milla'],
      sonsEn: ['Ya\'la ibn Hamza', 'Umarah ibn Hamza'],
      daughtersEn: ['Umamah bint Hamza (Ward of the Prophet)'],
      keyRelativesEn: ['Prophet Muhammad (PBUH) — Nephew & Foster Brother', 'Ali ibn Abi Talib — Nephew', 'Abbas ibn Abd al-Muttalib — Brother'],
      overviewEn: 'Hamza was the supreme warrior-protector of Banu Hashim, sacrificing his life shielding the Messenger of Allah.'
    }
  },

  'musab-ibn-umayr': {
    name: 'Hazrat Mus\'ab ibn Umayr (RA)',
    title: 'Mus\'ab al-Khayr, The First Ambassador of Islam, Standard-Bearer of Uhud',
    category: '3. Early Pioneers & Noble Martyrs (#13)',
    birthAndDeath: 'Born: 598 CE, Makkah | Martyred: 3 AH (Battle of Uhud)',
    summary: 'The pampered, fragrant aristocratic youth of Makkah who gave up luxury, silk, and fortunes for Islam, became the first ambassador who transformed Madinah, and was martyred holding the Islamic banner.',
    islamAcceptance: 'He secretly embraced Islam at Dar al-Arqam. When his mother Khunnas bint Malik discovered his conversion, she imprisoned and disowned him, depriving him of all family wealth. Mus\'ab remained unshaken in poverty.',
    keyVirtues: [
      'Appointed by the Prophet as the First Ambassador of Islam to Yathrib (Madinah).',
      'Through his gentle Quran recitation, leaders like Sa\'d ibn Mu\'adh and Usayd ibn Hudayr accepted Islam.',
      'Standard-bearer of the Muslim army at Badr and Uhud.',
      'When both his hands were severed at Uhud, he clamped the banner with his chest until struck down.'
    ],
    family: {
      fatherEn: 'Umayr ibn Hashim',
      motherEn: 'Khunnas bint Malik (Wealthiest matriarch of Makkah)',
      tribeOrClanEn: 'Banu Abd al-Dar clan of Quraysh',
      wivesEn: ['Hamnah bint Jahsh (Sister of Zaynab bint Jahsh)'],
      sonsEn: ['Muhammad ibn Mus\'ab'],
      daughtersEn: ['Zaynab bint Mus\'ab'],
      keyRelativesEn: ['Abu Aziz ibn Umayr — Brother taken captive at Badr'],
      overviewEn: 'Mus\'ab sacrificed the most opulent life in Arabia to be shrouded in a piece of cloth so short that covering his head exposed his feet.'
    }
  },

  'ammar-ibn-yasir': {
    name: 'Hazrat Ammar ibn Yasir (RA)',
    title: 'Pure Believer Filled with Faith to His Bones, Hero of Truth',
    category: '3. Early Pioneers & Noble Martyrs (#14)',
    birthAndDeath: 'Born: 570 CE, Makkah | Martyred: 37 AH (Battle of Siffin)',
    summary: 'Son of the first two martyrs in Islam (Yasir & Sumayyah), tortured brutally by Quraysh, building pioneer of the Prophet\'s Mosque, and martyred fighting for truth.',
    islamAcceptance: 'Accepted Islam early at Dar al-Arqam with Suhayb al-Rumi. His entire family was strapped onto burning sand under molten armor. The Prophet comforted them: "Patience, O family of Yasir! Your appointed destination is Paradise!"',
    keyVirtues: [
      'Prophet (PBUH) said: "Ammar is filled with faith from his head to the soles of his feet."',
      'Prophet foretold: "Ammar will be killed by the transgressing faction."',
      'Carried two heavy bricks at a time during the construction of Masjid an-Nabawi.',
      'Governor of Kufa under Caliph Umar, praised for unmatched humility.'
    ],
    family: {
      fatherEn: 'Yasir ibn Amir (First male martyr in Islam)',
      motherEn: 'Sumayyah bint Khayyat (First martyr in all of Islam)',
      tribeOrClanEn: 'Banu Makhzum (Allied / Yemen)',
      wivesEn: ['Umm Salamah al-Yamaniyyah'],
      sonsEn: ['Muhammad ibn Ammar'],
      daughtersEn: ['Umm Kulthum bint Ammar'],
      keyRelativesEn: ['Abdullah ibn Yasir — Brother martyred in early Makkah'],
      overviewEn: 'The family of Yasir wrote the very opening chapter of martyrdom in Islamic history.'
    }
  },

  'khabbab-ibn-al-aratt': {
    name: 'Hazrat Khabbab ibn al-Aratt (RA)',
    title: 'The Enduring Iron Blacksmith of Islam, Teacher of Quran',
    category: '3. Early Pioneers & Noble Martyrs (#15)',
    birthAndDeath: 'Born: 586 CE, Najd | Passed: 37 AH (Kufa, Iraq)',
    summary: 'Blacksmith slave tortured with glowing red-hot coals pressed into his bare back until his body fat extinguished them; teacher who recited Surah Ta-Ha in Fatimah bint al-Khattab\'s house.',
    islamAcceptance: 'Sixth person to embrace Islam. Enslaved by Umm Anmar, she pressed red-hot swords to his head. Khabbab never recanted, pleading to the Prophet at the Ka\'bah, who promised victory.',
    keyVirtues: [
      'Endured the most horrifying burns on burning coals for Tawheed.',
      'Private tutor of the Holy Quran to early Muslim households.',
      'Hero of Badr, Uhud, and Khandaq.',
      'Wept on his deathbed seeing the wealth Muslims had acquired, fearing early reward.'
    ],
    family: {
      fatherEn: 'Al-Aratt ibn Jandalah',
      motherEn: 'Umm Sib\'ah',
      tribeOrClanEn: 'Banu Sa\'d / Banu Khuzaymah',
      wivesEn: ['Umm Abdullah'],
      sonsEn: ['Abdullah ibn Khabbab (Devout scholar martyred by Kharijites)'],
      daughtersEn: ['Zaynab bint Khabbab'],
      keyRelativesEn: ['Miqdad ibn Amr — Close comrade in early persecution'],
      overviewEn: 'Khabbab\'s scarred back stood as living physical testimony of early Islamic endurance.'
    }
  },

  'suhayb-ar-rumi': {
    name: 'Hazrat Suhayb ar-Rumi (RA)',
    title: 'Suhayb the Roman, Abu Yahya, Successful Trader of Paradise',
    category: '3. Early Pioneers & Noble Martyrs (#16)',
    birthAndDeath: 'Born: 587 CE, Iraq | Passed: 38 AH (Madinah)',
    summary: 'Captured as a child by Byzantines, escaped to Makkah, became wealthy, and surrendered every dirham of his fortune to Quraysh so they would permit his Hijrah to Allah.',
    islamAcceptance: 'Accepted Islam alongside Ammar at Dar al-Arqam. When intercepted during migration, he surrendered all his hidden wealth in Makkah in exchange for his religion.',
    keyVirtues: [
      'Prophet greeted him: "The transaction has profited, O Abu Yahya! The transaction has profited!"',
      'Surah Al-Baqarah verse 207 was revealed honoring his sacrifice.',
      'Chosen by Caliph Umar on his deathbed to lead public prayers and oversee the caliphal council.',
      'Famous for feeding the poor and orphan with lavish generosity.'
    ],
    family: {
      fatherEn: 'Sinan ibn Malik (Arab governor under Persian emperor)',
      motherEn: 'Salma bint Qa\'id',
      tribeOrClanEn: 'Banu Numayr (Arab captured into Byzantine lands)',
      wivesEn: ['Hunaydah bint Abi Umayyah'],
      sonsEn: ['Habib ibn Suhayb', 'Hamzah ibn Suhayb', 'Sa\'d ibn Suhayb'],
      daughtersEn: ['Aisha bint Suhayb'],
      keyRelativesEn: ['Umar ibn al-Khattab — Deep intimate brotherly bond'],
      overviewEn: 'Suhayb bridged the Arab and Byzantine worlds, living as a supreme symbol of faith over material wealth.'
    }
  },

  'jafar-ibn-abi-talib': {
    name: 'Hazrat Ja\'far ibn Abi Talib (RA)',
    title: 'Dhu al-Janahayen (Possessor of Two Wings), Abu al-Masakin (Father of the Destitute)',
    category: '3. Early Pioneers & Noble Martyrs (#17)',
    birthAndDeath: 'Born: 589 CE, Makkah | Martyred: 8 AH (Battle of Mu\'tah)',
    summary: 'Older brother of Ali, premier orator who delivered the legendary defense before the Christian King Negus of Abyssinia, martyred at Mu\'tah with both arms severed.',
    islamAcceptance: 'Converted early through Abu Bakr. Led the historic delegation of emigrants to Abyssinia, where he recited Surah Maryam to King Negus, bringing the king and bishops to tears.',
    keyVirtues: [
      'Prophet said: "You resemble me in both my physical appearance and my character."',
      'Awarded two ruby wings by Allah to fly freely with angels through Paradise.',
      'Titled "Father of the Poor" by the destitute whom he fed personally in Madinah.',
      'Second commander at the Battle of Mu\'tah who held the banner after Zayd fell.'
    ],
    family: {
      fatherEn: 'Abu Talib ibn Abd al-Muttalib',
      motherEn: 'Fatimah bint Asad',
      tribeOrClanEn: 'Banu Hashim clan of Quraysh',
      wivesEn: ['Asma bint Umays (Heroic migrant to Abyssinia)'],
      sonsEn: ['Abdullah ibn Ja\'far (Foremost philanthropist of Islam)', 'Muhammad ibn Ja\'far', 'Awn ibn Ja\'far'],
      daughtersEn: ['Umm Kulthum bint Ja\'far'],
      keyRelativesEn: ['Prophet Muhammad (PBUH) — First Cousin', 'Ali ibn Abi Talib — Younger Brother', 'Hamza — Uncle'],
      overviewEn: 'Ja\'far\'s children carried on the radiant lineage of Banu Hashim, celebrated for boundless generosity.'
    }
  },

  'zayd-ibn-al-khattab': {
    name: 'Hazrat Zayd ibn al-Khattab (RA)',
    title: 'Hero of Yamama, The Falcon of Islam, Elder Brother of Umar',
    category: '3. Early Pioneers & Noble Martyrs (#18)',
    birthAndDeath: 'Born: 580 CE, Makkah | Martyred: 12 AH (Battle of Yamama)',
    summary: 'Beloved older brother of Caliph Umar, veteran of Badr and Uhud, who rallied the Muslims and slew the rebel commander Rajjal before falling as a martyr at Yamama.',
    islamAcceptance: 'Accepted Islam before Umar. When Umar offered him his armor at Uhud, Zayd refused: "I desire martyrdom just as you desire it!"',
    keyVirtues: [
      'Standard-bearer of the Muhajirun at Yamama.',
      'Slew the apostate leader Rajjal ibn Unfwa, turning the tide of the Battle of Yamama.',
      'Umar wept bitterly upon his death, saying: "The northern wind never blows without bringing me the fragrance of Zayd."'
    ],
    family: {
      fatherEn: 'Khattab ibn Nufayl',
      motherEn: 'Asma bint Wahb',
      tribeOrClanEn: 'Banu Adi clan of Quraysh',
      wivesEn: ['Lubabah bint al-Harith'],
      sonsEn: ['Abdur Rahman ibn Zayd'],
      daughtersEn: ['Asma bint Zayd'],
      keyRelativesEn: ['Umar ibn al-Khattab — Younger Brother', 'Fatimah bint al-Khattab — Sister'],
      overviewEn: 'Zayd was Umar\'s role model, who beat him in two great things: accepting Islam first and attaining martyrdom first.'
    }
  },

  'abdullah-ibn-jahsh': {
    name: 'Hazrat Abdullah ibn Jahsh (RA)',
    title: 'Al-Majda\' fi Allah (The Mutilated for Allah), Commander of Nakhlah',
    category: '3. Early Pioneers & Noble Martyrs (#19)',
    birthAndDeath: 'Born: 580 CE, Makkah | Martyred: 3 AH (Battle of Uhud)',
    summary: 'First commander to receive the title "Amir" in Islam, cousin of the Prophet, whose famous dua at Uhud asked for extreme martyrdom where his nose and ears would be sliced for Allah.',
    islamAcceptance: 'Converted early at Dar al-Arqam alongside his entire household. Migrated twice to Abyssinia and Madinah, leaving his grand Makkah house to be confiscated by Abu Jahl.',
    keyVirtues: [
      'Appointed by the Prophet as the first official military commander (Nakhlah expedition).',
      'At Uhud, prayed to duel a fierce warrior, be killed, and have his ears and nose cut off for Allah\'s sake.',
      'Buried alongside his uncle Hamza in the same grave at Uhud.'
    ],
    family: {
      fatherEn: 'Jahsh ibn Riyab',
      motherEn: 'Umaymah bint Abd al-Muttalib (Aunt of the Prophet)',
      tribeOrClanEn: 'Banu Asad clan / Allied to Hashim',
      wivesEn: ['Fatimah bint Abi Hubaysh'],
      sonsEn: ['Muhammad ibn Abdullah ibn Jahsh'],
      daughtersEn: ['Zaynab bint Abdullah'],
      keyRelativesEn: ['Prophet Muhammad (PBUH) — First Cousin & Brother-in-law', 'Zaynab bint Jahsh — Sister & Mother of the Believers', 'Hamza — Uncle'],
      overviewEn: 'His sister Zaynab married the Prophet, establishing an eternal familial link between their houses.'
    }
  },

  'saad-ibn-al-rabi': {
    name: 'Hazrat Sa\'d ibn al-Rabi (RA)',
    title: 'The Generous Ansar of Madinah, The Dying Message of Uhud',
    category: '3. Early Pioneers & Noble Martyrs (#20)',
    birthAndDeath: 'Born: 585 CE, Madinah | Martyred: 3 AH (Battle of Uhud)',
    summary: 'The iconic leader of Ansar who offered half his wealth and garden to Abdur Rahman ibn Awf, whose dying breath sent a message to the Ummah to defend the Prophet.',
    islamAcceptance: 'One of the 12 Naqibs (representatives) at the Second Pledge of Aqabah. Wholeheartedly accepted the Prophet and welcomed the Muhajirun.',
    keyVirtues: [
      'Offered half his wealth, lands, and homes to Abdur Rahman ibn Awf in unmatched Ansar brotherhood.',
      'On his deathbed at Uhud with 12 spear wounds, whispered: "Convey my salam to the Prophet, and tell the Ansar: You have no excuse before Allah if any harm reaches the Prophet while an eye among you blinks!"'
    ],
    family: {
      fatherEn: 'Al-Rabi ibn Amr',
      motherEn: 'Huzaylah bint Inan',
      tribeOrClanEn: 'Banu al-Harith clan of Khazraj (Madinah)',
      wivesEn: ['Amrah bint Hazm'],
      daughtersEn: ['Umm Sa\'d bint Sa\'d', 'Umm al-Qasim bint Sa\'d'],
      keyRelativesEn: ['Bashir ibn Sa\'d — Close Ansar Cousin', 'Ubayy ibn Ka\'b — Compeer Scholar'],
      overviewEn: 'The famous inheritance verses in Surah An-Nisa were revealed regarding the fair division of Sa\'d\'s estate among his daughters.'
    }
  },

  // =========================================================================
  // 4. UNCONQUERED COMMANDERS & WARRIORS (#27 - #36, etc.)
  // =========================================================================
  'khalid-ibn-al-walid': {
    name: 'Hazrat Khalid ibn al-Walid (RA)',
    title: 'Saifullah al-Maslul (The Drawn Sword of Allah), Conqueror of Empires',
    category: '4. Unconquered Generals & Warriors (#27)',
    birthAndDeath: 'Born: 592 CE, Makkah | Passed: 21 AH (Homs, Syria)',
    summary: 'The undefeated military mastermind in over 100 battles who toppled both the Persian Sassanid and Byzantine Roman empires, appointed by the Prophet as the Sword of Allah.',
    islamAcceptance: 'Embraced Islam after the Treaty of Hudaibiyah alongside Amr ibn al-Aas. When he arrived in Madinah, the Prophet smiled warmly and declared: "I knew you possessed an intellect that would ultimately guide you to truth."',
    keyVirtues: [
      'Titled "Saifullah" (Sword of Allah) by Prophet Muhammad (PBUH).',
      'Broke nine swords in his hand fighting at the Battle of Mu\'tah.',
      'Conquered Iraq in a whirlwind campaign (Walaja, Ullais, Ayn al-Tamr).',
      'Marched across the waterless Syrian desert in 5 days to achieve the decisive victory at Yarmouk.',
      'Demonstrated ultimate spiritual obedience by accepting Caliph Umar\'s order stepping down to serve as a common soldier.'
    ],
    detailedBiography: 'Khalid belonged to the aristocratic military branch of Quraysh, Banu Makhzum. Following his conversion, he led the Muslim cavalry at the Conquest of Makkah, defeated Tulayha and Musaylimah in the Riddah wars, and crushed Byzantine forces at Ajnadayn and Yarmouk.\n\nOn his deathbed, he wept: "I fought in over a hundred battles, and there is not the space of a hand span on my body without a scar from a sword, spear, or arrow; yet here I am dying in my bed like a camel dies. May the eyes of cowards never sleep!"',
    emotionalStories: [
      {
        title: 'The Lock of the Prophet\'s Blessed Hair',
        story: 'In every battle, Khalid wore a red turban inside which he kept a few blessed hairs from the forehead of Prophet Muhammad (PBUH). During the Battle of Yarmouk, his turban fell off in the heat of combat. Khalid halted his cavalry and risked his life under shower of arrows to retrieve it. When questioned, he declared: "I did not risk myself for the cloth, but for the blessed hair of the Messenger of Allah, through which Allah grants me victory!"'
      }
    ],
    deathOrMartyrdom: 'Passed away in 21 AH in Homs, Syria. He donated his remaining horse, armor, and weapons to the public treasury.',
    lessons: [
      'Strategic brilliance achieves victory only when rooted in complete reliance upon Allah.',
      'True soldiers fight for the pleasure of Allah, not rank, fame, or military status.'
    ],
    references: ['Al-Bidayah wan-Nihayah', 'Siyar A\'lam al-Nubala', 'Futuh al-Buldan', 'Tarikh al-Tabari'],
    family: {
      fatherEn: 'Al-Walid ibn al-Mughirah (Chief of Banu Makhzum)',
      motherEn: 'Lubabah al-Sughra (Sister of Maymunah, wife of the Prophet)',
      tribeOrClanEn: 'Banu Makhzum clan of Quraysh',
      wivesEn: ['Asma bint Anas', 'Bint Khalid ibn Ikrish', 'Kabshah bint Hawdah'],
      sonsEn: ['Sulayman ibn Khalid', 'Abdur Rahman ibn Khalid (Fierce warrior in Syria)', 'Muhajir ibn Khalid'],
      daughtersEn: ['Fatimah bint Khalid'],
      keyRelativesEn: ['Maymunah bint al-Harith (Mother of the Believers) — Maternal Aunt', 'Ikrima ibn Abi Jahl — Cousin & Comrade'],
      overviewEn: 'The lineage of Khalid was renowned for martial mastery and devotion to frontier security.'
    }
  },

  'amr-ibn-al-aas': {
    name: 'Hazrat Amr ibn al-Aas (RA)',
    title: 'Da\'iyat al-Arab (The Diplomatic Genius of Arabia), Conqueror of Egypt',
    category: '4. Unconquered Generals & Warriors (#28)',
    birthAndDeath: 'Born: 573 CE, Makkah | Passed: 43 AH (Fustat, Cairo, Egypt)',
    summary: 'The foremost diplomat and strategist of Arabia, conqueror and first governor of Egypt who built the first mosque in Africa (Masjid Amr ibn al-Aas) and founded Fustat.',
    islamAcceptance: 'Traveled to Abyssinia where King Negus advised him to follow Prophet Muhammad (PBUH). Amr journeyed to Madinah with Khalid ibn al-Walid in 8 AH and pledged allegiance to the Prophet.',
    keyVirtues: [
      'Prophet stated: "The people became Muslims, but Amr believed with true faith."',
      'Commander at Dhat al-Salasil, Ajnadayn, and the conquest of Egypt.',
      'Built the first mosque on the African continent in Fustat (Old Cairo).',
      'Renowned for razor-sharp political acumen and administrative foresight.'
    ],
    family: {
      fatherEn: 'Al-Aas ibn Wa\'il',
      motherEn: 'Salma bint Harmalah',
      tribeOrClanEn: 'Banu Sahm clan of Quraysh',
      wivesEn: ['Raytah bint Munabbih'],
      sonsEn: ['Abdullah ibn Amr ibn al-Aas (One of the most prolific Hadith compilers)'],
      daughtersEn: ['Umm Amr bint Amr'],
      keyRelativesEn: ['Hisham ibn al-Aas — Heroic brother martyred at Yarmouk'],
      overviewEn: 'His son Abdullah was one of the greatest scholars of early Islam, writing down Hadiths directly from the Prophet in his Sahifah al-Sadiqah.'
    }
  },

  // =========================================================================
  // 5. HADITH SCHOLARS & JURISTS (#37 - #44, etc.)
  // =========================================================================
  'salman-al-farsi': {
    name: 'Hazrat Salman al-Farsi (RA)',
    title: 'Bahith an al-Haqq (The Seeker of Truth), Salman Minna Ahl al-Bayt',
    category: '5. Hadith Scholars, Qurra & Jurists (#37)',
    birthAndDeath: 'Born: 568 CE, Isfahan, Persia | Passed: 35 AH (Ctesiphon / Madain, Iraq)',
    summary: 'The Persian seeker of truth who traversed Zoroastrianism, Christianity, and enslavement to find the Prophet, who proposed digging the trench at the Battle of Khandaq.',
    islamAcceptance: 'Traveled across Syria and Mesopotamia serving Christian monks until informed of the final Prophet in Arabia with three signs: accepts gifts, does not eat charity, and has the Seal of Prophethood between his shoulders. Verified all three upon reaching Madinah.',
    keyVirtues: [
      'Prophet declared: "Salman is one of us, the People of the House (Ahl al-Bayt)!"',
      'Masterminded the digging of the defensive trench (Khandaq), saving Madinah from annihilation.',
      'Governor of Madain who lived in poverty, weaving palm baskets and donating his entire governor stipend.',
      'First person to translate portions of the Holy Quran into Persian.'
    ],
    family: {
      fatherEn: 'Zoroastrian Chief of Jayy (Isfahan, Persia)',
      motherEn: 'Noble Persian matriarch',
      tribeOrClanEn: 'Persian (Isfahan) / Adopted into Ahl al-Bayt',
      wivesEn: ['Buqayrah (Arab woman from Kinda)'],
      sonsEn: ['Abdullah ibn Salman', 'Kathir ibn Salman'],
      daughtersEn: ['Two daughters who lived in Isfahan'],
      keyRelativesEn: ['Abu al-Darda — Brother in faith paired by the Prophet'],
      overviewEn: 'Salman\'s elevation into the Prophet\'s Ahl al-Bayt proved that spiritual virtue completely transcends racial origin in Islam.'
    }
  },

  'abu-hurairah': {
    name: 'Hazrat Abu Hurairah (RA)',
    title: 'Hafiz al-Ummah (The Premier Memory of the Ummah), Father of the Kitten',
    category: '5. Hadith Scholars, Qurra & Jurists (#38)',
    birthAndDeath: 'Born: 603 CE, Yemen | Passed: 59 AH (Madinah)',
    summary: 'The foremost narrator of Hadith in Islamic history (narrating 5,374 traditions), master of the Ahl al-Suffah who devoted every waking moment to preserving the Prophet\'s words.',
    islamAcceptance: 'Traveled from Yemen to Madinah during the Battle of Khaybar (7 AH) with his tribe Dawsi and immediately embraced Islam.',
    keyVirtues: [
      'Narrated 5,374 authentic traditions of Prophet Muhammad (PBUH).',
      'The Prophet spread his cloak and made a special dua, granting Abu Hurairah unfailing photographic memory.',
      'Leader and companion of the Ahl al-Suffah bench in Masjid an-Nabawi.',
      'Divided every night into three portions: one for sleep, one for prayer, and one for revising Hadiths.'
    ],
    family: {
      fatherEn: 'Amir al-Dawsi',
      motherEn: 'Umaymah bint Safih (Embraced Islam through the Prophet\'s dua)',
      tribeOrClanEn: 'Banu Daws of Yemen',
      wivesEn: ['Busrah bint Ghazwan (Noble sister of Governor Utbah)'],
      sonsEn: ['Muharrir ibn Abi Hurairah', 'Bilal ibn Abi Hurairah'],
      daughtersEn: ['Wife of prominent Tabi\'i Said ibn al-Musayyib'],
      keyRelativesEn: ['Tufayl ibn Amr al-Dawsi — Chief of Daws who guided him'],
      overviewEn: 'His daughter married the greatest scholar of the Successors (Tabi\'un), Said ibn al-Musayyib, perpetuating his Hadith legacy.'
    }
  },

  'abdullah-ibn-abbas': {
    name: 'Hazrat Abdullah ibn Abbas (RA)',
    title: 'Hibr al-Ummah (The Scholar of the Ummah), Tarjuman al-Quran (Interpreter of the Quran)',
    category: '5. Hadith Scholars, Qurra & Jurists (#39)',
    birthAndDeath: 'Born: 619 CE, Makkah | Passed: 68 AH (Ta\'if)',
    summary: 'Cousin of the Prophet, foremost commentator and interpreter of the Holy Quran, for whom the Prophet prayed: "O Allah, teach him the Book and grant him deep understanding of the religion."',
    islamAcceptance: 'Born in Shi\'b Abi Talib during the boycott of Banu Hashim. Raised in the Prophet\'s household and migrated with his parents before the Conquest of Makkah.',
    keyVirtues: [
      'Prophet embraced him and prayed: "O Allah, grant him deep comprehension of the religion and teach him Quranic interpretation."',
      'Admitted by Caliph Umar into the council of senior Badr veterans as a youth.',
      'Governor of Basra under Caliph Ali.',
      'Gathered thousands of students in Makkah and Ta\'if teaching Tafsir, Fiqh, Arabic poetry, and genealogy.'
    ],
    family: {
      fatherEn: 'Al-Abbas ibn Abd al-Muttalib (Uncle of the Prophet)',
      motherEn: 'Umm al-Fadl Lubabah bint al-Harith',
      tribeOrClanEn: 'Banu Hashim clan of Quraysh',
      wivesEn: ['Zar\'ah bint Mishrah', 'Umaymah bint Qays'],
      sonsEn: ['Ali ibn Abdullah (Grandfather of the Abbasid Caliphs)', 'Muhammad ibn Abdullah', 'Al-Abbas ibn Abdullah'],
      daughtersEn: ['Asma bint Abdullah', 'Lubabah bint Abdullah'],
      keyRelativesEn: ['Prophet Muhammad (PBUH) — First Cousin', 'Maymunah bint al-Harith — Maternal Aunt', 'Caliph Ali — Cousin'],
      overviewEn: 'Through his son Ali, his descendants founded the historic Abbasid Caliphate.'
    }
  },

  'abdullah-ibn-masud': {
    name: 'Hazrat Abdullah ibn Mas\'ud (RA)',
    title: 'Sahib al-Sirr (Keeper of the Prophet\'s Secrets), Master of Quran Recitation',
    category: '5. Hadith Scholars, Qurra & Jurists (#40)',
    birthAndDeath: 'Born: 594 CE, Makkah | Passed: 32 AH (Madinah)',
    summary: 'First companion to recite the Holy Quran publicly before the Ka\'bah, whose gentle recitation brought tears to the Prophet\'s eyes, and founder of the Kufan school of jurisprudence.',
    islamAcceptance: 'As a young shepherd grazing sheep in Makkah, he met the Prophet and Abu Bakr fleeing persecution. Seeing a barren ewe miraculously yield fresh milk upon the Prophet\'s touch, he declared faith instantly.',
    keyVirtues: [
      'Prophet stated: "Whoever wishes to recite the Quran as fresh as when it was revealed, let him recite it according to Ibn Mas\'ud."',
      'Beaten unconscious by Quraysh when he boldly recited Surah Ar-Rahman aloud at the Ka\'bah.',
      'Slew the arch-enemy Abu Jahl on the battlefield of Badr.',
      'Chief judicial and financial administrator of Kufa under Caliph Umar.'
    ],
    family: {
      fatherEn: 'Mas\'ud ibn Ghafil',
      motherEn: 'Umm Abd bint Abd Wudd',
      tribeOrClanEn: 'Banu Hudhayl clan (Allied to Banu Zuhrah)',
      wivesEn: ['Raytah bint Abdullah', 'Zaynab bint Abdullah al-Thaqafiyyah'],
      sonsEn: ['Abdur Rahman ibn Abdullah', 'Utbah ibn Abdullah'],
      daughtersEn: ['Umm Ubaydah bint Abdullah'],
      keyRelativesEn: ['Utbah ibn Mas\'ud — Brother who was also a companion'],
      overviewEn: 'His scholarship established the legal tradition of Kufa, which directly shaped the Hanafi school of Islamic jurisprudence.'
    }
  },

  // =========================================================================
  // 6. ANSAR OF MADINAH (#45 - #48, etc.)
  // =========================================================================
  'saad-ibn-muadh': {
    name: 'Hazrat Sa\'d ibn Mu\'adh (RA)',
    title: 'Chief of the Aws, The Hero Whose Death Shook the Throne of Allah',
    category: '6. Leaders of the Ansar of Madinah (#45)',
    birthAndDeath: 'Born: 590 CE, Madinah | Martyred: 5 AH (Battle of the Trench)',
    summary: 'The paramount chieftain of the Aws tribe of Madinah whose conversion brought his entire tribe into Islam in a single day, and at whose death the Throne of the Most Merciful shook.',
    islamAcceptance: 'Converted at age 31 through Mus\'ab ibn Umayr in Madinah. Standing before his entire clan of Banu Abd al-Ashhal, he declared: "Speaking to any man or woman among you is unlawful for me until you believe in Allah and His Messenger!" The entire clan embraced Islam by nightfall.',
    keyVirtues: [
      'Prophet stated: "The Throne of the Most Merciful shook at the death of Sa\'d ibn Mu\'adh!"',
      'Seventy thousand angels descended to attend his funeral prayer in Madinah.',
      'Delivered the iconic pledge of loyalty at Badr: "Lead us into the sea and we will plunge into it with you!"',
      'Arbitrated the verdict upon Banu Qurayzah by divine decree according to their own scripture.'
    ],
    family: {
      fatherEn: 'Mu\'adh ibn al-Numan',
      motherEn: 'Kabshah bint Rafi (Pious Ansar matriarch)',
      tribeOrClanEn: 'Banu Abd al-Ashhal clan of Aws (Madinah)',
      wivesEn: ['Hind bint Simak'],
      sonsEn: ['Amr ibn Sa\'d', 'Abdullah ibn Sa\'d'],
      daughtersEn: ['Umm Kulthum bint Sa\'d'],
      keyRelativesEn: ['As\'ad ibn Zurarah — Maternal Cousin', 'Usayd ibn Hudayr — Close Chieftain Comrade'],
      overviewEn: 'Sa\'d lived as a Muslim for only five years, yet achieved a spiritual station that shook the very heavens.'
    }
  },

  'abu-ayyub-al-ansari': {
    name: 'Hazrat Abu Ayyub al-Ansari (RA)',
    title: 'Host of the Messenger of Allah, Eternal Sentinel of Constantinople',
    category: '6. Leaders of the Ansar of Madinah (#46)',
    birthAndDeath: 'Born: 588 CE, Madinah | Martyred: 52 AH (Constantinople / Istanbul, Turkey)',
    summary: 'The honored host in whose Madinah house the Prophet stayed for seven months after the Hijrah, who sailed in old age to Constantinople where he was buried beneath its historic walls.',
    islamAcceptance: 'One of the early Ansar leaders who pledged allegiance at the Second Pledge of Aqabah.',
    keyVirtues: [
      'Chosen by Allah when the Prophet\'s camel Qaswa knelt in front of his home upon entering Madinah.',
      'Refused to sleep on the upper floor of his house while the Prophet rested on the lower floor out of pure respect.',
      'Fought in every single military campaign from Badr until his martyrdom at Constantinople in his 80s.',
      'His tomb in modern Istanbul (Eyup Sultan Mosque) remains one of the most revered pilgrimage sites.'
    ],
    family: {
      fatherEn: 'Khalid ibn Zayd',
      motherEn: 'Hind bint Sa\'id',
      tribeOrClanEn: 'Banu Najjar clan of Khazraj (Madinah)',
      wivesEn: ['Umm Ayyub Fatimah bint Qays'],
      sonsEn: ['Muhammad ibn Abi Ayyub', 'Khalid ibn Abi Ayyub', 'Ayyub ibn Abi Ayyub'],
      daughtersEn: ['Amrah bint Abi Ayyub'],
      keyRelativesEn: ['As\'ad ibn Zurarah — Close tribal cousin'],
      overviewEn: 'Abu Ayyub\'s hospitality to the Messenger of Allah immortalized his name across all Islamic history.'
    }
  },

  // =========================================================================
  // 7. BELOVED COMPANIONS & HOUSEHOLD (#49, #60, #61, etc.)
  // =========================================================================
  'hasan-ibn-ali': {
    name: 'Hazrat Hasan ibn Ali (RA)',
    title: 'Sayyid Shabab Ahl al-Jannah (Leader of Youth of Paradise), The Great Peacemaker',
    category: '7. Beloved Household & Kin (#60)',
    birthAndDeath: 'Born: 15 Ramadan, 3 AH, Madinah | Passed: 50 AH, Madinah',
    summary: 'Eldest grandson of Prophet Muhammad (PBUH), fifth Righteous Caliph who fulfilled prophetic prophecy by abdicating rule to unite two massive warring factions of Muslims.',
    islamAcceptance: 'Born into the Prophet\'s loving embrace; the Prophet chewed a date and placed it in his mouth and named him Hasan.',
    keyVirtues: [
      'Prophet stated: "This son of mine is a Sayyid (master), and through him Allah will reconcile two great factions of Muslims."',
      'Leader of the Youth of Paradise alongside his brother Husayn.',
      'Resembled Prophet Muhammad (PBUH) from the chest to the head more than anyone else.',
      'Stepped down from the Caliphate after six months to prevent the shedding of Muslim blood.'
    ],
    family: {
      fatherEn: 'Ali ibn Abi Talib (4th Caliph)',
      motherEn: 'Fatimah az-Zahra (Daughter of the Prophet)',
      tribeOrClanEn: 'Banu Hashim clan of Quraysh',
      wivesEn: ['Khawlah bint Manzur', 'Ja\'dah bint al-Ash\'ath', 'Umm Ishaq bint Talha'],
      sonsEn: ['Al-Hasan al-Muthanna', 'Zayd ibn al-Hasan', 'Al-Qasim ibn al-Hasan (Martyr of Karbala)', 'Abdullah ibn al-Hasan'],
      daughtersEn: ['Fatimah bint al-Hasan', 'Umm al-Khayr bint al-Hasan'],
      keyRelativesEn: ['Prophet Muhammad (PBUH) — Grandfather', 'Husayn ibn Ali — Younger Brother', 'Khadijah bint Khuwaylid — Grandmother'],
      overviewEn: 'His act of peace established the Year of Unity (Aam al-Jama\'ah), demonstrating supreme prophetic leadership.'
    }
  },

  'husayn-ibn-ali': {
    name: 'Hazrat Husayn ibn Ali (RA)',
    title: 'Sayyid ash-Shuhada, The Fragrant Flower of the Prophet, Hero of Karbala',
    category: '7. Beloved Household & Kin (#61)',
    birthAndDeath: 'Born: 3 Sha\'ban, 4 AH, Madinah | Martyred: 10 Muharram, 61 AH (Karbala, Iraq)',
    summary: 'Beloved grandson of Prophet Muhammad (PBUH), eternal leader of the youth of Paradise who stood unflinchingly against injustice and tyranny at Karbala, sacrificing his life for Islamic principles.',
    islamAcceptance: 'Nurtured in the lap of the Messenger of Allah, who would carry him on his shoulders during prayers and kiss his lips.',
    keyVirtues: [
      'Prophet stated: "Husayn is from me and I am from Husayn; may Allah love whoever loves Husayn!"',
      'Leader of the Youth of Paradise.',
      'The eternal symbol of resisting oppression and standing for truth against all worldly odds.',
      'Angel Jibril brought red soil from Karbala to the Prophet, foretelling Husayn\'s martyrdom.'
    ],
    family: {
      fatherEn: 'Ali ibn Abi Talib (4th Caliph)',
      motherEn: 'Fatimah az-Zahra (Daughter of the Prophet)',
      tribeOrClanEn: 'Banu Hashim clan of Quraysh',
      wivesEn: ['Shahrbanu (Persian Princess)', 'Layla bint Abi Murrah', 'Umm Ishaq bint Talha', 'Rubab bint Imru al-Qays'],
      sonsEn: ['Imam Ali Zayn al-Abidin (Survivor of Karbala & 4th Imam)', 'Ali al-Akbar (Martyr of Karbala)', 'Ali al-Asghar (Infant martyr of Karbala)'],
      daughtersEn: ['Sukinah bint al-Husayn', 'Fatimah bint al-Husayn'],
      keyRelativesEn: ['Prophet Muhammad (PBUH) — Grandfather', 'Hasan ibn Ali — Older Brother', 'Abbas ibn Ali — Half-Brother & Hero of Karbala'],
      overviewEn: 'Through his surviving son Ali Zayn al-Abidin, the blessed bloodline of the Prophet was carried forward across the centuries.'
    }
  },

  // =========================================================================
  // 8. VENERABLE FEMALE COMPANIONS (#50 - #55, #94 - #107)
  // =========================================================================
  'khadijah-bint-khuwaylid': {
    name: 'Hazrat Khadijah bint Khuwaylid (RA)',
    title: 'Umm al-Mu\'minin (Mother of the Believers), Al-Tahirah (The Pure), First Believer',
    category: '8. Venerable Female Companions (#50)',
    birthAndDeath: 'Born: 555 CE, Makkah | Passed: 10th year of Prophethood (Year of Sorrow)',
    summary: 'The foremost woman of Paradise, first human to believe in Prophet Muhammad (PBUH), who consoled and supported him with her entire fortune, love, and life in the darkest hours.',
    islamAcceptance: 'The very first person on earth to embrace Islam. When the Prophet returned trembling from Cave Hira with the first revelation, she famously reassured him: "Never! By Allah, Allah will never disgrace you; you uphold family ties, bear the burdens of the weak, help the destitute, honor guests, and assist in all good causes."',
    keyVirtues: [
      'Angel Jibril instructed the Prophet to convey salam to Khadijah from Allah Almighty.',
      'Promised a palace of hollow pearl in Paradise where there will be neither noise nor toil.',
      'Mother of all the Prophet\'s children except Ibrahim.',
      'Spent her entire immense commercial fortune sustaining the Muslims during the 3-year boycott in Shi\'b Abi Talib.',
      'The Prophet loved her so deeply that he cherished her memory and honored her friends throughout his entire life.'
    ],
    family: {
      fatherEn: 'Khuwaylid ibn Asad',
      motherEn: 'Fatimah bint Za\'idah',
      tribeOrClanEn: 'Banu Asad clan of Quraysh',
      wivesEn: [],
      sonsEn: ['Al-Qasim ibn Muhammad', 'Abdullah ibn Muhammad (Al-Tahir/Al-Tayyib)'],
      daughtersEn: ['Zaynab bint Muhammad', 'Ruqayyah bint Muhammad', 'Umm Kulthum bint Muhammad', 'Sayyidah Fatimah az-Zahra (RA)'],
      keyRelativesEn: ['Prophet Muhammad (PBUH) — Beloved Husband', 'Waraqah ibn Nawfal — Paternal Cousin & Early Christian Scholar', 'Zubayr ibn al-Awwam — Nephew'],
      overviewEn: 'Khadijah\'s steadfast faith and selfless financial sacrifice formed the financial and emotional backbone of the nascent Islamic movement.'
    }
  },

  'aisha-siddiqah': {
    name: 'Hazrat Aisha Siddiqah (RA)',
    title: 'Umm al-Mu\'minin, Al-Siddiqah bint al-Siddiq, Al-Humayra, Premier Woman Jurist',
    category: '8. Venerable Female Companions (#51)',
    birthAndDeath: 'Born: 614 CE, Makkah | Passed: 17 Ramadan, 58 AH, Madinah',
    summary: 'Beloved wife of the Prophet, daughter of Abu Bakr, premier female scholar in human history who narrated 2,210 Hadiths and taught the greatest male companions law, medicine, and poetry.',
    islamAcceptance: 'Born into the home of Abu Bakr, she grew up illuminated by the light of revelation from childhood.',
    keyVirtues: [
      'Narrated 2,210 authentic traditions; senior companions came to her to solve the most difficult legal dilemmas.',
      'Her innocence was vindicated directly by Allah in ten verses of Surah An-Nur (the event of Ifk).',
      'Prophet passed away resting against her chest in her chamber, and was buried beneath her bed.',
      'Angel Jibril brought her image on green silk to the Prophet in a dream before their marriage.'
    ],
    family: {
      fatherEn: 'Abu Bakr As-Siddiq (1st Caliph)',
      motherEn: 'Umm Ruman bint Amir',
      tribeOrClanEn: 'Banu Taym clan of Quraysh',
      wivesEn: [],
      sonsEn: [],
      daughtersEn: [],
      keyRelativesEn: ['Prophet Muhammad (PBUH) — Beloved Husband', 'Asma bint Abi Bakr — Older Sister', 'Urwah ibn al-Zubayr — Nephew & Star Student'],
      overviewEn: 'Her chamber in Madinah became the resting sanctuary of the Prophet and the two greatest Caliphs, and the fountainhead of early Islamic learning.'
    }
  },

  'fatimah-az-zahra': {
    name: 'Hazrat Fatimah az-Zahra (RA)',
    title: 'Sayyidat Nisa al-Alamin (Leader of the Women of the Worlds), Al-Batul, Umm Abiha',
    category: '8. Venerable Female Companions (#52)',
    birthAndDeath: 'Born: 605 CE, Makkah | Passed: 3 Ramadan, 11 AH, Madinah',
    summary: 'Youngest and dearest daughter of Prophet Muhammad (PBUH), mother of Hasan and Husayn, wife of Ali, titled "Leader of the Women of Paradise".',
    islamAcceptance: 'Born in Makkah during the early years of the prophetic mission, witnessing her father\'s trials and fiercely wiping camel entrails off his head when pagans mocked him at the Ka\'bah.',
    keyVirtues: [
      'Prophet stated: "Fatimah is a part of me; whoever angers her angers me, and whoever pleases her pleases me."',
      'Titled "Umm Abiha" (Mother of her Father) for her tender care of the Messenger of Allah.',
      'Whenever she entered the room, the Prophet would stand up, take her hand, kiss her, and seat her in his own place.',
      'First member of the Prophet\'s family to rejoin him after his demise (passing 6 months later).'
    ],
    family: {
      fatherEn: 'Prophet Muhammad (PBUH)',
      motherEn: 'Sayyidah Khadijah bint Khuwaylid',
      tribeOrClanEn: 'Banu Hashim clan of Quraysh',
      wivesEn: [],
      sonsEn: ['Imam Hasan (RA)', 'Imam Husayn (RA)', 'Muhsin (died in infancy)'],
      daughtersEn: ['Sayyidah Zaynab bint Ali', 'Umm Kulthum bint Ali'],
      keyRelativesEn: ['Ali ibn Abi Talib — Beloved Husband & 4th Caliph', 'Hamza — Great-Uncle'],
      overviewEn: 'Through Fatimah\'s two sons, the sacred prophetic progeny (Sadat & Ashraaf) was preserved for all time.'
    }
  },

  'asma-bint-abi-bakr': {
    name: 'Hazrat Asma bint Abi Bakr (RA)',
    title: 'Dhat an-Nitaqayn (She of the Two Belts), Mother of Abdullah ibn al-Zubayr',
    category: '8. Venerable Female Companions (#53)',
    birthAndDeath: 'Born: 595 CE, Makkah | Passed: 73 AH, Makkah (aged 100)',
    summary: 'Daughter of Abu Bakr, heroine of the Hijrah who carried food secretly to Cave Thawr, tearing her waistband to tie the provisions, and mother of Caliph Abdullah ibn al-Zubayr.',
    islamAcceptance: '18th person to embrace Islam in Makkah. When Abu Jahl slapped her so hard her earring flew off demanding the Prophet\'s location, she never revealed a word.',
    keyVirtues: [
      'Given the immortal title "Dhat an-Nitaqayn" by Prophet Muhammad (PBUH).',
      'First mother to give birth to a child among the Muhajirun in Madinah (Abdullah ibn al-Zubayr).',
      'Lived to age 100 with all her teeth and sharp eyesight intact.',
      'Advised her son to fight valiantly for truth against the tyrant Hajjaj ibn Yusuf even unto death.'
    ],
    family: {
      fatherEn: 'Abu Bakr As-Siddiq',
      motherEn: 'Qutaylah bint Abd al-Uzza',
      tribeOrClanEn: 'Banu Taym clan of Quraysh',
      wivesEn: [],
      sonsEn: ['Abdullah ibn al-Zubayr (Caliph & Martyr)', 'Urwah ibn al-Zubayr (Great Jurist)', 'Al-Mundhir ibn al-Zubayr'],
      daughtersEn: ['Aisha bint al-Zubayr'],
      keyRelativesEn: ['Zubayr ibn al-Awwam — Husband', 'Aisha Siddiqah — Younger Sister'],
      overviewEn: 'Her fearless courage in confronting Hajjaj ibn Yusuf remains one of the most heroic demonstrations of moral steel in history.'
    }
  },

  'nusaybah-bint-kab': {
    name: 'Hazrat Nusaybah bint Ka\'b (Umm Ummarah) (RA)',
    title: 'Heroine of Uhud, Valiant Shield of the Prophet, Lioness of Yamama',
    category: '8. Venerable Female Companions (#54)',
    birthAndDeath: 'Born: 585 CE, Madinah | Passed: 13 AH, Madinah',
    summary: 'The fearless warrior woman who drew her sword at Uhud when Muslims scattered, shielding the Prophet from arrows and blades, sustaining 12 severe wounds.',
    islamAcceptance: 'One of only two women who pledged allegiance to the Prophet at the historic Second Pledge of Aqabah in Makkah.',
    keyVirtues: [
      'Prophet stated at Uhud: "Whenever I looked to my right or left, I saw Umm Ummarah fighting to protect me!"',
      'The Prophet prayed for her: "O Allah, make them my companions in Paradise!"',
      'Fought at Yamama in her 50s where she sustained 11 wounds and had her hand severed while hunting down the false prophet Musaylimah.'
    ],
    family: {
      fatherEn: 'Ka\'b ibn Amr',
      motherEn: 'Al-Rabab bint Abdullah',
      tribeOrClanEn: 'Banu Mazin clan of Najjar (Madinah)',
      wivesEn: [],
      sonsEn: ['Habib ibn Zayd (Martyr tortured by Musaylimah)', 'Abdullah ibn Zayd (Killed Musaylimah)'],
      daughtersEn: ['Umm Habib bint Zayd'],
      keyRelativesEn: ['Zayd ibn Asim — First Husband', 'Ghaziyyah ibn Amr — Second Husband'],
      overviewEn: 'Her entire household fought alongside her as a family warrior unit guarding the Prophet of Allah.'
    }
  },

  'hafsa-bint-umar': {
    name: 'Hazrat Hafsa bint Umar (RA)',
    title: 'Umm al-Mu\'minin, The Fasting and Standing Worshipper, Guardian of the Quran',
    category: '8. Venerable Female Companions (#55)',
    birthAndDeath: 'Born: 605 CE, Makkah | Passed: 45 AH, Madinah',
    summary: 'Daughter of Caliph Umar, wife of the Prophet, literate scholar entrusted with the sole master manuscript of the Holy Quran compiled by Abu Bakr.',
    islamAcceptance: 'Accepted Islam alongside her father Umar and her husband Khunays ibn Hudhafah in early Makkah.',
    keyVirtues: [
      'Angel Jibril said to the Prophet: "She is a woman who fasts intensely and stands long in prayer, and she is your wife in Paradise."',
      'Sole guardian entrusted with the original master manuscript of the Holy Quran for over a decade.',
      'One of the very few literate women in early Arabia who copied and preserved Quranic texts.'
    ],
    family: {
      fatherEn: 'Umar ibn al-Khattab (2nd Caliph)',
      motherEn: 'Zaynab bint Maz\'un',
      tribeOrClanEn: 'Banu Adi clan of Quraysh',
      wivesEn: [],
      sonsEn: [],
      daughtersEn: [],
      keyRelativesEn: ['Prophet Muhammad (PBUH) — Beloved Husband', 'Abdullah ibn Umar — Brother', 'Uthman ibn Maz\'un — Maternal Uncle'],
      overviewEn: 'Her custody of the original Quranic scrolls made her the pivotal link in Caliph Uthman\'s universal Quranic standardization.'
    }
  }
};

// Merge all 107 companions into SAHABA_EN_DATABASE
Object.assign(SAHABA_EN_DATABASE, SAHABA_EN_ALL_107);

// Add aliases for legacy keys
export const SAHABA_ALIAS_KEYS: Record<string, string> = {
  'uthman-ibn-affan': 'uthman-bin-affan',
  'ali-ibn-abi-talib': 'ali-bin-abi-talib',
  'talha-ibn-ubaidullah': 'talha-ibn-ubaydullah',
  'abu-ubaidah-ibn-jarrah': 'abu-ubaidah-ibn-al-jarrah',
  'musab-ibn-umair': 'musab-ibn-umayr',
  'ammar-and-sumayyah': 'ammar-ibn-yasir',
  'khabbaab-ibn-al-aratt': 'khabbab-ibn-al-aratt',
  'suhaib-ar-rumi': 'suhayb-ar-rumi',
  'sad-ibn-al-rabi': 'saad-ibn-al-rabi',
  'sad-ibn-muadh': 'saad-ibn-muadh',
  'fatima-az-zahra': 'fatimah-az-zahra',
};

// Ensure bidirectional lookup for all aliases
for (const [canonicalId, legacyId] of Object.entries(SAHABA_ALIAS_KEYS)) {
  if (SAHABA_EN_DATABASE[legacyId] && !SAHABA_EN_DATABASE[canonicalId]) {
    SAHABA_EN_DATABASE[canonicalId] = SAHABA_EN_DATABASE[legacyId];
  } else if (SAHABA_EN_DATABASE[canonicalId] && !SAHABA_EN_DATABASE[legacyId]) {
    SAHABA_EN_DATABASE[legacyId] = SAHABA_EN_DATABASE[canonicalId];
  }
}

/**
 * Universal name generator for any Sahaba in English.
 * NEVER returns Bengali characters in English mode.
 */
export function getEnglishSahabaName(id: string, _fallbackBn?: string): string {
  if (SAHABA_EN_DATABASE[id]?.name) return SAHABA_EN_DATABASE[id].name;
  if (SAHABA_ALIAS_KEYS[id] && SAHABA_EN_DATABASE[SAHABA_ALIAS_KEYS[id]]?.name) {
    return SAHABA_EN_DATABASE[SAHABA_ALIAS_KEYS[id]].name;
  }
  
  // Format clean Title Case English from id, strictly English characters
  const formatted = id
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return `Hazrat ${formatted} (RA)`;
}

export function getEnglishSahabaTitle(id: string, _fallbackBn?: string): string {
  if (SAHABA_EN_DATABASE[id]?.title) return SAHABA_EN_DATABASE[id].title;
  if (SAHABA_ALIAS_KEYS[id] && SAHABA_EN_DATABASE[SAHABA_ALIAS_KEYS[id]]?.title) {
    return SAHABA_EN_DATABASE[SAHABA_ALIAS_KEYS[id]].title;
  }
  return 'Prominent Companion of Prophet Muhammad (PBUH)';
}

export function getEnglishSahabaSummary(id: string, _fallbackBn?: string): string {
  if (SAHABA_EN_DATABASE[id]?.summary) return SAHABA_EN_DATABASE[id].summary;
  if (SAHABA_ALIAS_KEYS[id] && SAHABA_EN_DATABASE[SAHABA_ALIAS_KEYS[id]]?.summary) {
    return SAHABA_EN_DATABASE[SAHABA_ALIAS_KEYS[id]].summary;
  }
  return 'Distinguished companion of Prophet Muhammad (PBUH) renowned for steadfast faith and virtue.';
}

