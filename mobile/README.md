# 移动端 - ID Photo Generator

基于Ionic + Capacitor + React构建的跨平台移动应用，提供专业的证件照生成和编辑功能。

## 🚀 快速开始

### 环境要求
- Node.js 18+
- pnpm 8+
- Android Studio (Android开发)
- Xcode (iOS开发，仅macOS)
- Capacitor CLI

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
# 启动开发服务器
pnpm dev

# 在浏览器中预览
pnpm preview
```

### 移动端构建

#### Android
```bash
# 构建Android应用
pnpm run build:android

# 同步到Android项目
pnpm run sync:android

# 打开Android Studio
pnpm run open:android
```

#### iOS
```bash
# 构建iOS应用
pnpm run build:ios

# 同步到iOS项目
pnpm run sync:ios

# 打开Xcode
pnpm run open:ios
```

## 🏗️ 项目结构

```
mobile/
├── android/              # Android原生项目
├── src/                  # 应用源码
│   ├── components/       # 可复用组件
│   ├── pages/            # 页面组件
│   ├── stores/           # 状态管理
│   ├── hooks/            # 自定义Hooks
│   ├── utils/            # 工具函数
│   └── locales/          # 国际化文件
├── public/                # 静态资源
├── capacitor.config.ts    # Capacitor配置
├── ionic.config.json      # Ionic配置
└── package.json           # 项目配置
```

## 🛠️ 技术特性

- **Ionic 7** - 跨平台移动应用框架
- **Capacitor 5** - 原生功能访问
- **React 18** - 现代化的前端框架
- **TypeScript** - 完整的类型安全
- **Vite** - 快速的构建工具
- **Tailwind CSS** - 原子化CSS框架

## 📱 原生功能

### 相机和相册
- 拍照功能
- 相册选择
- 图片预览

### 文件系统
- 本地文件存储
- 图片保存到相册
- 文件分享

### 设备信息
- 设备型号检测
- 屏幕尺寸适配
- 网络状态监控

## 🎨 主要功能

### 图像处理
- AI背景移除
- 智能裁剪
- 滤镜效果
- 参数调整

### 证件照生成
- 多种规格支持
- 实时预览
- 批量处理
- 质量优化

### 用户体验
- 触摸友好界面
- 手势操作
- 离线功能
- 性能优化

## 🔧 开发指南

### 平台特定代码
```typescript
import { Capacitor } from '@capacitor/core';

if (Capacitor.isNativePlatform()) {
  // 原生平台特定代码
} else {
  // Web平台代码
}
```

### 插件使用
```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
};
```

### 响应式设计
- 使用Ionic的栅格系统
- 适配不同屏幕尺寸
- 支持横竖屏切换

## 📱 平台支持

### Android
- 最低版本：API 22 (Android 5.1)
- 目标版本：API 34 (Android 14)
- 权限：相机、存储、网络

### iOS
- 最低版本：iOS 13.0
- 目标版本：iOS 17.0
- 权限：相机、相册、网络

## 🧪 测试

```bash
# 运行单元测试
pnpm test

# 运行E2E测试
pnpm test:e2e

# 测试Android应用
pnpm run test:android

# 测试iOS应用
pnpm run test:ios
```

## 📦 构建优化

- **代码分割** - 按页面分割代码
- **图片优化** - 自动压缩和格式转换
- **缓存策略** - 离线资源缓存
- **性能监控** - 应用性能分析

## 🚀 部署

### 应用商店发布
```bash
# 构建生产版本
pnpm run build:prod

# 同步到原生项目
pnpm run sync

# 在IDE中构建APK/IPA
```

### 开发版本分发
```bash
# 构建开发版本
pnpm run build:dev

# 生成APK文件
pnpm run build:apk
```

## 🔒 安全考虑

- 图片数据本地处理
- 网络请求加密
- 权限最小化原则
- 数据隐私保护

## 📊 性能指标

- 启动时间 < 3秒
- 图片处理 < 5秒
- 内存使用 < 200MB
- 电池消耗优化

## 🤝 贡献

欢迎提交Issue和Pull Request！

## �� 许可证

MIT License 