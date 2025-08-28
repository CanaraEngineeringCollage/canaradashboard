// src/alumni/alumni.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumniService } from './alumni.service';
import { AlumniController } from './alumni.controller';
import { Alumni } from './entity/alumni.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alumni])],
  providers: [AlumniService],
  controllers: [AlumniController],
})
export class AlumniModule {}
