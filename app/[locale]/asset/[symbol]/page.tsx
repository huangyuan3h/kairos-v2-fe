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

export default function AssetDetailPage() {
  const params = useParams<{ locale: string; symbol: string }>();
  const code = decodeURIComponent(params.symbol);
  const locale = decodeURIComponent(params.locale);

  const [state, dispatch] = useReducer(reducer, initialState satisfies State);

  useEffect(() => {
    let active = true;
    dispatch(tsStart());
    dispatch(companyStart());

    getTimeseries({ code, days: 240 })
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
          {state.company ? (
            <div className="mb-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
              <div>
                <div className="text-muted-foreground">Name</div>
                <div>{state.company.name ?? "-"}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Score</div>
                <div>{formatNumber(state.company.score) ?? "-"}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Revenue</div>
                <div>{formatNumber(state.company.inc_revenue) ?? "-"}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Net income</div>
                <div>{formatNumber(state.company.inc_net_income) ?? "-"}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Total assets</div>
                <div>{formatNumber(state.company.bs_total_assets) ?? "-"}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Total equity</div>
                <div>{formatNumber(state.company.bs_total_equity) ?? "-"}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Operating cash flow</div>
                <div>
                  {formatNumber(state.company.cf_net_cash_from_operating) ??
                    "-"}
                </div>
              </div>
            </div>
          ) : null}
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
        </CardContent>
      </Card>
    </Layout>
  );
}
