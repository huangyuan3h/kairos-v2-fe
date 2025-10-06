import { use } from "react";
import { Layout } from "@/components/layout";
import { RecentReportCard } from "@/components/reports/recent-report-card";
import { MacroWatchlistTable } from "@/components/reports";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Import translations from i18n/messages
import enMessages from "@/i18n/messages/en.json";
import zhCNMessages from "@/i18n/messages/zh-CN.json";

const messages = {
  en: enMessages,
  "zh-CN": zhCNMessages,
};

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = messages[locale as keyof typeof messages] || messages.en;

  return (
    <Layout locale={locale} pageName="dashboard">
      {/* Dashboard Content */}
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t.Dashboard.welcome}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t.Dashboard.description}
          </p>
        </div>

        {/* Watchlist + Recent Reports: 6:4 responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Report
                </h3>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/${locale}/reports`}>View all</Link>
                </Button>
              </div>
              <RecentReportCard />
            </div>
          </div>
          <div className="lg:col-span-4">
            <MacroWatchlistTable locale={locale} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
