import { vitest } from "vitest";

import "@testing-library/jest-dom";

vitest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
