"use client";

import { memo, useCallback, useState } from "react";

import type { Props as ButtonProps } from "./Button";

import Button from "@/components/atoms/button/Button";
import { Link } from "@/i18n/navigation";

/**
 * Wrapper around next/link. Also changed prefetching to onHover
 */
function NextLinkButton(props: ButtonProps<typeof Link>) {
  const [prefetch, setPrefetch] = useState<boolean>(false);

  const setIntent = useCallback(() => {
    setPrefetch(true);
  }, []);

  return (
    <Button
      as={Link}
      // TODO: check if "auto" instead of false would be acceptable
      prefetch={prefetch ? true : false}
      onMouseEnter={setIntent}
      onFocus={setIntent}
      onTouchStart={setIntent}
      {...props}
    />
  );
}

export default memo(NextLinkButton);
