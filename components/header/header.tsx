"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Bell,
  ChevronDown,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  className?: string;
  title?: string;
  breadcrumb?: string[];
}

export function Header({
  className,
  title = "Dashboard",
  breadcrumb = ["Home"],
}: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "flex items-center justify-between px-6 pt-4 pb-3 bg-white border-b border-gray-200",
        className
      )}
    >
      {/* Left side - Breadcrumb and title */}
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
      </div>

      {/* Right side - Search, notifications, and user menu */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </Button>

        {/* User menu */}
        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">U</span>
            </div>
            <span className="hidden md:block text-sm font-medium">
              User Name
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {/* Dropdown menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="border-t border-gray-200 my-1"></div>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
