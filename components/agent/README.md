# Agent 组件使用指南

## 概述

Agent 组件是一个可配置的 AI 助手系统，支持在不同页面上灵活启用或禁用功能。

## 配置方式

### 1. 使用页面名称自动配置（推荐）

```tsx
// 在页面组件中
export default function PortfolioPage() {
  return (
    <Layout locale={locale} pageName="portfolio">
      {/* 页面内容 */}
    </Layout>
  );
}
```

### 2. 使用 enableAgent 属性（简单配置）

```tsx
// 启用Agent
<Layout locale={locale} enableAgent={true}>
  {/* 页面内容 */}
</Layout>

// 禁用Agent
<Layout locale={locale} enableAgent={false}>
  {/* 页面内容 */}
</Layout>
```

### 3. 使用完整配置对象（高级配置）

```tsx
const customConfig = {
  enabled: true,
  showTrigger: true,
  showDialog: true,
  features: {
    chat: true,
    history: false,
    keyboardShortcuts: true,
  },
};

<Layout locale={locale} agentConfig={customConfig}>
  {/* 页面内容 */}
</Layout>;
```

## 预定义页面配置

### Dashboard 页面

- ✅ 完整 Agent 功能
- ✅ 聊天功能
- ✅ 历史记录
- ✅ 键盘快捷键

### Portfolio 页面

- ✅ 完整 Agent 功能
- ✅ 聊天功能
- ✅ 历史记录
- ✅ 键盘快捷键

### Users 页面

- ❌ 禁用 Agent 功能

### Documents 页面

- ✅ 只显示触发按钮
- ❌ 不显示对话框
- ✅ 键盘快捷键

### Analytics 页面

- ✅ 简化版 Agent
- ✅ 聊天功能
- ❌ 无历史记录
- ✅ 键盘快捷键

### Settings 页面

- ❌ 禁用 Agent 功能

## 自定义配置

### 配置选项

```typescript
interface AgentConfig {
  enabled: boolean; // 是否启用Agent功能
  showTrigger: boolean; // 是否显示触发按钮
  showDialog: boolean; // 是否显示对话框
  features?: {
    chat?: boolean; // 聊天功能
    history?: boolean; // 历史记录
    keyboardShortcuts?: boolean; // 键盘快捷键
  };
}
```

### 添加新页面配置

在 `components/agent/config.ts` 中添加新配置：

```typescript
export const PAGE_AGENT_CONFIG: Record<string, AgentConfig> = {
  // 现有配置...

  // 新页面配置
  "new-page": {
    enabled: true,
    showTrigger: true,
    showDialog: true,
    features: {
      chat: true,
      history: true,
      keyboardShortcuts: true,
    },
  },
};
```

## 功能特性

### 触发按钮

- 浮动在页面右下角
- 支持点击打开 Agent
- 当 Agent 打开时自动隐藏

### 对话框

- 支持侧边栏和全屏模式
- 可拖拽调整宽度
- 包含消息历史和输入框

### 键盘快捷键

- `⌘K` / `Ctrl+K`: 打开 Agent
- `Escape`: 关闭 Agent

### 响应式设计

- 自动适配不同屏幕尺寸
- 移动端友好的交互

## 最佳实践

1. **使用页面名称配置**: 推荐使用 `pageName` 属性，便于统一管理
2. **合理配置功能**: 根据页面需求选择合适的 Agent 功能
3. **性能考虑**: 在不需要 Agent 的页面上禁用功能
4. **用户体验**: 保持一致的交互模式

## 故障排除

### Agent 不显示

- 检查 `enableAgent` 或 `pageName` 配置
- 确认页面配置中 `showTrigger` 为 `true`

### 对话框不工作

- 检查 `showDialog` 配置
- 确认 Agent context 正确加载

### 键盘快捷键不响应

- 检查 `keyboardShortcuts` 配置
- 确认页面有焦点
