import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { Icon } from "../Icon";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Built from Figma's "Status" component (High/Medium/Low/Info) — a pill with
a tint background and matching text color. \`neutral\` is added on top for
generic tagging, since not every product needs semantic status colors.

Two of Figma's four literal colors fail WCAG AA as text on their own tint
(Warning 2.87:1, Info 3.32:1) — both use a separate, minimally-darkened
text color instead (confirmed with Manasi, not silently changed). Success
and Error's literal colors already pass AA and are used as-is.

### Usage

\`\`\`tsx
import { Badge } from "@manasi-sys/sporte-design-system";

<Badge variant="success">Active</Badge>
<Badge variant="error" icon={<Icon name="error" size={14} />}>Failed</Badge>
\`\`\`

### Do
- Match variant to meaning: \`success\` = good/active/complete, \`warning\` = needs attention, \`error\` = failed/blocked, \`info\` = neutral status, \`neutral\` = no semantic meaning (a category tag, a count).
- Keep label text short — badges are meant to be scanned at a glance, not read as sentences.

### Don't
- Don't use \`error\` red just to draw attention to something that isn't actually a problem — it reads as "something is wrong" to anyone scanning a screen full of them.
        `,
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["neutral", "success", "warning", "error", "info"] },
  },
  args: {
    variant: "neutral",
    children: "Label",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Failed</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="success" icon={<Icon name="check_circle" size={14} />}>
        Completed
      </Badge>
      <Badge variant="error" icon={<Icon name="error" size={14} />}>
        Failed
      </Badge>
      <Badge variant="warning" icon={<Icon name="schedule" size={14} />}>
        Pending
      </Badge>
    </div>
  ),
};
