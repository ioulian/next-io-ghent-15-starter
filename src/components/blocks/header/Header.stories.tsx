/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/react";

import Button from "@/components/atoms/button/Button";

import Header from "./Header";
import { Default as MenuBarStory } from "./../../organisms/menu-bar/MenuBar.stories";

const meta: Meta<typeof Header> = {
  title: "Boilerplate/Blocks/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: () => {
    return (
      <Header
        topMenu={
          <>
            <a href="#">Menu item 1</a>
            <a href="#">Menu item 2</a>
            <a href="#">Menu item 3</a>
          </>
        }
        actions={<Button>Contact</Button>}
      >
        {// @ts-expect-error We know it works
        MenuBarStory?.render()}
      </Header>
    );
  },
};
