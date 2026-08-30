const GOOGLE_DRIVE_FILES_URL = "https://www.googleapis.com/drive/v3/files";

export default defineEventHandler(async (event) => {
  const fileId = getRouterParam(event, "fileId");

  if (!fileId) {
    throw createError({ statusCode: 400, statusMessage: "Ontbrekende fileId" });
  }

  const { photos } = await getPhotos();

  if (!photos.some((photo) => photo.id === fileId)) {
    throw createError({ statusCode: 404, statusMessage: "Foto niet gevonden" });
  }

  try {
    const response = await $fetch.raw(`${GOOGLE_DRIVE_FILES_URL}/${fileId}`, {
      query: {
        alt: "media",
        key: process.env.GOOGLE_DRIVE_API_KEY,
      },
      responseType: "arrayBuffer",
    });

    setHeader(event, "Content-Type", response.headers.get("content-type") ?? "application/octet-stream");
    setHeader(event, "Cache-Control", "public, max-age=3600");

    return response._data;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 502, statusMessage: "Kon foto niet ophalen bij Google Drive" });
  }
});
