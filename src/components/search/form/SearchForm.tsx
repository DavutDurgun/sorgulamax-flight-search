"use Client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchStore } from "@/stores/useSearchStore";
import { ErrorMessage } from "@/components/ui/ErrorBoundary";

export const SearchForm = () => {
  const { searchFlights } = useSearchStore();

  useEffect(() => {
    searchFlights();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Flights</h1>
    </div>
  );
};

export default SearchForm;
