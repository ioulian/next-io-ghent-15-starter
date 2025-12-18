import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import Paragraph from "./Paragraph";

describe("Paragraph", () => {
  describeGeneralTests(<Paragraph>test</Paragraph>, () => ({ render }));

  it("renders with items", () => {
    render(
      <Paragraph>
        <span data-testid="test">test</span>
      </Paragraph>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
