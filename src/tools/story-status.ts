import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolContext, ToolResponse } from '../types.js';
import { PathUtils } from '../core/path-utils.js';
import { SpecParser } from '../core/parser.js';

export const storyStatusTool: Tool = {
  name: 'story-status',
  description: `Display comprehensive story writing progress overview.

# Instructions
Call when resuming work on a story or checking overall completion status. Shows which phases are complete and scene writing progress. After viewing status, read scenes.md directly to see all scenes and their status markers ([ ] pending, [-] in-progress, [x] completed).`,
  inputSchema: {
    type: 'object',
    properties: {
      projectPath: { 
        type: 'string',
        description: 'Absolute path to the project root'
      },
      storyName: { 
        type: 'string',
        description: 'Name of the story'
      }
    },
    required: ['projectPath', 'storyName']
  }
};

export async function storyStatusHandler(args: any, context: ToolContext): Promise<ToolResponse> {
  const { projectPath, storyName } = args;

  try {
    const parser = new SpecParser(projectPath);
    const story = await parser.getSpec(storyName);
    
    if (!story) {
      return {
        success: false,
        message: `Story '${storyName}' not found`,
        nextSteps: [
          'Check story name',
          'Use story-list for available stories',
          'Create story with create-story-doc'
        ]
      };
    }

    // Determine current phase and overall status
    let currentPhase = 'not-started';
    let overallStatus = 'not-started';
    
    // Map spec document names to story document names
    const hasOutlineBrief = story.phases.requirements?.exists;
    const hasOutlineDetailed = story.phases.design?.exists;
    const hasScenes = story.phases.tasks?.exists;
    
    if (!hasOutlineBrief) {
      currentPhase = 'outline-brief';
      overallStatus = 'outline-brief-needed';
    } else if (!hasOutlineDetailed) {
      currentPhase = 'outline-detailed';
      overallStatus = 'outline-detailed-needed';
    } else if (!hasScenes) {
      currentPhase = 'scenes';
      overallStatus = 'scenes-needed';
    } else if (story.taskProgress && story.taskProgress.pending > 0) {
      currentPhase = 'writing';
      overallStatus = 'writing-in-progress';
    } else if (story.taskProgress && story.taskProgress.total > 0 && story.taskProgress.completed === story.taskProgress.total) {
      currentPhase = 'completed';
      overallStatus = 'completed';
    } else {
      currentPhase = 'writing';
      overallStatus = 'ready-to-write';
    }

    // Phase details (with story-friendly names)
    const phaseDetails = [
      {
        name: 'Brief Outline (简要大纲)',
        status: hasOutlineBrief ? (story.phases.requirements?.approved ? 'approved' : 'created') : 'missing',
        lastModified: story.phases.requirements?.lastModified
      },
      {
        name: 'Detailed Outline (详细大纲)',
        status: hasOutlineDetailed ? (story.phases.design?.approved ? 'approved' : 'created') : 'missing',
        lastModified: story.phases.design?.lastModified
      },
      {
        name: 'Scenes (场景清单)',
        status: hasScenes ? (story.phases.tasks?.approved ? 'approved' : 'created') : 'missing',
        lastModified: story.phases.tasks?.lastModified
      },
      {
        name: 'Writing (正文创作)',
        status: story.phases.implementation?.exists ? 'in-progress' : 'not-started',
        progress: story.taskProgress
      }
    ];

    // Next steps based on current phase
    const nextSteps = [];
    switch (currentPhase) {
      case 'outline-brief':
        nextSteps.push('Read template: .novel-workflow/templates/outline-brief-template.md');
        nextSteps.push('Create: .novel-workflow/stories/{name}/outline-brief.md');
        nextSteps.push('Request approval');
        break;
      case 'outline-detailed':
        nextSteps.push('Read template: .novel-workflow/templates/outline-detailed-template.md');
        nextSteps.push('Expand brief outline to detailed four-page outline');
        nextSteps.push('Create: .novel-workflow/stories/{name}/outline-detailed.md');
        nextSteps.push('Request approval');
        break;
      case 'scenes':
        nextSteps.push('Read template: .novel-workflow/templates/scenes-template.md');
        nextSteps.push('Break detailed outline into scenes');
        nextSteps.push('Create: .novel-workflow/stories/{name}/scenes.md');
        nextSteps.push('Request approval');
        break;
      case 'writing':
        if (story.taskProgress && story.taskProgress.pending > 0) {
          nextSteps.push(`Read scenes: .novel-workflow/stories/${storyName}/scenes.md`);
          nextSteps.push('Edit scenes.md: Change [ ] to [-] for scene you start writing');
          nextSteps.push('Write the scene following the _Prompt guidance');
          nextSteps.push('Edit scenes.md: Change [-] to [x] when scene is completed');
        } else {
          nextSteps.push(`Read scenes: .novel-workflow/stories/${storyName}/scenes.md`);
          nextSteps.push('Begin writing by marking first scene [-]');
        }
        break;
      case 'completed':
        nextSteps.push('All scenes completed (marked [x])');
        nextSteps.push('Review and polish the full manuscript');
        break;
    }

    return {
      success: true,
      message: `Story '${storyName}' status: ${overallStatus}`,
      data: {
        name: storyName,
        description: story.description,
        currentPhase,
        overallStatus,
        createdAt: story.createdAt,
        lastModified: story.lastModified,
        phases: phaseDetails,
        sceneProgress: story.taskProgress || {
          total: 0,
          completed: 0,
          pending: 0,
          inProgress: 0
        }
      },
      nextSteps,
      projectContext: {
        projectPath,
        workflowRoot: PathUtils.getWorkflowRoot(projectPath),
        currentPhase,
        dashboardUrl: context.dashboardUrl
      }
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `Failed to get story status: ${errorMessage}`,
      nextSteps: [
        'Check if the story exists',
        'Verify the project path',
        'List directory .novel-workflow/stories/ to see available stories'
      ]
    };
  }
}

