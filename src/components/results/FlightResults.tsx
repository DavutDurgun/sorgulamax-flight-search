"use client";

import React, { Suspense } from "react";
import { Plane } from "lucide-react";
import { useSearchStore } from "@/stores/useSearchStore";
import { useFlightSearch } from "@/hooks/useFlightSearch";
import { LoadingSkeleton } from "@/components/ui/skeleton/compound";
import { ErrorMessage, EmptyState } from "@/components/ui/ErrorBoundary";
import FlightCard from "./FlightCard";

export default function FlightResultsWrapper() {
  const { formData, hasSearched } = useSearchStore();

  if (!hasSearched) return null;

  const searchParams = {
    origin: formData.origin?.code,
    destination: formData.destination?.code,
    departure_date: formData.departureDate,
    return_date: formData.returnDate,
    passengers: formData.passengers,
    tripType: formData.tripType,
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      <FlightResultsInner searchParams={searchParams} />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className="animate-spin rounded-full h-5 w-5 border-2 border-primary-500 border-t-transparent"
            aria-hidden
          />
          <span className="text-sm text-gray-600">Uçuşlar aranıyor...</span>
        </div>
      </div>
      <LoadingSkeleton.FlightResults count={4} />
    </div>
  );
}

function FlightResultsInner({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  const { data, error, isLoading, mutate } = useFlightSearch(searchParams);

  if (isLoading) return <LoadingFallback />;

  if (error) {
    return (
      <div className="animate-fade-in">
        <ErrorMessage
          message={error?.message || "Bir hata oluştu"}
          onRetry={() => mutate()}
          className="my-6"
        />
      </div>
    );
  }

  const flightList = data?.data?.flightList?.departure || [];
  const airportList = data?.data?.airportList || [];
  const airlineList = data?.data?.airlineList || [];

  if (!flightList || flightList.length === 0) {
    return (
      <div className="animate-fade-in">
        <EmptyState
          icon={Plane}
          title="Uçuş bulunamadı"
          description="Aradığınız kriterlere uygun uçuş bulunmuyor. Farklı tarih veya destinasyon deneyin."
          className="my-12"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Gidiş Uçuşları
          </h2>
          <p className="text-sm text-gray-600">
            {flightList.length} uçuş seçeneği bulundu
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="sr-only">
            Sırala
          </label>
          <select
            id="sort"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="price">En Ucuz</option>
            <option value="duration">En Kısa</option>
            <option value="departure">Kalkış Saati</option>
          </select>
        </div>
      </div>

      {/* Flight Results List */}
      <div className="space-y-3">
        {flightList.map((flight: any, index: number) => (
          <FlightCard
            key={flight.id ?? index}
            flight={flight}
            airportList={airportList}
            airlineList={airlineList}
            index={index}
          />
        ))}
      </div>

      {/* Load More Button */}
      {flightList.length > 0 && (
        <div className="text-center py-6">
          <button
            disabled
            className="px-6 py-3 border border-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
          >
            Daha fazla sonuç yükle (Yakında)
          </button>
        </div>
      )}
    </div>
  );
}
