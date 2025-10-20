# 完整配置和使用指南

## 🎯 核心概念：projectPath

**projectPath** 是你的小说项目的**根目录**，所有文档都会保存在这个目录下的 `.novel-workflow/` 子目录中。

### 示例结构

如果 `projectPath = /Users/wenxinhuang/novels/my-story`，则：

```
/Users/wenxinhuang/novels/my-story/     ← projectPath（项目根目录）
  .novel-workflow/                       ← 自动创建
    steering/                            ← 指导文档
      story-concept.md
      world-building.md
      character-profiles.md
    stories/                             ← 你的作品
      my-first-novel/                    ← 第一个故事
        outline-brief.md
        outline-detailed.md
        scenes.md
      my-second-novel/                   ← 第二个故事
        outline-brief.md
        ...
    approvals/                           ← 审批记录
    templates/                           ← 模板文件
```

---

## ⚙️ Cursor MCP 配置（重要！）

### 正确配置

**复制以下内容到 Cursor MCP 设置**（`~/.cursor/mcp.json`）：

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "node",
      "args": [
        "/Users/wenxinhuang/novel-workflow-mcp/dist/index.js",
        "/Users/wenxinhuang/novels/my-story",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

**关键点**：
- 第2个参数 `/Users/wenxinhuang/novels/my-story` 就是 **projectPath**
- 这个路径将用于所有文件读写操作
- **必须使用绝对路径**

---

## 🐛 已修复的Bug

### Bug 1: Steering 文档名称不匹配 ✅

**问题**：仪表板查找旧的文件名（product.md, tech.md）而非新名称  
**修复**：现在同时支持新旧文件名，向后兼容

### Bug 2: 路径兼容性问题 ✅

**问题**：文件路径解析未考虑 `.novel-workflow` 目录  
**修复**：现在同时支持 `.novel-workflow` 和 `.spec-workflow` 路径

---

## 📝 正确的使用流程

### 第一步：确保配置正确

**在 Cursor 中配置后，重启 Cursor！**

### 第二步：开始创作（重要提示词）

**在 Cursor AI 对话中，复制以下内容**：

```
你好！我要使用 novel-workflow 创作小说。

重要信息：
- 我的项目路径（projectPath）是：/Users/wenxinhuang/novels/my-story
- 请在所有工具调用中使用这个路径
- 特别是 approvals 工具，必须包含 projectPath 参数

现在请：
1. 加载 novel-workflow-guide 工具
2. 帮我创建故事概念文档（steering/story-concept.md）
3. 创建审批时，确保参数正确：
   - projectPath: "/Users/wenxinhuang/novels/my-story"
   - filePath: ".novel-workflow/steering/story-concept.md"
   - category: "steering"
   - categoryName: "steering"
```

### 第三步：查看仪表板

1. 浏览器自动打开 http://localhost:XXXXX
2. 左侧点击 **"Approvals"** 标签
3. 应该看到审批请求
4. 点击按钮进行审批

### 第四步：如果看不到审批

**刷新浏览器**：
- 按 `Cmd+R` 或 `F5`
- 或关闭标签页重新打开

**检查审批文件是否存在**：
```bash
find ~/novels/my-story/.novel-workflow/approvals -name "*.json"
```

如果返回空，说明审批没创建成功。

---

## 🔍 故障排查清单

### 问题1：仪表板看不到文档

**症状**：Stories、Steering 标签页是空的

**检查**：
```bash
# 查看是否有story文档
ls -la ~/novels/my-story/.novel-workflow/stories/

# 查看是否有steering文档
ls -la ~/novels/my-story/.novel-workflow/steering/
```

**原因**：文档还未创建，或创建在了错误的位置

**解决**：让 AI 创建文档时明确指定 projectPath

### 问题2：仪表板看不到审批

**症状**：Approvals 标签页是空的，但 AI 说已创建

**检查**：
```bash
# 查看审批文件
find ~/novels/my-story/.novel-workflow/approvals -name "*.json"

# 查看审批内容
cat ~/novels/my-story/.novel-workflow/approvals/*/*.json 2>/dev/null
```

**原因**：
1. 审批未保存（projectPath 参数错误或缺失）
2. 浏览器未刷新

**解决**：
1. 刷新浏览器（Cmd+R）
2. 在 AI 对话中明确指定 projectPath
3. 检查审批文件是否实际存在

### 问题3：审批页面有数据但看不到内容

**症状**：审批列表显示了，但点击打开是空的

**检查**：
```bash
# 检查文件路径是否正确
cat ~/novels/my-story/.novel-workflow/approvals/*/*.json | grep filePath

# 检查文件是否存在
ls -la ~/novels/my-story/.novel-workflow/steering/
```

**解决**：确保 filePath 指向的文件确实存在

---

## 📊 完整的 AI 工具调用示例

### 创建 Steering 文档

```javascript
// AI应该这样调用
approvals({
  action: "request",
  projectPath: "/Users/wenxinhuang/novels/my-story",  // ← 必须
  title: "故事概念文档审批",
  filePath: ".novel-workflow/steering/story-concept.md",
  type: "document",
  category: "steering",
  categoryName: "steering"
})
```

### 创建 Story 文档

```javascript
// AI应该这样调用
approvals({
  action: "request",
  projectPath: "/Users/wenxinhuang/novels/my-story",  // ← 必须
  title: "《仙侠奇缘》简要大纲审批",
  filePath: ".novel-workflow/stories/xianxia-romance/outline-brief.md",
  type: "document",
  category: "spec",  // story 使用 "spec" category
  categoryName: "xianxia-romance"  // story名称
})
```

### 查询审批状态

```javascript
approvals({
  action: "status",
  projectPath: "/Users/wenxinhuang/novels/my-story",  // ← 可选但推荐
  approvalId: "approval_xxx"
})
```

---

## 🚀 重新启动以应用修复

由于我修复了代码，需要重新启动 MCP：

### 方法1：重启 Cursor（推荐）

1. 完全关闭 Cursor
2. 重新打开 Cursor
3. MCP 会自动加载修复后的代码

### 方法2：仅重启 MCP

在 Cursor 中：
1. `Cmd+Shift+P`
2. 搜索 "MCP"
3. 选择 "Restart MCP Servers"

---

## ✅ 验证修复

### 测试1：查看模板

```bash
ls ~/novels/my-story/.novel-workflow/templates/
```

应该看到6个模板：
- story-concept-template.md
- world-building-template.md
- character-profiles-template.md
- outline-brief-template.md
- outline-detailed-template.md
- scenes-template.md

### 测试2：使用 AI 创建文档

**在 Cursor 中**：

```
请使用 novel-workflow 工具：

1. projectPath 设置为：/Users/wenxinhuang/novels/my-story

2. 创建故事概念文档（steering/story-concept.md）

3. 创建审批，参数：
   - projectPath: "/Users/wenxinhuang/novels/my-story"
   - title: "故事概念文档"
   - filePath: ".novel-workflow/steering/story-concept.md"
   - type: "document"
   - category: "steering"
   - categoryName: "steering"

4. 告诉我审批ID和仪表板URL
```

### 测试3：查看仪表板

1. 打开仪表板 URL
2. 点击 **Approvals** 标签
3. 应该看到"故事概念文档"审批
4. 点击 **Steering** 标签
5. 应该看到创建的文档列表

---

## 📋 标签页说明

### Statistics（统计）
- 显示整体统计
- 活跃作品数量
- 场景进度
- 待审批数量

### Steering（指导）
- 故事概念（story-concept.md）
- 世界观设定（world-building.md）  
- 人物档案（character-profiles.md）

### Stories（作品）
- 你的所有作品列表
- 每个作品有3个文档：
  - outline-brief.md（简要大纲）
  - outline-detailed.md（详细大纲）
  - scenes.md（场景清单）

### Scenes（场景）
- 选择一个作品
- 查看所有场景
- 标记场景完成状态

### Approvals（审批）
- 所有待审批的文档
- 点击查看内容
- 批准/拒绝/请求修改

---

## 🎯 最佳配置建议

### 推荐配置（本地版本）

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "node",
      "args": [
        "/Users/wenxinhuang/novel-workflow-mcp/dist/index.js",
        "/Users/wenxinhuang/novels/my-story",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

**优点**：
- ✅ 立即可用（不依赖npm同步）
- ✅ 使用修复后的代码
- ✅ 调试方便

### NPM版本配置（稍后）

等npm同步完成后（约10-30分钟），可切换为：

```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "npx",
      "args": [
        "-y",
        "@ttaqt/novel-workflow-mcp@latest",
        "/Users/wenxinhuang/novels/my-story",
        "--AutoStartDashboard"
      ]
    }
  }
}
```

**优点**：
- ✅ 自动获取最新版本
- ✅ 任何机器可用
- ⚠️ 需要先发布新版本包含修复

---

## 🔄 应用修复

### 立即应用

```bash
cd /Users/wenxinhuang/novel-workflow-mcp

# 代码已修复并构建
# 现在重启 Cursor 即可使用修复后的版本
```

### 发布修复到 npm

```bash
# 更新版本号
npm version patch  # 1.0.0 → 1.0.1

# 发布
npm publish --access public
```

---

## 📝 提交修复

<function_calls>
<invoke name="run_terminal_cmd">
<parameter name="command">cd /Users/wenxinhuang/novel-workflow-mcp && git add -A && git commit -m "fix: 修复steering文档名称映射和路径兼容性问题

- 更新parser支持新的steering文档名称（story-concept, world-building, character-profiles）
- 保留对旧文件名的向后兼容
- 修复dashboard server的路径解析，同时支持.novel-workflow和.spec-workflow
- 添加完整配置和故障排查指南"
