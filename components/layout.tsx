"use client";

import { Navigation } from "@/components/navigation";
import { Header } from "@/components/header";
import { AgentProvider } from "@/contexts/agent";
import { NavigationProvider } from "@/contexts/navigation-context";

interface LayoutProps {
  children: React.ReactNode;
  locale: string;
}

export function Layout({ children, locale }: LayoutProps) {
  return (
    <NavigationProvider>
      <AgentProvider>
        <div className="flex h-screen bg-gray-50">
          {/* Navigation */}
          <Navigation locale={locale} />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <Header title="Dashboard" />

            {/* Page Content */}
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
      </AgentProvider>
    </NavigationProvider>
  );
}
