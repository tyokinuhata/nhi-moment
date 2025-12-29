import { RGBSplitFilter } from 'pixi-filters';

export function setupRGBSplitFilter() {
  const rgbSplitFilter = new RGBSplitFilter();
  rgbSplitFilter.red = { x: 2, y: 0 };
  rgbSplitFilter.green = { x: 0, y: 0 };
  rgbSplitFilter.blue = { x: -2, y: 0 };
  return rgbSplitFilter;
}
