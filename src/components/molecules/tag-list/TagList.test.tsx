/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Tag from "@/components/atoms/tag/Tag";

import TagList from "./TagList";

describe("TagList", () => {
  it("renders", () => {
    render(<TagList data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with custom class", () => {
    render(<TagList data-testid="test" className="test" />);
    expect(screen.getByTestId("test")).toHaveClass("test");
  });

  it("renders with custom prop", () => {
    render(<TagList data-testid="test" data-foo="bar" />);
    expect(screen.getByTestId("test")).toHaveAttribute("data-foo", "bar");
  });

  it("renders with items", () => {
    render(
      <TagList data-testid="test">
        <Tag data-testid="tag1">Tag 1</Tag>
        <Tag data-testid="tag2">Tag 2</Tag>
        <Tag data-testid="tag3">Tag 3</Tag>
      </TagList>,
    );
    expect(screen.getByTestId("tag1")).toBeInTheDocument();
    expect(screen.getByTestId("tag2")).toBeInTheDocument();
    expect(screen.getByTestId("tag3")).toBeInTheDocument();
  });
});
