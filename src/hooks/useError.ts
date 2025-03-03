'use client';
import { useState } from 'react';

export const useError = () => {
  const [error, setError] = useState<Error | null>(null);
  return {
    error,
    setCustomError: () => setError(new Error('Custom error generated!')),
  };
};
