import { useEffect, useState } from 'react';

export const useError = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      throw new Error('GeneratedError');
    }
  }, [error]);
  return {
    setError,
  };
};
