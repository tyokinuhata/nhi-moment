<script lang="ts">
  import { onMount } from 'svelte';
  import * as pixi from './lib/pixi';

  let canvas: HTMLDivElement;

  onMount(() => pixi.setup(canvas));
</script>

<h1>ンヒ体験</h1>
<div class="canvas-wrapper" bind:this={canvas}></div>

<style>
  :global(body) {
    background: #0a0a0a;
    margin: 0;
    padding: 0 20px 20px 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  :global(h1) {
    color: #fff;
    font-size: 2.5rem;
    font-weight: normal;
    text-align: center;
    margin: 0;
  }

  .canvas-wrapper {
    max-width: 900px;
    width: 100%;
    border-radius: 50px;
    overflow: hidden;
    line-height: 0;
    box-shadow:
      0 0 40px rgba(16, 153, 187, 0.2),
      0 0 80px rgba(16, 153, 187, 0.1);
  }

  .canvas-wrapper :global(canvas) {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
