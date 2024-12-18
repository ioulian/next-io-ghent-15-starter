import "server-only";

import fs from "fs";

import { getBuildId } from "@/utils/next";

/**
 * Returns spritesheet data or false if the spritesheet does not exist
 */
export const getSpriteSheet = (): string | false => {
  const fileUrl = `${process.cwd()}/.next/static/media/sprite-${getBuildId()}.svg`;

  if (!fs.existsSync(fileUrl)) {
    return false;
  }

  const file = fs.readFileSync(fileUrl, "utf8");

  return file && typeof file === "string" && file.trim() !== "" ? file : false;
};
