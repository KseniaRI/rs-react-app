import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';
import { describe, test, vi, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import planetsReducer from '../features/api/planetsSlice';
import Pagination from '../components/pagination/Pagination';

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

const mockStore = (prev: string | null, next: string | null) =>
  configureStore({
    reducer: {
      planets: planetsReducer,
    },
    preloadedState: {
      planets: {
        planets: [],
        isLoading: false,
        checkedPlanets: [],
        selectedPlanet: null,
        next,
        prev,
      },
    },
  });

describe('Pagination Component', () => {
  test('updates page parameter on next button click', () => {
    const changeCurrentPage = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue({
      get: (key: string) => (key === 'page' ? '1' : null),
    } as unknown as ReadonlyURLSearchParams);

    const store = mockStore('prevPage', 'nextPage');

    render(
      <Provider store={store}>
        <Pagination
          loadingNext={false}
          loadingPrev={false}
          changeCurrentPage={changeCurrentPage}
        />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Next/i));
    expect(changeCurrentPage).toHaveBeenCalledWith(2);
  });

  test('updates page parameter on back button click', () => {
    const changeCurrentPage = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue({
      get: (key: string) => (key === 'page' ? '2' : null),
    } as unknown as ReadonlyURLSearchParams);
    const store = mockStore('prevPage', 'nextPage');

    render(
      <Provider store={store}>
        <Pagination
          loadingNext={false}
          loadingPrev={false}
          changeCurrentPage={changeCurrentPage}
        />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Back/i));
    expect(changeCurrentPage).toHaveBeenCalledWith(1);
  });

  test('disables back button on first page', () => {
    const changeCurrentPage = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue({
      get: (key: string) => (key === 'page' ? '1' : null),
    } as unknown as ReadonlyURLSearchParams);
    const store = mockStore(null, 'nextPage');

    render(
      <Provider store={store}>
        <Pagination
          loadingNext={false}
          loadingPrev={false}
          changeCurrentPage={changeCurrentPage}
        />
      </Provider>
    );

    expect(screen.getByText(/Back/i)).toBeDisabled();
  });

  test('disables next button if no next page', () => {
    const changeCurrentPage = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue({
      get: (key: string) => (key === 'page' ? '2' : null),
    } as unknown as ReadonlyURLSearchParams);

    const store = mockStore('prevPage', null);

    render(
      <Provider store={store}>
        <Pagination
          loadingNext={false}
          loadingPrev={false}
          changeCurrentPage={changeCurrentPage}
        />
      </Provider>
    );

    expect(screen.getByText(/Next/i)).toBeDisabled();
  });
});
