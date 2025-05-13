"use client";

import { FC, memo, PropsWithChildren, useCallback, useState } from "react";

import type { Props as LBProps } from "./LinkButton";

import { Link as LocalizedLink } from "@/i18n/navigation";

import LinkButton from "./LinkButton";

/**
 * Wrapper around next/link. Also changed prefetching to onHover
 */
const NextLinkButton: FC<PropsWithChildren<Omit<LBProps, "as">>> = ({ children, ...props }) => {
  const [prefetch, setPrefetch] = useState<boolean>(false);

  const onMouseEnter = useCallback(() => {
    setPrefetch(true);
  }, []);

  return (
    <LinkButton as={LocalizedLink} prefetch={prefetch} onMouseEnter={onMouseEnter} {...props}>
      {children}
    </LinkButton>
  );
};

export default memo(NextLinkButton);
