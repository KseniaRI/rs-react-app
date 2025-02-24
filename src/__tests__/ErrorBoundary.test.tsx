import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, vi, expect } from 'vitest';
import { ErrorInfo } from 'react';
import Fallback from '../components/errorBoundary/Fallback';
import { ErrorBoundary } from '../components/errorBoundary/ErrorBoundary';

describe('ErrorBoundary', () => {
  test('renders children correctly when there is no error', () => {
    render(
      <ErrorBoundary fallback={<Fallback />}>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('displays fallback UI when there is an error in a child component', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary fallback={<Fallback />}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('ErrorBoundary message: Something went wrong')
    ).toBeInTheDocument();
  });

  test('calls componentDidCatch when an error is thrown', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    const componentDidCatchSpy = vi.fn();

    const ErrorBoundaryWithSpy = class extends ErrorBoundary {
      componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        componentDidCatchSpy(error, errorInfo);
      }
    };

    render(
      <ErrorBoundaryWithSpy fallback={<Fallback />}>
        <ThrowError />
      </ErrorBoundaryWithSpy>
    );

    expect(componentDidCatchSpy).toHaveBeenCalledWith(
      expect.any(Error),
      expect.any(Object)
    );

    expect(
      screen.getByText('ErrorBoundary message: Something went wrong')
    ).toBeInTheDocument();
  });
});
