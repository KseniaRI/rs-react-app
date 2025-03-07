import { useAppSelector } from '../app/hooks';
import { useData } from '../hooks/useData';
import { useError } from '../hooks/useError';
import { Planet } from '../types';
import Button from './button/Button';
import Pagination from './pagination/Pagination';
import Search from './search/Search';

export default function PlanetsContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    query,
    onQueryChange,
    onSearchSubmit,
    loadingNext,
    loadingPrev,
    changeCurrentPage,
  } = useData();

  const { error, setCustomError } = useError();
  const planets: Planet[] = useAppSelector(state => state.planets.planets);
  const showPagination = planets.length > 1;

  if (error) {
    throw error;
  }

  return (
    <>
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
      <Button type="button" onClick={() => setCustomError()}>
        Generate Error
      </Button>
    </>
  );
}
