import { FC, HTMLProps, memo, useId } from "react";

const SvgSprite: FC<
  { src: { id: string; viewBox: string } } & Omit<HTMLProps<SVGElement>, "src">
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

  // As inline spritesheet will not work in storybook (no server code allowed),
  // We need to prefix the ID with the url of the sprite.
  // This will make the performance slightly worse, but it's only for storybook.
  const url =
    process.env.IS_STORYBOOK === "true"
      ? `${__webpack_public_path__}static/media/sprite-development.svg`
      : "";

  // src.id?.slice is needed as we don't change webpack config for jest
  return (
    <svg
      {...typedProps}
      viewBox={src.viewBox}
      role={title ? "img" : undefined}
      aria-hidden={!title ? true : undefined}
      aria-labelledby={title ? titleId : undefined}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <use xlinkHref={`${url}#${src.id?.slice(0, -"-usage".length)}`} />
    </svg>
  );
};

/**
 * Will render an SVG sprite using `<use>` component in svg.
 *
 * Provide an icon as `src`: `import icon from './icon.svg'`
 */
export default memo(SvgSprite);
