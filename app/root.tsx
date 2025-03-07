import { ReactNode } from 'react';
import { Links, Meta, Scripts, ScrollRestoration, Outlet } from 'react-router';
import { Route } from './+types/root';
import { Providers } from '../src/components/Providers';
import PlanetsContent from '../src/components/PlanetsContent';
import Header from '../src/components/header/Header';
import stylesheet from './app.css?url';

export const links: Route.LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesheet, as: 'style' }];
};

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>SW Planets</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>

      <body>
        <Providers>
          <Header />
          <PlanetsContent>
            <main>
              {children}
              <Scripts />
              <ScrollRestoration />
            </main>
          </PlanetsContent>
        </Providers>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
