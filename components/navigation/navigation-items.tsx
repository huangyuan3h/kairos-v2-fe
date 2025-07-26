"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Settings, Users, BarChart3, FileText } from "lucide-react";
import { NavItem } from "./types";
import { navItems } from "./constants";

interface NavigationItemsProps {
  isOpen: boolean;
}

// Icon 映射
const iconMap = {
  Home: Home,
  Users: Users,
  FileText: FileText,
  BarChart3: BarChart3,
  Settings: Settings,
};

export function NavigationItems({ isOpen }: NavigationItemsProps) {
  return (
    <div className="flex-1 p-4 space-y-2">
      {navItems.map((item, index) => {
        const IconComponent = iconMap[item.icon as keyof typeof iconMap];

        return (
          <Button
            key={index}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start transition-all duration-300 flex items-center",
              isOpen ? "px-3" : "px-2"
            )}
          >
            <IconComponent className="h-5 w-5" />
            <span
              className={cn(
                "transition-all duration-300 overflow-hidden whitespace-nowrap",
                isOpen ? "opacity-100 ml-3 w-auto" : "opacity-0 w-0 ml-0"
              )}
            >
              {item.label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
