import { FC, HTMLProps, memo, useId } from "react";

import { SvgSymbolImport } from "@jebka/webpack-svg-sprite-loader";

export type SvgSpriteSrc = SvgSymbolImport & { checksum: string };
const KEY_MAPPING: Record<string, string> = {
  "xml:space": "xmlSpace",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-width": "strokeWidth",
};

const SvgSprite: FC<
  {
    src: SvgSpriteSrc;
  } & Omit<HTMLProps<SVGElement>, "src">
> = ({
  src,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  ...props
}) => {
  // Remove unsupported attributes
  const { crossOrigin: _crossOrigin, ref: _ref, title, ...typedProps }: Partial<HTMLProps<SVGElement>> = props;

  const titleId = useId();

  const attributes = Object.entries(src.attributes ?? {})
    .filter(([key]) => !["width", "height", "xml:space"].includes(key))
    .reduce((all, [key, value]) => ({ ...all, [KEY_MAPPING[key] ?? key]: value }), {});

  // This is needed as chrome (and maybe others) caches this very hard, hard refresh does not work,
  // You need to open a new tab to refresh this. However, using cache busting works.
  // In development, it refreshes a lot more, in production every spritesheet will be cached.
  const cacheBust =
    process.env.NODE_ENV === "production" ? `?${process.env.NEXT_PUBLIC_CUSTOM_BUILD_ID}` : `?${src.checksum}`;

  return (
    <svg
      {...typedProps}
      {...attributes}
      role={title ? "img" : undefined}
      aria-hidden={!title ? true : undefined}
      aria-labelledby={title ? titleId : undefined}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <use xlinkHref={`${src.spritePath}${cacheBust}#${src.symbolId}`} />
    </svg>
  );
};

/**
 * Will render an SVG sprite using `<use>` component in svg.
 *
 * Provide an icon as `src`: `import icon from './icon.svg'`
 */
export default memo(SvgSprite);
