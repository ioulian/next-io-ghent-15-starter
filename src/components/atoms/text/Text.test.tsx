import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import Text from "./Text";

describe("Text", () => {
  describeGeneralTests(<Text>test</Text>, () => ({ render }));

  it("renders with items", () => {
    render(
      <Text>
        <span data-testid="test">test</span>
      </Text>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
