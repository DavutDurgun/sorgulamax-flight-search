"use Client";

import React, { use, useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeftRight,
  Search,
  Users,
  PlaneTakeoff,
  PlaneLanding,
} from "lucide-react";
import { useSearchStore } from "@/stores/useSearchStore";
import { AutocompleteInput } from "../AutocompleteInput";
import { cn, getTodayString, getTomorrowString } from "@/utils";
import { ErrorMessage } from "@/components/ui/ErrorBoundary";
import { useAutocomplete } from "./hooks/useAutoComplete";
import { clear } from "console";
import DatePicker from "@/components/ui/DatePicker";

export const SearchForm = () => {
  const {
    formData,
    updateFormData,
    originSuggestions,
    destinationSuggestions,
    setOriginSuggestions,
    setDestinationSuggestions,
    searchFlights,
    isSearching,
    error,
    clearError,
  } = useSearchStore();

  // Aktarmasız uçuş checkbox'ı için state
  const isNonStop = formData.isNonStop || false;

  const handleTripTypeChange = (tripType: "one-way" | "round-trip") => {
    updateFormData({
      tripType,
      returnDate:
        tripType === "one-way"
          ? ""
          : formData.returnDate || getTomorrowString(),
    });
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      clearError();
      await searchFlights();
    },
    [clearError, searchFlights]
  );

  // useAutocomplete hook encapsulates debounce, requestId and loading state
  const { handleInput: handleOriginInput, loading: originLoading } =
    useAutocomplete({ onResults: (results) => setOriginSuggestions(results) });

  const { handleInput: handleDestinationInput, loading: destinationLoading } =
    useAutocomplete({
      onResults: (results) => setDestinationSuggestions(results),
    });

  const handleSwapLocations = useCallback(() => {
    if (formData.origin && formData.destination) {
      updateFormData({
        origin: formData.destination,
        destination: formData.origin,
      });
    }
  }, [formData.origin, formData.destination, updateFormData]);

  const isFormValid = useMemo(() => {
    return (
      !!formData.origin &&
      !!formData.destination &&
      !!formData.departureDate &&
      formData.origin.code !== formData.destination.code &&
      (formData.tripType === "one-way" || !!formData.returnDate)
    );
  }, [formData]);

  return (
    <div className="bg-gray-50 rounded-xl shadow-xl p-0 pt-12 pb-5 px-4">
      {/* Grid-based form */}
      <div className="form">
        <form onSubmit={handleSubmit} className="pb-4 ">
          <div
            className={cn(
              "grid gap-4",
              "grid-cols-1",
              "md:[grid-template-columns:50fr_28fr_22fr]",
              "lg:[grid-template-columns:41fr_22fr_13fr_13fr]"
            )}
          >
            {/* AutocompleteInputs */}
            <div
              className={cn(
                "relative bg-white rounded-lg border border-gray-200 px-3 py-2 flex items-center gap-x-2",
                "md:col-span-3",
                "lg:col-span-1"
              )}
            >
              {/* Nereden */}
              <div className="flex-1 min-w-20 bg-white">
                <div className="flex items-center leading-none">
                  <PlaneTakeoff className="w-4 h-4 text-gray-400 inline-block  mr-1" />
                  <label className="block text-sm font-medium text-gray-600">
                    Nereden
                  </label>
                </div>
                <AutocompleteInput
                  value={formData.origin}
                  onChange={(location) => updateFormData({ origin: location })}
                  placeholder="Şehir veya Havalimanı"
                  suggestions={originSuggestions}
                  onInputChange={handleOriginInput}
                  loading={originLoading}
                />
              </div>

              {/* swap */}
              <div className="flex h-full py-1 justify-start items-end">
                <button
                  type="button"
                  onClick={handleSwapLocations}
                  disabled={!formData.origin || !formData.destination}
                  className={cn(
                    "w-8 h-8 bg-white border-1 border-gray-200 rounded-full flex items-center justify-center transition-all duration-200 z-2",
                    !formData.origin || !formData.destination
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-primary-100 hover:border-primary-400 cursor-pointer"
                  )}
                  aria-label="Konumları takas et"
                >
                  <ArrowLeftRight className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Separator */}
              <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-gray-200 z-1"></div>

              {/* Nereye */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <PlaneLanding className="w-4 h-4 text-gray-400 inline-block  mr-1" />
                  <label className="block text-xs font-medium text-gray-600">
                    Nereye
                  </label>
                </div>
                <AutocompleteInput
                  value={formData.destination}
                  onChange={(location) =>
                    updateFormData({ destination: location })
                  }
                  placeholder="Şehir veya Havalimanı"
                  suggestions={destinationSuggestions}
                  onInputChange={handleDestinationInput}
                  loading={destinationLoading}
                />
              </div>
            </div>

            {/* DatePickers */}
            <div
              className={cn(
                "relative flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-2 py-2 ",
                "md:col-span-1"
              )}
            >
              <div className="flex-1 min-w-15 mr-1">
                <label className="block text-xs font-medium text-gray-600">
                  Gidiş Tarihi
                </label>
                <DatePicker
                  value={formData.departureDate}
                  onChange={(date) => updateFormData({ departureDate: date })}
                  minDate={getTodayString()}
                  placeholder="Gidiş tarihi seçin"
                />
              </div>

              {/* Separator */}
              <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-gray-200 z-1"></div>

              <div className="flex-1 min-w-0">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Dönüş Tarihi
                </label>
                <DatePicker
                  value={formData.returnDate || ""}
                  onChange={(date) => updateFormData({ returnDate: date })}
                  minDate={formData.departureDate || getTodayString()}
                  placeholder="Dönüş tarihi seçin"
                  disabled={formData.tripType === "one-way"}
                />
              </div>
            </div>

            {/* Yolcu/Sınıf */}
            <div
              className={cn(
                "flex items-center w-full rounded-lg bg-white border border-gray-200 px-2 py-2",
                "md:col-span-1"
              )}
            >
              <div className="w-full">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Yolcu / Sınıf
                </label>
                <div className="w-full flex items-center justify-between ">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-700">
                      1 Yolcu / Hepsi
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div
              className={cn(
                "flex items-center justify-center",
                "md:col-span-1",
                "lg:col-span-1"
              )}
            >
              <button
                type="submit"
                disabled={!isFormValid || isSearching}
                className={cn(
                  "flex items-center justify-center px-4 py-4 rounded-lg font-medium transition-all duration-200 w-full h-full",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2",
                  isFormValid && !isSearching
                    ? "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-md hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                )}
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Aranıyor...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    <span>Uçuş Ara</span>
                  </>
                )}
              </button>
            </div>
          </div>
          {/* Error Message */}
          {error && (
            <div className="mt-3">
              <ErrorMessage
                message={error}
                onRetry={clearError}
                variant="minimal"
              />
            </div>
          )}
        </form>
      </div>

      {/* Trip Type Selection ve Aktarmasız Checkbox */}
      <div className="flex items-center gap-6 mt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            id="tripType"
            type="radio"
            name="tripType"
            value="one-way"
            checked={formData.tripType === "one-way"}
            onChange={() => handleTripTypeChange("one-way")}
            className="form-radio accent-primary-600 w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">Tek Yön</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            id="tripType"
            type="radio"
            name="tripType"
            value="round-trip"
            checked={formData.tripType === "round-trip"}
            onChange={() => handleTripTypeChange("round-trip")}
            className="form-radio accent-primary-600 w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">Gidiş-Dönüş</span>
        </label>
        {/* Aktarmasız uçuşlar checkbox */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            id="isNonStop"
            type="checkbox"
            name="isNonStop"
            checked={isNonStop}
            onChange={(e) => updateFormData({ isNonStop: e.target.checked })}
            className="form-checkbox accent-primary-600 w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">
            Sadece aktarmasız uçuşları göster
          </span>
        </label>
      </div>
    </div>
  );
};

export default SearchForm;
