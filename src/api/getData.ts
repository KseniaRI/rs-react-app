import { DataType } from '../types';
import { transformData } from '../utils/transformData';

export const getData = async (currentPage: number) => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/planets/?page=${currentPage}`
    );
    if (!response.ok) {
      throw new Error('Something went wrong, impossible get data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('/ ~ getData ~ error:', error);
  }
  return [];
};

export const getDataByQuery = async (query: string): Promise<DataType[]> => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/planets/?search=${query}`
    );
    if (!response.ok) {
      throw new Error(
        `Something went wrong, impossible get data by search term ${query}`
      );
    }
    const data = await response.json();
    const result = transformData(data.results);
    return result;
  } catch (error) {
    console.log('/ ~ error:', error);
  }
  return [];
};
