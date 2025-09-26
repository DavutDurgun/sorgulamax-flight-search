import React from "react";
import Skeleton from "../Skeleton";

export const FlightResults = ({ count }: { count: number }) => (
  <div className="space-y-3">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 animate-pulse"
      >
        {/* Sol: Logo ve metinler */}
        <div className="flex flex-col gap-2 w-40">
          <div className="flex items-center">
            <Skeleton className="w-8 h-8 mb-2 rounded-lg" />
            <Skeleton className="h-3 w-10 mb-1" />
          </div>
          <Skeleton className="h-3 w-18 mb-1" />
          <Skeleton className="h-3 w-17 mb-1" />
          <Skeleton className="h-2 w-20" />
        </div>
        {/* Orta: Saatler, kodlar, aktarma */}
        <div className="flex flex-row items-center justify-center flex-1 gap-5">
          <div className="flex  flex-col  items-center gap-1">
            <Skeleton className="h-3 w-14 mb-1" />
            <Skeleton className="h-3 w-10 mb-1" />
            <Skeleton className="h-2 w-6" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="flex  flex-col  items-center gap-1">
            <Skeleton className="h-3 w-14 mb-1" />
            <Skeleton className="h-3 w-10 mb-1" />
            <Skeleton className="h-2 w-6" />
          </div>
        </div>
        {/* Sağ: Fiyat ve buton */}
        <div className="flex flex-col items-end gap-2 w-32">
          <Skeleton className="h-5 w-20 " />
          <Skeleton className="h-10 w-20 rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);
