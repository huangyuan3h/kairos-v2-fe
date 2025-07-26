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
  Globe,
  ChevronDown,
} from "lucide-react";
import { useNavigation } from "@/contexts/navigation-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface NavigationProps {
  className?: string;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export function Navigation() {
  const { isOpen, toggleNav, navWidth } = useNavigation();
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<string>("en");

  const languages: Language[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "中文（简体）" },
    { code: "fr", name: "French", nativeName: "Français" },
    { code: "es", name: "Spanish", nativeName: "Español" },
    { code: "ja", name: "Japanese", nativeName: "日本語" },
    { code: "ko", name: "Korean", nativeName: "한국어" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === currentLang) || languages[0];

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

  const handleLangChange = (langCode: string) => {
    setCurrentLang(langCode);
    // TODO: 这里可以集成 i18n 库进行语言切换
    console.log("Language changed to:", langCode);
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
        {/* Logo section - 使用相对定位确保 K 位置稳定 */}
        <div className="relative flex items-center flex-1">
          <div
            className={cn(
              "w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors flex-shrink-0 transition-all duration-300",
              isOpen ? "ml-0" : "ml-auto mr-auto"
            )}
            onClick={handleLogoClick}
          >
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span
            className={cn(
              "font-semibold text-gray-900 transition-all duration-300 overflow-hidden whitespace-nowrap",
              isOpen ? "opacity-100 ml-2 w-auto" : "opacity-0 w-0 ml-0"
            )}
          >
            Kairos
          </span>
        </div>

        {/* 缩小按钮 - 只在 navigation 打开时显示 */}
        {isOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleNav}
            className="h-8 w-8 p-0 ml-2 flex-shrink-0"
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
              {item.label}
            </span>
          </Button>
        ))}
      </div>

      {/* Language switcher section */}
      <div className="p-4 border-t border-gray-200">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-full flex items-center justify-center gap-2"
            >
              <Globe className="h-5 w-5" />
              <span
                className={cn(
                  "transition-all duration-300 overflow-hidden whitespace-nowrap",
                  isOpen ? "opacity-100 ml-2 w-auto" : "opacity-0 w-0 ml-0"
                )}
              >
                {currentLanguage.nativeName}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-all duration-300",
                  isOpen ? "opacity-100" : "opacity-0"
                )}
              />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            side="top"
            align="center"
            className="w-48 bg-white border rounded-md shadow-lg p-1"
          >
            {languages.map((language) => (
              <DropdownMenu.Item
                key={language.code}
                onSelect={() => handleLangChange(language.code)}
                className={cn(
                  "px-3 py-2 rounded hover:bg-gray-100 cursor-pointer flex items-center justify-between",
                  currentLang === language.code && "bg-blue-50 text-blue-600"
                )}
              >
                <span>{language.nativeName}</span>
                {currentLang === language.code && (
                  <span className="text-xs text-blue-600">✓</span>
                )}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </nav>
  );
}
