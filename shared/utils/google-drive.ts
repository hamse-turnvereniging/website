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

const PHOTO_NAME_PATTERN = /^(\d{4}-\d{2}-\d{2}) - (.+?)(?:\.[^.]+)?$/;

/**
 * Parses "2026-05-16 - Turnfeest 2026 - 001.jpg" into its date, a display
 * name without the date prefix or file extension ("Turnfeest 2026 - 001"),
 * and the trailing sequence number used to order photos within a date.
 */
export function parsePhotoName(name: string): {
  date: string | null;
  displayName: string;
  sequence: number | null;
} {
  const match = name.match(PHOTO_NAME_PATTERN);

  if (!match) {
    return { date: null, displayName: name, sequence: null };
  }

  const [, date, displayName] = match;
  const sequenceMatch = displayName.match(/(\d+)$/);

  return {
    date,
    displayName,
    sequence: sequenceMatch ? Number.parseInt(sequenceMatch[1], 10) : null,
  };
}

export function comparePhotosByDateDescThenSequenceAsc(a: GooglePhoto, b: GooglePhoto): number {
  const photoA = parsePhotoName(a.name);
  const photoB = parsePhotoName(b.name);

  if (photoA.date !== photoB.date) {
    return (photoB.date ?? "").localeCompare(photoA.date ?? "");
  }

  return (photoA.sequence ?? 0) - (photoB.sequence ?? 0);
}
