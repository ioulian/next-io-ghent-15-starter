/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Tag from "./Tag";

describe("Tag", () => {
  it("renders", () => {
    render(<Tag data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(
      <Tag data-testid="test" className="test">
        test
      </Tag>,
    );
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(
      <Tag data-testid="test" data-foo="bar">
        test
      </Tag>,
    );
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });
});
