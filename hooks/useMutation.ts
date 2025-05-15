/** @format */

import { AUTH_HEADER, BASE_URL } from '@/constants/apiConfig';
import { useCallback, useState } from 'react';

interface MutationResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  mutate: (body: any) => void;
}

export function useMutation<T = any>(
  endpoint: string,
  method: 'POST' | 'PATCH'
): MutationResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback((body: any) => {
    setLoading(true);
    setError(null);

    fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: AUTH_HEADER,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || 'Mutation failed');
        setLoading(false);
      });
  }, []);

  return { data, loading, error, mutate };
}
