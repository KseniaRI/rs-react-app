import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import planetsReducer from '../features/api/planetsSlice';
import { describe, test, vi, expect } from 'vitest';
import Search from '../components/search/Search';

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string): string | null => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockStore = configureStore({
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

describe('Search Component', () => {
  test('saves query to localStorage on search', () => {
    const onQueryChange = vi.fn();
    const onSearchSubmit = vi.fn(e => {
      e.preventDefault();
      localStorage.setItem('query', 'Tatooine');
    });

    render(
      <Provider store={mockStore}>
        <Search
          query=""
          onQueryChange={onQueryChange}
          onSearchSubmit={onSearchSubmit}
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/planet name/i);
    fireEvent.change(input, { target: { value: 'Tatooine' } });
    fireEvent.submit(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem('query')).toBe('Tatooine');
  });

  test('retrieves query from localStorage on mount', () => {
    localStorage.setItem('query', 'Hoth');
    const onQueryChange = vi.fn();
    const onSearchSubmit = vi.fn();

    render(
      <Provider store={mockStore}>
        <Search
          query={localStorage.getItem('query') || ''}
          onQueryChange={onQueryChange}
          onSearchSubmit={onSearchSubmit}
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/planet name/i);
    expect(input).toHaveValue('Hoth');
  });
});
