# Novel Workflow MCP 诊断和修复指南

## 🔍 当前问题诊断

### 问题1：中文路径 ✅ 正常
你的路径：`/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/`

✅ 路径存在且可访问
✅ `.novel-workflow` 目录已创建
⚠️ 同时存在 `.spec-workflow` 目录（可能是旧版本创建的）

### 问题2：JSON 解析错误 ⚠️

错误信息：`Unexpected token 'I', "Initial sn"... is not valid JSON`

**可能原因**：
1. Cursor MCP 使用的是 npx 版本（v1.0.2 或更早）
2. 本地修复代码（v1.0.3）还未通过 npx 生效
3. approvals 目录为空，没有审批数据

### 问题3：审批不显示 ⚠️

**原因**：审批数据未保存或 AI 使用了错误的 projectPath

---

## ✅ 解决方案

### 方案1：使用本地版本（立即生效，推荐）

**修改 Cursor MCP 配置**为：

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "node",
      "args": [
        "/Users/wenxinhuang/novel-workflow-mcp/dist/index.js",
        "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

**重要**：
- 使用 `node` 而非 `npx`
- 直接指向本地构建的代码
- 包含所有最新修复（v1.0.3）

### 方案2：使用 npx 版本（需要等待）

等待 30-60 分钟 npm registry 同步 v1.0.3 后，可以继续使用 npx：

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@1.0.3",
        "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

**验证 npm 同步**：
```bash
npm view @ttaqt/novel-workflow-mcp version
# 应该显示 1.0.3
```

---

## 🎯 正确的 AI 使用方式

### 重要：路径必须完全一致

**在 Cursor AI 对话中使用这个模板**：

```
你好！我要使用 novel-workflow 创作小说。

【重要配置】
项目路径（projectPath）：/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/

【请严格遵循】
1. 所有工具调用都必须包含上述 projectPath
2. 审批创建时的完整参数示例：

approvals({
  action: "request",
  projectPath: "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/",
  title: "故事概念文档审批",
  filePath: ".novel-workflow/steering/story-concept.md",
  type: "document",
  category: "steering",
  categoryName: "steering"
})

3. 审批状态查询：

approvals({
  action: "status",
  projectPath: "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/",
  approvalId: "approval_xxx"
})

【现在开始】
1. 使用 novel-workflow-guide 加载工作流
2. 创建故事概念文档
3. 创建审批（记得包含 projectPath）
```

---

## 🔧 立即操作步骤

### 第1步：更新 Cursor 配置

1. 打开 `~/.cursor/mcp.json`
2. 找到 `novel-workflow` 配置
3. **替换为**：

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "node",
      "args": [
        "/Users/wenxinhuang/novel-workflow-mcp/dist/index.js",
        "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

4. 保存文件

### 第2步：重启 Cursor

**完全关闭并重新打开 Cursor**

### 第3步：清理旧数据（可选）

```bash
# 删除旧的 .spec-workflow 目录（如果确认不需要）
rm -rf "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/.spec-workflow"

# 或者保留但重命名
mv "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/.spec-workflow" \
   "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/.spec-workflow.backup"
```

### 第4步：在 Cursor 中重新开始

使用上面提供的 AI 对话模板。

---

## 📊 验证配置

### 检查文件

```bash
# 1. 检查项目目录
ls -la "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/"

# 2. 检查 novel-workflow 目录
ls -la "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/.novel-workflow/"

# 3. 检查审批（应该为空，等AI创建）
find "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/.novel-workflow/approvals" -type f

# 4. 检查 steering（应该为空，等AI创建）
ls "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/.novel-workflow/steering/"
```

---

## 🐛 关于 JSON 解析错误

错误信息：`Unexpected token 'I', "Initial sn"... is not valid JSON`

**原因分析**：
- approvals 工具返回的是 ToolResponse 对象
- Cursor 可能期望纯 JSON
- 旧版本的响应格式可能不兼容

**解决**：使用本地最新版本（v1.0.3）已修复

---

## ⚠️ 关于路径中的中文和空格

你的路径包含中文字符和空格，这在某些系统中可能引起问题。

### 建议1：保持当前路径（推荐）

继续使用中文路径，但确保：
1. 在 Cursor 配置中使用完整绝对路径
2. 在 AI 对话中也使用完整路径
3. **不要使用** `~` 或相对路径

### 建议2：使用英文路径（如果遇到问题）

创建一个简化路径：

```bash
mkdir -p ~/novels/my-project
```

然后在 Cursor 配置中使用：
```
"/Users/wenxinhuang/novels/my-project"
```

或
```
"~/novels/my-project"
```

---

## 🎯 完整测试流程

### 1. 更新配置

编辑 `~/.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "node",
      "args": [
        "/Users/wenxinhuang/novel-workflow-mcp/dist/index.js",
        "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

### 2. 重启 Cursor

完全关闭并重新打开

### 3. 在 AI 对话中测试

```
测试 novel-workflow v1.0.3

配置信息：
- projectPath: "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/"

步骤：
1. 使用 novel-workflow-guide 工具
2. 读取模板：.novel-workflow/templates/story-concept-template.md
3. 创建文档：.novel-workflow/steering/story-concept.md
   内容：一个简单的测试故事概念
4. 使用 approvals 工具创建审批，参数：
   projectPath: "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/"
   title: "测试故事概念"
   filePath: ".novel-workflow/steering/story-concept.md"
   type: "document"
   category: "steering"
   categoryName: "steering"
5. 告诉我审批ID和仪表板URL
```

### 4. 检查仪表板

- 打开仪表板URL
- 左下角应该显示 **v1.0.3**
- Steering 标签应该有文档
- Approvals 标签应该有审批

---

## 🆘 如果仍然有问题

### 日志收集

请提供：

1. **Cursor MCP 日志**（你已提供）
2. **审批目录内容**：
   ```bash
   ls -laR "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/.novel-workflow/approvals/"
   ```

3. **创建的文件**：
   ```bash
   find "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/.novel-workflow" -name "*.md" -o -name "*.json" | grep -v template
   ```

4. **仪表板版本**：
   - 打开仪表板
   - 查看左下角版本号

---

## 📝 快速配置（复制即用）

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "node",
      "args": [
        "/Users/wenxinhuang/novel-workflow-mcp/dist/index.js",
        "/Users/wenxinhuang/知识库/10-我的项目/正在进行中/小说/",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

**配置后**：
1. 保存文件
2. 完全关闭 Cursor
3. 重新打开 Cursor
4. 使用上面的 AI 对话模板

---

## ✨ 应该会看到

- ✅ 仪表板左下角：**v1.0.3**
- ✅ Steering 标签：创建的文档
- ✅ Approvals 标签：审批请求
- ✅ 可以点击审批、查看内容、进行审批

**现在就试试吧！** 🚀

