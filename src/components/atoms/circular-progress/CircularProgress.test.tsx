/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import CircularProgress from "./CircularProgress";

describe("CircularProgress", () => {
  it("renders", () => {
    render(<CircularProgress data-testid="test" percent={0} />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(
      <CircularProgress data-testid="test" className="test" percent={0.5}>
        test
      </CircularProgress>,
    );
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(
      <CircularProgress data-testid="test" data-foo="bar" percent={0.5}>
        test
      </CircularProgress>,
    );
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });
});
