"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MARKET_OPTIONS = [
  { value: "CN_A", label: "China A" },
  { value: "US", label: "US" },
];

const ASSET_TYPE_OPTIONS: {
  value: "stock" | "index";
  label: string;
}[] = [
  { value: "stock", label: "Stock" },
  { value: "index", label: "Index / ETF" },
];

export type CatalogToolbarCopy = {
  marketLabel: string;
  assetTypeLabel: string;
  placeholder: string;
  hint: string;
  actionLabel: string;
};

export const DEFAULT_TOOLBAR_COPY: CatalogToolbarCopy = {
  marketLabel: "Market",
  assetTypeLabel: "Asset",
  placeholder: "Search symbol or name",
  hint: "Enter at least 2 characters to filter. Use the search button to jump to the stock page directly.",
  actionLabel: "Search",
};

export type CatalogToolbarProps = {
  market: string;
  assetType: "stock" | "index";
  query: string;
  onMarketChange: (market: string) => void;
  onAssetTypeChange: (assetType: "stock" | "index") => void;
  onQueryChange: (value: string) => void;
  onSubmitSearch: () => void;
  className?: string;
  copy?: CatalogToolbarCopy;
  inlineSearch?: boolean;
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
  inlineSearch = false,
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
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {copy.marketLabel}
        </span>
        <Tabs
          value={market}
          onValueChange={onMarketChange}
          className="w-full md:w-auto"
        >
          <TabsList className="w-full justify-between md:w-fit">
            {MARKET_OPTIONS.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {copy.assetTypeLabel}
        </span>
        <Tabs
          value={assetType}
          onValueChange={(value) =>
            onAssetTypeChange(value as "stock" | "index")
          }
          className="w-full md:w-auto"
        >
          <TabsList className="w-full justify-between md:w-fit">
            {ASSET_TYPE_OPTIONS.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {inlineSearch ? null : (
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
      )}
    </div>
  );
}

export function CatalogSearchInline({
  query,
  onQueryChange,
  onSubmitSearch,
  copy = DEFAULT_TOOLBAR_COPY,
  className,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmitSearch: () => void;
  copy?: CatalogToolbarCopy;
  className?: string;
}) {
  const [showHint, setShowHint] = useState(false);

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
        "flex flex-col gap-2 md:flex-row md:items-center md:justify-end md:gap-3",
        className
      )}
    >
      <TooltipProvider delayDuration={0}>
        <Tooltip open={showHint}>
          <TooltipTrigger asChild>
            <Input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={copy.placeholder}
              onKeyDown={handleEnterKey}
              className="w-full md:w-72"
              onFocus={() => setShowHint(true)}
              onBlur={() => setShowHint(false)}
            />
          </TooltipTrigger>
          <TooltipContent side="top">{copy.hint}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        type="button"
        variant="secondary"
        className="w-full whitespace-nowrap md:w-auto"
        onClick={onSubmitSearch}
      >
        <Search className="mr-2 h-4 w-4" />
        {copy.actionLabel}
      </Button>
    </div>
  );
}

