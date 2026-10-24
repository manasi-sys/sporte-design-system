import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Wraps a real \`<input type="checkbox">\` (visually hidden, still focusable
and screen-reader friendly) with a styled box driven by Tailwind's
\`peer-*\` variants — so hover/checked/focus/disabled all come from actual
input state, not extra JS.

Colors use \`primary\` (#327907) — the one green token this system uses
everywhere, replacing Figma's literal #3F9B0B swatch.

### Usage

\`\`\`tsx
import { Checkbox } from "@manasi-sys/sporte-design-system";

<Checkbox label="Send me product updates" />
\`\`\`

### Do
- Always pair with a \`label\` (or your own \`aria-label\`) — never ship an unlabeled checkbox.

### Don't
- Don't use for a single on/off setting that takes effect immediately (no separate "Save") — use \`Toggle\` for that instead.
        `,
      },
    },
  },
  args: { label: "Send me product updates" },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { name: "Disabled + Checked", args: { disabled: true, defaultChecked: true } };

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Default (hover to see border change)" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled + checked" disabled defaultChecked />
    </div>
  ),
};
