import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import Fallback from './components/errorBoundary/Fallback.tsx';
import { ErrorBoundary } from './components/errorBoundary/ErrorBoundary.tsx';
import { ThemeProvider } from './themeProvider.tsx';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary fallback={<Fallback />}>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
