// "Ported" from: https://smoothshadows.com/

import Color from "colorjs.io";
import { ColorSpace, parse, sRGB } from "colorjs.io/fn";
import { easingCoordinates } from "easing-coordinates";

ColorSpace.register(sRGB);

export interface SmoothShadowOptionsType {
  startAlpha: number;
  endAlpha: number;
  startBlur: number;
  endBlur: number;
  layers: number;
  x: number;
  y: number;
  color: string;
  alphaEasing: string;
  blurEasing: string;
  distanceEasing: string;
}

/**
 * Create a smooth shadow composed of different "normal" shadows in css.
 *
 * @returns String to be used in css `box-shadow`
 */
export const createSmoothShadow = ({
  /**
   * Start opacity of the shadow
   */
  startAlpha,

  /**
   * End opacity of the shadow
   */
  endAlpha,

  /**
   * Start blur  of the shadow
   */
  startBlur,

  /**
   * End blur  of the shadow
   */
  endBlur,

  /**
   * Number of "normal" css shadows to generate. More is more smooth, but will tank performance quite fast
   */
  layers,
  x,
  y,
  color,
  alphaEasing,
  blurEasing,
  distanceEasing,
}: SmoothShadowOptionsType): string => {
  const distanceCoordinates = easingCoordinates(distanceEasing, layers);
  const blurCoordinates = easingCoordinates(blurEasing, layers);
  const alphaCoordinates = easingCoordinates(alphaEasing, layers);
  const parsedColor = new Color(parse(color));
  const rgb: [number, number, number] = [
    Math.floor(parsedColor.srgb.r * 255),
    Math.floor(parsedColor.srgb.g * 255),
    Math.floor(parsedColor.srgb.b * 255),
  ];

  return Array(layers)
    .fill(0)
    .map((_, i) => ({
      x: distanceCoordinates[i].y * x,
      y: distanceCoordinates[i].y * y,
      blur: startBlur + blurCoordinates[i].y * (endBlur - startBlur),
      alpha: startAlpha + alphaCoordinates[i].y * (endAlpha - startAlpha),
    }))
    .map(
      ({ x, y, blur, alpha }) =>
        `${x.toFixed(1)}px ${y.toFixed(1)}px ${blur.toFixed(
          2,
        )}px rgba(${rgb.join(", ")}, ${alpha.toFixed(2)})`,
    )
    .join(", ");
};
