/* eslint-disable i18next/no-literal-string */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import describeGeneralTests from "@/test/generalTests";

import MediaText from "./MediaText";

describe("MediaText", () => {
  describeGeneralTests(
    <MediaText>
      <p>Test</p>
      <p>Test</p>
    </MediaText>,
    () => ({ render }),
  );

  it("renders with items", () => {
    render(
      <MediaText>
        <p data-testid="test">test</p>
        <p>test</p>
      </MediaText>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("warns when 2 children are not passed", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <MediaText>
        <p>test</p>
      </MediaText>,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });
});
