"use client";

import { Fragment, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type WatchItem = {
  symbol: string;
  name: string;
};

type WatchGroup = {
  id: string;
  title: string;
  items: WatchItem[];
};

// Compact TradingView-like watchlist groups
const watchlistGroups: WatchGroup[] = [
  {
    id: "indices",
    title: "INDICES",
    items: [
      { symbol: "US:SPX", name: "SPX" },
      { symbol: "US:NDX", name: "NDQ" },
      { symbol: "US:DOW", name: "DJI" },
      { symbol: "GLOBAL:VIX", name: "VIX" },
      { symbol: "GLOBAL:DXY", name: "DXY" },
    ],
  },
  {
    id: "stocks",
    title: "STOCKS",
    items: [
      { symbol: "US:AAPL", name: "AAPL" },
      { symbol: "US:TSLA", name: "TSLA" },
      { symbol: "US:NFLX", name: "NFLX" },
    ],
  },
  {
    id: "futures",
    title: "FUTURES",
    items: [
      { symbol: "GLOBAL:WTI", name: "USOIL" },
      { symbol: "GLOBAL:GOLD", name: "GOLD" },
      { symbol: "GLOBAL:SILVER", name: "SILVER" },
    ],
  },
  {
    id: "forex",
    title: "FOREX",
    items: [
      { symbol: "FX:EURUSD", name: "EURUSD" },
      { symbol: "FX:GBPUSD", name: "GBPUSD" },
      { symbol: "FX:USDJPY", name: "USDJPY" },
    ],
  },
];

type MockQuote = {
  price: number;
  change: number;
  changePct: number;
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
  const base = 50 + rnd() * 5000;
  const changePct = (rnd() * 4 - 2) / 100; // -2% ~ +2%
  const change = base * changePct;
  const price = base + change;
  return { price, change, changePct: changePct * 100 };
}

function formatNumber(value?: number, digits = 2) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";
  try {
    return new Intl.NumberFormat(undefined, {
      maximumFractionDigits: digits,
    }).format(value);
  } catch {
    return String(value);
  }
}

export function MacroWatchlistTable() {
  const rows = useMemo(() => {
    return watchlistGroups.map((group) => ({
      group,
      quotes: new Map(
        group.items.map((it) => [it.symbol, mockQuote(it.symbol)] as const)
      ),
    }));
  }, []);

  const [openGroupIds, setOpenGroupIds] = useState<Set<string>>(
    () => new Set(watchlistGroups.map((g) => g.id))
  );

  const toggleGroup = (id: string) => {
    setOpenGroupIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Symbol</TableHead>
            <TableHead className="w-[20%] text-right">Last</TableHead>
            <TableHead className="w-[20%] text-right">Chg</TableHead>
            <TableHead className="w-[20%] text-right">Chg%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ group, quotes }) => (
            <Fragment key={group.id}>
              <TableRow
                key={group.id + "-header"}
                className="bg-muted/20 hover:bg-muted/30"
              >
                <TableCell colSpan={4} className="py-2">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                    aria-expanded={openGroupIds.has(group.id)}
                    aria-controls={`group-${group.id}`}
                  >
                    <ChevronRight
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        openGroupIds.has(group.id) ? "rotate-90" : "rotate-0"
                      )}
                    />
                    {group.title}
                  </button>
                </TableCell>
              </TableRow>
              {openGroupIds.has(group.id) &&
                group.items.map((it) => {
                  const q = quotes.get(it.symbol)!;
                  const isUp = q.change >= 0;
                  return (
                    <TableRow key={it.symbol} className="cursor-pointer">
                      <TableCell className="font-medium">{it.name}</TableCell>
                      <TableCell className="text-right">
                        {formatNumber(q.price)}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-right",
                          isUp ? "text-emerald-600" : "text-rose-600"
                        )}
                      >
                        {formatNumber(q.change)}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-right",
                          isUp ? "text-emerald-600" : "text-rose-600"
                        )}
                      >
                        {q.changePct.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  );
                })}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
