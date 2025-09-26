export type FlightSearchParams = Record<string, any>;

async function fetchWithTimeout(
  input: RequestInfo,
  init: RequestInit = {},
  timeoutMs = 20000
) {
  const controller = new AbortController();
  const signal = controller.signal;
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(input, { ...init, signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

/**
 * SWR fetcher for flight search.
 * Usage in useSWR: useSWR(['flight-search', params], flightFetcher)
 */
export async function flightFetcher(key: string, params: FlightSearchParams) {
  if (!params) {
    return null;
  }

  const body = JSON.stringify(params);

  const res = await fetchWithTimeout(
    "/api/flights/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    },
    20000
  );

  if (!res.ok) {
    const text = await res.text().catch(() => null);
    const err = new Error(
      `Uçuşlar getirilemedi (${res.status})${text ? `: ${text}` : ""}`
    );

    (err as any).status = res.status;
    throw err;
  }

  const json = await res.json();
  return json;
}
