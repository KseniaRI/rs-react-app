import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, vi, expect } from 'vitest';
import { useSearchParams, useNavigate } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import planetsReducer from '../features/api/planetsSlice';
import { Planet } from '../types';
import Results from '../components/results/Results';

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
  Outlet: () => <div />,
}));

vi.mock('../components/results/ResultsList', () => ({
  default: () => <div>Mocked ResultsList</div>,
}));

vi.mock('../components/flyout/Flyout', () => ({
  default: () => <div>Mocked Flyout</div>,
}));

describe('Results Component', () => {
  test('renders ResultsList and Flyout', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({}),
      vi.fn(),
    ]);

    render(
      <Provider store={store}>
        <Results />
      </Provider>
    );

    expect(screen.getByText('Mocked ResultsList')).toBeInTheDocument();
    expect(screen.getByText('Mocked Flyout')).toBeInTheDocument();
  });

  test('renders Close details button when details param is present', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ details: 'Hoth' }),
      vi.fn(),
    ]);

    render(
      <Provider store={store}>
        <Results />
      </Provider>
    );

    expect(screen.getByText('Close details')).toBeInTheDocument();
  });

  test('navigates to correct URL when Close details button is clicked', () => {
    const navigateMock = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigateMock);

    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ page: '1', search: 'hoth', details: 'Hoth' }),
      vi.fn(),
    ]);
    render(
      <Provider store={store}>
        <Results />
      </Provider>
    );

    fireEvent.click(screen.getByText('Close details'));
    expect(navigateMock).toHaveBeenCalledWith('/?page=1&search=hoth');
  });
});
