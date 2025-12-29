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

    const texture = await Assets.load('/01.png');
    const sprite = Sprite.from(texture);

    const scale = Math.min(
      app.screen.width / sprite.width,
      app.screen.height / sprite.height
    ) * 0.8;

    sprite.scale.set(scale);
    sprite.anchor.set(0.5);
    sprite.x = app.screen.width / 2;
    sprite.y = app.screen.height / 2;

    app.stage.addChild(sprite);
  });
</script>

<h1>ンヒ体験</h1>
<div bind:this={canvas}></div>
