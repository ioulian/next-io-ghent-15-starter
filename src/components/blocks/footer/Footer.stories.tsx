import type { Meta, StoryObj } from "@storybook/nextjs";

import Footer from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Boilerplate/Blocks/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => {
    return (
      <Footer
        siteName="Boilerplate"
        metaNav={
          <>
            <a href="#">Cookie policy</a>
            <a href="#">Privacy policy</a>
            <a href="#">Accessibility statement</a>
          </>
        }
        showCreatedBy
      >
        children
      </Footer>
    );
  },
};
