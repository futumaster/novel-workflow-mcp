# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2025-10-19

### Fixed
- 🐛 修复仪表板版本号显示问题
  - 优先从本地 package.json 读取版本号（立即显示）
  - 更新 npm 包名引用从 @pimzino 改为 @ttaqt
  - 后台异步检查 npm 版本，不阻塞启动
  - 现在版本号会立即正确显示

## [1.0.2] - 2025-10-19

### Added
- 📝 完整重写 README.md 为专业项目文档
- 📝 添加详细的 CHANGELOG.md
- 📝 添加贡献指南 CONTRIBUTING.md

### Changed
- 📚 项目文档专业化升级

## [1.0.1] - 2025-10-19

### Fixed
- 🐛 修复 steering 文档名称映射问题
  - Parser 现在正确查找 story-concept.md, world-building.md, character-profiles.md
  - 保留对旧文件名（product.md, tech.md, structure.md）的向后兼容
- 🐛 修复 dashboard server 路径解析
  - 同时支持 .novel-workflow 和 .spec-workflow 目录
  - 改进文件路径候选查找策略

### Added
- 📝 添加完整配置指南（COMPLETE-SETUP-GUIDE.md）
- 📝 添加审批故障排查指南（TROUBLESHOOTING-APPROVALS.md）
- 📝 添加 Cursor 配置指南（CURSOR-CONFIG.md）
- 📝 添加贡献指南（CONTRIBUTING.md）

## [1.0.0] - 2025-10-19

### Added
- 🎉 初始发布 - Novel Workflow MCP
- ✨ 6个专业小说创作模板
  - story-concept-template.md - 故事概念（一句话+五句话+两难抉择）
  - world-building-template.md - 世界观设定
  - character-profiles-template.md - 人物档案
  - outline-brief-template.md - 简要大纲
  - outline-detailed-template.md - 详细大纲（四页约6000字）
  - scenes-template.md - 场景清单（主动/被动场景）
- 🔧 完整的 MCP 工具系统
  - novel-workflow-guide - 小说创作工作流指导
  - story-status - 故事进度追踪
  - approvals - 审批管理
  - create-story prompts - 故事文档创建
  - write-scene prompts - 场景写作指导
- 🌐 实时 Web 仪表板
  - 统计概览
  - Steering 文档管理
  - Stories 作品管理
  - Scenes 场景追踪
  - Approvals 审批流程
- 🎭 专业小说创作方法论
  - 三幕式结构
  - 两难抉择设计
  - 主动/被动场景理论
  - 人物弧线系统
- 🇨🇳 完整中文支持
  - 所有模板中文化
  - 中文工作流指导
  - 中英文 UI
- 📚 完整文档
  - README - 项目概述
  - WORKFLOW.md - 工作流程
  - PROMPTING-GUIDE.md - 提示词指南
  - QUICK-START.md - 快速开始
  - PUBLISH-GUIDE.md - 发布指南
  - MIGRATION-GUIDE.md - 改造详情

### Changed
- ♻️ 从 Spec Workflow MCP 改造而来
- 📂 目录结构：.spec-workflow → .novel-workflow
- 🔄 核心概念：specs → stories, tasks → scenes
- 📝 文档类型：requirements/design/tasks → outline-brief/outline-detailed/scenes

### Technical
- 🏗️ TypeScript + Fastify + React
- 📦 完整的构建流程
- ✅ i18n 验证
- 🎨 TailwindCSS UI
- 🔌 WebSocket 实时更新

---

## [Unreleased]

### Planned
- 📱 VSCode Extension 扩展
- 🔄 自动备份功能
- 📊 创作统计分析
- 🎨 自定义主题
- 🌍 更多语言翻译
- 💾 导出为 Word/PDF
- 👥 多人协作支持

---

## 版本说明

- **Major** (x.0.0): 重大功能更新或破坏性变更
- **Minor** (1.x.0): 新功能，向后兼容
- **Patch** (1.0.x): Bug修复和小改进

---

[1.0.1]: https://github.com/futumaster/novel-workflow-mcp/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/futumaster/novel-workflow-mcp/releases/tag/v1.0.0
