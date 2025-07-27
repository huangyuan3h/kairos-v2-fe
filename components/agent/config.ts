// Agent配置类型
export interface AgentConfig {
  enabled: boolean;
  showTrigger: boolean;
  showDialog: boolean;
  features?: {
    chat?: boolean;
    history?: boolean;
    keyboardShortcuts?: boolean;
  };
}

// 页面Agent配置映射
export const PAGE_AGENT_CONFIG: Record<string, AgentConfig> = {
  // Dashboard页面 - 完整Agent功能
  dashboard: {
    enabled: true,
    showTrigger: true,
    showDialog: true,
    features: {
      chat: true,
      history: true,
      keyboardShortcuts: true,
    },
  },

  // Portfolio页面 - 完整Agent功能
  portfolio: {
    enabled: true,
    showTrigger: true,
    showDialog: true,
    features: {
      chat: true,
      history: true,
      keyboardShortcuts: true,
    },
  },

  // Analysis页面 - 完整Agent功能
  analysis: {
    enabled: true,
    showTrigger: true,
    showDialog: true,
    features: {
      chat: true,
      history: true,
      keyboardShortcuts: true,
    },
  },

  // Users页面 - 禁用Agent
  users: {
    enabled: false,
    showTrigger: false,
    showDialog: false,
  },

  // Documents页面 - 只显示触发按钮，不显示对话框
  documents: {
    enabled: true,
    showTrigger: true,
    showDialog: false,
    features: {
      chat: false,
      history: false,
      keyboardShortcuts: true,
    },
  },

  // Analytics页面 - 简化版Agent
  analytics: {
    enabled: true,
    showTrigger: true,
    showDialog: true,
    features: {
      chat: true,
      history: false,
      keyboardShortcuts: true,
    },
  },

  // Settings页面 - 禁用Agent
  settings: {
    enabled: false,
    showTrigger: false,
    showDialog: false,
  },
};

// 获取页面配置的辅助函数
export function getPageAgentConfig(pageName: string): AgentConfig {
  return (
    PAGE_AGENT_CONFIG[pageName] || {
      enabled: true,
      showTrigger: true,
      showDialog: true,
      features: {
        chat: true,
        history: true,
        keyboardShortcuts: true,
      },
    }
  );
}
