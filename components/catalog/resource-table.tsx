"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CatalogToolbar,
  CatalogToolbarCopy,
  DEFAULT_TOOLBAR_COPY,
} from "./catalog-toolbar";
import { useCatalogList } from "@/lib/hooks/useCatalogList";
import {
  formatAsOfDate,
  formatChange,
  formatPercent,
  formatPrice,
  formatVolume,
} from "@/lib/utils/formatters";
import { ArrowUpRight, Loader2 } from "lucide-react";

export type ResourceCatalogCopy = {
  title: string;
  description: string;
  toolbar: CatalogToolbarCopy;
  table: {
    resourcesLabel: string;
    subtitle: string;
    headers: {
      symbol: string;
      name: string;
      market: string;
      type: string;
      status: string;
      last: string;
      change: string;
      changePercent: string;
      volume: string;
      asOf: string;
    };
    empty: string;
    loadedPrefix: string;
    loadedSuffix: string;
    loadMore: string;
    noMore: string;
    refresh: string;
    errorPrefix: string;
  };
};

const DEFAULT_COPY: ResourceCatalogCopy = {
  title: "Resource Catalog",
  description: "Browse cross-market listings with live quotes and snapshots.",
  toolbar: DEFAULT_TOOLBAR_COPY,
  table: {
    resourcesLabel: "resources",
    subtitle: "Showing real-time quotes merged from market snapshot",
    headers: {
      symbol: "Symbol",
      name: "Name",
      market: "Market",
      type: "Type",
      status: "Status",
      last: "Last",
      change: "Change",
      changePercent: "% Change",
      volume: "Volume",
      asOf: "As of",
    },
    empty: "No results found. Adjust filters or try another keyword.",
    loadedPrefix: "Loaded",
    loadedSuffix: "rows",
    loadMore: "Load more",
    noMore: "No more data",
    refresh: "Refresh",
    errorPrefix: "Failed to load catalog",
  },
};

type ResourceCatalogViewProps = {
  locale: string;
  copy?: ResourceCatalogCopy;
};

function normalizeSymbolInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.includes("/")) {
    const segments = trimmed.split("/").filter(Boolean);
    return segments[segments.length - 1]?.toUpperCase() ?? "";
  }
  return trimmed.toUpperCase();
}

export function ResourceCatalogView({
  locale,
  copy = DEFAULT_COPY,
}: ResourceCatalogViewProps) {
  const router = useRouter();
  const [market, setMarket] = useState("CN_A");
  const [assetType, setAssetType] = useState<"stock" | "index" | "etf">(
    "stock"
  );
  const [query, setQuery] = useState("");

  const {
    items,
    count,
    hasMore,
    isLoadingInitial,
    isLoadingMore,
    isEmpty,
    error,
    loadMore,
    refresh,
  } = useCatalogList({
    market,
    assetType,
    query,
  });

  const handleNavigate = () => {
    const normalized = normalizeSymbolInput(query);
    if (!normalized) return;
    router.push(`/${locale}/asset/stock/${normalized}`);
  };

  const tableRows = useMemo(() => {
    if (isLoadingInitial) {
      return Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={`placeholder-${index}`}>
          <TableCell colSpan={10}>
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
          </TableCell>
        </TableRow>
      ));
    }

    if (isEmpty) {
      return (
        <TableRow>
          <TableCell colSpan={10} className="py-10 text-center text-sm">
            {copy.table.empty}
          </TableCell>
        </TableRow>
      );
    }

    return items.map((item) => {
      const normalizedAssetType = (item.asset_type || "stock").toLowerCase();
      const changeValue = item.change ?? null;
      const changePercentValue = item.changePercent ?? null;
      const changeClass =
        changeValue === null
          ? "text-muted-foreground"
          : changeValue >= 0
          ? "text-green-600"
          : "text-red-600";
      const changePercentClass =
        changePercentValue === null
          ? "text-muted-foreground"
          : changePercentValue >= 0
          ? "text-green-600"
          : "text-red-600";
      return (
        <TableRow
          key={`${item.symbol}-${item.market}`}
          className="cursor-pointer transition hover:bg-muted/30"
          onClick={() =>
            router.push(
              `/${locale}/asset/${normalizedAssetType}/${item.symbol}`
            )
          }
        >
          <TableCell className="font-medium">{item.symbol}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.market}</TableCell>
          <TableCell className="uppercase">{normalizedAssetType}</TableCell>
          <TableCell>
            {item.status ? (
              <Badge variant="secondary" className="uppercase">
                {item.status}
              </Badge>
            ) : (
              "-"
            )}
          </TableCell>
          <TableCell className="text-right">{formatPrice(item.last)}</TableCell>
          <TableCell className={`text-right ${changeClass}`}>
            {formatChange(item.change)}
          </TableCell>
          <TableCell className={`text-right ${changePercentClass}`}>
            {formatPercent(item.changePercent)}
          </TableCell>
          <TableCell className="text-right">
            {formatVolume(item.volume)}
          </TableCell>
          <TableCell className="text-right text-muted-foreground">
            {formatAsOfDate(item.asOfDate)}
          </TableCell>
        </TableRow>
      );
    });
  }, [copy, isEmpty, isLoadingInitial, items, locale, router]);

  return (
    <div className="space-y-4">
      <CatalogToolbar
        market={market}
        assetType={assetType}
        query={query}
        onMarketChange={setMarket}
        onAssetTypeChange={setAssetType}
        onQueryChange={setQuery}
        onSubmitSearch={handleNavigate}
        copy={copy.toolbar}
      />

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-gray-100 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">
              {count.toLocaleString()} {copy.table.resourcesLabel}
            </p>
            <p className="text-sm text-muted-foreground">
              {copy.table.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refresh()}
              disabled={isLoadingInitial || isLoadingMore}
            >
              {isLoadingInitial || isLoadingMore ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowUpRight className="mr-2 h-4 w-4" />
              )}
              {copy.table.refresh}
            </Button>
          </div>
        </div>

        {error && (
          <div className="border-b border-destructive/20 bg-destructive/5 px-4 py-2 text-sm text-destructive">
            {copy.table.errorPrefix}: {error.message} (HTTP{" "}
            {error.status || 0})
          </div>
        )}

        <div className="overflow-x-auto px-3 py-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{copy.table.headers.symbol}</TableHead>
                <TableHead>{copy.table.headers.name}</TableHead>
                <TableHead>{copy.table.headers.market}</TableHead>
                <TableHead>{copy.table.headers.type}</TableHead>
                <TableHead>{copy.table.headers.status}</TableHead>
                <TableHead className="text-right">
                  {copy.table.headers.last}
                </TableHead>
                <TableHead className="text-right">
                  {copy.table.headers.change}
                </TableHead>
                <TableHead className="text-right">
                  {copy.table.headers.changePercent}
                </TableHead>
                <TableHead className="text-right">
                  {copy.table.headers.volume}
                </TableHead>
                <TableHead className="text-right">
                  {copy.table.headers.asOf}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
          <p className="text-sm text-muted-foreground">
            {copy.table.loadedPrefix} {items.length.toLocaleString()}{" "}
            {copy.table.loadedSuffix}
          </p>
          <Button
            onClick={() => loadMore()}
            disabled={!hasMore || isLoadingMore}
            variant="secondary"
          >
            {isLoadingMore && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {hasMore ? copy.table.loadMore : copy.table.noMore}
          </Button>
        </div>
      </div>
    </div>
  );
}

