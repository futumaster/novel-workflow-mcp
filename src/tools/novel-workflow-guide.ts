import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolContext, ToolResponse } from '../types.js';

export const novelWorkflowGuideTool: Tool = {
  name: 'novel-workflow-guide',
  description: `Load essential novel writing workflow instructions to guide story creation from concept to completion.

# Instructions
Call this tool FIRST when users request story creation, novel writing, or mention stories. This provides the complete workflow sequence (Story Concept → Outlines → Scenes → Writing) that must be followed. Always load before any other novel tools to ensure proper workflow understanding. Its important that you follow this workflow exactly to avoid errors.`,
  inputSchema: {
    type: 'object',
    properties: {},
    additionalProperties: false
  }
};

export async function novelWorkflowGuideHandler(args: any, context: ToolContext): Promise<ToolResponse> {
  // Get dashboard URL from context or session
  let dashboardUrl = context.dashboardUrl;
  if (!dashboardUrl && context.sessionManager) {
    dashboardUrl = await context.sessionManager.getDashboardUrl();
  }

  const dashboardMessage = dashboardUrl ?
    `Monitor progress on dashboard: ${dashboardUrl}` :
    'Please start the dashboard or use VS Code extension "Novel Workflow MCP"';

  return {
    success: true,
    message: 'Complete novel workflow guide loaded - follow this workflow exactly',
    data: {
      guide: getNovelWorkflowGuide(),
      dashboardUrl: dashboardUrl,
      dashboardAvailable: !!dashboardUrl
    },
    nextSteps: [
      'Follow sequence: Story Concept → Brief Outline → Detailed Outline → Scenes → Writing',
      'Load templates first',
      'Request approval after each document',
      'Use MCP tools only',
      dashboardMessage
    ]
  };
}

function getNovelWorkflowGuide(): string {
  const currentYear = new Date().getFullYear();
  return `# Novel Writing Workflow

## 概述

你指导用户通过MCP工具进行结构化小说创作。将初步创意转化为完整的故事，经过：故事概念 → 简要大纲 → 详细大纲 → 场景清单 → 正文创作。可用时使用网络搜索获取当前写作最佳实践（当前年份：${currentYear}）。严格遵循此工作流程避免错误。
故事名称使用kebab-case（如：fantasy-adventure）。每次创作一个故事。

## 工作流程图
\`\`\`mermaid
flowchart TD
    Start([开始：用户请求创作小说]) --> CheckSteering{指导文档存在?}
    CheckSteering -->|Yes| P0_Load[读取指导文档:<br/>.novel-workflow/steering/*.md]
    CheckSteering -->|No| P0_Create{需要创建?}
    P0_Create -->|Yes| CreateSteering[创建指导文档]
    P0_Create -->|No| P1_Template
    CreateSteering --> P0_Load

    %% 阶段 1: 故事概念
    P0_Load --> P1_Template[检查user-templates,<br/>然后读取模板:<br/>story-concept-template.md]
    P1_Template --> P1_Research[如可用则网络搜索]
    P1_Research --> P1_Create[创建文件:<br/>.novel-workflow/steering/<br/>story-concept.md]
    P1_Create --> P1_Approve[approvals<br/>action: request<br/>仅filePath]
    P1_Approve --> P1_Status[approvals<br/>action: status<br/>轮询状态]
    P1_Status --> P1_Check{Status?}
    P1_Check -->|needs-revision| P1_Update[根据用户评论更新文档]
    P1_Update --> P1_Create
    P1_Check -->|approved| P1_Clean[approvals<br/>action: delete]
    P1_Clean -->|failed| P1_Status

    %% 阶段 2: 简要大纲
    P1_Clean -->|success| P2_Template[检查user-templates,<br/>然后读取模板:<br/>outline-brief-template.md]
    P2_Template --> P2_Research[研究类似作品<br/>（如可用）]
    P2_Research --> P2_Create[创建文件:<br/>.novel-workflow/stories/{name}/<br/>outline-brief.md]
    P2_Create --> P2_Approve[approvals<br/>action: request<br/>仅filePath]
    P2_Approve --> P2_Status[approvals<br/>action: status<br/>轮询状态]
    P2_Status --> P2_Check{Status?}
    P2_Check -->|needs-revision| P2_Update[根据用户评论更新文档]
    P2_Update --> P2_Create
    P2_Check -->|approved| P2_Clean[approvals<br/>action: delete]
    P2_Clean -->|failed| P2_Status

    %% 阶段 3: 详细大纲
    P2_Clean -->|success| P3_Template[检查user-templates,<br/>然后读取模板:<br/>outline-detailed-template.md]
    P3_Template --> P3_Expand[扩展简要大纲]
    P3_Expand --> P3_Create[创建文件:<br/>.novel-workflow/stories/{name}/<br/>outline-detailed.md]
    P3_Create --> P3_Approve[approvals<br/>action: request<br/>仅filePath]
    P3_Approve --> P3_Status[approvals<br/>action: status<br/>轮询状态]
    P3_Status --> P3_Check{Status?}
    P3_Check -->|needs-revision| P3_Update[根据用户评论更新文档]
    P3_Update --> P3_Create
    P3_Check -->|approved| P3_Clean[approvals<br/>action: delete]
    P3_Clean -->|failed| P3_Status

    %% 阶段 4: 场景清单
    P3_Clean -->|success| P4_Template[检查user-templates,<br/>然后读取模板:<br/>scenes-template.md]
    P4_Template --> P4_Break[转换大纲为场景]
    P4_Break --> P4_Create[创建文件:<br/>.novel-workflow/stories/{name}/<br/>scenes.md]
    P4_Create --> P4_Approve[approvals<br/>action: request<br/>仅filePath]
    P4_Approve --> P4_Status[approvals<br/>action: status<br/>轮询状态]
    P4_Status --> P4_Check{Status?}
    P4_Check -->|needs-revision| P4_Update[根据用户评论更新文档]
    P4_Update --> P4_Create
    P4_Check -->|approved| P4_Clean[approvals<br/>action: delete]
    P4_Clean -->|failed| P4_Status

    %% 阶段 5: 正文创作
    P4_Clean -->|success| P5_Ready[场景清单完成.<br/>准备开始写作?]
    P5_Ready -->|Yes| P5_Status[story-status]
    P5_Status --> P5_Scene[编辑scenes.md:<br/>将[ ]改为[-]<br/>标记进行中]
    P5_Scene --> P5_Write[撰写场景正文]
    P5_Write --> P5_Complete[编辑scenes.md:<br/>将[-]改为[x]<br/>标记已完成]
    P5_Complete --> P5_More{更多场景?}
    P5_More -->|Yes| P5_Scene
    P5_More -->|No| End([创作完成])

    style Start fill:#e1f5e1
    style End fill:#e1f5e1
    style P1_Check fill:#ffe6e6
    style P2_Check fill:#ffe6e6
    style P3_Check fill:#ffe6e6
    style P4_Check fill:#ffe6e6
    style CheckSteering fill:#fff4e6
    style P0_Create fill:#fff4e6
    style P5_More fill:#fff4e6
\`\`\`

## 小说创作工作流

### 阶段 0: 指导文档（可选但推荐）
**目的**：建立故事的基础框架和世界观。

**文件操作**：
- 创建故事概念：\`.novel-workflow/steering/story-concept.md\`
- 创建世界观设定：\`.novel-workflow/steering/world-building.md\`
- 创建人物档案：\`.novel-workflow/steering/character-profiles.md\`

**工具**：
- approvals：管理审批工作流（操作：request, status, delete）

**流程**：
1. 检查\`.novel-workflow/user-templates/\`是否有自定义模板
2. 如无自定义模板，从\`.novel-workflow/templates/\`读取对应模板
3. 基于用户创意研究类似作品（如可用网络搜索，当前年份：${currentYear}）
4. 创建指导文档
5. 使用approvals工具请求审批（action:'request'，仅提供filePath，绝不提供content）
6. 使用approvals轮询状态（action:'status'）直到approved/needs-revision（绝不接受口头批准）
7. 如needs-revision：根据评论更新文档，创建新审批，不要继续
8. 一旦approved：使用approvals删除（action:'delete'，必须成功）然后继续
9. 如删除失败：停止 - 返回轮询

### 阶段 1: 简要大纲
**目的**：定义故事核心 - 一句话概括和五句话梗概。

**文件操作**：
- 检查自定义模板：\`.novel-workflow/user-templates/outline-brief-template.md\`
- 读取模板：\`.novel-workflow/templates/outline-brief-template.md\`（如无自定义）
- 创建文档：\`.novel-workflow/stories/{story-name}/outline-brief.md\`

**工具**：
- approvals：管理审批工作流

**流程**：
1. 检查\`.novel-workflow/user-templates/outline-brief-template.md\`
2. 如无自定义，从\`.novel-workflow/templates/outline-brief-template.md\`读取
3. 提取故事核心要素：
   - 一句话概括（类型+主角+任务，≤25词）
   - 五句话梗概（三幕式结构）
   - 两次两难抉择
   - 道德前提
4. 在\`.novel-workflow/stories/{story-name}/outline-brief.md\`创建文档
5. 使用approvals请求审批（action:'request'）
6. 轮询状态（action:'status'）直到approved/needs-revision
7. 如needs-revision：更新文档，创建新审批，不要继续
8. 一旦approved：删除审批（action:'delete'，必须成功）然后继续
9. 如删除失败：停止 - 返回轮询

### 阶段 2: 详细大纲
**目的**：扩展为完整的四页详细大纲（每页约1500字）。

**文件操作**：
- 检查自定义模板：\`.novel-workflow/user-templates/outline-detailed-template.md\`
- 读取模板：\`.novel-workflow/templates/outline-detailed-template.md\`（如无自定义）
- 创建文档：\`.novel-workflow/stories/{story-name}/outline-detailed.md\`

**工具**：
- approvals：管理审批工作流

**流程**：
1. 检查\`.novel-workflow/user-templates/outline-detailed-template.md\`
2. 如无自定义，从\`.novel-workflow/templates/outline-detailed-template.md\`读取
3. 参考世界观和人物档案（如已创建）
4. 将简要大纲扩展为详细大纲：
   - 第一幕：开端（约25%）
   - 第二幕前半：上升行动（约25%）
   - 第二幕后半：危机深化（约25%，包含两次两难抉择）
   - 第三幕：高潮与结局（约25%）
   - 完整人物弧线
   - 主题线索
   - 伏笔与呼应
5. 在\`.novel-workflow/stories/{story-name}/outline-detailed.md\`创建文档
6. 使用approvals请求审批（action:'request'）
7. 轮询状态（action:'status'）直到approved/needs-revision
8. 如needs-revision：更新文档，创建新审批，不要继续
9. 一旦approved：删除审批（action:'delete'，必须成功）然后继续
10. 如删除失败：停止 - 返回轮询

### 阶段 3: 场景清单
**目的**：将大纲分解为可执行的场景列表。

**文件操作**：
- 检查自定义模板：\`.novel-workflow/user-templates/scenes-template.md\`
- 读取模板：\`.novel-workflow/templates/scenes-template.md\`（如无自定义）
- 创建文档：\`.novel-workflow/stories/{story-name}/scenes.md\`

**工具**：
- approvals：管理审批工作流

**流程**：
1. 检查\`.novel-workflow/user-templates/scenes-template.md\`
2. 如无自定义，从\`.novel-workflow/templates/scenes-template.md\`读取
3. 将详细大纲转换为场景列表
4. 每个场景包含：
   - 场景编号（如1.1, 2.3）
   - 场景类型（主动/被动）
   - 视点人物
   - 场景三要素（主动：目标/冲突/挫折；被动：反应/困境/决定）
   - 关键内容要点
5. **重要**：为每个场景生成_Prompt字段：
   - Role：适合该场景的写作角色
   - Task：清晰的场景描述和上下文引用
   - Restrictions：避免事项和约束
   - Success：具体的质量标准
   - 包含_OutlineBrief和_OutlineDetailed引用
6. 在\`.novel-workflow/stories/{story-name}/scenes.md\`创建文档
7. 使用approvals请求审批（action:'request'）
8. 轮询状态（action:'status'）直到approved/needs-revision
9. 如needs-revision：更新文档，创建新审批，不要继续
10. 一旦approved：删除审批（action:'delete'，必须成功）然后继续
11. 如删除失败：停止 - 返回轮询
12. 成功清理后："场景清单完成。准备开始写作？"

### 阶段 4: 正文创作
**目的**：系统性地撰写每个场景。

**文件操作**：
- 读取故事文档：\`.novel-workflow/stories/{story-name}/*.md\`（如返回工作）
- 编辑scenes.md更新状态：
  - \`- [ ]\` = 待写场景
  - \`- [-]\` = 进行中场景
  - \`- [x]\` = 已完成场景

**工具**：
- story-status：检查整体进度
- write-scene提示词：场景写作指导
- 直接编辑：在scenes.md中标记场景为进行中[-]或完成[x]

**流程**：
1. 使用story-status检查当前状态
2. 读取\`scenes.md\`查看所有场景
3. 对于每个场景：
   - 编辑scenes.md：将开始的场景从\`[ ]\`改为\`[-]\`
   - **读取_Prompt字段**获取角色、方法和成功标准的指导
   - 遵循_OutlineBrief和_OutlineDetailed字段对应大纲部分
   - 根据场景类型撰写：
     * 主动场景：目标 → 冲突 → 挫折
     * 被动场景：反应 → 困境 → 决定
   - 参考人物档案保持人物一致性
   - 参考世界观设定保持设定一致
   - 使用生动的描写和强烈的画面感
   - 测试场景是否符合成功标准
   - 编辑scenes.md：完成后将\`[-]\`改为\`[x]\`
4. 继续直到所有场景都标记为\`[x]\`

## 工作流程规则

- 在指定文件路径直接创建文档
- 从\`.novel-workflow/templates/\`目录读取模板
- 遵循准确的模板结构
- 各阶段间获取明确的用户批准（使用approvals工具，action:'request'）
- 按顺序完成阶段（不跳过）
- 每次一个故事
- 故事名称使用kebab-case
- 审批请求：仅提供filePath，绝不提供content
- 阻塞：如审批删除失败绝不继续
- 关键：必须有approved状态且成功清理才能进入下一阶段
- 关键：绝不接受口头批准 - 仅通过仪表板或VS Code扩展
- 绝不在用户说"approved"后继续 - 仅检查系统状态
- 指导文档（steering）可选 - 仅在明确请求时创建

## 文件结构
\`\`\`
.novel-workflow/
├── templates/           # 服务器启动时自动填充
│   ├── outline-brief-template.md
│   ├── outline-detailed-template.md
│   ├── scenes-template.md
│   ├── story-concept-template.md
│   ├── world-building-template.md
│   └── character-profiles-template.md
├── stories/
│   └── {story-name}/
│       ├── outline-brief.md
│       ├── outline-detailed.md
│       └── scenes.md
└── steering/
    ├── story-concept.md
    ├── world-building.md
    └── character-profiles.md
\`\`\`

## 场景类型说明

### 主动场景（Action Scene）
由角色主动推动，包含三要素：
- **目标（Goal）**：视点人物想达成什么
- **冲突（Conflict）**：遇到的阻碍和对抗
- **挫折（Disaster）**：目标失败或付出代价

### 被动场景（Reaction Scene）
角色对主动场景的反应，包含三要素：
- **反应（Reaction）**：对前一场景的情绪反应
- **困境（Dilemma）**：分析当前困境，权衡选择
- **决定（Decision）**：做出下一步行动的决定

建议主动和被动场景交替出现，创造节奏。

## 两难抉择设计

每个故事应包含两次重大两难抉择：

### 第一次两难（第二幕后半）
- 时间点：约故事50-60%处
- 特点：艰难但不致命的选择
- 后果：引发更深的矛盾

### 第二次两难（第三幕）
- 时间点：约故事75-85%处  
- 特点：涉及核心价值观的痛苦选择
- 后果：体现主角成长，决定故事走向

两难必须真正艰难：两个选项都有合理性，都需要重大牺牲。`;
}

