"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Settings,
  Users,
  BarChart3,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  className?: string;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

export function Navigation({ className }: NavigationProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Dashboard",
      href: "/",
      active: true,
    },
    { icon: <Users className="h-5 w-5" />, label: "Users", href: "/users" },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Documents",
      href: "/documents",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Analytics",
      href: "/analytics",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/settings",
    },
  ];

  return (
    <nav
      className={cn(
        "flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header with toggle button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="font-semibold text-gray-900">Kairos</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation items */}
      <div className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              isCollapsed ? "px-2" : "px-3"
            )}
          >
            {item.icon}
            {!isCollapsed && <span className="ml-3">{item.label}</span>}
          </Button>
        ))}
      </div>

      {/* User section */}
      <div className="p-4 border-t border-gray-200">
        <div
          className={cn(
            "flex items-center space-x-3",
            isCollapsed && "justify-center"
          )}
        >
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">U</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                User Name
              </p>
              <p className="text-xs text-gray-500 truncate">user@example.com</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
