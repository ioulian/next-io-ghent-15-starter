/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Spinner from "./Spinner";

describe("Spinner", () => {
  it("renders", () => {
    render(<Spinner data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<Spinner data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<Spinner data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders with label", () => {
    render(
      <Spinner>
        <span data-testid="test-label">Test</span>
      </Spinner>,
    );
    expect(screen.getByTestId("test-label")).toBeInTheDocument();
  });

  it("renders with aria-label", () => {
    render(<Spinner data-testid="test">Test</Spinner>);
    expect(screen.getByTestId("test").getAttribute("aria-label")).toBe("Test");
  });
});
