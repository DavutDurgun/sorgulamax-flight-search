import { Suspense } from "react";
import { MainLayout } from "@/components/layout";
import { LoadingSkeleton } from "@/components/ui/skeleton/compound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SorgulaMax - Türkiye'nin Seyahat Arama Motoru",
  description:
    "En uygun uçak bileti, otel, otobüs bileti ve araç kiralama fiyatlarını karşılaştırın. Güvenli rezervasyon, anında onay.",
  keywords:
    "uçak bileti, otel rezervasyonu, otobüs bileti, araç kiralama, seyahat, tatil",
  openGraph: {
    title: "SorgulaMax - Seyahat Arama Motoru",
    description:
      "En uygun seyahat fiyatlarını bulun ve güvenle rezervasyon yapın.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <MainLayout>
      <Suspense
        fallback={<LoadingSkeleton.Card className="max-w-6xl mx-auto" />}
      >
        SearchContainer
      </Suspense>
      {/* Additional Content Sections */}
      PopularDestinations WhyChooseUs
    </MainLayout>
  );
}
