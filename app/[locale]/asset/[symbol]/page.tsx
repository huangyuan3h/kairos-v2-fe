"use client";

import { useEffect, useMemo, useState } from "react";
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
import {
  getTimeseries,
  type TimeseriesPoint,
  type TimeseriesResponse,
} from "@/lib/api/market";

export default function AssetDetailPage() {
  const params = useParams<{ locale: string; symbol: string }>();
  const code = decodeURIComponent(params.symbol);
  const locale = decodeURIComponent(params.locale);

  const [data, setData] = useState<TimeseriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    getTimeseries({ code, days: 120 })
      .then((res) => {
        if (!active) return;
        setData(res);
      })
      .catch((e: unknown) => {
        if (!active) return;
        const message = e instanceof Error ? e.message : "Failed to load";
        setError(message);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [code]);

  const asset = data?.asset;
  const points = useMemo<TimeseriesPoint[]>(() => data?.points ?? [], [data]);

  return (
    <Layout locale={locale} title={code} pageName="asset" showBack>
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{code}</CardTitle>
              <CardDescription>
                {loading && "Loading..."}
                {error && <span className="text-red-600">{error}</span>}
                {!loading && !error && data && (
                  <span>
                    {data.from} → {data.to} • {data.count} points
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
              showMA={false}
              showMACD={false}
              showKDJ={false}
              height={520}
            />
          ) : null}
        </CardContent>
      </Card>
    </Layout>
  );
}
