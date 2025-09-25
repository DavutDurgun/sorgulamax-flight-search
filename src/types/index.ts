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

export interface SearchState {
  activeTab: "flight" | "bus" | "car" | "hotel";
}
