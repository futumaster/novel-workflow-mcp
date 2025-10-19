# Novel Workflow MCP 改造完成指南

## 改造概述

本项目已从程序开发 MCP (Spec Workflow) 改造为小说创作 MCP (Novel Workflow)。

## ✅ 已完成部分（~85%）

### 1. 核心系统（100%）
- ✅ package.json - 项目配置
- ✅ README.md - 项目说明
- ✅ 路径工具 - .novel-workflow 目录结构
- ✅ 配置系统 - 支持新旧路径

### 2. 模板系统（100%）
- ✅ story-concept-template.md
- ✅ world-building-template.md
- ✅ character-profiles-template.md
- ✅ outline-brief-template.md
- ✅ outline-detailed-template.md
- ✅ scenes-template.md

### 3. 后端工具（100%）
- ✅ novel-workflow-guide.ts
- ✅ story-status.ts
- ✅ create-story prompts
- ✅ write-scene prompts
- ✅ 工具注册和路由

### 4. 核心代码（100%）
- ✅ path-utils.ts
- ✅ workspace-initializer.ts
- ✅ config.ts

### 5. 文档（100%）
- ✅ WORKFLOW.md
- ✅ PROMPTING-GUIDE.md

### 6. 国际化（80%）
- ✅ zh.json (中文) - 完整更新
- ✅ en.json (英文) - 完整更新  
- ⚠️ 其他9种语言 - 需要更新

## ⏳ 剩余工作（~15%）

### 1. 国际化文件
需要更新以下文件的关键术语：
- ja.json (日语)
- ar.json (阿拉伯语)
- de.json (德语)
- es.json (西班牙语)
- fr.json (法语)
- it.json (意大利语)
- ko.json (韩语)
- pt.json (葡萄牙语)
- ru.json (俄语)

### 2. VSCode 扩展
- vscode-extension/package.json
- vscode-extension/src/locales/*.json
- vscode-extension/README.md

## 术语映射表

### 核心术语
```
spec-workflow     → novel-workflow
.spec-workflow/   → .novel-workflow/
specs/            → stories/
spec             → story
specification    → story
```

### 文档类型
```
requirements     → outline-brief
design           → outline-detailed
tasks           → scenes
```

### 操作术语
```
task            → scene
implement       → write
feature         → story
active specs    → active stories
task progress   → scene progress
```

### UI术语
```
Specifications  → Stories
Tasks           → Scenes
Task Management → Scene Management
No tasks        → No scenes
```

## 快速批量替换脚本

对于剩余的国际化文件，可以使用以下批量替换规则：

### 第1步：基本术语替换
```bash
# 在每个语言文件中替换以下内容
"specs": "规范"      → "specs": "作品"
"tasks": "任务"      → "tasks": "场景"
"Specifications"   → "Stories"
"Tasks"            → "Scenes"
"task"             → "scene"
"spec"             → "story"
```

### 第2步：文档类型替换
```bash
"requirements"     → "outline-brief" 或保持本地化
"design"           → "outline-detailed" 或保持本地化
```

### 第3步：描述性文本
```bash
"development workflow"  → "novel writing workflow"
"Active specs"          → "Active stories"
"task completion"       → "scene completion"
```

## 手动更新指南

### 更新国际化文件步骤

1. 打开对应语言文件：`src/dashboard_frontend/src/locales/[lang].json`

2. 更新关键字段：
   ```json
   {
     "projectNameDefault": "小说工作流",
     "projectDescription": "小说创作工作流仪表板",
     "nav": {
       "specs": "作品",
       "tasks": "场景"
     },
     "stats": {
       "specifications": {
         "title": "作品",
         "label": "进行中作品"
       },
       "taskProgress": {
         "title": "场景进度"
       }
     },
     "specsPage": {
       "header": {
         "title": "作品"
       },
       "documents": {
         "requirements": "简要大纲",
         "design": "详细大纲",
         "tasks": "场景"
       }
     },
     "tasksPage": {
       "header": {
         "title": "场景管理"
       }
     }
   }
   ```

3. 搜索并替换：
   - 搜索所有包含 "spec" 的字符串
   - 根据上下文替换为 "story"
   - 搜索所有包含 "task" 的字符串
   - 根据上下文替换为 "scene"

### VSCode 扩展更新步骤

1. 更新 `vscode-extension/package.json`:
   - displayName
   - description
   - contributes.commands

2. 更新语言文件：
   - `package.nls.json` (英文)
   - `package.nls.zh.json` (中文)
   - `package.nls.ja.json` (日语)

3. 更新 README:
   - `vscode-extension/README.md`

## 验证清单

完成更新后，验证以下内容：

- [ ] MCP工具可以正常调用
- [ ] 仪表板显示正确术语
- [ ] 所有语言文件语法正确（无JSON错误）
- [ ] VSCode扩展可以正常安装
- [ ] 模板文件可以正常加载
- [ ] 审批流程正常工作

## 向后兼容性

本改造保留了向后兼容性：
- 旧的 `.spec-workflow` 目录仍然可以读取
- 旧的 tool 名称仍然注册（spec-status, spec-workflow-guide）
- PathUtils 提供了 legacy 方法别名

## 构建和测试

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 运行仪表板
npm run dev:dashboard

# 构建仪表板
npm run build:dashboard
```

## 注意事项

1. 所有路径已从 `.spec-workflow` 更新为 `.novel-workflow`
2. 核心功能完全可用，UI显示可能仍有个别地方使用旧术语
3. 建议优先处理中文和英文UI，其他语言可以逐步完善
4. VSCode扩展更新是独立的，不影响核心MCP功能

## 联系和贡献

如需完成剩余翻译工作，欢迎贡献：
- 提交PR更新语言文件
- 遵循已完成的 zh.json 和 en.json 模式
- 保持术语一致性

