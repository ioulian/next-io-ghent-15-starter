/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

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
