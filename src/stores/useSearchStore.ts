import { create } from "zustand";
import { SearchState } from "@/types";
import { flightService } from "@/services/flightService";

export const useSearchStore = create<SearchState>((set, get) => ({
  // Initial form data
  formData: {
    origin: null,
    destination: null,
    departureDate: "",
    returnDate: "",
    passengers: { ADT: 1 },
    tripType: "one-way",
  },

  // Initial UI state
  activeTab: "flight",
  isSearching: false,

  // Initial results state
  results: [],
  hasSearched: false,
  error: null,

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),

  searchFlights: async () => {
    console.log("Starting flight search...");
    const state = get();
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
      tripType,
    } = state.formData;

    // Validation
    // if (!origin || !destination) {
    //   set({ error: "Lütfen kalkış ve varış yerlerini seçiniz." });
    //   return;
    // }

    // if (origin.code === destination.code) {
    //   set({ error: "Kalkış ve varış yerleri aynı olamaz." });
    //   return;
    // }

    // if (!departureDate) {
    //   set({ error: "Lütfen gidiş tarihini seçiniz." });
    //   return;
    // }

    // if (tripType === "round-trip" && !returnDate) {
    //   set({ error: "Gidiş-dönüş için dönüş tarihini seçiniz." });
    //   return;
    // }

    set({
      isSearching: true,
      error: null,
      results: [],
      hasSearched: false,
    });

    try {
      const searchRequest = {
        // departure_date: departureDate,
        // destination: destination.code,
        // origin: origin.code,
        // passengers: passengers,

        departure_date: "2025-09-26",
        destination: "ESB",
        origin: "RZV",
        passengers: { ADT: 1 },
        ...(tripType === "round-trip" &&
          returnDate && {
            return_date: returnDate,
          }),
      };
      console.debug("Search request:", searchRequest);

      const results = await flightService.searchFlights(searchRequest);
      console.debug("Search results:", results);

      const currentState = get();
      if (currentState.isSearching) {
        set({
          results,
          isSearching: false,
          hasSearched: true,
          error: null,
        });
      }
    } catch (error: any) {
      const currentState = get();
      if (currentState.isSearching) {
        if (error.name !== "AbortError") {
          set({
            error: error.message || "Arama sırasında bir hata oluştu.",
            isSearching: false,
            hasSearched: true,
          });
        }
      }
    }
  },
}));
