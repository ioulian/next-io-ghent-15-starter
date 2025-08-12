import { act, render, screen, waitFor } from "@testing-library/react";

import LoaderDelay from "./LoaderDelay";

describe("LoaderDelay", () => {
  it("renders content only after a few milliseconds", async () => {
    await act(async () => {
      return render(
        <LoaderDelay delay={100}>
          <span data-testid="test">test</span>
        </LoaderDelay>,
      );
    });

    expect(screen.queryByTestId("test")).not.toBeInTheDocument();
    await waitFor(async () => {
      expect(await screen.getByTestId("test")).toBeInTheDocument();
    });
  });
});
