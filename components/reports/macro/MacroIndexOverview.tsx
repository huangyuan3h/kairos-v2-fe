"use client";

import { MacroIndexCard } from "./MacroIndexCard";
import { macroCategories } from "./config";

export function MacroIndexOverview() {
  const allItems = macroCategories.flatMap((c) => c.items);
  const bySymbol = new Map(allItems.map((i) => [i.symbol, i] as const));
  const commoditySymbols = ["GLOBAL:WTI", "GLOBAL:GOLD", "GLOBAL:COPPER"];
  const equitiesUS = ["US:SPX", "US:NDX", "US:DOW"];
  const equitiesCN = ["CN:CSI300", "CN:SSE50", "CN:CHINEXT"];
  const ratesTop = ["US:UST10Y", "US:UST2Y", "GLOBAL:VIX"];
  const cryptoTop = ["GLOBAL:BTCUSD", "GLOBAL:ETHUSD"];

  const pick = (symbols: string[]) =>
    symbols.map((s) => bySymbol.get(s)).filter(Boolean) as typeof allItems;

  const commodityItems = pick(commoditySymbols);
  const equitiesUSItems = pick(equitiesUS);
  const equitiesCNItems = pick(equitiesCN);
  const rateItems = pick(ratesTop);
  const cryptoItems = pick(cryptoTop);

  return (
    <div className="space-y-8">
      {/* 1) Equities */}
      <section>
        <h3 className="text-lg font-semibold">Equities</h3>
        <div className="mt-4 space-y-4">
          <div>
            <div className="text-sm text-muted-foreground font-medium mb-2">
              United States
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {equitiesUSItems.map((it) => (
                <MacroIndexCard
                  key={it.symbol}
                  item={it}
                  categoryColor="violet"
                  variant="hero"
                />
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground font-medium mb-2">
              China
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {equitiesCNItems.map((it) => (
                <MacroIndexCard
                  key={it.symbol}
                  item={it}
                  categoryColor="violet"
                  variant="hero"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2) Rates */}
      <section>
        <h3 className="text-lg font-semibold">Rates & Volatility</h3>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {rateItems.map((it) => (
            <MacroIndexCard
              key={it.symbol}
              item={it}
              categoryColor="green"
              variant="kpi"
            />
          ))}
        </div>
      </section>

      {/* 3) Commodities (Futures) */}
      <section>
        <h3 className="text-lg font-semibold">Commodities</h3>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {commodityItems.map((it) => (
            <MacroIndexCard
              key={it.symbol}
              item={it}
              categoryColor="amber"
              variant="kpi"
            />
          ))}
        </div>
      </section>

      {/* 4) Crypto */}
      <section>
        <h3 className="text-lg font-semibold">Crypto</h3>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cryptoItems.map((it) => (
            <MacroIndexCard key={it.symbol} item={it} categoryColor="rose" />
          ))}
        </div>
      </section>
    </div>
  );
}
