"use client";

import {
  Fragment,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
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
import { getSnapshot, type SnapshotItem } from "@/lib/api/market";

type MacroWatchlistTableProps = {
  locale?: string;
};

type WatchItem = {
  symbol: string;
  name: string;
  description: string;
};

type WatchGroup = {
  id: string;
  title: string;
  items: WatchItem[];
};

const watchlistGroups: WatchGroup[] = [
  {
    id: "us-indices",
    title: "美国核心指数",
    items: [
      { symbol: "US:SPX", name: "SPX", description: "标普500" },
      { symbol: "US:NDX", name: "NDX", description: "纳斯达克100" },
      { symbol: "US:RUT", name: "RUT", description: "罗素2000" },
    ],
  },
  {
    id: "cn-indices",
    title: "中国核心指数",
    items: [
      { symbol: "CN:CSI300", name: "CSI300", description: "沪深300" },
      { symbol: "CN:SHCOMP", name: "SHCOMP", description: "上证综指" },
      { symbol: "CN:CSI500", name: "CSI500", description: "中证500" },
    ],
  },
  {
    id: "us-etf",
    title: "美国宽基 ETF",
    items: [
      { symbol: "US:SPY", name: "SPY", description: "SPDR S&P 500" },
      { symbol: "US:QQQ", name: "QQQ", description: "Invesco QQQ" },
      { symbol: "US:IWM", name: "IWM", description: "iShares Russell 2000" },
    ],
  },
  {
    id: "macro-commodities",
    title: "宏观与大宗商品",
    items: [
      { symbol: "GLOBAL:DXY", name: "DXY", description: "美元指数" },
      { symbol: "GLOBAL:WTI", name: "WTI", description: "WTI 原油" },
      { symbol: "GLOBAL:GOLD", name: "GOLD", description: "现货黄金" },
      { symbol: "GLOBAL:MOVE", name: "MOVE", description: "美债波动率" },
    ],
  },
  {
    id: "volatility",
    title: "波动率指标",
    items: [{ symbol: "GLOBAL:VIX", name: "VIX", description: "芝加哥波动率" }],
  },
];

export function MacroWatchlistTable({
  locale = "en",
}: MacroWatchlistTableProps) {
  const router = useRouter();
  const [openGroupIds, setOpenGroupIds] = useState<Set<string>>(
    () => new Set(watchlistGroups.map((g) => g.id))
  );
  const [quotes, setQuotes] = useState<Map<string, SnapshotItem>>(
    () => new Map()
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshId, setRefreshId] = useState(0);

  const symbols = useMemo(
    () =>
      watchlistGroups.flatMap((group) =>
        group.items.map((item) => item.symbol)
      ),
    []
  );

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getSnapshot(symbols)
      .then((response) => {
        if (!active) return;
        const next = new Map<string, SnapshotItem>();
        response.items.forEach((item) => {
          next.set(item.symbol.toUpperCase(), item);
        });
        setQuotes(next);
      })
      .catch((err: unknown) => {
        if (!active) return;
        const message =
          err instanceof Error ? err.message : "Failed to load market snapshot";
        setError(message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [symbols, refreshId]);

  const toggleGroup = useCallback((id: string) => {
    setOpenGroupIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleRetry = useCallback(() => {
    setRefreshId((id) => id + 1);
  }, []);

  const navigateToSymbol = useCallback(
    (symbol: string, type: SnapshotItem["type"] | undefined) => {
      const href = resolveAssetHref(symbol, type, locale);
      router.push(href);
    },
    [router, locale]
  );

  const isZh = locale.startsWith("zh");
  const loadingMessage = isZh ? "正在加载最新行情…" : "Loading latest quotes…";
  const emptyErrorMessage = isZh
    ? "无法获取行情数据。"
    : "Unable to load market data.";
  const refreshErrorMessage = isZh
    ? "行情刷新失败"
    : "Failed to refresh quotes";
  const retryLabel = isZh ? "重试" : "Retry";

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
          {loading && quotes.size === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-6 text-center text-sm text-muted-foreground"
              >
                {loadingMessage}
              </TableCell>
            </TableRow>
          )}

          {error && quotes.size === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-6 text-center text-sm text-rose-600"
              >
                {emptyErrorMessage}
                <button
                  type="button"
                  onClick={handleRetry}
                  className="ml-2 text-xs font-medium text-primary hover:underline"
                >
                  {retryLabel}
                </button>
              </TableCell>
            </TableRow>
          )}

          {error && quotes.size > 0 && (
            <TableRow>
              <TableCell colSpan={4} className="py-2 text-xs text-rose-600">
                {refreshErrorMessage}：{error}
                <button
                  type="button"
                  onClick={handleRetry}
                  className="ml-2 text-xs font-medium text-primary hover:underline"
                >
                  {retryLabel}
                </button>
              </TableCell>
            </TableRow>
          )}

          {watchlistGroups.map((group) => {
            const groupContentId = `group-${group.id}`;
            const isGroupOpen = openGroupIds.has(group.id);

            return (
              <Fragment key={group.id}>
                <TableRow className="bg-muted/20 hover:bg-muted/30">
                  <TableCell colSpan={4} className="py-2">
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground"
                      aria-expanded={isGroupOpen}
                      aria-controls={groupContentId}
                    >
                      <ChevronRight
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          isGroupOpen ? "rotate-90" : "rotate-0"
                        )}
                      />
                      {group.title}
                    </button>
                  </TableCell>
                </TableRow>

                {isGroupOpen &&
                  group.items.map((item) => {
                    const symbolKey = item.symbol.toUpperCase();
                    const quote = quotes.get(symbolKey);
                    const change = quote?.chg ?? null;
                    const changePct = quote?.chgPercent ?? null;
                    const lastDisplay =
                      quote?.last != null ? formatNumber(quote.last) : "-";
                    const changeDisplay = formatSigned(change);
                    const changePctDisplay =
                      typeof changePct === "number"
                        ? `${formatSigned(changePct)}%`
                        : "-";
                    const changeClass = getDeltaClass(change);
                    const pctClass = getDeltaClass(changePct);
                    const typeLabel = formatType(quote?.type, locale);

                    const handleKeyDown = (
                      event: KeyboardEvent<HTMLTableRowElement>
                    ) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigateToSymbol(item.symbol, quote?.type);
                      }
                    };

                    return (
                      <TableRow
                        key={item.symbol}
                        className="cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          navigateToSymbol(item.symbol, quote?.type)
                        }
                        onKeyDown={handleKeyDown}
                        data-symbol={item.symbol}
                        id={`${groupContentId}-${item.symbol}`}
                      >
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {item.description}
                            </span>
                            {typeLabel ? (
                              <span className="text-[11px] uppercase text-muted-foreground/80">
                                {typeLabel}
                              </span>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {lastDisplay}
                        </TableCell>
                        <TableCell className={cn("text-right", changeClass)}>
                          {changeDisplay}
                        </TableCell>
                        <TableCell className={cn("text-right", pctClass)}>
                          {changePctDisplay}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function formatNumber(value?: number, digits = 2) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";
  try {
    return new Intl.NumberFormat(undefined, {
      maximumFractionDigits: digits,
      minimumFractionDigits: value < 100 ? 2 : 0,
    }).format(value);
  } catch {
    return String(value);
  }
}

function formatSigned(value?: number | null, digits = 2) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";
  const absValue = Math.abs(value);
  const formatted = formatNumber(absValue, digits);
  if (value > 0) return `+${formatted}`;
  if (value < 0) return `-${formatted}`;
  return formatted;
}

function getDeltaClass(value?: number | null) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "text-muted-foreground";
  }
  if (value > 0) return "text-emerald-600";
  if (value < 0) return "text-rose-600";
  return "text-muted-foreground";
}

function formatType(type: SnapshotItem["type"] | undefined, locale = "en") {
  if (!type || type === "unknown") return "";
  const isZh = locale.startsWith("zh");
  if (type === "index") return isZh ? "指数" : "Index";
  if (type === "stock") return isZh ? "股票" : "Stock";
  return "";
}

function resolveAssetHref(
  symbol: string,
  type: SnapshotItem["type"] | undefined,
  locale: string
) {
  const encoded = encodeURIComponent(symbol);
  if (type === "stock") {
    return `/${locale}/asset/stock/${encoded}`;
  }
  if (type === "index") {
    return `/${locale}/asset/index/${encoded}`;
  }
  if (symbol.includes(":")) {
    return `/${locale}/asset/index/${encoded}`;
  }
  return `/${locale}/asset/stock/${encoded}`;
}
