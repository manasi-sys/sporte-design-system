# Changelog

All notable changes to this package are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and version numbers
follow [Semantic Versioning](https://semver.org/): breaking changes bump the
major version, new backwards-compatible features bump minor, fixes bump patch.

## [Unreleased]

### Added
- Design tokens (`/tokens`): colors, typography, spacing, radii, shadows, breakpoints — read from the SportE Admin Dashboard Figma file (node 50:2).
- `Button` component — primary/secondary/ghost/destructive variants, default/hover/active/disabled/loading states, left/right icon slot.
- `TextInput`, `Select`, `Checkbox`, `RadioButton`, `Toggle` components — built from Figma's Input Fields/Checkbox/Radio Button/Toggle Button components. Validation states (error/success) confirmed with Manasi since Figma doesn't define them: border + helper text color only, no icon.
- `Card` component — a generic container (white/grey-100 border/16px radius, matching every card variant in Figma) with a `shadow` prop for the two shadow treatments Figma uses (plain resting shadow vs. the brand-tinted "elevated" shadow on KPI cards). Composed examples in Storybook show the actual Figma card layouts (stat card, list-item/venue card) built on top of it.
- `Icon` component — wraps Google Material Symbols (Outlined), the same icon set Figma's own exported assets already use. Weight is fixed at 200 for 24dp icons and scales proportionally for every other size (`weight = 200 × size/24`, clamped 100–700), by explicit request. All hand-drawn placeholder SVG icons across Button/TextInput/Select/Checkbox/Card stories and components have been replaced with real Material Symbols icons (`add`, `visibility`/`visibility_off`, `lock`, `mail`, `keyboard_arrow_down`, `check`, `currency_rupee`, `person`, `more_vert`) via a new `material-symbols` dependency.
- `Badge` component — built from Figma's "Status" component (High/Medium/Low/Info), plus an added `neutral` variant for generic tagging. Composed into the Card component's Venue Card example, replacing the placeholder inline markup used before Badge existed.
- `NavItem`/`NavSubItem` components — sidebar navigation, built from Figma's "Menu item"/"Menu item w/ dropdown"/"Menu sub item" components. `items` prop turns a `NavItem` into a collapsible group header instead of a leaf link.
- `Tabs` component — underline tab bar, built from Figma's "Tab Bar" component, for switching views within a page (distinct from `NavItem`, which is for persistent sidebar navigation). A separate small pill/chip "Tabs" variant in Figma (e.g. a date-range filter) was deferred — it reads as a filter control, not page navigation; flagged in project notes if it's wanted later.
- Storybook set up with a11y addon, autodocs, and a Tokens Overview section.

### Added tokens
- `radii.xs` (4px, from Checkbox) — the radius scale previously guessed at 8px for small controls; corrected now that a real value exists.
- `brand.primaryHoverTint` — green-at-10%-opacity hover wash for Secondary/Ghost buttons (see Fixed, below).
- `semantic.warning.text` (`#A15C00`) and `semantic.info.text` (`#0868CC`) — AA-safe darkened text colors for the Badge component (see Fixed, below). `solid` is kept at Figma's literal value for non-text uses.

### Fixed
- Primary green (`#3F9B0B` as designed in Figma) fails WCAG AA contrast as white-on-green or as text-on-white. Components use a derived `primaryAccessible` shade (`#327907`) instead — see `tokens/colors.ts` and the Button docs for the full rationale.
- Button hover/active corrected to match Figma's actual "Hover" variant: Primary hovers to the *exact* literal `#1BA9E6` fill with white text — a known, accepted WCAG AA contrast failure (2.67:1); an AA-safe darker blue and a dark-text-on-hover alternative were both tried and reverted per feedback in favor of exact Figma fidelity.
- Secondary and Ghost hover changed to wash to their own green at 10% opacity (`rgba(50, 121, 7, 0.1)`) instead of the blue tint, since both already read as green buttons at rest. The blue-at-10%-opacity convention still applies to table rows and list items (not built yet).

### Fixed (Storybook config)
- Tokens Overview page was silently broken: `.storybook/main.ts`'s stories glob only matched `tokens/**/*.mdx`, so `TokensOverview.stories.tsx` never appeared in the sidebar at all, and `tailwind.config.js`'s `content` glob never scanned `tokens/`, so none of that page's Tailwind classes were ever generated (swatches were collapsing to ~2px). Both globs now include `tokens/`.

### Changed
- `#3F9B0B` (Figma's literal "Color 1" green) replaced system-wide with `#327907`, by explicit request. Previously the two coexisted as separate tokens (`brand.primary` = literal, `brand.primaryAccessible` = AA-safe darkened) with the literal value only used for Checkbox/RadioButton/Toggle (graphical elements, held to WCAG's looser 3:1 non-text contrast rule rather than 4.5:1 text contrast, so it technically didn't need the fix there) — Buttons/text already used the accessible shade. Now there's just one `primary` token (`#327907`) used everywhere, including Checkbox/RadioButton/Toggle, which changed slightly darker as a result. Also updated: `semantic.success.solid` (now references `brand.primary` instead of duplicating the old literal hex) and the `brand`-tinted card shadow (`tokens/shadows.ts`, recolored from the old green's RGB to the new one's).

- Figma's "Grey 3" (`grey400`, #9CA3AF) fails WCAG AA as text on white (2.53:1) — it's used in Figma for small caption/meta text (location labels, timestamps). System-wide rule confirmed with Manasi: use `grey600` for any text usage of this color instead (darkening grey400 enough to pass AA lands almost exactly on the existing grey600 token, so this isn't a new color). `grey400` is still fine for borders and disabled-state text, which are exempt from this WCAG rule.
- Badge's Warning (`#E17100` on `#FEF3C6`, 2.87:1) and Info (`#0A84FF` on `#F3F4F6`, 3.32:1) text both failed WCAG AA. Darkened per Manasi's confirmation to `#A15C00` (4.66:1) and `#0868CC` (4.94:1) respectively — background tints unchanged, and the literal `solid` colors are kept for any future non-text use.

### Known issues
- Primary button hover (`#1BA9E6` with white text) fails WCAG AA contrast (2.67:1, needs 4.5:1). Accepted deliberately — see `tokens/colors.ts` (`brand.primaryHover`) before changing this again.
