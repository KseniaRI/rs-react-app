import '@testing-library/jest-dom';
import { describe, test, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
  useRouter,
} from 'next/navigation';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import planetsReducer, {
  setCheckedPlanets,
  setSelectedPlanet,
} from '../features/api/planetsSlice';
import { Planet } from '../types';
import ResultsItem from '../components/results/ResultsItem';

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

const mockDispatch = vi.fn();

vi.mock('react-redux', async () => {
  const actual =
    await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

const mockPlanet: Planet = {
  name: 'Tatooine',
  terrain: 'desert',
  climate: 'arid',
  diameter: '10',
  orbital_period: '20',
  gravity: '5',
  population: '100000',
};

const mockStore = configureStore({
  reducer: {
    planets: planetsReducer,
  },
  preloadedState: {
    planets: {
      planets: [mockPlanet],
      isLoading: false,
      checkedPlanets: [],
      selectedPlanet: null,
      next: null,
      prev: null,
    },
  },
});

describe('ResultsItem Component', () => {
  test('renders the correct item data', () => {
    render(
      <Provider store={mockStore}>
        <ResultsItem planet={mockPlanet} />
      </Provider>
    );

    expect(screen.getByText(mockPlanet.name)).toBeInTheDocument();
  });

  test('clicking an item navigates to details', () => {
    const pushMock = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
    } as unknown as AppRouterInstance);

    vi.mocked(usePathname).mockReturnValue('/');

    vi.mocked(useSearchParams).mockReturnValue({
      toString: () => '',
    } as unknown as ReadonlyURLSearchParams);

    render(
      <Provider store={mockStore}>
        <ResultsItem planet={mockPlanet} />
      </Provider>
    );

    fireEvent.click(screen.getByText(mockPlanet.name));
    expect(pushMock).toHaveBeenCalledWith(`/?details=${mockPlanet.name}`);
    expect(mockDispatch).toHaveBeenCalledWith(setSelectedPlanet(mockPlanet));
  });

  test('clicking an item dispatches setSelectedPlanet', () => {
    render(
      <Provider store={mockStore}>
        <ResultsItem planet={mockPlanet} />
      </Provider>
    );

    fireEvent.click(screen.getByText(mockPlanet.name));
    expect(mockDispatch).toHaveBeenCalledWith(setSelectedPlanet(mockPlanet));
  });

  test('checkbox is not checked when planet is not selected', () => {
    render(
      <Provider store={mockStore}>
        <ResultsItem planet={mockPlanet} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('clicking checkbox selects the planet', () => {
    const newStore = configureStore({
      reducer: {
        planets: planetsReducer,
      },
      preloadedState: {
        planets: {
          planets: [mockPlanet],
          isLoading: false,
          checkedPlanets: [],
          selectedPlanet: null,
          next: null,
          prev: null,
        },
      },
    });

    render(
      <Provider store={newStore}>
        <ResultsItem planet={mockPlanet} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith(setCheckedPlanets([mockPlanet]));
  });

  test('clicking checkbox unselects the planet', () => {
    const newStore = configureStore({
      reducer: {
        planets: planetsReducer,
      },
      preloadedState: {
        planets: {
          planets: [mockPlanet],
          isLoading: false,
          checkedPlanets: [mockPlanet],
          selectedPlanet: null,
          next: null,
          prev: null,
        },
      },
    });

    render(
      <Provider store={newStore}>
        <ResultsItem planet={mockPlanet} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(setCheckedPlanets([]));
  });

  test('clicking checkbox twice unselects the planet', () => {
    const newStore = configureStore({
      reducer: {
        planets: planetsReducer,
      },
      preloadedState: {
        planets: {
          planets: [mockPlanet],
          isLoading: false,
          checkedPlanets: [mockPlanet],
          selectedPlanet: null,
          next: null,
          prev: null,
        },
      },
    });

    render(
      <Provider store={newStore}>
        <ResultsItem planet={mockPlanet} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith(setCheckedPlanets([]));
  });
});
