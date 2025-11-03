import type { Meta, StoryObj } from "@storybook/nextjs";

import Button from "@/components/atoms/button/Button";
import Heading from "@/components/atoms/heading/Heading";

import RichText from "./RichText";

const meta: Meta<typeof RichText> = {
  title: "Boilerplate/Blocks/Rich text",
  component: RichText,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof RichText>;

export const Default: Story = {
  render: () => {
    return (
      <RichText>
        <Heading type="h2" size="h1">
          Lorem ipsum dolores
        </Heading>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue{" "}
          <strong>lacinia quam venenatis vestibulum</strong>. Donec id elit non mi porta gravida at eget metus. Donec
          sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus
          commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus
          varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo
          cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit.
          Nullam quis risus eget urna mollis ornare vel eu leo. Donec id elit non mi porta gravida at eget metus.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Curabitur blandit tempus porttitor.
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
        <table>
          <thead>
            <tr>
              <th>Lorem ipsum</th>
              <th>Quam Euismod</th>
              <th>Euismod Vestibulum</th>
              <th>Quam Euismod</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12345</td>
              <td>356754</td>
              <td>9874568</td>
              <td>7678</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>356754</td>
              <td>9874568</td>
              <td>7678</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>356754</td>
              <td>9874568</td>
              <td>7678</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>356754</td>
              <td>9874568</td>
              <td>7678</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>356754</td>
              <td>9874568</td>
              <td>7678</td>
            </tr>
          </tbody>
        </table>

        <p>
          <Button>Button</Button>
        </p>
      </RichText>
    );
  },
};
