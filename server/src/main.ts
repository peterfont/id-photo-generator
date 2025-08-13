import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置 CORS
  app.use(
    cors({
      origin: '*', // 允许的前端地址
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }),
  );

  // 配置静态文件服务
  app.use('/public', express.static(join(__dirname, '..', 'public')));

  await app.listen(3000);
}
bootstrap();
