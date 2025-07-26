"use client";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, X, Maximize2, Minimize2, History, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface AgentDialogHeaderProps {
  mode: "sidebar" | "fullscreen";
  isLoading: boolean;
  onToggleMode: () => void;
  onClearMessages: () => void;
  onClose: () => void;
}

export function AgentDialogHeader({
  mode,
  isLoading,
  onToggleMode,
  onClearMessages,
  onClose,
}: AgentDialogHeaderProps) {
  // mock 历史会话
  const mockHistory = [
    { id: "1", title: "Project Discussion" },
    { id: "2", title: "Code Review" },
    { id: "3", title: "API Design" },
  ];

  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 !pt-2 !pb-4 border-b">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div>
          <CardTitle className="text-lg font-semibold">Kairos AI</CardTitle>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleMode}
          className="h-8 w-8 p-0"
          title={`Switch to ${
            mode === "sidebar" ? "fullscreen" : "sidebar"
          } mode`}
        >
          {mode === "sidebar" ? (
            <Maximize2 className="h-4 w-4" />
          ) : (
            <Minimize2 className="h-4 w-4" />
          )}
        </Button>

        {/* Sidebar 模式：History 按钮 + Dropdown */}
        {mode === "sidebar" && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                title="History"
              >
                <History className="h-4 w-4" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              side="bottom"
              align="end"
              className="w-56 bg-white border rounded-md shadow-lg p-1"
            >
              <DropdownMenu.Item
                onSelect={onClearMessages}
                className="px-2 py-1.5 rounded hover:bg-gray-100 cursor-pointer"
              >
                New session
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
              <div className="px-2 py-1 text-xs text-muted-foreground">
                History
              </div>
              {mockHistory.map((item) => (
                <DropdownMenu.Item
                  key={item.id}
                  className="px-2 py-1.5 rounded hover:bg-gray-100 cursor-pointer"
                >
                  {item.title}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}

        {/* Fullscreen 模式：Plus 按钮直接点击 */}
        {mode === "fullscreen" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearMessages}
            className="h-8 w-8 p-0"
            title="New session"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
}
