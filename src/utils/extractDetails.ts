import { Planet } from '../types';

export const extractDetails = (data: Partial<Planet>[]) => {
  return data.map(
    ({
      name,
      climate,
      diameter,
      gravity,
      terrain,
      orbital_period,
      population,
    }) => ({
      name: name ?? '',
      climate: climate ?? '',
      diameter: diameter ?? '',
      gravity: gravity ?? '',
      terrain: terrain ?? '',
      orbital_period: orbital_period ?? '',
      population: population ?? '',
    })
  );
};
