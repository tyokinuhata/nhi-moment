import { Application, Assets, Sprite, Container } from 'pixi.js';

interface Anomaly {
  hasAnomaly: boolean;
  position: {
    x: number;
    y: number;
  };
  radius: number;
}

export class Scene {
  private static readonly CENTER_ANCHOR = 0.5;

  private imageContainer!: Container;
  private spriteBefore!: Sprite;
  private spriteAfter!: Sprite;
  private anomaly!: Anomaly;
  private currentImageSetId!: string;

  private constructor() {}

  static async create(app: Application): Promise<Scene> {
    const scene = new Scene();
    await scene.selectRandomImageSet();
    await scene.loadTextures();
    scene.positionSprites(app);
    scene.createContainer();
    return scene;
  }

  private async selectRandomImageSet(): Promise<void> {
    const anomaliesConfig = await (await fetch(`${import.meta.env.BASE_URL}images/anomalies.json`)).json();
    const imageSetIds = Object.keys(anomaliesConfig);
    const randomIndex = Math.floor(Math.random() * imageSetIds.length);
    this.currentImageSetId = imageSetIds[randomIndex];
    this.anomaly = anomaliesConfig[this.currentImageSetId];
  }

  private async loadTextures(): Promise<void> {
    const textureBefore = await Assets.load(`${import.meta.env.BASE_URL}images/${this.currentImageSetId}/before.png`);
    const textureAfter = await Assets.load(`${import.meta.env.BASE_URL}images/${this.currentImageSetId}/after.png`);

    this.spriteBefore = Sprite.from(textureBefore);
    this.spriteAfter = Sprite.from(textureAfter);
    this.spriteAfter.alpha = 0;
  }

  private positionSprites(app: Application): void {
    const scale = Math.max(
      app.screen.width / this.spriteBefore.width,
      app.screen.height / this.spriteBefore.height
    );

    this.spriteBefore.scale.set(scale);
    this.spriteBefore.anchor.set(Scene.CENTER_ANCHOR);
    this.spriteBefore.x = app.screen.width / 2;
    this.spriteBefore.y = app.screen.height / 2;

    this.spriteAfter.scale.set(scale);
    this.spriteAfter.anchor.set(Scene.CENTER_ANCHOR);
    this.spriteAfter.x = app.screen.width / 2;
    this.spriteAfter.y = app.screen.height / 2;
  }

  private createContainer(): void {
    this.imageContainer = new Container();
    this.imageContainer.addChild(this.spriteBefore);
    this.imageContainer.addChild(this.spriteAfter);
  }

  getContainer(): Container {
    return this.imageContainer;
  }

  getSpriteAfter(): Sprite {
    return this.spriteAfter;
  }

  isAnomalyClicked(x: number, y: number): boolean {
    if (!this.anomaly.hasAnomaly) {
      return false;
    }

    const dx = x - this.anomaly.position.x;
    const dy = y - this.anomaly.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance <= this.anomaly.radius;
  }
}
