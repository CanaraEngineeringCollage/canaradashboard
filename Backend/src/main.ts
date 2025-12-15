import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';

async function bootstrap() {
  console.log('🚀 Bootstrapping NestJS...');

  const app = await NestFactory.create(AppModule);
  console.log('✅ NestJS application created');

  

  // Middleware setup
  app.use(bodyParser.json({ limit: '150mb' }));
  app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:9002',
      'http://localhost:3001',
      'http://localhost:3000',
      'https://canaradashboard.vercel.app',
      'https://canaraengineering.vercel.app',
      'https://cec.edu.in',
      'https://www.cec.edu.in',
      'https://cecdashboard.cec.edu.in'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
  console.log(`🚀 Server is running on http://localhost:3000`);
}

bootstrap();
