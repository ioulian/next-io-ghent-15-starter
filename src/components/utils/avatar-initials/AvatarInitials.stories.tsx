import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FC } from "react";

import { getAvatarInitials } from "./AvatarInitials.utilities";

const AvatarInitials: FC<{
  initials: string;
  backgroundColor: string;
  textColor?: string;
}> = ({ initials, backgroundColor, textColor }) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      style={{ width: 42, height: 42, borderRadius: "50%" }}
      src={getAvatarInitials(initials, backgroundColor, textColor)}
      alt=""
    />
  );
};

const meta: Meta<typeof AvatarInitials> = {
  title: "UI/Utils/Avatar Initials",
  component: AvatarInitials,
};
export default meta;
type Story = StoryObj<typeof AvatarInitials>;

export const Example: Story = {
  args: {
    backgroundColor: "rgb(3, 131, 135)",
    textColor: "#fff",
    initials: "YA",
  },
};
