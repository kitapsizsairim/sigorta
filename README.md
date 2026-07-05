Sigorta - Statik PWA

Bu depo statik HTML/CSS/JS tabanlı bir "Poliçe Takip" PWA uygulamasıdır.

Hızlı başlatma (yerel test)

1. Proje dizinine gir:

   cd /workspaces/sigorta

2. Basit bir HTTP sunucusu başlat:

   python3 -m http.server 8001

3. Tarayıcıda aç:

   http://127.0.0.1:8001/index.html

Not: Eğer içerik görünmüyorsa hard reload yapın: Windows/Linux: Ctrl+F5 veya Ctrl+Shift+R; macOS: Cmd+Shift+R

Otomatik dağıtım (GitHub Pages)

- Repo kökünde `.github/workflows/deploy-pages.yml` dosyası eklidir. `main` dalına her push sonrası GitHub Actions, içerikleri `gh-pages` dalına yayınlar.
- Repo ayarlarından (Settings → Pages) Source olarak `gh-pages` seçilmelidir.
- Yayın URL muhtemelen: https://kitapsizsairim.github.io/sigorta

PWA, servis çalışanı ve önbellek notları

- Servis çalışanı dosyası: `sw.js` (cache sürümü şu an `sigorta-pwa-v3`).
- Uygulama sayfalarında güncelleme bildirimi için bir banner (`sw-update-banner`) ve "Şimdi Yenile" butonu eklenmiştir. Yeni SW yüklendiğinde kullanıcıya bildirim görünür; butona basıldığında `skipWaiting()` tetiklenir ve sayfa yenilenir.
- Hızlı önbellek atlama yöntemleri:
  - URL sonuna `?v=<timestamp>` ekleyin (örnek: `/index.html?v=1650000000`).
  - Tarayıcı DevTools → Network → "Disable cache" seçeneğini açıp yeniden yükleyin.
  - Mobil cihazlarda Ayarlar → Uygulama → Tarayıcı önbelleğini temizleyin.

Manifest ve ikonlar

- `manifest.json` ve `icons/icon-192.svg`, `icons/icon-512.svg` dosyaları eklidir. Manifest, uygulama simgeleri ve PWA meta bilgilerini içerir.

Canlı dağıtım kontrol komutları (örnek)

curl ile hızlı kontrol:

```
curl -I https://kitapsizsairim.github.io/sigorta/
curl -I https://kitapsizsairim.github.io/sigorta/sw.js
curl -I https://kitapsizsairim.github.io/sigorta/manifest.json
curl -I https://kitapsizsairim.github.io/sigorta/icons/icon-192.svg
```

Sorun giderme kısa rehberi

- Eğer ikon veya manifest 404 dönüyorsa, dosya yolunu ve büyük/küçük harf uyumunu kontrol edin. (GitHub Pages dosya sistemi case-sensitive olabilir.)
- SW güncellemesi görünmüyorsa sayfayı manuel yenileyin veya banner'daki "Şimdi Yenile" butonunu kullanın.

Önemli dosyalar

- `index.html`: Ana ekran (tanıtım resmi, slogan, iletişim rozetleri)
- `ayarlar.html`: Uygulama ayarları — logo, ana görsel, iletişim bilgileri, slogan
- `hakkinda.html`: Program künyesi ve düzenleme alanı (sosyal medya, e-posta, slogan vb.)
- `depo/ana-tanitim-gorseli.svg`: Varsayılan tanıtım görseli
- `.github/workflows/deploy-pages.yml`: GitHub Actions ile otomatik deploy

Değiştirme ve düzenleme

- Ana ekranda görünen slogan ve iletişim bilgilerini `ayarlar.html` veya `hakkinda.html` üzerinden güncelleyip "Bilgileri Kaydet" butonuna basın.
- Ana görsel yüklemek için `ayarlar.html` > "Ana Görsel Seç" kullanabilirsiniz.

Ek destek

- İstersen canlı site için bir tarayıcı ekran görüntüsü alıp doğrulama yapabilirim veya README'ye ek açıklamalar/ek komutlar ekleyebilirim. Hemen yapmamı istiyorsan söyle yeter.
