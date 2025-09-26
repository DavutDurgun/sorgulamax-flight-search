import React from "react";
import Skeleton from "../Skeleton";

export const SearchForm = () => (
  <div className="bg-gray-50 rounded-xl shadow-xl p-0 pt-12 pb-5 px-4 animate-pulse">
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5">
      {/* Nereden */}
      <div className="flex flex-col gap-2 col-span-1">
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
      {/* Swap ve Nereye */}
      <div className="flex flex-col gap-2 col-span-1">
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
      {/* Gidiş Tarihi */}
      <div className="flex flex-col gap-2 col-span-1">
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
      {/* Dönüş Tarihi */}
      <div className="flex flex-col gap-2 col-span-1">
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
      {/* Yolcu/Sınıf */}
      <div className="flex flex-col gap-2 col-span-1">
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
      {/* Buton */}
      <div className="flex items-center justify-center col-span-1">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
    {/* Trip Type ve Aktarmasız */}
    <div className="flex items-center gap-6 mt-4">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-40" />
    </div>
  </div>
);
