"use client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

interface AgentDialogHistoryProps {
  onSelectSession: (sessionId: string) => void;
  onNewSession: () => void;
  onDeleteSession: (sessionId: string) => void;
  currentSessionId?: string;
}

// Mock 数据 - 使用固定的时间戳避免hydration错误
const mockSessions: ChatSession[] = [
  {
    id: "1",
    title: "项目架构讨论",
    lastMessage: "我们需要重新设计数据库结构来支持新的功能需求...",
    timestamp: new Date("2024-01-15T10:00:00Z"), // 固定时间戳
    messageCount: 12,
  },
  {
    id: "2",
    title: "代码审查",
    lastMessage: "这个组件的性能优化建议很好，我们可以进一步优化...",
    timestamp: new Date("2024-01-15T08:00:00Z"), // 固定时间戳
    messageCount: 8,
  },
  {
    id: "3",
    title: "API 设计",
    lastMessage: "RESTful API 的设计原则需要遵循统一的命名规范...",
    timestamp: new Date("2024-01-14T10:00:00Z"), // 固定时间戳
    messageCount: 15,
  },
  {
    id: "4",
    title: "部署策略",
    lastMessage: "蓝绿部署和滚动部署各有优势，我们需要根据业务场景选择...",
    timestamp: new Date("2024-01-13T10:00:00Z"), // 固定时间戳
    messageCount: 6,
  },
  {
    id: "5",
    title: "性能优化",
    lastMessage: "通过代码分割和懒加载可以显著提升首屏加载速度...",
    timestamp: new Date("2024-01-12T10:00:00Z"), // 固定时间戳
    messageCount: 20,
  },
];

export function AgentDialogHistory({
  onSelectSession,
  onNewSession,
  onDeleteSession,
  currentSessionId,
}: AgentDialogHistoryProps) {
  const [sessions] = useState<ChatSession[]>(mockSessions);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}分钟前`;
    } else if (hours < 24) {
      return `${hours}小时前`;
    } else {
      return `${days}天前`;
    }
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">聊天记录</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onNewSession}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={cn(
              "p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors",
              currentSessionId === session.id && "bg-blue-50 border-blue-200"
            )}
            onClick={() => onSelectSession(session.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <MessageSquare className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <h4 className="font-medium text-gray-900 truncate">
                    {session.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {truncateText(session.lastMessage)}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatTime(session.timestamp)}</span>
                  </div>
                  <span>{session.messageCount} 条消息</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
              >
                <Trash2 className="h-3 w-3 text-gray-400 hover:text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          共 {sessions.length} 个会话
        </p>
      </div>
    </div>
  );
}
