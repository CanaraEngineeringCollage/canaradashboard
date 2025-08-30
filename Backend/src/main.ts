import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  console.log('🚀 Bootstrapping NestJS...');

  const app = await NestFactory.create(AppModule);
  console.log('✅ NestJS application created');
  app.use(cookieParser());
<<<<<<< HEAD
  app.enableCors({
    origin: ['http://localhost:9002', 'http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
=======
app.enableCors({
  origin: [
    'https://canaradashboard-aooq.vercel.app', // Your existing origin
    'http://localhost:3000'                     // Add your new origin here
  ],
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
>>>>>>> 534fe42a0ad2222bfc280d6df4a3b36f97938da3
  });

  await app.listen(3000);
  console.log(`🚀 Server is running on http://localhost:3000`);
}

bootstrap();