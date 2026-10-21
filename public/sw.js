// Service Worker for Zikr+ PWA (High-Speed App Shell & Offline Audio Caching)
const CACHE_NAME = 'zikrmate-v7';
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
        return cache.addAll(ASSETS_TO_PRECACHE).catch(() => {
          // Graceful fallback if any asset fails
        });
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

// Helper: Check if asset is static & immutable (Vite hashed bundles, images, fonts)
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

  // Bypass API calls from service worker cache
  if (requestUrl.pathname.startsWith('/api/')) {
    return;
  }

  // 1. Audio & Quran Recitations: Cache-First
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

  // 2. Static Vite Chunks, CSS, Images, Fonts: Cache-First with Background Revalidation
  // Loads within 5ms from local storage, making the app open instantaneously!
  if (isStaticAssetRequest(requestUrl)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              try {
                cache.put(event.request, networkResponse.clone());
              } catch {}
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // 3. Navigation / HTML Document: Stale-While-Revalidate with fast fallback
  // Returns instant cached index.html so user never waits, while updating cache in background
  if (event.request.mode === 'navigate' || requestUrl.pathname === '/' || requestUrl.pathname === '/index.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match('/index.html').then((cachedIndex) => {
          const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                try {
                  cache.put('/index.html', networkResponse.clone());
                } catch {}
              }
              return networkResponse;
            })
            .catch(() => cachedIndex);

          // If we have a cached version, return it immediately for instant startup!
          return cachedIndex || fetchPromise;
        });
      })
    );
    return;
  }

  // 4. Default: Network with Cache Fallback
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
