import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { FileImagesService } from '../../file.services/images/images.service';
import { FileService } from '../../file.services/file/file.service';
import { BucketService } from '../../file.services/bucket/bucket.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule],
  controllers: [VehicleController],
  providers: [
    VehicleService,
    ConfigService,
    FileImagesService,
    FileService,
    BucketService,
    JwtService,
    PrismaService,
  ],
})
export class VehicleModule {}
