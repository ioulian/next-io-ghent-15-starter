import type { Meta, StoryObj } from "@storybook/nextjs";

import BaseBlock from "@/components/blocks/base-block/BaseBlock";

import { Default as CardSliderStory } from "./../blocks/card-slider/CardSlider.stories";
import { Default as FooterStory } from "./../blocks/footer/Footer.stories";
import { Default as HeaderStory } from "./../blocks/header/Header.stories";
import { Default as HeroStory } from "./../blocks/hero/Hero.stories";
import { Default as MediaText1, Reversed as MediaText2 } from "./../blocks/media-text/MediaText.stories";
import { Default as RichTextStory } from "./../blocks/rich-text/RichText.stories";
import { Default as TabsStory } from "./../molecules/tabs/Tabs.stories";
import { Default as AccordionStory } from "./../organisms/accordion/Accordion.stories";

const meta: Meta = {
  title: "Boilerplate/Templates/Basic page",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    return (
      <div>
        {// @ts-expect-error We know it works
        HeaderStory?.render()}
        {// @ts-expect-error We know it works
        HeroStory?.render()}
        {// @ts-expect-error We know it works
        RichTextStory?.render()}
        {// @ts-expect-error We know it works
        MediaText1?.render()}
        {// @ts-expect-error We know it works
        MediaText2?.render()}
        <BaseBlock>
          {// @ts-expect-error We know it works
          TabsStory?.render()}
        </BaseBlock>
        <BaseBlock>
          {// @ts-expect-error We know it works
          AccordionStory?.render()}
        </BaseBlock>
        {// @ts-expect-error We know it works
        CardSliderStory?.render()}
        {// @ts-expect-error We know it works
        FooterStory?.render()}
      </div>
    );
  },
};
