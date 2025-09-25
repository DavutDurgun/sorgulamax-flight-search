"use client";

import React from "react";
import { useSearchStore } from "@/stores/useSearchStore";
import { Plane, BusFront, Bed, CarFront } from "lucide-react";
import { tabs } from "@/constants";

const SearchTabs = () => {
  const { activeTab, setActiveTab } = useSearchStore();

  return (
    <div className="flex items-center space-x-3 sm:space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center md:px-6  px-2 py-2 rounded-full ${
            activeTab === tab.id
              ? "bg-primary-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } ${tab.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {tab.icon && <tab.icon strokeWidth={2.5} className="w-4 h-4 mr-1" />}
          <span className="font-bold text-sm/0  tracking-tighter">
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};
export default SearchTabs;
