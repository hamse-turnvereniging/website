export type GooglePhoto = {
  id: string;
  name: string;
  width?: number;
  height?: number;
};

export function isCacheStale(cachedAt: number | null, ttlMs: number, now: number): boolean {
  if (cachedAt === null) {
    return true;
  }

  return now - cachedAt > ttlMs;
}
