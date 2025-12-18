import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FC, useState } from "react";

import { expect, screen, userEvent, within } from "storybook/test";

import { getVariableAsNumber } from "@/app/[locale]/_styles/variables";
import Button from "@/components/atoms/button/Button";
import Heading from "@/components/atoms/heading/Heading";
import Text from "@/components/atoms/text/Text";
import { wait } from "@/utils/promises";

import Popover from "../popover/Popover";
import PopoverClose from "../popover/PopoverClose";
import PopoverContent from "../popover/PopoverContent";
import PopoverDescription from "../popover/PopoverDescription";
import PopoverHeading from "../popover/PopoverHeading";
import PopoverTrigger from "../popover/PopoverTrigger";
import Dialog from "./Dialog";
import DialogClose from "./DialogClose";
import DialogContent from "./DialogContent";
import DialogDescription from "./DialogDescription";
import DialogHeading from "./DialogHeading";
import DialogTrigger from "./DialogTrigger";

const SampleLargeText: FC = () => (
  <Text>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta dolor mi, at venenatis urna elementum a.
      Etiam quis diam non massa tempor blandit at nec nibh. Pellentesque non magna ac quam cursus mollis. Nunc urna dui,
      lobortis non nulla tempus, varius sollicitudin nulla. Aliquam erat volutpat. In elementum arcu diam, nec laoreet
      ex dignissim blandit. Curabitur ornare rhoncus quam, a semper erat congue quis. Proin facilisis velit sed ante
      gravida, et condimentum nisl faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse
      eu lobortis dolor. Aliquam sapien massa, condimentum sed ornare sed, pellentesque sed massa. Fusce quis ipsum
      scelerisque, condimentum lacus ac, eleifend orci. Pellentesque vehicula diam in malesuada placerat. Fusce congue
      euismod arcu. Suspendisse molestie id erat vitae pretium.
    </p>
    <p>
      Sed et dui finibus, sodales augue nec, imperdiet augue. Aenean congue sagittis dolor nec semper. Phasellus in
      interdum nisi. Aliquam sit amet justo nec turpis ultricies ullamcorper ac ut libero. Nulla a neque et erat semper
      viverra bibendum eu arcu. Integer metus justo, bibendum quis tincidunt semper, faucibus id dolor. Donec pulvinar
      nec enim ut luctus. Ut cursus tincidunt eleifend. Nulla ante nulla, viverra eget lorem auctor, varius imperdiet
      lectus. Nulla faucibus arcu pulvinar ipsum tincidunt, quis bibendum massa egestas. Aliquam in mattis diam. Proin
      ornare ipsum nec diam vehicula dapibus. Maecenas imperdiet velit mauris, quis venenatis eros dignissim in. Duis
      blandit purus a velit auctor ornare. Nullam dapibus metus id efficitur consequat. Nam eros mi, egestas a urna nec,
      dictum sodales sem.
    </p>
    <p>
      Sed hendrerit odio eget sem molestie rhoncus. Donec at arcu orci. Fusce sagittis vel tellus vitae viverra. Duis
      vel faucibus eros. Sed ante erat, vestibulum sed justo sit amet, feugiat dictum dui. Sed at tortor at mauris
      porttitor maximus. Phasellus posuere scelerisque lorem nec placerat. Donec condimentum turpis eu dolor mollis
      tempus. Phasellus non neque suscipit, iaculis diam id, maximus arcu. Fusce sed fringilla justo. Phasellus vitae
      blandit nisl, a pulvinar dui. Etiam facilisis id elit at dignissim. Suspendisse feugiat, ipsum eget volutpat
      congue, nibh est convallis felis, in egestas risus ex quis turpis. Mauris rhoncus tempor convallis. Vestibulum
      luctus orci ex, fringilla elementum lacus eleifend sit amet. In hac habitasse platea dictumst.
    </p>
    <p>
      Fusce sit amet nisi lacinia nisi bibendum ullamcorper sed et urna. Donec eu euismod leo, at suscipit arcu.
      Suspendisse non lacus purus. Donec eu ante volutpat, condimentum tortor eu, laoreet lorem. Praesent tempor, arcu
      ut facilisis dapibus, nisi magna ullamcorper felis, eu ornare nisl arcu et quam. Nunc dictum luctus ante a
      viverra. Donec a enim massa. Phasellus tempus quam commodo mollis dapibus. Curabitur eros libero, dapibus a tellus
      vel, interdum congue diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
      himenaeos. Aliquam vel venenatis massa, eu tristique sapien. Pellentesque volutpat, nunc a interdum faucibus,
      lorem nibh tristique dolor, tincidunt cursus velit arcu vel lectus. Vestibulum ante ipsum primis in faucibus orci
      luctus et ultrices posuere cubilia curae; Praesent vitae dui nec leo elementum tristique. Donec auctor sed dui ut
      semper.
    </p>
    <p>
      Proin non elit vulputate, malesuada ipsum et, vestibulum lectus. Donec nec est vel nisl ultricies dictum et ac
      augue. Aliquam nibh mauris, condimentum at felis a, aliquam viverra tellus. Aenean commodo, orci id tristique
      tempus, magna justo malesuada magna, sit amet hendrerit erat urna dictum justo. Aliquam eu ultricies nibh. Aliquam
      interdum, arcu id dignissim lobortis, dolor eros efficitur lacus, sed mollis mauris metus eu lectus. Sed sagittis
      leo non rhoncus pretium. Cras facilisis magna vitae placerat imperdiet. Nunc scelerisque ut turpis vel pharetra.
      Nunc congue ipsum sem, suscipit condimentum neque dictum faucibus. Duis viverra quam id nibh maximus placerat.
    </p>
    <p>
      Etiam lobortis fringilla elit, a venenatis ex posuere ut. In sed blandit arcu. Sed feugiat iaculis neque, ultrices
      dictum arcu porttitor et. Phasellus tristique iaculis consectetur. Integer bibendum vulputate enim non eleifend.
      Proin accumsan aliquam risus non aliquet. In id scelerisque sapien. Nunc tempor, leo ut dapibus venenatis, justo
      odio blandit tellus, ut imperdiet sapien nisi nec sem. Phasellus finibus arcu at sapien malesuada lobortis.
      Phasellus pellentesque nulla quam. Fusce feugiat mauris lorem, et rhoncus ante scelerisque nec.
    </p>
    <p>
      Morbi pharetra felis in dui dignissim commodo sed a mi. Etiam odio odio, sollicitudin nec lacus non, rutrum
      vulputate dui. Nam cursus hendrerit molestie. Aenean eleifend quis tortor ut laoreet. Nunc pellentesque, quam et
      semper gravida, mauris felis consectetur nisi, et efficitur neque libero quis est. Mauris porttitor tempor urna,
      et vestibulum tortor mattis a. Nunc mauris mauris, aliquam quis ornare nec, lacinia suscipit orci. Etiam sit amet
      feugiat mauris, vel mattis metus. Sed vehicula ante id tristique viverra.
    </p>
    <p>
      Nunc sed arcu in nulla rhoncus mollis in ac nisl. Donec varius facilisis metus quis ultrices. Fusce quis tincidunt
      nisi, nec varius erat. Nunc condimentum odio vitae erat consectetur, eget ornare orci malesuada. Duis pretium
      felis gravida, efficitur lectus sit amet, congue metus. Vestibulum ante ipsum primis in faucibus orci luctus et
      ultrices posuere cubilia curae; Proin consequat accumsan nisi, non ornare nisi sollicitudin vitae. Suspendisse
      lobortis non lacus quis dictum. Vivamus ornare convallis lorem ac consequat. Morbi tristique sapien orci, quis
      tincidunt risus sagittis semper. Sed tristique venenatis vulputate. Nullam viverra, lacus quis ullamcorper
      laoreet, eros ante tempor ante, et commodo leo augue at metus. Donec viverra in lorem bibendum laoreet.
    </p>
    <p>
      Fusce pulvinar dignissim odio, vitae egestas ex sodales in. Suspendisse vel maximus neque. Praesent purus risus,
      fermentum ut felis ut, sollicitudin vehicula odio. Sed sed nulla dictum, porttitor neque a, semper arcu. Maecenas
      nibh ligula, aliquet sit amet ipsum at, semper cursus quam. In iaculis porttitor erat tincidunt gravida. Duis
      porta nibh vitae odio placerat vestibulum.
    </p>
    <p>
      Nullam auctor dignissim mattis. Etiam sed augue eleifend, aliquet massa vitae, tincidunt erat. Cras egestas
      volutpat dignissim. Suspendisse nec ultricies leo. Sed eu purus et erat commodo placerat. Mauris et molestie
      dolor. Morbi condimentum magna in ultricies lobortis. Vestibulum at scelerisque nunc. Sed luctus sodales enim.
    </p>
  </Text>
);

const meta: Meta<typeof Dialog> = {
  title: "UI/Molecules/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Uncontrolled: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Dialog open", async () => {
      await userEvent.click(canvas.getByTestId("trigger"));
      await wait(getVariableAsNumber("duration.normal"));
      await expect(screen.getByTestId("content")).toBeVisible();
    });

    await step("Dialog close", async () => {
      await userEvent.click(screen.getByTestId("close"));
      await wait(getVariableAsNumber("duration.fast"));
      await expect(screen.queryByTestId("content")).toBeNull();
    });
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger data-testid="trigger">My trigger</DialogTrigger>
      <DialogContent data-testid="content">
        <DialogHeading>My dialog heading</DialogHeading>
        <DialogDescription>My dialog description</DialogDescription>
        <DialogClose data-testid="close">Close</DialogClose>
      </DialogContent>
    </Dialog>
  ),
};

export const AsSheet: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger>My trigger</DialogTrigger>
      <DialogContent withCloseButton asSheet>
        <DialogHeading>My dialog heading</DialogHeading>
        <DialogDescription>My dialog description</DialogDescription>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  ),
};

export const WithCloseButton: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger>My trigger</DialogTrigger>
      <DialogContent withCloseButton>
        <DialogHeading>My dialog heading</DialogHeading>
        <DialogDescription>My dialog description</DialogDescription>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  ),
};

export const PopoverInDialog: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger>My trigger</DialogTrigger>
      <DialogContent>
        <DialogHeading>My dialog heading</DialogHeading>
        <DialogDescription>
          My dialog description
          <Popover>
            <PopoverTrigger>My trigger</PopoverTrigger>
            <PopoverContent>
              <PopoverHeading>My popover heading</PopoverHeading>
              <PopoverDescription>My popover description</PopoverDescription>
              <PopoverClose>Close</PopoverClose>
            </PopoverContent>
          </Popover>
        </DialogDescription>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  ),
};

export const DialogInDialog: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger>My trigger</DialogTrigger>
      <DialogContent>
        <DialogHeading>My dialog heading</DialogHeading>
        <DialogDescription>
          My dialog description
          <Dialog>
            <DialogTrigger>My trigger 2</DialogTrigger>
            <DialogContent>
              <DialogHeading>My dialog heading 2</DialogHeading>
              <DialogDescription>My dialog description 2</DialogDescription>
              <DialogClose>Close 2</DialogClose>
            </DialogContent>
          </Dialog>
        </DialogDescription>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  ),
};

const ControlledDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Open Dialog
      </Button>
      <Dialog open={isOpen} onOpenChange={(isNewOpen) => setIsOpen(isNewOpen)}>
        <DialogContent>
          <DialogHeading>My dialog heading</DialogHeading>
          <DialogDescription>My dialog description</DialogDescription>
          <DialogClose
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDialog />,
};

export const CustomElements: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger>
        <Button>My trigger</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeading>
          <Heading>My popover heading</Heading>
        </DialogHeading>
        <DialogDescription>
          <Text>
            <p>My popover description</p>
          </Text>
        </DialogDescription>
        <DialogClose>
          <Button>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  ),
};

const ControlledOverlayComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div>
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Open Dialog
        </Button>
        <SampleLargeText />
      </div>
      <Dialog open={isOpen} onOpenChange={(isNewOpen) => setIsOpen(isNewOpen)}>
        <DialogContent withCloseButton>
          <DialogHeading>My dialog heading</DialogHeading>
          <DialogDescription>
            <SampleLargeText />
          </DialogDescription>
          <DialogClose
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const ControlledOverlay: Story = {
  render: () => <ControlledOverlayComponent />,
};
