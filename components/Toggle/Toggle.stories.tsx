import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Inputs/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
An on/off switch (\`<input type="checkbox" role="switch">\` under the hood)
for settings that take effect immediately — unlike Checkbox, which implies
a batch of choices submitted together.

Figma only specifies ON/OFF; hover and disabled aren't in the file and are
derived here following the same conventions used elsewhere (literal green
when checked — a track color, held to the 3:1 non-text contrast rule, not
4.5:1 text contrast — and the standard neutral-grey disabled treatment).

### Usage

\`\`\`tsx
<Toggle label="Email notifications" defaultChecked />
\`\`\`

### Do
- Use for a setting that applies immediately, with no separate "Save" action.

### Don't
- Don't use for a set of options where the user reviews and submits a form — use Checkbox for that.
        `,
      },
    },
  },
  args: { label: "Email notifications" },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Off: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledOn: Story = { name: "Disabled + On", args: { disabled: true, defaultChecked: true } };

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle label="Off" />
      <Toggle label="On" defaultChecked />
      <Toggle label="Disabled" disabled />
      <Toggle label="Disabled + on" disabled defaultChecked />
    </div>
  ),
};
