import {
  AutocompleteLocation,
  FlightResult,
  FlightSearchRequest,
  FlightServiceOptions,
  AutocompleteResponse,
} from "@/types";
import { ApiError } from "./errors";
import { withTimeout, normalizeKey } from "./utils";
import { airportList } from "@/mock/airportList";

export class FlightService {
  private abortControllers = new Map<string, AbortController>();
  private requestId = 0;
  private opts: Required<FlightServiceOptions>;

  constructor(options?: FlightServiceOptions) {
    this.opts = {
      timeoutMs: options?.timeoutMs ?? 10000,
      retries: options?.retries ?? 2,
      onError: options?.onError ?? (() => {}),
    };
  }

  private generateRequestId(): number {
    return ++this.requestId;
  }

  private createAbortController(key: string): AbortController {
    const abortKey = normalizeKey(key);
    this.cancelPreviousRequest(abortKey);
    const controller = new AbortController();
    this.abortControllers.set(abortKey, controller);
    return controller;
  }

  private cancelPreviousRequest(key: string): void {
    const abortKey = normalizeKey(key);
    const existingController = this.abortControllers.get(abortKey);

    if (existingController) {
      try {
        existingController.abort();
      } catch (error: any) {
        console.error("Failed to abort previous request:", error);
      }
      this.abortControllers.delete(abortKey);
    }
  }

  private clearController(key: string): void {
    const abortKey = normalizeKey(key);
    this.abortControllers.delete(abortKey);
  }

  private async request<T>(
    input: RequestInfo,
    init: RequestInit & {
      key?: string;
      timeoutMs?: number;
      retries?: number;
    } = {}
  ): Promise<T> {
    const key = init.key ?? (typeof input === "string" ? input : "");
    const controller = init.signal ? null : this.createAbortController(key);
    const signal = init.signal ?? controller?.signal;
    const { key: _k, timeoutMs, retries, ...fetchInit } = init as any;

    const attempt = async (attemptNo: number): Promise<T> => {
      try {
        const fetchPromise = fetch(input, { ...fetchInit, signal });
        const wrapped = withTimeout(
          fetchPromise.then((r) => {
            if (!r.ok)
              throw new ApiError({
                message: `API Error: ${r.status}`,
                code: `HTTP_${r.status}`,
                details: r,
              });
            return r.json() as Promise<T>;
          }),
          timeoutMs ?? this.opts.timeoutMs,
          controller ?? undefined
        );

        const data = await wrapped;
        return data;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") throw err;

        const maxRetries = retries ?? this.opts.retries;
        if (attemptNo < maxRetries) {
          const backoff = 200 * Math.pow(2, attemptNo);
          await new Promise((res) => setTimeout(res, backoff));
          return attempt(attemptNo + 1);
        }

        this.opts.onError?.(err, { input, attemptNo });
        throw err;
      } finally {
        if (controller) this.clearController(key);
      }
    };

    return attempt(0);
  }

  async getAutocompleteResults(
    term: string,
    requestId?: number
  ): Promise<AutocompleteResponse> {
    const rid = requestId ?? this.generateRequestId();

    if (!term || term.trim().length < 2) {
      return { results: [], requestId: rid };
    }

    const key = `autocomplete-${term}`;
    const controller = this.createAbortController(key);

    try {
      const params = new URLSearchParams({ term: term.trim() });
      const url = `/api/flights/autocomplete?${params.toString()}`;

      const data = await this.request<AutocompleteLocation[]>(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: controller.signal,
        key,
        timeoutMs: 5_000,
        retries: 0,
      });

      return { results: Array.isArray(data) ? data : [], requestId: rid };
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") throw err;

      console.warn("Autocomplete API error, using mock:", err);
      const fallback = await this.getMockAutocompleteResults(term, rid);
      return fallback;
    } finally {
      this.clearController(key);
    }
  }

  private async getMockAutocompleteResults(
    term: string,
    requestId: number
  ): Promise<AutocompleteResponse> {
    await new Promise((r) => setTimeout(r, 200 + Math.random() * 300));

    const results = airportList.filter(
      (item) =>
        item.name.toLowerCase().includes(term.toLowerCase()) ||
        item.code.toLowerCase().includes(term.toLowerCase())
    );

    return { results, requestId };
  }

  async searchFlights(
    searchData: FlightSearchRequest
  ): Promise<FlightResult[]> {
    const key = "flight-search";
    const controller = this.createAbortController(key);

    try {
      const res = await this.request<{ data?: any }>("/api/flights/search", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
        signal: controller.signal,
      });

      const flightList = res?.data?.flightList;
      if (flightList && Array.isArray(flightList.departure)) {
        return flightList.departure as FlightResult[];
      }

      if (Array.isArray(res)) {
        return res as unknown as FlightResult[];
      }

      return [];
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        throw err;
      }

      const apiErr = new ApiError({
        message: "Uçuş arama sırasında bir hata oluştu",
        code: "FLIGHT_SEARCH_ERROR",
        details: err,
      });
      this.opts.onError?.(apiErr, { searchData });
      throw apiErr;
    } finally {
      this.clearController(key);
    }
  }

  cancelAllRequests(): void {
    this.abortControllers.forEach((controller) => {
      try {
        controller.abort();
      } catch {}
    });
    this.abortControllers.clear();
  }
}

export const flightService = new FlightService({
  timeoutMs: 12_000,
  retries: 0,
  onError: (err, meta) => console.error("[flightService]", err, meta),
});
