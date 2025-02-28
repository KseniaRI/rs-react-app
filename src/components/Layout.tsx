import { ReactNode } from 'react';
import { useData } from '../hooks/useData';
import { useError } from '../hooks/useError';
import { useThemeToggle } from '../hooks/useThemeToggle';
import { useAppSelector } from '../app/hooks';
import { Planet } from '../types';
import Pagination from './pagination/Pagination';
import Button from './button/Button';
import Search from './search/Search';
import Header from './header/Header';

const Layout = ({ children }: { children: ReactNode }) => {
  useThemeToggle();
  const {
    query,
    onQueryChange,
    onSearchSubmit,
    loadingNext,
    loadingPrev,
    changeCurrentPage,
  } = useData();
  const { error, setError } = useError();

  const planets: Planet[] = useAppSelector(state => state.planets.planets);
  const showPagination = planets.length > 1;

  if (error) {
    throw error;
  }

  return (
    <>
      <Header />
      <Search
        query={query}
        onQueryChange={onQueryChange}
        onSearchSubmit={onSearchSubmit}
      />
      <div>{children}</div>
      {showPagination && (
        <Pagination
          loadingNext={loadingNext}
          loadingPrev={loadingPrev}
          changeCurrentPage={changeCurrentPage}
        />
      )}
      <Button type="button" onClick={() => setError(true)}>
        Generate Error
      </Button>
    </>
  );
};

export default Layout;
