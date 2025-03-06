/* eslint-disable i18next/no-literal-string, react/jsx-no-target-blank  */
// button-has-type will be handled by mega menu

import type { Meta, StoryObj } from "@storybook/react";

import MenuBarRootItem from "@/components/organisms/menu-bar/root-item/MenuBarRootItem";

import MenuBar from "./MenuBar";
import Menu from "./menu/Menu";
import MenuItem from "./menu-item/MenuItem";

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
            <Menu label="Edit">
              <MenuItem label="Undo" onClick={() => console.log("Undo")} />
              <MenuItem label="Redo" />
              <MenuItem label="Cut" disabled />
              <Menu label="Copy as">
                <MenuItem label="Text" />
                <MenuItem label="Video" />
                <Menu label="Image">
                  <MenuItem label=".png" />
                  <MenuItem label=".jpg" />
                  <MenuItem label=".svg" />
                  <MenuItem label=".gif" />
                </Menu>
                <MenuItem label="Audio" />
              </Menu>
              <Menu label="Share">
                <MenuItem label="Mail" />
                <MenuItem label="Instagram" />
              </Menu>
            </Menu>
          }
        >
          Item 3
        </MenuBarRootItem>
      </MenuBar>
    );
  },
};
