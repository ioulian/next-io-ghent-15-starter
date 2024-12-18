import { MetadataRoute } from "next";

import { getVariable } from "./[locale]/_styles/variables";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "iO Ghent",
    short_name: "iO Ghent",
    description: "iO Ghent Next.js starter kit",
    start_url: "/",
    display: "standalone",
    background_color: getVariable("color.white"),
    theme_color: getVariable("color.primary.400"),
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
