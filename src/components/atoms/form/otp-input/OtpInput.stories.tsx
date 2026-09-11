import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import VisuallyHidden from "@/components/utils/visually-hidden/VisuallyHidden";

import OtpInput from "./OtpInput";

const meta: Meta<typeof OtpInput> = {
  title: "UI/Atoms/Form/OTP input",
  component: OtpInput,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof OtpInput>;

export const Default: Story = {
  render: (args) => (
    <>
      <VisuallyHidden>
        <label htmlFor={args.id}>OTP input</label>
      </VisuallyHidden>
      <OtpInput {...args} id={args.id} />
    </>
  ),
  args: {
    id: "otp-input",
  },
};
