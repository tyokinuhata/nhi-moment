import { Application, Assets, Sprite, Container, Ticker } from 'pixi.js';
import { setupRGBSplitFilter } from './filters/rgbSplitFilter';
import { setupDisplacementFilter, updateDisplacementFilter } from './filters/displacementFilter';
import { setupCRTFilter } from './filters/crtFilter';
import { setupNoiseFilter } from './filters/noiseFilter';
import { setupColorMatrixFilter } from './filters/colorMatrixFilter';

async function setupApp(canvasElement: HTMLDivElement): Promise<Application> {
  const app = new Application();
  await app.init({
    background: '#1099bb',
    resizeTo: canvasElement
  });
  canvasElement.appendChild(app.canvas);
  return app;
}

async function setupSprites(app: Application): Promise<Container> {
  const textureBefore = await Assets.load('/01.png');
  const textureAfter = await Assets.load('/02.png');

  const spriteBefore = Sprite.from(textureBefore);
  const spriteAfter = Sprite.from(textureAfter);

  const scale = Math.max(
    app.screen.width / spriteBefore.width,
    app.screen.height / spriteBefore.height
  );

  spriteBefore.scale.set(scale);
  spriteBefore.anchor.set(0.5);
  spriteBefore.x = app.screen.width / 2;
  spriteBefore.y = app.screen.height / 2;

  spriteAfter.scale.set(scale);
  spriteAfter.anchor.set(0.5);
  spriteAfter.x = app.screen.width / 2;
  spriteAfter.y = app.screen.height / 2;
  spriteAfter.alpha = 0;

  const imageContainer = new Container();
  imageContainer.addChild(spriteBefore);
  imageContainer.addChild(spriteAfter);

  app.stage.addChild(imageContainer);

  return imageContainer;
}

function setupStaticFilters(imageContainer: Container): void {
  const colorMatrixFilter = setupColorMatrixFilter();
  const rgbSplitFilter = setupRGBSplitFilter();
  const crtFilter = setupCRTFilter();
  const noiseFilter = setupNoiseFilter();

  imageContainer.filters = [colorMatrixFilter, rgbSplitFilter, crtFilter, noiseFilter];
}

function setupAnimatedFilters(app: Application, imageContainer: Container): Array<(ticker: Ticker) => void> {
  const animations: Array<(ticker: Ticker) => void> = [];

  const { displacementFilter, dispSprite, BASE_X, BASE_Y } = setupDisplacementFilter(app);
  const currentFilters = imageContainer.filters ?? [];
  imageContainer.filters = [...currentFilters, displacementFilter];
  animations.push((ticker) =>
    updateDisplacementFilter(ticker, dispSprite, displacementFilter, BASE_X, BASE_Y)
  );

  return animations;
}

function startFilterAnimation(app: Application, animations: Array<(ticker: Ticker) => void>): void {
  app.ticker.add((ticker) => {
    animations.forEach((anim) => anim(ticker));
  });
}

function startSpriteTransition(app: Application, spriteAfter: Sprite): void {
  let elapsed = 0;
  const transitionDuration = 20;

  app.ticker.add((ticker) => {
    elapsed += ticker.deltaTime / 60;
    if (elapsed < transitionDuration) {
      spriteAfter.alpha = elapsed / transitionDuration;
    } else {
      spriteAfter.alpha = 1;
    }
  });
}

export async function setup(canvasElement: HTMLDivElement): Promise<void> {
  const app = await setupApp(canvasElement);
  const imageContainer = await setupSprites(app);
  setupStaticFilters(imageContainer);
  const animations = setupAnimatedFilters(app, imageContainer);
  startFilterAnimation(app, animations);
  const spriteAfter = imageContainer.children[1] as Sprite;
  startSpriteTransition(app, spriteAfter);
}
