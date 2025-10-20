# 审批系统故障排除

## 问题：仪表板看不到审批请求

### 症状
- AI 提示去仪表板审批
- 仪表板打开了但 Approvals 页面是空的
- API 返回空数组 `[]`

### 原因
审批数据没有正确保存到文件系统。可能的原因：
1. **projectPath 不匹配** - AI 使用的项目路径与 MCP 配置的路径不一致
2. **权限问题** - 无法写入审批文件
3. **目录不存在** - 审批子目录未创建

### 解决方案

#### 方法1：检查并修复项目路径（推荐）

确保 Cursor MCP 配置中的路径与AI使用的路径完全一致：

**Cursor 配置**：
```json
{
  "mcpServers": {
    "novel-workflow": {
      "command": "node",
      "args": [
        "/Users/wenxinhuang/novel-workflow-mcp/dist/index.js",
        "/Users/wenxinhuang/novels/my-story",  // ← 这个路径
        "--AutoStartDashboard"
      ]
    }
  }
}
```

**在 AI 对话中指定相同路径**：
```
"在 /Users/wenxinhuang/novels/my-story 项目中创建故事概念文档"
```

#### 方法2：使用绝对路径

在与 AI 对话时，明确指定完整的绝对路径：

```
"使用 novel-workflow 工具，projectPath 设置为 /Users/wenxinhuang/novels/my-story，创建故事概念文档"
```

#### 方法3：检查审批文件

**检查审批目录**：
```bash
ls -la ~/novels/my-story/.novel-workflow/approvals/
```

应该看到类似这样的结构：
```
.novel-workflow/approvals/
  steering/
    approval_xxx.json
  story-name/
    approval_yyy.json
```

**如果目录为空**，说明审批没有保存成功。

#### 方法4：手动创建测试审批

```bash
# 创建测试审批
mkdir -p ~/novels/my-story/.novel-workflow/approvals/test

cat > ~/novels/my-story/.novel-workflow/approvals/test/approval_test.json << 'EOF'
{
  "id": "approval_test",
  "title": "测试审批",
  "filePath": ".novel-workflow/steering/story-concept.md",
  "type": "document",
  "status": "pending",
  "createdAt": "2025-10-19T12:00:00.000Z",
  "category": "steering",
  "categoryName": "test"
}
EOF

# 刷新浏览器，应该能看到测试审批
```

### 验证修复

1. **检查 API**：
   ```bash
   curl http://localhost:PORT/api/approvals
   ```
   
   应该返回审批数组（不是空数组）

2. **刷新仪表板**：
   - 在浏览器中按 `Cmd+R` 刷新
   - 应该看到审批列表

3. **检查文件**：
   ```bash
   find ~/novels/my-story/.novel-workflow/approvals -name "*.json"
   ```
   
   应该列出审批文件

---

## 最佳实践

### 避免路径问题

1. **统一使用绝对路径**：
   ```
   /Users/wenxinhuang/novels/my-story
   ```

2. **或统一使用 ~ 路径**：
   ```
   ~/novels/my-story
   ```

3. **不要混用**相对路径和绝对路径

### 在 AI 对话中明确指定

```
"使用 novel-workflow，在 ~/novels/my-story 项目中创建故事概念文档"
```

或者：

```
"projectPath 是 /Users/wenxinhuang/novels/my-story，创建故事概念文档"
```

---

## 调试命令

### 检查审批数据

```bash
# 列出所有审批文件
find ~/novels/my-story/.novel-workflow/approvals -type f

# 查看审批内容
cat ~/novels/my-story/.novel-workflow/approvals/*/approval_*.json

# 检查审批数量
find ~/novels/my-story/.novel-workflow/approvals -name "*.json" | wc -l
```

### 检查 API

```bash
# 获取所有审批
curl http://localhost:PORT/api/approvals

# 检查特定审批状态
curl http://localhost:PORT/api/approvals/approval_xxx
```

### 清理测试数据

```bash
# 删除测试审批
rm -rf ~/novels/my-story/.novel-workflow/approvals/test
```

---

## 常见问题

### Q: 仪表板显示空，但文件存在？

**A**: 刷新浏览器（Cmd+R）或重启 Cursor

### Q: 审批创建失败？

**A**: 检查 projectPath 参数是否正确：
- 必须是绝对路径
- 或使用 `~` 开头
- 确保目录存在且有写入权限

### Q: AI 说创建成功但看不到？

**A**: 检查 AI 使用的 projectPath 是否与 MCP 配置一致

---

## 联系支持

如果问题持续，请提供以下信息：

1. Cursor MCP 配置
2. `ls -la ~/novels/my-story/.novel-workflow/approvals/` 输出
3. `curl http://localhost:PORT/api/approvals` 输出
4. AI 对话中的具体命令

