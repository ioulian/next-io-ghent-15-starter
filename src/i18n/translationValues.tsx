import { RichTranslationValues } from "next-intl";

export const defaultTranslationValues: RichTranslationValues = {
  p: (chunks) => <p>{chunks}</p>,
  strong: (chunks) => <strong>{chunks}</strong>,
  em: (chunks) => <em>{chunks}</em>,
  h1: (chunks) => <h1>{chunks}</h1>,
  h2: (chunks) => <h2>{chunks}</h2>,
  h3: (chunks) => <h3>{chunks}</h3>,
  h4: (chunks) => <h4>{chunks}</h4>,
  h5: (chunks) => <h5>{chunks}</h5>,
  h6: (chunks) => <h6>{chunks}</h6>,
  br: () => <br />,
};
