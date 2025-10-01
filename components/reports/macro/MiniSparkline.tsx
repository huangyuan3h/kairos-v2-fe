"use client";

import React from "react";

type Props = {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
};

// Tiny inline sparkline using plain SVG. No external deps.
export function MiniSparkline({
  data,
  width = 120,
  height = 36,
  stroke = "currentColor",
  fill,
}: Props) {
  if (!data || data.length === 0) {
    return <svg width={width} height={height} />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });

  const path = `M ${points.join(" L ")}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {fill ? (
        <path
          d={`${path} L ${width},${height} L 0,${height} Z`}
          fill={fill}
          opacity={0.15}
        />
      ) : null}
      <path d={path} fill="none" stroke={stroke} strokeWidth={2} />
    </svg>
  );
}
