import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Every icon in this system is a **Google Material Symbols** icon (Outlined
style) — the same icon set Figma's own exported assets already use (their
layer names are literally Material Symbols' own naming convention, e.g.
\`..._wght300_GRAD0_opsz24\`).

Icon names come from the [Material Symbols library](https://fonts.google.com/icons) —
pass the icon's snake_case name (\`"search"\`, \`"add"\`, \`"keyboard_arrow_down"\`) as \`name\`.

### Weight scaling

Weight is fixed at **200 at 24dp** and scales proportionally for every
other size: \`weight = 200 × (size / 24)\`, clamped to Material Symbols'
valid 100–700 range. Pass an explicit \`weight\` to override this.

| size | weight |
|---|---|
| 16px | 133 |
| 20px | 167 |
| 24px | 200 |
| 32px | 267 |
| 40px | 333 |
| 48px | 400 |

### Usage

\`\`\`tsx
import { Icon } from "@manasi-sys/sporte-design-system";

<Icon name="add" />
<Icon name="delete" size={20} />
<Icon name="check_circle" aria-label="Completed" />
\`\`\`

### Do
- Pass \`aria-label\` when the icon carries meaning on its own (e.g. an icon-only button) — otherwise it's treated as decorative (\`aria-hidden\`) by default, which is correct when it sits next to a visible text label.

### Don't
- Don't hand-draw a one-off SVG for something Material Symbols already has — search the library first.
        `,
      },
    },
  },
  argTypes: {
    fill: { control: "select", options: [0, 1] },
  },
  args: {
    name: "search",
    size: 24,
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-end gap-6">
      {[16, 20, 24, 32, 40, 48].map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon name="favorite" size={size} className="text-grey-900" />
          <span className="font-sans text-[12px] text-grey-600">{size}px</span>
        </div>
      ))}
    </div>
  ),
};

export const FillOnOff: Story = {
  name: "Fill 0 vs 1",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon name="favorite" size={32} fill={0} className="text-error" />
        <span className="font-sans text-[12px] text-grey-600">fill=0</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="favorite" size={32} fill={1} className="text-error" />
        <span className="font-sans text-[12px] text-grey-600">fill=1</span>
      </div>
    </div>
  ),
};

/** The icons already used elsewhere in this system, for reference. */
export const IconsUsedInThisSystem: Story = {
  name: "Icons used in this system",
  parameters: { controls: { disable: true } },
  render: () => {
    const icons = [
      "add",
      "visibility",
      "visibility_off",
      "lock",
      "mail",
      "keyboard_arrow_down",
      "check",
      "currency_rupee",
      "person",
      "more_vert",
    ];
    return (
      <div className="grid grid-cols-5 gap-6">
        {icons.map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Icon name={name} size={24} className="text-grey-900" />
            <span className="font-sans text-[11px] text-grey-600">{name}</span>
          </div>
        ))}
      </div>
    );
  },
};
