// Simple market API helpers using absolute base URL to avoid dev proxy assumptions

export type CatalogItem = {
  symbol: string;
  name: string;
  exchange?: string;
  asset_type?: string;
  market?: string;
  status?: string;
};

export type CatalogResponse = {
  count: number;
  items: CatalogItem[];
};

export type TimeseriesPoint = {
  date: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
  // Additional vendor-specific fields may appear
  [key: string]: unknown;
};

export type TimeseriesResponse = {
  asset: "index" | "stock";
  code: string;
  from: string;
  to: string;
  count: number;
  points: TimeseriesPoint[];
};

const ABSOLUTE_API_BASE: string =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) ||
  "https://api.kairos-2.it-t.xyz";

export async function catalogSearch(
  input: string,
  market?: string
): Promise<CatalogResponse> {
  const url = new URL("/catalog/search", ABSOLUTE_API_BASE);
  url.searchParams.set("input", input);
  if (market) url.searchParams.set("market", market);
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Search failed: ${res.status}`);
  }
  return (await res.json()) as CatalogResponse;
}

export async function getTimeseries(params: {
  code: string;
  asset?: "index" | "stock";
  from?: string;
  to?: string;
  days?: number;
}): Promise<TimeseriesResponse> {
  const url = new URL("/timeseries", ABSOLUTE_API_BASE);
  url.searchParams.set("code", params.code);
  if (params.asset) url.searchParams.set("asset", params.asset);
  if (params.from) url.searchParams.set("from", params.from);
  if (params.to) url.searchParams.set("to", params.to);
  if (params.days && !params.from && !params.to)
    url.searchParams.set("days", String(params.days));
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Timeseries failed: ${res.status}`);
  }
  return (await res.json()) as TimeseriesResponse;
}
