import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FileImagesService } from '../../file.services/images/images.service';
import { StarshipCreateDto } from './starshipDto/starship.create.dto';
import { StarshipUpdateDto } from './starshipDto/starship.update.dto';
import { StarshipRelationDto } from './starshipDto/starship.relation.dto';
import { RelationService } from '../../relation/relation.service';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class StarshipService {
  constructor(
    private readonly prisma: PrismaService,
    private fileImagesService: FileImagesService,
  ) {}

  async getFew(skip: number, limit: number) {
    return this.prisma.starship.findMany({ skip, take: limit });
  }

  async getOne(id: number) {
    return this.prisma.starship.findUnique({ where: { id } });
  }
}
