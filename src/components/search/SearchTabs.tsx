"use client";

import React from "react";
import { useSearchStore } from "@/stores/useSearchStore";
import { Plane, BusFront, Bed, CarFront } from "lucide-react";
import { tabs } from "@/constants";

const SearchTabs = () => {
  const { activeTab, setActiveTab } = useSearchStore();

  return (
    <div className="flex items-center space-x-3 gap-6 sm:space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center justify-center  md:px-6  px-6 py-2 rounded-full cursor-pointer ${
            activeTab === tab.id
              ? "bg-primary-600 text-white shadow-md"
              : "bg-white text-gray-700"
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
