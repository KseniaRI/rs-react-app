import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useAppSelector } from '../../src/app/hooks';
import { Planet } from '../../src/types';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../src/features/api/planetsSlice';

export const useData = () => {
  const dispatch = useDispatch();
  const planets: Planet[] = useAppSelector(state => state.planets.planets);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));
  const currentPage = Number(page);

  const [query, setQuery] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const isSearchingByQuery = Boolean(searchQuery);

  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrev, setLoadingPrev] = useState(false);

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(query);
    dispatch(setLoading(true));
    localStorage.setItem('query', query);
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({ page: '1' });
    }
  };

  const changeCurrentPage = (page: number) => {
    if (planets) {
      const maxPages = Math.floor(60 / planets.length);
      if (page <= maxPages) {
        const updatedParams = new URLSearchParams(searchParams.toString());
        updatedParams.set('page', page.toString());
        setSearchParams(updatedParams);
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
    if (currentPage === 0 && !isSearchingByQuery) {
      setSearchParams({ page: '1' });
    }
  }, [currentPage, isSearchingByQuery, setSearchParams]);

  useEffect(() => {
    if (currentPage > 0) {
      setLoadingNext(false);
      setLoadingPrev(false);
    }
  }, [currentPage]);

  return {
    query,
    onQueryChange,
    onSearchSubmit,
    loadingNext,
    loadingPrev,
    changeCurrentPage,
  };
};
