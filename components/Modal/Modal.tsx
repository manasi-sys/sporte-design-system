import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { Icon } from "../Icon";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps {
  open: boolean;
  /** Called on Esc, the close button, and (unless disabled) an overlay click. */
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  /** Usually right-aligned <Button>s. */
  footer?: ReactNode;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-[400px]",
  md: "max-w-[512px]",
  lg: "max-w-[640px]",
};

/**
 * Not in Figma — derived from existing tokens (confirmed with Manasi):
 * card-style panel (white, grey-100 border, 16px radius, 24px padding), a
 * grey-900 overlay at 50%, title + close button, optional footer.
 * Max widths (400/512/640) are also derived; 512 matches the toast width
 * Figma does define.
 *
 * Built on the native <dialog> element + showModal(), so focus is trapped
 * inside, Esc is handled, the page behind is inert, and screen readers
 * announce it as a modal dialog — without any custom focus-trap code.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // showModal() focuses the first focusable element — the close button —
      // which can flash its focus ring the moment the dialog appears. Park
      // focus on the panel instead; the first Tab still reaches the close
      // button (and shows its ring then, as it should for keyboard users).
      panelRef.current?.focus({ preventScroll: true });
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        // Keep the component controlled: let the parent decide to close.
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // The dialog has no padding, so a click whose target is the dialog
        // itself can only have landed on the backdrop.
        if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
      }}
      className={clsx(
        "m-auto w-[calc(100%-2rem)] rounded-lg border border-grey-100 bg-white p-0 text-left shadow-xs",
        "backdrop:bg-grey-900/50",
        sizeClasses[size],
      )}
    >
      <div ref={panelRef} tabIndex={-1} className="flex flex-col gap-4 p-6 outline-none">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2
              id={titleId}
              className="font-sans text-[20px] font-semibold leading-[25px] tracking-[-0.45px] text-grey-900"
            >
              {title}
            </h2>
            {description && (
              <p
                id={descriptionId}
                className="font-sans text-[14px] leading-[22px] tracking-[-0.43px] text-grey-600"
              >
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={clsx(
              "-mr-2 -mt-3.5 flex size-10 shrink-0 items-center justify-center rounded-full text-grey-700 transition-colors",
              "hover:bg-primary-hover-tint",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            )}
          >
            <Icon name="close" size={24} />
          </button>
        </div>
        {children && <div className="font-sans text-[14px] leading-[22px] tracking-[-0.43px] text-grey-900">{children}</div>}
        {footer && <div className="mt-2 flex flex-wrap items-center justify-end gap-3">{footer}</div>}
      </div>
    </dialog>
  );
}
