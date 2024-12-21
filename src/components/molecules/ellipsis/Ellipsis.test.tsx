/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import Ellipsis from "./Ellipsis";

describe("Ellipsis", () => {
  it("renders", () => {
    render(<Ellipsis data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<Ellipsis data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<Ellipsis data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders with items", () => {
    render(
      <Ellipsis>
        <p data-testid="test">test</p>
      </Ellipsis>,
    );
    expect(screen.queryAllByTestId("test")[0]).toBeInTheDocument();
  });

  it("should call onToggle", () => {
    const spy = jest.fn();
    render(
      <Ellipsis data-testid="test" onToggle={spy}>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </Ellipsis>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(spy).toHaveBeenCalled();
  });
});
