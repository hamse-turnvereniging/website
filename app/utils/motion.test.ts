import assert from "node:assert/strict";
import test from "node:test";
import { motionTokens, staggerDelay } from "./motion.ts";

test("staggers children by a fixed step", () => {
  assert.equal(staggerDelay(0), 0);
  assert.equal(staggerDelay(2), 0.16);
});

test("caps the stagger so late children do not lag", () => {
  assert.equal(staggerDelay(5), 0.4);
  assert.equal(staggerDelay(40), 0.4);
});

test("keeps tokens inside the subtle range", () => {
  assert.ok(motionTokens.duration >= 0.4 && motionTokens.duration <= 1);
  assert.equal(motionTokens.offset, 16);
  assert.equal(motionTokens.viewport.once, true);
});
