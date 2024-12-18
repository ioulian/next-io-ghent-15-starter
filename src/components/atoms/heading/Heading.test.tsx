/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Heading from "./Heading";

describe("Heading", () => {
  it("renders", () => {
    render(<Heading data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<Heading data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<Heading data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders with items", () => {
    render(
      <Heading>
        <span data-testid="test">test</span>
      </Heading>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders as different tag", () => {
    render(
      <Heading data-testid="test" type="h1">
        test
      </Heading>,
    );
    expect(screen.getByTestId("test").tagName).toBe("H1");
  });

  it("will throw an error if type <p> or <span> is used without providing size param", () => {
    render(
      <Heading data-testid="test" type="span" size="h2">
        test
      </Heading>,
    );
    expect(screen.getByTestId("test").tagName).toBe("SPAN");

    const t = () => {
      render(<Heading type="span">test</Heading>);
    };
    expect(t).toThrow("Size argument is required when rendering as <p> or <span>");
  });
});
