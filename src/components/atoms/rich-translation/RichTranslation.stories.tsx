import type { Meta, StoryObj } from "@storybook/react";
import { useTranslations } from "next-intl";
import { FC } from "react";

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
    <RichTranslation>
      {(tags) =>
        t.rich("stories.richTranslation.value", {
          ...tags,
          customLink: (chunks) => <a href="#">{chunks}</a>,
        })
      }
    </RichTranslation>
  );
};

export const Default: Story = {
  render: () => <Example />,
};
