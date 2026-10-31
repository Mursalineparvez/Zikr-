import fs from 'fs';
import path from 'path';
import { PART1_RASHIDUN_ASHARA } from './data/part1_rashidun_ashara';
import { PART1_PIONEERS_COMMANDERS } from './data/part1_pioneers_commanders';
import { PART1_SCHOLARS_ANSAR_SAHABIYYAT } from './data/part1_scholars_ansar_sahabiyyat';
import { PART2_GROUP_A } from './data/part2_groupA';
import { PART2_GROUP_B } from './data/part2_groupB';
import { SAHABA_CATEGORIES, SahabaItem } from '../src/data/sahabaData';

const part1Combined: SahabaItem[] = [
  ...PART1_RASHIDUN_ASHARA,
  ...PART1_PIONEERS_COMMANDERS,
  ...PART1_SCHOLARS_ANSAR_SAHABIYYAT,
];

const part2Combined: SahabaItem[] = [
  ...PART2_GROUP_A,
  ...PART2_GROUP_B,
];

console.log('Part 1 count:', part1Combined.length);
console.log('Part 2 count:', part2Combined.length);
console.log('Total count:', part1Combined.length + part2Combined.length);

if (part1Combined.length !== 61 || part2Combined.length !== 46) {
  console.error('ERROR: Unexpected count in Part 1 or Part 2!');
  process.exit(1);
}

// Check sequential ranks
const all = [...part1Combined, ...part2Combined];
all.forEach((s, idx) => {
  if (s.rank !== idx + 1) {
    console.error(`ERROR: Rank mismatch at index ${idx}: expected ${idx + 1}, got ${s.rank}`);
    process.exit(1);
  }
});

// Check unique IDs
const idSet = new Set<string>();
all.forEach((s) => {
  if (idSet.has(s.id)) {
    console.error(`ERROR: Duplicate ID: ${s.id}`);
    process.exit(1);
  }
  idSet.add(s.id);
});

console.log('All 107 Sahaba verified successfully with unique IDs and sequential ranks!');

// 1. Generate src/data/sahabaDataPart2.ts
const part2Content = `import { SahabaItem } from './sahabaData';

export const SAHABA_DATABASE_PART2: SahabaItem[] = ${JSON.stringify(part2Combined, null, 2)};
`;

fs.writeFileSync(path.resolve(process.cwd(), 'src/data/sahabaDataPart2.ts'), part2Content, 'utf-8');
console.log('Wrote src/data/sahabaDataPart2.ts');

// 2. Generate src/data/sahabaData.ts with header, types, categories, and part1
const sahabaDataHeader = `export type SahabaCategoryKey =
  | 'rashidun'
  | 'ashara'
  | 'pioneers_martyrs'
  | 'commanders'
  | 'scholars'
  | 'ansar'
  | 'beloved_companions'
  | 'sahabiyyat';

export interface EmotionalStory {
  title: string;
  story: string;
}

export interface HadithPraise {
  arabic?: string;
  textBn: string;
  source: string;
}

export interface QuranRef {
  surah: string;
  verse: string;
  arabic?: string;
  translationBn: string;
}

export interface SahabaItem {
  id: string;
  rank: number;
  nameBn: string;
  nameAr: string;
  titleBn: string;
  categoryKey: SahabaCategoryKey;
  categoryBn: string;
  birthAndDeathBn: string;
  summaryBn: string;
  islamAcceptanceBn: string;
  keyVirtuesBn: string[];
  emotionalStoriesBn: EmotionalStory[];
  hadithPraiseBn: HadithPraise[];
  quranRefBn?: QuranRef[];
  deathOrMartyrdomBn: string;
  lessonsBn: string[];
  referencesBn: string[];
  detailedBiographyBn?: string;
}

export interface CategoryMeta {
  key: SahabaCategoryKey;
  titleBn: string;
  titleAr: string;
  descBn: string;
  accentColor: string;
  icon: string;
}

export const SAHABA_CATEGORIES: CategoryMeta[] = ${JSON.stringify(SAHABA_CATEGORIES, null, 2)};

import { SAHABA_DATABASE_PART2 } from './sahabaDataPart2';

const SAHABA_DATABASE_PART1: SahabaItem[] = ${JSON.stringify(part1Combined, null, 2)};

export const SAHABA_DATABASE: SahabaItem[] = [
  ...SAHABA_DATABASE_PART1,
  ...SAHABA_DATABASE_PART2,
];
`;

fs.writeFileSync(path.resolve(process.cwd(), 'src/data/sahabaData.ts'), sahabaDataHeader, 'utf-8');
console.log('Wrote src/data/sahabaData.ts');
console.log('SUCCESS: All 107 Sahaba compiled and written to database!');
