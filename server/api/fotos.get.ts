import type { GooglePhoto } from "#shared/utils/google-photos";
import { isCacheStale } from "#shared/utils/google-photos";

const CACHE_TTL_MS = 5 * 60 * 1000;
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_MEDIA_ITEMS_SEARCH_URL = "https://photoslibrary.googleapis.com/v1/mediaItems:search";

type Cache = {
  cachedAt: number | null;
  photos: GooglePhoto[];
};

const cache: Cache = {
  cachedAt: null,
  photos: [],
};

type GoogleTokenResponse = {
  access_token: string;
};

type GoogleMediaItem = {
  id: string;
  baseUrl: string;
  filename: string;
  mediaMetadata: {
    width: string;
    height: string;
  };
};

type GoogleMediaItemsSearchResponse = {
  mediaItems?: GoogleMediaItem[];
  nextPageToken?: string;
};

async function getAccessToken(): Promise<string> {
  const response = await $fetch<GoogleTokenResponse>(GOOGLE_TOKEN_URL, {
    method: "POST",
    body: {
      client_id: process.env.GOOGLE_PHOTOS_CLIENT_ID,
      client_secret: process.env.GOOGLE_PHOTOS_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_PHOTOS_REFRESH_TOKEN,
      grant_type: "refresh_token",
    },
  });

  return response.access_token;
}

async function fetchAllPhotos(): Promise<GooglePhoto[]> {
  const accessToken = await getAccessToken();
  const albumId = process.env.GOOGLE_PHOTOS_ALBUM_ID;

  const photos: GooglePhoto[] = [];
  let pageToken: string | undefined;

  do {
    const response = await $fetch<GoogleMediaItemsSearchResponse>(GOOGLE_MEDIA_ITEMS_SEARCH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        albumId,
        pageSize: 100,
        pageToken,
      },
    });

    for (const item of response.mediaItems ?? []) {
      photos.push({
        id: item.id,
        baseUrl: item.baseUrl,
        filename: item.filename,
        width: Number(item.mediaMetadata.width),
        height: Number(item.mediaMetadata.height),
      });
    }

    pageToken = response.nextPageToken;
  } while (pageToken);

  return photos;
}

export default defineEventHandler(async () => {
  const hasConfig =
    process.env.GOOGLE_PHOTOS_CLIENT_ID &&
    process.env.GOOGLE_PHOTOS_CLIENT_SECRET &&
    process.env.GOOGLE_PHOTOS_REFRESH_TOKEN &&
    process.env.GOOGLE_PHOTOS_ALBUM_ID;

  if (!hasConfig) {
    return { photos: [], error: true };
  }

  if (isCacheStale(cache.cachedAt, CACHE_TTL_MS, Date.now())) {
    try {
      cache.photos = await fetchAllPhotos();
      cache.cachedAt = Date.now();
    } catch (error) {
      console.error(error);
      return { photos: [], error: true };
    }
  }

  return { photos: cache.photos, error: false };
});
