/**
 * Typography tokens — exact scale from the "Typography & color" frame
 * (node 53:23). Figma specifies the font as "SF Pro" with variable-axis
 * weights (400 / 510 / 590). SF Pro isn't a licensed web font, so weights
 * are mapped to the nearest standard CSS weights (400 / 500 / 600) and the
 * family falls back through the native system-UI stack so every platform
 * renders its own equivalent system font — this is the only non-literal
 * adaptation in this file; every size/line-height/letter-spacing value
 * below is copied exactly from Figma.
 */

export const fontFamily = {
  sans: [
    "-apple-system",
    "BlinkMacSystemFont",
    "SF Pro Text",
    "SF Pro Display",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ].join(", "),
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500, // Figma "Medium" (510)
  semibold: 600, // Figma "Semibold" (590)
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
