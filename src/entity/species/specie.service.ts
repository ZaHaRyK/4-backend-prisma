import { Injectable } from '@nestjs/common';
import { FileImagesService } from '../../file.services/images/images.service';
import { SpecieCreateDto } from './specieDto/specie.create.dto';
import { SpecieUpdateDto } from './specieDto/specie.update.dto';
import { SpecieRelationDto } from './specieDto/specie.relation.dto';
import { RelationService } from '../../relation/relation.service';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class SpecieService {
  constructor(
    private readonly prisma: PrismaService,
    private fileImagesService: FileImagesService,
  ) {}

  async getFew(skip: number, limit: number) {
    return this.prisma.specie.findMany({ take: limit, skip });
  }

  async getOne(id: number) {
    return this.prisma.specie.findUnique({ where: { id } });
  }

  // async create(
  //   speciesCreateDto: SpecieCreateDto,
  //   files: Express.Multer.File[],
  // ) {
  //   const specie = plainToInstance(SpecieEntity, speciesCreateDto);
  //   specie.images = await this.fileImagesService.appendFiles(files);
  //   return this.specieRepository.save(specie);
  // }
  //
  // async update(
  //   specieUpdateDto: SpecieUpdateDto,
  //   files: Express.Multer.File[],
  //   id: number,
  // ) {
  //   const specie = await this.specieRepository.findOneBy({ id });
  //   const newSpecie = plainToInstance(SpecieEntity, specieUpdateDto);
  //   await this.fileImagesService.deleteFiles(specie.images);
  //   newSpecie.images = await this.fileImagesService.appendFiles(files);
  //   return this.specieRepository.save({ ...specie, ...newSpecie });
  // }
  //
  // async delete(id: number) {
  //   const specie = await this.specieRepository.findOneBy({ id });
  //   const info = await this.specieRepository.remove(specie);
  //   await this.fileImagesService.deleteFiles(info.images);
  //   return info;
  // }
  //
  // async createRelationWith(id: number, specieRelationDto: SpecieRelationDto) {
  //   await relationService(id, specieRelationDto, SpecieEntity);
  // }
}
