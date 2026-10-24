import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GradientBackground } from "./GradientBackground";
import { Card } from "../Card";
import { Icon } from "../Icon";
import { Tabs } from "../Tabs";
import { Badge } from "../Badge";

const meta: Meta<typeof GradientBackground> = {
  title: "Components/GradientBackground",
  component: GradientBackground,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, iframeHeight: 560 },
      description: {
        component: `
The dashboard page background from Figma's "Gradient" frame: the \`background\`
colour (#F8F9FA) with two soft, blurred green/blue shapes. The shapes are
Figma's own exported vectors, bundled inside the package (so there's nothing
extra to host or load) — not redrawn.

Positions and sizes match Figma exactly at 1440×1024, but the shapes are
rendered at 70% of Figma's strength — a deliberate, requested softening
(Figma's version read as too strong). At other sizes the shapes keep their
exact size; the top-left one keeps its offset from the top-left, and the
bottom-right one stays on the bottom edge.

### Usage

\`\`\`tsx
import { GradientBackground, Card } from "@manasi-sys/sporte-design-system";

<GradientBackground className="min-h-screen p-8">
  <Card>…dashboard content…</Card>
</GradientBackground>
\`\`\`

### Do
- Put content inside **Cards** (or other white surfaces). The shapes are very pale, but at their darkest point \`grey-600\` text measures only about 4.2:1 (needs 4.5:1). Text placed straight on the background should be \`grey-700\` or darker (about 6.5:1 there).
- Give it a height (\`min-h-screen\`, or a fixed height) — it fills whatever box you give it.

### Don't
- Don't use it behind dense tables or forms without a white surface in between.
- Don't stack it inside another \`GradientBackground\` — one per page.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GradientBackground>;

export const Default: Story = {
  render: () => <GradientBackground style={{ width: 1440, height: 1024 }} />,
};

export const WithDashboardContent: Story = {
  name: "With dashboard content",
  render: () => {
    const [tab, setTab] = useState("overview");
    return (
      <GradientBackground className="min-h-screen p-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { label: "Overview", value: "overview" },
              { label: "Venue Performance", value: "venue" },
              { label: "Customer Insights", value: "customers" },
            ]}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: "currency_rupee", label: "Today's Revenue", value: "₹ 6,57,432", delta: "+12.5%" },
              { icon: "person", label: "Total Admins", value: "37", delta: "+1.2%" },
              { icon: "calendar_today", label: "Bookings", value: "128", delta: "+4.0%" },
            ].map((s) => (
              <Card key={s.label} shadow="elevated" className="flex flex-col gap-3">
                <div className="flex size-11 items-center justify-center rounded-md bg-primary-tint text-primary">
                  <Icon name={s.icon} size={20} />
                </div>
                <div>
                  <p className="font-sans text-[14px] text-grey-600">{s.label}</p>
                  <p className="font-sans text-[20px] font-semibold text-grey-900">{s.value}</p>
                </div>
                <p className="font-sans text-[11px] font-semibold text-primary">{s.delta}</p>
              </Card>
            ))}
          </div>
          <Card className="flex items-center justify-between">
            <div>
              <p className="font-sans text-[14px] font-semibold text-grey-900">SportE Playhouse</p>
              <p className="font-sans text-[12px] text-grey-600">Hyderabad · added 2 Nov, 2024</p>
            </div>
            <Badge variant="success">Active</Badge>
          </Card>
        </div>
      </GradientBackground>
    );
  },
};
