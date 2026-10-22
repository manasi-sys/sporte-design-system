import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type BadgeVariant = "neutral" | "success" | "warning" | "error" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Small leading icon — pass an <Icon size={14} /> for correct proportions. */
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * Pulled from Figma's "Status" component (High/Medium/Low/Info), plus a
 * "neutral" variant added for generic tagging — not every one of the five
 * products will need semantic status colors, but all of them will need a
 * plain tag/label at some point.
 *
 * Warning and Info use a separate, darkened `text` token rather than their
 * literal `solid` color — the literal colors fail WCAG AA as text on their
 * own tint background (2.87:1 / 3.32:1, both need 4.5:1). Confirmed with
 * Manasi rather than shipped silently broken. Success and Error's literal
 * colors already pass AA as text, so they use `solid` directly.
 */
const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-grey-100 text-grey-700",
  success: "bg-success-tint text-success",
  warning: "bg-warning-tint text-warning-text",
  error: "bg-error-tint text-error",
  info: "bg-info-tint text-info-text",
};

export function Badge({ variant = "neutral", icon, children, className, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex w-fit items-center gap-1 rounded-full px-3 py-0.5",
        "font-sans text-[12px] font-medium leading-4",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}
