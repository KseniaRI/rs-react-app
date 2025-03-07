import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { Route } from './+types/home';
import {
  setLoading,
  setPagination,
  setPlanets,
} from '../../src/features/api/planetsSlice';
import { extractDetails } from '../../src/utils/extractDetails';
import Results from '../../src/components/results/Results';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || '1';
  const search = url.searchParams.get('search');

  const endpoint = search
    ? `https://swapi.dev/api/planets/?search=${search}`
    : `https://swapi.dev/api/planets/?page=${page}`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error('Failed to fetch planets data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching planets data:', error);
  }
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (loaderData) {
      dispatch(setLoading(false));
      dispatch(setPlanets(extractDetails(loaderData.results)));
      dispatch(
        setPagination({ prev: loaderData.previous, next: loaderData.next })
      );
    }
  }, [dispatch, loaderData]);

  return <Results />;
}
