import { ChangeEvent, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { usePlanetQuery } from '../../features/api/apiSlice';
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

  const { isLoading: isPlanetLoading, data: detailsData } = usePlanetQuery(
    { name: query ?? '' },
    { skip: !query }
  );
  const isPlanetsListLoading = useSelector(
    (state: RootState) => state.planets.isLoading
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let planets: Planet[] = [];
    if (query) {
      if (detailsData) {
        planets = extractDetails(detailsData.results);
      }
      localStorage.setItem('query', query);
      setSearchParams({ search: query });
    } else {
      setSearchParams({ page: '1' });
    }
    dispatch(setPlanets(planets));
  };

  return (
    <>
      <h3>
        Enter planet name or leave input empty and click Search to load planets
        list:{' '}
      </h3>
      <form onSubmit={onSubmit} className={styles.searchForm}>
        <input
          className={styles.searchInput}
          type="text"
          defaultValue={query || undefined}
          onChange={onQueryChange}
          placeholder="planet name (e.g. Hoth)"
        />
        <Button type="submit" loading={isPlanetLoading || isPlanetsListLoading}>
          Search
        </Button>
      </form>
    </>
  );
};

export default Search;
