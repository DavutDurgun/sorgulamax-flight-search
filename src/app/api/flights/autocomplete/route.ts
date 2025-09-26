import { NextResponse } from "next/server";
import {
  fetchWithRetries,
  extractArrayFromResponse,
  mapToLocation,
} from "@/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = (searchParams.get("term") ?? "").trim();

  if (!term) {
    return NextResponse.json({ error: "Term is required" }, { status: 400 });
  }
  if (term.length > 80) {
    return NextResponse.json({ error: "Term too long" }, { status: 400 });
  }

  const upstreamUrl = `https://sorgulamax.com/api/autocomplete/flight-ticket?term=${encodeURIComponent(
    term
  )}`;

  try {
    const res = await fetchWithRetries(
      upstreamUrl,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      },
      { retries: 1, timeoutMs: 5000 }
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.warn("Upstream not ok", res.status, text);
      return NextResponse.json(
        { error: "Upstream service error", status: res.status },
        { status: 502 }
      );
    }

    const raw = await res.json().catch(() => null);
    const arr = extractArrayFromResponse(raw);

    const mapped = arr
      .map(mapToLocation)
      .filter(Boolean)
      .reduce<any[]>((acc, cur) => {
        if (!cur) return acc;
        const exists = acc.find(
          (x) => x.code === cur.code && x.name === cur.name
        );
        if (!exists) acc.push(cur);
        return acc;
      }, []);

    return NextResponse.json(mapped, {
      status: 200,
      headers: {
        "Cache-Control": "max-age=60, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (err: any) {
    if (err instanceof DOMException && err.name === "AbortError") {
      console.warn("autocomplete: timeout/abort", { term });
      return NextResponse.json({ error: "Request timed out" }, { status: 504 });
    }
    console.error("autocomplete: unexpected", err);
    return NextResponse.json(
      { error: "Failed to fetch autocomplete results" },
      { status: 500 }
    );
  }
}
