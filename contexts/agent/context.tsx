"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { AgentState, AgentAction } from "./types";
import { initialState } from "./constants";
import { agentReducer } from "./reducer";

// Context 类型定义
interface AgentContextType {
  state: AgentState;
  dispatch: React.Dispatch<AgentAction>;
}

// 创建 Context
const AgentContext = createContext<AgentContextType | undefined>(undefined);

// Provider 组件
interface AgentProviderProps {
  children: ReactNode;
}

export function AgentProvider({ children }: AgentProviderProps) {
  const [state, dispatch] = useReducer(agentReducer, initialState);

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
