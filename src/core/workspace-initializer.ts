import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PathUtils } from './path-utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export class WorkspaceInitializer {
  private projectPath: string;
  private version: string;
  
  constructor(projectPath: string, version: string) {
    this.projectPath = projectPath;
    this.version = version;
  }
  
  async initializeWorkspace(): Promise<void> {
    // Create all necessary directories
    await this.initializeDirectories();
    
    // Copy template files
    await this.initializeTemplates();
    
    // Create config example
    await this.createConfigExample();
    
    // Create user templates README
    await this.createUserTemplatesReadme();
  }
  
  private async initializeDirectories(): Promise<void> {
    const workflowRoot = PathUtils.getWorkflowRoot(this.projectPath);
    
    const directories = [
      'approvals',
      'archive', 
      'stories',
      'steering',
      'templates',
      'user-templates'
    ];
    
    for (const dir of directories) {
      const dirPath = join(workflowRoot, dir);
      await fs.mkdir(dirPath, { recursive: true });
    }
  }
  
  private async initializeTemplates(): Promise<void> {
    const templatesDir = join(PathUtils.getWorkflowRoot(this.projectPath), 'templates');
    
    const templates = [
      // Story document templates
      'outline-brief-template',
      'outline-detailed-template',
      'scenes-template',
      // Steering document templates
      'story-concept-template',
      'world-building-template',
      'character-profiles-template',
      // Writing guides and tools
      'scene-writing-techniques',
      'sensory-writing-guide',
      'reference-analysis-template',
      'short-story-template',
      'revision-guide-template'
    ];
    
    for (const template of templates) {
      await this.copyTemplate(template, templatesDir);
    }
  }
  
  private async copyTemplate(templateName: string, targetDir: string): Promise<void> {
    // Use simple filename without version
    const targetFileName = `${templateName}.md`;
    const targetPath = join(targetDir, targetFileName);
    
    const sourcePath = join(__dirname, '..', 'markdown', 'templates', `${templateName}.md`);
    
    try {
      const content = await fs.readFile(sourcePath, 'utf-8');
      
      // Always overwrite to ensure latest template version is used
      await fs.writeFile(targetPath, content, 'utf-8');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      // Failed to copy template (silent error)
    }
  }
  
  private async createConfigExample(): Promise<void> {
    const configPath = join(PathUtils.getWorkflowRoot(this.projectPath), 'config.example.toml');
    
    const configContent = `# Novel Workflow MCP Server Configuration File
# ==============================================
#
# This is an example configuration file for the Novel Workflow MCP Server.
# Copy this file to 'config.toml' in the same directory to use it.
#
# Configuration Precedence:
# 1. Command-line arguments (highest priority)
# 2. Config file settings
# 3. Built-in defaults (lowest priority)
#
# All settings are optional. Uncomment and modify as needed.
# Please note that not all MCP clients will support loading this config file due to the nature of where they are running from.

# Project directory path
# The root directory of your novel project where story files are located.
# Note: You may have to use double slashes (\\\\) instead of single slashes (/) on Windows or for certain clients.
# Supports tilde (~) expansion for home directory.
# Default: current working directory
# projectDir = "."
# projectDir = "~/my-novel"
# projectDir = "/absolute/path/to/novel-project"

# Dashboard port
# The port number for the web dashboard.
# Must be between 1024 and 65535.
# Default: ephemeral port (automatically assigned)
# port = 3000

# Auto-start dashboard
# Automatically launch the dashboard when the MCP server starts.
# The dashboard will open in your default browser.
# Default: false
# autoStartDashboard = false

# Dashboard-only mode
# Run only the web dashboard without the MCP server.
# Useful for standalone dashboard usage.
# Default: false
# dashboardOnly = false

# Language
# Set the interface language for internationalization (i18n).
# Available languages depend on your installation.
# Common values: "en" (English), "ja" (Japanese), etc.
# Default: system language or "en"
# lang = "en"

# Example configurations:
# =====================

# Example 1: Writing setup with auto-started dashboard
# -------------------------------------------------------
# projectDir = "~/novels/my-fantasy-novel"
# autoStartDashboard = true
# port = 3456

# Example 2: Production server without dashboard
# -----------------------------------------------
# projectDir = "/var/novels/published"
# autoStartDashboard = false

# Example 3: Dashboard-only mode for viewing stories
# ---------------------------------------------------
# projectDir = "."
# dashboardOnly = true
# port = 8080

# Example 4: Chinese language interface  
# --------------------------------------
# lang = "zh"
# autoStartDashboard = true`;
    
    try {
      // Only create if it doesn't exist to avoid overwriting user's example
      await fs.access(configPath);
    } catch {
      // File doesn't exist, create it
      await fs.writeFile(configPath, configContent, 'utf-8');
    }
  }
  
  private async createUserTemplatesReadme(): Promise<void> {
    const readmePath = join(PathUtils.getWorkflowRoot(this.projectPath), 'user-templates', 'README.md');
    
    const readmeContent = `# 自定义模板

此目录允许你创建自定义模板，覆盖默认的小说创作模板。

## 如何使用自定义模板

1. **在此目录创建自定义模板文件**，文件名必须与要覆盖的默认模板完全相同：
   - \`outline-brief-template.md\` - 覆盖简要大纲模板
   - \`outline-detailed-template.md\` - 覆盖详细大纲模板  
   - \`scenes-template.md\` - 覆盖场景清单模板
   - \`story-concept-template.md\` - 覆盖故事概念模板
   - \`world-building-template.md\` - 覆盖世界观设定模板
   - \`character-profiles-template.md\` - 覆盖人物档案模板

2. **模板加载优先级**：
   - 系统首先检查此 \`user-templates/\` 目录
   - 如果找到匹配的模板，将使用自定义模板
   - 否则，将使用 \`templates/\` 中的默认模板

## 自定义模板示例

创建自定义简要大纲模板：

1. 在此目录创建名为 \`outline-brief-template.md\` 的文件
2. 添加你的自定义结构，例如：

\`\`\`markdown
# 简要大纲

## 作品信息
[你的自定义字段]

## 核心概念
[你的自定义结构]

## 故事梗概
[你的自定义要求]

## 自定义章节
[添加任何特定于你创作流程的章节]
\`\`\`

## 模板变量

模板可以包含占位符，创建文档时会被替换：
- \`{{projectName}}\` - 项目名称
- \`{{storyName}}\` - 故事名称
- \`{{date}}\` - 当前日期
- \`{{author}}\` - 作者名称

## 最佳实践

1. **从默认模板开始**：从 \`../templates/\` 复制默认模板作为起点
2. **保持结构一致**：维持相似的章节标题以保证工具兼容性
3. **记录变更**：添加注释说明为什么添加/修改某些章节
4. **版本控制**：在版本控制中跟踪你的自定义模板
5. **充分测试**：确保自定义模板与小说工作流工具正常工作

## 注意事项

- 自定义模板是项目特定的，不包含在软件包分发中
- \`templates/\` 目录包含随版本更新的默认模板
- 此目录中的自定义模板在更新时会保留
- 如果自定义模板有错误，系统将回退到默认模板
`;
    
    try {
      // Only create if it doesn't exist to avoid overwriting user's README
      await fs.access(readmePath);
    } catch {
      // File doesn't exist, create it
      await fs.writeFile(readmePath, readmeContent, 'utf-8');
    }
  }
}