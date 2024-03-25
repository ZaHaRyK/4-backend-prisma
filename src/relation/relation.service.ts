import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class RelationService {
  constructor(private readonly prisma: PrismaService) {}

  async createRelation(type: string, idOfRelationModel: number, dto: Object) {
    const relationModel = await this.prisma[type].findFirst({
      where: { id: idOfRelationModel },
    });
    const oldRelationModel = _.cloneDeep(relationModel);

    Promise.all(
      Object.keys(dto).map(async (relation: string) => {
        const arr = dto[relation];
        await Promise.all(
          (Array.isArray(arr) ? arr : [arr]).map(async (id: number) => {
            const essence = await this.prisma[type].findFirst({
              where: { id },
            });

            if (essence) {
              relationModel[relation] ||= [];

              relation === 'homeworld'
                ? (relationModel[relation] = essence)
                : relationModel[relation].push(essence);
            }
          }),
        );
      }),
    ).then(async () => {
      return await this.prisma[type].update({
        where: oldRelationModel,
        data: relationModel,
      });
    });
  }
}
