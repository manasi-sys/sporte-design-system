import type { Meta, StoryObj } from "@storybook/react";
import { NavItem, NavSubItem } from "./NavItem";
import { Icon } from "../Icon";

const meta: Meta<typeof NavItem> = {
  title: "Components/Navigation/NavItem",
  component: NavItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Sidebar navigation row, from Figma's "Menu item" / "Menu item w/ dropdown"
components. A plain \`NavItem\` is a leaf link; passing \`items\` (made of
\`<NavSubItem>\`) turns it into a collapsible group header instead.

Active styling is a tint background + right border (matching Figma exactly
— text/icon color don't change between default and active, only the
background does). Hover isn't in Figma; it reuses the blue-10%-tint
convention already established for table-row/list-item hover elsewhere in
this system, since a nav row is the same kind of element.

### Usage

\`\`\`tsx
import { NavItem, NavSubItem } from "@weblabs/sporte-design-system";

<NavItem icon={<Icon name="dashboard" />} label="Dashboard" active />

<NavItem icon={<Icon name="account_circle" />} label="Users" items={
  <>
    <NavSubItem label="Customer List" />
    <NavSubItem label="Admin List" active />
    <NavSubItem label="Manager List" />
  </>
} />
\`\`\`

### Do
- Use \`active\` to mark the current page/section — only one top-level item should usually be active at a time.
- Keep a sidebar to one level of nesting (group → sub-items) — Figma doesn't define a third level.

### Don't
- Don't set both \`href\` and treat it as a group — \`items\` always wins (a group header toggles, it doesn't navigate).
        `,
      },
    },
  },
  args: {
    label: "Dashboard",
    icon: <Icon name="dashboard" />,
  },
};

export default meta;
type Story = StoryObj<typeof NavItem>;

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
};

export const CollapsibleGroup: Story = {
  name: "Collapsible group",
  args: {
    label: "Users",
    icon: <Icon name="account_circle" />,
    defaultOpen: true,
    items: (
      <>
        <NavSubItem label="Customer List" />
        <NavSubItem label="Admin List" active />
        <NavSubItem label="Manager List" />
      </>
    ),
  },
};

export const Sidebar: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <nav className="flex w-64 flex-col gap-2 bg-white p-2" aria-label="Main">
      <NavItem icon={<Icon name="dashboard" />} label="Dashboard" active />
      <NavItem
        icon={<Icon name="account_circle" />}
        label="Users"
        defaultOpen
        items={
          <>
            <NavSubItem label="Customer List" />
            <NavSubItem label="Admin List" />
            <NavSubItem label="Manager List" />
          </>
        }
      />
      <NavItem icon={<Icon name="calendar_today" />} label="Calendar" />
      <NavItem icon={<Icon name="settings" />} label="Settings" />
    </nav>
  ),
};
