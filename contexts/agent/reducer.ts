import { AgentState, AgentAction } from "./types";
import { initialState } from "./constants";

// Reducer 函数
export function agentReducer(
  state: AgentState,
  action: AgentAction
): AgentState {
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

    case "SET_MODE":
      return { ...state, mode: action.payload };

    default:
      return state;
  }
}

// 重置状态到初始值
export const resetAgentState = (): AgentState => initialState;
