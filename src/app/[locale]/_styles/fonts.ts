import { Montserrat } from "next/font/google";

export const montserratPro = Montserrat({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-primary",
});

/**
 * This class should be added to the html to allow custom fonts to be used
 */
export const htmlFontClass = montserratPro.variable;
