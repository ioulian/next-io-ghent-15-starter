type Messages = typeof import("./messages/en-GB/common.json") &
  typeof import("./messages/en-GB/app.json");

declare global {
  // Use type safe message keys with `next-intl`
  // eslint-disable-next-line
  interface IntlMessages extends Messages {}
}

// eslint-disable-next-line
let __webpack_public_path__: string;

declare namespace React {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
