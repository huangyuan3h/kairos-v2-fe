import type { MacroCategory } from "./types";

// Hardcoded macro/index catalog for UI scaffolding only (no backend calls)
export const macroCategories: MacroCategory[] = [
  {
    id: "liquidity",
    title: "Liquidity & Risk Appetite",
    description: "Dollar, volatility and broad risk proxies.",
    color: "blue",
    items: [
      {
        symbol: "GLOBAL:DXY",
        name: "US Dollar Index (DXY)",
        asset_type: "index",
        icon: "Banknote",
      },
      {
        symbol: "GLOBAL:VIX",
        name: "CBOE Volatility Index (VIX)",
        asset_type: "index",
        icon: "Activity",
      },
      {
        symbol: "GLOBAL:MOVE",
        name: "ICE BofA MOVE Index",
        asset_type: "index",
        icon: "LineChart",
      },
      {
        symbol: "GLOBAL:BDI",
        name: "Baltic Dry Index (BDI)",
        asset_type: "index",
        icon: "Ship",
      },
    ],
  },
  {
    id: "rates",
    title: "Rates & Curve",
    description: "Sovereign yields and curve spreads.",
    color: "green",
    items: [
      {
        symbol: "US:UST10Y",
        name: "US 10Y Treasury Yield",
        asset_type: "index",
        icon: "TrendingUp",
      },
      {
        symbol: "US:UST2Y",
        name: "US 2Y Treasury Yield",
        asset_type: "index",
        icon: "TrendingUp",
      },
      {
        symbol: "US:YC2Y10Y",
        name: "US 2s10s Yield Curve",
        asset_type: "index",
        icon: "SplitSquareHorizontal",
      },
      {
        symbol: "CN:CGB10Y",
        name: "China 10Y Gov Bond",
        asset_type: "index",
        icon: "TrendingUp",
      },
    ],
  },
  {
    id: "commodities",
    title: "Commodities & Inflation",
    description: "Energy, metals and inflation proxies.",
    color: "amber",
    items: [
      {
        symbol: "GLOBAL:CRB",
        name: "CRB Commodity Index",
        asset_type: "index",
        icon: "Layers",
      },
      {
        symbol: "GLOBAL:WTI",
        name: "WTI Crude Oil",
        asset_type: "index",
        icon: "Flame",
      },
      {
        symbol: "GLOBAL:BRENT",
        name: "Brent Crude Oil",
        asset_type: "index",
        icon: "Flame",
      },
      {
        symbol: "GLOBAL:GOLD",
        name: "Gold (Spot)",
        asset_type: "index",
        icon: "Coins",
      },
      {
        symbol: "GLOBAL:COPPER",
        name: "Copper (Spot)",
        asset_type: "index",
        icon: "Pickaxe",
      },
      {
        symbol: "GLOBAL:COPPER_GOLD_RATIO",
        name: "Copper/Gold Ratio",
        asset_type: "index",
        icon: "Percent",
      },
    ],
  },
  {
    id: "equities",
    title: "Equities (Broad)",
    description: "US, CN and global equity benchmarks.",
    color: "violet",
    items: [
      {
        symbol: "US:SPX",
        name: "S&P 500 Index",
        asset_type: "index",
        icon: "BarChart2",
      },
      {
        symbol: "US:NDX",
        name: "Nasdaq-100 Index",
        asset_type: "index",
        icon: "BarChart2",
      },
      {
        symbol: "US:DOW",
        name: "Dow Jones Industrial Average",
        asset_type: "index",
        icon: "BarChart2",
      },
      {
        symbol: "GLOBAL:MSCI_WORLD",
        name: "MSCI World Index",
        asset_type: "index",
        icon: "Globe",
      },
      {
        symbol: "GLOBAL:MSCI_EM",
        name: "MSCI Emerging Markets",
        asset_type: "index",
        icon: "Globe2",
      },
      {
        symbol: "CN:CSI300",
        name: "CSI 300 Index",
        asset_type: "index",
        icon: "BarChart2",
      },
      {
        symbol: "CN:SSE50",
        name: "SSE 50 Index",
        asset_type: "index",
        icon: "BarChart2",
      },
      {
        symbol: "CN:CHINEXT",
        name: "ChiNext Index",
        asset_type: "index",
        icon: "BarChart2",
      },
    ],
  },
  {
    id: "crypto",
    title: "Crypto Proxies",
    description: "Crypto as a risk appetite gauge.",
    color: "rose",
    items: [
      {
        symbol: "GLOBAL:BTCUSD",
        name: "Bitcoin (USD)",
        asset_type: "index",
        icon: "Bitcoin",
      },
      {
        symbol: "GLOBAL:ETHUSD",
        name: "Ethereum (USD)",
        asset_type: "index",
        icon: "Diamond",
      },
      {
        symbol: "GLOBAL:BTC_DOM",
        name: "Bitcoin Dominance",
        asset_type: "index",
        icon: "PieChart",
      },
    ],
  },
];

// A small set of P0 indicators to highlight at the top of dashboard
// Keep symbols consistent with macroCategories items
export const macroFeaturedSymbols: string[] = [
  "GLOBAL:DXY", // Dollar Index
  "US:SPX", // S&P 500
  "US:NDX", // Nasdaq-100
  "CN:CSI300", // CSI 300
];
