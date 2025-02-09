import { useData } from './hooks/useData';
import Search from './components/Search';
import Results from './components/Results';
import Button from './components/Button';
import { ErrorBoundary } from './components/ErrorBoundary';
import Pagination from './components/Pagination';
import Fallback from './components/Fallback';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Details from './components/Details';

function App() {
  const {
    query,
    onQueryChange,
    data,
    setData,
    loadingSearch,
    setLoadingSearch,
    nextPage,
    prevPage,
    loadingNext,
    loadingPrev,
    changeCurrentPage,
  } = useData();

  const handleErrorButtonClick = () => {
    throw new Error('Generated error');
  };

  const showPagination = data.length > 1 && !query;

  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Search
        query={query}
        onQueryChange={onQueryChange}
        setData={setData}
        loadingSearch={loadingSearch}
        setLoadingSearch={setLoadingSearch}
      />
      <Routes>
        <Route path="/" element={<Results data={data} />}>
          <Route path="planet" element={<Details />} />
        </Route>
      </Routes>

      {showPagination && (
        <Pagination
          loadingNext={loadingNext}
          loadingPrev={loadingPrev}
          changeCurrentPage={changeCurrentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
      <Button type="submit" onClick={handleErrorButtonClick}>
        Error
      </Button>
    </ErrorBoundary>
  );
}

export default App;
