/**
 * Border radius scale. `sm` (8px) is not literally present in the Figma
 * file — added following the file's 4px-step pattern for anything between
 * "none" and the input's 12px. Every other step is an exact measured value:
 * `xs` from the Checkbox component, `md`/`lg` from Input Fields/Cards.
 * "full" replaces Figma's literal 22px/20px/100px pill values with 9999px
 * so the pill shape holds at any element height, not just the specific
 * sizes Figma measured.
 */
export const radii = {
  none: "0px",
  xs: "4px", // checkbox
  sm: "8px", // derived — see note above
  md: "12px", // input fields, KPI card icon chip
  lg: "16px", // cards
  full: "9999px", // buttons, badges, avatars (pill / circle)
} as const;

export type RadiiTokens = typeof radii;
