"use client";

import { Navigation } from "@/components/navigation";
import { Header } from "@/components/header";
import { AgentProvider as BaseAgentProvider } from "@/contexts/agent";
import { NavigationProvider } from "@/contexts/navigation-context";
import { useAgentState } from "@/contexts/agent";
import { AgentProvider } from "@/components/agent/agent-provider";
import { AgentConfig, getPageAgentConfig } from "@/components/agent/config";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  locale: string;
  title?: string;
  enableAgent?: boolean; // 控制是否启用Agent功能
  agentConfig?: AgentConfig; // Agent配置
  pageName?: string; // 页面名称，用于自动获取配置
  showBack?: boolean; // 是否展示返回按钮
  onBack?: () => void; // 返回按钮点击回调
}

// 带Agent功能的Layout内容
function LayoutWithAgent({
  children,
  locale,
  title = "Dashboard",
  showBack,
  onBack,
}: LayoutProps) {
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
        <Header title={title} showBack={showBack} onBack={onBack} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

// 不带Agent功能的Layout内容
function LayoutWithoutAgent({
  children,
  locale,
  title = "Dashboard",
  showBack,
  onBack,
}: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation locale={locale} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header title={title} showBack={showBack} onBack={onBack} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

export function Layout(props: LayoutProps) {
  // 获取Agent配置
  const finalAgentConfig =
    props.agentConfig ||
    (props.pageName
      ? getPageAgentConfig(props.pageName)
      : { enabled: props.enableAgent, showTrigger: true, showDialog: true });

  // 如果Agent被禁用，不创建Agent context
  if (!finalAgentConfig.enabled) {
    return (
      <NavigationProvider>
        <LayoutWithoutAgent {...props} />
      </NavigationProvider>
    );
  }

  return (
    <NavigationProvider>
      <BaseAgentProvider>
        <AgentProvider config={props.agentConfig} enabled={props.enableAgent}>
          <LayoutWithAgent {...props} />
        </AgentProvider>
      </BaseAgentProvider>
    </NavigationProvider>
  );
}
