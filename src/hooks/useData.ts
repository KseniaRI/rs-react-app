import { ChangeEvent, useEffect, useState } from 'react';
import { DataType } from '../types';
import { getData } from '../api/getData';
import { transformData } from '../utils/transformData';
import { useSearchParams } from 'react-router-dom';

export const useData = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [query, setQuery] = useState<string | null>(
    localStorage.getItem('query')
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrev, setLoadingPrev] = useState(false);

  const changeCurrentPage = (page: number) => {
    setCurrentPage(page);
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
    const fetchData = async () => {
      try {
        const response = await getData(currentPage);
        setNextPage(response.next);
        setPrevPage(response.previous);
        const res = transformData(response.results);
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentPage > 0) {
      fetchData();
      setLoadingNext(false);
      setLoadingPrev(false);
    }
  }, [currentPage]);

  return {
    query,
    onQueryChange,
    data,
    setData,
    loadingSearch,
    setLoadingSearch,
    currentPage,
    setCurrentPage,
    nextPage,
    prevPage,
    loadingNext,
    loadingPrev,
    changeCurrentPage,
    setSearchParams,
  };
};
