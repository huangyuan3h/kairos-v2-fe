"use client";
import { Sparkles } from "lucide-react";

export function AgentDialogWelcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
        <Sparkles className="h-8 w-8 text-blue-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">Welcome to AI Assistant</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Ask me anything about your project or get help with tasks.
        </p>
      </div>
    </div>
  );
}
