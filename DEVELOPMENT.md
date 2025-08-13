# 开发指南 - ID Photo Generator

本文档为开发者提供完整的项目开发指南，包括环境搭建、开发流程、代码规范等。

## 🚀 环境搭建

### 系统要求
- **操作系统**: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **Node.js**: 18.0.0 或更高版本
- **包管理器**: pnpm 8.0.0 或更高版本
- **Git**: 2.30.0 或更高版本

### 开发工具推荐
- **代码编辑器**: VS Code, WebStorm, Vim
- **终端**: iTerm2 (macOS), Windows Terminal, Terminator
- **浏览器**: Chrome, Firefox, Safari (开发调试)
- **移动端调试**: Chrome DevTools, Safari Web Inspector

### 环境检查
```bash
# 检查Node.js版本
node --version  # 应该 >= 18.0.0

# 检查pnpm版本
pnpm --version  # 应该 >= 8.0.0

# 检查Git版本
git --version   # 应该 >= 2.30.0
```

## 📦 项目初始化

### 克隆项目
```bash
git clone https://github.com/peterfont/id-photo-generator.git
cd id-photo-generator
```

### 安装依赖
```bash
# 安装所有子项目依赖
pnpm install:all

# 或者分别安装
cd web && pnpm install
cd ../mobile && pnpm install
cd ../server && pnpm install
cd ../react-image-editor && pnpm install
```

### 环境配置
```bash
# 复制环境配置文件
cp .env.example .env

# 配置必要的环境变量
DATABASE_URL=postgresql://user:pass@localhost:5432/id_photo_generator
JWT_SECRET=your-secret-key
UPLOAD_PATH=./uploads
```

## 🔧 开发流程

### 1. 功能开发流程
```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 开发功能
# ... 编写代码 ...

# 3. 提交代码
git add .
git commit -m "feat: 添加新功能"

# 4. 推送到远程
git push origin feature/new-feature

# 5. 创建Pull Request
```

### 2. 修复Bug流程
```bash
# 1. 创建修复分支
git checkout -b fix/bug-description

# 2. 修复Bug
# ... 修复代码 ...

# 3. 提交修复
git add .
git commit -m "fix: 修复Bug描述"

# 4. 推送到远程
git push origin fix/bug-description
```

### 3. 发布流程
```bash
# 1. 切换到main分支
git checkout main
git pull origin main

# 2. 创建发布标签
git tag -a v1.0.0 -m "发布版本1.0.0"
git push origin v1.0.0

# 3. 构建和部署
pnpm run build:all
pnpm run deploy
```

## 📝 代码规范

### TypeScript规范
- 使用严格的TypeScript配置
- 为所有函数和变量定义类型
- 使用接口定义对象结构
- 避免使用`any`类型

```typescript
// ✅ 好的做法
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  // 实现
}

// ❌ 避免的做法
function getUser(id: any): any {
  // 实现
}
```

### React组件规范
- 使用函数式组件和Hooks
- 组件名使用PascalCase
- Props接口以组件名开头
- 使用React.memo优化性能

```typescript
interface ImageEditorProps {
  src: string;
  onSave: (image: Blob) => void;
  onCancel: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = React.memo(({
  src,
  onSave,
  onCancel
}) => {
  // 组件实现
});
```

### CSS规范
- 使用Tailwind CSS类名
- 避免内联样式
- 使用CSS变量定义主题
- 响应式设计优先

```css
/* ✅ 好的做法 */
.image-editor {
  @apply w-full h-full bg-white dark:bg-gray-900;
}

/* ❌ 避免的做法 */
.image-editor {
  width: 100%;
  height: 100%;
  background-color: white;
}
```

### 文件命名规范
- 组件文件: PascalCase (如 `ImageEditor.tsx`)
- 工具文件: camelCase (如 `imageUtils.ts`)
- 常量文件: UPPER_SNAKE_CASE (如 `API_ENDPOINTS.ts`)
- 类型文件: camelCase (如 `types.ts`)

## 🧪 测试规范

### 单元测试
- 测试覆盖率不低于80%
- 测试文件与源文件同名，添加`.spec.ts`后缀
- 使用描述性的测试用例名称
- 测试异步操作和错误情况

```typescript
describe('ImageEditor', () => {
  it('应该正确渲染图像', () => {
    const { getByAltText } = render(<ImageEditor src="test.jpg" />);
    expect(getByAltText('编辑图像')).toBeInTheDocument();
  });

  it('应该处理保存操作', async () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <ImageEditor src="test.jpg" onSave={onSave} />
    );
    
    fireEvent.click(getByText('保存'));
    expect(onSave).toHaveBeenCalled();
  });
});
```

### E2E测试
- 测试关键用户流程
- 使用真实浏览器环境
- 测试不同设备和屏幕尺寸
- 测试错误处理和边界情况

## 📊 性能优化

### 前端优化
- 使用React.memo避免不必要的重渲染
- 实现虚拟滚动处理大量数据
- 使用Web Workers处理复杂计算
- 图片懒加载和压缩

### 后端优化
- 数据库查询优化
- 缓存策略实现
- 异步处理大量请求
- 监控和性能分析

## 🔒 安全考虑

### 前端安全
- 输入验证和清理
- XSS防护
- CSRF令牌
- 敏感信息不暴露

### 后端安全
- 参数验证
- SQL注入防护
- 文件上传安全检查
- 权限控制

## 📚 文档维护

### 代码注释
- 为复杂逻辑添加注释
- 使用JSDoc格式
- 注释要简洁明了
- 及时更新注释

```typescript
/**
 * 处理图像背景移除
 * @param imageData - 图像数据
 * @param options - 处理选项
 * @returns 处理后的图像数据
 */
async function removeBackground(
  imageData: ImageData, 
  options: BackgroundOptions
): Promise<ImageData> {
  // 实现
}
```

### 文档更新
- README文件及时更新
- API文档保持同步
- 变更日志记录
- 示例代码验证

## 🚀 部署指南

### 开发环境
```bash
# 启动所有服务
pnpm run dev:all

# 或者分别启动
pnpm run dev:web
pnpm run dev:mobile
pnpm run dev:server
```

### 生产环境
```bash
# 构建所有项目
pnpm run build:all

# 部署到服务器
pnpm run deploy:prod
```

### 环境变量管理
- 开发环境使用`.env.local`
- 生产环境使用环境变量
- 敏感信息使用密钥管理
- 不同环境使用不同配置

## 🤝 团队协作

### 代码审查
- 所有代码必须经过审查
- 使用Pull Request流程
- 代码审查清单
- 自动化检查集成

### 沟通规范
- 使用清晰的问题描述
- 及时响应和更新
- 记录重要决策
- 定期团队会议

## 📞 获取帮助

### 内部资源
- 项目Wiki
- 代码注释
- 团队文档
- 知识库

### 外部资源
- 官方文档
- 社区论坛
- 技术博客
- 在线课程

---

如有问题，请通过以下方式联系：
- 项目Issues: https://github.com/peterfont/id-photo-generator/issues
- 团队邮箱: team@example.com
- 技术讨论: https://github.com/peterfont/id-photo-generator/discussions 