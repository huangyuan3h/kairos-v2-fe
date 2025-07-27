"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine } from "lucide-react";
import { useNavigation } from "@/contexts/navigation-context";
import { useRouter } from "next/navigation";

interface NavigationHeaderProps {
  isOpen: boolean;
}

export function NavigationHeader({ isOpen }: NavigationHeaderProps) {
  const { toggleNav } = useNavigation();
  const router = useRouter();

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
  );
}
