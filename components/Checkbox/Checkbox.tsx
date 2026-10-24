import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { Icon } from "../Icon";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
}

/**
 * Checkbox border/fill uses `primary` (#327907), the one green token this
 * system now uses everywhere — Figma's literal #3F9B0B has been retired.
 * (Note: a checkbox's border/checkmark are graphical UI elements, governed
 * by WCAG 1.4.11 Non-text Contrast, 3:1 — not the 4.5:1 text threshold — so
 * even the original literal green would have cleared this one on its own;
 * it's using `primary` now purely for one consistent color, not because it
 * needed the AA fix here.)
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, id, disabled, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={clsx("inline-flex items-center gap-2", disabled ? "cursor-not-allowed" : "cursor-pointer", className)}
    >
      <span className="relative inline-flex size-6 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className="peer absolute inset-0 size-6 cursor-[inherit] opacity-0"
          {...props}
        />
        <span
          aria-hidden="true"
          className={clsx(
            "pointer-events-none absolute inset-0 rounded-xs border bg-white transition-colors",
            "border-grey-400",
            "peer-hover:border-primary",
            "peer-checked:border-primary peer-checked:bg-primary",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
            "peer-disabled:border-grey-300 peer-disabled:bg-grey-100",
          )}
        />
        {/* Deliberate exception to the usual size-scaled icon weight (which would
            give ~167 at 20px): a thin checkmark was hard to see on the green
            fill, so it's pinned heavier, at Figma's 20px check_small size. */}
        <Icon
          name="check"
          size={20}
          weight={500}
          className="pointer-events-none relative text-white opacity-0 peer-checked:opacity-100 peer-disabled:text-grey-400"
        />
      </span>
      {label && (
        <span className={clsx("font-sans text-[14px] leading-[22px] tracking-[-0.43px]", disabled ? "text-grey-300" : "text-grey-900")}>
          {label}
        </span>
      )}
    </label>
  );
});
