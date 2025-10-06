"use client";

import { MacroIndexCard } from "./MacroIndexCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import { macroCategories } from "./config";

export function MacroIndexOverview() {
  const allItems = macroCategories.flatMap((c) => c.items);
  const bySymbol = new Map(allItems.map((i) => [i.symbol, i] as const));
  const commoditySymbols = ["GLOBAL:WTI", "GLOBAL:GOLD", "GLOBAL:COPPER"];
  const equitiesUS = ["US:SPX", "US:NDX", "US:DOW"];
  const equitiesCN = ["CN:CSI300", "CN:SSE50", "CN:CHINEXT"];
  const ratesTop = ["US:UST10Y", "US:UST2Y", "GLOBAL:VIX"];
  const cryptoTop = ["GLOBAL:BTCUSD", "GLOBAL:ETHUSD", "GLOBAL:BTC_DOM"];

  const pick = (symbols: string[]) =>
    symbols.map((s) => bySymbol.get(s)).filter(Boolean) as typeof allItems;

  const commodityItems = pick(commoditySymbols);
  const equitiesUSItems = pick(equitiesUS);
  const equitiesCNItems = pick(equitiesCN);
  const rateItems = pick(ratesTop);
  const cryptoItems = pick(cryptoTop);

  const [marketTab, setMarketTab] = useState<string>("us");
  const timerRef = useRef<number | null>(null);

  const schedule = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setMarketTab((prev) => (prev === "us" ? "cn" : "us"));
    }, 5000);
  };

  useEffect(() => {
    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleUserAction = () => {
    schedule();
  };

  return (
    <div className="space-y-8">
      {/* 1) Equities */}
      <section>
        <h3 className="text-lg font-semibold">Equities</h3>
        <div className="mt-3 w-full flex justify-center">
          <div className="w-full max-w-5xl">
            <Tabs
              value={marketTab}
              onValueChange={(v) => {
                setMarketTab(v);
                handleUserAction();
              }}
              className="w-full"
            >
              <TabsList
                className="mb-3 mx-auto"
                onMouseMove={handleUserAction}
                onClick={handleUserAction}
              >
                <TabsTrigger value="us">US</TabsTrigger>
                <TabsTrigger value="cn">CN</TabsTrigger>
              </TabsList>

              <TabsContent value="us">
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
              </TabsContent>
              <TabsContent value="cn">
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
              </TabsContent>
            </Tabs>
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
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cryptoItems.map((it) => (
            <MacroIndexCard key={it.symbol} item={it} categoryColor="rose" />
          ))}
        </div>
      </section>
    </div>
  );
}
