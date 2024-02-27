import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FileImagesService } from '../../file.services/images/images.service';
import { PeopleCreateDto } from './peopleDto/people.create.dto';
import { PeopleUpdateDto } from './peopleDto/people.update.dto';
import { PeopleRelationDto } from './peopleDto/people.relation.dto';
import { RelationService } from '../../relation/relation.service';
import { PrismaService } from '../../prisma.service';
import passport from 'passport';

@Injectable()
export class PeopleService {
  constructor(
    private readonly prisma: PrismaService,
    private fileImagesService: FileImagesService,
  ) {}

  async getFew(skip: number, limit: number) {
    return this.prisma.people.findMany({ skip, take: limit });
  }

  async getOne(id: number) {
    return this.prisma.people.findUnique({ where: { id } });
  }
}
