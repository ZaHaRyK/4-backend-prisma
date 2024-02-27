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

  // for (const entity in seedService.data) {
  //   const nameModel = namesModels[entity];
  //   await prisma[`${nameModel}`].createMany({
  //     data: seedService.data[entity],
  //   });
  // }

  const oldData = _.cloneDeep(seedService.data);
  for (const entityName in seedService.data) {
    await Promise.all(
      seedService.dataWithRelations[entityName].map(async (entity, index) => {
        for (const parameter of seedService.relations) {
          if (entity[parameter]) {
            for await (const url of Array.isArray(entity[parameter])
              ? entity[parameter]
              : [entity[parameter]]) {
              // *_* СУПЕР КОСТИЛЬ ^^^^^
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
            if (parameter === 'homeworld') {
              seedService.data[entityName][index][parameter] = {
                connectOrCreate: {
                  where: seedService.data[entityName][index][parameter].id,
                  create: seedService.data[entityName][index][parameter],
                },
              };
            } else {
              seedService.data[entityName][index][parameter] = {
                connectOrCreate: seedService.data[entityName][index][
                  parameter
                ].map((entity) => {
                  return {
                    where: { id: entity.id },
                    create: entity,
                  };
                }),
              };
              console.log(seedService.data[entityName][index][parameter]);
            }
          }
        }

        const nameOfModel = namesModels[entityName];
        // console.log(JSON.stringify(seedService.data[entityName][index]), '\n');
        // seedService.data.people[25].id = 17;
        await prisma[`${nameOfModel}`].create({
          // where: { id: seedService.data[entityName][index].id },
          data: seedService.data[entityName][index],
        });
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
