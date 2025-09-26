import type { Meta, StoryObj } from "@storybook/nextjs";

import { useState } from "react";

import iconChevron from "@tabler/icons/outline/chevron-right.svg";
import { action } from "storybook/actions";
import { expect, screen, userEvent, within } from "storybook/test";

import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";
import Button from "@/components/atoms/button/Button";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import DialogContent from "@/components/molecules/dialog/DialogContent";
import DialogTrigger from "@/components/molecules/dialog/DialogTrigger";
import DropdownMenuItem from "@/components/molecules/dropdown/DropdownMenuItem";
import { wait } from "@/utils/promises";

import Dialog from "../dialog/Dialog";
import Dropdown from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "UI/Molecules/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const play: Story["play"] = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("Dropdown open", async () => {
    await userEvent.click(canvas.getByTestId("trigger"));
    await wait(getVariableAsNumber("duration.normal") + 50);
    await expect(screen.getByTestId("trigger2")).toBeVisible();

    await userEvent.hover(screen.getByTestId("trigger2"));
    await wait(getVariableAsNumber("duration.normal") + 50);
    await expect(screen.getByTestId("trigger3")).toBeVisible();

    await userEvent.hover(screen.getByTestId("trigger3"));
    await wait(getVariableAsNumber("duration.normal") + 50);
    await expect(screen.getByTestId("trigger4")).toBeVisible();
  });

  await step("Dropdown close", async () => {
    await userEvent.click(screen.getByTestId("trigger4"));
    await wait(getVariableAsNumber("duration.fast") + 50);
    await expect(screen.queryByTestId("trigger4")).toBeNull();
  });
};

export const Basic: Story = {
  play,
  render: (args) => (
    <Dropdown {...args}>
      <DropdownMenuItem onClick={action("Undo")} typeaheadKey="Undo">
        Undo
      </DropdownMenuItem>
      <DropdownMenuItem typeaheadKey="Redo">Redo</DropdownMenuItem>
      <DropdownMenuItem typeaheadKey="Cut" disabled>
        Cut
      </DropdownMenuItem>
      <Dropdown
        trigger={
          <button type="button" data-testid="trigger2">
            Copy as &gt;
          </button>
        }
        typeaheadKey="Copy as"
      >
        <DropdownMenuItem typeaheadKey="Text">Text</DropdownMenuItem>
        <DropdownMenuItem typeaheadKey="Video">Video</DropdownMenuItem>
        <Dropdown
          trigger={
            <button type="button" data-testid="trigger3">
              Image &gt;
            </button>
          }
          typeaheadKey="Image"
        >
          <DropdownMenuItem typeaheadKey=".png">.png</DropdownMenuItem>
          <DropdownMenuItem typeaheadKey=".jpg" data-testid="trigger4">
            .jpg
          </DropdownMenuItem>
          <DropdownMenuItem typeaheadKey=".svg">.svg</DropdownMenuItem>
          <DropdownMenuItem typeaheadKey=".gif">.gif</DropdownMenuItem>
        </Dropdown>
        <DropdownMenuItem typeaheadKey="Audio">Audio</DropdownMenuItem>
      </Dropdown>
      <Dropdown trigger="Share >" typeaheadKey="Share">
        <DropdownMenuItem typeaheadKey="Mail">Mail</DropdownMenuItem>
        <DropdownMenuItem typeaheadKey="Instagram">Instagram</DropdownMenuItem>
      </Dropdown>
    </Dropdown>
  ),
  args: {
    trigger: (
      <button type="button" data-testid="trigger">
        Menu
      </button>
    ),
  },
};

export const CustomElements: Story = {
  play,
  render: (args) => (
    <Dropdown {...args}>
      <DropdownMenuItem typeaheadKey="Undo">
        <Button variant="secondary">Undo</Button>
      </DropdownMenuItem>
      <DropdownMenuItem typeaheadKey="Redo">
        <Button variant="secondary">Redo</Button>
      </DropdownMenuItem>
      <DropdownMenuItem typeaheadKey="Cut" disabled>
        <Button>Cut</Button>
      </DropdownMenuItem>
      <Dropdown
        trigger={
          <Button iconAfter={<SvgSprite src={iconChevron} />} data-testid="trigger2">
            Copy as
          </Button>
        }
        typeaheadKey="Copy as"
      >
        <DropdownMenuItem typeaheadKey="Text">
          <Button>Text</Button>
        </DropdownMenuItem>
        <DropdownMenuItem typeaheadKey="Video">
          <Button>Video</Button>
        </DropdownMenuItem>
        <Dropdown
          trigger={
            <Button iconAfter={<SvgSprite src={iconChevron} />} data-testid="trigger3">
              Image
            </Button>
          }
          typeaheadKey="Image"
        >
          <DropdownMenuItem typeaheadKey=".png">
            <Button>.png</Button>
          </DropdownMenuItem>
          <DropdownMenuItem typeaheadKey=".jpg" data-testid="trigger4">
            <Button>.jpg</Button>
          </DropdownMenuItem>
          <DropdownMenuItem typeaheadKey=".svg">
            <Button>.svg</Button>
          </DropdownMenuItem>
          <DropdownMenuItem typeaheadKey=".gif">
            <Button>.gif</Button>
          </DropdownMenuItem>
        </Dropdown>
        <DropdownMenuItem typeaheadKey="Audio">
          <Button>Audio</Button>
        </DropdownMenuItem>
      </Dropdown>
      <Dropdown
        trigger={<Button iconAfter={<SvgSprite src={iconChevron} />}>Share</Button>}
        typeaheadKey="Share"
      >
        <DropdownMenuItem typeaheadKey="Mail">
          <Button>Mail</Button>
        </DropdownMenuItem>
        <DropdownMenuItem typeaheadKey="Instagram">
          <Button>Instagram</Button>
        </DropdownMenuItem>
      </Dropdown>
    </Dropdown>
  ),
  args: {
    trigger: <Button data-testid="trigger">Menu</Button>,
  },
};

const WithOverlayComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dropdown trigger={<Button>Open</Button>}>
      <DropdownMenuItem typeaheadKey="Copy">
        <Button>Copy</Button>
      </DropdownMenuItem>
      <DropdownMenuItem typeaheadKey="Edit">
        <Button>Edit</Button>
      </DropdownMenuItem>
      <Dialog open={isOpen} onOpenChange={(isNewOpen) => setIsOpen(isNewOpen)}>
        <DialogTrigger>
          <DropdownMenuItem
            typeaheadKey="Delete"
            closeOnClick={false}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Button>Delete</Button>
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          Delete this item?
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Ok
          </Button>
        </DialogContent>
      </Dialog>
    </Dropdown>
  );
};

export const WithOverlay: Story = {
  render: () => <WithOverlayComponent />,
};
