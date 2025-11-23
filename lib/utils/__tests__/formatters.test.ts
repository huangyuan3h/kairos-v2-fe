import {
  formatAsOfDate,
  formatChange,
  formatPercent,
  formatPrice,
  formatVolume,
} from "@/lib/utils/formatters";

describe("formatPrice", () => {
  it("formats numeric values with two decimals", () => {
    expect(formatPrice(1234.5)).toBe("1,234.50");
  });

  it("returns dash for nullish values", () => {
    expect(formatPrice(null)).toBe("-");
    expect(formatPrice(undefined)).toBe("-");
  });
});

describe("formatChange", () => {
  it("includes sign information", () => {
    expect(formatChange(5)).toContain("+");
    expect(formatChange(-3)).toContain("-");
  });
});

describe("formatPercent", () => {
  it("converts percentage values correctly", () => {
    expect(formatPercent(1.23)).toBe("+1.23%");
    expect(formatPercent(-0.5)).toBe("-0.50%");
  });
});

describe("formatVolume", () => {
  it("applies unit suffixes", () => {
    expect(formatVolume(1500)).toBe("1.50K");
    expect(formatVolume(2_345_000)).toBe("2.35M");
    expect(formatVolume(3_400_000_000)).toBe("3.40B");
  });

  it("handles small numbers", () => {
    expect(formatVolume(12)).toBe("12");
  });
});

describe("formatAsOfDate", () => {
  it("formats ISO timestamps", () => {
    const result = formatAsOfDate("2024-05-01T10:30:00Z");
    expect(result).not.toBe("-");
  });

  it("returns dash for invalid dates", () => {
    expect(formatAsOfDate("invalid")).toBe("-");
  });
});

