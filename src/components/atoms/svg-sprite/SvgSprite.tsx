import type { ComponentPropsWithRef } from "react";

import { FC, memo, useId } from "react";

import { SPRITE_FILE } from "../../../../scripts/svg-sprite/constants";

const SvgSprite: FC<
  {
    name: SvgSpriteName;
    title?: string;
  } & ComponentPropsWithRef<"svg">
> = ({ name, children: _children, ...props }) => {
  const { title, ...rest } = props;
  const titleId = useId();

  // This is needed as chrome (and maybe others) caches this very hard, hard refresh does not work,
  // You need to open a new tab to refresh this. However, using cache busting works.
  // In development, it refreshes a lot more, in production every spritesheet will be cached.
  const cacheBust = `?${process.env.NEXT_PUBLIC_CUSTOM_BUILD_ID ?? "v1"}`;

  return (
    <svg
      {...rest}
      role={title ? "img" : undefined}
      aria-hidden={!title ? true : undefined}
      aria-labelledby={title ? titleId : undefined}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <use xlinkHref={`/${SPRITE_FILE}${cacheBust}#${name}`} />
    </svg>
  );
};

/**
 * Will render an SVG sprite using `<use>` component in svg.
 *
 * Provide an icon as `src`: `import icon from './icon.svg'`
 */
export default memo(SvgSprite);
