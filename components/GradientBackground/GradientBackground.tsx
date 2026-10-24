import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import blobTopLeft from "./assets/blob-top-left.svg?inline";
import blobBottomRight from "./assets/blob-bottom-right.svg?inline";

export interface GradientBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * From Figma's "Gradient" frame (1440×1024): the page background (#F8F9FA,
 * `background` token) with two soft, blurred green/blue shapes. The shapes
 * are Figma's own exported vectors (blur baked in), committed as-is under
 * ./assets — not redrawn.
 *
 * Sizes are Figma's exact pixel values; positions are Figma's, anchored so
 * the layout scales sensibly: the top-left shape keeps Figma's 14.31% / 161px
 * offset, the bottom-right one keeps its 58.62% horizontal offset and sits
 * on the container's bottom edge (as it does in the 1024px-tall frame). At
 * exactly 1440×1024 it matches Figma pixel for pixel.
 */
const boxes: Record<"topLeft" | "bottomRight", CSSProperties> = {
  topLeft: { left: "14.3056%", top: 161, width: 520.771, height: 624.048 },
  // Figma mirrors this one horizontally.
  bottomRight: { left: "58.6181%", bottom: 0, width: 390.578, height: 468.036, transform: "scaleX(-1)" },
};

// The exported SVGs are larger than their layout box (the blur spills out);
// Figma insets the image by these percentages of the box.
const bleed: CSSProperties = { position: "absolute", top: "-35.37%", right: "-35.14%", bottom: "-30.36%", left: "-44.26%" };

// Deliberate deviation from Figma, by request: Figma's shapes read as too
// strong on a real dashboard, so they're rendered at 70% of their exported
// strength. Raise toward 1 to get back to Figma's exact look.
const BLOB_OPACITY = 0.7;

function Blob({ src, style }: { src: string; style: CSSProperties }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute" style={{ ...style, opacity: BLOB_OPACITY }}>
      <div style={bleed}>
        <img src={src} alt="" className="block size-full max-w-none" draggable={false} />
      </div>
    </div>
  );
}

export function GradientBackground({ children, className, ...props }: GradientBackgroundProps) {
  return (
    <div className={clsx("relative isolate overflow-hidden bg-background", className)} {...props}>
      <Blob src={blobTopLeft} style={boxes.topLeft} />
      <Blob src={blobBottomRight} style={boxes.bottomRight} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
