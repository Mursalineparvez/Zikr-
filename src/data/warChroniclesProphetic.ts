import { WarChronicleBundle, buildWarBundle } from './warChroniclesTypes';

export const PROPHETIC_WAR_CHRONICLES: Record<string, WarChronicleBundle> = {
  // =========================================================================
  // ২. উহুদ যুদ্ধ — ৭ পর্বে ২১টি প্রামাণ্য ঘটনা
  // =========================================================================
  uhud: buildWarBundle({
    warId: 'uhud',
    datePlaceBn: '৩য় হিজরির শাওয়াল · উহুদ পাহাড়ের পাদদেশ, মদিনা',
    datePlaceEn: 'Shawwal 3 AH · Foot of Mount Uhud, Madinah',
    battleShortBn: 'উহুদ যুদ্ধ',
    battleShortEn: 'Battle of Uhud',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'প্রতিশোধের প্রেক্ষাপট',
        titleEn: 'Background of Revenge',
        events: [
          {
            titleBn: 'কুরাইশের প্রতিশোধের শপথ',
            titleEn: 'Quraysh Swears Vengeance',
            subtitleBn: 'বদরের পরাজয়ের পর মক্কার অস্থিরতা',
            subtitleEn: 'Makkah’s Mobilization After Badr',
            pointsBn: [
              'বদরে ৭০ জন নেতা নিহত হওয়ার পর কুরাইশ আবু সুফিয়ানের কাফেলার সম্পূর্ণ মুনাফা যুদ্ধের তহবিলে জমা রাখে।',
              'কুরাইশ নেতা ইকরিমা, সাফওয়ান ও আবু সুফিয়ান বদরের প্রতিশোধ নিতে বিশাল বাহিনী গঠনের সিদ্ধান্ত নেয়।',
            ],
            pointsEn: [
              'After losing 70 leaders at Badr, Quraysh dedicated the entire profit of Abu Sufyan’s caravan to fund a revenge campaign.',
              'Leaders including Ikrimah, Safwan, and Abu Sufyan mobilized a massive army against Madinah.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম, খণ্ড ৩; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham, Vol. 3; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: '৩,০০০ সশস্ত্র কুরাইশ বাহিনীর যাত্রা',
            titleEn: 'March of 3,000 Armed Quraysh Warriors',
            pointsBn: [
              'আবু সুফিয়ানের নেতৃত্বে ৩,০০০ সৈন্য, ২০০ ঘোড়া, ৭০০ বর্মধারী ও ৩,০০০ উট নিয়ে কুরাইশ মদিনার দিকে রওনা হয়।',
              'সেনাদের উত্তেজিত রাখতে হিন্দা বিনতে উতবাসহ ১৫ জন নারী দফ বাজিয়ে বদরের শোকগাথা গাইতে থাকে।',
            ],
            pointsEn: [
              'Led by Abu Sufyan, 3,000 warriors with 200 horses, 700 armored men, and 3,000 camels marched toward Madinah.',
              'Fifteen women led by Hind bint Utbah accompanied them, beating drums and reciting elegies to incite the troops.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আর-রাহীকুল মাখতূম',
            sourceEn: 'Sirah Ibn Hisham; Ar-Raheeq al-Makhtum',
          },
          {
            titleBn: 'আব্বাস (রা.)-এর গোপন চিঠি',
            titleEn: 'The Secret Letter of al-Abbas (RA)',
            pointsBn: [
              'নবীজি (সা.)-এর চাচা আব্বাস (রা.) মক্কা থেকে দ্রুতগামী দূতের মাধ্যমে কুরাইশ বাহিনীর পূর্ণ বিবরণ জানিয়ে চিঠি পাঠান।',
              'দূত মাত্র তিন দিনে মদিনায় পৌঁছে কুবায় নবীজি (সা.)-এর হাতে চিঠি দেয়; উবাই ইবনে কাব (রা.) তা পড়ে শোনান।',
            ],
            pointsEn: [
              'The Prophet’s uncle al-Abbas (RA) dispatched an urgent letter from Makkah detailing Quraysh’s full army strength.',
              'The courier reached Madinah in three days; Ubayy ibn Ka‘b (RA) read the letter aloud to the Prophet (PBUH).',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; তারীখে তাবারী',
            sourceEn: 'Sirah Ibn Hisham; Tarikh al-Tabari',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'পরামর্শ সভা ও যাত্রা',
        titleEn: 'War Council & Departure',
        events: [
          {
            titleBn: 'নবীজি (সা.)-এর স্বপ্ন ও পরামর্শ সভা',
            titleEn: 'The Prophet’s Dream & Consultation',
            pointsBn: [
              'নবীজি (সা.) স্বপ্নে দেখেন, তাঁর তলোয়ারের অগ্রভাগ কিছুটা ভেঙেছে, গরু জবাই হচ্ছে এবং তিনি সুরক্ষিত বর্মে হাত ঢুকিয়েছেন।',
              'তিনি মদিনার ভেতরে থেকে প্রতিরক্ষার মত দিলেও বদরে অংশ নিতে না পারা তরুণ সাহাবিদের আগ্রহে বাইরে গিয়ে লড়ার সিদ্ধান্ত নেন।',
            ],
            pointsEn: [
              'The Prophet (PBUH) dreamed of a notch in his sword, cows being slaughtered, and inserting his hand into an impenetrable armor.',
              'Though he preferred defending from inside Madinah, he respected the ardent counsel of young companions eager to fight in the open field.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪০৮১; সহীহ মুসলিম, হাদিস নং ২২৭২',
            sourceEn: 'Sahih al-Bukhari, Hadith 4081; Sahih Muslim, Hadith 2272',
          },
          {
            titleBn: '‘নবীর জন্য বর্ম খোলা শোভা পায় না’',
            titleEn: '“A Prophet Does Not Remove His Armor”',
            pointsBn: [
              'তরুণ সাহাবিরা পরে অনুতপ্ত হয়ে বললেন, আমরা আপনাকে বাধ্য করেছি; চাইলে আপনি মদিনাতেই থাকুন।',
              'নবীজি (সা.) দৃঢ় কণ্ঠে বললেন: কোনো নবী যুদ্ধের বর্ম পরলে আল্লাহ ফয়সালা না করা পর্যন্ত তা খোলা তাঁর জন্য শোভনীয় নয়।',
            ],
            pointsEn: [
              'Regretting their insistence, the companions offered to stay in Madinah if the Prophet (PBUH) preferred.',
              'He declared firmly: “It does not befit a Prophet who has put on his armor to remove it until Allah decides between him and his enemy.”',
            ],
            sourceBn: 'মুসনাদে আহমদ; সীরাতে ইবনে হিশাম',
            sourceEn: 'Musnad Ahmad; Sirah Ibn Hisham',
          },
          {
            titleBn: 'মুনাফিক ইবনে উবাইয়ের ৩০০ সৈন্য নিয়ে পলায়ন',
            titleEn: 'Hypocrite Ibn Ubayy’s Desertion with 300 Men',
            pointsBn: [
              '১,০০০ মুসলিম নিয়ে যাত্রা করার পর মাঝপথে মুনাফিক নেতা আব্দুল্লাহ ইবনে উবাই ৩০০ অনুসারী নিয়ে ফিরে যায়।',
              'এতে মুসলিম সৈন্য নেমে আসে মাত্র ৭০০ জনে; আব্দুল্লাহ ইবনে হারাম (রা.) তাদের ফেরানোর চেষ্টা করেও ব্যর্থ হন।',
            ],
            pointsEn: [
              'Midway to Uhud, hypocrite leader Abdullah ibn Ubayy deserted with 300 followers, leaving only 700 Muslims.',
              'Abdullah ibn Haram (RA) pleaded with them to stay for the sake of Allah, but they turned back.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪০৫০; সূরা আলে ইমরান: ১৬৭',
            sourceEn: 'Sahih al-Bukhari, Hadith 4050; Surah Al-Imran 3:167',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'রণকৌশল ও গিরিপথ',
        titleEn: 'Battle Strategy & The Archers’ Hill',
        events: [
          {
            titleBn: 'কিশোর সাহাবিদের বীরত্ব ও অনুমতি',
            titleEn: 'Eagerness of Young Companions',
            pointsBn: [
              'বয়স কম হওয়ায় নবীজি (সা.) ইবনে উমর, যায়িদ ইবনে সাবিত ও বারা ইবনে আযিব (রা.)-সহ কয়েকজন কিশোরকে ফিরিয়ে দেন।',
              'রাফি ইবনে খাদিজ (রা.) তীরন্দাজিতে দক্ষ হওয়ায় অনুমতি পান; সামুরাহ (রা.) কুস্তিতে রাফিকে হারিয়ে যুদ্ধে যাওয়ার অনুমতি আদায় করেন।',
            ],
            pointsEn: [
              'The Prophet (PBUH) sent back underage youths including Ibn Umar and Zayd ibn Thabit (RA).',
              'Rafi‘ ibn Khadij was permitted for his archery skill, and Samurah ibn Jundub (RA) earned permission by wrestling and pinning Rafi‘.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'জাবালে রুমাতে ৫০ জন তীরন্দাজ মোতায়েন',
            titleEn: '50 Archers Stationed on Jabal al-Rumat',
            subtitleBn: 'কঠোরতম সামরিক নির্দেশ',
            subtitleEn: 'The Strictest Tactical Command',
            pointsBn: [
              'পেছনের গিরিপথ সুরক্ষিত রাখতে আব্দুল্লাহ ইবনে যুবাইর (রা.)-এর নেতৃত্বে ৫০ জন দক্ষ তীরন্দাজ মোতায়েন করা হয়।',
              'নবীজি (সা.) কঠোর নির্দেশ দেন: তোমরা যদি দেখো পাখি আমাদের ছোঁ মেরে নিয়ে যাচ্ছে অথবা আমরা জিতে গেছি—আমার অনুমতি ছাড়া জায়গা ছাড়বে না।',
            ],
            pointsEn: [
              'Fifty archers under Abdullah ibn Jubayr (RA) were stationed on the hill guarding the rear pass.',
              'The Prophet (PBUH) strictly ordered: “Even if you see birds snatching us or see us victorious, never leave your post without my command.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩০৩৯, ৪০৪৩',
            sourceEn: 'Sahih al-Bukhari, Hadith 3039, 4043',
          },
          {
            titleBn: 'আবু দুজানা (রা.)-এর হাতে রাসূলের তলোয়ার',
            titleEn: 'The Prophet’s Sword Given to Abu Dujanah (RA)',
            pointsBn: [
              'নবীজি (সা.) তলোয়ার উঁচিয়ে বললেন, কে এর হক আদায় করে নেবে? বহু সাহাবি হাত বাড়ালেও তিনি আবু দুজানা (রা.)-কে তা দেন।',
              'লাল পাগড়ি বেঁধে গর্বভরে শত্রুব্যূহের দিকে হাঁটতে দেখে নবীজি (সা.) বললেন: এমন হাঁটা আল্লাহ অপছন্দ করেন, তবে এই স্থানে নয়।',
            ],
            pointsEn: [
              'Holding up a sword, the Prophet (PBUH) asked who would fulfill its right, and entrusted it to Abu Dujanah (RA).',
              'Tying his red headband, he strode proudly toward enemy lines; the Prophet remarked: “Allah dislikes this gait except in this place.”',
            ],
            sourceBn: 'সহীহ মুসলিম, হাদিস নং ২৪৭০; সীরাতে ইবনে হিশাম',
            sourceEn: 'Sahih Muslim, Hadith 2470; Sirah Ibn Hisham',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'প্রথম পর্বে মুসলিমদের বিজয়',
        titleEn: 'Initial Muslim Victory',
        events: [
          {
            titleBn: 'আলী (রা.) ও হামযা (রা.)-এর প্রবল আক্রমণ',
            titleEn: 'Devastating Assault by Ali & Hamzah (RA)',
            pointsBn: [
              'দ্বন্দ্বযুদ্ধে আলী (রা.) কুরাইশের পতাকাবাহী তালহা ইবনে আবি তালহাকে এক আঘাতে ধরাশায়ী করেন।',
              'হামযা (রা.), আবু দুজানা (রা.) ও যুবাইর (রা.) সিংহবিক্রমে লড়ে কুরাইশের পতাকাবাহীদের একের পর এক নিঃশেষ করেন।',
            ],
            pointsEn: [
              'In the opening duel, Ali (RA) struck down Quraysh standard-bearer Talhah ibn Abi Talhah.',
              'Hamzah, Abu Dujanah, and al-Zubayr (RA) tore through enemy ranks, felling Quraysh standard-bearers one after another.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'কুরাইশ বাহিনীর ছত্রভঙ্গ পলায়ন',
            titleEn: 'Rout of the Quraysh Army',
            pointsBn: [
              'মুসলিমদের অদম্য ঈমানি আক্রমণে ৩,০০০ কুরাইশ বাহিনী ছত্রভঙ্গ হয়ে পেছনে পালাতে শুরু করে।',
              'হিন্দা ও কুরাইশ নারীরা কাপড় গুটিয়ে পাহাড়ের দিকে ছুটতে থাকে; প্রথম পর্বে মুসলিমদের স্পষ্ট বিজয় অর্জিত হয়।',
            ],
            pointsEn: [
              'Under relentless Muslim pressure, the 3,000-strong Quraysh line collapsed and fled in disarray.',
              'Quraysh women scrambled up the hills as the Muslims achieved a clear initial victory.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪০৪৩; সূরা আলে ইমরান: ১৫২',
            sourceEn: 'Sahih al-Bukhari, Hadith 4043; Surah Al-Imran 3:152',
          },
          {
            titleBn: 'সাইয়্যিদুশ শুহাদা হামযা (রা.)-এর শাহাদাত',
            titleEn: 'Martyrdom of Hamzah (RA), Chief of Martyrs',
            pointsBn: [
              'আফ্রিকান দাস ওয়াহশি (যিনি পরে ইসলাম গ্রহণ করেন) পাথরের আড়ালে ওঁত পেতে বর্শা ছুড়ে হামযা (রা.)-কে শহীদ করে।',
              'হিন্দা প্রতিশোধস্পৃহায় হামযা (রা.)-এর পবিত্র লাশের অবমাননা করে; নবীজি (সা.) চাচার শোকে গভীরভাবে ব্যথিত হন।',
            ],
            pointsEn: [
              'Wahshi (who later embraced Islam) lay in ambush behind a rock and martyred Hamzah (RA) with a javelin.',
              'Hind mutilated his body in vengeance, causing deep grief to the Prophet (PBUH).',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪০৭২',
            sourceEn: 'Sahih al-Bukhari, Hadith 4072',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'গিরিপথের ভুল ও বিপর্যয়',
        titleEn: 'Breach of the Pass & Reversal',
        events: [
          {
            titleBn: 'তীরন্দাজদের অবস্থান ত্যাগ',
            titleEn: 'Archers Leave Their Post',
            pointsBn: [
              'কুরাইশদের পালাতে দেখে পাহাড়ে থাকা ৪০ জন তীরন্দাজ যুদ্ধ শেষ ভেবে গনিমত সংগ্রহে নিচে নেমে আসেন।',
              'সেনাপতি আব্দুল্লাহ ইবনে যুবাইর (রা.) নবীজি (সা.)-এর নির্দেশ স্মরণ করিয়ে দিয়ে মাত্র ১০ জন সঙ্গী নিয়ে পাহাড়ে অটল থাকেন।',
            ],
            pointsEn: [
              'Seeing Quraysh fleeing, 40 archers descended for spoils, believing the battle was over.',
              'Commander Abdullah ibn Jubayr (RA) reminded them of the Prophet’s order and held the hill with only 10 loyal men.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩০৩৯; সূরা আলে ইমরান: ১৫২',
            sourceEn: 'Sahih al-Bukhari, Hadith 3039; Surah Al-Imran 3:152',
          },
          {
            titleBn: 'খালিদ ইবনে ওয়ালিদের পেছন থেকে হামলা',
            titleEn: 'Khalid ibn al-Walid’s Rear Flanking Charge',
            pointsBn: [
              'খালিদ ইবনে ওয়ালিদ (তখনো অমুসলিম) গিরিপথ খালি দেখে অশ্বারোহী বাহিনী নিয়ে পাহাড় ঘুরে পেছন থেকে আক্রমণ চালান।',
              'আব্দুল্লাহ ইবনে যুবাইর (রা.) ও তাঁর সঙ্গীরা বীরত্বের সাথে লড়ে শহীদ হলে মুসলিম বাহিনী দুই দিক থেকে ঘেরাও হয়ে পড়ে।',
            ],
            pointsEn: [
              'Spotting the undefended pass, Khalid ibn al-Walid (not yet Muslim) led the Quraysh cavalry around the hill and struck from the rear.',
              'After Abdullah ibn Jubayr and his handful of men were martyred, the Muslim ranks were caught in a pincer.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪০৪৩; সীরাতে ইবনে হিশাম',
            sourceEn: 'Sahih al-Bukhari, Hadith 4043; Sirah Ibn Hisham',
          },
          {
            titleBn: 'মুসআব (রা.)-এর শাহাদাত ও নবীজির মৃত্যুর গুজব',
            titleEn: 'Martyrdom of Mus‘ab (RA) & Rumor of the Prophet’s Death',
            pointsBn: [
              'পতাকাবাহী মুসআব ইবনে উমাইর (রা.)-এর ডান হাত ও বাম হাত কাটা গেলেও তিনি বুক দিয়ে ইসলামের পতাকা আঁকড়ে ধরে শহীদ হন।',
              'চেহারায় মিল থাকায় কাফিররা গুজব ছড়ায় ‘মুহাম্মাদ নিহত হয়েছেন’; এতে বহু সাহাবি হতবিহ্বল হয়ে পড়েন।',
            ],
            pointsEn: [
              'Standard-bearer Mus‘ab ibn Umayr (RA) lost both hands yet clutched the banner against his chest until martyred.',
              'Resembling the Prophet, his fall sparked a false rumor that Muhammad (PBUH) was slain, shaking the Muslim lines.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪০৪৭; সূরা আলে ইমরান: ১৪৪',
            sourceEn: 'Sahih al-Bukhari, Hadith 4047; Surah Al-Imran 3:144',
          },
        ],
      },
      {
        phaseNo: 6,
        titleBn: 'নবীজি (সা.)-এর সুরক্ষা ও অতুলনীয় বীরত্ব',
        titleEn: 'Defense of the Prophet (PBUH)',
        events: [
          {
            titleBn: 'নবীজি (সা.)-এর আহত হওয়া',
            titleEn: 'Wounding of the Prophet (PBUH)',
            pointsBn: [
              'পাথরের আঘাতে নবীজি (সা.)-এর নিচের ডান দাঁত (রুবাইয়্যাহ) শহীদ হয়, নিচের ঠোঁট কেটে যায় এবং শিরস্ত্রাণের দুটি কড়া গণ্ডদেশে বিঁধে যায়।',
              'আবু উবাইদা (রা.) দাঁত দিয়ে কড়া দুটি টেনে বের করতে গিয়ে নিজের সামনের দুটি দাঁত হারান; ফাতিমা (রা.) রক্ত থামান।',
            ],
            pointsEn: [
              'Stones fractured the Prophet’s lower incisor, cut his lip, and drove two rings of his helmet into his cheek.',
              'Abu Ubaydah (RA) pulled out both rings with his teeth, losing two front teeth; Fatimah (RA) tended his wounds.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪০৭৫; সহীহ মুসলিম, হাদিস নং ১৭৯০',
            sourceEn: 'Sahih al-Bukhari, Hadith 4075; Sahih Muslim, Hadith 1790',
          },
          {
            titleBn: 'তালহা (রা.), আবু দুজানা ও উম্মে আম্মারা (রা.)-এর মানবঢাল',
            titleEn: 'Living Shield: Talhah, Abu Dujanah & Umm Umarah (RA)',
            pointsBn: [
              'আবু দুজানা (রা.) পিঠ পেতে নবীজি (সা.)-কে তীর থেকে বাঁচান; তালহা (রা.) তীর হাতে ঠেকাতে গিয়ে নিজের হাত অবশ করে ফেলেন।',
              'নারী সাহাবি নুসাইবা বিনতে কাব (উম্মে আম্মারা রা.) তলোয়ার হাতে লড়ে ১২টি আঘাত বরণ করে নবীজি (সা.)-কে রক্ষা করেন।',
            ],
            pointsEn: [
              'Abu Dujanah (RA) shielded the Prophet with his back while Talhah (RA) blocked arrows with his hand until it became paralyzed.',
              'Nusaybah bint Ka‘b (Umm Umarah RA) fought sword in hand, taking 12 wounds defending the Messenger of Allah (PBUH).',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪০৬৩; সীরাতে ইবনে হিশাম',
            sourceEn: 'Sahih al-Bukhari, Hadith 4063; Sirah Ibn Hisham',
          },
          {
            titleBn: 'সা‘দ ইবনে আবি ওয়াক্কাস (রা.) ও আনাস ইবনুন নদর (রা.)',
            titleEn: 'Sa‘d ibn Abi Waqqas & Anas ibn al-Nadr (RA)',
            pointsBn: [
              'নবীজি (সা.) সা‘দ (রা.)-কে তীর এগিয়ে দিয়ে বললেন: ‘হে সা‘দ, তীর ছোড়ো—আমার মা-বাবা তোমার ওপর কুরবান হোক!’',
              'আনাস ইবনুন নদর (রা.) ‘উহুদের ওপার থেকে জান্নাতের সুবাস পাচ্ছি’ বলে লড়তে লড়তে ৮০টির বেশি আঘাত নিয়ে শহীদ হন।',
            ],
            pointsEn: [
              'Handing arrows to Sa‘d (RA), the Prophet (PBUH) said: “Shoot, Sa‘d! May my father and mother be ransomed for you.”',
              'Declaring “I smell the fragrance of Paradise beyond Uhud,” Anas ibn al-Nadr (RA) fell with over 80 wounds.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪০৫৮, ৪০৪৮',
            sourceEn: 'Sahih al-Bukhari, Hadith 4058, 4048',
          },
        ],
      },
      {
        phaseNo: 7,
        titleBn: 'যুদ্ধের সমাপ্তি ও হামরাউল আসাদ',
        titleEn: 'Aftermath & Hamra al-Asad',
        events: [
          {
            titleBn: 'আবু সুফিয়ানের দম্ভ ও উমর (রা.)-এর জবাব',
            titleEn: 'Abu Sufyan’s Boast & Umar’s (RA) Reply',
            pointsBn: [
              'পাহাড়ের নিচ থেকে আবু সুফিয়ান চিৎকার করল: ‘হুবাল মহান! আজ বদরের বদলা হলো।’',
              'নবীজি (সা.)-এর নির্দেশে উমর (রা.) জবাব দিলেন: ‘আল্লাহ সর্বশ্রেষ্ঠ ও মহান! আমরা সমান নই—আমাদের নিহতরা জান্নাতে, তোমাদের নিহতরা জাহান্নামে।’',
            ],
            pointsEn: [
              'Abu Sufyan shouted from below: “Glory to Hubal! Today is in exchange for Badr.”',
              'At the Prophet’s prompt, Umar (RA) answered: “Allah is Most High and Most Glorious! Our dead are in Paradise, while yours are in the Fire.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩০৩৯, ৪০৪৩',
            sourceEn: 'Sahih al-Bukhari, Hadith 3039, 4043',
          },
          {
            titleBn: '৭০ জন শহীদের দাফন ও হানযালা (রা.)',
            titleEn: 'Burial of 70 Martyrs & Hanzalah (RA)',
            pointsBn: [
              'উহুদে ৭০ জন সাহাবি শহীদ হন; কাফন স্বল্পতার কারণে একই কবরে দুই-তিনজনকে কুরআন বেশি জানার ক্রমে দাফন করা হয়।',
              'নববিবাহিত হানযালা ইবনে আবি আমির (রা.)-কে ফেরেশতারা আসমান-জমিনের মাঝে গোসল করান—তাঁর উপাধি হয় ‘গাসীলুল মালাইকা’।',
            ],
            pointsEn: [
              'Seventy companions were martyred and buried in pairs or threes, prioritized by their mastery of the Quran.',
              'Newlywed Hanzalah (RA) was washed by angels between heaven and earth, earning the title “Ghasil al-Mala’ikah.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ১৩৪৩; সীরাতে ইবনে হিশাম',
            sourceEn: 'Sahih al-Bukhari, Hadith 1343; Sirah Ibn Hisham',
          },
          {
            titleBn: 'হামরাউল আসাদ অভিযান ও সূরা আলে ইমরানের শিক্ষা',
            titleEn: 'Hamra al-Asad Pursuit & Quranic Lessons',
            pointsBn: [
              'যুদ্ধের পরদিনই আহত সাহাবিদের নিয়ে নবীজি (সা.) কুরাইশদের ধাওয়া করে হামরাউল আসাদ পর্যন্ত যান, ফলে শত্রুরা মক্কায় পালিয়ে যায়।',
              'সূরা আলে ইমরানে আল্লাহ আনুগত্যের গুরুত্ব ও তাওয়াক্কুলের চিরন্তন শিক্ষা নাযিল করে মুমিনদের সান্ত্বনা দেন।',
            ],
            pointsEn: [
              'The very next day, the Prophet (PBUH) led the wounded survivors to Hamra al-Asad, deterring Quraysh from returning.',
              'Surah Al-Imran consoled the believers and enshrined eternal lessons on obedience, discipline, and reliance on Allah.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪০৭৭; সূরা আলে ইমরান: ১৭২–১৭৪',
            sourceEn: 'Sahih al-Bukhari, Hadith 4077; Surah Al-Imran 3:172–174',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // ৩. খন্দক যুদ্ধ (আহযাব) — ৬ পর্বে ১৮টি প্রামাণ্য ঘটনা
  // =========================================================================
  khandaq: buildWarBundle({
    warId: 'khandaq',
    datePlaceBn: '৫ম হিজরির শাওয়াল · মদিনা মুনাওয়ারার উত্তর প্রান্ত',
    datePlaceEn: 'Shawwal 5 AH · Northern Perimeter of Madinah',
    battleShortBn: 'খন্দক (আহযাব) যুদ্ধ',
    battleShortEn: 'Battle of the Trench (Al-Ahzab)',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'সম্মিলিত জোটের ষড়যন্ত্র',
        titleEn: 'Formation of the Coalition',
        events: [
          {
            titleBn: 'বনু নাযিরের উসকানি ও ১০,০০০ সৈন্যের জোট',
            titleEn: 'Banu Nadir’s Instigation & Coalition of 10,000',
            pointsBn: [
              'নির্বাসিত বনু নাযিরের নেতারা মক্কায় গিয়ে কুরাইশ, গাতাফান, বনু সুলাইম ও অন্যান্য আরব গোত্রকে একত্রিত করে।',
              'আবু সুফিয়ানের নেতৃত্বে প্রায় ১০,০০০ সৈন্যের বিশাল সম্মিলিত বাহিনী (আহযাব) মদিনা ধ্বংসের উদ্দেশ্যে রওনা হয়।',
            ],
            pointsEn: [
              'Exiled Banu Nadir leaders traveled to Makkah and united Quraysh, Ghatafan, Banu Sulaym, and allied tribes.',
              'A massive coalition (Al-Ahzab) of 10,000 warriors marched under Abu Sufyan to annihilate Madinah.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; সূরা আহযাব: ৯–১০',
            sourceEn: 'Sirah Ibn Hisham; Surah al-Ahzab 33:9–10',
          },
          {
            titleBn: 'সালমান ফারসি (রা.)-এর পরিখা খননের পরামর্শ',
            titleEn: 'Salman al-Farsi’s (RA) Trench Strategy',
            pointsBn: [
              'মদিনার তিন দিক আগ্নেয় শিলা ও খেজুর বাগানে ঘেরা ছিল; কেবল উত্তর দিক ছিল উন্মুক্ত।',
              'সালমান ফারসি (রা.) পারস্যের রণকৌশল অনুযায়ী উত্তর প্রান্তে গভীর ও প্রশস্ত পরিখা (খন্দক) খননের প্রস্তাব দিলে নবীজি (সা.) তা সাদরে গ্রহণ করেন।',
            ],
            pointsEn: [
              'Madinah was naturally protected on three sides by lava fields and groves, leaving only the northern approach open.',
              'Salman al-Farsi (RA) proposed digging a deep defensive trench as practiced in Persia, which the Prophet (PBUH) immediately adopted.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: '‘সালমান আমাদের আহলে বাইতের অন্তর্ভুক্ত’',
            titleEn: '“Salman Belongs to Our Household”',
            pointsBn: [
              'খননকাজে প্রবল পরিশ্রমী সালমান (রা.)-কে নিয়ে মুহাজির ও আনসার উভয়েই দাবি করলেন, ‘সালমান আমাদের লোক।’',
              'নবীজি (সা.) হেসে ঘোষণা দিলেন: ‘সালমান আমাদের আহলে বাইতের (পরিবারের) সদস্য।’',
            ],
            pointsEn: [
              'Both Muhajirun and Ansar claimed the hardworking Salman (RA) as one of their own.',
              'The Prophet (PBUH) smiled and declared: “Salman is from us, the People of the Household (Ahl al-Bayt).”',
            ],
            sourceBn: 'আল-মুস্তাদরাক লিল-হাকিম; সীরাতে ইবনে হিশাম',
            sourceEn: 'Al-Mustadrak al-Hakim; Sirah Ibn Hisham',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'পরিখা খনন ও মুজিযা',
        titleEn: 'Digging the Trench & Miracles',
        events: [
          {
            titleBn: 'পেটে পাথর বেঁধে নবীজি (সা.)-এর শ্রম',
            titleEn: 'The Prophet Works with Stones Tied to His Belly',
            pointsBn: [
              'তীব্র শীত ও ক্ষুধার মধ্যে ৩,০০০ সাহাবি মাটি কাটার কাজে লেগে যান; নবীজি (সা.) নিজেও ধুলোমাখা শরীরে মাটি বয়ে আনেন।',
              'ক্ষুধার তীব্রতায় সাহাবিরা পেটে একটি পাথর বাঁধেন, আর নবীজি (সা.)-এর পেটে বাঁধা ছিল দুটি পাথর।',
            ],
            pointsEn: [
              'Braving winter cold and hunger, 3,000 companions dug tirelessly alongside the dust-covered Prophet (PBUH).',
              'When companions showed one stone tied to their stomachs against hunger, the Prophet revealed two stones tied to his.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪১০১, ৪১০৪',
            sourceEn: 'Sahih al-Bukhari, Hadith 4101, 4104',
          },
          {
            titleBn: 'শক্ত পাথর ভাঙা ও তিন সাম্রাজ্য বিজয়ের সুসংবাদ',
            titleEn: 'Shattering the Boulder & Prophecy of Three Empires',
            pointsBn: [
              'একটি বিশাল শক্ত পাথর না ভাঙলে নবীজি (সা.) বিসমিল্লাহ বলে কোদাল দিয়ে তিনবার আঘাত করেন; প্রতি আঘাতে বিদ্যুতের ঝলকানি ওঠে।',
              'তিনি সুসংবাদ দেন: প্রথম ঝলকে শাম, দ্বিতীয় ঝলকে পারস্য ও তৃতীয় ঝলকে ইয়েমেন বিজয়ের চাবি আমাকে দেখানো হয়েছে।',
            ],
            pointsEn: [
              'When an immovable boulder blocked the trench, the Prophet (PBUH) struck it thrice with Bismillah, producing sparks each time.',
              'He foretold that the sparks revealed the future Muslim conquests of Syria (Sham), Persia, and Yemen.',
            ],
            sourceBn: 'সুনান আন-নাসায়ী, হাদিস নং ৩১৭৬; মুসনাদে আহমদ',
            sourceEn: 'Sunan an-Nasa’i, Hadith 3176; Musnad Ahmad',
          },
          {
            titleBn: 'জাবির (রা.)-এর ঘরে খাবারের বরকত',
            titleEn: 'Miracle of Food at Jabir’s (RA) House',
            pointsBn: [
              'নবীজি (সা.)-কে ক্ষুধার্ত দেখে জাবির (রা.) একটি ছাগলছানা ও সামান্য যব দিয়ে কয়েকজনের খাবার প্রস্তুত করে দাওয়াত দেন।',
              'নবীজি (সা.) পুরো ১,০০০ খননকারী সাহাবিকে ডাকেন; তাঁর দোয়ার বরকতে সবাই তৃপ্তি করে খাওয়ার পরও হাঁড়ি ভরা থাকে।',
            ],
            pointsEn: [
              'Moved by the Prophet’s hunger, Jabir (RA) prepared a modest meal of one kid goat and barley for a few guests.',
              'The Prophet (PBUH) invited all 1,000 workers; by Allah’s blessing everyone ate their fill while the pot remained full.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪১০১, ৪১০২',
            sourceEn: 'Sahih al-Bukhari, Hadith 4101, 4102',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'অবরোধ ও বনু কুরাইযার বিশ্বাসঘাতকতা',
        titleEn: 'The Siege & Treachery of Banu Qurayzah',
        events: [
          {
            titleBn: 'পরিখা দেখে কুরাইশদের বিস্ময়',
            titleEn: 'Quraysh Stunned by the Trench',
            pointsBn: [
              'আরবরা কখনো এমন সামরিক পরিখা দেখেনি; কুরাইশ নেতারা বিস্মিত হয়ে বলল: এটি আরবদের পরিচিত কৌশল নয়!',
              'বিশাল ১০,০০০ সৈন্যের বাহিনী পরিখার ওপারে আটকে গিয়ে দীর্ঘ অবরোধ শুরু করতে বাধ্য হয়।',
            ],
            pointsEn: [
              'Unfamiliar with siege trenches, the Quraysh exclaimed that this was a stratagem unknown to Arabs.',
              'Their 10,000-man army was halted at the ditch, forced into a protracted winter siege.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; তারীখে তাবারী',
            sourceEn: 'Sirah Ibn Hisham; Tarikh al-Tabari',
          },
          {
            titleBn: 'বনু কুরাইযার চুক্তিভঙ্গ ও ভেতর থেকে বিপদ',
            titleEn: 'Banu Qurayzah Breaks Its Covenant',
            pointsBn: [
              'বনু নাযিরের হুয়াই ইবনে আখতাবের প্ররোচনায় মদিনার দক্ষিণ দিকের ইহুদি গোত্র বনু কুরাইযা মুসলিমদের সাথে শান্তিচুক্তি ভেঙে শত্রুদের পক্ষে যোগ দেয়।',
              'সামনে ১০,০০০ শত্রু আর পেছনে নারী-শিশুদের দুর্গের পাশে বিশ্বাসঘাতক গোত্র—মুমিনরা চরম অগ্নিপরীক্ষায় পড়েন।',
            ],
            pointsEn: [
              'Persuaded by Huyayy ibn Akhtab, Banu Qurayzah broke their defense pact with Madinah and allied with the invaders.',
              'Muslims faced enemies from both front and rear, putting the women and children inside Madinah in grave peril.',
            ],
            sourceBn: 'সূরা আহযাব: ১০–১১; সীরাতে ইবনে হিশাম',
            sourceEn: 'Surah al-Ahzab 33:10–11; Sirah Ibn Hisham',
          },
          {
            titleBn: 'সাফিয়্যাহ (রা.)-এর অসীম সাহসিকতা',
            titleEn: 'Courage of Safiyyah (RA)',
            pointsBn: [
              'নারী-শিশুদের দুর্গের চারপাশে এক ইহুদি গুপ্তচর ঘোরাঘুরি করতে দেখে নবীজি (সা.)-এর ফুফু সাফিয়্যাহ (রা.) তাকে তাঁবুর খুঁটি দিয়ে প্রতিহত করেন।',
              'এতে শত্রুরা ভেবে বসে যে দুর্গের ভেতরে সশস্ত্র মুসলিম প্রহরী রয়েছে, ফলে তারা আর হামলা করার সাহস পায়নি।',
            ],
            pointsEn: [
              'When a Banu Qurayzah scout probed the fortress sheltering Muslim women and children, the Prophet’s aunt Safiyyah (RA) neutralized him with a tent pole.',
              'Convinced the fort was heavily guarded, the traitors abandoned their planned raid.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; মুসনাদে আহমদ',
            sourceEn: 'Sirah Ibn Hisham; Musnad Ahmad',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'দ্বন্দ্বযুদ্ধ ও অবিরাম প্রতিরোধ',
        titleEn: 'Duels & Steadfast Defense',
        events: [
          {
            titleBn: 'আমর ইবনে আবদে উদ্দের পরিখা অতিক্রম',
            titleEn: 'Amr ibn Abd Wudd Leaps the Trench',
            pointsBn: [
              'আরবের কুখ্যাত যোদ্ধা আমর ইবনে আবদে উদ্দ (যাকে ১,০০০ অশ্বারোহীর সমান গণ্য করা হতো) সংকীর্ণ অংশ দিয়ে ঘোড়া লাফিয়ে পরিখা পার হয়।',
              'সে দম্ভভরে দ্বন্দ্বযুদ্ধের আহ্বান জানালে তরুণ আলী ইবনে আবি তালিব (রা.) তিনবার দাঁড়িয়ে অনুমতির আবেদন করেন।',
            ],
            pointsEn: [
              'Renowned champion Amr ibn Abd Wudd—considered equal to a thousand horsemen—leapt a narrow section of the trench.',
              'When he challenged the Muslims to single combat, young Ali ibn Abi Talib (RA) repeatedly stepped forward.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-মুস্তাদরাক লিল-হাকিম',
            sourceEn: 'Sirah Ibn Hisham; Al-Mustadrak al-Hakim',
          },
          {
            titleBn: 'আলী (রা.)-এর ঐতিহাসিক বিজয়',
            titleEn: 'Ali’s (RA) Historic Victory Over Amr',
            pointsBn: [
              'নবীজি (সা.) নিজের তলোয়ার ও পাগড়ি পরিয়ে আলী (রা.)-কে পাঠান; প্রচণ্ড লড়াইয়ের পর আলী (রা.) আমরকে হত্যা করেন।',
              'আমরের পতনে ‘আল্লাহু আকবার’ ধ্বনি ওঠে এবং ইকরিমাসহ বাকি শত্রুরা আতঙ্কে ঘোড়া ছুটিয়ে ওপারে পালিয়ে যায়।',
            ],
            pointsEn: [
              'Armed with the Prophet’s sword and turban, Ali (RA) engaged Amr in a fierce duel and slew him.',
              'Takbir echoed across the Muslim line as Ikrimah and the remaining horsemen fled back across the ditch.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'আসরের নামাজ কাযা ও নবীজি (সা.)-এর বদদোয়া',
            titleEn: 'Delayed Asr Prayer Under Barrage',
            pointsBn: [
              'একদিন শত্রুদের তীব্র আক্রমণ প্রতিহত করতে গিয়ে নবীজি (সা.) ও সাহাবিদের আসরের নামাজ সূর্যাস্তের আগে আদায় করা সম্ভব হয়নি।',
              'ব্যথিত হয়ে নবীজি (সা.) দোয়া করেন: তারা আমাদের মধ্যবর্তী সালাত (আসর) থেকে বিরত রেখেছে—আল্লাহ তাদের ঘর ও কবর আগুন দিয়ে পূর্ণ করুন।',
            ],
            pointsEn: [
              'During an intense daylong assault, the Muslims were prevented from praying Asr until after sunset.',
              'Deeply grieved, the Prophet (PBUH) prayed against those who distracted them from the middle prayer.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ২৯৩১, ৪১১১; সহীহ মুসলিম, হাদিস নং ৬২৭',
            sourceEn: 'Sahih al-Bukhari, Hadith 2931, 4111; Sahih Muslim, Hadith 627',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'কূটনৈতিক বুদ্ধিমত্তা ও ঐশী ঘূর্ণিঝড়',
        titleEn: 'Strategic Intelligence & The Divine Gale',
        events: [
          {
            titleBn: 'নুআইম ইবনে মাসউদ (রা.)-এর ইসলাম গ্রহণ ও কৌশল',
            titleEn: 'Nu‘aym ibn Mas‘ud’s (RA) Diplomatic Masterstroke',
            pointsBn: [
              'গাতাফান গোত্রের প্রভাবশালী নেতা নুআইম ইবনে মাসউদ (রা.) গোপনে ইসলাম গ্রহণ করে নবীজি (সা.)-এর কাছে আসেন।',
              'তাঁর অসাধারণ কূটনৈতিক কৌশলে কুরাইশ, গাতাফান ও বনু কুরাইযার মধ্যে গভীর অবিশ্বাস ও ফাটল তৈরি হয়।',
            ],
            pointsEn: [
              'Influential Ghatafan elder Nu‘aym ibn Mas‘ud (RA) secretly embraced Islam and offered his service.',
              'Through brilliant diplomacy, he sowed mutual distrust between Quraysh, Ghatafan, and Banu Qurayzah, paralyzing their alliance.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'রাতের আঁধারে হুযাইফা (রা.)-এর গোয়েন্দা অভিযান',
            titleEn: 'Hudhayfah’s (RA) Night Reconnaissance',
            pointsBn: [
              'কনকনে শীত ও ঝোড়ো রাতে নবীজি (সা.) হুযাইফা ইবনুল ইয়ামান (রা.)-কে শত্রুশিবিরের খবর আনতে পাঠান এবং তাঁর জন্য দোয়া করেন।',
              'হুযাইফা (রা.) কুরাইশ শিবিরে ঢুকে আবু সুফিয়ানের পলায়নের ঘোষণা নিজ কানে শুনে নিরাপদে ফিরে আসেন।',
            ],
            pointsEn: [
              'On a freezing stormy night, the Prophet (PBUH) prayed for Hudhayfah (RA) and sent him to infiltrate the enemy camp.',
              'Sitting among the Quraysh in darkness, Hudhayfah overheard Abu Sufyan order a retreat and reported back safely.',
            ],
            sourceBn: 'সহীহ মুসলিম, হাদিস নং ১৭৮৮',
            sourceEn: 'Sahih Muslim, Hadith 1788',
          },
          {
            titleBn: 'আল্লাহর সাহায্য: প্রচণ্ড ঘূর্ণিঝড় ও অদৃশ্য বাহিনী',
            titleEn: 'Allah’s Aid: Fierce Gale & Unseen Hosts',
            pointsBn: [
              'প্রায় এক মাস অবরোধের পর আল্লাহ শত্রুশিবিরে ভয়ংকর শীতল ঝোড়ো হাওয়া ও অদৃশ্য ফেরেশতা বাহিনী পাঠান।',
              'শত্রুদের তাঁবু উপড়ে যায়, হাঁড়ি-পাতিল উল্টে পড়ে, আগুন নিভে যায় এবং আবু সুফিয়ান রাতেই বাহিনী নিয়ে মক্কায় পালিয়ে যায়।',
            ],
            pointsEn: [
              'After nearly a month of siege, Allah unleashed a violent icy wind and unseen angelic hosts upon the coalition.',
              'Their tents were uprooted, cauldrons overturned, and fires extinguished; Abu Sufyan ordered an immediate retreat to Makkah.',
            ],
            sourceBn: 'সূরা আহযাব: ৯; সহীহ আল-বুখারী, হাদিস নং ৪১১৩',
            sourceEn: 'Surah al-Ahzab 33:9; Sahih al-Bukhari, Hadith 4113',
          },
        ],
      },
      {
        phaseNo: 6,
        titleBn: 'যুদ্ধের পর ও ঐতিহাসিক মোড়',
        titleEn: 'Aftermath & Strategic Turning Point',
        events: [
          {
            titleBn: 'নবীজি (সা.)-এর ভবিষ্যদ্বাণী: ‘এখন আমরাই তাদের অভিমুখে যাব’',
            titleEn: '“Now We Shall March Against Them”',
            pointsBn: [
              'আহযাব বাহিনী পালিয়ে গেলে নবীজি (সা.) ঐতিহাসিক ঘোষণা দেন: ‘এখন থেকে আমরাই তাদের বিরুদ্ধে অভিযান চালাব, তারা আর আমাদের আক্রমণ করতে পারবে না।’',
              'বাস্তবেও এরপর কুরাইশ আর কখনো মদিনা আক্রমণ করতে সক্ষম হয়নি।',
            ],
            pointsEn: [
              'Following the coalition’s retreat, the Prophet (PBUH) declared: “From now on we shall go out against them, and they will not come against us.”',
              'Indeed, Quraysh was never able to mount another invasion of Madinah.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪১০৯, ৪১১০',
            sourceEn: 'Sahih al-Bukhari, Hadith 4109, 4110',
          },
          {
            titleBn: 'সা‘দ ইবনে মুআয (রা.)-এর শাহাদাত ও আরশ কেঁপে ওঠা',
            titleEn: 'Martyrdom of Sa‘d ibn Mu‘adh (RA)',
            pointsBn: [
              'খন্দকের যুদ্ধে তীরের আঘাতে আহত হওয়া আনসার নেতা সা‘দ ইবনে মুআয (রা.) বনু কুরাইযার বিচার সম্পন্ন করার পর শহীদ হন।',
              'নবীজি (সা.) জানান: সা‘দ ইবনে মুআযের মৃত্যুতে রহমানের আরশ কেঁপে উঠেছে এবং ৭০,০০০ ফেরেশতা তাঁর জানাজায় অংশ নিয়েছেন।',
            ],
            pointsEn: [
              'Wounded by an arrow during the Trench, Ansar leader Sa‘d ibn Mu‘adh (RA) passed away after delivering judgment on Banu Qurayzah.',
              'The Prophet (PBUH) announced that the Throne of the Most Merciful shook at his passing and 70,000 angels attended his funeral.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৩৮০৩; সহীহ মুসলিম, হাদিস নং ২৪৬৬',
            sourceEn: 'Sahih al-Bukhari, Hadith 3803; Sahih Muslim, Hadith 2466',
          },
          {
            titleBn: 'সূরা আহযাবের চিরন্তন তাওয়াক্কুল',
            titleEn: 'Eternal Lesson of Trust in Surah al-Ahzab',
            pointsBn: [
              'চরম বিপদেও প্রকৃত মুমিনরা বলেছিলেন: ‘এ তো তাই যার ওয়াদা আল্লাহ ও তাঁর রাসূল আমাদের দিয়েছিলেন—এতে তাদের ঈমান ও আনুগত্য আরও বেড়ে যায়।’',
              'খন্দক প্রমাণ করে দেয়, ঐক্য, কৌশলগত প্রস্তুতি ও আল্লাহর ওপর ভরসা যেকোনো পরাশক্তিকে ব্যর্থ করে দিতে পারে।',
            ],
            pointsEn: [
              'Facing overwhelming odds, true believers declared: “This is what Allah and His Messenger promised us,” increasing only in faith and submission.',
              'Al-Ahzab proved that unity, smart strategy, and trust in Allah triumph over any coalition.',
            ],
            sourceBn: 'সূরা আহযাব: ২২–২৫',
            sourceEn: 'Surah al-Ahzab 33:22–25',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // ৪. হুদাইবিয়ার সন্ধি — ৬ পর্বে ১৬টি প্রামাণ্য ঘটনা
  // =========================================================================
  hudaibiyah: buildWarBundle({
    warId: 'hudaibiyah',
    datePlaceBn: '৬ষ্ঠ হিজরির যিলকদ · হুদাইবিয়া প্রান্তর, মক্কার উপকণ্ঠ',
    datePlaceEn: 'Dhul-Qa‘dah 6 AH · Plain of Hudaybiyyah, near Makkah',
    battleShortBn: 'হুদাইবিয়ার সন্ধি',
    battleShortEn: 'Treaty of Hudaybiyyah',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'স্বপ্ন ও উমরাহর যাত্রা',
        titleEn: 'The Dream & Peaceful Journey',
        events: [
          {
            titleBn: 'কাবা তাওয়াফের সত্য স্বপ্ন',
            titleEn: 'Prophetic Dream of Tawaf',
            pointsBn: [
              'নবীজি (সা.) স্বপ্নে দেখেন, তিনি সাহাবিদের সাথে নিরাপদে মসজিদুল হারামে প্রবেশ করে উমরাহ আদায় করছেন।',
              'যুদ্ধের কোনো ইচ্ছা ছাড়াই শুধু কোষবদ্ধ মুসাফির তলোয়ার ও কুরবানির পশু নিয়ে ১,৪০০ সাহাবি ইহরাম বেঁধে মক্কার পথে রওনা হন।',
            ],
            pointsEn: [
              'The Prophet (PBUH) dreamed of entering Masjid al-Haram safely with his companions to perform Umrah.',
              'With peaceful intent, 1,400 companions donned Ihram carrying only sheathed travel swords and sacrificial animals.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ২৭৩১; সূরা আল-ফাতহ: ২৭',
            sourceEn: 'Sahih al-Bukhari, Hadith 2731; Surah al-Fath 48:27',
          },
          {
            titleBn: 'কাসওয়ার বসে পড়া ও হুদাইবিয়ায় অবস্থান',
            titleEn: 'Al-Qaswa Kneels at Hudaybiyyah',
            pointsBn: [
              'হুদাইবিয়ার প্রবেশপথে নবীজি (সা.)-এর উষ্ট্রী ‘কাসওয়া’ হাঁটু গেড়ে বসে পড়ে; সাহাবিরা ভাবলেন সে ক্লান্ত হয়েছে।',
              'নবীজি (সা.) বললেন: ‘কাসওয়া অবাধ্য হয়নি; বরং হস্তিবাহিনীকে যিনি মক্কা থেকে আটকেছিলেন, তিনিই তাকে থামিয়েছেন।’',
            ],
            pointsEn: [
              'At the pass of Hudaybiyyah, the Prophet’s camel al-Qaswa knelt and refused to rise.',
              'The Prophet (PBUH) said: “She has not grown stubborn; rather, the One who restrained the Elephant from Makkah has held her back.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ২৭৩১',
            sourceEn: 'Sahih al-Bukhari, Hadith 2731',
          },
          {
            titleBn: 'হুদাইবিয়ার শুকনো কূপে পানির মুজিযা',
            titleEn: 'Miracle of Water in the Dry Well',
            pointsBn: [
              'হুদাইবিয়ায় পানির তীব্র সংকট দেখা দিলে নবীজি (সা.) তাঁর তূণীর থেকে একটি তীর বের করে শুকনো কূপে পুঁতে দিতে বলেন।',
              'আল্লাহর কুদরতে কূপ থেকে ঝরনার মতো পানি উছলে ওঠে এবং ১,৪০০ সাহাবি ও সব পশু তৃপ্তি করে পান করে।',
            ],
            pointsEn: [
              'Facing severe thirst at Hudaybiyyah, the Prophet (PBUH) placed an arrow from his quiver into the dry well.',
              'Water gushed forth miraculously, quenching all 1,400 companions and their mounts.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ২৭৩১, ৩৫৭৭',
            sourceEn: 'Sahih al-Bukhari, Hadith 2731, 3577',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'কূটনৈতিক দূতবিনিময়',
        titleEn: 'Diplomatic Envoys',
        events: [
          {
            titleBn: 'উরওয়া ইবনে মাসউদের বিস্ময়কর সাক্ষ্য',
            titleEn: 'Urwah ibn Mas‘ud’s Astonished Testimony',
            pointsBn: [
              'কুরাইশের দূত উরওয়া ইবনে মাসউদ সাহাবিদের গভীর নবীপ্রেম দেখে বিস্মিত হয়ে মক্কায় ফিরে বলেন: আমি রোম, পারস্য ও হাবশার সম্রাটদের দরবার দেখেছি।',
              'কিন্তু মুহাম্মাদের সঙ্গীরা তাঁকে যেভাবে ভালোবাসে ও সম্মান করে, কোনো বাদশাহকে কেউ কখনো তেমন করেনি।',
            ],
            pointsEn: [
              'Quraysh envoy Urwah ibn Mas‘ud returned amazed, telling Makkah he had visited Caesar, Chosroes, and the Negus.',
              'Yet he had never seen any king revered and loved by followers the way the companions honored Muhammad (PBUH).',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ২৭৩১',
            sourceEn: 'Sahih al-Bukhari, Hadith 2731',
          },
          {
            titleBn: 'উসমান (রা.)-কে মক্কায় শান্তিদূত হিসেবে প্রেরণ',
            titleEn: 'Uthman (RA) Sent as Peace Envoy to Makkah',
            pointsBn: [
              'নবীজি (সা.) উসমান ইবনে আফফান (রা.)-কে মক্কায় পাঠান এ বার্তা দিয়ে যে মুসলিমরা যুদ্ধ করতে নয়, কেবল কাবার জিয়ারত ও উমরাহ করতে এসেছেন।',
              'কুরাইশ উসমান (রা.)-কে একাকী তাওয়াফের প্রস্তাব দিলে তিনি দৃঢ়ভাবে প্রত্যাখ্যান করে বলেন: নবীজি (সা.) তাওয়াফ না করা পর্যন্ত আমি করব না।',
            ],
            pointsEn: [
              'The Prophet (PBUH) dispatched Uthman ibn Affan (RA) to assure Quraysh of their peaceful Umrah purpose.',
              'When Quraysh offered Uthman permission to perform Tawaf alone, he refused to do so before the Prophet (PBUH).',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; সহীহ আল-বুখারী',
            sourceEn: 'Sirah Ibn Hisham; Sahih al-Bukhari',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'বাইআতে রিদওয়ান',
        titleEn: 'Pledge of the Tree (Bay‘at al-Ridwan)',
        events: [
          {
            titleBn: 'উসমান (রা.)-এর শাহাদাতের গুজব ও গাছের নিচে শপথ',
            titleEn: 'Rumor of Uthman’s Death & Pledge Beneath the Tree',
            pointsBn: [
              'মক্কায় উসমান (রা.)-কে আটক রাখায় গুজব ছড়ায় যে তাঁকে শহীদ করা হয়েছে; নবীজি (সা.) বাবলা গাছের নিচে বসে সাহাবিদের থেকে মৃত্যুর শপথ নেন।',
              'নবীজি (সা.) নিজের বাম হাতকে ডান হাতের ওপর রেখে বলেন: ‘এটি উসমানের হাত।’',
            ],
            pointsEn: [
              'When rumors spread that Uthman (RA) had been killed, the Prophet (PBUH) took a solemn pledge of steadfastness under the tree.',
              'Placing his own left hand over his right, he declared: “This is for Uthman.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪১৭১; সূরা আল-ফাতহ: ১৮',
            sourceEn: 'Sahih al-Bukhari, Hadith 4171; Surah al-Fath 48:18',
          },
          {
            titleBn: 'আল্লাহর চিরন্তন সন্তুষ্টির ঘোষণা',
            titleEn: 'Allah’s Eternal Pleasure Announced',
            pointsBn: [
              'কুরআনে আল্লাহ ঘোষণা করেন: ‘নিশ্চয়ই আল্লাহ মুমিনদের ওপর সন্তুষ্ট হয়েছেন, যখন তারা গাছের নিচে আপনার হাতে বাইআত গ্রহণ করছিল।’',
              'এই শপথের খবরে কুরাইশ ভীত হয়ে উসমান (রা.)-কে মুক্তি দেয় এবং সন্ধির জন্য সুহাইল ইবনে আমরকে পাঠায়।',
            ],
            pointsEn: [
              'Allah revealed: “Indeed Allah was pleased with the believers when they pledged allegiance to you under the tree.”',
              'Alarmed by this unity, Quraysh freed Uthman (RA) and sent Suhayl ibn Amr to negotiate peace.',
            ],
            sourceBn: 'সূরা আল-ফাতহ: ১৮; সহীহ মুসলিম, হাদিস নং ২৪৯৬',
            sourceEn: 'Surah al-Fath 48:18; Sahih Muslim, Hadith 2496',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'সন্ধির শর্ত ও স্বাক্ষর',
        titleEn: 'Terms & Signing of the Treaty',
        events: [
          {
            titleBn: 'সুহাইল ইবনে আমরের আপত্তি ও নবীজির প্রজ্ঞা',
            titleEn: 'Suhayl’s Objections & Prophetic Wisdom',
            pointsBn: [
              'চুক্তিপত্রে ‘বিসমিল্লাহির রাহমানির রাহীম’ ও ‘মুহাম্মাদুর রাসূলুল্লাহ’ লেখায় সুহাইল আপত্তি জানায়।',
              'আলী (রা.) ‘রাসূলুল্লাহ’ মুছতে রাজি না হলে নবীজি (সা.) শান্তি প্রতিষ্ঠার বৃহত্তর স্বার্থে নিজ হাতে তা মুছে ‘মুহাম্মাদ ইবনে আব্দুল্লাহ’ লেখার নির্দেশ দেন।',
            ],
            pointsEn: [
              'Suhayl objected to writing “Bismillah ar-Rahman ar-Rahim” and “Muhammad, Messenger of Allah.”',
              'When Ali (RA) hesitated to erase the title, the Prophet (PBUH) calmly erased it himself for the higher good of peace.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ২৬৯৯, ২৭৩১',
            sourceEn: 'Sahih al-Bukhari, Hadith 2699, 2731',
          },
          {
            titleBn: 'হুদাইবিয়ার সন্ধির মূল শর্তাবলি',
            titleEn: 'Core Clauses of the Treaty',
            pointsBn: [
              'দশ বছরের জন্য যুদ্ধবিরতি থাকবে এবং উভয় পক্ষের মিত্র গোত্রগুলো ইচ্ছামতো যেকোনো পক্ষে যোগ দিতে পারবে (খুযাআ মুসলিমদের ও বনু বকর কুরাইশের মিত্র হয়)।',
              'এ বছর মুসলিমরা উমরাহ না করে ফিরে যাবেন, তবে পরের বছর তিন দিন মক্কায় নিরাপদে উমরাহ করবেন; মক্কা থেকে কেউ অভিভাবকের অনুমতি ছাড়া মদিনায় এলে ফিরিয়ে দিতে হবে।',
            ],
            pointsEn: [
              'A ten-year truce was established allowing tribes to ally freely (Khuza‘ah allied with Muslims, Banu Bakr with Quraysh).',
              'Muslims would return that year and perform Umrah peacefully the following year for three days; Makkan runaways without guardian consent would be returned.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ২৭৩১',
            sourceEn: 'Sahih al-Bukhari, Hadith 2731',
          },
          {
            titleBn: 'আবু জান্দাল (রা.)-এর হৃদয়বিদারক দৃশ্য',
            titleEn: 'The Heartbreaking Trial of Abu Jandal (RA)',
            pointsBn: [
              'চুক্তি স্বাক্ষরের মুহূর্তেই সুহাইলের মুসলিম পুত্র আবু জান্দাল (রা.) শিকল পায়ে টেনে টেনে মুসলিম শিবিরে এসে আশ্রয় চান।',
              'ওয়াদা রক্ষার্থে নবীজি (সা.) তাঁকে ফিরিয়ে দিতে বাধ্য হন এবং সান্ত্বনা দেন: ‘ধৈর্য ধরো আবু জান্দাল, আল্লাহ শিগগিরই তোমার মুক্তির পথ করে দেবেন।’',
            ],
            pointsEn: [
              'At the very moment of signing, Suhayl’s Muslim son Abu Jandal (RA) stumbled into camp in chains seeking refuge.',
              'Honoring the treaty, the Prophet (PBUH) returned him, consoling him: “Be patient, Abu Jandal; Allah will soon grant you relief.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ২৭৩১',
            sourceEn: 'Sahih al-Bukhari, Hadith 2731',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'উমর (রা.)-এর আবেগ ও উম্মে সালামাহ (রা.)-এর প্রজ্ঞা',
        titleEn: 'Umar’s Grief & Umm Salamah’s Wisdom',
        events: [
          {
            titleBn: 'উমর (রা.)-এর প্রশ্ন ও আবু বকর (রা.)-এর অভিন্ন উত্তর',
            titleEn: 'Umar’s (RA) Question & Abu Bakr’s Steadfastness',
            pointsBn: [
              'বাহ্যত শর্তগুলো কঠিন মনে হওয়ায় উমর (রা.) ব্যথিত হয়ে প্রশ্ন করেন: আমরা কি সত্যের ওপর নই? তবে কেন আমাদের দ্বীনে নত হব?',
              'নবীজি (সা.) ও আবু বকর (রা.) একই উত্তর দেন: ‘তিনি আল্লাহর রাসূল, কখনো তাঁর অবাধ্য হবেন না—তিনিই আমাদের সাহায্যকারী।’',
            ],
            pointsEn: [
              'Distressed by the seemingly unequal terms, Umar (RA) asked why they should accept them while standing upon truth.',
              'Both the Prophet (PBUH) and Abu Bakr (RA) answered identically: “He is Allah’s Messenger; he will never disobey Him, and Allah will grant him victory.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ২৭৩১, ৩১৮২',
            sourceEn: 'Sahih al-Bukhari, Hadith 2731, 3182',
          },
          {
            titleBn: 'উম্মে সালামাহ (রা.)-এর প্রজ্ঞাপূর্ণ পরামর্শ',
            titleEn: 'Wise Counsel of Umm Salamah (RA)',
            pointsBn: [
              'সন্ধির বেদনায় সাহাবিরা কুরবানি ও মাথা মুণ্ডাতে দেরি করলে নবীজি (সা.) উদ্বিগ্ন হয়ে উম্মে সালামাহ (রা.)-এর কাছে যান।',
              'তিনি পরামর্শ দেন: আপনি কাউকে কিছু না বলে নিজেই কুরবানি করে মাথা মুণ্ডিয়ে ফেলুন। তা দেখেই সব সাহাবি তৎক্ষণাৎ অনুসরণ করেন।',
            ],
            pointsEn: [
              'When heartbroken companions hesitated to slaughter and shave, the Prophet (PBUH) consulted Umm Salamah (RA).',
              'She advised him to silently lead by example; the moment he sacrificed and shaved, the entire camp followed at once.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ২৭৩১',
            sourceEn: 'Sahih al-Bukhari, Hadith 2731',
          },
          {
            titleBn: 'মদিনায় ফেরার পথে সূরা আল-ফাতহ নাযিল',
            titleEn: 'Revelation of Surah al-Fath (Manifest Victory)',
            pointsBn: [
              'মদিনায় ফেরার পথে নাযিল হয় সূরা আল-ফাতহ: ‘নিশ্চয়ই আমি আপনাকে দিয়েছি সুস্পষ্ট বিজয় (ফাতহুম মুবীন)।’',
              'নবীজি (সা.) উমর (রা.)-কে ডেকে সূরাটি শোনান; উমর (রা.) খুশিতে প্রশ্ন করেন: হে আল্লাহর রাসূল, এটি কি সত্যিই বিজয়? তিনি বললেন: হ্যাঁ!',
            ],
            pointsEn: [
              'On the return journey, Surah al-Fath was revealed: “Indeed, We have granted you a clear conquest.”',
              'Called to hear it, Umar (RA) asked joyfully if it was truly victory, and the Prophet (PBUH) affirmed: “Yes!”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪১৭২; সূরা আল-ফাতহ: ১',
            sourceEn: 'Sahih al-Bukhari, Hadith 4172; Surah al-Fath 48:1',
          },
        ],
      },
      {
        phaseNo: 6,
        titleBn: 'সন্ধির সুদূরপ্রসারী ফল',
        titleEn: 'Far-Reaching Fruits of Peace',
        events: [
          {
            titleBn: 'বিশ্বরাজাদের কাছে ইসলামের দাওয়াতপত্র',
            titleEn: 'Letters to World Emperors',
            pointsBn: [
              'দশ বছরের শান্তি নিশ্চিত হওয়ায় নবীজি (সা.) রোম সম্রাট হিরাক্লিয়াস, পারস্য সম্রাট খসরু, মিশরের মুকাওকিস ও আবিসিনিয়ার নাজ্জাশির কাছে দাওয়াতি পত্র পাঠান।',
              'ইসলাম আরব উপদ্বীপ ছাড়িয়ে বিশ্বমঞ্চে রাষ্ট্রীয়ভাবে স্বীকৃত দাওয়াতি শক্তিতে পরিণত হয়।',
            ],
            pointsEn: [
              'With ten years of peace secured, the Prophet (PBUH) sent diplomatic letters inviting Heraclius, Chosroes, al-Muqawqis, and the Negus to Islam.',
              'Islam stepped onto the global stage as a recognized sovereign mission.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৭, ২৯৪০',
            sourceEn: 'Sahih al-Bukhari, Hadith 7, 2940',
          },
          {
            titleBn: 'খালিদ (রা.) ও আমর ইবনুল আস (রা.)-এর ইসলাম গ্রহণ',
            titleEn: 'Conversion of Khalid & Amr ibn al-As (RA)',
            pointsBn: [
              'হুদাইবিয়ার শান্তির পরিবেশে অবাধ মেলামেশার ফলে মাত্র দুই বছরে আগের ১৮ বছরের চেয়েও বেশি মানুষ ইসলাম গ্রহণ করে।',
              'কুরাইশের দুই সেরা রণকৌশলী খালিদ ইবনে ওয়ালিদ (রা.) ও আমর ইবনুল আস (রা.) মদিনায় এসে ইসলাম গ্রহণ করেন।',
            ],
            pointsEn: [
              'In the two years of peaceful interaction after Hudaybiyyah, more people entered Islam than in all eighteen previous years combined.',
              'Quraysh’s finest strategists, Khalid ibn al-Walid and Amr ibn al-As (RA), traveled to Madinah and embraced Islam.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'মক্কা বিজয়ের প্রশস্ত দ্বার',
            titleEn: 'Gateway to the Conquest of Makkah',
            pointsBn: [
              'হুদাইবিয়ায় মুসলিমদের সংখ্যা ছিল ১,৪০০, আর মাত্র দুই বছর পর মক্কা বিজয়ের সময় সেই সংখ্যা পৌঁছায় ১০,০০০ জনে।',
              'ইমাম যুহরি (রহ.) বলেন: ইসলামের ইতিহাসে হুদাইবিয়ার সন্ধির চেয়ে বড় কোনো বিজয় আগে অর্জিত হয়নি।',
            ],
            pointsEn: [
              'From 1,400 companions at Hudaybiyyah, the Muslim force grew to 10,000 just two years later at the Conquest of Makkah.',
              'Imam al-Zuhri remarked: “No greater victory had ever occurred in Islam before the Treaty of Hudaybiyyah.”',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; ফাতহুল বারী',
            sourceEn: 'Sirah Ibn Hisham; Fath al-Bari',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // ৫. খাইবার যুদ্ধ — ৬ পর্বে ১৬টি প্রামাণ্য ঘটনা
  // =========================================================================
  khaibar: buildWarBundle({
    warId: 'khaibar',
    datePlaceBn: '৭ম হিজরির মুহাররম · খাইবার দুর্গ অঞ্চল, মদিনার উত্তরে',
    datePlaceEn: 'Muharram 7 AH · Fortresses of Khaybar, North of Madinah',
    battleShortBn: 'খাইবার যুদ্ধ',
    battleShortEn: 'Conquest of Khaybar',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'প্রেক্ষাপট ও যাত্রা',
        titleEn: 'Background & March',
        events: [
          {
            titleBn: 'ষড়যন্ত্রের কেন্দ্র খাইবার',
            titleEn: 'Khaybar: Hub of Hostile Plots',
            pointsBn: [
              'খন্দকের যুদ্ধের মূল পরিকল্পনাকারী বনু নাযিরের নেতারা খাইবারে আশ্রয় নিয়ে আবারও গাতাফান ও আরব গোত্রদের নিয়ে মদিনা আক্রমণের ষড়যন্ত্র করছিল।',
              'হুদাইবিয়ার সন্ধির ফলে দক্ষিণ দিক নিরাপদ হওয়ায় নবীজি (সা.) উত্তরের এই হুমকি চিরতরে দূর করার সিদ্ধান্ত নেন।',
            ],
            pointsEn: [
              'Banu Nadir leaders who masterminded the Trench had entrenched themselves in Khaybar, plotting new alliances with Ghatafan against Madinah.',
              'With the southern front secured by Hudaybiyyah, the Prophet (PBUH) moved decisively to neutralize the northern threat.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'শুধু বাইআতে রিদওয়ানের ১,৪০০ সাহাবির অংশগ্রহণ',
            titleEn: 'Exclusively the 1,400 Companions of Hudaybiyyah',
            pointsBn: [
              'আল্লাহর প্রতিশ্রুত ‘আসন্ন বিজয় ও বিপুল গনিমত’ অনুযায়ী কেবল হুদাইবিয়ায় অংশগ্রহণকারী ১,৪০০ নিবেদিতপ্রাণ সাহাবিকে এই অভিযানে নেওয়া হয়।',
              'যাত্রাপথে সাহাবিরা উচ্চস্বরে তাকবির দিলে নবীজি (সা.) বললেন: ‘তোমরা কোনো বধির বা অনুপস্থিত সত্তাকে ডাকছ না, বরং সর্বশ্রোতা ও নিকটবর্তী আল্লাহকে ডাকছ।’',
            ],
            pointsEn: [
              'In fulfillment of Surah al-Fath’s promise, only the 1,400 loyal veterans of Hudaybiyyah were permitted to march.',
              'When they raised their voices in Takbir, the Prophet (PBUH) gently reminded them: “You are not calling upon one deaf or distant, but One All-Hearing and Near.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২০৫; সূরা আল-ফাতহ: ১৮–২০',
            sourceEn: 'Sahih al-Bukhari, Hadith 4205; Surah al-Fath 48:18–20',
          },
          {
            titleBn: 'খাইবারের ফজরের আকস্মিক উপস্থিতি',
            titleEn: 'Dawn Arrival Before Khaybar',
            pointsBn: [
              'নবীজি (সা.) রাতের আঁধারে খাইবারে পৌঁছে ফজর পর্যন্ত অপেক্ষা করেন; সকালে খাইবারবাসীরা কোদাল-ঝুড়ি নিয়ে বের হয়ে মুসলিম বাহিনী দেখে চমকে ওঠে।',
              'নবীজি (সা.) তাকবির দিয়ে বলেন: ‘আল্লাহু আকবার, খাইবার ধ্বংস হলো! আমরা যখন কোনো জাতির আঙিনায় নামি, তখন সতর্কীকৃতদের প্রভাত মন্দ হয়।’',
            ],
            pointsEn: [
              'Arriving by night, the Prophet (PBUH) waited until dawn; Khaybar’s farmers walked out with spades and baskets to find the Muslim army before them.',
              'The Prophet proclaimed: “Allahu Akbar, Khaybar is ruined! When we descend upon a people’s courtyard, evil is the morning of those warned.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪১৯৭, ৪১৯৯',
            sourceEn: 'Sahih al-Bukhari, Hadith 4197, 4199',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'প্রাথমিক দুর্গসমূহের পতন',
        titleEn: 'Fall of the Outer Fortresses',
        events: [
          {
            titleBn: 'গাতাফান জোটের পশ্চাদপসরণ',
            titleEn: 'Retreat of the Ghatafan Allies',
            pointsBn: [
              'খাইবারের মিত্র গাতাফান গোত্র সাহায্য করতে এগিয়ে এলেও পেছনে নিজেদের বসতি আক্রান্ত হওয়ার আশঙ্কায় যুদ্ধ না করেই ফিরে যায়।',
              'ফলে খাইবারের ৮টি সুরক্ষিত দুর্গ একে একে মুসলিমদের অবরোধের মুখে পড়ে।',
            ],
            pointsEn: [
              'Khaybar’s allies from Ghatafan marched to help but turned back fearing for their own undefended homes.',
              'Khaybar’s eight fortified strongholds were left to face the siege alone.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আর-রাহীকুল মাখতূম',
            sourceEn: 'Sirah Ibn Hisham; Ar-Raheeq al-Makhtum',
          },
          {
            titleBn: 'নাঈম ও সা‘ব দুর্গ বিজয়',
            titleEn: 'Capture of Hisn Na‘im & Hisn Sa‘b',
            pointsBn: [
              'প্রথম প্রতিরক্ষা দুর্গ নাঈম জয়ের মাধ্যমে লড়াইয়ের সূচনা হয়; এখানে সাহাবি মাহমুদ ইবনে মাসলামাহ (রা.) দুর্গের ওপর থেকে ফেলা পাথরে শহীদ হন।',
              'হুবাব ইবনুল মুনযির (রা.)-এর তিন দিনের অবরোধে সা‘ব দুর্গ পতিত হলে ক্ষুধার্ত মুসলিমরা বিপুল খাদ্যভাণ্ডার লাভ করেন।',
            ],
            pointsEn: [
              'Fighting opened at Fort Na‘im, where Mahmud ibn Maslamah (RA) was martyred by a millstone hurled from the ramparts.',
              'After a three-day siege led by al-Hubab (RA), Fort Sa‘b fell, supplying abundant food to the hungry army.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; সহীহ আল-বুখারী',
            sourceEn: 'Sirah Ibn Hisham; Sahih al-Bukhari',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'কামুস দুর্গ ও আলী (রা.)-এর বীরত্ব',
        titleEn: 'Fort Qamus & Ali’s (RA) Heroism',
        events: [
          {
            titleBn: '‘আগামীকাল পতাকা দেব এমন একজনের হাতে...’',
            titleEn: '“Tomorrow I Shall Give the Banner to One…”',
            subtitleBn: 'খাইবারের শ্রেষ্ঠ সুসংবাদ',
            subtitleEn: 'The Greatest Honor of Khaybar',
            pointsBn: [
              'দুর্ভেদ্য কামুস দুর্গ কয়েক দিনেও জয় না হওয়ায় নবীজি (সা.) ঘোষণা দেন: আগামীকাল এমন এক ব্যক্তিকে পতাকা দেব যিনি আল্লাহ ও রাসূলকে ভালোবাসেন এবং আল্লাহ ও রাসূল তাঁকে ভালোবাসেন।',
              'পরদিন সকালে সবাই আশায় তাকিয়ে থাকলেন; নবীজি (সা.) ডাকলেন: ‘আলী ইবনে আবি তালিব কোথায়?’',
            ],
            pointsEn: [
              'After Fort Qamus resisted for days, the Prophet (PBUH) declared: “Tomorrow I will give the banner to a man who loves Allah and His Messenger, and whom Allah and His Messenger love.”',
              'The next morning, every companion hoped for the honor, until the Prophet asked: “Where is Ali ibn Abi Talib?”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২১০; সহীহ মুসলিম, হাদিস নং ২৪০৬',
            sourceEn: 'Sahih al-Bukhari, Hadith 4210; Sahih Muslim, Hadith 2406',
          },
          {
            titleBn: 'চক্ষুরোগের অলৌকিক আরোগ্য ও ইসলামের দাওয়াত',
            titleEn: 'Miraculous Healing of Ali’s Eyes',
            pointsBn: [
              'আলী (রা.) তীব্র চক্ষুরোগে ভুগছিলেন; নবীজি (সা.) তাঁর চোখে থুথু মোবারক লাগিয়ে দোয়া করতেই এমন সুস্থ হন যেন কোনো ব্যথাই ছিল না।',
              'নবীজি (সা.) নির্দেশ দেন: লড়াইয়ের আগে তাদের ইসলামের দাওয়াত দেবে—তোমার মাধ্যমে একজনের হিদায়াত লাল উটের চেয়েও উত্তম।',
            ],
            pointsEn: [
              'Suffering from severe eye inflammation, Ali (RA) was instantly healed when the Prophet (PBUH) applied his saliva and prayed for him.',
              'The Prophet instructed: “Invite them to Islam first; for Allah to guide one person through you is better than red camels.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২১০',
            sourceEn: 'Sahih al-Bukhari, Hadith 4210',
          },
          {
            titleBn: 'দুর্ধর্ষ যোদ্ধা মারহাব নিহত ও দুর্গের লোহার কপাট',
            titleEn: 'Slaying of Marhab & Opening of Qamus',
            pointsBn: [
              'খাইবারের সবচেয়ে ভয়ংকর বীর মারহাব কবিতা আবৃত্তি করতে করতে বের হলে আলী (রা.) এক প্রচণ্ড আঘাতে তার শিরস্ত্রাণ ও মস্তক দ্বিখণ্ডিত করেন।',
              'ঢাল হাত থেকে পড়ে গেলে আলী (রা.) দুর্গের ভারী কপাট উপড়ে ঢাল হিসেবে ব্যবহার করেন এবং আল্লাহর সাহায্যে কামুস দুর্গ বিজিত হয়।',
            ],
            pointsEn: [
              'Khaybar’s champion Marhab strode out reciting boastful verses; Ali (RA) met him and clove his helmet with a single mighty blow.',
              'Using a massive fortress gate as a shield when his own fell, Ali (RA) spearheaded the conquest of Fort Qamus.',
            ],
            sourceBn: 'সহীহ মুসলিম, হাদিস নং ১৮০৭; সীরাতে ইবনে হিশাম',
            sourceEn: 'Sahih Muslim, Hadith 1807; Sirah Ibn Hisham',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'সকল দুর্গের আত্মসমর্পণ ও চুক্তি',
        titleEn: 'Surrender & Agricultural Accord',
        events: [
          {
            titleBn: 'ওয়াতিহ ও সুলালেম দুর্গের আত্মসমর্পণ',
            titleEn: 'Surrender of al-Watih & al-Sulalim',
            pointsBn: [
              'কামুসের পতনের পর শেষ দুটি দুর্গ ওয়াতিহ ও সুলালেম ১৪ দিন অবরুদ্ধ থেকে বিনা রক্তপাতে আত্মসমর্পণ করে।',
              'ফাদাক ও ওয়াদিল কুরার অধিবাসীরাও শান্তিপূর্ণ চুক্তিতে আবদ্ধ হয়।',
            ],
            pointsEn: [
              'After Qamus fell, the final forts al-Watih and al-Sulalim surrendered peacefully following a 14-day siege.',
              'Fadak and Wadi al-Qura soon entered peaceful accords as well.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; সহীহ আল-বুখারী',
            sourceEn: 'Sirah Ibn Hisham; Sahih al-Bukhari',
          },
          {
            titleBn: 'অর্ধেক ফসলের বিনিময়ে ভূমি চাষের চুক্তি',
            titleEn: 'Sharecropping Treaty of Khaybar',
            pointsBn: [
              'ইহুদিরা কৃষিকাজে অভিজ্ঞ হওয়ায় অর্ধেক ফসল মুসলিম রাষ্ট্রকে দেওয়ার শর্তে খাইবারে চাষাবাদের অনুমতি চায়।',
              'নবীজি (সা.) উদারতা দেখিয়ে এই শর্ত মেনে নেন, যার ফলে মদিনার অর্থনীতি সচ্ছল হয়ে ওঠে।',
            ],
            pointsEn: [
              'Experienced in agriculture, the inhabitants requested to remain and cultivate the oasis for half of its annual yield.',
              'The Prophet (PBUH) graciously agreed, transforming Madinah’s economic stability.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৪৮; সহীহ মুসলিম, হাদিস নং ১৫৫১',
            sourceEn: 'Sahih al-Bukhari, Hadith 4248; Sahih Muslim, Hadith 1551',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'বিশেষ ঘটনা ও বিধান',
        titleEn: 'Notable Incidents & Rulings',
        events: [
          {
            titleBn: 'এক রাখালের ইসলাম গ্রহণ ও বিনা নামাজে জান্নাত',
            titleEn: 'The Shepherd Who Entered Paradise Without a Single Prayer',
            pointsBn: [
              'ইয়াসার নামের এক কৃষ্ণাঙ্গ রাখাল খাইবারের ছাগল চরাতে চরাতে ইসলাম গ্রহণ করেন; নবীজি (সা.) আগে মালিকের ছাগল ফিরিয়ে দেওয়ার নির্দেশ দেন।',
              'আমানত ফিরিয়ে দিয়ে যুদ্ধে যোগ দিয়েই তিনি শহীদ হন; নবীজি (সা.) সুসংবাদ দেন যে একটি সিজদা করার সুযোগ না পেয়েও তিনি জান্নাতি।',
            ],
            pointsEn: [
              'A shepherd named Yasar embraced Islam during the siege; the Prophet (PBUH) first ordered him to return his master’s flock safely.',
              'Joining the battle immediately afterward, he was martyred—entering Paradise before ever praying a single prayer.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-ইসাবাহ',
            sourceEn: 'Sirah Ibn Hisham; Al-Isabah',
          },
          {
            titleBn: 'বিষ মেশানো ভুনা ছাগল ও অলৌকিক রক্ষা',
            titleEn: 'The Poisoned Roasted Lamb',
            pointsBn: [
              'সাল্লাম ইবনে মিশকামের স্ত্রী যায়নাব ভুনা ছাগলের মাংসে মারাত্মক বিষ মিশিয়ে নবীজি (সা.)-কে উপহার দেয়।',
              'এক গ্রাস মুখে নিতেই মাংস জানিয়ে দিল এতে বিষ আছে; নবীজি (সা.) তা ফেলে দিলেন, তবে বিশর ইবনে বারা (রা.) গিলে ফেলায় শহীদ হন।',
            ],
            pointsEn: [
              'Zaynab bint al-Harith gifted the Prophet (PBUH) a poisoned roasted lamb.',
              'After one bite, the meat warned him of poison and he spat it out, though companion Bishr ibn al-Bara (RA) succumbed after swallowing.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৪৯; সুনান আবু দাউদ, হাদিস নং ৪৫১২',
            sourceEn: 'Sahih al-Bukhari, Hadith 4249; Sunan Abu Dawud, Hadith 4512',
          },
          {
            titleBn: 'জাফর ইবনে আবি তালিব (রা.)-এর হাবশা থেকে আগমন',
            titleEn: 'Return of Ja‘far ibn Abi Talib (RA) from Abyssinia',
            pointsBn: [
              'খাইবার বিজয়ের দিনেই নবীজি (সা.)-এর চাচাতো ভাই জাফর (রা.) হাবশার মুহাজিরদের নিয়ে ফিরে আসেন।',
              'আনন্দিত নবীজি (সা.) তাঁকে জড়িয়ে ধরে কপালে চুমু খেয়ে বলেন: ‘আমি জানি না কোনটিতে বেশি খুশি হব—খাইবার বিজয়ে নাকি জাফরের আগমনে!’',
            ],
            pointsEn: [
              'On the very day Khaybar fell, Ja‘far ibn Abi Talib (RA) arrived with the emigrants returning from Abyssinia.',
              'Embracing him, the Prophet (PBUH) exclaimed: “I know not which brings me greater joy—the conquest of Khaybar or the return of Ja‘far!”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৩০; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sahih al-Bukhari, Hadith 4230; Al-Bidayah wan-Nihayah',
          },
        ],
      },
      {
        phaseNo: 6,
        titleBn: 'খাইবারের ফলাফল ও শিক্ষা',
        titleEn: 'Outcome & Legacy',
        events: [
          {
            titleBn: 'সাফিয়্যাহ বিনতে হুয়াই (রা.)-এর সাথে বিবাহ',
            titleEn: 'Marriage to Lady Safiyyah (RA)',
            pointsBn: [
              'নবীজি (সা.) বন্দী সাফিয়্যাহ বিনতে হুয়াই (রা.)-কে স্বাধীন করে ইসলাম গ্রহণের পর বিবাহ করেন এবং তাঁকে উম্মুল মুমিনীন মর্যাদা দেন।',
              'এই উদারতার ফলে বহু গোত্রের সাথে সামাজিক সৌহার্দ্য স্থাপিত হয়।',
            ],
            pointsEn: [
              'The Prophet (PBUH) freed Safiyyah bint Huyayy (RA) and married her upon her acceptance of Islam, honoring her as Mother of the Believers.',
              'This noble act fostered dignity and reconciliation.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২১১',
            sourceEn: 'Sahih al-Bukhari, Hadith 4211',
          },
          {
            titleBn: 'গৃহপালিত গাধা ও মুত‘আ নিষিদ্ধ ঘোষণা',
            titleEn: 'Legal Rulings Enacted at Khaybar',
            pointsBn: [
              'খাইবারের দিনেই গৃহপালিত গাধার মাংস খাওয়া এবং অস্থায়ী মুত‘আ বিবাহ চিরতরে হারাম ঘোষণা করা হয়।',
              'পাশাপাশি নবীজি (সা.) গনিমতে খেয়ানত (গুলূল) থেকে কঠোরভাবে সতর্ক করেন।',
            ],
            pointsEn: [
              'At Khaybar, domestic donkey meat and temporary marriage (Mut‘ah) were permanently prohibited.',
              'The Prophet (PBUH) also issued a strict warning against embezzling war spoils.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২১৬, ৪২৩৪',
            sourceEn: 'Sahih al-Bukhari, Hadith 4216, 4234',
          },
          {
            titleBn: 'উত্তর সীমান্তের নিরাপত্তা ও অর্থনৈতিক সমৃদ্ধি',
            titleEn: 'Northern Security & Economic Prosperity',
            pointsBn: [
              'আয়েশা (রা.) বলেন: খাইবার বিজয়ের পর আমরা বললাম—‘এখন থেকে আমরা পেট ভরে খেজুর খেতে পারব।’',
              'খাইবার বিজয়ের মাধ্যমে মদিনার উত্তর সীমান্তের দীর্ঘমেয়াদি ষড়যন্ত্রের অবসান ঘটে।',
            ],
            pointsEn: [
              'Aishah (RA) remarked: “When Khaybar was conquered, we said: Now we shall eat our fill of dates.”',
              'The victory ended decades of northern plots and strengthened the Islamic state.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৪২',
            sourceEn: 'Sahih al-Bukhari, Hadith 4242',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // ৬. মক্কা বিজয় — ৭ পর্বে ২১টি প্রামাণ্য ঘটনা
  // =========================================================================
  makkah_conquest: buildWarBundle({
    warId: 'makkah_conquest',
    datePlaceBn: '৮ম হিজরির ২০ রমজান · পবিত্র মক্কা মুকাররমা',
    datePlaceEn: '20 Ramadan 8 AH · Sacred City of Makkah',
    battleShortBn: 'মক্কা বিজয়',
    battleShortEn: 'Conquest of Makkah',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'কুরাইশের সন্ধিভঙ্গ',
        titleEn: 'Quraysh Breaks the Treaty',
        events: [
          {
            titleBn: 'খুযাআ গোত্রের ওপর রাতের অন্ধকারে হামলা',
            titleEn: 'Night Massacre of Banu Khuza‘ah',
            pointsBn: [
              'হুদাইবিয়ার সন্ধির শর্ত ভেঙে কুরাইশের মিত্র বনু বকর অস্ত্র ও লোকবলসহ রাতের আঁধারে মুসলিমদের মিত্র বনু খুযাআর ওপর হামলা চালায়।',
              'পবিত্র হারাম সীমানার ভেতরেও ২৩ জন নিরীহ মানুষকে হত্যা করা হয়।',
            ],
            pointsEn: [
              'Violating Hudaybiyyah, Quraysh secretly armed Banu Bakr for a night attack on the Muslims’ ally Banu Khuza‘ah.',
              'Twenty-three innocent people were slain even within the sacred sanctuary of Makkah.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; সহীহ আল-বুখারী',
            sourceEn: 'Sirah Ibn Hisham; Sahih al-Bukhari',
          },
          {
            titleBn: 'আমর ইবনে সালিমের ফরিয়াদ',
            titleEn: 'Amr ibn Salim’s Appeal in Madinah',
            pointsBn: [
              'খুযাআ নেতা আমর ইবনে সালিম দ্রুত মদিনায় এসে মসজিদে নববীতে দাঁড়িয়ে মর্মস্পর্শী কবিতায় নবীজি (সা.)-এর সাহায্য চান।',
              'নবীজি (সা.) দৃঢ় কণ্ঠে ঘোষণা করেন: ‘হে আমর ইবনে সালিম, তোমাকে অবশ্যই সাহায্য করা হবে!’',
            ],
            pointsEn: [
              'Khuza‘ah spokesman Amr ibn Salim raced to Masjid al-Nabawi and recited a poignant poem appealing for aid.',
              'The Prophet (PBUH) rose and pledged: “You shall indeed be helped, O Amr ibn Salim!”',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আর-রাহীকুল মাখতূম',
            sourceEn: 'Sirah Ibn Hisham; Ar-Raheeq al-Makhtum',
          },
          {
            titleBn: 'আবু সুফিয়ানের ব্যর্থ মদিনা সফর',
            titleEn: 'Abu Sufyan’s Failed Mission to Madinah',
            pointsBn: [
              'ভুলের ভয়াবহতা বুঝে আবু সুফিয়ান সন্ধি নবায়নের আশায় মদিনায় ছুটে আসেন; কন্যা উম্মে হাবিবা (রা.) তাঁকে নবীজির বিছানায় বসতে দেননি।',
              'নবীজি (সা.), আবু বকর, উমর, আলী ও ফাতিমা (রা.)—কেউই একতরফা চুক্তিভঙ্গ মেনে না নেওয়ায় তিনি শূন্য হাতে ফিরে যান।',
            ],
            pointsEn: [
              'Alarmed by the breach, Abu Sufyan hurried to Madinah to renew the truce; his own daughter Umm Habibah (RA) folded away the Prophet’s mat from him.',
              'Finding no concessions from the Prophet or senior companions, he returned to Makkah empty-handed.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'গোপন প্রস্তুতি ও ১০,০০০ বাহিনীর যাত্রা',
        titleEn: 'Secret Mobilization of 10,000',
        events: [
          {
            titleBn: 'গোপনীয়তার দোয়া ও হাতিব (রা.)-এর চিঠি',
            titleEn: 'Secrecy Prayer & Hatib’s (RA) Letter',
            pointsBn: [
              'মক্কায় রক্তপাত এড়াতে নবীজি (সা.) পূর্ণ গোপনীয়তা বজায় রাখার দোয়া করেন: ‘হে আল্লাহ, কুরাইশের চোখ ও কান বন্ধ করে দাও যাতে আমরা হঠাৎ পৌঁছাতে পারি।’',
              'হাতিব (রা.) মক্কায় থাকা পরিবারের নিরাপত্তার চিন্তায় গোপনে চিঠি পাঠালে ওহির মাধ্যমে তা ধরা পড়ে; বদরি সাহাবি হওয়ায় নবীজি (সা.) তাঁকে ক্ষমা করেন।',
            ],
            pointsEn: [
              'To conquer Makkah without bloodshed, the Prophet (PBUH) prayed that Quraysh remain unaware until his sudden arrival.',
              'Hatib’s secret letter—sent out of concern for his family in Makkah—was intercepted via revelation; the Prophet forgave him as a veteran of Badr.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৭৪; সূরা মুমতাহিনা: ১',
            sourceEn: 'Sahih al-Bukhari, Hadith 4274; Surah al-Mumtahanah 60:1',
          },
          {
            titleBn: '১০ রমজান ১০,০০০ সাহাবির ঐতিহাসিক যাত্রা',
            titleEn: '10,000 Companions March on 10 Ramadan',
            pointsBn: [
              '৮ম হিজরির ১০ রমজান নবীজি (সা.) ১০,০০০ সাহাবির বিশাল বাহিনী নিয়ে মক্কার উদ্দেশে যাত্রা করেন।',
              'পথে ক্লান্তি দূর করতে কাদীদ নামক স্থানে রোজা ভেঙে সবাইকে ইফতারের নির্দেশ দেন এবং চাচা আব্বাস (রা.) সপরিবারে হিজরত করে পথেই মিলিত হন।',
            ],
            pointsEn: [
              'On 10 Ramadan 8 AH, the Prophet (PBUH) led 10,000 companions toward Makkah.',
              'At al-Kadid he broke his fast publicly to ease the troops’ journey, and his uncle al-Abbas (RA) joined him on the road.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৭৬, ৪২৭৯',
            sourceEn: 'Sahih al-Bukhari, Hadith 4276, 4279',
          },
          {
            titleBn: 'মাররুয যাহরানে ১০,০০০ অগ্নিকুণ্ড',
            titleEn: '10,000 Campfires at Marr al-Zahran',
            pointsBn: [
              'মক্কার উপকণ্ঠে মাররুয যাহরানে পৌঁছে নবীজি (সা.) প্রতিটি সৈন্যকে আলাদা আলাদা আগুন জ্বালানোর নির্দেশ দেন।',
              'রাতের আঁধারে পাহাড়জুড়ে ১০,০০০ আগুনের আলো দেখে মক্কাবাসীর সব অহংকার ও যুদ্ধের মানসিকতা ভেঙে পড়ে।',
            ],
            pointsEn: [
              'Encamping at Marr al-Zahran outside Makkah, the Prophet (PBUH) ordered every soldier to light a separate campfire.',
              'Seeing 10,000 flames illuminate the valley, Makkah’s will to resist melted away.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'আবু সুফিয়ানের ইসলাম গ্রহণ ও নিরাপত্তার ঘোষণা',
        titleEn: 'Abu Sufyan’s Islam & Amnesty',
        events: [
          {
            titleBn: 'আবু সুফিয়ানের ইসলাম গ্রহণ',
            titleEn: 'Abu Sufyan Embraces Islam',
            pointsBn: [
              'আব্বাস (রা.) রক্তপাত এড়াতে রাতের আঁধারে আবু সুফিয়ানকে নবীজি (সা.)-এর তাঁবুতে নিয়ে আসেন।',
              'পরদিন সকালে ইসলামের সত্যতা উপলব্ধি করে কুরাইশ প্রধান আবু সুফিয়ান কালিমা পড়ে ইসলাম গ্রহণ করেন।',
            ],
            pointsEn: [
              'To prevent bloodshed, al-Abbas (RA) escorted Abu Sufyan into the Muslim camp by night.',
              'By morning, the Quraysh chieftain testified to the truth of Islam and embraced faith.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; সহীহ মুসলিম',
            sourceEn: 'Sirah Ibn Hisham; Sahih Muslim',
          },
          {
            titleBn: 'সাধারণ নিরাপত্তার ঐতিহাসিক ঘোষণা',
            titleEn: 'Proclamation of General Sanctuary',
            pointsBn: [
              'নবীজি (সা.) ঘোষণা করেন: ‘যে আবু সুফিয়ানের ঘরে প্রবেশ করবে সে নিরাপদ, যে নিজের ঘরের দরজা বন্ধ রাখবে সে নিরাপদ, আর যে মসজিদুল হারামে প্রবেশ করবে সে নিরাপদ।’',
              'এতে মক্কায় বিনা প্রতিরোধে শান্তিপূর্ণ প্রবেশের পথ সম্পূর্ণ উন্মুক্ত হয়।',
            ],
            pointsEn: [
              'The Prophet (PBUH) proclaimed: “Whoever enters Abu Sufyan’s house is safe; whoever locks his own door is safe; whoever enters Masjid al-Haram is safe.”',
              'This magnanimous decree paved the way for a virtually bloodless entry.',
            ],
            sourceBn: 'সহীহ মুসলিম, হাদিস নং ১৭৮০',
            sourceEn: 'Sahih Muslim, Hadith 1780',
          },
          {
            titleBn: '‘আজ প্রতিশোধের নয়, দয়া ও ক্ষমার দিন’',
            titleEn: '“Today Is the Day of Mercy”',
            pointsBn: [
              'এক সাহাবি আবেগে ‘আজ যুদ্ধের দিন’ স্লোগান দিলে নবীজি (সা.) সাথে সাথে তাঁকে থামিয়ে পতাকা তাঁর পুত্র কায়েস (রা.)-এর হাতে দেন।',
              'নবীজি (সা.) ঘোষণা দেন: ‘আজ কাবা শরিফের মর্যাদা বৃদ্ধির দিন, আজ করুণা ও দয়ার দিন (ইয়াওমুল মারহামাহ)।’',
            ],
            pointsEn: [
              'When a standard-bearer exclaimed “Today is the day of slaughter,” the Prophet (PBUH) immediately transferred the banner to his son Qays.',
              'He declared: “Rather, today is the day Allah honors the Ka‘bah—the Day of Mercy.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৮০',
            sourceEn: 'Sahih al-Bukhari, Hadith 4280',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'চার দিক থেকে বিনয়াবনত প্রবেশ',
        titleEn: 'Humble Entry from Four Sides',
        events: [
          {
            titleBn: 'চারটি সেনাদলের সুশৃঙ্খল প্রবেশ',
            titleEn: 'Disciplined Four-Column Entry',
            pointsBn: [
              'নবীজি (সা.) বাহিনীকে চারটি দলে ভাগ করে চার দিক থেকে মক্কায় প্রবেশের নির্দেশ দেন এবং আক্রান্ত না হলে অস্ত্র না তোলার কঠোর আদেশ দেন।',
              'কেবল দক্ষিণ দিক থেকে খালিদ (রা.)-এর দলের ওপর ইকরিমা ও সাফওয়ানের অনুসারীরা তীর ছুড়লে সংক্ষিপ্ত সংঘর্ষে ১২ জন কাফির ও ২ জন মুসলিম নিহত হন।',
            ],
            pointsEn: [
              'Dividing the army into four columns, the Prophet (PBUH) strictly forbade fighting unless attacked.',
              'Only Khalid’s southern column met brief resistance from Ikrimah’s men, resulting in minimal casualties before peace prevailed.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৮০; সহীহ মুসলিম, হাদিস নং ১৭৮০',
            sourceEn: 'Sahih al-Bukhari, Hadith 4280; Sahih Muslim, Hadith 1780',
          },
          {
            titleBn: 'নবীজি (সা.)-এর অতুলনীয় বিনয়',
            titleEn: 'Unmatched Humility of the Victorious Prophet',
            pointsBn: [
              '১৩ বছর নির্যাতিত হয়ে বের হয়ে যাওয়া নবীজি (সা.) মহাবিজয়ী হিসেবে মক্কায় ঢোকার সময় আল্লাহর কৃতজ্ঞতায় মাথা এতটা নত করেছিলেন যে তাঁর দাড়ি উটের গদিতে প্রায় লেগে যাচ্ছিল।',
              'তিনি অত্যন্ত মৃদু ও বিনম্র কণ্ঠে সূরা আল-ফাতহ তিলাওয়াত করতে করতে এগোচ্ছিলেন।',
            ],
            pointsEn: [
              'Entering Makkah in total triumph, the Prophet (PBUH) bowed his head so low in gratitude to Allah that his beard nearly touched his camel’s saddle.',
              'He softly recited Surah al-Fath throughout his entry.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৮১; সহীহ মুসলিম, হাদিস নং ৭৯৪',
            sourceEn: 'Sahih al-Bukhari, Hadith 4281; Sahih Muslim, Hadith 794',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'কাবা পবিত্রকরণ ও প্রথম আজান',
        titleEn: 'Purification of the Ka‘bah & First Adhan',
        events: [
          {
            titleBn: '৩৬০টি মূর্তি অপসারণ: ‘সত্য এসেছে, মিথ্যা বিলুপ্ত’',
            titleEn: 'Clearing 360 Idols: “Truth Has Come”',
            pointsBn: [
              'কাবা শরিফ তাওয়াফের সময় নবীজি (সা.) হাতের লাঠি দিয়ে ৩৬০টি মূর্তির দিকে ইশারা করে তিলাওয়াত করেন: ‘সত্য এসেছে এবং মিথ্যা বিলুপ্ত হয়েছে।’',
              'ইশারা মাত্র মূর্তিগুলো একে একে মুখ থুবড়ে পড়ে ভেঙে যেতে থাকে এবং কাবাঘর চিরতরে শিরকমুক্ত হয়।',
            ],
            pointsEn: [
              'Pointing his staff at the 360 idols around the Ka‘bah, the Prophet (PBUH) recited: “Truth has come, and falsehood has vanished.”',
              'The idols toppled one by one as the Sacred House was purified of idolatry forever.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ২৪৭৮, ৪২৮৭; সূরা বনী ইসরাঈল: ৮১',
            sourceEn: 'Sahih al-Bukhari, Hadith 2478, 4287; Surah al-Isra 17:81',
          },
          {
            titleBn: 'কাবার ভেতরে সালাত ও চাবি ফিরিয়ে দেওয়া',
            titleEn: 'Prayer Inside the Ka‘bah & Returning Its Keys',
            pointsBn: [
              'নবীজি (সা.) উসমান ইবনে তালহা (রা.)-এর কাছ থেকে কাবার চাবি নিয়ে ভেতরে দুই রাকাত নফল নামাজ আদায় করেন।',
              'আমানত রক্ষার সূরা নিসার ৫৮ নম্বর আয়াত অনুযায়ী তিনি চাবিটি আবার উসমান ইবনে তালহা (রা.)-এর বংশধরদের স্থায়ীভাবে ফিরিয়ে দেন।',
            ],
            pointsEn: [
              'After praying two rak‘ahs inside the Ka‘bah, the Prophet (PBUH) honored Surah an-Nisa 4:58 by returning its keys permanently to Uthman ibn Talhah’s family.',
              'Their descendants remain custodians of the Ka‘bah’s keys to this day.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৮৯; সূরা নিসা: ৫৮',
            sourceEn: 'Sahih al-Bukhari, Hadith 4289; Surah an-Nisa 4:58',
          },
          {
            titleBn: 'কাবার ছাদে বিলাল (রা.)-এর ঐতিহাসিক আজান',
            titleEn: 'Bilal’s (RA) Historic Adhan Atop the Ka‘bah',
            pointsBn: [
              'যোহরের ওয়াক্তে নবীজি (সা.)-এর নির্দেশে একসময়ের নির্যাতিত কৃষ্ণাঙ্গ দাস বিলাল (রা.) কাবা শরিফের ছাদে উঠে তাওহীদের আজান ধ্বনিত করেন।',
              'এটি ছিল বর্ণবৈষম্যের অবসান ও ইসলামের সাম্যের বিশ্বজয়ী মুহূর্ত।',
            ],
            pointsEn: [
              'At Dhuhr, Bilal (RA)—once tortured in Makkah’s burning sand—climbed atop the Ka‘bah to proclaim the call to prayer.',
              'His voice rang across the valley as the ultimate triumph of Tawhid and human equality.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
        ],
      },
      {
        phaseNo: 6,
        titleBn: 'বিশ্ব ইতিহাসের শ্রেষ্ঠ সাধারণ ক্ষমা',
        titleEn: 'Greatest General Amnesty in History',
        events: [
          {
            titleBn: '‘যাও, আজ তোমরা সবাই মুক্ত’',
            titleEn: '“Go, For You Are Free”',
            subtitleBn: 'মানবতার ইতিহাসে নজিরবিহীন ক্ষমা',
            subtitleEn: 'Unparalleled Forgiveness',
            pointsBn: [
              'কাবার দরজায় দাঁড়িয়ে ভীতসন্ত্রস্ত কুরাইশদের নবীজি (সা.) জিজ্ঞেস করলেন: আজ আমার কাছ থেকে কেমন আচরণ আশা করো? তারা বলল: আপনি উদার ভাই।',
              'তিনি ইউসুফ (আ.)-এর বাণী উদ্ধৃত করে ঘোষণা করলেন: ‘আজ তোমাদের বিরুদ্ধে কোনো অভিযোগ নেই; যাও, তোমরা সবাই মুক্ত!’',
            ],
            pointsEn: [
              'Standing at the Ka‘bah’s door, the Prophet (PBUH) asked the trembling Quraysh what they expected; they replied: “A noble brother.”',
              'Echoing Prophet Yusuf (AS), he proclaimed: “No blame upon you today—go, for you are all free!”',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; সূরা ইউসুফ: ৯২',
            sourceEn: 'Sirah Ibn Hisham; Surah Yusuf 12:92',
          },
          {
            titleBn: 'আবু কুহাফা (রা.), হিন্দা ও ইকরিমার ইসলাম গ্রহণ',
            titleEn: 'Conversion of Abu Quhafah, Hind & Ikrimah',
            pointsBn: [
              'আবু বকর (রা.) তাঁর অন্ধ বৃদ্ধ পিতা আবু কুহাফাকে নিয়ে এলে নবীজি (সা.) সম্মান দেখিয়ে তাঁকে ইসলাম গ্রহণ করান।',
              'এই অতুলনীয় ক্ষমা দেখে হিন্দা বিনতে উতবা, ইকরিমা ইবনে আবি জাহল ও সুহাইল ইবনে আমরসহ শত শত কুরাইশ ইসলামের ছায়ায় আশ্রয় নেন।',
            ],
            pointsEn: [
              'Abu Bakr (RA) brought his elderly father Abu Quhafah, who embraced Islam with warm honor from the Prophet (PBUH).',
              'Moved by such mercy, Hind, Ikrimah, Suhayl, and countless Makkans entered Islam in droves.',
            ],
            sourceBn: 'সহীহ মুসলিম, হাদিস নং ২১০২; সীরাতে ইবনে হিশাম',
            sourceEn: 'Sahih Muslim, Hadith 2102; Sirah Ibn Hisham',
          },
          {
            titleBn: 'ন্যায়বিচারের অমর নীতি: ফাতিমার ক্ষেত্রেও একই বিধান',
            titleEn: 'Equal Justice Before the Law',
            pointsBn: [
              'মক্কা বিজয়ের সময় মাখযুম গোত্রের এক অভিজাত নারীর চুরির শাস্তি মওকুফের সুপারিশ এলে নবীজি (সা.) কঠোরভাবে তা প্রত্যাখ্যান করেন।',
              'তিনি বলেন: ‘আল্লাহর কসম! মুহাম্মাদের কন্যা ফাতিমাও যদি চুরি করত, তবে আমি তার হাত কেটে দিতাম।’',
            ],
            pointsEn: [
              'When intercession was sought for a noblewoman guilty of theft during the conquest, the Prophet (PBUH) firmly refused.',
              'He declared: “By Allah, even if Fatimah daughter of Muhammad were to steal, I would carry out the law upon her.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৩০৪; সহীহ মুসলিম, হাদিস নং ১৬৮৮',
            sourceEn: 'Sahih al-Bukhari, Hadith 4304; Sahih Muslim, Hadith 1688',
          },
        ],
      },
      {
        phaseNo: 7,
        titleBn: 'মক্কার মর্যাদা ও সূরা নাসর',
        titleEn: 'Sanctity of Makkah & Legacy',
        events: [
          {
            titleBn: 'মক্কার পবিত্রতা চিরন্তন ঘোষণা',
            titleEn: 'Eternal Sanctity of Makkah Reaffirmed',
            pointsBn: [
              'বিজয়ের পরদিন নবীজি (সা.) ভাষণে ঘোষণা করেন: আসমান-জমিন সৃষ্টির দিন থেকেই মক্কা পবিত্র—এর গাছ কাটা যাবে না, শিকার তাড়ানো যাবে না এবং রক্তপাত হারাম।',
              'কেবল আমার জন্য দিনের এক মুহূর্তের অনুমতি দেওয়া হয়েছিল, আজ আবার এর পবিত্রতা ফিরে এসেছে।',
            ],
            pointsEn: [
              'The next day, the Prophet (PBUH) proclaimed Makkah’s eternal sanctity: no bloodshed, no uprooting trees, and no disturbing its wildlife.',
              'Its brief exception had ended, restoring its inviolability until the Day of Judgment.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৯৫; সহীহ মুসলিম, হাদিস নং ১৩৫৩',
            sourceEn: 'Sahih al-Bukhari, Hadith 4295; Sahih Muslim, Hadith 1353',
          },
          {
            titleBn: 'সাফা পাহাড়ে বাইআত ও আনসারদের প্রতি অঙ্গীকার',
            titleEn: 'Pledge at Safa & Loyalty to the Ansar',
            pointsBn: [
              'সাফা পাহাড়ে বসে নবীজি (সা.) নতুন মুসলিম পুরুষ ও নারীদের তাওহীদ ও নৈতিকতার বাইআত গ্রহণ করেন।',
              'আনসাররা শঙ্কা প্রকাশ করলে যে নবীজি হয়তো মক্কায় থেকে যাবেন, তিনি আশ্বস্ত করেন: ‘আমার জীবন তোমাদের সাথে এবং আমার মৃত্যুও তোমাদের সাথেই (মদিনায়)।’',
            ],
            pointsEn: [
              'At Mount Safa, the Prophet (PBUH) accepted the allegiance of Makkan men and women upon Tawhid and uprightness.',
              'Reassuring the Ansar, he promised: “My life is with you, and my death is with you.”',
            ],
            sourceBn: 'সহীহ মুসলিম, হাদিস নং ১৭৮০; সূরা মুমতাহিনা: ১২',
            sourceEn: 'Sahih Muslim, Hadith 1780; Surah al-Mumtahanah 60:12',
          },
          {
            titleBn: '‘বিজয়ের পর আর হিজরত নেই’',
            titleEn: '“No Hijrah After the Conquest”',
            pointsBn: [
              'মক্কা দারুল ইসলামে পরিণত হওয়ায় নবীজি (সা.) ঘোষণা করেন: ‘মক্কা বিজয়ের পর আর হিজরত নেই, তবে জিহাদ ও সৎ নিয়ত অব্যাহত থাকবে।’',
              'দলে দলে আরব গোত্রগুলো ইসলামের পতাকাতলে সমবেত হতে শুরু করে।',
            ],
            pointsEn: [
              'With Makkah now a land of Islam, the Prophet (PBUH) announced: “There is no migration after the Conquest, only striving and sincere intention.”',
              'Arab tribes across the peninsula began entering Islam in multitudes.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ২৭৮৩; সূরা আন-নাসর: ১–৩',
            sourceEn: 'Sahih al-Bukhari, Hadith 2783; Surah an-Nasr 110:1–3',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // ৭. হুনাইনের যুদ্ধ — ৬ পর্বে ১৫টি প্রামাণ্য ঘটনা
  // =========================================================================
  hunayn: buildWarBundle({
    warId: 'hunayn',
    datePlaceBn: '৮ম হিজরির শাওয়াল · হুনাইন উপত্যকা, মক্কা-তায়েফ পথ',
    datePlaceEn: 'Shawwal 8 AH · Valley of Hunayn, between Makkah & Ta’if',
    battleShortBn: 'হুনাইনের যুদ্ধ',
    battleShortEn: 'Battle of Hunayn',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'হাওয়াযিন ও সাকিফের জোট',
        titleEn: 'Hawazin & Thaqif Alliance',
        events: [
          {
            titleBn: 'মালিক ইবনে আউফের ২০,০০০ সৈন্যের সমাবেশ',
            titleEn: 'Malik ibn Awf’s Army of 20,000',
            pointsBn: [
              'মক্কা বিজয়ের পরপরই তায়েফের সাকিফ ও হাওয়াযিন গোত্রের নেতা মালিক ইবনে আউফ মুসলিমদের বিরুদ্ধে ২০,০০০ সৈন্য জমায়েত করে।',
              'সৈন্যরা যেন না পালায় সেজন্য সে নারী, শিশু ও সব পশুপালকেও রণাঙ্গনের পেছনে নিয়ে আসে।',
            ],
            pointsEn: [
              'Immediately after Makkah’s conquest, Malik ibn Awf rallied 20,000 warriors from Hawazin and Thaqif.',
              'He brought women, children, and herds behind the army to prevent his men from fleeing.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আর-রাহীকুল মাখতূম',
            sourceEn: 'Sirah Ibn Hisham; Ar-Raheeq al-Makhtum',
          },
          {
            titleBn: '১২,০০০ মুসলিম বাহিনীর যাত্রা ও সংখ্যাগরিষ্ঠতার অহমিকা',
            titleEn: '12,000 Muslims March & Moment of Overconfidence',
            pointsBn: [
              'মদিনার ১০,০০০ ও মক্কার নওমুসলিম ২,০০০—মোট ১২,০০০ সৈন্য নিয়ে নবীজি (সা.) হুনাইনের পথে রওনা হন।',
              'বিশাল বাহিনী দেখে কারও মুখ থেকে বেরিয়ে আসে: ‘আজ সংখ্যার স্বল্পতার কারণে আমরা পরাজিত হব না!’—এই অহমিকা আল্লাহর পছন্দ হয়নি।',
            ],
            pointsEn: [
              'The Prophet (PBUH) marched with 12,000 troops: 10,000 veterans and 2,000 newly converted Makkans.',
              'Someone remarked, “Today we will never be defeated by small numbers”—an overconfidence later rebuked in the Quran.',
            ],
            sourceBn: 'সূরা আত-তাওবাহ: ২৫; সীরাতে ইবনে হিশাম',
            sourceEn: 'Surah at-Tawbah 9:25; Sirah Ibn Hisham',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'ভোরের অতর্কিত হামলা ও ছত্রভঙ্গ অবস্থা',
        titleEn: 'Dawn Ambush & Temporary Rout',
        events: [
          {
            titleBn: 'সংকীর্ণ গিরিপথে তীরের বৃষ্টি',
            titleEn: 'Ambush in the Narrow Ravine',
            pointsBn: [
              'ভোরের আবছা আলোয় মুসলিম বাহিনী হুনাইনের গভীর ও সংকীর্ণ উপত্যকায় প্রবেশ করলে পাহাড়ে লুকিয়ে থাকা হাওয়াযিন তীরন্দাজরা আচমকা তীরবৃষ্টি শুরু করে।',
              'অতর্কিত হামলায় অগ্রবর্তী দল ও মক্কার নওমুসলিমরা পিছু হটলে পুরো বাহিনীতে বিশৃঙ্খলা ছড়িয়ে পড়ে।',
            ],
            pointsEn: [
              'Entering the narrow valley at dawn, the Muslim vanguard was hit by a sudden hail of arrows from concealed Hawazin archers.',
              'Panic spread rapidly through the ranks, causing the majority to scatter backward.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৩১৫; সূরা আত-তাওবাহ: ২৫',
            sourceEn: 'Sahih al-Bukhari, Hadith 4315; Surah at-Tawbah 9:25',
          },
          {
            titleBn: 'নবীজি (সা.)-এর পাহাড়সম অবিচলতা',
            titleEn: 'The Prophet’s (PBUH) Unshakable Stand',
            subtitleBn: '‘আমি নবী, কোনো মিথ্যা নয়’',
            subtitleEn: '“I Am the Prophet, No Lie”',
            pointsBn: [
              'চারপাশ থেকে লোকজন সরে গেলেও নবীজি (সা.) তাঁর সাদা খচ্চর ‘দুলদুল’ শত্রুর দিকে এগিয়ে দিয়ে অকুতোভয়ে ঘোষণা করেন: ‘আমি নবী, এতে কোনো মিথ্যা নেই; আমি আব্দুল মুত্তালিবের সন্তান!’',
              'আব্বাস (রা.), আবু সুফিয়ান ইবনুল হারিস (রা.), আবু বকর, উমর ও আলী (রা.)-সহ মুষ্টিমেয় সাহাবি নবীজিকে ঘিরে অটল থাকেন।',
            ],
            pointsEn: [
              'Spurring his white mule forward toward the enemy, the Prophet (PBUH) proclaimed: “I am the Prophet, no lie! I am the son of Abd al-Muttalib!”',
              'A small band including al-Abbas, Abu Bakr, Umar, and Ali (RA) stood steadfast beside him.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৩১৫, ৪৩১৬; সহীহ মুসলিম, হাদিস নং ১৭৭৬',
            sourceEn: 'Sahih al-Bukhari, Hadith 4315, 4316; Sahih Muslim, Hadith 1776',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'পুনর্গঠন ও ঐশী প্রশান্তি',
        titleEn: 'Rallying Call & Divine Tranquility',
        events: [
          {
            titleBn: 'আব্বাস (রা.)-এর বজ্রকণ্ঠ আহ্বান',
            titleEn: 'Al-Abbas’s (RA) Thundering Call',
            pointsBn: [
              'নবীজি (সা.)-এর নির্দেশে ভরাট কণ্ঠের অধিকারী আব্বাস (রা.) চিৎকার করে ডাকেন: ‘হে বাবলা গাছের নিচে বাইআত গ্রহণকারীরা! হে সূরা বাকারার সঙ্গীরা!’',
              'এই ডাক কানে পৌঁছামাত্র সাহাবিরা ‘লাব্বাইক, লাব্বাইক’ বলে উট ঘুরিয়ে, কেউ উট ফেলে তলোয়ার হাতেই দৌড়ে ফিরে আসেন।',
            ],
            pointsEn: [
              'At the Prophet’s order, the stentorian al-Abbas (RA) called out: “O Companions of the Tree! O People of Surah al-Baqarah!”',
              'Hearing his voice, companions shouted “Labbayk!”—some abandoning unruly mounts to rush back on foot with drawn swords.',
            ],
            sourceBn: 'সহীহ মুসলিম, হাদিস নং ১৭৭৫',
            sourceEn: 'Sahih Muslim, Hadith 1775',
          },
          {
            titleBn: 'এক মুঠো ধুলাবালি ও অদৃশ্য ফেরেশতা বাহিনী',
            titleEn: 'Handful of Dust & Unseen Angels',
            pointsBn: [
              'নবীজি (সা.) এক মুঠো মাটি শত্রুর দিকে ছুড়ে বললেন: ‘শাহাতিল উজূহ—চেহারাগুলো মলিন হোক!’ আল্লাহর কুদরতে প্রতিটি শত্রুর চোখে ধুলাবালি ঢুকে পড়ে।',
              'আল্লাহ মুমিনদের ওপর প্রশান্তি (সাকীনাহ) ও অদৃশ্য ফেরেশতা বাহিনী অবতীর্ণ করেন, ফলে মুহূর্তেই যুদ্ধের মোড় ঘুরে যায়।',
            ],
            pointsEn: [
              'The Prophet (PBUH) cast a handful of dust toward the enemy saying “May their faces be disfigured,” blinding their sight.',
              'Allah sent down tranquility (Sakinah) and unseen forces, swiftly turning the tide of battle.',
            ],
            sourceBn: 'সহীহ মুসলিম, হাদিস নং ১৭৭৭; সূরা আত-তাওবাহ: ২৬',
            sourceEn: 'Sahih Muslim, Hadith 1777; Surah at-Tawbah 9:26',
          },
          {
            titleBn: 'উম্মে সুলাইম (রা.)-এর বীরত্ব',
            titleEn: 'Courage of Umm Sulaym (RA)',
            pointsBn: [
              'হুনাইনের মাঠে আনাস (রা.)-এর মা উম্মে সুলাইম (রা.) হাতে খঞ্জর নিয়ে দাঁড়িয়ে ছিলেন।',
              'নবীজি (সা.) কারণ জানতে চাইলে তিনি বললেন: কোনো মুশরিক কাছে এলে আমি এর দ্বারা তার পেট চিরে ফেলব—শুনে নবীজি (সা.) মুচকি হাসেন।',
            ],
            pointsEn: [
              'On the field of Hunayn, Umm Sulaym (RA) carried a dagger ready for defense.',
              'When asked by the Prophet (PBUH), she replied she would strike any enemy who approached, drawing a smile from him.',
            ],
            sourceBn: 'সহীহ মুসলিম, হাদিস নং ১৮০৯',
            sourceEn: 'Sahih Muslim, Hadith 1809',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'আওতাস ও তায়েফ অবরোধ',
        titleEn: 'Awtas & Siege of Ta’if',
        events: [
          {
            titleBn: 'হাওয়াযিনের চূড়ান্ত পরাজয় ও আওতাস অভিযান',
            titleEn: 'Rout of Hawazin & Victory at Awtas',
            pointsBn: [
              'মুসলিমদের পাল্টা আক্রমণে হাওয়াযিন বাহিনী ছত্রভঙ্গ হয়ে পালিয়ে যায়; একাংশ তায়েফে এবং অন্য অংশ আওতাসে আশ্রয় নেয়।',
              'আবু আমির আল-আশআরি (রা.) আওতাসে শত্রুদের পরাস্ত করে শহীদ হন এবং তাঁর ভাতিজা আবু মূসা আশআরি (রা.) বিজয় সম্পন্ন করেন।',
            ],
            pointsEn: [
              'Under the Muslim counterattack, Hawazin broke and fled toward Ta’if and Awtas.',
              'Abu Amir al-Ash‘ari (RA) defeated the forces at Awtas before martyrdom, with Abu Musa al-Ash‘ari (RA) completing the victory.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৩২৩',
            sourceEn: 'Sahih al-Bukhari, Hadith 4323',
          },
          {
            titleBn: 'তায়েফ অবরোধ ও হেদায়াতের দোয়া',
            titleEn: 'Siege of Ta’if & Prayer for Guidance',
            pointsBn: [
              'মুসলিমরা প্রায় ২০ দিন তায়েফের দুর্গ অবরোধ করে রাখেন; সাহাবিরা সাকিফের বিরুদ্ধে বদদোয়ার অনুরোধ করলে নবীজি (সা.) বললেন: ‘হে আল্লাহ, সাকিফকে হিদায়াত দাও এবং তাদের নিয়ে এসো।’',
              'এই দোয়ার বরকতে কয়েক মাস পরই সাকিফ গোত্র স্বেচ্ছায় মদিনায় এসে ইসলাম গ্রহণ করে।',
            ],
            pointsEn: [
              'After besieging Ta’if for about 20 days, companions asked the Prophet to curse Thaqif; instead he prayed: “O Allah, guide Thaqif and bring them to us.”',
              'Months later, Thaqif voluntarily sent a delegation to Madinah and embraced Islam.',
            ],
            sourceBn: 'জামে আত-তিরমিযী, হাদিস নং ৩৯৪২; সহীহ আল-বুখারী, হাদিস নং ৪৩২৪',
            sourceEn: 'Jami at-Tirmidhi, Hadith 3942; Sahih al-Bukhari, Hadith 4324',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'জি‘ইররানা ও আনসারদের মর্যাদা',
        titleEn: 'Ji‘irranah & Honor of the Ansar',
        events: [
          {
            titleBn: '৬,০০০ বন্দীর সাধারণ মুক্তি ও দুধমাতার সম্মান',
            titleEn: 'Release of 6,000 Captives',
            pointsBn: [
              'হাওয়াযিন গোত্র ইসলাম গ্রহণ করে বন্দীদের মুক্তি চাইলে নবীজি (সা.) নিজের ও বনু আব্দুল মুত্তালিবের অংশের সব বন্দী মুক্ত করে দেন।',
              'তাঁর আদর্শে উদ্বুদ্ধ হয়ে সব সাহাবি ৬,০০০ বন্দী নারী-শিশুকে বিনা মুক্তিপণে ফিরিয়ে দেন; এতে মালিক ইবনে আউফও ইসলাম গ্রহণ করেন।',
            ],
            pointsEn: [
              'When Hawazin embraced Islam and appealed for their families, the Prophet (PBUH) freed his share immediately.',
              'Following his example, the companions freely released all 6,000 captives, winning over Malik ibn Awf to Islam as well.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৩০৭, ৪৩১৮',
            sourceEn: 'Sahih al-Bukhari, Hadith 4307, 4318',
          },
          {
            titleBn: 'আনসারদের উদ্দেশে হৃদয়স্পর্শী ভাষণ',
            titleEn: 'Heart-Melting Address to the Ansar',
            pointsBn: [
              'নতুন মুসলিমদের মন জয়ে বিপুল উট-বকরি দেওয়ায় কিছু তরুণ আনসার মনে কষ্ট পান; নবীজি (সা.) আনসারদের একত্র করে বললেন:',
              '‘হে আনসারগণ! তোমরা কি এতে সন্তুষ্ট নও যে লোকেরা উট-বকরি নিয়ে ফিরবে, আর তোমরা আল্লাহর রাসূলকে নিয়ে নিজ ঘরে ফিরবে?’ শুনে আনসাররা কেঁদে ফেলেন।',
            ],
            pointsEn: [
              'When spoils were gifted to newly converted chiefs to win hearts, the Prophet (PBUH) gathered the Ansar and asked:',
              '“Are you not pleased that people return with camels and sheep while you return home with the Messenger of Allah?” The Ansar wept until their beards were wet.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৩৩০; সহীহ মুসলিম, হাদিস নং ১০৬১',
            sourceEn: 'Sahih al-Bukhari, Hadith 4330; Sahih Muslim, Hadith 1061',
          },
        ],
      },
      {
        phaseNo: 6,
        titleBn: 'হুনাইনের চিরন্তন শিক্ষা',
        titleEn: 'Eternal Lessons of Hunayn',
        events: [
          {
            titleBn: 'সংখ্যা নয়, তাওয়াক্কুলই বিজয়ের মূল',
            titleEn: 'Victory Comes from Reliance on Allah, Not Numbers',
            pointsBn: [
              'বদরে ৩১৩ জন নিয়ে বিজয় এবং হুনাইনে ১২,০০০ জন নিয়েও প্রাথমিক বিপর্যয় উম্মাহকে শিখিয়েছে যে সংখ্যাধিক্য কখনো বিজয়ের নিশ্চয়তা দেয় না।',
              'বিজয়ের প্রকৃত ভিত্তি হলো বিনয়, দৃঢ় ঈমান ও আল্লাহর ওপর একনিষ্ঠ তাওয়াক্কুল।',
            ],
            pointsEn: [
              'Victory with 313 at Badr contrasted with the initial setback of 12,000 at Hunayn taught the Ummah that numbers alone never guarantee triumph.',
              'True victory rests on humility, unwavering faith, and sincere reliance on Allah.',
            ],
            sourceBn: 'সূরা আত-তাওবাহ: ২৫–২৬',
            sourceEn: 'Surah at-Tawbah 9:25–26',
          },
          {
            titleBn: 'অর্থবিত্তের চেয়েও প্রিয় নবীপ্রেম',
            titleEn: 'Love of the Prophet Above All Wealth',
            pointsBn: [
              'আনসারদের অশ্রুসিক্ত ঘোষণা ‘আমরা আমাদের ভাগ্যে আল্লাহর রাসূলকেই সন্তুষ্টচিত্তে গ্রহণ করলাম’ ইতিহাসের অন্যতম শ্রেষ্ঠ ঈমানি নিদর্শন।',
              'হুনাইনের পর আরব উপদ্বীপের প্রধান বিরোধী শক্তি সম্পূর্ণরূপে নিঃশেষ হয়ে যায়।',
            ],
            pointsEn: [
              'The Ansar’s tearful reply—“We are content with the Messenger of Allah as our share”—remains an immortal testament of devotion.',
              'After Hunayn, organized tribal opposition across western Arabia ended.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৩৩০',
            sourceEn: 'Sahih al-Bukhari, Hadith 4330',
          },
          {
            titleBn: 'যুল-খুওয়াইসিরার ধৃষ্টতা ও সতর্কতা',
            titleEn: 'Warning Against Extremism at Ji‘irranah',
            pointsBn: [
              'গনিমত বণ্টনের সময় যুল-খুওয়াইসিরা নামের এক ব্যক্তি নবীজি (সা.)-এর ন্যায়বিচার নিয়ে ধৃষ্টতা দেখায়।',
              'নবীজি (সা.) ধৈর্য ধারণ করে উম্মাহকে ভবিষ্যতের চরমপন্থী গোষ্ঠী সম্পর্কে সতর্ক করে যান।',
            ],
            pointsEn: [
              'During the distribution at Ji‘irranah, Dhul-Khuwaysirah rudely questioned the Prophet’s justice.',
              'Showing restraint, the Prophet (PBUH) warned the Ummah against future extremists who read the Quran superficially.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৩৫১',
            sourceEn: 'Sahih al-Bukhari, Hadith 4351',
          },
          {
            titleBn: 'আরবের ঐক্যের সূচনা',
            titleEn: 'Dawn of Arabian Unity',
            pointsBn: [
              'হুনাইন ও তায়েফের অভিযানের পর ইসলামের দাওয়াত সারা আরবে বাধাহীনভাবে ছড়িয়ে পড়ে।',
              'নবম হিজরিকে তাই বলা হয় ‘আমুল উফূদ’ বা প্রতিনিধিদলের বছর।',
            ],
            pointsEn: [
              'Following Hunayn and Ta’if, the message of Islam spread unhindered across Arabia.',
              'The 9th Hijri year became known as the “Year of Delegations.”',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // ৮. মুতার যুদ্ধ — ৬ পর্বে ১৫টি প্রামাণ্য ঘটনা
  // =========================================================================
  mutah: buildWarBundle({
    warId: 'mutah',
    datePlaceBn: '৮ম হিজরির জুমাদাল উলা · মুতা প্রান্তর, বর্তমান জর্ডান',
    datePlaceEn: 'Jumada al-Ula 8 AH · Mu’tah, Modern-day Jordan',
    battleShortBn: 'মুতার যুদ্ধ',
    battleShortEn: 'Battle of Mu’tah',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'দূত হত্যা ও অভিযানের কারণ',
        titleEn: 'Murder of the Envoy & Cause',
        events: [
          {
            titleBn: 'হারিস ইবনে উমাইর (রা.)-কে হত্যা',
            titleEn: 'Assassination of Envoy al-Harith ibn Umayr (RA)',
            pointsBn: [
              'নবীজি (সা.) বসরার গভর্নরের কাছে ইসলামের দাওয়াতপত্র নিয়ে দূত হারিস ইবনে উমাইর আল-আযদি (রা.)-কে পাঠান।',
              'আন্তর্জাতিক রীতি লঙ্ঘন করে রোমান মিত্র গাসসানি শাসক শুরাহবিল ইবনে আমর তাঁকে বন্দী করে নির্মমভাবে হত্যা করে।',
            ],
            pointsEn: [
              'The Prophet (PBUH) sent al-Harith ibn Umayr (RA) carrying a peaceful diplomatic letter to the governor of Busra.',
              'Violating universal diplomatic law, Ghassanid ruler Shurahbil ibn Amr seized and executed him.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আর-রাহীকুল মাখতূম',
            sourceEn: 'Sirah Ibn Hisham; Ar-Raheeq al-Makhtum',
          },
          {
            titleBn: 'তিন সেনাপতির ক্রম নির্ধারণ',
            titleEn: 'Appointment of Three Successive Commanders',
            pointsBn: [
              'নবীজি (সা.) ৩,০০০ সাহাবির বাহিনী প্রস্তুত করে অভূতপূর্বভাবে তিনজন সেনাপতির ক্রম নির্ধারণ করে দেন।',
              'তিনি বললেন: ‘যায়িদ ইবনে হারিসা সেনাপতি; সে শহীদ হলে জাফর ইবনে আবি তালিব, আর সে শহীদ হলে আব্দুল্লাহ ইবনে রাওয়াহা নেতৃত্ব দেবে।’',
            ],
            pointsEn: [
              'Mobilizing 3,000 companions, the Prophet (PBUH) uniquely named three commanders in succession:',
              '“Zayd ibn Harithah leads; if he falls, then Ja‘far ibn Abi Talib; if he falls, then Abdullah ibn Rawahah.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৬১',
            sourceEn: 'Sahih al-Bukhari, Hadith 4261',
          },
          {
            titleBn: 'যুদ্ধের মানবিক ও নৈতিক নীতিমালা',
            titleEn: 'Prophetic Code of Ethical Warfare',
            pointsBn: [
              'বিদায়কালে নবীজি (সা.) কঠোর নির্দেশ দেন: কোনো নারী, শিশু, বৃদ্ধ, গির্জার সন্ন্যাসী হত্যা করবে না, গাছ কাটবে না এবং ঘরবাড়ি ধ্বংস করবে না।',
              'আগে ইসলামের দাওয়াত দেবে এবং কখনো অঙ্গহানি বা বিশ্বাসঘাতকতা করবে না।',
            ],
            pointsEn: [
              'Sending them off, the Prophet (PBUH) strictly prohibited harming women, children, elders, or monks, cutting trees, or destroying homes.',
              'They were commanded to invite to Islam first and never betray pledges or mutilate.',
            ],
            sourceBn: 'সহীহ মুসলিম, হাদিস নং ১৭৩১; সীরাতে ইবনে হিশাম',
            sourceEn: 'Sahih Muslim, Hadith 1731; Sirah Ibn Hisham',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: '২ লাখ রোমান বাহিনীর মুখোমুখি',
        titleEn: 'Facing 200,000 Byzantine & Allied Troops',
        events: [
          {
            titleBn: 'মাআনে পরামর্শ ও ইবনে রাওয়াহার উদ্দীপনাময় ভাষণ',
            titleEn: 'Council at Ma‘an & Ibn Rawahah’s Speech',
            pointsBn: [
              'মাআনে পৌঁছে মুসলিমরা খবর পান, হিরাক্লিয়াসের ১ লাখ রোমান ও ১ লাখ আরব মিত্র—মোট ২ লাখ সৈন্য সামনে অপেক্ষা করছে।',
              'কেউ মদিনায় খবর পাঠানোর প্রস্তাব দিলে আব্দুল্লাহ ইবনে রাওয়াহা (রা.) বললেন: ‘আমরা সংখ্যা বা শক্তি দিয়ে লড়ি না, বরং এই দ্বীন দিয়ে লড়ি; আমাদের সামনে দুটি কল্যাণের একটি নিশ্চিত—বিজয় অথবা শাহাদাত!’',
            ],
            pointsEn: [
              'At Ma‘an, scouts reported 100,000 Byzantines and 100,000 Arab allies—200,000 troops ahead.',
              'Abdullah ibn Rawahah (RA) roused the ranks: “We fight not by numbers, but by this faith! Either victory or martyrdom awaits us—both are noble!”',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'মুতা প্রান্তরে অসম লড়াইয়ের সূচনা',
            titleEn: 'Start of the Epic Battle at Mu’tah',
            pointsBn: [
              '৩,০০০ বনাম ২,০০,০০০—বিশ্ব ইতিহাসের অন্যতম অসম যুদ্ধে মুসলিম বাহিনী মুতা প্রান্তরে সারিবদ্ধ হয়।',
              'প্রায় প্রতিটি মুসলিমের বিপরীতে ছিল ৬৫ জনের বেশি সশস্ত্র শত্রু।',
            ],
            pointsEn: [
              '3,000 faced 200,000 on the plain of Mu’tah—one of history’s most lopsided engagements.',
              'Every Muslim stood against more than sixty-five heavily armored opponents.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; তারীখে তাবারী',
            sourceEn: 'Sirah Ibn Hisham; Tarikh al-Tabari',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'তিন মহাবীর সেনাপতির শাহাদাত',
        titleEn: 'Martyrdom of the Three Commanders',
        events: [
          {
            titleBn: 'প্রথম সেনাপতি যায়িদ ইবনে হারিসা (রা.)-এর শাহাদাত',
            titleEn: 'Martyrdom of Zayd ibn Harithah (RA)',
            pointsBn: [
              'নবীজি (সা.)-এর পরম প্রিয়ভাজন যায়িদ ইবনে হারিসা (রা.) পতাকা হাতে শত্রুব্যূহের গভীর ভেতরে ঢুকে অসাধারণ বীরত্বে লড়তে লড়তে বর্শার আঘাতে শহীদ হন।',
              'পতাকা মাটিতে পড়ার আগেই তা তুলে নেন দ্বিতীয় সেনাপতি জাফর (রা.)।',
            ],
            pointsEn: [
              'Beloved companion Zayd ibn Harithah (RA) carried the standard deep into Byzantine spears, fighting until martyred.',
              'Before the banner could touch the earth, Ja‘far (RA) seized it.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৬২',
            sourceEn: 'Sahih al-Bukhari, Hadith 4262',
          },
          {
            titleBn: 'জাফর আত-তাইয়ার (রা.)-এর দুই হাত ও ৯০ আঘাত',
            titleEn: 'Ja‘far al-Tayyar (RA): Two Hands & 90 Wounds',
            pointsBn: [
              'জাফর (রা.)-এর ডান হাত কাটা গেলে বাম হাতে, বাম হাত কাটা গেলে দুই বাহুর অবশিষ্টাংশ দিয়ে পতাকা বুকে আঁকড়ে ধরেন।',
              'তাঁর দেহের সামনের দিকে ৯০টির বেশি তলোয়ার ও বর্শার আঘাত ছিল; আল্লাহ তাঁকে জান্নাতে দুটি ডানা দান করেন (‘জাফর আত-তাইয়ার’)।',
            ],
            pointsEn: [
              'When his right hand was severed, Ja‘far (RA) gripped the banner with his left; when that fell, he hugged it with his arms until martyred.',
              'Over 90 wounds marked his front, not one on his back; Allah granted him two wings in Paradise.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৬১, ৪২৬৭',
            sourceEn: 'Sahih al-Bukhari, Hadith 4261, 4267',
          },
          {
            titleBn: 'তৃতীয় সেনাপতি আব্দুল্লাহ ইবনে রাওয়াহা (রা.)-এর শাহাদাত',
            titleEn: 'Martyrdom of Abdullah ibn Rawahah (RA)',
            pointsBn: [
              'তৃতীয় সেনাপতি আব্দুল্লাহ ইবনে রাওয়াহা (রা.) ক্ষণিকের দ্বিধা ঝেড়ে নিজের নফসকে কবিতায় শপথ করিয়ে শত্রুর ওপর ঝাঁপিয়ে পড়েন এবং শহীদ হন।',
              'এরপর সাবিত ইবনে আরকাম (রা.) পতাকা তুলে ধরে সবাইকে একত্র করে খালিদ ইবনে ওয়ালিদ (রা.)-কে সেনাপতি মনোনীত করেন।',
            ],
            pointsEn: [
              'Steeling his heart with stirring poetry, Abdullah ibn Rawahah (RA) charged forward and attained martyrdom.',
              'Thabit ibn Arqam (RA) raised the banner and united the troops under Khalid ibn al-Walid (RA).',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৬২; সীরাতে ইবনে হিশাম',
            sourceEn: 'Sahih al-Bukhari, Hadith 4262; Sirah Ibn Hisham',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'সাইফুল্লাহ খালিদ (রা.)-এর মহাকৌশল',
        titleEn: 'Sword of Allah: Khalid’s Tactical Genius',
        events: [
          {
            titleBn: 'খালিদ (রা.)-এর হাতে ৯টি তলোয়ার ভেঙে যাওয়া',
            titleEn: 'Nine Swords Shattered in Khalid’s Hand',
            pointsBn: [
              'ইসলাম গ্রহণের পর এটিই ছিল খালিদ (রা.)-এর প্রথম বড় যুদ্ধ; তিনি এত প্রচণ্ড বিক্রমে লড়েন যে তাঁর হাতে একের পর এক ৯টি তলোয়ার ভেঙে যায়।',
              'শেষে শুধু একটি প্রশস্ত ইয়েমেনি তলোয়ার তাঁর হাতে টিকে ছিল।',
            ],
            pointsEn: [
              'In his first major battle as a Muslim, Khalid (RA) fought so fiercely that nine swords snapped in his hand.',
              'Only a broad Yemeni blade remained intact.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৬৫, ৪২৬৬',
            sourceEn: 'Sahih al-Bukhari, Hadith 4265, 4266',
          },
          {
            titleBn: 'রাতের বিন্যাস বদল ও মনস্তাত্ত্বিক বিভ্রান্তি',
            titleEn: 'Night Formation Swap & Psychological Stratagem',
            pointsBn: [
              'রাতের আঁধারে খালিদ (রা.) ডান দলকে বামে, বাম দলকে ডানে এবং সামনের দলকে পেছনে বদলে দেন; নতুন পতাকা ও ধুলার ঝড় তোলেন।',
              'সকালে নতুন মুখ দেখে রোমানরা ভেবে বসে মদিনা থেকে বিশাল নতুন সাহায্যকারী বাহিনী এসেছে—ফলে তারা আতঙ্কে পিছু হটে।',
            ],
            pointsEn: [
              'Overnight, Khalid (RA) swapped right and left wings and vanguard with rearguard while kicking up clouds of dust.',
              'Seeing fresh faces at dawn, the Byzantines feared massive reinforcements had arrived and hesitated to advance.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'নিরাপদ প্রত্যাবর্তন ও মাত্র ১২ জন শহীদ',
            titleEn: 'Safe Extraction with Only 12 Martyrs',
            pointsBn: [
              'খালিদ (রা.) অসামান্য দক্ষতায় ২ লাখ শত্রু বাহিনীর হাত থেকে ৩,০০০ মুসলিম সেনাকে অক্ষত অবস্থায় মদিনায় ফিরিয়ে আনেন।',
              'এত বিশাল বাহিনীর বিরুদ্ধে মুসলিম শহীদ হয়েছিলেন মাত্র ১২ জন।',
            ],
            pointsEn: [
              'With masterly discipline, Khalid (RA) extracted nearly the entire 3,000-man army intact from a force of 200,000.',
              'Muslim losses numbered only twelve martyrs.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আর-রাহীকুল মাখতূম',
            sourceEn: 'Sirah Ibn Hisham; Ar-Raheeq al-Makhtum',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'মদিনায় অলৌকিক বিবরণ ও সান্ত্বনা',
        titleEn: 'Miraculous Broadcast in Madinah',
        events: [
          {
            titleBn: 'মসজিদে নববীর মিম্বর থেকে নবীজি (সা.)-এর সরাসরি বর্ণনা',
            titleEn: 'Live Vision from the Pulpit of Madinah',
            pointsBn: [
              'শত শত মাইল দূরে মদিনায় মিম্বরে বসেই ওহির মাধ্যমে নবীজি (সা.) অশ্রুসিক্ত চোখে তিন সেনাপতির শাহাদাতের বিবরণ তাৎক্ষণিক সাহাবিদের শোনান।',
              'তিনি ঘোষণা করেন: ‘অতঃপর আল্লাহর তলোয়ারগুলোর একটি তলোয়ার (খালিদ) পতাকা তুলে নিয়েছে, যতক্ষণ না আল্লাহ তাদের বিজয় দান করেছেন।’',
            ],
            pointsEn: [
              'Hundreds of miles away on the pulpit of Madinah, the Prophet (PBUH) wept as he described each commander’s martyrdom in real time.',
              'He announced: “Then a Sword from among the Swords of Allah took the banner until Allah granted them deliverance.”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪২৬২',
            sourceEn: 'Sahih al-Bukhari, Hadith 4262',
          },
          {
            titleBn: '‘জাফরের পরিবারের জন্য খাবার তৈরি করো’',
            titleEn: '“Prepare Food for the Family of Ja‘far”',
            pointsBn: [
              'জাফর (রা.)-এর শাহাদাতের পর নবীজি (সা.) তাঁর ছোট সন্তানদের কোলে নিয়ে অশ্রু ঝরান এবং নির্দেশ দেন: ‘জাফরের পরিবারের জন্য খাবার পাঠাও, কারণ তাদের ওপর বড় শোক নেমে এসেছে।’',
              'এখান থেকেই শোকাহত পরিবারের জন্য প্রতিবেশীদের খাবার পাঠানোর মহান সুন্নাহ প্রতিষ্ঠিত হয়।',
            ],
            pointsEn: [
              'Holding Ja‘far’s young children in tears, the Prophet (PBUH) instructed: “Prepare food for Ja‘far’s household, for a heavy trial has befallen them.”',
              'This established the compassionate Sunnah of caring for bereaved families.',
            ],
            sourceBn: 'সুনান আবু দাউদ, হাদিস নং ৩১৩২; জামে আত-তিরমিযী, হাদিস নং ৯৯৮',
            sourceEn: 'Sunan Abu Dawud, Hadith 3132; Jami at-Tirmidhi, Hadith 998',
          },
        ],
      },
      {
        phaseNo: 6,
        titleBn: '‘তারা পলায়নকারী নয়, পুনরায় আক্রমণকারী’',
        titleEn: '“They Are Not Deserters, But Returners”',
        events: [
          {
            titleBn: 'মদিনায় নবীজি (সা.)-এর উষ্ণ অভ্যর্থনা',
            titleEn: 'The Prophet’s Defense of the Returning Troops',
            pointsBn: [
              'মুতা থেকে ফেরার পর মদিনার কিছু মানুষ আবেগে তাদের ‘পলায়নকারী’ বললে নবীজি (সা.) তাৎক্ষণিক প্রতিবাদ করেন।',
              'তিনি ঘোষণা করেন: ‘তারা পলায়নকারী (ফিরার) নয়; বরং ইনশাআল্লাহ তারা পুনরায় আক্রমণকারী (কাররার)!’',
            ],
            pointsEn: [
              'When some residents called the returning soldiers “fleeing ones,” the Prophet (PBUH) immediately defended them:',
              '“They are not deserters; rather, by Allah’s will, they are those who will return to charge again!”',
            ],
            sourceBn: 'সুনান আবু দাউদ, হাদিস নং ২৬৪৭; সীরাতে ইবনে হিশাম',
            sourceEn: 'Sunan Abu Dawud, Hadith 2647; Sirah Ibn Hisham',
          },
          {
            titleBn: 'শাম বিজয়ের প্রথম সোপান',
            titleEn: 'First Step Toward the Liberation of Sham',
            pointsBn: [
              'মুতার যুদ্ধে ৩,০০০ মুসলিমের অকল্পনীয় সাহস দেখে সমগ্র শাম ও রোমান সাম্রাজ্যে মুসলিমদের বীরত্বের সুনাম ছড়িয়ে পড়ে।',
              'এটি ছিল পরবর্তীতে ইয়ারমুক ও শাম বিজয়ের ঐতিহাসিক সূচনা।',
            ],
            pointsEn: [
              'The astonishing courage of 3,000 Muslims against an imperial superpower sent shockwaves across Syria.',
              'Mu’tah laid the moral foundation for the later liberation of the Levant.',
            ],
            sourceBn: 'আল-বিদায়া ওয়ান নিহায়া; আর-রাহীকুল মাখতূম',
            sourceEn: 'Al-Bidayah wan-Nihayah; Ar-Raheeq al-Makhtum',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // ৯. তাবুকের যুদ্ধ — ৬ পর্বে ১৬টি প্রামাণ্য ঘটনা
  // =========================================================================
  tabuk: buildWarBundle({
    warId: 'tabuk',
    datePlaceBn: '৯ম হিজরির রজব · তাবুক প্রান্তর, মদিনা-শাম সীমান্ত',
    datePlaceEn: 'Rajab 9 AH · Tabuk, Northern Frontier of Arabia',
    battleShortBn: 'তাবুক অভিযান',
    battleShortEn: 'Expedition of Tabuk',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'রোমান হুমকি ও কঠিনতম পরীক্ষা',
        titleEn: 'Byzantine Threat & Supreme Test',
        events: [
          {
            titleBn: 'রোমান সাম্রাজ্যের প্রস্তুতির সংবাদ',
            titleEn: 'Reports of Byzantine Mobilization',
            pointsBn: [
              'শামের বণিকদের মাধ্যমে খবর আসে, রোমান সম্রাট হিরাক্লিয়াস ৪০,০০০ সৈন্য নিয়ে মদিনা আক্রমণের প্রস্তুতি নিচ্ছে।',
              'মদিনার ভেতরে নয়, বরং শত্রুকে সীমান্তেই প্রতিহত করার সিদ্ধান্ত নিয়ে নবীজি (সা.) সরাসরি অভিযানের ঘোষণা দেন।',
            ],
            pointsEn: [
              'Traders from Syria reported that Emperor Heraclius was assembling 40,000 troops to invade Madinah.',
              'Choosing preemptive defense, the Prophet (PBUH) openly announced a northern campaign to Tabuk.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: '‘জায়শুল উসরাহ’ — তীব্র গরম ও দুর্ভিক্ষের সময়',
            titleEn: '“Army of Hardship” Amid Heat and Harvest',
            pointsBn: [
              'সময়টি ছিল প্রচণ্ড গ্রীষ্ম, খরা, দীর্ঘ ৭০০ কিলোমিটার মরুযাত্রা এবং খেজুর পাকার মৌসুম।',
              'অতীব কঠিন পরিস্থিতির কারণে এ বাহিনীর নাম হয় ‘জায়শুল উসরাহ’ (সংকটের বাহিনী)।',
            ],
            pointsEn: [
              'The call came during scorching heat, drought, a 700 km desert trek, and the ripening date harvest.',
              'Due to these severe trials, it became known as “Jaysh al-Usrah” (the Army of Hardship).',
            ],
            sourceBn: 'সূরা আত-তাওবাহ: ৪২, ১১৭',
            sourceEn: 'Surah at-Tawbah 9:42, 117',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'সাহাবিদের অতুলনীয় দানশীলতা',
        titleEn: 'Unparalleled Generosity of the Companions',
        events: [
          {
            titleBn: 'আবু বকর (রা.) ও উমর (রা.)-এর অবিশ্বাস্য ত্যাগ',
            titleEn: 'Sacrifice of Abu Bakr & Umar (RA)',
            pointsBn: [
              'উমর (রা.) তাঁর অর্ধেক সম্পদ দান করে ভাবলেন আজ হয়তো আবু বকরকে ছাড়িয়ে যাবেন।',
              'কিন্তু আবু বকর (রা.) ঘরের সমস্ত সম্পদ নিয়ে এলেন; পরিবারে কী রেখে এসেছেন জানতে চাইলে বললেন: ‘আল্লাহ ও তাঁর রাসূলকে রেখে এসেছি।’',
            ],
            pointsEn: [
              'Umar (RA) donated half of his entire wealth, hoping for once to outdo Abu Bakr (RA).',
              'Abu Bakr brought everything he owned; asked what he left his family, he answered: “I left them Allah and His Messenger.”',
            ],
            sourceBn: 'সুনান আবু দাউদ, হাদিস নং ১৬৭৮; জামে আত-তিরমিযী, হাদিস নং ৩৬৭৫',
            sourceEn: 'Sunan Abu Dawud, Hadith 1678; Jami at-Tirmidhi, Hadith 3675',
          },
          {
            titleBn: 'উসমান (রা.)-এর বিশাল অবদান ও জান্নাতের সুসংবাদ',
            titleEn: 'Uthman’s (RA) Massive Contribution',
            pointsBn: [
              'উসমান (রা.) একাই প্রায় ৯০০–৯৫০ উট, ৫০–১০০ ঘোড়া ও ১,০০০ স্বর্ণমুদ্রা (দিনার) বাহিনীর জন্য দান করেন।',
              'স্বর্ণমুদ্রা হাতে নিয়ে নবীজি (সা.) বললেন: ‘আজকের পর উসমান যা-ই করুক, তার কোনো ক্ষতি হবে না!’',
            ],
            pointsEn: [
              'Uthman (RA) single-handedly equipped the army with over 900 camels, dozens of horses, and 1,000 gold dinars.',
              'Turning the gold in his hand, the Prophet (PBUH) declared: “Nothing Uthman does after today can harm him!”',
            ],
            sourceBn: 'জামে আত-তিরমিযী, হাদিস নং ৩৭০১; মুসনাদে আহমদ',
            sourceEn: 'Jami at-Tirmidhi, Hadith 3701; Musnad Ahmad',
          },
          {
            titleBn: 'দরিদ্র সাহাবিদের অশ্রুসিক্ত ব্যাকুলতা (বাক্কাঊন)',
            titleEn: 'Tears of the Poor Companions (Al-Bakka’un)',
            pointsBn: [
              'আব্দুর রহমান ইবনে আওফ (রা.) ২০০ উকিয়া রৌপ্য, আর দরিদ্র আবু আকীল (রা.) সারারাত শ্রম দিয়ে এক সা‘ খেজুর দান করেন।',
              'বাহনের অভাবে যেতে না পারা ৭ জন নিঃস্ব সাহাবি কান্নায় ভেঙে পড়েন—কুরআনে তাঁদের অশ্রুর প্রশংসা করা হয়েছে।',
            ],
            pointsEn: [
              'Abd al-Rahman ibn Awf gave 200 ounces of silver, while poor laborer Abu Aqil worked all night to contribute a single measure of dates.',
              'Seven destitute companions wept when no mounts could be found for them, immortalized in Surah at-Tawbah.',
            ],
            sourceBn: 'সূরা আত-তাওবাহ: ৭৯, ৯২',
            sourceEn: 'Surah at-Tawbah 9:79, 92',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: '৩০,০০০ বাহিনীর যাত্রা ও আলী (রা.)-এর মর্যাদা',
        titleEn: 'March of 30,000 & Station of Ali (RA)',
        events: [
          {
            titleBn: '‘তুমি কি সন্তুষ্ট নও যে তুমি আমার কাছে হারূনের মতো?’',
            titleEn: '“Are You Not Pleased to Be Like Harun to Musa?”',
            pointsBn: [
              'মদিনা ও আহলে বাইতের দায়িত্বে আলী (রা.)-কে রেখে যাওয়ায় মুনাফিকরা কটূক্তি করলে আলী (রা.) ব্যথিত হয়ে নবীজির কাছে ছুটে যান।',
              'নবীজি (সা.) তাঁকে মহামর্যাদা দিয়ে বলেন: ‘মুসার কাছে হারূনের যে মর্যাদা ছিল, তুমি কি আমার কাছে সেই মর্যাদায় সন্তুষ্ট নও? তবে আমার পর কোনো নবী নেই।’',
            ],
            pointsEn: [
              'Left in charge of Madinah, Ali (RA) hurried after the Prophet when hypocrites mocked him.',
              'The Prophet (PBUH) honored him: “Are you not pleased to be to me as Harun was to Musa—except there is no prophet after me?”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪১৬; সহীহ মুসলিম, হাদিস নং ২৪০৪',
            sourceEn: 'Sahih al-Bukhari, Hadith 4416; Sahih Muslim, Hadith 2404',
          },
          {
            titleBn: 'একাকী যাত্রায় আবু যার (রা.)',
            titleEn: 'Abu Dharr’s (RA) Solitary Determination',
            pointsBn: [
              'দুর্বল উট পিছিয়ে পড়লে আবু যার গিফারি (রা.) উট ছেড়ে নিজের জিনিসপত্র কাঁধে নিয়ে উত্তপ্ত মরুভূমি পায়ে হেঁটে কাফেলায় যোগ দেন।',
              'দূর থেকে তাঁকে দেখে নবীজি (সা.) দোয়া করেন: ‘আল্লাহ আবু যারকে রহম করুন—সে একা চলবে, একা মৃত্যুবরণ করবে এবং একা পুনরুত্থিত হবে।’',
            ],
            pointsEn: [
              'When his weak camel fell behind, Abu Dharr (RA) shouldered his pack and marched alone across the scorching desert to rejoin the army.',
              'Spotting him afar, the Prophet (PBUH) prayed: “May Allah have mercy on Abu Dharr—he walks alone, will die alone, and will be raised alone.”',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-মুস্তাদরাক লিল-হাকিম',
            sourceEn: 'Sirah Ibn Hisham; Al-Mustadrak al-Hakim',
          },
          {
            titleBn: 'হিজর (কওমে সামুদের এলাকা) অতিক্রম',
            titleEn: 'Passing Through al-Hijr (Land of Thamud)',
            pointsBn: [
              'পথে অভিশপ্ত কওমে সামুদের ধ্বংসস্তূপ অতিক্রম করার সময় নবীজি (সা.) দ্রুত এলাকা পার হতে ও সেখানকার কূপের পানি পান না করতে নির্দেশ দেন।',
              'তিনি বলেন: ‘অত্যাচারীদের বসতিতে কাঁদতে কাঁদতে ব্যতীত প্রবেশ কোরো না, পাছে তোমাদের ওপরও তাদের মতো আজাব নেমে আসে।’',
            ],
            pointsEn: [
              'Passing the ruins of Thamud at al-Hijr, the Prophet (PBUH) urged the troops to hasten past and avoid drinking from its wells.',
              'He reminded them not to enter the dwellings of the wronged except in reflection and tears.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪১৯, ৪৪২০',
            sourceEn: 'Sahih al-Bukhari, Hadith 4419, 4420',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'তাবুকে অবস্থান ও বিনা রক্তপাতে বিজয়',
        titleEn: 'Encampment at Tabuk & Bloodless Triumph',
        events: [
          {
            titleBn: 'রোমান বাহিনীর পিছু হটা ও মুসলিমদের আধিপত্য',
            titleEn: 'Byzantine Withdrawal & Strategic Dominance',
            pointsBn: [
              '৩০,০০০ সুশৃঙ্খল মুসলিম সেনার তাবুকে পৌঁছানোর খবর পেয়ে রোমান ও গাসসানি বাহিনী যুদ্ধের সাহস হারিয়ে সীমান্তের ভেতরে পিছিয়ে যায়।',
              'নবীজি (সা.) তাবুকে ২০ দিন অবস্থান করে ইসলামের সার্বভৌমত্ব ও সামরিক সক্ষমতা প্রতিষ্ঠা করেন।',
            ],
            pointsEn: [
              'Learning that 30,000 disciplined Muslims had reached Tabuk, Byzantine forces dispersed and withdrew north without engaging.',
              'The Prophet (PBUH) encamped at Tabuk for 20 days, establishing undisputed strategic prestige.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; সহীহ আল-বুখারী',
            sourceEn: 'Sirah Ibn Hisham; Sahih al-Bukhari',
          },
          {
            titleBn: 'আইলা, জারবা ও দুমাতুল জান্দালের সাথে শান্তিচুক্তি',
            titleEn: 'Treaties with Aylah, Jarba & Dumat al-Jandal',
            pointsBn: [
              'আইলার খ্রিষ্টান শাসক ইউহান্না ইবনে রুবা নিজে এসে সন্ধিচুক্তি ও নিরাপত্তাপত্র গ্রহণ করেন; জারবা ও আযরুহও চুক্তিবদ্ধ হয়।',
              'খালিদ (রা.)-কে দুমাতুল জান্দালে পাঠানো হলে সেখানকার শাসক উকাইদিরও মদিনার সাথে শান্তিচুক্তি করে।',
            ],
            pointsEn: [
              'Yuhannah ibn Ru’bah of Aylah along with Jarba and Adhruh came voluntarily to sign treaties of protection.',
              'Khalid (RA) secured a peace treaty with Ukaydir of Dumat al-Jandal.',
            ],
            sourceBn: 'সীরাতে ইবনে হিশাম; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sirah Ibn Hisham; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'তাবুকের কূপে পানির মুজিযা',
            titleEn: 'Miracle of the Tabuk Spring',
            pointsBn: [
              'তাবুকে পৌঁছে দেখা গেল কূপে জুতার ফিতার মতো সরু ধারায় সামান্য পানি পড়ছে।',
              'নবীজি (সা.) সেই পানি দিয়ে অজু করে দোয়া করলে বিপুল বেগে পানি প্রবাহিত হয় এবং ৩০,০০০ সেনা ও তাদের পশু পরিতৃপ্ত হয়।',
            ],
            pointsEn: [
              'At Tabuk, the spring trickled no thicker than a sandal strap.',
              'After the Prophet (PBUH) performed ablution and prayed over it, water gushed abundantly for all 30,000 troops.',
            ],
            sourceBn: 'সহীহ মুসলিম, হাদিস নং ২২৮১',
            sourceEn: 'Sahih Muslim, Hadith 2281',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'মসজিদে দিরার ও মুনাফিকদের মুখোশ উন্মোচন',
        titleEn: 'Mosque of Harm & Exposure of Hypocrisy',
        events: [
          {
            titleBn: 'আকাবায় ১২ মুনাফিকের হত্যাচেষ্টা ব্যর্থ',
            titleEn: 'Foiled Ambush at Aqabah',
            pointsBn: [
              'ফেরার পথে রাতের আঁধারে ১২ জন মুখোশধারী মুনাফিক সংকীর্ণ গিরিপথে নবীজি (সা.)-এর উটকে ভয় দেখিয়ে বিপদে ফেলার ষড়যন্ত্র করে।',
              'হুযাইফা (রা.) ও আম্মার (রা.)-এর সতর্কতায় ষড়যন্ত্র ব্যর্থ হয় এবং নবীজি (সা.) হুযাইফা (রা.)-কে সেই মুনাফিকদের গোপন তালিকা জানিয়ে দেন।',
            ],
            pointsEn: [
              'On the return journey, twelve masked hypocrites attempted an ambush in a narrow mountain pass.',
              'Hudhayfah and Ammar (RA) thwarted them; the Prophet (PBUH) entrusted their secret names to Hudhayfah.',
            ],
            sourceBn: 'সহীহ মুসলিম, হাদিস নং ২৭৭৯; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Sahih Muslim, Hadith 2779; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'ষড়যন্ত্রের ঘাঁটি ‘মসজিদে দিরার’ ধ্বংস',
            titleEn: 'Demolition of Masjid al-Dirar',
            pointsBn: [
              'মুসলিমদের মধ্যে বিভেদ সৃষ্টি ও ষড়যন্ত্রের আড্ডা হিসেবে মুনাফিকরা কুবার কাছে ‘মসজিদে দিরার’ বানিয়েছিল।',
              'সূরা আত-তাওবাহর ১০৭–১০৮ নম্বর আয়াতের নির্দেশে নবীজি (সা.) মদিনায় পৌঁছার আগেই সেই ভণ্ড ঘাঁটি ভেঙে ফেলার আদেশ দেন।',
            ],
            pointsEn: [
              'Hypocrites had built “Masjid al-Dirar” near Quba as a cover for intrigue and division.',
              'Guided by Surah at-Tawbah 9:107–108, the Prophet (PBUH) ordered it dismantled before re-entering Madinah.',
            ],
            sourceBn: 'সূরা আত-তাওবাহ: ১০৭–১০৮; সীরাতে ইবনে হিশাম',
            sourceEn: 'Surah at-Tawbah 9:107–108; Sirah Ibn Hisham',
          },
        ],
      },
      {
        phaseNo: 6,
        titleBn: 'তিন সত্যবাদী সাহাবির তাওবাহ কবুল',
        titleEn: 'Repentance of the Three Truthful Companions',
        events: [
          {
            titleBn: 'কাব ইবনে মালিক (রা.)-এর সত্যবাদিতা',
            titleEn: 'Truthfulness of Ka‘b ibn Malik (RA)',
            pointsBn: [
              '৮০ জনের বেশি মুনাফিক মিথ্যা অজুহাত দেখালেও কাব ইবনে মালিক, মুরারাহ ও হিলাল (রা.) কোনো মিথ্যা না বলে অকপটে নিজের গাফিলতি স্বীকার করেন।',
              'আল্লাহর ফয়সালার অপেক্ষায় তাঁদের সাথে ৫০ দিন সামাজিক বয়কট জারি থাকে; এ সময়ে গাসসানি রাজার লোভনীয় চিঠিও কাব (রা.) আগুনে পুড়িয়ে দেন।',
            ],
            pointsEn: [
              'While over eighty hypocrites fabricated excuses, Ka‘b ibn Malik, Murarah, and Hilal (RA) confessed honestly without lying.',
              'Enduring fifty days of social boycott awaiting Allah’s verdict, Ka‘b even burned a tempting letter from the Ghassanid king.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪১৮; সহীহ মুসলিম, হাদিস নং ২৭৬৯',
            sourceEn: 'Sahih al-Bukhari, Hadith 4418; Sahih Muslim, Hadith 2769',
          },
          {
            titleBn: '৫০তম ভোরে তাওবাহ কবুলের মহাঘোষণা',
            titleEn: 'Acceptance of Repentance on the 50th Dawn',
            pointsBn: [
              '৫০তম দিন ফজরের পর আল্লাহ সূরা আত-তাওবাহর ১১৮ নম্বর আয়াত নাযিল করে তিন সাহাবির তাওবাহ কবুলের সুসংবাদ দেন।',
              'আনন্দিত নবীজি (সা.) কাব (রা.)-কে বলেন: ‘তোমার মায়ের গর্ভ থেকে জন্মের পর আজকের দিনটিই তোমার জীবনের শ্রেষ্ঠ দিন!’',
            ],
            pointsEn: [
              'At dawn on the 50th day, Surah at-Tawbah 9:118 descended announcing Allah’s complete forgiveness of the three companions.',
              'Beaming with joy, the Prophet told Ka‘b: “Rejoice in the best day you have known since your mother bore you!”',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪১৮; সূরা আত-তাওবাহ: ১১৭–১১৯',
            sourceEn: 'Sahih al-Bukhari, Hadith 4418; Surah at-Tawbah 9:117–119',
          },
          {
            titleBn: 'নবীজি (সা.)-এর জীবনের সর্বশেষ গাযওয়া',
            titleEn: 'The Final Ghazwah of the Prophet (PBUH)',
            pointsBn: [
              'তাবুক ছিল রাসূলুল্লাহ (সা.)-এর সরাসরি নেতৃত্বাধীন সর্বশেষ সামরিক অভিযান।',
              'এক ফোঁটা রক্তপাত ছাড়াই আরবের উত্তর সীমান্ত নিরাপদ হয় এবং সমগ্র উপদ্বীপে ইসলামের চূড়ান্ত বিজয় নিশ্চিত হয়।',
            ],
            pointsEn: [
              'Tabuk was the final military expedition personally led by Prophet Muhammad (PBUH).',
              'Without shedding blood, it secured Arabia’s northern frontier and cemented Islam’s triumph across the peninsula.',
            ],
            sourceBn: 'সহীহ আল-বুখারী, হাদিস নং ৪৪২২; আর-রাহীকুল মাখতূম',
            sourceEn: 'Sahih al-Bukhari, Hadith 4422; Ar-Raheeq al-Makhtum',
          },
        ],
      },
    ],
  }),
};
