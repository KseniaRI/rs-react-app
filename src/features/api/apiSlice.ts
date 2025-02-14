import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '../../types';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api/',
  }),
  endpoints: build => ({
    planetsList: build.query<ApiResponse, { page: number }>({
      query({ page }) {
        return {
          url: 'planets/',
          params: {
            page,
          },
          method: 'GET',
        };
      },
    }),
    planet: build.query<ApiResponse, { name: string }>({
      query({ name }) {
        return {
          url: 'planets/',
          params: {
            search: name,
          },
          method: 'GET',
        };
      },
    }),
  }),
});

export const { usePlanetsListQuery, usePlanetQuery } = apiSlice;
