import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, vi, expect } from 'vitest';
import { NextRouter, useRouter } from 'next/router';
import { configureStore } from '@reduxjs/toolkit';
import planetsReducer from '../features/api/planetsSlice';
import { Planet } from '../types';
import Results from '../components/results/Results';
import { Provider } from 'react-redux';

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

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../components/results/ResultsList', () => ({
  default: () => <div>Mocked ResultsList</div>,
}));

vi.mock('../components/flyout/Flyout', () => ({
  default: () => <div>Mocked Flyout</div>,
}));

describe('Results Component', () => {
  test('renders ResultsList and Flyout', () => {
    vi.mocked(useRouter).mockReturnValue({
      query: {},
      pathname: '/',
    } as unknown as NextRouter);

    render(
      <Provider store={store}>
        <Results />
      </Provider>
    );

    expect(screen.getByText('Mocked ResultsList')).toBeInTheDocument();
    expect(screen.getByText('Mocked Flyout')).toBeInTheDocument();
  });

  test('renders Close details button when details param is present', () => {
    vi.mocked(useRouter).mockReturnValue({
      query: { details: 'Hoth' },
      pathname: '/',
    } as unknown as NextRouter);

    render(
      <Provider store={store}>
        <Results />
      </Provider>
    );

    expect(screen.getByText('Close details')).toBeInTheDocument();
  });

  test('navigates to correct URL when Close details button is clicked', () => {
    const pushMock = vi.fn();

    vi.mocked(useRouter).mockReturnValue({
      query: { page: '1', search: 'hoth', details: 'Hoth' },
      pathname: '/',
      push: pushMock,
    } as unknown as NextRouter);

    render(
      <Provider store={store}>
        <Results />
      </Provider>
    );

    fireEvent.click(screen.getByText('Close details'));
    expect(pushMock).toHaveBeenCalledWith(
      { pathname: '/', query: { page: '1', search: 'hoth' } },
      undefined,
      { shallow: true }
    );
  });
});
