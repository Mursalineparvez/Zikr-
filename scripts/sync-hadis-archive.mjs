import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = process.cwd();
const ARCHIVE_ROOT = path.join(ROOT, 'data', 'hadis-archive');
const FAWAZ_DIR = path.join(ARCHIVE_ROOT, 'fawaz');
const AHMED_DIR = path.join(ARCHIVE_ROOT, 'ahmedbaset');

const FAWAZ_CDN = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1';
const FAWAZ_RAW = 'https://raw.githubusercontent.com/fawazahmed0/hadith-api/1';
const AHMED_CDN = 'https://cdn.jsdelivr.net/gh/AhmedBaset/hadith-json@main/db/by_book';
const AHMED_RAW = 'https://raw.githubusercontent.com/AhmedBaset/hadith-json/main/db/by_book';

const FAWAZ_BOOKS = [
  { key: 'bukhari', langs: ['ara', 'ben', 'eng'] },
  { key: 'muslim', langs: ['ara', 'ben', 'eng'] },
  { key: 'nasai', langs: ['ara', 'ben', 'eng'] },
  { key: 'abudawud', langs: ['ara', 'ben', 'eng'] },
  { key: 'tirmidhi', langs: ['ara', 'ben', 'eng'] },
  { key: 'ibnmajah', langs: ['ara', 'ben', 'eng'] },
  { key: 'malik', langs: ['ara', 'ben', 'eng'] },
  { key: 'nawawi', langs: ['ara', 'ben', 'eng'] },
  { key: 'qudsi', langs: ['ara', 'eng'] },
  { key: 'dehlawi', langs: ['ara', 'eng'] },
];

const AHMED_BOOKS = [
  'other_books/riyad_assalihin.json',
  'other_books/bulugh_almaram.json',
  'other_books/aladab_almufrad.json',
  'other_books/shamail_muhammadiyah.json',
  'other_books/mishkat_almasabih.json',
  'the_9_books/darimi.json',
  'the_9_books/ahmed.json',
];

async function fetchWithMirror(urls) {
  let lastErr;
  for (const url of urls) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(45000) });
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
        const text = await res.text();
        // Validate JSON before saving
        JSON.parse(text);
        return text;
      } catch (err) {
        lastErr = err;
        await new Promise((r) => setTimeout(r, 400 * attempt));
      }
    }
  }
  throw lastErr;
}

function saveGzippedJson(destPath, jsonText) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  const gz = zlib.gzipSync(Buffer.from(jsonText, 'utf8'), { level: 9 });
  fs.writeFileSync(destPath, gz);
  return gz.length;
}

async function run() {
  let totalBytes = 0;
  let totalFiles = 0;

  console.log('1) Downloading Fawaz info.json...');
  const infoText = await fetchWithMirror([`${FAWAZ_CDN}/info.json`, `${FAWAZ_RAW}/info.json`]);
  const infoParsed = JSON.parse(infoText);
  // Keep only the 10 canonical keys used in our library to keep info.json crisp and fast
  const compactInfo = {};
  for (const b of FAWAZ_BOOKS) {
    if (infoParsed[b.key]) compactInfo[b.key] = infoParsed[b.key];
  }
  const infoSize = saveGzippedJson(path.join(FAWAZ_DIR, 'info.json.gz'), JSON.stringify(compactInfo));
  totalBytes += infoSize;
  totalFiles++;
  console.log(`   Saved fawaz/info.json.gz (${(infoSize / 1024).toFixed(1)} KB)`);

  console.log('2) Downloading all 10 Fawaz editions (ara, ben, eng)...');
  for (const book of FAWAZ_BOOKS) {
    for (const lang of book.langs) {
      const edKey = `${lang}-${book.key}`;
      const text = await fetchWithMirror([
        `${FAWAZ_CDN}/editions/${edKey}.min.json`,
        `${FAWAZ_RAW}/editions/${edKey}.min.json`,
      ]);
      const parsed = JSON.parse(text);
      const count = Array.isArray(parsed.hadiths) ? parsed.hadiths.length : 0;
      const sz = saveGzippedJson(path.join(FAWAZ_DIR, 'editions', `${edKey}.min.json.gz`), text);
      totalBytes += sz;
      totalFiles++;
      console.log(`   Saved ${edKey}.min.json.gz (${count} hadiths, ${(sz / 1024).toFixed(1)} KB)`);
    }
  }

  console.log('3) Downloading all 7 AhmedBaset books...');
  for (const ahmedPath of AHMED_BOOKS) {
    const text = await fetchWithMirror([
      `${AHMED_CDN}/${ahmedPath}`,
      `${AHMED_RAW}/${ahmedPath}`,
    ]);
    const parsed = JSON.parse(text);
    const count = Array.isArray(parsed.hadiths) ? parsed.hadiths.length : 0;
    const sz = saveGzippedJson(path.join(AHMED_DIR, `${ahmedPath}.gz`), text);
    totalBytes += sz;
    totalFiles++;
    console.log(`   Saved ${ahmedPath}.gz (${count} hadiths, ${(sz / 1024).toFixed(1)} KB)`);
  }

  console.log(`\nDONE! Archived ${totalFiles} files permanently (${(totalBytes / (1024 * 1024)).toFixed(2)} MB total gzipped).`);
}

run().catch((err) => {
  console.error('Archive sync failed:', err);
  process.exit(1);
});
