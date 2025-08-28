import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FacultyModule } from './faculty/faculty.module';
import { BuzzModule } from './buzz/buzz.module';
import { EventModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
 extra: {
    socketPath: '/var/run/mysqld/mysqld.sock',
  },
  autoLoadEntities: true,
  synchronize: true,
}),

    FacultyModule,
    BuzzModule,
    EventModule
  ],
})
export class AppModule {}
