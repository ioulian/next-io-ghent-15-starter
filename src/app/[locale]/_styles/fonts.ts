import { Inter, Montserrat } from "next/font/google";

import clsx from "clsx";

const montserrat = Montserrat({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-heading",
});
const inter = Inter({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
});

/**
 * This class should be added to the html to allow custom fonts to be used
 */
export const htmlFontClass = clsx(montserrat.variable, inter.variable);
