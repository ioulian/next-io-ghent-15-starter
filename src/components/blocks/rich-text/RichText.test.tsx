/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

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
