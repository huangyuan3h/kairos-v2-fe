export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: "stock" | "crypto" | "futures" | "cash" | "bond" | "etf";
  market: "US" | "CN" | "HK" | "JP" | "EU" | "GLOBAL";
  quantity: number;
  currentPrice: number;
  currency: string;
  change24h: number;
  changePercent24h: number;
  marketValue: number;
  costBasis: number;
  totalReturn: number;
  totalReturnPercent: number;
  sector?: string;
  industry?: string;
  lastUpdated: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  totalReturn: number;
  totalReturnPercent: number;
  change24h: number;
  changePercent24h: number;
  currency: string;
}

export interface AssetAllocation {
  type: string;
  value: number;
  percentage: number;
  color: string;
}

export interface MarketAllocation {
  market: string;
  value: number;
  percentage: number;
  color: string;
}

export interface PriceHistory {
  date: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface PortfolioData {
  summary: PortfolioSummary;
  assets: Asset[];
  assetAllocation: AssetAllocation[];
  marketAllocation: MarketAllocation[];
  priceHistory: PriceHistory[];
  topGainers: Asset[];
  topLosers: Asset[];
}
