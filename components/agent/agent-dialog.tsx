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
  const { closeAgent, addMessage, clearMessages, setMode, setWidth } =
    useAgentActions();
  const { isOpen, isLoading, messages, mode, width } = useAgentState();
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string>("1");
  const [isDragging, setIsDragging] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const inputRef = useRef<HTMLTextAreaElement>(
    null
  ) as React.RefObject<HTMLTextAreaElement>;
  const { navWidth } = useNavigation();

  // 确保客户端渲染
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // 拖动处理
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newWidth = window.innerWidth - e.clientX;
      const clampedWidth = Math.max(320, Math.min(800, newWidth));
      setWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      document.body.style.pointerEvents = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.body.style.pointerEvents = "";
    };
  }, [isDragging, setWidth]);

  if (!isOpen || !isClient) return null;

  // 渲染不同模式的对话框
  const renderDialog = () => {
    const dialogContent = (
      <Card
        className={cn(
          "flex flex-col py-2 h-full",
          mode === "sidebar" &&
            "border-0 bg-white/95 backdrop-blur-sm w-full rounded-none",
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
          <div
            className="fixed top-0 right-0 h-full z-50 bg-white border-l border-gray-200"
            style={{ width: width }}
          >
            {/* 拖动手柄 - 增加宽度和视觉提示 */}
            <div
              className="absolute left-0 top-0 w-4 h-full cursor-col-resize group z-10"
              onMouseDown={handleMouseDown}
            >
              {/* 拖动手柄的视觉指示器 */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-20 bg-gray-300 rounded-full group-hover:bg-gray-400 group-hover:h-24 transition-all duration-200" />
            </div>
            {dialogContent}
          </div>
        );
      default:
        return null;
    }
  };

  return renderDialog();
}
