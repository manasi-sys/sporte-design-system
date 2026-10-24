// Ships the fonts as real files next to the stylesheet instead of base64 inside it.
// Vite's library mode inlines every url() asset, which made styles.css 5.6 MB, so the
// fonts are copied here after `vite build` and linked from dist/fonts.css.
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const nm = (p) => resolve(root, "node_modules", p);
const dist = (p) => resolve(root, "dist", p);

mkdirSync(dist("fonts/inter"), { recursive: true });
mkdirSync(dist("fonts/material-symbols"), { recursive: true });

// Inter (variable, weight axis): copy the .woff2 files and rewrite the @font-face urls.
cpSync(nm("@fontsource-variable/inter/files"), dist("fonts/inter"), {
  recursive: true,
  filter: (src) => !src.endsWith(".woff2") || src.endsWith("-wght-normal.woff2"),
});
const interCss = readFileSync(nm("@fontsource-variable/inter/wght.css"), "utf8")
  .replace(/url\(\.\/files\/([^)]+\.woff2)\) format\('woff2-variations'\),\s*url\(\.\/files\/[^)]+\.woff\) format\('woff'\)/g,
    "url(./fonts/inter/$1) format('woff2-variations')")
  .replace(/url\(\.\/files\//g, "url(./fonts/inter/");

// Material Symbols (Outlined only; Rounded/Sharp are not used).
cpSync(nm("material-symbols/material-symbols-outlined.woff2"),
  dist("fonts/material-symbols/material-symbols-outlined.woff2"));
const symbolsCss = readFileSync(nm("material-symbols/outlined.css"), "utf8")
  .replace("./material-symbols-outlined.woff2", "./fonts/material-symbols/material-symbols-outlined.woff2");

writeFileSync(dist("fonts.css"), `${interCss}\n${symbolsCss}`);

// One import for consumers: styles.css pulls in fonts.css (an @import must come first).
const stylesPath = dist("styles.css");
writeFileSync(stylesPath, `@import "./fonts.css";\n${readFileSync(stylesPath, "utf8")}`);
