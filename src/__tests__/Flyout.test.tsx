import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, test, vi, expect } from 'vitest';
import planetsReducer from '../features/api/planetsSlice';
import { downloadCSV } from '../utils/downloadCSV';
import { Planet } from '../types';
import Flyout from '../components/flyout/Flyout';

vi.mock('../utils/downloadCSV', () => ({
  downloadCSV: vi.fn(),
}));

const mockPlanets = [
  {
    name: 'Tatooine',
    terrain: 'desert',
    climate: 'arid',
    population: '200000',
    diameter: '10465',
    gravity: '1 standard',
    orbital_period: '304',
  },
  {
    name: 'Alderaan',
    terrain: 'grasslands, mountains',
    climate: 'temperate',
    population: '2000000000',
    diameter: '12500',
    gravity: '1 standard',
    orbital_period: '364',
  },
];

const createMockStore = (checkedPlanets: Planet[]) =>
  configureStore({
    reducer: {
      planets: planetsReducer,
    },
    preloadedState: {
      planets: {
        planets: [],
        isLoading: false,
        checkedPlanets: checkedPlanets,
        selectedPlanet: null,
        next: null,
        prev: null,
      },
    },
  });

describe('Flyout Component', () => {
  test('does not render when no planets are selected', () => {
    const store = createMockStore([]);
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText(/items were selected/i)).not.toBeInTheDocument();
  });

  test('displays the correct number of selected planets', () => {
    const store = createMockStore(mockPlanets);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText(/2 items were selected/i)).toBeInTheDocument();
  });

  test('clears selected planets when clicking "Unselect"', () => {
    const store = createMockStore(mockPlanets);
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Unselect/i));
    expect(store.getState().planets.checkedPlanets).toEqual([]);
  });

  test('calls downloadCSV with selected planets when clicking "Download"', () => {
    const store = createMockStore(mockPlanets);
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Download/i));
    expect(downloadCSV).toHaveBeenCalledWith(mockPlanets);
  });
});
