import type { AutocompleteLocation, FlightResult } from "@/types";

/**
 * Autocomplete yardımcıları:
 * - fetchWithTimeout
 * - fetchWithRetries
 * - safeGet
 * - normalizeFlightItem
 **/

export const DEFAULT_TIMEOUT_MS = 20_000;

async function fetchWithTimeout(
  input: RequestInfo,
  init: RequestInit = {},
  timeoutMs = DEFAULT_TIMEOUT_MS
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(input, { ...init, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

export async function fetchWithRetries(
  url: string,
  init: RequestInit = {},
  opts: { retries?: number; timeoutMs?: number } = {}
) {
  const retries = opts.retries ?? 1;
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  let attempt = 0;
  let lastError: any = null;

  while (attempt <= retries) {
    try {
      const res = await fetchWithTimeout(url, init, timeoutMs);
      return res;
    } catch (err) {
      lastError = err;
      if (err instanceof DOMException && err.name === "AbortError") throw err;

      attempt++;
      const backoff = 200 * Math.pow(2, attempt - 1);
      await new Promise((r) => setTimeout(r, backoff));
    }
  }

  throw lastError;
}

export function extractArrayFromResponse(data: any): any[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data !== "object") return [];

  const possibleArrayFields = ["results", "items", "data", "locations"];
  for (const f of possibleArrayFields) {
    if (Array.isArray(data[f])) return data[f];
  }

  for (const k of Object.keys(data)) {
    if (Array.isArray(data[k])) return data[k];
  }

  return [];
}

export function mapToLocation(
  item: Record<string, any>
): AutocompleteLocation | null {
  if (!item || typeof item !== "object") return null;

  const code = String(item.code ?? item.iata ?? item.id ?? "").trim();
  const name = String(
    item.name ?? item.label ?? item.title ?? item.city ?? ""
  ).trim();
  if (!code && !name) return null;

  const country = String(
    item.country ?? item.countryCode ?? item.cc ?? ""
  ).trim();

  let type: AutocompleteLocation["type"] = "airport";
  const rawType = String(item.type ?? "").toLowerCase();
  if (rawType.includes("city")) type = "city";

  return { code, name, type, country: country || undefined };
}

/**
 * safeGet: güvenli derin erişim
 * path: dizi halinde path elemanları, negatif index desteklenmez
 */
export function safeGet<T = any>(
  obj: any,
  path: (string | number)[],
  fallback?: T
): T | undefined {
  try {
    let cur = obj;
    for (const p of path) {
      if (cur == null) return fallback;
      cur = cur[p as any];
    }
    return cur === undefined ? fallback : cur;
  } catch {
    return fallback;
  }
}

/**
 * normalizeFlightItem: upstream'den gelen ham uçuş objesini uygulama
 * içinde beklenen daha stabil bir forma çevirir
 */
export function normalizeFlightItem(raw: any): FlightResult | null {
  if (!raw || typeof raw !== "object") return null;

  try {
    const id =
      raw.id ??
      raw.flightId ??
      `${safeGet(raw, ["segments", 0, "flightNumber"], "x")}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;

    const segmentsRaw = Array.isArray(raw.segments) ? raw.segments : [];
    const segments = segmentsRaw.map((s: any) => ({
      airline: String(s.airline ?? s.carrier ?? s.airlines ?? ""),
      flightNumber: String(s.flightNumber ?? s.number ?? ""),
      departureAirport: String(
        s.departureAirport ?? s.depAirport ?? s.dep ?? ""
      ),
      arrivalAirport: String(s.arrivalAirport ?? s.arrival ?? s.arr ?? ""),
      departureDatetime: String(
        s.departureDatetime ?? s.depDatetime ?? s.depDateTime ?? ""
      ),
      arrivalDatetime: String(
        s.arrivalDatetime ?? s.arrDatetime ?? s.arrDateTime ?? ""
      ),
      class: s.class ?? "",
      duration: s.duration ?? null,
      availableSeats: Number(s.availableSeats ?? s.seats ?? 0),
    }));

    const departureDatetime = String(
      raw.departureDatetime ??
        safeGet(raw, ["segments", 0, "departureDatetime"], "")
    );
    const arrivalDatetime = String(
      raw.arrivalDatetime ??
        safeGet(raw, ["segments", segments.length - 1, "arrivalDatetime"], "")
    );
    const departureAirport = String(
      raw.departureAirport ??
        safeGet(raw, ["segments", 0, "departureAirport"], "")
    );
    const arrivalAirport = String(
      raw.arrivalAirport ??
        safeGet(raw, ["segments", segments.length - 1, "arrivalAirport"], "")
    );
    const duration = raw.duration ?? raw.totalDuration ?? null;
    const fares = raw.fares ?? raw.priceGroups ?? null;
    const baggageInfo = raw.baggageInfo ?? raw.baggage ?? null;
    const viewPrice = Number(
      raw.viewPrice ?? raw.price ?? safeGet(raw, ["fares", 0, "price"], 0) ?? 0
    );
    const viewBaggage = raw.viewBaggage ?? raw.baggageView ?? null;
    const availableSeats = Number(
      raw.availableSeats ??
        safeGet(raw, ["segments", 0, "availableSeats"], 0) ??
        0
    );
    const providerPackage = raw.providerPackage ?? raw.package ?? null;
    const otherOptions = raw.otherOptions ?? null;

    const normalized: FlightResult = {
      id,
      segments,
      departureDatetime,
      arrivalDatetime,
      departureAirport,
      arrivalAirport,
      duration,
      fares,
      baggageInfo,
      viewPrice,
      viewBaggage,
      availableSeats,
      providerPackage,
      otherOptions,
    } as FlightResult;

    return normalized;
  } catch (err) {
    console.warn("normalizeFlightItem failed:", err);
    return null;
  }
}
