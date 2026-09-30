import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to standardise API call lifecycles, error handling, loading states, and retries.
 * @param {Function} apiFunc - Async function returning data
 * @param {Array} deps - Dependency array for re-fetching
 * @param {boolean} immediate - Whether to trigger request immediately on mount
 */
export const useApi = (apiFunc, deps = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc(...args);
      setData(result);
      setLoading(false);
      return result;
    } catch (err) {
      const msg = err.userMessage || err.message || 'Failed to fetch data from backend.';
      setError(msg);
      setLoading(false);
      return null;
    }
  }, [apiFunc]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [...deps, immediate]);

  return {
    data,
    loading,
    error,
    execute,
    setData,
    retry: execute
  };
};
