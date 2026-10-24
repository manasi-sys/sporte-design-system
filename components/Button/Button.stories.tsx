import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Icon } from "../Icon";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Buttons trigger a single action. **Primary** and **Secondary** come directly
from the SportE Figma style guide; **Ghost** and **Destructive** are derived
from the same token set (transparent + brand color, and the semantic error
color) since the Figma file doesn't define them explicitly.

**Primary** hovers to the accent blue (\`#1BA9E6\` exactly, confirmed against
Figma's own "Hover" button variant) with white text. This is a **known,
accepted WCAG AA contrast failure** (2.67:1, needs 4.5:1) — kept this way by
explicit design request after two AA-safe alternatives (a darker blue, and
dark text on hover) were both tried and reverted. Active/pressed (not in
Figma) uses a separate, darker derived blue where white text does pass AA.

**Secondary** and **Ghost** hover to their *own* green at 10% opacity
(\`rgba(50, 121, 7, 0.1)\`) rather than the blue, since both already read as
green buttons at rest — the blue-at-10%-opacity treatment is reserved for
table rows and list items elsewhere in the system, not these two buttons.

See \`tokens/colors.ts\` for the full history of this decision if it needs to
change again — check before re-applying a contrast fix that's already been reverted.

### Usage

\`\`\`tsx
import { Button } from "@manasi-sys/sporte-design-system";

<Button variant="primary">Save changes</Button>
<Button variant="destructive" onClick={handleDelete}>Delete</Button>
<Button variant="secondary" isLoading>Saving…</Button>
\`\`\`

### Do
- Use **primary** for the one main action on a screen or card.
- Use **destructive** only for actions that delete or irreversibly change data, and pair it with a confirmation step.
- Pass \`isLoading\` instead of swapping the label to "Loading…" — it keeps the button's width stable and announces \`aria-busy\` to screen readers.

### Don't
- Don't use more than one **primary** button in the same view — it defeats the point of a primary action.
- Don't put two icons on one button (\`icon\` supports one, on either side).
- Don't rely on color alone for destructive actions — keep the label explicit ("Delete", "Remove"), not just a red button.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive"],
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    variant: "primary",
    children: "Your Text Here",
    disabled: false,
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", icon: <Icon name="add" /> },
};

export const Secondary: Story = {
  args: { variant: "secondary", icon: <Icon name="add" /> },
};

export const Ghost: Story = {
  args: { variant: "ghost", icon: <Icon name="add" /> },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const IconOnRight: Story = {
  args: { variant: "primary", icon: <Icon name="add" />, iconPosition: "right" },
};

export const Loading: Story = {
  args: { variant: "primary", isLoading: true, children: "Saving…" },
};

export const Disabled: Story = {
  args: { variant: "primary", disabled: true, icon: <Icon name="add" /> },
};

export const AllVariantsAllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const variants: Array<"primary" | "secondary" | "ghost" | "destructive"> = [
      "primary",
      "secondary",
      "ghost",
      "destructive",
    ];
    return (
      <div className="flex flex-col gap-6">
        {variants.map((variant) => (
          <div key={variant} className="flex items-center gap-4">
            <span className="w-24 text-sm text-grey-600 capitalize">{variant}</span>
            <Button variant={variant} icon={<Icon name="add" />}>
              Default
            </Button>
            <Button variant={variant} icon={<Icon name="add" />} isLoading>
              Loading
            </Button>
            <Button variant={variant} icon={<Icon name="add" />} disabled>
              Disabled
            </Button>
          </div>
        ))}
        <p className="text-xs text-grey-600">
          Hover and active/pressed states aren't screenshot-able in a static story — try them directly with your mouse/keyboard above.
        </p>
      </div>
    );
  },
};
