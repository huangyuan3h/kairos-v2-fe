// Agent 模式类型定义
export type AgentMode = "fullscreen" | "sidebar";

// Agent 状态类型定义
export interface AgentState {
  isOpen: boolean;
  isLoading: boolean;
  messages: AgentMessage[];
  error: string | null;
  mode: AgentMode;
}

// 消息类型定义
export interface AgentMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Action 类型定义
export type AgentAction =
  | { type: "OPEN_AGENT" }
  | { type: "CLOSE_AGENT" }
  | { type: "TOGGLE_AGENT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "ADD_MESSAGE"; payload: AgentMessage }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_MESSAGES" }
  | { type: "SET_MODE"; payload: AgentMode };
