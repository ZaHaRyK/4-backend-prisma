import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FileImagesService } from '../../file.services/images/images.service';
import { FilmCreateDto } from './filmDto/film.create.dto';
import { FilmUpdateDto } from './filmDto/film.update.dto';
import { FilmRelationDto } from './filmDto/film.relation.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class FilmService {
  constructor(
    private readonly prisma: PrismaService,
    private fileImagesService: FileImagesService,
  ) {}

  async getFew(skip: number, limit: number) {
    return this.prisma.film.findMany({ skip, take: limit });
  }

  async getOne(id: number) {
    return this.prisma.film.findUnique({ where: { id } });
  }
}
