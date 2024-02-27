import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FileImagesService } from '../../file.services/images/images.service';
import { VehicleCreateDto } from './vehicleDto/vehicle.create.dto';
import { VehicleUpdateDto } from './vehicleDto/vehicle.update.dto';
import { VehicleRelationDto } from './vehicleDto/vehicle.relation.dto';
import { RelationService } from '../../relation/relation.service';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class VehicleService {
  constructor(
    private readonly prisma: PrismaService,
    private fileImagesService: FileImagesService,
  ) {}

  async getFew(skip: number, limit: number) {
    return this.prisma.vehicle.findMany({ take: limit, skip });
  }

  async getOne(id: number) {
    return this.prisma.vehicle.findUnique({ where: { id } });
  }
}
