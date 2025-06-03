import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mysql from 'mysql2/promise';


async function createDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
  await connection.end();
}

async function bootstrap() {
  // Create DB if not exists
  await createDatabase();

  // Now start your NestJS app normally
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:9002', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000);
}

bootstrap();
