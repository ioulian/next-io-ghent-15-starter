import { escapeSVG } from "@/utils/svg";

/**
 * Will create a simple image with some text in it. Useful when you don't have any image for an user
 *
 * @param initials String to show in the image
 * @param backgroundColor
 * @param textColor
 * @returns svg string
 */
export const getAvatarInitials = (
  initials: string,
  backgroundColor: string = "currentColor",
  textColor: string = "#fff",
): string => {
  return escapeSVG(
    `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg"><rect height="512" width="512" y="-1" x="-1" fill="${backgroundColor}"/><text transform="matrix(1 0 0 1 0 0)" font-weight="bold" stroke="#000" xml:space="preserve" font-family="'Inter', sans-serif" font-size="180" stroke-width="0" x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}">${initials.toLocaleUpperCase()}</text></svg>`,
  );
};
