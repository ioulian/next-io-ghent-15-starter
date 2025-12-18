import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import RichText from "./RichText";

describe("RichText", () => {
  describeGeneralTests(
    <RichText>
      <p>Test</p>
    </RichText>,
    () => ({ render }),
  );

  it("renders with items", () => {
    render(
      <RichText>
        <p data-testid="test">test</p>
      </RichText>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
