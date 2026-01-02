import { Application, Container, Ticker } from 'pixi.js';
import { setupRGBSplitFilter } from '../filters/rgbSplitFilter';
import { setupDisplacementFilter, updateDisplacementFilter } from '../filters/displacementFilter';
import { setupCRTFilter } from '../filters/crtFilter';
import { setupNoiseFilter } from '../filters/noiseFilter';
import { setupColorMatrixFilter } from '../filters/colorMatrixFilter';

export class FilterPipeline {
  private displacementData!: {
    filter: any;
    sprite: any;
    baseX: number;
    baseY: number;
  };

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

    const { displacementFilter, dispSprite, BASE_X, BASE_Y } = setupDisplacementFilter(app);
    this.displacementData = {
      filter: displacementFilter,
      sprite: dispSprite,
      baseX: BASE_X,
      baseY: BASE_Y
    };

    container.filters = [
      colorMatrixFilter,
      rgbSplitFilter,
      crtFilter,
      noiseFilter,
      displacementFilter
    ];
  }

  update(ticker: Ticker): void {
    updateDisplacementFilter(
      ticker,
      this.displacementData.sprite,
      this.displacementData.filter,
      this.displacementData.baseX,
      this.displacementData.baseY
    );
  }
}
