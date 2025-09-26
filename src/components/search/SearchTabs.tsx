"use client";

import React from "react";
import { useSearchStore } from "@/stores/useSearchStore";
import { Plane, BusFront, Bed, CarFront } from "lucide-react";
import { tabs } from "@/constants";

const SearchTabs = () => {
  const { activeTab, setActiveTab } = useSearchStore();

  return (
    <div className="flex items-center gap-6 sm:gap-1 ">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center justify-center px-2 md:px-6 py-2 rounded-full cursor-pointer ${
            activeTab === tab.id
              ? "bg-primary-600 text-white shadow-md"
              : "bg-white text-gray-700"
          } ${tab.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {tab.icon && <tab.icon strokeWidth={2.5} className="w-4 h-4 mr-1" />}
          <span className="font-bold text-sm/0  tracking-tighter">
            {(() => {
              const words = tab.label.split(" ");
              if (words.length === 1) return tab.label;
              return (
                <>
                  {words[0]}{" "}
                  <span className="hidden sm:inline">
                    {words.slice(1).join(" ")}
                  </span>
                </>
              );
            })()}
          </span>
        </button>
      ))}
    </div>
  );
};
export default SearchTabs;
