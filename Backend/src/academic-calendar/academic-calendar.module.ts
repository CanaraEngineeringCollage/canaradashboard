import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicCalendarService } from './academic-calendar.service';
import { AcademicCalendarController } from './academic-calendar.controller';
import { AcademicCalendar } from './entities/academic-calendar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademicCalendar])],
  controllers: [AcademicCalendarController],
  providers: [AcademicCalendarService],
})
export class AcademicCalendarModule {}
