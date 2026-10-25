import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const assetsDir = path.join(distDir, 'assets');
const distSwPath = path.join(distDir, 'sw.js');
const publicSwPath = path.resolve('public', 'sw.js');

try {
  let assetUrls = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon.svg',
    '/zikr-tasbeeh-standalone.html',
  ];

  if (fs.existsSync(assetsDir)) {
    function walkDir(dir, prefix = '/assets') {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const urlPath = `${prefix}/${entry.name}`;
        if (entry.isDirectory()) {
          walkDir(fullPath, urlPath);
        } else if (
          (entry.name.endsWith('.js') ||
           entry.name.endsWith('.css') ||
           entry.name.endsWith('.svg')) &&
          !urlPath.includes('/aistudio/')
        ) {
          assetUrls.push(urlPath);
        }
      }
    }
    walkDir(assetsDir);
  }

  console.log(`[PostBuild] Found ${assetUrls.length} assets to precache in Service Worker.`);

  const swSource = fs.readFileSync(publicSwPath, 'utf8');
  const precacheJson = JSON.stringify(assetUrls, null, 2);

  // Replace ESSENTIAL_PRECACHE_URLS array in sw.js
  const updatedSw = swSource.replace(
    /const ESSENTIAL_PRECACHE_URLS = \[[\s\S]*?\];/,
    `const ESSENTIAL_PRECACHE_URLS = ${precacheJson};`
  );

  fs.writeFileSync(distSwPath, updatedSw, 'utf8');
  console.log(`[PostBuild] Successfully updated dist/sw.js with ${assetUrls.length} precache assets.`);
} catch (err) {
  console.error('[PostBuild] Error updating Service Worker:', err);
}
