/**
 * Typography tokens — size/line-height/letter-spacing scale from the
 * "Typography & color" frame (node 53:23).
 *
 * The font is **Inter** (self-hosted via @fontsource-variable/inter, so no
 * CDN dependency and identical rendering on every platform), by explicit
 * request — Figma's file was drawn in SF Pro. The scale below is still
 * Figma's exact numbers, which were tuned for SF Pro: Inter is slightly
 * wider, so the negative letter-spacing values (-0.43px etc.) may want a
 * second look once Figma is updated to Inter too.
 */

export const fontFamily = {
  sans: [
    "Inter Variable",
    "Inter",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ].join(", "),
} as const;

// Inter ships real 400/500/600 weights, so the old SF Pro 510/590 → 500/600
// rounding is no longer an approximation, just a straight mapping.
export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
} as const;

/**
 * Named type scale. Each entry: fontSize (px), lineHeight (px),
 * letterSpacing (px), and which weights the design file defines for it.
 */
export const textStyles = {
  title: { fontSize: 20, lineHeight: 25, letterSpacing: -0.45, weights: ["regular", "semibold"] },
  headline: { fontSize: 17, lineHeight: 22, letterSpacing: -0.43, weights: ["semibold"], italic: true },
  body: { fontSize: 14, lineHeight: 22, letterSpacing: -0.43, weights: ["regular", "semibold"], italic: true },
  subheadline: { fontSize: 15, lineHeight: 22, letterSpacing: -0.23, weights: ["regular", "semibold"] },
  caption1: { fontSize: 12, lineHeight: 16, letterSpacing: 0, weights: ["medium"] },
  caption2: { fontSize: 11, lineHeight: 13, letterSpacing: 0.06, weights: ["semibold"] },
  caption3: { fontSize: 11, lineHeight: 13, letterSpacing: 0.03, weights: ["regular"] },
  cta: { fontSize: 16, lineHeight: 22, letterSpacing: -0.43, weights: ["medium"] },
} as const;

export const typography = { fontFamily, fontWeight, textStyles } as const;

export type TypographyTokens = typeof typography;
