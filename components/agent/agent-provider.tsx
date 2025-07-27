"use client";

import { ReactNode } from "react";
import { AgentTrigger } from "./agent-trigger";
import { AgentDialog } from "./agent-dialog";
import { AgentConfig } from "./config";

interface AgentProviderProps {
  children: ReactNode;
  enabled?: boolean; // 是否启用Agent功能
  showTrigger?: boolean; // 是否显示触发按钮
  showDialog?: boolean; // 是否显示对话框
  config?: AgentConfig; // 完整配置对象
}

export function AgentProvider({
  children,
  enabled = true,
  showTrigger = true,
  showDialog = true,
  config,
}: AgentProviderProps) {
  // 如果提供了config，优先使用config
  const finalConfig = config || {
    enabled,
    showTrigger,
    showDialog,
  };

  return (
    <>
      {children}
      {finalConfig.enabled && finalConfig.showTrigger && <AgentTrigger />}
      {finalConfig.enabled && finalConfig.showDialog && <AgentDialog />}
    </>
  );
}
