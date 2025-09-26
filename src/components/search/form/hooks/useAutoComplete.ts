"use client";

import { useCallback, useRef, useState } from "react";
import { debounce } from "@/utils/general";
import { flightService } from "@/services/flightService";
import type { AutocompleteLocation } from "@/types";

export function useAutocomplete({
  onResults,
  debounceMs = 350,
}: {
  onResults: (r: AutocompleteLocation[]) => void;
  debounceMs?: number;
}) {
  const requestIdRef = useRef(0);
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(
    async (term: string) => {
      if (!term || term.trim().length < 2) {
        onResults([]);
        return;
      }

      const rid = ++requestIdRef.current;
      setLoading(true);

      try {
        const res = await flightService.getAutocompleteResults(term, rid);

        // only apply latest
        if (res.requestId === requestIdRef.current) {
          onResults(res.results);
        }
      } catch (err: any) {
        if (err instanceof DOMException && err.name === "AbortError") {
          // ignore aborted requests
          return;
        }

        console.error("Autocomplete error:", err);
        onResults([]);
      } finally {
        setLoading(false);
      }
    },
    [onResults]
  );

  // debounce wrapper (stable ref)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInput = useCallback(
    debounce((term: string) => void doSearch(term), debounceMs),
    [doSearch]
  );

  return { handleInput, loading } as const;
}
