"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Globe, ChevronUp } from "lucide-react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { languages } from "./constants";

interface NavigationLanguageProps {
  isOpen: boolean;
}

export function NavigationLanguage({ isOpen }: NavigationLanguageProps) {
  const [currentLang, setCurrentLang] = useState<string>("en");

  const currentLanguage =
    languages.find((lang) => lang.code === currentLang) || languages[0];

  const handleLangChange = (langCode: string) => {
    setCurrentLang(langCode);
    // TODO: 这里可以集成 i18n 库进行语言切换
    console.log("Language changed to:", langCode);
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center gap-2"
          >
            {/* 根据 navigation 状态显示不同图标 */}
            {isOpen ? (
              <Globe className="h-5 w-5" />
            ) : (
              <span className="text-lg">{currentLanguage.flag}</span>
            )}

            {/* 语言名称 - 只在打开时显示 */}
            <span
              className={cn(
                "transition-all duration-300 overflow-hidden whitespace-nowrap",
                isOpen ? "opacity-100 ml-2 w-auto" : "opacity-0 w-0 ml-0"
              )}
            >
              {currentLanguage.nativeName}
            </span>

            {/* 下拉箭头 - 只在打开时显示 */}
            <ChevronUp
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
              <div className="flex items-center gap-2">
                <span className="text-base">{language.flag}</span>
                <span>{language.nativeName}</span>
              </div>
              {currentLang === language.code && (
                <span className="text-xs text-blue-600">✓</span>
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
