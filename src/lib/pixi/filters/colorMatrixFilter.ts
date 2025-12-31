import { ColorMatrixFilter } from "pixi.js";

export function setupColorMatrixFilter(): ColorMatrixFilter {
  const cm = new ColorMatrixFilter();

  cm.saturate(0.88);
  cm.brightness(1.08, false);
  cm.contrast(1.00, false);

  return cm;
}
