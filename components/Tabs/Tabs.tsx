import clsx from "clsx";

export interface TabItem {
  label: string;
  value: string;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * From Figma's "Tab Bar" component — underline-style tabs for switching
 * between views/sections. Every tab reserves the same 5px bottom-border
 * space (transparent when inactive) so switching tabs doesn't shift
 * layout; only the active tab's border is colored, sitting flush over the
 * full-width 1px grey baseline from the container.
 *
 * Hover isn't in Figma — derived as a simple text darken, not the
 * blue-tint row convention used elsewhere, since a tab reads as a label/
 * control rather than a row.
 */
export function Tabs({ items, value, onChange, className }: TabsProps) {
  return (
    <div role="tablist" className={clsx("flex items-center gap-4 border-b border-grey-400", className)}>
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.value)}
            className={clsx(
              "flex items-center justify-center whitespace-nowrap border-b-[5px] p-4 font-sans transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isActive
                ? "border-primary text-[15px] font-semibold leading-[22px] tracking-[-0.23px] text-primary"
                : "border-transparent text-[14px] leading-[22px] tracking-[-0.43px] text-grey-700 hover:text-grey-900",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
