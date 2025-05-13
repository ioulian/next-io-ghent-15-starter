/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

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
