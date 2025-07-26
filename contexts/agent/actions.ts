import { AgentAction, AgentMessage, AgentMode } from "./types";

// Action 创建器
export const agentActions = {
  openAgent: (): AgentAction => ({ type: "OPEN_AGENT" }),

  closeAgent: (): AgentAction => ({ type: "CLOSE_AGENT" }),

  toggleAgent: (): AgentAction => ({ type: "TOGGLE_AGENT" }),

  setLoading: (isLoading: boolean): AgentAction => ({
    type: "SET_LOADING",
    payload: isLoading,
  }),

  addMessage: (message: AgentMessage): AgentAction => ({
    type: "ADD_MESSAGE",
    payload: message,
  }),

  setError: (error: string | null): AgentAction => ({
    type: "SET_ERROR",
    payload: error,
  }),

  clearMessages: (): AgentAction => ({ type: "CLEAR_MESSAGES" }),

  setMode: (mode: AgentMode): AgentAction => ({
    type: "SET_MODE",
    payload: mode,
  }),
};
