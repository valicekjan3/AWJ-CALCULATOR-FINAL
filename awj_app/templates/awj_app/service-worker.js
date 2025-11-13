// Service Worker pro AWJ Kalkulačku
// Verze cache
const CACHE_VERSION = 'awj-calc-v1';

// Soubory, které se mají cachovat
const CACHE_FILES = [
    '/',
    '/static/awj_app/css/styles.css',
    '/static/awj_app/js/script.js',
    '/static/awj_app/icons/icon-192x192.png',
    '/static/awj_app/icons/icon-512x512.png',
];

// Instalace Service Workeru
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => {
                console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(CACHE_FILES);
            })
            .catch((error) => {
                console.error('[ServiceWorker] Cache failed:', error);
            })
    );
    // Aktivovat nový service worker okamžitě
    self.skipWaiting();
});

// Aktivace Service Workeru
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Odstranění starých cache verzí
                    if (cacheName !== CACHE_VERSION) {
                        console.log('[ServiceWorker] Removing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Převzetí kontroly nad všemi klienty okamžitě
    return self.clients.claim();
});

// Fetch - strategie Cache First s Network Fallback
self.addEventListener('fetch', (event) => {
    // Přeskočit non-GET requesty
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Pokud máme odpověď v cache, vrátíme ji
                if (cachedResponse) {
                    console.log('[ServiceWorker] Serving from cache:', event.request.url);
                    // Paralelně aktualizujeme cache na pozadí
                    fetch(event.request).then((response) => {
                        if (response && response.status === 200) {
                            caches.open(CACHE_VERSION).then((cache) => {
                                cache.put(event.request, response);
                            });
                        }
                    }).catch(() => {
                        // Síť není dostupná, použijeme cache
                    });
                    return cachedResponse;
                }

                // Pokud není v cache, stáhneme ze sítě
                console.log('[ServiceWorker] Fetching from network:', event.request.url);
                return fetch(event.request)
                    .then((response) => {
                        // Zkontrolujeme, zda je odpověď validní
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }

                        // Klonujeme odpověď - stream může být použit jen jednou
                        const responseToCache = response.clone();

                        // Přidáme do cache
                        caches.open(CACHE_VERSION)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch((error) => {
                        console.error('[ServiceWorker] Fetch failed:', error);
                        // Můžeme zde vrátit fallback stránku
                        // return caches.match('/offline.html');
                        throw error;
                    });
            })
    );
});

// Zpracování zpráv od klienta
self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
