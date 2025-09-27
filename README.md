# Sorgulamax Flight Search

Modern, ölçeklenebilir ve kullanıcı dostu bir uçuş arama uygulaması. Next.js ve React mimarisiyle, hızlı ve interaktif bir deneyim sunar.

## Özellikler

- Uçuş arama ve otomatik tamamlama
- Sonuçların kart tabanlı gösterimi
- Sekmeli arayüz (flight, coming soon)
- Hata yönetimi ve yüklenme iskeleti
- Modüler dosya ve bileşen yapısı
- API ile dinamik veri çekme
- Gelişmiş state ve cache yönetimi

## Demo

Tıkla= https://sorgulamax-flight-search.vercel.app

## Projeyi Çalıştırma

1. Bağımlılıkları yükleyin:
   ```bash
   bun install
   # veya
   npm install
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
   bun dev
   # veya
   npm run dev
   ```
3. Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açarak projeyi görüntüleyin.

## Klasör Yapısı

```
src/
  app/
    api/
      flights/
        autocomplete/
        search/
    favicon.ico
    globals.css
    layout.tsx
    page.tsx
  components/
    layout/
    results/
    search/
      form/
      hooks/
      components/
    ui/
      skeleton/
      DatePicker/
 constants/
 hooks/
 mock/
 services/
 stores/
 types/
 utils/
public/
  file.svg
  globe.svg
  next.svg
  vercel.svg
  window.svg
diğer kök dosyalar: biome.json, bun.lock, next-env.d.ts, next.config.ts, package.json, postcss.config.mjs, README.md, tsconfig.json
```

## Kullanılan Teknolojiler

- nextjs: React tabanlı web framework
- react: Arayüz kütüphanesi
- typescript: Tip güvenli JavaScript
- tailwindcss: Utility-first CSS framework
- zustand: State yönetimi
- swr: Veri fetch ve cache
- lucide-react: İkon kütüphanesi
- date-fns: Tarih işlemleri
- clsx: Dinamik className yönetimi
- tailwind-merge: Tailwind class birleştirme
- biome: Kod format/lint

## Mimari ve Design Pattern'ler

- **Bileşen Tabanlı Mimari**

  - Tüm arayüz, küçük ve tekrar kullanılabilir React bileşenlerine ayrılmıştır.
  - Örnek:
    ```tsx
    // src/components/results/FlightCard.tsx
    export default function FlightCard({ flight }) {
      return <div>{flight.name}</div>;
    }
    ```

- **Store Yönetimi (Zustand)**

  - Global state yönetimi için Zustand kullanılır.
  - Örnek:
    ```ts
    // src/stores/useSearchStore.ts
    import { create } from "zustand";
    export const useSearchStore = create((set) => ({
      activeTab: "flight",
      setActiveTab: (tab) => set({ activeTab: tab }),
    }));
    ```

- **Cache & Veri Fetch (SWR)**

  - API'den veri çekme işlemlerinde SWR ile otomatik cache, revalidate ve hata yönetimi sağlanır.
  - Örnek:
    ```ts
    // src/hooks/fetchers/flightFetcher.ts
    import useSWR from "swr";
    export function useFlightSearch(params) {
      return useSWR(["/api/flights/search", params], fetcher);
    }
    ```

- **Error Boundary Pattern**

  - UI'da hata oluştuğunda kullanıcıya dostça bir hata mesajı ve yeniden deneme imkanı sunmak için ErrorBoundary bileşeni kullanılır.
  - Örnek:
    ```tsx
    // src/components/ui/ErrorBoundary.tsx
    class ErrorBoundary extends React.Component {
      // ...
    }
    ```

- **Skeleton Loading Pattern**

  - Veri yüklenirken kullanıcıya iskelet ekranlar gösterilir.
  - Örnek:
    ```tsx
    // src/components/ui/skeleton/compound/FlightResults.tsx
    export function FlightResultsSkeleton({ count }) {
      return <div>{/* skeleton */}</div>;
    }
    ```

- **Custom Hooks**

  - Tekrar eden işlevler özel React hook'ları ile modülerleştirilmiştir.
  - Örnek:
    ```ts
    // src/components/search/form/hooks/useAutoComplete.ts
    import { useState } from "react";
    export function useAutoComplete(query) {
      // ...
    }
    ```

- **Sorumlulukların Ayrılması (Separation of Concerns)**

  - API servisleri, mock veriler, yardımcı fonksiyonlar ve UI bileşenleri ayrı dosya ve klasörlerde tutulur.

- **Sabitler & Tipler**
  - Sabitler ve TypeScript tipleri ayrı dosyalarda tanımlanır.
  - Örnek:
    ```ts
    // src/types/index.ts
    export type Flight = { id: string; name: string };
    ```

## Daha Fazla Teknik Detay

- **API Route Yapısı**: Next.js app directory altında, `src/app/api/flights/autocomplete/route.ts` ve `src/app/api/flights/search/route.ts` dosyaları ile uçuş arama ve autocomplete endpoint'leri oluşturulmuştur. Sunucu tarafı kodlar burada tutulur.

- **Error Handling**: Hem client hem server tarafında hata yönetimi için try/catch blokları ve ErrorBoundary kullanılır. API hataları kullanıcıya dostça mesajlarla iletilir.

- **Responsive Tasarım**: Tüm bileşenler Tailwind CSS ile mobil ve masaüstü uyumlu şekilde tasarlanmıştır.

- **Reusable UI Components**: UI/UX tutarlılığı için skeleton, card, button, form gibi bileşenler ayrı dosyalarda ve modüler şekilde yazılmıştır.

- **Mock Data & Test Edilebilirlik**: Geliştirme ve test için `src/mock/airportList.ts` gibi mock veri dosyaları kullanılır.

- **Helper Fonksiyonlar**: Sık kullanılan işlemler (tarih, storage, genel yardımcılar) `src/utils/` altında fonksiyonel olarak tutulur.

- **TypeScript ile Tip Güvenliği**: Tüm veri modelleri ve fonksiyonlar TypeScript ile tiplenmiştir. Hatalı veri akışları minimize edilmiştir.

- **Biome ile Kod Kalitesi**: Biome ile lint ve format işlemleri otomatikleştirilmiştir.

## Katkı Sağlama

Katkı sağlamak için lütfen bir fork oluşturun ve pull request gönderin. Hataları veya önerileri Issues bölümünden bildirebilirsiniz.

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
