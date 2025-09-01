import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  console.log('🚀 Bootstrapping NestJS...');

  const app = await NestFactory.create(AppModule);
  console.log('✅ NestJS application created');
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:9002', 'https://canaradashboard-aooq.vercel.app/','http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
  console.log(`🚀 Server is running on http://localhost:3000`);
}

bootstrap();