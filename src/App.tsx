import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from './app/store';
import { useData } from './hooks/useData';
import { useError } from './hooks/useError';
import Search from './components/search/Search';
import Results from './components/results/Results';
import Pagination from './components/pagination/Pagination';
import Details from './components/details/Details';
import Button from './components/button/Button';
import { Planet } from './types';
import './App.css';
import { ThemeProvider } from './ThemeProvider';
import Header from './components/header/Header';
import Container from './components/container/Container';

function App() {
  const { query, onQueryChange, loadingNext, loadingPrev, changeCurrentPage } =
    useData();
  const { setError } = useError();

  const planets: Planet[] = useSelector(
    (state: RootState) => state.planets.planets
  );

  const showPagination = planets.length > 1 && !query;

  return (
    <ThemeProvider>
      <Container>
        <Header />
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
          Generate Error
        </Button>
      </Container>
    </ThemeProvider>
  );
}

export default App;
