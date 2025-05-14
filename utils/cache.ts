/** @format */

// cache.ts (new file)

type CacheEntry = {
  timestamp: number;
  data: any;
};

const cache: Record<string, CacheEntry> = {};

const CACHE_TTL_MS = 5 * 60 * 10000; // 10 minutes

export const queryCache = {
  get<T>(key: string): T | null {
    const entry = cache[key];
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > CACHE_TTL_MS;
    if (isExpired) {
      delete cache[key];
      return null;
    }

    return entry.data as T;
  },

  set<T>(key: string, data: T) {
    cache[key] = {
      data,
      timestamp: Date.now(),
    };
  },

  invalidate(key: string) {
    delete cache[key];
  },

  clearAll() {
    Object.keys(cache).forEach((k) => delete cache[k]);
  },
};
