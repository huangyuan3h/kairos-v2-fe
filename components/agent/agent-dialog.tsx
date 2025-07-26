"use client";

import { useAgent, useAgentActions, useAgentState } from "@/contexts/agent";
import { useNavigation } from "@/contexts/navigation-context";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { AgentDialogHeader } from "./AgentDialogHeader";
import { AgentDialogMessages } from "./AgentDialogMessages";
import { AgentDialogInput } from "./AgentDialogInput";
import { AgentDialogHistory } from "./AgentDialogHistory";

interface AgentDialogProps {
  className?: string;
}

export function AgentDialog({ className }: AgentDialogProps) {
  const { state } = useAgent();
  const { closeAgent, addMessage, clearMessages, setMode } = useAgentActions();
  const { isOpen, isLoading, messages, mode } = useAgentState();
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string>("1");
  const messagesEndRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const inputRef = useRef<HTMLInputElement>(
    null
  ) as React.RefObject<HTMLInputElement>;
  const { navWidth } = useNavigation();

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 聚焦输入框
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // 处理消息发送
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSubmitting) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setIsSubmitting(true);

    // 添加用户消息
    addMessage({
      role: "user",
      content: userMessage,
    });

    try {
      // TODO: 这里将来会集成 AI SDK
      // 模拟 AI 响应
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addMessage({
        role: "assistant",
        content: `I received your message: "${userMessage}". This is a placeholder response. The AI integration will be implemented soon!`,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 格式化时间
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // 切换模式
  const toggleMode = () => {
    if (mode === "sidebar") {
      setMode("fullscreen");
    } else {
      setMode("sidebar");
    }
  };

  // 会话管理
  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    // TODO: 加载对应会话的消息
    console.log("切换到会话:", sessionId);
  };

  const handleNewSession = () => {
    // TODO: 创建新会话
    console.log("创建新会话");
  };

  const handleDeleteSession = (sessionId: string) => {
    // TODO: 删除会话
    console.log("删除会话:", sessionId);
  };

  if (!isOpen) return null;

  // 渲染不同模式的对话框
  const renderDialog = () => {
    const dialogContent = (
      <Card
        className={cn(
          "flex flex-col py-2",
          mode === "sidebar" &&
            "border-0 bg-white/95 backdrop-blur-sm w-full h-full rounded-xl",
          mode === "fullscreen" &&
            "w-full h-full bg-white rounded-none border-0",
          className
        )}
      >
        {/* 头部 */}
        <AgentDialogHeader
          mode={mode}
          isLoading={isLoading}
          onToggleMode={toggleMode}
          onClearMessages={clearMessages}
          onClose={closeAgent}
        />
        {/* 消息列表 */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          <AgentDialogMessages
            messages={messages}
            isLoading={isLoading}
            formatTime={formatTime}
            messagesEndRef={messagesEndRef}
          />
        </CardContent>
        {/* 输入区域 */}
        <AgentDialogInput
          inputValue={inputValue}
          onInputChange={(e) => setInputValue(e.target.value)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          inputRef={inputRef}
        />
      </Card>
    );

    switch (mode) {
      case "fullscreen":
        return (
          <div
            className="fixed top-0 right-0 h-full z-50 bg-white flex"
            style={{ left: navWidth }}
          >
            {/* 左侧历史记录 */}
            <AgentDialogHistory
              onSelectSession={handleSelectSession}
              onNewSession={handleNewSession}
              onDeleteSession={handleDeleteSession}
              currentSessionId={currentSessionId}
            />
            {/* 右侧对话区域 */}
            <div className="flex-1">{dialogContent}</div>
          </div>
        );
      case "sidebar":
        return (
          <div className="fixed top-0 right-0 h-full w-96 z-50 bg-white border-l border-gray-200">
            {dialogContent}
          </div>
        );
      default:
        return null;
    }
  };

  return renderDialog();
}
