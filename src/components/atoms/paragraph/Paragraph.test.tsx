/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

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
