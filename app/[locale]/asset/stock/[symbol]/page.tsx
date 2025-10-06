"use client";

import { useEffect, useMemo, useReducer } from "react";
import { useParams } from "next/navigation";
import { Layout } from "@/components/layout";
import { AssetChart } from "@/components/asset";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTimeseries, type TimeseriesPoint } from "@/lib/api/market";
import { getCompany } from "@/lib/api/company";
import { reducer, initialState } from "./state/reducer";
import {
  companyError,
  companyStart,
  companySuccess,
  tsError,
  tsStart,
  tsSuccess,
} from "./state/actions";
import type { State } from "./state/types";

export default function AssetStockDetailPage() {
  const params = useParams<{ locale: string; symbol: string }>();
  const code = decodeURIComponent(params.symbol);
  const locale = decodeURIComponent(params.locale);

  const [state, dispatch] = useReducer(reducer, initialState satisfies State);

  useEffect(() => {
    let active = true;
    dispatch(tsStart());
    dispatch(companyStart());

    // Explicitly request stock timeseries for the stock route
    getTimeseries({ code, asset: "stock", days: 240 })
      .then((res) => {
        if (!active) return;
        dispatch(tsSuccess(res));
      })
      .catch((e: unknown) => {
        if (!active) return;
        const message = e instanceof Error ? e.message : "Failed to load";
        dispatch(tsError(message));
      });

    getCompany({ code })
      .then((res) => {
        if (!active) return;
        dispatch(companySuccess(res));
      })
      .catch((e: unknown) => {
        if (!active) return;
        const message = e instanceof Error ? e.message : "Failed to load";
        dispatch(companyError(message));
      });

    return () => {
      active = false;
    };
  }, [code]);

  const asset = state.timeseries?.asset;
  const points = useMemo<TimeseriesPoint[]>(
    () => state.timeseries?.points ?? [],
    [state.timeseries]
  );
  const loading = state.loadingTimeseries || state.loadingCompany;
  const error = state.errorTimeseries || state.errorCompany;

  function formatNumber(value?: number): string | null {
    if (typeof value !== "number" || Number.isNaN(value)) return null;
    try {
      return new Intl.NumberFormat(undefined, {
        maximumFractionDigits: 2,
      }).format(value);
    } catch {
      return String(value);
    }
  }

  return (
    <Layout locale={locale} title={code} pageName="asset" showBack>
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                {code}
                {state.company?.name ? (
                  <span className="ml-2 text-muted-foreground">
                    — {state.company.name}
                  </span>
                ) : null}
              </CardTitle>
              <CardDescription>
                {loading && "Loading..."}
                {error && <span className="text-red-600">{error}</span>}
                {!loading && !error && state.timeseries && (
                  <span>
                    {state.timeseries.from} → {state.timeseries.to} •{" "}
                    {state.timeseries.count} points
                  </span>
                )}
              </CardDescription>
            </div>
            <div>
              {asset && (
                <Badge variant={asset === "index" ? "secondary" : "default"}>
                  {asset === "index" ? "Index" : "Stock"}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-4">
          {!loading && !error && points.length > 0 ? (
            <AssetChart
              data={points.map((p) => ({
                date: p.date,
                open: p.open,
                high: p.high,
                low: p.low,
                close: p.close,
                volume: p.volume,
              }))}
              showMA
              showMACD
              showKDJ
              showVOL
              height={824}
              maxBars={200}
            />
          ) : null}
          {state.company ? (
            <div className="mt-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                <div>
                  <div className="text-muted-foreground">Name</div>
                  <div>{state.company.name ?? "-"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Symbol</div>
                  <div>{state.company.symbol}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">PK</div>
                  <div>{state.company.pk}</div>
                </div>
              </div>

              <div>
                <div className="mb-2 font-medium">Income</div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  <div>
                    <div className="text-muted-foreground">Revenue</div>
                    <div>{formatNumber(state.company.inc_revenue) ?? "-"}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      Operating income
                    </div>
                    <div>
                      {formatNumber(state.company.inc_operating_income) ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Pretax income</div>
                    <div>
                      {formatNumber(state.company.inc_pretax_income) ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Net income</div>
                    <div>
                      {formatNumber(state.company.inc_net_income) ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">EPS (basic)</div>
                    <div>
                      {formatNumber(state.company.inc_eps_basic) ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">EPS (diluted)</div>
                    <div>
                      {formatNumber(state.company.inc_eps_diluted) ?? "-"}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 font-medium">Balance sheet</div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  <div>
                    <div className="text-muted-foreground">Total assets</div>
                    <div>
                      {formatNumber(state.company.bs_total_assets) ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      Total liabilities
                    </div>
                    <div>
                      {formatNumber(state.company.bs_total_liabilities) ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total equity</div>
                    <div>
                      {formatNumber(state.company.bs_total_equity) ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      Additional paid-in capital
                    </div>
                    <div>
                      {formatNumber(
                        state.company.bs_additional_paid_in_capital
                      ) ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Surplus reserve</div>
                    <div>
                      {formatNumber(state.company.bs_surplus_reserve) ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      Retained earnings
                    </div>
                    <div>
                      {formatNumber(state.company.bs_retained_earnings) ?? "-"}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 font-medium">Cash flow</div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  <div>
                    <div className="text-muted-foreground">
                      Net cash from operating
                    </div>
                    <div>
                      {formatNumber(state.company.cf_net_cash_from_operating) ??
                        "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      Net cash from investing
                    </div>
                    <div>
                      {formatNumber(state.company.cf_net_cash_from_investing) ??
                        "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      Net cash from financing
                    </div>
                    <div>
                      {formatNumber(state.company.cf_net_cash_from_financing) ??
                        "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      Cash out - employees
                    </div>
                    <div>
                      {formatNumber(state.company.cf_cash_out_employees) ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      Cash out - taxes
                    </div>
                    <div>
                      {formatNumber(state.company.cf_cash_out_taxes) ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      Ending cash and equivalents
                    </div>
                    <div>
                      {formatNumber(
                        state.company.cf_ending_cash_and_equivalents
                      ) ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      Net increase in cash
                    </div>
                    <div>
                      {formatNumber(state.company.cf_net_increase_in_cash) ??
                        "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Layout>
  );
}
