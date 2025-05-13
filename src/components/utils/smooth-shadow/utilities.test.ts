import { presetDefault } from "./presets";
import { createSmoothShadow } from "./utilities";

describe("utilities", () => {
  it("generates a correct easing gradient", () => {
    const value = createSmoothShadow(presetDefault);
    expect(value).toMatchSnapshot();
  });
});
