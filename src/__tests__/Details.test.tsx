import '@testing-library/jest-dom';
import { describe, test, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useOutletContext } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import planetsReducer from '../features/api/planetsSlice';
import { Planet } from '../types';
import Details from '../components/details/Details';

const mockPlanet: Planet = {
  name: 'Tatooine',
  terrain: 'desert',
  climate: 'arid',
  diameter: '10',
  orbital_period: '20',
  gravity: '5',
  population: '100000',
};

const createMockStore = (selectedPlanet: Planet | null) =>
  configureStore({
    reducer: {
      planets: planetsReducer,
    },
    preloadedState: {
      planets: {
        planets: [],
        isLoading: false,
        checkedPlanets: [],
        selectedPlanet,
        next: null,
        prev: null,
      },
    },
  });

vi.mock('react-router', () => ({
  useOutletContext: vi.fn(),
}));

describe('Details Component', () => {
  beforeEach(() => {
    vi.mocked(useOutletContext).mockReturnValue({ closeDetails: vi.fn() });
  });
  test('displays correct planet details', () => {
    const store = createMockStore(mockPlanet);
    const closeDetails = vi.fn();
    vi.mocked(useOutletContext).mockReturnValue({ closeDetails });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockPlanet.name)).toBeInTheDocument();
    expect(screen.getByText(/Short description:/)).toBeInTheDocument();
    expect(screen.getByText(/diameter:/i)).toBeInTheDocument();
    expect(screen.getByText(mockPlanet.diameter)).toBeInTheDocument();
    expect(screen.getByText(/gravity:/i)).toBeInTheDocument();
    expect(screen.getByText(mockPlanet.gravity)).toBeInTheDocument();
    expect(screen.getByText(/orbital_period:/i)).toBeInTheDocument();
    expect(screen.getByText(mockPlanet.orbital_period)).toBeInTheDocument();
    expect(screen.getByText(/population:/i)).toBeInTheDocument();
    expect(screen.getByText(mockPlanet.population)).toBeInTheDocument();
  });

  test('closes the details component when the close button is clicked', () => {
    const store = createMockStore(mockPlanet);
    const closeDetails = vi.fn();
    vi.mocked(useOutletContext).mockReturnValue({ closeDetails });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Close details/i));
    expect(closeDetails).toHaveBeenCalled();
  });

  test('does not render any content when no planet is selected', () => {
    const store = createMockStore(null);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Short description:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/diameter:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/gravity:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/orbital_period:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/population:/i)).not.toBeInTheDocument();
  });
});
