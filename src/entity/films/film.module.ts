import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { FileImagesService } from '../../file.services/images/images.service';
import { FileService } from '../../file.services/file/file.service';
import { BucketService } from '../../file.services/bucket/bucket.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [],
  controllers: [FilmController],
  providers: [
    FilmService,
    ConfigService,
    FileImagesService,
    FileService,
    BucketService,
    JwtService,
    PrismaService,
  ],
})
export class FilmModule {}
