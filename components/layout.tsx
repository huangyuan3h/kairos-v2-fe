"use client";

import { Navigation } from "@/components/navigation";
import { Header } from "@/components/header";
import { AgentProvider } from "@/contexts/agent";
import { NavigationProvider } from "@/contexts/navigation-context";
import { useAgentState } from "@/contexts/agent";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  locale: string;
}

function LayoutContent({ children, locale }: LayoutProps) {
  const { isOpen, mode, width } = useAgentState();
  const [isClient, setIsClient] = useState(false);

  // 确保客户端渲染
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 当 Agent 处于 sidebar 模式且打开时，调整主内容区域的右边距
  const isSidebarMode = mode === "sidebar" && isOpen;
  const rightMargin = isSidebarMode && isClient ? width : 0;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation locale={locale} />

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{
          marginRight: rightMargin,
        }}
      >
        {/* Header */}
        <Header title="Dashboard" />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

export function Layout(props: LayoutProps) {
  return (
    <NavigationProvider>
      <AgentProvider>
        <LayoutContent {...props} />
      </AgentProvider>
    </NavigationProvider>
  );
}
