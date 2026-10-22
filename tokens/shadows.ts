/**
 * Shadow tokens — exact effect values from Figma.
 */
export const shadows = {
  // "Shadow 1" — resting elevation on inputs and plain cards.
  xs: "0px 1px 2px -1px rgba(0, 0, 0, 0.1)",
  // "Green Elevation 2" — brand-tinted elevation used on emphasized KPI cards.
  // Figma's effect is tinted with the literal #3F9B0B (rgb(63,155,11));
  // recolored to rgb(50,121,7) — #327907 — to follow the same system-wide
  // green replacement as everything else, rather than leaving a shadow
  // tinted with a green that no longer exists anywhere else in the system.
  brand: "0px 2px 6px 2px rgba(50, 121, 7, 0.15), 0px 1px 2px 0px rgba(50, 121, 7, 0.3)",
} as const;

export type ShadowTokens = typeof shadows;
