import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

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
