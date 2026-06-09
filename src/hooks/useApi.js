import { useState, useCallback } from 'react';

export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(...args);

        if (result.error) {
          setError(result.error);
          return { data: null, error: result.error };
        }

        setData(result.data);
        return { data: result.data, error: null };
      } catch (err) {
        setError(err);
        return { data: null, error: err };
      } finally {
        setLoading(false);
      }
    },
    [apiFunction],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, error, loading, execute, reset };
};
