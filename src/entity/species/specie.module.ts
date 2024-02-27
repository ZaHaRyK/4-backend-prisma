import { Module } from '@nestjs/common';
import { SpecieController } from './specie.controller';
import { SpecieService } from './specie.service';
import { FileImagesService } from '../../file.services/images/images.service';
import { FileService } from '../../file.services/file/file.service';
import { BucketService } from '../../file.services/bucket/bucket.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [],
  controllers: [SpecieController],
  providers: [
    SpecieService,
    ConfigService,
    FileImagesService,
    FileService,
    BucketService,
    JwtService,
    PrismaService,
  ],
})
export class SpecieModule {}
