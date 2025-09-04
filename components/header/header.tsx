"use client";

import { cn } from "@/lib/utils";
import { HeaderTitle } from "./header-title";
import { HeaderActions } from "./header-actions";

interface HeaderProps {
  className?: string;
  title?: string;
  breadcrumb?: string[];
  showBack?: boolean;
  onBack?: () => void;
}

export function Header({
  className,
  title = "Dashboard",
  breadcrumb,
  showBack,
  onBack,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between px-6 pt-3 pb-2 bg-white border-b border-gray-200",
        className
      )}
    >
      {/* Left side - Title and breadcrumb */}
      <HeaderTitle
        title={title}
        breadcrumb={breadcrumb}
        showBack={showBack}
        onBack={onBack}
      />

      {/* Right side - Notifications and user menu */}
      <HeaderActions />
    </header>
  );
}
