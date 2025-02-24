import '@testing-library/jest-dom';
import { describe, test, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/button/Button';

vi.mock('../components/loader/Loader', () => {
  return {
    __esModule: true,
    default: () => <div>Loader</div>,
  };
});

describe('Button Component', () => {
  test('renders children correctly', () => {
    render(<Button type="button">Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('shows loader when loading is true', () => {
    render(
      <Button type="button" loading={true}>
        Click me
      </Button>
    );

    expect(screen.getByText('Loader')).toBeInTheDocument();
  });

  test('does not show loader when loading is false', () => {
    render(
      <Button type="button" loading={false}>
        Click me
      </Button>
    );

    expect(screen.queryByText('Loader')).not.toBeInTheDocument();
  });

  test('button is disabled when disabled is true', () => {
    render(
      <Button type="button" disabled={true}>
        Click me
      </Button>
    );

    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
  });

  test('button is clickable when disabled is false', () => {
    render(
      <Button type="button" disabled={false}>
        Click me
      </Button>
    );

    const button = screen.getByText('Click me');
    expect(button).not.toBeDisabled();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();

    render(
      <Button type="button" onClick={handleClick}>
        Click me
      </Button>
    );

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  test('does not call onClick handler when button is disabled', () => {
    const handleClick = vi.fn();

    render(
      <Button type="button" onClick={handleClick} disabled={true}>
        Click me
      </Button>
    );

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
