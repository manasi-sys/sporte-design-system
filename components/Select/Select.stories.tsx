import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Inputs/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
There's no dedicated "Select" component in the Figma file — this reuses the
exact Input Fields container styling plus a chevron, matching the "User
role" dropdown field in the Account Info Form (an input container + a
\`keyboard_arrow_down\` icon). It's a native \`<select>\` under the hood for
full keyboard and screen-reader support, just restyled.

### Usage

\`\`\`tsx
<Select label="Role" placeholder="Select a role" required>
  <option value="pm">Project Manager</option>
  <option value="am">Account Manager</option>
</Select>
\`\`\`

### Do
- Pass plain \`<option>\` children — this is a native select, so anything that works in a regular \`<select>\` works here.

### Don't
- Don't use for fewer than ~4 options where they'd all fit as visible Radio buttons — a Select hides the choices behind a click.
        `,
      },
    },
  },
  args: {
    label: "Role",
    placeholder: "Select a role",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const roleOptions = (
  <>
    <option value="pm">Project Manager</option>
    <option value="am">Account Manager</option>
    <option value="admin">Admin</option>
  </>
);

export const Default: Story = {
  render: (args) => <Select {...args}>{roleOptions}</Select>,
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} disabled>
      {roleOptions}
    </Select>
  ),
};

export const ErrorState: Story = {
  name: "Error",
  render: (args) => (
    <Select {...args} errorText="Select a role to continue">
      {roleOptions}
    </Select>
  ),
};

export const SuccessState: Story = {
  name: "Success",
  render: (args) => (
    <Select {...args} success helperText="Role confirmed" defaultValue="pm">
      {roleOptions}
    </Select>
  ),
};
