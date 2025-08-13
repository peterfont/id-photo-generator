# ID Photo Generator (证件照生成器)

一个功能强大的证件照生成工具，支持多种证件照规格，提供在线编辑、背景替换、尺寸调整等功能。

## 🌟 功能特性

- 📱 **多平台支持**：Web端、移动端、桌面端全覆盖
- 🖼️ **智能背景处理**：AI驱动的背景移除和替换
- ✂️ **精确裁剪**：支持多种证件照规格标准
- 🎨 **专业编辑**：亮度、对比度、饱和度等参数调整
- 🌍 **多语言支持**：支持中文、英文等多种语言
- 📐 **规格齐全**：涵盖各国证件照标准尺寸

## 🏗️ 项目架构

```
zjz-web/
├── web/                 # Web前端应用 (React + TypeScript)
├── mobile/              # 移动端应用 (Ionic + Capacitor)
├── react-image-editor/  # React图像编辑器组件
└── server/              # 后端服务 (NestJS)
```

## 🛠️ 技术栈

### 前端技术
- **React 18** - 现代化的前端框架
- **TypeScript** - 类型安全的JavaScript
- **Tailwind CSS** - 原子化CSS框架
- **Vite** - 快速的构建工具
- **Ionic** - 跨平台移动应用框架
- **Capacitor** - 原生功能访问

### 后端技术
- **NestJS** - 企业级Node.js框架
- **TypeScript** - 类型安全的服务端开发
- **Multer** - 文件上传处理
- **Sharp** - 图像处理库

### AI技术
- **ONNX Runtime** - 机器学习模型推理
- **WebAssembly** - 高性能图像处理
- **背景移除算法** - 智能前景提取

## 🚀 快速开始

### 环境要求
- Node.js 18+
- pnpm 8+
- Git

### 安装依赖

```bash
# 安装Web端依赖
cd web
pnpm install

# 安装移动端依赖
cd ../mobile
pnpm install

# 安装后端依赖
cd ../server
pnpm install

# 安装图像编辑器依赖
cd ../react-image-editor
pnpm install
```

### 运行项目

#### Web端
```bash
cd web
pnpm dev
```
访问 http://localhost:5173

#### 移动端
```bash
cd mobile
pnpm dev
```

#### 后端服务
```bash
cd server
pnpm run start:dev
```
服务运行在 http://localhost:3000

## 📱 移动端构建

### Android
```bash
cd mobile
pnpm run build:android
```

### iOS
```bash
cd mobile
pnpm run build:ios
```

## 🔧 开发指南

### 项目结构说明
- `web/src/common/` - 共享组件和工具
- `web/src/pages/` - 页面组件
- `mobile/src/` - 移动端源码
- `server/src/` - 后端API服务
- `react-image-editor/` - 可复用的图像编辑器

### 代码规范
- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- 遵循TypeScript最佳实践
- 组件采用函数式编程风格

## 📄 支持的证件照规格

- **中国标准**：1寸、2寸、小2寸
- **国际标准**：35×45mm、50×70mm
- **美国标准**：2×2英寸、5×5英寸
- **欧洲标准**：35×45mm、45×35mm

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

## 📞 联系我们

- 项目主页：https://github.com/peterfont/id-photo-generator
- 问题反馈：https://github.com/peterfont/id-photo-generator/issues

---

⭐ 如果这个项目对您有帮助，请给我们一个星标！
