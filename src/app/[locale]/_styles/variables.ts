import { flatten } from "flat";

import { Leaves } from "@/types/helpers";

export const cssVariables = {
  color: {
    white: "#fff",
    black: "#000",
    primary: {
      "50": "#F1F4F9",
      "100": "#E2E9F3",
      "200": "#C2D0E5",
      "300": "#9BB2D5",
      "400": "#6C8EC1",
      "500": "#314C74",
      "600": "#2D466C",
      "700": "#243856",
      "800": "#20314B",
      "900": "#111A27",
      "950": "#111A27",
    },
  },
  duration: {
    "perceptive-instant": "85ms",
    fast: "100ms" /* Use for fast hover effects */,
    normal: "250ms",
    slow: "500ms" /* Use for big transitions (page switch) */,
    "user-flow": "5000ms" /* Below this point feels like a coherent application flow */,
    "attention-span": "12000ms" /* After that point, the user loses his/her attention */,
  },
  easing: {
    "swift-alt": "cubic-bezier(0.55, 0, 0.1, 1)",
    "swift-move": "cubic-bezier(0.4, 0, 0.2, 1)",
    "swifter-move": "cubic-bezier(0.4, 0, 0, 1)",
    "heavy-move": "cubic-bezier(07, 0, 0.6, 1)",
    "swift-out": "cubic-bezier(0, 0, 0.2, 1)",
    "swift-in": "cubic-bezier(0.4, 0, 1, 1)",
  },
  font: {
    body: "system-ui, sans-serif",
    heading: "system-ui, sans-serif",
  },
};

export type VariableNameType = Leaves<typeof cssVariables>;

export const flatCssVariables: Record<VariableNameType, string> = flatten(cssVariables);

export const getVariable = (name: VariableNameType): string => flatCssVariables[name];

// We can also set delimiter to "-" in "flatten", but changing the type to support this syntax is more work
export const getCss = () => `
@layer variables {
  :root {
    ${Object.entries(flatCssVariables)
      .map(([name, value]) => `--${name.replaceAll(".", "-")}: ${value};`)
      .join("\n")}
  }
}
`;
