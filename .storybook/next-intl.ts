import en from "../messages/en-GB/common.json";
import fr from "../messages/fr-BE/common.json";
import nl from "../messages/nl-BE/common.json";

const messagesByLocale: Record<string, unknown> = { "en-GB": en, "fr-BE": fr, "nl-BE": nl };

const nextIntl = {
  defaultLocale: "en-GB",
  messagesByLocale,
};

export default nextIntl;
