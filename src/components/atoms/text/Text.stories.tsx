import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Text from "./Text";

const meta: Meta<typeof Text> = {
  title: "UI/Atoms/Text",
  component: Text,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <hr />
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
      </>
    ),
  },
};
