"use client";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import React, { KeyboardEvent, useEffect, useRef } from "react";

interface AgentDialogInputProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function AgentDialogInput({
  inputValue,
  onInputChange,
  onSubmit,
  isSubmitting,
}: AgentDialogInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动调整textarea高度
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [inputValue]);

  // 处理键盘事件
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter键发送消息，Shift+Enter换行
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isSubmitting) {
        // 创建一个模拟的表单提交事件
        const form = e.currentTarget.closest("form");
        if (form) {
          const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
          });
          form.dispatchEvent(submitEvent);
        }
      }
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <form onSubmit={onSubmit} className="relative">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={onInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            disabled={isSubmitting}
            className="min-h-[60px] max-h-[200px] resize-none pr-12 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm leading-relaxed"
            rows={1}
            style={{
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              lineHeight: "1.5",
              padding: "12px 16px",
            }}
          />

          {/* 提交状态指示器 */}
          <div className="absolute right-3 bottom-3 pointer-events-none">
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            ) : (
              <Send
                className={`h-4 w-4 transition-colors ${
                  inputValue.trim() ? "text-blue-500" : "text-gray-300"
                }`}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
