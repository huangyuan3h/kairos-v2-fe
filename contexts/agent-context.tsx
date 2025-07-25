"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Agent 状态类型定义
interface AgentState {
  isOpen: boolean;
  isLoading: boolean;
  messages: AgentMessage[];
  error: string | null;
}

// 消息类型定义
interface AgentMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Action 类型定义
type AgentAction =
  | { type: "OPEN_AGENT" }
  | { type: "CLOSE_AGENT" }
  | { type: "TOGGLE_AGENT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "ADD_MESSAGE"; payload: AgentMessage }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_MESSAGES" };

// 初始状态
const initialState: AgentState = {
  isOpen: false,
  isLoading: false,
  messages: [],
  error: null,
};

// Reducer 函数
function agentReducer(state: AgentState, action: AgentAction): AgentState {
  switch (action.type) {
    case "OPEN_AGENT":
      return { ...state, isOpen: true, error: null };
    case "CLOSE_AGENT":
      return { ...state, isOpen: false };
    case "TOGGLE_AGENT":
      return { ...state, isOpen: !state.isOpen, error: null };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_MESSAGES":
      return { ...state, messages: [] };
    default:
      return state;
  }
}

// Context 类型定义
interface AgentContextType {
  state: AgentState;
  dispatch: React.Dispatch<AgentAction>;
  openAgent: () => void;
  closeAgent: () => void;
  toggleAgent: () => void;
  addMessage: (message: Omit<AgentMessage, "id" | "timestamp">) => void;
  clearMessages: () => void;
}

// 创建 Context
const AgentContext = createContext<AgentContextType | undefined>(undefined);

// Provider 组件
interface AgentProviderProps {
  children: ReactNode;
}

export function AgentProvider({ children }: AgentProviderProps) {
  const [state, dispatch] = useReducer(agentReducer, initialState);

  // 便捷方法
  const openAgent = () => dispatch({ type: "OPEN_AGENT" });
  const closeAgent = () => dispatch({ type: "CLOSE_AGENT" });
  const toggleAgent = () => dispatch({ type: "TOGGLE_AGENT" });

  const addMessage = (message: Omit<AgentMessage, "id" | "timestamp">) => {
    const newMessage: AgentMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    dispatch({ type: "ADD_MESSAGE", payload: newMessage });
  };

  const clearMessages = () => dispatch({ type: "CLEAR_MESSAGES" });

  const value: AgentContextType = {
    state,
    dispatch,
    openAgent,
    closeAgent,
    toggleAgent,
    addMessage,
    clearMessages,
  };

  return (
    <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
  );
}

// Hook 用于使用 Context
export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error("useAgent must be used within an AgentProvider");
  }
  return context;
}
