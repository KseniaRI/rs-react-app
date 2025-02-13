import { ChangeEvent, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { usePlanetDetailsQuery } from '../../features/api/apiSlice';
import { setPlanets } from '../../features/api/planetsSlice';
import { extractDetails } from '../../utils/extractDetails';
import { Planet } from '../../types';
import Button from '../button/Button';
import styles from './Search.module.css';

interface SearchProps {
  query: string | null;
  onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ query, onQueryChange }: SearchProps) => {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { isLoading: isDetailsLoading, data: detailsData } =
    usePlanetDetailsQuery({ name: query ?? '' }, { skip: !query });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let planets: Planet[] = [];
    if (query) {
      if (detailsData) {
        planets = extractDetails(detailsData.results);
      }
      localStorage.setItem('query', query);
    } else {
      setSearchParams({ page: '1' });
      localStorage.removeItem('query');
    }
    dispatch(setPlanets(planets));
  };

  return (
    <form onSubmit={onSubmit} className={styles.searchForm}>
      <input
        className={styles.searchInput}
        type="text"
        defaultValue={query || undefined}
        onChange={onQueryChange}
      />
      <Button type="submit" loading={isDetailsLoading}>
        Search
      </Button>
    </form>
  );
};

export default Search;
