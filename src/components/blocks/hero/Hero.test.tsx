/* eslint-disable i18next/no-literal-string */

import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

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
