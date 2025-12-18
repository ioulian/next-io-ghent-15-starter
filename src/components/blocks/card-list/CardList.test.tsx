import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import CardList from "./CardList";

describe("CardList", () => {
  describeGeneralTests(
    <CardList>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </CardList>,
    () => ({ render }),
  );

  it("renders with items", () => {
    render(
      <CardList>
        <div data-testid="test">1</div>
        <div>2</div>
        <div>3</div>
      </CardList>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with footer", () => {
    render(
      <CardList footer={<span data-testid="test">test</span>}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </CardList>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
