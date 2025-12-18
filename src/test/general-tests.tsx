import { cloneElement, ReactElement, ReactNode } from "react";

import { RenderResult, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const describeGeneralTests = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Element: ReactElement<any>,
  getOptions: () => { render: (ui: ReactNode) => RenderResult },
) => {
  const { render } = getOptions();
  describe("Base UI component API", () => {
    it("renders", () => {
      render(
        cloneElement(Element, {
          "data-testid": "test",
        }),
      );
      expect(screen.getByTestId("test")).toBeInTheDocument();
    });

    it("renders with custom class", () => {
      render(
        cloneElement(Element, {
          "data-testid": "test",
          className: "test",
        }),
      );
      expect(screen.getByTestId("test")).toHaveClass("test");
    });

    it("renders with custom prop", () => {
      render(
        cloneElement(Element, {
          "data-testid": "test",
          "data-foo": "bar",
        }),
      );
      expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
    });
  });
};

export default describeGeneralTests;
