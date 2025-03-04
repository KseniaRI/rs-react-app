import '@testing-library/jest-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Provider } from 'react-redux';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
  useRouter,
} from 'next/navigation';
import { configureStore } from '@reduxjs/toolkit';
import planetsReducer from '../features/api/planetsSlice';
import { Planet } from '../types';
import ResultsList from '../components/results/ResultsList';

const mockPlanets: Planet[] = [
  {
    name: 'Tatooine',
    terrain: 'desert',
    climate: 'arid',
    diameter: '10',
    orbital_period: '20',
    gravity: '5',
    population: '100000',
  },
  {
    name: 'Hoth',
    terrain: 'ice plains',
    climate: 'frozen',
    diameter: '10',
    orbital_period: '20',
    gravity: '5',
    population: '100000',
  },
  {
    name: 'Endor',
    terrain: 'forests',
    climate: 'temperate',
    diameter: '10',
    orbital_period: '20',
    gravity: '5',
    population: '100000',
  },
];

const store = configureStore({
  reducer: {
    planets: planetsReducer,
  },
  preloadedState: {
    planets: {
      planets: mockPlanets,
      isLoading: false,
      checkedPlanets: [],
      selectedPlanet: null,
      next: null,
      prev: null,
    },
  },
});

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

describe('ResultsList Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    const pushMock = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
    } as unknown as AppRouterInstance);

    vi.mocked(usePathname).mockReturnValue('/');

    vi.mocked(useSearchParams).mockReturnValue({
      toString: () => '',
    } as unknown as ReadonlyURLSearchParams);
  });

  describe('planets are present', () => {
    test('renders the correct number of list items', () => {
      render(
        <Provider store={store}>
          <ResultsList />
        </Provider>
      );

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(mockPlanets.length);
    });
  });

  describe('no planets are present', () => {
    test('displays the "No planets are present" message', () => {
      const emptyStore = configureStore({
        reducer: {
          planets: planetsReducer,
        },
        preloadedState: {
          planets: {
            planets: [],
            isLoading: false,
            checkedPlanets: [],
            selectedPlanet: null,
            next: null,
            prev: null,
          },
        },
      });

      render(
        <Provider store={emptyStore}>
          <ResultsList />
        </Provider>
      );
      expect(screen.getByText('No planets are present')).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    test('shows the loader when isLoading is true', () => {
      const loadingStore = configureStore({
        reducer: {
          planets: planetsReducer,
        },
        preloadedState: {
          planets: {
            planets: [],
            isLoading: true,
            checkedPlanets: [],
            selectedPlanet: null,
            next: null,
            prev: null,
          },
        },
      });

      render(
        <Provider store={loadingStore}>
          <ResultsList />
        </Provider>
      );
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    test('does not show the loader when isLoading is false', () => {
      render(
        <Provider store={store}>
          <ResultsList />
        </Provider>
      );

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });
});
