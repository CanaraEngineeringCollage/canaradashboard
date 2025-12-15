import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacementService } from './placement.service';
import { PlacementController } from './placement.controller';
import { Placement } from './entities/placement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Placement])],
  controllers: [PlacementController],
  providers: [PlacementService],
})
export class PlacementModule {}
