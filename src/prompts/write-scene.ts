import { Prompt, PromptMessage } from '@modelcontextprotocol/sdk/types.js';
import { PromptDefinition } from './types.js';
import { ToolContext } from '../types.js';

const prompt: Prompt = {
  name: 'write-scene',
  title: 'Write Story Scene',
  description: 'Guide for writing a specific scene from the scenes.md document. Provides comprehensive instructions for scene writing, including reading _Prompt fields, marking progress, and completion criteria.',
  arguments: [
    {
      name: 'storyName',
      description: 'Story name in kebab-case for the scene to write',
      required: true
    },
    {
      name: 'sceneId',
      description: 'Specific scene ID to write (e.g., "1.1", "2.3", "5.2")',
      required: false
    }
  ]
};

async function handler(args: Record<string, any>, context: ToolContext): Promise<PromptMessage[]> {
  const { storyName, sceneId } = args;
  
  if (!storyName) {
    throw new Error('storyName is a required argument');
  }

  const messages: PromptMessage[] = [
    {
      role: 'user',
      content: {
        type: 'text',
        text: `Write ${sceneId ? `scene ${sceneId}` : 'the next pending scene'} for the "${storyName}" story.

**Context:**
- Project: ${context.projectPath}
- Story: ${storyName}
${sceneId ? `- Scene ID: ${sceneId}` : ''}
${context.dashboardUrl ? `- Dashboard: ${context.dashboardUrl}` : ''}

**Writing Workflow:**

1. **Check Current Status:**
   - Use the story-status tool with storyName "${storyName}" to see overall progress
   - Read .novel-workflow/stories/${storyName}/scenes.md to see all scenes
   - Identify ${sceneId ? `scene ${sceneId}` : 'the next pending scene marked with [ ]'}

2. **Start the Scene:**
   - Edit .novel-workflow/stories/${storyName}/scenes.md directly
   - Change the scene marker from [ ] to [-] for the scene you're starting
   - Only one scene should be in-progress at a time

3. **Read Scene Guidance:**
   - Look for the _Prompt field in the scene - it contains structured writing guidance:
     - Role: The writer's approach to assume (e.g., "Novelist skilled in action scenes")
     - Task: Clear description of what to write with context references
     - Restrictions: What to avoid and constraints (word count, POV, tone, etc.)
     - Success: Specific quality criteria for the scene
   - Note the _OutlineBrief fields for which part of the brief outline this implements
   - Check _OutlineDetailed fields for which part of the detailed outline this connects to
   - Understand scene type (Active vs Reactive) and the three elements required

4. **Write the Scene:**
   - Follow the _Prompt guidance exactly
   - For Active scenes, include: Goal (what character wants) / Conflict (obstacles) / Disaster (setback)
   - For Reactive scenes, include: Reaction (emotional response) / Dilemma (weighing options) / Decision (choosing next action)
   - Match the character voice and personality from character-profiles.md
   - Follow the world-building rules from world-building.md
   - Write vivid, engaging prose with strong imagery
   - Show don't tell - use action and dialogue to reveal character and advance plot
   - Maintain consistent POV and tense

5. **Complete the Scene:**
   - Verify all success criteria from the _Prompt are met
   - Check that the scene:
     - Advances the plot or develops character
     - Has clear conflict or tension
     - Follows the outline guidance
     - Matches the story's tone and style
     - Meets the specified word count range
   - Edit .novel-workflow/stories/${storyName}/scenes.md directly
   - Change the scene marker from [-] to [x] for the completed scene
   - Only mark complete when the scene is fully written and polished

**Important Guidelines:**
- Always mark a scene as in-progress before starting to write
- Follow the _Prompt field guidance for role, approach, and success criteria
- Stay true to character voices and personalities from character-profiles.md
- Respect the world-building rules and constraints
- Each scene should have vivid sensory details and strong imagery
- Balance action, dialogue, and internal thoughts
- Every scene must have conflict or tension
- If a chapter has multiple scenes (e.g., 4.1, 4.2), complete them in order
- If you encounter creative blocks, review the detailed outline for guidance

**Tools to Use:**
- story-status: Check overall progress
- Edit: Directly update scene markers in scenes.md file
- Read/Write/Edit: Write the actual scene content
- Read: Review steering documents for character and world details

Please proceed with writing ${sceneId ? `scene ${sceneId}` : 'the next scene'} following this workflow.`
      }
    }
  ];

  return messages;
}

export const writeScenePrompt: PromptDefinition = {
  prompt,
  handler
};

