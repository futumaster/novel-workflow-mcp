import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolContext, ToolResponse } from '../types.js';

export const steeringGuideTool: Tool = {
  name: 'steering-guide',
  description: `Load guide for creating story steering documents.

# Instructions
Call ONLY when user explicitly requests steering document creation or asks about story foundation docs. Not part of standard writing workflow. Provides templates and guidance for story-concept.md, world-building.md, and character-profiles.md creation. Its important that you follow this workflow exactly to avoid errors.`,
  inputSchema: {
    type: 'object',
    properties: {},
    additionalProperties: false
  }
};

export async function steeringGuideHandler(args: any, context: ToolContext): Promise<ToolResponse> {
  return {
    success: true,
    message: 'Story steering workflow guide loaded - follow this workflow exactly',
    data: {
      guide: getSteeringGuide(),
      dashboardUrl: context.dashboardUrl
    },
    nextSteps: [
      'Only proceed if user requested steering docs',
      'Create story-concept.md first',
      'Then world-building.md and character-profiles.md',
      'Reference in future stories',
      context.dashboardUrl ? `Dashboard: ${context.dashboardUrl}` : 'Please start the dashboard or use "Novel Workflow MCP"'
    ]
  };
}

function getSteeringGuide(): string {
  return `# 指导文档工作流 - Story Steering Workflow

## 概述

仅在明确请求时创建故事级别的指导文档。指导文档为整个小说项目建立核心概念、世界观和人物设定。严格遵循此工作流程避免错误。

## 工作流程图

\`\`\`mermaid
flowchart TD
    Start([开始：设置指导文档]) --> Guide[steering-guide<br/>加载工作流指导]

    %% 阶段 1: 故事概念
    Guide --> P1_Template[检查user-templates,<br/>然后读取模板:<br/>story-concept-template.md]
    P1_Template --> P1_Generate[生成故事核心概念]
    P1_Generate --> P1_Create[创建文件:<br/>.novel-workflow/steering/<br/>story-concept.md]
    P1_Create --> P1_Approve[approvals<br/>action: request<br/>仅filePath]
    P1_Approve --> P1_Status[approvals<br/>action: status<br/>轮询状态]
    P1_Status --> P1_Check{Status?}
    P1_Check -->|needs-revision| P1_Update[根据评论更新文档]
    P1_Update --> P1_Create
    P1_Check -->|approved| P1_Clean[approvals<br/>action: delete]
    P1_Clean -->|failed| P1_Status

    %% 阶段 2: 世界观设定
    P1_Clean -->|success| P2_Template[检查user-templates,<br/>然后读取模板:<br/>world-building-template.md]
    P2_Template --> P2_Build[构建世界观]
    P2_Build --> P2_Create[创建文件:<br/>.novel-workflow/steering/<br/>world-building.md]
    P2_Create --> P2_Approve[approvals<br/>action: request<br/>仅filePath]
    P2_Approve --> P2_Status[approvals<br/>action: status<br/>轮询状态]
    P2_Status --> P2_Check{Status?}
    P2_Check -->|needs-revision| P2_Update[根据评论更新文档]
    P2_Update --> P2_Create
    P2_Check -->|approved| P2_Clean[approvals<br/>action: delete]
    P2_Clean -->|failed| P2_Status

    %% 阶段 3: 人物档案
    P2_Clean -->|success| P3_Template[检查user-templates,<br/>然后读取模板:<br/>character-profiles-template.md]
    P3_Template --> P3_Build[构建人物档案]
    P3_Build --> P3_Create[创建文件:<br/>.novel-workflow/steering/<br/>character-profiles.md]
    P3_Create --> P3_Approve[approvals<br/>action: request<br/>仅filePath]
    P3_Approve --> P3_Status[approvals<br/>action: status<br/>轮询状态]
    P3_Status --> P3_Check{Status?}
    P3_Check -->|needs-revision| P3_Update[根据评论更新文档]
    P3_Update --> P3_Create
    P3_Check -->|approved| P3_Clean[approvals<br/>action: delete]
    P3_Clean -->|failed| P3_Status

    P3_Clean -->|success| Complete([指导文档完成])

    style Start fill:#e6f3ff
    style Complete fill:#e6f3ff
    style P1_Check fill:#ffe6e6
    style P2_Check fill:#ffe6e6
    style P3_Check fill:#ffe6e6
\`\`\`

## 指导文档阶段

### 阶段 1: 故事概念文档
**目的**：定义故事核心概念、主题和两难抉择。

**文件操作**:
- 检查自定义模板：\`.novel-workflow/user-templates/story-concept-template.md\`
- 读取模板：\`.novel-workflow/templates/story-concept-template.md\`（如无自定义）
- 创建文档：\`.novel-workflow/steering/story-concept.md\`

**工具**:
- steering-guide：加载工作流指导
- approvals：管理审批工作流（操作：request, status, delete）

**流程**:
1. 加载 steering guide 获取工作流概述
2. 检查 \`.novel-workflow/user-templates/story-concept-template.md\`
3. 如无自定义，从 \`.novel-workflow/templates/story-concept-template.md\` 读取
4. 生成故事核心概念：
   - 一句话概括（类型+主角+任务，≤25词）
   - 五句话梗概（三幕式结构）
   - 两次两难抉择
   - 道德前提
5. 在 \`.novel-workflow/steering/story-concept.md\` 创建文档
6. 使用 approvals 请求审批（action:'request'，仅filePath）
7. 轮询状态（action:'status'）直到 approved/needs-revision（绝不接受口头批准）
8. 如 needs-revision：更新文档，创建新审批，不要继续
9. 一旦 approved：使用 approvals（action:'delete'，必须成功）然后继续
10. 如删除失败：停止 - 返回轮询

### 阶段 2: 世界观设定文档
**目的**：建立完整的世界观体系。

**文件操作**:
- 检查自定义模板：\`.novel-workflow/user-templates/world-building-template.md\`
- 读取模板：\`.novel-workflow/templates/world-building-template.md\`（如无自定义）
- 创建文档：\`.novel-workflow/steering/world-building.md\`

**工具**:
- approvals：管理审批工作流

**流程**:
1. 检查 \`.novel-workflow/user-templates/world-building-template.md\`
2. 如无自定义，从 \`.novel-workflow/templates/world-building-template.md\` 读取
3. 构建世界观设定：
   - 时代背景
   - 地理环境
   - 社会结构
   - 力量体系
   - 特殊设定
4. 在 \`.novel-workflow/steering/world-building.md\` 创建文档
5. 使用 approvals 请求审批
6. 轮询状态直到 approved/needs-revision
7. 如 needs-revision：更新文档，创建新审批，不要继续
8. 一旦 approved：删除审批（必须成功）然后继续
9. 如删除失败：停止 - 返回轮询

### 阶段 3: 人物档案文档
**目的**：建立完整的人物体系和关系网络。

**文件操作**:
- 检查自定义模板：\`.novel-workflow/user-templates/character-profiles-template.md\`
- 读取模板：\`.novel-workflow/templates/character-profiles-template.md\`（如无自定义）
- 创建文档：\`.novel-workflow/steering/character-profiles.md\`

**工具**:
- approvals：管理审批工作流

**流程**:
1. 检查 \`.novel-workflow/user-templates/character-profiles-template.md\`
2. 如无自定义，从 \`.novel-workflow/templates/character-profiles-template.md\` 读取
3. 构建人物档案：
   - 主角完整档案
   - 重要配角设定
   - 对手角色
   - 人物关系
   - 成长弧线
4. 在 \`.novel-workflow/steering/character-profiles.md\` 创建文档
5. 使用 approvals 请求审批
6. 轮询状态直到 approved/needs-revision
7. 如 needs-revision：更新文档，创建新审批，不要继续
8. 一旦 approved：删除审批（必须成功）
9. 如删除失败：停止 - 返回轮询
10. 成功清理后："指导文档完成。准备创建故事大纲？"

## 工作流程规则

- 在指定文件路径直接创建文档
- 首先检查 \`.novel-workflow/user-templates/\` 中的自定义模板
- 如无自定义模板，从 \`.novel-workflow/templates/\` 读取
- 遵循准确的模板结构
- 各阶段间获取明确的用户批准（使用 approvals 工具，action:'request'）
- 按顺序完成阶段（不跳过）
- 审批请求：仅提供 filePath，绝不提供 content
- 阻塞：如审批删除失败绝不继续
- 关键：必须有 approved 状态且成功清理才能进入下一阶段
- 关键：绝不接受口头批准 - 仅通过仪表板或扩展
- 绝不在用户说"approved"后继续 - 仅检查系统状态

## 文件结构
\`\`\`
.novel-workflow/
├── templates/           # 服务器启动时自动填充
│   ├── story-concept-template.md
│   ├── world-building-template.md
│   └── character-profiles-template.md
└── steering/
    ├── story-concept.md
    ├── world-building.md
    └── character-profiles.md
\`\`\``;
}
