import clsx from "clsx";
import { Montserrat, Inter } from "next/font/google";

export const montserrat = Montserrat({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-heading",
});
export const inter = Inter({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
});

/**
 * This class should be added to the html to allow custom fonts to be used
 */
export const htmlFontClass = clsx(montserrat.variable, inter.variable);
