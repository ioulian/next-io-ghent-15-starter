import { presetDefault } from "./SmoothShadow.presets";
import { createSmoothShadow } from "./SmoothShadow.utilities";

describe("utilities", () => {
  it("generates a correct easing gradient", () => {
    const value = createSmoothShadow(presetDefault);
    expect(value).toMatchSnapshot();
  });
});
