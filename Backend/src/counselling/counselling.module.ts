import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounsellingService } from './counselling.service';
import { CounsellingController } from './counselling.controller';
import { Counselling } from './entity/counselling.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Counselling])],
  providers: [CounsellingService],
  controllers: [CounsellingController],
})
export class CounsellingModule {}
