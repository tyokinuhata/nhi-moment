<script lang="ts">
  import { onMount } from 'svelte';
  import { Application, Assets, Sprite } from 'pixi.js';

  let canvas: HTMLDivElement;

  onMount(async () => {
    const app = new Application();
    await app.init({
      background: '#1099bb',
      width: 800,
      height: 600
    });

    canvas.appendChild(app.canvas);

    const texture1 = await Assets.load('/01.png');
    const texture2 = await Assets.load('/02.png');

    const sprite1 = Sprite.from(texture1);
    const sprite2 = Sprite.from(texture2);

    const scale = Math.min(
      app.screen.width / sprite1.width,
      app.screen.height / sprite1.height
    ) * 0.8;

    sprite1.scale.set(scale);
    sprite1.anchor.set(0.5);
    sprite1.x = app.screen.width / 2;
    sprite1.y = app.screen.height / 2;

    sprite2.scale.set(scale);
    sprite2.anchor.set(0.5);
    sprite2.x = app.screen.width / 2;
    sprite2.y = app.screen.height / 2;
    sprite2.alpha = 0;

    app.stage.addChild(sprite1);
    app.stage.addChild(sprite2);

    const duration = 20000;
    let elapsed = 0;

    app.ticker.add((ticker) => {
      elapsed += ticker.deltaMS;
      const progress = Math.min(elapsed / duration, 1);
      sprite2.alpha = progress;
    });
  });
</script>

<h1>ンヒ体験</h1>
<div bind:this={canvas}></div>
