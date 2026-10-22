import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import clsx from "clsx";

export type CardShadow = "none" | "default" | "elevated";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * "default" is Figma's "Shadow 1" (a plain resting shadow, e.g. the Venue
   * Card). "elevated" is "Green Elevation 2", the brand-tinted double
   * shadow Figma uses on KPI/stat cards to make them stand out more.
   */
  shadow?: CardShadow;
  /** "md" (16px) is the only value literally measured in Figma — every
   * card example uses it. sm/lg are extrapolated from the same spacing
   * scale for cards that need to be more/less dense. */
  padding?: CardPadding;
}

const shadowClasses: Record<CardShadow, string> = {
  none: "shadow-none",
  default: "shadow-xs",
  elevated: "shadow-brand",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

/**
 * Generic card container — the one thing constant across every card
 * variant in Figma (KPI display cards, Venue Card): white background,
 * grey-100 border, 16px radius. Only the shadow and internal content
 * layout vary, so this stays an unopinionated container rather than a
 * fixed "KpiCard"/"VenueCard" component — see the stories for how the
 * actual Figma card layouts compose on top of it.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { shadow = "default", padding = "md", className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx(
        "rounded-lg border border-grey-100 bg-white",
        shadowClasses[shadow],
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
