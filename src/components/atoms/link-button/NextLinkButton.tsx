"use client";

import { FC, memo, PropsWithChildren } from "react";

import { Link as LocalizedLink } from "@/i18n/routing";

import LinkButton, { type Props as LBProps } from "./LinkButton";

const NextLinkButton: FC<PropsWithChildren<Omit<LBProps, "as">>> = ({ children, ...props }) => {
  return (
    <LinkButton as={LocalizedLink} {...props}>
      {children}
    </LinkButton>
  );
};

export default memo(NextLinkButton);
