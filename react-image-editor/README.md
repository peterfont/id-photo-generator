# React Image Editor - 图像编辑器组件

一个功能强大的React图像编辑器组件库，提供专业的图像编辑功能，可轻松集成到任何React应用中。

## 🚀 快速开始

### 安装
```bash
npm install react-image-editor
# 或
yarn add react-image-editor
# 或
pnpm add react-image-editor
```

### 基本使用
```tsx
import React from 'react';
import { ImageEditor } from 'react-image-editor';

function App() {
  return (
    <ImageEditor
      src="path/to/image.jpg"
      onSave={(editedImage) => console.log('保存图片:', editedImage)}
      onCancel={() => console.log('取消编辑')}
    />
  );
}
```

## 🎨 功能特性

### 核心功能
- 🖼️ **图像上传** - 支持拖拽和点击上传
- ✂️ **智能裁剪** - 多种裁剪比例和自由裁剪
- 🎭 **背景处理** - AI背景移除和背景替换
- 🎨 **滤镜效果** - 多种预设滤镜和自定义调整
- 📐 **尺寸调整** - 精确的尺寸设置和缩放
- 💾 **格式转换** - 支持JPG、PNG、WebP等格式

### 高级功能
- 🔄 **撤销重做** - 完整的操作历史记录
- 📱 **响应式设计** - 适配各种屏幕尺寸
- 🌍 **国际化** - 多语言支持
- 🎯 **快捷键** - 提升操作效率
- 📊 **性能优化** - 大图片处理优化

## 🏗️ 项目结构

```
react-image-editor/
├── src/
│   ├── components/        # 核心组件
│   │   ├── ImageEditor.tsx    # 主编辑器组件
│   │   ├── Toolbar.tsx        # 工具栏
│   │   ├── Canvas.tsx         # 画布组件
│   │   └── Sidebar.tsx        # 侧边栏
│   ├── hooks/            # 自定义Hooks
│   ├── utils/            # 工具函数
│   ├── types/            # TypeScript类型定义
│   └── styles/           # 样式文件
├── dist/                 # 构建输出
├── examples/             # 使用示例
└── package.json          # 项目配置
```

## 🛠️ 技术特性

- **React 18** - 最新的React特性
- **TypeScript** - 完整的类型支持
- **Canvas API** - 高性能图像处理
- **Web Workers** - 后台图像处理
- **WebAssembly** - AI模型推理
- **Tailwind CSS** - 现代化样式

## 📖 API文档

### ImageEditor Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `src` | `string` | - | 图像源URL（必需） |
| `width` | `number` | `800` | 编辑器宽度 |
| `height` | `number` | `600` | 编辑器高度 |
| `onSave` | `function` | - | 保存回调函数 |
| `onCancel` | `function` | - | 取消回调函数 |
| `onChange` | `function` | - | 内容变化回调 |
| `tools` | `array` | `['crop', 'filter', 'adjust']` | 可用工具列表 |
| `theme` | `'light' \| 'dark'` | `'light'` | 主题设置 |

### 事件回调

```tsx
interface ImageEditorCallbacks {
  onSave: (image: Blob, metadata: ImageMetadata) => void;
  onCancel: () => void;
  onChange: (imageData: ImageData) => void;
  onError: (error: Error) => void;
  onLoad: (image: HTMLImageElement) => void;
}
```

### 工具配置

```tsx
interface ToolConfig {
  crop: {
    ratios: Array<{width: number, height: number, label: string}>;
    allowFreeCrop: boolean;
  };
  filter: {
    presets: Array<{name: string, value: number}>;
    customAdjustments: boolean;
  };
  background: {
    removal: boolean;
    replacement: boolean;
    colors: string[];
  };
}
```

## 🔧 高级用法

### 自定义工具栏
```tsx
import { ImageEditor, Toolbar, CropTool, FilterTool } from 'react-image-editor';

function CustomEditor() {
  return (
    <ImageEditor src="image.jpg">
      <Toolbar>
        <CropTool ratios={[{width: 1, height: 1, label: '1:1'}]} />
        <FilterTool presets={['vintage', 'blackWhite', 'sepia']} />
      </Toolbar>
    </ImageEditor>
  );
}
```

### 自定义滤镜
```tsx
const customFilters = {
  vintage: {
    brightness: -10,
    contrast: 20,
    saturation: -30,
    sepia: 0.3
  },
  dramatic: {
    brightness: 5,
    contrast: 40,
    saturation: 10,
    gamma: 1.2
  }
};

<ImageEditor 
  src="image.jpg"
  filters={customFilters}
/>
```

### 响应式配置
```tsx
const responsiveConfig = {
  mobile: {
    width: '100%',
    height: 'auto',
    tools: ['crop', 'filter']
  },
  tablet: {
    width: 600,
    height: 400,
    tools: ['crop', 'filter', 'adjust']
  },
  desktop: {
    width: 800,
    height: 600,
    tools: ['crop', 'filter', 'adjust', 'background']
  }
};
```

## 🎯 性能优化

### 大图片处理
- 自动图片压缩
- 渐进式加载
- 内存使用优化
- Web Worker后台处理

### 渲染优化
- 虚拟滚动
- 懒加载
- 防抖节流
- 缓存策略

## 🌍 国际化

```tsx
import { ImageEditor } from 'react-image-editor';
import zhCN from 'react-image-editor/locales/zh-CN';
import enUS from 'react-image-editor/locales/en-US';

// 中文
<ImageEditor locale={zhCN} />

// 英文
<ImageEditor locale={enUS} />
```

支持的语言：
- 中文 (简体/繁体)
- 英语
- 日语
- 韩语
- 其他语言...

## 🧪 测试

```bash
# 运行单元测试
npm run test

# 运行E2E测试
npm run test:e2e

# 生成测试覆盖率报告
npm run test:coverage

# 运行性能测试
npm run test:performance
```

## 📦 构建和发布

### 开发构建
```bash
npm run build:dev
```

### 生产构建
```bash
npm run build:prod
```

### 类型声明
```bash
npm run build:types
```

## 🚀 部署

### CDN使用
```html
<script src="https://unpkg.com/react-image-editor@latest/dist/index.js"></script>
<link rel="stylesheet" href="https://unpkg.com/react-image-editor@latest/dist/index.css">
```

### 包管理器
```bash
# npm
npm install react-image-editor

# yarn
yarn add react-image-editor

# pnpm
pnpm add react-image-editor
```

## 🤝 贡献

### 开发环境设置
```bash
git clone https://github.com/your-org/react-image-editor.git
cd react-image-editor
npm install
npm run dev
```

### 代码规范
- 使用ESLint和Prettier
- 遵循TypeScript最佳实践
- 编写完整的测试用例
- 更新相关文档

### 提交规范
```bash
git commit -m "feat: 添加新的滤镜效果"
git commit -m "fix: 修复裁剪工具bug"
git commit -m "docs: 更新API文档"
```

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

---

⭐ 如果这个项目对您有帮助，请给我们一个星标！
