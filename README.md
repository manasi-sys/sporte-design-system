# SportE Design System

Shared React component library and design tokens for all SportE products —
one visual identity, consumed independently by five separate product repos.

Source of truth for visual design: [SportE Admin Dashboard Figma file](https://www.figma.com/design/JbSoXA2iZyySe5lFMZsrJ8/SportE-Admin-Dashboard?node-id=50-2&m=dev)
("Style Guide" page). Token values in `/tokens` are read directly from that
file, not approximated — see the code comments in each token file for exactly
which Figma value backs each token, and which few values are clearly marked
as derived (not in Figma) where the file didn't specify something (e.g. a
hover color).

## Stack

- React (peer dependency, v18+)
- Tailwind CSS for styling (tokens are wired into `tailwind.config.js`)
- TypeScript
- Storybook 8 for documentation, with the a11y addon running axe-core on every story

## Install

This package publishes to **GitHub Packages** (npm registry `npm.pkg.github.com`),
scoped to the `@manasi-sys` GitHub account (a package scope must match the repo owner) so all five product repos can install it like any other
npm dependency and independently control when they upgrade.

1. Authenticate to GitHub Packages once per machine/CI runner — add to `~/.npmrc`:

   ```
   //npm.pkg.github.com/:_authToken=<a GitHub personal access token with read:packages>
   ```

2. In the consuming product repo's `.npmrc`, scope the package to this registry:

   ```
   @manasi-sys:registry=https://npm.pkg.github.com
   ```

3. Install:

   ```bash
   npm install @manasi-sys/sporte-design-system
   ```

4. Import the stylesheet once, at your app's entry point, alongside components:

   ```tsx
   import "@manasi-sys/sporte-design-system/styles.css";
   import { Button } from "@manasi-sys/sporte-design-system";
   ```

   The stylesheet links the Inter and Material Symbols font files shipped in the package
   (`dist/fonts`), so your bundler must be able to resolve CSS `@import` and `url()`
   (Vite, webpack and Next.js all do). No CDN is used.

## Versioning

Strict [semver](https://semver.org/). A breaking change (removed prop, renamed
export, changed default behavior) bumps the **major** version — so upgrading
is always something a product team opts into, never something forced on them.
See [CHANGELOG.md](./CHANGELOG.md) for what changed in each release.

## Local development

```bash
npm install
npm run dev          # Storybook at http://localhost:6006
npm run build         # builds the publishable package to /dist
npm run build-storybook
```

## Structure

```
/tokens         design tokens (colors, typography, spacing, radii, shadows, breakpoints)
/components     one folder per component (Component.tsx, Component.stories.tsx, index.ts)
/.storybook     Storybook configuration
```

## Accessibility

Every interactive component is checked against WCAG 2.1 AA as it's built:
contrast ratios, keyboard focus visibility, and ARIA attributes. Where the
Figma file's literal colors fail contrast (this has already come up once,
for the primary green), that's called out explicitly in the token file and
component docs rather than silently changed or silently shipped broken —
see `tokens/colors.ts`.
