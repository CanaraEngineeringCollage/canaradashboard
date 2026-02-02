import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacementService } from './placement.service';
import { PlacementController } from './placement.controller';
import { Placement } from './entities/placement.entity';
import { TopRecruiter } from './entities/top-recruiter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Placement, TopRecruiter])],
  controllers: [PlacementController],
  providers: [PlacementService],
})
export class PlacementModule {}
