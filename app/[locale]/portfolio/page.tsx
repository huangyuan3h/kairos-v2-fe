import { use } from "react";
import { Layout } from "@/components/layout";
import { mockPortfolioData } from "@/components/portfolio/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Download, Filter } from "lucide-react";
import { AddAssetDialog } from "@/components/portfolio/add-asset-dialog";
import { AgentTrigger } from "@/components/agent/agent-trigger";
import { AgentDialog } from "@/components/agent/agent-dialog";

// Import translations from i18n/messages
import enMessages from "@/i18n/messages/en.json";
import zhCNMessages from "@/i18n/messages/zh-CN.json";

const messages = {
  en: enMessages,
  "zh-CN": zhCNMessages,
};

export default function Portfolio({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = messages[locale as keyof typeof messages] || messages.en;
  const data = mockPortfolioData;

  const formatCurrency = (value: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-red-600";
  };

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case "stock":
        return "📈";
      case "crypto":
        return "₿";
      case "etf":
        return "📊";
      case "futures":
        return "⚡";
      case "cash":
        return "💰";
      case "bond":
        return "📋";
      default:
        return "📄";
    }
  };

  const getMarketFlag = (market: string) => {
    switch (market) {
      case "US":
        return "🇺🇸";
      case "CN":
        return "🇨🇳";
      case "HK":
        return "🇭🇰";
      case "JP":
        return "🇯🇵";
      case "EU":
        return "🇪🇺";
      case "GLOBAL":
        return "🌍";
      default:
        return "🌐";
    }
  };

  return (
    <Layout locale={locale} title={t.Portfolio.title}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t.Portfolio.title}
            </h1>
            <p className="text-gray-600 mt-2">{t.Portfolio.description}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              {t.Portfolio.actions.filter}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              {t.Portfolio.actions.export}
            </Button>
            <AddAssetDialog>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {t.Portfolio.actions.addAsset}
              </Button>
            </AddAssetDialog>
          </div>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t.Portfolio.summary.totalValue}
              </CardTitle>
              <span className="text-2xl">💰</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data.summary.totalValue)}
              </div>
              <p
                className={`text-xs ${getChangeColor(
                  data.summary.changePercent24h
                )}`}
              >
                {formatPercentage(data.summary.changePercent24h)} today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t.Portfolio.summary.totalReturn}
              </CardTitle>
              <span className="text-2xl">📊</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data.summary.totalReturn)}
              </div>
              <p
                className={`text-xs ${getChangeColor(
                  data.summary.totalReturnPercent
                )}`}
              >
                {formatPercentage(data.summary.totalReturnPercent)} total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t.Portfolio.summary.totalCost}
              </CardTitle>
              <span className="text-2xl">💵</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data.summary.totalCost)}
              </div>
              <p className="text-xs text-gray-600">
                {t.Portfolio.summary.initialInvestment}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t.Portfolio.summary.assetsCount}
              </CardTitle>
              <span className="text-2xl">📋</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.assets.length}</div>
              <p className="text-xs text-gray-600">
                {t.Portfolio.summary.differentPositions}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Asset Allocation Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.Portfolio.allocation.assetAllocation}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.assetAllocation.map((allocation, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: allocation.color }}
                      ></div>
                      <span className="text-sm font-medium">
                        {allocation.type}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {formatCurrency(allocation.value)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {allocation.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.Portfolio.allocation.marketAllocation}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.marketAllocation.map((allocation, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: allocation.color }}
                      ></div>
                      <span className="text-sm font-medium">
                        {allocation.market}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {formatCurrency(allocation.value)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {allocation.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assets Table */}
        <Card>
          <CardHeader>
            <CardTitle>{t.Portfolio.assets.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.Portfolio.assets.asset}</TableHead>
                  <TableHead>{t.Portfolio.assets.market}</TableHead>
                  <TableHead className="text-right">
                    {t.Portfolio.assets.quantity}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.Portfolio.assets.currentPrice}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.Portfolio.assets.marketValue}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.Portfolio.assets.change24h}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.Portfolio.assets.totalReturn}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {getAssetTypeIcon(asset.type)}
                        </span>
                        <div>
                          <div className="font-medium">{asset.symbol}</div>
                          <div className="text-sm text-gray-500">
                            {asset.name}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span>{getMarketFlag(asset.market)}</span>
                        <span className="text-sm">{asset.market}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-sm">
                        {asset.quantity.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-sm">
                        {formatCurrency(asset.currentPrice, asset.currency)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-medium">
                        {formatCurrency(asset.marketValue, asset.currency)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div
                        className={`text-sm ${getChangeColor(
                          asset.changePercent24h
                        )}`}
                      >
                        {formatPercentage(asset.changePercent24h)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div
                        className={`text-sm ${getChangeColor(
                          asset.totalReturnPercent
                        )}`}
                      >
                        {formatPercentage(asset.totalReturnPercent)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.Portfolio.performance.topGainers}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.topGainers.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {getAssetTypeIcon(asset.type)}
                      </span>
                      <div>
                        <div className="font-medium">{asset.symbol}</div>
                        <div className="text-sm text-gray-500">
                          {asset.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">
                        {formatPercentage(asset.totalReturnPercent)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatCurrency(asset.totalReturn, asset.currency)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.Portfolio.performance.topLosers}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.topLosers.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {getAssetTypeIcon(asset.type)}
                      </span>
                      <div>
                        <div className="font-medium">{asset.symbol}</div>
                        <div className="text-sm text-gray-500">
                          {asset.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-red-600">
                        {formatPercentage(asset.totalReturnPercent)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatCurrency(asset.totalReturn, asset.currency)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Agent Components */}
      <AgentTrigger />
      <AgentDialog />
    </Layout>
  );
}
