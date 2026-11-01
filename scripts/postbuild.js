import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const assetsDir = path.join(distDir, 'assets');
const distSwPath = path.join(distDir, 'sw.js');
const publicSwPath = path.resolve('public', 'sw.js');

try {
  const coreUrls = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon.svg',
    '/favicon.png',
    '/pwa-192x192.png',
    '/pwa-512x512.png',
    '/pwa-maskable-512x512.png',
    '/apple-touch-icon.png',
    '/zikr-tasbeeh-standalone.html',
  ];

  const secondaryUrls = [];

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
          const isCore =
            entry.name.startsWith('index-') ||
            entry.name.startsWith('vendor-react-') ||
            entry.name.startsWith('vendor-icons-') ||
            entry.name.startsWith('data-translations-');

          if (isCore) {
            coreUrls.push(urlPath);
          } else {
            secondaryUrls.push(urlPath);
          }
        }
      }
    }
    walkDir(assetsDir);
  }

  console.log(`[PostBuild] Core App Shell precache: ${coreUrls.length} assets.`);
  console.log(`[PostBuild] Secondary on-demand assets: ${secondaryUrls.length} assets.`);

  const swSource = fs.readFileSync(publicSwPath, 'utf8');

  // Replace ESSENTIAL_PRECACHE_URLS array in sw.js
  let updatedSw = swSource.replace(
    /const ESSENTIAL_PRECACHE_URLS = \[[\s\S]*?\];/,
    `const ESSENTIAL_PRECACHE_URLS = ${JSON.stringify(coreUrls, null, 2)};`
  );

  // Replace SECONDARY_PRECACHE_URLS array in sw.js
  updatedSw = updatedSw.replace(
    /const SECONDARY_PRECACHE_URLS = \[[\s\S]*?\];/,
    `const SECONDARY_PRECACHE_URLS = ${JSON.stringify(secondaryUrls, null, 2)};`
  );

  fs.writeFileSync(distSwPath, updatedSw, 'utf8');
  console.log(`[PostBuild] Successfully updated dist/sw.js (Core: ${coreUrls.length}, Secondary: ${secondaryUrls.length}).`);
} catch (err) {
  console.error('[PostBuild] Error updating Service Worker:', err);
}
