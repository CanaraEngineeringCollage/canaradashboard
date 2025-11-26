import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PptController } from './ppt.controller';
import { PptService } from './ppt.service';
import { PptLink } from './entities/ppt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PptLink])],
  controllers: [PptController],
  providers: [PptService],
})
export class PptModule {}

