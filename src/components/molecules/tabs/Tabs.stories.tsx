/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/react";
import { Tab, TabList, TabPanel } from "react-tabs";

import Text from "@/components/atoms/text/Text";

import Tabs from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI/Molecules/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs>
      <TabList>
        <Tab>
          <span>Characteristics</span>
        </Tab>
        <Tab disabled>
          <span>Plans &amp; pictures</span>
        </Tab>
        <Tab>
          <span>Moodboard</span>
        </Tab>
        <Tab>
          <span>Documentation</span>
        </Tab>
      </TabList>

      <TabPanel>
        <Text>
          <h2>Characteristics content</h2>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor. Donec id elit non mi porta gravida
            at eget metus. Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet
            non magna. Fusce dapibus,e nisl consectetur et. Nullam id dolor id nibh ultricies
            vehicula ut id elit. Nullam quis risus eget urna mollis ornare vel eu leo. Donec id elit
            non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum
            faucibus dolor auctor. Curabitur blandit tempus porttitor.
          </p>
        </Text>
      </TabPanel>
      <TabPanel>
        <Text>
          <h2>Plans &amp; pictures content</h2>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor. Donec id elit non mi porta gravida
            at eget metus. Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet
            non magna. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
            fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit
            amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh
            ultricies vehicula ut id elit. Nullam quis risus eget urna mollis ornare vel eu leo.
            Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue
            laoreet rutrum faucibus dolor auctor. Curabitur blandit tempus porttitor.
          </p>
        </Text>
      </TabPanel>
      <TabPanel>
        <Text>
          <h2>Moodboard content</h2>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor. Donec id elit non mi porta gravida
            at eget metus. Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet
            non magna. Fusm dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula
            ut id elit. Nullam quis risus eget urna mollis ornare vel eu leo. Donec id elit non mi
            porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
            dolor auctor. Curabitur blandit tempus porttitor.
          </p>
        </Text>
      </TabPanel>
      <TabPanel>
        <Text>
          <h2>Documentation content</h2>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor. Donec id elit non mi porta gravida
            at eget metat eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor. Curabitur blandit tempus porttitor.
          </p>
        </Text>
      </TabPanel>
    </Tabs>
  ),
};
