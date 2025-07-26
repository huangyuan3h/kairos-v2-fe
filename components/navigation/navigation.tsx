"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Settings,
  Users,
  BarChart3,
  FileText,
  ArrowLeftToLine,
} from "lucide-react";
import { useNavigation } from "@/contexts/navigation-context";
import { useRouter } from "next/navigation";

interface NavigationProps {
  className?: string;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

export function Navigation() {
  const { isOpen, toggleNav, navWidth } = useNavigation();
  const router = useRouter();

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

  const handleLogoClick = () => {
    if (isOpen) {
      // 如果 navigation 已打开，跳转到首页
      router.push("/");
    } else {
      // 如果 navigation 已关闭，打开 navigation
      toggleNav();
    }
  };

  return (
    <nav
      className={cn(
        "flex flex-col bg-white border-r border-gray-200 transition-all duration-300"
      )}
      style={{ width: navWidth }}
    >
      {/* Header with toggle button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {/* Logo icon 始终显示，文字动画淡入淡出且关闭时不占位 */}
        <div className="flex items-center space-x-2 min-w-0">
          <div
            className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
            onClick={handleLogoClick}
          >
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span
            className={cn(
              "font-semibold text-gray-900 transition-all duration-200 overflow-hidden",
              isOpen ? "opacity-100 ml-2 w-auto" : "opacity-0 w-0 ml-0"
            )}
            style={{ transitionProperty: "opacity, width, margin" }}
          >
            Kairos
          </span>
        </div>
        {/* 只在 navigation 打开时显示缩小按钮 */}
        {isOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleNav}
            className="h-8 w-8 p-0"
          >
            <ArrowLeftToLine className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation items */}
      <div className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start transition-all duration-200 flex items-center",
              isOpen ? "px-3" : "px-2"
            )}
          >
            {item.icon}
            <span
              className={cn(
                "transition-all duration-200 overflow-hidden",
                isOpen ? "opacity-100 ml-3 w-auto" : "opacity-0 w-0 ml-0"
              )}
              style={{ transitionProperty: "opacity, width, margin" }}
            >
              {item.label}
            </span>
          </Button>
        ))}
      </div>

      {/* User section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">U</span>
          </div>
          <div
            className={cn(
              "flex-1 min-w-0 transition-all duration-200 overflow-hidden",
              isOpen ? "opacity-100 ml-2 w-auto" : "opacity-0 w-0 ml-0"
            )}
            style={{ transitionProperty: "opacity, width, margin" }}
          >
            <p className="text-sm font-medium text-gray-900 truncate">
              User Name
            </p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
