# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2025-10-20

### Fixed - 关键问题修复 🐛
- 🔥 **修复1：MCP workflow未贯穿全流程**
  - 增强write-scene提示词，强制要求读取上下文文档
  - 确保AI在写正文前读取character-profiles.md、world-building.md、outline-detailed.md
  - 保持MCP的结构化指导贯穿整个创作流程，不会变成纯AI生成

- 🔥 **修复2：小说正文包含格式标签**
  - 明确_Prompt字段是指导信息，不是正文内容
  - 添加WARNING：禁止将"Character: xxx"等标签写入正文
  - 在scenes模板中明确说明_Prompt用途
  - 确保生成纯粹的小说散文，就像出版的小说

- 🔥 **修复3：仪表板场景数据不显示**
  - 修复task-parser无法解析带markdown格式(**粗体**)的场景ID
  - 在ID提取前清理markdown格式符号
  - 现在支持：`- [ ] **1.1 场景**`、`- [ ] *1.1* 场景`等格式
  - 仪表板正确显示场景进度

### Impact
- ✅ 创作流程更连贯（MCP始终在指导）
- ✅ 小说正文更专业（纯散文，无标签）
- ✅ 仪表板准确追踪（场景进度可见）

## [2.1.0] - 2025-10-20

### Added - 全面质量升级 🎯
- ✨ **5个全新专业指南和模板**
  - `reference-analysis-template.md` - 对标作品分析（8步系统化分析法）
  - `short-story-template.md` - 短篇小说专门模板（知乎盐选等3000-8000字）
  - `revision-guide-template.md` - 修改打磨指南（6稿打磨法）
  - `sensory-writing-guide.md` - 五感描写系统（让场景身临其境）
  - `scene-writing-techniques.md` - 场景写作技巧手册（10大核心技巧）

- ✨ **Character-Profiles模板大幅增强**
  - 语言特点系统（教育背景、性格、年龄影响用词）
  - 口头禅设计（让每个人物有辨识度）
  - 对话风格差异化（对不同人说话方式不同）
  - 小动作和习惯（紧张/思考/生气/开心时的具体动作）
  - 不完美的小毛病（增加真实感）

- ✨ **Outline-Detailed模板重大增强**
  - 情感曲线设计（场景/章节/全书三级情感图）
  - 冲突升级路径（外部4层级 + 内部4层级系统化设计）
  - 伏笔与回收清单（表格化管理，确保不遗漏）
  - 伏笔类型详解（道具/台词/细节/行为）

- ✨ **Scenes模板的_Prompt字段全面强化**
  - 对话技巧（自然化、口语化、差异化）
  - 情感层次（Show Don't Tell，多层情感）
  - 节奏控制（句子长短、段落疏密）
  - 感官运用（五感选择性使用）
  - AI避免问题清单（6大常见问题及解决方案）

### Improved
- 🎭 **Write-Scene提示词增强**
  - 添加人物语言习惯检查
  - 添加对话自然化要求
  - 添加感官细节指导
  - 添加AI常见问题避免提示

### Impact
- 📈 新增模板：5个专业指南
- 📈 模板总数：11个（6个核心 + 5个指南）
- 📈 模板总行数：约2,500行专业内容
- 🎯 显著提升：小说的"人味儿"和真实感
- 🎯 系统化：对话、情感、节奏、感官的完整指导体系

## [2.0.0] - 2025-10-20

### Breaking Changes
- 🔥 **彻底移除所有程序开发相关内容**
  - 删除工具：spec-workflow-guide, spec-status（保留 novel-workflow-guide, story-status）
  - 删除提示词：inject-spec-workflow-guide, refresh-tasks, implement-task, spec-status
  - 删除模板：requirements, design, tasks, product, tech, structure（6个程序开发模板）
  - **仅保留小说创作相关内容**

### Current Tools (4个纯小说创作工具)
- ✅ `novel-workflow-guide` - 小说创作工作流指导
- ✅ `story-status` - 故事进度追踪
- ✅ `steering-guide` - 指导文档创建（已更新为小说创作描述）
- ✅ `approvals` - 审批管理

### Current Prompts (4个纯小说创作提示词)
- ✅ `create-story` - 创建故事文档
- ✅ `create-steering-doc` - 创建指导文档
- ✅ `write-scene` - 撰写场景
- ✅ `story-status` - 故事状态

### Current Templates (6个纯小说创作模板)
- ✅ `story-concept-template.md` - 故事概念
- ✅ `world-building-template.md` - 世界观设定
- ✅ `character-profiles-template.md` - 人物档案
- ✅ `outline-brief-template.md` - 简要大纲
- ✅ `outline-detailed-template.md` - 详细大纲
- ✅ `scenes-template.md` - 场景清单

### Impact
- 📉 删除文件：16个
- 📉 移除代码：-1,639 行
- ✨ 现在是100%纯粹的小说创作工具
- ⚠️ 不再兼容程序开发用途

## [1.1.0] - 2025-10-20

### Fixed
- 🐛 **重要修复**：移除 console 输出避免污染 MCP 响应流
  - 修复 JSON 解析错误：`Unexpected token 'I', "Initial sn"...`
  - 移除 approval-storage.ts 中的 console.log/warn
  - 移除 server.ts 中会干扰 MCP 的 console.error
  - 移除 index.ts 中的 console 输出
  - 确保 MCP 响应流纯净，仅包含 JSON 数据
- 🐛 修复审批系统在 MCP 客户端中的兼容性问题
- ✅ 完全支持中文路径和特殊字符路径

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
