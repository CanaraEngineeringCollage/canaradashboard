import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  console.log('🚀 Bootstrapping NestJS...');
  const app = await NestFactory.create(AppModule);
  console.log('✅ NestJS application created');
 app.setGlobalPrefix('api');

 
  app.use(cookieParser());
  app.enableCors({
    origin: [`${process.env.NEXT_PUBLIC_FRONTEND_URL}`],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // ✅ Swagger setup
  const config = new DocumentBuilder()
    .setTitle('CEC API')
    .setDescription('Canara Engineering College API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false, // this includes /api in all routes
  });

  SwaggerModule.setup('docs', app, document); // http://localhost:3000/docs

  await app.listen(3000);
  console.log(`🚀 Server is running on http://localhost:3000/api`);
}
bootstrap();




