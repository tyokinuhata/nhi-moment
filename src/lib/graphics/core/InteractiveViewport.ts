import { Application } from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { Scene } from './Scene';
import { ViewportControls } from './ViewportControls';
import { ClickDetector } from './ClickDetector';
import type { ClickEvent } from './ClickDetector';

export type { ClickEvent };

export class InteractiveViewport {
  private viewportControls: ViewportControls;
  private clickDetector: ClickDetector;

  private constructor(viewportControls: ViewportControls, clickDetector: ClickDetector) {
    this.viewportControls = viewportControls;
    this.clickDetector = clickDetector;
  }

  static create(app: Application, scene: Scene): InteractiveViewport {
    const bounds = scene.getContainer().getBounds();
    const viewportControls = ViewportControls.create(app, bounds);
    const clickDetector = ClickDetector.create(viewportControls.getViewport());

    return new InteractiveViewport(viewportControls, clickDetector);
  }

  onImageClick(handler: (event: ClickEvent) => void): void {
    this.clickDetector.onImageClick(handler);
  }

  getViewport(): Viewport {
    return this.viewportControls.getViewport();
  }
}
