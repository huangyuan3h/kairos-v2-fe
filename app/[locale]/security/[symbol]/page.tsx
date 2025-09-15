"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getTimeseries,
  type TimeseriesPoint,
  type TimeseriesResponse,
} from "@/lib/api/market";

export default function SecurityDetailPage() {
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
    <Layout locale={locale} title={code} pageName="security" showBack>
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
            <div className="space-y-4">
              {asset === "index" ? (
                <IndexTable points={points} />
              ) : (
                <StockTable points={points} />
              )}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Layout>
  );
}

function IndexTable({ points }: { points: TimeseriesPoint[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Close</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {points.map((p) => (
          <TableRow key={p.date}>
            <TableCell>{p.date}</TableCell>
            <TableCell className="text-right">{fmt(p.close)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function StockTable({ points }: { points: TimeseriesPoint[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Open</TableHead>
          <TableHead className="text-right">High</TableHead>
          <TableHead className="text-right">Low</TableHead>
          <TableHead className="text-right">Close</TableHead>
          <TableHead className="text-right">Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {points.map((p) => (
          <TableRow key={p.date}>
            <TableCell>{p.date}</TableCell>
            <TableCell className="text-right">{fmt(p.open)}</TableCell>
            <TableCell className="text-right">{fmt(p.high)}</TableCell>
            <TableCell className="text-right">{fmt(p.low)}</TableCell>
            <TableCell className="text-right">{fmt(p.close)}</TableCell>
            <TableCell className="text-right">{fmt(p.volume)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function fmt(n?: number) {
  if (n === undefined || n === null) return "-";
  if (typeof n !== "number") return String(n);
  return Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(n);
}
