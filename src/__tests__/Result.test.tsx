import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useSearchParams, useNavigate } from 'react-router-dom';
import { describe, test, vi, expect, beforeEach } from 'vitest';
import Results from '../components/results/Results';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

vi.mock('../components/results/ResultsList', () => ({
  default: () => <div>Mocked ResultsList</div>,
}));

vi.mock('../components/flyout/Flyout', () => ({
  default: () => <div>Mocked Flyout</div>,
}));

describe('Results Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders ResultsList and Flyout', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      vi.fn(),
    ]);

    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );

    expect(screen.getByText('Mocked ResultsList')).toBeInTheDocument();
    expect(screen.getByText('Mocked Flyout')).toBeInTheDocument();
  });

  test('renders Close details button when details param is present', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('?details=Hoth'),
      vi.fn(),
    ]);

    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );

    expect(screen.getByText('Close details')).toBeInTheDocument();
  });

  test('navigates to correct URL when Close details button is clicked', () => {
    const navigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigate);

    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('?page=1&search=hoth&details=Hoth'),
      vi.fn(),
    ]);

    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Close details'));
    expect(navigate).toHaveBeenCalledWith('/?page=1');
  });
});
