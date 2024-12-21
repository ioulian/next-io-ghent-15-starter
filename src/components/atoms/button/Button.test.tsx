/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  it("renders", () => {
    render(<Button data-testid="test">test</Button>);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(
      <Button data-testid="test" className="test">
        test
      </Button>,
    );
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(
      <Button data-testid="test" data-foo="bar">
        test
      </Button>,
    );
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("should call onClick", () => {
    const spy = jest.fn();
    render(
      <Button data-testid="test" onClick={spy}>
        test
      </Button>,
    );

    fireEvent.click(screen.getByTestId("test"));

    expect(spy).toHaveBeenCalled();
  });

  it("should not call onClick when button is disabled", () => {
    const spy = jest.fn();
    render(
      <Button data-testid="test" disabled onClick={spy}>
        test
      </Button>,
    );

    fireEvent.click(screen.getByTestId("test"));

    expect(spy).not.toHaveBeenCalled();
  });

  it("should not call onClick when button is loading", () => {
    const spy = jest.fn();
    render(
      <Button data-testid="test" isLoading onClick={spy}>
        test
      </Button>,
    );

    fireEvent.click(screen.getByTestId("test"));

    expect(spy).not.toHaveBeenCalled();
  });

  it("renders with iconBefore", () => {
    render(<Button iconBefore={<span data-testid="iconBefore">before</span>}>test</Button>);
    expect(screen.getByTestId("iconBefore")).toBeInTheDocument();
  });

  it("renders with iconAfter", () => {
    render(<Button iconAfter={<span data-testid="iconAfter">after</span>}>test</Button>);
    expect(screen.getByTestId("iconAfter")).toBeInTheDocument();
  });

  it("renders with iconOnly", () => {
    render(
      <Button iconOnly>
        <span data-testid="test">test</span>
      </Button>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
