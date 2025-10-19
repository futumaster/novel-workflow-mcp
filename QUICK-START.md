# 🚀 快速开始指南

## 📦 第一步：发布到 npm

在终端中运行：

```bash
cd /Users/wenxinhuang/novel-workflow-mcp

# 1. 登录 npm（如果还未登录）
npm login

# 2. 确保已构建（已完成✅）
npm run build

# 3. 发布到 npm
npm publish --access public
```

**预期输出**：
```
npm notice 📦  @ttaqt/novel-workflow-mcp@1.0.0
npm notice === Tarball Contents ===
...
npm notice === Tarball Details ===
...
+ @ttaqt/novel-workflow-mcp@1.0.0
```

**发布完成后可访问**：
- https://www.npmjs.com/package/@ttaqt/novel-workflow-mcp

---

## ⚙️ 第二步：配置 Cursor

### 方法 A：直接复制配置（推荐）

1. **找到 Cursor 配置文件**

在终端运行：
```bash
# macOS/Linux
code ~/.cursor/mcp.json

# 或者在 Cursor 中：
# Cmd+Shift+P → "Preferences: Open Settings (JSON)"
# 然后搜索 mcp
```

2. **添加配置**

将以下内容添加到配置文件中（**注意替换路径**）：

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "/Users/wenxinhuang/novels/my-story",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

**重要**：将 `/Users/wenxinhuang/novels/my-story` 替换为你的实际小说项目路径！

### 方法 B：使用配置文件

我已为你生成了配置文件：`cursor-mcp-config.json`

1. 编辑 `cursor-mcp-config.json`，修改项目路径
2. 复制内容到 Cursor 的 MCP 配置中

---

## 🎯 第三步：开始使用

### 1. 重启 Cursor

配置完成后重启 Cursor 使配置生效。

### 2. 创建小说项目目录

```bash
mkdir -p ~/novels/my-fantasy-novel
cd ~/novels/my-fantasy-novel
```

### 3. 在 Cursor 中开始创作

打开 Cursor，在对话中输入：

```
"创建故事概念文档"
```

AI 将引导你完成：
1. ✨ 创建故事概念（一句话+五句话+两难抉择）
2. 🌍 创建世界观设定（可选）
3. 👥 创建人物档案（可选）
4. 📝 创建简要大纲
5. 📚 扩展为详细大纲
6. 🎬 生成场景清单
7. ✍️ 逐场景创作

### 4. 查看仪表板

如果配置了 `--AutoStartDashboard`，浏览器会自动打开仪表板：
- 实时查看创作进度
- 审批大纲文档
- 管理场景状态

---

## 📋 配置选项说明

### 基础配置（推荐）

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "/path/to/your/novel"
      ]
    }
  }
}
```

### 带仪表板（推荐）

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "/path/to/your/novel",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

### 指定端口

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "/path/to/your/novel",
        "--AutoStartDashboard",
        "--port",
        "3456"
      ]
    }
  }
}
```

### 多个小说项目

```json
{
  "mcpServers": {
    "novel-fantasy": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "~/novels/fantasy-adventure",
        "--AutoStartDashboard"
      ]
    },
    "novel-urban": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "~/novels/urban-romance",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

### 使用本地版本（开发/测试）

```json
{
  "mcpServers": {
    "novel-workflow-dev": {
      "command": "node",
      "args": [
        "/Users/wenxinhuang/novel-workflow-mcp/dist/index.js",
        "/path/to/your/novel",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

---

## ✅ 验证配置

### 1. 检查 MCP 是否加载

在 Cursor 中，打开命令面板（Cmd+Shift+P），搜索 "MCP"，应该能看到 novel-workflow 相关工具。

### 2. 测试基本功能

在 Cursor 的 AI 对话中输入：

```
"使用 novel-workflow 显示工作流程指南"
```

应该看到完整的小说创作工作流程说明。

### 3. 创建测试项目

```
"创建一个测试故事的故事概念"
```

检查是否在项目目录下生成：
```
your-project/
  .novel-workflow/
    templates/    # 6个模板
    steering/     # 指导文档（待创建）
    stories/      # 你的作品（待创建）
```

---

## 🎬 完整创作流程示例

### 步骤1：创建指导文档（推荐）

```
用户："创建故事概念文档，这是一个玄幻修真小说"
AI：[创建 story-concept.md]
用户：[在仪表板审批]
AI：[继续下一步]

用户："创建世界观设定文档"
AI：[创建 world-building.md]
...
```

### 步骤2：创建作品大纲

```
用户："创建 immortal-journey 的简要大纲，
      主角是废材少年，获得神秘传承后踏上修仙之路"
AI：[创建 outline-brief.md]
用户：[审批]

用户："扩展为详细大纲"
AI：[创建 outline-detailed.md，四页约6000字]
用户：[审批]
```

### 步骤3：生成场景并创作

```
用户："生成场景清单"
AI：[创建 scenes.md，包含所有场景]
用户：[审批]

用户："撰写场景 1.1"
AI：[撰写第1章第1场景]

用户："继续撰写场景 1.2"
AI：[撰写第1章第2场景]
...
```

### 步骤4：查看进度

```
用户："查看创作进度"
AI：[显示已完成场景、剩余场景、完成百分比]
```

---

## 💡 最佳实践

1. **先设定后创作** - 完成指导文档再开始大纲
2. **逐步审批** - 每个阶段都仔细审批
3. **保持一致** - 参考指导文档保持设定一致
4. **定期备份** - 及时提交到 git
5. **使用仪表板** - 可视化跟踪进度

---

## 🆘 获取帮助

### 在 Cursor 中

```
"显示小说创作工作流程"
"如何创建故事概念？"
"场景清单是什么？"
```

### 文档资源

- `README.md` - 项目概述
- `WORKFLOW.md` - 详细工作流程
- `PROMPTING-GUIDE.md` - 提示词示例
- `MIGRATION-GUIDE.md` - 技术细节

### 在线资源

- GitHub: https://github.com/futumaster/novel-workflow-mcp
- npm: https://www.npmjs.com/package/@ttaqt/novel-workflow-mcp

---

## 🎉 开始创作！

一切就绪！现在你可以：
1. 发布到 npm
2. 配置 Cursor
3. 开始你的小说创作之旅！

祝创作愉快！✨📖✨

