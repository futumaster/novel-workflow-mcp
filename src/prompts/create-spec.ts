import { Prompt, PromptMessage } from '@modelcontextprotocol/sdk/types.js';
import { PromptDefinition } from './types.js';
import { ToolContext } from '../types.js';

const prompt: Prompt = {
  name: 'create-story',
  title: 'Create Story Document',
  description: 'Guide for creating story documents directly in the file system. Shows how to use templates and create outline-brief, outline-detailed, or scenes documents at the correct paths.',
  arguments: [
    {
      name: 'storyName',
      description: 'Story name in kebab-case (e.g., fantasy-adventure, urban-romance)',
      required: true
    },
    {
      name: 'documentType', 
      description: 'Type of document to create: outline-brief, outline-detailed, or scenes',
      required: true
    },
    {
      name: 'description',
      description: 'Brief description of what this story is about',
      required: false
    }
  ]
};

async function handler(args: Record<string, any>, context: ToolContext): Promise<PromptMessage[]> {
  const { storyName, documentType, description } = args;
  
  if (!storyName || !documentType) {
    throw new Error('storyName and documentType are required arguments');
  }

  const validDocTypes = ['outline-brief', 'outline-detailed', 'scenes'];
  if (!validDocTypes.includes(documentType)) {
    throw new Error(`documentType must be one of: ${validDocTypes.join(', ')}`);
  }

  // Build context-aware messages
  const messages: PromptMessage[] = [
    {
      role: 'user',
      content: {
        type: 'text',
        text: `Create a ${documentType} document for the "${storyName}" story using the novel-workflow methodology.

**Context:**
- Project: ${context.projectPath}
- Story: ${storyName}
- Document type: ${documentType}
${description ? `- Description: ${description}` : ''}
${context.dashboardUrl ? `- Dashboard: ${context.dashboardUrl}` : ''}

**Instructions:**
1. First, read the template at: .novel-workflow/templates/${documentType}-template.md
2. Follow the template structure exactly - this ensures consistency across your stories
3. Create comprehensive content that follows professional novel writing best practices
4. Include all required sections from the template
5. Use vivid, engaging language with strong imagery
6. Create the document at: .novel-workflow/stories/${storyName}/${documentType}.md
7. After creating, use approvals tool with action:'request' to get user approval

**File Paths:**
- Template location: .novel-workflow/templates/${documentType}-template.md
- Document destination: .novel-workflow/stories/${storyName}/${documentType}.md

**Workflow Guidelines:**
- Outline-brief documents define the core story concept (one-liner + five-sentence summary)
- Outline-detailed documents expand into full four-page outline with complete plot structure
- Scenes documents break down the story into actionable scene-by-scene writing tasks
- Each document builds upon the previous one in sequence
- Templates are automatically updated on server start

${documentType === 'scenes' ? `
**Special Instructions for Scenes Document:**
- For each scene, generate a _Prompt field with structured writing guidance
- Format: _Prompt: Role: [writer type] | Task: [scene description] | Restrictions: [constraints] | Success: [quality criteria]
- Make prompts specific to the story context and character development
- Include _OutlineBrief fields showing which part of the brief outline this scene implements
- Include _OutlineDetailed fields showing which part of the detailed outline this scene implements
- Scenes should alternate between active (Goal/Conflict/Disaster) and reactive (Reaction/Dilemma/Decision)
- Each scene should have clear conflict and advance the plot or character development
` : ''}

Please read the ${documentType} template and create the comprehensive document at the specified path.`
      }
    }
  ];

  return messages;
}

export const createStoryPrompt: PromptDefinition = {
  prompt,
  handler
};