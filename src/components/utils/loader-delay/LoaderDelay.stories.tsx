/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/react";

import LoaderDelay from "@/components/utils/loader-delay/LoaderDelay";
import Spinner from "@/components/atoms/spinner/Spinner";

const meta: Meta<typeof LoaderDelay> = {
  title: "UI/Utils/Loader Delay",
  component: LoaderDelay,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoaderDelay>;

export const Default: Story = {
  render: () => (
    <div>
      <p>
        The following loader will be shown with a delay. As we don&rsquo;t perceive fast loading as
        a problem, we can delay the loader to not flash that coponent when the loading happens fast.
      </p>
      <LoaderDelay>
        <Spinner />
      </LoaderDelay>
    </div>
  ),
  args: {
    children: "this text",
  },
};
