import type { Meta, StoryObj } from "@storybook/nextjs";

import Dialog from "@/components/molecules/dialog/Dialog";
import DialogContent from "@/components/molecules/dialog/DialogContent";
import DialogTrigger from "@/components/molecules/dialog/DialogTrigger";

import ObjectContainWindow from "./ObjectContainWindow";

const meta: Meta<typeof ObjectContainWindow> = {
  title: "UI/Utils/Object contain window",
  component: ObjectContainWindow,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ObjectContainWindow>;

export const Default: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger>Open modal</DialogTrigger>
        <DialogContent withCloseButton>
          <ObjectContainWindow padding={40}>
            {({ width, height }) => (
              <iframe
                width={width}
                height={height}
                src="https://www.youtube-nocookie.com/embed/uA-kglFSq5I?showinfo=0&video-id=uA-kglFSq5I&widgetid=1&color=white&modestbranding=1&rel=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ border: "none" }}
              />
            )}
          </ObjectContainWindow>
        </DialogContent>
      </Dialog>
    );
  },
};
