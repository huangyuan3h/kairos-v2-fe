"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Globe, ChevronUp } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { languages } from "./constants";
import Cookies from "js-cookie";

interface NavigationLanguageProps {
  isOpen: boolean;
}

export function NavigationLanguage({ isOpen }: NavigationLanguageProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const currentLocale = pathname.split("/")[1] || "en";
  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  const handleLangChange = (newLocale: string) => {
    // Save to cookie
    Cookies.set("NEXT_LOCALE", newLocale, { expires: 365 });

    // Replace current locale in pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/") || `/${newLocale}`;

    router.push(newPath);
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
            {isOpen ? (
              <Globe className="h-5 w-5" />
            ) : (
              <span className="text-lg">{currentLanguage.flag}</span>
            )}
            <span
              className={cn(
                "transition-all duration-300 overflow-hidden whitespace-nowrap",
                isOpen ? "opacity-100 ml-2 w-auto" : "opacity-0 w-0 ml-0"
              )}
            >
              {currentLanguage.nativeName}
            </span>
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
                currentLocale === language.code && "bg-blue-50 text-blue-600"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{language.flag}</span>
                <span>{language.nativeName}</span>
              </div>
              {currentLocale === language.code && (
                <span className="text-xs text-blue-600">✓</span>
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
