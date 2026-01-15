import { getAvatarInitials } from "./AvatarInitials.utilities";

describe("utilities", () => {
  it("generates a correct svg", () => {
    const value = getAvatarInitials("TE");
    expect(value).toMatchSnapshot();
  });
});
