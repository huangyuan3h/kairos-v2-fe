"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  ChevronDown,
  Settings,
  LogOut,
  User,
  MessageSquare,
  Mail,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HeaderSearch } from "./header-search";

export function HeaderActions() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: "message",
      title: "New message from John",
      description: "Hey, can you review the latest design?",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "email",
      title: "Email from support",
      description: "Your ticket has been resolved",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "success",
      title: "Task completed",
      description: "Project setup has been completed",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 4,
      type: "warning",
      title: "System update",
      description: "Scheduled maintenance in 2 hours",
      time: "1 day ago",
      unread: false,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "email":
        return <Mail className="h-4 w-4 text-green-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex items-center space-x-3">
      {/* Search */}
      <HeaderSearch />
      {/* Notifications */}
      <DropdownMenu.Root
        open={isNotificationOpen}
        onOpenChange={setIsNotificationOpen}
      >
        <DropdownMenu.Trigger asChild>
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side="bottom"
            align="end"
            sideOffset={4}
            className="w-80 bg-white border rounded-md shadow-lg p-1 z-50"
          >
            <div className="px-3 py-2 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">
                Notifications
              </h3>
              <p className="text-xs text-gray-500">{unreadCount} unread</p>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenu.Item
                  key={notification.id}
                  className={cn(
                    "px-3 py-2 rounded cursor-pointer flex items-start space-x-3 hover:bg-gray-50 focus:bg-gray-50 outline-none",
                    notification.unread && "bg-blue-50"
                  )}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        notification.unread ? "text-gray-900" : "text-gray-700"
                      )}
                    >
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                  {notification.unread && (
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  )}
                </DropdownMenu.Item>
              ))}
            </div>
            <div className="px-3 py-2 border-t border-gray-200">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View all notifications
              </Button>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* User menu */}
      <DropdownMenu.Root open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
        <DropdownMenu.Trigger asChild>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 px-2 py-1.5 h-auto"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user.jpg" alt="User" />
              <AvatarFallback className="bg-blue-500 text-white text-sm font-medium">
                U
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm font-medium">
              User Name
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side="bottom"
            align="end"
            sideOffset={4}
            className="w-48 bg-white border rounded-md shadow-lg p-1 z-50"
          >
            <DropdownMenu.Item className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer flex items-center focus:bg-gray-100 outline-none">
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenu.Item>
            <DropdownMenu.Item className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer flex items-center focus:bg-gray-100 outline-none">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="border-t border-gray-200 my-1" />
            <DropdownMenu.Item className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer flex items-center text-red-600 hover:text-red-700 focus:bg-gray-100 outline-none">
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
