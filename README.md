# BTC/USDT Live Dashboard

Binance WebSocket API üzerinden anlık BTC/USDT fiyat verilerini çeken ve görselleştiren bir canlı kripto para dashboard uygulaması.

## Önizleme

Uygulama 3 ana panelden oluşur:

- **Fiyat Grafiği** — Son 60 saniyelik fiyat hareketini area chart olarak gösterir. Fiyat yönüne göre çizgi rengi dinamik olarak değişir (yeşil ↑ / kırmızı ↓).
- **Fiyat Göstergesi** — Anlık fiyatı büyük puntolarla görüntüler. Fiyat değişimlerinde flash animasyonu ile görsel geri bildirim sağlar.
- **Son İşlemler Tablosu** — Gerçek zamanlı alış/satış işlemlerini fiyat, miktar ve zaman bilgileriyle listeler.

## Kullanılan Teknolojiler

| Teknoloji                 | Versiyon | Kullanım Amacı                     |
| ------------------------- | -------- | ---------------------------------- |
| **React**                 | 19       | UI bileşen mimarisi                |
| **Vite**                  | 6        | Build aracı ve geliştirme sunucusu |
| **Tailwind CSS**          | 4        | Utility-first CSS framework        |
| **ApexCharts**            | 5.x      | Gerçek zamanlı area chart          |
| **react-apexcharts**      | 1.9      | ApexCharts React entegrasyonu      |
| **clsx + tailwind-merge** | —        | Koşullu className yönetimi         |
| **Binance WebSocket API** | —        | Canlı trade verisi kaynağı         |

## Proje Yapısı

```
btc-live-chart/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                  # Uygulama giriş noktası
    ├── App.jsx                   # Root bileşen
    ├── index.css                 # Global stiller, Tailwind import
    ├── lib/
    │   └── utils.js              # cn() yardımcı fonksiyonu (clsx + twMerge)
    ├── hooks/
    │   └── useBinanceTicker.js   # WebSocket bağlantısı ve veri yönetimi
    └── components/
        ├── Dashboard.jsx         # Ana layout ve bileşen kompozisyonu
        ├── PriceChart.jsx        # ApexCharts area chart bileşeni
        ├── PriceTicker.jsx       # Anlık fiyat göstergesi
        ├── TradeHistory.jsx      # Son işlemler tablosu
        └── ui/
            ├── Card.jsx          # Yeniden kullanılabilir kart bileşeni
            └── Badge.jsx         # Durum ve etiket rozeti
```

## Teknik Detaylar

### WebSocket Veri Akışı

`useBinanceTicker` custom hook'u, Binance'in `btcusdt@trade` WebSocket stream'ine bağlanarak canlı trade verilerini alır. Performans optimizasyonu için gelen mesajlar bir buffer'da toplanır ve her **1 saniyede** bir toplu olarak state'e yansıtılır.

**Temel parametreler:**

- **Buffer flush süresi**: 1000ms
- **Grafik veri penceresi**: Son 60 veri noktası
- **İşlem geçmişi limiti**: Son 20 trade

### Otomatik Yeniden Bağlantı

WebSocket bağlantısı koptuğunda, exponential backoff stratejisi ile yeniden bağlantı sağlanır:

```
1s → 2s → 4s → 8s → 16s → 30s (max)
```

### Responsive Tasarım

Layout, CSS Grid ve Tailwind breakpoint'leri ile responsive olarak tasarlanmıştır. Mobilde tek kolon, büyük ekranlarda (`lg`) 4 kolonlu grid yapısı kullanılır. Grafik alanı 3 kolon, sağ panel 1 kolon kaplar.

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Üretim için derle
npm run build
```

## Gereksinimler

- **Node.js** 18+
- **npm** 9+
