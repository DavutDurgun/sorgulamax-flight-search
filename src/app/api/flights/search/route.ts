import { NextResponse } from "next/server";
import type { FlightSearchRequest } from "@/types";
import { fetchWithRetries, normalizeFlightItem, safeGet } from "@/utils";

const UPSTREAM_URL = "https://sorgulamax.com/api/flight-ticket/get-flights";

/**
 * POST handler for flight search
 */
export async function POST(request: Request) {
  try {
    const searchData: FlightSearchRequest = await request.json();

    // Basic validation
    if (!searchData || typeof searchData !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { origin, destination, departure_date, passengers } =
      searchData as any;

    //   Required fields validation
    if (!origin || !destination || !departure_date) {
      return NextResponse.json(
        { error: "origin, destination and departure_date are required" },
        { status: 400 }
      );
    }

    const safePassengers = {
      ADT: Number(passengers?.ADT ?? 1),
      CHD: Number(passengers?.CHD ?? 0),
      INF: Number(passengers?.INF ?? 0),
    };

    console.debug("Flight search ->  payload:", {
      origin,
      destination,
      departure_date,
      passengers: safePassengers,
    });

    const res = await fetchWithRetries(UPSTREAM_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departure_date: searchData.departure_date,
        destination: searchData.destination,
        origin: searchData.origin,
        passengers: { ADT: String(searchData.passengers.ADT) },
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.warn("Upstream error:", res.status, text);
      return NextResponse.json(
        { error: "Upstream service error", status: res.status },
        { status: 502 }
      );
    }

    const raw = await res.json().catch(() => null);

    const flightsArray =
      safeGet<any[] | null>(raw, ["data", "flightList", "departure"], null) ??
      safeGet<any[] | null>(raw, ["flightList", "departure"], null) ??
      (Array.isArray(raw) ? raw : null) ??
      safeGet<any[] | null>(raw, ["data", "flights"], null) ??
      [];

    const normalizedFlights = (Array.isArray(flightsArray) ? flightsArray : [])
      .map(normalizeFlightItem)
      .filter(Boolean);

    const airportList = safeGet(
      raw,
      ["data", "airportList"],
      safeGet(raw, ["airportList"], [])
    );
    const airlineList = safeGet(
      raw,
      ["data", "airlineList"],
      safeGet(raw, ["airlineList"], [])
    );
    const searchInfo = safeGet(
      raw,
      ["data", "search"],
      safeGet(raw, ["search"], null)
    );

    const responsePayload = {
      data: {
        flightList: { departure: normalizedFlights },
        airportList: airportList ?? [],
        airlineList: airlineList ?? [],
        search: searchInfo ?? null,
      },
    };

    return NextResponse.json(responsePayload, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err: any) {
    if (err instanceof DOMException && err.name === "AbortError") {
      console.warn("Flight search request timed out/aborted:", err);
      return NextResponse.json({ error: "Request timed out" }, { status: 504 });
    }
    console.error("Flight Search API Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch flight results" },
      { status: 500 }
    );
  }
}
