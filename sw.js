const CACHE_NAME = "sigorta-pwa-v3";
const ASSETS = [
  "./",
  "index.html",
  "odeme.html",
  "arama.html",
  "istatistik.html",
  "hakkinda.html",
  "ayarlar.html",
  "offline.html",
  "manifest.json",
  "icons/icon-192.svg",
  "icons/icon-512.svg",
  "depo/ana-tanitim-gorseli.svg",
  "depo/acente-logo.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (request.url.startsWith("chrome-extension://") || request.url.includes("google-analytics")) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match("offline.html")))
  );
});

// Listen for a message from the page to trigger skipWaiting()
self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
