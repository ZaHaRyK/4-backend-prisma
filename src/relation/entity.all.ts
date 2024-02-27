import {Prisma, People, Planet, Film, Specie, Vehicle, Starship} from "@prisma/client";

export const prismaScalar = {
  people: Prisma.PeopleScalarFieldEnum,

  films: Prisma.FilmScalarFieldEnum,

  planets: Prisma.PlanetScalarFieldEnum,

  species: Prisma.SpecieScalarFieldEnum,

  starships: Prisma.StarshipScalarFieldEnum,

  vehicles: Prisma.VehicleScalarFieldEnum,
}

export const EntityAll = {
  residents: prismaScalar.people,
  characters: prismaScalar.people,
  pilots: prismaScalar.people,
  people: prismaScalar.people,

  planets: prismaScalar.planets,
  homeworld: prismaScalar.planets,

  films: prismaScalar.films,

  starships: prismaScalar.starships,

  species: prismaScalar.species,

  vehicles: prismaScalar.vehicles,
};

export const entities: {
  people: 'people';

  films: 'films';

  planets: 'planets';

  species: 'species';

  starships: 'starships';

  vehicles: 'vehicles';
} = {
  people: 'people',

  films: 'films',

  planets: 'planets',

  species: 'species',

  starships: 'starships',

  vehicles: 'vehicles',
};
// console.log(EntityAll);
