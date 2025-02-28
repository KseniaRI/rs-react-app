import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { usePlanetQuery, usePlanetsListQuery } from '../features/api/apiSlice';
import {
  setLoading,
  setPagination,
  setPlanets,
} from '../features/api/planetsSlice';
import { extractDetails } from '../utils/extractDetails';

export const useData = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { page } = router.query;

  const currentPage = Number(page);

  const [query, setQuery] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(query);
    localStorage.setItem('query', query);
    if (query) {
      router.push({
        pathname: router.pathname,
        query: { search: query },
      });
    } else {
      router.push({
        pathname: router.pathname,
        query: { page: '1' },
      });
    }
  };

  const changeCurrentPage = (page: number) => {
    if (planetsData) {
      const maxPages = Math.floor(
        planetsData.count / planetsData?.results.length
      );
      if (page <= maxPages) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, page: page.toString() },
        });
        if (page > currentPage) {
          setLoadingNext(true);
        } else {
          setLoadingPrev(true);
        }
      }
    }
  };

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.trim());
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedQuery = localStorage.getItem('query');
      if (storedQuery) {
        setQuery(storedQuery);
        setSearchQuery(storedQuery);
      }
    }
  }, []);

  useEffect(() => {
    if (currentPage === 0) {
      if (!isSearchingByQuery) {
        router.push({
          pathname: router.pathname,
          query: { page: '1' },
        });
      } else {
        router.push({
          pathname: router.pathname,
          query: { search: searchQuery },
        });
      }
    }
  }, [router, currentPage, isSearchingByQuery, searchQuery]);

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
