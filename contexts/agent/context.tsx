"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { AgentState, AgentAction, AgentMessage } from "./types";
import { initialState } from "./constants";
import { agentReducer } from "./reducer";

// Context 类型定义
interface AgentContextType {
  state: AgentState;
  dispatch: React.Dispatch<AgentAction>;
}

// 创建 Context
const AgentContext = createContext<AgentContextType | undefined>(undefined);

// 持久化存储键
const AGENT_STORAGE_KEY = "kairos-agent-state";

// 从 localStorage 加载状态
const loadPersistedState = (): AgentState => {
  if (typeof window === "undefined") return initialState;

  try {
    const persisted = localStorage.getItem(AGENT_STORAGE_KEY);
    if (persisted) {
      const parsed = JSON.parse(persisted);
      // 确保时间戳被正确解析
      return {
        ...parsed,
        messages:
          parsed.messages?.map(
            (msg: { timestamp: string; [key: string]: unknown }) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })
          ) || [],
      };
    }
  } catch (error) {
    console.warn("Failed to load persisted agent state:", error);
  }

  return initialState;
};

// Provider 组件
interface AgentProviderProps {
  children: ReactNode;
}

export function AgentProvider({ children }: AgentProviderProps) {
  const [state, dispatch] = useReducer(agentReducer, loadPersistedState());

  // 持久化状态到 localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(AGENT_STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.warn("Failed to persist agent state:", error);
      }
    }
  }, [state]);

  const value: AgentContextType = {
    state,
    dispatch,
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
