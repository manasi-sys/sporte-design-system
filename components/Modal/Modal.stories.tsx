import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import { Button } from "../Button";
import { TextInput } from "../TextInput";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    // A modal fills whatever page it opens on, so on the Docs tab render each
    // story in its own fixed-height frame instead of inline.
    docs: {
      story: { inline: false, iframeHeight: 520 },
      description: {
        component: `
Modal dialog. **There is no modal in the Figma file** — this is derived from
existing tokens (confirmed with Manasi): a card-style panel (white, grey-100
border, 16px radius, 24px padding), a grey-900 overlay at 50%, title + close
button, optional footer. Max widths (400 / 512 / 640) are derived too.

Built on the native \`<dialog>\` element, so focus is trapped inside, Esc
closes it, the page behind is inert, and screen readers announce it as a
modal dialog — no custom focus-trap code to maintain.

### Usage

\`\`\`tsx
import { Modal, Button } from "@manasi-sys/sporte-design-system";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Edit venue</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Edit venue"
  description="Changes apply to all upcoming bookings."
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={save}>Save</Button>
    </>
  }
>
  …form fields…
</Modal>
\`\`\`

For yes/no prompts use \`ConfirmDialog\`, which wires up the footer for you.

### Do
- Put the primary action on the right of the footer, with Cancel (Secondary) to its left.
- Use \`ConfirmDialog destructive\` for deletes and other irreversible actions, and name the action in the button ("Delete venue", not "OK").

### Don't
- Don't stack modals on top of each other — if a flow needs a second step, replace the content or use a page.
- Don't put long scrolling forms in a modal — past a screen's height, use a page.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Edit venue"
          description="Changes apply to all upcoming bookings."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save changes</Button>
            </>
          }
        >
          <div className="flex flex-col gap-4">
            <TextInput label="Venue name" defaultValue="SportE Playhouse" />
            <TextInput label="City" defaultValue="Hyderabad" />
          </div>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [size, setSize] = useState<"sm" | "md" | "lg" | null>("md");
    return (
      <>
        <div className="flex gap-3">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Button key={s} variant="secondary" onClick={() => setSize(s)}>
              Open {s}
            </Button>
          ))}
        </div>
        <Modal
          open={size !== null}
          onClose={() => setSize(null)}
          size={size ?? "md"}
          title={`Size: ${size ?? ""}`}
          description="Max width is 400 / 512 / 640px; on small screens it shrinks to fit with a 16px gutter."
          footer={<Button onClick={() => setSize(null)}>Got it</Button>}
        />
      </>
    );
  },
};

export const Confirm: Story = {
  name: "ConfirmDialog",
  parameters: { controls: { disable: true } },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Publish schedule</Button>
        <ConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          title="Publish this schedule?"
          message="Customers will be able to book the new slots right away."
          confirmLabel="Publish"
        />
      </>
    );
  },
};

export const ConfirmDestructive: Story = {
  name: "ConfirmDialog (destructive, with loading)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const confirm = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 1500);
    };
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete venue
        </Button>
        <ConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={confirm}
          title="Delete SportE Playhouse?"
          message="This removes the venue and cancels its upcoming bookings. This can't be undone."
          confirmLabel="Delete venue"
          destructive
          isLoading={loading}
        />
      </>
    );
  },
};
