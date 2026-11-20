import assert from "node:assert/strict";
import { test } from "node:test";

import { circleTokens, randomCircleStyle } from "./backgroundCircles.ts";

function circles(style: Record<string, string>) {
  return Array.from({ length: circleTokens.count }, (_, i) => ({
    r: Number(style[`--c${i + 1}-r`]),
    x: Number(style[`--c${i + 1}-x`]),
    y: Number(style[`--c${i + 1}-y`]),
  }));
}

test("circles never overlap and stay inside the repeating tile", () => {
  for (const random of [() => 0, () => 0.999999, Math.random, Math.random, Math.random]) {
    const style = randomCircleStyle(random);
    const list = circles(style);
    let previousBottom = 0;

    for (const circle of list) {
      assert.ok(circle.y - circle.r > previousBottom);
      previousBottom = circle.y + circle.r;
    }

    assert.ok(previousBottom < Number(style["--circles-tile"]));
  }
});

test("sizes and edge offsets stay within the configured ranges", () => {
  for (const circle of circles(randomCircleStyle())) {
    assert.ok(circle.r >= circleTokens.radius[0] && circle.r <= circleTokens.radius[1]);
    assert.ok(circle.x >= circleTokens.edgeOffset[0] && circle.x <= circleTokens.edgeOffset[1]);
  }
});

test("different random input gives a different layout", () => {
  assert.notDeepEqual(randomCircleStyle(() => 0.2), randomCircleStyle(() => 0.8));
});
