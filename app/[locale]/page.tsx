import { use } from "react";
import { NavigationLanguage } from "@/components/navigation/navigation-language";

// Simple messages object
const messages = {
  en: {
    welcome: "Welcome back!",
    description: "Here's what's happening with your projects today.",
    dashboard: "Dashboard",
  },
  "zh-CN": {
    welcome: "欢迎回来！",
    description: "这是您今天项目的最新动态。",
    dashboard: "仪表盘",
  },
};

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = messages[locale as keyof typeof messages] || messages.en;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t.dashboard}</h1>
          <div className="text-sm text-gray-500">Current locale: {locale}</div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">{t.welcome}</h1>
        <p className="text-gray-600 mb-8">{t.description}</p>

        {/* Language Switcher Demo */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-sm">
          <h2 className="text-lg font-medium mb-4">Language Switcher:</h2>
          <NavigationLanguage isOpen={true} />
        </div>
      </main>
    </div>
  );
}
