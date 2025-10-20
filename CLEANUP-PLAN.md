# 清理计划 - 移除程序开发残留

## 🎯 目标

将这个项目变成**纯粹的小说创作工具**，移除所有程序开发相关的内容。

## 📋 发现的残留

### 工具（Tools）
- ❌ `spec-workflow-guide` - 程序开发工作流
- ❌ `spec-status` - 程序规范状态
- ✅ `novel-workflow-guide` - 保留
- ✅ `story-status` - 保留
- ✅ `steering-guide` - 需要更新描述
- ✅ `approvals` - 保留

### 提示词（Prompts）
- ❌ `inject-spec-workflow-guide` - 程序开发
- ❌ `inject-steering-guide` - 描述是程序开发
- ❌ `refresh-tasks` - 程序开发任务刷新
- ❌ `implement-task` - 程序开发实现任务
- ❌ `spec-status` - 程序规范状态
- ✅ `create-story` - 保留
- ✅ `write-scene` - 保留
- ✅ `story-status` - 保留
- ✅ `create-steering-doc` - 保留

### 代码引用
- 148处 "spec-workflow" 或 "specification" 引用需要检查

## 🔧 清理操作

### 1. 移除旧工具
- 删除或重命名 spec-workflow-guide.ts
- 删除或重命名 spec-status.ts
- 从 tools/index.ts 移除注册

### 2. 移除/更新旧提示词
- 删除 inject-spec-workflow-guide.ts
- 更新 inject-steering-guide.ts 为小说创作描述
- 删除 refresh-tasks.ts（改为 refresh-scenes.ts）
- 删除 implement-task.ts（已有 write-scene.ts）
- 删除 spec-status.ts（已有 story-status.ts）

### 3. 更新所有术语
- spec → story
- specification → story/novel
- task → scene
- implement → write
- feature → story

