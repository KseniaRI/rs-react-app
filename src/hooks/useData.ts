import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { usePlanetsListQuery } from '../features/api/apiSlice';
import { extractDetails } from '../utils/extractDetails';
import { setPagination, setPlanets } from '../features/api/planetsSlice';

export const useData = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 0;

  const dispatch = useDispatch();

  const initialQuery = !currentPage ? localStorage.getItem('query') : null;
  const [query, setQuery] = useState<string | null>(initialQuery);

  const { isLoading, data } = usePlanetsListQuery(
    { page: currentPage },
    { skip: !!query }
  );

  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrev, setLoadingPrev] = useState(false);

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
    if (currentPage > 0) {
      setLoadingNext(false);
      setLoadingPrev(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (data) {
      const planets = extractDetails(data.results);
      dispatch(setPlanets(planets));
      dispatch(setPagination({ prev: data.previous, next: data.next }));
    }
  }, [data, dispatch]);

  return {
    query,
    onQueryChange,
    isLoading,
    // isError,
    loadingNext,
    loadingPrev,
    changeCurrentPage,
  };
};
