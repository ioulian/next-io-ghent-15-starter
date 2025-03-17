/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/react";

import Paragraph from "@/components/atoms/paragraph/Paragraph";
import Heading from "@/components/atoms/heading/Heading";
import ButtonGroup from "@/components/molecules/button-group/ButtonGroup";
import Card from "@/components/molecules/card/Card";
import LinkButton from "@/components/atoms/link-button/LinkButton";
import Button from "@/components/atoms/button/Button";

import CardSlider from "./CardSlider";

const meta: Meta<typeof CardSlider> = {
  title: "UI/Blocks/CardSlider",
  component: CardSlider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => {
    return (
      <CardSlider action={<Button>Discover more</Button>}>
        <Card
          // eslint-disable-next-line @next/next/no-img-element
          header={<img src="https://placehold.co/600x400/EEE/31343C" alt="" />}
          footer={
            <ButtonGroup>
              <LinkButton variant="simple" size="base">
                Read more
              </LinkButton>
            </ButtonGroup>
          }
        >
          <Heading type="h2" size="h5">
            Lorem ipsum
          </Heading>
          <Paragraph>
            Lorem ipum dolores ornare sem lacinia quam <strong>venenatis vestibulum</strong>.
          </Paragraph>
        </Card>
        <Card
          // eslint-disable-next-line @next/next/no-img-element
          header={<img src="https://placehold.co/600x400/EEE/31343C" alt="" />}
          footer={
            <ButtonGroup>
              <LinkButton variant="simple" size="base">
                Read more
              </LinkButton>
            </ButtonGroup>
          }
        >
          <Heading type="h2" size="h5">
            Lorem ipsum
          </Heading>
          <Paragraph>
            Lorem ipum dolores ornare sem lacinia quam <strong>venenatis vestibulum</strong>. Morbi
            leo risus, porta ac consectetur ac vestibulum purus sit amet fermentum. Fusce dapibus,
            tellus ac cursus commodo.
          </Paragraph>
        </Card>
        <Card
          // eslint-disable-next-line @next/next/no-img-element
          header={<img src="https://placehold.co/600x400/EEE/31343C" alt="" />}
          footer={
            <ButtonGroup>
              <LinkButton variant="simple" size="base">
                Read more
              </LinkButton>
            </ButtonGroup>
          }
        >
          <Heading type="h2" size="h5">
            Lorem ipsum
          </Heading>
          <Paragraph>
            Lorem ipum dolores ornare sem lacinia quam <strong>venenatis vestibulum</strong>. Morbi
            leo risus, porta ac consectet
          </Paragraph>
        </Card>
        <Card
          // eslint-disable-next-line @next/next/no-img-element
          header={<img src="https://placehold.co/600x400/EEE/31343C" alt="" />}
          footer={
            <ButtonGroup>
              <LinkButton variant="simple" size="base">
                Read more
              </LinkButton>
            </ButtonGroup>
          }
        >
          <Heading type="h2" size="h5">
            Lorem ipsum
          </Heading>
          <Paragraph>
            Lorem ipum dolores ornare sem lacinia quam <strong>venenatis vestibulum</strong>. Morbi
            leo risus, porta ac consectet
          </Paragraph>
        </Card>
        <Card
          // eslint-disable-next-line @next/next/no-img-element
          header={<img src="https://placehold.co/600x400/EEE/31343C" alt="" />}
          footer={
            <ButtonGroup>
              <LinkButton variant="simple" size="base">
                Read more
              </LinkButton>
            </ButtonGroup>
          }
        >
          <Heading type="h2" size="h5">
            Lorem ipsum
          </Heading>
          <Paragraph>
            Lorem ipum dolores ornare sem lacinia quam <strong>venenatis vestibulum</strong>. Morbi
            leo risus, porta ac consectet
          </Paragraph>
        </Card>
      </CardSlider>
    );
  },
};
