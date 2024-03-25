import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FileImagesService } from '../../file.services/images/images.service';
import { FilmCreateDto } from './filmDto/film.create.dto';
import { FilmUpdateDto } from './filmDto/film.update.dto';
import { FilmRelationDto } from './filmDto/film.relation.dto';
import { PrismaService } from '../../prisma.service';
import {Film} from "@prisma/client";
import * as _ from 'lodash';


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

  async create(filmCreateDto: FilmCreateDto, files: Express.Multer.File[]) {
    const film = Object.assign(filmCreateDto);
    console.log(film);
    film.images = await this.fileImagesService.appendFiles(files);
    console.log(await this.fileImagesService.appendFiles(files));
    console.log(film);
    return this.prisma.film.create({data: film})
  }
}
