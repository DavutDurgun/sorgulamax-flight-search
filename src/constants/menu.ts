import { Plane, BusFront, Bed, CarFront } from "lucide-react";
import { TabItem, TabInfo } from "@/types";

export const tabs: TabItem[] = [
  { id: "flight", label: "Uçak Bileti", icon: Plane },
  { id: "hotel", label: "Otel", icon: Bed },
  { id: "bus", label: "Otobüs Bileti", icon: BusFront },
  { id: "car", label: "Araç Kiralama", icon: CarFront },
];

export const tabInfo: TabInfo = {
  bus: {
    title: "Otobüs Bileti",
    description:
      "Türkiye'nin en büyük otobüs bileti rezervasyon platformu yakında burada!",
    features: [
      "500+ otobüs firması",
      "Güvenli ödeme",
      "Anında onay",
      "Mobil bilet",
    ],
  },
  car: {
    title: "Araç Kiralama",
    description: "En uygun fiyatlarla araç kiralama hizmeti çok yakında!",
    features: [
      "Geniş araç filosu",
      "Esnek iptal",
      "24/7 destek",
      "Havalimanı teslim",
    ],
  },
  hotel: {
    title: "Otel Rezervasyonu",
    description:
      "Binlerce otel seçeneği ile konforlu konaklama imkanı sunuyoruz!",
    features: [
      "10.000+ otel",
      "En iyi fiyat garantisi",
      "Ücretsiz iptal",
      "Anında onay",
    ],
  },
};
