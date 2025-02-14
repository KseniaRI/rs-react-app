import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import Fallback from './components/Fallback.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary fallback={<Fallback />}>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
