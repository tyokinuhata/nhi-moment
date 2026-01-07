import { Viewport } from 'pixi-viewport';
import { FederatedPointerEvent } from 'pixi.js';

export interface ClickEvent {
  x: number;
  y: number;
}

export class ClickDetector {
  private static readonly CLICK_THRESHOLD = 5;

  private viewport: Viewport;
  private pointerDownPosition: { x: number; y: number } | null = null;
  private clickHandler: ((event: ClickEvent) => void) | null = null;

  private constructor(viewport: Viewport) {
    this.viewport = viewport;
  }

  static create(viewport: Viewport): ClickDetector {
    const detector = new ClickDetector(viewport);
    detector.setupClickDetection();
    return detector;
  }

  private setupClickDetection(): void {
    this.viewport.on('pointerdown', (event) => this.handlePointerDown(event));
    this.viewport.on('pointerup', (event) => this.handlePointerUp(event));
  }

  private handlePointerDown(event: FederatedPointerEvent): void {
    this.pointerDownPosition = {
      x: event.screen.x,
      y: event.screen.y
    };
  }

  private handlePointerUp(event: FederatedPointerEvent): void {
    if (!this.pointerDownPosition) {
      return;
    }

    if (this.isClickAction(event)) {
      this.emitClickEvent(event);
    }

    this.pointerDownPosition = null;
  }

  private isClickAction(event: FederatedPointerEvent): boolean {
    const dx = event.screen.x - this.pointerDownPosition!.x;
    const dy = event.screen.y - this.pointerDownPosition!.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance <= ClickDetector.CLICK_THRESHOLD;
  }

  private emitClickEvent(event: FederatedPointerEvent): void {
    if (!this.clickHandler) {
      return;
    }

    const worldPosition = this.viewport.toWorld(event.screen);
    this.clickHandler({
      x: worldPosition.x,
      y: worldPosition.y
    });
  }

  onImageClick(handler: (event: ClickEvent) => void): void {
    this.clickHandler = handler;
  }
}
