import type { ReactNode } from "react";
import { Button } from "../Button";
import { Modal } from "./Modal";

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Swaps the confirm button to the red Destructive variant. */
  destructive?: boolean;
  /** Shows a spinner on the confirm button and locks both buttons. */
  isLoading?: boolean;
}

/** A Modal pre-wired as a confirm/cancel prompt — Secondary + Primary (or Destructive) buttons. */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      closeOnOverlayClick={!isLoading}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button variant={destructive ? "destructive" : "primary"} onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      {message}
    </Modal>
  );
}
