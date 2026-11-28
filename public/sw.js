// ========================================================
// Zikr+ PWA Bulletproof Offline-First Service Worker
// Version: zikrmate-v46-auth-sw-fix
// ========================================================

const CACHE_NAME = 'zikrmate-v46-auth-sw-fix';
const AUDIO_CACHE_NAME = 'zikrmate-audio-v6';
const HADIS_OFFLINE_CACHE = 'zikrmate-hadis-static-v1';

// Core assets to precache on installation (Lightweight App Shell < 500KB)
const ESSENTIAL_PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/favicon.png',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
  '/offline-hadis/chapters-index.json',
  '/offline-hadis/core-books.json',
];

// Secondary on-demand chunks warmed up gently in background during idle time (non-blocking)
const SECONDARY_PRECACHE_URLS = [
  '/offline-hadis/starter-chapters.json',
  '/zikr-tasbeeh-standalone.html',
];

// Guaranteed embedded offline shell (rendered if no cache entry exists for index.html)
const OFFLINE_EMBEDDED_SHELL = `<!doctype html>
<html lang="bn">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover"/>
  <title>Zikr+ - অফলাইন মোড</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #020617;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      text-align: center;
    }
    .card {
      background: #0f172a;
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-radius: 28px;
      padding: 32px 24px;
      max-width: 390px;
      width: 100%;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }
    .icon-box {
      width: 72px;
      height: 72px;
      border-radius: 22px;
      background: linear-gradient(135deg, #064e3b, #022c22);
      border: 1.5px solid #10b981;
      margin: 0 auto 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 14px;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 14px;
    }
    h1 {
      font-size: 22px;
      font-weight: 800;
      color: #f8fafc;
      margin-bottom: 8px;
    }
    p {
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .btn {
      display: block;
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #059669, #10b981);
      color: #022c22;
      font-weight: 800;
      font-size: 15px;
      border-radius: 16px;
      border: none;
      cursor: pointer;
      box-shadow: 0 8px 20px -4px rgba(16, 185, 129, 0.4);
      transition: transform 0.1s ease;
    }
    .btn:active { transform: scale(0.97); }
    .note {
      margin-top: 16px;
      font-size: 11px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon-box">🕋</div>
    <div class="badge">📶 অফলাইন মোড সক্রিয়</div>
    <h1>Zikr+ ডিজিটাল তাসবীহ</h1>
    <p>মোবাইল ডাটা বন্ধ থাকলেও আপনার অ্যাপ এবং সকল সংরক্ষিত জিকির অক্ষত রয়েছে।</p>
    <button class="btn" onclick="window.location.reload()">পুনরায় চালু করুন (Open Zikr+)</button>
    <div class="note">১০০% অফলাইনে ব্যবহারের জন্য সম্পূর্ণ প্রস্তুত</div>
  </div>
</body>
</html>`;

// 1. Install Event: Resilient Precaching with Promise.allSettled
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Precache emergency shell first
      await cache.put(
        '/offline-emergency.html',
        new Response(OFFLINE_EMBEDDED_SHELL, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        })
      );

      // Precache each essential asset individually so 1 missing file never fails the rest
      await Promise.allSettled(
        ESSENTIAL_PRECACHE_URLS.map(async (url) => {
          try {
            const res = await fetch(url, { cache: 'no-cache' });
            if (res && (res.status === 200 || res.type === 'opaque')) {
              await cache.put(url, res);
            }
          } catch (err) {
            console.warn('[SW] Precache non-blocking notice for:', url);
          }
        })
      );

      await self.skipWaiting();
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 2. Activate Event: Clean up outdated caches, take control, and gently pre-warm secondary assets
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== AUDIO_CACHE_NAME && key !== HADIS_OFFLINE_CACHE) {
            console.log('[SW] Purging outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
      await self.clients.claim();

      // Gentle, non-blocking background warming of secondary views/data during idle time (1 at a time)
      if (Array.isArray(SECONDARY_PRECACHE_URLS) && SECONDARY_PRECACHE_URLS.length > 0) {
        setTimeout(async () => {
          try {
            if (typeof navigator !== 'undefined' && !navigator.onLine) return;
            const cache = await caches.open(CACHE_NAME);
            for (const url of SECONDARY_PRECACHE_URLS) {
              try {
                const match = await cache.match(url, { ignoreSearch: true });
                if (!match) {
                  const res = await fetch(url);
                  if (res && (res.status === 200 || res.type === 'opaque')) {
                    await cache.put(url, res);
                  }
                  await new Promise((resolve) => setTimeout(resolve, 120));
                }
              } catch {}
            }
          } catch {}
        }, 2500);
      }
    })()
  );
});

// Helper: Check if request is audio or recitation media
function isAudioOrMedia(request) {
  const url = request.url.toLowerCase();
  return (
    url.endsWith('.mp3') ||
    url.endsWith('.wav') ||
    url.endsWith('.m4a') ||
    url.includes('.mp3?') ||
    url.includes('cdn.islamic.network') ||
    url.includes('mp3quran.net') ||
    url.includes('everyayah.com') ||
    url.includes('api.quran.com/api/v4/verses') ||
    url.includes('api.alquran.cloud') ||
    request.destination === 'audio'
  );
}

// Helper: Check if URL is a Vite content-hashed immutable bundle
function isImmutableAsset(pathname) {
  return pathname.startsWith('/assets/') && !pathname.endsWith('.html');
}

// 3. Fetch Event: Instant Cache-First for immutable assets & offline-hadis + Fast Network-First for HTML
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const isMedia = isAudioOrMedia(event.request);
  const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;

  // A. Skip cross-origin requests (except explicitly cached audio media), Firebase auth handlers, API routes, and Vite dev internals
  if (
    (requestUrl.origin !== self.location.origin && !isMedia) ||
    requestUrl.pathname.startsWith('/__/') ||
    requestUrl.pathname.startsWith('/api/') ||
    requestUrl.pathname.startsWith('/src/') ||
    requestUrl.pathname.startsWith('/@') ||
    requestUrl.pathname.startsWith('/node_modules/') ||
    requestUrl.pathname.endsWith('.ts') ||
    requestUrl.pathname.endsWith('.tsx') ||
    requestUrl.searchParams.has('t') ||
    requestUrl.searchParams.has('v')
  ) {
    return;
  }

  // B. Audio & Media files: Cache-First
  if (isMedia) {
    event.respondWith(
      (async () => {
        const audioCache = await caches.open(AUDIO_CACHE_NAME);
        const cached = await audioCache.match(event.request, { ignoreSearch: false });
        if (cached) return cached;
        if (isOffline) return new Response(null, { status: 404, statusText: 'Audio Not Cached' });

        try {
          const networkRes = await fetch(event.request);
          if (networkRes && (networkRes.status === 200 || networkRes.type === 'opaque')) {
            try {
              audioCache.put(event.request, networkRes.clone());
            } catch {}
          }
          return networkRes;
        } catch {
          return new Response(null, { status: 404, statusText: 'Audio Not Cached' });
        }
      })()
    );
    return;
  }

  // B2. Static Offline Hadith Bundles: Cache-First with silent background refresh
  if (requestUrl.pathname.startsWith('/offline-hadis/')) {
    event.respondWith(
      (async () => {
        const hadisCache = await caches.open(HADIS_OFFLINE_CACHE);
        const mainCache = await caches.open(CACHE_NAME);
        const cached =
          (await hadisCache.match(requestUrl.pathname, { ignoreSearch: true })) ||
          (await mainCache.match(requestUrl.pathname, { ignoreSearch: true }));
        if (cached) {
          if (!isOffline) {
            fetch(event.request)
              .then((fresh) => {
                if (fresh && fresh.status === 200) hadisCache.put(requestUrl.pathname, fresh);
              })
              .catch(() => {});
          }
          return cached;
        }
        try {
          const networkRes = await fetch(event.request);
          if (networkRes && networkRes.status === 200) {
            hadisCache.put(requestUrl.pathname, networkRes.clone()).catch(() => {});
          }
          return networkRes;
        } catch {
          return new Response('{}', { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
      })()
    );
    return;
  }

  // C. Navigation Requests (User opening app, refreshing, or WebAPK launch):
  // Instant cache when offline; fast 1000ms Network-First when online so slow networks don't hang splash screen
  if (event.request.mode === 'navigate' || requestUrl.pathname === '/' || requestUrl.pathname === '/index.html') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);

        if (isOffline) {
          const instantCached =
            (await cache.match('/index.html', { ignoreSearch: true })) ||
            (await cache.match('/', { ignoreSearch: true })) ||
            (await cache.match(event.request, { ignoreSearch: true })) ||
            (await cache.match('/offline-emergency.html'));
          if (instantCached) return instantCached;
        }

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500);
          const networkResponse = await fetch(event.request, {
            cache: 'no-cache',
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            cache.put('/index.html', copy.clone());
            cache.put('/', copy.clone());
            try { cache.put(event.request, copy); } catch {}
            return networkResponse;
          }
          throw new Error(`HTTP ${networkResponse?.status || 'invalid'}`);
        } catch {
          if (!isOffline) {
            fetch('/index.html', { cache: 'no-store' })
              .then((fresh) => {
                if (fresh && fresh.status === 200) {
                  cache.put('/index.html', fresh.clone());
                  cache.put('/', fresh.clone());
                }
              })
              .catch(() => {});
          }
          const fallbackCached =
            (await cache.match('/index.html', { ignoreSearch: true })) ||
            (await cache.match('/', { ignoreSearch: true })) ||
            (await cache.match(event.request, { ignoreSearch: true })) ||
            (await cache.match('/offline-emergency.html'));

          if (fallbackCached) return fallbackCached;

          return new Response(OFFLINE_EMBEDDED_SHELL, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          });
        }
      })()
    );
    return;
  }

  // D. Immutable Vite Content-Hashed Bundles (/assets/*.js, /assets/*.css, /assets/*):
  // Strictly Cache-First for 0ms instant startup (Vite updates hashes on every build)
  if (isImmutableAsset(requestUrl.pathname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached =
          (await cache.match(event.request, { ignoreSearch: true })) ||
          (await cache.match(requestUrl.pathname, { ignoreSearch: true }));
        if (cached) return cached;

        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const contentType = networkResponse.headers.get('content-type') || '';
            if (!contentType.includes('text/html')) {
              cache.put(event.request, networkResponse.clone()).catch(() => {});
            }
          }
          return networkResponse;
        } catch {
          if (requestUrl.pathname.endsWith('.css')) {
            return new Response('/* offline css */', { headers: { 'Content-Type': 'text/css' } });
          }
          if (requestUrl.pathname.endsWith('.js')) {
            return new Response('/* offline script */', { headers: { 'Content-Type': 'application/javascript' } });
          }
          return new Response(null, { status: 404 });
        }
      })()
    );
    return;
  }

  // E. Non-hashed Scripts & CSS: Fast 1100ms Network-First (or instant cache when offline)
  const isCodeBundle =
    event.request.destination === 'script' ||
    event.request.destination === 'style' ||
    requestUrl.pathname.endsWith('.js') ||
    requestUrl.pathname.endsWith('.css');

  if (isCodeBundle) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        if (isOffline) {
          const instant =
            (await cache.match(event.request, { ignoreSearch: true })) ||
            (await cache.match(requestUrl.pathname, { ignoreSearch: true }));
          if (instant) return instant;
        }
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500);
          const networkResponse = await fetch(event.request, {
            cache: 'no-cache',
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const contentType = networkResponse.headers.get('content-type') || '';
            if (!contentType.includes('text/html')) {
              cache.put(event.request, networkResponse.clone()).catch(() => {});
            }
            return networkResponse;
          }
          throw new Error(`HTTP ${networkResponse?.status || 'invalid'}`);
        } catch {
          const cached =
            (await cache.match(event.request, { ignoreSearch: true })) ||
            (await cache.match(requestUrl.pathname, { ignoreSearch: true }));
          if (cached) return cached;
          return new Response(
            event.request.destination === 'style' || requestUrl.pathname.endsWith('.css')
              ? '/* offline css fallback */'
              : '/* offline script fallback */',
            {
              headers: {
                'Content-Type':
                  event.request.destination === 'style' || requestUrl.pathname.endsWith('.css')
                    ? 'text/css'
                    : 'application/javascript',
              },
            }
          );
        }
      })()
    );
    return;
  }

  // F. Other Static Images / Manifest / Icons: Cache-First with background revalidate
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse =
        (await cache.match(event.request, { ignoreSearch: true })) ||
        (await cache.match(requestUrl.pathname, { ignoreSearch: true }));

      if (cachedResponse) {
        if (!isOffline) {
          fetch(event.request)
            .then((fresh) => {
              if (fresh && (fresh.status === 200 || fresh.type === 'opaque')) {
                cache.put(event.request, fresh);
              }
            })
            .catch(() => {});
        }
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(event.request);
        if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
          const contentType = networkResponse.headers.get('content-type') || '';
          const isInvalidHtml =
            (requestUrl.pathname.endsWith('.js') || requestUrl.pathname.endsWith('.css')) &&
            contentType.includes('text/html');

          if (!isInvalidHtml) {
            cache.put(event.request, networkResponse.clone()).catch(() => {});
          }
        }
        return networkResponse;
      } catch (fetchErr) {
        const matchPath = await cache.match(requestUrl.pathname, { ignoreSearch: true });
        if (matchPath) return matchPath;

        if (event.request.destination === 'script' || requestUrl.pathname.endsWith('.js')) {
          return new Response('/* offline script fallback */', {
            headers: { 'Content-Type': 'application/javascript' },
          });
        }
        if (event.request.destination === 'style' || requestUrl.pathname.endsWith('.css')) {
          return new Response('/* offline css fallback */', {
            headers: { 'Content-Type': 'text/css' },
          });
        }
        if (event.request.destination === 'image' || requestUrl.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)) {
          return new Response(
            new Uint8Array([71,73,70,56,57,97,1,0,1,0,128,0,0,0,0,0,255,255,255,33,249,4,1,0,0,0,0,44,0,0,0,0,1,0,1,0,0,2,2,68,1,0,59]),
            { headers: { 'Content-Type': 'image/gif' } }
          );
        }
        throw fetchErr;
      }
    })()
  );
});
