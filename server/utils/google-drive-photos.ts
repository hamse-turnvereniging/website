import type { GooglePhoto } from "#shared/utils/google-drive";
import { isCacheStale } from "#shared/utils/google-drive";

const CACHE_TTL_MS = 5 * 60 * 1000;
const GOOGLE_DRIVE_FILES_URL = "https://www.googleapis.com/drive/v3/files";

type Cache = {
  cachedAt: number | null;
  photos: GooglePhoto[];
};

const cache: Cache = {
  cachedAt: null,
  photos: [],
};

type DriveFile = {
  id: string;
  name: string;
  imageMediaMetadata?: {
    width?: number;
    height?: number;
  };
};

type DriveFilesListResponse = {
  files?: DriveFile[];
  nextPageToken?: string;
};

async function fetchAllPhotos(): Promise<GooglePhoto[]> {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

  const photos: GooglePhoto[] = [];
  let pageToken: string | undefined;

  do {
    const response = await $fetch<DriveFilesListResponse>(GOOGLE_DRIVE_FILES_URL, {
      query: {
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: "files(id,name,imageMediaMetadata(width,height)),nextPageToken",
        orderBy: "name",
        pageSize: 1000,
        pageToken,
      },
      headers: {
        "X-goog-api-key": apiKey!,
      },
    });

    for (const file of response.files ?? []) {
      photos.push({
        id: file.id,
        name: file.name,
        width: file.imageMediaMetadata?.width,
        height: file.imageMediaMetadata?.height,
      });
    }

    pageToken = response.nextPageToken;
  } while (pageToken);

  return photos;
}

export async function getPhotos(): Promise<{ photos: GooglePhoto[]; error: boolean }> {
  const hasConfig = process.env.GOOGLE_DRIVE_API_KEY && process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!hasConfig) {
    return { photos: [], error: true };
  }

  if (isCacheStale(cache.cachedAt, CACHE_TTL_MS, Date.now())) {
    try {
      cache.photos = await fetchAllPhotos();
      cache.cachedAt = Date.now();
    } catch (error) {
      console.error(error);
      return { photos: cache.photos, error: cache.photos.length === 0 };
    }
  }

  return { photos: cache.photos, error: false };
}
