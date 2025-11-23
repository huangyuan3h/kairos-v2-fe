"use client";

import { useCallback, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import {
  CatalogListItem,
  CatalogListResponse,
  fetchCatalogList,
} from "../api/catalog";
import { ApiError } from "../api/client";

const DEFAULT_LIMIT = 20;
const MIN_QUERY_LENGTH = 2;

export type UseCatalogListParams = {
  market: string;
  assetType?: "stock" | "index" | "etf";
  query?: string;
  limit?: number;
};

export function useCatalogList(params: UseCatalogListParams) {
  const { market, assetType = "stock", limit = DEFAULT_LIMIT } = params;
  const normalizedQuery =
    params.query && params.query.trim().length >= MIN_QUERY_LENGTH
      ? params.query.trim()
      : undefined;

  const shouldFetch = Boolean(market);

  const getKey = (
    pageIndex: number,
    previousPageData: CatalogListResponse | null
  ) => {
    if (!shouldFetch) return null;
    if (pageIndex > 0 && !previousPageData?.nextCursor) return null;
    const cursor = pageIndex === 0 ? undefined : previousPageData?.nextCursor;
    return [
      "catalog-list",
      market,
      assetType,
      normalizedQuery ?? "",
      limit,
      cursor ?? "",
    ] as const;
  };

  const swr = useSWRInfinite<CatalogListResponse, ApiError>(
    getKey,
    (key) => {
      const [, marketKey, assetTypeKey, queryKey, limitKey, cursorKey] = key;
      return fetchCatalogList({
        market: marketKey,
        assetType: assetTypeKey as "stock" | "index" | "etf",
        q: queryKey || undefined,
        limit: limitKey,
        cursor: cursorKey || undefined,
      });
    },
    {
      revalidateFirstPage: true,
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const { data, error, size, setSize, isLoading, isValidating, mutate } = swr;

  const items = useMemo<CatalogListItem[]>(() => {
    if (!data) return [];
    return data.flatMap((page) => page.items);
  }, [data]);

  const lastPage = data?.[data.length - 1];
  const hasMore = Boolean(lastPage?.nextCursor);
  const isLoadingMore =
    isLoading ||
    (size > 0 && Boolean(data) && typeof data?.[size - 1] === "undefined");
  const isEmpty = !isLoading && items.length === 0;

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    return setSize((current) => current + 1);
  }, [hasMore, setSize]);

  const refresh = useCallback(() => mutate(), [mutate]);

  return {
    items,
    count: data?.[0]?.count ?? 0,
    hasMore,
    isLoadingInitial: !data && isLoading,
    isLoadingMore,
    isValidating,
    isEmpty,
    error,
    loadMore,
    refresh,
  };
}

