import useSWR, { SWRConfiguration } from "swr";
import { useMemo } from "react";
import { flightFetcher, FlightSearchParams } from "./fetchers/flightFetcher";

export type UseFlightSearchResult<T = any> = {
  data?: T | null;
  error?: Error | null;
  isLoading: boolean;
  mutate: () => Promise<any>;
};

const DEFAULT_SWR_OPTIONS: Partial<SWRConfiguration> = {
  revalidateOnFocus: true,
  shouldRetryOnError: true,
  revalidateOnReconnect: true,
  dedupingInterval: 10_000,
  errorRetryCount: 3,
  errorRetryInterval: 2000,
  keepPreviousData: true,
};

export function useFlightSearch(
  searchParams: FlightSearchParams | null,
  swrOptions?: SWRConfiguration
): UseFlightSearchResult {
  const key = useMemo(() => {
    if (!searchParams) {
      return null;
    }

    return ["flight-search", JSON.stringify(searchParams)];
  }, [searchParams]);

  const { data, error, isValidating, mutate } = useSWR(
    key,

    (arr: any) => {
      const jsonString = Array.isArray(arr) && arr.length > 1 ? arr[1] : null;
      const params = jsonString ? JSON.parse(jsonString) : null;
      return flightFetcher("flight-search", params);
    },

    { ...DEFAULT_SWR_OPTIONS, ...(swrOptions || {}) }
  );

  return {
    data,
    error: error ? (error as Error) : undefined,
    isLoading: Boolean(!data && !error && isValidating),
    mutate: async () => {
      return mutate();
    },
  };
}
