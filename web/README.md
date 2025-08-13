# Web端 - ID Photo Generator

基于React + TypeScript + Vite构建的现代化Web应用，提供专业的证件照生成和编辑功能。

## 🚀 快速开始

### 环境要求
- Node.js 18+
- pnpm 8+

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
```
访问 http://localhost:5173

### 构建生产版本
```bash
pnpm build
```

### 预览构建结果
```bash
pnpm preview
```

## 🏗️ 项目结构

```
web/
├── src/
│   ├── common/           # 共享组件和工具
│   │   ├── components/   # 可复用组件
│   │   ├── pages/        # 页面组件
│   │   ├── stores/       # 状态管理
│   │   ├── hooks/        # 自定义Hooks
│   │   ├── utils/        # 工具函数
│   │   └── locales/      # 国际化文件
│   ├── App.tsx           # 主应用组件
│   └── main.tsx          # 应用入口
├── public/                # 静态资源
├── index.html             # HTML模板
└── package.json           # 项目配置
```

## 🛠️ 技术特性

- **React 18** - 最新的React特性支持
- **TypeScript** - 完整的类型安全
- **Vite** - 极速的开发体验
- **Tailwind CSS** - 原子化CSS框架
- **Zustand** - 轻量级状态管理
- **React Router** - 客户端路由
- **i18n** - 多语言国际化支持

## 🎨 主要功能

### 图像编辑
- 智能背景移除
- 精确尺寸裁剪
- 亮度/对比度调整
- 饱和度/色相调节

### 证件照规格
- 支持多种国际标准
- 自动尺寸计算
- 实时预览效果

### 用户体验
- 响应式设计
- 拖拽上传
- 快捷键支持
- 暗色主题

## 🔧 开发指南

### 代码规范
- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- 遵循TypeScript最佳实践
- 组件采用函数式编程风格

### 组件开发
- 使用TypeScript定义Props接口
- 采用函数式组件和Hooks
- 实现响应式设计
- 支持无障碍访问

### 状态管理
- 使用Zustand进行全局状态管理
- 本地状态使用useState和useReducer
- 异步操作使用自定义Hooks

## 📱 响应式设计

- **桌面端** (≥1024px) - 完整功能体验
- **平板端** (768px-1023px) - 适配触摸操作
- **移动端** (<768px) - 移动优先设计

## 🌍 国际化支持

支持多种语言：
- 中文 (简体/繁体)
- 英语
- 日语
- 韩语
- 其他语言...

## 🧪 测试

```bash
# 运行单元测试
pnpm test

# 运行E2E测试
pnpm test:e2e

# 生成测试覆盖率报告
pnpm test:coverage
```

## 📦 构建优化

- **代码分割** - 按路由和组件分割
- **Tree Shaking** - 移除未使用代码
- **压缩优化** - 最小化bundle大小
- **缓存策略** - 长期缓存优化

## 🚀 部署

### 静态部署
```bash
pnpm build
# 将dist目录部署到静态服务器
```

### Docker部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 80
CMD ["npm", "run", "preview"]
```

## 🤝 贡献

欢迎提交Issue和Pull Request！

## �� 许可证

MIT License
