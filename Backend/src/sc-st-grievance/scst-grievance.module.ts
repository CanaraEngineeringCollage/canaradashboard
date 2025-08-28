import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScstGrievanceService } from './scst-grievance.service';
import { ScstGrievanceController } from './scst-grievance.controller';
import { ScstGrievance } from './entity/scst-grievance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScstGrievance])],
  controllers: [ScstGrievanceController],
  providers: [ScstGrievanceService],
  exports: [ScstGrievanceService],
})
export class ScstGrievanceModule {}
