import type { Preview } from "@storybook/react";
import "../index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "canvas",
      values: [
        { name: "canvas", value: "#F8F9FA" },
        { name: "white", value: "#FFFFFF" },
        { name: "dark", value: "#101828" },
      ],
    },
    a11y: {
      // Storybook a11y addon runs axe-core against every story automatically.
      test: "todo",
    },
  },
};

export default preview;
