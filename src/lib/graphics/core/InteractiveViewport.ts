import { Application, Bounds } from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { Scene } from './Scene';

export class InteractiveViewport {
  private viewport: Viewport;

  private constructor(viewport: Viewport) {
    this.viewport = viewport;
  }

  static create(app: Application, scene: Scene): InteractiveViewport {
    const bounds = scene.getContainer().getBounds();
    const viewport = InteractiveViewport.createViewport(app, bounds);

    InteractiveViewport.setupInteraction(viewport);
    InteractiveViewport.setupConstraints(viewport);

    return new InteractiveViewport(viewport);
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

  private static setupInteraction(viewport: Viewport): void {
    viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate();
  }

  private static setupConstraints(viewport: Viewport): void {
    viewport
      .clampZoom({ minScale: 1.0 })
      .clamp({ direction: 'all' });
  }

  getViewport(): Viewport {
    return this.viewport;
  }
}
