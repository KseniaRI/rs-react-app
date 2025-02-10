import { ExtractedData, Planet } from '../types';

export const transformData = (data: Partial<Planet>[]): ExtractedData[] => {
  return data.map(({ name, terrain, climate }) => ({
    name: name || 'Unknown',
    description: `Planet with ${terrain} and ${climate} climate`,
  }));
};
