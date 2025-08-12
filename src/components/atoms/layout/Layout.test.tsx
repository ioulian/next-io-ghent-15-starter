import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import Layout from "./Layout";

describe("Layout", () => {
  describeGeneralTests(
    <Layout>
      <div>Col 1</div>
    </Layout>,
    () => ({ render }),
  );

  it("renders with items", () => {
    render(
      <Layout>
        <div data-testid="test">test</div>
      </Layout>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("warns when variant cols and children.length mismatch", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <Layout variant="twoCol">
        <div>test</div>
      </Layout>,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });
});
