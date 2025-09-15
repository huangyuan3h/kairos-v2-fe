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
  showMACD?: boolean; // disabled by default
  showKDJ?: boolean; // disabled by default
  showVOL?: boolean; // disabled by default
  height?: number;
  maxBars?: number; // only render last N candles
};

/**
 * Renders a financial chart using klinecharts with optional indicators.
 * By default, it shows MA(5/10/20), MACD and KDJ.
 */
export function AssetChart({
  data,
  showMA = true,
  showMACD = false,
  showKDJ = false,
  showVOL = false,
  height = 420,
  maxBars = 80,
}: AssetChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const macdPaneRef = useRef<string | null>(null);
  const kdjPaneRef = useRef<string | null>(null);
  const volPaneRef = useRef<string | null>(null);
  const lastWidthRef = useRef<number>(0);

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

    const containerEl = containerRef.current;

    try {
      dispose(containerEl);
      containerEl.innerHTML = "";
    } catch {}

    // Pass styles directly via init second argument per docs
    // Type of styles object is large; cast to unknown to satisfy TS
    const styles = {
      grid: {
        show: true,
        horizontal: {
          show: true,
          size: 1,
          color: "#EDEDED",
          style: "dashed",
          dashedValue: [2, 2],
        },
        vertical: {
          show: true,
          size: 1,
          color: "#EDEDED",
          style: "dashed",
          dashedValue: [2, 2],
        },
      },
      candle: { bar: { upColor: "#16a34a", downColor: "#ef4444" } },
    } as unknown as Record<string, unknown>;
    const chart = init(containerEl, styles);
    if (!chart) return;
    chartRef.current = chart;

    chart.applyNewData(toKLineData(data));

    if (showMA) chart.createIndicator("MA", true, { id: "candle_pane" });
    if (showMACD) macdPaneRef.current = chart.createIndicator("MACD", true);
    if (showKDJ) kdjPaneRef.current = chart.createIndicator("KDJ", true);
    if (showVOL) volPaneRef.current = chart.createIndicator("VOL", true);

    try {
      if (macdPaneRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (chart as any).setPaneOptions?.({
          id: macdPaneRef.current,
        });
      }
      if (kdjPaneRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (chart as any).setPaneOptions?.({
          id: kdjPaneRef.current,
        });
      }
      if (volPaneRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (chart as any).setPaneOptions?.({
          id: volPaneRef.current,
        });
      }
    } catch {}

    const ro = new ResizeObserver((entries) => {
      const width = Math.floor(entries[0].contentRect.width);
      if (width !== lastWidthRef.current) {
        lastWidthRef.current = width;
        chart.resize();
      }
    });
    ro.observe(containerEl);

    return () => {
      ro.disconnect();
      dispose(containerEl);
      chartRef.current = null;
      macdPaneRef.current = null;
      kdjPaneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, showMA, showMACD, showKDJ, maxBars]);

  useEffect(() => {
    if (!chartRef.current) return;
    const limited = maxBars > 0 ? data.slice(-maxBars) : data;
    const kdata: KLineData[] = limited
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
    chartRef.current.applyNewData(kdata);
  }, [data, maxBars]);

  return (
    <div className="w-full" style={{ height }}>
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
