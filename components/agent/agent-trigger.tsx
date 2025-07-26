"use client";

import { useAgent, useAgentActions } from "@/contexts/agent";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface AgentTriggerProps {
  className?: string;
}

export function AgentTrigger({ className }: AgentTriggerProps) {
  const { state } = useAgent();
  const { toggleAgent } = useAgentActions();

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + K 打开 Agent
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        toggleAgent();
      }
      // Escape 关闭 Agent
      if (event.key === "Escape" && state.isOpen) {
        event.preventDefault();
        toggleAgent();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleAgent, state.isOpen]);

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleAgent}
            size="lg"
            className={cn(
              "relative h-12 w-12 rounded-full shadow-lg transition-all duration-200",
              "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
              "text-white border-0 cursor-pointer",
              state.isOpen && "scale-95"
            )}
          >
            <Bot className="h-8 w-8" />

            {/* 状态指示器 */}
            {state.isLoading && (
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="flex flex-col items-center space-y-1"
        >
          <div className="flex items-center space-x-1">
            <Sparkles className="h-3 w-3" />
            <span>AI Assistant</span>
          </div>
          <div className="text-xs text-muted-foreground">Press ⌘K to open</div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
