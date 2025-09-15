"use client";

import { useEffect, useRef } from "react";
import { init, dispose, type KLineData, type Chart } from "klinecharts";

export type OhlcPoint = {
  date: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
};

type AssetChartProps = {
  data: OhlcPoint[];
  showMA?: boolean; // optional overlay, default off for clean main view
  maPeriods?: number[];
  showMACD?: boolean; // disabled by default
  showKDJ?: boolean; // disabled by default
  height?: number;
  maxBars?: number; // only render last N candles
};

/**
 * Renders a financial chart using klinecharts with optional indicators.
 * By default, it shows MA(5/10/20), MACD and KDJ.
 */
export function AssetChart({
  data,
  showMA = false,
  maPeriods = [5, 10, 20],
  showMACD = false,
  showKDJ = false,
  height = 420,
  maxBars = 80,
}: AssetChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const macdPaneRef = useRef<string | null>(null);
  const kdjPaneRef = useRef<string | null>(null);

  function toKLineData(points: OhlcPoint[]): KLineData[] {
    const limited = maxBars > 0 ? points.slice(-maxBars) : points;
    return limited
      .filter(
        (p) =>
          p.open != null && p.high != null && p.low != null && p.close != null
      )
      .map((p) => ({
        timestamp: new Date(p.date).getTime(),
        open: p.open as number,
        high: p.high as number,
        low: p.low as number,
        close: p.close as number,
        volume: (p.volume ?? 0) as number,
      }));
  }

  useEffect(() => {
    if (!containerRef.current) return;

    // Defensive cleanup to avoid duplicates in Fast Refresh/StrictMode
    try {
      dispose(containerRef.current);
      // Ensure container is empty before re-init
      containerRef.current.innerHTML = "";
    } catch {
      // ignore if no chart bound yet
    }

    const chart = init(containerRef.current, {
      // Keep styles minimal for a clean main view; align with shadcn colors
      styles: {
        grid: { show: true },
        xAxis: { show: true } as any,
        yAxis: { position: "left" } as any,
        candle: { bar: { upColor: "#16a34a", downColor: "#ef4444" } },
      },
    });
    chartRef.current = chart;

    chart.applyNewData(toKLineData(data));

    // Only create overlays/panes when explicitly enabled
    if (showMA) chart.createIndicator("MA", false, { calcParams: maPeriods });
    if (showMACD) macdPaneRef.current = chart.createIndicator("MACD", true);
    if (showKDJ) kdjPaneRef.current = chart.createIndicator("KDJ", true);

    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      if (containerRef.current) dispose(containerRef.current);
      chartRef.current = null;
      macdPaneRef.current = null;
      kdjPaneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.applyNewData(toKLineData(data));
  }, [data]);

  return (
    <div className="w-full" style={{ height }}>
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
