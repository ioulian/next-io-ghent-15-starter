/* eslint-disable react/jsx-no-target-blank  */
// button-has-type will be handled by mega menu

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Button from "@/components/atoms/button/Button";
import SvgSprite from "@/components/atoms/svg-sprite/SvgSprite";
import Dropdown from "@/components/molecules/dropdown/Dropdown";
import DropdownMenuItem from "@/components/molecules/dropdown/DropdownMenuItem";
import MenuBarRootItem from "@/components/organisms/menu-bar/root-item/MenuBarRootItem";

import MenuBar from "./MenuBar";

const meta: Meta<typeof MenuBar> = {
  title: "UI/Organisms/Menu bar",
  component: MenuBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MenuBar>;

export const Default: Story = {
  render: () => {
    return (
      <MenuBar>
        <MenuBarRootItem>Item 1</MenuBarRootItem>
        <MenuBarRootItem>Item 2</MenuBarRootItem>
        <MenuBarRootItem href="#" render={(props) => <a {...props} />}>
          Item 3
        </MenuBarRootItem>
        <MenuBarRootItem
          href="#"
          render={
            <Dropdown
              trigger={
                <Button size="base" variant="simple" iconAfter={<SvgSprite name="tablerChevronDown" />}>
                  Item 4
                </Button>
              }
            >
              <DropdownMenuItem typeaheadKey="Undo">Undo</DropdownMenuItem>
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
          }
        >
          Item 3
        </MenuBarRootItem>
      </MenuBar>
    );
  },
};
