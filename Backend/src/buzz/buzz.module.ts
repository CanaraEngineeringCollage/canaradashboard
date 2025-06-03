import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuzzController } from './buzz.controller';
import { BuzzService } from './buzz.service';
import { Buzz } from './entities/buzz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Buzz])],
  controllers: [BuzzController],
  providers: [BuzzService],
})
export class BuzzModule {}