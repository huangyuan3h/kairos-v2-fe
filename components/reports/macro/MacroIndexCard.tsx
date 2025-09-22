"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MiniSparkline } from "./MiniSparkline";
import * as Icons from "lucide-react";
import type { MacroItem } from "./types";

type Props = {
  item: MacroItem;
  categoryColor?: string;
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

export function MacroIndexCard({ item, categoryColor = "blue" }: Props) {
  const quote = useMemo(() => mockQuote(item.symbol), [item.symbol]);
  const isUp = quote.change >= 0;
  const Arrow = isUp ? Icons.TrendingUp : Icons.TrendingDown;
  const Icon =
    (Icons as Record<string, any>)[item.icon || "BarChart2"] ?? Icons.BarChart2;

  const colorClass = isUp
    ? `text-${categoryColor}-600`
    : `text-${categoryColor}-700`;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium truncate">
            {item.name}
          </CardTitle>
          <Badge variant="secondary" className="uppercase">
            {item.asset_type}
          </Badge>
        </div>
        <div className="mt-1 text-xs text-muted-foreground truncate">
          {item.symbol}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-semibold">
              {formatNumber(quote.price)}
            </div>
            <div
              className={cn(
                "text-sm font-medium flex items-center gap-1",
                isUp ? "text-emerald-600" : "text-rose-600"
              )}
            >
              <Arrow className="h-4 w-4" />
              {formatNumber(quote.change)}
              <span className="text-xs">({quote.changePct.toFixed(2)}%)</span>
            </div>
          </div>
          <Icon className={cn("h-5 w-5", colorClass)} />
        </div>
        <div className="mt-2">
          <MiniSparkline
            data={quote.series}
            height={40}
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
