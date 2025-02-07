import { ChangeEvent, FormEvent } from 'react';
import { getData, getDataByQuery } from '../api/getData';
import { transformData } from '../utils/transformData';
import { DataType } from '../types';
import Button from './Button';
import { SetURLSearchParams } from 'react-router-dom';

interface SearchProps {
  query: string | null;
  onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setData: (res: DataType[]) => void;
  loadingSearch: boolean;
  setLoadingSearch: (load: boolean) => void;
  setCurrentPage: (page: number) => void;
  setSearchParams: SetURLSearchParams;
}

const Search = ({
  query,
  onQueryChange,
  setData,
  loadingSearch,
  setLoadingSearch,
  setCurrentPage,
  setSearchParams,
}: SearchProps) => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSearch(true);
    let res: DataType[] = [];
    if (query) {
      res = await getDataByQuery(query);
      localStorage.setItem('query', query);
    } else {
      const response = await getData(1);
      setCurrentPage(1);
      setSearchParams({ page: '1' });
      res = transformData(response.results);
    }
    setData(res);
    setLoadingSearch(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          defaultValue={query || undefined}
          onChange={onQueryChange}
        />
        <Button type="submit" loading={loadingSearch}>
          Search
        </Button>
      </form>
    </div>
  );
};

export default Search;
