import { Application, DisplacementFilter, Graphics, RenderTexture, Sprite, Ticker } from 'pixi.js';

export class DynamicDisplacementFilter {
  private static readonly MAP_SIZE = 256;
  private static readonly BASE_BACKGROUND_COLOR = 0x808080;
  private static readonly JITTER_RANGE = 50;
  private static readonly JITTER_CENTER = 0.5;
  private static readonly BASE_GRAY = 128;
  private static readonly MIN_GRAY = 0;
  private static readonly MAX_GRAY = 255;
  private static readonly STRIPE_MIN_HEIGHT = 2;
  private static readonly STRIPE_HEIGHT_RANGE = 4;
  private static readonly BIG_STRIPE_PROBABILITY = 0.05;
  private static readonly BIG_STRIPE_MIN_HEIGHT = 4;
  private static readonly BIG_STRIPE_HEIGHT_RANGE = 10;
  private static readonly BIG_STRIPE_COLOR = 0x9a9a9a;
  private static readonly BASE_SCALE_X = 18;
  private static readonly BASE_SCALE_Y = 1.5;
  private static readonly SCROLL_SPEED_X = 60;
  private static readonly SCROLL_SPEED_Y = 10;
  private static readonly GLITCH_PROBABILITY = 0.02;
  private static readonly GLITCH_SCALE_X = 28;
  private static readonly TARGET_FRAME_TIME = 16.67;
  private static readonly INTERPOLATION_SPEED = 0.02;
  private static readonly MILLISECONDS_PER_SECOND = 1000;

  private sprite: Sprite;
  private filter: DisplacementFilter;

  private constructor(app: Application) {
    this.sprite = this.createDisplacementSprite(app);
    this.filter = new DisplacementFilter({
      sprite: this.sprite,
      scale: { x: DynamicDisplacementFilter.BASE_SCALE_X, y: DynamicDisplacementFilter.BASE_SCALE_Y }
    });
  }

  static create(app: Application): DynamicDisplacementFilter {
    return new DynamicDisplacementFilter(app);
  }

  private createDisplacementSprite(app: Application): Sprite {
    const graphics = this.createNoisePattern();
    const renderTexture = RenderTexture.create({
      width: DynamicDisplacementFilter.MAP_SIZE,
      height: DynamicDisplacementFilter.MAP_SIZE
    });
    app.renderer.render({ container: graphics, target: renderTexture, clear: true });

    const sprite = new Sprite(renderTexture);
    sprite.texture.source.style.addressMode = 'repeat';
    sprite.width = app.screen.width;
    sprite.height = app.screen.height;
    sprite.visible = false;
    app.stage.addChild(sprite);

    return sprite;
  }

  private createNoisePattern(): Graphics {
    const graphics = new Graphics();
    graphics.rect(0, 0, DynamicDisplacementFilter.MAP_SIZE, DynamicDisplacementFilter.MAP_SIZE);
    graphics.fill({ color: DynamicDisplacementFilter.BASE_BACKGROUND_COLOR });

    let y = 0;
    while (y < DynamicDisplacementFilter.MAP_SIZE) {
      y += this.drawStripe(graphics, y);

      if (Math.random() < DynamicDisplacementFilter.BIG_STRIPE_PROBABILITY) {
        y += this.drawBigStripe(graphics, y);
      }
    }

    return graphics;
  }

  private drawStripe(graphics: Graphics, y: number): number {
    const jitter = (Math.random() - DynamicDisplacementFilter.JITTER_CENTER) * DynamicDisplacementFilter.JITTER_RANGE;
    const gray = Math.max(
      DynamicDisplacementFilter.MIN_GRAY,
      Math.min(DynamicDisplacementFilter.MAX_GRAY, DynamicDisplacementFilter.BASE_GRAY + jitter)
    );
    const color = (gray << 16) | (gray << 8) | gray;
    const height = DynamicDisplacementFilter.STRIPE_MIN_HEIGHT +
                   Math.floor(Math.random() * DynamicDisplacementFilter.STRIPE_HEIGHT_RANGE);

    graphics.rect(0, y, DynamicDisplacementFilter.MAP_SIZE, height);
    graphics.fill({ color });

    return height;
  }

  private drawBigStripe(graphics: Graphics, y: number): number {
    const height = DynamicDisplacementFilter.BIG_STRIPE_MIN_HEIGHT +
                   Math.floor(Math.random() * DynamicDisplacementFilter.BIG_STRIPE_HEIGHT_RANGE);

    graphics.rect(0, y, DynamicDisplacementFilter.MAP_SIZE, height);
    graphics.fill({ color: DynamicDisplacementFilter.BIG_STRIPE_COLOR });

    return height;
  }

  getFilter(): DisplacementFilter {
    return this.filter;
  }

  update(ticker: Ticker): void {
    const deltaTime = ticker.deltaMS / DynamicDisplacementFilter.MILLISECONDS_PER_SECOND;

    this.sprite.x += DynamicDisplacementFilter.SCROLL_SPEED_X * deltaTime;
    this.sprite.y += DynamicDisplacementFilter.SCROLL_SPEED_Y * deltaTime;

    if (Math.random() < DynamicDisplacementFilter.GLITCH_PROBABILITY) {
      this.filter.scale.x = DynamicDisplacementFilter.GLITCH_SCALE_X;
    }

    const interpolationFactor = 1 - Math.pow(
      DynamicDisplacementFilter.INTERPOLATION_SPEED,
      ticker.deltaMS / DynamicDisplacementFilter.TARGET_FRAME_TIME
    );
    this.filter.scale.x += (DynamicDisplacementFilter.BASE_SCALE_X - this.filter.scale.x) * interpolationFactor;
    this.filter.scale.y += (DynamicDisplacementFilter.BASE_SCALE_Y - this.filter.scale.y) * interpolationFactor;
  }
}
