export interface SearchState {
  // UI state
  activeTab: "flight" | "bus" | "car" | "hotel";

  // Actions
  setActiveTab: (tab: SearchState["activeTab"]) => void;
}

export interface TabItem {
  id: SearchState["activeTab"];
  label: string;
  icon?: React.ComponentType<any>;
  disabled?: boolean;
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
