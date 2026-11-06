import { SAHABA_DATABASE } from '../src/data/sahabaData';

const pdfList = [
  { no: 1, name: 'আবু বকর', check: ['আবু বকর', 'abu-bakr'] },
  { no: 2, name: 'উমর ইবনুল খাত্তাব', check: ['উমর ইবনুল', 'umar-ibn'] },
  { no: 3, name: 'উসমান ইবনু আফফান', check: ['উসমান', 'uthman'] },
  { no: 4, name: 'আলী ইবনু আবি তালিব', check: ['আলী ইবনু', 'ali-ibn'] },
  { no: 5, name: 'আবু উবাইদাহ আমির ইবনুল জাররাহ', check: ['উবাইদাহ', 'ubaidah'] },
  { no: 6, name: 'খালিদ ইবনু ওয়ালিদ', check: ['খালিদ', 'khalid'] },
  { no: 7, name: 'জুবাইর ইবনুল আওয়াম', check: ['জুবাইর', 'zubayr'] },
  { no: 8, name: 'খুযাইমা ইবনু সাবিত', check: ['খুযাইমা', 'khuzaym', 'খুজাইমা'] },
  { no: 9, name: 'আসমা বিনতে আবু বকর', check: ['আসমা বিনতে আবি বকর', 'asma-bint-abi-bakr'] },
  { no: 10, name: 'জাফর ইবনু আবি তালিব', check: ['জাফর', 'jafar'] },
  { no: 11, name: 'সা‘দ ইবনু মু‘আয', check: ['সা’দ ইবনে মুআয', 'sad-ibn-muadh'] },
  { no: 12, name: 'হামযা ইবনু আবদুল মুত্তালিব', check: ['হামযা', 'hamza'] },
  { no: 13, name: 'উবাই ইবনু কা‘ব', check: ['উবাই ইবনে কা', 'ubayy'] },
  { no: 14, name: 'যায়দ ইবনু সাবিত', check: ['যায়েদ ইবনে সাবিত', 'zayd-ibn-thabit'] },
  { no: 15, name: 'মু‘আয ইবনু জাবাল', check: ['মুআয ইবনে জাবাল', 'muadh'] },
  { no: 16, name: 'আবদুল্লাহ ইবনু উমর', check: ['আব্দুল্লাহ ইবনে উমর', 'abdullah-ibn-umar'] },
  { no: 17, name: 'আবু মূসা আল-আশ‘আরী', check: ['আবু মূসা', 'abu-musa'] },
  { no: 18, name: 'সা‘দ ইবনু আবি ওয়াক্কাস', check: ['সা’দ ইবনে আবি ওয়াক্কাস', 'sad-ibn-abi-waqqas'] },
  { no: 19, name: 'যায়দ ইবনু হারিসাহ', check: ['যায়েদ বিন হারেসা', 'zayd-ibn-harithah', 'zayd-and-usama'] },
  { no: 20, name: 'হাসান ইবনু আলী', check: ['হাসান ইবনে আলী', 'hasan-ibn-ali'] },
  { no: 21, name: 'ফাতিমা', check: ['ফাতিমা আজ-জাহরা', 'fatima'] },
  { no: 22, name: 'আয়িশা', check: ['আয়েশা সিদ্দিকা', 'aisha'] },
  { no: 23, name: 'আবু হুরাইরা', check: ['আবু হুরায়রা', 'abu-hurairah'] },
  { no: 24, name: 'আবদুল্লাহ ইবনু আমির ইবনু কুরাইয', check: ['কুরাইয', 'kurayz', 'amir-ibn-kurayz'] },
  { no: 25, name: 'আবু যর আল-গিফারী', check: ['আবু যার', 'abu-dharr'] },
  { no: 26, name: 'তালহা ইবনু উবাইদুল্লাহ', check: ['তালহা', 'talha'] },
  { no: 27, name: 'সালমান আল-ফারসি', check: ['সালমান', 'salman'] },
  { no: 28, name: 'আবদুল্লাহ ইবনু মাসউদ', check: ['আব্দুল্লাহ ইবনে মাসউদ', 'abdullah-ibn-masud'] },
  { no: 29, name: 'আনাস ইবনু মালিক', check: ['আনাস ইবনে মালিক', 'anas-ibn-malik'] },
  { no: 30, name: 'হুযাইফা ইবনুল ইয়ামান', check: ['হুজায়ফা ইবনুল ইয়ামান', 'hudhayfah'] },
  { no: 31, name: 'আবদুল্লাহ ইবনু আব্বাস', check: ['আব্দুল্লাহ ইবনে আব্বাস', 'abdullah-ibn-abbas'] },
  { no: 32, name: 'সাবিত ইবনু কায়েস', check: ['সাবিত ইবনে কা', 'thabit-ibn-qays'] },
  { no: 33, name: 'হাসান ইবনু সাবিত', check: ['হাসসান ইবনে সাবিত', 'hassan-ibn-thabit'] },
  { no: 34, name: 'হানযালা ইবনু আবি আমির', check: ['হানযালা', 'hanzala'] },
  { no: 35, name: 'বিলাল ইবনু রাবাহ', check: ['বিলাল', 'bilal'] },
  { no: 36, name: 'যায়দ ইবনু হারিসাহ (হিব্বু রাসূলিল্লাহ)', check: ['যায়েদ বিন হারেসা', 'zayd-ibn-harithah', 'zayd-and-usama'] },
  { no: 37, name: 'উসামা ইবনু যায়দ', check: ['উসামা ইবনে যায়েদ', 'usama-ibn-zayd', 'zayd-and-usama'] },
  { no: 38, name: 'মুস‘আব ইবনু উমাইর', check: ['মুসআব', 'musab'] },
  { no: 39, name: 'আবদুল্লাহ যুল-বিজাদাইন', check: ['যুল-বিজাদাইন', 'dhul-bijadayn', 'bijadayn'] },
  { no: 40, name: 'আসমা বিনতে ইয়াজিদ', check: ['আসমা বিনতে ইয়াজিদ', 'asma-bint-yazid'] },
];

for (const p of pdfList) {
  const found = SAHABA_DATABASE.find(s => p.check.some(c => s.id.toLowerCase().includes(c.toLowerCase()) || s.nameBn.includes(c)));
  if (found) {
    console.log(`[FOUND] ${p.no}. ${p.name} -> ID: ${found.id} | Name: ${found.nameBn} | Current Title: ${found.titleBn}`);
  } else {
    console.log(`[MISSING] ${p.no}. ${p.name}`);
  }
}
