import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entity/event.entity';
import { EventController } from './events.controller';
import { EventService } from './events.service';


import { ConfigModule } from '@nestjs/config';
import { S3Service } from './s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), ConfigModule],
  controllers: [EventController],
  providers: [EventService, S3Service],
})
export class EventModule {}
