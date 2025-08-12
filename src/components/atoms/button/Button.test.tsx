import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";

import describeGeneralTests from "@/test/generalTests";

import Button from "./Button";

describe("Button", () => {
  describeGeneralTests(<Button>test</Button>, () => ({ render }));

  it("should call onClick", () => {
    const spy = vi.fn();
    render(
      <Button data-testid="test" onClick={spy}>
        test
      </Button>,
    );

    fireEvent.click(screen.getByTestId("test"));

    expect(spy).toHaveBeenCalled();
  });

  it("should not call onClick when button is disabled", () => {
    const spy = vi.fn();
    render(
      <Button data-testid="test" disabled onClick={spy}>
        test
      </Button>,
    );

    fireEvent.click(screen.getByTestId("test"));

    expect(spy).not.toHaveBeenCalled();
  });

  it("should not call onClick when button is loading", () => {
    const spy = vi.fn();
    render(
      <Button data-testid="test" isLoading onClick={spy}>
        test
      </Button>,
    );

    fireEvent.click(screen.getByTestId("test"));

    expect(spy).not.toHaveBeenCalled();
  });

  it("renders with iconBefore", async () => {
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
