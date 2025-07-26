import { AgentState } from "./types";

// 初始状态
export const initialState: AgentState = {
  isOpen: false,
  isLoading: false,
  messages: [],
  error: null,
  mode: "sidebar",
};
