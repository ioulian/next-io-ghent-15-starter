/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import LinkButton from "./LinkButton";

describe("LinkButton", () => {
  it("renders", () => {
    render(<LinkButton data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(
      <LinkButton data-testid="test" className="test">
        test
      </LinkButton>,
    );
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(
      <LinkButton data-testid="test" data-foo="bar">
        test
      </LinkButton>,
    );
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders with iconBefore", () => {
    render(<LinkButton iconBefore={<span data-testid="iconBefore">before</span>}>test</LinkButton>);
    expect(screen.getByTestId("iconBefore")).toBeInTheDocument();
  });

  it("renders with iconAfter", () => {
    render(<LinkButton iconAfter={<span data-testid="iconAfter">after</span>}>test</LinkButton>);
    expect(screen.getByTestId("iconAfter")).toBeInTheDocument();
  });

  it("renders with iconOnly", () => {
    render(
      <LinkButton iconOnly>
        <span data-testid="test">test</span>
      </LinkButton>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
