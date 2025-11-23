const DEFAULT_LOCALE =
  (typeof navigator !== "undefined" && navigator.language) || "en-US";

export function formatPrice(
  value: number | null | undefined,
  options?: Intl.NumberFormatOptions
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  const formatter = new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  });
  return formatter.format(value);
}

export function formatChange(
  value: number | null | undefined,
  options?: Intl.NumberFormatOptions
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  const formatter = new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "always",
    ...options,
  });
  return formatter.format(value);
}

export function formatPercent(
  value: number | null | undefined,
  options?: Intl.NumberFormatOptions
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  const formatter = new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "always",
    ...options,
  });
  return formatter.format(value / 100);
}

export function formatVolume(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (abs >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  if (abs >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  return value.toFixed(0);
}

export function formatAsOfDate(isoDate?: string | null): string {
  if (!isoDate) return "-";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString(DEFAULT_LOCALE, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

