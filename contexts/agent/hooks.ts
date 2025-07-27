import { useCallback } from "react";
import { useAgent } from "./context";
import {
  openAgent,
  closeAgent,
  toggleAgent,
  setLoading,
  addMessage as addMessageAction,
  setError,
  clearMessages,
  setMode,
  setWidth,
  resetAgent,
} from "./actions";
import { AgentMessage, AgentMode } from "./types";

// 便捷的 Hook 方法
export function useAgentActions() {
  const { dispatch } = useAgent();

  const openAgentHandler = useCallback(() => {
    dispatch(openAgent());
  }, [dispatch]);

  const closeAgentHandler = useCallback(() => {
    dispatch(closeAgent());
  }, [dispatch]);

  const toggleAgentHandler = useCallback(() => {
    dispatch(toggleAgent());
  }, [dispatch]);

  const setLoadingHandler = useCallback(
    (isLoading: boolean) => {
      dispatch(setLoading(isLoading));
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
      dispatch(addMessageAction(newMessage));
    },
    [dispatch]
  );

  const setErrorHandler = useCallback(
    (error: string | null) => {
      dispatch(setError(error));
    },
    [dispatch]
  );

  const clearMessagesHandler = useCallback(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  const setModeHandler = useCallback(
    (mode: AgentMode) => {
      dispatch(setMode(mode));
    },
    [dispatch]
  );

  const setWidthHandler = useCallback(
    (width: number) => {
      dispatch(setWidth(width));
    },
    [dispatch]
  );

  const resetAgentHandler = useCallback(() => {
    dispatch(resetAgent());
  }, [dispatch]);

  return {
    openAgent: openAgentHandler,
    closeAgent: closeAgentHandler,
    toggleAgent: toggleAgentHandler,
    setLoading: setLoadingHandler,
    addMessage,
    setError: setErrorHandler,
    clearMessages: clearMessagesHandler,
    setMode: setModeHandler,
    setWidth: setWidthHandler,
    resetAgent: resetAgentHandler,
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
    width: state.width,
    hasMessages: state.messages.length > 0,
    messageCount: state.messages.length,
  };
}
