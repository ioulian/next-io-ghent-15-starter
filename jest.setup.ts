import "@testing-library/jest-dom";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

//global.ResizeObserver = jest.fn().mockImplementation(() => ({
//  observe: jest.fn(),
//  unobserve: jest.fn(),
//  disconnect: jest.fn(),
//}));

// @ts-expect-error This doesn't matter here
window.__webpack_public_path__ = "/";
