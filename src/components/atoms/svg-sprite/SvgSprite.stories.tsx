import iconSample2 from "@tabler/icons/outline/arrow-right-circle.svg";

import type { Meta, StoryObj } from "@storybook/nextjs";

import iconSample from "./../../../../public/img/logo-sprite.svg";
import SvgSprite from "./SvgSprite";

const icons = {
  iconSample,
  iconSample2,
} as const;

const meta: Meta<typeof SvgSprite> = {
  tags: ["autodocs"],
  title: "UI/Atoms/Svg Sprite",
  component: SvgSprite,
  argTypes: {
    src: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: "select",
        labels: Object.entries(icons).reduce<Record<string, string>>((labels, [name, value]) => {
          labels[name] = value.id;
          return labels;
        }, {}),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SvgSprite>;

export const Default: Story = {
  args: {
    src: iconSample,
    title: "Svg icon",
  },
  render: (args) => <SvgSprite {...args} style={{ width: "2rem", height: "2rem" }} />,
};
