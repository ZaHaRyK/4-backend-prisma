import { SeedService } from './seed.service';
import { PrismaClient } from '@prisma/client';
import * as _ from 'lodash';
import { createMatchPathAsync } from 'tsconfig-paths';

const prisma = new PrismaClient();
const seedService = new SeedService();

const namesModels = {
  films: 'film',
  people: 'people',
  planets: 'planet',
  species: 'specie',
  starships: 'starship',
  vehicles: 'vehicle',
};
async function run(): Promise<void> {
  await seedService.getData();

  for (const entity in seedService.data) {
    const nameModel = namesModels[entity];
    await prisma[`${nameModel}`].createMany({
      data: seedService.data[entity],
    });
  }

  const oldData = _.cloneDeep(seedService.data);
  for (const entityName in seedService.data) {
    await Promise.all(
      seedService.dataWithRelations[entityName].map(async (entity, index: number) => {
        for (const parameter of seedService.relations) {
          if (entity[parameter]) {
            for await (const url of Array.isArray(entity[parameter])
              ? entity[parameter]
              : [entity[parameter]]) {

              seedService.data[entityName][index][parameter] ||= [];

              const { relationEntityName, relationId } =
                await seedService.getIdFromUrl(url);

              const relationEntity = oldData[relationEntityName].find(
                (entity) => entity.id === relationId,
              );

              if (parameter === 'homeworld') {
                seedService.data[entityName][index][parameter] = relationEntity;
              } else {
                if (
                  !seedService.data[entityName][index][parameter].find(
                    (entity) => entity.id === relationEntity.id,
                  )
                ) {
                  seedService.data[entityName][index][parameter].push(
                    relationEntity,
                  );
                }
              }
            }
            try {
              if (parameter === 'homeworld') {
                seedService.data[entityName][index][parameter] = {
                  connect: {
                    id: seedService.data[entityName][index][parameter].id,
                  },
                };
              } else {
                if (parameter == 'pilots'){
                  seedService.data[entityName][index][parameter] ||= [];
                }
                seedService.data[entityName][index][parameter] = {
                  connect: seedService.data[entityName][index][
                      parameter
                      ].map((entity) => {
                    return { id: entity.id };
                  }),
                };
              }
            }
            catch (e) {
              console.log(e)
            }

          }
        }

        const nameOfModel = namesModels[entityName];

        const saveEntity = seedService.data[entityName][index];

        try {
          await prisma[`${nameOfModel}`].update({
            data: saveEntity,
            where: {id: saveEntity.id},
          });
        } catch (e) {
          console.log(e);
        }
      }),
    );
  }

  console.log(
    `\nseconds elapsed = ${(Date.now() - seedService.starts) / 1000}`,
  );
}
run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
