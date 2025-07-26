"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import React from "react";

interface AgentDialogInputProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function AgentDialogInput({
  inputValue,
  onInputChange,
  onSubmit,
  isSubmitting,
  inputRef,
}: AgentDialogInputProps) {
  return (
    <div className="p-4 border-t">
      <form onSubmit={onSubmit} className="flex space-x-2">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={onInputChange}
          placeholder="Ask me anything..."
          disabled={isSubmitting}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={!inputValue.trim() || isSubmitting}
          size="sm"
          className="px-4"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
