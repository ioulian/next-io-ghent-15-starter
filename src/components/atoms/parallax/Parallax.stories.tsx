import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Text from "@/components/atoms/text/Text";

import Parallax from "./Parallax";

const meta: Meta<typeof Parallax> = {
  title: "UI/Atoms/Parallax",
  component: Parallax,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Parallax>;

export const Default: Story = {
  render: (args) => (
    <Text>
      <p>
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue{" "}
        <strong>lacinia quam venenatis vestibulum</strong>. Donec id elit non mi porta gravida at eget metus. Donec sed
        odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus
        commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus
        varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo
        cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam
        quis risus eget urna mollis ornare vel eu leo. Donec id elit non mi porta gravida at eget metus. Vivamus
        sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Curabitur blandit tempus porttitor.
      </p>
      <ul>
        <li>Praesent commodo cursus magna vel scelerisque nisl consectetur et. </li>
        <li>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</li>
        <li>Donec id elit non mi porta gravida at eget metu donec sed odio dui maecenas sed diam</li>
        <li>Eget risus varius blandit sit amet non magnafusce dapibus</li>
        <li>Tellus ac cursus commodo tortor mauris condimentum nibh ut fermentum </li>
      </ul>
      <p>Paragraph 2</p>
      <ol>
        <li>Praesent commodo cursus magna vel scelerisque nisl consectetur et. </li>
        <li>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</li>
        <li>Donec id elit non mi porta gravida at eget metu donec sed odio dui maecenas sed diam</li>
        <li>Eget risus varius blandit sit amet non magnafusce dapibus</li>
        <li>Tellus ac cursus commodo tortor mauris condimentum nibh ut fermentum </li>
      </ol>
      <Parallax {...args} style={{ width: "100%", height: "500px" }}>
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
          alt=""
        />
      </Parallax>
      <p>
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue{" "}
        <strong>lacinia quam venenatis vestibulum</strong>. Donec id elit non mi porta gravida at eget metus. Donec sed
        odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus
        commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus
        varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo
        cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam
        quis risus eget urna mollis ornare vel eu leo. Donec id elit non mi porta gravida at eget metus. Vivamus
        sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Curabitur blandit tempus porttitor.
      </p>
      <ul>
        <li>Praesent commodo cursus magna vel scelerisque nisl consectetur et. </li>
        <li>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</li>
        <li>Donec id elit non mi porta gravida at eget metu donec sed odio dui maecenas sed diam</li>
        <li>Eget risus varius blandit sit amet non magnafusce dapibus</li>
        <li>Tellus ac cursus commodo tortor mauris condimentum nibh ut fermentum </li>
      </ul>
      <p>Paragraph 2</p>
      <ol>
        <li>Praesent commodo cursus magna vel scelerisque nisl consectetur et. </li>
        <li>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</li>
        <li>Donec id elit non mi porta gravida at eget metu donec sed odio dui maecenas sed diam</li>
        <li>Eget risus varius blandit sit amet non magnafusce dapibus</li>
        <li>Tellus ac cursus commodo tortor mauris condimentum nibh ut fermentum </li>
      </ol>
    </Text>
  ),
  args: {
    strength: 0.4,
  },
};
