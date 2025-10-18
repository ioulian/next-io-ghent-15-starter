import { get } from "es-toolkit/compat";
import { flattie } from "flattie";

import { Leaves } from "@/types/helpers";

// Utils

/**
 * Converts css variable to number only.
 */
export const getVariableAsNumber = (name: VariableNameType): number => {
  return parseInt(getVariable(name).replace("px", "").replace("rem", "").replace("ms", ""), 10);
};

export const themeColors = (path: string) => {
  const value = get(cssVariables, path);

  return Object.keys(value).reduce(
    (all, current) => ({ ...all, [current]: `var(--${path.replaceAll(".", "-")}-${current})` }),
    {},
  );
};

export const cssVariables = {
  color: {
    white: "#fff",
    black: "#000",
    blue: {
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
    gray: {
      "50": "#FCFCFD",
      "100": "#FAFAFA",
      "200": "#F4F5F5",
      "300": "#EFEFF1",
      "400": "#E7E8E9",
      "500": "#E2E3E5",
      "600": "#CCCED1",
      "700": "#B1B4B9",
      "800": "#93979F",
      "900": "#686C74",
      "950": "#4D5056",
    },
    green: {
      "50": "#F1F9F4",
      "100": "#DCEFE3",
      "200": "#B5DEC4",
      "300": "#83C99C",
      "400": "#4BAA6E",
      "500": "#367B4F",
      "600": "#306E47",
      "700": "#2A603E",
      "800": "#224E32",
      "900": "#173522",
      "950": "#132B1B",
    },
    red: {
      "50": "#FDF3F2",
      "100": "#FAE7E5",
      "200": "#F4CBC8",
      "300": "#ECA39D",
      "400": "#E17065",
      "500": "#B42E23",
      "600": "#9E291F",
      "700": "#8D251B",
      "800": "#781F17",
      "900": "#49130E",
      "950": "#330D0A",
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
  elevation: {
    "01": "0px 0px 6px 0px rgba(0, 0, 0, 0.02), 0px 2px 4px 0px rgba(0, 0, 0, 0.08)",
    "02": "0px 0px 4px 0px rgba(0, 0, 0, 0.04), 0px 4px 8px 0px rgba(0, 0, 0, 0.06)",
    "03": "0px 0px 4px 0px rgba(0, 0, 0, 0.04), 0px 8px 16px 0px rgba(0, 0, 0, 0.08)",
  },
  zIndex: {
    header: "10",
    dialog: "20",
    floater: "30",
  },
  radius: {
    "01": "4px",
    "02": "8px",
    "03": "16px",
  },
  tooltip: {
    offset: "10px",
  },
  popover: {
    offset: "10px",
  },
  dropdown: {
    offset: "10px",
  },
  floater: {
    shift: "5px",
    flip: "5px",
    arrow: {
      size: "10px",
      padding: "10px",
    },
  },
};

// Base variables
export type VariableNameType = Leaves<typeof cssVariables>;
export const flatCssVariables: Record<VariableNameType, string> = flattie(cssVariables);

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
export const getVariable = (name: VariableNameType): string => flatCssVariables[name];

// Theme variables (semantic variables)
enum Theme {
  Default = "default",
}

const themeVariables: Record<Theme, Record<string, unknown>> = {
  default: {
    color: {
      body: "var(--color-gray-950)",
      background: "var(--color-white)",
      overlay: "rgba(17, 26, 39, 0.7)",
      primary: themeColors("color.blue"),
      secondary: themeColors("color.gray"),
      positive: themeColors("color.green"),
      negative: themeColors("color.red"),
    },
    button: {
      primary: {
        background: "var(--color-primary-500)",
        border: "var(--color-primary-500)",
        color: "var(--color-white)",
        hover: {
          background: "var(--color-primary-400)",
          border: "var(--color-primary-400)",
          color: "var(--color-white)",
        },
      },
      secondary: {
        background: "var(--color-secondary-500)",
        border: "var(--color-secondary-500)",
        color: "var(--color-body)",
        hover: {
          background: "var(--color-secondary-400)",
          border: "var(--color-secondary-400)",
          color: "var(--color-body)",
        },
      },
      negative: {
        background: "var(--color-negative-500)",
        border: "var(--color-red-500)",
        color: "var(--color-white)",
        hover: {
          background: "var(--color-negative-400)",
          border: "var(--color-negative-400)",
          color: "var(--color-white)",
        },
      },
      positive: {
        background: "var(--color-positive-500)",
        border: "var(--color-positive-500)",
        color: "var(--color-white)",
        hover: {
          background: "var(--color-positive-400)",
          border: "var(--color-positive-400)",
          color: "var(--color-white)",
        },
      },
      outline: {
        border: "var(--color-secondary-500)",
        color: "var(--color-body)",
        hover: {
          border: "var(--color-secondary-400)",
          color: "var(--color-body)",
        },
      },
      ghost: {
        color: "var(--color-body)",
        hover: {
          background: "var(--color-secondary-400)",
          border: "var(--color-secondary-400)",
        },
      },
    },
    form: {
      input: {
        color: "var(--color-body)",
        border: "var(--color-secondary-900)",
        background: "var(--color-secondary-50)",
      },
      select: {
        indicator: "var(--color-body)",
      },
      asterisk: "var(--color-negative-500)",
      outline: "var(--color-primary-600)",
      checkbox: {
        checked: {
          border: "var(--color-primary-500)",
          background: "var(--color-primary-500)",
          color: "var(--color-white)",
        },
      },
      error: "var(--color-negative-500)",
      requiredMessage: {
        value: "var(--form-error)",
      },
    },
  },
};

export type ThemeVariableNameType = Leaves<(typeof themeVariables)[Theme.Default]>;
export const flatThemeVariables: Record<ThemeVariableNameType, string> = flattie(
  themeVariables[Theme.Default],
);

export const getThemeClass = (theme: Theme) => `theme--${theme}`;
export const getThemeCss = () => {
  console.log(themeColors("color.blue"));
  return `
@layer theme {
  ${Object.values(Theme)
    .map(
      (theme) => `
    .${getThemeClass(theme)} {
      ${Object.entries(flattie(themeVariables[theme]))
        .map(
          ([variable, value]) => `
        --${variable.replaceAll(".", "-")}: ${value};
      `,
        )
        .join("\n")}
    }
    `,
    )
    .join("\n")}
}
`;
};
export const getThemeVariable = (name: ThemeVariableNameType): string => flatThemeVariables[name];
