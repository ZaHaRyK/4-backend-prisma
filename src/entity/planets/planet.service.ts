import { Injectable } from '@nestjs/common';
import { FileImagesService } from '../../file.services/images/images.service';
import { PlanetCreateDto } from './planetDto/planet.create.dto';
import { PlanetUpdateDto } from './planetDto/planet.update.dto';
import { PlanetRelationDto } from './planetDto/planet.relation.dto';
import { RelationService } from '../../relation/relation.service';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PlanetService {
  constructor(
    private readonly prisma: PrismaService,
    private fileImagesService: FileImagesService,
  ) {}

  async getFew(skip: number, limit: number) {
    return this.prisma.planet.findMany({ skip, take: limit });
  }

  async getOne(id: number) {
    return this.prisma.planet.findUnique({ where: { id } });
  }
}
