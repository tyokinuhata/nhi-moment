import { Sprite, Ticker } from 'pixi.js';

export class FadeTransition {
  private static readonly TRANSITION_DURATION = 20;
  private static readonly MAX_ALPHA = 1;
  private static readonly TARGET_FPS = 60;

  private transitionElapsed = 0;

  private constructor(private sprite: Sprite) {}

  static create(sprite: Sprite): FadeTransition {
    return new FadeTransition(sprite);
  }

  update(ticker: Ticker): void {
    this.transitionElapsed += ticker.deltaTime / FadeTransition.TARGET_FPS;
    const progress = this.transitionElapsed / FadeTransition.TRANSITION_DURATION;
    this.sprite.alpha = Math.min(FadeTransition.MAX_ALPHA, progress);
  }
}
