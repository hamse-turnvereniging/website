// Random layout for the decorative background circles on <main> (drawn in assets/css/main.css).
// All values are design pixels; the CSS scales them down on small screens.
export const circleTokens = {
  count: 4,
  radius: [380, 560],
  // Vertical space between two circles. Always positive, so circles can never overlap.
  gap: [40, 260],
  // How far the centre sits outside the screen edge (negative = inside).
  edgeOffset: [-80, 160],
} as const;

function between([min, max]: readonly [number, number], random: () => number): number {
  return Math.round(min + random() * (max - min));
}

// Returns the CSS custom properties read by the `main` background: --c{n}-r, --c{n}-x, --c{n}-y
// per circle and --circles-tile for the height after which the pattern repeats.
export function randomCircleStyle(random: () => number = Math.random): Record<string, string> {
  const style: Record<string, string> = {};
  let cursor = 0;

  for (let n = 1; n <= circleTokens.count; n++) {
    const radius = between(circleTokens.radius, random);
    const centerY = cursor + between(circleTokens.gap, random) + radius;

    style[`--c${n}-r`] = String(radius);
    style[`--c${n}-x`] = String(between(circleTokens.edgeOffset, random));
    style[`--c${n}-y`] = String(centerY);

    cursor = centerY + radius;
  }

  // Half a minimum gap at the bottom keeps the last circle clear of the tile edge.
  style["--circles-tile"] = String(cursor + circleTokens.gap[0] / 2);

  return style;
}
