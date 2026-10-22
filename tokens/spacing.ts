/**
 * Spacing scale. The Figma file has no dedicated "spacing" swatch frame,
 * but every padding/gap measured across its components (button py-10/px-24,
 * badge px-12/py-2, input gap-8/p-11, card p-16/gap-16, icon gap-6 …) lands
 * exactly on Tailwind's default 4px-based scale (which already includes the
 * 2px/6px/10px half-steps). So rather than invent a parallel scale, this
 * file documents that same scale as explicit tokens for Storybook / non-
 * Tailwind consumers, and tailwind.config.js is left on the default scale.
 */
export const spacing = {
  0: "0px",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  2.5: "10px", // button vertical padding
  3: "12px", // badge horizontal padding
  4: "16px", // card padding
  5: "20px",
  6: "24px", // button horizontal padding
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
} as const;

export type SpacingTokens = typeof spacing;
