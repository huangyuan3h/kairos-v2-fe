import { use } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Globe,
  Building2,
  BarChart3,
  Target,
  Zap,
  Bitcoin,
  Flame,
  CircleDollarSign,
} from "lucide-react";
import Link from "next/link";

// Import translations from i18n/messages
import enMessages from "@/i18n/messages/en.json";
import zhCNMessages from "@/i18n/messages/zh-CN.json";

const messages = {
  en: enMessages,
  "zh-CN": zhCNMessages,
};

// 投资机会数据结构
interface InvestmentOpportunity {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  confidence: number; // 0-100
  expectedReturn: number; // 预期收益率
  riskLevel: "low" | "medium" | "high";
  market: string;
  icon: React.ReactNode;
  flag: string;
  analysis: string;
  nextSteps: string[];
  linkTo: string;
}

// Mock数据
const investmentOpportunities: InvestmentOpportunity[] = [
  {
    id: "1",
    category: "股票",
    subcategory: "白酒",
    name: "贵州茅台",
    description: "中国白酒龙头企业，品牌价值持续提升",
    confidence: 85,
    expectedReturn: 12.5,
    riskLevel: "medium",
    market: "CN",
    icon: <Building2 className="h-5 w-5" />,
    flag: "🇨🇳",
    analysis:
      "茅台作为中国白酒行业的标杆企业，具有强大的品牌护城河和定价权。在消费升级趋势下，高端白酒需求稳定增长。",
    nextSteps: ["分析财务数据", "评估估值水平", "研究行业政策"],
    linkTo: "/portfolio/analysis/stock/600519",
  },
  {
    id: "2",
    category: "大宗商品",
    subcategory: "能源",
    name: "原油期货",
    description: "全球能源需求复苏，供应紧张推高价格",
    confidence: 78,
    expectedReturn: 18.2,
    riskLevel: "high",
    market: "GLOBAL",
    icon: <Flame className="h-5 w-5" />,
    flag: "🌍",
    analysis:
      "全球经济复苏推动能源需求增长，同时OPEC+减产政策维持供应紧张。地缘政治风险进一步支撑油价。",
    nextSteps: ["监控OPEC+政策", "关注地缘政治", "分析库存数据"],
    linkTo: "/portfolio/analysis/commodity/crude-oil",
  },
  {
    id: "3",
    category: "加密货币",
    subcategory: "主流币",
    name: "比特币",
    description: "数字黄金，机构投资者持续增持",
    confidence: 72,
    expectedReturn: 25.8,
    riskLevel: "high",
    market: "GLOBAL",
    icon: <Bitcoin className="h-5 w-5" />,
    flag: "🌍",
    analysis:
      "比特币作为数字资产龙头，受益于机构投资者配置需求增长。减半周期和宏观经济环境利好。",
    nextSteps: ["监控机构资金流向", "关注监管政策", "分析技术指标"],
    linkTo: "/portfolio/analysis/crypto/bitcoin",
  },
  {
    id: "4",
    category: "股票",
    subcategory: "科技",
    name: "苹果公司",
    description: "全球科技巨头，生态系统护城河深厚",
    confidence: 82,
    expectedReturn: 15.3,
    riskLevel: "medium",
    market: "US",
    icon: <Building2 className="h-5 w-5" />,
    flag: "🇺🇸",
    analysis:
      "苹果拥有强大的品牌价值和生态系统，服务收入占比持续提升，硬件创新和AI布局前景广阔。",
    nextSteps: ["分析季度财报", "评估新产品线", "研究竞争格局"],
    linkTo: "/portfolio/analysis/stock/AAPL",
  },
  {
    id: "5",
    category: "大宗商品",
    subcategory: "贵金属",
    name: "黄金",
    description: "避险资产，通胀对冲工具",
    confidence: 75,
    expectedReturn: 8.5,
    riskLevel: "low",
    market: "GLOBAL",
    icon: <CircleDollarSign className="h-5 w-5" />,
    flag: "🌍",
    analysis:
      "在通胀压力和地缘政治不确定性下，黄金作为传统避险资产具有配置价值。",
    nextSteps: ["监控通胀数据", "关注央行政策", "分析美元走势"],
    linkTo: "/portfolio/analysis/commodity/gold",
  },
];

export default function Analysis({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = messages[locale as keyof typeof messages] || messages.en;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600";
    if (confidence >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getReturnColor = (returnValue: number) => {
    return returnValue >= 0 ? "text-green-600" : "text-red-600";
  };

  return (
    <Layout locale={locale} title="投资分析" pageName="analysis">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t.Analysis.title}
            </h1>
            <p className="text-gray-600 mt-2">{t.Analysis.description}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              {t.Analysis.actions.updateAnalysis}
            </Button>
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              {t.Analysis.actions.setPreferences}
            </Button>
          </div>
        </div>

        {/* 投资逻辑说明 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-600" />
              {t.Analysis.investmentLogic.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Globe className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold text-blue-900">
                  {t.Analysis.investmentLogic.macroAnalysis}
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  {t.Analysis.investmentLogic.macroDescription}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Building2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-semibold text-green-900">
                  {t.Analysis.investmentLogic.industryScreening}
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  {t.Analysis.investmentLogic.industryDescription}
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-semibold text-purple-900">
                  {t.Analysis.investmentLogic.targetSelection}
                </h3>
                <p className="text-sm text-purple-700 mt-1">
                  {t.Analysis.investmentLogic.targetDescription}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 投资机会列表 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">推荐投资机会</h2>

          {investmentOpportunities.map((opportunity) => (
            <Card
              key={opportunity.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* 图标和基本信息 */}
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {opportunity.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{opportunity.flag}</span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {opportunity.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          {opportunity.category} • {opportunity.subcategory}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {opportunity.description}
                        </p>
                      </div>
                    </div>

                    {/* 关键指标 */}
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div
                          className={`text-lg font-semibold ${getConfidenceColor(
                            opportunity.confidence
                          )}`}
                        >
                          {opportunity.confidence}%
                        </div>
                        <div className="text-xs text-gray-500">置信度</div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-lg font-semibold ${getReturnColor(
                            opportunity.expectedReturn
                          )}`}
                        >
                          {opportunity.expectedReturn > 0 ? "+" : ""}
                          {opportunity.expectedReturn}%
                        </div>
                        <div className="text-xs text-gray-500">预期收益</div>
                      </div>
                      <div className="text-center">
                        <Badge className={getRiskColor(opportunity.riskLevel)}>
                          {opportunity.riskLevel === "low"
                            ? "低风险"
                            : opportunity.riskLevel === "medium"
                            ? "中风险"
                            : "高风险"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <Link href={opportunity.linkTo}>
                      <Button size="sm" className="w-full">
                        详细分析
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="w-full">
                      加入观察
                    </Button>
                  </div>
                </div>

                {/* 分析内容 */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        投资分析
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {opportunity.analysis}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        下一步行动
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {opportunity.nextSteps.map((step, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 市场概览 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-600" />
              市场概览
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-lg font-semibold text-green-900">
                  +2.3%
                </div>
                <div className="text-sm text-green-700">美股指数</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <TrendingDown className="h-6 w-6 mx-auto mb-2 text-red-600" />
                <div className="text-lg font-semibold text-red-900">-1.2%</div>
                <div className="text-sm text-red-700">A股指数</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                <div className="text-lg font-semibold text-yellow-900">
                  +5.8%
                </div>
                <div className="text-sm text-yellow-700">比特币</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-lg font-semibold text-blue-900">+3.2%</div>
                <div className="text-sm text-blue-700">原油价格</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
