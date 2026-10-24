import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
}

/**
 * Deliberate deviation from Figma: Figma's checked radio ("Variant2") draws
 * the ring and inner dot in grey (grey700), while its checked Checkbox is
 * brand green. Grey made a *selected* radio read as disabled, so the
 * checked state uses `primary` green instead, matching the Checkbox
 * (confirmed after Manasi pointed it out). The unchecked ring is grey900 (Figma has grey700; Manasi asked for darker).
 *
 * The hover treatment ("Variant3": green border + light green fill, no
 * dot) is combined mechanically with the checked dot for a
 * checked-and-hovered state, since Figma only shows hover on the unchecked
 * radio.
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
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
      <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={inputId}
          type="radio"
          disabled={disabled}
          className="peer absolute inset-0 size-5 cursor-[inherit] opacity-0"
          {...props}
        />
        <span
          aria-hidden="true"
          className={clsx(
            "pointer-events-none absolute inset-0 rounded-full border-[1.5px] bg-transparent transition-colors",
            "border-grey-900",
            "peer-hover:border-primary peer-hover:bg-primary-tint",
            "peer-checked:border-primary",
            "peer-checked:peer-hover:border-primary peer-checked:peer-hover:bg-primary-tint",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
            "peer-disabled:border-grey-300 peer-disabled:bg-grey-100",
          )}
        />
        <span
          aria-hidden="true"
          className={clsx(
            "pointer-events-none relative size-2 scale-0 rounded-full bg-primary transition-transform",
            "peer-checked:scale-100 peer-disabled:bg-grey-300",
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
