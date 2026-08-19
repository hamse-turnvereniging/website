export type GooglePhoto = {
  id: string;
  baseUrl: string;
  width: number;
  height: number;
  filename: string;
};

export function buildThumbnailUrl(baseUrl: string, size: number): string {
  return `${baseUrl}=w${size}-h${size}-c`;
}

export function buildFullSizeUrl(baseUrl: string, size: number): string {
  return `${baseUrl}=w${size}-h${size}`;
}

export function isCacheStale(cachedAt: number | null, ttlMs: number, now: number): boolean {
  if (cachedAt === null) {
    return true;
  }

  return now - cachedAt > ttlMs;
}
