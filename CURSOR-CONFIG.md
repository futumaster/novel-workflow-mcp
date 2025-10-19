# Cursor MCP 配置指南

## 📦 包已发布！

✅ **包名**: `@ttaqt/novel-workflow-mcp`  
✅ **版本**: `1.0.0`  
✅ **发布时间**: 刚刚  
✅ **NPM页面**: https://www.npmjs.com/package/@ttaqt/novel-workflow-mcp

---

## ⚙️ Cursor 配置（直接复制使用）

### 方法1：推荐配置（带自动仪表板）

将以下内容添加到 Cursor 的 MCP 设置中：

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "~/novels/my-story",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

**⚠️ 重要**：将 `~/novels/my-story` 替换为你的实际小说项目路径！

---

### 方法2：不带仪表板

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "~/novels/my-story"
      ]
    }
  }
}
```

---

### 方法3：指定端口

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "~/novels/my-story",
        "--AutoStartDashboard",
        "--port",
        "3456"
      ]
    }
  }
}
```

---

### 方法4：多个小说项目

```json
{
  "mcpServers": {
    "fantasy-novel": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "~/novels/fantasy-adventure",
        "--AutoStartDashboard",
        "--port",
        "3456"
      ]
    },
    "urban-novel": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "~/novels/urban-romance",
        "--AutoStartDashboard",
        "--port",
        "3457"
      ]
    }
  }
}
```

---

## 📍 配置文件位置

### macOS/Linux

```bash
~/.cursor/mcp.json
```

或者在 Cursor 中：
1. `Cmd+,` 打开设置
2. 搜索 "MCP"
3. 点击 "Edit in settings.json"

### Windows

```
%USERPROFILE%\.cursor\mcp.json
```

---

## 🚀 使用步骤

### 1. 创建小说项目目录

```bash
mkdir -p ~/novels/my-fantasy-novel
cd ~/novels/my-fantasy-novel
```

### 2. 添加 Cursor 配置

复制上面的配置到 Cursor 的 MCP 设置中，修改路径为实际路径。

### 3. 重启 Cursor

配置完成后重启 Cursor。

### 4. 开始创作

在 Cursor 中与 AI 对话：

```
"创建故事概念文档"
```

AI 将引导你完成整个创作流程！

---

## ✨ 完整创作流程

### 第一步：指导文档（推荐）

```
"创建故事概念文档"
→ 一句话+五句话+两难抉择+道德前提

"创建世界观设定文档"
→ 时代背景+地理+社会+力量体系

"创建人物档案文档"
→ 主角+配角+对手完整设定
```

### 第二步：创建大纲

```
"创建 my-fantasy-novel 的简要大纲，
主角是废材少年，获得神秘传承后踏上修仙之路"
→ 核心故事框架

"扩展为详细大纲"
→ 四页详细大纲（约6000字）
```

### 第三步：生成场景

```
"生成场景清单"
→ 逐场景分解，包含主动/被动场景要素
```

### 第四步：开始写作

```
"撰写场景 1.1"
→ 第1章第1场景

"撰写场景 1.2"  
→ 第1章第2场景

"继续撰写下一个场景"
→ 自动写下一个
```

### 第五步：查看进度

```
"查看创作进度"
→ 显示已完成/剩余场景
```

---

## 🎯 快速测试

配置完成后，在 Cursor 中输入：

```
"使用 novel-workflow 显示工作流程"
```

如果看到完整的小说创作工作流程说明，说明配置成功！

---

## 📊 项目目录结构

首次运行后会自动创建：

```
~/novels/my-story/
  .novel-workflow/
    templates/                    # 6个专业模板
      story-concept-template.md
      world-building-template.md
      character-profiles-template.md
      outline-brief-template.md
      outline-detailed-template.md
      scenes-template.md
    steering/                     # 指导文档
      story-concept.md
      world-building.md
      character-profiles.md
    stories/                      # 你的作品
      my-fantasy-novel/
        outline-brief.md
        outline-detailed.md
        scenes.md
    approvals/                    # 审批记录
    archive/                      # 已完成作品
```

---

## 🌟 核心特性

1. ✨ **专业方法论** - 基于《AI写小说图文教程》
2. 🎭 **三幕式结构** - 经典故事框架
3. ⚖️ **两难抉择** - 每个故事2次重大选择
4. 🎬 **场景理论** - 主动场景 vs 被动场景
5. 📈 **人物弧线** - 完整的角色成长系统
6. 📊 **实时追踪** - Web仪表板监控进度
7. 🇨🇳 **中文优先** - 完整中文支持

---

## 📚 文档资源

- `README.md` - 项目概述
- `WORKFLOW.md` - 详细工作流程
- `PROMPTING-GUIDE.md` - 提示词示例
- `QUICK-START.md` - 快速开始
- `MIGRATION-GUIDE.md` - 技术细节

---

## 🎊 恭喜！

你现在拥有了一个功能完整的 AI 辅助小说创作工具！

**立即开始**：
1. ✅ 复制上面的配置
2. ✅ 修改项目路径
3. ✅ 添加到 Cursor MCP 设置
4. ✅ 重启 Cursor
5. ✅ 开始创作！

祝创作愉快！✨📖✨

