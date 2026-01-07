import { Application, Bounds } from 'pixi.js';
import { Viewport } from 'pixi-viewport';

export class ViewportControls {
  private viewport: Viewport;

  private constructor(viewport: Viewport) {
    this.viewport = viewport;
  }

  static create(app: Application, bounds: Bounds): ViewportControls {
    const viewport = ViewportControls.createViewport(app, bounds);

    const controls = new ViewportControls(viewport);
    controls.setupInteraction();
    controls.setupConstraints();

    return controls;
  }

  private static createViewport(app: Application, bounds: Bounds): Viewport {
    return new Viewport({
      screenWidth: app.screen.width,
      screenHeight: app.screen.height,
      worldWidth: bounds.width,
      worldHeight: bounds.height,
      events: app.renderer.events
    });
  }

  private setupInteraction(): void {
    this.viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate();
  }

  private setupConstraints(): void {
    this.viewport
      .clampZoom({ minScale: 1.0 })
      .clamp({ direction: 'all' });
  }

  getViewport(): Viewport {
    return this.viewport;
  }
}
