import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
}

/**
 * Built on a real `<input type="checkbox" role="switch">` for native form
 * participation and screen-reader semantics, styled into a track/thumb via
 * `peer-*` variants — same pattern as Checkbox/RadioButton. Disabled state
 * and hover aren't in Figma (only ON/OFF); derived following the same
 * neutral-grey/AA-safe-fill treatment used everywhere else in this system.
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
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
      <span className="relative inline-flex h-[15px] w-8 shrink-0 items-center">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className="peer absolute inset-0 size-full cursor-[inherit] opacity-0"
          {...props}
        />
        <span
          aria-hidden="true"
          className={clsx(
            "pointer-events-none absolute inset-0 rounded-full transition-colors",
            "bg-grey-400",
            "peer-checked:bg-primary",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
            // Pale fill + grey outline, same as the disabled Checkbox/Radio — a
            // bare grey100 track vanishes against the page background.
            "peer-disabled:bg-grey-100 peer-disabled:ring-1 peer-disabled:ring-inset peer-disabled:ring-grey-300",
          )}
        />
        <span
          aria-hidden="true"
          className={clsx(
            "pointer-events-none absolute left-px size-[13px] rounded-full bg-grey-100 transition-transform",
            "peer-checked:translate-x-[17px]",
            "peer-disabled:bg-grey-300",
          )}
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
