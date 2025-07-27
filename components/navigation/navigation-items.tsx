"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navItems } from "./constants";
import { useTranslations } from "next-intl";

interface NavigationItemsProps {
  isOpen: boolean;
}

export function NavigationItems({ isOpen }: NavigationItemsProps) {
  const t = useTranslations("Navigation");
  return (
    <div className="flex-1 p-4 space-y-2">
      {navItems.map((item, index) => (
        <Button
          key={index}
          variant={item.active ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start transition-all duration-300 flex items-center",
            isOpen ? "px-3" : "px-2"
          )}
        >
          {item.icon}
          <span
            className={cn(
              "transition-all duration-300 overflow-hidden whitespace-nowrap",
              isOpen ? "opacity-100 ml-3 w-auto" : "opacity-0 w-0 ml-0"
            )}
          >
            {t(item.label.toLowerCase() as keyof IntlMessages["Navigation"])}
          </span>
        </Button>
      ))}
    </div>
  );
}
