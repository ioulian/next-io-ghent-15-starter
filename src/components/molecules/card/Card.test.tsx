/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import Card from "./Card";

describe("Card", () => {
  describeGeneralTests(<Card>test</Card>, () => ({ render }));

  it("renders with items", () => {
    render(
      <Card>
        <span data-testid="test">test</span>
      </Card>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with header", () => {
    render(<Card header={<span data-testid="test">test</span>} />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("renders with footer", () => {
    render(<Card footer={<span data-testid="test">test</span>} />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
