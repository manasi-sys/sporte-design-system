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
- `Modal` and `ConfirmDialog` components. Figma has no modal/dialog frame, so these are derived from existing tokens (confirmed with Manasi): white panel, grey-100 border, 16px radius, 24px padding, grey-900 overlay at 50%, title + description + close button + right-aligned footer. Max widths (400/512/640) are derived too. Built on the native `<dialog>` element (`showModal()`), which provides the focus trap, Esc handling, inert background and modal announcement natively. `ConfirmDialog` is a pre-wired Secondary + Primary (or Destructive) prompt with a loading state.
- `GradientBackground` component — the dashboard page background from Figma's "Gradient" frame: the `background` colour with two soft blurred green/blue shapes. The shapes are Figma's own exported vectors, committed byte-for-byte under `components/GradientBackground/assets` and bundled into the package (inlined, nothing extra to host). Positions and sizes match Figma's code to within 0.1px at 1440×1024. The shapes render at 70% of Figma's exported strength (a requested, deliberate softening; one constant, `BLOB_OPACITY`, to change).
- **Guidelines → Mobile** page in Storybook (`guidelines/Mobile.mdx`): a brief draft guideline for using the system on phones — touch targets (with every component's measured size), typography, layout, how each component adapts, touch behaviour, and five open decisions. Not from Figma (which only defines desktop); marked draft pending design sign-off. Nothing in it has been built yet: scrolling Tabs, 44px tap rows for Checkbox/Radio/Toggle, a 44px Modal close button, hover-only-on-mouse styles and 16px phone inputs are all still to do.
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

- Font changed from SF Pro (Figma's font, rendered via the system-font stack) to **Inter**, by explicit request, self-hosted via the new `@fontsource-variable/inter` dependency (no CDN, identical rendering on every platform). Applies everywhere since every component uses the shared `font-sans` token. Figma's letter-spacing values were tuned for SF Pro and Inter runs slightly wider — kept as-is for now; worth revisiting once the Figma file is updated to Inter.

- Checkbox checkmark was too small and thin to read on the green fill. Now 20px (Figma's `check_small` size, was 16px) with a pinned weight of 500 — a deliberate exception to the usual size-scaled icon weight (which would give ~167). The tick on a disabled + checked box is now grey instead of white-on-pale-grey, so it's visible.

- RadioButton's checked state is now brand green (ring and dot) instead of Figma's grey, which made a selected radio look disabled next to the green Checkbox. Deliberate deviation from Figma. The unselected ring is now grey900 (`#101828`) instead of Figma's grey700, by request.
- Disabled labels on RadioButton, Checkbox and Toggle now turn the same pale grey as their disabled control (`grey300`, `#99A1AF`). Previously they stayed dark: both the disabled grey and the normal dark text were applied and the dark one won.
- Disabled Toggle was almost invisible (a `grey100` track on a near-identical page background). The disabled track now has a pale-grey outline, matching the disabled Checkbox and RadioButton.

### Known issues
- **Not yet publishable as-is** (found on the first real `npm run build`, to fix in the publishing step): (1) `dist/style.css` is ~5.6 MB because the build inlines the Material Symbols font (3.8 MB) and every Inter language subset into the CSS as base64; (2) `package.json` exports `./styles.css`, but the build actually writes `dist/style.css`, so the import path in the README wouldn't resolve.
- Primary button hover (`#1BA9E6` with white text) fails WCAG AA contrast (2.67:1, needs 4.5:1). Accepted deliberately — see `tokens/colors.ts` (`brand.primaryHover`) before changing this again.
