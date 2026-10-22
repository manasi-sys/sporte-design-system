import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput";
import { Icon } from "../Icon";

const meta: Meta<typeof TextInput> = {
  title: "Components/Inputs/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Text input built from Figma's "Input Fields" component (44px height,
12px radius, \`Shadow 1\` resting shadow). Figma only specifies a resting/
placeholder state — hover, focus, disabled, and validation states aren't in
the file, so they're derived here and called out below.

### Usage

\`\`\`tsx
import { TextInput } from "@weblabs/sporte-design-system";

<TextInput label="Email" placeholder="you@company.com" required />
<TextInput label="Password" type="password" />
<TextInput label="Email" errorText="Enter a valid email address" />
\`\`\`

### Not in Figma (derived)
- **Hover**: border darkens slightly (\`grey-300\`).
- **Focus**: border switches to \`primary\` plus a soft focus ring — same
  accessible green used for Button's focus ring, for one consistent focus
  color across the system.
- **Validation (error/success)**: border + helper text color only, no icon
  — confirmed with Manasi rather than guessed, since nothing like this
  exists in the source file. Success reuses the \`primary\` token rather
  than the \`success\` semantic color, because the literal Figma green fails
  AA as text (same fix already applied to buttons).

### Do
- Always pass a \`label\` — placeholder text is not a substitute (it disappears on input and isn't reliably read by all screen readers).
- Use \`errorText\` for validation messages instead of styling helperText red yourself — it also sets \`aria-invalid\`.

### Don't
- Don't set both \`success\` and \`errorText\` — error always wins visually, so it's ambiguous intent.
        `,
      },
    },
  },
  argTypes: {
    success: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: {
    label: "Email",
    placeholder: "enter your email here...",
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};

export const WithLeadingIcon: Story = {
  args: { leadingIcon: <Icon name="lock" />, label: "Password", placeholder: "enter your password" },
};

export const WithTrailingIcon: Story = {
  args: { trailingIcon: <Icon name="mail" />, label: "Email", placeholder: "enter your email here..." },
};

export const Password: Story = {
  args: { label: "Password", type: "password", placeholder: "Enter your password", leadingIcon: <Icon name="lock" /> },
};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true, value: "cannot edit this" },
};

export const ErrorState: Story = {
  name: "Error",
  args: { errorText: "Enter a valid email address", value: "not-an-email" },
};

export const SuccessState: Story = {
  name: "Success",
  args: { success: true, helperText: "Looks good!", value: "manasi@weblabsolutions.in" },
};

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex max-w-sm flex-col gap-6">
      <TextInput label="Default" placeholder="enter your email here..." />
      <TextInput label="Disabled" disabled value="cannot edit this" />
      <TextInput label="Error" errorText="Enter a valid email address" defaultValue="not-an-email" />
      <TextInput label="Success" success helperText="Looks good!" defaultValue="manasi@weblabsolutions.in" />
      <TextInput label="Required field" required placeholder="required..." />
    </div>
  ),
};
