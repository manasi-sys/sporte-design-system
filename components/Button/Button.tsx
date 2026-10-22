import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Spinner } from "./Spinner";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Figma defines primary/secondary exactly; ghost and
   * destructive are derived from the same token set (see design-system README). */
  variant?: ButtonVariant;
  /** Shows a spinner and disables interaction while an action is in flight. */
  isLoading?: boolean;
  /** Icon rendered alongside the label. */
  icon?: ReactNode;
  /** Which side of the label the icon renders on. */
  iconPosition?: "left" | "right";
}

const variantClasses: Record<ButtonVariant, string> = {
  // Hover is the exact literal accent blue (#1BA9E6) with white text, by
  // explicit design request — this is a known WCAG AA contrast failure
  // (2.67:1, needs 4.5:1), accepted deliberately rather than fixed. See
  // tokens/colors.ts (brand.primaryHover) for the full history: white text
  // on this exact blue was already flagged twice, an AA-safe darker shade
  // and a dark-text-on-hover alternative were both tried and reverted.
  // Don't "fix" this again without checking with Manasi first.
  primary: clsx(
    "bg-primary text-white",
    "hover:bg-primary-hover",
    "active:bg-primary-active",
    "disabled:bg-grey-100 disabled:text-grey-400",
  ),
  // Secondary washes to its own green (10% opacity) on hover, not the blue
  // interaction color — by explicit request, since it already reads as a
  // green button (green border/text) at rest.
  secondary: clsx(
    "bg-transparent text-primary border border-primary",
    "hover:bg-primary-hover-tint",
    "active:bg-primary/20",
    "disabled:bg-transparent disabled:text-grey-400 disabled:border-grey-300",
  ),
  // Same reasoning as Secondary: green text at rest, so hover/active wash
  // to its own green rather than the blue interaction color.
  ghost: clsx(
    "bg-transparent text-primary border border-transparent",
    "hover:bg-primary-hover-tint",
    "active:bg-primary/20",
    "disabled:bg-transparent disabled:text-grey-400",
  ),
  destructive: clsx(
    "bg-error text-white",
    "hover:bg-error-hover",
    "active:bg-error-active",
    "disabled:bg-grey-100 disabled:text-grey-400",
  ),
};

const focusRing: Record<ButtonVariant, string> = {
  primary: "focus-visible:ring-primary",
  secondary: "focus-visible:ring-primary",
  ghost: "focus-visible:ring-primary",
  destructive: "focus-visible:ring-error",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    isLoading = false,
    icon,
    iconPosition = "left",
    disabled,
    className,
    children,
    type = "button",
    ...props
  },
  ref,
) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={clsx(
        "inline-flex items-center justify-center gap-1 rounded-full px-6 py-2.5",
        "font-sans text-[16px] font-medium leading-[22px] tracking-[-0.43px]",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        variantClasses[variant],
        focusRing[variant],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <Spinner className="shrink-0" />
      ) : (
        icon && iconPosition === "left" && <span className="shrink-0 size-6 [&>svg]:size-full">{icon}</span>
      )}
      {children && <span>{children}</span>}
      {!isLoading && icon && iconPosition === "right" && (
        <span className="shrink-0 size-6 [&>svg]:size-full">{icon}</span>
      )}
    </button>
  );
});
