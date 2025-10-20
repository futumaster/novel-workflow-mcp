# Novel Workflow MCP

[![npm version](https://img.shields.io/npm/v/@ttaqt/novel-workflow-mcp)](https://www.npmjs.com/package/@ttaqt/novel-workflow-mcp)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/futumaster/novel-workflow-mcp)](https://github.com/futumaster/novel-workflow-mcp/issues)

一个基于 Model Context Protocol (MCP) 的AI辅助小说创作工作流服务器，配备实时Web仪表板。

> 🎯 将专业小说创作方法论系统化，让AI成为你的创作助手

---

## ✨ 核心特性

- 📖 **结构化小说创作工作流** - 从概念到成稿的完整流程（故事概念 → 大纲 → 场景 → 正文）
- 🎭 **专业编剧理论** - 三幕式结构、两难抉择、主动/被动场景设计
- 🌐 **实时Web仪表板** - 监控创作进度、审批文档、管理场景状态
- 💼 **VSCode扩展** - 在VSCode侧边栏集成仪表板（计划中）
- ✅ **审批工作流** - 完整的大纲审批流程和修订管理
- 📊 **场景进度跟踪** - 可视化进度条和详细状态
- 🌍 **多语言支持** - 支持11种语言，中文优先

---

## 🌍 支持的语言

🇨🇳 中文 • 🇺🇸 English • 🇯🇵 日本語 • 🇪🇸 Español • 🇧🇷 Português • 🇩🇪 Deutsch • 🇫🇷 Français • 🇷🇺 Русский • 🇮🇹 Italiano • 🇰🇷 한국어 • 🇸🇦 العربية

---

## 🚀 快速开始

### 安装方式

#### 方式1：使用 npx（推荐）

```bash
# 直接使用，无需安装
npx @ttaqt/novel-workflow-mcp@latest /path/to/your/novel --dashboard
```

#### 方式2：配置到 AI 工具

**Cursor IDE**:

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "/path/to/your/novel-project",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

**Claude Desktop**:

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "/path/to/your/novel-project",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

> ⚠️ **重要**：将 `/path/to/your/novel-project` 替换为你的实际项目路径！

---

## 📖 使用方法

配置完成后，在 AI 对话中：

### 开始新小说

```
"创建故事概念文档"
"创建 my-fantasy-novel 的简要大纲"
"扩展为详细大纲"
"生成场景清单"
"撰写场景 1.1"
```

### 查看进度

```
"显示我的所有作品"
"查看 my-fantasy-novel 的创作进度"
```

### 继续创作

```
"撰写下一个场景"
"写第3章第2场景"
```

---

## 🎬 小说创作工作流

### 阶段0：指导文档（推荐）

创建项目基础框架：

#### 故事概念 (`steering/story-concept.md`)
- 一句话故事概括（类型+主角+任务，≤25词）
- 五句话梗概（三幕式结构）
- 两次两难抉择设计
- 道德前提和核心主题

#### 世界观设定 (`steering/world-building.md`)
- 时代背景和历史
- 地理环境和重要地点
- 社会结构和权力体系
- 力量体系（魔法/修真/科技）
- 特殊设定和规则

#### 人物档案 (`steering/character-profiles.md`)
- 主角完整档案和成长弧线
- 重要配角设定
- 对手角色设定
- 人物关系图谱

### 阶段1：简要大纲

创建核心故事框架：

- 一句话概括
- 五句话梗概
- 核心冲突（外部+内部）
- 主要人物简介
- 三幕式结构概要

### 阶段2：详细大纲

扩展为完整的四页大纲：

- 第一幕：开端（约25%）
- 第二幕前半：上升行动（约25%）
- 第二幕后半：危机深化（约25%，含两次两难抉择）
- 第三幕：高潮与结局（约25%）
- 完整人物弧线
- 主题线索贯穿
- 伏笔与呼应

### 阶段3：场景清单

分解为可执行的场景：

- 场景编号（如 1.1, 2.3）
- 场景类型（主动/被动）
- 视点人物
- **主动场景**：目标/冲突/挫折
- **被动场景**：反应/困境/决定
- 关键内容要点

### 阶段4：正文创作

逐场景撰写：

- 按场景清单顺序创作
- 每个场景包含完整的 _Prompt 指导
- 实时跟踪进度
- 标记完成状态

---

## 🎭 专业创作方法论

本工具基于《AI写小说图文教程》的专业方法论：

### 三幕式结构
- **第一幕**：常态世界 → 触发事件 → 进入冒险
- **第二幕**：上升行动 → 中点转折 → 危机深化 → 黑暗时刻
- **第三幕**：顿悟重生 → 最终对决 → 新的平衡

### 两难抉择设计
- **第一次两难**：约50-60%处，艰难但不致命的选择
- **第二次两难**：约75-85%处，涉及核心价值观的痛苦选择
- 两个选项都有合理性，都需要重大牺牲

### 场景理论
- **主动场景**：Goal（目标）→ Conflict（冲突）→ Disaster（挫折）
- **被动场景**：Reaction（反应）→ Dilemma（困境）→ Decision（决定）
- 主动和被动场景交替，创造节奏

### 人物弧线
- 起点状态 → 触发事件 → 成长过程 → 顿悟时刻 → 最终转变
- 每个重要人物都有完整的成长轨迹

---

## 📁 项目结构

```
your-novel-project/
  .novel-workflow/
    steering/                    # 指导文档
      story-concept.md          # 故事概念
      world-building.md         # 世界观设定
      character-profiles.md     # 人物档案
    stories/                     # 你的作品
      my-fantasy-novel/
        outline-brief.md        # 简要大纲
        outline-detailed.md     # 详细大纲
        scenes.md               # 场景清单
    approvals/                   # 审批记录
    archive/                     # 已完成作品
    templates/                   # 6个专业模板
    user-templates/             # 自定义模板
```

---

## 🛠️ MCP 客户端配置

<details>
<summary><strong>Cursor IDE</strong></summary>

添加到 Cursor 设置 (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "/path/to/your/novel-project",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

**本地开发版本**（使用最新修复）:

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "node",
      "args": [
        "/Users/wenxinhuang/novel-workflow-mcp/dist/index.js",
        "/path/to/your/novel-project",
        "--AutoStartDashboard"
      ]
    }
  }
}
```
</details>

<details>
<summary><strong>Claude Desktop</strong></summary>

添加到 `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "/path/to/your/novel-project",
        "--AutoStartDashboard"
      ]
    }
  }
}
```
</details>

<details>
<summary><strong>其他 MCP 客户端</strong></summary>

适用于 Cline、Continue、Augment Code 等：

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "/path/to/your/novel-project"
      ]
    }
  }
}
```
</details>

---

## 📚 文档

- [完整配置指南](COMPLETE-SETUP-GUIDE.md) - 详细配置步骤和 projectPath 说明
- [快速开始](QUICK-START.md) - 从安装到创作的完整流程
- [工作流程](docs/WORKFLOW.md) - 小说创作工作流详解
- [提示词指南](docs/PROMPTING-GUIDE.md) - AI对话示例和技巧
- [故障排查](TROUBLESHOOTING-APPROVALS.md) - 常见问题解决方案

---

## 🎯 主要功能

### 1. 专业模板系统

6个基于专业方法论的模板：

- **故事概念模板** - 一句话+五句话+两难抉择
- **世界观模板** - 完整的世界设定框架
- **人物档案模板** - 人物弧线和关系网络
- **简要大纲模板** - 核心故事框架
- **详细大纲模板** - 四页详细大纲（约6000字）
- **场景清单模板** - 主动/被动场景分解

### 2. 智能审批系统

- 创建文档后自动请求审批
- Web仪表板中审阅和批注
- 支持批准、拒绝、请求修改
- 版本对比和修订历史

### 3. 实时进度追踪

- 可视化进度条
- 场景完成状态（待写/进行中/已完成）
- 章节组织和统计
- 实时同步更新

### 4. 场景写作指导

- 每个场景包含结构化的 _Prompt 指导
- 明确的成功标准
- 对应大纲的引用
- 角色和设定一致性检查

---

## 💡 使用示例

### 创建玄幻修真小说

```
"创建故事概念文档：
- 类型：玄幻修真
- 主角：废材少年意外获得上古传承
- 核心冲突：复仇 vs 正义
- 两难抉择：牺牲队友完成复仇，还是放下仇恨拯救苍生"

"创建世界观设定：
- 修真境界：练气、筑基、金丹、元婴、化神
- 势力：正道六派、魔道三宗、散修联盟
- 特殊设定：上古遗迹、灵兽契约"

"创建 immortal-journey 的简要大纲"
"扩展为详细大纲"
"生成场景清单"
"撰写场景 1.1"
```

### 创建都市言情小说

```
"创建故事概念：都市霸总先婚后爱故事"

"创建 urban-romance 的简要大纲：
- 女主是独立设计师
- 男主是冷酷总裁
- 因商业联姻走到一起
- 从互相排斥到真心相爱"
```

---

## 🏗️ 技术架构

### 技术栈

- **后端**: TypeScript + Fastify + WebSocket
- **前端**: React + Vite + TailwindCSS
- **协议**: Model Context Protocol (MCP)
- **存储**: 文件系统（Markdown + JSON）

### 系统组件

```
┌─────────────┐
│  AI Client  │ (Cursor, Claude Desktop)
│  (MCP SDK)  │
└──────┬──────┘
       │ MCP Protocol
┌──────▼────────────────┐
│  Novel Workflow MCP   │
│  - Prompts System     │
│  - Tools System       │
│  - Approval Manager   │
└──────┬────────────────┘
       │ WebSocket
┌──────▼──────────┐
│   Dashboard     │
│  - Real-time UI │
│  - Diff Viewer  │
│  - Annotator    │
└─────────────────┘
```

---

## 📝 创作步骤说明

本工具基于专业小说创作方法论，参考《AI写小说图文教程》：

### 1. 研读对标小说（可选）
提取核心概念和风格特点

### 2. 一句话概括
类型 + 主角 + 任务（≤25词，有画面感）

### 3. 五句话梗概
三幕式结构 + 2次两难抉择 + 道德前提

### 4. 人物介绍
每个角色的完整档案和成长弧线

### 5. 扩展大纲
从一页扩展到四页详细大纲

### 6. 人物深挖
背景故事、原生家庭、性格成因

### 7. 场景生成
主动和被动场景列表

### 8. 场景清单
包含所有必要信息的完整清单

### 9. 正文创作
逐场景/逐章节创作

---

## 🎯 创作原则

### ⚠️ 重要提醒

- **AI 是辅助工具** - 真实情感体验仍需人类创作
- **结构化创作** - 遵循专业写作步骤
- **迭代完善** - 通过审批流程持续优化
- **进度可视化** - 清晰掌握创作进展

### ✅ 最佳实践

1. **先设定后创作** - 完成指导文档再开始大纲
2. **逐步审批** - 每个阶段都仔细审批
3. **保持一致** - 参考指导文档保持设定一致
4. **定期备份** - 及时提交到 git
5. **使用仪表板** - 可视化跟踪进度

---

## 🔧 命令行选项

```bash
novel-workflow-mcp [path] [options]

参数：
  path                    项目路径（默认当前目录）

选项：
  --help                  显示帮助信息
  --dashboard             仅运行仪表板（不启动MCP服务器）
  --AutoStartDashboard    自动启动仪表板
  --port <number>         指定端口（1024-65535）
  --config <path>         使用自定义配置文件

示例：
  # 启动MCP服务器和仪表板
  npx @ttaqt/novel-workflow-mcp@latest ~/my-novel --AutoStartDashboard
  
  # 仅启动仪表板
  npx @ttaqt/novel-workflow-mcp@latest ~/my-novel --dashboard --port 3456
```

---

## 🛠️ 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/futumaster/novel-workflow-mcp.git
cd novel-workflow-mcp

# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建项目
npm run build

# 运行仪表板（开发模式）
npm run dev:dashboard
```

### 运行测试

```bash
# 运行测试
npm test

# 监视模式
npm run test:watch

# 测试覆盖率
npm run test:coverage
```

---

## 🤝 贡献

欢迎贡献！请查看 [贡献指南](CONTRIBUTING.md)（待创建）

### 贡献方式

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🌍 添加语言翻译
- 🎨 优化UI/UX
- ✨ 提交代码

---

## 📄 许可证

本项目采用 [GPL-3.0 许可证](LICENSE)

---

## 🙏 致谢

- 基于 [Spec Workflow MCP](https://github.com/Pimzino/spec-workflow-mcp) 改造
- 创作方法论参考《AI写小说图文教程》
- 使用 [Model Context Protocol](https://modelcontextprotocol.io/)

---

## 📮 联系方式

- **GitHub**: [futumaster/novel-workflow-mcp](https://github.com/futumaster/novel-workflow-mcp)
- **NPM**: [@ttaqt/novel-workflow-mcp](https://www.npmjs.com/package/@ttaqt/novel-workflow-mcp)
- **Issues**: [提交问题](https://github.com/futumaster/novel-workflow-mcp/issues)

---

## 🌟 Star History

如果这个项目对你有帮助，请给个 Star ⭐️

[![Star History Chart](https://api.star-history.com/svg?repos=futumaster/novel-workflow-mcp&type=Date)](https://star-history.com/#futumaster/novel-workflow-mcp&Date)

---

## 📊 版本历史

### v1.0.1 (2025-10-19)
- 🐛 修复 steering 文档名称映射
- 🐛 修复路径兼容性问题
- 📝 添加完整配置指南

### v1.0.0 (2025-10-19)
- 🎉 初始发布
- ✨ 完整的小说创作工作流
- 📖 6个专业模板
- 🌐 实时Web仪表板
- 🇨🇳 完整中文支持

---

## ❓ FAQ

### Q: 支持哪些小说类型？

A: 支持所有类型的小说创作：玄幻、都市、科幻、悬疑、言情、武侠等。模板通用，可根据类型调整。

### Q: 可以创作多个小说吗？

A: 可以！在一个项目中可以创建多个 story，也可以为不同小说使用不同的项目目录。

### Q: 如何自定义模板？

A: 在项目的 `.novel-workflow/user-templates/` 目录中创建同名模板文件即可覆盖默认模板。

### Q: 审批是必须的吗？

A: 推荐使用审批流程确保大纲质量，但你也可以直接批准跳过审阅。

### Q: 可以导出到 Word 或 PDF 吗？

A: 文档是标准 Markdown 格式，可以使用 Pandoc 等工具转换为任何格式。

### Q: 多人协作支持吗？

A: 当前版本是单用户模式，但由于使用文件存储，可以通过 Git 实现协作。

---

## 🚨 故障排查

### 仪表板看不到文档？

1. 检查文档是否已创建：`ls ~/.novel-workflow/steering/`
2. 刷新浏览器（Cmd+R）
3. 查看 [故障排查指南](TROUBLESHOOTING-APPROVALS.md)

### 审批不显示？

1. 确保 AI 调用时包含 `projectPath` 参数
2. 检查审批文件：`find ~/.novel-workflow/approvals -name "*.json"`
3. 刷新浏览器

### 更多问题？

查看 [完整配置指南](COMPLETE-SETUP-GUIDE.md) 或 [提交 Issue](https://github.com/futumaster/novel-workflow-mcp/issues)

---

<div align="center">

**🎊 祝你创作愉快！**

用 AI 辅助创作，释放你的创意！

Made with ❤️ for writers

</div>
