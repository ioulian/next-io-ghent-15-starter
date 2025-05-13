import { FC } from "react";

import { useTranslations } from "next-intl";

import type { Meta, StoryObj } from "@storybook/react";

import RichTranslation from "./RichTranslation";

const meta: Meta<typeof RichTranslation> = {
  title: "UI/Atoms/Rich Translation",
  component: RichTranslation,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RichTranslation>;

const Example: FC = () => {
  const t = useTranslations("common");

  return (
    <RichTranslation
      tags={{
        customLink: (chunks) => (
          <a href="#" className="custom">
            {chunks}
          </a>
        ),
      }}
    >
      {
        // @ts-expect-error FIXME
        (tags) => t.rich("stories.richTranslation.value", tags)
      }
    </RichTranslation>
  );
};

export const Default: Story = {
  render: () => <Example />,
};
