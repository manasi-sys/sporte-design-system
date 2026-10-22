import { useState } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { Icon } from "../Icon";

type CommonProps = {
  icon?: ReactNode;
  label: string;
  /** Sets the row's selected/highlighted style. Ignored on a group header — see `defaultOpen`. */
  active?: boolean;
  className?: string;
};

export interface NavItemProps extends CommonProps {
  href?: string;
  onClick?: () => void;
  /** Nested <NavSubItem> elements. Presence turns this into a collapsible
   * group header (button, no navigation) instead of a leaf link. */
  items?: ReactNode;
  /** Only used when `items` is set. */
  defaultOpen?: boolean;
}

/**
 * From Figma's "Menu item" / "Menu item w/ dropdown" components. Active
 * background is `primary` at 10% opacity + a right border, matching
 * Figma's literal `rgba(63,155,11,0.1)` — the pre-replacement green at
 * 10%, now `primaryHoverTint` (`rgba(50,121,7,0.1)`) since #3F9B0B was
 * replaced system-wide. Text/icon color is unchanged between default and
 * active states — that's Figma's actual spec, not an oversight; only the
 * background and border change.
 *
 * Hover isn't in Figma. Uses the established blue-10%-tint convention for
 * row/list-item hover (set earlier for table rows), since a nav item is
 * the same kind of row.
 */
export function NavItem({ icon, label, active = false, href, onClick, items, defaultOpen = false, className }: NavItemProps) {
  const isGroup = Boolean(items);
  const [open, setOpen] = useState(defaultOpen);
  const highlighted = isGroup ? open : active;

  const rowClasses = clsx(
    "flex w-full items-center gap-4 rounded-md px-2 py-3 text-left transition-colors",
    "font-sans text-[14px] leading-[22px] tracking-[-0.43px] text-grey-700",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    highlighted ? "border-r border-primary bg-primary-hover-tint" : "hover:bg-accent-blue-tint",
    className,
  );

  const content = (
    <>
      {icon && <span className="flex size-5 shrink-0 items-center justify-center">{icon}</span>}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {isGroup && (
        <Icon name="keyboard_arrow_down" size={20} className={clsx("shrink-0 transition-transform", open && "rotate-180")} />
      )}
    </>
  );

  return (
    <div className="w-full">
      {isGroup ? (
        <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={rowClasses}>
          {content}
        </button>
      ) : href ? (
        <a href={href} aria-current={active ? "page" : undefined} className={rowClasses}>
          {content}
        </a>
      ) : (
        <button type="button" aria-current={active ? "page" : undefined} onClick={onClick} className={rowClasses}>
          {content}
        </button>
      )}
      {isGroup && open && <div className="mt-2 flex flex-col gap-2 pl-9">{items}</div>}
    </div>
  );
}

export interface NavSubItemProps extends Pick<CommonProps, "label" | "active" | "className"> {
  href?: string;
  onClick?: () => void;
}

/**
 * From Figma's "Menu sub item" — a `chevron_forward`-prefixed nested link.
 * Material Symbols doesn't publish a "chevron_forward" icon (that's an
 * Android-internal resource name); `chevron_right` is the equivalent
 * published icon and renders identically.
 *
 * "Active" isn't shown in Figma for sub-items (only one static example) —
 * derived here as text turning `primary` + semibold, lighter-weight than
 * the parent's background treatment since nested items are already visually de-emphasized by indentation.
 */
export function NavSubItem({ label, active = false, href, onClick, className }: NavSubItemProps) {
  const classes = clsx(
    "flex w-full items-center gap-4 rounded-md py-1 text-left transition-colors",
    "font-sans text-[14px] leading-[22px] tracking-[-0.43px]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    active ? "font-semibold text-primary" : "text-grey-700 hover:bg-accent-blue-tint",
    className,
  );
  const content = (
    <>
      <Icon name="chevron_right" size={20} className="shrink-0" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </>
  );
  return href ? (
    <a href={href} aria-current={active ? "page" : undefined} className={classes}>
      {content}
    </a>
  ) : (
    <button type="button" aria-current={active ? "page" : undefined} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
