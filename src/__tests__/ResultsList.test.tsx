import '@testing-library/jest-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router';
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

vi.mock('react-router', () => ({
  useSearchParams: vi.fn(),
  useNavigate: vi.fn(),
  useOutletContext: vi.fn(),
}));

describe('ResultsList Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      vi.fn(),
    ]);

    vi.mocked(useNavigate).mockReturnValue(vi.fn());
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
      vi.mock('react-router', () => ({
        useSearchParams: vi
          .fn()
          .mockReturnValue([new URLSearchParams(), vi.fn()]),
        useNavigate: vi.fn(),
      }));
      render(
        <Provider store={store}>
          <ResultsList />
        </Provider>
      );

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });
});
