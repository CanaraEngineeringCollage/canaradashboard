// admin.module.ts
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Admin } from './entities/admin.entity';
import { NotificationStatus } from './entities/notification-status.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, NotificationStatus]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
