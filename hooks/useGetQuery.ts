/** @format */

// useGetQuery.ts
import { AUTH_HEADER, BASE_URL } from '@/constants/apiConfig';
import { queryCache } from '@/utils/cache';
import { useEffect, useState, useCallback } from 'react';

interface QueryOptions {
  cache?: 'cache' | 'no-cache';
}

interface QueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGetQuery<T = any>(
  endpoint: string,
  options?: QueryOptions
): QueryResult<T> {
  const useCache = options?.cache !== 'no-cache';

  const [data, setData] = useState<T | null>(() =>
    useCache ? queryCache.get<T>(endpoint) : null
  );
  const [loading, setLoading] = useState<boolean>(!data);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch(`${BASE_URL}${endpoint}`, {
      headers: AUTH_HEADER,
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((json: T) => {
        if (useCache) queryCache.set(endpoint, json);
        setData(json);
        setLoading(false);
      })
      .catch((e: any) => {
        setError(e.message ?? 'Error fetching data');
        setLoading(false);
      });
  }, [endpoint, useCache]);

  useEffect(() => {
    if (!data) fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
