import { neutral, brand, accent, semantic } from "./tokens/colors.ts";
import { fontFamily, fontWeight } from "./tokens/typography.ts";
import { radii } from "./tokens/radii.ts";
import { shadows } from "./tokens/shadows.ts";
import { breakpoints } from "./tokens/breakpoints.ts";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./components/**/*.{ts,tsx}", "./tokens/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}", "./index.ts"],
  theme: {
    screens: breakpoints,
    extend: {
      colors: {
        white: neutral.white,
        background: neutral.background,
        grey: {
          100: neutral.grey100,
          300: neutral.grey300,
          400: neutral.grey400,
          600: neutral.grey600,
          700: neutral.grey700,
          900: neutral.grey900,
        },
        primary: {
          // #327907 — replaces Figma's literal #3F9B0B system-wide, see tokens/colors.ts.
          DEFAULT: brand.primary,
          // Interaction states are blue, confirmed against Figma's own
          // "Hover" button variant — not a darkened green. See tokens/colors.ts.
          hover: brand.primaryHover,
          active: brand.primaryActive,
          tint: brand.primaryTint,
          "hover-tint": brand.primaryHoverTint,
        },
        accent: {
          blue: accent.blue,
          "blue-tint": accent.blueTint,
          purple: accent.purple,
          "purple-tint": accent.purpleTint,
          pink: accent.pink,
        },
        success: { DEFAULT: semantic.success.solid, tint: semantic.success.tint },
        // `text` is the AA-safe darkened color for text-on-tint use (e.g. Badge) — see tokens/colors.ts.
        warning: { DEFAULT: semantic.warning.solid, tint: semantic.warning.tint, text: semantic.warning.text },
        error: {
          DEFAULT: semantic.error.solid,
          tint: semantic.error.tint,
          hover: semantic.error.hover,
          active: semantic.error.active,
        },
        info: { DEFAULT: semantic.info.solid, tint: semantic.info.tint, text: semantic.info.text },
      },
      fontFamily: {
        sans: fontFamily.sans.split(", "),
      },
      fontWeight: {
        regular: `${fontWeight.regular}`,
        medium: `${fontWeight.medium}`,
        semibold: `${fontWeight.semibold}`,
      },
      borderRadius: radii,
      boxShadow: shadows,
    },
  },
  plugins: [],
};
