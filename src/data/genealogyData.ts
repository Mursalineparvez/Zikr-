export type PersonRole = 'ahl_al_bayt' | 'sahabi' | 'tabii';

export interface GenealogyPerson {
  id: string;
  nameBn: string;
  nameAr: string;
  role: PersonRole;
  relationNoteBn?: string;
  spouseBn?: string;
  children?: GenealogyPerson[];
  detailsBn?: string;
  isMartyrKarbala?: boolean;
  sahabaId?: string; // Link to SAHABA_DATABASE if exists
}

export interface FamilyBranch {
  id: string;
  titleBn: string;
  titleAr: string;
  icon: string;
  colorTheme: string;
  descriptionBn: string;
  headPerson: GenealogyPerson;
}

export const GENEALOGY_BRANCHES: FamilyBranch[] = [
  {
    id: 'prophet_family',
    titleBn: 'আওলাদে রাসুলুল্লাহ মুহাম্মদ (ﷺ)',
    titleAr: 'أولاد الرسول العربي مُحَمَّد ﷺ',
    icon: '🕋',
    colorTheme: 'from-[#1e1b18] via-[#2d1f10] to-[#120e0a]',
    descriptionBn: 'রাসুলুল্লাহ (ﷺ)-এর পবিত্র ৭ জন সন্তান ও তাঁহা থেকে প্রবাহিত বরকতময় আহলে বাইত ও বংশধারার পূর্ণাঙ্গ শাজারা শরীফ।',
    headPerson: {
      id: 'prophet_muhammad',
      nameBn: 'হযরত মুহাম্মদ (ﷺ)',
      nameAr: 'مُحَمَّدٌ رَسُولُ اللَّهِ ﷺ',
      role: 'ahl_al_bayt',
      relationNoteBn: 'সর্বশেষ ও সর্বশ্রেষ্ঠ নবী এবং রসূল',
      detailsBn: 'আম্মাজান খাদিজাতুল কুবরা (রা.)-এর গর্ভে ৬ জন সন্তান এবং মারিয়া আল কিবতিয়্যাহ (রা.)-এর গর্ভে হযরত ইব্রাহিম (রা.) জন্মগ্রহণ করেন।',
      children: [
        {
          id: 'al_qasim',
          nameBn: 'হযরত আল-কাসিম (রা.)',
          nameAr: 'القاسم بن محمد',
          role: 'sahabi',
          relationNoteBn: 'প্রথম সন্তান (শৈশবে মক্কায় ইন্তেকাল করেন)',
          detailsBn: 'তাঁহার নামানুসারেই নাবী করীম (ﷺ)-এর কুনিয়াত বা ডাকনাম ছিল "আবুল কাসিম"।',
        },
        {
          id: 'zainab_bint_muhammad',
          nameBn: 'হযরত জায়নাব (রা.)',
          nameAr: 'زينب بنت محمد',
          role: 'ahl_al_bayt',
          spouseBn: 'হযরত আবুল-আস ইবনুর রবি (রা.)',
          relationNoteBn: 'রাসুল (ﷺ)-এর জ্যেষ্ঠা কন্যা',
          detailsBn: 'তাঁহার স্বামী আবুল-আস ইবনুর রবি (রা.) ছিলেন আম্মাজান খাদিজা (রা.)-এর আপন ভাগ্নে।',
          children: [
            {
              id: 'ali_bin_abul_as',
              nameBn: 'হযরত আলী ইবনে আবুল-আস (রা.)',
              nameAr: 'علي بن أبي العاص',
              role: 'sahabi',
              relationNoteBn: 'রাসুল (ﷺ)-এর দৌহিত্র (শৈশবে ইন্তেকাল)',
            },
            {
              id: 'umamah_bint_abul_as',
              nameBn: 'হযরত উমামাহ বিনতে আবুল-আস (রা.)',
              nameAr: 'أمامة بنت أبي العاص',
              role: 'sahabi',
              spouseBn: 'হযরত আলী ইবনে আবী তালিব (রা.) [ফাতিমা (রা.)-এর ইন্তেকালের পর]',
              relationNoteBn: 'রাসুল (ﷺ)-এর নাতনি (যাঁহাকে নাবীজী সালাতে কাঁধে তুলতেন)',
            },
          ],
        },
        {
          id: 'abdullah_bin_muhammad',
          nameBn: 'হযরত আবদুল্লাহ (রা.)',
          nameAr: 'عبد الله بن محمد',
          role: 'sahabi',
          relationNoteBn: 'উপাধি: আত-তৈয়্যিব ও আত-তহির (শৈশবে মক্কায় ইন্তেকাল)',
        },
        {
          id: 'ruqayyah_bint_muhammad',
          nameBn: 'হযরত রুকাইয়াহ (রা.)',
          nameAr: 'رُقَيَّةُ بنتُ محمد',
          role: 'ahl_al_bayt',
          spouseBn: 'হযরত উসমান বিন আফফান (রা.)',
          relationNoteBn: 'রাসুল (ﷺ)-এর দ্বিতীয় কন্যা',
          detailsBn: 'হাবশায় প্রথম হিজরতের সৌভাগ্য লাভ করেন। বদর যুদ্ধের সময় ইন্তেকাল করেন।',
        },
        {
          id: 'umay_kulthum_bint_muhammad',
          nameBn: 'হযরত উম্মে কুলসুম (রা.)',
          nameAr: 'أم كلثوم بنت محمد',
          role: 'ahl_al_bayt',
          spouseBn: 'হযরত উসমান বিন আফফান (রা.) [রুকাইয়াহ (রা.)-এর ইন্তেকালের পর]',
          relationNoteBn: 'রাসুল (ﷺ)-এর তৃতীয় কন্যা',
          detailsBn: 'এই দুই কন্যাকে বিবাহের মাধ্যমেই হযরত উসমান (রা.) "জুননুরাইন" (দুই নূরের অধিকারী) উপাধি পান।',
        },
        {
          id: 'fatima_al_zahra',
          nameBn: 'হযরত ফাতিমাতুজ জাহরা (রা.)',
          nameAr: 'فاطمة الزهراء بنت محمد',
          role: 'ahl_al_bayt',
          spouseBn: 'হযরত আলী ইবনে আবী তালিব (রা.)',
          relationNoteBn: 'জান্নাতের নারীদের সর্দার ও রাসুল (ﷺ)-এর প্রিয়তমা কন্যা',
          sahabaId: 'fatima_bint_muhammad',
          children: [
            {
              id: 'hasan_bin_ali',
              nameBn: 'হযরত ইমাম হাসান (রা.)',
              nameAr: 'الحسن بن علي بن أبي طالب',
              role: 'ahl_al_bayt',
              relationNoteBn: 'জান্নাতী যুবকদের সর্দার ও ৫ম খলিফায়ে রাশেদ',
              sahabaId: 'hasan_bin_ali',
            },
            {
              id: 'hussein_bin_ali',
              nameBn: 'হযরত ইমাম হুসাইন (রা.)',
              nameAr: 'الحسين بن علي بن أبي طالب',
              role: 'ahl_al_bayt',
              relationNoteBn: 'জান্নাতী যুবকদের সর্দার ও কারবালার মহান শহীদ',
              sahabaId: 'hussein_bin_ali',
            },
            {
              id: 'muhsin_bin_ali',
              nameBn: 'হযরত মহসিন (রা.)',
              nameAr: 'محسن بن علي',
              role: 'ahl_al_bayt',
              relationNoteBn: 'শৈশবেই ইন্তেকাল করেন',
            },
            {
              id: 'zainab_bint_ali',
              nameBn: 'হযরত জায়নাব বিনতে আলী (রা.)',
              nameAr: 'زينب بنت علي',
              role: 'ahl_al_bayt',
              spouseBn: 'হযরত আবদুল্লাহ ইবনে জাফর (রা.)',
              relationNoteBn: 'কারবালার বীরত্বপূর্ণ সত্যের পতাকাবাহী',
            },
            {
              id: 'umay_kulthum_bint_ali',
              nameBn: 'হযরত উম্মে কুলসুম বিনতে আলী (রা.)',
              nameAr: 'أم كلثوم بنت علي',
              role: 'ahl_al_bayt',
              spouseBn: 'হযরত উমর ইবনুল খাত্তাব (রা.)',
              relationNoteBn: 'আমীরুল মুমিনীন উমর (রা.)-এর মহীয়সী স্ত্রী',
            },
          ],
        },
        {
          id: 'ibrahim_bin_muhammad',
          nameBn: 'হযরত ইব্রাহিম (রা.)',
          nameAr: 'إبراهيم بن محمد',
          role: 'sahabi',
          relationNoteBn: 'আম্মাজান মারিয়া আল কিবতিয়্যাহ (রা.)-এর গর্ভজাত সন্তান',
          detailsBn: 'মদিনায় শৈশবে ইন্তেকালের দিন সূর্যগ্রহণ হয়েছিল, তখন নাবীজী (ﷺ) বলেন "সূর্য ও চন্দ্র আল্লাহর নিদর্শনগুলোর দুটি, কারো মৃত্যু বা জন্মতে তা গ্রহণ হয় না।"'
        },
      ],
    },
  },

  {
    id: 'abu_bakr_family',
    titleBn: 'আওলাদে আবু বকর সিদ্দিক (রা.)',
    titleAr: 'من أولاد أبو بكر الصدّيق رضي الله عنه',
    icon: '💚',
    colorTheme: 'from-[#05231c] via-[#09352a] to-[#041c16]',
    descriptionBn: 'প্রথম খলিফায়ে রাশেদ হযরত আবু বকর সিদ্দিক (রা.)-এর ধন্য সন্তান ও তাঁহাদের সাথে রাসুলুল্লাহ (ﷺ) ও আহলে বাইতের ঐতিহাসিক বংশীয় সম্পর্ক।',
    headPerson: {
      id: 'abu_bakr_as_siddiq',
      nameBn: 'হযরত আবু বকর সিদ্দিক (রা.)',
      nameAr: 'أبو بكر الصدّيق عبد الله بن أبي قحافة',
      role: 'sahabi',
      relationNoteBn: 'রাসুল (ﷺ)-এর সর্বশ্রেষ্ঠ সহচর ও ১ম খলিফায়ে রাশেদ',
      sahabaId: 'abu_bakr',
      children: [
        {
          id: 'aisha_bint_abu_bakr',
          nameBn: 'হযরত আম্মাজান আয়েশা সিদ্দিকা (রা.)',
          nameAr: 'عائشة أم المؤمنين بنت أبي بكر',
          role: 'sahabi',
          spouseBn: 'রাসুলুল্লাহ হযরত মুহাম্মদ (ﷺ)',
          relationNoteBn: 'উম্মুল মুমিনীন ও ইসলামের সর্বশ্রেষ্ঠ নারী ফকিহ/পণ্ডিত',
          sahabaId: 'aisha_bint_abu_bakr',
        },
        {
          id: 'asma_bint_abu_bakr',
          nameBn: 'হযরত আসমা বিনতে আবু বকর (রা.)',
          nameAr: 'أسماء بنت أبي بكر (ذات النطاقين)',
          role: 'sahabi',
          spouseBn: 'হযরত যোবাইর ইবনুল আওয়াম (রা.)',
          relationNoteBn: 'উপাধি: ধাতুন নিতাকাইন (দুই কোমরবন্ধের অধিকারী)',
          sahabaId: 'asma_bint_abu_bakr',
          children: [
            {
              id: 'abdullah_bin_zubayr',
              nameBn: 'হযরত আবদুল্লাহ ইবনুল জুবায়ের (রা.)',
              nameAr: 'عبد الله بن الزبير',
              role: 'sahabi',
              relationNoteBn: 'মদিনায় হিজরতের পর মুসলিমদের প্রথম নবজাতক সন্তান',
              sahabaId: 'abdullah_bin_zubayr',
            },
            {
              id: 'musab_bin_zubayr',
              nameBn: 'مصعب بن الزبير (মুসআব বিন যোবাইর)',
              nameAr: 'مصعب بن الزبير',
              role: 'tabii',
              relationNoteBn: 'বিখ্যাত তাবেয়ী ও কুফার গভর্নর',
            },
            {
              id: 'hind_bint_zubayr',
              nameBn: 'হিন্দ বিনতে যোবাইর',
              nameAr: 'هند بنت الزبير',
              role: 'tabii',
            },
          ],
        },
        {
          id: 'abdur_rahman_bin_abu_bakr',
          nameBn: 'হযরত আবদুর রহমান ইবনে আবু বকর (রা.)',
          nameAr: 'عبد الرحمن بن أبي بكر',
          role: 'sahabi',
          relationNoteBn: 'কুরাইশদের অসমসাহসী বীর ও প্রবীণ সাহাবি',
          children: [
            {
              id: 'muhammad_bin_abdur_rahman',
              nameBn: 'মুহাম্মদ বিন আবদুর রহমান',
              nameAr: 'محمد بن عبد الرحمن',
              role: 'tabii',
            },
            {
              id: 'hafsa_bint_abdur_rahman',
              nameBn: 'হফসা বিনতে আবদুর রহমান',
              nameAr: 'حفصة بنت عبد الرحمن',
              role: 'tabii',
            },
          ],
        },
        {
          id: 'muhammad_bin_abu_bakr',
          nameBn: 'হযরত মুহাম্মদ বিন আবু বকর (রা.)',
          nameAr: 'محمد بن أبي بكر',
          role: 'sahabi',
          relationNoteBn: 'হযরত আলী (রা.)-এর স্নেহাস্পদ ও মিশরের গভর্নিং সাহাবি',
          children: [
            {
              id: 'al_qasim_bin_muhammad',
              nameBn: 'আল-কাসিম বিন মুহাম্মদ (রহ.)',
              nameAr: 'القاسم بن محمد بن أبي بكر',
              role: 'tabii',
              relationNoteBn: 'মদিনার বিখ্যাত ৭ ফকিহের (Fuqaha of Madinah) অন্যতম মহামানব',
              children: [
                {
                  id: 'umay_farwa_fatima',
                  nameBn: 'উম্মে ফারওয়া ফাতিমা (রহ.)',
                  nameAr: 'فاطمة أم فروة',
                  role: 'tabii',
                  spouseBn: 'ইমাম মুহাম্মদ আল-বাকির (রহ.)',
                  relationNoteBn: 'ইমাম জাফর আস-সাদিক (রহ.)-এর শ্রদ্ধেয় মাতা!',
                  detailsBn: 'এই বিবাহের মাধ্যমেই হযরত আবু বকর সিদ্দিক (রা.) ও আহলে বাইতে রাসুলের রূহানী রক্তধারা একত্রিত হয়!',
                },
              ],
            },
          ],
        },
        {
          id: 'umay_kulthum_bint_abu_bakr',
          nameBn: 'হযরত উম্মে কুলসুম বিনতে আবু বকর (রা.)',
          nameAr: 'أم كلثوم بنت أبي بكر',
          role: 'sahabi',
          relationNoteBn: 'হযরত আবু বকর (রা.)-এর ইন্তেকালের পর জন্মগ্রহণকারী কন্যা',
        },
      ],
    },
  },

  {
    id: 'umar_family',
    titleBn: 'আওলাদে উমর ইবনুল খাত্তাব (রা.)',
    titleAr: 'من أولاد عُمر بن الخطاب رضي الله عنه',
    icon: '🛡️',
    colorTheme: 'from-[#201505] via-[#352309] to-[#1a1104]',
    descriptionBn: 'দ্বিতীয় খলিফা হযরত উমর ফারুক (রা.)-এর পরিবার এবং আহলে বাইতের সাথে তাঁহাদের গভীর বৈবাহিক আত্বীয়তা।',
    headPerson: {
      id: 'umar_bin_khattab',
      nameBn: 'হযরত উমর ইবনুল খাত্তাব (রা.)',
      nameAr: 'عُمر بن الخطاب (الفاروق)',
      role: 'sahabi',
      relationNoteBn: '২য় খলিফায়ে রাশেদ ও আমীরুল মুমিনীন',
      sahabaId: 'umar_bin_khattab',
      children: [
        {
          id: 'hafsa_bint_umar',
          nameBn: 'হযরত আম্মাজান হাফসা (রা.)',
          nameAr: 'حفصة أم المؤمنين بنت عمر',
          role: 'sahabi',
          spouseBn: 'রাসুলুল্লাহ হযরত মুহাম্মদ (ﷺ)',
          relationNoteBn: 'উম্মুল মুমিনীন ও পবিত্র কুরআন গ্রন্থ সংরক্ষক',
          sahabaId: 'hafsa_bint_umar',
        },
        {
          id: 'asim_bin_umar',
          nameBn: 'হযরত আসিম বিন উমর (রা.)',
          nameAr: 'عاصم بن عمر بن الخطاب',
          role: 'sahabi',
          spouseBn: 'উম্মে আম্মার বিনতে আলী বিন আবী তালিব',
          relationNoteBn: 'বিখ্যাত খলিফা উমর ইবনে আবদুল আজিজ (রহ.)-এর মাতামহ (দাদা)!',
        },
        {
          id: 'ruqayyah_bint_umar',
          nameBn: 'রুকাইয়াহ বিনতে উমর',
          nameAr: 'رقية بنت عمر بن الخطاب',
          role: 'tabii',
        },
        {
          id: 'zayd_bin_umar',
          nameBn: 'যায়েদ বিন উমর (রহ.)',
          nameAr: 'زيد بن عمر بن الخطاب',
          role: 'tabii',
          relationNoteBn: 'মাতা: হযরত উম্মে কুলসুম বিনতে আলী বিন আবী তালিব (রা.)',
          detailsBn: 'হযরত উমর (রা.) ও হযরত আলী (রা.)-এর কন্যার ঔরসজাত সন্তান!',
        },
      ],
    },
  },

  {
    id: 'uthman_family',
    titleBn: 'আওলাদে উসমান বিন আফফান (রা.)',
    titleAr: 'من أولاد عُثمان بن عفّان رضي الله عنه',
    icon: '🕊️',
    colorTheme: 'from-[#032025] via-[#07363e] to-[#02181c]',
    descriptionBn: 'তৃতীয় খলিফা হযরত উসমান জুননুরাইন (রা.)-এর পরিবার এবং রাসুলুল্লাহ (ﷺ)-এর দুই কন্যার সাথে পবিত্র বন্ধন।',
    headPerson: {
      id: 'uthman_bin_affan',
      nameBn: 'হযরত উসমান বিন আফফান (রা.)',
      nameAr: 'عُثمان بن عفّان (ذو النورين)',
      role: 'sahabi',
      relationNoteBn: '৩য় খলিফায়ে রাশেদ ও জুননুরাইন (দুই নূরের অধিকারী)',
      sahabaId: 'uthman_bin_affan',
      children: [
        {
          id: 'amr_bin_uthman',
          nameBn: 'عمرو بن عثمان (আম্র বিন উসমান)',
          nameAr: 'عمرو بن عثمان بن عفان',
          role: 'tabii',
          spouseBn: 'ফাতিমা বিনতে আল-হুসাইন (রা.)',
          relationNoteBn: 'ইমাম হুসাইন (রা.)-এর কন্যাকে বিবাহ করেন',
        },
        {
          id: 'aban_bin_uthman',
          nameBn: 'أبان بن عثمان (অ্যাবান বিন উসমান)',
          nameAr: 'أبان بن عثمان بن عفان',
          role: 'tabii',
          spouseBn: 'উম্মে কুলসুম বিনতে জাফর আল-তৈয়্যার',
          relationNoteBn: 'মদিনার প্রখ্যাত তাবেয়ী ও ফকিহ',
        },
        {
          id: 'umar_bin_uthman',
          nameBn: 'عمر بن عثمان (উমর বিন উসমান)',
          nameAr: 'عمر بن عثمان بن عفان',
          role: 'tabii',
          spouseBn: 'স্কাইনা বিনতে আল-হুসাইন (রা.)',
        },
      ],
    },
  },

  {
    id: 'ali_family',
    titleBn: 'আওলাদে আলী বিন আবী তালিব (রা.)',
    titleAr: 'من أولاد علي بن أبي طالب رضي الله عنه',
    icon: '⚔️',
    colorTheme: 'from-[#290808] via-[#420f0f] to-[#1e0505]',
    descriptionBn: '৪র্থ খলিফায়ে রাশেদ হযরত আলী (রা.)-এর মহীয়সী সন্তানগণ ও কারবালার ময়দানে ইসলাম রক্ষায় তাঁহাদের অভূতপূর্ব শাহাদাত।',
    headPerson: {
      id: 'ali_bin_abi_talib',
      nameBn: 'হযরত আলী বিন আবী তালিব (রা.)',
      nameAr: 'علي بن أبي طالب (أسد الله الغالب)',
      role: 'ahl_al_bayt',
      relationNoteBn: '৪র্থ খলিফায়ে রাশেদ, আসাদুল্লাহ (আল্লাহর সিংহ) ও রাসুল (ﷺ)-এর চাচাতো ভাই',
      sahabaId: 'ali_bin_abi_talib',
      children: [
        {
          id: 'al_hasan_ali',
          nameBn: 'হযরত ইমাম হাসান (রা.)',
          nameAr: 'الحسن بن علي بن أبي طالب',
          role: 'ahl_al_bayt',
          relationNoteBn: 'জান্নাতী যুবকদের সর্দার ও ৫ম খলিফায়ে রাশেদ',
          sahabaId: 'hasan_bin_ali',
        },
        {
          id: 'al_hussein_ali',
          nameBn: 'হযরত ইমাম হুসাইন (রা.)',
          nameAr: 'الحسين بن علي بن أبي طالب',
          role: 'ahl_al_bayt',
          relationNoteBn: 'জান্নাতী যুবকদের সর্দার ও কারবালার মহান শহীদ',
          sahabaId: 'hussein_bin_ali',
        },
        {
          id: 'al_abbas_bin_ali',
          nameBn: 'হযরত আল-আব্বাস বিন আলী (রা.)',
          nameAr: 'العباس بن علي (أبو الفضل)',
          role: 'ahl_al_bayt',
          isMartyrKarbala: true,
          relationNoteBn: 'কারবালার ময়দানে ইমাম হুসাইনের বিশ্বস্ত বীর ভাই (শহীদ)',
        },
        {
          id: 'umar_al_akbar',
          nameBn: 'হযরত উমর আল-আকবর বিন আলী (রা.)',
          nameAr: 'عمر الأكبر بن علي',
          role: 'ahl_al_bayt',
          isMartyrKarbala: true,
          relationNoteBn: 'কারবালার ময়দানে শহীদ প্রবীণ ভাই',
        },
        {
          id: 'abu_bakr_bin_ali',
          nameBn: 'হযরত আবু বকর বিন আলী (রা.)',
          nameAr: 'أبو بكر بن علي بن أبي طالب',
          role: 'ahl_al_bayt',
          isMartyrKarbala: true,
          relationNoteBn: 'হযরত আবু বকর (রা.)-এর সম্মানে হযরত আলী (রা.) কর্তৃক নামাঙ্কিত (কারবালায় শহীদ)',
        },
        {
          id: 'uthman_al_akbar',
          nameBn: 'হযরত উসমান আল-আকবর বিন আলী (রা.)',
          nameAr: 'عثمان الأكبر بن علي',
          role: 'ahl_al_bayt',
          isMartyrKarbala: true,
          relationNoteBn: 'হযরত উসমান (রা.)-এর সম্মানে হযরত আলী (রা.) কর্তৃক নামাঙ্কিত (কারবালায় শহীদ)',
        },
        {
          id: 'muhammad_bin_al_hanafiyyah',
          nameBn: 'হযরত মুহাম্মদ বিন আল-হানফিয়্যাহ (রহ.)',
          nameAr: 'محمد بن الحنفية',
          role: 'tabii',
          relationNoteBn: 'হযরত আলীর প্রখ্যাত বীর সন্তান ও তাবেয়ী',
        },
      ],
    },
  },

  {
    id: 'hasan_hussein_lineage',
    titleBn: 'আওলাদে হাসান ও হুসাইন (রা.) — ইমাম বংশধারা',
    titleAr: 'من أولاد الحسن والحسين عليهما السلام',
    icon: '👑',
    colorTheme: 'from-[#1e1029] via-[#311742] to-[#12081a]',
    descriptionBn: 'আহলে বাইতের দুই রত্ন হযরত হাসান ও হুসাইন (রা.)-এর পরবর্তী প্রখ্যাত তাবেয়ী, সালফে সালেহীন ও ইমামগণের তালিকা।',
    headPerson: {
      id: 'imams_root',
      nameBn: 'ইমাম হাসান ও ইমাম হুসাইন (রা.)-এর বংশধরগণ',
      nameAr: 'ذُرِّيَّةُ سَيِّدَيْ شَبَابِ أَهْلِ الْجَنَّةِ',
      role: 'ahl_al_bayt',
      children: [
        {
          id: 'al_hasan_al_muthanna',
          nameBn: 'الحسن المثنى (আল-হাসান আল-মুসান্না)',
          nameAr: 'الحسن المثنى بن الحسن بن علي',
          role: 'tabii',
          relationNoteBn: 'ইমাম হাসানের জ্যেষ্ঠ পুত্র (কারবালায় আহত হন)',
          children: [
            {
              id: 'hasan_tri',
              nameBn: 'হাসান ইবনে হাসান আল-মুসান্না',
              nameAr: 'الحسن بن الحسن المثنى',
              role: 'tabii',
            },
            {
              id: 'abu_bakr_hasan',
              nameBn: 'আবু বকর ইবনে হাসান',
              nameAr: 'أبو بكر بن الحسن',
              role: 'tabii',
              isMartyrKarbala: true,
              relationNoteBn: 'কারবালার ময়দানে চাচা হুসাইনের সাথে শহীদ',
            },
            {
              id: 'umar_hasan',
              nameBn: 'উমর ইবনে হাসান',
              nameAr: 'عمر بن الحسن',
              role: 'tabii',
              isMartyrKarbala: true,
              relationNoteBn: 'কারবালার ময়দানে শহীদ',
            },
          ],
        },
        {
          id: 'ali_zain_al_abidin',
          nameBn: 'ইমাম আলী জয়নুল আবেদীন (রহ.)',
          nameAr: 'علي بن الحسين (زين العابدين)',
          role: 'ahl_al_bayt',
          relationNoteBn: 'ইমাম হুসাইনের একমাত্র জীবিত পুত্র সন্তান ও বিখ্যাত তাবেয়ী ইমাম',
          children: [
            {
              id: 'muhammad_al_baqir',
              nameBn: 'ইমাম মুহাম্মদ আল-বাকির (রহ.)',
              nameAr: 'محمد بن علي (الباقر)',
              role: 'ahl_al_bayt',
              relationNoteBn: 'বিখ্যাত ইমাম ও মদিনার মহান জ্ঞানতাপস',
              detailsBn: 'তাঁহার মাতা ছিলেন উম্মে ফারওয়া (হযরত আবু বকর সিদ্দিকের প্রপৌত্রী)!',
            },
            {
              id: 'umar_al_ashraf',
              nameBn: 'উমর আল-আশরাফ ইবনে জয়নুল আবেদীন',
              nameAr: 'عمر الأشرف بن زين العابدين',
              role: 'tabii',
            },
            {
              id: 'aisha_bint_zain_al_abidin',
              nameBn: 'আয়েশা বিনতে জয়নুল আবেদীন',
              nameAr: 'عائشة بنت زين العابدين',
              role: 'tabii',
            },
          ],
        },
        {
          id: 'sukaynah_bint_hussein',
          nameBn: 'হযরত স্কাইনা বিনতে আল-হুসাইন (রা.)',
          nameAr: 'سكينة بنت الحسين',
          role: 'ahl_al_bayt',
          spouseBn: 'যায়েদ বিন عمرو bin Uthman',
          relationNoteBn: 'ইমাম হুসাইনের মহীয়সী কন্যা',
        },
        {
          id: 'fatima_bint_hussein',
          nameBn: 'হযরত ফাতিমা বিনতে আল-হুসাইন (রা.)',
          nameAr: 'فاطمة بنت الحسين',
          role: 'ahl_al_bayt',
          spouseBn: 'হাসান আল-মুসান্না ইবনে হাসান (রা.)',
          relationNoteBn: 'ইমাম হুসাইনের শ্রদ্ধাভাজন কন্যা',
        },
      ],
    },
  },
];

export const INTERMARRIAGE_HIGHLIGHTS = [
  {
    titleBn: '১. রাসুলুল্লাহ (ﷺ) ও খলিফায়ে রাশেদীনগণের গভীর বৈবাহিক আত্মীয়তা',
    descBn: 'রাসুলুল্লাহ (ﷺ) হযরত আবু বকর (রা.)-এর কন্যা হযরত আয়েশা (রা.) এবং হযরত উমর (রা.)-এর কন্যা হযরত হাফসা (রা.)-কে বিবাহ করেন। আবার স্বীয় দুই কন্যা হযরত রুকাইয়াহ ও উম্মে কুলসুম (রা.)-কে হযরত উসমান (রা.)-এর সাথে এবং প্রিয় কন্যা হযরত ফাতিমা (রা.)-কে হযরত আলী (রা.)-এর সাথে বিবাহ দেন।',
    icon: '💍',
  },
  {
    titleBn: '২. হযরত উমর (রা.) ও হযরত আলী (রা.)-এর কন্যার শুভ বিবাহ',
    descBn: 'আমীরুল মুমিনীন হযরত উমর ইবনুল খাত্তাব (রা.) হযরত আলী (রা.) ও হযরত ফাতিমাতুজ জাহরা (রা.)-এর কন্যা হযরত উম্মে কুলসুম (রা.)-কে বিবাহ করেন। তাঁহাদের কোল আলো করে জন্মগ্রহণ করেন হযরত যায়েদ বিন উমর (রহ.)।',
    icon: '🤝',
  },
  {
    titleBn: '৩. হযরত আলী (রা.) কর্তৃক সন্তানদের নাম রাখা',
    descBn: 'হযরত আলী (রা.) প্রথম ৩ খলিফা হযরত আবু বকর, হযরত উমর ও হযরত উসমান (রা.)-কে এতটাই ভালোবাসতেন যে স্বীয় ৩ পুত্রের নাম রেখেছিলেন: আবু বকর বিন আলী, উমর বিন আলী এবং উসমান বিন আলী—যাঁরা সকলেই কারবালার ময়দানে শহীদ হন।',
    icon: '❤️',
  },
  {
    titleBn: '৪. হযরত আবু বকর (রা.) ও আহলে বাইতের রক্তধারা মিলন',
    descBn: 'হযরত আবু বকর (রা.)-এর প্রপৌত্রী উম্মে ফারওয়া (রহ.)-এর সাথে ইমাম হুসাইন (রা.)-এর পৌত্র ইমাম মুহাম্মদ আল-বাকির (রহ.)-এর বিবাহ হয়, যাঁহাদের সুযোগ্য সন্তান হলেন ৬ষ্ঠ ইমাম হযরত জাফর আস-সাদিক (রহ.)।',
    icon: '✨',
  },
];
