// Store Types
export interface SearchState {
  // Form state
  formData: SearchFormData;

  // UI state
  activeTab: "flight" | "bus" | "car" | "hotel";
  isSearching: boolean;

  // Results state
  results: FlightResult[];
  hasSearched: boolean;
  error: string | null;

  // Autocomplete state
  originSuggestions: AutocompleteLocation[];
  destinationSuggestions: AutocompleteLocation[];
  isLoadingOrigin: boolean;

  // Actions
  setActiveTab: (tab: SearchState["activeTab"]) => void;
  searchFlights: () => Promise<void>;
  updateFormData: (data: Partial<SearchFormData>) => void;
  setOriginSuggestions: (suggestions: AutocompleteLocation[]) => void;
  setDestinationSuggestions: (suggestions: AutocompleteLocation[]) => void;
  clearError: () => void;
}

interface TabSection {
  title: string;
  description: string;
  features: string[];
}

export interface TabInfo {
  bus: TabSection;
  car: TabSection;
  hotel: TabSection;
}

export interface SearchState {
  activeTab: "flight" | "bus" | "car" | "hotel";
}

export interface TabItem {
  id: SearchState["activeTab"];
  label: string;
  icon?: React.ComponentType<any>;
  disabled?: boolean;
}

// API Response Types
export interface AutocompleteLocation {
  code: string;
  name: string;
  type: "airport" | "city";
  country?: string;
}

// Search Form Types
export interface SearchFormData {
  origin: AutocompleteLocation | null;
  destination: AutocompleteLocation | null;
  departureDate: string;
  returnDate?: string;
  passengers: {
    ADT: number;
  };
  tripType: "one-way" | "round-trip";
  isNonStop?: boolean;
}

export interface FlightDuration {
  day: number;
  hours: number;
  minutes: number;
}

export interface FlightSegment {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDatetime: string;
  arrivalDatetime: string;
  duration: FlightDuration;
  availableSeats: number;
  class?: string;
}

export interface FareInfo {
  baseFare: number;
  tax: number;
  serviceFee: number;
  quantity: number;
}

export interface BaggageInfo {
  unit: string;
  quantity: number;
}

export interface PackageAmenity {
  code: string;
  description: string;
}

export interface ProviderPackage {
  name: string;
  amenities: PackageAmenity[];
}

export interface FlightOption {
  id: string;
  price: number;
  providerPackage: ProviderPackage;
}

export interface FlightResult {
  id: string;
  segments: FlightSegment[];
  departureDatetime: string;
  arrivalDatetime: string;
  departureAirport: string;
  arrivalAirport: string;
  duration: FlightDuration;
  fares: {
    ADT: FareInfo;
  };
  baggageInfo: {
    ADT: BaggageInfo;
  };
  viewPrice: number;
  viewBaggage: BaggageInfo;
  availableSeats: number;
  providerPackage: ProviderPackage;
  otherOptions: FlightOption[];
}

export interface FlightSearchRequest {
  departure_date: string;
  destination: string;
  origin: string;
  passengers: {
    ADT: number;
  };
}

export type FlightServiceOptions = {
  timeoutMs?: number;
  retries?: number;
  onError?: (err: unknown, meta?: any) => void;
};

export type AutocompleteResponse = {
  results: AutocompleteLocation[];
  requestId: number;
};
