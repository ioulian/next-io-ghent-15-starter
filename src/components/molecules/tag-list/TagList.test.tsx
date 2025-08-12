import { render, screen } from "@testing-library/react";

import Tag from "@/components/atoms/tag/Tag";
import describeGeneralTests from "@/test/generalTests";

import TagList from "./TagList";

describe("TagList", () => {
  describeGeneralTests(<TagList />, () => ({ render }));

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
