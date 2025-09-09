"use client";

import { FC, memo, useCallback, useState } from "react";

import { WithRequired } from "@/types/helpers";
import type { Props as LBProps } from "./LinkButton";

import { Link as LocalizedLink } from "@/i18n/navigation";

import LinkButton from "./LinkButton";

/**
 * Wrapper around next/link. Also changed prefetching to onHover
 */
const NextLinkButton: FC<WithRequired<Omit<LBProps, "as">, "children">> = (props) => {
  const [prefetch, setPrefetch] = useState<boolean>(false);

  const onMouseEnter = useCallback(() => {
    setPrefetch(true);
  }, []);

  return (
    <LinkButton
      as={LocalizedLink}
      // @ts-expect-error - prefetch is valid for LocalizedLink, add polymorphed to LinkButton
      prefetch={prefetch ? null : false}
      onMouseEnter={onMouseEnter}
      {...props}
    />
  );
};

export default memo(NextLinkButton);
