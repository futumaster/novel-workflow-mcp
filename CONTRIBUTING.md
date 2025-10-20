# 贡献指南

感谢你对 Novel Workflow MCP 的关注！

## 🎯 贡献方式

### 1. 报告 Bug

如果你发现了 bug，请：

1. 检查 [Issues](https://github.com/futumaster/novel-workflow-mcp/issues) 是否已有相同问题
2. 如果没有，创建新 Issue，包含：
   - 问题描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 环境信息（操作系统、Node版本、Cursor/Claude版本）
   - 错误日志（如有）

### 2. 功能建议

有好的想法？欢迎提出！

1. 创建 Feature Request Issue
2. 描述功能需求和使用场景
3. 说明为什么这个功能有价值

### 3. 改进文档

文档永远可以更好：

- 修正错别字
- 改进示例
- 添加使用技巧
- 翻译为其他语言

### 4. 贡献代码

#### 准备工作

```bash
# Fork 项目
# 克隆你的 fork
git clone https://github.com/YOUR_USERNAME/novel-workflow-mcp.git
cd novel-workflow-mcp

# 安装依赖
npm install

# 创建分支
git checkout -b feature/your-feature-name
```

#### 开发

```bash
# 运行开发模式
npm run dev

# 运行测试
npm test

# 构建
npm run build
```

#### 提交

```bash
# 提交代码
git add .
git commit -m "feat: 添加新功能"

# 推送到你的 fork
git push origin feature/your-feature-name

# 创建 Pull Request
```

## 📏 代码规范

### Commit Message 规范

使用 [Conventional Commits](https://www.conventionalcommits.org/)：

```
feat: 添加新功能
fix: 修复bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建/工具链更新
```

### TypeScript 规范

- 使用 TypeScript 严格模式
- 添加类型注释
- 避免 `any` 类型
- 使用有意义的变量名

### 代码质量

- 运行测试确保通过
- 添加必要的注释
- 保持函数简洁
- 遵循项目现有风格

## 🌍 翻译贡献

### 添加新语言

1. 复制 `src/dashboard_frontend/src/locales/en.json`
2. 重命名为对应语言代码（如 `vi.json` 越南语）
3. 翻译所有字段
4. 在 `src/dashboard_frontend/src/i18n.ts` 中注册
5. 同样处理 VSCode 扩展的语言文件

### 改进现有翻译

- 查找 `src/dashboard_frontend/src/locales/` 目录
- 编辑对应语言文件
- 提交 PR

## 🧪 测试

### 单元测试

```bash
npm test
```

### 集成测试

```bash
# 创建测试项目
mkdir -p /tmp/test-novel
npx . /tmp/test-novel --dashboard
```

### 手动测试清单

- [ ] MCP 服务器正常启动
- [ ] 仪表板可以访问
- [ ] 创建 steering 文档
- [ ] 创建 story 文档
- [ ] 审批流程正常
- [ ] 场景状态更新
- [ ] 文档编辑保存
- [ ] 实时同步工作

## 📦 发布流程

仅维护者可执行：

```bash
# 更新版本
npm version patch|minor|major

# 构建
npm run build

# 发布
npm publish --access public

# 推送标签
git push --tags
```

## 💬 讨论

有任何问题或想法？

- 💡 [Discussions](https://github.com/futumaster/novel-workflow-mcp/discussions) - 讨论区
- 🐛 [Issues](https://github.com/futumaster/novel-workflow-mcp/issues) - Bug 报告
- 📧 Email - 通过 GitHub Profile 联系

## 🙏 感谢

感谢所有贡献者！

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

**让我们一起打造最好的 AI 小说创作工具！** ✨

