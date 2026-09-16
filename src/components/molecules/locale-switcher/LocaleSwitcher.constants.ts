export const LOCALE_CHANGE_TRANSITION_TYPES = ["locale-change"];
export const LOCALE_INDICATOR_VIEW_TRANSITION_NAME = "locale-switcher-indicator";
export const LOCALE_INDICATOR_VIEW_TRANSITION_CLASS = "locale-indicator";
export const LOCALE_INDICATOR_VIEW_TRANSITION_SHARE = {
  "locale-change": LOCALE_INDICATOR_VIEW_TRANSITION_CLASS,
  default: "none",
} as const;
