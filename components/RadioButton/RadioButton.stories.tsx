import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "./RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "Components/Inputs/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Same accessible pattern as Checkbox — a real \`<input type="radio">\`
visually hidden under a styled circle, driven by \`peer-*\` variants.

**Fidelity note:** Figma's checked radio uses grey for both the ring and
inner dot, not the brand green Checkbox uses when checked. This reproduces
that exactly. If that was meant to be green (to match Checkbox), flag it —
happy to change once confirmed.

### Usage

Radios only make sense in a group sharing one \`name\`:

\`\`\`tsx
<RadioButton name="plan" value="monthly" label="Monthly" defaultChecked />
<RadioButton name="plan" value="yearly" label="Yearly" />
\`\`\`

### Do
- Group radios with the same \`name\` so only one can be selected.
- Pre-select a sensible default in a group — don't leave every option unselected when one is clearly the common case.

### Don't
- Don't use a single radio on its own — that's what Checkbox or Toggle are for.
        `,
      },
    },
  },
  args: { label: "Option" },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };

export const Group: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3" role="radiogroup" aria-label="Billing plan">
      <RadioButton name="plan-demo" value="monthly" label="Monthly" defaultChecked />
      <RadioButton name="plan-demo" value="yearly" label="Yearly (save 20%)" />
      <RadioButton name="plan-demo" value="disabled" label="Unavailable plan" disabled />
    </div>
  ),
};
