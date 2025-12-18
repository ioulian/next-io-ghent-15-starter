import { FC, memo, ReactNode } from "react";

type Tag = "p" | "strong" | "ol" | "ul" | "li" | "em" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "br";

export const defaultTranslationValues: Record<Tag, (chunks: ReactNode) => ReactNode> = {
  p: (chunks) => <p>{chunks}</p>,
  strong: (chunks) => <strong>{chunks}</strong>,
  ol: (chunks) => <ol>{chunks}</ol>,
  ul: (chunks) => <ul>{chunks}</ul>,
  li: (chunks) => <li>{chunks}</li>,
  em: (chunks) => <em>{chunks}</em>,
  h1: (chunks) => <h1>{chunks}</h1>,
  h2: (chunks) => <h2>{chunks}</h2>,
  h3: (chunks) => <h3>{chunks}</h3>,
  h4: (chunks) => <h4>{chunks}</h4>,
  h5: (chunks) => <h5>{chunks}</h5>,
  h6: (chunks) => <h6>{chunks}</h6>,
  br: () => <br />,
};

const RichTranslation: FC<{
  children: (tags: Record<Tag, (chunks: ReactNode) => ReactNode>) => ReactNode;
}> = ({ children }) => {
  return children({
    ...defaultTranslationValues,
  });
};

/**
 * Rich translation
 */
export default memo(RichTranslation);
