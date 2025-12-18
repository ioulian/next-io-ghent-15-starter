import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import MainContentLink from "@/components/molecules/main-content/MainContentLink";

import MainContent from "./MainContent";

const meta: Meta<typeof MainContent> = {
  title: "UI/Molecules/Main content",
  component: MainContent,
  tags: ["autodocs"],
  parameters: {
    layout: "default",
  },
};

export default meta;
type Story = StoryObj<typeof MainContent>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "100%" }}>
      <MainContentLink />
      <aside>
        <button type="button">Sidebar</button>
      </aside>
      <MainContent>
        <button type="button">Main content</button>
      </MainContent>
    </div>
  ),
};
