/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Alert from "./Alert";

describe("Alert", () => {
  it("renders", () => {
    render(<Alert data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(
      <Alert data-testid="test" className="test">
        test
      </Alert>,
    );
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(
      <Alert data-testid="test" data-foo="bar">
        test
      </Alert>,
    );
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders without icon", () => {
    render(<Alert icon={false}>test</Alert>);
    expect(screen.getByRole("alert").querySelector("svg")).toBe(null);
  });

  it("renders with customIcon", () => {
    render(<Alert icon={<span data-testid="test" />}>test</Alert>);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
