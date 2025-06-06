/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/nextjs";

import Button from "@/components/atoms/button/Button";
import Heading from "@/components/atoms/heading/Heading";
import Text from "@/components/atoms/text/Text";

import Hero from "./Hero";

const meta: Meta<typeof Hero> = {
  title: "Boilerplate/Blocks/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  render: () => {
    return (
      <Hero
        // eslint-disable-next-line @next/next/no-img-element
        media={<img src="https://placehold.co/600x400/EEE/31343C" alt="" />}
      >
        <Text>
          <Heading type="h2" size="h1">
            Lorem ipsum dolores
          </Heading>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue <strong>lacinia quam venenatis vestibulum</strong>. Donec id elit non mi
            porta gravida at eget metus. Donec sed odio dui.
          </p>
          <p>
            <Button>Button</Button>
          </p>
        </Text>
      </Hero>
    );
  },
};
