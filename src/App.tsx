import { useData } from './hooks/useData';
import Search from './components/search/Search';
import Results from './components/results/Results';
import Pagination from './components/pagination/Pagination';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Details from './components/details/Details';
import Button from './components/button/Button';
import { useError } from './hooks/useError';
import { Planet } from './types';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';

function App() {
  const { query, onQueryChange, loadingNext, loadingPrev, changeCurrentPage } =
    useData();
  const { setError } = useError();
  const planets: Planet[] = useSelector(
    (state: RootState) => state.planets.planets
  );
  const showPagination = planets.length > 1 && !query;

  return (
    <>
      <Search query={query} onQueryChange={onQueryChange} />
      <Routes>
        <Route path="/" element={<Results />}>
          <Route path="planet" element={<Details />} />
        </Route>
      </Routes>

      {showPagination && (
        <Pagination
          loadingNext={loadingNext}
          loadingPrev={loadingPrev}
          changeCurrentPage={changeCurrentPage}
        />
      )}
      <Button type="button" onClick={() => setError(true)}>
        Error
      </Button>
    </>
  );
}

export default App;
