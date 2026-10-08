export interface HistoryEra {
  id: string;
  from: number;
  to: number;
  col: string;
  scene: string;
  name: { en: string; bn: string };
  sum: { en: string; bn: string };
  who: { en: string; bn: string };
}

export interface HistoryEvent {
  y: number; // yearAD
  ah?: number; // yearAH (optional)
  cat: 'seerah' | 'battle' | 'spread' | 'knowledge' | 'build' | 'bengal' | 'awliya' | 'sultan';
  lat: number;
  lon: number;
  sc: string; // scene background theme
  route?: string; // route name (optional)
  t: { en: string; bn: string }; // title
  p: { en: string; bn: string }; // location then
  n: { en: string; bn: string }; // location now
  d: { en: string; bn: string }; // description
  l?: { en: string; bn: string }; // lesson (optional)
}

export const ISLAMIC_HISTORY_ERAS: HistoryEra[] = [
  {
    "id": "makkah",
    "from": 570,
    "to": 622,
    "col": "--era1",
    "scene": "makkah",
    "name": {
      "en": "The Makkan Years",
      "bn": "মক্কা শরীফের যুগ"
    },
    "sum": {
      "en": "Rasulullah {SAW} is born in Makkah, grows up known as al-Amin, the Trustworthy, and at forty receives the first revelation in the Cave of Hira. For thirteen years He calls people to the Oneness of Allah Ta'ala with patience, while His Companions {RAHUM} bear hardship and persecution.",
      "bn": "মক্কা শরীফে রাসূলুল্লাহ {SAW} উনার পবিত্র বিলাদত শরীফ হয়। উনি ‘আল-আমিন’ — পরম বিশ্বস্ত — নামে পরিচিত হন, এবং চল্লিশ বছর বয়স মুবারকে হেরা গুহায় প্রথম ওহি মুবারক লাভ করেন। তেরো বছর ধরে উনি ধৈর্যের সাথে মানুষকে আল্লাহ তাআলার একত্বের দিকে আহ্বান করেন, আর উনার সাহাবায়ে কেরাম {RAHUM} কঠিন নির্যাতন সহ্য করেন।"
    },
    "who": {
      "en": "Ummi Khadijah {RAHA} · Sayyiduna Abu Bakr Siddiq {RA} · Sayyiduna Ali {RA} · Sayyiduna Bilal {RA} · Sayyiduna Hamzah {RA}",
      "bn": "আম্মাজান খাদিজাতুল কুবরা {RAHA} · সাইয়্যিদুনা আবু বকর সিদ্দিক {RA} · সাইয়্যিদুনা আলি {RA} · সাইয়্যিদুনা বিলাল {RA} · সাইয়্যিদুনা হামজা {RA}"
    }
  },
  {
    "id": "madinah",
    "from": 622,
    "to": 632,
    "col": "--era2",
    "scene": "madinah",
    "name": {
      "en": "The Madinan Years",
      "bn": "মদিনা শরীফের যুগ"
    },
    "sum": {
      "en": "After the Hijrah, Yathrib becomes al-Madinah al-Munawwarah, the Illuminated City. Rasulullah {SAW} builds the Masjid, joins the Muhajirun and Ansar {RAHUM} in brotherhood, and within ten years nearly all of Arabia enters Islam.",
      "bn": "হিজরতের পর ইয়াসরিব হয়ে ওঠে আল-মদিনাতুল মুনাওয়ারা — আলোকিত নগরী। রাসূলুল্লাহ {SAW} মসজিদ নির্মাণ করেন, মুহাজির ও আনসার {RAHUM} উনাদের মাঝে ভ্রাতৃত্ব স্থাপন করেন, আর দশ বছরের মধ্যে প্রায় সমগ্র আরব ইসলামে প্রবেশ করে।"
    },
    "who": {
      "en": "Ummi Aishah {RAHA} · Sayyiduna Umar al-Faruq {RA} · Sayyiduna Uthman {RA} · Sayyidatuna Fatimah al-Zahra {RAHA} · the Ansar {RAHUM}",
      "bn": "আম্মাজান আয়েশা সিদ্দিকা {RAHA} · সাইয়্যিদুনা উমর ফারুক {RA} · সাইয়্যিদুনা উসমান {RA} · সাইয়্যিদাতুনা ফাতিমাতুয যাহরা {RAHA} · আনসারগণ {RAHUM}"
    }
  },
  {
    "id": "rashidun",
    "from": 632,
    "to": 661,
    "col": "--era3",
    "scene": "rashidun",
    "name": {
      "en": "The Rightly-Guided Caliphs",
      "bn": "খুলাফায়ে রাশেদিন"
    },
    "sum": {
      "en": "Four Caliphs {RAHUM} lead the ummah with justice. Within thirty years Islam reaches from Libya to Khurasan, the Qur'an is gathered into one mushaf, and the Hijri calendar is established.",
      "bn": "চার খলিফা {RAHUM} ন্যায়ের সাথে উম্মাহর নেতৃত্ব দেন। ত্রিশ বছরের মধ্যে লিবিয়া থেকে খোরাসান পর্যন্ত ইসলাম পৌঁছে যায়, পবিত্র কুরআন এক মুসহাফে সংকলিত হয় এবং হিজরি সন প্রবর্তিত হয়।"
    },
    "who": {
      "en": "Sayyiduna Abu Bakr Siddiq {RA} (632–634) · Sayyiduna Umar al-Faruq {RA} (634–644) · Sayyiduna Uthman Dhun-Nurayn {RA} (644–656) · Sayyiduna Ali al-Murtada {RA} (656–661)",
      "bn": "সাইয়্যিদুনা আবু বকর সিদ্দিক {RA} (৬৩২–৬৩৪) · সাইয়্যিদুনা উমর ফারুক {RA} (৬৩৪–৬৪৪) · সাইয়্যিদুনা উসমান যুন্নুরাইন {RA} (৬৪৪–৬৫৬) · সাইয়্যিদুনা আলি মুরতাযা {RA} (৬৫৬–৬৬১)"
    }
  },
  {
    "id": "umayyad",
    "from": 661,
    "to": 750,
    "col": "--era4",
    "scene": "umayyad",
    "name": {
      "en": "The Umayyad Caliphate",
      "bn": "উমাইয়া খিলাফত"
    },
    "sum": {
      "en": "From Damascus the caliphate stretches from al-Andalus to Sindh and Central Asia. Arabic becomes the language of learning and administration, and great mosques rise in Jerusalem and Damascus.",
      "bn": "দামেস্ক থেকে খিলাফত আল-আন্দালুস থেকে সিন্ধু ও মধ্য এশিয়া পর্যন্ত বিস্তৃত হয়। আরবি হয় জ্ঞান ও প্রশাসনের ভাষা, আর বায়তুল মাকদিস ও দামেস্কে নির্মিত হয় মহান মসজিদসমূহ।"
    },
    "who": {
      "en": "Sayyiduna Mu'awiyah {RA} · Sayyiduna Husayn {RA} · Umar ibn Abd al-Aziz {RH} · Tariq ibn Ziyad {RH}",
      "bn": "সাইয়্যিদুনা মুআবিয়া {RA} · সাইয়্যিদুনা হুসাইন {RA} · উমর ইবনে আবদুল আজিজ {RH} · তারিক বিন জিয়াদ {RH}"
    }
  },
  {
    "id": "abbasid",
    "from": 750,
    "to": 1258,
    "col": "--era5",
    "scene": "abbasid",
    "name": {
      "en": "The Golden Age of Knowledge",
      "bn": "জ্ঞানের স্বর্ণযুগ"
    },
    "sum": {
      "en": "Baghdad becomes the world's centre of learning. The great Imams {RHM} lay the foundations of fiqh, the books of hadith are compiled, and Muslim scholars lead the world in mathematics, medicine and astronomy.",
      "bn": "বাগদাদ হয়ে ওঠে বিশ্বের জ্ঞানকেন্দ্র। মহান ইমামগণ {RHM} ফিকহের ভিত্তি স্থাপন করেন, হাদিসের কিতাবসমূহ সংকলিত হয়, আর গণিত, চিকিৎসা ও জ্যোতির্বিজ্ঞানে মুসলিম আলেমগণ বিশ্বকে পথ দেখান।"
    },
    "who": {
      "en": "Imam Abu Hanifa {RH} · Imam Bukhari {RH} · Imam Ghazali {RH} · Sultan Salahuddin al-Ayyubi {RH}",
      "bn": "ইমাম আবু হানিফা {RH} · ইমাম বুখারি {RH} · ইমাম গাযালি {RH} · সুলতান সালাহউদ্দিন আইয়ুবি {RH}"
    }
  },
  {
    "id": "sultanates",
    "from": 1258,
    "to": 1500,
    "col": "--era6",
    "scene": "bengal",
    "name": {
      "en": "Saints and Sultanates",
      "bn": "আউলিয়া ও সালতানাতের যুগ"
    },
    "sum": {
      "en": "After Baghdad falls, Islam spreads through the travels of saints and scholars: to Bengal, Anatolia, West Africa and the Malay world. Bengal becomes a united Sultanate and its terracotta mosques rise beside the rivers.",
      "bn": "বাগদাদের পতনের পর আউলিয়া ও আলেমগণের সফরের মাধ্যমে ইসলাম ছড়িয়ে পড়ে বাংলা, আনাতোলিয়া, পশ্চিম আফ্রিকা ও মালয় অঞ্চলে। বাংলা এক সালতানাতে ঐক্যবদ্ধ হয়, আর নদীর তীরে গড়ে ওঠে পোড়ামাটির অপূর্ব মসজিদ।"
    },
    "who": {
      "en": "Hazrat Shah Jalal {RH} · Hazrat Khan Jahan Ali {RH} · Mawlana Rumi {RH} · Sultan al-Fatih {RH}",
      "bn": "হযরত শাহজালাল {RH} · হযরত খান জাহান আলি {RH} · মাওলানা রুমি {RH} · সুলতান আল-ফাতিহ {RH}"
    }
  },
  {
    "id": "empires",
    "from": 1500,
    "to": 1800,
    "col": "--era7",
    "scene": "empires",
    "name": {
      "en": "The Great Empires",
      "bn": "মহান সাম্রাজ্যের যুগ"
    },
    "sum": {
      "en": "The Ottomans serve the Two Holy Mosques, the Mughals rule South Asia and Dhaka becomes a capital of Bengal. Architecture reaches new heights in Istanbul, Agra and Dhaka.",
      "bn": "উসমানীয়রা হারামাইন শরীফাইনের খেদমত করেন, মুঘলরা দক্ষিণ এশিয়া শাসন করেন, আর ঢাকা হয় বাংলার রাজধানী। ইস্তাম্বুল, আগ্রা ও ঢাকায় স্থাপত্য শিল্প নতুন উচ্চতায় পৌঁছায়।"
    },
    "who": {
      "en": "Sultan Suleiman · Mimar Sinan · Emperor Aurangzeb {RH} · Shaykh Ahmad Sirhindi {RH}",
      "bn": "সুলতান সুলাইমান · মিমার সিনান · সম্রাট আওরঙ্গজেব {RH} · শায়খ আহমদ সিরহিন্দি {RH}"
    }
  },
  {
    "id": "modern",
    "from": 1800,
    "to": 2026,
    "col": "--era8",
    "scene": "modern",
    "name": {
      "en": "The Ummah Today",
      "bn": "আজকের উম্মাহ"
    },
    "sum": {
      "en": "Through colonial rule and independence, the ummah holds on to its faith. Movements of revival rise in Bengal, madrasahs spread, and today nearly two billion Muslims turn to the same Ka'bah five times a day.",
      "bn": "ঔপনিবেশিক শাসন ও স্বাধীনতার মধ্য দিয়েও উম্মাহ ঈমান আঁকড়ে থাকে। বাংলায় দ্বীনি পুনর্জাগরণের আন্দোলন গড়ে ওঠে, মাদরাসা ছড়িয়ে পড়ে, আর আজ প্রায় দুইশো কোটি মুসলমান দিনে পাঁচবার একই কাবা শরীফের দিকে মুখ ফেরান।"
    },
    "who": {
      "en": "Haji Shariatullah {RH} · Shaheed Titumir {RH}",
      "bn": "হাজী শরীয়তুল্লাহ {RH} · শহীদ তিতুমীর {RH}"
    }
  }
];

export const ISLAMIC_HISTORY_EVENTS: HistoryEvent[] = [
  {
    "y": 570,
    "cat": "seerah",
    "lat": 21.4225,
    "lon": 39.8262,
    "sc": "kaaba",
    "t": {
      "en": "The Blessed Birth of Rasulullah {SAW}",
      "bn": "রাসূলুল্লাহ {SAW} উনার পবিত্র বিলাদত শরীফ"
    },
    "p": {
      "en": "Makkah al-Mukarramah",
      "bn": "মক্কা মুকাররমা"
    },
    "n": {
      "en": "Makkah, Saudi Arabia",
      "bn": "মক্কা, সৌদি আরব"
    },
    "d": {
      "en": "In the Year of the Elephant, when Allah Ta'ala turned back the army of Abraha from the Ka'bah (Surah al-Fil), Rasulullah {SAW} was born in Makkah into the noble house of Banu Hashim. His blessed father, Sayyiduna Abdullah {AS}, had passed away before His birth. In the desert of Banu Sa'd, Sayyidah Halimah al-Sa'diyyah {RAHA} nursed Him, and her household saw barakah they had never known.",
      "bn": "হস্তীবর্ষে, যখন আল্লাহ তাআলা আবরাহার বাহিনীকে কাবা শরীফ থেকে ফিরিয়ে দিলেন (সূরা ফীল), সেই বছর মক্কা শরীফে বনু হাশিমের সম্মানিত ঘরে রাসূলুল্লাহ {SAW} উনার পবিত্র বিলাদত শরীফ হয়। উনার সম্মানিত পিতা সাইয়্যিদুনা আবদুল্লাহ {AS} উনার বিলাদতের আগেই বিছাল লাভ করেন। বনু সাদের মরুভূমিতে সাইয়্যিদাহ হালিমা সাদিয়া {RAHA} উনাকে দুধ পান করান, আর উনার ঘর এমন বরকতে ভরে যায় যা আগে কখনো দেখা যায়নি।"
    },
    "l": {
      "en": "Allah Ta'ala protected His House the very year He sent His Beloved {SAW}.",
      "bn": "যে বছর আল্লাহ তাআলা উনার হাবিব {SAW} উনাকে পাঠালেন, সেই বছরই উনি নিজের ঘর কাবা শরীফকে রক্ষা করলেন।"
    }
  },
  {
    "y": 576,
    "cat": "seerah",
    "lat": 23.08,
    "lon": 38.98,
    "sc": "journey",
    "t": {
      "en": "Sayyidah Aminah {AHS} returns to her Lord",
      "bn": "সাইয়্যিদাহ আমিনা {AHS} উনার বিছাল"
    },
    "p": {
      "en": "al-Abwa",
      "bn": "আল-আবওয়া"
    },
    "n": {
      "en": "Near Rabigh, Saudi Arabia",
      "bn": "রাবিগের কাছে, সৌদি আরব"
    },
    "d": {
      "en": "Returning from a visit to Yathrib, His blessed mother Sayyidah Aminah {AHS} passed away at al-Abwa when Rasulullah {SAW} was six years old. His grandfather Abd al-Muttalib cared for Him with great love, and after him His uncle Abu Talib.",
      "bn": "ইয়াসরিব সফর থেকে ফেরার পথে আল-আবওয়ায় উনার সম্মানিত মাতা সাইয়্যিদাহ আমিনা {AHS} বিছাল লাভ করেন; তখন রাসূলুল্লাহ {SAW} উনার বয়স মুবারক ছয় বছর। এরপর দাদা আবদুল মুত্তালিব গভীর স্নেহে উনার দেখাশোনা করেন, আর উনার পরে চাচা আবু তালিব।"
    }
  },
  {
    "y": 582,
    "cat": "seerah",
    "lat": 32.52,
    "lon": 36.48,
    "sc": "journey",
    "route": "sham",
    "t": {
      "en": "The journey to Sham",
      "bn": "শাম দেশে সফর"
    },
    "p": {
      "en": "Busra, al-Sham",
      "bn": "বুসরা, শাম"
    },
    "n": {
      "en": "Bosra, Syria",
      "bn": "বুসরা, সিরিয়া"
    },
    "d": {
      "en": "At about twelve, Rasulullah {SAW} travelled with Abu Talib's trade caravan to Sham. At Busra the monk Bahira recognised the signs of prophethood described in the old scriptures, and advised Abu Talib to take Him home and protect Him.",
      "bn": "প্রায় বারো বছর বয়স মুবারকে রাসূলুল্লাহ {SAW} চাচা আবু তালিবের বাণিজ্য কাফেলার সাথে শাম দেশে সফর করেন। বুসরায় পাদ্রি বাহিরা পূর্ববর্তী কিতাবে বর্ণিত নবুওয়াতের নিদর্শন উনার মধ্যে চিনতে পারে, এবং আবু তালিবকে উনাকে নিরাপদে ঘরে ফিরিয়ে নিতে পরামর্শ দেয়।"
    }
  },
  {
    "y": 595,
    "cat": "seerah",
    "lat": 21.4225,
    "lon": 39.8262,
    "sc": "kaaba",
    "t": {
      "en": "Nikah with Ummi Khadijah {RAHA}",
      "bn": "আম্মাজান খাদিজা {RAHA} উনার সাথে নিকাহ মুবারক"
    },
    "p": {
      "en": "Makkah al-Mukarramah",
      "bn": "মক্কা মুকাররমা"
    },
    "n": {
      "en": "Makkah, Saudi Arabia",
      "bn": "মক্কা, সৌদি আরব"
    },
    "d": {
      "en": "Known throughout Makkah as al-Amin, Rasulullah {SAW} led the trade caravan of Ummi Khadijah {RAHA} to Sham with complete honesty. Moved by His character, she sent a proposal of marriage. Their blessed home became the first home of Islam, and she was the first of all people to believe in Him.",
      "bn": "সমগ্র মক্কায় ‘আল-আমিন’ নামে পরিচিত রাসূলুল্লাহ {SAW} পূর্ণ সততার সাথে আম্মাজান খাদিজা {RAHA} উনার বাণিজ্য কাফেলা নিয়ে শাম দেশে যান। উনার চরিত্র মুবারকে মুগ্ধ হয়ে আম্মাজান বিবাহের প্রস্তাব পাঠান। উনাদের বরকতময় ঘরই হয় ইসলামের প্রথম ঘর, আর আম্মাজান খাদিজা {RAHA} হন সর্বপ্রথম ঈমান আনয়নকারী।"
    }
  },
  {
    "y": 605,
    "cat": "seerah",
    "lat": 21.4225,
    "lon": 39.8262,
    "sc": "kaaba",
    "t": {
      "en": "Placing the Black Stone",
      "bn": "হাজরে আসওয়াদ স্থাপন"
    },
    "p": {
      "en": "The Ka'bah",
      "bn": "কাবা শরীফ"
    },
    "n": {
      "en": "Masjid al-Haram, Makkah",
      "bn": "মসজিদুল হারাম, মক্কা"
    },
    "d": {
      "en": "When the Quraysh rebuilt the Ka'bah, the tribes nearly fought over who would set the Black Stone in place. They agreed to accept the first man to enter the sanctuary — and it was al-Amin {SAW}. He placed the Stone on a cloth, had every tribal leader hold an edge, and set it in place with His own blessed hands.",
      "bn": "কুরাইশরা যখন কাবা শরীফ পুনর্নির্মাণ করছিল, হাজরে আসওয়াদ কে স্থাপন করবে তা নিয়ে গোত্রগুলো প্রায় যুদ্ধে জড়িয়ে পড়ছিল। সবাই একমত হলো, যিনি প্রথম হারামে প্রবেশ করবেন উনার ফয়সালা মানা হবে — আর তিনি ছিলেন আল-আমিন {SAW}। উনি একটি চাদরে পাথরটি রেখে প্রত্যেক গোত্রপ্রধানকে এক প্রান্ত ধরতে বলেন, তারপর নিজের পবিত্র হাত মুবারকে তা স্থাপন করেন।"
    },
    "l": {
      "en": "Wisdom and fairness can turn a quarrel into unity.",
      "bn": "প্রজ্ঞা ও ইনসাফ বিবাদকে ঐক্যে রূপান্তর করতে পারে।"
    }
  },
  {
    "y": 610,
    "cat": "seerah",
    "lat": 21.4576,
    "lon": 39.8593,
    "sc": "cave",
    "t": {
      "en": "The first revelation in the Cave of Hira",
      "bn": "হেরা গুহায় প্রথম ওহি মুবারক"
    },
    "p": {
      "en": "Jabal al-Nur",
      "bn": "জাবালে নূর"
    },
    "n": {
      "en": "Makkah, Saudi Arabia",
      "bn": "মক্কা, সৌদি আরব"
    },
    "d": {
      "en": "In Ramadan, while Rasulullah {SAW} was worshipping alone in the Cave of Hira, Sayyiduna Jibril {AS} came with the first words of the Qur'an: “Read in the name of your Lord who created” (al-Alaq 96:1–5). Ummi Khadijah {RAHA} comforted Him, and soon Sayyiduna Abu Bakr {RA}, Sayyiduna Ali {RA} and Sayyiduna Zayd ibn Harithah {RA} believed.",
      "bn": "রমজান মাসে রাসূলুল্লাহ {SAW} যখন হেরা গুহায় নির্জনে ইবাদতে মশগুল ছিলেন, তখন সাইয়্যিদুনা জিবরাইল {AS} কুরআন শরীফের প্রথম বাণী নিয়ে আসেন: “পড়ুন আপনার রবের নামে, যিনি সৃষ্টি করেছেন” (সূরা আলাক ৯৬:১–৫)। আম্মাজান খাদিজা {RAHA} উনাকে সান্ত্বনা দেন, আর অল্পদিনের মধ্যে সাইয়্যিদুনা আবু বকর {RA}, সাইয়্যিদুনা আলি {RA} ও সাইয়্যিদুনা যায়েদ ইবনে হারিসা {RA} ঈমান আনেন।"
    },
    "l": {
      "en": "The first command of Islam is to read — knowledge begins with the Name of Allah.",
      "bn": "ইসলামের প্রথম আদেশ — পড়ো। জ্ঞানের শুরু আল্লাহর নামে।"
    }
  },
  {
    "y": 613,
    "cat": "seerah",
    "lat": 21.4224,
    "lon": 39.8274,
    "sc": "kaaba",
    "t": {
      "en": "The call from Mount Safa",
      "bn": "সাফা পাহাড় থেকে আহ্বান"
    },
    "p": {
      "en": "Mount Safa",
      "bn": "সাফা পাহাড়"
    },
    "n": {
      "en": "Masjid al-Haram, Makkah",
      "bn": "মসজিদুল হারাম, মক্কা"
    },
    "d": {
      "en": "Commanded to warn His near kin (al-Shu'ara 26:214), Rasulullah {SAW} climbed Mount Safa and called the clans of Quraysh. “If I told you an army was behind this hill, would you believe me?” They said, “We have never known you to lie.” Then He called them to Allah Ta'ala alone.",
      "bn": "নিকটাত্মীয়দের সতর্ক করার নির্দেশ (সূরা শুআরা ২৬:২১৪) পেয়ে রাসূলুল্লাহ {SAW} সাফা পাহাড়ে আরোহণ করে কুরাইশের গোত্রগুলোকে ডাকেন। উনি বলেন, “যদি বলি এই পাহাড়ের পেছনে একদল সৈন্য আছে, তোমরা কি বিশ্বাস করবে?” তারা বলল, “আমরা আপনাকে কখনো মিথ্যা বলতে দেখিনি।” তখন উনি তাদের এক আল্লাহর দিকে আহ্বান করেন।"
    }
  },
  {
    "y": 615,
    "cat": "seerah",
    "lat": 14.13,
    "lon": 38.72,
    "sc": "sea",
    "route": "abyssinia",
    "t": {
      "en": "The Hijrah to Abyssinia",
      "bn": "হাবশায় হিজরত"
    },
    "p": {
      "en": "Aksum, al-Habasha",
      "bn": "আকসুম, হাবশা"
    },
    "n": {
      "en": "Aksum, Ethiopia",
      "bn": "আকসুম, ইথিওপিয়া"
    },
    "d": {
      "en": "To escape persecution, a group of Companions {RAHUM} — among them Sayyiduna Uthman {RA} and Sayyidatuna Ruqayyah {RAHA} — crossed the Red Sea to the just king al-Najashi {RH}. When Sayyiduna Ja'far ibn Abi Talib {RA} recited Surah Maryam before him, the king wept and gave them his protection.",
      "bn": "নির্যাতন থেকে বাঁচতে সাহাবায়ে কেরাম {RAHUM} উনাদের একটি দল — যাঁদের মধ্যে ছিলেন সাইয়্যিদুনা উসমান {RA} ও সাইয়্যিদাতুনা রুকাইয়া {RAHA} — লোহিত সাগর পাড়ি দিয়ে ন্যায়পরায়ণ বাদশাহ নাজ্জাশি {RH} উনার কাছে আশ্রয় নেন। সাইয়্যিদুনা জাফর ইবনে আবি তালিব {RA} যখন সূরা মারইয়াম তিলাওয়াত করেন, বাদশাহ কেঁদে ফেলেন এবং উনাদের নিরাপত্তা দেন।"
    }
  },
  {
    "y": 616,
    "cat": "seerah",
    "lat": 21.425,
    "lon": 39.835,
    "sc": "journey",
    "t": {
      "en": "The boycott in Shi'b Abi Talib",
      "bn": "শিআবে আবি তালিবে অবরোধ"
    },
    "p": {
      "en": "Shi'b Abi Talib",
      "bn": "শিআবে আবি তালিব"
    },
    "n": {
      "en": "Makkah, Saudi Arabia",
      "bn": "মক্কা, সৌদি আরব"
    },
    "d": {
      "en": "The Quraysh signed a pact to boycott Banu Hashim. For nearly three years Rasulullah {SAW}, Ummi Khadijah {RAHA} and their family were confined to a narrow valley, eating leaves when food ran out. The pact ended when its written page was found eaten away, except for the words “In Your Name, O Allah”.",
      "bn": "কুরাইশরা বনু হাশিমকে বয়কটের চুক্তি করে। প্রায় তিন বছর রাসূলুল্লাহ {SAW}, আম্মাজান খাদিজা {RAHA} ও উনাদের পরিবার এক সংকীর্ণ উপত্যকায় অবরুদ্ধ থাকেন; খাবার ফুরিয়ে গেলে গাছের পাতা খেতে হয়েছে। শেষে দেখা গেল, চুক্তিপত্রের লেখা উইপোকায় খেয়ে ফেলেছে — শুধু “বিসমিকা আল্লাহুম্মা” অবশিষ্ট আছে; এভাবে অবরোধ শেষ হয়।"
    }
  },
  {
    "y": 619,
    "cat": "seerah",
    "lat": 21.27,
    "lon": 40.42,
    "sc": "mountain",
    "route": "taif",
    "t": {
      "en": "The Year of Sorrow and the journey to Ta'if",
      "bn": "দুঃখের বছর ও তায়েফ সফর"
    },
    "p": {
      "en": "Ta'if",
      "bn": "তায়েফ"
    },
    "n": {
      "en": "Ta'if, Saudi Arabia",
      "bn": "তায়েফ, সৌদি আরব"
    },
    "d": {
      "en": "Ummi Khadijah {RAHA} and Abu Talib passed away in the same year. Rasulullah {SAW} walked to Ta'if to call the tribe of Thaqif, and was driven out with stones until His blessed feet bled. When the angel of the mountains offered to crush the town, He {SAW} said: “Rather, I hope Allah will bring from them people who worship Him alone.”",
      "bn": "একই বছরে আম্মাজান খাদিজা {RAHA} ও চাচা আবু তালিব ইন্তেকাল করেন। রাসূলুল্লাহ {SAW} পায়ে হেঁটে তায়েফে সাকিফ গোত্রকে দাওয়াত দিতে যান, আর তারা পাথর মেরে উনাকে বের করে দেয়, এমনকি উনার পবিত্র কদম মুবারক রক্তাক্ত হয়ে যায়। পাহাড়ের ফেরেশতা যখন শহরটি পিষে দেওয়ার অনুমতি চান, উনি {SAW} বলেন: “বরং আমি আশা করি, আল্লাহ তাদের বংশধর থেকে এমন মানুষ বের করবেন যারা শুধু উনারই ইবাদত করবে।”"
    },
    "l": {
      "en": "Mercy toward those who hurt us is the way of Rasulullah {SAW}.",
      "bn": "যারা কষ্ট দেয় তাদের প্রতিও রহমত — এটাই রাসূলুল্লাহ {SAW} উনার আদর্শ।"
    }
  },
  {
    "y": 621,
    "cat": "seerah",
    "lat": 31.776,
    "lon": 35.236,
    "sc": "domerock",
    "route": "isra",
    "t": {
      "en": "al-Isra wal-Mi'raj",
      "bn": "পবিত্র ইসরা ও মিরাজ শরীফ"
    },
    "p": {
      "en": "Bayt al-Maqdis",
      "bn": "বায়তুল মাকদিস"
    },
    "n": {
      "en": "al-Quds (Jerusalem), Palestine",
      "bn": "আল-কুদস (জেরুজালেম), ফিলিস্তিন"
    },
    "d": {
      "en": "In a single night Allah Ta'ala took His Beloved {SAW} from al-Masjid al-Haram to al-Masjid al-Aqsa (al-Isra 17:1), where He led all the Prophets {ASM} in prayer, and then raised Him through the heavens. The five daily prayers were gifted to the ummah on this night. Sayyiduna Abu Bakr {RA} believed at once and was named al-Siddiq.",
      "bn": "এক রাতে আল্লাহ তাআলা উনার হাবিব {SAW} উনাকে মসজিদুল হারাম থেকে মসজিদুল আকসায় নিয়ে যান (সূরা ইসরা ১৭:১), যেখানে উনি সকল নবী {ASM} উনাদের ইমামতি করেন; তারপর উনাকে ঊর্ধ্বাকাশে আরোহণ করান। এই রাতেই উম্মতকে পাঁচ ওয়াক্ত নামাজের উপহার দেওয়া হয়। সাইয়্যিদুনা আবু বকর {RA} সাথে সাথে বিশ্বাস করেন এবং ‘সিদ্দিক’ উপাধি লাভ করেন।"
    }
  },
  {
    "y": 621.6,
    "cat": "seerah",
    "lat": 21.42,
    "lon": 39.87,
    "sc": "journey",
    "t": {
      "en": "The Pledges of al-Aqabah",
      "bn": "আকাবার বাইআত"
    },
    "p": {
      "en": "al-Aqabah, Mina",
      "bn": "আকাবা, মিনা"
    },
    "n": {
      "en": "Mina, near Makkah",
      "bn": "মিনা, মক্কার কাছে"
    },
    "d": {
      "en": "During the Hajj season, believers from Yathrib met Rasulullah {SAW} secretly at al-Aqabah and pledged to protect Him as they protected their own families. Sayyiduna Mus'ab ibn Umayr {RA} went with them as the first teacher of Islam in Yathrib.",
      "bn": "হজের মৌসুমে ইয়াসরিবের ঈমানদারগণ আকাবায় গোপনে রাসূলুল্লাহ {SAW} উনার সাথে সাক্ষাৎ করে বাইআত গ্রহণ করেন — নিজেদের পরিবারের মতোই উনাকে রক্ষা করবেন। সাইয়্যিদুনা মুসআব ইবনে উমাইর {RA} উনাদের সাথে ইয়াসরিবে যান ইসলামের প্রথম শিক্ষক হিসেবে।"
    }
  },
  {
    "y": 622,
    "ah": 1,
    "cat": "seerah",
    "lat": 24.4672,
    "lon": 39.6112,
    "sc": "mosque",
    "route": "hijrah",
    "t": {
      "en": "The Blessed Hijrah",
      "bn": "পবিত্র হিজরত মুবারক"
    },
    "p": {
      "en": "Yathrib → al-Madinah al-Munawwarah",
      "bn": "ইয়াসরিব → মদিনা মুনাওয়ারা"
    },
    "n": {
      "en": "Madinah, Saudi Arabia",
      "bn": "মদিনা, সৌদি আরব"
    },
    "d": {
      "en": "With Sayyiduna Abu Bakr Siddiq {RA}, Rasulullah {SAW} left Makkah by night and stayed three nights in the Cave of Thawr. “Do not grieve, Allah is with us” (al-Tawbah 9:40). Taking the coastal road north, He reached Quba and built the first masjid, then entered Yathrib to songs of welcome. The city became al-Madinah al-Munawwarah.",
      "bn": "সাইয়্যিদুনা আবু বকর সিদ্দিক {RA} উনাকে সাথে নিয়ে রাসূলুল্লাহ {SAW} রাতে মক্কা শরীফ ত্যাগ করেন এবং তিন রাত সাওর গুহায় অবস্থান করেন। “চিন্তা করবেন না, আল্লাহ আমাদের সাথে আছেন” (সূরা তাওবা ৯:৪০)। উপকূলের পথে উত্তরে গিয়ে উনি কুবায় পৌঁছে প্রথম মসজিদ নির্মাণ করেন, তারপর আনন্দের নাশিদ ‘তালাআল বাদরু আলাইনা’-র মধ্যে ইয়াসরিবে প্রবেশ করেন। শহরটি হয়ে যায় মদিনা মুনাওয়ারা।"
    },
    "l": {
      "en": "The Hijri calendar counts from this journey — a new beginning built on trust in Allah.",
      "bn": "হিজরি সন এই সফর থেকেই গণনা হয় — আল্লাহর ওপর ভরসায় এক নতুন শুরু।"
    }
  },
  {
    "y": 622.4,
    "ah": 1,
    "cat": "build",
    "lat": 24.4672,
    "lon": 39.6112,
    "sc": "mosque",
    "t": {
      "en": "al-Masjid al-Nabawi and the brotherhood",
      "bn": "মসজিদে নববি শরীফ ও ভ্রাতৃত্ব"
    },
    "p": {
      "en": "al-Madinah al-Munawwarah",
      "bn": "মদিনা মুনাওয়ারা"
    },
    "n": {
      "en": "Madinah, Saudi Arabia",
      "bn": "মদিনা, সৌদি আরব"
    },
    "d": {
      "en": "Rasulullah {SAW} carried bricks with His own blessed hands to build the Masjid from palm trunks and mud. He joined each Muhajir with an Ansari as brothers, and the Ansar {RAHUM} shared their homes and gardens. The Charter of Madinah set out the rights of every community in the city.",
      "bn": "রাসূলুল্লাহ {SAW} নিজের পবিত্র হাত মুবারকে ইট বহন করে খেজুর গাছের কাণ্ড ও মাটি দিয়ে মসজিদ নির্মাণ করেন। উনি প্রত্যেক মুহাজিরকে একজন আনসারীর ভাই বানিয়ে দেন, আর আনসারগণ {RAHUM} নিজেদের ঘর ও বাগান ভাগ করে নেন। মদিনা সনদে শহরের প্রতিটি সম্প্রদায়ের অধিকার নির্ধারিত হয়।"
    }
  },
  {
    "y": 624,
    "ah": 2,
    "cat": "seerah",
    "lat": 24.48,
    "lon": 39.578,
    "sc": "kaaba",
    "t": {
      "en": "The Qiblah turns to the Ka'bah",
      "bn": "কিবলা পরিবর্তন"
    },
    "p": {
      "en": "Masjid al-Qiblatayn",
      "bn": "মসজিদে কিবলাতাইন"
    },
    "n": {
      "en": "Madinah, Saudi Arabia",
      "bn": "মদিনা, সৌদি আরব"
    },
    "d": {
      "en": "For about sixteen months the Muslims prayed toward Bayt al-Maqdis. Rasulullah {SAW} longed for the Ka'bah, and Allah Ta'ala revealed: “We have seen the turning of your face toward the heaven; so turn your face toward al-Masjid al-Haram” (al-Baqarah 2:144). The change came in the middle of a prayer.",
      "bn": "প্রায় ষোলো মাস মুসলমানরা বায়তুল মাকদিসের দিকে নামাজ পড়েছেন। রাসূলুল্লাহ {SAW} কাবা শরীফের দিকে ফেরার আকাঙ্ক্ষা করতেন, তখন আল্লাহ তাআলা নাজিল করেন: “আমি আপনার মুখ মুবারক বারবার আকাশের দিকে ফেরানো দেখেছি; সুতরাং আপনার মুখ মসজিদুল হারামের দিকে ফেরান” (সূরা বাকারা ২:১৪৪)। নামাজের মাঝখানেই এই পরিবর্তন আসে।"
    }
  },
  {
    "y": 624.2,
    "ah": 2,
    "cat": "battle",
    "lat": 23.73,
    "lon": 38.77,
    "sc": "wells",
    "t": {
      "en": "The Battle of Badr",
      "bn": "বদরের যুদ্ধ"
    },
    "p": {
      "en": "The wells of Badr",
      "bn": "বদরের কূপ"
    },
    "n": {
      "en": "Badr, Saudi Arabia",
      "bn": "বদর, সৌদি আরব"
    },
    "d": {
      "en": "On 17 Ramadan 2 AH, 313 Companions {RAHUM} faced about a thousand of the Quraysh. Rasulullah {SAW} spent the night in du'a, and Allah Ta'ala sent help with angels (Al Imran 3:123–124). The Qur'an calls it Yawm al-Furqan, the Day of Criterion. The people of Badr {RAHUM} hold a special rank among the Companions.",
      "bn": "২ হিজরির ১৭ রমজান ৩১৩ জন সাহাবি {RAHUM} প্রায় এক হাজার কুরাইশ সৈন্যের মুখোমুখি হন। রাসূলুল্লাহ {SAW} সারা রাত দোয়ায় কাটান, আর আল্লাহ তাআলা ফেরেশতা পাঠিয়ে সাহায্য করেন (সূরা আলে ইমরান ৩:১২৩–১২৪)। কুরআন শরীফ এই দিনকে ‘ইয়াওমুল ফুরকান’ — সত্য-মিথ্যার পার্থক্যের দিন — বলেছে। আহলে বদর {RAHUM} সাহাবিদের মধ্যে বিশেষ মর্যাদার অধিকারী।"
    },
    "l": {
      "en": "Victory comes from Allah, not from numbers.",
      "bn": "বিজয় আসে আল্লাহর পক্ষ থেকে, সংখ্যার জোরে নয়।"
    }
  },
  {
    "y": 625,
    "ah": 3,
    "cat": "battle",
    "lat": 24.502,
    "lon": 39.613,
    "sc": "mountain",
    "t": {
      "en": "The Battle of Uhud",
      "bn": "উহুদের যুদ্ধ"
    },
    "p": {
      "en": "Mount Uhud",
      "bn": "উহুদ পাহাড়"
    },
    "n": {
      "en": "Madinah, Saudi Arabia",
      "bn": "মদিনা, সৌদি আরব"
    },
    "d": {
      "en": "The Muslims were winning until most of the archers left their post on the hill. The enemy turned, Sayyiduna Hamzah {RA}, the Master of the Martyrs, was martyred, and Rasulullah {SAW} was wounded. Yet He said of Uhud: “It is a mountain that loves us and we love it.”",
      "bn": "মুসলমানরা জয়ের পথে ছিলেন, কিন্তু অধিকাংশ তীরন্দাজ পাহাড়ের নির্ধারিত অবস্থান ছেড়ে দেন। শত্রুরা ঘুরে আক্রমণ করে; শহিদদের সরদার সাইয়্যিদুনা হামজা {RA} শাহাদাত বরণ করেন, আর রাসূলুল্লাহ {SAW} আহত হন। তবুও উনি উহুদ সম্পর্কে বলেছেন: “এটি এমন পাহাড় যা আমাদের ভালোবাসে, আমরাও একে ভালোবাসি।”"
    },
    "l": {
      "en": "Obeying the command of Rasulullah {SAW} is the key to success.",
      "bn": "রাসূলুল্লাহ {SAW} উনার নির্দেশ মানাই সফলতার চাবিকাঠি।"
    }
  },
  {
    "y": 627,
    "ah": 5,
    "cat": "battle",
    "lat": 24.476,
    "lon": 39.59,
    "sc": "trench",
    "t": {
      "en": "The Battle of the Trench",
      "bn": "খন্দকের যুদ্ধ"
    },
    "p": {
      "en": "al-Madinah al-Munawwarah",
      "bn": "মদিনা মুনাওয়ারা"
    },
    "n": {
      "en": "Madinah, Saudi Arabia",
      "bn": "মদিনা, সৌদি আরব"
    },
    "d": {
      "en": "On the advice of Sayyiduna Salman al-Farisi {RA}, a trench was dug across Madinah's open northern side. Rasulullah {SAW} dug alongside the Companions {RAHUM}, with stones tied to His blessed stomach from hunger. A coalition of ten thousand besieged the city for weeks, until a cold wind sent by Allah Ta'ala scattered them.",
      "bn": "সাইয়্যিদুনা সালমান ফারসি {RA} উনার পরামর্শে মদিনার খোলা উত্তর দিকে পরিখা খনন করা হয়। রাসূলুল্লাহ {SAW} সাহাবায়ে কেরাম {RAHUM} উনাদের সাথে নিজেও খনন করেন, ক্ষুধায় পেট মুবারকে পাথর বাঁধা ছিল। দশ হাজার সৈন্যের সম্মিলিত বাহিনী কয়েক সপ্তাহ অবরোধ করে রাখে, শেষে আল্লাহ তাআলার পাঠানো ঠান্ডা ঝড়ো বাতাসে তারা ছত্রভঙ্গ হয়ে যায়।"
    }
  },
  {
    "y": 628,
    "ah": 6,
    "cat": "seerah",
    "lat": 21.44,
    "lon": 39.62,
    "sc": "tree",
    "t": {
      "en": "The Treaty of al-Hudaybiyyah",
      "bn": "হুদায়বিয়ার সন্ধি"
    },
    "p": {
      "en": "al-Hudaybiyyah",
      "bn": "আল-হুদায়বিয়া"
    },
    "n": {
      "en": "al-Shumaisi, near Makkah",
      "bn": "আশ-শুমাইসি, মক্কার কাছে"
    },
    "d": {
      "en": "Setting out for umrah, Rasulullah {SAW} and 1,400 Companions {RAHUM} were stopped at al-Hudaybiyyah. Beneath a tree they gave the Pledge of Ridwan, and Allah Ta'ala said He was pleased with them (al-Fath 48:18). The ten-year truce looked unequal, yet the Qur'an named it a clear victory, and more people entered Islam in the following two years than ever before.",
      "bn": "উমরার উদ্দেশ্যে বের হয়ে রাসূলুল্লাহ {SAW} ও ১,৪০০ সাহাবি {RAHUM} হুদায়বিয়ায় বাধাপ্রাপ্ত হন। একটি গাছের নিচে উনারা বাইআতে রিদওয়ান গ্রহণ করেন, আর আল্লাহ তাআলা উনাদের প্রতি সন্তুষ্টির ঘোষণা দেন (সূরা ফাতহ ৪৮:১৮)। দশ বছরের সন্ধিটি আপাতদৃষ্টিতে অসম মনে হলেও কুরআন শরীফ একে ‘সুস্পষ্ট বিজয়’ বলেছে; পরের দুই বছরে আগের চেয়ে অনেক বেশি মানুষ ইসলাম গ্রহণ করে।"
    },
    "l": {
      "en": "Patience and peace can open more hearts than force.",
      "bn": "ধৈর্য ও শান্তি শক্তির চেয়ে বেশি হৃদয় জয় করে।"
    }
  },
  {
    "y": 628.5,
    "ah": 7,
    "cat": "seerah",
    "lat": 24.4672,
    "lon": 39.6112,
    "sc": "scroll",
    "t": {
      "en": "Letters to the kings of the world",
      "bn": "বিশ্বের রাজাদের কাছে পত্র মুবারক"
    },
    "p": {
      "en": "al-Madinah al-Munawwarah",
      "bn": "মদিনা মুনাওয়ারা"
    },
    "n": {
      "en": "Madinah, Saudi Arabia",
      "bn": "মদিনা, সৌদি আরব"
    },
    "d": {
      "en": "Rasulullah {SAW} had a silver seal ring made and sent letters inviting rulers to Islam: Heraclius of Rome, Khosrow of Persia, al-Muqawqis of Egypt and al-Najashi {RH} of Abyssinia. The message of Islam was now addressed to the whole world.",
      "bn": "রাসূলুল্লাহ {SAW} একটি রুপার সিলমোহর আংটি মুবারক তৈরি করান এবং শাসকদের কাছে ইসলামের দাওয়াত দিয়ে পত্র পাঠান: রোমের হিরাক্লিয়াস, পারস্যের খসরু, মিসরের মুকাওকিস ও হাবশার নাজ্জাশি {RH}। ইসলামের বাণী এখন সমগ্র বিশ্বের উদ্দেশে।"
    }
  },
  {
    "y": 628.7,
    "ah": 7,
    "cat": "battle",
    "lat": 25.69,
    "lon": 39.29,
    "sc": "fortress",
    "t": {
      "en": "Khaybar",
      "bn": "খায়বার"
    },
    "p": {
      "en": "The forts of Khaybar",
      "bn": "খায়বারের দুর্গসমূহ"
    },
    "n": {
      "en": "Khaybar, Saudi Arabia",
      "bn": "খায়বার, সৌদি আরব"
    },
    "d": {
      "en": "The fortified oasis of Khaybar had joined the enemies of Madinah. Rasulullah {SAW} said: “Tomorrow I will give the banner to a man who loves Allah and His Messenger, and whom Allah and His Messenger love.” He gave it to Sayyiduna Ali {RA}, and the strongest fort opened.",
      "bn": "দুর্গবেষ্টিত খায়বার মরুদ্যান মদিনার শত্রুদের সাথে যোগ দিয়েছিল। রাসূলুল্লাহ {SAW} বলেন: “আগামীকাল আমি এমন একজনের হাতে পতাকা দেব, যিনি আল্লাহ ও উনার রাসূলকে ভালোবাসেন, আর আল্লাহ ও উনার রাসূলও উনাকে ভালোবাসেন।” উনি পতাকা দেন সাইয়্যিদুনা আলি {RA} উনার হাতে, আর সবচেয়ে মজবুত দুর্গটিও জয় হয়।"
    }
  },
  {
    "y": 629,
    "ah": 8,
    "cat": "battle",
    "lat": 31.08,
    "lon": 35.7,
    "sc": "banners",
    "t": {
      "en": "The Battle of Mu'tah",
      "bn": "মুতার যুদ্ধ"
    },
    "p": {
      "en": "Mu'tah, al-Sham",
      "bn": "মুতা, শাম"
    },
    "n": {
      "en": "Mu'tah, Jordan",
      "bn": "মুতা, জর্ডান"
    },
    "d": {
      "en": "Three thousand Muslims met a vast Byzantine army. Sayyiduna Zayd ibn Harithah {RA}, Sayyiduna Ja'far {RA} and Sayyiduna Abdullah ibn Rawahah {RA} were martyred in turn holding the banner. Sayyiduna Khalid ibn al-Walid {RA} saved the army, and Rasulullah {SAW} named him Sayfullah, the Sword of Allah.",
      "bn": "তিন হাজার মুসলমান বিশাল বাইজেন্টাইন বাহিনীর মুখোমুখি হন। পতাকা হাতে একে একে শাহাদাত বরণ করেন সাইয়্যিদুনা যায়েদ ইবনে হারিসা {RA}, সাইয়্যিদুনা জাফর {RA} ও সাইয়্যিদুনা আবদুল্লাহ ইবনে রাওয়াহা {RA}। সাইয়্যিদুনা খালিদ ইবনে ওয়ালিদ {RA} বাহিনীকে রক্ষা করেন, আর রাসূলুল্লাহ {SAW} উনাকে ‘সাইফুল্লাহ’ — আল্লাহর তরবারি — উপাধি দেন।"
    }
  },
  {
    "y": 630,
    "ah": 8,
    "cat": "seerah",
    "lat": 21.4225,
    "lon": 39.8262,
    "sc": "kaaba",
    "t": {
      "en": "The Conquest of Makkah",
      "bn": "মক্কা বিজয়"
    },
    "p": {
      "en": "Makkah al-Mukarramah",
      "bn": "মক্কা মুকাররমা"
    },
    "n": {
      "en": "Makkah, Saudi Arabia",
      "bn": "মক্কা, সৌদি আরব"
    },
    "d": {
      "en": "Rasulullah {SAW} entered Makkah with ten thousand, His blessed head lowered in humility. He cleared the Ka'bah of its 360 idols, reciting “Truth has come and falsehood has vanished” (al-Isra 17:81), and Sayyiduna Bilal {RA} called the adhan from its roof. To those who had persecuted Him for twenty years He said: “No blame upon you today. Go, you are free.”",
      "bn": "রাসূলুল্লাহ {SAW} দশ হাজার সাহাবি নিয়ে বিনয়ে মাথা মুবারক নত করে মক্কা শরীফে প্রবেশ করেন। “সত্য এসেছে, মিথ্যা বিলুপ্ত হয়েছে” (সূরা ইসরা ১৭:৮১) তিলাওয়াত করতে করতে উনি কাবা শরীফ থেকে ৩৬০টি মূর্তি অপসারণ করেন, আর সাইয়্যিদুনা বিলাল {RA} কাবার ছাদে উঠে আজান দেন। বিশ বছর ধরে যারা উনাকে কষ্ট দিয়েছিল, তাদের উনি বলেন: “আজ তোমাদের প্রতি কোনো অভিযোগ নেই। যাও, তোমরা মুক্ত।”"
    },
    "l": {
      "en": "The greatest victory is crowned with forgiveness.",
      "bn": "সবচেয়ে বড় বিজয়ের মুকুট হলো ক্ষমা।"
    }
  },
  {
    "y": 630.3,
    "ah": 8,
    "cat": "battle",
    "lat": 21.4,
    "lon": 40.05,
    "sc": "mountain",
    "t": {
      "en": "The Battle of Hunayn",
      "bn": "হুনাইনের যুদ্ধ"
    },
    "p": {
      "en": "The valley of Hunayn",
      "bn": "হুনাইন উপত্যকা"
    },
    "n": {
      "en": "Between Makkah and Ta'if",
      "bn": "মক্কা ও তায়েফের মাঝে"
    },
    "d": {
      "en": "Some were proud of the army's large numbers, and an ambush in a narrow valley scattered the ranks (al-Tawbah 9:25). Rasulullah {SAW} stood firm, and when Sayyiduna Abbas {RA} called out to the Companions of the Tree, they returned and the day was won.",
      "bn": "বাহিনীর বিশাল সংখ্যা দেখে কেউ কেউ গর্বিত হয়েছিলেন, আর সংকীর্ণ উপত্যকায় অতর্কিত হামলায় সারি ভেঙে যায় (সূরা তাওবা ৯:২৫)। রাসূলুল্লাহ {SAW} অটল থাকেন; সাইয়্যিদুনা আব্বাস {RA} যখন বাইআতে রিদওয়ানের সাহাবিদের ডাক দেন, উনারা ফিরে আসেন এবং বিজয় হয়।"
    }
  },
  {
    "y": 630.8,
    "ah": 9,
    "cat": "battle",
    "lat": 28.38,
    "lon": 36.57,
    "sc": "journey",
    "route": "tabuk",
    "t": {
      "en": "The Expedition of Tabuk",
      "bn": "তাবুক অভিযান"
    },
    "p": {
      "en": "Tabuk",
      "bn": "তাবুক"
    },
    "n": {
      "en": "Tabuk, Saudi Arabia",
      "bn": "তাবুক, সৌদি আরব"
    },
    "d": {
      "en": "In the fierce heat of harvest time, thirty thousand marched north to meet a Byzantine threat. Sayyiduna Abu Bakr {RA} gave everything he owned, Sayyiduna Umar {RA} gave half, and Sayyiduna Uthman {RA} equipped a large part of the army. No battle came; the northern tribes made treaties.",
      "bn": "ফসল তোলার প্রচণ্ড গরমের সময় ত্রিশ হাজার সাহাবি বাইজেন্টাইন হুমকির মোকাবিলায় উত্তরে যাত্রা করেন। সাইয়্যিদুনা আবু বকর {RA} উনার সব সম্পদ দান করেন, সাইয়্যিদুনা উমর {RA} অর্ধেক, আর সাইয়্যিদুনা উসমান {RA} বাহিনীর বড় অংশের ব্যয় বহন করেন। যুদ্ধ হয়নি; উত্তরের গোত্রগুলো চুক্তি করে।"
    }
  },
  {
    "y": 631,
    "ah": 9,
    "cat": "seerah",
    "lat": 24.4672,
    "lon": 39.6112,
    "sc": "mosque",
    "t": {
      "en": "The Year of Delegations",
      "bn": "প্রতিনিধিদলের বছর"
    },
    "p": {
      "en": "al-Madinah al-Munawwarah",
      "bn": "মদিনা মুনাওয়ারা"
    },
    "n": {
      "en": "Madinah, Saudi Arabia",
      "bn": "মদিনা, সৌদি আরব"
    },
    "d": {
      "en": "Delegations came from every corner of Arabia — from Yemen, Najd, Bahrain and Oman — to accept Islam at the hands of Rasulullah {SAW}. “When the help of Allah and the victory come, and you see people entering the religion of Allah in crowds…” (al-Nasr 110:1–2).",
      "bn": "ইয়েমেন, নজদ, বাহরাইন ও ওমানসহ আরবের প্রতিটি প্রান্ত থেকে প্রতিনিধিদল এসে রাসূলুল্লাহ {SAW} উনার হাত মুবারকে ইসলাম গ্রহণ করে। “যখন আসবে আল্লাহর সাহায্য ও বিজয়, আর আপনি দেখবেন মানুষ দলে দলে আল্লাহর দ্বীনে প্রবেশ করছে…” (সূরা নাসর ১১০:১–২)।"
    }
  },
  {
    "y": 632,
    "ah": 10,
    "cat": "seerah",
    "lat": 21.355,
    "lon": 39.984,
    "sc": "tents",
    "t": {
      "en": "The Farewell Hajj",
      "bn": "বিদায় হজ"
    },
    "p": {
      "en": "Arafat",
      "bn": "আরাফাত"
    },
    "n": {
      "en": "Arafat, near Makkah",
      "bn": "আরাফাত, মক্কার কাছে"
    },
    "d": {
      "en": "Before more than a hundred thousand Companions {RAHUM}, Rasulullah {SAW} delivered the Farewell Sermon: the sanctity of life, wealth and honour; kindness to women; no superiority of Arab over non-Arab except by taqwa; and “I leave among you the Book of Allah.” Then was revealed: “Today I have perfected your religion for you” (al-Ma'idah 5:3).",
      "bn": "লক্ষাধিক সাহাবি {RAHUM} উনাদের সামনে রাসূলুল্লাহ {SAW} বিদায় হজের খুতবা দেন: জীবন, সম্পদ ও সম্মানের পবিত্রতা; নারীদের প্রতি সদাচরণ; তাকওয়া ছাড়া আরব-অনারবের কোনো শ্রেষ্ঠত্ব নেই; আর “আমি তোমাদের মাঝে আল্লাহর কিতাব রেখে যাচ্ছি।” তখন নাজিল হয়: “আজ আমি তোমাদের জন্য তোমাদের দ্বীনকে পরিপূর্ণ করলাম” (সূরা মায়িদা ৫:৩)।"
    }
  },
  {
    "y": 632.4,
    "ah": 11,
    "cat": "seerah",
    "lat": 24.4672,
    "lon": 39.6112,
    "sc": "mosque",
    "t": {
      "en": "The Wisal of Rasulullah {SAW}",
      "bn": "রাসূলুল্লাহ {SAW} উনার বিছাল শরীফ"
    },
    "p": {
      "en": "The blessed room of Ummi Aishah {RAHA}",
      "bn": "আম্মাজান আয়েশা {RAHA} উনার হুজরা শরীফ"
    },
    "n": {
      "en": "al-Rawdah, Masjid al-Nabawi, Madinah",
      "bn": "রওজা শরীফ, মসজিদে নববি, মদিনা"
    },
    "d": {
      "en": "In Rabi' al-Awwal 11 AH, at the age of sixty-three, Rasulullah {SAW} returned to the Highest Companion in the room of Ummi Aishah {RAHA}, where He rests today. Sayyiduna Abu Bakr Siddiq {RA} steadied the grieving ummah by reciting Al Imran 3:144, reminding them that Allah Ta'ala is Ever-Living and never dies.",
      "bn": "১১ হিজরির রবিউল আউয়াল মাসে, ৬৩ বছর বয়স মুবারকে, আম্মাজান আয়েশা {RAHA} উনার হুজরা শরীফে রাসূলুল্লাহ {SAW} রফিকে আলার সান্নিধ্যে গমন করেন; সেখানেই আজ উনার রওজা শরীফ। শোকাহত উম্মাহকে সাইয়্যিদুনা আবু বকর সিদ্দিক {RA} সূরা আলে ইমরানের ১৪৪ নং আয়াত তিলাওয়াত করে স্মরণ করিয়ে দেন যে আল্লাহ তাআলা চিরঞ্জীব।"
    }
  },
  {
    "y": 632.6,
    "ah": 11,
    "cat": "spread",
    "lat": 24.4672,
    "lon": 39.6112,
    "sc": "mosque",
    "t": {
      "en": "Sayyiduna Abu Bakr Siddiq {RA} becomes Caliph",
      "bn": "সাইয়্যিদুনা আবু বকর সিদ্দিক {RA} উনার খিলাফত"
    },
    "p": {
      "en": "al-Madinah al-Munawwarah",
      "bn": "মদিনা মুনাওয়ারা"
    },
    "n": {
      "en": "Madinah, Saudi Arabia",
      "bn": "মদিনা, সৌদি আরব"
    },
    "d": {
      "en": "The first Caliph said: “Obey me as long as I obey Allah and His Messenger.” Standing firm, he sent the army of Sayyiduna Usamah {RA} as Rasulullah {SAW} had ordered, and reunited Arabia when some tribes refused zakat.",
      "bn": "প্রথম খলিফা বলেন: “যতক্ষণ আমি আল্লাহ ও উনার রাসূলের আনুগত্য করি, ততক্ষণ আমার আনুগত্য করো।” দৃঢ়তার সাথে উনি রাসূলুল্লাহ {SAW} উনার নির্দেশ অনুযায়ী সাইয়্যিদুনা উসামা {RA} উনার বাহিনী পাঠান, এবং কিছু গোত্র জাকাত দিতে অস্বীকার করলে আরবকে আবার ঐক্যবদ্ধ করেন।"
    }
  },
  {
    "y": 633,
    "ah": 12,
    "cat": "knowledge",
    "lat": 24.9,
    "lon": 46.45,
    "sc": "quran",
    "t": {
      "en": "Yamamah and the gathering of the Qur'an",
      "bn": "ইয়ামামা ও কুরআন শরীফ সংকলন"
    },
    "p": {
      "en": "al-Yamamah, Najd",
      "bn": "ইয়ামামা, নজদ"
    },
    "n": {
      "en": "Near Riyadh, Saudi Arabia",
      "bn": "রিয়াদের কাছে, সৌদি আরব"
    },
    "d": {
      "en": "Many huffaz were martyred at the Battle of Yamamah. Sayyiduna Umar {RA} urged that the Qur'an be gathered into one book, and Sayyiduna Abu Bakr {RA} entrusted the task to Sayyiduna Zayd ibn Thabit {RA}, who collected it from written pages and the hearts of the Companions.",
      "bn": "ইয়ামামার যুদ্ধে অনেক হাফেজ সাহাবি শাহাদাত বরণ করেন। সাইয়্যিদুনা উমর {RA} কুরআন শরীফ একত্রে সংকলনের পরামর্শ দেন, আর সাইয়্যিদুনা আবু বকর {RA} এই দায়িত্ব দেন সাইয়্যিদুনা যায়েদ ইবনে সাবিত {RA} উনাকে, যিনি লিখিত পাতা ও সাহাবিদের বক্ষ থেকে তা সংগ্রহ করেন।"
    }
  },
  {
    "y": 636,
    "cat": "battle",
    "lat": 32.81,
    "lon": 35.95,
    "sc": "banners",
    "t": {
      "en": "The Battle of Yarmuk",
      "bn": "ইয়ারমুকের যুদ্ধ"
    },
    "p": {
      "en": "The Yarmuk river, al-Sham",
      "bn": "ইয়ারমুক নদী, শাম"
    },
    "n": {
      "en": "Syria–Jordan border",
      "bn": "সিরিয়া–জর্ডান সীমান্ত"
    },
    "d": {
      "en": "Under Sayyiduna Abu Ubaydah ibn al-Jarrah {RA} and Sayyiduna Khalid ibn al-Walid {RA}, the Muslims defeated a far larger Byzantine army over six days, opening Damascus, Hims and Palestine to Islam.",
      "bn": "সাইয়্যিদুনা আবু উবায়দা ইবনুল জাররাহ {RA} ও সাইয়্যিদুনা খালিদ ইবনে ওয়ালিদ {RA} উনাদের নেতৃত্বে মুসলমানরা ছয় দিনের যুদ্ধে অনেক বড় বাইজেন্টাইন বাহিনীকে পরাজিত করেন; দামেস্ক, হিমস ও ফিলিস্তিনের দরজা ইসলামের জন্য খুলে যায়।"
    }
  },
  {
    "y": 636.5,
    "cat": "battle",
    "lat": 31.7,
    "lon": 44.4,
    "sc": "banners",
    "t": {
      "en": "The Battle of al-Qadisiyyah",
      "bn": "কাদিসিয়ার যুদ্ধ"
    },
    "p": {
      "en": "al-Qadisiyyah, Iraq",
      "bn": "কাদিসিয়া, ইরাক"
    },
    "n": {
      "en": "Near Najaf, Iraq",
      "bn": "নাজাফের কাছে, ইরাক"
    },
    "d": {
      "en": "Sayyiduna Sa'd ibn Abi Waqqas {RA}, one of the ten given glad tidings of Jannah, led the Muslims against the Sasanian army and its war elephants. The Persian capital al-Mada'in opened the next year.",
      "bn": "জান্নাতের সুসংবাদপ্রাপ্ত দশ সাহাবির একজন সাইয়্যিদুনা সাদ ইবনে আবি ওয়াক্কাস {RA} রণহস্তীসহ সাসানীয় বাহিনীর বিরুদ্ধে মুসলমানদের নেতৃত্ব দেন। পরের বছর পারস্যের রাজধানী মাদায়েন বিজিত হয়।"
    }
  },
  {
    "y": 637.5,
    "cat": "spread",
    "lat": 31.778,
    "lon": 35.235,
    "sc": "domerock",
    "t": {
      "en": "Sayyiduna Umar {RA} receives Bayt al-Maqdis",
      "bn": "সাইয়্যিদুনা উমর {RA} উনার বায়তুল মাকদিস গ্রহণ"
    },
    "p": {
      "en": "Iliya / Bayt al-Maqdis",
      "bn": "ইলিয়া / বায়তুল মাকদিস"
    },
    "n": {
      "en": "al-Quds (Jerusalem), Palestine",
      "bn": "আল-কুদস (জেরুজালেম), ফিলিস্তিন"
    },
    "d": {
      "en": "The Patriarch would surrender the city only to the Caliph himself. Sayyiduna Umar al-Faruq {RA} came from Madinah in patched clothes, taking turns riding with his servant. He granted the people safety for their lives, property and churches, and prayed where the Prophets {ASM} had prayed.",
      "bn": "প্যাট্রিয়ার্ক শুধু খলিফার কাছেই শহর সমর্পণ করতে চান। সাইয়্যিদুনা উমর ফারুক {RA} তালি দেওয়া পোশাকে, খাদেমের সাথে পালা করে বাহনে চড়ে মদিনা থেকে আসেন। উনি অধিবাসীদের জীবন, সম্পদ ও উপাসনালয়ের নিরাপত্তা দেন, এবং যেখানে নবীগণ {ASM} নামাজ পড়েছিলেন সেখানে নামাজ আদায় করেন।"
    },
    "l": {
      "en": "True leadership is humility and justice.",
      "bn": "প্রকৃত নেতৃত্ব হলো বিনয় ও ন্যায়বিচার।"
    }
  },
  {
    "y": 638.2,
    "cat": "knowledge",
    "lat": 24.4672,
    "lon": 39.6112,
    "sc": "crescent",
    "t": {
      "en": "The Hijri calendar begins",
      "bn": "হিজরি সন প্রবর্তন"
    },
    "p": {
      "en": "al-Madinah al-Munawwarah",
      "bn": "মদিনা মুনাওয়ারা"
    },
    "n": {
      "en": "Madinah, Saudi Arabia",
      "bn": "মদিনা, সৌদি আরব"
    },
    "d": {
      "en": "Letters were arriving undated. Sayyiduna Umar {RA} consulted the Companions {RAHUM}, and on the advice of Sayyiduna Ali {RA} the calendar was counted from the year of the Hijrah, beginning with Muharram.",
      "bn": "চিঠিপত্রে তারিখ থাকত না। সাইয়্যিদুনা উমর {RA} সাহাবায়ে কেরাম {RAHUM} উনাদের সাথে পরামর্শ করেন, আর সাইয়্যিদুনা আলি {RA} উনার পরামর্শে হিজরতের বছর থেকে, মুহাররম মাস দিয়ে, সন গণনা শুরু হয়।"
    }
  },
  {
    "y": 641,
    "cat": "spread",
    "lat": 30.006,
    "lon": 31.233,
    "sc": "minaret",
    "t": {
      "en": "Egypt and the city of Fustat",
      "bn": "মিসর বিজয় ও ফুসতাত নগরী"
    },
    "p": {
      "en": "Misr",
      "bn": "মিসর"
    },
    "n": {
      "en": "Old Cairo, Egypt",
      "bn": "পুরান কায়রো, মিসর"
    },
    "d": {
      "en": "Sayyiduna Amr ibn al-As {RA} opened Egypt and founded Fustat beside the Nile. Its mosque, built with the help of many Companions {RAHUM}, was the first in Africa.",
      "bn": "সাইয়্যিদুনা আমর ইবনুল আস {RA} মিসর বিজয় করে নীল নদের তীরে ফুসতাত নগরী প্রতিষ্ঠা করেন। বহু সাহাবি {RAHUM} উনাদের সহায়তায় নির্মিত এর মসজিদটি আফ্রিকার প্রথম মসজিদ।"
    }
  },
  {
    "y": 642,
    "cat": "awliya",
    "lat": 24.475,
    "lon": 39.625,
    "sc": "shrine",
    "t": {
      "en": "Birth of Imam Hasan al-Basri {RH}",
      "bn": "ইমাম হাসান বসরি {RH} উনার বিলাদত"
    },
    "p": {
      "en": "al-Madinah al-Munawwarah",
      "bn": "মদিনা মুনাওয়ারা"
    },
    "n": {
      "en": "Madinah, Saudi Arabia",
      "bn": "মদিনা, সৌদি আরব"
    },
    "d": {
      "en": "Imam Hasan al-Basri {RH} was born in Madinah in the time of Sayyiduna Umar {RA} and grew up in the household of Ummi Umm Salamah {RAHA}. He settled in Basra, where his sermons on fear of Allah, sincerity and turning away from the world made him the leading teacher of the Tabi'in. Nearly every chain of the Sufi orders passes through him.",
      "bn": "সাইয়্যিদুনা উমর {RA} উনার যুগে মদিনা শরীফে ইমাম হাসান বসরি {RH} উনার বিলাদত হয়; উনি আম্মাজান উম্মে সালামা {RAHA} উনার ঘরে বড় হন। পরে বসরায় বসবাস করেন; খোদাভীতি, ইখলাস ও দুনিয়াবিমুখতা নিয়ে উনার নসিহত উনাকে তাবেয়িদের শ্রেষ্ঠ শিক্ষকে পরিণত করে। প্রায় সব তরিকার সিলসিলা উনার মাধ্যমে এগিয়েছে।"
    }
  },
  {
    "y": 650,
    "cat": "knowledge",
    "lat": 24.4672,
    "lon": 39.6112,
    "sc": "quran",
    "t": {
      "en": "The Mushaf of Sayyiduna Uthman {RA}",
      "bn": "সাইয়্যিদুনা উসমান {RA} উনার মুসহাফ"
    },
    "p": {
      "en": "al-Madinah al-Munawwarah",
      "bn": "মদিনা মুনাওয়ারা"
    },
    "n": {
      "en": "Madinah, Saudi Arabia",
      "bn": "মদিনা, সৌদি আরব"
    },
    "d": {
      "en": "As Islam spread, people began reciting differently. Sayyiduna Uthman Dhun-Nurayn {RA} had copies made from the compilation kept by Ummi Hafsah {RAHA} and sent them to Kufa, Basra, Damascus and Makkah. Every mushaf in the world today follows this text.",
      "bn": "ইসলাম ছড়িয়ে পড়লে বিভিন্ন অঞ্চলে তিলাওয়াতে ভিন্নতা দেখা দেয়। সাইয়্যিদুনা উসমান যুন্নুরাইন {RA} আম্মাজান হাফসা {RAHA} উনার কাছে সংরক্ষিত সংকলন থেকে কপি করিয়ে কুফা, বসরা, দামেস্ক ও মক্কায় পাঠান। আজ বিশ্বের প্রতিটি মুসহাফ এই পাঠই অনুসরণ করে।"
    }
  },
  {
    "y": 656,
    "cat": "spread",
    "lat": 32.03,
    "lon": 44.4,
    "sc": "minaret",
    "t": {
      "en": "Sayyiduna Ali {RA} in Kufa",
      "bn": "কুফায় সাইয়্যিদুনা আলি {RA}"
    },
    "p": {
      "en": "al-Kufah",
      "bn": "কুফা"
    },
    "n": {
      "en": "Kufa, Iraq",
      "bn": "কুফা, ইরাক"
    },
    "d": {
      "en": "The fourth Caliph, the Gate of Knowledge, moved the seat of the caliphate to Kufa. His sermons and sayings on piety and justice are treasured to this day. He was martyred in Ramadan 40 AH while going to the Fajr prayer.",
      "bn": "চতুর্থ খলিফা, ‘জ্ঞানের দরজা’ সাইয়্যিদুনা আলি {RA} খিলাফতের কেন্দ্র কুফায় স্থানান্তর করেন। তাকওয়া ও ইনসাফ নিয়ে উনার খুতবা ও বাণী আজও মূল্যবান সম্পদ। ৪০ হিজরির রমজানে ফজরের নামাজে যাওয়ার পথে উনি শাহাদাত বরণ করেন।"
    }
  },
  {
    "y": 661,
    "cat": "spread",
    "lat": 32.03,
    "lon": 44.4,
    "sc": "scroll",
    "t": {
      "en": "The peace of Sayyiduna Hasan {RA}",
      "bn": "সাইয়্যিদুনা হাসান {RA} উনার সন্ধি"
    },
    "p": {
      "en": "al-Kufah",
      "bn": "কুফা"
    },
    "n": {
      "en": "Kufa, Iraq",
      "bn": "কুফা, ইরাক"
    },
    "d": {
      "en": "Rasulullah {SAW} had said of His grandson: “Through him Allah will make peace between two great groups of Muslims.” Sayyiduna Hasan {RA} gave up the caliphate to Sayyiduna Mu'awiyah {RA} to spare Muslim blood, and the year became known as the Year of Unity.",
      "bn": "রাসূলুল্লাহ {SAW} উনার নাতি সম্পর্কে বলেছিলেন: “উনার মাধ্যমে আল্লাহ মুসলমানদের দুটি বড় দলের মধ্যে সন্ধি করাবেন।” মুসলমানদের রক্ত রক্ষায় সাইয়্যিদুনা হাসান {RA} খিলাফত সাইয়্যিদুনা মুআবিয়া {RA} উনার কাছে ছেড়ে দেন; বছরটি ‘আমুল জামাআ’ — ঐক্যের বছর — নামে পরিচিত হয়।"
    }
  },
  {
    "y": 670,
    "cat": "build",
    "lat": 35.678,
    "lon": 10.096,
    "sc": "minaret",
    "t": {
      "en": "Kairouan is founded",
      "bn": "কায়রাওয়ান প্রতিষ্ঠা"
    },
    "p": {
      "en": "Ifriqiya",
      "bn": "ইফ্রিকিয়া"
    },
    "n": {
      "en": "Kairouan, Tunisia",
      "bn": "কায়রাওয়ান, তিউনিসিয়া"
    },
    "d": {
      "en": "Sayyiduna Uqbah ibn Nafi {RA} founded Kairouan and its Great Mosque, which became the gateway of Islam to North Africa. It is said he rode into the Atlantic and declared that if the sea had not stopped him, he would have carried the Name of Allah further.",
      "bn": "সাইয়্যিদুনা উকবা ইবনে নাফে {RA} কায়রাওয়ান নগরী ও এর বড় মসজিদ প্রতিষ্ঠা করেন, যা উত্তর আফ্রিকায় ইসলামের প্রবেশদ্বার হয়ে ওঠে। বর্ণিত আছে, উনি আটলান্টিকের পানিতে নেমে বলেছিলেন — সমুদ্র না থামালে উনি আল্লাহর নাম আরও দূরে পৌঁছে দিতেন।"
    }
  },
  {
    "y": 674,
    "cat": "spread",
    "lat": 41.048,
    "lon": 28.934,
    "sc": "istanbul",
    "t": {
      "en": "Sayyiduna Abu Ayyub al-Ansari {RA} at Constantinople",
      "bn": "কনস্টান্টিনোপলে সাইয়্যিদুনা আবু আইয়ুব আনসারী {RA}"
    },
    "p": {
      "en": "Qustantiniyyah",
      "bn": "কুস্তুনতুনিয়া"
    },
    "n": {
      "en": "Eyüp, Istanbul, Turkey",
      "bn": "আইয়ুপ, ইস্তাম্বুল, তুরস্ক"
    },
    "d": {
      "en": "The host of Rasulullah {SAW} in Madinah joined the army besieging Constantinople at nearly eighty years of age, hoping for the reward promised to those who would open the city. He passed away there and asked to be buried as close to its walls as possible.",
      "bn": "মদিনায় রাসূলুল্লাহ {SAW} উনার মেজবান সাইয়্যিদুনা আবু আইয়ুব আনসারী {RA} প্রায় আশি বছর বয়সে কনস্টান্টিনোপল অবরোধকারী বাহিনীতে যোগ দেন — এই শহর বিজয়কারীদের জন্য ঘোষিত সুসংবাদের আশায়। সেখানেই উনি ইন্তেকাল করেন এবং যতটা সম্ভব শহরের প্রাচীরের কাছে দাফনের অসিয়ত করেন।"
    }
  },
  {
    "y": 680,
    "ah": 61,
    "cat": "battle",
    "lat": 32.616,
    "lon": 44.024,
    "sc": "lamp",
    "t": {
      "en": "Karbala",
      "bn": "কারবালা"
    },
    "p": {
      "en": "Karbala, Iraq",
      "bn": "কারবালা, ইরাক"
    },
    "n": {
      "en": "Karbala, Iraq",
      "bn": "কারবালা, ইরাক"
    },
    "d": {
      "en": "On 10 Muharram 61 AH, Sayyiduna Husayn ibn Ali {RAHUMA}, the beloved grandson of Rasulullah {SAW}, was martyred at Karbala with members of the Ahl al-Bayt, standing for truth against injustice. The ummah has remembered Ashura with grief and love ever since.",
      "bn": "৬১ হিজরির ১০ মুহাররম রাসূলুল্লাহ {SAW} উনার প্রিয় নাতি সাইয়্যিদুনা হুসাইন ইবনে আলি {RAHUMA} আহলে বাইতের সদস্যদের সাথে কারবালায় শাহাদাত বরণ করেন — অন্যায়ের বিরুদ্ধে সত্যের পক্ষে দাঁড়িয়ে। সেই থেকে উম্মাহ গভীর শোক ও ভালোবাসায় আশুরা স্মরণ করে।"
    }
  },
  {
    "y": 691,
    "cat": "build",
    "lat": 31.778,
    "lon": 35.2354,
    "sc": "domerock",
    "t": {
      "en": "The Dome of the Rock",
      "bn": "কুব্বাতুস সাখরা"
    },
    "p": {
      "en": "Bayt al-Maqdis",
      "bn": "বায়তুল মাকদিস"
    },
    "n": {
      "en": "al-Quds (Jerusalem), Palestine",
      "bn": "আল-কুদস (জেরুজালেম), ফিলিস্তিন"
    },
    "d": {
      "en": "Caliph Abd al-Malik completed the golden dome over the rock from which Rasulullah {SAW} ascended on the night of Mi'raj. Its walls carry the verses of Surah Maryam, and it is the oldest great Islamic monument still standing.",
      "bn": "খলিফা আবদুল মালিক সেই পাথরের ওপর সোনালি গম্বুজ নির্মাণ সম্পন্ন করেন, যেখান থেকে মিরাজের রাতে রাসূলুল্লাহ {SAW} ঊর্ধ্বগমন করেছিলেন। এর দেয়ালে সূরা মারইয়ামের আয়াত খোদাই করা; এটি টিকে থাকা প্রাচীনতম মহান ইসলামি স্থাপত্য।"
    }
  },
  {
    "y": 702,
    "cat": "awliya",
    "lat": 24.46,
    "lon": 39.6,
    "sc": "shrine",
    "t": {
      "en": "Birth of Imam Ja'far al-Sadiq {RH}",
      "bn": "ইমাম জাফর সাদিক {RH} উনার বিলাদত"
    },
    "p": {
      "en": "al-Madinah al-Munawwarah",
      "bn": "মদিনা মুনাওয়ারা"
    },
    "n": {
      "en": "Madinah, Saudi Arabia",
      "bn": "মদিনা, সৌদি আরব"
    },
    "d": {
      "en": "A great-great-grandson of Sayyiduna Ali {RA} through Sayyiduna Husayn {RA}, Imam Ja'far al-Sadiq {RH} was a teacher of Imam Abu Hanifa {RH} and Imam Malik {RH}. He was known for truthfulness, knowledge and deep spirituality, and is a link in the Naqshbandi chain.",
      "bn": "সাইয়্যিদুনা হুসাইন {RA} উনার বংশধারায় সাইয়্যিদুনা আলি {RA} উনার প্রপৌত্রের পুত্র ইমাম জাফর সাদিক {RH} ইমাম আবু হানিফা {RH} ও ইমাম মালিক {RH} উনাদের শিক্ষক ছিলেন। সত্যবাদিতা, ইলম ও গভীর রূহানিয়াতের জন্য উনি প্রসিদ্ধ; নকশবন্দিয়া সিলসিলারও উনি একজন গুরুত্বপূর্ণ ধারক।"
    }
  },
  {
    "y": 711,
    "cat": "spread",
    "lat": 36.14,
    "lon": -5.35,
    "sc": "sea",
    "route": "tariq",
    "t": {
      "en": "Tariq ibn Ziyad {RH} crosses to al-Andalus",
      "bn": "তারিক বিন জিয়াদ {RH} উনার আন্দালুস অভিযান"
    },
    "p": {
      "en": "Jabal Tariq",
      "bn": "জাবালে তারিক"
    },
    "n": {
      "en": "Gibraltar",
      "bn": "জিব্রাল্টার"
    },
    "d": {
      "en": "Tariq ibn Ziyad {RH} landed at the rock that still carries his name — Jabal Tariq, Gibraltar — and opened Spain. Al-Andalus would shine for nearly eight hundred years with its libraries, gardens and scholars.",
      "bn": "তারিক বিন জিয়াদ {RH} যে পাহাড়ে অবতরণ করেন, তা আজও উনার নাম বহন করে — জাবালে তারিক, অর্থাৎ জিব্রাল্টার। উনি স্পেন বিজয় করেন; আল-আন্দালুস প্রায় আটশো বছর গ্রন্থাগার, বাগান ও আলেমদের আলোয় উজ্জ্বল থাকে।"
    }
  },
  {
    "y": 712,
    "cat": "spread",
    "lat": 24.75,
    "lon": 67.52,
    "sc": "fortress",
    "route": "qasim",
    "t": {
      "en": "Imaduddin ibn Qasim {RH} in Sindh",
      "bn": "সিন্ধুতে ইমাদুদ্দিন বিন কাসিম {RH}"
    },
    "p": {
      "en": "Daybul, al-Sind",
      "bn": "দেবল, সিন্ধ"
    },
    "n": {
      "en": "Near Karachi, Pakistan",
      "bn": "করাচির কাছে, পাকিস্তান"
    },
    "d": {
      "en": "Answering the call of Muslim travellers held captive at sea, the seventeen-year-old commander Imaduddin ibn Qasim al-Thaqafi {RH} opened Sindh and Multan. Remembered for his justice, he made Sindh the first Muslim land in South Asia.",
      "bn": "সমুদ্রে বন্দী মুসলিম যাত্রীদের আর্তনাদে সাড়া দিয়ে সতেরো বছরের সেনাপতি ইমাদুদ্দিন বিন কাসিম আস-সাকাফি {RH} সিন্ধু ও মুলতান বিজয় করেন। ন্যায়বিচারের জন্য স্মরণীয় উনার হাতেই সিন্ধু হয় দক্ষিণ এশিয়ার প্রথম মুসলিম ভূখণ্ড।"
    }
  },
  {
    "y": 712.5,
    "cat": "spread",
    "lat": 39.65,
    "lon": 66.96,
    "sc": "minaret",
    "t": {
      "en": "Bukhara and Samarkand",
      "bn": "বুখারা ও সমরকন্দ"
    },
    "p": {
      "en": "Ma wara' al-Nahr",
      "bn": "মা ওয়ারাউন নাহর"
    },
    "n": {
      "en": "Samarkand, Uzbekistan",
      "bn": "সমরকন্দ, উজবেকিস্তান"
    },
    "d": {
      "en": "Qutaybah ibn Muslim {RH} brought the lands beyond the Oxus into Islam. This region later gave the ummah Imam Bukhari {RH}, Imam Tirmidhi {RH} and many other great scholars.",
      "bn": "কুতাইবা ইবনে মুসলিম {RH} অক্সাস নদীর ওপারের ভূমিতে ইসলাম পৌঁছে দেন। এ অঞ্চল পরে উম্মাহকে উপহার দেয় ইমাম বুখারি {RH}, ইমাম তিরমিজি {RH} সহ বহু মহান আলেম।"
    }
  },
  {
    "y": 715,
    "cat": "build",
    "lat": 33.5116,
    "lon": 36.3065,
    "sc": "minaret",
    "t": {
      "en": "The Umayyad Mosque of Damascus",
      "bn": "দামেস্কের উমাইয়া মসজিদ"
    },
    "p": {
      "en": "Dimashq",
      "bn": "দিমাশক"
    },
    "n": {
      "en": "Damascus, Syria",
      "bn": "দামেস্ক, সিরিয়া"
    },
    "d": {
      "en": "Caliph al-Walid completed one of the grandest mosques of its age, decorated with golden mosaics of gardens and rivers — images of Paradise without a single living figure. One of its minarets is known as the Minaret of Isa {AS}.",
      "bn": "খলিফা আল-ওয়ালিদ উনার যুগের অন্যতম মহিমান্বিত মসজিদ নির্মাণ সম্পন্ন করেন — বাগান ও নদীর সোনালি মোজাইকে সজ্জিত, জান্নাতের প্রতিচ্ছবি, অথচ কোনো প্রাণীর ছবি নেই। এর একটি মিনার ‘ঈসা {AS} উনার মিনার’ নামে পরিচিত।"
    }
  },
  {
    "y": 717,
    "cat": "knowledge",
    "lat": 33.51,
    "lon": 36.3,
    "sc": "lamp",
    "t": {
      "en": "The justice of Umar ibn Abd al-Aziz {RH}",
      "bn": "উমর ইবনে আবদুল আজিজ {RH} উনার ন্যায়বিচার"
    },
    "p": {
      "en": "Dimashq",
      "bn": "দিমাশক"
    },
    "n": {
      "en": "Damascus, Syria",
      "bn": "দামেস্ক, সিরিয়া"
    },
    "d": {
      "en": "Called the fifth rightly-guided Caliph, Umar ibn Abd al-Aziz {RH} returned unjust wealth, lived simply, and ordered the scholars to write down the hadith before they were lost. It is said that in his time zakat collectors could find no one in need.",
      "bn": "‘পঞ্চম খলিফায়ে রাশেদ’ নামে পরিচিত উমর ইবনে আবদুল আজিজ {RH} অন্যায়ভাবে অর্জিত সম্পদ ফিরিয়ে দেন, সাদাসিধে জীবন যাপন করেন, এবং হাদিস হারিয়ে যাওয়ার আগে লিখে রাখার নির্দেশ দেন। বর্ণিত আছে, উনার সময়ে জাকাত নেওয়ার মতো অভাবী খুঁজে পাওয়া যেত না।"
    }
  },
  {
    "y": 717.3,
    "cat": "awliya",
    "lat": 30.51,
    "lon": 47.81,
    "sc": "lamp",
    "t": {
      "en": "Birth of Hazrat Rabi'a al-Basri {RHA}",
      "bn": "হযরত রাবেয়া বসরি {RHA} উনার বিলাদত"
    },
    "p": {
      "en": "al-Basrah",
      "bn": "বসরা"
    },
    "n": {
      "en": "Basra, Iraq",
      "bn": "বসরা, ইরাক"
    },
    "d": {
      "en": "Born into poverty in Basra, Hazrat Rabi'a {RHA} spent her nights in prayer and became a teacher of pure love for Allah. She prayed: “O Allah, if I worship You for fear of the Fire, burn me in it; if for hope of Paradise, keep me from it; but if I worship You for Yourself, do not withhold from me Your eternal beauty.”",
      "bn": "বসরার এক দরিদ্র পরিবারে জন্ম নেওয়া হযরত রাবেয়া {RHA} রাতের পর রাত ইবাদতে কাটাতেন এবং আল্লাহর প্রতি নির্ভেজাল মহব্বতের শিক্ষিকা হয়ে ওঠেন। উনি দোয়া করতেন: “হে আল্লাহ, যদি জাহান্নামের ভয়ে আপনার ইবাদত করি, আমাকে তাতে জ্বালিয়ে দিন; যদি জান্নাতের আশায় করি, তা থেকে বঞ্চিত করুন; আর যদি শুধু আপনার জন্য করি, আপনার চিরন্তন সৌন্দর্য থেকে আমাকে বঞ্চিত করবেন না।”"
    }
  },
  {
    "y": 718,
    "cat": "awliya",
    "lat": 36.76,
    "lon": 66.9,
    "sc": "mountain",
    "t": {
      "en": "Birth of Hazrat Ibrahim ibn Adham {RH}",
      "bn": "হযরত ইবরাহিম ইবনে আদহাম {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Balkh, Khurasan",
      "bn": "বলখ, খোরাসান"
    },
    "n": {
      "en": "Balkh, Afghanistan",
      "bn": "বলখ, আফগানিস্তান"
    },
    "d": {
      "en": "A prince of Balkh, Hazrat Ibrahim ibn Adham {RH} left his throne to seek Allah, and lived by honest labour as a harvester and gardener in Sham. His life became a lesson that true kingship is in contentment.",
      "bn": "বলখের শাহজাদা হযরত ইবরাহিম ইবনে আদহাম {RH} আল্লাহর সন্ধানে রাজসিংহাসন ত্যাগ করেন, এবং শাম দেশে ফসল কাটা ও বাগানের কাজ করে হালাল রিজিকে জীবন কাটান। উনার জীবন শিক্ষা দেয় — প্রকৃত বাদশাহি অল্পে তুষ্টির মধ্যে।"
    }
  },
  {
    "y": 732,
    "cat": "battle",
    "lat": 46.6,
    "lon": 0.35,
    "sc": "banners",
    "t": {
      "en": "Balat al-Shuhada (Tours)",
      "bn": "বালাতুশ শুহাদা (তুর)"
    },
    "p": {
      "en": "Between Tours and Poitiers",
      "bn": "তুর ও পোয়াতিয়ের মাঝে"
    },
    "n": {
      "en": "France",
      "bn": "ফ্রান্স"
    },
    "d": {
      "en": "Abd al-Rahman al-Ghafiqi {RH} was martyred fighting the Franks. Arab historians called the field the Pavement of Martyrs; it marked the northern limit of Muslim rule in Western Europe.",
      "bn": "ফ্রাঙ্কদের বিরুদ্ধে যুদ্ধে আবদুর রহমান আল-গাফিকি {RH} শাহাদাত বরণ করেন। আরব ঐতিহাসিকরা ময়দানটিকে ‘শহিদদের পথ’ বলেছেন; এটি পশ্চিম ইউরোপে মুসলিম শাসনের উত্তর সীমা।"
    }
  },
  {
    "y": 751,
    "cat": "knowledge",
    "lat": 42.5,
    "lon": 72.2,
    "sc": "books",
    "t": {
      "en": "Talas and the secret of paper",
      "bn": "তালাস ও কাগজের রহস্য"
    },
    "p": {
      "en": "The Talas river",
      "bn": "তালাস নদী"
    },
    "n": {
      "en": "Kazakhstan–Kyrgyzstan border",
      "bn": "কাজাখস্তান–কিরগিজস্তান সীমান্ত"
    },
    "d": {
      "en": "After the Battle of Talas, papermaking reached Samarkand and then Baghdad. Books became affordable, libraries multiplied, and the age of knowledge took flight.",
      "bn": "তালাসের যুদ্ধের পর কাগজ তৈরির কৌশল সমরকন্দ হয়ে বাগদাদে পৌঁছায়। বই সহজলভ্য হয়, গ্রন্থাগার বাড়তে থাকে, আর জ্ঞানের যুগ গতি পায়।"
    }
  },
  {
    "y": 756,
    "cat": "build",
    "lat": 37.879,
    "lon": -4.78,
    "sc": "arches",
    "t": {
      "en": "Córdoba and its Great Mosque",
      "bn": "কর্ডোভা ও এর বড় মসজিদ"
    },
    "p": {
      "en": "Qurtubah, al-Andalus",
      "bn": "কুরতুবা, আল-আন্দালুস"
    },
    "n": {
      "en": "Córdoba, Spain",
      "bn": "কর্ডোভা, স্পেন"
    },
    "d": {
      "en": "Abd al-Rahman I founded the Emirate of Córdoba. Its Great Mosque, with its forest of red-and-white arches, and its libraries made Córdoba the brightest city of Europe.",
      "bn": "প্রথম আবদুর রহমান কর্ডোভা আমিরাত প্রতিষ্ঠা করেন। লাল-সাদা খিলানের অরণ্যের মতো এর বড় মসজিদ আর বিশাল গ্রন্থাগার কর্ডোভাকে ইউরোপের সবচেয়ে উজ্জ্বল নগরী বানায়।"
    }
  },
  {
    "y": 762,
    "cat": "build",
    "lat": 33.31,
    "lon": 44.36,
    "sc": "roundcity",
    "t": {
      "en": "Baghdad, the Round City of Peace",
      "bn": "বাগদাদ, শান্তির গোলাকার নগরী"
    },
    "p": {
      "en": "Madinat al-Salam",
      "bn": "মাদিনাতুস সালাম"
    },
    "n": {
      "en": "Baghdad, Iraq",
      "bn": "বাগদাদ, ইরাক"
    },
    "d": {
      "en": "Caliph al-Mansur laid out a perfectly round city with four gates on the Tigris and named it Madinat al-Salam. Within decades it was among the largest and most learned cities on earth.",
      "bn": "খলিফা আল-মনসুর দজলা নদীর তীরে চার ফটকবিশিষ্ট একটি নিখুঁত গোলাকার নগরী গড়ে তোলেন এবং নাম দেন ‘মাদিনাতুস সালাম’। কয়েক দশকের মধ্যেই এটি পৃথিবীর বৃহত্তম ও জ্ঞানসমৃদ্ধ নগরীগুলোর একটি হয়ে ওঠে।"
    }
  },
  {
    "y": 767,
    "cat": "knowledge",
    "lat": 33.36,
    "lon": 44.36,
    "sc": "books",
    "t": {
      "en": "The four great Imams of fiqh",
      "bn": "ফিকহের চার মহান ইমাম"
    },
    "p": {
      "en": "Kufa, Madinah, Fustat, Baghdad",
      "bn": "কুফা, মদিনা, ফুসতাত, বাগদাদ"
    },
    "n": {
      "en": "Iraq, Saudi Arabia, Egypt",
      "bn": "ইরাক, সৌদি আরব, মিসর"
    },
    "d": {
      "en": "Imam Abu Hanifa {RH} (d. 767), Imam Malik {RH} (d. 795), Imam al-Shafi'i {RH} (d. 820) and Imam Ahmad ibn Hanbal {RH} (d. 855) laid the foundations of the four schools of law. Most Muslims of Bangladesh follow the Hanafi school.",
      "bn": "ইমাম আবু হানিফা {RH} (ইন্তেকাল ৭৬৭), ইমাম মালিক {RH} (৭৯৫), ইমাম শাফেয়ি {RH} (৮২০) ও ইমাম আহমদ ইবনে হাম্বল {RH} (৮৫৫) চার মাজহাবের ভিত্তি স্থাপন করেন। বাংলাদেশের অধিকাংশ মুসলমান হানাফি মাজহাব অনুসরণ করেন।"
    }
  },
  {
    "y": 804,
    "cat": "awliya",
    "lat": 36.48,
    "lon": 55,
    "sc": "lamp",
    "t": {
      "en": "Birth of Hazrat Bayazid Bistami {RH}",
      "bn": "হযরত বায়েজিদ বোস্তামি {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Bistam, Khurasan",
      "bn": "বোস্তাম, খোরাসান"
    },
    "n": {
      "en": "Bastam, Iran",
      "bn": "বাস্তাম, ইরান"
    },
    "d": {
      "en": "Hazrat Bayazid Bistami {RH} is remembered across Bengal for his service to his mother: one cold night he stood holding a cup of water until dawn, waiting for her to wake. He said: “What I attained, I attained through serving my mother.”",
      "bn": "মায়ের খেদমতের জন্য হযরত বায়েজিদ বোস্তামি {RH} বাংলাজুড়ে স্মরণীয়: এক শীতের রাতে মা পানি চাইলে উনি পানির পেয়ালা হাতে ভোর পর্যন্ত দাঁড়িয়ে ছিলেন, মায়ের ঘুম ভাঙার অপেক্ষায়। উনি বলেছেন: “আমি যা পেয়েছি, মায়ের খেদমতের মাধ্যমেই পেয়েছি।”"
    }
  },
  {
    "y": 830,
    "cat": "knowledge",
    "lat": 33.33,
    "lon": 44.4,
    "sc": "books",
    "t": {
      "en": "Bayt al-Hikmah, the House of Wisdom",
      "bn": "বায়তুল হিকমাহ"
    },
    "p": {
      "en": "Baghdad",
      "bn": "বাগদাদ"
    },
    "n": {
      "en": "Baghdad, Iraq",
      "bn": "বাগদাদ, ইরাক"
    },
    "d": {
      "en": "Scholars translated and expanded the knowledge of Greece, Persia and India. Al-Khwarizmi wrote al-Jabr — from which comes the word algebra — and his own name gave us the word algorithm.",
      "bn": "আলেমগণ গ্রিস, পারস্য ও ভারতের জ্ঞান অনুবাদ ও সম্প্রসারণ করেন। আল-খাওয়ারিজমি ‘আল-জাবর’ রচনা করেন — যা থেকে ‘অ্যালজেব্রা’ শব্দ — আর উনার নাম থেকে এসেছে ‘অ্যালগরিদম’।"
    }
  },
  {
    "y": 830.3,
    "cat": "awliya",
    "lat": 33.34,
    "lon": 44.38,
    "sc": "books",
    "t": {
      "en": "Birth of Hazrat Junayd al-Baghdadi {RH}",
      "bn": "হযরত জুনায়েদ বাগদাদি {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Baghdad",
      "bn": "বাগদাদ"
    },
    "n": {
      "en": "Baghdad, Iraq",
      "bn": "বাগদাদ, ইরাক"
    },
    "d": {
      "en": "Called Sayyid al-Ta'ifah, the master of the Sufis, Hazrat Junayd {RH} taught that the path to Allah is bound by the Qur'an and Sunnat: “This knowledge of ours is tied to the Book and the Sunnat.” He joined deep spirituality with careful adherence to the Shari'ah.",
      "bn": "‘সাইয়্যিদুত তায়িফা’ — সুফিদের সরদার — হযরত জুনায়েদ বাগদাদি {RH} শিক্ষা দেন যে আল্লাহর পথ কুরআন ও সুন্নাতে বাঁধা: “আমাদের এই ইলম কিতাব ও সুন্নাতের সাথে আবদ্ধ।” উনি গভীর রূহানিয়াতের সাথে শরিয়তের পূর্ণ অনুসরণকে একত্র করেন।"
    }
  },
  {
    "y": 846,
    "cat": "knowledge",
    "lat": 39.77,
    "lon": 64.42,
    "sc": "books",
    "t": {
      "en": "Sahih al-Bukhari",
      "bn": "সহিহ বুখারি শরীফ"
    },
    "p": {
      "en": "Bukhara",
      "bn": "বুখারা"
    },
    "n": {
      "en": "Bukhara, Uzbekistan",
      "bn": "বুখারা, উজবেকিস্তান"
    },
    "d": {
      "en": "Imam Bukhari {RH} spent sixteen years selecting about seven thousand narrations from hundreds of thousands, performing two rak'ahs of prayer before writing each hadith. Imam Muslim {RH} completed his Sahih soon after.",
      "bn": "ইমাম বুখারি {RH} ষোলো বছর ধরে লক্ষাধিক বর্ণনা থেকে প্রায় সাত হাজার হাদিস বাছাই করেন; প্রতিটি হাদিস লেখার আগে উনি দুই রাকাত নামাজ আদায় করতেন। এর কিছু পরেই ইমাম মুসলিম {RH} উনার সহিহ সম্পন্ন করেন।"
    }
  },
  {
    "y": 859,
    "cat": "knowledge",
    "lat": 34.065,
    "lon": -4.973,
    "sc": "gate",
    "t": {
      "en": "al-Qarawiyyin, Fes",
      "bn": "আল-কারাউইন, ফেজ"
    },
    "p": {
      "en": "Fas, al-Maghrib",
      "bn": "ফাস, মাগরিব"
    },
    "n": {
      "en": "Fez, Morocco",
      "bn": "ফেজ, মরক্কো"
    },
    "d": {
      "en": "Fatimah al-Fihri {RHA} spent her inheritance to build a masjid and place of learning, fasting throughout its construction. Al-Qarawiyyin is regarded as the oldest continuously operating university in the world.",
      "bn": "ফাতিমা আল-ফিহরি {RHA} উত্তরাধিকারের সম্পদ দিয়ে একটি মসজিদ ও শিক্ষাকেন্দ্র নির্মাণ করেন; নির্মাণের পুরো সময় উনি রোজা রেখেছিলেন। আল-কারাউইনকে বিশ্বের প্রাচীনতম চালু বিশ্ববিদ্যালয় মনে করা হয়।"
    }
  },
  {
    "y": 935,
    "cat": "knowledge",
    "lat": 33.31,
    "lon": 44.36,
    "sc": "books",
    "t": {
      "en": "Imam Abu al-Hasan al-Ash'ari {RH} and Sunni Aqeedah",
      "bn": "ইমাম আবুল হাসান আল-আশআরী {RH} ও সুন্নী আকীদা সংকলন"
    },
    "p": {
      "en": "Baghdad",
      "bn": "বাগদাদ"
    },
    "n": {
      "en": "Baghdad, Iraq",
      "bn": "বাগদাদ, ইরাক"
    },
    "d": {
      "en": "Hazrat Imam Abu al-Hasan al-Ash'ari {RH} (d. 935 CE) formulated and defended the creed of Ahl al-Sunnah wal-Jama'ah (Sunni theology) against innovations, basing it firmly on the Qur'an, Sunnah and intellect. Along with Imam Abu Mansur al-Maturidi {RH}, he defined the theological framework followed by Sunni Muslims around the world, including the Hanafi-Ash'ari scholars and general population of Bengal.",
      "bn": "হযরত ইমাম আবুল হাসান আল-আশআরী {RH} (ইন্তেকাল ৯৩৫ খ্রি.) বিদআতের বিরুদ্ধে পবিত্র কুরআন, সুন্নাহ ও যুক্তির আলোকে আহলু সুন্নাহ ওয়াল জামাআতের আকীদা মুবারক সংকলন ও রক্ষা করেন। ইমাম আবু মনসুর আল-মাতুরিদী {RH} উনার সাথে যৌথভাবে উনি এমন এক ধর্মতাত্ত্বিক ভিত্তি রূপদান করেন যা আজ বিশ্বজুড়ে (বিশেষ করে বাংলার হানাফী-আশআরী আলেম ও সাধারণ মানুষের মাঝে) অনুসৃত হয়।"
    },
    "l": {
      "en": "Protecting correct faith (Aqeedah) is the foundation of all righteous deeds.",
      "bn": "সঠিক বিশ্বাস বা আকীদা মুবারক রক্ষা করাই হলো সমস্ত নেক আমল কবুল হওয়ার মূল ভিত্তি।"
    }
  },
  {
    "y": 970,
    "cat": "knowledge",
    "lat": 30.0457,
    "lon": 31.2627,
    "sc": "gate",
    "t": {
      "en": "al-Azhar, Cairo",
      "bn": "আল-আজহার, কায়রো"
    },
    "p": {
      "en": "al-Qahirah",
      "bn": "আল-কাহিরা"
    },
    "n": {
      "en": "Cairo, Egypt",
      "bn": "কায়রো, মিসর"
    },
    "d": {
      "en": "Founded with the city of Cairo, al-Azhar became — especially from the Ayyubid era — the leading centre of Sunni learning. Many scholars from Bangladesh study there today.",
      "bn": "কায়রো নগরীর সাথে প্রতিষ্ঠিত আল-আজহার, বিশেষত আইয়ুবি যুগ থেকে, সুন্নি জ্ঞানচর্চার প্রধান কেন্দ্রে পরিণত হয়। আজও বাংলাদেশের বহু আলেম সেখানে অধ্যয়ন করেন।"
    }
  },
  {
    "y": 977,
    "cat": "sultan",
    "lat": 33.55,
    "lon": 68.42,
    "sc": "fortress",
    "t": {
      "en": "The Ghaznavid Sultanate begins",
      "bn": "গজনভি সালতানাতের সূচনা"
    },
    "p": {
      "en": "Ghaznin",
      "bn": "গজনি"
    },
    "n": {
      "en": "Ghazni, Afghanistan",
      "bn": "গজনি, আফগানিস্তান"
    },
    "d": {
      "en": "Sabuktigin {RH} established the state of Ghazni, loyal to the Abbasid caliph in Baghdad and to the Hanafi madhhab. It became the gateway through which Islam travelled further into Khurasan and the subcontinent.",
      "bn": "সবুক্তগিন {RH} গজনি রাষ্ট্র প্রতিষ্ঠা করেন, যা বাগদাদের আব্বাসীয় খলিফা ও হানাফি মাজহাবের প্রতি অনুগত ছিল। এই রাষ্ট্রই খোরাসান ও উপমহাদেশের আরও গভীরে ইসলাম পৌঁছানোর প্রবেশদ্বার হয়।"
    }
  },
  {
    "y": 998,
    "cat": "sultan",
    "lat": 33.56,
    "lon": 68.43,
    "sc": "banners",
    "t": {
      "en": "Sultan Mahmud Ghaznavi {RH}",
      "bn": "সুলতান মাহমুদ গজনভি {RH}"
    },
    "p": {
      "en": "Ghaznin",
      "bn": "গজনি"
    },
    "n": {
      "en": "Ghazni, Afghanistan",
      "bn": "গজনি, আফগানিস্তান"
    },
    "d": {
      "en": "Sultan Mahmud {RH} was among the first rulers to carry the title Sultan, granted by the Abbasid caliph. He led many campaigns into India, and his court gathered scholars such as al-Biruni. The story of his love for his loyal servant Ayaz is told in Persian and Bangla poetry as a lesson in sincerity.",
      "bn": "সুলতান মাহমুদ {RH} প্রথম শাসকদের একজন যিনি আব্বাসীয় খলিফার পক্ষ থেকে ‘সুলতান’ উপাধি পান। উনি ভারতে বহু অভিযান পরিচালনা করেন, আর উনার দরবারে আল-বিরুনির মতো আলেমগণ সমবেত হন। বিশ্বস্ত খাদেম আয়াজের প্রতি উনার স্নেহের কাহিনি ফারসি ও বাংলা কাব্যে ইখলাসের শিক্ষা হিসেবে বর্ণিত।"
    }
  },
  {
    "y": 1009,
    "cat": "awliya",
    "lat": 33.55,
    "lon": 68.42,
    "sc": "shrine",
    "t": {
      "en": "Birth of Hazrat Data Ganj Bakhsh {RH}",
      "bn": "হযরত দাতা গঞ্জবখশ {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Ghaznin",
      "bn": "গজনি"
    },
    "n": {
      "en": "Ghazni, Afghanistan",
      "bn": "গজনি, আফগানিস্তান"
    },
    "d": {
      "en": "Shaykh Ali Hujwiri {RH}, known as Data Ganj Bakhsh, settled in Lahore and wrote Kashf al-Mahjub, the oldest book on tasawwuf in Persian. Generations of saints of the subcontinent first visited his shrine before beginning their work.",
      "bn": "‘দাতা গঞ্জবখশ’ নামে পরিচিত শায়খ আলি হুজভিরি {RH} লাহোরে বসবাস করেন এবং ফারসি ভাষায় তাসাওউফের প্রাচীনতম কিতাব ‘কাশফুল মাহজুব’ রচনা করেন। উপমহাদেশের বহু আউলিয়া কাজ শুরুর আগে উনার মাজার শরীফ জিয়ারত করেছেন।"
    }
  },
  {
    "y": 1025,
    "cat": "knowledge",
    "lat": 34.8,
    "lon": 48.51,
    "sc": "books",
    "t": {
      "en": "The Canon of Medicine",
      "bn": "আল-কানুন ফিত তিব"
    },
    "p": {
      "en": "Hamadan, Persia",
      "bn": "হামাদান, পারস্য"
    },
    "n": {
      "en": "Hamadan, Iran",
      "bn": "হামাদান, ইরান"
    },
    "d": {
      "en": "Ibn Sina completed al-Qanun fi al-Tibb, a medical encyclopedia taught in the universities of Europe for about six hundred years.",
      "bn": "ইবনে সিনা ‘আল-কানুন ফিত তিব’ রচনা সম্পন্ন করেন — এমন এক চিকিৎসা বিশ্বকোষ, যা প্রায় ছয়শো বছর ইউরোপের বিশ্ববিদ্যালয়ে পড়ানো হয়েছে।"
    }
  },
  {
    "y": 1040,
    "cat": "sultan",
    "lat": 37.35,
    "lon": 61.9,
    "sc": "banners",
    "t": {
      "en": "The rise of the Great Seljuks",
      "bn": "মহান সেলজুকদের উত্থান"
    },
    "p": {
      "en": "Dandanqan, Khurasan",
      "bn": "দান্দানকান, খোরাসান"
    },
    "n": {
      "en": "Near Merv, Turkmenistan",
      "bn": "মার্ভের কাছে, তুর্কমেনিস্তান"
    },
    "d": {
      "en": "The Seljuk Turks, who had embraced Islam and the Hanafi madhhab, won at Dandanqan and became masters of Khurasan and Persia. They would become the great protectors of Sunni Islam for a century.",
      "bn": "ইসলাম ও হানাফি মাজহাব গ্রহণকারী সেলজুক তুর্কিরা দান্দানকানে বিজয়ী হয়ে খোরাসান ও পারস্যের অধিপতি হন। এক শতাব্দী ধরে উনারা আহলে সুন্নাতের মহান রক্ষক হয়ে ওঠেন।"
    }
  },
  {
    "y": 1055,
    "cat": "sultan",
    "lat": 33.32,
    "lon": 44.37,
    "sc": "roundcity",
    "t": {
      "en": "Sultan Tughril Beg {RH} enters Baghdad",
      "bn": "সুলতান তুগরিল বেগ {RH} উনার বাগদাদে প্রবেশ"
    },
    "p": {
      "en": "Baghdad",
      "bn": "বাগদাদ"
    },
    "n": {
      "en": "Baghdad, Iraq",
      "bn": "বাগদাদ, ইরাক"
    },
    "d": {
      "en": "At the caliph's invitation, Tughril Beg {RH} entered Baghdad and freed the Abbasid caliphate from the control of the Buyids. The caliph named him “Sultan of the East and the West”, and Sunni learning revived across the lands.",
      "bn": "খলিফার আমন্ত্রণে তুগরিল বেগ {RH} বাগদাদে প্রবেশ করে আব্বাসীয় খিলাফতকে বুওয়াইহিদের নিয়ন্ত্রণ থেকে মুক্ত করেন। খলিফা উনাকে ‘পূর্ব ও পশ্চিমের সুলতান’ উপাধি দেন, আর সর্বত্র আহলে সুন্নাতের ইলমচর্চা পুনর্জীবিত হয়।"
    }
  },
  {
    "y": 1067,
    "cat": "knowledge",
    "lat": 33.335,
    "lon": 44.395,
    "sc": "gate",
    "t": {
      "en": "The Nizamiyya Madrasah of Baghdad",
      "bn": "বাগদাদের নিজামিয়া মাদরাসা"
    },
    "p": {
      "en": "Baghdad",
      "bn": "বাগদাদ"
    },
    "n": {
      "en": "Baghdad, Iraq",
      "bn": "বাগদাদ, ইরাক"
    },
    "d": {
      "en": "The Seljuk vizier Nizam al-Mulk {RH} founded a network of madrasahs with endowed salaries and lodging for students. At the Nizamiyya of Baghdad, Imam Ghazali {RH} later taught hundreds of students; the model shaped madrasah education for centuries.",
      "bn": "সেলজুক উজির নিজামুল মুলক {RH} ওয়াকফকৃত বেতন ও ছাত্রাবাসসহ মাদরাসার এক নেটওয়ার্ক প্রতিষ্ঠা করেন। বাগদাদের নিজামিয়ায় পরে ইমাম গাযালি {RH} শত শত ছাত্রকে পড়ান; এই ধারা শতাব্দীর পর শতাব্দী মাদরাসা শিক্ষার রূপ দেয়।"
    }
  },
  {
    "y": 1071,
    "cat": "battle",
    "lat": 39.14,
    "lon": 42.54,
    "sc": "banners",
    "t": {
      "en": "Manzikert",
      "bn": "মানজিকার্ট"
    },
    "p": {
      "en": "Malazgird, Bilad al-Rum",
      "bn": "মালাজগিরদ, বিলাদুর রুম"
    },
    "n": {
      "en": "Malazgirt, Turkey",
      "bn": "মালাজগির্ত, তুরস্ক"
    },
    "d": {
      "en": "The Seljuk Sultan Alp Arslan {RH}, praying with his army and dressed in white as a shroud, defeated the Byzantine emperor. Anatolia opened to Muslim settlement — the beginning of the land now called Turkey.",
      "bn": "সেলজুক সুলতান আলপ আরসালান {RH} সৈন্যদের সাথে নামাজ আদায় করে, কাফনের মতো সাদা পোশাক পরে বাইজেন্টাইন সম্রাটকে পরাজিত করেন। আনাতোলিয়ায় মুসলিম বসতির দ্বার খোলে — আজকের তুরস্কের সূচনা।"
    }
  },
  {
    "y": 1078,
    "ah": 471,
    "cat": "awliya",
    "lat": 37.28,
    "lon": 49.58,
    "sc": "shrine",
    "t": {
      "en": "Birth of Ghawth al-A'zam Shaykh Abdul Qadir Jilani {RH}",
      "bn": "গাউসুল আজম বড়পীর শায়খ আবদুল কাদির জিলানি {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Jilan (Gilan)",
      "bn": "জিলান (গিলান)"
    },
    "n": {
      "en": "Gilan, Iran",
      "bn": "গিলান, ইরান"
    },
    "d": {
      "en": "Born in 471 AH, Shaykh Abdul Qadir Jilani {RH} went to Baghdad to study. On the way, robbers asked what he carried; he truthfully told them of the forty dinars sewn into his coat, as his mother had told him never to lie. Moved by his honesty, the robbers repented at his hands. He revived the Sunnat in Baghdad, and the Qadiriyya order spread across the world, Bengal included.",
      "bn": "৪৭১ হিজরিতে বড়পীর শায়খ আবদুল কাদির জিলানি {RH} উনার বিলাদত হয়। ইলম অর্জনে বাগদাদ যাওয়ার পথে ডাকাতরা জিজ্ঞেস করলে উনি সত্য কথা বলেন — জামার ভেতরে চল্লিশটি দিনার সেলাই করা আছে — কারণ মা উনাকে কখনো মিথ্যা না বলার উপদেশ দিয়েছিলেন। উনার সততায় মুগ্ধ হয়ে ডাকাতরা উনার হাতে তওবা করে। উনি বাগদাদে সুন্নাত জিন্দা করেন, আর কাদেরিয়া তরিকা বাংলাসহ সারা বিশ্বে ছড়িয়ে পড়ে।"
    },
    "l": {
      "en": "Truthfulness opens hearts that force cannot.",
      "bn": "সত্যবাদিতা এমন হৃদয় খুলে দেয়, যা শক্তি পারে না।"
    }
  },
  {
    "y": 1086,
    "cat": "sultan",
    "lat": 38.88,
    "lon": -6.97,
    "sc": "banners",
    "t": {
      "en": "Yusuf ibn Tashfin {RH} at al-Zallaqah",
      "bn": "যাল্লাকায় ইউসুফ ইবনে তাশফিন {RH}"
    },
    "p": {
      "en": "al-Zallaqah, al-Andalus",
      "bn": "যাল্লাকা, আল-আন্দালুস"
    },
    "n": {
      "en": "Near Badajoz, Spain",
      "bn": "বাদাহোসের কাছে, স্পেন"
    },
    "d": {
      "en": "Answering the call of the Muslims of al-Andalus, the Almoravid ruler Yusuf ibn Tashfin {RH} — known for his simple life and loyalty to the Maliki scholars — crossed from Morocco and won at al-Zallaqah, extending Muslim al-Andalus by four centuries.",
      "bn": "আল-আন্দালুসের মুসলমানদের আহ্বানে সাড়া দিয়ে মুরাবিতুন শাসক ইউসুফ ইবনে তাশফিন {RH} — যিনি সাদাসিধে জীবন ও মালিকি আলেমদের প্রতি আনুগত্যের জন্য প্রসিদ্ধ — মরক্কো থেকে এসে যাল্লাকায় বিজয়ী হন, এবং মুসলিম আন্দালুসের আয়ু আরও চার শতাব্দী বাড়িয়ে দেন।"
    }
  },
  {
    "y": 1111,
    "cat": "knowledge",
    "lat": 36.47,
    "lon": 59.52,
    "sc": "lamp",
    "t": {
      "en": "Imam Ghazali {RH} and the Ihya",
      "bn": "ইমাম গাযালি {RH} ও ইহইয়াউ উলুমিদ্দিন"
    },
    "p": {
      "en": "Tus, Khurasan",
      "bn": "তুস, খোরাসান"
    },
    "n": {
      "en": "Near Mashhad, Iran",
      "bn": "মাশহাদের কাছে, ইরান"
    },
    "d": {
      "en": "Hujjat al-Islam Imam Ghazali {RH} left his high post in Baghdad to purify his heart, and wrote Ihya Ulum al-Din, the Revival of the Religious Sciences, joining knowledge with sincerity. He returned to Allah in Tus in 1111.",
      "bn": "হুজ্জাতুল ইসলাম ইমাম গাযালি {RH} বাগদাদের উচ্চপদ ছেড়ে আত্মশুদ্ধির পথে বের হন এবং রচনা করেন ‘ইহইয়াউ উলুমিদ্দিন’ — ইলমের সাথে ইখলাসের মিলন। ১১১১ সালে তুসে উনি ইন্তেকাল করেন।"
    }
  },
  {
    "y": 1118,
    "cat": "awliya",
    "lat": 32.19,
    "lon": 46.29,
    "sc": "lamp",
    "t": {
      "en": "Birth of Shaykh Ahmad al-Rifa'i {RH}",
      "bn": "শায়খ আহমদ রিফায়ি {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Umm Ubaydah, near Wasit",
      "bn": "উম্মে উবাইদা, ওয়াসিতের কাছে"
    },
    "n": {
      "en": "Southern Iraq",
      "bn": "দক্ষিণ ইরাক"
    },
    "d": {
      "en": "Founder of the Rifa'i order, Shaykh Ahmad al-Rifa'i {RH} was famed for humility and mercy, even to the weakest of creatures. It is narrated that when he visited the Rawdah of Rasulullah {SAW}, he recited poetry of longing and love.",
      "bn": "রিফায়িয়া তরিকার প্রতিষ্ঠাতা শায়খ আহমদ রিফায়ি {RH} বিনয় ও দয়ার জন্য প্রসিদ্ধ ছিলেন, এমনকি সবচেয়ে দুর্বল সৃষ্টির প্রতিও। বর্ণিত আছে, উনি রাসূলুল্লাহ {SAW} উনার রওজা শরীফ জিয়ারতে গিয়ে মহব্বত ও আকুলতার কবিতা পাঠ করেন।"
    }
  },
  {
    "y": 1138,
    "cat": "sultan",
    "lat": 34.6,
    "lon": 43.68,
    "sc": "fortress",
    "t": {
      "en": "Birth of Sultan Salahuddin al-Ayyubi {RH}",
      "bn": "সুলতান সালাহউদ্দিন আইয়ুবি {RH} উনার জন্ম"
    },
    "p": {
      "en": "Takrit, Iraq",
      "bn": "তিকরিত, ইরাক"
    },
    "n": {
      "en": "Tikrit, Iraq",
      "bn": "তিকরিত, ইরাক"
    },
    "d": {
      "en": "Yusuf ibn Ayyub, later known as Salahuddin, “the righteousness of the religion”, was born in the fortress of Tikrit into a Kurdish family. He grew up in Damascus under Nur al-Din Zengi {RH}, learning hadith, the Qur'an and the art of just rule.",
      "bn": "ইউসুফ ইবনে আইয়ুব — পরে যিনি ‘সালাহউদ্দিন’, অর্থাৎ ‘দ্বীনের কল্যাণ’ নামে পরিচিত — তিকরিতের দুর্গে এক কুর্দি পরিবারে জন্মগ্রহণ করেন। দামেস্কে নুরুদ্দিন জঙ্গি {RH} উনার তত্ত্বাবধানে উনি বড় হন — হাদিস, কুরআন ও ন্যায়ের শাসন শেখেন।"
    }
  },
  {
    "y": 1141,
    "cat": "awliya",
    "lat": 31.03,
    "lon": 61.5,
    "sc": "shrine",
    "t": {
      "en": "Birth of Khwaja Gharib Nawaz Mu'inuddin Chishti {RH}",
      "bn": "খাজা গরিবে নেওয়াজ মঈনুদ্দিন চিশতি {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Sijistan",
      "bn": "সিজিস্তান"
    },
    "n": {
      "en": "Sistan, Iran",
      "bn": "সিস্তান, ইরান"
    },
    "d": {
      "en": "Hazrat Khwaja Mu'inuddin Chishti {RH} sold his orchard and gave the money to the poor to seek knowledge and nearness to Allah. He came to Ajmer in 1192 and, through love, hospitality and service to the poor, brought countless hearts to Islam. He is called Gharib Nawaz, the Friend of the Poor; he returned to his Lord in 1236.",
      "bn": "হযরত খাজা মঈনুদ্দিন চিশতি {RH} নিজের ফলের বাগান বিক্রি করে গরিবদের দান করে ইলম ও আল্লাহর নৈকট্যের সন্ধানে বের হন। ১১৯২ সালে উনি আজমির আসেন; ভালোবাসা, মেহমানদারি ও গরিবদের খেদমতের মাধ্যমে অগণিত হৃদয়কে ইসলামের দিকে আনেন। উনাকে বলা হয় ‘গরিবে নেওয়াজ’ — গরিবের বন্ধু; ১২৩৬ সালে উনি বিছাল লাভ করেন।"
    },
    "l": {
      "en": "Service to the poor is a road to the hearts of people.",
      "bn": "গরিবের খেদমত মানুষের হৃদয়ে পৌঁছানোর পথ।"
    }
  },
  {
    "y": 1145,
    "cat": "awliya",
    "lat": 36.07,
    "lon": 48.44,
    "sc": "books",
    "t": {
      "en": "Birth of Shaykh Shihabuddin Suhrawardi {RH}",
      "bn": "শায়খ শিহাবুদ্দিন সোহরাওয়ার্দি {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Suhraward",
      "bn": "সোহরাওয়ার্দ"
    },
    "n": {
      "en": "Zanjan province, Iran",
      "bn": "জানজান প্রদেশ, ইরান"
    },
    "d": {
      "en": "Shaykh Shihabuddin Umar Suhrawardi {RH} of Baghdad wrote Awarif al-Ma'arif, a classic guide to the Sufi path based on Qur'an and Sunnat. His disciple Shaykh Bahauddin Zakariya {RH} carried the Suhrawardiyya order to Multan, and from there it reached Bengal.",
      "bn": "বাগদাদের শায়খ শিহাবুদ্দিন উমর সোহরাওয়ার্দি {RH} কুরআন-সুন্নাহভিত্তিক সুফি পথের ধ্রুপদি গ্রন্থ ‘আওয়ারিফুল মাআরিফ’ রচনা করেন। উনার মুরিদ শায়খ বাহাউদ্দিন জাকারিয়া {RH} সোহরাওয়ার্দিয়া তরিকা মুলতানে নিয়ে আসেন, আর সেখান থেকে তা বাংলায় পৌঁছায়।"
    }
  },
  {
    "y": 1154,
    "cat": "sultan",
    "lat": 33.511,
    "lon": 36.29,
    "sc": "minaret",
    "t": {
      "en": "Sultan Nur al-Din Zengi {RH} unites Sham",
      "bn": "সুলতান নুরুদ্দিন জঙ্গি {RH} উনার শাম ঐক্য"
    },
    "p": {
      "en": "Dimashq",
      "bn": "দিমাশক"
    },
    "n": {
      "en": "Damascus, Syria",
      "bn": "দামেস্ক, সিরিয়া"
    },
    "d": {
      "en": "Nur al-Din {RH} united Aleppo and Damascus, built madrasahs, hospitals and Dar al-Hadith, and lived on his own small income. Hoping for the liberation of Bayt al-Maqdis, he commissioned a beautiful minbar for al-Masjid al-Aqsa — which Salahuddin {RH} installed there after Hattin.",
      "bn": "নুরুদ্দিন জঙ্গি {RH} আলেপ্পো ও দামেস্ক ঐক্যবদ্ধ করেন; মাদরাসা, হাসপাতাল ও দারুল হাদিস নির্মাণ করেন, আর নিজের সামান্য আয়ে জীবন চালাতেন। বায়তুল মাকদিস মুক্তির আশায় উনি মসজিদুল আকসার জন্য একটি অপূর্ব মিম্বর তৈরি করান — হিত্তিনের পর সালাহউদ্দিন {RH} সেটি সেখানে স্থাপন করেন।"
    }
  },
  {
    "y": 1171,
    "cat": "sultan",
    "lat": 30.0444,
    "lon": 31.2357,
    "sc": "gate",
    "t": {
      "en": "Salahuddin {RH} restores the Sunnah in Egypt",
      "bn": "সালাহউদ্দিন {RH} উনার মিসরে আহলে সুন্নাত পুনঃপ্রতিষ্ঠা"
    },
    "p": {
      "en": "al-Qahirah",
      "bn": "আল-কাহিরা"
    },
    "n": {
      "en": "Cairo, Egypt",
      "bn": "কায়রো, মিসর"
    },
    "d": {
      "en": "After two centuries of Fatimid rule, Salahuddin {RH} restored the Friday khutbah in the name of the Abbasid caliph, founded Sunni madrasahs, and made al-Azhar a centre of Ahl al-Sunnah wal-Jama'ah. Egypt and Sham were united for the struggle to free Bayt al-Maqdis.",
      "bn": "দুই শতাব্দীর ফাতিমি শাসনের পর সালাহউদ্দিন {RH} আব্বাসীয় খলিফার নামে জুমার খুতবা পুনরায় চালু করেন, সুন্নি মাদরাসা প্রতিষ্ঠা করেন এবং আল-আজহারকে আহলে সুন্নাত ওয়াল জামাআতের কেন্দ্রে পরিণত করেন। বায়তুল মাকদিস মুক্তির জন্য মিসর ও শাম ঐক্যবদ্ধ হয়।"
    }
  },
  {
    "y": 1173,
    "cat": "awliya",
    "lat": 40.53,
    "lon": 72.8,
    "sc": "mountain",
    "t": {
      "en": "Birth of Khwaja Qutbuddin Bakhtiyar Kaki {RH}",
      "bn": "খাজা কুতুবুদ্দিন বখতিয়ার কাকি {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Ush, Farghana",
      "bn": "উশ, ফারগানা"
    },
    "n": {
      "en": "Osh, Kyrgyzstan",
      "bn": "ওশ, কিরগিজস্তান"
    },
    "d": {
      "en": "The beloved disciple and successor of Khwaja Gharib Nawaz {RH}, Khwaja Qutbuddin Bakhtiyar Kaki {RH} spread the Chishti path in Delhi. He was known for his deep absorption in the remembrance of Allah, and lies at rest in Mehrauli, Delhi.",
      "bn": "খাজা গরিবে নেওয়াজ {RH} উনার প্রিয় মুরিদ ও খলিফা খাজা কুতুবুদ্দিন বখতিয়ার কাকি {RH} দিল্লিতে চিশতিয়া তরিকা প্রচার করেন। আল্লাহর জিকিরে গভীর নিমগ্নতার জন্য উনি প্রসিদ্ধ; দিল্লির মেহরৌলিতে উনার মাজার শরীফ।"
    }
  },
  {
    "y": 1179,
    "cat": "awliya",
    "lat": 30.2,
    "lon": 71.47,
    "sc": "shrine",
    "t": {
      "en": "Birth of Baba Farid Ganjshakar {RH}",
      "bn": "বাবা ফরিদ গঞ্জেশকর {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Near Multan, Punjab",
      "bn": "মুলতানের কাছে, পাঞ্জাব"
    },
    "n": {
      "en": "Punjab, Pakistan",
      "bn": "পাঞ্জাব, পাকিস্তান"
    },
    "d": {
      "en": "Hazrat Fariduddin Mas'ud {RH}, successor of Khwaja Qutbuddin {RH}, lived simply at Ajodhan (Pakpattan), feeding all who came. His sweetness of speech and character gave him the name Ganjshakar, Treasure of Sugar. His disciple was Hazrat Nizamuddin Awliya {RH}.",
      "bn": "খাজা কুতুবুদ্দিন {RH} উনার খলিফা হযরত ফরিদুদ্দিন মাসউদ {RH} আজোধনে (পাকপত্তন) সাদাসিধে জীবন কাটান, যারাই আসত সবাইকে খাওয়াতেন। উনার কথা ও চরিত্রের মিষ্টতার জন্য উনার নাম হয় ‘গঞ্জেশকর’ — চিনির ভান্ডার। উনার মুরিদ ছিলেন হযরত নিজামুদ্দিন আউলিয়া {RH}।"
    }
  },
  {
    "y": 1187,
    "cat": "battle",
    "lat": 31.778,
    "lon": 35.235,
    "sc": "domerock",
    "t": {
      "en": "Salahuddin {RH} returns to Bayt al-Maqdis",
      "bn": "সালাহউদ্দিন আইয়ুবি {RH} উনার বায়তুল মাকদিস পুনরুদ্ধার"
    },
    "p": {
      "en": "Hattin and al-Quds",
      "bn": "হিত্তিন ও আল-কুদস"
    },
    "n": {
      "en": "al-Quds (Jerusalem), Palestine",
      "bn": "আল-কুদস (জেরুজালেম), ফিলিস্তিন"
    },
    "d": {
      "en": "Eighty-eight years after the Crusaders took Jerusalem with great bloodshed, Sultan Salahuddin al-Ayyubi {RH} won at Hattin and entered the city on 27 Rajab, the night of Mi'raj. He spared its people and let them leave in safety.",
      "bn": "ক্রুসেডাররা ব্যাপক রক্তপাতের মাধ্যমে জেরুজালেম দখলের অষ্টাশি বছর পর সুলতান সালাহউদ্দিন আইয়ুবি {RH} হিত্তিনে বিজয়ী হন এবং মিরাজের রাত ২৭ রজবে শহরে প্রবেশ করেন। উনি অধিবাসীদের প্রাণ রক্ষা করেন এবং নিরাপদে চলে যেতে দেন।"
    },
    "l": {
      "en": "Mercy in victory is the mark of a true Muslim leader.",
      "bn": "বিজয়ে দয়া — প্রকৃত মুসলিম নেতার পরিচয়।"
    }
  },
  {
    "y": 1193,
    "cat": "sultan",
    "lat": 33.512,
    "lon": 36.302,
    "sc": "lamp",
    "t": {
      "en": "Sultan Salahuddin {RH} returns to his Lord",
      "bn": "সুলতান সালাহউদ্দিন {RH} উনার ইন্তেকাল"
    },
    "p": {
      "en": "Dimashq",
      "bn": "দিমাশক"
    },
    "n": {
      "en": "Damascus, Syria",
      "bn": "দামেস্ক, সিরিয়া"
    },
    "d": {
      "en": "After the truce of Ramla secured pilgrims' access to Bayt al-Maqdis, Salahuddin {RH} passed away in Damascus. The ruler of Egypt and Sham left behind only a few coins — everything else he had given away; money had to be borrowed for his burial. He rests beside the Umayyad Mosque.",
      "bn": "রামলার সন্ধিতে বায়তুল মাকদিসে জিয়ারতকারীদের পথ নিরাপদ করার পর সালাহউদ্দিন {RH} দামেস্কে ইন্তেকাল করেন। মিসর ও শামের এই শাসক রেখে গেছেন মাত্র কয়েকটি মুদ্রা — বাকি সব উনি দান করে দিয়েছিলেন; উনার দাফনের খরচ ধার করতে হয়েছিল। উমাইয়া মসজিদের পাশে উনার মাজার।"
    },
    "l": {
      "en": "A ruler is remembered not by what he kept but by what he gave.",
      "bn": "শাসককে মানুষ মনে রাখে উনি কী রেখে গেছেন তা দিয়ে নয়, কী দিয়ে গেছেন তা দিয়ে।"
    }
  },
  {
    "y": 1196,
    "cat": "awliya",
    "lat": 35.3,
    "lon": -5.2,
    "sc": "mountain",
    "t": {
      "en": "Birth of Imam Abul Hasan al-Shadhili {RH}",
      "bn": "ইমাম আবুল হাসান শাজিলি {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Ghumarah, al-Maghrib",
      "bn": "গুমারা, মাগরিব"
    },
    "n": {
      "en": "Northern Morocco",
      "bn": "উত্তর মরক্কো"
    },
    "d": {
      "en": "Founder of the Shadhili order, Imam al-Shadhili {RH} taught that the seeker should live among people, work and dress well, and keep the heart with Allah. His litanies, such as Hizb al-Bahr, are recited from Morocco to Indonesia.",
      "bn": "শাজিলিয়া তরিকার প্রতিষ্ঠাতা ইমাম শাজিলি {RH} শিক্ষা দেন — সালিক মানুষের মাঝে থাকবে, কাজ করবে, সুন্দর পোশাক পরবে, আর অন্তর রাখবে আল্লাহর সাথে। উনার ‘হিজবুল বাহর’ সহ ওজিফাসমূহ মরক্কো থেকে ইন্দোনেশিয়া পর্যন্ত পঠিত হয়।"
    }
  },
  {
    "y": 1204,
    "cat": "bengal",
    "lat": 24.87,
    "lon": 88.13,
    "sc": "river",
    "t": {
      "en": "Bakhtiyar Khilji {RH} enters Bengal",
      "bn": "বখতিয়ার খিলজি {RH} উনার বঙ্গ বিজয়"
    },
    "p": {
      "en": "Nadia and Lakhnauti (Gaur)",
      "bn": "নদীয়া ও লখনৌতি (গৌড়)"
    },
    "n": {
      "en": "Gaur, on the Bangladesh–India border",
      "bn": "গৌড়, বাংলাদেশ–ভারত সীমান্ত"
    },
    "d": {
      "en": "With a small band of horsemen, Ikhtiyar al-Din Bakhtiyar Khilji {RH} took Nadia and made Lakhnauti his capital. Muslim rule in Bengal began, and with it masjids, madrasahs and khanqahs across the delta.",
      "bn": "অল্প সংখ্যক অশ্বারোহী নিয়ে ইখতিয়ারউদ্দিন বখতিয়ার খিলজি {RH} নদীয়া জয় করে লখনৌতিকে রাজধানী করেন। বাংলায় মুসলিম শাসন শুরু হয়, আর সাথে সাথে ব-দ্বীপজুড়ে গড়ে ওঠে মসজিদ, মাদরাসা ও খানকাহ।"
    }
  },
  {
    "y": 1206,
    "cat": "spread",
    "lat": 28.52,
    "lon": 77.185,
    "sc": "minaret",
    "t": {
      "en": "The Delhi Sultanate",
      "bn": "দিল্লি সালতানাত"
    },
    "p": {
      "en": "Dihli, al-Hind",
      "bn": "দিল্লি, হিন্দ"
    },
    "n": {
      "en": "Delhi, India",
      "bn": "দিল্লি, ভারত"
    },
    "d": {
      "en": "Qutb al-Din Aibak founded the Delhi Sultanate and began the Qutb Minar. Delhi became a refuge for scholars and saints fleeing the Mongols, among them the Chishti masters {RHM}.",
      "bn": "কুতুবউদ্দিন আইবেক দিল্লি সালতানাত প্রতিষ্ঠা করেন এবং কুতুব মিনারের কাজ শুরু করেন। মঙ্গোলদের থেকে আশ্রয়প্রার্থী আলেম ও আউলিয়াদের — চিশতিয়া সিলসিলার বুজুর্গগণ {RHM} সহ — আশ্রয়স্থল হয় দিল্লি।"
    }
  },
  {
    "y": 1212,
    "cat": "awliya",
    "lat": 29.07,
    "lon": 31.1,
    "sc": "quran",
    "t": {
      "en": "Birth of Imam al-Busiri {RH}, poet of the Burdah",
      "bn": "কাসিদা বুরদা শরীফের কবি ইমাম বুসিরি {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Dalas, Misr",
      "bn": "দালাস, মিসর"
    },
    "n": {
      "en": "Beni Suef, Egypt",
      "bn": "বেনি সুয়েফ, মিসর"
    },
    "d": {
      "en": "Paralysed by illness, Imam al-Busiri {RH} composed a poem in praise of Rasulullah {SAW} and saw Him in a dream placing His blessed mantle over him; he awoke healed. Qasidat al-Burdah — “Mawlaya salli wa sallim da'iman abada…” — is sung in mehfils across the world, and across Bangladesh.",
      "bn": "অসুস্থতায় পক্ষাঘাতগ্রস্ত ইমাম বুসিরি {RH} রাসূলুল্লাহ {SAW} উনার শানে একটি কাসিদা রচনা করেন, এবং স্বপ্নে দেখেন উনি নিজের চাদর মুবারক উনার ওপর বিছিয়ে দিচ্ছেন; জেগে উঠে উনি সুস্থ হয়ে যান। কাসিদা বুরদা শরীফ — “মাওলায়া সাল্লি ওয়া সাল্লিম দায়িমান আবাদা…” — সারা বিশ্বে এবং বাংলাদেশের মাহফিলে মাহফিলে পঠিত হয়।"
    }
  },
  {
    "y": 1238,
    "cat": "awliya",
    "lat": 28.03,
    "lon": 79.12,
    "sc": "shrine",
    "t": {
      "en": "Birth of Hazrat Nizamuddin Awliya {RH}",
      "bn": "হযরত নিজামুদ্দিন আউলিয়া {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Badayun, Hindustan",
      "bn": "বাদায়ুন, হিন্দুস্তান"
    },
    "n": {
      "en": "Uttar Pradesh, India",
      "bn": "উত্তর প্রদেশ, ভারত"
    },
    "d": {
      "en": "Raised in poverty by his devoted mother, Hazrat Nizamuddin {RH} became the successor of Baba Farid {RH}. In Delhi his khanqah fed thousands daily, and he was called Mahbub-e-Ilahi, the Beloved of Allah. Among his disciples was the poet Amir Khusrau {RH}.",
      "bn": "দারিদ্র্যের মধ্যে নেককার মায়ের কাছে বড় হওয়া হযরত নিজামুদ্দিন {RH} বাবা ফরিদ {RH} উনার খলিফা হন। দিল্লিতে উনার খানকাহ থেকে প্রতিদিন হাজারো মানুষ খাবার পেত; উনাকে বলা হয় ‘মাহবুবে ইলাহি’ — আল্লাহর প্রিয়। কবি আমির খসরু {RH} উনার মুরিদ ছিলেন।"
    }
  },
  {
    "y": 1250,
    "cat": "sultan",
    "lat": 31.04,
    "lon": 31.38,
    "sc": "banners",
    "t": {
      "en": "The Mamluk Sultanate is born",
      "bn": "মামলুক সালতানাতের জন্ম"
    },
    "p": {
      "en": "al-Mansurah, Misr",
      "bn": "আল-মানসুরা, মিসর"
    },
    "n": {
      "en": "Mansoura, Egypt",
      "bn": "মানসুরা, মিসর"
    },
    "d": {
      "en": "After the Mamluks defeated the crusade of King Louis IX at al-Mansurah, they took power in Egypt. For more than 250 years the Mamluk sultans defended the Haramain, Egypt and Sham, and filled Cairo with madrasahs and mosques.",
      "bn": "মানসুরায় রাজা নবম লুইয়ের ক্রুসেড পরাজিত করার পর মামলুকরা মিসরের শাসনভার গ্রহণ করেন। আড়াইশো বছরেরও বেশি সময় মামলুক সুলতানগণ হারামাইন, মিসর ও শাম রক্ষা করেন, আর কায়রোকে মাদরাসা ও মসজিদে ভরিয়ে তোলেন।"
    }
  },
  {
    "y": 1258,
    "cat": "battle",
    "lat": 33.31,
    "lon": 44.36,
    "sc": "roundcity",
    "t": {
      "en": "The fall of Baghdad",
      "bn": "বাগদাদের পতন"
    },
    "p": {
      "en": "Baghdad",
      "bn": "বাগদাদ"
    },
    "n": {
      "en": "Baghdad, Iraq",
      "bn": "বাগদাদ, ইরাক"
    },
    "d": {
      "en": "The Mongols of Hulagu sacked Baghdad and killed the Caliph. So many books were thrown into the Tigris that its water was said to run dark with ink. The Abbasid caliphate in Baghdad ended after five centuries.",
      "bn": "হালাকু খানের মঙ্গোল বাহিনী বাগদাদ ধ্বংস করে এবং খলিফাকে হত্যা করে। এত বই দজলায় ফেলা হয় যে নদীর পানি কালিতে কালো হয়ে গিয়েছিল বলে বর্ণিত আছে। পাঁচ শতাব্দীর আব্বাসীয় বাগদাদ শেষ হয়।"
    }
  },
  {
    "y": 1260,
    "cat": "battle",
    "lat": 32.55,
    "lon": 35.36,
    "sc": "banners",
    "t": {
      "en": "Ain Jalut",
      "bn": "আইন জালুত"
    },
    "p": {
      "en": "Ayn Jalut, Palestine",
      "bn": "আইন জালুত, ফিলিস্তিন"
    },
    "n": {
      "en": "Jezreel valley",
      "bn": "জেজরিল উপত্যকা"
    },
    "d": {
      "en": "The Mamluks of Egypt under Qutuz {RH} and Baybars {RH} defeated the Mongols for the first time, protecting Egypt, the Hijaz and the Two Holy Mosques.",
      "bn": "কুতুজ {RH} ও বাইবার্স {RH} উনাদের নেতৃত্বে মিসরের মামলুকরা প্রথমবারের মতো মঙ্গোলদের পরাজিত করে; মিসর, হিজাজ ও হারামাইন শরীফাইন রক্ষা পায়।"
    }
  },
  {
    "y": 1261,
    "cat": "sultan",
    "lat": 30.03,
    "lon": 31.26,
    "sc": "minaret",
    "t": {
      "en": "The Abbasid caliphate revived in Cairo",
      "bn": "কায়রোতে আব্বাসীয় খিলাফতের পুনঃপ্রতিষ্ঠা"
    },
    "p": {
      "en": "al-Qahirah",
      "bn": "আল-কাহিরা"
    },
    "n": {
      "en": "Cairo, Egypt",
      "bn": "কায়রো, মিসর"
    },
    "d": {
      "en": "Three years after Baghdad fell, Sultan Baybars {RH} received a surviving member of the Abbasid family in Cairo and pledged allegiance to him as caliph. The Abbasid caliphate continued in Cairo as a symbol of unity until 1517.",
      "bn": "বাগদাদ পতনের তিন বছর পর সুলতান বাইবার্স {RH} আব্বাসীয় বংশের এক জীবিত সদস্যকে কায়রোতে গ্রহণ করে উনার হাতে খলিফা হিসেবে বাইআত দেন। ঐক্যের প্রতীক হিসেবে কায়রোতে আব্বাসীয় খিলাফত ১৫১৭ সাল পর্যন্ত টিকে থাকে।"
    }
  },
  {
    "y": 1273,
    "cat": "knowledge",
    "lat": 37.87,
    "lon": 32.5,
    "sc": "lamp",
    "t": {
      "en": "Mawlana Rumi {RH} in Konya",
      "bn": "কোনিয়ায় মাওলানা রুমি {RH}"
    },
    "p": {
      "en": "Qunya, Bilad al-Rum",
      "bn": "কুনিয়া, বিলাদুর রুম"
    },
    "n": {
      "en": "Konya, Turkey",
      "bn": "কোনিয়া, তুরস্ক"
    },
    "d": {
      "en": "Mawlana Jalal al-Din Rumi {RH} completed the Masnavi, poems of love for Allah Ta'ala and His Messenger {SAW}, read in Persian, Bangla and dozens of languages to this day.",
      "bn": "মাওলানা জালালুদ্দিন রুমি {RH} রচনা করেন মসনবি শরীফ — আল্লাহ তাআলা ও উনার রাসূল {SAW} উনার প্রেমের কাব্য, যা আজও ফারসি, বাংলাসহ বহু ভাষায় পঠিত হয়।"
    }
  },
  {
    "y": 1291,
    "cat": "sultan",
    "lat": 32.92,
    "lon": 35.07,
    "sc": "fortress",
    "t": {
      "en": "Acre: the end of the Crusader states",
      "bn": "আক্কা: ক্রুসেডার রাজ্যের অবসান"
    },
    "p": {
      "en": "Akka, Sham",
      "bn": "আক্কা, শাম"
    },
    "n": {
      "en": "Akka, Palestine",
      "bn": "আক্কা, ফিলিস্তিন"
    },
    "d": {
      "en": "Sultan al-Ashraf Khalil {RH} took Acre, the last major Crusader stronghold. Nearly two centuries after the first Crusade, the coast of Sham was free again.",
      "bn": "সুলতান আশরাফ খলিল {RH} ক্রুসেডারদের শেষ বড় ঘাঁটি আক্কা জয় করেন। প্রথম ক্রুসেডের প্রায় দুই শতাব্দী পর শামের উপকূল আবার মুক্ত হয়।"
    }
  },
  {
    "y": 1299,
    "cat": "build",
    "lat": 40.02,
    "lon": 30.18,
    "sc": "istanbul",
    "t": {
      "en": "The rise of the Ottomans",
      "bn": "উসমানীয়দের উত্থান"
    },
    "p": {
      "en": "Söğüt, Anatolia",
      "bn": "সোগুত, আনাতোলিয়া"
    },
    "n": {
      "en": "Söğüt, Turkey",
      "bn": "সোগুত, তুরস্ক"
    },
    "d": {
      "en": "Osman Ghazi {RH}, guided by the scholar Shaykh Edebali {RH}, led a small frontier state in north-west Anatolia. His descendants would serve the Two Holy Mosques for four centuries.",
      "bn": "শায়খ এদেবালি {RH} উনার দিকনির্দেশনায় উসমান গাজি {RH} উত্তর-পশ্চিম আনাতোলিয়ায় ছোট একটি সীমান্ত রাজ্যের নেতৃত্ব দেন। উনার বংশধররা চার শতাব্দী হারামাইন শরীফাইনের খেদমত করেন।"
    }
  },
  {
    "y": 1303,
    "cat": "bengal",
    "lat": 24.9,
    "lon": 91.87,
    "sc": "bengal",
    "t": {
      "en": "Hazrat Shah Jalal {RH} in Sylhet",
      "bn": "সিলেটে হযরত শাহজালাল {RH}"
    },
    "p": {
      "en": "Srihatta",
      "bn": "শ্রীহট্ট"
    },
    "n": {
      "en": "Sylhet, Bangladesh",
      "bn": "সিলেট, বাংলাদেশ"
    },
    "d": {
      "en": "Hazrat Shah Jalal Mujarrad Yamani {RH} came from Yemen with 360 companions. His teacher had given him a handful of earth and told him to settle where the soil matched — and it matched in Sylhet. Through him and his companions {RHM}, Islam spread across north-east Bengal.",
      "bn": "হযরত শাহজালাল মুজাররদ ইয়েমেনি {RH} ৩৬০ জন সঙ্গী নিয়ে ইয়েমেন থেকে আসেন। উনার পীর উনাকে এক মুঠো মাটি দিয়ে বলেছিলেন, যেখানে মাটি মিলে যাবে সেখানে বসতি করতে — আর তা মিলে যায় সিলেটে। উনার ও উনার সঙ্গীদের {RHM} মাধ্যমে উত্তর-পূর্ব বাংলায় ইসলাম ছড়িয়ে পড়ে।"
    }
  },
  {
    "y": 1318,
    "cat": "awliya",
    "lat": 39.8,
    "lon": 64.53,
    "sc": "minaret",
    "t": {
      "en": "Birth of Khwaja Bahauddin Naqshband {RH}",
      "bn": "খাজা বাহাউদ্দিন নকশবন্দ {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Qasr-i Arifan, Bukhara",
      "bn": "কাসরে আরিফান, বুখারা"
    },
    "n": {
      "en": "Bukhara, Uzbekistan",
      "bn": "বুখারা, উজবেকিস্তান"
    },
    "d": {
      "en": "Khwaja Bahauddin Naqshband {RH} taught silent remembrance of the heart and the principle “the hand at work, the heart with the Friend.” The Naqshbandi order, later renewed by Mujaddid Alf Thani {RH}, spread widely across South Asia and Bengal.",
      "bn": "খাজা বাহাউদ্দিন নকশবন্দ {RH} অন্তরের নীরব জিকির এবং ‘হাত কাজে, অন্তর বন্ধুর সাথে’ — এই নীতির শিক্ষা দেন। পরে মুজাদ্দিদে আলফে সানি {RH} উনার মাধ্যমে নবায়িত নকশবন্দিয়া তরিকা দক্ষিণ এশিয়া ও বাংলায় ব্যাপকভাবে ছড়িয়ে পড়ে।"
    }
  },
  {
    "y": 1324,
    "cat": "spread",
    "lat": 16.77,
    "lon": -3,
    "sc": "journey",
    "route": "musa",
    "t": {
      "en": "The Hajj of Mansa Musa {RH}",
      "bn": "মানসা মুসা {RH} উনার হজ"
    },
    "p": {
      "en": "Timbuktu, Mali",
      "bn": "টিম্বাকটু, মালি"
    },
    "n": {
      "en": "Timbuktu, Mali",
      "bn": "টিম্বাকটু, মালি"
    },
    "d": {
      "en": "The emperor of Mali travelled to Makkah via Cairo with so much gold to give in charity that its price fell in Egypt. He returned with scholars and built the Djinguereber masjid of Timbuktu, which became a city of books.",
      "bn": "মালির সম্রাট কায়রো হয়ে মক্কায় হজে যান; সদকা করার জন্য এত সোনা সাথে ছিল যে মিসরে সোনার দাম পড়ে যায়। উনি আলেমদের সাথে নিয়ে ফেরেন এবং টিম্বাকটুতে জিঙ্গারেবার মসজিদ নির্মাণ করেন; শহরটি হয়ে ওঠে কিতাবের নগরী।"
    }
  },
  {
    "y": 1325,
    "cat": "knowledge",
    "lat": 35.77,
    "lon": -5.8,
    "sc": "compass",
    "route": "battuta",
    "t": {
      "en": "Ibn Battuta {RH} sets out",
      "bn": "ইবনে বতুতা {RH} উনার যাত্রা"
    },
    "p": {
      "en": "Tanjah",
      "bn": "তানজা"
    },
    "n": {
      "en": "Tangier, Morocco",
      "bn": "তাঞ্জিয়ার, মরক্কো"
    },
    "d": {
      "en": "Leaving for Hajj at twenty-one, Ibn Battuta {RH} travelled some 120,000 km in 29 years. In 1346 he came to Bengal, met Hazrat Shah Jalal {RH} in Sylhet, and sailed from Sonargaon — he called Bengal “a hell full of good things”, rich and green but very wet.",
      "bn": "একুশ বছর বয়সে হজের উদ্দেশ্যে বের হয়ে ইবনে বতুতা {RH} ২৯ বছরে প্রায় ১,২০,০০০ কিমি ভ্রমণ করেন। ১৩৪৬ সালে বাংলায় এসে সিলেটে হযরত শাহজালাল {RH} উনার সাথে সাক্ষাৎ করেন এবং সোনারগাঁও থেকে নৌপথে যাত্রা করেন। উনি বাংলাকে বলেছেন ‘নিয়ামতে ভরা দোজখ’ — সবুজ ও সমৃদ্ধ, কিন্তু খুব আর্দ্র।"
    }
  },
  {
    "y": 1326,
    "cat": "sultan",
    "lat": 40.18,
    "lon": 29.06,
    "sc": "istanbul",
    "t": {
      "en": "Bursa, the first Ottoman capital",
      "bn": "বুরসা, উসমানীয়দের প্রথম রাজধানী"
    },
    "p": {
      "en": "Bursa, Anatolia",
      "bn": "বুরসা, আনাতোলিয়া"
    },
    "n": {
      "en": "Bursa, Turkey",
      "bn": "বুরসা, তুরস্ক"
    },
    "d": {
      "en": "Orhan Ghazi {RH}, son of Osman Ghazi {RH}, took Bursa and made it his capital. He built its first madrasah and soup kitchen, and the Ottoman state grew from a frontier principality into a sultanate.",
      "bn": "উসমান গাজি {RH} উনার পুত্র ওরহান গাজি {RH} বুরসা জয় করে রাজধানী করেন। উনি সেখানে প্রথম মাদরাসা ও লঙ্গরখানা নির্মাণ করেন, আর উসমানীয় রাষ্ট্র সীমান্ত রাজ্য থেকে সালতানাতে পরিণত হয়।"
    }
  },
  {
    "y": 1352,
    "cat": "bengal",
    "lat": 25.13,
    "lon": 88.15,
    "sc": "bengal",
    "t": {
      "en": "The Bengal Sultanate is united",
      "bn": "বাংলা সালতানাতের ঐক্য"
    },
    "p": {
      "en": "Pandua",
      "bn": "পান্ডুয়া"
    },
    "n": {
      "en": "Malda, West Bengal",
      "bn": "মালদহ, পশ্চিমবঙ্গ"
    },
    "d": {
      "en": "Shamsuddin Ilyas Shah united Lakhnauti, Satgaon and Sonargaon and took the title Shah-i-Bangalah — the first use of “Bangalah” for the whole land. His son built the vast Adina Mosque, one of the largest in the subcontinent.",
      "bn": "শামসুদ্দিন ইলিয়াস শাহ লখনৌতি, সাতগাঁও ও সোনারগাঁও একত্র করে ‘শাহ-ই-বাঙ্গালাহ’ উপাধি নেন — গোটা দেশের জন্য ‘বাঙ্গালাহ’ নামের প্রথম ব্যবহার। উনার পুত্র বিশাল আদিনা মসজিদ নির্মাণ করেন, যা উপমহাদেশের অন্যতম বৃহৎ মসজিদ।"
    }
  },
  {
    "y": 1389,
    "cat": "sultan",
    "lat": 42.69,
    "lon": 21.12,
    "sc": "banners",
    "t": {
      "en": "Kosovo and the martyrdom of Sultan Murad {RH}",
      "bn": "কসোভো ও সুলতান মুরাদ {RH} উনার শাহাদাত"
    },
    "p": {
      "en": "Kosova, Rumelia",
      "bn": "কসোভা, রুমেলিয়া"
    },
    "n": {
      "en": "Kosovo",
      "bn": "কসোভো"
    },
    "d": {
      "en": "Sultan Murad I {RH} won the Battle of Kosovo but was martyred on the field. The Balkans opened to the Ottomans, and Islam took root in Bosnia, Albania and Kosovo, where it remains today.",
      "bn": "সুলতান প্রথম মুরাদ {RH} কসোভোর যুদ্ধে বিজয়ী হন, কিন্তু ময়দানেই শাহাদাত বরণ করেন। বলকান উসমানীয়দের জন্য উন্মুক্ত হয়, আর বসনিয়া, আলবেনিয়া ও কসোভোতে ইসলাম শিকড় গাড়ে, যা আজও টিকে আছে।"
    }
  },
  {
    "y": 1414,
    "cat": "spread",
    "lat": 2.19,
    "lon": 102.25,
    "sc": "sea",
    "t": {
      "en": "Malacca embraces Islam",
      "bn": "মালাক্কার ইসলাম গ্রহণ"
    },
    "p": {
      "en": "Melaka",
      "bn": "মালাক্কা"
    },
    "n": {
      "en": "Malacca, Malaysia",
      "bn": "মালাক্কা, মালয়েশিয়া"
    },
    "d": {
      "en": "Through honest Muslim traders and teachers, the port of Malacca and its ruler embraced Islam. From there Islam spread peacefully through the Malay world — today Indonesia is home to the largest Muslim population on earth.",
      "bn": "সৎ মুসলিম ব্যবসায়ী ও শিক্ষকদের মাধ্যমে মালাক্কা বন্দর ও এর শাসক ইসলাম গ্রহণ করেন। সেখান থেকে শান্তিপূর্ণভাবে মালয় অঞ্চলে ইসলাম ছড়িয়ে পড়ে — আজ ইন্দোনেশিয়া পৃথিবীর সবচেয়ে বেশি মুসলমানের দেশ।"
    }
  },
  {
    "y": 1420,
    "cat": "knowledge",
    "lat": 39.67,
    "lon": 66.99,
    "sc": "books",
    "t": {
      "en": "The observatory of Samarkand",
      "bn": "সমরকন্দের রাসাদখানা"
    },
    "p": {
      "en": "Samarqand",
      "bn": "সমরকন্দ"
    },
    "n": {
      "en": "Samarkand, Uzbekistan",
      "bn": "সমরকন্দ, উজবেকিস্তান"
    },
    "d": {
      "en": "Ulugh Beg built a great observatory and madrasah in Samarkand. His star tables, with the length of the year measured to within a minute, were used to fix prayer times and the qiblah for centuries.",
      "bn": "উলুগ বেগ সমরকন্দে বিশাল রাসাদখানা (নক্ষত্র পর্যবেক্ষণকেন্দ্র) ও মাদরাসা নির্মাণ করেন। উনার নক্ষত্র-সারণিতে বছরের দৈর্ঘ্য প্রায় এক মিনিটের নির্ভুলতায় মাপা হয়েছিল; শতাব্দীর পর শতাব্দী নামাজের সময় ও কিবলা নির্ধারণে তা ব্যবহৃত হয়েছে।"
    }
  },
  {
    "y": 1453,
    "cat": "spread",
    "lat": 41.008,
    "lon": 28.98,
    "sc": "istanbul",
    "t": {
      "en": "The opening of Constantinople",
      "bn": "কনস্টান্টিনোপল বিজয়"
    },
    "p": {
      "en": "Qustantiniyyah",
      "bn": "কুস্তুনতুনিয়া"
    },
    "n": {
      "en": "Istanbul, Turkey",
      "bn": "ইস্তাম্বুল, তুরস্ক"
    },
    "d": {
      "en": "Rasulullah {SAW} had foretold: “Constantinople will surely be opened; how excellent its commander, how excellent that army.” After a 53-day siege — and moving ships overland on greased logs — the 21-year-old Sultan al-Fatih {RH} opened the city. He found the grave of Sayyiduna Abu Ayyub al-Ansari {RA} and built a masjid beside it.",
      "bn": "রাসূলুল্লাহ {SAW} ভবিষ্যদ্বাণী করেছিলেন: “নিশ্চয়ই কনস্টান্টিনোপল বিজয় হবে; কতই না উত্তম সেই সেনাপতি, কতই না উত্তম সেই বাহিনী।” ৫৩ দিনের অবরোধ শেষে — চর্বি মাখানো কাঠের ওপর দিয়ে জাহাজ স্থলপথে সরিয়ে — একুশ বছরের সুলতান আল-ফাতিহ {RH} শহর বিজয় করেন। উনি সাইয়্যিদুনা আবু আইয়ুব আনসারী {RA} উনার কবর শরীফ খুঁজে পেয়ে পাশে মসজিদ নির্মাণ করেন।"
    }
  },
  {
    "y": 1459,
    "cat": "bengal",
    "lat": 22.674,
    "lon": 89.742,
    "sc": "bengal",
    "t": {
      "en": "Hazrat Khan Jahan Ali {RH} and the Sixty-Dome Mosque",
      "bn": "হযরত খান জাহান আলি {RH} ও ষাট গম্বুজ মসজিদ"
    },
    "p": {
      "en": "Khalifatabad",
      "bn": "খলিফাতাবাদ"
    },
    "n": {
      "en": "Bagerhat, Bangladesh",
      "bn": "বাগেরহাট, বাংলাদেশ"
    },
    "d": {
      "en": "Hazrat Khan Jahan Ali {RH} cleared the Sundarbans forest, dug great ponds for clean water and built the city of Khalifatabad with its Shat Gombuj Masjid — today a UNESCO World Heritage Site. He passed away in 1459, and his shrine stands beside the Khanjali Dighi.",
      "bn": "হযরত খান জাহান আলি {RH} সুন্দরবনের জঙ্গল আবাদ করেন, বিশুদ্ধ পানির জন্য বিশাল দিঘি খনন করেন এবং ষাট গম্বুজ মসজিদসহ খলিফাতাবাদ নগরী গড়ে তোলেন — যা আজ ইউনেস্কো বিশ্ব ঐতিহ্য। ১৪৫৯ সালে উনি ইন্তেকাল করেন; খাঞ্জালি দিঘির পাশে উনার মাজার শরীফ।"
    }
  },
  {
    "y": 1492,
    "cat": "spread",
    "lat": 37.176,
    "lon": -3.588,
    "sc": "arches",
    "t": {
      "en": "The fall of Granada",
      "bn": "গ্রানাডার পতন"
    },
    "p": {
      "en": "Gharnatah, al-Andalus",
      "bn": "গারনাতা, আল-আন্দালুস"
    },
    "n": {
      "en": "Granada, Spain",
      "bn": "গ্রানাডা, স্পেন"
    },
    "d": {
      "en": "The last Muslim kingdom of al-Andalus surrendered after nearly 800 years. The Alhambra palace, its walls covered with “wa la ghaliba illallah — there is no victor but Allah”, still stands.",
      "bn": "প্রায় আটশো বছর পর আল-আন্দালুসের শেষ মুসলিম রাজ্য আত্মসমর্পণ করে। ‘ওয়া লা গালিবা ইল্লাল্লাহ — আল্লাহ ছাড়া কোনো বিজয়ী নেই’ খোদাই করা আলহামরা প্রাসাদ আজও দাঁড়িয়ে আছে।"
    }
  },
  {
    "y": 1494,
    "cat": "bengal",
    "lat": 24.87,
    "lon": 88.14,
    "sc": "bengal",
    "t": {
      "en": "Sultan Alauddin Husain Shah of Bengal",
      "bn": "বাংলার সুলতান আলাউদ্দিন হোসেন শাহ"
    },
    "p": {
      "en": "Gaur, Bangalah",
      "bn": "গৌড়, বাঙ্গালাহ"
    },
    "n": {
      "en": "Gaur, Bangladesh–India border",
      "bn": "গৌড়, বাংলাদেশ–ভারত সীমান্ত"
    },
    "d": {
      "en": "Under Husain Shah the Bengal Sultanate reached its golden age. Mosques such as the Chhoto Sona Masjid rose at Gaur, and the sultans encouraged writing in Bangla — helping the Bangla language grow into a literary language.",
      "bn": "হোসেন শাহের আমলে বাংলা সালতানাত স্বর্ণযুগে পৌঁছায়। গৌড়ে ছোট সোনা মসজিদসহ বহু মসজিদ নির্মিত হয়, আর সুলতানগণ বাংলা ভাষায় লেখালেখিতে পৃষ্ঠপোষকতা দেন — বাংলা সাহিত্যের ভাষা হয়ে ওঠার পথে যা বড় ভূমিকা রাখে।"
    }
  },
  {
    "y": 1517,
    "cat": "spread",
    "lat": 21.4225,
    "lon": 39.8262,
    "sc": "kaaba",
    "t": {
      "en": "Servants of the Two Holy Mosques",
      "bn": "হারামাইন শরীফাইনের খাদেম"
    },
    "p": {
      "en": "Makkah and Madinah",
      "bn": "মক্কা ও মদিনা"
    },
    "n": {
      "en": "Saudi Arabia",
      "bn": "সৌদি আরব"
    },
    "d": {
      "en": "After Egypt came under Ottoman rule, Sultan Selim took the title Khadim al-Haramayn al-Sharifayn. For four centuries the Ottomans cared for the pilgrims and the sacred mosques, building much of the old Masjid al-Haram's domed arcades.",
      "bn": "মিসর উসমানীয় শাসনে এলে সুলতান সেলিম ‘খাদিমুল হারামাইন আশ-শারিফাইন’ উপাধি গ্রহণ করেন। চার শতাব্দী উসমানীয়রা হাজিদের ও পবিত্র মসজিদদ্বয়ের খেদমত করেন; মসজিদুল হারামের পুরোনো গম্বুজওয়ালা বারান্দার অনেকটাই উনাদের নির্মিত।"
    }
  },
  {
    "y": 1517.6,
    "cat": "sultan",
    "lat": 41.0115,
    "lon": 28.9834,
    "sc": "scroll",
    "t": {
      "en": "The Sacred Trusts come to Istanbul",
      "bn": "পবিত্র আমানতসমূহ ইস্তাম্বুলে"
    },
    "p": {
      "en": "Topkapı, Istanbul",
      "bn": "তোপকাপি, ইস্তাম্বুল"
    },
    "n": {
      "en": "Topkapı Palace, Istanbul",
      "bn": "তোপকাপি প্রাসাদ, ইস্তাম্বুল"
    },
    "d": {
      "en": "With the custodianship of the Haramain, the blessed relics associated with Rasulullah {SAW} and His Companions {RAHUM} — among them the blessed mantle, sword and a hair of the blessed beard — were brought to Istanbul. The Ottomans kept them with great reverence, and the Qur'an has been recited beside them day and night ever since.",
      "bn": "হারামাইনের খেদমতের দায়িত্বের সাথে রাসূলুল্লাহ {SAW} ও উনার সাহাবায়ে কেরাম {RAHUM} উনাদের সাথে সম্পর্কিত বরকতময় আমানতসমূহ — যার মধ্যে চাদর মুবারক, তরবারি মুবারক ও দাড়ি মুবারক — ইস্তাম্বুলে আনা হয়। উসমানীয়রা গভীর আদবের সাথে সেগুলো সংরক্ষণ করেন, আর সেই থেকে দিনরাত সেখানে কুরআন তিলাওয়াত চলছে।"
    }
  },
  {
    "y": 1520,
    "cat": "sultan",
    "lat": 41.016,
    "lon": 28.96,
    "sc": "istanbul",
    "t": {
      "en": "Sultan Suleiman al-Qanuni {RH}",
      "bn": "সুলতান সুলাইমান আল-কানুনি {RH}"
    },
    "p": {
      "en": "Istanbul",
      "bn": "ইস্তাম্বুল"
    },
    "n": {
      "en": "Istanbul, Turkey",
      "bn": "ইস্তাম্বুল, তুরস্ক"
    },
    "d": {
      "en": "Called al-Qanuni, the Lawgiver, Sultan Suleiman {RH} ruled for 46 years with the help of the great scholar Shaykh al-Islam Abu al-Su'ud {RH}, bringing administrative law into harmony with the Hanafi fiqh. His reign was the height of Ottoman power.",
      "bn": "‘আল-কানুনি’ — আইনপ্রণেতা — নামে পরিচিত সুলতান সুলাইমান {RH} মহান আলেম শায়খুল ইসলাম আবুস সুউদ {RH} উনার সহায়তায় ৪৬ বছর শাসন করেন এবং প্রশাসনিক আইনকে হানাফি ফিকহের সাথে সামঞ্জস্যপূর্ণ করেন। উনার শাসনকাল উসমানীয় শক্তির শীর্ষবিন্দু।"
    }
  },
  {
    "y": 1526,
    "cat": "spread",
    "lat": 29.39,
    "lon": 76.97,
    "sc": "fort",
    "t": {
      "en": "The Mughal Empire",
      "bn": "মুঘল সাম্রাজ্য"
    },
    "p": {
      "en": "Panipat, Hindustan",
      "bn": "পানিপথ, হিন্দুস্তান"
    },
    "n": {
      "en": "Panipat, India",
      "bn": "পানিপথ, ভারত"
    },
    "d": {
      "en": "Babur founded the Mughal Empire after the first Battle of Panipat. For three centuries the Mughals ruled most of South Asia, leaving behind gardens, forts and masjids from Kabul to Dhaka.",
      "bn": "পানিপথের প্রথম যুদ্ধের পর বাবর মুঘল সাম্রাজ্য প্রতিষ্ঠা করেন। তিন শতাব্দী মুঘলরা দক্ষিণ এশিয়ার অধিকাংশ শাসন করেন; কাবুল থেকে ঢাকা পর্যন্ত রেখে যান বাগান, দুর্গ ও মসজিদ।"
    }
  },
  {
    "y": 1537,
    "cat": "build",
    "lat": 31.776,
    "lon": 35.232,
    "sc": "domerock",
    "t": {
      "en": "The walls and tiles of Bayt al-Maqdis",
      "bn": "বায়তুল মাকদিসের প্রাচীর ও টাইলস"
    },
    "p": {
      "en": "al-Quds",
      "bn": "আল-কুদস"
    },
    "n": {
      "en": "al-Quds (Jerusalem), Palestine",
      "bn": "আল-কুদস (জেরুজালেম), ফিলিস্তিন"
    },
    "d": {
      "en": "Sultan Suleiman {RH} rebuilt the walls of al-Quds — the walls that stand today — and covered the Dome of the Rock with the blue Iznik tiles and verses of the Qur'an that pilgrims still see.",
      "bn": "সুলতান সুলাইমান {RH} আল-কুদসের প্রাচীর পুনর্নির্মাণ করেন — আজও যে প্রাচীর দাঁড়িয়ে আছে — এবং কুব্বাতুস সাখরাকে নীল ইজনিক টাইলস ও কুরআনের আয়াতে সাজান, যা জিয়ারতকারীরা আজও দেখেন।"
    }
  },
  {
    "y": 1538,
    "cat": "sultan",
    "lat": 38.95,
    "lon": 20.75,
    "sc": "sea",
    "t": {
      "en": "Hayreddin Barbarossa {RH} at Preveza",
      "bn": "প্রেভেজায় খাইরুদ্দিন বারবারোসা {RH}"
    },
    "p": {
      "en": "Preveza, Ionian Sea",
      "bn": "প্রেভেজা, আয়োনিয়ান সাগর"
    },
    "n": {
      "en": "Preveza, Greece",
      "bn": "প্রেভেজা, গ্রিস"
    },
    "d": {
      "en": "Admiral Hayreddin Pasha {RH}, who had rescued thousands of Muslims fleeing al-Andalus by sea, defeated the combined fleets of Europe at Preveza. The Mediterranean became safe for Muslim lands for decades.",
      "bn": "সমুদ্রপথে আন্দালুস থেকে পালিয়ে আসা হাজারো মুসলমানকে উদ্ধারকারী নৌ-সেনাপতি খাইরুদ্দিন পাশা {RH} প্রেভেজায় ইউরোপের সম্মিলিত নৌবহরকে পরাজিত করেন। কয়েক দশকের জন্য ভূমধ্যসাগর মুসলিম ভূখণ্ডের জন্য নিরাপদ হয়।"
    }
  },
  {
    "y": 1540,
    "cat": "sultan",
    "lat": 25.55,
    "lon": 84.66,
    "sc": "journey",
    "t": {
      "en": "Sher Shah Suri {RH} and the Grand Trunk Road",
      "bn": "শের শাহ সুরি {RH} ও গ্র্যান্ড ট্রাংক রোড"
    },
    "p": {
      "en": "Sasaram, Bihar",
      "bn": "সাসারাম, বিহার"
    },
    "n": {
      "en": "Bihar, India",
      "bn": "বিহার, ভারত"
    },
    "d": {
      "en": "In five years of rule Sher Shah {RH} rebuilt the great road from Sonargaon in Bengal to Peshawar, with shaded trees, wells, inns and a masjid at every stage for travellers. He also introduced the silver rupee.",
      "bn": "মাত্র পাঁচ বছরের শাসনে শের শাহ {RH} বাংলার সোনারগাঁও থেকে পেশোয়ার পর্যন্ত মহাসড়ক পুনর্নির্মাণ করেন — পথিকদের জন্য প্রতিটি মঞ্জিলে ছায়াদার গাছ, কূপ, সরাইখানা ও মসজিদ। উনি রুপার ‘রুপিয়া’ মুদ্রাও চালু করেন।"
    }
  },
  {
    "y": 1557,
    "cat": "build",
    "lat": 41.016,
    "lon": 28.964,
    "sc": "istanbul",
    "t": {
      "en": "The Süleymaniye Mosque",
      "bn": "সুলাইমানিয়া মসজিদ"
    },
    "p": {
      "en": "Istanbul",
      "bn": "ইস্তাম্বুল"
    },
    "n": {
      "en": "Istanbul, Turkey",
      "bn": "ইস্তাম্বুল, তুরস্ক"
    },
    "d": {
      "en": "The architect Mimar Sinan completed the Süleymaniye on Istanbul's highest hill, with a school, hospital, kitchen for the poor and library around it. The soot from its lamps was channelled to one room and used to make ink.",
      "bn": "স্থপতি মিমার সিনান ইস্তাম্বুলের সবচেয়ে উঁচু পাহাড়ে সুলাইমানিয়া মসজিদ নির্মাণ সম্পন্ন করেন; চারপাশে মাদরাসা, হাসপাতাল, গরিবদের রান্নাঘর ও গ্রন্থাগার। এর বাতিগুলোর ধোঁয়া একটি কক্ষে জমিয়ে কালি বানানো হতো।"
    }
  },
  {
    "y": 1564,
    "ah": 971,
    "cat": "awliya",
    "lat": 30.64,
    "lon": 76.39,
    "sc": "lamp",
    "t": {
      "en": "Birth of Mujaddid Alf Thani Shaykh Ahmad Sirhindi {RH}",
      "bn": "মুজাদ্দিদে আলফে সানি শায়খ আহমদ সিরহিন্দি {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Sirhind, Punjab",
      "bn": "সিরহিন্দ, পাঞ্জাব"
    },
    "n": {
      "en": "Punjab, India",
      "bn": "পাঞ্জাব, ভারত"
    },
    "d": {
      "en": "Born in 971 AH, Shaykh Ahmad Sirhindi {RH} grew up to renew the religion at the start of the second Islamic millennium, calling rulers and people back to the Shari'ah and the Sunnat of Rasulullah {SAW}.",
      "bn": "৯৭১ হিজরিতে শায়খ আহমদ সিরহিন্দি {RH} উনার বিলাদত হয়; বড় হয়ে উনি ইসলামের দ্বিতীয় সহস্রাব্দের শুরুতে দ্বীনের সংস্কার করেন, শাসক ও জনগণকে শরিয়ত ও রাসূলুল্লাহ {SAW} উনার সুন্নাতের দিকে ফিরিয়ে আনেন।"
    }
  },
  {
    "y": 1608,
    "cat": "bengal",
    "lat": 23.72,
    "lon": 90.4,
    "sc": "river",
    "t": {
      "en": "Dhaka becomes the capital of Bengal",
      "bn": "ঢাকা বাংলার রাজধানী"
    },
    "p": {
      "en": "Jahangirnagar",
      "bn": "জাহাঙ্গীরনগর"
    },
    "n": {
      "en": "Dhaka, Bangladesh",
      "bn": "ঢাকা, বাংলাদেশ"
    },
    "d": {
      "en": "Subahdar Islam Khan Chishti made Dhaka the Mughal capital of Bengal, naming it Jahangirnagar. Its muslin, rivers and masjids made it famous across the world.",
      "bn": "সুবাদার ইসলাম খান চিশতি ঢাকাকে বাংলার মুঘল রাজধানী করেন এবং নাম দেন জাহাঙ্গীরনগর। মসলিন, নদী আর মসজিদের জন্য ঢাকা বিশ্বজুড়ে খ্যাতি পায়।"
    }
  },
  {
    "y": 1609,
    "cat": "build",
    "lat": 41.0054,
    "lon": 28.9768,
    "sc": "istanbul",
    "t": {
      "en": "The Sultan Ahmed (Blue) Mosque",
      "bn": "সুলতান আহমদ (নীল) মসজিদ"
    },
    "p": {
      "en": "Istanbul",
      "bn": "ইস্তাম্বুল"
    },
    "n": {
      "en": "Istanbul, Turkey",
      "bn": "ইস্তাম্বুল, তুরস্ক"
    },
    "d": {
      "en": "Young Sultan Ahmed {RH} began a mosque with six minarets beside the Hippodrome; it is said he carried earth for its foundation himself. Its 20,000 blue tiles gave it the name the Blue Mosque.",
      "bn": "তরুণ সুলতান আহমদ {RH} হিপোড্রোমের পাশে ছয় মিনারবিশিষ্ট মসজিদের কাজ শুরু করেন; বর্ণিত আছে, উনি নিজেই ভিত্তির মাটি বহন করেছিলেন। বিশ হাজার নীল টাইলসের জন্য এর নাম হয় ‘নীল মসজিদ’।"
    }
  },
  {
    "y": 1624,
    "cat": "knowledge",
    "lat": 30.64,
    "lon": 76.39,
    "sc": "lamp",
    "t": {
      "en": "Mujaddid Alf Thani {RH}",
      "bn": "মুজাদ্দিদে আলফে সানি {RH}"
    },
    "p": {
      "en": "Sirhind, Punjab",
      "bn": "সিরহিন্দ, পাঞ্জাব"
    },
    "n": {
      "en": "Sirhind, India",
      "bn": "সিরহিন্দ, ভারত"
    },
    "d": {
      "en": "Shaykh Ahmad Sirhindi {RH}, the Renewer of the Second Millennium, stood firm for the Sunnat at the Mughal court. His letters, the Maktubat, revived adherence to the Shari'ah across South Asia. He passed away in 1624.",
      "bn": "দ্বিতীয় সহস্রাব্দের মুজাদ্দিদ শায়খ আহমদ সিরহিন্দি {RH} মুঘল দরবারে সুন্নাতের পক্ষে দৃঢ় অবস্থান নেন। উনার পত্রসংকলন ‘মাকতুবাত শরীফ’ দক্ষিণ এশিয়াজুড়ে শরিয়ত ও সুন্নাতের অনুসরণ পুনর্জীবিত করে। ১৬২৪ সালে উনি ইন্তেকাল করেন।"
    }
  },
  {
    "y": 1642,
    "cat": "knowledge",
    "lat": 41.02,
    "lon": 28.95,
    "sc": "quran",
    "t": {
      "en": "Birth of Hafiz Osman {RH}, calligrapher of the Mushaf",
      "bn": "মুসহাফের ক্যালিগ্রাফার হাফিজ উসমান {RH} উনার জন্ম"
    },
    "p": {
      "en": "Istanbul",
      "bn": "ইস্তাম্বুল"
    },
    "n": {
      "en": "Istanbul, Turkey",
      "bn": "ইস্তাম্বুল, তুরস্ক"
    },
    "d": {
      "en": "Hafiz Osman {RH} perfected the naskh script and copied the Qur'an by hand 25 times. His clear, balanced style became the model for printed mushafs across the Muslim world — and for the Qur'an many of us read today.",
      "bn": "হাফিজ উসমান {RH} নসখ লিপিকে পূর্ণতা দেন এবং নিজ হাতে ২৫ বার কুরআন শরীফ লেখেন। উনার স্পষ্ট ও সুষম লিপি মুসলিম বিশ্বে মুদ্রিত মুসহাফের আদর্শ হয়ে ওঠে — আজ আমরা অনেকে যে কুরআন পড়ি, তারও।"
    }
  },
  {
    "y": 1653,
    "cat": "build",
    "lat": 27.175,
    "lon": 78.042,
    "sc": "taj",
    "t": {
      "en": "The Taj Mahal",
      "bn": "তাজমহল"
    },
    "p": {
      "en": "Agra",
      "bn": "আগ্রা"
    },
    "n": {
      "en": "Agra, India",
      "bn": "আগ্রা, ভারত"
    },
    "d": {
      "en": "Built over two decades by twenty thousand craftsmen, the Taj Mahal is covered in Qur'anic calligraphy — including the whole of Surah Yasin — and inlaid flowers of precious stone.",
      "bn": "বিশ হাজার কারিগরের দুই দশকের পরিশ্রমে নির্মিত তাজমহল কুরআনের ক্যালিগ্রাফিতে সজ্জিত — পুরো সূরা ইয়াসিনসহ — আর মূল্যবান পাথরে খচিত ফুলের নকশায়।"
    }
  },
  {
    "y": 1678,
    "cat": "bengal",
    "lat": 23.719,
    "lon": 90.388,
    "sc": "fort",
    "t": {
      "en": "Lalbagh Fort, Dhaka",
      "bn": "লালবাগ কেল্লা, ঢাকা"
    },
    "p": {
      "en": "Jahangirnagar",
      "bn": "জাহাঙ্গীরনগর"
    },
    "n": {
      "en": "Old Dhaka, Bangladesh",
      "bn": "পুরান ঢাকা, বাংলাদেশ"
    },
    "d": {
      "en": "Prince Azam began Fort Aurangabad, known today as Lalbagh Fort, with its three-domed masjid. Around the same time Dhaka's Sat Gambuj Masjid and other masjids rose beside the Buriganga.",
      "bn": "শাহজাদা আজম ‘কেল্লা আওরঙ্গাবাদ’ নির্মাণ শুরু করেন — আজকের লালবাগ কেল্লা, যার ভেতরে তিন গম্বুজ মসজিদ। একই সময়ে বুড়িগঙ্গার তীরে ঢাকার সাত গম্বুজ মসজিদসহ আরও মসজিদ গড়ে ওঠে।"
    }
  },
  {
    "y": 1683,
    "cat": "sultan",
    "lat": 48.21,
    "lon": 16.37,
    "sc": "banners",
    "t": {
      "en": "The second siege of Vienna",
      "bn": "ভিয়েনার দ্বিতীয় অবরোধ"
    },
    "p": {
      "en": "Vienna",
      "bn": "ভিয়েনা"
    },
    "n": {
      "en": "Vienna, Austria",
      "bn": "ভিয়েনা, অস্ট্রিয়া"
    },
    "d": {
      "en": "The Ottoman army besieged Vienna for two months but was driven back by a European alliance. It marked the furthest Ottoman advance into Europe, and the slow decline of the empire began.",
      "bn": "উসমানীয় বাহিনী দুই মাস ভিয়েনা অবরোধ করে, কিন্তু ইউরোপীয় জোটের কাছে পিছু হটে। এটি ইউরোপে উসমানীয়দের সর্বোচ্চ অগ্রযাত্রার সীমা; এরপর সাম্রাজ্যের ধীর পতন শুরু হয়।"
    }
  },
  {
    "y": 1703,
    "cat": "awliya",
    "lat": 28.65,
    "lon": 77.23,
    "sc": "books",
    "t": {
      "en": "Birth of Shah Waliullah Muhaddith Dehlawi {RH}",
      "bn": "শাহ ওয়ালিউল্লাহ মুহাদ্দিসে দেহলভি {RH} উনার বিলাদত"
    },
    "p": {
      "en": "Delhi",
      "bn": "দিল্লি"
    },
    "n": {
      "en": "Delhi, India",
      "bn": "দিল্লি, ভারত"
    },
    "d": {
      "en": "Shah Waliullah {RH} translated the Qur'an into Persian so ordinary people could understand it, revived the teaching of hadith in South Asia and wrote Hujjatullah al-Balighah. His sons and students carried this work across the subcontinent, including Bengal.",
      "bn": "শাহ ওয়ালিউল্লাহ {RH} সাধারণ মানুষ যেন বুঝতে পারে সেজন্য কুরআন শরীফ ফারসিতে অনুবাদ করেন, দক্ষিণ এশিয়ায় হাদিসের দরস পুনর্জীবিত করেন এবং ‘হুজ্জাতুল্লাহিল বালিগা’ রচনা করেন। উনার সন্তান ও ছাত্ররা বাংলাসহ গোটা উপমহাদেশে এই খেদমত ছড়িয়ে দেন।"
    }
  },
  {
    "y": 1707,
    "cat": "knowledge",
    "lat": 19.88,
    "lon": 75.32,
    "sc": "books",
    "t": {
      "en": "Fatawa Alamgiri",
      "bn": "ফাতাওয়ায়ে আলমগীরি"
    },
    "p": {
      "en": "Aurangabad, Deccan",
      "bn": "আওরঙ্গাবাদ, দাক্ষিণাত্য"
    },
    "n": {
      "en": "Aurangabad, India",
      "bn": "আওরঙ্গাবাদ, ভারত"
    },
    "d": {
      "en": "Emperor Aurangzeb Alamgir {RH}, who earned his own living by copying the Qur'an and sewing caps, gathered five hundred scholars to compile Fatawa Alamgiri, a great reference of Hanafi fiqh still used today. He passed away in 1707.",
      "bn": "সম্রাট আওরঙ্গজেব আলমগীর {RH} — যিনি কুরআন শরীফ কপি করে ও টুপি সেলাই করে নিজের জীবিকা উপার্জন করতেন — পাঁচশো আলেমকে একত্র করে সংকলন করান ‘ফাতাওয়ায়ে আলমগীরি’, হানাফি ফিকহের মহাগ্রন্থ, যা আজও ব্যবহৃত হয়। ১৭০৭ সালে উনি ইন্তেকাল করেন।"
    }
  },
  {
    "y": 1757,
    "cat": "bengal",
    "lat": 23.8,
    "lon": 88.25,
    "sc": "river",
    "t": {
      "en": "Plassey",
      "bn": "পলাশী"
    },
    "p": {
      "en": "Palashi, Bengal",
      "bn": "পলাশী, বাংলা"
    },
    "n": {
      "en": "Nadia, West Bengal",
      "bn": "নদীয়া, পশ্চিমবঙ্গ"
    },
    "d": {
      "en": "Betrayed by Mir Jafar, Nawab Siraj ud-Daulah lost the Battle of Plassey to the East India Company. Bengal's independence ended, and nearly two centuries of colonial rule began.",
      "bn": "মীর জাফরের বিশ্বাসঘাতকতায় নবাব সিরাজউদ্দৌলা ইস্ট ইন্ডিয়া কোম্পানির কাছে পলাশীর যুদ্ধে পরাজিত হন। বাংলার স্বাধীনতার সূর্য অস্ত যায়, শুরু হয় প্রায় দুইশো বছরের ঔপনিবেশিক শাসন।"
    }
  },
  {
    "y": 1818,
    "cat": "bengal",
    "lat": 23.6,
    "lon": 89.84,
    "sc": "bengal",
    "t": {
      "en": "Haji Shariatullah {RH} and the Fara'idi movement",
      "bn": "হাজী শরীয়তুল্লাহ {RH} ও ফরায়েজি আন্দোলন"
    },
    "p": {
      "en": "Faridpur, Bengal",
      "bn": "ফরিদপুর, বাংলা"
    },
    "n": {
      "en": "Madaripur, Bangladesh",
      "bn": "মাদারীপুর, বাংলাদেশ"
    },
    "d": {
      "en": "Returning after twenty years of study in Makkah, Haji Shariatullah {RH} called the farmers of Bengal back to the fara'id — the obligatory duties of Islam — and away from innovations, and stood with them against oppressive landlords.",
      "bn": "মক্কা শরীফে বিশ বছর ইলম অর্জনের পর ফিরে এসে হাজী শরীয়তুল্লাহ {RH} বাংলার কৃষকদের ফরজ ইবাদতের দিকে ফিরিয়ে আনেন, বিদআত থেকে দূরে থাকতে বলেন, এবং অত্যাচারী জমিদারদের বিরুদ্ধে উনাদের পাশে দাঁড়ান।"
    }
  },
  {
    "y": 1831,
    "cat": "bengal",
    "lat": 22.86,
    "lon": 88.75,
    "sc": "bengal",
    "t": {
      "en": "Titumir {RH} and the bamboo fort",
      "bn": "শহীদ তিতুমীর {RH} ও বাঁশের কেল্লা"
    },
    "p": {
      "en": "Narkelberia, Bengal",
      "bn": "নারকেলবাড়িয়া, বাংলা"
    },
    "n": {
      "en": "North 24 Parganas, West Bengal",
      "bn": "উত্তর ২৪ পরগনা, পশ্চিমবঙ্গ"
    },
    "d": {
      "en": "Sayyid Nisar Ali Titumir {RH} built a fort of bamboo to defend the poor peasants against tax on beards and the oppression of landlords and the British. He was martyred there in 1831 and is remembered as a hero of Bengal.",
      "bn": "সাইয়্যিদ নিসার আলি তিতুমীর {RH} দাড়ির ওপর কর ও জমিদার-ইংরেজদের অত্যাচার থেকে গরিব কৃষকদের রক্ষায় বাঁশের কেল্লা নির্মাণ করেন। ১৮৩১ সালে সেখানেই উনি শাহাদাত বরণ করেন; বাংলার বীর হিসেবে উনি স্মরণীয়।"
    }
  },
  {
    "y": 1876,
    "cat": "sultan",
    "lat": 41.043,
    "lon": 29,
    "sc": "istanbul",
    "t": {
      "en": "Sultan Abdulhamid II {RH}",
      "bn": "সুলতান দ্বিতীয় আবদুল হামিদ {RH}"
    },
    "p": {
      "en": "Istanbul",
      "bn": "ইস্তাম্বুল"
    },
    "n": {
      "en": "Istanbul, Turkey",
      "bn": "ইস্তাম্বুল, তুরস্ক"
    },
    "d": {
      "en": "Sultan Abdulhamid II {RH} ruled through the empire's hardest years, calling Muslims everywhere to unity under the caliphate. He refused to sell any land of Palestine, saying the land belonged to the ummah, not to him.",
      "bn": "সাম্রাজ্যের কঠিনতম সময়ে সুলতান দ্বিতীয় আবদুল হামিদ {RH} শাসন করেন এবং খিলাফতের অধীনে সর্বত্র মুসলমানদের ঐক্যের আহ্বান জানান। উনি ফিলিস্তিনের এক টুকরো জমিও বিক্রি করতে অস্বীকার করেন — বলেন, এ ভূমি উম্মাহর, উনার নয়।"
    }
  },
  {
    "y": 1908,
    "cat": "build",
    "lat": 24.47,
    "lon": 39.6,
    "sc": "journey",
    "t": {
      "en": "The Hejaz Railway reaches Madinah",
      "bn": "হেজাজ রেলপথ মদিনায় পৌঁছায়"
    },
    "p": {
      "en": "Dimashq → al-Madinah",
      "bn": "দিমাশক → মদিনা"
    },
    "n": {
      "en": "Syria – Jordan – Saudi Arabia",
      "bn": "সিরিয়া – জর্ডান – সৌদি আরব"
    },
    "d": {
      "en": "Built with donations from Muslims around the world — including from Bengal — the Hejaz Railway cut the pilgrims' journey from Damascus to Madinah from forty days to a few. Out of respect, the engines are said to have slowed and gone quiet as they approached the city of Rasulullah {SAW}.",
      "bn": "বাংলাসহ সারা বিশ্বের মুসলমানদের দানে নির্মিত হেজাজ রেলপথ দামেস্ক থেকে মদিনার হজযাত্রা চল্লিশ দিন থেকে কয়েক দিনে নামিয়ে আনে। বর্ণিত আছে, আদবের কারণে রাসূলুল্লাহ {SAW} উনার শহরের কাছে পৌঁছালে ইঞ্জিনের গতি ও শব্দ কমিয়ে দেওয়া হতো।"
    }
  },
  {
    "y": 1924,
    "cat": "spread",
    "lat": 41.008,
    "lon": 28.98,
    "sc": "istanbul",
    "t": {
      "en": "The end of the Caliphate",
      "bn": "খিলাফতের অবসান"
    },
    "p": {
      "en": "Istanbul",
      "bn": "ইস্তাম্বুল"
    },
    "n": {
      "en": "Istanbul, Turkey",
      "bn": "ইস্তাম্বুল, তুরস্ক"
    },
    "d": {
      "en": "In March 1924 the new Turkish Republic abolished the Ottoman caliphate. In Bengal and across India, Muslims had raised funds for its defence in the Khilafat Movement.",
      "bn": "১৯২৪ সালের মার্চে নতুন তুর্কি প্রজাতন্ত্র উসমানীয় খিলাফত বিলুপ্ত করে। খিলাফত আন্দোলনে বাংলাসহ সমগ্র ভারতের মুসলমানরা এর রক্ষায় অর্থ সংগ্রহ করেছিলেন।"
    }
  },
  {
    "y": 1955,
    "cat": "build",
    "lat": 24.4672,
    "lon": 39.6112,
    "sc": "mosque",
    "t": {
      "en": "The great expansions of the Haramain",
      "bn": "হারামাইন শরীফাইনের মহা সম্প্রসারণ"
    },
    "p": {
      "en": "Makkah and Madinah",
      "bn": "মক্কা ও মদিনা"
    },
    "n": {
      "en": "Saudi Arabia",
      "bn": "সৌদি আরব"
    },
    "d": {
      "en": "From the 1950s the Two Holy Mosques were expanded again and again. Today Masjid al-Nabawi alone can hold over a million worshippers, and its shaded courtyards open giant umbrellas against the sun.",
      "bn": "১৯৫০-এর দশক থেকে পবিত্র মসজিদদ্বয় বারবার সম্প্রসারিত হয়। আজ শুধু মসজিদে নববিতেই দশ লক্ষাধিক মুসল্লি নামাজ আদায় করতে পারেন, আর উঠানে রোদের বিপরীতে খুলে যায় বিশাল ছাতা।"
    }
  },
  {
    "y": 1968,
    "cat": "bengal",
    "lat": 23.729,
    "lon": 90.412,
    "sc": "modernmosque",
    "t": {
      "en": "Baitul Mukarram, Dhaka",
      "bn": "বায়তুল মোকাররম, ঢাকা"
    },
    "p": {
      "en": "Dhaka",
      "bn": "ঢাকা"
    },
    "n": {
      "en": "Dhaka, Bangladesh",
      "bn": "ঢাকা, বাংলাদেশ"
    },
    "d": {
      "en": "The national mosque of Bangladesh, shaped like the Ka'bah in a simple cube, was completed in the 1960s and can hold about forty thousand worshippers.",
      "bn": "কাবা শরীফের আদলে সাধারণ ঘনকাকৃতির বাংলাদেশের জাতীয় মসজিদ বায়তুল মোকাররম ১৯৬০-এর দশকে সম্পন্ন হয়; এখানে প্রায় চল্লিশ হাজার মুসল্লি নামাজ পড়তে পারেন।"
    }
  },
  {
    "y": 2026,
    "cat": "spread",
    "lat": 21.4225,
    "lon": 39.8262,
    "sc": "clock",
    "t": {
      "en": "Today: one Qiblah, two billion hearts",
      "bn": "আজ: এক কিবলা, দুইশো কোটি হৃদয়"
    },
    "p": {
      "en": "Makkah al-Mukarramah",
      "bn": "মক্কা মুকাররমা"
    },
    "n": {
      "en": "Makkah, Saudi Arabia",
      "bn": "মক্কা, সৌদি আরব"
    },
    "d": {
      "en": "Nearly two billion Muslims in every country of the world face the same Ka'bah in prayer. Bangladesh, with around 150 million Muslims, is among the largest Muslim nations. The Sunnat of Rasulullah {SAW} lives on in every home that follows it.",
      "bn": "পৃথিবীর প্রতিটি দেশে প্রায় দুইশো কোটি মুসলমান নামাজে একই কাবা শরীফের দিকে মুখ ফেরান। প্রায় পনেরো কোটি মুসলমানের দেশ বাংলাদেশ বিশ্বের বৃহত্তম মুসলিম দেশগুলোর একটি। যে ঘরে সুন্নাত পালিত হয়, সেখানে রাসূলুল্লাহ {SAW} উনার সুন্নাত আজও জীবন্ত।"
    },
    "l": {
      "en": "The story continues with us — in every sunnat we revive.",
      "bn": "গল্প চলছে আমাদের মাধ্যমে — প্রতিটি সুন্নাত জীবিত করার মধ্য দিয়ে।"
    }
  }
];

export const ISLAMIC_HISTORY_ROUTES: Record<string, [number, number][]> = {
  "sham": [
    [
      39.83,
      21.42
    ],
    [
      39.6,
      24.5
    ],
    [
      38.5,
      27.6
    ],
    [
      36.9,
      30.2
    ],
    [
      36.48,
      32.52
    ]
  ],
  "abyssinia": [
    [
      39.83,
      21.42
    ],
    [
      39.15,
      20.9
    ],
    [
      39.6,
      15.6
    ],
    [
      38.72,
      14.13
    ]
  ],
  "taif": [
    [
      39.83,
      21.42
    ],
    [
      40.1,
      21.38
    ],
    [
      40.42,
      21.27
    ]
  ],
  "isra": [
    [
      39.83,
      21.42
    ],
    [
      37.4,
      26.6
    ],
    [
      35.24,
      31.78
    ]
  ],
  "hijrah": [
    [
      39.83,
      21.42
    ],
    [
      39.85,
      21.377
    ],
    [
      39.2,
      21.9
    ],
    [
      38.95,
      23
    ],
    [
      39.2,
      24
    ],
    [
      39.617,
      24.439
    ],
    [
      39.611,
      24.467
    ]
  ],
  "tabuk": [
    [
      39.61,
      24.47
    ],
    [
      38.8,
      25.6
    ],
    [
      37.6,
      27.2
    ],
    [
      36.57,
      28.38
    ]
  ],
  "tariq": [
    [
      -5.32,
      35.89
    ],
    [
      -5.35,
      36.14
    ],
    [
      -5.9,
      36.6
    ],
    [
      -4.78,
      37.88
    ],
    [
      -3.7,
      40.4
    ]
  ],
  "qasim": [
    [
      52.5,
      29.6
    ],
    [
      58,
      26.5
    ],
    [
      62.5,
      25.4
    ],
    [
      67.52,
      24.75
    ],
    [
      68.4,
      25.4
    ],
    [
      71.47,
      30.2
    ]
  ],
  "musa": [
    [
      -3,
      16.77
    ],
    [
      2,
      18.8
    ],
    [
      10,
      24.5
    ],
    [
      20,
      27.5
    ],
    [
      31.23,
      30.04
    ],
    [
      33.8,
      27.5
    ],
    [
      39.83,
      21.42
    ]
  ],
  "battuta": [
    [
      -5.8,
      35.77
    ],
    [
      3,
      36.7
    ],
    [
      10.2,
      36.8
    ],
    [
      29.9,
      31.2
    ],
    [
      31.23,
      30.04
    ],
    [
      36.3,
      33.5
    ],
    [
      39.6,
      24.47
    ],
    [
      39.83,
      21.42
    ],
    [
      44.36,
      33.31
    ],
    [
      51.4,
      35.7
    ],
    [
      69.2,
      34.5
    ],
    [
      77.2,
      28.6
    ],
    [
      88.1,
      24.9
    ],
    [
      91.87,
      24.9
    ],
    [
      90.6,
      23.65
    ]
  ]
};

export const CATEGORY_INFO: Record<HistoryEvent['cat'], { labelBn: string; labelEn: string; color: string; icon: string }> = {
  seerah: { labelBn: 'সীরাত', labelEn: 'Seerah', color: '#f59e0b', icon: '🟡' },
  battle: { labelBn: 'জিহাদ ও অভিযান', labelEn: 'Battles', color: '#ef4444', icon: '🔴' },
  spread: { labelBn: 'ইসলামের প্রসার', labelEn: 'Spread of Islam', color: '#3b82f6', icon: '🔵' },
  knowledge: { labelBn: 'ইলম ও সুন্নাহ', labelEn: 'Knowledge', color: '#06b6d4', icon: '🔷' },
  build: { labelBn: 'নগর ও স্থাপত্য', labelEn: 'Architecture', color: '#10b981', icon: '🟢' },
  bengal: { labelBn: 'বাংলায় ইসলাম', labelEn: 'Islam in Bengal', color: '#ec4899', icon: '💗' },
  awliya: { labelBn: 'আউলিয়া ও সুফি', labelEn: 'Saints & Sufis', color: '#a855f7', icon: '🟣' },
  sultan: { labelBn: 'সালতানাত ও সাম্রাজ্য', labelEn: 'Sultanates', color: '#d97706', icon: '🟤' },
};
