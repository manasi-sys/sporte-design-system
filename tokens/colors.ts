/**
 * Color tokens — pulled directly from the "Typography & color" and "Status"
 * frames of the SportE Admin Dashboard Figma file (node 50:2).
 * Semantic mapping (success/error/warning/info) is confirmed by the Status
 * badge component in Figma, not invented — High=error, Medium=warning,
 * Low=success, Info=info use exactly these solid/tint pairs.
 */

export const neutral = {
  white: "#FFFFFF",
  background: "#F8F9FA", // page background
  grey100: "#F3F4F6", // "Grey 4"
  grey300: "#99A1AF", // "Inactive"
  /**
   * "Grey 3" in Figma, used there for small caption/meta text (timestamps,
   * location labels, etc.) — but grey400-on-white only measures 2.53:1,
   * failing WCAG AA (needs 4.5:1). Confirmed system-wide rule: don't use
   * grey400 for text — use grey600 instead (darkening grey400 enough to
   * pass AA lands almost exactly on grey600 anyway, so it's not a new
   * color, just the next step down the scale). grey400 is still fine for
   * borders, dividers, and disabled-state text (disabled controls are
   * exempt from WCAG contrast requirements).
   */
  grey400: "#9CA3AF",
  grey600: "#6A7282", // "Grey 2"
  grey700: "#4A5565", // "Grey 1"
  grey900: "#101828", // "Text Color 1"
} as const;

export const brand = {
  /**
   * Figma's literal "Color 1" swatch was #3F9B0B, which fails WCAG AA
   * contrast both as white-on-green fill (3.55:1) and as green-on-white
   * text (3.65:1) — both need 4.5:1 for 16px/500-weight text. By explicit
   * request, #3F9B0B has been replaced system-wide (buttons, text, borders,
   * checkboxes, radios, toggles) with this darkened shade — there is no
   * longer a separate "literal Figma" vs. "accessible" pair of green
   * tokens; this is simply the system's one primary green now.
   */
  primary: "#327907",
  primaryTint: "#E8F2E1", // "Color 3"
  /**
   * Primary button hover switches to blue (accent.blue, "Color 2"),
   * confirmed against Figma's own "Hover" button variant — this isn't a
   * darkened primary at all.
   *
   * `primaryHover` is the *exact* literal accent blue (#1BA9E6) with white
   * text, by explicit design request. This is a KNOWN, ACCEPTED WCAG AA
   * contrast failure — 2.67:1, needs 4.5:1 — not an oversight. Two AA-safe
   * alternatives were tried and both reverted per feedback: darkening this
   * color to #126E96, and swapping to dark text only on hover. Don't
   * reapply either fix without checking first; if this needs to change
   * again, ask rather than assuming which prior fix to bring back.
   *
   * `primaryActive` (pressed state, not in Figma at all) stays a separate,
   * darker derived blue — dark enough that white text on it passes AA
   * (7.82:1) on its own, so it isn't part of this tradeoff.
   */
  primaryHover: "#1BA9E6",
  primaryActive: "#0E5878",
  /**
   * Not in Figma. Secondary button hover washes to its own green at 10%
   * opacity (rather than the blue interaction color above) — mirrors how
   * `accent.blueTint` is implemented (alpha over the accent color itself,
   * not a separately-authored swatch). Uses `primary` (#327907) as the base
   * so the tint always matches whatever green is actually rendered as this
   * button's text/border.
   */
  primaryHoverTint: "rgba(50, 121, 7, 0.1)",
} as const;

/**
 * Additional accent colors from the palette that aren't tied to a semantic
 * state (used for charts, tags, avatars, category coding, etc), plus the
 * blue's role as the system's interaction/hover color (buttons, table rows,
 * list items).
 */
export const accent = {
  blue: "#1BA9E6", // "Color 2" — also brand.primaryHover; see the note there re: AA and text color
  blueTint: "rgba(27, 169, 230, 0.1)", // "1BA9E6 10%" — hover background for table rows and list items (buttons use primaryHoverTint instead, see brand)
  purple: "#472CE0", // "Color 4"
  purpleTint: "#DEE7FF", // "Color 5"
  pink: "#F2536D", // "Color 6"
} as const;

/**
 * Semantic state colors — solid + tint pairs, exactly as defined by the
 * Status component variants (High/Medium/Low/Info) in Figma.
 */
export const semantic = {
  // success/error's `solid` already passes AA as text on their own `tint`
  // (4.70:1 / 5.27:1) — no separate text color needed.
  success: { solid: brand.primary, tint: "#E8F2E1" }, // Status: Low — same green as brand.primary (#327907), not Figma's literal #3F9B0B
  error: {
    solid: "#C10007",
    tint: "#FFE2E2",
    // Not in Figma — derived hover/active shades, same treatment as primary.
    hover: "#A30006",
    active: "#870005",
  },
  /**
   * warning/info's literal `solid` FAILS WCAG AA as text on their own
   * `tint` (2.87:1 / 3.32:1 respectively — both need 4.5:1). Unlike
   * primary/error, `solid` is kept at its literal Figma value here since
   * it may still be used for non-text purposes (icons, borders, chart
   * points) where the lower 3:1 non-text threshold applies and the
   * brighter literal color is preferable. `text` is a separate, darkened
   * value for text-on-tint use (e.g. the Badge component) — confirmed
   * with Manasi rather than silently applied.
   */
  warning: { solid: "#E17100", tint: "#FEF3C6", text: "#A15C00" }, // Status: Medium
  info: { solid: "#0A84FF", tint: "#F3F4F6", text: "#0868CC" }, // Status: Info
} as const;

export const colors = { neutral, brand, accent, semantic } as const;

export type ColorTokens = typeof colors;
