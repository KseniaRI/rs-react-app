import React, { StrictMode } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import { ThemeProvider } from '../src/ThemeProvider';
import Fallback from '../src/components/errorBoundary/Fallback';
import { ErrorBoundary } from '../src/components/errorBoundary/ErrorBoundary';
import Layout from '../src/components/Layout';
import '../styles/global.css';

function PlanetsApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Provider store={store}>
        <ErrorBoundary fallback={<Fallback />}>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ErrorBoundary>
      </Provider>
    </StrictMode>
  );
}

export default PlanetsApp;
