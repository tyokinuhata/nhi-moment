import { ColorMatrixFilter } from "pixi.js";

export function setupColorMatrixFilter() {
  const cm = new ColorMatrixFilter();

  cm.matrix = [
    1.00, 0.08, 0.02, 0, 0.05,
    0.04, 0.98, 0.03, 0, 0.05,
    0.02, 0.10, 0.80, 0, 0.05,
    0.00, 0.00, 0.00, 1, 0.00,
  ];

  return cm;
}
