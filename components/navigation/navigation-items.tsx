"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navItems } from "./constants";
import {
  Home,
  Users,
  FileText,
  BarChart3,
  Settings,
  PieChart,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

// Import translations from i18n/messages
import enMessages from "@/i18n/messages/en.json";
import zhCNMessages from "@/i18n/messages/zh-CN.json";

interface NavigationItemsProps {
  isOpen: boolean;
  locale?: string;
}

// Icon mapping
const iconMap = {
  Home: Home,
  Users: Users,
  FileText: FileText,
  BarChart3: BarChart3,
  Settings: Settings,
  PieChart: PieChart,
};

const messages = {
  en: enMessages,
  "zh-CN": zhCNMessages,
};

export function NavigationItems({
  isOpen,
  locale = "en",
}: NavigationItemsProps) {
  const t =
    messages[locale as keyof typeof messages]?.Navigation ||
    messages.en.Navigation;
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    // Construct the full path with locale
    const fullPath = `/${locale}${href}`;
    router.push(fullPath);
  };

  return (
    <div className="flex-1 p-4 space-y-2">
      {navItems.map((item, index) => {
        const IconComponent = iconMap[item.icon as keyof typeof iconMap];
        const isActive = pathname === `/${locale}${item.href}`;

        return (
          <Button
            key={index}
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start transition-all duration-300 flex items-center",
              isOpen ? "px-3" : "px-2"
            )}
            onClick={() => handleNavigation(item.href)}
          >
            {IconComponent && <IconComponent className="h-5 w-5" />}
            <span
              className={cn(
                "transition-all duration-300 overflow-hidden whitespace-nowrap",
                isOpen ? "opacity-100 ml-3 w-auto" : "opacity-0 w-0 ml-0"
              )}
            >
              {t[item.label.toLowerCase() as keyof typeof t] || item.label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
