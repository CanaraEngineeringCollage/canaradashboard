import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomePageImagesService } from './home-page-images.service';
import { HomePageImagesController } from './home-page-images.controller';
import { HomePageImage } from './entities/home-page-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomePageImage])],
  controllers: [HomePageImagesController],
  providers: [HomePageImagesService],
})
export class HomePageImagesModule {}
