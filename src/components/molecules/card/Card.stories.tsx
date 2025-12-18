import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Button from "@/components/atoms/button/Button";
import Heading from "@/components/atoms/heading/Heading";
import Paragraph from "@/components/atoms/paragraph/Paragraph";
import ButtonGroup from "@/components/molecules/button-group/ButtonGroup";

import Card from "./Card";

const meta: Meta<typeof Card> = {
  title: "UI/Molecules/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => {
    return (
      <Card
        style={{ maxWidth: "400px" }}
        // eslint-disable-next-line @next/next/no-img-element
        header={<img src="https://placehold.co/600x400/EEE/31343C" alt="" />}
        footer={
          <ButtonGroup>
            <Button>Primary Action</Button>
            <Button size="base" variant="simple">
              Cancel
            </Button>
          </ButtonGroup>
        }
      >
        <Heading type="h2" size="h5">
          Lorem ipsum
        </Heading>
        <Paragraph maxLines={4}>
          Lorem ipum dolores ornare sem lacinia quam <strong>venenatis vestibulum</strong>. Morbi leo risus, porta ac
          consectetur ac vestibulum purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo.
        </Paragraph>
      </Card>
    );
  },
};

export const Elevated: Story = {
  args: {
    padded: true,
    elevation: "02",
  },
  render: (args) => {
    return (
      <Card
        {...args}
        style={{ maxWidth: "400px" }}
        // eslint-disable-next-line @next/next/no-img-element
        header={<img src="https://placehold.co/600x400/EEE/31343C" alt="" />}
        footer={
          <ButtonGroup>
            <Button>Primary Action</Button>
            <Button size="base" variant="simple">
              Cancel
            </Button>
          </ButtonGroup>
        }
      >
        <Heading type="h2" size="h5">
          Lorem ipsum
        </Heading>
        <Paragraph maxLines={4}>
          Lorem ipum dolores ornare sem lacinia quam <strong>venenatis vestibulum</strong>. Morbi leo risus, porta ac
          consectetur ac vestibulum purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo.
        </Paragraph>
      </Card>
    );
  },
};
