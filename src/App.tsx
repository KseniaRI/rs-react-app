import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from './app/hooks';
import { useData } from './hooks/useData';
import { useError } from './hooks/useError';
import Search from './components/search/Search';
import Results from './components/results/Results';
import Pagination from './components/pagination/Pagination';
import Details from './components/details/Details';
import Button from './components/button/Button';
import Header from './components/header/Header';
import { Planet } from './types';
import './App.css';
import { useTheme } from './ThemeContext';

function App() {
  const {
    query,
    onQueryChange,
    onSearchSubmit,
    loadingNext,
    loadingPrev,
    changeCurrentPage,
  } = useData();
  const { setError } = useError();

  const planets: Planet[] = useAppSelector(state => state.planets.planets);

  const darkTheme = useTheme();

  useEffect(() => {
    document.body.classList.toggle('dark', darkTheme);
    document.body.classList.toggle('light', !darkTheme);
  }, [darkTheme]);

  const showPagination = planets.length > 1;

  return (
    <>
      <Header />
      <Search
        query={query}
        onQueryChange={onQueryChange}
        onSearchSubmit={onSearchSubmit}
      />
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
        Generate Error
      </Button>
    </>
  );
}

export default App;
