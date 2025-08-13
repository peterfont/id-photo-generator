# 后端服务 - ID Photo Generator

基于NestJS构建的高性能后端API服务，提供图像处理、文件上传、用户管理等功能。

## 🚀 快速开始

### 环境要求
- Node.js 18+
- pnpm 8+
- PostgreSQL (可选，用于数据持久化)

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
# 启动开发服务器
pnpm run start:dev

# 启动调试模式
pnpm run start:debug

# 启动生产模式
pnpm run start:prod
```

### 数据库设置
```bash
# 创建数据库
createdb id_photo_generator

# 运行数据库迁移
pnpm run migration:run

# 生成数据库迁移文件
pnpm run migration:generate
```

## 🏗️ 项目结构

```
server/
├── src/
│   ├── app/               # 主应用模块
│   ├── uploads/           # 文件上传模块
│   ├── users/             # 用户管理模块
│   ├── images/            # 图像处理模块
│   ├── auth/              # 认证授权模块
│   └── common/            # 公共模块
├── test/                  # 测试文件
├── dist/                  # 构建输出
└── package.json           # 项目配置
```

## 🛠️ 技术特性

- **NestJS** - 企业级Node.js框架
- **TypeScript** - 完整的类型安全
- **TypeORM** - 数据库ORM
- **JWT** - 身份认证
- **Multer** - 文件上传处理
- **Sharp** - 图像处理
- **Swagger** - API文档

## 🔌 核心模块

### 文件上传模块
- 支持多种图片格式
- 文件大小限制
- 安全文件验证
- 自动文件清理

### 图像处理模块
- 背景移除API
- 图像压缩优化
- 格式转换
- 批量处理

### 用户管理模块
- 用户注册登录
- 权限管理
- 用户配置
- 使用统计

### 认证授权模块
- JWT令牌管理
- 角色权限控制
- 请求限流
- 安全防护

## 📡 API接口

### 文件上传
```http
POST /api/uploads
Content-Type: multipart/form-data

# 响应
{
  "success": true,
  "data": {
    "filename": "image.jpg",
    "size": 1024000,
    "url": "/uploads/image.jpg"
  }
}
```

### 图像处理
```http
POST /api/images/process
Content-Type: application/json

{
  "imageUrl": "/uploads/image.jpg",
  "operations": ["removeBackground", "resize"],
  "params": {
    "width": 800,
    "height": 600
  }
}
```

### 用户认证
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

## 🔧 开发指南

### 环境配置
```bash
# 复制环境配置文件
cp .env.example .env

# 配置环境变量
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your-secret-key
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
```

### 代码规范
- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- 遵循NestJS最佳实践
- 完整的TypeScript类型定义

### 模块开发
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  imports: [TypeOrmModule.forFeature([Upload])],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService],
})
export class UploadsModule {}
```

## 🧪 测试

```bash
# 运行单元测试
pnpm run test

# 运行E2E测试
pnpm run test:e2e

# 生成测试覆盖率报告
pnpm run test:cov

# 运行特定测试文件
pnpm run test uploads.service.spec.ts
```

## 📊 性能监控

### 指标收集
- 请求响应时间
- 内存使用情况
- CPU使用率
- 数据库查询性能

### 日志管理
- 结构化日志
- 错误追踪
- 性能分析
- 审计日志

## 🔒 安全特性

### 输入验证
- 请求参数验证
- 文件类型检查
- SQL注入防护
- XSS攻击防护

### 访问控制
- JWT令牌验证
- 角色权限控制
- API限流
- CORS配置

### 数据保护
- 敏感数据加密
- 文件访问控制
- 审计日志记录
- 数据备份策略

## 🚀 部署

### Docker部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

### 环境变量配置
```bash
# 生产环境配置
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@db:5432/prod_db
JWT_SECRET=production-secret-key
REDIS_URL=redis://redis:6379
```

### 反向代理
```nginx
server {
    listen 80;
    server_name api.example.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📈 扩展性

### 水平扩展
- 负载均衡支持
- 多实例部署
- 会话共享
- 缓存集群

### 微服务架构
- 模块化设计
- 服务间通信
- 独立部署
- 故障隔离

## 🤝 贡献

欢迎提交Issue和Pull Request！

## �� 许可证

MIT License
