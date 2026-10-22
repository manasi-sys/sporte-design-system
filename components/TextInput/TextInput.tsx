import { forwardRef, useId, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Icon } from "../Icon";

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  /** Shown below the field. Overridden by `errorText` when both are set. */
  helperText?: string;
  /** Presence of this puts the field in the error state and replaces helperText. */
  errorText?: string;
  /** Puts the field in the success state (border + helper text turn green). */
  success?: boolean;
  leadingIcon?: ReactNode;
  /** Ignored when `type="password"` — the built-in show/hide toggle takes this slot. */
  trailingIcon?: ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    label,
    helperText,
    errorText,
    success = false,
    leadingIcon,
    trailingIcon,
    required,
    disabled,
    type = "text",
    id,
    className,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const hasError = Boolean(errorText);
  const message = errorText || helperText;

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {label && (
        <label
          htmlFor={inputId}
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
          "flex w-full items-center gap-2 rounded-md border bg-white px-2 py-[11px] shadow-xs transition-colors",
          "focus-within:ring-2 focus-within:ring-primary/30",
          hasError
            ? "border-error focus-within:border-error"
            : // Success reuses `primary`, not the `success` semantic token —
              // `success` is the literal Figma green, which fails AA as text
              // (same issue already fixed for buttons). `primary` is that
              // same green, already darkened to pass.
              success
              ? "border-primary focus-within:border-primary"
              : "border-grey-100 hover:border-grey-300 focus-within:border-primary",
          disabled && "bg-grey-100 hover:border-grey-100",
        )}
      >
        {leadingIcon && <span className="flex size-6 shrink-0 items-center justify-center text-grey-600">{leadingIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          type={isPassword && showPassword ? "text" : type}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? helperId : undefined}
          className={clsx(
            "min-w-0 flex-1 bg-transparent font-sans text-[14px] leading-[22px] tracking-[-0.43px] text-grey-900 outline-none",
            "placeholder:text-grey-600",
            "disabled:cursor-not-allowed disabled:text-grey-400 disabled:placeholder:text-grey-400",
            className,
          )}
          {...props}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="flex size-6 shrink-0 items-center justify-center text-grey-600 disabled:cursor-not-allowed disabled:text-grey-400"
          >
            <Icon name={showPassword ? "visibility_off" : "visibility"} size={24} />
          </button>
        ) : (
          trailingIcon && <span className="flex size-6 shrink-0 items-center justify-center text-grey-600">{trailingIcon}</span>
        )}
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
