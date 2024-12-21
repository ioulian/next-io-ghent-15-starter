/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import ButtonGroup from "./ButtonGroup";

describe("ButtonGroup", () => {
  it("renders", () => {
    render(<ButtonGroup data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<ButtonGroup data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<ButtonGroup data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders with items", () => {
    render(
      <ButtonGroup data-testid="test">
        <button data-testid="button1" type="button">
          Button 1
        </button>
        asdf
        <button data-testid="button2" type="button">
          Button 2
        </button>
      </ButtonGroup>,
    );
    expect(screen.getByTestId("button1")).toBeInTheDocument();
    expect(screen.getByTestId("button2")).toBeInTheDocument();
  });
});
