/* eslint-disable i18next/no-literal-string */

import { expect, userEvent, within } from "@storybook/test";

import type { Meta, StoryObj } from "@storybook/react";

import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";
import Heading from "@/components/atoms/heading/Heading";
import Text from "@/components/atoms/text/Text";
import Expandable from "@/components/molecules/expandable/Expandable";
import { wait } from "@/utils/promises";

import Accordion from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Organisms/Accordion",
  component: Accordion,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => {
    return (
      <Accordion>
        <Expandable
          summary={
            <Heading type="h3" size="h5">
              Lorem ipsum dolores 1
            </Heading>
          }
        >
          <Text>
            <p data-testid="test1">
              Content 1. Praesent 1 commodo cursus magna 1, vel scelerisque nisl consectetur et.
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec id elit
              non mi porta gravida at eget metus. Donec sed odio dui. Maecenas sed diam eget risus
              varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus commodo, tortor
              mauris condimentum nibh, ut feDonec id elit non mi porta gravida at eget metus.
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Curabitur
              blandit tempus porttitor.
            </p>
          </Text>
        </Expandable>
        <Expandable
          summary={
            <Heading type="h3" size="h5">
              Lorem ipsum dolores 2
            </Heading>
          }
        >
          <Text>
            <p data-testid="test2">
              Content 2. Praesent 2 commodo cursus magna 2, vel scelerisque nisl consectetur et.
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec id elit
              non mi porta gravida at eget metus.
            </p>
          </Text>
        </Expandable>
        <Expandable
          summary={
            <Heading type="h3" size="h5">
              Lorem ipsum dolores 3
            </Heading>
          }
        >
          <Text>
            <p data-testid="test3">
              Content 3. Praesent 3 commodo cursus magna 3, vel scelerisque nisl consectetur et.
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec id elit
              non mi porta gravida at eget metus. Donec sed odio dui. Maecenas sed diam eget risus
              varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus commodo, tortor
              mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam
              eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
              Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus eget urna
              mollis ornare vel eu leo. Donec id elit non mi porta gravida at eget metus. Vivamus
              sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Curabitur blandit
              tempus porttitor.
            </p>
          </Text>
        </Expandable>
      </Accordion>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Lorem ipsum dolores 1"));
    await wait(getVariableAsNumber("duration.slow"));
    await expect(canvas.getByTestId("test1")).toBeVisible();
    await expect(canvas.getByTestId("test2")).not.toBeVisible();
    await expect(canvas.getByTestId("test3")).not.toBeVisible();

    await userEvent.click(canvas.getByText("Lorem ipsum dolores 2"));
    await wait(getVariableAsNumber("duration.slow"));
    await expect(canvas.getByTestId("test1")).not.toBeVisible();
    await expect(canvas.getByTestId("test2")).toBeVisible();
    await expect(canvas.getByTestId("test3")).not.toBeVisible();

    await userEvent.click(canvas.getByText("Lorem ipsum dolores 3"));
    await wait(getVariableAsNumber("duration.slow"));
    await expect(canvas.getByTestId("test1")).not.toBeVisible();
    await expect(canvas.getByTestId("test2")).not.toBeVisible();
    await expect(canvas.getByTestId("test3")).toBeVisible();
  },
};
