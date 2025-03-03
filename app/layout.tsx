import React, { ReactNode, Suspense } from 'react';
import { Providers } from '../src/components/Providers';
import PlanetsContent from '../src/components/PlanetsContent';
import Header from '../src/components/header/Header';
import Loader from '../src/components/loader/Loader';
import '../styles/global.css';

function PlanetsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>SW Planets</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <Providers>
        <body>
          <Suspense fallback={<Loader />}>
            <Header />
            <PlanetsContent>
              <main>{children}</main>
            </PlanetsContent>
          </Suspense>
        </body>
      </Providers>
    </html>
  );
}

export default PlanetsLayout;
