import { ChangeEvent, FormEvent } from 'react';
import { useAppSelector } from '../../app/hooks';
import Button from '../button/Button';
import styles from './Search.module.css';

interface SearchProps {
  query: string;
  onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Search = ({ query, onQueryChange, onSearchSubmit }: SearchProps) => {
  const isLoading = useAppSelector(state => state.planets.isLoading);

  return (
    <>
      <h3>
        Enter planet name to search desired planet or enter empty string and
        click Search to load planets list:{' '}
      </h3>
      <form onSubmit={e => onSearchSubmit(e)} className={styles.searchForm}>
        <input
          className={styles.searchInput}
          type="text"
          defaultValue={query || undefined}
          onChange={onQueryChange}
          placeholder="planet name (e.g. Hoth)"
        />
        <Button type="submit" loading={isLoading}>
          Search
        </Button>
      </form>
    </>
  );
};

export default Search;
