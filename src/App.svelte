<script lang="ts">
  import { onMount } from 'svelte';
  import { GraphicsApp } from './lib/graphics';
  import BGMControl from './components/BGMControl.svelte';
  import ConfirmationModal from './components/ConfirmationModal.svelte';
  import ResultScreen from './components/ResultScreen.svelte';
  import { anomalyStore } from './lib/stores/anomalyStore';

  let canvas: HTMLDivElement;

  onMount(async () => {
    await GraphicsApp.create(canvas);
  });
</script>

<div class="app">
  <h1 class="title">ンヒ体験</h1>

  {#if $anomalyStore.screen === 'result'}
    <ResultScreen />
  {:else}
    <div class="canvas-wrapper" bind:this={canvas}></div>

    <BGMControl />

    {#if $anomalyStore.screen === 'modal'}
      <ConfirmationModal />
    {/if}
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: #0a0a0a;
  }

  .title {
    color: #fff;
    font-size: 2.5rem;
  }

  .app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .canvas-wrapper {
    width: 100%;
    max-width: 900px;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: 50px;
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
