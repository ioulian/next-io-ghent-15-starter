import { Source_Sans_3 } from "next/font/google";

export const sourceSansPro = Source_Sans_3({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-heading",
});

/**
 * This class should be added to the html to allow custom fonts to be used
 */
export const htmlFontClass = sourceSansPro.variable;
