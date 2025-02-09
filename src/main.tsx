import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import Fallback from './components/Fallback.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <ErrorBoundary fallback={<Fallback />}>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
