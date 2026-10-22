/**
 * Breakpoints. The Figma file is a desktop-only (1440px) admin-dashboard
 * spec with no responsive frames, so there's nothing to read values from
 * here — this is Tailwind's own default breakpoint scale, used as-is.
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export type BreakpointTokens = typeof breakpoints;
