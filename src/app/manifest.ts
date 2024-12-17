import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "iO Ghent",
    short_name: "iO Ghent",
    description: "iO Ghent Next.js starter kit",
    start_url: "/",
    display: "standalone",
    // TODO: We can use tokens here!
    background_color: "#fff",
    theme_color: "#314C74",
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
