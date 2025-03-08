import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../ThemeProvider';
import { store } from '../app/store';
import { ErrorBoundary } from './errorBoundary/ErrorBoundary';
import Fallback from './errorBoundary/Fallback';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
