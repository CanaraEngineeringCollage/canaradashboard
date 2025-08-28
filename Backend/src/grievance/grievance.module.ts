import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GrievanceService } from './grievance.service';
import { GrievanceController } from './grievance.controller';
import { Grievance } from './entity/grievance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grievance])],
  controllers: [GrievanceController],
  providers: [GrievanceService],
})
export class GrievanceModule {}
