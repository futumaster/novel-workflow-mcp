# Novel Workflow MCP

[![npm version](https://img.shields.io/npm/v/@ttaqt/novel-workflow-mcp)](https://www.npmjs.com/package/@ttaqt/novel-workflow-mcp)

一个基于 Model Context Protocol (MCP) 的AI辅助小说创作工作流服务器，配备实时仪表板和VSCode扩展。

## ✨ 核心特性

- **结构化小说创作工作流** - 按照专业步骤创作（故事概念 → 大纲 → 场景 → 正文）
- **实时Web仪表板** - 监控创作进度、大纲和场景状态
- **VSCode扩展** - 在VSCode侧边栏集成仪表板
- **审批工作流** - 完整的大纲审批流程和修订管理
- **场景进度跟踪** - 可视化进度条和详细状态
- **多语言支持** - 支持11种语言

## 🌍 支持的语言

🇺🇸 English • 🇯🇵 日本語 • 🇨🇳 中文 • 🇪🇸 Español • 🇧🇷 Português • 🇩🇪 Deutsch • 🇫🇷 Français • 🇷🇺 Русский • 🇮🇹 Italiano • 🇰🇷 한국어 • 🇸🇦 العربية

## 🚀 快速开始

### 步骤 1: 添加到你的AI工具

添加到你的MCP配置（详见下方客户端配置）：

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": ["-y", "@ttaqt/novel-workflow-mcp@latest", "/path/to/your/novel-project"]
    }
  }
}
```

自动启动仪表板：
```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": ["-y", "@ttaqt/novel-workflow-mcp@latest", "/path/to/your/novel-project", "--AutoStartDashboard"]
    }
  }
}
```

### 步骤 2: 选择你的界面

**选项 A: Web 仪表板**（CLI用户必选）
```bash
npx -y @ttaqt/novel-workflow-mcp@latest /path/to/your/novel-project --dashboard
```

**选项 B: VSCode 扩展**（推荐VSCode用户）

从VSCode市场安装 Novel Workflow MCP Extension

## 📝 如何使用

在对话中直接提及novel-workflow：

- **"为我的玄幻小说创建故事概念"** - 创建完整的故事框架
- **"列出我的所有作品"** - 显示所有作品及其状态
- **"撰写第1章第2场景"** - 执行特定场景的写作

## 🔧 MCP 客户端配置

<details>
<summary><strong>Claude Desktop</strong></summary>

添加到 `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": ["-y", "@ttaqt/novel-workflow-mcp@latest", "/path/to/your/novel-project"]
    }
  }
}
```

或自动启动仪表板：
```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": ["-y", "@ttaqt/novel-workflow-mcp@latest", "/path/to/your/novel-project", "--AutoStartDashboard"]
    }
  }
}
```
</details>

<details>
<summary><strong>Cursor IDE</strong></summary>

添加到Cursor设置 (`settings.json`):
```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": ["-y", "@ttaqt/novel-workflow-mcp@latest", "/path/to/your/novel-project"]
    }
  }
}
```
</details>

## 📚 小说创作工作流

### 阶段 1: 故事基础设定

创建三个核心指导文档：

#### 1. 故事概念 (`steering/story-concept.md`)
- 一句话故事概括
- 一段式故事梗概（五句话，三幕式结构）
- 故事类型和主题
- 两难性时刻设计
- 道德前提

#### 2. 世界观设定 (`steering/world-building.md`)
- 世界观背景
- 时代设定
- 地理环境
- 社会结构
- 魔法/科技体系（如适用）

#### 3. 人物设定 (`steering/character-profiles.md`)
- 主要人物档案
- 人物背景故事
- 人物目标与动机
- 人物关系图谱
- 人物成长弧线

### 阶段 2: 大纲创作

每个作品包含三个递进文档：

#### 简要大纲 (`outline-brief.md`)
- 一句话概括
- 一段式大纲（五句话）
- 核心冲突
- 主要人物介绍

#### 详细大纲 (`outline-detailed.md`)
- 四页详细大纲（每页约1500字）
- 完整三幕式结构
- 详细人物线
- 关键情节点

#### 场景清单 (`scenes.md`)
- 场景列表和编号
- 每个场景的核心冲突
- 场景类型（主动/被动）
- 场景要素（目标/冲突/挫折 或 反应/困境/决定）

### 阶段 3: 审批与修订

1. **文档创建** - AI生成文档
2. **审批请求** - 自动请求审批
3. **用户审阅** - 在仪表板/扩展中审阅
4. **决策** - 批准、请求修改或拒绝
5. **修订**（如需要） - AI根据反馈更新
6. **最终批准** - 文档锁定，开始创作

### 阶段 4: 场景创作

按场景清单逐个创作：
- 跟踪创作进度
- 标记完成的场景
- 监控整体进展

## 📁 项目结构

```
your-novel-project/
  .novel-workflow/
    approvals/
    archive/
    stories/
      my-fantasy-novel/
        outline-brief.md
        outline-detailed.md
        scenes.md
    steering/
      story-concept.md
      world-building.md
      character-profiles.md
    templates/
    user-templates/
    config.example.toml
```

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 开发模式运行
npm run dev
```

## 📄 许可证

GPL-3.0

## 📖 小说创作步骤说明

本工具基于专业小说创作方法论，将AI辅助写作流程化：

1. **研读对标小说** - 提取核心概念
2. **一句话概括** - 类型+主角+任务
3. **一段式概括** - 五句话三幕式结构
4. **人物介绍** - 每个角色的完整档案
5. **故事大纲** - 从一页扩展到四页
6. **人物大纲** - 深挖人物背景
7. **场景生成** - 主动和被动场景列表
8. **场景清单** - 包含所有必要信息
9. **正文创作** - 逐场景/逐章节创作

## 🎯 创作原则

- **AI是辅助工具** - 真实情感体验仍需人类创作
- **结构化创作** - 遵循专业写作步骤
- **迭代完善** - 通过审批流程持续优化
- **进度可视化** - 清晰掌握创作进展
