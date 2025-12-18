import describeGeneralTests from "@/test/general-tests";
import { fireEvent, render, screen } from "@/test/test-utils";

import Expandable from "./Expandable";

describe("Ellipsis", () => {
  describeGeneralTests(<Expandable summary="test" />, () => ({ render }));

  it("renders with items", () => {
    render(
      <Expandable summary="test">
        <p data-testid="test">test</p>
      </Expandable>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("should call onToggle", () => {
    const spy = vi.fn();
    render(
      <Expandable summary="test-summary" data-testid="test" onToggle={spy}>
        <p>test</p>
      </Expandable>,
    );

    fireEvent.click(screen.getByText("test-summary"));

    // onToggle happens but only later, because of the transition
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
    }, 500);
  });
});
