import { NoiseFilter } from 'pixi.js';

export function setupNoiseFilter(): NoiseFilter {
  const noiseFilter = new NoiseFilter({ noise: 0.06 });
  return noiseFilter;
}
