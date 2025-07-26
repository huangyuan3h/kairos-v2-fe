import { useCallback } from "react";
import { useAgent } from "./context";
import { agentActions } from "./actions";
import { AgentMessage, AgentMode } from "./types";

// 便捷的 Hook 方法
export function useAgentActions() {
  const { dispatch } = useAgent();

  const openAgent = useCallback(() => {
    dispatch(agentActions.openAgent());
  }, [dispatch]);

  const closeAgent = useCallback(() => {
    dispatch(agentActions.closeAgent());
  }, [dispatch]);

  const toggleAgent = useCallback(() => {
    dispatch(agentActions.toggleAgent());
  }, [dispatch]);

  const setLoading = useCallback(
    (isLoading: boolean) => {
      dispatch(agentActions.setLoading(isLoading));
    },
    [dispatch]
  );

  const addMessage = useCallback(
    (message: Omit<AgentMessage, "id" | "timestamp">) => {
      const newMessage: AgentMessage = {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date(),
      };
      dispatch(agentActions.addMessage(newMessage));
    },
    [dispatch]
  );

  const setError = useCallback(
    (error: string | null) => {
      dispatch(agentActions.setError(error));
    },
    [dispatch]
  );

  const clearMessages = useCallback(() => {
    dispatch(agentActions.clearMessages());
  }, [dispatch]);

  const setMode = useCallback(
    (mode: AgentMode) => {
      dispatch(agentActions.setMode(mode));
    },
    [dispatch]
  );

  return {
    openAgent,
    closeAgent,
    toggleAgent,
    setLoading,
    addMessage,
    setError,
    clearMessages,
    setMode,
  };
}

// 状态选择器 Hook
export function useAgentState() {
  const { state } = useAgent();

  return {
    isOpen: state.isOpen,
    isLoading: state.isLoading,
    messages: state.messages,
    error: state.error,
    mode: state.mode,
    hasMessages: state.messages.length > 0,
    messageCount: state.messages.length,
  };
}
