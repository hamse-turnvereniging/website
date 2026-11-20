// Single source of truth for every animation on the site.
// Tune the feel here; components and pages never hardcode these values.
export const motionTokens = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
  offset: 16,
  // Content that is visible on page load waits this long, so the banner title leads.
  loadDelay: 0.2,
  stagger: 0.08,
  maxStaggerSteps: 5,
  viewport: { once: true, margin: "0px 0px -10% 0px" },
} as const;

// Capped so the last card in a long grid doesn't wait noticeably longer than the first.
export function staggerDelay(index: number): number {
  const steps = Math.min(Math.max(index, 0), motionTokens.maxStaggerSteps);
  return Math.round(steps * motionTokens.stagger * 100) / 100;
}
