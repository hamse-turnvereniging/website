import assert from "node:assert/strict";
import test from "node:test";

import { buildSizedThumbnailUrl, isCacheStale } from "./google-drive.ts";

test("isCacheStale is stale when nothing has been cached yet", () => {
  assert.equal(isCacheStale(null, 5 * 60 * 1000, Date.now()), true);
});

test("isCacheStale is not stale within the TTL window", () => {
  const now = 1_000_000;
  const cachedAt = now - 60_000;

  assert.equal(isCacheStale(cachedAt, 5 * 60 * 1000, now), false);
});

test("isCacheStale is stale once the TTL window has passed", () => {
  const now = 1_000_000;
  const cachedAt = now - 6 * 60 * 1000;

  assert.equal(isCacheStale(cachedAt, 5 * 60 * 1000, now), true);
});

test("buildSizedThumbnailUrl replaces Drive's default =sN size suffix with the requested size", () => {
  const url = buildSizedThumbnailUrl(
    "https://lh3.googleusercontent.com/drive-storage/abc123=s220",
    1600
  );

  assert.equal(url, "https://lh3.googleusercontent.com/drive-storage/abc123=s1600");
});
