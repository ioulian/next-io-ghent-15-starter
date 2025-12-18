import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import BaseBlock from "./BaseBlock";

describe("BaseBlock", () => {
  describeGeneralTests(
    <BaseBlock>
      <p>Test</p>
    </BaseBlock>,
    () => ({ render }),
  );

  it("renders with items", () => {
    render(
      <BaseBlock>
        <p data-testid="test">test</p>
      </BaseBlock>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
