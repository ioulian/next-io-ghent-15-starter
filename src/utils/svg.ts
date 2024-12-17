/**
 * Escapes SVG string to be used as a "data:" image url
 *
 * @param svg SVG to escape
 * @returns data: string of the svg
 */
export const escapeSVG = (svg: string) => {
  const newSvg = svg.replaceAll("#", "%23");

  return `data:image/svg+xml;charset=UTF-8,${newSvg}`;
};
