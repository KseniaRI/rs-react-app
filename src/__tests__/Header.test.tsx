import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, vi, expect, beforeEach } from 'vitest';
import { ThemeProvider } from '../themeProvider';
import Header from '../components/header/Header';

vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
});

describe('Header Component', () => {
  beforeEach(() => {
    (localStorage.getItem as vi.Mock).mockClear();
    (localStorage.setItem as vi.Mock).mockClear();
  });

  test('renders with default theme from localStorage', () => {
    (localStorage.getItem as vi.Mock).mockReturnValueOnce('false');

    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    expect(screen.getByText('Dark theme')).toBeInTheDocument();
  });

  test('toggles theme and updates localStorage', () => {
    (localStorage.getItem as vi.Mock).mockReturnValueOnce('false');

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
    (localStorage.getItem as vi.Mock).mockReturnValueOnce('true');

    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
    expect(screen.getByText('Light theme')).toBeInTheDocument();
  });
});
