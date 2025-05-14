/** @format */

// useGetQuery.ts
import { AUTH_HEADER, BASE_URL } from '@/constants/apiConfig';
import { queryCache } from '@/utils/cache';
import { useEffect, useState, useCallback } from 'react';

interface QueryOptions {
  cache?: 'cache' | 'no-cache';
  params?: Record<string, string | number | boolean>;
}

interface QueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const buildUrl = (endpoint: string, params?: Record<string, any>) => {
  const url = new URL(endpoint, BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, String(value))
    );
  }
  return url.toString();
};

const generateCacheKey = (endpoint: string, params?: Record<string, any>) => {
  const key = buildUrl(endpoint, params);
  return key;
};

export function useGetQuery<T = any>(
  endpoint: string,
  options?: QueryOptions
): QueryResult<T> {
  const url = buildUrl(endpoint, options?.params);
  const cacheKey = generateCacheKey(endpoint, options?.params);
  const useCache = options?.cache !== 'no-cache';

  const [data, setData] = useState<T | null>(() =>
    useCache ? queryCache.get<T>(cacheKey) : null
  );
  const [loading, setLoading] = useState<boolean>(!data);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch(url, {
      headers: AUTH_HEADER,
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((json: T) => {
        if (useCache) queryCache.set(cacheKey, json);
        setData(json);
        setLoading(false);
      })
      .catch((e: any) => {
        setError(e.message ?? 'Error fetching data');
        setLoading(false);
      });
  }, [url, useCache]);

  useEffect(() => {
    if (!data) fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
