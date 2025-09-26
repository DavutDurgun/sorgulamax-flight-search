import React from "react";
import Skeleton from "../Skeleton";

export const ComingSoonContent = () => (
  <div className="p-12 text-center animate-pulse">
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-2">
        <Skeleton className="w-8 h-8" />
      </div>
      <Skeleton className="h-6 w-48 mx-auto mb-2" />
      <Skeleton className="h-4 w-80 mx-auto mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-lg p-4 flex flex-col items-center"
          >
            <Skeleton className="w-8 h-8 mb-3" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 mt-8">
        <Skeleton className="h-6 w-32 mb-2 mx-auto" />
        <Skeleton className="h-4 w-48 mb-4 mx-auto" />
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Skeleton className="h-10 w-full sm:w-64 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-4 w-40 mx-auto mt-6" />
    </div>
  </div>
);
