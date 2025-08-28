import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BuzzModule } from './buzz/buzz.module';
import { EventModule } from './events/events.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { FacultyModule } from './faculty/faculty.module';
import { GrievanceModule } from './grievance/grievance.module';
import { ScstGrievanceModule } from './sc-st-grievance/scst-grievance.module';
import { TimetableModule } from './exam-time-table/timetable.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    BuzzModule,
    EventModule,
    AdminModule,
    AuthModule,
    FacultyModule,
    GrievanceModule,
    ScstGrievanceModule,
    TimetableModule
  ],
})
export class AppModule {}
