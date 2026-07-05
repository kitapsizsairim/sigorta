const CACHE_NAME = "sedat-sigorta-v1";
const ASSETS = [
  "index.html",
  "odeme.html",
  "arama.html",
  "istatistik.html",
  "hakkinda.html",
  "ayarlar.html"
];

// Uygulama dosyalarını tarayıcı hafızasına kilitler
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// İnternet kesilirse sayfaları hafızadan jet hızında getirir
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
