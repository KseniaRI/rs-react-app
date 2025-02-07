import { useData } from './hooks/useData';
import Search from './components/Search';
import Results from './components/Results';
import Button from './components/Button';
import { ErrorBoundary } from './components/ErrorBoundary';
import Pagination from './components/Pagination';
import Fallback from './components/Fallback';
import './App.css';

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

  const handleErrorButtonClick = async () => {
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
      <Results data={data} />
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
