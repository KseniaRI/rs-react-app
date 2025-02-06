import { ChangeEvent, FormEvent, useState } from 'react';
import { getData, getDataByQuery } from '../api/getData';
import Button from './Button';
import { DataType } from '../types';

interface SearchProps {
  query: string | null;
  onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setData: (res: DataType[]) => void;
}

const Search = ({ query, onQueryChange, setData }: SearchProps) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    let res: DataType[] = [];
    if (query) {
      res = await getDataByQuery(query);
      localStorage.setItem('query', query);
    } else {
      res = await getData();
    }
    setData(res);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          defaultValue={query || undefined}
          onChange={onQueryChange}
        />
        <Button type="submit" loading={loading}>
          Search
        </Button>
      </form>
    </div>
  );
};

export default Search;
