import { Application, Assets, Sprite, Container } from 'pixi.js';

export class Scene {
  private static readonly CENTER_ANCHOR = 0.5;

  private imageContainer!: Container;
  private spriteBefore!: Sprite;
  private spriteAfter!: Sprite;

  private constructor() {}

  static async create(app: Application): Promise<Scene> {
    const scene = new Scene();
    await scene.loadTextures();
    scene.positionSprites(app);
    scene.createContainer();
    return scene;
  }

  private async loadTextures(): Promise<void> {
    const textureBefore = await Assets.load('/images/before.png');
    const textureAfter = await Assets.load('/images/after.png');

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
}
