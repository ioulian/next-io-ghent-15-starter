/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Text from "./Text";

describe("Text", () => {
  it("renders", () => {
    render(<Text data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<Text data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<Text data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders with items", () => {
    render(
      <Text>
        <span data-testid="test">test</span>
      </Text>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
