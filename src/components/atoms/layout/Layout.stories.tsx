/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/react";

import Layout from "./Layout";

const meta: Meta<typeof Layout> = {
  title: "UI/Atoms/Layout",
  component: Layout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  render: (args) => (
    <Layout {...args}>
      <div>Col 1</div>
      <div>Col 2</div>
      <div>Col 3</div>
      <div>Col 4</div>
      <div>Col 5</div>
      <div>Col 6</div>
      <div>Col 7</div>
      <div>Col 8</div>
      <div>Col 9</div>
      <div>Col 10</div>
      <div>Col 11</div>
      <div>Col 12</div>
    </Layout>
  ),
  args: {
    debug: true,
  },
};

export const OneCol: Story = {
  args: {
    debug: true,
    variant: "oneCol",
    children: <div>Col</div>,
  },
};

export const TwoCol: Story = {
  render: (args) => (
    <Layout {...args}>
      <div>Col 1</div>
      <div>Col 2</div>
    </Layout>
  ),
  args: {
    debug: true,
    variant: "twoCol",
  },
};

export const TwoCol25x75: Story = {
  render: (args) => (
    <Layout {...args}>
      <div>Col 1</div>
      <div>Col 2</div>
    </Layout>
  ),
  args: {
    debug: true,
    variant: "twoCol25x75",
  },
};

export const TwoCol75x25: Story = {
  render: (args) => (
    <Layout {...args}>
      <div>Col 1</div>
      <div>Col 2</div>
    </Layout>
  ),
  args: {
    debug: true,
    variant: "twoCol75x25",
  },
};

export const ThreeCol: Story = {
  render: (args) => (
    <Layout {...args}>
      <div>Col 1</div>
      <div>Col 2</div>
      <div>Col 3</div>
    </Layout>
  ),
  args: {
    debug: true,
    variant: "threeCol",
  },
};

export const ThreeCol25x50x25: Story = {
  render: (args) => (
    <Layout {...args}>
      <div>Col 1</div>
      <div>Col 2</div>
      <div>Col 3</div>
    </Layout>
  ),
  args: {
    debug: true,
    variant: "threeCol25x50x25",
  },
};

export const FourCol: Story = {
  render: (args) => (
    <Layout {...args}>
      <div>Col 1</div>
      <div>Col 2</div>
      <div>Col 3</div>
      <div>Col 4</div>
    </Layout>
  ),
  args: {
    debug: true,
    variant: "fourCol",
  },
};

export const Combination1: Story = {
  render: (args) => (
    <Layout {...args}>
      <div>
        <Layout variant="twoCol25x75">
          <div>Col 1 - 1</div>
          <div>Col 1 - 2</div>
        </Layout>
      </div>
      <div>Col 2</div>
    </Layout>
  ),
  args: {
    debug: true,
    variant: "twoCol75x25",
  },
};
