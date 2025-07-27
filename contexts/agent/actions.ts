import { AgentAction, AgentMessage, AgentMode } from "./types";

// 打开 Agent
export const openAgent = (): AgentAction => ({
  type: "OPEN_AGENT",
});

// 关闭 Agent
export const closeAgent = (): AgentAction => ({
  type: "CLOSE_AGENT",
});

// 切换 Agent 开关状态
export const toggleAgent = (): AgentAction => ({
  type: "TOGGLE_AGENT",
});

// 设置加载状态
export const setLoading = (isLoading: boolean): AgentAction => ({
  type: "SET_LOADING",
  payload: isLoading,
});

// 添加消息
export const addMessage = (message: AgentMessage): AgentAction => ({
  type: "ADD_MESSAGE",
  payload: message,
});

// 设置错误
export const setError = (error: string | null): AgentAction => ({
  type: "SET_ERROR",
  payload: error,
});

// 清除所有消息
export const clearMessages = (): AgentAction => ({
  type: "CLEAR_MESSAGES",
});

// 设置 Agent 模式
export const setMode = (mode: AgentMode): AgentAction => ({
  type: "SET_MODE",
  payload: mode,
});

// 重置 Agent 状态（清除所有数据）
export const resetAgent = (): AgentAction => ({
  type: "RESET_AGENT",
});
