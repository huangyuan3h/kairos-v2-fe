"use client";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, X, Trash2, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div>
          <CardTitle className="text-lg font-semibold">AI Assistant</CardTitle>
          <p className="text-xs text-muted-foreground">
            {isLoading ? "Thinking..." : "Ready to help"}
          </p>
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
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearMessages}
          className="h-8 w-8 p-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
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
