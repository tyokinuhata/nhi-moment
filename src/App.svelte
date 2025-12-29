<script lang="ts">
  import { onMount } from 'svelte';
  import { Application, Assets, Sprite, Container } from 'pixi.js';
  import { setupRGBSplitFilter } from './filters/rgbSplitFilter';
  import { setupDisplacementFilter, updateDisplacementFilter } from './filters/displacementFilter';
  import { setupCRTFilter } from './filters/crtFilter';
  import { setupNoiseFilter, updateNoiseFilter } from './filters/noiseFilter';
  import { setupColorMatrixFilter } from './filters/colorMatrixFilter';

  let canvas: HTMLDivElement;

  onMount(async () => {
    const app = new Application();
    await app.init({
      background: '#1099bb',
      width: 640,
      height: 480
    });

    canvas.appendChild(app.canvas);

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

    const colorMatrixFilter = setupColorMatrixFilter();
    const rgbSplitFilter = setupRGBSplitFilter();
    const { displacementFilter, dispSprite, BASE_X, BASE_Y } = setupDisplacementFilter(app);
    const crtFilter = setupCRTFilter();

    imageContainer.filters = [colorMatrixFilter, rgbSplitFilter, displacementFilter, crtFilter];

    const noiseData = setupNoiseFilter(imageContainer);

    app.ticker.add((ticker) => {
      updateDisplacementFilter(ticker, dispSprite, displacementFilter, BASE_X, BASE_Y);
      updateNoiseFilter(app, noiseData);
    });
  });
</script>

<h1>ンヒ体験</h1>
<div class="crt-tv">
  <div class="canvas-wrapper" bind:this={canvas}></div>
</div>

<style>
  :global(body) {
    background: #0a0a0a;
    margin: 0;
    padding: 20px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  :global(h1) {
    color: #fff;
    font-family: monospace;
    font-size: 4rem;
    font-weight: bold;
    text-align: center;
    margin: 0 0 20px 0;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }

  .crt-tv {
    display: inline-block;
    background: #1a1a1a;
    padding: 20px;
    border-radius: 60px;
    box-shadow:
      0 0 80px rgba(16, 153, 187, 0.15),
      0 0 40px rgba(16, 153, 187, 0.1),
      0 20px 60px rgba(0, 0, 0, 0.9);
  }

  .canvas-wrapper {
    border-radius: 40px;
    overflow: hidden;
    line-height: 0;
    box-shadow:
      inset 0 0 20px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(16, 153, 187, 0.1);
  }

  .canvas-wrapper :global(canvas) {
    display: block;
  }
</style>
