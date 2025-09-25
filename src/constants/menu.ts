import { Plane, BusFront, Bed, CarFront } from "lucide-react";
import { TabItem } from "@/types";

export const tabs: TabItem[] = [
  { id: "flight", label: "Uçak Bileti", icon: Plane },
  { id: "hotel", label: "Otel", icon: Bed },
  { id: "bus", label: "Otobüs Bileti", icon: BusFront },
  { id: "car", label: "Araç Kiralama", icon: CarFront },
];
