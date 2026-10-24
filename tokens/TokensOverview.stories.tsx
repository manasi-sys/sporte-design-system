import type { Meta, StoryObj } from "@storybook/react";
import { neutral, brand, accent, semantic } from "./colors";
import { textStyles, fontWeight } from "./typography";
import { spacing } from "./spacing";
import { radii } from "./radii";
import { shadows } from "./shadows";

const meta: Meta = {
  title: "Tokens/Overview",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Every design token in this package, read directly from the SportE Admin Dashboard Figma file (node 50:2), with its exact name and value.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-12 shrink-0 rounded-md border border-grey-100"
        style={{ backgroundColor: value }}
      />
      <div className="text-sm">
        <div className="font-medium text-grey-900">{name}</div>
        <div className="text-grey-600">{value}</div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-lg font-semibold text-grey-900">{title}</h2>
      {children}
    </section>
  );
}

export const Colors: Story = {
  render: () => (
    <div className="p-6">
      <Section title="Neutrals">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Object.entries(neutral).map(([name, value]) => (
            <Swatch key={name} name={name} value={value} />
          ))}
        </div>
      </Section>
      <Section title="Brand">
        <p className="mb-3 text-sm text-grey-600">
          <span className="font-medium text-grey-900">primary</span> (#327907) replaces Figma's literal green swatch (#3F9B0B) everywhere in this
          system — the literal value failed WCAG AA contrast as text/fill with white. Hover/active are the
          system's blue interaction color, not a darkened green — see the Button docs for the full history.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Swatch name="primary" value={brand.primary} />
          <Swatch name="primaryTint" value={brand.primaryTint} />
          <Swatch name="primaryHover" value={brand.primaryHover} />
          <Swatch name="primaryActive" value={brand.primaryActive} />
          <Swatch name="primaryHoverTint" value={brand.primaryHoverTint} />
        </div>
      </Section>
      <Section title="Accent">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Object.entries(accent).map(([name, value]) => (
            <Swatch key={name} name={name} value={value} />
          ))}
        </div>
      </Section>
      <Section title="Semantic">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Object.entries(semantic).map(([name, { solid, tint }]) => (
            <div key={name} className="flex flex-col gap-2">
              <Swatch name={`${name}.solid`} value={solid} />
              <Swatch name={`${name}.tint`} value={tint} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="p-6">
      <Section title="Type scale">
        <div className="flex flex-col gap-5">
          {Object.entries(textStyles).map(([name, style]) => (
            <div key={name} className="border-b border-grey-100 pb-4">
              <p
                style={{
                  fontSize: style.fontSize,
                  lineHeight: `${style.lineHeight}px`,
                  letterSpacing: style.letterSpacing,
                  fontWeight: fontWeight[style.weights[style.weights.length - 1] as keyof typeof fontWeight],
                }}
                className="text-grey-900"
              >
                {name} — The quick brown fox
              </p>
              <p className="mt-1 text-xs text-grey-600">
                {style.fontSize}px / {style.lineHeight}px line-height / {style.letterSpacing}px tracking / weights: {style.weights.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="p-6">
      <Section title="Spacing scale">
        <div className="flex flex-col gap-2">
          {Object.entries(spacing).map(([name, value]) => (
            <div key={name} className="flex items-center gap-4">
              <span className="w-12 text-sm text-grey-600">{name}</span>
              <div className="bg-primary" style={{ width: value, height: 16 }} />
              <span className="text-sm text-grey-900">{value}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};

export const Radii: Story = {
  render: () => (
    <div className="p-6">
      <Section title="Border radius">
        <div className="flex flex-wrap gap-6">
          {Object.entries(radii).map(([name, value]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="size-16 bg-primary-tint border border-primary"
                style={{ borderRadius: value }}
              />
              <span className="text-sm text-grey-900">{name}</span>
              <span className="text-xs text-grey-600">{value}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div className="p-6">
      <Section title="Shadows">
        <div className="flex flex-wrap gap-10">
          {Object.entries(shadows).map(([name, value]) => (
            <div key={name} className="flex flex-col items-center gap-3">
              <div
                className="size-24 rounded-lg bg-white"
                style={{ boxShadow: value }}
              />
              <span className="text-sm text-grey-900">{name}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};
