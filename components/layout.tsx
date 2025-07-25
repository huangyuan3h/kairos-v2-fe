"use client";

import { cn } from "@/lib/utils";
import { Navigation } from "@/components/navigation/navigation";
import { Header } from "@/components/header/header";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  breadcrumb?: string[];
}

export function Layout({
  children,
  className,
  title = "Dashboard",
  breadcrumb = ["Home"],
}: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left sidebar - Navigation */}
      <Navigation />

      {/* Right side - Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <Header title={title} breadcrumb={breadcrumb} />

        {/* Main content */}
        <main className={cn("flex-1 overflow-auto p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
