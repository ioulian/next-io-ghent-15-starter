"use client";

import { ComponentPropsWithRef, FC, memo } from "react";
import { useEffectOnce } from "react-use";

import { MAIN_CONTENT_ID } from "./MainContent.constants";

const MainContent: FC<ComponentPropsWithRef<"main">> = ({ children, ...props }) => {
  useEffectOnce(() => {
    if (process.env.NODE_ENV !== "production") {
      const link = document.querySelector(`a[href="#${MAIN_CONTENT_ID}"]`);
      if (link === null) {
        console.warn(
          "You are using <MainContent> without a link to it. Please add <MainContentLink> to the beginning of the body.",
        );
      }
    }
  });

  return (
    <main id={MAIN_CONTENT_ID} {...props}>
      {children}
    </main>
  );
};

export default memo(MainContent);
