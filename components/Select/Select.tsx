import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";
import clsx from "clsx";
import { Icon } from "../Icon";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  helperText?: string;
  errorText?: string;
  success?: boolean;
  /** Rendered as a disabled, pre-selected first option when no value is set. */
  placeholder?: string;
}

/**
 * Same container styling as TextInput (Figma's Input Fields component) with
 * a chevron — matching the "User role" field in the Account Info Form,
 * which is a plain input container plus a `keyboard_arrow_down` icon.
 * There's no dedicated Select component in Figma; this is that pattern
 * generalized, not a separate invented style.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    helperText,
    errorText,
    success = false,
    placeholder,
    required,
    disabled,
    id,
    className,
    children,
    defaultValue,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = `${selectId}-helper`;
  const hasError = Boolean(errorText);
  const message = errorText || helperText;

  return (
    <div className="flex w-full flex-col items-start gap-2">
      {label && (
        <label
          htmlFor={selectId}
          className="font-sans text-[15px] font-semibold leading-[22px] tracking-[-0.23px] text-grey-700"
        >
          {label}
          {required && (
            <span className="text-error" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      <div
        className={clsx(
          "relative flex w-full items-center rounded-md border bg-white shadow-xs transition-colors",
          "focus-within:ring-2 focus-within:ring-primary/30",
          hasError
            ? "border-error focus-within:border-error"
            : success
              ? "border-primary focus-within:border-primary"
              : "border-grey-100 hover:border-grey-300 focus-within:border-primary",
          disabled && "bg-grey-100 hover:border-grey-100",
        )}
      >
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? helperId : undefined}
          defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
          className={clsx(
            "h-11 w-full appearance-none bg-transparent py-[11px] pl-2 pr-9 font-sans text-[14px] leading-[22px] tracking-[-0.43px] text-grey-900 outline-none",
            "disabled:cursor-not-allowed disabled:text-grey-400",
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <Icon name="keyboard_arrow_down" size={20} className="pointer-events-none absolute right-2 text-grey-700" />
      </div>
      {message && (
        <p
          id={helperId}
          className={clsx(
            "font-sans text-[12px] font-medium leading-[16px]",
            hasError ? "text-error" : success ? "text-primary" : "text-grey-600",
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
});
