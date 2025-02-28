import { useState } from 'react';

export const useError = () => {
  const [error, setError] = useState(false);
  return {
    error,
    setError,
  };
};
