"use client";

import { Navigation } from "@/components/navigation";
import { Header } from "@/components/header";
import { useAgent, useAgentState } from "@/contexts/agent";
import {
  NavigationProvider,
  useNavigation,
} from "@/contexts/navigation-context";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

function LayoutInner({
  children,
  className,
  title = "Dashboard",
}: LayoutProps) {
  const { state } = useAgent();
  const { mode } = useAgentState();
  const { navWidth } = useNavigation();

  // 当 Agent 处于侧边栏模式且打开时，调整布局
  const isSidebarMode = mode === "sidebar" && state.isOpen;

  return (
    <div className={cn("flex h-screen bg-gray-50", className)}>
      {/* Navigation - 在所有模式下都保持显示 */}
      <Navigation />

      {/* Main content area */}
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden",
          isSidebarMode && "mr-96" // 为右侧 Agent 留出空间
        )}
      >
        {/* Header */}
        <Header title={title} />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

export function Layout(props: LayoutProps) {
  return (
    <NavigationProvider>
      <LayoutInner {...props} />
    </NavigationProvider>
  );
}
