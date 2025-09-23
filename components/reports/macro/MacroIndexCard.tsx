"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MiniSparkline } from "./MiniSparkline";
import * as Icons from "lucide-react";
import type { MacroItem } from "./types";

type Props = {
  item: MacroItem;
  categoryColor?: string;
  variant?: "default" | "hero" | "kpi";
};

type MockQuote = {
  price: number;
  change: number;
  changePct: number;
  series: number[];
};

function seededRandom(seed: string): () => number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mockQuote(symbol: string): MockQuote {
  const rnd = seededRandom(symbol);
  const base = 50 + rnd() * 4500; // 50 ~ 4550
  const changePct = (rnd() * 4 - 2) / 100; // -2% ~ +2%
  const change = base * changePct;
  const price = base + change;
  const series: number[] = Array.from({ length: 24 }, () => 0).map(
    () => price * (0.98 + rnd() * 0.04)
  );
  return { price, change, changePct: changePct * 100, series };
}

export function MacroIndexCard({ item, variant = "default" }: Props) {
  const quote = useMemo(() => mockQuote(item.symbol), [item.symbol]);
  const isUp = quote.change >= 0;
  const Arrow = isUp ? Icons.TrendingUp : Icons.TrendingDown;
  // Decorative icon and asset-type label removed per compact design

  if (variant === "kpi") {
    return (
      <div className="rounded-xl border bg-background p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="text-sm font-medium text-muted-foreground truncate">
            {item.name}
          </div>
          <div
            className={cn(
              "flex items-center gap-1 rounded-full border px-2 py-1 text-xs",
              isUp
                ? "text-emerald-700 border-emerald-200 bg-emerald-50"
                : "text-rose-700 border-rose-200 bg-rose-50"
            )}
          >
            <Arrow className="h-3.5 w-3.5" />
            {quote.changePct.toFixed(1)}%
          </div>
        </div>
        <div className="mt-2.5 text-3xl font-semibold">
          {formatNumber(quote.price)}
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {isUp ? "Trending up this period" : "Down this period"}
        </div>
      </div>
    );
  }

  return (
    <Card
      className={cn(
        "overflow-hidden",
        variant === "hero" ? "ring-1 ring-gray-100" : undefined
      )}
    >
      <CardHeader
        className={cn(variant === "hero" ? "px-4 pt-2" : "px-4 pt-1.5")}
      >
        <div className="flex items-center justify-center">
          <CardTitle
            className={cn(
              "truncate text-center w-full",
              variant === "hero"
                ? "text-base font-semibold"
                : "text-sm font-medium"
            )}
          >
            {item.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent
        className={cn("pt-0 px-4", variant === "hero" ? "pb-1.5" : "pb-1")}
      >
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                variant === "hero" ? "text-2xl" : "text-xl",
                "font-semibold"
              )}
            >
              {formatNumber(quote.price)}
            </div>
            <div
              className={cn(
                "text-sm font-medium flex items-center gap-1",
                isUp ? "text-emerald-600" : "text-rose-600"
              )}
            >
              <Arrow className="h-3.5 w-3.5" />
              {formatNumber(quote.change)}
              <span className="text-xs">({quote.changePct.toFixed(2)}%)</span>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "mx-auto",
            "w-40",
            variant === "hero" ? "mt-1.5" : "mt-1"
          )}
        >
          <MiniSparkline
            data={quote.series}
            height={variant === "hero" ? 44 : 36}
            stroke={isUp ? "#059669" : "#e11d48"}
            fill={isUp ? "#059669" : "#e11d48"}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function formatNumber(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";
  try {
    return new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return String(value);
  }
}
