import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, vi, expect, beforeEach } from 'vitest';
import Header from '../components/header/Header';
import { ThemeProvider } from '../themeProvider';

vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
});

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders with default theme from localStorage', () => {
    vi.mocked(localStorage.getItem).mockReturnValueOnce('false');

    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    expect(screen.getByText('Dark theme')).toBeInTheDocument();
  });

  test('toggles theme and updates localStorage', () => {
    vi.mocked(localStorage.getItem).mockReturnValueOnce('false');

    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Dark theme'));
    expect(screen.getByText('Light theme')).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith('darkTheme', 'true');
  });

  test('loads the correct theme from localStorage', () => {
    vi.mocked(localStorage.getItem).mockReturnValueOnce('true');

    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
    expect(screen.getByText('Light theme')).toBeInTheDocument();
  });
});
