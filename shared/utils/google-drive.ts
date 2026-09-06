export type GooglePhoto = {
  id: string;
  name: string;
  thumbnailLink: string;
};

export function isCacheStale(cachedAt: number | null, ttlMs: number, now: number): boolean {
  if (cachedAt === null) {
    return true;
  }

  return now - cachedAt > ttlMs;
}

export function buildSizedThumbnailUrl(thumbnailLink: string, size: number): string {
  return thumbnailLink.replace(/=s\d+$/, `=s${size}`);
}
