import { apiGet } from "./client";

export type CatalogListItem = {
  symbol: string;
  name: string;
  market: string;
  asset_type: string;
  exchange?: string;
  status?: string;
  last?: number | null;
  change?: number | null;
  changePercent?: number | null;
  open?: number | null;
  high?: number | null;
  low?: number | null;
  close?: number | null;
  volume?: number | null;
  asOfDate?: string | null;
};

export type CatalogListResponse = {
  count: number;
  items: CatalogListItem[];
  nextCursor?: string;
};

export type CatalogListParams = {
  market: string;
  assetType?: "stock" | "index" | "etf";
  q?: string;
  limit?: number;
  cursor?: string;
};

export async function fetchCatalogList(
  params: CatalogListParams
): Promise<CatalogListResponse> {
  const trimmedQuery = params.q?.trim();
  return apiGet<CatalogListResponse>("/catalog/list", {
    market: params.market,
    assetType: params.assetType,
    q: trimmedQuery && trimmedQuery.length > 0 ? trimmedQuery : undefined,
    limit: params.limit,
    cursor: params.cursor,
  });
}

