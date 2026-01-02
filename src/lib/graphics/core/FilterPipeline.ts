import { Application, Container, Ticker } from 'pixi.js';
import { setupRGBSplitFilter } from '../filters/rgbSplitFilter';
import { DynamicDisplacementFilter } from '../filters/dynamicDisplacementFilter';
import { setupCRTFilter } from '../filters/crtFilter';
import { setupNoiseFilter } from '../filters/noiseFilter';
import { setupColorMatrixFilter } from '../filters/colorMatrixFilter';

export class FilterPipeline {
  private dynamicDisplacementFilter!: DynamicDisplacementFilter;

  private constructor() {}

  static create(app: Application, container: Container): FilterPipeline {
    const pipeline = new FilterPipeline();
    pipeline.setupFilters(app, container);
    return pipeline;
  }

  private setupFilters(app: Application, container: Container): void {
    const colorMatrixFilter = setupColorMatrixFilter();
    const rgbSplitFilter = setupRGBSplitFilter();
    const crtFilter = setupCRTFilter();
    const noiseFilter = setupNoiseFilter();

    this.dynamicDisplacementFilter = DynamicDisplacementFilter.create(app);

    container.filters = [
      colorMatrixFilter,
      rgbSplitFilter,
      crtFilter,
      noiseFilter,
      this.dynamicDisplacementFilter.getFilter()
    ];
  }

  update(ticker: Ticker): void {
    this.dynamicDisplacementFilter.update(ticker);
  }
}
