import { use } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Building2,
  BarChart3,
  Target,
  DollarSign,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function StockAnalysis({
  params,
}: {
  params: Promise<{ locale: string; symbol: string }>;
}) {
  const { locale } = use(params);

  // Mock数据 - 贵州茅台
  const stockData = {
    symbol: "600519",
    name: "贵州茅台",
    market: "CN",
    currentPrice: 1688.0,
    change: 2.5,
    marketCap: "2.1万亿",
    pe: 28.5,
    pb: 12.3,
    dividend: 1.2,
    sector: "白酒",
    industry: "食品饮料",
    description: "中国白酒龙头企业，拥有强大的品牌护城河和定价权。",
    analysis: {
      strengths: [
        "强大的品牌价值和护城河",
        "稳定的现金流和高利润率",
        "定价权强，抗通胀能力强",
        "消费升级趋势受益者",
      ],
      risks: [
        "政策风险（反腐、限酒令等）",
        "消费习惯变化",
        "估值较高",
        "产能扩张限制",
      ],
      opportunities: ["海外市场扩张", "产品线多元化", "数字化转型", "渠道优化"],
    },
    financials: {
      revenue: "1234.5亿",
      netIncome: "567.8亿",
      grossMargin: "91.2%",
      netMargin: "46.0%",
      debtToEquity: "0.15",
      roe: "32.5%",
    },
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-red-600";
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-4 w-4" />
    ) : (
      <TrendingDown className="h-4 w-4" />
    );
  };

  return (
    <Layout
      locale={locale}
      title={`${stockData.name} (${stockData.symbol}) 分析`}
      pageName="analysis"
    >
      <div className="space-y-6">
        {/* 返回按钮 */}
        <div className="flex items-center">
          <Link href="/analysis">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回投资分析
            </Button>
          </Link>
        </div>

        {/* 股票基本信息 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{stockData.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-lg">🇨🇳</span>
                    <span className="text-gray-600">{stockData.symbol}</span>
                    <Badge variant="outline">{stockData.sector}</Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  ¥{stockData.currentPrice}
                </div>
                <div
                  className={`flex items-center ${getChangeColor(
                    stockData.change
                  )}`}
                >
                  {getChangeIcon(stockData.change)}
                  <span className="ml-1">
                    {stockData.change > 0 ? "+" : ""}
                    {stockData.change}%
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{stockData.description}</p>
          </CardContent>
        </Card>

        {/* 关键指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">市值</div>
                  <div className="text-lg font-semibold">
                    {stockData.marketCap}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-500">市盈率</div>
                  <div className="text-lg font-semibold">{stockData.pe}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-sm text-gray-500">市净率</div>
                  <div className="text-lg font-semibold">{stockData.pb}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-sm text-gray-500">股息率</div>
                  <div className="text-lg font-semibold">
                    {stockData.dividend}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 财务数据 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              财务数据
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">营业收入</div>
                <div className="text-lg font-semibold">
                  {stockData.financials.revenue}
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">净利润</div>
                <div className="text-lg font-semibold">
                  {stockData.financials.netIncome}
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">毛利率</div>
                <div className="text-lg font-semibold">
                  {stockData.financials.grossMargin}
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">净利率</div>
                <div className="text-lg font-semibold">
                  {stockData.financials.netMargin}
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">资产负债率</div>
                <div className="text-lg font-semibold">
                  {stockData.financials.debtToEquity}
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">ROE</div>
                <div className="text-lg font-semibold">
                  {stockData.financials.roe}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SWOT分析 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <TrendingUp className="h-5 w-5 mr-2" />
                优势 (Strengths)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stockData.analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <TrendingDown className="h-5 w-5 mr-2" />
                风险 (Risks)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stockData.analysis.risks.map((risk, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">{risk}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <Target className="h-5 w-5 mr-2" />
                机会 (Opportunities)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stockData.analysis.opportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">{opportunity}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 投资建议 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-600" />
              投资建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  推荐评级：买入
                </h4>
                <p className="text-sm text-green-700">
                  基于茅台强大的品牌护城河、稳定的现金流和消费升级趋势，建议长期持有。
                  当前估值虽然较高，但考虑到其稀缺性和定价权，仍具有投资价值。
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">目标价格</h4>
                  <div className="text-2xl font-bold text-green-600">
                    ¥2,000
                  </div>
                  <div className="text-sm text-gray-500">12个月目标价</div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">预期收益</h4>
                  <div className="text-2xl font-bold text-green-600">
                    +18.5%
                  </div>
                  <div className="text-sm text-gray-500">包含股息收益</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
