import { getBuildId } from "@/utils/next";

describe("next", () => {
  it("gets correct buildId", () => {
    process.env.NEXT_PUBLIC_CUSTOM_BUILD_ID = "test";
    expect(getBuildId()).toEqual("test");
    process.env.IS_STORYBOOK = "true";
    expect(getBuildId()).toEqual("development");
  });
});
