# 发布到 NPM 指南

## 📦 发布步骤

### 1. 确保已登录 npm

```bash
npm whoami
```

如果未登录，先登录：

```bash
npm login
```

输入你的：
- npm 用户名
- 密码
- 邮箱
- 双因素认证码（如果启用）

### 2. 确认 package.json 配置

检查以下内容已正确设置：

```json
{
  "name": "@ttaqt/novel-workflow-mcp",
  "version": "1.0.0",
  "description": "MCP server for AI-assisted novel writing workflow",
  "main": "dist/index.js",
  "bin": {
    "novel-workflow-mcp": "dist/index.js"
  },
  "files": [
    "dist/**/*",
    "README.md",
    "LICENSE"
  ]
}
```

### 3. 发布到 npm

```bash
cd /Users/wenxinhuang/novel-workflow-mcp

# 确保代码已构建
npm run build

# 发布（如果是scoped package需要 --access public）
npm publish --access public
```

### 4. 验证发布

发布成功后，可以查看：
- NPM页面: https://www.npmjs.com/package/@ttaqt/novel-workflow-mcp
- 安装测试: `npx @ttaqt/novel-workflow-mcp@latest --help`

---

## 🔧 Cursor MCP Server 配置

发布成功后，将以下配置添加到 Cursor 的 MCP 设置中：

### 配置文件位置

**macOS/Linux**:
```
~/.cursor/mcp.json
```

或在 Cursor 设置中：
1. 打开 Cursor 设置 (Cmd+,)
2. 搜索 "MCP"
3. 编辑 MCP Server 配置

### 完整配置（推荐）

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "/path/to/your/novel-project",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

**参数说明**：
- `npx` - 使用 npx 运行最新版本
- `-y` - 自动确认安装
- `@ttaqt/novel-workflow-mcp@latest` - 包名和版本
- `/path/to/your/novel-project` - **替换为你的小说项目路径**
- `--AutoStartDashboard` - 自动启动Web仪表板

### 简化配置（无仪表板）

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "/path/to/your/novel-project"
      ]
    }
  }
}
```

### 使用本地版本（开发测试）

如果想使用本地构建版本而非 npm 版本：

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "node",
      "args": [
        "/Users/wenxinhuang/novel-workflow-mcp/dist/index.js",
        "/path/to/your/novel-project",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

### 多项目配置

如果有多个小说项目：

```json
{
  "mcpServers": {
    "novel-fantasy": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "~/novels/fantasy-adventure",
        "--AutoStartDashboard",
        "--port",
        "3456"
      ]
    },
    "novel-urban": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "~/novels/urban-romance",
        "--AutoStartDashboard",
        "--port",
        "3457"
      ]
    }
  }
}
```

---

## 🚀 使用示例

配置完成后，在 Cursor 中与 AI 对话：

### 开始新小说

```
"创建故事概念文档"
"创建世界观设定"
"创建人物档案"
"创建 my-fantasy-novel 的简要大纲"
"扩展为详细大纲"
"生成场景清单"
"撰写场景 1.1"
```

### 查看进度

```
"显示我的所有作品"
"查看 my-fantasy-novel 的进度"
```

### 继续创作

```
"撰写下一个场景"
"写第3章第2场景"
```

---

## 🔍 验证配置

### 1. 检查 MCP 是否加载

在 Cursor 中，MCP 工具应该出现在可用工具列表中：
- `novel-workflow-guide`
- `story-status`
- `approvals`

### 2. 测试工具调用

在对话中提及：
```
"使用 novel-workflow 工具"
"显示小说创作工作流程"
```

### 3. 检查仪表板

如果配置了 `--AutoStartDashboard`，应该会自动打开浏览器显示：
```
http://localhost:[port]
```

---

## ⚠️ 注意事项

1. **项目路径**：必须是绝对路径或使用 `~` 表示home目录
   - ✅ `/Users/username/novels/my-story`
   - ✅ `~/novels/my-story`
   - ❌ `./my-story` (相对路径可能有问题)

2. **端口冲突**：如果指定端口被占用，会自动使用其他端口

3. **首次运行**：会自动创建 `.novel-workflow/` 目录和所有模板

4. **权限**：确保对项目目录有读写权限

---

## 🆘 故障排除

### 问题1: MCP 工具未显示

**解决**：
1. 重启 Cursor
2. 检查配置文件语法
3. 查看 Cursor 的 MCP 日志

### 问题2: 仪表板无法打开

**解决**：
1. 检查端口是否被占用
2. 尝试不指定端口（使用自动分配）
3. 查看控制台输出的实际URL

### 问题3: 找不到项目路径

**解决**：
1. 使用绝对路径
2. 确保目录存在
3. 检查权限

---

## 📚 相关文档

- `README.md` - 项目说明
- `WORKFLOW.md` - 工作流程
- `PROMPTING-GUIDE.md` - 提示词示例
- `MIGRATION-GUIDE.md` - 改造详情

