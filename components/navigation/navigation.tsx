"use client";

import { cn } from "@/lib/utils";
import { useNavigation } from "@/contexts/navigation-context";
import { NavigationProps } from "./types";
import { NavigationHeader } from "./navigation-header";
import { NavigationItems } from "./navigation-items";
import { NavigationLanguage } from "./navigation-language";

export function Navigation({ locale }: NavigationProps) {
  const { isOpen, navWidth } = useNavigation();

  return (
    <nav
      className={cn(
        "flex flex-col bg-white border-r border-gray-200 transition-all duration-300"
      )}
      style={{ width: navWidth }}
    >
      {/* Header */}
      <NavigationHeader isOpen={isOpen} />

      {/* Navigation items */}
      <NavigationItems isOpen={isOpen} locale={locale} />

      {/* Language switcher */}
      <NavigationLanguage isOpen={isOpen} />
    </nav>
  );
}
