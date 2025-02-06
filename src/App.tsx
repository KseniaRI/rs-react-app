import { ChangeEvent, useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import Button from './components/Button';
import { DataType } from './types';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  const [query, setQuery] = useState<string | null>(
    localStorage.getItem('query')
  );
  const [data, setData] = useState<DataType[]>([]);

  const handleErrorButtonClick = () => {
    throw new Error('Generated error');
  };
  return (
    <>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Search
          query={query}
          onQueryChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value.trim())
          }
          setData={setData}
        />
        <Results data={data} />
        <Button type="submit" onClick={handleErrorButtonClick}>
          Error
        </Button>
      </ErrorBoundary>
    </>
  );
}

export default App;
