import { useData } from './hooks/useData';
import Search from './components/search/Search';
import Results from './components/results/Results';
import Pagination from './components/pagination/Pagination';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Details from './components/details/Details';
import Button from './components/button/Button';
import { useEffect, useState } from 'react';
import { useError } from './hooks/useError';

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
  const { setError } = useError();
  const showPagination = data.length > 1 && !query;

  return (
    <>
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
      <Button type="button" onClick={() => setError(true)}>
        Error
      </Button>
    </>
  );
}

export default App;
