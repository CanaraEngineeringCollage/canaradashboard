import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timetable } from './entity/timetable.entity';
import { TimetableController } from './timetable.controller';
import { TimetableService } from './timetable.service';


@Module({
  imports: [TypeOrmModule.forFeature([Timetable])],
  controllers: [TimetableController],
  providers: [TimetableService],
})
export class TimetableModule {}