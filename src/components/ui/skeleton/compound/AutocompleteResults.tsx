import React from "react";
import Skeleton from "../Skeleton";

export const AutocompleteResults = () => (
  <div className="space-y-2 p-2">
    {[...Array(2)].map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-3 px-4 py-3 bg-primary-50 rounded-lg"
      >
        <Skeleton className="w-5 h-5" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-4 w-32 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-5 w-12 rounded bg-gray-200" />
      </div>
    ))}
  </div>
);
