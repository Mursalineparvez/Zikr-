import { WarChronicleBundle, buildWarBundle } from './warChroniclesTypes';

export const RASHIDUN_WAR_CHRONICLES: Record<string, WarChronicleBundle> = {
  // =========================================================================
  // 10. DHAT AL-SALASIL / BATTLE OF CHAINS (১২ হিজরি / ৬৩৩ খ্রি.)
  // =========================================================================
  dhat_salasil: buildWarBundle({
    warId: 'dhat_salasil',
    datePlaceBn: 'মুহাররম ১২ হিজরি · কাযিমা (বর্তমান কুয়েত সীমান্ত, দক্ষিণ ইরাক)',
    datePlaceEn: 'Muharram 12 AH · Kazima (Southern Iraq / Kuwait border)',
    battleShortBn: 'যাতুস সালাসিল (শিকলের যুদ্ধ)',
    battleShortEn: 'Battle of Chains (Dhat al-Salasil)',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'খলিফা আবু বকর (রা.)-এর ফরমান ও ইরাক অভিযান',
        titleEn: 'Caliph Abu Bakr’s Directive & Iraq Campaign',
        events: [
          {
            titleBn: 'মুসান্না ইবনে হারিসার আবেদন ও খালিদ (রা.)-এর নিয়োগ',
            titleEn: 'Al-Muthanna’s Report & Appointment of Khalid (RA)',
            pointsBn: [
              'রিদ্দার যুদ্ধ শেষ হওয়ার পর মুসান্না ইবনে হারিসা (রা.) মদিনায় এসে পারস্য সীমান্তের পরিস্থিতি তুলে ধরেন।',
              'খলিফা আবু বকর সিদ্দীক (রা.) হযরত খালিদ বিন ওয়ালিদ (রা.)-কে ইরাক অভিযানের প্রধান সেনাপতি নিয়োগ করেন।',
              'উদ্দেশ্য ছিল ইরাকের আরব গোত্রগুলোকে সাসানীয় নির্যাতন থেকে মুক্ত করা ও ইসলামের দাওয়াত পৌঁছানো।',
            ],
            pointsEn: [
              'After the Ridda wars, al-Muthanna ibn Haritha (RA) reported the Persian frontier conditions in Madinah.',
              'Caliph Abu Bakr (RA) appointed Khalid ibn al-Walid (RA) as supreme commander of the Iraq campaign.',
              'The mission aimed to liberate Arab tribes in Iraq from Sassanid oppression and convey Islam.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৪৩; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 343; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'হরমুযের কাছে ইসলামের ঐতিহাসিক দাওয়াতি পত্র',
            titleEn: 'Historic Letter of Invitation to Hormuz',
            pointsBn: [
              'খালিদ (রা.) পারস্য সীমান্তের গভর্নর হরমুযের কাছে চিঠি পাঠিয়ে তিনটি শর্ত দেন—ইসলাম গ্রহণ, জিজিয়া প্রদান অথবা যুদ্ধ।',
              'চিঠিতে তিনি লিখেন: “আমি এমন এক জাতি নিয়ে এসেছি যারা মৃত্যুকে তেমনই ভালোবাসে যেমন তোমরা জীবন ও মদকে ভালোবাসো।”',
              'অহংকারী হরমুয দাওয়াত প্রত্যাখ্যান করে সাসানীয় সম্রাটকে খবর পাঠিয়ে বিশাল বাহিনী নিয়ে অগ্রসর হয়।',
            ],
            pointsEn: [
              'Khalid (RA) sent Hormuz, Persian frontier governor, three options: Islam, Jizyah, or battle.',
              'He famously wrote: "I bring men who love death as passionately as you love life and wine."',
              'Arrogant Hormuz rejected the call, alerted the Persian court, and marched with a massive army.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৪৯; ফুতূহুল বুলদান — বালাযুরী',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 349; Futuh al-Buldan — Al-Baladhuri',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'খালিদ (রা.)-এর মরু-কৌশল ও ক্লান্তিকর গতিপথ',
        titleEn: 'Khalid’s Desert Maneuver & Exhaustion Strategy',
        events: [
          {
            titleBn: 'তিন ভাগে বিভক্ত মুসলিম বাহিনীর কুচকাওয়াজ',
            titleEn: 'Three-Column Advance into Kazima',
            pointsBn: [
              'খালিদ (রা.) তাঁর ১৮ হাজার সৈন্যকে তিন দলে ভাগ করে আলাদা দিনে হাফিরের দিকে রওনা করান।',
              'এতে মরুভূমির পানির উৎসগুলোর ওপর চাপ কম পড়ে এবং শত্রুর গুপ্তচরেরা বিভ্রান্ত হয়।',
              'সবাই একই সময়ে কাযিমার কাছে মিলিত হওয়ার নির্দেশ পায়।',
            ],
            pointsEn: [
              'Khalid (RA) divided his 18,000 troops into three divisions marching on consecutive days toward Hafir.',
              'This preserved scarce desert water wells and confused Sassanid scouts.',
              'All columns were timed to converge simultaneously near Kazima.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৪৮; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 348; Al-Kamil fit-Tarikh',
          },
          {
            titleBn: 'হাফির থেকে কাযিমায় দ্রুত গতিপথ পরিবর্তন',
            titleEn: 'Sudden Redirection from Hafir to Kazima',
            pointsBn: [
              'হরমুয প্রথমে হাফিরের কূপগুলো দখল করে অপেক্ষা করছিল; কিন্তু খালিদ (রা.) হঠাৎ কাযিমার দিকে ঘুরে যান।',
              'ভারী লৌহবর্ম পরিহিত পারস্য বাহিনী তাড়াহুড়ো করে কাযিমায় ছুটতে গিয়ে তীব্র ক্লান্ত ও তৃষ্ণার্ত হয়ে পড়ে।',
              'মুসলিম বাহিনী আগেই কাযিমার পানির ঝরনাগুলো দখল করে সতেজ অবস্থায় অবস্থান নেয়।',
            ],
            pointsEn: [
              'Hormuz first occupied Hafir’s wells, but Khalid (RA) abruptly pivoted toward Kazima.',
              'Heavily armored Persian troops rushed to Kazima, arriving exhausted and parched.',
              'The Muslims secured Kazima’s water springs first and rested before combat.',
            ],
            sourceBn: 'আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৬; তারীখে তাবারী',
            sourceEn: 'Al-Bidayah wan-Nihayah, Vol. 6; Tarikh al-Tabari',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'শিকলবদ্ধ সৈন্য ও হরমুযের বিশ্বাসঘাতকতা',
        titleEn: 'Chained Ranks & Hormuz’s Treachery',
        events: [
          {
            titleBn: 'যাতুস সালাসিল বা শিকলের যুদ্ধ নামকরণের কারণ',
            titleEn: 'Origin of the Name "Battle of Chains"',
            pointsBn: [
              'পারস্য বাহিনীর অভিজাত সৈন্যরা যাতে যুদ্ধক্ষেত্র থেকে পালিয়ে না যায়, সেজন্য তাদের নিজেদের পা বা কোমর শিকল দিয়ে বেঁধে রাখা হয়েছিল।',
              'এই শিকলের কারণেই ইতিহাসে যুদ্ধটি “যাতুস সালাসিল” বা শিকলের যুদ্ধ নামে পরিচিত হয়।',
              'হরমুয ভেবেছিল শিকল সৈন্যদের দৃঢ়তা বাড়াবে, কিন্তু পিছু হটার সময় এটিই তাদের ধ্বংসের কারণ হয়।',
            ],
            pointsEn: [
              'Elite Persian infantry linked themselves together with iron chains to prevent retreat.',
              'This practice gave the engagement its famous name, "Dhat al-Salasil" (Battle of Chains).',
              'Intended to enforce resolve, the chains became a death trap once their line broke.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৫১; ফুতূহুল বুলদান',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 351; Futuh al-Buldan',
          },
          {
            titleBn: 'দ্বন্দ্বযুদ্ধে হরমুযের ষড়যন্ত্র ও কা’কা (রা.)-এর বীরত্ব',
            titleEn: 'Hormuz’s Duel Ambush & Al-Qa’qa’s Rescue',
            pointsBn: [
              'যুদ্ধের শুরুতে হরমুয খালিদ (রা.)-কে দ্বন্দ্বযুদ্ধে আহ্বান করে এবং গোপনে নিজের রক্ষীদের ইঙ্গিত দিলে আক্রমণের নির্দেশ দেয়।',
              'দ্বন্দ্বযুদ্ধে খালিদ (রা.) হরমুযকে চেপে ধরতেই পারস্য ঘাতকরা চারদিক থেকে ছুটে আসে।',
              'তৎক্ষণাৎ বীর সাহাবি কা’কা ইবনে আমর (রা.) ঝাঁপিয়ে পড়ে ঘাতকদের নিধন করেন এবং খালিদ (রা.) হরমুযকে হত্যা করেন।',
            ],
            pointsEn: [
              'Hormuz challenged Khalid (RA) to single combat while secretly plotting an ambush by his guards.',
              'As Khalid (RA) grappled Hormuz, Persian assassins rushed in on signal.',
              'Al-Qa’qa ibn Amr (RA) charged instantly to cut down the ambushers while Khalid (RA) slew Hormuz.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৫০–৩৫১; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 350–351; Al-Kamil fit-Tarikh',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'সর্বাত্মক আক্রমণ ও পারস্য ব্যূহের পতন',
        titleEn: 'General Assault & Collapse of Persian Lines',
        events: [
          {
            titleBn: 'ক্লান্ত পারস্য বাহিনীর ওপর মুসলিমদের প্রবল ধাক্কা',
            titleEn: 'Muslim Charge Breaks the Exhausted Persian Front',
            pointsBn: [
              'সেনাপতি হরমুযের পতনের পরপরই খালিদ (রা.) সর্বাত্মক আক্রমণের নির্দেশ দেন।',
              'তৃষ্ণার্ত ও ভারী বর্মে ক্লান্ত পারস্য সৈন্যরা হালকা-অস্ত্রধারী দ্রুতগামী মুসলিম অশ্বারোহীদের সামনে টিকতে পারেনি।',
              'পারস্যের দুই পার্শ্ব-সেনাপতি কুবাদ ও আনুশজান পালিয়ে যেতে বাধ্য হয়।',
            ],
            pointsEn: [
              'Immediately after Hormuz fell, Khalid (RA) ordered a general charge across the line.',
              'Parched and encumbered by heavy armor, Persian ranks buckled against swift Muslim cavalry.',
              'Persian wing commanders Qubadh and Anushjan fled the field.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৫১; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 351; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'শিকলবদ্ধ সৈন্যদের বিপর্যয় ও পানি অধিকার',
            titleEn: 'Disaster of the Chained Ranks & Securing Water',
            pointsBn: [
              'পিছু হটতে গিয়ে শিকলবদ্ধ পারস্য সৈন্যরা একে অপরের সাথে জড়িয়ে পড়ে এবং ব্যাপক হতাহত হয়।',
              'মুসলিম বাহিনী পুরো কাযিমা অঞ্চল ও বিশাল রসদভাণ্ডার দখল করে নেয়।',
              'স্থানীয় কৃষক ও নিরীহ জনসাধারণের জান-মাল ও ভূমির পূর্ণ নিরাপত্তা ঘোষণা করা হয়।',
            ],
            pointsEn: [
              'In retreat, chained Persian soldiers tripped and entangled one another, suffering heavy losses.',
              'Muslims captured Kazima along with vast supplies.',
              'Full protection of life, land, and property was guaranteed to local peasants and civilians.',
            ],
            sourceBn: 'ফুতূহুল বুলদান — বালাযুরী; তারীখে তাবারী, খণ্ড ৩',
            sourceEn: 'Futuh al-Buldan — Al-Baladhuri; Tarikh al-Tabari, Vol. 3',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'বিজয়ের ফল ও খলিফার কাছে গনিমত প্রেরণ',
        titleEn: 'Aftermath & Tribute to Madinah',
        events: [
          {
            titleBn: 'হরমুযের বহুমূল্য মুকুট ও মদিনায় বিজয়-বার্তা',
            titleEn: 'Hormuz’s Jeweled Crown & Dispatch to Madinah',
            pointsBn: [
              'হরমুযের এক লক্ষ দিরহাম মূল্যের রত্নখচিত মুকুট খলিফা আবু বকর (রা.) খালিদ (রা.)-কেই নফল পুরস্কার হিসেবে দান করেন।',
              'গনিমতের এক-পঞ্চমাংশ (খুমুস) ও একটি হাতি মদিনায় পাঠানো হয়—মদিনাবাসী জীবনে প্রথম হাতি দেখে বিস্মিত হয়েছিল।',
            ],
            pointsEn: [
              'Caliph Abu Bakr (RA) awarded Hormuz’s 100,000-dirham jeweled crown to Khalid (RA).',
              'The fifth share (khums) and a captured war elephant were sent to Madinah, astonishing the citizens.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৫২; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 352; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'ইরাকের প্রবেশদ্বার উন্মুক্ত হওয়া',
            titleEn: 'Opening the Gateway to Iraq',
            pointsBn: [
              'এটি ছিল সাসানীয় সাম্রাজ্যের বিরুদ্ধে ইসলামী খিলাফতের প্রথম আনুষ্ঠানিক ও নির্ণায়ক বিজয়।',
              'এর ফলে উবুল্লাহ বন্দর ও নিম্ন ইরাকের পথ মুসলিম বাহিনীর জন্য উন্মুক্ত হয়ে যায়।',
            ],
            pointsEn: [
              'This was the Rashidun Caliphate’s first formal decisive victory against the Sassanid Empire.',
              'It opened the strategic port of Ubullah and the plains of lower Iraq to Muslim advances.',
            ],
            sourceBn: 'আল-কামিল ফিত-তারীখ, খণ্ড ২; ফুতূহুল বুলদান',
            sourceEn: 'Al-Kamil fit-Tarikh, Vol. 2; Futuh al-Buldan',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // 11. BATTLE OF WALAJA (সফর ১২ হিজরি / মে ৬৩৩ খ্রি.)
  // =========================================================================
  walaja: buildWarBundle({
    warId: 'walaja',
    datePlaceBn: 'সফর ১২ হিজরি (মে ৬৩৩ খ্রি.) · ওয়ালাজা, ফোরাত-দজলা অববাহিকা (ইরাক)',
    datePlaceEn: 'Safar 12 AH (May 633 CE) · Walaja, Euphrates-Tigris Basin (Iraq)',
    battleShortBn: 'ওয়ালাজার যুদ্ধ',
    battleShortEn: 'Battle of Walaja',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'পারস্য সম্রাটের পাল্টা সমারোহ ও আন্দরযগরের বাহিনী',
        titleEn: 'Sassanid Counter-Mobilization under Andarzaghar',
        events: [
          {
            titleBn: 'মাজারের পরাজয়ের পর সাসানীয়দের বৃহৎ সমাবেশ',
            titleEn: 'Grand Sassanid Rally after Battle of the River',
            pointsBn: [
              'যাতুস সালাসিল ও মাজারের (নদীর যুদ্ধ) পরাজয়ে ক্ষুব্ধ হয়ে পারস্য সম্রাট ইয়াযদগির্দ (বা দরবার) বিশাল বাহিনী গঠনের নির্দেশ দেয়।',
              'অভিজ্ঞ সেনাপতি আন্দরযগরের নেতৃত্বে খোরাসান ও ইরাকের আরব-খ্রিস্টান মিত্রদের নিয়ে প্রায় ৫০–৬০ হাজার সৈন্য ওয়ালাজায় সমবেত হয়।',
            ],
            pointsEn: [
              'Stung by defeats at Chains and the River, the Sassanid court ordered massive mobilization.',
              'Veteran general Andarzaghar assembled ~50,000–60,000 Persian troops and Christian Arab allies at Walaja.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৫৫; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 355; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'বাহমান জাযুয়াইহের দ্বিতীয় বাহিনী পৌঁছানোর আগেই আক্রমণ সিদ্ধান্ত',
            titleEn: 'Decision to Strike Before Bahman’s Reinforcements Arrive',
            pointsBn: [
              'পারস্যের আরেক বিশাল সেনাপতি বাহমান জাযুয়াইহ অতিরিক্ত সৈন্য নিয়ে আন্দরযগরের সাথে যোগ দিতে আসছিল।',
              'খালিদ (রা.) গোয়েন্দা সূত্রে খবর পেয়ে দুই বাহিনী মিলিত হওয়ার আগেই ওয়ালাজায় বিদ্যুৎগতিতে হাজির হন।',
            ],
            pointsEn: [
              'A second Persian army under Bahman Jadhuyih was marching to reinforce Andarzaghar.',
              'Alerted by scouts, Khalid (RA) force-marched to strike at Walaja before the two armies merged.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৫৬; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 356; Al-Kamil fit-Tarikh',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'রাতের আঁধারে দুই পাহাড়ের পেছনে অশ্বারোহী অ্যাম্বুশ',
        titleEn: 'Nocturnal Double-Envelopment Cavalry Ambush',
        events: [
          {
            titleBn: 'বিস্ময়কর ‘ডাবল এনভেলপমেন্ট’ বা সাঁড়াশি পরিকল্পনা',
            titleEn: 'Masterpiece Double-Envelopment Battle Plan',
            pointsBn: [
              'ওয়ালাজার প্রান্তর ছিল দুটি নিম্ন পাহাড় ও শুষ্ক নালার মধ্যবর্তী সমতল ভূমি।',
              'যুদ্ধের আগের রাতে খালিদ (রা.) বসর ইবনে আবি রুহম ও সাঈদ ইবনে মাররা (রা.)-এর নেতৃত্বে দুটি ২ হাজার অশ্বারোহীর দলকে পারস্য শিবিরের পেছনের টিলার আড়ালে লুকিয়ে রাখেন।',
              'নির্দেশ ছিল—সকালে মূল যুদ্ধ চরমে পৌঁছালে খালিদের সংকেত পাওয়ার সাথে সাথেই পেছন থেকে আঘাত হানতে হবে।',
            ],
            pointsEn: [
              'The plain of Walaja lay between two low ridges and dry wadis.',
              'The night before battle, Khalid (RA) hid two 2,000-man cavalry detachments behind ridges behind the Persian rear.',
              'They were ordered to strike from behind on Khalid’s signal once the frontal clash peaked.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৫৭; সামরিক ইতিহাস ও আল-বিদায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 357; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'ইচ্ছাকৃত কেন্দ্র-পশ্চাদপসরণের ফাঁদ',
            titleEn: 'Calculated Center Yield to Draw the Enemy In',
            pointsBn: [
              'খালিদ (রা.) তাঁর মূল বাহিনীকে এমনভাবে সাজান যেন পারস্য বাহিনী মনে করে মুসলিমদের কেন্দ্র দুর্বল।',
              'কৌশলটি ছিল শত্রুর পুরো মূল বাহিনীকে সামনের দিকে টেনে এনে গভীর ফাঁদে ফেলা।',
            ],
            pointsEn: [
              'Khalid (RA) deployed his center lightly to tempt the Persians into pushing forward.',
              'The goal was to pull the entire Sassanid main body deep into the pocket.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৫৭; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 357; Al-Kamil fit-Tarikh',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'প্রচণ্ড সম্মুখসমর ও দৈত্যাকার পারস্য যোদ্ধার সাথে দ্বন্দ্বযুদ্ধ',
        titleEn: 'Fierce Frontal Clash & Duel with the Persian Giant',
        events: [
          {
            titleBn: 'এক হাজার সৈন্যের সমতুল্য পারস্য মল্লবীরের সাথে খালিদের লড়াই',
            titleEn: 'Khalid’s Single Combat with the "Thousand-Man" Champion',
            pointsBn: [
              'যুদ্ধ চলাকালে “হাজার মর্দ” খ্যাত এক বিশালদেহী পারস্য বীর খালিদ (রা.)-কে দ্বন্দ্বযুদ্ধে আহ্বান করে।',
              'তীব্র লড়াই শেষে খালিদ (রা.) তাকে পরাজিত ও নিহত করেন, যা মুসলিম বাহিনীর মনোবল আকাশচুম্বী করে তোলে।',
            ],
            pointsEn: [
              'During combat, a towering Persian champion renowned as equal to a thousand men challenged Khalid (RA).',
              'Khalid (RA) defeated and slew him in fierce single combat, electrifying Muslim morale.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৫৮; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 358; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'দীর্ঘস্থায়ী সম্মুখ লড়াই ও পারস্যের সর্বশক্তি প্রয়োগ',
            titleEn: 'Prolonged Frontal Struggle Drawing Out Persian Reserves',
            pointsBn: [
              'আন্দরযগর তার রিজার্ভ সৈন্যসহ পুরো শক্তি নিয়োগ করে মুসলিমদের কেন্দ্র ভেদ করার চেষ্টা চালায়।',
              'মুসলিম বাহিনী অটলভাবে লড়াই করতে করতে সামান্য পিছু হটে পারস্য বাহিনীকে পুরোপুরি ভেতরে টেনে নেয়।',
            ],
            pointsEn: [
              'Andarzaghar committed his reserves to smash through the Muslim center.',
              'Holding firm while yielding minimal ground, the Muslims drew the entire Persian force inward.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৫৭–৩৫৮',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 357–358',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'দুই দিকের সাঁড়াশি আক্রমণ ও সম্পূর্ণ ঘেরাও',
        titleEn: 'Twin Flank Spring & Complete Encirclement',
        events: [
          {
            titleBn: 'খালিদ (রা.)-এর সংকেত ও পেছন থেকে বজ্রাঘাত',
            titleEn: 'Khalid’s Signal & Thunderous Rear Charge',
            pointsBn: [
              'যখন পারস্য সৈন্যরা বিজয়ের লোভে সামনে এগিয়ে আসে, ঠিক তখনই খালিদ (রা.) গোপন সংকেত দেন।',
              'দুই পাহাড়ের আড়াল থেকে ৪ হাজার সতেজ মুসলিম অশ্বারোহী তাকবীর ধ্বনি তুলে পারস্য বাহিনীর পেছন ও দুই পাশে ঝাঁপিয়ে পড়ে।',
              'সম্মুখ থেকেও খালিদ (রা.) তীব্র পাল্টা আক্রমণ শুরু করেন—পারস্য বাহিনী চারদিক থেকে অবরুদ্ধ হয়ে পড়ে।',
            ],
            pointsEn: [
              'Just as Persian forces surged forward expecting victory, Khalid (RA) gave the prearranged signal.',
              '4,000 fresh Muslim horsemen erupted from behind the ridges with cries of Takbir into the Persian rear and flanks.',
              'Khalid simultaneously counterattacked from the front, sealing a complete encirclement.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৫৮; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 358; Al-Kamil fit-Tarikh',
          },
          {
            titleBn: 'হ্যানিবলের ক্যানি যুদ্ধের সমতুল্য রণকৌশল ও আন্দরযগরের মৃত্যু',
            titleEn: 'A Classic Double Envelopment & Andarzaghar’s Demise',
            pointsBn: [
              'বিশ্ব সামরিক ইতিহাসে ওয়ালাজার যুদ্ধকে হ্যানিবলের ‘ক্যানি’ যুদ্ধের সমতুল্য সফল ডাবল এনভেলপমেন্ট হিসেবে গণ্য করা হয়—যেখানে সংখ্যালঘু বাহিনী সংখ্যাগুরুকে ঘিরে ফেলেছিল।',
              'সেনাপতি আন্দরযগর পালিয়ে মরুভূমিতে চলে যায় এবং তৃষ্ণায় কাতর হয়ে মৃত্যুবরণ করে।',
            ],
            pointsEn: [
              'Military historians rank Walaja alongside Hannibal’s Cannae as a textbook double envelopment achieved by an outnumbered army.',
              'Commander Andarzaghar escaped into the desert only to perish of thirst.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৫৯; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 359; Al-Bidayah wan-Nihayah',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'যুদ্ধোত্তর মানবিক নীতি ও হীরা অভিমুখে যাত্রা',
        titleEn: 'Post-Battle Clemency & Advance Toward Hira',
        events: [
          {
            titleBn: 'কৃষক ও বেসামরিক নাগরিকদের নিরাপত্তা ঘোষণা',
            titleEn: 'Amnesty & Protection for Non-Combatants',
            pointsBn: [
              'খালিদ (রা.) যুদ্ধশেষে ঘোষণা করেন যে যারা যুদ্ধে অংশ নেয়নি সেই কৃষক ও সাধারণ অধিবাসীদের কোনো ক্ষতি করা যাবে না।',
              'ন্যায়পরায়ণ আচরণে মুগ্ধ হয়ে অনেক স্থানীয় গোত্র স্বেচ্ছায় ইসলামী শাসনের নিরাপত্তা চুক্তি গ্রহণ করে।',
            ],
            pointsEn: [
              'Khalid (RA) decreed that non-combatant farmers and civilians were strictly protected.',
              'Impressed by this justice, many local communities voluntarily entered treaties with the Caliphate.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৫৯; ফুতূহুল বুলদান',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 359; Futuh al-Buldan',
          },
          {
            titleBn: 'উল্লাইস ও হীরা বিজয়ের পথ সুগম হওয়া',
            titleEn: 'Paving the Road to Ullais and Al-Hira',
            pointsBn: [
              'ওয়ালাজার বিজয়ের ফলে নিম্ন মেসোপটেমিয়ায় পারস্যের প্রতিরক্ষা ব্যূহ ভেঙে পড়ে।',
              'এরপরই মুসলিম বাহিনী উল্লাইস হয়ে প্রাচীন লাখমী রাজধানী আল-হীরা জয় করে নেয়।',
            ],
            pointsEn: [
              'Victory at Walaja shattered the Persian defensive shield in lower Mesopotamia.',
              'It opened the direct path through Ullais to the conquest of the ancient Lakhmid capital, Al-Hira.',
            ],
            sourceBn: 'আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৬; তারীখে তাবারী',
            sourceEn: 'Al-Bidayah wan-Nihayah, Vol. 6; Tarikh al-Tabari',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // 12. BATTLE OF AYN AL-TAMR (রজব ১২ হিজরি / ৬৩৩ খ্রি.)
  // =========================================================================
  ayn_tamr: buildWarBundle({
    warId: 'ayn_tamr',
    datePlaceBn: 'রজব ১২ হিজরি (৬৩৩ খ্রি.) · আইনুত-তামর, আনবার প্রদেশের পশ্চিমে (ইরাক)',
    datePlaceEn: 'Rajab 12 AH (633 CE) · Ayn al-Tamr, West of Anbar (Iraq)',
    battleShortBn: 'আইনুত-তামর যুদ্ধ',
    battleShortEn: 'Battle of Ayn al-Tamr',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'আনবার বিজয়ের পর কৌশলগত মরূদ্যান অভিযান',
        titleEn: 'Strategic Oasis Campaign After Anbar',
        events: [
          {
            titleBn: 'আইনুত-তামরের সামরিক গুরুত্ব',
            titleEn: 'Military Significance of Ayn al-Tamr',
            pointsBn: [
              'হীরা ও আনবার (যাতুল উয়ূন) জয়ের পর খালিদ (রা.) পশ্চিম ইরাকের গুরুত্বপূর্ণ খেজুর-মরূদ্যান আইনুত-তামরের দিকে অগ্রসর হন।',
              'এটি ছিল সিরিয়া ও ইরাকের মরু-বাণিজ্য পথের সংযোগস্থল এবং পারস্য গ্যারিসনের শক্ত ঘাঁটি।',
            ],
            pointsEn: [
              'After taking Al-Hira and Anbar, Khalid (RA) marched on Ayn al-Tamr, a vital western Iraqi oasis.',
              'It controlled the desert caravan link between Syria and Iraq and housed a major Persian garrison.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৭৫; ফুতূহুল বুলদান',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 375; Futuh al-Buldan',
          },
          {
            titleBn: 'মেহরান ও আক্কাহ ইবনে আবি আক্কাহর জোট',
            titleEn: 'Alliance of Mihran and Aqqa ibn Abi Aqqa',
            pointsBn: [
              'পারস্য সেনাপতি মেহরান ইবনে বাহরাম চুবিন দুর্গের ভেতর শক্তিশালী পারস্য গ্যারিসন নিয়ে অবস্থান করছিল।',
              'আরব-খ্রিস্টান গোত্রগুলোর নেতা আক্কাহ ইবনে আবি আক্কাহ মেহরানকে বলে: “আরবদের সাথে লড়াইয়ে আমরাই যথেষ্ট, তুমি দুর্গে অপেক্ষা করো।”',
            ],
            pointsEn: [
              'Persian commander Mihran ibn Bahram held the fortress with a strong Sassanid garrison.',
              'Christian Arab chief Aqqa ibn Abi Aqqa told Mihran to stay inside, boasting that Arabs knew best how to fight Arabs.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৭৬; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 376; Al-Kamil fit-Tarikh',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'বিদ্যুৎগতির অশ্বারোহী আক্রমণ ও আক্কাহ বন্দী',
        titleEn: 'Lightning Cavalry Strike & Capture of Aqqa',
        events: [
          {
            titleBn: 'খালিদ (রা.)-এর অপ্রত্যাশিত দেহরক্ষী স্কোয়াড্রনের ঝটিকা হামলা',
            titleEn: 'Khalid’s Personal Guard Blitz',
            pointsBn: [
              'আক্কাহ যখন তার সেনাদল বিন্যাস করছিল, ঠিক তখনই খালিদ (রা.) যুদ্ধ শুরু হওয়ার আগেই নিজের নির্বাচিত অশ্বারোহী রক্ষীদল নিয়ে সরাসরি আক্কাহর কেন্দ্রে ঝাঁপিয়ে পড়েন।',
              'শত্রু বাহিনী কিছু বুঝে ওঠার আগেই খালিদ (রা.) জীবিত অবস্থায় সেনাপতি আক্কাহকে বন্দী করে ফেলেন।',
            ],
            pointsEn: [
              'While Aqqa was still deploying his ranks, Khalid (RA) led his elite bodyguard straight into Aqqa’s command post.',
              'Before the enemy could react, Khalid (RA) captured Aqqa alive in a dazzling lightning strike.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৭৬–৩৭৭; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 376–377; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'আরব মিত্র বাহিনীর বিনা যুদ্ধে ছত্রভঙ্গ হওয়া',
            titleEn: 'Collapse of the Allied Force Without Heavy Bloodshed',
            pointsBn: [
              'নিজেদের সেনাপতিকে চোখের পলকে বন্দী হতে দেখে আক্কাহর বিশাল বাহিনী আতঙ্কে ছত্রভঙ্গ হয়ে পালাতে থাকে।',
              'অত্যন্ত অল্প ক্ষয়ক্ষতিতে মুসলিম বাহিনী ময়দান দখল করে দুর্গের দিকে অগ্রসর হয়।',
            ],
            pointsEn: [
              'Seeing their commander captured in moments, Aqqa’s forces panicked and scattered.',
              'With minimal casualties, the Muslims secured the field and closed in on the citadel.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৭৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 377',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'মেহরানের পলায়ন ও দুর্গ অবরোধ',
        titleEn: 'Mihran’s Flight & Siege of the Fortress',
        events: [
          {
            titleBn: 'পারস্য সেনাপতি মেহরানের রাতের আঁধারে পলায়ন',
            titleEn: 'Mihran Abandons the Fortress',
            pointsBn: [
              'আক্কাহর বাহিনীর এই অবিশ্বাস্য পতন দেখে পারস্য সেনাপতি মেহরান দুর্গ ছেড়ে সাসানীয় রাজধানী মাদায়েনের দিকে পালিয়ে যায়।',
              'পলায়নপর আরব সৈন্যরা দুর্গের ভেতরে আশ্রয় নিয়ে ফটক বন্ধ করে দেয়।',
            ],
            pointsEn: [
              'Witnessing Aqqa’s sudden collapse, Persian commander Mihran fled with his troops toward Ctesiphon.',
              'Fleeing tribal fighters retreated inside the fortress and barred the gates.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৭৭; ফুতূহুল বুলদান',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 377; Futuh al-Buldan',
          },
          {
            titleBn: 'নিঃশর্ত আত্মসমর্পণ',
            titleEn: 'Unconditional Surrender of the Citadel',
            pointsBn: [
              'খালিদ (রা.) দুর্গটি চারদিক থেকে অবরোধ করলে ভেতরের সৈন্যরা কোনো রসদ বা সাহায্যের আশা না দেখে খালিদ (রা.)-এর বিচারের ওপর নিঃশর্ত আত্মসমর্পণ করে।',
              'দুর্গ ও সমগ্র আইনুত-তামর মরূদ্যান ইসলামী খিলাফতের অধীনে চলে আসে।',
            ],
            pointsEn: [
              'Besieged on all sides with no hope of relief, the defenders surrendered unconditionally to Khalid’s judgment.',
              'The citadel and the entire Ayn al-Tamr oasis came under Caliphate control.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৭৭–৩৭৮',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 377–378',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'গির্জায় বন্দী ৪০ কিশোর ও ইসলামী ইতিহাসের মহান প্রজন্ম',
        titleEn: 'The Forty Youths in the Monastery & Future Luminaries',
        events: [
          {
            titleBn: 'দুর্গের গির্জায় পাওয়া ৪০ জন ছাত্রের মুক্তি ও মদিনায় গমন',
            titleEn: 'Discovery of Forty Young Scholars in the Fortress Church',
            pointsBn: [
              'দুর্গের ভেতরের একটি গির্জায় খালিদ (রা.) ৪০ জন তরুণ শিক্ষার্থীকে পান যাদের পারস্য সম্রাট জামিনদার হিসেবে আটকে রেখেছিল।',
              'খালিদ (রা.) তাদের নিরাপদে মদিনায় খলিফা আবু বকর (রা.)-এর কাছে পাঠিয়ে দেন, যেখানে তারা ইসলাম ও ইলমের পরিবেশে বেড়ে ওঠেন।',
            ],
            pointsEn: [
              'Inside the citadel church, Khalid (RA) found 40 young students held as Sassanid hostages.',
              'They were safely sent to Madinah, where they grew up in the cradle of Islamic learning.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৭৮; ফুতূহুল বুলদান — বালাযুরী',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 378; Futuh al-Buldan — Al-Baladhuri',
          },
          {
            titleBn: 'সীরীন, নুসাইর ও ইয়াসার—ইসলামী সভ্যতার উজ্জ্বল নক্ষত্রদের পূর্বপুরুষ',
            titleEn: 'Fathers of Ibn Sirin, Musa ibn Nusayr, and Ibn Ishaq',
            pointsBn: [
              'এই ৪০ তরুণের মধ্যেই ছিলেন সীরীন (মহান তাবেয়ী ও স্বপ্নের ব্যাখ্যাকার ইমাম মুহাম্মদ ইবনে সীরীনের পিতা)।',
              'আরও ছিলেন নুসাইর (উত্তর আফ্রিকা ও আন্দালুস বিজয়ের মহানায়ক মুসা ইবনে নুসাইরের পিতা) এবং ইয়াসার (সীরাত-প্রণেতা ইবনে ইসহাকের দাদা)।',
            ],
            pointsEn: [
              'Among these forty youths was Sirin, father of the great Tabi’i scholar Imam Muhammad ibn Sirin.',
              'Also among them were Nusayr (father of Musa ibn Nusayr, conqueror of North Africa/Andalus) and Yasar (grandfather of Sirah biographer Ibn Ishaq).',
            ],
            sourceBn: 'আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৬; সিয়ারু আ’লামিন নুবালা',
            sourceEn: 'Al-Bidayah wan-Nihayah, Vol. 6; Siyar A’lam al-Nubala',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'উত্তর আরব ও সিরিয়া সীমান্তে কৌশলগত সংযোগ',
        titleEn: 'Strategic Link to Northern Arabia & Syria',
        events: [
          {
            titleBn: 'ইয়াদ ইবনে গানামের সাহায্যের আবেদন',
            titleEn: 'Appeal for Help from Iyad ibn Ghanm',
            pointsBn: [
              'আইনুত-তামর বিজয়ের পরপরই দাওমাতুল জান্দাল থেকে সাহাবি ইয়াদ ইবনে গানাম (রা.) সাহায্যের বার্তা পাঠান।',
              'খালিদ (রা.) উওয়াইম ইবনে কাহিলকে আইনুত-তামরের নিরাপত্তায় রেখে দ্রুত উত্তর আরবে সাহায্যের জন্য রওনা হন।',
            ],
            pointsEn: [
              'Immediately after Ayn al-Tamr, Iyad ibn Ghanm (RA) requested urgent aid at Dumat al-Jandal.',
              'Khalid (RA) left a garrison at Ayn al-Tamr and marched swiftly to relieve his fellow commander.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৭৮–৩৭৯',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 378–379',
          },
          {
            titleBn: 'ফোরাত অববাহিকায় নিরাপদ ঘাঁটি প্রতিষ্ঠা',
            titleEn: 'Securing the Western Euphrates Anchor',
            pointsBn: [
              'আইনুত-তামর জয়ের মাধ্যমে মুসলিম বাহিনী ইরাকের পশ্চিমাঞ্চলের মরু-সীমান্ত সুরক্ষিত করে।',
              'পরবর্তীতে খালিদ (রা.)-এর বিখ্যাত সিরিয়া-অভিযানের মরু-যাত্রার অন্যতম প্রধান কেন্দ্র ছিল এই অঞ্চল।',
            ],
            pointsEn: [
              'Capturing Ayn al-Tamr secured the western desert flank of Muslim-held Iraq.',
              'It later served as a critical staging zone for Khalid’s legendary desert march into Syria.',
            ],
            sourceBn: 'ফুতূহুল বুলদান; আল-কামিল ফিত-তারীখ, খণ্ড ২',
            sourceEn: 'Futuh al-Buldan; Al-Kamil fit-Tarikh, Vol. 2',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // 13. BATTLE OF DUMAT AL-JANDAL (রজব-শাবান ১২ হিজরি / ৬৩৩ খ্রি.)
  // =========================================================================
  dumat_jandal: buildWarBundle({
    warId: 'dumat_jandal',
    datePlaceBn: 'রজব–শাবান ১২ হিজরি (আগস্ট ৬৩৩ খ্রি.) · দাওমাতুল জান্দাল (উত্তর আরব / আল-জাওফ)',
    datePlaceEn: 'Rajab–Shaban 12 AH (Aug 633 CE) · Dumat al-Jandal (Al-Jawf, Northern Arabia)',
    battleShortBn: 'দাওমাতুল জান্দাল যুদ্ধ',
    battleShortEn: 'Battle of Dumat al-Jandal',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'ইয়াদ ইবনে গানাম (রা.)-এর অবরোধ ও শত্রু-জোটের সমাবেশ',
        titleEn: 'Iyad’s Stalemate & Tribal Coalition',
        events: [
          {
            titleBn: 'উত্তর আরবের দুর্ভেদ্য দুর্গে অচলাবস্থা',
            titleEn: 'Deadlock at the Strategic Northern Fortress',
            pointsBn: [
              'খলিফা আবু বকর (রা.) ইয়াদ ইবনে গানাম (রা.)-কে দাওমাতুল জান্দাল হয়ে ইরাকে প্রবেশের নির্দেশ দিয়েছিলেন।',
              'কিন্তু দুর্ভেদ্য দুর্গ ও শক্তিশালী খ্রিস্টান আরব গোত্রগুলোর (কালব, বাহরা, গাসসান, তানুখ) প্রতিরোধে ইয়াদ (রা.) এক বছর ধরে অবরোধ চালিয়েও দুর্গ ভাঙতে পারছিলেন না।',
            ],
            pointsEn: [
              'Caliph Abu Bakr (RA) had ordered Iyad ibn Ghanm (RA) to take Dumat al-Jandal en route to Iraq.',
              'Faced with a formidable citadel and allied Arab tribes (Kalb, Bahra, Ghassan, Tanukh), Iyad remained deadlocked.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৭৯; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 379; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'খালিদ (রা.)-এর বিখ্যাত কাব্যিক উত্তর ও মরু-অভিযান',
            titleEn: 'Khalid’s Iconic Reply & Rapid Desert March',
            pointsBn: [
              'ইয়াদ (রা.)-এর সাহায্যের চিঠি পেয়ে খালিদ (রা.) তাৎক্ষণিক এক সংক্ষিপ্ত পদ্যে উত্তর দেন: “অল্প অপেক্ষা করো ইয়াদ, সিংহসদৃশ অশ্বারোহী বাহিনী ঝড়ের গতিতে তোমার কাছে পৌঁছাচ্ছে!”',
              'তিনি মাত্র ১০ দিনে প্রায় ৩০০ মাইল দুর্গম মরুভূমি অতিক্রম করে ৬ হাজার সৈন্যসহ দাওমাতুল জান্দালে হাজির হন।',
            ],
            pointsEn: [
              'Receiving Iyad’s plea, Khalid (RA) replied in brief stirring verse promising swift cavalry relief.',
              'He crossed ~300 miles of harsh desert in just 10 days with 6,000 troops to reach Dumat al-Jandal.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৭৯–৩৮০; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 379–380; Al-Kamil fit-Tarikh',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'উকাইদির ও জুদির মতবিরোধ ও শত্রু-জোটের ফাটল',
        titleEn: 'Rift Between Ukaydir & Judi Inside the Coalition',
        events: [
          {
            titleBn: 'উকাইদিরের সতর্কবাণী ও প্রত্যাহার',
            titleEn: 'Ukaydir’s Warning and Withdrawal',
            pointsBn: [
              'তাবুক অভিযানে রাসূলুল্লাহ (সা.)-এর যুগেই খালিদ (রা.)-এর সামরিক দক্ষতা প্রত্যক্ষ করেছিল দাওমাতুল জান্দালের শাসক উকাইদির ইবনে আবদুল মালিক।',
              'খালিদের আগমনের খবর শুনে সে অন্য নেতা জুদি ইবনে রাবিয়াকে বলল: “খালিদের চেয়ে সৌভাগ্যবান ও অপ্রতিরোধ্য সেনাপতি আমি দেখিনি; তার সাথে সন্ধি করো।”',
              'জুদি তা অগ্রাহ্য করলে উকাইদির দুর্গ ছেড়ে পালানোর চেষ্টা করে, কিন্তু খালিদের টহল বাহিনীর হাতে ধরা পড়ে।',
            ],
            pointsEn: [
              'Local ruler Ukaydir ibn Abd al-Malik had already experienced Khalid’s prowess during the Tabuk era.',
              'He warned co-commander Judi ibn Rabi’ah to seek peace rather than face Khalid, then tried to flee when refused.',
              'Khalid’s patrols intercepted Ukaydir on the road.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৮০; ফুতূহুল বুলদান',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 380; Futuh al-Buldan',
          },
          {
            titleBn: 'বিশাল মিত্র বাহিনীর দুর্গের বাইরে শিবির স্থাপন',
            titleEn: 'Coalition Army Camps Outside the Overcrowded Citadel',
            pointsBn: [
              'অগণিত গোত্রীয় সৈন্য দুর্গের ভেতরে আঁটছিল না বলে জুদি ও ওয়াদিয়াহ বিশাল বাহিনী নিয়ে দুর্গের বাইরের ময়দানে শিবির স্থাপন করে।',
              'তাদের পরিকল্পনা ছিল ইয়াদ ও খালিদের দুই বাহিনীকে আলাদাভাবে চেপে ধরা।',
            ],
            pointsEn: [
              'Too numerous to fit inside the fortress, Judi and Wadi’ah camped in strength outside the walls.',
              'They planned to pin Iyad and Khalid separately.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৮০',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 380',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'দুই দিক থেকে সাঁড়াশি আক্রমণ ও জুদির বন্দিত্ব',
        titleEn: 'Two-Front Pincer Assault & Capture of Judi',
        events: [
          {
            titleBn: 'ইয়াদ (রা.) ও খালিদ (রা.)-এর সমন্বিত আক্রমণ',
            titleEn: 'Coordinated Strike by Khalid and Iyad',
            pointsBn: [
              'খালিদ (রা.) দুর্গের এক দিক দিয়ে এবং ইয়াদ (রা.) বিপরীত দিক দিয়ে শত্রু শিবিরের মাঝখানে অবস্থান নেন।',
              'জুদি খালিদের দিকে এবং ওয়াদিয়াহ ইয়াদের দিকে আক্রমণ চালালেও উভয় ফ্রন্টেই মুসলিম বাহিনী প্রবল পাল্টা আঘাত হানে।',
            ],
            pointsEn: [
              'Khalid (RA) and Iyad (RA) positioned their forces on opposite flanks, catching the coalition in a vise.',
              'Judi charged Khalid while Wadi’ah attacked Iyad, but both assaults were crushed by Muslim counterattacks.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৮১; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 381; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'আসিম ইবনে আমর (রা.)-এর বীরত্ব ও দুর্গের ফটক বন্ধ',
            titleEn: 'Heroism of Asim ibn Amr & Sealed Fortress Gates',
            pointsBn: [
              'খালিদ (রা.) জুদিকে এবং আকরা ইবনে হাবিস (রা.) ওয়াদিয়াহকে পরাজিত করেন; জুদি জীবিত বন্দী হয়।',
              'পলায়নপর সৈন্যরা দুর্গে ঢুকতে চাইলে ভেতরের সৈন্যরা মুসলিমদের ঢুকে পড়ার ভয়ে ফটক বন্ধ করে দেয়, ফলে বাইরের বিশাল বাহিনী অবরুদ্ধ হয়ে পড়ে।',
            ],
            pointsEn: [
              'Khalid routed Judi’s wing and captured Judi alive while Aqra ibn Habis broke Wadi’ah.',
              'Defenders inside slammed the gates shut to keep Muslims out, stranding their own retreating allies outside.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৮১',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 381',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'দুর্গ ফটক ভাঙা ও চূড়ান্ত বিজয়',
        titleEn: 'Breaching the Gate & Final Victory',
        events: [
          {
            titleBn: 'দিরার ও খালিদের নেতৃত্বে ফটক ভঙ্গ',
            titleEn: 'Storming the Citadel Gate',
            pointsBn: [
              'খালিদ (রা.) সৈন্যদের নির্দেশে দুর্গের প্রধান কাঠের ফটক ভেঙে ফেলেন এবং মুসলিম বাহিনী দুর্গের ভেতর প্রবেশ করে।',
              'ভেতরের অবশিষ্ট গ্যারিসন প্রতিরোধ ত্যাগ করে আত্মসমর্পণ করে।',
            ],
            pointsEn: [
              'Khalid (RA) led an assault that smashed the fortress’s main timber gate, pouring troops inside.',
              'The remaining garrison laid down arms and surrendered.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৮১–৩৮২; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 381–382; Al-Kamil fit-Tarikh',
          },
          {
            titleBn: 'বনু কালব গোত্রের নিরাপত্তা ও উদারতা',
            titleEn: 'Clemency Granted to Banu Kalb',
            pointsBn: [
              'সাহাবি আসিম ইবনে আমর (রা.)-এর সুপারিশে বনু কালব গোত্রের বহু বন্দীকে নিরাপত্তা ও ক্ষমা প্রদর্শন করা হয়।',
              'উত্তর আরবের দীর্ঘদিনের বিদ্রোহী কেন্দ্রটি স্থায়ীভাবে শান্ত হয়।',
            ],
            pointsEn: [
              'Through the intercession of Asim ibn Amr (RA), clemency was extended to captives of Banu Kalb.',
              'The long-restive northern Arabian hub was permanently pacified.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৮২',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 382',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'কৌশলগত প্রভাব ও হীরায় প্রত্যাবর্তন',
        titleEn: 'Strategic Impact & Return to Hira',
        events: [
          {
            titleBn: 'ইরাক ও সিরিয়ার মধ্যবর্তী মরু-পথ সম্পূর্ণ নিরাপদ হওয়া',
            titleEn: 'Securing the Desert Corridor Between Iraq and Syria',
            pointsBn: [
              'দাওমাতুল জান্দাল জয়ের ফলে মদিনা থেকে ইরাক ও সিরিয়ায় সৈন্য ও রসদ সরবরাহের উত্তর পথ সম্পূর্ণ নিরাপদ হয়।',
              'দুটি মুসলিম বাহিনী একত্রিত হয়ে খিলাফতের শক্তি বহুগুণ বাড়িয়ে তোলে।',
            ],
            pointsEn: [
              'Capturing Dumat al-Jandal secured the northern supply corridor linking Madinah with Iraq and Syria.',
              'The union of Khalid’s and Iyad’s armies multiplied Caliphate combat power.',
            ],
            sourceBn: 'আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৬; ফুতূহুল বুলদান',
            sourceEn: 'Al-Bidayah wan-Nihayah, Vol. 6; Futuh al-Buldan',
          },
          {
            titleBn: 'হীরায় ফিরে পারস্যের নতুন ষড়যন্ত্র নস্যাৎ',
            titleEn: 'Returning to Hira to Crush Persian Counter-Plots',
            pointsBn: [
              'খালিদ (রা.)-এর অনুপস্থিতিতে পারস্য বাহিনী হীরার দিকে অগ্রসর হওয়ার চেষ্টা করেছিল।',
              'খালিদ (রা.) দ্রুত ফিরে এসে হুসায়িদ ও খানফিসে তাদের পরাজিত করে ইরাকের পূর্ণ নিয়ন্ত্রণ সংহত করেন।',
            ],
            pointsEn: [
              'During Khalid’s absence, Persian forces tried to threaten Hira.',
              'Khalid returned swiftly to defeat them at Husayd and Khanafis, consolidating Iraq.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৮২–৩৮৪',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 382–384',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // 14. BATTLE OF AJNADAYN (জমাদিউল আউয়াল ১৩ হিজরি / জুলাই ৬৩৪ খ্রি.)
  // =========================================================================
  ajnadayn: buildWarBundle({
    warId: 'ajnadayn',
    datePlaceBn: '২৮ জমাদিউল আউয়াল ১৩ হিজরি (৩০ জুলাই ৬৩৪ খ্রি.) · আজনাদাইন, ফিলিস্তিন',
    datePlaceEn: '28 Jumada al-Ula 13 AH (30 July 634 CE) · Ajnadayn, Palestine',
    battleShortBn: 'আজনাদাইন যুদ্ধ',
    battleShortEn: 'Battle of Ajnadayn',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'শাম অভিযানে বাইজেন্টাইন মহা-সমাবেশ ও মুসলিম বাহিনীর ঐক্য',
        titleEn: 'Byzantine Mass Mobilization & Muslim Unification',
        events: [
          {
            titleBn: 'সম্রাট হেরাক্লিয়াসের বিশাল বাহিনী ও আজনাদাইনে সমাবেশ',
            titleEn: 'Heraclius Assembles a Massive Field Army',
            pointsBn: [
              'খলিফা আবু বকর (রা.) সিরিয়া-ফিলিস্তিনে চারটি পৃথক সেনাদল পাঠিয়েছিলেন—আবু উবাইদা, ইয়াযীদ, শুরাহবীল ও আমর ইবনুল আস (রা.)-এর নেতৃত্বে।',
              'বাইজেন্টাইন সম্রাট হেরাক্লিয়াস এই চার বাহিনীকে আলাদাভাবে ধ্বংস করতে তার ভাই থিওডোর ও সেনাপতি ওয়ারদান (ভারতান)-এর নেতৃত্বে প্রায় ৯০ হাজার–১ লক্ষ সৈন্য আজনাদাইনে জড়ো করে।',
            ],
            pointsEn: [
              'Caliph Abu Bakr (RA) had sent four corps into Syria-Palestine under Abu Ubaydah, Yazid, Shurahbil, and Amr ibn al-As (RA).',
              'Emperor Heraclius massed ~90,000–100,000 Byzantine troops under Theodore and Vardan at Ajnadayn to crush them piecemeal.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪১৬; ফুতূহুল বুলদান — বালাযুরী',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 416; Futuh al-Buldan — Al-Baladhuri',
          },
          {
            titleBn: 'খালিদ (রা.)-এর ইরাক থেকে মরু-যাত্রা ও চার বাহিনীর একত্রীকরণ',
            titleEn: 'Khalid’s Desert March & Unification at Ajnadayn',
            pointsBn: [
              'খলিফা আবু বকর (রা.)-এর নির্দেশে খালিদ (রা.) ইরাক থেকে দুর্গম সামাওয়া মরুভূমি পাড়ি দিয়ে সিরিয়ায় পৌঁছান।',
              'তিনি বুসরা জয় করে চার মুসলিম বাহিনীকে এক পতাকাতলে সমবেত করেন—মোট মুসলিম সৈন্য দাঁড়ায় প্রায় ২৪–৩২ হাজার।',
            ],
            pointsEn: [
              'Ordered by Caliph Abu Bakr (RA), Khalid (RA) crossed the perilous Samawah Desert from Iraq into Syria.',
              'After taking Bosra, he united all four Muslim corps into a single army of ~24,000–32,000 warriors.',
            ],
            sourceBn: 'আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭; তারীখে তাবারী, খণ্ড ৩',
            sourceEn: 'Al-Bidayah wan-Nihayah, Vol. 7; Tarikh al-Tabari, Vol. 3',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'খ্রিস্টান গুপ্তচরের ঐতিহাসিক সাক্ষ্য ও রণবিন্যাস',
        titleEn: 'The Spy’s Famous Testimony & Battle Array',
        events: [
          {
            titleBn: '“রাতের দরবেশ, দিনের অশ্বারোহী”—শত্রু গুপ্তচরের বিস্ময়',
            titleEn: '"Monks by Night, Horsemen by Day"',
            pointsBn: [
              'বাইজেন্টাইন সেনাপতি ওয়ারদান এক আরব গুপ্তচরকে মুসলিম শিবিরের অবস্থা জানতে পাঠায়।',
              'গুপ্তচর ফিরে এসে বলে: “আমি এমন এক জাতির কাছে গিয়েছিলাম যারা রাতে তাহাজ্জুদের দরবেশ এবং দিনে বীর অশ্বারোহী; তাদের খলিফার ছেলেও চুরি করলে তার হাত কাটা হয়।”',
              'এ কথা শুনে ওয়ারদান আতঙ্কিত হয়ে পড়ে এবং বলে: “এদের সাথে যুদ্ধ করার চেয়ে মাটির নিচে থাকা উত্তম।”',
            ],
            pointsEn: [
              'Byzantine general Vardan sent an Arab spy to inspect the Muslim camp.',
              'The spy reported: "They are monks by night and knights by day; if even their ruler’s son steals, they cut off his hand."',
              'Shaken, Vardan remarked that facing such men was terrifying.',
            ],
            sourceBn: 'আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭, পৃ. ১৪; ফুতূহুশ শাম',
            sourceEn: 'Al-Bidayah wan-Nihayah, Vol. 7, p. 14; Futuh al-Sham',
          },
          {
            titleBn: 'মুসলিম বাহিনীর সুশৃঙ্খল বিন্যাস ও নারীদের পেছনে অবস্থান',
            titleEn: 'Disciplined Muslim Deployment & Camp Protection',
            pointsBn: [
              'খালিদ (রা.) কেন্দ্রে আবু উবাইদা (রা.), ডানে মুয়ায ইবনে জাবাল (রা.), বামে সাঈদ ইবনে আমির (রা.) এবং পদাতিকদের নেতৃত্বে সাঈদ ইবনে যায়িদ (রা.)-কে নিযুক্ত করেন।',
              'শিবিরের পেছনে সাহাবিনীদের রাখা হয় যাতে কোনো সৈন্য পিছু হটলে তারা সাহস জুগিয়ে ফেরত পাঠান।',
            ],
            pointsEn: [
              'Khalid (RA) placed Abu Ubaydah at center, Mu’adh ibn Jabal on the right, Sa’id ibn Amir on the left, and Sa’id ibn Zayd over infantry.',
              'Muslim women guarded the rear camp to rally and motivate any retreating fighters.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪১৭; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 417; Al-Kamil fit-Tarikh',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'দিরার ইবনুল আযওয়ার (রা.)-এর অবিশ্বাস্য বীরত্ব ও প্রথম দিন',
        titleEn: 'Dhirar ibn al-Azwar’s Valor & Opening Clash',
        events: [
          {
            titleBn: 'বর্মহীন অশ্বারোহী দিরার (রা.)-এর শত্রু শিবির পর্যবেক্ষণ ও দ্বন্দ্বযুদ্ধ',
            titleEn: 'Dhirar’s Reconnaissance & Duels',
            pointsBn: [
              'যুদ্ধের প্রাক্কালে বীর সাহাবি দিরার ইবনুল আযওয়ার (রা.) বর্ম খুলে হালকা পোশাকে একাই শত্রু ব্যূহের কাছে গিয়ে তথ্য সংগ্রহ করেন ও আক্রমণকারী রোমান সৈন্যদের পরাস্ত করে ফিরে আসেন।',
              'যুদ্ধের প্রথম দিনে মুসলিম ও রোমান বাহিনীর মধ্যে প্রচণ্ড তীরবর্ষণ ও রক্তক্ষয়ী সম্মুখযুদ্ধ চলে, কিন্তু কোনো পক্ষই পিছু হটেনি।',
            ],
            pointsEn: [
              'Before battle, fearless champion Dhirar ibn al-Azwar (RA) rode unarmored to scout the Byzantine ranks and slew pursuing Roman horsemen.',
              'Day one featured fierce archery barrages and brutal hand-to-hand fighting with both lines holding firm.',
            ],
            sourceBn: 'আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭; তারীখে দিমাশক — ইবনে আসাকির',
            sourceEn: 'Al-Bidayah wan-Nihayah, Vol. 7; Tarikh Dimashq — Ibn Asakir',
          },
          {
            titleBn: 'ওয়ারদানের বিশ্বাসঘাতক আলোচনার ফাঁদ ও খালিদের পাল্টা কৌশল',
            titleEn: 'Vardan’s Treacherous Parley & Khalid’s Counter-Trap',
            pointsBn: [
              'প্রথম দিনে সুবিধা করতে না পেরে ওয়ারদান আলোচনার নামে খালিদ (রা.)-কে একাকী ডেকে গুপ্তহত্যার ষড়যন্ত্র করে এবং ঝোপের আড়ালে ১০ জন ঘাতক লুকিয়ে রাখে।',
              'এক খ্রিস্টান বার্তাবাহকের মাধ্যমে গোপন তথ্য পেয়ে খালিদ (রা.) রাতেই দিরার (রা.)-সহ ১০ জন মুসলিম বীর পাঠিয়ে রোমান ঘাতকদের সরিয়ে তাদের পোশাকে নিজেদের বসিয়ে রাখেন।',
            ],
            pointsEn: [
              'Failing on day one, Vardan invited Khalid (RA) to a lone parley while hiding ten Roman assassins in ambush.',
              'Tipped off by an informant, Khalid sent Dhirar (RA) and nine warriors at night to eliminate the assassins and take their places.',
            ],
            sourceBn: 'তারীখে দিমাশক — ইবনে আসাকির; ফুতূহুশ শাম',
            sourceEn: 'Tarikh Dimashq — Ibn Asakir; Futuh al-Sham',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'দ্বিতীয় দিনের নির্ণায়ক আক্রমণ ও রোমান বাহিনীর মহাপতন',
        titleEn: 'Day Two Decisive Breakthrough & Roman Collapse',
        events: [
          {
            titleBn: 'ওয়ারদানের মৃত্যু ও মুসলিমদের সর্বাত্মক ঝটিকা',
            titleEn: 'Fall of Vardan & All-Out Muslim Charge',
            pointsBn: [
              'পরদিন আলোচনায় ওয়ারদান সংকেত দিতেই ঝোপ থেকে রোমান ঘাতকের বদলে দিরার (রা.) ও মুসলিম বীরেরা বেরিয়ে আসেন এবং ওয়ারদান নিহত হয়।',
              'সেনাপতির পতনে বিভ্রান্ত বাইজেন্টাইন বাহিনীর ওপর খালিদ (রা.) সর্বাত্মক আক্রমণের নির্দেশ দেন।',
            ],
            pointsEn: [
              'When Vardan gave the ambush signal at the parley, Dhirar and his Muslim warriors emerged instead, and Vardan was slain.',
              'Khalid immediately unleashed a full-scale assault on the leaderless Byzantine ranks.',
            ],
            sourceBn: 'আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭; ফুতূহুল বুলদান',
            sourceEn: 'Al-Bidayah wan-Nihayah, Vol. 7; Futuh al-Buldan',
          },
          {
            titleBn: 'বাইজেন্টাইন ব্যূহ ছিন্নভিন্ন ও বিশাল ক্ষয়ক্ষতি',
            titleEn: 'Shattering of the Byzantine Line',
            pointsBn: [
              'মুসলিম অশ্বারোহী ও পদাতিকদের প্রবল চাপে বিশাল রোমান বাহিনী ছত্রভঙ্গ হয়ে গাজা, জেরুজালেম ও দামেশকের দিকে পালাতে থাকে।',
              'যুদ্ধে বাইজেন্টাইনদের বিপুল সংখ্যক সৈন্য নিহত হয়; মুসলিমদের প্রায় ৪৫০–৫০০ মুজাহিদ শাহাদাত বরণ করেন, যাদের মধ্যে সালামাহ ইবনে হিশাম ও ইকরিমা ইবনে আবি জাহলের (এক বর্ণনামতে) মতো প্রখ্যাত সাহাবি ছিলেন।',
            ],
            pointsEn: [
              'Overwhelmed by Muslim cavalry and infantry, the Byzantine army shattered and fled toward Gaza, Jerusalem, and Damascus.',
              'The Romans suffered massive losses, while ~450–500 Muslims attained martyrdom.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪১৮; ফুতূহুল বুলদান — বালাযুরী',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 418; Futuh al-Buldan — Al-Baladhuri',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'মদিনায় বিজয়-সুসংবাদ ও খলিফা আবু বকর (রা.)-এর প্রশান্তি',
        titleEn: 'Glad Tidings Reach Caliph Abu Bakr (RA)',
        events: [
          {
            titleBn: 'মৃত্যুশয্যায় খলিফা আবু বকর (রা.)-এর কৃতজ্ঞতা',
            titleEn: 'Caliph Abu Bakr’s Gratitude on His Deathbed',
            pointsBn: [
              'আজনাদাইনের মহাবিজয়ের বার্তা যখন মদিনায় পৌঁছায়, তখন খলিফা আবু বকর সিদ্দীক (রা.) জীবনের অন্তিম শয্যায় ছিলেন।',
              'এই বিজয়ের সংবাদ শুনে তিনি আল্লাহর শুকরিয়া আদায় করে প্রশান্ত চিত্তে ইন্তেকালের প্রস্তুতি নেন।',
            ],
            pointsEn: [
              'News of the decisive victory at Ajnadayn reached Madinah while Caliph Abu Bakr (RA) lay on his deathbed.',
              'Hearing the glad tidings, he praised Allah in deep peace shortly before passing away.',
            ],
            sourceBn: 'আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭, পৃ. ১৬; তারীখে তাবারী',
            sourceEn: 'Al-Bidayah wan-Nihayah, Vol. 7, p. 16; Tarikh al-Tabari',
          },
          {
            titleBn: 'ফিলিস্তিন ও দামেশক বিজয়ের দ্বার উন্মোচন',
            titleEn: 'Opening Palestine and Damascus',
            pointsBn: [
              'আজনাদাইন ছিল বাইজেন্টাইন সাম্রাজ্যের বিরুদ্ধে মুসলিমদের প্রথম বৃহৎ মাঠের (pitched battle) বিজয়।',
              'এর ফলে হেরাক্লিয়াস হিমস ছেড়ে উত্তরে এন্টিওকে সরে যেতে বাধ্য হয় এবং ফিলিস্তিন ও দামেশক বিজয়ের পথ খুলে যায়।',
            ],
            pointsEn: [
              'Ajnadayn was the Muslims’ first major pitched field victory against the Byzantine Empire.',
              'Heraclius withdrew north to Antioch, clearing the way to conquer Palestine and Damascus.',
            ],
            sourceBn: 'ফুতূহুল বুলদান; আল-কামিল ফিত-তারীখ, খণ্ড ২',
            sourceEn: 'Futuh al-Buldan; Al-Kamil fit-Tarikh, Vol. 2',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // 15. BATTLE OF THE BRIDGE / MARAKATUL JISR (শাবান ১৩ হিজরি / অক্টোবর ৬৩৪ খ্রি.)
  // =========================================================================
  bridge_battle: buildWarBundle({
    warId: 'bridge_battle',
    datePlaceBn: 'শাবান ১৩ হিজরি (অক্টোবর ৬৩৪ খ্রি.) · ফোরাত নদীর তীর, কুফার নিকটে (ইরাক)',
    datePlaceEn: 'Shaban 13 AH (Oct 634 CE) · Banks of the Euphrates near Kufa (Iraq)',
    battleShortBn: 'সেতুর যুদ্ধ (মারাকাতুল জিসর)',
    battleShortEn: 'Battle of the Bridge',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'খলিফা উমর (রা.)-এর দায়িত্ব গ্রহণ ও আবু উবাইদ সাকাফী (রা.)-এর নিয়োগ',
        titleEn: 'Caliph Umar’s Accession & Abu Ubayd’s Appointment',
        events: [
          {
            titleBn: 'খালিদ (রা.) সিরিয়ায় যাওয়ার পর ইরাকে পারস্যদের পাল্টা আক্রমণ',
            titleEn: 'Persian Counteroffensive After Khalid’s Departure',
            pointsBn: [
              'খালিদ বিন ওয়ালিদ (রা.) সিরিয়া অভিযানে চলে গেলে সাসানীয় সাম্রাজ্য ইরাক পুনরুদ্ধারের জন্য বিশাল প্রস্তুতি নেয়।',
              'মুসান্না ইবনে হারিসা (রা.) মদিনায় এসে নতুন খলিফা হযরত উমর (রা.)-এর কাছে অতিরিক্ত সৈন্য সাহায্য চান।',
            ],
            pointsEn: [
              'After Khalid (RA) transferred to Syria, the Sassanids prepared a massive counteroffensive in Iraq.',
              'Al-Muthanna ibn Haritha (RA) traveled to Madinah requesting reinforcements from Caliph Umar (RA).',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৪৪; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 444; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'আবু উবাইদ ইবনে মাসউদ সাকাফী (রা.)-এর সেনাপতিত্ব ও প্রাথমিক সাফল্য',
            titleEn: 'Leadership of Abu Ubayd al-Thaqafi & Early Wins',
            pointsBn: [
              'খলিফা উমর (রা.)-এর আহ্বানে সর্বপ্রথম সাড়া দেওয়া বীর আবু উবাইদ ইবনে মাসউদ সাকাফী (রা.)-কে ইরাক বাহিনীর আমীর নিযুক্ত করা হয়।',
              'ইরাকে পৌঁছে তিনি নামারিক ও কাসকারে পারস্য বাহিনীকে পরাজিত করে ফোরাত নদীর তীরে অগ্রসর হন।',
            ],
            pointsEn: [
              'Abu Ubayd ibn Mas’ud al-Thaqafi (RA), the first volunteer to answer Umar’s call, was named commander.',
              'Arriving in Iraq, he defeated Sassanid detachments at Namariq and Kaskar before reaching the Euphrates.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৪৭–৪৫২; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 447–452; Al-Kamil fit-Tarikh',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'বাহমানের রণহস্তী বাহিনী ও সেতু পার হওয়ার সিদ্ধান্ত',
        titleEn: 'Bahman’s War Elephants & Fatal River Crossing',
        events: [
          {
            titleBn: 'পারস্য সেনাপতি বাহমান জাযুয়াইহের পবিত্র পতাকা ও হস্তীবাহিনী',
            titleEn: 'Bahman Arrives with the Royal Banner & War Elephants',
            pointsBn: [
              'সাসানীয় সেনাপতি রুস্তম অভিজ্ঞ সেনাপতি বাহমান জাযুয়াইহকে পারস্যের ঐতিহাসিক পতাকা “দিরাফশে কাভিয়ানি” ও বিশাল হস্তীবাহিনীসহ পাঠায়।',
              'ফোরাত নদীর পূর্ব তীরে বাহমান শিবির গাড়ে এবং পশ্চিম তীরে মুসলিম বাহিনী অবস্থান নেয়; মাঝে ছিল একটি অস্থায়ী নৌকা-সেতু।',
            ],
            pointsEn: [
              'Sassanid marshal Rustam dispatched veteran general Bahman with the imperial banner (Derafsh Kaviani) and war elephants.',
              'Bahman camped on the eastern bank of the Euphrates opposite the Muslims, separated by a pontoon bridge.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৫৫; ফুতূহুল বুলদান',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 455; Futuh al-Buldan',
          },
          {
            titleBn: 'প্রবীণদের পরামর্শ অগ্রাহ্য করে সংকীর্ণ পূর্ব তীরে অবতরণ',
            titleEn: 'Overruling Counsel to Cross the Narrow Bridge',
            pointsBn: [
              'বাহমান বার্তা পাঠায়: “হয় তোমরা নদী পার হয়ে এসো, নতুবা আমরা পার হই।”',
              'মুসান্না (রা.) ও প্রবীণ সাহাবি সালীত ইবনে কায়িস (রা.) পরামর্শ দেন যাতে পারস্যদেরই পার হতে দেওয়া হয় এবং মুসলিমদের পেছনে খোলা মরুভূমি থাকে।',
              'কিন্তু অতিরিক্ত সাহসিকতা ও উৎসাহে আবু উবাইদ (রা.) নদী পার হয়ে পূর্ব তীরের সংকীর্ণ ময়দানে যাওয়ার সিদ্ধান্ত নেন।',
            ],
            pointsEn: [
              'Bahman sent word asking whether the Muslims would cross or allow the Persians to cross.',
              'Al-Muthanna and veteran Companion Salit ibn Qays (RA) urged staying on the western bank with open desert behind them.',
              'Driven by bold zeal, Abu Ubayd (RA) chose to cross onto the cramped eastern bank.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৫৬; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 456; Al-Bidayah wan-Nihayah, Vol. 7',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'রণহস্তীর তাণ্ডব ও আবু উবাইদ (রা.)-এর অতুলনীয় শাহাদাত',
        titleEn: 'War Elephant Onslaught & Abu Ubayd’s Martyrdom',
        events: [
          {
            titleBn: 'সজ্জিত হাতি ও ঘণ্টার শব্দে আরব ঘোড়াগুলোর আতঙ্ক',
            titleEn: 'Arab Cavalry Panic Before Armored Elephants',
            pointsBn: [
              'পূর্ব তীরের সংকীর্ণ জায়গায় বাহমানের ঘণ্টাবাঁধা ও সজ্জিত রণহস্তীগুলো এগিয়ে এলে মুসলিমদের ঘোড়াগুলো প্রচণ্ড ভয় পেয়ে পিছু হটতে থাকে।',
              'আবু উবাইদ (রা.) ঘোড়া থেকে নেমে পদব্রজে লড়াইয়ের নির্দেশ দেন এবং নিজেই বিশাল সাদা দলনেতা হাতির দিকে এগিয়ে যান।',
            ],
            pointsEn: [
              'On the cramped bank, Persian war elephants hung with clanging bells terrified the unfamiliar Arab horses.',
              'Abu Ubayd (RA) ordered his men to dismount and personally charged the giant white lead elephant on foot.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৫৭; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 457; Al-Kamil fit-Tarikh',
          },
          {
            titleBn: 'সাদা হাতির শুঁড় কর্তন ও সাত সেনাপতির ধারাবাহিক শাহাদাত',
            titleEn: 'Severing the Elephant’s Trunk & Seven Fallen Commanders',
            pointsBn: [
              'আবু উবাইদ (রা.) তলোয়ারের আঘাতে সাদা হাতিটির শুঁড় কেটে ফেলেন, কিন্তু আহত হাতিটির পায়ের চাপে তিনি শাহাদাত বরণ করেন।',
              'তাঁর ওসীয়ত অনুযায়ী একে একে সাতজন সেনাপতি (তাঁর ভাই, পুত্র ও স্বজনসহ) পতাকা তুলে ধরেন এবং সবাই বীরত্বের সাথে শহীদ হন।',
            ],
            pointsEn: [
              'Abu Ubayd (RA) severed the white elephant’s trunk, but the raging beast trampled him to martyrdom.',
              'Following his instructions, seven successive commanders from his family raised the banner and fell fighting heroically.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৫৭–৪৫৮; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 457–458; Al-Bidayah wan-Nihayah',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'সেতু কেটে দেওয়ার বিপর্যয় ও মুসান্না (রা.)-এর বীরত্বপূর্ণ উদ্ধার',
        titleEn: 'Bridge Cut Crisis & Al-Muthanna’s Heroic Rearguard',
        events: [
          {
            titleBn: 'আবদুল্লাহ ইবনে মারসাদের ভুলে সেতু বিচ্ছিন্ন হওয়া',
            titleEn: 'Cutting of the Pontoon Bridge',
            pointsBn: [
              'মুসলিম বাহিনী পিছু হটতে দেখে আবদুল্লাহ ইবনে মারসাদ সাকাফী (আবেগবশত যেন কেউ পালাতে না পারে) নৌকা-সেতুর দড়ি কেটে দেয়।',
              'এতে নদী ও শত্রু বাহিনীর মাঝে আটকা পড়ে বহু মুসলিম সৈন্য ফোরাতের স্রোতে ডুবে ও শত্রুর আঘাতে শাহাদাত বরণ করেন (মোট প্রায় ৪ হাজার শহীদ)।',
            ],
            pointsEn: [
              'Seeing the retreat, Abdullah ibn Marthad cut the pontoon bridge cables hoping to force men to stand and die.',
              'Trapped between the river and Persian ranks, many Muslims drowned or fell (~4,000 martyrs total).',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৫৮–৪৫৯; ফুতূহুল বুলদান',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 458–459; Futuh al-Buldan',
          },
          {
            titleBn: 'মুসান্না ইবনে হারিসা (রা.)-এর সেতু মেরামত ও শেষ সৈন্যের সুরক্ষা',
            titleEn: 'Al-Muthanna Repairs the Bridge & Guards the Retreat',
            pointsBn: [
              'অষ্টম সেনাপতি হিসেবে দায়িত্ব নিয়ে মুসান্না ইবনে হারিসা (রা.) দ্রুত সেতুটি পুনঃসংযুক্ত করার নির্দেশ দেন।',
              'তিনি নিজে একদল বীর সৈন্য নিয়ে সেতুর মুখে পাহাড়ের মতো দাঁড়িয়ে পারস্য বাহিনীকে আটকে রাখেন যতক্ষণ না অবশিষ্ট প্রায় ৩ হাজার মুসলিম নিরাপদে পার হন—যদিও তিনি মারাত্মক আহত হন।',
            ],
            pointsEn: [
              'Assuming command, al-Muthanna (RA) ordered the bridge immediately reconnected.',
              'With a small band of heroes, he stood like a rock at the bridgehead holding back the Persians until the surviving ~3,000 crossed safely, sustaining a severe wound.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৫৯; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 459; Al-Bidayah wan-Nihayah',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'খলিফা উমর (রা.)-এর প্রজ্ঞাময় সান্ত্বনা ও সামরিক শিক্ষা',
        titleEn: 'Caliph Umar’s Wise Compassion & Tactical Lesson',
        events: [
          {
            titleBn: '“হে আল্লাহ, প্রত্যেক মুসলিম আমার নিরাপত্তায়”—উমর (রা.)-এর সান্ত্বনা',
            titleEn: 'Umar’s Compassionate Reception of Returning Soldiers',
            pointsBn: [
              'পরাজয়ের লজ্জায় মদিনায় ফিরে আসা সৈন্যরা মুখ লুকিয়ে থাকলে খলিফা উমর (রা.) তাদের তিরস্কার না করে পরম স্নেহে সান্ত্বনা দেন।',
              'তিনি বলেন: “তোমরা পালিয়ে আসোনি, বরং তোমরা আমার (মূল সেনাদলের) দিকে ফিরে এসেছ; আমিই তোমাদের আশ্রয়স্থল।”',
            ],
            pointsEn: [
              'When humiliated survivors hesitated to show their faces in Madinah, Caliph Umar (RA) consoled them gently.',
              'He declared: "You did not flee; you merely fell back to me, your main reserve."',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৬০; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 460; Al-Bidayah wan-Nihayah, Vol. 7',
          },
          {
            titleBn: 'ভবিষ্যৎ যুদ্ধগুলোর জন্য নদী-কৌশল ও হস্তী-মোকাবিলার শিক্ষা',
            titleEn: 'Doctrinal Lesson on Rivers & War Elephants',
            pointsBn: [
              'এই বিপর্যয় থেকেই খলিফা উমর (রা.) স্থায়ী সামরিক নির্দেশ জারি করেন: কখনোই মুসলিম বাহিনীর পেছনে নদী রেখে যুদ্ধ করা যাবে না।',
              'এছাড়া হস্তীবাহিনী মোকাবিলার যে বাস্তব অভিজ্ঞতা এখানে অর্জিত হয়, তা বুওয়াইব ও কাদিসিয়ার মহাবিজয়ে কাজে লাগে।',
            ],
            pointsEn: [
              'From this setback, Caliph Umar (RA) instituted a strict rule: never fight with a river blocking the Muslim rear.',
              'Lessons learned against war elephants proved decisive at Buwayb and al-Qadisiyyah.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৬০–৪৬১; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 460–461; Al-Kamil fit-Tarikh',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // 16. BATTLE OF BUWAYB (রমজান ১৩ হিজরি / নভেম্বর ৬৩৪ খ্রি.)
  // =========================================================================
  buwayb: buildWarBundle({
    warId: 'buwayb',
    datePlaceBn: 'রমজান ১৩ হিজরি (নভেম্বর ৬৩৪ খ্রি.) · বুওয়াইব, ফোরাতের পশ্চিম তীর (ইরাক)',
    datePlaceEn: 'Ramadan 13 AH (Nov 634 CE) · Buwayb, West Bank of the Euphrates (Iraq)',
    battleShortBn: 'বুওয়াইবের যুদ্ধ',
    battleShortEn: 'Battle of Buwayb',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'সেতুর যুদ্ধের প্রতিশোধে পুনর্গঠন ও আরব গোত্রগুলোর যোগদান',
        titleEn: 'Regrouping After the Bridge & Tribal Reinforcements',
        events: [
          {
            titleBn: 'খলিফা উমর (রা.)-এর ডাকে আরব উপদ্বীপের সাড়া',
            titleEn: 'Arabian Peninsula Answers Caliph Umar’s Call',
            pointsBn: [
              'সেতুর যুদ্ধের ক্ষত মুছতে খলিফা উমর (রা.) সমগ্র আরবে সৈন্য সংগ্রহের আহ্বান জানান।',
              'জারীর ইবনে আবদুল্লাহ বাজালী (রা.) বাজিলা গোত্রসহ এবং আরব-খ্রিস্টান তাগলিব ও নামির গোত্রের কিছু দলও মুসান্না ইবনে হারিসা (রা.)-এর সাহায্যে বুওয়াইবে এসে যোগ দেয়।',
            ],
            pointsEn: [
              'To recover from the Bridge, Caliph Umar (RA) mobilized reinforcements across Arabia.',
              'Jarir ibn Abdullah al-Bajali (RA) led the Bajila tribe, and even Christian Arab warriors from Taghlib and Namir joined al-Muthanna (RA) at Buwayb.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৬৩; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 463; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'পারস্য সেনাপতি মেহরানের অগ্রযাত্রা ও নদী-কৌশলের পরিবর্তন',
            titleEn: 'Mihran’s Advance & Reversing the River Trap',
            pointsBn: [
              'পারস্য সম্রাটের পক্ষ থেকে সেনাপতি মেহরান ইবনে বাহরাম বিশাল বাহিনী নিয়ে ফোরাতের পূর্ব তীরে আসে।',
              'এবার মেহরান একই প্রশ্ন করলে—কে নদী পার হবে—মুসান্না (রা.) সেতুর যুদ্ধের শিক্ষা প্রয়োগ করে সাফ জানিয়ে দেন: “তোমরাই পার হয়ে এসো!”',
            ],
            pointsEn: [
              'Persian general Mihran ibn Bahram arrived on the eastern bank of the Euphrates with a large army.',
              'When Mihran asked who should cross, al-Muthanna (RA) applied the Bridge’s lesson and replied: "You cross over to us!"',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৬৫; ফুতূহুল বুলদান',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 465; Futuh al-Buldan',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'রমজানের ইফতার ও মুসান্না (রা.)-এর তিন তাকবীরের শৃঙ্খলা',
        titleEn: 'Breaking the Fast & Al-Muthanna’s Three-Takbir Discipline',
        events: [
          {
            titleBn: 'রমজান মাসে যুদ্ধের শক্তিবৃদ্ধির জন্য রোজা ভাঙার অনুমতি',
            titleEn: 'Dispensation to Break the Ramadan Fast for Strength',
            pointsBn: [
              'যুদ্ধটি অনুষ্ঠিত হয় পবিত্র রমজান মাসে; মুসান্না (রা.) ইসলামী শরীয়তের রুখসত অনুযায়ী সৈন্যদের শারীরিক শক্তি ধরে রাখতে সেদিনের রোজা ভেঙে আহার করার নির্দেশ দেন।',
              'তিনি ঘোড়ায় চড়ে প্রতিটি গোত্রের সামনে গিয়ে সাহস ও ধৈর্যের উপদেশ দেন।',
            ],
            pointsEn: [
              'Because the battle fell in Ramadan, al-Muthanna (RA) invoked Islamic legal dispensation advising troops to eat for combat strength.',
              'He rode past every tribal banner delivering inspiring charges of steadfastness.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৬৬; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 466; Al-Bidayah wan-Nihayah, Vol. 7',
          },
          {
            titleBn: 'তিন তাকবীরের সংকেত ও বনু ইজলের দ্রুত আক্রমণ',
            titleEn: 'The Three-Takbir Signal & Premature Charge',
            pointsBn: [
              'মুসান্না (রা.) নির্দেশ দেন: “আমি তিনবার তাকবীর দেব—প্রথম তাকবীরে প্রস্তুত হবে, দ্বিতীয় তাকবীরে অবস্থান নেবে, তৃতীয় তাকবীরে আক্রমণ করবে।”',
              'প্রথম তাকবীরের সাথেই পারস্য বাহিনী তিন ভাগে বিভক্ত হয়ে চিৎকার করতে করতে এগিয়ে এলে মুসান্না (রা.) বললেন: “ওদের চিৎকার নিছক দুর্বলতা, তোমরা নীরবে অটল থাকো।”',
            ],
            pointsEn: [
              'Al-Muthanna instructed: "At my first Takbir prepare, at the second lock ranks, at the third charge."',
              'As Persians advanced shouting loudly at the first Takbir, he calmed his men: "Noise is a sign of weakness; stay silent and firm."',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৬৬–৪৬৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 466–467',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'তীব্র লড়াই, মাসউদ (রা.)-এর শাহাদাত ও মুসান্নার দাড়ি-কামড়ানো সংকল্প',
        titleEn: 'Fierce Struggle & Al-Muthanna’s Unyielding Resolve',
        events: [
          {
            titleBn: 'ভাই মাসউদ ইবনে হারিসা (রা.)-এর বীরত্বপূর্ণ শাহাদাত',
            titleEn: 'Heroic Martyrdom of Mas’ud ibn Haritha',
            pointsBn: [
              'যুদ্ধের এক পর্যায়ে বনু ইজলের ব্যূহে ফাটল ধরলে মুসান্না (রা.) হাসিমুখে দ্রুত সেখানে ছুটে গিয়ে ব্যূহ জুড়ে দেন।',
              'তাঁর সহোদর ভাই মাসউদ ইবনে হারিসা (রা.) আহত হয়ে মাটিতে পড়ে গিয়ে শেষ নিঃশ্বাসে বলেন: “হে বকর ইবনে ওয়ায়েল, পতাকা উঁচু রাখো; আমার মৃত্যুতে বিচলিত হয়ো না!”',
            ],
            pointsEn: [
              'When a gap opened in the Banu Ijl line, al-Muthanna rode there smiling and closed the breach.',
              'His brother Mas’ud (RA), mortally wounded, cried out: "O Bakr ibn Wa’il, keep the banner high and let not my fall dismay you!"',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৬৭–৪৬৮; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 467–468; Al-Kamil fit-Tarikh',
          },
          {
            titleBn: 'কেন্দ্রের গভীর ভেদ ও সেনাপতি মেহরানের পতন',
            titleEn: 'Piercing the Center & Death of Mihran',
            pointsBn: [
              'দীর্ঘ রক্তক্ষয়ী লড়াইয়ের পর মুসান্না (রা.) জারীর ইবনে আবদুল্লাহ (রা.)-কে নিয়ে পারস্য বাহিনীর একেবারে কেন্দ্রস্থলে প্রবল আঘাত হানেন।',
              'তাগলিব গোত্রের এক তরুণ বীর মেহরানকে হত্যা করে তার ঘোড়ায় চড়ে ঘোষণা দেয়: “আমি তাগলিবের সন্তান, আমি মেহরানকে হত্যা করেছি!”',
            ],
            pointsEn: [
              'After grueling combat, al-Muthanna and Jarir (RA) drove a wedge straight into the Persian center.',
              'A young Taghlibi warrior slew general Mihran and proclaimed his death across the battlefield.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৬৮; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 468; Al-Bidayah wan-Nihayah',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'সেতু দখল ও পারস্য বাহিনীর সম্পূর্ণ বিপর্যয়',
        titleEn: 'Seizing the Bridge & Total Sassanid Rout',
        events: [
          {
            titleBn: 'পলায়নের পথ রুদ্ধ করতে মুসান্নার সেতু অবরোধ',
            titleEn: 'Al-Muthanna Cuts Off the Bridge Escape',
            pointsBn: [
              'মেহরানের মৃত্যুর পর পারস্য বাহিনী ছত্রভঙ্গ হয়ে সেতুর দিকে ছুটতে থাকে।',
              'মুসান্না (রা.) বিদ্যুৎগতিতে আগেই সেতুর মুখ দখল করে নেন, ফলে পালানোর পথ বন্ধ হয়ে পারস্য বাহিনী চরম বিপর্যয়ের মুখে পড়ে।',
            ],
            pointsEn: [
              'Upon Mihran’s death, the Persian army broke and stampeded toward the pontoon bridge.',
              'Al-Muthanna raced ahead to seize the bridgehead, trapping the fleeing Persians against the Euphrates.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৬৯; ফুতূহুল বুলদান',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 469; Futuh al-Buldan',
          },
          {
            titleBn: 'ইয়াওমুল আ’শার—সেতুর যুদ্ধের পূর্ণ প্রতিশোধ',
            titleEn: 'Day of the Tens — Avenging the Bridge',
            pointsBn: [
              'এই যুদ্ধে প্রায় একশ জন মুসলিম বীর প্রত্যেকে দশজন করে পারস্য সৈন্যের মোকাবিলা করেছিলেন বলে এর নাম হয় “ইয়াওমুল আ’শার” (দশ-জনের দিন)।',
              'পরাজিত পারস্য বাহিনী বিপুল ক্ষয়ক্ষতি স্বীকার করে ফোরাতের পূর্ব পাড়ে পিছু হটে এবং সেতুর যুদ্ধের গ্লানি সম্পূর্ণ মুছে যায়।',
            ],
            pointsEn: [
              'Known as "Yawm al-A’shar" (Day of Tens) because over a hundred Muslim warriors each fought ten foes.',
              'The Sassanids suffered catastrophic losses, completely erasing the setback of the Battle of the Bridge.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৭০; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 470; Al-Bidayah wan-Nihayah',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'ফোরাত অববাহিকা পুনরুদ্ধার ও মুসান্না (রা.)-এর অমূল্য ওসীয়ত',
        titleEn: 'Reclaiming the Euphrates & Al-Muthanna’s Final Testament',
        events: [
          {
            titleBn: 'বাগদাদ-বাজার ও ফোরাত-তীরবর্তী এলাকায় মুসলিম আধিপত্য',
            titleEn: 'Restored Control Across Western Iraq',
            pointsBn: [
              'বুওয়াইবের বিজয়ের পর মুসলিম বাহিনী আবার হীরা, আনবার ও ফোরাত অববাহিকার পূর্ণ নিয়ন্ত্রণ ফিরে পায়।',
              'মুসলিম টহল দলগুলো সাসানীয় রাজধানীর উপকণ্ঠ পর্যন্ত পৌঁছাতে সক্ষম হয়।',
            ],
            pointsEn: [
              'Victory at Buwayb restored full Muslim control over Hira, Anbar, and the Euphrates plains.',
              'Muslim cavalry patrols reached the outskirts of the Sassanid imperial capital.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৭১; ফুতূহুল বুলদান',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 471; Futuh al-Buldan',
          },
          {
            titleBn: 'কাদিসিয়ার কৌশলগত ওসীয়ত রেখে মুসান্না (রা.)-এর ইন্তেকাল',
            titleEn: 'Al-Muthanna’s Strategic Testament Before Qadisiyyah',
            pointsBn: [
              'সেতুর যুদ্ধের পুরোনো ক্ষত পুনরায় বিগড়ে গেলে মহাবীর মুসান্না (রা.) কাদিসিয়ার যুদ্ধের আগেই ইন্তেকাল করেন।',
              'ইন্তেকালের আগে তিনি সা’দ ইবনে আবি ওয়াক্কাস (রা.)-এর জন্য ঐতিহাসিক ওসীয়ত রেখে যান: “পারস্যদের বিরুদ্ধে যুদ্ধ করবে মরুভূমি ও আবাদি জমির সীমান্তে—কখনো তাদের গভীর ভেতরে ঢুকবে না।”',
            ],
            pointsEn: [
              'His old wound from the Bridge reopened, claiming al-Muthanna’s life shortly before Qadisiyyah.',
              'He left vital strategic counsel for Sa’d ibn Abi Waqqas (RA): fight the Persians on the edge of the desert, never deep inside their riverlands.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৯৪; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 494; Al-Bidayah wan-Nihayah, Vol. 7',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // 17. BATTLE OF AL-QADISIYYAH (শাবান ১৪/১৫ হিজরি / নভেম্বর ৬৩৬ খ্রি.)
  // =========================================================================
  qadisiyyah: buildWarBundle({
    warId: 'qadisiyyah',
    datePlaceBn: 'শাবান ১৫ হিজরি (১৬–১৯ নভেম্বর ৬৩৬ খ্রি.) · কাদিসিয়া প্রান্তর, দক্ষিণ ইরাক',
    datePlaceEn: 'Shaban 15 AH (16–19 Nov 636 CE) · Plains of al-Qadisiyyah, Southern Iraq',
    battleShortBn: 'কাদিসিয়ার মহাযুদ্ধ',
    battleShortEn: 'Battle of al-Qadisiyyah',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'খলিফা উমর (রা.)-এর সর্বাত্মক প্রস্তুতি ও সা’দ ইবনে আবি ওয়াক্কাস (রা.)-এর নিয়োগ',
        titleEn: 'Caliph Umar’s Grand Mobilization & Sa’d’s Command',
        events: [
          {
            titleBn: 'খলিফার নিজে যুদ্ধে যাওয়ার ইচ্ছা ও শূরার সিদ্ধান্তে সা’দ (রা.)-এর নির্বাচন',
            titleEn: 'Shura Selects Sa’d ibn Abi Waqqas (RA)',
            pointsBn: [
              'সাসানীয় সম্রাট ইয়াযদগির্দ তৃতীয় সাম্রাজ্যের সর্বশক্তি একত্রিত করলে খলিফা উমর (রা.) নিজেই ইরাক যুদ্ধে যাওয়ার জন্য মদিনার বাইরে সিরার নামক স্থানে শিবির স্থাপন করেন।',
              'আবদুর রহমান ইবনে আউফ ও আলী (রা.)-এর পরামর্শে শূরা সিদ্ধান্ত নেয় যে খলিফা মদিনায় থেকে সমগ্র মুসলিম বিশ্ব পরিচালনা করবেন এবং আশারায়ে মুবাশ্বারার সাহাবি সা’দ ইবনে আবি ওয়াক্কাস (রা.) প্রধান সেনাপতি হবেন।',
            ],
            pointsEn: [
              'When Emperor Yazdegerd III mobilized the full Sassanid empire, Caliph Umar (RA) camped outside Madinah intending to lead personally.',
              'Following counsel from Abd al-Rahman ibn Awf and Ali (RA), the Shura kept Umar in Madinah and appointed Sa’d ibn Abi Waqqas (RA), one of the Ten Promised Paradise.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৭৮–৪৮১; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 478–481; Al-Bidayah wan-Nihayah, Vol. 7',
          },
          {
            titleBn: 'বদরী ও বাইয়াতে রিদওয়ানের সাহাবিদের সমাবেশ ও কাদিসিয়ায় শিবির',
            titleEn: 'Gathering of Badr Veterans & Camp at Qadisiyyah',
            pointsBn: [
              'সা’দ (রা.)-এর বাহিনীতে ছিলেন ৭০ জনের বেশি বদরী সাহাবি, ৩০০-এর বেশি বাইয়াতে রিদওয়ানের সাহাবি, ৭০০ সাহাবি-সন্তান এবং কবি খানসা (রা.)-সহ বহু বীর নারী।',
              'মুসান্না (রা.)-এর ওসীয়ত ও উমর (রা.)-এর নির্দেশ অনুযায়ী সা’দ (রা.) কাদিসিয়ায় অবস্থান নেন—পেছনে ছিল উন্মুক্ত মরুভূমি এবং সামনে আতিক খাল ও পারস্যের উর্বর সমভূমি।',
            ],
            pointsEn: [
              'Sa’d’s ~30,000-strong force included 70+ Badr veterans, 300+ Bay’at al-Ridwan Companions, 700 sons of Companions, and heroic women including poetess al-Khansa (RA).',
              'Following Umar’s and al-Muthanna’s directives, Sa’d camped at Qadisiyyah with open desert behind and the Atiq canal ahead.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৯৬; আল-কামিল ফিত-তারীখ, খণ্ড ২',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 496; Al-Kamil fit-Tarikh, Vol. 2',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'রিবঈ ইবনে আমির (রা.)-এর ঐতিহাসিক দূতিয়ালি ও ইয়াযদগির্দের দরবার',
        titleEn: 'Historic Diplomacy — Rib’i ibn Amir Before Rustam',
        events: [
          {
            titleBn: 'ইয়াযদগির্দের দরবারে নু’মান ইবনে মুকাররিন (রা.)-এর দাওয়াত',
            titleEn: 'Muslim Envoys at Yazdegerd’s Imperial Court',
            pointsBn: [
              'যুদ্ধের আগে সা’দ (রা.) ১৪ জন বিশিষ্ট সাহাবির প্রতিনিধিদল সম্রাট ইয়াযদগির্দের দরবারে পাঠান।',
              'অহংকারী সম্রাট আরবদের দারিদ্র্য নিয়ে উপহাস করে এক ঝুড়ি মাটি এনে একজন সাহাবির মাথায় তুলে দেয়; মুসলিমরা একে সুভলক্ষণ হিসেবে গ্রহণ করেন: “আল্লাহ তাদের ভূমির মালিকানা আমাদের হাতে তুলে দিয়েছেন!”',
            ],
            pointsEn: [
              'Before fighting, Sa’d sent a 14-man delegation led by Nu’man ibn Muqarrin (RA) to Yazdegerd III.',
              'Mocking Arab poverty, the emperor placed a basket of soil on a delegate’s head; the Muslims took it as a glad omen that Persia’s soil had been handed over to them.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৫০০–৫০৫; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 500–505; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: '“মানুষকে মানুষের দাসত্ব থেকে এক আল্লাহর দাসত্বে মুক্ত করতে এসেছি”—রিবঈ (রা.)',
            titleEn: 'Rib’i ibn Amir’s Immortal Declaration to Rustam',
            pointsBn: [
              'পারস্যের প্রধান সেনাপতি রুস্তম (১ লক্ষ ২০ হাজার সৈন্য ও ৩৩টি রণহস্তীসহ) রেশম-স্বর্ণখচিত তাঁবুতে রিবঈ ইবনে আমির (রা.)-কে স্বাগত জানায়।',
              'রিবঈ (রা.) নিজের সাধারণ ঘোড়া ও বর্শা নিয়ে গালিচা মাড়িয়ে ঘোষণা করেন: “আল্লাহ আমাদের পাঠিয়েছেন যেন আমরা মানুষকে মানুষের দাসত্ব থেকে বের করে এক আল্লাহর দাসত্বে, দুনিয়ার সংকীর্ণতা থেকে এর প্রশস্ততায় এবং অন্যান্য ধর্মের জুলুম থেকে ইসলামের ন্যায়বিচারে নিয়ে আসি।”',
            ],
            pointsEn: [
              'Persian commander Rustam (leading ~120,000 troops and 33 war elephants) received Rib’i ibn Amir (RA) on gold-brocaded carpets.',
              'Rib’i declared: "Allah sent us to deliver mankind from the worship of servants to the worship of Allah alone, from the narrowness of this world to its expanse, and from injustice to the justice of Islam."',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৫২০; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 520; Al-Bidayah wan-Nihayah, Vol. 7',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'প্রথম দিন (ইয়াওমে আরমাস) — রণহস্তীর তাণ্ডব ও আবু মিহজানের বীরত্ব',
        titleEn: 'Day 1 (Yawm al-Armas) — War Elephants & Heroic Resistance',
        events: [
          {
            titleBn: 'অসুস্থ সা’দ (রা.)-এর প্রাসাদ থেকে নেতৃত্ব ও সূরা আনফাল তিলাওয়াত',
            titleEn: 'Sa’d Directs Battle from Qudays & Surah al-Anfal Recited',
            pointsBn: [
              'সা’দ (রা.) তীব্র ফোঁড়া ও সায়াটিকায় আক্রান্ত হয়ে ঘোড়ায় চড়তে না পারায় কুদাইস দুর্গের ছাদ থেকে পুরো রণক্ষেত্র তদারকি করেন এবং খালিদ ইবনে উরফুতাকে মাঠে ডেপুটি নিযুক্ত করেন।',
              'যুদ্ধ শুরুর আগে ক্বারীগণ সেনাদলের সামনে সূরা আল-আনফাল তিলাওয়াত করেন এবং চার তাকবীরে যুদ্ধ আরম্ভ হয়।',
            ],
            pointsEn: [
              'Severely ill with boils and sciatica, Sa’d directed the entire battle via written orders from the roof of Qudays fortress with Khalid ibn Urfutah as field deputy.',
              'Reciters chanted Surah al-Anfal before four Takbirs launched the battle.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৫২৯–৫৩২; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 529–532; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'হাতির আক্রমণে বাজিলা ও বনু আসাদের দৃঢ়তা এবং হাওদার রশি কর্তন',
            titleEn: 'Standing Against War Elephants & Severing Howdah Straps',
            pointsBn: [
              'রুস্তম তার ৩৩টি সজ্জিত হাতি বাজিলা গোত্রের ওপর লেলিয়ে দিলে আরব ঘোড়াগুলো ছত্রভঙ্গ হতে থাকে; তখন বনু আসাদ গোত্র প্রাণপণ লড়াই করে ৫০০ শহীদ দিয়ে ব্যূহ রক্ষা করে।',
              'সা’দ (রা.)-এর নির্দেশে আসিম ইবনে আমর (রা.)-এর তীরন্দাজরা হাতির মাহুতদের তীরবিদ্ধ করে এবং সাহসীরা হাতির পিঠের হাওদার দড়ি কেটে দিলে হাতিগুলো পিছু হটতে বাধ্য হয়।',
            ],
            pointsEn: [
              'When Rustam loosed 33 elephants on Bajila, Banu Asad stepped in and sacrificed 500 martyrs to hold the line.',
              'On Sa’d’s order, Asim ibn Amr’s archers targeted riders while brave men cut the howdah girth straps, driving the elephants back.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৫৩৪–৫৩৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 534–537',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'দ্বিতীয় দিন (ইয়াওমে আগওয়াস) — কা’কা (রা.)-এর আগমন ও উট-কৌশল',
        titleEn: 'Day 2 (Yawm al-Aghwas) — Al-Qa’qa Arrives & Camouflaged Camels',
        events: [
          {
            titleBn: 'সিরিয়া থেকে কা’কা ইবনে আমর (রা.)-এর নাটকীয় আগমন',
            titleEn: 'Dramatic Arrival of Al-Qa’qa ibn Amr from Syria',
            pointsBn: [
              'দ্বিতীয় দিন সকালে সিরিয়া থেকে খলিফা উমর (রা.)-এর পাঠানো অগ্রবর্তী বাহিনী নিয়ে মহাবীর কা’কা ইবনে আমর (রা.) কাদিসিয়ায় পৌঁছান।',
              'তিনি তাঁর ১ হাজার অশ্বারোহীকে ১০ জন করে ক্ষুদ্র দলে ভাগ করে একের পর এক তাকবীর ধ্বনি তুলে ময়দানে প্রবেশ করান, ফলে পারস্য বাহিনী মনে করে মুসলিমদের অগণিত নতুন সাহায্য এসে গেছে।',
              'আগমনমাত্রই দ্বন্দ্বযুদ্ধে তিনি পারস্যের খ্যাতনামা সেনাপতি বাহমান জাযুয়াইহ ও বীরুযানকে হত্যা করে সেতুর যুদ্ধের প্রতিশোধ নেন।',
            ],
            pointsEn: [
              'On Day 2 morning, legendary champion al-Qa’qa ibn Amr (RA) arrived from Syria with vanguard reinforcements.',
              'He entered in small waves of ten horsemen continuously shouting Takbir, creating the psychological impression of endless fresh armies.',
              'In immediate duels, he slew Bahman Jadhuyih (victor of the Bridge) and Biruzan.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৫৩৯–৫৪১; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 539–541; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'ভীতিকর ছদ্মবেশী উট ও বন্দী কবি আবু মিহজান (রা.)-এর গোপন বীরত্ব',
            titleEn: 'Armored Camels & Abu Mihjan’s Secret Heroism',
            pointsBn: [
              'দ্বিতীয় দিনে পারস্যের হাতিগুলো মেরামত হচ্ছিল; সুযোগ বুঝে কা’কা (রা.) মুসলিমদের উটগুলোকে ভয়ংকর কালো বস্ত্র ও মুখোশে ঢেকে পারস্য ঘোড়াগুলোর দিকে পাঠালে রোমান-পারস্য ঘোড়াগুলো আতঙ্কে ছত্রভঙ্গ হয়ে পড়ে।',
              'শৃঙ্খলাভঙ্গের কারণে দুর্গে বন্দী বীর কবি আবু মিহজান সাকাফী (রা.) সা’দের স্ত্রী সালমা (রা.)-কে অঙ্গীকার করে শিকল খুলে সা’দের ঘোড়া ‘বালকা’ নিয়ে শত্রু ব্যূহ তছনছ করে দেন এবং রাতে আবার নিজেই পায়ে শিকল পরে নেন—এ বীরত্ব দেখে সা’দ (রা.) তাঁকে মুক্ত করে দেন।',
            ],
            pointsEn: [
              'While Persian elephants were being refitted, al-Qa’qa draped camels in terrifying dark cloths to panic Persian horses.',
              'Imprisoned poet-warrior Abu Mihjan (RA) vowed to Sa’d’s wife Salma to return, rode Sa’d’s horse Balqa to shatter enemy ranks, and voluntarily returned to his chains at dusk—earning full pardon from Sa’d.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৫৪৩–৫৪৮; আল-ইসাবাহ — ইবনে হাজার',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 543–548; Al-Isabah — Ibn Hajar',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'তৃতীয় দিন ও লাইলাতুল হারীর — সাদা হাতির পতন ও রাতভর সংগ্রাম',
        titleEn: 'Day 3 & Night of Clamor (Laylat al-Harir)',
        events: [
          {
            titleBn: 'সাদা দলনেতা হাতির চোখ ও শুঁড়ে আঘাত করে হস্তীবাহিনী নিষ্ক্রিয় করা',
            titleEn: 'Blinding the Lead White Elephant',
            pointsBn: [
              'তৃতীয় দিন (ইয়াওমে ইমাস) পারস্যরা আবার হাতি নামালে একজন ইসলাম গ্রহণকারী পারস্য নাগরিক পরামর্শ দেয় যে সাদা ও কালো প্রধান হাতি দুটির চোখ ও শুঁড়ে আঘাত করলে পুরো দল পালিয়ে যাবে।',
              'কা’কা (রা.) ও তাঁর ভাই আসিম (রা.) একযোগে বর্শা দিয়ে সাদা হাতিটির দুই চোখ বিদ্ধ করেন এবং শুঁড়ে তলোয়ারের আঘাত হানেন—যন্ত্রণায় হাতিটি ঘুরে দাঁড়িয়ে নিজেদের পারস্য সৈন্যদের মাড়িয়ে নদীতে ঝাঁপ দেয় এবং বাকি সব হাতিও পালিয়ে যায়।',
            ],
            pointsEn: [
              'On Day 3 (Yawm al-Imas), Persian converts advised blinding the two lead elephants to stampede the herd.',
              'Al-Qa’qa and his brother Asim simultaneously pierced the giant white elephant’s eyes and slashed its trunk; maddened, it stampeded backward through Persian lines into the river with all other elephants following.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৫৫২–৫৫৪; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 552–554; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: '“লাইলাতুল হারীর” (গর্জনের রাত) ও কবি খানসা (রা.)-এর চার শহীদের ত্যাগ',
            titleEn: 'Night of Clamor & Al-Khansa’s Four Martyrs',
            pointsBn: [
              'সূর্যাস্তের পরও যুদ্ধ থামেনি; সারারাত অন্ধকারে কেবল তলোয়ারের ঝনঝনানি ও যোদ্ধাদের চাপা গর্জন শোনা যাচ্ছিল বলে একে “লাইলাতুল হারীর” বলা হয়।',
              'মহিয়সী সাহাবীয়া কবি খানসা (রা.) আগের রাতে তাঁর চার পুত্রকে উৎসাহিত করেছিলেন; এই মহাযুদ্ধে তাঁর চার পুত্রই শাহাদাত বরণ করেন এবং সংবাদ শুনে তিনি বলেন: “আলহামদুলিল্লাহ, যিনি তাঁদের শাহাদাতে আমাকে সম্মানিত করেছেন!”',
            ],
            pointsEn: [
              'Combat raged uninterrupted through the night—known as Laylat al-Harir (Night of Clamor) for the relentless clang of steel and groans.',
              'Poetess al-Khansa (RA) lost all four of her sons in the battle and praised Allah for honoring her with their martyrdom.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৫৫৬; উসদুল গাবাহ — ইবনুল আসীর',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 556; Usd al-Ghabah — Ibn al-Athir',
          },
        ],
      },
      {
        phaseNo: 6,
        titleBn: 'চতুর্থ দিন — প্রবল ধূলিঝড়, রুস্তমের পতন ও সাসানীয় সাম্রাজ্যের ভাগ্যনির্ধারণ',
        titleEn: 'Day 4 — Desert Gale, Fall of Rustam & Empire Shattered',
        events: [
          {
            titleBn: 'আল্লাহর সাহায্য হিসেবে পশ্চিম দিকের প্রবল ধূলিঝড় ও রুস্তমের মৃত্যু',
            titleEn: 'Divine Sandstorm & Death of Rustam',
            pointsBn: [
              'চতুর্থ দিন দুপুরে পশ্চিম দিক থেকে তীব্র ধূলিঝড় উঠে পারস্য বাহিনীর চোখের ওপর আছড়ে পড়ে এবং রুস্তমের রাজকীয় শামিয়ানা উড়িয়ে নদীতে ফেলে দেয়।',
              'কা’কা (রা.)-এর নেতৃত্বে মুসলিম বাহিনী কেন্দ্র ভেদ করে রুস্তমের সিংহাসন পর্যন্ত পৌঁছে যায়; পালানোর সময় সাহাবি হিলাল ইবনে উল্লাফা (রা.) রুস্তমকে হত্যা করে ঘোষণা দেন: “কাবার রবের শপথ, আমি রুস্তমকে হত্যা করেছি!”',
            ],
            pointsEn: [
              'At midday on Day 4, a violent westerly sandstorm blinded the Persians and tore Rustam’s royal canopy into the river.',
              'Al-Qa’qa’s men pierced to Rustam’s throne; Hilal ibn Ullafah (RA) slew the fleeing marshal and shouted: "By the Lord of the Ka’bah, I have killed Rustam!"',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৫৬২–৫৬৪; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 562–564; Al-Bidayah wan-Nihayah, Vol. 7',
          },
          {
            titleBn: 'দিরাফশে কাভিয়ানি দখল, উমর (রা.)-এর অপেক্ষা ও মাদায়েনের পথ উন্মোচন',
            titleEn: 'Capture of Royal Banner & Road to Ctesiphon',
            pointsBn: [
              'পারস্যের পবিত্র রাজপতাকা “দিরাফশে কাভিয়ানি” জিরার ইবনে খাত্তাব (রা.)-এর হাতে আসে; যুদ্ধে প্রায় ৮,৫০০ মুসলিম শহীদ হন এবং পারস্যের অন্তত ৩০–৪০ হাজার সৈন্য নিহত হয়।',
              'মদিনার বাইরে প্রতিদিন খলিফা উমর (রা.) পায়ে হেঁটে দূতের অপেক্ষা করতেন; বিজয়ের সংবাদবাহকের উটের পাশে দৌড়াতে দৌড়াতে তিনি সংবাদ শোনেন এবং পরে এই বিজয়ের ধারাবাহিকতায় সাসানীয় রাজধানী মাদায়েন (তেসিফোন) বিজিত হয়।',
            ],
            pointsEn: [
              'The Sassanid imperial banner fell to Dirar ibn al-Khattab; ~8,500 Muslims attained martyrdom while Persian losses reached tens of thousands.',
              'Caliph Umar (RA), who walked daily outside Madinah awaiting news, ran beside the messenger’s camel hearing the triumph that opened the road to Ctesiphon.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৫৬৫–৫৭২; ফুতূহুল বুলদান',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 565–572; Futuh al-Buldan',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // 18. CONQUEST OF DAMASCUS (রজব ১৪ হিজরি / সেপ্টেম্বর ৬৩৫ খ্রি.)
  // =========================================================================
  damascus_conquest: buildWarBundle({
    warId: 'damascus_conquest',
    datePlaceBn: 'রজব ১৪ হিজরি (সেপ্টেম্বর ৬৩৫ খ্রি.) · দামেশক, সিরিয়া',
    datePlaceEn: 'Rajab 14 AH (Sept 635 CE) · Damascus, Syria',
    battleShortBn: 'দামেশক বিজয়',
    battleShortEn: 'Conquest of Damascus',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'পৃথিবীর প্রাচীনতম সুরক্ষিত নগরী ও ছয় ফটকে অবরোধ',
        titleEn: 'Encircling the Ancient Walled Metropolis',
        events: [
          {
            titleBn: 'মারজুস সুফফার ও ফাহলের পর দামেশক অবরোধ',
            titleEn: 'March on Damascus After Ajnadayn and Fahl',
            pointsBn: [
              'আজনাদাইন ও ফাহলের বিজয়ের পর মুসলিম বাহিনী শামের প্রাণকেন্দ্র ও বাইজেন্টাইন সাম্রাজ্যের অন্যতম সুরক্ষিত দুর্গনগরী দামেশক অবরোধ করে।',
              'নগরীটি ছিল ৪০ ফুট উঁচু পাথরের প্রাচীর ও গভীর পরিখায় বেষ্টিত এবং গভর্নর টমাস (সম্রাট হেরাক্লিয়াসের জামাতা) ছিল এর প্রতিরক্ষার দায়িত্বে।',
            ],
            pointsEn: [
              'Following Ajnadayn and Fahl, the Muslim army besieged Damascus, heart of Byzantine Syria.',
              'Protected by 40-foot stone walls and a deep moat, the city was commanded by Thomas, son-in-law of Emperor Heraclius.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৩৮; ফুতূহুল বুলদান — বালাযুরী',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 438; Futuh al-Buldan — Al-Baladhuri',
          },
          {
            titleBn: 'দামেশকের প্রধান ফটকগুলোতে মুসলিম সেনাপতিদের বিন্যাস',
            titleEn: 'Deployment Across All Major City Gates',
            pointsBn: [
              'প্রধান সেনাপতি আবু উবাইদা ইবনুল জাররাহ (রা.) জাবিয়া ফটকে, খালিদ বিন ওয়ালিদ (রা.) পূর্ব ফটকে (বাবুশ শারকী), আমর ইবনুল আস (রা.) টমাস ফটকে, শুরাহবীল (রা.) ফারাদীস ফটকে এবং ইয়াযীদ (রা.) ছোট ফটকে অবস্থান নেন।',
              'এছাড়া হিমস থেকে সম্রাট হেরাক্লিয়াসের সাহায্যকারী বাহিনী ঠেকাতে উত্তরের রাস্তায় শক্তিশালী অশ্বারোহী প্রহরা বসানো হয়।',
            ],
            pointsEn: [
              'Abu Ubaydah (RA) deployed at Jabiyah Gate, Khalid (RA) at East Gate, Amr ibn al-As at Thomas Gate, Shurahbil at Faradis Gate, and Yazid at the Small Gate.',
              'A mobile cavalry screen blocked the northern road to intercept Byzantine relief forces from Homs.',
            ],
            sourceBn: 'ফুতূহুল বুলদান, পৃ. ১২১; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Futuh al-Buldan, p. 121; Al-Bidayah wan-Nihayah, Vol. 7',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'সাহায্যকারী রোমান বাহিনী প্রতিহত ও টমাসের ব্যর্থ পাল্টা আক্রমণ',
        titleEn: 'Blocking Relief Forces & Repelling Thomas’s Sorties',
        events: [
          {
            titleBn: 'সানিয়্যাতুল উকাবে হেরাক্লিয়াসের সাহায্যকারী দল পরাস্ত',
            titleEn: 'Byzantine Relief Column Defeated at Sanita al-Uqab',
            pointsBn: [
              'হিমস থেকে সম্রাট হেরাক্লিয়াস ১২ হাজার অশ্বারোহীর সাহায্যকারী বাহিনী পাঠালে মুসলিম প্রহরী বাহিনী রাফে ইবনে উমাইর ও খালিদ (রা.)-এর সহায়তায় সানিয়্যাতুল উকাবে তাদের পরাজিত করে ফিরিয়ে দেয়।',
              'ফলে দামেশকবাসী বাইরের সাহায্যের আশা হারিয়ে মানসিকভাবে ভেঙে পড়ে।',
            ],
            pointsEn: [
              'When Heraclius sent 12,000 relief horsemen from Homs, Muslim screening forces backed by Khalid defeated them at Sanita al-Uqab.',
              'Cut off from outside relief, morale inside Damascus sank sharply.',
            ],
            sourceBn: 'আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭, পৃ. ২২; তারীখে তাবারী',
            sourceEn: 'Al-Bidayah wan-Nihayah, Vol. 7, p. 22; Tarikh al-Tabari',
          },
          {
            titleBn: 'গভর্নর টমাসের দুই দফা আকস্মিক বেরিয়ে আসা ও পরাজয়',
            titleEn: 'Thomas’s Two Desperate Sorties Repulsed',
            pointsBn: [
              'মরিয়া হয়ে টমাস প্রথমে টমাস ফটক দিয়ে এবং পরে চার ফটক দিয়ে রাতের আঁধারে আকস্মিক আক্রমণ চালায়।',
              'প্রথম আক্রমণে টমাসের চোখে তীর বিদ্ধ হয় এবং দ্বিতীয় আক্রমণে খালিদ (রা.)-এর ভ্রাম্যমাণ রক্ষীদলের (মোবাইল গার্ড) পাল্টা আঘাতে রোমানরা বিপুল ক্ষয়ক্ষতি নিয়ে দুর্গে পালায়।',
            ],
            pointsEn: [
              'Desperate, Thomas launched a sortie from Thomas Gate and later a four-gate night breakout.',
              'Thomas lost an eye to an arrow in the first clash, and Khalid’s Mobile Guard shattered the second breakout.',
            ],
            sourceBn: 'তারীখে দিমাশক — ইবনে আসাকির; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh Dimashq — Ibn Asakir; Al-Kamil fit-Tarikh',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'উৎসবের রাত ও খালিদ (রা.)-এর দড়ির সিঁড়ি অভিযান',
        titleEn: 'Festival Night & Khalid’s Rope-Ladder Escalade',
        events: [
          {
            titleBn: 'নগরীর উৎসবের রাতে খালিদ (রা.)-এর গোপন প্রাচীর-আরোহণ',
            titleEn: 'Secret Wall Escalade During a City Feast',
            pointsBn: [
              'দীর্ঘ অবরোধের পর এক রাতে নগরীর এক উৎসব উপলক্ষে পূর্ব ফটকের প্রহরীরা অসতর্ক ও মদ্যপ হয়ে পড়ে—এক স্থানীয় তথ্যদাতার মাধ্যমে খালিদ (রা.) এই খবর পান।',
              'তিনি দড়ির সিঁড়ি (কামন্দ) তৈরি করে কা’কা ও মাজূর ইবনে আদী (রা.)-সহ বাছাই করা বীরদের নিয়ে পরিখা সাঁতরে প্রাচীরের চূড়ায় উঠে যান।',
            ],
            pointsEn: [
              'Informed that East Gate guards were celebrating a feast carelessly, Khalid (RA) prepared rope ladders.',
              'With al-Qa’qa, Mazur ibn Adi, and elite warriors, he swam the moat and scaled the 40-foot wall under cover of night.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৪০; ফুতূহুল বুলদান — বালাযুরী',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 440; Futuh al-Buldan — Al-Baladhuri',
          },
          {
            titleBn: '“আল্লাহু আকবর” ধ্বনিতে পূর্ব ফটক উন্মুক্ত',
            titleEn: 'Opening the East Gate to the Cry of Takbir',
            pointsBn: [
              'প্রাচীরের ওপর উঠেই তাঁরা প্রহরীদের পরাস্ত করে ভেতর থেকে বাবুশ শারকী (পূর্ব ফটক)-এর শেকল কেটে দরজা খুলে দেন।',
              'সাথে সাথেই খালিদ (রা.)-এর পুরো বাহিনী তাকবীর ধ্বনি তুলে নগরীর পূর্ব দিক থেকে সশস্ত্রভাবে প্রবেশ করে।',
            ],
            pointsEn: [
              'Overpowering the rampart guards, they descended, cut the chains of the East Gate, and flung it wide.',
              'Khalid’s entire division surged into the eastern sector of Damascus shouting Takbir.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪৪০; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 440; Al-Bidayah wan-Nihayah',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'পশ্চিম ফটকে শান্তিচুক্তি ও নগরীর মাঝখানে দুই বাহিনীর সাক্ষাৎ',
        titleEn: 'Peace Treaty at Jabiyah Gate & Meeting at City Center',
        events: [
          {
            titleBn: 'টমাসের তড়িঘড়ি আবু উবাইদা (রা.)-এর কাছে শান্তি-আত্মসমর্পণ',
            titleEn: 'Thomas Swiftly Surrenders Peacefully to Abu Ubaydah',
            pointsBn: [
              'পূর্ব দিক থেকে খালিদ (রা.) ঢুকে পড়েছেন জেনে গভর্নর টমাস ও বিশপ দ্রুত পশ্চিমের জাবিয়া ফটক খুলে শান্তিপ্রিয় সেনাপতি আবু উবাইদা (রা.)-এর কাছে শান্তিচুক্তির মাধ্যমে আত্মসমর্পণ করে।',
              'আবু উবাইদা (রা.) রক্তপাতহীন সন্ধিপত্র স্বাক্ষর করে শান্তিপূর্ণভাবে নগরীতে প্রবেশ করেন।',
            ],
            pointsEn: [
              'Realizing Khalid had breached the east, Thomas and the bishop rushed to open the western Jabiyah Gate and surrender peacefully to Abu Ubaydah (RA).',
              'Abu Ubaydah granted a written peace treaty and entered peacefully without bloodshed.',
            ],
            sourceBn: 'ফুতূহুল বুলদান — বালাযুরী, পৃ. ১২১; তারীখে তাবারী, খণ্ড ৩',
            sourceEn: 'Futuh al-Buldan — Al-Baladhuri, p. 121; Tarikh al-Tabari, Vol. 3',
          },
          {
            titleBn: 'মাকসালাত বা গির্জা চত্বরে ঐতিহাসিক মিলন ও আবু উবাইদার মানবিক সিদ্ধান্ত',
            titleEn: 'Historic Meeting at City Center & Mercy Prevails',
            pointsBn: [
              'নগরীর কেন্দ্রস্থল মাকসালাত (বা সেন্ট জন চার্চ প্রাঙ্গণ)-এ খালিদ (রা.)-এর সশস্ত্র বাহিনী ও আবু উবাইদা (রা.)-এর শান্তিবাহিনী মুখোমুখি হয়।',
              'সেনাপতিদের পরামর্শ শেষে আবু উবাইদা (রা.)-এর শান্তিচুক্তি সমগ্র দামেশকের ওপর কার্যকর করা হয়—ফলে অধিবাসীদের প্রাণ, সম্পদ ও উপাসনালয় পূর্ণ নিরাপত্তা পায়।',
            ],
            pointsEn: [
              'Khalid’s assaulting column and Abu Ubaydah’s treaty column met at the city center (Maqsalat).',
              'Following consultation, Abu Ubaydah’s peace covenant was honored across all of Damascus, protecting lives, property, and churches.',
            ],
            sourceBn: 'ফুতূহুল বুলদান; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭, পৃ. ২৩',
            sourceEn: 'Futuh al-Buldan; Al-Bidayah wan-Nihayah, Vol. 7, p. 23',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'দামেশকের নিরাপত্তা সনদ ও বিশ্ব-সভ্যতায় উজ্জ্বল অধ্যায়',
        titleEn: 'The Charter of Damascus & Historical Legacy',
        events: [
          {
            titleBn: 'ধর্মীয় স্বাধীনতা ও তিন দিনের নিরাপদ প্রস্থানের ওয়াদা রক্ষা',
            titleEn: 'Religious Freedom & Honoring the Three-Day Safe Passage',
            pointsBn: [
              'চুক্তি অনুযায়ী দামেশকের খ্রিস্টান অধিবাসীদের গির্জা ধ্বংস না করার ও পূর্ণ ধর্মীয় স্বাধীনতার লিখিত সনদ দেওয়া হয়।',
              'যারা বাইজেন্টাইন অঞ্চলে যেতে চেয়েছিল (টমাসসহ), তাদের তিন দিনের পূর্ণ নিরাপদ প্রস্থানের অঙ্গীকার অক্ষরে অক্ষরে পালন করা হয়।',
            ],
            pointsEn: [
              'The written charter guaranteed Christian citizens religious freedom and preserved their churches.',
              'Those wishing to depart into Byzantine lands (including Thomas) were strictly granted the promised three days of safe passage.',
            ],
            sourceBn: 'ফুতূহুল বুলদান — বালাযুরী, পৃ. ১২১–১২২; তারীখে দিমাশক',
            sourceEn: 'Futuh al-Buldan — Al-Baladhuri, pp. 121–122; Tarikh Dimashq',
          },
          {
            titleBn: 'শামের রাজধানী হিসেবে ইসলামী সভ্যতার নতুন প্রাণকেন্দ্র',
            titleEn: 'Birth of a Great Center of Islamic Civilization',
            pointsBn: [
              'দামেশক বিজয় ছিল রোমান শাসিত প্রথম বৃহৎ মহানগরীর পতন, যা সমগ্র শাম (সিরিয়া, লেবানন, জর্ডান ও ফিলিস্তিন) বিজয়ের ভিত্তি স্থাপন করে।',
              'পরবর্তীতে এই দামেশকই এক শতাব্দী ধরে উমাইয়া খিলাফতের রাজধানী ও জ্ঞান-বিজ্ঞানের কেন্দ্র হয়ে ওঠে।',
            ],
            pointsEn: [
              'Damascus was the first major Byzantine metropolis captured by the Caliphate, anchoring the liberation of all al-Sham.',
              'It later blossomed for a century as the capital of the Umayyad Caliphate and a beacon of learning.',
            ],
            sourceBn: 'আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Al-Bidayah wan-Nihayah, Vol. 7; Al-Kamil fit-Tarikh',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // 19. BATTLE OF YARMOUK (রজব ১৫ হিজরি / ১৫–২০ আগস্ট ৬৩৬ খ্রি.)
  // =========================================================================
  yarmouk: buildWarBundle({
    warId: 'yarmouk',
    datePlaceBn: 'রজব ১৫ হিজরি (১৫–২০ আগস্ট ৬৩৬ খ্রি.) · ইয়ারমুক নদী উপত্যকা, সিরিয়া-জর্ডান সীমান্ত',
    datePlaceEn: 'Rajab 15 AH (15–20 Aug 636 CE) · Yarmouk River Valley, Syria-Jordan Border',
    battleShortBn: 'ইয়ারমুকের মহাযুদ্ধ',
    battleShortEn: 'Battle of Yarmouk',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'হেরাক্লিয়াসের মহা-অভিযান, জিজিয়া ফেরত ও ইয়ারমুকে একত্রীকরণ',
        titleEn: 'Heraclius’s Grand Armada, Returning Jizyah & Regrouping',
        events: [
          {
            titleBn: 'বাইজেন্টাইন সম্রাটের ৫ বাহিনীর মহা-সমাবেশ (প্রায় ২ লক্ষ সৈন্য)',
            titleEn: 'Byzantine Multi-Ethnic Coalition Marches South',
            pointsBn: [
              'দামেশক ও হিমস হারিয়ে সম্রাট হেরাক্লিয়াস শাম পুনরুদ্ধারের শেষ ও বৃহত্তম চেষ্টা হিসেবে রোমান, আর্মেনীয়, স্লাভ, জর্জীয় ও গাসসানী আরবদের নিয়ে পাঁচটি বিশাল বাহিনী প্রেরণ করে (প্রধান সেনাপতি মাহান)।',
              'বিভিন্ন সূত্রমতে বাইজেন্টাইন জোটের সৈন্যসংখ্যা ছিল ১.৫ থেকে ২.৪ লক্ষ, বিপরীতে মুসলিম বাহিনী ছিল মাত্র ২৪–৪০ হাজার।',
            ],
            pointsEn: [
              'After losing Damascus and Homs, Heraclius launched a massive multi-ethnic coalition (Byzantines, Armenians, Slavs, Georgians, Ghassanids) under Vahan (Mahan).',
              'Classical chronicles place Byzantine numbers at 150,000–240,000 against ~24,000–40,000 Muslims.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৯৩; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 393; Al-Bidayah wan-Nihayah, Vol. 7',
          },
          {
            titleBn: 'ইতিহাসের বিরল ন্যায়বিচার — হিমসবাসীদের জিজিয়া ফেরত দান',
            titleEn: 'Unprecedented Justice — Returning Jizyah to Homs Citizens',
            pointsBn: [
              'খালিদ (রা.)-এর কৌশলগত পরামর্শে আবু উবাইদা (রা.) হিমস ও দামেশক সাময়িকভাবে খালি করে ইয়ারমুকের উন্মুক্ত প্রান্তরে সব মুসলিম বাহিনীকে একত্র করার সিদ্ধান্ত নেন।',
              'হিমস ত্যাগের আগে আবু উবাইদা (রা.) সেখানকার খ্রিস্টান ও ইহুদি নাগরিকদের আদায়কৃত সমস্ত জিজিয়া ফেরত দিয়ে বলেন: “আমরা এখন আপনাদের নিরাপত্তা দিতে অপারগ, তাই এই কর রাখার অধিকার আমাদের নেই।”',
              'এই অকল্পনীয় সততায় অশ্রুসিক্ত হিমসবাসী মুসলিমদের বিজয়ের জন্য দোয়া করে।',
            ],
            pointsEn: [
              'Advised by Khalid (RA), Abu Ubaydah withdrew from Homs and Damascus to concentrate all corps on the plains of Yarmouk.',
              'Before leaving Homs, Abu Ubaydah refunded every coin of Jizyah to Christian and Jewish citizens, saying: "We cannot protect you now, so we have no right to keep your tax."',
              'Moved to tears, the citizens of Homs prayed for the Muslims’ victory and swift return.',
            ],
            sourceBn: 'ফুতূহুল বুলদান — বালাযুরী, পৃ. ১৩৭; কিতাবুল খারাজ — ইমাম আবু ইউসুফ',
            sourceEn: 'Futuh al-Buldan — Al-Baladhuri, p. 137; Kitab al-Kharaj — Abu Yusuf',
          },
          {
            titleBn: 'আবু উবাইদা (রা.)-এর নিঃস্বার্থ ত্যাগ ও খালিদ (রা.)-এর ৩৬ কারাদিস বিন্যাস',
            titleEn: 'Abu Ubaydah Hands Field Command to Khalid’s 36 Regiments',
            pointsBn: [
              'খলিফা উমর (রা.) আবু উবাইদা (রা.)-কে প্রধান সেনাপতি করলেও আবু উবাইদা (রা.) চরম বিনয় ও প্রজ্ঞার সাথে যুদ্ধের মাঠের পূর্ণ নেতৃত্ব খালিদ বিন ওয়ালিদ (রা.)-এর হাতে তুলে দেন।',
              'খালিদ (রা.) প্রথমবারের মতো মুসলিম বাহিনীকে ৩৬টি সুশৃঙ্খল পদাতিক রেজিমেন্ট (কারাদিস) এবং পেছনে নিজের নেতৃত্বাধীন শক্তিশালী ভ্রাম্যমাণ অশ্বারোহী রিজার্ভে (মোবাইল গার্ড) বিন্যস্ত করেন।',
            ],
            pointsEn: [
              'Though named supreme commander by Umar (RA), Abu Ubaydah selflessly handed tactical battlefield command to Khalid ibn al-Walid (RA).',
              'Khalid innovated by organizing the army into 36 compact infantry regiments (karadis) backed by his elite Mobile Guard cavalry reserve.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৩৯৫–৩৯৭; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 395–397; Al-Bidayah wan-Nihayah',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'প্রথম ও দ্বিতীয় দিন — রোমানদের আক্রমণ ও মুসলিম নারীদের প্রতিরোধ',
        titleEn: 'Days 1 & 2 — Roman Assaults & Heroism of Muslim Women',
        events: [
          {
            titleBn: 'দ্বন্দ্বযুদ্ধ ও রোমান সেনাপতি জর্জ (জুরজাহ)-এর ইসলাম গ্রহণ ও শাহাদাত',
            titleEn: 'Conversion & Martyrdom of Byzantine General George (Jurjah)',
            pointsBn: [
              'যুদ্ধের প্রাক্কালে রোমান বাহিনীর অন্যতম শীর্ষ সেনাপতি জর্জ (জুরজাহ) ময়দানে এগিয়ে এসে খালিদ (রা.)-এর কাছে ইসলামের সত্যতা ও মর্যাদা সম্পর্কে জানতে চায়।',
              'খালিদের জবাবে হৃদয় উদ্ভাসিত হলে সে তৎক্ষণাৎ ইসলাম গ্রহণ করে, গোসল করে দু’রাকাত নামাজ পড়ে এবং সেদিনই মুসলিমদের পক্ষে লড়াই করে শাহাদাত বরণ করে।',
            ],
            pointsEn: [
              'Byzantine commander George (Jurjah) rode out to ask Khalid (RA) about the truth of Islam.',
              'Moved by Khalid’s sincere answers, he embraced Islam on the spot, prayed two rak’ahs, and fought for the Muslims—attaining martyrdom that very day.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪০০–৪০১; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 400–401; Al-Bidayah wan-Nihayah, Vol. 7',
          },
          {
            titleBn: 'দ্বিতীয় দিনের ভোরের আকস্মিক হামলা ও সাহাবিনীদের তাঁবুর খুঁটি হাতে প্রতিরোধ',
            titleEn: 'Day 2 Dawn Attack & Muslim Women Rallying the Flanks',
            pointsBn: [
              'দ্বিতীয় দিন ফজরের সময় মাহান হঠাৎ পুরো ফ্রন্টে আক্রমণ চালিয়ে মুসলিমদের ডান (আমর ইবনুল আস) ও বাম (ইয়াযীদ) অংশকে শিবির পর্যন্ত ঠেলে দেয়।',
              'শিবিরে আসমা বিনতে আবি বকর, হিন্দ বিনতে উতবাহ, খাওলাহ বিনতে আযওয়ার ও জুওয়াইরিয়া (রা.)-এর মতো সাহাবিনীরা তাঁবুর খুঁটি ও পাথর হাতে পিছু হটা সৈন্যদের তীব্র ভর্ৎসনা করে ময়দানে ফিরিয়ে দেন।',
              'সাথে সাথেই খালিদ (রা.) তাঁর মোবাইল গার্ড নিয়ে দুই পার্শ্বে পাল্টা আঘাত হেনে পুরো অবস্থান পুনরুদ্ধার করেন।',
            ],
            pointsEn: [
              'At dawn on Day 2, Vahan launched a surprise full-line assault that drove both Muslim wings back toward the camps.',
              'Heroic women—including Asma bint Abi Bakr, Hind bint Utbah, and Khawlah—seized tent poles and shamed retreating soldiers back into battle.',
              'Khalid’s Mobile Guard struck both flanks in turn, restoring the entire front line.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪০৩–৪০৪; ফুতূহুল বুলদান — বালাযুরী',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 403–404; Futuh al-Buldan — Al-Baladhuri',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'তৃতীয় ও চতুর্থ দিন — ‘চক্ষু হারানোর দিন’ ও ইকরিমা (রা.)-এর মৃত্যুর বাইয়াত',
        titleEn: 'Days 3 & 4 — Day of Lost Eyes & Ikrimah’s Pledge unto Death',
        events: [
          {
            titleBn: 'চতুর্থ দিনে আর্মেনীয় তীরবৃষ্টি — “ইয়াওমুল মুকাওয়াআহ” (৭০০ সাহাবির চক্ষুদান)',
            titleEn: 'Day of Lost Eyes — 700 Muslims Lose Sight to Archery',
            pointsBn: [
              'চতুর্থ দিনে বাইজেন্টাইন ও আর্মেনীয় তীরন্দাজদের অবিরাম তীরবর্ষণে মুসলিমদের ডান ও কেন্দ্র অংশ প্রচণ্ড চাপে পড়ে।',
              'সেদিন আবু সুফিয়ান (রা.)-সহ প্রায় ৭০০ মুসলিম যোদ্ধা চোখে তীরবিদ্ধ হয়ে দৃষ্টিশক্তি হারান, তবুও এক কদম পিছু হটেননি।',
            ],
            pointsEn: [
              'On Day 4, relentless Byzantine and Armenian arrow volleys battered the Muslim right and center.',
              'Around 700 Muslims—including Abu Sufyan (RA)—lost an eye to arrows yet refused to yield.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪০৫; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 405; Al-Bidayah wan-Nihayah, Vol. 7',
          },
          {
            titleBn: 'ইকরিমা ইবনে আবি জাহল (রা.)-এর ৪০০ জনের মৃত্যুর বাইয়াত ও অমর ঈসার (আত্মত্যাগ)',
            titleEn: 'Ikrimah’s Pledge of 400 & The Immortal Selflessness of Thirst',
            pointsBn: [
              'সংকটময় মুহূর্তে ইকরিমা (রা.) চিৎকার করে বলেন: “আমি বহু জায়গায় রাসূলুল্লাহ (সা.)-এর বিরুদ্ধে লড়েছিলাম, আজ কি পালাব? কে আমার হাতে মৃত্যুর বাইয়াত করবে?”—তাঁর চাচা হারিস ও দিরারসহ ৪০০ বীর বাইয়াত করে রোমান ব্যূহে ঝাঁপিয়ে পড়েন এবং যুদ্ধের মোড় ঘুরিয়ে দেন।',
              'মুমূর্ষু অবস্থায় হারিস ইবনে হিশাম, ইকরিমা ও আইয়াশ (রা.)-এর কাছে পানি আনা হলে প্রত্যেকেই অপর ভাইকে আগে দেওয়ার ইশারা করেন; এভাবে এক ফোঁটা পানিও পান না করেই তিনজনই শাহাদাত বরণ করেন (ইসলামী ইতিহাসের শ্রেষ্ঠ ঈসার)।',
            ],
            pointsEn: [
              'At the crisis point, Ikrimah ibn Abi Jahl (RA) cried: "Who will pledge unto death with me?" Four hundred heroes charged into the Roman ranks, halting their breakthrough.',
              'Dying of wounds, al-Harith ibn Hisham, Ikrimah, and Ayyash (RA) each passed a cup of water to the next brother until all three attained martyrdom without taking a sip—an immortal act of altruism (Ithar).',
            ],
            sourceBn: 'মুসতাদরাক হাকিম; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭, পৃ. ১১; উসদুল গাবাহ',
            sourceEn: 'Mustadrak al-Hakim; Al-Bidayah wan-Nihayah, Vol. 7, p. 11; Usd al-Ghabah',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'পঞ্চম দিনের যুদ্ধবিরতি প্রত্যাখ্যান ও ষষ্ঠ দিনের মহা-রণকৌশল',
        titleEn: 'Day 5 Truce Refusal & Day 6 Masterstroke',
        events: [
          {
            titleBn: 'মাহানের যুদ্ধবিরতির প্রস্তাব ও খালিদ (রা.)-এর অটল জবাব',
            titleEn: 'Khalid Rejects Vahan’s Offer of Truce',
            pointsBn: [
              'পঞ্চম দিনে ক্লান্ত মাহান কয়েক দিনের যুদ্ধবিরতির প্রস্তাব পাঠায়।',
              'খালিদ (রা.) বুঝতে পারেন রোমানরা মানসিকভাবে ভেঙে পড়েছে; তিনি জবাব দেন: “আমরা যে কাজ শুরু করেছি তা শেষ করার জন্য ব্যগ্র!”',
              'রাতেই তিনি দিরার (রা.)-এর নেতৃত্বে ৫০০ অশ্বারোহী পাঠিয়ে ওয়াদি-আর-রুক্কাদের একমাত্র পালানোর সেতু (আয়নুয যাকার) গোপনে দখল করিয়ে রাখেন।',
            ],
            pointsEn: [
              'Exhausted on Day 5, Vahan proposed a multi-day truce.',
              'Sensing Roman collapse, Khalid refused: "We are in a hurry to finish what we began!"',
              'That night, he sent Dhirar (RA) with 500 horsemen to secretly seize the Ayn al-Dhakar bridge over Wadi al-Ruqqad—the enemy’s sole escape route.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪০৬–৪০৭; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, pp. 406–407; Al-Kamil fit-Tarikh',
          },
          {
            titleBn: 'ষষ্ঠ দিনে সকল মুসলিম অশ্বারোহীর একত্রিত ঘূর্ণি আক্রমণ',
            titleEn: 'Day 6 Unified Cavalry Sweep',
            pointsBn: [
              'ষষ্ঠ দিন (২০ আগস্ট) খালিদ (রা.) ইতিহাসের সর্বশ্রেষ্ঠ অশ্বারোহী কৌশল প্রয়োগ করেন—সমস্ত মুসলিম অশ্বারোহীকে একত্রিত করে রোমান বাম পার্শ্বের অশ্বারোহীদের বিচ্ছিন্ন করে ময়দানছাড়া করেন।',
              'অশ্বারোহী-সুরক্ষা হারানো রোমান পদাতিক বাহিনীর পেছন ও পাশে প্রবল ধাক্কা দিলে পুরো বাইজেন্টাইন সেনাদল সংকুচিত হয়ে গিরিখাতের দিকে ঠেলে যেতে থাকে।',
            ],
            pointsEn: [
              'On Day 6 (20 Aug), Khalid massed all Muslim cavalry into one strike force, isolating and driving the Byzantine cavalry off the battlefield.',
              'Stripped of cavalry cover, Byzantine infantry were hammered from flank and rear toward the sheer ravines.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪০৭; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 407; Al-Bidayah wan-Nihayah',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: 'ওয়াকুসাহ গিরিখাতে পতন ও বাইজেন্টাইন শাসনের চির-অবসান',
        titleEn: 'Plunge into Wadi al-Ruqqad & End of Roman Syria',
        events: [
          {
            titleBn: 'সেতু অবরুদ্ধ ও ওয়াকুসাহর গভীর গিরিখাতে শিকলবদ্ধ রোমানদের পতন',
            titleEn: 'Blocked Bridge & Collapse into the Ravine',
            pointsBn: [
              'পলায়নপর রোমান বাহিনী আয়নুয যাকার সেতুতে এসে দেখে দিরার (রা.) আগেই পথ আটকে দাঁড়িয়ে আছেন।',
              'আতঙ্কিত ও শিকলবদ্ধ হাজার হাজার রোমান সৈন্য ওয়াদি-আর-রুক্কাদ ও ইয়ারমুকের গভীর গিরিখাতে (ওয়াকুসাহ) পড়ে ধ্বংস হয়ে যায়; প্রধান সেনাপতি মাহান দামেশকের পথে পালানোর সময় নিহত হয়।',
            ],
            pointsEn: [
              'Fleeing Romans reached the Ayn al-Dhakar bridge only to find Dhirar blocking their sole exit.',
              'Thousands of panicked and chained soldiers plunged into the deep Wadi al-Ruqqad gorges; commander Vahan was killed fleeing toward Damascus.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৩, পৃ. ৪০৮; ফুতূহুল বুলদান — বালাযুরী',
            sourceEn: 'Tarikh al-Tabari, Vol. 3, p. 408; Futuh al-Buldan — Al-Baladhuri',
          },
          {
            titleBn: '“বিদায় হে সিরিয়া!”—হেরাক্লিয়াসের ঐতিহাসিক আর্তনাদ ও বাইতুল মুকাদ্দাস বিজয়ের পথ',
            titleEn: '"Farewell, O Syria!" — Heraclius Departs Forever',
            pointsBn: [
              'ইয়ারমুকের মহাপরাজয়ের সংবাদ শুনে সম্রাট হেরাক্লিয়াস এন্টিওক থেকে কনস্টান্টিনোপলের উদ্দেশ্যে রওনা হন এবং শেষবারের মতো শামের দিকে তাকিয়ে বলে ওঠেন: “সালাম হে সিরিয়া! কী চমৎকার এক ভূমি শত্রুর হাতে চলে গেল—এরপর আর কোনোদিন দেখা হবে না!”',
              'এই এক বিজয়ের মাধ্যমেই শামে ৭০০ বছরের রোমান-বাইজেন্টাইন শাসনের অবসান ঘটে এবং অচিরেই দামেশক, হিমস, আলেপ্পো ও পবিত্র বাইতুল মুকাদ্দাস (জেরুজালেম) ইসলামী খিলাফতের অধীনে আসে।',
            ],
            pointsEn: [
              'Hearing of the disaster, Emperor Heraclius departed Antioch for Constantinople, bidding his famous lament: "Farewell, O Syria, a farewell with no reunion!"',
              'Yarmouk ended 700 years of Roman rule in the Levant, swiftly leading to the liberation of Damascus, Homs, Aleppo, and Jerusalem.',
            ],
            sourceBn: 'ফুতূহুল বুলদান — বালাযুরী, পৃ. ১৩৭; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Futuh al-Buldan — Al-Baladhuri, p. 137; Al-Bidayah wan-Nihayah, Vol. 7',
          },
        ],
      },
    ],
  }),

  // =========================================================================
  // 20. BATTLE OF NAHAVAND / FATH AL-FUTUH (২১ হিজরি / ৬৪২ খ্রি.)
  // =========================================================================
  nahavand: buildWarBundle({
    warId: 'nahavand',
    datePlaceBn: '২১ হিজরি (৬৪২ খ্রি.) · নাহাওয়ান্দ, পারস্য মালভূমি (পশ্চিম ইরান)',
    datePlaceEn: '21 AH (642 CE) · Nahavand, Iranian Plateau (Western Iran)',
    battleShortBn: 'নাহাওয়ান্দ যুদ্ধ (ফাতহুল ফুতূহ)',
    battleShortEn: 'Battle of Nahavand (Victory of Victories)',
    phases: [
      {
        phaseNo: 1,
        titleBn: 'সম্রাট ইয়াযদগির্দের শেষ মহা-অভিযান ও মদিনায় শূরা',
        titleEn: 'Yazdegerd’s Last Grand Rally & Council in Madinah',
        events: [
          {
            titleBn: 'নাহাওয়ান্দে দেড় লক্ষ সাসানীয় সৈন্যের শেষ শপথ',
            titleEn: '150,000 Sassanids Gather at Nahavand',
            pointsBn: [
              'মাদায়েন ও জালুলা হারানোর পর পলাতক সম্রাট ইয়াযদগির্দ তৃতীয় খোরাসান, তাবারিস্তান, আজারবাইজান ও ফার্সের সব প্রদেশ থেকে শেষবারের মতো প্রায় ১.৫ লক্ষ সৈন্য নাহাওয়ান্দে সমবেত করে।',
              'অভিজ্ঞ সেনাপতি ফিরুযান (মারদানশাহ)-এর নেতৃত্বে তারা শপথ নেয়: “হয় আমরা আরবদের সম্পূর্ণ উৎখাত করব, নতুবা সম্মানের সাথে মৃত্যুবরণ করব।”',
            ],
            pointsEn: [
              'After losing Ctesiphon and Jalula, exiled Emperor Yazdegerd III rallied ~150,000 troops from every Persian province at Nahavand.',
              'Led by veteran general Firuzan, they swore either to expel the Arabs completely or perish.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৪, পৃ. ১১৪; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 4, p. 114; Al-Bidayah wan-Nihayah, Vol. 7',
          },
          {
            titleBn: 'হযরত আলী (রা.)-এর প্রজ্ঞাময় পরামর্শ ও নু’মান ইবনে মুকাররিন (রা.)-এর সেনাপতিত্ব',
            titleEn: 'Ali’s Counsel & Appointment of Nu’man ibn Muqarrin (RA)',
            pointsBn: [
              'খলিফা উমর (রা.) পুনরায় নিজে যুদ্ধে যাওয়ার প্রস্তাব করলে হযরত আলী ইবনে আবি তালিব (রা.) পরামর্শ দেন: “আপনি খিলাফতের কেন্দ্রবিন্দু; আপনি মদিনাতেই থাকুন এবং কুফা ও বসরার বাহিনীকে একত্র করে যোগ্য সেনাপতি পাঠান।”',
              'উমর (রা.) সেই পরামর্শ গ্রহণ করে খন্দক ও হুদাইবিয়ার প্রবীণ সাহাবি নু’মান ইবনে মুকাররিন (রা.)-কে ৩০ হাজার মুসলিম বাহিনীর প্রধান সেনাপতি এবং হুযাইফা ইবনুল ইয়ামান (রা.)-কে তাঁর পরবর্তী উত্তরাধিকারী নিযুক্ত করেন।',
            ],
            pointsEn: [
              'When Caliph Umar (RA) considered marching personally, Ali ibn Abi Talib (RA) wisely advised him to remain as the Caliphate’s anchor in Madinah and unite Kufa and Basra’s forces.',
              'Umar appointed veteran Companion Nu’man ibn Muqarrin (RA) over 30,000 troops, with Hudhayfah ibn al-Yaman (RA) as designated successor.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৪, পৃ. ১১৬–১১৯; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 4, pp. 116–119; Al-Kamil fit-Tarikh',
          },
        ],
      },
      {
        phaseNo: 2,
        titleBn: 'দুর্ভেদ্য পরিখা ও কা’কা (রা.)-এর ছদ্ম-পশ্চাদপসরণ ফাঁদ',
        titleEn: 'Impenetrable Trenches & Al-Qa’qa’s Feigned Retreat',
        events: [
          {
            titleBn: 'ফিরুযানের গভীর পরিখা, লোহার কাঁটা ও দুই মাসের অচলাবস্থা',
            titleEn: 'Firuzan’s Trenches, Caltrops & Stalemate',
            pointsBn: [
              'ফিরুযান নাহাওয়ান্দের পাহাড়ি উপত্যকায় গভীর পরিখা খনন করে ও পথের ওপর হাজার হাজার লোহার কাঁটা (হাসাক) ছড়িয়ে দেয় এবং ভেতর থেকে বের হতে অস্বীকৃতি জানায়।',
              'তীব্র শীত এগিয়ে আসছিল; শত্রুকে পরিখার বাইরে বের করে খোলা ময়দানে আনার জন্য নু’মান (রা.) যুদ্ধ-পরিষদ ডাকেন।',
            ],
            pointsEn: [
              'Firuzan fortified Nahavand with deep trenches and iron caltrops scattered across the approaches, refusing open battle.',
              'With harsh winter approaching, Nu’man (RA) convened a war council to lure the Persians out.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৪, পৃ. ১২৪–১২৬',
            sourceEn: 'Tarikh al-Tabari, Vol. 4, pp. 124–126',
          },
          {
            titleBn: '“উমর (রা.)-এর মৃত্যু” গুজব ও কা’কা (রা.)-এর নাটকীয় ছদ্ম-পলায়ন',
            titleEn: 'Rumor Ploy & Al-Qa’qa’s Feigned Retreat',
            pointsBn: [
              'হযরত তুলাইহা ইবনে খুওয়াইলিদ (রা.)-এর অসাধারণ কৌশল অনুযায়ী কা’কা ইবনে আমর (রা.) ছোট অশ্বারোহী দল নিয়ে পরিখার কিনারে লড়াই বাধিয়ে হঠাৎ ভান করে পিছু হটতে শুরু করেন।',
              'সাথেই ছড়িয়ে দেওয়া হয় যে খলিফা উমর (রা.) ইন্তেকাল করেছেন বলে মুসলিমরা ফিরে যাচ্ছে; ফাঁদে পা দিয়ে ফিরুযান পুরো দেড় লক্ষ সৈন্য নিয়ে পরিখা ছেড়ে খোলা ময়দানে ধাওয়া করে।',
            ],
            pointsEn: [
              'Following Tulayhah ibn Khuwaylid’s plan, al-Qa’qa skirmished at the trenches and staged a convincing feigned retreat.',
              'Combined with a planted rumor of Caliph Umar’s death, Firuzan took the bait and poured his massive army out of the fortifications in pursuit.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৪, পৃ. ১২৭–১২৮; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 4, pp. 127–128; Al-Bidayah wan-Nihayah, Vol. 7',
          },
        ],
      },
      {
        phaseNo: 3,
        titleBn: 'জুমাবার দুপুরে নু’মান (রা.)-এর শাহাদাতের দোয়া ও আক্রমণ',
        titleEn: 'Friday Noon Prayer for Martyrdom & The Great Charge',
        events: [
          {
            titleBn: 'সুন্নাহ অনুযায়ী সূর্য ঢলার অপেক্ষা ও শাহাদাতের আকুল প্রার্থনা',
            titleEn: 'Following the Prophetic Sunnah & Praying for Martyrdom',
            pointsBn: [
              'শুক্রবার সকালে পারস্যরা সামনে চলে এলেও নু’মান (রা.) রাসূলুল্লাহ (সা.)-এর সুন্নাহ অনুসরণ করে সূর্য ঢলা (যোহরের ওয়াক্ত) ও বাতাস প্রবাহিত হওয়া পর্যন্ত অপেক্ষা করেন।',
              'তিনি সাদা পোশাক ও সুগন্ধি মেখে দোয়া করেন: “হে আল্লাহ, আজ নু’মানকে শাহাদাত দান করুন যার মাধ্যমে ইসলামের মহাবিজয় সূচিত হবে!”—সমস্ত মুসলিম আমীন বলে অশ্রুসিক্ত হন।',
            ],
            pointsEn: [
              'Though the Persians arrived Friday morning, Nu’man (RA) waited until afternoon decline (Zawal) following the Prophetic Sunnah of battle.',
              'Dressed in white, he prayed: "O Allah, grant Nu’man martyrdom today that brings supreme victory to Islam!"—and the entire army wept saying Amin.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৪, পৃ. ১২৯–১৩০; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 4, pp. 129–130; Al-Bidayah wan-Nihayah',
          },
          {
            titleBn: 'তিন তাকবীরে বজ্রাঘাত ও নু’মান (রা.)-এর শাহাদাত গোপন রাখা',
            titleEn: 'Three Takbirs & Concealing Nu’man’s Martyrdom',
            pointsBn: [
              'তৃতীয় তাকবীরের সাথেই মুসলিম বাহিনী বজ্রের মতো পারস্য ব্যূহে ঝাঁপিয়ে পড়ে; প্রচণ্ড রক্তপাতে মাটি পিচ্ছিল হয়ে যায়।',
              'ঘোড়া পিছলে পড়ে গিয়ে তীরবিদ্ধ হয়ে নু’মান (রা.) শাহাদাত বরণ করেন; তাঁর ভাই মা’কিল (রা.) তৎক্ষণাৎ তাঁর দেহ চাদরে ঢেকে পতাকা হুযাইফা ইবনুল ইয়ামান (রা.)-এর হাতে তুলে দেন যাতে সৈন্যদের মনোবল অটুট থাকে।',
            ],
            pointsEn: [
              'On the third Takbir, the Muslims struck like thunder; the ground grew slick with blood.',
              'Nu’man’s horse slipped and he was fatally struck by an arrow; his brother Ma’qil swiftly covered his body and handed the banner to Hudhayfah ibn al-Yaman (RA) so morale never wavered.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৪, পৃ. ১৩০–১৩১; সহীহ বুখারী (নু’মানের মর্যাদা প্রসঙ্গ)',
            sourceEn: 'Tarikh al-Tabari, Vol. 4, pp. 130–131; Tarikh chronicles',
          },
        ],
      },
      {
        phaseNo: 4,
        titleBn: 'শিকলবদ্ধ পারস্যদের পতন ও ফিরুযানের মধুর পাহাড়ে মৃত্যু',
        titleEn: 'Collapse of Chained Ranks & Firuzan’s End',
        events: [
          {
            titleBn: 'অন্ধকার রাতে নিজেদের পরিখাতেই পারস্য বাহিনীর ধ্বংস',
            titleEn: 'Persians Fall into Their Own Trenches at Nightfall',
            pointsBn: [
              'হুযাইফা (রা.)-এর দৃঢ় নেতৃত্বে সূর্যাস্তের আগেই পারস্য ব্যূহ সম্পূর্ণ ভেঙে পড়ে।',
              'পালাতে না পারার জন্য দশজন করে শিকলে বাঁধা পারস্য সৈন্যরা অন্ধকারে পিছু হটতে গিয়ে নিজেদেরই খনন করা গভীর পরিখায় একে অপরকে টেনে নিয়ে পড়ে যায়—একই সাথে প্রায় ৮০ হাজার পারস্য সৈন্যের বিপর্যয় ঘটে।',
            ],
            pointsEn: [
              'Under Hudhayfah’s firm command, the Persian line collapsed before sunset.',
              'Chained in groups of ten to prevent flight, retreating Persians tumbled into their own deep trenches in the dark, dragging comrades down with them.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৪, পৃ. ১৩১–১৩২; আল-কামিল ফিত-তারীখ',
            sourceEn: 'Tarikh al-Tabari, Vol. 4, pp. 131–132; Al-Kamil fit-Tarikh',
          },
          {
            titleBn: 'কা’কা (রা.)-এর ধাওয়া ও ফিরুযানের পতন',
            titleEn: 'Al-Qa’qa Pursues and Eliminates Firuzan',
            pointsBn: [
              'সেনাপতি ফিরুযান হামাদানের পাহাড়ি পথ ধরে পালাচ্ছিল, কিন্তু কা’কা ইবনে আমর (রা.) তাকে ধাওয়া করেন।',
              'এক সংকীর্ণ গিরিপথে মধুবাহী খচ্চরের কাফেলার ভিড়ে আটকে পড়ে ফিরুযান নিহত হয়—ঘটনাটি “মধু-বাহিনী” (আসাল) নামে প্রবাদে পরিণত হয়।',
            ],
            pointsEn: [
              'General Firuzan fled toward the mountain pass of Hamadan, hotly pursued by al-Qa’qa (RA).',
              'Blocked in a narrow defile by a caravan of mules carrying honey, Firuzan was overtaken and slain.',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৪, পৃ. ১৩৩; আল-বিদায়া ওয়ান নিহায়া',
            sourceEn: 'Tarikh al-Tabari, Vol. 4, p. 133; Al-Bidayah wan-Nihayah',
          },
        ],
      },
      {
        phaseNo: 5,
        titleBn: '“ফাতহুল ফুতূহ” (বিজয়ের বিজয়) ও পারস্য সাম্রাজ্যের চিরসমাপ্তি',
        titleEn: '"Victory of Victories" & Final End of Sassanid Power',
        events: [
          {
            titleBn: 'মদিনায় নু’মান (রা.)-এর শাহাদাতের সংবাদে খলিফা উমর (রা.)-এর কান্না',
            titleEn: 'Caliph Umar Weeps for Nu’man & Martyrs',
            pointsBn: [
              'দূত তারীফ ইবনে সাহম মদিনায় এসে মহাবিজয়ের সংবাদ দিলে উমর (রা.) আনন্দে সেজদা করেন, কিন্তু নু’মান (রা.)-সহ শহীদদের নাম শুনে অঝোরে কাঁদতে থাকেন।',
              'দূত বললেন: “আরও অনেক সাধারণ মুজাহিদ শহীদ হয়েছেন যাদের আপনি চেনেন না।” উমর (রা.) কাঁদতে কাঁদতে বললেন: “উমর তাদের না চিনলে কী হবে, আল্লাহ তো তাদের প্রতিটি নাম জানেন!”',
            ],
            pointsEn: [
              'When news of the triumph reached Madinah, Caliph Umar (RA) praised Allah, then wept bitterly upon hearing of Nu’man’s martyrdom.',
              'Told of many unknown martyrs, Umar wept: "What matters if Umar does not know them—Allah knows every single one of them!"',
            ],
            sourceBn: 'তারীখে তাবারী, খণ্ড ৪, পৃ. ১৩৫; আল-বিদায়া ওয়ান নিহায়া, খণ্ড ৭',
            sourceEn: 'Tarikh al-Tabari, Vol. 4, p. 135; Al-Bidayah wan-Nihayah, Vol. 7',
          },
          {
            titleBn: 'ইতিহাসে “ফাতহুল ফুতূহ” নামকরণ ও মধ্য এশিয়া পর্যন্ত ইসলামের বিস্তার',
            titleEn: 'Crowned "Victory of Victories" & Spread to Central Asia',
            pointsBn: [
              'নাহাওয়ান্দের পর সাসানীয় সাম্রাজ্য আর কখনোই কোনো সংগঠিত জাতীয় সেনাবাহিনী গড়ে তুলতে পারেনি; তাই ঐতিহাসিকরা একে “ফাতহুল ফুতূহ” (বিজয়ের বিজয়) আখ্যা দিয়েছেন।',
              'এরপর অতি অল্প সময়েই সমগ্র ইরান, ইস্পাহান, আজারবাইজান ও খোরাসান শান্তিপূর্ণ চুক্তি ও অভিযানের মাধ্যমে ইসলামের আলোকময় বলয়ে প্রবেশ করে।',
            ],
            pointsEn: [
              'After Nahavand, the Sassanid Empire never fielded another organized imperial army—earning the battle the title "Fath al-Futuh" (Victory of Victories).',
              'Swiftly thereafter, Isfahan, Hamadan, Azerbaijan, and Khorasan entered the Islamic world.',
            ],
            sourceBn: 'ফুতূহুল বুলদান — বালাযুরী; তারীখে তাবারী, খণ্ড ৪, পৃ. ১৩৬',
            sourceEn: 'Futuh al-Buldan — Al-Baladhuri; Tarikh al-Tabari, Vol. 4, p. 136',
          },
        ],
      },
    ],
  }),
};
