"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const MARKET_OPTIONS = [
  { value: "CN_A", label: "China A" },
  { value: "US", label: "US" },
  { value: "INDEX", label: "Index" },
  { value: "ETF", label: "ETF" },
];

const ASSET_TYPE_OPTIONS: {
  value: "stock" | "index" | "etf";
  label: string;
}[] = [
  { value: "stock", label: "Stock" },
  { value: "index", label: "Index" },
  { value: "etf", label: "ETF" },
];

export type CatalogToolbarCopy = {
  marketLabel: string;
  assetTypeLabel: string;
  placeholder: string;
  hint: string;
  actionLabel: string;
};

export const DEFAULT_TOOLBAR_COPY: CatalogToolbarCopy = {
  marketLabel: "Market Filter",
  assetTypeLabel: "Asset Type",
  placeholder: "Search symbol or name",
  hint: "Enter at least 2 characters to filter. Use the search button to jump to the stock page directly.",
  actionLabel: "Go to Symbol",
};

export type CatalogToolbarProps = {
  market: string;
  assetType: "stock" | "index" | "etf";
  query: string;
  onMarketChange: (market: string) => void;
  onAssetTypeChange: (assetType: "stock" | "index" | "etf") => void;
  onQueryChange: (value: string) => void;
  onSubmitSearch: () => void;
  className?: string;
  copy?: CatalogToolbarCopy;
};

export function CatalogToolbar({
  market,
  assetType,
  query,
  onMarketChange,
  onAssetTypeChange,
  onQueryChange,
  onSubmitSearch,
  className,
  copy = DEFAULT_TOOLBAR_COPY,
}: CatalogToolbarProps) {
  const handleEnterKey: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmitSearch();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4",
        className
      )}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {copy.marketLabel}
        </span>
        <Tabs
          value={market}
          onValueChange={onMarketChange}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full justify-between sm:w-fit">
            {MARKET_OPTIONS.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {copy.assetTypeLabel}
        </span>
        <Tabs
          value={assetType}
          onValueChange={(value) =>
            onAssetTypeChange(value as "stock" | "index" | "etf")
          }
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full justify-between sm:w-fit">
            {ASSET_TYPE_OPTIONS.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={copy.placeholder}
            onKeyDown={handleEnterKey}
            className="flex-1"
          />
          <Button
            type="button"
            variant="secondary"
            className="w-full whitespace-nowrap sm:w-auto"
            onClick={onSubmitSearch}
          >
            <Search className="mr-2 h-4 w-4" />
            {copy.actionLabel}
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground">{copy.hint}</p>
      </div>
    </div>
  );
}

