/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/react";

import Heading from "@/components/atoms/heading/Heading";
import Button from "@/components/atoms/button/Button";
import Text from "@/components/atoms/text/Text";

import MediaText from "./MediaText";

const meta: Meta<typeof MediaText> = {
  title: "UI/Blocks/Media with text",
  component: MediaText,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof MediaText>;

export const Default: Story = {
  render: () => {
    return (
      <MediaText>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
        <Text>
          <Heading type="h2" size="h1">
            Lorem ipsum dolores
          </Heading>
          <p>
            Lorem ipum dolores ornare sem <strong>lacinia quam venenatis vestibulum</strong>. Morbi
            leo risus, porta ac consectetur ac vestibulum purus sit amet fermentum. Fusce dapibus,
            tellus ac cursus commodo.
          </p>
          <p>
            <Button>Button</Button>
          </p>
        </Text>
      </MediaText>
    );
  },
};

export const Reversed: Story = {
  render: () => {
    return (
      <MediaText>
        <Text>
          <Heading type="h2" size="h1">
            Lorem ipsum dolores
          </Heading>
          <p>
            Lorem ipum dolores ornare sem <strong>lacinia quam venenatis vestibulum</strong>. Morbi
            leo risus, porta ac consectetur ac vestibulum purus sit amet fermentum. Fusce dapibus,
            tellus ac cursus commodo.
          </p>
          <p>
            <Button>Button</Button>
          </p>
        </Text>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
      </MediaText>
    );
  },
};

export const WithCoverMedia: Story = {
  render: () => {
    return (
      <MediaText coverMedia>
        <Text>
          <Heading type="h2" size="h1">
            Lorem ipsum dolores
          </Heading>
          <p>
            Lorem ipum dolores ornare sem <strong>lacinia quam venenatis vestibulum</strong>. Morbi
            leo risus, porta ac consectetur ac vestibulum purus sit amet fermentum. Fusce dapibus,
            tellus ac cursus commodo.
          </p>
          <p>
            <Button>Button</Button>
          </p>
        </Text>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
      </MediaText>
    );
  },
};
