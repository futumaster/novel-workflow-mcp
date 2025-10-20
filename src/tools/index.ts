import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { novelWorkflowGuideTool, novelWorkflowGuideHandler } from './novel-workflow-guide.js';
import { storyStatusTool, storyStatusHandler } from './story-status.js';
import { steeringGuideTool, steeringGuideHandler } from './steering-guide.js';
import { approvalsTool, approvalsHandler } from './approvals.js';
import { ToolContext, ToolResponse, MCPToolResponse, toMCPResponse } from '../types.js';

export function registerTools(): Tool[] {
  return [
    novelWorkflowGuideTool,
    storyStatusTool,
    steeringGuideTool,
    approvalsTool
  ];
}

export async function handleToolCall(name: string, args: any, context: ToolContext): Promise<MCPToolResponse> {
  let response: ToolResponse;
  let isError = false;

  try {
    switch (name) {
      case 'novel-workflow-guide':
        response = await novelWorkflowGuideHandler(args, context);
        break;
      case 'story-status':
        response = await storyStatusHandler(args, context);
        break;
      case 'steering-guide':
        response = await steeringGuideHandler(args, context);
        break;
      case 'approvals':
        response = await approvalsHandler(args, context);
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    // Check if the response indicates an error
    isError = !response.success;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    response = {
      success: false,
      message: `Tool execution failed: ${errorMessage}`
    };
    isError = true;
  }

  return toMCPResponse(response, isError);
}