import { FC, HTMLProps, memo, useId } from "react";
import { SvgSymbolImport } from "@jebka/webpack-svg-sprite-loader";
import omit from "lodash/omit";

export type SvgSpirteSrc = SvgSymbolImport & { checksum: string };
const KEY_MAPPING: Record<string, string> = {
  "xml:space": "xmlSpace",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-width": "strokeWidth",
};

const SvgSprite: FC<
  {
    src: SvgSpirteSrc;
  } & Omit<HTMLProps<SVGElement>, "src">
> = ({
  src,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  ...props
}) => {
  // Remove unsupported attributes
  const {
    crossOrigin: _crossOrigin,
    ref: _ref,
    title,
    ...typedProps
  }: Partial<HTMLProps<SVGElement>> = props;

  const titleId = useId();

  const attributes = Object.entries(omit(src.attributes, ["width", "height", "xml:space"])).reduce(
    (all, [key, value]) => ({ ...all, [KEY_MAPPING[key] ?? key]: value }),
    {},
  );

  const cacheBust = process.env.NODE_ENV !== "production" ? `?${src.checksum}` : "";

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
