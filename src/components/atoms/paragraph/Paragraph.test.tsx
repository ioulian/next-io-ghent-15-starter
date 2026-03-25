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

  it("clamps the number of lines", () => {
    render(<Paragraph maxLines={2}>test</Paragraph>);
    expect(screen.getByText("test").style.getPropertyValue("--paragraph-number-of-lines")).toBe("2");
  });
});
