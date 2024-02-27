import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { PlanetModule } from './planets/planet.module';
import { FilmModule } from './films/film.module';
import { StarshipModule } from './starships/starship.module';
import { SpecieModule } from './species/specie.module';
import { VehicleModule } from './vehicles/vehicle.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    PeopleModule,
    FilmModule,
    PlanetModule,
    StarshipModule,
    SpecieModule,
    VehicleModule,
    ConfigModule,
  ],
  providers: [PrismaService],
})
export class EntityModule {}
