"use client";

import React, { Suspense, lazy } from "react";
import { tabInfo as _tabInfo } from "@/constants";
import { useSearchStore } from "@/stores/useSearchStore";

// Lazy loaded components
const FeatureGrid = lazy(() => import("./components/FeatureGrid"));
const NewsletterSignup = lazy(() => import("./components/NewsletterSignup"));

interface ComingSoonContentProps {
  tab: string;
}

const ComingSoonContent = ({ tab }: ComingSoonContentProps) => {
  const tabInfo = _tabInfo[tab as keyof typeof _tabInfo];
  const { setActiveTab } = useSearchStore();

  return (
    <div className="p-12 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Icon */}
        <div
          className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto"
          aria-hidden
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{tabInfo.title}</h2>
          <p className="text-lg text-gray-600">{tabInfo.description}</p>
        </div>

        {/* Features */}
        {tabInfo.features.length > 0 && (
          <Suspense fallback={<div>loading features...</div>}>
            <FeatureGrid
              features={tabInfo.features}
              title={`${tabInfo.title} Özellikleri`}
            />
          </Suspense>
        )}
        {/* Newsletter Signup */}
        <Suspense fallback={<div>loading newsletter...</div>}>
          <NewsletterSignup />
        </Suspense>

        {/* Back to Flights */}
        <div className="pt-4">
          <button
            onClick={() => setActiveTab("flight")}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm cursor-pointer"
            aria-label="Uçak bileti aramaya dön"
          >
            ← Uçak bileti aramaya dön
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonContent;
