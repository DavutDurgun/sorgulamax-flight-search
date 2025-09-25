import { create } from "zustand";
import { SearchState } from "@/types";
export const useSearchStore = create<SearchState>((set, get) => ({
  // Initial UI state
  activeTab: "flight",

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
