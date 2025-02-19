import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { usePlanetQuery, usePlanetsListQuery } from '../features/api/apiSlice';
import {
  setLoading,
  setPagination,
  setPlanets,
} from '../features/api/planetsSlice';
import { extractDetails } from '../utils/extractDetails';

export const useData = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page'));

  const dispatch = useDispatch();

  const initialQuery = localStorage.getItem('query') || '';
  const [query, setQuery] = useState<string>(initialQuery);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const isSearchingByQuery = Boolean(searchQuery);

  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrev, setLoadingPrev] = useState(false);

  const { isLoading: isPlanetsListLoading, data: planetsData } =
    usePlanetsListQuery(
      { page: currentPage || 1 },
      { skip: isSearchingByQuery }
    );

  const { isLoading: isPlanetLoading, data: planetData } = usePlanetQuery(
    { name: searchQuery },
    { skip: !isSearchingByQuery }
  );

  const onSearchSubmit = () => {
    setSearchQuery(query);
    localStorage.setItem('query', query);
    setSearchParams({ search: query, page: '1' });
  };

  const changeCurrentPage = (page: number) => {
    setSearchParams({ page: page.toString() });
    if (page > currentPage) {
      setLoadingNext(true);
    } else {
      setLoadingPrev(true);
    }
  };

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.trim());
  };

  useEffect(() => {
    if (!searchParams.has('page') || currentPage === 0) {
      if (!isSearchingByQuery) {
        setSearchParams({ page: '1' }, { replace: true });
      } else {
        setSearchParams({ search: searchQuery }, { replace: true });
      }
    }
  }, [
    searchParams,
    currentPage,
    isSearchingByQuery,
    searchQuery,
    setSearchParams,
  ]);

  useEffect(() => {
    dispatch(setLoading(isPlanetsListLoading || isPlanetLoading));
  }, [isPlanetsListLoading, isPlanetLoading, dispatch]);

  useEffect(() => {
    if (currentPage > 0) {
      setLoadingNext(false);
      setLoadingPrev(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (planetsData && !isSearchingByQuery) {
      dispatch(setPlanets(extractDetails(planetsData.results)));
      dispatch(
        setPagination({ prev: planetsData.previous, next: planetsData.next })
      );
    }
  }, [planetsData, dispatch, isSearchingByQuery]);

  useEffect(() => {
    if (planetData && isSearchingByQuery) {
      dispatch(setPlanets(extractDetails(planetData.results)));
    }
  }, [planetData, dispatch, isSearchingByQuery]);

  return {
    query,
    onQueryChange,
    onSearchSubmit,
    loadingNext,
    loadingPrev,
    changeCurrentPage,
  };
};
