import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import Media from "./Media";

describe("Media", () => {
  describeGeneralTests(
    <Media>
      <p>Test</p>
    </Media>,
    () => ({ render }),
  );

  it("renders with items", () => {
    render(
      <Media>
        <p data-testid="test">test</p>
      </Media>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
