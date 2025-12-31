import { Application, Assets, Sprite, Container } from 'pixi.js';
import { setupRGBSplitFilter } from './filters/rgbSplitFilter';
import { setupDisplacementFilter, updateDisplacementFilter } from './filters/displacementFilter';
import { setupCRTFilter } from './filters/crtFilter';
import { setupNoiseFilter, updateNoiseFilter } from './filters/noiseFilter';
import { setupColorMatrixFilter } from './filters/colorMatrixFilter';

async function setupApp(canvasElement: HTMLDivElement) {
  const app = new Application();
  await app.init({
    background: '#1099bb',
    width: 900,
    height: 675
  });
  canvasElement.appendChild(app.canvas);
  return app;
}

async function setupSprites(app: Application) {
  const texture1 = await Assets.load('/01.png');
  const texture2 = await Assets.load('/02.png');

  const sprite1 = Sprite.from(texture1);
  const sprite2 = Sprite.from(texture2);

  const scale = Math.min(
    app.screen.width / sprite1.width,
    app.screen.height / sprite1.height
  );

  sprite1.scale.set(scale);
  sprite1.anchor.set(0.5);
  sprite1.x = app.screen.width / 2;
  sprite1.y = app.screen.height / 2;

  sprite2.scale.set(scale);
  sprite2.anchor.set(0.5);
  sprite2.x = app.screen.width / 2;
  sprite2.y = app.screen.height / 2;
  sprite2.alpha = 0;

  const imageContainer = new Container();
  imageContainer.addChild(sprite1);
  imageContainer.addChild(sprite2);

  app.stage.addChild(imageContainer);

  return { sprite2, imageContainer };
}

function setupFilters(app: Application, imageContainer: Container) {
  const colorMatrixFilter = setupColorMatrixFilter();
  const rgbSplitFilter = setupRGBSplitFilter();
  const { displacementFilter, dispSprite, BASE_X, BASE_Y } = setupDisplacementFilter(app);
  const crtFilter = setupCRTFilter();

  imageContainer.filters = [colorMatrixFilter, rgbSplitFilter, displacementFilter, crtFilter];

  const noiseData = setupNoiseFilter(imageContainer);

  return { displacementFilter, dispSprite, BASE_X, BASE_Y, noiseData };
}

function startAnimation(
  app: Application,
  sprite2: Sprite,
  filterData: {
    displacementFilter: any;
    dispSprite: any;
    BASE_X: number;
    BASE_Y: number;
    noiseData: any;
  }
) {
  let elapsed = 0;
  const transitionDuration = 20;

  app.ticker.add((ticker) => {
    updateDisplacementFilter(ticker, filterData.dispSprite, filterData.displacementFilter, filterData.BASE_X, filterData.BASE_Y);
    updateNoiseFilter(app, filterData.noiseData);

    elapsed += ticker.deltaTime / 60;
    if (elapsed < transitionDuration) {
      sprite2.alpha = elapsed / transitionDuration;
    } else {
      sprite2.alpha = 1;
    }
  });
}

export async function setup(canvasElement: HTMLDivElement) {
  const app = await setupApp(canvasElement);
  const { sprite2, imageContainer } = await setupSprites(app);
  const filterData = setupFilters(app, imageContainer);
  startAnimation(app, sprite2, filterData);
}
