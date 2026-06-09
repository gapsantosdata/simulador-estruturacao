import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useUrlState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = useCallback((key, fallback) => {
    const v = searchParams.get(key);
    if (v === null || v === undefined) return fallback;
    if (typeof fallback === 'number') {
      const n = Number(v);
      return isNaN(n) ? fallback : n;
    }
    if (typeof fallback === 'boolean') return v === 'true';
    return v;
  }, [searchParams]);

  const set = useCallback((updates) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([k, v]) => {
        if (v === null || v === undefined) next.delete(k);
        else next.set(k, String(v));
      });
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  return { get, set, searchParams };
}
