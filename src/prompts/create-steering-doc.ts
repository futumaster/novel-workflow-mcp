import { Prompt, PromptMessage } from '@modelcontextprotocol/sdk/types.js';
import { PromptDefinition } from './types.js';
import { ToolContext } from '../types.js';

const prompt: Prompt = {
  name: 'create-steering-doc',
  title: 'Create Steering Document',
  description: 'Guide for creating story steering documents (story-concept, world-building, character-profiles) directly in the file system. These provide high-level story guidance.',
  arguments: [
    {
      name: 'docType',
      description: 'Type of steering document: story-concept, world-building, or character-profiles',
      required: true
    },
    {
      name: 'scope',
      description: 'Scope of the steering document (e.g., main-story, subplot, series)',
      required: false
    }
  ]
};

async function handler(args: Record<string, any>, context: ToolContext): Promise<PromptMessage[]> {
  const { docType, scope } = args;
  
  if (!docType) {
    throw new Error('docType is a required argument');
  }

  const validDocTypes = ['story-concept', 'world-building', 'character-profiles'];
  if (!validDocTypes.includes(docType)) {
    throw new Error(`docType must be one of: ${validDocTypes.join(', ')}`);
  }

  const messages: PromptMessage[] = [
    {
      role: 'user',
      content: {
        type: 'text',
        text: `Create a ${docType} steering document for the novel project.

**Context:**
- Project: ${context.projectPath}
- Steering document type: ${docType}
${scope ? `- Scope: ${scope}` : ''}
${context.dashboardUrl ? `- Dashboard: ${context.dashboardUrl}` : ''}

**Instructions:**
1. First, read the template at: .novel-workflow/templates/${docType}-template.md
2. Check if steering docs exist at: .novel-workflow/steering/
3. Create comprehensive content following the template structure
4. Create the document at: .novel-workflow/steering/${docType}.md
5. After creating, use approvals tool with action:'request' to get user approval

**File Paths:**
- Template location: .novel-workflow/templates/${docType}-template.md
- Document destination: .novel-workflow/steering/${docType}.md

**Steering Document Types:**
- **story-concept**: Defines story core concept, one-liner, five-sentence summary, themes, and two dilemmas
- **world-building**: Documents world setting, power system, social structure, and unique elements
- **character-profiles**: Maps all character profiles, backgrounds, arcs, and relationships

**Key Principles:**
- Be vivid and specific with strong imagery
- Include examples and specific details
- Consider both plot and character development
- Provide clear guidance for story writing
- Templates are automatically updated on server start

Please read the ${docType} template and create a comprehensive steering document at the specified path.`
      }
    }
  ];

  return messages;
}

export const createSteeringDocPrompt: PromptDefinition = {
  prompt,
  handler
};