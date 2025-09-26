"use client";

import { useSearchStore } from "@/stores/useSearchStore";
import React, { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import SearchForm from "./form/SearchForm";
import FlightResults from "../results/FlightResults";
import { LoadingSkeleton } from "@/components/ui/skeleton/compound";

const SearchTabs = lazy(() => import("./SearchTabs"));
const ComingSoonContent = lazy(() => import("./ComingSoonContent"));

const SearchContainer = () => {
  const { activeTab } = useSearchStore();

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-16">
      {/* Search Sections */}
      <div className="relative bg-white rounded-xl shadow-lg">
        <ErrorBoundary
          key={activeTab}
          fallback={
            <div className="p-8 text-center text-red-700">
              Bir hata oluştu.
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
                >
                  Yeniden Dene
                </button>
              </div>
            </div>
          }
        >
          <div className="absolute w-full top-[-30px] left-0 flex justify-center">
            <div className="bg-white px-1.5 py-1.5 rounded-full shadow-md border border-gray-200">
              <SearchTabs />
            </div>
          </div>

          <Suspense
            fallback={
              activeTab === "flight" ? (
                <LoadingSkeleton.SearchForm />
              ) : (
                <LoadingSkeleton.ComingSoonContent />
              )
            }
          >
            {activeTab === "flight" ? (
              <SearchForm />
            ) : (
              <ComingSoonContent tab={activeTab} />
            )}
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Result Sections */}
      {activeTab === "flight" && (
        <div className="mt-8">
          <ErrorBoundary
            key={`results-${activeTab}`}
            fallback={
              <div className="p-6 text-center text-red-700">
                Sonuçlar yüklenirken bir hata oluştu.
                <div className="mt-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
                  >
                    Tekrar Yükle
                  </button>
                </div>
              </div>
            }
          >
            <Suspense fallback={<LoadingSkeleton.FlightResults count={4} />}>
              <FlightResults />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
