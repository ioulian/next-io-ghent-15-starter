import type { Meta, StoryObj } from "@storybook/nextjs";

import Media from "./Media";

const meta: Meta<typeof Media> = {
  title: "Boilerplate/Blocks/Media",
  component: Media,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Media>;

export const Default: Story = {
  render: () => {
    return (
      <Media>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
      </Media>
    );
  },
};
