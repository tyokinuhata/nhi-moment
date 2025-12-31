import { CRTFilter } from 'pixi-filters';

export function setupCRTFilter(): CRTFilter {
  const crtFilter = new CRTFilter();
  crtFilter.lineWidth = 1;
  crtFilter.lineContrast = 0.10;
  crtFilter.vignetting = 0.20;
  crtFilter.vignettingAlpha = 0.35;
  crtFilter.curvature = 1.4;
  crtFilter.noise = 0.0;
  crtFilter.noiseSize = 1;
  return crtFilter;
}
