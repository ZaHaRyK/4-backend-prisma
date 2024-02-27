import { Module } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { PlanetController } from './planet.controller';
import { FileImagesService } from '../../file.services/images/images.service';
import { FileService } from '../../file.services/file/file.service';
import { BucketService } from '../../file.services/bucket/bucket.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [],
  controllers: [PlanetController],
  providers: [
    PlanetService,
    ConfigService,
    FileImagesService,
    FileService,
    BucketService,
    JwtService,
    PrismaService,
  ],
})
export class PlanetModule {}
