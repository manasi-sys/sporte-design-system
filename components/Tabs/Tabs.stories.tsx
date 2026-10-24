import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Underline tab bar from Figma's "Tab Bar" component — for switching between
views within one screen (as opposed to \`NavItem\`, which is for the
persistent sidebar).

### Usage

\`\`\`tsx
import { Tabs } from "@manasi-sys/sporte-design-system";

const [value, setValue] = useState("overview");

<Tabs
  value={value}
  onChange={setValue}
  items={[
    { label: "Overview", value: "overview" },
    { label: "Venue Performance", value: "venue" },
  ]}
/>
\`\`\`

### Do
- Keep tab labels short enough to fit on one line — Figma's tabs don't wrap.

### Don't
- Don't use Tabs to navigate to a completely different section of the app (that's what the sidebar \`NavItem\` is for) — Tabs should switch content within the current page.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const items = [
  { label: "Overview", value: "overview" },
  { label: "Venue Performance", value: "venue" },
  { label: "Sport Performance", value: "sport" },
  { label: "Customer Insights", value: "customer" },
  { label: "Promotion Effectiveness", value: "promotion" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("overview");
    return <Tabs items={items} value={value} onChange={setValue} />;
  },
};

export const EachTabActive: Story = {
  name: "Each tab active (matches Figma variants)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <Tabs key={item.value} items={items} value={item.value} onChange={() => {}} />
      ))}
    </div>
  ),
};
