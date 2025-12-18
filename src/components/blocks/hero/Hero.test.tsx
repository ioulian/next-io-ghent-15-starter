import describeGeneralTests from "@/test/general-tests";
import { render, screen } from "@/test/test-utils";

import Hero from "./Hero";

describe("Hero", () => {
  describeGeneralTests(
    <Hero>
      <p>Test</p>
    </Hero>,
    () => ({ render }),
  );

  it("renders with items", () => {
    render(
      <Hero>
        <p data-testid="test">test</p>
      </Hero>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
