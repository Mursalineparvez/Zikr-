// Service Worker for Zikr+ PWA (Self-Healing & Offline Audio Caching)
const CACHE_NAME = 'zikrmate-v9';
const AUDIO_CACHE_NAME = 'zikrmate-audio-v2';

const ASSETS_TO_PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(ASSETS_TO_PRECACHE).catch(() => {});
      }),
      caches.open(AUDIO_CACHE_NAME),
    ]).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== AUDIO_CACHE_NAME) {
            console.log('[SW] Purging obsolete cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper: Check if request is for Quran Audio or MP3 media
function isAudioOrMediaRequest(request) {
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

// Helper: Check if asset is a Vite development server internal path
function isViteDevPath(url) {
  return (
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.includes('/node_modules/') ||
    url.search.includes('t=') ||
    url.search.includes('import')
  );
}

// Helper: Check if asset is static & immutable production bundle or image
function isStaticAssetRequest(url) {
  return (
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.webp') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('fonts.googleapis.com')
  );
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  // 1. Bypass API calls and all Vite development server paths entirely
  if (requestUrl.pathname.startsWith('/api/') || isViteDevPath(requestUrl)) {
    return;
  }

  // 2. Audio & Quran Recitations: Cache-First
  if (isAudioOrMediaRequest(event.request)) {
    event.respondWith(
      caches.open(AUDIO_CACHE_NAME).then((audioCache) => {
        return audioCache.match(event.request, { ignoreSearch: false }).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request)
            .then((networkResponse) => {
              if (
                networkResponse &&
                (networkResponse.status === 200 || networkResponse.type === 'opaque' || networkResponse.type === 'cors')
              ) {
                try {
                  audioCache.put(event.request, networkResponse.clone());
                } catch {}
              }
              return networkResponse;
            })
            .catch(() => new Response(null, { status: 404, statusText: 'Audio Not Cached' }));
        });
      })
    );
    return;
  }

  // 3. Navigation / HTML Document: Network-First with Offline Fallback
  // Always fetches fresh HTML so code updates apply immediately, never serving stuck stale bundles!
  if (event.request.mode === 'navigate' || requestUrl.pathname === '/' || requestUrl.pathname === '/index.html') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put('/index.html', copy.clone());
              cache.put('/', copy);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match('/index.html');
          if (cached) return cached;
          return caches.match('/');
        })
    );
    return;
  }

  // 4. Static Production Chunks, CSS, Images, Fonts:
  // Only cache if response is genuinely a JS/CSS/image file, NEVER cache HTML error fallbacks!
  if (isStaticAssetRequest(requestUrl)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const contentType = networkResponse.headers.get('content-type') || '';
              // Strictly verify it's not an HTML 404 fallback before caching JS or CSS!
              const isNotHtmlFallback =
                !requestUrl.pathname.endsWith('.js') || contentType.includes('javascript');
              if (isNotHtmlFallback) {
                try {
                  cache.put(event.request, networkResponse.clone());
                } catch {}
              }
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // 5. Default: Network with Cache Fallback
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, copy));
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
