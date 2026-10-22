import clsx from "clsx";
import type { HTMLAttributes } from "react";

/**
 * Icons across this system are Google Material Symbols (Outlined) — the
 * same icon set Figma's own assets already use (its exported icon layers
 * are literally named e.g. "visibility_off_..._wght300_GRAD0_opsz24",
 * Material Symbols' own naming for its variable-font axes).
 *
 * Weight is fixed at 200 for the 24dp size (Figma/brand default), then
 * scaled proportionally for every other size: weight = 200 * (size / 24),
 * clamped to Material Symbols' valid 100–700 range. This keeps stroke
 * weight visually consistent as icons shrink or grow instead of every
 * size defaulting to the same absolute weight.
 */
const BASE_SIZE = 24;
const BASE_WEIGHT = 200;
const MIN_WEIGHT = 100;
const MAX_WEIGHT = 700;
const MIN_OPSZ = 20;
const MAX_OPSZ = 48;

function weightForSize(size: number): number {
  const scaled = Math.round((BASE_WEIGHT / BASE_SIZE) * size);
  return Math.min(MAX_WEIGHT, Math.max(MIN_WEIGHT, scaled));
}

function opszForSize(size: number): number {
  return Math.min(MAX_OPSZ, Math.max(MIN_OPSZ, size));
}

export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Material Symbols icon name, e.g. "search", "add", "keyboard_arrow_down". */
  name: string;
  /** Rendered size in px. Weight and optical size both scale from this. */
  size?: number;
  /** Material Symbols FILL axis: 0 (outline) or 1 (solid). */
  fill?: 0 | 1;
  /** Explicit override — skips the automatic size-based scaling. */
  weight?: number;
  /** Accessible name. Omit for a purely decorative icon (the default). */
  "aria-label"?: string;
}

export function Icon({ name, size = BASE_SIZE, fill = 0, weight, className, style, ...props }: IconProps) {
  const resolvedWeight = weight ?? weightForSize(size);
  const isDecorative = !props["aria-label"];

  return (
    <span
      className={clsx("material-symbols-outlined select-none leading-none", className)}
      style={{
        fontSize: size,
        width: size,
        height: size,
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${resolvedWeight}, 'GRAD' 0, 'opsz' ${opszForSize(size)}`,
        ...style,
      }}
      aria-hidden={isDecorative ? "true" : undefined}
      role={isDecorative ? undefined : "img"}
      {...props}
    >
      {name}
    </span>
  );
}
