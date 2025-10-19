import { Prompt, PromptMessage } from '@modelcontextprotocol/sdk/types.js';
import { PromptDefinition } from './types.js';
import { ToolContext } from '../types.js';

const prompt: Prompt = {
  name: 'story-status',
  title: 'Story Status Overview',
  description: 'Get comprehensive status overview of story documents, scenes, and approval workflows. Useful for tracking writing progress and planning.',
  arguments: [
    {
      name: 'storyName',
      description: 'Story name in kebab-case to get status for (optional - if not provided, shows all stories)',
      required: false
    },
    {
      name: 'detailed',
      description: 'Show detailed status including scene breakdown and approval history',
      required: false
    }
  ]
};

async function handler(args: Record<string, any>, context: ToolContext): Promise<PromptMessage[]> {
  const { storyName, detailed } = args;

  const scope = storyName ? `the "${storyName}" story` : 'all stories in the project';
  const detailLevel = detailed ? 'detailed' : 'summary';

  const messages: PromptMessage[] = [
    {
      role: 'user',
      content: {
        type: 'text',
        text: `Get ${detailLevel} status overview for ${scope}.

**Context:**
- Project: ${context.projectPath}
${storyName ? `- Story: ${storyName}` : '- Scope: All stories'}
- Detail level: ${detailLevel}
${context.dashboardUrl ? `- Dashboard: ${context.dashboardUrl}` : ''}

**Instructions:**
${storyName ? 
  `1. Use the story-status tool with storyName "${storyName}" to get status information
2. If you need detailed scene information, read the scenes.md file directly at .novel-workflow/stories/${storyName}/scenes.md
3. Check for any pending approvals using approvals tool with action:'status'` :
  `1. List directory .novel-workflow/stories/ to see all stories
2. Use the story-status tool to get status for each story
3. Provide a consolidated overview of writing progress`}

**Status Information Includes:**
- **Document Status**: Which documents exist (outline-brief, outline-detailed, scenes)
- **Scene Progress**: Completion status and remaining scenes to write
- **Approval Status**: Pending, approved, or rejected approvals
- **File Information**: Last modified dates and file sizes
- **Workflow Stage**: Current phase in the novel writing process

**Workflow Stages:**
1. **Concept**: Story concept document created and approved
2. **Outline**: Outlines (brief and detailed) created and approved  
3. **Scene Planning**: Scenes document defined and approved
4. **Writing**: Scenes being written one by one
5. **Review**: Writing complete, awaiting final review
6. **Complete**: All scenes written and approved

${detailed ? `**Detailed Information Includes:**
- Individual scene breakdown with completion status
- Approval request history and reviewer comments
- File modification timestamps
- Steering document references (world-building, character-profiles)
- Chapter and scene organization` : ''}

Please provide a comprehensive status report that helps understand the current writing progress and next steps.`
      }
    }
  ];

  return messages;
}

export const storyStatusPrompt: PromptDefinition = {
  prompt,
  handler
};

