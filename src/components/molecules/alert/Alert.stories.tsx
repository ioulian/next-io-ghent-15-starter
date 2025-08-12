import iconSettings from "@tabler/icons/outline/settings.svg";

import type { Meta, StoryObj } from "@storybook/nextjs";

import Heading from "@/components/atoms/heading/Heading";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import Text from "@/components/atoms/text/Text";

import Alert from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "UI/Molecules/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => <Alert {...args} />,
  args: {
    variant: "normal",
    children: (
      <>
        <Heading type="h2" size="h3">
          Title
        </Heading>
        <Text>
          <p>Alert description</p>
        </Text>
      </>
    ),
  },
};

export const NoIcon: Story = {
  render: (args) => <Alert {...args} />,
  args: {
    variant: "normal",
    icon: false,
    children: (
      <>
        <Heading type="h2" size="h3">
          Title
        </Heading>
        <Text>
          <p>Alert description</p>
        </Text>
      </>
    ),
  },
};

export const CustomIcon: Story = {
  render: (args) => <Alert {...args} />,
  args: {
    variant: "normal",
    icon: <SvgSprite src={iconSettings} aria-hidden />,
    children: (
      <>
        <Heading type="h2" size="h3">
          Title
        </Heading>
        <Text>
          <p>Alert description</p>
        </Text>
      </>
    ),
  },
};
