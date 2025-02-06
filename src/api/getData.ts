import { DataType } from '../types';

export const getData = async (): Promise<DataType[]> => {
  try {
    const response = await fetch('https://swapi.dev/api/films/?page=2');
    if (!response.ok) {
      throw new Error('Something went wrong, impossible get data');
    }
    const data = await response.json();
    const result = data.results.map(
      ({ title, opening_crawl }: { title: string; opening_crawl: string }) => ({
        name: title,
        description: opening_crawl,
      })
    );
    return result;
  } catch (error) {
    console.log('/ ~ getData ~ error:', error);
  }
  return [];
};

export const getDataByQuery = async (query: string): Promise<DataType[]> => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/films/?search=${query}`
    );
    if (!response.ok) {
      throw new Error(
        `Something went wrong, impossible get data by search term ${query}`
      );
    }
    const data = await response.json();
    const result = data.results.map(
      ({ title, opening_crawl }: { title: string; opening_crawl: string }) => ({
        name: title,
        description: opening_crawl,
      })
    );
    return result;
  } catch (error) {
    console.log('/ ~ error:', error);
  }
  return [];
};
