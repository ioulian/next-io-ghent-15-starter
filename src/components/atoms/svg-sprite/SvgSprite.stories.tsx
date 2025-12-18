import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SvgSprite from "./SvgSprite";

const icons = {
  logo: "logo",
  tablerChevronLeft: "tablerChevronLeft",
};

const meta: Meta<typeof SvgSprite> = {
  tags: ["autodocs"],
  title: "UI/Atoms/Svg Sprite",
  component: SvgSprite,
  argTypes: {
    name: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: "select",
        labels: Object.entries(icons).reduce<Record<string, string>>((labels, [name, value]) => {
          labels[name] = value;
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
    name: "logo",
    title: "Svg icon",
  },
  render: (args) => <SvgSprite {...args} style={{ width: "2rem", height: "2rem" }} />,
};
