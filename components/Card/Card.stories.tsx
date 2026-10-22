import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Icon } from "../Icon";
import { Badge } from "../Badge";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A plain, unopinionated container — the one thing every card in Figma has in
common (white background, grey-100 border, 16px radius). Figma has no
generic "Card" component; it has several fully-composed cards (KPI display
cards, a Venue Card) that all share this same container underneath two
different content layouts and two different shadow treatments. Rather than
build a separate rigid component per layout, \`Card\` is just the shared
shell — see the composed examples below for how the real layouts are built
on top of it with ordinary flex/grid markup.

### Usage

\`\`\`tsx
import { Card } from "@weblabs/sporte-design-system";

<Card>
  <h3>Plain content</h3>
  <p>Anything can go inside.</p>
</Card>

<Card shadow="elevated" padding="md">
  {/* KPI/stat card content */}
</Card>
\`\`\`

### Do
- Use \`shadow="elevated"\` sparingly — it's the brand-tinted shadow Figma
  reserves for KPI/metric cards you want to stand out, not for cards in
  general.
- Build specific card layouts (a stat card, a list-item card) by composing
  \`Card\` with your own content — don't wait for a dedicated component per
  layout.

### Don't
- Don't override the border or radius per-instance to fake a different
  component — if a screen genuinely needs a visually distinct container,
  that's a sign that a new variant belongs on \`Card\` itself, not a one-off
  className override.
        `,
      },
    },
  },
  argTypes: {
    shadow: { control: "select", options: ["none", "default", "elevated"] },
    padding: { control: "select", options: ["none", "sm", "md", "lg"] },
  },
  args: {
    padding: "md",
    shadow: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-72">
      <p className="font-sans text-[15px] font-semibold text-grey-900">Card title</p>
      <p className="mt-1 font-sans text-[14px] text-grey-600">
        Plain card content — any layout goes here.
      </p>
    </Card>
  ),
};

export const Shadows: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-6">
      {(["none", "default", "elevated"] as const).map((shadow) => (
        <Card key={shadow} shadow={shadow} className="w-40">
          <p className="font-sans text-[12px] font-medium text-grey-600">shadow=&quot;{shadow}&quot;</p>
        </Card>
      ))}
    </div>
  ),
};

/** Matches Figma's "KPI display card 1" (Today's Revenue) exactly. */
export const StatCardExample: Story = {
  name: "Composed: Stat card",
  parameters: { controls: { disable: true } },
  render: () => (
    <Card shadow="elevated" className="flex w-[220px] flex-col justify-between gap-4" style={{ height: 165 }}>
      <div className="flex size-11 items-center justify-center rounded-md bg-primary-tint text-primary">
        <Icon name="currency_rupee" size={20} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-sans text-[14px] text-grey-600">Today&apos;s Revenue</p>
        <p className="font-sans text-[20px] font-semibold text-grey-900">₹ 6,57,432</p>
      </div>
      <p className="font-sans text-[11px] font-semibold text-primary">+12.5%</p>
    </Card>
  ),
};

/** Matches Figma's "KPI display card 3" (Total Admins). */
export const StatCardWideExample: Story = {
  name: "Composed: Stat card (wide)",
  parameters: { controls: { disable: true } },
  render: () => (
    <Card shadow="elevated" className="flex w-[300px] flex-col gap-2">
      <div className="flex size-11 items-center justify-center rounded-md bg-primary-tint text-primary">
        <Icon name="person" size={20} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-sans text-[14px] text-grey-600">Total Admins</p>
        <p className="font-sans text-[20px] font-semibold text-grey-900">37</p>
      </div>
      <p className="font-sans text-[11px] font-semibold text-primary">+1.2% · last 30 days</p>
    </Card>
  ),
};

/** Matches Figma's "Venue Card", now composed with the real Badge component. */
export const VenueCardExample: Story = {
  name: "Composed: List-item card",
  parameters: { controls: { disable: true } },
  render: () => (
    <Card shadow="default" className="flex w-[300px] flex-col gap-6">
      <div className="flex w-full items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="size-16 shrink-0 rounded-full bg-grey-100" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="font-sans text-[11px] text-grey-600">Hyderabad</p>
            <p className="font-sans text-[14px] font-semibold text-grey-900">SportE Playhouse</p>
          </div>
        </div>
        <button type="button" aria-label="More options" className="text-grey-900">
          <Icon name="more_vert" size={24} />
        </button>
      </div>
      <div className="flex w-full items-center gap-6">
        <div className="flex flex-1 flex-col gap-1">
          <p className="font-sans text-[11px] text-grey-600">Date Added</p>
          <p className="font-sans text-[14px] text-grey-700">2 Nov, 2024</p>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <p className="font-sans text-[11px] text-grey-600">Status</p>
          <Badge variant="success">Active</Badge>
        </div>
      </div>
    </Card>
  ),
};
